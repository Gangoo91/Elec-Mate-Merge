import { Trophy } from 'lucide-react';
import { TIER_CONFIG } from '@/data/flashcardAchievements';
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
        {achievements.map((a, i) => {
          const config = TIER_CONFIG[a.tier];
          return (
            <motion.div
              key={a.id}
              initial={{ y: -60, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -60, opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl
                ${config.bgColour} ${config.borderColour}
                backdrop-blur-md
              `}
            >
              <div className={`p-1.5 rounded-lg ${config.bgColour}`}>
                <Trophy className={`h-5 w-5 ${config.colour}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Achievement Unlocked!</p>
                <p className={`text-sm font-semibold ${config.colour}`}>{a.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
};

export default AchievementUnlockToast;
