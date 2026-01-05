import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertTriangle } from 'lucide-react';

export const BMSModule7Section3RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-red-300 font-semibold mb-2">Commercial Tower Block Project</h4>
              <p className="text-foreground mb-3">
                On a commercial tower block project, several Modbus submeters were left at their factory default address of "1." 
                When commissioning started, the BMS could only read one meter — the others clashed.
              </p>
              <p className="text-foreground mb-3">
                Electricians had to revisit every meter, assign unique addresses, and relabel them, delaying handover by two weeks.
              </p>
              <p className="text-foreground">
                Afterward, the contractor introduced a policy requiring address checks during installation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-green-300 font-semibold mb-2">Lesson Learned</h4>
          <p className="text-foreground">
            Always verify and set unique device addresses during installation, not during commissioning. 
            This prevents costly delays and ensures smooth handover.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};