import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificateTypeGridProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

interface CertDef {
  id: string;
  title: string;
  description: string;
  standard: string;
  useRouter?: boolean;
  accentColor: string;
}

const coreCerts: CertDef[] = [
  {
    id: 'eicr',
    title: 'EICR',
    description: 'Periodic inspection & testing',
    standard: 'BS 7671',
    accentColor: 'from-blue-500 via-blue-400 to-cyan-400',
  },
  {
    id: 'eic',
    title: 'EIC',
    description: 'New installation works',
    standard: 'BS 7671',
    accentColor: 'from-emerald-500 via-emerald-400 to-green-400',

  },
  {
    id: 'minor-works',
    title: 'Minor Works',
    description: 'Additions & alterations',
    standard: 'BS 7671',
    accentColor: 'from-orange-500 via-amber-400 to-yellow-400',

  },
];

const specialistCerts: CertDef[] = [
  {
    id: 'fire-alarm',
    title: 'Fire Alarm',
    description: 'Detection & warning',
    standard: 'BS 5839',
    useRouter: true,
    accentColor: 'from-red-500 via-rose-400 to-pink-400',

  },
  {
    id: 'emergency-lighting',
    title: 'Emergency Lighting',
    description: 'Safety illumination',
    standard: 'BS 5266',
    useRouter: true,
    accentColor: 'from-amber-500 via-amber-400 to-yellow-400',

  },
  {
    id: 'ev-charging',
    title: 'EV Charging',
    description: 'Charge point installation',
    standard: 'IET CoP',
    useRouter: true,
    accentColor: 'from-emerald-500 via-teal-400 to-cyan-400',

  },
  {
    id: 'solar-pv',
    title: 'Solar PV',
    description: 'Photovoltaic systems',
    standard: 'MCS',
    useRouter: true,
    accentColor: 'from-yellow-500 via-amber-400 to-orange-400',

  },
  {
    id: 'pat-testing',
    title: 'PAT Testing',
    description: 'Portable appliance testing',
    standard: 'IET CoP',
    useRouter: true,
    accentColor: 'from-cyan-500 via-cyan-400 to-blue-400',

  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

interface CertCardProps {
  cert: CertDef;
  onClick: () => void;
}

const CertCard = ({ cert, onClick }: CertCardProps) => {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <button
        type="button"
        onClick={onClick}
        className="block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
      >
        <div
          className={cn(
            'group relative overflow-hidden h-full',
            'card-surface-interactive',
            'active:scale-[0.98] transition-all duration-200'
          )}
        >
          {/* Top accent line */}
          <div
            className={cn(
              'absolute inset-x-0 top-0 h-[2px]',
              'bg-gradient-to-r',
              cert.accentColor,
              'opacity-40 group-hover:opacity-100',
              'transition-opacity duration-200'
            )}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full p-4">
            {/* Standard badge */}
            <div className="flex items-center justify-end mb-3">
              <span className="text-[10px] font-bold text-white bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded">
                {cert.standard}
              </span>
            </div>

            {/* Title */}
            <h3
              className={cn(
                'text-[15px] font-semibold text-white leading-tight',
                'group-hover:text-elec-yellow transition-colors'
              )}
            >
              {cert.title}
            </h3>

            {/* Subtitle */}
            <p className="mt-1 text-[12px] text-white leading-tight line-clamp-2">
              {cert.description}
            </p>

            {/* Spacer */}
            <div className="flex-grow min-h-[12px]" />

            {/* Bottom action */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-elec-yellow">Open</span>
              <div
                className={cn(
                  'w-6 h-6 rounded-full',
                  'bg-white/[0.05] border border-elec-yellow/20',
                  'flex items-center justify-center',
                  'group-hover:bg-elec-yellow group-hover:border-elec-yellow',
                  'transition-all duration-200'
                )}
              >
                <ChevronRight
                  className={cn(
                    'w-3.5 h-3.5 text-white',
                    'group-hover:text-black group-hover:translate-x-0.5',
                    'transition-all'
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

const CertificateTypeGrid = ({ onNavigate }: CertificateTypeGridProps) => {
  const navigate = useNavigate();

  const handleClick = (cert: CertDef) => {
    if (cert.useRouter) {
      navigate(`/electrician/inspection-testing/${cert.id}/new`);
    } else {
      onNavigate(cert.id);
    }
  };

  return (
    <>
      {/* Core Certificates */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
        className="space-y-3"
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Certificates
        </h2>
        <div className="grid grid-cols-2 gap-3 auto-rows-fr">
          {coreCerts.map((cert) => (
            <CertCard key={cert.id} cert={cert} onClick={() => handleClick(cert)} />
          ))}
        </div>
      </motion.section>

      {/* Specialist Certificates */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
        className="space-y-3"
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Specialist Certificates
        </h2>
        <div className="grid grid-cols-2 gap-3 auto-rows-fr">
          {specialistCerts.map((cert) => (
            <CertCard key={cert.id} cert={cert} onClick={() => handleClick(cert)} />
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default CertificateTypeGrid;
