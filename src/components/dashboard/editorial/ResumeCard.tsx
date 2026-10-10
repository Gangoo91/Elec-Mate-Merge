/**
 * ResumeCard — "Pick up where you left off."
 *
 * An electrician's day is interruption: half a cert filled in, called to the
 * board, back to the phone. Getting back to that cert used to be four taps
 * through the hub tree. This surfaces the most recently edited unfinished
 * cert or draft quote as the FIRST thing on the dashboard, one tap from
 * resuming. Renders nothing when there's nothing in flight.
 *
 * Layout is typographic like the rest of the editorial dashboard — tag row,
 * headline that wraps (never truncates the amount or address), hairline
 * footer with the single yellow Resume arrow.
 *
 * Resume routes follow the live convention used by ProjectDetailPage:
 *   certs  → /electrician/inspection-testing/{report_type}/{id}
 *   quotes → /electrician/quote-builder/{id}
 */
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { containerVariants, itemVariants } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { compactAge } from '@/lib/notificationCategory';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { certificateHref, certificateTypeLabel } from '@/utils/certificate-href';

const RESUMABLE_STATUSES = ['draft', 'auto-draft', 'in-progress'];

interface ResumeItem {
  kind: 'cert' | 'quote' | 'invoice' | 'visit';
  id: string;
  tag: string;
  headline: string;
  detail: string | null;
  updatedAt: string;
  path: string;
}

