import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MoreVertical, Phone, Play, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Chat sequence ────────────────────────────────────────────────────────────
export type ChatMsg =
  | { from: 'mate' | 'user'; kind?: 'text'; text: string; time: string }
  | { from: 'mate' | 'user'; kind: 'voice'; text: string; duration: string; time: string };

const CHAT_SEQUENCE: ChatMsg[] = [
  {
    from: 'mate',
    text: "Morning. 3 jobs today. Henderson's quote is still outstanding — want me to chase it?",
    time: '09:41',
  },
  { from: 'user', text: 'Yes please', time: '09:41' },
  {
    from: 'mate',
    text: "Done — polite reminder sent. I'll follow up tomorrow if no reply.",
    time: '09:42',
  },
  {
    from: 'user',
    kind: 'voice',
    text: 'New job from Sally at 16 Acacia Road, fit a shower pull cord',
    duration: '0:14',
    time: '09:45',
  },
  {
    from: 'mate',
    text: 'Got it. Added Sally, scheduled Thursday 10am, draft quote ready at £180 — tap to review.',
    time: '09:45',
  },
  { from: 'user', text: "what's the max Zs for a 32A MCB type B?", time: '09:46' },
  { from: 'mate', text: '1.37 Ω — table 41.3, BS 7671 A4:2026.', time: '09:46' },
];

const WAVE_HEIGHTS = [
  4, 7, 11, 15, 18, 22, 16, 10, 6, 9, 14, 19, 23, 20, 14, 8, 12, 18, 22, 25, 20, 14, 10, 16, 21, 18,
  13, 8, 5, 3,
];

