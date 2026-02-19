import { getTurnstileStatus } from '@/lib/auth/turnstile'
import { handleAndReturnErrorResponse, ExtasyServerError } from '@/lib/errors'
import { NextRequest, NextResponse } from 'next/server'

interface WithTurnstileHandler {
  ({ req }: { req: NextRequest }): Promise<NextResponse>
}

export function withTurnstile(handler: WithTurnstileHandler) {
  return async function (req: NextRequest): Promise<NextResponse> {
    try {
      const turnstileStatus = await getTurnstileStatus()

      if (turnstileStatus !== 'success') {
        throw new ExtasyServerError({
          code: 'forbidden',
          message: `Turnstile verification failed: ${turnstileStatus}`,
        })
      }

      return await handler({ req })
    } catch (e) {
      return handleAndReturnErrorResponse(e)
    }
  }
}
