
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TestingProcedureCard from './TestingProcedureCard';
import { TestingProcedure } from './TestingProcedureData';
import { Shield, Zap, BookOpen, Clock, AlertTriangle, CheckCircle2, RotateCcw, Target, Settings, Activity, FileText, ClipboardList, ArrowRight } from 'lucide-react';

interface TestingProceduresGridProps {
  procedures: TestingProcedure[];
  onStartProcedure: (procedure: TestingProcedure) => void;
  onStartSafeIsolation: () => void;
  onStartContinuityTesting: () => void;
  onStartInsulationTesting: () => void;
  onStartPolarityTesting: () => void;
  onStartZsTesting: () => void;
  onStartRcdTesting: () => void;
  onStartPfcTesting: () => void;
  onStartFunctionalTesting: () => void;
  onStartSupplementaryTesting: () => void;
  onStartCertificateGuide?: () => void;
  onStartScheduleGuide?: () => void;
  onPreviewProcedure: (procedure: TestingProcedure) => void;
  onClearFilters: () => void;
}

const TestingProceduresGrid = ({
  procedures,
  onStartProcedure,
  onStartSafeIsolation,
  onStartContinuityTesting,
  onStartInsulationTesting,
  onStartPolarityTesting,
  onStartZsTesting,
  onStartRcdTesting,
  onStartPfcTesting,
  onStartFunctionalTesting,
  onStartSupplementaryTesting,
  onStartCertificateGuide,
  onStartScheduleGuide,
  onPreviewProcedure,
  onClearFilters
}: TestingProceduresGridProps) => {

  const testingCards = [
    {
      id: 'continuity',
      title: 'Continuity Testing',
      subtitle: 'R1+R2 & Ring Final',
      icon: Zap,
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30 hover:border-blue-500/50',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      badgeType: 'Essential',
      regulation: 'BS 7671 612.2',
      testType: 'Dead Test',
      duration: '20-30 min',
      onClick: onStartContinuityTesting
    },
    {
      id: 'insulation',
      title: 'Insulation Resistance',
      subtitle: 'L-N, L-E, N-E',
      icon: Zap,
      gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/30 hover:border-purple-500/50',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      badgeType: 'Essential',
      regulation: 'BS 7671 612.3',
      testType: 'Dead Test',
      duration: '15-25 min',
      onClick: onStartInsulationTesting
    },
    {
      id: 'polarity',
      title: 'Polarity Testing',
      subtitle: 'Correct Connections',
      icon: RotateCcw,
      gradient: 'from-indigo-500/20 via-indigo-500/10 to-transparent',
      borderColor: 'border-indigo-500/30 hover:border-indigo-500/50',
      iconBg: 'bg-indigo-500/20',
      iconColor: 'text-indigo-400',
      badgeType: 'Essential',
      regulation: 'BS 7671 612.6',
      testType: 'Dead Test',
      duration: '10-20 min',
      onClick: onStartPolarityTesting
    },
    {
      id: 'zs',
      title: 'Zs Testing',
      subtitle: 'Earth Fault Loop',
      icon: Target,
      gradient: 'from-red-500/20 via-red-500/10 to-transparent',
      borderColor: 'border-red-500/30 hover:border-red-500/50',
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400',
      badgeType: 'Essential',
      regulation: 'BS 7671 612.9',
      testType: 'Live Test',
      duration: '15-25 min',
      onClick: onStartZsTesting
    },
    {
      id: 'rcd',
      title: 'RCD Testing',
      subtitle: 'Trip Time Verification',
      icon: Shield,
      gradient: 'from-teal-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-teal-500/30 hover:border-teal-500/50',
      iconBg: 'bg-teal-500/20',
      iconColor: 'text-teal-400',
      badgeType: 'Essential',
      regulation: 'BS 7671 612.10',
      testType: 'Live Test',
      duration: '10-15 min',
      onClick: onStartRcdTesting
    },
    {
      id: 'pfc',
      title: 'PFC Testing',
      subtitle: 'Prospective Fault Current',
      icon: Target,
      gradient: 'from-orange-500/20 via-orange-500/10 to-transparent',
      borderColor: 'border-orange-500/30 hover:border-orange-500/50',
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
      badgeType: 'Essential',
      regulation: 'BS 7671 612.11',
      testType: 'Live Test',
      duration: '10-20 min',
      onClick: onStartPfcTesting
    },
    {
      id: 'functional',
      title: 'Functional Testing',
      subtitle: 'Operation Verification',
      icon: Settings,
      gradient: 'from-green-500/20 via-green-500/10 to-transparent',
      borderColor: 'border-green-500/30 hover:border-green-500/50',
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-400',
      badgeType: 'Essential',
      regulation: 'BS 7671 612.13',
      testType: 'Functional',
      duration: '20-30 min',
      onClick: onStartFunctionalTesting
    },
    {
      id: 'supplementary',
      title: 'Supplementary Tests',
      subtitle: 'Additional Requirements',
      icon: Activity,
      gradient: 'from-violet-500/20 via-violet-500/10 to-transparent',
      borderColor: 'border-violet-500/30 hover:border-violet-500/50',
      iconBg: 'bg-violet-500/20',
      iconColor: 'text-violet-400',
      badgeType: 'Additional',
      regulation: 'BS 7671 Various',
      testType: 'Specialist',
      duration: 'Varies',
      onClick: onStartSupplementaryTesting
    }
  ];

  const documentCards = [
    {
      id: 'certificate',
      title: 'Certificate Guide',
      subtitle: 'Completion Guide',
      icon: FileText,
      gradient: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
      borderColor: 'border-cyan-500/30 hover:border-cyan-500/50',
      iconBg: 'bg-cyan-500/20',
      iconColor: 'text-cyan-400',
      badgeType: 'Docs',
      regulation: 'BS 7671 Compliance',
      onClick: onStartCertificateGuide
    },
    {
      id: 'schedule',
      title: 'Schedule Guide',
      subtitle: 'Test Results',
      icon: ClipboardList,
      gradient: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-400',
      badgeType: 'Docs',
      regulation: 'Testing Standards',
      onClick: onStartScheduleGuide
    }
  ];

  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
      {/* Essential Safety Procedure - Featured Card */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">Essential Safety Procedure</h3>
        </div>

        <Card
          onClick={onStartSafeIsolation}
          className="relative overflow-hidden bg-elec-gray border-red-500/30 hover:border-red-500/50 rounded-xl sm:rounded-2xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent opacity-50 hover:opacity-70 transition-opacity duration-300" />

          <div className="relative p-4 sm:p-5 md:p-6">
            {/* Top Row: Icon and Duration */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="p-2.5 sm:p-3 md:p-4 bg-red-500/20 rounded-lg sm:rounded-xl md:rounded-2xl">
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-400" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/60">
                <Clock className="h-3.5 w-3.5" />
                <span>15-20 min</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2">
              Safe Isolation Procedure
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
              Essential safety procedure for isolating electrical installations before any work
            </p>

            {/* Tags */}
            <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px] sm:text-xs">
                Critical
              </Badge>
              <Badge variant="outline" className="bg-transparent text-white/70 border-white/20 text-[10px] sm:text-xs">
                BS 7671 Reg 612.1
              </Badge>
              <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-[10px] sm:text-xs">
                <AlertTriangle className="h-2.5 w-2.5 mr-1" />
                High Risk
              </Badge>
            </div>

            {/* Action */}
            <div className="flex items-center gap-2 text-red-400 font-medium text-sm">
              <span>Start Safe Isolation</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Card>
      </div>

      {/* Electrical Testing Procedures Grid */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">Electrical Testing Procedures</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {testingCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card
                key={card.id}
                onClick={card.onClick}
                className={`relative overflow-hidden bg-elec-gray ${card.borderColor} rounded-xl sm:rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 hover:opacity-70 transition-opacity duration-300`} />

                <div className="relative p-3 sm:p-4 md:p-5">
                  {/* Icon */}
                  <div className={`p-2 sm:p-2.5 md:p-3 ${card.iconBg} rounded-lg sm:rounded-xl w-fit mb-2.5 sm:mb-3`}>
                    <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${card.iconColor}`} />
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-sm sm:text-base font-bold text-white mb-0.5 leading-tight">
                    {card.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white/60 mb-2 sm:mb-3">
                    {card.subtitle}
                  </p>

                  {/* Tags Row */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3">
                    <Badge className={`${card.iconBg} ${card.iconColor} border-transparent text-[9px] sm:text-[10px] px-1.5 py-0`}>
                      {card.badgeType}
                    </Badge>
                    <Badge variant="outline" className="bg-transparent text-white/50 border-white/10 text-[9px] sm:text-[10px] px-1.5 py-0 hidden sm:inline-flex">
                      {card.testType}
                    </Badge>
                  </div>

                  {/* Duration & Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-white/50">
                      <Clock className="h-3 w-3" />
                      <span>{card.duration}</span>
                    </div>
                    <ArrowRight className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${card.iconColor}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Documentation Guides */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">Documentation Guides</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {documentCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card
                key={card.id}
                onClick={() => card.onClick?.()}
                className={`relative overflow-hidden bg-elec-gray ${card.borderColor} rounded-xl sm:rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 hover:opacity-70 transition-opacity duration-300`} />

                <div className="relative p-3 sm:p-4 md:p-5">
                  {/* Icon */}
                  <div className={`p-2 sm:p-2.5 md:p-3 ${card.iconBg} rounded-lg sm:rounded-xl w-fit mb-2.5 sm:mb-3`}>
                    <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${card.iconColor}`} />
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-sm sm:text-base font-bold text-white mb-0.5 leading-tight">
                    {card.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white/60 mb-2 sm:mb-3">
                    {card.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3">
                    <Badge className={`${card.iconBg} ${card.iconColor} border-transparent text-[9px] sm:text-[10px] px-1.5 py-0`}>
                      {card.badgeType}
                    </Badge>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-end">
                    <ArrowRight className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${card.iconColor}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Additional Procedures */}
      {procedures.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">Additional Testing Procedures</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {procedures.map((procedure) => (
              <TestingProcedureCard
                key={procedure.id}
                procedure={procedure}
                onStart={() => onStartProcedure(procedure)}
                onPreview={() => onPreviewProcedure(procedure)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestingProceduresGrid;
