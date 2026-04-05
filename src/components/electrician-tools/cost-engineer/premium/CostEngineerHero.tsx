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
  hasConfiguredSettings,
}: CostEngineerHeroProps) {
  const labourRate = businessSettings?.labourRates?.electrician || 50;
  const targetMargin = businessSettings?.profitTargets?.target || 25;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="relative overflow-hidden glass-premium rounded-2xl glow-yellow"
    >
      {/* Gradient top accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
      {/* Blur orb */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 p-5">
        {/* Title row */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
            <Calculator className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-white tracking-tight">AI Cost Engineer</h1>
            <p className="text-sm text-white">UK trade pricing database</p>
          </div>
        </div>

        {/* Stats + Settings row */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow/60" />
              <span className="text-white">Labour:</span>
              <span className="text-white font-medium">£{labourRate}/hr</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow/60" />
              <span className="text-white">Target:</span>
              <span className="text-white font-medium">{targetMargin}%</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenSettings}
            className="h-8 px-2.5 border border-white/[0.10] bg-white/[0.05] hover:bg-white/[0.10] text-white hover:text-white rounded-lg text-xs"
          >
            <Settings className="h-3.5 w-3.5 mr-1" />
            Settings
            {hasConfiguredSettings && <Check className="h-3 w-3 ml-1 text-emerald-400" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
