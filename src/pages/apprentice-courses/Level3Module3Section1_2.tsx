import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Quantities and Units - Level 3 Module 3 Section 1.2";
const DESCRIPTION = "Learn the fundamental electrical quantities - voltage, current, resistance, power and energy - their SI units and how they relate to each other.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the SI unit of electrical potential difference?",
    options: [
      "Ampere",
      "Ohm",
      "Volt",
      "Watt"
    ],
    correctIndex: 2,
    explanation: "The volt (V) is the SI unit of electrical potential difference (voltage). It's defined as one joule of energy per coulomb of charge. Named after Alessandro Volta, inventor of the first battery."
  },
  {
    id: "check-2",
    question: "One ampere represents the flow of how many electrons per second?",
    options: [
      "1 electron",
      "1,000 electrons",
      "6.24 x 10^18 electrons",
      "1 million electrons"
    ],
    correctIndex: 2,
    explanation: "One ampere equals one coulomb per second. A coulomb is approximately 6.24 x 10^18 electrons. This enormous number shows why we don't count individual electrons - we measure charge in coulombs instead."
  },
  {
    id: "check-3",
    question: "What quantity does the joule measure?",
    options: [
      "Power",
      "Energy",
      "Current",
      "Resistance"
    ],
    correctIndex: 1,
    explanation: "The joule (J) is the SI unit of energy. One joule equals one watt-second. In electrical terms, 1 joule = 1 volt x 1 ampere x 1 second. The kilowatt-hour (3.6 million joules) is used for billing purposes."
  },
  {
    id: "check-4",
    question: "What is the relationship between power and energy?",
    options: [
      "Power is energy multiplied by time",
      "Power is energy divided by time",
      "Energy is power divided by time",
      "They are the same thing"
    ],
    correctIndex: 1,
    explanation: "Power is the rate of energy transfer - energy divided by time. P = E/t. A 1000W device uses 1000 joules every second. This is why a high-power device used briefly might use less energy than a low-power device used for hours."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following correctly represents one kilovolt?",
    options: ["0.001V", "100V", "1000V", "1,000,000V"],
    correctAnswer: 2,
    explanation: "The prefix 'kilo' means thousand, so 1kV = 1000V. Understanding SI prefixes is essential - you'll encounter kV on high-voltage equipment and mV when measuring small signals."
  },
  {
    id: 2,
    question: "What is the SI base unit that electrical current is derived from?",
    options: ["The volt", "The ampere is itself a base unit", "The ohm", "The coulomb"],
    correctAnswer: 1,
    explanation: "The ampere is one of the seven SI base units. It was redefined in 2019 in terms of the elementary charge of an electron. Other electrical units like the volt and ohm are derived from base units."
  },
  {
    id: 3,
    question: "A device consumes 500W for 2 hours. How much energy does it use in kilowatt-hours?",
    options: ["250kWh", "1000kWh", "1kWh", "0.25kWh"],
    correctAnswer: 2,
    explanation: "Energy = Power x Time. 500W = 0.5kW. Energy = 0.5kW x 2h = 1kWh. This is how electricity bills are calculated - you pay for energy (kWh) not power (kW)."
  },
  {
    id: 4,
    question: "What does the unit 'siemens' measure?",
    options: ["Resistance", "Conductance", "Capacitance", "Inductance"],
    correctAnswer: 1,
    explanation: "The siemens (S) measures electrical conductance - the reciprocal of resistance. Conductance G = 1/R. A 10 ohm resistor has a conductance of 0.1 siemens. It's used in parallel circuit calculations."
  },
  {
    id: 5,
    question: "How many milliamperes are in 2.5 amperes?",
    options: ["0.0025mA", "25mA", "250mA", "2500mA"],
    correctAnswer: 3,
    explanation: "Milli means one-thousandth, so 1A = 1000mA. Therefore, 2.5A = 2500mA. Converting between units is essential for reading instrument displays and interpreting specifications."
  },
  {
    id: 6,
    question: "The volt is defined as:",
    options: [
      "One coulomb per second",
      "One joule per coulomb",
      "One watt per ampere",
      "One ohm per ampere"
    ],
    correctAnswer: 1,
    explanation: "One volt equals one joule of energy per coulomb of charge (1V = 1J/C). This definition links electrical units to mechanical energy units, showing that voltage represents energy per unit charge."
  },
  {
    id: 7,
    question: "What is the correct symbol for electrical charge?",
    options: ["A", "V", "Q", "I"],
    correctAnswer: 2,
    explanation: "Electrical charge uses the symbol Q and is measured in coulombs (C). Current (I) is the rate of charge flow: I = Q/t. This is why we sometimes see charge expressed as ampere-hours in battery ratings."
  },
  {
    id: 8,
    question: "A resistor is marked as 4.7k ohms. What is this in ohms?",
    options: ["0.0047 ohms", "47 ohms", "470 ohms", "4700 ohms"],
    correctAnswer: 3,
    explanation: "The 'k' prefix means kilo (x1000), so 4.7k ohms = 4700 ohms. Resistor colour codes and SMD markings often use these prefixes. Learn to convert fluently between forms."
  },
  {
    id: 9,
    question: "One watt is equivalent to:",
    options: [
      "One volt times one ohm",
      "One joule per second",
      "One ampere per volt",
      "One coulomb per second"
    ],
    correctAnswer: 1,
    explanation: "One watt equals one joule per second (1W = 1J/s). Power is the rate of energy transfer. This is why running a 100W lamp for 10 seconds uses 1000 joules of energy."
  },
  {
    id: 10,
    question: "What is the relationship between coulombs, amperes and seconds?",
    options: [
      "Coulombs = Amperes / Seconds",
      "Coulombs = Amperes x Seconds",
      "Amperes = Coulombs x Seconds",
      "Seconds = Coulombs x Amperes"
    ],
    correctAnswer: 1,
    explanation: "Charge (Q) = Current (I) x Time (t), so Coulombs = Amperes x Seconds. This is why battery capacity is often given in ampere-hours - multiply by 3600 to get coulombs."
  }
];

