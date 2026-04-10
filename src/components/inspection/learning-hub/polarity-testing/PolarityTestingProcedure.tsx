import { useState } from 'react';
import { ArrowLeft, Shield, Wrench, BookOpen, FileText, ListChecks, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import WhyTestSection from './WhyTestSection';
import HowToTestSection from './HowToTestSection';
import PracticalGuidanceSection from './PracticalGuidanceSection';
import PolarityRegulationsCard from './PolarityRegulationsCard';
import PolarityChecklistsSection from './PolarityChecklistsSection';
import PolarityPracticeSection from './PolarityPracticeSection';

type View = 'hub' | 'why' | 'how' | 'practical' | 'regulations' | 'checklists' | 'practice';

interface PolarityTestingProcedureProps {
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

const PolarityTestingProcedure = ({ onBack }: PolarityTestingProcedureProps) => {
  const [view, setView] = useState<View>('hub');

  if (view === 'why') return <WhyTestSection onBack={() => setView('hub')} />;
  if (view === 'how') return <HowToTestSection onBack={() => setView('hub')} />;
  if (view === 'practical') return <PracticalGuidanceSection onBack={() => setView('hub')} />;
  if (view === 'regulations') return <PolarityRegulationsCard onBack={() => setView('hub')} />;
  if (view === 'checklists') return <PolarityChecklistsSection onBack={() => setView('hub')} />;
  if (view === 'practice') return <PolarityPracticeSection onBack={() => setView('hub')} />;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Polarity Testing</h1>
              <p className="text-[10px] text-white">BS 7671 Regulation 612.6</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.03] border border-orange-400/20 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400/60 rounded-l-2xl" />
            <p className="text-[13px] font-semibold text-orange-400">Safety Critical Testing</p>
            <p className="text-[12px] text-white mt-1">
              Incorrect polarity can make normally safe parts live, causing electric shock. Single-pole devices must always interrupt the line conductor only.
            </p>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Why Test?"
              description="Hazards & consequences"
              icon={Shield}
              onClick={() => setView('why')}
              variant="hero"
            />
            <BusinessCard
              title="How to Test"
              description="Dead & live methods"
              icon={Wrench}
              onClick={() => setView('how')}
              variant="hero"
            />
            <BusinessCard
              title="What to Check"
              description="Sockets, lighting, isolators"
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
            <BusinessCard
              title="Checklists"
              description="Pre-test & per-accessory"
              icon={ListChecks}
              onClick={() => setView('checklists')}
              variant="hero"
            />
            <BusinessCard
              title="Practice"
              description="Record test results"
              icon={TestTube}
              onClick={() => setView('practice')}
              variant="hero"
            />
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PolarityTestingProcedure;
