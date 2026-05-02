/**
 * Module 1 · Section 4 · Subsection 5 — Continuous Professional Development
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Maintaining and developing competence over a career — formal training, structured
 *   experience, reflective practice. Engineer-in-training perspective: how an HNC engineer
 *   plans, records and evidences CPD as the bridge to IEng/CEng registration.
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

const TITLE = 'Continuous Professional Development - HNC Module 1 Section 4.5';
const DESCRIPTION =
  'Master health and safety CPD requirements, professional qualifications (NEBOSH, IOSH), keeping knowledge current, and IET registration requirements for building services engineers.';

const quickCheckQuestions = [
  {
    id: 'cpd-requirement',
    question: 'Why is CPD particularly important for health and safety competence?',
    options: [
      'It is only important for career progression',
      'Legislation, standards, and best practice evolve continuously, requiring updated knowledge',
      'CPD is only relevant for those seeking promotion',
      'It is optional for qualified professionals',
    ],
    correctIndex: 1,
    explanation:
      'Health and safety legislation, regulations, standards, and best practice are constantly evolving. CPD ensures professionals maintain current knowledge and competence. Without ongoing development, knowledge becomes outdated and practice may become non-compliant.',
  },
  {
    id: 'nebosh-certificate',
    question: 'What is the NEBOSH National General Certificate designed to provide?',
    options: [
      'Expert-level knowledge for health and safety professionals only',
      'A broad understanding of health and safety for managers and supervisors',
      'Specialist electrical safety knowledge',
      'First aid at work certification',
    ],
    correctIndex: 1,
    explanation:
      'The NEBOSH National General Certificate provides a broad understanding of health and safety principles and management for people with H&S responsibilities, such as managers, supervisors, and safety representatives. It is a widely recognised qualification.',
  },
  {
    id: 'iosh-membership',
    question: 'What is IOSH Managing Safely designed for?',
    options: [
      'Health and safety professionals only',
      'Managers and supervisors in any sector who need practical H&S skills',
      'Senior executives only',
      'Those with no workplace responsibilities',
    ],
    correctIndex: 1,
    explanation:
      'IOSH Managing Safely is a practical course for managers and supervisors in any sector. It covers risk assessment, hazard control, and legal responsibilities. It provides practical tools for managing safety rather than specialist H&S professional knowledge.',
  },
  {
    id: 'iet-cpd',
    question: 'What are the CPD requirements for IET membership?',
    options: [
      'No CPD is required for IET membership',
      '35 hours per year is recommended, with demonstrable commitment to ongoing learning',
      'Exactly 100 hours per year mandatory',
      'CPD is only required for Chartered members',
    ],
    correctIndex: 1,
    explanation:
      'The IET recommends 35 hours of CPD per year across various activities. All members should demonstrate commitment to ongoing professional development, though specific requirements may vary. Chartered members must maintain CPD records for professional review.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is a benefit of structured CPD for health and safety?',
    options: [
      'It is only useful for getting pay rises',
      'It ensures knowledge remains current as legislation and practice evolve',
      'It is only required for those who failed their initial qualifications',
      'It has no practical benefit for experienced professionals',
    ],
    correctAnswer: 1,
    explanation:
      'Structured CPD ensures professionals maintain current knowledge of evolving legislation, standards, and best practice. Even experienced professionals need to update their knowledge as the H&S landscape changes.',
  },
  {
    id: 2,
    question: "What does 'CPD' stand for?",
    options: [
      'Certificate of Professional Distinction',
      'Continuing Professional Development',
      'Comprehensive Project Delivery',
      'Company Policy Document',
    ],
    correctAnswer: 1,
    explanation:
      'CPD stands for Continuing Professional Development - the ongoing process of maintaining and developing professional knowledge and skills throughout a career.',
  },
  {
    id: 3,
    question:
      'Which qualification would be most appropriate for someone wanting to specialise as a health and safety professional?',
    options: [
      'IOSH Working Safely',
      'NEBOSH National General Certificate',
      'NEBOSH Diploma or NVQ Level 6 in H&S',
      'Fire Marshal certificate',
    ],
    correctAnswer: 2,
    explanation:
      'The NEBOSH Diploma and NVQ Level 6 in Occupational Health and Safety are professional-level qualifications for those wanting to work as H&S specialists. The NEBOSH Certificate is intermediate, while IOSH Working Safely is introductory.',
  },
  {
    id: 4,
    question: 'What types of activities count towards CPD?',
    options: [
      'Only formal classroom training courses',
      'Only professional body meetings',
      'A variety including formal training, self-study, mentoring, technical reading, conferences',
      'Only activities that result in new qualifications',
    ],
    correctAnswer: 2,
    explanation:
      'CPD encompasses many activities: formal courses, conferences, seminars, professional body meetings, technical reading, online learning, mentoring, work-based learning, project work, and self-directed study. The key is that learning is taking place.',
  },
  {
    id: 5,
    question:
      'What is the role of professional registration with bodies like the IET or Engineering Council?',
    options: [
      'It is purely optional with no practical benefit',
      'It demonstrates competence, commitment to standards, and ethical conduct',
      'It is only relevant for academic engineers',
      'It replaces the need for CPD',
    ],
    correctAnswer: 1,
    explanation:
      'Professional registration demonstrates that an individual meets defined standards of competence, commits to ethical conduct and CPD, and is accountable to the professional body. It provides assurance to employers and clients of professional standing.',
  },
  {
    id: 6,
    question: "The IOSH qualification 'Working Safely' is designed for:",
    options: [
      'Health and safety managers only',
      'Directors and senior executives',
      'All workers to provide essential H&S awareness',
      'Safety inspectors',
    ],
    correctAnswer: 2,
    explanation:
      'IOSH Working Safely is an introductory-level course designed for all workers. It provides essential H&S awareness including hazard identification, risk, and individual responsibilities. It is often used for general workforce H&S induction.',
  },
  {
    id: 7,
    question: 'Why should building services engineers maintain CPD records?',
    options: [
      'Only because their employer requires it',
      'To demonstrate ongoing competence, support professional registration, and evidence compliance',
      'Records are not necessary if you attend training',
      'Only Chartered Engineers need records',
    ],
    correctAnswer: 1,
    explanation:
      'CPD records demonstrate ongoing commitment to professional development, support professional registration applications and reviews, provide evidence of competence for employers and clients, and may be required for regulatory compliance.',
  },
  {
    id: 8,
    question:
      'What changed in BS 7671 that required all qualified electricians to update their knowledge?',
    options: [
      'Nothing has changed - BS 7671 has remained the same',
      'BS 7671 is updated every 3-4 years with amendments, requiring ongoing CPD to stay current',
      'Only the cover colour changed',
      'BS 7671 updates are optional to follow',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 is regularly updated (typically every 3-4 years with interim amendments). Changes affect installation requirements, testing procedures, and documentation. Electricians must undertake CPD to understand and correctly apply current requirements.',
  },
  {
    id: 9,
    question: "Which organisation provides 'Chartered Engineer' (CEng) registration in the UK?",
    options: [
      'NICEIC',
      'JIB',
      'The Engineering Council through licensed bodies like the IET',
      'HSE',
    ],
    correctAnswer: 2,
    explanation:
      'The Engineering Council is the regulatory body for the engineering profession in the UK. It awards CEng through licensed professional bodies like the IET. CEng demonstrates high-level engineering competence and commitment to professional standards.',
  },
  {
    id: 10,
    question: "What is 'reflective practice' in the context of CPD?",
    options: [
      'Working in front of a mirror',
      'Analysing your experiences to identify learning and areas for improvement',
      'Only counting formal course attendance',
      "Copying other professionals' approaches",
    ],
    correctAnswer: 1,
    explanation:
      'Reflective practice involves thinking critically about your experiences, analysing what went well and what could improve, identifying learning from both successes and failures, and using insights to develop practice. It is a key component of effective CPD.',
  },
];

const faqs = [
  {
    question: 'How many hours of CPD should I do per year?',
    answer:
      'Most professional bodies recommend around 35 hours per year, though this varies. The IET recommends 35 hours across a range of activities. Quality is more important than quantity - CPD should be relevant to your role and development needs. Some hours may be mandatory (e.g., BS 7671 updates) while others are self-directed based on your development plan.',
  },
  {
    question: 'Does informal learning count as CPD?',
    answer:
      'Yes, informal learning can count as CPD if it contributes to your professional development. This includes technical reading, attending site briefings, mentoring or being mentored, learning from colleagues, and work-based learning. The key is to reflect on what you learned and how it improves your practice, and to document it.',
  },
  {
    question: "What's the difference between NEBOSH Certificate and NEBOSH Diploma?",
    answer:
      'The NEBOSH National General Certificate is an intermediate qualification providing broad H&S knowledge for managers and supervisors - typically requiring 80-120 study hours. The NEBOSH Diploma is a professional qualification for those wanting to work as H&S practitioners - requiring 400+ study hours and demonstrating ability to develop and manage H&S systems.',
  },
  {
    question: 'Do I need NEBOSH or IOSH qualifications as an electrician?',
    answer:
      'While not legally required for most electricians, H&S qualifications demonstrate competence and can enhance career prospects. IOSH Managing Safely is valuable for supervisors and those with H&S responsibilities. NEBOSH qualifications may be required for project managers or those in dedicated H&S roles. Many employers value these qualifications for senior positions.',
  },
  {
    question: 'How do I become a Chartered Engineer (CEng)?',
    answer:
      "CEng requires: an accredited degree (MEng or BEng plus further learning to master's level), demonstrated competence against the UK-SPEC standard through a professional review, commitment to CPD, and membership of a licensed professional body like the IET. The process involves submitting a competence report and attending a professional review interview.",
  },
  {
    question: "What happens if I don't maintain my CPD?",
    answer:
      'Consequences depend on your professional registration. IET members should demonstrate ongoing commitment to development - failure to do so may affect membership status or Chartered registration. More practically, without CPD your knowledge becomes outdated, potentially leading to non-compliance with current standards, reduced competence, and career limitations.',
  },
];

const HNCModule1Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 1.4.5"
            title="Continuous Professional Development"
            description="Maintaining and developing health and safety competence throughout your career"
            tone="purple"
          />

          <TLDR
            points={[
              'You will treat CPD as a structured, recorded discipline — not as &ldquo;the courses I happened to attend last year&rdquo;.',
              'You can design a CPD plan with measurable outcomes against the Engineering Council UK-SPEC and the IET / CIBSE registration requirements.',
              'You log activity (formal, informal, structured, reflective) and demonstrate impact on your day job.',
              'You stay current on BS 7671 amendments (latest A4:2026), new technologies (EV, PV, BESS) and new regulatory regimes.',
            ]}
          />

          <RegsCallout
            source="EAWR 1989 — Regulation 16"
            clause="No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
            meaning={
              <>
                Reg 16 requires &ldquo;technical knowledge or experience&rdquo; to prevent
                danger. Knowledge degrades — BS 7671 amendments, new equipment, new chemistries.
                CPD is the legal mechanism that keeps you on the right side of Reg 16 over a
                career.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, Reg 16 — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the importance of CPD for health and safety competence",
              "Identify key H&S qualifications: NEBOSH Certificate, Diploma, IOSH courses",
              "Describe CPD activities and how to record them effectively",
              "Understand IET membership and Chartered Engineer requirements",
              "Plan a personal development approach for H&S competence",
              "Explain how CPD supports regulatory and professional compliance",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>The Importance of CPD for Health and Safety</ContentEyebrow>

          <ConceptBlock title="The Importance of CPD for Health and Safety">
            <p>
            Continuing Professional Development (CPD) is the ongoing process of maintaining and
            developing your professional knowledge, skills, and competence. In health and safety,
            CPD is particularly important because legislation, standards, and best practice are
            continuously evolving.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Why CPD is Essential for H&S
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Legislation changes:</strong> Regulations are regularly updated
            </li>
            <li>
            <strong>Standards evolve:</strong> BS 7671 amendments every 3-4 years
            </li>
            <li>
            <strong>Technology advances:</strong> New equipment, systems, hazards
            </li>
            <li>
            <strong>Best practice develops:</strong> Industry learns from incidents
            </li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Competence requirement:</strong> Legal duty to remain competent
            </li>
            <li>
            <strong>Professional obligation:</strong> Codes of conduct require CPD
            </li>
            <li>
            <strong>Career development:</strong> Progress requires updated skills
            </li>
            <li>
            <strong>Quality assurance:</strong> Clients expect current knowledge
            </li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">The CPD Cycle</p>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <div className="p-3 rounded bg-blue-500/10 border border-blue-500/30">
            <p className="font-bold text-blue-400 mb-1">1. Assess</p>
            <p className="text-xs text-white">Identify development needs</p>
            </div>
            <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
            <p className="font-bold text-green-400 mb-1">2. Plan</p>
            <p className="text-xs text-white">Set learning objectives</p>
            </div>
            <div className="p-3 rounded bg-purple-500/10 border border-purple-500/30">
            <p className="font-bold text-purple-400 mb-1">3. Do</p>
            <p className="text-xs text-white">Undertake activities</p>
            </div>
            <div className="p-3 rounded bg-orange-500/10 border border-orange-500/30">
            <p className="font-bold text-orange-400 mb-1">4. Reflect</p>
            <p className="text-xs text-white">Evaluate and record</p>
            </div>
            </div>
            

            <CommonMistake
            title="BS 7671 Example"
            whatHappens={<><p className="text-sm text-white">
            BS 7671 (the IET Wiring Regulations) is updated approximately every 3-4 years with
            significant amendments. The 18th Edition came into force in 2018, with Amendment 2
            in 2022 introducing changes to prosumer installations and EV charging, and Amendment 4
            (BS 7671:2018+A4:2026) bringing AFDDs (Reg 421.1.7), TN-C-S (PNB), revised RCD
            verification (Reg 643.3 — single AC test at IΔn) and updated Table 41.3 maxima
            (e.g. B32 max Zs = 1.37 Ω). Electricians must undertake CPD to understand and
            correctly apply current requirements. Working to outdated standards could result in
            non-compliant installations.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Legal context:</strong> The Management Regulations require employers to ensure
            workers remain competent - CPD is how this is achieved in practice.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Health and Safety Qualifications</ContentEyebrow>

          <ConceptBlock title="Health and Safety Qualifications">
            <p>
            Various qualifications are available for those wanting to develop health and safety
            knowledge, from introductory courses for all workers to professional-level
            qualifications for H&S specialists.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">NEBOSH Qualifications</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Health & Safety at Work Award</strong> — Level: Introductory. Target Audience: All workers. Study Time: 1 day</li>
            <li><strong>National General Certificate</strong> — Level: Intermediate. Target Audience: Managers, supervisors, safety reps. Study Time: 80-120 hours</li>
            <li><strong>Construction Certificate</strong> — Level: Intermediate. Target Audience: Construction managers, supervisors. Study Time: 80-120 hours</li>
            <li><strong>National Diploma</strong> — Level: Professional. Target Audience: H&S practitioners/professionals. Study Time: 400+ hours</li>
            </ul>
            
            

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm font-medium text-blue-400 mb-2">
            NEBOSH National General Certificate - Content
            </p>
            <p className="text-sm text-white mb-3">
            The widely-recognised intermediate qualification covering:
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Health and safety management systems</li>
            <li>Managing health and safety risks</li>
            <li>Health and safety monitoring and measuring</li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Physical and psychological health hazards</li>
            <li>Musculoskeletal hazards and controls</li>
            <li>Work equipment, chemicals, fire, electricity</li>
            </ul>
            
            </div>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">IOSH Qualifications</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Working Safely</strong> — Duration: 1 day. Target Audience: All workers. Content Focus: Essential H&S awareness</li>
            <li><strong>Managing Safely</strong> — Duration: 3-4 days. Target Audience: Managers, supervisors. Content Focus: Practical management skills</li>
            <li><strong>Leading Safely</strong> — Duration: 1 day. Target Audience: Senior leaders, directors. Content Focus: Strategic H&S leadership</li>
            </ul>
            
            

            <div className="my-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <p className="text-sm font-medium text-purple-400 mb-2">
            IOSH Managing Safely - Content
            </p>
            <p className="text-sm text-white mb-3">
            Practical course for managers and supervisors covering:
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Introduction to managing safely</li>
            <li>Assessing risks in the workplace</li>
            <li>Controlling risks</li>
            <li>Understanding responsibilities</li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Common hazards identification</li>
            <li>Investigating incidents</li>
            <li>Measuring performance</li>
            <li>Practical risk assessment project</li>
            </ul>
            
            </div>

            <p className="text-sm text-elec-yellow/70">
            <strong>Which to choose:</strong> IOSH courses are shorter, practical courses. NEBOSH
            provides deeper knowledge suitable for those with significant H&S responsibilities.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>CPD Activities and Recording</ContentEyebrow>

          <ConceptBlock title="CPD Activities and Recording">
            <p>
            CPD encompasses a wide range of activities beyond formal training courses. Effective
            CPD combines different types of learning and is documented to provide evidence of
            ongoing development.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Types of CPD Activities
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Formal Learning</strong> — Examples: Courses, qualifications, webinars. Building Services Context: BS 7671 Amendment course, NEBOSH</li>
            <li><strong>Self-Directed</strong> — Examples: Technical reading, online study. Building Services Context: Reading HSE guidance, IET publications</li>
            <li><strong>Work-Based</strong> — Examples: Projects, new responsibilities, job rotation. Building Services Context: Leading a safety improvement project</li>
            <li><strong>Professional</strong> — Examples: Conferences, professional body meetings. Building Services Context: IET local network events, IOSH branch</li>
            <li><strong>Informal</strong> — Examples: Mentoring, peer discussion, toolbox talks. Building Services Context: Coaching junior staff on safety</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            What to Record in CPD Logs
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Date:</strong> When the activity took place
            </li>
            <li>
            <strong>Activity:</strong> What you did
            </li>
            <li>
            <strong>Duration:</strong> Time spent (hours)
            </li>
            <li>
            <strong>Provider:</strong> Who delivered it
            </li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Learning objectives:</strong> What you aimed to learn
            </li>
            <li>
            <strong>Outcomes:</strong> What you actually learned
            </li>
            <li>
            <strong>Application:</strong> How you will apply it
            </li>
            <li>
            <strong>Evidence:</strong> Certificates, notes, etc.
            </li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reflective Practice</p>
            <p className="text-sm text-white mb-3">
            Effective CPD requires reflection - thinking critically about your experiences:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>What happened?</strong> Describe the situation or activity
            </li>
            <li>
            <strong>What did I learn?</strong> New knowledge, skills, or insights
            </li>
            <li>
            <strong>What worked well?</strong> Successes to build on
            </li>
            <li>
            <strong>What could improve?</strong> Areas for development
            </li>
            <li>
            <strong>What will I do differently?</strong> Concrete actions for the future
            </li>
            </ul>
            

            <CommonMistake
            title="Building Services CPD Examples"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>BS 7671:2018+A4:2026 update course (8 hours)</li>
            <li>Reading new HSE guidance on electrical safety (2 hours)</li>
            <li>Attending IET local network seminar on arc flash (3 hours)</li>
            <li>Leading toolbox talks on isolation procedures (1 hour)</li>
            <li>Mentoring apprentice on safe working practices (ongoing)</li>
            <li>Completing online module on CDM duties (4 hours)</li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Tip:</strong> Record CPD as you go, not at year end. Keep certificates, notes,
            and reflections organised for professional review.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>IET Membership and Professional Registration</ContentEyebrow>

          <ConceptBlock title="IET Membership and Professional Registration">
            <p>
            Professional registration through bodies like the IET and Engineering Council
            demonstrates competence, commitment to standards, and ethical conduct. It provides
            assurance to employers and clients and supports career development.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">IET Membership Grades</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Student</strong> — Letters: -. Requirements: Currently studying. Typical Profile: HNC/degree students</li>
            <li><strong>Associate</strong> — Letters: AMIET. Requirements: Interest in sector. Typical Profile: Early career, allied roles</li>
            <li><strong>Member</strong> — Letters: MIET. Requirements: Accredited degree or equivalent. Typical Profile: Graduate engineers</li>
            <li><strong>Fellow</strong> — Letters: FIET. Requirements: Distinguished contribution. Typical Profile: Senior leaders, experts</li>
            </ul>
            
            

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm font-medium text-blue-400 mb-2">
            Engineering Council Registration
            </p>
            <p className="text-sm text-white mb-3">
            The Engineering Council regulates the engineering profession through licensed bodies
            like the IET:
            </p>
            
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="font-bold text-green-400 mb-1">EngTech</p>
            <p className="text-xs text-white">Engineering Technician</p>
            <p className="text-xs text-white mt-1">Technician-level competence</p>
            </div>
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="font-bold text-yellow-400 mb-1">IEng</p>
            <p className="text-xs text-white">Incorporated Engineer</p>
            <p className="text-xs text-white mt-1">Degree-level competence</p>
            </div>
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="font-bold text-elec-yellow mb-1">CEng</p>
            <p className="text-xs text-white">Chartered Engineer</p>
            <p className="text-xs text-white mt-1">Master's-level competence</p>
            </div>
            
            </div>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Benefits of Professional Registration
            </p>
            
            <div>
            <p className="text-sm font-medium text-white mb-2">For You</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Recognition of your competence</li>
            <li>Enhanced career opportunities</li>
            <li>Access to professional networks</li>
            <li>Use of professional titles (CEng, IEng)</li>
            <li>International recognition</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-white mb-2">For Employers/Clients</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Assurance of competence</li>
            <li>Commitment to ethical standards</li>
            <li>Accountability to professional body</li>
            <li>Evidence of CPD maintenance</li>
            <li>Benchmark for recruitment</li>
            </ul>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">IET CPD Requirements</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Recommended <strong>35 hours</strong> per year across varied activities
            </li>
            <li>
            All members expected to demonstrate commitment to ongoing learning
            </li>
            <li>
            Chartered/Incorporated members must maintain records for professional review
            </li>
            <li>
            CPD should be relevant to current role and future development
            </li>
            <li>
            Combination of technical, professional, and personal development
            </li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Building services route:</strong> HNC provides foundation; HND/degree pathway
            to MIET and IEng/CEng registration with experience.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Planning Your CPD</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Assess current competence:</strong> What are your strengths and gaps?
            </li>
            <li>
            <strong>Consider role requirements:</strong> What does your job require now and in
            future?
            </li>
            <li>
            <strong>Set SMART objectives:</strong> Specific, Measurable, Achievable, Relevant,
            Time-bound
            </li>
            <li>
            <strong>Mix activities:</strong> Combine formal, informal, and work-based learning
            </li>
            <li>
            <strong>Schedule time:</strong> Block time for CPD in your calendar
            </li>
            <li>
            <strong>Review regularly:</strong> Assess progress and adjust plan
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Key Resources for Building Services CPD</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>IET:</strong> Wiring Matters, technical guidance, local networks
            </li>
            <li>
            <strong>HSE:</strong> Free guidance, alerts, statistics
            </li>
            <li>
            <strong>IOSH:</strong> Magazines, webinars, branch events
            </li>
            <li>
            <strong>Trade bodies:</strong> ECA, SELECT, NICEIC publications
            </li>
            <li>
            <strong>Manufacturers:</strong> Product training, technical updates
            </li>
            <li>
            <strong>Online platforms:</strong> E-learning, webinars, podcasts
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Common CPD Mistakes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Activity without learning:</strong> Attending courses without engaging or
            applying
            </li>
            <li>
            <strong>No record:</strong> Failing to document CPD for evidence
            </li>
            <li>
            <strong>No reflection:</strong> Not thinking about what was learned
            </li>
            <li>
            <strong>No plan:</strong> Random activities without strategic direction
            </li>
            <li>
            <strong>Only formal:</strong> Ignoring informal learning opportunities
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Building a CPD plan to bridge from HNC to IEng registration"
            situation={
              <>
                You have just completed your HNC and are working as a building services
                engineer. You want to register as IEng with the IET in three years and the
                firm has no formal CPD scheme.
              </>
            }
            whatToDo={
              <>
                Map UK-SPEC IEng competences against your current role. Identify gaps —
                typically design ownership, leadership of others, broader technical breadth.
                Build a 3-year plan with named projects, courses (BS 7671 A4:2026, design
                modules, project management), structured experience (lead a small project),
                a mentor (chartered or incorporated). Maintain a CPD log with reflective
                entries — not just attendance. Schedule annual reviews. Submit application
                with evidence pack.
              </>
            }
            whyItMatters={
              <>
                Registration is the formal recognition of competence and the door to higher
                responsibility, fees and pay. A structured CPD record is the single biggest
                determinant of a successful application.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'CPD is structured, recorded development — not ad-hoc course attendance.',
              'EAWR Reg 16 makes &ldquo;technical knowledge or experience&rdquo; a statutory requirement that must be maintained.',
              'Plan-Do-Reflect-Apply cycle: identify gap, undertake learning, reflect on outcome, apply in practice.',
              'Activity types: formal courses, structured experience, conferences, technical reading, mentoring, presentations, professional papers.',
              'CPD logs are the audit trail — date, activity, hours, outcome, reflection, evidence.',
              'Engineering Council UK-SPEC sets competences for EngTech, IEng and CEng — each level has a CPD expectation.',
              'IET / CIBSE / IMechE require annual CPD declarations for Members and registrants.',
              'CPD priorities for HNC building services engineers: BS 7671 amendments (A4:2026), EV, PV, BESS, ASHP/heat pumps, CDM, fire safety.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 4
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module 1 complete <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2 — Building Services Science
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section4_5;
