import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Building2,
  Car,
  Camera,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Car Park Lighting Cost', href: '/guides/car-park-lighting-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Car Park Lighting Overview' },
  { id: 'column-lighting', label: 'Column Lighting Costs' },
  { id: 'bollard-lighting', label: 'Bollard and Low-Level Lighting' },
  { id: 'cctv-integration', label: 'CCTV Integration' },
  { id: 'bms-controls', label: 'BMS Controls and Time Scheduling' },
  { id: 'cost-per-column', label: 'Total Cost Per Column Installed' },
  { id: 'regulations', label: 'Standards and Regulations' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Car Park Lighting' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Car park lighting columns cost £500 to £2,000 per column fully installed in 2026, depending on column height, luminaire specification, foundation requirements, and cable run distance.',
  'LED bollard lighting costs £200 to £500 per bollard installed, providing low-level pathway illumination and decorative boundary lighting for pedestrian areas within car parks.',
  'CCTV integration with car park lighting columns can share trenching and power supplies, reducing combined installation costs by 15% to 25% compared to separate installations.',
  'BMS controls, photocell switching, and time scheduling reduce car park lighting energy consumption by 30% to 50% and are typically required by planning conditions for new developments.',
  'Car park lighting design must comply with BS 5489-1 (road lighting) and BS EN 12464-2 (outdoor workplaces), with typical lux levels of 5 to 20 lux depending on the risk assessment.',
];

