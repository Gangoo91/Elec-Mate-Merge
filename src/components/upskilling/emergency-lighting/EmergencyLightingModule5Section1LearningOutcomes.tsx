import { Card, CardContent } from '@/components/ui/card';
import { Target } from 'lucide-react';

export const EmergencyLightingModule5Section1LearningOutcomes = () => {
  const outcomes = [
    "Explain the purpose of initial inspection and verification",
    "List the pre-commissioning checks required by BS 5266 and BS 7671",
    "Carry out verification of wiring, cable types, and circuit protection",
    "Confirm correct luminaire operation before functional testing",
    "Document inspection results to support certification and handover"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <Target className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              Learning Outcomes
            </h2>
            <p className="text-base sm:text-lg text-foreground mb-4">
              By completing this section, you will be able to:
            </p>
            <ul className="space-y-3">
              {outcomes.map((outcome, index) => (
                <li key={index} className="flex gap-3 text-sm sm:text-base text-foreground">
                  <span className="text-elec-yellow font-bold flex-shrink-0">{index + 1}.</span>
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
