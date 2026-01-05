import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Wifi, Radio, Bluetooth } from 'lucide-react';
import PairingBestPracticesQuickCheck from '@/components/upskilling/smart-home/PairingBestPracticesQuickCheck';

const DevicePairingSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-elec-yellow" />
            Device Pairing Procedures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Devices connect to hubs or apps via different wireless protocols. Each device type has a specific pairing method that must be followed precisely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Wifi className="h-5 w-5 text-blue-400" />
                <span className="font-medium text-foreground">Wi-Fi Devices</span>
              </div>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Download manufacturer app</li>
                <li>• Hold reset button (usually 5-10 seconds)</li>
                <li>• Follow app pairing wizard</li>
                <li>• Enter Wi-Fi credentials</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Radio className="h-5 w-5 text-green-400" />
                <span className="font-medium text-foreground">Zigbee/Z-Wave</span>
              </div>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Put hub in inclusion mode</li>
                <li>• Activate device pairing mode</li>
                <li>• Wait for hub discovery</li>
                <li>• Confirm successful pairing</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Bluetooth className="h-5 w-5 text-purple-400" />
                <span className="font-medium text-foreground">Bluetooth</span>
              </div>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Enable Bluetooth on phone/tablet</li>
                <li>• Put device in pairing mode</li>
                <li>• Select from available devices</li>
                <li>• Enter PIN if required</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-5 w-5 bg-orange-400 rounded text-black text-xs flex items-center justify-center font-bold">QR</span>
                <span className="font-medium text-foreground">QR Code Pairing</span>
              </div>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Open manufacturer app</li>
                <li>• Select "Add Device"</li>
                <li>• Scan QR code on device</li>
                <li>• Follow setup wizard</li>
              </ul>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Best Practice Guidelines</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Pair devices one at a time</strong> to avoid confusion and conflicts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Label devices clearly</strong> in the app immediately after pairing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Test each device</strong> immediately after pairing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Record device IDs</strong> for future reference and documentation
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <PairingBestPracticesQuickCheck />
    </div>
  );
};

export default DevicePairingSection;