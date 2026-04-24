import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface SpeechRecognitionEventLike {
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: { transcript: string };
    };
  };
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

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
  const ctorRef = useRef<SpeechRecognitionCtor | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef<string>('');
  const [supported, setSupported] = useState<boolean>(false);
  const [listening, setListening] = useState(false);
  const haptic = useHaptic();

  useEffect(() => {
    const Ctor = getSpeechRecognitionCtor();
    ctorRef.current = Ctor;
    setSupported(!!Ctor);
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }
  }, []);

  const start = useCallback(() => {
    if (!ctorRef.current) return;
    if (disabled) return;

    try {
      const instance = new ctorRef.current();
      instance.lang = lang;
      instance.continuous = false;
      instance.interimResults = true;

      transcriptRef.current = '';

      instance.onresult = (event) => {
        let combined = '';
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          combined += result[0]?.transcript ?? '';
        }
        transcriptRef.current = combined.trim();
      };

      instance.onerror = (e) => {
        console.warn('[VoiceInputButton] recognition error', e?.error);
        setListening(false);
      };

      instance.onend = () => {
        setListening(false);
        const final = transcriptRef.current.trim();
        if (final) {
          onTranscript(final);
        }
      };

      recognitionRef.current = instance;
      instance.start();
      setListening(true);
      haptic.selection();
    } catch (err) {
      console.warn('[VoiceInputButton] failed to start recognition', err);
      setListening(false);
    }
  }, [disabled, lang, onTranscript, haptic]);

  const handleClick = useCallback(() => {
    if (listening) {
      stop();
    } else {
      start();
    }
  }, [listening, start, stop]);

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
