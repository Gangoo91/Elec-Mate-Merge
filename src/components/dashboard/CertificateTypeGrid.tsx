import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Zap,
  Settings,
  BookOpen,
  Bell,
  Lightbulb,
  Sun,
  ChevronRight,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificateTypeGridProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

interface PrimaryCert {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  standard: string;
  useRouter?: boolean;
  borderColor: string;
  iconBg: string;
  iconColor: string;
}

interface SecondaryCert {
  id: string;
  title: string;
  standard: string;
  icon: React.ElementType;
  useRouter: boolean;
  iconColor: string;
}

const primaryCerts: PrimaryCert[] = [
  {
    id: 'eicr',
    title: 'EICR',
    description: 'Periodic inspection & testing',
    icon: FileText,
    standard: 'BS 7671',
    borderColor: 'border-l-blue-400',
    iconBg: 'bg-blue-500/12',
    iconColor: 'text-blue-400',
  },
  {
    id: 'eic',
    title: 'EIC',
    description: 'New installation works',
    icon: Zap,
    standard: 'BS 7671',
    borderColor: 'border-l-green-400',
    iconBg: 'bg-green-500/12',
    iconColor: 'text-green-400',
  },
  {
    id: 'minor-works',
    title: 'Minor Works',
    description: 'Additions & alterations',
    icon: Settings,
    standard: 'BS 7671',
    borderColor: 'border-l-orange-400',
    iconBg: 'bg-orange-500/12',
    iconColor: 'text-orange-400',
  },
];

const secondaryCerts: SecondaryCert[] = [
  {
    id: 'fire-alarm',
    title: 'Fire Alarm',
    standard: 'BS 5839',
    icon: Bell,
    useRouter: true,
    iconColor: 'text-red-400',
  },
  {
    id: 'emergency-lighting',
    title: 'Emergency Lighting',
    standard: 'BS 5266',
    icon: Lightbulb,
    useRouter: true,
    iconColor: 'text-amber-400',
  },
  {
    id: 'ev-charging',
    title: 'EV Charging',
    standard: 'IET CoP',
    icon: Zap,
    useRouter: true,
    iconColor: 'text-emerald-400',
  },
  {
    id: 'solar-pv',
    title: 'Solar PV',
    standard: 'MCS',
    icon: Sun,
    useRouter: true,
    iconColor: 'text-yellow-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
};

const CertificateTypeGrid = ({ onNavigate }: CertificateTypeGridProps) => {
  const navigate = useNavigate();

  const handlePrimaryClick = (cert: PrimaryCert) => {
    if (cert.useRouter) {
      navigate(`/electrician/inspection-testing/${cert.id}/new`);
    } else {
      onNavigate(cert.id);
    }
  };

  const handleSecondaryClick = (cert: SecondaryCert) => {
    navigate(`/electrician/inspection-testing/${cert.id}/new`);
  };

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="show">
      {/* Primary Certificates — the core 3 */}
      <div>
        <h2 className="text-base font-semibold text-white mb-3">Certificates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {primaryCerts.map((cert) => (
            <motion.button
              key={cert.id}
              variants={itemVariants}
              onClick={() => handlePrimaryClick(cert)}
              className={cn(
                'group w-full text-left p-4 sm:p-5 rounded-2xl touch-manipulation',
                'bg-white/[0.06] border border-white/[0.08] border-l-[3px]',
                cert.borderColor,
                'hover:bg-white/[0.09] hover:border-white/[0.12]',
                'active:scale-[0.98] transition-all'
              )}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
                    cert.iconBg
                  )}
                >
                  <cert.icon className={cn('w-5 h-5', cert.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white group-hover:text-elec-yellow transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-white mt-0.5">{cert.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-[10px] font-semibold text-white bg-white/[0.06] px-2 py-0.5 rounded">
                    {cert.standard}
                  </span>
                  <ChevronRight className="h-4 w-4 text-white group-hover:text-elec-yellow transition-colors" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Secondary Certificates — specialist */}
      <div>
        <h2 className="text-base font-semibold text-white mb-3">Specialist</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {secondaryCerts.map((cert) => (
            <motion.button
              key={cert.id}
              variants={itemVariants}
              onClick={() => handleSecondaryClick(cert)}
              className={cn(
                'group w-full text-left p-3.5 rounded-xl touch-manipulation min-h-[72px]',
                'bg-white/[0.06] border border-white/[0.08]',
                'hover:bg-white/[0.09] hover:border-white/[0.12]',
                'active:scale-[0.97] transition-all'
              )}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <cert.icon className={cn('w-4 h-4 flex-shrink-0', cert.iconColor)} />
                <span className="text-sm font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
                  {cert.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-white bg-white/[0.06] px-1.5 py-0.5 rounded">
                  {cert.standard}
                </span>
                <span className="text-[10px] font-bold text-elec-yellow">NEW</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.button
          variants={itemVariants}
          onClick={() => onNavigate('learning-hub')}
          className="group w-full text-left p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.09] hover:border-white/[0.12] active:scale-[0.98] transition-all touch-manipulation flex items-center gap-3.5"
        >
          <div className="w-11 h-11 rounded-xl bg-elec-yellow/12 flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white group-hover:text-elec-yellow transition-colors">
              I&T Hub
            </h3>
            <p className="text-sm text-white mt-0.5">BS 7671 guidance & resources</p>
          </div>
          <ChevronRight className="h-5 w-5 text-elec-yellow flex-shrink-0" />
        </motion.button>

        <motion.button
          variants={itemVariants}
          onClick={() => navigate('/customers')}
          className="group w-full text-left p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.09] hover:border-white/[0.12] active:scale-[0.98] transition-all touch-manipulation flex items-center gap-3.5"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-500/12 flex items-center justify-center flex-shrink-0">
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              Customers
            </h3>
            <p className="text-sm text-white mt-0.5">Manage clients & properties</p>
          </div>
          <ChevronRight className="h-5 w-5 text-blue-400 flex-shrink-0" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CertificateTypeGrid;
