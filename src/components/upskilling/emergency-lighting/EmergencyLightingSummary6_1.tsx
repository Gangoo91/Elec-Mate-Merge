import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const EmergencyLightingSummary6_1 = () => {
  const keyPoints = [
    "BS 5266-1 and EN 1838 form the foundation of emergency lighting compliance in the UK",
    "BS 5266-1 covers design, installation, and maintenance; EN 1838 defines performance criteria",
    "Minimum illuminance: 1 lux on escape routes, 0.5 lux in open areas, 15 lux in high-risk task areas",
    "Duration must be at least 1 hour (typical) or 3 hours for public and high-risk buildings",
    "Documentation and standards referencing are as critical as physical system performance",
    "Clause 10 of BS 5266-1 defines inspection and testing requirements linked to BS 5266-8",
    "Non-compliance can result in prosecution under the Fire Safety Order 2005"
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
