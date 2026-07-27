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
  category: string;
  tone: Tone;
  query: string;
  /**
   * What the answer will actually hand back. The old card showed a sequence
   * number ("01"), which told the user nothing — this sets the expectation
   * that an answer arrives with a figure and a citation, not an essay.
   */
  yields: string;
}

// Pool of examples — four are shown per visit so the screen stays fresh for
// returning users and quietly teaches the assistant's breadth.
const EXAMPLE_POOL: ExampleQuery[] = [
  // Written the way a spark actually asks on site: a real value, a real
  // decision, a yes/no. The previous pool was all textbook phrasing
  // ("What is the correct procedure for…"), which under-sold the tool — it
  // reads like a search box rather than someone who answers questions.
  {
    category: 'PASS OR FAIL',
    tone: 'yellow',
    query: "I measured Zs of 1.62 Ω on a B32 final circuit, TN-C-S. Does it pass?",
    yields: 'Verdict + Table 41.3 limit',
  },
  {
    category: 'EICR CODING',
    tone: 'purple',
    query: 'Kitchen sockets with no RCD protection on a 1998 board — what code do I give it?',
    yields: 'C1/C2/C3 + reasoning',
  },
  {
    category: 'CABLE SIZING',
    tone: 'emerald',
    query: 'What size SWA for a 60 A three-phase submain, 40 m, buried in ground?',
    yields: 'CSA + volt drop check',
  },
  {
    category: 'A4:2026 CHANGES',
    tone: 'blue',
    query: 'Where are AFDDs actually required under A4:2026, and where are they only recommended?',
    yields: 'Scope + exact regs',
  },
  {
    category: 'TESTING',
    tone: 'blue',
    query: 'What order do I do the dead tests in, and why does the order matter?',
    yields: 'Sequence + rationale',
  },
  {
    category: 'CALCULATIONS',
    tone: 'emerald',
    query: 'Volt drop on 6 mm² twin & earth, 32 A over 28 m — am I inside 3%?',
    yields: 'mV/A/m working shown',
  },
  {
    category: 'RCD SELECTION',
    tone: 'yellow',
    query: 'EV charger on a TT supply — which RCD type, and what Ra do I need?',
    yields: 'RCD type + Ra limit',
  },
  {
    category: 'PRACTICAL',
    tone: 'purple',
    query: 'Board change on a rented flat — what must I test and what goes on the cert?',
    yields: 'Test list + cert fields',
  },
];

// Deterministic-per-mount selection: two fixed anchors (the two highest-value
// daily jobs — pass/fail and EICR coding) plus two rotating, so returning users
// keep discovering breadth without the first screen ever feeling random.
function pickExamples(): ExampleQuery[] {
  const anchors = EXAMPLE_POOL.slice(0, 2);
  const rest = EXAMPLE_POOL.slice(2);
  const shuffled = [...rest].sort(() => Math.random() - 0.5).slice(0, 2);
  return [...anchors, ...shuffled];
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
    <div className="mx-auto w-full max-w-5xl lg:max-w-5xl xl:max-w-6xl px-1 sm:px-4 lg:px-10 py-8 sm:py-12">
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
          <p className="mt-4 max-w-2xl text-[13.5px] sm:text-sm text-white leading-relaxed">
            Ask anything on BS 7671:2018+A4:2026 — regulations, calculations, test procedures,
            installation practice. Every answer is cited to the exact regulation, and every
            citation is checked against the standard before you see it.
          </p>

          {/* Capability chips — most users never discover photos and voice. */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CAPABILITIES.map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11.5px] font-medium text-white"
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
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
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
                <Clock className="h-4 w-4 flex-shrink-0 text-elec-yellow" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-white">
                  {s.title || 'Previous conversation'}
                </span>
                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-elec-yellow transition-transform group-hover:translate-x-0.5" />
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
        className="mt-8 sm:mt-10 text-[10px] font-medium uppercase tracking-[0.22em] text-white"
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
              'flex flex-col bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)]',
              'border border-white/[0.06] hover:border-white/[0.12] rounded-2xl',
              'p-5 sm:p-6 lg:p-6 min-h-[150px] lg:min-h-[168px]',
              'transition-[background-color,border-color,transform] duration-150 touch-manipulation',
              'active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
            )}
          >
            <div
              className={cn(
                'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity',
                toneAccent[item.tone]
              )}
            />

            <div className="flex items-center justify-between gap-3">
              <div
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.22em]',
                  toneText[item.tone]
                )}
              >
                {item.category}
              </div>
              <span className="shrink-0 text-[13px] font-medium text-elec-yellow transition-transform group-hover:translate-x-0.5">
                Ask &rarr;
              </span>
            </div>

            <p className="mt-3.5 text-[16px] sm:text-[17px] lg:text-[17.5px] font-semibold text-white leading-snug tracking-tight">
              {item.query}
            </p>

            {/* What you get back. Sets the expectation of a figure + a citation
                rather than an essay — and it's the honest differentiator against
                asking a generic chatbot the same question. */}
            <div className="mt-auto flex items-center gap-2 pt-4">
              <span className="h-1 w-1 shrink-0 rounded-full bg-elec-yellow" />
              <span className="text-[11.5px] font-medium text-white">{item.yields}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;
