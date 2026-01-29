import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Starting Methods - HNC Module 8 Section 4.2";
const DESCRIPTION = "Master motor starting methods for HVAC applications: DOL starting, star-delta starters, autotransformer starters, soft starters, starting current considerations and voltage drop calculations for building services.";

const quickCheckQuestions = [
  {
    id: "dol-current",
    question: "What is the typical starting current for a DOL (Direct On Line) starter expressed as a multiple of Full Load Current (FLC)?",
    options: ["2-3 times FLC", "4-5 times FLC", "6-8 times FLC", "10-12 times FLC"],
    correctIndex: 2,
    explanation: "DOL starters apply full voltage directly to the motor terminals, resulting in starting currents typically 6-8 times the Full Load Current (FLC). This high inrush current can cause voltage dips on the supply system and may exceed supply authority limits."
  },
  {
    id: "star-delta-reduction",
    question: "By what factor does star-delta starting reduce the starting current compared to DOL starting?",
    options: ["Reduces by 50% (half)", "Reduces by 67% (one-third)", "Reduces by 75% (one-quarter)", "Reduces by 25% (three-quarters)"],
    correctIndex: 1,
    explanation: "Star-delta starting reduces the starting current to approximately one-third (33%) of the DOL starting current. This is because the line current in star connection is 1/√3 times the delta current, and this reduction applies twice during the voltage transformation."
  },
  {
    id: "soft-starter-principle",
    question: "How does a soft starter reduce motor starting current?",
    options: ["By switching between star and delta connections", "By using an autotransformer to reduce voltage", "By gradually increasing the applied voltage using thyristors", "By inserting resistance in the motor circuit"],
    correctIndex: 2,
    explanation: "Soft starters use thyristor (SCR) technology to gradually increase the voltage applied to the motor from a reduced initial value to full voltage. This controlled voltage ramp limits the starting current whilst providing smooth acceleration."
  },
  {
    id: "voltage-drop-limit",
    question: "What is the typical maximum permissible voltage drop during motor starting according to BS 7671 guidance?",
    options: ["2%", "4%", "6%", "10%"],
    correctIndex: 2,
    explanation: "BS 7671 recommends that voltage drop during motor starting should not exceed 6% to prevent disturbance to other connected equipment. Some supply authorities may impose stricter limits depending on the installation location and supply characteristics."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main disadvantage of DOL (Direct On Line) starting for large motors?",
    options: [
      "Complex control circuitry required",
      "High starting current causing voltage dips and supply disturbance",
      "Slow motor acceleration",
      "Requires special motor windings"
    ],
    correctAnswer: 1,
    explanation: "DOL starting draws 6-8 times FLC, which can cause significant voltage dips affecting other equipment and may exceed supply authority limits for larger motors."
  },
  {
    id: 2,
    question: "In a star-delta starter, during the star connection phase, the voltage applied to each motor winding is:",
    options: [
      "Full line voltage (400V)",
      "Line voltage divided by √3 (approximately 230V)",
      "Half the line voltage (200V)",
      "Double the line voltage (800V)"
    ],
    correctAnswer: 1,
    explanation: "In star connection, each winding receives line voltage divided by √3 (VL/√3 = 400/1.732 = 231V), reducing both voltage and current to approximately 58% of delta values."
  },
  {
    id: 3,
    question: "What is the starting torque reduction when using star-delta starting compared to DOL?",
    options: [
      "Starting torque is reduced to one-half",
      "Starting torque is reduced to one-third",
      "Starting torque is reduced to one-quarter",
      "Starting torque remains the same"
    ],
    correctAnswer: 1,
    explanation: "Star-delta starting reduces starting torque to approximately one-third of DOL torque, as torque is proportional to voltage squared. This limits its use to applications with low starting torque requirements."
  },
  {
    id: 4,
    question: "What happens during the transition from star to delta in a star-delta starter?",
    options: [
      "The motor smoothly accelerates without interruption",
      "A brief current spike occurs as the motor reconnects in delta",
      "The motor decelerates before resuming acceleration",
      "The starting current gradually increases"
    ],
    correctAnswer: 1,
    explanation: "During star-delta transition, there is a momentary disconnection causing a current transient (spike) as the motor reconnects in delta. Closed-transition starters can minimise this effect."
  },
  {
    id: 5,
    question: "An autotransformer starter set to 65% tap will reduce the starting current to approximately:",
    options: [
      "65% of DOL starting current",
      "42% of DOL starting current",
      "35% of DOL starting current",
      "85% of DOL starting current"
    ],
    correctAnswer: 1,
    explanation: "The starting current reduction with an autotransformer is proportional to the square of the tap setting. At 65% tap: (0.65)² = 0.42 or 42% of DOL starting current."
  },
  {
    id: 6,
    question: "Which starting method provides the smoothest acceleration and is most suitable for pumps and fans?",
    options: [
      "DOL starter",
      "Star-delta starter",
      "Autotransformer starter",
      "Soft starter"
    ],
    correctAnswer: 3,
    explanation: "Soft starters provide continuously variable voltage control, resulting in smooth, stepless acceleration ideal for pumps (preventing water hammer) and fans (reducing mechanical stress)."
  },
  {
    id: 7,
    question: "What is the typical starting current range when using a properly configured soft starter?",
    options: [
      "1.5-2 times FLC",
      "2-4 times FLC",
      "5-6 times FLC",
      "6-8 times FLC"
    ],
    correctAnswer: 1,
    explanation: "Soft starters typically limit starting current to 2-4 times FLC by controlling the voltage ramp. The exact value depends on the load characteristics and acceleration time setting."
  },
  {
    id: 8,
    question: "For a 75kW motor with FLC of 140A, what would be the approximate starting current with DOL starting?",
    options: [
      "280-420A",
      "420-700A",
      "840-1120A",
      "1400-1680A"
    ],
    correctAnswer: 2,
    explanation: "DOL starting current = 6-8 × FLC = 6-8 × 140A = 840A to 1120A. This high current may require reduced voltage starting methods for larger installations."
  },
  {
    id: 9,
    question: "Which factor determines the maximum motor size that can be started DOL on a given supply?",
    options: [
      "Motor efficiency rating",
      "Prospective fault current and voltage drop limits",
      "Motor insulation class",
      "Ambient temperature"
    ],
    correctAnswer: 1,
    explanation: "The maximum DOL motor size is limited by the supply's ability to handle the starting current without excessive voltage drop and by supply authority agreements regarding maximum starting current."
  },
  {
    id: 10,
    question: "What advantage does closed-transition star-delta starting offer over open-transition?",
    options: [
      "Lower cost and simpler installation",
      "Reduced current spike during star-delta transition",
      "Higher starting torque",
      "Faster motor acceleration"
    ],
    correctAnswer: 1,
    explanation: "Closed-transition star-delta starters maintain motor connection through resistors or capacitors during transition, reducing the current spike that occurs in open-transition starters."
  },
  {
    id: 11,
    question: "When would an autotransformer starter be preferred over star-delta starting?",
    options: [
      "When the motor has only 3 terminals available",
      "When minimum cost is the priority",
      "When the motor runs continuously at light load",
      "When the motor has 6 accessible terminals"
    ],
    correctAnswer: 0,
    explanation: "Autotransformer starters work with any three-phase motor regardless of terminal configuration, whereas star-delta requires 6 accessible terminals. This makes autotransformer starters suitable for motors with internal connections."
  },
  {
    id: 12,
    question: "What is the primary consideration when selecting a starting method for centrifugal pumps?",
    options: [
      "Maximum starting speed",
      "Lowest initial cost",
      "Prevention of water hammer through gradual acceleration",
      "Highest starting torque"
    ],
    correctAnswer: 2,
    explanation: "Centrifugal pumps benefit from gradual acceleration to prevent water hammer (pressure surges) in pipework. Soft starters are ideal for this application due to their smooth, adjustable acceleration profile."
  }
];

