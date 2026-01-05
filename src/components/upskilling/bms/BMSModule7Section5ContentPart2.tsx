import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, AlertTriangle, TrendingUp, Link } from 'lucide-react';

export const BMSModule7Section5ContentPart2 = () => {
  const ahuSequenceTests = [
    "Pre-start checks: Dampers closed, isolation valves shut",
    "Start sequence: Supply fan → return fan → dampers modulate",
    "Temperature control: Heating/cooling valve response to setpoint",
    "Outside air control: Minimum OA maintained, economiser function",
    "Filter monitoring: Differential pressure alarm at 250Pa",
    "Fault conditions: Motor overload, filter blockage, freeze protection"
  ];

  const boilerSequenceTests = [
    "Lead/lag operation: Primary boiler starts first, standby follows",
    "Staging logic: Additional boilers fire based on demand",
    "Safety sequences: Low water, high temperature, gas pressure trips",
    "Pump operation: Primary/secondary circuits, anti-condensation",
    "Efficiency controls: Weather compensation, setback schedules",
    "Maintenance mode: Manual override, pump exercising, rotation"
  ];

  const criticalAlarmTests = [
    "Fire alarm interface: All equipment stops within 5 seconds",
    "High/low pressure: Equipment trips, backup systems activate", 
    "Temperature extremes: Freeze protection, overheating shutdowns",
    "Power failure: UPS backup, graceful shutdown sequences",
    "Communication loss: Local control mode, fail-safe positions",
    "Sensor failure: Switch to backup sensors, alarm notifications"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Play className="h-5 w-5 text-elec-yellow" />
          Functional Commissioning - Advanced Testing
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Functional commissioning validates complete system operation under real conditions. This comprehensive 
          testing ensures the BMS performs as designed and responds correctly to all operational scenarios.
        </p>

        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-foreground font-bold mb-3">📊 Performance Acceptance Criteria</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <div><strong>Temperature Control:</strong> ±1°C of setpoint</div>
              <div><strong>Humidity Control:</strong> ±5% RH tolerance</div>
              <div><strong>Pressure Control:</strong> ±10Pa accuracy</div>
            </div>
            <div className="space-y-1">
              <div><strong>Response Time:</strong> &lt;2 minutes to setpoint</div>
              <div><strong>Stability:</strong> No oscillation &gt;5 minutes</div>
              <div><strong>Efficiency:</strong> Meet design energy targets</div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-start gap-3 mb-3">
              <Play className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">AHU Sequence Testing</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Comprehensive testing of Air Handling Unit control sequences:
            </p>
            <ul className="text-xs text-foreground space-y-1 ml-4">
              {ahuSequenceTests.map((test, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  {test}
                </li>
              ))}
            </ul>
            <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
              <p className="text-xs text-foreground">
                <strong>Test Method:</strong> Gradually adjust room setpoint and monitor system response over 2-hour period.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-start gap-3 mb-3">
              <Play className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Boiler Plant Commissioning</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Detailed testing of heating plant operation and control logic:
            </p>
            <ul className="text-xs text-foreground space-y-1 ml-4">
              {boilerSequenceTests.map((test, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  {test}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Critical Alarm and Fail-Safe Testing</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Systematic testing of all emergency and alarm conditions:
            </p>
            <ul className="text-xs text-foreground space-y-1 ml-4">
              {criticalAlarmTests.map((test, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  {test}
                </li>
              ))}
            </ul>
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded">
              <p className="text-xs text-foreground">
                <strong>Safety Note:</strong> Always have qualified gas engineer present for boiler safety testing.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-start gap-3 mb-3">
              <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Control Loop Tuning and Optimisation</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Fine-tuning PID controllers for optimal performance:
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2 bg-blue-900/30 rounded">
                <strong className="text-blue-300">Proportional Band:</strong> Start at manufacturer recommendation, adjust for minimal overshoot
              </div>
              <div className="p-2 bg-blue-900/30 rounded">
                <strong className="text-blue-300">Integral Time:</strong> Eliminate steady-state error, avoid wind-up
              </div>
              <div className="p-2 bg-blue-900/30 rounded">
                <strong className="text-blue-300">Derivative Time:</strong> Improve response speed, reduce oscillation
              </div>
              <div className="p-2 bg-blue-900/30 rounded">
                <strong className="text-blue-300">Output Limits:</strong> Set min/max values, prevent actuator damage
              </div>
            </div>
          </div>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-start gap-3 mb-3">
              <Link className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">System Integration Testing</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Verify coordination between all building systems:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-purple-900/30 rounded">
                <strong>Lighting Integration:</strong> Occupancy sensors trigger HVAC modes, daylight harvesting adjusts artificial lighting
              </div>
              <div className="p-2 bg-purple-900/30 rounded">
                <strong>Access Control Link:</strong> First person in starts systems, last person out initiates shutdown
              </div>
              <div className="p-2 bg-purple-900/30 rounded">
                <strong>Fire System Interface:</strong> Smoke detection triggers extract fans, pressurisation systems activate
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Example</h4>
          <p className="text-sm text-foreground">
            A boiler plant is commissioned by lowering room temperature setpoints and observing whether boilers 
            fire in sequence, pumps start, and standby units rotate as programmed. The commissioning engineer 
            verifies lead/lag operation, safety shutdowns, and energy-efficient staging.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground">
                👉 What is one purpose of functional commissioning?
              </p>
              <p className="text-xs text-gray-300 mt-2">
                Consider: How does functional testing differ from just checking individual components?
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};