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
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Asbestos Awareness Course | Category A Training';
const PAGE_DESCRIPTION =
  'Category A asbestos awareness training for UK electricians. Types of asbestos, where found in buildings, legal duties under CAR 2012, what to do if you find asbestos, and how to protect yourself. 5 modules with video content, quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Asbestos Awareness', href: '/training/asbestos-awareness' },
];

const tocItems = [
  { id: 'why-asbestos-awareness', label: 'Why Asbestos Awareness Matters' },
  { id: 'types-of-asbestos', label: 'Types of Asbestos' },
  { id: 'where-found', label: 'Where Asbestos Is Found' },
  { id: 'legal-duties', label: 'Legal Duties Under CAR 2012' },
  { id: 'what-to-do', label: 'What to Do If You Find Asbestos' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Asbestos is the single largest cause of work-related death in the UK, killing approximately 5,000 people every year — more than road traffic accidents.',
  'There are three main types of asbestos found in UK buildings: chrysotile (white), amosite (brown), and crocidolite (blue) — all three are equally dangerous when fibres become airborne.',
  'Electricians are at particularly high risk because their work frequently involves drilling, chasing, and cutting into walls, ceilings, floors, and ducts where asbestos-containing materials may be present.',
  'The Control of Asbestos Regulations 2012 (CAR 2012) requires anyone who may disturb asbestos during their work to receive asbestos awareness training — this includes all electricians.',
  'If you suspect you have found asbestos, stop work immediately, do not disturb the material further, warn others in the area, and report it to your supervisor or the duty holder — never attempt to remove asbestos yourself without a licence.',
];

const faqs = [
  {
    question: 'Is asbestos awareness training a legal requirement for electricians?',
    answer:
      'Yes. Regulation 10 of the Control of Asbestos Regulations 2012 (CAR 2012) requires employers to ensure that any employee who is liable to be exposed to asbestos, or who supervises such employees, receives adequate information, instruction, and training. Electricians regularly work in buildings constructed before 2000 (when asbestos was finally banned in the UK) and their work involves drilling, chasing, and cutting into building fabric where asbestos-containing materials may be present. This means all electricians require at minimum Category A asbestos awareness training. Self-employed electricians have the same duty under the Health and Safety at Work etc. Act 1974.',
  },
  {
    question: 'What is Category A asbestos training?',
    answer:
      'Category A is the basic level of asbestos training — asbestos awareness. It is designed for workers who may come into contact with asbestos during their normal work but who do not intentionally work with or remove asbestos. It covers what asbestos is, where it may be found, the health risks, how to avoid disturbing it, and what to do if you suspect you have found asbestos. Category B covers work with asbestos that does not require a licence (non-notifiable non-licensed work, or NNLW, and notifiable non-licensed work, or NNL). Category C covers licensed asbestos removal. Electricians typically need Category A as a minimum, with Category B if they carry out work such as drilling through asbestos cement boards.',
  },
  {
    question: 'How can I tell if a material contains asbestos?',
    answer:
      'You cannot reliably identify asbestos by visual inspection alone. While some asbestos-containing materials have characteristic appearances (blue-grey sprayed coatings, corrugated cement roofing sheets, textured ceiling coatings), the only way to confirm the presence of asbestos is laboratory analysis of a sample. If a building was constructed or refurbished before 2000, assume that any suspect material may contain asbestos until it has been confirmed otherwise by analysis. The duty holder (building owner or managing agent) should have an asbestos register or asbestos management plan that identifies known or presumed asbestos-containing materials. Always check the asbestos register before starting work in any pre-2000 building.',
  },
  {
    question: 'What materials in a building are most likely to contain asbestos?',
    answer:
      'The materials electricians are most likely to encounter include: textured decorative coatings (such as Artex) on ceilings and walls, asbestos cement products (flue pipes, water tanks, roofing sheets, soffits), asbestos insulating board (AIB) used for fire protection around structural steelwork and in fire doors, sprayed asbestos coatings on steelwork and concrete soffits, floor tiles and the adhesive (bitumen mastic) used to fix them, pipe lagging and thermal insulation on boilers and pipework, and fuse boards and electrical switchgear backings in older installations. Any material in a pre-2000 building that you need to drill into, cut, or disturb should be treated as potentially containing asbestos until confirmed otherwise.',
  },
  {
    question: 'What should I do if I accidentally disturb asbestos?',
    answer:
      'Stop work immediately and move away from the area without disturbing the material further. Do not attempt to clean up any debris. Warn others in the vicinity to stay clear. Seal off the area if possible (close doors, put up warning signs). Report the incident to your supervisor, the duty holder, and (if applicable) your employer. Do not eat, drink, or smoke until you have washed your hands and face thoroughly. If you believe you have inhaled asbestos fibres, record the incident and the date, as this may be relevant for future health monitoring. The duty holder must arrange for a specialist licensed asbestos removal contractor to assess the situation and carry out any necessary remediation. Never attempt to remove or clean up asbestos-containing materials yourself unless you hold the appropriate licence.',
  },
  {
    question: 'How often does asbestos awareness training need to be refreshed?',
    answer:
      'The HSE recommends that asbestos awareness training is refreshed annually. While CAR 2012 does not specify a precise refresher interval, Regulation 10 requires that training is given at regular intervals. The annual refresher should cover any changes in legislation or guidance, reinforce key awareness points, and include updated information on asbestos-containing materials and their locations. Many competent person schemes (NICEIC, NAPIT, ELECSA) expect their registered members to maintain current asbestos awareness training as part of their ongoing competence requirements. Elec-Mate tracks your training dates and notifies you when a refresher is due.',
  },
];

const modules = [
  {
    title: 'What Is Asbestos?',
    description:
      'The three main types of asbestos (chrysotile, amosite, crocidolite), their properties, why asbestos was used so extensively in construction, and the history of asbestos use in UK buildings from the 1950s to the ban in 1999.',
  },
  {
    title: 'Health Effects of Asbestos Exposure',
    description:
      'Mesothelioma, asbestosis, lung cancer, and pleural thickening. How asbestos fibres enter the body, latency periods (15 to 60 years), exposure thresholds, and why there is no safe level of asbestos fibre exposure.',
  },
  {
    title: 'Where Asbestos Is Found in Buildings',
    description:
      'Detailed coverage of asbestos-containing materials that electricians are most likely to encounter. Textured coatings, insulating boards, cement products, floor tiles, pipe lagging, and electrical equipment backings. Photographic identification guide.',
  },
  {
    title: 'Legal Framework — CAR 2012',
    description:
      'The Control of Asbestos Regulations 2012 in detail. Duty to manage asbestos (Regulation 4), the asbestos register, training requirements (Regulation 10), control limits, licensed and non-licensed work categories, and enforcement.',
  },
  {
    title: 'What to Do If You Find Asbestos',
    description:
      'Step-by-step procedure if asbestos is suspected or accidentally disturbed. Stopping work safely, warning others, sealing the area, reporting procedures, decontamination, and when to call a licensed removal contractor. Practical scenarios for electricians.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any asbestos-related question in plain English. Get instant answers on material identification, legal requirements, and emergency procedures based on CAR 2012 and HSE guidance.',
  },
  {
    icon: Search,
    title: 'Visual Identification Guide',
    description:
      'Photographic reference showing common asbestos-containing materials in their installed state. Learn to recognise suspect materials before you start drilling or chasing.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Scenario-based questions after every module. Identify suspect materials, apply the correct emergency procedure, and demonstrate understanding of your legal duties.',
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
      'Spaced repetition flashcards covering asbestos types, building materials, CAR 2012 regulations, emergency procedures, and training category definitions.',
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
    id: 'why-asbestos-awareness',
    heading: 'Why Asbestos Awareness Matters for Electricians',
    content: (
      <>
        <p>
          Asbestos kills approximately 5,000 people in the UK every year — more than die on the
          roads. It is the single largest cause of work-related death in the country. The diseases
          caused by asbestos exposure — mesothelioma, asbestosis, and asbestos-related lung cancer —
          are incurable and often fatal, with symptoms appearing 15 to 60 years after exposure.
        </p>
        <p>
          Electricians are among the tradespeople at highest risk. Your daily work involves drilling
          into walls, chasing channels for cables, cutting holes in ceilings for downlights, opening
          up floor voids, and{' '}
          <SEOInternalLink href="/training/working-at-height">working at height</SEOInternalLink> in
          plant rooms, risers, and ceiling spaces. Every one of these activities can disturb
          asbestos-containing materials if they are present. In buildings constructed before 2000 —
          which represent the majority of the UK building stock — asbestos may be lurking behind the
          plasterboard, in the ceiling tiles, around the pipework, or in the floor tiles beneath
          your feet.
        </p>
        <p>
          The <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink>{' '}
          wiring regulations deal with electrical safety, but your physical safety on site depends
          equally on understanding the non-electrical hazards you face. Asbestos awareness training
          is not optional — it is a legal requirement under the Control of Asbestos Regulations 2012
          for anyone whose work may expose them to asbestos fibres.
        </p>
      </>
    ),
  },
  {
    id: 'types-of-asbestos',
    heading: 'Types of Asbestos',
    content: (
      <>
        <p>There are six types of asbestos, but three are commonly found in UK buildings.</p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Chrysotile (White Asbestos)</h3>
              <p className="text-white text-sm leading-relaxed">
                The most commonly used type, accounting for approximately 90% of asbestos in UK
                buildings. Found in cement products (roofing sheets, flue pipes, water tanks),
                textured decorative coatings, floor tiles, gaskets, and brake linings. The fibres
                are curly and flexible.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Amosite (Brown Asbestos)</h3>
              <p className="text-white text-sm leading-relaxed">
                The second most common type in UK buildings. Found in insulating board (AIB),
                ceiling tiles, thermal insulation, and pipe lagging. Also used in some cement
                products. Amosite fibres are straight and needle-like, making them particularly
                dangerous when airborne.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Crocidolite (Blue Asbestos)</h3>
              <p className="text-white text-sm leading-relaxed">
                Less common but the most dangerous type due to its extremely fine, sharp fibres.
                Found in sprayed coatings on structural steelwork, pipe insulation, and some
                insulating boards. Often found in buildings from the 1950s to 1970s. If crocidolite
                is suspected, the area must be immediately evacuated.
              </p>
            </div>
          </div>
        </div>
        <p>
          All three types of asbestos are equally dangerous when the fibres become airborne and are
          inhaled. The colour names (white, brown, blue) refer to the raw mineral — in their
          installed state within building materials, all types may appear grey, brown, or
          indistinguishable from non-asbestos materials. This is why visual identification alone is
          never sufficient.
        </p>
        <SEOAppBridge
          title="Visual identification guide for suspect materials"
          description="The Elec-Mate asbestos awareness course includes a photographic guide showing common asbestos-containing materials as they appear in real buildings. Learn to spot the warning signs before you pick up a drill."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'where-found',
    heading: 'Where Asbestos Is Found in Buildings',
    content: (
      <>
        <p>
          Asbestos was used in over 3,000 different products in the UK construction industry. For
          electricians, the most relevant locations are the building elements you interact with
          during installation, maintenance, and inspection work.
        </p>
        <p>
          <strong>Textured decorative coatings</strong> (commonly known by the brand name Artex) on
          ceilings and walls often contain chrysotile asbestos. Any drilling, screwing, or sanding
          of pre-2000 textured coatings could release asbestos fibres. Electricians fitting ceiling
          roses, downlights, or surface-mounted accessories during{' '}
          <SEOInternalLink href="/training/domestic-installer">
            domestic electrical work
          </SEOInternalLink>{' '}
          must be aware of this risk.
        </p>
        <p>
          <strong>Insulating board (AIB)</strong> was widely used for fire protection — behind fuse
          boards, around structural steelwork, in fire doors, and as partition panels in service
          risers. Electricians working in older switchrooms and distribution board areas should
          check whether the backing boards contain asbestos. AIB is one of the more dangerous
          asbestos-containing materials because it releases fibres easily when cut, drilled, or
          broken.
        </p>
        <p>
          <strong>Floor tiles and adhesive</strong> from the 1960s and 1970s commonly contain
          asbestos. The bitumen-based adhesive (mastic) used to fix vinyl floor tiles frequently
          contains asbestos even when the tiles themselves do not. Electricians routing cables
          beneath raised or solid floors should check for asbestos floor tiles before lifting or
          drilling.
        </p>
        <p>
          <strong>Pipe lagging and thermal insulation</strong> around heating pipework, boilers, and
          hot water cylinders may contain asbestos. Electricians installing{' '}
          <SEOInternalLink href="/training/fire-alarm-systems">fire alarm systems</SEOInternalLink>{' '}
          or working near heating systems in plant rooms, boiler houses, and ceiling voids should be
          vigilant. Damaged or deteriorating lagging is particularly dangerous because it can shed
          fibres without being directly disturbed.
        </p>
      </>
    ),
  },
  {
    id: 'legal-duties',
    heading: 'Legal Duties Under CAR 2012',
    content: (
      <>
        <p>
          The Control of Asbestos Regulations 2012 (CAR 2012) is the primary legislation governing
          asbestos management in the UK. It places duties on both duty holders (building owners and
          managers) and workers (including electricians).
        </p>
        <p>
          <strong>Regulation 4 — Duty to Manage</strong> requires the person responsible for
          maintaining and repairing non-domestic premises (the duty holder) to assess whether the
          building contains asbestos, maintain a record of its location and condition (the asbestos
          register), prepare an asbestos management plan, and provide this information to anyone who
          may disturb asbestos during their work. Before starting any work in a non-domestic
          building, electricians should request to see the asbestos register.
        </p>
        <p>
          <strong>Regulation 10 — Training</strong> requires anyone who may disturb asbestos during
          their work to receive adequate information, instruction, and training. For electricians,
          this means at minimum Category A asbestos awareness training, refreshed annually.
        </p>
        <p>
          <strong>Regulation 11 — Prevention or Reduction of Exposure</strong> establishes the
          control limit of 0.1 fibres per cubic centimetre of air averaged over any continuous
          4-hour period. Any work that is liable to exceed this control limit requires a licensed
          asbestos removal contractor. Electricians must not carry out work that exceeds this limit.
        </p>
        <p>
          Failure to comply with CAR 2012 can result in enforcement action by the HSE, including
          improvement notices, prohibition notices, and prosecution. Penalties for breaches can
          include unlimited fines and imprisonment. Recording your asbestos training as part of your{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">CPD portfolio</SEOInternalLink>{' '}
          demonstrates ongoing compliance with your legal duties.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-do',
    heading: 'What to Do If You Find Asbestos',
    content: (
      <>
        <p>
          Every electrician must know exactly what to do if they suspect they have encountered
          asbestos during their work. The following procedure should be followed without exception.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center font-bold text-red-400 shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Stop Work Immediately</h3>
              <p className="text-white text-sm leading-relaxed">
                Put down your tools and stop all work that may be disturbing the suspect material.
                Do not attempt to investigate further, break off a sample, or clean up any dust or
                debris.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center font-bold text-red-400 shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Leave the Area Carefully</h3>
              <p className="text-white text-sm leading-relaxed">
                Move away from the suspect material without creating further disturbance. Minimise
                dust generation by moving slowly and carefully. Close doors behind you if possible
                to contain any airborne fibres.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center font-bold text-red-400 shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Warn Others and Restrict Access</h3>
              <p className="text-white text-sm leading-relaxed">
                Alert anyone else in the vicinity. Prevent others from entering the affected area.
                If possible, put up warning signs or barrier tape. Do not allow anyone to re-enter
                the area until it has been assessed by a competent person.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center font-bold text-red-400 shrink-0">
              4
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Report and Record</h3>
              <p className="text-white text-sm leading-relaxed">
                Report the incident to your supervisor, the duty holder (building owner or manager),
                and your employer. Record the date, time, location, and nature of the suspected
                material. This record is important for future health monitoring if needed.
              </p>
            </div>
          </div>
        </div>
        <p>
          Never attempt to remove asbestos-containing materials yourself unless you hold the
          appropriate licence. Licensed asbestos removal work requires specialist equipment,
          enclosures, air monitoring, and disposal procedures that are beyond the scope of
          electrical work. Your job is to recognise the risk, stop work, and report it. If you are
          carrying out{' '}
          <SEOInternalLink href="/training/renewable-energy">
            solar PV installations
          </SEOInternalLink>{' '}
          on older roofs, asbestos checks are particularly critical before disturbing any roof
          materials.
        </p>
        <SEOAppBridge
          title="Track your CPD training including asbestos awareness"
          description="Elec-Mate automatically records your asbestos awareness completion date and sends you a reminder when your annual refresher is due. Your downloadable CPD certificate is accepted by NICEIC, NAPIT, and ELECSA."
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
    description: 'Another essential safety course for electricians working on site.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/fire-alarm-systems',
    title: 'Fire Alarm Systems Course',
    description:
      'Fire alarm work often involves drilling into ceilings where asbestos may be present.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/domestic-installer',
    title: 'Domestic Installer Course',
    description: 'Part P domestic work in pre-2000 properties requires asbestos awareness.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'Asbestos awareness counts towards your CPD requirements for competent person schemes.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/renewable-energy',
    title: 'Renewable Energy Course',
    description: 'Solar PV roof work on pre-2000 buildings requires asbestos checks.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Combine electrical and asbestos safety for comprehensive site protection.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Asbestos Awareness Course — Category A Training',
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
      courseWorkload: 'PT4H',
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

export default function AsbestosAwarenessCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-04-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Health & Safety Training"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Asbestos Awareness Course: <span className="text-yellow-400">Category A Training</span>
        </>
      }
      heroSubtitle="Essential asbestos awareness training for UK electricians. Types of asbestos, where found in buildings, legal duties under the Control of Asbestos Regulations 2012, and what to do if you find asbestos. 5 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={10}
      courseDuration="4 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prerequisites — suitable for all electricians and apprentices"
      courseModules={5}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios. Annual refresher reminder included."
      courseWhoIsItFor="All electricians, electrical apprentices, and anyone whose work may bring them into contact with asbestos-containing materials in buildings constructed before 2000"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Protect yourself — complete your asbestos awareness training"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 5 focused modules, interactive quizzes, visual identification guide, and CPD certificate. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/asbestos-awareness"
    />
  );
}
