import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const BMSModule5Section5Summary = () => {
  const keyPoints = [
    "Gateways act as translators between protocols like BACnet, Modbus, KNX, and DALI",
    "They enable full system integration, future-proofing, and cost savings",
    "Electricians install gateways in panels, wire each protocol correctly, and ensure addressing and power are set",
    "Good documentation and testing are critical for reliable operation"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">
          This section covered the essential role of gateways in modern building management systems:
        </p>
        
        <div className="space-y-3">
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-foreground">{point}</span>
            </div>
          ))}
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-elec-yellow mb-2">Key Takeaway for Electricians</h4>
          <p className="text-foreground text-sm">
            Gateways are the backbone of modern integrated building systems. Your role in proper installation, 
            wiring, and documentation directly impacts the reliability and performance of the entire BMS. 
            Remember: good electrical work at the gateway level enables seamless data flow throughout the building.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};