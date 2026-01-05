
import { Wrench, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const VisualInspectionScenario = () => {
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
            You go to test a lighting circuit and notice burn marks on a junction box. Do you proceed?
          </p>
        </div>
        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <p className="text-green-200 font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Answer:
          </p>
          <p className="text-gray-300">
            <strong className="text-foreground">No.</strong> Stop, investigate, and report it—this is exactly what visual inspection is for.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
