
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CommonDefectsIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          This section builds your visual checklist. Knowing what to spot—and where to look—can prevent you from energising an unsafe or illegal installation.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Understanding common visual defects helps you develop a systematic approach to inspection, ensuring you don't miss critical safety issues that could lead to injury, equipment damage, or regulatory non-compliance.
        </p>
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <p className="text-red-200 font-medium">
            Remember: Visual defects often indicate deeper issues. Don't ignore seemingly minor problems as they could be symptoms of more serious underlying faults.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
