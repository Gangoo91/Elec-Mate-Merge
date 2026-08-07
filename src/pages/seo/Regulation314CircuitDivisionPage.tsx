import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  FileCheck2,
  Calculator,
  Zap,
  GraduationCap,
  BookOpen,
  CircuitBoard,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared styles
// -------------------------------------------------------------------

/** Cards run edge-to-edge on phones, inset and rounded from sm: up. */
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 my-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const cellCn = 'py-2.5 pr-4 align-top';
const numCellCn = 'py-2.5 pr-4 align-top whitespace-nowrap';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Regulation 314', href: '/guides/regulation-314-division-of-circuits' },
];

const tocItems = [
  { id: 'overview', label: 'Division of Circuits Overview' },
  { id: 'regulation-314-1', label: 'Regulation 314.1 — The Six Objectives' },
  { id: 'regulation-314-3', label: 'Regulations 314.2 to 314.4 — Separation' },
  { id: 'maximum-demand', label: 'Maximum Demand Per Circuit' },
  { id: 'ring-vs-radial', label: 'Ring vs Radial: When to Use Each' },
  { id: 'circuit-separation', label: 'Circuit Separation Requirements' },
  { id: 'domestic-design', label: 'Practical Design: Domestic Installations' },
  { id: 'commercial-design', label: 'Practical Design: Commercial Installations' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Regulation 314.1 requires that every installation shall be divided into circuits, as necessary, to avoid danger and minimise inconvenience in the event of a fault. This is not a suggestion — it is a mandatory design requirement listing six specific objectives, items (a) to (f).',
  'Regulation 314.2 requires that separate circuits are provided for parts of the installation that need to be separately controlled, in such a way that those circuits are not affected by the failure of other circuits, with due account taken of the consequences of the operation of any single protective device.',
  'Regulation 314.3 sets the number of final circuits and the number of points per final circuit, such that compliance with Chapter 43 (overcurrent), Chapter 46 and Section 537 (isolation and switching) and Chapter 52 (current-carrying capacity) is facilitated.',
  'Regulation 314.4 is the one that answers "how do I prevent indirect energising?" — where an installation comprises more than one final circuit, each final circuit shall be connected to a separate way in a distribution board, and the wiring of each final circuit shall be electrically separate from that of every other final circuit. No borrowed neutrals, no shared cables.',
  'Ring final circuits for BS 1363 accessories are covered by Regulation 433.1.204: a 30 A or 32 A protective device, copper line and neutral conductors of at least 2.5 mm² (1.5 mm² for two-core mineral insulated cable to BS EN 60702-1), and a cable current-carrying capacity of not less than 20 A. Appendix 15 is the informative guidance that supports it.',
  'Regulation 314.1(c) requires the design to take account of hazards that may arise from the failure of a single circuit, such as a lighting circuit — the basis for keeping lighting on a separate protective device from the socket-outlet circuits, so that a trip on a socket circuit does not leave the occupants in darkness.',
];

const faqs = [
  {
    question: 'What does Regulation 314.1 actually require?',
    answer:
      'Regulation 314.1 requires that every installation shall be divided into circuits, as necessary, to achieve six objectives, listed as items (a) to (f): (a) avoid danger and minimise inconvenience in the event of a fault; (b) facilitate safe inspection, testing and maintenance (see also Chapter 46 and Section 537); (c) take account of hazards that may arise from the failure of a single circuit, such as a lighting circuit; (d) reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor (PE) currents not due to a fault; (e) mitigate the effects of electromagnetic disturbances (see also Chapter 44); and (f) prevent the indirect energising of a circuit intended to be isolated. In practice, a single circuit supplying the entire installation is not acceptable — the installation must be divided so that a fault on one circuit does not affect others, and so circuits can be individually isolated for maintenance.',
  },
  {
    question: 'How many circuits does a domestic installation need?',
    answer:
      'BS 7671 does not specify a minimum number of circuits, but the On-Site Guide and Appendix 15 provide guidance. A typical modern domestic installation (3-bedroom house) would have as a minimum: 2 ring final circuits for socket outlets (upstairs and downstairs, or front and back), 2 lighting circuits (upstairs and downstairs), 1 dedicated cooker circuit (typically a 32 A radial), 1 dedicated shower circuit (if an electric shower is fitted — typically 40 A, 45 A or 50 A depending on the rating), 1 dedicated immersion heater circuit, 1 dedicated circuit for a smoke/fire alarm system, and possibly dedicated circuits for EV charger, heat pump, or other high-demand fixed equipment. This gives a minimum of approximately 8 to 12 circuits for a standard house. Larger properties, or those with more electrical equipment, will need more.',
  },
  {
    question: 'When should I use a ring final circuit instead of a radial?',
    answer:
      'A ring final circuit is the standard arrangement for BS 1363 socket outlets in UK domestic installations. Regulation 433.1.204 permits it with a 30 A or 32 A protective device and copper line and neutral conductors of at least 2.5 mm². Because the two legs of the ring act in parallel, the worst-case R1+R2 at the mid-point is a quarter of the end-to-end loop value measured at the board, so Zs and voltage drop are lower than a single radial run in the same cable over the same route. Use a ring when the circuit serves multiple general-purpose socket outlets across an area (historically limited to 100 m² of floor area, Appendix 15), the outlets are spread out so that the ring route is practical, and the cable can be run as a continuous ring. Use a radial when the circuit serves a dedicated load (cooker, shower, immersion heater), the floor area is small (Appendix 15, Figure 15B shows a 20 A radial in 2.5 mm² historically limited to 50 m²), or the routing makes a ring impractical.',
  },
  {
    question: 'Can I put lighting and sockets on the same circuit?',
    answer:
      'BS 7671 does not contain a blanket prohibition on lighting and socket outlets sharing a circuit, but it is strongly discouraged. Regulation 314.1(c) requires the division of circuits to take account of hazards that may arise from the failure of a single circuit, such as a lighting circuit. If lighting and sockets share a circuit and that circuit trips (for example, due to a fault on an appliance plugged into a socket), the occupants can be left in darkness — a danger, particularly on stairways. Combined with Regulation 314.2 (separate circuits for parts that need to be separately controlled), this is precisely the scenario the standard aims to prevent. Always provide separate lighting circuits.',
  },
  {
    question: 'What is the maximum length of a 2.5 mm² radial circuit?',
    answer:
      'BS 7671 does not tabulate a maximum length for any circuit. The length that works is whatever still satisfies voltage drop (Appendix 4) and the maximum earth fault loop impedance (Zs) needed for the disconnection time in Table 41.1 (Regulation 411.3.2.2), once the correct rating factors have been applied for grouping, ambient temperature and thermal insulation. What Appendix 15 does give is a floor area: Figure 15B notes that a 20 A radial in 2.5 mm² has historically been limited to 50 m² of floor area served. Treat that as a sanity check on the design, not as a length limit — a long, lightly loaded run and a short, heavily loaded one fail for completely different reasons. Work the numbers for the actual cable, route and installation method.',
  },
  {
    question: 'What is the maximum floor area for a ring final circuit?',
    answer:
      'Appendix 15 of BS 7671 (which supports Regulation 433.1.204) notes that, historically, a limit of 100 m² of floor area has been adopted for a ring final circuit. It is informative guidance, not a hard regulatory limit — but exceeding it increases the cable length and therefore the R1+R2 and Zs values, which may compromise automatic disconnection of supply. Appendix 15 also advises designers to locate socket outlets to provide reasonable sharing of the load around the ring, not to supply immersion heaters or comprehensive electric space heating from the ring, and to connect cookers, ovens and hobs with a rated power exceeding 2 kW on their own dedicated radial circuit. For large open-plan areas it is often better to use two ring circuits or a mix of ring and radial circuits.',
  },
  {
    question: 'Do I need a dedicated circuit for a dishwasher or washing machine?',
    answer:
      'BS 7671 does not specifically require dedicated circuits for dishwashers or washing machines in domestic premises. These appliances are typically connected via a 13 A plug to a socket on the ring final circuit. However, there are practical reasons to consider a dedicated circuit: a faulty appliance trips only its own circuit (not the entire ring); the appliance earth leakage does not contribute to accumulated leakage on the shared RCD; and the RCBO type can be matched to the appliance (Type A or Type F for inverter-driven washing machines). Whether a dedicated circuit is provided depends on the client brief, the budget, and the installation design. For new installations, providing dedicated RCBO-protected circuits for major appliances is considered best practice.',
  },
  {
    question: 'How does circuit division affect RCD arrangements?',
    answer:
      'Regulation 314.1(d) requires the division of circuits to reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor (PE) currents that are not due to a fault, and Regulation 531.3.2 is where that turns into a number. Indent (c) requires that the accumulation of protective conductor currents and/or earth leakage currents downstream of an RCD is not more than 30% of the rated residual operating current — so for a 30 mA RCD the design ceiling is 9 mA, not 30 mA. That is far tighter than most people assume, and a handful of modern appliances will reach it. Indent (a) requires subdivision of circuits with individual associated RCDs, and indent (b) specifically highlights the use of RCBOs for individual final circuits in residential premises; both cross-refer to Section 314. Note also that a 30 mA RCD may operate at any residual current above 50% of its rating (15 mA), so the 30% figure is a design margin, not a coincidence.',
  },
  {
    question: 'What RCD type should each circuit have?',
    answer:
      'Regulation 531.3.3 lists RCD Types AC, A, F and B, and states that RCD Type AC shall only be used to serve fixed equipment where it is known that the load current contains no DC components — examples given are electric heating appliances and simple filament lighting, neither containing electronic components. In a modern dwelling almost nothing meets that description, so Type A is the practical minimum for general socket-outlet and lighting circuits. Type F adds tripping for composite residual currents and suits line-to-neutral circuits supplying frequency-inverter appliances such as washing machines. Type B is for loads that can produce smooth DC residual current. Selecting the type is part of the circuit division decision, because the load determines both which RCD is suitable and how many circuits can share one.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/regulation-411-automatic-disconnection',
    title: 'Regulation 411 — ADS Explained',
    description: 'How circuit design affects earth fault loop impedance and ADS compliance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/regulation-418-supplementary-protection',
    title: 'Additional RCD Protection',
    description:
      '30 mA RCD requirements, RCD types, and how circuit division affects nuisance tripping.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size ring and radial circuits with automatic voltage drop and Zs verification.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Record circuit details, protective devices, and test results on EIC certificates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/inspection-testing-course',
    title: 'Inspection and Testing Course',
    description:
      'Study circuit design principles, ring circuit testing, and radial circuit verification.',
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
    heading: 'Division of Installation Into Circuits',
    content: (
      <>
        <p>
          Section 314 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          is printed under the heading <em>Division of installation</em>. It sits in Chapter 31,
          Part 3 (Assessment of General Characteristics), and runs to four regulations. Each one
          does a different job:
        </p>
        <div className={cardCn}>
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4 font-semibold whitespace-nowrap">
                    Regulation
                  </th>
                  <th className="text-left py-2 font-semibold">What it requires</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className={numCellCn}>314.1</td>
                  <td className={cellCn}>
                    Every installation shall be divided into circuits, as necessary, to achieve six
                    objectives, items (a) to (f).
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={numCellCn}>314.2</td>
                  <td className={cellCn}>
                    Separate circuits for parts of the installation that need to be separately
                    controlled, unaffected by the failure of other circuits.
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={numCellCn}>314.3</td>
                  <td className={cellCn}>
                    The number of final circuits, and points per circuit, shall facilitate
                    compliance with Chapter 43, Chapter 46, Section 537 and Chapter 52.
                  </td>
                </tr>
                <tr>
                  <td className={numCellCn}>314.4</td>
                  <td className={cellCn}>
                    Each final circuit connected to a separate way in a distribution board, and
                    wired electrically separately from every other final circuit.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h3 className="text-base font-semibold text-white mt-6 mb-2">
          To prevent indirect energising of a circuit, what must be done?
        </h3>
        <p>
          Regulation 314.1(f) sets the objective — prevent the indirect energising of a circuit
          intended to be isolated — and Regulation 314.4 says what must actually be done about it.
          Where an installation comprises more than one final circuit, each final circuit shall be
          connected to a separate way in a distribution board, and the wiring of each final circuit
          shall be electrically separate from that of every other final circuit. On site that means
          no borrowed neutrals, no two circuits sharing a cable, and no arrangement in which
          isolating one way at the board leaves conductors in that circuit live from another way.
        </p>
        <p>
          Circuit division is not just about calculating cable sizes and protective device ratings.
          It is about designing an installation that limits the consequences of a fault, allows safe
          maintenance, provides operational flexibility, and minimises nuisance tripping. A
          well-designed circuit arrangement means a fault on one circuit does not plunge the house
          into darkness, does not disable the fire alarm, and does not defrost the freezer.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-314-1',
    heading: 'Regulation 314.1 — Every Installation Shall Be Divided',
    content: (
      <>
        <p>
          Regulation 314.1 is clear: every installation shall be divided into circuits, as
          necessary, to achieve six objectives. The regulation lists them as items (a) to (f), and a
          compliant design must satisfy each one that is relevant to the installation:
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-0.5 shrink-0 w-6">(a)</span>
              <span>
                <strong>Avoid danger and minimise inconvenience</strong> in the event of a fault. A
                single circuit feeding the whole installation is not acceptable — a fault must not
                be allowed to disable everything at once.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-0.5 shrink-0 w-6">(b)</span>
              <span>
                <strong>Facilitate safe inspection, testing and maintenance</strong> (see also
                Chapter 46 and Section 537). Dividing the installation lets individual circuits be
                isolated for safe working without shutting down the whole property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-0.5 shrink-0 w-6">(c)</span>
              <span>
                <strong>
                  Take account of hazards arising from the failure of a single circuit
                </strong>{' '}
                such as a lighting circuit. This is the regulatory basis for keeping lighting
                separate from sockets and for dedicating critical circuits (fire alarm, emergency
                lighting).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-0.5 shrink-0 w-6">(d)</span>
              <span>
                <strong>Reduce the possibility of unwanted tripping of RCDs</strong> due to
                excessive protective conductor (PE) currents not due to a fault. This drives the
                choice between split-load RCD boards and individual RCBO boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-0.5 shrink-0 w-6">(e)</span>
              <span>
                <strong>Mitigate the effects of electromagnetic disturbances</strong> (see also
                Chapter 44). Circuits supplying sensitive equipment (data and communications) are
                kept apart from circuits supplying disturbance sources (motors, welders).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-0.5 shrink-0 w-6">(f)</span>
              <span>
                <strong>
                  Prevent the indirect energising of a circuit intended to be isolated
                </strong>{' '}
                — supported by Regulation 314.4, which requires each final circuit to be wired
                electrically separately from every other final circuit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulation-314-3',
    heading: 'Regulations 314.2, 314.3 and 314.4 — Separation and Numbers',
    content: (
      <>
        <p>
          The remaining regulations in Section 314 turn the broad objectives of 314.1 into concrete
          design rules. It is worth getting the numbering right, because each one means something
          different — here they are in full:
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-0.5 shrink-0 whitespace-nowrap">
                314.2
              </span>
              <span>
                Separate circuits shall be provided for parts of the installation that need to be
                separately controlled, in such a way that those circuits are not affected by the
                failure of other circuits, and due account shall be taken of the consequences of the
                operation of any single protective device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-0.5 shrink-0 whitespace-nowrap">
                314.3
              </span>
              <span>
                The number of final circuits required, and the number of points supplied by any
                final circuit, shall be such as to facilitate compliance with Chapter 43
                (overcurrent protection), Chapter 46 and Section 537 (isolation and switching) and
                Chapter 52 (current-carrying capacities of conductors).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-0.5 shrink-0 whitespace-nowrap">
                314.4
              </span>
              <span>
                Where an installation comprises more than one final circuit, each final circuit
                shall be connected to a separate way in a distribution board, and the wiring of each
                final circuit shall be electrically separate from that of every other final circuit,
                so as to prevent the indirect energising of a final circuit intended to be isolated.
              </span>
            </li>
          </ul>
        </div>
        <h3 className="text-base font-semibold text-white mt-6 mb-2">
          Which loads get their own circuit, and on whose authority
        </h3>
        <p>
          Section 314 is a set of objectives, not a shopping list of circuits, so it is worth being
          precise about where each everyday separation rule actually comes from:
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Safety services</strong> — the one hard requirement. Regulation 560.7.1 states
              that, except where the recommendations of other safety standards apply, circuits of
              safety services shall be independent of other circuits. Its note explains why: an
              electrical fault, intervention or modification in one system must not affect the
              correct functioning of the other. Fire alarm and emergency lighting circuits get their
              own way at the board, and 560.7.2 keeps them out of locations exposed to fire risk
              (BE2) except as that regulation permits.
            </li>
            <li>
              <strong>Lighting and power</strong> — not a prohibition, an objective. Regulation
              314.1(c) requires the design to take account of hazards arising from the failure of a
              single circuit, such as a lighting circuit, and 314.2 requires separate circuits for
              parts that need separate control. Put together, a design that leaves occupants in the
              dark when a socket circuit trips does not meet 314.1(c). Separate protective devices
              for lighting and sockets are how competent designers discharge that duty.
            </li>
            <li>
              <strong>Cookers, ovens and hobs above 2 kW</strong> — Appendix 15 advises connecting
              them on their own dedicated radial circuit, and advises against supplying immersion
              heaters or comprehensive electric space heating from a ring final circuit. That is
              informative guidance supporting Regulation 433.1.204, but it is the reason those loads
              come off the ring.
            </li>
            <li>
              <strong>Showers, EV chargers and other high-current loads</strong> — no regulation
              names them individually. They end up on dedicated circuits because 433.1.1 (Ib ≤ In ≤
              Iz) and the voltage drop and Zs limits cannot be met any other way once the load is
              added to a shared circuit.
            </li>
          </ul>
        </div>
        <p>
          Section 314 does not prescribe exactly how to divide circuits — it sets the objectives and
          leaves the specific design to the competent electrician. That is a feature, not a gap: it
          is also why an inspector can record a division of circuits as unsatisfactory without
          pointing at a numeric limit.
        </p>
      </>
    ),
  },
  {
    id: 'maximum-demand',
    heading: 'Maximum Demand Per Circuit',
    content: (
      <>
        <p>
          Each circuit must be designed to carry the maximum demand of the connected load. The
          protective device rating and cable size are selected from the design current (Ib) of the
          circuit, and Regulation 433.1.1 sets the coordination that follows: Ib ≤ In ≤ Iz.
        </p>
        <div className={cardCn}>
          <h4 className="font-semibold text-white mb-3">
            Typical domestic circuit design currents
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4 font-semibold">Circuit</th>
                  <th className="text-left py-2 pr-4 font-semibold whitespace-nowrap">
                    Design current
                  </th>
                  <th className="text-left py-2 pr-4 font-semibold whitespace-nowrap">Device</th>
                  <th className="text-left py-2 font-semibold whitespace-nowrap">Cable</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>Ring final circuit (sockets)</td>
                  <td className={cellCn}>Varies — diversity applies</td>
                  <td className={numCellCn}>32 A</td>
                  <td className={numCellCn}>2.5 mm²</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>Radial (sockets)</td>
                  <td className={cellCn}>Up to 20 A</td>
                  <td className={numCellCn}>20 A</td>
                  <td className={numCellCn}>2.5 mm²</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>Lighting</td>
                  <td className={cellCn}>Up to 6 A</td>
                  <td className={numCellCn}>6 A</td>
                  <td className={numCellCn}>1.5 mm²</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>Cooker, 12 kW</td>
                  <td className={cellCn}>≈ 28 A after diversity (52 A connected)</td>
                  <td className={numCellCn}>32 A</td>
                  <td className={numCellCn}>6 mm²</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>Electric shower, 9.5 kW</td>
                  <td className={cellCn}>≈ 41 A</td>
                  <td className={numCellCn}>45 A</td>
                  <td className={numCellCn}>10 mm²</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>Immersion heater, 3 kW</td>
                  <td className={cellCn}>≈ 13 A</td>
                  <td className={numCellCn}>16 A</td>
                  <td className={numCellCn}>2.5 mm²</td>
                </tr>
                <tr>
                  <td className={cellCn}>EV charger, 7.4 kW</td>
                  <td className={cellCn}>≈ 32 A</td>
                  <td className={numCellCn}>32 A</td>
                  <td className={numCellCn}>6 mm²</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-xs mt-3">
            Currents are at 230 V. Cable sizes are the usual starting point, not an answer — the
            current-carrying capacity that matters is the tabulated Iz for the actual reference
            method, after the rating factors for ambient temperature, grouping and thermal
            insulation. Verify every circuit with the{' '}
            <SEOInternalLink href="/tools/cable-sizing-calculator">
              cable sizing calculator
            </SEOInternalLink>{' '}
            using the real installation method, run length and rating factors.
          </p>
        </div>
        <h3 className="text-base font-semibold text-white mt-6 mb-2">
          Diversity applies to circuits too, not just to the main supply
        </h3>
        <p>
          A common misreading is that diversity belongs only at the origin. Regulation 311.1 says
          otherwise: in determining the maximum demand of an installation <em>or part thereof</em>,
          diversity may be taken into account — and Part 2 defines diversity in the same terms, as a
          means of determining maximum demand for an installation or part thereof, taking account of
          usage patterns. The cooker row above is exactly that. The On-Site Guide method takes the
          first 10 A of the appliance&apos;s rated current in full, adds 30% of the remainder, and
          adds a further 5 A if a socket-outlet is incorporated in the control unit. A 12 kW cooker
          draws roughly 52 A connected, which becomes about 28 A of design current — which is why a
          32 A device is normal on a 12 kW cooker and a 52 A one is not.
        </p>
        <p>
          Diversity is a design allowance, not a get-out. Once assessed, the circuit must still
          satisfy Ib ≤ In ≤ Iz, the voltage drop limit and the Zs limit for its disconnection time.
          For the dedicated high-demand circuits, see the sizing guides for the{' '}
          <SEOInternalLink href="/guides/cable-size-for-cooker-circuit">
            cooker circuit
          </SEOInternalLink>
          , the{' '}
          <SEOInternalLink href="/guides/cable-size-for-electric-shower">
            electric shower
          </SEOInternalLink>{' '}
          and the{' '}
          <SEOInternalLink href="/guides/cable-size-for-ev-charger">EV charger</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'ring-vs-radial',
    heading: 'Ring vs Radial Circuits: When to Use Each',
    content: (
      <>
        <p>
          The choice between ring and radial circuits is one of the most common design decisions for
          UK electricians. Both are equally compliant with BS 7671 — the choice depends on the
          application, cable routing, and floor area.
        </p>
        <div className={cardCn}>
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4 font-semibold whitespace-nowrap"></th>
                  <th className="text-left py-2 pr-4 font-semibold whitespace-nowrap">
                    Ring final circuit
                  </th>
                  <th className="text-left py-2 font-semibold whitespace-nowrap">Radial circuit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>
                    <strong>Arrangement</strong>
                  </td>
                  <td className={cellCn}>
                    Starts and finishes at the distribution board, both ends of line, neutral and
                    cpc on the same terminals
                  </td>
                  <td className={cellCn}>
                    Starts at the distribution board and terminates at the last point — no return
                    leg
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>
                    <strong>Protective device</strong>
                  </td>
                  <td className={cellCn}>
                    30 A or 32 A, to BS 88 series, BS 3036, BS EN 60898, BS EN 60947-2 or BS EN
                    61009-1 (Reg 433.1.204)
                  </td>
                  <td className={cellCn}>
                    Matched to the load — 20 A for a general socket radial, or sized to the
                    appliance
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>
                    <strong>Minimum conductor</strong>
                  </td>
                  <td className={cellCn}>
                    2.5 mm² copper line and neutral; 1.5 mm² for two-core mineral insulated cable to
                    BS EN 60702-1. Iz not less than 20 A
                  </td>
                  <td className={cellCn}>Sized for the design current, route length and Zs</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>
                    <strong>Floor area served</strong>
                  </td>
                  <td className={cellCn}>Historically 100 m² (Appendix 15)</td>
                  <td className={cellCn}>
                    Historically 50 m² for a 20 A circuit in 2.5 mm² (Appendix 15, Figure 15B)
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={cellCn}>
                    <strong>Why choose it</strong>
                  </td>
                  <td className={cellCn}>
                    Two parallel legs, so lower R1+R2, lower Zs and lower volt drop over the same
                    route
                  </td>
                  <td className={cellCn}>
                    Simpler routing, no ring continuity to prove, and the only sensible arrangement
                    for a single fixed load
                  </td>
                </tr>
                <tr>
                  <td className={cellCn}>
                    <strong>Use when</strong>
                  </td>
                  <td className={cellCn}>
                    Multiple general-purpose socket outlets spread across an area, and the cable can
                    be run as a continuous ring
                  </td>
                  <td className={cellCn}>
                    A dedicated load, a small area, or a route where a ring is impractical
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h3 className="text-base font-semibold text-white mt-6 mb-2">
          Spurs: what Appendix 15 actually says
        </h3>
        <p>
          Spurs are the part of Appendix 15 that gets misquoted most. An unfused spur run in 2.5 mm²
          cable should feed one single or one twin socket-outlet only, and may be connected at the
          origin of the circuit in the distribution board as well as out on the ring. Where the
          connection is made in a junction box, the box should be to BS EN 60670-22 and — if it has
          screw terminals — it must remain accessible for inspection, testing and maintenance under
          Regulation 526.3, or use maintenance-free terminals instead.
        </p>
        <p>
          If several extra socket outlets are needed, either extend the ring itself or fit a fused
          connection unit to BS 1363-4 with a maximum 13 A fuse. The number of socket outlets a
          fused spur can supply is not fixed by a rule: Appendix 15 makes it dependent on the load
          characteristics, having taken diversity into account.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-separation',
    heading: 'Circuit Separation Requirements',
    content: (
      <>
        <p>
          Beyond ring vs radial, the design has to decide which loads go on which circuits. These
          are the conventions that discharge the 314.1 objectives in a normal dwelling.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Lighting</strong> — kept off the socket-outlet circuits, and split into at
              least two circuits in a dwelling (upstairs and downstairs, or front and back), so that
              one fault cannot darken the whole property. Typically a 6 A device on 1.5 mm². The
              driver is 314.1(c), not a numbered prohibition.
            </li>
            <li>
              <strong>Socket outlets</strong> — at least two general circuits, arranged so a trip on
              one does not remove all socket power. Upstairs and downstairs, or kitchen and utility
              on one and living areas on the other.
            </li>
            <li>
              <strong>Dedicated circuits</strong> — cooker, electric shower, immersion heater, EV
              charger and heat pump. Appendix 15 specifically puts cookers, ovens and hobs above 2
              kW on their own radial and keeps immersion heaters and comprehensive electric space
              heating off the ring.
            </li>
            <li>
              <strong>Safety services</strong> — fire alarm and emergency lighting circuits are
              independent of other circuits under Regulation 560.7.1, and under 560.7.2 must not
              pass through locations exposed to fire risk (BE2) except as that regulation permits.
            </li>
            <li>
              <strong>Outdoor circuits</strong> — outdoor socket outlets, garden lighting and
              outbuilding supplies on their own circuits. Weather-exposed faults and higher standing
              leakage are exactly the accumulation that Regulation 531.3.2 asks you to keep off a
              shared RCD.
            </li>
          </ul>
        </div>
        <h3 className="text-base font-semibold text-white mt-6 mb-2">
          Circuit division and RCD selection are the same decision
        </h3>
        <p>
          Regulation 531.3.2 requires RCDs to be selected and erected so as to limit the risk of
          unwanted tripping, and lists what must be considered: subdivision of circuits with
          individual associated RCDs, the use of RCBOs for individual final circuits in residential
          premises, and a hard ceiling — the accumulation of protective conductor currents and earth
          leakage currents downstream of the RCD shall be not more than 30% of the rated residual
          operating current. On a 30 mA device that is 9 mA across everything downstream. Both of
          the first two indents cross-refer back to Section 314, which is why the circuit schedule
          and the board layout have to be designed together.
        </p>
        <p>
          Type matters as much as count. Regulation 531.3.3 restricts RCD Type AC to fixed equipment
          where it is known that the load current contains no DC components — the examples given are
          electric heating appliances and simple filament lighting with no electronic components. A
          modern dwelling has almost nothing that qualifies, so Type A is the working minimum, with
          Type F where a frequency-inverter appliance sits on a line-to-neutral circuit and Type B
          where smooth DC residual current is possible.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-design',
    heading: 'Practical Design Approach: Domestic Installations',
    content: (
      <>
        <p>
          Here is a practical circuit design for a typical 3-bedroom semi-detached house. This is a
          starting point — adjust based on the specific property, customer requirements, and
          installed equipment.
        </p>
        <div className={cardCn}>
          <h4 className="font-semibold text-white mb-3">Typical domestic circuit schedule</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4 font-semibold">Circuit</th>
                  <th className="text-left py-2 pr-4 font-semibold whitespace-nowrap">Type</th>
                  <th className="text-left py-2 pr-4 font-semibold whitespace-nowrap">
                    Protection
                  </th>
                  <th className="text-left py-2 font-semibold whitespace-nowrap">Cable</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Downstairs sockets', 'Ring', '32 A RCBO Type A', '2.5 mm\u00b2'],
                  ['Upstairs sockets', 'Ring', '32 A RCBO Type A', '2.5 mm\u00b2'],
                  ['Kitchen sockets', 'Ring', '32 A RCBO Type A', '2.5 mm\u00b2'],
                  ['Downstairs lighting', 'Radial', '6 A RCBO Type A', '1.5 mm\u00b2'],
                  ['Upstairs lighting', 'Radial', '6 A RCBO Type A', '1.5 mm\u00b2'],
                  ['Cooker', 'Radial', '32 A RCBO Type A', '6 mm\u00b2'],
                  ['Electric shower', 'Radial', '45 A RCBO Type A', '10 mm\u00b2'],
                  ['Immersion heater', 'Radial', '16 A RCBO Type A', '2.5 mm\u00b2'],
                  ['Smoke and fire alarm', 'Radial', '6 A MCB Type B', '1.5 mm\u00b2'],
                  ['Outdoor socket', 'Radial', '20 A RCBO Type A', '2.5 mm\u00b2'],
                ].map(([circuit, type, protection, cable], i) => (
                  <tr key={circuit} className={i < 9 ? 'border-b border-white/10' : undefined}>
                    <td className={cellCn}>{circuit}</td>
                    <td className={numCellCn}>{type}</td>
                    <td className={numCellCn}>{protection}</td>
                    <td className={numCellCn}>{cable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white text-xs mt-3">
            Ten circuits, ten ways, and every one of them individually isolatable \u2014 which is
            what Regulation 314.4 is asking for. Add dedicated ways for an EV charger, heat pump or
            other high-demand equipment, and leave spare ways for future additions. The fire alarm
            circuit is shown on its own way because Regulation 560.7.1 requires circuits of safety
            services to be independent of other circuits.
          </p>
        </div>
        <SEOAppBridge
          title="Design circuit schedules with AI assistance"
          description="Elec-Mate's AI circuit designer generates circuit schedules based on property type, room layout, and equipment."
          icon={CircuitBoard}
        />
      </>
    ),
  },
  {
    id: 'commercial-design',
    heading: 'Practical Design Approach: Commercial Installations',
    content: (
      <>
        <p>
          Commercial installations follow the same principles as domestic but with additional
          considerations for three-phase supplies, larger load diversity, and more complex circuit
          arrangements.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Phase balancing</strong> — in three-phase installations, circuits are
              distributed across the three phases to balance the load. Unbalanced loads cause
              excessive neutral current and voltage imbalance, so allocate single-phase circuits
              approximately equally across L1, L2 and L3.
            </li>
            <li>
              <strong>Sub-distribution</strong> — large commercial installations use
              sub-distribution boards to reduce cable lengths and improve discrimination. The main
              board supplies sub-boards via sub-mains, and the sub-boards supply final circuits.
              Each sub-board serves a defined area or function.
            </li>
            <li>
              <strong>Essential and non-essential loads</strong> — essential loads (servers, fire
              alarms, emergency lighting, security) are separated from non-essential loads (general
              lighting, socket outlets, HVAC). Essential loads may be supplied from a UPS or
              generator, requiring separate distribution, and safety services carry the independence
              requirement of Regulation 560.7.1 in their own right.
            </li>
            <li>
              <strong>Mechanical plant circuits</strong> — HVAC equipment, lifts and other
              mechanical plant take dedicated circuits. Type C or D devices are common because the
              inrush of an inductive load will trip a Type B on a healthy circuit.
            </li>
          </ul>
        </div>
        <p>
          The design process for a commercial installation typically starts with a load schedule
          (every item of equipment and its power demand), followed by a diversity assessment, then
          circuit allocation (deciding which loads go on which circuits), and finally cable sizing
          and protective device selection for each circuit. BS 7671 permits the diversity step at
          Regulation 311.1 and defines the term in Part 2, but the worked allowance tables are in
          the IET On-Site Guide (Appendix A, Table A2) — which itself cautions that the values are
          guidance only, are not recently updated, and that appropriate allowances call for special
          knowledge and experience. Current-carrying capacity and voltage drop figures for the final
          step come from BS 7671 Appendix 4. The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          handles the cable sizing and protective device verification for each individual circuit.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Regulation314CircuitDivisionPage() {
  return (
    <GuideTemplate
      title="Regulation 314 | Division of Installation Into Circuits"
      description="Complete guide to Regulation 314 of BS 7671 — division of installation into circuits. Circuit design principles, ring vs radial decisions."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Deep-Dive"
      badgeIcon={BookOpen}
      answerBox={{
        question: 'What does Regulation 314 of BS 7671 require?',
        answer:
          'Regulation 314 requires every installation to be divided into circuits. Regulation 314.1 lists six objectives (a–f): avoid danger and inconvenience, allow safe testing and maintenance, limit the effect of a single circuit failing, reduce unwanted RCD tripping, mitigate electromagnetic disturbance, and prevent indirect energising. Regulations 314.2 to 314.4 then require separate circuits for parts needing separate control, set the number of circuits and points, and keep each final circuit electrically separate.',
        detail:
          'Section 314 is headed "Division of installation" and sits in Chapter 31 of Part 3 (Assessment of General Characteristics) of BS 7671:2018+A4:2026.',
      }}
      heroTitle={
        <>
          Regulation 314:{' '}
          <span className="text-yellow-400">Division of Installation Into Circuits</span>
        </>
      }
      heroSubtitle="Every installation must be divided into circuits to avoid danger and minimise inconvenience. This guide covers the regulatory requirements, ring vs radial decisions, circuit separation, maximum demand, and practical circuit schedules for domestic and commercial installations."
      readingTime={17}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Circuit Division and Design"
      relatedPages={relatedPages}
      ctaHeading="Design Circuit Schedules and Size Cables on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-assisted circuit design, cable sizing, and on-site EIC certificates with professional schedules. 7-day free trial, cancel anytime."
    />
  );
}
