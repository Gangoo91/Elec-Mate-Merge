import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Shield, Split, Flame } from 'lucide-react';

export const EmergencyLightingTechnicalSection4_4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Content / Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        
        {/* Section 1: Why Circuit Segregation Matters */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600/20 border border-blue-600/40 flex items-center justify-center">
              <span className="text-blue-300 font-bold text-lg">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Split className="h-5 w-5 text-blue-400" />
                Why Circuit Segregation Matters
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p>
              Emergency lighting circuits must operate independently of other systems to ensure reliable operation during emergencies. Proper segregation provides three critical protections:
            </p>

            <div className="grid gap-4">
              <div className="bg-blue-600/10 border-l-4 border-blue-600 p-4 rounded-r">
                <h4 className="font-semibold text-blue-300 mb-2">Fault Isolation</h4>
                <p className="text-foreground">
                  Prevents faults in normal lighting or power circuits from disabling emergency lights. A short circuit in general distribution must not affect emergency lighting operation.
                </p>
              </div>

              <div className="bg-blue-600/10 border-l-4 border-blue-600 p-4 rounded-r">
                <h4 className="font-semibold text-blue-300 mb-2">Fire Integrity</h4>
                <p className="text-foreground">
                  Ensures integrity in the event of fire damage to other circuits. If normal lighting cables are destroyed by fire, emergency circuits must continue operating.
                </p>
              </div>

              <div className="bg-blue-600/10 border-l-4 border-blue-600 p-4 rounded-r">
                <h4 className="font-semibold text-blue-300 mb-2">Maintenance Safety</h4>
                <p className="text-foreground">
                  Avoids confusion during inspection and maintenance. Clearly segregated circuits allow safe testing and fault-finding without risk to life-safety systems.
                </p>
              </div>
            </div>

            <div className="bg-orange-600/20 border border-orange-600/40 rounded-lg p-4">
              <p className="text-orange-100 font-semibold mb-2">✅ Quick Check:</p>
              <p className="text-foreground">
                Why must emergency circuits be segregated from normal power circuits?
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange-300 hover:text-orange-200">View Answer</summary>
                <p className="mt-2 text-foreground">
                  To prevent faults in normal circuits from disabling emergency lighting, ensure fire integrity if other systems fail, and maintain clear identification for safe maintenance and testing.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Section 2: Fire Integrity Requirements */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center">
              <span className="text-red-300 font-bold text-lg">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-400" />
                Fire Integrity Requirements
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p>
              BS 5266-1 and BS 7671 require emergency lighting circuits to remain intact during a fire. This demands enhanced cable specifications and installation methods beyond standard practice:
            </p>

            <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-red-600/20 px-4 py-3 border-b border-gray-700">
                <h4 className="font-semibold text-red-300">Enhanced Fire-Resistant Cables (Category F1)</h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-foreground">Survival Time:</span>
                  <span className="text-foreground font-semibold">Up to 120 minutes under test conditions</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-foreground">Test Temperature:</span>
                  <span className="text-foreground font-semibold">842°C (BS EN 50200)</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-foreground">Mechanical Shock:</span>
                  <span className="text-foreground font-semibold">Must withstand impact during fire</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-foreground">Water Spray:</span>
                  <span className="text-foreground font-semibold">Must resist firefighting operations</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-600/10 border border-red-600/40 p-4 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">Cable Support Requirements</h4>
                <p className="text-foreground mb-2">Fixings must be non-combustible:</p>
                <ul className="list-disc list-inside space-y-1 text-foreground">
                  <li>Metal clips or saddles</li>
                  <li>Steel cable trays</li>
                  <li>Metal conduit and trunking</li>
                  <li>No plastic fixings permitted</li>
                </ul>
              </div>

              <div className="bg-red-600/10 border border-red-600/40 p-4 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">BS 7671 Regulation 521.10.202</h4>
                <p className="text-foreground mb-2">Escape route circuits must:</p>
                <ul className="list-disc list-inside space-y-1 text-foreground">
                  <li>Be protected against premature collapse</li>
                  <li>Use enhanced fire-resistant cables</li>
                  <li>Have adequate mechanical protection</li>
                  <li>Maintain circuit integrity throughout emergency duration</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-600/20 border border-orange-600/40 rounded-lg p-4">
              <p className="text-orange-100 font-semibold mb-2">✅ Quick Check:</p>
              <p className="text-foreground">
                What regulation in BS 7671 requires non-combustible fixings for cables?
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange-300 hover:text-orange-200">View Answer</summary>
                <p className="mt-2 text-foreground">
                  Regulation 521.10.202 requires escape route circuits to be protected against premature collapse, which includes using non-combustible fixings and enhanced fire-resistant cables.
                </p>
              </details>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-600/40 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-300 mb-2">Fire Test Standards</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-yellow-600/40">
                      <th className="text-left py-2 text-yellow-300">Standard</th>
                      <th className="text-left py-2 text-yellow-300">Temperature</th>
                      <th className="text-left py-2 text-yellow-300">Duration</th>
                      <th className="text-left py-2 text-yellow-300">Application</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-gray-700">
                      <td className="py-2">BS EN 50200</td>
                      <td className="py-2">842°C</td>
                      <td className="py-2">120 min</td>
                      <td className="py-2">Category F1 cables</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">BS 8434-2</td>
                      <td className="py-2">950°C</td>
                      <td className="py-2">180 min</td>
                      <td className="py-2">Enhanced protection</td>
                    </tr>
                    <tr>
                      <td className="py-2">IEC 60331</td>
                      <td className="py-2">750°C</td>
                      <td className="py-2">90 min</td>
                      <td className="py-2">Standard fire resistance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Circuit Segregation Methods */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600/20 border border-green-600/40 flex items-center justify-center">
              <span className="text-green-300 font-bold text-lg">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Split className="h-5 w-5 text-green-400" />
                Circuit Segregation Methods
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p>
              Four practical methods ensure proper segregation of emergency lighting circuits from general electrical services:
            </p>

            <div className="grid gap-4">
              <div className="bg-green-600/10 border-l-4 border-green-600 p-4 rounded-r">
                <h4 className="font-semibold text-green-300 mb-2">1. Dedicated Containment</h4>
                <p className="text-foreground mb-2">
                  Use separate conduits, trunking, or trays exclusively for emergency circuits. This is the preferred method for new installations.
                </p>
                <div className="bg-gray-800 p-3 rounded mt-2">
                  <p className="text-sm text-foreground">Example: Steel conduit marked "EMERGENCY LIGHTING ONLY" in red</p>
                </div>
              </div>

              <div className="bg-green-600/10 border-l-4 border-green-600 p-4 rounded-r">
                <h4 className="font-semibold text-green-300 mb-2">2. Physical Separation</h4>
                <p className="text-foreground mb-2">
                  Maintain adequate spacing where containment is shared. Minimum separation distances apply based on cable type and fire risk.
                </p>
                <div className="bg-gray-800 p-3 rounded mt-2">
                  <p className="text-sm text-foreground">Minimum spacing: 300mm between emergency and general circuits in shared cable trays</p>
                </div>
              </div>

              <div className="bg-green-600/10 border-l-4 border-green-600 p-4 rounded-r">
                <h4 className="font-semibold text-green-300 mb-2">3. Clear Identification</h4>
                <p className="text-foreground mb-2">
                  Label emergency circuits for testing and maintenance using permanent identification at regular intervals.
                </p>
                <div className="bg-gray-800 p-3 rounded mt-2">
                  <p className="text-sm text-foreground">Label every 3 metres and at all access points: "EMERGENCY LIGHTING CIRCUIT"</p>
                </div>
              </div>

              <div className="bg-green-600/10 border-l-4 border-green-600 p-4 rounded-r">
                <h4 className="font-semibold text-green-300 mb-2">4. Dedicated Distribution Boards</h4>
                <p className="text-foreground mb-2">
                  Provide dedicated boards or sections for emergency lighting circuits, clearly marked and with appropriate overcurrent protection.
                </p>
                <div className="bg-gray-800 p-3 rounded mt-2">
                  <p className="text-sm text-foreground">Best practice: Separate emergency lighting distribution board with independent RCD protection</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-600/20 border border-orange-600/40 rounded-lg p-4">
              <p className="text-orange-100 font-semibold mb-2">✅ Quick Check:</p>
              <p className="text-foreground">
                Give one method of segregating emergency lighting circuits from normal circuits.
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange-300 hover:text-orange-200">View Answer</summary>
                <p className="mt-2 text-foreground">
                  Any of the following: dedicated containment (separate conduits/trunking), physical separation with adequate spacing, clear identification and labelling, or dedicated distribution boards.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Section 4: Protection Against Fire Spread */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600/20 border border-purple-600/40 flex items-center justify-center">
              <span className="text-purple-300 font-bold text-lg">4</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                Protection Against Fire Spread
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p>
              Emergency lighting installations must not contribute to the spread of fire or produce hazardous smoke and toxic gases that impede evacuation:
            </p>

            <div className="bg-purple-600/10 border border-purple-600/40 rounded-lg p-4">
              <h4 className="font-semibold text-purple-300 mb-3">LSZH Cable Benefits</h4>
              <p className="text-foreground mb-3">
                Low Smoke Zero Halogen (LSZH) cables are essential for emergency lighting installations because they:
              </p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Reduce smoke production by up to 80% compared to PVC cables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Eliminate toxic halogen gases (chlorine, fluorine) that cause respiratory damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Improve visibility during evacuation by minimising smoke density</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Comply with building regulations for public and high-occupancy buildings</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-purple-600/20 px-4 py-3 border-b border-gray-700">
                <h4 className="font-semibold text-purple-300">Cable Type Comparison</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-foreground">Cable Type</th>
                      <th className="text-left p-3 text-foreground">Fire Resistance</th>
                      <th className="text-left p-3 text-foreground">Smoke Emission</th>
                      <th className="text-left p-3 text-foreground">Suitability</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-semibold text-green-400">LSZH Enhanced</td>
                      <td className="p-3">120 minutes</td>
                      <td className="p-3 text-green-400">Very Low</td>
                      <td className="p-3">✅ Recommended</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-semibold text-green-400">MICC (Mineral Insulated)</td>
                      <td className="p-3">180+ minutes</td>
                      <td className="p-3 text-green-400">None</td>
                      <td className="p-3">✅ Best Performance</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-semibold text-yellow-400">LSZH Standard</td>
                      <td className="p-3">60 minutes</td>
                      <td className="p-3 text-yellow-400">Low</td>
                      <td className="p-3">⚠️ Limited Use</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-red-400">PVC Only</td>
                      <td className="p-3">30 minutes</td>
                      <td className="p-3 text-red-400">High + Toxic</td>
                      <td className="p-3">❌ Not Permitted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-600/10 border border-red-600/40 p-4 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">High-Risk Areas to Avoid</h4>
                <ul className="space-y-1 text-foreground">
                  <li>• Commercial kitchens</li>
                  <li>• Boiler and plant rooms</li>
                  <li>• Chemical storage areas</li>
                  <li>• High-temperature processes</li>
                  <li>• Flammable material stores</li>
                </ul>
              </div>

              <div className="bg-green-600/10 border border-green-600/40 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Enhanced Protection Where Required</h4>
                <ul className="space-y-1 text-foreground">
                  <li>• Use MICC cable in high-risk routes</li>
                  <li>• Install steel conduit protection</li>
                  <li>• Apply fire-resistant coatings</li>
                  <li>• Create fire-rated cable enclosures</li>
                  <li>• Route through protected shafts</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-600/20 border border-orange-600/40 rounded-lg p-4">
              <p className="text-orange-100 font-semibold mb-2">✅ Quick Check:</p>
              <p className="text-foreground">
                Why are LSZH cables preferred in emergency lighting installations?
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange-300 hover:text-orange-200">View Answer</summary>
                <p className="mt-2 text-foreground">
                  LSZH cables reduce smoke production and eliminate toxic halogen gases, improving visibility and air quality during evacuation. This is critical for life safety in emergency conditions.
                </p>
              </details>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
