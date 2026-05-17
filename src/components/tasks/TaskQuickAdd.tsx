import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { cn } from '@/lib/utils';

interface TaskQuickAddProps {
  onQuickSave: (title: string) => Promise<string | null>;
  onExpandForm: () => void;
  onShowTemplates: () => void;
}

// Web Speech API types
interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } };
  resultIndex: number;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export function TaskQuickAdd({ onQuickSave, onExpandForm, onShowTemplates }: TaskQuickAddProps) {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check Speech API support
  // Web Speech Recognition is not supported in Capacitor's WKWebView on iOS —
  // the constructor may exist but the API is non-functional. Hide the mic button
  // entirely on native to avoid showing a feature that silently does nothing.
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      setSpeechSupported(false);
      return;
    }
    const SpeechRecognitionCtor =
      (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognitionCtor);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognitionCtor =
      (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new (SpeechRecognitionCtor as unknown as {
      new (): SpeechRecognitionInstance;
    })();
    recognition.lang = 'en-GB';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setTitle(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  async function handleSubmit() {
    if (!title.trim() || saving) return;
    setSaving(true);
    try {
      await onQuickSave(title.trim());
      setTitle('');
      inputRef.current?.focus();
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && title.trim()) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const hasText = title.trim().length > 0;
  const [focused, setFocused] = useState(false);
  const showSecondary = focused || hasText || isListening;

  return (
    <div
      className={cn(
        'rounded-xl border transition-colors',
        isListening
          ? 'border-red-400/40 bg-red-500/[0.06]'
          : hasText || focused
            ? 'border-elec-yellow/40 bg-white/[0.04]'
            : 'border-white/[0.08] bg-white/[0.03]'
      )}
    >
      {/* Single input row — flat, minimal, h-12 so it lines up with chips above */}
      <div className="flex items-center gap-2 pl-4 pr-2 h-12">
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Add a task…"
          className="flex-1 h-full bg-transparent text-[15px] text-white placeholder:text-white/40 outline-none touch-manipulation"
        />

        {speechSupported && (
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            aria-label={isListening ? 'Stop dictation' : 'Dictate'}
            className={cn(
              'h-9 w-9 flex items-center justify-center rounded-lg touch-manipulation transition-colors shrink-0',
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-white/55 hover:text-white hover:bg-white/[0.06] active:bg-white/10'
            )}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        )}

        <AnimatePresence>
          {hasText && (
            <motion.button
              type="button"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              onClick={handleSubmit}
              disabled={saving}
              aria-label="Add task"
              className="h-9 w-9 flex items-center justify-center rounded-lg bg-elec-yellow text-black touch-manipulation active:scale-[0.95] disabled:opacity-50 shrink-0"
            >
              {saving ? (
                <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" strokeWidth={2.4} />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Listening indicator — only when active */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 pb-2 flex items-center gap-2"
        >
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-red-400 rounded-full"
                animate={{ height: [4, 12, 4] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          <span className="text-[12px] text-red-400 font-medium">Listening…</span>
        </motion.div>
      )}

      {/* Secondary actions — surface only on focus / text. Text links, not chips. */}
      <AnimatePresence initial={false}>
        {showSecondary && !isListening && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-4 px-4 pb-2.5 pt-0.5">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onExpandForm}
                className="text-[12px] font-medium text-white/55 hover:text-white touch-manipulation"
              >
                Full form
              </button>
              <span className="text-white/15">·</span>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onShowTemplates}
                className="text-[12px] font-medium text-white/55 hover:text-white touch-manipulation"
              >
                Templates
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
