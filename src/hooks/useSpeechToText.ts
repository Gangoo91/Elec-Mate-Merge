/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * useSpeechToText
 *
 * Unified speech-to-text hook. On web (Chromium/Safari) uses the Web Speech
 * API. On Capacitor native (iOS WKWebView already supports Web Speech, but
 * Android WebView does NOT) falls back to `@capacitor-community/speech-recognition`
 * so voice features work on Android.
 *
 * Same return shape on every platform — call sites stay unchanged.
 *
 * Features:
 * - `onFinalChunk` callback: fired each time the engine commits a final result
 * - Safari auto-restart: Safari kills recognition after ~60s, this auto-restarts
 * - Android: requests RECORD_AUDIO + speech permission via plugin
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

interface UseSpeechToTextOptions {
  /** Keep listening until explicitly stopped (default: true) */
  continuous?: boolean;
  /** Return interim (partial) results while speaking (default: true) */
  interimResults?: boolean;
  /** BCP 47 language tag (default: 'en-GB') */
  lang?: string;
  /** Fired each time the API commits a final result chunk */
  onFinalChunk?: (chunk: string, fullTranscript: string) => void;
}

interface UseSpeechToTextReturn {
  /** Whether the current platform can dictate speech */
  isSupported: boolean;
  /** Whether the recogniser is currently active */
  isListening: boolean;
  /** Final committed transcript text */
  transcript: string;
  /** Partial in-progress text (clears once finalised) */
  interimTranscript: string;
  /** Confidence of the last final result (0-1) — only set on web */
  confidence: number;
  /** Last error message, if any */
  error: string | null;
  /** Start listening */
  startListening: () => void;
  /** Stop listening */
  stopListening: () => void;
  /** Clear all transcript state */
  resetTranscript: () => void;
}

type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer T } ? T : any;

function getWebSpeechRecognition(): SpeechRecognitionType | null {
  if (typeof window === 'undefined') return null;
  return (
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition ||
    null
  );
}

const isNativePlatform = Capacitor.isNativePlatform();
// Android WebView does not expose Web Speech API, so we always route through
// the native plugin on Android. iOS WKWebView DOES expose it, but going
// through the native plugin there gives better mic-permission UX, so we
// route both native platforms via the plugin.
const useNativePlugin = isNativePlatform;

