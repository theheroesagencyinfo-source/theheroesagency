import * as React from 'react'
import { Text } from '@react-email/components'
import { BRAND, BrandEmail, Note, P } from './brand-layout'
interface ReauthenticationEmailProps { token: string }
export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <BrandEmail preview="Your TheHeroes Agency verification code" eyebrow="Account security" title="Your verification code">
    <P>Enter this code to confirm it is you:</P>
    <Text style={{ margin: '6px 0 10px', padding: '18px', textAlign: 'center', fontFamily: BRAND.serif, fontSize: '34px', letterSpacing: '0.35em', color: BRAND.ink, backgroundColor: '#ffffff', border: `1px solid ${BRAND.line}`, borderRadius: '6px' }}>{token}</Text>
    <Note>This code expires shortly. If you did not request it, you can safely ignore this email.</Note>
  </BrandEmail>
)
export default ReauthenticationEmail
