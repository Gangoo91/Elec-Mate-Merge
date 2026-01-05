
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
        className="bg-elec-gray border border-elec-yellow/30 rounded-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-elec-yellow/50 transition-all duration-300 group cursor-pointer p-3 sm:p-4 md:p-6 active:scale-[0.98] touch-manipulation" 
        onClick={() => onNavigate('eicr')}
      >
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-2 sm:p-3 bg-elec-yellow/20 rounded-2xl shadow-lg shadow-elec-yellow/20">
              <FileText className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-400 drop-shadow-lg" />
            </div>
          </div>
          
          {/* Title */}
          <CardTitle className="text-foreground text-base sm:text-lg md:text-xl font-bold group-hover:text-elec-yellow transition-colors">
            EICR
          </CardTitle>
          
          {/* Description */}
          <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Electrical Installation Condition Report - Periodic inspection and testing of electrical installations
          </CardDescription>
        </div>
      </Card>

      {/* Minor Works - Second most common */}
      <Card 
        className="bg-elec-gray border border-elec-yellow/30 rounded-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-elec-yellow/50 transition-all duration-300 group cursor-pointer p-3 sm:p-4 md:p-6 active:scale-[0.98] touch-manipulation" 
        onClick={() => onNavigate('minor-works')}
      >
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-2 sm:p-3 bg-elec-yellow/20 rounded-2xl shadow-lg shadow-elec-yellow/20">
              <Settings className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-400 drop-shadow-lg" />
            </div>
          </div>
          
          {/* Title */}
          <CardTitle className="text-foreground text-base sm:text-lg md:text-xl font-bold group-hover:text-elec-yellow transition-colors">
            Minor Works
          </CardTitle>
          
          {/* Description */}
          <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Minor Electrical Installation Works - Additions and alterations to existing installations
          </CardDescription>
        </div>
      </Card>

      {/* EIC - New installations */}
      <Card 
        className="bg-elec-gray border border-elec-yellow/30 rounded-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-elec-yellow/50 transition-all duration-300 group cursor-pointer p-3 sm:p-4 md:p-6 active:scale-[0.98] touch-manipulation" 
        onClick={() => onNavigate('eic')}
      >
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-2 sm:p-3 bg-elec-yellow/20 rounded-2xl shadow-lg shadow-elec-yellow/20">
              <Zap className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-400 drop-shadow-lg" />
            </div>
          </div>
          
          {/* Title */}
          <CardTitle className="text-foreground text-base sm:text-lg md:text-xl font-bold group-hover:text-elec-yellow transition-colors">
            EIC
          </CardTitle>
          
          {/* Description */}
          <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Electrical Installation Certificate - New electrical installation certification and compliance
          </CardDescription>
        </div>
      </Card>

      {/* Learning Hub - Educational resource */}
      <Card
        className="bg-elec-gray border border-elec-yellow/30 rounded-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-elec-yellow/50 transition-all duration-300 group cursor-pointer p-3 sm:p-4 md:p-6 active:scale-[0.98] touch-manipulation" 
        onClick={() => onNavigate('learning-hub')}
      >
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-2 sm:p-3 bg-elec-yellow/20 rounded-2xl shadow-lg shadow-elec-yellow/20">
              <BookOpen className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-400 drop-shadow-lg" />
            </div>
          </div>
          
          {/* Title */}
          <CardTitle className="text-foreground text-base sm:text-lg md:text-xl font-bold group-hover:text-elec-yellow transition-colors">
            Inspection & Testing Hub
          </CardTitle>
          
          {/* Description */}
          <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
            BS7671 guidance, testing procedures and comprehensive safety resources for electrical professionals
          </CardDescription>
        </div>
      </Card>
      </div>
    </div>
  );
};

export default CertificateTypeGrid;
