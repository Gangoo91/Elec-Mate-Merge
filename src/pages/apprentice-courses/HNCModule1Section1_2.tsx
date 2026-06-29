/**
 * Module 1 · Section 1 · Subsection 2 — Electricity at Work Regulations 1989
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The electrical-specific regulations made under HSWA. Mostly absolute duties — there
 *   is no SFARP defence on Reg 4. Engineer-in-training perspective: how EAWR sits behind
 *   every isolation, every live-working risk assessment and every BS 7671 design choice.
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

const TITLE = 'Electricity at Work Regulations 1989 - HNC Module 1 Section 1.2';
const DESCRIPTION =
  'Master the Electricity at Work Regulations 1989 for building services: key regulations, duties on systems and equipment, live working provisions, competence requirements and the defence of due diligence.';

const quickCheckQuestions = [
  {
    id: 'eawr-scope',
    question: 'To whom do the Electricity at Work Regulations 1989 apply?',
    options: [
      'Only qualified electricians',
      'Only electrical contractors',
      'Only building services engineers',
      'All employers and employees at work',
    ],
    correctIndex: 3,
    explanation:
      'EAWR 1989 applies to ALL employers and employees who work with or near electrical systems. The regulations impose duties on everyone at work, not just electrical specialists.',
  },
  {
    id: 'regulation-14',
    question: 'Under Regulation 14, when is live working permitted?',
    options: [
      'Whenever isolation would be inconvenient or slow the work down',
      'Only when unreasonable to work dead and reasonable to work live',
      'Whenever the operative holds a valid live-working qualification',
      'Only on circuits operating below 230 V to earth',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 14 permits live working ONLY when it is unreasonable in all circumstances to make the equipment dead AND it is reasonable in all circumstances to work live. Both conditions must be satisfied.',
  },
  {
    id: 'regulation-16',
    question: 'What does Regulation 16 require regarding competence?',
    options: [
      'A nationally recognised qualification for every electrical task',
      'A minimum of five years of electrical work experience',
      'Membership of a recognised competent person scheme',
      'Technical knowledge, experience and ability to prevent danger',
    ],
    correctIndex: 3,
    explanation:
      'Regulation 16 requires persons to possess technical knowledge or experience, or be under appropriate supervision, to prevent danger and injury. It defines competence by outcome, not by specific qualifications.',
  },
  {
    id: 'due-diligence',
    question: "What is the 'defence of due diligence' under EAWR 1989?",
    options: [
      'A defence that the duty holder was unaware the regulation applied',
      'A defence that the work was carried out by a subcontractor',
      'Taking all reasonable steps and exercising all due diligence to avoid committing an offence',
      'A defence that no injury actually resulted from the breach',
    ],
    correctIndex: 2,
    explanation:
      'Regulation 29 provides a defence if the duty holder can prove they took all reasonable steps and exercised all due diligence to avoid committing the offence. This requires documented evidence of precautions taken.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which regulation of EAWR 1989 deals with the construction of electrical systems?',
    options: [
      'Regulation 5',
      'Regulation 4',
      'Regulation 8',
      'Regulation 12',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 4 requires that all systems shall at all times be of such construction as to prevent danger, so far as is reasonably practicable. This covers initial design, selection and installation.',
  },
  {
    id: 2,
    question: 'What does Regulation 12 require regarding means of cutting off supply?',
    options: [
      'Electrical equipment to be suitable for its environment or protected from adverse conditions',
      'Adequate working space, means of access and lighting for safe working',
      'Suitable means for cutting off supply and isolation from every source of electrical energy',
      'Conductors to be suitably insulated or otherwise protected against danger',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 12 requires suitable means for cutting off the supply of electrical energy to any electrical equipment AND for isolation of any electrical equipment from every source of electrical energy.',
  },
  {
    id: 3,
    question: "Under EAWR 1989, what is considered 'danger'?",
    options: [
      'Any contact with a conductor operating above 50 V AC',
      'Only the risk of fatal electric shock to a person',
      'Any electrical fault that interrupts the supply of energy',
      'Risk of injury from electric shock, burn, fire or explosion arising from electricity',
    ],
    correctAnswer: 3,
    explanation:
      "Regulation 2 defines 'danger' as risk of injury from electric shock, electrical burn, electrical explosion or arcing, or from fire or explosion initiated by electrical energy.",
  },
  {
    id: 4,
    question: 'Which regulation deals with work on or near live conductors?',
    options: [
      'Regulation 14',
      'Regulation 13',
      'Regulation 4',
      'Regulation 16',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 14 specifically addresses work on or near live conductors. It requires that no person shall work on or near live conductors unless certain strict conditions are met.',
  },
  {
    id: 5,
    question: 'What must be ensured before dead working according to Regulation 13?',
    options: [
      'A live-working permit is signed by a competent person',
      'Adequate precautions are taken to prevent the conductor becoming live',
      'The supply is restored within a fixed maximum time period',
      'The work is supervised by an HSE-appointed inspector',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 13 requires that adequate precautions shall be taken to prevent any conductor from becoming electrically charged during work. This includes isolation, proving dead, and applying locks/tags.',
  },
  {
    id: 6,
    question: "What does 'so far as is reasonably practicable' mean under EAWR?",
    options: [
      'Every possible precaution must be taken regardless of cost',
      'Precautions are only needed where an injury has already occurred',
      'Precautions must be taken unless the cost and effort greatly outweigh the risk reduction',
      'The duty applies only to employers and never to employees',
    ],
    correctAnswer: 2,
    explanation:
      'Reasonably practicable involves weighing the risk against the sacrifice (time, trouble, cost) needed to avert the risk. Duty holders must take precautions unless the cost is grossly disproportionate to the risk.',
  },
  {
    id: 7,
    question: 'Which regulation requires that electrical systems be maintained to prevent danger?',
    options: [
      'Regulation 10',
      'Regulation 5',
      'Regulation 6',
      'Regulation 4',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 4(2) states that all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger. This is part of the overall Regulation 4 on systems construction.',
  },
  {
    id: 8,
    question: 'What does Regulation 6 require for adverse or hazardous environments?',
    options: [
      'Electrical equipment to be suitable for its environment or protected from adverse conditions',
      'Adequate working space, access and lighting around the equipment',
      'A suitable means of cutting off the supply to the equipment',
      'Only competent persons to be engaged on the work activity',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 6 requires that electrical equipment exposed to adverse or hazardous environments (mechanical damage, weather, temperature, wet, dirty, corrosive, flammable) shall be suitable or protected.',
  },
  {
    id: 9,
    question:
      'In a building services context, what does Regulation 7 require for conductors in a system?',
    options: [
      'Conductors to be rated for the prospective fault current of the system',
      'Conductors to be suitably insulated or have other suitable precautions taken against danger',
      'Conductors to be isolated from every source of electrical energy before work',
      'Conductors to be installed only by a qualified competent person',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 7 requires that all conductors in a system that may give rise to danger shall either be suitably insulated or have other suitable precautions taken (such as placing out of reach or earthing).',
  },
  {
    id: 10,
    question: 'Who can be prosecuted under EAWR 1989?',
    options: [
      'Only the employer or company, never an individual worker',
      'Only persons who hold a formal electrical qualification',
      'Both employers and employees with duties under the regulations',
      'Only the HSE-appointed duty holder named on the site register',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR 1989 imposes duties on both employers and employees. Regulation 3 states that it shall be the duty of every employer and self-employed person to comply, and employees have duties under specific regulations.',
  },
  {
    id: 11,
    question: 'What does Regulation 15 require regarding working space, access and lighting?',
    options: [
      'A minimum clearance of one metre in front of all switchgear',
      'Emergency lighting to be installed in every electrical intake room',
      'A permit to work for any task carried out near live equipment',
      'Adequate working space, means of access and lighting for safe working',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 15 requires adequate working space, adequate means of access, and adequate lighting for all work activities on or near electrical equipment where danger may arise.',
  },
  {
    id: 12,
    question:
      'Which precautions would satisfy Regulation 14 for live working on a building services distribution board?',
    options: [
      'Insulated tools, barriers, PPE, accompaniment, and competent supervision',
      'A signed isolation certificate and proving the board dead',
      'A current EICR and PAT testing records for the board',
      'Adequate lighting and a one-metre exclusion zone alone',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 14 requires suitable precautions including: insulated tools, barriers/screens, appropriate PPE, accompaniment by another competent person, and competent supervision where appropriate.',
  },
];

const faqs = [
  {
    question: 'What is the difference between EAWR and BS 7671?',
    answer:
      'EAWR 1989 is criminal law - breach can result in prosecution, fines and imprisonment. It sets general safety objectives that must be achieved. BS 7671 (the Wiring Regulations) is a British Standard providing detailed technical requirements that, if followed, will likely satisfy EAWR. Compliance with BS 7671 is not mandatory but provides a presumption of compliance with EAWR for installation work.',
  },
  {
    question: 'Can employees be prosecuted under EAWR 1989?',
    answer:
      'Yes. EAWR imposes duties on both employers and employees. Employees have specific duties under Regulations 4, 7-16, and can be prosecuted for breaches. For example, an employee who knowingly works unsafely on live equipment without proper precautions could face personal prosecution.',
  },
  {
    question: 'What records should be kept to demonstrate due diligence?',
    answer:
      'Comprehensive records including: risk assessments, maintenance records, inspection certificates (EICR), training records, competence assessments, safe systems of work, permit to work documentation, equipment test records, and evidence of remedial actions taken. The HSE advises that records should demonstrate a systematic approach to electrical safety.',
  },
  {
    question: 'Does EAWR apply to low voltage DC systems in building services?',
    answer:
      'Yes. EAWR applies to all electrical systems regardless of voltage. This includes 24V DC BMS controls, emergency lighting systems, fire alarm circuits, and data/communications cabling where it interfaces with mains power. All such systems must be constructed and maintained to prevent danger.',
  },
  {
    question: "What constitutes 'competence' under Regulation 16?",
    answer:
      "Competence is not defined by specific qualifications but by three factors: technical knowledge, experience, and the ability to prevent danger and injury. A person may be competent for some tasks but not others. Competence must be matched to the complexity and risk of the work. Supervision can supplement an individual's competence.",
  },
  {
    question: 'When would the HSE prosecute for EAWR breaches?',
    answer:
      'The HSE typically prosecutes when: there has been a serious incident or near-miss, there is evidence of systematic failure, previous advice or enforcement has been ignored, or the duty holder has shown reckless disregard for safety. Prosecution can result in unlimited fines for organisations and imprisonment for individuals in serious cases.',
  },
];

const HNCModule1Section1_2 = () => {
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
            eyebrow="Module 1.1.2"
            title="Electricity at Work Regulations 1989"
            description="Criminal law provisions for electrical safety in the workplace - duties, defences and building services applications"
            tone="purple"
          />

          <TLDR
            points={[
              'You will use EAWR 1989 as the legal backbone for every isolation, every live test and every BS 7671 design decision on a building services project.',
              'You can distinguish absolute duties (Reg 4 — work on or near live conductors) from SFARP duties, and you know which require an EAWR Reg 29 due-diligence defence.',
              'You can justify "live work" against the three-part Reg 14 test in writing — unreasonable to make dead, reasonable to work live, and suitable precautions taken.',
              'You evidence Regulation 16 competence on every operative on your projects — from apprentice through to authorised person.',
            ]}
          />

          <RegsCallout
            source="EAWR 1989 — Regulation 4(1)"
            clause="All systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger."
            meaning={
              <>
                Reg 4 is the foundation duty. Reg 4(1) and 4(2) are SFARP, but Reg 4(3) is
                <em> absolute</em> — equipment in use must not give rise to danger. As an HNC
                designer/supervisor you cannot rely on a cost-benefit argument for Reg 4(3); the
                duty must be met. This is why &ldquo;safe by design&rdquo; choices in BS 7671 (RCDs,
                AFDDs, SPDs, robust earthing) carry through into your specification every time.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, Reg 4 — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the scope and application of EAWR 1989",
              "Identify the key regulations (3-16) and their requirements",
              "Understand duties on systems, equipment and conductors",
              "Apply Regulation 14 provisions for live working",
              "Define competence requirements under Regulation 16",
              "Demonstrate the defence of due diligence",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Key Regulations Overview (Regulations 3-16)</ContentEyebrow>

          <ConceptBlock title="Key Regulations Overview (Regulations 3-16)">
            <p>
            The Electricity at Work Regulations 1989 are made under the Health and Safety at Work
            etc. Act 1974. They impose duties on employers, employees and self-employed persons to
            ensure electrical safety in all workplaces. Unlike BS 7671, EAWR is criminal law -
            breaches can result in prosecution.
            </p>

            <CommonMistake
            title="Criminal Law Status"
            whatHappens={<><p className="text-sm text-white">
            EAWR 1989 is enforced by the Health and Safety Executive (HSE). Breaches can result
            in unlimited fines for organisations, and individuals can face personal prosecution
            with penalties including imprisonment. This distinguishes EAWR from BS 7671, which
            is a technical standard without direct legal force.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Structure of the Regulations
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1-3</strong> — Coverage: Interpretation and duties. Key Requirements: Defines terms; establishes who has duties</li>
            <li><strong>4-5</strong> — Coverage: Systems and equipment. Key Requirements: Construction and maintenance; equipment strength</li>
            <li><strong>6-9</strong> — Coverage: Protective provisions. Key Requirements: Environment; insulation; earthing; integrity</li>
            <li><strong>10-12</strong> — Coverage: Protective devices. Key Requirements: Connections; excess current; isolation</li>
            <li><strong>13-16</strong> — Coverage: Working practices. Key Requirements: Dead working; live working; space/access; competence</li>
            <li><strong>29</strong> — Coverage: Defence. Key Requirements: Due diligence defence for criminal proceedings</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> The phrase 'so far as is reasonably practicable' (SFAIRP)
            qualifies most duties. This requires a risk-based approach where precautions must be
            taken unless grossly disproportionate to the risk.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Duties on Systems, Equipment and Conductors</ContentEyebrow>

          <ConceptBlock title="Duties on Systems, Equipment and Conductors">
            <p>
            Regulations 4-12 establish fundamental requirements for electrical systems and
            equipment. These regulations apply throughout the lifecycle of building services
            installations - from design and installation through to maintenance and eventual
            decommissioning.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Regulation 4: Systems - Construction and Maintenance
            </p>
            <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-sm text-white mb-3">
            <strong>4(1):</strong> All systems shall at all times be of such construction as
            to prevent, so far as is reasonably practicable, danger.
            </p>
            <p className="text-sm text-white mb-3">
            <strong>4(2):</strong> All systems shall be maintained so as to prevent, so far as
            is reasonably practicable, such danger.
            </p>
            <p className="text-sm text-white">
            This regulation covers the entire electrical system including all electrical
            equipment. 'Maintained' includes regular inspection, testing, repair and
            replacement as necessary.
            </p>
            </div>
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Regulations 5-9: Equipment Protection
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Reg 5:</strong> Equipment strength and capability
            </li>
            <li>
            <strong>Reg 6:</strong> Suitability for adverse environments
            </li>
            <li>
            <strong>Reg 7:</strong> Insulation and protection of conductors
            </li>
            <li>
            <strong>Reg 8:</strong> Earthing and other precautions
            </li>
            <li>
            <strong>Reg 9:</strong> Integrity of referenced conductors
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Regulations 10-12: Protective Devices
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Reg 10:</strong> Proper connections
            </li>
            <li>
            <strong>Reg 11:</strong> Protection against excess current
            </li>
            <li>
            <strong>Reg 12:</strong> Means of cutting off supply and isolation
            </li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Applications
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Reg 5 (Strength)</strong> — Building Services Example: Switchgear rated for prospective fault current</li>
            <li><strong>Reg 6 (Environment)</strong> — Building Services Example: IP-rated equipment in plant rooms; ATEX zones</li>
            <li><strong>Reg 7 (Insulation)</strong> — Building Services Example: Cable insulation; busbars in trunking</li>
            <li><strong>Reg 11 (Excess current)</strong> — Building Services Example: MCBs, fuses, RCBOs properly coordinated</li>
            <li><strong>Reg 12 (Isolation)</strong> — Building Services Example: Local isolators at AHUs; emergency stops</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> These regulations require the outcome (prevention of
            danger) rather than prescribing specific methods. Compliance with BS 7671 generally
            satisfies these regulations for new installations.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Work on Live Equipment (Regulation 14)</ContentEyebrow>

          <ConceptBlock title="Work on Live Equipment (Regulation 14)">
            <p>
            Regulation 14 is one of the most important provisions in EAWR. It establishes a strong
            presumption against live working and requires strict conditions to be met before any
            live work can be undertaken.
            </p>

            <CommonMistake
            title="Regulation 14 - The Legal Test"
            whatHappens={<><p className="text-sm text-white italic mb-3">
            "No person shall be engaged in any work activity on or so near any live conductor
            (other than one suitably covered with insulating material so as to prevent danger)
            that danger may arise unless—"
            </p>
            <ul className="text-sm text-white space-y-2">
            <li className="flex items-start gap-2">
            <span className="font-bold text-red-400">(a)</span>
            <span>it is unreasonable in all the circumstances for it to be dead; and</span>
            </li>
            <li className="flex items-start gap-2">
            <span className="font-bold text-red-400">(b)</span>
            <span>
            it is reasonable in all the circumstances for him to be at work on or near it
            while it is live; and
            </span>
            </li>
            <li className="flex items-start gap-2">
            <span className="font-bold text-red-400">(c)</span>
            <span>
            suitable precautions (including where necessary the provision of suitable
            protective equipment) are taken to prevent injury.
            </span>
            </li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            When Live Working May Be Justified
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Fault finding:</strong> Diagnostic measurements requiring live circuits
            </li>
            <li>
            <strong>Commissioning:</strong> Initial energisation and testing of systems
            </li>
            <li>
            <strong>Critical services:</strong> Where isolation would cause greater risk
            (e.g., life support)
            </li>
            <li>
            <strong>Functional testing:</strong> Verifying correct operation of protective
            devices
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Required Precautions for Live Working
            </p>
            
            <div className="bg-white/5 p-3 rounded-lg">
            <p className="font-medium text-white text-sm mb-2">Technical Controls</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Insulated tools (1000V rated)</li>
            <li>Insulating matting</li>
            <li>Barriers and screens</li>
            <li>Test instruments with shrouded probes</li>
            <li>Restricted access</li>
            </ul>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
            <p className="font-medium text-white text-sm mb-2">Administrative Controls</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Written risk assessment</li>
            <li>Safe system of work / method statement</li>
            <li>Competent person undertaking work</li>
            <li>Accompaniment (second person)</li>
            <li>Competent supervision</li>
            </ul>
            </div>
            
            

            
            <p className="text-sm font-medium text-white mb-2">
            Regulation 13: Precautions for Dead Working
            </p>
            <p className="text-sm text-white mb-2">
            Before Regulation 14 applies, Regulation 13 requires adequate precautions to prevent
            conductors becoming live during work:
            </p>
            <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
            <li>Identify the circuit to be worked on</li>
            <li>Isolate from all points of supply</li>
            <li>Prove the isolation is effective</li>
            <li>Lock off and apply warning notices</li>
            <li>Prove the circuit is dead at the point of work</li>
            </ol>
            

            <p className="text-sm text-white italic">
            <strong>HSE Guidance:</strong> The HSE memorandum of guidance on EAWR (HSR25) states
            that live working should be the exception, not the rule. Convenience or cost savings
            alone do not justify live working.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Competence Requirements and Defence of Due Diligence</ContentEyebrow>

          <ConceptBlock title="Competence Requirements and Defence of Due Diligence">
            <p>
            Regulation 16 is fundamental to electrical safety - it requires that only competent
            persons undertake electrical work. Regulation 29 provides a defence for duty holders
            who can demonstrate they took all reasonable precautions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <p className="text-sm font-medium text-elec-yellow mb-2">
            Regulation 16 - Competence
            </p>
            <p className="text-sm text-white italic">
            "No person shall be engaged in any work activity where technical knowledge or
            experience is necessary to prevent danger or, where appropriate, injury, unless he
            possesses such knowledge or experience, or is under such degree of supervision as
            may be appropriate having regard to the nature of the work."
            </p>
            </div>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Components of Competence
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
            
            <p className="font-bold text-elec-yellow mb-1">Technical Knowledge</p>
            <p className="text-white text-xs">
            Understanding of electrical principles, regulations and standards
            </p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Experience</p>
            <p className="text-white text-xs">
            Practical skills developed through hands-on work
            </p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Ability to Prevent Danger</p>
            <p className="text-white text-xs">Judgement to recognise and avoid hazards</p>
            
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Competence in Building Services Context
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Simple replacement (lamp, fuse)</strong> — Competence Indicators: Basic electrical awareness. Supervision Level: General supervision</li>
            <li><strong>Circuit installation</strong> — Competence Indicators: NVQ Level 3 / AM2 or equivalent. Supervision Level: Periodic checking</li>
            <li><strong>Distribution board work</strong> — Competence Indicators: Qualified electrician with relevant experience. Supervision Level: Self-supervising</li>
            <li><strong>HV switchgear</strong> — Competence Indicators: HV authorisation; specific equipment training. Supervision Level: Authorised person system</li>
            </ul>
            
            

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm font-medium text-green-400 mb-2">
            Regulation 29 - Defence of Due Diligence
            </p>
            <p className="text-sm text-white mb-3">
            In criminal proceedings, it is a defence to prove that all reasonable steps were
            taken and all due diligence was exercised to avoid committing the offence.
            </p>
            <p className="text-sm font-medium text-white mb-2">Evidence required:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Documented risk assessments and method statements</li>
            <li>Records of inspection and testing (EICR certificates)</li>
            <li>Training records and competence assessments</li>
            <li>Maintenance schedules and records</li>
            <li>Evidence of acting on inspection findings</li>
            <li>Safe systems of work and permit procedures</li>
            </ul>
            </div>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Demonstrating Due Diligence
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Proactive management:</strong> Systematic approach to electrical safety,
            not reactive
            </li>
            <li>
            <strong>Competent advice:</strong> Using qualified persons for design,
            installation and inspection
            </li>
            <li>
            <strong>Regular inspection:</strong> EICR at appropriate intervals (typically 5
            years commercial)
            </li>
            <li>
            <strong>Prompt remediation:</strong> Acting on defects identified during
            inspections
            </li>
            <li>
            <strong>Record keeping:</strong> Comprehensive documentation of all safety
            measures
            </li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Critical point:</strong> The defence of due diligence is not available for all
            regulations. Regulations 4(4), 7-9, 11, and 13 are absolute duties where the defence
            does not apply - these regulations do not include 'so far as is reasonably
            practicable'.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Services Applications">
            <p><strong>Application 1: Commercial Office Building</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> Managing electrical safety in a multi-tenancy office
            building
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p className="mb-2">
            <strong>EAWR duties include:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Reg 4: Maintain common electrical systems (risers, distribution boards)</li>
            <li>Reg 12: Ensure tenants can isolate their supplies safely</li>
            <li>Reg 15: Adequate access and lighting in electrical intake rooms</li>
            <li>Reg 16: Use competent contractors for all electrical work</li>
            <li>EICR every 5 years; PAT testing; emergency lighting testing</li>
            </ul>
            </div>
            

            
            <p><strong>Application 2: Industrial Facility</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> HVAC system maintenance in a manufacturing plant
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p className="mb-2">
            <strong>Key considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Reg 6: Equipment rated for industrial environment (dust, vibration, temperature)
            </li>
            <li>Reg 11: Motor protection coordinated with upstream devices</li>
            <li>Reg 12: Local isolation at each AHU, FCU, and motor</li>
            <li>Reg 13: Lock-out/tag-out procedures for maintenance</li>
            <li>Reg 14: Live fault-finding only with full precautions</li>
            </ul>
            </div>
            

            
            <p><strong>Application 3: Healthcare Facility</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> Electrical safety in hospital building services
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p className="mb-2">
            <strong>Enhanced requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>HTM 06-01 supplements EAWR for healthcare premises</li>
            <li>Critical supplies: Cannot simply isolate - life support systems</li>
            <li>
            Reg 14 considerations: May justify live working where isolation unacceptable
            </li>
            <li>Enhanced competence: Medical location awareness required</li>
            <li>More frequent inspection: Annual EICR for Group 2 medical locations</li>
            </ul>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Key Regulations Summary</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Reg 3:</strong> Duties on employers and employees
            </li>
            <li>
            <strong>Reg 4:</strong> Systems construction and maintenance
            </li>
            <li>
            <strong>Reg 12:</strong> Means of cutting off and isolation
            </li>
            <li>
            <strong>Reg 13:</strong> Precautions for working dead
            </li>
            <li>
            <strong>Reg 14:</strong> Live working restrictions
            </li>
            <li>
            <strong>Reg 16:</strong> Competence requirements
            </li>
            <li>
            <strong>Reg 29:</strong> Defence of due diligence
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Compliance Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Current EICR in place (within 5 years for commercial)</li>
            <li>All C1/C2 defects remediated</li>
            <li>Competent persons appointed for electrical work</li>
            <li>Safe isolation procedures documented</li>
            <li>Training records maintained</li>
            <li>Risk assessments for electrical work activities</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Non-Compliances</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Inadequate maintenance:</strong> No EICR or inspection regime
            </li>
            <li>
            <strong>Unauthorised work:</strong> Unqualified persons doing electrical work
            </li>
            <li>
            <strong>Unsafe live working:</strong> Without proper risk assessment/precautions
            </li>
            <li>
            <strong>Missing isolation:</strong> No local means of isolation at equipment
            </li>
            <li>
            <strong>Poor records:</strong> Unable to demonstrate due diligence
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="EAWR 1989 — Regulation 14"
            clause="No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless—(a) it is unreasonable in all the circumstances for it to be dead; and (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."
            meaning={
              <>
                Three tests, all must be satisfied. As an HNC supervisor you record this in writing
                before any live work proceeds — typically as a live-working risk assessment plus a
                permit. &ldquo;Easier this way&rdquo; or &ldquo;the programme&rsquo;s tight&rdquo;
                fails the (a) test on its own.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, Reg 14 — legislation.gov.uk"
          />

          <Scenario
            title="Live testing under load on an existing distribution board"
            situation={
              <>
                You are commissioning a new sub-circuit on a 24/7 data centre distribution board.
                Full isolation would require a planned shutdown the client refuses to fund.
                Live testing is being requested for IR and load checks.
              </>
            }
            whatToDo={
              <>
                Apply Reg 14 in writing: prove (a) that making dead is unreasonable (production
                loss case), (b) that live working is reasonable (small scope, tested operatives,
                Class II tools), and (c) that precautions are suitable (CAT IV instruments, GS38
                leads, mats, two-person rule, defined exclusion zone, permit-to-work). Issue the
                permit only if all three are documented and signed by the responsible engineer.
              </>
            }
            whyItMatters={
              <>
                EAWR 1989 carries unlimited fines and personal prosecution. The HSE will request
                the Reg 14 documentation as the first piece of evidence after any incident — if
                you cannot produce it, the breach is presumed.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'EAWR 1989 is criminal law — breaches are prosecuted by HSE, not chased through the civil courts.',
              'Reg 4(3) is an absolute duty. SFARP does not apply. Equipment in use must not give rise to danger.',
              'Reg 14 sets the three-part test for live work — all three limbs must be evidenced before work starts.',
              'Reg 16 requires technical competence proportionate to the work — you must record skilled, instructed and ordinary person designations.',
              'Reg 29 provides a due-diligence defence — but only for SFARP duties, not absolute ones.',
              'Following BS 7671 is the recognised way to demonstrate compliance with EAWR for installation work.',
              'Self-employed contractors carry the same EAWR duties as employers — there is no escape via labour-only routes.',
              'EAWR documentation (isolation certificates, live-working permits, competence records) is the audit trail HSE will request first after any electrical incident.',
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
              onClick={() => navigate('../h-n-c-module1-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                BS 7671 Requirements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section1_2;
