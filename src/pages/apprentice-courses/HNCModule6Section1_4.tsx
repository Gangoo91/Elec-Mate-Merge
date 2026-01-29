import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Air Permeability - HNC Module 6 Section 1.4";
const DESCRIPTION = "Master air permeability testing for building services: air tightness standards, blower door testing, ATTMA procedures, common leakage paths, and achieving design targets during construction.";

const quickCheckQuestions = [
  {
    id: "air-permeability-definition",
    question: "What is air permeability measured in according to UK Building Regulations?",
    options: ["Pascals per hour", "Cubic metres per hour per square metre at 50 Pascals (m³/h.m² @ 50Pa)", "Air changes per hour (ACH)", "Litres per second per square metre"],
    correctIndex: 1,
    explanation: "Air permeability in the UK is measured in m³/h.m² @ 50Pa - the volume of air passing through each square metre of envelope area per hour when a 50 Pascal pressure difference is applied across the building envelope."
  },
  {
    id: "blower-door-purpose",
    question: "What is the primary purpose of a blower door test?",
    options: ["To measure ventilation rates during normal operation", "To pressurise the building to identify air leakage paths and measure overall airtightness", "To test the mechanical ventilation system performance", "To calculate heating load requirements"],
    correctIndex: 1,
    explanation: "A blower door test pressurises (or depressurises) the building to a standard pressure difference (typically 50Pa) to measure the overall air leakage rate and identify leakage paths in the building envelope."
  },
  {
    id: "attma-certification",
    question: "What does ATTMA certification ensure?",
    options: ["The building meets Part L requirements", "The tester is qualified and uses calibrated equipment to recognised standards", "The ventilation system is correctly installed", "The insulation meets required U-values"],
    correctIndex: 1,
    explanation: "ATTMA (Air Tightness Testing & Measurement Association) certification ensures testers are trained, competent, and use calibrated equipment. ATTMA-certified tests are required for Building Regulations compliance evidence."
  },
  {
    id: "common-leakage-path",
    question: "Which of these is typically the most significant source of air leakage in new buildings?",
    options: ["Window frames", "Service penetrations through the air barrier", "Roof junctions", "Door seals"],
    correctIndex: 1,
    explanation: "Service penetrations (electrical, plumbing, mechanical, data) through the air barrier are typically the most significant and numerous sources of air leakage. Proper sealing coordination with MEP trades is essential."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Building Regulations Part L limiting air permeability for new dwellings is:",
    options: [
      "3 m³/h.m² @ 50Pa",
      "5 m³/h.m² @ 50Pa",
      "8 m³/h.m² @ 50Pa",
      "10 m³/h.m² @ 50Pa"
    ],
    correctAnswer: 2,
    explanation: "Part L 2021 sets a limiting air permeability of 8 m³/h.m² @ 50Pa for new dwellings. However, notional dwelling specifications and many designs target much lower values (typically 3-5 m³/h.m²) to achieve energy performance requirements."
  },
  {
    id: 2,
    question: "When should the first air permeability test ideally be conducted?",
    options: ["After practical completion", "After the air barrier is complete but before internal finishes", "After all MEP second fix is complete", "During the warranty period"],
    correctAnswer: 1,
    explanation: "The ideal timing is after the air barrier is complete but before internal finishes conceal it. This allows remedial work to be undertaken without costly disruption. A pre-test at this stage is best practice."
  },
  {
    id: 3,
    question: "In a blower door test, what does the 'n50' value represent?",
    options: [
      "The number of tests required at 50Pa",
      "Air changes per hour at 50 Pascals pressure difference",
      "The air permeability in m³/h.m²",
      "The percentage of leakage through services"
    ],
    correctAnswer: 1,
    explanation: "The n50 value represents air changes per hour (ACH) at 50 Pascals pressure difference. It is calculated by dividing the air leakage rate (m³/h) by the internal volume of the building."
  },
  {
    id: 4,
    question: "What is the minimum test pressure required for a valid air permeability test under ATTMA TSL1?",
    options: [
      "25 Pa",
      "50 Pa",
      "75 Pa",
      "100 Pa"
    ],
    correctAnswer: 1,
    explanation: "ATTMA TSL1 (Technical Standard L1) requires a minimum induced pressure of 50 Pa for the test to be valid. Tests are conducted at multiple pressure stages (typically 10-60 Pa) to establish the flow/pressure relationship."
  },
  {
    id: 5,
    question: "Which sealing method is most appropriate for electrical back boxes penetrating the air barrier?",
    options: [
      "Standard decorator's caulk",
      "Proprietary airtight back boxes or membrane seals",
      "Expanding foam only",
      "No sealing required as they are internal"
    ],
    correctAnswer: 1,
    explanation: "Proprietary airtight back boxes or membrane seals should be used. These products are designed for the purpose, maintain the air barrier continuity, and accommodate cable entries. Standard sealants and expanding foam alone are insufficient."
  },
  {
    id: 6,
    question: "For large non-domestic buildings, what is an acceptable approach when testing air permeability?",
    options: [
      "Test the entire building as a single zone",
      "Use representative sample testing of similar construction zones",
      "Only test after three years of occupation",
      "Testing is not required for buildings over 5000m²"
    ],
    correctAnswer: 1,
    explanation: "For large buildings, representative sample testing of similar construction zones is acceptable under ATTMA TSL2. The samples must be representative of the building's construction types and the results applied to similar zones."
  },
  {
    id: 7,
    question: "What effect does poor airtightness have on mechanical ventilation systems?",
    options: [
      "No effect - they are separate systems",
      "Improves ventilation by supplementing airflow",
      "Compromises system balance, reduces efficiency, and can cause draughts",
      "Only affects heating, not ventilation"
    ],
    correctAnswer: 2,
    explanation: "Poor airtightness compromises MVHR system performance by allowing uncontrolled infiltration that bypasses heat recovery, creates pressure imbalances, causes draughts, and reduces the system's energy efficiency and effectiveness."
  },
  {
    id: 8,
    question: "The 'pulse method' for air permeability testing differs from blower door testing in that it:",
    options: [
      "Uses higher pressures for more accurate results",
      "Uses a rapid pressure pulse to minimise the effect of wind and temperature",
      "Can only be used on small buildings",
      "Does not require calibrated equipment"
    ],
    correctAnswer: 1,
    explanation: "The pulse method uses a rapid air compression/release to create a momentary pressure difference. This short duration (approximately 1.5 seconds) minimises the influence of wind and stack effects, making it suitable for testing in variable weather conditions."
  },
  {
    id: 9,
    question: "Which MEP coordination issue most commonly causes air permeability test failures?",
    options: [
      "Ductwork joints being too loose",
      "Late installation of services after air barrier sealing is complete",
      "Electrical cables being too large",
      "Plumbing pipes being incorrectly sized"
    ],
    correctAnswer: 1,
    explanation: "Late installation of services after the air barrier is sealed - or worse, sealed around - creates new penetrations that breach the air barrier. Proper MEP coordination ensures all penetrations are made and sealed before finishes conceal them."
  },
  {
    id: 10,
    question: "When using smoke pencils or theatrical smoke during a blower door test, what are you identifying?",
    options: [
      "Fire stopping adequacy",
      "Specific locations of air leakage paths",
      "Ventilation system commissioning data",
      "Thermal bridging locations"
    ],
    correctAnswer: 1,
    explanation: "Smoke testing during pressurisation/depressurisation visually identifies specific air leakage paths. Smoke is drawn towards (depressurised) or pushed away from (pressurised) leakage points, enabling targeted remediation."
  },
  {
    id: 11,
    question: "The 'design air permeability' value used for energy calculations should be:",
    options: [
      "The Part L limiting value",
      "The tested value from a similar completed building or a reasonable target for the construction type",
      "Always 3 m³/h.m² @ 50Pa",
      "Not specified until the building is complete"
    ],
    correctAnswer: 1,
    explanation: "The design air permeability should be a realistic target based on the construction type and evidence from similar buildings. Overly optimistic values will require re-calculation if testing shows higher actual leakage."
  },
  {
    id: 12,
    question: "What is the consequence if a completed building fails to meet its design air permeability target?",
    options: [
      "The building cannot be occupied",
      "The energy calculation must be revised, potentially requiring compensating measures",
      "A fine is automatically issued",
      "The test can simply be repeated until it passes"
    ],
    correctAnswer: 1,
    explanation: "If the tested air permeability exceeds the design value, the SAP/SBEM energy calculation must be revised. This may result in non-compliance, requiring compensating measures such as improved insulation, more efficient heating systems, or remedial airtightness work."
  }
];

