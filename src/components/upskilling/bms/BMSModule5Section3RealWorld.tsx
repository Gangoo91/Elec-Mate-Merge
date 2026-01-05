import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Factory, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

export const BMSModule5Section3RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Factory className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Factory BMS Upgrade: The Modbus Submeter Challenge</h4>
          <p className="text-foreground text-sm">
            During a factory BMS upgrade, electricians needed to install 25 Modbus submeters across three electrical 
            distribution boards to monitor energy consumption for different production lines and support areas.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-4">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4" />
              The Installation Error
            </h4>
            <p className="text-foreground text-sm mb-2">
              The electricians wired the 25 submeters in a star configuration from a central junction box, 
              thinking it would be easier to manage. This caused serious problems:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Intermittent communication with random meters dropping offline</p>
              <p className="text-foreground">• Inconsistent energy readings leading to billing disputes</p>
              <p className="text-foreground">• BMS alarms triggered by communication failures</p>
              <p className="text-foreground">• Production managers couldn't trust energy monitoring data</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Root Cause Analysis</h4>
            <p className="text-foreground text-sm mb-2">
              Investigation by the BMS contractor revealed multiple RS-485 network violations:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Star wiring created unterminated branches causing signal reflections</p>
              <p className="text-foreground">• No termination resistors installed at network ends</p>
              <p className="text-foreground">• Cable runs exceeded recommended lengths due to star topology</p>
              <p className="text-foreground">• Two meters accidentally configured with the same Modbus address</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4" />
              The Solution
            </h4>
            <p className="text-foreground text-sm mb-2">
              The entire Modbus network was rewired according to proper RS-485 standards:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• All meters rewired into proper daisy-chain topology</p>
              <p className="text-foreground">• 120Ω termination resistors installed at network ends</p>
              <p className="text-foreground">• Each meter assigned a unique Modbus address (1-25)</p>
              <p className="text-foreground">• Proper shielded twisted-pair cable used throughout</p>
              <p className="text-foreground">• Cable shields grounded at one end only</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Results After Correction</h4>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• 100% reliable communication with all 25 meters</p>
              <p className="text-foreground">• Accurate energy monitoring enabling cost allocation</p>
              <p className="text-foreground">• No communication alarms or system downtime</p>
              <p className="text-foreground">• Production teams gained confidence in energy data</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4" />
              Project Impact
            </h4>
            <p className="text-foreground text-sm">
              <strong>Cost of Error:</strong> The rewiring delayed commissioning by 1 week and cost an additional £8,000 in 
              labour and materials. <strong>Lesson:</strong> Following basic RS-485 installation rules from the start 
              would have prevented the entire issue and saved significant time and money.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Key Takeaway</h4>
          <p className="text-foreground text-sm">
            This experience highlights why understanding Modbus network requirements is crucial for electricians. 
            Simple protocols don't mean simple installation — proper electrical practices are essential for reliable operation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};