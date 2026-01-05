import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

export const EmergencyLightingPracticalSection4_1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Best Practices */}
        <div className="space-y-4">
          <h3 className="text-elec-yellow font-bold text-lg">Essential Best Practices</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-elec-dark/50 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-foreground font-medium">Choose Enhanced Fire-Resistant Cable for Critical Premises</p>
                <p className="text-foreground text-sm">
                  Hospitals, care homes, and high-rise buildings require enhanced F1 cables or MICC. Don't compromise on cable quality in these environments — the marginal cost difference is insignificant compared to the safety benefit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-elec-dark/50 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-foreground font-medium">Avoid Running Emergency Cables with Non-Essential Services</p>
                <p className="text-foreground text-sm">
                  Keep emergency lighting cables physically separated from normal power circuits, data cables, and non-fire-rated services. Fire in one circuit must not compromise the emergency system.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-elec-dark/50 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-foreground font-medium">Verify Terminations Are Fire-Resistant</p>
                <p className="text-foreground text-sm">
                  Poor joints can fail under heat even if the cable survives. Use fire-rated enclosures for all junction boxes, ensure proper termination torque, and apply heat-resistant insulation at connection points.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-elec-dark/50 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-foreground font-medium">Document All Cable Routes</p>
                <p className="text-foreground text-sm">
                  Ensure installation drawings reflect actual cable routes, including containment types, support methods, and fire-rating specifications. This is essential for future maintenance and modification work.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-elec-dark/50 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-foreground font-medium">Test After Installation</p>
                <p className="text-foreground text-sm">
                  Always test insulation resistance and continuity after cable installation to confirm integrity. Standard values: ≥1MΩ insulation resistance, {'<'}0.5Ω end-to-end continuity for typical runs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario 1 */}
        <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-elec-yellow">
          <h3 className="text-elec-yellow font-bold text-lg mb-3">Scenario 1: First-Time Cable Installation for Emergency Lighting</h3>
          <div className="space-y-3">
            <div>
              <p className="text-foreground font-semibold mb-1">The Situation:</p>
              <p className="text-foreground text-sm">You're installing emergency lighting in a small retail unit (single floor, standard construction). Client has specified self-contained LED bulkheads.</p>
            </div>
            
            <div>
              <p className="text-foreground font-semibold mb-2">Step-by-Step Approach:</p>
              <div className="space-y-2 ml-4">
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">1.</span>
                  <p className="text-foreground text-sm flex-1">
                    <strong>Cable Selection:</strong> Standard fire-resistant cable (30-minute F2 rating) acceptable for this low-risk environment. Choose 1.5mm² T&E equivalent fire-rated cable.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">2.</span>
                  <p className="text-foreground text-sm flex-1">
                    <strong>Route Planning:</strong> Run cables in metal trunking or conduit. Avoid running alongside mains lighting cables where practical — maintain 300mm separation minimum.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">3.</span>
                  <p className="text-foreground text-sm flex-1">
                    <strong>Support Method:</strong> Use metal saddle clips or steel cable trays. Never use plastic clips. Space supports at 300mm intervals vertically, 400mm horizontally.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">4.</span>
                  <p className="text-foreground text-sm flex-1">
                    <strong>Terminations:</strong> Terminate in fire-rated junction boxes where required. At luminaires, ensure earth bonding and proper gland selection (IP-rated for damp locations).
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">5.</span>
                  <p className="text-foreground text-sm flex-1">
                    <strong>Testing:</strong> Insulation resistance test (≥1MΩ), continuity test ({'<'}0.5Ω), functional test of each luminaire under mains and emergency operation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-500/30 rounded p-3 mt-3">
              <p className="text-green-300 text-sm"><strong>Expected Outcome:</strong> Compliant installation suitable for Building Control approval. Total cable installation time: 4-6 hours for typical 8-luminaire retail unit.</p>
            </div>
          </div>
        </div>

        {/* Scenario 2 */}
        <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-blue-400">
          <h3 className="text-blue-400 font-bold text-lg mb-3">Scenario 2: Upgrading Existing System to Current Standards</h3>
          <div className="space-y-3">
            <div>
              <p className="text-foreground font-semibold mb-1">The Challenge:</p>
              <p className="text-foreground text-sm">Building survey reveals 20-year-old emergency lighting system with PVC cables installed on plastic cable clips. System must be upgraded to comply with current BS 7671 18th Edition standards.</p>
            </div>
            
            <div>
              <p className="text-foreground font-semibold mb-2">Critical Considerations:</p>
              <div className="space-y-3 ml-4">
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Cable Replacement:</p>
                  <p className="text-foreground text-sm">Old PVC cables do not meet fire-resistance requirements. Complete cable replacement necessary — no shortcuts possible. Use minimum 30-minute F2 rated cable, preferably F1 for enhanced safety.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Support System Upgrade:</p>
                  <p className="text-foreground text-sm">Remove all plastic cable clips. Install metal saddle clips or steel cable basket/tray. Budget for complete re-support of all cable runs — this adds 30-40% to project time.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Containment Assessment:</p>
                  <p className="text-foreground text-sm">If cables run in plastic trunking, assess whether it must be replaced with steel containment. Building Control may require this for full compliance in escape route areas.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Circuit Protection:</p>
                  <p className="text-foreground text-sm">Verify existing MCB protection meets current standards. Emergency lighting circuits require Type B MCBs (or Type C if high inrush expected). Check discrimination with upstream RCD if present.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Documentation Update:</p>
                  <p className="text-foreground text-sm">Complete new circuit drawings showing updated cable routes, fire ratings, and support methods. Update emergency lighting logbook with upgrade details and new commissioning certificates.</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-900/30 border border-orange-500/30 rounded p-3 mt-3">
              <p className="text-orange-300 text-sm"><strong>Cost Impact:</strong> Cable upgrades typically cost 60-80% of new installation price due to access difficulties and rework. Budget accordingly and clearly communicate to client upfront.</p>
            </div>
          </div>
        </div>

        {/* Scenario 3 */}
        <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-purple-400">
          <h3 className="text-purple-400 font-bold text-lg mb-3">Scenario 3: Troubleshooting Cable Failures During Inspection</h3>
          <div className="space-y-3">
            <div>
              <p className="text-foreground font-semibold mb-1">The Discovery:</p>
              <p className="text-foreground text-sm">During annual emergency lighting test, two luminaires fail to illuminate. Circuit continuity testing reveals open circuit. Insulation resistance normal.</p>
            </div>
            
            <div>
              <p className="text-foreground font-semibold mb-2">Diagnostic Steps:</p>
              <div className="space-y-2 ml-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-foreground text-sm">
                    <strong>Isolate Problem Zone:</strong> Test continuity at distribution board, then at intermediate junction boxes, progressively narrowing fault location to specific cable section.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-foreground text-sm">
                    <strong>Inspect Terminations:</strong> Open junction boxes and luminaire connection points. Look for loose terminals, corroded connections, or damaged cable entries (common failure points).
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-foreground text-sm">
                    <strong>Check Cable Routes:</strong> Physically inspect cable runs for visible damage — look for crushing, penetration by fixings, or damage from other trades' work (ceiling service installations).
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-foreground text-sm">
                    <strong>Verify Support Integrity:</strong> Check that metal fixings haven't been replaced with plastic during maintenance work, and that cables haven't sagged onto hot services (heating pipes, transformers).
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-foreground font-semibold mb-2 mt-4">Common Fault Causes:</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-800/50 rounded p-3">
                  <p className="text-elec-yellow font-semibold text-sm mb-1">Poor Terminations</p>
                  <p className="text-foreground text-xs">Inadequate torque at screw terminals causes high resistance and eventual open circuit. Always use correct termination tools and verify torque values.</p>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <p className="text-elec-yellow font-semibold text-sm mb-1">Mechanical Damage</p>
                  <p className="text-foreground text-xs">Cables damaged by other trades during fit-out or maintenance. Install warning labels and protect cables in high-traffic ceiling voids.</p>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <p className="text-elec-yellow font-semibold text-sm mb-1">Water Ingress</p>
                  <p className="text-foreground text-xs">Condensation or roof leaks causing corrosion at termination points. Ensure junction boxes are IP-rated appropriately for environment.</p>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <p className="text-elec-yellow font-semibold text-sm mb-1">Incompatible Materials</p>
                  <p className="text-foreground text-xs">Aluminium cables terminated with copper accessories without correct transition compounds, leading to galvanic corrosion.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-500/30 rounded p-3 mt-3">
              <p className="text-red-300 text-sm"><strong>Prevention:</strong> Most cable failures are installation-quality issues, not cable degradation. Implement quality control checks during installation: verify all terminations with torque screwdriver, photograph junction box internals before closing, and maintain comprehensive as-built documentation.</p>
            </div>
          </div>
        </div>

        {/* Scenario 4 */}
        <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-green-400">
          <h3 className="text-green-400 font-bold text-lg mb-3">Scenario 4: Cost Comparison Between Cable Types</h3>
          <div className="space-y-3">
            <div>
              <p className="text-foreground font-semibold mb-1">The Decision:</p>
              <p className="text-foreground text-sm">Client asks whether enhanced F1 cable is worth the extra cost compared to standard F2 cable for an office building project.</p>
            </div>
            
            <div>
              <p className="text-foreground font-semibold mb-2">Cost Analysis (per 100m installed):</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded p-4">
                  <p className="text-yellow-400 font-semibold mb-2">Standard F2 Cable</p>
                  <p className="text-foreground text-2xl font-bold mb-2">£180</p>
                  <p className="text-foreground text-xs">Material: £120<br/>Labour: £60<br/>30-min fire rating</p>
                </div>
                <div className="bg-gray-800/50 rounded p-4">
                  <p className="text-orange-400 font-semibold mb-2">Enhanced F1 Cable</p>
                  <p className="text-foreground text-2xl font-bold mb-2">£285</p>
                  <p className="text-foreground text-xs">Material: £225<br/>Labour: £60<br/>120-min fire rating</p>
                </div>
                <div className="bg-gray-800/50 rounded p-4">
                  <p className="text-red-400 font-semibold mb-2">MICC</p>
                  <p className="text-foreground text-2xl font-bold mb-2">£520</p>
                  <p className="text-foreground text-xs">Material: £320<br/>Labour: £200<br/>Maximum fire rating</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-foreground font-semibold mb-2 mt-4">When To Choose Enhanced Cable:</p>
              <div className="space-y-2 ml-4">
                <p className="text-foreground text-sm">✅ Multi-storey buildings (evacuation takes longer)</p>
                <p className="text-foreground text-sm">✅ High-occupancy premises (shopping centres, theatres)</p>
                <p className="text-foreground text-sm">✅ Buildings where occupants sleep (hotels, hospitals)</p>
                <p className="text-foreground text-sm">✅ Complex escape routes requiring extended operation</p>
                <p className="text-foreground text-sm">✅ Projects where marginal cost increase (£105/100m) provides significant safety improvement</p>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded p-3 mt-3">
              <p className="text-foreground text-sm"><strong>Professional Recommendation:</strong> For office buildings over 3 floors or with evacuation time greater than 5 minutes, enhanced F1 cable is justified. The approximately 60% cost premium represents excellent value for the 4× improvement in fire survival time. Client peace of mind and reduced liability risk alone justify the investment.</p>
            </div>
          </div>
        </div>

        {/* Critical Warning */}
        <div className="bg-red-900/30 border-2 border-red-500/50 rounded-lg p-5">
          <h4 className="text-red-300 font-bold text-lg mb-3 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Critical Reminder
          </h4>
          <p className="text-foreground leading-relaxed">
            Cable selection and installation quality directly impact whether people can safely evacuate during a fire. <strong>Never compromise on cable specifications or installation standards to save costs.</strong> The difference between adequate and inadequate emergency lighting cabling can literally be measured in lives saved.
          </p>
        </div>

      </CardContent>
    </Card>
  );
};
