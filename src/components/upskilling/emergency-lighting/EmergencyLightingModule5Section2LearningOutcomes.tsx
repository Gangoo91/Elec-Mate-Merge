import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Target } from 'lucide-react';

export const EmergencyLightingModule5Section2LearningOutcomes = () => {
  const outcomes = [
    "Explain the purpose of functional testing in emergency lighting systems",
    "Carry out both short functional tests and full 3-hour duration tests in accordance with BS 5266-1 and BS EN 50172",
    "Recognise how test frequency differs between commissioning, monthly checks, and annual testing",
    "Identify common faults that occur during testing and how to rectify them",
    "Document and record test results correctly in the emergency lighting logbook"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Target className="h-6 w-6 text-elec-yellow" />
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
