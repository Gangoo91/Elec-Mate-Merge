import { Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule2Section4LearningOutcomes = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4 text-foreground">By the end of this section, learners will be able to:</p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-foreground">Define interference and explain its impact on wireless smart home systems.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-foreground">Describe how channels are used to separate wireless signals.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-foreground">Compare bandwidth requirements for different device types.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-foreground">Identify common causes of interference in homes.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-foreground">Apply strategies to reduce interference and optimise bandwidth.</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};