export function useSpeechToText(options: UseSpeechToTextOptions = {}): UseSpeechToTextReturn {
  const { continuous = true, interimResults = true, lang = 'en-GB', onFinalChunk } = options;

  const WebSpeechRecognition = getWebSpeechRecognition();

  // Track support: assume true on native (probed lazily on first start), use
  // Web Speech detection on browser.
  const [isSupported, setIsSupported] = useState<boolean>(
    useNativePlugin ? true : WebSpeechRecognition !== null
  );
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const intentionalStopRef = useRef(false);
  const transcriptRef = useRef('');
  const onFinalChunkRef = useRef(onFinalChunk);
  onFinalChunkRef.current = onFinalChunk;
  const nativeListenersRef = useRef<Array<{ remove: () => Promise<void> }>>([]);
  const lastPartialRef = useRef('');

  // ── NATIVE start/stop ──────────────────────────────────────────────────────
  const startListeningNative = useCallback(async () => {
    intentionalStopRef.current = false;
    setError(null);
    try {
      const { SpeechRecognition } = await import(
        '@capacitor-community/speech-recognition'
      );
      const probe = await SpeechRecognition.available();
      if (!probe.available) {
        setIsSupported(false);
        setError('Speech recognition not available on this device');
        return;
      }
      const perm = await SpeechRecognition.checkPermissions();
      if (perm.speechRecognition !== 'granted') {
        const req = await SpeechRecognition.requestPermissions();
        if (req.speechRecognition !== 'granted') {
          setError('Microphone permission denied');
          return;
        }
      }

      // Attach listeners idempotently — clear any stale ones first.
      for (const h of nativeListenersRef.current) {
        h.remove().catch(() => undefined);
      }
      nativeListenersRef.current = [];

      const partial = await SpeechRecognition.addListener(
        'partialResults',
        (data: { matches?: string[] }) => {
          const first = data?.matches?.[0];
          if (!first) return;
          lastPartialRef.current = first;
          if (interimResults) setInterimTranscript(first);
        }
      );
      const stateListener = await SpeechRecognition.addListener(
        'listeningState',
        async (data: { status: 'started' | 'stopped' }) => {
          if (data.status === 'started') {
            setIsListening(true);
            return;
          }
          // 'stopped': commit the latest partial as final, restart if continuous
          // and the user didn't intentionally stop.
          const finalText = lastPartialRef.current;
          if (finalText) {
            setTranscript((prev) => {
              const updated = prev ? `${prev} ${finalText}` : finalText;
              transcriptRef.current = updated;
              onFinalChunkRef.current?.(finalText, updated);
              return updated;
            });
            lastPartialRef.current = '';
            setInterimTranscript('');
          }

          if (!intentionalStopRef.current && continuous) {
            try {
              await SpeechRecognition.start({
                language: lang,
                maxResults: 1,
                partialResults: true,
                popup: false,
              });
              return;
            } catch {
              /* restart failed — fall through */
            }
          }
          setIsListening(false);
        }
      );
      nativeListenersRef.current.push(partial, stateListener);

      await SpeechRecognition.start({
        language: lang,
        maxResults: 1,
        partialResults: true,
        popup: false,
      });
    } catch (err) {
      console.error('[useSpeechToText] native start failed', err);
      setError(err instanceof Error ? err.message : String(err));
      setIsListening(false);
    }
  }, [continuous, interimResults, lang]);

  const stopListeningNative = useCallback(async () => {
    intentionalStopRef.current = true;
    try {
      const { SpeechRecognition } = await import(
        '@capacitor-community/speech-recognition'
      );
      await SpeechRecognition.stop();
    } catch {
      /* ignore */
    }
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  // ── WEB start/stop ─────────────────────────────────────────────────────────
  const startListeningWeb = useCallback(() => {
    if (!WebSpeechRecognition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    intentionalStopRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        /* already stopped */
      }
    }

    const recognition = new WebSpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      let finalText = '';
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
          setConfidence(result[0].confidence ?? 0);
        } else {
          interim += result[0].transcript;
        }
      }

      if (finalText) {
        setTranscript((prev) => {
          const updated = prev + finalText;
          transcriptRef.current = updated;
          onFinalChunkRef.current?.(finalText, updated);
          return updated;
        });
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      setError(`Speech error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      if (!intentionalStopRef.current && continuous) {
        try {
          recognition.start();
          return;
        } catch {
          /* fall through */
        }
      }
      setIsListening(false);
      setInterimTranscript('');
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [WebSpeechRecognition, lang, continuous, interimResults]);

  const stopListeningWeb = useCallback(() => {
    intentionalStopRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        /* already stopped */
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  // ── Public API (dispatches to the right platform) ──────────────────────────
  const startListening = useCallback(() => {
    if (useNativePlugin) {
      void startListeningNative();
    } else {
      startListeningWeb();
    }
  }, [startListeningNative, startListeningWeb]);

  const stopListening = useCallback(() => {
    if (useNativePlugin) {
      void stopListeningNative();
    } else {
      stopListeningWeb();
    }
  }, [stopListeningNative, stopListeningWeb]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setConfidence(0);
    setError(null);
    transcriptRef.current = '';
    lastPartialRef.current = '';
  }, []);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      intentionalStopRef.current = true;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          /* ignore */
        }
      }
      for (const h of nativeListenersRef.current) {
        h.remove().catch(() => undefined);
      }
      nativeListenersRef.current = [];
    };
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}

export default useSpeechToText;
