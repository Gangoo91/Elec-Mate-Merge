/**
 * The internal emails to founder@ about website orders (asked, paid, payment
 * failed, ended). One design for all four: what happened, who, what to do next,
 * and a button straight to Admin → Websites.
 */
import { sendEmail, htmlToPlainText } from './mailer.ts';
import { renderEmailShell, renderHero, renderCard, renderButton } from './email-template.ts';

export type WebsiteAlertKind = 'interest' | 'paid' | 'failed' | 'ended';

const KIND: Record<
  WebsiteAlertKind,
  { emoji: string; label: string; pill: string; bg: string; fg: string; next: string }
> = {
  interest: {
    emoji: '👋',
    label: 'Website request',
    pill: 'Wants to talk first',
    bg: '#dbeafe',
    fg: '#1e40af',
    next: 'Give them a call or reply to this email. Nothing has been paid yet.',
  },
  paid: {
    emoji: '💷',
    label: 'Website order',
    pill: 'Paid',
    bg: '#dcfce7',
    fg: '#166534',
    next: 'Get in touch for their details and photos, then Start building in Admin.',
  },
  failed: {
    emoji: '⚠️',
    label: 'Website payment',
    pill: 'Payment failed',
    bg: '#fee2e2',
    fg: '#991b1b',
    next: "They've been asked to update their card. Stripe retries automatically.",
  },
  ended: {
    emoji: '⏹',
    label: 'Website subscription',
    pill: 'Ended',
    bg: '#f1f5f9',
    fg: '#334155',
    next: 'Take the site down, or hand the domain over if they want to keep it.',
  },
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

type AlertOpts = {
  kind: WebsiteAlertKind;
  company: string | null;
  email: string | null;
  phone?: string | null;
  notes?: string | null;
  paid?: string | null; // "£238.00"
  minimumEnds?: Date | null;
  subscriptionId?: string | null;
  userId: string;
};

export function renderWebsiteAlert(opts: AlertOpts): { subject: string; html: string } {
  const k = KIND[opts.kind];
  const who = opts.company ?? opts.email ?? 'An electrician';
  const subject = `${k.emoji} ${k.label}: ${who}${opts.kind === 'paid' && opts.paid ? ` (${opts.paid})` : ''}`;

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 0;font-size:15px;color:#0f172a;">${value}</td></tr>`;
  const rows = [
    opts.email &&
      row('Email', `<a href="mailto:${esc(opts.email)}" style="color:#0f172a;">${esc(opts.email)}</a>`),
    opts.phone &&
      row(
        'Phone',
        `<a href="tel:${esc(opts.phone.replace(/\s+/g, ''))}" style="color:#0f172a;">${esc(opts.phone)}</a>`
      ),
    opts.paid && row('Paid today', esc(opts.paid)),
    opts.minimumEnds &&
      row(
        'Minimum term',
        `to ${opts.minimumEnds.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
      ),
    opts.notes && row('Their notes', esc(opts.notes).replace(/\n/g, '<br>')),
  ]
    .filter(Boolean)
    .join('');

  const stripeLink = opts.subscriptionId
    ? `<p style="margin:12px 0 0;text-align:center;font-size:13px;"><a href="https://dashboard.stripe.com/subscriptions/${esc(opts.subscriptionId)}" style="color:#64748b;">Open in Stripe</a></p>`
    : '';

  const html = renderEmailShell({
    subject,
    preheader: `${k.pill}. ${k.next}`,
    company: { name: 'Elec-Mate', primaryColor: '#F5C518', website: 'https://www.elec-mate.com' },
    hero: renderHero({
      label: k.label,
      value: who,
      sub: k.next,
      pill: { text: k.pill, background: k.bg, color: k.fg },
    }),
    card: renderCard({
      label: 'Details',
      body:
        (rows ? `<table role="presentation" style="border-collapse:collapse;">${rows}</table>` : '') +
        `<p style="margin:14px 0 0;font-size:11px;color:#94a3b8;">Account ${esc(opts.userId)}</p>`,
    }),
    cta:
      renderButton({
        label: 'Open Admin → Websites',
        href: 'https://www.elec-mate.com/admin/websites',
        background: '#F5C518',
      }) + (stripeLink ? `<tr><td style="padding:0 36px 8px;">${stripeLink}</td></tr>` : ''),
    signoff: '',
  });
  return { subject, html };
}

export function sendWebsiteAlert(opts: AlertOpts) {
  const { subject, html } = renderWebsiteAlert(opts);
  return sendEmail({
    from: 'Elec-Mate <noreply@elec-mate.com>',
    to: 'founder@elec-mate.com',
    replyTo: opts.email ?? undefined,
    subject,
    html,
    text: htmlToPlainText(html),
    tags: [{ name: 'type', value: `website_${opts.kind}` }],
    log: { template: `website_alert_${opts.kind}`, userId: opts.userId },
  });
}
