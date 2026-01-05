
import { Users, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationResistanceScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-3">The Situation</h3>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                You skip the insulation resistance test because "the wiring is new." Later, 
                a neutral-to-earth short causes nuisance tripping.
              </p>
              
              <div className="bg-[#323232] rounded-lg p-3 border-l-4 border-green-500/50 mt-4">
                <h4 className="text-green-200 font-medium mb-2">The Answer</h4>
                <p className="text-foreground text-sm leading-relaxed">
                  Even new installations can have faults. Insulation testing is required 
                  regardless of installation age. Manufacturing defects, installation damage, 
                  or contamination can all cause insulation problems in brand new cables.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">What This Teaches Us</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Never make assumptions about installation quality based on age</li>
            <li>• Test procedures exist for good reasons—follow them completely</li>
            <li>• Early detection prevents costly callbacks and safety issues</li>
            <li>• Professional integrity means testing everything properly</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
