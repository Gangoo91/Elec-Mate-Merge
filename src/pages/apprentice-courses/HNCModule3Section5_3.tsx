import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Single-Phase vs Three-Phase Transformers - HNC Module 3 Section 5.3";
const DESCRIPTION = "Comprehensive comparison of single-phase and three-phase transformers including construction, vector groups, parallel operation, auto-transformers, and building services applications.";

const quickCheckQuestions = [
  {
    id: "three-phase-advantage",
    question: "What is the primary advantage of a three-phase transformer over three single-phase units?",
    options: ["Higher voltage output", "Smaller size and lower cost", "Better voltage regulation", "Easier maintenance"],
    correctIndex: 1,
    explanation: "A three-phase transformer uses approximately 15% less core material than three equivalent single-phase units, making it smaller, lighter, and more economical for the same kVA rating."
  },
  {
    id: "dyn11-meaning",
    question: "What does the vector group designation Dyn11 indicate?",
    options: ["Delta primary, star secondary with neutral, 30° lag", "Star primary, delta secondary, 330° phase shift", "Delta primary, star secondary with neutral, 330° lead", "Star primary, star secondary, zero phase shift"],
    correctIndex: 2,
    explanation: "Dyn11 indicates Delta (D) primary, star (y) secondary with neutral (n) brought out. The '11' means the secondary voltage leads the primary by 330° (11 × 30°), equivalent to 30° lag."
  },
  {
    id: "parallel-operation",
    question: "Which is NOT a requirement for parallel operation of transformers?",
    options: ["Same voltage ratio", "Same vector group", "Identical kVA ratings", "Same percentage impedance"],
    correctIndex: 2,
    explanation: "Transformers of different kVA ratings can be paralleled provided they have the same voltage ratio, vector group, and similar percentage impedance. Different sizes will share load in proportion to their ratings."
  },
  {
    id: "auto-transformer",
    question: "What is the main advantage of an auto-transformer compared to a double-wound transformer?",
    options: ["Better isolation", "Smaller size for given VA rating", "Higher voltage capability", "Lower fault level"],
    correctIndex: 1,
    explanation: "Auto-transformers have a single winding serving both primary and secondary, requiring less copper and iron. They are significantly smaller and cheaper for voltage ratios close to 1:1, but provide no electrical isolation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a three-phase core-type transformer, how many limbs does the magnetic core typically have?",
    options: [
      "Two limbs",
      "Three limbs",
      "Four limbs",
      "Six limbs"
    ],
    correctAnswer: 1,
    explanation: "A three-phase core-type transformer has three limbs, one for each phase. The windings for each phase are wound on their respective limb, and magnetic flux flows through the common yokes."
  },
  {
    id: 2,
    question: "What is the phase displacement between primary and secondary in a Yy0 transformer?",
    options: ["30°", "180°", "0°", "330°"],
    correctAnswer: 2,
    explanation: "The '0' in Yy0 indicates zero phase displacement (0 × 30° = 0°). Both primary and secondary are star-connected with their line voltages in phase."
  },
  {
    id: 3,
    question: "Which vector group is most commonly used for distribution transformers in the UK?",
    options: ["Yy0", "Dd0", "Dyn11", "Yd1"],
    correctAnswer: 2,
    explanation: "Dyn11 is the standard for UK distribution transformers. The delta primary allows third harmonic currents to circulate, while the star secondary provides a neutral for single-phase loads. The 30° phase shift helps with parallel operation."
  },
  {
    id: 4,
    question: "What happens if transformers with different vector groups are paralleled?",
    options: [
      "Reduced efficiency",
      "Excessive circulating currents and possible damage",
      "Unequal load sharing",
      "Reduced voltage regulation"
    ],
    correctAnswer: 1,
    explanation: "Paralleling transformers with different vector groups creates a phase difference between their secondary voltages, causing large circulating currents that can damage windings and trip protective devices."
  },
  {
    id: 5,
    question: "For an auto-transformer with 400V input and 230V output, what percentage of the load current passes through the common winding?",
    options: ["42.5%", "57.5%", "100%", "170%"],
    correctAnswer: 0,
    explanation: "In an auto-transformer, only the difference between input and output current flows in the series winding. With a 400:230 ratio, the common winding carries (400-230)/400 = 42.5% of the load current, making it smaller than an equivalent two-winding transformer."
  },
  {
    id: 6,
    question: "What is the purpose of the Scott connection?",
    options: [
      "To convert three-phase to single-phase",
      "To convert three-phase to two-phase",
      "To provide voltage regulation",
      "To eliminate harmonics"
    ],
    correctAnswer: 1,
    explanation: "The Scott connection uses two single-phase transformers to convert a three-phase supply to a two-phase (90° displaced) supply. It was historically used for two-phase motor drives and is still used in some railway electrification systems."
  },
  {
    id: 7,
    question: "What is the primary function of a neutral earthing transformer (NET)?",
    options: [
      "To step down voltage for lighting",
      "To provide an earth reference for unearthed systems",
      "To improve power factor",
      "To suppress harmonics"
    ],
    correctAnswer: 1,
    explanation: "A neutral earthing transformer creates an artificial neutral point for earthing in systems where the supply transformer has no accessible neutral (e.g., delta secondary). This provides earth fault protection capability."
  },
  {
    id: 8,
    question: "In a shell-type three-phase transformer, how are the phase windings arranged?",
    options: [
      "On separate magnetic cores",
      "On a common three-limbed core",
      "All windings on a single central limb",
      "Each phase surrounded by its own magnetic circuit"
    ],
    correctAnswer: 3,
    explanation: "In a shell-type transformer, each phase winding is surrounded by its own portion of the magnetic core (shell), providing better magnetic shielding and mechanical support. This construction is used for high-power transformers."
  },
  {
    id: 9,
    question: "What happens to the neutral current in a Dyn transformer supplying unbalanced single-phase loads?",
    options: [
      "It circulates in the delta primary",
      "It flows to earth",
      "It cannot be accommodated",
      "It returns through the neutral conductor"
    ],
    correctAnswer: 3,
    explanation: "The 'n' in Dyn indicates the neutral is brought out from the star secondary. Unbalanced currents return through this neutral. The corresponding zero-sequence currents circulate within the delta primary, preventing upstream flow."
  },
  {
    id: 10,
    question: "For a 500 kVA transformer to be installed in a commercial building basement, which cooling method would typically be specified?",
    options: [
      "ONAN (oil natural, air natural)",
      "AN (air natural) dry-type",
      "ONAF (oil natural, air forced)",
      "OFAF (oil forced, air forced)"
    ],
    correctAnswer: 1,
    explanation: "For indoor installation in occupied buildings, dry-type (AN or AF) transformers are preferred due to fire safety. Oil-filled transformers require fire-resistant chambers, bunding, and fire suppression systems, making them less suitable for basements."
  }
];

