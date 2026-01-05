import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Bluetooth, Wifi, Radio, Zap } from 'lucide-react';

export const SmartLockBasicsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          What are Smart Locks?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="space-y-4">
          <p>
            <strong className="text-foreground">Smart locks</strong> are electronic locks controlled via app, keypad, biometrics, or key fob. They replace or retrofit traditional mechanical locks, offering enhanced security, convenience, and integration with smart home systems.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                Key Features
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Electronic control mechanisms</li>
                <li>• Mobile app integration</li>
                <li>• Multiple access methods</li>
                <li>• Battery-powered operation</li>
                <li>• Physical key backup</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Popular Examples</h4>
              <div className="space-y-2">
                <Badge variant="outline" className="border-blue-600 text-blue-300 mr-2">Yale Linus</Badge>
                <Badge variant="outline" className="border-green-600 text-green-300 mr-2">August Smart Lock</Badge>
                <Badge variant="outline" className="border-purple-600 text-purple-300 mr-2">Nuki</Badge>
                <Badge variant="outline" className="border-orange-600 text-orange-300">Schlage Encode</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6">
          <h4 className="font-semibold text-foreground mb-4">Connectivity Options</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-blue-600">
              <Bluetooth className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <h5 className="font-medium text-blue-200 text-sm">Bluetooth</h5>
              <p className="text-xs text-blue-100 mt-1">Short range, low power</p>
            </div>
            
            <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-green-600">
              <Wifi className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <h5 className="font-medium text-green-200 text-sm">Wi-Fi</h5>
              <p className="text-xs text-green-100 mt-1">Internet connectivity</p>
            </div>
            
            <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-purple-600">
              <Radio className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <h5 className="font-medium text-purple-200 text-sm">Zigbee</h5>
              <p className="text-xs text-purple-100 mt-1">Mesh networking</p>
            </div>
            
            <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-orange-600">
              <Radio className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <h5 className="font-medium text-orange-200 text-sm">Z-Wave</h5>
              <p className="text-xs text-orange-100 mt-1">Low interference</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};