import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sun, Droplets, Thermometer } from 'lucide-react';

export const EnvironmentalProtectionSection = () => {
  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Sun className="h-5 w-5 text-elec-yellow" />
          Environmental Protection Requirements
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-green-600 text-foreground">Environmental Resilience</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Code Reference: BS 7671:2018+A2:2022 Section 512.2</h5>
          <p className="text-sm">External influences and selection of equipment - Environmental conditions</p>
        </div>

        <div className="grid gap-6">
          {/* UV Protection */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="h-4 w-4 text-orange-400" />
              <h5 className="text-orange-400 font-semibold">UV Radiation Protection</h5>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Cable Selection:</h6>
                <ul className="text-sm space-y-1">
                  <li>• XLPE (Cross-linked polyethylene) insulation</li>
                  <li>• PVC with UV stabilisers for temporary installations</li>
                  <li>• LSF (Low Smoke and Fume) compounds preferred</li>
                  <li>• Black outer sheath for maximum UV resistance</li>
                  <li>• Minimum 20-year UV stability rating</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Protective Measures:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Conduit systems with UV-stable materials</li>
                  <li>• Cable trays with protective covers</li>
                  <li>• Underground installation where feasible</li>
                  <li>• Regular inspection and replacement schedules</li>
                  <li>• UV-resistant cable ties and fixings</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-orange-900/20 border border-orange-600/50 rounded">
              <p className="text-orange-200 text-sm">
                <strong>Critical Note:</strong> Standard PVC cables can degrade within 2-3 years under direct sunlight, leading to insulation failure and potential fire hazards.
              </p>
            </div>
          </div>

          {/* Moisture Protection */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="h-4 w-4 text-blue-400" />
              <h5 className="text-blue-400 font-semibold">Moisture and Water Ingress Protection</h5>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">IP Rating Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• IP44 minimum for protected outdoor locations</li>
                  <li>• IP55 for exposed outdoor installations</li>
                  <li>• IP65 for high-pressure washing areas</li>
                  <li>• IP67 for temporary immersion areas</li>
                  <li>• IP68 for permanent submersion applications</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Sealing Methods:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Gland entries with appropriate sealing</li>
                  <li>• Gasket seals on all access covers</li>
                  <li>• Drainage holes in lowest points</li>
                  <li>• Weatherproof cable joints and terminations</li>
                  <li>• Condensation management systems</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Installation Practices:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Drip loops on all external cables</li>
                  <li>• Sloped mounting to prevent water pooling</li>
                  <li>• Adequate clearance from ground level</li>
                  <li>• Protected cable entry points</li>
                  <li>• Regular maintenance access provisions</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-600/50 rounded">
              <p className="text-blue-200 text-sm">
                <strong>Testing Requirement:</strong> All enclosures must undergo IP testing verification as per BS EN 60529 before commissioning.
              </p>
            </div>
          </div>

          {/* Temperature Protection */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="h-4 w-4 text-red-400" />
              <h5 className="text-red-400 font-semibold">Temperature Variation Management</h5>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">UK Climate Considerations:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Ambient temperature range: -20°C to +35°C</li>
                  <li>• Solar heating effects up to +70°C</li>
                  <li>• Frost protection requirements</li>
                  <li>• Thermal cycling stress management</li>
                  <li>• Expansion joint provisions</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Protection Methods:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Insulated enclosures for extreme conditions</li>
                  <li>• Ventilation systems for heat dissipation</li>
                  <li>• Heating elements for frost protection</li>
                  <li>• Thermal barriers and shading</li>
                  <li>• Temperature monitoring systems</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-red-900/20 border border-red-600/50 rounded">
              <p className="text-red-200 text-sm">
                <strong>Derating Requirements:</strong> Cable current-carrying capacity must be derated by up to 20% for high ambient temperature installations.
              </p>
            </div>
          </div>

          {/* Mechanical Protection */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h5 className="text-elec-yellow font-semibold mb-3">Mechanical Impact Protection</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-green-400 font-medium mb-2">IK Rating Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• IK07 minimum for accessible locations</li>  
                  <li>• IK08 for agricultural machinery areas</li>
                  <li>• IK09 for vehicle impact zones</li>
                  <li>• IK10 for extreme impact environments</li>
                  <li>• Protective barriers where appropriate</li>
                </ul>
              </div>
              <div>
                <h6 className="text-green-400 font-medium mb-2">Installation Methods:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Underground cable routes where possible</li>
                  <li>• Armoured cables for exposed runs</li>
                  <li>• Concrete or steel protective covers</li>
                  <li>• Height restrictions in accessible areas</li>
                  <li>• Warning signs and barrier systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};