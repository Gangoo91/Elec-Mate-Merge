
import { Wrench, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CommonDefectsScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <p className="text-blue-200 font-medium mb-2">Scenario:</p>
          <p className="text-gray-300">
            You inspect a new socket and see that the CPC is loose in the terminal. Everything else looks fine.
          </p>
        </div>
        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <p className="text-green-200 font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Answer:
          </p>
          <p className="text-gray-300">
            <strong className="text-foreground">That socket fails visual inspection</strong>—a loose CPC means the circuit is unsafe and must not be energised.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
