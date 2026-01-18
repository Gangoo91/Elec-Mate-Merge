import React, { useState } from 'react';
import { ArrowLeft, Thermometer, CheckCircle, AlertTriangle, HelpCircle, Shield, BookOpen, Wrench, Clock, Target, Zap, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';

const IndustrialElectricalModule2Section3: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Thermal Overloads and Fuses | Industrial Electrical Module 2 Section 3',
    description: 'Learn about thermal overload relay principles, HRC fuses for motor circuits, BS 88 ratings, Class 10/20/30 trip curves, and type 1 vs type 2 coordination for industrial electrical protection.',
    keywords: ['thermal overload relay', 'HRC fuses', 'BS 88', 'motor protection', 'aM fuses', 'gG fuses', 'Class 10 trip', 'overload coordination', 'industrial electrical']
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-thermal-overloads',
      question: 'A motor has a full load current (FLC) of 25A and a service factor of 1.15. What should the thermal overload be set to?',
      options: ['25A', '28.75A', '21.75A', '30A'],
      correctIndex: 1,
      explanation: 'The overload setting = FLC x Service Factor = 25A x 1.15 = 28.75A. The service factor allows for normal overload conditions during operation without nuisance tripping.'
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
      options: ['Electromagnetic attraction between coils', 'Differential expansion of two bonded metals when heated', 'Electronic current sensing with microprocessor control', 'Pressure changes in a sealed chamber'],
      correctAnswer: 'Differential expansion of two bonded metals when heated'
    },
    {
      question: 'A Class 10 thermal overload relay will trip within what time at 7.2 times the set current?',
      options: ['4 seconds', '10 seconds', '20 seconds', '30 seconds'],
      correctAnswer: '10 seconds'
    },
    {
      question: 'According to BS 88, what does the first numeral in a fuse link designation (e.g., 88-2) indicate?',
      options: ['The current rating', 'The voltage rating', 'The physical size/type', 'The breaking capacity'],
      correctAnswer: 'The physical size/type'
    },
    {
      question: 'When selecting an HRC fuse for a DOL motor starter, the fuse rating should typically be:',
      options: ['Equal to the motor FLC', '1.5 to 2 times the motor FLC', '0.8 times the motor FLC', '3 to 4 times the motor FLC'],
      correctAnswer: '1.5 to 2 times the motor FLC'
    },
    {
      question: 'What is the main advantage of electronic overload relays over thermal types?',
      options: ['Lower cost', 'Simpler installation', 'Adjustable trip classes and better accuracy', 'No power supply required'],
      correctAnswer: 'Adjustable trip classes and better accuracy'
    },
    {
      question: 'In motor circuit protection, the thermal overload provides protection against:',
      options: ['Short-circuit faults only', 'Earth faults only', 'Sustained overcurrent (overload) conditions', 'Voltage fluctuations'],
      correctAnswer: 'Sustained overcurrent (overload) conditions'
    },
    {
      question: 'A gG fuse differs from an aM fuse in that gG fuses:',
      options: ['Can only protect motors', 'Provide overload AND short-circuit protection', 'Have higher breaking capacity', 'Are only used in DC circuits'],
      correctAnswer: 'Provide overload AND short-circuit protection'
    },
    {
      question: 'What should be checked before resetting a thermal overload relay that has tripped?',
      options: ['Only the motor winding resistance', 'The cause of the overload and allow cooling time', 'Only the supply voltage', 'The contactor coil resistance'],
      correctAnswer: 'The cause of the overload and allow cooling time'
    },
    {
      question: 'For a motor with high inertia loads requiring extended starting times, which trip class is most appropriate?',
      options: ['Class 5', 'Class 10', 'Class 20 or 30', 'Class 10A'],
      correctAnswer: 'Class 20 or 30'
    },
    {
      question: 'When testing thermal overload relay operation, the primary test method involves:',
      options: ['Applying twice the set current and timing the trip', 'Injecting current at 1.05x setting to verify no trip in 2 hours', 'Using a current injection set at 6x setting and verifying trip within class time', 'Both B and C depending on test requirements'],
      correctAnswer: 'Both B and C depending on test requirements'
    }
  ];

  const faqItems = [
    {
      question: "Why can't I just use a larger fuse to stop nuisance tripping?",
      answer: "Oversizing fuses defeats the protection coordination between the fuse and thermal overload. The fuse is sized to protect against short-circuits while allowing the thermal overload to handle overloads. An oversized fuse may not clear a fault fast enough to prevent damage to the overload relay or contactor contacts. If you're experiencing nuisance tripping, investigate the cause: motor overloading, high ambient temperature, incorrect overload setting, or ventilation issues. Always maintain proper coordination - the fuse should be selected from manufacturer coordination tables."
    },
    {
      question: 'How do I select between Class 10, 20, and 30 thermal overloads?',
      answer: 'Class 10 is standard for most industrial applications with normal starting times (up to 10 seconds at 7.2x setting). Class 20 suits moderate inertia loads like fans and centrifugal pumps requiring 10-20 seconds starting time. Class 30 is for high inertia loads such as large fans, flywheels, or crushers needing 20-30 seconds. Class 10A has a faster trip curve for sensitive applications. Using a class that is too low causes nuisance trips during starting; too high provides inadequate motor protection. Always consider the motor thermal capacity and starting characteristics.'
    },
    {
      question: "What's the difference between Type 1 and Type 2 coordination?",
      answer: 'Type 1 coordination (per IEC 60947-4-1) allows the contactor and overload to be damaged beyond repair during a short-circuit - only personnel safety is guaranteed. Type 2 coordination requires that after a short-circuit, the starter remains fully operational with no damage except possible contact welding that can be separated. Type 2 is preferred for critical processes where downtime is costly, as only fuse replacement is needed. Type 2 typically requires carefully matched fuses from manufacturer coordination tables and may cost more initially but reduces replacement costs and downtime.'
    },
    {
      question: 'Can I replace an aM fuse with a gG fuse of the same rating?',
      answer: 'No - this is dangerous! aM and gG fuses have fundamentally different characteristics despite potentially having the same current rating. aM fuses are motor-rated and designed to withstand high inrush currents (6-10x rating) without degradation. gG fuses provide full-range protection and will blow on motor starting currents. Replacing aM with gG will likely cause the fuse to blow during motor starting. Conversely, using aM where gG is specified removes overload protection. Always replace fuses with the identical type, rating, and ideally the same manufacturer.'
    },
    {
      question: 'How often should thermal overload relays be tested?',
      answer: 'Testing frequency depends on the criticality of the protected equipment and environmental conditions. As a minimum: annually for standard industrial applications, every 6 months for critical processes or harsh environments, and after any trip event or suspected malfunction. Tests should include: visual inspection for damage/discolouration, checking the set current matches motor FLC x service factor, verifying manual trip and reset operation, and ideally current injection testing to verify trip times. Electronic overloads may have self-test features but should still be manually verified. Document all test results for compliance and trending.'
    },
    {
      question: 'Why does my thermal overload trip in hot weather but not in winter?',
      answer: 'Thermal overload relays are ambient temperature sensitive. The bimetallic elements respond to total heat - both from motor current AND surrounding air temperature. In hot weather, the relay starts warmer and reaches trip temperature faster. Solutions include: 1) Use temperature-compensated overload relays designed to maintain consistent trip characteristics across -20 degrees C to +60 degrees C. 2) Apply ambient temperature correction factors from the manufacturer (typically reducing setting by 5% per 10 degrees C above 40 degrees C). 3) Improve enclosure ventilation. 4) Relocate the overload to a cooler position. Electronic overloads are generally less affected by ambient temperature.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-xs text-muted-foreground">Module 2 &gt; Section 3</span>
        </div>
      </header>

      {/* Title */}
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
          <Thermometer className="w-6 h-6 text-elec-yellow" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Thermal Overloads and Fuses
        </h1>
        <p className="text-muted-foreground">
          Motor circuit protection devices, coordination principles, and testing procedures
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
              Understand thermal overload relay operating principles and types
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Calculate and set thermal overloads correctly using FLC and service factor
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Select appropriate HRC fuses (aM and gG types) for motor circuits
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Understand Type 1 and Type 2 coordination requirements
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Perform testing and replacement procedures for protective devices
            </li>
          </ul>
        </div>

        {/* Section 1: Thermal Overload Relay Principles */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Thermal Overload Relay Principles and Types
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Thermal overload relays protect motors from damage due to sustained overcurrent conditions. Unlike fuses
              which protect against short-circuits, thermal overloads respond to the <strong className="text-foreground">heating effect</strong> of
              current over time, mimicking the motor's own thermal characteristics.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-elec-yellow" />
                Bimetallic Operating Principle
              </h3>
              <p className="text-sm mb-3">
                The most common type uses <strong className="text-foreground">bimetallic strips</strong> - two different metals
                (typically brass and invar) bonded together. When heated by motor current:
              </p>
              <ul className="space-y-1 text-sm">
                <li>&bull; Metals expand at different rates due to different thermal expansion coefficients</li>
                <li>&bull; The strip bends/deflects proportionally to temperature rise</li>
                <li>&bull; At a predetermined deflection, the mechanism trips open auxiliary contacts</li>
                <li>&bull; These contacts break the contactor coil circuit, stopping the motor</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Direct Heated Type</h4>
                <p className="text-sm">
                  Motor current passes directly through the bimetallic element. Simple construction,
                  fast response, but limited to lower currents. Common in small motor starters.
                </p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Indirect Heated Type</h4>
                <p className="text-sm">
                  Current passes through a heater coil wound around the bimetal. Better for higher
                  currents, allows interchangeable heater elements for different ratings.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border-l-2 border-blue-500/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Trip Classes (IEC 60947-4-1)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-white/5 p-3 rounded">
                  <p className="text-elec-yellow font-bold">Class 10A</p>
                  <p>Trips 2-10s @ 7.2x</p>
                  <p className="text-muted-foreground text-xs">Sensitive loads</p>
                </div>
                <div className="bg-white/5 p-3 rounded">
                  <p className="text-elec-yellow font-bold">Class 10</p>
                  <p>Trips 4-10s @ 7.2x</p>
                  <p className="text-muted-foreground text-xs">Standard duty</p>
                </div>
                <div className="bg-white/5 p-3 rounded">
                  <p className="text-elec-yellow font-bold">Class 20</p>
                  <p>Trips 6-20s @ 7.2x</p>
                  <p className="text-muted-foreground text-xs">Medium inertia</p>
                </div>
                <div className="bg-white/5 p-3 rounded">
                  <p className="text-elec-yellow font-bold">Class 30</p>
                  <p>Trips 9-30s @ 7.2x</p>
                  <p className="text-muted-foreground text-xs">High inertia</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Overload Types by Mounting</h4>
              <ul className="space-y-1 text-sm">
                <li>&bull; <strong className="text-foreground">Separate mounting:</strong> Standalone units connected via wiring to contactor</li>
                <li>&bull; <strong className="text-foreground">Direct mounting:</strong> Clips directly onto contactor base - most common industrial type</li>
                <li>&bull; <strong className="text-foreground">Integral:</strong> Built into motor starter/soft starter units</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Setting Thermal Overloads */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Setting Thermal Overloads (FLC and Service Factor)
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Correct overload setting is critical for effective motor protection without nuisance tripping.
              The setting must balance protection against overload damage with allowance for normal operating variations.
            </p>

            <div className="bg-green-500/10 border-l-2 border-green-500/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                Setting Calculation Formula
              </h3>
              <div className="bg-white/5 p-4 rounded text-center">
                <p className="text-xl font-mono text-elec-yellow">
                  Overload Setting = FLC x Service Factor
                </p>
              </div>
              <div className="mt-3 grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">FLC (Full Load Current)</p>
                  <p>Found on motor nameplate - the current drawn when delivering rated output at rated voltage</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Service Factor (SF)</p>
                  <p>Typically 1.0 to 1.15 - allows for temporary overloads during normal operation</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Worked Example</h4>
              <div className="space-y-2 text-sm font-mono bg-white/5 p-4 rounded">
                <p>Motor nameplate data:</p>
                <p className="text-elec-yellow">&bull; Full Load Current (FLC) = 15.8A</p>
                <p className="text-elec-yellow">&bull; Service Factor (SF) = 1.15</p>
                <p className="mt-2">Calculation:</p>
                <p className="text-green-400">Overload Setting = 15.8A x 1.15 = 18.17A</p>
                <p className="mt-2 text-muted-foreground">Set the overload dial to 18.2A (nearest available setting)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Service Factor Guidelines</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; <strong className="text-elec-yellow">SF = 1.0:</strong> Continuous duty, no overload expected</li>
                  <li>&bull; <strong className="text-elec-yellow">SF = 1.05:</strong> Light intermittent overloads</li>
                  <li>&bull; <strong className="text-elec-yellow">SF = 1.10:</strong> Moderate duty cycles</li>
                  <li>&bull; <strong className="text-elec-yellow">SF = 1.15:</strong> Heavy duty, frequent starting</li>
                </ul>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Adjustment Dial Types</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; <strong className="text-elec-yellow">Ampere scale:</strong> Set directly in amps</li>
                  <li>&bull; <strong className="text-elec-yellow">Percentage scale:</strong> % of heater rating</li>
                  <li>&bull; <strong className="text-elec-yellow">Numbered positions:</strong> Refer to data table</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 border-l-2 border-orange-500/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Ambient Temperature Compensation
              </h4>
              <p className="text-sm">
                Standard thermal overloads are calibrated at 40 degrees C ambient. For every 10 degrees C above 40 degrees C,
                reduce the setting by approximately 5%. Temperature-compensated overloads automatically
                adjust and are recommended for installations subject to wide temperature variations.
              </p>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Reset Modes</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-elec-yellow font-medium">Manual Reset</p>
                  <p>Requires physical button press - safer, ensures fault investigation before restart</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium">Automatic Reset</p>
                  <p>Resets after cooling period - only for non-critical applications with supervision</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: HRC Fuses for Motor Circuits */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            HRC Fuses for Motor Circuits (aM and gG Types)
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              High Rupturing Capacity (HRC) fuses provide short-circuit protection in motor circuits. The correct
              fuse type selection is essential - motors have unique characteristics (high starting currents) that
              require specific fuse types to avoid nuisance blowing while maintaining protection.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-elec-yellow" />
                BS 88 Fuse Standard
              </h3>
              <p className="text-sm mb-3">
                BS 88 (British Standard for cartridge fuses) defines fuse characteristics. Key designations:
              </p>
              <ul className="space-y-1 text-sm">
                <li>&bull; <strong className="text-foreground">BS 88-2:</strong> Fuses for industrial applications (up to 1250A)</li>
                <li>&bull; <strong className="text-foreground">BS 88-3:</strong> Fuses for domestic applications</li>
                <li>&bull; <strong className="text-foreground">BS 88-4:</strong> Fuses for semiconductor protection</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border-l-2 border-red-500/50 rounded-r-lg p-4">
                <h4 className="font-medium text-red-400 mb-2">gG Fuses (General Purpose)</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; <strong className="text-foreground">Full range:</strong> Protects against both overloads and short-circuits</li>
                  <li>&bull; <strong className="text-foreground">Characteristic:</strong> Will blow at lower multiples of rating</li>
                  <li>&bull; <strong className="text-foreground">Application:</strong> Cable protection, distribution boards</li>
                  <li>&bull; <strong className="text-red-400">NOT suitable for motor circuits</strong> - will blow on starting current</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border-l-2 border-green-500/50 rounded-r-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">aM Fuses (Motor Rated)</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; <strong className="text-foreground">Back-up:</strong> Short-circuit protection only</li>
                  <li>&bull; <strong className="text-foreground">Characteristic:</strong> Withstands high inrush currents (6-10x rating)</li>
                  <li>&bull; <strong className="text-foreground">Application:</strong> Motor circuits with separate overload protection</li>
                  <li>&bull; <strong className="text-green-400">DESIGNED for motor starting currents</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Fuse Selection for Motor Circuits</h4>
              <div className="space-y-2 text-sm">
                <p><strong className="text-elec-yellow">Rule of thumb for aM fuses:</strong></p>
                <div className="bg-white/5 p-3 rounded font-mono">
                  <p>Fuse Rating = Motor FLC x 1.5 to 2.0 (for DOL starting)</p>
                  <p>Fuse Rating = Motor FLC x 1.0 to 1.5 (for star-delta starting)</p>
                </div>
                <p className="mt-3 text-muted-foreground">
                  Always verify selection against manufacturer coordination tables for Type 2 coordination.
                </p>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Common BS 88-2 Fuse Ratings</h4>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-sm text-center">
                {['2A', '4A', '6A', '10A', '16A', '20A', '25A', '32A', '40A', '50A', '63A', '80A', '100A', '125A', '160A', '200A'].map((rating) => (
                  <div key={rating} className="bg-white/5 p-2 rounded text-elec-yellow">
                    {rating}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Ratings follow the R10 preferred number series. Breaking capacity typically 80kA at 415V AC.
              </p>
            </div>

            <div className="bg-blue-500/10 border-l-2 border-blue-500/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Fuse Marking Example</h4>
              <div className="bg-white/5 p-3 rounded font-mono text-center">
                <p className="text-xl text-elec-yellow">32M40 or 32aM40</p>
              </div>
              <p className="text-sm mt-2">
                32 = Current rating (32A) | M or aM = Motor type | 40 = Voltage rating (x10V = 400V)
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Coordination Between Fuses and Overloads */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Coordination Between Fuses and Overloads
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Coordination ensures that the correct protective device operates for each fault type, while
              minimizing damage to starter components. IEC 60947-4-1 defines two coordination types.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-500/10 border-l-2 border-orange-500/50 rounded-r-lg p-4">
                <h4 className="font-medium text-orange-400 mb-2">Type 1 Coordination</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; <strong className="text-foreground">Requirement:</strong> No danger to persons</li>
                  <li>&bull; <strong className="text-foreground">Permitted damage:</strong> Contactor and overload may be damaged beyond repair</li>
                  <li>&bull; <strong className="text-foreground">After fault:</strong> Complete starter replacement may be needed</li>
                  <li>&bull; <strong className="text-foreground">Cost:</strong> Lower initial fuse cost</li>
                  <li>&bull; <strong className="text-foreground">Application:</strong> Non-critical, easily replaceable systems</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border-l-2 border-green-500/50 rounded-r-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">Type 2 Coordination</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; <strong className="text-foreground">Requirement:</strong> No danger + starter remains operational</li>
                  <li>&bull; <strong className="text-foreground">Permitted damage:</strong> Contact welding only (must be separable)</li>
                  <li>&bull; <strong className="text-foreground">After fault:</strong> Replace fuse only, check contacts</li>
                  <li>&bull; <strong className="text-foreground">Cost:</strong> Higher initial cost, lower lifecycle cost</li>
                  <li>&bull; <strong className="text-foreground">Application:</strong> Critical processes, high availability systems</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Protection Zones</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">ZONE 1</div>
                  <div>
                    <p className="font-medium text-foreground">Overload Region (100% - ~600% FLC)</p>
                    <p>Thermal overload relay operates - inverse time characteristic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">ZONE 2</div>
                  <div>
                    <p className="font-medium text-foreground">Transition Region (~600% - 1000% FLC)</p>
                    <p>Either device may operate - coordination critical here</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">ZONE 3</div>
                  <div>
                    <p className="font-medium text-foreground">Short-Circuit Region (&gt;1000% FLC)</p>
                    <p>Fuse must operate before contactor/overload damage threshold</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Achieving Type 2 Coordination</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Use manufacturer's coordination tables - never guess fuse sizes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Match fuse brand/type to contactor/overload brand where possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Fuse I squared t let-through must be less than contactor/overload withstand</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Consider prospective fault current at installation point</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-elec-yellow" />
                I squared t Let-Through Energy
              </h4>
              <p className="text-sm">
                I squared t (Joule integral) represents the thermal energy let through by the fuse during fault clearance.
                For Type 2 coordination, the fuse I squared t must be less than the contactor's thermal withstand capability.
                Manufacturer tables provide maximum fuse ratings for each contactor frame size based on I squared t matching.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Electronic Overload Protection */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Electronic Overload Protection
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Electronic overload relays use current transformers and microprocessor technology to provide more
              accurate, adjustable, and feature-rich motor protection compared to thermal types.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border-l-2 border-green-500/50 rounded-r-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">Advantages</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; Adjustable trip class (10/20/30) via switch/software</li>
                  <li>&bull; Better accuracy (+/- 5% vs +/- 20% for thermal)</li>
                  <li>&bull; Less affected by ambient temperature</li>
                  <li>&bull; Phase loss/imbalance detection included</li>
                  <li>&bull; Ground fault protection option</li>
                  <li>&bull; Thermal memory - remembers motor heating</li>
                  <li>&bull; Communication capability (Modbus, etc.)</li>
                  <li>&bull; Diagnostic LEDs and fault indicators</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border-l-2 border-red-500/50 rounded-r-lg p-4">
                <h4 className="font-medium text-red-400 mb-2">Considerations</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; Higher initial cost</li>
                  <li>&bull; Requires control voltage supply</li>
                  <li>&bull; More complex setup/programming</li>
                  <li>&bull; May require specialist knowledge</li>
                  <li>&bull; Electronic components can fail</li>
                  <li>&bull; Susceptible to electrical noise (EMC)</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Key Electronic Overload Features</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow font-medium">Phase Loss Detection</p>
                  <p>Trips if any phase current drops below 60% of average - prevents single-phasing damage</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium">Phase Imbalance Detection</p>
                  <p>Trips if phases differ by more than set % (typically 20-50% adjustable)</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium">Thermal Model</p>
                  <p>Mathematical simulation of motor heating/cooling for accurate protection</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium">Starts Per Hour Limit</p>
                  <p>Prevents motor overheating from excessive starting cycles</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Operating Principle</h4>
              <div className="space-y-2 text-sm">
                <p><strong className="text-elec-yellow">1. Current Sensing:</strong> CTs on each phase measure motor current</p>
                <p><strong className="text-elec-yellow">2. Signal Processing:</strong> Microprocessor calculates RMS values</p>
                <p><strong className="text-elec-yellow">3. Thermal Algorithm:</strong> I squared t calculation models motor heating</p>
                <p><strong className="text-elec-yellow">4. Trip Decision:</strong> Compares calculated thermal state to limits</p>
                <p><strong className="text-elec-yellow">5. Output:</strong> Relay contacts open when limits exceeded</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border-l-2 border-blue-500/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                Typical Settings on Electronic Overloads
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-white/5 p-2 rounded">
                  <p className="text-elec-yellow">FLC Setting</p>
                  <p className="text-muted-foreground">0.4-1.0 x nominal</p>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <p className="text-elec-yellow">Trip Class</p>
                  <p className="text-muted-foreground">10/20/30</p>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <p className="text-elec-yellow">Reset Mode</p>
                  <p className="text-muted-foreground">Manual/Auto</p>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <p className="text-elec-yellow">Phase Loss</p>
                  <p className="text-muted-foreground">On/Off</p>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <p className="text-elec-yellow">Ground Fault</p>
                  <p className="text-muted-foreground">0.1-1.0A</p>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <p className="text-elec-yellow">Imbalance</p>
                  <p className="text-muted-foreground">20-50%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Testing and Replacement Procedures */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Testing and Replacement Procedures
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Regular testing ensures protective devices operate correctly when needed. Both thermal and
              electronic overloads require periodic verification, while fuses need proper handling and
              replacement procedures.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-elec-yellow" />
                Thermal Overload Testing
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white/5 p-3 rounded">
                  <p className="text-elec-yellow font-medium">Visual Inspection</p>
                  <ul className="mt-1 space-y-1">
                    <li>&bull; Check for signs of overheating or discolouration</li>
                    <li>&bull; Verify dial setting matches motor FLC x SF</li>
                    <li>&bull; Ensure mounting is secure and terminals tight</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-3 rounded">
                  <p className="text-elec-yellow font-medium">Functional Test</p>
                  <ul className="mt-1 space-y-1">
                    <li>&bull; Operate manual trip button - contacts should open</li>
                    <li>&bull; Verify reset mechanism functions correctly</li>
                    <li>&bull; Check auxiliary contact operation with multimeter</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-3 rounded">
                  <p className="text-elec-yellow font-medium">Current Injection Test</p>
                  <ul className="mt-1 space-y-1">
                    <li>&bull; Inject 6x set current through all three phases</li>
                    <li>&bull; Time to trip should be within class limits</li>
                    <li>&bull; Allow cooling time before re-testing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Trip Time Verification Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-2 text-elec-yellow">Test Current</th>
                      <th className="text-left p-2 text-elec-yellow">Class 10</th>
                      <th className="text-left p-2 text-elec-yellow">Class 20</th>
                      <th className="text-left p-2 text-elec-yellow">Class 30</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="p-2">1.05 x setting</td>
                      <td className="p-2">No trip in 2 hours</td>
                      <td className="p-2">No trip in 2 hours</td>
                      <td className="p-2">No trip in 2 hours</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-2">1.20 x setting</td>
                      <td className="p-2">Trip within 2 hours</td>
                      <td className="p-2">Trip within 2 hours</td>
                      <td className="p-2">Trip within 2 hours</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-2">7.2 x setting</td>
                      <td className="p-2">4-10 seconds</td>
                      <td className="p-2">6-20 seconds</td>
                      <td className="p-2">9-30 seconds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-2">HRC Fuse Inspection</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; Visual check for cracks or damage to ceramic body</li>
                  <li>&bull; Check end caps for corrosion or overheating marks</li>
                  <li>&bull; Verify correct rating for circuit (check labelling)</li>
                  <li>&bull; Use fuse puller for removal - never bare hands</li>
                  <li>&bull; Continuity test to verify fuse is intact</li>
                </ul>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Fuse Replacement Procedure</h4>
                <ul className="space-y-1 text-sm">
                  <li>&bull; Isolate supply and prove dead</li>
                  <li>&bull; Remove blown fuse with appropriate puller</li>
                  <li>&bull; Verify replacement is identical type AND rating</li>
                  <li>&bull; Check fuse carrier/contacts for damage</li>
                  <li>&bull; Insert new fuse ensuring proper seating</li>
                  <li>&bull; Investigate and record cause of failure</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border-l-2 border-red-500/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Safety Warnings
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Never replace a fuse with a higher rating - defeats protection coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Never bypass a thermal overload - motor damage will result</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Always investigate cause before resetting/replacing protective devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Allow thermal overloads to cool before resetting (typically 2-3 minutes)</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Documenting Test Results</h4>
              <p className="text-sm">
                Record all test results including: date, equipment ID, set current value, test current applied,
                measured trip time, pass/fail status, and technician name. This data enables trend analysis
                to identify deteriorating protection devices before failure.
              </p>
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
              <h3 className="font-medium text-foreground mb-2 border-b border-white/10 pb-1">Key Formulas</h3>
              <div className="space-y-1 font-mono text-muted-foreground">
                <p>&bull; <strong className="text-elec-yellow">Overload Setting:</strong> FLC x Service Factor</p>
                <p>&bull; <strong className="text-elec-yellow">aM Fuse (DOL):</strong> FLC x 1.5 to 2.0</p>
                <p>&bull; <strong className="text-elec-yellow">aM Fuse (S-D):</strong> FLC x 1.0 to 1.5</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2 border-b border-white/10 pb-1">Trip Class Times @ 7.2x</h3>
              <div className="space-y-1 text-muted-foreground">
                <p>&bull; <strong className="text-elec-yellow">Class 10A:</strong> 2-10 seconds</p>
                <p>&bull; <strong className="text-elec-yellow">Class 10:</strong> 4-10 seconds</p>
                <p>&bull; <strong className="text-elec-yellow">Class 20:</strong> 6-20 seconds</p>
                <p>&bull; <strong className="text-elec-yellow">Class 30:</strong> 9-30 seconds</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2 border-b border-white/10 pb-1">Fuse Types</h3>
              <div className="space-y-1 text-muted-foreground">
                <p>&bull; <strong className="text-elec-yellow">gG:</strong> General purpose (overload + short-circuit)</p>
                <p>&bull; <strong className="text-elec-yellow">aM:</strong> Motor (short-circuit only, high inrush)</p>
                <p>&bull; <strong className="text-elec-yellow">aR:</strong> Semiconductor protection</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2 border-b border-white/10 pb-1">Coordination Types</h3>
              <div className="space-y-1 text-muted-foreground">
                <p>&bull; <strong className="text-elec-yellow">Type 1:</strong> Damage permitted, replacement needed</p>
                <p>&bull; <strong className="text-elec-yellow">Type 2:</strong> Welding only, starter stays operational</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <h3 className="font-medium text-foreground mb-2">BS 88-2 Common Ratings</h3>
            <p className="text-sm text-muted-foreground">
              2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630A
            </p>
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
              sectionId="section-3"
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-black hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-2/section-4">
              Next: Emergency Stops
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule2Section3;
