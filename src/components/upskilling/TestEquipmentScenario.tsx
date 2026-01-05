import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestEquipmentScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-md">
            <h4 className="text-red-400 font-semibold mb-2">⚠️ The Problem</h4>
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              You use damaged test leads with exposed metal for a Zs test and receive a serious electric shock due to an exposed probe tip making contact with your finger. The shock causes you to fall from a ladder, resulting in serious injury.
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-md">
            <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              The Solution
            </h4>
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Always inspect leads and follow GS38 standards. Use only properly maintained test equipment with finger barriers and fused probes. Never compromise on safety equipment—your life depends on it.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <h4 className="text-elec-yellow font-semibold mb-2">Safety Checklist</h4>
            <ul className="space-y-2 text-foreground text-sm sm:text-base">
              <li>• Visual inspection of all test equipment before use</li>
              <li>• Verify calibration certificates are current</li>
              <li>• Test equipment function on known live source</li>
              <li>• Wear appropriate PPE for the environment</li>
              <li>• Maintain three points of contact when working at height</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};