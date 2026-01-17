import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "SI Units and Conversions - Level 3 Module 3 Section 1.5";
const DESCRIPTION = "Master the International System of Units and converting between different electrical units for accurate calculations and specifications.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "How many microfarads are in 1 nanofarad?",
    options: [
      "1000 uF",
      "0.001 uF",
      "0.000001 uF",
      "1,000,000 uF"
    ],
    correctIndex: 1,
    explanation: "Nano is 10^-9 and micro is 10^-6, so nano is 1000 times smaller than micro. 1nF = 0.001uF. This conversion is common with capacitors where you might see the same value written either way."
  },
  {
    id: "check-2",
    question: "What is 2.5 megohms expressed in kilohms?",
    options: [
      "2500 kohms",
      "0.0025 kohms",
      "25 kohms",
      "250 kohms"
    ],
    correctIndex: 0,
    explanation: "Mega is 10^6 and kilo is 10^3, so mega is 1000 times larger than kilo. 2.5M ohms = 2.5 x 1000 k ohms = 2500k ohms. Insulation resistance is often expressed in megohms for convenience."
  },
  {
    id: "check-3",
    question: "Which of these is a correct SI unit symbol?",
    options: [
      "KW (for kilowatt)",
      "mA (for milliampere)",
      "sec (for second)",
      "KHz (for kilohertz)"
    ],
    correctIndex: 1,
    explanation: "Only 'mA' is correct. Kilo is lowercase 'k' (not K), the second is 's' (not sec), and kilohertz is 'kHz'. Getting symbols right matters - 'M' is mega (million) while 'm' is milli (thousandth)."
  },
  {
    id: "check-4",
    question: "A current of 50mA flows for 2 hours. How many coulombs of charge have passed?",
    options: [
      "100 C",
      "0.1 C",
      "360 C",
      "3600 C"
    ],
    correctIndex: 2,
    explanation: "Q = It, but ensure consistent units. 50mA = 0.05A, 2 hours = 7200 seconds. Q = 0.05 x 7200 = 360 coulombs. Always convert to base units before calculating."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What prefix represents 10^-6?",
    options: ["Milli", "Micro", "Nano", "Pico"],
    correctAnswer: 1,
    explanation: "Micro (symbol: u or mu) represents 10^-6 or one millionth. Common in electrical work for microfarads (uF) and microamps (uA). Remember: milli (10^-3), micro (10^-6), nano (10^-9), pico (10^-12)."
  },
  {
    id: 2,
    question: "Convert 0.00047 farads to microfarads:",
    options: ["4.7 uF", "47 uF", "470 uF", "4700 uF"],
    correctAnswer: 2,
    explanation: "0.00047F = 0.00047 x 10^6 uF = 470uF. Move the decimal point 6 places to the right when converting to micro. Large electrolytic capacitors are often rated in hundreds of microfarads."
  },
  {
    id: 3,
    question: "Which expression equals 1 ohm in base SI units?",
    options: ["V/A", "A/V", "V x A", "kg.m squared.s to the power of -3.A to the power of -2"],
    correctAnswer: 3,
    explanation: "While V/A is the practical definition, the base SI unit expression is kg.m squared.s to the power of -3.A to the power of -2. This shows how electrical units derive from the seven base SI units (metre, kilogram, second, ampere, kelvin, mole, candela)."
  },
  {
    id: 4,
    question: "A cable carries 15A for 8 hours. Express the charge transferred in ampere-hours and coulombs:",
    options: ["120Ah = 432,000C", "15Ah = 54,000C", "120Ah = 43,200C", "1.875Ah = 6750C"],
    correctAnswer: 0,
    explanation: "Charge in Ah = I x t = 15A x 8h = 120Ah. To convert to coulombs: 120Ah x 3600 s/h = 432,000C. Battery capacities use Ah; scientific calculations often need coulombs."
  },
  {
    id: 5,
    question: "What is the correct way to write fifteen thousand watts?",
    options: ["15KW", "15kW", "15Kw", "15 kw"],
    correctAnswer: 1,
    explanation: "The correct form is 15kW. 'k' for kilo is always lowercase, 'W' for watt is always uppercase (named after James Watt). No space between number and unit in SI notation."
  },
  {
    id: 6,
    question: "Convert 330 nF to picofarads:",
    options: ["0.33 pF", "3.3 pF", "33,000 pF", "330,000 pF"],
    correctAnswer: 3,
    explanation: "Nano is 10^-9, pico is 10^-12. Pico is 1000 times smaller, so multiply by 1000. 330nF = 330 x 1000 pF = 330,000pF. Component markings often use different prefix conventions."
  },
  {
    id: 7,
    question: "A motor runs at 1450 rpm. Express this in SI units (rad/s):",
    options: ["151.8 rad/s", "24.2 rad/s", "1450 rad/s", "9110 rad/s"],
    correctAnswer: 0,
    explanation: "RPM isn't an SI unit. Convert: 1450 rpm x (2 x pi rad/revolution) x (1 min/60s) = 151.8 rad/s. The SI unit for angular velocity is radians per second."
  },
  {
    id: 8,
    question: "What is 47k ohms in scientific notation?",
    options: ["4.7 x 10^3 ohms", "47 x 10^3 ohms", "4.7 x 10^4 ohms", "0.47 x 10^5 ohms"],
    correctAnswer: 2,
    explanation: "47k ohms = 47,000 ohms. In proper scientific notation, one digit before the decimal: 4.7 x 10^4 ohms. While 47 x 10^3 is numerically correct, it's not standard scientific notation."
  },
  {
    id: 9,
    question: "Energy of 3.6 MJ equals how many kWh?",
    options: ["0.1 kWh", "1 kWh", "10 kWh", "3600 kWh"],
    correctAnswer: 1,
    explanation: "1 kWh = 1000W x 3600s = 3,600,000J = 3.6MJ. So 3.6MJ = 1kWh. This conversion is essential - scientific work uses joules, but electricity billing uses kWh."
  },
  {
    id: 10,
    question: "A specification states '10^-3 S'. What is this in common units?",
    options: ["1 ohm", "1000 ohms", "1 millisiemens", "1 microsiemens"],
    correctAnswer: 2,
    explanation: "10^-3 S = 1mS (one millisiemens). Siemens is the unit of conductance (reciprocal of resistance). 1mS conductance equals 1000 ohms resistance. Conductance is used in parallel circuit calculations."
  }
];

