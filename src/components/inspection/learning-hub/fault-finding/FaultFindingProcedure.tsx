import { useState } from 'react';
import { ArrowLeft, Shield, Wrench, BookOpen, FileText, Search, AlertTriangle, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import MethodologySection from './MethodologySection';
import CommonFaultsSection from './CommonFaultsSection';
import DiagnosticsSection from './DiagnosticsSection';
import RealWorldCasesSection from './RealWorldCasesSection';
import SafetySection from './SafetySection';
import EquipmentSection from './EquipmentSection';
import TroubleshootingSection from './TroubleshootingSection';
import FaultFindingRegulations from './FaultFindingRegulations';

type View = 'hub' | 'methodology' | 'common' | 'diagnostics' | 'cases' | 'safety' | 'equipment' | 'troubleshooting' | 'regulations';

interface Props { onBack: () => void }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

const FaultFindingProcedure = ({ onBack }: Props) => {
  const [view, setView] = useState<View>('hub');

  if (view === 'methodology') return <MethodologySection onBack={() => setView('hub')} />;
  if (view === 'common') return <CommonFaultsSection onBack={() => setView('hub')} />;
  if (view === 'diagnostics') return <DiagnosticsSection onBack={() => setView('hub')} />;
  if (view === 'cases') return <RealWorldCasesSection onBack={() => setView('hub')} />;
  if (view === 'safety') return <SafetySection onBack={() => setView('hub')} />;
  if (view === 'equipment') return <EquipmentSection onBack={() => setView('hub')} />;
  if (view === 'troubleshooting') return <TroubleshootingSection onBack={() => setView('hub')} />;
  if (view === 'regulations') return <FaultFindingRegulations onBack={() => setView('hub')} />;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Fault Finding</h1>
              <p className="text-[10px] text-white">Diagnostic Procedures</p>
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
                <p className="text-[13px] font-semibold text-red-400">Always Isolate Before Fault Diagnosis</p>
                <p className="text-[12px] text-white mt-1">
                  Safe isolation is the first step in every fault finding procedure. Never assume a faulty circuit is dead — prove it every time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard title="Methodology" description="The 8-step process" icon={Target} onClick={() => setView('methodology')} variant="hero" />
            <BusinessCard title="Common Faults" description="6 fault types explained" icon={Zap} onClick={() => setView('common')} variant="hero" />
            <BusinessCard title="Troubleshooting" description="Symptom → diagnosis → fix" icon={Search} onClick={() => setView('troubleshooting')} variant="hero" />
            <BusinessCard title="Diagnostics" description="Test-based diagnosis" icon={Wrench} onClick={() => setView('diagnostics')} variant="hero" />
            <BusinessCard title="Real-World Cases" description="Practical examples" icon={BookOpen} onClick={() => setView('cases')} variant="hero" />
            <BusinessCard title="Equipment" description="Instruments & tools" icon={Wrench} onClick={() => setView('equipment')} variant="hero" />
            <BusinessCard title="Safety" description="Protocols & PPE" icon={Shield} onClick={() => setView('safety')} variant="hero" />
            <BusinessCard title="Regulations" description="BS 7671 & EAW" icon={FileText} onClick={() => setView('regulations')} variant="hero" />
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default FaultFindingProcedure;
