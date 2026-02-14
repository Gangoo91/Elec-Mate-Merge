import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Heart,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  AlertTriangle,
  Zap,
  HardHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'First Aid Course for Electricians | Emergency Response';
const PAGE_DESCRIPTION =
  'Essential first aid training for UK electricians covering electric shock response, CPR, burns treatment, working at height injuries, and workplace emergency procedures. 5 modules with video demonstrations, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'First Aid for Electricians', href: '/training/first-aid-electrical' },
];

const tocItems = [
  { id: 'why-first-aid', label: 'Why First Aid Training Matters' },
  { id: 'electric-shock-response', label: 'Electric Shock Response' },
  { id: 'cpr-and-aed', label: 'CPR and AED Use' },
  { id: 'burns-treatment', label: 'Burns Treatment' },
  { id: 'workplace-emergencies', label: 'Workplace Emergencies' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electric shock is the most immediate life-threatening risk for electricians — knowing how to safely disconnect the supply and administer first aid within the first few minutes can mean the difference between life and death.',
  'CPR (cardiopulmonary resuscitation) must be started immediately if a casualty is not breathing after an electric shock — brain damage begins within 3 to 4 minutes without oxygenated blood flow.',
  'Electrical burns can be deceptive — the entry and exit wounds on the skin surface may appear small, but the internal tissue damage from current flow can be extensive and requires urgent hospital treatment.',
  'Every construction site and electrical workshop must have at least one appointed person for first aid under the Health and Safety (First-Aid) Regulations 1981 — this course fulfils that training requirement.',
  'Automated External Defibrillators (AEDs) are increasingly available on construction sites and commercial premises — knowing how to use one correctly alongside CPR significantly improves survival rates from cardiac arrest caused by electric shock.',
];

const faqs = [
  {
    question: 'Is first aid training a legal requirement for electricians?',
    answer:
      'Under the Health and Safety (First-Aid) Regulations 1981, employers must provide adequate first aid arrangements for their employees. This includes ensuring that a suitable number of employees are trained as first aiders or appointed persons. The exact requirement depends on the workplace risk assessment — electrical work is classed as higher risk, so the HSE recommends that electricians working on live or potentially live systems should have specific first aid training covering electric shock response. For self-employed electricians, while there is no strict legal obligation to hold a first aid certificate, it is considered best practice and is often required by principal contractors and clients as a condition of site access.',
  },
  {
    question: 'How long is a first aid certificate valid for?',
    answer:
      'A standard First Aid at Work (FAW) certificate is valid for 3 years. An Emergency First Aid at Work (EFAW) certificate is also valid for 3 years. The HSE recommends that first aiders undertake annual refresher training to maintain their skills, even though the certificate remains valid for the full 3-year period. This Elec-Mate course provides the theoretical knowledge component and can be used alongside a practical assessment session to obtain or renew your qualification. The course content is always available for revision, so you can refresh your knowledge at any time.',
  },
  {
    question: 'What should I do if a colleague receives an electric shock?',
    answer:
      'First, do not touch the casualty until you are certain the power supply has been disconnected — you could become a second casualty. Switch off the supply at the isolator, consumer unit, or distribution board. If you cannot disconnect the supply, use a non-conductive object (dry wooden broom handle, rubber mat, or dry clothing) to push the casualty away from the source. Once safe, check for breathing and pulse. If the casualty is not breathing, begin CPR immediately and call 999. If they are breathing but unconscious, place them in the recovery position. Even if the casualty appears to recover quickly, they must be taken to hospital — electric shock can cause cardiac arrhythmias that may develop hours after the initial incident.',
  },
  {
    question: 'Does this course cover burns from arc flash incidents?',
    answer:
      'Yes, the course covers thermal burns from arc flash events, which are one of the most common electrical injuries. Arc flash can generate temperatures exceeding 20,000 degrees Celsius, causing severe burns to exposed skin, ignition of clothing, and blast injuries from the pressure wave. The course teaches correct first aid response including cooling burns with clean running water for at least 20 minutes, removing clothing and jewellery (unless stuck to the burn), covering the burn with cling film or a sterile non-adhesive dressing, and recognising signs that require immediate hospital treatment. Prevention through safe isolation procedures and appropriate PPE is also covered.',
  },
  {
    question: 'Can I complete this course entirely online?',
    answer:
      'The theoretical knowledge component of this course is fully available online through Elec-Mate, including video demonstrations of CPR technique, AED operation, recovery position, and burns treatment. However, to obtain a formally recognised First Aid at Work (FAW) or Emergency First Aid at Work (EFAW) certificate, you will need to attend a practical assessment session with an approved training provider (such as St John Ambulance, British Red Cross, or a private provider). The Elec-Mate course prepares you thoroughly for the practical assessment and provides ongoing reference material you can access at any time.',
  },
];

const modules = [
  {
    title: "First Aid Legislation and the Electrician's Duty",
    description:
      'Health and Safety (First-Aid) Regulations 1981, Electricity at Work Regulations 1989, employer obligations, risk assessment for first aid provision, and the role of the appointed person.',
  },
  {
    title: 'Electric Shock Response and Safe Rescue',
    description:
      'Recognising electric shock symptoms, safe disconnection procedures, rescue from live conductors, primary and secondary survey, and when to call emergency services. Low voltage and high voltage scenarios.',
  },
  {
    title: 'CPR, AED Use, and Cardiac Emergencies',
    description:
      'Adult CPR technique (30:2 compression-to-breath ratio), AED operation and pad placement, recovery position, choking response, and recognising cardiac arrest versus other causes of collapse.',
  },
  {
    title: 'Burns, Bleeding, and Trauma Management',
    description:
      'Electrical burns (entry and exit wounds), thermal burns from arc flash, chemical burns from battery acid, severe bleeding control, fractures from falls, and head injury assessment.',
  },
  {
    title: 'Site Emergency Procedures and Reporting',
    description:
      'Emergency action plans, casualty handover to paramedics, RIDDOR reporting requirements, incident documentation, psychological first aid for witnesses, and post-incident review.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any first aid question in plain English. Get clear answers on emergency procedures, legal requirements, treatment protocols, and reporting obligations.',
  },
  {
    icon: Heart,
    title: 'Video Demonstrations',
    description:
      'Step-by-step video guides for CPR technique, AED operation, recovery position, burn treatment, and safe rescue from electrical contact.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge with scenario-based questions covering electric shock response, burns classification, CPR timing, and emergency procedures.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Complete the 6-hour course at your own pace.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering emergency response steps, RIDDOR thresholds, burn depth classification, and CPR ratios.',
  },
  {
    icon: FileCheck2,
    title: 'Mock Assessments',
    description:
      'Practice assessments mirroring the format of formal first aid examinations. Instant feedback with detailed explanations.',
  },
];

const sections = [
  {
    id: 'why-first-aid',
    heading: 'Why First Aid Training Matters for Electricians',
    content: (
      <>
        <p>
          Electricians face unique workplace hazards that make first aid training not just advisable
          but essential. Electric shock, arc flash burns, falls from height, and injuries from power
          tools are all realistic daily risks. The Health and Safety Executive (HSE) reports that
          contact with electricity or electrical discharge accounts for a significant proportion of
          fatal workplace injuries each year in the UK.
        </p>
        <p>
          Unlike many workplace injuries where the casualty can wait for professional medical help,
          electric shock requires immediate intervention. A casualty who has stopped breathing due
          to electric shock needs CPR within 3 to 4 minutes — the average ambulance response time in
          the UK is 7 to 10 minutes. The colleague standing next to the casualty is the only person
          who can bridge that gap.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/training/safe-isolation">
            safe isolation procedure
          </SEOInternalLink>{' '}
          is the primary defence against electric shock. But when prevention fails, first aid
          knowledge becomes the last line of defence. Every electrician should be able to perform a
          safe rescue from electrical contact, administer CPR, use an AED, and treat electrical
          burns while waiting for emergency services.
        </p>
      </>
    ),
  },
  {
    id: 'electric-shock-response',
    heading: 'Electric Shock Response',
    content: (
      <>
        <p>
          Responding to an electric shock casualty requires a specific sequence of actions that
          differs from standard first aid. The first priority is always your own safety — do not
          touch the casualty until you are absolutely certain the power supply has been
          disconnected.
        </p>
        <p>
          For low voltage incidents (up to 1000V AC), isolate the supply at the nearest accessible
          point — the isolator, consumer unit, distribution board, or if necessary the main switch.
          If isolation is not immediately possible, use a non-conductive object to separate the
          casualty from the live conductor. Suitable objects include a dry wooden broom handle, a
          dry length of rope, or a rubber mat. Never use anything metallic, wet, or conductive.
        </p>
        <p>
          Once the casualty is safe, perform a primary survey using the DR ABC approach: check for
          Danger, elicit a Response, open the Airway, check for Breathing, and check Circulation. If
          the casualty is not breathing, begin CPR immediately and ask someone to call 999 and fetch
          the nearest AED. Even if the casualty appears to recover fully, they must attend hospital
          — electric shock can cause{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            cardiac arrhythmias
          </SEOInternalLink>{' '}
          that may develop hours after the initial event.
        </p>
        <SEOAppBridge
          title="Practice electric shock response scenarios"
          description="Interactive scenario-based exercises walk you through the correct response sequence for low voltage and high voltage electric shock incidents. Test your decision-making under pressure with timed exercises."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'cpr-and-aed',
    heading: 'CPR and AED Use',
    content: (
      <>
        <p>
          Cardiopulmonary resuscitation (CPR) is the single most important first aid skill for
          electricians. Electric current passing through the heart can cause ventricular
          fibrillation — a chaotic, ineffective heart rhythm that stops blood circulation. Without
          CPR, the brain begins to suffer irreversible damage within 3 to 4 minutes.
        </p>
        <p>
          Adult CPR follows the 30:2 ratio — 30 chest compressions followed by 2 rescue breaths.
          Compressions should be delivered at a rate of 100 to 120 per minute, pressing down 5 to 6
          centimetres on the centre of the chest. If you are unable or unwilling to give rescue
          breaths, continuous chest compressions (hands-only CPR) are still effective and
          significantly better than no CPR at all.
        </p>
        <p>
          Automated External Defibrillators (AEDs) are designed to be used by anyone, regardless of
          training. The device analyses the heart rhythm and delivers a shock only if ventricular
          fibrillation or pulseless ventricular tachycardia is detected. AEDs are increasingly
          available on construction sites, in commercial premises, and in public spaces. Combining
          CPR with early defibrillation increases survival rates from cardiac arrest to over 70% —
          compared to less than 10% with CPR alone.
        </p>
      </>
    ),
  },
  {
    id: 'burns-treatment',
    heading: 'Burns Treatment for Electrical Injuries',
    content: (
      <>
        <p>
          Electrical burns differ from thermal burns because the damage is often internal. Current
          flowing through the body follows the path of least resistance — typically through blood
          vessels, nerves, and muscles — causing deep tissue damage that is not visible on the skin
          surface. The entry wound (where current entered the body) and exit wound (where it left)
          may appear relatively small, but the internal damage can be extensive.
        </p>
        <p>
          Arc flash burns are thermal injuries caused by the intense heat of an electrical arc.
          Temperatures in an arc flash can exceed 20,000 degrees Celsius, causing severe burns to
          any exposed skin, igniting clothing, and generating a pressure wave that can cause blast
          injuries. Wearing appropriate{' '}
          <SEOInternalLink href="/training/ppe-for-electricians">PPE</SEOInternalLink> including
          arc-rated clothing, face shields, and insulated gloves is the primary prevention measure.
        </p>
        <p>
          First aid for electrical and arc flash burns: cool the burn with clean, running water for
          at least 20 minutes (do not use ice, butter, or creams). Remove clothing and jewellery
          near the burn unless stuck to the skin. Cover the cooled burn with cling film laid loosely
          over the area (do not wrap tightly). Do not burst any blisters. All electrical burns,
          regardless of size, require hospital assessment due to the risk of internal damage,
          compartment syndrome, and delayed complications.
        </p>
      </>
    ),
  },
  {
    id: 'workplace-emergencies',
    heading: 'Workplace Emergencies and Reporting',
    content: (
      <>
        <p>
          Beyond electric shock, electricians working on construction sites and in commercial
          premises may encounter a range of emergency situations including falls from height, cuts
          from power tools, chemical exposure, heat exhaustion, and collapse from underlying medical
          conditions. A comprehensive first aid response capability covers all these scenarios.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/training/working-at-height">
            Reporting of Injuries, Diseases and Dangerous Occurrences Regulations
          </SEOInternalLink>{' '}
          (RIDDOR) 2013 requires employers to report certain workplace injuries to the HSE. This
          includes fatalities, specified injuries (fractures, amputations, loss of consciousness
          from electric shock), injuries resulting in more than 7 days' incapacitation, and
          dangerous occurrences (near misses such as accidental contact with overhead power lines).
          Understanding RIDDOR thresholds is essential for correctly documenting and reporting
          incidents.
        </p>
        <p>
          Every workplace should have a documented emergency action plan covering the location of
          first aid equipment, identity of trained first aiders, emergency contact numbers,
          evacuation procedures, and assembly points. On construction sites, this information is
          typically displayed on the site notice board and communicated during the site induction.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/safe-isolation',
    title: 'Safe Isolation Procedure Course',
    description:
      'The primary prevention measure against electric shock — essential companion to first aid training.',
    icon: ShieldCheck,
    category: 'Training',
  },
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description: 'Falls from height cause serious injuries requiring immediate first aid response.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/ppe-for-electricians',
    title: 'PPE for Electricians',
    description:
      'Arc-rated clothing, insulated gloves, and face shields — the first line of defence before first aid.',
    icon: HardHat,
    category: 'Training',
  },
  {
    href: '/training/fire-safety',
    title: 'Fire Safety Course',
    description:
      'Fire safety awareness and emergency response procedures for construction sites and workshops.',
    icon: AlertTriangle,
    category: 'Training',
  },
  {
    href: '/training/risk-assessment',
    title: 'Risk Assessment Course',
    description:
      'Identifying and mitigating workplace hazards to prevent injuries before they happen.',
    icon: ClipboardCheck,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The wiring regulations that mandate safe working practices for all electrical installations.',
    icon: BookOpen,
    category: 'Guide',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'First Aid Course for Electricians — Emergency Response',
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

export default function FirstAidCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-08-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Training"
      badgeIcon={Heart}
      heroTitle={
        <>
          First Aid Course for Electricians:{' '}
          <span className="text-yellow-400">Emergency Response</span>
        </>
      }
      heroSubtitle="Essential first aid training covering electric shock response, CPR, AED use, burn treatment, and workplace emergency procedures. 5 modules with video demonstrations, interactive quizzes, and AI-powered study tools."
      readingTime={10}
      courseDuration="6 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prior first aid training required — suitable for all electricians and apprentices"
      courseModules={5}
      courseCertification="CPD certificate on completion — supports first aid at work qualification renewal"
      courseWhoIsItFor="All electricians, electrical apprentices, site supervisors, and anyone working with or near electrical installations who may need to provide emergency first aid"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to learn life-saving first aid skills?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 5 focused modules covering electric shock response, CPR, burns treatment, and workplace emergencies. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/first-aid-electrical"
    />
  );
}
