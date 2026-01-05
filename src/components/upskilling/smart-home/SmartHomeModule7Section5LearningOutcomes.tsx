import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

const SmartHomeModule7Section5LearningOutcomes = () => {
  const outcomes = [
    "Explain the purpose of a smart home handover process",
    "Demonstrate how to walk a client through their app and system features", 
    "Identify key information that must be communicated during training",
    "Provide aftercare advice and set realistic expectations for system performance",
    "Structure an effective client training session for maximum confidence building",
    "Create user-friendly documentation and reference materials",
    "Handle client questions and concerns professionally during handover",
    "Establish clear support boundaries and contact procedures"
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

export default SmartHomeModule7Section5LearningOutcomes;