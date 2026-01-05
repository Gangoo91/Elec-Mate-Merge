import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Check } from 'lucide-react';

export const SmartHomeModule5Section2LearningOutcomes = () => {
  const outcomes = [
    "Identify different CCTV camera types and their uses",
    "Explain what resolution means and compare common standards",
    "Describe storage options (local, network, cloud) and their pros/cons",
    "Recognise integration features like motion alerts and AI detection",
    "Recommend appropriate CCTV setups for domestic and commercial sites"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Target className="h-6 w-6 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">
          By the end of this section, learners will be able to:
        </p>
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs px-2 py-1 mt-0.5">
                {index + 1}
              </Badge>
              <div className="flex items-start gap-2 flex-1">
                <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">{outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};