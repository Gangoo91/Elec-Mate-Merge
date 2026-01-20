import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Settings, BookOpen } from 'lucide-react';

interface CertificateTypeGridProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

const certificateTypes = [
  {
    id: 'eicr',
    title: 'EICR',
    description: 'Condition Report - Periodic inspection',
    icon: FileText,
  },
  {
    id: 'eic',
    title: 'EIC',
    description: 'Installation Certificate - New works',
    icon: Zap,
  },
  {
    id: 'minor-works',
    title: 'Minor Works',
    description: 'Additions & alterations',
    icon: Settings,
  },
  {
    id: 'learning-hub',
    title: 'I&T Hub',
    description: 'BS7671 guidance & resources',
    icon: BookOpen,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 28 }
  }
};

const CertificateTypeGrid = ({ onNavigate }: CertificateTypeGridProps) => {
  return (
    <div className="space-y-3">
      {/* Certificate Type Grid - 2x2 on mobile, 4 cols on desktop */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {certificateTypes.map((cert) => (
          <motion.button
            key={cert.id}
            variants={cardVariants}
            onClick={() => onNavigate(cert.id)}
            className="group cursor-pointer text-left focus:outline-none touch-manipulation"
          >
            <div className="card-premium-yellow rounded-xl h-full min-h-[120px] sm:min-h-[130px] hover:border-elec-yellow/40 active:scale-[0.97] transition-all duration-200">
              <div className="p-3.5 sm:p-4 h-full flex flex-col">
                <div className="p-2 sm:p-2.5 rounded-xl bg-elec-yellow/15 w-fit mb-3 group-hover:bg-elec-yellow/25 transition-colors duration-200">
                  <cert.icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors duration-200">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default CertificateTypeGrid;
