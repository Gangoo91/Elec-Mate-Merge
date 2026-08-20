import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  HardHat,
  ShieldCheck,
  FileCheck2,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  Brain,
  Search,
  Plug,
  Receipt,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation classes
// -------------------------------------------------------------------

/** Card: full-bleed on phones, inset and rounded from sm: up. */
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

/** Table shell: scrolls inside itself so the page body never moves sideways. */
const tableWrapCn =
  '-mx-4 my-5 overflow-x-auto border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x';

const tableCn = 'w-full border-collapse text-left text-sm text-white';
const thCn = 'whitespace-nowrap bg-white/[0.06] px-3 py-3 font-semibold text-white sm:px-4';
const tdCn = 'px-3 py-3 align-top text-white sm:px-4';
const rowCn = 'border-t border-white/[0.1]';

/** Definition row inside a card — bold lead-in, no repeated decorative icon. */
const defRowCn = 'border-t border-white/[0.1] pt-4 first:border-t-0 first:pt-0';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Temporary Supply', href: '/guides/construction-site-temporary-supply' },
];

const tocItems = [
  { id: 'at-a-glance', label: 'The Rules at a Glance' },
  { id: 'bs-7375-overview', label: 'BS 7375 and Section 704' },
  { id: '110v-cte-supply', label: '110V CTE Supply Explained' },
  { id: 'distribution-boards', label: 'Site Distribution Boards' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'cable-management', label: 'Cable Management on Site' },
  { id: 'testing-temporary', label: 'Testing Temporary Installations' },
  { id: 'common-defects', label: 'Common Defects on Construction Sites' },
  { id: 'for-electricians', label: 'For Electricians on Construction Sites' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every socket-outlet circuit rated up to and including 32 A, and every circuit supplying hand-held equipment up to 32 A, must be protected by one of four methods in Reg 704.410.3.10: reduced low voltage (Reg 411.8 — the 110V CTE route), automatic disconnection with a 30 mA RCD to Reg 415.1.1, electrical separation (Section 413), or SELV/PELV (Section 414).',
  'Socket-outlet circuits rated above 32 A need an RCD with a rated residual operating current not exceeding 500 mA (Reg 704.411.3.2.1), and Reg 411.3.2.5 does not apply to them.',
  'Reduced low voltage is capped at 110 V AC RMS between lines — 55 V to the earthed midpoint single-phase, 63.5 V to the earthed neutral three-phase (Reg 411.8.1.2). Disconnection must occur within 5 s at every point of utilisation, including socket-outlets (Reg 411.8.3); maximum Zs values are in Table 41.6.',
  'A PME earthing facility must not be used on a construction site unless every extraneous-conductive-part is reliably connected to the main earthing terminal (Reg 704.411.3.1) — the note warns this is very difficult to achieve and maintain.',
  'All assemblies distributing electricity on site must comply with BS EN 61439-4 as an Assembly for Construction Sites (ACS), and each ACS must include devices for switching and isolating the incoming supply, securable in the off position (Regs 704.511.1 and 704.537.2).',
  'Reduced low voltage flexible cable must be BS 6004 3182/3/4/5A or equivalent; anything above reduced low voltage must be H07RN-F to BS EN 50525-2-21 or equivalent heavy-duty flexible cable (Reg 704.522.8.11).',
  'Elec-Mate lets electricians complete EICRs for temporary site installations on the phone, produce professional reports for principal contractors, and keep the CDM 2015 documentation trail intact.',
];

const faqs = [
  {
    question: 'What is a 110V CTE supply and why is it used on construction sites?',
    answer:
      'A 110V centre-tapped-earth (CTE) supply is a reduced low voltage (RLV) system as defined by BS 7671 Regulation 411.8. A double-wound isolating transformer to BS EN IEC 61558-1 and BS EN 61558-2-23 steps the incoming 230V single-phase supply down to 110V, and Regulation 411.8.4.2 requires the midpoint of that secondary winding to be connected to Earth. That is the centre tap: the voltage between the two live conductors stays at 110V so the tool works normally, but no live conductor sits more than 55V above earth. Regulation 411.8.1.2 caps reduced low voltage at 110 V AC RMS between lines — 55 V to the earthed midpoint on single-phase, 63.5 V to the earthed neutral on three-phase. At 55V the current that can flow through a person during a fault is far lower than at 230V, so the risk of a fatal shock is greatly reduced, though not eliminated. Fault protection still applies: Regulation 411.8.3 requires disconnection within 5 s at every point of utilisation including socket-outlets, with maximum earth fault loop impedance values given in Table 41.6. Regulation 411.8.5 requires every plug, socket-outlet, luminaire supporting coupler, device for connecting a luminaire and cable coupler on an RLV system to have a protective conductor contact and to be dimensionally incompatible with any other system used in the same premises — which is why site 110V gear is separately keyed and colour-coded yellow. Under Regulation 704.410.3.10(a) the RLV system on its own satisfies the required protection for socket-outlet circuits up to 32 A, and Regulation 411.3.3 expressly states that the 30 mA RCD requirement does not apply to reduced low voltage systems. The 30 mA RCD is the requirement under method (b), where automatic disconnection of supply is the chosen protection.',
  },
  {
    question: 'Can I use 230V tools on a construction site?',
    answer:
      'The use of 230V portable tools on construction sites is strongly discouraged and is prohibited on most UK sites. BS 7375:2010 and HSE guidance both point to 110V CTE for portable hand tools, and BS 7671 Regulation 704.410.3.10 NOTE 1 states that the reduced low voltage system is strongly preferred for portable handlamps for general use, portable hand tools and local lighting up to 2 kW. Most principal contractors mandate 110V as a site rule, so using a 230V portable tool would breach the site health and safety plan. There are situations where 230V or 400V is necessary: fixed equipment such as concrete pumps, tower cranes, hoists and site cabins is fixed in position rather than hand-held. Where a 230V socket-outlet circuit rated up to 32 A is provided on the construction site itself, Regulation 704.410.3.10(b) requires automatic disconnection of supply in accordance with Section 411 plus additional protection by an RCD having the characteristics specified in Regulation 415.1.1. Circuits supplying socket-outlets rated above 32 A are covered separately by Regulation 704.411.3.2.1, which requires an RCD with a rated residual operating current not exceeding 500 mA. Note the scope limit in Regulation 704.1.1: Section 704 does not apply to administrative locations on a construction site — offices, cloakrooms, meeting rooms, canteens, restaurants, dormitories and toilets — where the general requirements of Parts 1 to 6 and Part 8 apply instead, including the 30 mA additional protection rules of Regulation 411.3.3. Where 230V portable equipment is used anywhere on site, expect a documented risk assessment, 30 mA RCD protection and proper isolation arrangements as a condition of use.',
  },
  {
    question: 'What type of distribution board is required on a construction site?',
    answer:
      "BS 7671 Regulation 704.511.1 requires all assemblies on construction and demolition sites for the distribution of electricity to comply with BS EN 61439-4, the particular requirements for assemblies for construction sites (ACS). Regulation 704.537.2 goes further: current-using equipment shall be supplied via an ACS incorporating overcurrent protective devices, devices affording fault protection and socket-outlets if required, and each ACS shall also incorporate suitable devices for the switching and isolation of the incoming supply. That isolating device must be suitable for securing in the off position (see Regulation 537.2.4) — for example by a padlocking facility or by sitting inside a lockable enclosure. Plugs and socket-outlets rated 16 A up to 125 A must comply with BS EN IEC 60309-2; above 125 A up to 800 A, where interchangeability is not required, BS EN IEC 60309-1 applies. Regulation 704.512.2 requires consideration of the risk of damage from corrosive substances, movement of structures and vehicles, wear and tear, tension, flexing, impact, abrasion, severing and the ingress of liquids or solids — which is what drives the usual site specification of a robust IP44-rated enclosure with an impact rating of IK08 or better, IP-rated glands at every cable entry and no open knockouts. Interlocked socket-outlets that cannot be connected or disconnected under load are common good practice rather than a BS 7671 requirement. Site boards are often trolley-mounted or fitted with carry handles so they can follow the work; they must be stable and secure wherever they are stood.",
  },
  {
    question: 'How often should a construction site temporary installation be inspected?',
    answer:
      'The recommended maximum inspection interval for construction site temporary electrical installations is 3 months, reflecting the harsh environment, high usage and constantly changing nature of these installations. BS 7671 Regulation 652.1 requires the frequency of periodic inspection and testing to be determined having regard to the type of installation, and construction sites sit at the short end of that range. In practice, many principal contractors require monthly visual inspections and quarterly full inspection and testing. The CDM 2015 Regulations require the principal contractor to ensure all temporary installations are safe and properly maintained throughout the construction phase. Alongside the periodic EICR, the usual regime is: daily visual checks of cables, plugs and sockets by the tradesperson using the equipment; weekly visual inspections by the site electrician or another competent person, checking for damage, water ingress and correct RCD operation using the integral test button; and quarterly full inspection and testing with an EICR issued for the temporary installation. All inspection and test records must be retained and available to the HSE, the principal designer and the principal contractor.',
  },
  {
    question: 'What cable types are suitable for construction site temporary wiring?',
    answer:
      'BS 7671 Regulation 704.522.8.11 is specific. For reduced low voltage systems, low temperature 3182/3/4/5A thermoplastic cable to BS 6004, or an equivalent flexible cable, shall be used. For applications exceeding reduced low voltage, flexible cable shall be H07RN-F to BS EN 50525-2-21 or an equivalent heavy-duty flexible cable. Regulation 704.522.8.101 adds that flexible cables subject to movement shall be H07RN-F or equivalent, resistant to abrasion and to water. For fixed and semi-permanent distribution runs, steel wire armoured (SWA) cable remains the usual choice on site: it gives mechanical protection and weather resistance and can be run on the surface, on cable trays or buried. Standard PVC twin-and-earth (6242Y) is not suitable for exposed construction site use — it has no mechanical protection, is not UV-resistant and becomes brittle in the cold. Extension leads for 110V tools should be yellow flexible cable of the type required by Regulation 704.522.8.11, rated for the current demand, fitted with BS EN IEC 60309-2 plugs and sockets, kept as short as practical and fully unwound in use.',
  },
  {
    question: 'What are the earthing requirements for construction site temporary installations?',
    answer:
      "The headline rule is Regulation 704.411.3.1: a PME earthing facility shall not be used as the means of earthing for an installation within the scope of Section 704 unless all extraneous-conductive-parts are reliably connected to the main earthing terminal in accordance with Regulation 411.3.1.2. The accompanying note points to BS 7375 and warns that protective bonding of all extraneous-conductive-parts is very difficult to achieve and maintain throughout the life of the installation — which is why many site supplies are converted to TT with an installation earth electrode instead of relying on the distributor's PME terminal. For the 110V CTE system, Regulation 411.8.4.2 requires the midpoint of the secondary winding of a single-phase transformer or generator (or the neutral star point on three-phase) to be connected to Earth, and Regulation 411.8.3 requires all exposed-conductive-parts of the reduced low voltage system to be connected to Earth with disconnection achieved within 5 s. Where fault protection on an RLV circuit is provided by an RCD, the product of the rated residual operating current and the earth fault loop impedance must not exceed 50 V. Section 704 also bars certain protective measures outright: obstacles and placing out of reach must not be used (Reg 704.410.3.5), and neither may a non-conducting location, earth-free local equipotential bonding, or electrical separation supplying more than one item of current-using equipment (Reg 704.410.3.6). All earthing and bonding connections must be tested for continuity, and the earth fault loop impedance measured at the most distant point of each circuit.",
  },
  {
    question: 'What does CDM require for construction site electrical safety?',
    answer:
      'The Construction (Design and Management) Regulations 2015 set out the duties of all parties on a construction project, including the management of temporary electrical installations. The principal designer must consider electrical safety in the pre-construction information and ensure the design of the temporary installation feeds into the health and safety file. The principal contractor must ensure the temporary electrical installation is designed, installed, inspected and maintained by competent persons; that a safe system of work is in place for electrical work on site, including permit-to-work procedures for work on or near live systems; that portable appliances and tools are inspected and tested at appropriate intervals; and that records of all electrical inspections, tests and maintenance are kept on site and available for inspection. Contractors and workers must report any damage to cables, equipment or distribution boards, use only equipment that has been inspected and is in good condition, never use damaged or defective electrical equipment, and follow the site-specific electrical safety rules documented in the construction phase plan. The principal designer role replaced the CDM coordinator of CDM 2007; that duty holder should ensure the electrical safety arrangements are documented in the construction phase plan and reviewed at regular intervals.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/reduced-low-voltage-110v-cte-site-supplies',
    title: '110V CTE Construction Site Supplies',
    description: 'BS 7375, Section 704 A4:2026, transformer ratings, EICR cycle.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/how-to-do-safe-isolation',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step guide to safe isolation on construction sites and all electrical installations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description:
      'Step-by-step guide to RCD testing including trip times, test currents, and recording results.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate correct cable sizes for temporary and permanent installations accounting for all derating factors.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/caravan-park-electrical',
    title: 'Caravan Park Electrical',
    description:
      'Similar outdoor distribution challenges — BS 7671 Section 708, TT earthing, and IP-rated equipment.',
    icon: Plug,
    category: 'Guide',
  },
  {
    href: '/eighteenth-edition-course',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with 50+ structured training modules including Section 704 (Construction Sites).',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Table data
// -------------------------------------------------------------------

/** BS 7671:2018+A4:2026 Section 704 / Chapter 41 — the rules people look up. */
const glanceRows: Array<[string, string, string]> = [
  [
    'Socket-outlet ≤ 32 A, or any circuit supplying hand-held equipment ≤ 32 A',
    'Protect by one of: (a) reduced low voltage (Reg 411.8); (b) automatic disconnection of supply with additional protection by an RCD to Reg 415.1.1; (c) electrical separation, each outlet and item of hand-held equipment on its own transformer or separate winding; (d) SELV or PELV.',
    '704.410.3.10',
  ],
  [
    'Socket-outlet circuits rated above 32 A',
    'An RCD with a rated residual operating current not exceeding 500 mA, disconnecting within the time required by Reg 411.3.2.3 or 411.3.2.4. Reg 411.3.2.5 does not apply.',
    '704.411.3.2.1',
  ],
  [
    'Reduced low voltage — nominal voltage',
    'Not exceeding 110 V AC RMS between lines: 55 V to the earthed midpoint single-phase, 63.5 V to the earthed neutral three-phase.',
    '411.8.1.2',
  ],
  [
    'Reduced low voltage — fault protection',
    'Overcurrent device in each line conductor or an RCD; all exposed-conductive-parts earthed; disconnection within 5 s at every point of utilisation including socket-outlets. Maximum Zs in Table 41.6. If an RCD provides fault protection, IΔn × Zs must not exceed 50 V.',
    '411.8.3',
  ],
  [
    'Means of earthing',
    'A PME earthing facility shall not be used unless all extraneous-conductive-parts are reliably connected to the main earthing terminal per Reg 411.3.1.2.',
    '704.411.3.1',
  ],
  [
    'Distribution assemblies',
    'All assemblies distributing electricity on site shall comply with BS EN 61439-4 (Assembly for Construction Sites, ACS).',
    '704.511.1',
  ],
  [
    'Plugs and socket-outlets',
    '16 A up to 125 A: BS EN IEC 60309-2. Above 125 A up to 800 A where interchangeability is not required: BS EN IEC 60309-1.',
    '704.511.1',
  ],
  [
    'Isolation',
    'Each ACS shall incorporate devices for switching and isolating the incoming supply, suitable for securing in the off position (padlocking facility or lockable enclosure).',
    '704.537.2',
  ],
  [
    'Protective measures not permitted',
    'Obstacles and placing out of reach; non-conducting location; earth-free local equipotential bonding; electrical separation supplying more than one item of current-using equipment.',
    '704.410.3.5, 704.410.3.6',
  ],
];

/**
 * BS 7671:2018+A4:2026 Table 41.6 — maximum earth fault loop impedance (Zs) for
 * 5 s disconnection at Uo of 55 V (single-phase) and 63.5 V (three-phase).
 * Transcribed from the printed table. "—" where the standard prints a dash.
 */
const table416Rows: Array<[string, string, string, string, string, string, string]> = [
  ['3', '3.48', '4.02', '1.74', '2.01', '—', '—'],
  ['6', '1.74', '2.01', '0.87', '1.01', '2.90', '3.35'],
  ['10', '1.05', '1.21', '0.52', '0.60', '1.63', '1.89'],
  ['16', '0.65', '0.75', '0.33', '0.38', '0.95', '1.10'],
  ['20', '0.52', '0.60', '0.26', '0.30', '0.67', '0.77'],
  ['25', '0.42', '0.48', '0.21', '0.24', '0.52', '0.60'],
  ['32', '0.33', '0.38', '0.16', '0.19', '0.42', '0.48'],
  ['40', '0.26', '0.30', '0.13', '0.15', '0.31', '0.35'],
  ['50', '0.21', '0.24', '0.10', '0.12', '0.24', '0.27'],
  ['63', '0.17', '0.19', '0.08', '0.10', '0.19', '0.22'],
  ['80', '0.13', '0.15', '0.07', '0.08', '0.13', '0.15'],
  ['100', '0.10', '0.12', '0.05', '0.06', '0.12', '0.14'],
  ['125', '0.08', '0.10', '0.04', '0.05', '0.08', '0.09'],
];

/** Site socket-outlet colours — the BS EN IEC 60309-2 voltage-band convention. */
const socketRows: Array<[string, string, string]> = [
  ['Yellow', '110 V CTE (reduced low voltage)', 'Portable hand tools, task lighting, transformers'],
  ['Blue', '230 V single-phase', 'Fixed plant, welfare and cabin supplies'],
  ['Red', '400 V three-phase', 'Hoists, tower cranes, large fixed plant'],
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'at-a-glance',
    heading: 'The Rules at a Glance',
    content: (
      <>
        <p>
          Everything below comes from BS 7671:2018+A4:2026 Section 704 (Construction and Demolition
          Site Installations) and Chapter 41. If you only read one part of this page, read this
          table.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  What
                </th>
                <th scope="col" className={thCn}>
                  Requirement
                </th>
                <th scope="col" className={thCn}>
                  Reg
                </th>
              </tr>
            </thead>
            <tbody>
              {glanceRows.map(([what, requirement, reg]) => (
                <tr key={reg + what} className={rowCn}>
                  <td className={`${tdCn} font-semibold`}>{what}</td>
                  <td className={tdCn}>{requirement}</td>
                  <td className={`${tdCn} whitespace-nowrap font-mono text-[13px]`}>{reg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={cardCn}>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Where Section 704 stops
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            Regulation 704.1.1 excludes the administrative locations of a construction site — offices,
            cloakrooms, meeting rooms, canteens, restaurants, dormitories and toilets. In those
            areas the general requirements of Parts 1 to 6 and Part 8 apply instead, so the ordinary
            30 mA additional-protection rules of Regulation 411.3.3 govern the socket-outlets rather
            than the four methods of Regulation 704.410.3.10.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'bs-7375-overview',
    heading: 'BS 7375 and BS 7671 Section 704: Which Document Does What',
    content: (
      <>
        <p>
          BS 7375:2010 (Code of practice for distribution of electricity on construction and building
          sites) is the practical guidance document for temporary electrical installations on UK
          construction sites. The enforceable requirements sit in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Section 704, which applies to temporary installations for construction and demolition work
          — new build, repair, alteration, extension, demolition, engineering works and earthworks —
          and covers both fixed and movable installations (Reg 704.1.1).
        </p>
        <p>
          Construction sites are among the most electrically hazardous environments in the UK. Wet
          conditions, metallic structures, heavy machinery, moving plant and a workforce that is
          largely not electrically trained combine badly. The temporary installation has to deliver
          safe, reliable power in those conditions, often for years, while the site around it keeps
          changing shape.
        </p>
        <h3 className="pt-2 text-[15px] font-semibold tracking-tight text-white">
          What A4:2026 changed in Section 704
        </h3>
        <p>
          The current edition is BS 7671:2018+A4:2026 — not A2:2022. The published amendment summary
          lists the following changes to Section 704: new requirements for external influences
          (Reg 704.512.2); a modification to Regulation 704.410.3.6 to add the non-use of the
          protective measure of electrical separation; changes to plug and socket-outlet
          requirements in Regulation 704.511.1; changes to the wiring system requirements (704.52);
          and a full redraft of the requirements for devices for isolation (704.537). Check that
          EICRs, specifications and design records quote the right edition.
        </p>
        <div className={cardCn}>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            AFDDs on a construction site — what the standard actually says
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            Regulation 421.1.7 was redrafted at A4:2026. It is now a requirement to protect final
            circuits supplying socket-outlets rated not exceeding 32 A with arc fault detection
            devices in Higher Risk Residential Buildings, Houses in Multiple Occupation,
            purpose-built student accommodation and care homes. For all other premises — which
            includes construction site offices and welfare accommodation — the regulation{' '}
            <em>recommends</em> AFDDs for single-phase AC final circuits supplying socket-outlets not
            exceeding 32 A. Where AFDDs are specified, Regulation 532.6 places them at the origin of
            the final circuits to be protected and in AC single-phase circuits not exceeding 230 V.
          </p>
        </div>
      </>
    ),
  },
  {
    id: '110v-cte-supply',
    heading: '110V Centre-Tapped Earth (CTE): How It Works and Why',
    content: (
      <>
        <p>
          A 110V centre-tapped-earth supply is a reduced low voltage (RLV) system under BS 7671
          Regulation 411.8. It is the UK construction industry's primary defence against a fatal
          shock from a portable tool, and Regulation 704.410.3.10 NOTE 1 says the reduced low voltage
          system is strongly preferred for portable handlamps for general use, portable hand tools
          and local lighting up to 2 kW.
        </p>
        <div className={`${cardCn} space-y-4`}>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">The source</h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Regulation 411.8.4.1 permits only three sources: a double-wound isolating transformer
              complying with BS EN IEC 61558-1 and BS EN 61558-2-23; a motor-generator set with
              windings providing isolation equivalent to an isolating transformer; or a source
              independent of other supplies, such as an engine-driven generator. On site this is
              normally a 3.3 kVA, 5 kVA or 10 kVA yellow transformer, with larger units used for
              multiple-outlet distribution.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">The centre tap</h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Regulation 411.8.4.2 requires the midpoint of the secondary winding of a single-phase
              transformer or generator — or the neutral star point on three-phase — to be connected
              to Earth. That splits the 110V output into two halves: 55 V from each live conductor to
              earth. The tool still sees 110 V between conductors, but nothing on the system sits
              more than 55 V above earth. On three-phase RLV the equivalent figure is 63.5 V to the
              earthed neutral (Reg 411.8.1.2).
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              The safety benefit
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              If a worker contacts a live conductor while standing on wet concrete or touching
              scaffolding, the voltage driving the shock current is 55 V rather than 230 V. The shock
              is not harmless — it can still cause pain, burns and involuntary muscle contraction —
              but the risk of a fatal cardiac event is dramatically reduced.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Why the gear is yellow and keyed
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Regulation 411.8.5 requires every plug, socket-outlet, luminaire supporting coupler,
              device for connecting a luminaire and cable coupler on an RLV system to have a
              protective conductor contact, and to be dimensionally incompatible with those used for
              any other system in the same premises. The yellow colour is the site convention on top
              of that; the physical keying is what actually stops a 110V tool being plugged into
              230V.
            </p>
          </div>
        </div>
        <h3 className="pt-2 text-[15px] font-semibold tracking-tight text-white">
          Maximum Zs for 110V CTE circuits — Table 41.6
        </h3>
        <p>
          Reduced low voltage still needs fault protection. Regulation 411.8.3 requires an
          overcurrent protective device in each line conductor or an RCD, all exposed-conductive-parts
          connected to Earth, and an earth fault loop impedance low enough that disconnection happens
          within <strong>5 s</strong> at every point of utilisation, socket-outlets included. Table
          41.6 gives the maximum Zs values.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <caption className="sr-only">
              BS 7671 Table 41.6 — maximum earth fault loop impedance in ohms for 5 s disconnection
              at Uo of 55 V and 63.5 V
            </caption>
            <thead>
              <tr>
                <th scope="col" rowSpan={2} className={thCn}>
                  Rating (A)
                </th>
                <th scope="col" colSpan={2} className={`${thCn} text-center`}>
                  Type B
                </th>
                <th scope="col" colSpan={2} className={`${thCn} text-center`}>
                  Type C and D
                </th>
                <th scope="col" colSpan={2} className={`${thCn} text-center`}>
                  gG fuse, BS 88-2
                </th>
              </tr>
              <tr>
                <th scope="col" className={thCn}>
                  55 V
                </th>
                <th scope="col" className={thCn}>
                  63.5 V
                </th>
                <th scope="col" className={thCn}>
                  55 V
                </th>
                <th scope="col" className={thCn}>
                  63.5 V
                </th>
                <th scope="col" className={thCn}>
                  55 V
                </th>
                <th scope="col" className={thCn}>
                  63.5 V
                </th>
              </tr>
            </thead>
            <tbody>
              {table416Rows.map((row) => (
                <tr key={row[0]} className={rowCn}>
                  <th scope="row" className={`${tdCn} font-semibold`}>
                    {row[0]}
                  </th>
                  {row.slice(1).map((v, i) => (
                    <td key={i} className={`${tdCn} font-mono tabular-nums`}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-white">
          Values in ohms, from BS 7671:2018+A4:2026 Table 41.6. The circuit-breaker columns cover
          devices to BS EN 60898 and the overcurrent characteristics of RCBOs to BS EN 61009-1; the
          fuse columns are general purpose (gG) fuses to BS 88-2, fuse systems E and G. Table
          41.6 NOTE 1 states the values were determined using a value of 0.95 for C<sub>min</sub>;
          NOTE 2 states they should not be exceeded with line conductors at their maximum permitted
          operating temperature and cpcs at their assumed initial temperature, and that a reading
          taken at a different temperature should be adjusted accordingly (see Appendix 3). Where
          fault protection is by RCD instead, Regulation 411.8.3 requires the product of the rated
          residual operating current and the earth fault loop impedance not to exceed 50 V.
        </p>
      </>
    ),
  },
  {
    id: 'distribution-boards',
    heading: 'Site Distribution Boards: Specification and Layout',
    content: (
      <>
        <p>
          Site distribution boards are the backbone of the temporary installation. Regulation
          704.511.1 requires all assemblies on construction and demolition sites for the distribution
          of electricity to comply with BS EN 61439-4 — an Assembly for Construction Sites, or ACS.
          That is the term designers, specifiers and inspectors use, and it is what the marking on
          the enclosure should say.
        </p>
        <div className={`${cardCn} space-y-4`}>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Main site distribution board
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              The primary distribution point, connected to the incoming builder's supply (400V
              three-phase or 230V single-phase from the DNO). Houses the main isolator, metering and
              outgoing ways for sub-boards, site transformers and fixed plant. Regulation 704.537.2
              requires the incoming isolating device to be suitable for securing in the off position
              — a padlocking facility or a lockable enclosure.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Sub-distribution boards
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Smaller assemblies positioned at work locations around the site, supplied from the main
              board via SWA. Each provides 110V CTE socket-outlets from a built-in or adjacent
              transformer plus 230V outlets for fixed equipment. IP44 is the usual minimum
              specification for outdoor positions; wetter or more exposed locations are commonly
              specified at IP55 or above.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Portable distribution units
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Trolley-mounted or carry-handle units combining a step-down transformer with several
              110V socket-outlets. Ideal for individual work areas and easily moved as the work
              progresses through the building — provided they are stable and secure wherever they are
              stood.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              External influences
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Regulation 704.512.2 requires consideration of the risk of damage from corrosive
              substances, movement of structures and vehicles, wear and tear, tension, flexing,
              impact, abrasion, severing, and the ingress of liquids or solids. In practice that
              means a robust enclosure (IK08 or better is the usual site specification), IP-rated
              glands at every cable entry, and no open knockouts.
            </p>
          </div>
        </div>
        <h3 className="pt-2 text-[15px] font-semibold tracking-tight text-white">
          Socket-outlets and plugs
        </h3>
        <p>
          Regulation 704.511.1 requires plugs and socket-outlets rated 16 A up to 125 A to comply
          with BS EN IEC 60309-2. Above 125 A up to 800 A, where interchangeability is not required,
          BS EN IEC 60309-1 applies. Colour follows the BS EN IEC 60309-2 voltage-band convention:
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  Colour
                </th>
                <th scope="col" className={thCn}>
                  Supply
                </th>
                <th scope="col" className={thCn}>
                  Typical use on site
                </th>
              </tr>
            </thead>
            <tbody>
              {socketRows.map(([colour, supply, use]) => (
                <tr key={colour} className={rowCn}>
                  <td className={`${tdCn} font-semibold`}>{colour}</td>
                  <td className={tdCn}>{supply}</td>
                  <td className={tdCn}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Interlocked socket-outlets that cannot be connected or disconnected under load are common
          good practice rather than a BS 7671 requirement. Boards must be mounted on stable, level
          surfaces and kept clear of vehicle traffic. On multi-storey sites, floor-level boards are
          supplied via vertical risers from the main board, and every board position must stay
          accessible for operation, testing and emergency isolation.
        </p>
        <SEOAppBridge
          title="Construction site electrics: temporary supply"
          description="BS 7671:2018+A4:2026 compliant temporary electrical distribution for site. Scan boards, auto-populate EICR schedules in minutes. Reduce paperwork by 80%."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection on Construction Sites',
    content: (
      <>
        <p>
          Regulation 704.410.3.10 sets the required protection for every socket-outlet circuit rated
          up to and including 32 A and every circuit supplying hand-held equipment up to 32 A. It
          permits four alternative methods, and at least one must be applied. The 30 mA RCD belongs
          to method (b), where automatic disconnection of supply is the chosen protection — it is{' '}
          <em>not</em> a blanket requirement on every circuit. Regulation 411.3.3 makes the point
          explicitly: its 30 mA additional-protection requirements do not apply to reduced low
          voltage systems under Regulation 411.8.
        </p>
        <div className={`${cardCn} space-y-4`}>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Above 32 A: 500 mA, not 30 mA
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Regulation 704.411.3.2.1 covers any circuit supplying one or more socket-outlets rated
              above 32 A. Regulation 411.3.2.5 is not applicable to those circuits; instead an RCD
              with a rated residual operating current not exceeding 500 mA must interrupt the supply
              within the disconnection time required by Regulation 411.3.2.3 or 411.3.2.4, as
              appropriate.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">RCD type</h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Regulation 531.3.3 restricts Type AC to fixed equipment where it is known that the load
              current contains no DC components — which rules it out for site socket-outlets. Type A
              is the practical minimum. Consider Type F where inverter-driven equipment such as
              variable speed drives and battery chargers is connected, and Type B where smooth DC
              residual current is possible.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">Testing frequency</h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              The integral test button should be used daily by the user. Electrical verification is
              carried out at the rated residual operating current as part of the periodic inspection
              — quarterly on most sites. See the testing section below for what the standard requires
              of that test.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Nuisance tripping
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Unwanted tripping on site is usually moisture ingress, damaged cables or high standing
              earth leakage from construction plant. The answer is never to bypass the device — it is
              to find and fix the leakage. Splitting loads across several RCDs, rather than one
              device covering many outlets, limits the disruption when one does trip.
            </p>
          </div>
        </div>
        <p>
          The RCD is one layer, not the whole defence. A properly designed site stacks reduced
          voltage, earthing and bonding, insulation, mechanical protection of cables and residual
          current protection. Each addresses a different failure mode, and together they cut the risk
          of a fatal shock dramatically.
        </p>
      </>
    ),
  },
  {
    id: 'cable-management',
    heading: 'Cable Management: Preventing Damage and Hazards',
    content: (
      <>
        <p>
          Cables on site face mechanical damage from construction activity, vehicle traffic, sharp
          edges and weather, and badly run cable is a serious tripping hazard. Regulation 704.522.8.11
          fixes the cable types, and Regulation 704.522.8.101 governs where they may run.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  Application
                </th>
                <th scope="col" className={thCn}>
                  Required cable
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={rowCn}>
                <td className={`${tdCn} font-semibold`}>Reduced low voltage systems (110V CTE)</td>
                <td className={tdCn}>
                  Low temperature 3182/3/4/5A thermoplastic cable to BS 6004, or equivalent flexible
                  cable (Reg 704.522.8.11).
                </td>
              </tr>
              <tr className={rowCn}>
                <td className={`${tdCn} font-semibold`}>Applications exceeding reduced low voltage</td>
                <td className={tdCn}>
                  H07RN-F to BS EN 50525-2-21, or equivalent heavy-duty flexible cable (Reg
                  704.522.8.11).
                </td>
              </tr>
              <tr className={rowCn}>
                <td className={`${tdCn} font-semibold`}>Flexible cable subject to movement</td>
                <td className={tdCn}>
                  H07RN-F to BS EN 50525-2-21 or equivalent, resistant to abrasion and to water (Reg
                  704.522.8.101).
                </td>
              </tr>
              <tr className={rowCn}>
                <td className={`${tdCn} font-semibold`}>Semi-permanent distribution runs</td>
                <td className={tdCn}>
                  Steel wire armoured (SWA) is the usual site choice — mechanical protection, weather
                  resistance, and suitable for surface, tray or buried routes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">Cable routes</h3>
        <p>
          Regulation 704.522.8.101 states that cables should not be run across site roads or
          walkways. Where that is unavoidable, adequate protection against mechanical damage and
          contact with construction plant machinery must be provided, and particular attention must
          be given to protecting surface-run and overhead cables against mechanical damage. In
          practice that means overhead runs, buried routes with cable covers, SWA on the surface, or
          proper cable ramps and bridges at crossings. Standard PVC flex laid loose on the ground
          meets none of those requirements.
        </p>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          Extension leads and trailing cables
        </h3>
        <p>
          Extension leads for 110V tools should be the shortest practical length, made from cable of
          the type required by Regulation 704.522.8.11, fitted with BS EN IEC 60309-2 plugs and
          sockets, and inspected before use. Fully unwind a lead in use so it does not overheat.
          Damaged cables come out of service immediately — a repair with insulation tape is not a
          repair. Route leads away from walkways and work areas, and use ramps or bridges wherever a
          crossing is unavoidable.
        </p>
        <p>
          Cable routes need reviewing as the job moves on. A run that was safe during groundworks can
          become a hazard once crane operations, scaffolding and heavy plant arrive. The site
          electrician should re-walk the routes regularly and reposition cables before they get
          damaged, not after.
        </p>
      </>
    ),
  },
  {
    id: 'testing-temporary',
    heading: 'Testing Temporary Installations on Construction Sites',
    content: (
      <>
        <p>
          Testing a site installation follows the standard BS 7671 sequence, with extra attention to
          Section 704 and to the practical business of testing in a live construction environment.
        </p>
        <div className={`${cardCn} space-y-4`}>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Inspection interval: 3 months
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Regulation 652.1 requires the frequency of periodic inspection and testing to be
              determined having regard to the type of installation. For construction sites the
              recommended maximum is 3 months; many principal contractors add monthly visual
              inspections on top of the quarterly EICR.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Earth fault loop impedance
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Measure Zs at the most distant socket-outlet on each circuit. For 110V CTE circuits
              compare against Table 41.6, which is based on a 5 s disconnection time at Uo of 55 V
              single-phase or 63.5 V three-phase — the values are much lower than the 230V figures.
              Table 41.6 NOTE 2 assumes conductors at operating temperature; where the test is made
              at a different temperature, adjust the reading accordingly (see Appendix 3).
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Insulation resistance
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Regulation 643.3.2 requires the test with current-using equipment disconnected, using
              the test voltages in Table 64 — 500 V DC and a minimum of 1.0 MΩ for circuits up to and
              including 500 V, or 250 V DC and 0.5 MΩ for SELV and PELV. Regulation 643.3.3 adds a
              second stage: where connected equipment would influence the result or be damaged, test
              before connecting it, then after connection apply a 250 V DC test between live
              conductors and the protective conductor, which must read at least 1 MΩ. Site circuits
              often read lower than permanent ones because of moisture and cable condition —
              investigate before you record.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">RCD verification</h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Regulation 643.8 requires the effectiveness of automatic disconnection by RCDs to be
              verified using suitable test equipment to BS EN 61557-6. Its note states that,
              regardless of RCD type, effectiveness is deemed verified where the device disconnects
              with an alternating current test at the rated residual operating current (IΔn) within
              300 ms maximum for a general non-delay type. The former time/current table (Table 3A)
              was deleted at A4:2026 — there is no ½× or 5× requirement in BS 7671. Record the trip
              time at IΔn for each device.
            </p>
          </div>
          <div className={defRowCn}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">Visual inspection</h3>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Check every assembly, transformer, socket-outlet, cable route and earth connection for
              damage from construction activity, water ingress, corrosion and unauthorised
              modification. Site installations change constantly — new circuits, repositioned boards,
              re-routed cables — and every change needs verifying.
            </p>
          </div>
        </div>
        <p>
          The EICR for a site temporary installation goes to the principal contractor, who keeps it
          in the project health and safety file. Say plainly on the certificate that the installation
          is temporary, and set out the scope of what was inspected.
        </p>
      </>
    ),
  },
  {
    id: 'common-defects',
    heading: 'Common Defects Found on Construction Sites',
    content: (
      <>
        <p>
          Site installations take constant abuse, modification and weather. These are the defects
          that turn up on quarterly inspections again and again.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  Defect
                </th>
                <th scope="col" className={thCn}>
                  What you find
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={rowCn}>
                <td className={`${tdCn} font-semibold`}>Damaged cables</td>
                <td className={tdCn}>
                  Crushed by vehicles, cut by excavation machinery, trapped under scaffold boards or
                  chafed on sharp edges. Insulation-tape "repairs" are common and unacceptable —
                  damaged cable gets replaced.
                </td>
              </tr>
              <tr className={rowCn}>
                <td className={`${tdCn} font-semibold`}>Water ingress in assemblies</td>
                <td className={tdCn}>
                  Open knockouts, cracked enclosures, missing covers and boards stood in flood-risk
                  positions. Water inside a live assembly normally warrants C1, danger present.
                </td>
              </tr>
              <tr className={rowCn}>
                <td className={`${tdCn} font-semibold`}>RCDs bypassed or not operating</td>
                <td className={tdCn}>
                  Devices taped in the on position to stop tripping, devices that fail to disconnect
                  within 300 ms at IΔn, or devices removed from the board altogether. Normally C1.
                </td>
              </tr>
              <tr className={rowCn}>
                <td className={`${tdCn} font-semibold`}>230V portable tools in use</td>
                <td className={tdCn}>
                  Drills, grinders and saws at 230V instead of the 110V equivalent, and domestic
                  white 13 A extension leads brought onto site.
                </td>
              </tr>
              <tr className={rowCn}>
                <td className={`${tdCn} font-semibold`}>Unauthorised modifications</td>
                <td className={tdCn}>
                  Circuits added without testing or certification, joints made without proper
                  connectors, and assemblies loaded beyond their rating.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Document each defect with a photograph, a clear description and the correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>
          , plus — for anything coded C1 — a record of the immediate action taken to make the
          installation safe. The EICR goes to the principal contractor, who is responsible for the
          remedial work.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Construction Site Work with Elec-Mate',
    content: (
      <>
        <p>
          Site work rewards efficiency and documentation. Quarterly EICRs, monthly visual checks and
          CDM records have to be produced consistently and handed over promptly. The electrician who
          finishes the inspection, produces the certificate and gives it to the site manager on the
          day of testing keeps the contract.
        </p>
        <p>Elec-Mate is built for exactly that workflow:</p>
        <div className="my-4 space-y-4">
          <div className={cardCn}>
            <div className="flex items-start gap-4">
              <Brain className="mt-0.5 h-6 w-6 shrink-0 text-elec-yellow" />
              <div>
                <h3 className="mb-1 text-[15px] font-semibold tracking-tight text-white">
                  Voice test entry
                </h3>
                <p className="text-sm leading-relaxed text-white">
                  Probes in hand, hard hat on, stood at a board on the third floor of an unfinished
                  building? Speak the results: "Socket circuit 3, Zs 0.28, insulation resistance 200
                  megohms, RCD trip time 22 milliseconds." Elec-Mate fills the schedule in while you
                  work. No clipboard in the rain.
                </p>
              </div>
            </div>
          </div>
          <div className={cardCn}>
            <div className="flex items-start gap-4">
              <Receipt className="mt-0.5 h-6 w-6 shrink-0 text-elec-yellow" />
              <div>
                <h3 className="mb-1 text-[15px] font-semibold tracking-tight text-white">
                  Defect to remedial quote
                </h3>
                <p className="text-sm leading-relaxed text-white">
                  Found a C1? Document it, classify it, and generate a remedial works quote —
                  materials, labour, margin — from the same app. Hand over the EICR and the quote in
                  one visit.
                </p>
              </div>
            </div>
          </div>
          <div className={cardCn}>
            <div className="flex items-start gap-4">
              <Search className="mt-0.5 h-6 w-6 shrink-0 text-elec-yellow" />
              <div>
                <h3 className="mb-1 text-[15px] font-semibold tracking-tight text-white">
                  RAMS and site documentation
                </h3>
                <p className="text-sm leading-relaxed text-white">
                  Use the <SEOInternalLink href="/rams-generator">RAMS generator</SEOInternalLink> to
                  produce risk assessments and method statements for site electrical work, and keep
                  the CDM documentation trail complete without the paperwork evening.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Construction work is steady, well paid, and often leads to the permanent installation
          contract once the building is finished. Professional documentation, on time, every quarter,
          is what wins that.
        </p>
        <SEOAppBridge
          title="Site EICRs completed on site, not at a desk"
          description="Join 1,000+ UK electricians creating professional certificates with voice entry, AI defect coding, and instant PDF delivery."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConstructionSiteTemporarySupplyPage() {
  return (
    <GuideTemplate
      title="Construction Site Temporary Supply: 110V Guide"
      description="Construction site temporary electrical supply: 110V CTE tool circuits (55V to earth), BS 7375 site distribution boards, 30mA RCDs and 3-month EICR cycle."
      datePublished="2025-11-12"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Construction Guide"
      badgeIcon={HardHat}
      heroTitle={
        <>
          Construction Site Temporary Supply:{' '}
          <span className="text-elec-yellow">The Complete 110V Guide for UK Sites</span>
        </>
      }
      heroSubtitle="Construction site temporary installations use 110V CTE for portable tools, BS EN 61439-4 assemblies, one of four permitted protection methods on every socket-outlet circuit up to 32 A (Reg 704.410.3.10), and quarterly inspection. This guide covers BS 7375 and BS 7671:2018+A4:2026 Section 704 — with the regulation numbers and the Zs figures."
      readingTime={14}
      answerBox={{
        question: 'What voltage is used on construction sites in the UK?',
        answer:
          'Portable hand tools and handlamps on UK construction sites are supplied at 110 V reduced low voltage — a 55-0-55 V centre-tapped-earth arrangement, so no live conductor sits more than 55 V above earth (BS 7671 Reg 411.8.1.2). Reg 704.410.3.10 requires every socket-outlet circuit rated up to and including 32 A to be protected by reduced low voltage, by automatic disconnection with a 30 mA RCD to Reg 415.1.1, by electrical separation, or by SELV/PELV. Site installations also follow BS 7375:2010 and are commonly inspected every 3 months.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Construction Site Temporary Supply"
      relatedPages={relatedPages}
      ctaHeading="Complete Site EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians creating professional certificates with voice test entry, AI defect coding, and instant PDF delivery. Built for construction site conditions. 7-day free trial, cancel anytime."
    />
  );
}
