import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Settings, BookOpen, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface CertificateTypeGridProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

const certificateTypes = [
  {
    id: 'eicr',
    title: 'EICR',
    subtitle: 'Condition Report',
    description: 'Periodic inspection & testing',
    icon: FileText,
  },
  {
    id: 'eic',
    title: 'EIC',
    subtitle: 'Installation Certificate',
    description: 'New installation works',
    icon: Zap,
  },
  {
    id: 'minor-works',
    title: 'Minor Works',
    subtitle: 'Certificate',
    description: 'Additions & alterations',
    icon: Settings,
  },
  {
    id: 'learning-hub',
    title: 'I&T Hub',
    subtitle: 'Reference',
    description: 'BS7671 guidance & resources',
    icon: BookOpen,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  }
};

const CertificateTypeGrid = ({ onNavigate }: CertificateTypeGridProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className={cn(
        "grid gap-2.5",
        isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"
      )}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {certificateTypes.map((cert) => (
        <motion.button
          key={cert.id}
          variants={cardVariants}
          onClick={() => onNavigate(cert.id)}
          className="group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation w-full"
        >
          {isMobile ? (
            /* Mobile: Horizontal list item */
            <div className={cn(
              "relative overflow-hidden rounded-xl",
              "bg-card border border-elec-yellow/20",
              "hover:border-elec-yellow/40",
              "active:scale-[0.98] active:bg-elec-yellow/5",
              "transition-all duration-200"
            )}>
              <div className="flex items-center gap-3 p-3">
                {/* Icon */}
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                  <cert.icon className="w-5 h-5 text-elec-yellow" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-semibold text-white text-sm">
                      {cert.title}
                    </h3>
                    <span className="text-[11px] text-white/40">
                      {cert.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">
                    {cert.description}
                  </p>
                </div>

                {/* Chevron */}
                <ChevronRight className="w-5 h-5 text-elec-yellow/40 flex-shrink-0 group-hover:text-elec-yellow/70 transition-colors" />
              </div>
            </div>
          ) : (
            /* Desktop/Tablet: Card */
            <div className={cn(
              "relative overflow-hidden rounded-xl h-full",
              "bg-card border border-elec-yellow/20",
              "hover:border-elec-yellow/40",
              "active:scale-[0.97]",
              "transition-all duration-200",
              "min-h-[130px]"
            )}>
              <div className="h-full flex flex-col p-4">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-elec-yellow/15 flex items-center justify-center mb-3">
                  <cert.icon className="w-5 h-5 text-elec-yellow" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm mb-0.5 group-hover:text-elec-yellow transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-[11px] text-white/40 mb-1">
                    {cert.subtitle}
                  </p>
                  <p className="text-xs text-white/50 line-clamp-2">
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CertificateTypeGrid;
