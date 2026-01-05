import { Wrench, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EventTriggersPractical = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Practical Implementation Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          {/* Implementation Process */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-3">Event Automation Implementation Process</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <strong>Requirements Analysis:</strong> Identify repetitive manual tasks, define trigger conditions, map desired responses
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <strong>Logic Design:</strong> Create flowcharts, define conditional logic, establish priority hierarchy
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <strong>System Configuration:</strong> Program trigger conditions, configure response actions, set up notifications
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <strong>Testing & Validation:</strong> Simulate trigger conditions, verify responses, test failure scenarios
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <strong>Documentation & Training:</strong> Document logic, train operators, establish maintenance procedures
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Examples */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-md border border-green-600/30">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Successful Implementation: Office Building
              </h5>
              <div className="text-sm space-y-2">
                <p><strong>Trigger:</strong> Outside air temperature &gt; 25°C AND time = 06:00</p>
                <p><strong>Action:</strong> Pre-cool building, adjust AHU setpoints, send energy report</p>
                <p><strong>Result:</strong> 15% reduction in peak cooling demand, improved comfort</p>
                <p><strong>Benefit:</strong> Automated energy optimization without operator intervention</p>
              </div>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-md border border-blue-600/30">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Innovation Example: Predictive Maintenance
              </h5>
              <div className="text-sm space-y-2">
                <p><strong>Trigger:</strong> Filter pressure drop &gt; 80% rated + runtime &gt; 6000 hours</p>
                <p><strong>Action:</strong> Generate work order, order replacement filter, notify maintenance</p>
                <p><strong>Result:</strong> Proactive maintenance scheduling, reduced emergency failures</p>
                <p><strong>Benefit:</strong> Improved equipment reliability and planned maintenance</p>
              </div>
            </div>
          </div>

          {/* Configuration Examples */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-3">Sample Event Logic Configurations</h4>
            <div className="space-y-4">
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h5 className="text-foreground font-semibold mb-1">Energy Optimization Logic</h5>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>IF:</strong> (Peak demand approaching) AND (Non-critical loads operating)</p>
                  <p><strong>THEN:</strong> Temporarily reduce non-critical lighting and equipment</p>
                  <p><strong>NOTIFY:</strong> Facility manager with demand reduction actions taken</p>
                  <p><strong>RESTORE:</strong> Normal operation after 30 minutes or when demand drops</p>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="text-foreground font-semibold mb-1">Security Integration Logic</h5>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>IF:</strong> (Security system armed) AND (Motion detected)</p>
                  <p><strong>THEN:</strong> Turn on area lighting, start CCTV recording</p>
                  <p><strong>NOTIFY:</strong> Security personnel via SMS and mobile app</p>
                  <p><strong>LOG:</strong> Event details with timestamp and camera images</p>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h5 className="text-foreground font-semibold mb-1">Emergency Response Logic</h5>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>IF:</strong> (Fire alarm active) OR (Emergency stop pressed)</p>
                  <p><strong>THEN:</strong> Shutdown non-essential equipment, activate emergency lighting</p>
                  <p><strong>NOTIFY:</strong> Emergency services, building management, all occupants</p>
                  <p><strong>OVERRIDE:</strong> All normal automation until manual reset</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testing Procedures */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h5 className="text-elec-yellow font-semibold mb-2">Testing Methodology</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Simulation Testing:</strong> Use test signals to trigger events</li>
                <li>• <strong>Timing Verification:</strong> Confirm delays and schedules work correctly</li>
                <li>• <strong>Notification Testing:</strong> Verify all communication channels</li>
                <li>• <strong>Failure Testing:</strong> Test system behavior during component failures</li>
                <li>• <strong>Load Testing:</strong> Verify performance under multiple simultaneous events</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h5 className="text-elec-yellow font-semibold mb-2">Troubleshooting Common Issues</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>False Triggers:</strong> Check sensor calibration and hysteresis settings</li>
                <li>• <strong>Missed Events:</strong> Verify trigger conditions and system processing load</li>
                <li>• <strong>Notification Failures:</strong> Test communication paths and backup methods</li>
                <li>• <strong>Logic Conflicts:</strong> Review priority settings and override conditions</li>
                <li>• <strong>Performance Issues:</strong> Monitor system resources and optimize logic</li>
              </ul>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-3">Implementation Best Practices</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-foreground font-semibold mb-2">Logic Design</h5>
                <ul className="text-sm space-y-1">
                  <li>• Keep trigger conditions simple and clear</li>
                  <li>• Use appropriate time delays to prevent cycling</li>
                  <li>• Include manual override capabilities</li>
                  <li>• Document all logic with clear descriptions</li>
                </ul>
              </div>
              <div>
                <h5 className="text-foreground font-semibold mb-2">System Management</h5>
                <ul className="text-sm space-y-1">
                  <li>• Regular testing of all automated responses</li>
                  <li>• Monitor system performance and resource usage</li>
                  <li>• Maintain backup notification methods</li>
                  <li>• Train multiple staff on system operation</li>
                </ul>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default EventTriggersPractical;