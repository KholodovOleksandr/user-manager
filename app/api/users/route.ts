import { createUser, User } from '@/lib/db/usersRepo'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const required256message = " is requored and should be less than 256 characters";
const nameMessage = "Name" + required256message;
const emailMessage = "Email" + required256message;
const schema = z.object({
    name: z
        .string({ message: nameMessage })
        .min(1, nameMessage)
        .max(256, nameMessage),
    email: z.string().email({ message: emailMessage }).max(256, emailMessage),
    createdAt: z.coerce.date()
})

export async function POST(req: Request) {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
        return NextResponse.json(
            { errors: parsed.error.flatten().fieldErrors },
            { status: 400 }
        )
    }

    await createUser({
        Name: parsed.data.name,
        Email: parsed.data.email,
        CreatedAt: parsed.data.createdAt
    } as User)

    return NextResponse.json({ success: true })
}
