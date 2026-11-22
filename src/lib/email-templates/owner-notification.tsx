import * as React from 'react'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  kind?: string
  rows?: { label: string; value: string }[]
  message?: string
}

const OwnerNotification = ({ kind = 'New enquiry', rows = [], message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`${kind} from your website`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brand}>TheHeroes Agency</Text>
          <Text style={tag}>Digital growth for nonfiction authors</Text>
        </Section>
        <Section style={content}>
          <Heading style={h1}>{kind}</Heading>
          <Text style={lead}>Someone just reached out through your website. Reply to this email to answer them directly.</Text>
          {rows.filter((r) => r.value).map((r) => (
            <Text key={r.label} style={row}><span style={label}>{r.label}</span><br />{r.value}</Text>
          ))}
          {message ? (<><Hr style={hr} /><Text style={label}>Message</Text><Text style={msg}>{message}</Text></>) : null}
          <Button href="https://theheroesagency.org/admin" style={button}>Open admin</Button>
        </Section>
        <Text style={footer}>TheHeroes Agency · theheroesagency.org</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OwnerNotification,
  subject: (d: Record<string, any>) => `${d['kind'] ?? 'New enquiry'}: ${d['name'] ?? 'website visitor'}`,
  displayName: 'New enquiry alert',
  to: 'info@theheroesagency.org',
  previewData: {
    kind: 'Free website review request', name: 'Jane Author',
    rows: [{ label: 'Name', value: 'Jane Author' }, { label: 'Email', value: 'jane@example.com' }, { label: 'Book', value: 'The Quiet Leader' }],
    message: 'I would love feedback on my author website.',
  },
} satisfies TemplateEntry

const serif = 'Georgia, "Times New Roman", serif'
const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: '24px 0' }
const container = { maxWidth: '560px', margin: '0 auto', border: '1px solid #e6dfd0', borderRadius: '6px', overflow: 'hidden' }
const header = { backgroundColor: '#1f3a2e', padding: '24px 28px' }
const brand = { fontFamily: serif, fontSize: '22px', color: '#f6f1e7', margin: 0 }
const tag = { fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#c9b98f', margin: '4px 0 0' }
const content = { backgroundColor: '#fbf8f1', padding: '28px' }
const h1 = { fontFamily: serif, fontSize: '24px', color: '#1f3a2e', margin: '0 0 8px' }
const lead = { fontSize: '14px', color: '#4a4a40', lineHeight: '1.6', margin: '0 0 20px' }
const row = { fontSize: '15px', color: '#22221d', margin: '0 0 14px', lineHeight: '1.5' }
const label = { fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#7a7466' }
const msg = { fontSize: '15px', color: '#22221d', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#e6dfd0', margin: '20px 0' }
const button = { backgroundColor: '#1f3a2e', color: '#f6f1e7', padding: '12px 22px', borderRadius: '4px', fontSize: '14px', textDecoration: 'none', marginTop: '12px' }
const footer = { fontSize: '12px', color: '#7a7466', textAlign: 'center' as const, padding: '16px' }
