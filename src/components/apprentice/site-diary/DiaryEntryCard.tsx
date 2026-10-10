/**
 * DiaryEntryCard — one day in the diary's history.
 *
 * 6 Oct 2026 design pass. A logbook page, not a text row: a date tile, the
 * site, what you did, the line you learned, and the day's first photo — the
 * thing that makes a diary worth scrolling back through. Where the entry has
 * gone (portfolio, college, training) reads as one quiet status line with a
 * yellow dot for anything that's done, instead of a row of outline pills.
 * No mood here: this list gets shown to tutors at reviews. Edit and delete
 * live in the entry's own sheet.
 */
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HOME_SURFACE } from '@/components/apprentice/ApprenticeHomeUi';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { formatMinutes, type SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import { displaySite, sentenceCase } from '@/lib/site-diary/format';
import { TONE_DOT, type DiaryTone } from '@/lib/site-diary/statusColour';

export type OtjState = 'pending' | 'verified' | 'rejected' | 'verified_by_employer';

interface DiaryEntryCardProps {
  entry: SiteDiaryEntry;
  onTap: (entry: SiteDiaryEntry) => void;
  /** Where the entry's training time stands, if it was sent. */
  otjState?: OtjState;
}

export function trainingLabel(minutes: number, state?: OtjState): string {
  const t = formatMinutes(minutes);
  if (state === 'verified' || state === 'verified_by_employer') return `${t} training signed off`;
  if (state === 'rejected') return `${t} training sent back`;
  if (state === 'pending') return `${t} training waiting for sign-off`;
  return `${t} training not sent`;
}

function Status({ tone, children }: { tone: DiaryTone; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className={cn('h-2 w-2 shrink-0 rounded-full', TONE_DOT[tone])} />
      {children}
    </span>
  );
}

/** Where the day's training stands, as a colour. */
export function trainingTone(state?: OtjState): DiaryTone {
  if (state === 'verified' || state === 'verified_by_employer') return 'done';
  if (state === 'pending') return 'waiting';
  if (state === 'rejected') return 'back';
  return 'none';
}

export function DiaryEntryCard({ entry, onTap, otjState }: DiaryEntryCardProps) {
  const d = new Date(entry.date + 'T00:00:00');
  const tasks = entry.tasks_completed.slice(0, 3).map(sentenceCase).join(' · ');
  const minutes = entry.training_minutes ?? 0;
  const photo = entry.photos[0];
  const morePhotos = entry.photos.length - 1;
  const hasStatus = !!entry.linked_portfolio_id || entry.share_with_tutor || minutes > 0;

  return (
    <button
      type="button"
      onClick={() => onTap(entry)}
      aria-label={`${d.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })}, ${displaySite(entry.site_name)}`}
      className={cn(
        'group flex w-full items-stretch gap-3.5 rounded-2xl border p-3.5 text-left touch-manipulation transition-colors hover:border-white/[0.16] active:bg-white/[0.04] sm:gap-4 sm:p-4',
        HOME_SURFACE
      )}
    >
      {/* Date tile */}
      <div className="flex w-[52px] shrink-0 flex-col items-center justify-center self-start rounded-xl border border-white/[0.1] bg-black/25 py-2">
        <span className="text-[12px] font-semibold leading-none text-white">
          {d.toLocaleDateString('en-GB', { weekday: 'short' })}
        </span>
        <span className="mt-1 text-[20px] font-bold leading-none tabular-nums text-white">
          {d.getDate()}
        </span>
      </div>

      {/* Words */}
      <div className="min-w-0 flex-1 space-y-1 self-center">
        <p className="line-clamp-2 text-[15.5px] font-semibold leading-tight text-white">
          {displaySite(entry.site_name)}
        </p>
        {tasks && <p className="line-clamp-1 text-[13px] text-white">{tasks}</p>}
        {entry.what_i_learned && (
          <p className="line-clamp-2 text-[13.5px] italic leading-snug text-white">
            “{entry.what_i_learned.trim()}”
          </p>
        )}
        {hasStatus && (
          <p className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[12px] font-medium text-white">
            {entry.linked_portfolio_id && <Status tone="portfolio">In portfolio</Status>}
            {minutes > 0 && (
              <Status tone={trainingTone(otjState)}>{trainingLabel(minutes, otjState)}</Status>
            )}
            {entry.share_with_tutor && <Status tone="shared">Shared with college</Status>}
          </p>
        )}
      </div>

      {/* The day's photo — or a chevron when there isn't one */}
      {photo ? (
        <div className="relative h-[72px] w-[72px] shrink-0 self-center overflow-hidden rounded-xl bg-white/[0.06] sm:h-20 sm:w-20 lg:h-24 lg:w-32">
          <EvidenceImage
            src={photo}
            alt=""
            className="h-full w-full object-cover"
            fallback={<div className="h-full w-full bg-white/[0.06]" />}
          />
          {morePhotos > 0 && (
            <span className="absolute bottom-1 right-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[12px] font-semibold text-white">
              +{morePhotos}
            </span>
          )}
        </div>
      ) : (
        <ChevronRight className="h-4 w-4 shrink-0 self-center text-white" aria-hidden />
      )}
    </button>
  );
}

export default DiaryEntryCard;
