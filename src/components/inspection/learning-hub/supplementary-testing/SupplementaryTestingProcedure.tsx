import { useState } from 'react';
import { ArrowLeft, Shield, Wrench, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import EarthElectrodeSection from './EarthElectrodeSection';
import SupplementaryBondingSection from './SupplementaryBondingSection';
import AdditionalTestsSection from './AdditionalTestsSection';

type View = 'hub' | 'electrode' | 'bonding' | 'additional';

interface Props { onBack: () => void }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

const SupplementaryTestingProcedure = ({ onBack }: Props) => {
  const [view, setView] = useState<View>('hub');

  if (view === 'electrode') return <EarthElectrodeSection onBack={() => setView('hub')} />;
  if (view === 'bonding') return <SupplementaryBondingSection onBack={() => setView('hub')} />;
  if (view === 'additional') return <AdditionalTestsSection onBack={() => setView('hub')} />;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Supplementary Tests</h1>
              <p className="text-[10px] text-white">Earth electrodes, bonding & additional</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400/60 rounded-l-2xl" />
            <p className="text-[13px] font-semibold text-yellow-400">Situation-Specific Tests</p>
            <p className="text-[12px] text-white mt-1">
              These tests are not required on every installation. They apply when specific conditions exist — TT earthing systems, bathrooms requiring supplementary bonding, or special locations.
            </p>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-1 gap-3">
            <BusinessCard title="Earth Electrode Testing" description="TT systems, fall-of-potential method, Ra measurement" icon={Shield} onClick={() => setView('electrode')} variant="hero" />
            <BusinessCard title="Supplementary Bonding" description="Bathrooms, kitchens, special locations" icon={Zap} onClick={() => setView('bonding')} variant="hero" />
            <BusinessCard title="Additional Tests" description="Voltage drop, phase sequence, external Ze" icon={Wrench} onClick={() => setView('additional')} variant="hero" />
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default SupplementaryTestingProcedure;
