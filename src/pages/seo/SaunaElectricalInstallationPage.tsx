import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Sauna Electrical Installation', href: '/guides/sauna-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Sauna Electrical Overview' },
  { id: 'heater-sizing', label: 'Heater Sizing and Supply' },
  { id: 'special-location', label: 'Special Location Requirements' },
  { id: 'cable-temperature', label: 'Cable and Temperature Ratings' },
  { id: 'installation-steps', label: 'Step-by-Step Installation' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'costs', label: 'Realistic Pricing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Sauna heaters typically draw 4.5kW to 9kW for domestic units, requiring a dedicated 20A to 40A radial circuit. Larger commercial saunas may require three-phase supplies up to 18kW or more.',
  'BS 7671 Section 703 (saunas and steam rooms) applies. The sauna interior is divided into temperature zones — Zone 1 (above the heater) and Zone 2 (the rest of the room) — with strict limits on what equipment can be installed in each zone.',
  'All wiring within the sauna room must use heat-resistant cable rated for the temperatures encountered. Standard PVC-insulated cable (rated 70°C) must not be used inside the sauna — use silicone rubber or XLPE cable rated to at least 170°C.',
  'RCD protection is mandatory under BS 7671 Regulation 411.3.3. A 30mA RCBO on the dedicated circuit is the standard approach.',
  'An Electrical Installation Certificate (EIC) must be issued, and the work must be notified under Part P as it involves a special location.',
];

