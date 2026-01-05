import { Building2, CheckCircle, Info, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingRealWorldSection2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-400" />
          Real World Example: Office Complex Emergency Lighting Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        
        <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Project Brief
          </h4>
          <p className="text-sm mb-3">
            A 5-storey office complex with basement car park requires emergency lighting design. 
            The building includes open-plan offices, meeting rooms, reception areas, plant rooms, and multiple escape routes.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Location Assessment:</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
              <h5 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Mandatory Locations Identified
              </h5>
              <ul className="text-sm space-y-1">
                <li>• All stairways (5 floors)</li>
                <li>• Main corridors on each floor</li>
                <li>• Reception and lobby areas</li>
                <li>• All final exit doors</li>
                <li>• Lift cars and motor rooms</li>
                <li>• Plant and electrical rooms</li>
              </ul>
            </div>

            <div className="p-3 bg-amber-600/10 border border-amber-600/30 rounded">
              <h5 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Additional Requirements
              </h5>
              <ul className="text-sm space-y-1">
                <li>• Open offices &gt;60m² (floors 2-4)</li>
                <li>• Large conference rooms</li>
                <li>• Toilets exceeding 8m²</li>
                <li>• Basement car park routes</li>
                <li>• Fire alarm panel locations</li>
                <li>• Direction change points</li>
              </ul>
            </div>

          </div>

          <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded-lg">
            <h5 className="font-semibold text-purple-400 mb-2">Compliance Challenges Resolved</h5>
            <ul className="text-sm space-y-1">
              <li>• Complex escape route geometry required detailed luminaire spacing calculations</li>
              <li>• Basement car park needed enhanced illumination due to vehicle obstruction</li>
              <li>• Plant rooms required explosion-proof fittings due to fuel storage</li>
              <li>• Open-plan areas needed strategic placement to avoid desk shadows</li>
              <li>• Disabled refuge areas required enhanced 5 lux minimum illumination</li>
            </ul>
          </div>

          <div className="p-3 bg-slate-600/10 border border-slate-600/30 rounded">
            <h5 className="font-semibold text-slate-400 mb-2">Key Learning Point</h5>
            <p className="text-sm">
              Thorough building assessment using BS5266 location requirements ensures compliance. 
              Each building type and area has specific needs that must be identified during the design phase.
            </p>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};