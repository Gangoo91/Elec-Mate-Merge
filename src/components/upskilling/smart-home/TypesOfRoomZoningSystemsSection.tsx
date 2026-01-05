import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export const TypesOfRoomZoningSystemsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Types of Room Zoning Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Different zoning approaches suit different heating systems and installation requirements. The choice depends on the existing infrastructure and client needs.
        </p>
        
        <div className="space-y-4">
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Radiator-Based Zoning</h4>
            <p className="text-blue-100 text-sm mb-2">Smart TRVs (Thermostatic Radiator Valves) control each radiator individually.</p>
            <div className="text-xs text-blue-100">
              <strong>Example:</strong> Tado Smart TRVs, Honeywell Evohome TRVs
            </div>
          </div>
          
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Duct/Vent-Based Zoning</h4>
            <p className="text-green-100 text-sm mb-2">Motorised dampers in ducts control airflow to different zones.</p>
            <div className="text-xs text-green-100">
              <strong>Common in:</strong> HVAC systems, forced air heating
            </div>
          </div>
          
          <div className="bg-elec-gray border border-purple-600 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">Manifold Zoning (Underfloor Heating)</h4>
            <p className="text-purple-100 text-sm mb-2">Actuators on underfloor heating circuits control flow to different zones.</p>
            <div className="text-xs text-purple-100">
              <strong>Best for:</strong> New builds, renovations with UFH
            </div>
          </div>
          
          <div className="bg-elec-gray border border-orange-600 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Wired Zoning Panels</h4>
            <p className="text-orange-100 text-sm mb-2">Central panels with multiple thermostat inputs for comprehensive control.</p>
            <div className="text-xs text-orange-100">
              <strong>Suitable for:</strong> Commercial installations, complex systems
            </div>
          </div>
          
          <div className="bg-elec-gray border border-red-600 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-3">Wireless Zoning</h4>
            <p className="text-red-100 text-sm mb-2">Radio frequency/Z-Wave linked sensors and actuators.</p>
            <div className="text-xs text-red-100">
              <strong>Advantage:</strong> Easy retrofit, flexible placement
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};