import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle } from 'lucide-react';

export const EmergencyLightingPracticalSection6_3 = () => {
  return (
    <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-600/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-green-300 flex items-center gap-2">
          <Wrench className="h-6 w-6 text-green-400 drop-shadow-md" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-green-200 mb-4">
          These practical steps will help you apply risk assessment principles to emergency lighting design:
        </p>
        
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-green-300">Engage with the fire risk assessor early</span>
              <p className="text-foreground mt-1">
                During design to ensure your layout matches their findings. Don't wait until installation 
                is complete to discover conflicts.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-green-300">Avoid generic designs</span>
              <p className="text-foreground mt-1">
                Tailor lighting levels and battery durations to the assessed risks. Every building has 
                unique characteristics that affect emergency lighting requirements.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-green-300">Consider vulnerable occupants</span>
              <p className="text-foreground mt-1">
                If the assessment identifies vulnerable occupants, consider higher lux levels and maintained 
                systems in common areas to provide continuous illumination.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-green-300">Document every design decision</span>
              <p className="text-foreground mt-1">
                Reference the clause or risk finding that supports it. This documentation is essential for 
                compliance audits and future modifications.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-green-300">Keep assessment with logbook</span>
              <p className="text-foreground mt-1">
                Keep a copy of the risk assessment with the emergency lighting logbook for inspection. 
                Inspectors will want to verify that the design matches the assessed risks.
              </p>
            </div>
          </li>
        </ul>

        <div className="bg-elec-yellow/20 border border-elec-yellow/30 rounded-lg p-4 mt-6">
          <p className="text-elec-yellow font-medium">
            <span className="font-bold">Pro Tip:</span> Create a one-page summary linking each major design 
            decision to the relevant risk assessment finding. This makes audits much smoother and demonstrates 
            professional competence.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
