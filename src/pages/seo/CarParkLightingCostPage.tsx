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
  'Electrical installations for car park lighting are governed by BS 7671:2018+A4:2026 Section 714 (Outdoor lighting installations), which covers roads, parks, car parks and places open to the public. Lighting accessible to the public must have RCD additional protection (Reg 714.411.3.4). Cables buried in the ground must incorporate earthed armour or be in conduit/duct giving equivalent mechanical protection, be marked by covers or marker tape, and be at a sufficient depth to avoid foreseeable ground disturbance (Reg 522.8.10).',
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
      'Car park lighting columns are typically fed by SWA (steel wire armoured) cable buried in a trench. BS 7671 Reg 522.8.10 requires a buried cable to incorporate earthed armour or a metal sheath suitable for use as a protective conductor (or be installed in conduit or duct giving equivalent protection against mechanical damage), to be marked by cable covers or marker tape, and to be at a sufficient depth to avoid damage from any reasonably foreseeable disturbance of the ground. The regulation itself does not state a fixed depth, but a burial depth of around 0.6 m is widely adopted as custom and practice in vehicle areas; greater depth or added ducting/concrete encasement is used where heavier loading is expected. The cable size depends on the circuit length and load — 2.5mm² or 4mm² 3-core SWA is common for lighting circuits. Each column requires a means of isolation (typically a fused connection unit inside the column base) so the column can be worked on safely.',
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
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for external lighting projects.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
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
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-2">Lighting levels by risk class</h3>
          <p className="text-white/70 text-sm mb-4">
            Maintained illuminance is set by a risk assessment under BS 5489-1. Higher footfall,
            late-night use and crime risk push the target lux level up. Uniformity (the ratio of
            minimum to average illuminance) matters as much as the average — poor uniformity leaves
            dark spots that undermine safety and CCTV image quality.
          </p>
          <div className="space-y-2">
            <div className="rounded-xl bg-green-900/30 border border-green-700/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-white">Low risk</span>
                <span className="font-mono text-green-300">5 lux min. maintained avg.</span>
              </div>
              <p className="text-white/70 text-sm mt-1">
                Residential, short-stay or low-crime car parks with light evening use.
              </p>
            </div>
            <div className="rounded-xl bg-yellow-900/30 border border-yellow-700/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-white">Medium risk</span>
                <span className="font-mono text-yellow-300">10–15 lux</span>
              </div>
              <p className="text-white/70 text-sm mt-1">
                Retail, office and multi-storey car parks with steady through-the-day use.
              </p>
            </div>
            <div className="rounded-xl bg-blue-900/30 border border-blue-700/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-white">High risk</span>
                <span className="font-mono text-blue-300">20 lux or more</span>
              </div>
              <p className="text-white/70 text-sm mt-1">
                Late-night use, higher-crime locations and public transport interchanges. Aim for a
                minimum-to-average uniformity of at least 0.25.
              </p>
            </div>
          </div>
        </div>
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
          <h3 className="font-bold text-white text-lg mb-1">Column costs by height (2026)</h3>
          <p className="text-white/60 text-sm mb-4">
            Indicative UK market guidance — not a quote. Figures show typical supply-and-install
            ranges per column.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white border-collapse min-w-[560px]">
              <thead>
                <tr className="text-left text-white/60 border-b border-white/10">
                  <th className="py-2 pr-3 font-medium">Element</th>
                  <th className="py-2 px-3 font-medium">4 m column</th>
                  <th className="py-2 px-3 font-medium">6 m column</th>
                  <th className="py-2 pl-3 font-medium">8–10 m column</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-3 text-white/80">Column</td>
                  <td className="py-2 px-3 font-mono">£150–£250</td>
                  <td className="py-2 px-3 font-mono">£250–£400</td>
                  <td className="py-2 pl-3 font-mono">£400–£700</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-3 text-white/80">LED lantern</td>
                  <td className="py-2 px-3 font-mono">£80–£150<span className="text-white/50"> (30–50 W)</span></td>
                  <td className="py-2 px-3 font-mono">£120–£250<span className="text-white/50"> (50–100 W)</span></td>
                  <td className="py-2 pl-3 font-mono">£200–£400<span className="text-white/50"> (100–200 W)</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-3 text-white/80">Foundation</td>
                  <td className="py-2 px-3 font-mono">£200–£350</td>
                  <td className="py-2 px-3 font-mono">£300–£500</td>
                  <td className="py-2 pl-3 font-mono">£400–£700</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-3 text-white/80">Cable &amp; connection</td>
                  <td className="py-2 px-3 font-mono">£150–£300</td>
                  <td className="py-2 px-3 font-mono">£200–£400</td>
                  <td className="py-2 pl-3 font-mono">£250–£500</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold text-yellow-400">Total installed</td>
                  <td className="py-2 px-3 font-mono font-semibold text-yellow-400">£500–£900</td>
                  <td className="py-2 px-3 font-mono font-semibold text-yellow-400">£800–£1,500</td>
                  <td className="py-2 pl-3 font-mono font-semibold text-yellow-400">£1,200–£2,000</td>
                </tr>
              </tbody>
            </table>
          </div>
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
          description="Elec-Mate's quoting app handles per-column pricing with separate line items for columns, luminaires, foundations, cabling, controls, and CCTV integration."
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
                <strong>BS 7671:2018+A4:2026 — Section 714</strong> — The wiring regulations. Car
                park and outdoor lighting installations fall within Section 714 (Outdoor lighting
                installations), whose scope expressly includes lighting for roads, car parks, parks
                and places open to the public, together with highway power supplies and street
                furniture. Section 714 sets specific requirements for protection against electric
                shock, external influences and isolation — for example, a maximum disconnection time
                of 5 s for fixed equipment in highway power supplies (Reg 714.411.202), and a
                minimum degree of protection of IP33 for equipment (Reg 714.512.2.105). Crucially,
                except where supplied from a SELV source, lighting that is accessible to the public
                must have RCD additional protection at the rating specified in Regulation 415.1.1
                (≤30 mA) — see Reg 714.411.3.4. Note that the socket-outlet RCD rule (Reg 411.3.3)
                applies to socket-outlets rated at 32 A or below, not to lighting circuits; and the
                A4:2026 luminaire RCD rule (Reg 411.3.4) applies only within domestic (household)
                premises, so it is not normally engaged by a commercial car park.
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
          An{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          must be issued for new car park lighting installations. The EIC should cover the
          distribution board, submain cables, lighting circuits, and controls, with the schedule of
          test results recording the verification carried out under Part 6 of BS 7671.
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
                  Car park clients often need lighting, CCTV,{' '}
                  <SEOInternalLink href="/guides/ev-charger-installation-cost">
                    EV charging
                  </SEOInternalLink>
                  , and access control. Offering a combined package with shared infrastructure
                  reduces the client's total cost and increases your contract value.
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
          description="Elec-Mate's quoting app handles multi-discipline car park projects — lighting columns, CCTV, EV charging, and access control in a single itemised quote."
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
      title="Car Park Lighting Cost 2026 | Column & Bollard UK Price"
      description="How much does car park lighting cost in 2026? UK guide covering column lighting at £500-2000 per column, bollards, CCTV integration, BMS controls…"
      datePublished="2026-03-27"
      dateModified="2026-05-18"
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
      answerBox={{
        question: 'How much does car park lighting cost in 2026?',
        answer:
          'Car park lighting costs £500 to £2,000 per column fully installed in 2026, covering the column, LED lantern, foundation, cabling and connection. A 50-space surface car park typically needs 8 to 12 columns, giving a total lighting cost of around £8,000 to £18,000 before distribution boards, bollards and controls. CCTV can share trenching to cut combined cost.',
        detail:
          'Figures are indicative UK market guidance, not a quote — actual price depends on column height, luminaire output, foundation type, cable run length and site access.',
      }}
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
