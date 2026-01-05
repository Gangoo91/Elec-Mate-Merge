import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export const EmergencyLightingCaseStudies2_4 = () => {
  return (
    <Card className="bg-elec-gray/50 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          Case Studies: Escape Route Lighting Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        {/* Case Study 1: Office Building */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">
            Case Study 1: Office Building Retrofit
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-400" />
                Initial Problems
              </h4>
              <ul className="space-y-2 text-foreground">
                <li>• Escape route lighting gaps in long corridors</li>
                <li>• Fire extinguisher locations poorly lit</li>
                <li>• Stairwell illumination insufficient</li>
                <li>• No lighting at direction changes</li>
                <li>• Exit signs not maintained type</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Solutions Implemented
              </h4>
              <ul className="space-y-2 text-foreground">
                <li>• Added luminaires every 20m in corridors</li>
                <li>• Enhanced lighting at fire equipment</li>
                <li>• Installed stair nosing illumination</li>
                <li>• Positioned lights at all junctions</li>
                <li>• Upgraded to maintained exit signs</li>
              </ul>
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-4">
            <p className="text-foreground">
              <strong>Result:</strong> Full BS 5266 compliance achieved with 25% reduction in evacuation time during fire drills.
            </p>
          </div>
        </div>

        {/* Case Study 2: Shopping Centre */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">
            Case Study 2: Shopping Centre Complex Route
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
              <p className="text-foreground">
                Multi-level shopping centre with complex escape routes, multiple tenant areas, and varying ceiling heights requiring comprehensive lighting design.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-400 mb-2">Zone 1: Retail Areas</h5>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• High-level ceiling mounts</li>
                  <li>• Enhanced illumination levels</li>
                  <li>• Integration with existing lighting</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">Zone 2: Service Areas</h5>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Wall-mounted units</li>
                  <li>• Standard illumination levels</li>
                  <li>• Focus on equipment visibility</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2">Zone 3: Car Parks</h5>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Weather-resistant fittings</li>
                  <li>• Extended spacing allowed</li>
                  <li>• Clear exit direction marking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study 3: School Installation */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">
            Case Study 3: Primary School Safety Upgrade
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Special Considerations</h4>
              <p className="text-foreground">
                Primary school requiring child-friendly escape route lighting with enhanced visibility and durability for high traffic areas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Design Features</h4>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Lower mounting height for child visibility
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Impact-resistant luminaire housings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Bright, clear exit pictograms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Enhanced corridor illumination
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Testing Protocol</h4>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Weekly visual inspection
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Monthly functional testing
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Termly fire drill integration
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Annual full-duration testing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Installation Mistakes */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Installation Mistakes to Avoid
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Placement Errors</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Excessive spacing creating dark zones
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Missing lighting at direction changes
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Inadequate fire equipment illumination
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Obstructed light distribution
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">System Design Errors</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Insufficient lux levels
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Non-maintained exit signs in public areas
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Inadequate battery duration
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Poor integration with fire alarm systems
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};