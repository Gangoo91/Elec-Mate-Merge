
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Eye, TestTube2, Power, Shield, ClipboardCheck } from 'lucide-react';

const FunctionalTestProcedureCard = () => {
  const steps = [
    { number: 1, icon: Eye, title: 'Visual Inspection', description: 'Visually inspect all controls, switches, and safety devices for damage or wear', color: 'text-green-400' },
    { number: 2, icon: TestTube2, title: 'Test RCD Push Button', description: 'Operate RCD test button to verify mechanical trip mechanism functionality', color: 'text-emerald-400' },
    { number: 3, icon: Power, title: 'Verify Emergency Stops', description: 'Test all emergency stop systems and verify they disconnect supply correctly', color: 'text-teal-400' },
    { number: 4, icon: Settings, title: 'Test Switchgear Operation', description: 'Operate all switches, isolators, and control equipment through full range', color: 'text-cyan-400' },
    { number: 5, icon: ClipboardCheck, title: 'Document Findings', description: 'Record all test results, observations, and any defects identified', color: 'text-blue-400' }
  ];

  return (
    <Card className="bg-card/50 border-border border-l-4 border-l-green-500 hover:bg-card transition-all">
      <CardHeader className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3">
            <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
            <CardTitle className="text-green-400 text-base sm:text-lg md:text-xl">
              Functional Testing Procedure
            </CardTitle>
          </div>
          <Badge className="bg-green-500/10 text-green-400 border-green-400/20 text-xs">Essential Test</Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          BS 7671 Regulation 612.13 - Testing operation and functionality of installed equipment
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 md:p-6 pt-0 space-y-4 sm:space-y-6">
        {/* Test Steps */}
        <div className="space-y-2 sm:space-y-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="bg-background/50 border border-border rounded-lg p-3 sm:p-4 hover:border-border transition-all">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-green-400 font-bold text-xs sm:text-sm">{step.number}</span>
                  </div>
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${step.color} mt-1 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-foreground text-sm sm:text-base mb-1">{step.title}</h5>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Requirements */}
        <div className="bg-amber-500/10 border border-amber-500/20 border-l-4 border-l-amber-500 rounded-lg p-4 sm:p-5">
          <h4 className="font-semibold text-amber-400 mb-3 text-sm sm:text-base flex items-center gap-2">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            Critical Safety Requirements
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 shrink-0">•</span>
              <span>Coordinate with site personnel before testing to avoid disruption</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 shrink-0">•</span>
              <span>Understand system operation before commencing tests</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 shrink-0">•</span>
              <span>Have emergency procedures ready and known to all personnel</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 shrink-0">•</span>
              <span>Test during appropriate hours to minimise business disruption</span>
            </li>
          </ul>
        </div>

        {/* Regulation Compliance */}
        <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5">
          <h4 className="font-semibold text-blue-400 mb-2 text-sm sm:text-base">BS 7671 Regulation 612.13</h4>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Functional testing is required to verify that installed electrical equipment operates correctly and safely. 
            This includes testing of switchgear, protective devices, RCDs, control equipment, and all safety systems to 
            ensure they perform as intended under normal and emergency conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FunctionalTestProcedureCard;
