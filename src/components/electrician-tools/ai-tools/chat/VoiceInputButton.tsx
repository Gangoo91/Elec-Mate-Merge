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
        'inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full',
        'border transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent]',
        listening
          ? 'bg-white/[0.06] border-elec-yellow/60 text-elec-yellow'
          : 'bg-white/[0.05] border-white/[0.12] text-white hover:bg-white/[0.10] hover:border-white/[0.22]',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        className
      )}
    >
      {listening && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-elec-yellow" />
        </span>
      )}
      {listening ? 'Listening…' : 'Voice'}
    </button>
  );
});

export default VoiceInputButton;
