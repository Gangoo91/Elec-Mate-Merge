import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';
import { MonthlyTestQuickCheck } from './MonthlyTestQuickCheck';
import { AnnualTestQuickCheck } from './AnnualTestQuickCheck';
import { LogbookQuickCheck } from './LogbookQuickCheck';
import { ComplianceQuickCheck } from './ComplianceQuickCheck';

export const EmergencyLightingModule5Section3Technical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Settings className="h-6 w-6 text-elec-yellow" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Section 1: Monthly Functional Testing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Monthly Functional Testing
            </h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              The purpose of monthly testing is to confirm that luminaires will operate when the mains fails.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-green-500">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-green-400 font-semibold text-lg">Monthly Test Requirements</h4>
                <Badge className="bg-green-600">BS 5266-8</Badge>
              </div>
              <p className="text-foreground text-sm mb-3">
                Monthly functional tests verify that all emergency luminaires switch to battery power when mains supply fails. These short-duration tests are designed to confirm ongoing system readiness without significantly depleting battery capacity.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Frequency:</strong> Every 30 days (monthly) as mandated by BS 5266-8</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Duration:</strong> Kept short (a few minutes) to avoid draining batteries</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Method:</strong> Use test key switches, monitoring systems, or manual supply isolation</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Purpose:</strong> Confirm luminaires switch to emergency mode and batteries are charging</p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 space-y-3">
              <p className="text-foreground text-sm sm:text-base font-semibold">
                What to Check During Monthly Tests:
              </p>
              <ul className="space-y-2 text-foreground text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span><strong>Emergency Mode Activation:</strong> All luminaires switch to emergency mode when supply is interrupted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span><strong>Exit Sign Illumination:</strong> Exit signs illuminate and arrows point in the correct direction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span><strong>Charge Indicators:</strong> Charging indicators function correctly when power is restored</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span><strong>Light Output:</strong> Luminaires provide adequate illumination (visual check)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
              <p className="text-elec-yellow font-semibold text-sm sm:text-base">
                Monthly Test Procedure:
              </p>
              <ol className="space-y-3 text-foreground text-sm sm:text-base list-none">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    <strong>Isolate Mains Supply</strong>
                    <p className="text-gray-300 text-sm mt-1">Use test key, monitoring panel, or isolate the supply circuit breaker</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    <strong>Visual Inspection</strong>
                    <p className="text-gray-300 text-sm mt-1">Walk through all areas checking that luminaires illuminate correctly</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    <strong>Check Exit Signs</strong>
                    <p className="text-gray-300 text-sm mt-1">Verify all exit signs are visible and directional arrows are correct</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">4</span>
                  <div>
                    <strong>Restore Power (After Few Minutes)</strong>
                    <p className="text-gray-300 text-sm mt-1">Restore mains supply after short test period (typically 2-5 minutes)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">5</span>
                  <div>
                    <strong>Verify Charging</strong>
                    <p className="text-gray-300 text-sm mt-1">Check that charging indicators show batteries are recharging correctly</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">6</span>
                  <div>
                    <strong>Record Results</strong>
                    <p className="text-gray-300 text-sm mt-1">Document test date, results, and any defects in the emergency lighting logbook</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">!</div>
                <div>
                  <p className="text-amber-300 font-semibold mb-1 text-sm sm:text-base">Why Keep Monthly Tests Short?</p>
                  <p className="text-foreground text-sm mb-2">
                    The test is deliberately brief to avoid draining battery capacity unnecessarily:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Prevents reducing available capacity before full recharge</li>
                    <li>• Minimises time building is left without full emergency protection</li>
                    <li>• Reduces battery cycling, extending overall battery lifespan</li>
                    <li>• Avoids the 24-hour recharge period needed after full-duration tests</li>
                  </ul>
                </div>
              </div>
            </div>

            <MonthlyTestQuickCheck />
          </div>
        </div>

        {/* Section 2: Annual Full-Duration Testing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Annual Full-Duration Testing
            </h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              The annual test ensures luminaires and batteries can sustain illumination for the full rated period (typically 3 hours).
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-blue-500">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-blue-400 font-semibold text-lg">Annual Duration Test Requirements</h4>
                <Badge className="bg-blue-600">3-Hour Test</Badge>
              </div>
              <p className="text-foreground text-sm mb-3">
                The annual full-duration test is the definitive proof that emergency lighting systems can maintain illumination for their rated autonomy period. This test confirms battery capacity under sustained load conditions and identifies batteries that may pass short tests but fail under prolonged operation.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Duration:</strong> Full autonomy time (3 hours in most buildings)</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Frequency:</strong> Annually (every 12 months)</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Scheduling:</strong> Must be during low occupancy (early morning or late evening)</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Recharge:</strong> Batteries must recharge correctly within 24 hours afterwards</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-3">
              <p className="text-foreground text-sm sm:text-base font-semibold">
                What the Annual Test Proves:
              </p>
              <ul className="space-y-2 text-foreground text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>Battery Capacity:</strong> Batteries can sustain full load for the complete 3-hour period</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>Maintained Illumination:</strong> Minimum lux levels are maintained throughout the duration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>Route Visibility:</strong> Escape routes and fire-fighting equipment remain clearly visible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>System Endurance:</strong> All fittings continue operating for the full period without failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>Proper Recharging:</strong> Batteries recharge correctly within 24 hours after test completion</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
              <p className="text-elec-yellow font-semibold text-sm sm:text-base">
                Annual Duration Test Procedure:
              </p>
              <ol className="space-y-3 text-foreground text-sm sm:text-base list-none">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    <strong>Pre-Test Preparation</strong>
                    <p className="text-gray-300 text-sm mt-1">Ensure batteries fully charged (24 hours after last test). Schedule during low occupancy period</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    <strong>Isolate Mains Supply</strong>
                    <p className="text-gray-300 text-sm mt-1">Switch off supply or activate test mode. Record start time precisely</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    <strong>Monitor Throughout Duration</strong>
                    <p className="text-gray-300 text-sm mt-1">Check illumination at intervals (0, 1h, 2h, 3h). Measure lux levels at critical points</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">4</span>
                  <div>
                    <strong>Final Verification (3 Hours)</strong>
                    <p className="text-gray-300 text-sm mt-1">After full 3 hours, verify all escape routes and safety equipment remain clearly visible</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">5</span>
                  <div>
                    <strong>Note Any Failures</strong>
                    <p className="text-gray-300 text-sm mt-1">Document any luminaires that failed before completing the full 3-hour period</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">6</span>
                  <div>
                    <strong>Restore and Recharge</strong>
                    <p className="text-gray-300 text-sm mt-1">Restore mains supply and verify charging indicators activate. Allow 24-hour recharge period</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-xs">7</span>
                  <div>
                    <strong>Complete Documentation</strong>
                    <p className="text-gray-300 text-sm mt-1">Record all results, failures, and remedial actions in emergency lighting logbook</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-red-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">⚠</div>
                <div>
                  <p className="text-red-400 font-semibold mb-1 text-sm sm:text-base">Critical Scheduling Considerations:</p>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Test during low occupancy to minimise risk if real emergency occurs</li>
                    <li>• In large buildings, stagger tests across zones to maintain some emergency coverage</li>
                    <li>• Arrange alternative lighting provisions if building remains occupied during test</li>
                    <li>• Allow full 24-hour recharge period before building returns to normal operation</li>
                    <li>• Failed luminaires must be repaired immediately and retested</li>
                  </ul>
                </div>
              </div>
            </div>

            <AnnualTestQuickCheck />
          </div>
        </div>

        {/* Section 3: Recording Test Results */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Recording Test Results
            </h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              All tests must be recorded in the emergency lighting logbook.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-purple-500">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-purple-400 font-semibold text-lg">Logbook Requirements</h4>
                <Badge className="bg-purple-600">BS 5266-8</Badge>
              </div>
              <p className="text-foreground text-sm mb-3">
                The emergency lighting logbook is a legal document that must be maintained for the life of the installation. It provides evidence of compliance and must be made available to fire authorities, insurers, and building inspectors upon request.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Location:</strong> Must be kept on-site in an accessible location (typically near fire alarm panel)</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Retention:</strong> Records must be kept for the life of the system</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Access:</strong> Must be available to authorities and insurers on request</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Format:</strong> Can be paper-based or electronic (with backup)</p>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 space-y-3">
              <p className="text-foreground text-sm sm:text-base font-semibold">
                Five Essential Details for Each Test:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500 text-foreground flex items-center justify-center font-bold text-xs">1</div>
                  <div>
                    <strong className="text-foreground text-sm">Date of Test</strong>
                    <p className="text-gray-300 text-sm mt-0.5">Exact date test was carried out (DD/MM/YYYY format)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500 text-foreground flex items-center justify-center font-bold text-xs">2</div>
                  <div>
                    <strong className="text-foreground text-sm">Type of Test</strong>
                    <p className="text-gray-300 text-sm mt-0.5">Monthly functional test or annual full-duration test</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500 text-foreground flex items-center justify-center font-bold text-xs">3</div>
                  <div>
                    <strong className="text-foreground text-sm">Person Carrying Out Test</strong>
                    <p className="text-gray-300 text-sm mt-0.5">Name and signature of qualified person conducting the test</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500 text-foreground flex items-center justify-center font-bold text-xs">4</div>
                  <div>
                    <strong className="text-foreground text-sm">Results (Pass/Fail)</strong>
                    <p className="text-gray-300 text-sm mt-0.5">Clear indication whether system passed or failed the test</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500 text-foreground flex items-center justify-center font-bold text-xs">5</div>
                  <div>
                    <strong className="text-foreground text-sm">Any Defects and Remedial Action</strong>
                    <p className="text-gray-300 text-sm mt-0.5">Details of any failures, defects found, and corrective actions taken</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <p className="text-elec-yellow font-semibold text-sm sm:text-base mb-3">
                Example Logbook Entry:
              </p>
              <div className="bg-elec-dark p-4 rounded border border-gray-700 font-mono text-sm text-foreground space-y-1">
                <p><strong className="text-elec-yellow">Date:</strong> 15/03/2025</p>
                <p><strong className="text-elec-yellow">Test Type:</strong> Monthly Functional Test</p>
                <p><strong className="text-elec-yellow">Tested By:</strong> J. Smith (Qualified Electrician)</p>
                <p><strong className="text-elec-yellow">Result:</strong> PASS (with minor defect)</p>
                <p><strong className="text-elec-yellow">Defects:</strong> Luminaire EL-23 (First Floor Corridor) - charging indicator not illuminating</p>
                <p><strong className="text-elec-yellow">Remedial Action:</strong> LED indicator replaced 15/03/2025. Luminaire now fully functional</p>
                <p><strong className="text-elec-yellow">Signature:</strong> J. Smith</p>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">💡</div>
                <div>
                  <p className="text-amber-300 font-semibold mb-1 text-sm sm:text-base">Digital Logbook Systems:</p>
                  <p className="text-foreground text-sm mb-2">
                    Modern installations may use electronic logbook systems that offer:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Automatic timestamp recording</li>
                    <li>• Photo documentation of defects</li>
                    <li>• Automatic reminders for scheduled tests</li>
                    <li>• Cloud backup for record security</li>
                    <li>• Instant reports for inspectors and insurers</li>
                  </ul>
                </div>
              </div>
            </div>

            <LogbookQuickCheck />
          </div>
        </div>

        {/* Section 4: Legal and Compliance Considerations */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Legal and Compliance Considerations
            </h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              Compliance with emergency lighting testing requirements is a legal obligation under UK fire safety law.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-red-500">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-red-400 font-semibold text-lg">Legal Framework</h4>
                <Badge className="bg-red-600">Mandatory</Badge>
              </div>
              <p className="text-foreground text-sm mb-3">
                Emergency lighting testing is not optional — it is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005. The Responsible Person (typically building owner or manager) has a legal duty to maintain life safety systems in efficient working order.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Fire Safety Order 2005:</strong> Requires systems to be maintained in efficient working order</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">BS 5266-8:</strong> Defines testing intervals and procedures (monthly and annual)</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Responsible Person:</strong> Legally accountable for compliance</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Enforcement:</strong> Fire and Rescue Authority can issue notices and prosecute</p>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 space-y-3">
              <p className="text-foreground text-sm sm:text-base font-semibold">
                Consequences of Non-Compliance:
              </p>
              <ul className="space-y-2 text-foreground text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">⚠</span>
                  <span><strong>Invalid Insurance Cover:</strong> Insurance policies may be void if testing regime not followed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">⚠</span>
                  <span><strong>Enforcement Notices:</strong> Fire authority can issue formal notices requiring immediate compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">⚠</span>
                  <span><strong>Unlimited Fines:</strong> Courts can impose unlimited fines for serious breaches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">⚠</span>
                  <span><strong>Prosecution:</strong> Responsible Person can face criminal prosecution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">⚠</span>
                  <span><strong>Imprisonment:</strong> In cases causing death or serious injury, imprisonment is possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0">⚠</span>
                  <span><strong>Civil Liability:</strong> Responsible Person may face civil claims if system failure causes harm</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <p className="text-elec-yellow font-semibold text-sm sm:text-base mb-3">
                Who Is the Responsible Person?
              </p>
              <p className="text-foreground text-sm mb-3">
                The Responsible Person is typically:
              </p>
              <ul className="space-y-2 text-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow flex-shrink-0">•</span>
                  <span><strong>Building Owner</strong> (in most cases)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow flex-shrink-0">•</span>
                  <span><strong>Employer</strong> (in workplaces)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow flex-shrink-0">•</span>
                  <span><strong>Premises Manager</strong> (in shared buildings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow flex-shrink-0">•</span>
                  <span><strong>Landlord</strong> (in rental properties)</span>
                </li>
              </ul>
              <p className="text-gray-300 text-sm mt-3 italic">
                As an electrician, your role is to advise the Responsible Person of their legal obligations and ensure testing is carried out correctly.
              </p>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">📋</div>
                <div>
                  <p className="text-amber-300 font-semibold mb-1 text-sm sm:text-base">Electrician's Professional Responsibility:</p>
                  <ul className="space-y-1 text-sm text-foreground mt-2">
                    <li>• Advise clients of their legal testing obligations</li>
                    <li>• Carry out tests in accordance with BS 5266-8 procedures</li>
                    <li>• Document all test results correctly in the logbook</li>
                    <li>• Report defects and failures promptly</li>
                    <li>• Recommend remedial action for non-compliant systems</li>
                    <li>• Maintain competence through ongoing training and CPD</li>
                  </ul>
                </div>
              </div>
            </div>

            <ComplianceQuickCheck />
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
