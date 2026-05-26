/**
 * Module 2 · Section 3 — Working with drawings and specifications
 * AM2 day-prep — AM2 Phase A (H&S, safe isolation, RAMS, paperwork)
 * Read the drawing, follow the spec — the AM2 is graded on what's printed, not what looks right.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  SectionRule,
  LearningOutcomes,
  TLDR,
  KeyTakeaways,
  FAQ,
  Scenario,
  CommonMistake,
  RegsCallout,
} from '@/components/study-centre/learning';

const TITLE = 'Working with Drawings and Specifications | AM2 Module 2.3 | Elec-Mate';
const DESCRIPTION =
  'How to read AM2 drawings and specs accurately — dimensions, symbols and the deviation traps that cost marks.';

const AM2Module2Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: 'socket-positioning',
      question: 'If a drawing shows a double socket at 300mm and you fit it at 400mm, do you pass?',
      options: [
        'No - incorrect positioning loses marks',
        "Yes, as long as it's professionally installed",
        'Yes, if client agrees to the change',
        "No, but only if it's more than 50mm out",
      ],
      correctIndex: 0,
      explanation:
        'Incorrect positioning = lost marks. AM2 drawings and specifications must be followed exactly - deviation leads to mark deduction regardless of workmanship quality.',
    },
    {
      id: 'elv-segregation',
      question:
        'If the spec calls for segregated trunking for ELV cabling but you run it with mains, what happens?',
      options: [
        'Warning of presence of more than one supply',
        'Fail for not following spec and breaching safety segregation',
        'Investigation to identify root cause before taking action',
        'Steel toe-capped boots with anti-static soles',
      ],
      correctIndex: 1,
      explanation:
        'Running ELV with mains violates both specification compliance and safety segregation requirements - this is a fail situation for both compliance and safety.',
    },
    {
      id: 'cable-size-compliance',
      question: 'What happens if you use 2.5mm cable where the spec calls for 4mm?',
      options: [
        'Fail for non-compliance with specification',
        'No problem if it passes inspection',
        'OK if you document the change',
        'Minor mark deduction for incorrect material',
      ],
      correctIndex: 0,
      explanation:
        'Using incorrect cable size is non-compliance with specification and fails current-carrying capacity requirements - this results in assessment failure.',
    },
    {
      id: 'bs7671-symbols',
      question: 'In AM2, what level of BS 7671 symbol knowledge is expected?',
      options: [
        'Basic knowledge of common symbols only',
        'Symbol knowledge is not assessed',
        'Symbols will be explained on drawings',
        'Fluent recognition of all standard electrical symbols',
      ],
      correctIndex: 3,
      explanation:
        'You must be fluent in BS 7671 electrical symbols - this is fundamental knowledge expected for AM2 assessment and professional practice.',
    },
    {
      id: 'measurement-accuracy',
      question: 'Why is exact measurement crucial when following AM2 drawings?',
      options: [
        'Loss of RCD protection for affected circuits',
        'Buildability input and early coordination is needed',
        'Specific PPE required for each stage of the work',
        'Measurements in drawings are treated as exact requirements',
      ],
      correctIndex: 3,
      explanation:
        "AM2 drawings show exact measurements that must be followed precisely - 'near enough' leads to mark deduction as you're assessed on compliance, not just craftsmanship.",
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Name three types of drawings/specs you'll see in AM2:",
      options: [
        'Sketches, photos, verbal instructions',
        'Circuit diagrams, layout diagrams, written specifications',
        'Blueprints, CAD drawings, estimates',
        'Floor plans, elevation views, sections',
      ],
      correctAnswer: 1,
      explanation:
        'AM2 uses circuit diagrams (showing connections), layout diagrams (showing positions), and written specifications (detailing requirements).',
    },
    {
      id: 2,
      question: 'If the spec calls for 4mm cable but you install 2.5mm, what happens?',
      options: [
        'Not following drawings/specifications exactly',
        'To show you can follow instructions precisely',
        'Fail for non-compliance with specification',
        'Installing socket 100mm higher than specified',
      ],
      correctAnswer: 2,
      explanation:
        'Using incorrect cable size violates specification compliance and may not meet current-carrying capacity - this results in assessment failure.',
    },
    {
      id: 3,
      question: 'Why must socket heights match the drawing exactly?',
      options: [
        'Only approximate positioning is needed',
        'For aesthetic reasons only',
        "Height doesn't matter if it's accessible",
        'To show you can follow instructions precisely',
      ],
      correctAnswer: 3,
      explanation:
        'AM2 assesses your ability to follow specifications exactly as you would in professional practice - precision demonstrates competency.',
    },
    {
      id: 4,
      question: 'What does segregation mean in trunking systems?',
      options: [
        'Keeping different cable types separate for safety/compliance',
        'Using different colours for different circuits',
        'Installing trunking at different heights',
        'Separating power and lighting circuits',
      ],
      correctAnswer: 0,
      explanation:
        'Segregation means keeping different voltage systems (LV and ELV) separate to prevent interference and maintain safety compliance.',
    },
    {
      id: 5,
      question: "Which takes priority if there's a conflict - neatness or following spec?",
      options: [
        'Neatness - appearance matters most',
        'Following spec - compliance is paramount',
        'Assessor preference determines priority',
        'Balance of both equally',
      ],
      correctAnswer: 1,
      explanation:
        "Specification compliance always takes priority - you're marked on following instructions, not just craftsmanship appearance.",
    },
    {
      id: 6,
      question: 'True or false: Assessors allow small deviations in accessory positions:',
      options: [
        'True - small deviations are acceptable',
        'True - within 50mm tolerance',
        'False - exact positioning is required',
        'True - if explained in writing',
      ],
      correctAnswer: 2,
      explanation:
        'False - AM2 drawings show exact requirements. Any deviation from specified positions results in mark deduction.',
    },
    {
      id: 7,
      question: "What's the main reason candidates fail this section?",
      options: [
        '+/-5mm tolerance for exact positioning',
        'To show you can follow instructions precisely',
        'False - exact positioning is required',
        'Not following drawings/specifications exactly',
      ],
      correctAnswer: 3,
      explanation:
        "The main failure reason is not following drawings/specifications exactly - many assume 'close enough' is acceptable.",
    },
    {
      id: 8,
      question: 'Why should you mark out before fixing accessories?',
      options: [
        'To ensure exact positioning as per drawings',
        'Fail for non-compliance with specification',
        '40% - it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s the largest weighting',
        'To show you can follow instructions precisely',
      ],
      correctAnswer: 0,
      explanation:
        'Marking out ensures accessories are positioned exactly as specified in drawings - preventing costly mistakes and mark deduction.',
    },
    {
      id: 9,
      question: 'Give one example of misreading a drawing that could cost marks:',
      options: [
        'Using neater cable routing than shown',
        'Installing socket 100mm higher than specified',
        'Adding extra earth bonding',
        'Using better quality accessories',
      ],
      correctAnswer: 1,
      explanation:
        'Installing accessories in wrong positions (even if neat and safe) loses marks as it shows failure to follow specifications.',
    },
    {
      id: 10,
      question: "What's the golden rule when working with AM2 specs?",
      options: [
        'Work as quickly as possible',
        'Use professional judgement to improve design',
        'Follow drawings and specifications exactly',
        'Prioritise safety over specification',
      ],
      correctAnswer: 2,
      explanation:
        'The golden rule is to follow drawings and specifications exactly - AM2 assesses compliance, not design improvement or personal preference.',
    },
    {
      id: 11,
      question: 'What percentage of marks does specification compliance carry in NET assessment?',
      options: [
        "25% - it's one of many factors",
        '15% - workmanship is more important',
        "60% - it's the most important",
        "40% - it's the largest weighting",
      ],
      correctAnswer: 3,
      explanation:
        'Specification compliance carries 40% weighting in NET assessment - the largest single marking criteria, emphasising its critical importance.',
    },
    {
      id: 12,
      question: 'What tolerance do NET assessors typically allow for accessory positioning?',
      options: [
        '+/-5mm tolerance for exact positioning',
        'No tolerance - exact positioning required',
        "+/-50mm tolerance as long as it's functional",
        '+/-20mm tolerance if professionally installed',
      ],
      correctAnswer: 0,
      explanation:
        'NET assessors typically allow +/-5mm tolerance for accessory positioning - beyond this results in mark deduction for specification non-compliance.',
    },
  ];

  const learningOutcomes = [
    'Interpret AM2 drawings and specifications correctly',
    'Follow exact dimensions, cable types, and termination details',
    'Recognise why deviation from drawings leads to lost marks',
    'Apply real-world skills of reading schematics and installation specs',
    'Avoid the typical misreads that cost candidates marks',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3"
            title="Working with Drawings and Specifications"
            description="Complete guide to interpreting AM2 drawings and specifications - circuit diagrams, layout plans, and compliance requirements."
            tone="yellow"
          />

          <TLDR
            points={[
              'The drawing and the specification are the rules — not suggestions. Working but non-spec is still a fail.',
              'Read the spec end-to-end before you cut anything. Highlight cable types, sizes, accessory positions and routing.',
              'BS 7671 symbols and labelling are part of the marked criteria — get them right on both the install and the certificate.',
              'If something on the drawing genuinely can’t be installed as drawn, ask — don’t improvise.',
            ]}
          />

          <ConceptBlock title="Drawings and Specifications Are Non-Negotiable">
            <p>
              <strong className="text-red-300">Critical.</strong> In the AM2 you'll be given
              drawings, wiring diagrams, and written specifications. These aren't suggestions — they
              are the blueprint you must follow exactly. Many candidates fail because they think "as
              long as it works, it's fine." Wrong. The assessor marks against compliance with the
              specification, not just function.
            </p>
            <p>
              In the real world, not following drawings and specs can mean breaching contract terms,
              voiding compliance certificates, or creating unsafe installations. This section
              ensures you understand the critical importance of specification compliance.
            </p>
          </ConceptBlock>

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="1. Types of Drawings You'll See in AM2">
            <p>
              <strong>Circuit Diagrams.</strong> Show electrical connections, conductor types, and
              protective devices.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Display circuit protection (MCBs, RCDs, fuses)</li>
              <li>Show conductor routes and connections</li>
              <li>Indicate cable types and sizes</li>
              <li>Include earthing and bonding arrangements</li>
              <li>Use BS 7671 standard symbols throughout</li>
            </ul>
            <p>
              <strong>Layout Diagrams.</strong> Show physical positions including socket heights and
              trunking routes.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Exact measurements for accessory positioning</li>
              <li>Trunking and conduit routing paths</li>
              <li>Clearance distances from other services</li>
              <li>Installation heights and depths</li>
              <li>Spacing between multiple accessories</li>
            </ul>
            <p>
              <strong>Written Specifications.</strong> Detailed written instructions covering all
              installation requirements.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable sizes, types, and colour requirements</li>
              <li>Installation methods and techniques</li>
              <li>Material specifications and standards</li>
              <li>Testing and verification requirements</li>
              <li>Completion and documentation standards</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="2. Following Specifications - Non-Negotiable">
            <p>
              <strong>Cable Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sizes must match exactly (e.g., 2.5mm for sockets, 4mm for cooker)</li>
              <li>Cable types as specified (T&amp;E, SWA, FP200, etc.)</li>
              <li>Core colours must comply with requirements</li>
              <li>Conductor materials (copper/aluminium) as stated</li>
            </ul>
            <p>
              <strong>Installation Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Accessories positioned exactly as per dimensions</li>
              <li>Conduit/trunking routes following specified runs</li>
              <li>Installation methods as detailed in specs</li>
              <li>Segregation requirements strictly observed</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">NET Assessment Time Management.</strong> Allocate
              15-20 minutes to thoroughly review all drawings and specifications before starting
              practical work. This review time prevents costly mistakes and mark deductions later in
              the assessment process.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="3. Common Drawing Interpretation Errors (NET Guidance)">
            <p>
              <strong className="text-red-400">Critical Errors That Cause Failure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Misreading symbols on circuit diagrams</li>
              <li>Using the wrong cable size/type</li>
              <li>Installing in wrong position (heights/distances off spec)</li>
              <li>Forgetting segregation between LV and ELV</li>
            </ul>
            <p>
              <strong className="text-orange-400">Common Mark-Losing Mistakes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>Not labelling or identifying conductors</li>
              <li>Assuming "close enough" is acceptable</li>
              <li>Poor measurement and marking out</li>
              <li>Not cross-referencing multiple drawings</li>
            </ul>
            <p>
              <strong className="text-red-400">Real AM2 Failure Examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>
                Candidate installed all accessories neatly but put sockets 100mm too high —
                borderline fail
              </li>
              <li>
                Candidate used 2.5mm for a cooker radial instead of 4mm — failed installation
                section
              </li>
              <li>
                Mixed ELV and LV in same trunking despite specification requiring segregation — fail
              </li>
              <li>
                Excellent workmanship but wrong cable type used throughout — failed on compliance
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="4. BS 7671 Symbol Recognition Requirements">
            <p>
              <strong className="text-elec-yellow">
                Essential Symbol Categories — Circuit Protection:
              </strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MCB (Miniature Circuit Breaker)</li>
              <li>RCD (Residual Current Device)</li>
              <li>RCBO (Combined MCB + RCD)</li>
              <li>Fuses (various types)</li>
              <li>Isolators and switches</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Installation Components:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Socket outlets (single, double)</li>
              <li>Light fittings and switches</li>
              <li>Junction boxes and connectors</li>
              <li>Earth bonding points</li>
              <li>Cable routes and types</li>
            </ul>
            <p>
              <strong>Symbol Fluency Requirements.</strong> You must be able to instantly recognise
              and interpret standard BS 7671 symbols without reference materials.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Immediate recognition of all common electrical symbols</li>
              <li>Understanding symbol variations and combinations</li>
              <li>Ability to trace circuit paths through schematic diagrams</li>
              <li>Recognition of obsolete symbols that may appear in existing installations</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="5. Strategies to Avoid Mistakes">
            <p>
              <strong>Pre-Work Review Process:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Read all drawings and specifications fully</li>
              <li>Cross-reference circuit and layout diagrams</li>
              <li>Note all cable sizes, types, and routes</li>
              <li>Identify all accessory positions and heights</li>
              <li>Check for segregation requirements</li>
            </ol>
            <p>
              <strong>During Installation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Keep specifications on hand — don't trust memory</li>
              <li>Mark out positions before drilling or fixing</li>
              <li>Double-check cable sizes before terminating</li>
              <li>Verify measurements twice before cutting</li>
              <li>Cross-check circuit connections against diagrams</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="6. Measurement and Marking Techniques">
            <p>
              <strong>Professional Measuring Practices — Accurate Measurement:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use appropriate measuring tools for task</li>
              <li>Measure from fixed reference points</li>
              <li>Account for wall/surface variations</li>
              <li>Check measurements in multiple dimensions</li>
              <li>Allow for accessory box dimensions</li>
            </ul>
            <p>
              <strong>Marking Procedures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use appropriate marking tools (pencil, chalk)</li>
              <li>Mark centre points and corners clearly</li>
              <li>Use spirit level for accurate horizontal/vertical</li>
              <li>Mark cable entry/exit points</li>
              <li>Cross-check marked positions against drawings</li>
            </ul>
            <p>
              <strong className="text-green-400">Professional Tip.</strong> "Measure twice, cut
              once" applies especially to AM2. Incorrect positioning due to poor measuring loses
              marks that cannot be recovered, even if the final installation is electrically sound
              and well-crafted.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[4]} />

          <ConceptBlock title="7. What Assessors Look For - NET Assessment Criteria">
            <p>
              <strong className="text-green-400">
                What Gets Marks (Pass Criteria) — Specification Compliance (40% weighting):
              </strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Exact cable sizes as specified</li>
              <li>Correct accessory positions (+/- 5mm tolerance)</li>
              <li>Proper segregation implementation</li>
              <li>Specified installation methods followed</li>
              <li>Correct protective device ratings</li>
            </ul>
            <p>
              <strong className="text-green-400">Professional Competency (35% weighting):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Systematic verification processes</li>
              <li>Accurate measurement techniques</li>
              <li>Professional marking and positioning</li>
              <li>BS 7671 symbol fluency demonstration</li>
              <li>Clear understanding of requirements</li>
            </ul>
            <p>
              <strong className="text-red-400">Minor Deductions (2-5 marks each):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Accessory positions 10-20mm out</li>
              <li>Incorrect cable colour (but correct size)</li>
              <li>Poor measurement technique demonstration</li>
              <li>Inadequate verification process</li>
              <li>Symbol recognition hesitation</li>
            </ul>
            <p>
              <strong className="text-red-400">Major Deductions (5-10 marks each):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Wrong cable sizes installed</li>
              <li>Accessories 20mm+ from specified position</li>
              <li>Incorrect installation method used</li>
              <li>Poor specification compliance</li>
              <li>Inadequate systematic approach</li>
            </ul>
            <p>
              <strong className="text-red-400">Instant Failure Scenarios.</strong> These scenarios
              result in immediate assessment failure regardless of other work quality:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>
                <strong>Safety segregation violations:</strong> LV and ELV cables in same
                containment when specification prohibits
              </li>
              <li>
                <strong>Major cable size errors:</strong> Using cable insufficient for protective
                device rating (safety issue)
              </li>
              <li>
                <strong>Specification abandonment:</strong> Deciding to "improve" the design instead
                of following specifications
              </li>
              <li>
                <strong>Installation method breaches:</strong> Using methods that violate BS 7671 or
                specified requirements
              </li>
              <li>
                <strong>Protective device mismatches:</strong> Installing protection that doesn't
                match circuit design requirements
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">If You Spot an Error:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Stop immediately and assess impact</li>
              <li>Document the error and proposed correction</li>
              <li>Ask assessor for clarification if needed</li>
              <li>Correct professionally — don't rush the fix</li>
              <li>Verify correction against specification</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Communication with Assessor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>"I need to verify this dimension against the drawing"</li>
              <li>"Could you confirm the segregation requirement here?"</li>
              <li>"I want to double-check this cable specification"</li>
              <li>Professional questions demonstrate competency</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="8. Real-World Industry Examples">
            <p>
              <strong className="text-elec-yellow">AM2 Assessment Failures:</strong>
            </p>
            <p>
              <strong className="text-red-400">Example 1: Socket Positioning.</strong> Candidate
              installed all accessories neatly but put sockets 100mm too high. Lost marks,
              borderline fail.
            </p>
            <p>
              <strong className="text-red-400">Example 2: Cable Size Error.</strong> Candidate used
              2.5mm for a cooker radial instead of 4mm. Failed installation section.
            </p>
            <p>
              <strong className="text-red-400">Example 3: Segregation Violation.</strong> Mixed ELV
              and mains in same trunking despite clear specification requiring segregation. Failed
              on safety compliance.
            </p>
            <p>
              <strong className="text-elec-yellow">Industry Consequences:</strong>
            </p>
            <p>
              <strong className="text-orange-400">Contract Breach.</strong> Electrician ignored
              drawings and ran trunking across a doorway. Site inspector rejected the work, leading
              to costly remedial work and contract penalties.
            </p>
            <p>
              <strong className="text-orange-400">Compliance Failure.</strong> Installation
              completed to electrician's interpretation rather than specification. Failed electrical
              inspection and voided building regulations compliance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Summary">
            <p>
              Working with drawings and specifications is about precision and compliance, not
              interpretation or improvement.
            </p>
            <p>
              <strong>Key Points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Drawings and specs must be followed exactly</li>
              <li>BS 7671 symbol fluency is essential</li>
              <li>Measurement accuracy prevents mark loss</li>
              <li>Segregation requirements are non-negotiable</li>
              <li>Pre-work review saves costly mistakes</li>
            </ul>
            <p>
              <strong>Mark-Losing Actions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wrong cable sizes or types</li>
              <li>Incorrect accessory positioning</li>
              <li>Mixed voltage systems in same containment</li>
              <li>Poor measurement and marking</li>
              <li>Assuming "close enough" is acceptable</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Golden Rule.</strong> Follow drawings and
              specifications exactly. AM2 assesses compliance and competency, not personal
              interpretation or design improvement.
            </p>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 537.2.7"
            clause="Each device used for isolation shall be clearly identified by position or durable marking to indicate the installation or circuit it isolates."
            meaning={
              <>
                Labels and identification matter. The drawing will tell you what each accessory and
                isolator is for — your install must match. Missing or wrong labels on switchgear,
                isolators or distribution boards is one of the easier marks to lose, and one of the
                easier wins if you do it properly.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 537.2.7."
          />

          <Scenario
            title="The drawing says 4 mm² — you’ve only got 2.5 mm² on the bench"
            situation={
              <>
                You’re halfway through Section A. The drawing specifies 4 mm² T&E for a final ring.
                You check the bench and there are only 2.5 mm² rolls in front of you. The clock is
                ticking. You consider just using 2.5 — the load calculations would still work for
                the test.
              </>
            }
            whatToDo={
              <>
                Don’t cut a single millimetre. Tell the assessor immediately. Either the materials
                are wrong (the centre fixes it) or you’ve misread the drawing (you re-check).
                Substituting silently is a deviation from spec — even if it would have been
                technically safe, it costs you the criterion and signals to the assessor that you
                treat the spec as optional.
              </>
            }
            whyItMatters={
              <>
                On site, deviating from the spec without authorisation is exactly how disputes start
                with clients and consultants. The assessor is testing the habit, not just the
                knowledge.
              </>
            }
          />

          <CommonMistake
            title="Skimming the spec instead of reading it"
            whatHappens={
              <>
                You glance at the drawing, see "ring final, lighting circuit, three-phase
                distribution" and crack on. Three hours in, you realise you’ve missed the note about
                double-pole isolation on the lighting circuit and have to unpick a finished
                accessory.
              </>
            }
            doInstead={
              <>
                Read the spec twice before you start. Highlight cable types, sizes, accessory types,
                mounting heights, routing constraints and any "must" or "shall" wording. Note
                anything unusual — they’re the easiest marks to lose.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Are the drawings to scale?',
                answer:
                  'Generally yes — but always check the title block. AM2 drawings often state "not to scale, dimensions as figured". Use the dimensions, not the apparent length on the drawing.',
              },
              {
                question: 'What if a dimension is missing from the drawing?',
                answer:
                  'Ask the assessor. Don’t guess. A missing dimension is usually deliberate, to test that you check rather than assume. Document any clarifications in writing on your RAMS or notes.',
              },
              {
                question: 'Do I have to use the exact accessory specified, or just an equivalent?',
                answer:
                  'Use exactly what the spec calls out. The centre stocks the right items. Substituting "an equivalent" is a deviation and will be marked against you.',
              },
              {
                question: 'How important are circuit labels and chart entries?',
                answer:
                  'Very. Reg 537.2.7 requires durable identification of each isolation device. The mark sheet checks circuit labels, distribution-board chart entries and accessory identification. Easy marks if done; easy marks lost if skipped.',
              },
              {
                question: 'Can I redraw the layout if I think it’s clearer?',
                answer:
                  'No. The drawing is what you’re marked against. If you think there’s a clearer way, raise it with the assessor before starting — never improvise.',
              },
              {
                question: 'Is there a key for symbols if I don’t recognise one?',
                answer:
                  'Yes — the candidate brief includes a symbol legend. BS 7671 Appendix 9 also lists standard symbols. Use both. If a symbol isn’t in either, ask.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Drawings and specifications are the rules — non-spec installation is a deviation, even if it works.',
              'Read the spec twice before cutting anything. Highlight everything specific.',
              'BS 7671 symbols and Appendix 9 are the standard reference — know the common ones.',
              'BS 7671 Reg 537.2.7 requires durable identification — labels are not optional.',
              'Missing dimensions or unclear notes? Ask the assessor. Never guess.',
              'Substituting accessories or cable sizes silently costs you the criterion.',
              'Title blocks tell you scale, revision, status — read them.',
              'If a deviation is genuinely needed, raise it before you start, not after.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Working with Drawings and Specifications Quiz" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2/section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Previous: Section 2
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2/section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Continue to Section 4
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module2Section3;
