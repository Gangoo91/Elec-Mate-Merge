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
const ROUTED_REPORT_TYPES = new Set([
  'eicr',
  'eic',
  'minor-works',
  'testing-only',
  'pat-testing',
]);

const TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'testing-only': 'Testing Only',
  'pat-testing': 'PAT Testing',
};

interface ResumeItem {
  kind: 'cert' | 'quote';
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
      const [certRes, quoteRes] = await Promise.all([
        supabase
          .from('reports')
          .select('id, report_type, client_name, installation_address, updated_at')
          .eq('user_id', user!.id)
          .in('status', RESUMABLE_STATUSES)
          .order('updated_at', { ascending: false })
          .limit(1),
        supabase
          .from('quotes')
          .select('id, total, status, updated_at, quote_number, client_data')
          .eq('user_id', user!.id)
          .eq('status', 'draft')
          .order('updated_at', { ascending: false })
          .limit(1),
      ]);

      const cert = certRes.data?.[0];
      const quote = quoteRes.data?.[0];

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

      if (certItem && quoteItem) {
        return new Date(certItem.updatedAt) >= new Date(quoteItem.updatedAt)
          ? certItem
          : quoteItem;
      }
      return certItem ?? quoteItem ?? null;
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
