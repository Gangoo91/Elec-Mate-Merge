import { Building2, MapPin, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const EmergencyLightingRealWorld2_1 = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Application: Office Complex Escape Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-elec-dark rounded-lg p-4 border border-gray-600">
          <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Scenario: 3-Storey Office Building
          </h4>
          <p className="text-gray-300 text-sm mb-4">
            A modern office complex with multiple escape routes, stairwells, and long corridors 
            requires comprehensive emergency escape lighting to ensure safe evacuation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="text-foreground font-medium">Design Requirements:</h5>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Corridor width: 1.8m</li>
                <li>• Ceiling height: 2.7m</li>
                <li>• Total escape route: 45m</li>
                <li>• 2 stairwells (enclosed)</li>
                <li>• 6 fire exits total</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="text-foreground font-medium">Solution Applied:</h5>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Luminaires every 5.4m (2 × height)</li>
                <li>• LED bulkheads: 3W, 150 lumens</li>
                <li>• Exit signs at all doors</li>
                <li>• Directional signs at junctions</li>
                <li>• Central battery system used</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-elec-dark rounded-lg p-4 border border-gray-600 text-center">
            <Lightbulb className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
            <h5 className="text-foreground font-medium">Illumination Level</h5>
            <p className="text-2xl font-bold text-elec-yellow">1.2 lux</p>
            <p className="text-xs text-gray-400">Exceeds 1 lux minimum</p>
          </div>
          <div className="bg-elec-dark rounded-lg p-4 border border-gray-600 text-center">
            <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30 mb-2">
              Uniformity Ratio
            </Badge>
            <p className="text-2xl font-bold text-green-400">25:1</p>
            <p className="text-xs text-gray-400">Within 40:1 limit</p>
          </div>
          <div className="bg-elec-dark rounded-lg p-4 border border-gray-600 text-center">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30 mb-2">
              Spacing
            </Badge>
            <p className="text-2xl font-bold text-blue-400">5.4m</p>
            <p className="text-xs text-gray-400">Based on 2.7m ceiling</p>
          </div>
        </div>

        <div className="bg-elec-dark rounded-lg p-4 border border-gray-600">
          <h5 className="text-elec-yellow font-medium mb-3">Key Design Considerations:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h6 className="text-foreground font-medium mb-2">Positioning Strategy:</h6>
              <ul className="space-y-1">
                <li>• Luminaires mounted at 2.4m height</li>
                <li>• Maximum spacing of 5.4m maintained</li>
                <li>• Additional fittings at direction changes</li>
                <li>• Exit signs visible from 15m distance</li>
              </ul>
            </div>
            <div>
              <h6 className="text-foreground font-medium mb-2">Compliance Achieved:</h6>
              <ul className="space-y-1">
                <li>• BS 5266-1 illuminance requirements met</li>
                <li>• Building Regulations Part B satisfied</li>
                <li>• Fire Risk Assessment recommendations</li>
                <li>• 3-hour duration battery backup provided</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};