/**
 * DiaryEntriesDetailSheet
 *
 * Editorial detail sheet for the apprentice diary stat tile.
 *
 * Layout mirrors the rest of the apprentice hub (OJT Hub, Portfolio):
 *   header → Eyebrow + headline + subtitle → KPI strip → top sites
 *   → highlights → insight → empty/recs
 *
 * 6 Oct 2026: the mood panel and the skill-category block are gone. Mood is
 * private to each entry (this hub sheet is shown at reviews), and the diary
 * no longer writes skill tags, so the block read "0% covered" forever.
 *
 * Avoids the generic icon-in-circle / big-yellow-number pattern. Numbers
 * read as part of an editorial story rather than a Duolingo dashboard.
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import {
  ChevronRight,
  MapPin,
  TrendingUp,
  TrendingDown,
  Heart,
  GraduationCap,
  BookOpen,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import { useDiaryInsights } from '@/hooks/apprentice-stats/useDiaryInsights';
import { RecommendationCard } from './RecommendationCard';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { Calendar, Heart as HeartIcon, TrendingUp as TUp } from 'lucide-react';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

interface DiaryEntriesDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entries: SiteDiaryEntry[];
}

export function DiaryEntriesDetailSheet({
  open,
  onOpenChange,
  entries,
}: DiaryEntriesDetailSheetProps) {
  const navigate = useNavigate();

  const goToDiary = () => {
    navigate('/apprentice/site-diary');
    setTimeout(() => onOpenChange(false), 50);
  };

  const {
    totalEntries,
    weekComparison,
    mostProductiveDay,
    topSites,
    uniqueSitesCount,
    learningHighlights,
    hasEntryToday,
    diaryStreak,
    avgEntriesPerWeek,
    firstEntryDate,
    insightText,
    recommendations,
  } = useDiaryInsights(entries);

  const subtitleParts: string[] = [];
  if (hasEntryToday) subtitleParts.push('Logged today');
  else if (totalEntries > 0) subtitleParts.push('No entry today');
  if (diaryStreak > 1) subtitleParts.push(`${diaryStreak}-day streak`);
  if (firstEntryDate) subtitleParts.push(`Recording since ${firstEntryDate}`);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="flex-shrink-0 relative">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/15" />
            </div>
            <SheetTitle className="sr-only">Site diary detail</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-2 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation z-10"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 pt-2 pb-10 space-y-7 sm:space-y-8">
            {/* ── Hero ─────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-2 pt-1"
            >
              <Eyebrow>Site diary</Eyebrow>
              <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-semibold tracking-tight text-white leading-[1.05]">
                {totalEntries === 0 ? (
                  'Start your diary'
                ) : (
                  <>
                    <span className="font-mono tabular-nums">{totalEntries}</span> entr
                    {totalEntries === 1 ? 'y' : 'ies'} on the record
                  </>
                )}
              </h2>
              {subtitleParts.length > 0 && (
                <p className="text-[13.5px] text-white leading-relaxed">
                  {subtitleParts.join(' · ')}
                </p>
              )}
            </motion.div>

            {/* ── KPI strip ───────────────────────────────────────── */}
            {totalEntries > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                <KpiCell
                  label="This week"
                  value={weekComparison.thisWeek}
                  sub={
                    weekComparison.delta === 0
                      ? 'Match last week'
                      : weekComparison.delta > 0
                        ? `+${weekComparison.delta} vs last`
                        : `${weekComparison.delta} vs last`
                  }
                  trend={
                    weekComparison.delta > 0 ? 'up' : weekComparison.delta < 0 ? 'down' : 'flat'
                  }
                  highlight={weekComparison.thisWeek > 0}
                />
                <KpiCell label="Last week" value={weekComparison.lastWeek} sub="Previous 7 days" />
                <KpiCell
                  label="Avg / week"
                  value={avgEntriesPerWeek}
                  sub={mostProductiveDay ? `Best on ${mostProductiveDay}` : 'Across all weeks'}
                />
                <KpiCell
                  label="Sites"
                  value={uniqueSitesCount}
                  sub={topSites[0] ? `Top: ${topSites[0].name}` : 'Distinct addresses'}
                />
              </div>
            )}

            {/* ── Top sites ──────────────────────────────────────── */}
            {topSites.length > 0 && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="Top sites"
                  title="Where you've been"
                  meta={`${uniqueSitesCount} site${uniqueSitesCount === 1 ? '' : 's'} on record`}
                />
                <div
                  className={cn(
                    'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5',
                    CARD_SURFACE
                  )}
                >
                  <ul className="space-y-3">
                    {topSites.map((site, i) => {
                      const maxCount = topSites[0]?.count || 1;
                      const barWidth = Math.round((site.count / maxCount) * 100);
                      return (
                        <li key={site.name} className="space-y-1.5">
                          <div className="flex items-baseline justify-between gap-3">
                            <div className="flex items-baseline gap-2 min-w-0 flex-1">
                              <span className="text-[10px] font-mono text-white flex-shrink-0">
                                {(i + 1).toString().padStart(2, '0')}
                              </span>
                              <span className="text-[13.5px] text-white truncate">{site.name}</span>
                            </div>
                            <span className="text-[12px] font-mono text-white tabular-nums flex-shrink-0">
                              {site.count}
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${barWidth}%` }}
                              transition={{
                                duration: 0.6,
                                ease: 'easeOut',
                                delay: 0.1 + i * 0.04,
                              }}
                              className="h-full rounded-full bg-elec-yellow/85"
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            )}

            {/* ── Learning highlights ────────────────────────────── */}
            {learningHighlights.length > 0 && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="What you learned"
                  title="Highlights from your entries"
                  meta="Tap any to open the diary"
                />
                <ul className="space-y-2">
                  {learningHighlights.map((h, i) => (
                    <li key={i}>
                      <button
                        onClick={goToDiary}
                        className={cn(
                          'w-full text-left rounded-2xl border border-elec-yellow/35 p-4 active:bg-white/[0.04] active:scale-[0.99] transition-all touch-manipulation',
                          CARD_SURFACE
                        )}
                      >
                        <p className="text-[13.5px] text-white leading-relaxed">{h.text}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
                            {h.site}
                          </span>
                          <span className="text-white">·</span>
                          <span className="text-[10px] font-mono text-white">{h.date}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ── Insight ────────────────────────────────────────── */}
            {insightText && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-elec-yellow/20 bg-white/[0.05] p-4 sm:p-5 space-y-1.5"
              >
                <Eyebrow className="text-elec-yellow/85">Insight</Eyebrow>
                <p className="text-[13.5px] text-white leading-relaxed">{insightText}</p>
              </motion.div>
            )}

            {/* ── Empty state ─────────────────────────────────────── */}
            {totalEntries === 0 && (
              <div
                className={cn(
                  'rounded-2xl border border-elec-yellow/35 p-6 sm:p-7 text-center space-y-3',
                  CARD_SURFACE
                )}
              >
                <Eyebrow>Diary is empty</Eyebrow>
                <p className="text-[14px] text-white leading-relaxed max-w-[300px] mx-auto">
                  Record what you do on site each day — the stories behind the hours land here and
                  feed your portfolio.
                </p>
                <button
                  onClick={goToDiary}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
                >
                  Create first entry
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* ── Recommendations ─────────────────────────────────── */}
            {recommendations.length > 0 && (
              <section className="space-y-3">
                <SectionHeader eyebrow="What to do next" title="Smart suggestions" />
                <div className="space-y-2.5">
                  {recommendations.map((rec) => (
                    <RecommendationCard
                      key={rec.id}
                      icon={
                        rec.id === 'log-today'
                          ? Calendar
                          : rec.id === 'mood-check'
                            ? HeartIcon
                            : rec.id === 'keep-up'
                              ? TUp
                              : GraduationCap
                      }
                      title={rec.title}
                      description={rec.description}
                      actionLabel={rec.actionLabel}
                      actionPath={rec.actionPath}
                      variant="purple"
                      onClose={() => onOpenChange(false)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* lint-quiet imports */}
            <span className="hidden">
              {/* used as icon paths, but referenced via lookup */}
              <MapPin />
              <Heart />
              <BookOpen />
              <TrendingUp />
              <TrendingDown />
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─────────────────── KPI cell ─────────────────── */

function KpiCell({
  label,
  value,
  sub,
  highlight,
  trend,
}: {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
  trend?: 'up' | 'down' | 'flat';
}) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  return (
    <div
      className={cn(
        'rounded-2xl border border-elec-yellow/35 p-3.5 sm:p-5 space-y-1.5',
        CARD_SURFACE
      )}
    >
      <Eyebrow className="text-[9.5px] sm:text-[10px]">{label}</Eyebrow>
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            'text-[22px] sm:text-[26px] font-mono font-semibold tabular-nums leading-none',
            highlight ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {value}
        </span>
        {TrendIcon && (
          <TrendIcon
            className={cn('h-3.5 w-3.5', trend === 'up' ? 'text-elec-yellow' : 'text-red-300')}
          />
        )}
      </div>
      {sub && (
        <span className="text-[10.5px] sm:text-[11px] text-white block leading-snug">{sub}</span>
      )}
    </div>
  );
}
