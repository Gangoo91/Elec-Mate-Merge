import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Settings, Cpu } from 'lucide-react';

export const SmartHomeModule6Section1Intro = () => {
  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Introduction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">
          Smart homes rely on a central "hub" to connect devices, manage automation, and provide remote access. Without a hub (or hub-like system), devices risk becoming isolated or incompatible. Hubs act as the translator between different communication protocols like Zigbee, Z-Wave, Wi-Fi, and Bluetooth.
        </p>
        
        <p className="text-foreground leading-relaxed">
          For electricians, understanding hub types is essential — it helps you advise clients on system design, troubleshoot installations, and future-proof setups.
        </p>

        {/* Key Points Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Network className="h-6 w-6 text-blue-400" />
              <h4 className="font-semibold text-foreground">Protocol Translation</h4>
            </div>
            <p className="text-foreground text-sm">
              Hubs connect different protocols (Zigbee, Z-Wave, Wi-Fi) into one ecosystem
            </p>
          </div>
          
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-foreground">Central Control</h4>
            </div>
            <p className="text-foreground text-sm">
              Provides unified management for all smart devices and automation rules
            </p>
          </div>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Cpu className="h-6 w-6 text-purple-400" />
              <h4 className="font-semibold text-foreground">Remote Access</h4>
            </div>
            <p className="text-foreground text-sm">
              Enables cloud connectivity for remote monitoring and control via apps
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};