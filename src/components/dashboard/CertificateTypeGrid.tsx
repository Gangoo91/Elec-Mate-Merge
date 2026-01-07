import React from 'react';
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

const CertificateTypeGrid = ({ onNavigate }: CertificateTypeGridProps) => {
  return (
    <div className="space-y-3">
      {/* Certificate Type Grid - 2x2 on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 card-stagger">
        {certificateTypes.map((cert, index) => (
          <button
            key={cert.id}
            onClick={() => onNavigate(cert.id)}
            className="group cursor-pointer text-left focus:outline-none touch-manipulation animate-card-entrance"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="card-premium-yellow rounded-xl hover:border-elec-yellow/40 active:scale-[0.97] transition-all duration-200 h-full">
              <div className="p-4 sm:p-5 space-y-3">
                <div className="p-2.5 bg-elec-yellow/15 rounded-xl w-fit group-hover:bg-elec-yellow/25 transition-colors">
                  <cert.icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-elec-yellow transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm mt-1 text-white/50 line-clamp-2">
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CertificateTypeGrid;
