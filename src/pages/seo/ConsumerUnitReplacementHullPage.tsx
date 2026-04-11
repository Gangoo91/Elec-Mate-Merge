import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  FileCheck2,
  Wrench,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Consumer Unit Replacement', href: '/guides/consumer-unit-replacement' },
  { label: 'Consumer Unit Replacement Hull', href: '/consumer-unit-replacement-hull' },
];

const tocItems = [
  { id: 'what-is-consumer-unit', label: 'What Is a Consumer Unit?' },
  { id: 'hull-housing-context', label: 'Hull Housing Stock and Older Wiring' },
  { id: 'signs-you-need-replacement', label: 'Signs You Need a Replacement' },
  { id: 'metal-requirement', label: 'Metal Consumer Units — 2016 Requirement' },
  { id: 'cost-hull', label: 'Costs in Hull 2026' },
  { id: 'process', label: 'The Replacement Process' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Consumer unit replacement (fuse box upgrade) in Hull typically costs £400 to £750, reflecting competitive Yorkshire labour rates. Standard domestic replacement includes the metal consumer unit, labour, testing, and Electrical Installation Certificate.',
  'Metal consumer unit enclosures have been mandatory for all domestic replacements since January 2016 under Amendment 3 to BS 7671 — plastic consumer units cannot be used in new or replacement domestic installations.',
  'Hull has significant pre-1960s terraced housing in areas such as Hessle Road, Beverley Road, and Holderness Road where rewireable fuse boards and absent RCD protection are common EICR findings.',
  'Consumer unit replacement is Part P notifiable electrical work requiring either a registered competent person (NICEIC/NAPIT/ELECSA) or prior notification to Hull City Council Building Control.',
  'RCD protection on all socket-outlet circuits rated up to 32 A is mandatory under Regulation 411.3.3 of BS 7671:2018+A3:2024. Absence of this protection is a C2 EICR finding requiring remedial action within 28 days.',
];

const faqs = [
  {
    question: 'How much does a fuse box replacement cost in Hull?',
    answer:
      'Consumer unit replacement (fuse box upgrade) in Hull typically costs £400 to £750. The lower end applies to straightforward replacements in smaller properties such as 2-bedroom terraced houses common across HU postcodes. Larger properties, those with older wiring requiring inspection of multiple circuits, or installations requiring earthing work will sit toward the upper end. Yorkshire labour rates are generally competitive compared to larger cities. Always obtain at least two written quotes from registered electricians.',
  },
  {
    question:
      'Do I need planning permission or Building Control approval for a fuse box replacement in Hull?',
    answer:
      'You do not need planning permission, but consumer unit replacement is notifiable Part P electrical work under the Building Regulations. This means either: using a registered competent person (NICEIC, NAPIT, ELECSA) who handles self-certification and notifies Hull City Council Building Control automatically, or notifying the council directly before work begins. The competent person route is simpler and does not usually cost more. Hull City Council Building Control can advise on fees if you choose the direct notification route.',
  },
  {
    question: 'Is a metal consumer unit required for my Hull property?',
    answer:
      'Yes. Since January 2016, Regulation 421.1.201 of BS 7671 (introduced by Amendment 3) requires that consumer units and similar switchgear in domestic premises have a non-combustible (metal) enclosure. This requirement was carried forward into BS 7671:2018 (18th Edition) and remains current in BS 7671:2018+A3:2024. Any replacement in Hull must use a metal consumer unit. If your electrician proposes fitting a plastic unit, do not proceed.',
  },
  {
    question: 'My Hull terrace still has rewireable fuses — what does this mean?',
    answer:
      'Rewireable fuse carriers with ceramic fuse holders and fuse wire were standard in UK homes until the 1970s and 1980s. They offer no RCD protection against electric shock and can be incorrectly re-fused with wire of the wrong rating. An EICR on a Hull property with rewireable fuses will typically record C2 observations (absent RCD protection on socket circuits) or C3 (improvement recommended) observations, depending on the installation age and condition. Replacement with a modern metal consumer unit is strongly recommended.',
  },
  {
    question: 'How long will I be without power during a consumer unit replacement in Hull?',
    answer:
      'Power will be isolated for most of the replacement, which typically takes 4 to 8 hours for a standard Hull terraced or semi-detached house. The electrician should give you an estimated time frame before starting. For properties with more circuits, or where defects are discovered in the existing wiring, the work may take a full day. Plan to be without mains power for the duration.',
  },
  {
    question: 'What documents should I receive after a consumer unit replacement in Hull?',
    answer:
      'You should receive: (1) an Electrical Installation Certificate (EIC) completed in accordance with Appendix 6 of BS 7671, with a schedule of test results showing readings for all circuits; (2) a Building Regulations Compliance Certificate from the competent person scheme confirming the work has been notified to Hull City Council Building Control. Keep these documents safely — they will be required when selling the property and are useful for insurance purposes.',
  },
  {
    question: 'Can a Hull landlord be required to replace a fuse box?',
    answer:
      'Yes. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all private landlords in Hull must obtain an EICR every five years. If the EICR identifies C2 observations relating to the consumer unit — such as absent RCD protection on socket circuits — the landlord must carry out remedial work within 28 days. Failure to comply can result in a civil penalty of up to £30,000 imposed by Hull City Council.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement Guide',
    description: 'Complete UK guide to fuse box upgrades — costs, regulations, and process.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance timescales, and penalties explained.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-installation-certificate',
    title: 'Electrical Installation Certificate',
    description: 'Issue EICs on site for new work and consumer unit replacements in Hull.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-consumer-unit',
    heading: 'What Is a Consumer Unit?',
    content: (
      <>
        <p>
          A consumer unit — historically called a fuse box or fuseboard — is the distribution board
          that receives the electricity supply into your Hull property from the DNO (Northern
          Powergrid) and distributes it to individual circuits. It houses the main isolating switch
          and the protective devices that disconnect circuits in the event of a fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCBs</strong> — miniature circuit breakers protect each individual circuit.
                They trip automatically and reset without needing a fuse wire replacement. Each
                circuit has its own MCB rated to the cable it protects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs</strong> — residual current devices detect earth fault current and
                disconnect within milliseconds. Under Regulation 411.3.3 of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                , 30 mA RCD protection is required on all socket-outlet circuits rated up to 32 A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBOs</strong> — a combined RCD and MCB in one device, giving each circuit
                independent overcurrent and earth fault protection. An RCBO consumer unit is the
                gold standard for domestic installations — a fault on one circuit does not affect
                others.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hull-housing-context',
    heading: 'Hull Housing Stock and Older Wiring',
    content: (
      <>
        <p>
          Hull's housing stock includes a significant proportion of pre-1960s terraced properties,
          particularly in the inner-city areas of Hessle Road, Holderness Road, Beverley Road,
          Spring Bank, and Newland Avenue. Many of these properties retain original or early
          post-war electrical installations that predate modern safety requirements.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewireable fuse boards</strong> — common in Hull terraced properties built
                before the 1970s. These provide no RCD protection and are a known fire and electric
                shock risk. Replacement is the most effective single improvement you can make to an
                older Hull property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Early MCB boards without RCDs</strong> — 1980s and early 1990s MCB boards
                frequently have no RCD protection on socket circuits, which is a C2 EICR observation
                under BS 7671 Regulation 411.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student rental market</strong> — Hull has two universities and a large
                student rental sector. HMO landlords are required to have a valid EICR as a
                condition of their HMO licence, and consumer unit replacement is frequently
                identified as required remedial work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Properties in Hull's newer outer areas (Kingswood, Bransholme, Orchard Park) tend to have
          more modern wiring, but even 1980s and 1990s installations may lack RCD protection on
          socket circuits and benefit from a consumer unit upgrade.
        </p>
      </>
    ),
  },
  {
    id: 'signs-you-need-replacement',
    heading: 'Signs You Need a Consumer Unit Replacement',
    content: (
      <>
        <p>
          The following indicators suggest a consumer unit replacement should be considered. If you
          have had an EICR carried out on your Hull property and it is rated Unsatisfactory with C2
          observations relating to the consumer unit, replacement is a legal requirement within 28
          days.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewireable fuses</strong> — ceramic fuse carriers with wire fuses. No RCD
                protection. Associated with wiring that is typically 30+ years old.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on socket circuits</strong> — if socket-outlet circuits
                lack 30 mA RCD protection, this is a C2 observation under Regulation 411.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic enclosure</strong> — non-compliant for any replacement since January
                2016 under Regulation 421.1.201 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequent tripping, buzzing, or burning smell</strong> — signs of
                deteriorated components requiring urgent inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-requirement',
    heading: 'Metal Consumer Units — Mandatory Since January 2016',
    content: (
      <>
        <p>
          Amendment 3 to BS 7671:2008, effective from 1 January 2016, added Regulation 421.1.201
          requiring that all consumer units and similar switchgear assemblies in domestic premises
          have an enclosure of non-combustible material. A metal enclosure is the standard compliant
          solution. This requirement is unchanged in BS 7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety</strong> — arc faults inside a consumer unit produce intense
                heat that can ignite a plastic enclosure. A metal enclosure contains the arc,
                preventing the spread of fire. Consumer unit fires have been responsible for
                fatalities and major property damage in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to look for</strong> — all compliant consumer units from major UK
                manufacturers (Hager, Schneider, Wylex, ABB, Crabtree, Chint) carry the UKCA mark
                and meet BS EN 61439-3. Your electrician should supply the unit from a recognised
                wholesale distributor.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-hull',
    heading: 'Consumer Unit Replacement Costs in Hull (2026)',
    content: (
      <>
        <p>
          Hull and the East Yorkshire region offer competitive labour rates compared to larger
          English cities. The following 2026 price ranges cover a complete consumer unit replacement
          including the metal consumer unit, all labour, testing, and the Electrical Installation
          Certificate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1–2 bedroom terraced house or flat</strong> — £400 to £520. Common across
                Hull's inner city HU1–HU5 postcodes. 8 to 12 circuits. Usually half a day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3–4 bedroom semi or detached</strong> — £500 to £700. Most common in Hull's
                outer suburbs. 12 to 18 circuits. Typically 4 to 8 hours on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO or larger property</strong> — £700 to £950+. Multiple circuits, fire
                alarm system testing, and potentially multiple RCD sections. HMO landlords may need
                to budget for additional remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What is included</strong> — metal consumer unit (specified make/model), all
                labour, circuit reconnection, main bonding verification, full testing per BS 7671
                Chapter 61, EIC with schedule of test results, and Part P notification.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'process',
    heading: 'The Consumer Unit Replacement Process',
    content: (
      <>
        <p>
          A compliant consumer unit replacement in Hull follows a structured sequence ensuring all
          circuits are correctly identified, connected, and tested before the installation is
          energised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assessment</strong> — circuit identification, earthing and bonding check,
                inspection of accessible wiring. Any defects additional to the consumer unit
                replacement are noted and quoted separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation and installation</strong> — supply isolated at the Northern
                Powergrid cut-out. Old unit removed, new metal unit fitted, all circuits
                reconnected. Main earthing conductor and main bonding conductors checked against
                Regulation 544.1.1 requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> — full schedule of tests per BS 7671 Chapter 61:
                continuity, insulation resistance, polarity, earth fault loop impedance, and RCD
                operating time. All results recorded on the schedule.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification and notification</strong> — EIC issued, competent person
                scheme notifies Hull City Council Building Control, Building Regulations Compliance
                Certificate issued.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work in Hull',
    content: (
      <>
        <p>
          Hull's large stock of pre-1980s terraced properties and an active student rental market
          (University of Hull, Hull College) create steady demand for consumer unit replacement
          work. EICR-identified remedial work drives a significant proportion of this demand.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue EICs On Site in Hull</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the certificate and schedule of test results on your phone while still
                  at the property. No evening paperwork — send the PDF before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win the Remedial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  When an EICR reveals C2 consumer unit deficiencies, quote the replacement
                  immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Landlords must act within 28 days — the first quote wins.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Hull electrical business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC and EICR completion, instant quoting, and professional certificate management. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementHullPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Hull | Fuse Box Hull — Costs &amp; Regulations 2026"
      description="Consumer unit replacement in Hull — typical cost £400–£750, metal enclosures mandatory since 2016, Part P notification required. Find a registered electrician in the HU postcodes and understand the full process."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrician Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Hull:{' '}
          <span className="text-yellow-400">Fuse Box Upgrade Costs &amp; Regulations 2026</span>
        </>
      }
      heroSubtitle="Everything Hull homeowners and landlords need to know about consumer unit replacement — 2026 costs from £400 to £750, the mandatory metal enclosure rule, Part P Building Regulations, and older wiring in Hull's pre-war terraced housing stock."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Consumer Unit Replacement Hull"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates On Site in Hull"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
