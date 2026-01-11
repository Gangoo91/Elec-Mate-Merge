import { motion } from 'framer-motion';
import { Calculator, Settings, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessSettings } from '../BusinessSettingsDialog';

interface CostEngineerHeroProps {
  businessSettings: BusinessSettings;
  onOpenSettings: () => void;
  hasConfiguredSettings: boolean;
}

export function CostEngineerHero({
  businessSettings,
  onOpenSettings,
  hasConfiguredSettings
}: CostEngineerHeroProps) {
  const labourRate = businessSettings?.labourRates?.electrician || 50;
  const targetMargin = businessSettings?.profitTargets?.target || 25;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Subtle animated gradient orb */}
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 bg-elec-yellow/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero content */}
      <div className="relative z-10 p-5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mb-3"
            >
              <div className="relative inline-flex">
                <div className="p-2.5 rounded-xl bg-elec-yellow/15 border border-elec-yellow/20">
                  <Calculator className="h-6 w-6 text-elec-yellow" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-3 w-3 text-elec-yellow/70" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-white mb-1"
            >
              AI Cost Engineer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/50 text-sm"
            >
              UK trade pricing database
            </motion.p>
          </div>

          {/* Settings button - no animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenSettings}
              className="h-9 px-3 border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
            >
              <Settings className="h-4 w-4 mr-1.5" />
              <span className="text-sm">Settings</span>
              {hasConfiguredSettings && (
                <Check className="h-3 w-3 ml-1.5 text-emerald-400" />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Business settings summary - compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 pt-3 border-t border-white/5"
        >
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow/60" />
              <span className="text-white/40">Labour:</span>
              <span className="text-white/70 font-medium">£{labourRate}/hr</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow/60" />
              <span className="text-white/40">Target:</span>
              <span className="text-white/70 font-medium">{targetMargin}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
