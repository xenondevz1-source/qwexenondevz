'use server'

import { isFontPremium } from '@/lib/features/app'
import { upsertBiolink } from '@/lib/features/config/db'
import { isPremium } from '@/lib/features/users/roles'
import { ExtasyServerError } from '@/lib/server/errors'
import { requireActionSession } from '@/lib/server/guards'
import { fontsFormSchema, type FontsFormValues } from '@/lib/zod/schemas/config'

export const updateFonts = requireActionSession(async (userId: number, values: FontsFormValues) => {
  const parsed = fontsFormSchema.parse(values)

  const selectsPremiumFont = [parsed.nameFont, parsed.textFont].some(isFontPremium)

  if (selectsPremiumFont) {
    const premium = await isPremium(userId)
    if (!premium) {
      throw new ExtasyServerError({
        code: 'unauthorized',
        message: 'One or more fonts selected are premium. Please upgrade to use them.',
      })
    }
  }

  await upsertBiolink(userId, parsed)
})
