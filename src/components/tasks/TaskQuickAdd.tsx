import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Mic, MicOff, PenLine, Zap, Send } from 'lucide-react';
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

  return (
    <div
      className={cn(
        'rounded-2xl border transition-colors',
        isListening
          ? 'border-red-400/40 bg-red-500/[0.06]'
          : hasText
            ? 'border-yellow-500/30 bg-yellow-500/[0.04]'
            : 'border-white/[0.08] bg-white/[0.03]'
      )}
    >
      {/* Input row */}
      <div className="flex items-center gap-2 p-2">
        {/* Leading icon */}
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
            hasText ? 'bg-gradient-to-br from-yellow-400/20 to-amber-500/20' : 'bg-white/[0.06]'
          )}
        >
          <PenLine
            className={cn(
              'h-4.5 w-4.5 transition-colors',
              hasText ? 'text-yellow-400' : 'text-white'
            )}
          />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a task..."
          className="flex-1 h-10 bg-transparent text-[15px] text-white placeholder:text-white outline-none touch-manipulation"
        />

        {/* Right actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Mic button */}
          {speechSupported && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={cn(
                'w-9 h-9 flex items-center justify-center rounded-xl touch-manipulation transition-all',
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-white/[0.06] text-white active:bg-white/10'
              )}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          )}

          {/* Send button — appears when text entered */}
          <AnimatePresence>
            {hasText && (
              <motion.button
                type="button"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                onClick={handleSubmit}
                disabled={saving}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black touch-manipulation active:scale-[0.95] disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Listening indicator bar */}
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
          <span className="text-[12px] text-red-400 font-medium">Listening...</span>
        </motion.div>
      )}

      {/* Action pills — inside card */}
      <div className="flex items-center gap-2 px-2 pb-2 pt-1.5 border-t border-white/[0.06]">
        <button
          type="button"
          onClick={onExpandForm}
          className="flex items-center gap-1.5 px-3.5 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] text-[12px] font-semibold text-white touch-manipulation active:bg-white/10 transition-colors"
        >
          <Plus className="h-3 w-3" />
          Full form
        </button>
        <button
          type="button"
          onClick={onShowTemplates}
          className="flex items-center gap-1.5 px-3.5 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 text-[12px] font-semibold text-purple-400 touch-manipulation active:bg-purple-500/20 transition-colors"
        >
          <Zap className="h-3 w-3" />
          Templates
        </button>
      </div>
    </div>
  );
}
