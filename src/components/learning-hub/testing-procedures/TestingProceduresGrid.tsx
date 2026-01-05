
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TestingProcedureCard from './TestingProcedureCard';
import { TestingProcedure } from './TestingProcedureData';
import { Shield, Zap, BookOpen, Clock, AlertTriangle, CheckCircle2, RotateCcw, Target, Settings, Activity, FileText, ClipboardList } from 'lucide-react';

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
  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 px-3 sm:px-4">
      {/* Essential Safety Procedure */}
      <div>
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">Essential Safety Procedure</h3>
        </div>
        
        <Card className="bg-card/50 border-border border-l-4 border-l-red-500 hover:bg-card hover:border-border transition-all touch-manipulation">
          <CardHeader className="p-4 sm:p-5 md:p-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 shrink-0" />
                <CardTitle className="text-red-400 text-base sm:text-lg md:text-xl">Safe Isolation Procedure</CardTitle>
              </div>
              <Badge className="bg-red-500/10 text-red-400 border-red-400/20 text-xs shrink-0">
                Critical
              </Badge>
            </div>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
              BS 7671 Regulation 612.1
            </Badge>
            <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
              Essential safety procedure for isolating electrical installations before any work
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>15-20 minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <span>High Risk</span>
              </div>
            </div>
            <Button 
              onClick={onStartSafeIsolation}
              className="w-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
            >
              Start Safe Isolation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Individual Electrical Tests */}
      <div>
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">Electrical Testing Procedures</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Continuity Testing */}
          <Card className="bg-card/50 border-border border-l-4 border-l-blue-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
                  <CardTitle className="text-blue-400 text-base sm:text-lg md:text-xl">Continuity Testing</CardTitle>
                </div>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs shrink-0">
                  Essential
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                BS 7671 Section 612.2
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Test continuity of protective conductors and ring final circuits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>20-30 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Dead Test</span>
                </div>
              </div>
              <Button 
                onClick={onStartContinuityTesting}
                className="w-full bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Start Continuity Testing
              </Button>
            </CardContent>
          </Card>

          {/* Insulation Resistance Testing */}
          <Card className="bg-card/50 border-border border-l-4 border-l-purple-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 shrink-0" />
                  <CardTitle className="text-purple-400 text-base sm:text-lg md:text-xl">Insulation Resistance</CardTitle>
                </div>
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-400/20 text-xs shrink-0">
                  Essential
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                BS 7671 Section 612.3
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Test insulation resistance between conductors and earth
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>15-25 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Dead Test</span>
                </div>
              </div>
              <Button 
                onClick={onStartInsulationTesting}
                className="w-full bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Start Insulation Testing
              </Button>
            </CardContent>
          </Card>

          {/* Polarity Testing */}
          <Card className="bg-card/50 border-border border-l-4 border-l-indigo-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400 shrink-0" />
                  <CardTitle className="text-indigo-400 text-base sm:text-lg md:text-xl">Polarity Testing</CardTitle>
                </div>
                <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-400/20 text-xs shrink-0">
                  Essential
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                BS 7671 Section 612.6
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Verify correct polarity of all electrical connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>10-20 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Dead Test</span>
                </div>
              </div>
              <Button 
                onClick={onStartPolarityTesting}
                className="w-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Start Polarity Testing
              </Button>
            </CardContent>
          </Card>

          {/* Earth Fault Loop Impedance (Zs) Testing */}
          <Card className="bg-card/50 border-border border-l-4 border-l-red-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 shrink-0" />
                  <CardTitle className="text-red-400 text-base sm:text-lg md:text-xl">Zs Testing</CardTitle>
                </div>
                <Badge className="bg-red-500/10 text-red-400 border-red-400/20 text-xs shrink-0">
                  Essential
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                BS 7671 Sections 612.9 & 411.4.5
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Measure earth fault loop impedance for safety verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>15-25 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span>Live Test</span>
                </div>
              </div>
              <Button 
                onClick={onStartZsTesting}
                className="w-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Start Zs Testing
              </Button>
            </CardContent>
          </Card>

          {/* RCD Testing */}
          <Card className="bg-card/50 border-border border-l-4 border-l-teal-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400 shrink-0" />
                  <CardTitle className="text-teal-400 text-base sm:text-lg md:text-xl">RCD Testing</CardTitle>
                </div>
                <Badge className="bg-teal-500/10 text-teal-400 border-teal-400/20 text-xs shrink-0">
                  Essential
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                BS 7671 Sections 612.10 & 612.13
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Test RCD operation and trip times for protection verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>10-15 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span>Live Test</span>
                </div>
              </div>
              <Button 
                onClick={onStartRcdTesting}
                className="w-full bg-teal-500/20 text-teal-400 border border-teal-500/30 hover:bg-teal-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Start RCD Testing
              </Button>
            </CardContent>
          </Card>

          {/* PFC Testing */}
          <Card className="bg-card/50 border-border border-l-4 border-l-orange-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 shrink-0" />
                  <CardTitle className="text-orange-400 text-base sm:text-lg md:text-xl">PFC Testing</CardTitle>
                </div>
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-400/20 text-xs shrink-0">
                  Essential
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                BS 7671 Sections 612.11 & 434.5.2
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Measure prospective fault current for protective device verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>10-20 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span>Live Test</span>
                </div>
              </div>
              <Button 
                onClick={onStartPfcTesting}
                className="w-full bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Start PFC Testing
              </Button>
            </CardContent>
          </Card>

          {/* Functional Testing */}
          <Card className="bg-card/50 border-border border-l-4 border-l-green-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
                  <CardTitle className="text-green-400 text-base sm:text-lg md:text-xl">Functional Testing</CardTitle>
                </div>
                <Badge className="bg-green-500/10 text-green-400 border-green-400/20 text-xs shrink-0">
                  Essential
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                BS 7671 Section 612.13
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Test operation and functionality of electrical installations and controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>20-30 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Functional Test</span>
                </div>
              </div>
              <Button 
                onClick={onStartFunctionalTesting}
                className="w-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Start Functional Testing
              </Button>
            </CardContent>
          </Card>

          {/* Supplementary Testing Card */}
          <Card className="bg-card/50 border-border border-l-4 border-l-purple-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 shrink-0" />
                  <CardTitle className="text-purple-400 text-base sm:text-lg md:text-xl">Supplementary Testing</CardTitle>
                </div>
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-400/20 text-xs shrink-0">
                  Additional
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                BS 7671 Various Sections
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Additional tests required or recommended by BS 7671 for specific installations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Varies by test</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  <span>Specialist Tests</span>
                </div>
              </div>
              <Button 
                onClick={onStartSupplementaryTesting}
                className="w-full bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Start Supplementary Testing
              </Button>
            </CardContent>
          </Card>

          {/* Certificate Completion Guide */}
          <Card className="bg-card/50 border-border border-l-4 border-l-cyan-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 shrink-0" />
                  <CardTitle className="text-cyan-400 text-base sm:text-lg md:text-xl">Certificate Guide</CardTitle>
                </div>
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-400/20 text-xs shrink-0">
                  Documentation
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                BS 7671 Compliance
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Complete guide to electrical certificate completion and compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Reference Guide</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                  <span>Documentation</span>
                </div>
              </div>
              <Button 
                onClick={() => onStartCertificateGuide?.()}
                className="w-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Open Certificate Guide
              </Button>
            </CardContent>
          </Card>

          {/* Schedule Completion Guide */}
          <Card className="bg-card/50 border-border border-l-4 border-l-emerald-500 hover:bg-card hover:border-border transition-all touch-manipulation">
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400 shrink-0" />
                  <CardTitle className="text-emerald-400 text-base sm:text-lg md:text-xl">Schedule Guide</CardTitle>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/20 text-xs shrink-0">
                  Documentation
                </Badge>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
                Testing Standards
              </Badge>
              <CardDescription className="text-white text-xs sm:text-sm leading-relaxed">
                Guide to completing test results schedules accurately
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-5 md:p-6 pt-0">
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Reference Guide</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>Documentation</span>
                </div>
              </div>
              <Button 
                onClick={() => onStartScheduleGuide?.()}
                className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                Open Schedule Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Procedures */}
      {procedures.length > 0 && (
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">Additional Testing Procedures</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
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
