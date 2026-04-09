import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ListChecks, Zap, Wrench, BookOpen } from 'lucide-react';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import ProcedureTab from './ProcedureTab';
import ProveDeadTab from './ProveDeadTab';
import EquipmentTab from './EquipmentTab';
import ReferenceTab from './ReferenceTab';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

type View = 'hub' | 'procedure' | 'prove-dead' | 'equipment' | 'reference';

interface SafeIsolationCardProps {
  onBack: () => void;
}

const SafeIsolationCard = ({ onBack }: SafeIsolationCardProps) => {
  const [view, setView] = useState<View>('hub');

  if (view === 'procedure') return <ProcedureTab onBack={() => setView('hub')} />;
  if (view === 'prove-dead') return <ProveDeadTab onBack={() => setView('hub')} />;
  if (view === 'equipment') return <EquipmentTab onBack={() => setView('hub')} />;
  if (view === 'reference') return <ReferenceTab onBack={() => setView('hub')} />;

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
              <h1 className="text-base font-semibold text-white">Safe Isolation</h1>
              <p className="text-[10px] text-white">BS 7671 · GN3 · GS38</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.03] border border-red-500/20 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/60 rounded-l-2xl" />
            <p className="text-[13px] font-semibold text-red-400">Safety Critical Procedure</p>
            <p className="text-[12px] text-white mt-1">
              Verified against GN3, GS38, and EAW Regulations 1989. Always isolate before testing.
            </p>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard title="Procedure" description="10 step isolation process" icon={ListChecks}
              onClick={() => setView('procedure')} variant="hero"
              accentColor="from-amber-500 via-yellow-400 to-amber-500" iconColor="text-amber-400" iconBg="bg-amber-500/10 border border-amber-500/20" />
            <BusinessCard title="Prove Dead" description="Prove-test-prove method" icon={Zap}
              onClick={() => setView('prove-dead')} variant="hero"
              accentColor="from-red-500 via-rose-400 to-red-500" iconColor="text-red-400" iconBg="bg-red-500/10 border border-red-500/20" />
            <BusinessCard title="Equipment" description="GS38 specs & checklist" icon={Wrench}
              onClick={() => setView('equipment')} variant="hero"
              accentColor="from-green-500 via-emerald-400 to-green-500" iconColor="text-green-400" iconBg="bg-green-500/10 border border-green-500/20" />
            <BusinessCard title="Reference" description="Regulations & scenarios" icon={BookOpen}
              onClick={() => setView('reference')} variant="hero"
              accentColor="from-blue-500 via-blue-400 to-cyan-500" iconColor="text-blue-400" iconBg="bg-blue-500/10 border border-blue-500/20" />
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default SafeIsolationCard;
