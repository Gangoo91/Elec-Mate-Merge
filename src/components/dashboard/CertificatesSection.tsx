import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface CertDef {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  standard: string;
  accentColor: string;
}

const coreCerts: CertDef[] = [
  {
    id: 'eicr',
    title: 'EICR',
    subtitle: 'Electrical Installation Condition Report',
    description: 'Periodic inspection & testing of existing installations',
    standard: 'BS 7671:2018+A3:2024',
    accentColor: 'from-blue-500 via-blue-400 to-cyan-400',
  },
  {
    id: 'eic',
    title: 'EIC',
    subtitle: 'Electrical Installation Certificate',
    description: 'New installations, rewires & consumer unit changes',
    standard: 'BS 7671:2018+A3:2024',
    accentColor: 'from-emerald-500 via-emerald-400 to-green-400',
  },
  {
    id: 'minor-works',
    title: 'Minor Works',
    subtitle: 'Minor Electrical Installation Works Certificate',
    description: 'Additions, alterations & circuit modifications',
    standard: 'BS 7671:2018+A3:2024',
    accentColor: 'from-orange-500 via-amber-400 to-yellow-400',
  },
];

interface CertificatesSectionProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
  onBack: () => void;
}

const CertificatesSection = ({ onNavigate, onBack }: CertificatesSectionProps) => {
  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">EICR, EIC & Minor Works</h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-5 space-y-4"
      >
        {/* Section intro */}
        <motion.div variants={itemVariants} className="mb-2">
          <p className="text-sm text-white/50">Select a certificate type to begin</p>
        </motion.div>

        {/* Cert cards — full width, one per row */}
        {coreCerts.map((cert) => (
          <motion.div key={cert.id} variants={itemVariants}>
            <button
              type="button"
              onClick={() => onNavigate(cert.id)}
              className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
            >
              <div
                className={cn(
                  'group relative overflow-hidden',
                  'card-surface-interactive',
                  'active:scale-[0.98] transition-all duration-200'
                )}
              >
                {/* Gradient accent line */}
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity duration-200',
                    cert.accentColor
                  )}
                />
                <div className="relative z-10 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white leading-tight group-hover:text-elec-yellow transition-colors">
                        {cert.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] font-medium text-white/40 uppercase tracking-wide">
                        {cert.subtitle}
                      </p>
                      <p className="mt-2 text-[13px] text-white/70 leading-snug">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] font-bold text-white/30 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded">
                      {cert.standard}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-elec-yellow">Create</span>
                      <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                        <ChevronRight className="w-4 h-4 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.main>
    </div>
  );
};

export default CertificatesSection;
