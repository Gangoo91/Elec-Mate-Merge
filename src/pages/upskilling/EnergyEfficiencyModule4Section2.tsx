import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  Gauge,
  RotateCcw,
  Wrench,
  FileText,
  Shield,
  Activity,
  HelpCircle,
  Cpu
} from 'lucide-react';

const EnergyEfficiencyModule4Section2: React.FC = () => {
  useSEO({
    title: 'Motor Efficiency and VSD Retrofitting | Energy Efficiency Module 4 Section 2 | Elec-Mate',
    description: 'Learn about motor efficiency classes IE1-IE5, Variable Speed Drive retrofitting, affinity laws, and energy savings calculations for UK electrical installations.',
    keywords: [
      'motor efficiency',
      'VSD',
      'variable speed drive',
      'IE3',
      'IE4',
      'IE5',
      'affinity laws',
      'energy savings',
      'EMC',
      'harmonics',
      'UK regulations',
      'Ecodesign'
    ]
  });

  const quickCheckQuestions = [
    {
      id: 'qc-motor-efficiency',
      question: 'Under current UK/EU Ecodesign regulations, what is the minimum efficiency class required for new three-phase motors between 0.75kW and 1000kW?',
      options: ['IE1 Standard Efficiency', 'IE2 High Efficiency', 'IE3 Premium Efficiency', 'IE4 Super Premium Efficiency'],
      correctIndex: 2,
      explanation: 'Since July 2021, all new three-phase motors from 0.75kW to 1000kW must meet IE3 (Premium Efficiency) requirements under EU Ecodesign Regulation 2019/1781. Motors below 0.12kW and certain specialist applications are exempt.'
    },
    {
      id: 'qc-affinity-laws',
      question: 'According to the affinity laws, if a pump motor speed is reduced from 100% to 80%, what is the approximate power consumption?',
      options: ['80% of original power', '64% of original power', '51% of original power', '20% of original power'],
      correctIndex: 2,
      explanation: 'The affinity laws state that power varies with the cube of speed. At 80% speed: 0.8³ = 0.512 or approximately 51% of original power. This demonstrates the significant energy savings possible with VSDs on variable torque loads like pumps and fans.'
    },
    {
      id: 'qc-vsd-filters',
      question: 'What is the primary purpose of installing a line reactor or dV/dt filter with a VSD?',
      options: ['To increase motor torque', 'To reduce harmonic distortion and protect motor insulation', 'To bypass the VSD during faults', 'To provide power factor correction only'],
      correctIndex: 1,
      explanation: 'Line reactors and dV/dt filters reduce harmonic distortion fed back to the supply and protect motor winding insulation from the steep voltage rise times (high dV/dt) produced by PWM inverters. This is especially important for older motors or long cable runs.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What does the IE classification system measure for electric motors?',
      options: ['Insulation class rating', 'International Efficiency level', 'Installation Environment rating', 'Ingress Protection level'],
      correctAnswer: 'International Efficiency level'
    },
    {
      question: 'A motor operates 6000 hours per year. At what point does replacing an IE2 motor with an IE3 become cost-effective?',
      options: ['When total energy savings exceed motor replacement cost', 'Only when the motor fails completely', 'Never - IE2 motors should always be repaired', 'Only for motors above 100kW'],
      correctAnswer: 'When total energy savings exceed motor replacement cost'
    },
    {
      question: 'Which type of load benefits MOST from VSD installation for energy savings?',
      options: ['Constant torque loads like conveyors', 'Variable torque loads like centrifugal pumps', 'Constant power loads like winders', 'Intermittent loads like hoists'],
      correctAnswer: 'Variable torque loads like centrifugal pumps'
    },
    {
      question: 'What is the typical harmonic spectrum produced by a 6-pulse VSD?',
      options: ['2nd, 4th, 6th harmonics', '5th, 7th, 11th, 13th harmonics', '3rd, 9th, 15th harmonics', 'No harmonics are produced'],
      correctAnswer: '5th, 7th, 11th, 13th harmonics'
    },
    {
      question: 'According to BS 7671, what additional protection consideration applies to circuits supplying VSDs?',
      options: ['RCD protection is never required', 'Type A RCDs are always suitable', 'Type B RCDs may be required due to DC fault currents', 'MCBs must be Type D only'],
      correctAnswer: 'Type B RCDs may be required due to DC fault currents'
    },
    {
      question: 'What is motor slip in an induction motor?',
      options: ['Physical movement of the shaft', 'Difference between synchronous and rotor speed', 'Bearing wear measurement', 'Insulation breakdown'],
      correctAnswer: 'Difference between synchronous and rotor speed'
    },
    {
      question: 'When retrofitting a VSD to an existing motor, what critical parameter must be verified about the motor?',
      options: ['Paint colour specification', 'Insulation class and inverter duty rating', 'Manufacturer country of origin', 'Original purchase date'],
      correctAnswer: 'Insulation class and inverter duty rating'
    },
    {
      question: 'What is the purpose of the DC bus capacitors in a VSD?',
      options: ['To provide power factor correction', 'To smooth rectified DC voltage', 'To generate output frequency', 'To limit starting current'],
      correctAnswer: 'To smooth rectified DC voltage'
    },
    {
      question: 'For a pump running at 50% flow using a VSD, what percentage of full load power is approximately consumed?',
      options: ['50%', '25%', '12.5%', '75%'],
      correctAnswer: '12.5%'
    },
    {
      question: 'What EMC requirement typically applies to VSD installations in the UK?',
      options: ['No EMC requirements exist', 'C1 category for residential environments', 'C3 category for industrial environments', 'Both B and C depending on installation location'],
      correctAnswer: 'Both B and C depending on installation location'
    }
  ];

  const faqs = [
    {
      question: 'When should I recommend replacing a working motor with a higher efficiency model?',
      answer: 'Consider proactive replacement when: the motor runs more than 4,000 hours/year, efficiency improvement exceeds 3-4%, electricity costs are high, the motor is over 15 years old, or there are known reliability concerns. Calculate simple payback: if under 2-3 years, replacement is usually justified. For critical applications, keep the old motor as a spare rather than scrapping it. Also consider replacement during planned shutdowns to avoid production losses.'
    },
    {
      question: 'Can any motor be retrofitted with a VSD?',
      answer: 'Not without assessment. Check: insulation class (Class F minimum recommended for inverter duty), winding insulation condition, bearing type (standard bearings may need shaft grounding or ceramic bearings to prevent EDM damage), motor age and condition, cooling method (motors at reduced speeds may need forced ventilation), and whether the motor has inverter-duty rating. Older motors with Class B insulation may experience shortened life due to voltage stress from PWM waveforms.'
    },
    {
      question: 'How do I size a VSD for an existing motor application?',
      answer: 'Size based on motor full load current (FLC), not kW rating. Allow margin for: starting torque requirements (some applications need 150% rated current), continuous operation at low speeds (derate for reduced cooling), altitude and temperature derating, and future expansion. Check VSD output frequency range matches application needs. For heavy-duty cycling or high starting loads, oversize by one frame size.'
    },
    {
      question: 'What causes VSD nuisance tripping and how do I prevent it?',
      answer: 'Common causes: supply voltage dips (adjust DC bus undervoltage trip), earth fault currents (check cable shielding and EMC filters), overcurrent on acceleration (extend ramp time or enable current limit), motor overtemperature (verify cooling at reduced speeds). Solutions include proper EMC installation, correctly rated input fuses/breakers, appropriate parameter settings for the load, and avoiding long motor cables without output filters.'
    },
    {
      question: 'What documentation should I provide after a VSD installation?',
      answer: 'Provide: completed Electrical Installation Certificate, VSD parameter backup (electronic or printed), motor nameplate data and VSD-motor compatibility confirmation, EMC compliance declaration, commissioning records including test results, O&M manual with fault code reference, wiring diagrams showing all connections, and training records for operators. Keep backup of all programmed parameters.'
    },
    {
      question: 'How do harmonics from VSDs affect other equipment?',
      answer: 'Harmonics can cause: overheating in transformers and cables, interference with sensitive equipment, capacitor damage, nuisance tripping of electronic equipment, and metering errors. Mitigation includes: line reactors (3-5% impedance reduces harmonics significantly), active harmonic filters for critical installations, 12-pulse or 18-pulse rectifiers for large drives, proper cable separation and shielding, and consulting with DNO for large installations.'
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-elec-yellow hover:bg-transparent p-2">
            <Link to="/electrician/upskilling/energy-efficiency-module-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-elec-yellow" />
              <span className="text-elec-yellow text-sm font-medium">Module 4 - Section 2</span>
            </div>
            <h1 className="text-lg font-semibold text-white">Motor Efficiency and VSD Retrofitting</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <p className="text-white/90 leading-relaxed">
            Electric motors account for <span className="text-elec-yellow font-semibold">approximately 70% of industrial electricity consumption</span> in the UK.
            Understanding motor efficiency classifications and Variable Speed Drive (VSD) technology enables you to deliver significant
            energy savings for clients whilst ensuring compliance with Ecodesign regulations and BS 7671 requirements.
          </p>
        </div>

        {/* Section 1: Motor Efficiency Classifications */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Motor Efficiency Classifications (IE1-IE5)
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              The International Efficiency (IE) classification system, defined in IEC 60034-30-1, provides a standardised
              method for comparing motor efficiency. Understanding these classes is essential for specifying compliant
              and cost-effective motor replacements.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                IE Efficiency Classes
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white/70">Class</th>
                      <th className="text-left py-2 text-white/70">Name</th>
                      <th className="text-left py-2 text-white/70">Typical 11kW Efficiency</th>
                      <th className="text-left py-2 text-white/70">UK/EU Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-red-400">IE1</td>
                      <td>Standard</td>
                      <td>87.6%</td>
                      <td className="text-red-400">No longer permitted for sale</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-yellow-400">IE2</td>
                      <td>High</td>
                      <td>89.4%</td>
                      <td className="text-yellow-400">Only with VSD</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-green-400">IE3</td>
                      <td>Premium</td>
                      <td>91.0%</td>
                      <td className="text-green-400">Minimum requirement (DOL)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-blue-400">IE4</td>
                      <td>Super Premium</td>
                      <td>92.1%</td>
                      <td className="text-blue-400">Best practice</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-purple-400">IE5</td>
                      <td>Ultra Premium</td>
                      <td>93.0%+</td>
                      <td className="text-purple-400">Emerging technology</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                UK/EU Ecodesign Regulation 2019/1781
              </h4>
              <p className="text-white/80 text-sm mb-3">
                From July 2021, the following requirements apply:
              </p>
              <ul className="text-white/80 text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Motors 0.75kW to 1000kW: <strong className="text-white">IE3 minimum</strong> (or IE2 with VSD)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>From July 2023: Motors 75kW to 200kW: <strong className="text-white">IE4 minimum</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Single-phase motors above 0.12kW now included in scope</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Energy Savings Example: Motor Upgrade
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium mb-2">Scenario</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- 15kW motor, 6000 hours/year operation</li>
                    <li>- 75% average loading</li>
                    <li>- Electricity cost: £0.25/kWh</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium mb-2">Comparison</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- IE2 (89.2% eff): 75,673 kWh/year = £18,918</li>
                    <li>- IE4 (92.6% eff): 72,894 kWh/year = £18,224</li>
                    <li className="text-green-400">- Annual saving: £694 (2,779 kWh)</li>
                  </ul>
                </div>
              </div>
              <p className="text-white/60 text-xs mt-3">
                With premium motor costing ~£400 more, payback is approximately 7 months
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: The Affinity Laws */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Affinity Laws and Variable Torque Loads
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              The affinity laws describe the relationship between speed, flow, pressure, and power for
              centrifugal pumps and fans. These relationships demonstrate why VSDs deliver dramatic
              energy savings on variable torque loads.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                The Three Affinity Laws
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded p-4 text-center">
                  <p className="text-elec-yellow font-bold text-2xl mb-2">Flow proportional to Speed</p>
                  <p className="text-white font-mono text-lg">Q₂/Q₁ = N₂/N₁</p>
                  <p className="text-white/60 text-sm mt-2">80% speed = 80% flow</p>
                </div>
                <div className="bg-white/5 rounded p-4 text-center">
                  <p className="text-elec-yellow font-bold text-2xl mb-2">Pressure proportional to Speed²</p>
                  <p className="text-white font-mono text-lg">H₂/H₁ = (N₂/N₁)²</p>
                  <p className="text-white/60 text-sm mt-2">80% speed = 64% pressure</p>
                </div>
                <div className="bg-white/5 rounded p-4 text-center">
                  <p className="text-elec-yellow font-bold text-2xl mb-2">Power proportional to Speed³</p>
                  <p className="text-white font-mono text-lg">P₂/P₁ = (N₂/N₁)³</p>
                  <p className="text-white/60 text-sm mt-2 text-green-400">80% speed = 51% power</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">The Cube Law Savings Potential</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/70">Speed Reduction</th>
                    <th className="text-center py-2 text-white/70">Flow</th>
                    <th className="text-center py-2 text-white/70">Power</th>
                    <th className="text-center py-2 text-green-400">Energy Saving</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2">10% (90% speed)</td>
                    <td className="text-center">90%</td>
                    <td className="text-center">73%</td>
                    <td className="text-center text-green-400">27%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">20% (80% speed)</td>
                    <td className="text-center">80%</td>
                    <td className="text-center">51%</td>
                    <td className="text-center text-green-400">49%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">30% (70% speed)</td>
                    <td className="text-center">70%</td>
                    <td className="text-center">34%</td>
                    <td className="text-center text-green-400">66%</td>
                  </tr>
                  <tr>
                    <td className="py-2">50% (50% speed)</td>
                    <td className="text-center">50%</td>
                    <td className="text-center">12.5%</td>
                    <td className="text-center text-green-400">87.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Important: Load Type Matters
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-400 font-medium">Variable Torque (Great for VSDs)</p>
                  <ul className="text-white/70 mt-1 space-y-1">
                    <li>- Centrifugal pumps</li>
                    <li>- Centrifugal fans</li>
                    <li>- Centrifugal compressors</li>
                    <li className="text-green-400">Torque varies with speed²</li>
                  </ul>
                </div>
                <div>
                  <p className="text-yellow-400 font-medium">Constant Torque (Limited VSD benefit)</p>
                  <ul className="text-white/70 mt-1 space-y-1">
                    <li>- Conveyors</li>
                    <li>- Positive displacement pumps</li>
                    <li>- Hoists and lifts</li>
                    <li className="text-yellow-400">Power varies linearly with speed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 3: VSD Technology */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            VSD Technology and Operation
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              Variable Speed Drives (also called Variable Frequency Drives, Inverters, or AC Drives) control motor
              speed by varying the frequency and voltage supplied to the motor. Understanding their operation
              is essential for correct specification and installation.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                VSD Operating Principle
              </h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/5 rounded p-3 text-center">
                    <p className="text-blue-400 font-semibold">1. Rectifier</p>
                    <p className="text-white/70 mt-1">Converts AC supply to DC</p>
                    <p className="text-white/50 text-xs mt-1">Typically 6-pulse diode bridge</p>
                  </div>
                  <div className="bg-white/5 rounded p-3 text-center">
                    <p className="text-elec-yellow font-semibold">2. DC Bus</p>
                    <p className="text-white/70 mt-1">Smooths DC with capacitors</p>
                    <p className="text-white/50 text-xs mt-1">Stores energy for dynamic loads</p>
                  </div>
                  <div className="bg-white/5 rounded p-3 text-center">
                    <p className="text-green-400 font-semibold">3. Inverter</p>
                    <p className="text-white/70 mt-1">Creates variable frequency AC</p>
                    <p className="text-white/50 text-xs mt-1">PWM switching with IGBTs</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium mb-2">V/f Control (Constant Flux)</p>
                  <p className="text-white/70 text-sm">
                    Motor speed is proportional to frequency. To maintain constant torque capability, voltage
                    must vary proportionally with frequency (V/f = constant). At 25Hz, voltage is reduced to
                    approximately half of the 50Hz value. Below ~5Hz, additional voltage boost is applied to
                    overcome stator resistance and maintain flux.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Additional VSD Benefits Beyond Energy Savings
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <ul className="text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Soft starting:</strong> Reduced mechanical stress, no starting current spike</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Process control:</strong> Precise speed regulation for quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Extended motor life:</strong> Controlled acceleration/deceleration</span>
                  </li>
                </ul>
                <ul className="text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Power factor:</strong> Near unity at the supply terminals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Protection:</strong> Built-in motor protection features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Diagnostics:</strong> Monitoring and fault logging</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Installation Considerations */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            VSD Installation and EMC Considerations
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              Correct installation of VSDs is critical for reliable operation and compliance with EMC regulations.
              Poor installation can cause interference, nuisance tripping, and premature motor failure.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                EMC Categories and Requirements
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-green-400 font-semibold mb-2">C1 (First Environment - Residential)</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- Lowest emission limits</li>
                    <li>- Requires integral EMC filter</li>
                    <li>- Suitable for: offices, shops, residential</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-yellow-400 font-semibold mb-2">C3 (Second Environment - Industrial)</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- Higher emission limits permitted</li>
                    <li>- Basic filtering may be acceptable</li>
                    <li>- Suitable for: factories, plant rooms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Critical Installation Requirements
              </h3>
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Cable shielding:</strong> Use screened/armoured cable for motor connections, earth screen at both ends</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Cable separation:</strong> Maintain 300mm from control cables, cross at 90° only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Motor cable length:</strong> Check manufacturer limits; may need output filter for long runs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Earthing:</strong> Low impedance earth connections essential for EMC filter operation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Ventilation:</strong> Allow adequate clearance for cooling; derate for high ambient temperatures</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                BS 7671 Considerations for VSD Circuits
              </h4>
              <ul className="text-white/80 text-sm space-y-1">
                <li>- <strong className="text-white">RCD selection:</strong> Type B or Type B+ RCDs may be required due to DC fault currents from rectifier</li>
                <li>- <strong className="text-white">Harmonic currents:</strong> May require cable derating and neutral sizing (harmonics add in neutral)</li>
                <li>- <strong className="text-white">Protective device coordination:</strong> Account for drive's current limiting during overloads</li>
                <li>- <strong className="text-white">EMC filter earth leakage:</strong> Consider cumulative leakage when multiple drives on one RCD</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 5: Motor-VSD Compatibility */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Motor-VSD Compatibility Assessment
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              Not all motors are suitable for VSD operation. Retrofitting a VSD to an unsuitable motor
              can result in overheating, insulation breakdown, and bearing damage.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <RotateCcw className="w-5 h-5" />
                Pre-Installation Assessment Checklist
              </h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium mb-2">Insulation System</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>- Class F minimum recommended (155°C)</li>
                    <li>- Inverter-duty rating preferred (reinforced insulation)</li>
                    <li>- Older Class B motors at higher risk from PWM voltage spikes</li>
                    <li>- Consider dV/dt filter for existing non-inverter-duty motors</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium mb-2">Bearing Protection</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>- PWM switching can cause bearing currents (EDM damage)</li>
                    <li>- Insulated bearings or ceramic bearings for larger motors (&gt;30kW)</li>
                    <li>- Shaft grounding brush as alternative solution</li>
                    <li>- Symmetric cable layout reduces common-mode currents</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium mb-2">Cooling at Low Speed</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>- Fan-cooled motors lose cooling below ~20Hz</li>
                    <li>- Derate or add forced ventilation for continuous low-speed operation</li>
                    <li>- Totally enclosed motors less affected but still derate</li>
                    <li>- Check drive thermal model/motor thermistor protection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Motor Nameplate Information Required</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
                <ul className="space-y-1">
                  <li>- Rated power (kW)</li>
                  <li>- Rated voltage and frequency</li>
                  <li>- Full load current (FLC)</li>
                  <li>- Rated speed (rpm)</li>
                </ul>
                <ul className="space-y-1">
                  <li>- Efficiency class (IE code)</li>
                  <li>- Insulation class (B, F, H)</li>
                  <li>- Duty cycle (S1, S2, etc.)</li>
                  <li>- Inverter duty rating if present</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Energy Savings Calculations */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Energy Savings Calculations
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              Accurate savings calculations are essential for building business cases and verifying
              project outcomes. Consider both direct energy savings and secondary benefits.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Worked Example: Pump VSD Retrofit
              </h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium mb-2">System Data</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
                    <ul className="space-y-1">
                      <li>- 22kW centrifugal pump motor</li>
                      <li>- 6,000 operating hours/year</li>
                      <li>- Currently throttled to 70% flow</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>- Motor efficiency: 91%</li>
                      <li>- Electricity cost: £0.25/kWh</li>
                      <li>- VSD + installation: £3,500</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium mb-2">Calculation</p>
                  <div className="text-sm text-white/70 space-y-2">
                    <p><strong className="text-white">Current consumption:</strong> 22kW / 0.91 x 6,000h = 145,055 kWh/year (£36,264)</p>
                    <p><strong className="text-white">With VSD at 70% speed:</strong> Power = 22kW x 0.7³ / 0.91 x 6,000h = 49,719 kWh/year (£12,430)</p>
                    <p><strong className="text-green-400">Annual saving:</strong> 95,336 kWh = £23,834</p>
                    <p><strong className="text-elec-yellow">Simple payback:</strong> £3,500 / £23,834 = 1.8 months</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3">Factors Affecting Real-World Savings</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium mb-2">Positive Factors</p>
                  <ul className="text-white/70 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Higher electricity prices
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Greater speed variation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      More operating hours
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Larger motor size
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-2">Negative Factors</p>
                  <ul className="text-white/70 space-y-1">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      VSD losses (2-4% typical)
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Static head in pump systems
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Minimum speed requirements
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Constant torque loads
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-r from-elec-yellow/20 to-yellow-600/20 rounded-xl p-6 border border-elec-yellow/30">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Quick Reference Card
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">IE Class Minimum Requirements</h4>
              <table className="w-full text-sm">
                <tbody className="text-white/80">
                  <tr className="border-b border-white/20">
                    <td className="py-1">0.75-1000kW (DOL)</td>
                    <td className="text-right text-green-400">IE3</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">0.75-1000kW (with VSD)</td>
                    <td className="text-right text-yellow-400">IE2</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">75-200kW (from 2023)</td>
                    <td className="text-right text-blue-400">IE4</td>
                  </tr>
                  <tr>
                    <td className="py-1">Single-phase &gt;0.12kW</td>
                    <td className="text-right text-green-400">IE2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Affinity Law Summary</h4>
              <table className="w-full text-sm">
                <tbody className="text-white/80">
                  <tr className="border-b border-white/20">
                    <td className="py-1">Flow</td>
                    <td className="text-right">proportional to speed</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">Pressure</td>
                    <td className="text-right">proportional to speed²</td>
                  </tr>
                  <tr>
                    <td className="py-1">Power</td>
                    <td className="text-right text-green-400">proportional to speed³</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">VSD Installation Checklist</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  Motor insulation Class F minimum
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  Screened motor cable, earthed both ends
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  300mm separation from control cables
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  EMC category appropriate for location
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  Type B RCD if required
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Typical Savings by Application</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  Centrifugal pumps: 30-50%
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  HVAC fans: 40-60%
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Compressors: 15-30%
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Conveyors: 5-15%
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6">
          <h2 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Section Knowledge Check
          </h2>
          <p className="text-white/80 mb-6">
            Test your understanding of motor efficiency and VSD technology with this 10-question quiz.
          </p>
          <Quiz
            questions={quizQuestions}
            onComplete={(score) => {
              console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
            }}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            asChild
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] border-white/20 text-white hover:bg-white/5 hover:text-elec-yellow"
          >
            <Link to="../section-1">
              <ArrowLeft className="w-5 h-5" />
              <span>Previous: Section 1</span>
            </Link>
          </Button>

          <Button
            asChild
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-yellow-500"
          >
            <Link to="../section-3">
              <span>Next: Section 3</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule4Section2;
