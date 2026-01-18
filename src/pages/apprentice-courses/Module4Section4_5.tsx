import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Preventing Damage to Cables During Installation | Level 2 Electrical Course";
const DESCRIPTION = "Master professional cable damage prevention techniques during installation. Learn protection methods, handling procedures, and BS 7671 compliance for safe electrical installations.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Which is NOT a common cause of cable damage during installation?",
    options: ["Abrasion", "Over-bending", "Correct support spacing", "Excessive pulling tension"],
    correctIndex: 2,
    explanation: "Correct support spacing prevents damage, whilst abrasion, over-bending and excessive tension are common causes of cable damage."
  },
  {
    id: 2,
    question: "What is the primary purpose of cable rollers during installation?",
    options: ["Increase pulling speed", "Prevent dragging and abrasion", "Reduce installation cost", "Improve cable appearance"],
    correctIndex: 1,
    explanation: "Cable rollers prevent cables from dragging against surfaces, reducing abrasion and friction damage during pulling operations."
  },
  {
    id: 3,
    question: "Why should cable ties not be over-tightened?",
    options: ["To save time", "To prevent crushing the cable insulation", "To allow easy removal", "To reduce material costs"],
    correctIndex: 1,
    explanation: "Over-tightening cable ties can crush the cable insulation and conductors, potentially causing electrical faults and safety hazards."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which is NOT a common cause of cable damage during installation?",
    options: [
      "Abrasion",
      "Over-bending",
      "Correct support spacing",
      "Excessive pulling tension"
    ],
    correctAnswer: 2,
    explanation: "Correct support spacing prevents damage, whilst abrasion, over-bending and excessive tension are common causes of cable damage."
  },
  {
    id: 2,
    question: "True or False: Cable ties can be tightened as much as possible for security.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "Cable ties should not be over-tightened as this can crush the cable insulation and damage conductors."
  },
  {
    id: 3,
    question: "Name two fittings that protect cables from sharp edges.",
    options: [
      "Bushes and grommets",
      "Nuts and bolts",
      "Washers and springs",
      "Clips and brackets"
    ],
    correctAnswer: 0,
    explanation: "Bushes, grommets, and trunking end caps protect cables from sharp edges at entry and exit points."
  },
  {
    id: 4,
    question: "What is the risk of exceeding a cable's maximum pulling tension?",
    options: [
      "Faster installation",
      "Damage to insulation and conductor stretching",
      "Better cable performance",
      "Reduced installation cost"
    ],
    correctAnswer: 1,
    explanation: "Exceeding pulling tension limits can stretch conductors, damage insulation, and compromise cable integrity."
  },
  {
    id: 5,
    question: "How should cables be stored before installation?",
    options: [
      "Flat on the ground",
      "On drums or reels, kept off the ground",
      "Coiled in corners",
      "Hanging from ceiling"
    ],
    correctAnswer: 1,
    explanation: "Cables should be stored on drums or reels to prevent kinks, damage, and contamination from ground contact."
  },
  {
    id: 6,
    question: "Why must outdoor cables be UV-rated?",
    options: [
      "To look better",
      "To prevent sheath degradation from sunlight",
      "To reduce cost",
      "To improve flexibility"
    ],
    correctAnswer: 1,
    explanation: "UV radiation from sunlight can degrade cable sheaths, making them brittle and prone to cracking."
  },
  {
    id: 7,
    question: "Name one method to prevent crushing during installation.",
    options: [
      "Use soft-edged cleats",
      "Pull cables faster",
      "Use smaller drums",
      "Install in wet conditions"
    ],
    correctAnswer: 0,
    explanation: "Soft-edged cleats or lined saddles prevent crushing of delicate cables during installation and support."
  },
  {
    id: 8,
    question: "Which regulation requires cables to be protected from damage during installation?",
    options: ["BS 6423", "BS 7671", "BS 5839", "BS 7909"],
    correctAnswer: 1,
    explanation: "BS 7671 requires cables to be installed so they are not subject to damage under normal service conditions."
  }
];

