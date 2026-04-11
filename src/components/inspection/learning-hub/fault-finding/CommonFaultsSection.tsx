import { useState } from 'react';
import { ArrowLeft, Zap, Shield, Flame, AlertTriangle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import ShortCircuitPage from './faults/ShortCircuitPage';
import EarthFaultPage from './faults/EarthFaultPage';
import OverloadPage from './faults/OverloadPage';
import OpenCircuitPage from './faults/OpenCircuitPage';
import InsulationBreakdownPage from './faults/InsulationBreakdownPage';
import SupplyQualityPage from './faults/SupplyQualityPage';

type View = 'hub' | 'short' | 'earth' | 'overload' | 'open' | 'insulation' | 'supply';

interface Props { onBack: () => void }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

const CommonFaultsSection = ({ onBack }: Props) => {
  const [view, setView] = useState<View>('hub');

  if (view === 'short') return <ShortCircuitPage onBack={() => setView('hub')} />;
  if (view === 'earth') return <EarthFaultPage onBack={() => setView('hub')} />;
  if (view === 'overload') return <OverloadPage onBack={() => setView('hub')} />;
  if (view === 'open') return <OpenCircuitPage onBack={() => setView('hub')} />;
  if (view === 'insulation') return <InsulationBreakdownPage onBack={() => setView('hub')} />;
  if (view === 'supply') return <SupplyQualityPage onBack={() => setView('hub')} />;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Common Faults</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Every electrical fault falls into one of these six categories. Understanding each type — how it behaves electrically, what symptoms it produces, and which test reveals it — is the foundation of effective fault finding.
            </p>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard title="Short Circuit" description="Dead shorts, instant trips" icon={Zap} onClick={() => setView('short')} variant="hero" />
            <BusinessCard title="Earth Faults" description="Leakage, RCD tripping" icon={Shield} onClick={() => setView('earth')} variant="hero" />
            <BusinessCard title="Overload" description="Thermal trips, overheating" icon={Flame} onClick={() => setView('overload')} variant="hero" />
            <BusinessCard title="Open Circuit" description="Breaks, no power" icon={AlertTriangle} onClick={() => setView('open')} variant="hero" />
            <BusinessCard title="Insulation Breakdown" description="Degradation, trending" icon={Activity} onClick={() => setView('insulation')} variant="hero" />
            <BusinessCard title="Supply Quality" description="Voltage, harmonics" icon={Zap} onClick={() => setView('supply')} variant="hero" />
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default CommonFaultsSection;
