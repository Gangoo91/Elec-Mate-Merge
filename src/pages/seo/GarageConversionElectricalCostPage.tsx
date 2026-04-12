import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Wrench,
  Lightbulb,
  Plug,
  Thermometer,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Garage Conversion Electrical Cost', href: '/guides/garage-conversion-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'typical-costs', label: 'Typical Costs' },
  { id: 'required-circuits', label: 'Required Circuits' },
  { id: 'heating-calculations', label: 'Heating and Insulation Calculations' },
  { id: 'building-regulations', label: 'Building Regulations and Part P' },
  { id: 'consumer-unit', label: 'Consumer Unit and Supply Capacity' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A typical garage conversion electrical package costs £1,500 to £4,500, covering new circuits for lighting, sockets, and heating, a consumer unit check or upgrade, and Part P notification.',
  'The required circuits are lighting, ring or radial sockets, and a dedicated heating circuit — underfloor heating or electric radiators each have different loading requirements.',
  'Heating load calculations must account for the garage fabric (uninsulated concrete floor, single-skin walls) — insulation upgrades significantly reduce the electrical load.',
  'Part P of the Building Regulations requires that new circuits in a habitable room converted from a garage are notified to Building Control, either through a competent person scheme (NICEIC, NAPIT) or a building notice.',
  'The existing consumer unit must have sufficient spare capacity; an upgrade to a 17th or 18th edition unit with RCD protection may be required if the existing board cannot accommodate the new circuits.',
];

