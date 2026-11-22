import * as React from 'react'
import { Body, Button, Column, Container, Head, Hr, Html, Img, Link, Preview, Row, Section, Text } from '@react-email/components'

export const BRAND = {
  ink: '#151832', green: '#1f4d36', paper: '#f3f4fb', cream: '#faf8f3', line: '#e4e1d8', muted: '#6b6e80', gold: '#b89a5e',
  serif: 'Georgia, "Times New Roman", serif', sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
}
const SITE = 'https://theheroesagency.org'
const LOGO = 'https://theheroesagency.lovable.app/__l5e/assets-v1/31e300f3-39ab-4420-9299-90d279d049ce/theheroes-logo-dark-trimmed.png'
const icon = (n: string) => `https://img.icons8.com/ios-filled/50/1f4d36/${n}.png`
const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/theheroes_authorstudio', img: icon('instagram-new') },
  { label: 'Threads', href: 'https://www.threads.com/@theheroes_authorstudio', img: icon('threads') },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/theheroesauthorstudio', img: icon('linkedin') },
  { label: 'X', href: 'https://x.com/moubarrac', img: icon('twitterx--v1') },
  { label: 'Facebook', href: 'https://www.facebook.com/share/19fEAZNYmW/', img: icon('facebook-new') },
  { label: 'TikTok', href: 'https://www.tiktok.com/@moubarrac', img: icon('tiktok') },
]

export function BrandEmail({ preview, eyebrow, title, children }: { preview: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: '#ffffff', margin: 0, padding: '32px 12px', fontFamily: BRAND.sans }}>
        <Container style={{ maxWidth: '580px', margin: '0 auto', backgroundColor: BRAND.cream, border: `1px solid ${BRAND.line}`, borderRadius: '10px', overflow: 'hidden' }}>
          <Section style={{ backgroundColor: BRAND.ink, padding: '30px 36px 26px', textAlign: 'center' }}>
            <Link href={SITE}><Img src={LOGO} alt="TheHeroes Agency" width="220" style={{ margin: '0 auto', display: 'block', height: 'auto' }} /></Link>
            <Text style={{ margin: '14px 0 0', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: BRAND.gold }}>Digital growth for nonfiction authors</Text>
          </Section>
          <Section style={{ height: '4px', backgroundColor: BRAND.green }} />
          <Section style={{ padding: '40px 40px 12px' }}>
            <Text style={{ margin: 0, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BRAND.green, fontWeight: 600 }}>{eyebrow}</Text>
            <Text style={{ margin: '10px 0 22px', fontFamily: BRAND.serif, fontSize: '30px', lineHeight: '1.2', color: BRAND.ink }}>{title}</Text>
            {children}
          </Section>
          <Section style={{ padding: '8px 40px 36px' }}>
            <Hr style={{ borderColor: BRAND.line, margin: '20px 0 24px' }} />
            <Text style={{ margin: '0 0 4px', fontFamily: BRAND.serif, fontStyle: 'italic', fontSize: '15px', color: BRAND.ink }}>With care,</Text>
            <Text style={{ margin: 0, fontSize: '14px', color: BRAND.muted }}>Mou Barrac and the TheHeroes Agency team</Text>
          </Section>
          <Section style={{ backgroundColor: BRAND.paper, padding: '28px 36px', textAlign: 'center', borderTop: `1px solid ${BRAND.line}` }}>
            <Row style={{ width: 'auto', margin: '0 auto' }}><Column>
              {SOCIALS.map((s) => (
                <Link key={s.label} href={s.href} style={{ display: 'inline-block', margin: '0 7px' }}>
                  <Img src={s.img} alt={s.label} width="22" height="22" style={{ display: 'inline-block' }} />
                </Link>
              ))}
            </Column></Row>
            <Text style={{ margin: '18px 0 4px', fontSize: '12px', color: BRAND.ink }}>
              <Link href={SITE} style={{ color: BRAND.ink, textDecoration: 'none', fontWeight: 600 }}>theheroesagency.org</Link>
              {'  ·  '}
              <Link href="mailto:info@theheroesagency.org" style={{ color: BRAND.ink, textDecoration: 'none' }}>info@theheroesagency.org</Link>
            </Text>
            <Text style={{ margin: 0, fontSize: '11px', color: BRAND.muted }}>© {new Date().getFullYear()} TheHeroes Agency. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const P = ({ children }: { children: React.ReactNode }) => (
  <Text style={{ margin: '0 0 18px', fontSize: '15px', lineHeight: '1.7', color: '#33364a' }}>{children}</Text>
)
export const Note = ({ children }: { children: React.ReactNode }) => (
  <Text style={{ margin: '22px 0 0', fontSize: '13px', lineHeight: '1.6', color: BRAND.muted }}>{children}</Text>
)
export const CTA = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Section style={{ margin: '8px 0 8px' }}>
    <Button href={href} style={{ backgroundColor: BRAND.green, color: '#ffffff', padding: '15px 30px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.04em', textDecoration: 'none' }}>{children}</Button>
  </Section>
)
