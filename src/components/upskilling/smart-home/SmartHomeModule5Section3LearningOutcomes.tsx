import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const SmartHomeModule5Section3LearningOutcomes = () => {
  const outcomes = [
    "Explain how door/window contact sensors work",
    "Describe PIR sensors and typical placements", 
    "Recognise benefits and limitations of both sensors",
    "Install and configure for reliable detection",
    "Integrate sensors into wider smart home systems"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">
          By the end of this section, learners will be able to:
        </p>
        
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <Badge 
                variant="secondary" 
                className="bg-elec-yellow text-elec-dark hover:bg-yellow-500 font-bold text-xs px-2 py-1 mt-1 flex-shrink-0"
              >
                {index + 1}
              </Badge>
              <div className="flex items-start gap-2 flex-1">
                <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-foreground">{outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};