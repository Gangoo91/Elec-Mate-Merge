import { useEffect, useState } from 'react';
import { Heart, Quote, RefreshCw, Share2, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/utils/clipboard';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { supabase } from '@/integrations/supabase/client';

const FALLBACK_QUOTES = [
  'Every job you sign off safely is a small act of care for someone you may never meet.',
  "Long days end. Bills get paid. The work is real, even on the days it doesn't feel like it.",
  'Asking for a hand is a skill, not a weakness. The good ones do it more, not less.',
  'You can rest tonight. The board will still be there in the morning, and you will be sharper.',
  "You've solved harder things than what's in front of you today. Keep going.",
];

const CACHE_KEY = 'elec-mate-daily-affirmation-v2';

interface CachedAffirmation {
  text: string;
  date: string;
}

function todayKey() {
  return new Date().toISOString().split('T')[0];
}

function pickFallback(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  return FALLBACK_QUOTES[Math.abs(h) % FALLBACK_QUOTES.length];
}

export const DailyAffirmation = () => {
  const [text, setText] = useState<string>(() => pickFallback(todayKey()));
  const [isLiked, setIsLiked] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPersonalised, setIsPersonalised] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const loadAffirmation = async (force = false) => {
    const today = todayKey();

    // 1) Local cache hit (same day, not forced)
    if (!force) {
      const cached = storageGetJSONSync<CachedAffirmation | null>(CACHE_KEY, null);
      if (cached && cached.date === today && cached.text) {
        setText(cached.text);
        setIsPersonalised(true);
        return;
      }
    }

    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-daily-affirmation');
      if (error) throw error;
      const next = (data?.affirmation as string) || pickFallback(today);
      setText(next);
      storageSetJSONSync(CACHE_KEY, { text: next, date: today });
      setIsPersonalised(true);
    } catch {
      // Fall back silently — the deterministic seed picks one fallback per day
      const fallback = pickFallback(today);
      setText(fallback);
      setIsPersonalised(false);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAffirmation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync liked state whenever text changes
  useEffect(() => {
    const liked = storageGetJSONSync<string[]>('elec-mate-liked-affirmations', []);
    setIsLiked(liked.includes(text));
  }, [text]);

  const handleLike = () => {
    let liked = storageGetJSONSync<string[]>('elec-mate-liked-affirmations', []);
    if (isLiked) liked = liked.filter((t) => t !== text);
    else liked.push(text);
    storageSetJSONSync('elec-mate-liked-affirmations', liked);
    setIsLiked(!isLiked);
  };

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      toast.error('Speech not supported on this device');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1;
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleShare = async () => {
    const shareText = `"${text}" — Elec-Mate`;
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {
        /* user cancelled */
      }
    } else {
      await copyToClipboard(shareText);
      toast.success('Copied to clipboard');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-purple-500/[0.08] via-white/[0.02] to-elec-yellow/[0.06] p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple-500/70 via-violet-400/70 to-indigo-400/70 opacity-70" />
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <Quote className="h-4 w-4 text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Daily affirmation
            </span>
            {isPersonalised && (
              <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/20">
                For you · today
              </span>
            )}
          </div>
          <p
            className={`mt-2 text-[15px] sm:text-base text-white font-medium leading-snug transition-opacity ${
              isRefreshing ? 'opacity-40' : 'opacity-100'
            }`}
          >
            “{text}”
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 mt-3">
        <button
          onClick={handleLike}
          className={`h-10 w-10 rounded-full flex items-center justify-center touch-manipulation hover:bg-white/[0.06] transition-colors ${
            isLiked ? 'text-pink-400' : 'text-white'
          }`}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        <button
          onClick={handleSpeak}
          className={`h-10 w-10 rounded-full flex items-center justify-center touch-manipulation hover:bg-white/[0.06] transition-colors ${
            isSpeaking ? 'text-purple-400' : 'text-white'
          }`}
          aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
        >
          {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <button
          onClick={handleShare}
          className="h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => loadAffirmation(true)}
          disabled={isRefreshing}
          className="h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-white/[0.06] transition-colors touch-manipulation disabled:opacity-50"
          aria-label="Refresh"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default DailyAffirmation;
