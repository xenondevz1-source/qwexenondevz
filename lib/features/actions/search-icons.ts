'use server'

import { searchIconifyIcons as iconifySearch } from '@/lib/integrations/iconify'
import { ExtasyServerError } from '@/lib/server/errors'
import { requireActionSession } from '@/lib/server/guards'

export const searchIconifyIcons = requireActionSession(async (_userId: number, query: string) => {
  if (query.length < 3) {
    throw new ExtasyServerError({
      code: 'bad_request',
      message: 'Query must be at least 3 characters',
    })
  }

  return await iconifySearch(query)
})
