import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export const EmergencyLightingRealWorldSection2_5 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-elec-yellow" />
          Real-World Example: Glasgow Nightclub Emergency
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
            During a nightclub evacuation in Glasgow, smoke made it difficult to see. Several signs were non-illuminated and some arrows pointed in the wrong direction. As a result, people were delayed finding the exit, leading to injuries.
          </p>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-foreground">
              <strong>Critical Finding:</strong> The combination of poor exit signage and incorrect directional arrows created confusion and delays during a critical emergency evacuation, resulting in preventable injuries.
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
                Signage Deficiencies
              </h4>
              <ul className="space-y-2 text-foreground">
                <li>• Several exit signs were non-illuminated</li>
                <li>• Some directional arrows pointed incorrectly</li>
                <li>• Mixed signage types caused confusion</li>
                <li>• Signs were positioned too high to see through smoke</li>
                <li>• No backup illumination for critical signs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Evacuation Impact
              </h4>
              <ul className="space-y-2 text-foreground">
                <li>• Patrons became confused about exit locations</li>
                <li>• Some people followed incorrect directional arrows</li>
                <li>• Evacuation time was significantly extended</li>
                <li>• Bottlenecks formed at incorrectly marked exits</li>
                <li>• Multiple injuries occurred due to delayed evacuation</li>
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
            After investigation, the venue was required to replace all signage with ISO 7010-compliant maintained exit signs, ensuring continuous illumination and clear direction even in smoke.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Immediate Improvements</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Replaced all signs with ISO 7010 standard
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Installed maintained exit signs throughout
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Corrected all directional arrows
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Positioned signs at appropriate heights
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">System Upgrades</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Enhanced emergency lighting system
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Added supplementary directional signs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Implemented comprehensive testing schedule
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
              <h4 className="font-semibold text-foreground mb-2">1. Directional Accuracy is Critical</h4>
              <p className="text-foreground">
                Always verify that exit sign arrows point towards the actual exit route. Walk through each path to confirm direction accuracy before finalising installation.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">2. Illumination Must Be Reliable</h4>
              <p className="text-foreground">
                Non-illuminated signs are worse than no signs at all as they can mislead occupants. Ensure all exit signs have reliable emergency power backup and regular testing.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">3. Consistency Prevents Confusion</h4>
              <p className="text-foreground">
                Mixed signage types and standards create confusion during emergencies. Implement a consistent signage system throughout the entire building.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">4. Consider Smoke Conditions</h4>
              <p className="text-foreground">
                Position signs at heights that remain visible even when smoke fills upper areas of rooms and corridors.
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
              <h4 className="font-semibold text-foreground mb-2">Plan Carefully</h4>
              <p className="text-foreground text-sm">
                Walk all escape routes and verify arrow directions before installation
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-2">Install Properly</h4>
              <p className="text-foreground text-sm">
                Use ISO 7010 compliant signs with reliable emergency illumination
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-2">Test Regularly</h4>
              <p className="text-foreground text-sm">
                Maintain comprehensive testing and documentation schedules
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};