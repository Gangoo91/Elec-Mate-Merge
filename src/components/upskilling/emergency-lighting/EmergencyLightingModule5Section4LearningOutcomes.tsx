import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

export const EmergencyLightingModule5Section4LearningOutcomes = () => {
  const outcomes = [
    "Explain the purpose of system labelling in emergency lighting installations",
    "Identify what must be labelled (circuits, fittings, distribution boards, test points)",
    "Maintain accurate logbooks and service records",
    "Recognise the role of documentation in legal compliance and fire inspections",
    "Apply best practice in labelling and record-keeping for ongoing system safety"
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
        <p className="text-foreground text-sm sm:text-base lg:text-lg mb-4">
          By completing this section, you will be able to:
        </p>
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-foreground text-sm sm:text-base lg:text-lg flex-1 pt-0.5">
                {outcome}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
