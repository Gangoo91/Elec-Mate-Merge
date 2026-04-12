import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  Zap,
  Lightbulb,
  ShieldCheck,
  Users,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Study Centre', href: '/study-centre' },
  { label: 'City & Guilds Level 3 Guide', href: '/city-guilds-level3-guide' },
];

const tocItems = [
  { id: 'what-is-2365', label: 'What is City & Guilds 2365?' },
  { id: 'qualification-structure', label: 'Qualification Structure' },
  { id: 'units-covered', label: 'Units Covered' },
  { id: 'assessment-methods', label: 'Assessment Methods' },
  { id: 'achieving-distinction', label: 'Achieving Distinction' },
  { id: 'inspection-testing', label: 'Inspection and Testing' },
  { id: 'fault-diagnosis', label: 'Fault Diagnosis' },
  { id: 'design', label: 'Electrical System Design' },
  { id: 'what-comes-next', label: 'What Comes Next?' },
  { id: 'study-tools', label: 'Study Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'City & Guilds 2365 is the most widely used on-programme qualification for electrical apprentices in England and Wales at Level 3.',
  'The full qualification is the City & Guilds Level 3 Diploma in Electrical Installations (Buildings and Structures) — it is delivered in two stages (Certificate at Level 2, Diploma at Level 3).',
  'Level 3 units cover inspection and testing, fault diagnosis, electrical system design, three-phase systems, and specialist installations — significantly more complex than Level 2.',
  'Assessment is through written exams (multiple-choice and short-answer), practical assignments, and synoptic assessments that combine knowledge and practical skills.',
  'Distinction grades are achievable in individual units — consistent distinction-level performance strengthens your EPA application and demonstrates employer-ready competence.',
];

const faqs = [
  {
    question: 'What is City & Guilds 2365 and why is it the standard electrical qualification?',
    answer:
      "City & Guilds 2365 refers to the qualification number for the City & Guilds Level 2 and Level 3 Diplomas in Electrical Installations (Buildings and Structures). It is the most widely used on-programme qualification for electrical apprentices in England and Wales. City & Guilds (C&G) has been the dominant awarding body for vocational electrical qualifications in the UK for over a century, and the 2365 has been updated to align with the current Level 3 Electrical Installation apprenticeship standard (ST0145). Employers, JIB, and competent person schemes all recognise C&G 2365 as the standard qualification route.",
  },
  {
    question: 'What is the difference between the Level 2 Certificate and the Level 3 Diploma?',
    answer:
      "The City & Guilds 2365 qualification is delivered in two stages. The Level 2 Certificate in Electrical Installations (Buildings and Structures) is the first stage, typically completed in Year 1 and Year 2 of the apprenticeship. It covers fundamental electrical theory, installation methods, basic wiring, and health and safety. The Level 3 Diploma in Electrical Installations (Buildings and Structures) is the second stage, typically completed in Year 2 and Year 3. It covers more advanced topics: inspection and testing, fault diagnosis, electrical system design, three-phase systems, and specialist electrical systems. Both together constitute the on-programme qualification component of the apprenticeship.",
  },
  {
    question: 'How long does it take to complete City & Guilds 2365 Level 3?',
    answer:
      "The Level 3 Diploma component of the C&G 2365 typically takes two years to complete as part of an apprenticeship, as it runs alongside on-the-job training. College attendance is usually one day per week (day release) or in block release patterns, depending on the training provider. The total guided learning hours for the Level 3 Diploma are typically 600 to 700 hours, combining formal college teaching, self-directed study, and practical work. If you are studying the qualification without an apprenticeship (full-time at college), it can be completed in one year.",
  },
  {
    question: 'What units are in the City & Guilds 2365 Level 3 Diploma?',
    answer:
      "The Level 3 Diploma includes mandatory units covering: Electrical Installations Technology (Unit 201/301 — theory of electrical systems, BS 7671 requirements), Inspection, Testing and Commissioning of Electrical Systems (Unit 302 — test procedures, certificates, and reporting), Electrical System Design (Unit 305 — load calculations, cable selection, voltage drop, fault current calculations), Fault Diagnosis and Rectification (Unit 303), Electrical Systems in Buildings (Unit 304), and Specialist Electrical Systems (Unit 306 — fire alarm systems, emergency lighting, solar PV, etc.). The exact unit numbers may vary slightly between qualification versions — check with your college or awarding body for the current unit structure.",
  },
  {
    question: 'How is City & Guilds 2365 Level 3 assessed?',
    answer:
      "The C&G 2365 Level 3 is assessed through a combination of: written examinations (multiple-choice and short-answer questions, sat under exam conditions at your college); practical assignments (tasks completed in the college workshop that test your ability to carry out and document electrical work); and synoptic assessments that integrate knowledge and practical skills. Some units also include online assessments. Your college will have an assessment plan showing which assessment methods apply to each unit. Pass, merit, and distinction grades are available for individual units, contributing to the overall qualification grade.",
  },
  {
    question: 'Is City & Guilds 2365 the same as the 18th Edition?',
    answer:
      "No — they are different qualifications. City & Guilds 2365 is the main electrical installation qualification covering the full breadth of installation work across all three years of the apprenticeship. The City & Guilds 2382 (Requirements for Electrical Installations — BS 7671) is the separate qualification that specifically tests your knowledge of the 18th Edition of the Wiring Regulations (BS 7671:2018+A3:2024). The C&G 2382 is sometimes called the '18th Edition' and is a standalone qualification required for the JIB ECS Gold Card and competent person scheme registration. You will typically study the 2382 alongside the later years of your 2365.",
  },
  {
    question: 'What comes after City & Guilds 2365 Level 3?',
    answer:
      "After completing the C&G 2365 Level 3, you will proceed to the End-Point Assessment (EPA) if you meet the gateway requirements (including the AM2 or AM2S practical assessment). Once qualified, common next steps include: City & Guilds 2391 (Inspection and Testing) to qualify for EICR work; City & Guilds 2396 (Design and Verification of Electrical Installations) for design work; City & Guilds 2382 renewal when the Wiring Regulations are updated; and the HNC in Electrical Engineering (Level 4) if you want to move into design or management. The JIB ECS Gold Card application also follows immediately after qualification.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/eal-level-3-guide',
    title: 'EAL Level 3 Guide',
    description: 'EAL as an alternative to City & Guilds — qualification structure and comparison.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/apprentice-endpoint-assessment',
    title: 'End-Point Assessment (EPA) Guide',
    description: 'Knowledge test, practical observation, professional discussion — everything about the EPA.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/apprentice-progression-guide',
    title: 'Career Progression After Your Apprenticeship',
    description: 'JIB Gold Card, AM2, self-employment, HNC/HND, and salary progression explained.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/apprentice-maths-electrician',
    title: 'Maths for Electrical Apprentices',
    description: 'Voltage drop, power triangle, Ohm\'s Law — all the calculations in the 2365 Level 3.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/study-centre',
    title: 'Elec-Mate Study Centre',
    description: 'Flashcards, AI tutor, and mock exams for C&G 2365 Level 3 revision.',
    icon: Lightbulb,
    category: 'Study Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-2365',
    heading: 'What is City & Guilds 2365?',
    content: (
      <>
        <p>
          City & Guilds 2365 is the qualification number assigned to the City & Guilds Level 2
          and Level 3 Diplomas in Electrical Installations (Buildings and Structures). It is the
          most widely used on-programme qualification for electrical apprentices in England and
          Wales and has been updated to align with the current apprenticeship standard (ST0145)
          for Level 3 Electrical Installation.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full qualification title:</strong> City & Guilds Level 3 Diploma in
                Electrical Installations (Buildings and Structures). Qualification number: 2365.
                Awarding body: City & Guilds (part of the City & Guilds Group).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two stages:</strong> The 2365 is delivered in two stages — Level 2
                Certificate (covering fundamentals) and Level 3 Diploma (covering advanced
                installation, inspection and testing, design, and fault diagnosis). Together they
                form the complete on-programme qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industry recognition:</strong> The C&G 2365 is recognised by JIB for ECS
                Gold Card applications, by NICEIC/NAPIT/ELECSA for competent person scheme
                registration, and by employers across the UK as the standard electrical
                installation qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Related qualifications:</strong> The 2365 is separate from C&G 2382
                (18th Edition BS 7671), C&G 2391 (Inspection and Testing), and C&G 2396
                (Design). These are standalone qualifications studied alongside or after the 2365.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qualification-structure',
    heading: 'Qualification Structure',
    content: (
      <>
        <p>
          The C&G 2365 is structured as a Diploma qualification, meaning it is a substantial
          qualification covering a broad range of knowledge and skills. It is credit-based, with
          each unit carrying a credit value that contributes to the overall qualification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 2 Certificate — Year 1/2:</strong> Covers fundamental electrical
                science, installation methods, wiring systems, health and safety, basic testing,
                and working practices. This stage typically takes 12 to 18 months in an
                apprenticeship setting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 3 Diploma — Year 2/3:</strong> Covers electrical installation
                technology, inspection and testing, fault diagnosis, electrical system design,
                three-phase systems, and specialist electrical systems. This stage typically
                takes 12 to 24 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guided learning hours:</strong> The total guided learning hours for the
                Level 3 Diploma are approximately 600 to 700 hours. This includes formal teaching
                at college, self-directed study, and practical workshops. Actual study time
                required is typically higher as exams demand significant revision.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Your training provider (usually a further education college or a private training
          centre) will provide a scheme of learning showing which units are taught in which term.
          Use the{' '}
          <SEOInternalLink href="/study-centre">
            Elec-Mate Study Centre
          </SEOInternalLink>{' '}
          to revise between college sessions and to prepare for upcoming exams.
        </p>
      </>
    ),
  },
  {
    id: 'units-covered',
    heading: 'Units Covered at Level 3',
    content: (
      <>
        <p>
          The Level 3 Diploma includes mandatory and optional units. The mandatory units are
          the core of the qualification and are covered by all learners. The following are the
          primary mandatory units at Level 3.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unit 301/201 — Electrical Installations Technology:</strong> Advanced
                electrical theory — three-phase systems, transformers, motors, power factor,
                protective devices, and BS 7671 requirements in depth. This is typically the most
                theory-heavy unit and the one apprentices find most challenging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unit 302 — Inspection, Testing and Commissioning:</strong> Covers the
                full range of initial verification and periodic inspection procedures under
                BS 7671 Chapter 6. Includes continuity testing, insulation resistance, polarity,
                earth fault loop impedance, RCD testing, and certificate completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unit 303 — Fault Diagnosis and Rectification:</strong> Systematic
                fault-finding methodology — half-split, substitution, and injection techniques.
                Understanding fault categories, safe working during fault diagnosis, and
                documenting the fault and repair process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unit 305 — Electrical System Design:</strong> Load calculations, cable
                selection, voltage drop calculations, protective device selection, earth fault
                loop impedance calculations, and documentation of the design process in accordance
                with BS 7671 Appendix 4. This unit links directly to the{' '}
                <SEOInternalLink href="/apprentice-maths-electrician">
                  maths skills
                </SEOInternalLink>{' '}
                required for cable sizing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unit 306 — Specialist Electrical Systems:</strong> Fire alarm systems
                (grades and categories), emergency lighting, solar PV installations, EV charging,
                and other specialist systems covered by BS 7671 and associated standards.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'assessment-methods',
    heading: 'Assessment Methods',
    content: (
      <>
        <p>
          C&G 2365 Level 3 units are assessed through multiple methods, with different units
          using different assessment approaches. Understanding how each unit is assessed helps
          you prepare the right way for each.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written examinations:</strong> Closed-book exams with multiple-choice
                and short-answer questions. Sat at your college under controlled conditions.
                Most Level 3 theory units include a written exam. Duration is typically 90 minutes
                to 2.5 hours depending on the unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical assignments:</strong> Tasks carried out in the college
                workshop or assessed in the workplace. You are assessed on the quality of your
                installation work, correct use of test equipment, and accurate completion of
                documentation (certificates, schedules, reports).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Synoptic assessment:</strong> A combined assessment that tests your
                ability to apply knowledge and practical skills together in a realistic scenario.
                The synoptic element often appears at the end of the Level 3 to pull together
                learning from across all units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Online assessments:</strong> Some units include online tests or
                assignments completed through the City & Guilds Walled Garden platform. These
                may be formative (practice) or summative (counted towards your grade).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Your college assessment schedule will tell you when each assessment takes place. Plan
          your revision using the{' '}
          <SEOInternalLink href="/study-centre">
            Elec-Mate Study Centre
          </SEOInternalLink>{' '}
          to work through each unit's content systematically before the assessment date.
        </p>
      </>
    ),
  },
  {
    id: 'achieving-distinction',
    heading: 'Achieving Distinction',
    content: (
      <>
        <p>
          Distinction grades are available for individual units within the C&G 2365 Level 3 Diploma.
          Achieving distinctions demonstrates to employers, EPAOs, and future educational
          institutions that you have exceeded the required standard. Here is how to target
          distinction grades.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know the distinction criteria:</strong> City & Guilds publishes
                distinction criteria for each unit. These criteria go beyond passing — they
                require you to demonstrate deeper understanding, justify your decisions, and apply
                knowledge to unfamiliar scenarios. Review the assessment criteria before each
                unit exam.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Go beyond the syllabus:</strong> Pass-level answers repeat the facts from
                the course. Distinction-level answers explain the why — why does BS 7671 require
                this? Why is RCD protection important for this type of circuit? What would happen
                if this regulation was not followed? Develop your understanding, not just your
                recall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practise calculation accuracy:</strong> In design and theory units,
                distinction-level performance requires accurate and methodical calculations.
                Show your working clearly, use the correct formula, and check your answer.
                Careless calculation errors will cost you marks even if your method is correct.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical quality matters:</strong> In practical assessment units,
                distinction requires clean, professional installation work — cable routes that
                are straight and correctly fixed, neat terminations, accurate testing, and
                complete, correctly-completed documentation. Quality of work is judged holistically,
                not just on pass/fail criteria.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inspection-testing',
    heading: 'Inspection and Testing (Unit 302)',
    content: (
      <>
        <p>
          Unit 302 — Inspection, Testing and Commissioning of Electrical Systems — is one of the
          most practically important units in the Level 3. The skills and knowledge you develop
          here are used daily by qualified electricians carrying out initial verification and
          periodic inspection work (EICRs).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key test procedures:</strong> Continuity of protective conductors (low
                resistance measurement), continuity of ring final circuit conductors (end-to-end
                and cross-connected), insulation resistance (500V DC, minimum 1MΩ), polarity
                verification, earth fault loop impedance (Zs), prospective fault current (PFC),
                and RCD operation testing (trip time and trip current).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation:</strong> Completing an Electrical Installation Certificate
                (EIC) for new work or an EICR for periodic inspection. Understanding which
                observations are coded C1, C2, C3, or FI. Using the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Elec-Mate EICR app
                </SEOInternalLink>{' '}
                helps you become familiar with professional certificate completion from early in
                your training.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test instrument calibration:</strong> All test instruments must be
                calibrated and have a current calibration certificate. Understanding calibration
                requirements, proof-of-test procedures, and GS38 (HSE guidance on electrical
                test equipment) is part of the unit content.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fault-diagnosis',
    heading: 'Fault Diagnosis (Unit 303)',
    content: (
      <>
        <p>
          Fault diagnosis is one of the highest-value skills an electrician can have. Good
          fault-finders are in high demand and command premium rates. Unit 303 introduces you
          to systematic fault-finding methodology.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Half-split method:</strong> Divides the circuit in half to identify which
                half contains the fault. Eliminates 50% of the circuit with each test. More
                efficient than working from one end to the other on long circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Substitution method:</strong> Replacing suspect components one at a time
                with known-good substitutes. Simple and effective for component-level faults.
                Requires a stock of known-good components and appropriate spare parts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault categories:</strong> Open circuit (broken conductor or connection),
                short circuit (unintended low-resistance path between conductors), high resistance
                fault (damaged joint or conductor under load), and earth fault (live conductor
                making contact with earth). Each requires different diagnostic approaches.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'design',
    heading: 'Electrical System Design (Unit 305)',
    content: (
      <>
        <p>
          Unit 305 — Electrical System Design — introduces the design process and the calculations
          required to select cables, protective devices, and distribution equipment that comply
          with BS 7671. This unit has the highest mathematical content of any Level 3 unit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design sequence:</strong> Determine design current (Ib), select protective
                device rating (In ≥ Ib), determine correction factors (Ca, Cg, Ci, Cs), calculate
                minimum current-carrying capacity (It = In ÷ correction factors), select cable
                from BS 7671 Appendix 4 tables, check voltage drop, verify earth fault loop
                impedance (Zs ≤ tabulated maximum).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correction factors:</strong> Ca (ambient temperature correction), Cg
                (grouping correction for cables run together), Ci (correction for insulating
                surface installation), Cs (correction for thermal insulation). Each factor reduces
                the cable's current-carrying capacity — multiple factors are multiplied together.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exam preparation:</strong> Unit 305 exam questions often provide a
                scenario and ask you to work through the full design sequence. Practise the
                complete sequence from load to final cable selection using the calculation methods
                covered in the{' '}
                <SEOInternalLink href="/apprentice-maths-electrician">
                  maths guide
                </SEOInternalLink>.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-comes-next',
    heading: 'What Comes Next After C&G 2365 Level 3?',
    content: (
      <>
        <p>
          Completing the C&G 2365 Level 3 Diploma is your on-programme qualification milestone.
          What follows depends on whether you have also met the other gateway requirements for
          your apprenticeship EPA.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">End-Point Assessment (EPA)</h4>
                <p className="text-white text-sm leading-relaxed">
                  After passing the gateway (including Level 3 and AM2), you will proceed to
                  the{' '}
                  <SEOInternalLink href="/apprentice-endpoint-assessment">
                    End-Point Assessment
                  </SEOInternalLink>
                  . This is the final stage of your apprenticeship, carried out by an
                  independent EPAO (City & Guilds or EAL).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">C&G 2391 Inspection and Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  The City & Guilds 2391 Award in the Initial Verification and Periodic
                  Inspection, Testing and Certification of Electrical Installations is the
                  next qualification most newly qualified electricians obtain. It qualifies you
                  to sign off EICs and carry out EICRs — expanding the work you can do and
                  your earning potential significantly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Revise for City & Guilds 2365 with Elec-Mate"
          description="Flashcards, AI tutor, and mock exams covering every unit of the C&G 2365 Level 3. Study on your phone, pass your exams. 7-day free trial."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CityGuildsLevel3GuidePage() {
  return (
    <GuideTemplate
      title="City & Guilds Level 3 Electrical Installation Guide | 2365 Qualification"
      description="Complete guide to City & Guilds 2365 Level 3 Electrical Installation Diploma. Qualification structure, units covered (inspection & testing, fault diagnosis, design), assessment methods, achieving distinction, and what comes next."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Qualification Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          City & Guilds Level 3 Electrical Installation:{' '}
          <span className="text-yellow-400">2365 Qualification Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about the City & Guilds 2365 Level 3 Diploma in Electrical Installations — qualification structure, units covered, assessment methods, how to achieve distinction, and what comes next after you qualify."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About City & Guilds 2365 Level 3"
      relatedPages={relatedPages}
      ctaHeading="Pass Your 2365 Level 3 with Elec-Mate"
      ctaSubheading="Unit-by-unit revision, flashcards, AI tutor, and mock exams for the City & Guilds 2365. Study on your phone, pass your exams. 7-day free trial."
    />
  );
}
