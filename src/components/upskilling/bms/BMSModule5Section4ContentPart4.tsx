import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Zap, Shield, TrendingUp } from 'lucide-react';

export const BMSModule5Section4ContentPart4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          KNX System Configuration & Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          While electricians don't typically program KNX systems, understanding addressing, performance characteristics, 
          and system limitations is crucial for proper installation and troubleshooting.
        </p>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-elec-yellow" />
              Device Addressing System
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-foreground font-medium">Physical Address:</p>
                <p className="text-foreground">• Format: Area.Line.Device (e.g., 1.2.15)</p>
                <p className="text-foreground">• Unique identifier for each device</p>
                <p className="text-foreground">• Set during commissioning with ETS software</p>
                <p className="text-foreground">• Cannot be duplicated within system</p>
              </div>
              <div className="space-y-2">
                <p className="text-foreground font-medium">Group Address:</p>
                <p className="text-foreground">• Format: Main.Middle.Sub (e.g., 1/2/3)</p>
                <p className="text-foreground">• Functional addressing for communication</p>
                <p className="text-foreground">• Multiple devices can share group addresses</p>
                <p className="text-foreground">• Up to 65,536 group addresses per system</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-elec-yellow" />
              Performance Characteristics
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground font-medium">Communication Speed:</p>
              <p className="text-foreground">• Bus speed: 9600 bits per second</p>
              <p className="text-foreground">• Telegram transmission: ~20-50ms typical</p>
              <p className="text-foreground">• Collision detection and retry mechanisms</p>
              
              <p className="text-foreground font-medium mt-2">System Capacity:</p>
              <p className="text-foreground">• Maximum 57,600 devices per complete system</p>
              <p className="text-foreground">• Practical installations typically 100-1000 devices</p>
              <p className="text-foreground">• Performance degrades with very large systems</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              System Security & Access
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• ETS software controls all programming and commissioning</p>
              <p className="text-foreground">• Device access protection prevents unauthorised changes</p>
              <p className="text-foreground">• Individual device passwords for sensitive functions</p>
              <p className="text-foreground">• System-level access control for different user roles</p>
              <p className="text-foreground">• Encrypted communication available with KNX Secure</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Installation Quality Impact</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium text-green-400">Good Installation Results In:</p>
              <p className="text-foreground">• Reliable communication</p>
              <p className="text-foreground">• Fast response times</p>
              <p className="text-foreground">• Easy troubleshooting and maintenance</p>
              <p className="text-foreground">• System longevity and stability</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-red-400">Poor Installation Causes:</p>
              <p className="text-foreground">• Intermittent device communication</p>
              <p className="text-foreground">• Slow or failed command execution</p>
              <p className="text-foreground">• Difficult fault diagnosis</p>
              <p className="text-foreground">• Premature system failures</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Integration Capabilities</h4>
          <div className="space-y-2 text-sm">
            <p className="text-foreground">• KNXnet/IP for integration with IT networks</p>
            <p className="text-foreground">• Web servers for browser-based control</p>
            <p className="text-foreground">• Mobile app connectivity via IP routers</p>
            <p className="text-foreground">• Cloud service integration for remote monitoring</p>
            <p className="text-foreground">• Open APIs for third-party software integration</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};