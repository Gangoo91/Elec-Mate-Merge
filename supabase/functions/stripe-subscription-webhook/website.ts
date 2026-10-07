/**
 * Website builds (£199 set-up + £39/month) are NOT Elec-Mate plans.
 *
 * Everything else in this webhook turns a subscription into profiles.subscribed /
 * subscription_tier, and its customer lookup rewrites profiles.stripe_customer_id.
 * A website event reaching that code would change (or switch off) someone's app
 * plan. So website events are recognised first, recorded on
 * website_build_requests, and the webhook stops there.
 *
 * Recognised by metadata.kind = 'website' (set on the checkout session, the
 * subscription and its own Stripe customer by website-checkout), or by a
 * website_* price on an invoice line.
 */
import type Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { sendEmail, htmlToPlainText, isSendableEmail } from '../_shared/mailer.ts';
import { renderEmailShell, renderSteps } from '../_shared/email-template.ts';
import { sendWebsiteAlert } from '../_shared/website-alert.ts';

// deno-lint-ignore no-explicit-any
type Db = any;
const FOLLOW_UP_TO = 'founder@elec-mate.com';

const isWebsiteMeta = (m: Stripe.Metadata | null | undefined) => m?.kind === 'website';

export function isWebsiteEvent(event: Stripe.Event): boolean {
  // deno-lint-ignore no-explicit-any
  const o = event.data.object as any;
  if (
    event.type.startsWith('checkout.session.') ||
    event.type.startsWith('customer.subscription.')
  ) {
    return isWebsiteMeta(o.metadata);
  }
  if (event.type.startsWith('invoice.')) {
    if (isWebsiteMeta(o.subscription_details?.metadata)) return true;
    // deno-lint-ignore no-explicit-any
    return (o.lines?.data ?? []).some(
      (l: any) =>
        isWebsiteMeta(l.price?.metadata) || String(l.price?.lookup_key ?? '').startsWith('website_')
    );
  }
  return false;
}

/** "Thanks, here's what happens next": from Elec-Mate, replies come to us. */
export async function confirmToCustomer(
  to: string | null,
  company: string | null,
  minimumEnds: Date,
  paidPence: number | null,
  send = true
): Promise<string | null> {
  if (!to || !isSendableEmail(to)) return null;
  const paid = paidPence != null ? `£${(paidPence / 100).toFixed(2).replace(/\.00$/, '')} ` : '';
  const ends = minimumEnds.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const subject = 'Your Elec-Mate website: order confirmed';
  const html = renderEmailShell({
    subject,
    preheader: "Thanks for your order. Here's what happens next.",
    company: {
      name: 'Elec-Mate',
      email: 'founder@elec-mate.com',
      website: 'https://www.elec-mate.com',
    },
    greeting: company ? `Hi ${company},` : 'Hi,',
    body: `<p style="margin:0 0 14px;">Thanks for ordering your website. Your payment ${paid ? `of ${paid}` : ''}(set-up and your first month) has gone through.</p>`,
    card: renderSteps({
      label: 'What happens next',
      steps: [
        'We get in touch for your details, logo and photos',
        'We build your site and connect its form to your Enquiries',
        'You check it over, then it goes live',
      ],
      accent: '#F5C518',
    }),
    signoff: `<tr><td style="padding:0 36px 36px;font-size:15px;color:#334155;line-height:1.6;"><p style="margin:0 0 6px;">£39 a month from today, hosting included. The 12-month minimum runs to ${ends}; after that you can cancel any time by replying to this email.</p><p style="margin:14px 0 0;">Thanks,<br><strong>Andrew, Elec-Mate</strong></p></td></tr>`,
  });
  if (!send) return html;
  await sendEmail({
    from: 'Elec-Mate <noreply@elec-mate.com>',
    replyTo: FOLLOW_UP_TO,
    to,
    subject,
    html,
    text: htmlToPlainText(html),
    tags: [{ name: 'type', value: 'website_order_confirmed' }],
    log: { template: 'website_order_confirmed' },
  }).catch((e) => console.error('[website] confirmation email failed', e));
  return html;
}

async function tellCustomer(db: Db, userId: string, title: string, message: string) {
  await db.from('user_notifications').insert({
    user_id: userId,
    type: 'billing',
    title,
    message,
    link: '/electrician/enquiries/setup',
    is_read: false,
  });
}

