import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const EmergencyLightingSummary6_2 = () => {
  const keyPoints = [
    "The Regulatory Reform (Fire Safety) Order 2005 places legal duty on the Responsible Person to provide adequate emergency lighting",
    "Emergency lighting must operate independently of fire alarm systems but should integrate for coordinated functionality",
    "Fire risk assessments determine specific emergency lighting requirements for each building",
    "Fire Safety Strategy documents must explicitly reference emergency lighting provision and integration",
    "Fire alarm control panels and fire-fighting equipment must have minimum 5 lux emergency illumination",
    "Fire authorities have extensive enforcement powers including Prohibition Notices, Enforcement Notices, and prosecution",
    "Missing documentation is treated as non-compliance even if the physical system works correctly",
    "Care homes, hotels, and sleeping accommodation require 3-hour duration emergency lighting",
    "Electricians share professional liability for inadequate design or poor integration with fire safety systems",
    "Regular review of integration is required whenever fire risk assessments are updated or building changes occur"
  ];

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4">Key points from this section:</p>
        <ul className="space-y-3">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
