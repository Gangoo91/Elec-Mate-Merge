import { Zap, Battery, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingIntroSection3 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Types of Emergency Lighting Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Emergency lighting systems come in various configurations, each designed for specific applications and building requirements. Understanding these different types is essential for selecting the most appropriate system for your installation.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 rounded-lg shadow-md">
            <h4 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
              <Battery className="h-4 w-4 text-green-400" />
              Power Supply Types
            </h4>
            <p className="text-gray-300 text-sm">
              Central battery systems vs self-contained units, each offering distinct advantages for different applications.
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-500/40 rounded-lg shadow-md">
            <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
              <Settings className="h-4 w-4 text-purple-400" />
              Operating Modes
            </h4>
            <p className="text-gray-300 text-sm">
              Maintained, non-maintained, and sustained systems with different activation and operational characteristics.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};