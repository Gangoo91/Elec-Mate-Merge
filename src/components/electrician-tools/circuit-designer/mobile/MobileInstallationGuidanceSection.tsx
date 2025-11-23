import { Card, CardContent } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

interface MobileInstallationGuidanceSectionProps {
  circuit: any;
}

export const MobileInstallationGuidanceSection = ({ circuit }: MobileInstallationGuidanceSectionProps) => {
  // Check if we have installation guidance (either string or object)
  const hasGuidance = circuit.installationGuidance && (
    typeof circuit.installationGuidance === 'string' || 
    typeof circuit.installationGuidance === 'object'
  );
  
  if (!hasGuidance) {
    return (
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4 text-center text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">Installation Guidance</span>
          </div>
          <p className="text-muted-foreground">
            Installation guidance not yet available. Regenerate this circuit to get practical installation advice.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        Installation Guidance
      </h3>
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="text-sm leading-relaxed whitespace-pre-line text-foreground">
              {circuit.installationGuidance}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
