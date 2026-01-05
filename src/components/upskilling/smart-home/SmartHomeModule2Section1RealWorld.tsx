import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Camera, Radio, Wifi } from 'lucide-react';

export const SmartHomeModule2Section1RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Smart Security System Installation</h4>
          
          <p className="text-gray-300 mb-4">
            An installer is fitting a smart security system in a large house. The system needs to handle different types of devices with varying requirements for power, data, and range.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-[#1a1a1a] border border-purple-600 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="h-4 w-4 text-purple-400" />
                <h5 className="font-medium text-purple-200">Security Cameras</h5>
              </div>
              <div className="text-sm space-y-1">
                <div><span className="text-gray-400">Protocol:</span> <span className="text-foreground">Wi-Fi</span></div>
                <div><span className="text-gray-400">Reason:</span> <span className="text-gray-300">High bandwidth for video streaming</span></div>
                <div><span className="text-gray-400">Power:</span> <span className="text-gray-300">Mains powered (continuous operation)</span></div>
              </div>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-blue-600 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="h-4 w-4 text-blue-400" />
                <h5 className="font-medium text-blue-200">Motion Sensors & Door Contacts</h5>
              </div>
              <div className="text-sm space-y-1">
                <div><span className="text-gray-400">Protocol:</span> <span className="text-foreground">Zigbee</span></div>
                <div><span className="text-gray-400">Reason:</span> <span className="text-gray-300">Low power, mesh networking</span></div>
                <div><span className="text-gray-400">Power:</span> <span className="text-gray-300">Battery powered (1-2 year life)</span></div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded">
            <h5 className="font-medium text-foreground mb-2">Why This Mixed Approach Works</h5>
            <ul className="space-y-1 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                <span>Cameras get the bandwidth they need for clear video streams</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                <span>Battery sensors last years without maintenance</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                <span>Zigbee mesh ensures sensors work even in distant rooms</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                <span>System operates reliably without network congestion</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span>💭</span>
            Discussion Question
          </h4>
          <p className="text-gray-300 font-medium mb-2">
            Why wouldn't Wi-Fi be suitable for all the devices in this installation?
          </p>
          <div className="text-sm text-gray-400">
            Consider power consumption, network bandwidth, and device management...
          </div>
        </div>

        <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Answer Considerations</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-red-200 mb-2">Wi-Fi Limitations for Sensors</h5>
              <ul className="space-y-1 text-red-100">
                <li>• High power drain = frequent battery changes</li>
                <li>• Network congestion with many devices</li>
                <li>• Router dependency for all communications</li>
                <li>• More complex setup and management</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-200 mb-2">Zigbee Benefits for Sensors</h5>
              <ul className="space-y-1 text-green-100">
                <li>• Ultra-low power = years of battery life</li>
                <li>• Mesh creates redundant communication paths</li>
                <li>• Dedicated low-bandwidth network</li>
                <li>• Self-organising and self-healing</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};