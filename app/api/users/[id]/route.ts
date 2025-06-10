import { deleteUser, updateUser } from '@/lib/db/usersRepo'
import { NextRequest, NextResponse } from 'next/server'
import { schema } from '../userValidationSchema'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = Number(params.id)

  if (!userId || isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  try {
    await updateUser({
      Id: userId,
      Email: parsed.data.email,
      Name: parsed.data.name,
      CreatedAt: parsed.data.createdAt
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Failed to update user:', err)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = Number(params.id)

  if (!userId || isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
  }

  try {
    await deleteUser(userId)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Failed to delete user:', err)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
