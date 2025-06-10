import { deleteUser } from '@/lib/db/usersRepo'
import { NextRequest, NextResponse } from 'next/server'

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