const faqs = [
  {
    question: "What happens if we fail the air permeability test?",
    answer: "If the test result exceeds the design target, you have options: (1) Identify and seal leakage paths, then retest - this is often possible with smoke testing to locate issues. (2) Revise the energy calculation with the actual tested value - this may still achieve compliance if there's headroom in other aspects. (3) Implement compensating measures such as improved insulation or more efficient plant to offset the higher air leakage. The key is to identify potential issues early through pre-testing before finishes conceal the air barrier."
  },
  {
    question: "How do MEP installations affect air permeability?",
    answer: "MEP services are typically the largest source of air leakage in modern well-constructed buildings. Every penetration through the air barrier - cables, pipes, ducts, flues - creates a potential leakage path. Coordination is essential: penetrations should be made before the air barrier is completed, appropriately sized grommets or seals specified, and sealing should be inspected before concealment. Late MEP installation after air barrier completion is a primary cause of test failures."
  },
  {
    question: "What is the difference between air permeability and air leakage index?",
    answer: "Air permeability (q50) divides the air leakage rate by the total envelope area (floor, walls, roof) and is used for dwellings under Part L1A. Air leakage index (q50) divides by the internal floor area and is used for non-domestic buildings under Part L2A. The same building tested to the same standard will have different numerical results depending on which metric is used. Always check which metric applies to your building type."
  },
  {
    question: "Can we test the building in sections rather than all at once?",
    answer: "Yes, for large or complex buildings, zonal testing is common and acceptable under ATTMA TSL2. Each zone should be a discrete, sealable section with its own air barrier. For representative sample testing, zones must be selected to represent all construction types in the building. Results from samples are applied to similar construction zones. The testing strategy should be agreed with the BCO early in the project."
  },
  {
    question: "What weather conditions affect air permeability testing?",
    answer: "High winds (typically >6 m/s) and large temperature differences between inside and outside can affect results by creating natural pressure differences that compete with the test fan. ATTMA standards require recording weather conditions and may require test postponement in extreme conditions. Pre-test zero-flow pressure difference measurements help identify when natural conditions are problematic."
  },
  {
    question: "Who is responsible for achieving the air permeability target?",
    answer: "Achieving airtightness is a whole-team responsibility. The designer must specify a realistic target and appropriate details. The main contractor typically takes contractual responsibility. Specialist trades (particularly MEP) must follow sealing details for their penetrations. An airtightness champion or coordinator should be appointed to oversee implementation, conduct inspections, and coordinate pre-testing. Without clear responsibility, airtightness often falls between trades."
  }
];

