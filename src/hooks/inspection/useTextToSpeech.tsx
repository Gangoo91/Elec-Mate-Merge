import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getFromCache, saveToCache } from '@/utils/audioCache';

export interface SpeakOptions {
  voice?: 'brian' | 'alice' | 'charlie' | string; // Allow custom voice IDs
  priority?: 'high' | 'normal' | 'low';
  interrupt?: boolean;
  speed?: number;
  useNative?: boolean;
}

interface QueuedPhrase {
  text: string;
  options: SpeakOptions;
}

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [queue, setQueue] = useState<QueuedPhrase[]>([]);
  const [voiceSettings, setVoiceSettings] = useState({
    enabled: true,
    voice: 'brian' as 'brian' | 'alice' | 'charlie' | string,
    speed: 1.0,
    customVoiceId: '', // Store custom ElevenLabs voice ID
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isProcessingRef = useRef(false);

  const speakNative = useCallback((text: string, speed: number = 1.0) => {
    return new Promise<void>((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = speed;
      
      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(e);
      
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const speakWithElevenLabs = useCallback(async (
    text: string,
    voice: string,
    speed: number
  ): Promise<void> => {
    // Check cache first
    const cacheKey = `${text}-${voice}-${speed}`;
    const cachedAudio = await getFromCache(cacheKey);
    
    if (cachedAudio) {
      console.log('Playing from cache:', text);
      const audio = new Audio(URL.createObjectURL(cachedAudio));
      audioRef.current = audio;
      
      return new Promise((resolve, reject) => {
        audio.onended = () => {
          audioRef.current = null;
          resolve();
        };
        audio.onerror = reject;
        audio.playbackRate = speed;
        audio.play().catch(reject);
      });
    }

    // Call ElevenLabs API via edge function
    const { data, error } = await supabase.functions.invoke('text-to-speech', {
      body: { text, voice, speed }
    });

    if (error || data?.error) {
      throw new Error(data?.error || error?.message || 'Failed to generate speech');
    }

    if (data?.fallbackToNative) {
      console.log('Falling back to native TTS');
      return speakNative(text, speed);
    }

    // Convert base64 to audio blob
    const binaryString = atob(data.audioContent);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });
    
    // Cache the audio
    await saveToCache(cacheKey, audioBlob, text, voice);

    // Play the audio
    const audio = new Audio(URL.createObjectURL(audioBlob));
    audioRef.current = audio;

    return new Promise((resolve, reject) => {
      audio.onended = () => {
        audioRef.current = null;
        resolve();
      };
      audio.onerror = reject;
      audio.playbackRate = speed;
      audio.play().catch(reject);
    });
  }, [speakNative]);

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current || queue.length === 0) return;
    
    isProcessingRef.current = true;
    setIsSpeaking(true);

    const { text, options } = queue[0];
    setQueue(prev => prev.slice(1));

    try {
      const voice = options.voice || voiceSettings.voice;
      const speed = options.speed || voiceSettings.speed;
      const useNative = options.useNative || !voiceSettings.enabled;

      if (useNative) {
        await speakNative(text, speed);
      } else {
        await speakWithElevenLabs(text, voice, speed);
      }
    } catch (error) {
      console.error('Speech error:', error);
      // Fallback to native on error
      try {
        await speakNative(text, options.speed || voiceSettings.speed);
      } catch (nativeError) {
        console.error('Native speech also failed:', nativeError);
        toast({
          title: "Voice feedback unavailable",
          description: "Unable to play audio. Check your browser settings.",
          variant: "destructive",
        });
      }
    } finally {
      isProcessingRef.current = false;
      setIsSpeaking(false);
      
      // Process next in queue
      if (queue.length > 1) {
        setTimeout(() => processQueue(), 100);
      }
    }
  }, [queue, voiceSettings, speakNative, speakWithElevenLabs]);

  useEffect(() => {
    if (queue.length > 0 && !isProcessingRef.current) {
      processQueue();
    }
  }, [queue, processQueue]);

  const speak = useCallback((text: string, options: SpeakOptions = {}) => {
    if (!voiceSettings.enabled && !options.useNative) return;
    
    if (options.interrupt) {
      stop();
      setQueue([{ text, options }]);
    } else {
      setQueue(prev => {
        const priority = options.priority || 'normal';
        if (priority === 'high') {
          return [{ text, options }, ...prev];
        }
        return [...prev, { text, options }];
      });
    }
  }, [voiceSettings.enabled]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setQueue([]);
    setIsSpeaking(false);
    isProcessingRef.current = false;
  }, []);

  const updateSettings = useCallback((settings: Partial<typeof voiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...settings }));
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    queue,
    voiceSettings,
    updateSettings,
  };
};
