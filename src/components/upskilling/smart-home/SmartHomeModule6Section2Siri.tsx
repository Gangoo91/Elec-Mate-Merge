import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Smartphone, Lock } from 'lucide-react';
import { SiriQuickCheck } from './SiriQuickCheck';

export const SmartHomeModule6Section2Siri = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-elec-yellow text-elec-dark w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">4</span>
            Apple Siri (via HomeKit) Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-foreground leading-relaxed">
            Apple's HomeKit ecosystem, controlled through Siri, prioritises security and privacy above all else, making it the preferred choice for clients who value data protection and seamless Apple device integration.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <Shield className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Security First Approach</h4>
                <p className="text-foreground text-sm mb-3">
                  All HomeKit communication uses end-to-end encryption. Device control data never leaves the local network unless specifically authorised.
                </p>
                <p className="text-foreground text-sm">
                  <strong>Advantage:</strong> Commands like "Turn off the lights" are processed locally on the Apple TV or HomePod hub, not in the cloud.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <Smartphone className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Apple Ecosystem Integration</h4>
                <p className="text-foreground text-sm mb-3">
                  Seamlessly works with iPhones, iPads, Apple Watches, and Macs. The Home app provides unified control across all Apple devices.
                </p>
                <p className="text-foreground text-sm">
                  <strong>Benefit:</strong> Clients can control their home using Siri from any Apple device, with settings synced via iCloud.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <Lock className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Limited Device Compatibility</h4>
                <p className="text-foreground text-sm mb-3">
                  Only Apple-certified "Works with HomeKit" devices are compatible. This limits choice and often increases costs.
                </p>
                <p className="text-foreground text-sm">
                  <strong>Challenge:</strong> Many popular smart home brands don't offer HomeKit versions, requiring alternative solutions or bridges.
                </p>
              </div>
            </div>
          </div>

          {/* HomeKit Requirements */}
          <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-3">HomeKit Setup Requirements:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-foreground mb-2">Hub Device</h5>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• Apple TV (4th gen or newer)</li>
                  <li>• HomePod or HomePod mini</li>
                  <li>• iPad (for remote access)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Compatible Devices</h5>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• Must have "Works with HomeKit" certification</li>
                  <li>• Thread or Wi-Fi connectivity preferred</li>
                  <li>• Some Zigbee devices via bridges</li>
                </ul>
              </div>
            </div>
          </div>

          {/* When to Recommend HomeKit */}
          <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-3">Ideal for Clients Who:</h4>
            <div className="space-y-2">
              <p className="text-foreground text-sm">✓ Already use multiple Apple devices (iPhone, iPad, Mac)</p>
              <p className="text-foreground text-sm">✓ Prioritise privacy and security over device variety</p>
              <p className="text-foreground text-sm">✓ Are willing to pay premium prices for certified products</p>
              <p className="text-foreground text-sm">✓ Want local processing without cloud dependencies</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <SiriQuickCheck />
    </div>
  );
};