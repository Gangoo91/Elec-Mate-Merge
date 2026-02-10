import { ArrowLeft, ArrowRight, Cable, AlertTriangle, BookOpen, Thermometer, Layers, CheckCircle } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule4Section2 = () => {
  useSEO(
    "Section 2: Cable Sizing & Selection - Practical Mathematics Applications",
    "Learn current-carrying capacity, installation methods, correction factors, volt drop calculations and step-by-step cable sizing for UK electrical installations to BS 7671."
  );

  const quizQuestions = [
    {
      id: 1,
      question:
        "A circuit has a design current (Ib) of 28A. The protective device is a 32A MCB. The cable is grouped with 3 other circuits (Cg = 0.65) in an ambient of 40\u00B0C (Ca = 0.87). No thermal insulation (Ci = 1.0). What minimum tabulated rating (It) is needed?",
      options: ["28A", "36.8A", "49.5A", "56.6A"],
      correctAnswer: 3,
      explanation:
        "It = In / (Ca \u00D7 Cg \u00D7 Ci) = 32 / (0.87 \u00D7 0.65 \u00D7 1.0) = 32 / 0.5655 = 56.6A. You must use In (not Ib) in the formula because the cable must be able to carry the full rated current of the protective device under the installed conditions.",
    },
    {
      id: 2,
      question:
        "BS 7671 Table 4D current ratings assume reference conditions. What are those reference conditions?",
      options: [
        "20\u00B0C ambient, single circuit, no insulation",
        "25\u00B0C ambient, two circuits, standard insulation",
        "30\u00B0C ambient, single circuit, no thermal insulation",
        "30\u00B0C ambient, four circuits, 100mm insulation",
      ],
      correctAnswer: 2,
      explanation:
        "BS 7671 Table 4D current ratings assume reference conditions: 30\u00B0C ambient temperature, a single circuit (no grouping), and no thermal insulation. Any deviation from these conditions requires correction factors to be applied.",
    },
    {
      id: 3,
      question:
        "A shower circuit uses 10.0mm\u00B2 T&E cable with a run of 15m. The design current is 41.3A. The mV/A/m value is 4.4. What is the voltage drop?",
      options: ["2.73V", "6.86V", "9.13V", "27.3V"],
      correctAnswer: 0,
      explanation:
        "VD = mV/A/m \u00D7 Ib \u00D7 L / 1000 = 4.4 \u00D7 41.3 \u00D7 15 / 1000 = 2726 / 1000 = 2.73V. This is well within the 11.5V limit for a power circuit.",
    },
    {
      id: 4,
      question:
        "What is the grouping correction factor (Cg) for 4 circuits enclosed in a single conduit?",
      options: ["1.0", "0.65", "0.57", "0.50"],
      correctAnswer: 1,
      explanation:
        "From BS 7671 Table 4C1, for 4 circuits bunched together or in a single conduit, Cg = 0.65. This means the cable can only carry 65% of its tabulated current rating when grouped with 3 other circuits.",
    },
    {
      id: 5,
      question:
        "A cable passes through 150mm of thermal insulation in a ceiling. What Ci factor applies from Table 52.2?",
      options: ["1.0", "0.89", "0.81", "0.55"],
      correctAnswer: 2,
      explanation:
        "For cable enclosed in thermal insulation between 100mm and 200mm, Ci = 0.81 from BS 7671 Table 52.2. This significantly reduces the cable\u2019s current-carrying capacity.",
    },
    {
      id: 6,
      question:
        "Installation Method B (enclosed in conduit on a wall) gives a lower current rating than Method C (clipped direct). Why?",
      options: [
        "Method B cables are cheaper quality",
        "Conduit provides additional short-circuit protection",
        "The conduit restricts heat dissipation from the cable",
        "Method C cables have thicker insulation",
      ],
      correctAnswer: 2,
      explanation:
        "When a cable is enclosed in conduit, the conduit acts as a thermal barrier, restricting the cable\u2019s ability to dissipate heat to the surrounding air. This means the cable heats up more for the same current, so its rated capacity must be reduced.",
    },
    {
      id: 7,
      question:
        "A 6.0mm\u00B2 T&E cable (Method C) has a tabulated rating of 47A. Ca = 0.94, Cg = 0.80, Ci = 1.0. What is the effective current-carrying capacity?",
      options: ["35.3A", "39.5A", "44.2A", "47.0A"],
      correctAnswer: 0,
      explanation:
        "Effective capacity = It \u00D7 Ca \u00D7 Cg \u00D7 Ci = 47 \u00D7 0.94 \u00D7 0.80 \u00D7 1.0 = 47 \u00D7 0.752 = 35.3A. The cable can safely carry up to 35.3A under these installed conditions.",
    },
    {
      id: 8,
      question:
        "You are sizing cable for a 45A shower on a 15m run. After applying correction factors, you need It \u2265 56A. Which cable size from Table 4D2A (Method C) would you select?",
      options: ["6.0mm\u00B2 (47A)", "10.0mm\u00B2 (64A)", "16.0mm\u00B2 (85A)", "4.0mm\u00B2 (36A)"],
      correctAnswer: 1,
      explanation:
        "The cable must have a tabulated rating \u2265 56A. 6.0mm\u00B2 (47A) is too low. 10.0mm\u00B2 (64A) exceeds 56A, so this is the minimum acceptable size. You would then check voltage drop to confirm suitability.",
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
              Module 4 &bull; Section 2
            </p>
            <h1 className="text-base font-bold text-white">Cable Sizing &amp; Selection</h1>
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
                <Cable className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Cable Sizing &amp; Selection
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Understand how to correctly size cables using BS 7671 tables, correction factors, and
              voltage drop checks &mdash; the process every electrician must master.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* ── 01 Current-Carrying Capacity ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Current-Carrying Capacity</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Every cable has a maximum current it can safely carry without its insulation exceeding
              its rated temperature. This is the current-carrying capacity, and it depends on the
              cable size, insulation type, and installation method. BS 7671 Appendix 4 provides
              tabulated values under reference conditions.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The fundamental cable sizing rule from BS 7671 is: <strong className="text-white">Ib &le; In &le; Iz</strong>,
                where Ib is the design current, In is the protective device rating, and Iz is the cable&rsquo;s
                effective current-carrying capacity after correction factors.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Table 4D2A &mdash; Twin &amp; Earth (Copper, 70&deg;C PVC)</h4>
              <p className="text-sm text-white/80 mb-3">
                Reference Method C (clipped direct to a surface):
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">1.0mm&sup2;</span>
                  <span className="text-green-400 font-medium">15.5A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">1.5mm&sup2;</span>
                  <span className="text-green-400 font-medium">20A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">2.5mm&sup2;</span>
                  <span className="text-green-400 font-medium">27A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">4.0mm&sup2;</span>
                  <span className="text-green-400 font-medium">36A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">6.0mm&sup2;</span>
                  <span className="text-green-400 font-medium">47A</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">10.0mm&sup2;</span>
                  <span className="text-green-400 font-medium">64A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">16.0mm&sup2;</span>
                  <span className="text-green-400 font-medium">85A</span>
                </div>
              </div>
            </div>

            <p>
              These ratings assume a 30&deg;C ambient temperature, a single circuit (not grouped with
              others), and no thermal insulation surrounding the cable. If any of these conditions
              differ, you must apply correction factors to determine the true effective capacity.
            </p>
          </div>
        </motion.div>

        {/* ── 02 Installation Methods ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Installation Methods</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The way a cable is installed has a significant impact on its ability to dissipate heat.
              BS 7671 Table 4A2 defines reference installation methods, each with different current
              ratings for the same cable size. The more enclosed the cable, the lower its rating.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Common Installation Methods</h4>
              <div className="space-y-3">
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Method A &mdash; Enclosed in Insulation</p>
                  <p className="text-xs text-white/60">Cable in conduit within a thermally insulating wall. Lowest current ratings.</p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Method B &mdash; Enclosed in Conduit on Wall</p>
                  <p className="text-xs text-white/60">Cable in conduit or trunking fixed to a wall surface. Moderate ratings.</p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Method C &mdash; Clipped Direct</p>
                  <p className="text-xs text-white/60">Cable clipped directly to a surface (most common domestic method). Good ratings.</p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Method E &mdash; Free Air (Horizontal)</p>
                  <p className="text-xs text-white/60">Cable on cable tray or ladder. Best heat dissipation, highest ratings.</p>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Method 100 &mdash; Enclosed in Building Void</p>
                  <p className="text-xs text-white/60">Cable in ceiling voids or floor voids. Treated similarly to Method B.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Comparison: 2.5mm&sup2; T&amp;E by Method</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">Method A (in insulated wall):</span>
                  <span className="text-green-400">20A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Method B (in conduit on wall):</span>
                  <span className="text-green-400">24A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Method C (clipped direct):</span>
                  <span className="text-green-400">27A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Method E (free air on tray):</span>
                  <span className="text-green-400">30A</span>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2">
                The same 2.5mm&sup2; cable can carry 50% more current in free air than when enclosed in
                an insulated wall. This is why installation method matters so much.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                If a cable passes through different installation methods along its route, you must use
                the most restrictive method for the entire length. For example, if a cable is clipped
                direct for most of its run but passes through a joist for 200mm, the restrictive section
                determines the method unless it is less than 0.5m.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 02 */}
        <InlineCheck
          id="cable-check-1"
          question="A 4.0mm\u00B2 T&E cable is installed in conduit on a wall (Method B, rated 32A). The circuit has In = 32A MCB. Can you use Method B without correction factors?"
          options={[
            "Yes \u2014 32A rating equals the 32A MCB exactly, and Ib \u2264 In \u2264 Iz is satisfied",
            "No \u2014 It must be strictly greater than In",
            "Only if the cable run is less than 10m",
            "Only if additional ventilation is provided",
          ]}
          correctIndex={0}
          explanation="The rule is Ib \u2264 In \u2264 Iz. If the cable rating Iz = 32A and In = 32A, then In \u2264 Iz is satisfied (they can be equal). However, if any correction factors apply (temperature, grouping, insulation), Iz will drop below 32A and the cable would no longer be suitable."
        />

        {/* ── 03 Correction Factor Ca (Ambient Temperature) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Correction Factor Ca (Ambient Temperature)</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              BS 7671 tables assume a 30&deg;C ambient temperature. If the environment is warmer, the
              cable cannot dissipate heat as effectively and its current rating must be reduced. If
              cooler, the rating can be slightly increased. Table 4B1 provides the Ca values.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Table 4B1 &mdash; Ca Values (PVC Insulation)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">25&deg;C</span>
                  <span className="text-green-400 font-medium">1.03</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">30&deg;C (reference)</span>
                  <span className="text-green-400 font-medium">1.00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">35&deg;C</span>
                  <span className="text-green-400 font-medium">0.94</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">40&deg;C</span>
                  <span className="text-green-400 font-medium">0.87</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">45&deg;C</span>
                  <span className="text-green-400 font-medium">0.79</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">50&deg;C</span>
                  <span className="text-green-400 font-medium">0.71</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">55&deg;C</span>
                  <span className="text-green-400 font-medium">0.61</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example</h4>
              <p className="text-sm text-white/80 mb-2">
                A 6.0mm&sup2; T&amp;E cable (Method C, It = 47A) is installed in a boiler house where
                the ambient temperature is 40&deg;C. What is the effective current-carrying capacity?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Ca at 40&deg;C = 0.87</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Effective capacity = 47 &times; 0.87 = 40.89A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>If the circuit has a 40A MCB, this only just passes (40.89 &ge; 40)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Any additional derating (grouping etc.) would push it below &mdash; consider 10.0mm&sup2;</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                In a standard UK domestic installation at 30&deg;C, Ca = 1.0 so no correction is needed.
                However, cables in loft spaces (which can reach 40&deg;C+ in summer), near boilers, in
                commercial kitchens, or in plant rooms will need the Ca factor applied.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 04 Correction Factor Cg (Grouping) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Correction Factor Cg (Grouping)</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              When multiple loaded cables are bundled together, they heat each other up. The grouping
              correction factor Cg accounts for this mutual heating effect. The more circuits grouped
              together, the lower the factor and the less current each cable can carry safely.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Table 4C1 &mdash; Cg Values (Bunched or Enclosed)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">1 circuit</span>
                  <span className="text-green-400 font-medium">1.00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">2 circuits</span>
                  <span className="text-green-400 font-medium">0.80</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">3 circuits</span>
                  <span className="text-green-400 font-medium">0.70</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">4 circuits</span>
                  <span className="text-green-400 font-medium">0.65</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">5 circuits</span>
                  <span className="text-green-400 font-medium">0.60</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">6 circuits</span>
                  <span className="text-green-400 font-medium">0.57</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">7 circuits</span>
                  <span className="text-green-400 font-medium">0.54</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">9+ circuits</span>
                  <span className="text-green-400 font-medium">0.50</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example</h4>
              <p className="text-sm text-white/80 mb-2">
                Three 2.5mm&sup2; T&amp;E circuits are clipped together along a joist run. Cable rating
                Method C = 27A. What is the effective capacity of each cable?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Cg for 3 circuits = 0.70</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Effective capacity = 27 &times; 0.70 = 18.9A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>If these are 20A MCB circuits, 18.9A &lt; 20A &mdash; <strong className="text-white">the cable fails</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Upgrade to 4.0mm&sup2; (36 &times; 0.70 = 25.2A &ge; 20A) &mdash; pass</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Grouping is one of the most commonly overlooked factors on site. When running multiple
                cables through the same hole in a joist, along the same route, or through a common
                conduit, you must apply the grouping factor. Spacing cables by at least one cable
                diameter apart can sometimes allow a more favourable Cg value.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 04 */}
        <InlineCheck
          id="cable-check-2"
          question="Six 2.5mm\u00B2 T&E cables are bunched together (Method C, It = 27A). Cg for 6 circuits = 0.57. What is the effective current rating of each cable?"
          options={[
            "15.39A",
            "27.0A",
            "47.4A",
            "6.0A",
          ]}
          correctIndex={0}
          explanation="Effective rating = 27 \u00D7 0.57 = 15.39A. Since a standard 16A MCB exceeds 15.39A, you would need to upgrade to 4.0mm\u00B2 (36 \u00D7 0.57 = 20.5A) for 16A circuits or reduce the number of grouped circuits."
        />

        {/* ── 05 Correction Factor Ci (Thermal Insulation) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Correction Factor Ci (Insulation)</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              When cables pass through or are surrounded by thermal insulation (loft insulation, wall
              cavity insulation), their ability to dissipate heat is severely restricted. BS 7671
              Table 52.2 provides the Ci values based on the depth of insulation the cable passes through.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Table 52.2 &mdash; Ci Values</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Cable touching insulation on one side only</span>
                  <span className="text-green-400 font-medium">0.75</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Cable enclosed in insulation &lt; 100mm</span>
                  <span className="text-green-400 font-medium">0.89</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Cable enclosed in insulation 100&ndash;200mm</span>
                  <span className="text-green-400 font-medium">0.81</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Cable enclosed in insulation 200&ndash;400mm</span>
                  <span className="text-green-400 font-medium">0.68</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Cable enclosed in insulation &gt; 400mm</span>
                  <span className="text-green-400 font-medium">0.55</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Loft Installation</h4>
              <p className="text-sm text-white/80 mb-2">
                A lighting circuit in 1.5mm&sup2; T&amp;E runs across a loft. The cable passes
                through 150mm of loft insulation for a distance of 2m. What is the derated capacity?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>It for 1.5mm&sup2; Method C = 20A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Ci for 100&ndash;200mm insulation = 0.81</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Derated capacity = 20 &times; 0.81 = 16.2A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>For a 6A lighting MCB this is fine (16.2 &ge; 6)</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                With modern UK loft insulation depths of 270mm or more, Ci can be as low as 0.55 for
                cables buried in insulation. Where possible, run cables above the insulation or use
                raised cable clips to keep the cable clear. This avoids the need for the Ci derating
                entirely and is the preferred approach in modern domestic installations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 06 Volt Drop Calculations ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Volt Drop Calculations</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Even when a cable passes the current-carrying capacity check, it may fail on voltage
              drop. Long cable runs with high currents can result in unacceptable voltage loss.
              This is often the limiting factor for cable sizing, especially on longer runs.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-1">
                VD = mV/A/m &times; Ib &times; L / 1000
              </p>
              <p className="text-sm text-white/70">
                Result in volts. Must be &le; 6.9V (lighting) or &le; 11.5V (other circuits)
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">mV/A/m Values (Table 4D2B)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">1.0mm&sup2;</span>
                  <span className="text-green-400">44 mV/A/m</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">1.5mm&sup2;</span>
                  <span className="text-green-400">29 mV/A/m</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">2.5mm&sup2;</span>
                  <span className="text-green-400">18 mV/A/m</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">4.0mm&sup2;</span>
                  <span className="text-green-400">11 mV/A/m</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">6.0mm&sup2;</span>
                  <span className="text-green-400">7.3 mV/A/m</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">10.0mm&sup2;</span>
                  <span className="text-green-400">4.4 mV/A/m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">16.0mm&sup2;</span>
                  <span className="text-green-400">2.8 mV/A/m</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Long Lighting Run</h4>
              <p className="text-sm text-white/80 mb-2">
                A 1.5mm&sup2; lighting circuit supplies 8A over a 30m cable run. Does it pass?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>VD = 29 &times; 8 &times; 30 / 1000 = 6.96V</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Lighting limit = 3% of 230V = 6.9V</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>6.96V &gt; 6.9V &mdash; <strong className="text-white">fails by 0.06V!</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Solution: upgrade to 2.5mm&sup2;. VD = 18 &times; 8 &times; 30 / 1000 = 4.32V &mdash; pass</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                On long runs, voltage drop often forces you to select a larger cable than the current
                rating alone requires. Always check both conditions: current capacity first, then volt
                drop. The cable must satisfy both criteria to be compliant.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 06 */}
        <InlineCheck
          id="cable-check-3"
          question="A 4.0mm\u00B2 cable (mV/A/m = 11) supplies a 32A load over 25m. What is the voltage drop and does it pass for a power circuit?"
          options={[
            "8.8V \u2014 passes (limit 11.5V for power circuits)",
            "8.8V \u2014 fails (limit 6.9V for lighting)",
            "11.0V \u2014 passes just within limit",
            "11.0V \u2014 fails the 11.5V limit",
          ]}
          correctIndex={0}
          explanation="VD = 11 \u00D7 32 \u00D7 25 / 1000 = 8.8V. For a power circuit, the limit is 5% of 230V = 11.5V. Since 8.8V < 11.5V, it passes. If this were a lighting circuit (limit 6.9V), it would fail."
        />

        {/* ── 07 Worked Cable Sizing Examples ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Worked Cable Sizing Examples</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Let us work through two complete cable sizing exercises step by step &mdash; a shower
              circuit and a cooker circuit. These are two of the most demanding domestic circuits
              and are common exam questions.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Example 1: 9.5kW Electric Shower</h4>
              <p className="text-sm text-white/80 mb-3">
                <strong className="text-white">Scenario:</strong> 9.5kW shower, 15m cable run from consumer unit,
                TN-C-S supply, cable clipped direct (Method C), 30&deg;C ambient, single circuit, no insulation.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 1 &mdash; Design Current (Ib)</p>
                  <p className="text-sm text-white/80">Ib = P / V = 9500 / 230 = 41.3A</p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 2 &mdash; Select Protective Device (In)</p>
                  <p className="text-sm text-white/80">Next standard MCB &ge; 41.3A &rarr; In = 45A Type B</p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 3 &mdash; Correction Factors</p>
                  <p className="text-sm text-white/80">
                    Ca = 1.0, Cg = 1.0, Ci = 1.0 &rarr; Required It &ge; 45 / 1.0 = 45A
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 4 &mdash; Select Cable</p>
                  <p className="text-sm text-white/80">
                    6.0mm&sup2; = 47A &ge; 45A &mdash; pass. Or 10.0mm&sup2; = 64A (more headroom).
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 5 &mdash; Check Voltage Drop</p>
                  <p className="text-sm text-white/80">
                    6.0mm&sup2;: VD = 7.3 &times; 41.3 &times; 15 / 1000 = 4.52V (&le; 11.5V &mdash; pass)<br />
                    10.0mm&sup2;: VD = 4.4 &times; 41.3 &times; 15 / 1000 = 2.73V
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Result</p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">6.0mm&sup2; is the minimum.</strong> In practice, 10.0mm&sup2;
                    is commonly used to allow for future shower upgrades (e.g., 10.5kW or 11kW models).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Example 2: 12kW Electric Cooker</h4>
              <p className="text-sm text-white/80 mb-3">
                <strong className="text-white">Scenario:</strong> 12kW cooker, 18m cable run, Method C but passes
                through 200mm loft insulation for 1m. Ambient 35&deg;C in loft. Grouped with one other circuit for 3m.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 1 &mdash; Design Current</p>
                  <p className="text-sm text-white/80">Ib = 12000 / 230 = 52.17A</p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 2 &mdash; Protective Device</p>
                  <p className="text-sm text-white/80">In = 60A (nearest standard MCB &ge; 52.17A)</p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 3 &mdash; Worst-Case Correction Factors</p>
                  <p className="text-sm text-white/80">
                    Ca = 0.94 (35&deg;C), Cg = 0.80 (2 circuits), Ci = 0.68 (200mm insulation)<br />
                    Combined = 0.94 &times; 0.80 &times; 0.68 = 0.511<br />
                    Required It &ge; 60 / 0.511 = 117.4A
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium mb-1">Step 4 &mdash; The Practical Solution</p>
                  <p className="text-sm text-white/80">
                    117.4A is impractical for domestic cable. Rerouting to avoid insulation and grouping
                    gives: It = 60 / 0.94 = 63.8A &rarr; 16.0mm&sup2; (85A) would work. Better route
                    planning saves significant cable cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 08 Cable Selection Summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Cable Selection Summary</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Here is the complete cable sizing procedure distilled into a step-by-step process you
              can follow for any circuit. This is the method used in exams and on site.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">The 7-Step Cable Sizing Procedure</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-xs bg-green-500/15 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="text-white font-medium text-sm">Calculate design current (Ib)</p>
                    <p className="text-xs text-white/60">Ib = P / V for single phase; Ib = P / (&radic;3 &times; VL) for three phase</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-xs bg-green-500/15 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="text-white font-medium text-sm">Select protective device (In)</p>
                    <p className="text-xs text-white/60">Choose the next standard rating &ge; Ib</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-xs bg-green-500/15 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="text-white font-medium text-sm">Determine installation method</p>
                    <p className="text-xs text-white/60">Table 4A2 &mdash; how the cable is installed along its route</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-xs bg-green-500/15 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <p className="text-white font-medium text-sm">Apply correction factors (Ca, Cg, Ci)</p>
                    <p className="text-xs text-white/60">Required It = In / (Ca &times; Cg &times; Ci)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-xs bg-green-500/15 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">5</span>
                  <div>
                    <p className="text-white font-medium text-sm">Select cable from tables</p>
                    <p className="text-xs text-white/60">Smallest cable with tabulated It &ge; required value</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-xs bg-green-500/15 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">6</span>
                  <div>
                    <p className="text-white font-medium text-sm">Check voltage drop</p>
                    <p className="text-xs text-white/60">VD = mV/A/m &times; Ib &times; L / 1000 &le; 6.9V (lighting) or 11.5V (other)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-xs bg-green-500/15 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">7</span>
                  <div>
                    <p className="text-white font-medium text-sm">Check earth fault loop impedance</p>
                    <p className="text-xs text-white/60">Zs = Ze + (R1+R2) &times; 1.20 must not exceed maximum for the device</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Common Domestic Cable Sizes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Lighting circuits</span>
                  <span className="text-white font-medium">1.0mm&sup2; or 1.5mm&sup2;</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Ring final circuits</span>
                  <span className="text-white font-medium">2.5mm&sup2;</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Radial sockets (20A)</span>
                  <span className="text-white font-medium">2.5mm&sup2; or 4.0mm&sup2;</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Immersion heater</span>
                  <span className="text-white font-medium">2.5mm&sup2;</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Cooker circuit</span>
                  <span className="text-white font-medium">6.0mm&sup2; or 10.0mm&sup2;</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Shower (up to 9.5kW)</span>
                  <span className="text-white font-medium">6.0mm&sup2; or 10.0mm&sup2;</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">EV charger (7kW, 32A)</span>
                  <span className="text-white font-medium">6.0mm&sup2; or 10.0mm&sup2;</span>
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
                  <span>The basic rule is always Ib &le; In &le; Iz &mdash; memorise this</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Installation method determines the base current rating from BS 7671 tables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Correction factors Ca, Cg and Ci always reduce the effective cable rating</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Voltage drop must be checked separately and can force a larger cable on long runs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Good cable routing that avoids insulation and grouping saves money and complexity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>When in doubt, go up one cable size &mdash; the small extra cost provides a valuable safety margin</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Cable Sizing & Selection Quiz" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module4/section1"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Electrical Calculations
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module4/section3"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Costing &amp; Quoting
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule4Section2;