import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const SmartHomeModule7Section3Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-6 w-6 text-elec-yellow" />
          Introduction  
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-base leading-relaxed">
          Smart home devices rely heavily on wireless communication. Whether through Wi-Fi, Zigbee, Z-Wave, or other RF (radio frequency) protocols, weak or unreliable signals can cause devices to drop offline, delay responses, or fail completely.
        </p>
        
        <p className="text-gray-300 text-base leading-relaxed">
          For electricians, testing and verifying wireless coverage is just as important as wiring — because the system is only as strong as its connectivity. This section covers signal testing, optimisation techniques, and troubleshooting wireless issues.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-2">Wireless Communication Protocols</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-2 bg-[#1a1a1a] rounded">
              <span className="font-medium text-foreground">Wi-Fi:</span>
              <span className="text-gray-300 ml-2">2.4GHz/5GHz networks</span>
            </div>
            <div className="p-2 bg-[#1a1a1a] rounded">
              <span className="font-medium text-foreground">Zigbee:</span>
              <span className="text-gray-300 ml-2">Mesh network protocol</span>
            </div>
            <div className="p-2 bg-[#1a1a1a] rounded">
              <span className="font-medium text-foreground">Z-Wave:</span>
              <span className="text-gray-300 ml-2">900MHz mesh network</span>
            </div>
            <div className="p-2 bg-[#1a1a1a] rounded">
              <span className="font-medium text-foreground">Bluetooth:</span>
              <span className="text-gray-300 ml-2">Short-range connections</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section3Intro;