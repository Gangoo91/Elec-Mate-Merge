
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Wrench, AlertTriangle, CheckCircle, Target, Zap } from 'lucide-react';

export const PracticalGuidanceSection: React.FC = () => {
  const testingProcedures = [
    {
      step: 1,
      title: 'Isolate Circuit Safely',
      description: 'Switch off circuit breaker and verify isolation',
      safety: 'Always use approved voltage indicator'
    },
    {
      step: 2,
      title: 'Measure Ze at Origin',
      description: 'Test between line and earth at main switch',
      safety: 'Ensure all RCDs are in operation'
    },
    {
      step: 3,
      title: 'Measure R1+R2',
      description: 'Test continuity of live and earth conductors',
      safety: 'Link live and earth at remote end'
    },
    {
      step: 4,
      title: 'Calculate Zs',
      description: 'Add Ze and R1+R2 values together',
      safety: 'Apply temperature correction if required'
    },
    {
      step: 5,
      title: 'Verify Compliance',
      description: 'Compare result with maximum Zs values',
      safety: 'Consider 80% derating factor applied'
    }
  ];

  const commonIssues = [
    {
      issue: 'High Ze Values',
      causes: ['Poor DNO earth electrode', 'Corroded connections', 'Long supply cable'],
      solutions: ['Contact DNO if >0.8Ω', 'Check main earth connection', 'Consider TT system']
    },
    {
      issue: 'High R1+R2 Values',
      causes: ['Long cable runs', 'Small conductor CSA', 'Poor connections'],
      solutions: ['Increase cable size', 'Shorten cable route', 'Check all connections']
    },
    {
      issue: 'Zs Exceeds Limits',
      causes: ['Wrong protective device', 'Installation design issue', 'Measurement error'],
      solutions: ['Change to Type B MCB', 'Install RCD', 'Re-check measurements']
    }
  ];

  const practicalTips = [
    {
      icon: Target,
      title: 'Measurement Accuracy',
      tip: 'Use calibrated test equipment and ensure good probe contact'
    },
    {
      icon: Zap,
      title: 'Temperature Effects',
      tip: 'Conductors heat up in operation - apply 80% derating factor'
    },
    {
      icon: CheckCircle,
      title: 'Documentation',
      tip: 'Record all measurements on appropriate test certificates'
    },
    {
      icon: AlertTriangle,
      title: 'RCD Circuits',
      tip: 'RCD protection may permit higher Zs values - check manufacturer data'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Testing Procedure */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Step-by-Step Testing Procedure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testingProcedures.map((procedure) => (
              <div key={procedure.step} className="flex gap-4 p-4 bg-muted rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center font-bold text-sm">
                    {procedure.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground font-semibold mb-1">{procedure.title}</h4>
                  <p className="text-white/80 text-sm mb-2">{procedure.description}</p>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-400 text-xs">{procedure.safety}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Common Issues & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {commonIssues.map((item, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-foreground font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  {item.issue}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  <div>
                    <h5 className="text-white/80 font-medium text-sm mb-2">Common Causes:</h5>
                    <ul className="space-y-1">
                      {item.causes.map((cause, idx) => (
                        <li key={idx} className="text-white/70 text-sm flex items-center gap-2">
                          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white/80 font-medium text-sm mb-2">Solutions:</h5>
                    <ul className="space-y-1">
                      {item.solutions.map((solution, idx) => (
                        <li key={idx} className="text-green-400 text-sm flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {index < commonIssues.length - 1 && (
                  <div className="border-t border-border pt-3"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practical Tips */}
      <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Professional Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practicalTips.map((tip, index) => (
              <div key={index} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                <tip.icon className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold text-sm mb-1">{tip.title}</h4>
                  <p className="text-white/80 text-sm">{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticalGuidanceSection;
