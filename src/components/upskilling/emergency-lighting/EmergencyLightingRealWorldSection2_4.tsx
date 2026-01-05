import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export const EmergencyLightingRealWorldSection2_4 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-elec-yellow" />
          Real-World Example: Leeds Hotel Fire Emergency
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        {/* Main Example */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            The Incident
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            In a hotel fire evacuation in Leeds, smoke reduced visibility in corridors. While exit signs were illuminated, several fire extinguishers and a change in direction were poorly lit, causing confusion among guests. The fire service later identified inadequate escape route lighting as a contributing factor.
          </p>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-foreground">
              <strong>Critical Finding:</strong> The escape route lighting system failed to provide adequate illumination at key decision points, resulting in delayed evacuation and increased risk to occupants.
            </p>
          </div>
        </div>

        {/* Problems Identified */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">
            Problems Identified
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-400" />
                Lighting Deficiencies
              </h4>
              <ul className="space-y-2 text-foreground">
                <li>• Fire extinguisher locations poorly illuminated</li>
                <li>• Change in direction had insufficient lighting</li>
                <li>• Gaps in corridor illumination levels</li>
                <li>• Shadow areas created confusion points</li>
                <li>• Exit signs visible but route unclear</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Evacuation Impact
              </h4>
              <ul className="space-y-2 text-foreground">
                <li>• Guests became disoriented in corridors</li>
                <li>• Evacuation time significantly increased</li>
                <li>• Some occupants took wrong routes</li>
                <li>• Fire equipment not easily located</li>
                <li>• Potential for serious injury increased</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Solution Implementation */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Remedial Action Taken
          </h3>
          <p className="text-foreground mb-4">
            Following this incident, the system was upgraded with luminaires placed at all changes of direction and near fire-fighting equipment, fully aligning with BS 5266 requirements.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Immediate Improvements</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Added luminaires at all direction changes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Enhanced lighting at fire equipment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Increased illumination levels in corridors
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Eliminated shadow areas
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Long-term Changes</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Comprehensive lighting survey conducted
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  BS 5266 compliance audit completed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Enhanced maintenance programme
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Staff training on evacuation procedures
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">
            Key Lessons for Electricians
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">1. Complete Route Assessment</h4>
              <p className="text-foreground">
                Always walk the entire escape route during design phase to identify potential hazards, changes in direction, and critical decision points that require enhanced illumination.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">2. Fire Equipment Visibility</h4>
              <p className="text-foreground">
                Fire extinguishers, alarm call points, and other safety equipment must have dedicated illumination to ensure they can be located quickly during an emergency.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">3. Continuous Light Path</h4>
              <p className="text-foreground">
                Escape route lighting must provide a continuous, uninterrupted path of light with no dark zones or shadows that could cause confusion or delay.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">4. BS 5266 Compliance is Critical</h4>
              <p className="text-foreground">
                Meeting minimum standards isn't just about regulatory compliance—it's about ensuring occupant safety during the most critical moments of an emergency evacuation.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practice Summary */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">
            Best Practice Implementation
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-2">Plan Thoroughly</h4>
              <p className="text-foreground text-sm">
                Conduct comprehensive site surveys and escape route analysis
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-2">Install Correctly</h4>
              <p className="text-foreground text-sm">
                Follow BS 5266 guidelines precisely with no compromises
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-2">Test Regularly</h4>
              <p className="text-foreground text-sm">
                Maintain rigorous testing schedules and documentation
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};