const faqs = [
  {
    question: "When should I use DOL starting versus reduced voltage starting?",
    answer: "DOL starting is appropriate for small motors (typically up to 7.5kW on most supplies) where the starting current does not cause excessive voltage drop or exceed supply authority limits. Reduced voltage starting (star-delta, autotransformer, or soft starter) should be used for larger motors, when voltage drop is a concern, when smooth acceleration is required, or when the supply authority imposes starting current restrictions. Always verify with the supply authority for motors exceeding 5.5kW to confirm acceptable starting arrangements."
  },
  {
    question: "How do I calculate voltage drop during motor starting?",
    answer: "Voltage drop during starting can be estimated using: ΔV% = (Istart × Zcable × 100) / Vsupply, where Istart is the starting current, Zcable is the total cable impedance to the motor, and Vsupply is the nominal supply voltage. For accurate calculations, include the source impedance (transformer and supply cable). BS 7671 recommends keeping starting voltage drop below 6% to prevent disturbance to other equipment. Software tools and manufacturer data can provide more precise calculations for complex installations."
  },
  {
    question: "What are the advantages of soft starters over star-delta starters?",
    answer: "Soft starters offer several advantages: adjustable starting current and acceleration time, smooth acceleration without transition current spikes, built-in motor protection features (thermal, phase loss, earth fault), soft stop capability to prevent water hammer in pump applications, reduced mechanical stress on drive components, and smaller physical size. However, soft starters are more expensive and generate heat during starting due to thyristor conduction losses. Star-delta remains cost-effective for simple applications where the transition transient is acceptable."
  },
  {
    question: "Can I retrofit a soft starter to an existing DOL installation?",
    answer: "Yes, soft starters can often retrofit existing DOL installations with minimal modifications. The soft starter replaces the existing contactor arrangement, using the same cable and motor. Key considerations include: physical space in the panel (soft starters require adequate cooling), thermal derating for enclosed panels, compatibility with existing protection systems, and programming for the specific load characteristics. Many modern soft starters include bypass contactors to eliminate running losses after the motor reaches full speed."
  },
  {
    question: "How does motor starting affect power factor?",
    answer: "During starting, motors draw high reactive current at a poor power factor (typically 0.3-0.4 lagging). This reactive current increases apparent power demand and can affect power factor correction equipment. With DOL starting, the poor power factor period is short but intense. Reduced voltage starting methods extend the starting period but at lower current magnitude. For installations with power factor correction capacitors, ensure capacitors are not switched during motor starting to prevent resonance and voltage transients."
  },
  {
    question: "What starting method is best for HVAC applications?",
    answer: "HVAC applications typically benefit from soft starters due to: smooth acceleration reducing mechanical stress on fans and belts, prevention of water hammer in chilled water and heating systems, adjustable acceleration times matching system requirements, energy monitoring capabilities for building management integration, and reduced electrical stress on the supply. For smaller HVAC motors (up to 4kW), DOL is acceptable. Star-delta can be used for larger fans and pumps where the reduced starting torque is sufficient, but soft starters are increasingly preferred for their additional features and smoother operation."
  }
];

