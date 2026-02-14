import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Scale,
  BookOpen,
  Shield,
  AlertTriangle,
  FileCheck2,
  GraduationCap,
  Calculator,
  ClipboardCheck,
  Zap,
  ShieldCheck,
  Brain,
  Clock,
  Battery,
  Car,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Amendment 4', href: '/guides/bs-7671-amendment-4-2026' },
];

const tocItems = [
  { id: 'what-is-amendment-4', label: 'What Is Amendment 4?' },
  { id: 'expected-timeline', label: 'Expected Timeline' },
  { id: 'anticipated-changes', label: 'Anticipated Changes' },
  { id: 'energy-storage', label: 'Energy Storage Systems' },
  { id: 'ev-charging', label: 'EV Charging Updates' },
  { id: 'smart-installations', label: 'Smart Home Installations' },
  { id: 'how-to-prepare', label: 'How to Prepare' },
  { id: 'training-certification', label: 'Training and Certification' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Amendment 4 to BS 7671:2018 is expected in 2026 — the IET has not confirmed a precise publication date, but consultation processes are under way.',
  'A4 is anticipated to be more substantial than Amendment 3, addressing energy storage, EV charging infrastructure, smart home installations, and harmonised European standards.',
  'Electricians should prepare now by studying the current edition thoroughly, understanding A3:2024 changes, and staying current with CPD on emerging technologies.',
  'There will typically be a transition period after publication during which both the current and amended versions are acceptable for compliance purposes.',
  'Elec-Mate will update its AI agents, regulation references, calculators, and training content as soon as Amendment 4 is officially published.',
];

const faqs = [
  {
    question: 'When will BS 7671 Amendment 4 be published?',
    answer:
      'The IET has not confirmed an exact publication date for Amendment 4, but it is expected during 2026. The IET typically engages in a consultation process with industry stakeholders, including electrical contractors, manufacturers, competent person scheme operators, and training providers, before publishing an amendment. This consultation can take 12 to 18 months. Based on the pattern of previous amendments — A1 in 2020, A2 in 2022, A3 in 2024 — a 2026 publication for A4 aligns with the two-year amendment cycle. However, if the scope of A4 is larger than previous amendments, the consultation period could be extended.',
  },
  {
    question: 'Will I need a new book for Amendment 4?',
    answer:
      'It depends on the scope of the amendment. Amendment 3 (A3:2024) was small enough to be issued as a free PDF supplement. If Amendment 4 involves more extensive changes — for example, new chapters on energy storage or significant rewrites of existing regulations — the IET may publish a consolidated version of the standard (BS 7671:2018+A4:2026) as a new book. Alternatively, they may decide to publish a completely new edition (the 19th Edition) rather than another amendment to the 18th Edition. The IET has not indicated which approach they will take. Either way, Elec-Mate will include all updated regulation references in the app, so you will have access to the correct requirements without needing to search through the book on site.',
  },
  {
    question: 'Will Amendment 4 make the 18th Edition qualification obsolete?',
    answer:
      'No. Amendments to BS 7671 do not invalidate existing qualifications. The C&G 2382 (18th Edition Wiring Regulations) qualification remains current as long as BS 7671:2018 is the applicable standard — regardless of how many amendments are added to it. If the IET decides to publish a completely new edition (the 19th Edition) rather than another amendment, then a new qualification would eventually be required, but there would always be a transition period. Training providers and awarding bodies typically allow 12 to 24 months for electricians to update their qualification after a new edition is published. The practical approach is to stay current through CPD and update your qualification when the awarding body requires it.',
  },
  {
    question: 'How will Amendment 4 affect existing installations?',
    answer:
      'BS 7671 amendments are not retrospective. An installation that was compliant with the standard in force at the time it was designed and installed remains compliant — it does not need to be retrospectively upgraded to meet a new amendment. However, any new work (new installations, alterations, or additions) carried out after the amendment comes into effect must comply with the amended standard. During periodic inspection and testing (EICR), the inspector assesses the installation against the standard in force at the time of the inspection, but they should take account of the standard that applied when the installation was originally installed. The EICR observations should note whether any departures from the current standard pose a safety risk.',
  },
  {
    question: 'Should I wait for Amendment 4 before doing CPD on BS 7671?',
    answer:
      'Absolutely not. The current standard — BS 7671:2018+A3:2024 — is the one you must work to today. Understanding the current edition thoroughly, including the A3:2024 changes on bidirectional devices, is essential for your day-to-day work. CPD on the current standard is never wasted because the fundamentals of electrical installation design and inspection do not change between amendments. When Amendment 4 is published, the changes will build on the existing standard, so a strong understanding of the current edition makes it much easier to absorb the new requirements. Start your CPD now using Elec-Mate 46+ training courses, and the Amendment 4 content will be added automatically when it is published.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the 18th Edition IET Wiring Regulations including all amendments and key regulation changes.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-amendment-3-changes',
    title: 'Amendment 3 Changes Explained',
    description:
      'Regulation 530.3.201 — bidirectional and unidirectional devices for solar PV and battery storage installations.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation-guide',
    title: 'EV Charger Installation Guide',
    description:
      'Complete guide to EV charger installation including cable sizing, earthing, protective devices, and certification.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/guides/solar-panel-installation-guide',
    title: 'Solar PV Installation Guide',
    description:
      'Solar panel installation, G98/G99 applications, inverter selection, and certification requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'Continuing professional development requirements, what counts as CPD, and how to keep your competence current.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with structured training modules, flashcards, and mock exams on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-amendment-4',
    heading: 'What Is BS 7671 Amendment 4?',
    content: (
      <>
        <p>
          Amendment 4 (A4) will be the fourth amendment to BS 7671:2018, the 18th Edition of the IET
          Wiring Regulations. Following the pattern of previous amendments — A1:2020, A2:2022, and{' '}
          <SEOInternalLink href="/guides/bs-7671-amendment-3-changes">A3:2024</SEOInternalLink> — A4
          is expected in 2026. The IET has not yet published the amendment, but industry
          consultation is under way.
        </p>
        <p>
          While Amendment 3 was narrowly focused on a single regulation (530.3.201 on bidirectional
          devices), Amendment 4 is anticipated to be broader in scope. The rapid evolution of
          electrical installation technology — energy storage systems, smart home infrastructure,
          electric vehicle charging, and the continuing harmonisation of European standards —
          creates significant pressure for the standard to be updated.
        </p>
        <p>
          The IET has two options: publish Amendment 4 as an update to the existing 18th Edition, or
          publish a completely new 19th Edition. The choice depends on the scale of changes
          required. If the changes are substantial enough to warrant a restructuring of the
          standard, a new edition may be more appropriate. If the changes can be accommodated as
          additions and modifications to the existing structure, an amendment is more likely.
        </p>
        <p>
          For working electricians, the practical impact is the same either way: study the current
          standard thoroughly, stay current with CPD, and be prepared to absorb the new requirements
          when they are published.
        </p>
      </>
    ),
  },
  {
    id: 'expected-timeline',
    heading: 'Expected Timeline for Amendment 4',
    content: (
      <>
        <p>Based on the pattern of previous amendments, here is the likely timeline for A4:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2025 — Industry consultation.</strong> The IET consults with electrical
                contractors, manufacturers, competent person schemes (NICEIC, NAPIT, ELECSA),
                training providers, and other stakeholders on the proposed changes. Draft
                regulations are reviewed and debated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2026 — Publication.</strong> The amendment (or new edition) is published by
                the IET. A PDF supplement or new book becomes available. The IET typically announces
                the publication date several months in advance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2026-2027 — Transition period.</strong> There is typically a 6 to 12 month
                transition period during which both the current and amended versions are acceptable.
                This gives electricians, training providers, and competent person schemes time to
                update their practices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2027 onwards — Full compliance required.</strong> After the transition
                period, all new work must comply with the amended standard. Existing installations
                are not retrospectively affected, but new installations, alterations, and additions
                must meet the new requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These dates are estimates based on the historical pattern. The IET may accelerate or delay
          the publication depending on the complexity of the changes and the outcome of the
          consultation process. Check the IET website for the latest announcements, or use
          Elec-Mate's training notifications to stay informed — the app will alert you when A4 is
          published and provide updated content immediately.
        </p>
      </>
    ),
  },
  {
    id: 'anticipated-changes',
    heading: 'Anticipated Changes in Amendment 4',
    content: (
      <>
        <p>
          While the exact content of Amendment 4 has not been confirmed, the following areas are
          widely expected to be addressed based on industry consultation topics, IET publications,
          and the direction of European harmonisation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery energy storage systems (BESS)</strong> — expanded requirements for
                domestic and commercial battery storage, including safety requirements for
                lithium-ion batteries, fire risk mitigation, ventilation, and installation location
                restrictions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging infrastructure</strong> — updated guidance on load management,
                vehicle-to-grid (V2G) technology, dynamic load balancing, and the electrical
                requirements for multi-charger installations in commercial settings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart home installations</strong> — guidance on networked electrical
                devices, home automation systems, cybersecurity considerations for internet-
                connected electrical equipment, and the interface between IT systems and electrical
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AFDD requirements</strong> — potential expansion of Arc Fault Detection
                Device requirements beyond the current recommendations in{' '}
                <SEOInternalLink href="/guides/afdd-guide-uk">Regulation 421.1.7</SEOInternalLink>,
                possibly making AFDDs mandatory in more installation types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD requirements</strong> — updated{' '}
                <SEOInternalLink href="/guides/spd-surge-protection-guide">
                  surge protective device
                </SEOInternalLink>{' '}
                requirements reflecting changes to the relevant European product standards and
                updated risk assessment criteria.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>European harmonisation</strong> — alignment with the latest versions of HD
                60364 (the harmonised European standard from which BS 7671 derives) and updated
                product standards for protective devices, cables, and accessories.
              </span>
            </li>
          </ul>
        </div>
        <p>
          It is important to emphasise that these are anticipated areas of change based on publicly
          available information and industry discussion. The actual content of A4 will only be
          confirmed when the IET publishes the amendment.
        </p>
      </>
    ),
  },
  {
    id: 'energy-storage',
    heading: 'Energy Storage Systems: A Major Focus',
    content: (
      <>
        <p>
          The growth of domestic battery energy storage systems (BESS) in the UK has outpaced the
          regulation framework. While{' '}
          <SEOInternalLink href="/guides/bs-7671-amendment-3-changes">Amendment 3</SEOInternalLink>{' '}
          addressed the bidirectional device issue, there are many other aspects of BESS
          installation that need clearer guidance in BS 7671:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Location requirements — where can a battery be safely installed? Current guidance
                from manufacturers varies. A BS 7671 regulation on minimum clearances, ventilation
                requirements, and restrictions on installation in escape routes would provide
                clarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Fire safety — lithium-ion battery fires are a known risk. Requirements for fire
                barriers, smoke detection, and thermal runaway management in domestic and commercial
                settings are expected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                DC circuit protection — BESS installations involve DC circuits between the battery
                modules and the inverter. Clear requirements for DC protective devices, cable
                sizing, and disconnection arrangements are needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Labelling and documentation — standardised labelling requirements for battery
                installations, including safety warnings, system capacity, and emergency
                disconnection procedures.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in the solar PV and battery storage sector should familiarise
          themselves with the current best practice guidance from the IET (Code of Practice for
          Energy Storage Systems), MCS requirements, and manufacturer installation manuals. This
          knowledge will form the foundation for understanding the A4 requirements when they are
          published.
        </p>
        <SEOAppBridge
          title="AI circuit designer for battery storage installations"
          description="Elec-Mate's AI circuit designer handles BESS circuit design with correct DC and AC protection, cable sizing, and compliance. Describe the installation — battery capacity, inverter type, connection arrangement — and get a compliant design in seconds."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'EV Charging Infrastructure Updates',
    content: (
      <>
        <p>
          The UK government has set ambitious targets for electric vehicle adoption, with the ban on
          new petrol and diesel car sales originally set for 2030 (now 2035). The electrical
          infrastructure to support EV charging needs to scale dramatically, and BS 7671 must keep
          pace with this technology.
        </p>
        <p>
          Current{' '}
          <SEOInternalLink href="/guides/ev-charger-installation-guide">
            EV charger installations
          </SEOInternalLink>{' '}
          are covered by BS 7671 Section 722, which was introduced in the 18th Edition. Amendment 4
          is expected to update Section 722 to address:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle-to-grid (V2G) technology</strong> — EV chargers that can feed energy
                from the vehicle battery back into the installation. This creates bidirectional
                current flow (already partially addressed by A3:2024) but also raises questions
                about protection coordination, islanding, and DNO requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dynamic load management</strong> — systems that automatically adjust the
                charging current based on the available capacity of the supply. A4 may include
                requirements for how load management systems interact with the protective devices in
                the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-charger installations</strong> — commercial car parks and fleet depots
                with multiple EV chargers. Requirements for distribution board design, cable sizing
                with diversity factors, and earth fault protection in large-scale installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC rapid chargers</strong> — high-power DC charging installations (50kW+)
                raise specific issues around fault current levels, earthing, and protective device
                coordination that may need clearer guidance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EV charging market is one of the fastest-growing areas for electrical contractors.
          Electricians who invest in understanding EV charging technology now will be well
          positioned to benefit from the A4 requirements when they come into force.
        </p>
      </>
    ),
  },
  {
    id: 'smart-installations',
    heading: 'Smart Home and Connected Installations',
    content: (
      <>
        <p>
          Smart home technology is no longer a niche market. Connected thermostats, lighting control
          systems, automated blinds, security systems, and home energy management platforms are
          becoming standard in new-build properties and increasingly common in retrofits. BS 7671
          has traditionally focused on the fixed electrical installation — wiring, protective
          devices, and accessories. The challenge of smart home technology is that it blurs the
          boundary between the fixed installation and the IT/data network.
        </p>
        <p>Amendment 4 is expected to provide guidance on:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extra-low voltage control systems</strong> — ELV wiring for smart devices,
                KNX/DALI bus systems, and PoE (Power over Ethernet) installations. These systems
                need to be designed and installed safely, with appropriate segregation from mains
                voltage circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cybersecurity considerations</strong> — internet-connected electrical
                devices (smart switches, smart meters, EV chargers) can be targets for cyber
                attacks. While cybersecurity is primarily an IT concern, the electrical installation
                design should consider the consequences of a compromised device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy management systems</strong> — automated systems that manage energy
                consumption, solar PV generation, battery storage, and EV charging. These systems
                control switching devices and may need to comply with additional safety
                requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, the smart home trend represents both a challenge and an opportunity.
          Those who develop expertise in connected installations will command higher rates and
          access a growing market of homeowners and developers who want integrated electrical and
          automation systems.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-prepare',
    heading: 'How to Prepare for Amendment 4 Now',
    content: (
      <>
        <p>
          You do not need to wait for the publication of Amendment 4 to start preparing. The
          following actions will put you in the best position to absorb the new requirements
          quickly:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Master the current standard.</strong> Read and understand{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                thoroughly. The fundamentals of circuit design, protection against overcurrent,
                protection against electric shock, and earthing arrangements do not change between
                amendments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get practical experience with emerging technologies.</strong> Install solar
                PV, battery storage, and EV chargers. The hands-on experience will make the A4
                requirements much easier to understand because you will already know the practical
                challenges.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep your qualifications current.</strong> If your{' '}
                <SEOInternalLink href="/guides/city-guilds-2391-guide">C&G 2391</SEOInternalLink> or
                C&G 2382 qualification is more than a few years old, consider refresher training.
                When A4 is published, the awarding bodies will update their exam content, and recent
                study will help you stay ahead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Follow IET publications.</strong> The IET regularly publishes guidance
                notes, codes of practice, and technical articles that signal the direction of future
                regulation changes. Subscribe to IET newsletters and attend CPD events.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use Elec-Mate for continuous CPD.</strong> The platform includes 46+
                training courses covering BS 7671, solar PV, battery storage, EV charging, and more.
                Flashcards, mock exams, and EPA/AM2 simulators keep your knowledge sharp.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Start your CPD now — do not wait for Amendment 4"
          description="Elec-Mate includes 46+ training courses covering every area expected to change in Amendment 4. Solar PV, battery storage, EV charging, smart installations, AFDDs, SPDs — plus mock exams, flashcards, and structured learning paths. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'training-certification',
    heading: 'Training, Certification, and Elec-Mate Support',
    content: (
      <>
        <p>
          When Amendment 4 is published, Elec-Mate will be among the first platforms to integrate
          the updated requirements. Here is what the platform provides today and what will be
          updated for A4:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Agents — Updated for A4</h4>
                <p className="text-white text-sm leading-relaxed">
                  The AI circuit designer, installation specialist, fault diagnosis agent, and tutor
                  agent will all be updated with A4 regulation references. Design a solar PV
                  circuit, diagnose a fault, or study for an exam — the AI uses the latest
                  regulations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">50+ Calculators — A4 Compliant</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cable sizing, voltage drop, earth fault loop impedance, maximum demand, diversity
                  factor, prospective fault current — all calculators will be updated if A4 changes
                  any of the underlying calculation methods or reference values.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Training Content — A4 Modules</h4>
                <p className="text-white text-sm leading-relaxed">
                  New training modules covering every A4 change will be added to the platform. The
                  apprentice hub (flashcards, mock exams, EPA/AM2 simulators, site diary, OJT
                  tracker, portfolio builder) will also be updated for A4 content.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificates — A4 References</h4>
                <p className="text-white text-sm leading-relaxed">
                  EICR, EIC, and Minor Works certificates produced in Elec-Mate will reference the
                  correct edition of BS 7671 including A4. The defect code AI will be updated with
                  any new regulation numbers and observation classifications.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Be ready for Amendment 4 on day one"
          description="Join 430+ UK electricians using Elec-Mate for certificates, calculations, AI agents, and CPD. When Amendment 4 drops, your tools and training will update automatically. 7-day free trial, cancel anytime."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BS7671Amendment4Page() {
  return (
    <GuideTemplate
      title="BS 7671 Amendment 4 2026 | Upcoming Changes UK"
      description="Everything we know about BS 7671 Amendment 4 expected in 2026. Anticipated changes to energy storage, EV charging, smart installations, AFDD requirements, and European harmonisation. How to prepare now."
      datePublished="2025-11-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations"
      badgeIcon={Scale}
      heroTitle={
        <>
          BS 7671 Amendment 4: <span className="text-yellow-400">What to Expect in 2026</span>
        </>
      }
      heroSubtitle="Amendment 4 to BS 7671:2018 is expected in 2026. It is anticipated to address energy storage systems, EV charging infrastructure, smart home installations, and harmonised European standards. This guide covers everything we know so far and how to prepare."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About BS 7671 Amendment 4"
      relatedPages={relatedPages}
      ctaHeading="Prepare for Amendment 4 with Elec-Mate"
      ctaSubheading="46+ training courses, 50+ calculators, AI circuit designer, and certificate tools — all updated for every BS 7671 amendment. 7-day free trial, cancel anytime."
    />
  );
}