const faqs = [
  {
    question: "Why do we use kilowatt-hours instead of joules for electricity bills?",
    answer: "Joules are impractically small for household energy measurement. One kWh equals 3.6 million joules. Using kWh gives sensible numbers - a typical UK home uses about 3000-4000kWh per year. Imagine the bill showing 10+ billion joules instead!"
  },
  {
    question: "What's the difference between voltage and EMF?",
    answer: "Electromotive force (EMF) is the energy provided per unit charge by a source like a battery or generator. Voltage (potential difference) is the energy transferred per unit charge between two points. EMF is the 'push' at the source; voltage is measured across components. In practice, terminal voltage is slightly less than EMF due to internal resistance."
  },
  {
    question: "Why is the ampere a base unit but the volt isn't?",
    answer: "The SI system chose the ampere as a base unit because current was historically easier to define precisely using the force between parallel conductors. Since 2019, it's defined by fixing the elementary charge value. The volt is then derived from other units: 1V = 1W/A = 1J/C = 1kg.m squared.s to the power of -3.A to the power of -1."
  },
  {
    question: "How does electrical energy relate to mechanical energy?",
    answer: "They're fundamentally the same thing - both measured in joules. One joule is the energy needed to lift 102 grams by one metre against gravity, or to pass one ampere through one ohm for one second, or to light a 1W LED for one second. Energy conversions between forms are central to electrical work."
  },
  {
    question: "What's the difference between AC and DC when measuring voltage and current?",
    answer: "DC values are straightforward - the voltage or current is constant. AC values vary continuously, so we typically measure RMS (root mean square) values, which represent the equivalent DC value that would produce the same heating effect. A 230V RMS supply actually peaks at about 325V."
  }
];

