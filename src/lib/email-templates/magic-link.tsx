import * as React from 'react'
import { BrandEmail, CTA, Note, P } from './brand-layout'
interface MagicLinkEmailProps { siteName: string; confirmationUrl: string }
export const MagicLinkEmail = ({ confirmationUrl }: MagicLinkEmailProps) => (
  <BrandEmail preview="Your sign-in link for TheHeroes Agency" eyebrow="Sign in" title="Your sign-in link">
    <P>Use the button below to sign in to your TheHeroes Agency client space. No password needed.</P>
    <CTA href={confirmationUrl}>Sign in to my account</CTA>
    <Note>This link expires shortly. If you did not request it, you can safely ignore this email.</Note>
  </BrandEmail>
)
export default MagicLinkEmail
