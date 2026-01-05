import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection4_1 = () => {
  const outcomes = [
    "Identify suitable cable types for emergency lighting systems",
    "Explain the fire-resistance and performance requirements of emergency cables",
    "Apply best practices in installation to maintain integrity during fire conditions",
    "Recognise the differences between self-contained luminaire wiring and central battery system cabling",
    "Ensure compliance with BS 5266, BS 7671, and fire safety legislation"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">
          By completing this section, you will be able to:
        </p>
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{outcome}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
