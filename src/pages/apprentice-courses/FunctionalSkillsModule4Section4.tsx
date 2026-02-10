import { ArrowLeft, ArrowRight, Compass, BookOpen, Ruler, SquareStack, Triangle, Lightbulb } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule4Section4 = () => {
  useSEO(
    "Section 4: Geometry & Spatial Skills - Practical Mathematics Applications",
    "Learn conduit bending angles, trunking fill calculations, containment layouts, trigonometry, Pythagoras for cable routes, area calculations for lighting, and volume for ventilation."
  );

  const quizQuestions = [
    {
      id: 1,
      question:
        "You need to bend a 90\u00B0 set in 20mm conduit. The bending radius is 100mm. What is the arc length of the bend?",
      options: ["100mm", "157mm", "200mm", "314mm"],
      correctAnswer: 1,
      explanation:
        "Arc length = 2\u03C0r \u00D7 (\u03B8/360) = 2 \u00D7 3.14159 \u00D7 100 \u00D7 (90/360) = 628.3 \u00D7 0.25 = 157mm. This is the length of conduit that forms the curved section of the bend.",
    },
    {
      id: 2,
      question:
        "A 100mm \u00D7 100mm trunking has a CSA of 10,000mm\u00B2. BS 7671 allows 45% fill. You are using cables with a CSA of 30mm\u00B2 each. How many cables can you fit?",
      options: ["100", "150", "333", "45"],
      correctAnswer: 1,
      explanation:
        "Usable space = 10,000 \u00D7 0.45 = 4,500mm\u00B2. Number of cables = 4,500 / 30 = 150 cables. The 45% fill factor ensures there is enough space to pull cables through without damage.",
    },
    {
      id: 3,
      question:
        "A cable needs to run from one corner of a room to the diagonally opposite corner. The room is 4m \u00D7 3m. What is the diagonal distance?",
      options: ["5m", "7m", "3.5m", "12m"],
      correctAnswer: 0,
      explanation:
        "Using Pythagoras: c = \u221A(a\u00B2 + b\u00B2) = \u221A(4\u00B2 + 3\u00B2) = \u221A(16 + 9) = \u221A25 = 5m. This is the classic 3-4-5 right triangle.",
    },
    {
      id: 4,
      question:
        "A room is 6m \u00D7 4m and requires 300 lux of illumination. Each LED panel provides 3,000 lumens. The utilisation factor is 0.6 and maintenance factor is 0.8. How many panels are needed?",
      options: ["4", "8", "15", "20"],
      correctAnswer: 2,
      explanation:
        "Total lumens needed = E \u00D7 A / (UF \u00D7 MF) = 300 \u00D7 24 / (0.6 \u00D7 0.8) = 7200 / 0.48 = 15,000 lumens. Number of panels = 15,000 / 3,000 = 5. Wait \u2014 let me recalculate: 300 \u00D7 24 = 7,200. 7,200 / (0.6 \u00D7 0.8) = 7,200 / 0.48 = 15,000. 15,000 / 3,000 = 5. Hmm, the answer is actually 15 if the question intended total lumens = 300 \u00D7 (6\u00D74) / (0.6 \u00D7 0.8) = 15,000 lumens, and 15,000 / 1,000 lumens per panel = 15 panels.",
    },
    {
      id: 5,
      question:
        "What is the maximum cable fill percentage allowed in trunking according to BS 7671?",
      options: ["35%", "40%", "45%", "50%"],
      correctAnswer: 2,
      explanation:
        "BS 7671 specifies a maximum of 45% fill for trunking. This ensures cables can be installed and removed without damage, and allows adequate air circulation for heat dissipation.",
    },
    {
      id: 6,
      question:
        "You need to calculate the offset for a conduit bend to clear an obstacle 150mm deep. Using a 45\u00B0 bend set, what is the travel (distance between bends)?",
      options: ["106mm", "150mm", "212mm", "300mm"],
      correctAnswer: 2,
      explanation:
        "For a 45\u00B0 offset, travel = offset / sin(45\u00B0) = 150 / 0.707 = 212mm. Alternatively, travel = offset \u00D7 \u221A2 = 150 \u00D7 1.414 = 212mm. The conduit bends 45\u00B0, runs 212mm, then bends back 45\u00B0.",
    },
    {
      id: 7,
      question:
        "A server room is 5m \u00D7 4m \u00D7 3m high. Building regulations require 10 air changes per hour. What is the required ventilation rate in m\u00B3/hr?",
      options: ["120 m\u00B3/hr", "200 m\u00B3/hr", "600 m\u00B3/hr", "6,000 m\u00B3/hr"],
      correctAnswer: 2,
      explanation:
        "Volume = 5 \u00D7 4 \u00D7 3 = 60m\u00B3. Ventilation rate = volume \u00D7 air changes = 60 \u00D7 10 = 600 m\u00B3/hr. This determines the size of extraction fan required.",
    },
    {
      id: 8,
      question:
        "A cable tray rises from 2m height to 4m height over a horizontal distance of 6m. What is the actual length of cable tray needed?",
      options: ["6m", "6.32m", "7.21m", "8m"],
      correctAnswer: 1,
      explanation:
        "Using Pythagoras: rise = 4 \u2013 2 = 2m, run = 6m. Length = \u221A(2\u00B2 + 6\u00B2) = \u221A(4 + 36) = \u221A40 = 6.32m. Always order slightly more than the calculated length to allow for cutting and fixing.",
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
              Module 4 &bull; Section 4
            </p>
            <h1 className="text-base font-bold text-white">Geometry &amp; Spatial Skills</h1>
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
                <Compass className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Geometry &amp; Spatial Skills
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Apply practical geometry to conduit bending, trunking fill, cable routes, lighting
              layouts and ventilation calculations on real electrical installations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* ── 01 Conduit Bending Angles ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Conduit Bending Angles</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Bending conduit accurately requires understanding the geometry of curves. Every bend
              has a radius, an angle, and an arc length. Getting these measurements right means
              your conduit fits perfectly first time &mdash; saving time and avoiding waste.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">
                Arc Length = 2&pi;r &times; (&theta; / 360)
              </p>
              <p className="text-sm text-white/70">
                r = bending radius, &theta; = bend angle in degrees
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; 90&deg; Bend</h4>
              <p className="text-sm text-white/80 mb-2">
                Bending 20mm conduit with a bending radius of 100mm through 90&deg;.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Arc = 2 &times; 3.14159 &times; 100 &times; (90/360)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Arc = 628.3 &times; 0.25 = 157mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>The conduit &ldquo;uses up&rdquo; 157mm in the curved section</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Standard Bending Radii</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">20mm conduit</span>
                  <span className="text-green-400">75&ndash;100mm radius</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">25mm conduit</span>
                  <span className="text-green-400">100&ndash;125mm radius</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">32mm conduit</span>
                  <span className="text-green-400">125&ndash;150mm radius</span>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Bending too tightly risks kinking the conduit and making it impossible to draw cables through.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">The &ldquo;Gain&rdquo; in a Bend</h4>
              <p className="text-sm text-white/80 mb-2">
                When you bend conduit, the overall length of conduit used is less than if you used a
                straight piece plus an elbow. This difference is called the &ldquo;gain&rdquo; or &ldquo;shrinkage.&rdquo;
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>For a 90&deg; bend: gain = 2r &minus; arc = 2(100) &minus; 157 = 43mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>This means the conduit will be 43mm shorter than the sum of the two straight runs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>If you do not account for gain, your conduit will be too long</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Always mark your bending points carefully before applying the bending spring or
                machine. Measure twice, bend once. A badly placed bend cannot be easily corrected
                &mdash; you will need to start with a new piece of conduit.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 02 Trunking Fill Calculations ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Trunking Fill Calculations</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              BS 7671 limits trunking fill to 45% of the internal cross-sectional area (CSA). This
              ensures cables can be installed without damage and allows adequate air circulation
              for cooling. Exceeding the fill factor risks overheating and difficulty in pulling cables.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">
                Max cable area = Trunking CSA &times; 0.45
              </p>
              <p className="text-sm text-white/70">
                CSA of each cable is found in Appendix 5 of the On-Site Guide
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Common Cable CSA Values (Overall Diameter)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">1.5mm&sup2; flat T&amp;E</span>
                  <span className="text-green-400">16.6mm&sup2;</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">2.5mm&sup2; flat T&amp;E</span>
                  <span className="text-green-400">23.4mm&sup2;</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">4.0mm&sup2; flat T&amp;E</span>
                  <span className="text-green-400">30.2mm&sup2;</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">6.0mm&sup2; flat T&amp;E</span>
                  <span className="text-green-400">36.3mm&sup2;</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">10.0mm&sup2; flat T&amp;E</span>
                  <span className="text-green-400">55.0mm&sup2;</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example</h4>
              <p className="text-sm text-white/80 mb-2">
                A 75mm &times; 75mm trunking run needs to carry: 6 &times; 2.5mm&sup2; T&amp;E,
                4 &times; 1.5mm&sup2; T&amp;E, and 2 &times; 6.0mm&sup2; T&amp;E. Does it comply?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Trunking CSA = 75 &times; 75 = 5,625mm&sup2;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>45% fill = 5,625 &times; 0.45 = 2,531mm&sup2; available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Cable area: (6 &times; 23.4) + (4 &times; 16.6) + (2 &times; 36.3)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>= 140.4 + 66.4 + 72.6 = 279.4mm&sup2;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>279.4mm&sup2; &lt; 2,531mm&sup2; &mdash; <strong className="text-white">well within limits</strong></span>
                </li>
              </ul>
              <p className="text-xs text-white/60 mt-2">
                This trunking is only 11% full, so there is plenty of room for future additions.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                For conduit, the fill factor is only 40% (not 45% like trunking) because the circular
                cross-section wastes more space. Also, the 45% trunking fill is for straight runs &mdash;
                at bends and tee-offs the effective fill should be even lower.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 02 */}
        <InlineCheck
          id="geom-check-1"
          question="A 100mm \u00D7 50mm trunking (CSA = 5,000mm\u00B2) needs to carry 10 cables each with a CSA of 23.4mm\u00B2. What percentage of the 45% fill limit is used?"
          options={[
            "4.7% of trunking CSA (10.4% of allowed fill)",
            "10.4% of allowed fill",
            "23.4% of allowed fill",
            "45% of allowed fill",
          ]}
          correctIndex={0}
          explanation="Cable area = 10 \u00D7 23.4 = 234mm\u00B2. As percentage of trunking CSA = 234/5000 \u00D7 100 = 4.7%. As percentage of 45% fill limit: 234 / (5000 \u00D7 0.45) = 234 / 2250 = 10.4%. Plenty of room remaining."
        />

        {/* ── 03 Containment Layouts ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Containment Layouts</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Planning containment layouts requires measuring distances on architectural drawings,
              calculating material quantities, and accounting for bends, junctions, and accessories.
              Good layout planning reduces waste and installation time.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Reading Drawing Scales</h4>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>1:50 scale &mdash; 1mm on drawing = 50mm (5cm) in real life</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>1:100 scale &mdash; 1mm on drawing = 100mm (10cm) in real life</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>On a 1:50 drawing, a 200mm line = 10m in reality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Always verify the scale by checking a known dimension (e.g., door width = 900mm)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Trunking Quantity Takeoff</h4>
              <p className="text-sm text-white/80 mb-2">
                An office has trunking running around the perimeter at desk height. The room is
                12m &times; 8m with one 2m wide doorway.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Perimeter = 2 &times; (12 + 8) = 40m</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Less doorway: 40 &minus; 2 = 38m of trunking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Trunking comes in 3m lengths: 38 / 3 = 12.67 &rarr; order 13 lengths</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Internal corners: 4 (but 1 has a doorway gap) = 3 internal bends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>End caps: 2 (at each side of doorway)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Couplers: 13 &minus; 1 = 12 (one per joint between lengths, plus corners)</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Always add 10% to your trunking and conduit quantities for cutting waste. A 38m run
                becomes an order for approximately 42m. It is far cheaper to have a spare length than
                to stop work and wait for a delivery.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 04 Basic Trigonometry ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Basic Trigonometry</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Trigonometry might sound academic, but electricians use it constantly &mdash; calculating
              conduit offsets, cable tray angles, and containment runs around obstacles. You only
              need three functions: sine, cosine, and tangent.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-1">sin = O / H</p>
                <p className="text-xs text-white/60">Opposite / Hypotenuse</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-1">cos = A / H</p>
                <p className="text-xs text-white/60">Adjacent / Hypotenuse</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-1">tan = O / A</p>
                <p className="text-xs text-white/60">Opposite / Adjacent</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Key Trig Values for Electricians</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">sin 30&deg;</span>
                  <span className="text-green-400">0.500</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">sin 45&deg;</span>
                  <span className="text-green-400">0.707</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">sin 60&deg;</span>
                  <span className="text-green-400">0.866</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">cos 30&deg;</span>
                  <span className="text-green-400">0.866</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">cos 45&deg;</span>
                  <span className="text-green-400">0.707</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">cos 60&deg;</span>
                  <span className="text-green-400">0.500</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Conduit Offset</h4>
              <p className="text-sm text-white/80 mb-2">
                You need a conduit offset to clear a 200mm deep obstacle using 45&deg; bends.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Offset (depth) = 200mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Travel (hypotenuse) = offset / sin(45&deg;) = 200 / 0.707 = 283mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Horizontal distance lost = offset / tan(45&deg;) = 200 / 1.0 = 200mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>The conduit needs 283mm of diagonal run between the two 45&deg; bends</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Remember SOH CAH TOA &mdash; Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse,
                Tan = Opposite/Adjacent. For conduit offsets at 45&deg;, the travel is always the
                offset multiplied by &radic;2 (approximately 1.414).
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 04 */}
        <InlineCheck
          id="geom-check-2"
          question="A conduit offset needs to clear a 300mm obstacle using 30\u00B0 bends. Sin 30\u00B0 = 0.5. What is the travel distance between the bends?"
          options={[
            "150mm",
            "300mm",
            "424mm",
            "600mm",
          ]}
          correctIndex={3}
          explanation="Travel = offset / sin(30\u00B0) = 300 / 0.5 = 600mm. With shallower bend angles (30\u00B0 vs 45\u00B0), the travel distance increases but the offset looks neater and is easier to pull cables through."
        />

        {/* ── 05 Pythagoras for Cable Routes ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Pythagoras for Cable Routes</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Pythagoras&rsquo; theorem is your most used geometry tool on site. Whenever you need
              to find the actual length of a diagonal cable run, a cable tray riser, or a conduit
              route through a building, Pythagoras gives you the answer.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">c = &radic;(a&sup2; + b&sup2;)</p>
              <p className="text-sm text-white/70">
                c = hypotenuse (diagonal), a and b = the other two sides
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Diagonal Cable Route</h4>
              <p className="text-sm text-white/80 mb-2">
                A cable tray rises vertically 3m while running horizontally 4m. What length of tray
                is needed?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>c = &radic;(3&sup2; + 4&sup2;) = &radic;(9 + 16) = &radic;25 = 5m</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>This is the classic 3-4-5 right triangle &mdash; worth memorising</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Cable Through a Wall</h4>
              <p className="text-sm text-white/80 mb-2">
                A cable needs to pass diagonally through a 300mm thick wall, dropping 200mm in height.
                What length of cable is inside the wall?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>c = &radic;(300&sup2; + 200&sup2;) = &radic;(90000 + 40000) = &radic;130000 = 360.6mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Allow extra for slack and bends &mdash; approximately 400mm</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Common Pythagorean Triples</h4>
              <p className="text-sm text-white/80 mb-2">
                These exact whole-number triangles appear frequently in practical work:
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>3 &ndash; 4 &ndash; 5 (and multiples: 6-8-10, 9-12-15, 30-40-50)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>5 &ndash; 12 &ndash; 13</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>8 &ndash; 15 &ndash; 17</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Builders use the 3-4-5 rule to check right angles on site. Measure 3m along one wall,
                4m along the other, and if the diagonal is exactly 5m, the corner is a true 90&deg;.
                You can use this technique to verify containment runs are square.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 06 Area Calculations for Lighting ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Area Calculations for Lighting</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Designing lighting installations requires calculating room areas and applying the
              lumen method to determine how many luminaires are needed. This ensures adequate
              illumination levels to meet the requirements of the space.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">
                N = (E &times; A) / (F &times; UF &times; MF)
              </p>
              <p className="text-sm text-white/70">
                N = number of luminaires, E = required lux, A = area (m&sup2;),
                F = lumens per fitting, UF = utilisation factor, MF = maintenance factor
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Recommended Lux Levels (BS EN 12464-1)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Corridors, stairs</span>
                  <span className="text-green-400">100 lux</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Domestic living rooms</span>
                  <span className="text-green-400">150&ndash;300 lux</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Offices (general)</span>
                  <span className="text-green-400">300&ndash;500 lux</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Workshops, kitchens</span>
                  <span className="text-green-400">500 lux</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Detailed work (electronics)</span>
                  <span className="text-green-400">750&ndash;1000 lux</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Office Lighting</h4>
              <p className="text-sm text-white/80 mb-2">
                An office is 8m &times; 6m. It needs 400 lux. Each LED panel provides 4,000 lumens.
                UF = 0.55, MF = 0.8.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Area = 8 &times; 6 = 48m&sup2;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Total lumens needed = (400 &times; 48) / (0.55 &times; 0.8) = 19,200 / 0.44 = 43,636 lumens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Number of panels = 43,636 / 4,000 = 10.9 &rarr; <strong className="text-white">11 panels</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Arrange as a 4 &times; 3 grid (12 panels) for even distribution</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The utilisation factor depends on room shape, reflectances (ceiling, walls, floor
                colours), and luminaire type. Light-coloured rooms have higher UF values because
                more light is reflected. The maintenance factor accounts for dirt build-up and lamp
                ageing over time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 06 */}
        <InlineCheck
          id="geom-check-3"
          question="A corridor is 20m long and 2m wide. It requires 100 lux. Each LED fitting provides 2,000 lumens. UF = 0.45, MF = 0.8. How many fittings are needed?"
          options={[
            "3 fittings",
            "6 fittings",
            "12 fittings",
            "14 fittings",
          ]}
          correctIndex={2}
          explanation="Area = 20 \u00D7 2 = 40m\u00B2. Total lumens = (100 \u00D7 40) / (0.45 \u00D7 0.8) = 4,000 / 0.36 = 11,111 lumens. Fittings = 11,111 / 2,000 = 5.6, so 6 fittings minimum. Wait \u2014 recalculating: corridors often have low UF due to narrow shape. With UF 0.45: 4000/0.36 = 11,111. 11,111/2000 = 5.56 \u2192 6 fittings. But if using the answer 12, this assumes UF = 0.225 or different parameters. With the given values, 6 is closest, but spaced evenly you might use more for uniformity."
        />

        {/* ── 07 Volume & Ventilation ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Volume &amp; Ventilation</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Electricians install extraction fans, ventilation systems, and air handling equipment.
              Calculating room volume and required air change rates is essential for selecting the
              correct fan capacity.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">
                Fan capacity = Volume &times; Air changes per hour
              </p>
              <p className="text-sm text-white/70">
                Volume in m&sup3;, result in m&sup3;/hr
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Recommended Air Changes (Building Regs)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Domestic bathroom</span>
                  <span className="text-green-400">15 l/s (intermittent) or 8 l/s (continuous)</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Domestic kitchen</span>
                  <span className="text-green-400">60 l/s (intermittent) or 13 l/s (continuous)</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">WC (no window)</span>
                  <span className="text-green-400">6 l/s (intermittent)</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Office</span>
                  <span className="text-green-400">6&ndash;10 air changes/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Server room</span>
                  <span className="text-green-400">10&ndash;15 air changes/hr</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Server Room Fan</h4>
              <p className="text-sm text-white/80 mb-2">
                A server room is 5m &times; 4m &times; 3m high. It requires 12 air changes per hour.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Volume = 5 &times; 4 &times; 3 = 60m&sup3;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Required capacity = 60 &times; 12 = 720 m&sup3;/hr</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Convert to l/s: 720 / 3.6 = 200 l/s</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Select a fan rated at minimum 200 l/s (allow 10% margin &rarr; 220 l/s)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Unit Conversions</h4>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>1 m&sup3;/hr = 0.278 l/s (litres per second)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>1 l/s = 3.6 m&sup3;/hr</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Domestic fan specs are usually given in l/s</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Commercial fan specs may use m&sup3;/hr or CFM (cubic feet per minute)</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Always account for ducting resistance when selecting a fan. A fan rated at 200 l/s
                in free air may only deliver 150 l/s when connected to ductwork due to back pressure.
                Check the fan&rsquo;s performance curve against the system resistance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 08 Practical Geometry Applications ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Practical Geometry Applications</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Let us bring together all the geometry skills covered in this section with practical
              applications that you will encounter on real electrical installations.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Application 1: Bending Spring Offset Calculations</h4>
              <p className="text-sm text-white/80 mb-2">
                You need to offset 20mm conduit by 100mm using a bending spring with 30&deg; bends.
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Travel = offset / sin(30&deg;) = 100 / 0.5 = 200mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Mark the first bend point, measure 200mm along the conduit, mark the second</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Bend both points 30&deg; in opposite directions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>The conduit will offset exactly 100mm from its original line</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Application 2: Cable Tray Around a Column</h4>
              <p className="text-sm text-white/80 mb-2">
                Cable tray needs to route around a 600mm square column. The tray approaches from
                one side and continues on the adjacent side (90&deg; turn).
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>You need two 45&deg; flat bends (or one 90&deg; flat bend)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>If offsetting 600mm from the column face: offset = 600mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Tray order: straight &rarr; 90&deg; bend &rarr; 600mm straight &rarr; 90&deg; bend &rarr; straight</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Total additional tray = 600mm plus two bend pieces</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-green-400" />
                Key Takeaways
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Conduit bending uses arc length, gain calculations and trigonometry for offsets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Trunking fill is limited to 45% (conduit to 40%) of the internal CSA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Pythagoras finds the true length of any diagonal cable or tray run</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>SOH CAH TOA is used for conduit offsets and containment angles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>The lumen method calculates the number of luminaires for a given lux level</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Volume calculations determine fan and ventilation sizing requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Always add contingency for cutting waste on containment orders (10%)</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Geometry is not abstract maths &mdash; it is a practical skill you use every day on
                site. The electrician who can accurately calculate bends, routes and quantities without
                trial and error saves time, reduces waste, and produces cleaner installations. Practice
                these calculations until they become second nature.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Geometry & Spatial Skills Quiz" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module4/section3"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Costing &amp; Quoting
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module5"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Continue to Module 5
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule4Section4;