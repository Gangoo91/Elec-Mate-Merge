import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ChevronsUp,
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
  CheckSquare,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'MEWP Course | Mobile Elevated Work Platforms Training';
const PAGE_DESCRIPTION =
  'MEWP operator training for UK electricians. MEWP categories 3a and 3b, IPAF certification, pre-use checks, safe operating procedures, rescue plans, and Work at Height Regulations. 6 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'MEWP Course', href: '/training/mewp-course' },
];

const tocItems = [
  { id: 'why-mewp-training', label: 'Why MEWP Training Matters' },
  { id: 'mewp-categories', label: 'MEWP Categories and Types' },
  { id: 'ipaf-certification', label: 'IPAF Certification' },
  { id: 'pre-use-checks', label: 'Pre-Use Safety Checks' },
  { id: 'safe-operation', label: 'Safe Operating Procedures' },
  { id: 'regulations', label: 'Regulations and Compliance' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'MEWPs (Mobile Elevated Work Platforms) include cherry pickers, scissor lifts, boom lifts, and truck-mounted platforms — they are the primary alternative to scaffolding for temporary work at height and offer significant productivity advantages.',
  'IPAF (International Powered Access Federation) certification is the industry-standard operator licence for MEWPs. Category 3a covers static vertical (scissor lifts) and 3b covers static boom (cherry pickers) — most electricians need both categories.',
  'Pre-use checks must be completed before every shift and include visual inspection of the machine, function testing of controls, checking the ground conditions, overhead hazard assessment, and verification that the MEWP is suitable for the planned work.',
  'A rescue plan must be in place before any MEWP operation begins — if an operator becomes incapacitated in the basket at height, there must be a documented procedure and trained personnel to bring them down safely.',
  'Elec-Mate includes interactive MEWP pre-use checklists, hazard identification exercises, and scenario-based quizzes that prepare you for real-world MEWP operation on site.',
];

const faqs = [
  {
    question: 'What IPAF categories do electricians need?',
    answer:
      'Most electricians need IPAF Category 3a (Mobile Vertical — scissor lifts) and Category 3b (Mobile Boom — cherry pickers and boom lifts). Category 3a covers machines that travel to a location and then elevate vertically — these include scissor lifts, which provide a large working platform and are ideal for cable tray installation, lighting work, and ceiling access in warehouses and commercial buildings. Category 3b covers machines with an articulating or telescoping boom that provides both vertical and horizontal reach — these include cherry pickers, which are essential for external work, street lighting, and accessing difficult positions. Some electricians may also benefit from Category 1b (Static Boom — vehicle-mounted platforms) if they work with truck-mounted cherry pickers for street lighting or overhead line work. The IPAF PAL Card (Powered Access Licence) is valid for 5 years and is recognised across the UK construction industry.',
  },
  {
    question: 'How long does IPAF training take?',
    answer:
      'A standard IPAF operator course takes one day for a single category or two days for dual categories (3a and 3b combined). The course includes theory sessions covering regulations, hazard identification, and pre-use checks, followed by practical sessions operating the machines under instructor supervision. You must pass both a theory test and a practical assessment to receive the IPAF PAL Card. If you have previous MEWP experience, some training centres offer refresher courses that take half a day per category. IPAF certification must be renewed every 5 years — the renewal process involves a shortened refresher course. The Elec-Mate MEWP course provides the theory knowledge to prepare for your IPAF assessment, but the practical operator training must be completed at an IPAF-approved training centre.',
  },
  {
    question: 'When should I use a MEWP instead of scaffolding?',
    answer:
      'MEWPs are generally preferred over scaffolding when the work is temporary (hours or days rather than weeks), when the work location changes frequently, when access is needed to multiple positions across a large area, when the work involves external facades or overhead installations, or when rapid mobilisation is needed. Scaffolding is generally preferred when the work will continue in the same location for weeks or months, when a large stable working platform is needed for heavy materials and multiple workers, or when the structure needs edge protection for other trades as well. For electricians, a common scenario is using a scissor lift inside a warehouse for cable tray and lighting installation — the lift moves along as the work progresses, which is far more productive than erecting and striking scaffolding for each section. Cost is also a factor: MEWP hire is typically cheaper than scaffolding for short-duration tasks.',
  },
  {
    question: 'What are the main hazards when using a MEWP?',
    answer:
      'The main MEWP hazards are: (1) Overturning — caused by operating on uneven or soft ground, exceeding the safe working load, operating in high winds, or driving with the platform raised. (2) Entrapment/crushing — the operator can be crushed against overhead structures, beams, or steelwork if the boom moves unexpectedly or the operator misjudges clearance. This is the leading cause of MEWP fatalities. (3) Falls from the platform — although the platform has guardrails, operators can fall if they climb onto the guardrails, lean out excessively, or fail to close the platform gate. (4) Contact with overhead power lines — a boom lift can reach overhead lines, and contact is fatal. Minimum clearance distances must be maintained. (5) Collision with other vehicles or plant on site. (6) Objects falling from the platform onto workers below. All of these hazards are preventable through proper training, thorough pre-use checks, a site-specific risk assessment, and disciplined operation.',
  },
  {
    question: 'Do I need to wear a harness in a MEWP?',
    answer:
      'It depends on the type of MEWP. In a scissor lift (Category 3a), a harness is not normally required because the platform moves vertically and there is minimal risk of ejection — the guardrails provide adequate fall protection. However, if the manufacturer instructions or the site rules require a harness, you must wear one. In a boom lift or cherry picker (Category 3b), a harness with a short restraint lanyard must be worn at all times. The harness is connected to a designated anchor point inside the basket. The purpose is restraint, not fall arrest — the lanyard must be short enough to prevent you from being ejected from the basket in the event of a sudden movement or collision. Never use a full-length fall arrest lanyard in a MEWP basket — if you fell over the side on a long lanyard, you would be suspended below the basket with no way to rescue yourself. Always follow the manufacturer instructions and site-specific requirements for harness use.',
  },
  {
    question: 'What ground conditions are needed for MEWP operation?',
    answer:
      'MEWPs require firm, level ground to operate safely. The ground must be capable of supporting the total weight of the machine plus its rated load (operators, tools, and materials) without sinking, shifting, or collapsing. Specific requirements include: the ground slope must not exceed the manufacturer specified maximum (typically 1 to 3 degrees for scissor lifts, up to 5 degrees for some boom lifts with levelling capability); the surface must be free from voids, trenches, loose fill, and soft spots; outriggers (where fitted) must be fully deployed on appropriate spreader pads to distribute the load; the area must be free from overhead obstructions including power lines, tree branches, and structural steelwork that could trap the platform. If the ground conditions are inadequate, the machine must not be used until the ground has been prepared — this may involve compaction, laying steel plates or track mats, or selecting a different type of MEWP. A ground conditions assessment should be part of every pre-use check.',
  },
];

const modules = [
  {
    title: 'Introduction to Mobile Elevated Work Platforms',
    description:
      'What MEWPs are, when to use them, MEWP vs scaffolding decision criteria, and the regulatory framework. Types of MEWP work that electricians commonly perform.',
  },
  {
    title: 'MEWP Categories and Machine Types',
    description:
      'Category 3a (scissor lifts), Category 3b (boom lifts and cherry pickers), Category 1b (vehicle-mounted platforms), and specialist machines. Working heights, reach specifications, and platform capacities.',
  },
  {
    title: 'IPAF Certification and Training Requirements',
    description:
      'The IPAF PAL Card system, training centre selection, theory and practical assessment, renewal requirements, and how IPAF certification fits with CSCS and other site cards.',
  },
  {
    title: 'Pre-Use Checks and Ground Assessment',
    description:
      'Daily pre-use inspection procedures — visual checks, function tests, ground assessment, overhead hazard identification, and documentation. What to do if a defect is found.',
  },
  {
    title: 'Safe Operating Procedures',
    description:
      'Machine controls, safe driving, positioning for work, operating at height, harness use, managing loads on the platform, working near edges and obstacles, and emergency lowering procedures.',
  },
  {
    title: 'Rescue Plans, Regulations, and Incident Prevention',
    description:
      'Developing a MEWP rescue plan, Work at Height Regulations 2005, PUWER 1998, LOLER 1998, thorough examination requirements, and analysis of common MEWP incidents with prevention strategies.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any MEWP question in plain English. Get detailed answers on machine categories, operating procedures, harness requirements, and rescue planning.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Step-by-step video demonstrations of pre-use checks, machine controls, safe positioning, and emergency lowering — watch on any device.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge with scenario-based questions. Identify hazards, select the right machine category, apply safe operating procedures, and respond to incidents.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Prepare for your IPAF assessment at your own pace.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering MEWP categories, pre-use checks, operating limits, harness requirements, and regulatory references.',
  },
  {
    icon: FileCheck2,
    title: 'Pre-Use Checklists',
    description:
      'Interactive digital pre-use checklists for scissor lifts and boom lifts. Complete your daily checks on your phone and maintain a digital record for compliance.',
  },
];

const sections = [
  {
    id: 'why-mewp-training',
    heading: 'Why MEWP Training Matters for Electricians',
    content: (
      <>
        <p>
          Mobile Elevated Work Platforms — scissor lifts, cherry pickers, and boom lifts — are
          essential equipment for electricians working at height. They provide safe, productive
          access to positions that would otherwise require scaffolding, ladders, or other less
          efficient methods.
        </p>
        <p>
          For electricians, MEWPs are used for cable tray and containment installation in
          warehouses, lighting installation and maintenance in commercial buildings, external cable
          routing and facade work, street lighting and column work, overhead line clearance and
          utility work, and fire alarm installation in large open spaces.
        </p>
        <p>
          However, MEWPs are involved in approximately 10 fatal injuries per year in the UK. The
          most common causes are entrapment (the operator being crushed between the basket and an
          overhead structure), overturning (the machine tipping due to ground failure or
          overloading), and falls from the platform. Every one of these incidents is preventable
          with proper training and disciplined operation.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/training/working-at-height">
            Work at Height Regulations 2005
          </SEOInternalLink>{' '}
          require that MEWP operators are trained and competent. The industry-standard qualification
          is the IPAF PAL Card, which is required by most principal contractors and site operators.
          Without it, you will not be permitted to operate a MEWP on most UK construction sites.
        </p>
      </>
    ),
  },
  {
    id: 'mewp-categories',
    heading: 'MEWP Categories and Types',
    content: (
      <>
        <p>
          MEWPs are classified into categories based on their type and whether they are mobile or
          static during operation. The categories relevant to electricians are:
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ChevronsUp className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Category 3a — Scissor Lifts</h3>
              <p className="text-white text-sm leading-relaxed">
                Mobile vertical platforms that travel to a position and elevate vertically. Scissor
                lifts provide a large, stable working platform (typically 1.5m to 3m long) and
                working heights from 6m to 18m. Ideal for cable tray installation, ceiling work, and
                tasks requiring a spacious platform for tools and materials. Can be driven at low
                speed with the platform lowered.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ChevronsUp className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Category 3b — Boom Lifts</h3>
              <p className="text-white text-sm leading-relaxed">
                Mobile boom platforms (cherry pickers) with articulating or telescoping booms
                providing both vertical lift and horizontal outreach. Working heights from 12m to
                40m or more. Essential for external work, reaching over obstacles, and accessing
                positions that cannot be reached vertically. Harness with restraint lanyard
                required.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ChevronsUp className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">
                Category 1b — Vehicle-Mounted Platforms
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Boom platforms mounted on a lorry or van chassis. Commonly used for street lighting,
                overhead line work, and highway maintenance. The vehicle provides road transport to
                site, then outriggers are deployed and the boom is operated from the basket.
                Separate training from self-propelled machines.
              </p>
            </div>
          </div>
        </div>
        <p>
          The choice of machine depends on the working height required, whether horizontal reach is
          needed, the available ground space, indoor or outdoor operation, ground conditions, and
          the weight of tools and materials to be taken to the working position.
        </p>
      </>
    ),
  },
  {
    id: 'ipaf-certification',
    heading: 'IPAF Certification: The Industry Standard',
    content: (
      <>
        <p>
          IPAF (International Powered Access Federation) is the trade association for the powered
          access industry. The IPAF PAL Card (Powered Access Licence) is the internationally
          recognised operator qualification for MEWPs.
        </p>
        <p>
          The PAL Card is valid for 5 years and is endorsed for specific machine categories. Most
          electricians obtain endorsements for Category 3a (scissor lifts) and Category 3b (boom
          lifts) through a 2-day combined training course at an IPAF-approved training centre.
        </p>
        <p>
          The training consists of theory and practical components. The theory covers legislation,
          hazard identification, pre-use checks, safe operating procedures, emergency procedures,
          and rescue planning. The practical component involves hands-on operation of the machines
          under instructor supervision, including manoeuvring, positioning, operating at height, and
          emergency lowering.
        </p>
        <p>
          The Elec-Mate MEWP course covers all the theory knowledge you need for your{' '}
          <SEOInternalLink href="/training/ipaf-training">IPAF assessment</SEOInternalLink>, but the
          practical training must be completed at an IPAF-approved centre. Use the IPAF website to
          find your nearest approved training centre.
        </p>
        <SEOAppBridge
          title="Prepare for your IPAF assessment with AI-powered study"
          description="Study MEWP theory at your own pace with Elec-Mate's interactive modules, quizzes, and AI tutor. Arrive at your IPAF training centre confident in the theory so you can focus on the practical skills."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'pre-use-checks',
    heading: 'Pre-Use Safety Checks: Every Shift, Every Machine',
    content: (
      <>
        <p>
          Pre-use checks must be completed before every shift by the operator. They take
          approximately 10 to 15 minutes and could save your life. Never skip them, even if you used
          the same machine yesterday.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection.</strong> Walk around the machine looking for damage,
                leaks (hydraulic fluid, fuel), flat or damaged tyres, missing or broken guardrails,
                damaged cables and hoses, and any obvious defects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Function test.</strong> Start the machine and test all controls from the
                ground controls first, then from the platform controls. Raise, lower, slew, and
                extend/retract (if applicable). Test the emergency stop and emergency lowering
                function.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ground assessment.</strong> Check the ground where the machine will operate
                is firm, level, and capable of supporting the load. Look for voids, trenches, soft
                ground, and drainage covers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead hazards.</strong> Identify overhead power lines, structural
                steelwork, beams, pipes, and any other obstructions that could cause entrapment.
                Plan your work to avoid contact with overhead structures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation.</strong> Check the machine has a valid thorough examination
                certificate (LOLER), the IPAF machine familiarisation sticker, and the operator
                manual. Record your pre-use check in the machine log.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you find any defect during the pre-use check, take the machine out of service
          immediately. Report the defect to the hire company or machine owner and request a
          replacement. Never use a defective MEWP.
        </p>
      </>
    ),
  },
  {
    id: 'safe-operation',
    heading: 'Safe Operating Procedures',
    content: (
      <>
        <p>
          Safe MEWP operation requires continuous awareness of the machine, the environment, and the
          people around you. These procedures apply to every MEWP operation:
        </p>
        <p>
          <strong>Positioning the machine.</strong> Drive the MEWP to the work position with the
          platform fully lowered. Set outriggers (if fitted) before raising the platform. Ensure the
          machine is on firm, level ground. Position the machine so you can reach the work without
          leaning over the guardrails or stretching beyond the platform boundary.
        </p>
        <p>
          <strong>Operating at height.</strong> Raise the platform smoothly using the controls. Keep
          both feet on the platform floor at all times. Never stand on the guardrails, the mid-rail,
          or any object placed on the platform to gain extra height. Keep tools and materials
          secured so they cannot fall from the platform.
        </p>
        <p>
          <strong>Wind limits.</strong> Most MEWPs have a maximum wind speed for safe operation —
          typically 28 mph (12.5 m/s) for boom lifts and 25 mph for scissor lifts. Monitor wind
          conditions continuously and lower the platform if wind speeds approach the limit. Wind
          speed can be significantly higher at the working height than at ground level.
        </p>
        <p>
          <strong>Exclusion zones.</strong> Establish an exclusion zone beneath and around the MEWP
          to protect people from falling objects and machine movement. Use barriers, cones, or tape
          to demarcate the zone. A banksman may be needed when operating near traffic, pedestrians,
          or other plant.
        </p>
        <SEOAppBridge
          title="Digital MEWP pre-use checklists on your phone"
          description="Complete your daily MEWP pre-use checks using Elec-Mate's interactive checklists. Record findings digitally, maintain a compliance trail, and never miss a critical check point."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Compliance',
    content: (
      <>
        <p>
          Several pieces of legislation govern MEWP use in the UK. Understanding these regulations
          helps you recognise your own duties and the responsibilities of your employer and the MEWP
          owner.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ShieldCheck className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Work at Height Regulations 2005</h3>
              <p className="text-white text-sm leading-relaxed">
                The primary regulations for all work at height. Require proper planning,
                supervision, use of appropriate equipment, and competent operators. MEWP use must be
                planned, the machine must be suitable for the task, and a rescue plan must be in
                place.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ShieldCheck className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">LOLER 1998</h3>
              <p className="text-white text-sm leading-relaxed">
                The Lifting Operations and Lifting Equipment Regulations 1998 require MEWPs to have
                a thorough examination at least every 6 months (or 12 months if the manufacturer
                specifies). The thorough examination must be carried out by a competent person and
                the certificate must be available on the machine.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ShieldCheck className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">PUWER 1998</h3>
              <p className="text-white text-sm leading-relaxed">
                The Provision and Use of Work Equipment Regulations 1998 require that MEWPs are
                maintained in safe working condition, operators are trained and competent, and the
                machine is suitable for its intended use.
              </p>
            </div>
          </div>
        </div>
        <p>
          As an operator, your key responsibilities are: complete pre-use checks before every shift,
          operate within the machine rated capacity and environmental limits, wear appropriate PPE
          (harness in boom lifts, hard hat, hi-vis), report defects immediately, and never operate a
          machine you have not been trained on. Your employer is responsible for providing training,
          selecting suitable equipment, maintaining the machine, and developing a{' '}
          <SEOInternalLink href="/training/site-safety">
            site-specific risk assessment
          </SEOInternalLink>{' '}
          and rescue plan.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/ipaf-training',
    title: 'IPAF Training Guide',
    description:
      'Complete IPAF operator training guide — categories, PAL Card, training centres, and renewal.',
    icon: GraduationCap,
    category: 'Training' as const,
  },
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description:
      'Comprehensive working at height training covering MEWPs, ladders, harnesses, and rescue procedures.',
    icon: ShieldCheck,
    category: 'Training' as const,
  },
  {
    href: '/training/pasma-training',
    title: 'PASMA Training Course',
    description:
      'Mobile scaffold tower training — when a tower is more suitable than a MEWP for your task.',
    icon: GraduationCap,
    category: 'Training' as const,
  },
  {
    href: '/training/scaffolding-awareness',
    title: 'Scaffolding Awareness Course',
    description:
      'Scaffold types, inspection, tag systems, and safe use — the knowledge to choose between scaffold and MEWP.',
    icon: ShieldCheck,
    category: 'Training' as const,
  },
  {
    href: '/training/site-safety',
    title: 'Site Safety for Electricians',
    description:
      'Comprehensive site safety training covering all the hazards electricians face on construction sites.',
    icon: AlertTriangle,
    category: 'Training' as const,
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment Guide',
    description:
      'How to write effective risk assessments for MEWP operations and other electrical work at height.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'MEWP Course — Mobile Elevated Work Platforms Training',
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
      courseWorkload: 'PT5H',
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

export default function MEWPCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-10-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Powered Access Training"
      badgeIcon={ChevronsUp}
      heroTitle={
        <>
          MEWP Course: <span className="text-yellow-400">Mobile Elevated Work Platforms</span>
        </>
      }
      heroSubtitle="Master scissor lift and cherry picker operation with MEWP training for electricians. IPAF categories, pre-use checks, safe operating procedures, rescue plans, and regulatory compliance. 6 modules with video content, quizzes, and AI tutor."
      readingTime={13}
      courseDuration="5 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prior MEWP experience required — suitable for all electricians who need to operate MEWPs on site"
      courseModules={6}
      courseCertification="CPD certificate on completion — IPAF PAL Card requires separate practical assessment at an approved centre"
      courseWhoIsItFor="Electricians preparing for IPAF operator training, site electricians who use scissor lifts and cherry pickers, and apprentices needing powered access awareness for construction sites"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Prepare for your IPAF assessment with confidence"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. MEWP theory modules, interactive quizzes, pre-use checklists, and an AI tutor for any powered access question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/mewp-course"
    />
  );
}
