import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const SmartHomeSection4LearningOutcomes = () => {
  const outcomes = [
    "Define local, cloud, and hybrid smart home architectures",
    "Compare the advantages and disadvantages of each architectural model",
    "Explain how latency, reliability, and security differ across system types",
    "Recognise when to use each architecture based on project needs and constraints",
    "Identify common platforms and technologies that use each approach",
    "Evaluate trade-offs between ease of use, performance, and privacy",
    "Understand the role of edge computing in future smart home systems"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300">
        <p className="mb-4">By the end of this section, learners will be able to:</p>
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