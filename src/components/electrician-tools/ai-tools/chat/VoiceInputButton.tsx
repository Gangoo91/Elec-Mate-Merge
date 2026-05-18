import { memo, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { useSpeechToText } from '@/hooks/useSpeechToText';

interface VoiceInputButtonProps {
  /** Called with the transcribed text once dictation ends. */
  onTranscript: (text: string) => void;
  /** Disables the button regardless of browser support. */
  disabled?: boolean;
  /** Preferred locale — defaults to UK English. */
  lang?: string;
  /** Optional custom className. */
  className?: string;
}

/**
 * VoiceInputButton — Native Web Speech API mic pill for the chat input.
 *
 * Text-only styling: "Voice" when idle, "Listening…" while active. Disabled
 * with a native tooltip on browsers without support. Emits a single
 * `onTranscript` call when the user stops speaking (or taps again).
 */
export const VoiceInputButton = memo(function VoiceInputButton({
  onTranscript,
  disabled = false,
  lang = 'en-GB',
  className,
}: VoiceInputButtonProps) {
  const haptic = useHaptic();
  const wasListeningRef = useRef(false);

  // Single-shot dictation: continuous=false so the engine ends as soon as the
  // user stops speaking, and we deliver the final transcript via onFinalChunk
  // OR by reading transcript when listening flips false.
  const {
    isSupported: supported,
    isListening: listening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText({
    continuous: false,
    interimResults: true,
    lang,
    onFinalChunk: (_chunk, full) => {
      const trimmed = full.trim();
      if (trimmed) onTranscript(trimmed);
    },
  });

  // Fallback path: some engines never deliver a final chunk for short utterances
  // and only emit interim results. When listening ends, flush the interim text.
  useEffect(() => {
    if (wasListeningRef.current && !listening) {
      const fallback = (transcript || interimTranscript).trim();
      if (fallback && !transcript) {
        onTranscript(fallback);
      }
      resetTranscript();
    }
    wasListeningRef.current = listening;
  }, [listening, transcript, interimTranscript, onTranscript, resetTranscript]);

  const handleClick = useCallback(() => {
    if (listening) {
      stopListening();
    } else {
      if (disabled) return;
      startListening();
      haptic.selection();
    }
  }, [listening, disabled, startListening, stopListening, haptic]);

  const effectivelyDisabled = disabled || !supported;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={effectivelyDisabled}
      title={
        supported
          ? listening
            ? 'Stop voice input'
            : 'Start voice input'
          : 'Not supported in this browser'
      }
      aria-label={listening ? 'Stop voice input' : 'Start voice input'}
      aria-pressed={listening}
      className={cn(
        'text-[12px] font-medium px-3 py-1.5 rounded-full transition-colors touch-manipulation',
        'border',
        listening
          ? 'bg-elec-yellow/15 border-elec-yellow/40 text-elec-yellow'
          : 'bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        className
      )}
    >
      {listening ? 'Listening…' : 'Voice'}
    </button>
  );
});

export default VoiceInputButton;
