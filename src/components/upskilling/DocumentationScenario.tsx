
import { Wrench, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DocumentationScenario = () => {
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
          <p className="text-foreground leading-relaxed text-base sm:text-lg">
            You arrive at a commercial premises for a periodic inspection. The client says they have "all the paperwork somewhere" but can't locate the original installation certificates or design drawings. They want you to proceed immediately as they have business operations to maintain.
          </p>
        </div>
        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <p className="text-green-200 font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Correct Approach:
          </p>
          <p className="text-foreground leading-relaxed text-base sm:text-lg">
            <strong className="text-foreground">Explain the limitations.</strong> Without proper documentation, you cannot verify original design intent or compliance. Proceed with a comprehensive visual inspection, document everything you find, and clearly state limitations in your report. Quote additional time for creating as-built drawings if needed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
