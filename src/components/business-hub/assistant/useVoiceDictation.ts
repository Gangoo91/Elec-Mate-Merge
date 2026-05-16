import { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';

/**
 * Voice dictation hook — uses Capacitor speech recognition plugin on native
 * (iOS WKWebView, Android), falls back to Web Speech API on browser. Returns
 * `supported = true` on any platform that can actually dictate.
 */
export function useVoiceDictation(onTranscript: (text: string) => void) {
  const webRecognitionRef = useRef<any>(null);
  const nativeListenersRef = useRef<Array<{ remove: () => Promise<void> }>>([]);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  const isNative = Capacitor.isNativePlatform();

  // Probe support once on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isNative) {
        try {
          // Lazy-load the plugin so web bundles don't choke.
          const { SpeechRecognition } = await import(
            '@capacitor-community/speech-recognition'
          );
          const { available } = await SpeechRecognition.available();
          if (!cancelled) setSupported(!!available);
        } catch (err) {
          console.warn('[voice] native plugin unavailable', err);
          if (!cancelled) setSupported(false);
        }
        return;
      }
      // Web fallback
      const w = window as any;
      const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
      if (!SR) {
        if (!cancelled) setSupported(false);
        return;
      }
      if (!cancelled) setSupported(true);
      const recog = new SR();
      recog.continuous = false;
      recog.interimResults = true;
      recog.lang = 'en-GB';
      recog.onresult = (e: any) => {
        let transcript = '';
        for (let i = 0; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        onTranscriptRef.current(transcript);
      };
      recog.onend = () => setListening(false);
      recog.onerror = () => setListening(false);
      webRecognitionRef.current = recog;
    })();
    return () => {
      cancelled = true;
      try {
        webRecognitionRef.current?.abort?.();
      } catch {
        /* ignore */
      }
    };
  }, [isNative]);

  // Detach native listeners on unmount.
  useEffect(() => {
    return () => {
      for (const h of nativeListenersRef.current) {
        h.remove().catch(() => undefined);
      }
      nativeListenersRef.current = [];
    };
  }, []);

  const start = async () => {
    if (isNative) {
      try {
        const { SpeechRecognition } = await import(
          '@capacitor-community/speech-recognition'
        );
        // Permission gate — Apple/Google both require this.
        const perm = await SpeechRecognition.checkPermissions();
        const granted = perm.speechRecognition === 'granted';
        if (!granted) {
          const req = await SpeechRecognition.requestPermissions();
          if (req.speechRecognition !== 'granted') {
            setSupported(false);
            return;
          }
        }
        // Attach partial-results listener (idempotent).
        if (nativeListenersRef.current.length === 0) {
          const partial = await SpeechRecognition.addListener(
            'partialResults',
            (data: { matches?: string[] }) => {
              const first = data?.matches?.[0];
              if (first) onTranscriptRef.current(first);
            }
          );
          const stateListener = await SpeechRecognition.addListener(
            'listeningState',
            (data: { status: 'started' | 'stopped' }) => {
              setListening(data.status === 'started');
            }
          );
          nativeListenersRef.current.push(partial, stateListener);
        }
        await SpeechRecognition.start({
          language: 'en-GB',
          maxResults: 1,
          prompt: 'Speak your task',
          partialResults: true,
          popup: false,
        });
        setListening(true);
      } catch (err) {
        console.error('[voice] native start failed', err);
        setListening(false);
      }
      return;
    }
    // Web
    if (!webRecognitionRef.current) return;
    try {
      webRecognitionRef.current.start();
      setListening(true);
    } catch {
      /* already listening or denied */
    }
  };

  const stop = async () => {
    if (isNative) {
      try {
        const { SpeechRecognition } = await import(
          '@capacitor-community/speech-recognition'
        );
        await SpeechRecognition.stop();
      } catch {
        /* ignore */
      }
      setListening(false);
      return;
    }
    if (!webRecognitionRef.current) return;
    try {
      webRecognitionRef.current.stop();
    } catch {
      /* ignore */
    }
    setListening(false);
  };

  return { listening, supported, start, stop };
}
