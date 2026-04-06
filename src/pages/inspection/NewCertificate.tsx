import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

interface CertDef {
  id: string;
  title: string;
  description: string;
  standard: string;
  accentColor: string;
}

const coreCerts: CertDef[] = [
  { id: 'eicr', title: 'EICR', description: 'Periodic inspection & testing of existing installations', standard: 'BS 7671', accentColor: 'from-blue-500 via-blue-400 to-cyan-400' },
  { id: 'eic', title: 'EIC', description: 'New installations, major alterations & additions', standard: 'BS 7671', accentColor: 'from-emerald-500 via-emerald-400 to-green-400' },
  { id: 'minor-works', title: 'Minor Works', description: 'Small additions to existing circuits', standard: 'BS 7671', accentColor: 'from-orange-500 via-amber-400 to-yellow-400' },
];

const fireSafety: CertDef[] = [
  { id: 'fire-alarm', title: 'Fire Alarm', description: 'Detection & warning system certification', standard: 'BS 5839', accentColor: 'from-red-500 via-rose-400 to-pink-400' },
  { id: 'emergency-lighting', title: 'Emergency Lighting', description: 'Safety illumination certification', standard: 'BS 5266', accentColor: 'from-amber-500 via-amber-400 to-yellow-400' },
];

const specialistCerts: CertDef[] = [
  { id: 'ev-charging', title: 'EV Charging', description: 'Charge point installation certification', standard: 'IET CoP', accentColor: 'from-emerald-500 via-teal-400 to-cyan-400' },
  { id: 'solar-pv', title: 'Solar PV', description: 'Photovoltaic system certification', standard: 'MCS', accentColor: 'from-yellow-500 via-amber-400 to-orange-400' },
  { id: 'pat-testing', title: 'PAT Testing', description: 'Portable appliance testing', standard: 'IET CoP', accentColor: 'from-cyan-500 via-cyan-400 to-blue-400' },
];

const CertCard = ({ cert, onClick }: { cert: CertDef; onClick: () => void }) => (
  <motion.div variants={itemVariants} className="h-full">
    <button
      onClick={onClick}
      className="block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
    >
      <div className="group relative overflow-hidden h-full card-surface-interactive active:scale-[0.98] transition-all duration-200">
        <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity duration-200', cert.accentColor)} />
        <div className="relative z-10 flex flex-col h-full p-4">
          <div className="flex items-center justify-end mb-3">
            <span className="text-[10px] font-bold text-white bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded">{cert.standard}</span>
          </div>
          <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">{cert.title}</h3>
          <p className="mt-1 text-[12px] text-white leading-tight line-clamp-2">{cert.description}</p>
          <div className="flex-grow min-h-[12px]" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-elec-yellow">Create</span>
            <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </button>
  </motion.div>
);

export default function NewCertificate() {
  const navigate = useNavigate();

  const handleClick = (cert: CertDef) => {
    // Core certs use section-based routing
    if (['eicr', 'eic', 'minor-works'].includes(cert.id)) {
      navigate(`/electrician/inspection-testing?section=${cert.id}`);
    } else {
      navigate(`/electrician/inspection-testing/${cert.id}/new`);
    }
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician/inspection-testing')}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <Zap className="h-4 w-4 text-elec-yellow" />
              </div>
              <h1 className="text-base font-semibold text-white">New Certificate</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-5"
      >
        {/* Core Certificates */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Electrical Installation
          </h2>
          <div className="grid grid-cols-2 gap-3 auto-rows-fr">
            {coreCerts.map((cert) => (
              <CertCard key={cert.id} cert={cert} onClick={() => handleClick(cert)} />
            ))}
          </div>
        </motion.section>

        {/* Fire & Safety */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Fire & Safety Systems
          </h2>
          <div className="grid grid-cols-2 gap-3 auto-rows-fr">
            {fireSafety.map((cert) => (
              <CertCard key={cert.id} cert={cert} onClick={() => handleClick(cert)} />
            ))}
          </div>
        </motion.section>

        {/* Specialist */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Specialist Certificates
          </h2>
          <div className="grid grid-cols-2 gap-3 auto-rows-fr">
            {specialistCerts.map((cert) => (
              <CertCard key={cert.id} cert={cert} onClick={() => handleClick(cert)} />
            ))}
          </div>
        </motion.section>

        {/* Tips */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
          <p className="text-xs text-white leading-relaxed">
            All certificates auto-save as drafts. Your inspector profile pre-fills details automatically. Generate PDFs and create quotes directly from completed certificates.
          </p>
        </motion.div>
      </motion.main>
    </div>
  );
}
