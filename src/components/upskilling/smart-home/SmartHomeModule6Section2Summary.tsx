import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle2 } from 'lucide-react';

export const SmartHomeModule6Section2Summary = () => {
  const keyPoints = [
    "Voice assistants act as interfaces for controlling devices and hubs",
    "Alexa: widest compatibility, cloud-heavy",
    "Google Home: best for Google ecosystem, strong AI voice recognition", 
    "Siri/HomeKit: most secure, limited compatibility, Apple-focused",
    "Electricians must ensure compatibility, setup, and client training for successful integration"
  ];

  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <FileText className="h-7 w-7 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">
          Voice assistants have become essential interfaces for smart home control, offering hands-free operation and improved accessibility.
        </p>

        {/* Key Points */}
        <div className="space-y-3">
          <h4 className="font-semibold text-elec-yellow">Key Points Covered:</h4>
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-elec-dark/50 rounded-lg border border-gray-600/30">
              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-foreground text-sm">{point}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};