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
  { label: 'Regulations', href: '/guides/bs7671-18th-edition-guide' },
  { label: 'History', href: '/guides/electrical-wiring-regulations-history' },
];

const tocItems = [
  { id: 'history-overview', label: 'Overview' },
  { id: 'early-editions', label: 'Early Editions (1882 — 1950)' },
  { id: 'post-war-editions', label: 'Post-War Editions (1950 — 1981)' },
  { id: 'modern-era', label: 'Modern Era (1981 — 2008)' },
  { id: 'eighteenth-edition', label: 'The 18th Edition (2018)' },
  { id: 'iee-to-iet', label: 'IEE to IET: The Name Change' },
  { id: 'evolution-of-safety', label: 'Evolution of Safety Standards' },
  { id: 'looking-ahead', label: 'Looking Ahead' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The UK wiring regulations have been through 18 editions since the first rules were published in 1882, evolving from basic fire prevention rules to a comprehensive safety standard.',
  'The IEE (Institution of Electrical Engineers) became the IET (Institution of Engineering and Technology) in 2006 following a merger, but the wiring regulations continued under the IET name.',
  'BS 7671 was first designated in 1992 (the 16th Edition), aligning the wiring regulations with the British Standards system and European harmonisation.',
  'The current standard is BS 7671:2018+A3:2024 — the 18th Edition with Amendment 3, which added requirements for bidirectional and unidirectional devices.',
  'Elec-Mate is built to the current BS 7671:2018+A3:2024, with all Zs limits, regulation references, and compliance checks reflecting Amendment 3.',
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
      'There have been 18 editions of the UK wiring regulations, published over a span of more than 140 years. The editions were published in 1882, 1888, 1897, 1903, 1907, 1911, 1916, 1924, 1927, 1934, 1939, 1950, 1955, 1966, 1981, 1992, 2008, and 2018. In addition to the main editions, many editions have had amendments published between editions — for example, the current 18th Edition has had three amendments (A1:2020, A2:2022, and A3:2024). Each edition reflected the evolving understanding of electrical safety, changes in installation methods and materials, and harmonisation with European and international standards.',
  },
  {
    question: 'What did Amendment 3 to the 18th Edition change?',
    answer:
      'Amendment 3 (BS 7671:2018+A3:2024) was issued on 31 July 2024. The most significant change was the addition of Regulation 530.3.201, which covers requirements for bidirectional and unidirectional protective and switching devices. This was driven by the growing installation of solar PV, battery storage, and EV chargers that can feed energy back into the installation. Amendment 3 clarifies which types of protective devices are suitable for use in installations where current can flow in both directions. A3:2024 is published as a free PDF supplement to the existing 18th Edition book — it is not a new book.',
  },
  {
    question: 'Is Amendment 4 expected?',
    answer:
      'Yes. Amendment 4 to BS 7671:2018 is expected in 2026, though the exact date has not been confirmed by the IET. It is anticipated to cover further updates related to energy storage systems, EV charging, and other emerging technologies. There is also ongoing discussion about when the 19th Edition will be published — this is likely to be a major revision that incorporates several years of amendments and aligns with updated European harmonised documents. Electricians should ensure they stay current with amendments through CPD and by using tools like Elec-Mate that are updated to reflect the latest regulatory changes.',
  },
  {
    question: 'How does Elec-Mate stay up to date with regulation changes?',
    answer:
      'Elec-Mate is built to BS 7671:2018+A3:2024 — the current 18th Edition including all three amendments. All Zs limits, regulation references, observation codes, and compliance checks reflect the latest requirements. When amendments or new editions are published, Elec-Mate is updated accordingly, so you always have the current regulations at your fingertips. The 8 Elec-AI agents are trained on the full text of BS 7671, the On-Site Guide, Guidance Notes 1 to 8, and the IET Code of Practice for EV Charging.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to BS 7671:2018+A3:2024 — structure, key regulations, and what changed in each amendment.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer units including RCD protection, AFDDs, and Amendment 3.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/afdd-guide',
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
    href: '/guides/18th-edition-course',
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
          <SEOInternalLink href="/guides/bs7671-18th-edition-guide">BS 7671</SEOInternalLink> — have
          been the foundation of electrical safety in Britain for over 140 years. From the first
          basic fire prevention rules in 1882 to the comprehensive 18th Edition we use today, the
          regulations have evolved alongside electrical technology, installation methods, and our
          understanding of what keeps people safe.
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
                'Published as "Rules and Regulations for the Prevention of Fire Risks Arising from Electric Lighting." Covered basic insulation requirements, fuse protection, and separation from combustible materials. Written for the tiny number of buildings with electric lighting.',
            },
            {
              title: '2nd to 4th Editions (1888 — 1903)',
              description:
                'Expanded as electricity became more common. Covered new installation methods, improved insulation materials, and the growing use of electric motors in industry. The 4th Edition (1903) was the first to address three-phase systems.',
            },
            {
              title: '5th to 8th Editions (1907 — 1924)',
              description:
                'Covered the rapid expansion of domestic electricity during and after World War I. The 8th Edition (1924) introduced specific requirements for domestic installations as electricity moved from factories and mansions into ordinary homes.',
            },
            {
              title: '9th to 11th Editions (1927 — 1939)',
              description:
                'Addressed the National Grid rollout (1926 — 1933) and the standardisation of supply voltage. The 11th Edition (1939) was published just before World War II and remained in force throughout the war years.',
            },
            {
              title: '12th Edition (1950)',
              description:
                'The first post-war edition, reflecting the massive programme of house building and industrial reconstruction. Introduced more structured earthing requirements and improved protection standards.',
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
                'Introduced the concept of shock protection alongside fire protection. Earthing requirements were significantly strengthened. This edition recognised that a person touching a live conductor was as dangerous as a fire, and the regulations began to reflect this.',
            },
            {
              title: '14th Edition (1966)',
              description:
                'A major restructuring. Organised the regulations into parts covering design, selection, and installation. Introduced ring final circuits as a standard domestic wiring pattern. The familiar structure of the regulations — supply, distribution, final circuits — began to take shape.',
            },
            {
              title: '15th Edition (1981)',
              description:
                'A complete rewrite that aligned the UK regulations with the emerging European harmonised standard (HD 384). Introduced the modern numbering system (Part 1 through Part 7) and the concept of protection against electric shock using automatic disconnection of supply. This edition is the foundation of the regulation structure we use today.',
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
          description="Elec-Mate's 8 Elec-AI agents are trained on the full text of BS 7671:2018+A3:2024, the On-Site Guide, and all 8 Guidance Notes. Ask any regulation question and get an instant, referenced answer on site."
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
              title: 'Key changes in the 18th Edition (2018)',
              description:
                'Introduction of AFDDs (Arc Fault Detection Devices) in Regulation 421.1.7. Energy efficiency requirements in a new Section 801. Requirements for EV charging installations in Section 722. Expanded requirements for solar PV in Section 712. New requirements for prosumer installations.',
            },
            {
              title: 'Amendment 1 (A1:2020)',
              description:
                'Minor corrections and clarifications. Updated references to European standards. Revised requirements for certain special installations.',
            },
            {
              title: 'Amendment 2 (A2:2022)',
              description:
                'More substantial changes. Updated requirements for RCD protection, cable installation methods, and special locations. The base standard most electricians currently work to is BS 7671:2018+A2:2022.',
            },
            {
              title: 'Amendment 3 (A3:2024)',
              description:
                'Issued 31 July 2024. Added Regulation 530.3.201 covering bidirectional and unidirectional protective and switching devices — driven by the growth of solar PV, battery storage, and EV chargers. Published as a free PDF supplement.',
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
                  <SEOInternalLink href="/guides/bs7671-18th-edition-guide">
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
    heading: 'Looking Ahead: Amendment 4 and the 19th Edition',
    content: (
      <>
        <p>
          The wiring regulations will continue to evolve. Amendment 4 to BS 7671:2018 is expected in
          2026, and the 19th Edition is anticipated within the next few years. Key areas likely to
          be addressed include:
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Battery energy storage systems (BESS)',
              description:
                'The rapid growth of domestic and commercial battery storage (often combined with solar PV and EV charging) is creating new challenges for installation design, protection, and testing. Expect more specific requirements for BESS installations.',
            },
            {
              title: 'Vehicle-to-grid (V2G) technology',
              description:
                'V2G-capable EV chargers can export energy from the vehicle battery back into the home or grid. This creates bidirectional power flows that existing protection may not be designed for — building on the work started in Amendment 3.',
            },
            {
              title: 'Heat pump installations',
              description:
                'The UK government target of 600,000 heat pump installations per year will drive new requirements for high-power domestic circuits, dedicated supplies, and integration with existing consumer units.',
            },
            {
              title: 'Cybersecurity for connected devices',
              description:
                'Smart meters, EV chargers, and battery storage systems are all connected to the internet. Future editions may address cybersecurity requirements to prevent malicious control of electrical equipment.',
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
          description="Elec-Mate is updated to reflect every amendment to BS 7671. All Zs limits, regulation references, and compliance checks are always current. When the regulations change, your app changes with them."
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
      description="The complete history of UK wiring regulations from the first IEE rules in 1882 to BS 7671:2018+A3:2024. All 18 editions, the IEE to IET name change, key milestones, and how safety standards have evolved over 140 years."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation History"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          History of UK <span className="text-yellow-400">Wiring Regulations</span>
        </>
      }
      heroSubtitle="From the first fire prevention rules in 1882 to BS 7671:2018+A3:2024, the UK wiring regulations have evolved through 18 editions over 140 years. This guide traces the journey from the Society of Telegraph Engineers to the IET, and from gas lighting circuits to solar PV and battery storage."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Wiring Regulations History"
      relatedPages={relatedPages}
      ctaHeading="Work to the latest regulations with Elec-Mate"
      ctaSubheading="BS 7671:2018+A3:2024 built into every calculator, certificate, and AI agent. Always current, always accurate. 7-day free trial, cancel anytime."
    />
  );
}
