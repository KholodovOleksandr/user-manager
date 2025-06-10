import { createUser, deleteAllUsers, User } from '@/lib/db/usersRepo'
import { NextResponse } from 'next/server'
import { schema } from './userValidationSchema'

export async function POST(req: Request) {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
        return NextResponse.json(
            { errors: parsed.error.flatten().fieldErrors },
            { status: 400 }
        )
    }

    // TODO: validate that email does not exist yet
    await createUser({
        Name: parsed.data.name,
        Email: parsed.data.email,
        CreatedAt: parsed.data.createdAt
    } as User)

    return NextResponse.json({ success: true })
}

export async function DELETE() {
    try {
        await deleteAllUsers()

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Failed to delete users:', err)
        return NextResponse.json({ error: 'Failed to delete users' }, { status: 500 })
    }
}
