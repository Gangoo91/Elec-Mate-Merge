import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EarthFaultLoopScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-md">
            <h4 className="text-red-400 font-semibold mb-2">⚠️ The Problem</h4>
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              You skip the Zs test on a socket circuit, assuming it's fine because the installation looks new. Later, a fault occurs when someone touches a faulty appliance, but the MCB doesn't trip quickly enough. The loop impedance was too high—the user receives an electric shock and is injured.
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-md">
            <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              The Solution
            </h4>
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Never assume compliance—Zs testing verifies disconnection effectiveness. Even new installations can have high resistance connections, incorrect cable sizing, or poor earthing arrangements that compromise safety.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <h4 className="text-elec-yellow font-semibold mb-2">Key Learning Points</h4>
            <ul className="space-y-1 sm:space-y-2 text-foreground text-sm sm:text-base leading-relaxed">
              <li>• Visual appearance doesn't guarantee electrical safety</li>
              <li>• Zs testing is mandatory for all final circuits</li>
              <li>• High Zs values can be caused by loose connections, undersized cables, or poor earthing</li>
              <li>• The consequences of inadequate earth fault protection can be fatal</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};