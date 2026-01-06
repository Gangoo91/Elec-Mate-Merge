
import React from 'react';
import { Zap, Power, TestTube2, ClipboardList, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ContinuityTestProcedureCard = () => {
  const r1r2Steps = [
    { number: 1, icon: Power, title: 'Ensure Safe Isolation', description: 'Verify circuit is safely isolated and proven dead before testing' },
    { number: 2, icon: Zap, title: 'Connect at Distribution Board', description: 'Connect test leads between phase and CPC terminals at the distribution board' },
    { number: 3, icon: TestTube2, title: 'Test at Furthest Point', description: 'Test at the furthest point of the circuit for maximum resistance' },
    { number: 4, icon: ClipboardList, title: 'Record R1+R2 Reading', description: 'Record the combined resistance reading (includes both conductors)' },
    { number: 5, icon: CheckCircle, title: 'Verify Requirements', description: 'Ensure result meets BS 7671 requirements for the circuit' }
  ];

  const r2Steps = [
    { number: 1, icon: Power, title: 'Ensure Safe Isolation', description: 'Verify circuit is safely isolated and proven dead before testing' },
    { number: 2, icon: AlertCircle, title: 'Install Temporary Link', description: 'Connect temporary link between phase and CPC at board' },
    { number: 3, icon: TestTube2, title: 'Test at Circuit End', description: 'Test between phase and CPC at the end of the circuit' },
    { number: 4, icon: ClipboardList, title: 'Remove Link & Record', description: 'Remove temporary link and record R2 reading' },
    { number: 5, icon: CheckCircle, title: 'Calculate R1+R2', description: 'Calculate total R1+R2 if required for fault current verification' }
  ];

  return (
    <Card className="bg-card/50 border-border border-l-4 border-l-cyan-500 hover:bg-card transition-all">
      <CardHeader className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
          <CardTitle className="text-cyan-400 text-base sm:text-lg md:text-xl">
            Continuity Test Procedure Overview
          </CardTitle>
        </div>
        <CardDescription className="text-xs sm:text-sm text-white/80 leading-relaxed">
          Step-by-step procedures for testing protective conductor continuity in accordance with BS 7671
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-5 md:p-6 pt-0 space-y-4 sm:space-y-6">
        {/* R1+R2 Method */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">R1+R2 Method (Preferred)</h4>
            <Badge className="bg-green-500/10 text-green-400 border-green-400/20 text-xs">Recommended</Badge>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {r1r2Steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="bg-background/50 border border-border rounded-lg p-3 sm:p-4 hover:border-border transition-all">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-cyan-400 font-bold text-xs">{step.number}</span>
                    </div>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-foreground text-xs sm:text-sm mb-0.5">{step.title}</h5>
                      <p className="text-xs text-white/80 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* R2 Method */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">R2 Method (Alternative)</h4>
            <Badge variant="outline" className="text-xs border-border">Alternative</Badge>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {r2Steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="bg-background/50 border border-border rounded-lg p-3 sm:p-4 hover:border-border transition-all">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-blue-400 font-bold text-xs">{step.number}</span>
                    </div>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-foreground text-xs sm:text-sm mb-0.5">{step.title}</h5>
                      <p className="text-xs text-white/80 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Critical Requirements */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 border-l-4 border-l-yellow-500 rounded-lg p-4 sm:p-5">
          <h4 className="font-semibold text-yellow-400 mb-3 text-sm sm:text-base">Critical Test Requirements</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <p className="font-medium text-foreground">Test Current</p>
              <p className="text-white/80 leading-relaxed">• Minimum 200mA DC</p>
              <p className="text-white/80 leading-relaxed">• Higher for bonding</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Instrument</p>
              <p className="text-white/80 leading-relaxed">• Low resistance ohmmeter</p>
              <p className="text-white/80 leading-relaxed">• 0.01Ω resolution min</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Test Leads</p>
              <p className="text-white/80 leading-relaxed">• Robust construction</p>
              <p className="text-white/80 leading-relaxed">• Known resistance</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContinuityTestProcedureCard;
