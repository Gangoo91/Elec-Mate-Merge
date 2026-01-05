import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';

export const WhatIsRoomZoningSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Home className="h-5 w-5 text-elec-yellow" />
          What is Room Zoning?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Room zoning involves dividing a property into independent heating zones, where each zone has its own thermostat or actuator. This allows precise control over different areas of the building.
        </p>
        
        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">How It Works</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Each zone has independent temperature control
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Systems can heat occupied rooms while leaving others off
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Reduces wasted energy in unused spaces
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Allows different temperature preferences per room
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-elec-gray border border-blue-600 rounded">
            <h5 className="font-medium text-blue-200 text-sm mb-1">Living Areas</h5>
            <p className="text-xs text-blue-100">21°C during day</p>
          </div>
          <div className="text-center p-3 bg-elec-gray border border-green-600 rounded">
            <h5 className="font-medium text-green-200 text-sm mb-1">Bedrooms</h5>
            <p className="text-xs text-green-100">18°C during day, 16°C at night</p>
          </div>
          <div className="text-center p-3 bg-elec-gray border border-purple-600 rounded">
            <h5 className="font-medium text-purple-200 text-sm mb-1">Spare Rooms</h5>
            <p className="text-xs text-purple-100">15°C or off when unused</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};