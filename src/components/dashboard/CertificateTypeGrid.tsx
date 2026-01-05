import React from 'react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Settings, BookOpen } from 'lucide-react';
import ProfileStatusCard from './ProfileStatusCard';

interface CertificateTypeGridProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

const CertificateTypeGrid = ({ onNavigate }: CertificateTypeGridProps) => {
  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 md:max-w-7xl mx-auto">
      {/* Profile Status Card - Full Width */}
      <ProfileStatusCard />

      {/* 2x2 Grid for Certificate Cards */}
      <div className="md:max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {/* EICR - Most frequently used */}
        <Card
          className="bg-card border border-primary/30 rounded-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-primary/50 transition-all duration-300 group cursor-pointer p-3 sm:p-4 md:p-6 active:scale-[0.98] touch-manipulation"
          onClick={() => onNavigate('eicr')}
        >
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="p-2 sm:p-3 bg-primary/20 rounded-2xl shadow-lg shadow-primary/10">
                <FileText className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary drop-shadow-lg" />
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-foreground text-base sm:text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
              EICR
            </CardTitle>

            {/* Description */}
            <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Electrical Installation Condition Report - Periodic inspection and testing of electrical installations
            </CardDescription>
          </div>
        </Card>

        {/* Minor Works - Second most common */}
        <Card
          className="bg-card border border-orange-500/30 rounded-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-orange-500/50 transition-all duration-300 group cursor-pointer p-3 sm:p-4 md:p-6 active:scale-[0.98] touch-manipulation"
          onClick={() => onNavigate('minor-works')}
        >
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="p-2 sm:p-3 bg-orange-500/20 rounded-2xl shadow-lg shadow-orange-500/10">
                <Settings className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-orange-500 drop-shadow-lg" />
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-foreground text-base sm:text-lg md:text-xl font-bold group-hover:text-orange-500 transition-colors">
              Minor Works
            </CardTitle>

            {/* Description */}
            <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Minor Electrical Installation Works - Additions and alterations to existing installations
            </CardDescription>
          </div>
        </Card>

        {/* EIC - New installations */}
        <Card
          className="bg-card border border-green-500/30 rounded-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-green-500/50 transition-all duration-300 group cursor-pointer p-3 sm:p-4 md:p-6 active:scale-[0.98] touch-manipulation"
          onClick={() => onNavigate('eic')}
        >
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="p-2 sm:p-3 bg-green-500/20 rounded-2xl shadow-lg shadow-green-500/10">
                <Zap className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 drop-shadow-lg" />
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-foreground text-base sm:text-lg md:text-xl font-bold group-hover:text-green-500 transition-colors">
              EIC
            </CardTitle>

            {/* Description */}
            <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Electrical Installation Certificate - New electrical installation certification and compliance
            </CardDescription>
          </div>
        </Card>

        {/* Learning Hub - Educational resource */}
        <Card
          className="bg-card border border-blue-500/30 rounded-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer p-3 sm:p-4 md:p-6 active:scale-[0.98] touch-manipulation"
          onClick={() => onNavigate('learning-hub')}
        >
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="p-2 sm:p-3 bg-blue-500/20 rounded-2xl shadow-lg shadow-blue-500/10">
                <BookOpen className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-500 drop-shadow-lg" />
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-foreground text-base sm:text-lg md:text-xl font-bold group-hover:text-blue-500 transition-colors">
              Inspection & Testing Hub
            </CardTitle>

            {/* Description */}
            <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              BS7671 guidance, testing procedures and comprehensive safety resources for electrical professionals
            </CardDescription>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CertificateTypeGrid;
