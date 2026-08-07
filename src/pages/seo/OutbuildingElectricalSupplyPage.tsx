import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  FileCheck2,
  ClipboardCheck,
  Calculator,
  ShieldCheck,
  FileText,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared styles
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableWrapCn = '-mx-4 my-5 overflow-x-auto sm:mx-0';
const tableCn = 'w-full min-w-[540px] border-collapse text-left text-sm text-white';
const thCn = 'border-b border-white/[0.18] px-4 py-3 align-top font-semibold text-white';
const tdCn = 'border-b border-white/[0.08] px-4 py-3 align-top text-white';
const tdKeyCn = `${tdCn} whitespace-nowrap font-semibold`;
const subHeadCn = 'mt-5 mb-2 text-[15px] font-semibold tracking-tight text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Outbuilding Electrical Supply', href: '/guides/outbuilding-electrical-supply-guide' },
];

const tocItems = [
  { id: 'short-answer', label: 'The Short Answer' },
  { id: 'overview', label: 'Outbuilding Supply Options' },
  { id: 'armoured-cable', label: 'Buried SWA Route' },
  { id: 'overhead-cable', label: 'Overhead Cable Route' },
  { id: 'consumer-unit', label: 'Consumer Unit in the Outbuilding' },
  { id: 'earthing', label: 'Earthing — TN or TT' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 sets no burial depth figure for a cable in a domestic garden. Regulation 522.8.10 requires a buried cable to incorporate an earthed armour or metal sheath suitable for use as a protective conductor (or a conduit/duct giving equivalent mechanical protection), to be at a sufficient depth to avoid reasonably foreseeable disturbance of the ground, and for its location to be marked by cable covers or a suitable marker tape.',
  'Overhead conductors: 3.5m above ground in pedestrian areas and 6m where vehicles move, with every overhead conductor insulated. Those figures are BS 7671 requirements for caravan parks (Reg 708.521.7.3) and marinas (Reg 709.521.1.8) — BS 7671 gives no separate domestic clearance, so these are the accepted benchmark rather than a domestic regulation.',
  'The outbuilding needs a main linked switch as near as practicable to the origin of the installation, interrupting both live conductors of a single-phase supply where it is intended for operation by ordinary persons (Reg 462.1.201).',
  '30mA RCD protection is required for socket-outlets up to 32A (Reg 411.3.3) and, within domestic premises, for AC final circuits supplying luminaires (Reg 411.3.4). The documented risk-assessment exception in 411.3.3 applies only to indent (b) — never to socket-outlets liable to be used by ordinary persons or children, and never to mobile equipment for use outdoors.',
  'On a TT outbuilding, Regulation 411.5.3 requires Ra × IΔn ≤ 50V, which Table 41.5 expresses as a maximum Zs of 1,667Ω for a 30mA RCD — but the note to that table warns that an electrode resistance above 200Ω may not be stable, so 1,667Ω is a compliance ceiling, not a target.',
  'Do not fit an earth electrode reflexively. Regulation 411.4.2 recommends an additional earth electrode at the main earthing terminal but states explicitly that the recommendation does not apply to outbuildings of dwellings served by the installation.',
  'A supply to an outbuilding is a new circuit from the dwelling consumer unit, so it is notifiable under Part P of the Building Regulations and is certified on an Electrical Installation Certificate — not a Minor Works Certificate.',
  'AFDDs (Reg 421.1.7) are required on socket-outlet final circuits up to 32A only in high rise residential buildings, houses in multiple occupation, purpose-built student accommodation and care homes. For an ordinary house and its garage or workshop, AFDDs are recommended, not required.',
];

const faqs = [
  {
    question: 'What size cable do I need for a garage or shed consumer unit?',
    answer:
      'Size the supply cable for the maximum demand of the outbuilding, then check it against both current-carrying capacity and voltage drop for the actual run length. As a starting point, a 16A or 20A supply for a shed with lighting and sockets is commonly run in 2.5mm SWA, and a 32A supply for a workshop with 230V power tools in 6mm SWA. An outbuilding with an EV charger or heavy workshop plant may need 40A or 63A. These are starting points only — the correct size depends on the run length, the installation method, grouping, ambient temperature and the ground conditions, all of which derate the cable. Long runs to remote outbuildings are usually decided by voltage drop rather than by current-carrying capacity, so always confirm the size by calculation before ordering the drum.',
  },
  {
    question: 'How deep does the armoured cable to an outbuilding have to be buried?',
    answer:
      'BS 7671 does not state a depth for a domestic garden. Regulation 522.8.10 requires that buried cables, conduits and ducts are at a sufficient depth to avoid being damaged by any reasonably foreseeable disturbance of the ground, that the cable incorporates an earthed armour or metal sheath suitable for use as a protective conductor unless it is in a conduit or duct providing equivalent mechanical protection, and that the location of the buried cable is marked by cable covers or a suitable marker tape. The numeric depths quoted in the trade come from the special-location sections: 0.5m is the note to Regulation 709.521.1.7 for marinas and 0.6m is the note to Regulation 708.521.7.2 for caravan parks where vehicles move. Most UK contractors work to 0.5m in a garden and 0.6m under anything a vehicle crosses, which is defensible practice, but the duty you are actually signing off is the "sufficient depth" judgement in 522.8.10.',
  },
  {
    question: 'What is the minimum overhead cable height for an outbuilding supply?',
    answer:
      'BS 7671 does not set a clearance height for overhead conductors at ordinary domestic premises. Where it does state figures — Regulation 708.521.7.3 for caravan parks and Regulation 709.521.1.8 for marinas — every overhead conductor must be insulated, poles and supports must be located or protected so they are unlikely to be damaged by any foreseeable vehicle movement, and conductors must be at a height above ground of not less than 6m in all areas subject to vehicle movement and 3.5m in all other areas. Those figures are the sensible benchmark for a domestic overhead run. Do not use unsupported twin-and-earth in the open air; use a self-supporting aerial cable with an integral messenger, or support the cable on a catenary wire. Manufacturers state a maximum unsupported span, and in practice anything beyond a few metres wants a catenary.',
  },
  {
    question: 'Do I need an earth electrode for an outbuilding supply?',
    answer:
      'Only if the outbuilding is a TT installation. If the SWA armour provides a continuous earthed metallic path back to the main building and the main building is TN-S or TN-C-S, the outbuilding is on a TN system and no electrode is needed. Fitting one anyway is not the automatic best practice it is often described as: Regulation 411.4.2 recommends an additional connection to Earth by means of an earth electrode at the main earthing terminal, then states that this recommendation does not apply to outbuildings of dwellings served by the installation. Where there is no metallic earth path — an overhead run without an earth conductor, or a design decision not to export a PME earth to a building with extraneous-conductive-parts such as a metal-clad workshop or one with a water supply — the outbuilding is TT and an electrode is required, together with fault protection under Regulation 411.5.',
  },
  {
    question: 'What size consumer unit do I need in an outbuilding?',
    answer:
      'The consumer unit size follows the number of circuits. For a shed or summerhouse with a lighting circuit and one socket circuit, a 4-way or 6-way board is adequate. For a workshop with power tools and heating, or a garage with an EV charger, an 8 to 12 way board gives room to work. Regulation 462.1.201 requires a main linked switch or linked circuit-breaker as near as practicable to the origin of the installation, and where it is intended for operation by ordinary persons it must interrupt both live conductors of a single-phase supply — so a double-pole main switch. Individual RCBOs per way are preferable to a dual-RCD split load, because a fault on one circuit then does not de-energise the whole outbuilding.',
  },
  {
    question: 'Can I use ordinary twin-and-earth cable for an outbuilding supply?',
    answer:
      'Not buried directly. Regulation 522.8.10 requires a buried cable to incorporate an earthed armour or metal sheath suitable for use as a protective conductor, except where it is installed in a conduit or duct providing equivalent protection against mechanical damage — the note gives underground conduits classified N750 to BS EN 50626-1 or BS EN 61386-24 as an example of equivalent protection. Twin-and-earth has neither armour nor metal sheath, so buried T&E is only acceptable inside such a conduit or duct, and it is a poor choice in a wet trench in any case. SWA is more practical because it satisfies the mechanical protection and the protective conductor requirement in one cable and can be clipped to an external wall without further protection.',
  },
  {
    question: 'Is RCD protection required at both the house and the outbuilding?',
    answer:
      'The usual approach is protection at both ends. At the main consumer unit the outbuilding circuit is run from an RCD-protected way or an RCBO, which protects the buried or overhead supply cable. At the outbuilding consumer unit, individual 30mA RCBOs protect the circuits within the outbuilding: socket-outlets up to 32A under Regulation 411.3.3 and, in domestic premises, AC final circuits supplying luminaires under Regulation 411.3.4. Splitting the protection this way means a fault in the outbuilding wiring trips only the outbuilding, while a fault in the supply cable trips at the house. Where two RCDs are in series and discrimination matters, the upstream device needs to be a time-delayed S type or otherwise selective.',
  },
  {
    question: 'What documents do I issue for an outbuilding supply?',
    answer:
      'An outbuilding supply is a new circuit from the main consumer unit, so an Electrical Installation Certificate is required — not a Minor Works Certificate. The EIC covers the supply circuit from the main consumer unit and the circuits within the outbuilding, with the schedule of inspections and the schedule of test results completed for each. Record continuity, insulation resistance, polarity, earth fault loop impedance and RCD operation, plus the measured electrode resistance Ra where the outbuilding is TT. The work is notifiable under Part P, so a scheme-registered electrician notifies it through their competent person scheme and a Building Regulations compliance certificate is issued to the customer.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/garden-electrical-wiring-regulations',
    title: 'Garden Electrical Wiring Regulations',
    description: 'SWA cable burial, RCD requirements, and outdoor socket standards.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size SWA supply cables for outbuildings correctly.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long supply runs to remote outbuildings.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/part-p-building-regulations-electrical',
    title: 'Part P Building Regulations Guide',
    description: 'Outbuilding supplies are notifiable — understand the requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for outbuilding supplies on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-handover-documentation',
    title: 'Electrical Handover Documentation',
    description: 'What documentation to issue on completion of an outbuilding supply.',
    icon: FileText,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'short-answer',
    heading: 'The Short Answer',
    content: (
      <>
        <p>
          A supply to a detached garage, shed, summerhouse or workshop is a new distribution circuit
          from the dwelling consumer unit, feeding a small consumer unit in the outbuilding. Here is
          the whole job in one table, with the regulation each figure actually comes from.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn} scope="col">
                  Item
                </th>
                <th className={thCn} scope="col">
                  What applies
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdKeyCn}>Cable</td>
                <td className={tdCn}>
                  Buried SWA is the default. 2.5mm SWA is the usual starting point for a 16A supply
                  and 6mm for 32A — confirm both current-carrying capacity and voltage drop for the
                  actual run before ordering.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Burial</td>
                <td className={tdCn}>
                  No depth figure in BS 7671 for a domestic garden. Reg 522.8.10 requires a
                  sufficient depth to avoid reasonably foreseeable ground disturbance, an earthed
                  armour or metal sheath usable as a protective conductor (or an equivalent conduit
                  or duct), and the route marked by cable covers or a suitable marker tape.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Overhead</td>
                <td className={tdCn}>
                  3.5m above pedestrian areas, 6m where vehicles move, every conductor insulated.
                  Stated in BS 7671 for caravan parks (Reg 708.521.7.3) and marinas (Reg
                  709.521.1.8); there is no separate domestic figure, so treat these as the
                  benchmark.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Main switch</td>
                <td className={tdCn}>
                  Main linked switch or linked circuit-breaker as near as practicable to the origin
                  of the installation; double-pole where operated by ordinary persons (Reg
                  462.1.201).
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Enclosure</td>
                <td className={tdCn}>
                  Within domestic premises, consumer units comply with BS EN 61439-3 and have a
                  non-combustible enclosure, or sit in a non-combustible cabinet (Reg 421.1.201).
                  Ferrous metal such as steel is the note&apos;s example.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>RCD</td>
                <td className={tdCn}>
                  30mA on socket-outlets up to 32A (Reg 411.3.3) and on AC final circuits supplying
                  luminaires in domestic premises (Reg 411.3.4). RCBO per way is the practical
                  choice.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Earthing</td>
                <td className={tdCn}>
                  TN through the SWA armour, or TT with a local electrode. On TT, Ra × IΔn ≤ 50V
                  (Reg 411.5.3) — 1,667Ω at 30mA per Table 41.5, but keep the electrode well below
                  200Ω.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Certificate</td>
                <td className={tdCn}>
                  Electrical Installation Certificate, not a Minor Works Certificate. Notifiable
                  under Part P.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'overview',
    heading: 'Outbuilding Electrical Supply: Options and Considerations',
    content: (
      <>
        <p>
          Supplying electricity to a detached garage, shed, summerhouse, home office or workshop is
          one of the most common domestic electrical jobs. The installation must comply with BS 7671
          for cable routing, earthing and protection, and it is notifiable under Part P of the
          Building Regulations.
        </p>
        <p>
          There are two routes for the supply cable: underground, using buried armoured cable, and
          overhead, using a self-supporting or catenary-supported cable. The choice depends on
          distance, ground conditions, obstacles and appearance. Underground is preferred for most
          domestic work because it is hidden, protected from UV and storm damage, and does not
          require a clearance height to be maintained for the life of the installation.
        </p>
        <p>
          Beyond the cable itself, the job needs a consumer unit in the outbuilding for local
          protection and isolation, a decided earthing arrangement, and RCD protection. Getting
          those three right at design stage is what separates a supply that lasts from one that gets
          coded on the next EICR — particularly now that outbuildings are routinely used as home
          offices and workshops with real load on them.
        </p>
      </>
    ),
  },
  {
    id: 'armoured-cable',
    heading: 'Buried SWA: What BS 7671 Actually Requires',
    content: (
      <>
        <p>
          Steel wire armoured cable buried underground is the standard method. The armour gives
          mechanical protection and, correctly terminated at both ends, can serve as the protective
          conductor.
        </p>

        <h3 className={subHeadCn}>The regulation, in full</h3>
        <p>
          Regulation 522.8.10 is the one that governs this. It requires that, except where installed
          in a conduit or duct providing equivalent protection against mechanical damage, a cable
          buried in the ground incorporates an earthed armour or metal sheath (or both) suitable for
          use as a protective conductor; that the location of buried cables is marked by cable
          covers or a suitable marker tape; that buried conduits and ducts are suitably identified;
          and that buried cables, conduits and ducts are at a sufficient depth to avoid being
          damaged by any reasonably foreseeable disturbance of the ground. The note treats metallic
          or non-metallic underground conduits classified N750 to BS EN 50626-1 or BS EN 61386-24 as
          providing equivalent mechanical protection.
        </p>
        <p>
          Note what is not there: no depth in millimetres, and covers <em>or</em> tape, not both.
          The depth figures quoted around the trade are borrowed from the special-location sections,
          where they appear as notes rather than as absolute limits.
        </p>

        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn} scope="col">
                  Depth figure
                </th>
                <th className={thCn} scope="col">
                  Where it comes from
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdKeyCn}>None</td>
                <td className={tdCn}>
                  Domestic garden — Reg 522.8.10 requires a &ldquo;sufficient depth&rdquo; judgement
                  and nothing more. 0.5m is the figure most UK contractors work to and is defensible
                  practice.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>0.5m</td>
                <td className={tdCn}>
                  Note to Reg 709.521.1.7, underground cables at marinas — &ldquo;generally
                  considered as a minimum depth&rdquo;.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>0.6m</td>
                <td className={tdCn}>
                  Note to Reg 708.521.7.2, underground distribution circuits in caravan parks, where
                  damage from tent pegs, ground anchors or vehicle movement is foreseeable. The
                  sensible figure under a drive.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>0.6m + protection</td>
                <td className={tdCn}>
                  Reg 705.522, agricultural premises — a requirement, not a note, where vehicles and
                  mobile agricultural machines are operated, and with added mechanical protection.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={subHeadCn}>Cable selection</h3>
        <p>
          Two-core SWA uses the armour as the protective conductor; three-core SWA gives a dedicated
          CPC with the armour earthed at both ends as an additional path. Three-core is the better
          choice where the run is long or the armour&apos;s continuity is hard to guarantee, because
          the earth fault loop impedance no longer depends on the quality of every gland. Conductor
          size follows the maximum demand of the outbuilding and the run length — on a long run it
          is usually voltage drop, not current-carrying capacity, that decides.
        </p>

        <h3 className={subHeadCn}>Entry into the outbuilding</h3>
        <p>
          Bring the cable in through a weatherproof entry — a conduit sleeve through the wall or
          floor, sealed against moisture. Run it up to the consumer unit in conduit or trunking so
          it is protected from mechanical damage inside the building, and record the buried route
          with dimensions taken from fixed reference points so the next person to dig knows where it
          is.
        </p>
      </>
    ),
  },
  {
    id: 'overhead-cable',
    heading: 'Overhead Cable Route',
    content: (
      <>
        <p>
          Where trenching is impractical — a fully paved garden, mature planting, a route that
          cannot be dug — an overhead run is the alternative.
        </p>
        <p>
          BS 7671 sets no clearance height for overhead conductors at ordinary domestic premises.
          The figures everyone quotes come from the special-location sections, and they are
          consistent across all of them: Regulation 708.521.7.3 for caravan parks and Regulation
          709.521.1.8 for marinas both require that every overhead conductor is insulated, that
          poles and other supports are located or protected so they are unlikely to be damaged by
          any foreseeable movement of vehicles, and that conductors are at a height above ground of
          not less than 6m in all areas subject to vehicle movement and 3.5m in all other areas. In
          the absence of a domestic figure, those are the numbers to design to.
        </p>

        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn} scope="col">
                  Where the cable crosses
                </th>
                <th className={thCn} scope="col">
                  Minimum height above ground
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdKeyCn}>Pedestrian areas</td>
                <td className={tdCn}>3.5m</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Any area subject to vehicle movement</td>
                <td className={tdCn}>
                  6m — driveways, parking, delivery access and anywhere a van or lorry can reach
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={subHeadCn}>Support and cable type</h3>
        <p>
          Every overhead conductor must be insulated. Use a self-supporting aerial cable with an
          integral messenger wire, or support an armoured cable on a separate tensioned catenary
          wire; manufacturers state a maximum unsupported span, and in practice anything beyond a
          few metres wants a catenary so the cable cannot sag below its clearance under its own
          weight, wind or ice. Do not run unsupported twin-and-earth in the open air. Where support
          heights cannot achieve 6m over a vehicle route, move the supports or raise the conductor —
          do not accept the shortfall.
        </p>
        <p>
          Overhead runs age faster than buried ones. XLPE-insulated SWA or purpose-made aerial
          bundled cable stands up to UV better than PVC-insulated cable, and the run should be
          inspected periodically for sag, damage and vegetation contact.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit in the Outbuilding',
    content: (
      <>
        <p>
          Every outbuilding on a permanent supply should have its own consumer unit, giving local
          isolation, overcurrent protection for its circuits, and a single point to kill all power
          without walking back to the house.
        </p>

        <h3 className={subHeadCn}>Main switch and position</h3>
        <p>
          Regulation 462.1.201 requires a main linked switch or linked circuit-breaker as near as
          practicable to the origin of every installation, as a means of switching the supply on
          load and as a means of isolation. Where that switch is intended for operation by ordinary
          persons — which it is, in a household outbuilding — it must interrupt both live conductors
          of a single-phase supply, so a double-pole main switch. &ldquo;As near as practicable to
          the origin&rdquo; is the test for where the board goes: keep the length of unprotected
          tail between the cable entry and the board short, and site the unit somewhere dry,
          accessible for maintenance and clear of mechanical damage or flooding.
        </p>

        <h3 className={subHeadCn}>Enclosure</h3>
        <p>
          Regulation 421.1.201 requires that, within domestic (household) premises, consumer units
          and similar switchgear assemblies comply with BS EN 61439-3 and either have an enclosure
          manufactured from non-combustible material, or be enclosed in a cabinet or enclosure of
          non-combustible material complying with Regulation 132.12. The note gives ferrous metal,
          for example steel, as an example of a non-combustible material. Because BS 7671 defines
          &ldquo;premises&rdquo; as covering the land and all facilities including buildings
          belonging to it, the garage or workshop of a house sits within the domestic premises —
          treat 421.1.201 as applying and fit a metal board. This has been a requirement since
          Amendment 3 to the 17th Edition took effect on 1 January 2016, not a change introduced by
          A4:2026.
        </p>

        <h3 className={subHeadCn}>Circuit protection</h3>
        <p>
          Individual MCBs or RCBOs per circuit — lighting, socket ring or radial, EV charger if
          fitted, fixed workshop equipment. RCBOs are the better choice here because a fault on one
          circuit does not put the whole outbuilding in the dark.
        </p>
        <p>
          On AFDDs, be precise about what Regulation 421.1.7 says. AFDDs to BS EN 62606{' '}
          <strong>shall</strong> be provided for single-phase AC final circuits supplying
          socket-outlets rated up to 32A in high rise residential buildings, houses in multiple
          occupation, purpose-built student accommodation and care homes. For all other premises —
          which includes an ordinary house and its garage or workshop — the regulation{' '}
          <strong>recommends</strong> them for the same circuits. Where used, an AFDD is placed at
          the origin of the circuit it protects, and using one does not remove the need for the
          other protective measures in BS 7671. A combined AFDD/RCBO covers arc-fault and residual
          current in one device and is worth quoting on a workshop full of extension leads and power
          tools.
        </p>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing — TN or TT',
    content: (
      <>
        <p>
          Earthing is the decision that most often goes wrong on outbuilding supplies. It turns on
          one question: is there a continuous, reliable metallic earth path back to the main
          building?
        </p>

        <div className="my-5 grid gap-4 sm:grid-cols-2">
          <div className={`${cardCn} sm:my-0`}>
            <h3 className="mb-3 text-base font-bold text-white">TN — metallic earth path</h3>
            <p className="mb-3 text-sm leading-relaxed text-white">
              Where the SWA armour is earthed at both ends and its continuity and impedance are
              adequate, the outbuilding is on a TN system and the armour carries the earth fault
              current back.
            </p>
            <ul className="space-y-2 text-sm text-white">
              <li>No earth electrode needed — see the note on 411.4.2 below.</li>
              <li>Earth fault loop impedance Zs measured and within the tabulated limit.</li>
              <li>
                30mA RCD for socket-outlets up to 32A (Reg 411.3.3) and for luminaire final circuits
                in domestic premises (Reg 411.3.4).
              </li>
            </ul>
          </div>
          <div className={`${cardCn} sm:my-0`}>
            <h3 className="mb-3 text-base font-bold text-white">TT — no metallic earth path</h3>
            <p className="mb-3 text-sm leading-relaxed text-white">
              An overhead run with no earth conductor, or a decision not to export a PME earth to a
              building with extraneous-conductive-parts, puts the outbuilding on a TT system with
              its own electrode.
            </p>
            <ul className="space-y-2 text-sm text-white">
              <li>Earth electrode required at the outbuilding.</li>
              <li>
                Ra × I<sub>Δn</sub> ≤ 50V (Reg 411.5.3) — 1,667Ω at 30mA, per Table 41.5.
              </li>
              <li>
                Fault protection by RCD is the preferred device under Reg 411.5.2; an overcurrent
                device is only viable if a suitably low Zs is permanently and reliably assured.
              </li>
            </ul>
          </div>
        </div>

        <h3 className={subHeadCn}>Do not fit an electrode reflexively</h3>
        <p>
          It is widely repeated that an earth electrode at every outbuilding is good practice
          regardless of system type. BS 7671 says the opposite. Regulation 411.4.2 recommends that
          an additional connection to Earth, by means of an earth electrode to Chapter 54, is made
          to the main earthing terminal — and then states that{' '}
          <strong>
            this recommendation does not apply to outbuildings of dwellings served by the
            installation
          </strong>
          . On a TN outbuilding, an unnecessary electrode adds a parallel path, a test to record and
          a component to maintain, for no gain the standard recognises. Fit an electrode because the
          installation is TT, not out of habit.
        </p>

        <h3 className={subHeadCn}>Reading Ra correctly</h3>
        <p>
          For a TT outbuilding, Regulation 411.5.3 requires the disconnection time of Regulation
          411.3.2.2 or 411.3.2.4 to be met and Ra × I<sub>Δn</sub> ≤ 50V, where Ra is the sum of the
          resistance of the earth electrode and the protective conductor connecting it to the
          exposed-conductive-parts. The requirement is met if the earth fault loop impedance of the
          RCD-protected circuit meets Table 41.5, which gives 1,667Ω for a 30mA device.
        </p>
        <p>
          That 1,667Ω is a compliance ceiling, not a target. The note to Table 41.5 states that the
          resistance of the installation earth electrode should be as low as practicable and that a
          value exceeding 200Ω may not be stable, cross-referring to Regulation 542.2.4 — which
          requires the type and embedded depth of the electrode to be such that soil drying and
          freezing will not increase its resistance above the required value. An electrode reading
          800Ω in August passes the arithmetic and will still be a problem in a dry spell. Record
          the measured Ra on the schedule of test results.
        </p>
        <SEOAppBridge
          title="Record earth electrode test results on site"
          description="Elec-Mate's EIC Certificate app includes earth electrode resistance recording in the test results schedule."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection Requirements for Outbuildings',
    content: (
      <>
        <h3 className={subHeadCn}>At the main consumer unit</h3>
        <p>
          Run the outbuilding circuit from an RCD-protected way at the house — an RCBO, or an MCB on
          the protected side of an RCD section. That protects the buried or overhead supply cable
          itself. Where two RCDs end up in series, the upstream device needs to be time-delayed S
          type or otherwise selective, or a fault in the outbuilding will take the house out with
          it.
        </p>

        <h3 className={subHeadCn}>At the outbuilding consumer unit</h3>
        <p>
          Regulation 411.3.3 requires 30mA additional protection in AC systems for socket-outlets
          rated up to 32A in locations where they are liable to be used by persons of capability BA1
          or by children (BA2), for socket-outlets up to 32A in other locations, and for mobile
          equipment up to 32A for use outdoors. The regulation does contain a documented
          risk-assessment exception, but it applies only to the second of those three indents —
          never to socket-outlets liable to be used by ordinary persons or children, and never to
          mobile equipment for use outdoors. A garage or workshop socket used by the householder,
          and the extension lead that gets dragged out of it into the garden, sit squarely in the
          indents the exception cannot reach. Where the exception is relied on at all, the risk
          assessment must be undertaken with the involvement of a skilled person (electrically) and
          provided with the certificate.
        </p>
        <p>
          Regulation 411.3.4 separately requires, within domestic (household) premises, 30mA
          additional protection for AC final circuits supplying luminaires — so the outbuilding
          lighting circuit needs it too.
        </p>
        <p>
          Where the outbuilding is TT, the RCD is doing more than additional protection: under
          Regulation 411.5.2 it is the preferred device for fault protection, and Regulation 411.5.3
          sets the Ra condition it has to satisfy. Individual RCBOs per way remain the best answer,
          for selectivity as much as for compliance.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Outbuilding Supplies',
    content: (
      <>
        <p>
          A supply to an outbuilding is notifiable under Part P of the Building Regulations in
          England because it is the installation of a new circuit from the dwelling consumer unit.
          That covers a new supply to a detached garage, to a garden shed or workshop, to a
          summerhouse or garden office, and the upgrading or extension of an existing outbuilding
          supply circuit where a new circuit results.
        </p>
        <p>
          A scheme-registered electrician notifies the work through their competent person scheme,
          which issues a Building Regulations compliance certificate to the customer. Alongside it,
          issue the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          covering the supply circuit from the main consumer unit and the circuits within the
          outbuilding, with the earth electrode resistance recorded where the outbuilding is TT.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Outbuilding Supply in Practice',
    content: (
      <>
        <p>
          Outbuilding supplies are good work. A properly specified one — cable sized on calculation
          rather than habit, the earthing arrangement decided deliberately, RCBOs per circuit, a
          metal board and a certificate handed over on the day — is straightforward to price
          honestly and hard to argue with afterwards.
        </p>
        <div className="my-5 space-y-4">
          <div className={`${cardCn} sm:my-0`}>
            <div className="flex items-start gap-4">
              <Calculator className="mt-0.5 h-6 w-6 shrink-0 text-elec-yellow" />
              <div>
                <h3 className="mb-1 font-bold text-white">Cable sizing and voltage drop</h3>
                <p className="text-sm leading-relaxed text-white">
                  Long runs to remote outbuildings are decided by voltage drop far more often than
                  by current-carrying capacity. Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to confirm the SWA size against both, for the run length and installation method
                  you are actually using.
                </p>
              </div>
            </div>
          </div>
          <div className={`${cardCn} sm:my-0`}>
            <div className="flex items-start gap-4">
              <ClipboardCheck className="mt-0.5 h-6 w-6 shrink-0 text-elec-yellow" />
              <div>
                <h3 className="mb-1 font-bold text-white">EIC on site, before you leave</h3>
                <p className="text-sm leading-relaxed text-white">
                  Issue the{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  for the outbuilding supply on site. Continuity, insulation resistance, polarity,
                  Zs, RCD operation, and electrode resistance Ra where the installation is TT.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OutbuildingElectricalSupplyPage() {
  return (
    <GuideTemplate
      title="Outbuilding Supply: 2.5mm SWA 16A, 6mm 32A"
      description="SWA cable size for a shed, garage or summerhouse: 2.5mm for a 16A supply, 6mm for 32A. Buried SWA or overhead at 3.5m, own consumer unit, 30mA RCD, TN or TT earthing."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Outbuilding Supply Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Outbuilding Electrical Supply:{' '}
          <span className="text-elec-yellow">Garage, Shed, and Workshop</span>
        </>
      }
      heroSubtitle="Supplying an outbuilding takes the right cable route (buried SWA, or overhead at 3.5m clear of people and 6m clear of vehicles), a consumer unit in the outbuilding, a deliberate TN or TT earthing decision, and 30mA RCD protection. This guide gives the figures and the regulation each one comes from."
      readingTime={12}
      answerBox={{
        question: 'What do I need to supply electricity to an outbuilding?',
        answer:
          'A dedicated circuit from the house consumer unit — normally buried steel wire armoured cable — feeding a small consumer unit in the outbuilding with a double-pole main switch and 30mA RCD protection. The earthing arrangement is decided, not assumed: TN through the SWA armour, or TT with a local electrode where a PME earth should not be exported. The circuit is sized for the load and the run length, then tested and certified on an EIC.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Outbuilding Electrical Supply"
      relatedPages={relatedPages}
      ctaHeading="Certificate Outbuilding Supplies On Site"
      ctaSubheading="Elec-Mate lets UK electricians complete EICs for outbuilding supply installations on their phone. Cable sizing, voltage drop, and certification — all in one app. 7-day free trial."
    />
  );
}
