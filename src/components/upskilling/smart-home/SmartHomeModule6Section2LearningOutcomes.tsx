import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const SmartHomeModule6Section2LearningOutcomes = () => {
  const outcomes = [
    "Explain how Alexa, Google Home, and Siri function in smart homes",
    "Understand the strengths and limitations of each platform",
    "Describe how to connect devices and hubs to voice assistants",
    "Recognise common issues when setting up integrations"
  ];

  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Learning Outcomes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-6">
          By the end of this section, you should be able to:
        </p>
        
        <div className="grid gap-4">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-elec-dark/50 rounded-lg border border-gray-600/30">
              <Badge variant="secondary" className="bg-elec-yellow text-elec-dark font-bold min-w-8 h-8 rounded-full flex items-center justify-center text-sm">
                {index + 1}
              </Badge>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};