const faqs = [
  {
    question: 'How much does a car park lighting column cost installed in 2026?',
    answer:
      'A car park lighting column costs £500 to £2,000 fully installed in 2026. A basic 4-metre column with LED lantern on an existing foundation costs £500 to £800. A 6-metre column with high-output LED lantern, new concrete foundation, and 20-metre cable run costs £1,000 to £1,500. An 8 to 10-metre column with asymmetric optics, integrated photocell, and CMS (central management system) connectivity costs £1,500 to £2,000. These prices include the column, luminaire, foundation (where new), cable, connection, and commissioning.',
  },
  {
    question: 'What lux level is required for car park lighting?',
    answer:
      'Car park lighting lux levels are determined by a risk assessment and BS 5489-1. Low-risk car parks (residential, short stay, low crime area) require 5 lux minimum maintained average. Medium-risk car parks (retail, office, multi-storey) require 10 to 15 lux. High-risk car parks (late-night use, high crime area, public transport interchange) require 20 lux or more. Uniformity is important — the ratio of minimum to average illuminance should be at least 0.25 to prevent dark spots that compromise safety and CCTV coverage.',
  },
  {
    question: 'What height should car park lighting columns be?',
    answer:
      'Car park lighting column heights are typically 4 to 8 metres. Lower columns (4 to 5 metres) are used in residential car parks and areas where light pollution is a concern. Standard commercial car park columns are 5 to 6 metres, providing a good balance of coverage and uniformity. Taller columns (8 to 10 metres) are used in large car parks where wider spacing between columns is desired, and in multi-storey car parks on the top deck. The column height affects the luminaire optics required and the spacing between columns.',
  },
  {
    question: 'Can CCTV cameras be mounted on car park lighting columns?',
    answer:
      'Yes, CCTV cameras are frequently mounted on car park lighting columns. This is a cost-effective approach as it shares the column, foundation, and cable trench with the lighting installation. A CCTV camera bracket mounted on a lighting column costs £50 to £100. The camera, data cable, and connection to the recording system are additional. Ensure the column is rated for the additional wind loading of the camera and bracket, and that the power supply circuit has capacity for the camera equipment.',
  },
  {
    question: 'Do car parks need emergency lighting?',
    answer:
      'Multi-storey car parks require emergency lighting to BS 5266-1 on all pedestrian escape routes, stairways, and at changes of level. Surface-level car parks do not typically require emergency lighting unless they form part of the escape route from an adjacent building. Where emergency lighting is required, self-contained LED emergency fittings with 3-hour duration are standard. Emergency exit signs must be illuminated at all pedestrian exits.',
  },
  {
    question: 'How much does it cost to light a 50-space car park?',
    answer:
      'A 50-space surface car park (approximately 1,500m² including circulation) typically requires 8 to 12 lighting columns at 6-metre height for a maintained average of 10 to 15 lux. At £1,000 to £1,500 per column installed, the total lighting cost is £8,000 to £18,000. Add £2,000 to £4,000 for the distribution board, submain cable, and earthing. Add £1,500 to £3,000 for bollard lighting on pedestrian walkways. Total: £11,500 to £25,000 depending on specification and site conditions.',
  },
  {
    question: 'What controls are needed for car park lighting?',
    answer:
      'Car park lighting should be controlled by a combination of photocell switching (on at dusk, off at dawn), time scheduling (reduced output or off during unoccupied hours), and presence detection in multi-storey car parks (lights dim to 20% in unoccupied zones, ramping to 100% when vehicles or pedestrians are detected). BMS integration allows remote monitoring and control. Planning conditions for new developments often require evidence of lighting control measures to minimise light pollution and energy waste.',
  },
  {
    question: 'What cable is used for car park lighting?',
    answer:
      'Car park lighting columns are typically fed by SWA (steel wire armoured) cable buried at a minimum depth of 450mm in a trench with marker tape. The cable size depends on the circuit length and load — 2.5mm² or 4mm² 3-core SWA is common for lighting circuits. Each column requires an isolation switch (typically a fused spur inside the column base) for safe maintenance. The SWA cable provides mechanical protection and the steel wire armour can be used as the circuit protective conductor (CPC), though a separate CPC within the cable is preferred.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/warehouse-lighting-cost',
    title: 'Warehouse Lighting Cost',
    description: 'Indoor commercial lighting costs for warehouse and industrial premises.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-rewire-cost',
    title: 'Commercial Rewire Cost',
    description: 'Full commercial electrical installation costs per square metre.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for external lighting projects.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote car park lighting with per-column pricing and ancillary costs.',
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
    heading: 'Car Park Lighting Overview',
    content: (
      <>
        <p>
          Car park lighting serves two critical purposes: safety and security. Adequate lighting
          allows drivers and pedestrians to navigate safely, whilst deterring crime and enabling
          effective CCTV surveillance. For electricians, car park lighting projects combine external
          column lighting, bollard installation, controls, and often CCTV integration into a single
          package.
        </p>
        <p>
          Whether you are a property developer planning a new car park, a facilities manager
          upgrading existing lighting, or an electrical contractor pricing a car park lighting
          project, this guide provides realistic per-column costs and practical guidance based on
          current UK market rates.
        </p>
      </>
    ),
  },
  {
    id: 'column-lighting',
    heading: 'Column Lighting Costs',
    content: (
      <>
        <p>
          Lighting columns are the backbone of car park illumination. The cost per column varies
          significantly depending on height, luminaire specification, foundation requirements, and
          cable run length.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Column Costs by Height (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4-metre column</strong> — Column: £150 to £250. LED lantern (30 to 50W): £80
                to £150. Foundation: £200 to £350. Cable and connection: £150 to £300. Total
                installed: £500 to £900 per column.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6-metre column</strong> — Column: £250 to £400. LED lantern (50 to 100W):
                £120 to £250. Foundation: £300 to £500. Cable and connection: £200 to £400. Total
                installed: £800 to £1,500 per column.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>8 to 10-metre column</strong> — Column: £400 to £700. LED lantern (100 to
                200W): £200 to £400. Foundation: £400 to £700. Cable and connection: £250 to £500.
                Total installed: £1,200 to £2,000 per column.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Foundation costs assume a new concrete base with holding-down bolts. Where existing
          foundations can be reused (column replacement), deduct £200 to £500 per column. Cable
          costs assume SWA cable in a new trench at average 15 to 20-metre run per column.
        </p>
      </>
    ),
  },
  {
    id: 'bollard-lighting',
    heading: 'Bollard and Low-Level Lighting',
    content: (
      <>
        <p>
          Bollard lighting provides low-level illumination for pedestrian walkways, pathways between
          parking bays, and boundary areas. It is often used in combination with column lighting to
          create a safe and attractive environment.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Bollards</h3>
            <p className="text-white text-sm leading-relaxed">
              Stainless steel or aluminium LED bollards (600 to 1,000mm height) cost £80 to £200 per
              bollard supply price. Installation including foundation and cable connection: £120 to
              £300 per bollard. Total installed: £200 to £500 per bollard. Typical spacing: 4 to 6
              metres on pedestrian routes.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Recessed Ground Lights</h3>
            <p className="text-white text-sm leading-relaxed">
              Recessed LED ground lights (also called uplighters or drive-over lights) cost £60 to
              £150 each supply price. Installation in existing paving: £80 to £150 per unit. These
              provide subtle pathway marking and are drive-over rated (minimum 1 tonne) for car park
              use.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'cctv-integration',
    heading: 'CCTV Integration',
    content: (
      <>
        <p>
          Integrating CCTV with car park lighting is a cost-effective approach that shares
          infrastructure — columns, foundations, cable trenches, and power supplies.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Column-mounted cameras</strong> — Camera bracket and mounting hardware: £50
                to £100. IP camera: £150 to £500 depending on specification. Cat6 data cable to
                recording location: £2 to £5 per metre. PoE switch port: £20 to £40. Total per
                camera position: £300 to £800.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared trenching savings</strong> — Running CCTV data cable in the same
                trench as the lighting SWA cable saves £15 to £25 per metre of trench. On a car park
                with 200 metres of trenching, the saving is £3,000 to £5,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recording equipment</strong> — NVR (network video recorder) for 8 to 16
                cameras: £500 to £1,500. Monitor: £150 to £300. UPS: £200 to £400. Housed in a
                secure location within the adjacent building.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A combined car park lighting and CCTV installation saves 15% to 25% compared to procuring
          and installing the two systems separately. Offer this as a combined package to maximise
          the value of the contract.
        </p>
      </>
    ),
  },
  {
    id: 'bms-controls',
    heading: 'BMS Controls and Time Scheduling',
    content: (
      <>
        <p>
          Modern car park lighting should be controlled rather than simply switched by a photocell.
          Building Management System (BMS) integration and intelligent controls reduce energy
          consumption, extend lamp life, and meet planning conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photocell switching</strong> — Basic photocell: £30 to £60. Switches
                lighting on at dusk and off at dawn. The simplest and most common control method.
                Can be combined with a time clock for curfew hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time scheduling</strong> — Astronomical time clock: £100 to £250.
                Automatically adjusts on/off times throughout the year based on sunrise and sunset
                calculations. Can programme reduced output (dimming) during low-usage hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BMS integration</strong> — Interface module: £200 to £500. Allows the
                lighting to be monitored and controlled from the building's BMS. Provides energy
                monitoring, fault alerting, and remote dimming/switching.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CMS (Central Management System)</strong> — £20 to £50 per luminaire for
                wireless CMS connectivity. Allows individual luminaire monitoring, dimming, and
                fault reporting from a web dashboard. Used on larger installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-per-column',
    heading: 'Total Cost Per Column — Summary',
    content: (
      <>
        <p>Here are realistic total costs per lighting column installed, including all elements:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic: £500 to £900/column</strong> — 4-metre column, basic LED lantern,
                photocell, existing or simple foundation, short cable run. Suitable for small
                residential or retail car parks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range: £1,000 to £1,500/column</strong> — 6-metre column, high-output
                LED lantern with asymmetric optics, new foundation, 15 to 20-metre cable run,
                photocell and time clock control. The most common specification for commercial car
                parks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Premium: £1,500 to £2,000/column</strong> — 8 to 10-metre column, premium
                LED lantern with DALI dimming and CMS, substantial foundation, CCTV camera bracket
                provision, BMS integration. For large commercial developments and public car parks.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote car park lighting per column"
          description="Elec-Mate's quoting app handles per-column pricing with separate line items for columns, luminaires, foundations, cabling, controls, and CCTV integration. Professional PDF quotes."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Standards and Regulations',
    content: (
      <>
        <p>
          Car park lighting must comply with several standards depending on whether it is an
          external surface car park, a multi-storey structure, or an underground facility.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5489-1:2020</strong> — Design of road lighting. Applies to external car
                parks and access roads. Defines lighting classes based on risk assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS EN 12464-2:2014</strong> — Lighting of outdoor work places. Applies to
                areas where outdoor work activities take place, including loading areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024</strong> — The wiring regulations. External
                installations must comply with Section 708 (caravan and camping parks have specific
                requirements) and general requirements for buried cables and external equipment. RCD
                protection per Regulation 411.3.3 applies to external circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ILP (Institution of Lighting Professionals) guidance</strong> — Professional
                guidance notes for car park lighting design, including GN01 for obtrusive light and
                TR12 for lighting in the vicinity of aerodromes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An Electrical Installation Certificate (EIC) must be issued for new car park lighting
          installations. The EIC should cover the distribution board, submain cables, lighting
          circuits, and controls.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Car Park Lighting',
    content: (
      <>
        <p>
          Car park lighting projects combine electrical, civil, and often security disciplines. Here
          are practical tips for quoting these projects:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Survey Underground Services</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before quoting trenching costs, check for existing underground services — water,
                  gas, telecoms, and drainage. A CAT (cable avoidance tool) scan and service
                  drawings are essential. Hitting a service during trenching can cost thousands in
                  repairs and delays.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Car className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Offer Combined Packages</h4>
                <p className="text-white text-sm leading-relaxed">
                  Car park clients often need lighting, CCTV, EV charging, and access control.
                  Offering a combined package with shared infrastructure reduces the client's total
                  cost and increases your contract value.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Lighting Design Evidence</h4>
                <p className="text-white text-sm leading-relaxed">
                  Provide a lighting design calculation with your quote showing compliance with BS
                  5489-1. This demonstrates competence and helps the client compare quotes on a
                  like-for-like basis. Most luminaire manufacturers provide free lighting design
                  services.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote car park projects with combined services"
          description="Elec-Mate's quoting app handles multi-discipline car park projects — lighting columns, CCTV, EV charging, and access control in a single itemised quote. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CarParkLightingCostPage() {
  return (
    <GuideTemplate
      title="Car Park Lighting Cost 2026 | Column & Bollard UK Price Guide"
      description="How much does car park lighting cost in 2026? UK guide covering column lighting at £500-2000 per column, bollards, CCTV integration, BMS controls, and complete project costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Car Park Lighting Cost:{' '}
          <span className="text-yellow-400">UK Column & Bollard Guide 2026</span>
        </>
      }
      heroSubtitle="What does car park lighting cost? This guide covers column lighting at £500 to £2,000 per column, bollard lighting, CCTV integration, BMS controls, and complete project pricing for property developers, facilities managers, and electrical contractors."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Car Park Lighting Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Car Park Lighting with Per-Column Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for external lighting quotes with per-column pricing, CCTV integration, and professional PDF output. 7-day free trial."
    />
  );
}
