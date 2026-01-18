import { ArrowLeft, Zap, CheckCircle, HelpCircle, Thermometer, Gauge, Activity, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule5Section6 = () => {
  useSEO({
    title: "HVAC, Pressure Systems and Motor Control Examples | Instrumentation Module 5",
    description: "Real-world applications of control loops in HVAC systems, pressure control, and motor speed regulation."
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
          HVAC, Pressure Systems, and Motor Speed Control
        </h1>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Quick Summary
          </h2>
          <p className="text-white/80 text-sm">
            Real-world control applications require understanding of process dynamics, appropriate
            strategies, and system integration. HVAC, pressure, and motor control systems each have
            unique characteristics requiring tailored control approaches.
          </p>
        </div>

        {/* Section 01 - HVAC Control Systems */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">HVAC Control Systems</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Thermometer className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Temperature Control Strategies</h3>
                <p className="text-white/80 text-sm">
                  HVAC systems require precise temperature control for comfort, energy efficiency,
                  and equipment protection. Different zones and applications need tailored approaches.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">Zone Temperature Control</h4>
                <p className="text-white/70 text-xs mb-2">Individual room or area control</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>PI control for steady-state accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Deadband to prevent short cycling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Scheduled setpoint changes</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Air Handling Unit Control</h4>
                <p className="text-white/70 text-xs mb-2">Central system discharge control</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>PID control for fast response</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Cascade control with flow loops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Economiser integration</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-medium text-purple-300 mb-3">Cascade Control Example</h4>
              <p className="text-white/80 text-sm mb-3">
                Temperature control with secondary air flow control for improved response.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Primary Loop (Temperature):</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Measures room or discharge temperature</li>
                    <li>Slower response, eliminates offset</li>
                    <li>Provides setpoint to secondary loop</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Secondary Loop (Flow):</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Controls air flow or damper position</li>
                    <li>Fast response to disturbances</li>
                    <li>Improves overall system stability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-medium text-red-300 mb-2">Dead Time and Lag</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Air transport delays in ducts</li>
                  <li>Thermal mass of building materials</li>
                  <li>Sensor location and response time</li>
                  <li>Solution: Conservative tuning</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <h4 className="font-medium text-orange-300 mb-2">Load Variations</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Occupancy changes throughout day</li>
                  <li>Weather and solar load variations</li>
                  <li>Equipment heat gains</li>
                  <li>Solution: Adaptive control, scheduling</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Energy Optimisation Strategies</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Economiser Control</p>
                  <p className="text-white/70 text-xs">Maximises free cooling when outdoor conditions permit</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Variable Air Volume (VAV)</p>
                  <p className="text-white/70 text-xs">Modulates air flow based on demand</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Demand-Based Ventilation</p>
                  <p className="text-white/70 text-xs">CO2-based fresh air control</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Night Setback</p>
                  <p className="text-white/70 text-xs">Reduced conditioning during unoccupied periods</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="What is the primary challenge when controlling air handling unit discharge temperature?"
          correctAnswer="Large dead time in the system due to air transport delays and thermal mass"
          explanation="AHU systems have significant dead time from air moving through ducts and the thermal mass of building materials, making temperature control challenging."
        />

        {/* Section 02 - Pressure Control Systems */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Pressure Control Systems</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Gauge className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Types of Pressure Control</h3>
                <p className="text-white/80 text-sm">
                  Pressure control varies significantly between gas and liquid systems due to
                  compressibility differences and dynamic behaviour.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">Gas Pressure Control</h4>
                <p className="text-white/70 text-xs mb-2">Natural gas, compressed air, process gases</p>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Fast dynamics due to compressibility</li>
                  <li>Pressure reducing valves (PRV)</li>
                  <li>Back pressure regulation</li>
                  <li>Safety relief integration</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Liquid Pressure Control</h4>
                <p className="text-white/70 text-xs mb-2">Water systems, hydraulics, process liquids</p>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Slower response due to inertia</li>
                  <li>Pump speed or bypass control</li>
                  <li>Water hammer considerations</li>
                  <li>Cavitation prevention</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-medium text-orange-300 mb-3">Compressed Air System Control</h4>
              <p className="text-white/80 text-sm mb-3">
                Maintaining header pressure with multiple compressors requires careful coordination.
              </p>
              <div className="space-y-2">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Load/Unload Control</p>
                  <p className="text-white/70 text-xs">Compressors switch states based on pressure band</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Variable Speed Control</p>
                  <p className="text-white/70 text-xs">VFD-controlled compressor modulates speed for exact pressure</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Sequencing Logic</p>
                  <p className="text-white/70 text-xs">Automatic staging of multiple compressors based on demand</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-medium text-purple-300 mb-3">Steam Pressure Control</h4>
              <p className="text-white/80 text-sm mb-3">
                Boiler and steam header control for process and heating applications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Steam Header Pressure:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Multiple boiler coordination</li>
                    <li>Load-based firing control</li>
                    <li>Safety interlocks and limits</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Pressure Reducing Stations:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>High to low pressure conversion</li>
                    <li>Temperature via desuperheating</li>
                    <li>Cascade control for precision</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Hydraulic System Control</h4>
              <p className="text-white/80 text-sm mb-3">
                Maintaining system pressure while varying demand in hydraulic applications.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">Pump Speed Control</p>
                    <p className="text-white/70 text-xs">VFD adjusts speed to maintain differential pressure</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">Bypass Control</p>
                    <p className="text-white/70 text-xs">Three-way valve bypasses excess flow back to tank</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">Accumulator Systems</p>
                    <p className="text-white/70 text-xs">Pressure vessels smooth demand variations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="Why is cascade control often used in pressure systems?"
          correctAnswer="To improve response to flow disturbances by using a fast inner loop"
          explanation="Cascade control uses a fast inner flow loop to quickly reject disturbances before they significantly affect the outer pressure loop."
        />

        {/* Section 03 - Motor Speed Control */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Motor Speed Control Systems</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">AC Motor Speed Control</h3>
                <p className="text-white/80 text-sm">
                  Variable Frequency Drives (VFDs) provide precise speed control for AC motors,
                  enabling efficient operation across a wide speed range.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-300 mb-3">VFD Control Structure</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Speed Control Loop (Outer):</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Controls motor speed (RPM)</li>
                    <li>PI control eliminates steady-state error</li>
                    <li>Speed reference from operator or process</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Current/Torque Control Loop (Inner):</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Controls motor current or torque</li>
                    <li>Very fast response (sub-millisecond)</li>
                    <li>Provides torque limiting and protection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Fan Speed Control</h4>
                <p className="text-white/70 text-xs mb-2">Variable air volume and pressure</p>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Cubic relationship: speed vs flow</li>
                  <li>Square relationship: speed vs pressure</li>
                  <li>Significant energy savings at reduced speeds</li>
                  <li>Minimum speed limits for motor cooling</li>
                </ul>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">Pump Speed Control</h4>
                <p className="text-white/70 text-xs mb-2">Flow and pressure applications</p>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Affinity laws govern performance</li>
                  <li>Constant pressure control common</li>
                  <li>Cavitation protection required</li>
                  <li>Energy optimisation opportunities</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-medium text-orange-300 mb-3">Servo Motor Control</h4>
              <p className="text-white/80 text-sm mb-3">
                High-performance applications requiring precise speed and position control.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Multi-Loop Control Structure:</p>
                  <div className="space-y-1 text-white/70 text-xs">
                    <p><span className="text-cyan-300">Position Loop:</span> Outermost - controls final position</p>
                    <p><span className="text-blue-300">Velocity Loop:</span> Middle - controls speed profile</p>
                    <p><span className="text-green-300">Current Loop:</span> Innermost - controls motor torque</p>
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Advanced Features:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Feedforward compensation for known disturbances</li>
                    <li>Adaptive tuning for varying load conditions</li>
                    <li>Vibration suppression and resonance damping</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">DC Motor Speed Control</h4>
              <p className="text-white/80 text-sm mb-3">
                Traditional DC drive control for legacy and specialised applications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Armature Voltage Control:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Variable voltage for speed control</li>
                    <li>Constant torque characteristic</li>
                    <li>Good low-speed performance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Field Weakening Control:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Reduces field for high speeds</li>
                    <li>Constant power characteristic</li>
                    <li>Used above base speed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="What advantage does closed-loop motor speed control have over open-loop?"
          correctAnswer="Automatic compensation for load changes, maintaining constant speed"
          explanation="Closed-loop control continuously monitors actual speed and adjusts drive output to maintain the setpoint regardless of load variations."
        />

        {/* Section 04 - System Integration */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">System Integration</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Multi-Variable Coordination</h3>
                <p className="text-white/80 text-sm">
                  Real systems often require coordination between multiple control loops to achieve
                  optimal performance without conflicts between controllers.
                </p>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-medium text-purple-300 mb-3">HVAC System Coordination</h4>
              <div className="space-y-2">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Temperature and Humidity</p>
                  <p className="text-white/70 text-xs">Cooling and dehumidification must be coordinated to avoid fighting</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Supply and Return Fan Coordination</p>
                  <p className="text-white/70 text-xs">Maintain building pressure while providing adequate ventilation</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Economiser and Mechanical Cooling</p>
                  <p className="text-white/70 text-xs">Seamless transition between free cooling and mechanical cooling</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-medium text-green-300 mb-3">Energy Management Integration</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Load Shedding:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Prioritised equipment shutdown</li>
                    <li>Temporary setpoint adjustments</li>
                    <li>Motor speed reduction</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Peak Demand Management:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Predictive control algorithms</li>
                    <li>Thermal storage utilisation</li>
                    <li>Staggered equipment startup</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="font-medium text-red-300 mb-3">Safety Integration</h4>
              <p className="text-white/80 text-sm mb-3">
                Control systems must integrate with safety and protection systems.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Fire Safety:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Smoke damper control</li>
                    <li>Pressurisation activation</li>
                    <li>HVAC shutdown commands</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Equipment Protection:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Motor overload and overheating</li>
                    <li>Pressure and temperature limits</li>
                    <li>Vibration monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Scenario */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
          <h4 className="font-medium text-blue-300 mb-2">Real-World Scenario: Data Centre Cooling</h4>
          <div className="space-y-3 text-white/80 text-sm">
            <div>
              <p className="text-white font-medium">Challenge:</p>
              <p className="text-white/70 text-xs">Maintain precise temperature (plus or minus 1 degree C) in data centre while optimising energy consumption and providing redundancy.</p>
            </div>
            <div>
              <p className="text-white font-medium">Solution:</p>
              <p className="text-white/70 text-xs">Implement cascade control: room temperature controls chilled water temperature setpoint, which controls chiller staging and pump speeds. Add economiser for free cooling.</p>
            </div>
            <div>
              <p className="text-white font-medium">Result:</p>
              <p className="text-white/70 text-xs">Achieved plus or minus 0.5 degree C control with 30% energy reduction through intelligent equipment staging and free cooling optimisation.</p>
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
              <h4 className="font-medium text-white mb-2">What is the most common control strategy for maintaining room temperature?</h4>
              <p className="text-white/70 text-sm">
                PI control is most common for HVAC temperature control because it eliminates
                steady-state error while avoiding the noise sensitivity of derivative control.
                Deadband is often added to prevent short cycling of equipment.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Why might feedforward control be added to a pressure system?</h4>
              <p className="text-white/70 text-sm">
                Feedforward control measures disturbances (like flow demand changes) and takes
                corrective action before they affect the controlled pressure. This anticipatory
                action improves response compared to feedback-only control.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">What parameter is typically controlled in the VFD inner loop?</h4>
              <p className="text-white/70 text-sm">
                Motor current or torque is typically controlled in the inner loop because it
                responds quickly and directly relates to motor output. The outer loop controls
                speed and provides the current or torque setpoint.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">How do fan affinity laws affect energy savings?</h4>
              <p className="text-white/70 text-sm">
                Power varies with the cube of speed, meaning reducing fan speed by 20% reduces
                power consumption by about 50%. This makes variable speed control extremely
                effective for energy savings in fan and pump applications.
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <SingleQuestionQuiz
            question="In HVAC control, what is the most common control strategy for maintaining room temperature?"
            options={[
              "On/off control with large deadband",
              "PI control with reset windup prevention",
              "Proportional-only control",
              "Manual control with operator intervention"
            ]}
            correctAnswer={1}
            explanation="PI control is preferred because it eliminates steady-state error (offset) while avoiding the noise sensitivity that derivative action would introduce in a typical building environment."
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Link to="../section-5">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="..">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/80">
              Complete Module
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule5Section6;
