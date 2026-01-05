import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, AlertTriangle, Ruler, Map, Building } from 'lucide-react';

export const EmergencyLightingContent2_1 = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray/30 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Emergency Escape Lighting Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-elec-yellow" />
              Fundamental Purpose
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                Emergency escape lighting must provide adequate illumination to enable safe evacuation 
                from any point within a building to the final exit or a place of safety.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 rounded-lg p-4">
                  <h4 className="text-foreground font-medium mb-2">Primary Functions:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Illuminate escape routes and exits</li>
                    <li>• Enable identification of direction changes</li>
                    <li>• Highlight potential hazards on escape routes</li>
                    <li>• Provide sufficient light for safe movement</li>
                  </ul>
                </div>
                <div className="bg-elec-dark/50 rounded-lg p-4">
                  <h4 className="text-foreground font-medium mb-2">Coverage Areas:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• All escape routes and corridors</li>
                    <li>• Stairways and ramps</li>
                    <li>• Changes in direction or level</li>
                    <li>• Final exits and exit doors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Ruler className="h-4 w-4 text-elec-yellow" />
              Illuminance Requirements
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 rounded-lg p-4">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow mb-2">Escape Routes</Badge>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">1 lux minimum</p>
                    <p className="text-gray-300 text-sm">At floor level on centre line of escape route</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 rounded-lg p-4">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow mb-2">High Risk Areas</Badge>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">15 lux minimum</p>
                    <p className="text-gray-300 text-sm">For potentially dangerous areas or processes</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 rounded-lg p-4">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow mb-2">Uniformity Ratio</Badge>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">40:1 maximum</p>
                    <p className="text-gray-300 text-sm">Between maximum and minimum levels</p>
                  </div>
                </div>
              </div>
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-2">Additional Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <p><strong>Duration:</strong> Minimum 1 hour for most premises</p>
                    <p><strong>Response Time:</strong> Full output within 5 seconds</p>
                  </div>
                  <div>
                    <p><strong>Height:</strong> Measured at floor level</p>
                    <p><strong>Width:</strong> Full width of escape route</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Map className="h-4 w-4 text-elec-yellow" />
              Spacing and Positioning
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-foreground font-medium mb-2">Maximum Spacing:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• <strong>Corridors:</strong> 2 x mounting height</li>
                      <li>• <strong>Open areas:</strong> 4 x mounting height</li>
                      <li>• <strong>High ceiling areas:</strong> Special calculations required</li>
                    </ul>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-foreground font-medium mb-2">Mandatory Positions:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Near every exit door</li>
                      <li>• At changes in direction</li>
                      <li>• At intersections of corridors</li>
                      <li>• Near each change in floor level</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-foreground font-medium mb-2">Installation Heights:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• <strong>Minimum:</strong> 2m above floor level</li>
                      <li>• <strong>Maximum:</strong> 3m in escape routes</li>
                      <li>• <strong>Wall mounting:</strong> 0.2m from ceiling</li>
                    </ul>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-foreground font-medium mb-2">Special Considerations:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Stairwell lighting at each level</li>
                      <li>• External escape routes coverage</li>
                      <li>• Disabled refuge areas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Building className="h-4 w-4 text-elec-yellow" />
              Application by Building Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">Offices & Commercial</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Open plan office areas</li>
                  <li>• Circulation routes</li>
                  <li>• Stairwells and lifts</li>
                  <li>• Reception areas</li>
                </ul>
              </div>
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">Healthcare Facilities</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Patient areas (2-hour duration)</li>
                  <li>• Operating theatres</li>
                  <li>• Corridors and wards</li>
                  <li>• Emergency departments</li>
                </ul>
              </div>
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">Educational Buildings</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Classrooms and lecture halls</li>
                  <li>• Corridors and stairwells</li>
                  <li>• Assembly halls</li>
                  <li>• Laboratories</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};