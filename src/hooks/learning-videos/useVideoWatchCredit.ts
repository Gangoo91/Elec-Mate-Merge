/**
 * One path for "this learner watched a video" — and it credits the time they
 * ACTUALLY watched, not the video's runtime.
 *
 * Two problems this fixes.
 *
 * 1. Only one of two watch paths paid out at all. The Apprentice video library
 *    recorded the watch and logged a `video_watched` activity; the Study
 *    Centre's inline players (`components/study-centre/learning` — VideoCard
 *    and VideoListRow, on 1,100+ course pages) called `trackVideoWatched`
 *    alone, so a video played from a course page earned no off-the-job
 *    minutes, no XP and no streak. Measured: 209 first-watches since activity
 *    logging began on 1 June 2026 against 137 `video_watched` rows — about a
 *    third paying nothing.
 *
 * 2. The path that did pay credited the FULL runtime the instant you tapped
 *    play. Twenty seconds of a twelve-minute video banked twelve minutes.
 *    These are ESFA off-the-job hours — a tutor signs them and a gateway
 *    assessor can inspect them. Crediting time that was not spent is
 *    fabricated evidence, and it is the one thing this page exists to prevent.
 *
 * So we measure. Elapsed wall-clock while the player is mounted AND the tab is
 * visible, capped at the video's runtime, with a floor below which nothing is
 * credited at all.
 *
 * Why wall-clock rather than the YouTube IFrame API: the native app plays
 * through a proxy page on a different origin (see `buildEmbedSrc` — it exists
 * to dodge WKWebView's Error 153), so player events are not reachable there.
 * Visible-time is the measure that behaves the same on web and native. It is
 * the honest floor of what happened: they had it open and on screen.
 */

import { useCallback, useEffect, useRef } from 'react';
import { useVideoBookmarks } from './useVideoBookmarks';
import { useLearningXP } from '@/hooks/useLearningXP';

/** Under this, nothing is credited — a mis-tap is not off-the-job training. */
const MIN_CREDITED_SECONDS = 30;

/**
 * Ceiling for a single sitting when the runtime is unknown.
 *
 * Without it, a video carrying no duration string that is left open all
 * afternoon banks the whole afternoon. Almost every video in the library is
 * well under an hour, so anything past this is a tab someone forgot about, not
 * training — and inventing hours is the exact thing this file exists to stop.
 */
const MAX_UNKNOWN_RUNTIME_SECONDS = 60 * 60;

/** Parse "mm:ss" / "h:mm:ss" to seconds. Null when it cannot be read. */
export function parseVideoDurationSeconds(d: string | null | undefined): number | null {
  if (!d) return null;
  const parts = d.split(':').map((n) => parseInt(n, 10));
  if (parts.length < 2 || parts.some((n) => Number.isNaN(n))) return null;
  const secs = parts.reduce((acc, p) => acc * 60 + p, 0);
  return Number.isFinite(secs) && secs > 0 ? secs : null;
}

export interface WatchedVideo {
  /** YouTube id — the same id space the curated library uses as its own `id`. */
  videoId: string;
  title: string;
  channel?: string | null;
  /** "mm:ss" or "h:mm:ss". Caps the credit; unknown means no cap is applied. */
  duration?: string | null;
  category?: string | null;
}

/** One credited watch per video per day — stops a replay loop farming hours. */
const guardKey = (videoId: string) =>
  `elecmate_video_credited:${videoId}:${new Date().toISOString().slice(0, 10)}`;

export function useVideoWatchSession() {
  const { trackVideoWatched } = useVideoBookmarks();
  const { logActivity } = useLearningXP();

  const video = useRef<WatchedVideo | null>(null);
  const visibleSince = useRef<number | null>(null);
  const accumulatedMs = useRef(0);

  const settle = useCallback(() => {
    if (visibleSince.current !== null) {
      accumulatedMs.current += Date.now() - visibleSince.current;
      visibleSince.current = null;
    }
  }, []);

  /** Called on play. Records the "seen" flag immediately; starts the clock. */
  const startWatch = useCallback(
    (v: WatchedVideo) => {
      video.current = v;
      accumulatedMs.current = 0;
      visibleSince.current = Date.now();
      // The flag is not the credit — it drives "watched" ticks in the UI, and
      // should land as soon as they press play even if they watch nothing.
      void trackVideoWatched(v.videoId).catch(() => {});
    },
    [trackVideoWatched]
  );

  /** Called on stop/unmount. Credits what was actually watched. */
  const stopWatch = useCallback(() => {
    const v = video.current;
    if (!v) return;
    settle();

    const watchedSeconds = Math.round(accumulatedMs.current / 1000);
    video.current = null;
    accumulatedMs.current = 0;

    if (watchedSeconds < MIN_CREDITED_SECONDS) return;
    if (localStorage.getItem(guardKey(v.videoId))) return;

    // Never credit more than the video is long — leaving a tab open on a
    // 3-minute video is not an afternoon of training. With no runtime to cap
    // against, fall back to the hour ceiling rather than crediting whatever
    // the clock says.
    const runtime = parseVideoDurationSeconds(v.duration);
    const creditedSeconds = Math.min(
      watchedSeconds,
      runtime ?? MAX_UNKNOWN_RUNTIME_SECONDS
    );
    const minutes = Math.max(1, Math.round(creditedSeconds / 60));

    try {
      localStorage.setItem(guardKey(v.videoId), '1');
    } catch {
      /* private mode — proceed; the worst case is a second credit */
    }

    logActivity({
      activityType: 'video_watched',
      sourceId: v.videoId,
      sourceTitle: v.title,
      actualMinutes: minutes,
      metadata: {
        channel: v.channel ?? null,
        category: v.category ?? null,
        surface: 'study-centre',
        // Kept so a tutor querying an entry can see it was measured rather
        // than assumed, and how it compares to the video's length.
        watched_seconds: watchedSeconds,
        runtime_seconds: runtime,
      },
    });
  }, [logActivity, settle]);

  // Backgrounding the app must not accumulate time, and closing the tab
  // mid-watch should still bank what was watched.
  useEffect(() => {
    const onVisibility = () => {
      if (!video.current) return;
      if (document.visibilityState === 'hidden') settle();
      else visibleSince.current = Date.now();
    };
    const onHide = () => stopWatch();

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onHide);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onHide);
      // Unmounting while playing (navigating away) is a stop, not a loss.
      stopWatch();
    };
  }, [settle, stopWatch]);

  return { startWatch, stopWatch };
}
