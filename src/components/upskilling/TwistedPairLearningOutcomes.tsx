import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TwistedPairLearningOutcomes = () => {
  const outcomes = [
    "Understand the basic construction and principles of twisted pair cables",
    "Explain why wires are twisted and how this reduces electromagnetic interference",
    "Identify different twisted pair categories (Cat5e, Cat6, Cat6A, Cat7, Cat8) and their specifications",
    "Compare performance characteristics including bandwidth, frequency, and distance limitations",
    "Understand TIA/EIA and ISO standards for twisted pair cabling",
    "Recognise installation best practices and testing requirements"
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
        <p className="text-gray-300 mb-4">
          By the end of this section, you will be able to:
        </p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-300">
              <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                {index + 1}
              </span>
              <span className="leading-relaxed">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};