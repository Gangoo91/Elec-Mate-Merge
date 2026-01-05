import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cable, AlertTriangle, CheckCircle } from 'lucide-react';

export const BMSModule5Section2ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          MSTP Installation Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          BACnet MSTP (RS-485) installation requires specific cable types, termination, and wiring topology 
          to ensure reliable communication. Poor installation practices are the leading cause of MSTP failures.
        </p>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Cable Requirements</h4>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Use shielded twisted pair cable, 120Ω impedance</p>
              <p className="text-foreground">• Belden 9842 or equivalent (22 AWG, foil + braid shield)</p>
              <p className="text-foreground">• Maximum segment length: 1200m (4000ft)</p>
              <p className="text-foreground">• Keep away from mains power cables</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Termination & Topology</h4>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Fit 120Ω termination resistors at both ends of each segment</p>
              <p className="text-foreground">• Always daisy-chain devices — never use star wiring</p>
              <p className="text-foreground">• Maximum 127 devices per RS-485 segment</p>
              <p className="text-foreground">• Connect cable shields to earth at one end only</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4" />
              Common Mistakes
            </h4>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Star wiring instead of daisy-chain topology</p>
              <p className="text-foreground">• Missing or incorrect termination resistors</p>
              <p className="text-foreground">• Wrong cable type (unshielded or wrong impedance)</p>
              <p className="text-foreground">• Polarity reversal on RS-485 connections</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4" />
            Best Practices
          </h4>
          <div className="space-y-1 text-sm">
            <p className="text-foreground">• Label each device with its network address</p>
            <p className="text-foreground">• Provide clear as-built drawings showing cable routes</p>
            <p className="text-foreground">• Test continuity and polarity before energising</p>
            <p className="text-foreground">• Leave spare capacity in cable trays for future expansion</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};