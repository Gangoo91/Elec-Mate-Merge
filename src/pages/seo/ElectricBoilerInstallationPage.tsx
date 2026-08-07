import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Zap, Thermometer, FileCheck2, ClipboardCheck, ShieldCheck } from 'lucide-react';

// -------------------------------------------------------------------
// Shared surface classes — edge-to-edge on phones, inset from sm: up
// -------------------------------------------------------------------

const cardCn =
  '-mx-5 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x';

const noteCn =
  '-mx-5 my-5 rounded-none border-y border-elec-yellow/30 bg-elec-yellow/[0.07] p-5 ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x';

const tableWrap =
  '-mx-5 my-5 overflow-x-auto border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x';

const tableCn = 'w-full min-w-[36rem] border-collapse text-left text-sm text-white';
const thCn =
  'whitespace-nowrap border-b border-white/[0.16] bg-white/[0.05] px-4 py-3 font-semibold text-white';
const tdCn = 'border-b border-white/[0.08] px-4 py-3 align-top text-white';

const subHeadCn = 'mb-3 text-[15px] font-semibold tracking-tight text-white';
const listCn = 'my-4 list-disc space-y-2 pl-5 text-white marker:text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Electric Boiler Installation', href: '/electric-boiler-installation' },
];

const tocItems = [
  { id: 'sizing', label: 'Sizing — kW Calculation' },
  { id: 'wiring', label: 'Circuit Sizing & Wiring' },
  { id: 'types', label: 'Types of Electric Boiler' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'costs', label: 'Typical Installation Costs' },
  { id: 'vs-gas', label: 'Electric vs Gas Boiler' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 9kW single-phase electric boiler draws about 39A at 230V, so it needs a dedicated radial circuit — commonly 10mm² twin and earth on a 40A circuit-breaker. Size every circuit from the design current using Regulation 433.1.1 (Ib ≤ In ≤ Iz) and the correction factors in BS 7671 Appendix 4.',
  'Note that 45A is not a standard BS EN 60898 circuit-breaker rating. Table 41.3 lists 3, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100 and 125A. 45A is a BS 88-3 fuse rating, which is where the figure quoted on many boiler pages comes from.',
  'A boiler circuit rated above 32A supplying only fixed equipment falls outside Regulation 411.3.2.2, so Table 41.1 does not apply to it. In a TN system the permitted disconnection time is 5s (Regulation 411.3.2.3); in a TT system it is 1s (Regulation 411.3.2.4).',
  'Boiler output must match the calculated heat loss of the property. A rough rule for well-insulated UK homes is 1kW per 10m² of floor area, but a room-by-room heat loss calculation to BS EN 12831 is what actually sizes the appliance.',
  'Installing an electric boiler on a new circuit in a dwelling is notifiable under Part P of the Building Regulations in England. An Electrical Installation Certificate is required, and Regulation 644.3 requires it to carry Schedule(s) of Inspection plus Schedule(s) of Circuit Details and Test Results.',
];

const faqs = [
  {
    question: 'What size circuit does an electric boiler need?',
    answer:
      'Size it from the design current. At 230V a 6kW boiler draws 26A (6mm² twin and earth, 32A circuit-breaker), a 9kW boiler draws 39A (10mm², 40A), a 9.6kW boiler draws 42A (10mm², 50A), a 12kW boiler draws 52A (10mm² with the volt drop verified, or 16mm², on a 63A device) and a 14.4kW boiler draws 63A (16mm², 63A). Anything above about 14.4kW exceeds the 63A top of the usual domestic range and normally needs a three-phase supply. Apply the Appendix 4 correction factors for installation method, ambient temperature, grouping and thermal insulation, and check volt drop against Table 4Ab. The circuit must terminate at a double-pole isolator adjacent to the boiler.',
  },
  {
    question: 'Is 45A the right MCB for a 9kW electric boiler?',
    answer:
      'No. 45A is not one of the circuit-breaker ratings tabulated in BS 7671 Table 41.3 for devices to BS EN 60898 — that series runs 3, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125A. 45A is a fuse rating (it appears in Table 41.2 under BS 88-3 fuse system C), which is why the figure is so widely repeated for shower and boiler circuits. A 9kW boiler draws 39.1A at 230V, so the correct device under Regulation 433.1.1 is a 40A circuit-breaker, provided the cable rating Iz is at least 40A after correction factors.',
  },
  {
    question: 'What disconnection time applies to an electric boiler circuit?',
    answer:
      'Regulation 411.3.2.2 applies the Table 41.1 maximum disconnection times to final circuits rated up to 63A with socket-outlets, and up to 32A supplying only fixed connected current-using equipment. A boiler circuit protected at 40A, 50A or 63A supplying fixed equipment is not covered by that regulation, so Regulation 411.3.2.3 permits 5s in a TN system and Regulation 411.3.2.4 permits 1s in a TT system. Table 41.3 gives the maximum earth fault loop impedance for circuit-breakers for both the 0.4s and the 5s cases.',
  },
  {
    question: 'Does an electric boiler circuit need a 30mA RCD?',
    answer:
      'BS 7671 does not impose a blanket 30mA requirement on fixed-equipment circuits. Regulation 411.3.3 applies to socket-outlets rated up to 32A and to mobile equipment up to 32A used outdoors, and Regulation 411.3.4 applies to AC final circuits supplying luminaires in domestic premises — neither covers a boiler. The requirement usually bites through the cable route instead: Regulation 522.6.202 and Table 52.1 require additional protection by a 30mA RCD (Regulation 415.1.1 characteristics) for a cable concealed less than 50mm deep in a wall unless it is mechanically protected to Regulation 522.6.204. In practice most boiler circuits are run in a wall, so an RCBO is the usual answer.',
  },
  {
    question: 'Can an electric boiler replace a gas boiler directly?',
    answer:
      'Yes, in most cases an electric boiler can reuse the existing radiators and pipework. Electric boilers deliver hot water at similar flow temperatures to gas boilers (typically 55°C to 75°C), so radiators sized for a gas system are usually appropriate. The difference is the electrical supply: the boiler needs a dedicated high-current circuit, not a 13A socket. The gas supply must be capped by a Gas Safe registered engineer. The electrical work must be certificated and notified under Part P.',
  },
  {
    question: 'Does an electric boiler need a separate consumer unit?',
    answer:
      'A separate consumer unit is not a regulatory requirement, but it may be practical if the existing board has no spare ways or insufficient capacity. The boiler needs its own dedicated protective device, not a shared one. Where the existing board is a rewirable fuse board or has no RCD protection, upgrade it before adding a high-current boiler circuit — and check the main switch: Regulation 462.1.201 requires a main switch intended for operation by ordinary persons to interrupt both live conductors of a single-phase supply.',
  },
  {
    question: 'How do I calculate the right kW output for an electric boiler?',
    answer:
      'The correct method is a room-by-room heat loss calculation to BS EN 12831, accounting for fabric U-values, infiltration, ventilation and design temperatures. As a rule of thumb for a well-insulated UK property, allow roughly 1kW per 10m² of heated floor area, so a 90m² three-bedroom semi lands near 9kW. Older, poorly insulated properties may need 1.5kW to 2kW per 10m². Oversizing is not free — it pushes up the design current and may force a larger cable, a bigger device, or a supply upgrade.',
  },
  {
    question: 'What is a heat battery electric boiler?',
    answer:
      'A heat battery (also called a thermal store or electric thermal storage boiler) stores heat in a dense thermal core, charged on cheap-rate electricity during off-peak periods. The stored heat then serves central heating and domestic hot water through the day without drawing power at the day rate. Tepeo ZEB uses a solid heat core; Sunamp UniQ uses a phase-change material. They suit homes switching from night storage heating where Economy 7 wiring already exists.',
  },
  {
    question: 'Is an electric boiler cheaper to run than gas?',
    answer:
      'No. Electricity costs several times more per kWh than mains gas in the UK, and although an electric boiler converts essentially all of that energy to heat while a gas boiler loses some up the flue, the fuel price gap is far wider than the efficiency gap. Always quote running costs from the customer’s current tariff rather than a headline figure. Electric boilers do have lower installation costs, no annual gas service, no combustion products and no carbon monoxide risk. For off-gas properties the realistic alternatives are LPG or oil, which are also expensive, and pairing with solar PV or a time-of-use tariff can cut the gap significantly.',
  },
  {
    question: 'Do electric boilers require annual servicing?',
    answer:
      'Electric boilers have far fewer moving parts than gas boilers and need no Gas Safe service. Manufacturers typically still recommend an annual check of the heating element(s), thermostat, pressure relief valve and electrical connections. For the installation itself, Regulation 652.1 requires the interval between periodic inspections to be determined having regard to the type of installation; a privately rented dwelling in England has a statutory maximum of five years.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/night-storage-heater-replacement',
    title: 'Night Storage Heater Replacement',
    description: 'Replacing old storage heaters with modern electric heating alternatives.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/fused-spur-installation-guide',
    title: 'Fused Spur Installation Guide',
    description: 'Installing fused connection units for fixed appliances.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations for rented properties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI observation codes explained.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Generate compliant Electrical Installation Certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'sizing',
    heading: 'Sizing an Electric Boiler — kW Calculation',
    content: (
      <>
        <p>
          Get the output right first: the kW figure drives the design current, which drives the
          cable, the protective device and — on larger properties — whether the existing supply is
          adequate at all. An undersized boiler will not hold design temperature in cold weather. An
          oversized one wastes capital and can push the circuit past what the installation supports.
        </p>

        <h3 className={subHeadCn}>Indicative output by property size</h3>
        <div className={tableWrap}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Property</th>
                <th className={thCn}>Floor area</th>
                <th className={thCn}>Indicative output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdCn}>1-bedroom flat</td>
                <td className={tdCn}>50m&sup2;</td>
                <td className={tdCn}>4kW to 6kW</td>
              </tr>
              <tr>
                <td className={tdCn}>2-bedroom house</td>
                <td className={tdCn}>70m&sup2;</td>
                <td className={tdCn}>6kW to 9kW</td>
              </tr>
              <tr>
                <td className={tdCn}>3-bedroom semi-detached</td>
                <td className={tdCn}>90m&sup2;</td>
                <td className={tdCn}>9kW to 12kW</td>
              </tr>
              <tr>
                <td className={tdCn}>4-bedroom detached</td>
                <td className={tdCn}>120m&sup2;</td>
                <td className={tdCn}>12kW to 14.4kW</td>
              </tr>
              <tr>
                <td className={tdCn}>Older or poorly insulated</td>
                <td className={tdCn}>Any</td>
                <td className={tdCn}>Add 30% to 50% to the figures above</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          These figures are a sanity check, not a design. The correct approach is a room-by-room
          heat loss calculation to BS EN 12831 for the specific property, accounting for wall
          U-values, window area, floor and roof insulation, and the local external design
          temperature.
        </p>
        <p>
          Where the radiators were sized for a gas boiler running at around 70&deg;C flow
          temperature, they will cope with an electric boiler at similar flow temperatures. If a
          heat pump is likely later, radiators sized for 55&deg;C or lower will be needed at that
          point.
        </p>
      </>
    ),
  },
  {
    id: 'wiring',
    heading: 'Circuit Sizing and Wiring Under BS 7671',
    content: (
      <>
        <p>
          An electric boiler is one of the highest fixed loads in a dwelling. It takes a dedicated
          radial circuit, sized from the design current and installed in accordance with BS
          7671:2018+A4:2026. Start from Regulation 433.1.1 — the design current I<sub>b</sub> must
          not exceed the device rating I<sub>n</sub>, which must not exceed the corrected cable
          rating I<sub>z</sub>.
        </p>

        <h3 className={subHeadCn}>Circuit by boiler output (single-phase, 230V)</h3>
        <div className={tableWrap}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Output</th>
                <th className={thCn}>
                  Design current I<sub>b</sub>
                </th>
                <th className={thCn}>Circuit-breaker</th>
                <th className={thCn}>Typical cable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdCn}>6kW</td>
                <td className={tdCn}>26A</td>
                <td className={tdCn}>32A</td>
                <td className={tdCn}>6mm&sup2; twin and earth</td>
              </tr>
              <tr>
                <td className={tdCn}>9kW</td>
                <td className={tdCn}>39A</td>
                <td className={tdCn}>40A</td>
                <td className={tdCn}>10mm&sup2; twin and earth</td>
              </tr>
              <tr>
                <td className={tdCn}>9.6kW</td>
                <td className={tdCn}>42A</td>
                <td className={tdCn}>50A</td>
                <td className={tdCn}>10mm&sup2; twin and earth</td>
              </tr>
              <tr>
                <td className={tdCn}>12kW</td>
                <td className={tdCn}>52A</td>
                <td className={tdCn}>63A</td>
                <td className={tdCn}>10mm&sup2; (verify volt drop) or 16mm&sup2;</td>
              </tr>
              <tr>
                <td className={tdCn}>14.4kW</td>
                <td className={tdCn}>63A</td>
                <td className={tdCn}>63A</td>
                <td className={tdCn}>16mm&sup2; twin and earth</td>
              </tr>
              <tr>
                <td className={tdCn}>Above 14.4kW</td>
                <td className={tdCn}>Over 63A</td>
                <td className={tdCn}>Beyond the standard domestic range</td>
                <td className={tdCn}>Three-phase supply, or split across circuits</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The cable sizes above assume reference method C (clipped direct), a single unbunched
          circuit and an ambient temperature of 30&deg;C. Every one of those assumptions has a
          correction factor in Appendix 4 — grouping, ambient temperature, thermal insulation, and a
          semi-enclosed fuse where one is used. Apply the factors for the actual route before
          confirming the cable.
        </p>

        <div className={noteCn}>
          <h3 className={subHeadCn}>45A is a fuse rating, not a circuit-breaker rating</h3>
          <p className="text-white">
            Boiler and shower guides routinely specify a &ldquo;45A MCB&rdquo;. Table 41.3 of BS
            7671 tabulates circuit-breakers to BS EN 60898 at 3, 6, 10, 16, 20, 25, 32, 40, 50, 63,
            80, 100 and 125A — there is no 45A entry. 45A appears in Table 41.2 as a BS 88-3 fuse
            rating. For a 9kW boiler at 39.1A the correct device is a 40A circuit-breaker; for a
            9.6kW boiler at 41.7A it is 50A.
          </p>
        </div>

        <h3 className={subHeadCn}>Disconnection time — Table 41.1 usually does not apply</h3>
        <p>
          Regulation 411.3.2.2 applies the Table 41.1 maximum disconnection times to final circuits
          with a rated current not exceeding 63A with one or more socket-outlets, and 32A supplying
          only fixed connected current-using equipment. A boiler circuit protected at 40A, 50A or
          63A supplying fixed equipment falls outside both limbs, so:
        </p>
        <ul className={listCn}>
          <li>
            In a TN system, Regulation 411.3.2.3 permits a disconnection time not exceeding 5s.
          </li>
          <li>In a TT system, Regulation 411.3.2.4 permits a disconnection time not exceeding 1s.</li>
          <li>
            Table 41.3 gives maximum Z<sub>s</sub> values for circuit-breakers for both the 0.4s
            case of Regulation 411.3.2.2 and the 5s case of Regulation 411.3.2.3 — read the right
            column.
          </li>
        </ul>
        <p>
          A boiler circuit protected at 32A or below and supplying only the fixed appliance is
          covered by Regulation 411.3.2.2, and the Table 41.1 times do apply.
        </p>

        <h3 className={subHeadCn}>Isolation, RCD protection, volt drop and bonding</h3>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong className="text-white">Double-pole isolation.</strong> Regulation 462.2
              requires every circuit to be provided with isolation means for all live conductors,
              except as detailed in Regulation 461.2. A single-pole circuit-breaker does not isolate
              the neutral, so a lockable double-pole isolator adjacent to the boiler is the normal
              way of meeting this. Regulation 462.3 lists the acceptable precautions against
              inadvertent closure: a lockable space or enclosure, padlocking, or siting the device
              adjacent to the equipment.
            </li>
            <li>
              <strong className="text-white">RCD protection.</strong> There is no blanket 30mA
              requirement for fixed-equipment circuits. Regulation 411.3.3 covers socket-outlets
              rated up to 32A and mobile equipment up to 32A for use outdoors; Regulation 411.3.4
              covers AC final circuits supplying luminaires in domestic premises. Neither reaches a
              boiler. What usually does is the cable route: Regulation 522.6.202 and Table 52.1
              require additional protection by a 30mA RCD to Regulation 415.1.1 for a cable
              concealed less than 50mm from the surface of a wall, unless it is mechanically
              protected in one of the ways set out in Regulation 522.6.204. Since most boiler
              circuits are chased into a wall, an RCBO is the practical answer.
            </li>
            <li>
              <strong className="text-white">Volt drop.</strong> Table 4Ab of Appendix 4 gives 5%
              for uses other than lighting on an installation supplied directly from a public low
              voltage distribution system — about 11.5V at 230V. Calculate from the mV/A/m figures
              for the cable in use: for flat twin and earth with a protective conductor that is
              Table 4D5, not Table 4D1A, which is for single-core cables. On long runs at high
              current, 16mm&sup2; may be needed on volt drop alone. Regulation 643.11 covers
              verification of voltage drop.
            </li>
            <li>
              <strong className="text-white">Main protective bonding.</strong> Confirm main
              protective bonding to water, gas and any other services. Regulation 544.1.2 requires
              the connection to be made as near as practicable to the point of entry of that part
              into the premises, to the consumer&rsquo;s hard metal pipework and before any branch
              pipework, and where practicable within 600mm of the meter outlet union.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'types',
    heading: 'Types of Electric Boiler',
    content: (
      <>
        <p>
          Electric boilers come in three broad configurations. The difference matters electrically
          as well as commercially: a flow boiler is a single high-current circuit, a system boiler
          usually adds a second circuit for the cylinder immersion, and a heat battery is designed
          around an off-peak tariff.
        </p>

        <div className={cardCn}>
          <h3 className={subHeadCn}>Flow boilers (electric combi)</h3>
          <p className="text-white">
            Heat water on demand as it flows through the boiler — no stored hot water cylinder.
            Outputs run from about 4kW to 14.4kW, suiting smaller properties with modest hot water
            demand. A direct replacement for a gas combi, with no cold water storage tank, but it
            needs a dedicated high-current circuit from the consumer unit.
          </p>
        </div>

        <div className={cardCn}>
          <h3 className={subHeadCn}>Electric system boilers (with cylinder)</h3>
          <p className="text-white">
            Heat a separate hot water cylinder via a primary circuit, which suits larger properties
            with high hot water demand or multiple bathrooms. Typical outputs are 6kW to 14.4kW, and
            the cylinder often has its own immersion element as backup. Works well where a cylinder
            already exists, but budget for both a boiler circuit and a separate immersion circuit.
          </p>
        </div>

        <div className={cardCn}>
          <h3 className={subHeadCn}>Heat battery systems</h3>
          <p className="text-white">
            Store thermal energy during off-peak periods on Economy 7 or a time-of-use tariff, then
            release it for space heating and domestic hot water through the day. Tepeo ZEB uses a
            dense solid heat core; Sunamp UniQ uses a phase-change material. Running costs can be
            well below a standard flow boiler, but only with an off-peak tariff in place, and the
            physical footprint is compact relative to stored capacity.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification Requirements',
    content: (
      <>
        <p>
          Installing an electric boiler in a dwelling means adding a new circuit, which is
          notifiable work under Part P of the Building Regulations in England, and under the
          equivalent Welsh provisions. Scotland works to Building Standards and Northern Ireland to
          its own regulations.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong className="text-white">Registered competent person.</strong> Members of
              NICEIC, NAPIT or another government-approved competent person scheme can self-certify
              and notify building control automatically. The householder receives a Building
              Regulations compliance certificate.
            </li>
            <li>
              <strong className="text-white">Non-registered electrician.</strong> Notify local
              authority building control before starting work and pay the inspection fee. Building
              control inspects on completion and issues the compliance certificate if satisfied.
            </li>
            <li>
              <strong className="text-white">Electrical Installation Certificate.</strong> An EIC is
              required for any new circuit. Use the{' '}
              <SEOInternalLink href="/eic-certificate">
                Elec-Mate EIC Certificate tool
              </SEOInternalLink>{' '}
              to produce a compliant certificate on site.
            </li>
          </ul>
        </div>
        <p>
          Failing to notify causes trouble at sale, because solicitors routinely ask for evidence of
          Part P compliance for electrical work carried out since Part P came into force in January
          2005. A retrospective inspection can be arranged, but it costs more than notifying at the
          time.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electric Boiler Installation Costs',
    content: (
      <>
        <p>
          Cost depends on output, boiler type, distance from the consumer unit, whether a cylinder is
          retained or replaced, and whether the board needs upgrading. The figures below are
          indicative UK ranges — always price from your own rates.
        </p>
        <div className={tableWrap}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Item</th>
                <th className={thCn}>Typical range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdCn}>Electric flow boiler 6kW to 9kW, supply and fit</td>
                <td className={tdCn}>&pound;1,500 to &pound;2,800</td>
              </tr>
              <tr>
                <td className={tdCn}>Electric flow boiler 12kW to 14.4kW, supply and fit</td>
                <td className={tdCn}>&pound;2,200 to &pound;4,000</td>
              </tr>
              <tr>
                <td className={tdCn}>Heat battery system</td>
                <td className={tdCn}>&pound;3,500 to &pound;5,500</td>
              </tr>
              <tr>
                <td className={tdCn}>Consumer unit upgrade, if required</td>
                <td className={tdCn}>&pound;500 to &pound;1,200 additional</td>
              </tr>
              <tr>
                <td className={tdCn}>New 10mm&sup2; or 16mm&sup2; radial circuit, up to 15m</td>
                <td className={tdCn}>&pound;250 to &pound;600 additional</td>
              </tr>
              <tr>
                <td className={tdCn}>Gas pipe capping by a Gas Safe engineer</td>
                <td className={tdCn}>&pound;80 to &pound;200, separate contractor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'vs-gas',
    heading: 'Electric Boiler vs Gas Boiler',
    content: (
      <>
        <p>
          The comparison is rarely settled by the headline fuel price alone, though that is the
          single biggest factor. Electricity costs several times more per kWh than mains gas in the
          UK, and the efficiency advantage of an electric boiler does not close that gap.
        </p>
        <div className={cardCn}>
          <h3 className={subHeadCn}>In favour of electric</h3>
          <ul className={listCn}>
            <li>
              Essentially all the electrical energy drawn becomes heat — there are no flue losses.
            </li>
            <li>No annual Gas Safe service, so lower ongoing maintenance cost.</li>
            <li>No combustion products, so no carbon monoxide risk.</li>
            <li>No flue, so far more flexibility on where the unit goes.</li>
            <li>Lower installation cost than gas for a property with no gas connection.</li>
            <li>Grid electricity carbon intensity keeps falling as renewable generation grows.</li>
          </ul>
        </div>
        <div className={cardCn}>
          <h3 className={subHeadCn}>Against</h3>
          <ul className={listCn}>
            <li>Fuel cost per kWh is several times that of mains gas.</li>
            <li>
              Limited maximum output — most single-phase electric boilers stop at about 14.4kW,
              where gas boilers run to 35kW and beyond.
            </li>
            <li>
              May force electrical work well beyond the boiler itself: consumer unit, main tails,
              metering capacity or DNO consent.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Certification and Testing',
    content: (
      <>
        <p>
          Every electric boiler installation in a dwelling needs an Electrical Installation
          Certificate, and where the consumer unit is changed at the same time that work belongs in
          the same scope. Regulation 644.1 requires the EIC on completion of verification of a new
          circuit; Regulation 644.4.201 only permits a Minor Works Certificate where no new circuit
          is provided, which is not the case here.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <SEOInternalLink href="/eic-certificate">
                Electrical Installation Certificate
              </SEOInternalLink>{' '}
              — generate compliant EICs for new boiler circuits with the BS 7671 test results
              attached.
            </li>
            <li>
              <SEOInternalLink href="/tools/eicr-certificate">EICR Certificate</SEOInternalLink> —
              inspect and report on the existing installation before adding the boiler circuit.
            </li>
            <li>
              <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                EICR observation codes
              </SEOInternalLink>{' '}
              — what to record when the existing installation has deficiencies.
            </li>
          </ul>
        </div>

        <h3 className={subHeadCn}>What the certificate must carry</h3>
        <p>
          Regulation 644.3 requires the Certificate to state the extent of the work covered and to
          include Schedule(s) of Inspection, plus Schedule(s) of Circuit Details and Schedule(s) of
          Test Results, based on the models in Appendix 6. Regulation 644.4 requires it to be issued
          to the person ordering the work together with those records, and the recommended interval
          to the first periodic inspection to be recorded on it.
        </p>

        <h3 className={subHeadCn}>Tests for a new boiler circuit</h3>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong className="text-white">Continuity of conductors (Regulation 643.2).</strong>{' '}
              Verify the circuit protective conductor is continuous from the consumer unit to the
              earth terminal at the boiler isolator. This test must be done before the earth fault
              loop impedance measurement.
            </li>
            <li>
              <strong className="text-white">Insulation resistance (Regulation 643.3).</strong> Test
              between live conductors, and between live conductors and the protective conductor, at
              the Table 64 voltage — 500V DC for a 230V circuit, minimum 1M&Omega; — with the boiler
              disconnected. Regulation 643.3.3, new at A4:2026, then requires a second test at 250V
              DC between live conductors and the protective conductor after the equipment is
              connected, again with a minimum of 1M&Omega;.
            </li>
            <li>
              <strong className="text-white">Polarity (Regulation 643.6).</strong> Confirm the line
              conductor lands on the line terminal of the isolator and that the protective device at
              the board is in the line conductor only.
            </li>
            <li>
              <strong className="text-white">
                Earth fault loop impedance (Regulation 643.7.3.1).
              </strong>{' '}
              Measure Z<sub>s</sub> at the boiler isolator and compare it against the Table 41.3
              value for the device fitted, using the 5s column where the circuit exceeds 32A and
              supplies only fixed equipment.
            </li>
            <li>
              <strong className="text-white">RCD verification (Regulation 643.8).</strong> Where an
              RCD provides additional protection, verify it with equipment to BS EN 61557-6. The
              note to Regulation 643.7.1 deems effectiveness verified where a general non-delay type
              RCD disconnects within 300ms on an alternating current test at rated residual
              operating current I&Delta;n.
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricBoilerInstallationPage() {
  return (
    <GuideTemplate
      title="Electric Boiler Size & Wiring: 9kW = 39A, 10mm²"
      description="Size an electric boiler at ~1kW per 10m² of floor area. A 9kW boiler draws 39A: wire it in 10mm² twin and earth on a dedicated 40A radial. Part P, testing and costs."
      datePublished="2024-06-01"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Electric Boiler Installation{' '}
          <span className="text-elec-yellow">— Complete UK Guide</span>
        </>
      }
      heroSubtitle="Sizing, circuit design, disconnection times, Part P notification, testing and realistic costs for electric boiler installations in UK dwellings."
      readingTime={11}
      answerBox={{
        question: 'What cable size and circuit does an electric boiler need?',
        answer:
          'Size it from the design current. At 230V a 9kW electric boiler draws 39A, so it takes a dedicated radial in 10mm² twin and earth on a 40A circuit-breaker; a 12kW unit draws 52A and a 14.4kW unit 63A, needing 16mm² and a 63A device. Above about 14.4kW you are past the 63A domestic range and into a three-phase supply. Apply the Appendix 4 correction factors and satisfy Regulation 433.1.1 — Ib ≤ In ≤ Iz.',
        detail:
          'Note that 45A is not a BS EN 60898 circuit-breaker rating: Table 41.3 runs 32A, 40A, 50A, 63A. And because a boiler circuit above 32A supplies fixed equipment, Table 41.1 does not apply to it — 5s in a TN system under Regulation 411.3.2.3, 1s in a TT system under Regulation 411.3.2.4.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electric Boiler Installation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certificate electric boiler installations with Elec-Mate"
      ctaSubheading="Generate compliant EICs and EICRs on your phone. Start your free 7-day trial today."
    />
  );
}
