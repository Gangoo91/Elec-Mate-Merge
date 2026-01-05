
import { Users, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationTestMethodsScenario = () => {
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
                While testing insulation resistance on a kitchen ring, you notice a reading of 0.15 MΩ 
                between L and E. You remove a socket faceplate and find water condensation inside.
              </p>
              
              <div className="bg-[#323232] rounded-lg p-3 border-l-4 border-green-500/50 mt-4">
                <h4 className="text-green-200 font-medium mb-2">The Answer</h4>
                <p className="text-foreground text-sm leading-relaxed">
                  Moisture is a common cause of low IR. Never ignore low values—locate and correct 
                  the source before proceeding. In this case, investigate the source of water ingress, 
                  dry out the affected area, and improve sealing before re-testing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">What This Teaches Us</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Low IR readings always indicate a real problem that needs investigation</li>
            <li>• Moisture is one of the most common causes of insulation breakdown</li>
            <li>• Visual inspection should accompany electrical testing</li>
            <li>• Never energise a circuit with sub-standard insulation resistance</li>
            <li>• Document both the problem found and the remedial action taken</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
