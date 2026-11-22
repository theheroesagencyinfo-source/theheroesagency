import * as React from 'react'
import { BrandEmail, CTA, Note, P } from './brand-layout'
interface RecoveryEmailProps { siteName: string; confirmationUrl: string }
export const RecoveryEmail = ({ confirmationUrl }: RecoveryEmailProps) => (
  <BrandEmail preview="Reset your TheHeroes Agency password" eyebrow="Account security" title="Reset your password">
    <P>We received a request to reset the password for your TheHeroes Agency account. Choose a new password using the button below.</P>
    <CTA href={confirmationUrl}>Choose a new password</CTA>
    <Note>This link expires shortly. If you did not ask for this, ignore this email and your password stays the same.</Note>
  </BrandEmail>
)
export default RecoveryEmail
