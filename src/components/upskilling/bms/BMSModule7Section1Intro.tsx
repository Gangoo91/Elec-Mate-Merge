import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Zap } from 'lucide-react';

export const BMSModule7Section1Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Before a Building Management System (BMS) is installed and commissioned, it must be designed and documented properly. 
          A strong design phase avoids costly mistakes on-site, ensures devices are correctly integrated, and provides a clear 
          roadmap for electricians, engineers, and commissioning teams.
        </p>
        <p>
          This section covers the three key deliverables of BMS design: IO (Input/Output) Lists — a complete register of all 
          signals the system must handle; Schematics — diagrams showing how devices are connected electrically and logically; 
          and Network Topology — how devices are arranged and connected across communication networks.
        </p>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Design Foundation</h4>
              <p className="text-sm text-foreground">
                Proper design documentation ensures successful installation, commissioning, and long-term operation. 
                Get the design phase right, and the entire project runs smoothly.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};