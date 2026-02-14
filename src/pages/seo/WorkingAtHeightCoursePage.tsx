import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ArrowUp,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  HardHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Working at Height Course | Electrical Safety Training';
const PAGE_DESCRIPTION =
  'Working at height training for UK electricians. Work at Height Regulations 2005, hierarchy of controls, ladder safety, mobile tower scaffolding, fall arrest systems, and risk assessment. 6 modules with video content, quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Working at Height', href: '/training/working-at-height' },
];

const tocItems = [
  { id: 'why-height-training', label: 'Why Working at Height Training Matters' },
  { id: 'wahr-2005', label: 'The Work at Height Regulations 2005' },
  { id: 'hierarchy-of-controls', label: 'Hierarchy of Controls' },
  { id: 'ladder-safety', label: 'Ladder Safety for Electricians' },
  { id: 'mobile-towers', label: 'Mobile Tower Scaffolding' },
  { id: 'fall-arrest', label: 'Fall Arrest and Personal Protection' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Falls from height are the single largest cause of fatal injuries in the UK construction sector, accounting for approximately 40 deaths per year — electricians working on ladders, scaffolding, and rooftops face this risk daily.',
  'The Work at Height Regulations 2005 (WAHR 2005) require employers to avoid working at height wherever possible, use work equipment that prevents falls where height work is necessary, and minimise the consequences of a fall where prevention is not possible.',
  'The hierarchy of controls for working at height prioritises: (1) avoid working at height, (2) use collective protection (guardrails, scaffolding), (3) use personal protection (harness and lanyard), (4) minimise fall distance and consequences.',
  'Ladders should only be used for short-duration work (under 30 minutes) where the risk assessment shows that a more suitable means of access is not justified — they are a last resort, not a first choice.',
  'Mobile tower scaffolding (such as PASMA-compliant towers) provides a stable working platform with guardrails and is the preferred method of access for electrical work lasting more than 30 minutes at height.',
];

const faqs = [
  {
    question: 'Is working at height training a legal requirement for electricians?',
    answer:
      'Yes. The Work at Height Regulations 2005 require employers to ensure that any person who works at height, or who organises, plans, or supervises work at height, is competent to do so or is being supervised by a competent person. This includes training in the risks of working at height, how to use the equipment provided, and the emergency procedures to follow if someone falls. Self-employed electricians have the same duty under the Health and Safety at Work etc. Act 1974. Competent person schemes (NICEIC, NAPIT, ELECSA) expect registered members to have current working at height training as part of their ongoing competence requirements.',
  },
  {
    question: 'At what height do the Work at Height Regulations apply?',
    answer:
      'The Work at Height Regulations 2005 apply to all work at any height where a person could fall and injure themselves. There is no minimum height threshold. Even standing on a stepladder to fit a light switch or reaching above your head to route cables through a ceiling void counts as working at height. The regulations also apply to work below ground level — for example, working in a basement or trench where you could fall from a platform or ladder. The common misconception that the regulations only apply above 2 metres is incorrect — they apply at any height where a fall could cause injury.',
  },
  {
    question: 'When can electricians use ladders for working at height?',
    answer:
      'Ladders (including stepladders) can be used for working at height only when a risk assessment has shown that the use of more suitable work equipment (such as a mobile tower, scaffold, or MEWP) is not justified because of the low risk, short duration of use (up to 30 minutes), and/or existing features of the site that cannot be altered. Even when a ladder is justified, the Work at Height Regulations require that the ladder is in good condition, it is positioned on firm level ground, it is secured at the top or footed at the base, three points of contact are maintained while climbing, and the work can be carried out with one hand while the other maintains a handhold. Heavy or sustained electrical work — such as installing a consumer unit at height, fitting a row of downlights, or pulling cables through a ceiling void — should use a more stable platform.',
  },
  {
    question: 'Do I need PASMA training to use mobile tower scaffolding?',
    answer:
      'PASMA (Prefabricated Access Suppliers and Manufacturers Association) training is not strictly a legal requirement, but it is strongly recommended and is considered best practice in the UK construction industry. The Work at Height Regulations require that anyone who assembles, dismantles, or uses mobile tower scaffolding is competent to do so. PASMA training is the recognised way to demonstrate this competence. Most principal contractors require PASMA certification before they will allow access to mobile towers on their sites. The Elec-Mate working at height course covers the principles of mobile tower use — for hands-on tower assembly training, a separate PASMA practical course is recommended.',
  },
  {
    question: 'What personal protective equipment is needed for working at height?',
    answer:
      'The specific PPE depends on the nature of the height work and the risk assessment. For general ladder work, no additional PPE beyond standard site PPE (hard hat, safety boots, hi-vis) is required, provided the ladder is used correctly. For work on rooftops, near unprotected edges, or where collective protection (guardrails) cannot be provided, a personal fall protection system may be required. This typically consists of a full body harness, shock-absorbing lanyard, and a suitable anchor point rated to at least 12 kN. For roof-edge work, a fall arrest system with an inertia reel (self-retracting lifeline) may be more appropriate. All fall protection equipment must be inspected before each use and formally examined by a competent person at least every six months.',
  },
  {
    question: 'What should I do if someone falls from height?',
    answer:
      'If someone falls from height, call 999 immediately for emergency services. Do not attempt to move the casualty unless they are in immediate danger (such as fire or a collapsing structure), as spinal injuries are common in falls and incorrect movement could cause paralysis. If the person is conscious, keep them still, reassure them, and keep them warm with a blanket or coat. If the person is unconscious but breathing, place them in the recovery position only if you are certain there is no spinal injury — otherwise, maintain their airway while keeping them still. If the person is not breathing, begin CPR. Report the incident under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) if it occurs at work — falls from height resulting in injury are reportable to the HSE.',
  },
];

const modules = [
  {
    title: 'Introduction to Working at Height',
    description:
      'Falls from height statistics, the Work at Height Regulations 2005, duties of employers and employees, the definition of working at height, and why electricians are at particular risk.',
  },
  {
    title: 'Risk Assessment for Working at Height',
    description:
      'How to carry out a working at height risk assessment. Identifying hazards, evaluating risk, selecting appropriate control measures, and recording the assessment. Site-specific considerations for electrical work.',
  },
  {
    title: 'The Hierarchy of Controls',
    description:
      'Avoiding work at height where possible, collective protection (guardrails, scaffolding, nets), personal protection (harness and lanyard, fall arrest), and minimising fall distance and consequences.',
  },
  {
    title: 'Ladder and Stepladder Safety',
    description:
      'Ladder selection and inspection, correct positioning (1-in-4 rule), securing and footing, three points of contact, safe working practices, and when ladders are and are not appropriate for electrical work.',
  },
  {
    title: 'Mobile Towers and Scaffolding',
    description:
      'PASMA tower assembly principles, safe working heights, stability requirements (3:1 base-to-height ratio for indoor use), inspection requirements, and use of mobile towers for electrical installation work.',
  },
  {
    title: 'Fall Arrest and Emergency Procedures',
    description:
      'Personal fall protection systems (harness, lanyard, anchor points), equipment inspection, suspension trauma awareness, rescue planning, and first-response procedures when someone falls from height.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any working at height question in plain English. Get instant answers on WAHR 2005 requirements, ladder safety rules, tower specifications, and fall arrest equipment.',
  },
  {
    icon: HardHat,
    title: 'Video Content',
    description:
      'Step-by-step video demonstrations of correct ladder positioning, mobile tower assembly checks, harness fitting, and lanyard connection to anchor points.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Scenario-based questions after every module. Assess risk, select the correct access equipment, identify unsafe practices, and demonstrate knowledge of emergency procedures.',
  },
  {
    icon: Clock,
    title: 'Study Anywhere',
    description:
      'Complete the course on your phone, tablet, or desktop. Study during breaks on site, at home in the evening, or on the commute. Progress syncs across all your devices.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering WAHR 2005, hierarchy of controls, ladder safety rules, tower specifications, fall arrest terminology, and RIDDOR reporting requirements.',
  },
  {
    icon: FileCheck2,
    title: 'CPD Certificate',
    description:
      'Downloadable CPD certificate on successful completion of all six modules. Automatically recorded in your Elec-Mate CPD portfolio with annual renewal reminders.',
  },
];

const sections = [
  {
    id: 'why-height-training',
    heading: 'Why Working at Height Training Matters for Electricians',
    content: (
      <>
        <p>
          Falls from height are the single largest cause of fatal injuries in the UK construction
          sector. The Health and Safety Executive (HSE) reports approximately 40 deaths and over
          4,000 non-fatal injuries from falls at height in construction every year. Electricians are
          disproportionately represented in these statistics because so much electrical work
          involves ladders, stepladders, scaffold platforms, and rooftop access.
        </p>
        <p>
          Consider a typical day for an electrician: climbing a stepladder to fit downlights, using
          a ladder to access a loft for cable routing, working from a mobile tower to install
          containment at high level, or accessing a flat roof to install{' '}
          <SEOInternalLink href="/training/renewable-energy">solar PV panels</SEOInternalLink>. Each
          of these tasks involves working at height, and each carries a risk of a fall that could
          cause serious injury or death.
        </p>
        <p>
          The consequences of a fall extend beyond the immediate injury. A broken back, fractured
          pelvis, or head injury can end an electrician's career permanently. Even a relatively
          minor fall from a stepladder can result in broken wrists, sprained ankles, or concussion
          that keeps you off work for weeks or months. Working at height training teaches you to
          assess the risks, choose the right equipment, and work safely — protecting both your
          health and your livelihood.
        </p>
      </>
    ),
  },
  {
    id: 'wahr-2005',
    heading: 'The Work at Height Regulations 2005',
    content: (
      <>
        <p>
          The Work at Height Regulations 2005 (WAHR 2005) are the primary legislation governing all
          work at height in Great Britain. They apply to all work at any height where a person could
          fall and be injured. There is no minimum height threshold — even standing on a stepladder
          is working at height under the regulations.
        </p>
        <p>
          The regulations place duties on employers, the self-employed, and anyone who controls the
          work of others. The key duties are: (1) avoid work at height where it is reasonably
          practicable to carry out the work safely without going to height, (2) where work at height
          cannot be avoided, use work equipment or other measures to prevent falls, (3) where the
          risk of a fall cannot be eliminated, use work equipment or other measures to minimise the
          distance and consequences of a fall.
        </p>
        <p>
          The regulations also require that work at height is properly planned, organised, and
          supervised; that the workplace where work at height is done is safe; that all equipment
          used for working at height is properly inspected and maintained; that risks from fragile
          surfaces are properly controlled; and that risks from falling objects are properly
          managed.
        </p>
        <p>
          Schedule 1 of the regulations sets out requirements for existing workplaces and means of
          access at height. Schedules 2 to 6 cover specific equipment types including guardrails,
          working platforms, ladders, and personal fall protection systems. As with{' '}
          <SEOInternalLink href="/training/asbestos-awareness">asbestos awareness</SEOInternalLink>,
          working at height training is a legal requirement that must be recorded as part of your{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">CPD portfolio</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'hierarchy-of-controls',
    heading: 'The Hierarchy of Controls',
    content: (
      <>
        <p>
          WAHR 2005 establishes a clear hierarchy that must be followed when planning any work at
          height. You must work through this hierarchy in order — you cannot jump to personal
          protection if collective protection is reasonably practicable.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center font-bold text-green-400 shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Avoid Working at Height</h3>
              <p className="text-white text-sm leading-relaxed">
                Can the work be done from ground level? For example, using a long-reach tool to fit
                a light fitting, pre-assembling containment at ground level before lifting into
                position, or using a camera on an extension pole to inspect ceiling voids.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center font-bold text-blue-400 shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">
                Prevent Falls (Collective Protection)
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Use collective fall prevention measures that protect everyone in the area:
                guardrails, edge protection, mobile tower scaffolding with guardrails, scaffolding,
                or mobile elevating work platforms (MEWPs). These do not depend on individual
                behaviour.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Personal Fall Protection</h3>
              <p className="text-white text-sm leading-relaxed">
                Where collective protection is not reasonably practicable, use personal fall
                protection: full body harness with shock-absorbing lanyard, work positioning system,
                or fall arrest system with inertia reel. Requires individual training and
                compliance.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center font-bold text-red-400 shrink-0">
              4
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Minimise Consequences</h3>
              <p className="text-white text-sm leading-relaxed">
                Where falls cannot be prevented, minimise the distance and consequences: safety
                nets, airbags, or soft landing systems. Also includes rescue planning to minimise
                suspension trauma if someone is held by a harness after a fall.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Interactive quizzes on the hierarchy of controls"
          description="Test your understanding with scenario-based questions. Given a specific electrical task, select the correct level of the hierarchy and the most appropriate access equipment. Detailed explanations for every answer."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'ladder-safety',
    heading: 'Ladder Safety for Electricians',
    content: (
      <>
        <p>
          Ladders and stepladders are the most commonly used access equipment on electrical jobs.
          They are also involved in more fall-from-height incidents than any other type of
          equipment. Understanding when ladders are appropriate and how to use them safely is
          essential.
        </p>
        <p>
          Under WAHR 2005, ladders should only be used when a risk assessment has shown that the use
          of more suitable equipment (such as a mobile tower or scaffold) is not justified because
          of the low risk, short duration (typically less than 30 minutes), and existing features of
          the site. Ladders are a last resort, not a first choice.
        </p>
        <p>
          The <strong>1-in-4 rule</strong> for leaning ladders requires the base of the ladder to be
          positioned 1 metre out from the wall for every 4 metres of height. The ladder must extend
          at least 1 metre above the stepping-off point (or be securely tied at the top). The ladder
          must be positioned on firm, level ground — never on loose material, wet surfaces, or
          uneven ground.
        </p>
        <p>
          While on a ladder, you must maintain <strong>three points of contact</strong> at all times
          (two hands and one foot, or two feet and one hand). This means you can only use one hand
          for work — which limits the type of electrical work that can be safely carried out from a
          ladder. Installing a{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>,
          fitting multiple accessories, or pulling cables are all tasks that typically require two
          hands and should be done from a more stable platform.
        </p>
        <p>
          Before each use, inspect the ladder for damage: cracked stiles, missing or damaged rungs,
          worn or missing feet, and any deformation. Defective ladders must be taken out of service
          immediately and either repaired by a competent person or destroyed.
        </p>
      </>
    ),
  },
  {
    id: 'mobile-towers',
    heading: 'Mobile Tower Scaffolding',
    content: (
      <>
        <p>
          Mobile tower scaffolding provides a stable working platform with guardrails, making it the
          preferred method of access for electrical work lasting more than 30 minutes at height. A
          properly assembled tower allows you to work with both hands free at a comfortable height,
          significantly improving both safety and productivity.
        </p>
        <p>
          The key safety factor is stability. For indoor use, the maximum height-to-base ratio is
          typically 3.5:1 (for example, a 1.4 metre by 0.7 metre base tower can safely reach 4.9
          metres platform height). For outdoor use, this ratio reduces to 3:1 due to wind loading.
          Outriggers or stabilisers can extend the safe working height by widening the effective
          base.
        </p>
        <p>
          Before each use of a mobile tower, check: all braces and guardrails are correctly fitted,
          the platform is fully decked with no gaps, toe boards are in place, castors are locked,
          outriggers are deployed if required, and the tower is plumb and level. Never move a tower
          with anyone on the platform, and never stand on the guardrails or climb the outside of the
          tower.
        </p>
        <p>
          {' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">PASMA training</SEOInternalLink> is
          strongly recommended for anyone who assembles, dismantles, or uses mobile tower
          scaffolding. While not a strict legal requirement, it is considered best practice and is
          required by most principal contractors on commercial construction sites.
        </p>
      </>
    ),
  },
  {
    id: 'fall-arrest',
    heading: 'Fall Arrest and Personal Protection',
    content: (
      <>
        <p>
          Personal fall protection systems are used when collective protection (guardrails,
          scaffolding) is not reasonably practicable. For electricians, this most commonly applies
          to work on flat roofs without edge protection, work near unprotected edges in buildings
          under construction, and work on{' '}
          <SEOInternalLink href="/training/renewable-energy">
            rooftop solar PV installations
          </SEOInternalLink>
          .
        </p>
        <p>
          A personal fall arrest system consists of three components: a{' '}
          <strong>full body harness</strong> that distributes the impact forces across the chest,
          shoulders, and thighs; a <strong>shock-absorbing lanyard</strong> or self-retracting
          lifeline (inertia reel) that limits the deceleration force on the body to a maximum of 6
          kN; and a <strong>suitable anchor point</strong> rated to at least 12 kN (or 10 kN for
          personal use anchors conforming to BS EN 795).
        </p>
        <p>
          Critical to any fall arrest system is <strong>rescue planning</strong>. If a worker falls
          and is arrested by their harness, they will be suspended in mid-air. Suspension trauma
          (orthostatic intolerance) can become life-threatening within 15 to 20 minutes as blood
          pools in the legs and the harness straps restrict circulation. A rescue plan must be in
          place before any work begins, with the means to recover a suspended person quickly —
          either by trained colleagues using a rescue kit or by the emergency services.
        </p>
        <p>
          All personal fall protection equipment must be inspected by the user before each use and
          formally examined by a competent person at least every six months (or more frequently if
          specified by the manufacturer). Any equipment that has arrested a fall must be taken out
          of service and examined before re-use.
        </p>
        <SEOAppBridge
          title="Track all your safety training in one place"
          description="Elec-Mate tracks your working at height, asbestos awareness, manual handling, and all other CPD training. Downloadable certificates, automatic renewal reminders, and a CPD portfolio accepted by all competent person schemes."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/asbestos-awareness',
    title: 'Asbestos Awareness Course',
    description: 'Another essential safety course — check for asbestos before drilling at height.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/fire-alarm-systems',
    title: 'Fire Alarm Systems Course',
    description: 'Fire alarm installation frequently involves working at height in ceiling voids.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/renewable-energy',
    title: 'Renewable Energy Course',
    description: 'Solar PV installation requires rooftop access and working at height competence.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description: 'Working at height training counts towards your annual CPD requirements.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/domestic-installer',
    title: 'Domestic Installer Course',
    description:
      'Domestic electrical work regularly involves ladders, stepladders, and loft access.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Combine electrical safety with height safety for comprehensive site protection.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Working at Height Course — Electrical Safety Training',
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
      courseWorkload: 'PT6H',
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

export default function WorkingAtHeightCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-05-05"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Health & Safety Training"
      badgeIcon={ArrowUp}
      heroTitle={
        <>
          Working at Height Course:{' '}
          <span className="text-yellow-400">Electrical Safety Training</span>
        </>
      }
      heroSubtitle="Essential working at height training for UK electricians. The Work at Height Regulations 2005, hierarchy of controls, ladder safety, mobile tower scaffolding, fall arrest systems, and emergency procedures. 6 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={12}
      courseDuration="6 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prerequisites — suitable for all electricians and apprentices"
      courseModules={6}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios. Annual refresher reminder included."
      courseWhoIsItFor="All electricians who work at height (which is virtually every electrician), electrical apprentices, and anyone who plans, organises, or supervises electrical work at height"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Protect yourself when working at height"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 6 focused modules, interactive quizzes, video demonstrations, and CPD certificate. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/working-at-height"
    />
  );
}
