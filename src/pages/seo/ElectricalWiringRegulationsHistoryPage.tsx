import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  Zap,
  ShieldCheck,
  Calculator,
  ClipboardCheck,
  Brain,
  FileCheck2,
  GraduationCap,
  History,
  Landmark,
  Scale,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'History', href: '/guides/electrical-wiring-regulations-history' },
];

const answerBox = {
  question: 'What is the history of the UK wiring regulations?',
  answer:
    'The UK wiring regulations began in 1882 as fire-prevention rules from the Society of Telegraph Engineers, later the IEE. They became a British Standard — BS 7671 — with the 16th Edition in 1992 and are now published by the IET. The current standard is BS 7671:2018+A4:2026, the 18th Edition with four amendments, issued 15 April 2026.',
  detail:
    'There have been 18 editions over more than 140 years, evolving from basic fire prevention to a comprehensive safety standard covering RCD protection, AFDDs, EV charging, solar PV and battery storage.',
};

const editionTimeline = [
  { edition: '1st', year: '1882', body: 'IEE', milestone: 'First fire-prevention rules' },
  { edition: '2nd — 4th', year: '1888 — 1903', body: 'IEE', milestone: 'Wider insulation methods' },
  { edition: '5th — 8th', year: '1907 — 1924', body: 'IEE', milestone: 'Domestic electrification' },
  { edition: '9th — 11th', year: '1927 — 1939', body: 'IEE', milestone: 'National Grid, voltage standards' },
  { edition: '12th', year: '1950', body: 'IEE', milestone: 'First post-war edition' },
  { edition: '13th', year: '1955', body: 'IEE', milestone: 'Shock protection introduced' },
  { edition: '14th', year: '1966', body: 'IEE', milestone: 'Restructured into parts' },
  { edition: '15th', year: '1981', body: 'IEE', milestone: 'Aligned with HD 384' },
  { edition: '16th', year: '1992', body: 'IEE', milestone: 'Became BS 7671' },
  { edition: '17th', year: '2008', body: 'IEE', milestone: 'Aligned with HD 60364' },
  { edition: '18th', year: '2018', body: 'IET', milestone: 'Current edition (now +A4:2026)' },
];

const a4Changes = [
  {
    reg: 'Reg 411.3.4',
    title: 'RCD protection for domestic lighting',
    detail:
      'A new regulation requiring 30 mA RCD additional protection for AC final circuits supplying luminaires within domestic (household) premises. The most impactful practical change for domestic electricians.',
  },
  {
    reg: 'Reg 421.1.7',
    title: 'AFDDs now required in higher-risk premises',
    detail:
      'Redrafted so that AFDDs are now a requirement (not just a recommendation) for socket-outlet final circuits rated up to 32 A in Higher-Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes. AFDDs remain recommended for single-phase socket-outlet circuits up to 32 A in all other premises.',
  },
  {
    reg: 'Reg 531.3.4.201',
    title: 'Adjustable RCDs need a key or tool',
    detail:
      'Where an RCD may be operated by an ordinary person, its rated residual operating current and time delay must not be adjustable without a deliberate act using a key or tool, and any change must give a visible indication of the new setting.',
  },
  {
    reg: 'Chapter 82',
    title: 'Prosumer electrical installations (PEIs)',
    detail:
      'An entirely new chapter covering low-voltage installations that both consume and produce energy locally — for example homes with solar PV, battery storage or EV export — designated Prosumer’s Electrical Installations.',
  },
];