const Level3Module3Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Voltage (V):</strong> Electrical pressure - measured in volts</li>
              <li><strong>Current (I):</strong> Electron flow rate - measured in amperes</li>
              <li><strong>Resistance (R):</strong> Opposition to flow - measured in ohms</li>
              <li><strong>Power (P):</strong> Rate of energy use - measured in watts</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Unit symbols on nameplates, meters, and specifications</li>
              <li><strong>Use:</strong> Converting between prefixes (mA, kV, MW)</li>
              <li><strong>Apply:</strong> Matching equipment ratings to supply characteristics</li>
            </ul>
          </div>
        </div>

        

        

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Voltage - The Driving Force
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage, also called potential difference or electromotive force (EMF), is the electrical 'pressure' that pushes current through a circuit. It's measured in volts (V), named after Alessandro Volta. One volt is the potential difference that will move one joule of energy with each coulomb of charge that passes.
            </p>
            <p>
              Think of voltage like water pressure in a pipe. Higher pressure pushes more water through a given pipe diameter. Similarly, higher voltage pushes more current through a given resistance. The UK mains supply is nominally 230V - this is the 'push' available to drive current through your circuits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Voltage Levels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>230V AC:</strong> UK single-phase mains supply</li>
                <li><strong>400V AC:</strong> UK three-phase supply (line-to-line)</li>
                <li><strong>12V DC:</strong> Automotive systems, low-voltage lighting</li>
                <li><strong>11kV/33kV:</strong> Distribution network voltages</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Voltage exists between two points - it's always a difference. Saying 'the voltage at this point' actually means the voltage between that point and a reference (usually earth/neutral).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Current - The Flow of Charge
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current is the rate of flow of electrical charge, measured in amperes (A). One ampere represents one coulomb of charge passing a point per second. In practical terms, this is roughly 6.24 x 10^18 electrons flowing past every second - an incomprehensibly large number that shows why we measure charge rather than counting electrons.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conventional vs Electron Flow</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Conventional current: positive to negative</li>
                  <li>Electron flow: negative to positive</li>
                  <li>Both are correct - convention established before electron discovery</li>
                  <li>Most electrical work uses conventional current</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Ranges You'll Encounter</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Microamps:</strong> Electronic sensors, body current</li>
                  <li><strong>Milliamps:</strong> LEDs, control circuits</li>
                  <li><strong>Amps:</strong> Most installation work</li>
                  <li><strong>Kiloamps:</strong> Fault currents, main switchgear</li>
                </ul>
              </div>
            </div>

            <p>
              Current is what actually does the work and causes the danger. A current of just 30mA through the heart can be fatal, which is why RCDs trip at this level. Circuit breakers protect against overcurrent that could cause fires.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Resistance, Power and Energy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Resistance opposes current flow and is measured in ohms. Power is the rate of energy transfer, measured in watts. Energy is the total amount of electrical work done, measured in joules or, more practically, kilowatt-hours (kWh).
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 3kW immersion heater running for 2 hours uses 6kWh of energy (3kW x 2h). At 30p per kWh, that's £1.80. The same heater running for just 10 minutes uses 0.5kWh - only 15p. Same power, different energy consumption based on time.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Power-Energy Relationship:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power (P):</strong> How fast energy is used (watts = joules/second)</li>
                <li><strong>Energy (E):</strong> Total amount used (joules or kWh)</li>
                <li><strong>Formula:</strong> E = P x t (energy = power x time)</li>
                <li><strong>Conversion:</strong> 1 kWh = 3,600,000 joules</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            SI Prefixes and Unit Conversions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SI prefixes allow us to express very large or very small values conveniently. You'll constantly encounter kilo (k = 1000), milli (m = 0.001), and mega (M = 1,000,000) in electrical work. Being fluent in conversions prevents costly calculation errors.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Mega (M)</p>
                <p className="text-white/90 text-xs">x 1,000,000</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Kilo (k)</p>
                <p className="text-white/90 text-xs">x 1,000</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Milli (m)</p>
                <p className="text-white/90 text-xs">x 0.001</p>
              </div>
            </div>

            <p>
              Watch out for case sensitivity: 'm' is milli (1/1000) but 'M' is mega (1,000,000). Writing 'mA' when you mean 'MA' is a factor of one billion difference! Similarly, 'k' is always lowercase for kilo.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Pro tip:</strong> When calculating, convert everything to base units first (volts, amps, ohms, watts), do the calculation, then convert the answer to a sensible prefix. This prevents errors from mixing prefixes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check equipment voltage ratings match supply voltage</li>
                <li>Verify current ratings of protective devices match cable capacity</li>
                <li>Calculate expected load in amps before sizing circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Select the correct meter range for expected values</li>
                <li>Note whether readings are in mA, A, mV, V etc.</li>
                <li>Insulation resistance is measured in megohms - don't confuse with ohms</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Confusing power and energy</strong> - A 100W lamp and a 1000W heater might use the same energy if the heater runs for 1/10th the time</li>
                <li><strong>Mixing up prefixes</strong> - 2.5mA is not the same as 2.5A - it's 1000 times smaller</li>
                <li><strong>Forgetting unit conversions</strong> - 2.3kW must become 2300W before using in calculations with amps and volts</li>
              </ul>
            </div>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Quantities and Units</p>
                <ul className="space-y-0.5">
                  <li>Voltage (V) - volts</li>
                  <li>Current (I) - amperes</li>
                  <li>Resistance (R) - ohms</li>
                  <li>Power (P) - watts</li>
                  <li>Energy (E) - joules or kWh</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">SI Prefixes</p>
                <ul className="space-y-0.5">
                  <li>Mega (M) = x 1,000,000</li>
                  <li>Kilo (k) = x 1,000</li>
                  <li>Milli (m) = x 0.001</li>
                  <li>Micro (u) = x 0.000001</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Ohm's Law
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section1-3">
              Next: Measurement Instruments
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module3Section1_2;
