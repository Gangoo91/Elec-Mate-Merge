import { Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FaultCurrentIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Introduction to Prospective Fault Current Testing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-foreground">
          <p>
            PSC and PEFC testing tells you the highest possible current that could flow in a short-circuit or earth fault situation. This information is critical for ensuring that protective devices are appropriately rated and can safely interrupt fault currents.
          </p>
          <p>
            Understanding prospective fault current helps prevent dangerous situations where protective devices might fail during fault conditions due to inadequate breaking capacity. This could result in fire, explosion, or continued dangerous conditions.
          </p>
          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <p className="text-elec-yellow font-semibold">Safety Critical:</p>
            <p>Protective devices must have adequate breaking capacity to safely interrupt the maximum possible fault current at their point of installation.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};