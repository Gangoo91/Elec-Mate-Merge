import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

export const BMSModule5Section2RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">The University BACnet Project</h4>
          <p className="text-foreground text-sm">
            On a large university campus project, electricians installed BACnet MSTP controllers for all HVAC plant 
            across multiple buildings. The initial installation covered 15 buildings with over 200 controllers.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-4">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4" />
              The Problem
            </h4>
            <p className="text-foreground text-sm mb-2">
              Several MSTP controllers were experiencing intermittent communication failures, causing:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Loss of temperature control in lecture halls</p>
              <p className="text-foreground">• Inability to monitor energy consumption</p>
              <p className="text-foreground">• Failed alarms not reaching the central system</p>
              <p className="text-foreground">• Frustrated facilities management team</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Root Cause Analysis</h4>
            <p className="text-foreground text-sm mb-2">
              Investigation revealed that several controllers were wired in a star formation rather than a proper 
              daisy chain. Additionally:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Termination resistors were missing on some segments</p>
              <p className="text-foreground">• Cable shields were connected at both ends causing ground loops</p>
              <p className="text-foreground">• Some segments exceeded the 127 device limit</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4" />
              The Solution
            </h4>
            <p className="text-foreground text-sm mb-2">
              The network was rewired according to proper RS-485 standards:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• All star connections converted to daisy-chain topology</p>
              <p className="text-foreground">• 120Ω termination resistors installed at segment ends</p>
              <p className="text-foreground">• Shield connections corrected (earth at one end only)</p>
              <p className="text-foreground">• Large segments split to stay under device limits</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4" />
              Lesson Learned
            </h4>
            <p className="text-foreground text-sm">
              Physical wiring discipline is just as important as the protocol itself. Even sophisticated BACnet 
              systems will fail if basic electrical installation practices aren't followed. The project was 
              delayed by 3 weeks and cost an additional £15,000 to rectify.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Key Takeaway</h4>
          <p className="text-foreground text-sm">
            This experience highlights why electricians must understand BACnet network requirements. 
            Proper training and adherence to installation standards would have prevented the entire issue.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};