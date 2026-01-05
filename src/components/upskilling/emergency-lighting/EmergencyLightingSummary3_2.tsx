import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const EmergencyLightingSummary3_2 = () => {
  const keyPoints = [
    "Escape routes require 1 lux minimum along the centre line with specific placement at exits, stairs, direction changes, and fire points",
    "Routes wider than 2m must be treated as both escape routes and open areas, requiring additional anti-panic lighting",
    "Exit signage and luminaires must be integrated - incorrect directional arrows are a common compliance failure",
    "Physical site surveys are essential to identify obstructions and hazards that may affect coverage",
    "Documentation of placement decisions is crucial for inspection and maintenance purposes"
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
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};