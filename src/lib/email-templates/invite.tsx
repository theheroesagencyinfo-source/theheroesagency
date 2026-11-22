import * as React from 'react'
import { BrandEmail, CTA, Note, P } from './brand-layout'
interface InviteEmailProps { siteName: string; siteUrl: string; confirmationUrl: string }
export const InviteEmail = ({ confirmationUrl }: InviteEmailProps) => (
  <BrandEmail preview="You have been invited to TheHeroes Agency" eyebrow="Invitation" title="You are invited">
    <P>You have been invited to join your project space at TheHeroes Agency. Accept the invitation to create your account and follow your project from brief to launch.</P>
    <CTA href={confirmationUrl}>Accept invitation</CTA>
    <Note>If you were not expecting this invitation, you can safely ignore this email.</Note>
  </BrandEmail>
)
export default InviteEmail
