import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  HardHat,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  AlertTriangle,
  Heart,
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'CSCS Card Course | Construction Skills Test Guide';
const PAGE_DESCRIPTION =
  'Comprehensive CSCS card preparation for UK electricians. Health, safety, and environment test revision, card types explained, application process, and mock tests. 6 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'CSCS Card', href: '/training/cscs-card' },
];

const tocItems = [
  { id: 'why-cscs-card', label: 'Why You Need a CSCS Card' },
  { id: 'card-types', label: 'CSCS Card Types for Electricians' },
  { id: 'hse-test', label: 'The Health, Safety & Environment Test' },
  { id: 'application-process', label: 'Application Process' },
  { id: 'revision-strategy', label: 'Revision Strategy' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A CSCS card is required for access to virtually all UK construction sites — without one, electricians cannot work on most commercial, industrial, and house-builder projects regardless of their electrical qualifications.',
  'The CITB Health, Safety and Environment (HS&E) test is the mandatory entry requirement for obtaining a CSCS card — it consists of 50 multiple-choice questions to be answered in 45 minutes, with a pass mark of 45 out of 50.',
  'Electricians can apply for several CSCS card types depending on their qualifications — the Blue Skilled Worker card (with a Level 3 NVQ/SVQ), the Gold Advanced Craft card (with additional specialist qualifications), or the Red Trainee card (for apprentices).',
  'The HS&E test covers eight core topics: working at height, manual handling, health and welfare, fire prevention, hazardous substances, electrical safety, site-specific risks, and environmental awareness.',
  'Mock tests are the most effective revision method for the CSCS HS&E test — Elec-Mate provides unlimited timed mock tests that mirror the real exam format, with detailed explanations for every answer.',
];

const faqs = [
  {
    question: 'What CSCS card do I need as a qualified electrician?',
    answer:
      'As a qualified electrician with a Level 3 NVQ/SVQ in Electrotechnical Services (or equivalent such as the City & Guilds 2357/2365 plus AM2), you are eligible for the Blue Skilled Worker CSCS card. This is the most common card for qualified tradespeople on construction sites. If you hold additional qualifications such as an HNC, HND, or degree in electrical engineering, you may be eligible for the Gold Advanced Craft or Gold Supervisory card. Apprentices who are registered on an approved apprenticeship programme and hold a valid HS&E test pass can apply for a Red Trainee card. The CSCS website has a card finder tool where you can check exactly which card your qualifications entitle you to.',
  },
  {
    question: 'How long does a CSCS card last and how do I renew it?',
    answer:
      'CSCS cards are valid for 5 years from the date of issue. To renew, you must pass a new HS&E test (your previous test pass expires after 2 years) and hold a current qualifying certification. For electricians, this means your NVQ/SVQ and any relevant registration (JIB, SJIB) must be current. The renewal application can be submitted online through the CSCS website up to 6 months before your card expires. If your card expires before you renew, you will need to apply for a new card rather than a renewal, which may involve additional verification of your qualifications.',
  },
  {
    question: 'What happens if I fail the HS&E test?',
    answer:
      'If you fail the CITB HS&E test, you can rebook and retake it after a minimum waiting period of 24 hours. There is no limit on the number of attempts, but you must pay the test fee (currently £21 including VAT) for each attempt. The test centre will provide a results sheet indicating which topic areas you need to improve. Use this to focus your revision — the Elec-Mate course provides topic-specific quizzes for each of the eight core areas so you can target your weak points. Most candidates who use structured mock tests pass on their first or second attempt.',
  },
  {
    question: 'Can I work on site without a CSCS card?',
    answer:
      'While holding a CSCS card is not a legal requirement, it is an industry-standard requirement enforced by virtually all main contractors, house builders, and commercial clients through their site access policies. The Build UK Code of Practice requires all workers on affiliated sites to hold a valid CSCS card. In practice, this means you will be turned away at the gate of most UK construction sites without a valid card. Some very small domestic projects and private works may not require CSCS, but for any commercial or construction site work, a CSCS card is effectively essential. The JIB (Joint Industry Board) ECS (Electrotechnical Certification Scheme) card is the specific CSCS-affiliated card for electricians.',
  },
  {
    question: 'What is the difference between a CSCS card and a JIB ECS card?',
    answer:
      'The JIB ECS (Electrotechnical Certification Scheme) card is the CSCS-affiliated card specifically for the electrotechnical industry. It carries the CSCS logo and is accepted on all CSCS-registered construction sites. The ECS card is administered by the Joint Industry Board (JIB) and requires both a valid HS&E test pass and proof of electrical qualifications. The main advantage of the ECS card over a generic CSCS card is that it specifically identifies the holder as an electrician with verified electrical qualifications, and it includes the JIB grading (Electrician, Approved Electrician, Technician, etc.) which affects pay rates on JIB-graded sites. For electricians, the ECS card is the recommended option.',
  },
];

const modules = [
  {
    title: 'Introduction to CSCS and the Construction Industry',
    description:
      'What CSCS is, why it exists, the Build UK Code of Practice, card types overview, and the relationship between CSCS, JIB, and ECS cards for electricians.',
  },
  {
    title: 'Health, Safety, and Environment Test Format',
    description:
      'Test structure (50 questions, 45 minutes, 45 pass mark), question types (multiple choice and image-based), booking process, test centre procedures, and what to bring on the day.',
  },
  {
    title: 'Working at Height and Manual Handling',
    description:
      'Work at Height Regulations 2005, scaffold safety, ladder use, fall protection, manual handling risk assessment, correct lifting technique, and avoiding musculoskeletal injuries.',
  },
  {
    title: 'Health, Welfare, and Hazardous Substances',
    description:
      'COSHH regulations, asbestos awareness, noise exposure limits, vibration risks (HAVs/WBV), welfare facilities requirements, personal hygiene on site, and occupational health surveillance.',
  },
  {
    title: 'Fire Safety, Electrical Risks, and Site Hazards',
    description:
      'Fire prevention on construction sites, fire extinguisher types, emergency procedures, electrical safety (safe isolation, overhead cables, underground services), confined spaces, and excavation hazards.',
  },
  {
    title: 'Environmental Awareness and Mock Test Practice',
    description:
      'Waste management (duty of care), pollution prevention, protected species, noise and dust control, environmental permits, and unlimited timed mock tests mirroring the real HS&E examination.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any CSCS or HS&E test question in plain English. Get clear answers on health and safety legislation, hazard identification, and correct procedures.',
  },
  {
    icon: HardHat,
    title: 'Video Content',
    description:
      'Visual guides covering manual handling technique, scaffold inspection, fire extinguisher use, PPE selection, and safe isolation procedures.',
  },
  {
    icon: ClipboardCheck,
    title: 'Unlimited Mock Tests',
    description:
      'Timed 50-question mock tests that mirror the real CITB HS&E examination format. New question sets generated each time. Instant marking with detailed explanations.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your test date and Elec-Mate creates a personalised revision schedule. Track daily progress and identify weak topic areas for focused revision.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering all eight HS&E test topic areas. Study during lunch breaks on site or on the commute.',
  },
  {
    icon: FileCheck2,
    title: 'Progress Tracking',
    description:
      'Track your mock test scores over time. See which topic areas need more revision and monitor your readiness score as test day approaches.',
  },
];

const sections = [
  {
    id: 'why-cscs-card',
    heading: 'Why You Need a CSCS Card',
    content: (
      <>
        <p>
          The Construction Skills Certification Scheme (CSCS) is the UK construction industry's
          standard for verifying that workers have the appropriate training, qualifications, and
          health and safety awareness for their role. Virtually every construction site in the UK
          requires workers to hold a valid CSCS card as a condition of site access.
        </p>
        <p>
          For electricians, the CSCS card (or the affiliated JIB ECS card) is not just a
          nice-to-have — it is essential for working on commercial construction sites, housing
          developments, industrial projects, and public sector buildings. Without a valid card, you
          will be turned away at the site gate regardless of your electrical qualifications or
          experience.
        </p>
        <p>
          The CSCS scheme exists because construction remains one of the most dangerous industries
          in the UK. The Health and Safety Executive (HSE) reports around 40 fatal injuries and over
          60,000 non-fatal injuries on construction sites each year. The{' '}
          <SEOInternalLink href="/training/risk-assessment">HS&E test</SEOInternalLink> ensures that
          every worker entering a construction site has a baseline understanding of the hazards they
          will encounter and the precautions required to work safely.
        </p>
      </>
    ),
  },
  {
    id: 'card-types',
    heading: 'CSCS Card Types for Electricians',
    content: (
      <>
        <p>
          The CSCS scheme includes over 20 different card types, each corresponding to different
          qualification levels and occupational roles. For electricians, the most relevant cards are
          administered through the JIB Electrotechnical Certification Scheme (ECS), which carries
          the CSCS logo and provides site access on all CSCS-registered sites.
        </p>
        <p>
          The <strong>Red Trainee Card</strong> is for electrical apprentices registered on an
          approved apprenticeship programme. It confirms the holder is undergoing structured
          training and has passed the HS&E test. The <strong>Blue Skilled Worker Card</strong> is
          for qualified electricians holding a Level 3 NVQ/SVQ in Electrotechnical Services (or
          recognised equivalent). This is the standard card for working electricians.
        </p>
        <p>
          The <strong>Gold Advanced Craft Card</strong> is for electricians with additional advanced
          qualifications, while the <strong>Gold Supervisory Card</strong> requires a Level 3 NVQ in
          Occupational Work Supervision or equivalent management qualification. The{' '}
          <strong>Black Manager Card</strong> is for those with construction management
          qualifications at NVQ Level 6 or 7.
        </p>
        <p>
          To check which card your qualifications entitle you to, use the CSCS card finder tool on
          the CSCS website or contact the JIB directly. The{' '}
          <SEOInternalLink href="/training/electrical-apprenticeship">
            apprenticeship
          </SEOInternalLink>{' '}
          qualification pathway determines which card you are eligible for at each stage of your
          career.
        </p>
        <SEOAppBridge
          title="Find out which CSCS card you need"
          description="Not sure which card type matches your qualifications? Ask the Elec-Mate AI tutor — it knows every CSCS and ECS card category and can guide you through the application process step by step."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'hse-test',
    heading: 'The Health, Safety and Environment Test',
    content: (
      <>
        <p>
          The CITB Health, Safety and Environment (HS&E) test is the mandatory entry requirement for
          obtaining any CSCS card. The test consists of 50 multiple-choice questions that must be
          answered within 45 minutes. The pass mark is 45 out of 50 (90%), which means you can only
          afford to get 5 questions wrong.
        </p>
        <p>
          The test covers eight core topic areas: working at height, manual handling, health and
          welfare, fire prevention and emergency procedures, hazardous substances (including
          asbestos and COSHH), electrical safety, site-specific risks (excavations, confined spaces,
          demolition), and environmental awareness (waste management, pollution prevention).
        </p>
        <p>
          Questions are presented in two formats: standard multiple-choice (select one correct
          answer from four options) and image-based questions where you must identify hazards or
          correct procedures shown in photographs. The image-based questions can be particularly
          challenging as they test practical recognition skills rather than theoretical knowledge.
        </p>
        <p>
          The test is taken at a Pearson VUE test centre (there are over 200 locations across the
          UK). You must book in advance and bring valid photo identification (passport or photocard
          driving licence). Results are given immediately after completing the test. A pass is valid
          for 2 years — you must apply for your CSCS card within this period.
        </p>
      </>
    ),
  },
  {
    id: 'application-process',
    heading: 'Application Process',
    content: (
      <>
        <p>
          Applying for a CSCS card (or JIB ECS card for electricians) involves three steps: pass the
          HS&E test, gather proof of your qualifications, and submit your application. For
          electricians applying through the JIB ECS scheme, the process is managed through the JIB
          website.
        </p>
        <p>
          Required documents include: your HS&E test pass notification (valid for 2 years), proof of
          identity (passport, driving licence, or birth certificate), proof of electrical
          qualifications (Level 3 NVQ/SVQ certificate, City & Guilds 2357/2365 certificates, AM2
          certificate), and a recent passport-style photograph. For the Blue Skilled Worker card,
          you also need to provide your JIB registration number.
        </p>
        <p>
          Processing time is typically 10 to 15 working days from receipt of a complete application.
          Cards are posted to your registered address. If your application is incomplete or your
          qualifications cannot be verified, processing will be delayed. Check that all certificates
          are clearly legible before submitting — poor quality scans are a common cause of delays.
        </p>
        <p>
          If you are an{' '}
          <SEOInternalLink href="/training/level-3-electrical">apprentice</SEOInternalLink> who has
          not yet completed your NVQ, you can apply for a Red Trainee card through your training
          provider. Your employer and training provider will normally handle this application as
          part of your apprenticeship enrolment.
        </p>
      </>
    ),
  },
  {
    id: 'revision-strategy',
    heading: 'Revision Strategy',
    content: (
      <>
        <p>
          The 90% pass mark on the HS&E test means thorough preparation is essential. The most
          effective revision strategy combines reading the official CITB revision materials with
          extensive mock test practice. Mock tests are critical because they familiarise you with
          the question format, timing pressure, and the specific way questions are worded.
        </p>
        <p>
          Start by working through the eight topic areas systematically, spending more time on areas
          you are less familiar with. For electricians, the{' '}
          <SEOInternalLink href="/training/fire-safety">fire safety</SEOInternalLink> and electrical
          safety sections may feel straightforward, but do not neglect topics like environmental
          awareness, hazardous substances, and manual handling — these are common areas where
          electricians lose marks.
        </p>
        <p>
          Once you have covered all eight topics, move to timed mock tests. Aim to consistently
          score 48 or above out of 50 in practice tests before booking your real test. The Elec-Mate
          course generates unlimited unique mock tests so you never see the same questions twice —
          this prevents false confidence from memorising specific answers rather than understanding
          the underlying principles.
        </p>
        <SEOAppBridge
          title="Unlimited HS&E mock tests with instant feedback"
          description="Practice with timed 50-question mock tests that mirror the real CITB examination. Every question includes a detailed explanation of the correct answer, helping you learn from mistakes and build genuine understanding."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description:
      'Working at height is one of the eight core HS&E test topic areas — strengthen your knowledge here.',
    icon: ShieldCheck,
    category: 'Training',
  },
  {
    href: '/training/manual-handling',
    title: 'Manual Handling Course',
    description:
      'Manual handling technique and risk assessment — a key HS&E test topic for construction workers.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/fire-safety',
    title: 'Fire Safety Course',
    description:
      'Fire prevention and emergency procedures — essential knowledge for the HS&E test and site safety.',
    icon: Flame,
    category: 'Training',
  },
  {
    href: '/training/first-aid-electrical',
    title: 'First Aid for Electricians',
    description:
      'Emergency first aid response is tested in the HS&E examination and required on construction sites.',
    icon: Heart,
    category: 'Training',
  },
  {
    href: '/training/asbestos-awareness',
    title: 'Asbestos Awareness Course',
    description:
      'Asbestos awareness is a core COSHH topic in the HS&E test and essential for site work.',
    icon: AlertTriangle,
    category: 'Training',
  },
  {
    href: '/guides/electrical-apprenticeship',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Understanding the apprenticeship pathway and when to apply for your first CSCS card.',
    icon: BookOpen,
    category: 'Guide',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CSCS Card Course — Construction Skills Test Guide',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Beginner',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT8H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CSCSCardCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-09-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Construction Training"
      badgeIcon={HardHat}
      heroTitle={
        <>
          CSCS Card Course: <span className="text-yellow-400">Construction Skills Test Guide</span>
        </>
      }
      heroSubtitle="Complete CSCS card preparation with comprehensive HS&E test revision covering all eight topic areas. Card types explained, application process guide, and unlimited timed mock tests. 6 modules with interactive quizzes and AI-powered study tools."
      readingTime={11}
      courseDuration="8 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prior health and safety qualifications required — suitable for all construction workers and apprentices"
      courseModules={6}
      courseCertification="CPD certificate on completion — prepares you for the CITB HS&E test required for CSCS card application"
      courseWhoIsItFor="Electrical apprentices applying for their first CSCS card, qualified electricians renewing their card, and any construction worker preparing for the CITB HS&E test"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to pass your CSCS test first time?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 6 structured modules, unlimited mock tests, flashcards, and an AI tutor for any HS&E question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/cscs-card"
    />
  );
}
