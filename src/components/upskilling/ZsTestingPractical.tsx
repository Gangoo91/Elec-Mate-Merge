import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ZsTestingPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          <CardTitle className="text-foreground">Practical Guidance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-foreground space-y-4 sm:space-y-6">
        {/* Testing Strategy */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-blue-400" />
            <h3 className="text-foreground font-semibold text-sm sm:text-base">Strategic Test Point Selection</h3>
          </div>
          
          <div className="grid gap-3 sm:gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-green-600 text-foreground">Priority 1</Badge>
                <h4 className="text-foreground font-medium">Essential Test Points</h4>
              </div>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Furthest point on each final circuit</li>
                <li>• Each different type of protective device</li>
                <li>• Fixed equipment with Class I construction</li>
                <li>• Each distribution board's incoming supply</li>
                <li>• Special locations (bathrooms, outdoor areas)</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-blue-600 text-foreground">Priority 2</Badge>
                <h4 className="text-foreground font-medium">Additional Test Points</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Mid-points on long radial circuits</li>
                <li>• Each floor or zone of multi-level installations</li>
                <li>• Accessible junction boxes and connection points</li>
                <li>• Different cable routes within same circuit</li>
                <li>• Alternative supply arrangements (changeover switches)</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-purple-600 text-foreground">Priority 3</Badge>
                <h4 className="text-foreground font-medium">Verification Points</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Random sample of intermediate outlets</li>
                <li>• Circuits with previous issues or modifications</li>
                <li>• Areas with environmental challenges</li>
                <li>• Customer-requested specific locations</li>
                <li>• Backup supplies and emergency systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Circuit-Specific Procedures */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <h3 className="text-foreground font-semibold">Circuit-Specific Testing Procedures</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                Ring Final Circuits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="font-medium text-foreground mb-2">Test Sequence:</p>
                  <ul className="space-y-1">
                    <li>1. Both ends of ring at consumer unit</li>
                    <li>2. Furthest socket from origin</li>
                    <li>3. Mid-point sockets on each leg</li>
                    <li>4. Any spurs identified</li>
                    <li>5. Cross-check readings for consistency</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Expected Results:</p>
                  <ul className="space-y-1">
                    <li>• Similar readings at ring ends</li>
                    <li>• Highest reading at furthest point</li>
                    <li>• Gradual increase along ring</li>
                    <li>• Spur readings higher than main ring</li>
                    <li>• All values within permitted limits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Radial Circuits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="font-medium text-foreground mb-2">Test Strategy:</p>
                  <ul className="space-y-1">
                    <li>• Origin point (distribution board)</li>
                    <li>• 25%, 50%, 75% points if accessible</li>
                    <li>• Final outlet on circuit</li>
                    <li>• Any branch circuits or sub-distributions</li>
                    <li>• Fixed equipment connection points</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Reading Pattern:</p>
                  <ul className="space-y-1">
                    <li>• Lowest at origin</li>
                    <li>• Progressive increase with distance</li>
                    <li>• Highest at circuit extremity</li>
                    <li>• Consistent rate of increase</li>
                    <li>• No unexpected variations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                Three-Phase Circuits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="font-medium text-foreground mb-2">Testing Requirements:</p>
                  <ul className="space-y-1">
                    <li>• Test each phase separately to earth</li>
                    <li>• Use highest reading for assessment</li>
                    <li>• Check phase balance if unequal loads</li>
                    <li>• Verify neutral-earth connection</li>
                    <li>• Test at motor terminals and isolators</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Common Issues:</p>
                  <ul className="space-y-1">
                    <li>• Phase imbalance causing variation</li>
                    <li>• Different cable routes per phase</li>
                    <li>• Motor star-point earthing</li>
                    <li>• Transformer connections affecting readings</li>
                    <li>• Parallel neutral-earth paths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Challenges */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <h3 className="text-foreground font-semibold">Common Practical Challenges</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-yellow-900/20 border border-yellow-600 p-3 sm:p-4 rounded-lg">
              <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Access Issues</h4>
              <div className="text-xs sm:text-sm space-y-2">
                <p><strong>Problem:</strong> Inaccessible ceiling voids, buried junction boxes</p>
                <p><strong>Solution:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Use calculation method with measured (R1+R2)</li>
                  <li>• Test at alternative accessible points</li>
                  <li>• Consider wireless test equipment</li>
                  <li>• Document limitations in test report</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">Electronic Equipment</h4>
              <div className="text-sm space-y-2">
                <p><strong>Problem:</strong> RCD tripping, equipment damage concerns</p>
                <p><strong>Solution:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Use low-current test setting initially</li>
                  <li>• Temporarily isolate sensitive equipment</li>
                  <li>• Test during maintenance windows</li>
                  <li>• Consider no-trip testing methods</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
              <h4 className="text-red-400 font-semibold mb-2">Parallel Earth Paths</h4>
              <div className="text-sm space-y-2">
                <p><strong>Problem:</strong> Gas/water pipes, cable armour affecting readings</p>
                <p><strong>Solution:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Identify and document parallel paths</li>
                  <li>• Test with and without bonding connected</li>
                  <li>• Use calculation to verify results</li>
                  <li>• Consider worst-case scenarios</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">High Readings</h4>
              <div className="text-sm space-y-2">
                <p><strong>Problem:</strong> Zs exceeding maximum permitted values</p>
                <p><strong>Solution:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Check all connections systematically</li>
                  <li>• Verify protective conductor continuity</li>
                  <li>• Investigate external supply impedance</li>
                  <li>• Consider protective conductor upgrade</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Best Practices */}
        <div className="bg-elec-dark p-3 sm:p-4 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-3 text-sm sm:text-base">Documentation and Recording</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <p className="font-medium text-foreground mb-2">Essential Records:</p>
              <ul className="space-y-1">
                <li>• Exact test point location description</li>
                <li>• Measured Zs value with temperature noted</li>
                <li>• Test instrument model and calibration date</li>
                <li>• Environmental conditions during test</li>
                <li>• Any remedial actions required</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Additional Notes:</p>
              <ul className="space-y-1">
                <li>• Parallel path identification</li>
                <li>• Access limitations encountered</li>
                <li>• Customer liaison requirements</li>
                <li>• Follow-up testing requirements</li>
                <li>• Compliance status for each test point</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};