const faqs = [
  {
    question: 'What size circuit does a sauna heater need?',
    answer:
      'Domestic sauna heaters range from 4.5kW to 9kW. A 4.5kW heater draws approximately 20A and needs a 20A circuit with 4.0mm² cable. A 6kW heater draws approximately 26A and needs a 32A circuit with 6.0mm² cable. A 9kW heater draws approximately 39A and needs a 40A circuit with 10.0mm² cable. Always check the manufacturer data plate — the rated current is the definitive figure, not a calculation from kW. The circuit must be a dedicated radial circuit from the consumer unit. Never share a sauna heater circuit with other loads.',
  },
  {
    question: 'What type of cable can be used inside a sauna?',
    answer:
      'Standard PVC-insulated cable (6242Y twin-and-earth) is rated for a maximum conductor temperature of 70°C. Inside a sauna, ambient temperatures can reach 100°C to 120°C in the upper zones. PVC cable would soften, degrade, and eventually fail. All wiring within the sauna room must use heat-resistant cable — silicone rubber insulated cable rated to 170°C or 180°C is the standard choice. XLPE (cross-linked polyethylene) cable rated to 90°C can be used in the lower zones where temperatures remain below 90°C but is not suitable for the upper zones or near the heater.',
  },
  {
    question: 'What are the BS 7671 Section 703 zones for a sauna?',
    answer:
      'BS 7671 Section 703 divides the sauna room into zones based on temperature. Zone 1 is the area directly above and within a horizontal distance of the heater — only the heater and its dedicated wiring may be in this zone. Zone 2 covers the rest of the sauna room. In Zone 2, luminaires and the sauna control sensor may be installed, but they must be heat-resistant and suitable for the zone temperature. No socket outlets are permitted inside the sauna room. The sauna control unit and any switching must be located outside the sauna room.',
  },
  {
    question: 'Does a sauna need RCD protection?',
    answer:
      'Yes. BS 7671 Regulation 411.3.3 requires additional protection by a 30mA RCD for the sauna heater circuit. The sauna is classified as a special location under Section 703, which reinforces this requirement. An RCBO on the dedicated way at the consumer unit is the standard approach — it combines overcurrent protection and earth fault protection without affecting other circuits if it trips.',
  },
  {
    question: 'Can I install a sauna in a bathroom?',
    answer:
      'A sauna cabin can be installed within a room that also contains a bath or shower, but the installation must comply with both BS 7671 Section 701 (bathrooms) and Section 703 (saunas). The sauna cabin itself creates its own zoning (Section 703 zones), but the wider room zones from Section 701 also apply to any equipment outside the sauna cabin. In practice, this means the sauna cabin must be positioned to avoid conflicts between the two sets of zones — the sauna control unit, for example, must be outside the sauna room but also outside Zone 1 of the bathroom. Careful planning at the survey stage avoids problems.',
  },
  {
    question: 'How much does a sauna electrical installation cost?',
    answer:
      'A typical domestic sauna electrical installation costs between £400 and £850. A straightforward installation with a short cable run (under 10 metres), 32A circuit, and RCBO typically costs £400 to £550. Longer cable runs, larger circuits (40A), and installations requiring heat-resistant cable through walls or ceilings will be at the higher end (£600 to £850). These prices include materials (cable, RCBO, connection unit, heat-resistant cable, fireproof junction box), labour (half a day to a full day), testing, and the EIC certificate. They do not include the sauna heater, sauna cabin, or any building work.',
  },
  {
    question: 'Does a sauna need a dedicated isolator?',
    answer:
      'Yes. A dedicated isolator or fused connection unit must be installed outside the sauna room to allow the heater to be isolated for maintenance. The isolator must be accessible and clearly labelled. Many sauna heaters include a control unit that incorporates an isolator function — check the manufacturer documentation. If the control unit does not provide full isolation, install a separate double-pole isolator outside the sauna room.',
  },
  {
    question: 'Can I use a plug-in sauna heater?',
    answer:
      'Some small sauna heaters (typically under 3kW) are sold with a 13A plug for connection to a standard socket outlet. These are at the limit of a 13A circuit and must only be used on a dedicated socket with RCD protection. However, most domestic sauna heaters (4.5kW and above) must be hardwired to a dedicated circuit. The heater connection is typically made at a fixed connection unit or terminal block outside the sauna room, with heat-resistant cable running from there through the wall into the sauna and up to the heater.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for sauna heater circuits with voltage drop and derating calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Verify voltage drop on cable runs to sauna installations.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/hot-tub-electrical-connection',
    title: 'Hot Tub Electrical Connection',
    description:
      'Related special location installation with dedicated circuits and RCD protection.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for sauna installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description:
      'Zoning requirements for bathrooms — relevant if a sauna cabin is installed in a bathroom.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 covering testing of special location installations.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Sauna Electrical Installation: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Domestic sauna installations have become increasingly popular in the UK. Whether it is a
          purpose-built sauna room, a barrel sauna in the garden, or a sauna cabin within a
          bathroom, the electrical installation requires careful attention to heat resistance,
          zoning, and safety.
        </p>
        <p>
          Sauna electrical work falls under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 703 (rooms and cabins containing sauna heaters). This section imposes specific
          requirements on wiring methods, cable types, equipment zoning, and protective measures
          that go beyond a standard domestic circuit.
        </p>
        <p>
          The most critical difference from standard installations is the temperature environment.
          Sauna rooms routinely reach 80°C to 100°C — well above the maximum operating temperature
          of standard PVC-insulated cable. Using the wrong cable type inside a sauna is a genuine
          fire risk.
        </p>
      </>
    ),
  },
  {
    id: 'heater-sizing',
    heading: 'Heater Sizing and Supply Requirements',
    content: (
      <>
        <p>
          Sauna heater selection is based on the volume of the sauna room. The general rule is 1kW
          per cubic metre of sauna space, with adjustments for insulation quality and glazing:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li>
              <strong>Small sauna (3 to 5m³):</strong> 4.5kW heater — 20A circuit, 4.0mm² cable
            </li>
            <li>
              <strong>Medium sauna (5 to 8m³):</strong> 6kW to 8kW heater — 32A circuit, 6.0mm²
              cable
            </li>
            <li>
              <strong>Large sauna (8 to 12m³):</strong> 9kW heater — 40A circuit, 10.0mm² cable
            </li>
            <li>
              <strong>Commercial sauna (12m³+):</strong> 12kW to 18kW+ — three-phase supply, consult
              manufacturer
            </li>
          </ul>
        </div>
        <p>
          Verify the existing supply has sufficient spare capacity for the heater. A 9kW heater on a
          property with a 60A main fuse and existing loads of 40A during peak times may require a
          supply upgrade. Check maximum demand before committing to the installation.
        </p>
      </>
    ),
  },
  {
    id: 'special-location',
    heading: 'Special Location Requirements: BS 7671 Section 703',
    content: (
      <>
        <p>
          BS 7671 Section 703 defines the requirements for rooms and cabins containing sauna
          heaters. The key requirements are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong> — the area where the sauna heater is installed. Only the
                heater and its dedicated wiring are permitted in Zone 1. The heater must be
                installed according to the manufacturer instructions with minimum clearances to
                combustible materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong> — the remainder of the sauna room. Luminaires and
                temperature sensors are permitted in Zone 2 provided they are suitable for the
                temperature (heat resistant). No socket outlets, junction boxes, or other
                accessories are permitted inside the sauna room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No socket outlets inside</strong> — socket outlets must not be installed
                inside the sauna room under any circumstances. The sauna control unit and any
                switching must be located outside the sauna room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipotential bonding</strong> — accessible extraneous-conductive-parts
                within the sauna (metal bench supports, metallic door handles, etc.) must be
                connected by supplementary equipotential bonding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-temperature',
    heading: 'Cable Types and Temperature Ratings',
    content: (
      <>
        <p>
          This is the single most important aspect of sauna electrical installation. Standard PVC
          cable will fail in a sauna environment. The cable types suitable for sauna installations
          are:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Silicone Rubber Cable (170°C to 180°C)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The standard choice for wiring inside the sauna room, including the heater connection.
              Silicone rubber insulation withstands the high temperatures in Zone 1 and Zone 2.
              Available in single-core (for use in conduit or trunking) or multi-core. Must be
              supported with heat-resistant fixings — standard plastic cable clips will melt.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">XLPE Cable (90°C)</h3>
            <p className="text-white text-sm leading-relaxed">
              Cross-linked polyethylene insulation is rated to 90°C conductor temperature. It can be
              used in the lower zones of the sauna where ambient temperatures remain below 80°C, but
              it is not suitable for the upper zones or near the heater. In practice, most
              electricians use silicone rubber throughout the sauna room for simplicity and safety.
            </p>
          </div>
        </div>
        <p>
          Outside the sauna room (from the consumer unit to the wall penetration), standard PVC
          cable is acceptable as it is in a normal temperature environment. The transition from
          standard cable to heat-resistant cable should be made in a junction box outside the sauna
          room.
        </p>
      </>
    ),
  },
  {
    id: 'installation-steps',
    heading: 'Step-by-Step Installation',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Survey</strong> — check heater kW rating, sauna room dimensions, cable route,
              consumer unit spare capacity, and earthing arrangement.
            </li>
            <li>
              <strong>Install RCBO</strong> — fit an appropriately rated RCBO on a dedicated way at
              the consumer unit. Label as "Sauna Heater".
            </li>
            <li>
              <strong>Run cable to sauna room</strong> — standard PVC cable from the consumer unit
              to a junction box or connection unit outside the sauna room wall.
            </li>
            <li>
              <strong>Transition to heat-resistant cable</strong> — at the junction box, connect to
              silicone rubber cable. Route through the wall into the sauna room and up to the heater
              position. Use heat-resistant fixings inside the sauna.
            </li>
            <li>
              <strong>Connect the heater</strong> — terminate at the heater terminal block per the
              manufacturer instructions. Ensure minimum clearances to combustible materials.
            </li>
            <li>
              <strong>Install sauna lighting (if required)</strong> — use heat-resistant luminaires
              rated for sauna use (typically IP44 minimum, 125°C rated). Wire in silicone rubber
              cable.
            </li>
            <li>
              <strong>Install control unit</strong> — mount the sauna control unit outside the sauna
              room in a normal temperature environment.
            </li>
            <li>
              <strong>Supplementary bonding</strong> — bond any accessible
              extraneous-conductive-parts within the sauna room.
            </li>
            <li>
              <strong>Test and certify</strong> — complete all initial verification tests and issue
              an EIC. Notify under Part P.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection',
    content: (
      <>
        <p>
          BS 7671 Regulation 411.3.3 requires additional protection by a 30mA RCD for the sauna
          circuit. The sauna is a special location under Section 703, and the combination of high
          temperatures and moisture (particularly in combined sauna/steam rooms) makes RCD
          protection essential.
        </p>
        <p>
          An RCBO on the dedicated way at the consumer unit is the standard approach. Type A is
          preferred over Type AC as sauna heater controllers may include electronic components that
          produce DC fault components.
        </p>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>The completed installation must be tested in accordance with BS 7671 Chapter 61:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors including supplementary bonding</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Insulation resistance — 500V DC, minimum 1 megohm (disconnect the heater before
                testing)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity verification at all termination points</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs) within limits for the protective device</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                RCD operation — 30mA device must trip within 300ms at rated current and within 40ms
                at 5x rated current
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Functional testing — verify heater operation, thermostat cut-off, and timer
                operation
              </span>
            </li>
          </ul>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          must be issued. The remarks should reference BS 7671 Section 703. The work must be
          notified under Part P of the Building Regulations as it involves a special location.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Realistic Pricing for Sauna Electrical Installation (2026)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li>
              <strong>Small sauna (4.5kW), short run:</strong> £400 to £550 — 20A circuit, RCBO,
              standard + silicone cable, testing, EIC
            </li>
            <li>
              <strong>Medium sauna (6 to 8kW), medium run:</strong> £550 to £700 — 32A circuit,
              longer cable run, heat-resistant cable and fixings
            </li>
            <li>
              <strong>Large sauna (9kW), long run:</strong> £650 to £850 — 40A circuit, 10.0mm²
              cable, more labour
            </li>
            <li>
              <strong>Sauna lighting circuit:</strong> add £150 to £300 — heat-resistant luminaires
              and silicone cable
            </li>
            <li>
              <strong>Consumer unit upgrade:</strong> add £350 to £600 if no spare ways available
            </li>
          </ul>
        </div>
        <p>
          Prices include materials, labour (half a day to a full day), testing, and EIC certificate.
          They do not include the sauna heater, sauna cabin, or building work.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Sauna Installation Tips',
    content: (
      <>
        <p>
          Sauna installations are specialist work that commands premium pricing. The key
          differentiator is knowing the Section 703 requirements and using the correct
          heat-resistant materials.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Stock Silicone Cable</h4>
                <p className="text-white text-sm leading-relaxed">
                  Keep a reel of silicone rubber cable in the van if you are marketing sauna
                  installations. It is not a standard stock item at most wholesalers and may need to
                  be ordered. Having it ready saves a return visit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote with Specialist Materials</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to itemise the heat-resistant cable, silicone fixings, fireproof junction box, and
                  specialist luminaires. These cost more than standard materials — make sure the
                  quote reflects this.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify sauna electrical installations"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. 7-day free trial."
          icon={Thermometer}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SaunaElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Sauna Electrical Installation | Special Location Guide UK"
      description="Complete guide to sauna electrical installation in the UK. Dedicated supply, BS 7671 Section 703 requirements, heat-resistant cable, temperature zones, RCD protection, testing, and certification."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Sauna Electrical Installation:{' '}
          <span className="text-yellow-400">Special Location Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Saunas are special locations under BS 7671 Section 703. Heat-resistant cable, temperature zones, dedicated circuits, and correct zoning are essential. This guide covers everything from heater sizing to testing and certification."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Sauna Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Sauna Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates for special location work. 7-day free trial, cancel anytime."
    />
  );
}
