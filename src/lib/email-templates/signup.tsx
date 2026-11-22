import * as React from 'react'
import { BrandEmail, CTA, Note, P } from './brand-layout'
interface SignupEmailProps { siteName: string; siteUrl: string; recipient: string; confirmationUrl: string }
export const SignupEmail = ({ recipient, confirmationUrl }: SignupEmailProps) => (
  <BrandEmail preview="Welcome to TheHeroes Agency. Confirm your email to begin." eyebrow="Welcome" title="Welcome to TheHeroes Agency">
    <P>We are delighted you are here. Your client space is where your project comes together: your brief, your progress, your files and every conversation with us, all in one place.</P>
    <P>Please confirm that {recipient} is your email address to activate your account.</P>
    <CTA href={confirmationUrl}>Confirm my email</CTA>
    <Note>If you did not create an account, you can safely ignore this email.</Note>
  </BrandEmail>
)
export default SignupEmail
