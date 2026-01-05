import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule4Section1Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Smart thermostats are the entry point for most smart heating systems. Unlike traditional thermostats that control heating for the whole house, smart thermostats and room zoning systems allow precise control of temperature by room or zone. This improves comfort, reduces energy use, and integrates with wider smart home systems.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-elec-gray border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Smart Thermostats</h4>
            <p className="text-blue-100 text-sm">Electronic devices allowing app/voice/web-based temperature control with enhanced scheduling and integration features.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">Room Zoning</h4>
            <p className="text-green-100 text-sm">Dividing properties into independent heating zones, each with its own thermostat or actuator for optimised control.</p>
          </div>
        </div>

        <p>
          This section explores how installers can implement smart heating solutions that provide superior comfort and energy efficiency compared to traditional single-zone systems.
        </p>
      </CardContent>
    </Card>
  );
};