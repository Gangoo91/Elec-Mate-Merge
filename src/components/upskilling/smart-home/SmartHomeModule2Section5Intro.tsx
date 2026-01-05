import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDot } from 'lucide-react';

export const SmartHomeModule2Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CircleDot className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Smart homes can be built around a <strong className="text-foreground">hub-based ecosystem</strong> (where a central device manages communication) or a <strong className="text-foreground">hubless system</strong> (where devices connect directly, usually via Wi-Fi). Each approach has advantages and trade-offs in cost, reliability, scalability, and security.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-blue-900/10 border border-blue-600/20 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Hub-Based Systems</h4>
            <p className="text-blue-100 text-sm">Central device coordinates all smart home communication, providing local control and protocol bridging capabilities.</p>
          </div>
          
          <div className="p-4 bg-purple-900/10 border border-purple-600/20 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">Hubless Systems</h4>
            <p className="text-purple-100 text-sm">Devices connect directly to Wi-Fi or cloud services without requiring a central coordination hub.</p>
          </div>
        </div>

        <p>
          Installers must understand these differences to design systems that fit client needs and future expansion plans.
        </p>
      </CardContent>
    </Card>
  );
};