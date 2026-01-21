import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Settings, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

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
  const isMobile = useIsMobile();

  return (
    <div className={cn(isMobile ? "space-y-2" : "space-y-3")}>
      {/* Certificate Type Grid - 2x2 on mobile, 4 cols on desktop */}
      <motion.div
        className={cn("grid grid-cols-2 lg:grid-cols-4", isMobile ? "gap-1.5" : "gap-2 sm:gap-3")}
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
            <div className={cn(
              "card-premium-yellow rounded-xl h-full hover:border-elec-yellow/40 active:scale-[0.97] transition-all duration-200",
              isMobile ? "min-h-[100px]" : "min-h-[120px] sm:min-h-[130px]"
            )}>
              <div className={cn("h-full flex flex-col", isMobile ? "p-3" : "p-3.5 sm:p-4")}>
                <div className={cn(
                  "rounded-xl bg-elec-yellow/15 w-fit group-hover:bg-elec-yellow/25 transition-colors duration-200",
                  isMobile ? "p-1.5 mb-2" : "p-2 sm:p-2.5 mb-3"
                )}>
                  <cert.icon className={cn("text-elec-yellow", isMobile ? "h-4 w-4" : "h-5 w-5 sm:h-6 sm:w-6")} />
                </div>
                <div className="flex-1">
                  <h3 className={cn(
                    "font-semibold text-white group-hover:text-elec-yellow transition-colors duration-200",
                    isMobile ? "text-xs mb-0.5" : "text-sm sm:text-base mb-1"
                  )}>
                    {cert.title}
                  </h3>
                  <p className={cn(
                    "text-white/50 leading-relaxed line-clamp-2",
                    isMobile ? "text-[10px]" : "text-xs sm:text-sm"
                  )}>
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
