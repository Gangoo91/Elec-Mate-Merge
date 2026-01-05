import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Zap } from 'lucide-react';

export const BMSModule7Section4Intro = () => {
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
          Once design documentation is complete, devices are wired, and addresses assigned, the next step is to upload 
          software to BMS controllers and configure them for operation. This stage translates the control logic (function 
          blocks, Boolean sequences, PID loops) into the hardware that actually runs the system.
        </p>
        <p>
          For electricians, the focus is on ensuring controllers are powered, connected, and communicating correctly so 
          software uploads and configuration go smoothly. A controller that is miswired, incorrectly addressed, or unstable 
          will fail during programming, wasting hours on site.
        </p>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Critical Success Factors</h4>
              <p className="text-sm text-foreground">
                Successful software deployment depends on stable power, correct wiring, proper addressing, and reliable 
                communication infrastructure. Electrical preparation is essential for smooth commissioning.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};