import { ExtasyPasswordUpdatedEmail } from '@/components/email/extasy-password-changed-email'
import { ExtasyResetPasswordEmail } from '@/components/email/extasy-reset-password-email'
import { ExtasyWelcomeEmail } from '@/components/email/extasy-welcome-email'
import { render } from '@react-email/components'
import { match } from 'ts-pattern'

export type ExtasyEmailProps = {
  type: 'reset-password' | 'welcome' | 'password-changed'
  username: string
  token?: string
}

export async function renderEmailHtml({ ...props }: ExtasyEmailProps) {
  return match(props.type)
    .with('reset-password', () => render(<ExtasyResetPasswordEmail {...props} />))
    .with('welcome', () => render(<ExtasyWelcomeEmail />))
    .with('password-changed', () => render(<ExtasyPasswordUpdatedEmail {...props} />))
    .exhaustive()
}
