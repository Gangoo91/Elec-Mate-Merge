import { useRef, useCallback, useEffect, useState } from 'react';

interface UseSmoothedStreamingOptions {
  /** Characters to render per frame (default: 3 for very smooth) */
  charsPerFrame?: number;
  /** How often to sync to React state in ms (default: 50ms) */
  stateUpdateInterval?: number;
}

interface UseSmoothedStreamingReturn {
  /** Current displayed text (updates smoothly via RAF) */
  displayedText: string;
  /** Add tokens to the buffer */
  addTokens: (tokens: string) => void;
  /** Flush all remaining tokens immediately */
  flush: () => string;
  /** Reset the streaming state */
  reset: () => void;
  /** Stop the animation loop */
  stop: () => void;
  /** Check if currently has content to display */
  isActive: () => boolean;
}

/**
 * useSmoothedStreaming - RAF-based smooth text streaming with batched React updates
 *
 * Uses requestAnimationFrame for 60fps visual updates while batching
 * React state updates to prevent excessive re-renders.
 */
export function useSmoothedStreaming(options: UseSmoothedStreamingOptions = {}): UseSmoothedStreamingReturn {
  const { charsPerFrame = 3, stateUpdateInterval = 50 } = options;

  // React state for displayed text (batched updates)
  const [displayedText, setDisplayedText] = useState('');

  // Refs for animation state (no re-renders)
  const tokenBufferRef = useRef('');
  const currentTextRef = useRef('');
  const animationFrameRef = useRef<number | null>(null);
  const isStreamingRef = useRef(false);
  const lastStateUpdateRef = useRef(0);

  // RAF animation loop
  const animate = useCallback(() => {
    const now = performance.now();

    if (tokenBufferRef.current.length > 0) {
      // Extract characters from buffer
      const chars = tokenBufferRef.current.slice(0, charsPerFrame);
      tokenBufferRef.current = tokenBufferRef.current.slice(charsPerFrame);

      // Update current text ref (instant, no render)
      currentTextRef.current += chars;

      // Batch React state updates (every stateUpdateInterval ms)
      if (now - lastStateUpdateRef.current >= stateUpdateInterval) {
        setDisplayedText(currentTextRef.current);
        lastStateUpdateRef.current = now;
      }
    }

    // Continue animation if there's more to render or we're still streaming
    if (tokenBufferRef.current.length > 0 || isStreamingRef.current) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // Final sync when done
      setDisplayedText(currentTextRef.current);
      animationFrameRef.current = null;
    }
  }, [charsPerFrame, stateUpdateInterval]);

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current === null) {
      lastStateUpdateRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const addTokens = useCallback((tokens: string) => {
    tokenBufferRef.current += tokens;
    isStreamingRef.current = true;
    startAnimation();
  }, [startAnimation]);

  const flush = useCallback(() => {
    // Stop animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Immediately render all remaining tokens
    if (tokenBufferRef.current.length > 0) {
      currentTextRef.current += tokenBufferRef.current;
      tokenBufferRef.current = '';
    }

    // Final state sync
    setDisplayedText(currentTextRef.current);
    isStreamingRef.current = false;

    return currentTextRef.current;
  }, []);

  const reset = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    tokenBufferRef.current = '';
    currentTextRef.current = '';
    isStreamingRef.current = false;
    setDisplayedText('');
  }, []);

  const stop = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isStreamingRef.current = false;
  }, []);

  const isActive = useCallback(() => {
    return isStreamingRef.current || tokenBufferRef.current.length > 0 || currentTextRef.current.length > 0;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
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
