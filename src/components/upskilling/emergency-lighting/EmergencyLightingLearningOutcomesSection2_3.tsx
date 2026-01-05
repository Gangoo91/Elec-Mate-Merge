import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection2_3 = () => {
  const outcomes = [
    "Explain why high-risk task area lighting is necessary",
    "Identify workplaces and tasks that require high-risk task area lighting",
    "Apply design standards including required lux levels and uniformity", 
    "Install systems that provide reliable emergency illumination",
    "Test and maintain lighting to ensure continuous compliance and safety"
  ];

  return (
    <Card className="bg-gradient-to-br from-elec-gray/30 to-elec-gray/50 border-elec-yellow/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">
          By completing this section, you will be able to:
        </p>
        <div className="grid grid-cols-1 gap-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <span className="text-foreground text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};