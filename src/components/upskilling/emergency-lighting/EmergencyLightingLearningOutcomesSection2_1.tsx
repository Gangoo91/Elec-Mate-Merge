import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection2_1 = () => {
  const outcomes = [
    "Understand the fundamental purpose and legal requirements for emergency escape lighting",
    "Identify different types of escape routes and their specific lighting requirements", 
    "Calculate minimum illuminance levels and uniformity ratios for escape routes",
    "Determine correct spacing and positioning of escape route luminaires",
    "Apply BS 5266 requirements for different building types and occupancies",
    "Design escape lighting systems for corridors, stairways, and exit areas",
    "Specify appropriate luminaire types for different escape route environments",
    "Understand maintenance requirements and testing procedures for escape lighting"
  ];

  return (
    <Card className="bg-elec-gray border-elec-gray">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-elec-light mb-4">
          By the end of this section, you will be able to:
        </p>
        <div className="grid grid-cols-1 gap-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <span className="text-elec-light text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};