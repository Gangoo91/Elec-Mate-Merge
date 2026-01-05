import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle } from 'lucide-react';

export const EmergencyLightingPracticalSection3_2 = () => {
  const practicalPoints = [
    "Always walk the escape route during design to identify points requiring extra luminaires",
    "Place fittings close to potential hazards such as steps, ramps, or door thresholds",
    "In large buildings, check for obstructions (e.g. partitions, shelving) that may block line of sight to signs or lighting",
    "Avoid over-reliance on general lighting — escape route lighting must activate automatically during mains failure",
    "Document placement decisions in the emergency lighting layout drawing for inspection"
  ];

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <div className="space-y-4">
          <p className="text-gray-300">
            Real-world installation tips for effective escape route lighting coverage:
          </p>
          
          <ul className="space-y-3">
            {practicalPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
            <p className="text-elec-yellow font-medium">
              Professional Tip: Use a lux meter to verify coverage at floor level along the entire route. 
              Design calculations don't account for real-world obstructions that may create shadows.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};