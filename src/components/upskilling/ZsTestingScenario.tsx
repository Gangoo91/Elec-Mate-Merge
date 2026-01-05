import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ZsTestingScenario = () => {
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
              You test Zs at a socket near the distribution board, and it passes comfortably at 0.8Ω. Feeling confident, you skip testing at the end of the circuit to save time. Later, a fault occurs at the furthest socket—where the actual Zs is 2.5Ω—and the MCB fails to disconnect quickly enough.
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-md">
            <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              The Solution
            </h4>
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Always test at the furthest point—not the easiest. The impedance increases with distance from the supply, so testing near the DB gives a false sense of security. Only by testing at the worst-case location can you ensure protection throughout the entire circuit.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <h4 className="text-elec-yellow font-semibold mb-2">Why This Matters</h4>
            <ul className="space-y-1 sm:space-y-2 text-foreground text-sm sm:text-base leading-relaxed">
              <li>• Cable resistance increases with length—Zs rises along the circuit</li>
              <li>• Connection resistance can accumulate at junction boxes and accessories</li>
              <li>• The point furthest from supply has highest impedance</li>
              <li>• Testing near the DB can mask problems at circuit extremities</li>
              <li>• BS7671 requires verification at the furthest point for this reason</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};