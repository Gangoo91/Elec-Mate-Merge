import { useRef, useCallback, useEffect } from 'react';

interface UseSmoothedStreamingOptions {
  /** Characters to render per frame (default: 18 for natural reading) */
  charsPerFrame?: number;
  /** Callback when text updates */
  onUpdate: (text: string) => void;
  /** Callback when streaming completes */
  onComplete?: () => void;
}

interface UseSmoothedStreamingReturn {
  /** Add tokens to the buffer */
  addTokens: (tokens: string) => void;
  /** Flush all remaining tokens immediately */
  flush: () => string;
  /** Reset the streaming state */
  reset: () => void;
  /** Stop the animation loop */
  stop: () => void;
  /** Get current displayed text */
  getDisplayedText: () => string;
  /** Check if currently streaming */
  isStreaming: () => boolean;
}

/**
 * useSmoothedStreaming - RAF-based smooth text streaming
 *
 * Renders text character-by-character at 60fps for a smooth,
 * ChatGPT/Claude-like streaming experience.
 *
 * @example
 * const streaming = useSmoothedStreaming({
 *   charsPerFrame: 18,
 *   onUpdate: (text) => setDisplayedText(text),
 *   onComplete: () => setIsStreaming(false),
 * });
 *
 * // In SSE handler:
 * streaming.addTokens(token);
 *
 * // When done:
 * streaming.flush();
 */
export function useSmoothedStreaming(options: UseSmoothedStreamingOptions): UseSmoothedStreamingReturn {
  const { charsPerFrame = 18, onUpdate, onComplete } = options;

  // Refs for animation state
  const tokenBufferRef = useRef('');
  const displayedTextRef = useRef('');
  const animationFrameRef = useRef<number | null>(null);
  const isStreamingRef = useRef(false);
  const lastFrameTimeRef = useRef(0);

  // Target ~60fps with adaptive character count
  const targetFrameTime = 1000 / 60; // ~16.67ms

  const animate = useCallback((currentTime: number) => {
    // Calculate time since last frame
    const deltaTime = currentTime - lastFrameTimeRef.current;

    // Adaptive character count based on frame timing
    // If we're running behind, render more characters to catch up
    const frameMultiplier = Math.max(1, deltaTime / targetFrameTime);
    const charsThisFrame = Math.ceil(charsPerFrame * frameMultiplier);

    if (tokenBufferRef.current.length > 0) {
      // Extract characters from buffer
      const chars = tokenBufferRef.current.slice(0, charsThisFrame);
      tokenBufferRef.current = tokenBufferRef.current.slice(charsThisFrame);

      // Update displayed text
      displayedTextRef.current += chars;
      onUpdate(displayedTextRef.current);

      lastFrameTimeRef.current = currentTime;
    }

    // Continue animation if there's more to render or we're still streaming
    if (tokenBufferRef.current.length > 0 || isStreamingRef.current) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // Streaming complete
      animationFrameRef.current = null;
      onComplete?.();
    }
  }, [charsPerFrame, onUpdate, onComplete, targetFrameTime]);

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current === null) {
      lastFrameTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const addTokens = useCallback((tokens: string) => {
    tokenBufferRef.current += tokens;
    isStreamingRef.current = true;
    startAnimation();
  }, [startAnimation]);

  const flush = useCallback(() => {
    // Immediately render all remaining tokens
    if (tokenBufferRef.current.length > 0) {
      displayedTextRef.current += tokenBufferRef.current;
      tokenBufferRef.current = '';
      onUpdate(displayedTextRef.current);
    }
    isStreamingRef.current = false;
    return displayedTextRef.current;
  }, [onUpdate]);

  const reset = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    tokenBufferRef.current = '';
    displayedTextRef.current = '';
    isStreamingRef.current = false;
  }, []);

  const stop = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isStreamingRef.current = false;
  }, []);

  const getDisplayedText = useCallback(() => {
    return displayedTextRef.current;
  }, []);

  const isStreaming = useCallback(() => {
    return isStreamingRef.current || tokenBufferRef.current.length > 0;
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
    addTokens,
    flush,
    reset,
    stop,
    getDisplayedText,
    isStreaming,
  };
}

export default useSmoothedStreaming;
