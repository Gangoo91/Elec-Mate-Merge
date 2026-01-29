import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documentation Requirements - HNC Module 7 Section 6.6";
const DESCRIPTION = "Master electrical installation documentation requirements: single line diagrams, distribution schedules, test certificates (EIC, EICR), O&M manuals, as-built drawings, and handover packages for building services projects.";

const quickCheckQuestions = [
  {
    id: "single-line-purpose",
    question: "What is the primary purpose of a single line diagram?",
    options: ["To show physical cable routes", "To provide a simplified representation of the electrical distribution system", "To list all circuit protective devices", "To record test results"],
    correctIndex: 1,
    explanation: "A single line diagram provides a simplified schematic representation of the electrical distribution system, showing the relationship between supply sources, switchgear, distribution boards, and major loads without depicting every conductor."
  },
  {
    id: "eic-requirement",
    question: "When must an Electrical Installation Certificate (EIC) be issued?",
    options: ["Only for domestic installations", "For any new installation or addition to an existing installation", "Only when requested by the client", "Only for commercial installations"],
    correctIndex: 1,
    explanation: "An EIC must be issued for all new electrical installations and additions or alterations to existing installations. It certifies that the installation complies with BS 7671 at the time of completion."
  },
  {
    id: "om-manual-content",
    question: "What is the minimum retention period for O&M manuals under CDM Regulations?",
    options: ["5 years", "10 years", "Life of the building", "25 years"],
    correctIndex: 2,
    explanation: "O&M manuals form part of the Health and Safety File under CDM Regulations 2015 and must be retained for the life of the building. They provide essential information for safe operation, maintenance, and future modifications."
  },
  {
    id: "as-built-drawings",
    question: "As-built drawings differ from construction drawings because they:",
    options: ["Are always in colour", "Show the installation exactly as constructed including all variations", "Are produced before construction begins", "Only show cable routes"],
    correctIndex: 1,
    explanation: "As-built drawings record the installation exactly as constructed, incorporating all variations, site instructions, and changes made during installation. They provide an accurate record for future maintenance and modifications."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which document provides a simplified schematic showing the electrical distribution hierarchy?",
    options: [
      "Distribution schedule",
      "Single line diagram",
      "Cable schedule",
      "Test certificate"
    ],
    correctAnswer: 1,
    explanation: "A single line diagram (also called a one-line diagram) provides a simplified schematic representation showing the electrical distribution hierarchy from incoming supply through switchgear to final distribution boards."
  },
  {
    id: 2,
    question: "What information must a distribution schedule contain for each circuit?",
    options: [
      "Only the circuit number and description",
      "Circuit number, description, protective device rating, cable size, and design current",
      "Only protective device ratings",
      "Cable routes only"
    ],
    correctAnswer: 1,
    explanation: "A distribution schedule must contain comprehensive circuit information including circuit number, description, protective device type and rating, cable type and size, design current, and circuit reference. This enables future maintenance and modifications."
  },
  {
    id: 3,
    question: "Who is responsible for signing Section 1 (Declaration by Designer) of an EIC?",
    options: [
      "The client",
      "The installing contractor's operative",
      "The person responsible for the design of the installation",
      "The DNO"
    ],
    correctAnswer: 2,
    explanation: "Section 1 of the EIC (Declaration by Designer) must be signed by the person responsible for the design of the electrical installation. This may be different from the installer if design and installation are carried out by different parties."
  },
  {
    id: 4,
    question: "What is the purpose of a Minor Electrical Installation Works Certificate (MEIWC)?",
    options: [
      "For all new installations",
      "For additions or alterations that do not extend to new circuits",
      "For periodic inspection",
      "For emergency repairs only"
    ],
    correctAnswer: 1,
    explanation: "A MEIWC is used for additions or alterations to an existing installation that do not include the provision of a new circuit. Examples include adding a socket outlet to an existing circuit or replacing a consumer unit."
  },
  {
    id: 5,
    question: "An EICR classification code C2 indicates:",
    options: [
      "Danger present - immediate action required",
      "Potentially dangerous - urgent remedial action required",
      "Improvement recommended",
      "Satisfactory condition"
    ],
    correctAnswer: 1,
    explanation: "Code C2 indicates a potentially dangerous condition where urgent remedial action is required. While not presenting immediate danger (C1), the defect could become dangerous under certain conditions and requires prompt attention."
  },
  {
    id: 6,
    question: "O&M manuals for electrical installations should include:",
    options: [
      "Only manufacturer data sheets",
      "Operating instructions, maintenance schedules, as-built drawings, and test certificates",
      "Only test certificates",
      "Only emergency procedures"
    ],
    correctAnswer: 1,
    explanation: "O&M manuals must be comprehensive, including operating instructions, maintenance schedules, as-built drawings, test certificates, equipment data sheets, spare parts lists, and emergency procedures for all installed systems."
  },
  {
    id: 7,
    question: "According to BS 7671, how long must EICs and associated test results be retained?",
    options: [
      "5 years",
      "10 years",
      "For the working life of the installation",
      "Until the next periodic inspection"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Regulation 132.13 requires that EICs and associated test results be retained for the working life of the electrical installation. They provide essential safety records and evidence of compliance."
  },
  {
    id: 8,
    question: "What distinguishes as-built drawings from construction issue drawings?",
    options: [
      "As-built drawings are issued before construction",
      "As-built drawings incorporate all variations and changes made during construction",
      "As-built drawings only show structural elements",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "As-built drawings are updated versions of construction drawings that incorporate all variations, site instructions, and changes made during the installation process. They provide an accurate record of the installation as actually constructed."
  },
  {
    id: 9,
    question: "Under CDM 2015, electrical documentation forms part of the:",
    options: [
      "Pre-construction information",
      "Construction phase plan",
      "Health and Safety File",
      "F10 notification"
    ],
    correctAnswer: 2,
    explanation: "Electrical documentation including O&M manuals, as-built drawings, and test certificates forms part of the Health and Safety File under CDM 2015. This file must be handed to the client on project completion and retained for the life of the building."
  },
  {
    id: 10,
    question: "A cable schedule should record which of the following?",
    options: [
      "Only cable sizes",
      "Cable type, size, length, route, origin, and destination",
      "Only circuit numbers",
      "Only insulation test results"
    ],
    correctAnswer: 1,
    explanation: "A cable schedule should record comprehensive information including cable type and specification, size, length, route reference, origin (supply point), destination, containment type, and any relevant notes about installation conditions."
  },
  {
    id: 11,
    question: "What is the recommended interval for periodic inspection of a commercial installation?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Guidance Note 3 recommends a maximum interval of 5 years between periodic inspections for commercial premises. However, more frequent inspection may be appropriate depending on the installation type, use, and external influences."
  },
  {
    id: 12,
    question: "Which test results must be recorded on Schedule of Test Results?",
    options: [
      "Only earth fault loop impedance",
      "Continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation",
      "Only RCD operation times",
      "Only insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Test Results must record all verification tests including continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance (Zs), prospective fault current (Ipf), and RCD operation times where applicable."
  }
];

const faqs = [
  {
    question: "What is the difference between an EIC and an EICR?",
    answer: "An Electrical Installation Certificate (EIC) is issued for new installations or additions/alterations to existing installations, certifying compliance with BS 7671 at completion. An Electrical Installation Condition Report (EICR) is for periodic inspection of existing installations, assessing the condition against current standards and identifying any deterioration, defects, or non-compliances. An EIC declares compliance; an EICR reports condition."
  },
  {
    question: "Who is responsible for producing as-built drawings?",
    answer: "The installing contractor is typically responsible for producing as-built drawings, as they have first-hand knowledge of any variations made during construction. However, on larger projects, this may be coordinated through the principal designer or M&E consultant. The contract should clearly define responsibility for as-built documentation and specify the required format (often BIM models for larger projects)."
  },
  {
    question: "How detailed should O&M manuals be for electrical installations?",
    answer: "O&M manuals should be sufficiently detailed to enable competent persons to safely operate, maintain, and modify the installation throughout its life. This includes system descriptions, operating procedures, maintenance schedules with frequencies, manufacturer data sheets, spare parts lists, emergency procedures, and all relevant test certificates and as-built drawings. The level of detail should be proportionate to system complexity."
  },
  {
    question: "Can digital/electronic copies replace paper documentation?",
    answer: "Yes, BS 7671 and CDM 2015 permit electronic documentation provided it remains accessible and legible for the required retention period. Many clients now require BIM models and digital O&M portals. However, ensure backup systems are in place, formats remain readable as technology evolves, and appropriate access controls protect sensitive information. Some clients may still require paper originals of test certificates."
  },
  {
    question: "What happens if documentation is lost or incomplete?",
    answer: "Lost or incomplete documentation creates significant problems for future maintenance and modifications. If original documents cannot be recovered, a comprehensive periodic inspection (EICR) should be carried out to establish the current condition. As-built drawings may need to be recreated through site survey. Missing documentation may indicate poor project management and could have contractual implications regarding practical completion."
  },
  {
    question: "How should documentation be organised for handover?",
    answer: "Documentation should be organised logically, typically by system then sub-system. Use a structured index and consistent numbering. Include a document register listing all items with revision status. Separate operational documents (needed for day-to-day running) from archive documents (certificates, warranties). Electronic documentation should use consistent file naming and folder structures. Allow time for client review before handover."
  }
];

const HNCModule7Section6_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6">
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
            <span>Module 7.6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documentation Requirements
          </h1>
          <p className="text-white/80">
            Single line diagrams, distribution schedules, test certificates, O&M manuals, and as-built drawings for electrical installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Single line diagrams:</strong> Simplified distribution schematics</li>
              <li className="pl-1"><strong>Test certificates:</strong> EIC for new, EICR for existing</li>
              <li className="pl-1"><strong>O&M manuals:</strong> Retained for building life</li>
              <li className="pl-1"><strong>As-built drawings:</strong> Actual installation record</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CDM 2015:</strong> Health and Safety File requirement</li>
              <li className="pl-1"><strong>BS 7671:</strong> Certificate retention for installation life</li>
              <li className="pl-1"><strong>Handover:</strong> Complete package for client</li>
              <li className="pl-1"><strong>BIM:</strong> Digital O&M increasingly required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Interpret and create single line diagrams for electrical distribution systems",
              "Produce comprehensive distribution schedules with required circuit data",
              "Understand EIC, EICR, and MEIWC certification requirements",
              "Compile O&M manuals meeting CDM and client specifications",
              "Develop as-built drawings accurately recording installed works",
              "Assemble complete handover documentation packages"
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

        {/* Section 1: Single Line Diagrams and Distribution Schedules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Single Line Diagrams and Distribution Schedules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Single line diagrams and distribution schedules are fundamental documents for understanding
              and managing electrical installations. They provide essential information for operation,
              maintenance, fault finding, and future modifications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Single Line Diagram Requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Supply details:</strong> DNO supply characteristics, CT ratios, maximum demand</li>
                <li className="pl-1"><strong>Main switchgear:</strong> Main switch rating, type, fault level rating</li>
                <li className="pl-1"><strong>Distribution hierarchy:</strong> MSB &gt; sub-mains &gt; DBs &gt; final circuits</li>
                <li className="pl-1"><strong>Protective devices:</strong> Type, rating, breaking capacity at each level</li>
                <li className="pl-1"><strong>Cable references:</strong> Size and type of main feeders and sub-mains</li>
                <li className="pl-1"><strong>Metering points:</strong> Location of revenue and sub-meters</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Schedule Content</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Column</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Information Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circuit No.</td>
                      <td className="border border-white/10 px-3 py-2">Unique circuit reference</td>
                      <td className="border border-white/10 px-3 py-2">1, 2, 3... or L1, L2, P1...</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Description</td>
                      <td className="border border-white/10 px-3 py-2">Circuit use/location</td>
                      <td className="border border-white/10 px-3 py-2">Lighting - Ground Floor East</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protective Device</td>
                      <td className="border border-white/10 px-3 py-2">Type and rating</td>
                      <td className="border border-white/10 px-3 py-2">MCB Type B 16A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable</td>
                      <td className="border border-white/10 px-3 py-2">Type and size</td>
                      <td className="border border-white/10 px-3 py-2">6242Y 1.5mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design Current (Ib)</td>
                      <td className="border border-white/10 px-3 py-2">Calculated load current</td>
                      <td className="border border-white/10 px-3 py-2">8.5A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD</td>
                      <td className="border border-white/10 px-3 py-2">RCD protection if applicable</td>
                      <td className="border border-white/10 px-3 py-2">30mA Type A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Points</td>
                      <td className="border border-white/10 px-3 py-2">Number of outlets</td>
                      <td className="border border-white/10 px-3 py-2">12 luminaires</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Single Line Diagram Symbols</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/80">Common symbols include:</p>
                  <ul className="text-white/70 space-y-1 mt-2">
                    <li>• Transformer (two circles)</li>
                    <li>• Isolator (gap with contacts)</li>
                    <li>• Circuit breaker (square with X)</li>
                    <li>• Fuse (rectangle)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/80">Must also show:</p>
                  <ul className="text-white/70 space-y-1 mt-2">
                    <li>• Earth connections</li>
                    <li>• Neutral arrangements</li>
                    <li>• Generator connections</li>
                    <li>• UPS systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Single line diagrams should be displayed in main switch rooms. Distribution schedules should be fixed inside each distribution board cover.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Test Certificates */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Test Certificates (EIC, EICR, MEIWC)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical test certificates provide formal documentation of compliance and condition.
              BS 7671 requires specific certificates for different types of work, each serving
              distinct purposes in the certification regime.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EIC - Electrical Installation Certificate</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">New installations</li>
                  <li className="pl-1">Additions with new circuits</li>
                  <li className="pl-1">Alterations with new circuits</li>
                  <li className="pl-1">Three declarations required</li>
                  <li className="pl-1">Schedule of test results</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EICR - Condition Report</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Periodic inspection</li>
                  <li className="pl-1">Change of occupancy</li>
                  <li className="pl-1">Change of use</li>
                  <li className="pl-1">Classification codes (C1-C3, FI)</li>
                  <li className="pl-1">Recommendations for next inspection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEIWC - Minor Works</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">No new circuits</li>
                  <li className="pl-1">Additions to existing circuits</li>
                  <li className="pl-1">Like-for-like replacements</li>
                  <li className="pl-1">Single page format</li>
                  <li className="pl-1">Simplified test results</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EIC Declaration Sections</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Declaration By</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 1</td>
                      <td className="border border-white/10 px-3 py-2">Designer</td>
                      <td className="border border-white/10 px-3 py-2">Design complies with BS 7671</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 2</td>
                      <td className="border border-white/10 px-3 py-2">Constructor/Installer</td>
                      <td className="border border-white/10 px-3 py-2">Installation constructed to design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 3</td>
                      <td className="border border-white/10 px-3 py-2">Inspector/Tester</td>
                      <td className="border border-white/10 px-3 py-2">Inspection and testing completed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EICR Classification Codes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Code</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Classification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-red-500/10">
                      <td className="border border-white/10 px-3 py-2 font-bold">C1</td>
                      <td className="border border-white/10 px-3 py-2">Danger present</td>
                      <td className="border border-white/10 px-3 py-2">Immediate remedial action</td>
                    </tr>
                    <tr className="bg-orange-500/10">
                      <td className="border border-white/10 px-3 py-2 font-bold">C2</td>
                      <td className="border border-white/10 px-3 py-2">Potentially dangerous</td>
                      <td className="border border-white/10 px-3 py-2">Urgent remedial action</td>
                    </tr>
                    <tr className="bg-yellow-500/10">
                      <td className="border border-white/10 px-3 py-2 font-bold">C3</td>
                      <td className="border border-white/10 px-3 py-2">Improvement recommended</td>
                      <td className="border border-white/10 px-3 py-2">Action at discretion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">FI</td>
                      <td className="border border-white/10 px-3 py-2">Further investigation</td>
                      <td className="border border-white/10 px-3 py-2">Investigation required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Retention requirement:</strong> BS 7671 Regulation 132.13 requires certificates and test results to be retained for the working life of the installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: O&M Manuals */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Operation and Maintenance Manuals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Operation and Maintenance (O&M) manuals provide comprehensive information for the safe
              operation, maintenance, and modification of electrical installations throughout their
              service life. They form a key part of the CDM Health and Safety File.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">O&M Manual Structure</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium mb-1">Volume 1 - Operating Information</p>
                  <ul className="text-white/70 space-y-1">
                    <li>• System descriptions and schematics</li>
                    <li>• Operating procedures</li>
                    <li>• Start-up/shutdown sequences</li>
                    <li>• Emergency procedures</li>
                    <li>• Contact details for support</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Volume 2 - Maintenance Information</p>
                  <ul className="text-white/70 space-y-1">
                    <li>• Maintenance schedules and frequencies</li>
                    <li>• Equipment data sheets</li>
                    <li>• Spare parts lists and suppliers</li>
                    <li>• Test certificates and records</li>
                    <li>• As-built drawings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">O&M Manual Contents Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Introduction:</strong> Project details, installation summary, document register</li>
                <li className="pl-1"><strong>System descriptions:</strong> Written description of each system with operating parameters</li>
                <li className="pl-1"><strong>Schematics:</strong> Single line diagrams, control schematics, wiring diagrams</li>
                <li className="pl-1"><strong>Equipment schedules:</strong> All installed equipment with make, model, ratings</li>
                <li className="pl-1"><strong>Manufacturer literature:</strong> Data sheets, installation instructions, warranty details</li>
                <li className="pl-1"><strong>Maintenance schedules:</strong> PPM requirements with frequencies and procedures</li>
                <li className="pl-1"><strong>Spare parts:</strong> Recommended spares with part numbers and suppliers</li>
                <li className="pl-1"><strong>Test certificates:</strong> EIC, commissioning records, witness test reports</li>
                <li className="pl-1"><strong>As-built drawings:</strong> Final installation drawings including all variations</li>
                <li className="pl-1"><strong>Training records:</strong> Evidence of handover training provided</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Schedule Example - Distribution Boards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Task</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Competence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Visual inspection</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Skilled person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal imaging survey</td>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Competent person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Termination tightness check</td>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Competent person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD functional test</td>
                      <td className="border border-white/10 px-3 py-2">Quarterly</td>
                      <td className="border border-white/10 px-3 py-2">Instructed person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Full periodic inspection</td>
                      <td className="border border-white/10 px-3 py-2">5 years</td>
                      <td className="border border-white/10 px-3 py-2">Competent person</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>CDM requirement:</strong> O&M manuals form part of the Health and Safety File and must be retained for the life of the building. They should be updated whenever significant modifications are made.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: As-Built Drawings and Handover */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            As-Built Drawings and Handover Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As-built drawings record the installation exactly as constructed, incorporating all
              variations from the original design. Combined with other documentation, they form a
              comprehensive handover package essential for building operation and future works.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">As-Built Drawing Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Accuracy:</strong> Must reflect actual installed positions, routes, and equipment</li>
                <li className="pl-1"><strong>Variations:</strong> All site instructions, RFIs, and changes incorporated</li>
                <li className="pl-1"><strong>Cable routes:</strong> Actual containment routes with measurements from datums</li>
                <li className="pl-1"><strong>Equipment locations:</strong> Precise positions of all distribution boards, switches, accessories</li>
                <li className="pl-1"><strong>Hidden services:</strong> Accurate recording of concealed cables and equipment</li>
                <li className="pl-1"><strong>Revision status:</strong> Clearly marked as "As-Built" with final revision number</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Types Required</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Drawing Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General arrangement</td>
                      <td className="border border-white/10 px-3 py-2">Equipment positions, containment routes</td>
                      <td className="border border-white/10 px-3 py-2">1:50 or 1:100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single line diagrams</td>
                      <td className="border border-white/10 px-3 py-2">Distribution schematic</td>
                      <td className="border border-white/10 px-3 py-2">NTS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting layouts</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire positions, switching zones</td>
                      <td className="border border-white/10 px-3 py-2">1:50 or 1:100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power layouts</td>
                      <td className="border border-white/10 px-3 py-2">Socket and FCU positions</td>
                      <td className="border border-white/10 px-3 py-2">1:50 or 1:100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment layouts</td>
                      <td className="border border-white/10 px-3 py-2">Cable tray, trunking, conduit routes</td>
                      <td className="border border-white/10 px-3 py-2">1:50 or 1:100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wiring diagrams</td>
                      <td className="border border-white/10 px-3 py-2">Panel internal wiring, control circuits</td>
                      <td className="border border-white/10 px-3 py-2">NTS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External works</td>
                      <td className="border border-white/10 px-3 py-2">Underground routes, depths, marker posts</td>
                      <td className="border border-white/10 px-3 py-2">1:100 or 1:200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Documentation Package Checklist</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium mb-1">Certificates and Records</p>
                  <ul className="text-white/80 space-y-1">
                    <li>☐ Electrical Installation Certificate(s)</li>
                    <li>☐ Schedule of Test Results</li>
                    <li>☐ Commissioning records</li>
                    <li>☐ Witness test records</li>
                    <li>☐ Fire alarm certificate</li>
                    <li>☐ Emergency lighting certificate</li>
                    <li>☐ PAT test records (if applicable)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Documentation</p>
                  <ul className="text-white/80 space-y-1">
                    <li>☐ O&M manuals (operation)</li>
                    <li>☐ O&M manuals (maintenance)</li>
                    <li>☐ As-built drawings (full set)</li>
                    <li>☐ Equipment warranties</li>
                    <li>☐ Spare parts and keys</li>
                    <li>☐ Training sign-off sheets</li>
                    <li>☐ Snagging completion records</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Document Retention Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retention Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation/Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EIC and test results</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                      <td className="border border-white/10 px-3 py-2">BS 7671 Reg. 132.13</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Health and Safety File</td>
                      <td className="border border-white/10 px-3 py-2">Life of building</td>
                      <td className="border border-white/10 px-3 py-2">CDM 2015 Reg. 12</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">O&M manuals</td>
                      <td className="border border-white/10 px-3 py-2">Life of building</td>
                      <td className="border border-white/10 px-3 py-2">CDM 2015 / Contract</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">As-built drawings</td>
                      <td className="border border-white/10 px-3 py-2">Life of building</td>
                      <td className="border border-white/10 px-3 py-2">Good practice</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EICR reports</td>
                      <td className="border border-white/10 px-3 py-2">Until superseded + archive</td>
                      <td className="border border-white/10 px-3 py-2">BS 7671</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>BIM requirement:</strong> On larger projects, as-built information is increasingly required as updated BIM models (COBie data) rather than traditional 2D drawings. The model becomes the authoritative record of the installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Distribution Schedule Preparation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Complete a distribution schedule for a 12-way TP+N board serving office lighting and power.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 overflow-x-auto">
                <p className="text-white/60">Distribution Board: DB-L1-01 | Location: First Floor Riser</p>
                <p className="text-white/60">Supply: 100A TP+N from MSB via 25mm² 4c SWA</p>
                <p className="mt-2">Circuit Schedule:</p>
                <p>Cct | Description          | Device      | Cable      | Ib   | RCD</p>
                <p>----|---------------------|-------------|------------|------|--------</p>
                <p>1   | Lighting Zone A     | B10 SP      | 1.5mm² 3c | 6.2A | 30mA A</p>
                <p>2   | Lighting Zone B     | B10 SP      | 1.5mm² 3c | 5.8A | 30mA A</p>
                <p>3   | Emergency Lighting  | B6 SP       | 1.5mm² 3c | 2.1A | 30mA A</p>
                <p>4   | Small Power Ring 1  | B32 SP      | 2.5mm² 3c | 20A  | 30mA A</p>
                <p>5   | Small Power Ring 2  | B32 SP      | 2.5mm² 3c | 20A  | 30mA A</p>
                <p>6   | Server Room AC      | B20 DP      | 4.0mm² 3c | 16A  | -</p>
                <p className="mt-2 text-green-400">Note: All circuits comply with BS 7671 requirements</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: EICR Observation Recording</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Record observations from a periodic inspection with appropriate classification codes.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Schedule of Observations:</p>
                <p className="mt-2">Obs | Location        | Observation                      | Code</p>
                <p>----|-----------------|----------------------------------|------</p>
                <p>1   | DB-G01          | Missing circuit chart            | C3</p>
                <p>2   | Kitchen         | Unprotected cable at cooker      | <span className="text-red-400">C1</span></p>
                <p>3   | WC              | No supplementary bonding         | <span className="text-orange-400">C2</span></p>
                <p>4   | External        | IP rating inadequate for location| <span className="text-orange-400">C2</span></p>
                <p>5   | Throughout      | No RCD protection to socket outlets| <span className="text-orange-400">C2</span></p>
                <p>6   | Intake          | Meter tails undersized for load  | FI</p>
                <p className="mt-2 text-white/60">Overall condition: Unsatisfactory</p>
                <p className="text-white/60">C1 requires immediate attention - client notified</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: O&M Manual Index Structure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop an index structure for electrical O&M manuals for a commercial building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Volume E - Electrical Installation O&M Manual</p>
                <p className="mt-2">Section | Content</p>
                <p>--------|------------------------------------------</p>
                <p>E.1     | Introduction and System Overview</p>
                <p>E.2     | Single Line Diagrams</p>
                <p>E.3     | Distribution Schedules</p>
                <p>E.4     | LV Switchgear - Operation & Maintenance</p>
                <p>E.5     | Distribution Boards - Schedules & Data</p>
                <p>E.6     | Lighting Systems - Control & Operation</p>
                <p>E.7     | Emergency Lighting - Test Procedures</p>
                <p>E.8     | Fire Alarm System - Operation & Test</p>
                <p>E.9     | UPS System - Operation & Maintenance</p>
                <p>E.10    | Generator - Operation & Maintenance</p>
                <p>E.11    | Manufacturer Data Sheets</p>
                <p>E.12    | Spare Parts Lists</p>
                <p>E.13    | Test Certificates (EIC, Schedules)</p>
                <p>E.14    | Commissioning Records</p>
                <p>E.15    | As-Built Drawing Register</p>
                <p className="mt-2 text-green-400">Format: PDF with searchable index, also BIM COBie data</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Production Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Start documentation early - don't leave until project end</li>
                <li className="pl-1">Record variations and changes as they occur on site</li>
                <li className="pl-1">Use standardised templates for consistency</li>
                <li className="pl-1">Ensure all signatories have appropriate competence</li>
                <li className="pl-1">Cross-reference between documents (drawings to schedules)</li>
                <li className="pl-1">Allow time for client review before formal handover</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Documentation Standards</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">BS 7671: Certification requirements and test schedules</li>
                <li className="pl-1">BS 8536: Briefing for design and construction (soft landings)</li>
                <li className="pl-1">PAS 1192-2: BIM Level 2 requirements</li>
                <li className="pl-1">BSRIA BG 6: Guide to design information</li>
                <li className="pl-1">SFG 20: Maintenance specifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Documentation Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Missing signatures:</strong> All EIC sections must be signed by appropriate persons</li>
                <li className="pl-1"><strong>Incomplete test results:</strong> Every circuit must have recorded values</li>
                <li className="pl-1"><strong>Outdated drawings:</strong> As-built must include all final variations</li>
                <li className="pl-1"><strong>Generic O&M content:</strong> Must be project-specific, not manufacturer templates</li>
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
                <p className="font-medium text-white mb-1">Certificate Types</p>
                <ul className="space-y-0.5">
                  <li>EIC - New installations</li>
                  <li>EICR - Periodic inspection</li>
                  <li>MEIWC - Minor works (no new circuits)</li>
                  <li>All retained for installation life</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">EICR Codes</p>
                <ul className="space-y-0.5">
                  <li>C1 - Danger present (immediate)</li>
                  <li>C2 - Potentially dangerous (urgent)</li>
                  <li>C3 - Improvement recommended</li>
                  <li>FI - Further investigation required</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Handover Package</p>
                <ul className="space-y-0.5">
                  <li>EIC and test results</li>
                  <li>O&M manuals (operation + maintenance)</li>
                  <li>As-built drawings (full set)</li>
                  <li>Commissioning records</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Retention Periods</p>
                <ul className="space-y-0.5">
                  <li>Certificates - Life of installation</li>
                  <li>H&S File - Life of building</li>
                  <li>O&M manuals - Life of building</li>
                  <li>As-built drawings - Life of building</li>
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

        {/* Navigation - Back button only (last subsection) */}
        <nav className="flex justify-start pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section6_6;
