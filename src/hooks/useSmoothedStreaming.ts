import { useRef, useCallback, useEffect, useState } from 'react';

interface UseSmoothedStreamingOptions {
  /** How often to flush buffered tokens to React state in ms (default: 40ms ≈ 25fps) */
  flushInterval?: number;
}

interface UseSmoothedStreamingReturn {
  /** Current displayed text (updates in batches for smooth rendering) */
  displayedText: string;
  /** Add tokens to the buffer — they'll appear on next flush */
  addTokens: (tokens: string) => void;
  /** Flush all remaining tokens immediately and return final text */
  flush: () => string;
  /** Reset the streaming state */
  reset: () => void;
  /** Stop streaming */
  stop: () => void;
  /** Check if currently has content to display */
  isActive: () => boolean;
}

/**
 * useSmoothedStreaming - Batched token streaming with smooth React updates
 *
 * Instead of dripping characters one-by-one (which looks stuttery), this
 * batches incoming tokens and flushes them to React state on a timer.
 * Since OpenAI tokens are typically whole words or word fragments, this
 * produces natural word-by-word streaming that looks smooth.
 *
 * The key insight: OpenAI already sends tokens at a natural pace (~20-50ms
 * apart). We just need to batch them slightly to avoid excessive React
 * re-renders while keeping the visual flow natural.
 */
export function useSmoothedStreaming(
  options: UseSmoothedStreamingOptions = {}
): UseSmoothedStreamingReturn {
  const { flushInterval = 40 } = options;

  const [displayedText, setDisplayedText] = useState('');

  // Refs for state that shouldn't trigger re-renders
  const currentTextRef = useRef('');
  const pendingTokensRef = useRef('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isStreamingRef = useRef(false);

  // Start the flush timer
  const startTimer = useCallback(() => {
    if (timerRef.current !== null) return;

    timerRef.current = setInterval(() => {
      if (pendingTokensRef.current.length > 0) {
        // Move pending tokens to current text
        currentTextRef.current += pendingTokensRef.current;
        pendingTokensRef.current = '';
        setDisplayedText(currentTextRef.current);
      } else if (!isStreamingRef.current) {
        // No more tokens and streaming stopped — clean up timer
        if (timerRef.current !== null) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }, flushInterval);
  }, [flushInterval]);

  const addTokens = useCallback(
    (tokens: string) => {
      pendingTokensRef.current += tokens;
      isStreamingRef.current = true;
      startTimer();
    },
    [startTimer]
  );

  const flush = useCallback(() => {
    // Stop timer
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Flush any remaining pending tokens
    if (pendingTokensRef.current.length > 0) {
      currentTextRef.current += pendingTokensRef.current;
      pendingTokensRef.current = '';
    }

    setDisplayedText(currentTextRef.current);
    isStreamingRef.current = false;

    return currentTextRef.current;
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    pendingTokensRef.current = '';
    currentTextRef.current = '';
    isStreamingRef.current = false;
    setDisplayedText('');
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    isStreamingRef.current = false;
  }, []);

  const isActive = useCallback(() => {
    return (
      isStreamingRef.current ||
      pendingTokensRef.current.length > 0 ||
      currentTextRef.current.length > 0
    );
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    displayedText,
    addTokens,
    flush,
    reset,
    stop,
    isActive,
  };
}

export default useSmoothedStreaming;
