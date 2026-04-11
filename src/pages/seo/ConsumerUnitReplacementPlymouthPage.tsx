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
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Consumer Unit Replacement', href: '/guides/consumer-unit-replacement' },
  { label: 'Consumer Unit Replacement Plymouth', href: '/consumer-unit-replacement-plymouth' },
];

const tocItems = [
  { id: 'what-is-consumer-unit', label: 'What Is a Consumer Unit?' },
  { id: 'plymouth-housing-context', label: 'Plymouth Housing Stock' },
  { id: 'signs-you-need-replacement', label: 'Signs You Need a Replacement' },
  { id: 'metal-requirement', label: 'Metal Consumer Units — 2016 Requirement' },
  { id: 'cost-plymouth', label: 'Costs in Plymouth 2026' },
  { id: 'process', label: 'The Replacement Process' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician in Plymouth' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Consumer unit replacement (fuse box upgrade) in Plymouth typically costs £400 to £750, with South West Devon labour rates. Costs include the metal consumer unit, all labour, testing, and the Electrical Installation Certificate.',
  'All consumer unit replacements in domestic properties must use a metal enclosure — mandatory since January 2016 under BS 7671 Regulation 421.1.201 (Amendment 3) and unchanged in BS 7671:2018+A3:2024.',
  'Plymouth has significant post-war housing stock, with many 1950s and 1960s properties across Devonport, Ernesettle, and Whitleigh that may retain original wiring and fuse boards without RCD protection.',
  'Consumer unit replacement is Part P notifiable work. Plymouth homeowners must use a registered competent person (NICEIC/NAPIT/ELECSA) or notify Plymouth City Council Building Control.',
  'RCD protection not exceeding 30 mA on all socket-outlet circuits rated up to 32 A is mandatory under BS 7671 Regulation 411.3.3. This is one of the most common C2 EICR findings in Plymouth properties.',
];

const faqs = [
  {
    question: 'How much does a fuse box replacement cost in Plymouth?',
    answer:
      "Consumer unit replacement in Plymouth typically costs £400 to £750. A straightforward replacement in a 3-bedroom semi-detached house common in Plymouth's PL2–PL5 postcodes costs £450 to £650, including the metal consumer unit, all labour, testing, and the Electrical Installation Certificate. Larger houses, HMO properties, or those requiring earthing upgrades and additional remedial work will cost more. Get at least two written quotes from NICEIC or NAPIT registered Plymouth electricians.",
  },
  {
    question: 'Does consumer unit replacement need Part P notification in Plymouth?',
    answer:
      'Yes. Consumer unit replacement is listed notifiable work under Part P of the Building Regulations. For Plymouth properties, you must either use a registered competent person (NICEIC, NAPIT, ELECSA, or similar scheme) who handles self-certification and automatically notifies Plymouth City Council Building Control, or notify the council yourself before work begins and arrange an inspection. The competent person route is by far the simpler option.',
  },
  {
    question: 'Is a metal consumer unit required in Plymouth?',
    answer:
      'Yes. Since 1 January 2016, Regulation 421.1.201 of BS 7671 (introduced by Amendment 3 to BS 7671:2008) requires all domestic consumer unit replacements to use a non-combustible (metal) enclosure. This requirement is unchanged in BS 7671:2018+A3:2024. Any qualified Plymouth electrician will supply and install a compliant metal consumer unit. If a quote proposes a plastic unit, do not proceed.',
  },
  {
    question: 'My Plymouth property was rebuilt after WW2 — is the wiring likely to be original?',
    answer:
      'Much of Plymouth was rebuilt in the 1950s following wartime bomb damage. Properties in Devonport, St Budeaux, and Ernesettle may retain 1950s and 1960s wiring that has not been updated. This wiring may be PVC-insulated twin and earth and could still be serviceable, but consumer units installed at the same time will not have RCD protection and may use rewireable fuses. An EICR by a qualified Plymouth electrician will assess the condition of the wiring and confirm whether replacement of the consumer unit alone is sufficient.',
  },
  {
    question: 'How long does a consumer unit replacement take in Plymouth?',
    answer:
      'A standard consumer unit replacement in a Plymouth semi-detached or terraced house takes 4 to 8 hours. Power will be isolated for the majority of this time. The electrician will give you an estimated duration before starting. Properties with a higher circuit count, older wiring, or where additional defects are found may take a full day. Plan to be without mains power for the day of the replacement.',
  },
  {
    question: 'What is an RCBO consumer unit and is it worth the extra cost?',
    answer:
      'An RCBO (Residual Current Breaker with Overcurrent) consumer unit has an individual RCBO device for each circuit, combining MCB and RCD protection in a single device. Unlike a standard dual-RCD board where a fault on one circuit trips the whole RCD group, an RCBO board trips only the affected circuit. This means the rest of the property remains powered. RCBO boards cost £50 to £100 more than a standard dual-RCD unit but provide significantly better protection and convenience. Many Plymouth electricians recommend RCBO boards for their superior selectivity.',
  },
  {
    question: 'Can Plymouth landlords be forced to replace a consumer unit?',
    answer:
      'Yes. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all private landlords in Plymouth must have an EICR carried out every five years. If the EICR is Unsatisfactory with C2 observations relating to the consumer unit (such as absent RCD protection on socket circuits), the landlord must complete remedial work within 28 days. Failure to comply can result in a civil penalty of up to £30,000 imposed by Plymouth City Council.',
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
    description: 'Landlord EICR requirements, compliance deadlines, and penalties explained.',
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
    description: 'Issue EICs on site for consumer unit replacements in Plymouth.',
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
          A consumer unit — also known as a fuse box or distribution board — is the point in your
          Plymouth property where the electricity supply from the DNO (Western Power Distribution /
          National Grid Electricity Distribution) enters and is distributed to individual circuits.
          It contains the main isolating switch and all overcurrent and earth fault protective
          devices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCBs</strong> — one per circuit, sized to protect the cable. They trip
                automatically and reset without needing a fuse wire. Typical ratings: 6 A
                (lighting), 20 A (immersion), 32 A (ring final sockets, cooker, shower).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs</strong> — detect earth leakage current and disconnect within
                milliseconds to protect against electric shock. Under Regulation 411.3.3 of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                , 30 mA RCD protection is mandatory on all socket-outlet circuits rated up to 32 A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBOs</strong> — combine MCB and RCD protection in one device. An RCBO
                consumer unit gives each circuit independent earth fault protection — a fault on one
                circuit trips only that circuit, leaving the rest of the installation live.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'plymouth-housing-context',
    heading: 'Plymouth Housing Stock and Electrical Safety',
    content: (
      <>
        <p>
          Plymouth is one of England's largest cities and has a housing stock that reflects its
          history. Much of the city was rebuilt following extensive wartime bomb damage, resulting
          in a large proportion of 1950s and 1960s social and private housing. Older remaining
          Victorian terraces are concentrated in areas such as Greenbank, Mutley, and the Barbican.
          Both types of stock present specific electrical safety considerations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war estates</strong> — Devonport, Ernesettle, Whitleigh, and Barne
                Barton contain large amounts of 1950s and 1960s housing. Electrical installations
                from this period may still be in place, with rewireable fuse boards or early MCB
                boards without RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces</strong> — Mutley, Greenbank, and Compton
                retain older properties with wiring often updated piecemeal in the 1970s and 1980s —
                a period when RCD protection was not yet required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented sector</strong> — Plymouth has a significant rental market,
                particularly around the University of Plymouth (Mutley, Lipson) and Plymouth Marjon
                University (Derriford). HMO landlords require valid EICRs as a licence condition,
                and consumer unit replacement is frequently required remedial work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-you-need-replacement',
    heading: 'Signs You Need a Consumer Unit Replacement in Plymouth',
    content: (
      <>
        <p>
          The following are the most common signs that your Plymouth property requires a consumer
          unit replacement. For rental properties, C2 EICR observations create a legal requirement
          for remedial action within 28 days.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewireable fuses</strong> — ceramic fuse carriers with wire fuses offer no
                RCD protection. Common in Plymouth properties with original 1950s–1970s wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD on socket circuits</strong> — C2 observation under Regulation 411.3.3
                of BS 7671. Requires remedial action (consumer unit replacement) within 28 days if
                identified on an EICR for a rental property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic enclosure</strong> — non-compliant for any replacement since January
                2016 under Regulation 421.1.201.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell, scorch marks, or noisy MCBs</strong> — signs of deteriorated
                components requiring urgent inspection and likely replacement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-requirement',
    heading: 'Metal Consumer Units — Mandatory Since 2016',
    content: (
      <>
        <p>
          Regulation 421.1.201, introduced by Amendment 3 to BS 7671:2008 and effective from 1
          January 2016, requires that consumer units and similar switchgear in domestic premises
          have a non-combustible (metal) enclosure. The requirement is unchanged in the current
          edition of the wiring regulations, BS 7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why it matters</strong> — arc faults within a consumer unit can ignite a
                plastic enclosure, spreading fire to surrounding material. A metal enclosure
                contains the arc and its heat, preventing fire propagation. This change was
                introduced following a series of fatal and near-fatal consumer unit fires in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>All major brands comply</strong> — Hager, Schneider Electric, Wylex, ABB,
                Crabtree, and Chint all produce UKCA-marked metal consumer units meeting BS EN
                61439-3. Your Plymouth electrician should supply from a recognised distributor.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-plymouth',
    heading: 'Consumer Unit Replacement Costs in Plymouth (2026)',
    content: (
      <>
        <p>
          Plymouth labour rates are competitive for the South West, broadly in line with the wider
          Devon market. The following 2026 price ranges cover a complete domestic consumer unit
          replacement including the metal consumer unit, all labour, BS 7671 Chapter 61 testing,
          Electrical Installation Certificate, and Part P self-certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1–2 bedroom flat or small terraced house</strong> — £400 to £520. Common
                across central and inner Plymouth postcodes. 8 to 12 circuits. Typically half a day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3–4 bedroom semi or detached</strong> — £500 to £700. Most typical Plymouth
                family home. 12 to 18 circuits. Allow 4 to 8 hours, possibly a full day for older
                properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO or large property</strong> — £700 to £950+. High circuit count, fire
                alarm testing, potentially multiple consumer units. Earthing and bonding upgrades
                add cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What is included</strong> — metal consumer unit (specified brand and model),
                all labour, circuit reconnection, bonding checks, full testing, EIC with schedule of
                test results, and Part P notification via the competent person scheme.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All remedial work identified during the replacement — damaged cables, missing bonding,
          deteriorated accessories — is quoted separately before proceeding.
        </p>
      </>
    ),
  },
  {
    id: 'process',
    heading: 'The Consumer Unit Replacement Process',
    content: (
      <>
        <p>
          A compliant consumer unit replacement in Plymouth follows a structured, documented process
          to ensure full compliance with BS 7671 and Part P of the Building Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Initial survey</strong> — circuit identification, earthing and bonding
                inspection, accessible wiring check. Any defects additional to the consumer unit are
                noted and quoted before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation and installation</strong> — supply isolated at the Western Power
                Distribution cut-out. Old consumer unit removed, new metal unit installed. All
                circuits reconnected to MCBs or RCBOs. Main earthing conductor size verified against
                Regulation 544.1.1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> — full suite of BS 7671 Chapter 61 tests: continuity of
                protective conductors, ring final circuit continuity, insulation resistance,
                polarity, earth fault loop impedance, and RCD operating times. All results recorded
                on the schedule of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification and notification</strong> — Electrical Installation
                Certificate (EIC) issued per Appendix 6 of BS 7671. Plymouth City Council Building
                Control notified via the competent person scheme. Building Regulations Compliance
                Certificate sent to you.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Plymouth',
    content: (
      <>
        <p>
          Consumer unit replacement requires a qualified and competent electrician. For Part P
          self-certification, the electrician must be registered with an approved competent person
          scheme. Use the following approach to find a reliable Plymouth electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use the scheme registers</strong> — the NICEIC, NAPIT, and ELECSA online
                contractor search tools allow you to find and verify registered Plymouth
                electricians. Registration requires evidence of qualifications, insurance, and
                regular technical assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — a minimum of Level 3 NVQ in Electrical
                Installations and a current BS 7671 qualification (City and Guilds 2382 18th
                Edition). The electrician should hold professional indemnity and public liability
                insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotes specifying materials</strong> — insist on a quote that
                specifies the make, model, and configuration of the consumer unit. Compare at least
                two quotes. If a quote seems unusually low, ask what is included.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work in Plymouth',
    content: (
      <>
        <p>
          Plymouth's combination of post-war housing, two universities, an active HMO market, and a
          large naval base (HMNB Devonport) with surrounding service personnel housing creates
          consistent demand for consumer unit replacement work across PL postcodes.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue EICs On Site in Plymouth</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the certificate and schedule of test results on your phone while at
                  the Plymouth property. No evening admin — send the PDF before you leave.
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
                  When an EICR reveals C2 consumer unit deficiencies, quote the replacement using
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  on the same day. Plymouth landlords must act within 28 days — quote first, win the
                  job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Plymouth electrical business with Elec-Mate"
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

export default function ConsumerUnitReplacementPlymouthPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Plymouth | Fuse Box Plymouth — Costs 2026"
      description="Consumer unit replacement in Plymouth — typical cost £400–£750, metal enclosures mandatory since 2016, Part P notification required. Find a qualified electrician in the PL postcode area and understand the full replacement process."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrician Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Plymouth:{' '}
          <span className="text-yellow-400">Fuse Box Costs &amp; Regulations 2026</span>
        </>
      }
      heroSubtitle="Everything Plymouth homeowners and landlords need to know about consumer unit replacement — 2026 costs from £400 to £750, the mandatory metal enclosure requirement, Part P Building Regulations, and older wiring in Plymouth's post-war housing stock."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Consumer Unit Replacement Plymouth"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates On Site in Plymouth"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
