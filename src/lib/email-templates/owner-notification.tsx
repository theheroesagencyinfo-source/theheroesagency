import * as React from 'react'
import { Hr, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { BRAND, BrandEmail, CTA, P } from './brand-layout'

interface Props { kind?: string; rows?: { label: string; value: string }[]; message?: string }
const label = { margin: 0, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: BRAND.muted }
const value = { margin: '3px 0 16px', fontSize: '15px', color: BRAND.ink, lineHeight: '1.5' }

const OwnerNotification = ({ kind = 'New enquiry', rows = [], message }: Props) => (
  <BrandEmail preview={`${kind} from your website`} eyebrow="New on your website" title={kind}>
    <P>Someone just reached out through theheroesagency.org. Press Reply to answer them directly.</P>
    <div style={{ backgroundColor: '#ffffff', border: `1px solid ${BRAND.line}`, borderRadius: '6px', padding: '22px 24px 6px', margin: '0 0 22px' }}>
      {rows.filter((r) => r.value).map((r) => (
        <React.Fragment key={r.label}><Text style={label}>{r.label}</Text><Text style={value}>{r.value}</Text></React.Fragment>
      ))}
      {message ? (<><Hr style={{ borderColor: BRAND.line, margin: '4px 0 16px' }} /><Text style={label}>Message</Text><Text style={{ ...value, whiteSpace: 'pre-wrap' }}>{message}</Text></>) : null}
    </div>
    <CTA href="https://theheroesagency.org/admin">Open admin</CTA>
  </BrandEmail>
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
