import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  AlertTriangle,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  ShieldCheck,
  Wind,
  DoorOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Confined Spaces Course | Awareness Training';
const PAGE_DESCRIPTION =
  'Confined spaces awareness training for UK electricians. Confined Spaces Regulations 1997, hazard identification, atmospheric monitoring, safe systems of work, and emergency rescue procedures. 5 modules with video lessons, quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Confined Spaces', href: '/training/confined-spaces' },
];

const tocItems = [
  { id: 'what-is-a-confined-space', label: 'What Is a Confined Space?' },
  { id: 'hazards-in-confined-spaces', label: 'Hazards in Confined Spaces' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'safe-system-of-work', label: 'Safe System of Work' },
  { id: 'emergency-rescue', label: 'Emergency Rescue Procedures' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A confined space is any enclosed or substantially enclosed place where there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions — it is defined by risk, not by size.',
  'Electricians regularly work in confined spaces including electrical risers, cable ducts, plant rooms, lift motor rooms, ceiling voids, underground chambers, and switchroom basements.',
  'The Confined Spaces Regulations 1997 require that work in confined spaces is avoided where reasonably practicable, and where entry is unavoidable, a safe system of work must be followed.',
  'Atmospheric hazards are the primary danger — toxic gases, oxygen depletion, and flammable atmospheres can kill in seconds without warning and cannot be detected by human senses alone.',
  'No one should enter a confined space without a permit to work, atmospheric monitoring, a trained standby person outside, and emergency rescue arrangements in place.',
];

const faqs = [
  {
    question: 'What counts as a confined space for electricians?',
    answer:
      'A confined space is defined by the Confined Spaces Regulations 1997 as any place that is substantially enclosed (though not always entirely) and where there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions within the space or nearby. For electricians, common confined spaces include electrical risers and service shafts, underground cable chambers and manholes, plant rooms with poor ventilation, lift motor rooms, ceiling voids and crawl spaces, switchroom basements, and trenches deeper than 1.2 metres. The key point is that a confined space is defined by the risk it presents, not by its physical dimensions. A large plant room can be a confined space if it has poor ventilation and contains gas-fired equipment.',
  },
  {
    question: 'Do I need confined space training to work in a riser cupboard?',
    answer:
      'It depends on the risk assessment. A riser cupboard or service shaft can be a confined space if there is a foreseeable risk of injury from hazardous substances or conditions. Factors that make a riser a confined space include: poor ventilation (natural or mechanical), presence of gas pipes or equipment that could leak, accumulation of stale air or oxygen depletion from biological processes, and limited access or egress that could hinder rescue. If the risk assessment identifies confined space hazards, then yes — confined space awareness training is required before entry. Even if a specific riser is not classified as a confined space, awareness training helps electricians recognise when conditions change and a space becomes hazardous.',
  },
  {
    question: 'What atmospheric hazards can electricians encounter in confined spaces?',
    answer:
      'There are three categories of atmospheric hazard. Oxygen depletion (below 19.5% oxygen) can occur in unventilated spaces where oxygen is consumed by rusting metal, biological decomposition, or displacement by other gases. Toxic gases including carbon monoxide (from petrol generators or combustion equipment), hydrogen sulphide (from sewage or decomposing organic matter in underground chambers), and nitrogen (used as a purging gas in some systems) can accumulate to lethal concentrations. Flammable atmospheres can develop where gas leaks, solvent vapours, or methane from decomposing organic matter are present. All three hazards are invisible and often odourless — atmospheric monitoring equipment is the only reliable way to detect them.',
  },
  {
    question: 'What is a permit to work for confined space entry?',
    answer:
      'A permit to work is a formal documented procedure that authorises specific people to carry out specific work in a confined space during a specific time period. The permit records the hazards identified, the precautions taken (atmospheric monitoring results, ventilation arrangements, PPE requirements), the emergency rescue plan, the names of the authorised entrants and the standby person, and the time limits for the work. The permit must be signed by an authorised person before entry and cancelled when the work is complete or the time period expires. Permits to work are a legal requirement under the Confined Spaces Regulations 1997 for any work that involves entry into a confined space.',
  },
  {
    question: 'How long does the Elec-Mate confined spaces course take?',
    answer:
      'The confined spaces awareness course contains 5 modules and typically takes around 6 hours to complete, covering definitions and identification, atmospheric hazards, the Confined Spaces Regulations 1997, safe systems of work and permits, and emergency rescue procedures. The course is self-paced and accessible on any device, so you can study during breaks on site or at home. Each module includes video content, real-world electrical scenarios, and interactive quizzes. On completion, you receive a downloadable CPD certificate.',
  },
  {
    question: 'Who should act as the standby person during confined space entry?',
    answer:
      'The standby person (also called the top person or attendant) is a trained individual who remains outside the confined space at all times during the entry. They must maintain continuous communication with the entrants, monitor atmospheric conditions, be able to raise the alarm and initiate the emergency rescue plan, and never enter the confined space themselves to attempt a rescue (doing so is one of the most common causes of multiple fatalities in confined space incidents). The standby person must have received confined space training and be familiar with the specific rescue plan for the space. On many sites, the standby person is provided by the principal contractor, but electricians must verify these arrangements are in place before entering.',
  },
];

const modules = [
  {
    title: 'Defining and Identifying Confined Spaces',
    description:
      'What constitutes a confined space under the Confined Spaces Regulations 1997. Common confined spaces encountered by electricians: risers, cable chambers, plant rooms, ceiling voids, and underground installations. The difference between confined spaces and restricted spaces.',
  },
  {
    title: 'Atmospheric Hazards and Monitoring',
    description:
      'Oxygen depletion, toxic gases, and flammable atmospheres. How to use portable gas detectors (4-gas monitors). Pre-entry testing, continuous monitoring during work, and alarm set points. Calibration and bump testing requirements.',
  },
  {
    title: 'Legal Framework and Risk Assessment',
    description:
      'The Confined Spaces Regulations 1997 in detail. Regulation 4 (avoidance), Regulation 5 (safe systems of work), and Regulation 6 (emergency arrangements). Carrying out a confined space risk assessment. Permits to work.',
  },
  {
    title: 'Safe Systems of Work',
    description:
      'Planning confined space entry: permits to work, communication systems, ventilation, access and egress, PPE selection (harnesses, respiratory equipment), isolation of services, and time limits. The role of the standby person.',
  },
  {
    title: 'Emergency Rescue Procedures',
    description:
      'Pre-planned rescue arrangements. Raising the alarm, non-entry rescue techniques (retrieval systems, tripods), entry rescue by trained rescue teams, first aid for gas exposure, and the critical rule of never entering a confined space to rescue a casualty without proper equipment and training.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any confined space question in plain English. Get instant answers about atmospheric hazards, permit requirements, rescue procedures, and regulatory compliance.',
  },
  {
    icon: Wind,
    title: 'Atmospheric Hazard Training',
    description:
      'Detailed coverage of gas detection equipment, alarm set points, and the three categories of atmospheric hazard. Interactive scenarios simulating real confined space entries.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Scenario-based questions after every module. Classify spaces, identify hazards, complete permit assessments, and demonstrate understanding of emergency procedures.',
  },
  {
    icon: Clock,
    title: 'Study Anywhere',
    description:
      'Complete the course on your phone, tablet, or desktop. Study during breaks on site, at home, or on the commute. Progress syncs across all your devices automatically.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering confined space definitions, gas exposure limits, permit requirements, rescue procedures, and regulatory references.',
  },
  {
    icon: FileCheck2,
    title: 'CPD Certificate',
    description:
      'Downloadable CPD certificate on successful completion of all five modules. Automatically recorded in your Elec-Mate CPD portfolio with renewal reminders.',
  },
];

const sections = [
  {
    id: 'what-is-a-confined-space',
    heading: 'What Is a Confined Space?',
    content: (
      <>
        <p>
          A confined space is any enclosed or substantially enclosed area where there is a
          reasonably foreseeable risk of serious injury from hazardous substances or conditions
          within the space or nearby. The definition comes from the Confined Spaces Regulations 1997
          and it is critical to understand that confined spaces are defined by risk, not by size or
          shape.
        </p>
        <p>
          Electricians work in confined spaces more often than many realise. Electrical risers and
          service shafts in commercial buildings, underground cable chambers and manholes, plant
          rooms with limited ventilation, lift motor rooms, ceiling voids and crawl spaces above
          suspended ceilings, switchroom basements, and trenches where cables are being laid are all
          potentially confined spaces. Each time you enter one of these environments to carry out{' '}
          <SEOInternalLink href="/training/inspection-testing">
            inspection and testing
          </SEOInternalLink>{' '}
          or installation work, you need to assess whether confined space hazards are present.
        </p>
        <p>
          The key question is not "is this space small?" but "could the atmosphere or conditions in
          this space cause serious injury or death?" A large plant room with gas-fired boilers and
          poor ventilation is a confined space. A small electrical cupboard on the ground floor of
          an office building with good ventilation and no gas services is not. Understanding this
          distinction is the foundation of confined space awareness.
        </p>
      </>
    ),
  },
  {
    id: 'hazards-in-confined-spaces',
    heading: 'Hazards in Confined Spaces',
    content: (
      <>
        <p>
          Confined spaces present hazards that can kill in seconds. Between 2010 and 2023, confined
          space incidents in the UK resulted in numerous fatalities, many of which were preventable
          with proper awareness, risk assessment, and safe systems of work.
        </p>
        <p>
          <strong>Oxygen depletion</strong> is the most insidious hazard. Normal atmospheric oxygen
          is 20.9%. Below 19.5%, impaired judgement and coordination begin. Below 16%,
          unconsciousness can occur within minutes. Below 10%, death follows rapidly. Oxygen can be
          depleted by rusting metalwork (oxidation), biological decomposition, displacement by other
          gases such as nitrogen or argon, or simply poor ventilation in an enclosed area. You
          cannot detect low oxygen by smell or feel — a person may lose consciousness without any
          prior warning.
        </p>
        <p>
          <strong>Toxic gases</strong> present equally lethal risks. Carbon monoxide (CO) from
          combustion engines, generators, or boiler flues is odourless and colourless — a
          concentration of just 400 ppm can be fatal within hours. Hydrogen sulphide (H2S), found in
          underground chambers, sewers, and areas with decomposing organic matter, has a
          characteristic "rotten eggs" smell at low concentrations but paralyses the sense of smell
          at higher concentrations, removing your only natural warning. Electricians working near{' '}
          <SEOInternalLink href="/training/fire-alarm-systems">fire alarm systems</SEOInternalLink>{' '}
          in basements and underground areas should be especially vigilant.
        </p>
        <p>
          <strong>Flammable atmospheres</strong> can develop where gas leaks, solvent vapours, or
          methane from decomposition are present. In a confined space, even a small ignition source
          — including electrical sparks from switching operations or faulty equipment — can trigger
          an explosion. The lower explosive limit (LEL) must be monitored continuously during
          confined space entry.
        </p>
        <SEOAppBridge
          title="Atmospheric hazard scenarios in your training"
          description="The Elec-Mate confined spaces course includes interactive scenarios where you assess atmospheric readings, decide whether entry is safe, and respond to changing conditions. Build your confidence before you face real-world situations."
          icon={Wind}
        />
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements — Confined Spaces Regulations 1997',
    content: (
      <>
        <p>
          The Confined Spaces Regulations 1997 set out three core duties that apply to all work in
          confined spaces, including electrical installation and maintenance work.
        </p>
        <p>
          <strong>Regulation 4 — Avoidance of entry.</strong> No person shall enter a confined space
          to carry out work unless it is not reasonably practicable to achieve the purpose of the
          work without entering the space. This means you must first consider whether the work can
          be done from outside — for example, using remote inspection cameras, pulling cables from
          the outside, or redesigning the cable route to avoid the confined space entirely.
        </p>
        <p>
          <strong>Regulation 5 — Safe system of work.</strong> Where entry to a confined space is
          unavoidable, no person shall enter or carry out work except in accordance with a safe
          system of work. This system must include a suitable and sufficient risk assessment, a
          permit to work (where appropriate), atmospheric monitoring, adequate ventilation, suitable
          PPE, communication arrangements, and competent supervision.
        </p>
        <p>
          <strong>Regulation 6 — Emergency arrangements.</strong> Suitable and sufficient
          arrangements for the rescue of persons in the event of an emergency must be in place
          before any entry. These arrangements must include a trained rescue team or appropriate
          rescue equipment, and must not rely on the emergency services as the primary rescue plan.
          The <SEOInternalLink href="/training/first-aid">first aid course</SEOInternalLink>{' '}
          complements confined space training by covering emergency response for gas exposure
          casualties.
        </p>
        <p>
          Failure to comply with these regulations can result in HSE enforcement action, including
          prohibition notices, improvement notices, prosecution, unlimited fines, and imprisonment.
          Recording your training as part of your{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">CPD portfolio</SEOInternalLink>{' '}
          provides evidence of compliance.
        </p>
      </>
    ),
  },
  {
    id: 'safe-system-of-work',
    heading: 'Safe System of Work for Confined Space Entry',
    content: (
      <>
        <p>
          A safe system of work for confined space entry brings together all the precautions needed
          to ensure that entrants can work safely and be rescued promptly if something goes wrong.
          The system must be planned in advance — never improvised on the day.
        </p>
        <p>
          <strong>Pre-entry atmospheric testing</strong> must be carried out using a calibrated
          portable gas detector (typically a 4-gas monitor measuring O2, CO, H2S, and LEL). Testing
          must be done at multiple levels within the space — some gases are heavier than air and
          accumulate at low levels, while others rise. Entry is only permitted when readings are
          within safe limits: oxygen between 19.5% and 23.5%, toxic gases below their workplace
          exposure limits, and combustible gas below 10% of the LEL.
        </p>
        <p>
          <strong>Ventilation</strong> must be provided to maintain a safe atmosphere throughout the
          work period. Forced ventilation using portable fans or ducting is often required. Natural
          ventilation alone is rarely sufficient in a true confined space. Continuous atmospheric
          monitoring during work detects any deterioration in conditions.
        </p>
        <p>
          <strong>The standby person</strong> remains outside the confined space at all times,
          maintains continuous communication with entrants, monitors atmospheric conditions, and is
          ready to raise the alarm and initiate the emergency rescue plan. The standby person must
          never enter the space to attempt a rescue — this is one of the most common causes of
          multiple fatalities in confined space incidents.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/training/manual-handling">manual handling course</SEOInternalLink>{' '}
          covers the additional challenges of handling heavy equipment in restricted spaces where
          normal lifting postures may not be achievable.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-rescue',
    heading: 'Emergency Rescue Procedures',
    content: (
      <>
        <p>
          Emergency rescue arrangements must be in place before any confined space entry begins. The
          rescue plan must be specific to the space, tested and practised, and understood by
          everyone involved in the operation.
        </p>
        <p>
          <strong>Non-entry rescue</strong> is always the preferred method. A retrieval system
          consisting of a full-body harness worn by the entrant, a retrieval line attached to a
          davit arm or tripod at the entrance, and a mechanical winch allows the standby person to
          extract a casualty without entering the space. This method is fast, safe, and does not put
          the rescuer at risk.
        </p>
        <p>
          <strong>Entry rescue</strong> — where a trained rescue team enters the confined space to
          extract a casualty — is a last resort and requires the rescue team to be equipped with
          self-contained breathing apparatus (SCBA), retrieval systems, first aid equipment, and
          communication devices. This level of rescue capability is typically provided by specialist
          contractors or the fire service, not by electrical contractors.
        </p>
        <p>
          The critical rule that every electrician must understand is:{' '}
          <strong>
            never enter a confined space to rescue a colleague without proper equipment, training,
            and a rescue plan.
          </strong>{' '}
          The instinct to help is natural, but entering a hazardous atmosphere without respiratory
          protection turns one casualty into two. More than 60% of confined space fatalities in the
          UK are would-be rescuers.
        </p>
        <SEOAppBridge
          title="Emergency scenario training with AI feedback"
          description="Practise responding to confined space emergencies in the Elec-Mate course. Work through realistic scenarios, make decisions under pressure, and receive AI-generated feedback on your response. Better to learn from simulated incidents than real ones."
          icon={ShieldCheck}
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
      'Working at height in confined spaces such as risers and shafts presents compound risks.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/coshh',
    title: 'COSHH Course',
    description:
      'Hazardous substances in confined spaces are covered by both COSHH and confined space regulations.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/first-aid',
    title: 'First Aid Course',
    description:
      'Emergency first aid for gas exposure, oxygen depletion, and confined space casualties.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/fire-safety',
    title: 'Fire Safety Course',
    description:
      'Fire risks in confined spaces including flammable atmospheres and limited escape routes.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description: 'Confined space awareness counts towards your CPD for NICEIC, NAPIT, and ELECSA.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Safe isolation is critical before entering confined spaces with live electrical equipment.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Confined Spaces Course — Awareness Training for Electricians',
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

export default function ConfinedSpacesCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Health & Safety Training"
      badgeIcon={DoorOpen}
      heroTitle={
        <>
          Confined Spaces Course: <span className="text-yellow-400">Awareness Training</span>
        </>
      }
      heroSubtitle="Essential confined spaces awareness training for UK electricians. Learn to identify confined spaces, understand atmospheric hazards, follow safe systems of work, and respond to emergencies. 5 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={11}
      courseDuration="6 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prerequisites — suitable for all electricians and apprentices"
      courseModules={5}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios. Renewal reminders included."
      courseWhoIsItFor="All electricians, electrical apprentices, site supervisors, and anyone who may need to enter or work near confined spaces during electrical installation and maintenance"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Never enter blind — get confined space trained"
      ctaSubheading="Join 430+ UK electricians training smarter with Elec-Mate. 5 focused modules, real-world scenarios, AI study assistant, and CPD certificate. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/confined-spaces"
    />
  );
}
