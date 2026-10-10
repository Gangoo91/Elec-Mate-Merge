import { Trophy } from 'lucide-react';
import type { FlashcardAchievementDef } from '@/data/flashcardAchievements';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementUnlockToastProps {
  achievements: FlashcardAchievementDef[];
}

const AchievementUnlockToast = ({ achievements }: AchievementUnlockToastProps) => {
  if (achievements.length === 0) return null;

  return (
    <AnimatePresence>
      <div
        role="status"
        className="pointer-events-none fixed left-1/2 top-[calc(env(safe-area-inset-top)+76px)] z-[200] flex -translate-x-1/2 flex-col gap-2"
      >
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ y: -60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
            /*
             * Solid volt, not a `/[0.04]` wash.
             *
             * A translucent yellow over near-black mixes into sludge, which is
             * the wrong reward for unlocking something. Black-on-volt is the
             * house treatment for "this is the good news" and it reads at a
             * glance on a phone in daylight.
             */
            // Same card as the Study Centre's "Award unlocked" toast, so every
            // award in the app looks like one family.
            className="flex w-[340px] max-w-[92vw] items-center gap-3 rounded-2xl border border-elec-yellow bg-[#1c1c1c] px-4 py-3 shadow-2xl"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-elec-yellow">
              <Trophy className="h-5 w-5 text-black" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[12.5px] font-semibold text-white">Deck achievement</span>
              <span className="mt-0.5 block text-[17px] font-bold leading-tight text-white">
                {a.title}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default AchievementUnlockToast;
