/**
 * ProgrammeDetailSheet — editorial bottom sheet.
 *
 * Drops the Unsplash parallax hero. Type-led header with institution mark +
 * initials, eyebrow + title + provider, fact strip (rating / employed /
 * duration / mode), then numbered sections (overview, topics, entry,
 * funding, progression, outcomes). Similar programmes rail at bottom.
 * Sticky CTA bar (Enquire + Apply).
 */

import { openExternalUrl } from '@/utils/open-external-url';
import { motion } from 'framer-motion';
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';
import {
  X,
  Star,
  TrendingUp,
  ExternalLink,
  Bookmark,
  Share2,
  GitCompare,
  ArrowRight,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import type { LiveEducationData } from '@/hooks/useLiveEducationData';

interface ProgrammeDetailSheetProps {
  programme: LiveEducationData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookmark?: (programmeId: string) => void;
  onAddToCompare?: (programme: LiveEducationData) => void;
  isBookmarked?: boolean;
  isInCompare?: boolean;
  similarProgrammes?: LiveEducationData[];
  onSelectSimilar?: (programme: LiveEducationData) => void;
}

const initialsOf = (institution: string): string =>
  institution
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

const formatDuration = (duration: string) => {
  const yr = duration.match(/(\d+)\s*years?/i);
  if (yr) return `${yr[1]}yr${parseInt(yr[1]) > 1 ? 's' : ''}`;
  const mo = duration.match(/(\d+)\s*months?/i);
  if (mo) return `${mo[1]}mo`;
  const wk = duration.match(/(\d+)\s*weeks?/i);
  if (wk) return `${wk[1]}wk${parseInt(wk[1]) > 1 ? 's' : ''}`;
  return duration;
};

const ProgrammeDetailSheet = ({
  programme,
  open,
  onOpenChange,
  onBookmark,
  onAddToCompare,
  isBookmarked = false,
  isInCompare = false,
  similarProgrammes = [],
  onSelectSimilar,
}: ProgrammeDetailSheetProps) => {
  if (!programme) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: programme.title,
          text: `${programme.title} at ${programme.institution}`,
          url: programme.courseUrl || window.location.href,
        });
      } catch {
        // user cancelled
      }
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[95vh] rounded-t-3xl overflow-hidden bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border-white/[0.10]">
        <VisuallyHidden>
          <DrawerTitle>{programme.title}</DrawerTitle>
          <DrawerDescription>
            Programme details for {programme.title} at {programme.institution}
          </DrawerDescription>
        </VisuallyHidden>
        <div className="h-full overflow-y-auto pb-32">
          <div className="px-5 sm:px-6 pt-5 sm:pt-6">
            {/* Close */}
            <div className="flex items-start justify-between gap-3">
              <Eyebrow>{programme.category}</Eyebrow>
              <DrawerClose
                aria-label="Close"
                className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center shrink-0 touch-manipulation transition-colors"
              >
                <X className="h-4 w-4" />
              </DrawerClose>
            </div>

            {/* Header */}
            <div className="mt-4 flex items-start gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-elec-yellow/[0.08] border border-elec-yellow/30 shrink-0">
                <span className="text-[11px] sm:text-[12px] font-semibold tabular-nums text-elec-yellow">
                  {initialsOf(programme.institution)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight text-white">
                  {programme.title}
                </h1>
                <p className="mt-1 text-[13px] text-elec-yellow truncate">
                  {programme.institution}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                    {programme.level}
                  </span>
                  {programme.locations.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                      <MapPin className="h-3 w-3" aria-hidden />
                      {programme.locations[0]}
                      {programme.locations.length > 1 && ` +${programme.locations.length - 1}`}
                    </span>
                  )}
                  {programme.nextIntake && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                      <Calendar className="h-3 w-3" aria-hidden />
                      {programme.nextIntake}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Fact strip */}
            <dl className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 text-[11px]">
              <Stat
                label="Rating"
                value={
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                    {(programme.rating || 0).toFixed(1)}
                  </span>
                }
              />
              <Stat
                label="Employed"
                value={
                  <span className="inline-flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
                    {programme.employmentRate || 0}%
                  </span>
                }
              />
              <Stat label="Duration" value={formatDuration(programme.duration)} />
              <Stat label="Mode" value={programme.studyMode} />
            </dl>

            {/* Action row */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {onBookmark && (
                <button
                  type="button"
                  onClick={() => onBookmark(programme.id)}
                  className={cn(
                    'inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] border rounded-full px-3 py-2 min-h-[40px] touch-manipulation transition-colors',
                    isBookmarked
                      ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                      : 'text-white/85 border-white/15 hover:border-white/30'
                  )}
                >
                  <Bookmark className={cn('h-3.5 w-3.5', isBookmarked && 'fill-current')} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>
              )}
              {onAddToCompare && (
                <button
                  type="button"
                  onClick={() => onAddToCompare(programme)}
                  className={cn(
                    'inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] border rounded-full px-3 py-2 min-h-[40px] touch-manipulation transition-colors',
                    isInCompare
                      ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                      : 'text-white/85 border-white/15 hover:border-white/30'
                  )}
                >
                  <GitCompare className="h-3.5 w-3.5" />
                  {isInCompare ? 'Added' : 'Compare'}
                </button>
              )}
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-3 py-2 min-h-[40px] touch-manipulation transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
            </div>

            {/* Sections */}
            <div className="mt-8 space-y-7">
              {/* 01 — Overview */}
              <section className="space-y-2">
                <Eyebrow>01 · OVERVIEW</Eyebrow>
                <p className="text-[14px] leading-relaxed text-white">{programme.description}</p>
              </section>

              {/* 02 — Key topics */}
              {programme.keyTopics && programme.keyTopics.length > 0 && (
                <section className="space-y-3">
                  <Eyebrow>02 · KEY TOPICS</Eyebrow>
                  <ul className="flex flex-wrap gap-1.5">
                    {programme.keyTopics.map((topic, idx) => (
                      <li
                        key={idx}
                        className="text-[10.5px] uppercase tracking-[0.12em] text-elec-yellow border border-elec-yellow/35 bg-elec-yellow/[0.08] rounded-md px-2 py-0.5"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 03 — Entry requirements */}
              {programme.entryRequirements && programme.entryRequirements.length > 0 && (
                <section className="space-y-3">
                  <Eyebrow>03 · ENTRY REQUIREMENTS</Eyebrow>
                  <ol className="divide-y divide-white/[0.06]">
                    {programme.entryRequirements.map((req, idx) => (
                      <li key={idx} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-baseline gap-3">
                          <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[13px] leading-relaxed text-white">{req}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* 04 — Funding & fees */}
              <section className="space-y-3">
                <Eyebrow>04 · FUNDING + FEES</Eyebrow>
                <dl className="divide-y divide-white/[0.06] text-[13px]">
                  <FeeRow label="Tuition" value={programme.tuitionFees} />
                  {programme.averageStartingSalary && (
                    <FeeRow
                      label="Avg starting salary"
                      value={
                        <span className="text-emerald-300 tabular-nums">
                          {programme.averageStartingSalary}
                        </span>
                      }
                    />
                  )}
                </dl>
                {programme.fundingOptions && programme.fundingOptions.length > 0 && (
                  <div className="pt-2">
                    <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 mb-2">
                      Funding options
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {programme.fundingOptions.map((option, idx) => (
                        <li
                          key={idx}
                          className="text-[10.5px] uppercase tracking-[0.12em] text-emerald-300 border border-emerald-500/35 bg-emerald-500/[0.08] rounded-md px-2 py-0.5"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              {/* 05 — Progression */}
              {programme.progressionOptions && programme.progressionOptions.length > 0 && (
                <section className="space-y-3">
                  <Eyebrow>05 · PROGRESSION</Eyebrow>
                  <ol className="divide-y divide-white/[0.06]">
                    {programme.progressionOptions.map((option, idx) => (
                      <li key={idx} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-baseline gap-3">
                          <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[13px] leading-relaxed text-white">{option}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* 06 — Career outcomes */}
              {programme.careerOutcomes && (programme.careerOutcomes as string[]).length > 0 && (
                <section className="space-y-3">
                  <Eyebrow>06 · CAREER OUTCOMES</Eyebrow>
                  <ol className="divide-y divide-white/[0.06]">
                    {(programme.careerOutcomes as string[]).map((outcome, idx) => (
                      <li key={idx} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-baseline gap-3">
                          <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[13px] leading-relaxed text-white">{outcome}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Similar programmes rail */}
              {similarProgrammes.length > 0 && onSelectSimilar && (
                <section className="space-y-3">
                  <Eyebrow>SIMILAR ROUTES</Eyebrow>
                  <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-5 sm:-mx-6 px-5 sm:px-6 pb-2">
                    {similarProgrammes.slice(0, 4).map((similar) => (
                      <motion.button
                        key={similar.id}
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectSimilar(similar)}
                        className="min-w-[200px] text-left rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-4 touch-manipulation"
                      >
                        <Eyebrow>{similar.category}</Eyebrow>
                        <h4 className="mt-2 text-[13.5px] font-semibold text-white leading-tight line-clamp-2">
                          {similar.title}
                        </h4>
                        <p className="mt-1 text-[11.5px] text-elec-yellow truncate">
                          {similar.institution}
                        </p>
                        <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-white">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
                          <span className="tabular-nums">
                            {(similar.rating || 0).toFixed(1)}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 sm:px-6 py-4 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-t border-white/[0.08]"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => programme.courseUrl && openExternalUrl(programme.courseUrl)}
              className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-1.5 touch-manipulation transition-colors"
            >
              Enquire
            </button>
            <button
              type="button"
              onClick={() => programme.courseUrl && openExternalUrl(programme.courseUrl)}
              className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-1.5 touch-manipulation transition-colors"
            >
              Apply
              <ArrowRight className="h-4 w-4" />
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Stat = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="min-w-0">
    <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
    <dd className="mt-0.5 text-[14px] sm:text-[15px] tabular-nums truncate text-white font-semibold">
      {value}
    </dd>
  </div>
);

const FeeRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-baseline justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
    <dt className="text-[12px] text-white/85">{label}</dt>
    <dd className="text-[13px] font-semibold text-white tabular-nums">{value}</dd>
  </div>
);

export default ProgrammeDetailSheet;
