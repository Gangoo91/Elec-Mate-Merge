import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Installation Quality - HNC Module 5 Section 4.4";
const DESCRIPTION = "Master installation quality management in building services: workmanship standards (BSRIA, CIBSE), supervision ratios, quality walk-downs, installation checklists, photographic records, and progressive verification procedures.";

const quickCheckQuestions = [
  {
    id: "workmanship-standard",
    question: "What is the primary purpose of BSRIA workmanship standards in building services?",
    options: ["To reduce material costs", "To provide visual benchmarks for acceptable installation quality", "To speed up installation times", "To replace manufacturer instructions"],
    correctIndex: 1,
    explanation: "BSRIA workmanship standards provide illustrated visual benchmarks showing both acceptable and unacceptable installation quality, enabling consistent assessment across different installers and sites."
  },
  {
    id: "supervision-ratio",
    question: "What supervision ratio is typically recommended for complex mechanical and electrical installations?",
    options: ["1 supervisor to 50 operatives", "1 supervisor to 25 operatives", "1 supervisor to 10 operatives", "1 supervisor to 5 operatives"],
    correctIndex: 2,
    explanation: "For complex M&E installations, CIBSE recommends approximately 1 supervisor to 10 operatives to ensure adequate oversight, quality checking, and technical support during installation."
  },
  {
    id: "quality-walkdown",
    question: "When should quality walk-downs be conducted during installation?",
    options: ["Only at project completion", "Only when problems are reported", "Progressively at key milestones before covering up", "Monthly regardless of progress"],
    correctIndex: 2,
    explanation: "Quality walk-downs should be conducted progressively at key milestones, particularly before work is covered up (e.g., before ceiling closure, before boxing in services), as remediation costs increase dramatically after concealment."
  },
  {
    id: "photographic-records",
    question: "Why are photographic records essential during M&E installation?",
    options: ["For marketing purposes", "To document concealed work, prove compliance, and assist future maintenance", "To monitor operative attendance", "To reduce paperwork"],
    correctIndex: 1,
    explanation: "Photographic records document concealed installations before covering, provide evidence of compliance with specifications, assist defect investigation, and support future maintenance and modification works."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which BSRIA publication provides illustrated workmanship standards for building services installations?",
    options: [
      "BSRIA BG 6 - Design Framework",
      "BSRIA BG 29 - Pre-Commission Cleaning",
      "BSRIA BG 55/2020 - Illustrated Guide to Electrical Building Services",
      "BSRIA TN 1 - Testing Guidance"
    ],
    correctAnswer: 2,
    explanation: "BSRIA BG 55/2020 provides comprehensive illustrated workmanship standards for electrical building services, showing acceptable and unacceptable installation examples with photographic evidence."
  },
  {
    id: 2,
    question: "What is the 'cost of quality' principle in installation management?",
    options: [
      "Quality always costs more money",
      "Prevention costs less than correction; correction costs less than failure",
      "Quality should be reduced to save costs",
      "Only final inspection matters"
    ],
    correctAnswer: 1,
    explanation: "The cost of quality principle states that investing in prevention (training, procedures) costs far less than correction (rework), which in turn costs less than failure (defects, claims, delays). Quality pays for itself."
  },
  {
    id: 3,
    question: "What should a quality hold point inspection include?",
    options: [
      "Visual inspection only",
      "Formal sign-off before proceeding, documented in ITP with witness signatures",
      "Verbal confirmation from the supervisor",
      "Photographic record only"
    ],
    correctAnswer: 1,
    explanation: "Quality hold points require formal inspection and sign-off before work proceeds. They must be documented in the Inspection and Test Plan (ITP) with witness signatures from appropriate parties (contractor, consultant, client)."
  },
  {
    id: 4,
    question: "What minimum information should installation checklists capture?",
    options: [
      "Operative name only",
      "Date and area only",
      "Item description, location, inspector name, date, result, and any defects noted",
      "Supervisor approval only"
    ],
    correctAnswer: 2,
    explanation: "Installation checklists should capture: item/system description, specific location reference, inspector name and competence level, inspection date, pass/fail result, defect details if applicable, and sign-off."
  },
  {
    id: 5,
    question: "According to CIBSE guidance, what percentage of installations should typically be subject to detailed quality inspection?",
    options: [
      "5% sample",
      "10% sample",
      "25% sample minimum, with 100% of critical items",
      "100% of all installations"
    ],
    correctAnswer: 2,
    explanation: "CIBSE recommends a minimum 25% sample inspection rate for general installations, with 100% inspection of all critical, safety-related, and first-of-type installations to ensure consistent quality."
  },
  {
    id: 6,
    question: "What is progressive verification in installation quality management?",
    options: [
      "Checking work only when complete",
      "Systematic quality checks at defined stages throughout the installation process",
      "Relying on final commissioning to identify issues",
      "Random spot checks by management"
    ],
    correctAnswer: 1,
    explanation: "Progressive verification involves systematic quality checks at defined stages throughout installation, ensuring defects are identified and corrected early when remediation is simpler and cheaper."
  },
  {
    id: 7,
    question: "What should be verified during a cable installation quality check?",
    options: [
      "Cable colour only",
      "Correct cable type/size, support spacing, bend radii, segregation, labelling, and termination quality",
      "Cable length only",
      "Manufacturer label only"
    ],
    correctAnswer: 1,
    explanation: "Cable quality checks should verify: correct cable type and CSA, proper support spacing per BS 7671, minimum bend radii maintained, correct segregation, accurate labelling, and termination quality including torque verification."
  },
  {
    id: 8,
    question: "How should photographic quality records be organised?",
    options: [
      "Random order in a single folder",
      "By date only",
      "Systematically by location/system with clear naming convention, metadata, and cross-reference to drawings",
      "Kept on personal mobile phones"
    ],
    correctAnswer: 2,
    explanation: "Photographic records should be systematically organised by location and system, use clear naming conventions, include metadata (date, location, description), and be cross-referenced to drawings and inspection records."
  },
  {
    id: 9,
    question: "What is the purpose of a 'snagging list' in installation quality management?",
    options: [
      "To list all materials used",
      "To document defects requiring remediation before handover",
      "To record working hours",
      "To list all operatives on site"
    ],
    correctAnswer: 1,
    explanation: "A snagging list documents defects, incomplete works, and items requiring remediation identified during quality inspections. Items must be actioned, re-inspected, and signed off before handover acceptance."
  },
  {
    id: 10,
    question: "What supervision documentation should be maintained for quality assurance?",
    options: [
      "No documentation required",
      "Supervisor names only",
      "Supervision logs showing coverage, inspections conducted, issues identified, and corrective actions taken",
      "Only accident reports"
    ],
    correctAnswer: 2,
    explanation: "Quality supervision documentation should include: daily supervision logs, areas and operatives supervised, inspections conducted, issues identified, corrective actions taken, and verification of remedial works."
  },
  {
    id: 11,
    question: "When should first-of-type installation approval be obtained?",
    options: [
      "At project completion",
      "Before mass installation begins, with formal approval documented",
      "When convenient",
      "Only if requested by client"
    ],
    correctAnswer: 1,
    explanation: "First-of-type approval must be obtained before mass installation begins. The exemplar installation is formally inspected and approved, establishing the quality benchmark for all subsequent installations."
  },
  {
    id: 12,
    question: "What role do manufacturer installation instructions play in workmanship standards?",
    options: [
      "They are optional guidance only",
      "They override all other standards",
      "They form part of the contractual requirement and non-compliance invalidates warranties",
      "They are only relevant for complex equipment"
    ],
    correctAnswer: 2,
    explanation: "Manufacturer installation instructions typically form contractual requirements. Non-compliance can invalidate warranties, void certifications, and create liability issues. Instructions should be on-site and followed precisely."
  }
];

