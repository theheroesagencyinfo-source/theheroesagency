import * as React from 'react'
import { BrandEmail, CTA, Note, P } from './brand-layout'
interface EmailChangeEmailProps { siteName: string; oldEmail: string; email: string; newEmail: string; confirmationUrl: string }
export const EmailChangeEmail = ({ oldEmail, newEmail, confirmationUrl }: EmailChangeEmailProps) => (
  <BrandEmail preview="Confirm your new email address" eyebrow="Account security" title="Confirm your new email">
    <P>You asked to change the email on your TheHeroes Agency account from {oldEmail || 'your current address'} to {newEmail || 'a new address'}.</P>
    <CTA href={confirmationUrl}>Confirm the change</CTA>
    <Note>If you did not request this change, please secure your account right away and reply to this email.</Note>
  </BrandEmail>
)
export default EmailChangeEmail
