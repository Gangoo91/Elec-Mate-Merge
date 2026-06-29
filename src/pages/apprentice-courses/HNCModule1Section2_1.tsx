/**
 * Module 1 · Section 2 · Subsection 1 — Hazard Identification Methods
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Systematic techniques (HAZOP, what-if, checklist, task analysis, FMEA) for an HNC
 *   engineer to surface hazards before they bite. Engineer-in-training perspective:
 *   how to lead a structured hazard ID workshop, not just walk a site with a clipboard.
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

const TITLE = 'Hazard Identification Methods - HNC Module 1 Section 2.1';
const DESCRIPTION =
  'Master hazard identification techniques for building services: workplace inspections, task analysis, job safety analysis, incident data analysis, and hazard categorisation in electrical and mechanical systems.';

const quickCheckQuestions = [
  {
    id: 'hazard-vs-risk',
    question: 'What is the key difference between a hazard and a risk?',
    options: [
      'A hazard is a potential source of harm; risk is the likelihood and severity of harm occurring',
      'A hazard is a minor issue; a risk is a major one that has already caused injury',
      'A hazard applies to equipment; a risk applies only to people',
      'A hazard is the legal duty; a risk is the control measure put in place',
    ],
    correctIndex: 0,
    explanation:
      'A hazard is anything with the potential to cause harm (e.g., exposed live conductors). Risk is the combination of how likely the harm is to occur and how severe it would be. Identifying hazards is the first step; assessing risk comes next.',
  },
  {
    id: 'workplace-inspection',
    question:
      'How often should formal workplace inspections be conducted in building services environments?',
    options: [
      'Only once a year as part of the annual safety audit',
      'Regularly - typically weekly, monthly, or quarterly depending on risk level',
      'Only after an accident or near miss has been reported',
      'Whenever a new member of staff joins the team',
    ],
    correctIndex: 1,
    explanation:
      'Regular scheduled inspections are essential for proactive hazard identification. Higher-risk environments require more frequent inspections. Daily informal checks complement formal scheduled inspections.',
  },
  {
    id: 'jsa-purpose',
    question: 'What is the primary purpose of a Job Safety Analysis (JSA)?',
    options: [
      'To record the cost and labour hours of a job for invoicing',
      'To schedule the order in which trades attend the site',
      'To break down tasks into steps and identify hazards at each stage',
      'To confirm the qualifications held by each worker on site',
    ],
    correctIndex: 2,
    explanation:
      "JSA systematically breaks down a job into its component steps, identifies potential hazards at each step, and determines appropriate control measures. It's a proactive tool for preventing incidents before work begins.",
  },
  {
    id: 'near-miss',
    question: 'Why is reporting near misses important for hazard identification?',
    options: [
      'They are needed to support insurance claims after the event',
      'They are a legal requirement under RIDDOR for every incident',
      'They allow blame to be assigned to the worker involved',
      'Near misses reveal hazards before they cause actual harm',
    ],
    correctIndex: 3,
    explanation:
      "Near misses are 'free lessons' - they reveal hazards and system failures without injury occurring. Research shows for every serious injury, there are hundreds of near misses. Capturing this data helps prevent future incidents.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following best defines a 'hazard' in workplace safety?",
    options: [
      'The probability of an accident occurring',
      'A potential source of harm or adverse health effect',
      'A measure of how severe an injury might be',
      'A type of safety control measure',
    ],
    correctAnswer: 1,
    explanation:
      'A hazard is anything with the potential to cause harm - this could be a substance, piece of equipment, work method, or environmental condition. Identifying hazards is the foundation of all risk assessment.',
  },
  {
    id: 2,
    question:
      'During a workplace inspection, which area should receive PARTICULAR attention in a building services environment?',
    options: [
      'Reception areas and visitor waiting rooms',
      'Car parks and external landscaped areas',
      'Distribution boards, switch rooms, and plant areas',
      'Stationery stores and document archive rooms',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical distribution areas, switch rooms, and plant rooms present the highest hazard potential in building services. These areas combine electrical, mechanical, and sometimes chemical hazards requiring thorough inspection.',
  },
  {
    id: 3,
    question:
      'What does the hierarchy of controls prioritise as the most effective control measure?',
    options: [
      'Administrative controls',
      'Personal protective equipment',
      'Warning signs and labels',
      'Elimination of the hazard',
    ],
    correctAnswer: 3,
    explanation:
      'The hierarchy prioritises: Elimination > Substitution > Engineering controls > Administrative controls > PPE. Eliminating a hazard entirely is always the most effective solution, though not always practicable.',
  },
  {
    id: 4,
    question:
      'A task analysis reveals that an electrician must work at height to install luminaires. What type of hazard category does this primarily represent?',
    options: [
      'Physical/mechanical hazard',
      'Environmental hazard',
      'Electrical hazard',
      'Ergonomic hazard',
    ],
    correctAnswer: 0,
    explanation:
      'Working at height is a physical/mechanical hazard - the potential for falls from height. While the task is electrical installation, the work at height hazard must be assessed separately and often presents the greater risk.',
  },
  {
    id: 5,
    question: 'Which document would you consult to determine if an incident is RIDDOR reportable?',
    options: [
      'The Health and Safety at Work etc. Act 1974',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013',
      'The Management of Health and Safety at Work Regulations 1999',
      'The Construction (Design and Management) Regulations 2015',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR 2013 specifies which workplace injuries, diseases, and dangerous occurrences must be reported to the HSE. This includes fatalities, specified injuries, over-7-day incapacitation, and certain dangerous occurrences.',
  },
  {
    id: 6,
    question: 'What is the recommended frequency for reviewing and updating Job Safety Analyses?',
    options: [
      'Only once, when the JSA is first written',
      'Every five years to align with card renewal',
      'When work methods, equipment, or conditions change, or after incidents',
      'Only when a new supervisor takes over the site',
    ],
    correctAnswer: 2,
    explanation:
      'JSAs are living documents that must be reviewed when work methods change, new equipment is introduced, after incidents or near misses, or when workers identify new hazards. Regular scheduled reviews are also good practice.',
  },
  {
    id: 7,
    question:
      'An electrician develops back pain from repeatedly lifting heavy cable drums. This is primarily which type of hazard?',
    options: [
      'Electrical hazard',
      'Chemical hazard',
      'Environmental hazard',
      'Ergonomic hazard',
    ],
    correctAnswer: 3,
    explanation:
      'Ergonomic hazards relate to the physical demands of work that can cause musculoskeletal injuries. Manual handling, repetitive movements, awkward postures, and prolonged standing are common ergonomic hazards in building services.',
  },
  {
    id: 8,
    question:
      'Which observation technique involves watching workers perform their normal tasks without prior notice?',
    options: [
      'Behavioural safety observation',
      'Incident investigation',
      'Scheduled safety audit',
      'Formal inspection',
    ],
    correctAnswer: 0,
    explanation:
      "Behavioural safety observations capture how work is actually performed, not how workers think it should be done when they know they're being watched. This reveals genuine hazardous behaviours and unsafe conditions.",
  },
  {
    id: 9,
    question:
      "According to Heinrich's Triangle, for every serious injury there are approximately how many near misses?",
    options: [
      '10',
      '300',
      '29',
      '1000',
    ],
    correctAnswer: 1,
    explanation:
      "Heinrich's research suggested a ratio of 1:29:300 - for every serious injury, there are 29 minor injuries and 300 near misses. Modern studies suggest the near-miss ratio may be even higher. This demonstrates the importance of near-miss reporting.",
  },
  {
    id: 10,
    question:
      'When using a hazard checklist for electrical installations, which item would NOT typically be included?',
    options: [
      'Condition of cable insulation',
      'Adequacy of isolation procedures',
      'Staff holiday entitlements',
      'Presence of safety signage',
    ],
    correctAnswer: 2,
    explanation:
      'Hazard checklists for electrical work focus on physical conditions, equipment state, procedures, and safety controls. Administrative matters like holiday entitlements are HR issues, not safety hazard identification items.',
  },
];

const faqs = [
  {
    question: "What's the difference between a hazard inspection and a risk assessment?",
    answer:
      "A hazard inspection identifies what hazards are present in the workplace - it's observational and factual. A risk assessment evaluates those hazards to determine the likelihood and severity of harm, then specifies control measures. Inspection comes first; assessment follows using the inspection findings.",
  },
  {
    question: 'How do I encourage workers to report near misses without fear of blame?',
    answer:
      "Establish a 'just culture' where honest reporting is valued and protected. Focus investigations on system failures, not individual blame. Provide anonymous reporting options. Give feedback showing how reports led to improvements. Recognise and thank those who report. Management must lead by example in reporting their own near misses.",
  },
  {
    question: 'Should I use generic checklists or create site-specific ones?',
    answer:
      "Both have value. Generic checklists from HSE or industry bodies ensure you cover standard hazards and regulatory requirements. However, these should be supplemented with site-specific items based on your workplace's unique equipment, processes, and conditions. The most effective approach combines generic foundations with site-specific additions.",
  },
  {
    question: 'How detailed should a Job Safety Analysis be?',
    answer:
      'A JSA should break the job into enough steps to identify hazards at each stage, but not so many that it becomes unworkable. Typically 10-20 steps for a complex task. Each step should describe what the worker does, potential hazards at that step, and specific control measures. It should be practical enough for workers to actually use.',
  },
  {
    question: 'What qualifications do I need to conduct workplace inspections?',
    answer:
      "No specific qualification is legally required, but inspectors must be 'competent' - meaning they have sufficient training, knowledge, and experience to identify hazards in the workplace being inspected. For building services, this typically means understanding electrical, mechanical, and environmental hazards. Many employers use IOSH or NEBOSH trained personnel for formal inspections.",
  },
  {
    question: "How do I identify hazards in work I haven't done before?",
    answer:
      "Consult manufacturer's instructions and safety data sheets. Review industry guidance (HSE, ECA, JIB publications). Speak to experienced workers who have done similar work. Look at incident records from similar jobs. Conduct a thorough JSA before starting. If uncertain, seek specialist advice - don't proceed without understanding the hazards.",
  },
];

const HNCModule1Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1.2.1"
            title="Hazard Identification Methods"
            description="Systematic techniques for identifying workplace hazards in building services environments"
            tone="purple"
          />

          <TLDR
            points={[
              'You will choose the right hazard identification technique for the job — checklist, walk-through, task analysis, what-if, HAZOP, FMEA — rather than defaulting to a generic template.',
              'You can run a structured workshop (multi-discipline, time-boxed, evidence-based) and capture findings in a register that maps to MHSWR Reg 3.',
              'You apply the &ldquo;eight categories&rdquo; mental model — physical, chemical, biological, ergonomic, psychosocial, electrical, environmental, organisational — to avoid blind spots.',
              'You consult the workforce under HSWA s.2(6) and Safety Reps Regs 1977 — and you record the consultation, not just the outcome.',
            ]}
          />

          <RegsCallout
            source="MHSWR 1999 — Regulation 3(1)"
            clause="Every employer shall make a suitable and sufficient assessment of—(a) the risks to the health and safety of his employees to which they are exposed whilst they are at work; and (b) the risks to the health and safety of persons not in his employment arising out of or in connection with the conduct by him of his undertaking."
            meaning={
              <>
                Reg 3 starts with hazard identification. &ldquo;Suitable and sufficient&rdquo;
                means the method matches the complexity of the work. As an HNC engineer your
                choice of technique (checklist for routine work, HAZOP for novel design) is the
                first defendable step.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999, Reg 3(1) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish between hazards and risks in workplace safety",
              "Conduct effective workplace safety inspections",
              "Apply task analysis and Job Safety Analysis (JSA) techniques",
              "Analyse incident and near-miss data for hazard identification",
              "Use checklists and observation techniques effectively",
              "Categorise building services hazards appropriately",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Definition of Hazard vs Risk</ContentEyebrow>

          <ConceptBlock title="Definition of Hazard vs Risk">
            <p>
            Understanding the distinction between hazards and risks is fundamental to workplace
            safety. These terms are often confused but represent different concepts that together
            form the foundation of risk assessment.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Hazard</p>
            <p className="text-sm text-white mb-3">
            A hazard is anything with the <strong>potential</strong> to cause harm. This
            includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Physical objects (machinery, cables, heights)</li>
            <li>Substances (chemicals, asbestos, fumes)</li>
            <li>Energy sources (electricity, heat, radiation)</li>
            <li>Work methods (manual handling, repetitive tasks)</li>
            <li>Environmental conditions (noise, temperature, lighting)</li>
            </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Risk</p>
            <p className="text-sm text-white mb-3">
            Risk is the <strong>likelihood</strong> of harm occurring combined with its{' '}
            <strong>severity</strong>:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>How likely is someone to be exposed?</li>
            <li>How often does exposure occur?</li>
            <li>How severe could the harm be?</li>
            <li>How many people could be affected?</li>
            <li>What existing controls are in place?</li>
            </ul>
            </div>
            </div>

            <CommonMistake
            title="Practical Example"
            whatHappens={<><p className="text-sm text-white">
            <strong>Hazard:</strong> A distribution board with exposed live terminals
            <br />
            <strong>Risk assessment considers:</strong> Who has access? Is it locked? How often
            is it accessed? What voltage? Are workers trained? Is PPE available?
            <br />
            <strong>Risk level:</strong> Could range from low (locked room, trained personnel
            only) to extreme (open access, untrained workers)
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Risk Equation</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Likelihood</strong> — Definition: Probability of harm occurring. Factors: Frequency, duration, existing controls</li>
            <li><strong>Severity</strong> — Definition: Potential consequences. Factors: Minor injury to fatality</li>
            <li><strong>Exposure</strong> — Definition: Number and vulnerability of people. Factors: Workers, public, vulnerable groups</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> Hazard identification comes first - you cannot assess
            risk until you know what hazards exist.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Workplace Inspections and Task Analysis</ContentEyebrow>

          <ConceptBlock title="Workplace Inspections and Task Analysis">
            <p>
            Workplace inspections are systematic examinations to identify hazards, assess
            compliance, and verify that control measures are working. They range from informal
            daily checks to comprehensive formal audits.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Types of Workplace Inspection
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Informal/Daily</strong> — Frequency: Daily/continuous. Conducted By: All workers. Purpose: Spot immediate hazards</li>
            <li><strong>Scheduled</strong> — Frequency: Weekly/monthly. Conducted By: Supervisors, safety reps. Purpose: Systematic area checks</li>
            <li><strong>Formal audit</strong> — Frequency: Quarterly/annually. Conducted By: H&S professionals. Purpose: Comprehensive compliance review</li>
            <li><strong>Statutory</strong> — Frequency: As required by law. Conducted By: Competent persons. Purpose: LOLER, PUWER, pressure systems</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Effective Inspection Practice
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Use structured checklists appropriate to the area</li>
            <li>Involve workers who know the area</li>
            <li>
            Look at normal work, not just tidy 'inspection ready' conditions
            </li>
            <li>
            Check paperwork matches reality (permits, risk assessments)
            </li>
            <li>Document findings with photos where appropriate</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Focus Areas
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Electrical switch rooms and distribution areas</li>
            <li>Plant rooms (boilers, chillers, pumps)</li>
            <li>Roof access and equipment</li>
            <li>Cable routes and containment</li>
            <li>Access equipment storage and condition</li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Task Analysis Process</p>
            <p className="text-sm text-white mb-3">
            Task analysis systematically examines how work is actually performed to identify
            hazards inherent in the task itself:
            </p>
            <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
            <li>
            <strong>Select the task</strong> - prioritise high-risk or frequently performed
            tasks
            </li>
            <li>
            <strong>Break it down</strong> - identify each step in sequence
            </li>
            <li>
            <strong>Identify hazards</strong> - what could go wrong at each step?
            </li>
            <li>
            <strong>Assess demands</strong> - physical, mental, environmental
            </li>
            <li>
            <strong>Consider variations</strong> - what if conditions aren't ideal?
            </li>
            </ol>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> Inspections identify hazards; they don't replace risk
            assessments. Findings must be actioned, not just recorded.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Job Safety Analysis and Incident Data Analysis</ContentEyebrow>

          <ConceptBlock title="Job Safety Analysis and Incident Data Analysis">
            <p>
            Job Safety Analysis (JSA) - also called Job Hazard Analysis (JHA) - is a technique for
            systematically identifying hazards associated with specific jobs before work begins.
            Combined with incident data analysis, it provides both proactive and reactive hazard
            identification.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            JSA Development Process
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1. Select job</strong> — Action: Choose task for analysis. Output: Job title and scope defined</li>
            <li><strong>2. Break down</strong> — Action: List sequential steps. Output: 10-20 discrete steps</li>
            <li><strong>3. Identify hazards</strong> — Action: For each step, ask "what could go wrong?". Output: Hazard list per step</li>
            <li><strong>4. Develop controls</strong> — Action: Determine preventive measures. Output: Control measures per hazard</li>
            <li><strong>5. Review</strong> — Action: Validate with experienced workers. Output: Approved JSA document</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Example JSA: DB Installation
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1. Transport DB to location</strong> — Hazards: Manual handling, trips. Controls: Trolley, clear route, two-person lift</li>
            <li><strong>2. Mark fixing positions</strong> — Hazards: Working at height, dust. Controls: Stepladder, eye protection</li>
            <li><strong>3. Drill fixings</strong> — Hazards: Buried services, dust, noise. Controls: CAT scan, RPE, hearing protection</li>
            <li><strong>4. Mount enclosure</strong> — Hazards: Lifting, sharp edges. Controls: Two-person lift, gloves</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Incident Data Analysis
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Review accident reports for root causes</li>
            <li>Analyse near-miss reports for patterns</li>
            <li>Track first-aid cases by type and location</li>
            <li>Identify common contributing factors</li>
            <li>Compare with industry incident data</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heinrich's Triangle</p>
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="text-xs text-white mb-2">For every:</p>
            <p className="text-lg font-bold text-red-400">1 Serious Injury</p>
            <p className="text-xs text-white my-1">there are</p>
            <p className="text-lg font-bold text-orange-400">29 Minor Injuries</p>
            <p className="text-xs text-white my-1">and</p>
            <p className="text-lg font-bold text-yellow-400">300 Near Misses</p>
            </div>
            </div>
            

            <CommonMistake
            title="Near Miss Importance"
            whatHappens={<><p className="text-sm text-white">
            Near misses are 'free lessons' - incidents where harm could have occurred but
            didn't. They reveal the same hazards and system failures as actual injuries but
            without the human cost. Organisations with strong near-miss reporting cultures have
            significantly lower injury rates.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Best practice:</strong> JSAs should be developed with input from workers who
            actually perform the task - they know the real hazards.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Checklists, Observation Techniques and Hazard Categories</ContentEyebrow>

          <ConceptBlock title="Checklists, Observation Techniques and Hazard Categories">
            <p>
            Checklists and structured observation techniques ensure consistent, thorough hazard
            identification. Understanding hazard categories helps ensure nothing is overlooked in
            building services environments.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Effective Use of Checklists
            </p>
            
            
            <p className="font-medium text-green-400 text-sm mb-2">Advantages</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Ensures consistent coverage</li>
            <li>Prompts for easily forgotten items</li>
            <li>Provides audit trail</li>
            <li>Useful for training inspectors</li>
            </ul>
            
            
            <p className="font-medium text-red-400 text-sm mb-2">Limitations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Can become tick-box exercise</li>
            <li>May miss unlisted hazards</li>
            <li>Generic lists miss site-specific issues</li>
            <li>Must be kept current</li>
            </ul>
            
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Observation Techniques</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Behavioural observation</strong> — Description: Watch work as normally performed. Best For: Identifying unsafe acts</li>
            <li><strong>Safety tours</strong> — Description: Management walkabouts. Best For: General awareness, engagement</li>
            <li><strong>Safety sampling</strong> — Description: Check specific items randomly. Best For: PPE compliance, housekeeping</li>
            <li><strong>Task observation</strong> — Description: Watch complete task performance. Best For: Validating JSAs, training needs</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Hazard Categories
            </p>
            
            <CommonMistake
            title="Electrical Hazards"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Electric shock (direct/indirect contact)</li>
            <li>Arc flash and arc blast</li>
            <li>Burns from overheated equipment</li>
            <li>Fire from electrical faults</li>
            <li>Explosion in hazardous areas</li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="font-medium text-blue-400 mb-2">Mechanical Hazards</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Moving parts (fans, pumps, belts)</li>
            <li>Pressure systems (compressors, vessels)</li>
            <li>Lifting equipment failure</li>
            <li>Falling objects</li>
            <li>Sharp edges and projections</li>
            </ul>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="font-medium text-green-400 mb-2">Environmental Hazards</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Working at height</li>
            <li>Confined spaces</li>
            <li>Asbestos (in older buildings)</li>
            <li>Extreme temperatures</li>
            <li>Noise exposure</li>
            <li>Poor lighting</li>
            </ul>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <p className="font-medium text-purple-400 mb-2">Ergonomic Hazards</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Manual handling (cables, equipment)</li>
            <li>Repetitive movements</li>
            <li>Awkward postures</li>
            <li>Prolonged standing/kneeling</li>
            <li>Vibrating tools (HAVs)</li>
            </ul>
            </div>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Comprehensive approach:</strong> Check all four hazard categories for every
            task - electrical work involves more than just electrical hazards.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Key Principles for Hazard Identification</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Be systematic</strong> - use checklists, categories, and structured
            methods
            </li>
            <li>
            <strong>Involve workers</strong> - they know the real hazards from daily
            experience
            </li>
            <li>
            <strong>Look at actual work</strong> - not just procedures and policies
            </li>
            <li>
            <strong>Consider variations</strong> - what happens when things aren't normal?
            </li>
            <li>
            <strong>Document and act</strong> - identification without action is pointless
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Legal Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Management of Health and Safety at Work Regulations 1999 - requires risk
            assessment
            </li>
            <li>RIDDOR 2013 - requires reporting of specified incidents</li>
            <li>HASAWA 1974 - general duty to identify and control hazards</li>
            <li>
            CDM Regulations 2015 - specific requirements for construction
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Common Mistakes to Avoid</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Generic assessments</strong> - copying without site-specific consideration
            </li>
            <li>
            <strong>Desk-based only</strong> - not physically inspecting the work area
            </li>
            <li>
            <strong>Ignoring near misses</strong> - missing valuable leading indicators
            </li>
            <li>
            <strong>One-time exercise</strong> - not reviewing when conditions change
            </li>
            <li>
            <strong>Worker exclusion</strong> - not involving those who do the work
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A pre-design HAZOP for a new lithium battery storage system"
            situation={
              <>
                You are the building services HNC engineer brought in to support a 250 kWh
                lithium-iron-phosphate battery storage installation in a basement plant room of
                an office. The novel chemistry, the location and the integration with rooftop PV
                make a generic checklist inadequate.
              </>
            }
            whatToDo={
              <>
                Run a HAZOP with the M&amp;E designer, the BMS specialist, the fire engineer and
                the FM team. Take each &ldquo;node&rdquo; (battery cabinet, BMS, inverter,
                ventilation, fire suppression, isolation) and apply the guidewords (no, more,
                less, reverse, other than) to discover hazards. Record findings in a hazard
                register cross-referenced to BS EN IEC 62619, BS 9991, DSEAR and BS 7671 Section
                722. Feed the residual risks into the CDM pre-construction information.
              </>
            }
            whyItMatters={
              <>
                Lithium battery thermal-runaway events have killed in confined plant rooms.
                Generic risk assessments routinely miss the propagation pathway. A HAZOP forces
                the engineer to ask the questions the checklist never anticipated.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Hazard identification is the first step of MHSWR Reg 3 — risk assessment cannot start until hazards are surfaced.',
              'Match technique to work: checklist for routine, walk-through for existing premises, task analysis for procedures, HAZOP for novel/complex design, FMEA for hardware/components.',
              'Use the eight-category mental model (physical, chemical, biological, ergonomic, psychosocial, electrical, environmental, organisational) to avoid blind spots.',
              'Multi-discipline workshops surface hazards single-discipline reviews miss — invite design, install, commissioning, FM and end-user.',
              'Consult workers under HSWA s.2(6) and the Safety Reps Regulations 1977 / HSCER 1996 — records of consultation matter as much as the outcomes.',
              'Distinguish hazard (the source of harm) from risk (likelihood + severity) — Section 2.2 picks up the risk evaluation step.',
              'Re-identify when anything material changes — new equipment, new task, new layout, new operator, new substance.',
              'Hazard register is the live document — it feeds the risk assessment, the method statement and the CDM file.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 2
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Risk Assessment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section2_1;
