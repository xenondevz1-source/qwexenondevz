'use server'

import { ExtasyServerError } from '@/lib/server/errors'
import { requireActionSession } from '@/lib/server/guards'
import { db, schema } from '@extasy/db'
import { and, eq } from 'drizzle-orm'

export const deleteLink = requireActionSession(async (userId: number, linkId: number) => {
  const existing = await db.query.links.findFirst({
    where: (t, { eq }) => eq(t.id, linkId),
    columns: { id: true },
  })

  if (!existing) {
    throw new ExtasyServerError({
      code: 'not_found',
      message: 'Link not found',
    })
  }

  await db.delete(schema.links).where(and(eq(schema.links.userId, userId), eq(schema.links.id, existing.id)))
})
