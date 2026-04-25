/**
 * JobDetailSheet — full job details bottom sheet.
 *
 * Rebuilt to:
 *   • Show only real data (no hardcoded requirements/benefits placeholders)
 *   • Hide "Unknown" company cleanly
 *   • One key-facts strip instead of duplicated info + 2x2 grid
 *   • Friendly empty-state when the source doesn't provide a description
 *   • Apply button actually tries job.external_url (the field the type has)
 */

import { useRef } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { shareContent } from '@/utils/share';
import { openExternalUrl } from '@/utils/open-external-url';
import { motion } from 'framer-motion';
import { Drawer } from 'vaul';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Banknote,
  ExternalLink,
  Bookmark,
  Share2,
  Zap,
  FileText,
  ArrowRight,
} from 'lucide-react';
import type { UnifiedJob } from '@/hooks/job-vacancies/useUnifiedJobSearch';

interface JobDetailSheetProps {
  job: UnifiedJob | null;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (job: UnifiedJob) => void;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────

const isCompanyKnown = (company: string | null | undefined): boolean => {
  if (!company) return false;
  const normalized = company.trim().toLowerCase();
  return normalized !== '' && normalized !== 'unknown' && normalized !== 'n/a';
};

const formatPostedDate = (date: string): string => {
  const posted = new Date(date);
  if (Number.isNaN(posted.getTime())) return '—';
  const now = new Date();
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return posted.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const isJobFresh = (postedDate: string): boolean => {
  const posted = new Date(postedDate);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return posted > oneDayAgo;
};

const getSourceColor = (source: string) => {
  const colors: Record<string, string> = {
    reed: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    Reed: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    adzuna: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
    Adzuna: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
    gumtree: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    Gumtree: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    indeed: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
    Indeed: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
  };
  return colors[source] || 'bg-white/[0.06] border-white/[0.1] text-white';
};

// Letter avatar — uses first 1-2 meaningful characters
const CompanyLogo = ({
  company,
  imageUrl,
}: {
  company: string | null | undefined;
  imageUrl?: string | null;
}) => {
  const known = isCompanyKnown(company);
  const source = known ? (company as string) : 'JB';
  const initials = source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={known ? (company as string) : 'Job'}
        className="w-14 h-14 rounded-2xl object-cover bg-white/[0.04] ring-1 ring-white/[0.08]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }

  return (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-400/20 flex items-center justify-center">
      <span className="text-xl font-bold text-blue-200 tracking-tight">{initials}</span>
    </div>
  );
};

// Key-fact pill used in the horizontal strip
const FactPill = ({
  icon: Icon,
  label,
  iconColor = 'text-blue-400',
}: {
  icon: typeof Briefcase;
  label: string;
  iconColor?: string;
}) => (
  <div className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.04] ring-1 ring-white/[0.06] text-[12px] font-medium text-white whitespace-nowrap">
    <Icon className={cn('h-3.5 w-3.5 shrink-0', iconColor)} />
    <span>{label}</span>
  </div>
);

// ─── Component ──────────────────────────────────────────────────────────

const JobDetailSheet = ({
  job,
  isOpen,
  onClose,
  onApply,
  onSave,
  isSaved = false,
}: JobDetailSheetProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!job) return null;

  const knownCompany = isCompanyKnown(job.company);
  const companyLabel = knownCompany ? job.company : null;
  const isFresh = isJobFresh(job.posted_date);

  // Clean description — dangerously rendered HTML from the scraper. If the
  // field is empty or just whitespace, we show a friendly fallback instead
  // of the old "No description available" dead-end.
  const rawDescription = (job.description || '').trim();
  const hasDescription = rawDescription.length > 0;

  const handleApply = () => {
    if (onApply) {
      onApply(job);
    } else if (job.external_url) {
      openExternalUrl(job.external_url);
    }
  };

  const handleShare = async () => {
    await shareContent({
      title: job.title,
      text: knownCompany
        ? `Check out this job: ${job.title} at ${job.company}`
        : `Check out this job: ${job.title}`,
      url: job.external_url || window.location.href,
      onFallback: () => {
        if (job.external_url) copyToClipboard(job.external_url);
      },
    });
  };