const faqs = [
  {
    question: "Why do we use SI units instead of other systems?",
    answer: "SI (Systeme International) provides a coherent, universal system understood worldwide. It eliminates confusion between different national systems and enables clear technical communication. Electrical standards, regulations, and equipment specifications all use SI units. Using consistent units also simplifies calculations - no awkward conversion factors needed."
  },
  {
    question: "When should I use engineering notation vs scientific notation?",
    answer: "Engineering notation uses powers of 10 in multiples of 3 (10^3, 10^6, 10^-3, etc.), matching SI prefixes. Scientific notation uses any power of 10. Engineering notation is more practical for electrical work because 4.7 x 10^3 ohms immediately converts to 4.7k ohms. Use engineering notation for everyday work, scientific notation for very large or small numbers."
  },
  {
    question: "How do I remember the order of SI prefixes?",
    answer: "For large numbers: kilo, mega, giga, tera (King Henry Died Drinking Chocolate Milk - skip H and D). For small: milli, micro, nano, pico (Moving Microbes Need Protection). The key sequence for electrical work is: pico (10^-12), nano (10^-9), micro (10^-6), milli (10^-3), base, kilo (10^3), mega (10^6)."
  },
  {
    question: "Why is the kilogram the base unit for mass, not the gram?",
    answer: "Historical accident, essentially. When the SI system was formalised, the kilogram was already established as the practical unit. Redefining everything would have caused massive disruption. This does create an oddity - the kilogram is the only base unit with a prefix. In 2019, it was redefined in terms of Planck's constant rather than a physical artefact."
  },
  {
    question: "What's the difference between upper and lowercase in unit symbols?",
    answer: "Generally, units named after people have capital letters (V for Volta, A for Ampere, W for Watt, Hz for Hertz), while other units are lowercase (m for metre, s for second). Prefixes are lowercase for small (m, u, n, p) and uppercase for large (M for mega, G for giga), except kilo which is lowercase k. This matters - 'mA' is milliamp but 'MA' would be megaamp!"
  }
];

