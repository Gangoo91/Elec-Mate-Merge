import { ArrowLeft, ArrowRight, Zap, AlertTriangle, BookOpen, Lightbulb, Calculator } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule4Section1 = () => {
  useSEO(
    "Section 1: Electrical Calculations - Practical Mathematics Applications",
    "Master Ohm's law, the power triangle, voltage drop, diversity factors, maximum demand, earth fault loop impedance and prospective fault current for UK electrical installations."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "A 230V circuit supplies a 2.3kW load. What current does it draw?",
      options: ["5A", "10A", "23A", "100A"],
      correctAnswer: 1,
      explanation:
        "I = P / V = 2300 / 230 = 10A. This is a straightforward application of the power formula rearranged for current.",
    },
    {
      id: 2,
      question:
        "A cable run is 25m using 2.5mm\u00B2 twin and earth (mV/A/m = 18). The load current is 20A. What is the voltage drop?",
      options: ["4.5V", "9.0V", "18.0V", "45.0V"],
      correctAnswer: 1,
      explanation:
        "Voltage drop = mV/A/m \u00D7 I \u00D7 L / 1000 = 18 \u00D7 20 \u00D7 25 / 1000 = 9.0V. This is within the 5% limit (11.5V) for a power circuit.",
    },
    {
      id: 3,
      question:
        "Ze is measured as 0.35\u03A9 and R1+R2 for the circuit is 0.95\u03A9. What is Zs?",
      options: ["0.60\u03A9", "0.95\u03A9", "1.30\u03A9", "1.65\u03A9"],
      correctAnswer: 2,
      explanation:
        "Zs = Ze + (R1+R2) = 0.35 + 0.95 = 1.30\u03A9. This must then be checked against the maximum Zs value for the protective device.",
    },
    {
      id: 4,
      question:
        "A domestic lighting circuit has a total connected load of 1800W at 230V. Applying 66% diversity, what current should be allowed for in the maximum demand?",
      options: ["7.83A", "5.17A", "11.88A", "3.42A"],
      correctAnswer: 1,
      explanation:
        "Total current = 1800 / 230 = 7.83A. After 66% diversity = 7.83 \u00D7 0.66 = 5.17A. This is the figure used in the ADMD calculation.",
    },
    {
      id: 5,
      question:
        "Three resistors of 10\u03A9, 15\u03A9 and 25\u03A9 are connected in series across a 230V supply. What is the current?",
      options: ["23A", "9.2A", "4.6A", "2.3A"],
      correctAnswer: 2,
      explanation:
        "In a series circuit, total resistance = 10 + 15 + 25 = 50\u03A9. Current I = V / R = 230 / 50 = 4.6A.",
    },
    {
      id: 6,
      question:
        "A 3kW immersion heater is connected to a 230V supply. What is the resistance of the heating element?",
      options: ["76.67\u03A9", "17.63\u03A9", "52.90\u03A9", "6.67\u03A9"],
      correctAnswer: 1,
      explanation:
        "R = V\u00B2 / P = 230\u00B2 / 3000 = 52900 / 3000 = 17.63\u03A9. You can verify: I = P/V = 3000/230 = 13.04A, then R = V/I = 230/13.04 = 17.64\u03A9 (slight rounding difference).",
    },
    {
      id: 7,
      question:
        "The measured Ze at the origin of a TN-C-S supply is 0.10\u03A9. What is the prospective fault current?",
      options: ["230A", "2,300A", "23,000A", "1,150A"],
      correctAnswer: 1,
      explanation:
        "Ipf = Uoc / Zs = 230 / 0.10 = 2,300A = 2.3kA. This is well within the 6kA rating of a standard domestic MCB.",
    },
    {
      id: 8,
      question:
        "A TN-S supply has Ze = 0.8\u03A9. A 20A Type B MCB protects a radial circuit with measured R1+R2 of 1.05\u03A9. Applying the 1.20 correction factor, what is the Zs and does it comply?",
      options: [
        "Zs = 1.85\u03A9 \u2014 does not comply",
        "Zs = 2.06\u03A9 \u2014 complies (max 2.30\u03A9)",
        "Zs = 1.26\u03A9 \u2014 complies easily",
        "Zs = 2.46\u03A9 \u2014 does not comply",
      ],
      correctAnswer: 1,
      explanation:
        "Zs = Ze + (R1+R2 \u00D7 1.20) = 0.8 + (1.05 \u00D7 1.20) = 0.8 + 1.26 = 2.06\u03A9. Maximum Zs for a 20A Type B MCB = 2.30\u03A9. Since 2.06 < 2.30, it complies.",
    },
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            to="/study-centre/apprentice/functional-skills/module4"
            className="p-2 -ml-2 touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">
              Module 4 &bull; Section 1
            </p>
            <h1 className="text-base font-bold text-white">Electrical Calculations</h1>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Electrical Calculations
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Master the core electrical calculations you will use every day &mdash; from Ohm&rsquo;s law to maximum
              demand and earth fault loop impedance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* ── 01 Ohm's Law in Practice ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Ohm&rsquo;s Law in Practice</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Ohm&rsquo;s Law is the single most important formula in electrical work. It describes the relationship
              between voltage, current and resistance in any circuit. Every calculation you perform on site &mdash;
              from cable sizing to fault current &mdash; ultimately traces back to this law.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">V = I &times; R</p>
              <p className="text-sm text-white/70">Voltage (V) = Current (A) &times; Resistance (&Omega;)</p>
            </div>

            <p>
              By rearranging we also get <strong className="text-white">I = V / R</strong> and{" "}
              <strong className="text-white">R = V / I</strong>. These three forms let you find any unknown
              quantity when you know the other two.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Series Circuit Example</h4>
              <p className="text-sm text-white/80 mb-2">
                Three resistors of 10&Omega;, 15&Omega; and 25&Omega; are connected in series across a 230V supply.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Total resistance: R<sub>T</sub> = 10 + 15 + 25 = 50&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Current: I = V / R = 230 / 50 = 4.6A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Voltage across 25&Omega; resistor: V = I &times; R = 4.6 &times; 25 = 115V</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Parallel Circuit Example</h4>
              <p className="text-sm text-white/80 mb-2">
                Two resistors of 20&Omega; and 30&Omega; are connected in parallel across a 12V supply.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>1/R<sub>T</sub> = 1/20 + 1/30 = 3/60 + 2/60 = 5/60</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>R<sub>T</sub> = 60/5 = 12&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Total current: I = 12 / 12 = 1A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Branch currents: I<sub>1</sub> = 12/20 = 0.6A, I<sub>2</sub> = 12/30 = 0.4A</span>
                </li>
              </ul>
            </div>

            <p>
              Notice how the branch currents (0.6A + 0.4A) add up to the total current (1A). This is
              Kirchhoff&rsquo;s Current Law in action &mdash; what goes in must come out.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Practical Application &mdash; Testing a Ring Final</h4>
              <p className="text-sm text-white/80 mb-2">
                When you measure the end-to-end resistance of a ring final circuit&rsquo;s line conductors
                and get 0.52&Omega;, what does this tell you?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>The two parallel paths each have resistance of 0.52&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Using the parallel formula: R<sub>total</sub> = 0.52 / 4 = 0.13&Omega; (since the cross-connected reading divides by 4)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>This is the R1 value you will use in Zs calculations</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── 02 The Power Triangle ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">The Power Triangle</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Electrical power can be calculated using three interchangeable formulae. Choosing the right
              one depends on which values you know. Together they form the &ldquo;power triangle.&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-1">P = I &times; V</p>
                <p className="text-xs text-white/60">When you know current and voltage</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-1">P = I&sup2; &times; R</p>
                <p className="text-xs text-white/60">When you know current and resistance</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-1">P = V&sup2; / R</p>
                <p className="text-xs text-white/60">When you know voltage and resistance</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Immersion Heater</h4>
              <p className="text-sm text-white/80 mb-2">
                A 3kW immersion heater is connected to a 230V supply. Find the current drawn and the
                element resistance.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Current: I = P / V = 3000 / 230 = 13.04A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Resistance: R = V&sup2; / P = 230&sup2; / 3000 = 52900 / 3000 = 17.63&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Check: P = I&sup2; &times; R = 13.04&sup2; &times; 17.63 = 2997W &asymp; 3kW</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Electric Shower</h4>
              <p className="text-sm text-white/80 mb-2">
                A 9.5kW electric shower runs on a 230V supply. What current does it draw, and what
                size MCB is needed?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>I = P / V = 9500 / 230 = 41.3A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>The next standard MCB rating above 41.3A is 45A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>This shower will need a dedicated radial circuit with 10mm&sup2; cable</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Always check your answer makes sense. A domestic immersion heater drawing 13A on a 230V supply
                is realistic. If you calculated 130A, you have likely made a decimal error. Get into the
                habit of sanity-checking every result.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 02 */}
        <InlineCheck
          id="calc-check-1"
          question="A 100W lamp operates on 230V. What is the current and resistance of the filament?"
          options={[
            "0.43A and 529\u03A9",
            "2.3A and 100\u03A9",
            "0.43A and 230\u03A9",
            "23A and 10\u03A9",
          ]}
          correctIndex={0}
          explanation="I = P/V = 100/230 = 0.43A. R = V/I = 230/0.43 = 529\u03A9 (or R = V\u00B2/P = 230\u00B2/100 = 529\u03A9). Both methods give the same answer."
        />

        {/* ── 03 Voltage Drop Calculations ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Voltage Drop Calculations</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Every cable has resistance, so voltage is lost along the cable run. BS 7671 limits the
              allowable voltage drop to ensure equipment operates correctly. If the drop is too great,
              motors may stall, lighting may flicker, and equipment may malfunction.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">
                Voltage Drop = mV/A/m &times; I<sub>b</sub> &times; L / 1000
              </p>
              <p className="text-sm text-white/70">
                Where mV/A/m is from cable tables, I<sub>b</sub> = design current, L = cable length in metres
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-green-400 mb-2">BS 7671 Limits</h4>
                <ul className="space-y-1 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>Lighting circuits: <strong className="text-white">3%</strong> of 230V = 6.9V</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>Other circuits: <strong className="text-white">5%</strong> of 230V = 11.5V</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>These limits apply from the origin of the installation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-green-400 mb-2">Common mV/A/m Values</h4>
                <ul className="space-y-1 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>1.0mm&sup2; T&amp;E: 44 mV/A/m</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>1.5mm&sup2; T&amp;E: 29 mV/A/m</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>2.5mm&sup2; T&amp;E: 18 mV/A/m</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>4.0mm&sup2; T&amp;E: 11 mV/A/m</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>6.0mm&sup2; T&amp;E: 7.3 mV/A/m</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>10.0mm&sup2; T&amp;E: 4.4 mV/A/m</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Radial Circuit</h4>
              <p className="text-sm text-white/80 mb-2">
                A 20A radial circuit uses 2.5mm&sup2; twin and earth cable. The cable run is 20m to a
                workshop heater drawing 17A.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>mV/A/m for 2.5mm&sup2; T&amp;E = 18</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>VD = 18 &times; 17 &times; 20 / 1000 = 6.12V</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Limit for a power circuit = 11.5V</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>6.12V &lt; 11.5V &mdash; <strong className="text-white">acceptable</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Ring Final Circuit</h4>
              <p className="text-sm text-white/80 mb-2">
                A 32A ring final circuit uses 2.5mm&sup2; T&amp;E cable. The total ring length is 60m.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>For a ring circuit, effective cable length = total ring length / 4</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Effective length = 60 / 4 = 15m</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>VD = 18 &times; 32 &times; 15 / 1000 = 8.64V</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>8.64V &lt; 11.5V &mdash; <strong className="text-white">acceptable</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                If voltage drop fails, you have two options: increase the cable size (which reduces mV/A/m)
                or shorten the cable run. In practice, increasing the cable CSA is usually the simplest solution.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 04 Diversity Factors ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Diversity Factors</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              In practice, not all loads in an installation run at full power simultaneously. A house will
              never have every light, every socket, the shower, the cooker and the immersion heater all
              running at peak load at the same time. Diversity allows us to reduce the assumed total load
              when calculating supply capacity.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">BS 7671 Table 1A &mdash; Domestic Diversity</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-sm text-white/80">Lighting</span>
                  <span className="text-sm text-white font-medium">66% of total</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-sm text-white/80">Cooker</span>
                  <span className="text-sm text-white font-medium">10A + 30% of remainder + 5A socket</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-sm text-white/80">Socket outlets (ring/radial)</span>
                  <span className="text-sm text-white font-medium">100% of largest + 40% of others</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-sm text-white/80">Immersion heater</span>
                  <span className="text-sm text-white font-medium">100% (no diversity)</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-sm text-white/80">Shower</span>
                  <span className="text-sm text-white font-medium">100% (no diversity)</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-white/80">Underfloor heating</span>
                  <span className="text-sm text-white font-medium">100% (no diversity)</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Cooker Diversity</h4>
              <p className="text-sm text-white/80 mb-2">
                A cooker is rated at 12kW on a 230V supply. It has a socket outlet in the cooker
                control unit. Calculate the diversified current.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Full load current: I = 12000 / 230 = 52.17A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>First 10A at 100%: 10A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Remainder (52.17 &minus; 10 = 42.17A) at 30%: 42.17 &times; 0.30 = 12.65A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Socket outlet allowance: 5A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Total diversified demand: 10 + 12.65 + 5 = <strong className="text-white">27.65A</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Diversity applies to the supply calculation (main switch, service cable) &mdash; not to
                individual circuit protective devices. Each circuit must still be rated for its full load.
                A 12kW cooker still needs a suitably rated circuit, even though its diversified demand is
                lower in the overall ADMD.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 04 */}
        <InlineCheck
          id="calc-check-2"
          question="A lighting circuit has a total connected load of 1800W at 230V. Applying 66% diversity, what current should be allowed for in the maximum demand calculation?"
          options={[
            "7.83A \u2014 no diversity applied",
            "5.17A \u2014 after 66% diversity",
            "11.88A \u2014 with 66% added on top",
            "Diversity cannot be applied to lighting",
          ]}
          correctIndex={1}
          explanation="Total current = 1800/230 = 7.83A. After 66% diversity = 7.83 \u00D7 0.66 = 5.17A. Alternatively: 1800 \u00D7 0.66 = 1188W, then 1188/230 = 5.17A."
        />

        {/* ── 05 Maximum Demand ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Maximum Demand</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Maximum demand is the total current an installation is expected to draw under normal
              conditions. The after diversity maximum demand (ADMD) accounts for the fact that not
              all loads run simultaneously. This determines the main switch rating, the service fuse,
              and the incoming cable size.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Domestic ADMD &mdash; Full Worked Example</h4>
              <p className="text-sm text-white/80 mb-3">
                Calculate the ADMD for a house with the following loads:
              </p>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Lighting: 2400W</span>
                  <span className="text-green-400">66% &rarr; 1584W &rarr; 6.89A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Cooker: 12kW (with socket)</span>
                  <span className="text-green-400">10A + 12.65A + 5A = 27.65A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Ring 1 (downstairs): 32A</span>
                  <span className="text-green-400">100% &rarr; 32A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Ring 2 (upstairs): 32A</span>
                  <span className="text-green-400">40% &rarr; 12.8A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Immersion: 3kW</span>
                  <span className="text-green-400">100% &rarr; 13.04A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Shower: 9.5kW</span>
                  <span className="text-green-400">100% &rarr; 41.3A</span>
                </div>
                <div className="flex justify-between pt-2 font-medium">
                  <span className="text-white">Total ADMD</span>
                  <span className="text-green-400 text-base">133.68A</span>
                </div>
              </div>
              <p className="text-sm text-white/60 mt-3">
                This would require a minimum 100A main switch (but a 100A Type 2 cut-out is the standard
                domestic supply). If the ADMD exceeds 100A, you may need to apply for a supply upgrade
                from the DNO.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Three-Phase Balanced Loads</h4>
              <p className="text-sm text-white/80 mb-2">
                For three-phase installations, loads should be distributed as evenly as possible across
                all three phases. The per-phase current is:
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
                <p className="text-green-400 font-mono">
                  I<sub>phase</sub> = P<sub>total</sub> / (&radic;3 &times; V<sub>L</sub>) = P<sub>total</sub> / (1.732 &times; 400)
                </p>
              </div>
              <p className="text-sm text-white/80 mt-2">
                For example, a 30kW three-phase load: I = 30000 / (1.732 &times; 400) = 30000 / 692.8 = 43.3A per phase.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                When calculating ADMD, always list every circuit systematically, apply the correct diversity
                factor from the tables, and total everything up. Missing a circuit can lead to an undersized
                supply &mdash; a costly mistake to correct after installation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 06 Earth Fault Loop Impedance (Zs) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Earth Fault Loop Impedance (Zs)</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The earth fault loop impedance determines how much fault current will flow when a
              line-to-earth fault occurs. This is critical for ensuring the protective device
              disconnects quickly enough to prevent electric shock and fire.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">Zs = Ze + (R1 + R2)</p>
              <p className="text-sm text-white/70">
                Ze = external loop impedance, R1 = line conductor resistance, R2 = CPC resistance
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Typical Ze Values</h4>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>TN-C-S (PME): 0.35&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>TN-S (sheath): 0.8&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>TT (earth electrode): 21&Omega; (varies greatly &mdash; RCD protection mandatory)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Maximum Zs Values &mdash; Common Type B MCBs</h4>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>6A: 7.67&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>10A: 4.60&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>16A: 2.87&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>20A: 2.30&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>32A: 1.44&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>40A: 1.15&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>50A: 0.92&Omega;</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Temperature Correction Factor</h4>
              <p className="text-sm text-white/80 mb-2">
                R1+R2 values from tables are given at 20&deg;C. Under fault conditions, the conductor heats
                up. To account for this, we apply a correction factor:
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center mb-2">
                <p className="text-green-400 font-mono">Zs at operating temp = Ze + (R1+R2) &times; 1.20</p>
              </div>
              <p className="text-sm text-white/60">
                The factor of 1.20 accounts for the increase in conductor resistance as temperature rises
                from 20&deg;C to approximately 70&deg;C under normal operating conditions.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example</h4>
              <p className="text-sm text-white/80 mb-2">
                A TN-C-S supply (Ze = 0.35&Omega;) feeds a 32A ring final circuit. The measured
                R1+R2 = 0.82&Omega;. Does the Zs comply?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Zs = 0.35 + (0.82 &times; 1.20) = 0.35 + 0.984 = 1.334&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Max Zs for 32A Type B = 1.44&Omega;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>1.334&Omega; &lt; 1.44&Omega; &mdash; <strong className="text-white">Compliant</strong></span>
                </li>
              </ul>
              <p className="text-sm text-white/60 mt-2">
                Note how close this is to the limit. If the cable run were slightly longer, or the Ze
                slightly higher, it could fail. Always check carefully.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 06 */}
        <InlineCheck
          id="calc-check-3"
          question="A TN-S supply has Ze = 0.8\u03A9. A 20A Type B MCB protects a radial circuit with measured R1+R2 of 1.05\u03A9. Applying the 1.20 correction factor, does the Zs comply?"
          options={[
            "Zs = 1.85\u03A9 \u2014 does not comply",
            "Zs = 2.06\u03A9 \u2014 complies with max 2.30\u03A9",
            "Zs = 1.26\u03A9 \u2014 complies easily",
            "Cannot be calculated without cable length",
          ]}
          correctIndex={1}
          explanation="Zs = Ze + (R1+R2 \u00D7 1.20) = 0.8 + (1.05 \u00D7 1.20) = 0.8 + 1.26 = 2.06\u03A9. Max Zs for 20A Type B = 2.30\u03A9. 2.06 < 2.30 so it complies."
        />

        {/* ── 07 Prospective Fault Current ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Prospective Fault Current</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Prospective fault current (Ipf) is the maximum current that would flow under a
              short-circuit or earth fault condition. Protective devices must be rated to safely
              interrupt this current &mdash; if they cannot, there is a serious risk of fire or
              explosion within the distribution board.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">Ipf = U<sub>oc</sub> / Zs</p>
              <p className="text-sm text-white/70">
                Where U<sub>oc</sub> = open-circuit voltage (typically 230V), Zs = earth fault loop impedance
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Breaking Capacity Requirements</h4>
              <p className="text-sm text-white/80 mb-2">
                The Ipf must not exceed the breaking capacity (Icn) of the protective device:
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Domestic MCBs: typically 6kA (6,000A)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Industrial MCBs: 10kA to 25kA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>MCCBs: up to 50kA or higher</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>HRC fuses (BS 88): up to 80kA</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Domestic</h4>
              <p className="text-sm text-white/80 mb-2">
                The measured Ze at the origin is 0.10&Omega;. What is the prospective fault current, and
                is a 6kA MCB suitable?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Ipf = 230 / 0.10 = 2,300A = 2.3kA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>2.3kA &lt; 6kA breaking capacity &mdash; <strong className="text-white">MCB is suitable</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; High Fault Level</h4>
              <p className="text-sm text-white/80 mb-2">
                A commercial installation close to a substation has Ze = 0.02&Omega;. What is the Ipf?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Ipf = 230 / 0.02 = 11,500A = 11.5kA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>This exceeds the 6kA rating of a standard domestic MCB</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>You would need MCBs rated at 15kA or higher, or use back-up protection (BS 88 fuses)</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                BS 7671 Regulation 434.5.1 requires that the prospective fault current be determined at
                every relevant point of the installation. This is measured at the origin using a loop
                impedance tester or PFC meter. Always record the Ipf on your electrical installation
                certificate.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 08 Bringing It All Together ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Bringing It All Together</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              In practice, you will need to combine several calculations to verify that a circuit is
              correctly designed. Here is a complete worked example from supply to final circuit.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Complete Circuit Calculation</h4>
              <p className="text-sm text-white/80 mb-3">
                <strong className="text-white">Scenario:</strong> Design check for a 20A radial circuit
                supplying a 4kW workshop heater. TN-C-S supply, Ze = 0.35&Omega;. Cable is 4.0mm&sup2;
                T&amp;E, 18m run.
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 1 &mdash; Design Current (Ib)</p>
                  <p className="text-sm text-white/80">Ib = P / V = 4000 / 230 = 17.39A</p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 2 &mdash; Protective Device (In)</p>
                  <p className="text-sm text-white/80">In = 20A MCB Type B (In &ge; Ib: 20 &ge; 17.39)</p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 3 &mdash; Cable Current Rating (Iz)</p>
                  <p className="text-sm text-white/80">
                    4.0mm&sup2; T&amp;E clipped direct (Method C): Iz = 36A. Since Iz &ge; In (36 &ge; 20), the cable is adequate.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 4 &mdash; Voltage Drop</p>
                  <p className="text-sm text-white/80">VD = 11 &times; 17.39 &times; 18 / 1000 = 3.44V (limit 11.5V &mdash; pass)</p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 5 &mdash; Earth Fault Loop Impedance</p>
                  <p className="text-sm text-white/80">
                    R1+R2 per metre for 4.0/1.5mm&sup2; = 12.02 m&Omega;/m<br />
                    R1+R2 = 12.02 &times; 18 / 1000 = 0.216&Omega;<br />
                    Zs = 0.35 + (0.216 &times; 1.20) = 0.35 + 0.259 = 0.609&Omega;<br />
                    Max Zs for 20A Type B = 2.30&Omega; &rarr; 0.609 &lt; 2.30 &mdash; pass
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 6 &mdash; Prospective Fault Current</p>
                  <p className="text-sm text-white/80">
                    Ipf = 230 / 0.35 = 657A (at origin). Well within 6kA MCB rating &mdash; pass
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-green-400" />
                Key Takeaways
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Ohm&rsquo;s Law and the power formulae are the foundation of every calculation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Voltage drop must be checked against BS 7671 limits (3% lighting, 5% other circuits)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Diversity reduces maximum demand but does not affect individual circuit protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Zs must be checked with the temperature correction factor (1.20) applied</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Prospective fault current must not exceed the breaking capacity of the protective device</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Always sense-check your answers &mdash; does the number feel realistic for the scenario?</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                In the real world, you will perform these calculations during the design stage and then
                verify them with measured values during testing and commissioning. If the measured Zs
                exceeds your calculated value, investigate &mdash; there may be a poor connection, a
                damaged conductor, or an incorrectly wired circuit.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Electrical Calculations Quiz" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module4"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module4/section2"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Cable Sizing &amp; Selection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule4Section1;