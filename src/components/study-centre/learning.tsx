/**
 * Learning content primitives — editorial flow first, cards only where they
 * earn their keep.
 *
 * Pedagogy choices:
 *   - The page reads like an article, not a Trello board. Most blocks are
 *     typographic with hairline rules, not full cards.
 *   - Cards are reserved for elements that genuinely need to interrupt the
 *     flow: TLDR (the upfront promise), RegsCallout (an actual quote you
 *     should remember), CommonMistake (a warning), Quiz/InlineCheck
 *     (interactive). Everything else is prose.
 *   - Existing Quiz/InlineCheck preserved; they wire into stats + streaks.
 */

import { type ReactNode, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Play,
  Quote,
  ScrollText,
  Sparkles,
} from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { cn } from '@/lib/utils';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';

// Native (Capacitor) proxy: bypasses YouTube Error 153 caused by WKWebView's
// capacitor:// origin not sending a valid HTTP Referer. The proxy page on
// elec-mate.com loads from a real HTTPS domain, so YouTube accepts the embed.
const YOUTUBE_PROXY_URL = 'https://www.elec-mate.com/youtube.html';

function buildEmbedSrc(videoId: string): string {
  if (Capacitor.isNativePlatform()) {
    return `${YOUTUBE_PROXY_URL}?v=${videoId}&autoplay=1`;
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
}

/* ── TLDR — the upfront promise. Card. ─────────────────────────────── */

interface TLDRProps {
  points: string[];
  className?: string;
}

export function TLDR({ points, className }: TLDRProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-elec-yellow/20 p-5 sm:p-6',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-80" />
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
          In 30 seconds
        </span>
      </div>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] text-white leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── ConceptBlock — typographic. NOT a card. Just an editorial section. ── */

interface ConceptBlockProps {
  title: string;
  children: ReactNode;
  /**
   * Optional inline asides — render as italicised paragraphs with a thin
   * left rule rather than separate sub-cards.
   */
  onSite?: ReactNode;
  plainEnglish?: ReactNode;
  className?: string;
}

export function ConceptBlock({
  title,
  children,
  onSite,
  plainEnglish,
  className,
}: ConceptBlockProps) {
  return (
    <section className={cn('space-y-3', className)}>
      <h3 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight leading-snug">
        {title}
      </h3>
      <div className="text-[14.5px] text-white/90 leading-relaxed space-y-3">{children}</div>

      {plainEnglish && (
        <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-blue-400/40 pl-4 italic">
          <span className="not-italic font-semibold text-blue-300 mr-1.5">In plain English:</span>
          {plainEnglish}
        </p>
      )}
      {onSite && (
        <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-elec-yellow/50 pl-4 italic">
          <span className="not-italic font-semibold text-elec-yellow mr-1.5">On site:</span>
          {onSite}
        </p>
      )}
    </section>
  );
}

/* ── RegsCallout — verbatim quote of a regulation. Card. ──────────── */

interface RegsCalloutProps {
  source: string;
  clause: ReactNode;
  meaning?: ReactNode;
  cite?: string;
  className?: string;
}

export function RegsCallout({ source, clause, meaning, cite, className }: RegsCalloutProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-[hsl(0_0%_10%)] border border-purple-500/25 overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple-500/70 via-violet-400/70 to-indigo-400/70 opacity-70" />
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2 mb-3">
          <ScrollText className="h-3.5 w-3.5 text-purple-300" />
          <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-purple-300">
            What the regs say
          </span>
          <span className="ml-auto text-[10.5px] font-semibold text-purple-200/90">{source}</span>
        </div>

        <div className="flex items-start gap-3">
          <Quote className="h-4 w-4 text-purple-300/70 shrink-0 mt-1" />
          <blockquote className="text-[13.5px] text-white italic leading-relaxed flex-1 min-w-0">
            {clause}
          </blockquote>
        </div>

        {meaning && (
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-blue-300 mb-1.5">
              What this means for you
            </div>
            <div className="text-[13.5px] text-white leading-relaxed">{meaning}</div>
          </div>
        )}

        {cite && <div className="mt-3 text-[11px] text-white/55">{cite}</div>}
      </div>
    </div>
  );
}

/* ── CommonMistake — warning. Card (this one needs to interrupt). ── */

interface CommonMistakeProps {
  title: string;
  whatHappens: ReactNode;
  doInstead: ReactNode;
  className?: string;
}

