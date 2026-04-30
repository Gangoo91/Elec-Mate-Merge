import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
  containerVariants,
} from '@/components/college/primitives';
import { useOfstedSignals, type JudgementSignal, type RagStatus } from '@/hooks/useOfstedSignals';
import { cn } from '@/lib/utils';

/* ==========================================================================
   OfstedEifPage — single-glance Ofsted EIF lens. Five judgement panels, each
   showing a RAG dot, headline summary, evidence rows (deep-linked) and any
   known gaps surfaced honestly.

   Lives at /college/compliance/ofsted. Read-only aggregator over existing
   college data — no new schema. Print-friendly so it doubles as the
   inspector-ready handout.
   ========================================================================== */

const RAG_DOT: Record<RagStatus, string> = {
  red: 'bg-rose-400',
  amber: 'bg-amber-400',
  green: 'bg-emerald-400',
  grey: 'bg-white/30',
};

const RAG_LABEL: Record<RagStatus, string> = {
  red: 'Red',
  amber: 'Amber',
  green: 'Green',
  grey: 'Not tracked',
};

const RAG_BADGE: Record<RagStatus, string> = {
  red: 'border-rose-300/30 text-rose-200 bg-rose-500/[0.10]',
  amber: 'border-amber-300/30 text-amber-200 bg-amber-500/[0.10]',
  green: 'border-emerald-300/30 text-emerald-200 bg-emerald-500/[0.10]',
  grey: 'border-white/[0.10] text-white bg-white/[0.04]',
};

export default function OfstedEifPage() {
  const { data, loading, error, refresh } = useOfstedSignals();

  const generated = data?.generated_at
    ? new Date(data.generated_at).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Compliance · Ofsted EIF lens"
          title="Inspection-ready snapshot"
          description="Live RAG read across the four Education Inspection Framework judgements plus the apprenticeship lens. Click any evidence row to jump to the source surface."
          tone="purple"
          actions={
            <div className="flex items-center gap-3 flex-wrap justify-end">
              {generated && (
                <span className="text-[11px] text-white whitespace-nowrap">
                  Generated {generated}
                </span>
              )}
              <button
                onClick={refresh}
                disabled={loading}
                className="text-[12px] font-medium text-white hover:text-white transition-colors touch-manipulation disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
              <button
                onClick={() => window.print()}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Print snapshot →
              </button>
            </div>
          }
        />
      </motion.div>

      {error && (
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-rose-300/30 bg-rose-500/[0.06] px-4 py-3 text-[13px] text-rose-200"
        >
          {error}
        </motion.div>
      )}

      {loading && !data && (
        <motion.div variants={itemVariants} className="py-10 text-center text-[12.5px] text-white">
          Loading signals…
        </motion.div>
      )}

      {data && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
        >
          {data.judgements.map((j) => (
            <JudgementCard key={j.key} judgement={j} />
          ))}
        </motion.div>
      )}
    </PageFrame>
  );
}

function JudgementCard({ judgement }: { judgement: JudgementSignal }) {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden"
    >
      <div className="px-4 sm:px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={cn('w-2.5 h-2.5 rounded-full shrink-0', RAG_DOT[judgement.rag])}
              aria-hidden="true"
            />
            <h2 className="text-[15px] sm:text-[16px] font-semibold text-white tracking-tight truncate">
              {judgement.title}
            </h2>
          </div>
          <span
            className={cn(
              'inline-flex items-center h-6 px-2 rounded-md border text-[11px] font-semibold whitespace-nowrap',
              RAG_BADGE[judgement.rag]
            )}
          >
            {RAG_LABEL[judgement.rag]}
          </span>
        </div>
        <p className="mt-2 text-[12.5px] text-white leading-snug">{judgement.summary}</p>
      </div>

      <ul className="divide-y divide-white/[0.05]">
        {judgement.evidence.map((row, i) => {
          const clickable = Boolean(row.href);
          return (
            <li key={`${judgement.key}-${i}`}>
              <button
                type="button"
                onClick={() => row.href && navigate(row.href)}
                disabled={!clickable}
                className={cn(
                  'w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-left touch-manipulation transition-colors',
                  clickable ? 'hover:bg-white/[0.02]' : 'cursor-default'
                )}
              >
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full shrink-0 mt-1',
                    row.status ? RAG_DOT[row.status] : 'bg-white/30'
                  )}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-medium text-white leading-snug">
                    {row.label}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-white tabular-nums">{row.value}</div>
                </div>
                {clickable && (
                  <span className="text-white text-[14px] shrink-0" aria-hidden="true">
                    →
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {judgement.gaps.length > 0 && (
        <div className="px-4 sm:px-5 py-3 border-t border-white/[0.06] bg-white/[0.01]">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
            Known gaps
          </div>
          <ul className="mt-1.5 space-y-1">
            {judgement.gaps.map((g, i) => (
              <li
                key={`${judgement.key}-gap-${i}`}
                className="flex items-start gap-2 text-[11.5px] text-white leading-snug"
              >
                <span className="text-rose-300/80 mt-0.5">•</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
