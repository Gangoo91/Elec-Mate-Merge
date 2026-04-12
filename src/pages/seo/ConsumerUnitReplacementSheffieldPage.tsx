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
  { label: 'Consumer Unit Guides', href: '/guides/consumer-unit-replacement-cost' },
  { label: 'Consumer Unit Replacement Sheffield', href: '/consumer-unit-replacement-sheffield' },
];

const tocItems = [
  { id: 'why-replace', label: 'Why Replace Your Consumer Unit?' },
  { id: 'metal-enclosure', label: 'Metal Enclosure — The 2016 Requirement' },
  { id: 'rcd-protection', label: 'RCD and RCBO Protection' },
  { id: 'part-p-sheffield', label: 'Part P in Sheffield' },
  { id: 'bs-en-61439', label: 'BS EN 61439-3 Standard' },
  { id: 'costs-sheffield', label: 'Costs in Sheffield (2026)' },
  { id: 'sheffield-housing', label: 'Sheffield Housing Stock' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Regulation 421.1.201 (introduced by Amendment 2, effective July 2016) requires that all new and replacement consumer units in domestic premises use a non-combustible (metal) enclosure. Any consumer unit replacement in Sheffield must meet this requirement.',
  'Consumer unit replacement is notifiable work under Part P of the Building Regulations in England. An NICEIC, NAPIT, or ELECSA registered electrician in Sheffield can self-certify and notify building control on your behalf.',
  'Sheffield has extensive Victorian and Edwardian terraced housing stock, particularly in areas such as Hillsborough, Walkley, Crookes, and Heeley, where consumer unit upgrades are very commonly required.',
  'Consumer unit replacement in Sheffield costs approximately £400 to £750 for a standard domestic property, making it one of the more competitively priced major cities in England.',
  'RCD protection under BS 7671 Regulation 411.3.3 must be provided for all socket-outlet circuits rated up to 32A and all circuits in bathrooms and shower rooms. Modern installations use dual-RCD or individual RCBO protection.',
];

const faqs = [
  {
    question: 'Does a consumer unit replacement in Sheffield require Part P notification?',
    answer:
      'Yes. Consumer unit replacement is listed as notifiable work under Part P of the Building Regulations in England. In Sheffield this means the work must be either carried out by an electrician registered with a government-approved competent person scheme — such as NICEIC, NAPIT, or ELECSA — who self-certifies and notifies Sheffield City Council building control on your behalf, or notified to Sheffield City Council building control before work begins if using a non-registered electrician. The registered competent person route is almost always simpler and faster. Your electrician will issue an Electrical Installation Certificate and arrange Building Regulations compliance certification.',
  },
  {
    question: 'Why must replacement consumer units in Sheffield have a metal enclosure?',
    answer:
      'Amendment 2 to BS 7671:2008, which came into force on 1 July 2016, introduced Regulation 421.1.201. This regulation requires that in domestic premises a consumer unit shall be installed in a cabinet or enclosure constructed of non-combustible material. Steel consumer unit enclosures meet this requirement; plastic ones do not. The change was made because investigations into domestic electrical fires found that plastic consumer unit enclosures could ignite and spread fire during arcing faults. Metal enclosures contain such events far more effectively. Any consumer unit installed in a Sheffield property from July 2016 onwards must comply — there is no grandfathering for replacements.',
  },
  {
    question: 'How much does a consumer unit replacement cost in Sheffield?',
    answer:
      'Consumer unit replacement in Sheffield typically costs £400 to £750 for a standard domestic property. A one-bedroom flat or small terrace (common in areas such as Heeley or Walkley) is likely to be at the lower end — around £380 to £500. A larger semi-detached or detached property with more circuits may cost £550 to £800. Sheffield labour rates are generally lower than Manchester or London, making it one of the more affordable cities for this type of work. The price should include supply and installation of the metal consumer unit, all required testing, and issue of the Electrical Installation Certificate and Building Regulations compliance documentation.',
  },
  {
    question: 'What type of RCD protection should a new Sheffield consumer unit have?',
    answer:
      'BS 7671 Regulation 411.3.3 requires 30mA RCD protection for all socket-outlet circuits rated up to 32A and all circuits serving locations containing a bath or shower. Modern consumer units achieve this in two main ways. A dual-RCD consumer unit splits circuits into two groups, each protected by a 100mA time-delayed RCD at the incoming level and a 30mA RCD at the group level — however, a fault on one circuit can trip all circuits in that group. The preferred option is an RCBO (Residual Current Circuit Breaker with Overcurrent protection) for each individual circuit. RCBOs are larger and more expensive, but a fault on one circuit only trips that single circuit, providing maximum discrimination and convenience.',
  },
  {
    question: 'How long does a consumer unit replacement take in Sheffield?',
    answer:
      'A consumer unit replacement in a typical Sheffield terrace or semi-detached house takes around four to six hours for a qualified electrician working alone. Properties in older areas of Sheffield such as Hillsborough or Crookes may take longer if there are complexities such as multiple sub-boards, non-standard wiring, or earthing arrangements that require attention. A larger detached property can take a full working day. You will be without power to parts of the property (or all of it) for most of this time, so it is worth planning around the work.',
  },
  {
    question: 'My Sheffield terrace has old fuse wire — is that a problem?',
    answer:
      'Yes. Properties in older Sheffield areas with original rewirable fuse wire holders (recognisable by ceramic or porcelain holders with fuse wire) are operating with protection that dates from before modern safety standards. Rewirable fuses do not trip instantly in the event of a fault — they depend on fuse wire melting, which can take far longer than an MCB or RCB tripping. They also allow incorrect wire ratings to be fitted, which can mask overloads. Replacement with a modern metal consumer unit containing MCBs and RCD or RCBO protection is strongly recommended. An EICR will almost certainly produce C1 or C2 observations on such an installation.',
  },
  {
    question: 'Will a consumer unit replacement make my Sheffield property easier to sell?',
    answer:
      'A modern, compliant metal consumer unit with current RCD protection and a valid Electrical Installation Certificate is viewed positively by buyers and surveyors. It removes a common point of concern during property surveys and demonstrates that the electrical installation has been updated to modern standards. Conversely, an old plastic consumer unit with fuse wire or no RCD protection is frequently flagged in survey reports as requiring attention, which can lead to price negotiations or sale delays. The cost of a consumer unit replacement in Sheffield (typically £400 to £750) is generally recovered through a smoother sale process.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
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
    href: '/consumer-unit-replacement-newcastle',
    title: 'Consumer Unit Replacement Newcastle',
    description:
      'Consumer unit and fuse box replacement in Newcastle — costs, regulations, and qualified electricians.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
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
    id: 'why-replace',
    heading: 'Why Does a Consumer Unit Need Replacing?',
    content: (
      <>
        <p>
          Sheffield has a large proportion of pre-1960s housing, particularly the extensive terraced
          properties across inner suburbs such as Walkley, Crookes, Hillsborough, Heeley, and
          Sharrow. Many of these properties still have original or early consumer units that no
          longer meet current safety standards. Consumer unit replacement is one of the most common
          electrical jobs carried out by Sheffield electricians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdated protection</strong> — rewirable fuse wire, cartridge fuses, or old
                MCBs without accompanying RCD protection leave occupants exposed to electric shock
                risk that modern{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                requirements are designed to eliminate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic enclosure</strong> — a white or grey plastic consumer unit does not
                meet the non-combustible enclosure requirement introduced in 2016. It must be
                replaced with a compliant metal enclosure unit when the consumer unit is changed for
                any reason.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Increased demand</strong> — adding an electric vehicle charger, air source
                heat pump, or home office circuits may require additional ways in the consumer unit
                or a higher-rated incoming supply arrangement than the existing board can support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR findings</strong> — a periodic inspection (EICR) that produces C1
                (danger present) or C2 (potentially dangerous) observations relating to the consumer
                unit, overcurrent protection, or RCD protection requires remedial work within 28
                days.
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
          Amendment 2 to BS 7671:2008, effective 1 July 2016, introduced Regulation 421.1.201: in
          domestic premises, consumer units and similar switchgear assemblies shall be installed in
          a cabinet or enclosure constructed of non-combustible material. This requirement is
          retained in the current edition, BS 7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire containment</strong> — a fault causing arcing inside a consumer unit
                can generate extreme heat. A steel enclosure contains this heat; a plastic one can
                melt and ignite, turning an electrical fault into a structural fire. Sheffield Fire
                and Rescue Service has attended multiple incidents involving domestic consumer unit
                fires, underlining the importance of the metal enclosure requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Applies on replacement, not retrospectively</strong> — existing plastic
                consumer units in Sheffield properties are not required to be replaced immediately
                under Regulation 421.1.201. However, the moment any replacement takes place —
                whether due to age, fault, or capacity — the replacement must be a compliant metal
                unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR code for existing plastic units</strong> — a plastic consumer unit in
                an existing installation is typically coded C3 (improvement recommended) on an EICR,
                meaning the installation is Satisfactory overall but improvement is advised. This
                becomes a C2 or C1 concern only if the unit shows signs of heat damage or other
                deterioration.
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
          Regulation 411.3.3 of BS 7671 requires 30mA RCD protection for socket-outlet circuits
          rated up to 32A and for circuits serving bathroom and shower room locations (Regulation
          701). For Sheffield properties, this means a new consumer unit must incorporate one of the
          following protection arrangements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual-RCD consumer unit</strong> — circuits are divided into two groups, each
                protected by a 30mA RCD. This is the most economical option. The limitation is that
                a fault on any circuit in a group trips all circuits in that group, potentially
                causing loss of power to critical loads such as freezers or medical equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO consumer unit</strong> — each circuit has an individual RCBO combining
                MCB and RCD functions. A fault trips only the affected circuit. This is the
                preferred arrangement for new installations and costs somewhat more than a dual-RCD
                board due to the higher unit cost of RCBOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuisance tripping</strong> — older Sheffield properties may have appliances
                or wiring that causes nuisance RCD tripping. An RCBO arrangement limits the impact
                of this to a single circuit. If persistent tripping occurs, the underlying cause
                should be investigated rather than simply increasing the trip threshold.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Your Sheffield electrician should discuss the appropriate protection arrangement for your
          property during the survey visit. The choice between dual-RCD and full RCBO protection
          affects both the cost and the resilience of the installation.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-sheffield',
    heading: 'Part P Building Regulations in Sheffield',
    content: (
      <>
        <p>
          Consumer unit replacement is notifiable electrical work under Part P of the Building
          Regulations in England. Sheffield City Council is the local building control authority,
          but in practice the large majority of consumer unit replacements in Sheffield are
          self-certified by registered competent person electricians without the customer needing to
          interact with the council at all.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certification</strong> — an NICEIC, NAPIT, or ELECSA registered
                electrician notifies Sheffield City Council building control on your behalf within
                30 days of completing the work. You receive a Building Regulations Compliance
                Certificate directly from the scheme. No separate contact with the council is
                required by the householder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate</strong> — the electrician must also
                issue an{' '}
                <SEOInternalLink href="/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                detailing the new consumer unit and a Schedule of Test Results for all circuits
                tested. Retain these documents — they are required for property sales and insurance
                purposes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unregistered electricians</strong> — using an unregistered electrician means
                you must notify Sheffield City Council building control before work begins and
                arrange for an approved inspector to certify the completed work. This is slower and
                more expensive — always use a registered competent person for consumer unit work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs-en-61439',
    heading: 'BS EN 61439-3 — Consumer Unit Product Compliance',
    content: (
      <>
        <p>
          Consumer units installed in Sheffield properties must comply with BS EN 61439-3, the
          British Standard for distribution boards intended for use by ordinary persons. This
          standard sets minimum requirements for design, construction, performance, and marking of
          consumer units.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prospective short-circuit current</strong> — the consumer unit must be rated
                to withstand the prospective short-circuit current (PSCC) at the point of
                installation. Most Sheffield domestic supplies have a PSCC below 16kA, but this
                should be measured and recorded by your electrician. Underrated consumer units can
                fail catastrophically during a fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKCA marking</strong> — consumer units placed on the UK market must carry
                the UKCA mark following the UK's departure from EU product certification schemes.
                Reputable manufacturers including Hager, Schneider Electric (Acti 9), and Wylex
                supply UKCA-marked metal consumer units for UK installations. Your electrician
                should not install unbranded or uncertified units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine factory testing</strong> — compliant consumer units are tested
                during manufacture and this is supplemented by the site testing your electrician
                carries out under BS 7671 Part 6 (Inspection and Testing). The results of site
                testing are recorded in the Schedule of Test Results that forms part of the EIC.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs-sheffield',
    heading: 'Consumer Unit Replacement Costs in Sheffield (2026)',
    content: (
      <>
        <p>
          Sheffield offers competitive pricing for consumer unit replacement compared to larger
          cities such as Manchester or London. Labour costs in South Yorkshire are generally lower,
          and Sheffield electricians typically provide all-inclusive quotes covering parts,
          installation, testing, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small terrace (1–2 bed)</strong> — £380 to £520. Very common in Sheffield's
                inner suburbs. Usually 6 to 10 circuits, straightforward job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi or terrace</strong> — £480 to £680. The most common
                Sheffield property type. Up to 12 circuits typically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger detached property</strong> — £650 to £900. More ways required,
                potentially RCBO-per-circuit arrangement, longer on-site time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional work</strong> — earthing upgrades, main bonding, meter tails
                replacement, or smoke alarm installation can add £100 to £400 depending on the
                scope. Your electrician should identify these during the initial survey.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Obtain at least two written quotations from NICEIC or NAPIT registered electricians in
          Sheffield. Be cautious of unusually low quotes that do not explicitly include testing and
          certification — these are non-optional requirements under Part P.
        </p>
      </>
    ),
  },
  {
    id: 'sheffield-housing',
    heading: 'Sheffield Housing Stock and Consumer Unit Challenges',
    content: (
      <>
        <p>
          Sheffield's housing stock presents specific challenges for consumer unit replacement. The
          city has one of the highest proportions of Victorian and Edwardian terraced housing
          outside London, with large concentrations in S3, S6, S7, S10, and S11 postcode areas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Original wiring</strong> — some Sheffield terraces in areas such as Sharrow
                or Burngreave retain rubber-insulated or lead-sheathed wiring from pre-1950 rewires.
                If this wiring is still in situ, a consumer unit replacement alone is insufficient —
                a full rewire should be considered, as brittle insulation presents risks regardless
                of how good the new consumer unit is.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing systems</strong> — some Sheffield properties, particularly in
                outlying or rural areas of the city boundary, use TT earthing (earth electrode
                rather than PME). TT installations require an RCD at the origin as well as circuit
                protection. Your electrician must identify the earthing system before specifying the
                new consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student letting properties</strong> — Sheffield has a very large student
                population due to the University of Sheffield and Sheffield Hallam University. Many
                student letting properties in Broomhall, Crookesmoor, and Ecclesall Road require
                consumer unit upgrades as landlords bring properties up to EICR compliance standard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work in Sheffield',
    content: (
      <>
        <p>
          Consumer unit replacement is consistently one of the highest-demand electrical jobs in
          Sheffield, driven by the city's large stock of older housing, active private rented
          sector, and regular EICR-driven remedial work. Efficient on-site documentation lets
          Sheffield electricians complete more jobs per day and win follow-on work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Paperless EICs on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to record all circuit test results, complete the Electrical Installation
                  Certificate, and generate the PDF while still on site in Sheffield. Send the
                  certificate to your customer before you leave. No clipboards, no evening data
                  entry, no transcription errors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Upsell Remedial Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When your inspection uncovers old wiring, missing bonding, or additional circuits
                  needed, use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to quote the additional work while you are still on site. Customers in Sheffield
                  are far more likely to say yes when they can see the issue in front of them.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Sheffield electrical business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, instant PDF export, and professional quoting. Eliminate paperwork and win more work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementSheffieldPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Sheffield | Fuse Box Sheffield"
      description="Consumer unit replacement in Sheffield — metal enclosure rules, Part P Building Regulations, costs £400–750, BS EN 61439, NICEIC registered electricians. Guide for Sheffield homeowners and landlords 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Sheffield:{' '}
          <span className="text-yellow-400">Fuse Box Guide 2026</span>
        </>
      }
      heroSubtitle="Your complete guide to consumer unit replacement in Sheffield — the metal enclosure requirement, Part P notification, RCD and RCBO protection, costs of £400 to £750, and how to find a qualified NICEIC or NAPIT registered electrician in South Yorkshire."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Sheffield"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion with instant PDF export and schedule of test results. 7-day free trial, cancel anytime."
    />
  );
}
