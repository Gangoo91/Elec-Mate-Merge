import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Initial Visual Inspection - Module 8 Section 1";
const DESCRIPTION = "Master visual inspection techniques to identify defects, damage, and non-compliance before performing electrical tests.";

const quickCheckQuestions = [
  {
    id: "visual-first",
    question: "When should visual inspection be performed?",
    options: [
      "After all electrical tests are complete",
      "Before energising and before testing",
      "Only if defects are suspected",
      "Only during periodic inspection"
    ],
    correctIndex: 1,
    explanation: "Visual inspection must be performed before energising the installation and before electrical testing. This identifies obvious hazards and defects that could make testing dangerous."
  },
  {
    id: "defect-percentage",
    question: "What percentage of defects can visual inspection typically identify?",
    options: [
      "About 10-20%",
      "About 30-40%",
      "About 60-70%",
      "About 90-100%"
    ],
    correctIndex: 2,
    explanation: "Industry estimates suggest 60-70% of defects can be identified through careful visual inspection alone. This highlights the importance of thorough visual examination before testing."
  },
  {
    id: "exposed-conductor",
    question: "An exposed conductor is found during visual inspection. What action is required?",
    options: [
      "Continue testing and note it later",
      "Do not energise - rectify before proceeding",
      "It's acceptable if the conductor is small",
      "Apply insulation tape and continue"
    ],
    correctIndex: 1,
    explanation: "Exposed live conductors present immediate danger. The installation must not be energised until the defect is rectified. This is a fundamental safety requirement."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When should visual inspection be performed during initial verification?",
    options: [
      "After all electrical tests are complete",
      "Before energising and before testing",
      "Only if defects are suspected",
      "Only during periodic inspection"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection must be performed before energising the installation and before electrical testing. This identifies obvious hazards and defects that could make testing dangerous."
  },
  {
    id: 2,
    question: "What percentage of defects can visual inspection typically identify?",
    options: [
      "About 10-20%",
      "About 30-40%",
      "About 60-70%",
      "About 90-100%"
    ],
    correctAnswer: 2,
    explanation: "Industry estimates suggest 60-70% of defects can be identified through careful visual inspection alone. This highlights the importance of thorough visual examination before testing."
  },
  {
    id: 3,
    question: "During visual inspection, which of the following should be checked?",
    options: [
      "Earth fault loop impedance values",
      "Correct connection of conductors and condition of insulation",
      "RCD trip times",
      "Prospective fault current"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection checks physical conditions: conductor connections, insulation condition, cable routing, equipment damage, labelling, and compliance with requirements. Electrical values are checked during testing."
  },
  {
    id: 4,
    question: "An exposed conductor is found during visual inspection. What action is required?",
    options: [
      "Continue testing and note it later",
      "Do not energise - rectify before proceeding",
      "It's acceptable if the conductor is small",
      "Apply insulation tape and continue"
    ],
    correctAnswer: 1,
    explanation: "Exposed live conductors present immediate danger. The installation must not be energised until the defect is rectified. This is a fundamental safety requirement."
  },
  {
    id: 5,
    question: "Which regulation requires visual inspection to be carried out?",
    options: [
      "Regulation 411.1",
      "Regulation 612.1 (Chapter 61 Section 611)",
      "Regulation 721.1",
      "Regulation 434.1"
    ],
    correctAnswer: 1,
    explanation: "Chapter 61 requires inspection and testing. Section 611 specifically covers visual inspection requirements, listing items that must be verified before testing."
  },
  {
    id: 6,
    question: "What should be verified regarding cable selection during visual inspection?",
    options: [
      "The cable manufacturer",
      "Cables are suitable for their environmental conditions and current-carrying capacity",
      "The cable colour only",
      "Cable price"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection verifies cables are suitable for their installed conditions (temperature, moisture, mechanical protection) and appropriately sized for their protective device ratings."
  },
  {
    id: 7,
    question: "Thermal damage to an accessory faceplate indicates:",
    options: [
      "Normal wear from long use",
      "Possible loose connection causing overheating",
      "The wrong type of plastic",
      "Exposure to sunlight"
    ],
    correctAnswer: 1,
    explanation: "Thermal damage (discolouration, melting, burning) around terminals indicates overheating, usually from loose connections causing high-resistance joints. This is a serious defect requiring investigation."
  },
  {
    id: 8,
    question: "During visual inspection of a consumer unit, what IP rating aspects should be checked?",
    options: [
      "Only that it looks weatherproof",
      "All entries are sealed, blanks fitted, no damage compromising the enclosure",
      "Just that the door closes",
      "IP rating is only checked outdoors"
    ],
    correctAnswer: 1,
    explanation: "IP rating protection is verified by checking: all cable entries properly sealed, unused entries blanked, covers intact, no holes or damage that would allow ingress of moisture or foreign objects."
  },
  {
    id: 9,
    question: "What does 'adequate access and working space' mean for inspection purposes?",
    options: [
      "The inspector can reach the installation",
      "Sufficient space for safe operation and maintenance as required by regulations",
      "Any amount of space is acceptable",
      "Only applies to industrial installations"
    ],
    correctAnswer: 1,
    explanation: "Regulation 132.12 requires adequate space for safe operation, inspection, testing, and maintenance. This includes space to operate switchgear safely and perform future work."
  },
  {
    id: 10,
    question: "If an accessory is damaged but still functional, what should be recorded?",
    options: [
      "Nothing - it works fine",
      "The defect and appropriate observation code (C2 or C3)",
      "Just a verbal warning to the client",
      "Only record if it completely fails"
    ],
    correctAnswer: 1,
    explanation: "All defects should be recorded with appropriate codes. A damaged but functional accessory is typically C2 (potentially dangerous) or C3 (improvement recommended) depending on the nature of damage."
  }
];

const faqs = [
  {
    question: "Why is visual inspection performed before testing?",
    answer: "Visual inspection identifies obvious hazards (exposed conductors, damage, incorrect wiring) that could make energising or testing dangerous. It also identifies issues that wouldn't be detected by electrical tests alone, such as incorrect cable types or inadequate mechanical protection."
  },
  {
    question: "What access do I need for visual inspection?",
    answer: "Visual inspection requires access to all parts of the installation where practically possible. This includes consumer units, distribution boards, junction boxes, accessories, and anywhere that can be accessed without damage. Limitations should be recorded."
  },
  {
    question: "Can I skip visual inspection if the installation looks fine?",
    answer: "No. Visual inspection is a mandatory part of initial verification and periodic inspection. Many serious defects are not obvious at first glance. A systematic approach ensures all aspects are checked regardless of initial appearance."
  },
  {
    question: "What if I can't access certain parts of the installation?",
    answer: "Record any limitations in the inspection schedule and on the certificate. For EICR, areas that cannot be inspected should be noted and may affect the overall assessment. The client should be informed of any limitations."
  },
  {
    question: "Should I remove every accessory faceplate during inspection?",
    answer: "During initial verification, yes - all connections should be verified. During periodic inspection, a representative sample may be acceptable, with any limitations recorded. However, any accessories showing signs of damage should always be opened."
  },
  {
    question: "How do I record visual inspection results?",
    answer: "Results are recorded on the Schedule of Inspections. Each item is marked as satisfactory, not applicable (N/A), or with a limitation (LIM). Defects are detailed in the observations section with appropriate C1, C2, C3, or FI codes."
  }
];

const InspectionTestingModule8Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Initial Visual Inspection
          </h1>
          <p className="text-white/80">
            Perform thorough visual examination to identify defects before electrical testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>When:</strong> FIRST, before any testing or energising</li>
              <li><strong>Finds:</strong> 60-70% of all defects</li>
              <li><strong>Regulation:</strong> BS 7671 Chapter 61, Section 611</li>
              <li><strong>If danger found:</strong> Do NOT energise</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Actions</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Check:</strong> Connections, insulation, protection</li>
              <li><strong>Record:</strong> Schedule of Inspections</li>
              <li><strong>Code:</strong> C1, C2, C3 as appropriate</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and importance of visual inspection",
              "Identify what to look for during inspection",
              "Follow a systematic inspection approach",
              "Recognise common defects and hazards",
              "Apply appropriate observation codes",
              "Document visual inspection findings"
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

        {/* Section 1: Purpose of Visual Inspection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of Visual Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection is the critical first step in verifying an electrical installation. Performed before energising and testing, it identifies hazards that could make testing dangerous and defects that electrical tests alone cannot detect.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Visual Inspection First?</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identifies dangers before energising</li>
                <li>Reveals defects tests won't find (wrong cable type, routing issues)</li>
                <li>Catches approximately 60-70% of installation defects</li>
                <li>Required by BS 7671 Chapter 61</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Must be completed before the installation is energised</li>
                <li>Results recorded on Schedule of Inspections</li>
                <li>Identifies both safety hazards and regulation non-compliance</li>
                <li>Professional systematic approach essential</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: What to Inspect */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What to Inspect
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Section 611 provides a comprehensive list of items to inspect. Key areas include:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conductors and Connections</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct conductor identification (colours/marking)</li>
                  <li>Connections properly made and secure</li>
                  <li>No damage to conductor insulation</li>
                  <li>Correct CSA for circuit requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protective Measures</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Basic protection (insulation, enclosures, barriers)</li>
                  <li>Fault protection (earthing arrangements)</li>
                  <li>Protective devices correctly selected and installed</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment and Accessories</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>No visible damage or deterioration</li>
                <li>Suitable for environmental conditions</li>
                <li>Correctly installed and accessible</li>
                <li>IP ratings maintained</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Common Defects to Identify */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Defects to Identify
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Common defects found during visual inspection and their classification codes:
            </p>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-red-500/30">
                <p className="font-medium text-red-400 mb-1">C1 - Danger Present</p>
                <p className="text-white/90 text-xs">Exposed live conductors, fire hazards, immediate shock risk</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-amber-500/30">
                <p className="font-medium text-amber-400 mb-1">C2 - Potentially Dangerous</p>
                <p className="text-white/90 text-xs">Damaged enclosures, missing earths, overloaded circuits</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-blue-500/30">
                <p className="font-medium text-blue-400 mb-1">C3 - Improvement Recommended</p>
                <p className="text-white/90 text-xs">Outdated equipment, lack of RCD protection where now required</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> C1 or C2 findings require immediate action - the installation must not be energised until dangerous conditions are rectified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Systematic Approach */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Systematic Approach
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A systematic approach ensures nothing is missed. Work through the installation logically:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Sequence</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1.</strong> Intake and main earthing arrangements</li>
                <li><strong>2.</strong> Consumer unit / distribution boards</li>
                <li><strong>3.</strong> Fixed wiring and cable routes</li>
                <li><strong>4.</strong> Accessories - sockets, switches, FCUs</li>
                <li><strong>5.</strong> Fixed equipment and luminaires</li>
                <li><strong>6.</strong> Special locations (bathrooms, outdoor)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Tip:</strong> Start at the intake because the supply and main earthing arrangements affect the entire installation.
            </p>
          </div>
        </section>

        {/* Section 5: Signs of Damage and Deterioration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Signs of Damage and Deterioration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Look for visible signs that indicate damage, overheating, or deterioration:
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Damage Signs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Discolouration around terminals</li>
                  <li>Melted or deformed plastic</li>
                  <li>Smell of burning or burnt residue</li>
                  <li>Damaged or brittle cable insulation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Damage Signs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cracked or broken enclosures</li>
                  <li>Exposed or damaged cables</li>
                  <li>Missing covers or blanking plates</li>
                  <li>Impact damage to equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Damage</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Corrosion on metalwork</li>
                  <li>Water ingress or staining</li>
                  <li>UV degradation of cables</li>
                  <li>Pest damage</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Recording Inspection Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording Inspection Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection results are recorded on the Schedule of Inspections. Each item is marked:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Codes</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-green-400">✓</strong> — Satisfactory - acceptable condition</li>
                <li><strong className="text-elec-yellow">N/A</strong> — Not applicable to this installation</li>
                <li><strong className="text-amber-400">LIM</strong> — Limitation - could not be inspected</li>
                <li><strong className="text-red-400">C1/C2/C3</strong> — Defect found - see observations</li>
              </ul>
            </div>

            <p>
              All defects must be described in detail in the observations section, with appropriate classification codes.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Good Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use good lighting - a torch is essential for dark corners</li>
                <li>Photograph defects to support your findings</li>
                <li>Work systematically from intake to final circuits</li>
                <li>Check all accessible areas thoroughly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Safety First</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>If you find C1 conditions, don't energise until rectified</li>
                <li>Inform the person responsible immediately of dangers</li>
                <li>Record all limitations where access wasn't possible</li>
                <li>Never rush the visual inspection process</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing</strong> — take time to inspect thoroughly</li>
                <li><strong>Assuming areas are OK</strong> — check everything accessible</li>
                <li><strong>Poor recording</strong> — document all findings clearly</li>
                <li><strong>Ignoring limitations</strong> — always record what couldn't be inspected</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Visual Inspection Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Perform FIRST before testing</li>
                  <li>60-70% defects found visually</li>
                  <li>BS 7671 Chapter 61, Section 611</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Recording</p>
                <ul className="space-y-0.5">
                  <li>Schedule of Inspections</li>
                  <li>C1, C2, C3, FI codes</li>
                  <li>Record all limitations</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-7/section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-8/section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule8Section1;
