/**
 * EmployerJobDetailSheet — editorial detail panel for direct employer jobs.
 *
 * Responsive: bottom sheet on mobile, centred modal on desktop. Drops the
 * emerald gradient parallax header, the per-stat colour palette, and the
 * gradient apply button for editorial chrome — direct employer jobs are
 * still differentiated via a subtle emerald accent line + "Direct" pill.
 * Collapsible sections use numbered eyebrows + hairline dividers.
 */

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shareContent } from '@/utils/share';
import { cn } from '@/lib/utils';
import {
  X,
  MapPin,
  Clock,
  Building2,
  ChevronDown,
  Bookmark,
  Share2,
  CheckCircle2,
  Shield,
  BadgeCheck,
  Send,
  MessageSquare,
  Eye,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import type { UnifiedJobListing } from '@/types/unified-jobs';

interface EmployerJobDetailSheetProps {
  job: UnifiedJobListing | null;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (job: UnifiedJobListing) => void;
  onSave?: (jobId: string) => void;
  onMessage?: (job: UnifiedJobListing) => void;
  isSaved?: boolean;
}

const initialsOf = (company: string): string =>
  company
    .split(/[\s/&\-+]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && /^[a-z0-9]/i.test(t))
    .slice(0, 3)
    .map((t) => t[0])
    .join('')
    .toUpperCase();

const formatPostedDate = (date: string) => {
  const posted = new Date(date);
  const diffDays = Math.floor((Date.now() - posted.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return posted.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const isJobFresh = (postedDate: string) => {
  const posted = new Date(postedDate);
  return posted > new Date(Date.now() - 24 * 60 * 60 * 1000);
};

const CollapsibleSection = ({
  idx,
  title,
  defaultOpen = false,
  children,
}: {
  idx: number;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 py-3.5 text-left hover:bg-white/[0.02] transition-colors touch-manipulation rounded-md -mx-2 px-2"
      >
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
            {String(idx).padStart(2, '0')}
          </span>
          <span className="text-[13.5px] font-semibold text-white">{title}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-white/65" aria-hidden />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-8 pr-2 text-[13px] text-white leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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

const EmployerJobDetailSheet = ({
  job,
  isOpen,
  onClose,
  onApply,
  onSave,
  onMessage,
  isSaved = false,
}: EmployerJobDetailSheetProps) => {
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

  const isFresh = isJobFresh(job.posted_date);
  const initials = initialsOf(job.company);

  const handleApply = () => {
    if (onApply && !job.has_applied) onApply(job);
  };

  const handleShare = async () => {
    await shareContent({
      title: job.title,
      text: `${job.title} at ${job.company}`,
      url: window.location.href,
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

          {/* Centring container */}
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="employer-job-title"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className={cn(
                'pointer-events-auto w-full flex flex-col overflow-hidden relative',
                'bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)]',
                'border border-white/[0.10] shadow-[0_-4px_30px_rgba(0,0,0,0.4)]',
                'h-[95vh] rounded-t-3xl',
                'sm:max-w-2xl sm:h-auto sm:max-h-[85vh] sm:rounded-3xl sm:min-h-[420px]'
              )}
            >
              {/* Emerald accent line — signals direct employer */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] bg-emerald-500/80"
                aria-hidden
              />

              {/* Drag handle (mobile only) */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="w-12 h-1.5 rounded-full bg-white/15" />
              </div>

              {/* Header — eyebrow + close */}
              <div className="flex items-start justify-between gap-3 px-5 sm:px-7 pt-2 sm:pt-6 pb-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  <Shield className="h-3 w-3" aria-hidden />
                  Direct employer
                </span>
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
              <div className="flex-1 overflow-y-auto overscroll-contain pb-32 sm:pb-6">
                <div className="px-5 sm:px-7">
                  {/* Title block */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-emerald-500/[0.08] border border-emerald-500/30 shrink-0 overflow-hidden">
                      {job.employer_logo ? (
                        <img
                          src={job.employer_logo}
                          alt={`${job.company} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-[11px] font-semibold tabular-nums text-emerald-300">
                          {initials}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1
                        id="employer-job-title"
                        className="text-[22px] sm:text-[26px] font-semibold tracking-tight leading-tight text-white"
                      >
                        {job.title}
                      </h1>
                      <p className="mt-1 inline-flex items-center gap-1 text-[13px] text-emerald-300 truncate">
                        {job.company}
                        <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {isFresh && (
                          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 border border-amber-500/40 bg-amber-500/[0.08] rounded-md px-1.5 py-0.5">
                            New today
                          </span>
                        )}
                        {job.has_applied && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300 border border-emerald-500/40 bg-emerald-500/[0.08] rounded-md px-1.5 py-0.5">
                            <BadgeCheck className="h-3 w-3" />
                            Applied
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Fact strip */}
                  <dl className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 text-[11px]">
                    <Stat
                      label="Salary"
                      value={job.salary || 'Competitive'}
                      accent={!!job.salary}
                    />
                    <Stat label="Type" value={job.type} />
                    <Stat
                      label="Location"
                      value={
                        <span className="inline-flex items-center gap-1 truncate">
                          <MapPin className="h-3 w-3 text-white/65 shrink-0" aria-hidden />
                          <span className="truncate">{job.location}</span>
                        </span>
                      }
                    />
                    <Stat
                      label="Posted"
                      value={
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3 text-white/65" aria-hidden />
                          {formatPostedDate(job.posted_date)}
                        </span>
                      }
                    />
                  </dl>

                  {/* Views */}
                  {job.views !== undefined && (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-white/65 tabular-nums">
                      <Eye className="h-3 w-3" aria-hidden />
                      {job.views} {job.views === 1 ? 'view' : 'views'}
                    </p>
                  )}

                  {/* Collapsible sections */}
                  <section className="mt-7 rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] px-4 sm:px-5">
                    <CollapsibleSection idx={1} title="Job description" defaultOpen>
                      <p className="whitespace-pre-wrap">
                        {job.description || 'No description available.'}
                      </p>
                    </CollapsibleSection>

                    {job.requirements && job.requirements.length > 0 && (
                      <CollapsibleSection idx={2} title={`Requirements · ${job.requirements.length}`}>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-baseline gap-2.5">
                              <CheckCircle2
                                className="h-3.5 w-3.5 text-emerald-300 mt-0.5 shrink-0 self-center"
                                aria-hidden
                              />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleSection>
                    )}

                    {job.benefits && job.benefits.length > 0 && (
                      <CollapsibleSection idx={3} title={`Benefits · ${job.benefits.length}`}>
                        <ul className="space-y-2">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-baseline gap-2.5">
                              <Award
                                className="h-3.5 w-3.5 text-elec-yellow mt-0.5 shrink-0 self-center"
                                aria-hidden
                              />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleSection>
                    )}

                    <CollapsibleSection idx={4} title="About the employer">
                      <div className="space-y-3">
                        <div className="inline-flex items-baseline gap-2 text-[13px] text-white">
                          <Building2
                            className="h-3.5 w-3.5 text-emerald-300 self-center"
                            aria-hidden
                          />
                          <span className="font-semibold">{job.company}</span>
                          <BadgeCheck
                            className="h-3.5 w-3.5 text-emerald-300 self-center"
                            aria-hidden
                          />
                        </div>
                        <p className="text-[12.5px] leading-relaxed text-white/85">
                          Verified employer on Elec-Mate. When you apply, your full Elec-ID
                          profile is shared with the hiring team.
                        </p>
                      </div>
                    </CollapsibleSection>

                    <CollapsibleSection idx={5} title="What's shared when you apply">
                      <p className="text-[12.5px] leading-relaxed text-white/85 mb-3">
                        Your Elec-ID gives the employer instant verification of your credentials:
                      </p>
                      <ul className="space-y-2">
                        {[
                          'Name, contact details and professional summary',
                          'ECS Card type and verification status',
                          'All qualifications and certifications',
                          'Work history and experience',
                          'Skills and specialisations',
                        ].map((item, index) => (
                          <li key={index} className="flex items-baseline gap-2.5 text-[12.5px]">
                            <CheckCircle2
                              className="h-3.5 w-3.5 text-emerald-300 shrink-0 self-center"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleSection>
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
                            ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
                      </button>
                    )}
                    {onMessage && (
                      <button
                        type="button"
                        onClick={() => onMessage(job)}
                        aria-label="Message employer"
                        className="h-11 w-11 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 touch-manipulation transition-colors shrink-0"
                      >
                        <MessageSquare className="h-4 w-4" />
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
                      disabled={job.has_applied}
                      className={cn(
                        'flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors',
                        job.has_applied
                          ? 'text-white/65 border border-white/15 bg-white/[0.04] cursor-not-allowed'
                          : 'text-black bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-300/90'
                      )}
                    >
                      {job.has_applied ? (
                        <>
                          <BadgeCheck className="h-4 w-4" />
                          Applied
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Apply with Elec-ID
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
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
                          ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]'
                          : 'text-white/85 border-white/15 hover:border-white/30'
                      )}
                    >
                      <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
                    </button>
                  )}
                  {onMessage && (
                    <button
                      type="button"
                      onClick={() => onMessage(job)}
                      aria-label="Message employer"
                      className="h-11 w-11 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 touch-manipulation transition-colors shrink-0"
                    >
                      <MessageSquare className="h-4 w-4" />
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
                    disabled={job.has_applied}
                    className={cn(
                      'flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors',
                      job.has_applied
                        ? 'text-white/65 border border-white/15 bg-white/[0.04] cursor-not-allowed'
                        : 'text-black bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-300/90'
                    )}
                  >
                    {job.has_applied ? (
                      <>
                        <BadgeCheck className="h-4 w-4" />
                        Applied
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Apply with Elec-ID
                      </>
                    )}
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

export default EmployerJobDetailSheet;
