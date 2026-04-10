import { useState } from 'react';
import { ArrowLeft, FileText, FileCheck, Settings, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard } from '@/components/business-hub';
import { motion } from 'framer-motion';
import EICCompletionTab from './certificate-guide/EICCompletionTab';
import EICRCompletionTab from './certificate-guide/EICRCompletionTab';
import MWCCompletionTab from './certificate-guide/MWCCompletionTab';
import PracticalTipsTab from './certificate-guide/PracticalTipsTab';

type View = 'hub' | 'eic' | 'eicr' | 'mwc' | 'tips';

interface Props { onBack: () => void }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

const CertificateGuideProcedure = ({ onBack }: Props) => {
  const [view, setView] = useState<View>('hub');

  const backToHub = () => setView('hub');
  if (view === 'eic') return <div><div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5"><div className="py-2"><div className="flex items-center gap-3 h-11"><Button variant="ghost" size="icon" onClick={backToHub} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button><h1 className="text-base font-semibold text-white">EIC Completion</h1></div></div></div><EICCompletionTab /></div>;
  if (view === 'eicr') return <div><div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5"><div className="py-2"><div className="flex items-center gap-3 h-11"><Button variant="ghost" size="icon" onClick={backToHub} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button><h1 className="text-base font-semibold text-white">EICR Completion</h1></div></div></div><EICRCompletionTab /></div>;
  if (view === 'mwc') return <div><div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5"><div className="py-2"><div className="flex items-center gap-3 h-11"><Button variant="ghost" size="icon" onClick={backToHub} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button><h1 className="text-base font-semibold text-white">Minor Works Certificate</h1></div></div></div><MWCCompletionTab /></div>;
  if (view === 'tips') return <div><div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5"><div className="py-2"><div className="flex items-center gap-3 h-11"><Button variant="ghost" size="icon" onClick={backToHub} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button><h1 className="text-base font-semibold text-white">Practical Tips</h1></div></div></div><PracticalTipsTab /></div>;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Certificates</h1>
              <p className="text-[10px] text-white">BS 7671 compliance guide</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400/60 rounded-l-2xl" />
            <p className="text-[12px] text-white">
              Electrical certificates are legal documents. Falsifying them is a criminal offence. Only complete certificates for work you have personally designed, installed, inspected and tested.
            </p>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard title="EIC" description="New installation cert" icon={FileCheck} onClick={() => setView('eic')} variant="hero" />
            <BusinessCard title="EICR" description="Condition report" icon={FileText} onClick={() => setView('eicr')} variant="hero" />
            <BusinessCard title="Minor Works" description="Small additions" icon={Settings} onClick={() => setView('mwc')} variant="hero" />
            <BusinessCard title="Practical Tips" description="Common mistakes" icon={Lightbulb} onClick={() => setView('tips')} variant="hero" />
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default CertificateGuideProcedure;