  return (
    <Drawer.Root
      shouldScaleBackground={false}
      noBodyStyles
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[95vh] outline-none">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.06] ring-1 ring-white/[0.08] flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10 touch-manipulation"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Scrollable body */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overscroll-contain"
          >
            {/* ── Hero ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="relative px-5 pt-2 pb-4"
            >
              {/* Logo + badges row */}
              <div className="flex items-start gap-3 pr-12">
                <CompanyLogo company={job.company} imageUrl={job.image_url} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    {isFresh && (
                      <Badge className="h-5 px-1.5 bg-emerald-500/20 border-emerald-400/30 text-emerald-300 text-[10px] font-bold gap-1">
                        <Zap className="h-2.5 w-2.5" />
                        NEW
                      </Badge>
                    )}
                    {job.source && (
                      <Badge
                        className={cn(
                          'h-5 px-1.5 text-[10px] font-semibold uppercase tracking-wider',
                          getSourceColor(job.source)
                        )}
                      >
                        via {job.source}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight break-words">
                    {job.title}
                  </h2>

                  {/* Company — only if known */}
                  {companyLabel && (
                    <p className="mt-0.5 text-sm text-white font-medium truncate">
                      {companyLabel}
                    </p>
                  )}
                </div>
              </div>

              {/* Key facts strip — horizontally scrollable, no duplicates */}
              <div className="mt-4 flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
                {job.location && (
                  <FactPill icon={MapPin} label={job.location} iconColor="text-blue-400" />
                )}
                {job.type && (
                  <FactPill icon={Briefcase} label={job.type} iconColor="text-cyan-400" />
                )}
                {job.salary && (
                  <FactPill
                    icon={Banknote}
                    label={job.salary}
                    iconColor="text-emerald-400"
                  />
                )}
                <FactPill
                  icon={Clock}
                  label={formatPostedDate(job.posted_date)}
                  iconColor="text-amber-400"
                />
              </div>
            </motion.div>

            {/* ── Description ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="px-5 pb-32"
            >
              <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center">
                    <FileText className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Job Description
                  </h3>
                </div>

                {hasDescription ? (
                  <div
                    className="prose prose-invert prose-sm max-w-none text-white leading-relaxed [&_p]:my-2 [&_ul]:my-2 [&_li]:my-0.5"
                    dangerouslySetInnerHTML={{ __html: rawDescription }}
                  />
                ) : (
                  <div className="text-center py-6 px-2">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] mx-auto flex items-center justify-center mb-3">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm text-white font-medium mb-1">
                      Description not available
                    </p>
                    <p className="text-xs text-white/50 max-w-xs mx-auto leading-relaxed">
                      {job.source
                        ? `This listing didn't include a summary. Tap Apply below to see the full posting on ${job.source}.`
                        : "This listing didn't include a summary. Tap Apply below to see the full posting."}
                    </p>
                    {job.external_url && (
                      <button
                        onClick={() => openExternalUrl(job.external_url)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
                      >
                        View full posting
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── Sticky CTA ── */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/98 to-background/0 pt-8 pb-5 px-5">
            <div className="flex items-center gap-2.5">
              {onSave && (
                <Button
                  variant="outline"
                  onClick={() => onSave(job.id)}
                  aria-label={isSaved ? 'Unsave' : 'Save'}
                  className={cn(
                    'h-12 w-12 p-0 rounded-xl touch-manipulation shrink-0',
                    isSaved
                      ? 'bg-blue-500/15 border-blue-500/40 text-blue-300'
                      : 'bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/10'
                  )}
                >
                  <Bookmark className={cn('h-5 w-5', isSaved && 'fill-current')} />
                </Button>
              )}

              <Button
                variant="outline"
                onClick={handleShare}
                aria-label="Share"
                className="h-12 w-12 p-0 rounded-xl bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/10 touch-manipulation shrink-0"
              >
                <Share2 className="h-5 w-5" />
              </Button>

              <Button
                onClick={handleApply}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 font-semibold shadow-lg shadow-blue-500/25 rounded-xl touch-manipulation"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Apply Now
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default JobDetailSheet;
