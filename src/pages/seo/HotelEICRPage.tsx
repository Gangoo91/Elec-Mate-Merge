import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  AlertTriangle,
  PoundSterling,
  ClipboardCheck,
  Building2,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation helpers
// -------------------------------------------------------------------

/** Edge-to-edge on phones, inset card from sm: up. */
const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableShellCn =
  '-mx-4 my-5 overflow-hidden rounded-none border-y border-white/[0.14] bg-white/[0.04] ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn =
  'whitespace-nowrap border-b border-white/[0.14] px-4 py-3 text-left text-[13px] font-semibold text-white';
const tdCn = 'border-b border-white/[0.08] px-4 py-3 align-top text-sm text-white';

type Point = { term: string; detail: React.ReactNode };

/** Definition list — bold lead-in carries the hierarchy, no decorative icons. */
function PointList({ items }: { items: Point[] }) {
  return (
    <div className={cardCn}>
      <dl className="space-y-5">
        {items.map((item) => (
          <div key={item.term}>
            <dt className="text-[15px] font-semibold leading-snug text-white">{item.term}</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-white">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Wide content scrolls inside its own container — the page body never does. */
function ScrollTable({ children, note }: { children: React.ReactNode; note?: React.ReactNode }) {
  return (
    <div className={tableShellCn}>
      <div className="overflow-x-auto">{children}</div>
      {note ? <p className="px-4 py-3 text-xs leading-relaxed text-white">{note}</p> : null}
    </div>
  );
}

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial EICR', href: '/guides/eicr-for-commercial' },
  { label: 'Hotel EICR', href: '/hotel-eicr' },
];

const tocItems = [
  { id: 'at-a-glance', label: 'Hotel EICR at a Glance' },
  { id: 'fire-safety-order', label: 'Regulatory Reform (Fire Safety) Order 2005' },
  { id: 'eicr-frequency', label: 'How Often a Hotel Needs an EICR' },
  { id: 'bedroom-safety', label: 'Bedroom Electrical Safety' },
  { id: 'bathroom-zones', label: 'En-Suite Showers & Bathroom Zones' },
  { id: 'kitchen-laundry', label: 'Kitchen & Laundry Circuits' },
  { id: 'emergency-lighting', label: 'Emergency Lighting — BS 5266-1' },
  { id: 'fire-alarm', label: 'Fire Alarm System — BS 5839-1' },
  { id: 'holiday-lets', label: 'Holiday Lets, B&Bs & Serviced Accommodation' },
  { id: 'inspection-scope', label: 'Full EICR Scope for Hotels' },
  { id: 'compliance-costs', label: 'Typical Compliance Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Hotels, guest houses and B&Bs are non-domestic premises subject to the Regulatory Reform (Fire Safety) Order 2005. The responsible person must carry out a fire risk assessment and put adequate fire precautions in place, including electrical safety measures.',
  'No law names a hotel EICR interval. Five years is the interval most commonly applied, but the suggested frequencies in IET Guidance Note 3 Table 3.2 are recommendations, not legal requirements — the responsible person decides, and kitchens, laundries and plant rooms in continuous use are commonly put on a shorter cycle.',
  'Guest bedroom socket-outlets need 30 mA RCD protection under Regulation 411.3.3(a). Because guests are ordinary persons, the documented risk-assessment exception in 411.3.3(b) is not available — a bedroom socket circuit without RCD protection is a defect, not a judgement call.',
  'En-suites are special locations under BS 7671 Part 7, Section 701. Zone 1 runs to 2.25 m above finished floor level or the highest fixed shower head, whichever is higher; zone 2 extends 0.60 m beyond it; IPX7 applies in zone 0 and IPX4 in zones 1 and 2 (Regulation 701.512.2).',
  'Socket-outlets are prohibited within 2.50 m horizontally of the zone 1 boundary, other than SELV socket-outlets and shaver supply units to BS EN 61558-2-5 (Regulation 701.512.3).',
  'Emergency lighting to BS 5266-1 is required throughout all means of escape. Sleeping accommodation attracts a three-hour minimum duration, so one-hour luminaires are not appropriate in a hotel.',
  'Fire alarm systems in hotels are designed to BS 5839-1:2025. The category comes from the fire risk assessment; under the 2025 edition sleeping rooms count as high-risk areas requiring automatic detection, and heat detectors are no longer appropriate in them for new work.',
];

const faqs = [
  {
    question: 'Is an EICR a legal requirement for a hotel?',
    answer:
      'There is no single law mandating an EICR for hotels by name, but the combination of the Regulatory Reform (Fire Safety) Order 2005, the Health and Safety at Work etc. Act 1974 and the Electricity at Work Regulations 1989 effectively requires hotels to maintain their electrical installation in a safe condition and to demonstrate that they have done so. The recognised way to demonstrate it is a periodic EICR carried out by a competent person. Many hotel insurance policies also require a current EICR as a condition of cover, and some local authorities attach EICR conditions to premises licences.',
  },
  {
    question: 'How often should a hotel have an EICR?',
    answer:
      'Five years is the interval most commonly applied to a hotel, but no statute sets it. IET Guidance Note 3 Table 3.2 gives suggested initial frequencies for inspection and testing and is explicit that those frequencies are recommendations, not legal requirements — it is the person responsible for the installation who determines when the next periodic inspection is carried out, and the interval may be shortened where conditions warrant it. In practice commercial kitchens, laundry rooms and plant rooms in continuous use are put on a shorter cycle, commonly three years. Re-inspect after significant electrical work, after a change of responsible person or ownership, and after any electrical incident causing injury or significant damage. The fire risk assessment should reference the current EICR as part of the fire safety evidence base.',
  },
  {
    question: 'What bathroom zone rules apply to hotel en-suites?',
    answer:
      'Hotel en-suites are special locations under BS 7671 Part 7, Section 701. Zone 0 is the interior of the bath tub or shower basin. Zone 1 runs from finished floor level to the horizontal plane of the highest fixed shower head or 2.25 m above finished floor level, whichever is higher (Regulation 701.32.3). Zone 2 is the 0.60 m band beyond the zone 1 boundary at the same height (Regulation 701.32.4). Equipment must be at least IPX7 in zone 0 and IPX4 in zones 1 and 2 (Regulation 701.512.2). Socket-outlets other than SELV socket-outlets and shaver supply units complying with BS EN 61558-2-5 are prohibited within 2.50 m horizontally of the zone 1 boundary (Regulation 701.512.3). Additional protection by RCD applies to circuits serving the location and to circuits merely passing through zones 1 or 2 (Regulation 701.411.3.3). Supplementary equipotential bonding is required by Regulation 701.415.2, although it may be omitted where the location is in a building with main protective bonding to Regulation 411.3.1.2, every final circuit of the location satisfies automatic disconnection under Regulation 411.3.2, and every final circuit has RCD additional protection.',
  },
  {
    question: 'Do walk-in showers and wet rooms have different zones?',
    answer:
      'Yes, and hotel en-suites increasingly use them. For a shower without a basin, zone 0 is only 0.10 m high with the same horizontal extent as zone 1, and zone 1 extends 1.20 m from the centre point of the fixed water outlet on the wall or ceiling rather than being drawn round a basin. There is no zone 2 at all for a shower without a basin — the enlarged 1.20 m zone 1 replaces it (Regulations 701.32.2 and 701.32.3). Applying bath-tub geometry to a wet room is a common design error and usually puts accessories in the wrong zone.',
  },
  {
    question: 'What fire alarm category does a hotel require under BS 5839-1?',
    answer:
      'The fire risk assessment determines the category — the standard does not assign one by building type. In practice hotels are designed to Category L1 or L2 because guests sleep on the premises and cannot respond to visual signs of fire. L1 is automatic detection throughout the protected premises, excluding only specified low-risk locations such as bathrooms and toilets. L2 is detection on all escape routes plus rooms and areas of higher risk, and under BS 5839-1:2025 rooms where people sleep are defined as high-risk areas requiring automatic detection — so an L2 hotel system covers guest bedrooms. The 2025 edition also means heat detection is no longer appropriate in sleeping rooms for new work; smoke or multi-sensor detection is used instead. Existing heat detection is not retrospectively non-compliant, but it will be picked up by the fire risk assessment and must change when the system undergoes new work.',
  },
  {
    question: 'What are the emergency lighting requirements for a hotel?',
    answer:
      'Emergency lighting to BS 5266-1 is required throughout all means of escape: guest bedroom corridors, stairwells, public areas including restaurant, bar, reception and function rooms, toilet areas without natural light, and all escape routes and final exits. Sleeping accommodation attracts a three-hour minimum duration, and multi-storey and large premises attract it as well, so a hotel is a three-hour design in practice. The system is maintained by a monthly function test on every luminaire and an annual full-duration test, recorded in a logbook; BS 5266-1:2025 also introduces a five-yearly photometric verification of the defined escape route.',
  },
  {
    question: 'What should hotels do if an EICR identifies C2 observations?',
    answer:
      'A C2 observation means a potentially dangerous condition that must be remedied. In a hotel, C2 observations should be treated urgently — particularly any observation relating to guest bedroom circuits, en-suite zones or emergency lighting. There is no statutory 28-day deadline for hotels, unlike private rented residential property in England, but the Regulatory Reform (Fire Safety) Order 2005 requires prompt action to remedy fire safety hazards. The responsible person should instruct remedial works immediately and, for serious observations, consider whether affected areas should be taken out of use until the work is complete.',
  },
  {
    question: 'Who is responsible for electrical safety in a leased hotel?',
    answer:
      'Under the Regulatory Reform (Fire Safety) Order 2005, the responsible person is the employer where the hotel is operated as a business, or otherwise the person in control of the premises. In a leased hotel, the lease will typically specify the split of maintenance responsibilities between landlord and tenant. The operator is usually the responsible person for fire safety purposes and must ensure the electrical installation is maintained safely regardless of who owns the building. Operators should confirm the position in the lease before taking on a hotel.',
  },
  {
    question: 'Do hotel kitchen and laundry circuits need special consideration in an EICR?',
    answer:
      'Yes. Commercial kitchen and laundry circuits are high-load circuits in near-continuous operation, which accelerates wear. The inspector will look at protective device selection and coordination against the circuit design current, cable ratings with the correct correction factors applied for grouping and ambient temperature, extraction interlock arrangements, three-phase distribution and balance where applicable, and the bonding of extraneous-conductive-parts. It is also worth noting that the IET On-Site Guide states its typical current demand and diversity tables are not intended for large hotels — those installations are assessed case by case by the designer, so an EICR inspector should not assume the original design used standard diversity allowances.',
  },
];

const answerBox = {
  question: 'Does a hotel need an EICR, and how often?',
  answer:
    'No law names an EICR for hotels, but the Regulatory Reform (Fire Safety) Order 2005, the Health and Safety at Work etc. Act 1974 and the Electricity at Work Regulations 1989 together require a hotel to keep its fixed electrical installation safe — and a periodic EICR by a competent person is the recognised evidence of that. Five years is the interval most commonly applied; kitchens, laundries and plant rooms in continuous use are often put on a three-year cycle.',
};

const relatedPages: RelatedPage[] = [
  {
    href: '/pub-licensed-premises-eicr',
    title: 'EICR for Pubs & Licensed Premises',
    description:
      'Licensing Act 2003 requirements, licence conditions, cellar equipment, and gaming machine circuits.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-commercial',
    title: 'EICR for Commercial Premises',
    description: 'Full guide to commercial EICR requirements, scope, and compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description: 'BS 5266-1 emergency lighting inspection, testing, and certification guide.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const glanceRows: { item: string; figure: string; source: string }[] = [
  {
    item: 'Periodic inspection interval',
    figure: 'Commonly 5 years',
    source: 'No statutory figure. GN3 Table 3.2 frequencies are recommendations only',
  },
  {
    item: 'Bedroom socket-outlets',
    figure: '30 mA RCD',
    source: 'Reg 411.3.3(a) — no risk-assessment exception where guests use the sockets',
  },
  {
    item: 'En-suite zone 1',
    figure: 'To 2.25 m AFFL',
    source: 'Or the highest fixed shower head if higher — Reg 701.32.3',
  },
  {
    item: 'En-suite zone 2',
    figure: '0.60 m band',
    source: 'Beyond the zone 1 boundary, same height — Reg 701.32.4',
  },
  {
    item: 'IP rating in en-suites',
    figure: 'IPX7 / IPX4',
    source: 'IPX7 in zone 0, IPX4 in zones 1 and 2 — Reg 701.512.2',
  },
  {
    item: 'Socket-outlet exclusion',
    figure: '2.50 m horizontally',
    source: 'From the zone 1 boundary; SELV and shaver supply units excepted — Reg 701.512.3',
  },
  {
    item: 'Emergency lighting duration',
    figure: '3 hours',
    source: 'Sleeping accommodation minimum — BS 5266-1',
  },
  {
    item: 'Fire alarm standard',
    figure: 'BS 5839-1:2025',
    source: 'Category set by the fire risk assessment; typically L1 or L2',
  },
  {
    item: 'AFDDs in a hotel',
    figure: 'Recommended',
    source:
      'Reg 421.1.7 requires them only in HRRBs, HMOs, purpose-built student accommodation and care homes',
  },
];

const sections = [
  {
    id: 'at-a-glance',
    heading: 'Hotel EICR at a Glance',
    content: (
      <>
        <p>
          The figures a hotel EICR turns on, in one place. Every regulation number below is from BS
          7671:2018+A4:2026.
        </p>
        <ScrollTable
          note={
            <>
              AFFL = above finished floor level. HRRB = high rise residential building, assumed in
              BS 7671 to mean a residential building over 18 m in height or in excess of six
              storeys, whichever is met first.
            </>
          }
        >
          <table className="w-full min-w-[36rem] border-collapse">
            <thead>
              <tr className="bg-white/[0.06]">
                <th scope="col" className={thCn}>
                  Item
                </th>
                <th scope="col" className={thCn}>
                  Figure
                </th>
                <th scope="col" className={thCn}>
                  Where it comes from
                </th>
              </tr>
            </thead>
            <tbody>
              {glanceRows.map((row) => (
                <tr key={row.item}>
                  <th scope="row" className={`${tdCn} font-semibold`}>
                    {row.item}
                  </th>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    {row.figure}
                  </td>
                  <td className={tdCn}>{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollTable>
      </>
    ),
  },
  {
    id: 'fire-safety-order',
    heading: 'Regulatory Reform (Fire Safety) Order 2005 Obligations',
    content: (
      <>
        <p>
          The Regulatory Reform (Fire Safety) Order 2005 is the primary legislation governing fire
          safety in non-domestic premises in England and Wales. Hotels, guest houses, bed and
          breakfasts and all other commercial accommodation providers fall within it, and the fixed
          electrical installation is a central element of fire safety in any of them.
        </p>
        <PointList
          items={[
            {
              term: 'What the responsible person must do',
              detail: (
                <>
                  The responsible person — typically the hotel operator or employer — must carry out
                  or commission a suitable and sufficient fire risk assessment. It must identify
                  fire hazards, electrical hazards among them, and put appropriate precautions in
                  place to reduce the risk to guests and staff.
                </>
              ),
            },
            {
              term: 'Where the EICR fits',
              detail: (
                <>
                  The fire risk assessment must consider the condition of the fixed electrical
                  installation, the adequacy of fire detection and the adequacy of emergency
                  lighting. A current{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> is the
                  recognised evidence that the fixed installation has been assessed by a competent
                  person and found satisfactory.
                </>
              ),
            },
            {
              term: 'Enforcement',
              detail: (
                <>
                  The local fire and rescue service has powers to inspect, to issue enforcement
                  notices and, in serious cases, to issue prohibition notices preventing use of part
                  or all of the premises. Electrical defects found during a fire authority
                  inspection that are not reflected in a current EICR can trigger enforcement
                  action.
                </>
              ),
            },
            {
              term: 'The duties that sit alongside it',
              detail: (
                <>
                  Hotels also owe duties to staff under the Health and Safety at Work etc. Act 1974
                  and the Electricity at Work Regulations 1989. The installation must be maintained
                  in a safe condition for employees as well as guests, which is why the EICR is
                  usually the document that satisfies both regimes at once.
                </>
              ),
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'eicr-frequency',
    heading: 'How Often a Hotel Needs an EICR',
    content: (
      <>
        <p>
          Five years is the interval most commonly applied to a hotel, but it is a recommendation
          rather than a legal maximum. IET Guidance Note 3 sets out suggested initial frequencies in
          Table 3.2 and states plainly that they are recommendations and not legal requirements: it
          is the person responsible for the installation who determines when the next periodic
          inspection is undertaken, and the interval may be reduced where conditions warrant it.
        </p>
        <div className="my-5 grid gap-3 sm:grid-cols-2">
          <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
            <div className="text-2xl font-bold text-white">5 years</div>
            <div className="mt-1 text-sm leading-relaxed text-white">
              The usual starting point — well-maintained hotel, modern distribution boards, no
              significant defect history.
            </div>
          </div>
          <div className="-mx-4 rounded-none border-y border-elec-yellow/30 bg-elec-yellow/[0.08] p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
            <div className="text-2xl font-bold text-elec-yellow">3 years</div>
            <div className="mt-1 text-sm leading-relaxed text-white">
              Commonly applied to commercial kitchens, laundry rooms and plant rooms in continuous
              use, and to older or coastal installations.
            </div>
          </div>
        </div>
        <PointList
          items={[
            {
              term: 'The interval is a judgement, and it has to be recorded',
              detail: (
                <>
                  The inspector records a recommended date for the next inspection on the report,
                  and GN3 is explicit that any decision to shorten or occasionally lengthen the
                  interval should be supported by an assessment of the conditions affecting the
                  installation. Where significant deterioration or C1 and C2 observations are found,
                  a shorter period should be recommended.
                </>
              ),
            },
            {
              term: 'Shorten it for the working parts of the building',
              detail: (
                <>
                  Large hotels with commercial kitchens and laundry rooms running most of the day,
                  installations wired before 1990, hotels that have expanded or significantly
                  altered the installation, and areas with higher moisture levels such as basements,
                  pool plant rooms and coastal sites all justify a shorter cycle than the guest
                  floors.
                </>
              ),
            },
            {
              term: 'On change of ownership or operator',
              detail: (
                <>
                  When a hotel changes hands the incoming operator should commission a fresh EICR
                  before accepting liability for the installation. A report commissioned by the
                  previous operator will not reflect changes made since it was issued.
                </>
              ),
            },
            {
              term: 'After refurbishment',
              detail: (
                <>
                  A bedroom block refurbishment, a new kitchen, an extension or any significant
                  alteration should be followed by an Electrical Installation Certificate from the
                  contractor for the new work, and the periodic inspection cycle reviewed so the
                  whole installation is still covered.
                </>
              ),
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'bedroom-safety',
    heading: 'Bedroom Electrical Safety in Hotels',
    content: (
      <>
        <p>
          Guest bedrooms are the heart of a hotel&rsquo;s electrical liability. Guests sleep in these
          rooms and are particularly vulnerable at night, when nobody is present to notice the early
          signs of a fault before a fire develops.
        </p>
        <PointList
          items={[
            {
              term: 'RCD protection is not optional in a guest bedroom',
              detail: (
                <>
                  Regulation 411.3.3 requires 30 mA RCD additional protection for socket-outlets
                  rated up to 32 A. Paragraph (a) covers socket-outlets in locations liable to be
                  used by ordinary persons (BA1) or children (BA2), and the documented
                  risk-assessment exception in the regulation is expressly available for paragraph
                  (b) but not for (a) or (c). Guests are ordinary persons, so there is no route to
                  omitting RCD protection from a guest bedroom socket circuit. Absence of it is a
                  common finding in hotels with pre-2000 wiring.
                </>
              ),
            },
            {
              term: 'Arc fault detection — recommended, not required',
              detail: (
                <>
                  Regulation 421.1.7 requires AFDDs to BS EN 62606 on single-phase AC final circuits
                  supplying socket-outlets up to 32 A only in high rise residential buildings,
                  houses in multiple occupation, purpose-built student accommodation and care homes.
                  Hotels are not on that list, so for a hotel the regulation recommends AFDDs rather
                  than requiring them. Where they are fitted they go at the origin of the circuit
                  protected. A specifier who tells a hotel AFDDs are mandatory is overstating the
                  regulation; one who ignores them on a sleeping-risk premises is under-selling it.
                </>
              ),
            },
            {
              term: 'Enough socket-outlets, in the right places',
              detail: (
                <>
                  Bedrooms should have adequate socket-outlets on both sides of the bed, at the desk
                  or work area and adjacent to the television point. Too few sockets is not itself a
                  BS 7671 contravention, but it drives guests to their own extension leads and
                  adaptors, which is what actually causes the overload and damaged-flex findings.
                </>
              ),
            },
            {
              term: 'USB charging points',
              detail: (
                <>
                  Socket-outlets with integrated USB-A and USB-C charging are now common in hotel
                  bedrooms. They cut the number of unknown plug-top adaptors guests bring with them,
                  which is a real reduction in the counterfeit-charger risk rather than a
                  regulatory requirement.
                </>
              ),
            },
            {
              term: 'Trailing leads and bedside lighting',
              detail: (
                <>
                  Bedside lamp sockets, touch-sensitive lamp controllers and trailing socket leads
                  used for bedside lighting turn up on almost every hotel EICR. Where they are not
                  part of a properly wired installation they are recorded as observations against
                  the installation they are connected to; fixed bedside switched fused spurs are the
                  correct solution.
                </>
              ),
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'bathroom-zones',
    heading: 'En-Suite Showers and Bathroom Zones — BS 7671 Section 701',
    content: (
      <>
        <p>
          En-suite bathrooms and shower rooms are special locations under BS 7671 Part 7, Section
          701. Every en-suite in the hotel is in scope, and in a bedroom block that means the same
          three or four details are repeated a hundred times over — get one of them wrong at design
          stage and it is wrong everywhere.
        </p>
        <ScrollTable
          note={
            <>
              IP ratings from Regulation 701.512.2. Equipment exposed to water jets, for example for
              cleaning, requires at least IPX5. Shaver supply units to BS EN 61558-2-5 installed in
              zone 2 where direct spray from the shower is unlikely are excepted from the IPX4
              requirement.
            </>
          }
        >
          <table className="w-full min-w-[38rem] border-collapse">
            <thead>
              <tr className="bg-white/[0.06]">
                <th scope="col" className={thCn}>
                  Zone
                </th>
                <th scope="col" className={thCn}>
                  Extent — bath tub or shower basin
                </th>
                <th scope="col" className={thCn}>
                  Shower without a basin
                </th>
                <th scope="col" className={thCn}>
                  Min IP
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  Zone 0
                </th>
                <td className={tdCn}>Interior of the bath tub or shower basin</td>
                <td className={tdCn}>
                  0.10 m high, same horizontal extent as zone 1 (Reg 701.32.2)
                </td>
                <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>IPX7</td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  Zone 1
                </th>
                <td className={tdCn}>
                  Floor level up to the highest fixed shower head or 2.25 m above finished floor
                  level, whichever is higher; vertical surface circumscribing the bath tub or basin
                  (Reg 701.32.3)
                </td>
                <td className={tdCn}>
                  Extends 1.20 m from the centre point of the fixed water outlet on the wall or
                  ceiling
                </td>
                <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>IPX4</td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  Zone 2
                </th>
                <td className={tdCn}>
                  0.60 m horizontally beyond the zone 1 boundary, to the same height (Reg 701.32.4)
                </td>
                <td className={tdCn}>
                  No zone 2 — the enlarged 1.20 m zone 1 replaces it (Reg 701.32.4)
                </td>
                <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>IPX4</td>
              </tr>
            </tbody>
          </table>
        </ScrollTable>
        <PointList
          items={[
            {
              term: 'Socket-outlets — the 2.50 m rule (Regulation 701.512.3)',
              detail: (
                <>
                  Except for SELV socket-outlets complying with Section 414 and shaver supply units
                  complying with BS EN 61558-2-5, socket-outlets are prohibited within 2.50 m
                  horizontally of the zone 1 boundary. In a compact en-suite that distance often
                  reaches past the door, which is why the shaver supply unit — permitted in zone 2
                  and outside the 2.50 m restriction — is the standard answer. In zone 1 only
                  switches of SELV circuits at not more than 12 V AC RMS or 30 V ripple-free DC are
                  permitted, with the safety source outside zones 0, 1 and 2.
                </>
              ),
            },
            {
              term: 'Supplementary bonding — and when it may be omitted',
              detail: (
                <>
                  Regulation 701.415.2 requires supplementary protective equipotential bonding
                  connecting the circuit protective conductors to accessible
                  extraneous-conductive-parts in the room: metallic service and waste pipes,
                  metallic central heating and air conditioning pipework, and accessible metallic
                  structural parts of the building. It may be omitted where the building has main
                  protective bonding to Regulation 411.3.1.2, every final circuit of the location
                  meets automatic disconnection under Regulation 411.3.2, and every final circuit
                  has RCD additional protection to Regulation 415.1.1. Coding an en-suite as
                  defective purely because there is no visible supplementary bond, without checking
                  those three conditions, is one of the most common EICR errors on hotel work.
                </>
              ),
            },
            {
              term: 'RCD protection covers circuits that only pass through',
              detail: (
                <>
                  Regulation 701.411.3.3 requires RCD additional protection for low voltage circuits
                  serving the location <em>and</em> for circuits passing through zones 1 or 2 that do
                  not serve it at all. A corridor lighting circuit routed through the en-suite
                  ceiling void is caught by the second limb, which is easy to miss on a bedroom
                  block.
                </>
              ),
            },
          ]}
        />
        <p>
          En-suites are inspected particularly carefully during hotel EICRs. The combination of
          moisture, high guest turnover and the consequences of shock in a wet environment makes
          zone compliance a priority — see our guide to{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR observation codes
          </SEOInternalLink>{' '}
          for what each code means and the action it requires.
        </p>
      </>
    ),
  },
  {
    id: 'kitchen-laundry',
    heading: 'Kitchen and Laundry Circuits in Hotels',
    content: (
      <>
        <p>
          Commercial hotel kitchens and laundry rooms carry some of the highest electrical loads in
          the building and run for most of the day. These circuits need careful assessment during
          the EICR and are frequently where the deficiencies in an older hotel installation turn up.
        </p>
        <PointList
          items={[
            {
              term: 'Standard diversity tables do not apply to a large hotel',
              detail: (
                <>
                  The IET On-Site Guide states that its typical current demand and diversity
                  allowances are not intended for blocks of residential dwellings, large hotels, or
                  industrial and large commercial premises: those installations are to be assessed
                  case by case by the designer, using judgement about expected simultaneous usage.
                  An inspector should therefore not assume the original design used standard
                  diversity, and a designer adding load to a hotel board cannot lift an allowance
                  out of the tables.
                </>
              ),
            },
            {
              term: 'Three-phase distribution and balance',
              detail: (
                <>
                  Large hotel kitchens usually distribute load across three phases. The inspection
                  covers phase balance, protective device selection on each phase, and the condition
                  of the three-phase distribution equipment, including the state of terminations
                  where heat cycling has been at work.
                </>
              ),
            },
            {
              term: 'Extraction interlocks',
              detail: (
                <>
                  Commercial kitchen extraction is interlocked with the cooking equipment so that a
                  failure of the extraction system shuts the appliances down. It is a
                  safety-critical function and should be confirmed as operational as part of the
                  inspection.
                </>
              ),
            },
            {
              term: 'Laundry circuits and correction factors',
              detail: (
                <>
                  Industrial washing machines and tumble dryers draw high, sustained currents.
                  Dedicated circuits sized against the actual running load are the norm, and where
                  cables are grouped in trunking or conduit, or run through hot plant areas, the
                  grouping and ambient temperature correction factors from BS 7671 Appendix 4 have
                  to be applied to the tabulated rating for the reference method actually used.
                </>
              ),
            },
            {
              term: 'Bonding of extraneous-conductive-parts',
              detail: (
                <>
                  Regulation 411.3.1.2 requires extraneous-conductive-parts liable to introduce a
                  dangerous potential difference to be connected to the main earthing terminal —
                  metallic water and gas installation pipes, other metallic pipework and ducting,
                  central heating and air conditioning systems, and exposed metallic structural
                  parts. Metalwork that is not liable to introduce a potential does not need
                  bonding, and metal enclosures of equipment are protected by their circuit
                  protective conductor rather than by bonding. Missing or undersized main bonding
                  where it is genuinely required is a frequent finding in older hotel plant areas.
                </>
              ),
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting in Hotels — BS 5266-1',
    content: (
      <>
        <p>
          Emergency lighting is critical to life safety in a hotel. Guests are unfamiliar with the
          building layout and may be trying to find an exit in darkness, from sleep, in a building
          they arrived at hours earlier. BS 5266-1 sets out the requirements; the current edition is
          BS 5266-1:2025, which came into force on 31 October 2025 and withdrew the 2016 edition.
        </p>
        <PointList
          items={[
            {
              term: 'Coverage — all means of escape',
              detail: (
                <>
                  Guest bedroom corridors, stairwells, public areas including reception, restaurant,
                  bar, lounges and function rooms, toilet areas without natural light, and all final
                  exit doors. Exit signs must be illuminated by the emergency lighting system.
                </>
              ),
            },
            {
              term: 'Duration — three hours',
              detail: (
                <>
                  Sleeping accommodation attracts a three-hour minimum duration, and multi-storey
                  and large premises attract it independently, so a hotel is a three-hour design on
                  more than one ground. One-hour luminaires are reserved for small premises that are
                  evacuated rapidly with no sleeping risk, which never describes a hotel.
                </>
              ),
            },
            {
              term: 'Maintained and non-maintained luminaires',
              detail: (
                <>
                  Maintained luminaires, which are also part of the normal lighting, suit public
                  areas, bars and restaurants where the lighting is on through the evening.
                  Non-maintained luminaires, which illuminate only on failure of the normal supply,
                  suit back-of-house areas, corridors and stairwells.
                </>
              ),
            },
            {
              term: 'Testing and the logbook',
              detail: (
                <>
                  A monthly function test on every luminaire and an annual full-duration test are
                  recorded in the logbook, alongside the daily check of the central panel indicators
                  where a central system is installed. BS 5266-1:2025 adds a five-yearly
                  point-by-point photometric verification of the defined escape route. The logbook
                  must be available to the fire authority and the EICR inspector; incomplete testing
                  records are one of the most common findings on hotel work.
                </>
              ),
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Systems in Hotels — BS 5839-1:2025',
    content: (
      <>
        <p>
          Hotels require a commercial-grade fire alarm system designed to BS 5839-1, the standard
          for non-domestic premises. The current edition is BS 5839-1:2025. The system category
          comes from the fire risk assessment rather than from the building type, but a hotel is a
          sleeping risk and is designed accordingly.
        </p>
        <PointList
          items={[
            {
              term: 'Category L1 or L2 — what the difference actually is',
              detail: (
                <>
                  L1 is automatic detection throughout the protected premises, excluding only
                  specified low-risk locations such as bathrooms, shower rooms and toilets. L2 is
                  detection on all escape routes plus rooms and areas of higher risk. Under BS
                  5839-1:2025 rooms where people sleep are defined as high-risk areas requiring
                  automatic detection, so an L2 hotel system already covers guest bedrooms. Which of
                  the two applies is a fire risk assessment decision, not a default.
                </>
              ),
            },
            {
              term: 'Heat detection in sleeping rooms is out for new work',
              detail: (
                <>
                  The 2025 edition no longer treats heat detection as appropriate in rooms where
                  people sleep; smoke or multi-sensor detection is used instead. The change is not
                  retrospective — existing heat detection in bedrooms is not automatically
                  non-compliant — but it applies to new installations and to upgrades, and the fire
                  risk assessment is likely to flag it regardless.
                </>
              ),
            },
            {
              term: 'Addressable systems in larger hotels',
              detail: (
                <>
                  An addressable system identifies the specific detector or call point that has
                  operated, so the panel shows where the fire is rather than which zone it is in.
                  That matters in a building with multiple floors and a hundred near-identical
                  doors. Conventional zoned systems remain workable for small properties.
                </>
              ),
            },
            {
              term: 'Staged alarms and investigation time',
              detail: (
                <>
                  A staged alarm lets management investigate before a full evacuation: an initial
                  alert to staff, followed by full evacuation if the alert is confirmed or not
                  cleared within the agreed period. It reduces nuisance evacuations without
                  weakening the response, and the cause-and-effect behind it must be documented — BS
                  5839-1:2025 requires a cause-and-effect matrix or text description to be handed
                  over with the system documentation.
                </>
              ),
            },
            {
              term: 'The wiring is inside the EICR scope',
              detail: (
                <>
                  Fire alarm system wiring forms part of the fixed electrical installation. The
                  inspector checks the panel supply, the alarm circuit wiring and the standby supply
                  arrangements; faults found there are recorded as EICR observations even though the
                  system itself is serviced under BS 5839-1.
                </>
              ),
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'holiday-lets',
    heading: 'Holiday Lets, B&Bs and Serviced Accommodation',
    content: (
      <>
        <p>
          Self-catering holiday lets, guest houses, B&amp;Bs and serviced apartments sit in an
          awkward gap: they look domestic, they are used by paying guests, and the rules that apply
          are not the ones that apply to a private rented home.
        </p>
        <PointList
          items={[
            {
              term: 'Fire safety law treats them as business premises',
              detail: (
                <>
                  Where sleeping accommodation is provided as a business, the Regulatory Reform
                  (Fire Safety) Order 2005 applies in England and Wales in the same way as it does
                  to a hotel. The owner or operator is the responsible person and needs a fire risk
                  assessment that covers the electrical installation, detection and emergency
                  lighting appropriate to the size and layout of the property.
                </>
              ),
            },
            {
              term: 'The private rented sector timetable does not apply',
              detail: (
                <>
                  The Electrical Safety Standards in the Private Rented Sector (England) Regulations
                  2020 — the source of the five-year EICR duty and the 28-day remedial deadline —
                  are built around tenancies where the property is the occupier&rsquo;s only or main
                  residence. Holiday accommodation is not, so those specific statutory deadlines do
                  not bite. The duty to maintain the installation in a safe condition under the
                  Electricity at Work Regulations 1989 still does, and a periodic EICR remains the
                  practical way to evidence it.
                </>
              ),
            },
            {
              term: 'What an inspection should cover in a small let',
              detail: (
                <>
                  The same fundamentals as a hotel, at a smaller scale: 30 mA RCD protection on
                  socket-outlet circuits under Regulation 411.3.3(a), Section 701 zone compliance in
                  the bathroom, condition of the consumer unit and its labelling, main protective
                  bonding to Regulation 411.3.1.2 where extraneous-conductive-parts enter, and the
                  condition of outdoor sockets, hot tub supplies and any EV charge point.
                </>
              ),
            },
            {
              term: 'Appliances supplied to guests',
              detail: (
                <>
                  Kettles, hairdryers, toasters, heaters and other portable appliances provided for
                  guest use are not part of the fixed installation and are outside the EICR. They
                  fall under the Electricity at Work Regulations 1989 duty to maintain, which in
                  practice means in-service inspection and testing on a risk-based schedule.
                </>
              ),
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'inspection-scope',
    heading: 'Full EICR Scope for Hotels',
    content: (
      <>
        <p>
          A hotel EICR is one of the more complex inspections a qualified electrician undertakes. The
          scope runs from the incoming supply to the final socket-outlet in a guest bedroom, and the
          extent and any limitations must be agreed with the client and recorded on the report
          before work starts.
        </p>
        <PointList
          items={[
            {
              term: 'Origin of the installation',
              detail: (
                <>
                  Condition of the main switch, metering equipment and incoming supply cables,
                  confirmation of the earthing arrangement — TN-S, TN-C-S or TT — and measurement of
                  external earth fault loop impedance and prospective fault current at the origin.
                </>
              ),
            },
            {
              term: 'Distribution boards and sub-distribution',
              detail: (
                <>
                  Condition, labelling, accessibility and circuit charts, protective device
                  selection, RCD arrangement and discrimination, and insulation resistance testing.
                  A multi-floor hotel typically has a main board plus a board per floor, and the
                  floor boards are where undocumented alterations accumulate.
                </>
              ),
            },
            {
              term: 'Surge protection',
              detail: (
                <>
                  Regulation 443.4.1 requires protection against transient overvoltages where the
                  consequence could result in serious injury to, or loss of, human life, or in
                  significant financial or data loss. For all other cases protection is required
                  unless the owner of the installation declares it is not, on the basis that any
                  loss or damage is tolerable and the risk is accepted. On a hotel with life safety
                  systems on the same installation, that declaration is a decision the responsible
                  person has to make consciously — the risk-assessment method that used to justify
                  omission was withdrawn.
                </>
              ),
            },
            {
              term: 'Guest bedroom circuits',
              detail: (
                <>
                  Socket-outlet circuits, lighting circuits and any en-suite circuits, on an agreed
                  sample of bedrooms. The sampling rate and the rooms actually accessed must be
                  recorded on the report, otherwise the next inspector cannot tell what was covered.
                </>
              ),
            },
            {
              term: 'Plant rooms, lift motor rooms and back of house',
              detail: (
                <>
                  Plant rooms, lift machinery rooms, boiler rooms and service areas are all in
                  scope. The lift supply is inspected as part of the installation; the lift itself
                  is maintained separately by a lift engineer and is outside the EICR.
                </>
              ),
            },
            {
              term: 'Emergency lighting and fire alarm wiring',
              detail: (
                <>
                  Both systems are part of the fixed electrical installation. The inspector verifies
                  the supply arrangements, circuit protection and wiring condition, and reviews the
                  test records, without substituting for the separate BS 5266-1 and BS 5839-1
                  servicing regimes.
                </>
              ),
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'compliance-costs',
    heading: 'Typical Hotel Electrical Compliance Costs',
    content: (
      <>
        <p>
          Costs vary widely with the size, age and condition of the property. The figures below are
          indicative market guidance for a 30-bedroom hotel with a commercial kitchen, bar,
          restaurant and function room — a starting point for budgeting, not a quotation.
        </p>
        <ScrollTable
          note="Indicative ranges only. Actual cost depends on installation condition, access, out-of-hours working and how much of the existing wiring can be reused."
        >
          <table className="w-full min-w-[32rem] border-collapse">
            <thead>
              <tr className="bg-white/[0.06]">
                <th scope="col" className={thCn}>
                  Work item (30-bedroom hotel)
                </th>
                <th scope="col" className={thCn}>
                  Indicative range
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={`${tdCn} font-semibold`}>
                  EICR
                  <span className="mt-1 block font-normal">
                    Many circuits, multiple distribution boards, en-suite zone checks, emergency
                    lighting and fire alarm wiring
                  </span>
                </th>
                <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                  £2,000&ndash;£5,000
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} font-semibold`}>
                  Distribution board replacement
                  <span className="mt-1 block font-normal">
                    Commercial-grade RCBO board, per board — a hotel may have a main board plus six
                    to eight floor boards
                  </span>
                </th>
                <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                  £2,000&ndash;£5,000
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} font-semibold`}>
                  Emergency lighting upgrade
                  <span className="mt-1 block font-normal">
                    Three-hour duration; depends on luminaire count and whether existing wiring can
                    be reused
                  </span>
                </th>
                <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                  £5,000&ndash;£20,000
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} font-semibold`}>
                  Addressable fire alarm system
                  <span className="mt-1 block font-normal">
                    Fully addressable system to BS 5839-1:2025
                  </span>
                </th>
                <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                  £15,000&ndash;£50,000
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} font-semibold`}>
                  Fire alarm maintenance contract
                  <span className="mt-1 block font-normal">Annual, BS 5839-1 compliant</span>
                </th>
                <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                  £1,500&ndash;£4,000/yr
                </td>
              </tr>
            </tbody>
          </table>
        </ScrollTable>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Hotel Electrical Inspection Work',
    content: (
      <>
        <p>
          Hotel EICRs are among the highest-value inspection contracts available to commercial
          electricians. An inspector who knows Section 701 cold, understands where BS 5266-1 and BS
          5839-1 stop and BS 7671 starts, and can code an en-suite correctly commands a premium rate
          and keeps the relationship with the facilities manager for years.
        </p>
        <div className="my-5 space-y-3">
          <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
            <div className="flex items-start gap-4">
              <FileCheck2 className="mt-0.5 h-6 w-6 shrink-0 text-elec-yellow" />
              <div>
                <h4 className="mb-1 font-bold text-white">Complete hotel EICRs on site</h4>
                <p className="text-sm leading-relaxed text-white">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate EICR app</SEOInternalLink>{' '}
                  to document complex hotel installations on your phone. Circuit-by-circuit test
                  result entry, AI board scanning for distribution boards, and photo attachment for
                  en-suite zone observations mean you can produce a complete professional EICR on
                  site for even the largest hotel installation.
                </p>
              </div>
            </div>
          </div>
          <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
            <div className="flex items-start gap-4">
              <PoundSterling className="mt-0.5 h-6 w-6 shrink-0 text-elec-yellow" />
              <div>
                <h4 className="mb-1 font-bold text-white">
                  Win high-value remedial and maintenance contracts
                </h4>
                <p className="text-sm leading-relaxed text-white">
                  Distribution board replacements, emergency lighting upgrades and fire alarm
                  remediation in hotels are high-value contracts. Quote on site with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink> and
                  convert inspection clients into recurring annual maintenance relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more hotel electrical work with Elec-Mate"
          description="Complete hotel EICRs on your phone, quote remedial works and upgrades on site, and build recurring relationships with hotel facilities managers."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HotelEICRPage() {
  return (
    <GuideTemplate
      title="Hotel EICR: Hotels, Guest Houses & B&Bs UK"
      description="EICR for UK hotels, guest houses and holiday lets: how often, Fire Safety Order duties, en-suite Section 701 zones, emergency lighting and fire alarms."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Hotel Electrical Guide"
      badgeIcon={Building2}
      answerBox={answerBox}
      heroTitle={
        <>
          Hotel EICR UK:{' '}
          <span className="text-elec-yellow">
            Electrical Inspection for Hotels &amp; Guest Houses
          </span>
        </>
      }
      heroSubtitle="Hotels and guest houses are subject to the Regulatory Reform (Fire Safety) Order 2005 and must maintain their electrical installation to a standard that protects sleeping guests. This guide covers how often a hotel needs an EICR, bedroom electrical safety, kitchen and laundry circuits, emergency lighting to BS 5266-1, fire alarms to BS 5839-1:2025, en-suite zone requirements under BS 7671 Section 701, holiday lets, and indicative compliance costs."
      readingTime={17}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Hotel EICR"
      relatedPages={relatedPages}
      ctaHeading="Complete Hotel EICRs on Your Phone"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