const faqs = [
  {
    question: "What is the difference between BSRIA and CIBSE workmanship guidance?",
    answer: "BSRIA provides detailed illustrated workmanship standards (BG 55/2020 for electrical, BG 56/2020 for mechanical) with photographic examples of acceptable and unacceptable work. CIBSE provides broader design and installation guidance through publications like CIBSE Guide M (Maintenance Engineering) and technical memoranda. Both are complementary - BSRIA for visual quality benchmarks, CIBSE for technical specifications and procedures."
  },
  {
    question: "How do I determine appropriate supervision ratios for a project?",
    answer: "Supervision ratios depend on: installation complexity (1:10 for complex M&E, 1:15-20 for standard work), operative experience level, site conditions, specification requirements, and programme pressures. High-risk activities (confined spaces, live working) require dedicated supervision. Consider supervisor competence too - supervisors need technical knowledge and inspection training."
  },
  {
    question: "What should I do if quality defects are found after work is covered up?",
    answer: "Document the defect with photographs before and after opening up. Investigate root cause - was it specification, supervision, workmanship, or inspection failure? Record costs of remediation for cost tracking. Implement corrective actions to prevent recurrence. Update inspection procedures if necessary. Consider whether similar concealed work elsewhere needs opening up for inspection."
  },
  {
    question: "How detailed should installation checklists be?",
    answer: "Checklists should be detailed enough to ensure consistent inspection but practical to complete. Include specific checkpoints relevant to the installation type, reference applicable standards and specifications, provide clear pass/fail criteria, include space for notes and photographs, and require formal sign-off. Avoid being so detailed that inspections become superficial box-ticking exercises."
  },
  {
    question: "What is the contractor's responsibility for subcontractor quality?",
    answer: "The principal contractor is responsible for all subcontractor quality under JCT and NEC contracts. This includes: pre-qualifying subcontractors for competence, flowing down quality requirements contractually, supervising and inspecting subcontractor work, addressing defects regardless of who installed, and maintaining quality records for all works including subcontract packages."
  },
  {
    question: "How should quality audits be structured?",
    answer: "Quality audits should be structured around: sampling methodology (random, targeted, or combination), defined inspection criteria tied to specifications, competent auditors independent of the work being audited, standardised scoring/rating systems, documented findings with photographic evidence, corrective action tracking, and trend analysis to identify systemic issues. Regular audits (weekly/fortnightly) are more effective than infrequent comprehensive reviews."
  }
];