export function ResumeCard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // ELE-1070 — the one row stays the headline; up to two more unfinished
  // things sit under it as single lines, so a second half-done job is one
  // tap away too without the card growing back into a panel.
  const { data } = useQuery<{ best: ResumeItem; more: ResumeItem[] } | null>({
    queryKey: ['dashboard-resume', user?.id],
    enabled: !!user?.id && profile?.role !== 'apprentice',
    staleTime: 60_000,
    queryFn: async () => {
      // "Left off" means recently — a months-old draft isn't in flight, and
      // surfacing it forever made the card feel stuck (ELE-1290)
      const recencyCutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

      // ELE-1327 — the card must reflect what the user has ACTUALLY been
      // doing: rank certs, draft quotes AND draft invoices by recency, and
      // suppress the card entirely when the user's latest activity was
      // COMPLETING something after last touching the candidate — a draft
      // older than your last finished job isn't "where you left off".
      const [certRes, quoteRes, invoiceRes, doneCertRes, visitRes] = await Promise.all([
        supabase
          .from('reports')
          .select('id, report_id, report_type, client_name, installation_address, updated_at')
          .eq('user_id', user!.id)
          .in('status', RESUMABLE_STATUSES)
          .is('deleted_at', null)
          .gte('updated_at', recencyCutoff)
          .order('updated_at', { ascending: false })
          .limit(3),
        supabase
          .from('quotes')
          .select('id, total, status, updated_at, quote_number, client_data')
          .eq('user_id', user!.id)
          .eq('status', 'draft')
          .eq('invoice_raised', false)
          .is('deleted_at', null)
          .gte('updated_at', recencyCutoff)
          .order('updated_at', { ascending: false })
          .limit(3),
        supabase
          .from('quotes')
          .select('id, total, updated_at, invoice_number, client_data')
          .eq('user_id', user!.id)
          .eq('invoice_raised', true)
          .eq('invoice_status', 'draft')
          // Invoices soft-delete (and the delete bumps updated_at) — without
          // this a just-deleted draft becomes the "most recent" resume item.
          .is('deleted_at', null)
          .gte('updated_at', recencyCutoff)
          .order('updated_at', { ascending: false })
          .limit(3),
        // Latest COMPLETED work. Certs only: issuing a cert is always a
        // user action, whereas quote/invoice status flips can come from the
        // CLIENT (public accept link) or webhooks bumping updated_at — those
        // would suppress the card without the user doing anything.
        supabase
          .from('reports')
          .select('updated_at')
          .eq('user_id', user!.id)
          .eq('status', 'completed')
          // soft_delete_report bumps updated_at — deleting an old cert must
          // not count as "finished work" and suppress the card.
          .is('deleted_at', null)
          .gte('updated_at', recencyCutoff)
          .order('updated_at', { ascending: false })
          .limit(1),
        // Site visits captured on the day and finished later (ELE-1070 asked
        // for them by name). No soft delete on this table.
        supabase
          .from('site_visits')
          .select('id, property_address, customer_name, updated_at')
          .eq('user_id', user!.id)
          .eq('status', 'in_progress')
          .gte('updated_at', recencyCutoff)
          .order('updated_at', { ascending: false })
          .limit(3),
      ]);

      [certRes, quoteRes, invoiceRes, doneCertRes, visitRes].forEach((r) => {
        if (r.error) console.warn('[ResumeCard] query failed:', r.error.message);
      });

      type CertRow = NonNullable<typeof certRes.data>[number];
      type QuoteRow = NonNullable<typeof quoteRes.data>[number];
      type InvoiceRow = NonNullable<typeof invoiceRes.data>[number];
      type VisitRow = NonNullable<typeof visitRes.data>[number];

      const toCertItem = (cert: CertRow): ResumeItem => {
        const certAddress = cert.installation_address?.split('\n')[0]?.trim();
        return {
          kind: 'cert',
          id: cert.id,
          tag: `${certificateTypeLabel(cert.report_type)} · In progress`,
          headline: certAddress || cert.client_name || 'Unnamed job',
          detail: certAddress && cert.client_name ? cert.client_name : null,
          updatedAt: cert.updated_at,
          // The shared route builder. This was a THIRD hand-maintained copy
          // of the convention, and its list of path-routed types held five
          // of the twenty-five that exist — so a half-finished EV charging,
          // solar PV, emergency lighting or fire alarm cert dropped you on
          // the reports list instead of the document you were editing.
          path: certificateHref(cert.report_type, cert.report_id),
        };
      };

      const money = (total: unknown): string | null => {
        const n = Number(total ?? 0);
        return n > 0 ? `£${n.toLocaleString('en-GB', { maximumFractionDigits: 0 })}` : null;
      };

      // Headline priority: client name → amount → quote number. A big white
      // "£2,036" beats a grey "Untitled quote" when the name's not in yet.
      const toQuoteItem = (quote: QuoteRow): ResumeItem => {
        const client = (quote.client_data as { name?: string } | null)?.name?.trim();
        const amount = money(quote.total);
        return {
          kind: 'quote',
          id: quote.id,
          tag: 'Draft quote',
          headline:
            client ||
            amount ||
            (quote.quote_number ? `Quote ${quote.quote_number}` : 'Untitled quote'),
          detail: client
            ? amount
              ? `${amount} drafted`
              : 'No items priced yet'
            : quote.quote_number
              ? `Quote ${quote.quote_number}`
              : 'Draft in progress',
          updatedAt: quote.updated_at,
          path: `/electrician/quote-builder/${quote.id}`,
        };
      };

      const toInvoiceItem = (invoice: InvoiceRow): ResumeItem => {
        const client = (invoice.client_data as { name?: string } | null)?.name?.trim();
        const amount = money(invoice.total);
        return {
          kind: 'invoice',
          id: invoice.id,
          tag: 'Draft invoice',
          headline:
            client ||
            amount ||
            (invoice.invoice_number ? `Invoice ${invoice.invoice_number}` : 'Untitled invoice'),
          detail: client
            ? amount
              ? `${amount} drafted`
              : 'No items yet'
            : invoice.invoice_number
              ? `Invoice ${invoice.invoice_number}`
              : 'Draft in progress',
          updatedAt: invoice.updated_at,
          path: `/electrician/invoice-quote-builder/${invoice.id}`,
        };
      };

      const toVisitItem = (visit: VisitRow): ResumeItem => {
        const address = visit.property_address?.split('\n')[0]?.trim();
        return {
          kind: 'visit',
          id: visit.id,
          tag: 'Site visit · In progress',
          headline: address || visit.customer_name || 'Site visit',
          detail: address && visit.customer_name ? visit.customer_name : null,
          updatedAt: visit.updated_at,
          path: `/electrician/site-visit/${visit.id}`,
        };
      };

      // Most recently touched across every work type.
      const candidates: ResumeItem[] = [
        ...(certRes.data ?? []).map(toCertItem),
        ...(quoteRes.data ?? []).map(toQuoteItem),
        ...(invoiceRes.data ?? []).map(toInvoiceItem),
        ...(visitRes.data ?? []).map(toVisitItem),
      ];
      if (candidates.length === 0) return null;
      candidates.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      const [best, ...rest] = candidates;

      // Completed-since check: if the user has FINISHED something since last
      // touching this draft, it isn't "where they left off" — show nothing
      // rather than nag about stale context (ELE-1327).
      const latestCompleted = doneCertRes.data?.[0]
        ? new Date(doneCertRes.data[0].updated_at).getTime()
        : 0;
      if (latestCompleted > new Date(best.updatedAt).getTime()) return null;

      return { best, more: rest.slice(0, 2) };
    },
  });

  if (!data) return null;
  const item = data.best;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.h2
        variants={itemVariants}
        className="text-[15px] font-semibold tracking-tight text-elec-yellow"
      >
        Pick up where you left off
      </motion.h2>

      {/*
       * One row, not a panel.
       *
       * This was ~200px: an eyebrow, a card with a 26px headline, a detail
       * line and a full-width volt Resume button — on a dashboard whose job is
       * to get you moving. It also nested a <button> inside a <button>, which
       * is invalid and gives screen readers two overlapping controls for one
       * action, and it was painted with `from-elec-yellow/[0.16]`: a
       * translucent volt fill, the muddy-brown case the card recipe warns
       * about. The whole row is the target now, and volt is the edge and the
       * arrow rather than a wash.
       */}
      <motion.button
        variants={itemVariants}
        type="button"
        onClick={() => navigate(item.path)}
        className={cn(
          'group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border text-left',
          'border-elec-yellow/35 px-4 py-3 sm:px-5',
          CARD_SURFACE,
          'transition-[background-image,border-color,transform] duration-150 ease-out',
          'hover:border-elec-yellow/60 active:scale-[0.99] touch-manipulation',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0"
        />

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              {item.tag}
            </span>
            <span className="text-[11px] tabular-nums text-white">
              · edited {compactAge(item.updatedAt)}
            </span>
          </span>
          <span className="mt-1 block truncate text-[15px] font-semibold leading-tight tracking-tight text-white">
            {item.headline}
          </span>
          {item.detail && (
            <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
              {item.detail}
            </span>
          )}
        </span>

        {/* Not a nested button — a label on the row's own target. */}
        <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-elec-yellow">
          <span className="hidden sm:inline">Resume</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </motion.button>

      {data.more.length > 0 && (
        <motion.ul variants={itemVariants} className="divide-y divide-white/[0.06] px-1">
          {data.more.map((m) => (
            <li key={`${m.kind}-${m.id}`}>
              <button
                type="button"
                onClick={() => navigate(m.path)}
                className="flex min-h-11 w-full items-center gap-3 py-2 text-left touch-manipulation"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-white">
                    {m.headline}
                  </span>
                  <span className="block truncate text-[11px] text-white">
                    {m.tag} · edited {compactAge(m.updatedAt)}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-elec-yellow" />
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.section>
  );
}

export default ResumeCard;
