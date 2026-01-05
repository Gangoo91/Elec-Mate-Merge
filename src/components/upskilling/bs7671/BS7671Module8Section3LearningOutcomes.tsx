import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BS7671Module8Section3LearningOutcomes = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Amendment 3 Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4">By the end of this section, you will understand:</p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>The major changes introduced in Amendment 3 and their practical implications</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Enhanced cybersecurity requirements for smart electrical installations</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Updated AFDD requirements and expanded mandatory applications</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Advanced fire safety measures and enhanced cable performance requirements</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Prosumer installation updates including V2G and advanced energy management</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>How to implement Amendment 3 requirements in practical installation work</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section3LearningOutcomes;