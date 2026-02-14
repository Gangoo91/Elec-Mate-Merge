import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  HardHat,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Radio,
  ShieldCheck,
  AlertTriangle,
  Search,
  Tag,
  CheckSquare,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Scaffolding Awareness Course for Electricians | Safe Use of Scaffolding';
const PAGE_DESCRIPTION =
  'Scaffolding awareness training for UK electricians. Scaffold types, inspection procedures, tag systems, safe use, load limits, and Work at Height Regulations. 6 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Scaffolding Awareness', href: '/training/scaffolding-awareness' },
];

const tocItems = [
  { id: 'why-scaffolding-awareness', label: 'Why Electricians Need Scaffolding Awareness' },
  { id: 'scaffold-types', label: 'Scaffold Types' },
  { id: 'inspection-and-tags', label: 'Inspection and Tag Systems' },
  { id: 'safe-use', label: 'Safe Use of Scaffolding' },
  { id: 'regulations', label: 'Regulations and Legal Requirements' },
  { id: 'common-hazards', label: 'Common Hazards and Incidents' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Falls from height remain the single largest cause of fatal injuries in the UK construction industry — scaffolding awareness is not optional for electricians who work on construction sites.',
  'The scaffold tag system (green, yellow, red) provides a quick visual indication of scaffold status: green means safe to use, yellow means restricted use with conditions, and red means do not use — electricians must check the tag before stepping onto any scaffold.',
  'Under the Work at Height Regulations 2005, every person who uses a scaffold must be competent to recognise whether it is safe. This means electricians need formal scaffolding awareness training, not just a brief site induction.',
  'Scaffold inspections must be recorded by a competent person before first use, after any alteration, after any event likely to have affected stability (strong winds, impact), and at intervals not exceeding 7 days — electricians should check the inspection register before use.',
  'Elec-Mate includes interactive scaffold inspection checklists and scenario-based quizzes that train you to identify unsafe scaffolding before you step onto it.',
];

const faqs = [
  {
    question: 'Do electricians need scaffolding awareness training?',
    answer:
      'Yes. The Work at Height Regulations 2005 require that every person who works at height — including those who use scaffolding as a working platform — must be competent. Competence means having sufficient training, knowledge, and experience to recognise hazards and work safely. Electricians regularly use scaffolding on construction sites for cable routing, containment installation, lighting installation, and distribution board work at height. A scaffolding awareness course provides the knowledge to recognise safe and unsafe scaffolding, understand the tag system, and know when to refuse to use a scaffold. Most principal contractors require evidence of scaffolding awareness training as a condition of site access. CITB, CSCS, and many client bodies include scaffolding awareness as a standard training requirement.',
  },
  {
    question: 'What do the scaffold tag colours mean?',
    answer:
      'The scaffold tag system uses a traffic-light colour scheme to indicate the status of a scaffold. A green tag means the scaffold has been inspected by a competent person and is safe for use — check the date on the tag to ensure the inspection is current. A yellow tag means the scaffold has restrictions — it may be incomplete, have load limitations, or be undergoing modification. Read the conditions written on the tag carefully and follow them. A red tag means do not use — the scaffold is unsafe, incomplete, or has not been inspected. Never use a scaffold with a red tag or with no tag at all. If you find a scaffold without a tag, report it to the site manager and do not use it. The tag system is widely used across UK construction sites, though the exact format may vary between scaffolding companies.',
  },
  {
    question: 'Can electricians erect their own scaffolding?',
    answer:
      'Electricians should not erect tube and fitting scaffolding or system scaffolding — this is specialist work that must be carried out by trained scaffolders under the supervision of a scaffolding supervisor or advanced scaffolder. However, electricians may assemble and use proprietary mobile scaffold towers (such as those made by BOSS, BoSS, or Youngman) provided they have received appropriate training, typically a PASMA (Prefabricated Access Suppliers and Manufacturers Association) course. The PASMA course covers the safe assembly, use, and dismantling of mobile scaffold towers and takes one day to complete. For fixed scaffolding on construction sites, the rule is clear: scaffolders build it, a competent person inspects it, and you check the tag before using it.',
  },
  {
    question: 'How often must scaffolding be inspected?',
    answer:
      'Under the Work at Height Regulations 2005, scaffolding must be inspected by a competent person: before first use after erection or substantial alteration, after any event likely to have affected its stability or structural integrity (such as strong winds, heavy rain, impact from plant, or accidental damage), and at regular intervals not exceeding 7 days. The results of each inspection must be recorded in a scaffold inspection report. On most construction sites, the scaffolding contractor carries out the weekly inspections, but the principal contractor is responsible for ensuring they happen. As an electrician, you should check the scaffold tag and the inspection register before using any scaffold. If the last inspection date is more than 7 days ago, report it and do not use the scaffold until it has been re-inspected.',
  },
  {
    question: 'What should I check before using a scaffold?',
    answer:
      'Before stepping onto any scaffold, carry out a quick visual check: (1) Check the tag — is it green and is the inspection date current (within the last 7 days)? (2) Check the base — are the base plates on sole boards, are the standards plumb, and is the ground firm and level? (3) Check the access — is there a proper internal ladder or stair access, and is the access point clear? (4) Check the platform — are the boards in place, are they level, and are there no gaps greater than 25mm? (5) Check the guardrails — is there a top rail at approximately 950mm, a mid rail, and a toe board at the platform edge? (6) Check the ties — are the scaffold tied to the building at the required intervals? (7) Check for overhead hazards — are there power lines, cranes, or other hazards above the scaffold? If any of these checks fail, do not use the scaffold — report it to the site supervisor.',
  },
  {
    question: 'What is the difference between scaffolding awareness and PASMA training?',
    answer:
      'Scaffolding awareness is a general course that teaches you how to recognise safe and unsafe scaffolding, understand the tag and inspection system, and know the regulations. It is aimed at anyone who uses scaffolding as a working platform — including electricians, plumbers, painters, and other trades. You do not learn to erect or dismantle scaffolding. PASMA training is specifically for mobile scaffold towers (also called alloy towers or prefabricated access towers). It teaches you how to safely assemble, alter, move, dismantle, and inspect mobile scaffold towers according to the manufacturer instructions. If you use mobile scaffold towers on site — which many electricians do for tasks like cable tray installation and lighting work — you need PASMA training in addition to general scaffolding awareness. Both courses can be completed in a single day and are widely recognised across the UK construction industry.',
  },
];

const modules = [
  {
    title: 'Introduction to Scaffolding for Electricians',
    description:
      'Why scaffolding awareness matters for electricians, accident statistics, legal framework, and the difference between scaffolding awareness and scaffolder training. When electricians encounter scaffolding on site.',
  },
  {
    title: 'Types of Scaffolding',
    description:
      'Independent tied scaffolds, putlog scaffolds, birdcage scaffolds, mobile scaffold towers, system scaffolds (Layher, Haki, Cuplok), and suspended scaffolds. Characteristics, uses, and limitations of each type.',
  },
  {
    title: 'The Scaffold Tag and Inspection System',
    description:
      'Green, yellow, and red tag meanings. Scaffold inspection registers. Who can inspect scaffolding. What to check on a tag. How to report an unsafe scaffold. Weekly inspection requirements under the Work at Height Regulations.',
  },
  {
    title: 'Safe Use of Scaffolding',
    description:
      'Pre-use visual checks, safe access and egress, load limits and overloading, housekeeping on scaffold platforms, working near scaffold edges, weather considerations (wind, ice, rain), and emergency procedures.',
  },
  {
    title: 'Scaffold Hazards and Incident Prevention',
    description:
      'Falls from platforms, falling objects, scaffold collapse, contact with overhead power lines, structural overload, unauthorised alterations, and inadequate bracing. Real-world case studies and lessons learned.',
  },
  {
    title: 'Regulations, Standards, and Best Practice',
    description:
      'Work at Height Regulations 2005, Construction (Design and Management) Regulations 2015, NASC (National Access and Scaffolding Confederation) guidance, TG20 compliance, and employer responsibilities.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any scaffolding question in plain English. Get detailed answers on scaffold types, tag systems, inspection requirements, and safe use procedures.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Step-by-step video demonstrations of scaffold inspection checks, tag identification, and hazard recognition — watch on any device.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge after every module with scenario-based questions. Identify unsafe scaffolds from photos, interpret tag information, and apply regulations correctly.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Complete scaffolding awareness training at your own pace.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering scaffold types, tag meanings, inspection intervals, load limits, and regulatory requirements.',
  },
  {
    icon: FileCheck2,
    title: 'Inspection Checklists',
    description:
      'Interactive pre-use scaffold inspection checklists you can use on site. Work through each check point systematically before stepping onto any scaffold.',
  },
];

const sections = [
  {
    id: 'why-scaffolding-awareness',
    heading: 'Why Electricians Need Scaffolding Awareness Training',
    content: (
      <>
        <p>
          Falls from height are the single largest cause of workplace fatalities in the UK
          construction industry, accounting for approximately 40 deaths and over 4,000 serious
          injuries each year. Scaffolding is involved in a significant proportion of these
          incidents. As an electrician, you may not erect scaffolding, but you will certainly use it
          — and you need to know whether it is safe before you step onto it.
        </p>
        <p>
          Electricians use scaffolding for cable tray and trunking installation, lighting and small
          power installation at height, distribution board work on upper floors, containment runs
          along external walls, and access to ceiling voids and risers. On construction sites, the
          scaffold is often your primary working platform for extended periods.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/training/working-at-height">
            Work at Height Regulations 2005
          </SEOInternalLink>{' '}
          require that every person who works at height must be competent. For scaffolding, this
          means you must be able to recognise the key features of a safe scaffold, identify common
          defects and hazards, understand the tag and inspection system, and know when to refuse to
          use a scaffold and how to report it.
        </p>
        <p>
          Most principal contractors now require evidence of scaffolding awareness training as a
          condition of site access. A valid CSCS card, combined with scaffolding awareness training,
          demonstrates that you take site safety seriously and understand your responsibilities when
          working at height.
        </p>
      </>
    ),
  },
  {
    id: 'scaffold-types',
    heading: 'Types of Scaffolding You Will Encounter',
    content: (
      <>
        <p>
          Understanding the different types of scaffolding helps you recognise what you are working
          on and what limitations apply. Each scaffold type has specific characteristics, load
          capacities, and safety requirements.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <HardHat className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Independent Tied Scaffold</h3>
              <p className="text-white text-sm leading-relaxed">
                The most common type on construction sites. Two rows of standards (vertical tubes)
                connected by ledgers (horizontal tubes) and transoms (cross tubes), tied back to the
                building at regular intervals. Provides a full working platform with guardrails and
                toe boards.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <HardHat className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Mobile Scaffold Tower</h3>
              <p className="text-white text-sm leading-relaxed">
                Prefabricated aluminium towers on wheels. Lightweight, quick to assemble, and easy
                to move. Commonly used by electricians for internal work such as lighting, cable
                tray, and ceiling access. Requires{' '}
                <SEOInternalLink href="/training/pasma-training">PASMA training</SEOInternalLink> to
                assemble and use safely.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <HardHat className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">System Scaffold</h3>
              <p className="text-white text-sm leading-relaxed">
                Modular systems such as Layher, Haki, and Cuplok that use prefabricated components
                with rosette or cup connections instead of traditional tube and fittings. Faster to
                erect and dismantle than tube and fitting scaffolds, with consistent quality.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <HardHat className="w-8 h-8 text-purple-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Birdcage Scaffold</h3>
              <p className="text-white text-sm leading-relaxed">
                An internal scaffold that fills a room or area, providing a full working platform at
                ceiling level. Used for large-area ceiling work such as lighting installation in
                warehouses, sports halls, and atriums.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'inspection-and-tags',
    heading: 'Scaffold Inspection and the Tag System',
    content: (
      <>
        <p>
          The scaffold tag system provides a quick, visual way to determine whether a scaffold is
          safe to use. Before stepping onto any scaffold, the first thing you should do is check the
          tag.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-green-500/10 border border-green-500/20">
            <Tag className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Green Tag — Safe to Use</h3>
              <p className="text-white text-sm leading-relaxed">
                The scaffold has been inspected by a competent person and is safe for use. Check the
                inspection date on the tag — it must be within the last 7 days. Also check the
                maximum load stated on the tag and ensure your work will not exceed it.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
            <Tag className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Yellow Tag — Restricted Use</h3>
              <p className="text-white text-sm leading-relaxed">
                The scaffold has restrictions or conditions. Read the tag carefully — it may specify
                load limits, restricted areas, or particular precautions. Only use the scaffold
                within the stated restrictions. Common reasons for a yellow tag include partial
                completion, proximity to live services, or temporary modifications.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
            <Tag className="w-8 h-8 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Red Tag — Do Not Use</h3>
              <p className="text-white text-sm leading-relaxed">
                The scaffold is unsafe, incomplete, or has not been inspected. Do not use a scaffold
                with a red tag under any circumstances. If you find a scaffold with a red tag or no
                tag at all, report it to the site supervisor immediately.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Interactive scaffold inspection training"
          description="Practise identifying safe and unsafe scaffolding with photo-based scenarios. Learn the tag system, spot common defects, and build confidence in your scaffold inspection skills — all within the Elec-Mate app."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'safe-use',
    heading: 'Safe Use of Scaffolding on Site',
    content: (
      <>
        <p>
          Even when a scaffold has a green tag and has been properly inspected, safe use depends on
          the behaviour of every person working on it. The following rules apply every time you use
          a scaffold:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use the designated access points.</strong> Always use the internal ladder or
                stair access provided. Never climb the outside of a scaffold, and never use
                cross-bracing as a ladder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not overload the platform.</strong> Check the maximum load stated on the
                scaffold tag. Remember that the load includes people, tools, materials, and
                equipment. Do not store excessive materials on the scaffold platform.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep the platform clear.</strong> Good housekeeping prevents trips and
                falls. Remove waste materials, keep cables tidy, and ensure the access points are
                clear at all times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never remove guardrails or toe boards.</strong> These are essential fall
                protection. If a guardrail is in the way of your work, speak to the scaffold
                supervisor about a safe alternative — do not remove it yourself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report any damage or changes.</strong> If you notice damage to the scaffold,
                missing components, or anything that has changed since the last inspection, report
                it to the site supervisor immediately and stop using the scaffold until it has been
                re-inspected.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When using mobile scaffold towers, additional rules apply: always lock the wheels before
          climbing, never move the tower with anyone on the platform, ensure the tower height does
          not exceed the safe height-to-base ratio (typically 3.5:1 outdoors and 4:1 indoors for
          standard towers), and never lean out beyond the edge of the platform.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Legal Requirements',
    content: (
      <>
        <p>
          Several pieces of legislation govern the use of scaffolding in the UK. As an electrician,
          you do not need to know every detail of the scaffolding regulations, but you do need to
          understand your own duties and rights.
        </p>
        <p>
          The <strong>Work at Height Regulations 2005</strong> are the primary regulations. They
          require employers to ensure that work at height is properly planned, supervised, and
          carried out by competent persons. Scaffolding must be inspected before first use, after
          alteration, after any event that could affect its integrity, and at intervals not
          exceeding 7 days. Every person who works at height must be competent and provided with
          appropriate equipment.
        </p>
        <p>
          The <strong>Construction (Design and Management) Regulations 2015</strong> (
          <SEOInternalLink href="/training/cdm-regulations-course">CDM 2015</SEOInternalLink>) place
          duties on the principal contractor to manage scaffolding arrangements on construction
          sites, including ensuring adequate inspection, training, and supervision.
        </p>
        <p>
          The <strong>Health and Safety at Work etc. Act 1974</strong> (HASAWA) provides the
          overarching legal framework. Employers have a duty to ensure the health, safety, and
          welfare of their employees and others affected by their work. Employees have a duty to
          take reasonable care of their own safety and the safety of others, and to cooperate with
          their employer on safety matters.
        </p>
        <p>
          In practice, this means: your employer must provide scaffolding awareness training, you
          must attend and engage with the training, you must apply what you have learned on site,
          and you must report unsafe scaffolding without fear of reprisal. You have the legal right
          to refuse to work on an unsafe scaffold.
        </p>
        <SEOAppBridge
          title="Site safety training in your pocket"
          description="Elec-Mate covers all the essential site safety courses — scaffolding awareness, working at height, manual handling, and asbestos awareness. Complete your training and earn CPD certificates from your phone."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'common-hazards',
    heading: 'Common Scaffolding Hazards and How to Avoid Them',
    content: (
      <>
        <p>
          Understanding the most common scaffolding hazards helps you recognise danger before it
          leads to an accident. These are the issues that cause the most injuries on UK construction
          sites:
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Falls From the Platform</h3>
              <p className="text-white text-sm leading-relaxed">
                Caused by missing guardrails, incomplete platforms with gaps, leaning over the edge,
                or losing balance on a slippery platform. Always check that guardrails and toe
                boards are in place, the platform is fully boarded, and you have secure footing.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Falling Objects</h3>
              <p className="text-white text-sm leading-relaxed">
                Tools, materials, and debris falling from scaffold platforms injure workers below.
                Use toe boards to prevent materials rolling off, secure tools with lanyards where
                possible, and ensure exclusion zones are in place below working platforms.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">
                Contact With Overhead Power Lines
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Scaffolding erected near overhead power lines poses an extreme electrocution risk.
                Minimum clearance distances must be maintained at all times — consult the
                distribution network operator (DNO) before erecting any scaffold near overhead
                lines. As an electrician, you should be particularly alert to this hazard.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Unauthorised Alterations</h3>
              <p className="text-white text-sm leading-relaxed">
                Trades removing boards, guardrails, or bracing to make room for their work is one of
                the most common causes of scaffold-related accidents. Never alter any part of a
                scaffold. If a component is in your way, request a scaffold alteration through the
                proper channels.
              </p>
            </div>
          </div>
        </div>
        <p>
          Every scaffolding incident is preventable. The combination of proper training, pre-use
          checks, compliance with the tag system, and a willingness to report unsafe conditions will
          keep you safe throughout your career.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description:
      'Comprehensive working at height training covering ladders, MEWPs, harnesses, and rescue procedures.',
    icon: ShieldCheck,
    category: 'Training' as const,
  },
  {
    href: '/training/ipaf-training',
    title: 'IPAF Training Guide',
    description:
      'IPAF operator training for mobile elevated work platforms — an alternative to scaffolding for many tasks.',
    icon: GraduationCap,
    category: 'Training' as const,
  },
  {
    href: '/training/pasma-training',
    title: 'PASMA Training Course',
    description:
      'Mobile scaffold tower training — safe assembly, use, and dismantling of alloy towers.',
    icon: GraduationCap,
    category: 'Training' as const,
  },
  {
    href: '/training/site-safety',
    title: 'Site Safety for Electricians',
    description:
      'Comprehensive site safety training covering all the hazards electricians face on construction sites.',
    icon: HardHat,
    category: 'Training' as const,
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment Guide',
    description:
      'How to write effective risk assessments for electrical work at height and on scaffolding.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/training/manual-handling',
    title: 'Manual Handling Course',
    description:
      'Safe lifting and carrying techniques — essential when transporting tools and materials onto scaffolding.',
    icon: ShieldCheck,
    category: 'Training' as const,
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Scaffolding Awareness Course for Electricians',
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

export default function ScaffoldingAwarenessCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Site Safety Training"
      badgeIcon={HardHat}
      heroTitle={
        <>
          Scaffolding Awareness:{' '}
          <span className="text-yellow-400">Safe Use Training for Electricians</span>
        </>
      }
      heroSubtitle="Learn to recognise safe and unsafe scaffolding, understand the tag system, carry out pre-use checks, and know the regulations. 6 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={12}
      courseDuration="4 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prior scaffolding knowledge required — suitable for all electricians who use scaffolding on site"
      courseModules={6}
      courseCertification="CPD certificate on completion — evidence of scaffolding awareness for site inductions and CSCS requirements"
      courseWhoIsItFor="Electricians working on construction sites, apprentices starting site work, domestic installers moving into commercial projects, and any electrician who uses scaffolding as a working platform"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Complete your scaffolding awareness training today"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. Structured modules, interactive quizzes, video content, and an AI tutor for any site safety question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/scaffolding-awareness"
    />
  );
}
