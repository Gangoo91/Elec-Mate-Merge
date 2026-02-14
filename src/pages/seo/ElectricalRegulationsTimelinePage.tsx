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
  { id: 'regulatory-bodies', label: 'Key Regulatory Bodies' },
  { id: 'upcoming-changes', label: 'Upcoming Changes: Amendment 4 and Beyond' },
  { id: 'for-electricians', label: 'For Electricians: Staying Current' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The UK\'s electrical wiring regulations have evolved through 18 editions since the first "Rules and Regulations for the Prevention of Fire Risks" was published by the IEE in 1882.',
  'The current standard is BS 7671:2018+A3:2024 — the 18th Edition with Amendment 3, issued on 31 July 2024, which adds Regulation 530.3.201 covering bidirectional and unidirectional devices.',
  'Part P of the Building Regulations (2005, England and Wales) made domestic electrical work notifiable for the first time, requiring competent person scheme registration or Building Control notification.',
  'Amendment 4 to BS 7671 is expected in 2026, with potential changes to AFDD requirements, EV charging provisions, and energy storage systems.',
  'Elec-Mate keeps electricians current with the latest regulation changes through built-in AI regulation lookup that references BS 7671:2018+A3:2024 directly.',
];

const faqs = [
  {
    question: 'What is the current edition of the UK wiring regulations?',
    answer:
      'The current edition is BS 7671:2018+A3:2024, commonly known as the 18th Edition with Amendment 3. BS 7671 is published by the Institution of Engineering and Technology (IET) in conjunction with the British Standards Institution (BSI). The 18th Edition was first published in July 2018 and came into effect on 1 January 2019. Amendment 1 was published in February 2020, Amendment 2 in March 2022, and Amendment 3 on 31 July 2024. Each amendment updates and refines the regulations without requiring a completely new edition. The physical book (the "brown book") covers BS 7671:2018+A2:2022. Amendment 3 is a separate free PDF supplement that adds Regulation 530.3.201 regarding bidirectional and unidirectional devices. All electricians working in the UK must work to the current edition of BS 7671, and holding the C&G 2382 (18th Edition) qualification is a requirement for competent person scheme registration.',
  },
  {
    question: 'How often does BS 7671 change?',
    answer:
      'A new edition of BS 7671 is typically published every 7 to 10 years. The 16th Edition was published in 2001, the 17th Edition in 2008, and the 18th Edition in 2018. Between editions, amendments are issued to address specific changes — new technology, new safety data, harmonisation with European standards (CENELEC), and corrections. The 18th Edition has had three amendments so far (2020, 2022, and 2024), with a fourth expected in 2026. When a new edition is published, there is typically a transition period of 6 to 12 months during which both the old and new editions can be used. After the transition period, all new work must comply with the new edition. Electricians are expected to update their qualifications when a new edition is published — the C&G 2382 course covers the current edition, and most competent person schemes require members to complete it within a specified period of a new edition being released.',
  },
  {
    question: 'What changed in Amendment 3 of BS 7671?',
    answer:
      'Amendment 3 (A3:2024) to BS 7671:2018 was issued on 31 July 2024. It is a relatively narrow amendment compared to A1 and A2. The key addition is Regulation 530.3.201, which introduces requirements for the selection and use of bidirectional and unidirectional switching and protective devices. This is directly relevant to the growing prevalence of solar PV, battery storage, and EV charger installations where current can flow in both directions (from the grid to the installation and from the installation back to the grid). Standard MCBs and RCBOs are designed for unidirectional current flow. Using a unidirectional device on a bidirectional circuit can result in the device failing to operate correctly during a fault — a serious safety risk. A3:2024 clarifies when bidirectional devices are required and how to select them correctly. The amendment is available as a free PDF supplement from the IET and BSI. It does not require a new physical book — it supplements the existing BS 7671:2018+A2:2022 brown book.',
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
      'A 19th Edition of BS 7671 has not been formally announced as of early 2026, but based on the historical pattern (new editions every 7 to 10 years, with the 18th Edition published in 2018), a 19th Edition could be expected between 2025 and 2028. The IET typically begins work on a new edition several years before publication, with technical committees reviewing all parts of the regulations. In the meantime, Amendment 4 to the 18th Edition is expected in 2026. Key areas likely to be addressed in either Amendment 4 or a future 19th Edition include expanded AFDD (Arc Fault Detection Device) requirements, comprehensive provisions for EV charging installations (reflecting the rapid growth of home and commercial charging), battery energy storage systems (BESS), smart grid integration, bidirectional power flow requirements (building on A3:2024), and updated cable sizing tables reflecting modern installation methods. The transition to a new edition typically includes a training period and updated qualifications — the C&G 2382 course will be updated to cover the new edition.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Comprehensive guide to BS 7671:2018+A3:2024, the current UK wiring regulations, including all three amendments.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/afdd-guide-bs7671',
    title: 'AFDD Guide',
    description:
      'Arc Fault Detection Devices explained — what they do, when they are recommended, and how BS 7671 addresses them.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations-explained',
    title: 'Part P Building Regulations',
    description:
      'What Part P covers, what work is notifiable, and how competent person schemes work.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations-uk',
    title: 'Consumer Unit Regulations',
    description:
      'Current consumer unit requirements including metal enclosure rules and amendment 3 changes.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study for the C&G 2382 qualification covering BS 7671:2018+A3:2024 on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/earthing-arrangements-explained',
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
            BS 7671:2018+A3:2024
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
          <SEOInternalLink href="/guides/part-p-building-regulations-explained">
            Part P
          </SEOInternalLink>{' '}
          in 2005 was the most significant regulatory change in the modern era. It transformed
          domestic electrical work from an unregulated activity to one requiring notification and
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
                January 2019. Key changes included: recommendation for{' '}
                <SEOInternalLink href="/guides/afdd-guide-bs7671">AFDDs</SEOInternalLink>{' '}
                (Regulation 421.1.7), expanded surge protection requirements (Section 534), new
                requirements for EV charging installations, and updated prosumer (solar PV)
                guidance.
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
                <strong>31 July 2024 — Amendment 3.</strong> Adds Regulation 530.3.201 covering
                bidirectional and unidirectional switching and protective devices. Directly relevant
                to solar PV, battery storage, and EV charger installations where current flow can
                reverse. Available as a free PDF supplement.
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
          description="Elec-Mate's built-in regulation assistant references BS 7671:2018+A3:2024 directly. Ask any question about wiring regulations and get the specific regulation number, section, and guidance. No flipping through the brown book."
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
              <h4 className="font-bold text-white mb-2">Regulation 530.3.201</h4>
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
    id: 'upcoming-changes',
    heading: 'Upcoming Changes: Amendment 4 and Beyond',
    content: (
      <>
        <p>
          The electrical industry does not stand still, and neither do the regulations. Here is what
          is expected in the near future:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Amendment 4 (expected 2026).</strong> Details have not been formally
                published, but industry discussion suggests potential changes in several areas:
                expanded AFDD requirements (possibly moving from recommendation to requirement for
                certain installation types), updated EV charging provisions, battery energy storage
                system requirements, and refinements to the bidirectional device guidance introduced
                by A3:2024.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy efficiency and smart grids.</strong> As the UK moves towards net
                zero, the regulations will increasingly address energy management, demand-side
                response, and smart grid integration. Installations that can communicate with the
                grid, adjust consumption, and export stored energy will need new regulatory
                frameworks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cybersecurity for connected installations.</strong> As more electrical
                installations include internet-connected devices (smart meters, EV chargers, battery
                storage controllers, heat pump systems), the cybersecurity of these systems becomes
                a safety consideration. The IET has published guidance on this, and future editions
                of BS 7671 may include requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The pace of change in the electrical industry is accelerating. The transition to electric
          vehicles, heat pumps, solar PV, and battery storage is transforming domestic installations
          from simple one-way power distribution systems to complex, bidirectional energy management
          systems. The regulations must evolve to address these changes — and electricians must keep
          their knowledge current.
        </p>
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
                    BS 7671:2018+A3:2024
                  </SEOInternalLink>{' '}
                  directly — including all three amendments. No flipping through the brown book on
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
          title="Never second-guess a regulation again"
          description="AI-powered BS 7671 lookup, structured 18th Edition courses, and automated defect classification. Elec-Mate keeps you current with every regulation change. 7-day free trial."
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
      title="UK Electrical Regulations Timeline | Key Dates & Changes"
      description="Complete timeline of UK electrical wiring regulations from the 1st Edition in 1882 to BS 7671:2018+A3:2024. Key milestones, regulatory bodies, Part P, Amendment 3, and upcoming changes."
      datePublished="2026-01-25"
      dateModified="2026-02-13"
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
      heroSubtitle="From 12 rules about fire prevention in 1882 to the 700+ pages of BS 7671:2018+A3:2024, the UK's electrical wiring regulations have evolved through 18 editions. This timeline traces every key milestone, amendment, and regulatory change."
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