const tocItems = [
  { id: 'history-overview', label: 'Overview' },
  { id: 'editions-timeline', label: 'Every Edition at a Glance' },
  { id: 'early-editions', label: 'Early Editions (1882 — 1950)' },
  { id: 'post-war-editions', label: 'Post-War Editions (1950 — 1981)' },
  { id: 'modern-era', label: 'Modern Era (1981 — 2008)' },
  { id: 'eighteenth-edition', label: 'The 18th Edition (2018)' },
  { id: 'iee-to-iet', label: 'IEE to IET: The Name Change' },
  { id: 'evolution-of-safety', label: 'Evolution of Safety Standards' },
  { id: 'looking-ahead', label: 'Looking Ahead: The 19th Edition' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The UK wiring regulations have been through 18 editions since the first rules were published in 1882, evolving from basic fire prevention rules to a comprehensive safety standard.',
  'The IEE (Institution of Electrical Engineers) became the IET (Institution of Engineering and Technology) in 2006 following a merger, but the wiring regulations continued under the IET name.',
  'BS 7671 was first designated in 1992 (the 16th Edition), aligning the wiring regulations with the British Standards system and European harmonisation.',
  'The current standard is BS 7671:2018+A4:2026 — the 18th Edition with Amendment 4, issued on 15 April 2026. It may be implemented immediately; BS 7671:2018+A3:2024 will be withdrawn on 15 October 2026.',
  'Amendment 4 (A4:2026) introduces mandatory 30 mA RCD additional protection for domestic lighting circuits (Reg 411.3.4), adjustable-RCD controls (Reg 531.3.4.201), and a new Chapter 82 for prosumer electrical installations.',
  'Elec-Mate is built to the current BS 7671:2018+A4:2026, with all Zs limits, regulation references, and compliance checks reflecting Amendment 4.',
];

const faqs = [
  {
    question: 'When were the UK wiring regulations first published?',
    answer:
      'The first UK wiring regulations were published in 1882 by the Society of Telegraph Engineers (which later became the Institution of Electrical Engineers, and then the Institution of Engineering and Technology). These early "Rules and Regulations for the Prevention of Fire Risks Arising from Electric Lighting" were focused almost entirely on fire prevention, as electricity was a new and poorly understood technology. The 1882 rules covered basic requirements for the insulation of conductors, the installation of fuses, and the separation of electrical wiring from combustible materials. They were written in response to a series of fires caused by faulty electrical installations in the 1870s and 1880s.',
  },
  {
    question: 'What is the difference between the IEE and the IET?',
    answer:
      'The IEE (Institution of Electrical Engineers) and the IET (Institution of Engineering and Technology) are the same organisation under different names. The IEE was founded in 1871 as the Society of Telegraph Engineers, renamed to the Institution of Electrical Engineers in 1888, and published the wiring regulations from the first edition in 1882 through to the 17th Edition in 2008. In 2006, the IEE merged with the IIE (Institution of Incorporated Engineers) to form the IET. The wiring regulations are now published by the IET, but they are essentially the continuation of the same body of work. When people refer to "IEE Regulations" or "IET Regulations", they mean the same thing — BS 7671.',
  },
  {
    question: 'When did BS 7671 become a British Standard?',
    answer:
      'The wiring regulations were formally designated as a British Standard — BS 7671 — with the 16th Edition in 1992. Before this, the regulations were published by the IEE as "Requirements for Electrical Installations" and were widely followed as best practice but were not technically a British Standard. The BS 7671 designation brought the wiring regulations into the formal British Standards framework and aligned them with European harmonisation through CENELEC (the European Committee for Electrotechnical Standardisation). The 16th Edition (BS 7671:1992) was the first edition to be closely aligned with the European harmonised document HD 384.',
  },
  {
    question: 'How many editions of the wiring regulations have there been?',
    answer:
      'There have been 18 editions of the UK wiring regulations, published over a span of more than 140 years. The editions were published in 1882, 1888, 1897, 1903, 1907, 1911, 1916, 1924, 1927, 1934, 1939, 1950, 1955, 1966, 1981, 1992, 2008, and 2018. In addition to the main editions, many editions have had amendments published between editions — for example, the current 18th Edition has had four amendments (A1:2020, A2:2022, A3:2024, and A4:2026). Each edition reflected the evolving understanding of electrical safety, changes in installation methods and materials, and harmonisation with European and international standards.',
  },
  {
    question: 'What did Amendment 3 to the 18th Edition change?',
    answer:
      'Amendment 3 (BS 7671:2018+A3:2024) was issued on 31 July 2024. The most significant changes were within Chapter 72 (Regulation 722.826.3.201) covering bidirectional and unidirectional protective and switching devices for EV charging installations, and updates to Regulation 722.411.4.1. This was driven by the growing installation of solar PV, battery storage, and EV chargers that can feed energy back into the installation. Amendment 3 clarifies which types of protective devices are suitable for use in installations where current can flow in both directions. A3:2024 is published as a free PDF supplement to the existing 18th Edition book — it is not a new book.',
  },
  {
    question: 'What did Amendment 4 (A4:2026) change?',
    answer:
      'Amendment 4 (BS 7671:2018+A4:2026) was issued on 15 April 2026 and may be implemented immediately. BS 7671:2018+A3:2024 will be withdrawn on 15 October 2026. Key changes include: Regulation 411.3.4, which now requires mandatory 30 mA RCD additional protection for AC final circuits supplying luminaires (lighting circuits) in domestic premises — the most impactful practical change for domestic electricians; Regulation 531.3.4.201, which requires that any adjustable RCD accessible to ordinary persons must require a key or tool to change its rated residual operating current, and must display a visible indicator of the new setting; and a new Chapter 82 covering prosumer electrical installations (premises with local energy generation or storage). There is also ongoing discussion about when the 19th Edition will be published. Elec-Mate is updated to BS 7671:2018+A4:2026.',
  },
  {
    question: 'How does Elec-Mate stay up to date with regulation changes?',
    answer:
      'Elec-Mate is built to BS 7671:2018+A4:2026 — the current 18th Edition including all four amendments. All Zs limits, regulation references, observation codes, and compliance checks reflect the latest requirements. When amendments or new editions are published, Elec-Mate is updated accordingly, so you always have the current regulations at your fingertips. The Elec-AI agents are trained on the full text of BS 7671:2018+A4:2026, the On-Site Guide, Guidance Notes 1 to 8, and the IET Code of Practice for EV Charging.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to BS 7671:2018+A4:2026 — structure, key regulations, and what changed in each amendment.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer units including RCD protection, AFDDs, and Amendment 3.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/afdd-arc-fault-detection',
    title: 'AFDD Guide',
    description:
      'Arc Fault Detection Devices explained — what they do, where they are required, and BS 7671 requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, C3, and FI observation codes with real examples and regulation references.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course Guide',
    description: 'Everything you need to know about the City and Guilds 2382 18th Edition course.',
    icon: GraduationCap,
    category: 'Course',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'How Part P of the Building Regulations applies to domestic electrical work in England and Wales.',
    icon: Scale,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'history-overview',
    heading: 'A Brief History of UK Wiring Regulations',
    content: (
      <>
        <p>
          The UK wiring regulations — now formally known as{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> —
          have been the foundation of electrical safety in Britain for over 140 years. From the
          first basic fire prevention rules in 1882 to the comprehensive 18th Edition we use today,
          the regulations have evolved alongside electrical technology, installation methods, and
          our understanding of what keeps people safe.
        </p>
        <p>
          This guide traces the history of the wiring regulations through all 18 editions, from the
          Society of Telegraph Engineers to the Institution of Engineering and Technology, and from
          gas lighting circuits to solar PV and battery storage. Understanding where the regulations
          came from helps you appreciate why they are structured the way they are — and why they
          continue to evolve.
        </p>
      </>
    ),
  },
  {
    id: 'editions-timeline',
    heading: 'Every Edition at a Glance',
    content: (
      <>
        <p>
          From the first rules in 1882 to the current{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>
          , there have been 18 editions. This timeline shows each edition, the year it was published,
          the publishing body, and its defining milestone.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white">Edition</th>
                  <th className="p-4 text-sm font-semibold text-yellow-400">Year</th>
                  <th className="p-4 text-sm font-semibold text-white">Published by</th>
                  <th className="p-4 text-sm font-semibold text-white">Milestone</th>
                </tr>
              </thead>
              <tbody>
                {editionTimeline.map((row, i) => (
                  <tr
                    key={row.edition}
                    className={i < editionTimeline.length - 1 ? 'border-b border-white/5' : ''}
                  >
                    <td className="p-4 text-sm text-white font-semibold whitespace-nowrap">
                      {row.edition}
                    </td>
                    <td className="p-4 text-sm text-yellow-400 font-semibold whitespace-nowrap">
                      {row.year}
                    </td>
                    <td className="p-4 text-sm text-white whitespace-nowrap">{row.body}</td>
                    <td className="p-4 text-sm text-white">{row.milestone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p>
          The 18th Edition has itself been revised four times — A1:2020, A2:2022, A3:2024 and
          A4:2026 — so the document on your shelf today carries far more than its 2018 publication
          date suggests.
        </p>
      </>
    ),
  },
  {
    id: 'early-editions',
    heading: 'Early Editions: 1882 to 1950',
    content: (
      <>
        <p>
          The first wiring regulations were published in 1882 by the Society of Telegraph Engineers
          (later renamed the Institution of Electrical Engineers). Electricity was a dangerous
          novelty, and a series of building fires caused by faulty wiring had created public alarm.
          The early editions were focused entirely on fire prevention.
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: '1st Edition (1882)',
              description:
                'Published as "Rules and Regulations for the Prevention of Fire Risks Arising from Electric Lighting." Covered basic insulation requirements…',
            },
            {
              title: '2nd to 4th Editions (1888 — 1903)',
              description:
                'Expanded as electricity became more common. Covered new installation methods, improved insulation materials…',
            },
            {
              title: '5th to 8th Editions (1907 — 1924)',
              description:
                'Covered the rapid expansion of domestic electricity during and after World War I. The 8th Edition (1924) introduced specific requirements for domestic…',
            },
            {
              title: '9th to 11th Editions (1927 — 1939)',
              description:
                'Addressed the National Grid rollout (1926 — 1933) and the standardisation of supply voltage. The 11th Edition (1939) was published just before World War…',
            },
            {
              title: '12th Edition (1950)',
              description:
                'The first post-war edition, reflecting the massive programme of house building and industrial reconstruction.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <History className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'post-war-editions',
    heading: 'Post-War Editions: 1950 to 1981',
    content: (
      <>
        <p>
          The post-war period saw the most significant shift in the philosophy of the wiring
          regulations — from fire prevention to personal safety. Electric shock became a recognised
          hazard, and the regulations expanded to address it.
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: '13th Edition (1955)',
              description:
                'Introduced the concept of shock protection alongside fire protection. Earthing requirements were significantly strengthened.',
            },
            {
              title: '14th Edition (1966)',
              description:
                'A major restructuring. Organised the regulations into parts covering design, selection, and installation.',
            },
            {
              title: '15th Edition (1981)',
              description:
                'A complete rewrite that aligned the UK regulations with the emerging European harmonised standard (HD 384).',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <History className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'modern-era',
    heading: 'The Modern Era: BS 7671 (1992 to 2008)',
    content: (
      <>
        <p>
          The 16th Edition marked the formal adoption of the wiring regulations as a British
          Standard — BS 7671. This brought the regulations into the British Standards framework and
          completed the harmonisation with European standards.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">16th Edition — BS 7671:1992</h4>
                <p className="text-white text-sm leading-relaxed">
                  The first edition designated as a British Standard. Closely aligned with the
                  European harmonised document HD 384. Introduced the BS 7671 numbering system that
                  we still use today (Regulation 411.3.3, for example). Required RCD protection for
                  socket outlets that may supply equipment used outdoors. Published with three
                  amendments (2001, 2002, 2004).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">17th Edition — BS 7671:2008</h4>
                <p className="text-white text-sm leading-relaxed">
                  A substantial update that aligned with the newly published European standard HD
                  60364. Introduced the concept of basic protection and fault protection (replacing
                  direct and indirect contact). Required 30mA RCD protection for all socket outlets
                  up to 20A (with exceptions). Introduced cable colour harmonisation (brown/blue
                  replacing red/black for single phase). Published with three amendments (2011,
                  2013, 2015). This was the last edition published under the IEE name before the
                  transition to IET.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="All BS 7671 regulation references at your fingertips"
          description="Elec-Mate's Elec-AI agents are trained on the full text of BS 7671:2018+A4:2026, the On-Site Guide, and all 8 Guidance Notes."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'eighteenth-edition',
    heading: 'The 18th Edition: BS 7671:2018',
    content: (
      <>
        <p>
          The current edition — BS 7671:2018 — was published on 2 July 2018 and came into effect on
          1 January 2019. It is the most comprehensive edition ever published and has been updated
          by three amendments.
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Key changes in the original 18th Edition (2018)',
              description:
                'On publication in 2018, Regulation 421.1.7 (Chapter 42) recommended the installation of AFDDs (Arc Fault Detection Devices) to mitigate fire risk in AC final circuits — recommendatory rather than mandatory, a common point of confusion. Amendment 4 has since strengthened this (see Amendment 4 below). Energy efficiency guidance was introduced in Appendix 17; under Amendment 4 this has been deleted and replaced by a new Chapter 81 on the functional aspects of energy efficiency.',
            },
            {
              title: 'Amendment 1 (A1:2020)',
              description:
                'Minor corrections and clarifications. Updated references to European standards. Revised requirements for certain special installations.',
            },
            {
              title: 'Amendment 2 (A2:2022)',
              description:
                'More substantial changes. Updated requirements for RCD protection, cable installation methods, and special locations.',
            },
            {
              title: 'Amendment 3 (A3:2024)',
              description:
                'Issued 31 July 2024. Updated Chapter 72 (Regulation 722.826.3.201) with requirements for bidirectional and unidirectional protective and switching devices in EV charging installations — driven by the growth of solar PV, battery storage, and EV chargers that can feed energy back into the installation.',
            },
            {
              title: 'Amendment 4 (A4:2026)',
              description:
                'Issued 15 April 2026. The most significant practical change for domestic work: Regulation 411.3.4 now requires mandatory 30 mA RCD additional protection for AC final circuits supplying luminaires in domestic premises. Regulation 531.3.4.201 requires adjustable RCDs accessible to ordinary persons to use a key or tool for any change to the rated residual operating current, with a visible indicator of the new setting. A new Chapter 82 covers prosumer electrical installations (premises with local generation or storage). BS 7671:2018+A3:2024 will be withdrawn on 15 October 2026.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h4 className="font-bold text-white mt-6 mb-3">
          The four headline changes in Amendment 4 (A4:2026)
        </h4>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          {a4Changes.map((item) => (
            <div
              key={item.reg}
              className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <FileCheck2 className="w-4 h-4 text-blue-300 shrink-0" />
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wide">
                  {item.reg}
                </span>
              </div>
              <h5 className="font-bold text-white mb-1">{item.title}</h5>
              <p className="text-white text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'iee-to-iet',
    heading: 'IEE to IET: The Name Change',
    content: (
      <>
        <p>
          One of the most common points of confusion for electricians — particularly apprentices
          studying older textbooks — is the change from IEE to IET. Here is what happened:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  The Institution of Electrical Engineers (IEE)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Founded in 1871 as the Society of Telegraph Engineers, renamed to the Institution
                  of Electrical Engineers in 1888. Published the wiring regulations from 1882 to
                  2006. The IEE was one of the most respected professional engineering bodies in the
                  UK and internationally.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">The Merger (2006)</h4>
                <p className="text-white text-sm leading-relaxed">
                  In 2006, the IEE merged with the IIE (Institution of Incorporated Engineers) to
                  form a new body: the Institution of Engineering and Technology (IET). The merger
                  created a larger, more diverse professional body covering electrical, electronic,
                  manufacturing, and IT engineering.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">The IET Today</h4>
                <p className="text-white text-sm leading-relaxed">
                  The IET publishes{' '}
                  <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                    BS 7671
                  </SEOInternalLink>
                  , the On-Site Guide, the Guidance Notes (GN1 to GN8), the Code of Practice for EV
                  Charging, and numerous other technical publications. When you see "IEE Wiring
                  Regulations" on an older certificate or textbook, it refers to the same body of
                  regulations now published by the IET.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'evolution-of-safety',
    heading: 'How Safety Standards Have Evolved',
    content: (
      <>
        <p>
          The evolution of the wiring regulations mirrors the evolution of our understanding of
          electrical safety. Each edition addressed the hazards and technologies of its era:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white">Era</th>
                  <th className="p-4 text-sm font-semibold text-yellow-400">Primary Concern</th>
                  <th className="p-4 text-sm font-semibold text-white">Key Innovation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    era: '1882 — 1920s',
                    concern: 'Fire prevention',
                    innovation: 'Insulation and fuse requirements',
                  },
                  {
                    era: '1920s — 1950s',
                    concern: 'Supply standardisation',
                    innovation: 'National Grid, standard voltages',
                  },
                  {
                    era: '1950s — 1980s',
                    concern: 'Electric shock',
                    innovation: 'Earthing, automatic disconnection',
                  },
                  {
                    era: '1980s — 2000s',
                    concern: 'European harmonisation',
                    innovation: 'BS 7671, HD 384/HD 60364',
                  },
                  {
                    era: '2000s — 2010s',
                    concern: 'RCD protection',
                    innovation: '30mA RCDs for socket outlets',
                  },
                  {
                    era: '2018 onwards',
                    concern: 'New technologies',
                    innovation: 'AFDDs, EV charging, solar PV, energy storage',
                  },
                ].map((row, i) => (
                  <tr key={row.era} className={i < 5 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 text-sm text-white">{row.era}</td>
                    <td className="p-4 text-sm text-yellow-400 font-semibold">{row.concern}</td>
                    <td className="p-4 text-sm text-white">{row.innovation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p>
          The trend is clear: each generation of regulations addresses the hazards that the previous
          generation did not anticipate. Today's regulations address solar PV, battery storage, and
          EV charging — technologies that would have been science fiction when the 15th Edition was
          published in 1981. The 19th Edition, when it arrives, will likely address technologies we
          are only beginning to deploy now.
        </p>
      </>
    ),
  },
  {
    id: 'looking-ahead',
    heading: 'Looking Ahead: The 19th Edition',
    content: (
      <>
        <p>
          Amendment 4 to BS 7671:2018 was issued on 15 April 2026, bringing mandatory 30 mA RCD
          protection for domestic lighting circuits and new prosumer installation requirements. The
          19th Edition is anticipated within the next few years. Key areas likely to be addressed
          include:
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Battery energy storage systems (BESS)',
              description:
                'The rapid growth of domestic and commercial battery storage (often combined with solar PV and EV charging) is creating new challenges for installation…',
            },
            {
              title: 'Vehicle-to-grid (V2G) technology',
              description:
                'V2G-capable EV chargers can export energy from the vehicle battery back into the home or grid.',
            },
            {
              title: 'Heat pump installations',
              description:
                'The UK government target of 600,000 heat pump installations per year will drive new requirements for high-power domestic circuits, dedicated supplies…',
            },
            {
              title: 'Cybersecurity for connected devices',
              description:
                'Smart meters, EV chargers, and battery storage systems are all connected to the internet. Future editions may address cybersecurity requirements to…',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SEOAppBridge
          title="Stay current with every amendment and edition"
          description="Elec-Mate is updated to reflect every amendment to BS 7671. All Zs limits, regulation references, and compliance checks are always current."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalWiringRegulationsHistoryPage() {
  return (
    <GuideTemplate
      title="History of UK Wiring Regulations | IEE to IET"
      description="History of UK wiring regulations from the first IEE rules (1882) through every edition to BS 7671:2018+A4:2026. Major changes, drivers, milestones."
      datePublished="2025-10-01"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation History"
      badgeIcon={BookOpen}
      answerBox={answerBox}
      heroTitle={
        <>
          History of UK <span className="text-yellow-400">Wiring Regulations</span>
        </>
      }
      heroSubtitle="From the first fire prevention rules in 1882 to BS 7671:2018+A4:2026, the UK wiring regulations have evolved through 18 editions over 140 years. This guide traces the journey from the Society of Telegraph Engineers to the IET, and from gas lighting circuits to solar PV and battery storage."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Wiring Regulations History"
      relatedPages={relatedPages}
      ctaHeading="Work to the latest regulations with Elec-Mate"
      ctaSubheading="BS 7671:2018+A4:2026 built into every calculator, certificate, and AI agent. Always current, always accurate. 7-day free trial, cancel anytime."
    />
  );
}
