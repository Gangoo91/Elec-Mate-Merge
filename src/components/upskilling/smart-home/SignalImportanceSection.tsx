import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Signal, AlertCircle } from 'lucide-react';
import SignalImpactQuickCheck from '@/components/upskilling/smart-home/SignalImpactQuickCheck';

const SignalImportanceSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Signal className="h-6 w-6 text-elec-yellow" />
            Importance of Signal Strength
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Smart devices rely on constant connectivity for control and automation. Poor wireless signals are the root cause of many smart home reliability issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">Strong Signal Benefits</h4>
              <ul className="space-y-1 text-green-100 text-sm">
                <li>• Instant response to commands</li>
                <li>• Reliable automation triggers</li>
                <li>• Consistent status updates</li>
                <li>• Stable mesh network performance</li>
                <li>• Reduced power consumption</li>
              </ul>
            </div>

            <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
              <h4 className="font-semibold text-red-200 mb-2">Weak Signal Problems</h4>
              <ul className="space-y-1 text-red-100 text-sm">
                <li>• Delayed or missed commands</li>
                <li>• Devices appearing "offline"</li>
                <li>• Failed automation sequences</li>
                <li>• Intermittent connectivity</li>
                <li>• Increased battery drain</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-elec-yellow" />
              Common Interference Sources
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Physical Barriers</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Thick walls (stone, brick)</li>
                  <li>• Metal structures</li>
                  <li>• Large appliances</li>
                  <li>• Multiple floors</li>
                </ul>
              </div>

              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Electronic Interference</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Microwave ovens</li>
                  <li>• Baby monitors</li>
                  <li>• Cordless phones</li>
                  <li>• Bluetooth devices</li>
                </ul>
              </div>

              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Network Congestion</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Neighbouring Wi-Fi networks</li>
                  <li>• Too many connected devices</li>
                  <li>• Heavy bandwidth usage</li>
                  <li>• Outdated router hardware</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">RF Mesh Networks</h4>
            <p className="text-gray-300 text-sm mb-2">
              Zigbee and Z-Wave create self-healing mesh networks where devices relay signals to each other:
            </p>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Each powered device acts as a signal repeater</li>
              <li>• Network automatically finds best signal paths</li>
              <li>• More devices generally improve overall coverage</li>
              <li>• Battery devices don't repeat signals (to preserve power)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <SignalImpactQuickCheck />
    </div>
  );
};

export default SignalImportanceSection;