const faqs = [
  {
    question: "When should I specify single-phase transformers instead of a three-phase unit?",
    answer: "Consider single-phase units when: (1) The load is predominantly single-phase, (2) Space constraints prevent installing a large three-phase unit, (3) N+1 redundancy is required (easier with individual phases), (4) Transportation limitations exist for large three-phase units, or (5) Future expansion may require different phase loadings."
  },
  {
    question: "Why is Dyn11 preferred over Dyn1 for distribution?",
    answer: "Both have the same electrical characteristics, but Dyn11 is the UK/European standard whilst Dyn1 is common in the Americas. Using the standard vector group simplifies parallel operation with grid transformers and ensures compatibility with protection schemes designed for that configuration."
  },
  {
    question: "Can I parallel a Dyn11 transformer with a Yd11?",
    answer: "No. Although both have '11' indicating 330° phase shift, Dyn11 has a star secondary whilst Yd11 has a delta secondary. The voltage ratios between line and phase differ, making direct paralleling impossible. Only transformers with identical vector groups can be paralleled."
  },
  {
    question: "What are the fire risks with oil-filled transformers in buildings?",
    answer: "Mineral oil is flammable (flash point ~140°C) and presents significant fire risk. Building regulations require: fire-resistant chambers (typically 4-hour rating), oil containment bunding (110% capacity), fire suppression systems, adequate ventilation, and separation from escape routes. Many designers now specify dry-type or ester-filled transformers for internal installation."
  },
  {
    question: "How do I select between cast resin and VPI dry-type transformers?",
    answer: "Cast resin (encapsulated) transformers offer better moisture and contamination resistance, suitable for harsh environments. VPI (Vacuum Pressure Impregnated) transformers are more economical and easier to repair but require cleaner environments. For standard commercial buildings, either is acceptable; for industrial or high-humidity locations, cast resin is preferred."
  },
  {
    question: "What is the typical impedance tolerance for parallel operation?",
    answer: "Transformers being paralleled should have impedance values within ±10% of each other. Greater differences cause unequal load sharing proportional to the inverse of impedance - the lower impedance unit takes more than its share of load and may overheat. Identical impedances ensure load shares according to kVA ratings."
  }
];