// ═════════ PHONE CHAT MOCK ═══════════════════════════════════════════════════
export function PhoneChatMock() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);

  const voiceIndex = CHAT_SEQUENCE.findIndex((m) => 'kind' in m && m.kind === 'voice');
  const voiceVisible = visibleCount > voiceIndex && voiceIndex >= 0;

  // Auto-play the sequence
  useEffect(() => {
    if (visibleCount >= CHAT_SEQUENCE.length) {
      const t = setTimeout(() => {
        setVisibleCount(1);
        setVoiceProgress(0);
      }, 6000);
      return () => clearTimeout(t);
    }

    const next = CHAT_SEQUENCE[visibleCount];
    const isMate = next.from === 'mate';

    if (isMate) {
      setIsTyping(true);
      const t = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((c) => c + 1);
      }, 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 1700);
    return () => clearTimeout(t);
  }, [visibleCount]);

  // Voice playback animation
  useEffect(() => {
    if (!voiceVisible) {
      setVoiceProgress(0);
      return;
    }
    setVoiceProgress(0);
    const interval = setInterval(() => {
      setVoiceProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [voiceVisible]);

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] select-none">
      {/* Phone outer bezel */}
      <div className="relative rounded-[52px] p-[9px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)]">
        <div
          className="relative rounded-[44px] overflow-hidden bg-[#0b1410]"
          style={{ height: 580 }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 h-[28px] w-[104px] rounded-full bg-black z-30" />

          {/* Status bar — padded clear of the 44px rounded corner */}
          <div className="relative z-10 flex items-center justify-between px-10 pt-[22px] pb-1.5 text-white text-[13px] font-semibold tabular-nums">
            <span>9:41</span>
            <div className="flex items-center gap-[6px]">
              {/* signal */}
              <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
                <rect x="0" y="7" width="3" height="4" rx="0.5" />
                <rect x="5" y="5" width="3" height="6" rx="0.5" />
                <rect x="10" y="2.5" width="3" height="8.5" rx="0.5" />
                <rect x="15" y="0" width="2" height="11" rx="0.5" opacity="0.4" />
              </svg>
              {/* wifi */}
              <svg width="15" height="11" viewBox="0 0 13 11" fill="currentColor" aria-hidden>
                <path d="M6.5 11a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
                <path d="M2.6 6.5a5.5 5.5 0 017.8 0l1.2-1.2a7.2 7.2 0 00-10.2 0l1.2 1.2z" />
                <path d="M0 3.9a9.2 9.2 0 0113 0l1.25-1.3a11 11 0 00-15.5 0L0 3.9z" transform="translate(-0.5 0)" opacity="0.85" />
              </svg>
              {/* battery */}
              <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
                <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="currentColor" opacity="0.5" />
                <rect x="23" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
                <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* WhatsApp header */}
          <div
            className="relative z-10 flex items-center gap-2.5 px-3 py-2.5 border-b border-black/30"
            style={{ background: '#1f2c34' }}
          >
            <ChevronLeft className="h-5 w-5 text-white shrink-0" />
            <div className="h-9 w-9 rounded-full bg-elec-yellow flex items-center justify-center shrink-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.2)_inset]">
              <span className="text-black font-extrabold text-[14px]">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold text-white leading-tight truncate">
                Mate
              </div>
              <div className="text-[11px] text-white leading-tight mt-0.5">online</div>
            </div>
            <Video className="h-5 w-5 text-white shrink-0" />
            <Phone className="h-[18px] w-[18px] text-white shrink-0" />
            <MoreVertical className="h-5 w-5 text-white shrink-0" />
          </div>

          {/* Chat wallpaper + messages */}
          <div
            className="relative px-3 pt-3 pb-4 space-y-1.5 overflow-hidden"
            style={{
              height: 'calc(100% - 94px)',
              background:
                'linear-gradient(to bottom, #0b1410 0%, #0b1410 100%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)',
            }}
          >
            {/* faint wallpaper dots */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />

            <div className="relative flex flex-col justify-end min-h-full space-y-1.5">
              {CHAT_SEQUENCE.slice(0, visibleCount).map((msg, i) => (
                <MessageBubble
                  key={i}
                  msg={msg}
                  voiceProgress={'kind' in msg && msg.kind === 'voice' ? voiceProgress : 0}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg, voiceProgress }: { msg: ChatMsg; voiceProgress: number }) {
  const isOutgoing = msg.from === 'user';

  if ('kind' in msg && msg.kind === 'voice') {
    return (
      <VoiceBubble from={msg.from} duration={msg.duration} time={msg.time} progress={voiceProgress} />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24, mass: 0.6 }}
      className={cn('flex', isOutgoing ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[82%] rounded-[10px] px-2.5 pt-1.5 pb-1 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]',
          isOutgoing
            ? 'bg-[#005c4b] rounded-br-[4px] text-white'
            : 'bg-[#1f2c34] rounded-bl-[4px] text-white'
        )}
      >
        <div className="text-[14px] leading-[1.35] whitespace-pre-line">{msg.text}</div>
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[10px] text-white/50 tabular-nums leading-none">{msg.time}</span>
          {isOutgoing && (
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 11" fill="none">
              <path
                d="M11.071.653a.457.457 0 00-.304-.102.47.47 0 00-.381.178l-6.19 7.636-2.405-2.272a.458.458 0 00-.655.024.487.487 0 00.025.677l2.813 2.656a.457.457 0 00.312.125h.04a.466.466 0 00.324-.17L11.192 1.35a.49.49 0 00-.121-.697z"
                fill="#53bdeb"
              />
              <path
                d="M15.36.653a.457.457 0 00-.304-.102.47.47 0 00-.381.178l-6.19 7.636-.87-.82a.458.458 0 00-.654.023.487.487 0 00.024.677l1.283 1.211a.457.457 0 00.312.125h.04a.466.466 0 00.324-.17L15.48 1.35a.49.49 0 00-.12-.697z"
                fill="#53bdeb"
              />
            </svg>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Voice bubble ─────────────────────────────────────────────────────────────
function VoiceBubble({
  from,
  duration,
  time,
  progress,
}: {
  from: 'mate' | 'user';
  duration: string;
  time: string;
  progress: number;
}) {
  const isOutgoing = from === 'user';
  const playedCount = Math.floor((progress / 100) * WAVE_HEIGHTS.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24, mass: 0.6 }}
      className={cn('flex', isOutgoing ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'flex items-center gap-2 rounded-[10px] pl-2 pr-3 py-1.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]',
          isOutgoing ? 'bg-[#005c4b] rounded-br-[4px]' : 'bg-[#1f2c34] rounded-bl-[4px]'
        )}
        style={{ minWidth: 210 }}
      >
        {/* Small avatar circle */}
        <div className="relative h-8 w-8 rounded-full bg-elec-yellow flex items-center justify-center shrink-0">
          <span className="text-black font-extrabold text-[11px]">{isOutgoing ? 'You' : 'M'}</span>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#54656f] border border-[#005c4b] flex items-center justify-center">
            <svg width="7" height="7" viewBox="0 0 24 24" fill="white">
              <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zM17 11a5 5 0 01-10 0H5a7 7 0 006 6.92V21h2v-3.08A7 7 0 0019 11h-2z" />
            </svg>
          </span>
        </div>

        {/* Play button */}
        <button
          type="button"
          className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-white"
          aria-label="Play voice message"
        >
          {progress >= 100 ? (
            <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />
          ) : (
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          )}
        </button>

        {/* Waveform */}
        <div className="flex items-center gap-[1.5px] h-7 flex-1">
          {WAVE_HEIGHTS.map((h, i) => {
            const played = i < playedCount;
            return (
              <span
                key={i}
                className={cn(
                  'w-[2px] rounded-full transition-colors duration-150',
                  played ? 'bg-white' : 'bg-white/45'
                )}
                style={{ height: `${h}px` }}
              />
            );
          })}
        </div>

        {/* Duration + time */}
        <div className="flex flex-col items-end shrink-0">
          <span className="text-[11px] text-white font-medium tabular-nums leading-none">
            {duration}
          </span>
          <span className="text-[10px] text-white tabular-nums leading-none mt-1">{time}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      className="flex justify-start"
    >
      <div className="bg-[#1f2c34] rounded-[10px] rounded-bl-[4px] px-3 py-2.5 flex items-center gap-1 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay }}
            className="h-1.5 w-1.5 rounded-full bg-white/60"
          />
        ))}
      </div>
    </motion.div>
  );
}
