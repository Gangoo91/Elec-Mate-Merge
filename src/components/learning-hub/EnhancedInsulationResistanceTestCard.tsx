import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Wrench, BookOpen, Calculator, ListChecks, FileText } from 'lucide-react';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import WhyTestSection from './insulation-testing/WhyTestSection';
import HowToTestSection from './insulation-testing/HowToTestSection';
import ScienceSection from './insulation-testing/ScienceSection';
import InsulationTablesSection from './insulation-testing/InsulationTablesSection';
import PracticalGuidanceSection from './insulation-testing/PracticalGuidanceSection';
import InsulationRegulationRequirementsCard from './insulation-testing/InsulationRegulationRequirementsCard';

type View = 'hub' | 'why' | 'how' | 'science' | 'tables' | 'practical' | 'regulations';

interface EnhancedInsulationResistanceTestCardProps {
  onBack?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const EnhancedInsulationResistanceTestCard = ({ onBack }: EnhancedInsulationResistanceTestCardProps) => {
  const [view, setView] = useState<View>('hub');

  if (view === 'why') return <WhyTestSection onBack={() => setView('hub')} />;
  if (view === 'how') return <HowToTestSection onBack={() => setView('hub')} />;
  if (view === 'science') return <ScienceSection onBack={() => setView('hub')} />;
  if (view === 'tables') return <InsulationTablesSection onBack={() => setView('hub')} />;
  if (view === 'practical') return <PracticalGuidanceSection onBack={() => setView('hub')} />;
  if (view === 'regulations') return <InsulationRegulationRequirementsCard onBack={() => setView('hub')} />;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            {onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h1 className="text-base font-semibold text-white">Insulation Resistance</h1>
              <p className="text-[10px] text-white">BS 7671 Section 612.3</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.07] border border-amber-500/20 p-4 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-60" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/60 rounded-l-2xl" />
            <p className="text-[15px] font-bold text-amber-400">Equipment Protection Warning</p>
            <p className="text-[12px] text-white mt-1 leading-relaxed">
              Always disconnect sensitive equipment (SPDs, electronics, dimmers, LED drivers) before IR testing.
            </p>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Why Test?"
              description="Safety, fire prevention & compliance"
              icon={Shield}
              onClick={() => setView('why')}
              variant="hero"
              accentColor="from-red-500 via-rose-400 to-red-500"
              iconColor="text-red-400"
              iconBg="bg-red-500/10 border border-red-500/20"
            />
            <BusinessCard
              title="How to Test"
              description="Equipment protection & procedure"
              icon={Wrench}
              onClick={() => setView('how')}
              variant="hero"
              accentColor="from-blue-500 via-blue-400 to-cyan-500"
              iconColor="text-blue-400"
              iconBg="bg-blue-500/10 border border-blue-500/20"
            />
            <BusinessCard
              title="The Science"
              description="Physics of insulation testing"
              icon={BookOpen}
              onClick={() => setView('science')}
              variant="hero"
              accentColor="from-purple-500 via-purple-400 to-violet-500"
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10 border border-purple-500/20"
            />
            <BusinessCard
              title="IR Tables"
              description="BS 7671 values & corrections"
              icon={Calculator}
              onClick={() => setView('tables')}
              variant="hero"
              accentColor="from-emerald-500 via-emerald-400 to-green-500"
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10 border border-emerald-500/20"
            />
            <BusinessCard
              title="Practical Guide"
              description="Techniques & troubleshooting"
              icon={ListChecks}
              onClick={() => setView('practical')}
              variant="hero"
              accentColor="from-amber-500 via-yellow-400 to-amber-500"
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10 border border-amber-500/20"
            />
            <BusinessCard
              title="Regulations"
              description="612.3, 411.3.2 compliance"
              icon={FileText}
              onClick={() => setView('regulations')}
              variant="hero"
              accentColor="from-cyan-500 via-cyan-400 to-teal-500"
              iconColor="text-cyan-400"
              iconBg="bg-cyan-500/10 border border-cyan-500/20"
            />
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default EnhancedInsulationResistanceTestCard;
