import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection4_2 = () => {
  const outcomes = [
    "Describe the principles of self-contained and central battery emergency lighting systems",
    "Compare the advantages and disadvantages of each system type",
    "Identify the types of buildings best suited to each system architecture",
    "Explain the installation and maintenance implications of both system types",
    "Ensure system choice aligns with BS 5266-1 requirements and client needs"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground">Learning Outcomes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">By completing this section, you will be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-foreground leading-relaxed">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