const HNCModule3Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5">
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
            <span>Module 3.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Single-Phase vs Three-Phase Transformers
          </h1>
          <p className="text-white/80">
            Construction types, vector groups, parallel operation, and specialist transformer applications for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Single-phase:</strong> Simple, used for small loads up to ~100 kVA</li>
              <li className="pl-1"><strong>Three-phase:</strong> More efficient, compact, standard for distribution</li>
              <li className="pl-1"><strong>Vector groups:</strong> Define winding connections and phase shifts</li>
              <li className="pl-1"><strong>Dyn11:</strong> UK standard for 11 kV/400V distribution</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Distribution:</strong> 11 kV/400V package substations</li>
              <li className="pl-1"><strong>Internal:</strong> Dry-type for fire safety</li>
              <li className="pl-1"><strong>Isolation:</strong> IT system supplies for critical loads</li>
              <li className="pl-1"><strong>Auto-transformers:</strong> Motor starting, voltage matching</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare single-phase and three-phase transformer construction",
              "Identify core-type and shell-type magnetic circuit arrangements",
              "Interpret vector group designations (Dyn11, Yy0, etc.)",
              "Apply requirements for parallel operation of transformers",
              "Explain auto-transformer operation and applications",
              "Describe Scott connection for two-phase conversion",
              "Specify neutral earthing transformers for unearthed systems",
              "Select appropriate transformers for building services installations"
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

        {/* Section 1: Single-Phase Transformer Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Single-Phase Transformer Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Single-phase transformers are the simplest form, consisting of primary and secondary windings
              on a common magnetic core. They are widely used for lighting, small power supplies, and
              where single-phase loads predominate.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Core Types</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Core Type</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Windings surround the core limbs</li>
                    <li className="pl-1">Simple construction, easy cooling</li>
                    <li className="pl-1">Used for high-voltage transformers</li>
                    <li className="pl-1">Lower mechanical strength</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Shell Type</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Core surrounds the windings</li>
                    <li className="pl-1">Better mechanical protection</li>
                    <li className="pl-1">Preferred for high-current, low-voltage</li>
                    <li className="pl-1">Better short-circuit withstand</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phase Transformer Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Domestic supply (rural)</td>
                      <td className="border border-white/10 px-3 py-2">16-50 kVA</td>
                      <td className="border border-white/10 px-3 py-2">Pole-mounted, 11 kV/230V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control circuits</td>
                      <td className="border border-white/10 px-3 py-2">0.1-5 kVA</td>
                      <td className="border border-white/10 px-3 py-2">400V/110V or 230V/24V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolation transformers</td>
                      <td className="border border-white/10 px-3 py-2">0.5-10 kVA</td>
                      <td className="border border-white/10 px-3 py-2">1:1 ratio for IT systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site tool supplies</td>
                      <td className="border border-white/10 px-3 py-2">3-10 kVA</td>
                      <td className="border border-white/10 px-3 py-2">230V/110V CTE</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Welding supplies</td>
                      <td className="border border-white/10 px-3 py-2">5-50 kVA</td>
                      <td className="border border-white/10 px-3 py-2">High current, low voltage secondary</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Three single-phase transformers can provide three-phase supply with individual unit redundancy - if one fails, the remaining two can supply reduced load via open-delta connection.
            </p>
          </div>
        </section>

        {/* Section 2: Three-Phase Transformer Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Three-Phase Transformer Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase transformers are the standard choice for commercial and industrial distribution.
              They offer significant advantages in size, weight, and efficiency compared to equivalent
              banks of single-phase units.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Core-Type Construction</p>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  The most common construction uses a three-limbed core where each phase winding occupies one limb.
                  The magnetic flux from each phase combines in the common yokes connecting the limbs.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Centre limb:</strong> Slightly shorter flux path than outer limbs</li>
                  <li className="pl-1"><strong>Yoke:</strong> Connects limbs, carries resultant flux</li>
                  <li className="pl-1"><strong>Balanced load:</strong> Net flux in yoke is zero (fluxes cancel)</li>
                  <li className="pl-1"><strong>Unbalanced load:</strong> Small residual flux in yoke</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Shell-Type Construction</p>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  Each phase has its own magnetic circuit surrounding the windings. This provides
                  independent operation of each phase with better mechanical support and fault containment.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Five-limbed core:</strong> Three wound limbs plus two return limbs</li>
                  <li className="pl-1"><strong>Independent phases:</strong> Fault in one phase less likely to affect others</li>
                  <li className="pl-1"><strong>Higher cost:</strong> More core material required</li>
                  <li className="pl-1"><strong>Large transformers:</strong> Used for generator step-up transformers</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Comparison: Three-Phase vs Single-Phase Bank</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Three-Phase Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Three Single-Phase</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Core material</td>
                      <td className="border border-white/10 px-3 py-2">~15% less</td>
                      <td className="border border-white/10 px-3 py-2">Baseline</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper material</td>
                      <td className="border border-white/10 px-3 py-2">~15% less</td>
                      <td className="border border-white/10 px-3 py-2">Baseline</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor space</td>
                      <td className="border border-white/10 px-3 py-2">Smaller footprint</td>
                      <td className="border border-white/10 px-3 py-2">Larger total area</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                      <td className="border border-white/10 px-3 py-2">Slightly lower</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Redundancy</td>
                      <td className="border border-white/10 px-3 py-2">Complete failure if faulty</td>
                      <td className="border border-white/10 px-3 py-2">Open-delta operation possible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transport</td>
                      <td className="border border-white/10 px-3 py-2">May exceed limits at large ratings</td>
                      <td className="border border-white/10 px-3 py-2">Easier for very large installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Vector Groups */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Vector Groups
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Vector groups describe the winding connections and the phase displacement between primary
              and secondary voltages. Understanding vector groups is essential for parallel operation
              and protection coordination.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vector Group Notation (IEC 60076-1)</p>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  The notation uses capital letters for HV winding, lowercase for LV winding, and a clock number for phase displacement.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Winding Connections</p>
                    <ul className="text-white/90 space-y-0.5">
                      <li><strong>D or d:</strong> Delta</li>
                      <li><strong>Y or y:</strong> Star (wye)</li>
                      <li><strong>Z or z:</strong> Zigzag</li>
                      <li><strong>n:</strong> Neutral brought out</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Clock Number</p>
                    <ul className="text-white/90 space-y-0.5">
                      <li><strong>0:</strong> 0° displacement</li>
                      <li><strong>1:</strong> 30° lag</li>
                      <li><strong>6:</strong> 180° displacement</li>
                      <li><strong>11:</strong> 330° lead (30° lag)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Example: Dyn11</p>
                    <ul className="text-white/90 space-y-0.5">
                      <li><strong>D:</strong> HV delta</li>
                      <li><strong>y:</strong> LV star</li>
                      <li><strong>n:</strong> Neutral available</li>
                      <li><strong>11:</strong> 330° lead</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Vector Groups</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Vector Group</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase Shift</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Dyn11</td>
                      <td className="border border-white/10 px-3 py-2">330° (LV leads)</td>
                      <td className="border border-white/10 px-3 py-2">UK distribution standard (11kV/400V)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Yy0</td>
                      <td className="border border-white/10 px-3 py-2">0°</td>
                      <td className="border border-white/10 px-3 py-2">Transmission (problems with 3rd harmonic)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Dd0</td>
                      <td className="border border-white/10 px-3 py-2">0°</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, no neutral required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Yd1</td>
                      <td className="border border-white/10 px-3 py-2">30° (LV lags)</td>
                      <td className="border border-white/10 px-3 py-2">Step-up transformers at generators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Dy11</td>
                      <td className="border border-white/10 px-3 py-2">330° (LV leads)</td>
                      <td className="border border-white/10 px-3 py-2">Step-up from LV generation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">YNd1</td>
                      <td className="border border-white/10 px-3 py-2">30° (LV lags)</td>
                      <td className="border border-white/10 px-3 py-2">Transmission with HV neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Dzn0</td>
                      <td className="border border-white/10 px-3 py-2">0°</td>
                      <td className="border border-white/10 px-3 py-2">Earthing/grounding transformers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Dyn11 is the UK Standard</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Delta primary:</strong> Allows third harmonic currents to circulate, preventing waveform distortion</li>
                <li className="pl-1"><strong>Star secondary:</strong> Provides neutral for single-phase loads (230V from 400V three-phase)</li>
                <li className="pl-1"><strong>Neutral available:</strong> Essential for TN-C-S and TN-S earthing systems</li>
                <li className="pl-1"><strong>Zero-sequence isolation:</strong> Earth faults on LV do not reflect to HV</li>
                <li className="pl-1"><strong>Unbalanced loads:</strong> Can supply unbalanced single-phase loads without problems</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The clock number indicates where the LV voltage phasor points when the HV phasor points to 12 o'clock. Each hour represents 30°.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Parallel Operation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Parallel Operation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Parallel operation of transformers increases capacity and provides redundancy. However,
              strict conditions must be met to prevent circulating currents and ensure proper load sharing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Requirements for Parallel Operation</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Mandatory Requirements</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Same voltage ratio:</strong> ±0.5% tolerance</li>
                    <li className="pl-1"><strong>Same vector group:</strong> Identical phase displacement</li>
                    <li className="pl-1"><strong>Same phase sequence:</strong> R-Y-B matching</li>
                    <li className="pl-1"><strong>Same polarity:</strong> Subtractive or additive</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Desirable Requirements</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Similar impedance:</strong> Within ±10%</li>
                    <li className="pl-1"><strong>Similar X/R ratio:</strong> For reactive load sharing</li>
                    <li className="pl-1"><strong>kVA ratio:</strong> Maximum 3:1 between units</li>
                    <li className="pl-1"><strong>Same tap position:</strong> Equal voltage setting</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Consequences of Incorrect Paralleling</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Different voltage ratios:</strong> Circulating current proportional to voltage difference</li>
                <li className="pl-1"><strong>Different vector groups:</strong> Large circulating currents (potentially fault-level)</li>
                <li className="pl-1"><strong>Different impedances:</strong> Unequal load sharing - low Z takes more load</li>
                <li className="pl-1"><strong>Wrong phase sequence:</strong> Short circuit between phases</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Sharing with Different Impedances</p>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm text-white/90 mb-2">
                  When transformers with different impedances are paralleled, they share load inversely proportional to their per-unit impedances:
                </p>
                <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 mb-3">
                  <p>S₁ = S_total × (Z₂ / (Z₁ + Z₂))</p>
                  <p>S₂ = S_total × (Z₁ / (Z₁ + Z₂))</p>
                </div>
                <p className="text-sm text-white/70">
                  The lower impedance transformer carries more than its proportionate share of load.
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Operation Checks</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Check</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Acceptable Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage ratio</td>
                      <td className="border border-white/10 px-3 py-2">Measure secondary open-circuit</td>
                      <td className="border border-white/10 px-3 py-2">Within ±0.5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase sequence</td>
                      <td className="border border-white/10 px-3 py-2">Phase rotation meter</td>
                      <td className="border border-white/10 px-3 py-2">Same sequence (R-Y-B)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase angle</td>
                      <td className="border border-white/10 px-3 py-2">Voltage across open switch</td>
                      <td className="border border-white/10 px-3 py-2">Zero or very low voltage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Polarity</td>
                      <td className="border border-white/10 px-3 py-2">Polarity test or nameplate</td>
                      <td className="border border-white/10 px-3 py-2">Same polarity markings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Auto-Transformers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Auto-Transformers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An auto-transformer uses a single winding with tapping points to provide voltage transformation.
              Part of the winding is common to both primary and secondary circuits, resulting in smaller
              size but no electrical isolation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Principle</p>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  The winding consists of a series section and a common section. For step-down operation,
                  the full winding receives the input voltage, and the output is taken from a tap point.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Advantages</p>
                    <ul className="text-white/90 space-y-0.5 list-disc list-outside ml-5">
                      <li className="pl-1">Smaller and lighter</li>
                      <li className="pl-1">Lower cost</li>
                      <li className="pl-1">Higher efficiency</li>
                      <li className="pl-1">Better voltage regulation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Disadvantages</p>
                    <ul className="text-white/90 space-y-0.5 list-disc list-outside ml-5">
                      <li className="pl-1">No electrical isolation</li>
                      <li className="pl-1">Higher fault current transfer</li>
                      <li className="pl-1">Not suitable for large ratios</li>
                      <li className="pl-1">Safety concerns for personnel</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Size Advantage Formula</p>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm text-white/90 mb-2">
                  The kVA rating of an auto-transformer required for a given load is:
                </p>
                <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 mb-3">
                  <p>kVA_auto = kVA_load × (1 - V₂/V₁)</p>
                  <p className="mt-2 text-white/60">For 400V to 230V: kVA_auto = kVA_load × (1 - 230/400) = 0.425 × kVA_load</p>
                </div>
                <p className="text-sm text-white/70">
                  The auto-transformer need only be rated at 42.5% of the load for a 400V/230V conversion.
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Auto-Transformer Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor starting</td>
                      <td className="border border-white/10 px-3 py-2">80%, 65%, 50% taps</td>
                      <td className="border border-white/10 px-3 py-2">Reduced voltage starting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage regulators</td>
                      <td className="border border-white/10 px-3 py-2">Variable ±10%</td>
                      <td className="border border-white/10 px-3 py-2">Voltage correction (variacs)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interconnection</td>
                      <td className="border border-white/10 px-3 py-2">400kV/275kV</td>
                      <td className="border border-white/10 px-3 py-2">Grid voltage matching</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test supplies</td>
                      <td className="border border-white/10 px-3 py-2">Variable 0-100%</td>
                      <td className="border border-white/10 px-3 py-2">Laboratory voltage adjustment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Buck-boost</td>
                      <td className="border border-white/10 px-3 py-2">±5% to ±15%</td>
                      <td className="border border-white/10 px-3 py-2">Voltage correction for equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety note:</strong> Auto-transformers must not be used where isolation is required for safety (e.g., SELV circuits) as the primary and secondary share a common conductor.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Scott Connection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Scott Connection for Two-Phase Conversion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Scott connection (or Scott-T connection) converts three-phase supply to two-phase
              (90° displaced) or vice versa. Though two-phase systems are largely obsolete, Scott
              connections remain important for specific applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction and Operation</p>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  Two single-phase transformers are used:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Main transformer:</strong> Connected across two phases (e.g., R-B)</li>
                  <li className="pl-1"><strong>Teaser transformer:</strong> Primary has 86.6% turns, connected to Y and main transformer centre tap</li>
                  <li className="pl-1"><strong>Output:</strong> Two single-phase supplies 90° apart</li>
                  <li className="pl-1"><strong>Balanced load:</strong> Results in balanced three-phase current</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modern Applications</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Railway Electrification</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">25 kV AC railway supply from three-phase grid</li>
                    <li className="pl-1">Adjacent sections fed 90° out of phase</li>
                    <li className="pl-1">Neutral sections at transformer outputs</li>
                    <li className="pl-1">Balanced loading of three-phase supply</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Electric Arc Furnaces</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Historic installations with two-phase furnaces</li>
                    <li className="pl-1">Conversion from three-phase supply</li>
                    <li className="pl-1">Independent control of each phase</li>
                    <li className="pl-1">Now largely replaced by three-phase designs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage and Turn Ratios</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Main transformer: N₁ turns (full winding)</p>
                <p>Teaser transformer primary: 0.866 × N₁ turns (86.6%)</p>
                <p className="mt-2">For equal secondary voltages, both secondaries have the same turns</p>
                <p className="mt-2 text-white/60">The 86.6% factor is √3/2, derived from three-phase geometry</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Neutral Earthing Transformers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Neutral Earthing Transformers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Neutral earthing transformers (NETs) create an artificial neutral point for systems where
              no natural neutral exists, enabling earth fault protection on delta-connected or unearthed systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Neutral Earthing Transformers</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Zigzag (Zn) Type</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Most common for creating neutral</li>
                    <li className="pl-1">Each limb has two windings in opposition</li>
                    <li className="pl-1">Low zero-sequence impedance</li>
                    <li className="pl-1">Compact and economical</li>
                    <li className="pl-1">No secondary winding needed</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Star-Delta (YNd) Type</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Star primary creates neutral</li>
                    <li className="pl-1">Delta secondary may supply auxiliary loads</li>
                    <li className="pl-1">Higher cost than zigzag</li>
                    <li className="pl-1">Used when auxiliary supply needed</li>
                    <li className="pl-1">More flexible but larger</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generator earthing</td>
                      <td className="border border-white/10 px-3 py-2">Delta-connected generators</td>
                      <td className="border border-white/10 px-3 py-2">Provide earth reference, limit fault current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Delta secondary</td>
                      <td className="border border-white/10 px-3 py-2">Dd0 transformer output</td>
                      <td className="border border-white/10 px-3 py-2">Enable earth fault protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial systems</td>
                      <td className="border border-white/10 px-3 py-2">Imported delta supplies</td>
                      <td className="border border-white/10 px-3 py-2">Create TN system from IT supply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistance earthing</td>
                      <td className="border border-white/10 px-3 py-2">Medium voltage systems</td>
                      <td className="border border-white/10 px-3 py-2">Limit earth fault current to safe level</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sizing Neutral Earthing Transformers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Continuous rating:</strong> Based on normal unbalance current (typically small)</li>
                <li className="pl-1"><strong>Short-time rating:</strong> Based on earth fault current × fault duration</li>
                <li className="pl-1"><strong>Typical specification:</strong> 10 seconds at rated fault current</li>
                <li className="pl-1"><strong>Zero-sequence impedance:</strong> Determines fault current magnitude</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Section 8: Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Transformer Selection and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transformer selection for building services requires consideration of electrical requirements,
              fire safety, acoustic impact, space constraints, and maintenance access.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Types for Buildings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cooling</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fire Safety</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Oil-filled (ONAN)</td>
                      <td className="border border-white/10 px-3 py-2">Natural oil/air</td>
                      <td className="border border-white/10 px-3 py-2">Fire chamber required</td>
                      <td className="border border-white/10 px-3 py-2">External substations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ester-filled</td>
                      <td className="border border-white/10 px-3 py-2">Natural oil/air</td>
                      <td className="border border-white/10 px-3 py-2">K-class fluid, reduced risk</td>
                      <td className="border border-white/10 px-3 py-2">Indoor with restrictions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cast resin (AN)</td>
                      <td className="border border-white/10 px-3 py-2">Air natural</td>
                      <td className="border border-white/10 px-3 py-2">F1 class - self-extinguishing</td>
                      <td className="border border-white/10 px-3 py-2">Indoor substations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cast resin (AF)</td>
                      <td className="border border-white/10 px-3 py-2">Forced air</td>
                      <td className="border border-white/10 px-3 py-2">F1 class - self-extinguishing</td>
                      <td className="border border-white/10 px-3 py-2">Higher loading in buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VPI dry-type</td>
                      <td className="border border-white/10 px-3 py-2">Air natural</td>
                      <td className="border border-white/10 px-3 py-2">Good fire performance</td>
                      <td className="border border-white/10 px-3 py-2">Clean indoor environments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Space and Access</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Minimum 1m clearance sides/rear</li>
                    <li className="pl-1">2m clearance at front for access</li>
                    <li className="pl-1">Adequate height for lifting/maintenance</li>
                    <li className="pl-1">Transport route for replacement</li>
                    <li className="pl-1">Cable entry/exit provisions</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Ventilation</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Natural ventilation: 0.35 m²/100 kVA losses</li>
                    <li className="pl-1">Inlet low, outlet high (convection)</li>
                    <li className="pl-1">Mechanical ventilation for basements</li>
                    <li className="pl-1">Maximum ambient 40°C (derate above)</li>
                    <li className="pl-1">Consider summer peak temperatures</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Safety Requirements (Oil-Filled)</p>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Fire-resistant enclosure:</strong> Typically 4-hour rating</li>
                  <li className="pl-1"><strong>Bunding:</strong> 110% of oil volume containment</li>
                  <li className="pl-1"><strong>Fire suppression:</strong> Automatic system (water mist, FM200, etc.)</li>
                  <li className="pl-1"><strong>Drainage:</strong> To safe collection point</li>
                  <li className="pl-1"><strong>Separation:</strong> 7.5m from buildings without fire wall</li>
                  <li className="pl-1"><strong>Detection:</strong> Smoke/heat detection linked to fire alarm</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Acoustic Considerations</p>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm text-white/90 mb-2">
                  Transformer noise is predominantly at 100 Hz (twice supply frequency) due to magnetostriction.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Typical levels:</strong> 55-70 dB(A) depending on size</li>
                  <li className="pl-1"><strong>Low-noise designs:</strong> Available at premium cost</li>
                  <li className="pl-1"><strong>Anti-vibration mounts:</strong> Prevent structure-borne transmission</li>
                  <li className="pl-1"><strong>Acoustic enclosures:</strong> For sensitive locations</li>
                  <li className="pl-1"><strong>Location:</strong> Away from occupied spaces where possible</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Checklist</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rating (kVA)</td>
                      <td className="border border-white/10 px-3 py-2">Maximum demand + growth allowance (typically 20%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage ratio</td>
                      <td className="border border-white/10 px-3 py-2">11kV/400V standard, check DNO requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Vector group</td>
                      <td className="border border-white/10 px-3 py-2">Dyn11 for distribution with neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Impedance</td>
                      <td className="border border-white/10 px-3 py-2">Typically 4-6% for distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling class</td>
                      <td className="border border-white/10 px-3 py-2">AN/AF for indoor, ONAN for outdoor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Losses</td>
                      <td className="border border-white/10 px-3 py-2">Eco-design Tier 2 minimum (EU 2019/1783)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Noise level</td>
                      <td className="border border-white/10 px-3 py-2">Specify maximum dB(A) for location</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tap range</td>
                      <td className="border border-white/10 px-3 py-2">±5% in 2.5% steps typical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> For buildings with critical loads, consider two smaller transformers in parallel rather than one large unit - this provides N+1 redundancy with 50% capacity maintained on single unit failure.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Parallel Transformer Load Sharing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Two transformers, 500 kVA (4% impedance) and 300 kVA (5% impedance), are paralleled.
                How do they share a 600 kVA load?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Convert to per-unit impedances on common base (800 kVA):</p>
                <p>Z₁(pu) = 4% × (800/500) = 6.4%</p>
                <p>Z₂(pu) = 5% × (800/300) = 13.3%</p>
                <p className="mt-2">Load sharing (inversely proportional to Z):</p>
                <p>S₁ = 600 × (13.3/(6.4+13.3)) = 600 × 0.675 = <strong>405 kVA</strong></p>
                <p>S₂ = 600 × (6.4/(6.4+13.3)) = 600 × 0.325 = <strong>195 kVA</strong></p>
                <p className="mt-2 text-white/60">The 500 kVA unit takes 405 kVA (81% loading)</p>
                <p className="text-white/60">The 300 kVA unit takes 195 kVA (65% loading)</p>
                <p className="mt-2 text-green-400">Low impedance unit takes more than proportionate share</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Auto-Transformer Size Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the kVA rating of an auto-transformer to supply a 100 kVA load
                at 380V from a 400V supply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Auto-transformer kVA = Load kVA × (1 - V₂/V₁)</p>
                <p className="mt-2">kVA_auto = 100 × (1 - 380/400)</p>
                <p>kVA_auto = 100 × (1 - 0.95)</p>
                <p>kVA_auto = 100 × 0.05 = <strong>5 kVA</strong></p>
                <p className="mt-2 text-white/60">Only 5% of load kVA required due to small voltage change</p>
                <p className="mt-2 text-green-400">Compare to 100 kVA for double-wound transformer</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Substation Ventilation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 1000 kVA dry-type transformer has 1.5% no-load losses and 5% full-load losses.
                Calculate ventilation requirements at 75% load.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>No-load losses = 1.5% × 1000 = 15 kW (constant)</p>
                <p>Full-load copper losses = 5% × 1000 = 50 kW</p>
                <p>Copper losses at 75% = 50 × 0.75² = 50 × 0.5625 = 28.1 kW</p>
                <p className="mt-2">Total losses = 15 + 28.1 = <strong>43.1 kW</strong></p>
                <p className="mt-2">Natural ventilation area (rule of thumb: 0.35 m² per 100 kW):</p>
                <p>Area = 0.35 × (43.1/100) × 2 = <strong>0.30 m²</strong></p>
                <p className="text-white/60">(×2 for inlet + outlet)</p>
                <p className="mt-2 text-green-400">Provide 0.15 m² low-level inlet + 0.15 m² high-level outlet</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Knowledge</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Vector groups:</strong> D = delta, Y = star, n = neutral, number = phase shift (×30°)</li>
                <li className="pl-1"><strong>UK distribution:</strong> Dyn11 standard (11kV delta, 400V star with neutral)</li>
                <li className="pl-1"><strong>Parallel operation:</strong> Same ratio, same vector group, similar impedance</li>
                <li className="pl-1"><strong>Auto-transformer:</strong> Size advantage = (1 - V₂/V₁) × load kVA</li>
                <li className="pl-1"><strong>Fire safety:</strong> Dry-type preferred indoors; oil requires fire chamber</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IEC 60076:</strong> Power transformer specification series</li>
                <li className="pl-1"><strong>BS EN 50588:</strong> Medium power transformers (distribution)</li>
                <li className="pl-1"><strong>EU 2019/1783:</strong> Eco-design requirements (Tier 2)</li>
                <li className="pl-1"><strong>ENA TS 35-1:</strong> Distribution transformer specification</li>
                <li className="pl-1"><strong>BS 7671:</strong> Requirements for transformer installations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Paralleling different vector groups:</strong> Will cause catastrophic circulating currents</li>
                <li className="pl-1"><strong>Inadequate ventilation:</strong> Leads to overheating and premature failure</li>
                <li className="pl-1"><strong>Ignoring acoustic impact:</strong> 100 Hz hum travels through structures</li>
                <li className="pl-1"><strong>No access for replacement:</strong> Consider future transformer changes</li>
                <li className="pl-1"><strong>Auto-transformer for isolation:</strong> They provide NO electrical isolation</li>
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
                <p className="font-medium text-white mb-1">Vector Groups</p>
                <ul className="space-y-0.5">
                  <li>Dyn11 - UK distribution standard</li>
                  <li>Yy0 - No phase shift, star both sides</li>
                  <li>Dd0 - No phase shift, delta both sides</li>
                  <li>Clock number × 30° = phase displacement</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Parallel Requirements</p>
                <ul className="space-y-0.5">
                  <li>Same voltage ratio (±0.5%)</li>
                  <li>Same vector group (mandatory)</li>
                  <li>Similar impedance (±10%)</li>
                  <li>Same phase sequence</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Installation</p>
                <ul className="space-y-0.5">
                  <li>Dry-type preferred indoors</li>
                  <li>Oil requires fire chamber</li>
                  <li>Ventilation: 0.35 m²/100 kW losses</li>
                  <li>Anti-vibration mounts for noise</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Auto-Transformer</p>
                <ul className="space-y-0.5">
                  <li>Size = Load × (1 - V₂/V₁)</li>
                  <li>No electrical isolation</li>
                  <li>Used for small voltage ratios</li>
                  <li>Motor starting, buck-boost</li>
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
            <Link to="../h-n-c-module3-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Transformer Theory
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5-4">
              Next: AC Motors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section5_3;
