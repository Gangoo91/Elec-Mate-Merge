import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Clock,
  BookOpen,
  Landmark,
  ShieldCheck,
  Zap,
  FileCheck2,
  GraduationCap,
  Scale,
  AlertTriangle,
  ClipboardCheck,
  Award,
  Brain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Timeline', href: '/guides/electrical-regulations-timeline-uk' },
];

const tocItems = [
  { id: 'overview', label: 'The Story of UK Electrical Regulations' },
  { id: 'early-editions', label: '1882 to 1950: The Early Editions' },
  { id: 'post-war', label: '1950 to 1980: Post-War Modernisation' },
  { id: 'modern-era', label: '1981 to 2008: The Modern Era' },
  { id: 'seventeenth-edition', label: '2008 to 2018: The 17th Edition' },
  { id: 'eighteenth-edition', label: '2018 to Present: The 18th Edition' },
  { id: 'amendment-three', label: 'Amendment 3 (2024): What Changed' },
  { id: 'amendment-four', label: 'Amendment 4 (2026): What Changed' },
  { id: 'regulatory-bodies', label: 'Key Regulatory Bodies' },
  { id: 'for-electricians', label: 'For Electricians: Staying Current' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The UK\'s electrical wiring regulations have evolved through 18 editions since the first "Rules and Regulations for the Prevention of Fire Risks" was published by the IEE in 1882.',
  'The current standard is BS 7671:2018+A4:2026 — the 18th Edition with Amendment 4, published in 2026. Key additions include Reg 421.1.7 (AFDD recommendation), Reg 411.3.4 (mandatory 30 mA RCD on domestic lighting circuits), new Chapter 57 (Stationary Secondary Batteries), and significant changes to Section 722 (EV charging).',
  'Part P of the Building Regulations (2005, England and Wales) made domestic electrical work notifiable for the first time, requiring competent person scheme registration or Building Control notification.',
  'Amendment 4 (A4:2026) also modifies Reg 133.1.3 to require that specified equipment usage is recorded on the appropriate Part 6 electrical certification — a direct change to how electricians complete EICs and EICRs.',
  'Elec-Mate keeps electricians current with the latest regulation changes through built-in AI regulation lookup that references BS 7671:2018+A4:2026 directly.',
];

const faqs = [
  {
    question: 'What is the current edition of the UK wiring regulations?',
    answer:
      'The current edition is BS 7671:2018+A4:2026, commonly known as the 18th Edition with Amendment 4. BS 7671 is published by the Institution of Engineering and Technology (IET) in conjunction with the British Standards Institution (BSI). The 18th Edition was first published in July 2018 and came into effect on 1 January 2019. Amendment 1 was published in February 2020, Amendment 2 in March 2022, Amendment 3 on 31 July 2024, and Amendment 4 in 2026. Each amendment updates and refines the regulations without requiring a completely new edition. Key additions introduced by A4:2026 include: Reg 421.1.7 recommending AFDDs on AC final circuits; Reg 411.3.4 requiring mandatory 30 mA RCD protection for domestic lighting circuits; new Chapter 57 covering Stationary Secondary Battery installations; significant changes to Section 722 (EV charging); and Reg 133.1.3 requiring specified equipment usage to be recorded on Part 6 certification. All electricians working in the UK must work to the current edition of BS 7671, and holding the C&G 2382 (18th Edition) qualification is a requirement for competent person scheme registration.',
  },
  {
    question: 'How often does BS 7671 change?',
    answer:
      'A new edition of BS 7671 is typically published every 7 to 10 years. The 16th Edition was published in 2001, the 17th Edition in 2008, and the 18th Edition in 2018. Between editions, amendments are issued to address specific changes — new technology, new safety data, harmonisation with European standards (CENELEC), and corrections. The 18th Edition has had four amendments (2020, 2022, 2024, and 2026), with the current edition being BS 7671:2018+A4:2026. When a new edition is published, there is typically a transition period of 6 to 12 months during which both the old and new editions can be used. After the transition period, all new work must comply with the new edition. Electricians are expected to update their qualifications when a new edition is published — the C&G 2382 course covers the current edition, and most competent person schemes require members to complete it within a specified period of a new edition being released.',
  },
  {
    question: 'What changed in Amendment 3 of BS 7671?',
    answer:
      'Amendment 3 (A3:2024) to BS 7671:2018 was issued on 31 July 2024. It is a relatively narrow amendment focused on Section 530 protective device selection, including requirements relating to bidirectional and unidirectional switching and protective devices. This is relevant to solar PV, battery storage, and EV charger installations where current can flow in both directions. Standard MCBs and RCBOs are designed for unidirectional current flow; using an unsuitable device on a bidirectional circuit can result in failure to operate during a fault. A3:2024 clarifies when bidirectional-rated devices are required and how to select them correctly. Amendment 4 (A4:2026) subsequently introduced further significant changes — see the A4:2026 section of this page.',
  },
  {
    question: 'When did Part P of the Building Regulations come into force?',
    answer:
      'Part P of the Building Regulations (Electrical Safety — Dwellings) came into force on 1 January 2005 in England and Wales. It was the first time that domestic electrical installation work became subject to Building Regulations control. Before Part P, there was no legal requirement to notify anyone about electrical work in a domestic property — anyone could do any electrical work without oversight. Part P introduced the concept of "notifiable work" — certain types of electrical work that must either be carried out by an electrician registered with a competent person scheme (who can then self-certify the work) or be notified to the local Building Control body before the work starts. Notifiable work includes new circuits, work in kitchens and bathrooms, consumer unit changes, outdoor electrical work, and work in special locations. Part P was revised in 2013 to simplify the notification requirements, reducing the categories of notifiable work. The core principle remains the same: significant domestic electrical work must be carried out competently and notified to Building Control.',
  },
  {
    question: 'What is the IET and what role does it play?',
    answer:
      'The IET (Institution of Engineering and Technology) is the professional body that publishes BS 7671, the UK wiring regulations. It was formed in 2006 by the merger of the IEE (Institution of Electrical Engineers, founded 1871) and the IIE (Institution of Incorporated Engineers). The IET works with BSI (British Standards Institution) to develop and publish BS 7671. It also publishes the Guidance Notes series (GN1 through GN8), the On-Site Guide, and various other technical publications that provide practical guidance on applying the regulations. The IET does not regulate electricians directly — that role falls to the competent person schemes (NICEIC, NAPIT, ELECSA) and Building Control. However, the IET sets the technical standard that all electrical work in the UK must comply with. The IET is the successor to the body that published the very first wiring regulations in 1882, making it the longest-running authority on electrical installation standards in the world.',
  },
  {
    question: 'Will there be a 19th Edition of BS 7671?',
    answer:
      'A 19th Edition of BS 7671 has not been formally announced as of mid-2026, but based on the historical pattern (new editions every 7 to 10 years, with the 18th Edition published in 2018), a 19th Edition could be expected between 2025 and 2028. The IET typically begins work on a new edition several years before publication, with technical committees reviewing all parts of the regulations. The current edition is BS 7671:2018+A4:2026. Key areas that may be addressed in a future 19th Edition include comprehensive EV charging provisions, smart grid integration, cybersecurity for connected installations, and updated cable sizing tables reflecting modern installation methods. The transition to a new edition typically includes a training period and updated qualifications — the C&G 2382 course will be updated to cover the new edition.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Comprehensive guide to BS 7671:2018+A4:2026, the current UK wiring regulations, including all four amendments.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/afdd-arc-fault-detection',
    title: 'AFDD Guide',
    description:
      'Arc Fault Detection Devices explained — what they do, when they are recommended, and how BS 7671 addresses them.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'What Part P covers, what work is notifiable, and how competent person schemes work.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current consumer unit requirements including metal enclosure rules and amendment 3 changes.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eighteenth-edition-course',
    title: '18th Edition Course',
    description:
      'Study for the C&G 2382 qualification covering BS 7671:2018+A4:2026 on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/earthing-arrangements',
    title: 'Earthing Arrangements',
    description:
      'TN-S, TN-C-S, and TT earthing systems explained with diagrams and fault path analysis.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'The Story of UK Electrical Regulations: 1882 to Today',
    content: (
      <>
        <p>
          The United Kingdom has the oldest continuously maintained set of electrical wiring
          regulations in the world. From the first "Rules and Regulations for the Prevention of Fire
          Risks Arising from Electric Lighting" published by the Society of Telegraph Engineers
          (later the IEE, now the IET) in 1882, through to the current{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>
          , the regulations have evolved continuously to address new technologies, new risks, and
          hard-won safety lessons.
        </p>
        <p>
          This timeline traces the key milestones in over 140 years of UK electrical regulation —
          from the earliest days of electric lighting to the modern challenges of EV chargers, solar
          PV, and battery storage systems.
        </p>
        <p>
          Understanding this history is not just academic. The regulations you work with today are
          shaped by events, accidents, and technological changes that span more than a century.
          Knowing why a regulation exists — not just what it says — makes you a better electrician.
        </p>
      </>
    ),
  },
  {
    id: 'early-editions',
    heading: '1882 to 1950: The Early Editions',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1882 — 1st Edition.</strong> "Rules and Regulations for the Prevention of
                Fire Risks Arising from Electric Lighting." Published by the Society of Telegraph
                Engineers (later IEE). Just 12 rules covering the basics of electric lighting
                installations — primarily addressing fire prevention in an era when electricity was
                a dangerous novelty. Edison had only opened his first power station in New York the
                same year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1888 — 2nd Edition.</strong> Expanded to cover the growing use of
                electricity beyond lighting. The UK's first public electricity supply had been
                established at Godalming, Surrey, in 1881, and demand was growing rapidly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1897 — 5th Edition.</strong> By the late 1890s, electricity was becoming
                mainstream in wealthier homes and commercial buildings. The regulations were
                evolving to address a wider range of installation types and hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1924 — 10th Edition.</strong> A significant milestone. Published after World
                War I, during a period of rapid electrification of British homes. The Electricity
                (Supply) Act 1926 would soon establish the National Grid, transforming electricity
                from a local luxury to a national utility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1950 — 13th Edition.</strong> Post-war Britain was rebuilding. The
                nationalisation of the electricity industry in 1947 (creating the British
                Electricity Authority and 14 Area Electricity Boards) brought standardisation. The
                modern 13A BS 1363 plug and socket system was introduced in 1947, replacing the
                older round-pin BS 546 system.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The early editions were remarkably concise by modern standards. The 1st Edition was just
          12 rules on a few pages. By the 13th Edition in 1950, the regulations had grown to a
          substantial document covering a wide range of installation types. But they were still
          recommendations, not legal requirements — compliance was voluntary.
        </p>
      </>
    ),
  },
  {
    id: 'post-war',
    heading: '1950 to 1980: Post-War Modernisation',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1955 — 14th Edition.</strong> Reflected the massive expansion of domestic
                electrification in the 1950s. More homes than ever had electricity, and the range of
                electrical appliances was growing rapidly — electric cookers, immersion heaters,
                television sets, and vacuum cleaners were becoming standard household items.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1966 — 14th Edition (Metric).</strong> The regulations were metricated,
                reflecting the UK's gradual transition to metric units. Cable sizes changed from
                imperial (7/.029, 3/.036) to metric (1.0mm², 1.5mm², 2.5mm²) designations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1976 — 15th Edition.</strong> A major update that introduced many concepts
                still recognisable today. The 15th Edition restructured the regulations and began
                the process of harmonisation with international standards (IEC) and European
                standards (CENELEC).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The post-war period saw electricity transform from a convenience to an absolute necessity.
          The range of domestic circuits expanded from basic lighting and one or two power circuits
          to dedicated circuits for cookers, immersion heaters, showers, and central heating
          controls. The regulations had to keep pace with this expanding scope.
        </p>
      </>
    ),
  },
  {
    id: 'modern-era',
    heading: '1981 to 2008: The Modern Era',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1981 — 15th Edition (Revised).</strong> Further harmonisation with
                international standards. The colour coding of cables remained the older system (red
                for live, black for neutral, green/yellow for earth) throughout this period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1991 — 16th Edition.</strong> First published as BS 7671 (replacing the
                previous IEE Regulations numbering). A landmark edition that introduced the formal
                BS number and aligned more closely with CENELEC harmonisation documents (HD 384
                series). The 16th Edition ran for 17 years — the longest-serving edition in modern
                history.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2001 — 16th Edition, Amendment 2.</strong> Introduced RCD protection
                requirements for socket outlets in domestic premises. This was a significant safety
                improvement — 30mA RCDs were now required for socket circuits that might reasonably
                supply portable outdoor equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2004 — New cable colours.</strong> Harmonised cable colours were introduced:
                brown for live (replacing red), blue for neutral (replacing black). Green/yellow for
                earth remained unchanged. A transition period allowed both old and new colours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2005 — Part P introduced.</strong> Part P of the Building Regulations
                (Electrical Safety — Dwellings) came into force on 1 January 2005 in England and
                Wales. For the first time, domestic electrical work was subject to Building
                Regulations control. Competent person schemes (NICEIC, NAPIT, ELECSA) became the
                standard route for compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The introduction of{' '}
          <SEOInternalLink href="/part-p-building-regulations">Part P</SEOInternalLink> in 2005 was
          the most significant regulatory change in the modern era. It transformed domestic
          electrical work from an unregulated activity to one requiring notification and
          certification. This single change drove the growth of competent person schemes and
          professionalised the domestic electrical sector.
        </p>
      </>
    ),
  },
  {
    id: 'seventeenth-edition',
    heading: '2008 to 2018: The 17th Edition',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2008 — 17th Edition published.</strong> BS 7671:2008. A major revision with
                extensive restructuring to align with CENELEC HD 60364. Significant changes included
                expanded RCD requirements, new requirements for maximum disconnection times, and
                updated cable sizing guidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2011 — Amendment 1.</strong> Introduced the requirement for metal consumer
                units in domestic premises (Regulation 421.1.201) following concerns about fire
                risks from plastic consumer units. Required all consumer units in domestic premises
                to comply with BS EN 61439-3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2013 — Part P revised.</strong> The scope of notifiable work under Part P
                was simplified. The list of notifiable work was streamlined, making it easier for
                electricians and homeowners to understand what requires notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2015 — Amendment 3.</strong> Further updates including revisions to surge
                protection requirements and clarifications on cable support in escape routes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The 17th Edition was notable for the metal consumer unit requirement, which came about
          after research showed that plastic consumer units were contributing to fire development in
          domestic premises. The amendment effectively ended the use of plastic consumer unit
          enclosures in new domestic installations — a significant change for the industry.
        </p>
      </>
    ),
  },
  {
    id: 'eighteenth-edition',
    heading: '2018 to Present: The 18th Edition',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>July 2018 — 18th Edition published.</strong> BS 7671:2018. Effective from 1
                January 2019. Key changes included: expanded surge protection requirements (Section
                534), new requirements for EV charging installations, and updated prosumer (solar
                PV) guidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>February 2020 — Amendment 1.</strong> Corrections and clarifications to the
                original 2018 text. Minor but important technical updates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>March 2022 — Amendment 2.</strong> More substantial changes including
                updates to energy efficiency requirements, electric vehicle charging provisions, and
                prosumer installations. The "brown book" (BS 7671:2018+A2:2022) incorporates all
                changes up to this point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>31 July 2024 — Amendment 3.</strong> Adds Section 530 requirements covering
                bidirectional and unidirectional switching and protective devices. Directly relevant
                to solar PV, battery storage, and EV charger installations where current flow can
                reverse. Available as a free PDF supplement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2026 — Amendment 4 (A4:2026).</strong> Significant update bringing the
                current edition to BS 7671:2018+A4:2026. See the{' '}
                <a href="#amendment-four" className="text-yellow-400 underline underline-offset-2">
                  Amendment 4 section below
                </a>{' '}
                for the full detail.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The 18th Edition brought the regulations into the modern energy landscape. The
          recommendation for AFDDs, the expanded EV charging requirements, and the solar PV and
          battery storage provisions all reflect the rapidly changing nature of domestic electrical
          installations. The traditional model of electricity flowing in one direction — from the
          grid to the consumer — is giving way to a bidirectional model where homes generate, store,
          and export energy.
        </p>
        <SEOAppBridge
          title="AI regulation lookup — always current"
          description="Elec-Mate's built-in regulation assistant references BS 7671:2018+A4:2026 directly. Ask any question about wiring regulations and get the specific…"
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'amendment-three',
    heading: 'Amendment 3 (2024): What Changed and Why It Matters',
    content: (
      <>
        <p>
          Amendment 3 (A3:2024) may seem narrow — a single new regulation about bidirectional and
          unidirectional devices — but its implications are significant for everyday installation
          work.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">
                A3:2024 — Section 530 Bidirectional Device Requirements
              </h4>
              <p className="text-white text-sm leading-relaxed">
                Where a circuit may carry current in both directions (bidirectional current flow),
                any switching or protective device on that circuit must be suitable for
                bidirectional operation. A standard unidirectional MCB or RCBO may not operate
                correctly under reverse current flow — meaning the device could fail to protect the
                circuit during a fault condition.
              </p>
            </div>
          </div>
        </div>
        <p>
          This matters because the number of installations with bidirectional current flow is
          growing rapidly. Solar PV systems, battery energy storage systems (BESS), and
          vehicle-to-grid (V2G) EV chargers all push current back towards the consumer unit and
          potentially to the grid. An electrician installing any of these systems must now verify
          that all protective devices in the current path are rated for bidirectional operation.
        </p>
        <p>
          In practice, many modern MCBs and RCBOs from established manufacturers (Hager, Schneider,
          ABB) are already rated for bidirectional use. But the regulation makes it explicit: you
          must check and confirm, not assume. The{' '}
          <SEOInternalLink href="/guides/wiring-colours-uk">data plate</SEOInternalLink> on the
          device will indicate whether it is bidirectional.
        </p>
      </>
    ),
  },
  {
    id: 'amendment-four',
    heading: 'Amendment 4 (2026): What Changed and Why It Matters',
    content: (
      <>
        <p>
          Amendment 4 (A4:2026) brings the current edition to <strong>BS 7671:2018+A4:2026</strong>.
          It is one of the most substantive amendments to the 18th Edition and affects everyday
          certification work, domestic lighting circuits, and battery storage installations. Here
          are the key changes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reg 421.1.7 — AFDD recommendation introduced.</strong> A new Regulation
                421.1.7 recommends the installation of{' '}
                <SEOInternalLink href="/guides/afdd-arc-fault-detection">
                  arc fault detection devices (AFDDs)
                </SEOInternalLink>{' '}
                on AC final circuits of a fixed installation to mitigate the risk of fire due to arc
                fault currents. The wording is advisory ("recommending"), not mandatory — but this
                is the first time AFDDs appear in their own dedicated regulation. Installers and
                certifiers should treat it as a strong recommendation, particularly for higher-risk
                premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reg 411.3.4 — 30 mA RCD mandatory on domestic lighting circuits.</strong>{' '}
                This is one of the most compliance-critical changes in A4:2026. Within domestic
                (household) premises, additional protection by an RCD with a rated residual
                operating current not exceeding <strong>30 mA</strong> shall now be provided for all
                AC final circuits supplying luminaires. The word "shall" makes this mandatory. Every
                electrician completing a new domestic installation or consumer unit change must
                ensure lighting circuits are RCD-protected to ≤30 mA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New Chapter 57 — Stationary Secondary Battery Installations.</strong> A new
                Chapter 57 has been introduced to cover installations where the designed purpose of
                the battery system is storage and supply of electrical energy. This provides
                dedicated requirements for home battery storage and BESS installations — previously
                only covered by general provisions. Chapter 57 does not apply to batteries within
                products covered by product safety standards, nor to pluggable UPS units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Reg 133.1.3 — Equipment usage must be recorded on Part 6 certification.
                </strong>{' '}
                Regulation 133.1.3 has been modified to require that certain usage of equipment
                shall be recorded on the appropriate electrical certification specified in Part 6
                (EIC, EICR, Minor Works). Where BS 7671 calls for the usage of particular equipment
                to be identified — for example, AFDD installation under Reg 421.1.7 — that entry
                must appear explicitly on the certificate. This embeds equipment-selection
                disclosures into the formal certification record.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 722 — Significant changes to EV charging requirements.</strong>{' '}
                Section 722 (electric vehicle charging installations) contains significant
                regulatory changes in A4:2026. Installers working on EV charging should consult
                Section 722 directly in the updated BS 7671:2018+A4:2026 text for the revised
                requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The mandatory 30 mA RCD requirement for domestic lighting (Reg 411.3.4) is the change most
          immediately affecting everyday installation work. Previously, lighting circuits were
          commonly left without individual RCD protection in some legacy consumer unit arrangements.
          A4:2026 removes that ambiguity: all new domestic lighting circuits require ≤30 mA RCD
          additional protection.
        </p>
      </>
    ),
  },
  {
    id: 'regulatory-bodies',
    heading: 'Key Regulatory Bodies and Organisations',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET (Institution of Engineering and Technology).</strong> Publishes BS 7671
                and the associated Guidance Notes. Successor to the IEE. The technical authority
                behind the wiring regulations since 1882.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BSI (British Standards Institution).</strong> Co-publishes BS 7671 with the
                IET. BSI manages the formal British Standard number and ensures the standard meets
                international and European harmonisation requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC, NAPIT, ELECSA.</strong> Government-authorised{' '}
                <SEOInternalLink href="/guides/how-to-find-electrician-uk">
                  competent person schemes
                </SEOInternalLink>
                . They assess, register, and monitor electricians. They enable self-certification
                under Part P of the Building Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Safety First.</strong> An independent charity dedicated to
                reducing deaths, injuries, and fires caused by electricity. Publishes safety
                guidance for both consumers and professionals. Campaigns for regulatory
                improvements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HSE (Health and Safety Executive).</strong> Enforces the Electricity at Work
                Regulations 1989 and the Health and Safety at Work Act 1974. Primarily focused on
                workplace electrical safety but also investigates serious domestic electrical
                incidents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CENELEC.</strong> The European Committee for Electrotechnical
                Standardisation. Produces harmonisation documents (HD 60364 series) that BS 7671
                aligns with. Post-Brexit, the UK continues to participate in CENELEC standards
                development.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Staying Current with Regulation Changes',
    content: (
      <>
        <p>
          Keeping up with regulation changes is a professional obligation — but it is also a
          competitive advantage. An electrician who knows the current regulations inside out can
          advise customers confidently, classify defects accurately, and avoid costly mistakes.
          Elec-Mate helps you stay current:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Regulation Lookup</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ask any question about BS 7671 and get the specific regulation number, section,
                  and plain-English explanation. The AI references{' '}
                  <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                    BS 7671:2018+A4:2026
                  </SEOInternalLink>{' '}
                  directly — including all four amendments. No flipping through the brown book on
                  site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">18th Edition Study Centre</h4>
                <p className="text-white text-sm leading-relaxed">
                  Preparing for C&G 2382 or just refreshing your knowledge? The Elec-Mate study
                  centre covers every section of BS 7671 with structured lessons, practice
                  questions, and exam preparation materials.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="14th Edition Electrical Regulations: 2008 Replaced"
          description="14th Edition ended in 2008. Track every UK wiring regulations update from 1st to current BS 7671:2018+A4:2026. Compliance timeline for electricians."
          icon={Clock}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalRegulationsTimelinePage() {
  return (
    <GuideTemplate
      title="UK Wiring Regulations by Edition: 14th to 18th + A4:2026"
      description="UK Wiring Regulations editions explained: 14th (1966), 15th (1981), 16th (1991), 17th (2008), 18th (2018) + A1/A2/A3/A4:2026. Year + key changes per edition."
      datePublished="2026-01-25"
      dateModified="2026-05-23"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations"
      badgeIcon={Clock}
      heroTitle={
        <>
          UK Electrical Regulations Timeline:{' '}
          <span className="text-yellow-400">140 Years of Wiring Standards</span>
        </>
      }
      heroSubtitle="From 12 rules about fire prevention in 1882 to the 700+ pages of BS 7671:2018+A4:2026, the UK's electrical wiring regulations have evolved through 18 editions. This timeline traces every key milestone, amendment, and regulatory change."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About UK Electrical Regulations"
      relatedPages={relatedPages}
      ctaHeading="Stay Current with Every Regulation Change"
      ctaSubheading="AI regulation lookup, structured 18th Edition courses, and automated BS 7671 references. Elec-Mate keeps you up to date. 7-day free trial, cancel anytime."
    />
  );
}
