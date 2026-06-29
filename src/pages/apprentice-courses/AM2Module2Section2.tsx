/**
 * Module 2 · Section 2 — Risk assessments and method statements (RAMS)
 * AM2 day-prep — AM2 Phase A (H&S, safe isolation, RAMS, paperwork)
 * Writing RAMS the assessor will accept: real hazards, real controls, no copy-paste templates.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { VideoCard } from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
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

const TITLE = 'Risk Assessments and Method Statements (RAMS) | AM2 Module 2.2 | Elec-Mate';
const DESCRIPTION =
  'How to write RAMS that assessors accept on the AM2 — real hazards, real controls, written for the actual job in front of you.';

const AM2Module2Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: 'rams-difference',
      question: "What's the difference between a risk assessment and a method statement?",
      options: [
        'Risk assessment identifies hazards/controls; method statement describes safe working procedure',
        'Highly friable and can release large quantities of fibres when disturbed',
        'Cleaning and maintaining heat exchanger surfaces on HVAC equipment',
        'Test results, illumination status, legibility checks, and any maintenance performed',
      ],
      correctIndex: 0,
      explanation:
        'Risk assessment identifies hazards and control measures, whilst method statement provides the step-by-step safe working procedure.',
    },
    {
      id: 'ppe-specificity',
      question: "If you write 'use PPE' in RAMS, is it enough?",
      options: [
        'Yes, if combined with other measures',
        'No, you must specify type and purpose',
        'Yes, it shows safety awareness',
        'Only if PPE is available on site',
      ],
      correctIndex: 1,
      explanation:
        "'Use PPE' is too vague and scores no marks. You must specify type (safety glasses, insulated gloves) and purpose (protection from debris, electrical protection).",
    },
    {
      id: 'hazard-identification',
      question:
        'Which of these is the most important hazard to identify in electrical installation work?',
      options: [
        'Bad weather conditions',
        'Traffic noise',
        'Electric shock and burns',
        'Tool availability',
      ],
      correctIndex: 2,
      explanation:
        'Electric shock and burns are the primary hazards in electrical work that can cause serious injury or death, making them the most critical to identify and control.',
    },
    {
      id: 'control-hierarchy',
      question: 'What is the correct hierarchy of control measures?',
      options: [
        'Elimination > Substitution > Engineering > Administrative > PPE',
        'Administrative > PPE > Engineering > Elimination',
        'Engineering > PPE > Administrative > Substitution',
        'PPE > Engineering > Administrative > Elimination',
      ],
      correctIndex: 0,
      explanation:
        'The hierarchy prioritises elimination (removing the hazard) first, followed by substitution, engineering controls, administrative controls, and PPE as the last resort.',
    },
    {
      id: 'legal-requirements',
      question:
        'Which regulations specifically require electrical work to be properly planned and assessed?',
      options: [
        'Only Building Regulations',
        'MHSWR 1999 and EAWR 1989',
        'Only CDM Regulations',
        'Only company policies',
      ],
      correctIndex: 1,
      explanation:
        'Both the Management of Health and Safety at Work Regulations 1999 and Electricity at Work Regulations 1989 legally require proper planning and risk assessment.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the difference between a risk assessment and a method statement?",
      options: [
        'A method statement scores the risk; a risk assessment lists the tools needed',
        'Risk assessment identifies hazards/controls; method statement describes safe working procedure',
        'They are two names for the same single document',
        'A risk assessment is only required for work at height',
      ],
      correctAnswer: 1,
      explanation:
        'Risk assessment identifies hazards and control measures, whilst method statement provides the step-by-step safe working procedure.',
    },
    {
      id: 2,
      question: 'Which regulations require safe planning of electrical work in the UK?',
      options: [
        'Only the Building Regulations 2010',
        'Only the CDM Regulations 2015',
        'Both MHSWR 1999 and EAWR 1989',
        'Only the company health and safety policy',
      ],
      correctAnswer: 2,
      explanation:
        'Both the Management of Health and Safety at Work Regulations 1999 and Electricity at Work Regulations 1989 require proper planning and risk assessment.',
    },
    {
      id: 3,
      question: "True or false: Vague answers like 'be careful' score marks in RAMS.",
      options: [
        'True - if combined with other measures',
        'True - any safety awareness gets marks',
        'False - only PPE entries get marks',
        'False - specific, detailed entries are required',
      ],
      correctAnswer: 3,
      explanation:
        "Vague entries like 'be careful' score no marks. Assessors require specific, detailed control measures.",
    },
    {
      id: 4,
      question: 'Name three typical hazards in an AM2 installation task:',
      options: [
        'Electrical shock, manual handling, working at height',
        'Voltage drop, harmonics, power factor',
        'Continuity, polarity, insulation resistance',
        'Overload, short-circuit, earth fault',
      ],
      correctAnswer: 0,
      explanation:
        'Common AM2 hazards include electrical shock/burns, manual handling of equipment, and working at height (even low level).',
    },
    {
      id: 5,
      question: 'Why must PPE be written specifically in RAMS?',
      options: [
        "PPE is the first line of defence and replaces the need for isolation",
        "Generic 'use PPE' entries score no marks - type and purpose must be stated",
        "PPE only needs to be listed if the assessor asks for it",
        "Listing PPE by brand name earns the most marks",
      ],
      correctAnswer: 1,
      explanation:
        "'Use PPE' is too vague. You must specify type (safety glasses, insulated gloves) and purpose (protection from debris, electrical protection).",
    },
    {
      id: 6,
      question: "Who should be considered under 'who may be harmed'?",
      options: [
        'Only the apprentice carrying out the work',
        'Only the assessor and the apprentice',
        'Self, colleagues, building occupants, public',
        'Only those holding a current ECS card',
      ],
      correctAnswer: 2,
      explanation:
        'Consider all who might be affected: yourself, work colleagues, building occupants, members of the public, and anyone who might access the area.',
    },
    {
      id: 7,
      question: 'Give one example of a control measure other than PPE:',
      options: [
        'Working faster to reduce exposure time',
        'Working alone to reduce risk to others',
        'Ignoring minor hazards',
        'Isolation and lock-off procedures',
      ],
      correctAnswer: 3,
      explanation:
        'Isolation and lock-off, warning signs, barriers, permits to work, supervision, and training are all control measures beyond PPE.',
    },
    {
      id: 8,
      question: "What's the purpose of a method statement?",
      options: [
        'To provide step-by-step safe working procedure',
        'To calculate project costs',
        'To list all possible hazards',
        'To record accident details',
      ],
      correctAnswer: 0,
      explanation:
        'Method statements describe the logical sequence of work activities and how they will be carried out safely.',
    },
    {
      id: 9,
      question: 'Why do generic/copy-paste RAMS answers fail?',
      options: [
        'They take longer to write than task-specific answers',
        'Assessors want task-specific detail relevant to the actual work',
        'They use the wrong scoring matrix for the risk',
        'They cannot be cross-referenced to the rig drawing',
      ],
      correctAnswer: 1,
      explanation:
        "Assessors look for task-specific analysis. Generic answers show you haven't properly considered the actual work and site conditions.",
    },
    {
      id: 10,
      question: 'What happens in AM2 if your RAMS is incomplete?',
      options: [
        'You get a warning but can continue',
        "Nothing - it's optional",
        'You lose marks and may fail the assessment',
        'You get extra time to complete it',
      ],
      correctAnswer: 2,
      explanation:
        'Incomplete or poor RAMS documentation will result in lost marks and can contribute to overall assessment failure.',
    },
  ];

  const learningOutcomes = [
    'Explain the purpose of risk assessments and method statements',
    'Complete a RAMS form correctly for AM2 tasks',
    'Identify hazards, risks, and suitable control measures',
    'Demonstrate how RAMS links to electrical safety law',
    'Avoid the vague or incomplete entries that cost marks',
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
            eyebrow="Module 2 · Section 2"
            title="Risk Assessments and Method Statements (RAMS)"
            description="Complete guide to RAMS for AM2 assessment - legal requirements, common mistakes, and proper documentation."
            tone="yellow"
          />

          <TLDR
            points={[
              'RAMS = Risk Assessment + Method Statement. The plan you write before you touch the rig.',
              'Legally required by HASAWA 1974, MHSWR 1999 reg 3, and EAWR 1989 — not optional paperwork.',
              'Hierarchy of control: eliminate → substitute → engineering → admin → PPE. PPE is the last line of defence, not the first.',
              'On AM2 you’ll complete RAMS for the task before you start work — vague entries lose marks fast.',
            ]}
          />

          <ConceptBlock title="RAMS Documentation Requirements">
            <p>
              <strong className="text-red-300">Critical.</strong> Risk Assessments and Method
              Statements (RAMS) are about proving you can plan safe work before starting. In the
              AM2, you will be expected to complete RAMS documentation for given tasks. This isn't
              just paperwork — it's a legal requirement in industry under the Management of Health
              and Safety at Work Regulations 1999 and Electricity at Work Regulations 1989.
            </p>
            <p>
              Many candidates lose marks by rushing RAMS or writing vague answers. This section
              ensures you know how to complete them properly, both for AM2 and real-world site
              practice.
            </p>
          </ConceptBlock>

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="1. Purpose of RAMS">
            <p>
              <strong>Risk Assessment.</strong> Identify hazards, assess likelihood/severity, put in
              controls. A systematic examination of work activities to identify what could cause
              harm to people, property, or the environment. The assessment considers the likelihood
              of occurrence and potential severity of consequences.
            </p>
            <p>
              <strong>Method Statement.</strong> Step-by-step description of how the job will be
              done safely. A detailed, logical sequence describing how work activities will be
              carried out, including safety measures, equipment required, and personnel
              responsibilities.
            </p>
            <p>
              <strong>Used Together.</strong> RAMS shows you've thought through risks and how to
              mitigate them. The combination demonstrates competent planning, legal compliance, and
              professional approach to electrical installation work.
            </p>
            <p>
              <strong className="text-elec-yellow">Legal Framework:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Management of Health and Safety at Work Regulations 1999 (Regulation 3)</li>
              <li>Electricity at Work Regulations 1989 (Regulation 4)</li>
              <li>Construction (Design and Management) Regulations 2015</li>
              <li>Health and Safety at Work Act 1974</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <div className="my-6">
            <VideoCard
              url={videos.riskAssessmentNvq.url}
              title={videos.riskAssessmentNvq.title}
              channel={videos.riskAssessmentNvq.channel}
              duration={videos.riskAssessmentNvq.duration}
              topic="RAMS for AM2 day"
              caption={
                <>
                  Craig walks through how to complete a risk assessment that satisfies the AM2
                  paperwork criteria — the same approach you'll use on the day for the rig install
                  task.
                </>
              }
            />
          </div>

          <ConceptBlock title="Equipment & Documentation Requirements">
            <p>
              <strong>Essential Documentation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>RAMS form (provided by assessor)</li>
              <li>Site drawings/plans</li>
              <li>Equipment specifications</li>
              <li>Isolation procedures</li>
              <li>Emergency contact details</li>
            </ul>
            <p>
              <strong>Reference Materials:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 IET Wiring Regulations</li>
              <li>IET Code of Practice</li>
              <li>HSE Guidance Notes</li>
              <li>Manufacturer instructions</li>
              <li>Company safety policies</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pre-RAMS Checklist">
            <p>Before completing your RAMS documentation, ensure you have:</p>
            <p>
              <strong>Site Analysis:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Examined work location thoroughly</li>
              <li>Identified access/egress routes</li>
              <li>Noted environmental conditions</li>
              <li>Checked for existing installations</li>
              <li>Assessed building occupancy</li>
            </ul>
            <p>
              <strong>Task Planning:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Understood work scope completely</li>
              <li>Listed required tools/equipment</li>
              <li>Determined work sequence</li>
              <li>Identified competency requirements</li>
              <li>Considered time constraints</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="2. How RAMS Appears in AM2">
            <p>
              <strong>NET Assessment Structure.</strong> RAMS documentation is a mandatory component
              of every AM2 practical assessment. Candidates receive a RAMS form at the start of
              their assessment task and must complete it before beginning practical work.
            </p>
            <p>
              <strong className="text-elec-yellow">Time Allocation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Allow 15-20 minutes for completion</li>
              <li>Complete before starting practical work</li>
              <li>Cannot proceed without assessor approval</li>
              <li>Forms part of overall time management</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Marking Weighting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Significant marks allocation in assessment</li>
              <li>Poor RAMS can cause overall failure</li>
              <li>Assessed alongside practical work quality</li>
              <li>Professional competence demonstration</li>
            </ul>
            <p>
              <strong>Must Include:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Task description</li>
              <li>
                Identified hazards (electrical, slips, manual handling, working at height, etc.)
              </li>
              <li>Who may be harmed (self, others, public)</li>
              <li>Control measures (isolation, PPE, signage, supervision, permits)</li>
              <li>Residual risk</li>
            </ul>
            <p>
              <strong className="text-red-400">Vague answers like "be careful" = no marks.</strong>
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[4]} />

          <ConceptBlock title="3. Step-by-Step RAMS Completion Guide">
            <p>
              <strong>1. Task Description.</strong> Write a clear, specific description of what
              you're doing.
            </p>
            <p>
              <strong className="text-green-400">Good:</strong> "Installation of new 13A twin socket
              outlet in domestic kitchen, including 2.5mm T&amp;E cable run from consumer unit."
            </p>
            <p>
              <strong className="text-red-400">Bad:</strong> "Socket installation" (too vague).
            </p>
            <p>
              <strong>2. Hazard Identification.</strong> Consider ALL potential hazards
              systematically.
            </p>
            <p>
              <strong>Electrical Hazards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Electric shock from live conductors</li>
              <li>Burns from arcing/short circuits</li>
              <li>Fire from overheating connections</li>
              <li>Explosion from gas ignition</li>
            </ul>
            <p>
              <strong>Physical Hazards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cuts from sharp edges/tools</li>
              <li>Eye injury from debris</li>
              <li>Manual handling strains</li>
              <li>Slips/trips from cables/debris</li>
            </ul>
            <p>
              <strong>Environmental:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dust inhalation</li>
              <li>Confined spaces</li>
              <li>Working at height</li>
              <li>Noise exposure</li>
            </ul>
            <p>
              <strong>Human Factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Unauthorised access to work area</li>
              <li>Interference by building users</li>
              <li>Inadequate lighting</li>
              <li>Time pressure affecting decisions</li>
            </ul>
            <p>
              <strong>3. Who May Be Harmed.</strong> Consider everyone who could be affected:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Yourself (the electrician)</li>
              <li>Work colleagues/apprentices</li>
              <li>Building occupants (residents/staff)</li>
              <li>Visitors to the premises</li>
              <li>Emergency services personnel</li>
              <li>Members of the public</li>
            </ul>
            <p>
              <strong>4. Control Measures.</strong> Apply hierarchy of controls — be specific about
              each measure:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong className="text-green-400">Elimination/Substitution</strong> — remove hazard
                completely or replace with safer alternative
              </li>
              <li>
                <strong className="text-blue-400">Engineering Controls</strong> — isolation
                procedures, earthing, RCD protection, barriers
              </li>
              <li>
                <strong className="text-orange-400">Administrative Controls</strong> — permits to
                work, signage, training, supervision, procedures
              </li>
              <li>
                <strong className="text-red-400">Personal Protective Equipment</strong> — last
                resort; specify exact type and purpose
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="4. Common Mistakes in AM2 RAMS (NET list)">
            <p>
              <strong className="text-red-400">Critical Failures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Writing "use PPE" without stating type (gloves, goggles, insulated mat)</li>
              <li>
                Not identifying all hazards (focusing only on electrical, ignoring environment)
              </li>
              <li>Failing to include signage, lock-off, or permits as control measures</li>
              <li>Copy-pasting generic answers without linking to task</li>
            </ul>
            <p>
              <strong className="text-orange-400">Common Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>Not writing a logical sequence in method statement</li>
              <li>Forgetting to mention isolation verification procedures</li>
              <li>Omitting emergency procedures and contact details</li>
              <li>Not considering building occupants' safety</li>
            </ul>
            <p>
              <strong className="text-red-400">Examples of Inadequate Entries — Wrong:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>"Use appropriate PPE"</li>
              <li>"Be careful with electricity"</li>
              <li>"Follow safe working practices"</li>
              <li>"Avoid hazards"</li>
            </ul>
            <p>
              <strong className="text-green-400">Correct:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>"Wear insulated gloves rated 1000V for testing"</li>
              <li>"Isolate circuit at MCB, verify dead with proving unit"</li>
              <li>"Display warning signs 'Electrician at Work'"</li>
              <li>"Maintain 1m exclusion zone around work area"</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="5. RAMS Hazard Identification Matrix">
            <p>
              Use this systematic approach to ensure you identify all relevant hazards for AM2
              tasks:
            </p>
            <p>
              <strong className="text-elec-yellow">Electrical hazards.</strong> Specific hazards:
              electric shock from live parts; burns from arc flash/short circuit; fire from
              overheated connections. Typical control measures: isolation and lock-off procedures;
              proving unit verification; insulated tools and PPE.
            </p>
            <p>
              <strong className="text-elec-yellow">Physical hazards.</strong> Specific hazards: cuts
              from sharp tools/edges; eye injury from drilling debris; manual handling of equipment.
              Typical control measures: safety glasses and gloves; proper lifting techniques; tool
              inspection before use.
            </p>
            <p>
              <strong className="text-elec-yellow">Environmental hazards.</strong> Specific hazards:
              dust from drilling/cutting; working at height (even stepladders); confined or
              restricted spaces. Typical control measures: dust masks/extraction; stable working
              platform; adequate lighting and ventilation.
            </p>
            <p>
              <strong className="text-elec-yellow">Human hazards.</strong> Specific hazards:
              unauthorised access to work area; interference by building users; communication
              failures. Typical control measures: warning signs and barriers; briefing of building
              occupants; clear communication protocols.
            </p>
          </ConceptBlock>

          <ConceptBlock title="6. Control Measures Library">
            <p>Specific control measures to use in your RAMS documentation:</p>
            <p>
              <strong>Isolation Controls:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>"Isolate circuit at consumer unit MCB"</li>
              <li>"Apply padlock and danger tag to isolator"</li>
              <li>"Verify dead using proving unit to BS GS 38"</li>
              <li>"Re-prove test instrument on known live source"</li>
            </ul>
            <p>
              <strong>PPE Specifications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>"Insulated gloves rated 1000V for electrical testing"</li>
              <li>"Safety glasses to BS EN 166 for drilling operations"</li>
              <li>"Hard hat where overhead hazards present"</li>
              <li>"Dust mask FFP2 for drilling in masonry"</li>
            </ul>
            <p>
              <strong>Access Control:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>"Display 'Electrician at Work' warning signs"</li>
              <li>"Maintain 1m exclusion zone around work area"</li>
              <li>"Brief building occupants on work activities"</li>
              <li>"Restrict access during high-risk activities"</li>
            </ul>
            <p>
              <strong>Emergency Procedures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>"Emergency contact: Site supervisor [number]"</li>
              <li>"First aid kit location identified and accessible"</li>
              <li>"Emergency isolation procedure communicated"</li>
              <li>"Fire evacuation routes kept clear"</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="7. What Assessors Look For">
            <p>Understanding assessment criteria helps you focus on what earns marks:</p>
            <p>
              <strong className="text-green-400">What Gets Marks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Specific, detailed hazard identification</li>
              <li>Control measures linked to specific hazards</li>
              <li>Task-specific PPE with purpose stated</li>
              <li>Logical work sequence in method statement</li>
              <li>Consideration of all affected persons</li>
              <li>Emergency procedures included</li>
            </ul>
            <p>
              <strong className="text-red-400">What Loses Marks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Generic or vague descriptions</li>
              <li>Missing key hazards for the task</li>
              <li>Inappropriate or missing control measures</li>
              <li>Illogical or incomplete method sequence</li>
              <li>Failing to consider building occupants</li>
              <li>Copy-paste answers not relevant to task</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Time Management Tips:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Allow 15-20 minutes for RAMS completion</li>
              <li>Read the task description twice before starting</li>
              <li>Use bullet points for clarity and speed</li>
              <li>Focus on task-specific details, not generic safety advice</li>
              <li>Review for completeness before submitting</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Frequently Asked Questions">
            <p>
              <strong>Q1: Do I need to list every possible hazard?</strong> Only the relevant ones —
              but think broadly (environment, tools, access, people).
            </p>
            <p>
              <strong>Q2: Can I copy generic RAMS wording from memory?</strong> No. Assessors want
              task-specific detail.
            </p>
            <p>
              <strong>Q3: How detailed should PPE entries be?</strong> State type and purpose: e.g.,
              "insulated gloves for testing, safety glasses for drilling".
            </p>
            <p>
              <strong>Q4: What's the biggest reason people lose marks in RAMS?</strong> Vague or
              incomplete entries.
            </p>
            <p>
              <strong>Q5: Will assessors mark spelling/grammar?</strong> No, but clarity matters —
              write plainly and logically.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Summary">
            <p>
              RAMS is about proving you can plan safe work. In AM2, weak RAMS entries = easy lost
              marks. Always:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify specific hazards</li>
              <li>State clear control measures</li>
              <li>Link PPE, signage, and lock-off to the actual task</li>
              <li>Write a logical method sequence</li>
            </ul>
            <p>
              Done right, RAMS is quick, clear, and earns you marks while protecting you in real
              work.
            </p>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Regulation 3"
            clause="Every employer shall make a suitable and sufficient assessment of (a) the risks to the health and safety of his employees to which they are exposed whilst they are at work; and (b) the risks to the health and safety of persons not in his employment arising out of or in connection with the conduct by him of his undertaking."
            meaning={
              <>
                This is the law behind every RAMS document. The employer must risk-assess the job,
                but on AM2 you complete the RAMS yourself for the task in front of you. Generic,
                copy-paste entries don’t meet "suitable and sufficient" — your RAMS has to fit the
                actual rig and the actual hazards.
              </>
            }
            cite="Source: legislation.gov.uk — Management of Health and Safety at Work Regulations 1999, Regulation 3."
          />

          <Scenario
            title="RAMS for a three-phase distribution board change"
            situation={
              <>
                The assessor hands you the spec. You’re replacing a TP&N distribution board feeding
                three sub-circuits. You have a blank RAMS pro forma and ten minutes before Section A
                starts.
              </>
            }
            whatToDo={
              <>
                Walk the rig first. Identify the actual hazards: live three-phase supply (electric
                shock), working at height if the board is high (fall), heavy panel (manual
                handling), stripped strands (cut/laceration), shared walkway (slip/trip). For each,
                score likelihood × severity. Then write the method statement: isolate at the supply,
                lock off with your padlock, prove dead at the board, then dismantle. Don’t list
                "PPE" as the control for the live hazard — isolation is the control. PPE is the
                backstop.
              </>
            }
            whyItMatters={
              <>
                The hierarchy of control matters. Eliminate the hazard (isolate) before you reach
                for PPE. Assessors mark down RAMS that jumps straight to gloves and boots without
                addressing the actual cause.
              </>
            }
          />

          <CommonMistake
            title="Generic RAMS that could apply to any job"
            whatHappens={
              <>
                You write "Hazard: electricity. Control: PPE." for every line. The assessor sees you
                haven’t thought about the specific task — you’ve recycled a template. RAMS criteria
                go Not Yet Competent and you’ve set a defensive tone for the rest of the day.
              </>
            }
            doInstead={
              <>
                Name the specific hazard ("exposed live conductors at terminal block during board
                change"), name the specific control ("isolate at supply, lock off, prove dead, post
                warning notice"), and put PPE last as a layered defence. Specificity is the whole
                point.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Do I have to fill in RAMS for every part of AM2?',
                answer:
                  'You complete RAMS for the installation work in Section A and again in narrative form before Section C (safe isolation). Some centres include a separate RAMS for Section D fault diagnosis. Check the centre’s candidate brief.',
              },
              {
                question: 'How detailed does the method statement need to be?',
                answer:
                  'Detailed enough that another competent person could carry out the work safely from your write-up alone. A bullet list of "isolate, dismantle, install, test" is too vague. Include the means of isolation, the lock-off arrangement, and the order of work.',
              },
              {
                question: 'What scoring matrix should I use for risk?',
                answer:
                  'Most centres provide a 5×5 matrix (likelihood 1–5 × severity 1–5 = score 1–25). Use whatever the centre supplies. The exact numbers matter less than the logic showing through your scoring.',
              },
              {
                question: 'Can I use the rig drawing as a reference for hazards?',
                answer:
                  'Yes — that’s exactly what it’s there for. Cross-reference your hazards back to the drawing. "Hazard at terminal X-Y on drawing 02" reads better than "hazard somewhere in the install".',
              },
              {
                question: 'Does the assessor read every line?',
                answer:
                  'Yes. RAMS is a marked criterion. Sloppy entries (illegible writing, blank columns, generic copy-paste) all score against you.',
              },
              {
                question: 'How long should I spend on the RAMS?',
                answer:
                  'Around 10–15 minutes for a typical AM2 task. Less than that and you’re probably skipping detail; more than that and you’re eating into installation time.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'RAMS = Risk Assessment + Method Statement. Both required, both marked.',
              'Legal basis: HASAWA 1974, MHSWR 1999 reg 3, EAWR 1989. Not optional paperwork.',
              'Hazards must be specific to the actual rig — not copy-paste from a template.',
              'Hierarchy of control: eliminate → substitute → engineering → admin → PPE. PPE is the last layer.',
              'Score risk likelihood × severity using whatever matrix the centre provides.',
              'Method statement must be specific enough for another competent person to follow it.',
              'Cross-reference hazards back to the rig drawing where possible — shows the assessor you understand the layout.',
              'Spend 10–15 minutes total — long enough to be specific, short enough not to eat install time.',
            ]}
          />

          <Quiz questions={quizQuestions} title="RAMS Quiz" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2/section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Previous: Section 1
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Continue to Section 3
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module2Section2;
