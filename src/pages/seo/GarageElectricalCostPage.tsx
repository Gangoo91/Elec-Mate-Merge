import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Home,
  Zap,
  AlertTriangle,
  FileCheck2,
  Building2,
  Wrench,
  ShieldCheck,
  Car,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Cost Guides', href: '/guides/electrical-cost-guides' },
  { label: 'Garage Electrical Cost', href: '/garage-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'detached-garage', label: 'Detached Garage Costs' },
  { id: 'integral-garage', label: 'Integral Garage Costs' },
  { id: 'armoured-cable', label: 'Armoured Cable & Trenching' },
  { id: 'consumer-unit', label: 'Garage Consumer Unit' },
  { id: 'ev-charger', label: 'EV Charger Add-On' },
  { id: 'building-regs', label: 'Building Regulations & Part P' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A detached garage electrical installation typically costs £800 to £2,000, with the main variable being the length of the armoured cable run from the house and whether trenching through a driveway or garden is required.',
  'An integral (attached) garage electrical installation is simpler, costing £400 to £800, as the cable run is short and no external trenching is required.',
  'SWA (Steel Wire Armoured) cable is required for any underground cable run to a detached garage. Trenching, sand bedding, and cable covers add £20 to £50 per metre to the installation cost.',
  'A dedicated consumer unit in a detached garage is strongly recommended and is required under BS 7671 where the supply enters at a point remote from the main board. Expect to pay £300 to £600 for a small garage consumer unit.',
  'Adding a 7kW EV charger to a garage installation costs an additional £600 to £1,200 (excluding the charger unit), but if the consumer unit and cable are being installed anyway, the marginal cost of adding an EV circuit is much lower.',
];

const faqs = [
  {
    question: 'How much does it cost to wire a detached garage?',
    answer:
      'Wiring a detached garage typically costs £800 to £2,000 for a complete installation. This includes SWA armoured cable from the house consumer unit, trenching if an underground route is required, a small consumer unit in the garage, lighting and socket circuits, and testing and certification. The main cost variable is the cable run length — a 10-metre run across a garden costs significantly less than a 30-metre run under a concrete driveway.',
  },
  {
    question: 'What type of cable is used to supply a garage?',
    answer:
      'The underground supply cable to a detached garage must be Steel Wire Armoured (SWA) cable — typically 6mm² twin core and earth for a standard domestic supply, or 10mm² if the garage will have an EV charger. SWA cable is buried at a minimum depth of 500mm in a garden (450mm under a concrete slab) with sand bedding below and above, and bright yellow cable covers over the top to warn future excavators. Above-ground SWA runs on the exterior of a building are also acceptable and avoid the cost of trenching.',
  },
  {
    question: 'Do I need a consumer unit in my garage?',
    answer:
      'For a detached garage, yes — a dedicated consumer unit (sometimes called a distribution board or sub-board) is required at the point where the supply enters the garage. This provides local overcurrent and RCD protection for all circuits within the garage. A small consumer unit with two to four ways is sufficient for most domestic garages. For an integral garage, it is common for the garage circuits to be on the main house consumer unit, though a local garage board gives better fault discrimination.',
  },
  {
    question: 'How deep does the cable need to be buried?',
    answer:
      'Under a garden or lawn, SWA cable must be buried at a minimum depth of 500mm (measured to the top of the cable). Under a concrete slab, path, or driveway, the minimum depth is 450mm. The cable should be laid on a 50mm bed of sharp sand, with a further 50mm of sand above before backfilling with soil or reinstating the hard surface. Bright yellow cable covers (warning tape) must be placed 150mm above the cable to alert future excavators.',
  },
  {
    question: 'Can I use a normal twin and earth cable to supply my garage?',
    answer:
      'No. PVC-insulated twin and earth cable (the standard house wiring cable) is not suitable for underground use or external surface use without additional protection. For an underground run, SWA armoured cable is required. For a surface run on an exterior wall, SWA or MICC cable in conduit is required. Using standard twin and earth underground is unsafe and will result in an EIC failure.',
  },
  {
    question: 'Does garage electrical work need Building Regulations approval?',
    answer:
      'Yes. Electrical work in a garage — including supplying a new garage, installing a consumer unit, and adding circuits — is notifiable under Part P of the Building Regulations. If the electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA), they self-certify the work and notify building control. You receive a Building Regulations Compliance Certificate and an Electrical Installation Certificate (EIC).',
  },
  {
    question: 'How much does trenching for a garage cable cost?',
    answer:
      'Trenching costs depend on the surface type and length of run. Through a garden or lawn, expect to pay £15 to £25 per metre for digging, cable cover installation, and reinstatement. Through an existing concrete driveway, costs rise to £30 to £60 per metre due to breaking out and reinstating the concrete. A typical 15-metre run through a garden adds £225 to £375 to the installation cost. Running the cable above ground along a fence or exterior wall avoids trenching costs but is less aesthetically pleasing.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/outbuilding-electrical-cost',
    title: 'Outbuilding Electrical Cost',
    description: 'Costs for supplying a garden office, workshop, or outbuilding with electricity.',
    icon: Building2,
    category: 'Cost Guide',
  },
  {
    href: '/house-extension-electrical-cost',
    title: 'House Extension Electrical Cost',
    description: 'Single and double-storey house extension electrical installation costs.',
    icon: Home,
    category: 'Cost Guide',
  },
  {
    href: '/guides/ev-charger-installation-cost',
    title: 'EV Charger Installation Cost',
    description: 'Full breakdown of home EV charger installation costs and grant eligibility.',
    icon: Car,
    category: 'Cost Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional garage and outbuilding electrical quotes from your phone.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Garage Electrical Installation — What to Expect',
    content: (
      <>
        <p>
          Whether you are wiring a detached garage for the first time or upgrading an existing
          supply, a properly installed garage electrical system transforms the space. Lighting,
          power tools, EV charging, and security are all possible with the right installation. The
          key variables that affect cost are whether the garage is attached or detached, the length
          of the cable run, and whether trenching is required.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detached garage (standard)</strong> — £800 to £2,000. Includes SWA cable,
                trenching through garden, small consumer unit, lighting, and socket circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integral (attached) garage</strong> — £400 to £800. No external cable run
                required. Circuits fed from the main house consumer unit through the party wall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger add-on</strong> — £600 to £1,200 additional (excluding the
                charger unit). Significantly cheaper when done at the same time as the garage wiring
                rather than as a separate job later.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All garage electrical installations are notifiable under Part P of the Building
          Regulations. A registered competent person scheme electrician self-certifies the work
          without a separate building control application.
        </p>
      </>
    ),
  },
  {
    id: 'detached-garage',
    heading: 'Detached Garage Electrical Costs',
    content: (
      <>
        <p>
          A detached garage installation involves running an armoured cable from the main house
          consumer unit to the garage, typically underground. The installation scope and cost break
          down as follows:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short run (up to 10 metres, garden)</strong> — £800 to £1,200. Typically one
                day's work. Includes 6mm² SWA cable, shallow trench through lawn, small consumer
                unit, one lighting circuit, one socket circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium run (10–25 metres, mixed surfaces)</strong> — £1,200 to £1,600.
                Longer cable run, possible trenching through path or patio, increased materials
                cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long run (over 25 metres, or under concrete driveway)</strong> — £1,600 to
                £2,000+. Under-driveway cable requires diamond cutting or boring through the
                concrete slab, significant reinstatement, and potentially a larger cable size to
                account for volt drop (Regulation 525 of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>
                ).
              </span>
            </li>
          </ul>
        </div>
        <p>
          On very long runs, the electrician should calculate volt drop using the design current and
          cable impedance. A 6mm² SWA cable on a 30-metre run with a 40A supply may have acceptable
          volt drop; a 10mm² cable may be required on longer runs or where an EV charger adds
          significant load.
        </p>
      </>
    ),
  },
  {
    id: 'integral-garage',
    heading: 'Integral Garage Electrical Costs',
    content: (
      <>
        <p>
          An integral or attached garage shares a wall with the house, making the electrical
          installation significantly simpler. There is no external cable run, no armoured cable, and
          no trenching. The circuits are fed from the main house consumer unit through the party
          wall.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic integral garage (lighting and sockets)</strong> — £400 to £600. One
                lighting circuit, one socket circuit (ring main or radial), tested and certified.
                Consumer unit has spare capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integral garage with consumer unit upgrade</strong> — £800 to £1,200. New
                18th Edition compliant steel consumer unit in the house, plus all garage circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integral garage with EV charger</strong> — £1,000 to £1,800. Dedicated 32A
                EV charger circuit, consumer unit work if required, and charger installation. Does
                not include the cost of the charger unit itself.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For an integral garage, standard 2.5mm² twin and earth cable is acceptable for the socket
          circuit inside the garage wall, provided it is run in a safe zone or mechanically
          protected. The supply from the house consumer unit to the garage can be via the party wall
          without armoured cable if entirely within the building structure.
        </p>
      </>
    ),
  },
  {
    id: 'armoured-cable',
    heading: 'SWA Armoured Cable and Trenching',
    content: (
      <>
        <p>
          The underground supply to a detached garage must use SWA (Steel Wire Armoured) cable. This
          is a robust cable designed for direct burial in the ground and provides mechanical
          protection against accidental damage from future excavation.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard domestic supply: 6mm² SWA</strong> — suitable for most domestic
                garages with lighting, sockets, and a small workshop. Typically 40A or 50A MCB
                protection at the main board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger supply: 10mm² SWA</strong> — a 7kW EV charger draws 32A
                continuously. On a longer cable run, 10mm² SWA is required to keep volt drop within
                the 3% limit for the final circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burial depth: 500mm (garden), 450mm (under hard standing)</strong> — as
                required by the IET On-Site Guide and Wiring Matters guidance. Sand bedding above
                and below, plus cable covers, are mandatory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead alternative</strong> — where trenching is not feasible, an overhead
                supply on a catenary wire is an option. Minimum height of 3.5m above ground (5.2m
                over a vehicle route). Cheaper than cutting through a concrete driveway but less
                aesthetically pleasing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Garage Consumer Unit',
    content: (
      <>
        <p>
          A detached garage must have its own local consumer unit (distribution board) at the point
          where the supply enters the building. This provides protection for the garage circuits
          independently of the main house board.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small 4-way consumer unit</strong> — £300 to £450 fitted. Suitable for a
                standard garage with one lighting circuit, one socket circuit, and one or two
                spares. Steel enclosure, dual RCD or RCBO protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger 6–8 way consumer unit</strong> — £400 to £600 fitted. Accommodates an
                EV charger circuit, workshop power circuit, outdoor sockets, and a security lighting
                circuit in addition to the standard circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation switch</strong> — a lockable isolator on the garage consumer unit
                is best practice, allowing the supply to the garage to be safely isolated.
                Particularly useful if the garage is let to a tenant or shared.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ev-charger',
    heading: 'EV Charger Add-On to Garage Installation',
    content: (
      <>
        <p>
          Adding an EV charger to a garage electrical installation is increasingly common. If you
          are already having the garage wired, the additional cost of adding an EV charger circuit
          is much lower than having it installed as a standalone job at a later date.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>7kW (32A) home charger circuit</strong> — adds £200 to £400 to the
                installation cost if done at the same time as the garage wiring. The main cable and
                consumer unit costs are already covered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>As a standalone job</strong> — £600 to £1,200 for the EV charger circuit and
                installation (not including the charger unit itself, which costs £500 to £900 for a
                quality smart charger).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing for EV</strong> — a 7kW charger requires a 32A dedicated
                circuit. At 32A continuous, the supply SWA cable must be sized for this current with
                appropriate correction factors for burial depth and thermal insulation. On runs over
                20 metres, 10mm² SWA is typically required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV grant eligibility</strong> — the Electric Vehicle Infrastructure Grant
                (formerly OZEV) is no longer available to most domestic properties but may still
                apply in certain circumstances. Check current eligibility with the Office for Zero
                Emission Vehicles (OZEV) before quoting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations and Part P',
    content: (
      <>
        <p>
          Garage electrical installations are notifiable under Part P of the Building Regulations
          (England and Wales). This applies whether the garage is detached or integral, and
          regardless of whether the work is a full new installation or an upgrade to an existing
          one.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — electricians registered with
                NICEIC, NAPIT, ELECSA, or another approved scheme self-certify the work and notify
                building control. You receive a Building Regulations Compliance Certificate and an
                EIC on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate</strong> — the{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> documents the
                design, construction, inspection, and test results. It is your property's compliance
                evidence when you sell — solicitors routinely request it for garage and outbuilding
                electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger notification</strong> — EV charger installations have an
                additional notification requirement under the Office for Zero Emission Vehicles
                scheme. Most certified EV charger installers handle this automatically.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Garage Electrical Work',
    content: (
      <>
        <p>
          Garage electrical installations are a great bread-and-butter job for domestic
          electricians. The work is straightforward, the scope is well-defined, and adding an EV
          charger as an upsell is easy to justify when the main cable and consumer unit are already
          being installed.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Survey the Cable Route First</h4>
                <p className="text-white text-sm leading-relaxed">
                  Never quote a detached garage job without walking the cable route. A 10-metre
                  garden run and a 25-metre run under a concrete driveway are entirely different
                  jobs. Measure the route, identify obstacles, and quote the trenching separately as
                  a line item.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Car className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Always Offer the EV Charger</h4>
                <p className="text-white text-sm leading-relaxed">
                  If the customer has a car, offer the EV charger option. On a new garage
                  installation, adding a 32A EV circuit costs far less than a standalone job. Use
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to show the cost with and without the EV charger option — most customers choose
                  the upgrade when the price difference is clear.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote garage electrical installations professionally with Elec-Mate"
          description="Create itemised garage electrical quotes with armoured cable, trenching, consumer unit, and EV charger options. Issue EICs on site. Join 1,000+ UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GarageElectricalCostPage() {
  return (
    <GuideTemplate
      title="Garage Electrical Installation Cost UK 2025 | Garage Wiring Prices"
      description="Garage electrical installation costs in the UK for 2025. Detached garage from £800–£2,000, integral garage £400–£800. SWA armoured cable, trenching, consumer unit, and EV charger add-on costs explained."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Garage Electrical Installation Cost UK 2025:{' '}
          <span className="text-yellow-400">Garage Wiring Prices</span>
        </>
      }
      heroSubtitle="Detailed breakdown of garage electrical installation costs in the UK for 2025 — detached garage from £800, integral garage from £400, SWA armoured cable and trenching costs, garage consumer unit, EV charger add-ons, and Part P compliance."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garage Electrical Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Your Garage Electrical Installation in Minutes"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to create professional garage electrical quotes with armoured cable, trenching, and EV charger options. 7-day free trial, cancel anytime."
    />
  );
}
