
import React from 'react';
import { TestTube2, Zap, AlertTriangle, Clock, CheckCircle2, Settings, Activity } from 'lucide-react';

const HowToTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <TestTube2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">RCD Test Equipment and Setup</h4>
      </div>
      <div className="space-y-3 text-xs sm:text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Essential test equipment:</p>
          <p className="ml-4">• <strong>RCD tester:</strong> Calibrated instrument capable of injecting precise test currents</p>
          <p className="ml-4">• <strong>Test leads:</strong> Appropriate leads for connection to RCD terminals or test sockets</p>
          <p className="ml-4">• <strong>Socket adaptors:</strong> For testing RCDs via socket outlets</p>
          <p className="ml-4">• <strong>Voltage indicator:</strong> To verify supply presence and correct connection</p>
          <p className="ml-4">• <strong>Calibration certificate:</strong> Ensure tester accuracy within ±5% or better</p>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Pre-test verification checklist:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-green-400">Tester preparation:</p>
              <p>• Check battery condition and charge level</p>
              <p>• Verify test lead continuity and insulation</p>
              <p>• Confirm calibration certificate validity</p>
              <p>• Function test on known working RCD</p>
              <p>• Set correct test parameters for RCD type</p>
            </div>
            <div>
              <p className="font-medium text-green-400">RCD preparation:</p>
              <p>• Verify RCD rating and type (AC, A, B)</p>
              <p>• Check physical condition for damage</p>
              <p>• Ensure RCD is in ON position</p>
              <p>• Test mechanical test button operation</p>
              <p>• Note any downstream load conditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Standard RCD Testing Procedure</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Step 1: Test Button Verification</p>
          <p className="ml-4">• Press the mechanical test button on the RCD</p>
          <p className="ml-4">• RCD should trip immediately (contacts open)</p>
          <p className="ml-4">• If test button fails to trip RCD, do not proceed - RCD is faulty</p>
          <p className="ml-4">• Reset RCD after successful test button operation</p>
          <p className="ml-4">• This confirms basic mechanical operation but not electrical performance</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 2: Connection and Safety Checks</p>
          <p className="ml-4">• <strong>Socket testing:</strong> Insert RCD tester plug into socket downstream of RCD</p>
          <p className="ml-4">• <strong>Terminal testing:</strong> Connect between phase and earth at appropriate test point</p>
          <p className="ml-4">• <strong>Polarity check:</strong> Verify correct phase/neutral connections</p>
          <p className="ml-4">• <strong>Supply voltage:</strong> Confirm voltage is within ±10% of nominal (207-253V)</p>
          <p className="ml-4">• <strong>Load conditions:</strong> Note any significant loads that remain connected</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 3: Half-Rated Current Test (Non-Trip Test)</p>
          <p className="ml-4">• Apply 50% of rated tripping current (15mA for 30mA RCD)</p>
          <p className="ml-4">• RCD should NOT trip at this current level</p>
          <p className="ml-4">• Apply test current for maximum 2 seconds</p>
          <p className="ml-4">• If RCD trips at half-rated current, it is too sensitive and requires investigation</p>
          <p className="ml-4">• Record result as PASS (no trip) or FAIL (tripped)</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 4: Rated Current Test (Trip Test)</p>
          <p className="ml-4">• Apply 100% of rated tripping current (30mA for 30mA RCD)</p>
          <p className="ml-4">• RCD must trip within 300ms for general type RCDs</p>
          <p className="ml-4">• Record actual trip time displayed on tester</p>
          <p className="ml-4">• Typical trip times should be 20-40ms for healthy RCDs</p>
          <p className="ml-4">• Reset RCD after test and verify normal operation</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 5: Five Times Rated Current Test (Fast Trip)</p>
          <p className="ml-4">• Apply 5× rated tripping current (150mA for 30mA RCD)</p>
          <p className="ml-4">• RCD must trip within 40ms maximum</p>
          <p className="ml-4">• This tests the RCD's response to higher fault currents</p>
          <p className="ml-4">• Record actual trip time - should be &lt;40ms</p>
          <p className="ml-4">• Essential test for personal protection verification</p>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 border-l-4 border-l-orange-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-orange-400">Testing Different RCD Types</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white">
        <div className="bg-card rounded p-3">
          <div className="text-orange-400 font-medium mb-2">Type AC RCDs</div>
          <ul className="space-y-1">
            <li>• Test at 0° and 180° phase angles</li>
            <li>• Both positive and negative half-cycles</li>
            <li>• Standard test procedure applies</li>
            <li>• Most common residential type</li>
            <li>• May not detect pulsating DC faults</li>
          </ul>
        </div>
        <div className="bg-card rounded p-3">
          <div className="text-orange-400 font-medium mb-2">Type A RCDs</div>
          <ul className="space-y-1">
            <li>• Test with AC and pulsating DC</li>
            <li>• Additional pulsating DC test required</li>
            <li>• Test at 0° and 90° for pulsating DC</li>
            <li>• Essential for modern electronic loads</li>
            <li>• Higher specification than Type AC</li>
          </ul>
        </div>
        <div className="bg-card rounded p-3">
          <div className="text-orange-400 font-medium mb-2">Type B RCDs</div>
          <ul className="space-y-1">
            <li>• AC, pulsating DC, and smooth DC tests</li>
            <li>• Complex test procedures required</li>
            <li>• Specialist test equipment needed</li>
            <li>• Required for EV charging points</li>
            <li>• Most comprehensive protection</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">RCD Test Results and Acceptance Criteria</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Pass/Fail Criteria Summary:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-green-400 mb-1">Test 1 - Half Rated Current (×0.5):</p>
              <p>• RCD must NOT trip</p>
              <p>• Duration: Up to 2 seconds</p>
              <p>• 15mA for 30mA RCD</p>
              <p>• Confirms RCD isn't over-sensitive</p>
            </div>
            <div>
              <p className="font-medium text-green-400 mb-1">Test 2 - Rated Current (×1):</p>
              <p>• RCD must trip within 300ms</p>
              <p>• 30mA for 30mA RCD</p>
              <p>• Typical: 20-40ms for healthy RCD</p>
              <p>• Core functional test</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-medium text-green-400 mb-1">Test 3 - Five Times Rated Current (×5):</p>
            <p>• RCD must trip within 40ms maximum</p>
            <p>• 150mA for 30mA RCD</p>
            <p>• Tests fast response to higher currents</p>
            <p>• Critical for shock protection verification</p>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Failure Indicators:</p>
          <div className="space-y-1 text-sm">
            <p>• <strong>No trip at rated current:</strong> RCD completely failed</p>
            <p>• <strong>Trip time {'>'}300ms at rated current:</strong> RCD too slow</p>
            <p>• <strong>Trip time {'>'}40ms at 5× rated current:</strong> Inadequate fast response</p>
            <p>• <strong>Trip at half rated current:</strong> RCD too sensitive</p>
            <p>• <strong>Test button doesn't operate RCD:</strong> Mechanical failure</p>
            <p>• <strong>Inconsistent results:</strong> Intermittent fault present</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Advanced Testing Techniques</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Phase angle testing for Type AC RCDs:</p>
          <p className="ml-4">• Test at 0° phase angle (current peak aligns with voltage peak)</p>
          <p className="ml-4">• Test at 180° phase angle (current peak opposite to voltage peak)</p>
          <p className="ml-4">• Both tests must pass - some RCDs more sensitive at specific angles</p>
          <p className="ml-4">• Record worst-case (longest) trip time from both tests</p>
          <p className="ml-4">• Phase angle affects magnetic field strength in toroidal transformer</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Ramp testing capability:</p>
          <p className="ml-4">• Gradually increase current until RCD trips</p>
          <p className="ml-4">• Determines exact trip threshold of the RCD</p>
          <p className="ml-4">• Should trip between 50% and 100% of rated current</p>
          <p className="ml-4">• Useful for investigating marginal or suspect RCDs</p>
          <p className="ml-4">• Helps identify drift in RCD sensitivity over time</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Loop impedance during RCD testing:</p>
          <p className="ml-4">• Some testers can measure loop impedance without tripping RCD</p>
          <p className="ml-4">• Uses very low test current (&lt;15mA) to avoid RCD operation</p>
          <p className="ml-4">• Allows verification of earth path integrity on RCD-protected circuits</p>
          <p className="ml-4">• Essential for confirming both RCD and ADS protection are adequate</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
          <p className="font-medium text-blue-400 mb-2">Testing RCDs in Series (Discrimination):</p>
          <p className="text-sm text-white">
            When RCDs are installed in series (e.g., main RCD + RCBO), test the downstream device first. 
            If both trip during testing, check for correct discrimination. Time-delayed (S-type) RCDs upstream 
            should allow downstream RCDs to operate first.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">Safety Considerations During Testing</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Personal safety precautions:</p>
          <p className="ml-4">• Use appropriate PPE including insulated gloves</p>
          <p className="ml-4">• Ensure test equipment is properly calibrated and in good condition</p>
          <p className="ml-4">• Never bypass or disable RCD protection unnecessarily</p>
          <p className="ml-4">• Be aware that loads downstream will lose power during testing</p>
          <p className="ml-4">• Consider impact on critical systems (alarms, refrigeration, etc.)</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Equipment protection:</p>
          <p className="ml-4">• Warn users that power interruption will occur during testing</p>
          <p className="ml-4">• Check for sensitive electronic equipment on protected circuits</p>
          <p className="ml-4">• Consider testing during off-peak hours to minimise disruption</p>
          <p className="ml-4">• Ensure UPS systems are functioning for critical loads</p>
          <p className="ml-4">• Document any equipment that cannot tolerate power interruption</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Testing in Special Locations:</p>
          <p className="text-sm text-white">
            Extra care required when testing RCDs protecting special locations (bathrooms, swimming pools, medical areas). 
            Ensure alternative safety measures are in place during testing, and restore protection immediately after testing. 
            Consider increased testing frequency in harsh environments.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Documentation and Record Keeping</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Essential information to record:</p>
          <p className="ml-4">• <strong>RCD details:</strong> Rating, type, manufacturer, and location</p>
          <p className="ml-4">• <strong>Test results:</strong> Trip times for each test current level</p>
          <p className="ml-4">• <strong>Test conditions:</strong> Supply voltage, ambient temperature, load conditions</p>
          <p className="ml-4">• <strong>Equipment used:</strong> Tester model and calibration details</p>
          <p className="ml-4">• <strong>Test outcome:</strong> Pass/fail status and any recommendations</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Standard test form entries:</p>
          <p className="ml-4">• RCD rating and type (e.g., 30mA Type A)</p>
          <p className="ml-4">• Test button operation: Satisfactory/Unsatisfactory</p>
          <p className="ml-4">• Trip time at IΔn (rated current): ___ms (max 300ms)</p>
          <p className="ml-4">• Trip time at 5×IΔn: ___ms (max 40ms)</p>
          <p className="ml-4">• Non-trip at 0.5×IΔn: Pass/Fail</p>
          <p className="ml-4">• Overall assessment: Satisfactory/Unsatisfactory</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">Quality Assurance:</p>
          <p className="text-sm text-white">
            Cross-reference RCD test results with circuit details and previous test records. 
            Look for trends in trip times that might indicate deteriorating performance. 
            Fast trip times (&lt;10ms) may indicate an oversensitive RCD, while slower times ({'>'}100ms) suggest deterioration.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default HowToTestSection;