const faqs = [
  {
    question: 'How much does garage conversion electrical work cost?',
    answer:
      'For a standard single garage converted to a habitable room, the electrical package typically costs £1,500 to £4,500. This includes new circuits for lighting, sockets, and heating; cable installation (first and second fix); testing and certification; and Part P notification via a competent person scheme. Costs at the higher end apply where the garage is remote from the house consumer unit (long cable runs), where a consumer unit upgrade is required, or where underfloor heating is installed across a large area. A double garage conversion will typically cost £2,500 to £6,000 for the electrical work alone.',
  },
  {
    question: 'What circuits are needed in a garage conversion?',
    answer:
      'A habitable room converted from a garage requires at minimum: a lighting circuit (or an extension of the existing house lighting circuit if the garage is adjacent), a ring final or radial socket circuit, and a dedicated heating circuit. If underfloor heating is installed, the circuit must be rated for the total mat wattage plus a 20% design margin. If electric radiators are used, each radiator should ideally have its own spur from the socket circuit or a dedicated circuit for larger units (over 2kW). A smoke detector must be installed in the converted room and interlinked with the house alarm system.',
  },
  {
    question: 'Does garage conversion electrical work require Part P notification?',
    answer:
      'Yes. Once a garage is converted to a habitable room, it is no longer a "garage" for the purposes of Part P — it is a domestic room. New circuits installed in the converted space must be notified under Part P of the Building Regulations. The simplest route is to use an electrician registered with a competent person scheme such as NICEIC or NAPIT, who can self-certify the work and issue a Part P certificate. If the electrician is not scheme-registered, the homeowner or contractor must submit a building notice to the local authority Building Control before starting the electrical work.',
  },
  {
    question: 'How do I calculate the heating load for a garage conversion?',
    answer:
      'The heating load calculation for a converted garage is more complex than for a standard room because the garage fabric is typically poorly insulated. The calculation considers: floor area (m²), ceiling height, wall construction (single-skin brick or block vs cavity wall), floor construction (uninsulated concrete slab vs insulated screed), window and door area and U-values, and the target indoor temperature. A rough rule of thumb for a converted garage with basic insulation is 80 to 120W per m². A 20m² single garage therefore requires 1,600W to 2,400W of heating — comfortably supplied by a 3kW underfloor heating mat or two 1.2kW electric radiators. Proper insulation to Building Regulations standards (Part L) will reduce this to 50 to 70W per m².',
  },
  {
    question: 'Does the existing consumer unit need to be upgraded for a garage conversion?',
    answer:
      'Not always, but often yes. The existing consumer unit must have sufficient spare ways to accommodate the new circuits (typically 2 to 3 new circuit breakers). If the consumer unit is an old fuse board, a pre-17th edition unit without RCD protection, or a unit with no spare capacity, an upgrade is required. A modern 17th or 18th edition consumer unit with RCD protection (Type A for circuits supplying the new room) provides the required fault protection and usually costs £400 to £800 to supply and install as part of a larger job. The Elec-Mate quoting app allows electricians to price the consumer unit upgrade as a line item within the garage conversion quote.',
  },
  {
    question: 'Can the garage conversion circuits be extended from existing house circuits?',
    answer:
      'In limited circumstances, yes — but new circuits are almost always the better approach. Extending the house lighting circuit to supply a converted garage is acceptable where the existing circuit has sufficient capacity (the total load remains within the rating of the existing MCB and the cable). However, the socket circuit should be a new dedicated circuit rather than an extension of an existing ring, particularly if the heating is socket-fed. New circuits from the consumer unit give better fault discrimination, easier testing, and cleaner documentation for the Part P certificate.',
  },
  {
    question: 'What testing and certification is required for a garage conversion?',
    answer:
      'All new circuits must be tested in accordance with BS 7671: continuity of protective conductors, insulation resistance (500V DC, minimum 1 megohm), polarity, earth fault loop impedance (Zs), and RCD operation where applicable. An Electrical Installation Certificate (EIC) must be issued for the new circuits. The EIC is the Part P compliance document — it must be provided to the homeowner and, where the electrician is scheme-registered, submitted to the competent person scheme for the Part P certificate to be issued. The homeowner should keep the EIC with the property deeds.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for garage conversion circuits including long runs to remote consumer units.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for garage conversion circuits on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Price garage conversion electrical packages with labour, materials, and Part P notification.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/house-extension-electrical-cost',
    title: 'House Extension Electrical Cost',
    description:
      'Similar guide covering first and second fix electrical work for house extensions.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/electric-underfloor-heating-cost',
    title: 'Electric Underfloor Heating Cost',
    description:
      'Detailed guide to underfloor heating circuits, installation costs, and running costs.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on long cable runs from house consumer unit to converted garage.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Garage Conversion Electrical Work: What Is Involved',
    content: (
      <>
        <p>
          Converting a garage to a habitable room — home office, bedroom, gym, or playroom — is one
          of the most popular home improvement projects in the UK. The electrical work is a
          significant part of the conversion: a bare garage with a single light and perhaps one
          socket must become a properly wired, heated, and lit habitable room that complies with
          Building Regulations.
        </p>
        <p>
          The electrical package for a garage conversion typically includes new circuits for
          lighting, sockets, and heating; cable installation through the new walls and floor; a
          consumer unit check and possible upgrade; smoke detector installation; and Part P
          notification. Testing and certification under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          is required for all new circuits.
        </p>
        <p>
          This guide covers typical costs, the circuits required, heating load calculations,
          Building Regulations requirements, and how to quote and certify garage conversion
          electrical work efficiently.
        </p>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Costs for Garage Conversion Electrical Work',
    content: (
      <>
        <p>
          The electrical cost for a single garage conversion (up to 20m²) typically falls in the
          following ranges:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic package (adjacent garage, no consumer unit upgrade)</strong> — £1,500
                to £2,200. New lighting and socket circuits from an existing consumer unit with
                spare capacity, basic heating spur, smoke detector, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range package (consumer unit upgrade included)</strong> — £2,200 to
                £3,500. All of the above plus a new 18th edition consumer unit, dedicated underfloor
                heating circuit with thermostat, and additional circuits for a home office setup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full package (detached garage or complex installation)</strong> — £3,500 to
                £4,500+. Long cable run from house (armoured cable or separate sub-main), new
                consumer unit in garage, full complement of circuits, RCD protection, outdoor
                lighting, and EV charger preparatory works.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These figures are for labour and materials combined. The main cost drivers are the
          distance between the garage and the house consumer unit, whether the consumer unit needs
          upgrading, the type and area of heating, and the number of circuits required.
        </p>
        <SEOAppBridge
          title="Price your garage conversion electrical package"
          description="Use Elec-Mate's quoting app to price garage conversion electrical work with itemised materials, labour, and Part P notification. Professional PDF quotes on your phone from the survey."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'required-circuits',
    heading: 'Required Circuits for a Converted Garage',
    content: (
      <>
        <p>
          A habitable room converted from a garage requires the following electrical circuits as a
          minimum:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <Lightbulb className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Lighting Circuit</h3>
            <p className="text-white text-sm leading-relaxed">
              A dedicated lighting circuit or extension of the house lighting circuit. LED
              downlights or surface fittings. Consider PIR switching or a 2-way switch arrangement
              for convenience. Minimum 1 lighting point per 10m².
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <Plug className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Socket Circuit</h3>
            <p className="text-white text-sm leading-relaxed">
              Ring final or radial socket circuit with at least 4 double sockets. For a home office,
              consider a second socket circuit for data and IT equipment. USB-A/C combination
              sockets add value.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <Thermometer className="w-6 h-6 text-red-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Heating Circuit</h3>
            <p className="text-white text-sm leading-relaxed">
              Dedicated circuit for underfloor heating mat or electric radiators. Size the cable and
              MCB for the total heating load plus 20% margin. Include a programmer or smart
              thermostat on a switched fused spur.
            </p>
          </div>
        </div>
        <p>
          In addition to circuits, the following are required under Building Regulations: an
          interlinked smoke alarm in the converted room (Grade D, LD2 as a minimum to BS 5839-6),
          and adequate ventilation provision (which may require an extractor fan circuit if the
          garage is used as a habitable bedroom).
        </p>
      </>
    ),
  },
  {
    id: 'heating-calculations',
    heading: 'Heating and Insulation Calculations',
    content: (
      <>
        <p>
          Getting the heating load correct is critical for garage conversions because the starting
          point — an uninsulated concrete garage — has very poor thermal performance. The electrical
          heating load is directly determined by the insulation standard achieved.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Uninsulated garage (concrete block walls, uninsulated slab floor)</strong> —
                heat loss 120 to 160W per m². A 20m² garage requires 2,400W to 3,200W of heating.
                Not recommended: energy costs will be high.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic insulation (50mm wall insulation, 50mm floor insulation)</strong> —
                heat loss 80 to 100W per m². A 20m² garage requires 1,600W to 2,000W. A 3kW UFH mat
                or two 1kW radiators provides adequate comfort.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Building Regulations Part L compliant (100mm PIR floor, cavity wall or 100mm wall
                  insulation)
                </strong>{' '}
                — heat loss 40 to 60W per m². A 20m² garage requires 800W to 1,200W. A 2kW UFH mat
                is sufficient.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Advise the homeowner that investing in proper insulation to Part L standard before
          installing the electrical heating reduces running costs substantially. Undersized heating
          (because the builder insulated well) is easy to correct; an oversized circuit installed
          before insulation decisions are made may be wasteful.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          allows the correct cable size and MCB rating to be confirmed once the heating load is
          known.
        </p>
      </>
    ),
  },
  {
    id: 'building-regulations',
    heading: 'Building Regulations and Part P',
    content: (
      <>
        <p>
          A garage conversion requires Building Regulations approval in two areas relevant to
          electricians: Part P (electrical safety in dwellings) and the broader structural and
          thermal performance requirements that affect how the room is built.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — new circuits in the converted garage must be
                notified under Part P. Use a competent person scheme (NICEIC, NAPIT, ELECSA) for
                self-certification, or submit a building notice to local authority Building Control
                before starting work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke detection</strong> — Part B of the Building Regulations requires that
                a converted garage includes interlinked smoke detection. The Grade D LD2 system
                specified in BS 5839-6 requires smoke alarms in rooms that form part of the escape
                route. A mains-powered, battery-backup alarm in the converted room, interlinked with
                the existing house smoke alarms, is the standard solution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire door</strong> — if the converted garage is connected to the house by an
                internal door, Building Regulations require the door to be a fire door (FD30S). This
                is a building/joinery matter but affects cable routes through the door frame — all
                penetrations must be fire-stopped.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Part P certificate (issued by the competent person scheme after the EIC is submitted)
          must be provided to the homeowner. Without it, the garage conversion may be flagged as
          non-compliant if the property is sold or re-mortgaged.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit and Supply Capacity',
    content: (
      <>
        <p>Before quoting, assess the existing consumer unit for spare capacity and compliance:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spare ways</strong> — the new circuits (lighting, sockets, heating) require
                2 to 3 spare ways. If the existing board is full, an upgrade or a small sub-consumer
                unit in the garage is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — the new circuits must have RCD protection (30mA).
                If the existing board has no RCD protection and an upgrade is not being done, RCBOs
                can be used for the new circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main fuse/supply capacity</strong> — a 20m² garage with 3kW heating,
                lighting, and sockets adds approximately 15A to 20A to the peak demand. Verify the
                DNO main fuse rating (typically 60A, 80A, or 100A) allows for the additional load.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting and Certifying Garage Conversions',
    content: (
      <>
        <p>
          Garage conversions are excellent recurring work — they come in clusters (neighbours talk)
          and the homeowner is usually committed to spending. A professional quote with clear scope
          and itemised costs wins the job. Key points for quoting:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Consumer Unit Separately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always survey the consumer unit before quoting. If an upgrade is likely, price it
                  as an optional item — let the homeowner choose whether to include it now or defer
                  it. This avoids pricing surprises on the day and demonstrates professionalism.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Include Part P in Your Quote</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always include the Part P notification fee (typically £40 to £80 via your
                  competent person scheme) as a line item. Homeowners appreciate seeing it
                  explicitly — it demonstrates that compliance is handled as part of the package.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete the EIC on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  on site after testing. AI board scanning, voice test entry, and instant PDF export
                  mean the certificate is ready before you leave. Submit directly to your competent
                  person scheme from the app.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify garage conversion electrical work on your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certification. Everything you need for garage conversion electrical packages. 7-day free trial."
          icon={Home}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GarageConversionElectricalCostPage() {
  return (
    <GuideTemplate
      title="Garage Conversion Electrical Cost UK | Circuits, Costs & Part P"
      description="How much does garage conversion electrical work cost in the UK? Typical costs £1,500–£4,500. Covers required circuits, heating load calculations, consumer unit upgrades, and Part P Building Regulations notification."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Garage Conversion Electrical Cost:{' '}
          <span className="text-yellow-400">Circuits, Costs and Part P</span>
        </>
      }
      heroSubtitle="A garage conversion electrical package typically costs £1,500 to £4,500. This guide covers required circuits, heating load calculations, Building Regulations Part P notification, and consumer unit considerations."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garage Conversion Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Garage Conversion Electrical Work on Your Phone"
      ctaSubheading="Elec-Mate gives UK electricians professional quoting, cable sizing, and on-site EIC certification — everything needed for garage conversion electrical packages. 7-day free trial."
    />
  );
}