const Module4Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 4.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Preventing Damage to Cables During Installation
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master professional cable damage prevention techniques that protect expensive cables, maintain insulation integrity, and ensure BS 7671 compliance for safe installations.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2 text-sm">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Cables are expensive components that require protection during installation</li>
                  <li>Damage can occur from abrasion, crushing, over-bending, and excessive tension</li>
                  <li>Prevention strategies save time, money, and ensure electrical safety</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2 text-sm">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Sharp edges, excessive tension, tight bends, crushing points</li>
                  <li><strong>Use:</strong> Cable rollers, bushes, grommets, pulling lubricant, tension gauges</li>
                  <li><strong>Check:</strong> Sheath integrity, bend radius, support spacing, cleat tightness</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-2 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Identify the most common causes of cable damage during electrical installation operations</li>
                <li>Apply protective measures when handling, storing, and installing cables in various environments</li>
                <li>Select appropriate tools, supports, and pulling methods to prevent mechanical cable damage</li>
                <li>Understand the importance of bend radius, tension limits, and sheath integrity preservation</li>
                <li>Follow BS 7671 and manufacturer guidelines to maintain cable safety and warranty compliance</li>
              </ul>
            </div>
          </section>

          {/* Common Causes of Cable Damage */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Common Causes of Cable Damage During Installation
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Understanding damage mechanisms allows preventive measures to be implemented effectively:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Mechanical Damage Sources</p>
                <p className="text-white/80 text-sm mb-2"><strong>Abrasion damage mechanisms:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Sharp containment edges: File to 0.5mm radius minimum, deburr all cut edges</li>
                  <li>Cable-to-cable friction: Stagger different cable sizes, use separators</li>
                  <li>Dragging over surfaces: Use rollers every 3m, maintain 50mm ground clearance</li>
                  <li>Entry point damage: Install protective bushes with 3mm minimum wall thickness</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Crushing and impact prevention:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Cleat over-tightening: Maximum 40N/cm² contact pressure, use torque specifications</li>
                  <li>Support point pressure: Use soft-lined cleats, distribute loads across multiple points</li>
                  <li>Tool drop protection: Implement exclusion zones during installation</li>
                  <li>Heavy load placement: Never use cables as temporary supports or walkways</li>
                </ul>
                <div className="text-sm text-elec-yellow/80 bg-elec-yellow/5 p-2 rounded mt-2">
                  <strong>Critical limit:</strong> Any visible sheath damage {'>'}10% thickness requires cable replacement
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Bend Radius and Tension Control</p>
                <p className="text-white/80 text-sm mb-2"><strong>Minimum bend radius requirements:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>PVC insulated cables: 6× overall diameter during installation, 4× when fixed</li>
                  <li>XLPE cables: 8× overall diameter during installation, 6× when fixed</li>
                  <li>SWA cables: 12× overall diameter during installation, 8× when fixed</li>
                  <li>Special applications: Consult manufacturer datasheet for specific requirements</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Pulling tension control methods:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Tension limits: 7N/mm² for copper conductors, 5N/mm² for aluminium</li>
                  <li>Monitoring equipment: Calibrated tension gauges for pulls {'>'}500N force</li>
                  <li>Progressive pulling: Break long runs into 30m maximum sections</li>
                  <li>Team coordination: Constant communication between puller and feeder</li>
                </ul>
                <div className="text-sm text-green-400/80 bg-green-500/5 p-2 rounded mt-2">
                  <strong>Professional tip:</strong> Use 80% of maximum tension as working limit for safety margin
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Environmental and Chemical Damage</p>
                <p className="text-white/80 text-sm mb-2"><strong>Temperature damage prevention:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Installation temperature: PVC minimum 0°C, XLPE minimum -20°C</li>
                  <li>Heat source separation: 300mm minimum from equipment {'>'}70°C</li>
                  <li>Direct sunlight protection: Cover cables, avoid peak temperature periods</li>
                  <li>Thermal cycling damage: Account for expansion coefficients in support design</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Chemical and UV protection:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>UV exposure limits: Non-UV cables maximum 6 months outdoor exposure</li>
                  <li>Chemical compatibility: Check sheath material against environment chemicals</li>
                  <li>Contamination prevention: Seal entry points, use appropriate IP ratings</li>
                  <li>Long-term stability: Consider ozone resistance for outdoor applications</li>
                </ul>
                <div className="text-sm text-purple-400/80 bg-purple-500/5 p-2 rounded mt-2">
                  <strong>Safety requirement:</strong> Environmental assessment mandatory before cable specification
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="damage-causes-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Protection During Handling and Storage */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Protection During Handling and Storage
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Proper handling and storage prevents pre-installation damage and maintains cable integrity:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Storage Requirements and Environment Control</p>
                <p className="text-white/80 text-sm mb-2"><strong>Drum storage specifications:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Ground clearance: 150mm minimum to prevent moisture ingress and contamination</li>
                  <li>Temperature control: Store between -20°C to +50°C, avoid thermal cycling</li>
                  <li>Humidity management: {'<'}85% RH, provide ventilation in storage areas</li>
                  <li>Rotation policy: First-in-first-out system, maximum 2-year storage for PVC</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Physical protection measures:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Drum condition: Inspect for damage, ensure intact flanges and bearings</li>
                  <li>Weather protection: Waterproof covers, UV shields for outdoor storage</li>
                  <li>Access control: Designated storage areas, trained personnel only</li>
                  <li>Documentation: Storage logs, environmental monitoring records</li>
                </ul>
                <div className="text-sm text-green-400/80 bg-green-500/5 p-2 rounded mt-2">
                  <strong>Quality standard:</strong> Pre-installation inspection mandatory for all cable lengths
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Mechanical Handling Procedures</p>
                <p className="text-white/80 text-sm mb-2"><strong>Drum handling specifications:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Lifting capacity: 2-person team for drums {'>'}25kg, mechanical aids {'>'}100kg</li>
                  <li>Drum jack requirements: Load rating 150% of drum weight, brake control</li>
                  <li>Feed angle control: Maximum 45° deviation from straight line</li>
                  <li>Payout speed control: Prevent overrun, maintain back-tension</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Pre-installation inspection criteria:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Sheath integrity: No cuts {'>'}5% thickness, no compression marks</li>
                  <li>Visual assessment: Check for discolouration, surface contamination</li>
                  <li>Dimensional check: Verify against specification, check for crushing</li>
                  <li>End seal condition: Inspect for moisture ingress, reseal if necessary</li>
                </ul>
                <div className="text-sm text-blue-400/80 bg-blue-500/5 p-2 rounded mt-2">
                  <strong>Rejection criteria:</strong> Any damage affecting conductor or insulation integrity
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="handling-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Protection During Pulling */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Protection During Cable Pulling Operations
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Pulling operations require specific protective measures to prevent damage during installation:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Mechanical Protection Systems</p>
                <p className="text-white/80 text-sm mb-2"><strong>Cable roller installation:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Horizontal runs: Position every 3-5m, align with cable direction</li>
                  <li>Bend locations: 1.5m spacing through curves, roller diameter {'>'}6× cable diameter</li>
                  <li>Vertical applications: Support every 2m, prevent side loading</li>
                  <li>Roller specifications: Smooth surface, free rotation, adequate load rating</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Entry and exit point protection:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Protective bushes: 3mm minimum wall thickness, appropriate material compatibility</li>
                  <li>Bell-mouth guides: Smooth radius transitions, no sharp edges</li>
                  <li>Grommet installation: Correct size selection, proper sealing</li>
                  <li>Trunking end caps: Rounded edges, secure fixing to prevent movement</li>
                </ul>
                <div className="text-sm text-orange-400/80 bg-orange-500/5 p-2 rounded mt-2">
                  <strong>Installation standard:</strong> All containment entries must have protective fittings
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Pulling Lubricant Application and Techniques</p>
                <p className="text-white/80 text-sm mb-2"><strong>Lubricant selection and application:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Application conditions: Runs {'>'}30m, multiple bends {'>'}45°, cable bundles</li>
                  <li>Friction reduction: 60-80% reduction in pulling force when correctly applied</li>
                  <li>Compatible materials: Non-reactive with cable sheath, temperature stable</li>
                  <li>Application method: Even coating, avoid over-application causing slippage</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Tension monitoring and control:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Gauge requirements: Calibrated instruments for mechanical pulls {'>'}500N</li>
                  <li>Monitoring frequency: Continuous during pull, record maximum values</li>
                  <li>Working limits: 80% of manufacturer maximum, adjust for ambient conditions</li>
                  <li>Emergency procedures: Immediate stop protocols when limits approached</li>
                </ul>
                <div className="text-sm text-elec-yellow/80 bg-elec-yellow/5 p-2 rounded mt-2">
                  <strong>Critical procedure:</strong> Stop pull immediately if tension limits exceeded
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Environmental Control and Timing</p>
                <p className="text-white/80 text-sm mb-2"><strong>Temperature and timing considerations:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Pull speed control: Maximum 1m/minute for SWA cables to prevent heating</li>
                  <li>Ambient temperature limits: Avoid pulls {'>'}35°C for thermoplastic cables</li>
                  <li>Thermal expansion: Allow for coefficient differences between containment and cable</li>
                  <li>Weather conditions: Wind loading on vertical pulls, rain affecting grip</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Support during vertical installations:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Intermediate supports: Every 2m for vertical drops {'>'}5m total height</li>
                  <li>Weight distribution: Support cable weight, not pulling system</li>
                  <li>Progressive installation: Install supports as cable advances</li>
                  <li>Emergency arrest: Quick-release clamps in case of equipment failure</li>
                </ul>
                <div className="text-sm text-purple-400/80 bg-purple-500/5 p-2 rounded mt-2">
                  <strong>Safety requirement:</strong> Risk assessment mandatory for vertical pulls {'>'}10m
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="pulling-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Installation in Containment */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Protection During Installation in Containment
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Containment installation requires careful support design and installation practices:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Support System Design and Spacing</p>
                <p className="text-white/80 text-sm mb-2"><strong>BS 7671 Table 4A2 support spacing:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Horizontal runs: 300mm for cables ≤9mm diameter, 600mm for cables {'>'}20mm</li>
                  <li>Vertical runs: 400mm maximum spacing, additional support at changes of direction</li>
                  <li>Heavy cables: Reduce spacing by 50% for SWA cables {'>'}35mm² conductor</li>
                  <li>Multiple cable installations: Consider cumulative loading effects</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Cleat selection and installation:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Material compatibility: Polymer-lined for PVC, stainless steel for corrosive environments</li>
                  <li>Contact pressure: Maximum 40N/cm², use soft-edged designs</li>
                  <li>Fixing torque: 2-4Nm for M6 fixings, follow manufacturer specifications</li>
                  <li>Thermal expansion: Allow movement in fixed supports, use sliding supports</li>
                </ul>
                <div className="text-sm text-purple-400/80 bg-purple-500/5 p-2 rounded mt-2">
                  <strong>Design requirement:</strong> Support calculations must account for fault current forces
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Installation Quality Control and Documentation</p>
                <p className="text-white/80 text-sm mb-2"><strong>Installation quality standards:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Load distribution: Stagger heavy cables, avoid point loading</li>
                  <li>Segregation requirements: 50mm minimum between power and data cables</li>
                  <li>Accessibility: 150mm minimum clearance for future maintenance</li>
                  <li>Visual inspection: Check before concealment, photograph defects</li>
                </ul>
                <p className="text-white/80 text-sm mb-2"><strong>Documentation and compliance:</strong></p>
                <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                  <li>Installation records: Support types, spacings, loading calculations</li>
                  <li>Inspection certificates: Pre-energisation testing requirements</li>
                  <li>Warranty compliance: Follow manufacturer installation guidelines</li>
                  <li>Maintenance access: Document support access points and requirements</li>
                </ul>
                <div className="text-sm text-green-400/80 bg-green-500/5 p-2 rounded mt-2">
                  <strong>Compliance standard:</strong> Installation must maintain cable current ratings
                </div>
              </div>
            </div>
          </section>

          {/* Compliance and Standards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Compliance with BS 7671 and Industry Standards
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Legal and technical compliance ensures safety and maintains equipment warranties:
            </p>

            <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
              <p className="font-medium text-white mb-2">BS 7671 Regulatory Requirements</p>
              <p className="text-white/80 text-sm mb-2"><strong>Specific regulation compliance:</strong></p>
              <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                <li>Regulation 522.6: Cables protected from damage under normal service conditions</li>
                <li>Regulation 522.8: Mechanical damage protection during installation and service</li>
                <li>Section 523: Current-carrying capacity not compromised by installation damage</li>
                <li>Section 526: Electrical connections not stressed by installation procedures</li>
              </ul>
              <p className="text-white/80 text-sm mb-2"><strong>Manufacturer datasheet compliance:</strong></p>
              <ul className="text-white/70 text-sm ml-4 mb-2 list-disc space-y-1">
                <li>Bend radius specifications: Typically 6-15× cable overall diameter</li>
                <li>Pulling tension limits: Usually 7-10N/mm² for copper conductors</li>
                <li>Environmental operating ranges: Temperature, humidity, chemical exposure</li>
                <li>Installation procedures: Specific handling and support requirements</li>
              </ul>
              <div className="text-sm text-red-400/80 bg-red-500/5 p-2 rounded mt-2">
                <strong>Legal requirement:</strong> Installation must comply with BS 7671 for certification
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example: Industrial Cable Tray Damage Incident
            </h2>
            <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-medium text-white mb-2">The Incident</p>
                  <p className="text-white/70 text-sm mb-3">
                    During a major industrial installation, a team was installing 50mm² 4-core SWA cables in a 100-metre cable tray run. To save time, they decided to pull all cables in one operation without using cable rollers or protective measures.
                  </p>
                  <p className="text-white/70 text-sm">
                    The combined weight (8kg/metre per cable) and friction against the sharp aluminium tray edges caused severe abrasion damage. The pulling force exceeded 3000N, well above the 1500N manufacturer limit.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Discovery and Cost Impact</p>
                  <p className="text-white/70 text-sm mb-3">
                    During final inspection before commissioning, severe damage was discovered:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>15 cables with sheath damage {'>'}25% thickness</li>
                    <li>3 cables with exposed steel wire armour</li>
                    <li>Direct costs: £12,000 cable replacement + £8,000 labour</li>
                    <li>Indirect costs: 2-week project delay + client penalties</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <p className="font-medium text-white mb-2">Prevention Analysis</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <p className="font-medium text-white/80 mb-1 text-sm">Required Prevention</p>
                    <ul className="text-white/60 text-xs space-y-1 list-disc pl-4">
                      <li>Cable rollers every 5m: £300</li>
                      <li>Pulling lubricant: £50</li>
                      <li>Protective bushes: £150</li>
                      <li><strong>Total: £500</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 mb-1 text-sm">Actual Remedial Cost</p>
                    <ul className="text-white/60 text-xs space-y-1 list-disc pl-4">
                      <li>Cable replacement: £12,000</li>
                      <li>Additional labour: £8,000</li>
                      <li>Project delays: £15,000</li>
                      <li><strong>Total: £35,000</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 mb-1 text-sm">Return on Investment</p>
                    <ul className="text-white/60 text-xs space-y-1 list-disc pl-4">
                      <li>Prevention investment: £500</li>
                      <li>Damage avoided: £35,000</li>
                      <li><strong>ROI: 6,900%</strong></li>
                      <li>Risk reduction: 99.8%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 text-white/80">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Are cable cleats always necessary for electrical installations?</p>
                <p className="text-sm">A: Yes, cable cleats are required for most fixed installations to prevent movement during fault conditions (short-circuit forces) and provide mechanical support. However, they must be installed correctly to avoid crushing. Use torque-controlled installation (typically 2-4Nm for M6 fixings) and appropriate cleat materials for the cable type (polymer-lined for PVC cables).</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Can damaged cable sheathing be repaired with electrical tape?</p>
                <p className="text-sm">A: Only minor superficial damage ({'<'}10% sheath thickness) can be temporarily repaired with appropriate insulating tape or heat-shrink sleeves. Deep cuts, exposed conductors, or damaged armouring usually require complete cable replacement. Always consult manufacturer guidelines and consider long-term reliability and warranty implications.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: How do I determine the correct bend radius for any cable type?</p>
                <p className="text-sm">A: Always refer to the manufacturer's datasheet first. Bend radius is typically expressed as multiples of cable overall diameter: PVC cables (6× for installation, 4× fixed), XLPE cables (8× installation, 6× fixed), SWA cables (12× installation, 8× fixed). For special applications or multi-core cables, specific manufacturer guidance supersedes general rules.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: What should I do if pulling tension limits are exceeded during installation?</p>
                <p className="text-sm">A: Stop the pull immediately, release tension carefully, and inspect the cable for damage. Reassess the installation method - consider using pulling lubricant (can reduce tension by 60-80%), additional cable rollers, or breaking the pull into shorter sections. Document any tension exceedance for quality records and warranty purposes.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 text-sm leading-relaxed">
                Preventing cable damage during installation requires comprehensive planning, correct protective equipment, and strict adherence to manufacturer specifications and BS 7671 requirements. The key elements include proper storage and handling procedures, mechanical protection during pulling operations, correct support system design, and environmental control. Taking preventive measures from the start avoids electrical faults, costly rework, safety hazards, and warranty issues while ensuring long-term system reliability and compliance with electrical installation standards.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Section 4.5 Quiz" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cable Pulling Techniques
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-6">
                Next: Earthing Metallic Containment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section4_5;
