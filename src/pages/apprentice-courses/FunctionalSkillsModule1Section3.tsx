import { ArrowLeft, ArrowRight, FunctionSquare, AlertTriangle } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule1Section3 = () => {
  useSEO(
    "Section 3: Algebra & Formulae - Mathematics for Electricians",
    "Learn to use and rearrange the key formulae that underpin every electrical calculation, from Ohm's Law to cable sizing equations."
  );

  const quizQuestions = [
    {
      id: 1,
      question:
        "Using Ohm's Law (V = IR), what is the voltage across a 12 Ω resistor carrying 5 A?",
      options: ["2.4 V", "17 V", "60 V", "7 V"],
      correctAnswer: 2,
      explanation:
        "V = I × R = 5 × 12 = 60 V. Ohm's Law is the single most-used formula in electrical work.",
    },
    {
      id: 2,
      question:
        "Rearrange the power formula P = IV to find the current drawn by a 3 kW immersion heater on a 230 V supply.",
      options: ["13.04 A", "690,000 A", "0.077 A", "76.7 A"],
      correctAnswer: 0,
      explanation:
        "P = 3,000 W. Rearranging: I = P ÷ V = 3,000 ÷ 230 = 13.04 A. This tells you a 16 A MCB is the minimum required protection.",
    },
    {
      id: 3,
      question:
        "Using P = I²R, what power is dissipated in a 6 Ω resistance element carrying 10 A?",
      options: ["60 W", "600 W", "360 W", "160 W"],
      correctAnswer: 1,
      explanation:
        "P = I² × R = 10² × 6 = 100 × 6 = 600 W. This formula is particularly useful when calculating heat losses in cables.",
    },
    {
      id: 4,
      question:
        "The formula for voltage drop is Vd = (mV/A/m × Ib × L) ÷ 1,000. If mV/A/m = 18, Ib = 20 A and L = 25 m, what is the voltage drop?",
      options: ["9,000 V", "9 V", "0.9 V", "90 V"],
      correctAnswer: 1,
      explanation:
        "Vd = (18 × 20 × 25) ÷ 1,000 = 9,000 ÷ 1,000 = 9 V. The maximum permitted voltage drop for a 230 V circuit (5%) is 11.5 V, so 9 V is compliant.",
    },
    {
      id: 5,
      question:
        "Rearrange V = IR to find R when V = 230 V and I = 10 A.",
      options: ["2,300 Ω", "23 Ω", "0.043 Ω", "24 Ω"],
      correctAnswer: 1,
      explanation:
        "Rearranging: R = V ÷ I = 230 ÷ 10 = 23 Ω. This is used to calculate the total resistance of a circuit when you know the voltage and current.",
    },
    {
      id: 6,
      question:
        "Two resistors of 10 Ω and 15 Ω are connected in parallel. What is the combined resistance?",
      options: ["25 Ω", "5 Ω", "6 Ω", "12.5 Ω"],
      correctAnswer: 2,
      explanation:
        "For two resistors in parallel: R = (R1 × R2) ÷ (R1 + R2) = (10 × 15) ÷ (10 + 15) = 150 ÷ 25 = 6 Ω. The combined resistance is always less than the smallest individual resistor.",
    },
    {
      id: 7,
      question:
        "A circuit has a design current (Ib) of 22 A. Using the adiabatic equation S = √(I²t) ÷ k, what minimum cable CSA is needed if fault current I = 800 A, disconnection time t = 0.4 s and k = 115?",
      options: ["4.0 mm²", "4.4 mm²", "2.5 mm²", "6.0 mm²"],
      correctAnswer: 1,
      explanation:
        "S = √(I² × t) ÷ k = √(800² × 0.4) ÷ 115 = √(256,000) ÷ 115 = 506 ÷ 115 = 4.4 mm². You would select the next standard cable size of 6 mm².",
    },
    {
      id: 8,
      question:
        "Rearrange the formula for energy (E = P × t) to find how long it takes a 2 kW heater to use 5 kWh of energy.",
      options: ["10 hours", "2.5 hours", "0.4 hours", "10,000 hours"],
      correctAnswer: 1,
      explanation:
        "Rearranging: t = E ÷ P = 5 ÷ 2 = 2.5 hours. This is useful when estimating running costs from appliance ratings.",
    },
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            to="/study-centre/apprentice/functional-skills/module1"
            className="p-2 -ml-2 touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">
              Module 1 &bull; Section 3
            </p>
            <h1 className="text-base font-bold text-white">
              Algebra &amp; Formulae
            </h1>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <FunctionSquare className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Algebra &amp; Formulae
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Learn to use, rearrange and apply the key formulae that underpin
              every electrical calculation &mdash; from Ohm&apos;s Law and power
              equations to cable sizing and fault current protection.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">
        {/* Section 01 — Introduction to Algebra */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              01
            </span>
            <h3 className="text-lg font-bold text-white">
              Introduction to Algebra
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Algebra</strong> is the branch
              of mathematics that uses letters and symbols to represent
              unknown values and relationships. Far from being abstract
              theory, algebra is the everyday language of electrical
              engineering. Every time you use Ohm&apos;s Law (V = IR), select
              a cable size or calculate a voltage drop, you are using algebra.
            </p>
            <p>
              The key idea is simple:{" "}
              <strong className="text-white">
                a letter stands for a number you don&apos;t yet know
              </strong>
              . Once you substitute in the values you <em>do</em> know, you
              can solve for the unknown. For example, if V = IR and you know
              V = 230&thinsp;V and R = 23&thinsp;&Omega;, you can find I.
            </p>
            <p>
              <strong className="text-white">Variables</strong> (letters
              representing unknowns) and{" "}
              <strong className="text-white">constants</strong> (fixed values)
              appear in every electrical formula:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">V</strong> = voltage
                  (potential difference) in volts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">I</strong> = current in
                  amperes (from the French <em>intensité</em>)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">R</strong> = resistance in
                  ohms (&Omega;)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">P</strong> = power in watts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">E</strong> = energy in joules
                  (or kWh)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">t</strong> = time in seconds
                  (or hours for energy billing)
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Why Algebra Matters
              </p>
              <p className="text-sm text-white/80">
                Without algebra, you would need to memorise a separate formula
                for every possible calculation. With algebra, a single
                formula like V = IR gives you three calculations: V = IR,
                I = V/R, and R = V/I. Learning to rearrange formulae is one
                of the most valuable skills you can develop as an apprentice.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Algebraic notation conventions:
              </strong>{" "}
              In electrical formulae, multiplication is usually implied
              when two letters are next to each other: IR means I &times; R.
              Division is shown with a line (fraction) or the &divide; symbol.
              Squared values use a superscript: I² means I &times; I.
            </p>

            <p>
              <strong className="text-white">
                The equals sign as a balance:
              </strong>{" "}
              Think of every equation as a balance. Whatever you do to one
              side, you must do to the other to keep it balanced. If V = IR
              and you divide both sides by R, you get V/R = I. This is the
              fundamental principle behind all formula rearrangement.
            </p>
          </div>
        </motion.div>

        {/* Section 02 — Ohm's Law */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              02
            </span>
            <h3 className="text-lg font-bold text-white">
              Ohm&apos;s Law
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Ohm&apos;s Law</strong> states
              that the current flowing through a conductor is directly
              proportional to the potential difference across it and inversely
              proportional to its resistance, provided the temperature remains
              constant. The formula is:
            </p>
            <p className="text-center text-lg font-bold text-green-400 py-2">
              V = I &times; R
            </p>
            <p>
              This single equation gives you three arrangements:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Find voltage:</strong> V = I
                  &times; R. Example: A 10&thinsp;A current through a
                  23&thinsp;&Omega; resistance produces V = 10 &times; 23 =
                  230&thinsp;V.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Find current:</strong> I = V
                  &divide; R. Example: A 230&thinsp;V supply across a
                  46&thinsp;&Omega; load draws I = 230 &divide; 46 =
                  5&thinsp;A.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Find resistance:</strong> R =
                  V &divide; I. Example: If 230&thinsp;V causes a current of
                  10&thinsp;A, then R = 230 &divide; 10 = 23&thinsp;&Omega;.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Practical application &mdash; continuity testing:
              </strong>{" "}
              During initial verification, you measure the continuity of a
              ring final circuit. Your tester applies a small test voltage
              and measures the current that flows, then uses Ohm&apos;s Law
              internally to calculate and display the resistance. A typical
              R1+R2 reading for a 2.5&thinsp;mm²/1.5&thinsp;mm² ring circuit
              might be 0.35&thinsp;&Omega;.
            </p>

            <p>
              <strong className="text-white">
                The Ohm&apos;s Law triangle:
              </strong>{" "}
              A helpful memory aid is to draw a triangle with V at the top
              and I and R side by side at the bottom. Cover the letter you
              want to find: if you cover V, you see I &times; R. If you
              cover I, you see V over R (V &divide; R). If you cover R, you
              see V over I (V &divide; I).
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Worked Example &mdash; Earth Fault Loop Impedance
              </p>
              <p className="text-sm text-white/80">
                Using Ohm&apos;s Law to calculate prospective fault current:
                If the earth fault loop impedance Zs = 1.15&thinsp;&Omega; and
                the supply voltage is 230&thinsp;V, the prospective earth
                fault current = V &divide; Zs = 230 &divide; 1.15 =
                200&thinsp;A. This value must cause the protective device to
                operate within the required disconnection time stated in
                BS 7671 Table 41.1.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Temperature effects:
              </strong>{" "}
              Ohm&apos;s Law assumes constant temperature. In practice, the
              resistance of copper conductors increases as temperature rises.
              This is why BS 7671 provides correction factors for ambient
              temperature. At 20&deg;C, a 2.5&thinsp;mm² copper conductor
              has a resistance of approximately 7.27&thinsp;m&Omega;/m (line
              conductor). At 70&deg;C (maximum operating temperature for PVC
              cable), this increases to approximately 9.22&thinsp;m&Omega;/m.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck 1 — After Section 02 */}
        <InlineCheck
          id="fs-m1s3-check1"
          question="A heater element has a resistance of 19.2 Ω and is connected to a 230 V supply. Using Ohm's Law, what current does it draw?"
          options={[
            "4,416 A",
            "11.98 A",
            "0.083 A",
            "249.2 A",
          ]}
          correctIndex={1}
          explanation="I = V ÷ R = 230 ÷ 19.2 = 11.98 A. This is just under 12 A, so a 13 A fuse or 16 A MCB would be suitable for protection."
        />

        {/* Section 03 — Power Formulae */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              03
            </span>
            <h3 className="text-lg font-bold text-white">
              Power Formulae
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Electrical power</strong> is the
              rate at which energy is transferred or consumed. It is measured
              in watts (W). There are three key power formulae, each derived
              from combining Ohm&apos;s Law with the basic power equation:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">P = V &times; I</strong>{" "}
                  &mdash; use when you know voltage and current. Example: a
                  230&thinsp;V supply drawing 10&thinsp;A delivers P = 230
                  &times; 10 = 2,300&thinsp;W (2.3&thinsp;kW).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">P = I² &times; R</strong>{" "}
                  &mdash; use when you know current and resistance. This form
                  is especially useful for calculating{" "}
                  <strong className="text-white">heat losses in cables</strong>
                  . Example: 20&thinsp;A through a cable with 0.5&thinsp;&Omega;
                  resistance produces P = 20² &times; 0.5 = 200&thinsp;W of
                  heat.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">P = V² &divide; R</strong>{" "}
                  &mdash; use when you know voltage and resistance. Example: a
                  230&thinsp;V supply across a 52.9&thinsp;&Omega; heating
                  element gives P = 230² &divide; 52.9 = 52,900 &divide;
                  52.9 = 1,000&thinsp;W (1&thinsp;kW).
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Rearranging the power formulae:
              </strong>{" "}
              Each formula can be rearranged to find any unknown. From P = VI:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  I = P &divide; V &mdash; find the current drawn by an
                  appliance. Example: a 3&thinsp;kW shower on 230&thinsp;V
                  draws I = 3,000 &divide; 230 = 13.04&thinsp;A.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  V = P &divide; I &mdash; find what voltage produces a given
                  power at a known current.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                The design current (Ib):
              </strong>{" "}
              When designing a circuit, you calculate the design current
              using I = P &divide; V. This tells you the minimum MCB rating
              and cable size needed. For example, a 7.2&thinsp;kW electric
              shower: I = 7,200 &divide; 230 = 31.3&thinsp;A. You would
              select a 32&thinsp;A MCB and 6&thinsp;mm² cable as a minimum.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Power Factor Warning
              </p>
              <p className="text-sm text-white/80">
                The formulae P = VI and P = I²R give{" "}
                <em>apparent power</em> (VA) when dealing with AC circuits
                containing reactive loads (motors, fluorescent ballasts). For
                <em> true power</em> (W), multiply by the power factor:
                P = V &times; I &times; cos&phi;. For purely resistive loads
                (heaters, kettles), power factor = 1, so P = VI holds true.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Energy consumption:
              </strong>{" "}
              Energy = Power &times; Time. E = P &times; t. In practical
              terms, energy is measured in kilowatt-hours (kWh). A
              2&thinsp;kW heater running for 3 hours uses 2 &times; 3 =
              6&thinsp;kWh. At 34p per kWh, this costs 6 &times; 34p =
              &pound;2.04.
            </p>
          </div>
        </motion.div>

        {/* Section 04 — Transposing Formulae */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              04
            </span>
            <h3 className="text-lg font-bold text-white">
              Transposing Formulae
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Transposing</strong> (rearranging)
              a formula means isolating the variable you want to find on one
              side of the equals sign. This is the most important algebraic
              skill for an electrician. The golden rule is:{" "}
              <strong className="text-white">
                whatever you do to one side, you must do to the other.
              </strong>
            </p>

            <p>
              <strong className="text-white">Step-by-step method:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 1:</strong> Identify the
                  variable you need to find (the &ldquo;subject&rdquo;).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 2:</strong> Use inverse
                  operations to &ldquo;undo&rdquo; what has been done to it.
                  If it has been multiplied, divide. If it has been added,
                  subtract. If it is squared, take the square root.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 3:</strong> Perform the
                  same operation on both sides of the equation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 4:</strong> Simplify
                  until the subject stands alone.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Example 1 &mdash; Rearranging V = IR to find R:
              </strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Start with: V = IR</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>R is being multiplied by I. To undo this, divide both sides by I.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>V &divide; I = IR &divide; I</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Result: <strong className="text-white">R = V &divide; I</strong></span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Example 2 &mdash; Rearranging P = I²R to find I:
              </strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Start with: P = I²R</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Divide both sides by R: P &divide; R = I²</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Take the square root of both sides: &radic;(P &divide; R) = I</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Result: <strong className="text-white">I = &radic;(P/R)</strong></span>
              </li>
            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-yellow-400 mb-1">
                    Common Rearrangement Error
                  </p>
                  <p className="text-sm text-white/80">
                    When rearranging P = I²R to find I, a common mistake is to
                    forget to take the square root. Dividing P by R gives you
                    I², not I. You must then square-root the result to get I.
                    Always check your answer by substituting back into the
                    original formula.
                  </p>
                </div>
              </div>
            </div>

            <p>
              <strong className="text-white">
                Example 3 &mdash; The voltage drop formula:
              </strong>{" "}
              Vd = (mV/A/m &times; Ib &times; L) &divide; 1,000. To find the
              maximum cable length (L) for a given voltage drop limit:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Multiply both sides by 1,000: Vd &times; 1,000 = mV/A/m &times; Ib &times; L</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Divide both sides by (mV/A/m &times; Ib): L = (Vd &times; 1,000) &divide; (mV/A/m &times; Ib)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  If maximum Vd = 11.5&thinsp;V, mV/A/m = 18, Ib = 20&thinsp;A:
                  L = (11.5 &times; 1,000) &divide; (18 &times; 20) =
                  11,500 &divide; 360 = <strong className="text-white">31.9&thinsp;m</strong>
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* InlineCheck 2 — After Section 04 */}
        <InlineCheck
          id="fs-m1s3-check2"
          question="Rearrange the formula P = V²/R to make R the subject. What is the correct rearrangement?"
          options={[
            "R = V² × P",
            "R = P ÷ V²",
            "R = V² ÷ P",
            "R = √(V² × P)",
          ]}
          correctIndex={2}
          explanation="Start with P = V²/R. Multiply both sides by R: PR = V². Divide both sides by P: R = V²/P = V² ÷ P. This is useful for calculating the resistance of a heating element from its power rating."
        />

        {/* Section 05 — Substitution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              05
            </span>
            <h3 className="text-lg font-bold text-white">
              Substitution
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Substitution</strong> means
              replacing the letters in a formula with actual numbers. It is
              what you do every time you plug values into an equation to get
              a result. The process is straightforward:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 1:</strong> Write down
                  the formula.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 2:</strong> List the
                  values you know and identify the unknown.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 3:</strong> Rearrange if
                  necessary so the unknown is the subject.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 4:</strong> Replace each
                  letter with its value and calculate.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 5:</strong> Check the
                  answer is reasonable (use estimation).
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Example &mdash; Selecting an MCB for a cooker circuit:
              </strong>
            </p>
            <p>
              A hob is rated at 7.2&thinsp;kW and an oven at 2.5&thinsp;kW.
              Using the current demand formula with diversity applied:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Total connected load = 7,200 + 2,500 = 9,700&thinsp;W.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  First 10&thinsp;A at full load = 10 &times; 230 =
                  2,300&thinsp;W.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Remaining load: 9,700 &minus; 2,300 = 7,400&thinsp;W at
                  30% diversity = 7,400 &times; 0.3 = 2,220&thinsp;W.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Assessed demand = 2,300 + 2,220 = 4,520&thinsp;W.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Design current: I = P &divide; V = 4,520 &divide; 230 =
                  19.65&thinsp;A. Select next standard MCB rating: 20&thinsp;A
                  or 32&thinsp;A depending on the BS 88 or BS EN 60898 range.
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Unit Consistency
              </p>
              <p className="text-sm text-white/80">
                Before substituting values, always check your units are
                consistent. If the formula uses watts, convert kW to W first
                (multiply by 1,000). If the formula uses metres, convert mm
                to m first (divide by 1,000). Mixing units is the most common
                cause of calculation errors.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Example &mdash; Cable resistance:
              </strong>{" "}
              A 30&thinsp;m run of 2.5&thinsp;mm² copper cable has a
              resistance per metre (r1) of 7.41&thinsp;m&Omega;/m and the CPC
              (1.5&thinsp;mm²) has r2 = 12.10&thinsp;m&Omega;/m. The combined
              R1+R2 per metre = 7.41 + 12.10 = 19.51&thinsp;m&Omega;/m.
              For 30&thinsp;m: R1+R2 = 19.51 &times; 30 = 585.3&thinsp;m&Omega;
              = 0.585&thinsp;&Omega;. This value is used in the earth fault
              loop impedance calculation: Zs = Ze + R1+R2.
            </p>
          </div>
        </motion.div>

        {/* Section 06 — Simultaneous Equations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              06
            </span>
            <h3 className="text-lg font-bold text-white">
              Simultaneous Equations
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Simultaneous equations</strong>{" "}
              are two or more equations that share the same unknowns.
              Solving them finds the values that satisfy both equations at
              the same time. While you may not use simultaneous equations
              every day, they appear in more advanced electrical calculations
              such as balanced three-phase loads and Kirchhoff&apos;s Laws.
            </p>

            <p>
              <strong className="text-white">Method 1 &mdash; Substitution:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Given: V = IR and P = IV. If you know P = 2,300&thinsp;W
                  and V = 230&thinsp;V:
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  From P = IV: I = P &divide; V = 2,300 &divide; 230 =
                  10&thinsp;A.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Substitute into V = IR: 230 = 10 &times; R, so R = 230
                  &divide; 10 = 23&thinsp;&Omega;.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">Method 2 &mdash; Elimination:</strong>{" "}
              This method is used when you have two equations with two
              unknowns and want to eliminate one variable by adding or
              subtracting the equations.
            </p>

            <p>
              <strong className="text-white">
                Practical example &mdash; Kirchhoff&apos;s Voltage Law:
              </strong>{" "}
              In a series circuit with two resistors R1 and R2:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>V(total) = V1 + V2 = 230&thinsp;V</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>You measure V1 = 138&thinsp;V across R1.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Therefore V2 = 230 &minus; 138 = 92&thinsp;V.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  If the current is 2&thinsp;A throughout (series circuit):
                  R1 = 138 &divide; 2 = 69&thinsp;&Omega;, R2 = 92 &divide; 2
                  = 46&thinsp;&Omega;. Total R = 69 + 46 = 115&thinsp;&Omega;.
                  Check: V = IR = 2 &times; 115 = 230&thinsp;V. Correct.
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Kirchhoff&apos;s Laws &mdash; Quick Reference
              </p>
              <p className="text-sm text-white/80">
                <strong className="text-white">KVL</strong> (Kirchhoff&apos;s
                Voltage Law): The sum of all voltages around a closed loop
                equals zero. <strong className="text-white">KCL</strong>{" "}
                (Kirchhoff&apos;s Current Law): The total current entering a
                junction equals the total current leaving it. Both laws are
                fundamental to circuit analysis and rely on simultaneous
                equations for complex circuits.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Three-phase example:
              </strong>{" "}
              In a balanced three-phase system, the line voltage V(L) relates
              to the phase voltage V(P) by: V(L) = V(P) &times; &radic;3.
              If V(L) = 400&thinsp;V: V(P) = 400 &divide; &radic;3 = 400
              &divide; 1.732 = 231&thinsp;V. Similarly, line current I(L)
              relates to phase current I(P) in a delta connection by:
              I(L) = I(P) &times; &radic;3.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck 3 — After Section 06 */}
        <InlineCheck
          id="fs-m1s3-check3"
          question="In a series circuit, the supply voltage is 230 V. Resistor R1 drops 92 V. What voltage is dropped across R2?"
          options={[
            "322 V",
            "138 V",
            "92 V",
            "230 V",
          ]}
          correctIndex={1}
          explanation="By Kirchhoff's Voltage Law, the sum of voltage drops in a series circuit equals the supply voltage. V2 = V(total) − V1 = 230 − 92 = 138 V."
        />

        {/* Section 07 — Cable Sizing Equations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              07
            </span>
            <h3 className="text-lg font-bold text-white">
              Cable Sizing Equations
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Selecting the correct cable size is one of the most important
              calculations an electrician performs. BS 7671 requires that
              cables are sized to meet three criteria simultaneously:{" "}
              <strong className="text-white">current-carrying capacity</strong>,{" "}
              <strong className="text-white">voltage drop</strong> and{" "}
              <strong className="text-white">
                fault current protection (adiabatic equation)
              </strong>
              . All three involve algebra.
            </p>

            <p>
              <strong className="text-white">
                1. Current-carrying capacity:
              </strong>{" "}
              The fundamental inequality is:
            </p>
            <p className="text-center text-lg font-bold text-green-400 py-2">
              It &ge; In &ge; Ib
            </p>
            <p>
              Where It = tabulated current rating of the cable (from BS 7671
              Appendix 4), In = nominal rating of the protective device, and
              Ib = design current. The tabulated value must be adjusted by
              correction factors:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Ca</strong> &mdash; ambient
                  temperature correction factor.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Cg</strong> &mdash; grouping
                  correction factor (when cables are bunched together).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Ci</strong> &mdash; thermal
                  insulation correction factor.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Cf</strong> &mdash; semi-enclosed
                  fuse correction factor (0.725 for BS 3036 fuses).
                </span>
              </li>
            </ul>
            <p>
              The minimum tabulated current required is:
              It &ge; In &divide; (Ca &times; Cg &times; Ci &times; Cf).
            </p>

            <p>
              <strong className="text-white">
                2. Voltage drop:
              </strong>{" "}
              Vd = (mV/A/m &times; Ib &times; L) &divide; 1,000. The
              mV/A/m value is found in BS 7671 Appendix 4 tables for the
              chosen cable and installation method. L is the route length in
              metres.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Worked Example &mdash; Cable Selection
              </p>
              <p className="text-sm text-white/80">
                Design current Ib = 28&thinsp;A, 32&thinsp;A MCB (In = 32),
                Ca = 0.94, Cg = 0.80, Ci = 1.0, Cf = 1.0. Minimum It =
                32 &divide; (0.94 &times; 0.80 &times; 1.0 &times; 1.0) =
                32 &divide; 0.752 = 42.55&thinsp;A. From tables, 6&thinsp;mm²
                T&amp;E clipped direct has It = 47&thinsp;A. 47 &gt; 42.55,
                so 6&thinsp;mm² is acceptable for current capacity.
              </p>
            </div>

            <p>
              <strong className="text-white">
                3. Adiabatic equation (fault current protection):
              </strong>{" "}
              S = &radic;(I²t) &divide; k. Where S = minimum conductor CSA
              (mm²), I = fault current (A), t = disconnection time (s), and
              k = a constant depending on conductor material and insulation
              (115 for copper with PVC). This ensures the cable can withstand
              the thermal stress during a fault.
            </p>

            <p>
              <strong className="text-white">Example:</strong> If prospective
              fault current = 1,200&thinsp;A and disconnection time =
              0.1&thinsp;s: S = &radic;(1,200² &times; 0.1) &divide; 115 =
              &radic;(144,000) &divide; 115 = 379.5 &divide; 115 =
              3.3&thinsp;mm². The next standard cable size (4&thinsp;mm²)
              would satisfy this requirement.
            </p>
          </div>
        </motion.div>

        {/* Section 08 — Practical Formula Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              08
            </span>
            <h3 className="text-lg font-bold text-white">
              Practical Formula Applications
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              This final section brings together the algebraic skills from
              this section with realistic installation scenarios. Work through
              each example carefully, showing all your working.
            </p>

            <p>
              <strong className="text-white">
                Scenario 1 &mdash; Electric shower circuit
              </strong>
            </p>
            <p>
              An 8.5&thinsp;kW instantaneous electric shower is to be
              installed. The cable route from the consumer unit to the shower
              is 18&thinsp;m. The installation method is clipped direct
              (Method C). Ambient temperature is 30&deg;C.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 1 &mdash; Design current:</strong>{" "}
                  Ib = P &divide; V = 8,500 &divide; 230 = 36.96&thinsp;A.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 2 &mdash; Select MCB:</strong>{" "}
                  Next standard rating above 36.96&thinsp;A is 40&thinsp;A.
                  In = 40&thinsp;A.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 3 &mdash; Correction factors:</strong>{" "}
                  Ca at 30&deg;C for 70&deg;C PVC = 0.94. Cg = 1.0 (single
                  cable). Ci = 1.0 (not enclosed in insulation).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 4 &mdash; Minimum It:</strong>{" "}
                  It &ge; 40 &divide; (0.94 &times; 1.0 &times; 1.0) =
                  42.55&thinsp;A. From tables: 10&thinsp;mm² T&amp;E clipped
                  direct has It = 64&thinsp;A. 64 &gt; 42.55 &mdash; OK.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 5 &mdash; Voltage drop:</strong>{" "}
                  For 10&thinsp;mm² T&amp;E, mV/A/m = 4.4. Vd = (4.4 &times;
                  36.96 &times; 18) &divide; 1,000 = 2,927.2 &divide; 1,000
                  = 2.93&thinsp;V. Maximum permitted = 11.5&thinsp;V. 2.93
                  &lt; 11.5 &mdash; compliant.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Scenario 2 &mdash; Earth fault loop impedance check
              </strong>
            </p>
            <p>
              A 32&thinsp;A Type B MCB protects a ring final circuit. The
              external earth loop impedance Ze = 0.35&thinsp;&Omega;. The
              measured R1+R2 for the circuit = 0.72&thinsp;&Omega;.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Total Zs:</strong> Zs = Ze +
                  R1+R2 = 0.35 + 0.72 = 1.07&thinsp;&Omega;.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Maximum Zs (BS 7671):</strong>{" "}
                  For a 32&thinsp;A Type B MCB, maximum Zs =
                  1.37&thinsp;&Omega; (from Table 41.3).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Result:</strong> 1.07
                  &lt; 1.37 &mdash; the circuit complies with the maximum
                  disconnection time requirement of 0.4&thinsp;s.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Prospective fault current:</strong>{" "}
                  If = V &divide; Zs = 230 &divide; 1.07 = 215&thinsp;A.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Scenario 3 &mdash; Energy cost calculation
              </strong>
            </p>
            <p>
              A commercial premises has 48 LED panels each rated at 36&thinsp;W.
              They operate 10 hours per day, 5 days per week. Electricity costs
              34p per kWh.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Total power:</strong> 48
                  &times; 36 = 1,728&thinsp;W = 1.728&thinsp;kW.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Daily energy:</strong> 1.728
                  &times; 10 = 17.28&thinsp;kWh.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Weekly energy:</strong> 17.28
                  &times; 5 = 86.4&thinsp;kWh.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Weekly cost:</strong> 86.4
                  &times; &pound;0.34 = &pound;29.38.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Annual cost (50 weeks):</strong>{" "}
                  &pound;29.38 &times; 50 = &pound;1,468.80.
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Key Takeaway
              </p>
              <p className="text-sm text-white/80">
                Every electrical calculation comes back to algebra &mdash;
                using a formula, substituting known values, and solving for
                the unknown. The formulae themselves are straightforward; the
                skill lies in choosing the right formula, rearranging it
                correctly, and checking that your units are consistent.
                Practise rearranging V = IR, P = IV, P = I²R and the voltage
                drop formula until they become second nature.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz
          questions={quizQuestions}
          title="Algebra & Formulae Quiz"
        />

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module1/section2"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Units &amp; Measurement
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module1/section4"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Data &amp; Statistics
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule1Section3;
