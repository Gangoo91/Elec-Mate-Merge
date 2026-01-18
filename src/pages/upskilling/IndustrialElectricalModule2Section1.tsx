import React, { useState } from 'react';
import { ArrowLeft, Zap, CheckCircle, AlertTriangle, HelpCircle, Settings, TrendingUp, Gauge, Leaf, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';

const IndustrialElectricalModule2Section1: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Motor Types: DOL, Star-Delta, Soft Start & VSD | Industrial Electrical Module 2',
    description: 'Learn about motor starting methods including Direct Online (DOL), Star-Delta, Soft Starters, and Variable Speed Drives (VSDs). Covers UK standards, inrush currents, and IE efficiency classes.',
    keywords: ['motor starting methods', 'DOL starter', 'star-delta', 'soft starter', 'VSD', 'variable speed drive', 'IE efficiency', 'industrial electrical', 'UK motor standards']
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-motor-types',
      question: 'What is the typical inrush current multiple for a Direct Online (DOL) motor start?',
      options: ['2-3 times FLC', '4-5 times FLC', '6-8 times FLC', '10-12 times FLC'],
      correctIndex: 2,
      explanation: 'DOL starting draws 6-8 times the Full Load Current (FLC) during startup. This high inrush current can cause voltage dips on the supply network, which is why DOL is typically limited to smaller motors (usually below 7.5kW in the UK).'
    },
    {
      id: 'qc2-star-delta',
      question: 'By what factor does Star-Delta starting reduce the starting current compared to DOL?',
      options: ['Reduces by half (50%)', 'Reduces to one-third (33%)', 'Reduces by two-thirds (67%)', 'Reduces to one-quarter (25%)'],
      correctIndex: 1,
      explanation: 'Star-Delta starting reduces both starting current AND starting torque to approximately one-third (1/sqrt3 squared) of DOL values. The motor starts in star configuration (lower voltage per winding) then switches to delta for normal running.'
    },
    {
      id: 'qc3-vsd',
      question: 'Which motor starting method provides the best energy efficiency for variable load applications?',
      options: ['DOL with contactor', 'Star-Delta starter', 'Soft starter', 'Variable Speed Drive (VSD)'],
      correctIndex: 3,
      explanation: 'VSDs (also called VFDs or inverters) provide the best energy efficiency by adjusting motor speed to match the load requirement. They can save 20-50% energy on pump and fan applications by following the Affinity Laws where power varies with the cube of speed.'
    }
  ];

  const quizQuestions = [
    {
      question: 'According to UK practice, DOL starting is typically limited to motors below what power rating to avoid supply disturbances?',
      options: ['3.7kW', '7.5kW', '11kW', '15kW'],
      correctAnswer: '7.5kW'
    },
    {
      question: 'What is the main disadvantage of Star-Delta starting during the changeover from star to delta?',
      options: ['Motor stops completely', 'Current transient spike occurs', 'Motor reverses direction', 'Overheating of windings'],
      correctAnswer: 'Current transient spike occurs'
    },
    {
      question: 'A soft starter controls motor voltage during starting using which electronic components?',
      options: ['IGBTs', 'Thyristors (SCRs)', 'MOSFETs', 'Diodes'],
      correctAnswer: 'Thyristors (SCRs)'
    },
    {
      question: 'What does the IE classification system rate for electric motors?',
      options: ['Ingress Protection level', 'Energy efficiency class', 'Insulation class', 'Installation environment'],
      correctAnswer: 'Energy efficiency class'
    },
    {
      question: 'Which IE efficiency class is the current minimum requirement under EU Ecodesign regulations for most industrial motors?',
      options: ['IE1 - Standard', 'IE2 - High', 'IE3 - Premium', 'IE4 - Super Premium'],
      correctAnswer: 'IE3 - Premium'
    },
    {
      question: 'What potential issue must be considered when using VSDs on long cable runs to the motor?',
      options: ['Excessive cable heating', 'Reflected wave voltage spikes', 'Cable capacitance charging', 'Earth fault sensitivity'],
      correctAnswer: 'Reflected wave voltage spikes'
    },
    {
      question: 'In a Star-Delta starter, what is the voltage across each motor winding when connected in star configuration?',
      options: ['Full line voltage (400V)', 'Line voltage / sqrt3 (230V)', 'Line voltage x sqrt3 (690V)', 'Half line voltage (200V)'],
      correctAnswer: 'Line voltage / sqrt3 (230V)'
    },
    {
      question: 'Which motor starting method is most suitable for applications requiring frequent starts and stops?',
      options: ['DOL starter', 'Star-Delta starter', 'Soft starter with bypass', 'VSD'],
      correctAnswer: 'VSD'
    },
    {
      question: 'What harmonic order is most commonly associated with VSD installations causing supply pollution?',
      options: ['3rd harmonic', '5th and 7th harmonics', '11th harmonic', '50th harmonic'],
      correctAnswer: '5th and 7th harmonics'
    },
    {
      question: 'For a pump application following the Affinity Laws, reducing motor speed to 80% of rated speed reduces power consumption to approximately what percentage?',
      options: ['80%', '64%', '51%', '40%'],
      correctAnswer: '51%'
    }
  ];

  const faqItems = [
    {
      question: "Why can't I use DOL starting for larger motors?",
      answer: "DOL starting draws 6-8 times the motor's Full Load Current (FLC) during startup. For larger motors, this causes significant voltage dips on the supply network, potentially affecting other equipment. UK Distribution Network Operators (DNOs) typically restrict DOL starting to motors below 7.5kW on standard supplies. Larger motors require reduced voltage starting methods or supply upgrades. The high inrush can also cause nuisance tripping of protective devices and mechanical shock to driven equipment."
    },
    {
      question: 'What causes the current spike during Star-Delta transition?',
      answer: "When switching from star to delta, there's a brief period where the motor is disconnected from the supply (open transition). During this time, the motor acts as a generator, producing a decaying voltage. When reconnected in delta, the phase difference between supply voltage and motor-generated voltage can cause a current transient of 2-3 times FLC. Closed-transition Star-Delta starters use additional contactors to maintain supply during changeover, reducing this spike significantly."
    },
    {
      question: 'Can I retrofit a soft starter to an existing DOL motor installation?',
      answer: 'Yes, soft starters are excellent retrofit solutions. They typically require the same space as a traditional starter and can use existing motor cables. However, consider: the motor must be suitable for reduced voltage starting (adequate torque at reduced voltage), cooling may be affected at low speeds during extended ramps, and you may need to adjust protection relay settings. Some soft starters include bypass contactors for running efficiency once up to speed.'
    },
    {
      question: 'Do VSDs damage motor bearings?',
      answer: 'VSDs can cause bearing damage through Electric Discharge Machining (EDM) if not properly addressed. The PWM switching creates common-mode voltages that can build up on the motor shaft and discharge through bearings, causing pitting and fluting damage. Solutions include: shaft grounding rings, insulated bearings (on the non-drive end), proper cable shielding with 360 degree gland terminations, and output filters. Modern inverter-duty motors (IEC 60034-25) are designed to withstand these stresses.'
    },
    {
      question: "What's the difference between IE3 and IE4 motors in practical terms?",
      answer: 'IE4 (Super Premium) motors are typically 1-2% more efficient than IE3 (Premium) motors. While this seems small, for continuously running motors the energy savings compound significantly. A 75kW motor running 8,000 hours/year at 1.5% efficiency improvement saves approximately 900 pounds/year at current electricity prices. IE4 motors often use copper rotor construction or permanent magnet technology. The payback period depends on running hours, load factor, and electricity costs.'
    },
    {
      question: 'How do I select between a soft starter and VSD for my application?',
      answer: 'Choose a soft starter when: you only need controlled starting/stopping, the motor runs at constant speed, cost is a primary concern, and you want simplicity. Choose a VSD when: you need variable speed control, energy savings from speed reduction are possible (pumps, fans), precise process control is required, or you need frequent starting/stopping. VSDs cost 2-3 times more than soft starters but offer greater functionality and potential energy savings of 20-50% on variable torque loads.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-xs text-muted-foreground">Module 2 &gt; Section 1</span>
        </div>
      </header>

      {/* Title */}
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
          <Zap className="w-6 h-6 text-elec-yellow" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Motor Types: DOL, Star-Delta, Soft Start &amp; VSD
        </h1>
        <p className="text-muted-foreground">
          Understanding motor starting methods and their applications in UK industrial installations
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-12 space-y-10">
        {/* Learning Outcomes */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Explain the principles and characteristics of DOL motor starting
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Understand Star-Delta starting methods including transition considerations
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Describe soft starter operation and applications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Understand Variable Speed Drive principles and energy saving potential
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Select appropriate starting methods for different applications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Understand IE efficiency classifications and regulations
            </li>
          </ul>
        </div>

        {/* Section 1: DOL Starting */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Direct Online (DOL) Starting
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Direct Online (DOL) starting is the simplest and most economical method of starting a
              three-phase induction motor. The motor is connected directly to the supply at full
              voltage through a contactor and overload relay combination.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3">DOL Characteristics</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Inrush current:</strong> 6-8 times Full Load Current (FLC) - causes voltage dips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Starting torque:</strong> 100-200% of full load torque - high breakaway capability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Cost:</strong> Lowest capital cost of all starting methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Mechanical stress:</strong> High torque impulse can damage driven equipment</span>
                </li>
              </ul>
            </div>

            <p>
              In UK industrial practice, DOL starting is typically limited to motors below <strong className="text-foreground">7.5kW</strong> on
              standard supplies. Larger installations may require approval from the Distribution Network
              Operator (DNO) due to potential supply disturbances. The <strong className="text-foreground">G59/G99 Engineering Recommendations</strong> govern
              connection of larger loads.
            </p>

            <div className="bg-blue-500/10 border-l-2 border-blue-500/50 rounded-r-lg p-4">
              <p className="text-sm">
                <strong className="text-foreground">Practical Note:</strong> DOL starters are ideal for small motors driving pumps, fans, and
                conveyors where the load permits instant full-speed starting. Consider the mechanical
                coupling's ability to withstand starting torque peaks.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Star-Delta Starting */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Star-Delta Starting
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Star-Delta (Y-Delta) starting is a traditional reduced voltage starting method that uses the
              motor's winding connections to limit inrush current. The motor must have all six winding
              terminals available and be rated for 400V delta connection in UK applications.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3">How Star-Delta Works</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <div>
                    <strong className="text-foreground">Star Connection (Starting):</strong> Windings connected in star receive
                    230V each (400V / sqrt3). Starting current and torque reduced to <strong className="text-foreground">1/3 of DOL values</strong>.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <div>
                    <strong className="text-foreground">Transition:</strong> After timed acceleration (typically 5-15 seconds),
                    contactors switch configuration. Open transition causes brief disconnection.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <div>
                    <strong className="text-foreground">Delta Connection (Running):</strong> Full 400V applied to each winding.
                    Motor operates at rated performance.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border-l-2 border-orange-500/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-2">Transition Spike Issue</h3>
              <p className="text-sm">
                The open-transition changeover causes a current transient of <strong className="text-foreground">2-3x FLC</strong> as the
                out-of-phase motor reconnects. This can trip protective devices and cause mechanical
                shock. <strong className="text-foreground">Closed-transition Star-Delta starters</strong> use a fourth contactor with resistors
                to maintain connection during changeover, reducing this spike.
              </p>
            </div>

            <p>
              Star-Delta starting requires the motor to reach approximately 80% speed before
              transition. If the load torque is too high, the motor may stall. This method is
              unsuitable for high-inertia loads or applications requiring high starting torque.
            </p>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Soft Starters */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Soft Starters - Controlled Voltage Ramp
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Soft starters use <strong className="text-foreground">thyristors (SCRs)</strong> to gradually increase the voltage applied to the
              motor, providing smooth acceleration and controlled starting current. They offer precise
              control over the starting process without the mechanical contactors of Star-Delta systems.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/5 border-l-2 border-green-500/50 rounded-r-lg p-4">
                <h3 className="font-medium text-green-400 mb-3">Advantages</h3>
                <ul className="space-y-1 text-sm">
                  <li>&bull; Adjustable current limit (typically 2-5x FLC)</li>
                  <li>&bull; Smooth acceleration reduces mechanical stress</li>
                  <li>&bull; Soft stop feature for pump applications</li>
                  <li>&bull; Compact size - easy retrofit to existing DOL</li>
                  <li>&bull; Built-in motor protection features</li>
                  <li>&bull; No transition current spike</li>
                </ul>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-red-500/50 rounded-r-lg p-4">
                <h3 className="font-medium text-red-400 mb-3">Limitations</h3>
                <ul className="space-y-1 text-sm">
                  <li>&bull; Reduced starting torque with reduced current</li>
                  <li>&bull; Not suitable for high starting torque loads</li>
                  <li>&bull; Thyristor losses generate heat</li>
                  <li>&bull; Limited to 10-20 starts per hour typically</li>
                  <li>&bull; No speed control during running</li>
                  <li>&bull; Harmonic distortion during ramping</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Soft Starter Applications</h3>
              <p className="text-sm mb-3">Ideal for applications where controlled acceleration is beneficial:</p>
              <ul className="space-y-1 text-sm">
                <li>&bull; <strong className="text-foreground">Centrifugal pumps:</strong> Soft stop prevents water hammer</li>
                <li>&bull; <strong className="text-foreground">Conveyors:</strong> Gradual acceleration prevents product damage</li>
                <li>&bull; <strong className="text-foreground">Fans:</strong> Reduced belt slip and mechanical stress</li>
                <li>&bull; <strong className="text-foreground">Compressors:</strong> Unloaded starting with controlled ramp</li>
              </ul>
            </div>

            <p>
              Most modern soft starters include a <strong className="text-foreground">bypass contactor</strong> that switches the thyristors
              out of circuit once the motor reaches full speed. This eliminates running losses and
              reduces heat generation, improving efficiency and extending component life.
            </p>
          </div>
        </section>

        {/* Section 4: Variable Speed Drives */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Variable Speed Drives (VSDs) - Full Control
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Variable Speed Drives (VSDs), also called Variable Frequency Drives (VFDs) or inverters,
              provide complete control over motor speed, torque, and acceleration. They convert fixed
              frequency AC supply to variable frequency and voltage output using power electronics.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3">VSD Operating Principle</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">AC</span>
                  <div>
                    <strong className="text-foreground">Rectifier Stage:</strong> Converts incoming AC (50Hz) to DC using diode
                    or thyristor bridge.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded bg-gray-600 flex items-center justify-center text-sm font-bold flex-shrink-0">DC</span>
                  <div>
                    <strong className="text-foreground">DC Link:</strong> Large capacitors smooth the DC voltage and provide
                    energy storage for dynamic response.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded bg-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">VAC</span>
                  <div>
                    <strong className="text-foreground">Inverter Stage:</strong> IGBTs switch the DC to create PWM output at
                    variable frequency (0-50Hz+) and voltage.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-2">Affinity Laws - Energy Savings Potential</h3>
              <p className="text-sm mb-2">
                For centrifugal pumps and fans, the Affinity Laws show:
              </p>
              <ul className="text-sm space-y-1">
                <li>&bull; <strong className="text-foreground">Flow is proportional to Speed</strong> - Reduce speed to 80% = 80% flow</li>
                <li>&bull; <strong className="text-foreground">Pressure is proportional to Speed squared</strong> - Reduce speed to 80% = 64% pressure</li>
                <li>&bull; <strong className="text-foreground">Power is proportional to Speed cubed</strong> - Reduce speed to 80% = <strong className="text-foreground">51% power!</strong></li>
              </ul>
            </div>

            <div className="bg-orange-500/10 border-l-2 border-orange-500/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-2">VSD Installation Considerations</h3>
              <ul className="text-sm space-y-1">
                <li>&bull; <strong className="text-foreground">Harmonics:</strong> 5th and 7th harmonics pollute supply - may need filters</li>
                <li>&bull; <strong className="text-foreground">Cable length:</strong> Long runs cause reflected wave voltage spikes - use output filters</li>
                <li>&bull; <strong className="text-foreground">Motor bearings:</strong> EDM damage risk - use shaft grounding or insulated bearings</li>
                <li>&bull; <strong className="text-foreground">EMC:</strong> Screened cables and proper earthing essential for EMC compliance</li>
                <li>&bull; <strong className="text-foreground">Motor rating:</strong> Standard motors may need derating below 25Hz due to reduced cooling</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Selecting the Right Starting Method */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Selecting the Right Starting Method
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Choosing the appropriate motor starting method depends on multiple factors including
              motor size, load characteristics, supply limitations, and operational requirements.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-elec-yellow">Criteria</th>
                    <th className="px-4 py-3 text-center text-elec-yellow">DOL</th>
                    <th className="px-4 py-3 text-center text-elec-yellow">Star-Delta</th>
                    <th className="px-4 py-3 text-center text-elec-yellow">Soft Start</th>
                    <th className="px-4 py-3 text-center text-elec-yellow">VSD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-2">Starting Current</td>
                    <td className="px-4 py-2 text-center text-red-400">6-8x FLC</td>
                    <td className="px-4 py-2 text-center text-yellow-400">2-3x FLC</td>
                    <td className="px-4 py-2 text-center text-green-400">2-4x FLC</td>
                    <td className="px-4 py-2 text-center text-green-400">1-1.5x FLC</td>
                  </tr>
                  <tr className="border-t border-white/10 bg-white/5">
                    <td className="px-4 py-2">Starting Torque</td>
                    <td className="px-4 py-2 text-center text-green-400">100-200%</td>
                    <td className="px-4 py-2 text-center text-yellow-400">33%</td>
                    <td className="px-4 py-2 text-center text-yellow-400">Variable</td>
                    <td className="px-4 py-2 text-center text-green-400">100%+</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-2">Speed Control</td>
                    <td className="px-4 py-2 text-center text-red-400">No</td>
                    <td className="px-4 py-2 text-center text-red-400">No</td>
                    <td className="px-4 py-2 text-center text-red-400">No</td>
                    <td className="px-4 py-2 text-center text-green-400">Yes</td>
                  </tr>
                  <tr className="border-t border-white/10 bg-white/5">
                    <td className="px-4 py-2">Relative Cost</td>
                    <td className="px-4 py-2 text-center text-green-400">Low</td>
                    <td className="px-4 py-2 text-center text-yellow-400">Medium</td>
                    <td className="px-4 py-2 text-center text-yellow-400">Medium</td>
                    <td className="px-4 py-2 text-center text-red-400">High</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-2">Energy Savings</td>
                    <td className="px-4 py-2 text-center text-red-400">None</td>
                    <td className="px-4 py-2 text-center text-red-400">None</td>
                    <td className="px-4 py-2 text-center text-yellow-400">Minor</td>
                    <td className="px-4 py-2 text-center text-green-400">20-50%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Selection Guidelines</h3>
              <ul className="space-y-2 text-sm">
                <li>&bull; <strong className="text-foreground">DOL:</strong> Motors up to 7.5kW with adequate supply, low starting frequency</li>
                <li>&bull; <strong className="text-foreground">Star-Delta:</strong> Motors 7.5-55kW with light starting loads, 6-terminal motor required</li>
                <li>&bull; <strong className="text-foreground">Soft Starter:</strong> When current limiting and soft stop needed, moderate duty cycles</li>
                <li>&bull; <strong className="text-foreground">VSD:</strong> Variable speed required, energy savings priority, frequent starts, or precise control</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Energy Efficiency (IE Classes) */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Energy Efficiency Considerations (IE Classes)
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              The International Efficiency (IE) classification system defined in <strong className="text-foreground">IEC 60034-30-1</strong> rates
              motor efficiency. Under EU Ecodesign regulations (retained in UK law), minimum efficiency
              requirements apply to motors placed on the market.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3">IE Efficiency Classes</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                  <span className="w-12 h-8 rounded bg-gray-600 flex items-center justify-center text-sm font-bold flex-shrink-0">IE1</span>
                  <div>
                    <strong className="text-foreground">Standard Efficiency</strong> - No longer permitted for most new motors
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                  <span className="w-12 h-8 rounded bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">IE2</span>
                  <div>
                    <strong className="text-foreground">High Efficiency</strong> - Minimum for motors with VSD only
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                  <span className="w-12 h-8 rounded bg-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">IE3</span>
                  <div>
                    <strong className="text-foreground">Premium Efficiency</strong> - Current minimum for 0.75-1000kW motors (DOL/Star-Delta)
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                  <span className="w-12 h-8 rounded bg-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0">IE4</span>
                  <div>
                    <strong className="text-foreground">Super Premium</strong> - Best available, often permanent magnet or copper rotor
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                  <span className="w-12 h-8 rounded bg-elec-yellow text-black flex items-center justify-center text-sm font-bold flex-shrink-0">IE5</span>
                  <div>
                    <strong className="text-foreground">Ultra Premium</strong> - Emerging class, typically synchronous reluctance or PM motors
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border-l-2 border-green-500/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-2">Lifecycle Cost Perspective</h3>
              <p className="text-sm">
                Motor purchase price represents only <strong className="text-foreground">2-5%</strong> of total lifecycle cost. Energy consumption
                accounts for <strong className="text-foreground">95-97%</strong> over a typical 15-20 year motor life. A 75kW motor running
                6,000 hours/year at 0.15 pounds/kWh costs approximately <strong className="text-foreground">67,500 pounds/year</strong> in electricity.
                Even 1% efficiency improvement saves 675 pounds annually.
              </p>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Motor Efficiency Best Practices</h3>
              <ul className="space-y-2 text-sm">
                <li>&bull; Specify IE3 minimum, IE4 where lifecycle cost justifies the premium</li>
                <li>&bull; Right-size motors - oversized motors operate at poor efficiency</li>
                <li>&bull; Use VSDs on variable load applications (pumps, fans, compressors)</li>
                <li>&bull; Maintain motors properly - alignment, lubrication, clean cooling</li>
                <li>&bull; Consider rewound motor efficiency loss (typically 1-2% per rewind)</li>
                <li>&bull; Replace old motors proactively rather than run-to-failure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-lg font-semibold text-foreground">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-medium text-foreground mb-2">Starting Current Multiples</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>&bull; <strong className="text-foreground">DOL:</strong> 6-8x FLC (full voltage, full torque)</li>
                <li>&bull; <strong className="text-foreground">Star-Delta:</strong> 2-3x FLC (1/3 voltage, 1/3 torque in star)</li>
                <li>&bull; <strong className="text-foreground">Soft Starter:</strong> 2-4x FLC (adjustable limit)</li>
                <li>&bull; <strong className="text-foreground">VSD:</strong> 1-1.5x FLC (full torque available)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">UK Motor Size Guidance</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>&bull; <strong className="text-foreground">DOL limit:</strong> Typically 7.5kW on standard supplies</li>
                <li>&bull; <strong className="text-foreground">Star-Delta:</strong> Common for 7.5-55kW range</li>
                <li>&bull; <strong className="text-foreground">Soft Start/VSD:</strong> Any size, application dependent</li>
                <li>&bull; <strong className="text-foreground">DNO consultation:</strong> Motors &gt;15kW or multiple starts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">IE Efficiency Regulations</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>&bull; <strong className="text-foreground">IE3 minimum:</strong> 0.75-1000kW (DOL/Star-Delta)</li>
                <li>&bull; <strong className="text-foreground">IE2 + VSD:</strong> Alternative compliance route</li>
                <li>&bull; <strong className="text-foreground">Exemptions:</strong> Hazardous areas, high altitude, etc.</li>
                <li>&bull; <strong className="text-foreground">IE4 recommended:</strong> High running hours applications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Key Standards</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>&bull; <strong className="text-foreground">IEC 60034-30-1:</strong> IE efficiency classification</li>
                <li>&bull; <strong className="text-foreground">IEC 60034-25:</strong> Inverter-duty motors</li>
                <li>&bull; <strong className="text-foreground">BS 7671:</strong> Wiring Regulations (motor circuits)</li>
                <li>&bull; <strong className="text-foreground">G59/G99:</strong> DNO connection requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
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
        <section className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Section Quiz</h2>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              variant="outline"
              className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
            >
              {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
            </Button>
          </div>

          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              moduleId="industrial-electrical-2"
              sectionId="section-1"
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-black hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-2/section-2">
              Next: Control Circuits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule2Section1;
