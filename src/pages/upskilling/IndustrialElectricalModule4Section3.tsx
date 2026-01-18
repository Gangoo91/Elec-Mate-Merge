import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  Radio,
  Thermometer,
  Gauge,
  Cog,
  RotateCcw,
  Cable,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Info,
  Zap,
  Target,
  Settings
} from 'lucide-react';

const IndustrialElectricalModule4Section3: React.FC = () => {
  useSEO({
    title: 'Sensor/Actuator Integration | Industrial Electrical Module 4 Section 3 | Elec-Mate',
    description: 'Learn about industrial sensor and actuator integration including proximity sensors, temperature measurement, pressure sensing, solenoid valves, encoders, and EMC considerations for industrial electrical systems.',
    keywords: 'proximity sensors, inductive sensors, capacitive sensors, photoelectric sensors, RTD, thermocouple, PT100, solenoid valves, encoders, EMC, industrial sensors, actuators'
  });

  const [showQuiz, setShowQuiz] = useState(false);

  const quickCheckQuestions = [
    {
      id: 'qc-sensor-1',
      question: 'A PT100 RTD sensor has what resistance at 0°C?',
      options: ['50 ohms', '100 ohms', '138.5 ohms', '1000 ohms'],
      correctIndex: 1,
      explanation: 'PT100 stands for Platinum 100 ohms - the sensor has exactly 100 ohms resistance at 0°C. At 100°C, the resistance increases to approximately 138.5 ohms following a predictable temperature coefficient.'
    },
    {
      id: 'qc-sensor-2',
      question: 'What is the main advantage of a 3-wire sensor over a 2-wire sensor?',
      options: [
        'Lower cost',
        'Simpler wiring',
        'Separate power and signal lines for reliable operation',
        'Higher sensing range'
      ],
      correctIndex: 2,
      explanation: '3-wire sensors have separate power supply lines (+ and -) and a dedicated signal output line. This provides more reliable switching, allows for both PNP and NPN configurations, and prevents voltage drops from affecting sensor operation.'
    },
    {
      id: 'qc-sensor-3',
      question: 'An incremental encoder with 1024 PPR resolution using quadrature decoding provides how many counts per revolution?',
      options: ['1024 counts', '2048 counts', '4096 counts', '512 counts'],
      correctIndex: 2,
      explanation: 'Quadrature decoding (x4 decoding) counts all rising and falling edges of both A and B channels. This multiplies the base PPR by 4, so 1024 PPR × 4 = 4096 counts per revolution, providing higher resolution for position feedback.'
    }
  ];

  const quizQuestions = [
    {
      question: 'Which type of proximity sensor is best suited for detecting non-metallic objects like plastic bottles?',
      options: [
        'Inductive proximity sensor',
        'Capacitive proximity sensor',
        'Magnetic proximity sensor',
        'Hall effect sensor'
      ],
      correctAnswer: 'Capacitive proximity sensor'
    },
    {
      question: 'What is the typical sensing range relationship between ferrous and non-ferrous metals for inductive sensors?',
      options: [
        'Non-ferrous metals have longer sensing range',
        'Both have identical sensing range',
        'Non-ferrous metals have reduced sensing range (correction factor required)',
        'Non-ferrous metals cannot be detected'
      ],
      correctAnswer: 'Non-ferrous metals have reduced sensing range (correction factor required)'
    },
    {
      question: 'A thermocouple generates voltage based on which principle?',
      options: [
        'Resistance change with temperature',
        'Seebeck effect (junction of dissimilar metals)',
        'Capacitance variation',
        'Inductance change'
      ],
      correctAnswer: 'Seebeck effect (junction of dissimilar metals)'
    },
    {
      question: 'What does NPN output configuration mean for a proximity sensor?',
      options: [
        'Output sources current when active',
        'Output sinks current to ground when active',
        'Output provides analog voltage',
        'Output is floating when active'
      ],
      correctAnswer: 'Output sinks current to ground when active'
    },
    {
      question: 'Which temperature sensor type provides the fastest response time?',
      options: [
        'RTD (PT100)',
        'Thermocouple',
        'Bimetallic strip',
        'Infrared pyrometer'
      ],
      correctAnswer: 'Thermocouple'
    },
    {
      question: 'What is the purpose of a 4-20mA current loop signal for sensors?',
      options: [
        'To reduce wiring costs',
        'To provide noise immunity and allow long cable runs with fault detection',
        'To increase sensor accuracy',
        'To power the sensor only'
      ],
      correctAnswer: 'To provide noise immunity and allow long cable runs with fault detection'
    },
    {
      question: 'A solenoid valve rated for "normally closed" (NC) operation will:',
      options: [
        'Be open when de-energized',
        'Be closed when de-energized',
        'Remain in last position when de-energized',
        'Require continuous power to stay closed'
      ],
      correctAnswer: 'Be closed when de-energized'
    },
    {
      question: 'What is the primary purpose of shielded cable for sensor wiring in industrial environments?',
      options: [
        'To reduce cable weight',
        'To protect against electromagnetic interference (EMI)',
        'To increase current capacity',
        'To reduce installation cost'
      ],
      correctAnswer: 'To protect against electromagnetic interference (EMI)'
    },
    {
      question: 'An absolute encoder differs from an incremental encoder in that it:',
      options: [
        'Provides higher resolution',
        'Retains position information after power loss',
        'Is less expensive',
        'Only works with DC motors'
      ],
      correctAnswer: 'Retains position information after power loss'
    },
    {
      question: 'What resistance would a PT100 RTD sensor measure at 100°C?',
      options: [
        '100 ohms',
        '138.5 ohms',
        '200 ohms',
        '385 ohms'
      ],
      correctAnswer: '138.5 ohms'
    }
  ];

  const faqItems = [
    {
      question: 'How do I choose between PNP and NPN sensor outputs?',
      answer: 'The choice depends on your PLC or controller input type. PNP (sourcing) sensors provide positive voltage when active and are common in European systems. NPN (sinking) sensors pull the signal to ground when active and are traditional in Asian markets. Most modern PLCs accept both types. Check your input card specifications - PNP sensors connect to sinking inputs, NPN sensors connect to sourcing inputs. When in doubt, PNP is generally more common in industrial automation today.'
    },
    {
      question: 'Why does my proximity sensor have a reduced sensing range for aluminum compared to steel?',
      answer: 'Inductive proximity sensors work by detecting changes in an electromagnetic field caused by eddy currents in metal targets. Non-ferrous metals like aluminum, copper, and brass have different electrical conductivity and magnetic permeability than steel, resulting in weaker eddy currents. Manufacturers provide correction factors: aluminum typically has a 0.35-0.50 factor, meaning the effective sensing range is 35-50% of the rated range for steel. Always apply these factors when selecting sensors for non-ferrous targets.'
    },
    {
      question: 'What is the difference between 2-wire, 3-wire, and 4-wire RTD connections?',
      answer: '2-wire RTD connections are simplest but include lead wire resistance in the measurement, causing errors. 3-wire connections use a third wire to measure and compensate for lead resistance, providing good accuracy for most industrial applications. 4-wire connections use two wires for current excitation and two separate wires for voltage measurement, eliminating lead resistance errors completely. Use 4-wire for precision applications or long cable runs, 3-wire for standard industrial use, and avoid 2-wire except for short runs with thin leads.'
    },
    {
      question: 'How do I calculate encoder resolution requirements for my application?',
      answer: 'First, determine the minimum position increment you need to detect. For a rotary application, divide 360° by your required angular resolution. For linear applications with a lead screw, calculate: Resolution = (Lead screw pitch) / (Required linear resolution). Choose an encoder with PPR (pulses per revolution) that meets or exceeds this. With quadrature decoding (x4), you get 4 times the base PPR. Example: 0.1mm resolution with 5mm pitch screw needs 5/0.1 = 50 counts/rev minimum, so a 13 PPR encoder with x4 decoding (52 counts) would suffice.'
    },
    {
      question: 'What causes sensor signal noise and how can I reduce it?',
      answer: 'Common noise sources include VFDs, motor starters, solenoid coils, welding equipment, and radio transmitters. Reduce noise by: using shielded cables with shields grounded at one end only (typically the control panel end), keeping sensor cables separate from power cables (minimum 200mm spacing), using twisted pair wiring, installing ferrite cores on cables near noise sources, ensuring proper grounding with star topology, using surge suppressors on inductive loads, and selecting sensors with appropriate EMC ratings (CE marked sensors meet EN 61000 standards).'
    },
    {
      question: 'When should I use a pressure transducer vs a pressure switch?',
      answer: 'Use a pressure switch when you only need on/off control at a setpoint - they are simpler, cheaper, and provide a direct digital output. Use a pressure transducer when you need continuous monitoring, proportional control, data logging, or multiple setpoints programmable in the PLC. Transducers output analog signals (4-20mA or 0-10V) proportional to pressure, allowing trending, alarms at multiple levels, and precise process control. Modern systems favor transducers for flexibility, but switches remain cost-effective for simple applications.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 4 &gt; Section 3</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <Radio className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Sensor/Actuator Integration
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master the selection, wiring, and integration of industrial sensors and actuators for reliable automation systems.
          </p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <h2 className="font-semibold text-foreground mb-2">What You Will Learn</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>- Proximity sensor types and selection criteria</li>
            <li>- Temperature measurement with RTDs and thermocouples</li>
            <li>- Pressure and level measurement methods</li>
            <li>- Solenoid valves and pneumatic actuators</li>
            <li>- Position feedback devices and encoders</li>
            <li>- EMC considerations and wiring best practices</li>
          </ul>
        </div>

        {/* Section 1: Proximity Sensors */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Proximity Sensors
          </h2>

          <p className="text-muted-foreground">
            Proximity sensors detect the presence of objects without physical contact, making them essential
            for position detection, counting, and safety applications in industrial automation.
          </p>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-elec-yellow" />
              Inductive Proximity Sensors
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Principle:</strong> Detect metallic objects via electromagnetic field disturbance from eddy currents</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Sensing Range:</strong> 1mm to 60mm typical, depends on target size and material</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Correction Factors:</strong> Steel = 1.0, Stainless Steel = 0.7, Brass = 0.5, Aluminum = 0.4, Copper = 0.35</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Mounting:</strong> Flush (shielded) for close metal proximity, Non-flush (unshielded) for longer range</span>
              </li>
            </ul>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Radio className="w-5 h-5 text-elec-yellow" />
              Capacitive Proximity Sensors
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Principle:</strong> Detect changes in capacitance caused by any material (metal, plastic, liquid, powder)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Applications:</strong> Level detection through non-metallic tank walls, plastic/glass detection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Sensitivity:</strong> Adjustable potentiometer to set detection threshold</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Limitation:</strong> Sensitive to humidity, condensation, and material buildup on sensing face</span>
              </li>
            </ul>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-elec-yellow" />
              Photoelectric Sensors
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Through-Beam:</strong> Separate emitter/receiver, longest range (up to 100m), detects any opaque object</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Retro-Reflective:</strong> Emitter/receiver in one housing, uses reflector, range up to 15m</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Diffuse:</strong> Detects light reflected from target itself, range 0.1-2m, background suppression available</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Light Sources:</strong> Red LED (visible alignment), infrared (longer range), laser (precise small object detection)</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" />
              2-Wire vs 3-Wire Sensor Configuration
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-foreground font-medium mb-1">2-Wire (Series Connection)</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>- Simpler wiring, only 2 conductors</li>
                  <li>- Leakage current when OFF (~1-2mA)</li>
                  <li>- Voltage drop when ON (~5-8V)</li>
                  <li>- May not work with all PLC inputs</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-medium mb-1">3-Wire (Parallel Connection)</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>- Separate +V, 0V, and signal wires</li>
                  <li>- Clean ON/OFF switching</li>
                  <li>- PNP (sourcing) or NPN (sinking)</li>
                  <li>- Industry standard for most applications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Temperature Sensors */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Temperature Sensors
          </h2>

          <p className="text-muted-foreground">
            Accurate temperature measurement is critical for process control, equipment protection, and
            product quality. Understanding sensor characteristics helps select the right type for each application.
          </p>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-elec-yellow" />
              RTD (Resistance Temperature Detector)
            </h3>
            <p className="text-sm text-muted-foreground mb-3">RTDs measure temperature through the predictable change in electrical resistance of a pure metal element.</p>

            <div className="bg-background/50 rounded p-3 mb-3">
              <p className="text-elec-yellow font-medium mb-2 text-sm">PT100 Resistance Values:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
                <div className="bg-background rounded p-2">
                  <div className="text-foreground font-bold">0°C</div>
                  <div className="text-muted-foreground">100.00 ohms</div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="text-foreground font-bold">50°C</div>
                  <div className="text-muted-foreground">119.40 ohms</div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="text-foreground font-bold">100°C</div>
                  <div className="text-muted-foreground">138.51 ohms</div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="text-foreground font-bold">200°C</div>
                  <div className="text-muted-foreground">175.86 ohms</div>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-2">Temperature coefficient alpha = 0.00385 ohms/ohms/°C (European standard IEC 60751)</p>
            </div>

            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>- <strong className="text-foreground">Range:</strong> -200°C to +850°C</li>
              <li>- <strong className="text-foreground">Accuracy:</strong> Class A (±0.15°C at 0°C), Class B (±0.3°C at 0°C)</li>
              <li>- <strong className="text-foreground">Response Time:</strong> Slower than thermocouples (seconds)</li>
              <li>- <strong className="text-foreground">Wiring:</strong> 2-wire, 3-wire, or 4-wire connections</li>
            </ul>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Thermocouples</h3>
            <p className="text-sm text-muted-foreground mb-3">Thermocouples generate a small voltage (millivolts) proportional to temperature difference between the measuring junction and reference junction (Seebeck effect).</p>

            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-elec-yellow">Type</th>
                    <th className="text-left py-2 text-elec-yellow">Materials</th>
                    <th className="text-left py-2 text-elec-yellow">Range</th>
                    <th className="text-left py-2 text-elec-yellow">Application</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-white/5">
                    <td className="py-2 font-medium text-foreground">K</td>
                    <td>Chromel/Alumel</td>
                    <td>-200°C to 1260°C</td>
                    <td>General purpose, most common</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 font-medium text-foreground">J</td>
                    <td>Iron/Constantan</td>
                    <td>-40°C to 760°C</td>
                    <td>Older equipment, reducing atmospheres</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 font-medium text-foreground">T</td>
                    <td>Copper/Constantan</td>
                    <td>-200°C to 370°C</td>
                    <td>Low temperature, food industry</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-foreground">S</td>
                    <td>Platinum/Rhodium</td>
                    <td>0°C to 1480°C</td>
                    <td>High temperature, precision</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
              <p className="text-amber-300 font-medium flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Important: Use matching extension wire
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Thermocouple extension wire must match the thermocouple type. Using standard copper wire creates
                additional junctions and measurement errors. Extension wire is colour-coded by type.
              </p>
            </div>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">NTC Thermistors</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">NTC (Negative Temperature Coefficient):</strong> Resistance decreases as temperature increases</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">High Sensitivity:</strong> Large resistance change per degree (good for narrow range precision)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Typical Range:</strong> -40°C to +150°C</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Applications:</strong> HVAC, motor winding protection, battery temperature monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Non-Linear:</strong> Requires linearisation in software or hardware for accurate readings</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Pressure and Level Measurement */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Pressure and Level Measurement
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-elec-yellow" />
              Pressure Measurement Types
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-background/50 rounded p-3">
                <p className="text-elec-yellow font-medium mb-2">Gauge Pressure</p>
                <p className="text-muted-foreground">Measured relative to atmospheric pressure. Most common for industrial applications. Zero at atmosphere.</p>
              </div>
              <div className="bg-background/50 rounded p-3">
                <p className="text-elec-yellow font-medium mb-2">Absolute Pressure</p>
                <p className="text-muted-foreground">Measured relative to perfect vacuum. Used for altitude, vacuum systems. Zero at vacuum.</p>
              </div>
              <div className="bg-background/50 rounded p-3">
                <p className="text-elec-yellow font-medium mb-2">Differential Pressure</p>
                <p className="text-muted-foreground">Measures difference between two pressure points. Used for flow, filter monitoring, level.</p>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Pressure Transducers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Strain Gauge:</strong> Piezoresistive element on diaphragm, most common industrial type</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Output Signals:</strong> 4-20mA (most common), 0-10V, 0-5V, digital protocols</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Accuracy:</strong> Typically 0.25% to 0.5% of full scale</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">4-20mA Advantage:</strong> 4mA = zero allows wire break detection (0mA indicates fault)</span>
              </li>
            </ul>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Level Measurement Methods</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-24 text-elec-yellow font-medium">Hydrostatic</div>
                <div className="flex-1 text-muted-foreground">Pressure at bottom of tank proportional to liquid height. Simple, reliable for open or vented tanks.</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-24 text-elec-yellow font-medium">Ultrasonic</div>
                <div className="flex-1 text-muted-foreground">Non-contact measurement using sound wave reflection time. Good for corrosive liquids, solids.</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-24 text-elec-yellow font-medium">Radar</div>
                <div className="flex-1 text-muted-foreground">Microwave reflection, unaffected by vapour, temperature, pressure. Higher cost, high accuracy.</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-24 text-elec-yellow font-medium">Capacitance</div>
                <div className="flex-1 text-muted-foreground">Probe measures capacitance change with level. Works with conductive and non-conductive liquids.</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-24 text-elec-yellow font-medium">Float Switch</div>
                <div className="flex-1 text-muted-foreground">Simple on/off level detection. Low cost, reliable for point level applications.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Solenoid Valves and Pneumatic Actuators */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Solenoid Valves and Pneumatic Actuators
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Cog className="w-5 h-5 text-elec-yellow" />
              Solenoid Valve Types
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-elec-yellow font-medium mb-2">Direct Acting</p>
                <p className="text-muted-foreground">Solenoid plunger directly opens/closes the orifice. Works at zero pressure differential. Limited to smaller valve sizes due to force requirements.</p>
              </div>
              <div>
                <p className="text-elec-yellow font-medium mb-2">Pilot Operated (Indirect)</p>
                <p className="text-muted-foreground">Solenoid controls small pilot valve that uses line pressure to operate main valve. Requires minimum pressure differential. Larger flow capacity with smaller solenoid.</p>
              </div>
              <div>
                <p className="text-elec-yellow font-medium mb-2">Semi-Direct Acting</p>
                <p className="text-muted-foreground">Combines both principles. Works from zero to full pressure. Used when pressure may vary significantly.</p>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Valve Configurations</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-foreground mb-2">2-Way Valves (2/2)</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>- One inlet, one outlet</li>
                  <li>- Simple on/off flow control</li>
                  <li>- NC (Normally Closed) or NO (Normally Open)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">3-Way Valves (3/2)</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>- Pressure, exhaust, and cylinder ports</li>
                  <li>- Single-acting cylinder control</li>
                  <li>- Diverter or selector applications</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">4-Way Valves (4/2 or 5/2)</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>- Control double-acting cylinders</li>
                  <li>- 5/2: Two exhaust ports (independent flow control)</li>
                  <li>- Spring return or double solenoid</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">5/3 Valves</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>- Three positions for mid-stroke stop</li>
                  <li>- Centre positions: closed, pressurised, or exhausted</li>
                  <li>- Safety and positioning applications</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Pneumatic Cylinder Types</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Single-Acting:</strong> Air pressure extends OR retracts, spring returns. Simpler, less air consumption.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Double-Acting:</strong> Air pressure for both extend and retract. More force, precise control both directions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Rodless:</strong> Carriage moves along cylinder body. Long strokes, compact mounting, no rod protrusion.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Guided:</strong> Built-in linear guide for side loads. Prevents piston rod bending.</span>
              </li>
            </ul>

            <div className="bg-background/50 rounded p-3 mt-3">
              <p className="text-elec-yellow font-medium mb-2 text-sm">Cylinder Force Calculation:</p>
              <p className="font-mono text-foreground text-sm">F = P x A</p>
              <p className="text-muted-foreground text-sm mt-1">
                Force (N) = Pressure (Pa) x Piston Area (m²)<br/>
                For 100mm bore at 6 bar: F = 600,000 x (pi x 0.05²) = 4,712 N
              </p>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h4 className="font-medium text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Solenoid Protection
            </h4>
            <p className="text-muted-foreground text-sm mt-2">
              Always install a flyback diode (DC) or RC snubber (AC) across solenoid coils to suppress inductive
              voltage spikes when de-energised. This protects PLC outputs, relay contacts, and nearby electronics
              from damage. Many industrial solenoids include built-in suppression.
            </p>
          </div>
        </section>

        {/* Section 5: Position Feedback Devices */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Position Feedback Devices
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-elec-yellow" />
              Incremental Encoders
            </h3>
            <p className="text-sm text-muted-foreground mb-3">Generate pulses proportional to rotation. Require counting electronics and reference (homing) after power-up.</p>

            <div className="bg-background/50 rounded p-3 mb-3">
              <p className="text-elec-yellow font-medium mb-2 text-sm">Quadrature Output (A/B Channels)</p>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>- Two square wave outputs 90° out of phase</li>
                <li>- Direction determined by which channel leads</li>
                <li>- X1 decoding: Count A rising edges only = PPR counts/rev</li>
                <li>- X2 decoding: Count A rising and falling = 2 x PPR counts/rev</li>
                <li>- X4 decoding: Count all edges of A and B = 4 x PPR counts/rev</li>
              </ul>
            </div>

            <div className="bg-background/50 rounded p-3">
              <p className="text-elec-yellow font-medium mb-2 text-sm">Resolution Calculation Example:</p>
              <p className="text-muted-foreground text-sm">
                Encoder: 1000 PPR, X4 decoding = 4000 counts/revolution<br/>
                Angular resolution: 360° / 4000 = 0.09°/count<br/>
                With 10mm lead screw: 10mm / 4000 = 0.0025mm (2.5 micrometres) linear resolution
              </p>
            </div>

            <p className="text-sm text-muted-foreground mt-3"><strong className="text-foreground">Index Pulse (Z channel):</strong> Single pulse per revolution for absolute reference point.</p>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Absolute Encoders</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Single-Turn:</strong> Unique code for each position within one revolution (e.g., 12-bit = 4096 positions)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Multi-Turn:</strong> Tracks complete revolutions plus position. Battery-backed or Wiegand wire powered.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">No Homing Required:</strong> Position known immediately on power-up</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Output Types:</strong> Parallel binary, Gray code, SSI (Synchronous Serial Interface), fieldbus</span>
              </li>
            </ul>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Potentiometers (Analogue Position)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Rotary:</strong> Single or multi-turn, resistive element with wiper contact</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Linear:</strong> Slide potentiometers for linear position measurement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Advantages:</strong> Absolute position, simple interface, low cost</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Limitations:</strong> Wear over time, noise in output, limited resolution compared to encoders</span>
              </li>
            </ul>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Linear Position Sensors</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-elec-yellow font-medium mb-2">LVDT</p>
                <p className="text-muted-foreground">Linear Variable Differential Transformer. AC excitation, excellent resolution, non-contact core movement. Used for precision measurement.</p>
              </div>
              <div>
                <p className="text-elec-yellow font-medium mb-2">Magnetostrictive</p>
                <p className="text-muted-foreground">Position magnet on moving element, waveguide in housing. High accuracy, long strokes, absolute position. Common for hydraulic cylinders.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Wiring and EMC Considerations */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Wiring and EMC Considerations
          </h2>

          <p className="text-muted-foreground">
            Proper wiring practices and electromagnetic compatibility (EMC) measures are essential for
            reliable sensor operation in electrically noisy industrial environments.
          </p>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Cable className="w-5 h-5 text-elec-yellow" />
              Cable Selection Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Shielded Cable:</strong> Use for analogue signals (4-20mA, 0-10V), encoder signals, and long digital runs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Twisted Pair:</strong> Reduces magnetic field pickup. Use for differential signals and long runs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Cable Ratings:</strong> Oil-resistant (for machine tools), flexible (for moving applications), UV-resistant (outdoors)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Wire Gauge:</strong> Consider voltage drop for long runs. 4-20mA tolerates long runs; voltage signals need heavier gauge.</span>
              </li>
            </ul>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Shield Grounding Best Practices</h3>
            <div className="bg-background/50 rounded p-3 mb-3">
              <p className="text-elec-yellow font-medium mb-2 text-sm">Single-Point Grounding (Recommended)</p>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>- Ground shield at control panel end only</li>
                <li>- Prevents ground loops between equipment</li>
                <li>- Leave field end shield insulated and taped</li>
                <li>- Use dedicated grounding bar in panel</li>
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
              <p className="text-amber-300 font-medium flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Never use the shield as a signal conductor
              </p>
            </div>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Cable Routing and Separation</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-elec-yellow">Cable Types</th>
                    <th className="text-left py-2 text-elec-yellow">Minimum Separation</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-white/5">
                    <td className="py-2">Low-level signals from power cables</td>
                    <td>200mm (8 inches) minimum</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Analogue signals from VFD cables</td>
                    <td>300mm (12 inches) or shielded conduit</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Encoder cables from motor power</td>
                    <td>200mm, or use shielded cable</td>
                  </tr>
                  <tr>
                    <td className="py-2">Thermocouple from high current</td>
                    <td>Separate conduit or 300mm minimum</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              When cables must cross, do so at 90° angles to minimise coupling.
            </p>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">EMC Protection Devices</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Ferrite Cores:</strong> Clamp-on or wound through. Attenuates high-frequency noise. Place near noise source.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Line Filters:</strong> Install on VFD inputs, reduce conducted emissions back to supply.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Surge Suppressors:</strong> MOVs or TVS diodes protect against transient voltage spikes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Isolation:</strong> Optocouplers, isolation amplifiers for galvanic separation between circuits.</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Sensor Power Supply Best Practices
            </h4>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>- Use dedicated 24VDC supply for sensors, separate from solenoid/relay supply</li>
              <li>- Install decoupling capacitors at sensor terminals for noisy environments</li>
              <li>- Consider DC/DC isolators for sensitive analogue sensors</li>
              <li>- Verify supply can handle inrush current from multiple sensors</li>
              <li>- Use star grounding topology to prevent ground loops</li>
            </ul>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            Quick Reference Card
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3 border-b border-white/10 pb-2">Sensor Selection</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Metal detection:</span>
                  <span className="text-foreground">Inductive</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Non-metal/liquid:</span>
                  <span className="text-foreground">Capacitive</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Long range/any object:</span>
                  <span className="text-foreground">Photoelectric</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">High accuracy temp:</span>
                  <span className="text-foreground">RTD (PT100)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wide temp range:</span>
                  <span className="text-foreground">Thermocouple</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fast response temp:</span>
                  <span className="text-foreground">Thermocouple</span>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3 border-b border-white/10 pb-2">Key Values</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PT100 at 0°C:</span>
                  <span className="text-foreground font-mono">100.00 ohms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PT100 at 100°C:</span>
                  <span className="text-foreground font-mono">138.51 ohms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">4-20mA zero:</span>
                  <span className="text-foreground font-mono">4mA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">4-20mA fault:</span>
                  <span className="text-foreground font-mono">&lt;3.8mA or &gt;21mA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Encoder X4:</span>
                  <span className="text-foreground font-mono">PPR x 4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min cable separation:</span>
                  <span className="text-foreground font-mono">200mm</span>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3 border-b border-white/10 pb-2">Common Correction Factors</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Steel (Fe):</span>
                  <span className="text-foreground font-mono">1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stainless Steel:</span>
                  <span className="text-foreground font-mono">0.7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brass:</span>
                  <span className="text-foreground font-mono">0.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aluminium:</span>
                  <span className="text-foreground font-mono">0.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Copper:</span>
                  <span className="text-foreground font-mono">0.35</span>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3 border-b border-white/10 pb-2">Valve Notation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">2/2:</span>
                  <span className="text-foreground">2 ports, 2 positions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">3/2:</span>
                  <span className="text-foreground">Single-acting cylinder</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">5/2:</span>
                  <span className="text-foreground">Double-acting cylinder</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">5/3:</span>
                  <span className="text-foreground">Mid-position stop</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NC:</span>
                  <span className="text-foreground">Normally Closed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NO:</span>
                  <span className="text-foreground">Normally Open</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Section Quiz</h2>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              className="min-h-[44px] touch-manipulation bg-elec-yellow text-background hover:bg-elec-yellow/90"
            >
              {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
            </Button>
          </div>
          <p className="text-muted-foreground">
            Test your knowledge of sensor and actuator integration with this 10-question quiz.
          </p>
          {showQuiz && <Quiz questions={quizQuestions} />}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation border-white/20" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-4/section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2 - Ladder Logic
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation bg-elec-yellow text-background hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-4/section-4">
              Next: Section 4 - Industrial Protocols
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default IndustrialElectricalModule4Section3;
