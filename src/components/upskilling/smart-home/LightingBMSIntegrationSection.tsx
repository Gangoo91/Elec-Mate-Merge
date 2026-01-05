import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Sun, Clock, Wifi } from 'lucide-react';

export const LightingBMSIntegrationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Lighting Integration in BMS
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          Lighting control through BMS enables centralised management of all lighting circuits, 
          occupancy sensing, and daylight harvesting systems. Integration uses specialised protocols 
          to communicate between lighting and other building systems.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              <h4 className="font-semibold text-foreground">Central Control</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• All lighting circuits managed centrally</li>
              <li>• Individual fixture addressability</li>
              <li>• Dimming and switching control</li>
              <li>• Emergency lighting integration</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="h-5 w-5 text-orange-400" />
              <h4 className="font-semibold text-foreground">Daylight Harvesting</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Automatic dimming based on daylight</li>
              <li>• Light sensors monitor conditions</li>
              <li>• Blind control integration</li>
              <li>• Energy savings optimisation</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-foreground">Scheduling</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Time-based lighting schedules</li>
              <li>• Occupancy-driven control</li>
              <li>• Scene management</li>
              <li>• After-hours override functions</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-foreground">Communication Protocols</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• <strong>DALI:</strong> Digital Addressable Lighting Interface</li>
              <li>• <strong>KNX:</strong> Building automation standard</li>
              <li>• <strong>BACnet:</strong> Building automation protocol</li>
              <li>• <strong>Modbus:</strong> Industrial communication protocol</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Integration Example:</h4>
          <p className="text-sm">
            When daylight sensors detect sufficient natural light, the BMS automatically dims artificial 
            lighting while simultaneously reducing HVAC cooling load, creating coordinated energy savings 
            across multiple building systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};