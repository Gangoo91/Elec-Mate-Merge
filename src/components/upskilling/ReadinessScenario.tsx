
import { Wrench, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ReadinessScenario = () => {
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
            <p className="text-foreground">
              You're about to start insulation resistance testing and notice a smart lighting module connected to the circuit. It hasn't been disconnected.
            </p>
        </div>
        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <p className="text-green-200 font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Answer:
          </p>
          <p className="text-foreground">
            <strong className="text-foreground">Postpone the test.</strong> Disconnect or isolate sensitive equipment before proceeding, or risk causing damage and liability.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
