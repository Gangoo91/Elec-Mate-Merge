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
  { label: 'Consumer Unit Replacement Exeter', href: '/consumer-unit-replacement-exeter' },
];

const tocItems = [
  { id: 'what-is-consumer-unit', label: 'What Is a Consumer Unit?' },
  { id: 'exeter-housing-context', label: 'Exeter Housing Stock and Older Wiring' },
  { id: 'signs-you-need-replacement', label: 'Signs You Need a Replacement' },
  { id: 'metal-requirement', label: 'Metal Consumer Units — 2016 Requirement' },
  { id: 'cost-exeter', label: 'Costs in Exeter 2026' },
  { id: 'process', label: 'The Replacement Process' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Consumer unit replacement in Exeter typically costs £450 to £800 for a standard domestic installation, reflecting South West labour rates and including the metal consumer unit, testing, and the Electrical Installation Certificate.',
  'Metal consumer unit enclosures have been mandatory for all domestic replacements since January 2016 under BS 7671 Regulation 421.1.201, introduced by Amendment 3 to BS 7671:2008.',
  'Exeter has significant Victorian and Edwardian terraced housing — particularly in St Thomas, Heavitree, and St James — where rewireable fuse boards and pre-RCD wiring remain common EICR findings.',
  'Consumer unit replacement is Part P notifiable work. Exeter homeowners must use a registered competent person (NICEIC/NAPIT/ELECSA) or notify Devon Building Control Partnership before work begins.',
  'Under Regulation 411.3.3 of BS 7671:2018+A3:2024, RCD protection not exceeding 30 mA is mandatory on socket-outlet circuits rated up to 32 A. Absence is a C2 EICR observation requiring remedial action within 28 days.',
];

const faqs = [
  {
    question: 'How much does consumer unit replacement cost in Exeter?',
    answer:
      'Consumer unit replacement in Exeter typically costs £450 to £800. South West Devon labour rates are higher than the national average but lower than London. A straightforward replacement in a standard 3-bedroom Exeter semi-detached house costs £500 to £650 including the metal consumer unit, all labour, testing, and the Electrical Installation Certificate. Larger properties or those requiring earthing upgrades and remedial work will be higher. Obtain at least two written quotes from registered Exeter electricians.',
  },
  {
    question:
      'Who handles Part P Building Control notification for consumer unit replacement in Exeter?',
    answer:
      'Consumer unit replacement is Part P notifiable work. For Exeter properties, the local building authority is Exeter City Council, but Part P electrical work is administered through the Devon Building Control Partnership. The simplest approach is to use a registered competent person (NICEIC, NAPIT, ELECSA, or similar scheme) who self-certifies and notifies the partnership automatically on completion. Alternatively, you or your electrician must notify the Devon Building Control Partnership directly before work begins.',
  },
  {
    question: 'Does my Exeter property need a metal consumer unit?',
    answer:
      'Yes. Amendment 3 to BS 7671:2008, effective from 1 January 2016, introduced Regulation 421.1.201 requiring metal enclosures for all domestic consumer units. The requirement was carried forward into BS 7671:2018 (18th Edition) and remains current. Any replacement consumer unit in Exeter must use a metal enclosure. Plastic consumer units installed after January 2016 are non-compliant and should be flagged as such on any EICR.',
  },
  {
    question: 'My Exeter Victorian terrace has old wiring — does the whole house need rewiring?',
    answer:
      'Not necessarily. A qualified electrician will carry out an inspection to determine the condition of the existing wiring. If the cables are in reasonable condition and pass insulation resistance tests, a consumer unit replacement (adding RCD protection) may be sufficient to achieve a satisfactory EICR. However, if the wiring is aluminium, rubber-insulated, or severely deteriorated, partial or full rewiring may be recommended. An EICR will identify which approach is required.',
  },
  {
    question: 'How long does a consumer unit replacement take in an Exeter property?',
    answer:
      'A standard consumer unit replacement in an Exeter terraced or semi-detached house takes between 4 and 8 hours. Power will be off for most of this time. Victorian properties with complex cable runs or a higher circuit count may take a full day. The electrician should give you an estimated duration before starting work. Plan to be without power for the working day.',
  },
  {
    question: 'What is the difference between a dual-RCD consumer unit and an RCBO board?',
    answer:
      'A dual-RCD consumer unit has two RCDs, each covering a group of circuits. If one circuit develops an earth fault, the RCD protecting its group trips, affecting all circuits in that group. An RCBO consumer unit has an individual RCBO for each circuit, combining MCB and RCD protection in a single device. A fault on one circuit trips only that circuit — the rest of the installation is unaffected. RCBO boards cost more but provide superior protection and convenience. Both comply with BS 7671.',
  },
  {
    question: 'Can a student rental landlord in Exeter be required to replace a fuse box?',
    answer:
      'Yes. Exeter has a large student rental market (University of Exeter) and many HMO properties. HMO landlords must obtain a valid EICR as a condition of their licence. If the EICR identifies C2 observations relating to the consumer unit — such as absent RCD protection on socket circuits — the landlord must carry out remedial work within 28 days under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Exeter City Council enforces these regulations.',
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
    description: 'Issue EICs on site for consumer unit replacements in Exeter. Instant PDF.',
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
          A consumer unit — commonly called a fuse box or distribution board — is the main
          electrical distribution point in your Exeter property. It receives the incoming supply
          from the DNO (Western Power Distribution / National Grid Electricity Distribution) and
          distributes it to all circuits in the property, while housing the protective devices that
          disconnect circuits in the event of a fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch</strong> — isolates the entire installation. Available in single
                pole (switches the live only) or double pole (switches live and neutral). A double
                pole main switch is recommended in modern installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCBs</strong> — one per circuit, sized to the cable rating. They trip and
                reset without requiring a fuse wire replacement. Common ratings: 6 A (lighting), 20
                A (immersion heater), 32 A (sockets, cooker).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs and RCBOs</strong> — protect against electric shock by detecting earth
                leakage current. Under Regulation 411.3.3 of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                , 30 mA RCD protection is mandatory on all socket-outlet circuits rated up to 32 A
                in domestic premises.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'exeter-housing-context',
    heading: 'Exeter Housing Stock and Older Wiring',
    content: (
      <>
        <p>
          Exeter is a historically rich city with a substantial proportion of older housing stock.
          The Victorian and Edwardian terraces of St Thomas, Heavitree, Newtown, and St James,
          alongside inter-war semis in Pinhoe and Pennsylvania, contain many electrical
          installations that pre-date modern RCD requirements.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces</strong> — properties in EX1–EX4 postcodes
                frequently have wiring installed in the 1960s and 1970s that may not have been
                updated since. Rewireable fuse boards and early MCB boards without RCDs are common
                findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>University of Exeter rental market</strong> — Exeter has a significant
                student rental market, particularly in the St David's, St James, and Heavitree
                areas. HMO landlords require valid EICRs and consumer unit deficiencies are among
                the most common remedial items.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holiday lets</strong> — Exeter's proximity to the Jurassic Coast and
                Dartmoor means a proportion of EX properties are used as holiday lets. These are not
                covered by the 2020 private rented sector regulations, but electrical safety is a
                condition of many holiday let accreditation schemes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-you-need-replacement',
    heading: 'Signs You Need a Consumer Unit Replacement in Exeter',
    content: (
      <>
        <p>
          The following are the most common triggers for consumer unit replacement in Exeter
          properties. If an EICR has been carried out and is rated Unsatisfactory with C2
          observations relating to the consumer unit, replacement is a legal obligation within 28
          days for rental properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewireable or cartridge fuses</strong> — older fuse boards with ceramic fuse
                carriers. No RCD protection. A common finding in Exeter Victorian terraces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection on socket circuits</strong> — MCB-only boards or
                split-load boards without RCD on socket outlets. C2 observation under Regulation
                411.3.3 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic enclosure</strong> — non-compliant for any replacement work since
                January 2016 under Regulation 421.1.201 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient circuit capacity</strong> — no spare ways for additional
                circuits such as EV chargers, heat pumps, or additional sockets.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-requirement',
    heading: 'Metal Consumer Units — The 2016 BS 7671 Requirement Explained',
    content: (
      <>
        <p>
          Amendment 3 to BS 7671:2008, in force from 1 January 2016, added Regulation 421.1.201
          requiring that consumer units and similar switchgear assemblies in domestic premises have
          a non-combustible (metal) enclosure. This requirement is unchanged in BS
          7671:2018+A3:2024. Every consumer unit replacement in Exeter must comply.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Purpose</strong> — arc faults inside a consumer unit generate heat
                sufficient to ignite a plastic enclosure. A metal enclosure contains the arc and
                prevents it from spreading to surrounding combustible material. Consumer unit fires
                — several of which resulted in deaths — prompted the amendment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKCA marking</strong> — compliant consumer units carry the UKCA (UK
                Conformity Assessed) mark and meet BS EN 61439-3. Products from Hager, Schneider
                Electric, Wylex, ABB, Crabtree, and Chint all meet this standard when bought from
                reputable suppliers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing plastic boards</strong> — those installed before January 2016 do
                not require immediate replacement solely on grounds of the enclosure material.
                However, any replacement must use a metal unit, and the absence of RCD protection on
                socket circuits (a separate issue) may make replacement necessary regardless.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-exeter',
    heading: 'Consumer Unit Replacement Costs in Exeter (2026)',
    content: (
      <>
        <p>
          Exeter South West labour rates are higher than the national average. The following 2026
          price ranges cover a complete consumer unit replacement: metal unit, all labour, BS 7671
          Chapter 61 testing, Electrical Installation Certificate, and Part P notification via the
          competent person scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1–2 bedroom flat or terraced house</strong> — £450 to £580. Common in Exeter
                city centre and the student rental areas. 8 to 12 circuits. Around half a day on
                site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3–4 bedroom semi or detached</strong> — £580 to £750. Most typical Exeter
                family home. 12 to 18 circuits. Allow 4 to 8 hours. More if wiring is older and
                requires extended testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large Victorian terrace or HMO</strong> — £750 to £950+. High circuit count,
                fire alarm testing, potentially multiple RCD sections or full RCBO board. Earthing
                upgrades may add cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Included in all quotes</strong> — metal consumer unit, all labour, circuit
                reconnection, bonding verification, full testing, EIC with schedule of test results,
                and Part P self-certification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remedial work identified during the replacement process (damaged cables, missing bonding,
          deteriorated accessories) is quoted and agreed separately before proceeding.
        </p>
      </>
    ),
  },
  {
    id: 'process',
    heading: 'The Consumer Unit Replacement Process in Exeter',
    content: (
      <>
        <p>
          A compliant consumer unit replacement in Exeter follows the same structured process as any
          other Part P notifiable electrical installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assessment and circuit survey</strong> — all circuits identified, earthing
                and bonding checked, accessible wiring inspected. Additional defects noted and
                quoted separately before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation and installation</strong> — supply isolated at the Western Power
                Distribution cut-out. Old unit removed, new metal unit fitted. All circuits
                reconnected. Main earthing conductor size verified per Regulation 544.1.1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing to BS 7671 Chapter 61</strong> — continuity of protective
                conductors, ring final circuit continuity, insulation resistance, polarity, earth
                fault loop impedance, and RCD operating time. Results recorded on the schedule of
                test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC, notification and compliance certificate</strong> — Electrical
                Installation Certificate issued, Devon Building Control Partnership notified via the
                competent person scheme, Building Regulations Compliance Certificate sent to you.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work in Exeter',
    content: (
      <>
        <p>
          Exeter's mix of Victorian terraced housing, University of Exeter student rentals, HMOs,
          and a growing owner-occupier market in areas such as Cranbrook and Topsham creates
          consistent demand for consumer unit replacement work. The student and HMO rental market in
          particular generates steady EICR-led remedial enquiries.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue EICs On Site in Exeter</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the certificate and full schedule of test results on your phone while
                  still at the property. Send the PDF before you leave — no evening admin.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When an Exeter EICR identifies C2 consumer unit deficiencies, use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to send a quote on the same day. Landlords must act within 28 days — the first
                  quote sent wins the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Exeter electrical business with Elec-Mate"
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

export default function ConsumerUnitReplacementExeterPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Exeter | Fuse Box Upgrade EX Postcodes 2026"
      description="Consumer unit replacement in Exeter — typical cost £450–£800, metal enclosures mandatory since 2016, Part P Building Regulations. Find a qualified electrician in Exeter and understand the full replacement process."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrician Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Exeter:{' '}
          <span className="text-yellow-400">Costs, Regulations &amp; Process 2026</span>
        </>
      }
      heroSubtitle="Everything Exeter homeowners and landlords need to know about consumer unit replacement — 2026 costs from £450 to £800, the mandatory metal enclosure requirement, Part P Building Regulations, and older wiring in Exeter's Victorian and Edwardian terraced properties."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Consumer Unit Replacement Exeter"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates On Site in Exeter"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
