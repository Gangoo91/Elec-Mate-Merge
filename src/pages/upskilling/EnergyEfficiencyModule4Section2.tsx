import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Gauge,
  RotateCcw,
  Wrench,
  FileText,
  Shield,
  Activity
} from 'lucide-react';

const EnergyEfficiencyModule4Section2: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Motor Efficiency and VSD Retrofitting | Energy Efficiency Module 4 Section 2 | Elec-Mate',
    description: 'Learn about motor efficiency classes IE1-IE5, Variable Speed Drive retrofitting, affinity laws, and energy savings calculations for UK electrical installations.',
    keywords: 'motor efficiency, VSD, variable speed drive, IE1, IE2, IE3, IE4, IE5, affinity laws, energy savings, EMC, harmonics, UK regulations, Ecodesign'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'Under current UK/EU Ecodesign regulations, what is the minimum efficiency class required for new three-phase motors between 0.75kW and 1000kW?',
      options: ['IE1 Standard Efficiency', 'IE2 High Efficiency', 'IE3 Premium Efficiency', 'IE4 Super Premium Efficiency'],
      correctIndex: 2,
      explanation: 'Since July 2021, all new three-phase motors from 0.75kW to 1000kW must meet IE3 (Premium Efficiency) requirements under EU Ecodesign Regulation 2019/1781. Motors below 0.12kW and certain specialist applications are exempt.'
    },
    {
      id: 'qc2',
      question: 'According to the affinity laws, if a pump motor speed is reduced from 100% to 80%, what is the approximate power consumption?',
      options: ['80% of original power', '64% of original power', '51% of original power', '20% of original power'],
      correctIndex: 2,
      explanation: 'The affinity laws state that power varies with the cube of speed. At 80% speed: 0.8³ = 0.512 or approximately 51% of original power. This demonstrates the significant energy savings possible with VSDs on variable torque loads like pumps and fans.'
    },
    {
      id: 'qc3',
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
      question: 'A motor operates 6000 hours per year. At what electricity cost does replacing an IE2 motor with an IE3 become cost-effective within 2 years if the efficiency improvement saves 500W?',
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
      question: 'For EMC compliance, what is the maximum recommended cable length between VSD and motor without additional filtering?',
      options: ['5 metres', '25-50 metres typically', '200 metres', 'No limit applies'],
      correctAnswer: '25-50 metres typically'
    },
    {
      question: 'What parameter should be verified during VSD commissioning to prevent motor overheating?',
      options: ['Office temperature', 'Motor nameplate current and thermal settings', 'Cable colour coding', 'Switch room humidity'],
      correctAnswer: 'Motor nameplate current and thermal settings'
    }
  ];

  const faqs = [
    {
      question: 'Can any motor be retrofitted with a VSD?',
      answer: 'Not all motors are suitable for VSD operation. Key considerations include: 1) Insulation class - older motors (pre-2000) may have Class B insulation unsuitable for PWM waveforms without filtering. 2) Cooling - motors with shaft-mounted fans lose cooling at low speeds; consider force-ventilated designs. 3) Bearings - VSD operation can cause bearing currents; insulated bearings or shaft grounding may be needed. 4) Minimum speed - many motors should not operate below 10-20% speed continuously. Always consult motor datasheets and consider a motor survey before retrofit.'
    },
    {
      question: 'What are the payback periods for motor efficiency upgrades?',
      answer: 'Payback periods vary significantly based on operating hours, load profile, and energy costs. Typical examples: 1) Replacing an IE1 with IE3 motor running 6000+ hours/year at high load: 1-3 years payback. 2) VSD retrofit on a throttled pump: often under 2 years payback. 3) VSD on already-efficient constant speed application: may never pay back. Key factors are annual running hours, percentage load, energy price, and whether variable flow/speed is actually required. A detailed energy audit with current measurements is essential before investment.'
    },
    {
      question: 'How do I determine the correct VSD size for a motor?',
      answer: 'VSD sizing depends on several factors: 1) Motor full load current (FLC) - the VSD continuous current rating must exceed motor FLC. 2) Starting requirements - if high starting torque needed, oversize by 1-2 frames. 3) Duty cycle - for frequent starts/stops or high inertia loads, increase rating. 4) Ambient temperature - derate if above 40°C typically. 5) Altitude - derate above 1000m. 6) Load type - constant torque loads may need larger VSDs than variable torque. General rule: size VSD to motor nameplate current plus 10-20% margin, and verify with manufacturer selection software.'
    },
    {
      question: 'What EMC measures are required for VSD installations in the UK?',
      answer: 'UK installations must comply with the EMC Regulations 2016. Practical measures include: 1) Shielded motor cables with 360° gland terminations. 2) Separate power and control cables by minimum 200mm. 3) Ferrite cores or line reactors on input and output. 4) Internal or external EMC filters matched to cable length. 5) Proper PE bonding with high-frequency connections. 6) Maximum recommended cable lengths (typically 25-50m unfiltered). 7) Star-point earthing for filters. The VSD manufacturer\'s EMC installation guidelines must be followed to maintain CE marking compliance.'
    },
    {
      question: 'When should motors be repaired versus replaced?',
      answer: 'The repair vs replace decision depends on: 1) Motor age and efficiency class - if IE1 or older, replacement likely better. 2) Repair cost - if exceeds 50-65% of new IE3 motor cost, replace. 3) Operating hours - high usage favours replacement with higher efficiency. 4) Number of previous rewinds - each rewind typically reduces efficiency by 1-2%. 5) Criticality - for essential plant, new motor with warranty may be preferred. 6) Availability - specialist motors may require repair due to lead times. EASA (Electrical Apparatus Service Association) guidelines and the Motor MEPS Calculator can help quantify the decision.'
    },
    {
      question: 'What are the main causes of VSD failure and how can they be prevented?',
      answer: 'Common VSD failure modes and prevention: 1) Capacitor degradation - ensure adequate ventilation, keep ambient below 40°C, scheduled replacement at 5-7 years. 2) Cooling fan failure - preventive maintenance, monitor for unusual noise. 3) Power device failure - correct sizing, avoid repeated overloads, use input reactors. 4) Control board issues - prevent contamination, maintain clean environment. 5) Earth faults - proper cable installation, insulation testing. 6) Overvoltage damage - install surge protection on exposed supplies. Regular inspection, thermal imaging, and trend monitoring of VSD parameters significantly extend service life.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <Gauge className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-elec-yellow text-sm font-medium">Module 4 • Section 2</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Motor Efficiency and VSD Retrofitting
          </h1>
          <p className="text-gray-400">
            Understanding motor efficiency classes, Variable Speed Drives, and practical retrofit guidance for UK installations
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1: Motor Efficiency Classes */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">
              1
            </div>
            <h2 className="text-xl font-semibold text-white">Motor Efficiency Classes (IE1-IE5) and UK Regulations</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The International Efficiency (IE) classification system, defined by IEC 60034-30-1, provides a
              standardised framework for comparing motor efficiency across manufacturers and regions. Understanding
              these classes is essential for compliance with UK and EU regulations.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                IE Efficiency Classes Explained
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm font-mono">IE1</span>
                  <div>
                    <span className="font-medium text-white">Standard Efficiency</span>
                    <p className="text-sm text-gray-400">Baseline level, no longer permitted for new installations in EU/UK</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-sm font-mono">IE2</span>
                  <div>
                    <span className="font-medium text-white">High Efficiency</span>
                    <p className="text-sm text-gray-400">Previously minimum standard, now only for VSD-operated motors in certain ranges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm font-mono">IE3</span>
                  <div>
                    <span className="font-medium text-white">Premium Efficiency</span>
                    <p className="text-sm text-gray-400">Current minimum for most three-phase motors 0.75kW-1000kW since July 2021</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm font-mono">IE4</span>
                  <div>
                    <span className="font-medium text-white">Super Premium Efficiency</span>
                    <p className="text-sm text-gray-400">Required for motors 75kW-200kW from July 2023 under Ecodesign</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-sm font-mono">IE5</span>
                  <div>
                    <span className="font-medium text-white">Ultra Premium Efficiency</span>
                    <p className="text-sm text-gray-400">Highest class, typically requires permanent magnet or synchronous reluctance technology</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                EU Ecodesign Regulation 2019/1781 Requirements
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>July 2021:</strong> IE3 minimum for 0.75kW to 1000kW three-phase motors</li>
                <li><strong>July 2023:</strong> IE4 minimum for 75kW to 200kW motors (2, 4, 6, or 8 poles)</li>
                <li><strong>July 2023:</strong> IE3 minimum extended to 0.12kW and single-phase motors ≥0.75kW</li>
                <li>Exemptions include: brake motors, hazardous atmospheres, submersible, and high-temperature applications</li>
              </ul>
            </div>

            <p>
              <strong className="text-white">Practical Impact:</strong> When specifying replacement motors, always
              verify current regulatory requirements. Motors manufactured before regulation dates may be
              installed from stock, but new orders must meet current Ecodesign standards. Specify IE class
              explicitly in procurement documents.
            </p>
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

        {/* Section 2: Repair vs Replace */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">
              2
            </div>
            <h2 className="text-xl font-semibold text-white">When to Repair vs Replace Motors</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The decision to repair or replace a failed motor significantly impacts long-term energy costs
              and operational reliability. A systematic approach using lifecycle cost analysis ensures
              optimal decisions.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Consider Replacement When:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Motor is IE1 class or older (manufactured pre-2011)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Operating hours exceed 4000 hours/year
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Repair cost exceeds 50-65% of new IE3 motor
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Motor has been rewound more than once
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Application would benefit from VSD control
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Energy costs are high or carbon reduction targets apply
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Consider Repair When:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Motor is already IE3 or higher efficiency
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Operating hours are low (&lt;2000 hours/year)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Specialist motor with long lead time for replacement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    First failure with no previous rewinds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    EASA-accredited repairer using good practice methods
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Application is critical and immediate availability required
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Lifecycle Cost Calculation Example
              </h3>
              <div className="font-mono text-sm bg-[#2d2d2d] rounded p-3 overflow-x-auto">
                <p className="text-gray-400">// 15kW motor, 6000 hours/year, £0.30/kWh</p>
                <p className="text-gray-400">// IE2 (90.4% efficient) vs IE3 (91.8% efficient)</p>
                <br />
                <p><span className="text-blue-400">IE2 annual cost:</span> 15kW ÷ 0.904 × 6000h × £0.30 = <span className="text-red-400">£29,867</span></p>
                <p><span className="text-blue-400">IE3 annual cost:</span> 15kW ÷ 0.918 × 6000h × £0.30 = <span className="text-green-400">£29,412</span></p>
                <p><span className="text-blue-400">Annual saving:</span> £455/year</p>
                <br />
                <p className="text-gray-400">// If IE3 motor costs £800 more than rewind:</p>
                <p><span className="text-elec-yellow">Simple payback:</span> £800 ÷ £455 = <span className="text-green-400">1.76 years</span></p>
              </div>
            </div>

            <p>
              <strong className="text-white">Rewind Quality Considerations:</strong> A poorly executed rewind
              can reduce motor efficiency by 2-5%, while EASA best practice methods maintain original
              efficiency. Always use repairers who can demonstrate controlled core temperatures during
              burnout (&lt;350°C) and systematic testing procedures.
            </p>
          </div>
        </section>

        {/* Section 3: VSD Principles and Benefits */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">
              3
            </div>
            <h2 className="text-xl font-semibold text-white">Variable Speed Drive (VSD) Principles and Benefits</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Variable Speed Drives (also called Variable Frequency Drives or Inverters) control AC motor
              speed by varying the frequency and voltage supplied. This enables precise process control
              and substantial energy savings on variable load applications.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                VSD Operating Principle
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg text-center min-w-[100px]">
                    <span className="text-blue-400 font-semibold">Rectifier</span>
                    <p className="text-xs text-gray-400 mt-1">AC → DC</p>
                  </div>
                  <ChevronRight className="text-gray-500" />
                  <div className="bg-green-500/20 p-3 rounded-lg text-center min-w-[100px]">
                    <span className="text-green-400 font-semibold">DC Bus</span>
                    <p className="text-xs text-gray-400 mt-1">Capacitor smoothing</p>
                  </div>
                  <ChevronRight className="text-gray-500" />
                  <div className="bg-purple-500/20 p-3 rounded-lg text-center min-w-[100px]">
                    <span className="text-purple-400 font-semibold">Inverter</span>
                    <p className="text-xs text-gray-400 mt-1">DC → Variable AC</p>
                  </div>
                </div>
                <p className="text-sm">
                  The rectifier converts AC supply to DC, capacitors smooth the DC bus voltage, and the
                  IGBT inverter creates a Pulse Width Modulated (PWM) output that simulates variable
                  frequency AC. The motor speed is directly proportional to output frequency.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Energy Saving Benefits</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Eliminate throttling/damper losses</li>
                  <li>• Match output precisely to demand</li>
                  <li>• Reduce peak demand charges</li>
                  <li>• Extend motor and mechanical life</li>
                  <li>• Typical 30-50% energy reduction on pumps/fans</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Process Control Benefits</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Precise speed and torque control</li>
                  <li>• Soft starting reduces mechanical stress</li>
                  <li>• PID control for closed-loop operation</li>
                  <li>• Multiple preset speeds available</li>
                  <li>• Dynamic braking capability</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">V/f Control vs Vector Control</h4>
              <p className="text-sm mb-2">
                <strong>V/f (Scalar) Control:</strong> Maintains constant voltage/frequency ratio. Simple,
                suitable for pumps, fans, and applications not requiring high torque at low speed. Most
                common for energy-saving retrofits.
              </p>
              <p className="text-sm">
                <strong>Vector (Field Oriented) Control:</strong> Provides independent control of torque and
                flux, enabling full torque at zero speed. Required for cranes, hoists, and high-performance
                positioning applications. Requires motor parameter tuning.
              </p>
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

        {/* Section 4: Affinity Laws */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">
              4
            </div>
            <h2 className="text-xl font-semibold text-white">Affinity Laws and Energy Savings Calculations</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The affinity laws (also called fan/pump laws) describe the mathematical relationships between
              speed, flow, pressure, and power for centrifugal equipment. These fundamental principles
              explain why VSDs achieve dramatic energy savings on variable torque loads.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                The Three Affinity Laws
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#2d2d2d] rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">Q ∝ N</div>
                  <p className="text-sm text-gray-400">Flow varies linearly with speed</p>
                  <p className="text-xs mt-2">Q₂/Q₁ = N₂/N₁</p>
                </div>
                <div className="bg-[#2d2d2d] rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">H ∝ N²</div>
                  <p className="text-sm text-gray-400">Head/pressure varies with speed squared</p>
                  <p className="text-xs mt-2">H₂/H₁ = (N₂/N₁)²</p>
                </div>
                <div className="bg-[#2d2d2d] rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">P ∝ N³</div>
                  <p className="text-sm text-gray-400">Power varies with speed cubed</p>
                  <p className="text-xs mt-2">P₂/P₁ = (N₂/N₁)³</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Energy Savings Calculation Example
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-400">
                  A 30kW pump motor currently runs at full speed with a throttle valve controlling flow to 70%
                  of maximum. Calculate savings with VSD control:
                </p>
                <div className="font-mono bg-[#2d2d2d] rounded p-3 space-y-2">
                  <p><span className="text-blue-400">Current state:</span> Valve throttling, motor at 100% speed</p>
                  <p><span className="text-blue-400">Power consumed:</span> ~30kW (throttle wastes energy)</p>
                  <br />
                  <p><span className="text-green-400">With VSD at 70% speed:</span></p>
                  <p>Power = 30kW × (0.70)³</p>
                  <p>Power = 30kW × 0.343</p>
                  <p>Power = <span className="text-elec-yellow">10.3kW</span></p>
                  <br />
                  <p><span className="text-red-400">Saving:</span> 30kW - 10.3kW = 19.7kW (65.7%)</p>
                  <p><span className="text-gray-400">// At 6000 hours/year, £0.30/kWh:</span></p>
                  <p><span className="text-green-400">Annual saving:</span> 19.7kW × 6000h × £0.30 = <span className="text-elec-yellow">£35,460/year</span></p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Important Limitations
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• Affinity laws apply to <strong>centrifugal</strong> equipment (pumps, fans, compressors) only</li>
                <li>• Systems with high static head show reduced savings potential</li>
                <li>• Minimum speeds may be limited by motor cooling or process requirements</li>
                <li>• Constant torque loads (conveyors, mixers) follow different rules - power ∝ speed</li>
                <li>• VSD losses (typically 2-4%) must be factored into net savings</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: VSD Installation Requirements */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">
              5
            </div>
            <h2 className="text-xl font-semibold text-white">VSD Installation Requirements and EMC Considerations</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Proper VSD installation is critical for reliable operation, electromagnetic compatibility (EMC),
              and maintaining compliance with UK regulations. Poor installation practices cause the majority
              of VSD-related problems.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Essential Installation Requirements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Supply Side</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Dedicated supply circuit recommended</li>
                    <li>• Line reactor (3-5% impedance) for harmonic reduction</li>
                    <li>• Surge protection device (SPD) on exposed supplies</li>
                    <li>• Type B RCD if RCD protection required (BS 7671)</li>
                    <li>• Correct cable sizing for non-sinusoidal currents</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Motor Side</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Screened/armoured cable with 360° gland termination</li>
                    <li>• Maximum cable length per manufacturer guidelines</li>
                    <li>• dV/dt filter or output reactor for long runs (&gt;50m)</li>
                    <li>• Motor thermistor connection for thermal protection</li>
                    <li>• Verify motor is inverter-rated or install sinewave filter</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                EMC Compliance Requirements
              </h3>
              <p className="text-sm mb-3">
                The Electromagnetic Compatibility Regulations 2016 require all electrical equipment to not
                cause interference and to be immune to expected interference. VSDs require careful
                installation to achieve EMC compliance:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="text-blue-400 font-medium mb-2">Conducted Emissions Control</h4>
                  <ul className="space-y-1">
                    <li>• Internal or external EMC filter matched to cable length</li>
                    <li>• Input line reactor reduces harmonic currents</li>
                    <li>• Filter earthed with short, low-inductance connection</li>
                    <li>• Separate PE conductor for filter if required</li>
                  </ul>
                </div>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="text-green-400 font-medium mb-2">Radiated Emissions Control</h4>
                  <ul className="space-y-1">
                    <li>• Screened motor cable with full 360° termination</li>
                    <li>• Metal glands or EMC glands, not plastic</li>
                    <li>• Cable screen bonded at both VSD and motor ends</li>
                    <li>• Minimum 200mm separation from signal cables</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Harmonic Distortion</h4>
              <p className="text-sm mb-2">
                Standard 6-pulse VSDs produce characteristic harmonics at the 5th, 7th, 11th, 13th orders
                etc. (6n±1 rule). High harmonic levels can cause:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Transformer and cable overheating</li>
                <li>Capacitor failures and nuisance tripping</li>
                <li>Interference with sensitive equipment</li>
                <li>Neutral conductor overload in three-phase systems</li>
              </ul>
              <p className="text-sm mt-2">
                <strong>Mitigation:</strong> Line reactors (3-5% impedance), active front end (AFE) drives,
                12-pulse or 18-pulse configurations for large installations, or active harmonic filters.
              </p>
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

        {/* Section 6: Commissioning and Optimisation */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">
              6
            </div>
            <h2 className="text-xl font-semibold text-white">Commissioning and Optimisation of Motor Systems</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Systematic commissioning ensures VSD systems operate safely and efficiently. Poor commissioning
              is a common cause of motor damage, nuisance tripping, and underperformance.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Pre-Commissioning Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Verify supply voltage matches VSD rating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Check motor nameplate data (kW, V, A, Hz, RPM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Confirm motor insulation resistance (&gt;1MΩ at 500V DC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Verify all cable terminations are tight</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Check earth continuity including cable screens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Confirm motor rotation direction before coupling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Review protective device settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Check mechanical freedom of driven equipment</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Key Parameter Settings
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-[#2d2d2d] rounded p-3">
                  <span className="text-blue-400 font-medium">Motor Parameters:</span>
                  <p className="text-gray-400 mt-1">Enter exact nameplate values - rated voltage, current, frequency,
                  power, RPM, and cos φ. Run auto-tune if available to measure motor characteristics.</p>
                </div>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <span className="text-green-400 font-medium">Acceleration/Deceleration Times:</span>
                  <p className="text-gray-400 mt-1">Set appropriate ramp times based on load inertia. Too fast
                  causes overcurrent trips; too slow wastes energy. Typical starting point: 5-15 seconds.</p>
                </div>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <span className="text-purple-400 font-medium">Current Limits:</span>
                  <p className="text-gray-400 mt-1">Set motor thermal protection current to nameplate FLA.
                  Configure current limit typically 110-150% for normal starting.</p>
                </div>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <span className="text-orange-400 font-medium">Min/Max Frequency:</span>
                  <p className="text-gray-400 mt-1">Set minimum frequency based on motor cooling requirements
                  (typically 10-20Hz for TEFC motors). Maximum usually 50Hz unless designed for higher speed.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Optimisation Opportunities</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Sleep Mode:</strong> Configure VSD to stop motor when demand is zero, restart on demand signal</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>PID Tuning:</strong> Optimise closed-loop control for stable operation without hunting</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Energy Optimisation:</strong> Enable flux optimisation mode for variable torque loads</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Flying Start:</strong> Enable for applications where motor may be spinning when restarted</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Reference Card
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">Motor Efficiency Classes</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><span className="text-red-400 font-mono">IE1</span> - Standard (no longer compliant)</li>
                <li><span className="text-orange-400 font-mono">IE2</span> - High (VSD use only for some ranges)</li>
                <li><span className="text-green-400 font-mono">IE3</span> - Premium (current minimum standard)</li>
                <li><span className="text-blue-400 font-mono">IE4</span> - Super Premium (75-200kW from 2023)</li>
                <li><span className="text-purple-400 font-mono">IE5</span> - Ultra Premium (emerging tech)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Affinity Laws Summary</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>Flow (Q) ∝ Speed (N)</li>
                <li>Pressure (H) ∝ Speed² (N²)</li>
                <li className="text-elec-yellow font-semibold">Power (P) ∝ Speed³ (N³)</li>
                <li className="text-gray-400 mt-2">80% speed = 51% power</li>
                <li className="text-gray-400">50% speed = 12.5% power</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">VSD Harmonics (6-pulse)</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>5th harmonic (250Hz) - largest magnitude</li>
                <li>7th harmonic (350Hz)</li>
                <li>11th, 13th harmonics</li>
                <li className="text-gray-400 mt-2">Rule: h = 6n ± 1</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">EMC Essentials</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Screened motor cable required</li>
                <li>• 360° gland termination</li>
                <li>• Max ~50m without output filter</li>
                <li>• 200mm min from signal cables</li>
                <li>• EMC filter sized to cable length</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-elec-yellow/30">
            <h3 className="text-white font-semibold mb-2">Repair vs Replace Rule of Thumb</h3>
            <p className="text-sm text-gray-300">
              If repair cost &gt; 50-65% of new IE3 motor AND operating hours &gt; 4000/year → <span className="text-green-400 font-semibold">REPLACE</span>
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#2d2d2d] transition-colors min-h-[44px] touch-manipulation"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="p-4 bg-[#2d2d2d] text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Section Quiz</h2>
          {!showQuiz ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">
                Test your understanding of motor efficiency and VSD retrofitting concepts.
              </p>
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 min-h-[44px] px-6 touch-manipulation"
              >
                Start Quiz (10 Questions)
              </Button>
            </div>
          ) : (
            <Quiz
              questions={quizQuestions}
              onComplete={(score) => {
                console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
              }}
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-4/section-1')}
            variant="outline"
            className="flex items-center justify-center gap-2 bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:text-elec-yellow min-h-[44px] touch-manipulation"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous: Section 1 - Energy Auditing Fundamentals
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-4/section-3')}
            className="flex items-center justify-center gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
          >
            Next: Section 3 - Lighting and Building Management
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule4Section2;
