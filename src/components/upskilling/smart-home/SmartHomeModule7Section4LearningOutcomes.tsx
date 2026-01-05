import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

const SmartHomeModule7Section4LearningOutcomes = () => {
  const outcomes = [
    "Explain the importance of isolation before working on smart devices",
    "Apply BS 7671 requirements for safe working and circuit protection",
    "Identify risks associated with mixing low-voltage and mains circuits",
    "Carry out testing and verification for safety compliance",
    "Use proper isolation techniques including lock-off devices and proving units",
    "Understand RCD protection requirements for smart home installations",
    "Recognise earth continuity requirements in metal containment systems",
    "Document test results for compliance and warranty purposes"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4">By the end of this section, you should be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section4LearningOutcomes;