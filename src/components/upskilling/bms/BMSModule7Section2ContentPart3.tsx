import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, AlertCircle, Gauge, Activity, Target } from 'lucide-react';

export const BMSModule7Section2ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          PID Control
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">What is PID Control?</h4>
          <p className="text-foreground mb-4">
            PID (Proportional-Integral-Derivative) control is used to maintain stable control of variables such as 
            temperature, pressure, and flow. It continuously calculates an error value as the difference between 
            a setpoint and measured value, then applies corrections based on proportional, integral, and derivative terms.
          </p>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">The Three Components of PID</h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Proportional (P)
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Function:</strong> Reacts to the SIZE of the error</p>
                <ul className="ml-4 space-y-1">
                  <li>• Immediate response to setpoint changes</li>
                  <li>• Output proportional to current error</li>
                  <li>• Large errors = large corrections</li>
                  <li>• Can cause overshoot if too high</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Example:</strong> Room 2°C below setpoint → valve opens proportionally
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Integral (I)
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Function:</strong> Reacts to HOW LONG error exists</p>
                <ul className="ml-4 space-y-1">
                  <li>• Eliminates steady-state error</li>
                  <li>• Accumulates error over time</li>
                  <li>• Corrects long-term drift</li>
                  <li>• Can cause instability if too high</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Example:</strong> Room consistently 0.5°C low → gradually increases heating
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Derivative (D)
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Function:</strong> Reacts to RATE OF CHANGE</p>
                <ul className="ml-4 space-y-1">
                  <li>• Predicts future error trends</li>
                  <li>• Dampens oscillations</li>
                  <li>• Improves stability</li>
                  <li>• Sensitive to noise</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Example:</strong> Temperature rising rapidly → reduces heating early
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">PID Control Process</h4>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-4">
            <h5 className="text-blue-400 font-semibold mb-2">Hot Water Temperature Control Example</h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">System Components:</p>
                  <ul className="space-y-1">
                    <li>• <strong>Setpoint:</strong> 21°C room temperature</li>
                    <li>• <strong>Sensor:</strong> Room temperature probe</li>
                    <li>• <strong>Controller:</strong> PID algorithm</li>
                    <li>• <strong>Output:</strong> Hot water valve (0-10V)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Control Process:</p>
                  <ol className="space-y-1">
                    <li>1. Measure current temperature</li>
                    <li>2. Calculate error (21°C - current)</li>
                    <li>3. Apply P + I + D calculations</li>
                    <li>4. Output signal to valve actuator</li>
                    <li>5. Repeat continuously</li>
                  </ol>
                </div>
              </div>
              
              <div className="bg-black rounded p-3 mt-3">
                <p className="text-foreground text-xs font-mono">
                  <strong>PID Calculation:</strong><br/>
                  Output = (Kp × Error) + (Ki × ∫Error dt) + (Kd × dError/dt)<br/>
                  Where: Kp, Ki, Kd are tuning parameters
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Common BMS Applications</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 px-3 text-elec-yellow">Application</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Controlled Variable</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Control Output</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Typical Response</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">Space Heating</td>
                  <td className="py-2 px-3">Room Temperature</td>
                  <td className="py-2 px-3">Hot water valve</td>
                  <td className="py-2 px-3">Slow (thermal mass)</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">Air Pressure</td>
                  <td className="py-2 px-3">Duct Static Pressure</td>
                  <td className="py-2 px-3">VSD to supply fan</td>
                  <td className="py-2 px-3">Medium (air volume)</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">Flow Control</td>
                  <td className="py-2 px-3">Water Flow Rate</td>
                  <td className="py-2 px-3">Control valve</td>
                  <td className="py-2 px-3">Fast (direct)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">CO₂ Control</td>
                  <td className="py-2 px-3">CO₂ Concentration</td>
                  <td className="py-2 px-3">Outside air damper</td>
                  <td className="py-2 px-3">Medium (mixing)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">PID Tuning Basics</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">Tuning Parameters</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Kp (Proportional Gain):</strong> How aggressively to respond to current error</li>
                <li>• <strong>Ki (Integral Gain):</strong> How quickly to eliminate persistent error</li>
                <li>• <strong>Kd (Derivative Gain):</strong> How much to dampen rapid changes</li>
                <li>• <strong>Balance required:</strong> Stability vs. response speed</li>
              </ul>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h5 className="text-red-400 font-semibold mb-2">Common Problems</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>High P:</strong> Oscillation, overshoot</li>
                <li>• <strong>High I:</strong> Instability, windup</li>
                <li>• <strong>High D:</strong> Noise amplification</li>
                <li>• <strong>Poor tuning:</strong> Hunting, poor efficiency</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Electrician's Role in PID Systems</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">Installation Verification</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Sensor accuracy:</strong> Verify calibration and range</li>
                <li>• <strong>Output scaling:</strong> Confirm 0-100% matches 0-10V or 4-20mA</li>
                <li>• <strong>Signal quality:</strong> Check for noise, interference, stability</li>
                <li>• <strong>Response testing:</strong> Manual output changes to verify actuator movement</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-semibold mb-2">Commissioning Support</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Manual mode testing:</strong> Verify full range of control output</li>
                <li>• <strong>Setpoint changes:</strong> Observe system response characteristics</li>
                <li>• <strong>Load testing:</strong> Test control under various load conditions</li>
                <li>• <strong>Documentation:</strong> Record final tuning parameters and performance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground mb-2">
                👉 Which part of PID corrects long-term drift from setpoint?
              </p>
              <p className="text-xs text-foreground">
                <strong>Answer:</strong> The Integral (I) component corrects long-term drift from setpoint. It accumulates 
                error over time and gradually increases the control output to eliminate steady-state offset that the 
                Proportional component alone cannot correct.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};