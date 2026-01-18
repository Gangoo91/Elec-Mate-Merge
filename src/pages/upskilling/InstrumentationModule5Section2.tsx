import { ArrowLeft, Zap, CheckCircle, HelpCircle, Activity, Target, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule5Section2 = () => {
  useSEO({
    title: "Control Loop Components: PV, Setpoint, Output | Instrumentation Module 5",
    description: "Explore the essential elements that form the core of every control loop - Process Variable, Setpoint, and Controller Output."
  });

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to=".." className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module 5
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Components of a Control Loop: PV, Setpoint, Output
        </h1>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Quick Summary
          </h2>
          <p className="text-white/80 text-sm">
            Every control loop has three essential components: the Process Variable (PV) - what we measure,
            the Setpoint (SP) - what we want, and the Output (OP) - the control action taken. Understanding
            how these interact is fundamental to effective process control.
          </p>
        </div>

        {/* Section 01 - Process Variable */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Process Variable (PV)</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">What is the Process Variable?</h3>
                <p className="text-white/80 text-sm">
                  The Process Variable (PV) is the actual measured value of the parameter being controlled.
                  It represents the current state of the system that we want to maintain or adjust. Sensors
                  and transmitters measure the PV and send this information to the controller.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Examples of Process Variables</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white/5 rounded p-2 text-center">
                  <p className="text-white font-medium text-sm">Temperature</p>
                  <p className="text-white/70 text-xs">65°C</p>
                </div>
                <div className="bg-white/5 rounded p-2 text-center">
                  <p className="text-white font-medium text-sm">Pressure</p>
                  <p className="text-white/70 text-xs">150 kPa</p>
                </div>
                <div className="bg-white/5 rounded p-2 text-center">
                  <p className="text-white font-medium text-sm">Flow Rate</p>
                  <p className="text-white/70 text-xs">50 L/min</p>
                </div>
                <div className="bg-white/5 rounded p-2 text-center">
                  <p className="text-white font-medium text-sm">Level</p>
                  <p className="text-white/70 text-xs">75% full</p>
                </div>
                <div className="bg-white/5 rounded p-2 text-center">
                  <p className="text-white font-medium text-sm">Speed</p>
                  <p className="text-white/70 text-xs">1500 RPM</p>
                </div>
                <div className="bg-white/5 rounded p-2 text-center">
                  <p className="text-white font-medium text-sm">pH Value</p>
                  <p className="text-white/70 text-xs">7.2</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">How PV is Measured</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-elec-yellow font-medium text-sm">Temperature</p>
                  <p className="text-white/70 text-xs">RTDs, Thermocouples, Thermistors</p>
                  <p className="text-white/50 text-xs">Accuracy: ±0.1°C to ±2°C</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-elec-yellow font-medium text-sm">Pressure</p>
                  <p className="text-white/70 text-xs">Strain gauge, Capacitive, Piezoelectric</p>
                  <p className="text-white/50 text-xs">Accuracy: ±0.05% to ±0.5% FS</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-elec-yellow font-medium text-sm">Flow</p>
                  <p className="text-white/70 text-xs">Electromagnetic, Ultrasonic, Turbine</p>
                  <p className="text-white/50 text-xs">Accuracy: ±0.2% to ±2%</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-elec-yellow font-medium text-sm">Level</p>
                  <p className="text-white/70 text-xs">Radar, Ultrasonic, Float switches</p>
                  <p className="text-white/50 text-xs">Accuracy: ±1mm to ±10mm</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Standard Signal Types</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Analogue Signals</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>4-20mA current loop (most common)</li>
                    <li>0-10V or 0-5V voltage signals</li>
                    <li>1-5V DC signals</li>
                    <li>Pneumatic 3-15 psi (legacy)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Digital Signals</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>HART protocol (over 4-20mA)</li>
                    <li>Profibus, Foundation Fieldbus</li>
                    <li>Modbus RTU/TCP</li>
                    <li>Ethernet/IP, DeviceNet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="What does PV stand for in control systems?"
          correctAnswer="Process Variable - the actual measured value of the parameter being controlled"
          explanation="The Process Variable represents the current real-world state of what we're trying to control, measured by sensors and sent to the controller."
        />

        {/* Section 02 - Setpoint */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Setpoint (SP)</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">What is the Setpoint?</h3>
                <p className="text-white/80 text-sm">
                  The Setpoint (SP) is the desired target value for the process variable. It represents
                  what we want the system to achieve and maintain. The controller compares the PV to the
                  SP to determine what action to take.
                </p>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Setpoint Examples</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">Room Temperature:</span>
                  <span className="text-elec-yellow font-medium">22°C</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">Tank Pressure:</span>
                  <span className="text-elec-yellow font-medium">200 kPa</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">Motor Speed:</span>
                  <span className="text-elec-yellow font-medium">1800 RPM</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">Water Level:</span>
                  <span className="text-elec-yellow font-medium">80%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Setpoint Sources</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Local Manual Entry</p>
                  <p className="text-white/70 text-xs">Operator sets value through HMI or panel</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Remote/Cascade Control</p>
                  <p className="text-white/70 text-xs">Another controller provides the setpoint</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Scheduled/Programmed</p>
                  <p className="text-white/70 text-xs">Time-based or condition-based changes</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Adaptive/Calculated</p>
                  <p className="text-white/70 text-xs">Based on other process conditions</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Setpoint Considerations</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Safety Limits</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>High/Low limits prevent unsafe operation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Rate of change limits prevent shock</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Operational envelope constraints</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Optimisation Factors</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Energy efficiency considerations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Product quality requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Equipment protection needs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="What happens when PV is less than SP?"
          correctAnswer="The controller increases the output to bring PV up to match the setpoint"
          explanation="When the actual value (PV) is below the desired value (SP), the controller takes action to increase the output and drive the process variable toward the setpoint."
        />

        {/* Section 03 - Output */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Output (OP)</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">What is the Controller Output?</h3>
                <p className="text-white/80 text-sm">
                  The Output (OP) is the control action taken by the controller to bring the process variable
                  closer to the setpoint. It's the controller's response to the error between PV and SP,
                  sent to actuators like valves, motors, or dampers.
                </p>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Output Actions</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">If PV &lt; SP:</span>
                  <span className="text-green-400 font-medium">Increase Output</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">If PV &gt; SP:</span>
                  <span className="text-red-400 font-medium">Decrease Output</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">If PV = SP:</span>
                  <span className="text-blue-400 font-medium">Maintain Output</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Common Output Devices</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Control Valves</p>
                  <p className="text-white/70 text-xs">Adjust flow rates in piping systems</p>
                  <p className="text-white/50 text-xs">Response: 1-30 seconds</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Variable Frequency Drives</p>
                  <p className="text-white/70 text-xs">Control motor speed and power</p>
                  <p className="text-white/50 text-xs">Response: 0.1-5 seconds</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Dampers & Louvres</p>
                  <p className="text-white/70 text-xs">Control airflow in HVAC systems</p>
                  <p className="text-white/50 text-xs">Response: 5-60 seconds</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Heating Elements</p>
                  <p className="text-white/70 text-xs">Electric or steam heating control</p>
                  <p className="text-white/50 text-xs">Response: 10-300 seconds</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Output Signal Types</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <p className="text-white font-medium text-sm mb-1">Analogue</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>4-20mA to I/P converters</li>
                    <li>0-10V DC signals</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Digital</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>PWM (Pulse Width)</li>
                    <li>Step/Direction</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">On/Off</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>Relay contacts</li>
                    <li>Solenoid control</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="What adjusts the system in response to the error between PV and SP?"
          correctAnswer="The Output (OP) from the controller adjusts the system through actuators like valves or motors"
          explanation="The controller calculates the required output based on the error and sends signals to actuators that physically change the process conditions."
        />

        {/* Section 04 - Control Loop Cycle */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">The Control Loop Cycle</h2>
          </div>

          <div className="space-y-4">
            <p className="text-white/80 text-sm">
              Understanding how sensors, controllers, and actuators work together to maintain control:
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black font-bold text-xs flex-shrink-0">1</span>
                  <div>
                    <p className="text-white font-medium text-sm">Sensor Measures PV</p>
                    <p className="text-white/70 text-xs">Temperature sensor reads actual temperature: 18°C</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white font-bold text-xs flex-shrink-0">2</span>
                  <div>
                    <p className="text-white font-medium text-sm">Controller Compares PV to SP</p>
                    <p className="text-white/70 text-xs">Error = SP - PV = 22°C - 18°C = 4°C</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white font-bold text-xs flex-shrink-0">3</span>
                  <div>
                    <p className="text-white font-medium text-sm">Controller Calculates Output</p>
                    <p className="text-white/70 text-xs">Determines how much to open heating valve</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white font-bold text-xs flex-shrink-0">4</span>
                  <div>
                    <p className="text-white font-medium text-sm">Actuator Responds</p>
                    <p className="text-white/70 text-xs">Valve opens to increase heating, process repeats</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-300 mb-2">Error Calculation</h4>
              <div className="text-center mb-3">
                <p className="text-white font-medium">Error (e) = Setpoint (SP) - Process Variable (PV)</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="text-center">
                  <p className="text-white font-medium">Positive Error</p>
                  <p className="text-white/70 text-xs">PV below SP - Increase output</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">Zero Error</p>
                  <p className="text-white/70 text-xs">PV equals SP - Maintain output</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">Negative Error</p>
                  <p className="text-white/70 text-xs">PV above SP - Decrease output</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Who measures the Process Variable?</h4>
              <p className="text-white/70 text-sm">
                The sensor or transmitter measures the Process Variable and converts it to a standard signal
                (typically 4-20mA) that is sent to the controller for comparison with the setpoint.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">What is the relationship between error and controller output?</h4>
              <p className="text-white/70 text-sm">
                In most control systems, larger errors between PV and SP produce proportionally larger
                changes in controller output. The exact relationship depends on the controller type and
                tuning parameters (P, I, D gains).
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">What happens when the setpoint changes?</h4>
              <p className="text-white/70 text-sm">
                When the setpoint changes, the controller immediately calculates a new error (SP-PV) and
                adjusts its output accordingly to drive the process variable to the new target value.
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <SingleQuestionQuiz
            question="In a temperature control system, what represents the manipulated variable?"
            options={[
              "The room temperature (PV)",
              "The desired temperature (SP)",
              "The heating valve position (OP)",
              "The temperature sensor"
            ]}
            correctAnswer={2}
            explanation="The manipulated variable is what the controller adjusts to influence the process - in this case, the heating valve position (output) that controls heat input to the room."
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Link to="../section-1">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </Link>
          <Link to="../section-3">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/80">
              Next Section
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule5Section2;
