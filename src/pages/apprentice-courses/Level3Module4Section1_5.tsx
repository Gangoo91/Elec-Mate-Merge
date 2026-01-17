/**
 * Level 3 Module 4 Section 1.5 - Documentation of Findings
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documentation of Findings - Level 3 Module 4 Section 1.5";
const DESCRIPTION = "Master the essential skills of recording fault diagnosis results, completing certificates and maintaining accurate documentation for electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of documenting fault diagnosis findings?",
    options: [
      "To justify higher charges to the customer",
      "To create a legal record and enable future reference for maintenance",
      "To impress the customer with technical language",
      "To reduce the time spent on site"
    ],
    correctIndex: 1,
    explanation: "Documentation creates a legal record of work performed and findings discovered. It enables future maintenance, helps identify recurring issues, demonstrates compliance with regulations, and provides evidence if disputes arise."
  },
  {
    id: "check-2",
    question: "Which certificate is required after completing fault rectification that adds a new circuit?",
    options: [
      "Minor Electrical Installation Works Certificate",
      "Electrical Installation Condition Report",
      "Electrical Installation Certificate",
      "Portable Appliance Test Certificate"
    ],
    correctIndex: 2,
    explanation: "An Electrical Installation Certificate (EIC) is required when new circuits are introduced. The Minor Works Certificate is only appropriate for additions or alterations that do NOT introduce new circuits - such as adding sockets to an existing circuit or replacing accessories."
  },
  {
    id: "check-3",
    question: "What must accompany an Electrical Installation Certificate to make it valid?",
    options: [
      "A customer satisfaction survey",
      "Schedule of Inspections and Schedule of Test Results",
      "Photographs of all work completed",
      "A detailed cost breakdown"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 712.534.101 states that certificates are only valid when accompanied by the Schedule of Inspections (confirming relevant inspections were carried out) and Schedule(s) of Circuit Details and Test Results. Page numbers and total pages must be indicated."
  },
  {
    id: "check-4",
    question: "When documenting fault findings, what should you record about intermittent faults?",
    options: [
      "Only record faults that are present when you leave site",
      "Record the conditions under which the fault appears and any patterns observed",
      "Avoid mentioning intermittent faults as they cannot be proven",
      "Wait until the fault becomes permanent before recording"
    ],
    correctIndex: 1,
    explanation: "Intermittent faults should be thoroughly documented including when they occur, what conditions trigger them, and any patterns observed. This information is crucial for diagnosis and demonstrates due diligence if the fault recurs after you leave site."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A customer reports their RCD keeps tripping. You diagnose a fault on a ring final circuit and replace a damaged section of cable. Which certificate is required?",
    options: [
      "Electrical Installation Condition Report (EICR)",
      "Minor Electrical Installation Works Certificate",
      "Electrical Installation Certificate with schedules",
      "No certificate - just a receipt for payment"
    ],
    correctAnswer: 1,
    explanation: "Replacing a damaged cable section is an alteration that does not introduce a new circuit, so a Minor Electrical Installation Works Certificate is appropriate. An EIC would be required if you added a new circuit. An EICR is for periodic inspection, not for work completed."
  },
  {
    id: 2,
    question: "According to BS 7671 Regulation 132.13, for how long should records of inspections and test results be kept?",
    options: [
      "5 years minimum",
      "10 years minimum",
      "Throughout the working life of the installation",
      "Until the next inspection is due"
    ],
    correctAnswer: 2,
    explanation: "Regulation 132.13 and Part 6 of BS 7671 require that records of all checks, inspections and tests be kept throughout the working life of the installation. This enables deterioration to be identified and can be used as a management tool for maintenance."
  },
  {
    id: 3,
    question: "You discover dangerous defects in parts of an existing installation not affected by your repair work. Where should you record this?",
    options: [
      "On a separate quotation for additional work",
      "In the 'Comments on existing installation' section of the certificate",
      "Only verbally to the customer",
      "This should not be recorded as it's outside your scope"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires that defects observed during works that may give rise to danger, but don't affect the safety of your addition or alteration, are recorded in the 'Comments on existing installation' section. If space is insufficient, a separate document should be referenced."
  },
  {
    id: 4,
    question: "What information must be recorded about the prospective fault current (Ipf) on an Electrical Installation Certificate?",
    options: [
      "Only the prospective short-circuit current",
      "Only the prospective earth fault current",
      "The greater of the prospective short-circuit or earth fault current",
      "The average of both values"
    ],
    correctAnswer: 2,
    explanation: "Regulation 712.534.101 requires that the recorded Ipf must be the greater of the prospective short-circuit current or the prospective earth fault current. The maximum prospective value shall be stated on the certificate to confirm protective device adequacy."
  },
  {
    id: 5,
    question: "Who should receive the original Electrical Installation Certificate?",
    options: [
      "The contractor's head office",
      "The local building control department",
      "The person ordering the work",
      "The electricity supplier"
    ],
    correctAnswer: 2,
    explanation: "The original certificate must be issued to the person ordering the work, with a duplicate retained by the issuer. If the person ordering the work is not the owner, the original or full copy must be passed immediately to the owner."
  },
  {
    id: 6,
    question: "You complete fault rectification work on behalf of a letting agent for a rented property. What additional step is recommended regarding documentation?",
    options: [
      "Keep the certificate confidential from the tenant",
      "Recommend the certificate is passed to the tenant and property owner",
      "Only provide a verbal summary to the agent",
      "Wait for the tenant to request documentation"
    ],
    correctAnswer: 1,
    explanation: "For rented accommodation, legislation may require documentation to be provided to tenants. The Landlord and Tenant Act and Housing Acts require landlords to maintain electrical installations. Recommending certificates are passed to all relevant parties demonstrates best practice."
  },
  {
    id: 7,
    question: "What distinguishes a 'departure' from a 'non-compliance' in documentation terms?",
    options: [
      "They mean the same thing",
      "A departure is deliberate with equivalent safety; non-compliance may give rise to danger",
      "A departure is more serious than non-compliance",
      "Only non-compliance needs to be recorded"
    ],
    correctAnswer: 1,
    explanation: "A departure is a deliberate decision not to fully comply with BS 7671, where the designer declares equivalent safety is achieved. A non-compliance is a failure to meet a requirement that may give rise to danger. Both must be recorded, but they have different implications."
  },
  {
    id: 8,
    question: "When can a single-signature Electrical Installation Certificate be used?",
    options: [
      "Never - multiple signatures are always required",
      "When a single person is authorised and responsible for design, construction, inspection and testing",
      "Only for domestic installations",
      "Only when the work value is below a threshold"
    ],
    correctAnswer: 1,
    explanation: "Regulation 712.534.101 permits a single-signature declaration to replace multiple signatures when one person is responsible for design, construction, inspection and testing. This is common for sole traders or when one qualified person oversees all aspects of the work."
  },
  {
    id: 9,
    question: "You diagnose a high resistance joint that was causing overheating. What specific information should your documentation include?",
    options: [
      "Just 'repaired loose connection'",
      "Location, nature of fault, test results before/after, materials used, and re-test confirmation",
      "Only the test results after repair",
      "A photograph is sufficient documentation"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation should include: exact location of the fault, nature of the defect found (high resistance joint), relevant test results before repair, remedial action taken, materials used, and confirmation test results proving the fault is rectified."
  },
  {
    id: 10,
    question: "An inspection reveals the previous installer used cable sizes smaller than BS 7671 requires. This is recorded as:",
    options: [
      "A departure, as the previous installer made a design decision",
      "A non-compliance, as it's a failure to meet requirements that may cause danger",
      "An observation, with no specific classification",
      "Not recorded, as it's historical work"
    ],
    correctAnswer: 1,
    explanation: "Undersized cables are a non-compliance - a failure to meet requirements that may give rise to danger (overheating, fire risk). A departure would require the original designer to have documented equivalent safety measures, which is clearly not the case here."
  },
  {
    id: 11,
    question: "What should be included in an Operation and Maintenance (O&M) manual for fault work?",
    options: [
      "Only warranty information",
      "Equipment data sheets, test records, maintenance schedules, and manufacturer instructions",
      "Just the final invoice",
      "O&M manuals are not required for fault work"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Part L requires O&M documentation containing equipment data sheets, commissioning records, maintenance schedules, and manufacturer instructions. This applies to fault work where equipment is replaced or systems are modified."
  },
  {
    id: 12,
    question: "You're called back to a job where the fault has returned. Your documentation shows you tested and found acceptable results. What does this demonstrate?",
    options: [
      "The documentation was falsified",
      "Due diligence was exercised; the current fault may be new or have developed since",
      "The tests were performed incorrectly",
      "Documentation has no value in disputes"
    ],
    correctAnswer: 1,
    explanation: "Proper documentation demonstrates due diligence. If test results at the time were acceptable, the current fault may be a new occurrence, further deterioration, or caused by subsequent events. Documentation protects you professionally and aids diagnosis of the current issue."
  }
];

const faqs = [
  {
    question: "What's the difference between an EIC and a Minor Works Certificate?",
    answer: "An Electrical Installation Certificate (EIC) is required for new installations or alterations that introduce new circuits - such as adding a new radial circuit or replacing a consumer unit. A Minor Electrical Installation Works Certificate is used for additions or alterations that don't introduce new circuits - like adding socket outlets to an existing circuit, relocating switches, or replacing accessories and luminaires. Using the wrong certificate is a compliance issue."
  },
  {
    question: "Do I need to document faults I find but don't repair?",
    answer: "Yes, absolutely. BS 7671 requires that any defects observed during work that may give rise to danger must be recorded in the 'Comments on existing installation' section of your certificate, even if they're outside your scope of work. You should also inform the customer verbally and in writing, recommending immediate isolation if the defect is dangerous. Failing to record and report known hazards could expose you to liability."
  },
  {
    question: "How detailed should my fault diagnosis notes be?",
    answer: "Your notes should be detailed enough that another competent electrician could understand what you found, how you diagnosed it, and what you did to rectify it. Include: the reported symptoms, your diagnostic process and test results, the root cause identified, remedial action taken, materials used, and confirmation test results. Think of it as creating a story of the job that can be followed months or years later."
  },
  {
    question: "Can I use electronic certificates instead of paper forms?",
    answer: "Yes, electronic certification is widely accepted and often preferred. Many certification bodies and competent person schemes provide digital platforms. The key requirements remain the same: correct information, appropriate signatures (electronic signatures are valid), and proper retention. Ensure your system can produce printed copies when required and maintains secure backup of records."
  },
  {
    question: "Who can sign electrical certificates?",
    answer: "Certificates must be signed by persons authorised by the executing company for their respective responsibilities: design, construction, inspection and testing. Each signatory must be competent for the work they're certifying. For sole traders or small companies, one person may be authorised to sign for multiple or all categories - the single-signature declaration option permits this when appropriate authorisation exists."
  },
  {
    question: "What if I can't determine the exact cause of an intermittent fault?",
    answer: "Document everything you've done to diagnose the fault, including all tests performed and their results. Record any patterns or conditions when the fault occurs. Note any suspected causes and why you believe them likely. If you cannot resolve the fault, document this clearly and recommend what further investigation might be needed. This protects you professionally and gives the customer clear information about the situation."
  }
];

const Level3Module4Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section1">
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
            <FileText className="h-4 w-4" />
            <span>Module 4.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documentation of Findings
          </h1>
          <p className="text-white/80">
            Recording fault diagnosis results and maintaining accurate documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EIC:</strong> New circuits or installations</li>
              <li><strong>Minor Works:</strong> Alterations without new circuits</li>
              <li><strong>EICR:</strong> Periodic inspection of existing</li>
              <li><strong>Keep records:</strong> For the life of the installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Added socket to existing circuit = Minor Works</li>
              <li><strong>Spot:</strong> New circuit from CU = EIC required</li>
              <li><strong>Use:</strong> Comments section for existing defects</li>
              <li><strong>Use:</strong> Test results prove due diligence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select the correct certificate type for different fault rectification scenarios",
              "Complete electrical certificates accurately with all required information",
              "Document fault diagnosis findings in a professional, comprehensive manner",
              "Understand BS 7671 documentation requirements including Reg 132.13 and Part 6",
              "Record departures and non-compliances correctly",
              "Maintain records that protect you professionally and demonstrate competence"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Documentation Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Documentation Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Documentation isn't paperwork for paperwork's sake - it's a fundamental professional requirement that protects you, your customer, and future workers on that installation. Think of your documentation as the story of what you found, what you did, and why it's now safe.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation serves multiple critical purposes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Legal protection:</strong> Evidence of competent work if disputes arise</li>
                <li><strong>Regulatory compliance:</strong> BS 7671 Part 6 and Regulation 132.13 mandate documentation</li>
                <li><strong>Future reference:</strong> Enables identification of deterioration over time</li>
                <li><strong>Handover information:</strong> Allows others to understand and maintain the installation</li>
                <li><strong>Building Regulations:</strong> Required for sign-off on notifiable work</li>
                <li><strong>Insurance purposes:</strong> May be required to validate claims</li>
              </ul>
            </div>

            <p>
              Under BS 7671 Regulation 132.13, records of all checks, inspections and tests, including test results, should be kept throughout the working life of an electrical installation. This isn't a suggestion - it's a requirement. These records enable deterioration to be identified and can be used as a management tool to ensure maintenance is carried out effectively.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Poor documentation is one of the most common failings identified during quality audits. Taking an extra five minutes to document properly can save hours of problems later - and potentially your professional reputation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Choosing the Right Certificate */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Choosing the Right Certificate
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the correct certificate for your fault rectification work is essential. Using the wrong certificate is itself a non-compliance and could invalidate your documentation. BS 7671 Regulation 712.534.101 provides clear guidance on certificate selection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Certificate (EIC)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>New installations</li>
                  <li>Additions that introduce new circuits</li>
                  <li>Consumer unit or distribution board replacement</li>
                  <li>Combined works requiring comprehensive certification</li>
                  <li>Must include Schedule of Inspections and Test Results</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Minor Electrical Installation Works Certificate</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Additions NOT introducing new circuits</li>
                  <li>Adding socket outlets to existing circuit</li>
                  <li>Relocating switches or accessories</li>
                  <li>Replacing accessories and luminaires</li>
                  <li>Repairing cables on existing circuits</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Decision flowchart for fault work:</p>
              <ul className="text-sm text-white space-y-1">
                <li>1. Does the rectification work introduce a new circuit? → <strong>Yes = EIC</strong></li>
                <li>2. Does it involve consumer unit replacement? → <strong>Yes = EIC</strong></li>
                <li>3. Is it an addition to an existing circuit? → <strong>Minor Works</strong></li>
                <li>4. Is it repair/replacement of existing components? → <strong>Minor Works</strong></li>
              </ul>
            </div>

            <p>
              Remember: An EICR (Electrical Installation Condition Report) is specifically prohibited for certifying work you've completed. It's only for periodic inspection and testing of existing installations. If you're carrying out repairs, you need an EIC or Minor Works Certificate.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You diagnose a fault on a ring final circuit caused by rodent damage and replace a 3m section of cable. The circuit already existed - you haven't added anything new - so a Minor Electrical Installation Works Certificate is correct. However, if you had to run a new spur to reach the damaged area and this created a new radial circuit from the consumer unit, an EIC would be required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: What to Document */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            What to Document
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive documentation tells the complete story of your fault diagnosis and rectification. Another competent electrician reading your records should be able to understand exactly what was found, how it was diagnosed, and what was done to resolve it.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential information to record:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Initial complaint:</strong> What the customer reported (their words)</li>
                <li><strong>Diagnostic process:</strong> Tests performed and methodology used</li>
                <li><strong>Test results:</strong> Actual readings obtained, not just pass/fail</li>
                <li><strong>Fault identified:</strong> Precise location and nature of the defect</li>
                <li><strong>Root cause:</strong> Why the fault occurred (if determinable)</li>
                <li><strong>Remedial action:</strong> Exactly what was done to rectify</li>
                <li><strong>Materials used:</strong> Cable types, accessories, protective devices</li>
                <li><strong>Confirmation tests:</strong> Results proving rectification was successful</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Record Test Values</p>
                <p className="text-white/90 text-xs">Not just "pass" - record actual readings: R1+R2, Zs, IR, RCD trip time</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Before and After</p>
                <p className="text-white/90 text-xs">Record test results before repair and after - shows the improvement achieved</p>
              </div>
            </div>

            <p>
              The prospective fault current (Ipf) deserves special attention. Regulation 712.534.101 requires you to record the greater of the prospective short-circuit current or the prospective earth fault current. This confirms that protective devices can handle the available fault current at that location.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If you observe defects in parts of the existing installation not affected by your work, you must record these in the 'Comments on existing installation' section. This protects you if those defects later cause problems, and ensures the customer is aware of additional issues.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Professional Standards and Record Keeping */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Professional Standards and Record Keeping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your documentation reflects your professional standards. Certificates must be signed by persons authorised by the executing company for their respective responsibilities. Understanding the signature requirements and maintaining proper records demonstrates competence and protects everyone involved.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Certificate signature requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Design:</strong> Signed by person responsible for design decisions</li>
                <li><strong>Construction:</strong> Signed by person overseeing installation work</li>
                <li><strong>Inspection and testing:</strong> Signed by person who performed verification</li>
                <li><strong>Single signature:</strong> Permitted when one person is authorised for all aspects</li>
              </ul>
            </div>

            <p>
              For fault work carried out by a sole trader or where one qualified person handles everything, the single-signature declaration option is appropriate. This replaces multiple signatures when you are genuinely responsible for design decisions (even if minor), construction, and verification of the fault rectification work.
            </p>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Record retention best practices:</p>
              <ul className="text-sm text-white space-y-1">
                <li>Keep copies of all certificates you issue (digital is acceptable)</li>
                <li>Maintain records for the working life of the installation - or longer</li>
                <li>Store records securely with regular backups if digital</li>
                <li>Ensure records can be retrieved and printed if required</li>
                <li>Include job notes, test sheets, and any correspondence</li>
              </ul>
            </div>

            <p>
              Copies should be included in the property's Operation and Maintenance (O&M) documentation where applicable. For commercial premises, Building Regulations Part L requires comprehensive handover documentation. Even for domestic work, recommending the customer keeps certificates with their property documents is good practice.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Three years after your repair, the customer calls saying the fault has returned. Your records show you tested insulation resistance at 250 MΩ and earth fault loop impedance at 0.42Ω - both well within limits. This demonstrates you did competent work at the time; the current issue is likely new damage or deterioration, not a failure of your original repair.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Workflow</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start documenting from arrival - note customer's description of the problem</li>
                <li>Record all test readings on a test sheet before transferring to certificates</li>
                <li>Photograph complex situations - damaged cables, locations, before/after comparisons</li>
                <li>Complete certificates on-site where possible while details are fresh</li>
                <li>Explain the certificate to the customer and ensure they receive the original</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handling Intermittent Faults</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Document all diagnostic tests even if results are within limits</li>
                <li>Record patterns - "fault occurs when central heating activates" etc.</li>
                <li>Note any suspected causes and your reasoning</li>
                <li>If unresolved, clearly document this and recommend further investigation</li>
                <li>Consider recommending the customer keeps a fault diary</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Documentation Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong certificate type:</strong> Using Minor Works when an EIC is required</li>
                <li><strong>Missing schedules:</strong> EIC invalid without Schedule of Inspections and Test Results</li>
                <li><strong>Incomplete test results:</strong> Leaving fields blank or entering "N/A" incorrectly</li>
                <li><strong>Failing to record existing defects:</strong> Creates liability if problems develop</li>
                <li><strong>Unsigned certificates:</strong> Not valid without appropriate authorised signatures</li>
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
                <p className="font-medium text-white mb-1">Certificate Selection Guide</p>
                <ul className="space-y-0.5">
                  <li>New circuit from CU = EIC</li>
                  <li>CU/DB replacement = EIC</li>
                  <li>Socket added to existing circuit = Minor Works</li>
                  <li>Cable repair = Minor Works</li>
                  <li>Periodic inspection = EICR (not for your work)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Reg 132.13 - Record keeping requirement</li>
                  <li>Reg 514.9 - Documentation provision</li>
                  <li>Reg 712.534.101 - Certificate requirements</li>
                  <li>Part 6 - Inspection and testing</li>
                  <li>Appendix 6 - Model forms guidance</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safety Considerations
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section2">
              Next: Diagnostic Tools & Equipment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section1_5;
