import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SmartHomeModule7Section1LearningOutcomes = () => {
  const outcomes = [
    "Identify the wiring requirements for typical smart home devices",
    "Understand the importance of selecting the correct power supply type and rating",
    "Explain the role of containment in protecting cables and maintaining safety",
    "Apply UK electrical standards to ensure compliance during installation"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-300 mb-4">
          By the end of this section, you should be able to:
        </p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section1LearningOutcomes;