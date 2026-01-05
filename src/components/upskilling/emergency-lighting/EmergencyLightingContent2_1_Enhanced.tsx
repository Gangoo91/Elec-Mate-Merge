import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, AlertTriangle, Ruler, Map, Building, Calculator, CheckSquare, Users, Clock, Lightbulb, Zap, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EmergencyLightingContent2_1_Enhanced = () => {
  return (
    <div className="space-y-8">
      {/* Technical Requirements Overview */}
      <Card className="bg-elec-gray border-elec-gray">
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
              Fundamental Purpose & Legal Framework
            </h3>
            <div className="space-y-4 text-elec-light">
              <p className="leading-relaxed">
                Emergency escape lighting must provide adequate illumination to enable safe evacuation 
                from any point within a building to the final exit or a place of safety. This requirement 
                is mandated under BS 5266-1:2016 and forms part of the Building Regulations Approved Document B.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-gray/50 rounded-lg p-4 border border-elec-gray">
                  <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-elec-yellow" />
                    Primary Functions:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Illuminate escape routes and exits clearly</li>
                    <li>• Enable identification of direction changes</li>
                    <li>• Highlight potential hazards on escape routes</li>
                    <li>• Provide sufficient light for safe movement</li>
                    <li>• Assist emergency services during rescue operations</li>
                  </ul>
                </div>
                <div className="bg-elec-gray/50 rounded-lg p-4 border border-elec-gray">
                  <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
                    <Map className="h-4 w-4 text-elec-yellow" />
                    Coverage Areas:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• All escape routes and corridors</li>
                    <li>• Stairways, ramps and level changes</li>
                    <li>• Changes in direction or floor level</li>
                    <li>• Final exits and intermediate exits</li>
                    <li>• Refuge areas and assembly points</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Illuminance Standards */}
      <Card className="bg-elec-gray border-elec-gray">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Ruler className="h-5 w-5 text-elec-yellow" />
            Illuminance Standards & Calculations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-elec-yellow" />
                <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">Standard Routes</Badge>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-lg text-elec-yellow">1 lux minimum</p>
                <p className="text-sm text-gray-300">At floor level on centre line of escape route</p>
              </div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">High Risk Areas</Badge>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-lg text-orange-400">15 lux minimum</p>
                <p className="text-sm text-gray-300">For potentially dangerous areas or processes</p>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-blue-400" />
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Uniformity Ratio</Badge>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-lg text-blue-400">40:1 maximum</p>
                <p className="text-sm text-gray-300">Between maximum and minimum levels</p>
              </div>
            </div>
          </div>

          <div className="bg-elec-gray/50 rounded-lg p-6 border border-elec-gray">
            <h4 className="text-foreground font-medium mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              Performance Requirements:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-foreground">Duration Standards:</p>
                <p className="text-gray-300">• Standard premises: 1 hour minimum</p>
                <p className="text-gray-300">• Healthcare facilities: 2-3 hours</p>
                <p className="text-gray-300">• Sleeping accommodation: 8 hours</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Response Time:</p>
                <p className="text-gray-300">• Full output within 5 seconds</p>
                <p className="text-gray-300">• 50% output within 1 second</p>
                <p className="text-gray-300">• Instant for high-risk areas</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Coverage Area:</p>
                <p className="text-gray-300">• Full width of escape route</p>
                <p className="text-gray-300">• Measured at floor level</p>
                <p className="text-gray-300">• Include potential obstructions</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Environmental:</p>
                <p className="text-gray-300">• Operating temperature range</p>
                <p className="text-gray-300">• Humidity considerations</p>
                <p className="text-gray-300">• Vibration resistance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Spacing and Design */}
      <Card className="bg-elec-gray border-elec-gray">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Map className="h-5 w-5 text-elec-yellow" />
            Advanced Spacing & Design Calculations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-elec-gray/50 rounded-lg p-4 border border-elec-gray">
                <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-elec-yellow" />
                  Spacing Calculations:
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Corridors (narrow):</span>
                    <span className="font-mono text-foreground">2 × mounting height</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Open areas:</span>
                    <span className="font-mono text-foreground">4 × mounting height</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">High ceiling areas:</span>
                    <span className="font-mono text-foreground">Special calculations</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Stairwells:</span>
                    <span className="font-mono text-foreground">Each level + landings</span>
                  </div>
                </div>
              </div>

              <div className="bg-elec-gray/50 rounded-lg p-4 border border-elec-gray">
                <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-elec-yellow" />
                  Mandatory Positions:
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Within 2m of every exit door</li>
                  <li>• At each change in direction &gt; 45°</li>
                  <li>• At intersections of corridors</li>
                  <li>• Near each change in floor level</li>
                  <li>• At top and bottom of each stairway</li>
                  <li>• At refuge areas and assembly points</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-elec-gray/50 rounded-lg p-4 border border-elec-gray">
                <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-elec-yellow" />
                  Installation Heights & Mounting:
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-300">Minimum height:</span>
                    <span className="font-mono text-foreground">2.0m above floor</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-300">Maximum height:</span>
                    <span className="font-mono text-foreground">3.0m in escape routes</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-300">Wall mounting:</span>
                    <span className="font-mono text-foreground">0.2m from ceiling</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-300">Ceiling mounting:</span>
                    <span className="font-mono text-foreground">Clear of obstructions</span>
                  </div>
                </div>
              </div>

              <div className="bg-elec-gray/50 rounded-lg p-4 border border-elec-gray">
                <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-elec-yellow" />
                  Special Considerations:
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Stairwell lighting at each level</li>
                  <li>• External escape routes coverage</li>
                  <li>• Disabled refuge areas (enhanced)</li>
                  <li>• Lift car emergency lighting</li>
                  <li>• Plant room emergency egress</li>
                  <li>• Basement and underground areas</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Building-Specific Applications */}
      <Card className="bg-elec-gray border-elec-gray">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            Building-Specific Applications & Case Studies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-elec-gray/50 rounded-lg p-6 border border-elec-gray">
              <h4 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Offices & Commercial
              </h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Standard Requirements:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Open plan office areas: 1 lux</li>
                    <li>• Circulation routes: 1 lux</li>
                    <li>• Stairwells: Enhanced coverage</li>
                    <li>• Reception areas: 1 lux minimum</li>
                  </ul>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded p-3 text-elec-yellow text-xs">
                  <strong>Case Study:</strong> 20-storey office building requiring 1-hour duration, 
                  with enhanced stairwell coverage and refuge areas on every 5th floor.
                </div>
              </div>
            </div>

            <div className="bg-elec-gray/50 rounded-lg p-6 border border-elec-gray">
              <h4 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Healthcare Facilities
              </h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Enhanced Requirements:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Patient areas: 2-3 hour duration</li>
                    <li>• Operating theatres: 15 lux minimum</li>
                    <li>• Corridors and wards: 1 lux</li>
                    <li>• Emergency departments: Enhanced</li>
                  </ul>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded p-3 text-elec-yellow text-xs">
                  <strong>Case Study:</strong> 300-bed hospital with 3-hour battery backup, 
                  central monitoring system, and generator backup integration.
                </div>
              </div>
            </div>

            <div className="bg-elec-gray/50 rounded-lg p-6 border border-elec-gray">
              <h4 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Educational Buildings
              </h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Occupancy Considerations:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Classrooms: 1 lux + exit indicators</li>
                    <li>• Corridors: Enhanced during class times</li>
                    <li>• Assembly halls: Coordinated systems</li>
                    <li>• Laboratories: 15 lux for chemical areas</li>
                  </ul>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded p-3 text-elec-yellow text-xs">
                  <strong>Case Study:</strong> Secondary school with 1,200 pupils requiring 
                  coordinated emergency lighting and fire alarm integration.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};