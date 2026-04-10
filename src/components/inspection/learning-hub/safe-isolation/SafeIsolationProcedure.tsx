import { useState } from 'react';
import { ArrowLeft, Shield, Wrench, BookOpen, FileText, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import WhyIsolateSection from './WhyIsolateSection';
import HowToIsolateSection from './HowToIsolateSection';
import PracticalGuidanceSection from './PracticalGuidanceSection';
import SafeIsolationRegulations from './SafeIsolationRegulations';
import SafeIsolationChecklists from './SafeIsolationChecklists';

type View = 'hub' | 'why' | 'how' | 'practical' | 'regulations' | 'checklists';

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

const SafeIsolationProcedure = ({ onBack }: Props) => {
  const [view, setView] = useState<View>('hub');

  if (view === 'why') return <WhyIsolateSection onBack={() => setView('hub')} />;
  if (view === 'how') return <HowToIsolateSection onBack={() => setView('hub')} />;
  if (view === 'practical') return <PracticalGuidanceSection onBack={() => setView('hub')} />;
  if (view === 'regulations') return <SafeIsolationRegulations onBack={() => setView('hub')} />;
  if (view === 'checklists') return <SafeIsolationChecklists onBack={() => setView('hub')} />;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Safe Isolation</h1>
              <p className="text-[10px] text-white">BS 7671 Reg 132.15 & GS38</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.03] border border-red-400/20 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400/60 rounded-l-2xl" />
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-red-400">The Most Critical Procedure in Electrical Work</p>
                <p className="text-[12px] text-white mt-1">
                  Safe isolation must be carried out before ANY work on electrical circuits. Failure to isolate correctly is the leading cause of fatal electrical accidents. Never assume a circuit is dead — always prove it.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Why Isolate?"
              description="Life safety & law"
              icon={Shield}
              onClick={() => setView('why')}
              variant="hero"
            />
            <BusinessCard
              title="How to Isolate"
              description="The 6-step procedure"
              icon={Lock}
              onClick={() => setView('how')}
              variant="hero"
            />
            <BusinessCard
              title="Practical Guide"
              description="Scenarios & tips"
              icon={BookOpen}
              onClick={() => setView('practical')}
              variant="hero"
            />
            <BusinessCard
              title="Checklists"
              description="Pre-work & equipment"
              icon={Wrench}
              onClick={() => setView('checklists')}
              variant="hero"
            />
            <BusinessCard
              title="Regulations"
              description="BS 7671 & GS38"
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

export default SafeIsolationProcedure;