const HNCModule6Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section1">
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
            <span>Module 6.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Air Permeability
          </h1>
          <p className="text-white/80">
            Air tightness testing, design air permeability, testing procedures, and achieving targets during construction
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Air permeability:</strong> m³/h.m² @ 50Pa</li>
              <li className="pl-1"><strong>Part L limit (dwellings):</strong> 8 m³/h.m² @ 50Pa</li>
              <li className="pl-1"><strong>Testing:</strong> Blower door at 50 Pascal pressure</li>
              <li className="pl-1"><strong>ATTMA:</strong> Certified testing to TSL1/TSL2</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Service penetrations:</strong> Primary leakage source</li>
              <li className="pl-1"><strong>MEP coordination:</strong> Essential for compliance</li>
              <li className="pl-1"><strong>Pre-testing:</strong> Before finishes conceal air barrier</li>
              <li className="pl-1"><strong>MVHR impact:</strong> Airtightness critical for performance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand air permeability standards and Part L requirements",
              "Explain blower door testing methodology and equipment",
              "Apply ATTMA testing procedures and certification requirements",
              "Identify common air leakage paths in building envelopes",
              "Coordinate MEP installations to maintain air barrier integrity",
              "Implement strategies to achieve design air permeability targets"
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

        {/* Section 1: Air Permeability Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Air Permeability Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air permeability measures the rate at which air passes through the building envelope when a
              pressure difference is applied. It is a key indicator of building envelope quality and directly
              impacts energy performance, thermal comfort, and indoor air quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key terminology:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Air permeability (q50):</strong> Air leakage rate per m² of envelope area at 50Pa (m³/h.m²)</li>
                <li className="pl-1"><strong>Air leakage index:</strong> Air leakage rate per m² of floor area at 50Pa (used for non-domestic)</li>
                <li className="pl-1"><strong>n50 (air changes):</strong> Volume air changes per hour at 50Pa (ACH)</li>
                <li className="pl-1"><strong>Air barrier:</strong> The continuous layer that prevents air movement through the envelope</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Regulations Air Permeability Limits</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Part L Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Design Target</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Passivhaus Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New dwellings (Part L1A)</td>
                      <td className="border border-white/10 px-3 py-2">8 m³/h.m² @ 50Pa</td>
                      <td className="border border-white/10 px-3 py-2">3-5 m³/h.m² @ 50Pa</td>
                      <td className="border border-white/10 px-3 py-2">~0.6 ACH (n50)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New non-domestic (Part L2A)</td>
                      <td className="border border-white/10 px-3 py-2">8 m³/h.m² @ 50Pa</td>
                      <td className="border border-white/10 px-3 py-2">3-5 m³/h.m² @ 50Pa</td>
                      <td className="border border-white/10 px-3 py-2">~0.6 ACH (n50)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Existing dwellings (Part L1B)</td>
                      <td className="border border-white/10 px-3 py-2">Not mandatory</td>
                      <td className="border border-white/10 px-3 py-2">Varies by scope</td>
                      <td className="border border-white/10 px-3 py-2">N/A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extensions &gt;50m²</td>
                      <td className="border border-white/10 px-3 py-2">8 m³/h.m² @ 50Pa</td>
                      <td className="border border-white/10 px-3 py-2">Match existing or better</td>
                      <td className="border border-white/10 px-3 py-2">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Why Airtightness Matters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy efficiency:</strong> Uncontrolled air leakage can account for 30-50% of heat loss</li>
                <li className="pl-1"><strong>Thermal comfort:</strong> Draughts cause cold spots and discomfort</li>
                <li className="pl-1"><strong>Moisture control:</strong> Air leakage can transport moisture into building fabric causing condensation</li>
                <li className="pl-1"><strong>MVHR performance:</strong> Mechanical ventilation requires airtight envelope to function correctly</li>
                <li className="pl-1"><strong>Acoustic performance:</strong> Air paths also transmit sound</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> The design air permeability used in SAP/SBEM calculations must be achieved on site - unrealistic targets lead to compliance issues at completion.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Blower Door Testing Methodology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Blower Door Testing Methodology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Blower door testing is the standard method for measuring building air permeability. A calibrated
              fan is temporarily installed in an external door opening to pressurise or depressurise the building,
              and the airflow required to maintain the pressure difference is measured.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Calibrated fan unit</li>
                  <li className="pl-1">Adjustable door panel/frame</li>
                  <li className="pl-1">Digital manometer</li>
                  <li className="pl-1">Flow measurement rings</li>
                  <li className="pl-1">Data logging software</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Preparation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Close all windows/doors</li>
                  <li className="pl-1">Seal intended openings</li>
                  <li className="pl-1">Close trickle vents</li>
                  <li className="pl-1">Seal drainage traps</li>
                  <li className="pl-1">Turn off combustion appliances</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Procedure</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Measure zero-flow baseline</li>
                  <li className="pl-1">Pressurise/depressurise</li>
                  <li className="pl-1">Multiple pressure stages</li>
                  <li className="pl-1">Record flow at each stage</li>
                  <li className="pl-1">Calculate q50 result</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Procedure Steps</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Preparation</td>
                      <td className="border border-white/10 px-3 py-2">Building survey, seal openings, record conditions</td>
                      <td className="border border-white/10 px-3 py-2">Ensure test validity and repeatability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Equipment setup</td>
                      <td className="border border-white/10 px-3 py-2">Install fan in door, connect manometer</td>
                      <td className="border border-white/10 px-3 py-2">Create controlled pressure boundary</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Baseline reading</td>
                      <td className="border border-white/10 px-3 py-2">Measure natural pressure difference (fan off)</td>
                      <td className="border border-white/10 px-3 py-2">Account for wind/stack effects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Pressurisation</td>
                      <td className="border border-white/10 px-3 py-2">Fan blows air in, readings at 10-60Pa increments</td>
                      <td className="border border-white/10 px-3 py-2">Establish flow/pressure relationship</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Depressurisation</td>
                      <td className="border border-white/10 px-3 py-2">Fan extracts air, readings at same increments</td>
                      <td className="border border-white/10 px-3 py-2">Verify results, identify one-way leaks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Calculation</td>
                      <td className="border border-white/10 px-3 py-2">Average pressurisation and depressurisation</td>
                      <td className="border border-white/10 px-3 py-2">Determine q50 air permeability result</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Leak Detection During Testing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Smoke pencils:</strong> Handheld smoke generators show air movement at leakage points</li>
                <li className="pl-1"><strong>Theatrical smoke:</strong> Fill depressurised building, watch where smoke exits</li>
                <li className="pl-1"><strong>Thermal imaging:</strong> Cold air infiltration shows as temperature differences</li>
                <li className="pl-1"><strong>Anemometer:</strong> Measure air velocity at suspected leakage points</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Conduct both pressurisation and depressurisation tests - the average provides the most representative result and differences can indicate one-way leakage paths.
            </p>
          </div>
        </section>

        {/* Section 3: ATTMA Testing Procedures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            ATTMA Testing Procedures and Certification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Air Tightness Testing & Measurement Association (ATTMA) sets the technical standards for
              air permeability testing in the UK. ATTMA certification ensures testers are competent, use
              calibrated equipment, and follow standardised procedures acceptable to Building Control.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">ATTMA Technical Standards</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-medium text-white mb-1">TSL1 - Dwellings</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Whole dwelling testing</li>
                    <li>Minimum 50Pa test pressure</li>
                    <li>Results in m³/h.m² @ 50Pa</li>
                    <li>Envelope area calculation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">TSL2 - Non-Domestic</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Whole building or zone testing</li>
                    <li>Representative sample options</li>
                    <li>Results in m³/h.m² @ 50Pa</li>
                    <li>Floor area index option</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ATTMA Certification Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Tester certification:</strong> Individual testers must pass ATTMA examination and maintain competence</li>
                <li className="pl-1"><strong>Equipment calibration:</strong> Fan units and manometers must have current calibration certificates</li>
                <li className="pl-1"><strong>Lodgement:</strong> Test results must be lodged on ATTMA register within 5 working days</li>
                <li className="pl-1"><strong>Quality assurance:</strong> Random audits of tests by ATTMA technical committee</li>
                <li className="pl-1"><strong>Insurance:</strong> Testers must hold appropriate professional indemnity insurance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Certificate Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Certificate Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Information</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Property identification</td>
                      <td className="border border-white/10 px-3 py-2">Full address, UPRN, plot number (if applicable)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test details</td>
                      <td className="border border-white/10 px-3 py-2">Date, time, weather conditions, internal/external temperatures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building data</td>
                      <td className="border border-white/10 px-3 py-2">Envelope area, internal volume, floor area</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment</td>
                      <td className="border border-white/10 px-3 py-2">Fan serial number, calibration certificate reference</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Results</td>
                      <td className="border border-white/10 px-3 py-2">q50 value, n50 value, uncertainty, pass/fail against target</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Certification</td>
                      <td className="border border-white/10 px-3 py-2">Tester name, ATTMA number, signature, lodgement reference</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sample Testing for Large Developments</p>
              <div className="text-sm text-white space-y-2">
                <p>For developments of multiple similar dwellings, sample testing may be acceptable:</p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Minimum 3 units or 50% of units (whichever is greater) for small developments</li>
                  <li>Representative sample of each dwelling type and construction method</li>
                  <li>Include end-terrace, mid-terrace, and different floor levels</li>
                  <li>First test must pass before sample approach is accepted</li>
                  <li>If any sample fails, 100% testing may be required</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> Building Control will only accept test certificates from ATTMA-registered testers lodged on the ATTMA register - informal tests have no regulatory standing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Achieving Targets and MEP Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Achieving Targets and MEP Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Achieving design air permeability targets requires coordinated effort across all trades throughout
              construction. For building services engineers, understanding common leakage paths and sealing
              requirements for MEP penetrations is essential for maintaining air barrier integrity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Air Leakage Paths</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Structural Junctions</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Wall to floor junctions</li>
                    <li>Wall to ceiling junctions</li>
                    <li>Wall to roof connections</li>
                    <li>Foundation/slab perimeters</li>
                    <li>Party wall junctions</li>
                    <li>Window and door frames</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Service Penetrations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Electrical cables and back boxes</li>
                    <li>Plumbing pipes (water, waste, gas)</li>
                    <li>HVAC ductwork and pipework</li>
                    <li>Flues and chimneys</li>
                    <li>Data and communications cables</li>
                    <li>Extract fan penetrations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">MEP Sealing Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse mt-2">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Penetration Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Sealing Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical back boxes</td>
                      <td className="border border-white/10 px-3 py-2">Airtight back boxes or membrane seals</td>
                      <td className="border border-white/10 px-3 py-2">Multiple cable entries need individual sealing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable penetrations</td>
                      <td className="border border-white/10 px-3 py-2">Proprietary grommets or mastic sealant</td>
                      <td className="border border-white/10 px-3 py-2">Size grommets to match cable diameter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pipe penetrations</td>
                      <td className="border border-white/10 px-3 py-2">Pipe collars, sleeves with internal seal</td>
                      <td className="border border-white/10 px-3 py-2">Allow for thermal movement on hot pipes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ductwork penetrations</td>
                      <td className="border border-white/10 px-3 py-2">Airtight grilles, sealed sleeves</td>
                      <td className="border border-white/10 px-3 py-2">Coordinate fire damper requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Service risers</td>
                      <td className="border border-white/10 px-3 py-2">Fire-rated sealant with airtight properties</td>
                      <td className="border border-white/10 px-3 py-2">Combine fire stopping and air sealing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Recessed lighting</td>
                      <td className="border border-white/10 px-3 py-2">Airtight downlight covers or IC-rated fittings</td>
                      <td className="border border-white/10 px-3 py-2">Maintain ventilation for non-IC fittings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Stage Coordination</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Airtightness Actions</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design</td>
                      <td className="border border-white/10 px-3 py-2">Define air barrier line, specify sealing details</td>
                      <td className="border border-white/10 px-3 py-2">Coordinate penetration locations, specify airtight products</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">First fix</td>
                      <td className="border border-white/10 px-3 py-2">Install air barrier, make penetrations</td>
                      <td className="border border-white/10 px-3 py-2">Complete all penetrations before air barrier closes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air barrier complete</td>
                      <td className="border border-white/10 px-3 py-2">Pre-test before finishes, identify issues</td>
                      <td className="border border-white/10 px-3 py-2">Seal all service penetrations, inspect work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Second fix</td>
                      <td className="border border-white/10 px-3 py-2">Maintain air barrier during fitting out</td>
                      <td className="border border-white/10 px-3 py-2">No new penetrations through air barrier</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Completion</td>
                      <td className="border border-white/10 px-3 py-2">Final ATTMA test for compliance</td>
                      <td className="border border-white/10 px-3 py-2">Support leak detection, remedial sealing if needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Best Practice: Airtightness Champion</p>
              <p className="text-sm text-white mb-2">
                Appoint an airtightness champion or coordinator with responsibility to:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Brief all trades on airtightness requirements and their role</li>
                <li className="pl-1">Conduct regular inspections of air barrier installation and sealing</li>
                <li className="pl-1">Coordinate MEP penetrations with air barrier installation timing</li>
                <li className="pl-1">Organise pre-testing at appropriate construction stages</li>
                <li className="pl-1">Document issues and ensure remedial action is taken</li>
                <li className="pl-1">Liaise with ATTMA tester for final compliance testing</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Critical coordination:</strong> MEP services that penetrate the air barrier after it is sealed - or that are installed without proper sealing - are the leading cause of air permeability test failures on otherwise well-constructed buildings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Calculating Air Permeability Result</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A detached dwelling with envelope area 320 m² tested at 50Pa shows air leakage rate of 1,280 m³/h.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given:</p>
                <p className="ml-4">Air leakage rate (Q50) = 1,280 m³/h</p>
                <p className="ml-4">Envelope area = 320 m²</p>
                <p className="mt-2">Air permeability calculation:</p>
                <p className="ml-4">q50 = Q50 / Envelope area</p>
                <p className="ml-4">q50 = 1,280 / 320</p>
                <p className="ml-4 text-green-400">q50 = 4.0 m³/h.m² @ 50Pa</p>
                <p className="mt-2">Assessment:</p>
                <p className="ml-4">Part L limit: 8.0 m³/h.m² @ 50Pa</p>
                <p className="ml-4 text-green-400">Result: PASS (4.0 &lt; 8.0)</p>
                <p className="mt-2 text-white/60">This is a good result for standard construction</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Air Changes Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Same dwelling with internal volume 480 m³. Calculate n50 air changes.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given:</p>
                <p className="ml-4">Air leakage rate (Q50) = 1,280 m³/h</p>
                <p className="ml-4">Internal volume = 480 m³</p>
                <p className="mt-2">Air changes calculation:</p>
                <p className="ml-4">n50 = Q50 / Internal volume</p>
                <p className="ml-4">n50 = 1,280 / 480</p>
                <p className="ml-4 text-green-400">n50 = 2.67 ACH @ 50Pa</p>
                <p className="mt-2">Comparison:</p>
                <p className="ml-4">Passivhaus standard: ~0.6 ACH @ 50Pa</p>
                <p className="ml-4">Good UK new build: 2-4 ACH @ 50Pa</p>
                <p className="ml-4">Average existing: 10-15 ACH @ 50Pa</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Failed Test Response</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Pre-test shows 6.5 m³/h.m² @ 50Pa against design target of 5.0 m³/h.m². Identify remediation approach.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Assessment:</p>
                <p className="ml-4">Result: 6.5 m³/h.m² @ 50Pa</p>
                <p className="ml-4">Target: 5.0 m³/h.m² @ 50Pa</p>
                <p className="ml-4 text-red-400">Shortfall: 1.5 m³/h.m² (30% above target)</p>
                <p className="mt-2">Leak detection process:</p>
                <p className="ml-4">1. Depressurise building to -50Pa</p>
                <p className="ml-4">2. Systematic smoke pencil survey</p>
                <p className="ml-4">3. Check all service penetrations</p>
                <p className="ml-4">4. Inspect window/door seals</p>
                <p className="ml-4">5. Examine wall/floor junctions</p>
                <p className="mt-2">Findings:</p>
                <p className="ml-4 text-orange-400">- 12 unsealed electrical back boxes</p>
                <p className="ml-4 text-orange-400">- Plumbing penetrations to bathroom</p>
                <p className="ml-4 text-orange-400">- Kitchen extract duct not sealed</p>
                <p className="mt-2">Remediation:</p>
                <p className="ml-4">1. Install airtight back box seals</p>
                <p className="ml-4">2. Seal pipe penetrations with mastic</p>
                <p className="ml-4">3. Seal duct penetration with collar</p>
                <p className="mt-2 text-green-400">Re-test result: 4.2 m³/h.m² @ 50Pa - PASS</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Air Permeability Testing Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Confirm design air permeability target from SAP/SBEM calculations</li>
                <li className="pl-1">Identify air barrier line on drawings - understand what is inside/outside</li>
                <li className="pl-1">Schedule pre-test after air barrier complete, before finishes</li>
                <li className="pl-1">Ensure all MEP penetrations are complete before pre-test</li>
                <li className="pl-1">Arrange ATTMA-certified tester with adequate notice</li>
                <li className="pl-1">Prepare building - close openings, seal traps, weather conditions suitable</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Part L limit (dwellings): <strong>8 m³/h.m² @ 50Pa</strong></li>
                <li className="pl-1">Typical design target: <strong>3-5 m³/h.m² @ 50Pa</strong></li>
                <li className="pl-1">Passivhaus standard: <strong>~0.6 ACH (n50)</strong></li>
                <li className="pl-1">Test pressure: <strong>50 Pascals</strong></li>
                <li className="pl-1">ATTMA lodgement: <strong>Within 5 working days</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late MEP installation</strong> - penetrating sealed air barrier causes failures</li>
                <li className="pl-1"><strong>No pre-testing</strong> - discovering issues after finishes is costly</li>
                <li className="pl-1"><strong>Incorrect sealing products</strong> - decorator's caulk is not an air sealant</li>
                <li className="pl-1"><strong>Unrealistic design targets</strong> - over-optimistic values cause compliance issues</li>
                <li className="pl-1"><strong>Unclear responsibility</strong> - airtightness falls between trades without coordination</li>
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
                <p className="font-medium text-white mb-1">Air Permeability Standards</p>
                <ul className="space-y-0.5">
                  <li>Part L limit: 8 m³/h.m² @ 50Pa</li>
                  <li>Good practice: 3-5 m³/h.m² @ 50Pa</li>
                  <li>Passivhaus: ~0.6 ACH @ 50Pa</li>
                  <li>Test standard: ATTMA TSL1/TSL2</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Common Leakage Sources</p>
                <ul className="space-y-0.5">
                  <li>Service penetrations (MEP)</li>
                  <li>Window/door frames</li>
                  <li>Wall/floor/ceiling junctions</li>
                  <li>Recessed lighting and extract fans</li>
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
            <Link to="../h-n-c-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section1-5">
              Next: Section 1.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section1_4;
