import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const BMSModule7Section3Summary = () => {
  const summaryPoints = [
    "Addressing gives each device a unique identity in the network",
    "Mapping links physical I/O signals to their BMS software representations", 
    "Methods vary by protocol: BACnet (Device IDs), Modbus (numeric addresses), KNX (line.device)",
    "Electricians ensure addresses are unique, labelled, and tested, and that mapping matches the IO list",
    "Poor addressing or mapping causes delays, incorrect data, and major commissioning headaches"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <div className="space-y-4">
          {summaryPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-gradient-to-r from-elec-yellow/10 to-orange-500/10 border border-elec-yellow/30 rounded-lg p-4">
          <p className="text-foreground font-medium">
            Remember: Proper addressing and mapping are the foundation of reliable BMS communication. 
            Take time to get this right during installation to avoid costly commissioning delays.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};