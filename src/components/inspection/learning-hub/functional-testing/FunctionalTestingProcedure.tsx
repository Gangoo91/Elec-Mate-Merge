import { useState } from 'react';
import { ArrowLeft, Shield, Wrench, BookOpen, FileText, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import WhyTestSection from './WhyTestSection';
import HowToTestSection from './HowToTestSection';
import WhatToTestSection from './WhatToTestSection';
import PracticalGuidanceSection from './PracticalGuidanceSection';
import FunctionalRegulationsCard from './FunctionalRegulationsCard';

type View = 'hub' | 'why' | 'how' | 'what' | 'practical' | 'regulations';

interface Props {
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const FunctionalTestingProcedure = ({ onBack }: Props) => {
  const [view, setView] = useState<View>('hub');

  if (view === 'why') return <WhyTestSection onBack={() => setView('hub')} />;
  if (view === 'how') return <HowToTestSection onBack={() => setView('hub')} />;
  if (view === 'what') return <WhatToTestSection onBack={() => setView('hub')} />;
  if (view === 'practical') return <PracticalGuidanceSection onBack={() => setView('hub')} />;
  if (view === 'regulations') return <FunctionalRegulationsCard onBack={() => setView('hub')} />;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Functional Testing</h1>
              <p className="text-[10px] text-white">BS 7671 Reg 612.13</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.03] border border-yellow-400/20 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400/60 rounded-l-2xl" />
            <p className="text-[13px] font-semibold text-yellow-400">The Final Test in the Sequence</p>
            <p className="text-[12px] text-white mt-1">
              Functional testing is performed after all dead and live tests are complete. It verifies that switchgear, controls, interlocks and safety systems actually work as intended when operated.
            </p>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Why Test?"
              description="Safety & compliance"
              icon={Shield}
              onClick={() => setView('why')}
              variant="hero"
            />
            <BusinessCard
              title="How to Test"
              description="Procedure & sequence"
              icon={Wrench}
              onClick={() => setView('how')}
              variant="hero"
            />
            <BusinessCard
              title="What to Test"
              description="Switches, controls, RCDs"
              icon={Settings}
              onClick={() => setView('what')}
              variant="hero"
            />
            <BusinessCard
              title="Practical Guide"
              description="By installation type"
              icon={BookOpen}
              onClick={() => setView('practical')}
              variant="hero"
            />
            <BusinessCard
              title="Regulations"
              description="BS 7671 compliance"
              icon={FileText}
              onClick={() => setView('regulations')}
              variant="hero"
            />
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default FunctionalTestingProcedure;
