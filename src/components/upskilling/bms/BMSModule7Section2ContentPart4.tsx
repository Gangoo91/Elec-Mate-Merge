import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, AlertTriangle, Clock, Shield, Layers } from 'lucide-react';

export const BMSModule7Section2ContentPart4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Advanced Programming Concepts
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Sequential Control & State Machines</h4>
          <p className="text-foreground mb-4">
            Advanced BMS applications often require sequential control where equipment follows specific startup/shutdown 
            sequences. State machines manage these complex operational modes and transitions between different system states.
          </p>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
            <h5 className="text-blue-400 font-semibold mb-2">Chiller Plant Startup Sequence Example</h5>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-foreground font-semibold mb-2">7-Step Startup Sequence:</p>
                <ol className="space-y-1 ml-4">
                  <li>1. <strong>Pre-checks:</strong> Verify all safety conditions (30s)</li>
                  <li>2. <strong>Condenser pumps:</strong> Start primary pumps (60s delay)</li>
                  <li>3. <strong>Cooling tower:</strong> Start fans if ambient &gt; 10°C (30s delay)</li>
                  <li>4. <strong>Chilled water pumps:</strong> Start distribution pumps (45s delay)</li>
                  <li>5. <strong>Chiller preparation:</strong> Oil heating if required (300s)</li>
                  <li>6. <strong>Chiller start:</strong> Enable main chiller control</li>
                  <li>7. <strong>System ready:</strong> Normal PID control active</li>
                </ol>
              </div>
              <div className="text-xs text-foreground bg-blue-500/10 rounded p-2">
                <strong>Failure Action:</strong> Any step failure stops sequence and runs shutdown procedure
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Interlock Systems</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h5 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Safety Interlocks
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground mb-2">Critical safety functions that override normal control:</p>
                <ul className="ml-4 space-y-1">
                  <li>• Fire alarm → Shutdown all air handling</li>
                  <li>• High gas concentration → Emergency ventilation</li>
                  <li>• Water leak detection → Isolate affected zone</li>
                  <li>• Emergency stop → Immediate plant shutdown</li>
                  <li>• Low oil pressure → Compressor protection trip</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Priority:</strong> Safety interlocks have highest priority - they cannot be overridden
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Equipment Protection
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground mb-2">Protect equipment from damage:</p>
                <ul className="ml-4 space-y-1">
                  <li>• Minimum run time → Prevent short cycling</li>
                  <li>• Flow proving → Confirm flow before pump start</li>
                  <li>• Filter status → Block fan start if blocked</li>
                  <li>• Thermal protection → Motor overload protection</li>
                  <li>• Proof of valve position → Confirm valve state</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Feature:</strong> Can be overridden by qualified personnel with valid reason
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Alarm Management Systems</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">Alarm Priority Levels</h5>
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-4 gap-3">
                  <div className="bg-red-600/20 border border-red-600/40 rounded p-2 text-center">
                    <p className="text-red-300 font-semibold">CRITICAL</p>
                    <p className="text-xs text-foreground mt-1">Safety risk<br/>Immediate action</p>
                  </div>
                  <div className="bg-orange-600/20 border border-orange-600/40 rounded p-2 text-center">
                    <p className="text-orange-300 font-semibold">HIGH</p>
                    <p className="text-xs text-foreground mt-1">Equipment damage<br/>Urgent response</p>
                  </div>
                  <div className="bg-yellow-600/20 border border-yellow-600/40 rounded p-2 text-center">
                    <p className="text-yellow-300 font-semibold">MEDIUM</p>
                    <p className="text-xs text-foreground mt-1">Performance impact<br/>Plan action</p>
                  </div>
                  <div className="bg-blue-600/20 border border-blue-600/40 rounded p-2 text-center">
                    <p className="text-blue-300 font-semibold">LOW</p>
                    <p className="text-xs text-foreground mt-1">Information only<br/>Monitor trend</p>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3 mt-3">
                  <p className="text-foreground font-semibold mb-2">Alarm Processing Features:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>Delay timers:</strong> Prevent nuisance alarms during startup</li>
                    <li>• <strong>Deadband:</strong> Prevent alarm chattering at threshold</li>
                    <li>• <strong>Acknowledgment:</strong> Confirm alarm received by operator</li>
                    <li>• <strong>Auto-clear:</strong> Alarm clears when condition resolves</li>
                    <li>• <strong>Escalation:</strong> Forward unacknowledged critical alarms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Scheduling & Time-Based Control</h4>
          
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Advanced Scheduling Functions
            </h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Calendar Functions:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Holiday calendars and exceptions</li>
                    <li>• Seasonal schedule changes</li>
                    <li>• Optimum start/stop algorithms</li>
                    <li>• Demand limiting schedules</li>
                    <li>• Maintenance scheduling</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Time-Based Logic:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Pre-occupancy warmup/cooldown</li>
                    <li>• Night setback temperatures</li>
                    <li>• Equipment runtime equalisation</li>
                    <li>• Energy saving off-peak operation</li>
                    <li>• Periodic exercising of standby plant</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-black rounded p-3 mt-3">
                <p className="text-foreground text-xs">
                  <strong>Example Logic:</strong> Office HVAC optimum start calculates required pre-heating time based on 
                  outside temperature, building thermal mass, and desired occupancy temperature, automatically starting 
                  heating systems at the optimal time to reach comfort conditions exactly at occupancy time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Data Logging & Trending</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Data Collection
              </h5>
              <div className="space-y-2 text-sm">
                <ul className="ml-4 space-y-1">
                  <li>• <strong>Change of value (COV):</strong> Log when values change significantly</li>
                  <li>• <strong>Periodic sampling:</strong> Regular interval data capture</li>
                  <li>• <strong>Event logging:</strong> Record alarms, overrides, mode changes</li>
                  <li>• <strong>Energy totalization:</strong> kWh, thermal energy accumulation</li>
                  <li>• <strong>Runtime totalizers:</strong> Equipment operating hours</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <h5 className="text-cyan-400 font-semibold mb-2">Analysis Functions</h5>
              <div className="space-y-2 text-sm">
                <ul className="ml-4 space-y-1">
                  <li>• <strong>Min/max recording:</strong> Peak demand tracking</li>
                  <li>• <strong>Averaging calculations:</strong> Daily, weekly, monthly means</li>
                  <li>• <strong>Degree day calculations:</strong> Weather compensation</li>
                  <li>• <strong>Performance ratios:</strong> Efficiency monitoring</li>
                  <li>• <strong>Fault detection:</strong> Anomaly identification algorithms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Testing Advanced Programming</h4>
          
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
            <h5 className="text-orange-400 font-semibold mb-2">Electrician's Advanced Testing Role</h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-foreground font-semibold mb-2">Sequence Testing:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Verify each step timing and conditions</li>
                    <li>• Test failure modes and rollback</li>
                    <li>• Confirm interlock override hierarchy</li>
                    <li>• Document actual vs. programmed sequences</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">System Integration:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Verify alarm notification pathways</li>
                    <li>• Test trending and data logging</li>
                    <li>• Confirm schedule execution</li>
                    <li>• Validate energy monitoring accuracy</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded p-3 mt-3">
                <p className="text-xs text-foreground">
                  <strong>Critical:</strong> Advanced programming requires systematic testing with detailed documentation. 
                  Each function must be proven under both normal and fault conditions before system handover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};