import { prisma } from "../prisma";
import { chunkArray } from "../utils";

export type User = {
    Id: number | undefined,
    Name: string,
    Email: string,
    CreatedAt: Date
}

export async function getUsers(take: number, skip: number) {
    return (await prisma.user.findMany({ take: take, skip: skip, orderBy: [{ Id: "desc" }] })) as User[];
}

export async function getUserIdsByEmails(email: string[], excludeUserId: number | undefined = undefined) {
    return (await prisma.user.findMany({ select: { Id: true }, where: { Email: { in: email }, Id: { notIn: [excludeUserId ?? -1] } } }));
}

export async function getUsersCount() {
    return await prisma.user.count();
}

export async function createUser(user: User) {
    await prisma.user.create({
        data: {
            CreatedAt: user.CreatedAt,
            Email: user.Email,
            Name: user.Name
        }
    });
}

export async function createUsers(users: User[]) {

    const m = users.map(u => ({
        CreatedAt: u.CreatedAt,
        Email: u.Email,
        Name: u.Name
    }));

    const chunkUsers = chunkArray(m, 2);

    chunkUsers.forEach(async u => {
        await prisma.user.createMany({
            data: u
        });
    });
}

export async function updateUser(user: User) {
    await prisma.user.update({
        where: { Id: user.Id },
        data: {
            Email: user.Email,
            Name: user.Name
        }
    });
}

export async function deleteUser(id: number) {
    await prisma.user.delete({ where: { Id: id } });
}

export async function deleteAllUsers() {
    await prisma.user.deleteMany();
}