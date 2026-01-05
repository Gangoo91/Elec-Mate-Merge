
import { Eye, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const VisualInspectionIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Eye className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          Visual inspection forms the cornerstone of electrical installation safety verification. It's the systematic examination of electrical installations using only your eyes—no instruments, no test equipment, just careful observation and professional judgement.
        </p>
        <p className="text-gray-300 leading-relaxed">
          This inspection must be completed before any electrical testing begins, as it can identify potentially dangerous conditions that could pose risks during testing or normal operation. Many serious faults can only be detected through visual inspection, making it an indispensable first step.
        </p>
        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <p className="text-yellow-200 font-medium">
            Remember: Visual inspection isn't just a formality—it's a critical safety procedure that can prevent accidents, equipment damage, and ensure compliance with BS 7671.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
