import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection4_3 = () => {
  const outcomes = [
    "State the required autonomy durations for different building types",
    "Explain how battery capacity is calculated for emergency lighting systems",
    "Apply correction factors for ageing, temperature, and efficiency",
    "Identify differences between self-contained battery sizing and central battery systems",
    "Ensure battery selection and sizing comply with UK standards"
  ];

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">By completing this section, you will be able to:</p>
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3 bg-elec-gray/30 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground">{outcome}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
