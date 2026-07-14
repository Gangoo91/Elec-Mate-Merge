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
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const RESUMABLE_STATUSES = ['draft', 'auto-draft', 'in-progress'];

// Only route types with a confirmed /{type}/{id} edit route; anything else
// falls back to the My Reports list rather than a guessed URL.
const ROUTED_REPORT_TYPES = new Set(['eicr', 'eic', 'minor-works', 'testing-only', 'pat-testing']);

const TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'testing-only': 'Testing Only',
  'pat-testing': 'PAT Testing',
};

interface ResumeItem {
  kind: 'cert' | 'quote' | 'invoice';
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

  const { data: item } = useQuery<ResumeItem | null>({
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
      const [certRes, quoteRes, invoiceRes, doneCertRes] = await Promise.all([
        supabase
          .from('reports')
          .select('id, report_type, client_name, installation_address, updated_at')
          .eq('user_id', user!.id)
          .in('status', RESUMABLE_STATUSES)
          .is('deleted_at', null)
          .gte('updated_at', recencyCutoff)
          .order('updated_at', { ascending: false })
          .limit(1),
        supabase
          .from('quotes')
          .select('id, total, status, updated_at, quote_number, client_data')
          .eq('user_id', user!.id)
          .eq('status', 'draft')
          .eq('invoice_raised', false)
          .is('deleted_at', null)
          .gte('updated_at', recencyCutoff)
          .order('updated_at', { ascending: false })
          .limit(1),
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
          .limit(1),
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
      ]);

      [certRes, quoteRes, invoiceRes, doneCertRes].forEach((r) => {
        if (r.error) console.warn('[ResumeCard] query failed:', r.error.message);
      });

      const cert = certRes.data?.[0];
      const quote = quoteRes.data?.[0];
      const invoice = invoiceRes.data?.[0];

      const certAddress = cert?.installation_address?.split('\n')[0]?.trim();
      const certItem: ResumeItem | null = cert
        ? {
            kind: 'cert',
            id: cert.id,
            tag: `${TYPE_LABELS[cert.report_type] || 'Certificate'} · In progress`,
            headline: certAddress || cert.client_name || 'Unnamed job',
            detail: certAddress && cert.client_name ? cert.client_name : null,
            updatedAt: cert.updated_at,
            path: ROUTED_REPORT_TYPES.has(cert.report_type)
              ? `/electrician/inspection-testing/${cert.report_type}/${cert.id}`
              : '/electrician/inspection-testing?section=my-reports',
          }
        : null;

      // Headline priority: client name → amount → quote number. A big white
      // "£2,036" beats a grey "Untitled quote" when the name's not in yet.
      const quoteClient = (quote?.client_data as { name?: string } | null)?.name?.trim();
      const quoteTotal = Number(quote?.total ?? 0);
      const quoteAmount =
        quoteTotal > 0
          ? `£${quoteTotal.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`
          : null;
      const quoteItem: ResumeItem | null = quote
        ? {
            kind: 'quote',
            id: quote.id,
            tag: 'Draft quote',
            headline:
              quoteClient ||
              quoteAmount ||
              (quote.quote_number ? `Quote ${quote.quote_number}` : 'Untitled quote'),
            detail: quoteClient
              ? quoteAmount
                ? `${quoteAmount} drafted`
                : 'No items priced yet'
              : quote.quote_number
                ? `Quote ${quote.quote_number}`
                : 'Draft in progress',
            updatedAt: quote.updated_at,
            path: `/electrician/quote-builder/${quote.id}`,
          }
        : null;

      const invoiceClient = (invoice?.client_data as { name?: string } | null)?.name?.trim();
      const invoiceTotal = Number(invoice?.total ?? 0);
      const invoiceAmount =
        invoiceTotal > 0
          ? `£${invoiceTotal.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`
          : null;
      const invoiceItem: ResumeItem | null = invoice
        ? {
            kind: 'invoice',
            id: invoice.id,
            tag: 'Draft invoice',
            headline:
              invoiceClient ||
              invoiceAmount ||
              (invoice.invoice_number ? `Invoice ${invoice.invoice_number}` : 'Untitled invoice'),
            detail: invoiceClient
              ? invoiceAmount
                ? `${invoiceAmount} drafted`
                : 'No items yet'
              : invoice.invoice_number
                ? `Invoice ${invoice.invoice_number}`
                : 'Draft in progress',
            updatedAt: invoice.updated_at,
            path: `/electrician/invoice-quote-builder/${invoice.id}`,
          }
        : null;

      // Most recently touched across all three work types.
      const candidates = [certItem, quoteItem, invoiceItem].filter(
        (i): i is ResumeItem => i !== null
      );
      if (candidates.length === 0) return null;
      candidates.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      const best = candidates[0];

      // Completed-since check: if the user has FINISHED something since last
      // touching this draft, it isn't "where they left off" — show nothing
      // rather than nag about stale context (ELE-1327).
      const latestCompleted = doneCertRes.data?.[0]
        ? new Date(doneCertRes.data[0].updated_at).getTime()
        : 0;
      if (latestCompleted > new Date(best.updatedAt).getTime()) return null;

      return best;
    },
  });

  if (!item) return null;

  const edited = formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true }).replace(
    'about ',
    ''
  );

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Eyebrow>PICK UP WHERE YOU LEFT OFF</Eyebrow>
      </motion.div>

      <motion.button
        variants={itemVariants}
        type="button"
        onClick={() => navigate(item.path)}
        className="group relative block w-full touch-manipulation overflow-hidden rounded-2xl border border-elec-yellow/40 bg-gradient-to-br from-elec-yellow/[0.16] via-elec-yellow/[0.05] to-transparent text-left transition-colors hover:from-elec-yellow/[0.22]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/90 to-elec-yellow/0" />

        <div className="px-4 pt-4 sm:px-6 sm:pt-5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              {item.tag}
            </span>
            <span className="shrink-0 text-[11px] text-white/60">Edited {edited}</span>
          </div>
          <h3 className="mt-2.5 line-clamp-2 text-[22px] font-bold leading-tight tracking-tight text-white tabular-nums sm:text-[26px]">
            {item.headline}
          </h3>
          {item.detail && (
            <p className="mt-1 text-[13.5px] leading-snug text-white/70 tabular-nums">
              {item.detail}
            </p>
          )}
        </div>

        <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-5">
          <span className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors group-hover:bg-yellow-400">
            Resume
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </motion.button>
    </motion.section>
  );
}

export default ResumeCard;
