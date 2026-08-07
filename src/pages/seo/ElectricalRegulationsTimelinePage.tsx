import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Clock, BookOpen, ShieldCheck, Zap, GraduationCap, Scale } from 'lucide-react';

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
  'The UK\'s electrical wiring regulations have evolved through 18 editions since the first "Rules and Regulations for the Prevention of Fire Risks Arising from Electric Lighting" was published by the Society of Telegraph Engineers (later the IEE, now the IET) in 1882.',
  'The current standard is BS 7671:2018+A4:2026 — the 18th Edition with Amendment 4, issued on 15 April 2026. Amendment 4 introduces new Chapter 57 (stationary secondary batteries), new Section 716 (Power over Ethernet), new Section 545 (functional earthing and bonding for ICT equipment) and new Chapter 81 (energy efficiency).',
  'Part P of the Building Regulations (2005, England and Wales) made domestic electrical work notifiable for the first time, requiring competent person scheme registration or Building Control notification.',
  'Two rules often mis-dated to Amendment 4 actually arrived with the 18th Edition itself in 2018: Reg 411.3.4 (30 mA RCD additional protection for domestic lighting circuits) and Reg 133.1.3 (certain equipment usage recorded on the Part 6 certification). Reg 421.1.7 was redrafted by A2:2022 to make AFDDs mandatory in four named premises types.',
  'Elec-Mate keeps electricians current with the latest regulation changes through built-in AI regulation lookup that references BS 7671:2018+A4:2026 directly.',
];

