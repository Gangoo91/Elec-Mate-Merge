import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  Home,
  ShieldCheck,
  PoundSterling,
  Settings,
  Thermometer,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Conversion Guides', href: '/garage-conversion-electrical' },
  { label: 'Garage Conversion Electrical Work', href: '/garage-conversion-electrical' },
];

const tocItems = [
  { id: 'attached-vs-detached', label: 'Attached vs Detached Garages' },
  { id: 'upgrading-the-supply', label: 'Upgrading the Electrical Supply' },
  { id: 'habitable-room-standard', label: 'Habitable Room Electrical Standard' },
  { id: 'heating-options', label: 'Heating Options' },
  { id: 'consumer-unit', label: 'Consumer Unit Considerations' },
  { id: 'part-p', label: 'Part P and Building Regulations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A garage being converted to a habitable room must have its electrical installation upgraded to full domestic dwelling standard under BS 7671:2018+A3:2024 — the basic garage supply (lighting, one or two sockets) is not sufficient.',
  'All electrical work in a garage conversion is notifiable under Part P of the Building Regulations 2010. An Electrical Installation Certificate (EIC) is legally required on completion.',
  'An attached garage fed from the main house consumer unit must have its circuits reviewed and upgraded — the existing garage sub-circuit is typically not rated for the demands of a habitable room.',
  'A detached garage being converted to living space will require a separate sub-board or consumer unit, either fed from the main house via SWA armoured cable or via a new DNO supply — specialist electrical design is required.',
  'Electric heating is the most common heating solution for garage conversions due to the difficulty of extending the gas central heating system. Underfloor heating, infrared panels, and electric panel heaters all have different circuit requirements.',
];

const faqs = [
  {
    question: 'Do I need to upgrade the electrics for a garage conversion?',
    answer:
      'Yes. A garage electrical installation is designed for basic workshop or storage use — typically a lighting circuit and one or two socket-outlets. When a garage is converted to a habitable room, the electrical installation must be upgraded to domestic dwelling standard under BS 7671. This means adequate socket-outlet provision, RCD protection on all socket circuits, appropriate lighting, heating circuits, smoke detection, and an Electrical Installation Certificate (EIC) issued on completion.',
  },
  {
    question: 'Does a garage conversion need Planning Permission and Building Regulations approval?',
    answer:
      'Most garage conversions do not require planning permission if the external appearance is not significantly altered, but building regulations approval is almost always required. This covers structural elements, fire safety, insulation, and ventilation. The electrical work forms part of the building regulations submission — specifically Part P (electrical safety). Using a competent person scheme registered electrician means the electrical element is self-certified. The overall building regulations approval must still be obtained from the local authority.',
  },
  {
    question: 'Can I use the existing garage consumer unit for the converted space?',
    answer:
      'If the garage has a sub-board fed from the house, the existing board may be reused if it has sufficient spare ways, is in good condition, and provides adequate RCD protection. However, many garage sub-boards are old and lack modern RCD protection. In most cases, replacing the sub-board with a modern unit is the more practical and cost-effective solution. The electrician should assess the existing board before advising on the best approach.',
  },
  {
    question: 'What heating options are suitable for a garage conversion?',
    answer:
      'The most common options are: electric underfloor heating (requires a dedicated circuit, thermostat with floor sensor, and RCD protection under Regulation 701.411.3.3 for wet rooms), electric panel heaters on a dedicated circuit with programmable thermostat, infrared heating panels (relatively simple installation), and extension of the gas central heating (requires a gas engineer and is more disruptive). The right choice depends on the proposed use of the space, insulation levels, and the client\'s budget.',
  },
  {
    question: 'Does a garage conversion need smoke detectors?',
    answer:
      'Yes. When a garage is converted to a habitable room, it must comply with BS 5839-6:2019 fire detection requirements. A mains-powered smoke alarm with battery backup (Grade D) must be installed in the new room and interlinked with existing alarms in the property. If the conversion creates a new room adjacent to an escape route, additional detectors on the escape route may be required.',
  },
  {
    question: 'How much does electrical work for a garage conversion cost?',
    answer:
      'Costs depend on the size of the garage and scope of the electrical work. A straightforward attached garage conversion with upgraded circuits, new consumer unit, heating, lighting, and sockets typically costs £1,500 to £3,000. A detached garage requiring a new SWA cable feed, sub-board, and full installation can cost £2,500 to £5,000. Always obtain at least three quotes from registered electricians and confirm the price includes the EIC and Part P notification.',
  },
  {
    question: 'What is the difference between an attached and detached garage conversion electrically?',
    answer:
      'An attached garage can usually be fed from the main house consumer unit directly using standard twin and earth cable run through the internal wall. A detached garage requires a separate supply — either SWA armoured cable buried in the ground from the house (which requires a sub-board or consumer unit in the garage) or a new DNO supply to the garage. The detached route is significantly more complex and expensive but provides a clean, independent installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/house-extension-electrical-guide',
    title: 'House Extension Electrical Guide',
    description: 'Circuit planning, consumer unit checks, Part P, and EIC for house extensions.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/loft-conversion-electrical-guide',
    title: 'Loft Conversion Electrical Guide',
    description: 'Smoke detection, escape route lighting, and Part P for loft conversions.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/outbuilding-electrical-installation',
    title: 'Outbuilding Electrical Installation',
    description: 'SWA armoured cable, trench depth, sub-board, and TT earthing for outbuildings.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the current wiring regulations for UK electricians.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'attached-vs-detached',
    heading: 'Attached vs Detached Garage Conversions',
    content: (
      <>
        <p>
          The electrical approach for a garage conversion differs significantly depending on whether
          the garage is attached to or detached from the main house. Understanding this distinction
          is essential for planning the electrical installation correctly.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Attached garage</strong> — shares a wall with the main house. New circuits
                can be run directly from the main consumer unit through the shared wall. This is the
                simpler and more cost-effective approach. The existing garage sub-circuit (if any)
                will be replaced or supplemented with properly rated circuits for the habitable
                room use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detached garage</strong> — requires a separate supply from the main house.
                This is typically achieved using SWA (steel wire armour) armoured cable buried in
                a trench between the house and the garage, feeding a sub-board or consumer unit
                in the garage. The armoured cable route, trench depth, and earthing arrangement
                must comply with BS 7671. See the{' '}
                <SEOInternalLink href="/outbuilding-electrical-installation">
                  outbuilding electrical installation guide
                </SEOInternalLink>{' '}
                for full details on the SWA cable requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In both cases, the existing garage electrical installation — typically consisting of a
          single lighting circuit and one or two socket-outlets on a basic sub-circuit — is wholly
          inadequate for habitable room use and must be replaced or significantly upgraded.
        </p>
      </>
    ),
  },
  {
    id: 'upgrading-the-supply',
    heading: 'Upgrading the Electrical Supply for Habitable Use',
    content: (
      <>
        <p>
          The first task when converting a garage electrically is to assess the existing supply
          and determine what needs to be upgraded. In most cases, this means installing entirely
          new circuits rather than modifying the existing ones.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assess the main house consumer unit</strong> — check for spare ways,
                main fuse rating, and RCD protection. If the consumer unit is old or lacks RCD
                protection, upgrading it as part of the garage conversion project is strongly
                advisable and may be required to provide adequate protection for the new circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing for the garage feed</strong> — if the garage is to be fed
                from the house consumer unit, the feed cable must be sized for the total load of
                all circuits in the converted garage. For a room with heating, lighting, and
                socket-outlets, the feed cable is typically 10mm² or 16mm² twin and earth (for
                an attached garage) or SWA armoured cable of appropriate cross-section (for a
                detached garage).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO involvement</strong> — if the main house supply cannot support the
                additional load of the converted garage (particularly with electric heating), the
                Distribution Network Operator (DNO) must be consulted about a supply upgrade.
                DNO upgrades can take several weeks to arrange and should be factored into the
                project timeline.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'habitable-room-standard',
    heading: 'The Habitable Room Electrical Standard',
    content: (
      <>
        <p>
          A converted garage used as a living room, bedroom, home office, or playroom must meet
          the same electrical standard as any other room in the house under BS 7671:2018+A3:2024.
          This is a significant step up from a typical garage installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket-outlet provision</strong> — a minimum of four to six double
                socket-outlet positions for a living room or bedroom use. All socket-outlet circuits
                must have RCD protection with a rated residual operating current not exceeding 30mA,
                under Regulation 411.3.3 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting</strong> — a dedicated lighting circuit with switched control.
                LED downlighters are a popular choice for converted garages with lower ceiling
                heights. Confirm that the driver type is compatible with the dimmer switch if
                dimming is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke detection</strong> — a mains-powered smoke alarm with battery
                backup (Grade D under BS 5839-6:2019), interlinked with the existing alarms in
                the house.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — the converted garage must have a proper
                earth connection via the main earthing terminal. Any metallic water or gas pipes
                entering the converted space must be bonded to earth under Regulation 544 of
                BS 7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'heating-options',
    heading: 'Heating Options for Converted Garages',
    content: (
      <>
        <p>
          Heating is one of the most important decisions in a garage conversion. Most garages are
          not connected to the gas central heating system, and extending the system is often costly
          and disruptive. Electric heating is therefore the most common solution.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric underfloor heating</strong> — the most popular option for
                converted garages with a concrete floor. A heating mat is installed under the
                floor covering and connected to a dedicated circuit with a thermostat and floor
                sensor. For a 15m² garage, a 2kW system on a 10A circuit is typical.
                The thermostat must be appropriate for the floor type — tile, laminate, and
                carpet all require different sensor configurations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric panel heaters</strong> — wall-mounted electric panel heaters with
                programmable thermostats are a lower-cost option. A 2kW panel heater requires a
                10A circuit. If multiple heaters are installed, a dedicated heating circuit or
                separate circuits for each heater should be used rather than connecting to the
                general socket ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Infrared heating panels</strong> — ceiling or wall-mounted infrared panels
                heat objects rather than air, making them efficient for well-insulated spaces.
                They can be connected via a standard 13A socket or hardwired on a dedicated circuit.
                For a permanent installation in a habitable room, hardwiring is preferred.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extending gas central heating</strong> — technically possible but requires
                a Gas Safe registered engineer to extend the pipework, a new radiator installation,
                and a check that the boiler has sufficient capacity for the additional load. For
                most garage conversions, the cost and disruption of extending gas heating makes
                electric heating the more practical choice.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit Considerations',
    content: (
      <>
        <p>
          The consumer unit serving the converted garage (whether it is the main house unit or a
          dedicated sub-board) must meet the requirements of BS 7671 for a domestic installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-combustible enclosure</strong> — under Regulation 421.1.201 of
                BS 7671, consumer units in domestic premises must have a non-combustible enclosure.
                Metal consumer unit enclosures are the standard solution. Older plastic-encased
                consumer units must be replaced if the unit is being upgraded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — all socket-outlet circuits must be protected by
                a 30mA RCD. For a sub-board serving a converted garage, a dual-RCD or RCBO consumer
                unit is appropriate. RCBOs (individual RCDs combined with circuit breakers) provide
                the advantage that a fault on one circuit does not trip the entire board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-board for detached garages</strong> — a detached garage conversion
                requires a consumer unit or sub-distribution board at the garage end of the SWA
                feed. The sub-board must have a main switch (isolator) and appropriate circuit
                breakers for each circuit. The earthing arrangement for the sub-board must be
                determined by the earthing system of the main house installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P and Building Regulations for Garage Conversions',
    content: (
      <>
        <p>
          All electrical work in a garage conversion is notifiable under Part P of the Building
          Regulations 2010. In addition, the overall garage conversion requires building regulations
          approval covering structure, fire safety, insulation, and ventilation.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — use a NICEIC, NAPIT, or ELECSA
                registered electrician to self-certify the electrical work under Part P. This
                avoids the need for a separate building control electrical inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC on completion</strong> — the electrician must issue an Electrical
                Installation Certificate (EIC) on completion. This document must be provided to
                the homeowner and retained with the building regulations completion certificate.
                Use the{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Elec-Mate EIC app
                </SEOInternalLink>{' '}
                to complete and issue the certificate on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consequences of non-compliance</strong> — without a valid EIC and Part P
                notification, the conversion cannot receive building regulations sign-off. This will
                affect the property's value, its insurability, and the ability to sell in the future.
                Retrospective regularisation is possible but involves an EICR on the existing
                installation and can be expensive.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Garage Conversion Electrical Contracts',
    content: (
      <>
        <p>
          Garage conversion electrical work is reliable, profitable, and accessible for domestic
          electricians. A full garage conversion — supply upgrade, lighting, sockets, heating
          circuit, smoke detection, testing, and EIC — typically generates £1,200 to £2,800 in
          revenue.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue the EIC Same Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC certificate app
                  </SEOInternalLink>{' '}
                  to complete and issue the EIC on site, including the full schedule of test
                  results. Clients appreciate same-day documentation, and it protects you if
                  questions arise later.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win with Professional Quotes</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to produce a detailed, itemised quote for the conversion electrical works. Include
                  all materials, labour, testing, EIC, and Part P notification in a single
                  professional document.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your garage conversion jobs with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for EIC certificates, quoting, and job management. Complete more jobs with less paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GarageConversionElectricalPage() {
  return (
    <GuideTemplate
      title="Garage Conversion Electrical Work | Wiring Guide UK"
      description="Complete guide to electrical work in a garage conversion. Upgrading from garage supply to habitable room standard, heating options, consumer unit considerations, Part P Building Regulations, and EIC certificate requirements under BS 7671."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Conversion Guide"
      badgeIcon={Settings}
      heroTitle={
        <>
          Garage Conversion Electrical Work:{' '}
          <span className="text-yellow-400">Wiring Guide for UK Homeowners</span>
        </>
      }
      heroSubtitle="Everything you need to know about electrical work in a garage conversion — upgrading from basic garage supply to full habitable room standard, heating options, consumer unit considerations, Part P notification, and the mandatory Electrical Installation Certificate."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garage Conversion Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Complete Garage Conversion EICs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, quoting, and Part P compliance. 7-day free trial, cancel anytime."
    />
  );
}
