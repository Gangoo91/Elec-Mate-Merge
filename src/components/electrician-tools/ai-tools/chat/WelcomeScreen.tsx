import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toneText, toneAccent, type Tone } from '@/components/college/primitives';

interface WelcomeScreenProps {
  onSelectQuery: (query: string) => void;
}

interface ExampleQuery {
  number: string;
  category: string;
  tone: Tone;
  query: string;
}

const exampleQueries: ExampleQuery[] = [
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
];

export function WelcomeScreen({ onSelectQuery }: WelcomeScreenProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-1 sm:px-4 lg:px-6 py-10 sm:py-14">
      {/* Hero — editorial, text-led, no tile. Internal cap on text width so
          long-line readability stays good even when the outer column widens. */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative"
      >
        {/* Subtle top hairline accent */}
        <div className="absolute inset-x-0 -top-2 h-px bg-gradient-to-r from-transparent via-elec-yellow/60 to-transparent opacity-70" />

        <div className="pt-4 max-w-3xl">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
            BS 7671 A4:2026 · ASSISTANT
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
            Every reg. Every table. On tap.
          </h1>
          <p className="mt-4 max-w-2xl text-[13px] sm:text-sm text-white leading-relaxed">
            Ask anything about BS 7671 A4:2026 — regulations, calculations, test procedures,
            installation practice. Every answer is cited back to the exact regulation.
          </p>
        </div>
      </motion.div>

      {/* Prompt eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="mt-10 sm:mt-12 text-[10px] font-medium uppercase tracking-[0.22em] text-white"
      >
        Try asking
      </motion.div>

      {/* Editorial cards — 1 col on mobile, 2 on tablet, 2 wide on desktop with
          extra breathing room. Lets each card feel substantial on a 1440 px+
          screen instead of being squashed in the centre. */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
        {exampleQueries.map((item, idx) => (
          <motion.button
            key={item.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.22 + idx * 0.06 }}
            onClick={() => onSelectQuery(item.query)}
            className={cn(
              'group relative overflow-hidden text-left',
              'bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)]',
              'border border-white/[0.06] rounded-2xl',
              'p-5 sm:p-6 lg:p-7 lg:min-h-[180px]',
              'transition-colors touch-manipulation',
              'active:scale-[0.995]'
            )}
          >
            {/* Top hairline accent in tone */}
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
