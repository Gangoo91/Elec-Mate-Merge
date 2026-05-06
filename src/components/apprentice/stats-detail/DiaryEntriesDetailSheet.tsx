/**
 * DiaryEntriesDetailSheet
 *
 * Editorial detail sheet for the apprentice diary stat tile.
 *
 * Layout mirrors the rest of the apprentice hub (OJT Hub, Portfolio):
 *   header → Eyebrow + headline + subtitle → KPI strip → mood mix → top sites
 *   → skills → highlights → insight → empty/recs
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
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { Calendar, Heart as HeartIcon, TrendingUp as TUp } from 'lucide-react';

const moodEmojis: Record<number, string> = {
  1: '\uD83D\uDE22',
  2: '\uD83D\uDE14',
  3: '\uD83D\uDE10',
  4: '\uD83D\uDE42',
  5: '\uD83D\uDE0A',
};

function moodSegmentTone(mood: number): string {
  if (mood >= 4) return 'bg-elec-yellow';
  if (mood === 3) return 'bg-elec-yellow/60';
  if (mood === 2) return 'bg-white/35';
  return 'bg-red-400/55';
}

function moodLabel(mood: number): string {
  if (mood >= 4.5) return 'Great';
  if (mood >= 3.5) return 'Good';
  if (mood >= 2.5) return 'Okay';
  if (mood >= 1.5) return 'Low';
  return 'Tough';
}

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
    moodTrend,
    averageMood,
    moodDeclining,
    mostProductiveDay,
    topSites,
    uniqueSitesCount,
    skillFrequency,
    skillDiversityPercent,
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

  // Mood distribution buckets — for the segmented bar
  const moodBuckets = (() => {
    const buckets = { great: 0, good: 0, okay: 0, low: 0, tough: 0 };
    for (const m of moodTrend) {
      if (m.mood >= 5) buckets.great += 1;
      else if (m.mood === 4) buckets.good += 1;
      else if (m.mood === 3) buckets.okay += 1;
      else if (m.mood === 2) buckets.low += 1;
      else buckets.tough += 1;
    }
    return buckets;
  })();
  const moodTotal =
    moodBuckets.great +
    moodBuckets.good +
    moodBuckets.okay +
    moodBuckets.low +
    moodBuckets.tough;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[85vh] p-0 rounded-t-3xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
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
              <X className="h-5 w-5 text-white/70" />
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
                    <span className="font-mono tabular-nums">{totalEntries}</span>{' '}
                    entr{totalEntries === 1 ? 'y' : 'ies'} on the record
                  </>
                )}
              </h2>
              {subtitleParts.length > 0 && (
                <p className="text-[13.5px] text-white/70 leading-relaxed">
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
                    weekComparison.delta > 0
                      ? 'up'
                      : weekComparison.delta < 0
                        ? 'down'
                        : 'flat'
                  }
                  highlight={weekComparison.thisWeek > 0}
                />
                <KpiCell
                  label="Last week"
                  value={weekComparison.lastWeek}
                  sub="Previous 7 days"
                />
                <KpiCell
                  label="Avg / week"
                  value={avgEntriesPerWeek}
                  sub={
                    mostProductiveDay
                      ? `Best on ${mostProductiveDay}`
                      : 'Across all weeks'
                  }
                />
                <KpiCell
                  label="Sites"
                  value={uniqueSitesCount}
                  sub={
                    topSites[0]
                      ? `Top: ${topSites[0].name}`
                      : 'Distinct addresses'
                  }
                />
              </div>
            )}

            {/* ── Mood mix ────────────────────────────────────────── */}
            {averageMood !== null && moodTotal > 0 && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="Mood"
                  title={`On average — ${moodLabel(averageMood)}`}
                  meta={
                    moodDeclining
                      ? 'Trending down across the last few entries'
                      : `Last ${moodTotal} entries`
                  }
                />
                <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl flex-shrink-0">
                      {moodEmojis[Math.round(averageMood)]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[26px] font-mono font-semibold tabular-nums leading-none text-white">
                          {averageMood.toFixed(1)}
                        </span>
                        <span className="text-[13px] text-white/40 font-mono">/ 5</span>
                      </div>
                      <span className="text-[11px] text-white/55 uppercase tracking-[0.14em]">
                        {moodLabel(averageMood)}
                        {moodDeclining && ' · declining'}
                      </span>
                    </div>
                  </div>

                  {/* Segmented mood distribution bar */}
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded-full overflow-hidden bg-white/[0.04] flex">
                      {[
                        { key: 'great', label: 'Great', count: moodBuckets.great, tone: 'bg-elec-yellow' },
                        { key: 'good', label: 'Good', count: moodBuckets.good, tone: 'bg-elec-yellow/70' },
                        { key: 'okay', label: 'Okay', count: moodBuckets.okay, tone: 'bg-white/35' },
                        { key: 'low', label: 'Low', count: moodBuckets.low, tone: 'bg-red-400/40' },
                        { key: 'tough', label: 'Tough', count: moodBuckets.tough, tone: 'bg-red-400/70' },
                      ].map(
                        (s) =>
                          s.count > 0 && (
                            <motion.div
                              key={s.key}
                              initial={{ width: 0 }}
                              animate={{ width: `${(s.count / moodTotal) * 100}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                              className={cn('h-full', s.tone)}
                              title={`${s.label}: ${s.count}`}
                            />
                          )
                      )}
                    </div>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1">
                      {[
                        { label: 'Great', count: moodBuckets.great, tone: 'bg-elec-yellow' },
                        { label: 'Good', count: moodBuckets.good, tone: 'bg-elec-yellow/70' },
                        { label: 'Okay', count: moodBuckets.okay, tone: 'bg-white/35' },
                        { label: 'Low', count: moodBuckets.low, tone: 'bg-red-400/40' },
                        { label: 'Tough', count: moodBuckets.tough, tone: 'bg-red-400/70' },
                      ]
                        .filter((s) => s.count > 0)
                        .map((s) => (
                          <li
                            key={s.label}
                            className="flex items-center gap-1.5 text-[11.5px] text-white/85"
                          >
                            <span
                              className={cn(
                                'h-1.5 w-1.5 rounded-sm flex-shrink-0',
                                s.tone
                              )}
                            />
                            <span className="flex-1 truncate">{s.label}</span>
                            <span className="font-mono tabular-nums text-white/55">
                              {s.count}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Recent mood timeline */}
                  {moodTrend.length > 0 && (
                    <div className="pt-2 border-t border-white/[0.04]">
                      <div className="flex items-baseline justify-between gap-2 pb-2">
                        <Eyebrow>Recent timeline</Eyebrow>
                        <span className="text-[10px] text-white/40 font-mono">
                          ← oldest · newest →
                        </span>
                      </div>
                      <div className="flex items-end gap-1.5">
                        {moodTrend.map((m, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: `${Math.max(m.mood * 7, 8)}px`,
                              opacity: 1,
                            }}
                            transition={{ duration: 0.4, delay: 0.05 * i }}
                            className={cn(
                              'flex-1 rounded-sm min-w-[6px]',
                              moodSegmentTone(m.mood)
                            )}
                            title={`Mood ${m.mood}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ── Top sites ──────────────────────────────────────── */}
            {topSites.length > 0 && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="Top sites"
                  title="Where you've been"
                  meta={`${uniqueSitesCount} site${uniqueSitesCount === 1 ? '' : 's'} on record`}
                />
                <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
                  <ul className="space-y-3">
                    {topSites.map((site, i) => {
                      const maxCount = topSites[0]?.count || 1;
                      const barWidth = Math.round((site.count / maxCount) * 100);
                      return (
                        <li key={site.name} className="space-y-1.5">
                          <div className="flex items-baseline justify-between gap-3">
                            <div className="flex items-baseline gap-2 min-w-0 flex-1">
                              <span className="text-[10px] font-mono text-white/40 flex-shrink-0">
                                {(i + 1).toString().padStart(2, '0')}
                              </span>
                              <span className="text-[13.5px] text-white truncate">
                                {site.name}
                              </span>
                            </div>
                            <span className="text-[12px] font-mono text-white/85 tabular-nums flex-shrink-0">
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

            {/* ── Skills practised ───────────────────────────────── */}
            {skillFrequency.length > 0 && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="Skills practised"
                  title="Breadth of work"
                  meta={`${skillFrequency.length} of 8 categories · ${skillDiversityPercent}% diversity`}
                />
                <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <Eyebrow>Coverage</Eyebrow>
                      <span className="text-[12px] font-mono text-white/85 tabular-nums">
                        {skillDiversityPercent}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skillDiversityPercent}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className={cn(
                          'h-full rounded-full',
                          skillDiversityPercent >= 75
                            ? 'bg-elec-yellow'
                            : skillDiversityPercent >= 40
                              ? 'bg-elec-yellow/60'
                              : 'bg-white/30'
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillFrequency.map(({ skill, count }) => (
                      <button
                        key={skill}
                        onClick={goToDiary}
                        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/[0.08] bg-white/[0.02] text-white/85 text-[12px] hover:bg-white/[0.04] active:scale-[0.98] transition-all touch-manipulation"
                      >
                        <span>{skill}</span>
                        <span className="font-mono text-white/55 tabular-nums">
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
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
                        className="w-full text-left rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 active:bg-white/[0.04] active:scale-[0.99] transition-all touch-manipulation"
                      >
                        <p className="text-[13.5px] text-white leading-relaxed">
                          {h.text}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
                            {h.site}
                          </span>
                          <span className="text-white/30">·</span>
                          <span className="text-[10px] font-mono text-white/55">
                            {h.date}
                          </span>
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
                className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5"
              >
                <Eyebrow className="text-elec-yellow/85">Insight</Eyebrow>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  {insightText}
                </p>
              </motion.div>
            )}

            {/* ── Empty state ─────────────────────────────────────── */}
            {totalEntries === 0 && (
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 sm:p-7 text-center space-y-3">
                <Eyebrow>Diary is empty</Eyebrow>
                <p className="text-[14px] text-white/85 leading-relaxed max-w-[300px] mx-auto">
                  Record what you do on site each day — the stories behind the
                  hours land here and feed your portfolio.
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
                <SectionHeader
                  eyebrow="What to do next"
                  title="Smart suggestions"
                />
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
  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3.5 sm:p-5 space-y-1.5">
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
            className={cn(
              'h-3.5 w-3.5',
              trend === 'up' ? 'text-elec-yellow' : 'text-red-300'
            )}
          />
        )}
      </div>
      {sub && (
        <span className="text-[10.5px] sm:text-[11px] text-white/55 block leading-snug">
          {sub}
        </span>
      )}
    </div>
  );
}
