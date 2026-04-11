import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Zap,
  Building2,
  CheckCircle2,
  Info,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Consumer Unit Guides', href: '/guides/consumer-unit-replacement' },
  {
    label: 'Consumer Unit Replacement Southampton',
    href: '/consumer-unit-replacement-southampton',
  },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'metal-enclosure', label: 'Metal Enclosure Requirement' },
  { id: 'rcd-protection', label: 'RCD and RCBO Protection' },
  { id: 'part-p', label: 'Part P Building Regulations' },
  { id: 'bs-en-61439', label: 'BS EN 61439-3' },
  { id: 'costs-southampton', label: 'Costs in Southampton (2026)' },
  { id: 'southampton-context', label: 'Southampton Housing and Maritime Context' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Regulation 421.1.201 (in force since July 2016) requires all replacement consumer units in domestic premises to have a non-combustible (metal) enclosure. Plastic consumer units are no longer permitted for replacement installations in Southampton.',
  'Consumer unit replacement is notifiable under Part P of the Building Regulations in England. Southampton City Council is the local building control authority, but registered competent persons (NICEIC, NAPIT, ELECSA) self-certify on your behalf.',
  "Southampton consumer unit replacement costs range from £400 to £800, reflecting the city's south coast labour rates which sit between London and the Midlands.",
  'BS EN 61439-3 is the product standard governing consumer units sold in the UK. Only UKCA-marked units from reputable manufacturers should be installed in Southampton properties.',
  "Southampton's mix of post-war council housing, Victorian terraces in areas such as Shirley and St Denys, and modern waterfront developments creates varied consumer unit replacement requirements across the city.",
];

