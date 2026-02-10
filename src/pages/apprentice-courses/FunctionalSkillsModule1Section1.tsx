import { ArrowLeft, ArrowRight, Hash, AlertTriangle } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule1Section1 = () => {
  useSEO(
    "Section 1: Number Systems & Arithmetic - Mathematics for Electricians",
    "Master the fundamentals of number systems and arithmetic used every day in electrical work, from calculating cable lengths to working out diversity factors."
  );

  const quizQuestions = [
    {
      id: 1,
      question:
        "An electrician needs three cable runs of 14.5m, 22.3m and 8.75m. What is the total length of cable required?",
      options: ["44.55m", "45.55m", "45.05m", "44.05m"],
      correctAnswer: 1,
      explanation:
        "Add the three lengths: 14.5 + 22.3 + 8.75 = 45.55m. When adding decimals, align the decimal points and work from right to left.",
    },
    {
      id: 2,
      question:
        "A 230V supply experiences a 10% voltage drop. What is the voltage at the load?",
      options: ["220V", "210V", "207V", "203V"],
      correctAnswer: 2,
      explanation:
        "10% of 230V = 23V drop. Therefore the voltage at the load = 230 - 23 = 207V. This exceeds the maximum permitted 5% drop for most circuits under BS 7671.",
    },
    {
      id: 3,
      question: "Using BIDMAS, what is the result of 2 + 3 \u00d7 4?",
      options: ["20", "14", "24", "12"],
      correctAnswer: 1,
      explanation:
        "BIDMAS tells us to perform Multiplication before Addition. So 3 \u00d7 4 = 12, then 2 + 12 = 14. A common mistake is to add first, giving 20.",
    },
    {
      id: 4,
      question:
        "A drum contains 100m of cable. An electrician uses 3/8 of it. How many metres remain?",
      options: ["62.5m", "37.5m", "60m", "65m"],
      correctAnswer: 0,
      explanation:
        "3/8 of 100m = (3 \u00f7 8) \u00d7 100 = 37.5m used. Remaining = 100 - 37.5 = 62.5m.",
    },
    {
      id: 5,
      question:
        "A circuit has a design current of 28.4A. Which standard BS 88 fuse rating should you select?",
      options: ["25A", "28A", "30A", "32A"],
      correctAnswer: 3,
      explanation:
        "The fuse rating must be equal to or greater than the design current. 28.4A exceeds 25A and 30A is not a standard BS 88 rating, so the next standard rating above 28.4A is 32A. Never round down \u2014 the fuse would be undersized.",
    },
    {
      id: 6,
      question:
        "A motor has a power input of 2,400W and a useful output of 1,920W. What is its efficiency?",
      options: ["75%", "80%", "85%", "90%"],
      correctAnswer: 1,
      explanation:
        "Efficiency = (Power Out \u00f7 Power In) \u00d7 100 = (1,920 \u00f7 2,400) \u00d7 100 = 80%. The remaining 20% is lost as heat, sound and vibration.",
    },
    {
      id: 7,
      question:
        "The temperature in a cold workshop reads \u22125\u00b0C. A heater raises the temperature by 23\u00b0C. What is the new temperature?",
      options: ["28\u00b0C", "18\u00b0C", "\u221228\u00b0C", "23\u00b0C"],
      correctAnswer: 1,
      explanation:
        "Starting at \u22125\u00b0C and adding 23\u00b0C: \u22125 + 23 = 18\u00b0C. When adding a positive number to a negative number, subtract the smaller absolute value from the larger and keep the sign of the larger.",
    },
    {
      id: 8,
      question:
        "An estimate for a job includes 47 metres of cable at \u00a31.85 per metre. Using estimation (rounding to convenient numbers), approximately how much will the cable cost?",
      options: ["About \u00a375", "About \u00a390", "About \u00a3100", "About \u00a385"],
      correctAnswer: 1,
      explanation:
        "Round 47m to 50m and \u00a31.85 to \u00a31.80. 50 \u00d7 \u00a31.80 = \u00a390. The exact answer is \u00a386.95, so \u00a390 is the closest reasonable estimate. Estimation helps you quickly verify quotes and spot errors.",
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
              Module 1 &bull; Section 1
            </p>
            <h1 className="text-base font-bold text-white">
              Number Systems &amp; Arithmetic
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
                <Hash className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Number Systems &amp; Arithmetic
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Build a solid foundation in the number skills you will use every
              day on site &mdash; from calculating cable lengths to working out
              diversity percentages.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">
        {/* Section 01 — Whole Numbers in Electrical Work */}
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
              Whole Numbers in Electrical Work
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Whole numbers (also called integers) are the building blocks of
              all mathematics. As an electrician, you will encounter them
              constantly: counting cable clips, reading circuit numbers on a
              distribution board, or tallying up the number of sockets on a
              ring final circuit.
            </p>
            <p>
              The four basic operations with whole numbers are{" "}
              <strong className="text-white">addition (+)</strong>,{" "}
              <strong className="text-white">subtraction (&minus;)</strong>,{" "}
              <strong className="text-white">multiplication (&times;)</strong>{" "}
              and{" "}
              <strong className="text-white">division (&divide;)</strong>.
              Each appears regularly in everyday electrical tasks:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Addition:</strong> Totalling
                  the number of accessories on a floor plan &mdash; e.g. 14
                  double sockets + 6 single sockets + 3 fused spurs = 23
                  accessories.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Subtraction:</strong> Working
                  out remaining stock &mdash; you started with 500 cable ties
                  and used 187, leaving 313.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Multiplication:</strong>{" "}
                  Calculating total cost &mdash; 12 back boxes at &pound;2
                  each = &pound;24.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Division:</strong> Sharing
                  materials equally &mdash; 96 metres of trunking split across
                  4 floors = 24 metres per floor.
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Practical Tip
              </p>
              <p className="text-sm text-white/80">
                Always double-check your arithmetic on site. A simple addition
                error when measuring cable runs can result in expensive waste
                or, worse, a cable that is too short to reach the intended
                point. Get into the habit of doing a quick estimate first,
                then calculating precisely.
              </p>
            </div>

            <p>
              <strong className="text-white">Place value</strong> is also
              important. The number 2,430 means 2 thousands, 4 hundreds, 3
              tens and 0 units. Understanding place value helps you read
              meter readings accurately and avoid costly mistakes when
              interpreting measurement data. For instance, misreading a meter
              as 2,430 kWh instead of 24,300 kWh would result in a billing
              error of a factor of ten.
            </p>

            <p>
              <strong className="text-white">Long multiplication</strong>{" "}
              is needed when calculating material costs on larger jobs. For
              example, 156 cable clips at 8p each: 156 &times; 8 = 1,248p =
              &pound;12.48. Break it down: (150 &times; 8) + (6 &times; 8) =
              1,200 + 48 = 1,248.
            </p>

            <p>
              <strong className="text-white">Long division</strong> helps when
              splitting quantities. If you have 1,350 metres of cable to
              distribute equally across 6 circuits: 1,350 &divide; 6 = 225m
              per circuit.
            </p>
          </div>
        </motion.div>

        {/* Section 02 — Decimals & Precision */}
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
              Decimals &amp; Precision
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Decimals allow us to express values more precisely than whole
              numbers alone. In electrical work, precision matters: a cable
              conductor cross-sectional area might be 2.5&thinsp;mm&sup2;, a
              voltage reading 232.7V, or a test result 0.35&thinsp;&Omega;.
            </p>

            <p>
              <strong className="text-white">Adding and subtracting decimals:</strong>{" "}
              Line up the decimal points, then proceed as with whole numbers.
              For example, when measuring cable runs: 12.45m + 8.3m + 0.75m.
              Rewrite as:
            </p>

            <div className="bg-white/5 rounded-lg p-4 font-mono text-sm text-green-300">
              <pre className="whitespace-pre">
{`  12.45
+  8.30
+  0.75
-------
  21.50m`}
              </pre>
            </div>

            <p>
              <strong className="text-white">Multiplying decimals:</strong>{" "}
              Multiply as if there were no decimal points, then count the
              total number of decimal places in both numbers and place the
              point accordingly. For instance, calculating the cost of 23.5
              metres of cable at &pound;1.24 per metre:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>235 &times; 124 = 29,140</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Total decimal places: 1 (from 23.5) + 2 (from 1.24) = 3
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>Answer: &pound;29.140 = &pound;29.14</span>
              </li>
            </ul>

            <p>
              <strong className="text-white">Dividing decimals:</strong>{" "}
              When dividing by a decimal, multiply both the divisor and the
              dividend by 10 (or 100, etc.) to make the divisor a whole
              number. For example, 45.6 &divide; 1.2 becomes 456 &divide; 12
              = 38.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Key Point
              </p>
              <p className="text-sm text-white/80">
                When recording test results on an Electrical Installation
                Certificate (EIC), values such as insulation resistance
                (M&Omega;), earth fault loop impedance (Zs) and
                R1&thinsp;+&thinsp;R2 readings are all expressed as decimals.
                Getting these right is essential for compliance with BS 7671.
              </p>
            </div>

            <p>
              <strong className="text-white">Decimal places vs significant figures:</strong>{" "}
              Two decimal places (2 d.p.) means two digits after the point,
              e.g. 4.57. Two significant figures (2 s.f.) means two meaningful
              digits, e.g. 4.6 or 0.046. Your test instruments typically
              display readings to a specific number of decimal places, and
              you should record them as displayed without rounding unless
              instructed otherwise.
            </p>

            <p>
              <strong className="text-white">Recurring decimals:</strong>{" "}
              Some fractions produce decimals that repeat forever. For example,
              1&frasl;3 = 0.333... In practice, round to the number of decimal
              places appropriate for your task &mdash; usually 2 d.p. for
              currency and 2&ndash;3 d.p. for test results.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck after section 02 */}
        <InlineCheck
          id="fs-m1s1-check1"
          question="An electrician measures three cable runs: 7.85m, 12.4m, and 3.75m. What is the total cable length needed?"
          options={["23.00m", "24.00m", "23.50m", "24.10m"]}
          correctIndex={1}
          explanation="Line up the decimal points: 7.85 + 12.40 + 3.75 = 24.00m. Remember to add a trailing zero to 12.4 so all numbers have two decimal places."
        />

        {/* Section 03 — Fractions in Practice */}
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
              Fractions in Practice
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Fractions express parts of a whole. Although the UK electrical
              industry primarily uses metric measurements, you will still
              encounter fractions in several contexts: older imperial conduit
              sizes (e.g. &frac34; inch), splitting materials between teams,
              and understanding technical documentation.
            </p>
            <p>
              A fraction has two parts: the{" "}
              <strong className="text-white">numerator</strong> (top number)
              and the <strong className="text-white">denominator</strong>{" "}
              (bottom number). In the fraction &frac34;, the numerator is 3
              and the denominator is 4, meaning 3 out of 4 equal parts.
            </p>

            <p>
              <strong className="text-white">Adding and subtracting fractions:</strong>{" "}
              You need a common denominator. For example, &frac12; + &frac14;:
              convert &frac12; to 2&frasl;4, then add: 2&frasl;4 + 1&frasl;4 =
              &frac34;.
            </p>

            <p>
              <strong className="text-white">Multiplying fractions:</strong>{" "}
              Multiply the numerators together and the denominators together.
              For example, 2&frasl;3 &times; &frac34; = 6&frasl;12 = &frac12;.
            </p>

            <p>
              <strong className="text-white">Dividing fractions:</strong>{" "}
              Flip the second fraction (take its reciprocal) and multiply.
              For example, &frac34; &divide; &frac12; = &frac34; &times;
              2&frasl;1 = 6&frasl;4 = 1&frac12;.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Electrical Example
              </p>
              <p className="text-sm text-white/80">
                A 100-metre drum of twin-and-earth cable is shared equally
                among 4 teams. Each team gets &frac14; of the drum = 25m.
                If one team only uses 3&frasl;5 of their allocation, they use
                3&frasl;5 &times; 25 = 15m, leaving 10m spare.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Converting between fractions, decimals and percentages:
              </strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Fraction to decimal: divide numerator by denominator &mdash;
                  &frac38; = 3 &divide; 8 = 0.375
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Decimal to percentage: multiply by 100 &mdash; 0.375 &times;
                  100 = 37.5%
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Percentage to fraction: write over 100 and simplify &mdash;
                  37.5% = 375&frasl;1000 = &frac38;
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">Mixed numbers and improper fractions:</strong>{" "}
              A mixed number like 2&frac34; means 2 whole units and &frac34;
              of another. To convert to an improper fraction: (2 &times; 4 +
              3)&frasl;4 = 11&frasl;4. This is useful when multiplying or
              dividing mixed numbers &mdash; always convert to improper
              fractions first.
            </p>

            <p>
              <strong className="text-white">Simplifying fractions:</strong>{" "}
              Divide both numerator and denominator by their highest common
              factor (HCF). For example, 12&frasl;18: HCF of 12 and 18 is 6,
              so 12&frasl;18 = 2&frasl;3.
            </p>
          </div>
        </motion.div>

        {/* Section 04 — Percentages & Efficiency */}
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
              Percentages &amp; Efficiency
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Percentages are used extensively in electrical work. From
              calculating voltage drop as a percentage of supply voltage, to
              applying diversity factors, to working out VAT on a quotation
              &mdash; you need to be confident with percentage calculations.
            </p>

            <p>
              <strong className="text-white">Finding a percentage of a value:</strong>{" "}
              To find X% of a number, multiply by X&frasl;100. For example,
              the maximum permitted voltage drop on a lighting circuit is 3%
              of the nominal supply voltage:
            </p>
            <div className="bg-white/5 rounded-lg p-4 font-mono text-sm text-green-300">
              3% of 230V = (3 &divide; 100) &times; 230 = 6.9V
            </div>

            <p>
              <strong className="text-white">Expressing one value as a percentage of another:</strong>{" "}
              Divide the part by the whole, then multiply by 100. For example,
              if a cable carrying a load has a 5.2V drop on a 230V supply:
            </p>
            <div className="bg-white/5 rounded-lg p-4 font-mono text-sm text-green-300">
              (5.2 &divide; 230) &times; 100 = 2.26%
            </div>

            <p>
              <strong className="text-white">Percentage increase and decrease:</strong>{" "}
              These are essential for understanding price changes and
              electrical efficiency. To increase a value by 20% (e.g. adding
              VAT): multiply by 1.20. To decrease by 15%: multiply by 0.85.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Diversity in Practice
              </p>
              <p className="text-sm text-white/80">
                Diversity factors from BS 7671 are percentages applied to
                assumed maximum demand. For example, if a dwelling has 10
                socket outlets at 13A each, you do not assume all are in use
                simultaneously. The diversity table may allow 100% of the
                largest circuit + 40% of the remaining circuits, significantly
                reducing the total assumed demand for cable and protective
                device sizing.
              </p>
            </div>

            <p>
              <strong className="text-white">Efficiency calculations:</strong>{" "}
              Electrical efficiency is the ratio of useful power output to
              total power input, expressed as a percentage:
            </p>
            <div className="bg-white/5 rounded-lg p-4 font-mono text-sm text-green-300">
              Efficiency = (Power Out &divide; Power In) &times; 100%
            </div>
            <p>
              A motor with 1,800W input and 1,530W useful output has an
              efficiency of (1,530 &divide; 1,800) &times; 100 = 85%. The
              remaining 15% is lost as heat, sound and vibration.
            </p>

            <p>
              <strong className="text-white">Quick percentage methods:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">10%:</strong> Divide by 10
                  (move decimal point one place left)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">5%:</strong> Find 10%, then
                  halve it
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">1%:</strong> Divide by 100
                  (move decimal point two places left)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">25%:</strong> Divide by 4
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">20%:</strong> Divide by 5
                  (useful for VAT calculations)
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">Reverse percentages:</strong>{" "}
              If a price including 20% VAT is &pound;360, what was the
              pre-VAT price? Divide by 1.20: &pound;360 &divide; 1.20 =
              &pound;300. Do not simply subtract 20% of &pound;360 (&pound;72)
              &mdash; that would give &pound;288, which is incorrect.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck after section 04 */}
        <InlineCheck
          id="fs-m1s1-check2"
          question="A 400V three-phase supply has a measured voltage drop of 14V. What is the percentage voltage drop?"
          options={["2.8%", "3.2%", "3.5%", "4.0%"]}
          correctIndex={2}
          explanation="Percentage drop = (14 \u00f7 400) \u00d7 100 = 3.5%. This is within the 5% limit set by BS 7671 for power circuits, but close to the 3% limit for lighting."
        />

        {/* Section 05 — BIDMAS Order of Operations */}
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
              BIDMAS Order of Operations
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              When a calculation involves more than one operation, the order
              in which you perform them matters. BIDMAS (sometimes called
              BODMAS) tells you the correct sequence:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-green-400 font-bold text-lg">B</p>
                <p className="text-white font-medium">Brackets</p>
                <p className="text-white/60 text-xs">
                  Evaluate contents of brackets first
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-green-400 font-bold text-lg">I</p>
                <p className="text-white font-medium">Indices (Powers)</p>
                <p className="text-white/60 text-xs">
                  Squares, cubes, square roots, etc.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-green-400 font-bold text-lg">DM</p>
                <p className="text-white font-medium">
                  Division &amp; Multiplication
                </p>
                <p className="text-white/60 text-xs">
                  Left to right, equal priority
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-green-400 font-bold text-lg">AS</p>
                <p className="text-white font-medium">
                  Addition &amp; Subtraction
                </p>
                <p className="text-white/60 text-xs">
                  Left to right, equal priority
                </p>
              </div>
            </div>

            <p>
              <strong className="text-white">
                Why does BIDMAS matter for electricians?
              </strong>{" "}
              Electrical formulae often combine multiple operations. Consider
              calculating total power dissipated in a resistor:
            </p>

            <div className="bg-white/5 rounded-lg p-4 font-mono text-sm text-green-300">
              <p>P = V&sup2; &divide; R</p>
              <p className="mt-1">P = 230&sup2; &divide; 46</p>
              <p className="mt-1">
                Step 1 (Indices): 230&sup2; = 52,900
              </p>
              <p className="mt-1">
                Step 2 (Division): 52,900 &divide; 46 = 1,150W
              </p>
            </div>

            <p>
              If you mistakenly divided 230 by 46 first (getting 5), then
              squared the result (getting 25W), you would be wildly wrong.
              The correct answer is 1,150W &mdash; quite different from 25W!
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Worked Example
              </p>
              <p className="text-sm text-white/80">
                Calculate: 2 &times; (15 + 5)&sup2; &divide; 10
              </p>
              <p className="text-sm text-white/80 mt-2">
                Step 1 &mdash; Brackets: (15 + 5) = 20
                <br />
                Step 2 &mdash; Indices: 20&sup2; = 400
                <br />
                Step 3 &mdash; Multiply: 2 &times; 400 = 800
                <br />
                Step 4 &mdash; Divide: 800 &divide; 10 = 80
              </p>
            </div>

            <p>
              <strong className="text-white">Common mistake:</strong> Students
              often forget that multiplication and division have equal
              priority, as do addition and subtraction. When operations of
              equal priority appear together, work from left to right.
            </p>

            <p>
              <strong className="text-white">Nested brackets:</strong> When
              brackets appear inside other brackets, work from the innermost
              pair outward. For example: 3 &times; [(4 + 2) &times; 5] =
              3 &times; (6 &times; 5) = 3 &times; 30 = 90.
            </p>

            <p>
              <strong className="text-white">
                Using your calculator correctly:
              </strong>{" "}
              Scientific calculators follow BIDMAS automatically, but basic
              calculators may not. If in doubt, use brackets on your
              calculator to force the correct order. For the power formula
              P = V&sup2;&divide;R, enter: (230) x&sup2; &divide; 46 =.
            </p>
          </div>
        </motion.div>

        {/* Section 06 — Negative Numbers */}
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
            <h3 className="text-lg font-bold text-white">Negative Numbers</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Negative numbers appear in several areas of electrical work,
              most notably in temperature readings for cable derating, in
              accounting (profit and loss on a job), and when working with
              alternating current waveforms that swing between positive and
              negative values.
            </p>

            <p>
              <strong className="text-white">
                Rules for working with negative numbers:
              </strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">
                    Adding a negative number
                  </strong>{" "}
                  is the same as subtracting: 10 + (&minus;3) = 10 &minus; 3 =
                  7
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">
                    Subtracting a negative number
                  </strong>{" "}
                  is the same as adding: 10 &minus; (&minus;3) = 10 + 3 = 13
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">
                    Multiplying/dividing:
                  </strong>{" "}
                  Same signs give a positive result; different signs give a
                  negative result
                </span>
              </li>
            </ul>

            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white font-medium text-sm mb-2">
                Sign rules for multiplication and division:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-green-500/10 rounded-lg p-2 text-center">
                  <p className="font-mono text-green-300">
                    (+) &times; (+) = +
                  </p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-2 text-center">
                  <p className="font-mono text-green-300">
                    (&minus;) &times; (&minus;) = +
                  </p>
                </div>
                <div className="bg-red-500/10 rounded-lg p-2 text-center">
                  <p className="font-mono text-red-300">
                    (+) &times; (&minus;) = &minus;
                  </p>
                </div>
                <div className="bg-red-500/10 rounded-lg p-2 text-center">
                  <p className="font-mono text-red-300">
                    (&minus;) &times; (+) = &minus;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Temperature &amp; Cable Rating
              </p>
              <p className="text-sm text-white/80">
                BS 7671 provides correction factors for ambient temperature.
                If cables are installed in an environment at &minus;5&deg;C,
                the correction factor is greater than 1 (e.g. 1.06 for
                thermoplastic cables), meaning the cable can actually carry
                slightly more current. Conversely, at higher temperatures
                like 45&deg;C the factor drops below 1 (e.g. 0.79), requiring
                a larger cable to carry the same current safely.
              </p>
            </div>

            <p>
              <strong className="text-white">Number lines</strong> are a
              useful visual tool. Imagine a thermometer: temperatures above
              zero are positive, below zero are negative. Moving right (or
              up) increases the value; moving left (or down) decreases it.
            </p>

            <p>
              <strong className="text-white">Practical example:</strong> A
              cold store for a commercial installation has a temperature of
              &minus;18&deg;C. The cable route passes through a plant room at
              35&deg;C before entering the cold store. The temperature
              difference is 35 &minus; (&minus;18) = 35 + 18 = 53&deg;C. This
              range must be considered when selecting cable insulation ratings
              and ensuring the cable can withstand thermal cycling.
            </p>

            <p>
              <strong className="text-white">AC waveforms:</strong> An
              alternating current constantly switches between positive and
              negative values. The peak voltage of UK mains is approximately
              +325V to &minus;325V (the 230V figure is the RMS value). When
              studying three-phase systems, understanding positive and
              negative values becomes even more critical.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck after section 06 */}
        <InlineCheck
          id="fs-m1s1-check3"
          question="What is the result of \u22128 \u00d7 \u22123?"
          options={["\u221224", "24", "\u221211", "11"]}
          correctIndex={1}
          explanation="When you multiply two negative numbers, the result is positive. \u22128 \u00d7 \u22123 = +24. Remember: same signs = positive, different signs = negative."
        />

        {/* Section 07 — Rounding & Estimation */}
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
              Rounding &amp; Estimation
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Rounding makes numbers easier to work with. In electrical work,
              you round for different reasons: to select the next standard
              fuse rating, to estimate material quantities, or to express
              test results to an appropriate number of decimal places.
            </p>

            <p>
              <strong className="text-white">Rules for rounding:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Look at the digit to the right of your rounding position
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  If it is 5 or above, round up; if 4 or below, round down
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  For fuse/MCB selection, always round <em>up</em> to the
                  next standard rating (never down)
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Standard Fuse Ratings (BS 88)
              </p>
              <p className="text-sm text-white/80">
                Common ratings: 6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A,
                80A, 100A, 125A. If your design current (Ib) is 27.3A, you
                must select the next standard rating up: 32A. Never round
                down to 25A &mdash; the fuse would be undersized and could
                nuisance-trip or fail to protect the circuit properly.
              </p>
            </div>

            <p>
              <strong className="text-white">Estimation</strong> is a
              powerful tool for checking whether your calculated answer is
              reasonable. Round each number to one significant figure, then
              do the calculation mentally:
            </p>

            <div className="bg-white/5 rounded-lg p-4 font-mono text-sm text-green-300">
              <p>Exact: 48.7 &times; 2.15 = ?</p>
              <p className="mt-1">Estimate: 50 &times; 2 = 100</p>
              <p className="mt-1">Exact answer: 104.705</p>
              <p className="mt-1 text-white/60">
                The estimate of 100 confirms the exact answer is reasonable.
              </p>
            </div>

            <p>
              <strong className="text-white">
                When to use estimation on site:
              </strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Quickly checking a supplier&rsquo;s quote for materials
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Estimating how much cable to order before doing the precise
                  take-off
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Verifying calculator results &mdash; if the estimate and
                  the calculated answer are far apart, you may have made a
                  keying error
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Giving a customer a rough idea of costs before preparing a
                  formal quotation
                </span>
              </li>
            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <p className="text-xs font-semibold text-yellow-400">
                  Important Note
                </p>
              </div>
              <p className="text-sm text-white/80">
                Estimation is for checking, not for final answers. Always use
                precise calculations for protective device selection, cable
                sizing and voltage drop calculations. Safety-critical work
                demands accuracy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 08 — Putting It All Together */}
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
              Putting It All Together
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Now let us combine everything from this section in a realistic
              electrical scenario. A qualified electrician might encounter a
              task like this on any working day:
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Scenario: Kitchen Rewire Quotation
              </p>
              <p className="text-sm text-white/80">
                You are asked to provide a quotation for rewiring a domestic
                kitchen. The customer needs:
              </p>
              <ul className="space-y-1 pl-1 mt-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>6 double sockets on a ring final circuit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>1 cooker circuit (separate radial)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>4 LED downlights on a lighting circuit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>1 fused spur for an extractor fan</span>
                </li>
              </ul>
            </div>

            <p>
              <strong className="text-white">
                Step 1 &mdash; Cable measurement (decimals):
              </strong>{" "}
              Measure the cable runs. The ring circuit totals 28.5m of
              2.5&thinsp;mm&sup2; twin-and-earth. The cooker circuit needs
              12.75m of 6&thinsp;mm&sup2;. The lighting circuit requires
              15.3m of 1.5&thinsp;mm&sup2;. The extractor spur needs 4.8m of
              2.5&thinsp;mm&sup2;.
            </p>

            <p>
              <strong className="text-white">
                Step 2 &mdash; Material costing (multiplication):
              </strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  2.5&thinsp;mm&sup2; cable: (28.5 + 4.8)m = 33.3m at
                  &pound;0.85/m = &pound;28.31
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  6&thinsp;mm&sup2; cable: 12.75m at &pound;1.95/m =
                  &pound;24.86
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  1.5&thinsp;mm&sup2; cable: 15.3m at &pound;0.55/m =
                  &pound;8.42
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Step 3 &mdash; Add wastage allowance (percentage):
              </strong>{" "}
              Add 10% for wastage and off-cuts. Total cable cost = &pound;28.31
              + &pound;24.86 + &pound;8.42 = &pound;61.59. With 10% wastage:
              &pound;61.59 &times; 1.10 = &pound;67.75.
            </p>

            <p>
              <strong className="text-white">
                Step 4 &mdash; Estimate check (rounding):
              </strong>{" "}
              Quick estimate: roughly &pound;30 + &pound;25 + &pound;8 =
              &pound;63, plus 10% &asymp; &pound;69. Our calculated
              &pound;67.75 is close &mdash; confidence the arithmetic is
              correct.
            </p>

            <p>
              <strong className="text-white">
                Step 5 &mdash; Add VAT at 20% (percentage increase):
              </strong>{" "}
              If the total job (materials + labour) comes to &pound;485.00,
              the VAT = &pound;485.00 &times; 0.20 = &pound;97.00. Grand
              total = &pound;582.00. Always show VAT separately on your
              invoices.
            </p>

            <p>
              <strong className="text-white">
                Step 6 &mdash; Circuit protection (rounding up):
              </strong>{" "}
              The cooker has a rated current of 28.7A. Using BIDMAS with the
              power formula: I = P &divide; V = 6,600 &divide; 230 = 28.7A.
              Select the next standard BS 88 fuse rating: 32A. The ring
              circuit is protected by a 32A device as standard.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Key Takeaway
              </p>
              <p className="text-sm text-white/80">
                Every calculation skill in this section &mdash; whole numbers,
                decimals, fractions, percentages, BIDMAS, negative numbers,
                rounding and estimation &mdash; is used in real electrical
                work. Practise these fundamentals until they become second
                nature, and your accuracy on site will improve dramatically.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz
          questions={quizQuestions}
          title="Number Systems & Arithmetic Quiz"
        />

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module1"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module1/section2"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Units &amp; Measurement
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule1Section1;
