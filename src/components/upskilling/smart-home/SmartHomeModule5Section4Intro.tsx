import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, WifiIcon, CloudIcon } from 'lucide-react';

export const SmartHomeModule5Section4Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          One of the biggest advantages of smart home technology is the ability to monitor and control 
          devices from anywhere. Remote access allows homeowners to receive alerts, check system status, 
          and even control lighting, heating, or security systems directly from a smartphone or tablet. 
          For electricians, it's vital to understand how these systems connect, configure, and communicate 
          with cloud platforms.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-600/30">
            <WifiIcon className="h-6 w-6 text-blue-400 mb-2" />
            <h4 className="text-blue-400 font-semibold mb-2">Connectivity</h4>
            <p className="text-xs">Internet-based control via routers and cloud services</p>
          </div>
          
          <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/30">
            <Smartphone className="h-6 w-6 text-green-400 mb-2" />
            <h4 className="text-green-400 font-semibold mb-2">Mobile Control</h4>
            <p className="text-xs">Apps provide instant access to all connected devices</p>
          </div>
          
          <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-600/30">
            <CloudIcon className="h-6 w-6 text-purple-400 mb-2" />
            <h4 className="text-purple-400 font-semibold mb-2">Cloud Platform</h4>
            <p className="text-xs">Secure servers enable worldwide device management</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};