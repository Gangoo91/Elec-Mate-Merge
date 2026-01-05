import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, CheckCircle2, AlertTriangle, Cable, Shield, Wrench } from 'lucide-react';

export const EmergencyLightingTechnicalSection4_1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Section 1 - Cable Types */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">1</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Cable Types for Emergency Lighting</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Cables used in emergency lighting must withstand fire and continue to supply power. The choice of cable directly affects system reliability during the most critical moments.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-red-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-red-400 font-semibold text-lg flex items-center gap-2">
                    <Cable className="h-5 w-5" />
                    Mineral Insulated Copper Cable (MICC)
                  </h4>
                  <Badge className="bg-red-600">Maximum Fire Resistance</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">
                  The gold standard for fire-resistant cabling. Copper conductors insulated with magnesium oxide powder, encased in a copper sheath.
                </p>
                <div className="space-y-2">
                  <p className="text-foreground text-sm"><strong className="text-foreground">Fire Survival:</strong> Maintains circuit integrity at temperatures exceeding 1,000°C</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Applications:</strong> High-risk premises, hospitals, care homes, high-rise buildings</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Installation:</strong> Requires specialist termination tools and skills</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Standards:</strong> BS EN 60702-1, tested to BS EN 50200 (PH classification)</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-orange-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-orange-400 font-semibold text-lg">Enhanced Fire-Resistant Cable (Category F1)</h4>
                  <Badge className="bg-orange-600">120-Minute Survival</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">
                  Modern LSZH (Low Smoke Zero Halogen) cables with enhanced fire-resistant properties for critical installations.
                </p>
                <div className="space-y-2">
                  <p className="text-foreground text-sm"><strong className="text-foreground">Fire Survival:</strong> Maintains integrity for 120 minutes under test conditions (950°C flame)</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Applications:</strong> Complex buildings, public spaces, escape routes in high-occupancy premises</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Installation:</strong> Standard termination methods, easier than MICC</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Standards:</strong> BS 7629-1, tested to BS EN 50200 (PH60 or PH120)</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-yellow-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-yellow-400 font-semibold text-lg">Standard Fire-Resistant Cable (Category F2)</h4>
                  <Badge className="bg-yellow-600">30-Minute Survival</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">
                  Entry-level fire-resistant cables suitable for simple installations with lower risk profiles.
                </p>
                <div className="space-y-2">
                  <p className="text-foreground text-sm"><strong className="text-foreground">Fire Survival:</strong> 30-minute minimum survival under fire test conditions</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Applications:</strong> Small offices, retail units, simple escape routes</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Installation:</strong> Standard cable installation methods</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Standards:</strong> BS 7629-1, BS 7671 requirements for fire-resistant cables</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-green-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-green-400 font-semibold text-lg">LSZH Cables</h4>
                  <Badge className="bg-green-600">Low Toxicity</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">
                  Low Smoke Zero Halogen insulation reduces toxic fume production in fire conditions.
                </p>
                <div className="space-y-2">
                  <p className="text-foreground text-sm"><strong className="text-foreground">Key Benefit:</strong> Minimises smoke opacity and eliminates halogen gases (HCl, HBr) that cause respiratory harm</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Critical For:</strong> Confined spaces, underground areas, premises with limited ventilation</p>
                  <p className="text-foreground text-sm"><strong className="text-foreground">Standards:</strong> BS EN 50267, BS EN 60754 (halogen-free verification)</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Which cable type is often used for maximum fire resistance in high-risk installations?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Mineral Insulated Copper Cable (MICC), which can maintain circuit integrity at temperatures exceeding 1,000°C and is tested to BS EN 50200 PH classification.</p>
            </div>
          </div>
        </div>

        {/* Section 2 - Fire Resistance Requirements */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">2</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Fire Resistance Requirements</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              BS 5266 and BS 7671 require that emergency lighting systems maintain operation for specified durations under fire conditions. Cables must pass rigorous testing to prove their capability.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5">
              <h4 className="text-elec-yellow font-semibold text-lg mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Critical Requirements:
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Duration Standards</p>
                    <p className="text-gray-300 text-sm">Escape routes must remain illuminated for at least 1 hour (standard), with 3-hour duration required for premises where occupants sleep (hotels, hospitals, care homes) or where evacuation is delayed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Temperature Survival</p>
                    <p className="text-gray-300 text-sm">Cables must survive high temperatures (up to 950°C flame tests for enhanced cables) whilst maintaining circuit integrity, mechanical stability, and insulation resistance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Mechanical Shock Test</p>
                    <p className="text-gray-300 text-sm">Circuit integrity must be maintained under both mechanical shock (simulating falling debris) and water spray (fire service intervention) during fire test conditions per BS EN 50200.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Compliance Testing</p>
                    <p className="text-gray-300 text-sm">All fire-resistant cables must carry third-party certification (BASEC, BSI, or equivalent) proving compliance with BS 7629-1 and BS EN 50200 fire performance standards.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <p className="text-elec-yellow font-medium mb-2">Regulation Reference:</p>
              <p className="text-foreground text-sm leading-relaxed">
                <strong>BS 7671 Regulation 560.8.1:</strong> "Where electrical safety services are intended to operate during a fire, cables shall be supported in such a way as to resist the effects of a fire for the period necessary for the service to fulfil its function."
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">What minimum duration must emergency lighting circuits survive in public buildings?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Minimum 1 hour for standard evacuation scenarios, but 3 hours for premises where occupants sleep (hospitals, hotels, care homes) or where immediate evacuation is not possible.</p>
            </div>
          </div>
        </div>

        {/* Section 3 - Installation Methods */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">3</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Installation Methods</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Installation practices directly affect system reliability. Even the best fire-resistant cable will fail if improperly installed.
            </p>

            <div className="space-y-3">
              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Support Systems: Metal Fixings Only</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Cables must be supported by metal fixings, clips, or cable ties — never plastic. Plastic clips melt at 120-180°C, causing cables to collapse and potentially block escape routes or damage other circuits.
                    </p>
                    <p className="text-blue-200 text-xs italic">
                      <strong>BS 7671 Regulation 521.10.202:</strong> Emergency lighting cables must be supported by non-combustible materials throughout their entire run.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Circuit Segregation</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Emergency circuits must be separated from normal power circuits to prevent faults spreading. If a fault on the main lighting circuit causes a fire, it must not damage emergency lighting cables running alongside.
                    </p>
                    <p className="text-gray-300 text-sm">
                      Best practice: Maintain 300mm minimum separation distance, or use fire-rated trunking/conduit with physical barriers between emergency and normal circuits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Mechanical Protection</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Protect cables from mechanical damage using appropriate methods based on location and risk:
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1 ml-4">
                      <li>• Metal trunking or conduit for accessible areas</li>
                      <li>• MICC sheathing in high-risk industrial environments</li>
                      <li>• Fire-rated conduit boxes at junction points</li>
                      <li>• Cable protection in ceiling voids where services cross</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Cable Identification</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Emergency lighting cables must be clearly labelled for inspection and maintenance purposes. Use permanent cable markers stating:
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1 ml-4">
                      <li>• "Emergency Lighting Circuit"</li>
                      <li>• Circuit reference number</li>
                      <li>• Distribution board reference</li>
                      <li>• Fire-rated cable designation (if applicable)</li>
                    </ul>
                    <p className="text-blue-200 text-xs mt-2 italic">
                      Clear identification prevents accidental disconnection during maintenance and helps emergency services understand building systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Termination Quality</h4>
                    <p className="text-gray-300 text-sm">
                      Poor terminations are a common failure point. Ensure all connections are made in fire-rated enclosures, use appropriate connector types rated for continuous operation, and verify termination torque values per manufacturer specifications. Test all connections with insulation resistance testing before energising.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-red-300 font-semibold mb-1">Critical Failure Mode:</p>
                  <p className="text-foreground text-sm">
                    The most common cause of emergency lighting cable failure during fires is not cable degradation, but collapsed support systems. Plastic cable clips melt, cables fall, and circuit integrity is lost within minutes — long before the cable itself would fail.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Why must emergency lighting cables never be fixed using plastic clips alone?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Plastic clips melt at 120-180°C in fire conditions, causing cables to collapse and potentially block escape routes or damage other circuits, leading to system failure before the cable itself degrades.</p>
            </div>
          </div>
        </div>

        {/* Section 4 - Self-Contained vs Central Battery */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">4</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Self-Contained vs Central Battery Cabling</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Cable requirements differ significantly between self-contained and central battery systems. Understanding these differences is essential for correct specification and installation.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-blue-400">
                <h4 className="text-blue-400 font-semibold text-lg mb-3">Self-Contained Systems</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-foreground font-medium mb-1">Cable Requirements:</p>
                    <p className="text-gray-300">Only local wiring to each luminaire required. Standard 230V AC fire-rated supply cable from distribution board to each fitting.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Fire Rating:</p>
                    <p className="text-gray-300">Standard fire-resistant cable (30-minute category F2) usually sufficient for simple installations. Enhanced F1 cables for complex buildings.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Installation Complexity:</p>
                    <p className="text-gray-300">Low — standard electrical installation methods. Simpler cable runs, easier fault finding.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Circuit Design:</p>
                    <p className="text-gray-300">Radial or ring final circuits acceptable. Each luminaire contains its own battery and charging circuitry.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Voltage Drop:</p>
                    <p className="text-gray-300">Less critical — battery within each fitting. Follow standard BS 7671 voltage drop limits (3% for lighting).</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-purple-400">
                <h4 className="text-purple-400 font-semibold text-lg mb-3">Central Battery Systems</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-foreground font-medium mb-1">Cable Requirements:</p>
                    <p className="text-gray-300">Dedicated cabling from central battery room to all luminaires. Separate maintained and non-maintained circuits often required.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Fire Rating:</p>
                    <p className="text-gray-300">Enhanced fire-resistant cable (120-minute F1 or MICC) essential — cables must survive longer as system is centralised. Failure affects entire zone.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Installation Complexity:</p>
                    <p className="text-gray-300">High — extensive cable runs back to battery room. Requires detailed planning and comprehensive documentation.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Circuit Design:</p>
                    <p className="text-gray-300">Sub-main distribution with zone segregation. Fire-rated sub-circuit protection at distribution points. Redundancy planning critical.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Voltage Drop:</p>
                    <p className="text-gray-300">Critical — long cable runs from battery room affect voltage at luminaires. Requires careful calculation, often necessitating larger CSA cables.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-elec-gray to-gray-800 border border-elec-yellow/30 rounded-lg p-5">
              <h4 className="text-elec-yellow font-bold text-lg mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Practical Comparison
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-foreground font-semibold mb-2">Cable Volume:</p>
                  <p className="text-gray-300">Self-contained: Minimal — local drops only</p>
                  <p className="text-gray-300 mt-1">Central: Extensive — full building coverage back to battery room</p>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">Material Cost:</p>
                  <p className="text-gray-300">Self-contained: Lower cable costs but higher luminaire costs (batteries in each fitting)</p>
                  <p className="text-gray-300 mt-1">Central: Higher cable costs (enhanced fire rating, longer runs)</p>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">Maintenance Impact:</p>
                  <p className="text-gray-300">Self-contained: Failed cable affects single luminaire</p>
                  <p className="text-gray-300 mt-1">Central: Failed sub-main cable can disable entire zone</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Which system type requires more extensive fire-resistant cabling — self-contained or central battery?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Central battery systems require significantly more extensive fire-resistant cabling (usually enhanced F1 or MICC) because all power originates from a single battery room, necessitating long cable runs throughout the building with higher fire-resistance requirements.</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
