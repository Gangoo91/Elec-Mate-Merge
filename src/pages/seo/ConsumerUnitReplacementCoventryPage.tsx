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
  { label: 'Consumer Unit Replacement', href: '/guides/consumer-unit-replacement-cost' },
  { label: 'Consumer Unit Replacement Coventry', href: '/consumer-unit-replacement-coventry' },
];

const tocItems = [
  { id: 'what-is-consumer-unit', label: 'What Is a Consumer Unit?' },
  { id: 'signs-you-need-replacement', label: 'Signs You Need a Replacement' },
  { id: 'metal-requirement', label: 'Metal Consumer Units — 2016 Requirement' },
  { id: 'cost-coventry', label: 'Costs in Coventry 2026' },
  { id: 'part-p-coventry', label: 'Part P Building Regulations Coventry' },
  { id: 'process', label: 'The Replacement Process' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Consumer unit replacement in Coventry typically costs £400 to £800 for a standard domestic installation, covering labour, the new metal consumer unit, testing, and the Electrical Installation Certificate.',
  'Metal enclosures have been mandatory for all new and replacement domestic consumer units since January 2016 under Amendment 3 to BS 7671:2008, carried forward in BS 7671:2018+A3:2024.',
  'Consumer unit replacement is notifiable Part P electrical work. In Coventry this means using a registered competent person (NICEIC, NAPIT, or ELECSA) who self-certifies, or notifying Coventry City Council Building Control.',
  'Coventry has significant post-war housing stock including 1950s and 1960s properties that may still have original wiring and rewireable fuse boards — replacement of these is strongly recommended.',
  'RCD protection on all socket-outlet circuits is required under Regulation 411.3.3 of BS 7671. A modern RCBO consumer unit provides individual RCD protection for each circuit.',
];

const faqs = [
  {
    question: 'How much does consumer unit replacement cost in Coventry?',
    answer:
      'Consumer unit replacement in Coventry typically costs £400 to £800. A standard 3-bedroom semi-detached house (common in CV1–CV6 postcodes) with 12 to 16 circuits and a straightforward replacement falls in the £450 to £650 range. Larger properties, properties with older wiring requiring additional inspection or remedial work, or those needing earthing upgrades will be toward the upper end. Always get at least two written quotes from registered electricians.',
  },
  {
    question: 'Does consumer unit replacement need to be notified to Coventry City Council?',
    answer:
      'Yes. Consumer unit replacement is notifiable Part P electrical work under the Building Regulations. Coventry homeowners have two options: use an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or similar) who self-certifies the work and notifies Coventry City Council Building Control automatically, or notify the council directly before work begins and arrange an inspection by an approved inspector. The first option is simpler and the same cost in practice.',
  },
  {
    question: 'Is a metal consumer unit required in Coventry?',
    answer:
      'Yes. Amendment 3 to BS 7671:2008, in force from 1 January 2016, introduced Regulation 421.1.201 requiring metal enclosures for all consumer units and similar switchgear in domestic premises. This requirement remains in BS 7671:2018+A3:2024. Any electrician installing a plastic consumer unit in Coventry is not complying with the current edition of the wiring regulations.',
  },
  {
    question: 'How long will the work take and will I be without power?',
    answer:
      'A standard consumer unit replacement in a Coventry home takes between 4 and 8 hours. Power will be isolated for most of this time. For larger properties or those where the electrician finds unexpected defects (damaged cable insulation, missing earth bonding), the work can take a full day. The electrician will typically give you an estimated time frame before starting work.',
  },
  {
    question: 'My Coventry home has a split-load consumer unit — do I need to replace it?',
    answer:
      'A split-load consumer unit has two sections: one with RCD protection and one without. If the circuits without RCD protection include socket outlets, this is a C2 observation under BS 7671 Regulation 411.3.3 and will result in an unsatisfactory EICR. Replacement with a modern RCBO consumer unit or dual-RCD unit providing RCD protection on all socket circuits is required as remedial action.',
  },
  {
    question: 'What certificate should I receive after consumer unit replacement in Coventry?',
    answer:
      'You should receive an Electrical Installation Certificate (EIC) completed in accordance with Appendix 6 of BS 7671, together with a schedule of test results showing the results of all electrical tests carried out on your installation. If the electrician is registered with a competent person scheme, you will also receive a Building Regulations Compliance Certificate from the scheme confirming the work has been notified. Keep all certificates safely — they will be required when selling the property.',
  },
  {
    question: 'Can my Coventry landlord be required to replace the consumer unit?',
    answer:
      'Yes. If an EICR carried out under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 identifies C2 observations relating to the consumer unit (such as absent RCD protection on socket circuits), the landlord is legally required to carry out remedial work within 28 days. Failure to comply can result in a civil penalty of up to £30,000 imposed by Coventry City Council.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Guide',
    description:
      'Complete UK guide to consumer unit replacement — costs, regulations, and process.',
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
    href: '/eic-certificate',
    title: 'Electrical Installation Certificate',
    description:
      'Issue EICs on site for new work and consumer unit replacements. BS 7671 compliant.',
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
          A consumer unit — also known as a fuse box or distribution board — is the heart of your
          home's electrical system. It receives the mains electricity supply and distributes it to
          individual circuits throughout your Coventry property. It also contains the protective
          devices that disconnect circuits in the event of a fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch</strong> — isolates the entire installation from the supply.
                Used by the electrician during work and by occupants in emergencies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCBs</strong> — miniature circuit breakers protect individual circuits
                against overcurrent. They are sized to the cable rating of each circuit (typically 6
                A for lighting, 20 A or 32 A for sockets, 32 A or 40 A for cookers and showers).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs and RCBOs</strong> — residual current devices detect earth leakage
                current and disconnect within milliseconds, protecting against electric shock. Under
                Regulation 411.3.3 of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                , RCD protection not exceeding 30 mA is mandatory on socket-outlet circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Coventry has substantial post-war housing, particularly 1950s and 1960s council-built
          estates and private semi-detached properties, many of which retain original wiring and
          outdated consumer units. A significant proportion of these properties still have
          rewireable fuse boards or early MCB boards without RCD protection.
        </p>
      </>
    ),
  },
  {
    id: 'signs-you-need-replacement',
    heading: 'Signs You Need a Consumer Unit Replacement in Coventry',
    content: (
      <>
        <p>
          The following are the most common indicators that your Coventry property needs a consumer
          unit replacement. If an EICR has been carried out, C2 observations relating to the
          consumer unit will make replacement a legal requirement within 28 days.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewireable fuses</strong> — ceramic fuse carriers with wire fuses. No RCD
                protection, can be incorrectly re-fused, and typically indicate wiring that is 30+
                years old.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on socket circuits</strong> — if your MCB board or
                split-load board has socket-outlet circuits without RCD protection, this is a C2
                observation under BS 7671 Regulation 411.3.3 requiring remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic consumer unit</strong> — non-compliant for any new installation
                since January 2016. If your unit was recently fitted and uses a plastic enclosure,
                it has not been installed to current regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequent tripping or burning smell</strong> — warning signs of deteriorated
                components or overloaded circuits. An electrician should inspect the unit
                immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient ways for modern demands</strong> — electric vehicle chargers,
                heat pumps, and additional circuits require spare ways in the consumer unit. Older
                boards often have no capacity for modern demands.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-requirement',
    heading: 'Metal Consumer Units — The Legal Requirement Since 2016',
    content: (
      <>
        <p>
          Regulation 421.1.201, introduced by Amendment 3 to BS 7671:2008 on 1 January 2016,
          requires that consumer units and similar switchgear assemblies in domestic premises have
          an enclosure made of non-combustible material. The only practical option is a metal
          enclosure. This requirement was carried through to BS 7671:2018 and remains in BS
          7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arc fault containment</strong> — the primary reason for the metal enclosure
                requirement is arc fault containment. Loose connections, damaged insulation, or
                component failure within a consumer unit can produce an arc that generates intense
                heat. A metal enclosure contains this heat and prevents ignition of surrounding
                material.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved products</strong> — major UK manufacturers including Hager,
                Schneider Electric, Wylex, ABB, and Crabtree all produce metal consumer units that
                meet BS EN 61439-3 and carry the UKCA mark. Your electrician should supply a
                recognised brand from a reputable wholesaler.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retrospective requirement?</strong> — the 2016 requirement does not force
                immediate replacement of plastic consumer units installed before January 2016.
                However, any replacement consumer unit in Coventry must use a metal enclosure,
                regardless of what was there before.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-coventry',
    heading: 'Consumer Unit Replacement Costs in Coventry (2026)',
    content: (
      <>
        <p>
          Coventry labour rates are competitive for the West Midlands region. The following costs
          reflect a complete consumer unit replacement including the metal consumer unit, all
          labour, testing to BS 7671 Chapter 61, Electrical Installation Certificate, and Part P
          self-certification via the competent person scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1–2 bedroom flat or small house</strong> — £400 to £550. Typical Coventry
                apartment or small terraced house. 8 to 12 circuits. Includes dual-RCD or RCBO metal
                consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3–4 bedroom semi or detached</strong> — £550 to £750. The most common
                Coventry housing type. 12 to 18 circuits. Typically half a day to a full day. Cost
                depends on circuit count and condition of existing wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large house or complex installation</strong> — £750 to £950+. Older
                properties requiring earthing upgrades, main bonding conductor replacement, or
                additional remedial work alongside the consumer unit replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Included in all quotes</strong> — the new metal consumer unit (specified
                make and model), all labour, connection of existing circuits, main bonding
                verification, full testing, EIC with schedule of test results, and Part P
                notification via the competent person scheme.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Additional costs may apply if the electrician discovers that remedial work is required on
          the existing installation — for example, damaged T&amp;E cable, missing main bonding, or
          inadequate earthing. These should be identified and quoted separately before work
          proceeds.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-coventry',
    heading: 'Part P Building Regulations — Coventry',
    content: (
      <>
        <p>
          Part P of the Building Regulations requires that specified electrical work in dwellings is
          designed and installed to protect people from fire and electric shock. Consumer unit
          replacement is listed electrical work under Part P and must be notified.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — the simplest route. An
                electrician registered with NICEIC, NAPIT, ELECSA, or another approved scheme
                notifies Coventry City Council Building Control automatically on completion of the
                work. You receive a Building Regulations Compliance Certificate from the scheme. No
                additional fee to the council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control notification</strong> — if using an unregistered
                electrician, you must notify Coventry City Council Building Control before work
                begins and pay the relevant fee. The council will arrange an inspection on
                completion and issue a completion certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why it matters</strong> — a consumer unit replacement without Part P
                notification is a breach of the Building Regulations. When you sell your Coventry
                property, the conveyancer will request evidence of compliance. Retrospective
                regularisation may be possible but involves additional cost and potential
                disruption.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'process',
    heading: 'The Consumer Unit Replacement Process in Coventry',
    content: (
      <>
        <p>
          A compliant consumer unit replacement in Coventry follows the same structured process
          regardless of the size of the property or the type of consumer unit being installed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Survey and circuit identification</strong> — the electrician identifies all
                circuits, checks earthing and bonding, and inspects the condition of accessible
                wiring. Any additional defects are noted and quoted separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply isolation and installation</strong> — the supply is isolated at the
                DNO cut-out. The old consumer unit is removed and the new metal consumer unit
                fitted. All circuits are reconnected. Main earthing and main bonding conductors are
                verified and resized if necessary (Regulation 544.1.1).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> — all circuits are tested to BS 7671 Chapter 61: continuity
                of protective conductors, ring final circuit continuity (where applicable),
                insulation resistance, polarity verification, earth fault loop impedance, and RCD
                operating time tests.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC and notification</strong> — the Electrical Installation Certificate
                (EIC) is completed with a schedule of test results. The competent person scheme
                notifies Coventry City Council Building Control. You receive the EIC and Building
                Regulations Compliance Certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work in Coventry',
    content: (
      <>
        <p>
          Coventry's mix of post-war housing, student lets, and a growing private rented sector
          (boosted by two universities) creates consistent demand for consumer unit replacement work
          across the CV postcode area. EICR-identified remedial work and landlord upgrades are the
          most common triggers for enquiries.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue EICs On Site — No Paperwork</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the certificate and schedule of test results on your phone while still
                  at the Coventry property. Send the PDF to your client before you pack up your van.
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
                  When an EICR reveals C2 observations, quote the consumer unit replacement
                  immediately using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Landlords must act within 28 days — the first quote sent wins the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Coventry electrical business with Elec-Mate"
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

export default function ConsumerUnitReplacementCoventryPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Coventry | Fuse Box Upgrade CV Postcodes"
      description="Consumer unit replacement in Coventry — costs £400–£800, metal enclosures mandatory since 2016, Part P notification required. Find a registered electrician in the CV postcode area and understand the full replacement process."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrician Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Coventry:{' '}
          <span className="text-yellow-400">Costs, Regulations &amp; Process 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about consumer unit replacement in Coventry — 2026 costs from £400 to £800, the mandatory metal enclosure requirement, Part P Building Regulations, and how to choose a qualified electrician in the CV postcode area."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Consumer Unit Replacement Coventry"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates On Site in Coventry"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
