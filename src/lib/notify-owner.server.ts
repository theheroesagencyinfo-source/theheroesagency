// Server-only: emails the studio inbox about a new website submission. Never throws.
export async function notifyOwner(input: {
  kind: string; name: string; email: string; id: string;
  rows: { label: string; value: string }[]; message?: string;
}) {
  try {
    const { sendTemplateEmail } = await import('@/lib/email-templates/send-email')
    await sendTemplateEmail('owner-notification', 'info@theheroesagency.org', {
      templateData: { kind: input.kind, name: input.name, rows: input.rows, message: input.message },
      idempotencyKey: `owner-notification-${input.id}`,
      replyTo: input.email,
    })
  } catch (e) {
    console.error('owner notification failed', e instanceof Error ? e.message : e)
  }
}
