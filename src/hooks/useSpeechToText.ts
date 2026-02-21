/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * useSpeechToText
 *
 * Reusable hook wrapping the Web Speech API for speech-to-text.
 * Falls back between webkitSpeechRecognition and SpeechRecognition.
 * Uses en-GB locale (UK English). Supports continuous and single-shot modes.
 *
 * Features:
 * - `onFinalChunk` callback: fired each time the API commits a final result
 * - Safari auto-restart: Safari kills recognition after ~60s, this auto-restarts
 */

import { useState, useRef, useCallback, useEffect } from 'react';

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
  /** Whether the browser supports the Speech API */
  isSupported: boolean;
  /** Whether the recogniser is currently active */
  isListening: boolean;
  /** Final committed transcript text */
  transcript: string;
  /** Partial in-progress text (clears once finalised) */
  interimTranscript: string;
  /** Confidence of the last final result (0-1) */
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

function getSpeechRecognition(): SpeechRecognitionType | null {
  if (typeof window === 'undefined') return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

export function useSpeechToText(options: UseSpeechToTextOptions = {}): UseSpeechToTextReturn {
  const { continuous = true, interimResults = true, lang = 'en-GB', onFinalChunk } = options;

  const SpeechRecognition = getSpeechRecognition();
  const isSupported = SpeechRecognition !== null;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  // Track whether the user intentionally stopped vs Safari killing the session
  const intentionalStopRef = useRef(false);
  // Keep a ref to the latest transcript so onFinalChunk gets the full text
  const transcriptRef = useRef('');
  // Keep a stable ref to the callback to avoid re-creating recognition on every render
  const onFinalChunkRef = useRef(onFinalChunk);
  onFinalChunkRef.current = onFinalChunk;

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    intentionalStopRef.current = false;

    // Stop any existing instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        /* already stopped */
      }
    }

    const recognition = new SpeechRecognition();
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
          // Fire the onFinalChunk callback with the new chunk and full transcript
          if (onFinalChunkRef.current) {
            onFinalChunkRef.current(finalText, updated);
          }
          return updated;
        });
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event: any) => {
      // 'no-speech' and 'aborted' are non-critical — user just didn't speak or we stopped
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      setError(`Speech error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      // Safari auto-restart: if user didn't intentionally stop, restart
      // Safari kills continuous recognition after ~60s
      if (!intentionalStopRef.current && continuous) {
        try {
          recognition.start();
          return; // Don't set isListening to false — we're restarting
        } catch {
          // Failed to restart — fall through to normal onend handling
        }
      }
      setIsListening(false);
      setInterimTranscript('');
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [SpeechRecognition, lang, continuous, interimResults]);

  const stopListening = useCallback(() => {
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

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setConfidence(0);
    setError(null);
    transcriptRef.current = '';
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      intentionalStopRef.current = true;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          /* already stopped */
        }
      }
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
