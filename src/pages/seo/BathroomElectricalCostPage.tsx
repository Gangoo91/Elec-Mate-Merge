import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Wrench,
  FileCheck2,
  PoundSterling,
  Bath,
  Lightbulb,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Bathroom Electrical Cost', href: '/guides/bathroom-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Bathroom Electrical Work Overview' },
  { id: 'cost-breakdown', label: 'Cost Breakdown by Job Type' },
  { id: 'zones', label: 'Bathroom Zones Explained' },
  { id: 'labour-costs', label: 'Labour and Installation Costs' },
  { id: 'factors', label: 'Factors Affecting Price' },
  { id: 'regulations', label: 'Regulations and Part P' },
  { id: 'choosing-electrician', label: 'Choosing an Electrician' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Bathroom Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Bathroom electrical work in the UK typically costs between £300 and £1,500 depending on scope — from a simple fan or light replacement to a full bathroom rewire with underfloor heating.',
  'All electrical work in bathrooms is notifiable under Part P of the Building Regulations and must be carried out by a registered competent person or inspected by Building Control.',
  'BS 7671:2018+A3:2024 Section 701 governs the requirements for electrical installations in bathrooms, including zone classifications, IP ratings, and RCD protection.',
  'Regulation 411.3.2 requires that all circuits serving a bathroom must be protected by a 30mA RCD for additional protection against electric shock.',
  'Every accessory and fitting installed in a bathroom must have an IP rating appropriate for the zone in which it is located — Zone 0 requires IPX7 minimum, Zone 1 requires IPX4 minimum.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a bathroom in 2026?',
    answer:
      'A full bathroom rewire in 2026 typically costs between £800 and £1,500 depending on the number of circuits, fittings, and complexity of the installation. This includes new lighting circuits, extractor fan, shaver socket, heated towel rail connection, and any underfloor heating wiring. A straightforward bathroom with a ceiling light, extractor fan, and shaver socket sits at the lower end. A bathroom with multiple downlights, underfloor heating, electric shower, and a heated mirror pushes towards the upper end.',
  },
  {
    question: 'Do I need Part P sign-off for bathroom electrical work?',
    answer:
      'Yes. All electrical work in a room containing a bath or shower is notifiable under Part P of the Building Regulations in England and Wales. This applies even to seemingly minor work such as adding a light fitting or replacing an extractor fan. The work must be carried out by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) who can self-certify, or you must notify Building Control before starting and have the work inspected afterwards.',
  },
  {
    question: 'Can I install a standard light switch in a bathroom?',
    answer:
      'No. Standard plate switches must not be installed in a bathroom — they must be located outside the bathroom or be a pull-cord ceiling switch. Under BS 7671 Section 701, switchgear within the bathroom must be suitable for the zone and the IP rating requirements. Pull-cord switches are the standard solution within bathrooms. If you want a plate switch, it must be positioned outside the bathroom door.',
  },
  {
    question: 'What IP rating do bathroom lights need?',
    answer:
      'The required IP rating depends on the zone. Zone 0 (inside the bath or shower tray) requires a minimum of IPX7 (protection against temporary immersion). Zone 1 (directly above the bath or shower up to 2.25m from the floor) requires IPX4 minimum (splash-proof). Zone 2 (extending 0.6m horizontally from Zone 1) also requires IPX4. Outside the zones, standard fittings may be used provided they are not exposed to water splashes.',
  },
  {
    question: 'How much does it cost to install a bathroom extractor fan?',
    answer:
      'Installing a bathroom extractor fan typically costs between £150 and £350 including the fan unit, ducting, and labour. A basic timer fan (such as a Xpelair DX100T) costs around £40 to £70 for the unit. A humidity-sensing fan costs £60 to £120. Labour for a straightforward installation with existing ducting is 2 to 3 hours. If new ducting needs to be run through an external wall or to a soffit, the labour time increases and additional materials are needed.',
  },
  {
    question: 'Is RCD protection required for bathroom circuits?',
    answer:
      'Yes. Regulation 411.3.2 of BS 7671 requires additional protection by means of an RCD with a rated residual operating current not exceeding 30mA for all circuits serving the bathroom. This applies to lighting, power (shaver sockets), extractor fans, underfloor heating, and any other circuits within the bathroom. If your consumer unit does not have RCD protection on the bathroom circuits, this must be addressed as part of any bathroom electrical work.',
  },
  {
    question: 'Can I have a plug socket in a bathroom?',
    answer:
      'Standard 13A socket outlets must not be installed in a bathroom in the UK. The only socket outlet permitted within a bathroom is a shaver supply unit conforming to BS EN 61558-2-5 (often referred to as a shaver socket). These units incorporate an isolation transformer that limits the current available, making them safe in a wet environment. A shaver socket can be installed in Zone 2 or outside the zones, but not in Zone 0 or Zone 1.',
  },
  {
    question: 'How much does it cost to install bathroom underfloor heating?',
    answer:
      'Electric underfloor heating in a bathroom typically costs £300 to £600 for a standard-sized bathroom (4 to 8 square metres). This includes the heating mat or cable (£80 to £200), thermostat (£50 to £150), and electrician labour for connection and testing (£150 to £250). The heating element itself is usually laid by the tiler, but the electrical connection to the thermostat and consumer unit must be carried out by a qualified electrician. A dedicated circuit with RCD protection is required.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description:
      'If bathroom work requires a new RCD circuit, you may also need a consumer unit upgrade.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2026',
    description:
      'Full house rewire costs — including bathroom circuits as part of a larger project.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for bathroom electrical work on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote bathroom electrical work with itemised materials, labour, and professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Bathroom Electrical Work: What Is Involved?',
    content: (
      <>
        <p>
          Bathrooms are classified as special locations under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 701. The combination of water, steam, and exposed skin makes them one of the
          highest-risk environments for electric shock. Every piece of electrical work in a
          bathroom — from replacing a light fitting to installing underfloor heating — must comply
          with strict zoning rules, IP rating requirements, and RCD protection standards.
        </p>
        <p>
          Whether you are a homeowner planning a bathroom renovation or an electrician quoting
          bathroom electrical work, this guide covers the full cost breakdown for 2026. We cover
          every common bathroom electrical job, the regulations that apply, and the factors that
          affect pricing.
        </p>
        <p>
          Common bathroom electrical work includes: ceiling lights and downlights, extractor fans,
          shaver sockets, heated towel rail connections, electric underfloor heating, electric
          shower installations, heated mirrors, and full bathroom rewires as part of a renovation.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown by Job Type',
    content: (
      <>
        <p>
          Here are realistic 2026 costs for the most common bathroom electrical jobs, including
          materials, labour, testing, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Individual Job Costs</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extractor fan installation</strong> — £150 to £350. Includes fan unit (£40
                to £120), ducting, wiring from the lighting circuit or a dedicated spur, and
                connection to a pull-cord or light switch timer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathroom downlights (4 to 6 fittings)</strong> — £250 to £500. Includes
                IP65-rated LED downlights (£15 to £35 each), wiring, fire-rated housings, and
                testing. IP65 fittings are required in Zone 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shaver socket installation</strong> — £80 to £180. A shaver supply unit
                conforming to BS EN 61558-2-5 costs £25 to £60. Labour to install and wire: 1 to 2
                hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heated towel rail connection</strong> — £80 to £200. A fused connection
                unit (FCU) and wiring from a nearby circuit. The towel rail itself is a separate
                plumbing or purchase cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric underfloor heating connection</strong> — £300 to £600. Heating
                mat, thermostat, dedicated circuit from the consumer unit, and RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shower installation</strong> — £300 to £600. Requires a dedicated
                circuit from the consumer unit with appropriately rated cable (typically 10mm²
                for a 9.5kW shower), 45A MCB/RCBO, and pull-cord isolator switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full bathroom rewire</strong> — £800 to £1,500. All circuits replaced or
                newly installed: lighting, fan, shaver socket, towel rail, underfloor heating, and
                shower circuit. Includes testing and EIC.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'zones',
    heading: 'Bathroom Zones Explained',
    content: (
      <>
        <p>
          BS 7671 Section 701 divides bathrooms into zones that determine what equipment can be
          installed and what IP ratings are required. Understanding these zones is essential for
          both homeowners and electricians.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Zone 0</h3>
            <p className="text-white text-sm leading-relaxed">
              Inside the bath tub or shower basin itself. Only SELV (Separated Extra-Low Voltage)
              equipment rated at a maximum of 12V AC or 30V DC is permitted. Minimum IP rating:
              IPX7 (protection against temporary immersion). No switches, no socket outlets, no
              connection boxes.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Zone 1</h3>
            <p className="text-white text-sm leading-relaxed">
              Above the bath or shower to a height of 2.25m from the finished floor level.
              Equipment must be rated IPX4 minimum. Only fixed current-using equipment suitable
              for use in this zone is permitted — such as electric showers, IP-rated light
              fittings, and instantaneous water heaters. No socket outlets.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Zone 2</h3>
            <p className="text-white text-sm leading-relaxed">
              Extends 0.6m horizontally beyond Zone 1 and to 2.25m height. Equipment must be rated
              IPX4 minimum. Luminaires, fans, heaters, and shaver supply units (BS EN 61558-2-5)
              are permitted in this zone.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Outside Zones</h3>
            <p className="text-white text-sm leading-relaxed">
              Any area beyond Zone 2. Standard accessories and fittings may be used, provided
              they are not exposed to direct water spray. Standard plate switches are still not
              recommended — use pull-cord switches or locate plate switches outside the bathroom.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'labour-costs',
    heading: 'Labour and Installation Costs',
    content: (
      <>
        <p>
          Labour rates for bathroom electrical work are slightly higher than general domestic work
          because of the additional care required for zone compliance, IP-rated fittings, and the
          testing and certification requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician day rate (2026)</strong> — £250 to £400 depending on region.
                London and the South East sit at the higher end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple bathroom job (fan or light swap)</strong> — 1 to 3 hours labour.
                Most electricians will quote a fixed price of £100 to £200 plus materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full bathroom first fix and second fix</strong> — 1 to 2 days across two
                visits (first fix before tiling, second fix after). Labour: £400 to £700.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — £35 to £80 through the electrician's
                competent person scheme. This is included in most quotes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'factors',
    heading: 'Factors Affecting Price',
    content: (
      <>
        <p>
          Several factors can push the cost of bathroom electrical work up or down:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access</strong> — bathrooms with loft access above make cable runs
                straightforward. Bathrooms on ground floors below a first floor with no accessible
                void require lifting floorboards or channelling walls, adding time and cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing wiring condition</strong> — if the existing bathroom circuits are
                in good condition and have RCD protection, adding a fitting is simpler. If the
                wiring is old (no earth, no RCD), a more extensive upgrade is needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit capacity</strong> — if a new dedicated circuit is needed
                (electric shower, underfloor heating) and the consumer unit has no spare ways, a
                board upgrade may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fitting specification</strong> — basic IP65 downlights cost £15 each;
                designer IP65 downlights can cost £50 or more. The specification of fittings
                significantly affects the material cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coordination with other trades</strong> — bathroom renovations usually
                involve plumbers, tilers, and carpenters. If the electrician needs to make
                multiple visits (first fix and second fix), this adds to the labour cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Part P',
    content: (
      <>
        <p>
          All electrical work in a room containing a bath or shower is notifiable under Part P of
          the Building Regulations in England and Wales. This includes seemingly minor work such as
          replacing a light fitting or adding a shaver socket.
        </p>
        <p>
          The key regulatory requirements for bathroom electrical work under BS 7671 Section 701
          include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 411.3.2)</strong> — all circuits serving the
                bathroom must be protected by a 30mA RCD. This provides additional protection
                against electric shock in a high-risk environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone compliance (Section 701)</strong> — all equipment must be suitable for
                the zone in which it is installed, with appropriate IP ratings and SELV where
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding (Regulation 701.415.2)</strong> — supplementary
                equipotential bonding may be required connecting all simultaneously accessible
                exposed and extraneous conductive parts, unless all circuits are RCD-protected
                and the main bonding is satisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — an Electrical Installation Certificate (EIC) must
                be issued for new circuits. A Minor Electrical Installation Works Certificate
                (MEIWC) may be appropriate for like-for-like replacements on existing circuits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician for Bathroom Work',
    content: (
      <>
        <p>
          Bathroom electrical work is specialist work that must be carried out by a qualified
          electrician registered with a competent person scheme. Here is what to look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — NICEIC, NAPIT, or ELECSA
                registration is essential for Part P self-certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience with bathroom installations</strong> — ask whether they
                regularly carry out bathroom work and understand the zone requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised quote</strong> — the quote should list each item (fan, lights,
                shaver socket, circuits) with materials and labour separated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coordination willingness</strong> — a good electrician will coordinate with
                your bathroom fitter on first fix and second fix timing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Bathroom Electrical Work',
    content: (
      <>
        <p>
          Bathroom work is profitable and recurring — every bathroom renovation needs an
          electrician. Here are tips for quoting bathroom jobs effectively:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Itemise Everything</h4>
                <p className="text-white text-sm leading-relaxed">
                  Quote each fitting separately — downlights, fan, shaver socket, towel rail
                  connection, underfloor heating, shower circuit. This makes the quote transparent
                  and allows the customer to adjust scope. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  for professional PDF quotes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Include Certification in Your Price</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always include Part P notification and the EIC or MEIWC in your quote. Complete
                  the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    EIC on your phone
                  </SEOInternalLink>{' '}
                  on site and email it to the customer before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote bathroom electrical work accurately"
          description="Elec-Mate's quoting app lets you build itemised bathroom quotes with real trade pricing. AI cost engineering checks your prices. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BathroomElectricalCostPage() {
  return (
    <GuideTemplate
      title="Bathroom Electrical Cost 2026 | UK Price Guide"
      description="How much does bathroom electrical work cost in 2026? Complete UK price guide covering extractor fans, downlights, shaver sockets, electric showers, underfloor heating, and full bathroom rewires. Realistic trade prices and labour rates."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Bathroom Electrical Cost:{' '}
          <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does bathroom electrical work really cost? From extractor fans and downlights to electric showers and underfloor heating — this guide covers every common bathroom electrical job with realistic 2026 pricing, zone requirements, and regulation compliance."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Bathroom Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Bathroom Electrical Work with Confidence"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for itemised quoting, on-site certification, and AI cost engineering. 7-day free trial, cancel anytime."
    />
  );
}
