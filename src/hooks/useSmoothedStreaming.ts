import { useRef, useCallback, useEffect, useState } from 'react';

interface UseSmoothedStreamingOptions {
  /** Roughly how long (ms) the display takes to drain its current backlog.
   *  Lower = snappier catch-up. Default 180ms. */
  drainMs?: number;
  /** Floor reveal speed (characters/second) when nearly caught up — keeps a
   *  gentle typewriter flow rather than stalling. Default 140. */
  minCps?: number;
  /** @deprecated kept for call-site compatibility; no longer used. */
  flushInterval?: number;
}

interface UseSmoothedStreamingReturn {
  displayedText: string;
  addTokens: (tokens: string) => void;
  flush: () => string;
  reset: () => void;
  stop: () => void;
  isActive: () => boolean;
}

/**
 * useSmoothedStreaming — buttery token streaming, decoupled from the network.
 *
 * The network delivers tokens in bursts (several at once, then a gap). Dumping
 * each burst straight to the DOM looks jumpy. Instead we keep a `target` string
 * of everything received and reveal it on a requestAnimationFrame loop at a
 * smooth, frame-rate-independent rate: the display always trails generation by
 * at most ~`drainMs`, draining big bursts quickly but spread across frames so
 * the text flows out evenly at 60fps. No stutter, no chunky jumps.
 */
export function useSmoothedStreaming(
  options: UseSmoothedStreamingOptions = {}
): UseSmoothedStreamingReturn {
  const { drainMs = 180, minCps = 140 } = options;

  const [displayedText, setDisplayedText] = useState('');

  const targetRef = useRef('');
  const shownRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef(0);
  const streamingRef = useRef(false);

  const stopLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const tick = useCallback(
    (ts: number) => {
      // Clamp dt so a backgrounded tab doesn't dump the whole backlog at once.
      const dt = Math.min(64, lastTsRef.current ? ts - lastTsRef.current : 0);
      lastTsRef.current = ts;

      const remaining = targetRef.current.length - shownRef.current;
      if (remaining <= 0) {
        // Caught up — let the loop sleep; addTokens() will wake it.
        stopLoop();
        return;
      }

      // Speed scales with the backlog (drain it over ~drainMs) but never drops
      // below the floor, so it both keeps pace with fast generation and keeps a
      // smooth flow when nearly caught up.
      const cps = Math.max(minCps, (remaining / drainMs) * 1000);
      const add = Math.max(1, Math.min(remaining, Math.round((cps * dt) / 1000)));
      shownRef.current += add;
      setDisplayedText(targetRef.current.slice(0, shownRef.current));
      rafRef.current = requestAnimationFrame(tick);
    },
    [drainMs, minCps]
  );

  const ensureLoop = useCallback(() => {
    if (rafRef.current === null) {
      lastTsRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const addTokens = useCallback(
    (tokens: string) => {
      if (!tokens) return;
      targetRef.current += tokens;
      streamingRef.current = true;
      ensureLoop();
    },
    [ensureLoop]
  );

  const flush = useCallback(() => {
    streamingRef.current = false;
    stopLoop();
    shownRef.current = targetRef.current.length;
    setDisplayedText(targetRef.current);
    return targetRef.current;
  }, []);

  const reset = useCallback(() => {
    streamingRef.current = false;
    stopLoop();
    targetRef.current = '';
    shownRef.current = 0;
    lastTsRef.current = 0;
    setDisplayedText('');
  }, []);

  const stop = useCallback(() => {
    streamingRef.current = false;
    stopLoop();
  }, []);

  const isActive = useCallback(
    () => streamingRef.current || shownRef.current < targetRef.current.length,
    []
  );

  useEffect(() => () => stopLoop(), []);

  return { displayedText, addTokens, flush, reset, stop, isActive };
}

export default useSmoothedStreaming;
