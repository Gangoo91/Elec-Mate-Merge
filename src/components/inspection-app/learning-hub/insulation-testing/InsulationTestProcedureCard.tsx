
import React from 'react';
import { Shield, Power, Unplug, Zap, ClipboardList, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const InsulationTestProcedureCard = () => {
  const steps = [
    { number: 1, icon: Power, title: 'Safe Isolation & Prove Dead', description: 'Ensure circuit is safely isolated and use voltage indicator to prove dead', color: 'text-purple-400' },
    { number: 2, icon: Unplug, title: 'Disconnect Loads & SPDs', description: 'Remove all loads and isolate surge protection devices to prevent damage', color: 'text-violet-400' },
    { number: 3, icon: Zap, title: 'Select Test Voltage', description: 'Choose appropriate DC test voltage: 250V, 500V, or 1000V based on circuit rating', color: 'text-indigo-400' },
    { number: 4, icon: Shield, title: 'Test All Combinations', description: 'Test Live-Neutral, Live-Earth, and Neutral-Earth insulation resistance', color: 'text-blue-400' },
    { number: 5, icon: ClipboardList, title: 'Record & Correct', description: 'Record readings and apply temperature correction if necessary', color: 'text-cyan-400' },
    { number: 6, icon: CheckCircle, title: 'Verify Minimum 1.0MΩ', description: 'Confirm all readings meet or exceed the minimum 1.0MΩ requirement', color: 'text-green-400' }
  ];

  const voltageOptions = [
    { voltage: '250V DC', circuits: 'Up to 50V', examples: 'SELV, telecoms, control circuits' },
    { voltage: '500V DC', circuits: '50V to 500V', examples: 'Typical LV installations, most common' },
    { voltage: '1000V DC', circuits: '500V to 1000V', examples: 'Industrial 3-phase equipment' }
  ];

  return (
    <Card className="bg-card/50 border-border border-l-4 border-l-purple-500 hover:bg-card transition-all">
      <CardHeader className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
          <CardTitle className="text-purple-400 text-base sm:text-lg md:text-xl">
            Insulation Resistance Test Procedure
          </CardTitle>
        </div>
        <CardDescription className="text-xs sm:text-sm text-white/80 leading-relaxed">
          Step-by-step procedure for testing insulation resistance in accordance with BS 7671 Regulation 612.3
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
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-purple-400 font-bold text-xs sm:text-sm">{step.number}</span>
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

        {/* Test Voltage Selection */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 border-l-4 border-l-indigo-500 rounded-lg p-4 sm:p-5">
          <h4 className="font-semibold text-indigo-400 mb-3 text-sm sm:text-base">Test Voltage Selection Guide</h4>
          <div className="space-y-2 sm:space-y-3">
            {voltageOptions.map((option, index) => (
              <div key={index} className="bg-background/50 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3 flex-wrap">
                  <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-400/20 text-xs shrink-0">{option.voltage}</Badge>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-foreground">Circuits: {option.circuits}</p>
                    <p className="text-xs text-white/80">{option.examples}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-yellow-400 mt-3 flex items-start gap-2">
            <span className="shrink-0">⚠️</span>
            <span>Apply test voltage for minimum 1 minute. Ensure all electronic equipment is disconnected.</span>
          </p>
        </div>

        {/* Critical Requirements */}
        <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5">
          <h4 className="font-semibold text-green-400 mb-3 text-sm sm:text-base">Critical Test Requirements</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <p className="font-medium text-foreground">Minimum Values</p>
              <p className="text-white/80 leading-relaxed">• New: 1.0MΩ minimum</p>
              <p className="text-white/80 leading-relaxed">• Existing: 0.5MΩ acceptable</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Environmental</p>
              <p className="text-white/80 leading-relaxed">• Temperature correction</p>
              <p className="text-white/80 leading-relaxed">• Moisture affects readings</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Equipment</p>
              <p className="text-white/80 leading-relaxed">• Calibrated IR tester</p>
              <p className="text-white/80 leading-relaxed">• Suitable test voltage</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsulationTestProcedureCard;