export function CommonMistake({ title, whatHappens, doInstead, className }: CommonMistakeProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-orange-500/[0.06] border border-orange-500/25 p-5 overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-orange-500/70 via-amber-400/70 to-yellow-400/70 opacity-80" />
      <div className="flex items-start gap-3">
        <div className="shrink-0 h-8 w-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-orange-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-orange-300">
            Common mistake
          </div>
          <h4 className="mt-1 text-[15px] font-semibold text-white tracking-tight">{title}</h4>
          <div className="mt-3 space-y-2.5 text-[13.5px] leading-relaxed">
            <p className="text-white/95">
              <span className="font-semibold text-orange-200">What goes wrong: </span>
              {whatHappens}
            </p>
            <p className="text-white/95">
              <span className="font-semibold text-emerald-300">Do this instead: </span>
              {doInstead}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Scenario — typographic. NOT a card. Editorial inset. ─────────── */

interface ScenarioProps {
  title: string;
  situation: ReactNode;
  whatToDo: ReactNode;
  whyItMatters?: ReactNode;
  className?: string;
}

export function Scenario({
  title,
  situation,
  whatToDo,
  whyItMatters,
  className,
}: ScenarioProps) {
  return (
    <section className={cn('space-y-3 border-l-2 border-cyan-400/40 pl-4 sm:pl-5', className)}>
      <div className="flex items-center gap-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-cyan-300">
          Scenario
        </span>
      </div>
      <h4 className="text-[16px] sm:text-[17px] font-semibold text-white tracking-tight leading-snug">
        {title}
      </h4>
      <div className="text-[14px] text-white/90 leading-relaxed space-y-2.5">
        <p>
          <span className="font-semibold text-white/80">The situation: </span>
          {situation}
        </p>
        <p>
          <span className="font-semibold text-emerald-300">What to do: </span>
          {whatToDo}
        </p>
        {whyItMatters && (
          <p className="text-[13px] text-white/75 italic">
            <span className="not-italic font-semibold text-white/70">Why it matters: </span>
            {whyItMatters}
          </p>
        )}
      </div>
    </section>
  );
}

/* ── KeyTakeaways — typographic list, not a card ──────────────────── */

interface KeyTakeawaysProps {
  points: string[];
  title?: string;
  className?: string;
}

export function KeyTakeaways({
  points,
  title = 'Worth remembering',
  className,
}: KeyTakeawaysProps) {
  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-emerald-300">
          {title}
        </span>
      </div>
      <ul className="space-y-2.5">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-[14px] text-white/95 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── FAQ — accordion, hairline-only ───────────────────────────────── */

interface FAQItem {
  question: string;
  answer: ReactNode;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQ({ items, title = 'Common questions', className }: FAQProps) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-blue-300">
          {title}
        </span>
      </div>
      <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {items.map((item, i) => {
          const isOpen = open.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-3 text-left py-3.5 hover:bg-white/[0.02] transition-colors touch-manipulation"
              >
                <span className="flex-1 text-[14.5px] text-white font-medium leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 text-white/60 shrink-0 transition-transform',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
              {isOpen && (
                <div className="pb-4 pr-7 text-[13.5px] text-white/90 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ── ContentEyebrow — small section break. Just a label, no card. ── */

export function ContentEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85 pt-2">
      {children}
    </div>
  );
}

/* ── SectionRule — subtle horizontal break between major shifts ──── */

export function SectionRule() {
  return <hr className="border-0 h-px bg-white/[0.06] my-2" />;
}

/* ── Re-export the existing AM2LearningOutcomes (already editorial) ─ */

export { AM2LearningOutcomes as LearningOutcomes } from '@/components/apprentice-courses/AM2LearningOutcomes';

/* ── Video components — editorial card that opens YouTube in a new tab ─

   Why card + new tab (not iframe embed):
   - Lighter UX, no ad pre-roll inside the page, no embedding TOS risk
   - Native YouTube controls (subtitles, speed, fullscreen) on whichever device
   - Click is a hard signal we can record as a "watch start" via the
     existing useVideoBookmarks().trackVideoWatched(videoId) hook
*/

/** Extract the YouTube video ID from any common URL shape. */
function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  // youtu.be/<id>
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
  if (shortMatch) return shortMatch[1];
  // youtube.com/watch?v=<id>
  const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  if (watchMatch) return watchMatch[1];
  // youtube.com/embed/<id> or /shorts/<id> or /v/<id>
  const pathMatch = url.match(/youtube\.com\/(?:embed|shorts|v)\/([A-Za-z0-9_-]{6,})/);
  if (pathMatch) return pathMatch[1];
  return null;
}

interface VideoCardProps {
  url: string;
  title: string;
  channel?: string;
  duration?: string;
  topic?: string;
  caption?: ReactNode;
  /** Optional list of AC codes covered by this video — for future analytics. */
  covers?: string[];
  className?: string;
}

export function VideoCard({
  url,
  title,
  channel,
  duration,
  topic,
  caption,
  className,
}: VideoCardProps) {
  const videoId = extractYouTubeId(url);
  // Try maxres first; fall back to hqdefault on 404 (many older videos lack maxres).
  const maxThumb = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  const hqThumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

  const { trackVideoWatched } = useVideoBookmarks();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!videoId) return;
    trackVideoWatched(videoId).catch(() => {});
    setIsPlaying(true);
  };

  const eyebrow = channel ? `Watch · ${channel}` : 'Watch';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] w-full max-w-[520px]',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-red-500/70 via-orange-400/70 to-elec-yellow/70 opacity-80" />

      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-orange-300">
          {eyebrow}
        </div>
      </div>

      {/* Player area — thumbnail with tap-to-play, swaps to inline iframe */}
      <div className="relative mt-3 aspect-video w-full bg-[hsl(0_0%_8%)] overflow-hidden">
        {isPlaying && videoId ? (
          <iframe
            src={buildEmbedSrc(videoId)}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            disabled={!videoId}
            aria-label={`Play ${title}`}
            className="absolute inset-0 group touch-manipulation"
          >
            {maxThumb && (
              <img
                src={maxThumb}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (hqThumb && img.src !== hqThumb) img.src = hqThumb;
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-elec-yellow flex items-center justify-center shadow-lg shadow-black/40 transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                <Play className="h-6 w-6 sm:h-7 sm:w-7 text-black fill-black ml-0.5" />
              </div>
            </div>
            {duration && (
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[11px] font-medium text-white tabular-nums">
                {duration}
              </div>
            )}
          </button>
        )}
      </div>

      {/* Title + meta */}
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        {topic && (
          <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow mb-1.5">
            {topic}
          </div>
        )}
        <h4 className="text-[15px] sm:text-[16px] font-semibold text-white tracking-tight leading-snug">
          {title}
        </h4>
        {channel && (
          <div className="mt-1.5 text-[12.5px] text-white/65">{channel}</div>
        )}
      </div>

      {caption && (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5 -mt-2 text-[12px] text-white/70 leading-relaxed">
          {caption}
        </div>
      )}
    </div>
  );
}

/* ── VideoList — compact row format for "Go deeper" sections ─────── */

interface VideoListItem {
  url: string;
  title: string;
  channel?: string;
  duration?: string;
  topic?: string;
}

interface VideoListProps {
  videos: VideoListItem[];
  title?: string;
  className?: string;
}

export function VideoList({ videos, title = 'Go deeper', className }: VideoListProps) {
  return (
    <section className={cn('space-y-3', className)}>
      {title && (
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-orange-300">
            {title}
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {videos.map((video, i) => (
          <VideoListRow key={i} {...video} />
        ))}
      </div>
    </section>
  );
}

function VideoListRow({ url, title, channel, duration, topic }: VideoListItem) {
  const videoId = extractYouTubeId(url);
  const maxThumb = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  const hqThumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

  const { trackVideoWatched } = useVideoBookmarks();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!videoId) return;
    trackVideoWatched(videoId).catch(() => {});
    setIsPlaying(true);
  };

  if (isPlaying && videoId) {
    return (
      <div className="rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] overflow-hidden">
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={buildEmbedSrc(videoId)}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        </div>
        <div className="px-3 py-2.5">
          {topic && (
            <div className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-elec-yellow/85 mb-1 truncate">
              {topic}
            </div>
          )}
          <div className="text-[13.5px] font-semibold text-white leading-snug line-clamp-2">
            {title}
          </div>
          {channel && (
            <div className="mt-1 text-[11.5px] text-white/60 truncate">{channel}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      disabled={!videoId}
      aria-label={`Play ${title}`}
      className="group flex gap-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-2.5 hover:border-white/[0.12] transition-colors touch-manipulation w-full text-left"
    >
      {/* Thumbnail — fixed aspect, smaller than the primary card */}
      <div className="relative shrink-0 w-32 sm:w-36 aspect-video rounded-lg overflow-hidden bg-[hsl(0_0%_8%)]">
        {maxThumb && (
          <img
            src={maxThumb}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              if (hqThumb && img.src !== hqThumb) img.src = hqThumb;
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-9 w-9 rounded-full bg-elec-yellow flex items-center justify-center shadow-md shadow-black/40 transition-transform duration-200 group-hover:scale-105">
            <Play className="h-3.5 w-3.5 text-black fill-black ml-0.5" />
          </div>
        </div>
        {duration && (
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-medium text-white tabular-nums">
            {duration}
          </div>
        )}
      </div>

      {/* Title + meta */}
      <div className="flex-1 min-w-0 py-0.5">
        {topic && (
          <div className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-elec-yellow/85 mb-1 truncate">
            {topic}
          </div>
        )}
        <div className="text-[13.5px] font-semibold text-white leading-snug line-clamp-2">
          {title}
        </div>
        {channel && (
          <div className="mt-1 text-[11.5px] text-white/60 truncate">{channel}</div>
        )}
      </div>
    </button>
  );
}
