import { prisma } from "../prisma";

export type User = {
    Id: number | undefined,
    Name: string,
    Email: string,
    CreatedAt: Date
}

export async function getUsers(take: number, skip: number) {
    return (await prisma.user.findMany({ take: take, skip: skip, orderBy: [{ Id: "desc" }] })) as User[];//.map(u => )
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