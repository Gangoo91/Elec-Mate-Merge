import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const BMSModule5Section1Summary = () => {
  const keyPoints = [
    "Communication protocols are the \"languages\" devices use to share data",
    "Open protocols like BACnet, Modbus, and KNX enable interoperability. Proprietary protocols can restrict integration",
    "Electricians play a key role by wiring buses correctly, ensuring terminations, and preventing interference",
    "Good documentation and labelling make commissioning smoother and prevent downtime"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-gray-400">
          Key takeaways from this section on BMS communication protocols:
        </p>
        
        <div className="space-y-3">
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{point}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-elec-yellow/10 to-orange-500/10 border border-elec-yellow/20 rounded-lg p-4 mt-6">
          <h4 className="text-foreground font-semibold mb-2">Remember</h4>
          <p className="text-sm text-gray-300">
            While you don't need to configure protocols, proper electrical installation is critical 
            for reliable BMS communication. Follow wiring standards, maintain polarity, ensure proper 
            termination, and keep detailed documentation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};