
import { Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContinuityScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-[#323232] rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Scenario: The Rushed Testing Job</h3>
          
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-5">
            <h4 className="text-red-200 font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              What Happened
            </h4>
            <p className="text-foreground text-xs sm:text-sm leading-relaxed mb-3">
              You're running behind schedule on a testing job. To save time, you decide to skip continuity 
              testing and assume all CPCs are connected properly since the installation looks neat and tidy. 
              You move straight to insulation resistance testing.
            </p>
            <p className="text-foreground text-xs sm:text-sm leading-relaxed">
              Later during your tests, you discover that the earth terminal at one of the socket outlets 
              has been left floating—the CPC wasn't properly terminated and is just sitting loose in the back box.
            </p>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 sm:p-5">
            <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              Proper Response
            </h4>
            <p className="text-foreground text-xs sm:text-sm leading-relaxed">
              <strong>Continuity testing would have identified this immediately.</strong> The CPC would have 
              shown an open circuit when tested from the distribution board to the socket outlet. This critical 
              safety defect would have been caught before any other testing commenced.
            </p>
          </div>

          <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4 sm:p-5">
            <h4 className="text-orange-200 font-medium mb-3 text-sm sm:text-base">The Consequences</h4>
            <ul className="space-y-2 text-foreground text-xs sm:text-sm leading-relaxed">
              <li>• The socket outlet has no earth fault protection</li>
              <li>• Any fault to the metal case of connected equipment could be lethal</li>
              <li>• The RCD may not operate as expected during a fault</li>
              <li>• You've put building occupants at serious risk</li>
              <li>• Your professional reputation and insurance could be compromised</li>
            </ul>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 sm:p-5">
            <h4 className="text-blue-200 font-medium mb-3 text-sm sm:text-base">Key Learning Points</h4>
            <ul className="space-y-2 text-foreground text-xs sm:text-sm leading-relaxed">
              <li>• Visual inspection alone cannot confirm electrical continuity</li>
              <li>• Skipping continuity testing puts lives at risk</li>
              <li>• Time pressure is never a valid reason to compromise safety</li>
              <li>• Proper testing sequence exists for good safety reasons</li>
              <li>• Every step in the testing process serves a critical purpose</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
