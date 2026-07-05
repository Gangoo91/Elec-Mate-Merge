import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toneText, toneAccent, type Tone } from '@/components/college/primitives';

interface RecentSession {
  id: string;
  title: string;
  updated_at?: string;
}

interface WelcomeScreenProps {
  onSelectQuery: (query: string) => void;
  /** Most recent conversations — lets users pick up where they left off
      without opening the history drawer. */
  recentSessions?: RecentSession[];
  onResumeSession?: (id: string) => void;
}

interface ExampleQuery {
  number: string;
  category: string;
  tone: Tone;
  query: string;
}

// Pool of examples — four are shown per visit so the screen stays fresh for
// returning users and quietly teaches the assistant's breadth.
const EXAMPLE_POOL: ExampleQuery[] = [
  {
    number: '01',
    category: 'REGULATIONS',
    tone: 'yellow',
    query: 'What are the RCD requirements for socket-outlets in kitchens?',
  },
  {
    number: '02',
    category: 'CALCULATIONS',
    tone: 'emerald',
    query: 'How do I calculate voltage drop for a 6mm twin & earth cable?',
  },
  {
    number: '03',
    category: 'TESTING',
    tone: 'blue',
    query: 'What is the correct procedure for testing loop impedance?',
  },
  {
    number: '04',
    category: 'PRACTICAL',
    tone: 'purple',
    query: 'How do I wire a consumer unit with dual RCD split-load?',
  },
  {
    number: '05',
    category: 'REGULATIONS',
    tone: 'yellow',
    query: 'Where are AFDDs required under A4:2026?',
  },
  {
    number: '06',
    category: 'CALCULATIONS',
    tone: 'emerald',
    query: 'What is the maximum Zs for a 32A Type B MCB on a TN-C-S system?',
  },
  {
    number: '07',
    category: 'TESTING',
    tone: 'blue',
    query: 'What order should dead tests be carried out in, and why?',
  },
  {
    number: '08',
    category: 'PRACTICAL',
    tone: 'purple',
    query: 'What size SWA do I need for a 60A three-phase submain over 40 metres?',
  },
];

// Deterministic-per-mount selection: two "core four" anchors + two rotating.
function pickExamples(): ExampleQuery[] {
  const anchors = EXAMPLE_POOL.slice(0, 2);
  const rest = EXAMPLE_POOL.slice(2);
  const shuffled = [...rest].sort(() => Math.random() - 0.5).slice(0, 2);
  return [...anchors, ...shuffled].map((q, i) => ({
    ...q,
    number: String(i + 1).padStart(2, '0'),
  }));
}

const CAPABILITIES = [
  'Photo a board or defect — it reads it',
  'Voice questions, hands free',
  'Cable & Zs calculations',
  'A4:2026 changes explained',
];

export function WelcomeScreen({
  onSelectQuery,
  recentSessions = [],
  onResumeSession,
}: WelcomeScreenProps) {
  // Stable per mount — re-renders must not reshuffle the cards.
  const examples = useMemo(pickExamples, []);
  // Dedupe by title: the pre-fix session-fork bug left twin rows in history,
  // and two identical "pick up" cards reads as a glitch.
  const resumable = useMemo(() => {
    if (!onResumeSession) return [] as RecentSession[];
    const seen = new Set<string>();
    return recentSessions
      .filter((s) => {
        const key = (s.title || '').trim().toLowerCase();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 2);
  }, [recentSessions, onResumeSession]);

  return (
    <div className="mx-auto w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl px-1 sm:px-4 lg:px-10 py-8 sm:py-12">
      {/* Hero — editorial, text-led. The page header already says which
          assistant this is, so no duplicate eyebrow here. */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative"
      >
        <div className="absolute inset-x-0 -top-2 h-px bg-gradient-to-r from-transparent via-elec-yellow/60 to-transparent opacity-70" />

        <div className="pt-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
            Every reg. Every table. <span className="text-elec-yellow">On tap.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[13.5px] sm:text-sm text-white/85 leading-relaxed">
            Ask anything on BS 7671:2018+A4:2026 — regulations, calculations, test procedures,
            installation practice. Every answer is cited to the exact regulation, and every
            citation is checked against the standard before you see it.
          </p>

          {/* Capability chips — most users never discover photos and voice. */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CAPABILITIES.map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11.5px] font-medium text-white/70"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pick up where you left off — only when there is something to resume */}
      {resumable.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="mt-8"
        >
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
            Pick up where you left off
          </div>
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            {resumable.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onResumeSession?.(s.id)}
                className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-left transition-colors hover:bg-white/[0.06] active:scale-[0.99] touch-manipulation"
              >
                <Clock className="h-4 w-4 flex-shrink-0 text-white/40" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-white">
                  {s.title || 'Previous conversation'}
                </span>
                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-elec-yellow/70 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Prompt eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="mt-8 sm:mt-10 text-[10px] font-medium uppercase tracking-[0.22em] text-white/50"
      >
        Try asking
      </motion.div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
        {examples.map((item, idx) => (
          <motion.button
            key={item.query}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.22 + idx * 0.06 }}
            onClick={() => onSelectQuery(item.query)}
            className={cn(
              'group relative overflow-hidden text-left',
              'bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)]',
              'border border-white/[0.06] rounded-2xl',
              'p-5 sm:p-6 lg:p-7 lg:min-h-[160px]',
              'transition-colors touch-manipulation',
              'active:scale-[0.995]'
            )}
          >
            <div
              className={cn(
                'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity',
                toneAccent[item.tone]
              )}
            />

            <div className="flex items-center justify-between">
              <div
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.22em]',
                  toneText[item.tone]
                )}
              >
                {item.number} · {item.category}
              </div>
              <span className="text-[13px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                Ask →
              </span>
            </div>

            <p className="mt-4 text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-white leading-snug tracking-tight">
              {item.query}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;
