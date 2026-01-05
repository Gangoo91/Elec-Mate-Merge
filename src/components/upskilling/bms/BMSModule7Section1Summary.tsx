import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle } from 'lucide-react';

export const BMSModule7Section1Summary = () => {
  const keyPoints = [
    "IO lists capture every input/output and form the backbone of BMS design",
    "Schematics show physical wiring and control sequences between devices", 
    "Network topology defines how devices communicate (bus, star, hybrid)",
    "Electricians support design integrity by following documentation and flagging inconsistencies"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-foreground mb-4">
          This section covered the essential design phase requirements for successful BMS installations:
        </p>
        <ul className="space-y-3">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="bg-gradient-to-r from-elec-yellow/10 to-orange-500/10 border border-elec-yellow/20 rounded-lg p-4 mt-4">
          <p className="text-sm text-foreground">
            <strong>Remember:</strong> Good design avoids missed devices, communication failures, and commissioning delays. 
            Taking time to get design documentation right will prevent costly problems and ensure project success.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};