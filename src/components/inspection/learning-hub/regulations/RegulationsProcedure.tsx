import { useState } from 'react';
import { ArrowLeft, BookOpen, Search, FileText, Zap, HelpCircle, ClipboardList, AlertTriangle, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import BS7671StructurePage from './BS7671StructurePage';
import A3ChangesPage from './A3ChangesPage';
import RegulationLookupPage from './RegulationLookupPage';
import QuickLinksPage from './QuickLinksPage';
import CommonScenariosPage from './CommonScenariosPage';
import EICRCodingPage from './EICRCodingPage';
import ComplianceChecklistsPage from './ComplianceChecklistsPage';
import SpecialLocationsPage from './SpecialLocationsPage';
import InspectionIntervalsPage from './InspectionIntervalsPage';

type View = 'hub' | 'structure' | 'a3changes' | 'lookup' | 'quicklinks' | 'scenarios' | 'eicr' | 'checklists' | 'locations' | 'intervals';

interface Props { onBack: () => void }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

const RegulationsProcedure = ({ onBack }: Props) => {
  const [view, setView] = useState<View>('hub');

  if (view === 'structure') return <BS7671StructurePage onBack={() => setView('hub')} />;
  if (view === 'a3changes') return <A3ChangesPage onBack={() => setView('hub')} />;
  if (view === 'lookup') return <RegulationLookupPage onBack={() => setView('hub')} />;
  if (view === 'quicklinks') return <QuickLinksPage onBack={() => setView('hub')} />;
  if (view === 'scenarios') return <CommonScenariosPage onBack={() => setView('hub')} />;
  if (view === 'eicr') return <EICRCodingPage onBack={() => setView('hub')} />;
  if (view === 'checklists') return <ComplianceChecklistsPage onBack={() => setView('hub')} />;
  if (view === 'locations') return <SpecialLocationsPage onBack={() => setView('hub')} />;
  if (view === 'intervals') return <InspectionIntervalsPage onBack={() => setView('hub')} />;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Regulations</h1>
              <p className="text-[10px] text-white">BS 7671:2018+A3:2024</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.03] border border-yellow-400/20 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400/60 rounded-l-2xl" />
            <p className="text-[13px] font-semibold text-yellow-400">Current Edition: BS 7671:2018+A3:2024</p>
            <p className="text-[12px] text-white mt-1">
              Amendment 3 came into effect on 2 April 2024. All new work must comply. A4 is expected in due course — we will update the app when it is published.
            </p>
          </div>
        </motion.div>

        {/* Most useful first */}
        <motion.section variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Most Used</p>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard title="Common Questions" description="20 plain-English answers" icon={HelpCircle} onClick={() => setView('scenarios')} variant="hero" />
            <BusinessCard title="EICR Coding" description="C1, C2, C3, FI guide" icon={AlertTriangle} onClick={() => setView('eicr')} variant="hero" />
            <BusinessCard title="Compliance Checklists" description="5 job types" icon={ClipboardList} onClick={() => setView('checklists')} variant="hero" />
            <BusinessCard title="Regulation Lookup" description="Search 50+ key regs" icon={Search} onClick={() => setView('lookup')} variant="hero" />
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Practical Reference</p>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard title="Special Locations" description="Bathrooms, EV, pools" icon={MapPin} onClick={() => setView('locations')} variant="hero" />
            <BusinessCard title="Inspection Intervals" description="16 premises types" icon={Clock} onClick={() => setView('intervals')} variant="hero" />
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Reference</p>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard title="A3:2024 Changes" description="What changed &amp; why" icon={Zap} onClick={() => setView('a3changes')} variant="hero" />
            <BusinessCard title="BS 7671 Structure" description="Parts 1-8 overview" icon={BookOpen} onClick={() => setView('structure')} variant="hero" />
          </div>
        </motion.section>

        <motion.div variants={itemVariants}>
          <BusinessCard title="Regs by Test Type" description="Which regulations apply to each test in the I&amp;T Hub" icon={FileText} onClick={() => setView('quicklinks')} variant="standard" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegulationsProcedure;