/** Handle a website event. Returns true when it was one (the caller must stop). */
export async function handleWebsiteEvent(event: Stripe.Event, db: Db): Promise<boolean> {
  if (!isWebsiteEvent(event)) return false;
  // deno-lint-ignore no-explicit-any
  const o = event.data.object as any;
  const now = new Date().toISOString();

  // The request this belongs to: by id from metadata, else by subscription
  const requestId: string | undefined =
    o.metadata?.request_id ?? o.subscription_details?.metadata?.request_id;
  const subscriptionId: string | undefined =
    typeof o.subscription === 'string'
      ? o.subscription
      : o.object === 'subscription'
        ? o.id
        : undefined;
  let q = db
    .from('website_build_requests')
    .select('id, user_id, company_name, contact_email, status, paid_at');
  q = requestId
    ? q.eq('id', requestId)
    : q.eq('stripe_subscription_id', subscriptionId ?? '__none__');
  const { data: req } = await q.maybeSingle();
  if (!req) {
    console.error(
      '[website] no request for event',
      event.type,
      event.id,
      requestId,
      subscriptionId
    );
    return true; // still never let it reach the plan logic
  }
  const update = (fields: Record<string, unknown>) =>
    db
      .from('website_build_requests')
      .update({ ...fields, updated_at: now })
      .eq('id', req.id);

  // Paid exactly once, whichever event gets here first (checkout or subscription):
  // the conditional update is the lock, so emails and alerts never double up.
  const markPaid = async (p: {
    subscriptionId: string | null;
    customerId: string | null;
    email: string | null;
    amountPence: number | null;
  }) => {
    const ends = new Date(Date.now() + 365 * 24 * 3600_000);
    const { data: won } = await db
      .from('website_build_requests')
      .update({
        status: 'paid',
        paid_at: now,
        last_paid_at: now,
        stripe_subscription_id: p.subscriptionId,
        stripe_customer_id: p.customerId,
        subscription_status: 'active',
        commitment_ends_at: ends.toISOString(),
        updated_at: now,
      })
      .eq('id', req.id)
      .is('paid_at', null)
      .select('id');
    if (!won?.length) return; // already recorded by the other event
    await confirmToCustomer(p.email, req.company_name, ends, p.amountPence);
    await tellCustomer(
      db,
      req.user_id,
      'Payment received: your website is on its way',
      "We'll be in touch to get your details and photos, then build it."
    );
    await sendWebsiteAlert({
      kind: 'paid',
      company: req.company_name,
      email: req.contact_email,
      paid: p.amountPence != null ? `£${(p.amountPence / 100).toFixed(2)}` : null,
      minimumEnds: ends,
      subscriptionId: p.subscriptionId,
      userId: req.user_id,
    }).catch((e) => console.error('[website] alert failed', e));
  };

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      if (o.payment_status !== 'paid' && o.payment_status !== 'no_payment_required') break;
      await markPaid({
        subscriptionId: subscriptionId ?? o.subscription ?? null,
        customerId: typeof o.customer === 'string' ? o.customer : null,
        email: o.customer_details?.email ?? req.contact_email,
        amountPence: o.amount_total ?? null,
      });
      break;
    }
    case 'invoice.paid': {
      await update({ last_paid_at: now, subscription_status: 'active' });
      break;
    }
    case 'invoice.payment_failed': {
      await update({ subscription_status: 'past_due' });
      await tellCustomer(
        db,
        req.user_id,
        "Your website payment didn't go through",
        'Update your card to keep your website online.'
      );
      await sendWebsiteAlert({
        kind: 'failed',
        company: req.company_name,
        email: req.contact_email,
        subscriptionId: subscriptionId ?? null,
        userId: req.user_id,
      }).catch((e) => console.error('[website] alert failed', e));
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      await update({ subscription_status: o.status, stripe_subscription_id: o.id });
      // If the checkout event is late or lost, an active subscription still means paid
      if (o.status === 'active' && !req.paid_at && ['new', 'contacted'].includes(req.status)) {
        await markPaid({
          subscriptionId: o.id,
          customerId: typeof o.customer === 'string' ? o.customer : null,
          email: req.contact_email,
          amountPence: null,
        });
      }
      break;
    }
    case 'customer.subscription.deleted': {
      await update({ subscription_status: 'canceled', status: 'cancelled' });
      await sendWebsiteAlert({
        kind: 'ended',
        company: req.company_name,
        email: req.contact_email,
        subscriptionId: o.id,
        userId: req.user_id,
      }).catch((e) => console.error('[website] alert failed', e));
      break;
    }
  }
  return true;
}
