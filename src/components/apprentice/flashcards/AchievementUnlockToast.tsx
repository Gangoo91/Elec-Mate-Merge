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
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 pointer-events-none">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ y: -60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.04] backdrop-blur-md shadow-xl"
          >
            <Trophy className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Achievement unlocked
              </p>
              <p className="text-[14px] font-medium text-white">{a.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default AchievementUnlockToast;
