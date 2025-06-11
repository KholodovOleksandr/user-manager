import { NextRequest, NextResponse } from "next/server"
import { read, utils } from "xlsx"
import { schema } from "../userValidationSchema"
import { createUsers, getUserIdsByEmails, User } from "@/lib/db/usersRepo";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const users = await getJSONUsers(file);
    const parsedUsers = [];
    for (let i = 0; i < users.length; i++) {
        const parsed = schema.safeParse(users[i]);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        parsedUsers.push(parsed.data);
    }

    const existingEmails = await getUserIdsByEmails(parsedUsers.map(u => u.email));
    if (existingEmails.length) {
        return NextResponse.json(
            { errors: { "email": [`Unable to process the file, ${existingEmails.length} emails already exists`] } },
            { status: 400 }
        );
    }

    await createUsers(parsedUsers.map(u => ({
        Name: u.name,
        Email: u.email,
        CreatedAt: u.createdAt
    } as User)));

    return NextResponse.json({ count: users.length });
}

async function getJSONUsers(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = utils.sheet_to_json(sheet);

    return (rows as any[]).map((row) => ({
        name: row.name || row.Name,
        email: row.email || row.Email,
        createdAt: row.createdAt || row.CreatedAt || row["Created At"],
    }));
}
