
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ProtectiveConductorLearningOutcomes = () => {
  const outcomes = [
    "Explain how to test continuity of protective conductors",
    "Identify where and how continuity should be verified", 
    "Understand acceptable resistance values and test methods",
    "Recognise when CPC continuity testing is required",
    "Apply proper testing procedures for bonding conductors"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4 text-sm sm:text-base">
          By the end of this section, you will be able to:
        </p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3 text-foreground">
              <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                {index + 1}
              </span>
              <span className="leading-relaxed text-sm sm:text-base">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