const faqs = [
  {
    question: 'Does consumer unit replacement in Southampton require Part P notification?',
    answer:
      'Yes. Consumer unit replacement is notifiable work under Part P of the Building Regulations in England, and Southampton is no exception. The most straightforward approach is to engage an electrician registered with a government-approved competent person scheme such as NICEIC, NAPIT, or ELECSA. They notify Southampton City Council building control on your behalf and issue a Building Regulations Compliance Certificate. You will also receive an Electrical Installation Certificate and Schedule of Test Results from the electrician. If you use an unregistered electrician, notification to building control must be made before work begins.',
  },
  {
    question: 'Why does my Southampton property need a metal consumer unit now?',
    answer:
      'Amendment 2 to BS 7671:2008, which came into force on 1 July 2016, introduced Regulation 421.1.201. This requires that consumer units in domestic premises be enclosed in a cabinet or enclosure made of non-combustible material — in practice, steel. The requirement was introduced following electrical fire investigations demonstrating that plastic consumer unit enclosures could ignite during arcing faults, spreading fire to the surrounding structure. Any consumer unit replacement carried out in a Southampton property since July 2016 must use a compliant metal enclosure. Existing plastic units do not have to be proactively replaced, but any replacement — for any reason — must be with a metal unit.',
  },
  {
    question: 'How much does consumer unit replacement cost in Southampton?',
    answer:
      'Consumer unit replacement in Southampton typically costs £420 to £800. Southampton and Hampshire labour rates are higher than the Midlands and North but generally lower than central London. A small flat or two-bedroom terrace is likely to cost £400 to £550. A three-bedroom semi-detached or detached property will typically cost £550 to £750. Larger properties, those requiring earthing upgrades, or properties with complex existing installations may cost more. All quotes should include supply of the metal consumer unit, installation, circuit testing, and issue of the Electrical Installation Certificate and compliance certificate.',
  },
  {
    question: 'What RCD protection is required in a new Southampton consumer unit?',
    answer:
      'BS 7671 Regulation 411.3.3 requires 30mA RCD protection for all socket-outlet circuits rated up to 32A and for all circuits in locations containing a bath or shower. The two main consumer unit protection arrangements used in Southampton are: a dual-RCD consumer unit, where circuits are split across two groups each protected by a 30mA RCD (economical but a fault trips an entire group); or an all-RCBO consumer unit, where each circuit has an individual RCBO combining MCB and RCD functions (more expensive but a fault only trips the affected circuit). Southampton electricians generally recommend RCBOs for newer installations and for properties where loss of power to multiple circuits would be particularly disruptive.',
  },
  {
    question: 'How long will the consumer unit replacement take in Southampton?',
    answer:
      'A standard consumer unit replacement in a three-bedroom Southampton property typically takes four to six hours for one qualified electrician. You will be without power to most or all of the property for the majority of this time. Properties with older wiring, complex arrangements (such as separate garage supplies or outbuildings), or additional remedial work identified during the job may take longer. Your electrician should give you a realistic time estimate following a survey visit.',
  },
  {
    question: 'My Southampton house has a plastic consumer unit — is it dangerous?',
    answer:
      'An existing plastic consumer unit that was installed before July 2016 was compliant at the time of installation and is not categorised as immediately dangerous (C1) on an EICR solely on the basis of being plastic. It is typically coded C3 (improvement recommended). However, a plastic consumer unit presents a higher fire risk than a metal one in the event of an arcing fault, and replacement is advisable as part of any planned electrical upgrade. If the plastic unit also lacks RCD protection, this is a more serious concern — absence of 30mA RCD protection on socket circuits is typically coded C2 (potentially dangerous).',
  },
  {
    question: 'Will a new consumer unit in Southampton need a building control inspection?',
    answer:
      'Not if you use a registered competent person electrician (NICEIC, NAPIT, ELECSA, or similar). Registered electricians self-certify consumer unit replacement work under the competent person scheme. They notify Southampton City Council building control on your behalf, and building control does not need to inspect the work. You receive a Building Regulations Compliance Certificate from the scheme. If you use an unregistered electrician, Southampton City Council building control must be notified before work begins, and an approved inspector must certify the completed installation.',
  },
  {
    question:
      'What certificates should I receive after a consumer unit replacement in Southampton?',
    answer:
      'You should receive: an Electrical Installation Certificate (EIC) signed by the designer, installer, and inspector (often the same person for a straight replacement) detailing the installation; a Schedule of Test Results recording measured values for each circuit including insulation resistance, earth fault loop impedance, and RCD operating times; and a Building Regulations Compliance Certificate from the competent person scheme confirming notification to Southampton City Council. Keep all documents with your property records — they are required by solicitors during conveyancing and may be requested by your insurer following an electrical incident.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement Guide',
    description:
      'Complete UK guide to fuse box and consumer unit replacement costs, regulations, and process.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The IET Wiring Regulations explained — key requirements, amendments, and compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Notifiable electrical work in England — what requires notification and how the process works.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/consumer-unit-replacement-cardiff',
    title: 'Consumer Unit Replacement Cardiff',
    description:
      'Consumer unit and fuse box replacement in Cardiff — costs, Welsh regulations, and qualified electricians.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Complete EICs on your phone with AI assistance and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Consumer Unit Replacement in Southampton — What You Need to Know',
    content: (
      <>
        <p>
          Southampton is one of England's busiest port cities, with a diverse housing stock ranging
          from Victorian terraces in Shirley and Freemantle to post-war housing in Weston and modern
          waterfront apartments in the city centre. Consumer unit replacement demand is consistent
          across the city, particularly in older areas where installations have not been updated in
          decades.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What a consumer unit does</strong> — the consumer unit receives the incoming
                electricity supply from the meter and distributes it to individual circuits via
                circuit breakers (MCBs). It also houses the RCD or RCBO devices that provide shock
                protection. The installation must comply with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metal enclosure mandatory</strong> — since July 2016, BS 7671 Regulation
                421.1.201 has required non-combustible (metal) enclosures for consumer units in
                domestic premises. Any consumer unit replacement in Southampton must comply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work</strong> — consumer unit replacement must be notified under
                Part P of the Building Regulations. Use an NICEIC, NAPIT, or ELECSA registered
                electrician who handles the Southampton City Council notification process on your
                behalf.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-enclosure',
    heading: 'The Metal Enclosure Requirement — Regulation 421.1.201',
    content: (
      <>
        <p>
          The requirement for non-combustible consumer unit enclosures in domestic premises was
          introduced by Amendment 2 to BS 7671:2008, effective 1 July 2016. It is now incorporated
          into BS 7671:2018+A3:2024 and applies to all consumer unit replacements across England,
          including Southampton.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arc flash and fire risk</strong> — when a short circuit occurs inside a
                consumer unit, the resulting arc can reach temperatures of several thousand degrees
                Celsius. A metal enclosure contains this event; a plastic enclosure can melt,
                ignite, and propagate a fire into roof voids and structural timbers — a particularly
                serious risk in Southampton's older timber-framed terrace properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacement trigger</strong> — the regulation applies the moment any
                consumer unit replacement is carried out. If an existing Southampton property has a
                plastic consumer unit, it does not need to be proactively replaced immediately — but
                when it is replaced (for any reason), the replacement must be metal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No partial compliance</strong> — fitting a metal fascia plate to an existing
                plastic enclosure does not satisfy Regulation 421.1.201. The entire enclosure must
                be non-combustible. A full replacement unit is required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD and RCBO Protection Requirements',
    content: (
      <>
        <p>
          Regulation 411.3.3 of BS 7671 specifies the minimum RCD protection requirements for
          domestic consumer unit installations. Southampton electricians routinely encounter older
          properties with no RCD protection at all, or outdated split-load consumer units with
          partial coverage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory 30mA protection</strong> — all socket-outlet circuits rated up to
                32A must have 30mA RCD protection. All circuits in locations containing a bath or
                shower (Regulation 701) must also have 30mA RCD protection. No exceptions in a new
                installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual-RCD vs RCBO</strong> — a dual-RCD consumer unit divides circuits into
                two groups on two 30mA RCDs. An all-RCBO consumer unit gives each circuit its own
                RCBO. RCBOs are more expensive but provide better fault discrimination — a single
                fault trips only the affected circuit, not an entire group.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuisance tripping in older properties</strong> — Southampton properties with
                ageing wiring may experience nuisance RCD tripping due to deteriorating cable
                insulation or appliances with high leakage currents. RCBOs limit tripping to the
                affected circuit. Persistent tripping should be investigated as it may indicate
                wiring in need of repair.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Building Regulations — Compliance in Southampton',
    content: (
      <>
        <p>
          Part P of the Building Regulations requires that notifiable electrical work in dwellings
          in England — including consumer unit replacement — is either carried out by a registered
          competent person or notified to the local building control authority. Southampton City
          Council is the local authority for Part P purposes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered competent person route</strong> — an NICEIC, NAPIT, ELECSA, or
                equivalent scheme member notifies Southampton City Council on your behalf, issues a
                Building Regulations Compliance Certificate, and provides the Electrical
                Installation Certificate. This is the standard route for all consumer unit
                replacements in Southampton.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation for conveyancing</strong> — Hampshire solicitors acting on
                Southampton property transactions routinely request the EIC and Part P compliance
                certificate for any consumer unit replacement. Missing documentation is a common
                cause of delay at exchange. Retain all documents provided by your electrician and
                store them with the property deeds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retrospective certification</strong> — if a previous owner replaced the
                consumer unit without Part P compliance documentation, a retrospective
                regularisation certificate can be obtained from Southampton City Council. This
                involves an approved inspector visiting the property to assess the installation. It
                is a more expensive and time-consuming route than doing it correctly in the first
                place.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs-en-61439',
    heading: 'BS EN 61439-3 — Consumer Unit Product Standard',
    content: (
      <>
        <p>
          BS EN 61439-3 is the product standard that consumer units installed in Southampton
          properties must comply with. It sets requirements for design, construction, performance,
          and marking of distribution boards intended for use by ordinary persons.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>PSCC rating</strong> — the consumer unit must be rated for the prospective
                short-circuit current (PSCC) at the installation address. Southampton's urban
                network generally presents PSCC values of up to 16kA. Your electrician must measure
                the PSCC and confirm the selected consumer unit is appropriately rated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKCA marking</strong> — consumer units placed on the UK market since January
                2022 must carry UKCA marking. Southampton electricians should only install units
                from established manufacturers such as Hager, Schneider Electric, Wylex, or
                Contactum that comply with BS EN 61439-3 and carry UKCA marking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation testing</strong> — following BS EN 61439-3 factory testing, the
                installed consumer unit and all connected circuits are tested on site under BS 7671
                Part 6. Results are recorded in the Schedule of Test Results forming part of the{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs-southampton',
    heading: 'Consumer Unit Replacement Costs in Southampton (2026)',
    content: (
      <>
        <p>
          Southampton consumer unit replacement costs sit between London (higher) and the Midlands
          and North (lower), reflecting south coast labour rates and the costs of operating in a
          mid-sized city. The following are typical 2026 prices including supply, installation,
          testing, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One to two-bedroom flat</strong> — £400 to £580. Common in the city centre
                and waterfront areas. Typically 6 to 8 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom terraced house</strong> — £500 to £700. The most common job
                type across Shirley, Freemantle, and St Denys. Up to 12 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four or five-bedroom detached property</strong> — £650 to £900. Common in
                Bassett, Chilworth, and Chandler's Ford on the city fringe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional work</strong> — earthing upgrades, main bonding, smoke alarm
                systems, and meter tails replacement add £100 to £400 depending on scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always obtain a minimum of two or three written quotes from NICEIC or NAPIT registered
          electricians in Southampton. Confirm that testing, certification, and Part P notification
          are included in the quoted price.
        </p>
      </>
    ),
  },
  {
    id: 'southampton-context',
    heading: 'Southampton Housing Stock and Maritime Context',
    content: (
      <>
        <p>
          Southampton's housing stock is shaped by its history as a major port city, with extensive
          Victorian and Edwardian terracing, significant post-war rebuilding after wartime bomb
          damage, and modern waterfront developments. Each era of housing presents different
          consumer unit replacement considerations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces</strong> — Shirley, Freemantle, and St
                Denys have large amounts of terraced housing with original or early rewired wiring.
                Some properties retain rubber-insulated or lead-sheathed wiring indicating pre-1960s
                installations. An EICR should assess the wiring condition before specifying the
                consumer unit replacement scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Humid coastal environment</strong> — Southampton's proximity to Southampton
                Water and the Solent means properties in lower-lying areas can experience higher
                humidity. Consumer units located in damp cupboards, utility rooms, or understairs
                areas should be assessed for signs of condensation or moisture ingress, which can
                affect the integrity of the electrical installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>University student lets</strong> — the University of Southampton generates
                substantial demand for private rented accommodation. Landlords in Portswood,
                Swaythling, and Highfield frequently require consumer unit replacements as
                properties are brought into EICR compliance for the private rented sector
                regulations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work in Southampton',
    content: (
      <>
        <p>
          Southampton and Hampshire offer consistent demand for consumer unit replacement, driven by
          older housing stock, an active private rented sector, and a strong local economy.
          Electricians who complete documentation efficiently and quote follow-on work on the day of
          the job build stronger customer relationships and higher turnover.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICs On Site in Southampton</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to complete the full Electrical Installation Certificate and Schedule of Test
                  Results while still at the Southampton property. Record all circuit test values on
                  your phone, generate the PDF, and send it to your customer before you leave. No
                  paper certificates, no evening data entry.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Additional Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting tool
                  </SEOInternalLink>{' '}
                  to quote earthing upgrades, smoke alarm systems, or additional circuits while
                  still on site. Southampton customers respond far better to quotes that come with a
                  clear explanation while the issues are visible in front of them.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Southampton electrical business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, instant PDF export, and professional quoting. Eliminate evening paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementSouthamptonPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Southampton | Fuse Box Southampton"
      description="Consumer unit replacement in Southampton — metal enclosure rules, Part P Building Regulations, costs £400–800, BS EN 61439, NICEIC electricians in Hampshire. Complete guide 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Southampton:{' '}
          <span className="text-yellow-400">Fuse Box Guide 2026</span>
        </>
      }
      heroSubtitle="Everything Southampton homeowners and landlords need to know about consumer unit replacement — the metal enclosure requirement, Part P Building Regulations, RCD protection, costs of £400 to £800, and how to find a qualified NICEIC or NAPIT registered electrician in Hampshire."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Southampton"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion with instant PDF export and schedule of test results. 7-day free trial, cancel anytime."
    />
  );
}
