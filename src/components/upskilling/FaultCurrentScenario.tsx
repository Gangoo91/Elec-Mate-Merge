import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FaultCurrentScenario = () => {
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
            <p className="text-foreground">
              You install a new distribution board with 6kA-rated MCBs and skip the PSC test to save time. Several months later, a short circuit occurs in the installation. The fault current reaches 8kA, exceeding the MCB breaking capacity. The MCB fails catastrophically, causing an explosion and fire that damages the entire electrical room.
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-md">
            <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              The Solution
            </h4>
            <p className="text-foreground">
              Always confirm fault current does not exceed device capacity. PSC testing would have revealed the need for 10kA-rated devices or the installation of current-limiting devices to reduce fault levels. This simple test could have prevented a catastrophic failure.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <h4 className="text-elec-yellow font-semibold mb-2">Critical Consequences</h4>
            <ul className="space-y-2 text-foreground">
              <li>• MCB explosion can cause fires and serious injuries</li>
              <li>• Continued arcing during device failure increases damage</li>
              <li>• Insurance claims may be rejected due to non-compliance</li>
              <li>• Legal liability for inadequate protective device selection</li>
              <li>• Complete installation shutdown and expensive remedial work</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};