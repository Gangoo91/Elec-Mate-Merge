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
  Thermometer,
  Zap,
  Shield,
  AlertTriangle,
  Settings,
  CheckCircle,
  BookOpen,
  Wrench,
  Clock,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IndustrialElectricalModule2Section3: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'Thermal Overloads and Fuses | Industrial Electrical Module 2 Section 3 | Elec-Mate',
    description: 'Learn about thermal overload relay principles, HRC fuses for motor circuits, BS 88 ratings, Class 10/20/30 trip curves, and type 1 vs type 2 coordination for industrial electrical protection.',
    keywords: 'thermal overload relay, HRC fuses, BS 88, motor protection, aM fuses, gG fuses, Class 10 trip, overload coordination, industrial electrical',
    canonical: '/upskilling/industrial-electrical/module-2/section-3'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-thermal-overloads',
      question: 'A motor has a full load current (FLC) of 25A and a service factor of 1.15. What should the thermal overload be set to?',
      options: ['25A', '28.75A', '21.75A', '30A'],
      correctIndex: 1,
      explanation: 'The overload setting = FLC × Service Factor = 25A × 1.15 = 28.75A. The service factor allows for normal overload conditions during operation without nuisance tripping.'
    },
    {
      id: 'qc2-hrc-fuses',
      question: 'Which type of HRC fuse is specifically designed for motor circuit protection and can withstand high starting currents?',
      options: ['gG (general purpose)', 'aM (motor rated)', 'aR (semiconductor)', 'gN (North American)'],
      correctIndex: 1,
      explanation: 'aM (accompagnement Moteur) fuses are specifically designed for motor circuits. They can withstand the high inrush currents during motor starting (typically 6-8 times FLC) without blowing, while still providing short-circuit protection.'
    },
    {
      id: 'qc3-coordination',
      question: 'In Type 2 coordination, what is permitted to happen to the contactor during a short-circuit fault?',
      options: ['Complete destruction requiring replacement', 'Welded contacts that can be separated', 'No damage whatsoever', 'Thermal damage to the coil'],
      correctIndex: 1,
      explanation: 'Type 2 coordination allows contact welding during a short-circuit, provided the contacts can be separated (manually or automatically) without significant damage. The starter must remain operational after the fault is cleared. Type 1 allows complete destruction requiring replacement.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the primary operating principle of a bimetallic thermal overload relay?',
      options: [
        'Electromagnetic attraction between coils',
        'Differential expansion of two bonded metals when heated',
        'Electronic current sensing with microprocessor control',
        'Pressure changes in a sealed chamber'
      ],
      correctAnswer: 'Differential expansion of two bonded metals when heated'
    },
    {
      question: 'A Class 10 thermal overload relay will trip within what time at 7.2 times the set current?',
      options: [
        '4 seconds',
        '10 seconds',
        '20 seconds',
        '30 seconds'
      ],
      correctAnswer: '10 seconds'
    },
    {
      question: 'According to BS 88, what does the first numeral in a fuse link designation (e.g., 88-2) indicate?',
      options: [
        'The current rating',
        'The voltage rating',
        'The physical size/type',
        'The breaking capacity'
      ],
      correctAnswer: 'The physical size/type'
    },
    {
      question: 'When selecting an HRC fuse for a DOL motor starter, the fuse rating should typically be:',
      options: [
        'Equal to the motor FLC',
        '1.5 to 2 times the motor FLC',
        '0.8 times the motor FLC',
        '3 to 4 times the motor FLC'
      ],
      correctAnswer: '1.5 to 2 times the motor FLC'
    },
    {
      question: 'What is the main advantage of electronic overload relays over thermal types?',
      options: [
        'Lower cost',
        'Simpler installation',
        'Adjustable trip classes and better accuracy',
        'No power supply required'
      ],
      correctAnswer: 'Adjustable trip classes and better accuracy'
    },
    {
      question: 'In motor circuit protection, the thermal overload provides protection against:',
      options: [
        'Short-circuit faults only',
        'Earth faults only',
        'Sustained overcurrent (overload) conditions',
        'Voltage fluctuations'
      ],
      correctAnswer: 'Sustained overcurrent (overload) conditions'
    },
    {
      question: 'A gG fuse differs from an aM fuse in that gG fuses:',
      options: [
        'Can only protect motors',
        'Provide overload AND short-circuit protection',
        'Have higher breaking capacity',
        'Are only used in DC circuits'
      ],
      correctAnswer: 'Provide overload AND short-circuit protection'
    },
    {
      question: 'What should be checked before resetting a thermal overload relay that has tripped?',
      options: [
        'Only the motor winding resistance',
        'The cause of the overload and allow cooling time',
        'Only the supply voltage',
        'The contactor coil resistance'
      ],
      correctAnswer: 'The cause of the overload and allow cooling time'
    },
    {
      question: 'For a motor with high inertia loads requiring extended starting times, which trip class is most appropriate?',
      options: [
        'Class 5',
        'Class 10',
        'Class 20 or 30',
        'Class 10A'
      ],
      correctAnswer: 'Class 20 or 30'
    },
    {
      question: 'When testing thermal overload relay operation, the primary test method involves:',
      options: [
        'Applying twice the set current and timing the trip',
        'Injecting current at 1.05× setting to verify no trip in 2 hours',
        'Using a current injection set at 6× setting and verifying trip within class time',
        'Both B and C depending on test requirements'
      ],
      correctAnswer: 'Both B and C depending on test requirements'
    }
  ];

  const faqData = [
    {
      question: 'Why can\'t I just use a larger fuse to stop nuisance tripping?',
      answer: 'Oversizing fuses defeats the protection coordination between the fuse and thermal overload. The fuse is sized to protect against short-circuits while allowing the thermal overload to handle overloads. An oversized fuse may not clear a fault fast enough to prevent damage to the overload relay or contactor contacts. If you\'re experiencing nuisance tripping, investigate the cause: motor overloading, high ambient temperature, incorrect overload setting, or ventilation issues. Always maintain proper coordination - the fuse should be selected from manufacturer coordination tables.'
    },
    {
      question: 'How do I select between Class 10, 20, and 30 thermal overloads?',
      answer: 'Class 10 is standard for most industrial applications with normal starting times (up to 10 seconds at 7.2× setting). Class 20 suits moderate inertia loads like fans and centrifugal pumps requiring 10-20 seconds starting time. Class 30 is for high inertia loads such as large fans, flywheels, or crushers needing 20-30 seconds. Class 10A has a faster trip curve for sensitive applications. Using a class that\'s too low causes nuisance trips during starting; too high provides inadequate motor protection. Always consider the motor\'s thermal capacity and starting characteristics.'
    },
    {
      question: 'What\'s the difference between Type 1 and Type 2 coordination?',
      answer: 'Type 1 coordination (per IEC 60947-4-1) allows the contactor and overload to be damaged beyond repair during a short-circuit - only personnel safety is guaranteed. Type 2 coordination requires that after a short-circuit, the starter remains fully operational with no damage except possible contact welding that can be separated. Type 2 is preferred for critical processes where downtime is costly, as only fuse replacement is needed. Type 2 typically requires carefully matched fuses from manufacturer coordination tables and may cost more initially but reduces replacement costs and downtime.'
    },
    {
      question: 'Can I replace an aM fuse with a gG fuse of the same rating?',
      answer: 'No - this is dangerous! aM and gG fuses have fundamentally different characteristics despite potentially having the same current rating. aM fuses are motor-rated and designed to withstand high inrush currents (6-10× rating) without degradation. gG fuses provide full-range protection and will blow on motor starting currents. Replacing aM with gG will likely cause the fuse to blow during motor starting. Conversely, using aM where gG is specified removes overload protection. Always replace fuses with the identical type, rating, and ideally the same manufacturer.'
    },
    {
      question: 'How often should thermal overload relays be tested?',
      answer: 'Testing frequency depends on the criticality of the protected equipment and environmental conditions. As a minimum: annually for standard industrial applications, every 6 months for critical processes or harsh environments, and after any trip event or suspected malfunction. Tests should include: visual inspection for damage/discolouration, checking the set current matches motor FLC × service factor, verifying manual trip and reset operation, and ideally current injection testing to verify trip times. Electronic overloads may have self-test features but should still be manually verified. Document all test results for compliance and trending.'
    },
    {
      question: 'Why does my thermal overload trip in hot weather but not in winter?',
      answer: 'Thermal overload relays are ambient temperature sensitive. The bimetallic elements respond to total heat - both from motor current AND surrounding air temperature. In hot weather, the relay starts "warmer" and reaches trip temperature faster. Solutions include: 1) Use temperature-compensated overload relays designed to maintain consistent trip characteristics across -20°C to +60°C. 2) Apply ambient temperature correction factors from the manufacturer (typically reducing setting by 5% per 10°C above 40°C). 3) Improve enclosure ventilation. 4) Relocate the overload to a cooler position. Electronic overloads are generally less affected by ambient temperature.'
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
            <span>Module 2: Motor Control and Protection</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow flex items-center gap-3">
            <Thermometer className="w-8 h-8" />
            Section 3: Thermal Overloads and Fuses
          </h1>
          <p className="text-gray-300 mt-2">
            Motor circuit protection devices, coordination principles, and testing procedures
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Section 1: Thermal Overload Relay Principles and Types */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">1</div>
            <h2 className="text-xl font-semibold text-elec-yellow">Thermal Overload Relay Principles and Types</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Thermal overload relays protect motors from damage due to sustained overcurrent conditions. Unlike fuses
              which protect against short-circuits, thermal overloads respond to the <strong className="text-white">heating effect</strong> of
              current over time, mimicking the motor's own thermal characteristics.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-elec-yellow" />
                Bimetallic Operating Principle
              </h3>
              <p className="mb-3">
                The most common type uses <strong className="text-elec-yellow">bimetallic strips</strong> - two different metals
                (typically brass and invar) bonded together. When heated by motor current:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Metals expand at different rates due to different thermal expansion coefficients</li>
                <li>The strip bends/deflects proportionally to temperature rise</li>
                <li>At a predetermined deflection, the mechanism trips open auxiliary contacts</li>
                <li>These contacts break the contactor coil circuit, stopping the motor</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Direct Heated Type</h4>
                <p className="text-sm">
                  Motor current passes directly through the bimetallic element. Simple construction,
                  fast response, but limited to lower currents. Common in small motor starters.
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Indirect Heated Type</h4>
                <p className="text-sm">
                  Current passes through a heater coil wound around the bimetal. Better for higher
                  currents, allows interchangeable heater elements for different ratings.
                </p>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Trip Classes (IEC 60947-4-1)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-[#1a1a1a] p-3 rounded">
                  <p className="text-elec-yellow font-bold">Class 10A</p>
                  <p>Trips 2-10s @ 7.2×</p>
                  <p className="text-gray-500">Sensitive loads</p>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded">
                  <p className="text-elec-yellow font-bold">Class 10</p>
                  <p>Trips 4-10s @ 7.2×</p>
                  <p className="text-gray-500">Standard duty</p>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded">
                  <p className="text-elec-yellow font-bold">Class 20</p>
                  <p>Trips 6-20s @ 7.2×</p>
                  <p className="text-gray-500">Medium inertia</p>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded">
                  <p className="text-elec-yellow font-bold">Class 30</p>
                  <p>Trips 9-30s @ 7.2×</p>
                  <p className="text-gray-500">High inertia</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-2">Overload Types by Mounting</h4>
              <ul className="space-y-2 text-sm">
                <li><strong className="text-elec-yellow">Separate mounting:</strong> Standalone units connected via wiring to contactor</li>
                <li><strong className="text-elec-yellow">Direct mounting:</strong> Clips directly onto contactor base - most common industrial type</li>
                <li><strong className="text-elec-yellow">Integral:</strong> Built into motor starter/soft starter units</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Setting Thermal Overloads */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">2</div>
            <h2 className="text-xl font-semibold text-elec-yellow">Setting Thermal Overloads (FLC and Service Factor)</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Correct overload setting is critical for effective motor protection without nuisance tripping.
              The setting must balance protection against overload damage with allowance for normal operating variations.
            </p>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Setting Calculation Formula
              </h3>
              <div className="bg-[#1a1a1a] p-4 rounded text-center">
                <p className="text-2xl font-mono text-elec-yellow">
                  Overload Setting = FLC × Service Factor
                </p>
              </div>
              <div className="mt-3 grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-semibold">FLC (Full Load Current)</p>
                  <p>Found on motor nameplate - the current drawn when delivering rated output at rated voltage</p>
                </div>
                <div>
                  <p className="text-white font-semibold">Service Factor (SF)</p>
                  <p>Typically 1.0 to 1.15 - allows for temporary overloads during normal operation</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-3">Worked Example</h4>
              <div className="space-y-2 text-sm font-mono bg-[#2a2a2a] p-4 rounded">
                <p>Motor nameplate data:</p>
                <p className="text-elec-yellow">• Full Load Current (FLC) = 15.8A</p>
                <p className="text-elec-yellow">• Service Factor (SF) = 1.15</p>
                <p className="mt-2">Calculation:</p>
                <p className="text-green-400">Overload Setting = 15.8A × 1.15 = 18.17A</p>
                <p className="mt-2 text-gray-400">Set the overload dial to 18.2A (nearest available setting)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Service Factor Guidelines</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong className="text-elec-yellow">SF = 1.0:</strong> Continuous duty, no overload expected</li>
                  <li><strong className="text-elec-yellow">SF = 1.05:</strong> Light intermittent overloads</li>
                  <li><strong className="text-elec-yellow">SF = 1.10:</strong> Moderate duty cycles</li>
                  <li><strong className="text-elec-yellow">SF = 1.15:</strong> Heavy duty, frequent starting</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Adjustment Dial Types</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong className="text-elec-yellow">Ampere scale:</strong> Set directly in amps</li>
                  <li><strong className="text-elec-yellow">Percentage scale:</strong> % of heater rating</li>
                  <li><strong className="text-elec-yellow">Numbered positions:</strong> Refer to data table</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
              <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Ambient Temperature Compensation
              </h4>
              <p className="text-sm">
                Standard thermal overloads are calibrated at 40°C ambient. For every 10°C above 40°C,
                reduce the setting by approximately 5%. Temperature-compensated overloads automatically
                adjust and are recommended for installations subject to wide temperature variations.
              </p>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-2">Reset Modes</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-elec-yellow font-semibold">Manual Reset</p>
                  <p>Requires physical button press - safer, ensures fault investigation before restart</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold">Automatic Reset</p>
                  <p>Resets after cooling period - only for non-critical applications with supervision</p>
                </div>
              </div>
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

        {/* Section 3: HRC Fuses for Motor Circuits */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">3</div>
            <h2 className="text-xl font-semibold text-elec-yellow">HRC Fuses for Motor Circuits (aM and gG Types)</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              High Rupturing Capacity (HRC) fuses provide short-circuit protection in motor circuits. The correct
              fuse type selection is essential - motors have unique characteristics (high starting currents) that
              require specific fuse types to avoid nuisance blowing while maintaining protection.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-elec-yellow" />
                BS 88 Fuse Standard
              </h3>
              <p className="mb-3">
                BS 88 (British Standard for cartridge fuses) defines fuse characteristics. Key designations:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li><strong>BS 88-2:</strong> Fuses for industrial applications (up to 1250A)</li>
                <li><strong>BS 88-3:</strong> Fuses for domestic applications</li>
                <li><strong>BS 88-4:</strong> Fuses for semiconductor protection</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">gG Fuses (General Purpose)</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Full range:</strong> Protects against both overloads and short-circuits</li>
                  <li><strong>Characteristic:</strong> Will blow at lower multiples of rating</li>
                  <li><strong>Application:</strong> Cable protection, distribution boards</li>
                  <li><strong className="text-red-400">NOT suitable for motor circuits</strong> - will blow on starting current</li>
                </ul>
              </div>
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">aM Fuses (Motor Rated)</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Back-up:</strong> Short-circuit protection only</li>
                  <li><strong>Characteristic:</strong> Withstands high inrush currents (6-10× rating)</li>
                  <li><strong>Application:</strong> Motor circuits with separate overload protection</li>
                  <li><strong className="text-green-400">DESIGNED for motor starting currents</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-3">Fuse Selection for Motor Circuits</h4>
              <div className="space-y-2 text-sm">
                <p><strong className="text-elec-yellow">Rule of thumb for aM fuses:</strong></p>
                <div className="bg-[#2a2a2a] p-3 rounded font-mono">
                  <p>Fuse Rating = Motor FLC × 1.5 to 2.0 (for DOL starting)</p>
                  <p>Fuse Rating = Motor FLC × 1.0 to 1.5 (for star-delta starting)</p>
                </div>
                <p className="mt-3 text-gray-400">
                  Always verify selection against manufacturer coordination tables for Type 2 coordination.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-3">Common BS 88-2 Fuse Ratings</h4>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-sm text-center">
                {['2A', '4A', '6A', '10A', '16A', '20A', '25A', '32A', '40A', '50A', '63A', '80A', '100A', '125A', '160A', '200A'].map((rating) => (
                  <div key={rating} className="bg-[#2a2a2a] p-2 rounded text-elec-yellow">
                    {rating}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Ratings follow the R10 preferred number series. Breaking capacity typically 80kA at 415V AC.
              </p>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Fuse Marking Example</h4>
              <div className="bg-[#1a1a1a] p-3 rounded font-mono text-center">
                <p className="text-xl text-elec-yellow">32M40 or 32aM40</p>
              </div>
              <p className="text-sm mt-2">
                32 = Current rating (32A) | M or aM = Motor type | 40 = Voltage rating (×10V = 400V)
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

        {/* Section 4: Coordination Between Fuses and Overloads */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">4</div>
            <h2 className="text-xl font-semibold text-elec-yellow">Coordination Between Fuses and Overloads</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Coordination ensures that the correct protective device operates for each fault type, while
              minimizing damage to starter components. IEC 60947-4-1 defines two coordination types.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
                <h4 className="text-amber-400 font-semibold mb-2">Type 1 Coordination</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Requirement:</strong> No danger to persons</li>
                  <li><strong>Permitted damage:</strong> Contactor and overload may be damaged beyond repair</li>
                  <li><strong>After fault:</strong> Complete starter replacement may be needed</li>
                  <li><strong>Cost:</strong> Lower initial fuse cost</li>
                  <li><strong>Application:</strong> Non-critical, easily replaceable systems</li>
                </ul>
              </div>
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Type 2 Coordination</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Requirement:</strong> No danger + starter remains operational</li>
                  <li><strong>Permitted damage:</strong> Contact welding only (must be separable)</li>
                  <li><strong>After fault:</strong> Replace fuse only, check contacts</li>
                  <li><strong>Cost:</strong> Higher initial cost, lower lifecycle cost</li>
                  <li><strong>Application:</strong> Critical processes, high availability systems</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-semibold mb-3">Protection Zones</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">ZONE 1</div>
                  <div>
                    <p className="text-white font-semibold">Overload Region (100% - ~600% FLC)</p>
                    <p className="text-sm">Thermal overload relay operates - inverse time characteristic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">ZONE 2</div>
                  <div>
                    <p className="text-white font-semibold">Transition Region (~600% - 1000% FLC)</p>
                    <p className="text-sm">Either device may operate - coordination critical here</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">ZONE 3</div>
                  <div>
                    <p className="text-white font-semibold">Short-Circuit Region (&gt;1000% FLC)</p>
                    <p className="text-sm">Fuse must operate before contactor/overload damage threshold</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-2">Achieving Type 2 Coordination</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>Use manufacturer's coordination tables - never guess fuse sizes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>Match fuse brand/type to contactor/overload brand where possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>Fuse I²t let-through must be less than contactor/overload withstand</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>Consider prospective fault current at installation point</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                I²t Let-Through Energy
              </h4>
              <p className="text-sm">
                I²t (Joule integral) represents the thermal energy let through by the fuse during fault clearance.
                For Type 2 coordination, the fuse I²t must be less than the contactor's thermal withstand capability.
                Manufacturer tables provide maximum fuse ratings for each contactor frame size based on I²t matching.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Electronic Overload Protection */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">5</div>
            <h2 className="text-xl font-semibold text-elec-yellow">Electronic Overload Protection</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Electronic overload relays use current transformers and microprocessor technology to provide more
              accurate, adjustable, and feature-rich motor protection compared to thermal types.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Advantages</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Adjustable trip class (10/20/30) via switch/software</li>
                  <li>• Better accuracy (±5% vs ±20% for thermal)</li>
                  <li>• Less affected by ambient temperature</li>
                  <li>• Phase loss/imbalance detection included</li>
                  <li>• Ground fault protection option</li>
                  <li>• Thermal memory - remembers motor heating</li>
                  <li>• Communication capability (Modbus, etc.)</li>
                  <li>• Diagnostic LEDs and fault indicators</li>
                </ul>
              </div>
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Considerations</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Higher initial cost</li>
                  <li>• Requires control voltage supply</li>
                  <li>• More complex setup/programming</li>
                  <li>• May require specialist knowledge</li>
                  <li>• Electronic components can fail</li>
                  <li>• Susceptible to electrical noise (EMC)</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-3">Key Electronic Overload Features</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow font-semibold">Phase Loss Detection</p>
                  <p className="text-gray-400">Trips if any phase current drops below 60% of average - prevents single-phasing damage</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold">Phase Imbalance Detection</p>
                  <p className="text-gray-400">Trips if phases differ by more than set % (typically 20-50% adjustable)</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold">Thermal Model</p>
                  <p className="text-gray-400">Mathematical simulation of motor heating/cooling for accurate protection</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold">Starts Per Hour Limit</p>
                  <p className="text-gray-400">Prevents motor overheating from excessive starting cycles</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-3">Operating Principle</h4>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 space-y-2 text-sm">
                  <p><strong className="text-elec-yellow">1. Current Sensing:</strong> CTs on each phase measure motor current</p>
                  <p><strong className="text-elec-yellow">2. Signal Processing:</strong> Microprocessor calculates RMS values</p>
                  <p><strong className="text-elec-yellow">3. Thermal Algorithm:</strong> I²t calculation models motor heating</p>
                  <p><strong className="text-elec-yellow">4. Trip Decision:</strong> Compares calculated thermal state to limits</p>
                  <p><strong className="text-elec-yellow">5. Output:</strong> Relay contacts open when limits exceeded</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Typical Settings on Electronic Overloads
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-[#1a1a1a] p-2 rounded">
                  <p className="text-elec-yellow">FLC Setting</p>
                  <p className="text-gray-400">0.4-1.0 × nominal</p>
                </div>
                <div className="bg-[#1a1a1a] p-2 rounded">
                  <p className="text-elec-yellow">Trip Class</p>
                  <p className="text-gray-400">10/20/30</p>
                </div>
                <div className="bg-[#1a1a1a] p-2 rounded">
                  <p className="text-elec-yellow">Reset Mode</p>
                  <p className="text-gray-400">Manual/Auto</p>
                </div>
                <div className="bg-[#1a1a1a] p-2 rounded">
                  <p className="text-elec-yellow">Phase Loss</p>
                  <p className="text-gray-400">On/Off</p>
                </div>
                <div className="bg-[#1a1a1a] p-2 rounded">
                  <p className="text-elec-yellow">Ground Fault</p>
                  <p className="text-gray-400">0.1-1.0A</p>
                </div>
                <div className="bg-[#1a1a1a] p-2 rounded">
                  <p className="text-elec-yellow">Imbalance</p>
                  <p className="text-gray-400">20-50%</p>
                </div>
              </div>
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

        {/* Section 6: Testing and Replacement Procedures */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">6</div>
            <h2 className="text-xl font-semibold text-elec-yellow">Testing and Replacement Procedures</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Regular testing ensures protective devices operate correctly when needed. Both thermal and
              electronic overloads require periodic verification, while fuses need proper handling and
              replacement procedures.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-elec-yellow" />
                Thermal Overload Testing
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="text-elec-yellow font-semibold">Visual Inspection</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Check for signs of overheating or discolouration</li>
                    <li>• Verify dial setting matches motor FLC × SF</li>
                    <li>• Ensure mounting is secure and terminals tight</li>
                  </ul>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="text-elec-yellow font-semibold">Functional Test</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Operate manual trip button - contacts should open</li>
                    <li>• Verify reset mechanism functions correctly</li>
                    <li>• Check auxiliary contact operation with multimeter</li>
                  </ul>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="text-elec-yellow font-semibold">Current Injection Test</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Inject 6× set current through all three phases</li>
                    <li>• Time to trip should be within class limits</li>
                    <li>• Allow cooling time before re-testing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-3">Trip Time Verification Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2 text-elec-yellow">Test Current</th>
                      <th className="text-left p-2 text-elec-yellow">Class 10</th>
                      <th className="text-left p-2 text-elec-yellow">Class 20</th>
                      <th className="text-left p-2 text-elec-yellow">Class 30</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">1.05 × setting</td>
                      <td className="p-2">No trip in 2 hours</td>
                      <td className="p-2">No trip in 2 hours</td>
                      <td className="p-2">No trip in 2 hours</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">1.20 × setting</td>
                      <td className="p-2">Trip within 2 hours</td>
                      <td className="p-2">Trip within 2 hours</td>
                      <td className="p-2">Trip within 2 hours</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">7.2 × setting</td>
                      <td className="p-2">4-10 seconds</td>
                      <td className="p-2">6-20 seconds</td>
                      <td className="p-2">9-30 seconds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-semibold mb-2">HRC Fuse Inspection</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Visual check for cracks or damage to ceramic body</li>
                  <li>• Check end caps for corrosion or overheating marks</li>
                  <li>• Verify correct rating for circuit (check labelling)</li>
                  <li>• Use fuse puller for removal - never bare hands</li>
                  <li>• Continuity test to verify fuse is intact</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Fuse Replacement Procedure</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Isolate supply and prove dead</li>
                  <li>• Remove blown fuse with appropriate puller</li>
                  <li>• Verify replacement is identical type AND rating</li>
                  <li>• Check fuse carrier/contacts for damage</li>
                  <li>• Insert new fuse ensuring proper seating</li>
                  <li>• Investigate and record cause of failure</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
              <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Safety Warnings
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Never replace a fuse with a higher rating - defeats protection coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Never bypass a thermal overload - motor damage will result</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Always investigate cause before resetting/replacing protective devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Allow thermal overloads to cool before resetting (typically 2-3 minutes)</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-2">Documenting Test Results</h4>
              <p className="text-sm">
                Record all test results including: date, equipment ID, set current value, test current applied,
                measured trip time, pass/fail status, and technician name. This data enables trend analysis
                to identify deteriorating protection devices before failure.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg p-6 border-2 border-elec-yellow">
          <h2 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Quick Reference Card
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2 border-b border-gray-600 pb-1">Key Formulas</h3>
              <div className="space-y-2 text-sm font-mono">
                <p><span className="text-elec-yellow">Overload Setting:</span> FLC × Service Factor</p>
                <p><span className="text-elec-yellow">aM Fuse (DOL):</span> FLC × 1.5 to 2.0</p>
                <p><span className="text-elec-yellow">aM Fuse (S-D):</span> FLC × 1.0 to 1.5</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2 border-b border-gray-600 pb-1">Trip Class Times @ 7.2×</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-elec-yellow">Class 10A:</span> 2-10 seconds</p>
                <p><span className="text-elec-yellow">Class 10:</span> 4-10 seconds</p>
                <p><span className="text-elec-yellow">Class 20:</span> 6-20 seconds</p>
                <p><span className="text-elec-yellow">Class 30:</span> 9-30 seconds</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2 border-b border-gray-600 pb-1">Fuse Types</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-elec-yellow">gG:</span> General purpose (overload + short-circuit)</p>
                <p><span className="text-elec-yellow">aM:</span> Motor (short-circuit only, high inrush)</p>
                <p><span className="text-elec-yellow">aR:</span> Semiconductor protection</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2 border-b border-gray-600 pb-1">Coordination Types</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-elec-yellow">Type 1:</span> Damage permitted, replacement needed</p>
                <p><span className="text-elec-yellow">Type 2:</span> Welding only, starter stays operational</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-600">
            <h3 className="text-white font-semibold mb-2">BS 88-2 Common Ratings</h3>
            <p className="text-sm text-gray-300">
              2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630A
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-elec-yellow mb-4">Frequently Asked Questions</h2>

          <div className="space-y-2">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors min-h-[44px] touch-manipulation"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="p-4 bg-[#2a2a2a] text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-elec-yellow mb-4">Section Quiz</h2>
          <p className="text-gray-300 mb-6">
            Test your understanding of thermal overloads, HRC fuses, and motor protection coordination.
          </p>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-2/section-2')}
            variant="outline"
            className="min-h-[44px] touch-manipulation flex items-center gap-2 bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:border-elec-yellow"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 2 - Contactors and Relays</span>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-2/section-4')}
            className="min-h-[44px] touch-manipulation flex items-center gap-2 bg-elec-yellow text-black hover:bg-yellow-400"
          >
            <span>Next: Section 4 - DOL Motor Starters</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule2Section3;
