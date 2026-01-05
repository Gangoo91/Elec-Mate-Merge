import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const SmartHomeModule5Section5Summary = () => {
  const summaryPoints = [
    "Lighting scenes group multiple lights for convenience, security, or emergencies with automated activation",
    "Security integration allows lighting to deter intruders and assist CCTV monitoring through coordinated responses", 
    "Emergency scenes can guide occupants safely and provide visual alerts during critical situations",
    "Proper electrical infrastructure and network reliability are essential for scene functionality", 
    "Electricians play a key role in wiring, programming, testing, and ensuring regulatory compliance"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">
          Key takeaways from Linking with Lighting and Emergency Scenes:
        </p>
        
        <div className="space-y-3">
          {summaryPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm">{point}</p>
            </div>
          ))}
        </div>

        <div className="bg-elec-yellow/10 p-4 rounded-lg border border-elec-yellow/30 mt-6">
          <h4 className="text-elec-yellow font-semibold mb-2">Safety First Principle</h4>
          <p className="text-foreground text-sm">
            While smart lighting integration provides significant benefits for convenience, security, and 
            emergency response, it must never compromise basic electrical safety standards or replace 
            required emergency lighting systems. Always ensure compliance with building regulations 
            and provide reliable manual overrides for critical safety functions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};