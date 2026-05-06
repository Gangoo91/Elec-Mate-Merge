/**
 * JobDetailSheet — responsive editorial detail panel.
 *
 * - Mobile (< sm): full-screen sheet sliding up from the bottom (95vh),
 *   sticky bottom CTA, drag handle.
 * - Desktop (>= sm): centred modal max-w-2xl, max-h-[85vh], natural CTA
 *   inside the scroll body. No more wide-and-short stretch on big screens.
 *
 * Drops vaul Drawer in favour of a hand-rolled Framer Motion modal so we
 * can position differently per breakpoint. The eyebrow no longer duplicates
 * the TYPE fact (we show `via {source}` as the eyebrow instead so the
 * reader knows where the listing came from before they read further).
 * Briefcase fallback removed when company is unknown — the avatar slot is
 * skipped entirely, matching the card behaviour.
 */

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard } from '@/utils/clipboard';
import { shareContent } from '@/utils/share';
import { openExternalUrl } from '@/utils/open-external-url';
import { cn } from '@/lib/utils';
import { X, ExternalLink, Bookmark, Share2, ArrowRight, MapPin } from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import type { UnifiedJob } from '@/hooks/job-vacancies/useUnifiedJobSearch';

interface JobDetailSheetProps {
  job: UnifiedJob | null;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (job: UnifiedJob) => void;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

const isCompanyKnown = (company: string | null | undefined): boolean => {
  if (!company) return false;
  const normalized = company.trim().toLowerCase();
  return normalized !== '' && normalized !== 'unknown' && normalized !== 'n/a';
};

const initialsOf = (company: string): string =>
  company
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

const formatPostedDate = (date: string): string => {
  const posted = new Date(date);
  if (Number.isNaN(posted.getTime())) return '—';
  return posted.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const isJobFresh = (postedDate: string): boolean => {
  const posted = new Date(postedDate);
  return posted > new Date(Date.now() - 24 * 60 * 60 * 1000);
};

const JobDetailSheet = ({
  job,
  isOpen,
  onClose,
  onApply,
  onSave,
  isSaved = false,
}: JobDetailSheetProps) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = original;
      };
    }
  }, [isOpen, handleEscape]);

  if (!job) return null;

  const knownCompany = isCompanyKnown(job.company);
  const isFresh = isJobFresh(job.posted_date);
  const rawDescription = (job.description || '').trim();
  const hasDescription = rawDescription.length > 0;
  const sourceLabel = job.source || null;

  const handleApply = () => {
    if (onApply) onApply(job);
    else if (job.external_url) openExternalUrl(job.external_url);
  };

  const handleShare = async () => {
    await shareContent({
      title: job.title,
      text: knownCompany ? `${job.title} at ${job.company}` : job.title,
      url: job.external_url || window.location.href,
      onFallback: () => {
        if (job.external_url) copyToClipboard(job.external_url);
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"
            aria-hidden
          />

          {/* Centring container — pure flex, no transforms */}
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="job-detail-title"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className={cn(
                'pointer-events-auto w-full flex flex-col overflow-hidden',
                'bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)]',
                'border border-white/[0.10] shadow-[0_-4px_30px_rgba(0,0,0,0.4)]',
                // Mobile: full-screen-ish bottom sheet
                'h-[95vh] rounded-t-3xl',
                // Desktop: centred modal
                'sm:max-w-2xl sm:h-auto sm:max-h-[85vh] sm:rounded-3xl sm:min-h-[420px]'
              )}
            >
              {/* Drag handle (mobile only) */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="w-12 h-1.5 rounded-full bg-white/15" />
              </div>

              {/* Header — eyebrow + close */}
              <div className="flex items-start justify-between gap-3 px-5 sm:px-7 pt-2 sm:pt-6 pb-3">
                <Eyebrow>{sourceLabel ? `via ${sourceLabel}` : 'Vacancy'}</Eyebrow>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center shrink-0 touch-manipulation transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto overscroll-contain pb-28 sm:pb-6">
                <div className="px-5 sm:px-7">
                  {/* Title block */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.05 }}
                    className="flex items-start gap-3"
                  >
                    {knownCompany && (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-elec-yellow/[0.08] border border-elec-yellow/30 shrink-0 overflow-hidden">
                        {job.image_url ? (
                          <img
                            src={job.image_url}
                            alt={`${job.company} logo`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-[11px] font-semibold tabular-nums text-elec-yellow">${initialsOf(job.company as string)}</span>`;
                              }
                            }}
                          />
                        ) : (
                          <span className="text-[11px] font-semibold tabular-nums text-elec-yellow">
                            {initialsOf(job.company as string)}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h1
                        id="job-detail-title"
                        className="text-[22px] sm:text-[26px] font-semibold tracking-tight leading-tight text-white"
                      >
                        {job.title}
                      </h1>
                      {knownCompany && (
                        <p className="mt-1 text-[13px] text-elec-yellow truncate">{job.company}</p>
                      )}
                      {isFresh && (
                        <span className="mt-2 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 border border-amber-500/40 bg-amber-500/[0.08] rounded-md px-1.5 py-0.5">
                          New today
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Fact strip */}
                  <dl className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-[11px]">
                    {job.location && (
                      <Stat
                        label="Location"
                        value={
                          <span className="inline-flex items-center gap-1 truncate">
                            <MapPin className="h-3 w-3 text-white/65 shrink-0" aria-hidden />
                            <span className="truncate">{job.location}</span>
                          </span>
                        }
                      />
                    )}
                    {job.salary && <Stat label="Salary" value={job.salary} accent />}
                    {job.type && <Stat label="Type" value={job.type} />}
                    <Stat label="Posted" value={formatPostedDate(job.posted_date)} />
                  </dl>

                  {/* Description */}
                  <section className="mt-7 space-y-3">
                    <Eyebrow>01 · DESCRIPTION</Eyebrow>
                    {hasDescription ? (
                      <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
                        <div
                          className="prose prose-invert prose-sm max-w-none text-white leading-relaxed [&_p]:my-2 [&_ul]:my-2 [&_li]:my-0.5 [&_strong]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white"
                          dangerouslySetInnerHTML={{ __html: rawDescription }}
                        />
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/[0.10] bg-white/[0.02] p-5 sm:p-6 text-center">
                        <p className="text-[13.5px] leading-relaxed text-white/85 max-w-md mx-auto">
                          The aggregator didn't capture a summary for this listing
                          {sourceLabel ? `.` : '.'}{' '}
                          {sourceLabel
                            ? `Open the full posting on ${sourceLabel} to read it in full.`
                            : 'Open the full posting to read it in full.'}
                        </p>
                        {job.external_url && (
                          <button
                            type="button"
                            onClick={() => openExternalUrl(job.external_url)}
                            className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow hover:text-elec-yellow/80"
                          >
                            View full posting
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </section>

                  {/* Desktop CTA — inline at the bottom of the scroll body */}
                  <section className="hidden sm:flex sm:items-center sm:gap-2 mt-8 pt-6 border-t border-white/[0.06]">
                    {onSave && (
                      <button
                        type="button"
                        onClick={() => onSave(job.id)}
                        aria-label={isSaved ? 'Unsave' : 'Save'}
                        className={cn(
                          'h-11 w-11 rounded-full inline-flex items-center justify-center border touch-manipulation transition-colors shrink-0',
                          isSaved
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleShare}
                      aria-label="Share"
                      className="h-11 w-11 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 touch-manipulation transition-colors shrink-0"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleApply}
                      className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
                    >
                      Apply
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </section>
                </div>
              </div>

              {/* Sticky CTA — mobile only */}
              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-t border-white/[0.08] sm:hidden"
                style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
              >
                <div className="flex items-center gap-2">
                  {onSave && (
                    <button
                      type="button"
                      onClick={() => onSave(job.id)}
                      aria-label={isSaved ? 'Unsave' : 'Save'}
                      className={cn(
                        'h-11 w-11 rounded-full inline-flex items-center justify-center border touch-manipulation transition-colors shrink-0',
                        isSaved
                          ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                          : 'text-white/85 border-white/15 hover:border-white/30'
                      )}
                    >
                      <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share"
                    className="h-11 w-11 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 touch-manipulation transition-colors shrink-0"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleApply}
                    className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
                  >
                    Apply
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const Stat = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) => (
  <div className="min-w-0">
    <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
    <dd
      className={cn(
        'mt-0.5 text-[13.5px] sm:text-[14px] tabular-nums truncate',
        accent ? 'text-elec-yellow font-semibold' : 'text-white font-semibold'
      )}
    >
      {value}
    </dd>
  </div>
);

export default JobDetailSheet;
