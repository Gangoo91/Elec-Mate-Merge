import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const BMSModule4Section4LearningOutcomes = () => {
  const outcomes = [
    "Explain the role of shading, blinds, and façade systems in building performance",
    "Describe how these systems integrate with BMS for comfort and efficiency",
    "Recognise the electrician's responsibilities when installing motorised blinds and controls",
    "Apply best-practice wiring, positioning, and commissioning methods",
    "Understand solar tracking and daylight harvesting strategies",
    "Identify different types of façade automation technologies",
    "Implement safety and override systems for occupant control",
    "Coordinate shading systems with HVAC and lighting controls for optimal performance"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4">By the end of this section, you should be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};