const HNCModule5Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section4">
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
            <span>Module 5.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Installation Quality
          </h1>
          <p className="text-white/80">
            Workmanship standards, supervision requirements, quality audits, and progressive verification in building services installation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Standards:</strong> BSRIA BG 55/56, CIBSE guides define quality benchmarks</li>
              <li className="pl-1"><strong>Supervision:</strong> 1:10 ratio for complex M&E work</li>
              <li className="pl-1"><strong>Verification:</strong> Progressive checks at key milestones</li>
              <li className="pl-1"><strong>Records:</strong> Photographic evidence of concealed work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Walk-downs:</strong> Before ceiling/wall closure</li>
              <li className="pl-1"><strong>First-of-type:</strong> Approval before mass installation</li>
              <li className="pl-1"><strong>Checklists:</strong> Systematic inspection records</li>
              <li className="pl-1"><strong>Snagging:</strong> Defect tracking to completion</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BSRIA and CIBSE workmanship standards to M&E installations",
              "Determine appropriate supervision ratios for different work types",
              "Plan and conduct quality walk-down inspections effectively",
              "Develop installation checklists for consistent quality verification",
              "Maintain photographic and documentary quality records",
              "Implement progressive verification throughout installation phases"
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

        {/* Section 1: Workmanship Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Workmanship Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Workmanship standards provide objective benchmarks for assessing installation quality. In building
              services, BSRIA and CIBSE publications establish industry-recognised criteria that enable consistent
              quality assessment across different contractors, sites, and inspection personnel.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key BSRIA Publications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BG 55/2020:</strong> Illustrated Guide to Electrical Building Services (containment, wiring, accessories)</li>
                <li className="pl-1"><strong>BG 56/2020:</strong> Illustrated Guide to Mechanical Building Services (pipework, ductwork, plant)</li>
                <li className="pl-1"><strong>BG 29:</strong> Pre-Commission Cleaning of Pipework Systems</li>
                <li className="pl-1"><strong>BG 8:</strong> Model Specifications for BMS</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BSRIA Workmanship Assessment Approach</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Practice Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Poor Practice Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable tray runs</td>
                      <td className="border border-white/10 px-3 py-2">Level, aligned, consistent fixings, proper joints</td>
                      <td className="border border-white/10 px-3 py-2">Sagging, misaligned, mixed fixing types</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conduit bends</td>
                      <td className="border border-white/10 px-3 py-2">Smooth radius, no kinks, consistent spacing</td>
                      <td className="border border-white/10 px-3 py-2">Kinked, varying radii, uneven fixing centres</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accessory mounting</td>
                      <td className="border border-white/10 px-3 py-2">Level, secure, consistent heights, correct orientation</td>
                      <td className="border border-white/10 px-3 py-2">Crooked, loose, varying heights across room</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable terminations</td>
                      <td className="border border-white/10 px-3 py-2">Correct torque, neat dressing, proper identification</td>
                      <td className="border border-white/10 px-3 py-2">Over/under-tightened, untidy, missing labels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">Tidy wiring, clear labelling, circuits identified</td>
                      <td className="border border-white/10 px-3 py-2">Tangled cables, illegible labels, unknown circuits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Quality Guidance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CIBSE Guide M:</strong> Maintenance Engineering and Management - installation for maintainability</li>
                <li className="pl-1"><strong>CIBSE Guide W:</strong> Water Distribution Systems - pipework quality standards</li>
                <li className="pl-1"><strong>CIBSE TM52:</strong> Thermal Performance - installation affecting energy performance</li>
                <li className="pl-1"><strong>CIBSE Commissioning Codes:</strong> A-R series covering all services</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Contractual status:</strong> BSRIA and CIBSE standards are typically specified in contract documents. Non-compliance constitutes a contractual breach requiring remediation at contractor cost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Supervision Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Supervision Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective supervision is fundamental to installation quality. The supervisor acts as the primary
              quality control mechanism, ensuring work complies with specifications, identifying issues early,
              and providing technical guidance to operatives.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Complex M&E Work</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ratio: 1:8 to 1:12</li>
                  <li className="pl-1">Main plant rooms</li>
                  <li className="pl-1">Distribution boards</li>
                  <li className="pl-1">BMS integration</li>
                  <li className="pl-1">Commissioning activities</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Installation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ratio: 1:15 to 1:20</li>
                  <li className="pl-1">Containment runs</li>
                  <li className="pl-1">General wiring</li>
                  <li className="pl-1">Accessory installation</li>
                  <li className="pl-1">Repetitive fit-out</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">High-Risk Activities</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ratio: 1:4 to 1:6</li>
                  <li className="pl-1">Live working</li>
                  <li className="pl-1">Confined spaces</li>
                  <li className="pl-1">Working at height</li>
                  <li className="pl-1">HV installations</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supervisor Competence Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Competence Area</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Evidence/Qualification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technical knowledge</td>
                      <td className="border border-white/10 px-3 py-2">NVQ Level 3 / AM2, relevant trade background</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Regulatory awareness</td>
                      <td className="border border-white/10 px-3 py-2">BS 7671 18th Edition, Building Regulations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quality management</td>
                      <td className="border border-white/10 px-3 py-2">Quality inspection training, ITP understanding</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Health and safety</td>
                      <td className="border border-white/10 px-3 py-2">SMSTS/SSSTS, risk assessment competence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Documentation</td>
                      <td className="border border-white/10 px-3 py-2">Record keeping, report writing ability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Supervision Documentation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Daily log:</strong> Areas supervised, operatives present, work completed</li>
                <li className="pl-1"><strong>Inspection record:</strong> Checks conducted, results, any defects</li>
                <li className="pl-1"><strong>Issue log:</strong> Problems identified, actions taken, resolution</li>
                <li className="pl-1"><strong>Toolbox talks:</strong> Topics covered, attendees, signed register</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quality principle:</strong> Supervision is preventative quality control. Adequate supervision prevents defects; inadequate supervision merely discovers them later at higher cost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Quality Walk-Downs and Audits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Quality Walk-Downs and Audits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Quality walk-downs and audits provide structured verification that installation work meets
              specifications. Walk-downs are physical inspections of installed work; audits are systematic
              reviews of quality systems, procedures, and records.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Walk-Down Timing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Before ceiling closure:</strong> Verify above-ceiling services, supports, fire stopping</li>
                <li className="pl-1"><strong>Before wall lining:</strong> Check concealed wiring, back boxes, first fix</li>
                <li className="pl-1"><strong>Before floor screed:</strong> Inspect underfloor services, conduit routes</li>
                <li className="pl-1"><strong>Before riser closure:</strong> Verify vertical containment, firestopping</li>
                <li className="pl-1"><strong>Before energisation:</strong> Final check of all accessible installations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Walk-Down Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Outputs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Preparation</td>
                      <td className="border border-white/10 px-3 py-2">Review drawings, specs, previous snags</td>
                      <td className="border border-white/10 px-3 py-2">Checklist, reference documents</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inspection</td>
                      <td className="border border-white/10 px-3 py-2">Systematic area-by-area review</td>
                      <td className="border border-white/10 px-3 py-2">Defect notes, photographs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Documentation</td>
                      <td className="border border-white/10 px-3 py-2">Complete snagging list, categorise items</td>
                      <td className="border border-white/10 px-3 py-2">Formal snag report</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Remediation</td>
                      <td className="border border-white/10 px-3 py-2">Contractor addresses defects</td>
                      <td className="border border-white/10 px-3 py-2">Remediation evidence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Close-out</td>
                      <td className="border border-white/10 px-3 py-2">Re-inspect, verify remediation</td>
                      <td className="border border-white/10 px-3 py-2">Signed-off snag list</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Audit Types</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Process Audit</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Are quality procedures being followed?</li>
                    <li>Are records being maintained?</li>
                    <li>Is supervision adequate?</li>
                    <li>Are hold points being observed?</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Product Audit</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Does installed work meet specification?</li>
                    <li>Are materials as approved?</li>
                    <li>Is workmanship acceptable?</li>
                    <li>Are test results compliant?</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Defect Categorisation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Category A (Critical):</strong> Safety risk or major non-compliance - stop work, immediate remedy</li>
                <li className="pl-1"><strong>Category B (Major):</strong> Significant non-compliance - remedy before proceeding</li>
                <li className="pl-1"><strong>Category C (Minor):</strong> Cosmetic or minor deviation - remedy before handover</li>
                <li className="pl-1"><strong>Observation:</strong> Not a defect but improvement opportunity</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Real-world example:</strong> On a London hospital project, systematic walk-downs before ceiling closure identified 340 containment support deficiencies. Remediation took 3 days. Had these been found after ceiling installation, remediation would have required ceiling removal, costing 6 weeks and £180,000.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Installation Checklists and Progressive Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Installation Checklists and Progressive Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Installation checklists provide systematic frameworks for quality verification, ensuring
              consistent inspection regardless of who conducts it. Progressive verification ensures
              quality is built in throughout installation, not checked only at completion.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Checklist Elements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Check Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment</td>
                      <td className="border border-white/10 px-3 py-2">Type correct, fixing centres, level/plumb, earthing continuity, fire barriers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cables</td>
                      <td className="border border-white/10 px-3 py-2">Type/CSA per schedule, bend radii, segregation, identification, damage-free</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">Location correct, mounting height, labelling, circuit schedules, spare ways</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accessories</td>
                      <td className="border border-white/10 px-3 py-2">Height/position, type correct, fixing secure, level, no damage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Terminations</td>
                      <td className="border border-white/10 px-3 py-2">Correct terminals, torque verified, insulation intact, dressing neat</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Luminaires</td>
                      <td className="border border-white/10 px-3 py-2">Position per drawing, suspension secure, emergency function, lamp type</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Progressive Verification Stages</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold text-sm">1</span>
                  <div>
                    <p className="font-medium text-white">First Fix Verification</p>
                    <p className="text-sm text-white/70">Containment routes, back boxes, cable runs before covering</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold text-sm">2</span>
                  <div>
                    <p className="font-medium text-white">Distribution Verification</p>
                    <p className="text-sm text-white/70">Boards installed, cables terminated, circuit identification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold text-sm">3</span>
                  <div>
                    <p className="font-medium text-white">Second Fix Verification</p>
                    <p className="text-sm text-white/70">Accessories, luminaires, final connections</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold text-sm">4</span>
                  <div>
                    <p className="font-medium text-white">Pre-Commissioning Verification</p>
                    <p className="text-sm text-white/70">Visual inspection complete, ready for testing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Photographic Record Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">What to Photograph</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>All concealed installations</li>
                    <li>Fire barrier installations</li>
                    <li>Complex terminations</li>
                    <li>Any variations from drawings</li>
                    <li>First-of-type installations</li>
                    <li>Defects before and after repair</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Photo Standards</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Include location reference board</li>
                    <li>Context shot plus detail shot</li>
                    <li>Consistent file naming convention</li>
                    <li>Metadata with date/time/location</li>
                    <li>Cross-reference to ITP/drawings</li>
                    <li>Stored in project QA system</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">First-of-Type Approval Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Install single exemplar of repetitive element (e.g., one room, one floor)</li>
                <li className="pl-1"><strong>Step 2:</strong> Contractor self-inspection against specification</li>
                <li className="pl-1"><strong>Step 3:</strong> Joint inspection with consultant/client representative</li>
                <li className="pl-1"><strong>Step 4:</strong> Formal sign-off documenting approved standard</li>
                <li className="pl-1"><strong>Step 5:</strong> Photographic record as benchmark for subsequent work</li>
                <li className="pl-1"><strong>Step 6:</strong> Proceed with mass installation referencing approved exemplar</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Cost of quality:</strong> Studies show prevention activities (first-of-type, progressive verification) cost approximately 3% of installation value. Failure costs (rework, delays, claims) average 10-15% on projects with poor quality management.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Supervision Planning</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A commercial fit-out has 45 electrical operatives installing general distribution and lighting. How many supervisors are required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Work type: Standard installation (containment, wiring, accessories)</p>
                <p>Recommended ratio: 1:15 to 1:20</p>
                <p className="mt-2">Using 1:15 (conservative): 45 ÷ 15 = <strong>3 supervisors</strong></p>
                <p>Using 1:20 (minimum): 45 ÷ 20 = 2.25 = <strong>3 supervisors</strong></p>
                <p className="mt-2 text-green-400">Answer: Minimum 3 supervisors required</p>
                <p className="mt-2 text-white/60">Note: If any complex work (main switchgear, BMS), increase ratio for those areas</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Quality Inspection Sampling</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A project has 200 identical office lighting installations. How many should be formally inspected?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>CIBSE recommendation: 25% minimum sample for repetitive work</p>
                <p className="mt-2">Sample size: 200 × 0.25 = <strong>50 installations</strong></p>
                <p className="mt-2">Additional requirements:</p>
                <p>- 100% first-of-type (first installation)</p>
                <p>- Increased sampling if defects found</p>
                <p>- Random selection across all areas</p>
                <p className="mt-2 text-green-400">Answer: 50 formal inspections plus first-of-type approval</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Cost of Quality Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A containment defect found after ceiling installation. Original installation cost £2,000. What is the likely remediation cost?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Remediation activities required:</p>
                <p>- Remove ceiling tiles: 2 days labour @ £400/day = £800</p>
                <p>- Scaffold/access: £600</p>
                <p>- Containment remediation: £500</p>
                <p>- Reinstate ceiling: 1 day @ £400 = £400</p>
                <p>- Re-inspection: £200</p>
                <p className="mt-2">Total remediation cost: <strong>£2,500</strong></p>
                <p className="mt-2">Cost multiplier: 2,500 ÷ 2,000 = <strong>1.25×</strong> original cost</p>
                <p className="text-white/60 mt-2">Had defect been found before ceiling: remediation ~£300</p>
                <p className="text-red-400 mt-2">Early detection saving: £2,200 (88% saving)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Walk-Down Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Review specification and approved drawings before walk-down</li>
                <li className="pl-1">Take previous snag list to verify closures</li>
                <li className="pl-1">Work systematically area-by-area, system-by-system</li>
                <li className="pl-1">Photograph all defects with location reference</li>
                <li className="pl-1">Categorise defects by severity (A/B/C)</li>
                <li className="pl-1">Issue formal report within 24 hours</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Supervision ratio complex work: <strong>1:10</strong></li>
                <li className="pl-1">Supervision ratio standard work: <strong>1:15-20</strong></li>
                <li className="pl-1">Sample inspection rate: <strong>25% minimum</strong></li>
                <li className="pl-1">First-of-type: <strong>100% inspection</strong></li>
                <li className="pl-1">Quality cost prevention: <strong>~3% of value</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Quality Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inadequate supervision:</strong> Work proceeds without checking</li>
                <li className="pl-1"><strong>Late inspection:</strong> Defects found after covering up</li>
                <li className="pl-1"><strong>No first-of-type:</strong> Errors repeated across installation</li>
                <li className="pl-1"><strong>Poor records:</strong> No evidence of compliance</li>
                <li className="pl-1"><strong>Snag list drift:</strong> Defects not closed out</li>
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
                <p className="font-medium text-white mb-1">Workmanship Standards</p>
                <ul className="space-y-0.5">
                  <li>BSRIA BG 55/2020 - Electrical services</li>
                  <li>BSRIA BG 56/2020 - Mechanical services</li>
                  <li>CIBSE Guide M - Maintainability</li>
                  <li>Manufacturer instructions - contractual</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Quality Verification</p>
                <ul className="space-y-0.5">
                  <li>Walk-down before covering up</li>
                  <li>First-of-type approval mandatory</li>
                  <li>25% sample inspection minimum</li>
                  <li>Photographic records essential</li>
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
            <Link to="../h-n-c-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quality Management
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section4-5">
              Next: Testing & Commissioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section4_4;
