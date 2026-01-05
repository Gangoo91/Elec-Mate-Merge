
import React from 'react';
import { Plug, TestTube2, ClipboardList, Calculator, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ZsTestProcedureCard = () => {
  const steps = [
    {
      number: 1,
      icon: Plug,
      title: 'Connect Test Equipment',
      description: 'Connect earth fault loop impedance tester between phase and earth at the test point',
      color: 'text-red-400'
    },
    {
      number: 2,
      icon: TestTube2,
      title: 'Test at Furthest Point',
      description: 'Test at the furthest accessible point of each final circuit for worst-case measurement',
      color: 'text-orange-400'
    },
    {
      number: 3,
      icon: ClipboardList,
      title: 'Record Reading & Temperature',
      description: 'Record the Zs reading and ambient temperature immediately after testing',
      color: 'text-yellow-400'
    },
    {
      number: 4,
      icon: Calculator,
      title: 'Apply Temperature Correction',
      description: 'Correct reading to 70°C conductor operating temperature using correction factor',
      color: 'text-green-400'
    },
    {
      number: 5,
      icon: CheckCircle,
      title: 'Compare with Maximum Values',
      description: 'Verify corrected Zs does not exceed maximum permitted values from BS 7671 Appendix 3',
      color: 'text-blue-400'
    }
  ];

  return (
    <Card className="bg-card/50 border-border border-l-4 border-l-red-500 hover:bg-card transition-all">
      <CardHeader className="p-4 sm:p-5 md:p-6">
        <CardTitle className="text-red-400 text-base sm:text-lg md:text-xl">
          Zs Test Procedure Overview
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Step-by-step procedure for testing earth fault loop impedance in accordance with BS 7671
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 md:p-6 pt-0 space-y-3 sm:space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="bg-background/50 border border-border rounded-lg p-3 sm:p-4 hover:border-border transition-all"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-red-400 font-bold text-xs sm:text-sm">{step.number}</span>
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
      </CardContent>
    </Card>
  );
};

export default ZsTestProcedureCard;
