import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Activity,
  Gauge,
  Calculator,
  PoundSterling,
  Triangle,
  Building2,
  Lightbulb,
  AlertTriangle,
  BookOpen
} from 'lucide-react';

const EnergyEfficiencyModule2Section3: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'kW vs kVA vs kWh Explained | Energy Efficiency Module 2 Section 3 | Elec-Mate',
    description: 'Understand the differences between kW (real power), kVA (apparent power), and kWh (energy consumption). Learn about power factor, the power triangle, and UK billing implications for electricians.',
    keywords: [
      'kW vs kVA',
      'kilowatt vs kilovolt-ampere',
      'kWh explained',
      'power factor',
      'reactive power kVAr',
      'power triangle',
      'apparent power',
      'real power',
      'energy billing UK',
      'DNO power requirements',
      'electrical power calculations'
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-2/section-3'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-kw-kva-kwh',
      question: 'A motor draws 10 kVA from the supply but only produces 8 kW of useful work. What is the power factor?',
      options: ['0.6', '0.8', '1.0', '1.25'],
      correctIndex: 1,
      explanation: 'Power Factor = kW ÷ kVA = 8 ÷ 10 = 0.8. This means 80% of the apparent power is converted to useful work, while 20% is reactive power circulating in the system.'
    },
    {
      id: 'qc2-kw-kva-kwh',
      question: 'A 3 kW heater runs for 5 hours. How many kWh of energy does it consume?',
      options: ['0.6 kWh', '3 kWh', '8 kWh', '15 kWh'],
      correctIndex: 3,
      explanation: 'Energy (kWh) = Power (kW) × Time (hours) = 3 kW × 5 h = 15 kWh. This is the actual energy consumed and what you would be billed for on a domestic tariff.'
    },
    {
      id: 'qc3-kw-kva-kwh',
      question: 'Why do DNOs size transformers and cables based on kVA rather than kW?',
      options: [
        'kVA is easier to calculate',
        'kVA represents the total current flow that heats conductors',
        'kW is only used for DC circuits',
        'DNOs do not consider power factor'
      ],
      correctIndex: 1,
      explanation: 'DNOs use kVA because it represents the total current flowing through their equipment. Even reactive current (which does no useful work) still heats cables and transformers, so equipment must be sized for the full apparent power (kVA).'
    }
  ];

  const quizQuestions = [
    {
      question: 'What does kW (kilowatt) measure?',
      options: [
        'The total power drawn from the supply',
        'The real power that performs useful work',
        'The energy consumed over time',
        'The reactive power in the circuit'
      ],
      correctAnswer: 'The real power that performs useful work'
    },
    {
      question: 'A circuit has 12 kVA apparent power and 9 kW real power. What is the reactive power (kVAr)?',
      options: ['3 kVAr', '7.94 kVAr', '21 kVAr', '15 kVAr'],
      correctAnswer: '7.94 kVAr'
    },
    {
      question: 'What is the unit of energy consumption that appears on electricity bills?',
      options: ['kW', 'kVA', 'kWh', 'kVAr'],
      correctAnswer: 'kWh'
    },
    {
      question: 'In the power triangle, which side represents apparent power (kVA)?',
      options: ['The adjacent side (horizontal)', 'The opposite side (vertical)', 'The hypotenuse', 'It is not shown on the triangle'],
      correctAnswer: 'The hypotenuse'
    },
    {
      question: 'A facility has a power factor of 0.7. What does this indicate?',
      options: [
        '70% of apparent power is doing useful work',
        'The supply voltage is 70% of nominal',
        'Energy consumption is 70% efficient',
        'The equipment is 70% loaded'
      ],
      correctAnswer: '70% of apparent power is doing useful work'
    },
    {
      question: 'Why might a commercial customer face power factor surcharges from their supplier?',
      options: [
        'They are using too much energy',
        'Their low power factor increases current flow and network losses',
        'Power factor surcharges are mandatory for all businesses',
        'They have too many resistive loads'
      ],
      correctAnswer: 'Their low power factor increases current flow and network losses'
    },
    {
      question: 'Which type of load typically has a power factor close to 1.0?',
      options: [
        'Induction motors',
        'Fluorescent lighting with magnetic ballasts',
        'Resistive heaters and incandescent lamps',
        'Air conditioning compressors'
      ],
      correctAnswer: 'Resistive heaters and incandescent lamps'
    },
    {
      question: 'A 50 kVA transformer operates at 0.85 power factor. What is the maximum kW load it can supply?',
      options: ['50 kW', '42.5 kW', '58.8 kW', '85 kW'],
      correctAnswer: '42.5 kW'
    },
    {
      question: 'What happens to the current drawn when power factor decreases (for the same kW load)?',
      options: [
        'Current decreases',
        'Current stays the same',
        'Current increases',
        'Current becomes DC'
      ],
      correctAnswer: 'Current increases'
    },
    {
      question: 'Power factor correction capacitors work by:',
      options: [
        'Reducing the real power consumed',
        'Increasing the supply voltage',
        'Supplying reactive power locally to reduce current from the supply',
        'Converting AC to DC'
      ],
      correctAnswer: 'Supplying reactive power locally to reduce current from the supply'
    }
  ];

  const faqs = [
    {
      question: 'Why is my generator rated in kVA but my appliances rated in kW?',
      answer: 'Generators are rated in kVA because they must supply the total current demanded, regardless of power factor. The actual kW they can deliver depends on the connected load\'s power factor. For example, a 10 kVA generator with loads at 0.8 power factor can only deliver 8 kW of real power. Appliances are rated in kW because this shows the actual power consumption/output. When sizing a generator, always consider the power factor of your loads - a common rule is to assume 0.8 PF if unknown, so a 10 kVA generator provides roughly 8 kW.'
    },
    {
      question: 'Do domestic customers pay for kVA or kWh?',
      answer: 'Domestic customers in the UK pay for kWh (energy consumed) only. The electricity meter measures real energy consumption, not apparent power. However, poor power factor still affects the wider network. Commercial and industrial customers with maximum demand metering may face kVA-based charges or power factor penalties if their power factor falls below a threshold (typically 0.95 or 0.9). This is why power factor correction is mainly a commercial/industrial concern.'
    },
    {
      question: 'What causes poor power factor in buildings?',
      answer: 'Poor power factor is primarily caused by inductive loads that require reactive power to create magnetic fields. Common culprits include: induction motors (lifts, pumps, HVAC), older fluorescent lighting with magnetic ballasts, welding equipment, and transformers operating at light load. Modern switch-mode power supplies in computers and LED drivers can also introduce power factor issues, though they tend to cause leading (capacitive) rather than lagging power factor. Buildings with many motors and little resistive load often have power factors around 0.7-0.85.'
    },
    {
      question: 'How do I calculate the required capacitor size for power factor correction?',
      answer: 'To calculate capacitor kVAr needed: 1) Find current kW and power factor, 2) Calculate current kVAr using the power triangle (kVAr = kW × tan(cos⁻¹(PF))), 3) Calculate target kVAr at desired power factor, 4) The difference is the capacitor size needed. For example: 100 kW at 0.75 PF needs correction to 0.95 PF. Current kVAr = 100 × tan(41.4°) = 88.2 kVAr. Target kVAr = 100 × tan(18.2°) = 32.9 kVAr. Capacitor needed = 88.2 - 32.9 = 55.3 kVAr. Always consult with specialists as oversized capacitors can cause leading power factor and resonance issues.'
    },
    {
      question: 'Why do DNOs have maximum kVA limits on supplies?',
      answer: 'DNOs set kVA limits because their infrastructure (cables, transformers, switchgear) must carry the full apparent current, not just the real power component. A customer drawing 100 kVA at 0.7 power factor requires the same cable size as one drawing 100 kVA at unity power factor, even though the first only uses 70 kW of real power. Additionally, reactive power flow causes voltage drops and increases network losses. The kVA limit ensures the local network can safely supply the customer without affecting neighbouring properties or requiring costly infrastructure upgrades.'
    },
    {
      question: 'What is the difference between lagging and leading power factor?',
      answer: 'Lagging power factor occurs when current lags behind voltage, caused by inductive loads (motors, transformers, magnetic ballasts). This is the most common type in industrial settings. Leading power factor occurs when current leads voltage, caused by capacitive loads or over-compensation with power factor correction capacitors. Most power systems naturally have lagging power factor. While correcting to unity (1.0) is ideal, slight leading power factor can cause voltage rise issues and potential resonance. This is why power factor correction systems often target 0.95-0.98 rather than exactly 1.0.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-700 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Energy Efficiency</span>
            <ChevronRight className="w-4 h-4" />
            <span>Module 2</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-elec-yellow">Section 3</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow flex items-center gap-3">
            <Zap className="w-8 h-8" />
            kW vs kVA vs kWh Explained
          </h1>
          <p className="text-gray-300 mt-2">
            Understanding real power, apparent power, and energy consumption
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <p className="text-gray-300 leading-relaxed">
            One of the most confusing aspects of electrical power for many electricians is understanding
            the difference between <strong className="text-elec-yellow">kW</strong>, <strong className="text-elec-yellow">kVA</strong>,
            and <strong className="text-elec-yellow">kWh</strong>. These aren't just different ways of saying the same thing -
            they measure fundamentally different quantities. Getting them confused can lead to undersized
            cables, tripped breakers, and unhappy customers. Let's break down exactly what each one means
            and why they all matter.
          </p>
        </section>

        {/* Section 1: Real Power (kW) */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <Lightbulb className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">1. Real Power (kW) - What Actually Does Work</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Real power</strong>, measured in <strong className="text-elec-yellow">kilowatts (kW)</strong>,
              is the power that actually performs useful work. It's what heats your kettle, turns your motor shaft,
              and lights up your bulbs. This is the "working" power.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">🚰 The Water Pipe Analogy</h4>
              <p>
                Think of real power as the water that actually comes out of your tap and fills your glass.
                It's the useful output you're paying for and the work being accomplished. If you're watering
                the garden, real power is the water hitting the plants.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Measured By</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Wattmeters</li>
                  <li>• kWh meters (over time)</li>
                  <li>• Power analysers</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Examples</h4>
                <ul className="space-y-1 text-sm">
                  <li>• 3 kW immersion heater</li>
                  <li>• 2.2 kW motor shaft output</li>
                  <li>• 0.1 kW LED lighting</li>
                </ul>
              </div>
            </div>

            <p>
              For purely <strong className="text-white">resistive loads</strong> (heaters, incandescent bulbs, kettles),
              real power equals apparent power - all the power drawn is converted to useful work (as heat or light).
              The power factor is 1.0 or "unity".
            </p>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-200">
                <strong>Formula:</strong> Real Power (P) = V × I × cos(φ) = V × I × PF
                <br />
                <span className="text-sm">Where φ is the phase angle between voltage and current, and PF is power factor</span>
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Apparent Power (kVA) */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <Gauge className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">2. Apparent Power (kVA) - Total Power Drawn from Supply</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Apparent power</strong>, measured in <strong className="text-elec-yellow">kilovolt-amperes (kVA)</strong>,
              is the total power drawn from the electrical supply. It's the product of voltage and current,
              regardless of whether that power does useful work. This is what your cables and transformers
              must be sized to handle.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">🚰 Continuing the Water Analogy</h4>
              <p>
                Apparent power is like the total water flowing through the pipe - including any water that
                sloshes back and forth without leaving the tap. The pipe must be big enough to handle all
                this flow, even if some of it doesn't reach your glass. That's why we size pipes (cables)
                for total flow (kVA), not just useful output (kW).
              </p>
            </div>

            <p>
              <strong className="text-white">Why does kVA differ from kW?</strong> In AC circuits with motors,
              transformers, and other inductive or capacitive loads, the current and voltage get out of sync
              (out of phase). The result is that more current flows than strictly necessary to deliver the
              useful power. This extra current does no useful work but still heats your cables!
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Sized in kVA</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Transformers</li>
                  <li>• Generators</li>
                  <li>• UPS systems</li>
                  <li>• Cable ratings</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Key Point</h4>
                <p className="text-sm">
                  kVA is always equal to or greater than kW. They're only equal when power factor = 1.0
                  (purely resistive loads).
                </p>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-200">
                <strong>Formula:</strong> Apparent Power (S) = V × I
                <br />
                <span className="text-sm">Simply voltage times current - no power factor involved</span>
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

        {/* Section 3: Reactive Power and Power Factor */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">3. Reactive Power (kVAr) and Power Factor</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Reactive power</strong>, measured in <strong className="text-elec-yellow">kilovolt-amperes reactive (kVAr)</strong>,
              is the "wasted" power that oscillates between the source and load, doing no useful work.
              It's essential for creating magnetic fields in motors and transformers, but it doesn't
              turn shafts or produce heat.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">🍺 The Beer Analogy</h4>
              <p>
                Imagine pouring a pint of beer. The liquid beer is your real power (kW) - it's what you
                actually drink. The frothy head is your reactive power (kVAr) - it takes up space in the
                glass but doesn't quench your thirst. The total volume (liquid + head) is your apparent
                power (kVA). A good pour has minimal head; a good electrical system has minimal reactive power!
              </p>
            </div>

            <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
              <h4 className="font-semibold text-amber-200 mb-2">⚡ Power Factor Explained</h4>
              <p className="text-amber-100">
                <strong>Power Factor (PF) = kW ÷ kVA</strong>
                <br /><br />
                Power factor tells you what proportion of apparent power is doing useful work.
                It ranges from 0 to 1:
              </p>
              <ul className="mt-2 space-y-1 text-amber-100 text-sm">
                <li>• <strong>PF = 1.0:</strong> All power is useful (purely resistive - heaters, kettles)</li>
                <li>• <strong>PF = 0.8:</strong> 80% useful, 20% reactive (typical motor load)</li>
                <li>• <strong>PF = 0.5:</strong> Only 50% useful - very inefficient!</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Lagging Power Factor</h4>
                <p className="text-sm">
                  Current lags behind voltage. Caused by <strong>inductive loads</strong>: motors,
                  transformers, magnetic ballasts. Most common in industry.
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Leading Power Factor</h4>
                <p className="text-sm">
                  Current leads voltage. Caused by <strong>capacitive loads</strong> or over-correction
                  with capacitors. Can cause voltage rise issues.
                </p>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-200">
                <strong>Formulas:</strong>
                <br />
                Reactive Power (Q) = V × I × sin(φ) = √(kVA² - kW²)
                <br />
                Power Factor = cos(φ) = kW ÷ kVA
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Energy Consumption (kWh) */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <PoundSterling className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">4. Energy Consumption (kWh) and Billing</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Energy</strong>, measured in <strong className="text-elec-yellow">kilowatt-hours (kWh)</strong>,
              is power consumed over time. While kW and kVA measure instantaneous power (rate of energy flow),
              kWh measures the total energy used. This is what domestic customers see on their electricity bills.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">🚗 The Car Journey Analogy</h4>
              <p>
                Think of kW as your car's speed (how fast you're travelling) and kWh as the distance
                covered (how far you've gone). A 100 kW motor running for 1 hour uses 100 kWh, just like
                a car at 100 km/h travels 100 km in an hour. You pay for distance (kWh), not speed (kW)!
              </p>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <h4 className="font-semibold text-green-200 mb-2">📊 UK Billing Structures</h4>
              <div className="space-y-3 text-green-100 text-sm">
                <div>
                  <strong>Domestic Customers:</strong>
                  <p>Pay per kWh consumed (typically 25-35p/kWh). Simple - just energy consumed.</p>
                </div>
                <div>
                  <strong>Small Commercial (Profile Class 03-04):</strong>
                  <p>Pay per kWh, possibly with day/night rates. May have standing charges.</p>
                </div>
                <div>
                  <strong>Large Commercial/Industrial (Half-Hourly Metered):</strong>
                  <p>Pay for kWh consumed PLUS capacity charges based on maximum kVA demand.
                  May face power factor penalties if PF falls below 0.95 or 0.90.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">Example Calculation</h4>
              <p className="text-sm">
                A 2.5 kW storage heater runs for 7 hours overnight:
                <br /><br />
                <strong>Energy used</strong> = 2.5 kW × 7 hours = <strong className="text-elec-yellow">17.5 kWh</strong>
                <br />
                <strong>Cost</strong> (at 10p/kWh night rate) = 17.5 × £0.10 = <strong className="text-elec-yellow">£1.75</strong>
              </p>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-200">
                <strong>Formula:</strong> Energy (kWh) = Power (kW) × Time (hours)
                <br />
                <span className="text-sm">1 kWh = 1 "unit" of electricity on your bill</span>
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

        {/* Section 5: Power Triangle */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <Triangle className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">5. The Power Triangle and Calculations</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The <strong className="text-white">power triangle</strong> is a visual representation of the
              relationship between real power (kW), reactive power (kVAr), and apparent power (kVA).
              Understanding this triangle is essential for power factor correction calculations.
            </p>

            {/* Visual Power Triangle */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-600">
              <h4 className="font-semibold text-white mb-4 text-center">Power Triangle Diagram</h4>
              <div className="flex justify-center">
                <div className="relative w-80 h-48">
                  {/* Triangle representation using text/ASCII */}
                  <pre className="text-xs md:text-sm font-mono text-center text-gray-300">
{`                    kVA (Apparent Power)
                   ╱│
                 ╱  │
               ╱    │  kVAr
             ╱      │  (Reactive)
           ╱   φ    │
         ╱──────────┘
           kW (Real Power)

    kVA = √(kW² + kVAr²)
    Power Factor = cos(φ) = kW/kVA`}
                  </pre>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-[#242424] p-2 rounded">
                  <span className="text-green-400">kW</span>
                  <br />
                  <span className="text-xs">Adjacent (horizontal)</span>
                </div>
                <div className="bg-[#242424] p-2 rounded">
                  <span className="text-red-400">kVAr</span>
                  <br />
                  <span className="text-xs">Opposite (vertical)</span>
                </div>
                <div className="bg-[#242424] p-2 rounded">
                  <span className="text-elec-yellow">kVA</span>
                  <br />
                  <span className="text-xs">Hypotenuse</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
              <h4 className="font-semibold text-amber-200 mb-2">📐 Key Relationships (Pythagoras)</h4>
              <div className="grid md:grid-cols-2 gap-4 text-amber-100 text-sm">
                <div>
                  <p><strong>Find kVA:</strong></p>
                  <p className="font-mono">kVA = √(kW² + kVAr²)</p>
                </div>
                <div>
                  <p><strong>Find kVAr:</strong></p>
                  <p className="font-mono">kVAr = √(kVA² - kW²)</p>
                </div>
                <div>
                  <p><strong>Find kW:</strong></p>
                  <p className="font-mono">kW = √(kVA² - kVAr²)</p>
                </div>
                <div>
                  <p><strong>Find Power Factor:</strong></p>
                  <p className="font-mono">PF = kW ÷ kVA = cos(φ)</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">Worked Example</h4>
              <p className="text-sm">
                A factory draws <strong>80 kW</strong> of real power with a power factor of <strong>0.8 lagging</strong>.
                Find the apparent power and reactive power.
              </p>
              <div className="mt-3 p-3 bg-[#242424] rounded text-sm font-mono">
                <p>kVA = kW ÷ PF = 80 ÷ 0.8 = <strong className="text-elec-yellow">100 kVA</strong></p>
                <p>kVAr = √(kVA² - kW²) = √(100² - 80²) = √(10000 - 6400) = √3600 = <strong className="text-elec-yellow">60 kVAr</strong></p>
              </div>
              <p className="text-sm mt-3">
                This means 60 kVAr of reactive power is circulating in the system, requiring larger cables
                and transformers than if the load were purely resistive.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Why DNOs and Suppliers Care */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">6. Why DNOs and Suppliers Care About kVA</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Distribution Network Operators (DNOs) size their infrastructure based on <strong className="text-elec-yellow">kVA</strong>,
              not kW. Understanding why this matters is crucial for electricians designing installations
              and advising customers on supply upgrades.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">❌ The Problem with Low Power Factor</h4>
                <ul className="space-y-2 text-red-100 text-sm">
                  <li>• <strong>Higher currents</strong> for the same useful power</li>
                  <li>• <strong>Larger cables</strong> required (more copper = more cost)</li>
                  <li>• <strong>Increased I²R losses</strong> in conductors</li>
                  <li>• <strong>Voltage drop</strong> issues</li>
                  <li>• <strong>Reduced transformer capacity</strong></li>
                  <li>• <strong>Higher infrastructure costs</strong> for everyone</li>
                </ul>
              </div>
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">✓ Benefits of Good Power Factor</h4>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li>• <strong>Lower currents</strong> for the same kW</li>
                  <li>• <strong>Smaller cables</strong> acceptable</li>
                  <li>• <strong>Reduced losses</strong> and heat</li>
                  <li>• <strong>Better voltage regulation</strong></li>
                  <li>• <strong>More capacity</strong> from existing supply</li>
                  <li>• <strong>Avoid surcharges</strong> on bills</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">Real-World Impact Example</h4>
              <p className="text-sm">
                A customer needs 80 kW of power:
              </p>
              <div className="mt-3 grid md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-red-900/20 rounded border border-red-800">
                  <strong className="text-red-300">At PF = 0.7:</strong>
                  <p>kVA = 80 ÷ 0.7 = 114 kVA</p>
                  <p>Current = 114,000 ÷ 400 = 285A</p>
                  <p className="text-red-400">Needs 120 kVA supply!</p>
                </div>
                <div className="p-3 bg-green-900/20 rounded border border-green-800">
                  <strong className="text-green-300">At PF = 0.95:</strong>
                  <p>kVA = 80 ÷ 0.95 = 84 kVA</p>
                  <p>Current = 84,000 ÷ 400 = 210A</p>
                  <p className="text-green-400">100 kVA supply is fine!</p>
                </div>
              </div>
              <p className="text-sm mt-3">
                The difference could mean a costly supply upgrade, or simply fitting power factor
                correction capacitors!
              </p>
            </div>

            <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
              <h4 className="font-semibold text-amber-200 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" />
                Power Factor Surcharges
              </h4>
              <p className="text-amber-100 text-sm">
                Many UK suppliers penalise customers with poor power factor:
              </p>
              <ul className="mt-2 space-y-1 text-amber-100 text-sm">
                <li>• Charges may apply if PF falls below <strong>0.95</strong> or <strong>0.90</strong></li>
                <li>• Calculated as kVAh (reactive energy) charges</li>
                <li>• Can add <strong>5-15%</strong> to electricity bills</li>
                <li>• Power factor correction equipment often pays for itself in 1-3 years</li>
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

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg p-6 border-2 border-elec-yellow">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3 border-b border-gray-600 pb-2">Key Definitions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Real Power (P)</span>
                  <span className="text-elec-yellow font-mono">kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Apparent Power (S)</span>
                  <span className="text-elec-yellow font-mono">kVA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reactive Power (Q)</span>
                  <span className="text-elec-yellow font-mono">kVAr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Energy</span>
                  <span className="text-elec-yellow font-mono">kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Power Factor</span>
                  <span className="text-elec-yellow font-mono">cos(φ) or PF</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 border-b border-gray-600 pb-2">Essential Formulas</h4>
              <div className="space-y-2 text-sm font-mono">
                <p><span className="text-gray-400">Power Factor:</span> <span className="text-white">PF = kW ÷ kVA</span></p>
                <p><span className="text-gray-400">Real Power:</span> <span className="text-white">kW = kVA × PF</span></p>
                <p><span className="text-gray-400">Apparent Power:</span> <span className="text-white">kVA = kW ÷ PF</span></p>
                <p><span className="text-gray-400">Reactive Power:</span> <span className="text-white">kVAr = √(kVA² - kW²)</span></p>
                <p><span className="text-gray-400">Energy:</span> <span className="text-white">kWh = kW × hours</span></p>
                <p><span className="text-gray-400">Pythagoras:</span> <span className="text-white">kVA² = kW² + kVAr²</span></p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-600">
            <h4 className="font-semibold text-white mb-3">Typical Power Factors</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-[#1a1a1a] p-2 rounded text-center">
                <p className="text-green-400 font-semibold">1.0</p>
                <p className="text-xs text-gray-400">Resistive loads</p>
              </div>
              <div className="bg-[#1a1a1a] p-2 rounded text-center">
                <p className="text-elec-yellow font-semibold">0.85-0.95</p>
                <p className="text-xs text-gray-400">Good industrial</p>
              </div>
              <div className="bg-[#1a1a1a] p-2 rounded text-center">
                <p className="text-orange-400 font-semibold">0.7-0.85</p>
                <p className="text-xs text-gray-400">Motors/HVAC</p>
              </div>
              <div className="bg-[#1a1a1a] p-2 rounded text-center">
                <p className="text-red-400 font-semibold">&lt;0.7</p>
                <p className="text-xs text-gray-400">Poor - needs PFC</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Section Quiz</h2>
          <p className="text-gray-400 mb-6">
            Test your understanding of kW, kVA, kWh, and power factor concepts.
          </p>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQs Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-600 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors min-h-[44px] touch-manipulation"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="p-4 bg-[#1a1a1a]/50 border-t border-gray-600">
                    <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-6">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-2/section-2')}
            variant="outline"
            className="min-h-[44px] touch-manipulation bg-transparent border-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Previous</div>
              <div className="text-sm">Section 2: Power Quality Basics</div>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-2/section-4')}
            className="min-h-[44px] touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black flex items-center gap-2"
          >
            <div className="text-right">
              <div className="text-xs text-black/70">Next</div>
              <div className="text-sm">Section 4: Maximum Demand</div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule2Section3;
