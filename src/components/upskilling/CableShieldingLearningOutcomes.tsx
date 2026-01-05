import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CableShieldingLearningOutcomes = () => {
  const outcomes = [
    "Understand the differences between UTP, FTP, and STP cable construction",
    "Identify when to use shielded versus unshielded cables in different environments",
    "Recognise the importance of proper grounding for shielded cables",
    "Understand electromagnetic interference sources and mitigation strategies",
    "Compare performance characteristics and cost implications of different cable types",
    "Apply correct installation practices for shielded and unshielded systems"
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
        <p className="mb-4 text-gray-300">
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