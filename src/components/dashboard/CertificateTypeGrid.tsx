import React from 'react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Settings, BookOpen } from 'lucide-react';

interface CertificateTypeGridProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

const CertificateTypeGrid = ({ onNavigate }: CertificateTypeGridProps) => {
  return (
    <div className="space-y-3">
      {/* Certificate Type Grid - 2x2 on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {/* EICR */}
        <Card
          className="group cursor-pointer bg-card border-elec-yellow/30 rounded-xl hover:border-elec-yellow/50 hover:shadow-lg hover:shadow-elec-yellow/5 transition-all duration-200 active:scale-[0.98] touch-manipulation"
          onClick={() => onNavigate('eicr')}
        >
          <div className="p-4 sm:p-5 space-y-3">
            <div className="p-2.5 bg-elec-yellow/10 rounded-xl w-fit group-hover:bg-elec-yellow/20 transition-colors">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-bold group-hover:text-elec-yellow transition-colors">
                EICR
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1 line-clamp-2">
                Condition Report - Periodic inspection
              </CardDescription>
            </div>
          </div>
        </Card>

        {/* EIC */}
        <Card
          className="group cursor-pointer bg-card border-green-500/30 rounded-xl hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-200 active:scale-[0.98] touch-manipulation"
          onClick={() => onNavigate('eic')}
        >
          <div className="p-4 sm:p-5 space-y-3">
            <div className="p-2.5 bg-green-500/10 rounded-xl w-fit group-hover:bg-green-500/20 transition-colors">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-bold group-hover:text-green-500 transition-colors">
                EIC
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1 line-clamp-2">
                Installation Certificate - New works
              </CardDescription>
            </div>
          </div>
        </Card>

        {/* Minor Works */}
        <Card
          className="group cursor-pointer bg-card border-orange-500/30 rounded-xl hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-200 active:scale-[0.98] touch-manipulation"
          onClick={() => onNavigate('minor-works')}
        >
          <div className="p-4 sm:p-5 space-y-3">
            <div className="p-2.5 bg-orange-500/10 rounded-xl w-fit group-hover:bg-orange-500/20 transition-colors">
              <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-bold group-hover:text-orange-500 transition-colors">
                Minor Works
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1 line-clamp-2">
                Additions & alterations
              </CardDescription>
            </div>
          </div>
        </Card>

        {/* Learning Hub */}
        <Card
          className="group cursor-pointer bg-card border-blue-500/30 rounded-xl hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 active:scale-[0.98] touch-manipulation"
          onClick={() => onNavigate('learning-hub')}
        >
          <div className="p-4 sm:p-5 space-y-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl w-fit group-hover:bg-blue-500/20 transition-colors">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-bold group-hover:text-blue-500 transition-colors">
                I&T Hub
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1 line-clamp-2">
                BS7671 guidance & resources
              </CardDescription>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CertificateTypeGrid;
