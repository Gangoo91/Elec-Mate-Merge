/**
 * AchievementUnlockedToast
 *
 * Celebration popup shown when an achievement unlocks.
 * Animated card with rarity glow, icon, title, XP bonus.
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { type AchievementDef, RARITY_COLOURS, RARITY_BG_COLOURS } from '@/data/achievementDefinitions';

interface AchievementUnlockedToastProps {
  achievement: AchievementDef | null;
  onDismiss: () => void;
}

export function AchievementUnlockedToast({ achievement, onDismiss }: AchievementUnlockedToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  const rarityColour = RARITY_COLOURS[achievement.rarity];
  const rarityBg = RARITY_BG_COLOURS[achievement.rarity];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-4 left-4 right-4 z-[200] max-w-md mx-auto"
        >
          <div className="bg-elec-gray/95 backdrop-blur-xl border border-elec-yellow/30 rounded-2xl p-4 shadow-2xl shadow-elec-yellow/10">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`p-2.5 rounded-xl ${rarityBg} flex-shrink-0`}>
                <Trophy className={`h-6 w-6 ${rarityColour}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-elec-yellow/70">
                    Achievement Unlocked
                  </span>
                </div>
                <h4 className="text-white font-semibold text-base truncate">
                  {achievement.title}
                </h4>
                <p className="text-white/60 text-sm mt-0.5">
                  {achievement.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${rarityBg} ${rarityColour} capitalize`}>
                    {achievement.rarity}
                  </span>
                  <span className="text-xs font-semibold text-elec-yellow">
                    +{achievement.xpBonus} XP
                  </span>
                </div>
              </div>

              {/* Dismiss */}
              <button
                onClick={() => {
                  setVisible(false);
                  setTimeout(onDismiss, 300);
                }}
                className="p-1 rounded-lg hover:bg-white/10 touch-manipulation"
              >
                <X className="h-4 w-4 text-white/40" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AchievementUnlockedToast;
