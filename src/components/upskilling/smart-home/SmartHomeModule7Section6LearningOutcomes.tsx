import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

const SmartHomeModule7Section6LearningOutcomes = () => {
  const outcomes = [
    "Explain the importance of proper documentation in smart home projects",
    "List the types of records that must be provided to clients",
    "Outline warranty conditions and responsibilities for installers and manufacturers",
    "Advise clients on aftercare, maintenance, and support options",
    "Create comprehensive handover documentation packages",
    "Understand BS 7671 documentation requirements for electrical installations",
    "Establish professional aftercare and support service structures",
    "Protect against liability through proper record keeping and compliance"
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

export default SmartHomeModule7Section6LearningOutcomes;