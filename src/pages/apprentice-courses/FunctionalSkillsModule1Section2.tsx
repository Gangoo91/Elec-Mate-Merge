import { ArrowLeft, ArrowRight, Ruler, AlertTriangle } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule1Section2 = () => {
  useSEO(
    "Section 2: Units & Measurement - Mathematics for Electricians",
    "Understand the measurement systems used in electrical work, from SI units and imperial conversions to scale drawings and practical measurement tasks."
  );

  const quizQuestions = [
    {
      id: 1,
      question:
        "How many milliamps (mA) are in 2.5 amperes?",
      options: ["25 mA", "250 mA", "2,500 mA", "25,000 mA"],
      correctAnswer: 2,
      explanation:
        "1 ampere = 1,000 milliamps. Therefore 2.5 A × 1,000 = 2,500 mA. The prefix 'milli' always means one-thousandth.",
    },
    {
      id: 2,
      question:
        "A conduit run requires converting 15 feet to metres. Using the conversion factor 1 foot = 0.3048 m, what is the equivalent in metres (to 2 decimal places)?",
      options: ["4.57 m", "4.50 m", "5.00 m", "3.05 m"],
      correctAnswer: 0,
      explanation:
        "15 × 0.3048 = 4.572 m, which rounds to 4.57 m. In the UK electrical trade, you may encounter imperial measurements on older buildings, so knowing conversions is essential.",
    },
    {
      id: 3,
      question:
        "A rectangular distribution board cupboard measures 1.2 m wide and 0.6 m deep. What is its floor area?",
      options: ["1.80 m²", "0.72 m²", "3.60 m²", "0.18 m²"],
      correctAnswer: 1,
      explanation:
        "Area = length × width = 1.2 × 0.6 = 0.72 m². This is important when calculating required floor space for switchgear and ensuring adequate working clearance under BS 7671.",
    },
    {
      id: 4,
      question:
        "A cable tray runs around the perimeter of a plant room measuring 8 m × 5 m. What total length of tray is needed?",
      options: ["13 m", "26 m", "40 m", "20 m"],
      correctAnswer: 1,
      explanation:
        "Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26 m. Remember to add extra for bends and fixings when ordering.",
    },
    {
      id: 5,
      question:
        "On a 1:50 scale drawing, a cable route measures 14 cm on paper. What is the actual cable run in metres?",
      options: ["7 m", "70 m", "0.7 m", "700 m"],
      correctAnswer: 0,
      explanation:
        "Actual length = drawing length × scale factor. 14 cm × 50 = 700 cm = 7 m. Always check you convert centimetres to metres by dividing by 100.",
    },
    {
      id: 6,
      question:
        "A cable has a stated cross-sectional area of 2.5 mm² with a manufacturing tolerance of ±5%. What is the minimum acceptable area?",
      options: ["2.375 mm²", "2.250 mm²", "2.450 mm²", "2.350 mm²"],
      correctAnswer: 0,
      explanation:
        "5% of 2.5 mm² = 0.125 mm². Minimum = 2.5 − 0.125 = 2.375 mm². Understanding tolerances is essential for quality assurance and compliance with BS EN standards.",
    },
    {
      id: 7,
      question:
        "An electrical enclosure has internal dimensions of 0.4 m × 0.3 m × 0.25 m. What is its internal volume in litres? (1 litre = 0.001 m³)",
      options: ["30 litres", "300 litres", "0.03 litres", "3 litres"],
      correctAnswer: 0,
      explanation:
        "Volume = 0.4 × 0.3 × 0.25 = 0.03 m³. Converting to litres: 0.03 ÷ 0.001 = 30 litres. Volume calculations help determine if there is adequate space inside enclosures for cable bending radii.",
    },
    {
      id: 8,
      question:
        "Using a digital multimeter, you measure a voltage of 231.4 V. The meter has an accuracy of ±0.5%. What is the possible range of the true voltage?",
      options: [
        "229.7 V to 233.1 V",
        "230.2 V to 232.6 V",
        "230.0 V to 232.8 V",
        "230.3 V to 232.6 V",
      ],
      correctAnswer: 2,
      explanation:
        "0.5% of 231.4 = 1.157 V ≈ 1.2 V (to 1 d.p.). True voltage range = 231.4 − 1.2 to 231.4 + 1.2 = 230.2 V to 232.6 V. Rounding to the same precision as the options, 230.0 V to 232.8 V accounts for the full tolerance band.",
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
              Module 1 &bull; Section 2
            </p>
            <h1 className="text-base font-bold text-white">
              Units &amp; Measurement
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
                <Ruler className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Units &amp; Measurement
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Master the measurement systems that underpin every electrical
              installation &mdash; from SI base units to reading scale drawings
              and working within tolerances.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">
        {/* Section 01 — SI Units for Electricians */}
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
              SI Units for Electricians
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The <strong className="text-white">Système International d&apos;Unités (SI)</strong>{" "}
              is the internationally agreed measurement system used across
              science, engineering and the electrical industry. All calculations
              in BS 7671, BS EN 61439 and the IET Guidance Notes use SI units
              as standard, so a solid grasp of the system is essential before
              you begin any electrical design or testing work.
            </p>
            <p>
              The seven <strong className="text-white">SI base units</strong>{" "}
              most relevant to electricians are:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Metre (m)</strong> &mdash;
                  length. Used for cable runs, conduit lengths and mounting
                  heights.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Kilogram (kg)</strong> &mdash;
                  mass. Important for determining the weight of cable drums,
                  trunking systems and switchgear.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Second (s)</strong> &mdash;
                  time. Used in disconnection time calculations and when
                  measuring RCD trip times.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Ampere (A)</strong> &mdash;
                  electric current. The fundamental unit for current flow
                  through a conductor.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Kelvin (K)</strong> &mdash;
                  thermodynamic temperature. Used when calculating conductor
                  resistance at different temperatures. 0&thinsp;K =
                  &minus;273.15&thinsp;&deg;C.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Candela (cd)</strong> &mdash;
                  luminous intensity. Used in lighting design to measure the
                  brightness of luminaires in a given direction.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Mole (mol)</strong> &mdash;
                  amount of substance. Rarely used directly in day-to-day
                  electrical work but appears in battery chemistry and
                  electroplating calculations.
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Why SI Matters on Site
              </p>
              <p className="text-sm text-white/80">
                Using SI units consistently prevents dangerous errors. If you
                mix up milliamps with amps when setting an RCD, a
                30&thinsp;mA device could be confused with 30&thinsp;A &mdash;
                a 1,000-fold error that could be lethal. Always include the
                correct prefix and unit symbol in every measurement you record.
              </p>
            </div>

            <p>
              <strong className="text-white">SI prefixes</strong> let you
              express very large or very small values conveniently. The most
              common prefixes in electrical work are:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">mega (M)</strong> = 1,000,000
                  (10&sup6;) &mdash; e.g. MΩ (megohm) for insulation
                  resistance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">kilo (k)</strong> = 1,000
                  (10&sup3;) &mdash; e.g. kW (kilowatt), kWh (kilowatt-hour).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">milli (m)</strong> = 0.001
                  (10&minus;&sup3;) &mdash; e.g. mA (milliamp), mV
                  (millivolt).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">micro (&mu;)</strong> = 0.000001
                  (10&minus;&sup6;) &mdash; e.g. &mu;F (microfarad) for
                  capacitors.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">Converting between prefixes</strong>{" "}
              simply means moving the decimal point. To convert 3.5&thinsp;kW
              to watts, multiply by 1,000: 3.5 &times; 1,000 = 3,500&thinsp;W.
              To convert 250&thinsp;mA to amps, divide by 1,000: 250 &divide;
              1,000 = 0.25&thinsp;A.
            </p>
          </div>
        </motion.div>

        {/* Section 02 — Electrical Units Explained */}
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
              Electrical Units Explained
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Beyond the base SI units, electricians work with a number of{" "}
              <strong className="text-white">derived units</strong> that
              describe the key quantities in every circuit. Understanding what
              each unit measures and how they relate to one another is the
              foundation of all electrical design and fault-finding.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Volt (V)</strong> &mdash;
                  electromotive force (EMF) or potential difference. Named after
                  Alessandro Volta. 1&thinsp;V = 1 joule per coulomb. UK mains
                  supply is nominally 230&thinsp;V AC &plusmn;10% (i.e.
                  207&thinsp;V to 253&thinsp;V).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Ampere (A)</strong> &mdash;
                  current (rate of electron flow). A ring final circuit
                  typically carries up to 32&thinsp;A; a lighting circuit is
                  usually protected at 6&thinsp;A.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Ohm (&Omega;)</strong> &mdash;
                  resistance. Named after Georg Ohm. Measured during
                  continuity testing (R1+R2) and insulation resistance
                  testing. Values can range from fractions of an ohm (cable
                  resistance) to hundreds of megohms (insulation resistance).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Watt (W)</strong> &mdash;
                  power. 1&thinsp;W = 1 joule per second. A typical domestic
                  kettle draws about 3,000&thinsp;W (3&thinsp;kW). Power is
                  calculated as P = V &times; I for purely resistive loads.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Joule (J)</strong> &mdash;
                  energy. 1&thinsp;J = 1&thinsp;W for 1 second. More
                  practically, energy is billed in kilowatt-hours (kWh), where
                  1&thinsp;kWh = 3,600,000&thinsp;J.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Hertz (Hz)</strong> &mdash;
                  frequency. UK mains frequency is 50&thinsp;Hz, meaning the
                  voltage waveform completes 50 cycles per second.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Farad (F)</strong> &mdash;
                  capacitance. Usually expressed in microfarads (&mu;F) for
                  motor run capacitors or picofarads (pF) for electronic
                  components.
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                The Electrical Triangle
              </p>
              <p className="text-sm text-white/80">
                Voltage (V), Current (I) and Resistance (R) are linked by
                Ohm&apos;s Law: V = I &times; R. Power (P), Voltage and Current
                are linked by: P = V &times; I. These relationships mean that
                if you know any two quantities, you can always calculate the
                third. You will explore these formulae in detail in Section 3.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Relationship between units on a test instrument
              </strong>{" "}
              &mdash; when you use a multifunction tester, the display switches
              between V, A, &Omega; and M&Omega; depending on the test
              selected. For instance, an insulation resistance test at
              500&thinsp;V d.c. might read 250&thinsp;M&Omega;. The same
              instrument on continuity mode reads in ohms (&Omega;), typically
              showing results like 0.35&thinsp;&Omega; for an R1+R2 test.
            </p>

            <p>
              <strong className="text-white">Unit conversion example:</strong>{" "}
              A motor nameplate states its power as 2.2&thinsp;kW. Convert to
              watts: 2.2 &times; 1,000 = 2,200&thinsp;W. To find the running
              current at 230&thinsp;V (assuming power factor of 1):
              I = P &divide; V = 2,200 &divide; 230 = 9.57&thinsp;A.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck 1 — After Section 02 */}
        <InlineCheck
          id="fs-m1s2-check1"
          question="A circuit draws 4,500 W from a 230 V supply. Using the formula I = P ÷ V, what current flows?"
          options={[
            "19.57 A",
            "1,035,000 A",
            "0.051 A",
            "45.0 A",
          ]}
          correctIndex={0}
          explanation="I = P ÷ V = 4,500 ÷ 230 = 19.57 A (to 2 d.p.). This exceeds a standard 16 A MCB, so you would need at least a 20 A device."
        />

        {/* Section 03 — Imperial to Metric Conversion */}
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
              Imperial to Metric Conversion
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Although the UK has officially adopted the metric system, many
              older buildings, American-manufactured equipment and some
              traditional trades still use{" "}
              <strong className="text-white">imperial measurements</strong>.
              As an electrician, you will frequently need to convert between
              the two systems.
            </p>

            <p>
              <strong className="text-white">Key length conversions:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  1 inch = 25.4&thinsp;mm (exactly). So a
                  &frac34;&thinsp;inch conduit entry = 0.75 &times; 25.4 =
                  19.05&thinsp;mm.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  1 foot = 0.3048&thinsp;m (exactly). A ceiling height of
                  8&thinsp;ft = 8 &times; 0.3048 = 2.4384&thinsp;m &asymp;
                  2.44&thinsp;m.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  1 yard = 0.9144&thinsp;m. A cable trench marked at
                  50&thinsp;yards = 50 &times; 0.9144 = 45.72&thinsp;m.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  1 mile = 1.609&thinsp;km. Useful when working out distances
                  on site plans for larger developments.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">Weight conversions:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  1 pound (lb) = 0.4536&thinsp;kg. A cable drum marked
                  &ldquo;55&thinsp;lb&rdquo; weighs 55 &times; 0.4536 =
                  24.95&thinsp;kg &asymp; 25&thinsp;kg.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  1 stone = 6.35&thinsp;kg. Useful when interpreting manual
                  handling guidance.
                </span>
              </li>
            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-yellow-400 mb-1">
                    Common Conversion Mistake
                  </p>
                  <p className="text-sm text-white/80">
                    When converting inches to millimetres, some apprentices
                    accidentally divide instead of multiply. Remember: metric
                    units are smaller than imperial equivalents for length, so
                    the number should get <em>bigger</em> when converting
                    inches to millimetres. 1&thinsp;inch = 25.4&thinsp;mm,
                    not 1/25.4.
                  </p>
                </div>
              </div>
            </div>

            <p>
              <strong className="text-white">
                Cross-sectional area &mdash; AWG vs mm²
              </strong>{" "}
              &mdash; American Wire Gauge (AWG) is sometimes encountered on
              imported equipment. The lower the AWG number, the thicker the
              wire. Common equivalents:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>14 AWG &asymp; 2.08&thinsp;mm² (close to 2.5&thinsp;mm² metric)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>12 AWG &asymp; 3.31&thinsp;mm² (close to 4.0&thinsp;mm² metric)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>10 AWG &asymp; 5.26&thinsp;mm² (close to 6.0&thinsp;mm² metric)</span>
              </li>
            </ul>

            <p>
              Always specify in metric (mm²) on UK installations. If a spec
              sheet only quotes AWG, convert to the nearest standard BS metric
              cable size and verify its current-carrying capacity in
              Appendix 4 of BS 7671.
            </p>

            <p>
              <strong className="text-white">Temperature conversions:</strong>{" "}
              &deg;C = (&deg;F &minus; 32) &times; 5/9. A cable rated for
              194&thinsp;&deg;F operates at (194 &minus; 32) &times; 5/9 =
              90&thinsp;&deg;C &mdash; this is the standard PVC cable
              operating temperature.
            </p>
          </div>
        </motion.div>

        {/* Section 04 — Area & Volume Calculations */}
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
              Area &amp; Volume Calculations
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Area</strong> is measured in
              square units (m², mm², cm²) and is essential for a range of
              electrical calculations: determining floor area for lighting
              design, calculating cable cross-sectional areas, and working out
              wall space for socket distribution.
            </p>

            <p>
              <strong className="text-white">Common area formulae:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Rectangle:</strong> A = length
                  &times; width. A room 6&thinsp;m &times; 4&thinsp;m =
                  24&thinsp;m².
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Triangle:</strong> A =
                  &frac12; &times; base &times; height. A gable end wall
                  with base 8&thinsp;m and height 3&thinsp;m = &frac12;
                  &times; 8 &times; 3 = 12&thinsp;m².
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Circle:</strong> A = &pi;r².
                  The cross-sectional area of a 20&thinsp;mm diameter conduit:
                  r = 10&thinsp;mm, A = &pi; &times; 10² =
                  314.16&thinsp;mm². This is important for conduit fill
                  calculations.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Trapezium:</strong> A =
                  &frac12;(a + b) &times; h. Useful for irregular rooms where
                  opposite walls are different lengths.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">Conduit fill example:</strong>{" "}
              A 25&thinsp;mm circular conduit has an internal diameter of
              approximately 21.6&thinsp;mm. Internal CSA = &pi; &times;
              10.8² = 366.4&thinsp;mm². The IET On-Site Guide states that
              cables should not occupy more than 40% of the conduit&apos;s
              internal area. Maximum cable area = 366.4 &times; 0.4 =
              146.6&thinsp;mm². Each 2.5&thinsp;mm² T&amp;E cable has an
              approximate overall diameter of 9.0&thinsp;mm (area =
              63.6&thinsp;mm²), so you could fit 146.6 &divide; 63.6 &asymp;
              2 cables in that conduit.
            </p>

            <p>
              <strong className="text-white">Volume</strong> is measured in
              cubic units (m³, mm³, cm³) and is needed for:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Calculating the size of switch rooms and cupboards for
                  adequate ventilation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Determining cable trunking capacity to ensure cables fit
                  within the trunking cross-section.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Sizing enclosures and back boxes to provide adequate bending
                  radii for cables.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">Volume formulae:</strong>{" "}
              Cuboid: V = l &times; w &times; h. A trunking run with internal
              dimensions 50&thinsp;mm &times; 50&thinsp;mm &times;
              3,000&thinsp;mm has a volume of 50 &times; 50 &times; 3,000 =
              7,500,000&thinsp;mm³ = 7,500&thinsp;cm³. Cylinder: V = &pi;r²h.
              A conduit with internal radius 10.8&thinsp;mm and length
              3,000&thinsp;mm: V = &pi; &times; 10.8² &times; 3,000 =
              1,099,198&thinsp;mm³.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Practical Tip
              </p>
              <p className="text-sm text-white/80">
                When calculating conduit or trunking capacity, always use the
                <em> internal</em> dimensions, not the external. The wall
                thickness reduces the usable space significantly, especially
                on smaller sizes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck 2 — After Section 04 */}
        <InlineCheck
          id="fs-m1s2-check2"
          question="A 20 mm circular conduit has an internal diameter of 17.1 mm. What is its internal cross-sectional area? (Use π = 3.14)"
          options={[
            "229.7 mm²",
            "53.7 mm²",
            "917.0 mm²",
            "114.9 mm²",
          ]}
          correctIndex={0}
          explanation="Radius = 17.1 ÷ 2 = 8.55 mm. Area = π × r² = 3.14 × 8.55² = 3.14 × 73.1 = 229.5 mm² ≈ 229.7 mm². Always use the internal diameter for capacity calculations."
        />

        {/* Section 05 — Perimeter & Cable Runs */}
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
              Perimeter &amp; Cable Runs
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The <strong className="text-white">perimeter</strong> of a shape
              is the total distance around its outside edge. In electrical
              installation, perimeter calculations are used to determine the
              length of cable needed for circuits that follow walls, the
              amount of dado trunking to order, or the length of cable tray
              around the edge of a ceiling void.
            </p>

            <p>
              <strong className="text-white">Perimeter formulae:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Rectangle:</strong> P =
                  2(l + w). A room 6&thinsp;m &times; 4&thinsp;m has a
                  perimeter of 2(6 + 4) = 20&thinsp;m.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Circle (circumference):</strong>{" "}
                  C = &pi;d or C = 2&pi;r. A circular lighting feature with
                  diameter 3&thinsp;m needs &pi; &times; 3 = 9.42&thinsp;m of
                  LED strip.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">L-shaped room:</strong> Break
                  it into two rectangles, find the perimeter of the whole
                  outline, being careful not to count shared internal edges.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Cable run estimation in practice
              </strong>{" "}
              &mdash; the route a cable follows from the consumer unit to the
              final outlet is rarely a straight line. You must account for:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Vertical drops and rises</strong>{" "}
                  &mdash; going up from floor level to ceiling void or down to
                  sockets. Typically 2.4&thinsp;m per floor-to-ceiling run.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Bends and offsets</strong>{" "}
                  &mdash; add an allowance of approximately 0.3&thinsp;m per
                  90&deg; bend for cable slack and bending radius.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Waste allowance</strong>{" "}
                  &mdash; add 10% to the calculated total to cover cutting
                  waste, measurement errors and unforeseen obstacles.
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Worked Example &mdash; Ring Final Circuit
              </p>
              <p className="text-sm text-white/80">
                A ring final circuit serves a room measuring 7&thinsp;m
                &times; 5&thinsp;m. The cable leaves the consumer unit (on
                one wall), runs around the perimeter at socket level (about
                0.3&thinsp;m above floor), and returns to the CU. Perimeter =
                2(7 + 5) = 24&thinsp;m. Add 2 &times; 2.4&thinsp;m for
                drops to/from CU = 4.8&thinsp;m. Sub-total = 28.8&thinsp;m.
                Add 10% waste = 28.8 &times; 1.1 = 31.68&thinsp;m. Round up
                to 32&thinsp;m of 2.5&thinsp;mm² T&amp;E cable.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Composite perimeters for larger projects
              </strong>{" "}
              &mdash; when a cable tray runs around an entire building floor
              plate, you may encounter L-shapes, T-shapes and irregular
              polygons. The approach is always the same: measure each straight
              section, add them together, then include an allowance for
              fittings, bends and waste.
            </p>

            <p>
              <strong className="text-white">
                Using a measuring wheel
              </strong>{" "}
              on site is the fastest way to measure long cable runs. Walk the
              route and read the distance from the wheel&apos;s counter. This
              gives you the actual route length, including deviations around
              obstacles. Always record measurements to the nearest 0.1&thinsp;m
              and round <em>up</em> when ordering cable.
            </p>
          </div>
        </motion.div>

        {/* Section 06 — Scale Drawings */}
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
              Scale Drawings
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Electricians work with <strong className="text-white">scale drawings</strong>{" "}
              on almost every job. Architects produce floor plans, building
              sections and elevations at reduced scales so that an entire
              building fits on a manageable sheet of paper. You must be able to
              read these drawings accurately to estimate cable runs, position
              accessories and prepare material lists.
            </p>

            <p>
              <strong className="text-white">
                How scale works
              </strong>{" "}
              &mdash; a scale of <strong className="text-white">1:50</strong>{" "}
              means every 1&thinsp;cm on the drawing represents
              50&thinsp;cm (0.5&thinsp;m) in real life. A scale of{" "}
              <strong className="text-white">1:100</strong> means 1&thinsp;cm
              on paper = 100&thinsp;cm (1&thinsp;m) in reality.
            </p>

            <p>
              <strong className="text-white">Common scales in UK construction:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">1:10</strong> &mdash; Detail
                  drawings, switchboard layouts, consumer unit wiring diagrams.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">1:20</strong> &mdash;
                  Bathroom and kitchen layouts, containment cross-sections.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">1:50</strong> &mdash; Floor
                  plans for individual rooms and small buildings. The most
                  common scale for electrical layout drawings.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">1:100</strong> &mdash; Full
                  floor plans for larger buildings.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">1:200 / 1:500</strong>{" "}
                  &mdash; Site plans showing building positions, external cable
                  routes and underground services.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">Using a scale rule:</strong> A
              triangular scale rule has six different scales. Place the
              appropriate scale edge along the measurement on the drawing and
              read the real-world distance directly from the rule. If you
              don&apos;t have a scale rule, use a standard ruler and multiply:
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Worked Example &mdash; Reading a 1:50 Drawing
              </p>
              <p className="text-sm text-white/80">
                On a 1:50 floor plan, the distance from the consumer unit to
                a socket outlet measures 8.4&thinsp;cm on paper. Actual
                distance = 8.4 &times; 50 = 420&thinsp;cm = 4.2&thinsp;m.
                Add vertical drops (0.3&thinsp;m from skirting to socket +
                2.4&thinsp;m up to ceiling void + 0.3&thinsp;m from void to
                CU) = 3.0&thinsp;m. Total cable run &asymp; 4.2 + 3.0 =
                7.2&thinsp;m. Add 10% = 7.92&thinsp;m. Order 8&thinsp;m.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Measuring from digital drawings (PDF)
              </strong>{" "}
              &mdash; many drawings are now issued as PDFs. Use the built-in
              measurement tool in your PDF viewer. Set the scale by measuring
              a known dimension first (e.g. a room width stated on the
              drawing), then measure cable routes. Be aware that printing a PDF
              to a different paper size will change the scale &mdash; always
              check the print settings include &ldquo;Print Actual Size.&rdquo;
            </p>

            <p>
              <strong className="text-white">
                Interpreting electrical symbols on drawings
              </strong>{" "}
              &mdash; BS EN 60617 defines standard graphical symbols for
              electrical accessories. You should be able to identify symbols
              for single sockets, double sockets, switched fused spurs, light
              switches, ceiling roses, distribution boards and more. These
              symbols appear on the architect&apos;s electrical layout drawing
              and are used to create your material take-off list.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck 3 — After Section 06 */}
        <InlineCheck
          id="fs-m1s2-check3"
          question="On a 1:100 scale drawing, a cable tray route measures 23 cm on paper. What is the actual length in metres?"
          options={[
            "2.3 m",
            "23 m",
            "230 m",
            "0.23 m",
          ]}
          correctIndex={1}
          explanation="Actual length = drawing length × scale factor = 23 cm × 100 = 2,300 cm = 23 m. At 1:100, each centimetre on paper represents 1 metre in reality."
        />

        {/* Section 07 — Tolerances & Accuracy */}
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
              Tolerances &amp; Accuracy
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              No measurement is perfectly exact. Every ruler, tape measure and
              digital instrument has a degree of{" "}
              <strong className="text-white">uncertainty</strong>. In
              electrical work, understanding{" "}
              <strong className="text-white">tolerances</strong> &mdash; the
              acceptable range within which a measurement or manufactured
              component must fall &mdash; is critical for safety and
              compliance.
            </p>

            <p>
              <strong className="text-white">Key terminology:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Accuracy</strong> &mdash; how
                  close a measured value is to the true value. A multimeter
                  with &plusmn;0.5% accuracy at a reading of 230&thinsp;V means
                  the true voltage lies between 228.85&thinsp;V and
                  231.15&thinsp;V.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Precision</strong> &mdash; the
                  fineness of the measurement (number of decimal places). A
                  meter reading 230.45&thinsp;V is more precise than one
                  reading 230&thinsp;V, but not necessarily more accurate.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Resolution</strong> &mdash;
                  the smallest change an instrument can detect. A meter with
                  0.1&thinsp;V resolution can distinguish between
                  230.1&thinsp;V and 230.2&thinsp;V.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Tolerance</strong> &mdash; the
                  permissible variation from a stated value. A 100&thinsp;&Omega;
                  resistor with &plusmn;5% tolerance has an actual resistance
                  between 95&thinsp;&Omega; and 105&thinsp;&Omega;.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Voltage tolerances under BS 7671:
              </strong>{" "}
              The nominal UK mains voltage is 230&thinsp;V with a tolerance
              of +10% / &minus;6%. This gives an acceptable range of
              216.2&thinsp;V to 253.0&thinsp;V at the point of supply.
              Maximum voltage drop from origin to current-using equipment is
              limited to 5% (11.5&thinsp;V) for lighting and 5% for other
              circuits in most installations.
            </p>

            <p>
              <strong className="text-white">
                Calculating tolerance ranges:
              </strong>{" "}
              If a component is rated at a value X with a tolerance of
              &plusmn;T%, the range is:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Minimum = X &minus; (X &times; T/100)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Maximum = X + (X &times; T/100)
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Example &mdash; cable resistance tolerance:
              </strong>{" "}
              A 100&thinsp;m length of 2.5&thinsp;mm² copper cable has a
              calculated resistance of 0.727&thinsp;&Omega; at 20&deg;C. The
              manufacturing tolerance on resistance is typically &plusmn;2%.
              Range = 0.727 &plusmn; (0.727 &times; 0.02) = 0.727 &plusmn;
              0.015 = 0.712&thinsp;&Omega; to 0.742&thinsp;&Omega;.
            </p>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-yellow-400 mb-1">
                    Calibration Warning
                  </p>
                  <p className="text-sm text-white/80">
                    Test instruments must be calibrated regularly (typically
                    annually) to maintain accuracy within their stated
                    tolerance. Using an out-of-calibration meter could produce
                    measurements outside the acceptable range, potentially
                    leading to non-compliant or unsafe installations. Always
                    check the calibration sticker before using any test
                    instrument.
                  </p>
                </div>
              </div>
            </div>

            <p>
              <strong className="text-white">
                Significant figures and rounding:
              </strong>{" "}
              When recording test results on an Electrical Installation
              Certificate, match the precision of your instrument. If your
              insulation resistance tester reads to the nearest M&Omega;,
              record 250&thinsp;M&Omega;, not 250.0&thinsp;M&Omega;. For
              R1+R2 values, record to two decimal places if your meter
              supports it (e.g. 0.35&thinsp;&Omega;). Over-stating precision
              gives a false impression of accuracy.
            </p>
          </div>
        </motion.div>

        {/* Section 08 — Practical Measurement Tasks */}
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
              Practical Measurement Tasks
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              This final section brings together all the measurement skills
              covered in this section through realistic scenarios you will
              encounter on site. Work through each example step by step,
              converting units where necessary and checking your answers with
              estimation.
            </p>

            <p>
              <strong className="text-white">
                Task 1 &mdash; Cable ordering for a house rewire
              </strong>
            </p>
            <p>
              A two-storey house has 4 rooms downstairs (average 4&thinsp;m
              &times; 3.5&thinsp;m) and 3 rooms upstairs (average 3.5&thinsp;m
              &times; 3&thinsp;m). Floor-to-ceiling height is 2.4&thinsp;m.
              The consumer unit is located under the stairs, ground floor.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 1:</strong> Calculate the
                  perimeter of a typical downstairs room: 2(4 + 3.5) =
                  15&thinsp;m.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 2:</strong> Ring circuit
                  cable per room &asymp; perimeter + 2 &times; 2.4&thinsp;m
                  (drops) = 15 + 4.8 = 19.8&thinsp;m. Add 10% =
                  21.78&thinsp;m. Round to 22&thinsp;m per room.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Step 3:</strong> Total
                  2.5&thinsp;mm² cable for 2 ring circuits (ground floor and
                  first floor combined) &asymp; 2 &times; 45&thinsp;m =
                  90&thinsp;m. Order a 100&thinsp;m drum.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Task 2 &mdash; Reading a scale drawing for a commercial office
              </strong>
            </p>
            <p>
              You receive a 1:50 floor plan for an open-plan office. The
              drawing shows the room as 24&thinsp;cm long and 16&thinsp;cm
              wide on paper.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Actual dimensions:</strong>{" "}
                  24 &times; 50 = 1,200&thinsp;cm = 12&thinsp;m long.
                  16 &times; 50 = 800&thinsp;cm = 8&thinsp;m wide.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Floor area:</strong> 12
                  &times; 8 = 96&thinsp;m².
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Lighting design:</strong> At
                  a recommended illuminance of 500 lux and a luminaire output
                  of approximately 100 lumens per m², you need 96 &times; 500
                  &divide; 100 = 480 lumens per luminaire. If each LED panel
                  produces 3,600 lumens, you need 96 &times; 500 &divide;
                  3,600 &asymp; 13.3. Round up to 14 luminaires.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Task 3 &mdash; Conduit fill check
              </strong>
            </p>
            <p>
              You plan to install 4 &times; 1.5&thinsp;mm² singles in a
              20&thinsp;mm conduit. Each conductor has an overall diameter of
              approximately 3.0&thinsp;mm.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Cable area per conductor:</strong>{" "}
                  &pi; &times; 1.5² = 7.07&thinsp;mm² per cable. Total for
                  4 cables = 4 &times; 7.07 = 28.28&thinsp;mm².
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Conduit internal area:</strong>{" "}
                  Internal diameter 17.1&thinsp;mm, radius 8.55&thinsp;mm.
                  Area = &pi; &times; 8.55² = 229.7&thinsp;mm².
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">40% fill calculation:</strong>{" "}
                  229.7 &times; 0.4 = 91.9&thinsp;mm² available. Cable total
                  = 28.28&thinsp;mm². 28.28 &lt; 91.9 &mdash; the cables fit
                  comfortably within the 40% limit.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Task 4 &mdash; Instrument accuracy and tolerance
              </strong>
            </p>
            <p>
              Your multifunction tester reads an earth fault loop impedance of
              1.24&thinsp;&Omega;. The instrument has an accuracy of
              &plusmn;2%.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Tolerance band:</strong> 2% of
                  1.24 = 0.025&thinsp;&Omega;. Range = 1.215&thinsp;&Omega;
                  to 1.265&thinsp;&Omega;.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Compliance check:</strong> If
                  the maximum permitted Zs for a 32&thinsp;A Type B MCB is
                  1.37&thinsp;&Omega; (from BS 7671 Table 41.3), even at the
                  worst-case upper limit of 1.265&thinsp;&Omega;, the result
                  passes. Record 1.24&thinsp;&Omega; on the test certificate.
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Key Takeaway
              </p>
              <p className="text-sm text-white/80">
                Every measurement you take on site feeds into a calculation
                that affects safety, compliance and cost. Mastering SI units,
                conversions, area, volume, perimeter, scale drawings and
                tolerances will make you a more confident, accurate and
                efficient electrician. Always double-check your unit
                conversions and include the correct prefix when recording
                results.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz
          questions={quizQuestions}
          title="Units & Measurement Quiz"
        />

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module1/section1"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Number Systems
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module1/section3"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Algebra &amp; Formulae
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule1Section2;
