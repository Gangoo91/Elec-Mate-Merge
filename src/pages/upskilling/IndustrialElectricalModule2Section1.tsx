import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Settings,
  TrendingUp,
  Gauge,
  CheckCircle,
  AlertTriangle,
  Leaf,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IndustrialElectricalModule2Section1: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
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
      explanation: 'Star-Delta starting reduces both starting current AND starting torque to approximately one-third (1/√3²) of DOL values. The motor starts in star configuration (lower voltage per winding) then switches to delta for normal running.'
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
      options: ['Full line voltage (400V)', 'Line voltage ÷ √3 (230V)', 'Line voltage × √3 (690V)', 'Half line voltage (200V)'],
      correctAnswer: 'Line voltage ÷ √3 (230V)'
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
      question: 'Why can\'t I use DOL starting for larger motors?',
      answer: 'DOL starting draws 6-8 times the motor\'s Full Load Current (FLC) during startup. For larger motors, this causes significant voltage dips on the supply network, potentially affecting other equipment. UK Distribution Network Operators (DNOs) typically restrict DOL starting to motors below 7.5kW on standard supplies. Larger motors require reduced voltage starting methods or supply upgrades. The high inrush can also cause nuisance tripping of protective devices and mechanical shock to driven equipment.'
    },
    {
      question: 'What causes the current spike during Star-Delta transition?',
      answer: 'When switching from star to delta, there\'s a brief period where the motor is disconnected from the supply (open transition). During this time, the motor acts as a generator, producing a decaying voltage. When reconnected in delta, the phase difference between supply voltage and motor-generated voltage can cause a current transient of 2-3 times FLC. Closed-transition Star-Delta starters use additional contactors to maintain supply during changeover, reducing this spike significantly.'
    },
    {
      question: 'Can I retrofit a soft starter to an existing DOL motor installation?',
      answer: 'Yes, soft starters are excellent retrofit solutions. They typically require the same space as a traditional starter and can use existing motor cables. However, consider: the motor must be suitable for reduced voltage starting (adequate torque at reduced voltage), cooling may be affected at low speeds during extended ramps, and you may need to adjust protection relay settings. Some soft starters include bypass contactors for running efficiency once up to speed.'
    },
    {
      question: 'Do VSDs damage motor bearings?',
      answer: 'VSDs can cause bearing damage through Electric Discharge Machining (EDM) if not properly addressed. The PWM switching creates common-mode voltages that can build up on the motor shaft and discharge through bearings, causing pitting and fluting damage. Solutions include: shaft grounding rings, insulated bearings (on the non-drive end), proper cable shielding with 360° gland terminations, and output filters. Modern inverter-duty motors (IEC 60034-25) are designed to withstand these stresses.'
    },
    {
      question: 'What\'s the difference between IE3 and IE4 motors in practical terms?',
      answer: 'IE4 (Super Premium) motors are typically 1-2% more efficient than IE3 (Premium) motors. While this seems small, for continuously running motors the energy savings compound significantly. A 75kW motor running 8,000 hours/year at 1.5% efficiency improvement saves approximately £900/year at current electricity prices. IE4 motors often use copper rotor construction or permanent magnet technology. The payback period depends on running hours, load factor, and electricity costs.'
    },
    {
      question: 'How do I select between a soft starter and VSD for my application?',
      answer: 'Choose a soft starter when: you only need controlled starting/stopping, the motor runs at constant speed, cost is a primary concern, and you want simplicity. Choose a VSD when: you need variable speed control, energy savings from speed reduction are possible (pumps, fans), precise process control is required, or you need frequent starting/stopping. VSDs cost 2-3 times more than soft starters but offer greater functionality and potential energy savings of 20-50% on variable torque loads.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-700 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-elec-yellow text-sm font-medium mb-2">
            Module 2: Motor Control Systems • Section 1
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Motor Types: DOL, Star-Delta, Soft Start & VSD
          </h1>
          <p className="text-gray-400">
            Understanding motor starting methods and their applications in UK industrial installations
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1: Direct Online (DOL) Starting */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              1. Direct Online (DOL) Starting
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Direct Online (DOL) starting is the simplest and most economical method of starting a
              three-phase induction motor. The motor is connected directly to the supply at full
              voltage through a contactor and overload relay combination.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">DOL Characteristics:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                  <span><strong>Inrush current:</strong> 6-8 times Full Load Current (FLC) - causes voltage dips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong>Starting torque:</strong> 100-200% of full load torque - high breakaway capability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong>Cost:</strong> Lowest capital cost of all starting methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                  <span><strong>Mechanical stress:</strong> High torque impulse can damage driven equipment</span>
                </li>
              </ul>
            </div>

            <p>
              In UK industrial practice, DOL starting is typically limited to motors below <strong>7.5kW</strong> on
              standard supplies. Larger installations may require approval from the Distribution Network
              Operator (DNO) due to potential supply disturbances. The <strong>G59/G99 Engineering Recommendations</strong> govern
              connection of larger loads.
            </p>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-300">
                <strong>Practical Note:</strong> DOL starters are ideal for small motors driving pumps, fans, and
                conveyors where the load permits instant full-speed starting. Consider the mechanical
                coupling's ability to withstand starting torque peaks.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Star-Delta Starting */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              2. Star-Delta Starting
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Star-Delta (Y-Δ) starting is a traditional reduced voltage starting method that uses the
              motor's winding connections to limit inrush current. The motor must have all six winding
              terminals available and be rated for 400V delta connection in UK applications.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">How Star-Delta Works:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <div>
                    <strong>Star Connection (Starting):</strong> Windings connected in star receive
                    230V each (400V ÷ √3). Starting current and torque reduced to <strong>1/3 of DOL values</strong>.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <div>
                    <strong>Transition:</strong> After timed acceleration (typically 5-15 seconds),
                    contactors switch configuration. Open transition causes brief disconnection.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <div>
                    <strong>Delta Connection (Running):</strong> Full 400V applied to each winding.
                    Motor operates at rated performance.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
              <h3 className="text-orange-300 font-medium mb-2">⚠️ Transition Spike Issue</h3>
              <p className="text-orange-200">
                The open-transition changeover causes a current transient of <strong>2-3× FLC</strong> as the
                out-of-phase motor reconnects. This can trip protective devices and cause mechanical
                shock. <strong>Closed-transition Star-Delta starters</strong> use a fourth contactor with resistors
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
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              3. Soft Starters - Controlled Voltage Ramp
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Soft starters use <strong>thyristors (SCRs)</strong> to gradually increase the voltage applied to the
              motor, providing smooth acceleration and controlled starting current. They offer precise
              control over the starting process without the mechanical contactors of Star-Delta systems.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-green-400 font-medium mb-3">Advantages:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Adjustable current limit (typically 2-5× FLC)</li>
                  <li>• Smooth acceleration reduces mechanical stress</li>
                  <li>• Soft stop feature for pump applications</li>
                  <li>• Compact size - easy retrofit to existing DOL</li>
                  <li>• Built-in motor protection features</li>
                  <li>• No transition current spike</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-red-400 font-medium mb-3">Limitations:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Reduced starting torque with reduced current</li>
                  <li>• Not suitable for high starting torque loads</li>
                  <li>• Thyristor losses generate heat</li>
                  <li>• Limited to 10-20 starts per hour typically</li>
                  <li>• No speed control during running</li>
                  <li>• Harmonic distortion during ramping</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">Soft Starter Applications:</h3>
              <p className="mb-3">Ideal for applications where controlled acceleration is beneficial:</p>
              <ul className="space-y-1">
                <li>• <strong>Centrifugal pumps:</strong> Soft stop prevents water hammer</li>
                <li>• <strong>Conveyors:</strong> Gradual acceleration prevents product damage</li>
                <li>• <strong>Fans:</strong> Reduced belt slip and mechanical stress</li>
                <li>• <strong>Compressors:</strong> Unloaded starting with controlled ramp</li>
              </ul>
            </div>

            <p>
              Most modern soft starters include a <strong>bypass contactor</strong> that switches the thyristors
              out of circuit once the motor reaches full speed. This eliminates running losses and
              reduces heat generation, improving efficiency and extending component life.
            </p>
          </div>
        </section>

        {/* Section 4: Variable Speed Drives */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              4. Variable Speed Drives (VSDs) - Full Control
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Variable Speed Drives (VSDs), also called Variable Frequency Drives (VFDs) or inverters,
              provide complete control over motor speed, torque, and acceleration. They convert fixed
              frequency AC supply to variable frequency and voltage output using power electronics.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">VSD Operating Principle:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">AC</span>
                  <div>
                    <strong>Rectifier Stage:</strong> Converts incoming AC (50Hz) to DC using diode
                    or thyristor bridge.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded bg-gray-600 flex items-center justify-center text-sm font-bold flex-shrink-0">DC</span>
                  <div>
                    <strong>DC Link:</strong> Large capacitors smooth the DC voltage and provide
                    energy storage for dynamic response.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded bg-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">VAC</span>
                  <div>
                    <strong>Inverter Stage:</strong> IGBTs switch the DC to create PWM output at
                    variable frequency (0-50Hz+) and voltage.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
              <h3 className="text-purple-300 font-medium mb-2">Affinity Laws - Energy Savings Potential</h3>
              <p className="text-purple-200 mb-2">
                For centrifugal pumps and fans, the Affinity Laws show:
              </p>
              <ul className="text-purple-200 space-y-1">
                <li>• <strong>Flow ∝ Speed</strong> - Reduce speed to 80% = 80% flow</li>
                <li>• <strong>Pressure ∝ Speed²</strong> - Reduce speed to 80% = 64% pressure</li>
                <li>• <strong>Power ∝ Speed³</strong> - Reduce speed to 80% = <strong>51% power!</strong></li>
              </ul>
            </div>

            <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
              <h3 className="text-orange-300 font-medium mb-2">⚠️ VSD Installation Considerations:</h3>
              <ul className="text-orange-200 space-y-1">
                <li>• <strong>Harmonics:</strong> 5th and 7th harmonics pollute supply - may need filters</li>
                <li>• <strong>Cable length:</strong> Long runs cause reflected wave voltage spikes - use output filters</li>
                <li>• <strong>Motor bearings:</strong> EDM damage risk - use shaft grounding or insulated bearings</li>
                <li>• <strong>EMC:</strong> Screened cables and proper earthing essential for EMC compliance</li>
                <li>• <strong>Motor rating:</strong> Standard motors may need derating below 25Hz due to reduced cooling</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Selecting the Right Starting Method */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              5. Selecting the Right Starting Method
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Choosing the appropriate motor starting method depends on multiple factors including
              motor size, load characteristics, supply limitations, and operational requirements.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-600 rounded-lg overflow-hidden">
                <thead className="bg-[#1a1a1a]">
                  <tr>
                    <th className="px-4 py-3 text-left text-elec-yellow">Criteria</th>
                    <th className="px-4 py-3 text-center text-elec-yellow">DOL</th>
                    <th className="px-4 py-3 text-center text-elec-yellow">Star-Delta</th>
                    <th className="px-4 py-3 text-center text-elec-yellow">Soft Start</th>
                    <th className="px-4 py-3 text-center text-elec-yellow">VSD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2">Starting Current</td>
                    <td className="px-4 py-2 text-center text-red-400">6-8× FLC</td>
                    <td className="px-4 py-2 text-center text-yellow-400">2-3× FLC</td>
                    <td className="px-4 py-2 text-center text-green-400">2-4× FLC</td>
                    <td className="px-4 py-2 text-center text-green-400">1-1.5× FLC</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-[#1a1a1a]/50">
                    <td className="px-4 py-2">Starting Torque</td>
                    <td className="px-4 py-2 text-center text-green-400">100-200%</td>
                    <td className="px-4 py-2 text-center text-yellow-400">33%</td>
                    <td className="px-4 py-2 text-center text-yellow-400">Variable</td>
                    <td className="px-4 py-2 text-center text-green-400">100%+</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2">Speed Control</td>
                    <td className="px-4 py-2 text-center text-red-400">No</td>
                    <td className="px-4 py-2 text-center text-red-400">No</td>
                    <td className="px-4 py-2 text-center text-red-400">No</td>
                    <td className="px-4 py-2 text-center text-green-400">Yes</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-[#1a1a1a]/50">
                    <td className="px-4 py-2">Relative Cost</td>
                    <td className="px-4 py-2 text-center text-green-400">£</td>
                    <td className="px-4 py-2 text-center text-yellow-400">££</td>
                    <td className="px-4 py-2 text-center text-yellow-400">££</td>
                    <td className="px-4 py-2 text-center text-red-400">£££</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2">Energy Savings</td>
                    <td className="px-4 py-2 text-center text-red-400">None</td>
                    <td className="px-4 py-2 text-center text-red-400">None</td>
                    <td className="px-4 py-2 text-center text-yellow-400">Minor</td>
                    <td className="px-4 py-2 text-center text-green-400">20-50%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">Selection Guidelines:</h3>
              <ul className="space-y-2">
                <li>• <strong>DOL:</strong> Motors ≤7.5kW with adequate supply, low starting frequency</li>
                <li>• <strong>Star-Delta:</strong> Motors 7.5-55kW with light starting loads, 6-terminal motor required</li>
                <li>• <strong>Soft Starter:</strong> When current limiting and soft stop needed, moderate duty cycles</li>
                <li>• <strong>VSD:</strong> Variable speed required, energy savings priority, frequent starts, or precise control</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Energy Efficiency (IE Classes) */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              6. Energy Efficiency Considerations (IE Classes)
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The International Efficiency (IE) classification system defined in <strong>IEC 60034-30-1</strong> rates
              motor efficiency. Under EU Ecodesign regulations (retained in UK law), minimum efficiency
              requirements apply to motors placed on the market.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">IE Efficiency Classes:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded bg-gray-800/50">
                  <span className="w-12 h-8 rounded bg-gray-600 flex items-center justify-center text-sm font-bold">IE1</span>
                  <div>
                    <strong>Standard Efficiency</strong> - No longer permitted for most new motors
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-gray-800/50">
                  <span className="w-12 h-8 rounded bg-blue-600 flex items-center justify-center text-sm font-bold">IE2</span>
                  <div>
                    <strong>High Efficiency</strong> - Minimum for motors with VSD only
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-green-800/50">
                  <span className="w-12 h-8 rounded bg-green-600 flex items-center justify-center text-sm font-bold">IE3</span>
                  <div>
                    <strong>Premium Efficiency</strong> - Current minimum for 0.75-1000kW motors (DOL/Star-Delta)
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-purple-800/50">
                  <span className="w-12 h-8 rounded bg-purple-600 flex items-center justify-center text-sm font-bold">IE4</span>
                  <div>
                    <strong>Super Premium</strong> - Best available, often permanent magnet or copper rotor
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-yellow-800/30">
                  <span className="w-12 h-8 rounded bg-elec-yellow text-[#1a1a1a] flex items-center justify-center text-sm font-bold">IE5</span>
                  <div>
                    <strong>Ultra Premium</strong> - Emerging class, typically synchronous reluctance or PM motors
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <h3 className="text-green-300 font-medium mb-2">Lifecycle Cost Perspective</h3>
              <p className="text-green-200">
                Motor purchase price represents only <strong>2-5%</strong> of total lifecycle cost. Energy consumption
                accounts for <strong>95-97%</strong> over a typical 15-20 year motor life. A 75kW motor running
                6,000 hours/year at £0.15/kWh costs approximately <strong>£67,500/year</strong> in electricity.
                Even 1% efficiency improvement saves £675 annually.
              </p>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">Motor Efficiency Best Practices:</h3>
              <ul className="space-y-2">
                <li>• Specify IE3 minimum, IE4 where lifecycle cost justifies the premium</li>
                <li>• Right-size motors - oversized motors operate at poor efficiency</li>
                <li>• Use VSDs on variable load applications (pumps, fans, compressors)</li>
                <li>• Maintain motors properly - alignment, lubrication, clean cooling</li>
                <li>• Consider rewound motor efficiency loss (typically 1-2% per rewind)</li>
                <li>• Replace old motors proactively rather than run-to-failure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-2">Starting Current Multiples:</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• <strong>DOL:</strong> 6-8× FLC (full voltage, full torque)</li>
                <li>• <strong>Star-Delta:</strong> 2-3× FLC (⅓ voltage, ⅓ torque in star)</li>
                <li>• <strong>Soft Starter:</strong> 2-4× FLC (adjustable limit)</li>
                <li>• <strong>VSD:</strong> 1-1.5× FLC (full torque available)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">UK Motor Size Guidance:</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• <strong>DOL limit:</strong> Typically 7.5kW on standard supplies</li>
                <li>• <strong>Star-Delta:</strong> Common for 7.5-55kW range</li>
                <li>• <strong>Soft Start/VSD:</strong> Any size, application dependent</li>
                <li>• <strong>DNO consultation:</strong> Motors >15kW or multiple starts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">IE Efficiency Regulations:</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• <strong>IE3 minimum:</strong> 0.75-1000kW (DOL/Star-Delta)</li>
                <li>• <strong>IE2 + VSD:</strong> Alternative compliance route</li>
                <li>• <strong>Exemptions:</strong> Hazardous areas, high altitude, etc.</li>
                <li>• <strong>IE4 recommended:</strong> High running hours applications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Key Standards:</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• <strong>IEC 60034-30-1:</strong> IE efficiency classification</li>
                <li>• <strong>IEC 60034-25:</strong> Inverter-duty motors</li>
                <li>• <strong>BS 7671:</strong> Wiring Regulations (motor circuits)</li>
                <li>• <strong>G59/G99:</strong> DNO connection requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors min-h-[44px] touch-manipulation"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 py-3 text-gray-300 bg-[#1a1a1a]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Section Quiz</h2>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              variant="outline"
              className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-[#1a1a1a] min-h-[44px] touch-manipulation active:scale-[0.98]"
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
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-1')}
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white min-h-[44px] touch-manipulation active:scale-[0.98]"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous: Module 1
          </Button>
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-2/section-2')}
            className="flex items-center gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation active:scale-[0.98]"
          >
            Next: Section 2
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule2Section1;
