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
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface CertDef {
  id: string;
  title: string;
  description: string;
  standard: string;
  accentColor: string;
  comingSoon?: boolean;
  category: 'electrical' | 'fire-safety' | 'security' | 'renewables';
}

const specialistCerts: CertDef[] = [
  // Electrical
  {
    id: 'ev-charging',
    title: 'EV Charging',
    description: 'Charge point installation',
    standard: 'IET CoP',
    accentColor: 'from-emerald-500 via-teal-400 to-cyan-400',
    category: 'electrical',
  },
  {
    id: 'pat-testing',
    title: 'PAT Testing',
    description: 'Portable appliance testing',
    standard: 'IET CoP',
    accentColor: 'from-cyan-500 via-cyan-400 to-blue-400',
    category: 'electrical',
  },
  // Renewables & Energy
  {
    id: 'solar-pv',
    title: 'Solar PV',
    description: 'Photovoltaic systems',
    standard: 'MCS',
    accentColor: 'from-yellow-500 via-amber-400 to-orange-400',
    category: 'renewables',
  },
  {
    id: 'bess',
    title: 'Battery Storage',
    description: 'BESS commissioning',
    standard: 'IET CoP',
    accentColor: 'from-green-500 via-emerald-400 to-teal-400',
    category: 'renewables',
  },
  {
    id: 'g98-commissioning',
    title: 'G98 Commissioning',
    description: 'PV up to 16A/phase — DNO form',
    standard: 'EREC G98',
    accentColor: 'from-orange-500 via-amber-400 to-yellow-400',
    category: 'renewables',
  },
  {
    id: 'g99-commissioning',
    title: 'G99 Commissioning',
    description: 'Commercial PV/EV >16A/phase',
    standard: 'EREC G99',
    accentColor: 'from-orange-500 via-red-400 to-rose-400',
    category: 'renewables',
  },
  // Fire Alarm Suite (BS 5839-1:2025)
  {
    id: 'fire-alarm-design',
    title: 'FA Design (G1)',
    description: 'System design certificate',
    standard: 'BS 5839-1',
    accentColor: 'from-red-500 via-rose-400 to-pink-400',
    category: 'fire-safety',
  },
  {
    id: 'fire-alarm',
    title: 'FA Install (G2)',
    description: 'Installation certificate',
    standard: 'BS 5839-1',
    accentColor: 'from-red-500 via-rose-400 to-pink-400',
    category: 'fire-safety',
  },
  {
    id: 'fire-alarm-commissioning',
    title: 'FA Commission (G3)',
    description: 'Commissioning certificate',
    standard: 'BS 5839-1',
    accentColor: 'from-red-500 via-red-400 to-orange-400',
    category: 'fire-safety',
  },
  {
    id: 'fire-alarm-inspection',
    title: 'FA Inspection (G6)',
    description: 'Periodic test & service',
    standard: 'BS 5839-1',
    accentColor: 'from-rose-500 via-pink-400 to-red-400',
    category: 'fire-safety',
  },
  {
    id: 'fire-alarm-modification',
    title: 'FA Modification (G7)',
    description: 'Extension & alteration',
    standard: 'BS 5839-1',
    accentColor: 'from-pink-500 via-rose-400 to-red-400',
    category: 'fire-safety',
  },
  {
    id: 'emergency-lighting',
    title: 'Emergency Lighting',
    description: 'Safety illumination systems',
    standard: 'BS 5266',
    accentColor: 'from-amber-500 via-amber-400 to-yellow-400',
    category: 'fire-safety',
  },
  {
    id: 'smoke-co-alarm',
    title: 'Smoke & CO Alarm',
    description: 'Domestic alarm installation',
    standard: 'BS 5839-6',
    accentColor: 'from-red-500 via-orange-400 to-amber-400',
    category: 'fire-safety',
  },
  {
    id: 'lightning-protection',
    title: 'Lightning Protection',
    description: 'LPS test certificate',
    standard: 'BS EN 62305',
    accentColor: 'from-yellow-500 via-yellow-400 to-amber-400',
    category: 'fire-safety',
  },
];

interface SpecialistSectionProps {
  onBack: () => void;
}

const SpecialistSection = ({ onBack }: SpecialistSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
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
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <Zap className="h-4 w-4 text-elec-yellow" />
              </div>
              <h1 className="text-base font-semibold text-white">Specialist Certificates</h1>
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
        {[
          { key: 'electrical', label: 'Electrical' },
          { key: 'renewables', label: 'Renewables & Energy' },
          { key: 'fire-safety', label: 'Fire & Life Safety' },
        ].map((group) => {
          const certs = specialistCerts.filter((c) => c.category === group.key);
          if (certs.length === 0) return null;
          return (
            <motion.section key={group.key} variants={itemVariants} className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
                {group.label}
              </h2>
              <div className="grid grid-cols-2 gap-3 auto-rows-fr">
                {certs.map((cert) => (
                  <motion.div key={cert.id} variants={itemVariants} className="h-full">
                    <button
                      type="button"
                      onClick={() =>
                        !cert.comingSoon &&
                        navigate(`/electrician/inspection-testing/${cert.id}/new`)
                      }
                      className={cn(
                        'block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation',
                        cert.comingSoon && 'cursor-default'
                      )}
                    >
                      <div
                        className={cn(
                          'group relative overflow-hidden h-full',
                          'card-surface-interactive',
                          'active:scale-[0.98] transition-all duration-200',
                          cert.comingSoon && 'opacity-60'
                        )}
                      >
                        <div
                          className={cn(
                            'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity duration-200',
                            cert.accentColor
                          )}
                        />
                        <div className="relative z-10 flex flex-col h-full p-4">
                          <div className="flex items-center justify-end mb-3">
                            <span className="text-[10px] font-bold text-white bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded">
                              {cert.standard}
                            </span>
                          </div>
                          <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
                            {cert.title}
                          </h3>
                          <p className="mt-1 text-[12px] text-white leading-tight">
                            {cert.description}
                          </p>
                          <div className="flex-grow min-h-[12px]" />
                          <div className="flex items-center justify-between">
                            {cert.comingSoon ? (
                              <span className="text-[11px] font-medium text-white">
                                Coming Soon
                              </span>
                            ) : (
                              <span className="text-[11px] font-medium text-elec-yellow">Open</span>
                            )}
                            {!cert.comingSoon && (
                              <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                                <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </motion.main>
    </div>
  );
};

export default SpecialistSection;
