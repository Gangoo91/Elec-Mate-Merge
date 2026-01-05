
import { Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ProtectiveConductorScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-[#323232] rounded-lg p-4 sm:p-6">
          <h3 className="text-foreground font-semibold mb-4 text-sm sm:text-base">Real-World Challenge</h3>
          <div className="bg-orange-600/10 border border-orange-600/20 rounded p-4 sm:p-5 mb-4 sm:mb-6">
            <p className="text-foreground leading-relaxed text-xs sm:text-sm">
              You test CPC continuity on a ring final circuit and find <strong>2.5 ohms resistance</strong> between 
              the DB and a socket CPC. What should you do next?
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-red-600/10 border border-red-600/20 rounded p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Assessment</h4>
                  <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                    That's too high! A reading of 2.5 ohms indicates a significant problem with the CPC continuity. 
                    Normal readings should be well below 1 ohm for most domestic circuits.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-600/10 border border-green-600/20 rounded p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-green-200 font-medium mb-3 text-sm sm:text-base">Correct Action</h4>
                  <p className="text-foreground text-xs sm:text-sm leading-relaxed mb-3">
                    Investigate immediately for:
                  </p>
                  <ul className="space-y-1 sm:space-y-2 text-foreground text-xs sm:text-sm leading-relaxed">
                    <li>• Loose terminal connections</li>
                    <li>• Damaged cable or CPC conductor</li>
                    <li>• Incorrect connections or poor joints</li>
                    <li>• Corrosion at connection points</li>
                  </ul>
                  <p className="text-foreground text-xs sm:text-sm mt-3 font-medium">
                    <strong>Critical:</strong> Do not proceed with further tests until this issue is resolved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 sm:p-5">
          <h4 className="text-blue-200 font-medium mb-3 text-sm sm:text-base">Learning Point</h4>
          <p className="text-foreground text-xs sm:text-sm leading-relaxed">
            High CPC resistance readings are a serious safety concern. They indicate that the protective 
            conductor may not be able to carry sufficient fault current to operate protective devices quickly 
            enough, potentially leaving metalwork at dangerous potentials.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
