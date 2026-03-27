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
  { label: 'Consumer Unit Replacement Brighton', href: '/consumer-unit-replacement-brighton' },
];

const tocItems = [
  { id: 'what-is-consumer-unit', label: 'What Is a Consumer Unit?' },
  { id: 'brighton-housing-context', label: 'Brighton Housing Stock and Older Wiring' },
  { id: 'signs-you-need-replacement', label: 'Signs You Need a Replacement' },
  { id: 'metal-requirement', label: 'Metal Consumer Units — 2016 Requirement' },
  { id: 'cost-brighton', label: 'Costs in Brighton 2026' },
  { id: 'process', label: 'The Replacement Process' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician in Brighton' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Consumer unit replacement in Brighton typically costs £450 to £800, reflecting South East labour rates. Costs include the metal consumer unit, all labour, testing to BS 7671, and the Electrical Installation Certificate.',
  'Metal consumer unit enclosures are mandatory for all domestic replacements since January 2016 under BS 7671 Regulation 421.1.201 (Amendment 3), unchanged in BS 7671:2018+A3:2024.',
  'Brighton has extensive Victorian and Edwardian terraced and converted flat housing — particularly in Hanover, Kemptown, Preston Park, and Seven Dials — where rewireable fuse boards and pre-RCD wiring are common EICR findings.',
  'Consumer unit replacement is Part P notifiable work in England. Brighton homeowners must use a registered competent person (NICEIC/NAPIT/ELECSA) or notify Brighton &amp; Hove City Council Building Control.',
  'The Brighton &amp; Hove private rented sector is one of the largest in Sussex — landlords are required to obtain EICRs every five years, and consumer unit deficiencies are among the most common C2 observations.',
];

const faqs = [
  {
    question: 'How much does consumer unit replacement cost in Brighton?',
    answer:
      'Consumer unit replacement in Brighton typically costs £450 to £800. Brighton labour rates are higher than the national average, reflecting the cost of living in this part of the South East. A standard replacement in a 3-bedroom Brighton terraced house — very common in BN1 and BN2 postcodes — costs £500 to £700, including the metal consumer unit, all labour, testing, and the Electrical Installation Certificate. Larger properties, HMO conversions, or those requiring earthing upgrades and remedial work will be at the upper end or above. Always obtain at least two written quotes.',
  },
  {
    question: 'Is consumer unit replacement Part P notifiable work in Brighton?',
    answer:
      'Yes. Consumer unit replacement is listed notifiable electrical work under Part P of the Building Regulations 2010. For Brighton properties, the local building authority is Brighton &amp; Hove City Council. The simplest approach is to use a registered competent person (NICEIC, NAPIT, ELECSA, or similar scheme), who self-certifies the work and notifies the council automatically on completion. Alternatively, you or your electrician must notify Brighton &amp; Hove City Council Building Control before work begins.',
  },
  {
    question: 'Do I need a metal consumer unit in Brighton?',
    answer:
      'Yes. Since 1 January 2016, Amendment 3 to BS 7671:2008 introduced Regulation 421.1.201 requiring all domestic consumer unit replacements to use a non-combustible (metal) enclosure. The requirement is carried forward in BS 7671:2018+A3:2024 (the current wiring regulations). A qualified Brighton electrician will only supply and install a compliant metal consumer unit. Plastic consumer units are not permitted for new or replacement domestic installations.',
  },
  {
    question: 'My Brighton flat is in a converted Victorian house — what are the typical issues?',
    answer:
      'Converted Victorian and Edwardian properties in Brighton present specific electrical challenges. Common issues include: wiring installed in the 1960s or 1970s without RCD protection, shared or partially shared wiring between flats, inadequate earthing and bonding (particularly gas and water bonding), and insufficient circuit capacity for modern demands. A qualified Brighton electrician will carry out an EICR before or as part of a consumer unit replacement to identify all defects. The consumer unit for the individual flat may be straightforward to replace, but communal supplies and wiring may need separate attention.',
  },
  {
    question: 'How long does a consumer unit replacement take in Brighton?',
    answer:
      'A standard consumer unit replacement in a Brighton terraced house or flat takes between 4 and 8 hours. Power will be isolated for most of this time. Properties with a higher circuit count, older wiring, or where defects are discovered in the existing installation may take a full day. The electrician should give you a time estimate before starting. For HMO properties with multiple consumer units, allow more time.',
  },
  {
    question: 'Can a Brighton landlord be required to replace a consumer unit?',
    answer:
      'Yes. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all private landlords in Brighton must obtain an EICR every five years. If the EICR is Unsatisfactory with C2 observations relating to the consumer unit — such as absent RCD protection on socket-outlet circuits — the landlord must carry out remedial work within 28 days. Failure to comply can result in a civil penalty of up to £30,000 imposed by Brighton &amp; Hove City Council. Brighton has an active private sector housing enforcement team.',
  },
  {
    question: 'What is the difference between a consumer unit upgrade and a full rewire?',
    answer:
      'A consumer unit upgrade replaces the distribution board only and does not alter the circuit cables. It is the appropriate solution when the existing cables are in good condition but the board lacks RCD protection or uses a non-compliant enclosure. A full rewire replaces all circuit cables, switches, sockets, and the consumer unit. It is required when cables are significantly deteriorated, use outdated materials (rubber-insulated, aluminium), or the layout of the installation needs to change. A qualified Brighton electrician will advise on which is appropriate after inspecting the existing installation.',
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
    description: 'Issue EICs on site for consumer unit replacements in Brighton. Instant PDF.',
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
          A consumer unit — also called a fuse box or distribution board — is the electrical
          distribution centre for your Brighton property. It receives the mains supply from the
          DNO (UK Power Networks in the South East) and distributes it to all individual circuits,
          while housing the main switch and all protective devices that disconnect circuits in the
          event of a fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch</strong> — isolates the entire installation from the supply.
                Modern installations use a double pole main switch (isolating both live and neutral).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCBs</strong> — one per circuit, sized to protect the cable. Typical values:
                6 A (lighting), 20 A (immersion heater), 32 A (ring final sockets, electric shower).
                They trip and reset — no fuse wire required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs and RCBOs</strong> — detect earth fault current and disconnect within
                milliseconds. Under Regulation 411.3.3 of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                , 30 mA RCD protection is mandatory on socket-outlet circuits rated up to 32 A in
                domestic premises. An RCBO consumer unit provides individual RCD protection for
                each circuit — a fault on one circuit does not affect the rest.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'brighton-housing-context',
    heading: 'Brighton Housing Stock and Older Wiring',
    content: (
      <>
        <p>
          Brighton &amp; Hove has one of the most distinctive housing stocks in England. The city
          contains an exceptionally high proportion of Victorian and Edwardian terraced properties,
          many of which have been converted into flats, bedsits, and HMOs. Areas such as Hanover,
          Kemptown, Preston Park, Seven Dials, Fiveways, and Brunswick are characterised by
          large terraces with multiple occupants and shared services.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces</strong> — many Brighton properties retain
                wiring installed in the 1960s and 1970s, often by the original developers of the
                converted flats. Rewireable fuse boards and early MCB boards without RCD protection
                are common in these properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted flats</strong> — Brighton has a very high proportion of converted
                flats. Each flat typically has its own consumer unit, which may be of varying age
                and condition. Communal areas may have separate supplies and boards that also
                require inspection and potentially replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large private rented sector</strong> — Brighton &amp; Hove has one of the
                largest private rented sectors in Sussex and one of the highest HMO densities in
                the South East. Landlords require valid EICRs every five years, and consumer unit
                replacement is among the most frequently required remedial items.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>University of Brighton and University of Sussex</strong> — both universities
                attract large student populations that drive demand for private rented accommodation
                across BN1 and BN2 postcodes. HMO landlords in Moulsecoomb, Lewes Road, and
                Bevendean frequently require consumer unit remedial work following EICRs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-you-need-replacement',
    heading: 'Signs You Need a Consumer Unit Replacement in Brighton',
    content: (
      <>
        <p>
          The following indicators suggest your Brighton property may require a consumer unit
          replacement. For rental properties, C2 EICR observations create a legal duty to carry
          out remedial work within 28 days.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewireable or cartridge fuses</strong> — no RCD protection, associated
                with wiring that is typically 30 or more years old. Very common in Brighton
                Victorian conversions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on socket circuits</strong> — C2 EICR observation
                under Regulation 411.3.3 of BS 7671. Requires remedial action (consumer unit
                replacement) within 28 days for rental properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic enclosure</strong> — non-compliant for any domestic replacement
                since January 2016 under Regulation 421.1.201 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient ways for modern demands</strong> — no spare capacity for
                EV chargers, heat pumps, additional circuits, or smart home systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell, discoloration, or frequent tripping</strong> — signs of
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
    heading: 'Metal Consumer Units — Mandatory for All Domestic Replacements Since 2016',
    content: (
      <>
        <p>
          Regulation 421.1.201, introduced by Amendment 3 to BS 7671:2008 and effective from
          1 January 2016, requires all consumer units and similar switchgear in domestic premises
          to have a non-combustible (metal) enclosure. This requirement is unchanged in
          BS 7671:2018+A3:2024 — the current edition of the wiring regulations. Every consumer
          unit replacement in Brighton must comply.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why metal is required</strong> — arc faults within a consumer unit
                generate intense heat capable of igniting a plastic enclosure and spreading fire
                to surrounding material. A metal enclosure contains the arc, preventing fire
                propagation. A series of fatal consumer unit fires in the UK prompted this change.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved products</strong> — all major UK manufacturers (Hager, Schneider
                Electric, Wylex, ABB, Crabtree, Chint) produce UKCA-marked metal consumer units
                meeting BS EN 61439-3. Your Brighton electrician should supply from a recognised
                wholesale distributor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing plastic boards</strong> — not required to be immediately replaced
                solely on grounds of enclosure material if installed before January 2016. However,
                absent RCD protection on socket circuits (a separate issue) frequently makes
                replacement necessary regardless.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Any qualified Brighton electrician will supply and install a compliant metal consumer unit.
          If a quote specifies a plastic unit, reject it — the electrician is not complying with the
          current edition of BS 7671.
        </p>
      </>
    ),
  },
  {
    id: 'cost-brighton',
    heading: 'Consumer Unit Replacement Costs in Brighton (2026)',
    content: (
      <>
        <p>
          Brighton labour rates are among the higher in the South East, reflecting the cost of
          living in Brighton &amp; Hove. The following 2026 price ranges cover a complete domestic
          consumer unit replacement: metal consumer unit, all labour, BS 7671 Chapter 61 testing,
          Electrical Installation Certificate, and Part P self-certification via the competent
          person scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1-bedroom flat or studio</strong> — £450 to £600. Common across Brighton's
                converted Victorian housing. Typically 6 to 10 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2–3 bedroom flat or terraced house</strong> — £550 to £750. Most common
                Brighton residential scenario. 10 to 16 circuits. Allow 4 to 8 hours on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large house or HMO</strong> — £750 to £950+. High circuit count, multiple
                consumer units, fire alarm testing, and potentially multiple RCD sections. Earthing
                upgrades may add cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What is included</strong> — metal consumer unit (specified make and model),
                all labour, circuit reconnection, bonding checks to Regulation 544.1.1, full testing
                per BS 7671 Chapter 61, EIC with schedule of test results, and Part P notification
                via competent person scheme.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remedial work identified during the replacement — damaged cables, missing bonding
          conductors, deteriorated accessories — is quoted and agreed separately. Victorian Brighton
          properties with pre-1960s wiring are more likely to require additional remedial items.
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
          A compliant consumer unit replacement in Brighton follows a structured, documented
          process ensuring full compliance with BS 7671 and Part P of the Building Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit survey and assessment</strong> — all circuits identified, earthing
                and bonding checked, accessible wiring inspected. Any additional defects noted and
                quoted before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation and installation</strong> — supply isolated at the UK Power
                Networks DNO cut-out. Old unit removed, new metal consumer unit installed. All
                circuits reconnected to MCBs or RCBOs. Main earthing conductor size verified
                against Regulation 544.1.1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing to BS 7671 Chapter 61</strong> — continuity of protective
                conductors, ring final circuit continuity (where applicable), insulation resistance,
                polarity, earth fault loop impedance, and RCD operating time. All results recorded
                on the schedule of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC and notification</strong> — Electrical Installation Certificate issued
                per Appendix 6 of BS 7671. Brighton &amp; Hove City Council Building Control
                notified via the competent person scheme. Building Regulations Compliance Certificate
                sent to you. Keep both documents safely — required on sale of the property.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Brighton',
    content: (
      <>
        <p>
          Brighton has a large number of electrical contractors, but standards vary. Consumer unit
          replacement requires a qualified and competent electrician registered with an approved
          competent person scheme. Use the following guidance to find a reliable Brighton electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check scheme registration</strong> — use the NICEIC, NAPIT, or ELECSA
                online contractor search to find registered Brighton electricians. Registration
                requires evidence of qualifications, insurance, and regular technical assessment
                by the scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify qualifications</strong> — the electrician should hold Level 3 NVQ
                in Electrical Installations (or equivalent) and a current BS 7671 qualification
                (City and Guilds 2382 18th Edition). They should also carry professional indemnity
                and public liability insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotes specifying materials</strong> — insist on a written quote
                specifying the make, model, and configuration of the consumer unit. Compare at
                least two quotes. Brighton property prices mean that electrical work is not an area
                to compromise on quality for a marginal cost saving.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience with converted properties</strong> — Brighton's converted flat
                market means it is worth asking for experience of working in converted Victorian
                buildings, where shared wiring and non-standard layouts can complicate the work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work in Brighton',
    content: (
      <>
        <p>
          Brighton's combination of Victorian conversions, a very large HMO and student rental
          market, and active local authority enforcement of the Electrical Safety Standards
          Regulations 2020 creates consistent high demand for consumer unit replacement work
          across BN postcodes.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue EICs On Site in Brighton</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the certificate and schedule of test results on your phone while
                  still at the Brighton property. Send the PDF to the client before you leave —
                  no evening admin, no chasing paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work the Same Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When a Brighton EICR reveals C2 consumer unit deficiencies, quote the replacement
                  immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Landlords must act within 28 days — the first professional quote wins the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Brighton electrical business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion, instant quoting, and professional certificate management. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementBrightonPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Brighton | Fuse Box Brighton — Costs &amp; Regulations 2026"
      description="Consumer unit replacement in Brighton — typical cost £450–£800, metal enclosures mandatory since 2016, Part P notification required. Find a qualified electrician in the BN postcode area. Full guide for Brighton homeowners and landlords."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrician Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Brighton:{' '}
          <span className="text-yellow-400">Fuse Box Costs &amp; Regulations 2026</span>
        </>
      }
      heroSubtitle="Everything Brighton homeowners and landlords need to know about consumer unit replacement — 2026 costs from £450 to £800, the mandatory metal enclosure requirement, Part P Building Regulations, and older wiring challenges in Brighton's Victorian converted properties."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Consumer Unit Replacement Brighton"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates On Site in Brighton"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
