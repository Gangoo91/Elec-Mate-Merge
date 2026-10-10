import { useEffect, useState } from 'react';
import { Heart, RefreshCw, Share2, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/utils/clipboard';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { supabase } from '@/integrations/supabase/client';
import { prefsService } from '@/services/mentalHealthService';

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
    // Fresh device: adopt the cloud copy of liked affirmations when local is empty.
    if (storageGetJSONSync<string[]>('elec-mate-liked-affirmations', []).length === 0) {
      prefsService
        .get<string[]>('liked-affirmations')
        .then((cloud) => {
          if (cloud && cloud.length > 0) {
            storageSetJSONSync('elec-mate-liked-affirmations', cloud);
          }
        })
        .catch(() => {});
    }
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
    prefsService.set('liked-affirmations', liked).catch(() => {});
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
        return;
      } catch (err) {
        // Cancelling is a decision; anything else means the share never
        // happened, so fall through rather than leave the button dead.
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    await copyToClipboard(shareText);
    toast.success('Copied to clipboard');
  };

  const iconBtn =
    'flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.08] disabled:opacity-50';

  return (
    <div className="-mx-4 card-surface p-5 max-sm:!rounded-none max-sm:!border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
      {/* Sentence case, no spaced capitals or tinted badge (10 Oct). */}
      <p className="text-[13px] font-semibold text-elec-yellow">
        {isPersonalised ? 'Today’s thought, for you' : 'Today’s thought'}
      </p>
      <p
        className={`mt-2 text-[17px] font-medium leading-snug text-white transition-opacity sm:text-[18px] ${
          isRefreshing ? 'opacity-40' : 'opacity-100'
        }`}
      >
        “{text}”
      </p>

      <div className="-mb-2 -ml-2.5 mt-2 flex items-center gap-1">
        <button
          onClick={handleLike}
          className={iconBtn}
          aria-label={isLiked ? 'Unlike' : 'Like'}
          aria-pressed={isLiked}
        >
          <Heart
            className={`h-[18px] w-[18px] ${isLiked ? 'fill-current text-elec-yellow' : ''}`}
            strokeWidth={1.5}
          />
        </button>
        <button
          onClick={handleSpeak}
          className={iconBtn}
          aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
        >
          {isSpeaking ? (
            <VolumeX className="h-[18px] w-[18px]" strokeWidth={1.5} />
          ) : (
            <Volume2 className="h-[18px] w-[18px]" strokeWidth={1.5} />
          )}
        </button>
        <button onClick={handleShare} className={iconBtn} aria-label="Share">
          <Share2 className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => loadAffirmation(true)}
          disabled={isRefreshing}
          className={iconBtn}
          aria-label="Another one"
        >
          <RefreshCw
            className={`h-[18px] w-[18px] ${isRefreshing ? 'animate-spin' : ''}`}
            strokeWidth={1.5}
          />
        </button>
      </div>
    </div>
  );
};

export default DailyAffirmation;
