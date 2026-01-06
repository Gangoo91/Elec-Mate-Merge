
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Zap, TestTube2, Calculator, AlertTriangle, BookOpen } from 'lucide-react';
import PfcTestDiagram from './PfcTestDiagram';

const PfcTestProcedureCard = () => {
  const steps = [
    { number: 1, icon: Target, title: 'Identify Test Location', description: 'Test at the origin of each circuit for accurate fault current measurement', color: 'text-orange-400' },
    { number: 2, icon: TestTube2, title: 'Measure Phase-Earth PFC', description: 'Primary measurement using PFC tester between phase and earth terminals', color: 'text-red-400' },
    { number: 3, icon: TestTube2, title: 'Measure Phase-Neutral PFC', description: 'Secondary check between phase and neutral to verify short-circuit values', color: 'text-amber-400' },
    { number: 4, icon: Calculator, title: 'Consider Parallel Paths', description: 'Account for all parallel earth paths and supply variations in calculations', color: 'text-yellow-400' },
    { number: 5, icon: AlertTriangle, title: 'Verify Minimum Values', description: 'Ensure PFC exceeds minimum required for protective device operation', color: 'text-orange-500' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <PfcTestDiagram />
      
      <Card className="bg-card/50 border-border border-l-4 border-l-orange-500 hover:bg-card transition-all">
        <CardHeader className="p-4 sm:p-5 md:p-6">
          <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-3">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 shrink-0" />
              <CardTitle className="text-orange-400 text-base sm:text-lg md:text-xl">
                Prospective Fault Current (PFC) Testing
              </CardTitle>
            </div>
            <Badge className="bg-orange-500/10 text-orange-400 border-orange-400/20 text-xs">Critical Test</Badge>
          </div>
          <CardDescription className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Essential testing to verify sufficient fault current for protective device operation - BS 7671 Regulation 612.11
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 md:p-6 pt-0 space-y-4 sm:space-y-6">
          {/* Quick Overview */}
          <div className="bg-orange-500/10 border border-orange-500/20 border-l-4 border-l-orange-500 rounded-lg p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
              <h4 className="font-semibold text-orange-400 text-sm sm:text-base">Why PFC Testing is Critical</h4>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-white/80 leading-relaxed">
              <p><strong className="text-foreground">Purpose:</strong> Verify adequate fault current to ensure protective devices operate within required disconnection times</p>
              <p><strong className="text-foreground">Risk:</strong> Insufficient PFC can prevent protective devices from operating, creating serious safety hazards</p>
            </div>
          </div>

          {/* Test Steps */}
          <div className="space-y-2 sm:space-y-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="bg-background/50 border border-border rounded-lg p-3 sm:p-4 hover:border-border transition-all">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-orange-400 font-bold text-xs sm:text-sm">{step.number}</span>
                    </div>
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${step.color} mt-1 shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-foreground text-sm sm:text-base mb-1">{step.title}</h5>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Test Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-background/50 border border-border rounded-lg p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                <h4 className="font-semibold text-yellow-400 text-sm sm:text-base">Test Types</h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 shrink-0">•</span>
                  <span><strong className="text-foreground">Phase-Earth PFC:</strong> Primary measurement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 shrink-0">•</span>
                  <span><strong className="text-foreground">Phase-Neutral PFC:</strong> Secondary check</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 shrink-0">•</span>
                  <span><strong className="text-foreground">Direct measurement:</strong> Preferred method</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 shrink-0">•</span>
                  <span><strong className="text-foreground">Calculated method:</strong> Alternative approach</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/50 border border-border rounded-lg p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <h4 className="font-semibold text-green-400 text-sm sm:text-base">Key Requirements</h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 shrink-0">•</span>
                  <span>Must exceed minimum values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 shrink-0">•</span>
                  <span>Test at circuit origin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 shrink-0">•</span>
                  <span>Consider all parallel paths</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 shrink-0">•</span>
                  <span>Account for supply variations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-red-500/10 border border-red-500/20 border-l-4 border-l-red-500 rounded-lg p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
              <h4 className="font-semibold text-red-400 text-sm sm:text-base">Critical Safety Point</h4>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              PFC testing involves high current measurements. Ensure proper test equipment is used and safety procedures are followed. 
              Low PFC readings indicate potential safety hazards that require immediate investigation and remedial action.
            </p>
          </div>

          {/* Regulation Summary */}
          <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              <h4 className="font-semibold text-blue-400 text-sm sm:text-base">BS 7671 Requirements Summary</h4>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-mono shrink-0">612.11:</span>
                <span>PFC shall be measured at the origin of every circuit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-mono shrink-0">411.3.2:</span>
                <span>Automatic disconnection times must be achieved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-mono shrink-0">Table 41.1:</span>
                <span>Maximum disconnection times for different systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-mono shrink-0">Appendix 3:</span>
                <span>Guidance on measurement methods and calculations</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PfcTestProcedureCard;
