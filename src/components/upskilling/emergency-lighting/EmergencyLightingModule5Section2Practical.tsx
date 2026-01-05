import { Wrench, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingModule5Section2Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Testing Methodology</h3>
          
          <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
            <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Systematic Test Approach
            </h4>
            <div className="space-y-2 text-foreground text-sm">
              <p>
                <span className="font-medium text-green-200">Pre-Test Preparation:</span> Verify batteries have been charging for at least 24 hours since last test. Notify building occupants and arrange alternative lighting if testing during occupied hours
              </p>
              <p>
                <span className="font-medium text-green-200">Sequential Testing:</span> Test one floor or zone at a time to maintain emergency lighting protection in other areas. Never isolate the entire building simultaneously unless completely unoccupied
              </p>
              <p>
                <span className="font-medium text-green-200">Methodical Verification:</span> Walk through each area checking every luminaire against logbook reference numbers. Tick off each fitting as tested to ensure none are missed
              </p>
              <p>
                <span className="font-medium text-green-200">Immediate Fault Recording:</span> Document failures as they occur during testing with location, time of failure, and symptoms. Take photographs of problem areas
              </p>
              <p>
                <span className="font-medium text-green-200">Post-Test Verification:</span> Confirm charging indicators activate after restoring power. Schedule battery replacements for units that failed or showed reduced capacity
              </p>
            </div>
          </div>

          <div className="bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r">
            <h4 className="font-semibold text-orange-300 mb-3">Time Planning and Scheduling</h4>
            <p className="text-foreground text-sm mb-3">
              Realistic time allocations for comprehensive testing (includes setup, testing, documentation, and client reporting):
            </p>
            <div className="bg-elec-dark p-4 rounded border border-gray-600">
              <div className="space-y-2.5 text-sm sm:text-base">
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Monthly functional test (50 luminaires):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">2-3 hours</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Monthly functional test (150 luminaires):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">6-9 hours</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Annual 3-hour duration test (50 luminaires):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">4-5 hours</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Annual 3-hour duration test (150 luminaires):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">6-8 hours</span>
                </div>
                <div className="pt-2 border-t border-gray-600">
                  <div className="font-semibold text-elec-yellow mb-2">Additional Time Factors:</div>
                  <div className="text-foreground pl-4 space-y-1 text-sm">
                    <div>• Multi-storey buildings (access time between floors)</div>
                    <div>• Difficult access areas (ceiling voids, plant rooms)</div>
                    <div>• Large open areas requiring lux measurements</div>
                    <div>• Central battery systems (monitoring connections)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Equipment Requirements</h3>
          
          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
            <h4 className="font-semibold text-blue-300 mb-3">Essential Test Equipment</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Lux Meter (Calibrated)</h5>
                <p className="text-foreground text-sm">
                  Digital light meter with current calibration certificate for measuring illumination levels. Verify minimum 1 lux on escape routes and 0.5 lux in open areas (BS EN 1838 requirements)
                </p>
              </div>
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Accurate Timer/Stopwatch</h5>
                <p className="text-foreground text-sm">
                  Reliable timing device for 3-hour duration tests. Mobile phone timers acceptable but dedicated stopwatch preferred. Record exact start and finish times for each test
                </p>
              </div>
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Emergency Lighting Logbook</h5>
                <p className="text-foreground text-sm">
                  Comprehensive record book with pre-printed test sheets. Must include luminaire reference numbers, test dates, pass/fail status, fault descriptions, and remedial actions taken
                </p>
              </div>
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Camera/Documentation Equipment</h5>
                <p className="text-foreground text-sm">
                  Date-stamped photographs of failed luminaires, inadequate illumination areas, and successful test completion. Provides evidence for client reports and insurance claims
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Common Testing Failures</h3>
          
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r">
            <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Typical Failures and Solutions
            </h4>
            <div className="space-y-2 text-foreground text-sm">
              <p>
                <span className="font-medium text-red-200">Premature Battery Failure:</span> Luminaires failing after 40-90 minutes indicates degraded battery capacity. Replace batteries in affected units — often multiple fittings from same installation batch
              </p>
              <p>
                <span className="font-medium text-red-200">Non-Switching to Emergency Mode:</span> Luminaires remain off during test suggests wiring faults, failed control circuits, or incorrect terminal connections. Check L, N, and switch wire connections at each affected fitting
              </p>
              <p>
                <span className="font-medium text-red-200">Inadequate Illumination Levels:</span> Light output below 1 lux on escape routes may indicate wrong luminaire types, incorrect spacing, or LED degradation. Verify lux readings at floor level along entire escape path
              </p>
              <p>
                <span className="font-medium text-red-200">Flickering or Dimming:</span> Poor quality LED drivers, loose connections, or voltage drop in central battery systems. Check all terminal connections and measure voltage at luminaire during emergency operation
              </p>
              <p>
                <span className="font-medium text-red-200">Failed to Restore After Test:</span> Batteries not recharging suggests blown fuses, tripped circuit breakers, or faulty charging circuits. Verify mains supply restored and charging indicators show green/active status
              </p>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Best Practice Tip</h4>
            <p className="text-foreground text-sm">
              Schedule annual 3-hour duration tests outside occupied hours (evenings/weekends) to avoid leaving buildings without emergency lighting protection during business operations. Always inform building management 48 hours in advance and confirm alternative evacuation lighting arrangements if testing during occupied periods.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Client Communication</h3>
          
          <div className="bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r">
            <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Managing Testing Schedules with Clients
            </h4>
            <p className="text-foreground text-sm mb-3">
              Clear communication about testing schedules and implications helps prevent disruption and ensures compliance:
            </p>
            <div className="space-y-2 text-foreground text-sm">
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Provide written advance notice of monthly tests — minimum 7 days for occupied premises</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Schedule annual duration tests during non-occupied hours to maintain building safety</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Explain 24-hour recharge period required after duration tests before full capacity is restored</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Present test failure reports professionally with clear remedial action proposals and costs</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Advise on battery replacement cycles (3-5 years typical) to help clients budget for future maintenance</span>
              </div>
            </div>
            <p className="text-foreground text-sm mt-3 italic">
              Document all client communications regarding test scheduling, failures discovered, and remedial works authorised to protect all parties if compliance issues arise.
            </p>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Testing Best Practice Checklist</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Verify batteries fully charged (24 hours minimum) before duration tests</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Test methodically using logbook reference numbers — tick off each fitting</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Measure lux levels at regular intervals during 3-hour tests (0, 1hr, 2hr, 3hr)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Document all failures with photographs, symptoms, and time of occurrence</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Verify charging indicators activate after restoring mains power</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Schedule remedial works for failed units immediately — don't delay replacements</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Provide comprehensive test reports to building management with clear action points</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Maintain calibration certificates for all test equipment (lux meters, timers)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Keep logbook records for minimum 5 years as evidence of compliance</span>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