const faqs = [
  {
    question: 'What is the current edition of the UK wiring regulations?',
    answer:
      'The current edition is BS 7671:2018+A4:2026, commonly known as the 18th Edition with Amendment 4. BS 7671 is published by the Institution of Engineering and Technology (IET) in conjunction with the British Standards Institution (BSI). The 18th Edition was first published in July 2018 and came into effect on 1 January 2019. Amendment 1 was issued in February 2020, Amendment 2 on 28 March 2022, Amendment 3 on 31 July 2024, and Amendment 4 on 15 April 2026. BS 7671:2018+A2:2022+Corrigendum (May 2023)+A3:2024 remained current alongside A4 but is withdrawn on 15 October 2026. Each amendment updates and refines the regulations without requiring a completely new edition. Key changes introduced by A4:2026 include: new Chapter 57 covering stationary secondary battery installations; new Section 716 (Power over Ethernet); new Section 545 (functional earthing and functional equipotential bonding for ICT equipment); new Chapter 81 on energy efficiency, replacing the deleted Appendix 17; a redrafted Reg 537.4.2 on firefighter\'s switches; and revised Appendix 4 reference methods that now separate buried cables in direct contact with soil from cables in a conduit or duct. All electricians working in the UK must work to the current edition of BS 7671, and the C&G 2382 (18th Edition) qualification is the usual route competent person schemes expect for demonstrating current regulations knowledge.',
  },
  {
    question: 'How often does BS 7671 change?',
    answer:
      'A new edition of BS 7671 is typically published every 10 years or so, though the gaps have varied. The 15th Edition was issued in 1981, the 16th Edition in 1991 (retitled BS 7671:1992 the following year), the 17th Edition in January 2008, and the 18th Edition in July 2018. Between editions, amendments are issued to address specific changes — new technology, new safety data, harmonisation with European standards (CENELEC), and corrections. The 18th Edition has had four amendments (2020, 2022, 2024, and 2026), with the current edition being BS 7671:2018+A4:2026. When a new edition is published, there is typically a transition period of 6 to 12 months during which both the old and new editions can be used. After the transition period, all new work must comply with the new edition. Electricians are expected to update their qualifications when a new edition is published — the C&G 2382 course covers the current edition, and most competent person schemes require members to complete it within a specified period of a new edition being released.',
  },
  {
    question: 'What changed in Amendment 3 of BS 7671?',
    answer:
      'Amendment 3 (A3:2024) to BS 7671:2018 was issued on 31 July 2024. It is a deliberately narrow amendment: it adds two new definitions ("bidirectional protective device" and "unidirectional protective device") and one new regulation, Reg 530.3.201, which requires the selection and erection of equipment for protection to take account of the appropriate use of either a unidirectional or a bidirectional protective device. This is relevant to solar PV, battery storage, and EV charger installations where current can flow in both directions. Standard MCBs and RCBOs are designed for unidirectional current flow; using an unsuitable device on a bidirectional circuit can result in failure to operate during a fault. A note to Reg 530.3.201 points out that the product standards for RCCBs, RCBOs, circuit-breakers and AFDDs require those devices to be marked to show whether they are unidirectional — for example "in" and "out", "line" and "load", or arrows. Amendment 4 (A4:2026) subsequently introduced further significant changes — see the A4:2026 section of this page.',
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
      'A 19th Edition of BS 7671 has not been formally announced as of mid-2026. Amendment 4 was only issued on 15 April 2026, so the 18th Edition remains the current edition. Based on the historical pattern — roughly a decade between editions, with the 18th published in 2018 — a 19th Edition would most likely land towards the end of this decade. The IET typically begins work on a new edition several years before publication, with technical committees reviewing all parts of the regulations. The current edition is BS 7671:2018+A4:2026. Key areas that may be addressed in a future 19th Edition include comprehensive EV charging provisions, smart grid integration, cybersecurity for connected installations, and updated cable sizing tables reflecting modern installation methods. The transition to a new edition typically includes a training period and updated qualifications — the C&G 2382 course will be updated to cover the new edition.',
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
              <span>
                <strong>1882 — 1st Edition.</strong> "Rules and Regulations for the Prevention of
                Fire Risks Arising from Electric Lighting." Published by the Society of Telegraph
                Engineers (later IEE). A short set of rules covering the basics of electric lighting
                installations — primarily addressing fire prevention in an era when electricity was
                a dangerous novelty. Edison had only opened his first power station in New York the
                same year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>1888 — 2nd Edition.</strong> Expanded to cover the growing use of
                electricity beyond lighting. The UK's first public electricity supply had been
                established at Godalming, Surrey, in 1881, and demand was growing rapidly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>1897 — 3rd Edition.</strong> Retitled "General Rules recommended for Wiring
                for the Supply of Electrical Energy." By the late 1890s, electricity was becoming
                mainstream in wealthier homes and commercial buildings. The regulations were
                evolving to address a wider range of installation types and hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>1907 — 5th Edition.</strong> Retitled "Wiring Rules." The 4th Edition had
                been issued in 1903, the 6th followed in 1911 and the 7th in 1916 — the rules were
                being revised every few years as electric lighting spread.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>1924 — 8th Edition.</strong> A significant milestone, retitled "Regulations
                for the Electrical Equipment of Buildings." Published after World War I, during a
                period of rapid electrification of British homes. The Electricity (Supply) Act 1926
                would soon establish the National Grid, transforming electricity from a local luxury
                to a national utility. The 9th Edition followed in 1927, the 10th in 1934 and the
                11th in 1939.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>1950 — 12th Edition.</strong> Post-war Britain was rebuilding. The
                nationalisation of the electricity industry in 1947 (creating the British
                Electricity Authority and 14 Area Electricity Boards) brought standardisation. The
                modern 13A BS 1363 plug and socket system was introduced in 1947, replacing the
                older round-pin BS 546 system.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The early editions were remarkably concise by modern standards — the 1st Edition ran to
          only a few pages of rules. By the 12th Edition in 1950, the regulations had grown to a
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
              <span>
                <strong>1955 — 13th Edition.</strong> Reflected the massive expansion of domestic
                electrification in the 1950s. More homes than ever had electricity, and the range of
                electrical appliances was growing rapidly — electric cookers, immersion heaters,
                television sets, and vacuum cleaners were becoming standard household items. It was
                reprinted four times, in 1958, 1961, 1962 and 1964.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>1966 — 14th Edition.</strong> The edition that carried the industry through
                to 1981. Metrication came a few years later: a supplement on use in metric terms was
                issued in 1969, and the 14th Edition was reprinted in metric units in 1970. Cable
                sizes moved from imperial (7/.029, 3/.036) to metric (1.0mm², 1.5mm², 2.5mm²)
                designations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>1974 and 1976 — amendments to the 14th Edition.</strong> Rather than a new
                edition, the 14th was kept current by amendments issued in 1970, 1974 and 1976, each
                followed by a reprint incorporating them.
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
              <span>
                <strong>1981 — 15th Edition.</strong> Issued in 1981 under the new title
                "Regulations for Electrical Installations" (the red cover), and a major restructuring
                that began the process of harmonisation with international (IEC) and European
                (CENELEC) standards. It was kept current by amendments in 1983, 1984, 1985, 1986 and
                1987. The colour coding of cables remained the older system (red for live, black for
                neutral, green/yellow for earth) throughout this period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>1991/1992 — 16th Edition, and the birth of BS 7671.</strong> The 16th
                Edition was issued in 1991. In 1992 it was retitled and reprinted as "Requirements
                for Electrical Installations BS 7671:1992" — the first time the wiring regulations
                carried a British Standard number, and the point at which they aligned more closely
                with CENELEC harmonisation documents. The 16th Edition ran for 17 years — the
                longest-serving edition in modern history. Amendments followed in December 1994,
                December 1997 and April 2000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>June 2001 — BS 7671:2001 issued.</strong> The 16th Edition was reissued as
                BS 7671:2001 (the blue cover), consolidating the amendments made to the 1992 text.
                Two further amendments followed: Amendment 1 in February 2002 and Amendment 2 in
                March 2004.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>2004 — New cable colours.</strong> Amendment 2 to BS 7671:2001, issued in
                March 2004, brought in harmonised cable colours: brown for live (replacing red),
                blue for neutral (replacing black). Green/yellow for earth remained unchanged. A
                transition period allowed both old and new colours.
              </span>
            </li>
            <li className="flex items-start gap-3">
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
              <span>
                <strong>January 2008 — 17th Edition published.</strong> BS 7671:2008 (the red
                cover). A major revision with
                extensive restructuring to align with CENELEC HD 60364. Significant changes included
                expanded RCD requirements, new requirements for maximum disconnection times, and
                updated cable sizing guidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>2011 — Amendment 1.</strong> Introduced the requirement for metal consumer
                units in domestic premises (Regulation 421.1.201) following concerns about fire
                risks from plastic consumer units. Required all consumer units in domestic premises
                to comply with BS EN 61439-3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>August 2013 — Amendment 2, and Part P revised.</strong> Amendment 2 to
                BS 7671:2008 was issued in August 2013. Separately, the scope of notifiable work
                under Part P was simplified the same year — the list of notifiable work was
                streamlined, making it easier for electricians and homeowners to understand what
                requires notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>2015 — Amendment 3.</strong> The 17th Edition was reprinted incorporating
                Amendments 2 and 3 in 2015 (the yellow cover). Changes in this period included
                requirements for cable support so that wiring systems are not liable to premature
                collapse in a fire — a requirement that the 18th Edition later widened, via
                Regulation 521.10.202, to apply throughout the installation rather than only in
                escape routes.
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
              <span>
                <strong>July 2018 — 18th Edition published.</strong> BS 7671:2018 (the blue cover),
                issued 1 July 2018 and effective from 1 January 2019. Key changes included: a
                completely revised Section 534 on devices for protection against overvoltage;
                significant changes to Section 722 (EV charging), centred on Regulation 722.411.4.1
                and the use of a PME supply; an entirely new Chapter 46 on isolation and switching;
                a completely restructured Part 6 (Chapters 61, 62 and 63 replaced by new Chapters 64
                and 65); a new Regulation 411.3.4 requiring 30 mA RCD additional protection for AC
                final circuits supplying luminaires in domestic premises; and a new Regulation
                421.1.7 recommending AFDDs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>February 2020 — Amendment 1.</strong> An electronic amendment dedicated to
                Section 722, electric vehicle charging installations, aligning it with
                HD 60364-7-722:2018 and adding indent (iv) to Regulation 722.411.4.1. Installations
                within the scope of Section 722 begun after 31 July 2020 had to comply with it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>28 March 2022 — Amendment 2.</strong> A substantial amendment. Regulation
                421.1.7 was redrafted so that AFDDs became a <em>requirement</em>, not just a
                recommendation, for final circuits supplying socket-outlets rated up to 32 A in
                higher risk residential buildings, houses in multiple occupation, purpose-built
                student accommodation and care homes. It also introduced an entirely new Chapter 82
                (prosumer's low-voltage electrical installations), extensively revised Section 712
                (solar PV), added Appendix 11 (warning and user instruction labels), and deleted
                Table 3A so that RCD verification is a single AC test at the rated residual
                operating current. The "brown book" (BS 7671:2018+A2:2022) incorporates all changes
                up to this point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>31 July 2024 — Amendment 3.</strong> An electronic amendment adding two
                definitions and one regulation — Reg 530.3.201 — covering bidirectional and
                unidirectional protective devices. Directly relevant to solar PV, battery storage,
                and EV charger installations where current flow can reverse.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>15 April 2026 — Amendment 4 (A4:2026).</strong> The orange cover, and a
                substantial update bringing the current edition to BS 7671:2018+A4:2026. It may be
                implemented immediately; the previous text
                (BS 7671:2018+A2:2022+Corrigendum (May 2023)+A3:2024) is withdrawn on 15 October
                2026. See the{' '}
                <a href="#amendment-four" className="text-yellow-400 underline underline-offset-2">
                  Amendment 4 section below
                </a>{' '}
                for the full detail.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The 18th Edition brought the regulations into the modern energy landscape. AFDDs — first
          recommended in 2018, then required in four named premises types from A2:2022 — the
          expanded EV charging requirements, and the solar PV and battery storage provisions all
          reflect the rapidly changing nature of domestic electrical
          installations. The traditional model of electricity flowing in one direction — from the
          grid to the consumer — is giving way to a bidirectional model where homes generate, store,
          and export energy.
        </p>
        <SEOAppBridge
          title="UK Wiring Regulations Timeline: BS 7671 Editions"
          description="A timeline of UK wiring regulations: every edition and amendment of BS 7671 (the IET Wiring Regs) and what changed, up to A4:2026."
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
          Amendment 3 (A3:2024) is narrow by design — two new definitions and a single new
          regulation about bidirectional and unidirectional devices — but its implications are
          significant for everyday installation work.
        </p>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-6 my-4">
          <div className="flex items-start gap-4">
            <div>
              <h4 className="font-bold text-white mb-2">
                A3:2024 — Regulation 530.3.201, Bidirectional Device Requirements
              </h4>
              <p className="text-white text-sm leading-relaxed">
                Regulation 530.3.201 requires that the selection and erection of equipment for
                protection takes account of the appropriate use of either a unidirectional
                protective device or a bidirectional protective device. BS 7671 defines a
                bidirectional protective device as one where the manufacturer intends a source of
                supply to be connected to either or both sets of connection terminals; a
                unidirectional device is one where the source may only be connected to one defined
                set of terminals. Fit a unidirectional device where the current can reverse and it
                may not operate correctly during a fault.
              </p>
            </div>
          </div>
        </div>
        <p>
          This matters because the number of installations with bidirectional current flow is
          growing rapidly. Solar PV systems, battery energy storage systems (BESS), and
          vehicle-to-grid (V2G) EV chargers all push current back towards the consumer unit and
          potentially to the grid. An electrician installing any of these systems must now verify
          that all protective devices in the current path are suitable for bidirectional operation.
        </p>
        <p>
          The regulation makes it explicit: you must check and confirm, not assume. A note to
          Reg 530.3.201 points out that the product standards for RCCBs, RCBOs, circuit-breakers and
          AFDDs require those devices to be marked to indicate whether they are unidirectional — for
          example "in" and "out", "line" and "load", or arrows. Check the{' '}
          <SEOInternalLink href="/guides/cable-colour-codes-uk">device markings</SEOInternalLink>{' '}
          before you fit it.
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
          Amendment 4 (A4:2026) was issued on 15 April 2026 and brings the current edition to{' '}
          <strong>BS 7671:2018+A4:2026</strong>. It may be implemented immediately; the previous
          text remains current but is withdrawn on 15 October 2026. It is one of the most
          substantive amendments to the 18th Edition, adding four new blocks of requirements. Here
          are the key changes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>New Chapter 57 — Stationary Secondary Battery Installations.</strong> A new
                Chapter 57 has been introduced to cover installations where the designed purpose of
                the battery system is storage and supply of electrical energy. This provides
                dedicated requirements for home battery storage and BESS installations — the
                requirements previously sat in Regulation 551.8. Chapter 57 does not apply to
                batteries incorporated into products covered by product safety standards, nor to
                batteries within systems such as pluggable UPS units, fire and emergency lighting
                systems, or central safety power supply systems conforming to the appropriate
                standards. Regulation 551.7.2.1 now also requires stationary batteries to be treated
                as a generating set rather than a load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>New Section 716 — Power over Ethernet.</strong> A new Section 716 covers the
                distribution of ELV DC power over balanced information technology cabling to
                BS EN 50173-1, using power sourcing equipment to BS EN IEC 62368-3. It sets
                requirements for design, erection and verification of telecommunications
                infrastructure used for both data and ELV DC power feeding, including the use of
                existing infrastructure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>New Section 545 — functional earthing and bonding for ICT equipment.</strong>{' '}
                A new Section 545 gives additional requirements for functional earthing and
                functional equipotential bonding for information and communication technology
                equipment and systems, covering minimum cross-sectional area, identification,
                electrical continuity of functional bonding conductors, combined protective and
                functional bonding conductors, the main functional earthing terminal, and
                equipotential bonding ring conductors. Table 51 has been revised to add the
                identification of these combined and functional conductors — with a new note that
                neither the designation FE nor green-and-yellow should identify a functional bonding
                conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>New Chapter 81 — energy efficiency, and Appendix 17 deleted.</strong> A new
                Chapter 81 on energy efficiency has been introduced, referring the reader to the
                Building Regulations for England and Wales, Scotland and Northern Ireland, and to
                BS HD 60364-8-1:2019. The old informative Appendix 17 has been deleted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Certification and condition reports — Chapter 65 and Appendix 6.</strong>{' '}
                Regulation 653.1 now requires the notes for the person producing the report (given
                in Appendix 6) to be taken into account on the Condition Report, and Regulation
                653.2 requires the report to include guidance for the recipient based on the model
                in Appendix 6, with a note confirming that photographic and thermographic images can
                be appended. In Appendix 6 the notes have been redrafted, signatures are confirmed
                as those of the person(s) doing the inspection and testing and authorising the
                report for issue, and code <strong>FI no longer has to be marked as
                unsatisfactory</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Other changes worth knowing.</strong> Regulation 421.1.7(a) has been
                reworded to read "high rise residential buildings". Regulation 312.2.1.1 now
                includes a protective neutral bonding (PNB) figure and requirements. Regulation
                537.4.2 has been redrafted so firefighter's switches are required in locations
                specified by the fire engineer to support the building's fire strategy (537.4.2.1 is
                deleted). Regulation 422.2 now allows cables meeting 422.2.1 in a protected
                corridor, and treats cables in a fire-resisting enclosure as outside the protected
                escape route. Appendix 4 reference methods for buried cables have been split so that
                distinct methods apply depending on whether the cable is in direct contact with soil
                or enclosed in a conduit or duct — always read the current-carrying capacity from
                the column for the method you have actually used.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Two rules commonly attributed to A4:2026 are older than that, and it matters when you are
          citing them. The mandatory 30 mA RCD additional protection for AC final circuits supplying
          luminaires in domestic premises is <strong>Regulation 411.3.4</strong>, introduced by the
          18th Edition itself in 2018 — not by Amendment 4. And{' '}
          <SEOInternalLink href="/guides/afdd-arc-fault-detection">AFDDs</SEOInternalLink> under{' '}
          <strong>Regulation 421.1.7</strong> stopped being merely a recommendation at A2:2022: they
          are required for single-phase AC final circuits supplying socket-outlets rated up to 32 A
          in high rise residential buildings, houses in multiple occupation, purpose-built student
          accommodation and care homes, and recommended for those circuits in all other premises.
          A4:2026 only reworded indent (a).
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
              <span>
                <strong>IET (Institution of Engineering and Technology).</strong> Publishes BS 7671
                and the associated Guidance Notes. Successor to the IEE. The technical authority
                behind the wiring regulations since 1882.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>BSI (British Standards Institution).</strong> Co-publishes BS 7671 with the
                IET. BSI manages the formal British Standard number and ensures the standard meets
                international and European harmonisation requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
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
              <span>
                <strong>Electrical Safety First.</strong> An independent charity dedicated to
                reducing deaths, injuries, and fires caused by electricity. Publishes safety
                guidance for both consumers and professionals. Campaigns for regulatory
                improvements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>HSE (Health and Safety Executive).</strong> Enforces the Electricity at Work
                Regulations 1989 and the Health and Safety at Work Act 1974. Primarily focused on
                workplace electrical safety but also investigates serious domestic electrical
                incidents.
              </span>
            </li>
            <li className="flex items-start gap-3">
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
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <div className="flex items-start gap-4">
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
          title="14th Edition Electrical Regulations: Replaced in 1981"
          description="The 14th Edition ran from 1966 until the 15th Edition in 1981. Track every UK wiring regulations update from the 1st Edition to the current BS 7671:2018+A4:2026."
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
      title="UK Wiring Regulations: BS 7671:2018+A4:2026"
      description="Current UK wiring regulations: BS 7671:2018+A4:2026, issued 15 April 2026. A4 adds Chapter 57 batteries, Section 716 PoE and Chapter 81. Every edition since 1882."
      datePublished="2026-01-25"
      dateModified="2026-08-06"
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
      heroSubtitle="From a handful of fire-prevention rules in 1882 to BS 7671:2018+A4:2026, the UK's electrical wiring regulations have evolved through 18 editions. This timeline traces every key milestone, amendment, and regulatory change."
      readingTime={15}
      answerBox={{
        question: 'How have the UK wiring regulations changed over time?',
        answer:
          'The UK wiring rules have run through 18 editions since the first were published in 1882 by the Society of Telegraph Engineers, later the IEE and now the IET. They gained a British Standard number in 1992, when the 16th Edition was reprinted as BS 7671:1992. The current edition is the 18th (BS 7671:2018), kept up to date by amendments — the latest in force being Amendment 4 (BS 7671:2018+A4:2026, issued 15 April 2026). Always check the dated edition on the cover, as older editions reference regulations that have since changed.',
      }}
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
