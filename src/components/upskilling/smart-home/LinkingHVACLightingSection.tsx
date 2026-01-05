import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, Users, Clock, Zap } from 'lucide-react';

export const LinkingHVACLightingSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Link2 className="h-5 w-5 text-elec-yellow" />
          Linking HVAC and Lighting Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          BMS enables sophisticated coordination between HVAC and lighting systems, creating 
          energy-efficient building operation through shared sensors, synchronized schedules, 
          and intelligent demand response.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-foreground">Occupancy-Based Control</h4>
            </div>
            <p className="text-sm mb-2">Shared occupancy sensors control both systems:</p>
            <ul className="text-xs space-y-1">
              <li>• Room unoccupied → lights off, HVAC setback</li>
              <li>• Presence detected → lights on, comfort temperature</li>
              <li>• Zone-based control for larger areas</li>
              <li>• Override capabilities for special events</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-foreground">Time Synchronization</h4>
            </div>
            <p className="text-sm mb-2">Coordinated scheduling reduces waste:</p>
            <ul className="text-xs space-y-1">
              <li>• Pre-occupancy warm-up with gradual lighting</li>
              <li>• Coordinated shutdown sequences</li>
              <li>• Weekend and holiday schedules</li>
              <li>• Seasonal adjustment programming</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-foreground">Demand Response</h4>
            </div>
            <p className="text-sm mb-2">Peak load management strategies:</p>
            <ul className="text-xs space-y-1">
              <li>• Lighting dims during peak tariff periods</li>
              <li>• HVAC setpoints adjusted simultaneously</li>
              <li>• Load shedding priority sequences</li>
              <li>• Grid signal response automation</li>
            </ul>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Example Integration:</h4>
            <p className="text-sm">
              A conference room's occupancy sensor triggers both lighting and HVAC. When the room 
              is vacant for 15 minutes, lights switch off and temperature setpoint changes from 
              21°C to 18°C, saving energy across both systems.
            </p>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Energy Savings:</h4>
            <p className="text-sm">
              Coordinated control typically achieves 15-25% greater energy savings compared to 
              independent system operation, with payback periods of 2-4 years in commercial 
              applications.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};