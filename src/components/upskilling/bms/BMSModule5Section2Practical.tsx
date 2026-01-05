import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Cable, CheckCircle, AlertTriangle } from 'lucide-react';

export const BMSModule5Section2Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-3">
                <Cable className="h-4 w-4 text-elec-yellow" />
                Installing BACnet MSTP (RS-485)
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Use shielded twisted pair, 120Ω impedance cable</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Follow polarity: RS-485 is polarity-sensitive</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Fit 120Ω termination resistors at both ends</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Don't exceed 127 devices per segment</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Connect shields to earth at one end only</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4" />
                Common MSTP Mistakes
              </h4>
              <div className="space-y-1 text-sm">
                <p className="text-foreground">• Star wiring instead of daisy-chain</p>
                <p className="text-foreground">• Missing termination resistors</p>
                <p className="text-foreground">• Wrong cable type or impedance</p>
                <p className="text-foreground">• Polarity reversal</p>
                <p className="text-foreground">• Ground loops from multiple shield connections</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-3">
                <Cable className="h-4 w-4 text-elec-yellow" />
                Installing BACnet/IP
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Use Cat5e or higher Ethernet cable</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Keep BMS traffic separate from corporate IT</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Coordinate with IT for VLANs and addressing</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Label Ethernet drops clearly as "BMS"</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Test connectivity during commissioning</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-3">General Tips</h4>
              <div className="space-y-1 text-sm">
                <p className="text-foreground">• Provide clear as-built drawings</p>
                <p className="text-foreground">• Label each device with network type</p>
                <p className="text-foreground">• Avoid star wiring on RS-485</p>
                <p className="text-foreground">• Leave space for future expansion</p>
                <p className="text-foreground">• Document addressing schemes</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};