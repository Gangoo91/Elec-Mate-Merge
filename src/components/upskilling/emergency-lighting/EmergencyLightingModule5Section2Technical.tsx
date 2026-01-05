import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';
import { FunctionalTestQuickCheck } from './FunctionalTestQuickCheck';
import { DurationTestQuickCheck } from './DurationTestQuickCheck';
import { CommissioningTestQuickCheck } from './CommissioningTestQuickCheck';
import { TestFailureQuickCheck } from './TestFailureQuickCheck';

export const EmergencyLightingModule5Section2Technical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Settings className="h-6 w-6 text-elec-yellow" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Section 1: Functional Testing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Functional Testing (Short Test)
            </h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              A functional test ensures that all luminaires switch into emergency mode when mains power fails.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-blue-500">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-blue-400 font-semibold text-lg">Monthly Functional Test Overview</h4>
                <Badge className="bg-blue-600">BS 5266-8</Badge>
              </div>
              <p className="text-foreground text-sm mb-3">
                A functional test simulates a mains failure to verify that all emergency luminaires switch to battery power and illuminate correctly. This monthly verification ensures ongoing system readiness without significantly draining battery capacity.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Frequency:</strong> Monthly (every 30 days) as required by BS 5266-1</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Duration:</strong> Typically 30–60 seconds (just enough to confirm illumination)</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Purpose:</strong> Verify battery charging, lamp operation, and emergency mode switching</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Documentation:</strong> Results must be logged in the emergency lighting logbook</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-3">
              <p className="text-foreground text-sm sm:text-base font-semibold">
                Why Keep Tests Short?
              </p>
              <ul className="space-y-2 text-foreground text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">•</span>
                  <span>Prevents unnecessary battery discharge that reduces available capacity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">•</span>
                  <span>Minimises time building is left without full emergency lighting protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">•</span>
                  <span>Reduces cumulative battery cycling, extending overall battery lifespan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">•</span>
                  <span>Confirms operation without the 24-hour recharge period needed after duration tests</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
              <p className="text-elec-yellow font-semibold text-sm sm:text-base">
                Detailed Test Procedure:
              </p>
              <ol className="space-y-3 text-foreground text-sm sm:text-base list-none">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    <strong>Simulate Mains Failure</strong>
                    <p className="text-gray-300 text-sm mt-1">Use test key switch, monitoring panel, or switch off the circuit breaker for the emergency lighting circuit</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    <strong>Verify Illumination</strong>
                    <p className="text-gray-300 text-sm mt-1">Check each luminaire illuminates in emergency mode and provides adequate light output</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    <strong>Confirm Exit Sign Orientation</strong>
                    <p className="text-gray-300 text-sm mt-1">Verify exit signs remain visible and arrows point in correct evacuation direction</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">4</span>
                  <div>
                    <strong>Restore Mains Power</strong>
                    <p className="text-gray-300 text-sm mt-1">Restore normal supply and check charging indicators show batteries are recharging</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">5</span>
                  <div>
                    <strong>Document Results</strong>
                    <p className="text-gray-300 text-sm mt-1">Record test date, pass/fail status, and any faults in the emergency lighting logbook</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">⏱</div>
                <div>
                  <p className="text-amber-300 font-semibold mb-1 text-sm sm:text-base">Time Requirements - 100 Fitting Installation:</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm mt-2">
                    <div className="space-y-1">
                      <p className="text-gray-300"><strong className="text-foreground">Monthly Test Duration:</strong> 30–60 seconds per fitting</p>
                      <p className="text-gray-300"><strong className="text-foreground">Access & Documentation:</strong> 4–7 minutes per fitting</p>
                      <p className="text-gray-300"><strong className="text-foreground">Total Monthly Time:</strong> 8–12 hours for 100 fittings</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-300"><strong className="text-foreground">Annual Testing Hours:</strong> 96–144 hours/year</p>
                      <p className="text-gray-300"><strong className="text-foreground">Labour Cost:</strong> £1,920–£2,880 @ £20/hour</p>
                      <p className="text-blue-300 text-xs mt-2 italic">*Self-test units can reduce labour by 70–80%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FunctionalTestQuickCheck />
          </div>
        </div>

        {/* Section 2: Full 3-Hour Duration Testing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Full 3-Hour Duration Testing
            </h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              The annual test requires all emergency lights to run for their rated autonomy — normally 3 hours.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-red-500">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-red-400 font-semibold text-lg">Annual Duration Test Requirements</h4>
                <Badge className="bg-red-600">3-Hour Test</Badge>
              </div>
              <p className="text-foreground text-sm mb-3">
                The full duration test is the definitive verification that emergency lighting systems can sustain illumination for their rated period. This test must be completed annually, at commissioning, and after any significant modifications to prove battery capacity under realistic load conditions.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Test Duration:</strong> Full rated autonomy (normally 3 hours, some systems 1 hour)</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Recharge Period:</strong> 24 hours minimum before system returns to full capacity</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Scheduling:</strong> Must be carried out outside occupied hours to avoid leaving building unprotected</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Measurement:</strong> Light output (lux) should be measured at intervals during the test</p>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 space-y-3">
              <p className="text-foreground text-sm sm:text-base font-semibold">
                Critical Test Objectives:
              </p>
              <ul className="space-y-2 text-foreground text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span><strong>Battery Capacity Verification:</strong> Confirms batteries can sustain load for the full 3-hour period</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span><strong>Illumination Maintenance:</strong> Ensures light levels remain adequate throughout the entire duration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span><strong>Weak Battery Detection:</strong> Identifies batteries that pass short tests but fail under sustained load</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span><strong>Driver/Converter Performance:</strong> Tests LED drivers and DC/DC converters under prolonged operation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span><strong>Regulatory Compliance:</strong> Provides documented evidence required by BS 5266-1 and fire inspectors</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
              <p className="text-elec-yellow font-semibold text-sm sm:text-base">
                Detailed Duration Test Procedure:
              </p>
              <ol className="space-y-3 text-foreground text-sm sm:text-base list-none">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    <strong>Pre-Test Preparation</strong>
                    <p className="text-gray-300 text-sm mt-1">Ensure batteries are fully charged (24 hours after last test). Notify building occupants and arrange for alternative lighting if needed</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    <strong>Isolate Mains Supply</strong>
                    <p className="text-gray-300 text-sm mt-1">Switch off circuit breaker or activate central battery system test mode. Record start time</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    <strong>Monitor Performance</strong>
                    <p className="text-gray-300 text-sm mt-1">Check illumination levels at 0, 30 min, 1 hour, 2 hours, and 3 hours using lux meter. Minimum 1 lux on escape routes must be maintained throughout</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">4</span>
                  <div>
                    <strong>End of Test Verification</strong>
                    <p className="text-gray-300 text-sm mt-1">After 3 hours, verify escape routes and safety equipment remain clearly visible. Note any luminaires that failed before the full period</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">5</span>
                  <div>
                    <strong>Restore Power & Recharge</strong>
                    <p className="text-gray-300 text-sm mt-1">Restore mains supply, verify charging indicators activate, and allow 24-hour recharge period</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">6</span>
                  <div>
                    <strong>Document & Report</strong>
                    <p className="text-gray-300 text-sm mt-1">Log all results, failures, and remedial actions in emergency lighting logbook. Report any units requiring battery replacement</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">£</div>
                <div>
                  <p className="text-amber-300 font-semibold mb-1 text-sm sm:text-base">Cost & Time Analysis - Annual Duration Test:</p>
                  <p className="text-foreground text-sm mb-2">
                    For a typical 150-fitting commercial installation:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-gray-300"><strong className="text-foreground">Test Duration:</strong> 3 hours (plus setup/monitoring)</p>
                      <p className="text-gray-300"><strong className="text-foreground">Engineer Time:</strong> 4–6 hours (including documentation)</p>
                      <p className="text-gray-300"><strong className="text-foreground">Recharge Period:</strong> 24 hours (building at risk)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-300"><strong className="text-foreground">Labour Cost:</strong> £80–£120</p>
                      <p className="text-gray-300"><strong className="text-foreground">Equipment:</strong> £20–£40 (lux meter, documentation)</p>
                      <p className="text-blue-300 text-xs mt-2 italic">*Test must be scheduled outside occupied hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded p-4 mt-4">
              <h5 className="text-elec-yellow font-semibold text-sm sm:text-base mb-3">Required Test Equipment:</h5>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span className="text-foreground"><strong>Lux Meter:</strong> Calibrated light meter to verify minimum illumination levels (1 lux escape routes, 0.5 lux open areas)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span className="text-foreground"><strong>Timer/Stopwatch:</strong> Accurate timing device to record 3-hour test period</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span className="text-foreground"><strong>Logbook:</strong> Emergency lighting record book for documenting results</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span className="text-foreground"><strong>Means of Isolation:</strong> Test key, circuit breaker access, or central system controls</span>
                  </div>
                </div>
              </div>
            </div>

            <DurationTestQuickCheck />
          </div>
        </div>

        {/* Section 3: Commissioning vs Routine Testing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Commissioning vs Routine Testing
            </h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="space-y-3">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="text-green-400 font-semibold text-sm sm:text-base mb-2">At Commissioning:</h5>
                <p className="text-foreground text-sm">
                  A full 3-hour duration test is mandatory before handover. This provides documented evidence that the system meets design specifications and regulatory requirements. The commissioning certificate cannot be issued without a successful duration test.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="text-green-400 font-semibold text-sm sm:text-base mb-2">Monthly Functional Tests:</h5>
                <p className="text-foreground text-sm">
                  Short tests (30–60 seconds) to verify all luminaires switch to emergency mode. Quick confirmation that batteries are charging and systems are operational without significant discharge.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="text-green-400 font-semibold text-sm sm:text-base mb-2">Annual Duration Test:</h5>
                <p className="text-foreground text-sm">
                  Full 3-hour test required every 12 months to verify battery capacity under realistic load. This comprehensive test identifies ageing batteries before they fail in a real emergency.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="text-green-400 font-semibold text-sm sm:text-base mb-2">After Modifications:</h5>
                <p className="text-foreground text-sm">
                  Both functional and full duration tests must be repeated after any significant changes to the system — new luminaires, circuit modifications, or battery replacements.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded p-4 mt-3">
              <h5 className="text-elec-yellow font-semibold text-sm sm:text-base mb-3">Testing Schedule Summary:</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-foreground py-2 pr-4">Test Type</th>
                      <th className="text-left text-foreground py-2 px-2">Frequency</th>
                      <th className="text-left text-foreground py-2 px-2">Duration</th>
                      <th className="text-left text-foreground py-2 pl-2">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-gray-700">
                      <td className="py-2 pr-4">Functional</td>
                      <td className="py-2 px-2">Monthly</td>
                      <td className="py-2 px-2">30–60 sec</td>
                      <td className="py-2 pl-2 text-xs">Verify switching & charging</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 pr-4">Duration</td>
                      <td className="py-2 px-2">Annual</td>
                      <td className="py-2 px-2">3 hours</td>
                      <td className="py-2 pl-2 text-xs">Test battery capacity</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 pr-4">Commissioning</td>
                      <td className="py-2 px-2">One-time</td>
                      <td className="py-2 px-2">3 hours</td>
                      <td className="py-2 pl-2 text-xs">Pre-handover verification</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Post-modification</td>
                      <td className="py-2 px-2">As needed</td>
                      <td className="py-2 px-2">Both</td>
                      <td className="py-2 pl-2 text-xs">After system changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <CommissioningTestQuickCheck />
          </div>
        </div>

        {/* Section 4: Common Issues */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Common Issues Found During Tests
            </h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 space-y-3">
              <p className="text-purple-400 font-semibold text-sm sm:text-base">
                Common Failure Modes Discovered:
              </p>
              <div className="space-y-3">
                <div className="bg-gray-900/50 rounded p-3">
                  <p className="text-foreground font-medium text-sm mb-1">🔋 Battery Capacity Degradation</p>
                  <p className="text-gray-300 text-xs">
                    <strong>Symptom:</strong> Luminaires fail after 40–90 minutes instead of full 3 hours
                  </p>
                  <p className="text-gray-300 text-xs">
                    <strong>Cause:</strong> Ageing NiCd/NiMH batteries (typically 3–5 years old) that have lost significant capacity
                  </p>
                  <p className="text-green-300 text-xs mt-1">
                    <strong>Solution:</strong> Replace battery packs across affected fittings (often in batches from same installation date)
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded p-3">
                  <p className="text-foreground font-medium text-sm mb-1">🔄 Incorrect Exit Sign Orientation</p>
                  <p className="text-gray-300 text-xs">
                    <strong>Symptom:</strong> Exit signs illuminate but arrows point wrong direction
                  </p>
                  <p className="text-gray-300 text-xs">
                    <strong>Cause:</strong> Installation error or building layout changes not reflected in signage
                  </p>
                  <p className="text-green-300 text-xs mt-1">
                    <strong>Solution:</strong> Re-orient signs or replace with correct directional legends per current escape routes
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded p-3">
                  <p className="text-foreground font-medium text-sm mb-1">⚡ Wiring/Switching Faults</p>
                  <p className="text-gray-300 text-xs">
                    <strong>Symptom:</strong> Some fittings fail to switch to emergency mode
                  </p>
                  <p className="text-gray-300 text-xs">
                    <strong>Cause:</strong> Incorrect wiring at luminaire terminals, faulty switching relays, or control circuit errors
                  </p>
                  <p className="text-green-300 text-xs mt-1">
                    <strong>Solution:</strong> Verify wiring connections, test control circuits, replace faulty components
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded p-3">
                  <p className="text-foreground font-medium text-sm mb-1">📉 Voltage Drop in Central Systems</p>
                  <p className="text-gray-300 text-xs">
                    <strong>Symptom:</strong> Remote luminaires dim or fail while those near battery room remain bright
                  </p>
                  <p className="text-gray-300 text-xs">
                    <strong>Cause:</strong> Excessive voltage drop over long cable runs, undersized cabling, or poor connections
                  </p>
                  <p className="text-green-300 text-xs mt-1">
                    <strong>Solution:</strong> Upgrade cable sizes, improve connections, or add sub-circuits closer to remote areas
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded p-3">
                  <p className="text-foreground font-medium text-sm mb-1">🌡️ Temperature-Related Failures</p>
                  <p className="text-gray-300 text-xs">
                    <strong>Symptom:</strong> Batteries perform poorly in hot plant rooms or cold external areas
                  </p>
                  <p className="text-gray-300 text-xs">
                    <strong>Cause:</strong> Battery chemistry is temperature-sensitive (optimal 15–25°C for most types)
                  </p>
                  <p className="text-green-300 text-xs mt-1">
                    <strong>Solution:</strong> Relocate luminaires/batteries to temperature-controlled areas, or upgrade to lithium batteries (better temperature tolerance)
                  </p>
                </div>
              </div>
            </div>

            <TestFailureQuickCheck />
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
