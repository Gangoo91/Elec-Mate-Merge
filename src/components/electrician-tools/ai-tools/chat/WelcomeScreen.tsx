/**
 * Elec-AI welcome screen — what you see before you've asked anything.
 *
 * This was a landing page bolted onto a tool the user has already paid for and
 * already navigated to. Four things went:
 *
 *   THE HERO. "Every reg. Every table. On tap." at 48px over a three-line
 *   paragraph explaining what the product does — roughly 300px of pitch before
 *   the first thing you could tap. The masthead already says Elec-AI and the
 *   composer is directly below; nobody who got here needs selling to.
 *
 *   THE CAPABILITY CHIPS. "Photo a board or defect — it reads it", "Voice
 *   questions, hands free" — four non-interactive spans advertising Camera,
 *   Photo and the mic button, which ConversationalSearch renders in the
 *   composer a few hundred pixels down the same screen. If those controls go
 *   undiscovered the answer is to make the controls findable, not to print a
 *   claim that they exist.
 *
 *   THE FIVE-COLOUR RAINBOW. Category labels and card hairlines ran on
 *   purple/emerald/blue/yellow from `toneAccent`. The colour encoded nothing —
 *   "EICR CODING" was purple because it was second in the list. Volt now, like
 *   every other card in the app.
 *
 *   THE INVALID DIVIDER. `via-white/25/60` is not a Tailwind class (two opacity
 *   modifiers), so the hairline above the hero generated no CSS and had been
 *   rendering nothing.
 *
 * The cards themselves now come from the shared card recipe, so this page is
 * made of the same material as the hubs rather than its own `hsl(0 0% 12%)`.
 */
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';

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
    category: 'Pass or fail',
    query: 'I measured Zs of 1.62 Ω on a B32 final circuit, TN-C-S. Does it pass?',
    yields: 'Verdict + Table 41.3 limit',
  },
  {
    category: 'EICR coding',
    query: 'Kitchen sockets with no RCD protection on a 1998 board — what code do I give it?',
    yields: 'C1/C2/C3 + reasoning',
  },
  {
    category: 'Cable sizing',
    query: 'What size SWA for a 60 A three-phase submain, 40 m, buried in ground?',
    yields: 'CSA + volt drop check',
  },
  {
    category: 'A4:2026 changes',
    query: 'Where are AFDDs actually required under A4:2026, and where are they only recommended?',
    yields: 'Scope + exact regs',
  },
  {
    category: 'Testing',
    query: 'What order do I do the dead tests in, and why does the order matter?',
    yields: 'Sequence + rationale',
  },
  {
    category: 'Calculations',
    query: 'Volt drop on 6 mm² twin & earth, 32 A over 28 m — am I inside 3%?',
    yields: 'mV/A/m working shown',
  },
  {
    category: 'RCD selection',
    query: 'EV charger on a TT supply — which RCD type, and what Ra do I need?',
    yields: 'RCD type + Ra limit',
  },
  {
    category: 'Practical',
    query: 'Board change on a rented flat — what must I test and what goes on the cert?',
    yields: 'Test list + cert fields',
  },
];

/**
 * Two fixed anchors (the two highest-value daily jobs — pass/fail and EICR
 * coding) plus two that rotate, so returning users keep discovering breadth.
 *
 * Rotation is by DAY, not `Math.random()`. Random meant the two rotating cards
 * changed on every mount: navigate away, come back, and the screen you were
 * reading is gone. Keyed on day-of-year it is stable for as long as you are
 * using it and different tomorrow, which is the actual intent.
 */
function pickExamples(): ExampleQuery[] {
  const anchors = EXAMPLE_POOL.slice(0, 2);
  const rest = EXAMPLE_POOL.slice(2);
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  const first = dayOfYear % rest.length;
  const second = (dayOfYear + 1) % rest.length;
  return [...anchors, rest[first], rest[second]];
}

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
    <div className="mx-auto w-full max-w-[1400px] px-1 py-6 sm:px-4 sm:py-8 lg:px-8">
      {/* One line, not a hero. What is worth saying here is the thing that
          separates this from a generic chatbot — the citations are checked —
          and that fits in a sentence. */}
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl text-[13.5px] leading-relaxed text-white sm:text-[14px]"
      >
        Ask anything on <span className="font-semibold">BS 7671:2018+A4:2026</span> — regs,
        calculations, test procedures. Every answer is cited to the exact regulation, and every
        citation is checked against the standard before you see it.
      </motion.p>

      {/* Pick up where you left off — only when there is something to resume */}
      {resumable.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-7"
        >
          <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
            Pick up where you left off
          </h2>
          <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            {resumable.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onResumeSession?.(s.id)}
                className={cn(
                  'group flex min-w-0 flex-1 flex-row items-center gap-3.5 rounded-2xl border px-5 py-4 text-left',
                  'border-elec-yellow/35',
                  CARD_SURFACE,
                  'transition-[background-image,border-color,transform] duration-150 ease-out',
                  'hover:border-elec-yellow/60 active:scale-[0.99] touch-manipulation',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
                )}
              >
                <Clock className="h-[18px] w-[18px] shrink-0 text-elec-yellow" aria-hidden />
                <span className="min-w-0 flex-1 truncate text-[14.5px] font-medium text-white">
                  {s.title || 'Previous conversation'}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.14 }}
        className="mt-8 text-[15px] font-semibold tracking-tight text-elec-yellow"
      >
        Try asking
      </motion.h2>

      {/* Two-up on phones, matching every other card grid in the app. These
          were one column of 150–168px cards, so four examples ran to most of a
          screen on their own. */}
      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
        {examples.map((item, idx) => (
          <motion.button
            key={item.query}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.18 + idx * 0.05 }}
            onClick={() => onSelectQuery(item.query)}
            className={cn(
              CARD_BASE,
              CARD_NEUTRAL,
              'relative min-h-[170px] overflow-hidden p-5 sm:p-6 lg:hover:-translate-y-0.5'
            )}
          >
            {/* Same volt hairline the hub cards carry, so a card here reads as
                the same object as a card there. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
            />

            <span className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                {item.category}
              </span>
              <span className="shrink-0 text-[13px] font-semibold text-elec-yellow transition-transform group-hover:translate-x-0.5">
                Ask →
              </span>
            </span>

            <span className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-elec-yellow sm:text-[18px]">
              {item.query}
            </span>

            {/* What you get back. Sets the expectation of a figure + a citation
                rather than an essay — and it's the honest differentiator against
                asking a generic chatbot the same question. */}
            <span className="flex-grow" />
            {/* A rule, then the payoff. At this card width the question is one
                or two lines and the rest was dead space; the divider gives the
                "what you get back" line somewhere to sit instead of floating
                at the bottom of a hole. */}
            <span className="mt-5 border-t border-white/[0.10] pt-3 text-[12.5px] font-medium text-white">
              {item.yields}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;
