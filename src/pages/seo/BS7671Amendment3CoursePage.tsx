import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  BookMarked,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Radio,
  ShieldCheck,
  ArrowLeftRight,
  AlertTriangle,
  Scale,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'BS 7671 Amendment 3 Course | A3:2024 Update Training';
const PAGE_DESCRIPTION =
  'Comprehensive BS 7671 Amendment 3 (A3:2024) training for UK electricians. Regulation 530.3.201, bidirectional and unidirectional devices, updated requirements, and practical implications. 6 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'BS 7671 Amendment 3', href: '/training/bs-7671-amendment-3-course' },
];

const tocItems = [
  { id: 'what-is-amendment-3', label: 'What Is Amendment 3?' },
  { id: 'reg-530-3-201', label: 'Regulation 530.3.201' },
  { id: 'bidirectional-devices', label: 'Bidirectional and Unidirectional Devices' },
  { id: 'practical-impact', label: 'Practical Impact on Installation Work' },
  { id: 'update-training', label: 'Updating Your Knowledge' },
  { id: 'timeline-and-context', label: 'Timeline: A1 to A4' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A3:2024 was issued on 31 July 2024 as a free PDF supplement to the 18th Edition — it is not a new book and does not replace the existing brown book, but electricians must be aware of its contents.',
  'The key addition is Regulation 530.3.201, which addresses the selection and installation of switching and control devices that may be subjected to bidirectional power flows — a direct response to the growth of battery storage, solar PV, and vehicle-to-grid systems.',
  'Bidirectional power flow occurs when energy can travel in both directions through a device — for example, from a solar PV inverter exporting to the grid, or from an EV battery discharging back into the property through a vehicle-to-grid charger.',
  'Electricians must verify that all switching, protective, and control devices in an installation with bidirectional power flow are rated and suitable for operation in both directions — not all MCBs, RCDs, and isolators are bidirectional.',
  'Amendment 4 is expected in 2026 and will bring further changes — Elec-Mate keeps your knowledge current with updates as each amendment is published.',
];

const faqs = [
  {
    question: 'Do I need to buy a new copy of BS 7671 for Amendment 3?',
    answer:
      'No. Amendment 3 (A3:2024) was published on 31 July 2024 as a free PDF supplement by the IET. It is not a replacement for the brown book (BS 7671:2018+A2:2022). You download the supplement and read it alongside your existing copy. The supplement contains the new and amended regulations, including Regulation 530.3.201. When Amendment 4 is published (expected 2026), it is likely to be incorporated into a consolidated reprint — at that point, a new edition or updated brown book may be issued. Until then, electricians should ensure they have both the brown book (with Amendment 2 incorporated) and the free A3:2024 supplement.',
  },
  {
    question: 'What does Regulation 530.3.201 actually require?',
    answer:
      'Regulation 530.3.201 requires that where a switching device or control device may be subjected to power flow in both directions (bidirectional power flow), the device shall be suitable for that duty. In practical terms, this means that every MCB, RCBO, RCD, isolator, changeover switch, and contactor in a circuit that could carry current in either direction must be verified as suitable for bidirectional operation. Not all devices are — some MCBs, for example, are designed to be connected with the supply on one specific terminal. Where a device is unidirectional (suitable for current flow in one direction only), it must either be replaced with a bidirectional-rated device, or additional measures must be taken to prevent reverse power flow through it.',
  },
  {
    question: 'Which installations are affected by bidirectional power flow?',
    answer:
      'The main installations affected are those with energy storage systems (battery storage), solar PV systems with export capability, vehicle-to-grid (V2G) EV chargers that can discharge the vehicle battery back into the property, wind turbines, micro-CHP (combined heat and power) units, and any other microgeneration installation connected on the load side of the main switch. The common factor is that these systems can feed energy back towards the supply, reversing the normal direction of current flow. As solar PV, battery storage, and V2G installations become more widespread, an increasing proportion of domestic and commercial installations will have bidirectional power flow — making this regulation relevant to a growing number of electricians.',
  },
  {
    question: 'How do I know if a device is suitable for bidirectional operation?',
    answer:
      'Check the manufacturer data sheet for the device. Bidirectional devices are typically marked as such or described as "suitable for connection at either terminal" or "suitable for reverse energy flow." Some manufacturers use specific symbols or product codes to indicate bidirectional capability. If the data sheet specifies that the supply must be connected to a particular terminal (usually the top terminal for MCBs), the device is unidirectional and is not suitable for circuits with bidirectional power flow without additional protective measures. When in doubt, contact the manufacturer technical support team. Leading manufacturers including Schneider Electric, Hager, and Eaton have published guidance on which of their products are suitable for bidirectional applications.',
  },
  {
    question: 'Is the 18th Edition exam updated for Amendment 3?',
    answer:
      'The City and Guilds 2382 (18th Edition) examination syllabus is periodically updated to reflect amendments. Following the publication of A3:2024, exam questions related to bidirectional power flow and Regulation 530.3.201 may appear. If you are sitting or resitting the 2382 exam, you should ensure your study materials cover Amendment 3. Elec-Mate has updated all 18th Edition course content and mock exams to include A3:2024 material. The key topics to study are: Regulation 530.3.201 requirements, the definition of bidirectional and unidirectional devices, identification of installations with bidirectional power flow, and verification that devices are suitable for their intended duty.',
  },
  {
    question: 'What is the difference between Amendment 3 and the expected Amendment 4?',
    answer:
      'Amendment 3 (A3:2024) is a focused amendment addressing primarily the issue of bidirectional power flow through Regulation 530.3.201. It was published as a free supplement on 31 July 2024. Amendment 4 is expected in 2026 and is anticipated to be a broader amendment covering multiple areas of BS 7671, potentially including further updates to Section 722 (electric vehicle charging), energy storage systems, and prosumer installations. The exact content of Amendment 4 has not been confirmed at the time of writing. Elec-Mate will update course content as soon as Amendment 4 is published. Some industry commentators expect Amendment 4 to be incorporated into a new consolidated reprint of BS 7671, which would become the definitive brown book for the remainder of the 18th Edition lifecycle.',
  },
];

const modules = [
  {
    title: 'Amendment 3 Overview and Context',
    description:
      'What A3:2024 is, when it was published, how it relates to the 18th Edition brown book and previous amendments (A1:2020, A2:2022). The regulatory timeline from the 17th to 18th Edition and beyond.',
  },
  {
    title: 'Regulation 530.3.201 in Detail',
    description:
      'Full analysis of Regulation 530.3.201 — its wording, its scope, and its practical implications. What constitutes a switching device, a control device, and bidirectional power flow under the regulation.',
  },
  {
    title: 'Bidirectional vs Unidirectional Devices',
    description:
      'How to identify whether an MCB, RCBO, RCD, isolator, or contactor is suitable for bidirectional operation. Manufacturer marking, data sheet interpretation, and practical identification techniques.',
  },
  {
    title: 'Installations With Bidirectional Power Flow',
    description:
      'Solar PV systems, battery energy storage systems (BESS), vehicle-to-grid (V2G) chargers, micro-CHP, and wind turbines. How bidirectional power flow occurs in each installation type and where Regulation 530.3.201 applies.',
  },
  {
    title: 'Design and Installation Considerations',
    description:
      'Selecting appropriate devices for new installations with bidirectional power flow. Retrofitting existing installations — assessing current devices and replacing where necessary. Circuit protection coordination and isolation requirements.',
  },
  {
    title: 'Verification, Testing, and Documentation',
    description:
      'How to verify compliance with Regulation 530.3.201 during initial verification and periodic inspection. Documentation requirements for EICs and EICRs. Observation codes for non-compliant installations.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any question about Amendment 3 in plain English. Get detailed answers on Regulation 530.3.201, bidirectional devices, and practical installation scenarios.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Clear video explanations of bidirectional power flow, device identification, and the practical implications of A3:2024 for everyday electrical work.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your understanding of Amendment 3 with scenario-based questions. Identify bidirectional circuits, select suitable devices, and apply Regulation 530.3.201 correctly.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Track daily progress and stay on course with reminder notifications.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering A3:2024 regulations, device specifications, bidirectional circuit identification, and verification procedures.',
  },
  {
    icon: FileCheck2,
    title: 'Updated Mock Exams',
    description:
      'All 18th Edition mock exams updated to include A3:2024 content. Practise with questions covering Regulation 530.3.201 and bidirectional power flow scenarios.',
  },
];

const sections = [
  {
    id: 'what-is-amendment-3',
    heading: 'What Is BS 7671 Amendment 3 (A3:2024)?',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 is the third amendment to the 18th Edition of the IET Wiring
          Regulations. It was issued on 31 July 2024 as a free PDF supplement — not a new book and
          not a replacement for the existing brown book (BS 7671:2018+A2:2022). Electricians should
          download the supplement and read it alongside their existing copy of BS 7671.
        </p>
        <p>
          Amendment 3 is a focused amendment, primarily addressing the growing need for guidance on
          installations where power can flow in both directions through switching and control
          devices. This is driven by the rapid adoption of solar PV systems, battery energy storage
          systems, and vehicle-to-grid (V2G) EV chargers — all of which can feed energy back into
          the installation and, in some cases, back to the distribution network.
        </p>
        <p>
          For electricians studying for or holding the{' '}
          <SEOInternalLink href="/training/eighteenth-edition-course">
            18th Edition qualification (C&G 2382)
          </SEOInternalLink>
          , Amendment 3 is required knowledge. Exam questions may reference Regulation 530.3.201 and
          the concept of bidirectional power flow. For practising electricians, understanding
          A3:2024 is essential for any installation involving solar PV, battery storage, or V2G
          charging.
        </p>
      </>
    ),
  },
  {
    id: 'reg-530-3-201',
    heading: 'Regulation 530.3.201: The Key Addition',
    content: (
      <>
        <p>
          The central addition in Amendment 3 is Regulation 530.3.201. This regulation sits within
          Part 5 of BS 7671 (Selection and Erection of Equipment) and specifically within Chapter 53
          (Switching Devices). It states that where a switching device or control device may be
          subjected to power flow in both directions, the device must be suitable for that duty.
        </p>
        <p>
          This seems like common sense — of course a device should be suitable for its intended use.
          But the practical reality is that many electricians have been installing solar PV systems,
          battery storage, and other microgeneration equipment without checking whether every device
          in the circuit path is rated for reverse current flow. Some MCBs, RCBOs, and isolators are
          designed with a specific line (supply) terminal and load terminal — if current flows in
          the reverse direction, the device may not operate correctly during a fault, potentially
          failing to disconnect.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-lg mb-2">Why This Matters</h3>
              <p className="text-white text-sm leading-relaxed">
                If a fault occurs on a circuit protected by a unidirectional MCB and the fault
                current flows in the reverse direction (from the load side), the MCB may not trip at
                all, or may trip at a significantly higher current than its rating. This could
                result in overheating, cable damage, or fire. Regulation 530.3.201 makes it explicit
                that this risk must be addressed at the design and installation stage.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Understand Regulation 530.3.201 with AI explanations"
          description="Not sure whether your installation needs bidirectional devices? Ask the Elec-Mate AI tutor about specific scenarios — solar PV, battery storage, V2G chargers — and get clear guidance on Regulation 530.3.201 compliance."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'bidirectional-devices',
    heading: 'Bidirectional and Unidirectional Devices Explained',
    content: (
      <>
        <p>
          A <strong>bidirectional device</strong> is a switching or protective device that is
          designed to operate correctly regardless of the direction of current flow through it. The
          supply can be connected to either terminal, and the device will provide its rated
          protection in both directions. Many modern MCBs and RCBOs from major manufacturers are
          bidirectional, but this cannot be assumed — always check the manufacturer data.
        </p>
        <p>
          A <strong>unidirectional device</strong> is designed for current flow in one direction
          only. It has a designated line (supply) terminal and a load terminal. If the current
          direction is reversed — as can happen with bidirectional power flow — the device may not
          provide its rated protection. Unidirectional devices are not suitable for installation in
          circuits where bidirectional power flow can occur, unless additional measures prevent
          reverse flow through the device.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ArrowLeftRight className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">
                How to Identify Bidirectional Devices
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Check the manufacturer data sheet or product marking. Bidirectional devices may be
                marked with a specific symbol, described as "suitable for connection at either
                terminal," or listed as compliant with the relevant product standard for
                bidirectional use. Some manufacturers publish specific application notes for solar
                PV and battery storage installations listing which products are suitable.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Zap className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Devices to Check</h3>
              <p className="text-white text-sm leading-relaxed">
                MCBs, RCBOs, RCDs, main switches and isolators, changeover switches, contactors, and
                any other switching or control device in the path between the bidirectional power
                source and the point of supply. Every device in the circuit must be verified — not
                just the device closest to the generator or inverter.
              </p>
            </div>
          </div>
        </div>
        <p>
          For existing installations being inspected under an{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink>, an inspector
          should check whether any microgeneration or energy storage is present and, if so, verify
          that all devices in the affected circuits are suitable for bidirectional operation. A
          non-compliant device in a bidirectional circuit could be classified as a C2 (Potentially
          Dangerous) observation.
        </p>
      </>
    ),
  },
  {
    id: 'practical-impact',
    heading: 'Practical Impact on Everyday Installation Work',
    content: (
      <>
        <p>
          For many electricians, the practical impact of Amendment 3 is focused on specific
          installation types. If you are installing solar PV, battery storage, or V2G chargers, you
          need to apply Regulation 530.3.201 from the design stage. If you are carrying out general
          domestic or commercial installation work without microgeneration, the regulation has
          minimal direct impact on your day-to-day work — but you still need to know it.
        </p>
        <p>When designing an installation with bidirectional power flow, the steps are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              <strong>Identify all circuits with bidirectional power flow.</strong> Trace the power
              path from the microgeneration source or battery storage through to the main switch and
              every circuit that could carry reverse current.
            </li>
            <li>
              <strong>Check every device in the path.</strong> For each MCB, RCBO, RCD, isolator,
              and switch in the identified circuits, verify from the manufacturer data that it is
              suitable for bidirectional operation.
            </li>
            <li>
              <strong>Replace or add protection.</strong> Where a device is unidirectional, either
              replace it with a bidirectional equivalent or install additional measures (such as a
              blocking diode or reverse power relay) to prevent reverse current flow through the
              device.
            </li>
            <li>
              <strong>Document the design decisions.</strong> Record which devices have been
              verified as bidirectional and any additional measures taken. This documentation
              supports the{' '}
              <SEOInternalLink href="/guides/electrical-certificate-types-uk">
                Electrical Installation Certificate
              </SEOInternalLink>
              .
            </li>
          </ol>
        </div>
        <p>
          For{' '}
          <SEOInternalLink href="/training/ev-charger-installation">
            EV charger installations
          </SEOInternalLink>
          , Amendment 3 is particularly relevant where vehicle-to-grid (V2G) or vehicle-to-home
          (V2H) chargers are installed. These chargers can discharge the vehicle battery back into
          the property, creating bidirectional power flow through the consumer unit and potentially
          through the main supply fuse and meter.
        </p>
      </>
    ),
  },
  {
    id: 'update-training',
    heading: 'Updating Your Knowledge for Amendment 3',
    content: (
      <>
        <p>
          If you hold the 18th Edition qualification (C&G 2382), you do not need to resit the exam
          for Amendment 3 — your qualification remains valid. However, you do need to update your
          working knowledge to ensure you are aware of the new regulation and can apply it correctly
          in practice.
        </p>
        <p>
          For electricians registered with competent person schemes such as NICEIC, NAPIT, or
          ELECSA, awareness of amendments is part of your ongoing CPD (Continuing Professional
          Development) obligation. Most scheme providers expect their registered electricians to
          stay current with amendments to BS 7671 and to be able to demonstrate that awareness
          during assessments.
        </p>
        <p>
          The Elec-Mate{' '}
          <SEOInternalLink href="/training/cpd-for-electricians">
            CPD training platform
          </SEOInternalLink>{' '}
          includes a dedicated Amendment 3 module that covers every aspect of A3:2024 in structured,
          bite-sized lessons. Complete the module, pass the quiz, and receive a CPD certificate —
          all from your phone.
        </p>
        <SEOAppBridge
          title="Complete your Amendment 3 CPD in one session"
          description="Study the new regulation, test your understanding with scenario-based quizzes, and earn a CPD certificate — all within the Elec-Mate app. Perfect for fitting around site work."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'timeline-and-context',
    heading: 'The Amendment Timeline: A1 to A4 and Beyond',
    content: (
      <>
        <p>
          Understanding where Amendment 3 sits in the broader timeline of BS 7671 helps put its
          significance in context.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center font-bold text-blue-400 shrink-0">
              A1
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Amendment 1 (A1:2020)</h3>
              <p className="text-white text-sm leading-relaxed">
                Published February 2020. Minor corrections and clarifications to the original 2018
                text. No significant new requirements.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center font-bold text-green-400 shrink-0">
              A2
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Amendment 2 (A2:2022)</h3>
              <p className="text-white text-sm leading-relaxed">
                Published March 2022. More substantial changes including updates to Section 722
                (Electric Vehicle Charging Installations), Section 753 (Floor and Ceiling Heating),
                and various corrections throughout. Incorporated into the current consolidated brown
                book.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              A3
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Amendment 3 (A3:2024)</h3>
              <p className="text-white text-sm leading-relaxed">
                Published 31 July 2024. Adds Regulation 530.3.201 addressing bidirectional and
                unidirectional switching devices. Free PDF supplement — not incorporated into a new
                brown book.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center font-bold text-purple-400 shrink-0">
              A4
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Amendment 4 (Expected 2026)</h3>
              <p className="text-white text-sm leading-relaxed">
                Expected to bring broader changes. May be incorporated into a new consolidated
                reprint. Exact content not yet confirmed — Elec-Mate will update course content as
                soon as it is published.
              </p>
            </div>
          </div>
        </div>
        <p>
          The 18th Edition lifecycle typically runs for approximately 7 to 10 years before a new
          edition is published. The 19th Edition is not expected before 2028 at the earliest. In the
          meantime, amendments keep the standard current with technological developments —
          particularly the rapid growth of renewable energy, energy storage, and electric vehicle
          charging installations.
        </p>
        <p>
          Staying current with each amendment is not optional — it is a professional obligation for
          any electrician designing, installing, inspecting, or certifying{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">
            electrical installations under BS 7671
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/eighteenth-edition-course',
    title: '18th Edition Course (C&G 2382)',
    description:
      'Full 18th Edition study course covering all parts of BS 7671:2018+A3:2024 with interactive quizzes and mock exams.',
    icon: GraduationCap,
    category: 'Training' as const,
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Comprehensive guide to the IET Wiring Regulations — key changes, structure, and application.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs-7671-amendment-4',
    title: 'BS 7671 Amendment 4 Guide',
    description:
      'What to expect from Amendment 4 (expected 2026) — anticipated changes and preparation guidance.',
    icon: BookMarked,
    category: 'Guide' as const,
  },
  {
    href: '/training/ev-charger-installation',
    title: 'EV Charger Installation Course',
    description:
      'Section 722 requirements, V2G considerations, and bidirectional power flow in EV charging installations.',
    icon: Zap,
    category: 'Training' as const,
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'C&G 2391 study course including updated EICR procedures for installations with bidirectional power flow.',
    icon: ClipboardCheck,
    category: 'Training' as const,
  },
  {
    href: '/training/solar-pv-installation',
    title: 'Solar PV Installation Course',
    description:
      'Solar PV design and installation training — including inverter selection and bidirectional protection.',
    icon: ShieldCheck,
    category: 'Training' as const,
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'BS 7671 Amendment 3 Course — A3:2024 Update Training',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Intermediate',
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

export default function BS7671Amendment3CoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Update"
      badgeIcon={BookMarked}
      heroTitle={
        <>
          BS 7671 Amendment 3: <span className="text-yellow-400">A3:2024 Update Training</span>
        </>
      }
      heroSubtitle="Master the latest amendment to the 18th Edition wiring regulations. Regulation 530.3.201, bidirectional and unidirectional devices, practical impact on solar PV, battery storage, and V2G installations. 6 modules with video content, quizzes, and AI tutor."
      readingTime={14}
      courseDuration="6 hours"
      courseLevel="Intermediate"
      coursePrerequisites="18th Edition qualification (C&G 2382) or currently studying for it"
      courseModules={6}
      courseCertification="CPD certificate on completion — evidence of Amendment 3 awareness for scheme assessments"
      courseWhoIsItFor="Qualified electricians needing to update their knowledge for A3:2024, installers working with solar PV and battery storage, and anyone preparing for the 18th Edition exam"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Get up to speed on Amendment 3"
      ctaSubheading="Join 430+ UK electricians staying current with Elec-Mate. Structured modules, interactive quizzes, video content, and an AI tutor for any BS 7671 question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/bs-7671-amendment-3-course"
    />
  );
}
