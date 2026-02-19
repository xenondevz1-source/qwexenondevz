import { db } from '@/lib/drizzle'
import type { UserRow } from '@extasy/db'
import { schema } from '@extasy/db'
import { eq } from 'drizzle-orm'

export const updateUser = async (userId: number, args: Partial<UserRow>) => {
  await db.update(schema.users).set(args).where(eq(schema.users.id, userId))
}
