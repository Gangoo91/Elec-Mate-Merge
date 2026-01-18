/**
 * Level 3 Module 5 Section 4.3 - Confirming Compliance with Design Specification
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Confirming Compliance with Design Specification - Level 3 Module 5 Section 4.3";
const DESCRIPTION = "Verify electrical installations meet original design specifications including cable sizes, protective device ratings, earthing arrangements and circuit configurations per BS 7671.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is it important to verify the installation matches the design specification?",
    options: [
      "Only for aesthetic reasons",
      "To ensure safety, compliance with BS 7671, and that protection schemes operate correctly",
      "Only for insurance purposes",
      "Only for large installations"
    ],
    correctIndex: 1,
    explanation: "The design specification ensures cables, protective devices and earthing arrangements work together to provide adequate protection. Deviations may compromise safety and circuit protection. Verification confirms the designed protection scheme is achieved."
  },
  {
    id: "check-2",
    question: "What should be done if the installed cable size differs from the design specification?",
    options: [
      "Accept it if the cable is bigger",
      "Document the deviation and verify the design calculations still apply or obtain designer approval",
      "Ignore small differences",
      "Always replace with the specified size"
    ],
    correctIndex: 1,
    explanation: "Any deviation from specification must be documented. A larger cable may be acceptable but still needs verification. A smaller cable could be unsafe. Changes should be approved by the designer and documented in as-built records."
  },
  {
    id: "check-3",
    question: "Which document should detail the designed protective device types and ratings for each circuit?",
    options: [
      "The electricity bill",
      "The design specification, distribution board schedule or single line diagram",
      "The building regulations document",
      "The insurance policy"
    ],
    correctIndex: 1,
    explanation: "The design specification, single line diagram (SLD) or distribution board schedule should detail each circuit's protective device type and rating. These must be checked against the actual installation during verification."
  },
  {
    id: "check-4",
    question: "What must be verified regarding earthing arrangements during design compliance checking?",
    options: [
      "Only that earth wires are green/yellow",
      "That earthing system type (TN-S, TN-C-S, TT) and conductor sizes match the design",
      "Only the location of the earth connection",
      "Nothing - earthing is not part of design compliance"
    ],
    correctIndex: 1,
    explanation: "The earthing system type affects many aspects of the installation design. Conductor sizes for main earthing, bonding and circuit protective conductors must all match the design to ensure fault currents can be safely carried."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What document typically provides the detailed circuit-by-circuit specification?",
    options: [
      "The electricity meter data",
      "Distribution board schedule or circuit schedule",
      "The test certificate only",
      "The manufacturer's brochure"
    ],
    correctAnswer: 1,
    explanation: "The distribution board schedule or circuit schedule lists each circuit with its reference number, description, protective device type/rating, cable size, and route. This is the key document for verifying design compliance."
  },
  {
    id: 2,
    question: "If the design specifies a Type B MCB but a Type C is installed, what should happen?",
    options: [
      "Accept it - Type C is 'better'",
      "Document the deviation and verify if Type C is suitable for the circuit design",
      "Remove the Type C immediately",
      "It doesn't matter"
    ],
    correctAnswer: 1,
    explanation: "Type B and C have different tripping characteristics. Type C may not provide adequate protection for the circuit (won't trip fast enough for cables/loads designed for Type B). The change must be assessed and either approved with recalculation or corrected."
  },
  {
    id: 3,
    question: "What should be checked about the external earth fault loop impedance (Ze)?",
    options: [
      "Only that it's connected",
      "That the measured Ze is equal to or less than the design assumption",
      "Only the colour of the conductor",
      "That it's greater than the design"
    ],
    correctAnswer: 1,
    explanation: "The design assumes a maximum Ze value. If measured Ze exceeds this, the designed Zs values and disconnection times may not be achieved. Measured Ze should be equal to or less than the design assumption."
  },
  {
    id: 4,
    question: "A design specifies 4mm2 cable for a circuit but 2.5mm2 is installed. What is the correct action?",
    options: [
      "Accept if the circuit works",
      "Replace with the correct 4mm2 cable or obtain designer re-approval",
      "Add another 2.5mm2 in parallel",
      "Just update the paperwork"
    ],
    correctAnswer: 1,
    explanation: "Installing undersized cable is a serious deviation. The cable may not handle the design current, may overheat, and protective device coordination is compromised. It must be replaced or the designer must reassess and approve the change."
  },
  {
    id: 5,
    question: "How should cable routes be verified against the design?",
    options: [
      "Visual check that cables go from A to B",
      "Verify routing matches design, especially segregation from other services",
      "Only check the cable ends",
      "Routes don't need checking"
    ],
    correctAnswer: 1,
    explanation: "Cable routes affect voltage drop, thermal performance, and EMC. Longer routes than designed may exceed voltage drop limits. Routing near heat sources or without proper segregation from other services can cause problems."
  },
  {
    id: 6,
    question: "What should be verified about RCD protection relative to the design?",
    options: [
      "Only that RCDs are present",
      "That RCD ratings, types and circuit coverage match design requirements",
      "Only the RCD brand",
      "Nothing specific"
    ],
    correctAnswer: 1,
    explanation: "The design specifies which circuits need RCD protection, what sensitivity (30mA, 100mA, 300mA), and what type (AC, A, F). These must match as they affect both safety and discrimination between devices."
  },
  {
    id: 7,
    question: "Who is responsible for approving deviations from the design specification?",
    options: [
      "The electrician can approve any changes",
      "The designer or a competent person who can verify the change maintains safety and compliance",
      "The client always",
      "No approval needed for minor changes"
    ],
    correctAnswer: 1,
    explanation: "The designer (or similarly competent person) must approve deviations because they understand the design rationale and can assess if changes affect safety or compliance. Changes should be documented in writing."
  },
  {
    id: 8,
    question: "What is an 'as-built' drawing?",
    options: [
      "The original design drawing",
      "A drawing updated to show what was actually installed, including any approved changes",
      "A drawing of how the building looks",
      "The manufacturer's standard drawing"
    ],
    correctAnswer: 1,
    explanation: "As-built drawings show the actual installation, updated from the design to reflect approved changes and variations. They form part of the handover documentation and are essential for future maintenance and modifications."
  },
  {
    id: 9,
    question: "Why must protective device discrimination be verified against design?",
    options: [
      "To ensure all MCBs are the same brand",
      "To confirm that the device nearest the fault operates first, as designed",
      "Only for aesthetics",
      "It doesn't need checking"
    ],
    correctAnswer: 1,
    explanation: "Discrimination (selectivity) ensures only the device nearest a fault trips, minimizing disruption. The design relies on specific device combinations and settings. Installing different devices may defeat the discrimination scheme."
  },
  {
    id: 10,
    question: "What should be verified about voltage drop calculations?",
    options: [
      "Nothing - voltage drop is automatic",
      "That actual cable lengths and sizes achieve the design voltage drop limits",
      "Only check at the origin",
      "Voltage drop doesn't relate to design compliance"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop depends on cable length, size, current and power factor. The design assumes certain values. Longer actual routes or different cable sizes may cause voltage drop to exceed the 5% limit for socket outlets or 3% for lighting."
  },
  {
    id: 11,
    question: "During verification, you find the design specifies TN-S but the supply is TN-C-S. What action is needed?",
    options: [
      "No action - they're similar",
      "Alert the designer - the earthing arrangement affects design calculations",
      "Just change the paperwork",
      "This cannot happen"
    ],
    correctAnswer: 1,
    explanation: "TN-S and TN-C-S have different Ze values and characteristics. The design calculations for protective conductor sizes, Zs limits, and main bonding may differ. The designer must be informed to verify the installation remains safe and compliant."
  },
  {
    id: 12,
    question: "What documentation should be checked to verify circuit descriptions match the design?",
    options: [
      "None - descriptions don't matter",
      "Design circuit schedule against actual DB schedule and circuit labelling",
      "Only the meter cupboard label",
      "The building's general maintenance log"
    ],
    correctAnswer: 1,
    explanation: "Circuit descriptions ensure correct identification for future maintenance and fault finding. They should match between design, installed DB schedule, and circuit labelling. Mismatched or missing descriptions cause confusion and potential safety issues."
  }
];

const faqs = [
  {
    question: "What if no design specification was provided?",
    answer: "For notifiable work, a design should exist even if informal. For minor works, the installer may have acted as designer. Document what was intended. For alterations, the existing installation characteristics inform the 'design'. The certifier should record design criteria on the certificate."
  },
  {
    question: "How do I handle multiple deviations from specification?",
    answer: "Document each deviation separately. Assess cumulative effect - multiple small changes may have compound impact. Seek designer review if deviations are significant. Consider whether the installation should be re-designed rather than accepting many variations."
  },
  {
    question: "Can I approve my own design changes as the installer?",
    answer: "If you are competent and acting as both designer and installer, you can approve changes but must document your reasoning. For larger or complex installations where a separate designer was involved, they should approve changes. Always document decisions."
  },
  {
    question: "What if the client asked for changes that deviate from design?",
    answer: "Client-requested changes are still deviations requiring proper assessment. Explain any safety or compliance implications. Document the request and your assessment. If changes cannot be made safely, advise the client and refuse to implement them."
  },
  {
    question: "Should I compare test results with design predictions?",
    answer: "Yes - compare measured values (Zs, voltage drop, Ipf) with design predictions. Values better than predicted confirm design margins. Values worse than predicted need investigation - the installation may not achieve intended protection levels."
  },
  {
    question: "What's the difference between design compliance and BS 7671 compliance?",
    answer: "BS 7671 sets minimum standards. A design may exceed these standards for various reasons (client requirements, future-proofing, specific risks). Design compliance verifies the specific design intent was achieved, which should meet or exceed BS 7671."
  }
];

const Level3Module5Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Confirming Compliance with Design Specification
          </h1>
          <p className="text-white/80">
            Verifying installations match designed cable sizes, protection and earthing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Why:</strong> Design ensures protection schemes work</li>
              <li><strong>Check:</strong> Cable sizes, device ratings, earthing type</li>
              <li><strong>Deviations:</strong> Must be documented and approved</li>
              <li><strong>Record:</strong> As-built drawings with all changes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Design drawings, circuit schedules, SLD</li>
              <li><strong>Use:</strong> Compare actual installation point-by-point</li>
              <li><strong>Apply:</strong> Document all deviations with approval</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand why design compliance verification is essential",
              "Compare installed work against design specifications",
              "Identify and document deviations from design",
              "Understand the approval process for design changes",
              "Verify protective device coordination matches design",
              "Complete as-built documentation correctly"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Importance of Design Compliance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Importance of Design Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical installation design is not arbitrary - every specification is calculated to ensure safety. Cable sizes are selected to carry current without overheating, protective devices are chosen to disconnect within safe times, and earthing conductors are sized to handle fault currents. Deviating from design can compromise these carefully calculated protection schemes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design elements that must be verified:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable sizes:</strong> Current carrying capacity, voltage drop, fault current</li>
                <li><strong>Protective devices:</strong> Type, rating, breaking capacity, characteristics</li>
                <li><strong>Earthing system:</strong> Type (TN-S, TN-C-S, TT), conductor sizes</li>
                <li><strong>RCD protection:</strong> Ratings, types, circuit coverage</li>
                <li><strong>Cable routes:</strong> Length, grouping, installation method</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Safety</p>
                <p className="text-white/90 text-xs">Protection schemes sized for specific conditions</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Compliance</p>
                <p className="text-white/90 text-xs">BS 7671 compliance depends on coordinated design</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Performance</p>
                <p className="text-white/90 text-xs">Voltage drop, discrimination, selectivity</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Installing 'bigger' is not always safe. A larger protective device may not protect smaller cables. Design elements work together - changing one may affect others.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Verification Process */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Verification Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Design compliance verification is a systematic comparison between what was specified and what was installed. Work through the design documentation item by item, checking each element against the actual installation. Document your findings as you go.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Documents to Review</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Single line diagram (SLD)</li>
                  <li>Distribution board schedules</li>
                  <li>Circuit schedules</li>
                  <li>Cable schedule</li>
                  <li>Design calculations</li>
                  <li>General arrangement drawings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Elements to Check</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Actual cable sizes installed</li>
                  <li>Protective device types and ratings</li>
                  <li>Earthing system and conductor sizes</li>
                  <li>RCD specifications</li>
                  <li>Cable routes and installation methods</li>
                  <li>Equipment locations</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step-by-step verification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Gather all design documents and familiarize yourself with them</li>
                <li><strong>Step 2:</strong> Work circuit by circuit, comparing specification to installation</li>
                <li><strong>Step 3:</strong> Record what matches and what differs</li>
                <li><strong>Step 4:</strong> For any deviations, assess impact and seek approval if needed</li>
                <li><strong>Step 5:</strong> Update as-built drawings with all approved changes</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Tip:</strong> Use a checklist format matching your design documents. Tick off items as verified and clearly mark any deviations for follow-up.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Handling Deviations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Handling Deviations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Deviations from design are common on site - materials unavailable, site conditions differ, client requests changes. The key is to identify deviations, assess their impact, obtain approval where needed, and document everything properly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of deviations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Minor:</strong> Different manufacturer, same specification - usually acceptable</li>
                <li><strong>Substitution:</strong> Different but equivalent product - needs verification</li>
                <li><strong>Uprating:</strong> Larger cable/device than specified - may be acceptable</li>
                <li><strong>Downrating:</strong> Smaller than specified - serious, needs investigation</li>
                <li><strong>Different type:</strong> e.g., Type B MCB replaced with Type C - needs assessment</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Acceptable with Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Equivalent product different brand</li>
                  <li>Larger cable than specified</li>
                  <li>Minor route variations</li>
                  <li>Changes within design safety margins</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Require Designer Approval</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Smaller cable than specified</li>
                  <li>Different protective device type</li>
                  <li>Changes to earthing system</li>
                  <li>Significant route changes</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Never 'sign off' a known deviation without assessment and approval. Undocumented changes cause problems for future maintenance and may be unsafe.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: As-Built Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            As-Built Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As-built documentation records what was actually installed, including all approved changes from the original design. This is essential for future maintenance, alterations, and periodic inspection. Handover should include accurate as-built records.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">As-built documentation should include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Updated drawings:</strong> Showing actual routes, equipment locations, and configurations</li>
                <li><strong>Revised schedules:</strong> Circuit schedules reflecting actual installations</li>
                <li><strong>Deviation records:</strong> List of changes from design with approvals</li>
                <li><strong>Test results:</strong> Including any variations from predicted values</li>
                <li><strong>Equipment datasheets:</strong> For installed equipment (may differ from specified)</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Mark-up Method</p>
                <p className="text-white/90 text-xs">Red-line changes on original drawings</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">CAD Update</p>
                <p className="text-white/90 text-xs">Modify original CAD files with changes</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Revision Notes</p>
                <p className="text-white/90 text-xs">Document all changes with dates</p>
              </div>
            </div>

            <p>
              As-built documentation is particularly important for concealed installations. Once cables are buried or behind walls, accurate records are the only way to know what is there. Future electricians rely on these records being correct.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> BS 7671 Regulation 514.9.1 requires diagrams, charts or tables to be provided showing circuit details including points served, conductor sizes, protective device types and ratings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Verification Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cable sizes match schedule for each circuit</li>
                <li>MCB/RCBO types and ratings match design</li>
                <li>Earthing conductor sizes correct for system type</li>
                <li>Main bonding conductors correctly sized</li>
                <li>RCD ratings and coverage match specification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep deviation records with reasons and approvals</li>
                <li>Update distribution board schedules with actual contents</li>
                <li>Photograph installed equipment and labels</li>
                <li>Record any installation method changes (clips vs containment)</li>
                <li>Note any verbal approvals in writing at earliest opportunity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming bigger is better:</strong> Larger devices may not protect smaller cables</li>
                <li><strong>Ignoring deviations:</strong> Undocumented changes cause future problems</li>
                <li><strong>Self-approving major changes:</strong> Designer should assess significant deviations</li>
                <li><strong>Poor records:</strong> Inadequate as-built documentation</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Design Documents</p>
                <ul className="space-y-0.5">
                  <li>Single line diagram (SLD)</li>
                  <li>Distribution board schedule</li>
                  <li>Circuit schedule/cable schedule</li>
                  <li>Design calculations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulation References</p>
                <ul className="space-y-0.5">
                  <li>514.9.1 - Documentation requirements</li>
                  <li>Part 3 - Assessment of general characteristics</li>
                  <li>Part 5 - Selection and erection</li>
                  <li>Part 6 - Verification requirements</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4-4-4">
              Next: Client Handover
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section4_3;
