import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, CheckCircle2, AlertTriangle, Calculator, ThermometerSun, Zap, Battery } from 'lucide-react';

export const EmergencyLightingTechnicalSection4_3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Section 1: Autonomy Duration Requirements */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">1</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Autonomy Duration Requirements</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              The autonomy duration determines how long emergency lighting must operate during a power failure. This is not an arbitrary choice — it must be based on a thorough evacuation risk assessment considering building size, occupancy, and evacuation complexity.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-green-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-green-400 font-semibold text-lg">1 Hour Autonomy</h4>
                  <Badge className="bg-green-600">Standard Duration</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">
                  Suitable for premises where rapid evacuation is possible and occupants are familiar with escape routes.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Typical Applications:</strong> Small offices, retail units, workshops, low-occupancy industrial premises</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Evacuation Profile:</strong> Quick evacuation expected, generally single-floor or low-rise buildings</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Occupant Characteristics:</strong> Staff and regular visitors familiar with premises layout</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Standards:</strong> BS 5266-1 Clause 5.3.1 — minimum acceptable duration for most premises</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-orange-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-orange-400 font-semibold text-lg">3 Hour Autonomy</h4>
                  <Badge className="bg-orange-600">Extended Duration</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">
                  Required where evacuation takes longer, occupants may be unfamiliar with premises, or emergency services need extended access.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Typical Applications:</strong> Public assembly buildings, cinemas, theatres, large workplaces, high-rise buildings, shopping centres</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Evacuation Profile:</strong> Extended evacuation times due to building complexity, large numbers, or vertical travel requirements</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Occupant Characteristics:</strong> Members of public unfamiliar with layout, potentially large numbers requiring phased evacuation</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Re-entry Requirements:</strong> Emergency services may need to re-enter premises for rescue operations or fire fighting</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Standards:</strong> BS 5266-1 Clause 5.3.2 — mandatory for specified premises types</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-red-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-red-400 font-semibold text-lg">Extended Autonomy (Beyond 3 Hours)</h4>
                  <Badge className="bg-red-600">Critical Infrastructure</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">
                  Some premises require autonomy durations beyond 3 hours based on specific operational requirements or regulatory mandates.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Typical Applications:</strong> Hospitals, care homes (sleeping occupants), transport hubs, underground stations, data centres, emergency control rooms</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Special Considerations:</strong> Occupants unable to self-evacuate, critical operational continuity, or prolonged emergency service operations</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Duration Examples:</strong> Hospitals may require 24-hour battery backup for critical areas; underground stations often specify 6+ hours</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Determination:</strong> Based on detailed risk assessment and consultation with fire authority</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-5">
              <h4 className="text-elec-yellow font-semibold text-lg mb-4">Building Type Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-3 text-gray-400 font-semibold">Building Type</th>
                      <th className="text-left p-3 text-gray-400 font-semibold">Typical Duration</th>
                      <th className="text-left p-3 text-gray-400 font-semibold">Reasoning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 text-foreground">Small Office (&lt; 50 occupants)</td>
                      <td className="p-3 text-green-400 font-semibold">1 hour</td>
                      <td className="p-3 text-gray-300">Rapid evacuation, familiar occupants</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 text-foreground">Large Office (50+ occupants)</td>
                      <td className="p-3 text-orange-400 font-semibold">3 hours</td>
                      <td className="p-3 text-gray-300">Complex layout, phased evacuation</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 text-foreground">Shopping Centre</td>
                      <td className="p-3 text-orange-400 font-semibold">3 hours</td>
                      <td className="p-3 text-gray-300">Public access, unfamiliar occupants</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 text-foreground">Cinema / Theatre</td>
                      <td className="p-3 text-orange-400 font-semibold">3 hours</td>
                      <td className="p-3 text-gray-300">Dark environment, crowd management</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 text-foreground">Hospital</td>
                      <td className="p-3 text-red-400 font-semibold">3+ hours</td>
                      <td className="p-3 text-gray-300">Non-ambulant patients, critical operations</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 text-foreground">Care Home</td>
                      <td className="p-3 text-red-400 font-semibold">3+ hours</td>
                      <td className="p-3 text-gray-300">Sleeping occupants, assisted evacuation</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-foreground">High-rise Building (&gt; 18m)</td>
                      <td className="p-3 text-orange-400 font-semibold">3 hours</td>
                      <td className="p-3 text-gray-300">Vertical evacuation complexity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">What is the typical autonomy duration required in public assembly buildings?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> 3 hours minimum. Public assembly buildings have large numbers of occupants who may be unfamiliar with escape routes, requiring extended illumination for safe evacuation and potential emergency service re-entry.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Battery Sizing Principles */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">2</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Battery Sizing Principles</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Correct battery sizing ensures the emergency lighting system maintains full performance throughout the required autonomy duration. Undersizing leads to premature system failure; oversizing adds unnecessary cost but provides operational margin.
            </p>

            <div className="bg-gradient-to-r from-green-900/30 to-gray-800/50 border border-green-500/30 rounded-lg p-6">
              <h4 className="text-green-300 font-semibold text-lg mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Battery Capacity Calculation Formula
              </h4>
              <div className="text-center space-y-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-mono text-green-300 mb-2">
                    Battery Capacity (Ah) =
                  </div>
                  <div className="text-xl font-mono text-foreground border-t border-green-600/30 pt-3">
                    <div className="mb-2">Load (W) × Duration (h)</div>
                    <div className="border-t border-green-600/30 pt-2">
                      Battery Voltage (V) × Efficiency Factor
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Load (W)</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Total power consumption of all emergency luminaires and associated equipment connected to the battery.
                    </p>
                    <p className="text-blue-200 text-xs italic">
                      For LED luminaires, include emergency driver consumption — not just lamp wattage. Driver losses typically add 10-20%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Duration (h)</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Required autonomy period: 1 hour, 3 hours, or extended duration based on building risk assessment.
                    </p>
                    <p className="text-blue-200 text-xs italic">
                      Always confirm duration requirements with building fire risk assessment before specifying equipment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Battery Voltage (V)</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      System operating voltage depends on design. Common voltages: 3.6V, 7.2V, 12V, 24V, 50V.
                    </p>
                    <p className="text-blue-200 text-xs italic">
                      Self-contained units typically 3.6-7.2V; central battery systems 24-110V DC for efficient power distribution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Efficiency Factor</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Accounts for conversion losses in inverters, battery discharge characteristics, and cable voltage drop. Typically 1.25 (80% efficiency).
                    </p>
                    <p className="text-blue-200 text-xs italic">
                      Higher efficiency factors (up to 1.4) may be required for aged systems or high-temperature environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-5">
              <h4 className="text-green-300 font-semibold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Worked Example: Medium Office Building
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-elec-yellow font-semibold mb-2">Given Parameters:</p>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <p className="text-foreground">• Total luminaire load: <span className="text-green-400 font-semibold">120W</span></p>
                    <p className="text-foreground">• Required duration: <span className="text-green-400 font-semibold">3 hours</span></p>
                    <p className="text-foreground">• System voltage: <span className="text-green-400 font-semibold">24V DC</span></p>
                    <p className="text-foreground">• Efficiency factor: <span className="text-green-400 font-semibold">1.25</span></p>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-elec-yellow font-semibold mb-2">Calculation:</p>
                  <div className="space-y-1 font-mono text-sm">
                    <p className="text-foreground">Capacity = (120W × 3h) / (24V × 1.25)</p>
                    <p className="text-foreground">Capacity = 360 / 30</p>
                    <p className="text-green-400 text-base font-bold">Capacity = 12 Ah</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-elec-yellow font-semibold mb-2">Specification Decision:</p>
                  <p className="text-gray-300 text-sm">
                    Specify a <span className="text-foreground font-semibold">12Ah battery minimum</span>. In practice, specify a <span className="text-green-400 font-semibold">15Ah battery</span> to provide operational margin and account for battery ageing over service life (25% additional capacity).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">What unit is battery capacity measured in?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Ampere-hours (Ah), which represents the amount of charge a battery can deliver over time. A 12Ah battery can theoretically supply 12 amps for 1 hour, or 1 amp for 12 hours (actual performance varies with discharge rate and temperature).</p>
            </div>
          </div>
        </div>

        {/* Section 3: Correction Factors */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">3</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Correction Factors</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Theoretical battery calculations must be adjusted for real-world operating conditions. Batteries do not perform identically throughout their service life or in all environmental conditions.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5">
              <h4 className="text-elec-yellow font-semibold text-lg mb-4 flex items-center gap-2">
                <ThermometerSun className="h-5 w-5" />
                Critical Correction Factors:
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Battery Ageing (25-30% Additional Capacity)</p>
                    <p className="text-gray-300 text-sm">
                      Battery capacity degrades over time due to repeated charge/discharge cycles and chemical changes. Design must ensure minimum required capacity is available at end-of-life, not just when new. Standard practice: add 25-30% to calculated capacity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Operating Temperature</p>
                    <p className="text-gray-300 text-sm">
                      Battery performance is temperature-dependent. Most batteries are rated at 20°C. Performance decreases significantly at low temperatures and degrades faster at high temperatures. For installations in plant rooms, roof spaces, or unheated areas, temperature correction is essential.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Discharge Rate (C-Rate)</p>
                    <p className="text-gray-300 text-sm">
                      High discharge rates reduce effective battery capacity. A battery discharged at 1C (full capacity in 1 hour) delivers less energy than the same battery discharged at 0.1C (10-hour rate). Emergency lighting typically operates at moderate discharge rates, but this must be verified with manufacturer data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Recharge Time Requirements</p>
                    <p className="text-gray-300 text-sm">
                      BS 5266-1 requires batteries to recharge to 80% capacity within 12 hours, and 100% capacity within 24 hours after full discharge. This ensures readiness for subsequent emergencies. Charger sizing must account for recharge rate requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-5">
              <h4 className="text-orange-300 font-semibold text-lg mb-4">Temperature Impact on Battery Capacity</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-orange-600/30">
                      <th className="text-left p-3 text-orange-300 font-semibold">Temperature</th>
                      <th className="text-left p-3 text-orange-300 font-semibold">Available Capacity</th>
                      <th className="text-left p-3 text-orange-300 font-semibold">Design Implication</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-orange-600/20">
                      <td className="p-3 text-foreground">-10°C</td>
                      <td className="p-3 text-red-400 font-semibold">~60-70%</td>
                      <td className="p-3 text-gray-300">Significantly upsize battery or provide heating</td>
                    </tr>
                    <tr className="border-b border-orange-600/20">
                      <td className="p-3 text-foreground">0°C</td>
                      <td className="p-3 text-orange-400 font-semibold">~80%</td>
                      <td className="p-3 text-gray-300">Apply 1.25 temperature correction factor</td>
                    </tr>
                    <tr className="border-b border-orange-600/20">
                      <td className="p-3 text-foreground">10°C</td>
                      <td className="p-3 text-yellow-400 font-semibold">~90%</td>
                      <td className="p-3 text-gray-300">Minor correction (1.1 factor)</td>
                    </tr>
                    <tr className="border-b border-orange-600/20">
                      <td className="p-3 text-foreground">20°C</td>
                      <td className="p-3 text-green-400 font-semibold">100% (rated)</td>
                      <td className="p-3 text-gray-300">Standard design capacity applies</td>
                    </tr>
                    <tr className="border-b border-orange-600/20">
                      <td className="p-3 text-foreground">30°C</td>
                      <td className="p-3 text-green-400 font-semibold">~105%</td>
                      <td className="p-3 text-gray-300">Slightly increased capacity but faster ageing</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-foreground">40°C+</td>
                      <td className="p-3 text-orange-400 font-semibold">~95%</td>
                      <td className="p-3 text-gray-300">Capacity decreases; accelerated degradation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-orange-200 text-xs mt-3 italic">
                Note: Values vary by battery chemistry. NiCd batteries generally perform better at temperature extremes than NiMH or Lithium-ion.
              </p>
            </div>

            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-red-300 font-semibold mb-1">Critical Design Error:</p>
                  <p className="text-foreground text-sm">
                    Failing to account for temperature correction in unheated spaces is a common cause of premature system failure. A battery specified for 12Ah at 20°C may only deliver 9.6Ah at 0°C — a 20% shortfall that leaves the system non-compliant.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Why do designers add 25–30% to calculated battery capacity?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> To account for battery ageing and degradation over the service life. Batteries lose capacity through repeated charge/discharge cycles and chemical changes. The system must still meet minimum capacity requirements at end-of-life, typically 3-5 years for self-contained batteries.</p>
            </div>
          </div>
        </div>

        {/* Section 4: System-Specific Sizing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">4</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Self-Contained vs Central Battery Sizing</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Battery sizing requirements differ significantly between self-contained luminaires and central battery systems. Each approach has distinct calculation methods and design considerations.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-blue-400">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-blue-400 font-semibold text-lg flex items-center gap-2">
                    <Battery className="h-5 w-5" />
                    Self-Contained Systems
                  </h4>
                  <Badge className="bg-blue-600 text-xs">Individual Batteries</Badge>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-foreground font-medium mb-1">Battery Location:</p>
                    <p className="text-gray-300">Integrated within each luminaire housing. No external battery room required.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Sizing Approach:</p>
                    <p className="text-gray-300">Each battery sized individually for its luminaire load only. Simple calculation per unit.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Typical Capacities:</p>
                    <p className="text-gray-300">1-4Ah for LED luminaires (3-8W load). Larger for high-output emergency fittings.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Voltage Drop:</p>
                    <p className="text-gray-300">Not a concern — battery directly connected to lamp. No distribution losses.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Diversity Factor:</p>
                    <p className="text-gray-300">Not applicable — each battery serves single luminaire only.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Replacement Cycle:</p>
                    <p className="text-gray-300">Individual battery replacement every 3-5 years. Staggered replacement schedule across installation.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-purple-400">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-purple-400 font-semibold text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Central Battery Systems
                  </h4>
                  <Badge className="bg-purple-600 text-xs">Centralised Power</Badge>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-foreground font-medium mb-1">Battery Location:</p>
                    <p className="text-gray-300">Dedicated battery room with large battery bank. Requires ventilation and environmental control.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Sizing Approach:</p>
                    <p className="text-gray-300">Complex calculation accounting for total load, diversity factors, and cable voltage drop across entire installation.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Typical Capacities:</p>
                    <p className="text-gray-300">50-500Ah+ depending on building size. Multiple battery strings for redundancy in critical applications.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Voltage Drop:</p>
                    <p className="text-gray-300 text-red-400">Critical consideration — long cable runs from battery room to furthest luminaire. Maximum 5% voltage drop permitted.</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Diversity Factor:</p>
                    <p className="text-gray-300">May apply in very large installations where not all luminaires operate simultaneously (zoned systems).</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Replacement Cycle:</p>
                    <p className="text-gray-300">Bulk battery replacement every 5-10+ years. Entire bank replaced simultaneously. Higher upfront cost but longer service life.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-5">
              <h4 className="text-purple-300 font-semibold text-lg mb-4">Voltage Drop Calculation (Central Systems Only)</h4>
              <p className="text-gray-300 text-sm mb-3">
                Voltage drop can significantly reduce available power at distant luminaires in central battery systems. This must be calculated and accounted for in cable sizing.
              </p>
              
              <div className="bg-gray-900/50 rounded-lg p-4 mb-3">
                <p className="text-elec-yellow font-semibold mb-2">Voltage Drop Formula:</p>
                <div className="font-mono text-sm text-foreground space-y-1">
                  <p>Vd = (2 × L × I × R) / 1000</p>
                  <p className="text-xs text-gray-400 mt-2">Where:</p>
                  <p className="text-xs text-gray-400">Vd = Voltage drop (V)</p>
                  <p className="text-xs text-gray-400">L = One-way cable length (m)</p>
                  <p className="text-xs text-gray-400">I = Load current (A)</p>
                  <p className="text-xs text-gray-400">R = Cable resistance (mΩ/m from manufacturer data)</p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-purple-300 font-semibold mb-2">Worked Example:</p>
                <div className="text-sm space-y-2">
                  <p className="text-foreground">24V system, 50m cable run, 5A load, 1.5mm² cable (12.1 mΩ/m @ 20°C)</p>
                  <p className="text-foreground">Vd = (2 × 50 × 5 × 12.1) / 1000 = 6.05V</p>
                  <p className="text-red-400 font-semibold">Voltage drop: 6.05V (25.2% of 24V) — EXCESSIVE!</p>
                  <p className="text-green-400 mt-2">Solution: Use 2.5mm² cable (7.41 mΩ/m) → Vd = 3.71V (15.5%) — Acceptable</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-elec-gray to-gray-800 border border-elec-yellow/30 rounded-lg p-5">
              <h4 className="text-elec-yellow font-bold text-lg mb-4">System Comparison Summary</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-foreground font-semibold mb-2 border-b border-gray-600 pb-1">Battery Capacity:</p>
                  <p className="text-gray-300">Self-contained: 1-4Ah per luminaire</p>
                  <p className="text-gray-300 mt-2">Central: 50-500Ah+ total system</p>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2 border-b border-gray-600 pb-1">Calculation Complexity:</p>
                  <p className="text-gray-300">Self-contained: Simple per-unit calculation</p>
                  <p className="text-gray-300 mt-2">Central: Complex with voltage drop, diversity</p>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2 border-b border-gray-600 pb-1">Failure Impact:</p>
                  <p className="text-gray-300">Self-contained: Single luminaire affected</p>
                  <p className="text-gray-300 mt-2">Central: Entire zone potentially affected</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Which system type requires calculation of voltage drop across cable runs?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Central battery systems. They supply multiple luminaires over potentially long cable distances from a single battery room. Voltage drop can significantly affect luminaire performance and must be limited to 5% maximum of nominal voltage.</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
