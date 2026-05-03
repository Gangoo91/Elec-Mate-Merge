/**
 * Module 5 · Section 4 · Subsection 4 — Installation Quality
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Workmanship standards, supervision, audits and progressive verification — turning compliant design into compliant installation.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Installation Quality - HNC Module 5 Section 4.4';
const DESCRIPTION =
  'Master installation quality management in building services: workmanship standards (BSRIA, CIBSE), supervision ratios, quality walk-downs, installation checklists, photographic records, and progressive verification procedures.';

const quickCheckQuestions = [
  {
    id: 'workmanship-standard',
    question: 'What is the primary purpose of BSRIA workmanship standards in building services?',
    options: [
      'To reduce material costs',
      'To provide visual benchmarks for acceptable installation quality',
      'To speed up installation times',
      'To replace manufacturer instructions',
    ],
    correctIndex: 1,
    explanation:
      'BSRIA workmanship standards provide illustrated visual benchmarks showing both acceptable and unacceptable installation quality, enabling consistent assessment across different installers and sites.',
  },
  {
    id: 'supervision-ratio',
    question:
      'What supervision ratio is typically recommended for complex mechanical and electrical installations?',
    options: [
      '1 supervisor to 50 operatives',
      '1 supervisor to 25 operatives',
      '1 supervisor to 10 operatives',
      '1 supervisor to 5 operatives',
    ],
    correctIndex: 2,
    explanation:
      'For complex M&E installations, CIBSE recommends approximately 1 supervisor to 10 operatives to ensure adequate oversight, quality checking, and technical support during installation.',
  },
  {
    id: 'quality-walkdown',
    question: 'When should quality walk-downs be conducted during installation?',
    options: [
      'Only at project completion',
      'Only when problems are reported',
      'Progressively at key milestones before covering up',
      'Monthly regardless of progress',
    ],
    correctIndex: 2,
    explanation:
      'Quality walk-downs should be conducted progressively at key milestones, particularly before work is covered up (e.g., before ceiling closure, before boxing in services), as remediation costs increase dramatically after concealment.',
  },
  {
    id: 'photographic-records',
    question: 'Why are photographic records essential during M&E installation?',
    options: [
      'For marketing purposes',
      'To document concealed work, prove compliance, and assist future maintenance',
      'To monitor operative attendance',
      'To reduce paperwork',
    ],
    correctIndex: 1,
    explanation:
      'Photographic records document concealed installations before covering, provide evidence of compliance with specifications, assist defect investigation, and support future maintenance and modification works.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BSRIA publication provides illustrated workmanship standards for building services installations?',
    options: [
      'BSRIA BG 6 - Design Framework',
      'BSRIA BG 29 - Pre-Commission Cleaning',
      'BSRIA BG 55/2020 - Illustrated Guide to Electrical Building Services',
      'BSRIA TN 1 - Testing Guidance',
    ],
    correctAnswer: 2,
    explanation:
      'BSRIA BG 55/2020 provides comprehensive illustrated workmanship standards for electrical building services, showing acceptable and unacceptable installation examples with photographic evidence.',
  },
  {
    id: 2,
    question: "What is the 'cost of quality' principle in installation management?",
    options: [
      'Quality always costs more money',
      'Prevention costs less than correction; correction costs less than failure',
      'Quality should be reduced to save costs',
      'Only final inspection matters',
    ],
    correctAnswer: 1,
    explanation:
      'The cost of quality principle states that investing in prevention (training, procedures) costs far less than correction (rework), which in turn costs less than failure (defects, claims, delays). Quality pays for itself.',
  },
  {
    id: 3,
    question: 'What should a quality hold point inspection include?',
    options: [
      'Visual inspection only',
      'Formal sign-off before proceeding, documented in ITP with witness signatures',
      'Verbal confirmation from the supervisor',
      'Photographic record only',
    ],
    correctAnswer: 1,
    explanation:
      'Quality hold points require formal inspection and sign-off before work proceeds. They must be documented in the Inspection and Test Plan (ITP) with witness signatures from appropriate parties (contractor, consultant, client).',
  },
  {
    id: 4,
    question: 'What minimum information should installation checklists capture?',
    options: [
      'Operative name only',
      'Date and area only',
      'Item description, location, inspector name, date, result, and any defects noted',
      'Supervisor approval only',
    ],
    correctAnswer: 2,
    explanation:
      'Installation checklists should capture: item/system description, specific location reference, inspector name and competence level, inspection date, pass/fail result, defect details if applicable, and sign-off.',
  },
  {
    id: 5,
    question:
      'According to CIBSE guidance, what percentage of installations should typically be subject to detailed quality inspection?',
    options: [
      '5% sample',
      '10% sample',
      '25% sample minimum, with 100% of critical items',
      '100% of all installations',
    ],
    correctAnswer: 2,
    explanation:
      'CIBSE recommends a minimum 25% sample inspection rate for general installations, with 100% inspection of all critical, safety-related, and first-of-type installations to ensure consistent quality.',
  },
  {
    id: 6,
    question: 'What is progressive verification in installation quality management?',
    options: [
      'Checking work only when complete',
      'Systematic quality checks at defined stages throughout the installation process',
      'Relying on final commissioning to identify issues',
      'Random spot checks by management',
    ],
    correctAnswer: 1,
    explanation:
      'Progressive verification involves systematic quality checks at defined stages throughout installation, ensuring defects are identified and corrected early when remediation is simpler and cheaper.',
  },
  {
    id: 7,
    question: 'What should be verified during a cable installation quality check?',
    options: [
      'Cable colour only',
      'Correct cable type/size, support spacing, bend radii, segregation, labelling, and termination quality',
      'Cable length only',
      'Manufacturer label only',
    ],
    correctAnswer: 1,
    explanation:
      'Cable quality checks should verify: correct cable type and CSA, proper support spacing per BS 7671, minimum bend radii maintained, correct segregation, accurate labelling, and termination quality including torque verification.',
  },
  {
    id: 8,
    question: 'How should photographic quality records be organised?',
    options: [
      'Random order in a single folder',
      'By date only',
      'Systematically by location/system with clear naming convention, metadata, and cross-reference to drawings',
      'Kept on personal mobile phones',
    ],
    correctAnswer: 2,
    explanation:
      'Photographic records should be systematically organised by location and system, use clear naming conventions, include metadata (date, location, description), and be cross-referenced to drawings and inspection records.',
  },
  {
    id: 9,
    question: "What is the purpose of a 'snagging list' in installation quality management?",
    options: [
      'To list all materials used',
      'To document defects requiring remediation before handover',
      'To record working hours',
      'To list all operatives on site',
    ],
    correctAnswer: 1,
    explanation:
      'A snagging list documents defects, incomplete works, and items requiring remediation identified during quality inspections. Items must be actioned, re-inspected, and signed off before handover acceptance.',
  },
  {
    id: 10,
    question: 'What supervision documentation should be maintained for quality assurance?',
    options: [
      'No documentation required',
      'Supervisor names only',
      'Supervision logs showing coverage, inspections conducted, issues identified, and corrective actions taken',
      'Only accident reports',
    ],
    correctAnswer: 2,
    explanation:
      'Quality supervision documentation should include: daily supervision logs, areas and operatives supervised, inspections conducted, issues identified, corrective actions taken, and verification of remedial works.',
  },
  {
    id: 11,
    question: 'When should first-of-type installation approval be obtained?',
    options: [
      'At project completion',
      'Before mass installation begins, with formal approval documented',
      'When convenient',
      'Only if requested by client',
    ],
    correctAnswer: 1,
    explanation:
      'First-of-type approval must be obtained before mass installation begins. The exemplar installation is formally inspected and approved, establishing the quality benchmark for all subsequent installations.',
  },
  {
    id: 12,
    question: 'What role do manufacturer installation instructions play in workmanship standards?',
    options: [
      'They are optional guidance only',
      'They override all other standards',
      'They form part of the contractual requirement and non-compliance invalidates warranties',
      'They are only relevant for complex equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Manufacturer installation instructions typically form contractual requirements. Non-compliance can invalidate warranties, void certifications, and create liability issues. Instructions should be on-site and followed precisely.',
  },
];

const faqs = [
  {
    question: 'What is the difference between BSRIA and CIBSE workmanship guidance?',
    answer:
      'BSRIA provides detailed illustrated workmanship standards (BG 55/2020 for electrical, BG 56/2020 for mechanical) with photographic examples of acceptable and unacceptable work. CIBSE provides broader design and installation guidance through publications like CIBSE Guide M (Maintenance Engineering) and technical memoranda. Both are complementary - BSRIA for visual quality benchmarks, CIBSE for technical specifications and procedures.',
  },
  {
    question: 'How do I determine appropriate supervision ratios for a project?',
    answer:
      'Supervision ratios depend on: installation complexity (1:10 for complex M&E, 1:15-20 for standard work), operative experience level, site conditions, specification requirements, and programme pressures. High-risk activities (confined spaces, live working) require dedicated supervision. Consider supervisor competence too - supervisors need technical knowledge and inspection training.',
  },
  {
    question: 'What should I do if quality defects are found after work is covered up?',
    answer:
      'Document the defect with photographs before and after opening up. Investigate root cause - was it specification, supervision, workmanship, or inspection failure? Record costs of remediation for cost tracking. Implement corrective actions to prevent recurrence. Update inspection procedures if necessary. Consider whether similar concealed work elsewhere needs opening up for inspection.',
  },
  {
    question: 'How detailed should installation checklists be?',
    answer:
      'Checklists should be detailed enough to ensure consistent inspection but practical to complete. Include specific checkpoints relevant to the installation type, reference applicable standards and specifications, provide clear pass/fail criteria, include space for notes and photographs, and require formal sign-off. Avoid being so detailed that inspections become superficial box-ticking exercises.',
  },
  {
    question: "What is the contractor's responsibility for subcontractor quality?",
    answer:
      'The principal contractor is responsible for all subcontractor quality under JCT and NEC contracts. This includes: pre-qualifying subcontractors for competence, flowing down quality requirements contractually, supervising and inspecting subcontractor work, addressing defects regardless of who installed, and maintaining quality records for all works including subcontract packages.',
  },
  {
    question: 'How should quality audits be structured?',
    answer:
      'Quality audits should be structured around: sampling methodology (random, targeted, or combination), defined inspection criteria tied to specifications, competent auditors independent of the work being audited, standardised scoring/rating systems, documented findings with photographic evidence, corrective action tracking, and trend analysis to identify systemic issues. Regular audits (weekly/fortnightly) are more effective than infrequent comprehensive reviews.',
  },
];

const HNCModule5Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 4"
            title="Installation Quality"
            description="Workmanship standards, supervision requirements, quality audits, and progressive verification in building services installation."
            tone="purple"
          />

          <TLDR
            points={[
              "Installation quality is the gap between design intent and installed reality — closed by workmanship standards, supervision and progressive verification.",
              "Workmanship standards documented: cable installation methods, torque values, labelling conventions, fixing standards, segregation distances.",
              "Supervision: ratio of working supervisor to operatives 1:8 typical; foreman + chargehand structure for larger gangs.",
              "Quality audits: weekly site walk-rounds by PM with QA inspector; findings logged and tracked to closure.",
              "Progressive verification: BS 7671 initial verification during erection AND on completion — same principle for mechanical and BMS.",
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.1.1 (Good workmanship)"
            clause="Good workmanship by competent persons or persons under their supervision and proper materials shall be used in the erection of the electrical installation."
            meaning={
              <>
                BS 7671 is explicit that workmanship is part of compliance, not separate from it. A correctly designed installation badly installed is non-compliant. Reg 134.1.1 places the duty on you as the person responsible for the installation; supervision of less experienced operatives is the practical means.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 134.1.1."
          />


          <LearningOutcomes
            outcomes={[
              'Apply BSRIA and CIBSE workmanship standards to M&E installations',
              'Determine appropriate supervision ratios for different work types',
              'Plan and conduct quality walk-down inspections effectively',
              'Develop installation checklists for consistent quality verification',
              'Maintain photographic and documentary quality records',
              'Implement progressive verification throughout installation phases',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Workmanship Standards">
            <p>
              Workmanship standards provide objective benchmarks for assessing installation quality.
              In building services, BSRIA and CIBSE publications establish industry-recognised
              criteria that enable consistent quality assessment across different contractors,
              sites, and inspection personnel.
            </p>
            <p>
              <strong>Key BSRIA publications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BG 55/2020:</strong> Illustrated Guide to Electrical Building Services
                (containment, wiring, accessories)
              </li>
              <li>
                <strong>BG 56/2020:</strong> Illustrated Guide to Mechanical Building Services
                (pipework, ductwork, plant)
              </li>
              <li>
                <strong>BG 29:</strong> Pre-Commission Cleaning of Pipework Systems
              </li>
              <li>
                <strong>BG 8:</strong> Model Specifications for BMS
              </li>
            </ul>
            <p>
              <strong>BSRIA workmanship assessment approach — good vs poor practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable tray runs — Good:</strong> Level, aligned, consistent fixings, proper
                joints
              </li>
              <li>
                <strong>Cable tray runs — Poor:</strong> Sagging, misaligned, mixed fixing types
              </li>
              <li>
                <strong>Conduit bends — Good:</strong> Smooth radius, no kinks, consistent spacing
              </li>
              <li>
                <strong>Conduit bends — Poor:</strong> Kinked, varying radii, uneven fixing centres
              </li>
              <li>
                <strong>Accessory mounting — Good:</strong> Level, secure, consistent heights,
                correct orientation
              </li>
              <li>
                <strong>Accessory mounting — Poor:</strong> Crooked, loose, varying heights across
                room
              </li>
              <li>
                <strong>Cable terminations — Good:</strong> Correct torque, neat dressing, proper
                identification
              </li>
              <li>
                <strong>Cable terminations — Poor:</strong> Over/under-tightened, untidy, missing
                labels
              </li>
              <li>
                <strong>Distribution boards — Good:</strong> Tidy wiring, clear labelling, circuits
                identified
              </li>
              <li>
                <strong>Distribution boards — Poor:</strong> Tangled cables, illegible labels,
                unknown circuits
              </li>
            </ul>
            <p>
              <strong>CIBSE quality guidance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CIBSE Guide M:</strong> Maintenance Engineering and Management -
                installation for maintainability
              </li>
              <li>
                <strong>CIBSE Guide W:</strong> Water Distribution Systems - pipework quality
                standards
              </li>
              <li>
                <strong>CIBSE TM52:</strong> Thermal Performance - installation affecting energy
                performance
              </li>
              <li>
                <strong>CIBSE Commissioning Codes:</strong> A-R series covering all services
              </li>
            </ul>
            <p>
              <strong>Contractual status:</strong> BSRIA and CIBSE standards are typically specified
              in contract documents. Non-compliance constitutes a contractual breach requiring
              remediation at contractor cost.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Supervision Requirements">
            <p>
              Effective supervision is fundamental to installation quality. The supervisor acts as
              the primary quality control mechanism, ensuring work complies with specifications,
              identifying issues early, and providing technical guidance to operatives.
            </p>
            <p>
              <strong>Complex M&E work (ratio 1:8 to 1:12):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main plant rooms</li>
              <li>Distribution boards</li>
              <li>BMS integration</li>
              <li>Commissioning activities</li>
            </ul>
            <p>
              <strong>Standard installation (ratio 1:15 to 1:20):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Containment runs</li>
              <li>General wiring</li>
              <li>Accessory installation</li>
              <li>Repetitive fit-out</li>
            </ul>
            <p>
              <strong>High-risk activities (ratio 1:4 to 1:6):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Live working</li>
              <li>Confined spaces</li>
              <li>Working at height</li>
              <li>HV installations</li>
            </ul>
            <p>
              <strong>Supervisor competence requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Technical knowledge:</strong> NVQ Level 3 / AM2, relevant trade background
              </li>
              <li>
                <strong>Regulatory awareness:</strong> BS 7671:2018+A4:2026, Building Regulations
              </li>
              <li>
                <strong>Quality management:</strong> Quality inspection training, ITP understanding
              </li>
              <li>
                <strong>Health and safety:</strong> SMSTS/SSSTS, risk assessment competence
              </li>
              <li>
                <strong>Documentation:</strong> Record keeping, report writing ability
              </li>
            </ul>
            <p>
              <strong>Supervision documentation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Daily log:</strong> Areas supervised, operatives present, work completed
              </li>
              <li>
                <strong>Inspection record:</strong> Checks conducted, results, any defects
              </li>
              <li>
                <strong>Issue log:</strong> Problems identified, actions taken, resolution
              </li>
              <li>
                <strong>Toolbox talks:</strong> Topics covered, attendees, signed register
              </li>
            </ul>
            <p>
              <strong>Quality principle:</strong> Supervision is preventative quality control.
              Adequate supervision prevents defects; inadequate supervision merely discovers them
              later at higher cost.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Quality Walk-Downs and Audits">
            <p>
              Quality walk-downs and audits provide structured verification that installation work
              meets specifications. Walk-downs are physical inspections of installed work; audits
              are systematic reviews of quality systems, procedures, and records.
            </p>
            <p>
              <strong>Critical walk-down timing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Before ceiling closure:</strong> Verify above-ceiling services, supports,
                fire stopping
              </li>
              <li>
                <strong>Before wall lining:</strong> Check concealed wiring, back boxes, first fix
              </li>
              <li>
                <strong>Before floor screed:</strong> Inspect underfloor services, conduit routes
              </li>
              <li>
                <strong>Before riser closure:</strong> Verify vertical containment, firestopping
              </li>
              <li>
                <strong>Before energisation:</strong> Final check of all accessible installations
              </li>
            </ul>
            <p>
              <strong>Quality walk-down process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Preparation:</strong> Review drawings, specs, previous snags — Checklist,
                reference documents
              </li>
              <li>
                <strong>Inspection:</strong> Systematic area-by-area review — Defect notes,
                photographs
              </li>
              <li>
                <strong>Documentation:</strong> Complete snagging list, categorise items — Formal
                snag report
              </li>
              <li>
                <strong>Remediation:</strong> Contractor addresses defects — Remediation evidence
              </li>
              <li>
                <strong>Close-out:</strong> Re-inspect, verify remediation — Signed-off snag list
              </li>
            </ul>
            <p>
              <strong>Process audit questions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Are quality procedures being followed?</li>
              <li>Are records being maintained?</li>
              <li>Is supervision adequate?</li>
              <li>Are hold points being observed?</li>
            </ul>
            <p>
              <strong>Product audit questions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Does installed work meet specification?</li>
              <li>Are materials as approved?</li>
              <li>Is workmanship acceptable?</li>
              <li>Are test results compliant?</li>
            </ul>
            <p>
              <strong>Defect categorisation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category A (Critical):</strong> Safety risk or major non-compliance - stop
                work, immediate remedy
              </li>
              <li>
                <strong>Category B (Major):</strong> Significant non-compliance - remedy before
                proceeding
              </li>
              <li>
                <strong>Category C (Minor):</strong> Cosmetic or minor deviation - remedy before
                handover
              </li>
              <li>
                <strong>Observation:</strong> Not a defect but improvement opportunity
              </li>
            </ul>
            <p>
              <strong>Real-world example:</strong> On a London hospital project, systematic
              walk-downs before ceiling closure identified 340 containment support deficiencies.
              Remediation took 3 days. Had these been found after ceiling installation, remediation
              would have required ceiling removal, costing 6 weeks and £180,000.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Installation Checklists and Progressive Verification">
            <p>
              Installation checklists provide systematic frameworks for quality verification,
              ensuring consistent inspection regardless of who conducts it. Progressive verification
              ensures quality is built in throughout installation, not checked only at completion.
            </p>
            <p>
              <strong>Electrical installation checklist elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Containment:</strong> Type correct, fixing centres, level/plumb, earthing
                continuity, fire barriers
              </li>
              <li>
                <strong>Cables:</strong> Type/CSA per schedule, bend radii, segregation,
                identification, damage-free
              </li>
              <li>
                <strong>Distribution boards:</strong> Location correct, mounting height, labelling,
                circuit schedules, spare ways
              </li>
              <li>
                <strong>Accessories:</strong> Height/position, type correct, fixing secure, level,
                no damage
              </li>
              <li>
                <strong>Terminations:</strong> Correct terminals, torque verified, insulation
                intact, dressing neat
              </li>
              <li>
                <strong>Luminaires:</strong> Position per drawing, suspension secure, emergency
                function, lamp type
              </li>
            </ul>
            <p>
              <strong>Progressive verification stages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. First Fix Verification:</strong> Containment routes, back boxes, cable
                runs before covering
              </li>
              <li>
                <strong>2. Distribution Verification:</strong> Boards installed, cables terminated,
                circuit identification
              </li>
              <li>
                <strong>3. Second Fix Verification:</strong> Accessories, luminaires, final
                connections
              </li>
              <li>
                <strong>4. Pre-Commissioning Verification:</strong> Visual inspection complete,
                ready for testing
              </li>
            </ul>
            <p>
              <strong>What to photograph:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All concealed installations</li>
              <li>Fire barrier installations</li>
              <li>Complex terminations</li>
              <li>Any variations from drawings</li>
              <li>First-of-type installations</li>
              <li>Defects before and after repair</li>
            </ul>
            <p>
              <strong>Photo standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Include location reference board</li>
              <li>Context shot plus detail shot</li>
              <li>Consistent file naming convention</li>
              <li>Metadata with date/time/location</li>
              <li>Cross-reference to ITP/drawings</li>
              <li>Stored in project QA system</li>
            </ul>
            <p>
              <strong>First-of-type approval process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Install single exemplar of repetitive element (e.g., one
                room, one floor)
              </li>
              <li>
                <strong>Step 2:</strong> Contractor self-inspection against specification
              </li>
              <li>
                <strong>Step 3:</strong> Joint inspection with consultant/client representative
              </li>
              <li>
                <strong>Step 4:</strong> Formal sign-off documenting approved standard
              </li>
              <li>
                <strong>Step 5:</strong> Photographic record as benchmark for subsequent work
              </li>
              <li>
                <strong>Step 6:</strong> Proceed with mass installation referencing approved
                exemplar
              </li>
            </ul>
            <p>
              <strong>Cost of quality:</strong> Studies show prevention activities (first-of-type,
              progressive verification) cost approximately 3% of installation value. Failure costs
              (rework, delays, claims) average 10-15% on projects with poor quality management.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Supervision planning:</strong> A commercial fit-out has 45
              electrical operatives installing general distribution and lighting. How many
              supervisors are required?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work type: Standard installation (containment, wiring, accessories)</li>
              <li>Recommended ratio: 1:15 to 1:20</li>
              <li>
                Using 1:15 (conservative): 45 ÷ 15 = <strong>3 supervisors</strong>
              </li>
              <li>
                Using 1:20 (minimum): 45 ÷ 20 = 2.25 = <strong>3 supervisors</strong>
              </li>
              <li>
                <strong>Answer:</strong> Minimum 3 supervisors required
              </li>
              <li>
                Note: If any complex work (main switchgear, BMS), increase ratio for those areas
              </li>
            </ul>
            <p>
              <strong>Example 2 — Quality inspection sampling:</strong> A project has 200 identical
              office lighting installations. How many should be formally inspected?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>CIBSE recommendation: 25% minimum sample for repetitive work</li>
              <li>
                Sample size: 200 × 0.25 = <strong>50 installations</strong>
              </li>
              <li>100% first-of-type (first installation)</li>
              <li>Increased sampling if defects found</li>
              <li>Random selection across all areas</li>
              <li>
                <strong>Answer:</strong> 50 formal inspections plus first-of-type approval
              </li>
            </ul>
            <p>
              <strong>Example 3 — Cost of quality analysis:</strong> A containment defect found
              after ceiling installation. Original installation cost £2,000. What is the likely
              remediation cost?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Remove ceiling tiles: 2 days labour @ £400/day = £800</li>
              <li>Scaffold/access: £600</li>
              <li>Containment remediation: £500</li>
              <li>Reinstate ceiling: 1 day @ £400 = £400</li>
              <li>Re-inspection: £200</li>
              <li>
                Total remediation cost: <strong>£2,500</strong>
              </li>
              <li>
                Cost multiplier: 2,500 ÷ 2,000 = <strong>1.25×</strong> original cost
              </li>
              <li>Had defect been found before ceiling: remediation ~£300</li>
              <li>
                <strong>Early detection saving:</strong> £2,200 (88% saving)
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Quality walk-down checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review specification and approved drawings before walk-down</li>
              <li>Take previous snag list to verify closures</li>
              <li>Work systematically area-by-area, system-by-system</li>
              <li>Photograph all defects with location reference</li>
              <li>Categorise defects by severity (A/B/C)</li>
              <li>Issue formal report within 24 hours</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Supervision ratio complex work: <strong>1:10</strong>
              </li>
              <li>
                Supervision ratio standard work: <strong>1:15-20</strong>
              </li>
              <li>
                Sample inspection rate: <strong>25% minimum</strong>
              </li>
              <li>
                First-of-type: <strong>100% inspection</strong>
              </li>
              <li>
                Quality cost prevention: <strong>~3% of value</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common quality failures"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Inadequate supervision:</strong> Work proceeds without checking
                </li>
                <li>
                  <strong>Late inspection:</strong> Defects found after covering up
                </li>
                <li>
                  <strong>No first-of-type:</strong> Errors repeated across installation
                </li>
                <li>
                  <strong>Poor records:</strong> No evidence of compliance
                </li>
                <li>
                  <strong>Snag list drift:</strong> Defects not closed out
                </li>
              </ul>
            }
            doInstead="Resource supervision to BSRIA/CIBSE ratios, walk down progressively before each cover-up, lock in a first-of-type benchmark, photograph and file every concealed run, and chase every snag to formal close-out."
          />

          <SectionRule />

          <Scenario
            title="Cable installation defects discovered at testing stage"
            situation={
              <>
                At first-fix complete, the QA inspector finds: cables sharing containment with data cables (segregation breach), cable ties over-tight causing insulation deformation, and no labelling on circuit cables in the riser. Across the floor, 800m of cable needs reworking. Cost: £15k labour. Programme impact: 1 week.
              </>
            }
            whatToDo={
              <>
                Stop second-fix until first-fix is signed off floor by floor. Re-brief electrical operatives on workmanship standards: segregation per BS 6701, cable tie spacing and tension, labelling at every termination. Implement a workmanship sample audit at each floor — first 50m installed by each operative inspected, defects rectified before they continue. Update the ITP to include a workmanship hold point at first-fix complete on each floor.
              </>
            }
            whyItMatters={
              <>
                Workmanship defects compound — the rework cost on first-fix is small; the rework cost when the same defects are buried under second-fix and ceilings is enormous. Catching defects at the workface is the cheapest place to fix them. Supervision is investment, not cost.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Workmanship = the gap between design and reality — closed by standards, supervision, verification.",
              "Documented workmanship standards: methods, torques, labels, fixings, segregation.",
              "Supervision ratio 1:8 typical; foreman + chargehand structure for larger gangs.",
              "Weekly QA walk-rounds with PM and inspector; findings tracked to closure.",
              "Progressive verification: catch defects at workface, not at handover.",
              "BS 7671 Reg 134.1.1: good workmanship is a regulatory requirement.",
              "Sample audit of first work by new operatives before letting them produce at volume.",
              "Workmanship discipline is project margin — rework cost compounds with time.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Quality management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Testing and verification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section4_4;