const HNCModule8Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Starting Methods
          </h1>
          <p className="text-white/80">
            DOL, star-delta, autotransformer, soft starters and starting current considerations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DOL:</strong> 6-8× FLC starting current, simplest method</li>
              <li className="pl-1"><strong>Star-Delta:</strong> Reduces current to 1/3 of DOL</li>
              <li className="pl-1"><strong>Autotransformer:</strong> Adjustable voltage taps</li>
              <li className="pl-1"><strong>Soft Starter:</strong> Smooth ramp, 2-4× FLC typical</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">HVAC Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Pumps:</strong> Soft start prevents water hammer</li>
              <li className="pl-1"><strong>Fans:</strong> Reduced mechanical stress on belts</li>
              <li className="pl-1"><strong>Chillers:</strong> Staggered starting for demand limit</li>
              <li className="pl-1"><strong>Voltage drop:</strong> Keep below 6% during start</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principles of DOL, star-delta and autotransformer starters",
              "Calculate starting currents for different starting methods",
              "Describe soft starter operation and thyristor voltage control",
              "Assess voltage drop impact on supply systems during motor starting",
              "Select appropriate starting methods for HVAC applications",
              "Apply BS 7671 requirements for motor starting considerations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: DOL Starting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Direct On Line (DOL) Starting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Direct On Line (DOL) starting is the simplest and most economical method of starting
              three-phase induction motors. The motor is connected directly to the full supply voltage
              at the instant of starting, resulting in maximum starting torque but also maximum starting current.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DOL Starting Characteristics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Starting current:</strong> 6-8 times Full Load Current (FLC) - this high inrush occurs because motor impedance is low at standstill</li>
                <li className="pl-1"><strong>Starting torque:</strong> 150-300% of Full Load Torque (FLT) - maximum available torque for any starting method</li>
                <li className="pl-1"><strong>Acceleration time:</strong> Typically 2-10 seconds depending on motor and load inertia</li>
                <li className="pl-1"><strong>Application limit:</strong> Usually restricted to motors up to 7.5kW on standard supplies</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Simple construction and low cost</li>
                  <li className="pl-1">Maximum starting torque available</li>
                  <li className="pl-1">Compact panel space requirement</li>
                  <li className="pl-1">Easy maintenance and troubleshooting</li>
                  <li className="pl-1">No transition disturbance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disadvantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">High starting current (6-8× FLC)</li>
                  <li className="pl-1">Voltage dip on supply system</li>
                  <li className="pl-1">Mechanical shock to driven equipment</li>
                  <li className="pl-1">May exceed supply authority limits</li>
                  <li className="pl-1">Limited to smaller motors</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Starting Current Calculation</p>
              <div className="text-sm space-y-2">
                <p><strong>DOL starting current = Motor FLC × Starting current multiplier</strong></p>
                <p className="text-white/70">Example: 15kW motor with FLC of 28A and 7× starting multiplier:</p>
                <p>I<sub>start</sub> = 28A × 7 = <strong>196A</strong></p>
                <p className="text-white/70 mt-2">This current flows until the motor reaches approximately 80% of full speed.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DOL Starter Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rating Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main contactor</td>
                      <td className="border border-white/10 px-3 py-2">Switches motor supply on/off</td>
                      <td className="border border-white/10 px-3 py-2">AC-3 rated for motor FLC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal overload</td>
                      <td className="border border-white/10 px-3 py-2">Protects against sustained overload</td>
                      <td className="border border-white/10 px-3 py-2">Set to motor FLC (trip class 10-30)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Short circuit device</td>
                      <td className="border border-white/10 px-3 py-2">Protects against fault currents</td>
                      <td className="border border-white/10 px-3 py-2">MCCB or fuses (type gG or aM)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolator</td>
                      <td className="border border-white/10 px-3 py-2">Safe isolation for maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Rated for motor FLC minimum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Supply authority requirements:</strong> For motors exceeding 5.5kW, always check with the
              Distribution Network Operator (DNO) regarding acceptable starting arrangements. They may impose
              restrictions on starting current magnitude and frequency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Star-Delta Starting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Star-Delta Starting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Star-delta starting is a widely used reduced voltage starting method that reduces
              starting current to approximately one-third of DOL values. The motor windings are
              initially connected in star configuration, then switched to delta for normal running.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Principle</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white/90 mb-2">Star Connection (Starting)</p>
                  <ul className="text-sm space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Winding voltage = V<sub>L</sub>/√3 (230V from 400V supply)</li>
                    <li className="pl-1">Line current = Phase current</li>
                    <li className="pl-1">Starting current ≈ 33% of DOL starting current</li>
                    <li className="pl-1">Starting torque ≈ 33% of DOL starting torque</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90 mb-2">Delta Connection (Running)</p>
                  <ul className="text-sm space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Winding voltage = V<sub>L</sub> (400V)</li>
                    <li className="pl-1">Line current = √3 × Phase current</li>
                    <li className="pl-1">Full voltage applied to windings</li>
                    <li className="pl-1">Normal running performance achieved</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Star-Delta Mathematics</p>
              <div className="bg-black/30 p-4 rounded-lg space-y-2 text-sm font-mono">
                <p className="text-white/60">Current reduction factor:</p>
                <p>I<sub>star</sub> = I<sub>DOL</sub> × (1/√3)² = I<sub>DOL</sub> × <strong>1/3</strong></p>
                <p className="text-white/60 mt-3">Torque reduction factor:</p>
                <p>T<sub>star</sub> = T<sub>DOL</sub> × (V<sub>star</sub>/V<sub>delta</sub>)² = T<sub>DOL</sub> × <strong>1/3</strong></p>
                <p className="text-white/60 mt-3">Example: Motor with 7× DOL starting current:</p>
                <p>Star starting current = 7 × FLC × 1/3 = <strong>2.33 × FLC</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transition Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Operation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current Spike</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open transition</td>
                      <td className="border border-white/10 px-3 py-2">Motor disconnected briefly during changeover</td>
                      <td className="border border-white/10 px-3 py-2">High spike (can reach 8-10× FLC)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Closed transition</td>
                      <td className="border border-white/10 px-3 py-2">Resistors maintain connection during changeover</td>
                      <td className="border border-white/10 px-3 py-2">Reduced spike (2-4× FLC)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Suitable Applications</p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Centrifugal pumps and fans (low starting torque)</li>
                  <li className="pl-1">Compressors with unloaded start</li>
                  <li className="pl-1">Motors with light starting loads</li>
                  <li className="pl-1">Applications where 1/3 torque is sufficient</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Unsuitable Applications</p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Conveyor belts (high breakaway torque)</li>
                  <li className="pl-1">Crushers and mills (loaded start)</li>
                  <li className="pl-1">Positive displacement pumps</li>
                  <li className="pl-1">Any load requiring &gt;33% starting torque</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Motor Requirements</p>
              <p className="text-sm text-white">
                Star-delta starting requires motors with <strong>6 accessible terminals</strong> (both ends of
                each winding brought out). The motor must be rated for delta connection at the supply voltage
                (e.g., 400V delta for a 400V supply). Motors wound for 400V star/690V delta cannot be used
                with star-delta starting on a 400V supply.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Timing consideration:</strong> The star-delta transition timer should be set to allow
              the motor to reach at least 75-80% of full speed before switching to delta. Too early transition
              causes high current spikes; too late wastes energy and extends acceleration time.
            </p>
          </div>
        </section>

        {/* Section 3: Autotransformer Starting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Autotransformer Starting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Autotransformer starters provide reduced voltage starting using tapped autotransformers
              to supply the motor at a reduced voltage during starting. This method offers flexibility
              in selecting the voltage reduction level and works with any three-phase motor.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Principle</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Three-phase autotransformer connected during starting</li>
                <li className="pl-1">Typical voltage taps: 50%, 65%, 80% of line voltage</li>
                <li className="pl-1">Motor receives reduced voltage from transformer secondary</li>
                <li className="pl-1">After acceleration, transformer bypassed and full voltage applied</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Current and Torque Relationships</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono space-y-2">
                <p className="text-white/60">Line current reduction (from supply):</p>
                <p>I<sub>line</sub> = I<sub>DOL</sub> × (Tap setting)²</p>
                <p className="text-white/60 mt-2">Motor current (at reduced voltage):</p>
                <p>I<sub>motor</sub> = I<sub>DOL</sub> × Tap setting</p>
                <p className="text-white/60 mt-2">Starting torque:</p>
                <p>T<sub>start</sub> = T<sub>DOL</sub> × (Tap setting)²</p>
                <p className="mt-3 text-white/60">Example at 65% tap:</p>
                <p>Line current = DOL × 0.65² = <strong>42% of DOL</strong></p>
                <p>Starting torque = DOL × 0.65² = <strong>42% of DOL</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Tap Settings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Tap Setting</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Line Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Torque</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">25% of DOL</td>
                      <td className="border border-white/10 px-3 py-2">25% of DOL</td>
                      <td className="border border-white/10 px-3 py-2">Very light starting loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">65%</td>
                      <td className="border border-white/10 px-3 py-2">42% of DOL</td>
                      <td className="border border-white/10 px-3 py-2">42% of DOL</td>
                      <td className="border border-white/10 px-3 py-2">Fans, centrifugal pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">64% of DOL</td>
                      <td className="border border-white/10 px-3 py-2">64% of DOL</td>
                      <td className="border border-white/10 px-3 py-2">Moderate starting loads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Works with any 3-terminal motor</li>
                  <li className="pl-1">Adjustable voltage reduction (tap selection)</li>
                  <li className="pl-1">Higher starting torque than star-delta at same current</li>
                  <li className="pl-1">Lower line current than motor current</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disadvantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher cost than star-delta</li>
                  <li className="pl-1">Larger physical size (transformers)</li>
                  <li className="pl-1">Transition current spike (open transition)</li>
                  <li className="pl-1">More complex than DOL or star-delta</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Autotransformer starters are particularly useful when retrofitting
              reduced voltage starting to existing motors that have only 3 terminals (internal star or delta
              connection) and cannot use star-delta starting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Soft Starters */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Soft Starters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Soft starters use power electronics (thyristors/SCRs) to provide continuously variable
              voltage control during motor starting and stopping. This technology offers superior
              control over starting characteristics compared to electromechanical methods.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Principle</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Thyristor control:</strong> Back-to-back thyristor pairs in each phase control voltage by phase-angle firing</li>
                <li className="pl-1"><strong>Voltage ramp:</strong> Applied voltage gradually increases from initial value (typically 30-50%) to full voltage</li>
                <li className="pl-1"><strong>Ramp time:</strong> Adjustable from 1-60 seconds depending on application requirements</li>
                <li className="pl-1"><strong>Current limiting:</strong> Maximum starting current can be set (typically 2-4× FLC)</li>
                <li className="pl-1"><strong>Soft stop:</strong> Gradual voltage reduction for controlled deceleration</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Initial voltage</td>
                      <td className="border border-white/10 px-3 py-2">30-70% of V<sub>L</sub></td>
                      <td className="border border-white/10 px-3 py-2">Starting point for voltage ramp</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ramp time</td>
                      <td className="border border-white/10 px-3 py-2">1-60 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Duration of voltage increase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current limit</td>
                      <td className="border border-white/10 px-3 py-2">150-500% FLC</td>
                      <td className="border border-white/10 px-3 py-2">Maximum starting current allowed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soft stop time</td>
                      <td className="border border-white/10 px-3 py-2">0-60 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Controlled deceleration period</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Smooth, stepless acceleration</li>
                  <li className="pl-1">Adjustable starting current and time</li>
                  <li className="pl-1">Soft stop prevents water hammer</li>
                  <li className="pl-1">Built-in motor protection features</li>
                  <li className="pl-1">No transition current spikes</li>
                  <li className="pl-1">Compact compared to autotransformers</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="text-sm font-medium text-amber-400 mb-2">Considerations</p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Higher initial cost than star-delta</li>
                  <li className="pl-1">Heat generation during starting</li>
                  <li className="pl-1">Requires cooling considerations</li>
                  <li className="pl-1">Harmonics during starting phase</li>
                  <li className="pl-1">Reduced starting torque at low voltage</li>
                  <li className="pl-1">Programming required for optimisation</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">HVAC Applications</p>
              <div className="text-sm space-y-2">
                <p><strong>Centrifugal pumps:</strong> Soft start (5-15 seconds) prevents water hammer, soft stop (10-30 seconds)
                prevents reverse flow surge. Current limit typically 300-350% FLC.</p>
                <p><strong>Supply fans:</strong> Extended ramp time (10-20 seconds) reduces belt stress and prevents
                duct pressure surges. Initial voltage 40-50% for smooth breakaway.</p>
                <p><strong>Chillers:</strong> Soft starters enable staggered starting of multiple compressors,
                managing electrical demand and preventing simultaneous inrush.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bypass Contactors</p>
              <p className="text-sm text-white">
                Many soft starters include internal or external bypass contactors that engage once the motor
                reaches full speed. This removes the thyristors from the circuit during running, eliminating
                conduction losses (typically 1-2% of motor power) and reducing heat generation. The soft
                starter remains ready to provide soft stop when required.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> When specifying soft starters, consider the duty cycle (starts per hour),
              ambient temperature, and enclosure type. Derate the soft starter capacity for high-frequency starting
              or elevated ambient temperatures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Starting Current Impact and Voltage Drop */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Starting Current Impact and Voltage Drop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              High motor starting currents cause voltage drops in the supply system that can affect
              other connected equipment. Understanding and calculating these effects is essential
              for selecting appropriate starting methods and ensuring system compatibility.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Effects of Excessive Voltage Drop</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lighting:</strong> Visible flicker causing occupant complaints</li>
                <li className="pl-1"><strong>IT equipment:</strong> Potential data corruption or system resets</li>
                <li className="pl-1"><strong>Other motors:</strong> Reduced torque, possible stalling</li>
                <li className="pl-1"><strong>Control systems:</strong> Contactor dropout, relay malfunction</li>
                <li className="pl-1"><strong>Starting motor:</strong> Extended acceleration time, possible failure to start</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop Calculation</p>
              <div className="bg-black/30 p-4 rounded-lg space-y-2 text-sm font-mono">
                <p className="text-white/60">Simplified voltage drop formula:</p>
                <p>ΔV = I<sub>start</sub> × Z<sub>total</sub></p>
                <p className="text-white/60 mt-2">Percentage voltage drop:</p>
                <p>ΔV% = (I<sub>start</sub> × Z<sub>total</sub> × 100) / V<sub>supply</sub></p>
                <p className="text-white/60 mt-3">Where Z<sub>total</sub> includes:</p>
                <p>- Supply transformer impedance</p>
                <p>- Distribution cable impedance</p>
                <p>- Final circuit cable impedance</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop Limits</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard/Authority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Voltage Drop Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS 7671 guidance</td>
                      <td className="border border-white/10 px-3 py-2">6% maximum</td>
                      <td className="border border-white/10 px-3 py-2">Transient condition during starting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DNO requirements</td>
                      <td className="border border-white/10 px-3 py-2">3-6% (varies)</td>
                      <td className="border border-white/10 px-3 py-2">Check with local DNO</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensitive equipment</td>
                      <td className="border border-white/10 px-3 py-2">&lt;3%</td>
                      <td className="border border-white/10 px-3 py-2">IT, medical, process control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Voltage Drop Assessment</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono">
                <p className="text-white/60">Given:</p>
                <p>22kW motor, FLC = 42A, 7× starting current multiplier</p>
                <p>Supply: 400V, transformer 500kVA, 4% impedance</p>
                <p>Cable: 50m of 16mm² (Z = 0.022Ω/m)</p>
                <p className="mt-2 text-white/60">Calculate DOL starting voltage drop:</p>
                <p>I<sub>start</sub> = 42 × 7 = 294A</p>
                <p>Z<sub>transformer</sub> = (400² × 0.04) / 500,000 = 0.0128Ω</p>
                <p>Z<sub>cable</sub> = 50 × 0.022 = 1.1Ω (simplified)</p>
                <p>ΔV = 294 × (0.0128 + 0.0011) = 4.1V from transformer</p>
                <p>ΔV% at motor = approx. <strong>5-7%</strong> (detailed calc. required)</p>
                <p className="mt-2 text-amber-400">Result: Reduced voltage starting recommended</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Starting Method Selection Based on Current</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Motor Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Starting Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Approximate Starting Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;7.5kW</td>
                      <td className="border border-white/10 px-3 py-2">DOL</td>
                      <td className="border border-white/10 px-3 py-2">6-8× FLC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7.5-30kW</td>
                      <td className="border border-white/10 px-3 py-2">Star-delta or Soft starter</td>
                      <td className="border border-white/10 px-3 py-2">2-4× FLC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30-75kW</td>
                      <td className="border border-white/10 px-3 py-2">Soft starter preferred</td>
                      <td className="border border-white/10 px-3 py-2">2-3× FLC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;75kW</td>
                      <td className="border border-white/10 px-3 py-2">Soft starter or VSD</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2.5× FLC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> For critical installations, perform detailed voltage drop
              calculations including supply impedance data from the DNO. Consider power factor correction
              and its interaction with motor starting currents.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Comparing Starting Methods</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare starting currents for a 37kW motor (FLC = 70A, 7× DOL multiplier)
                using different starting methods.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">DOL Starting:</p>
                <p>I<sub>start</sub> = 70A × 7 = <strong>490A</strong></p>
                <p className="mt-2 text-white/60">Star-Delta Starting:</p>
                <p>I<sub>start</sub> = 490A × 1/3 = <strong>163A</strong></p>
                <p className="mt-2 text-white/60">Autotransformer (65% tap):</p>
                <p>I<sub>start</sub> = 490A × 0.65² = <strong>207A</strong></p>
                <p className="mt-2 text-white/60">Soft Starter (300% limit):</p>
                <p>I<sub>start</sub> = 70A × 3 = <strong>210A</strong></p>
                <p className="mt-3 text-green-400">All reduced voltage methods achieve significant current reduction</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Pump Starting Method Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select starting method for a 15kW chilled water pump. Requirements:
                prevent water hammer, supply authority limits starting current to 100A.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Motor data:</p>
                <p>15kW, FLC = 28A, DOL starting = 7× = 196A</p>
                <p className="mt-2 text-white/60">Assessment:</p>
                <p>DOL: 196A &gt; 100A limit - NOT SUITABLE</p>
                <p>Star-delta: 196/3 = 65A &lt; 100A - Current OK</p>
                <p>But: Open transition spike, no soft stop for water hammer</p>
                <p className="mt-2 text-white/60">Soft starter assessment:</p>
                <p>Set current limit to 350%: 28 × 3.5 = 98A &lt; 100A</p>
                <p>Soft stop capability prevents water hammer</p>
                <p>Ramp time 10-15 seconds for smooth acceleration</p>
                <p className="mt-2 text-green-400">Recommendation: Soft starter with 350% current limit, 15s ramp, 20s soft stop</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Supply Assessment for Multiple Motors</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> HVAC plant room with 3 × 22kW motors. Can they all start DOL on a
                200kVA transformer with 5% impedance?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Motor data (each):</p>
                <p>22kW, FLC = 42A, Starting = 7 × 42 = 294A</p>
                <p className="mt-2 text-white/60">Transformer capacity:</p>
                <p>200kVA at 400V = 289A rated current</p>
                <p>Single motor starting (294A) exceeds transformer rating!</p>
                <p className="mt-2 text-white/60">Solution options:</p>
                <p>1. Upgrade transformer to 400kVA minimum</p>
                <p>2. Use soft starters with 200% current limit (84A each)</p>
                <p>3. Implement sequential starting with time delays</p>
                <p>4. Star-delta starting (98A each)</p>
                <p className="mt-2 text-green-400">Recommended: Soft starters with staggered starting sequence (60s intervals)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Starting Method Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Determine motor size and FLC from nameplate or manufacturer data</li>
                <li className="pl-1">Calculate DOL starting current (typically 6-8× FLC)</li>
                <li className="pl-1">Check supply authority requirements for maximum starting current</li>
                <li className="pl-1">Assess voltage drop impact on other connected equipment</li>
                <li className="pl-1">Consider load characteristics (starting torque requirement)</li>
                <li className="pl-1">Evaluate need for soft stop (pumps, conveyors)</li>
                <li className="pl-1">Check motor terminal configuration (3 or 6 terminals)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">DOL starting current: <strong>6-8× FLC</strong></li>
                <li className="pl-1">Star-delta current reduction: <strong>1/3 of DOL</strong></li>
                <li className="pl-1">Star-delta torque reduction: <strong>1/3 of DOL</strong></li>
                <li className="pl-1">Autotransformer reduction: <strong>(tap%)² of DOL</strong></li>
                <li className="pl-1">Soft starter typical limit: <strong>2-4× FLC</strong></li>
                <li className="pl-1">Maximum starting voltage drop: <strong>6%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong motor winding:</strong> Using star-delta with 400V star motor on 400V supply</li>
                <li className="pl-1"><strong>Premature transition:</strong> Star-delta timer set too short causing high spike</li>
                <li className="pl-1"><strong>Insufficient torque:</strong> Using star-delta for high-torque loads</li>
                <li className="pl-1"><strong>Ignoring soft stop:</strong> Not utilising soft stop for pump applications</li>
                <li className="pl-1"><strong>Under-sizing soft starter:</strong> Not accounting for starting duty cycle</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Starting Methods</p>
                <ul className="space-y-0.5">
                  <li>DOL: 6-8× FLC, 150-300% torque, simple</li>
                  <li>Star-Delta: 1/3 current, 1/3 torque, 6 terminals</li>
                  <li>Autotransformer: (tap%)² reduction, any motor</li>
                  <li>Soft Starter: 2-4× FLC, smooth ramp, soft stop</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Selection Guidelines</p>
                <ul className="space-y-0.5">
                  <li>&lt;7.5kW: DOL usually acceptable</li>
                  <li>7.5-30kW: Star-delta or soft starter</li>
                  <li>&gt;30kW: Soft starter recommended</li>
                  <li>Pumps/fans: Soft starter for smooth control</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4-3">
              Next: Variable Speed Drives
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section4_2;
