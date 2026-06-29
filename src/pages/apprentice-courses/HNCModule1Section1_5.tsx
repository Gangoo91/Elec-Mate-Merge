/**
 * Module 1 · Section 1 · Subsection 5 — PUWER and Work Equipment
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The Provision and Use of Work Equipment Regulations 1998. Engineer-in-training perspective:
 *   how PUWER bites on test instruments, drills, MEWPs, lifting gear and the building&rsquo;s own
 *   plant once you take it into service.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'PUWER and Work Equipment - HNC Module 1 Section 1.5';
const DESCRIPTION =
  'Comprehensive guide to the Provision and Use of Work Equipment Regulations 1998 (PUWER) for building services engineers, covering equipment selection, maintenance, inspection, guarding, and training requirements.';

const quickCheckQuestions = [
  {
    id: 'puwer-definition',
    question: "Under PUWER, what constitutes 'work equipment'?",
    options: [
      'Only machinery with moving parts that could cause injury',
      'Only equipment owned and supplied by the employer',
      'Any machinery, appliance, apparatus, tool or installation used at work',
      'Only powered tools and machines, excluding hand tools',
    ],
    correctIndex: 2,
    explanation:
      "PUWER defines work equipment very broadly as 'any machinery, appliance, apparatus, tool or installation for use at work'. This includes everything from a simple hand tool to complex machinery.",
  },
  {
    id: 'puwer-suitability',
    question: 'Who has the primary duty to ensure work equipment is suitable under PUWER?',
    options: [
      'The employer',
      'The employee using it',
      'The equipment manufacturer',
      'The Health and Safety Executive',
    ],
    correctIndex: 0,
    explanation:
      'PUWER places the primary duty on employers to ensure that work equipment is suitable for the purpose for which it is used or provided, and for the conditions in which it will be used.',
  },
  {
    id: 'puwer-inspection',
    question: 'When must work equipment be inspected under PUWER?',
    options: [
      'Only once, at the point of purchase, before it is put into service',
      'After installation, after assembly, and at suitable intervals',
      'Only when a defect has already been reported by a user',
      'Annually on a fixed date regardless of use or conditions',
    ],
    correctIndex: 1,
    explanation:
      'PUWER requires inspection after installation and before first use, after assembly at a new location, and at suitable intervals depending on the nature of the equipment and conditions of use.',
  },
  {
    id: 'puwer-guards',
    question: 'What is the hierarchy of guarding measures under PUWER?',
    options: [
      'PPE first, then fixed guards, then training and supervision',
      'Fixed guards, then other guards/protection devices, then PPE',
      'Warning signs first, then interlocks, then fixed guards',
      'Training and supervision first, then guards only if an incident occurs',
    ],
    correctIndex: 1,
    explanation:
      'PUWER establishes a hierarchy: fixed enclosing guards where practicable, then other guards or protection devices, then information/instruction/training/supervision. PPE is always the last resort.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What year did the Provision and Use of Work Equipment Regulations come into force?',
    options: [
      '1992',
      '1998',
      '2002',
      '2005',
    ],
    correctAnswer: 1,
    explanation:
      'PUWER 1998 came into force on 5 December 1998, replacing the earlier 1992 regulations. It implements European Directive 89/655/EEC as amended by Directive 95/63/EC.',
  },
  {
    id: 2,
    question: 'Which of the following is NOT considered work equipment under PUWER?',
    options: [
      'A multifunction tester',
      'A cordless drill',
      'Livestock',
      'A ladder',
    ],
    correctAnswer: 2,
    explanation:
      'PUWER specifically excludes livestock from the definition of work equipment. However, it covers virtually all other equipment used at work, including hand tools, power tools, ladders, test equipment, and machinery.',
  },
  {
    id: 3,
    question: 'Under PUWER Regulation 4, equipment must be suitable for which of the following?',
    options: [
      'The purchase price and the warranty period only',
      'The preferences of the individual operator using it',
      'The age of the equipment and its remaining service life only',
      'The purpose used, conditions of use, and any foreseeable risk',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 4 requires equipment to be suitable for the purpose for which it is used, suitable for the conditions of use (location, environment), and account for foreseeable risks to health and safety.',
  },
  {
    id: 4,
    question: 'What must an employer ensure regarding maintenance under PUWER Regulation 5?',
    options: [
      'Equipment is maintained in efficient state, working order and good repair',
      'Maintenance is carried out only by the original equipment manufacturer',
      'Equipment is replaced with new units every five years regardless of condition',
      'Maintenance is performed only after a breakdown has occurred',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 5 requires employers to ensure work equipment is maintained in an efficient state, in efficient working order and in good repair. Where there is a maintenance log, it must be kept up to date.',
  },
  {
    id: 5,
    question:
      'A building services engineer using a 110V angle grinder on a construction site must ensure the grinder has:',
    options: [
      "A current calibration certificate traceable to national standards",
      "Appropriate guards, a dead man's switch, and is properly maintained",
      "An RCD permanently wired into its own internal circuitry",
      "A printed risk assessment attached to the body of the tool",
    ],
    correctAnswer: 1,
    explanation:
      "Under PUWER, the grinder must have appropriate guards to prevent contact with the rotating disc, a hold-to-run (dead man's) control device, proper maintenance, and be suitable for site conditions. 110V CTE is required on construction sites.",
  },
  {
    id: 6,
    question:
      'PUWER Regulation 9 requires that adequate training is provided. This training must include:',
    options: [
      'The cost of the equipment and its expected replacement date',
      'The commercial terms and conditions of supply',
      'Methods of use, risks involved, and precautions to take',
      'A written examination that all users must pass before starting work',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 9 requires training to include methods of using the equipment, any risks arising from use, and precautions to be taken. This applies regardless of experience level.',
  },
  {
    id: 7,
    question:
      'What type of control does PUWER require to prevent accidental starting of dangerous machinery?',
    options: [
      'A touch-sensitive control that starts on the lightest contact',
      'A single shared control operating several machines at once',
      'A voice-activated control that responds to a spoken command',
      'A deliberate action control requiring intentional operation',
    ],
    correctAnswer: 3,
    explanation:
      'PUWER Regulation 14 requires controls to require a deliberate action to operate. This prevents accidental starting due to unintentional contact with controls.',
  },
  {
    id: 8,
    question: 'Under PUWER, when must a mobile work platform (MEWP) be inspected?',
    options: [
      'Before first use at each site, and at intervals not exceeding 6 months',
      'Once a year only, on the anniversary of its first use',
      'Only when it is moved between two different companies',
      'Every 12 months, with no requirement for daily pre-use checks',
    ],
    correctAnswer: 0,
    explanation:
      'MEWPs must be thoroughly examined before first use, after assembly at each new site, and at intervals not exceeding 6 months (or in accordance with an examination scheme). Daily pre-use checks are also required.',
  },
  {
    id: 9,
    question: "What is the employer's duty regarding specific risks under PUWER Regulation 7?",
    options: [
      'Display a warning sign and otherwise allow any worker to use the equipment',
      'Ensure use is restricted to designated persons and repairs by competent persons only',
      'Provide PPE to all workers so that anyone may safely operate it',
      'Limit operation to daylight hours to reduce the risk of error',
    ],
    correctAnswer: 1,
    explanation:
      'Where specific risks exist, Regulation 7 requires employers to ensure use is restricted to designated persons for that purpose, and that repairs, modifications, maintenance or servicing is carried out only by specifically designated competent persons.',
  },
  {
    id: 10,
    question:
      'A multifunction tester used for verification testing falls under PUWER. What must the employer ensure?',
    options: [
      'Only that it carries a current UKCA or CE mark from the manufacturer',
      'Only that it is PAT tested at the same interval as portable power tools',
      'It is suitable, maintained, calibrated, and users are trained in its safe use',
      'Only that it is stored in a locked cabinet between uses',
    ],
    correctAnswer: 2,
    explanation:
      'Test equipment under PUWER must be suitable for the tests being performed, properly maintained and calibrated (typically annually), and users must be trained in its correct and safe use including understanding limitations.',
  },
  {
    id: 11,
    question: 'What does PUWER Regulation 11 require regarding dangerous parts of machinery?',
    options: [
      'A warning label fixed close to each dangerous part of the machine',
      'Operators to wear cut-resistant gloves when near moving parts',
      'Dangerous parts to be painted a high-visibility colour',
      'Effective measures to prevent contact with dangerous parts or arrest movement before contact',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 11 requires effective measures to prevent access to dangerous parts, or to stop the movement of dangerous parts before any part of a person can reach them.',
  },
  {
    id: 12,
    question: 'Under PUWER, who can carry out inspections of work equipment?',
    options: [
      'A competent person with appropriate knowledge, training and experience',
      'Only the original manufacturer of the equipment',
      'Any employee, provided they are over eighteen years of age',
      'Only an HSE inspector appointed for the purpose',
    ],
    correctAnswer: 0,
    explanation:
      'PUWER requires inspections to be carried out by a competent person - someone with sufficient training and experience or knowledge to enable them to detect defects and assess their significance.',
  },
];

const faqs = [
  {
    question: 'Does PUWER apply to my own tools that I bring to work?',
    answer:
      'Yes. PUWER applies to all work equipment used at work, regardless of ownership. If you bring your own tools to use for work purposes, your employer must still ensure they are suitable, maintained, and safe. Many employers require personal tools to undergo the same inspection regime as company equipment, or restrict their use entirely.',
  },
  {
    question: 'How often should portable power tools be inspected?',
    answer:
      "PUWER does not specify fixed intervals - it requires inspection at 'suitable intervals'. For portable power tools in construction/building services, industry practice typically includes: user checks before each use (visual inspection), formal visual inspection weekly/monthly by a competent person, and combined inspection and PAT testing at intervals determined by risk assessment (commonly 3-6 months for 110V site equipment).",
  },
  {
    question: 'What is the relationship between PUWER and LOLER for lifting equipment?',
    answer:
      'PUWER covers all work equipment including lifting equipment, setting general requirements. LOLER (Lifting Operations and Lifting Equipment Regulations 1998) provides additional, more specific requirements for lifting equipment and operations. Both regulations apply - LOLER supplements but does not replace PUWER requirements for lifting equipment.',
  },
  {
    question: 'Can an employer be prosecuted for PUWER breaches even if no accident occurs?',
    answer:
      'Yes. PUWER creates absolute duties in many areas - the employer must comply regardless of whether an accident results. HSE can and does prosecute for breaches such as unguarded machinery, lack of training, inadequate maintenance, or failure to inspect, even where no injury has occurred.',
  },
  {
    question: 'What records should be kept for PUWER compliance?',
    answer:
      'Essential records include: maintenance logs and records of repairs, inspection reports and certificates (especially for equipment requiring statutory thorough examination), training records for equipment users, risk assessments relating to equipment use, and manufacturer instructions/manuals. Keep records for at least 2 years after equipment disposal, though many organisations retain them longer.',
  },
];

const HNCModule1Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1.1.5"
            title="PUWER and Work Equipment"
            description="The Provision and Use of Work Equipment Regulations 1998 - essential requirements for building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You will treat every piece of work equipment on a project — Megger, drill, MEWP, lifting accessory, even the client&rsquo;s plant once you operate it — as a PUWER asset.',
              'You can identify the regulations that bite on building services: Reg 5 (suitability), Reg 6 (maintenance), Reg 8 (information/instruction), Reg 9 (training), Regs 11-19 (specific hazards).',
              'You document &ldquo;suitable&rdquo; under Reg 4 — fit for the task, the place and the user — and reject equipment that fails any leg.',
              'You schedule LOLER thorough examinations alongside PUWER inspections and do not conflate the two regimes.',
            ]}
          />

          <RegsCallout
            source="PUWER 1998 — Regulation 4(1)"
            clause="Every employer shall ensure that work equipment is so constructed or adapted as to be suitable for the purpose for which it is used or provided."
            meaning={
              <>
                &ldquo;Suitable&rdquo; under Reg 4 has three legs — fit for the task, fit for the
                place of use, and fit for the user. As an HNC supervisor your sign-off on a piece
                of test gear or access equipment is implicitly a Reg 4 declaration. Document it.
              </>
            }
            cite="Source: Provision and Use of Work Equipment Regulations 1998, Reg 4(1) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Define work equipment and understand PUWER's scope and application",
              "Explain employer duties for equipment selection and suitability",
              "Describe maintenance and inspection requirements under PUWER",
              "Identify training and competence requirements for equipment users",
              "Understand guarding requirements and the hierarchy of protection",
              "Apply PUWER requirements to building services tools and equipment",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Definition of Work Equipment and PUWER Scope</ContentEyebrow>

          <ConceptBlock title="Definition of Work Equipment and PUWER Scope">
            <p>
            The Provision and Use of Work Equipment Regulations 1998 (PUWER) establishes
            fundamental requirements to ensure that work equipment is safe throughout its working
            life. These regulations implement European Directive requirements and apply across all
            industry sectors.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            What is Work Equipment?
            </p>
            <p className="text-sm text-white mb-3">
            PUWER defines <strong>work equipment</strong> as: "any machinery, appliance,
            apparatus, tool or installation for use at work (whether exclusively or not)". This
            definition is deliberately broad and includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Hand tools:</strong> Screwdrivers, spanners, hammers, chisels
            </li>
            <li>
            <strong>Power tools:</strong> Drills, grinders, saws, heat guns
            </li>
            <li>
            <strong>Electrical equipment:</strong> Extension leads, transformers, distribution
            units
            </li>
            <li>
            <strong>Test instruments:</strong> Multifunction testers, clamp meters, thermal
            imagers
            </li>
            <li>
            <strong>Access equipment:</strong> Ladders, stepladders, scaffolding, MEWPs
            </li>
            <li>
            <strong>Fixed installations:</strong> Machine tools, lifts, escalators
            </li>
            <li>
            <strong>Vehicles:</strong> When used as work equipment (e.g., forklift trucks)
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key PUWER Regulations</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Reg 4</strong> — Requirement: Suitability of work equipment</li>
            <li><strong>Reg 5</strong> — Requirement: Maintenance</li>
            <li><strong>Reg 6</strong> — Requirement: Inspection</li>
            <li><strong>Reg 7</strong> — Requirement: Specific risks</li>
            <li><strong>Reg 8</strong> — Requirement: Information and instructions</li>
            <li><strong>Reg 9</strong> — Requirement: Training</li>
            <li><strong>Regs 11-24</strong> — Requirement: Dangerous parts, controls, stability, lighting, markings</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Who Does PUWER Apply To?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Employers:</strong> Primary duty holders - must ensure compliance
            </li>
            <li>
            <strong>Self-employed persons:</strong> Same duties as employers for their own
            equipment
            </li>
            <li>
            <strong>Persons in control of equipment:</strong> Those who control non-domestic
            premises
            </li>
            <li>
            <strong>Users and supervisors:</strong> Duties to use correctly and report defects
            </li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Important:</strong> PUWER applies to privately owned equipment used for work.
            If an electrician uses their own tools at work, the employer still has duties to
            ensure those tools are safe.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Selection and Suitability Requirements</ContentEyebrow>

          <ConceptBlock title="Selection and Suitability Requirements">
            <p>
            PUWER Regulation 4 requires that work equipment is suitable for the purpose for which
            it is used or provided. This is a fundamental requirement that must be satisfied
            before equipment is put into use.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Suitability Considerations (Regulation 4)
            </p>
            <p className="text-sm text-white mb-3">
            Equipment must be suitable having regard to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Initial integrity:</strong> Constructed or adapted to be suitable for the
            purpose
            </li>
            <li>
            <strong>Conditions of use:</strong> The place and environment where it will be
            used
            </li>
            <li>
            <strong>Purpose:</strong> The operations for which it will be used
            </li>
            <li>
            <strong>Foreseeable risks:</strong> Any risks to health and safety from its use
            </li>
            </ul>
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Selecting Power Tools
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>110V CTE for construction sites</li>
            <li>Appropriate power rating for task</li>
            <li>Correct tool for the material</li>
            <li>UKCA/CE marking present</li>
            <li>Suitable for environmental conditions</li>
            <li>Ergonomic design for user</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Selecting Test Equipment
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Meets BS EN 61557 requirements</li>
            <li>Appropriate category rating (CAT III/IV)</li>
            <li>Capable of required tests</li>
            <li>Calibration status current</li>
            <li>Suitable accuracy for application</li>
            <li>Leads and probes included</li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Selection Criteria for Building Services Equipment
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Cordless drill</strong> — Key Selection Criteria: Torque, speed, battery capacity. PUWER Considerations: Clutch for torque control, side handle provision</li>
            <li><strong>Angle grinder</strong> — Key Selection Criteria: Disc size, power, disc type. PUWER Considerations: Guard fitted, dead man's switch, anti-vibration</li>
            <li><strong>MFT (tester)</strong> — Key Selection Criteria: Test range, accuracy, features. PUWER Considerations: CAT rating suitable, calibration valid</li>
            <li><strong>Ladder</strong> — Key Selection Criteria: Height, duty rating, material. PUWER Considerations: BS EN 131 compliance, suitable for load</li>
            <li><strong>SDS drill</strong> — Key Selection Criteria: Impact energy, drill diameter capacity. PUWER Considerations: Vibration rating, dust extraction provision</li>
            </ul>
            
            

            <CommonMistake
            title="Unsuitable Equipment Examples"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Domestic vacuum cleaner used for construction dust (not suitable for fine
            particles)
            </li>
            <li>230V power tools on construction sites (110V CTE required)</li>
            <li>
            Standard multimeter for mains testing (needs CAT III/IV rating)
            </li>
            <li>
            Timber ladder for electrical work near live parts (non-conducting required)
            </li>
            <li>Unguarded bench grinder (must have guards and eye shields)</li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> The employer must consider suitability at the point of
            selection AND throughout the equipment's use - conditions may change requiring
            reassessment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Maintenance and Inspection Requirements</ContentEyebrow>

          <ConceptBlock title="Maintenance and Inspection Requirements">
            <p>
            PUWER Regulations 5 and 6 establish requirements for maintenance and inspection. These
            ensure equipment remains in safe working condition throughout its service life and
            that deterioration is detected before it leads to dangerous situations.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Maintenance Requirements (Regulation 5)
            </p>
            <p className="text-sm text-white mb-3">
            Every employer shall ensure that work equipment is maintained in:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Efficient state:</strong> Performs its function effectively
            </li>
            <li>
            <strong>Efficient working order:</strong> Operates correctly and safely
            </li>
            <li>
            <strong>Good repair:</strong> No deterioration affecting safety
            </li>
            </ul>
            <p className="text-sm text-white mt-3">
            Where a maintenance log is appropriate, it must be kept up to date. The type and
            frequency of maintenance depends on:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Manufacturer's recommendations</li>
            <li>Intensity and conditions of use</li>
            <li>Risk from failure or deterioration</li>
            <li>Previous fault history</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Inspection Requirements (Regulation 6)
            </p>
            <p className="text-sm text-white mb-3">Inspection is required where:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            The safety of equipment depends on the installation conditions
            </li>
            <li>
            Equipment is exposed to conditions causing deterioration liable to result in
            danger
            </li>
            </ul>
            <p className="text-sm text-white mt-3">Inspections must be carried out:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>After installation:</strong> Before first use at that location
            </li>
            <li>
            <strong>After assembly:</strong> After assembly at a new site or location
            </li>
            <li>
            <strong>At suitable intervals:</strong> Determined by risk assessment
            </li>
            <li>
            <strong>After exceptional circumstances:</strong> That may have affected safety
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Inspection Regime for Building Services Equipment
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>110V power tools</strong> — User Check: Before each use. Formal Inspection: Weekly/monthly visual + PAT 3-6 monthly. Notes: Higher frequency on construction sites</li>
            <li><strong>Extension leads</strong> — User Check: Before each use. Formal Inspection: Monthly visual + PAT 3-6 monthly. Notes: Check for damage, overheating signs</li>
            <li><strong>Test instruments</strong> — User Check: Before use (proving unit). Formal Inspection: Annual calibration + visual inspection. Notes: Check leads and probes condition</li>
            <li><strong>Ladders</strong> — User Check: Before each use. Formal Inspection: Monthly detailed inspection. Notes: Check rungs, stiles, feet, locking mechanisms</li>
            <li><strong>MEWPs</strong> — User Check: Daily pre-use checks. Formal Inspection: 6-monthly thorough examination (LOLER). Notes: Written report required</li>
            <li><strong>Hand tools</strong> — User Check: Before each use. Formal Inspection: Periodic - risk-based. Notes: Check handles, heads, insulation</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Competent Person for Inspections
            </p>
            <p className="text-sm text-white mb-2">
            Inspections must be carried out by a <strong>competent person</strong> - someone
            with:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Sufficient training and experience or knowledge</li>
            <li>Ability to detect defects or weaknesses</li>
            <li>
            Ability to assess their significance for continued safe use
            </li>
            <li>
            Independence from the work that may be affected by the inspection
            </li>
            </ul>
            

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <p className="text-sm font-medium text-amber-400/90 mb-2">Record Keeping</p>
            <p className="text-sm text-white">
            Where inspection is required under Regulation 6, results must be recorded and kept
            available until the next inspection. Records should include: date, person carrying
            out inspection, equipment identified, defects found, and action taken. For thorough
            examinations under LOLER, specific documentary requirements apply.
            </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
            <strong>Key point:</strong> Maintenance and inspection are complementary but
            different. Maintenance keeps equipment working; inspection verifies it is safe.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Training, Competence, Guards and Protection Devices</ContentEyebrow>

          <ConceptBlock title="Training, Competence, Guards and Protection Devices">
            <p>
            PUWER establishes comprehensive requirements for training users and protecting them
            from dangerous parts of machinery. These regulations work together to ensure both
            competent operation and engineered safety measures.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Information and Instructions (Regulation 8)
            </p>
            <p className="text-sm text-white mb-3">
            Employers must ensure all persons using work equipment have available:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Adequate health and safety information</li>
            <li>Written instructions where appropriate</li>
            <li>
            Information on conditions of use and foreseeable abnormal situations
            </li>
            <li>Conclusions from experience of using the equipment</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Training Requirements (Regulation 9)
            </p>
            <p className="text-sm text-white mb-3">Training must be adequate and must include:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Methods of use:</strong> Correct operation techniques
            </li>
            <li>
            <strong>Risks:</strong> Hazards that may arise from use
            </li>
            <li>
            <strong>Precautions:</strong> Actions to mitigate those risks
            </li>
            </ul>
            <p className="text-sm text-white mt-3">
            This applies to users, supervisors, and managers. Training must be provided before
            use and refreshed when equipment changes, work methods change, or competence
            declines.
            </p>
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Training for Power Tools
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Pre-use inspection procedures</li>
            <li>Correct fitting of accessories</li>
            <li>Safe operating techniques</li>
            <li>Guard adjustment and use</li>
            <li>PPE requirements</li>
            <li>Emergency stop procedures</li>
            <li>Defect reporting</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Training for Test Equipment
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Understanding measurement principles</li>
            <li>Correct connection methods</li>
            <li>Safe isolation procedures</li>
            <li>Interpretation of results</li>
            <li>Limitations of the instrument</li>
            <li>Proving unit use</li>
            <li>Calibration awareness</li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Dangerous Parts of Machinery (Regulation 11)
            </p>
            <p className="text-sm text-white mb-3">
            Where there is risk from contact with dangerous parts, effective measures must be
            taken to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Prevent access to dangerous parts, OR</li>
            <li>
            Stop the movement of dangerous parts before any part of a person can reach them
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Hierarchy of Protection Measures
            </p>
            
            <div className="p-3 rounded bg-green-500/10 border-l-4 border-green-500">
            <p className="text-sm font-medium text-green-400">1. Fixed Enclosing Guards</p>
            <p className="text-sm text-white mt-1">
            Where practicable, use fixed guards that can only be removed with tools. These
            completely enclose the danger zone. Example: guards on bench grinders.
            </p>
            </div>
            <div className="p-3 rounded bg-blue-500/10 border-l-4 border-blue-500">
            <p className="text-sm font-medium text-blue-400">
            2. Other Guards or Protection Devices
            </p>
            <p className="text-sm text-white mt-1">
            Where fixed guards are not practicable: interlocking guards (stop machine when
            opened), adjustable guards, self-adjusting guards, photoelectric devices,
            pressure mats, or two-hand controls.
            </p>
            </div>
            <div className="p-3 rounded bg-amber-500/10 border-l-4 border-amber-500">
            <p className="text-sm font-medium text-amber-400">3. Protection Appliances</p>
            <p className="text-sm text-white mt-1">
            Jigs, holders, push sticks - devices that keep hands away from danger zones
            while allowing the work to proceed.
            </p>
            </div>
            <div className="p-3 rounded bg-purple-500/10 border-l-4 border-purple-500">
            <p className="text-sm font-medium text-purple-400">
            4. Information, Instruction, Training, Supervision
            </p>
            <p className="text-sm text-white mt-1">
            When engineering controls alone cannot provide adequate protection, these must
            supplement (not replace) physical measures.
            </p>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Control Requirements (Regulations 14-18)
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Reg 14</strong> — Requirement: Controls requiring deliberate action. Building Services Example: Dead man's switch on angle grinder</li>
            <li><strong>Reg 15</strong> — Requirement: Start controls. Building Services Example: On/off switch on power tool</li>
            <li><strong>Reg 16</strong> — Requirement: Stop controls. Building Services Example: Trigger release stops drill</li>
            <li><strong>Reg 17</strong> — Requirement: Emergency stop. Building Services Example: E-stop on workshop machinery</li>
            <li><strong>Reg 18</strong> — Requirement: Controls clearly visible/identifiable. Building Services Example: Colour-coded switches, labels</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Specific Risks (Regulation 7)
            </p>
            <p className="text-sm text-white mb-2">
            Where use involves specific risks, employers must ensure:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Use is restricted to persons given the task of using it</li>
            <li>
            Repairs, modifications, maintenance, or servicing only by specifically designated
            persons
            </li>
            </ul>
            <p className="text-sm text-white mt-2">
            Example: Only trained and authorised persons should operate MEWPs or high-voltage
            test equipment.
            </p>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> Guards and protection devices are the first line of
            defence. Training and supervision supplement but never replace engineering controls.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Application in Building Services">
            <p><strong>Case Study: 110V Power Tool System</strong></p>
            <p className="text-sm text-white mb-2">
            A building services contractor implements PUWER compliance for site power tools:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Selection:</strong> All tools rated 110V CTE, UKCA marked, appropriate for
            tasks
            </li>
            <li>
            <strong>Maintenance:</strong> Monthly servicing schedule, replacement of worn
            parts
            </li>
            <li>
            <strong>Inspection:</strong> User pre-use checks (laminated checklist), weekly
            formal inspection, quarterly PAT testing
            </li>
            <li>
            <strong>Training:</strong> Tool induction for all operatives, refresher annually
            </li>
            <li>
            <strong>Records:</strong> Asset register, inspection log, training matrix
            maintained
            </li>
            </ul>
            

            
            <p><strong>Case Study: Multifunction Test Equipment</strong></p>
            <p className="text-sm text-white mb-2">
            Applying PUWER to electrical test instruments:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Suitability:</strong> Instruments meet BS EN 61557, CAT III/IV rated for
            supply work
            </li>
            <li>
            <strong>Maintenance:</strong> Firmware updates, battery replacement, lead
            replacement
            </li>
            <li>
            <strong>Inspection:</strong> Proving unit check before each test sequence, annual
            calibration
            </li>
            <li>
            <strong>Training:</strong> Instrument-specific training, understanding of test
            methods and limitations
            </li>
            <li>
            <strong>Records:</strong> Calibration certificates, user training records, defect
            reports
            </li>
            </ul>
            

            
            <p><strong>Case Study: Access Equipment</strong></p>
            <p className="text-sm text-white mb-2">
            PUWER and WAHR compliance for ladders and platforms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Selection:</strong> BS EN 131 ladders, appropriate class for trade use,
            fibreglass for electrical work
            </li>
            <li>
            <strong>Maintenance:</strong> Cleaning, adjustment of locking mechanisms,
            replacement of worn feet
            </li>
            <li>
            <strong>Inspection:</strong> Pre-use visual check, monthly detailed inspection
            with tagging system
            </li>
            <li>
            <strong>Training:</strong> Safe use of ladders, 3-point contact rule, angle of
            placement
            </li>
            <li>
            <strong>Records:</strong> Ladder register, inspection records, training evidence
            </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A scaffold tower wheeled in for high-level cable containment"
            situation={
              <>
                You arrive at site to find a contractor using a mobile scaffold tower for
                high-level tray and trunking installation. The tower has no PUWER inspection
                tag, the toeboards are missing on one side, and the operator has no PASMA card.
              </>
            }
            whatToDo={
              <>
                Stop the work. Apply Reg 4 (suitability — toeboards missing fails fit-for-place),
                Reg 6 (maintenance), Reg 7 (specific risks — falls from height), Reg 9 (training
                — operator not competent). Quarantine the tower until a PASMA-trained operative
                inspects, completes the missing components and tags it. Cross-check the working
                platform against Schedule 1 of the Work at Height Regulations 2005 before
                releasing.
              </>
            }
            whyItMatters={
              <>
                Falls from height remain the largest construction fatality category. PUWER
                non-compliance on access equipment is one of the most-prosecuted breaches and
                a Prohibition Notice will follow any HSE visit that catches it.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'PUWER 1998 covers any equipment used at work — owned, hired, supplied or even built by the employer.',
              'Reg 4 &ldquo;suitable&rdquo; has three legs — fit for the task, the place and the user. Sign-off without all three is the most common breach.',
              'Reg 5 maintenance and Reg 6 inspection apply throughout the equipment&rsquo;s life — not just at handover.',
              'Reg 7 deals with specific risks — equipment use restricted to nominated operators with documented training.',
              'Reg 8 information and Reg 9 training are records-based duties — the absence of a record means the duty is presumed unmet.',
              'Regs 11-19 cover dangerous parts, controls, isolation, stability, lighting, markings and warnings — the technical regulations.',
              'PUWER overlaps with LOLER (lifting), EAWR (electrical), CAR (asbestos), DSEAR (explosive atmospheres) — know which regime takes precedence on each piece of kit.',
              'PAT testing is one method of evidencing PUWER compliance for portable electrical equipment — but it is not the only method, and frequencies must be risk-based.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section1-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                COSHH
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section1_5;
