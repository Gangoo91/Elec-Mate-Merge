/**
 * DiaryEntryCard
 *
 * One entry in the site diary feed.
 *
 * Rewritten as a single responsive card. It previously maintained two complete
 * layouts side by side — a `hidden lg:flex` horizontal one and a `lg:hidden`
 * stacked one — which is why the desktop version read as three cramped columns
 * separated by hairline dividers, and why every change had to be made twice.
 *
 * Colour: the eight skill badges were a rainbow (blue, red, purple, amber,
 * cyan, orange, pink, green) from a map whose own comment said it existed "for
 * variety". There is no legend anywhere, and eight hues are not separable by
 * eye in any case — the badge TEXT is the information. They are now quiet
 * neutral chips, so a card reads as a day's work rather than a colour chart.
 *
 * Mood: a green / amber / red bar ran down every card while the emoji beside
 * the date already stated the mood exactly. The bar is now the accent for a
 * good day and plain white otherwise, which keeps a column of entries scannable
 * without painting a traffic-light down the page.
 */

import { motion } from 'framer-motion';
import { MapPin, Pencil, Trash2, ChevronRight, Camera, Briefcase, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { moodFill, MOOD_EMOJI } from '@/lib/site-diary/mood';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import type { PortfolioNudge } from '@/hooks/site-diary/useDiaryCoach';


interface DiaryEntryCardProps {
  entry: SiteDiaryEntry;
  compact?: boolean;
  onTap?: () => void;
  onEdit?: (entry: SiteDiaryEntry) => void;
  onDelete?: (id: string) => void;
  portfolioNudge?: PortfolioNudge;
  /** The feed already groups by day, so the card would repeat it. */
  hideDate?: boolean;
}

/** Quiet meta chip — used for both tasks and skills, with skills a shade down. */
const chip = 'inline-flex items-center rounded-lg px-2.5 py-1 text-[12px] text-white';

export function DiaryEntryCard({
  entry,
  compact = false,
  onTap,
  onEdit,
  onDelete,
  portfolioNudge,
  hideDate = false,
}: DiaryEntryCardProps) {
  const formattedDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: compact ? 'short' : 'long',
    day: 'numeric',
    month: compact ? 'short' : 'long',
  });

  const photoCount = entry.photos?.length ?? 0;
  const showSkills = !compact && entry.skills_practised.length > 0;

  return (
    <div className="group relative">
      <motion.button
        whileTap={{ scale: 0.99 }}
        onClick={onTap}
        className={cn(
          'w-full overflow-hidden rounded-xl border border-elec-yellow/25 text-left',
          'transition-colors touch-manipulation hover:border-elec-yellow/50',
          CARD_SURFACE
        )}
      >
        <div className="flex">
          <div
            className={cn('w-1 flex-shrink-0 sm:w-1.5', moodFill(entry.mood_rating))}
            aria-hidden
          />

          <div className="min-w-0 flex-1 space-y-2.5 p-4 sm:p-5">
            {/* Date, mood, site — and the at-a-glance meta on the right */}
            <div className="flex items-center gap-2">
              {hideDate ? (
                entry.site_name && (
                  <span className="flex min-w-0 items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-elec-yellow" aria-hidden />
                    <span className="truncate text-[14px] font-semibold text-white">
                      {entry.site_name}
                    </span>
                  </span>
                )
              ) : (
                <span className="text-[14px] font-semibold text-white">{formattedDate}</span>
              )}
              {entry.mood_rating && (
                <span className="text-[15px]" title={`Mood ${entry.mood_rating} of 5`}>
                  {MOOD_EMOJI[entry.mood_rating]}
                </span>
              )}

              <span className="ml-auto flex items-center gap-2.5">
                {photoCount > 0 && (
                  <span className="flex items-center gap-1 text-white/70">
                    <Camera className="h-3.5 w-3.5" aria-hidden />
                    <span className="text-[11px] tabular-nums">{photoCount}</span>
                  </span>
                )}
                {!compact && entry.linked_portfolio_id && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-elec-yellow/40 px-2 py-0.5 text-[10px] font-medium text-elec-yellow">
                    <CheckCircle2 className="h-2.5 w-2.5" aria-hidden />
                    Portfolio
                  </span>
                )}
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-white/70" aria-hidden />
              </span>
            </div>

            {!hideDate && entry.site_name && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 flex-shrink-0 text-elec-yellow" aria-hidden />
                <span className="truncate text-[12px] text-white/85">{entry.site_name}</span>
              </div>
            )}

            {entry.tasks_completed.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {entry.tasks_completed.map((task) => (
                  <span key={task} className={cn(chip, 'bg-white/[0.08]')}>
                    {task}
                  </span>
                ))}
              </div>
            )}

            {!compact && entry.what_i_learned && (
              <p className="border-l-2 border-elec-yellow/50 pl-2.5 text-[13px] italic leading-relaxed text-white/85">
                &ldquo;{entry.what_i_learned}&rdquo;
              </p>
            )}

            {/* Skills sit a shade below tasks — they are the category, not the work. */}
            {showSkills && (
              <div className="flex flex-wrap gap-1.5">
                {entry.skills_practised.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md border border-white/[0.14] px-2 py-0.5 text-[10.5px] font-medium text-white/85"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {!compact && portfolioNudge && !entry.linked_portfolio_id && (
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-elec-yellow/40 px-2.5 py-1 text-[11px] font-medium text-elec-yellow">
                <Briefcase className="h-3 w-3 flex-shrink-0" aria-hidden />
                <span className="truncate">{portfolioNudge.nudge}</span>
              </span>
            )}
          </div>
        </div>
      </motion.button>

      {/* Edit / delete. Keyboard-reachable via focus-within, not hover only. */}
      {(onEdit || onDelete) && (
        <div className="absolute right-2 top-2 hidden items-center gap-1 group-hover:flex group-focus-within:flex">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(entry);
              }}
              aria-label="Edit entry"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-elec-yellow/40 text-elec-yellow transition-colors touch-manipulation hover:border-elec-yellow"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(entry.id);
              }}
              aria-label="Delete entry"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-400/50 text-red-400 transition-colors touch-manipulation hover:border-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
