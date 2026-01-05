import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle } from 'lucide-react';

export const BMSModule7Section2Summary = () => {
  const keyPoints = [
    "Function blocks provide a graphical way to program BMS logic using standardised building blocks",
    "Boolean logic underpins digital decisions using AND, OR, NOT operations for reliable control",
    "PID loops stabilise variables such as temperature, pressure, and flow through proportional, integral, and derivative control",
    "Electricians support programming by verifying wiring, testing physical responses, and checking fail-safes during commissioning"
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
          This section covered the fundamental programming methods used in BMS systems:
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
            <strong>Remember:</strong> Understanding BMS programming methods helps electricians support commissioning, 
            identify potential issues, and ensure systems operate safely and efficiently. The electrician's role in 
            verifying programmed functions is critical for successful project delivery.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};