const Level3Module3Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            SI Units and Conversions
          </h1>
          <p className="text-white/80">
            The international language of measurement
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Base units:</strong> metre, kilogram, second, ampere, kelvin, mole, candela</li>
              <li><strong>Derived units:</strong> volt, ohm, watt, hertz, farad, henry</li>
              <li><strong>Prefixes:</strong> pico, nano, micro, milli, kilo, mega, giga</li>
              <li><strong>Key skill:</strong> Convert to base units before calculating</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Unit symbols on equipment, prefix notation on components</li>
              <li><strong>Use:</strong> Convert between prefixes without errors</li>
              <li><strong>Apply:</strong> Match units in calculations for correct results</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the seven SI base units and key derived units",
              "Convert fluently between SI prefixes",
              "Use correct unit symbols and notation",
              "Apply dimensional analysis to check calculations",
              "Convert between common non-SI and SI units",
              "Express quantities in engineering notation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The SI System Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The International System of Units (SI) is built on seven base units from which all other units derive. For electrical work, the most important base unit is the ampere (current). The volt, ohm, watt, and other electrical units are derived from combinations of base units.
            </p>
            <p>
              Understanding how units relate helps check your calculations. If your answer comes out in the wrong units, you've made an error somewhere. This dimensional analysis catches many mistakes before they cause problems on site.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Electrical Units and Their Derivations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Volt (V):</strong> W/A = J/C = kg.m squared.s to the power of -3.A to the power of -1</li>
                <li><strong>Ohm:</strong> V/A = kg.m squared.s to the power of -3.A to the power of -2</li>
                <li><strong>Watt (W):</strong> V.A = J/s = kg.m squared.s to the power of -3</li>
                <li><strong>Farad (F):</strong> C/V = A squared.s to the power of 4.kg to the power of -1.m to the power of -2</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> When in doubt, break units down to their base components. If both sides of your equation don't have the same base units, something is wrong.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            SI Prefixes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SI prefixes allow convenient expression of very large or small quantities. In electrical work, you'll regularly use kilo (k = 10^3), mega (M = 10^6), milli (m = 10^-3), micro (u = 10^-6), and nano (n = 10^-9). Fluent conversion between these is essential.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Large Prefixes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>kilo (k):</strong> 10^3 = 1,000</li>
                  <li><strong>mega (M):</strong> 10^6 = 1,000,000</li>
                  <li><strong>giga (G):</strong> 10^9 = 1,000,000,000</li>
                  <li><strong>tera (T):</strong> 10^12</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Small Prefixes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>milli (m):</strong> 10^-3 = 0.001</li>
                  <li><strong>micro (u):</strong> 10^-6 = 0.000001</li>
                  <li><strong>nano (n):</strong> 10^-9</li>
                  <li><strong>pico (p):</strong> 10^-12</li>
                </ul>
              </div>
            </div>

            <p>
              Watch the case sensitivity: lowercase 'm' is milli (10^-3) but uppercase 'M' is mega (10^6) - a factor of one billion difference! The prefix for kilo is always lowercase 'k', never uppercase.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Practical Conversions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Converting between prefixes is straightforward once you understand the principle: each step of three in the exponent (or factor of 1000) moves you one prefix. When converting to a smaller prefix, multiply; to a larger prefix, divide.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Convert 0.0033A to milliamps. Moving from base units to milli means multiplying by 1000 (or moving decimal 3 places right). 0.0033A = 3.3mA. For microamps, multiply by 1000 again: 3.3mA = 3300uA.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Conversions in Electrical Work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1kWh:</strong> 1000Wh = 3,600,000J = 3.6MJ</li>
                <li><strong>1Ah:</strong> 3600C (ampere-hours to coulombs)</li>
                <li><strong>1uF:</strong> 1000nF = 1,000,000pF</li>
                <li><strong>1M ohm:</strong> 1000k ohms = 1,000,000 ohms</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Calculation Best Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The safest approach for calculations is to convert all values to base units first, perform the calculation, then convert the result to a sensible prefix. This eliminates errors from mixing prefixes and makes unit checking straightforward.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Step 1</p>
                <p className="text-white/90 text-xs">Convert all values to base SI units</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Step 2</p>
                <p className="text-white/90 text-xs">Perform calculation, check unit dimensions</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Step 3</p>
                <p className="text-white/90 text-xs">Convert result to practical prefix</p>
              </div>
            </div>

            <p>
              Engineering notation (powers of 10 in multiples of 3) aligns with SI prefixes and makes conversion easy. Express 47,000 ohms as 47 x 10^3 ohms, immediately recognisable as 47k ohms. This is more practical than scientific notation (4.7 x 10^4 ohms) for everyday electrical work.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Pro tip:</strong> When checking calculations, verify your answer is reasonable. If you calculate cable current as 1 million amps or a domestic voltage drop as 100V, you've made a unit error somewhere. Develop intuition for typical values.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use standard SI unit symbols, correctly capitalised</li>
                <li>Choose prefixes that give values between 0.1 and 1000</li>
                <li>Be consistent within a document or specification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Calculating</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Convert to base units before starting calculations</li>
                <li>Track units through each step as a check</li>
                <li>Verify final answer is in expected range</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing prefixes in calculations</strong> - Convert everything to the same prefix or base units first</li>
                <li><strong>Wrong case for symbols</strong> - mA is milliamps, MA would be megaamps (wrong)</li>
                <li><strong>Forgetting kWh conversion</strong> - 1kWh is NOT 1000J, it's 3,600,000J</li>
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
                <p className="font-medium text-white mb-1">Prefix Values</p>
                <ul className="space-y-0.5">
                  <li>G (giga) = 10^9</li>
                  <li>M (mega) = 10^6</li>
                  <li>k (kilo) = 10^3</li>
                  <li>m (milli) = 10^-3</li>
                  <li>u (micro) = 10^-6</li>
                  <li>n (nano) = 10^-9</li>
                  <li>p (pico) = 10^-12</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Conversions</p>
                <ul className="space-y-0.5">
                  <li>1 kWh = 3.6 MJ</li>
                  <li>1 Ah = 3600 C</li>
                  <li>1 uF = 1000 nF</li>
                  <li>1 M ohm = 1000 k ohms</li>
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
            <Link to="/study-centre/apprentice/level3-module3-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Accuracy and Tolerances
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section2">
              Next: Section 2 - RLC Circuits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module3Section1_5;
