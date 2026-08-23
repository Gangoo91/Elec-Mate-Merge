import { Link } from 'react-router-dom';
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { ArrowRight, Home, ClipboardCheck, ShieldCheck, FileCheck2 } from 'lucide-react';

// -------------------------------------------------------------------
// Shared classes
// -------------------------------------------------------------------

/** Edge-to-edge on phones, inset and rounded from sm: up. */
const cardCn =
  '-mx-4 my-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const listCn = 'space-y-5 text-white';

const leadCn = 'block font-semibold text-white';

const btnCn =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-4 ' +
  'text-sm font-semibold text-black transition-opacity hover:opacity-90 touch-manipulation';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Property Guides', href: '/guides/period-property-electrical' },
  { label: 'Edwardian House Electrical Guide', href: '/edwardian-house-electrical' },
];

const tocItems = [
  { id: 'edwardian-overview', label: 'Edwardian Properties Overview' },
  { id: 'wiring-hazards', label: 'Edwardian Wiring Hazards' },
  { id: 'early-consumer-units', label: 'Early Consumer Units' },
  { id: 'rewire-standard', label: 'What a 2026 Rewire Must Include' },
  { id: 'renovation-considerations', label: 'Renovation Considerations' },
  { id: 'larger-rooms', label: 'Larger Rooms and Circuits' },
  { id: 'rewire-costs', label: 'Rewire Costs 2026' },
  { id: 'eicr-findings', label: 'Typical EICR Findings' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const answerBox = {
  question: 'Does an Edwardian house need rewiring?',
  answer:
    'Most Edwardian houses (built 1901–1910) with original or early wiring need a full rewire. The rubber (VIR) insulation is now well over a century old and brittle, and original installations usually lack a protective earth and the RCD protection BS 7671 requires on socket-outlet circuits. A full Edwardian rewire typically costs £4,500 to £9,500, more for large detached properties. Always confirm condition with an EICR first.',
};

const keyTakeaways = [
  'Edwardian properties (1901–1910) were built during the early years of domestic electricity supply. Wiring installed in this era used rubber insulation that is now over 115 years old — well beyond any safe service life.',
  'Edwardian houses are typically larger than Victorian terraces, with more generous room sizes and higher ceilings. This means more circuits, more cable runs, and higher rewire costs than a comparably-sized Victorian property.',
  'Early Edwardian consumer units often used rewirable fuses in wooden or Bakelite enclosures. These cannot accept modern RCD protection and present a fire risk if the fuse wire has been incorrectly replaced.',
  'Edwardian properties frequently have elaborate plasterwork — deep cornice, ceiling roses, and decorative dados — which must be carefully preserved during any rewiring work.',
  'A full rewire typically costs £4,500 to £7,500 for a 3-bed terrace and £6,000 to £9,500 for a 4-bed semi-detached, rising to £14,000 or more for a large detached Edwardian house.',
];

const faqs = [
  {
    question: 'What years does the Edwardian period cover for electrical purposes?',
    answer:
      'The Edwardian era spans 1901 to 1910. For electrical purposes, properties built between 1901 and approximately 1920 share very similar characteristics — all predate the standardised ring final circuit and modern earthing arrangements. Wiring from this entire period uses rubber insulation that is now over a century old.',
  },
  {
    question: 'How is Edwardian wiring different from Victorian wiring?',
    answer:
      'The wiring types are broadly similar — rubber-insulated cables, lead-sheathed cables, and in some cases early knob-and-tube systems. The key difference is that Edwardian houses tend to be larger, with more room to rewire, better ceiling void access between floors, and often a purpose-built cellar or basement that provides cable access. Edwardian properties also more commonly had electricity installed from new rather than converted from gas, so the original installation may be slightly more coherent — though no less hazardous after a century of use.',
  },
  {
    question: 'Is there asbestos in Edwardian house wiring?',
    answer:
      'Asbestos was used as an electrical insulation material in some early 20th century installations, particularly in consumer units, switchgear, and around cables in high-temperature locations such as near boilers. If your Edwardian property has not been surveyed for asbestos, commission a survey before any electrical work begins. Disturbing asbestos-containing materials without proper precautions is illegal and extremely hazardous to health. An asbestos survey typically costs £200 to £500.',
  },
  {
    question: 'Can I add sockets to an Edwardian house without a full rewire?',
    answer:
      'Adding sockets to an Edwardian house without rewiring the existing circuits is possible in principle but problematic in practice. Any new circuit must be properly earthed, and BS 7671 Regulation 411.3.3 requires RCD protection for socket-outlets rated up to 32 A — the exception that allows it to be omitted is worded "other than for a dwelling", so it is not available in a home. Connecting new circuits to an original consumer unit with rewirable fuses is not acceptable. Typically the practical solution is to install a new consumer unit and run new circuits for the areas requiring additional sockets, leaving the existing wiring in place temporarily until a full rewire is carried out.',
  },
  {
    question: 'Will an Edwardian house fail an EICR?',
    answer:
      'An unmodernised Edwardian house will almost certainly receive an Unsatisfactory EICR outcome. The most common C1 and C2 observations in Edwardian properties include absence of earth conductors, deteriorated rubber insulation, inadequate overcurrent protection, absence of RCD protection on socket-outlet circuits, and inadequate earthing and bonding arrangements. The EICR will specify what remedial work is required and how urgent it is.',
  },
  {
    question: 'How long does a rewire of an Edwardian house take?',
    answer:
      'An Edwardian semi-detached house typically takes 7 to 12 working days to rewire. Detached Edwardian properties with more rooms and larger floor areas may take 2 to 3 weeks. Solid brick external walls (Edwardian construction is overwhelmingly solid masonry) add time compared to modern properties. The property is usually habitable during the rewire, with power isolated to the area being worked on.',
  },
  {
    question: 'Do I need building regulations approval for rewiring an Edwardian house?',
    answer:
      'Yes. Electrical work in dwellings in England and Wales is notifiable work under Part P of the Building Regulations. An electrician registered with a government-approved competent person scheme (such as NICEIC or NAPIT) can self-certify their work without a separate building control application. If the electrician is not scheme-registered, you must submit a building notice to the local authority before work begins. Always ask your electrician to confirm how Building Regulations notification will be handled.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/victorian-house-rewire',
    title: 'Victorian House Rewire Guide',
    description:
      'Detailed guide to rewiring Victorian properties — rubber wiring, knob-and-tube, solid walls, and costs.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/period-property-electrical',
    title: 'Period Property Electrical Guide',
    description:
      'General guide covering all pre-1966 properties — survey checklist and EICR importance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/listed-building-electrical',
    title: 'Listed Building Electrical Guide',
    description:
      'Rewiring Grade I and II listed Edwardian properties — consent, conservation, and sympathetic installation.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
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
// Table data
// -------------------------------------------------------------------

const rewireRequirements = [
  {
    item: 'RCD protection on socket-outlets',
    detail:
      'Required for socket-outlets with a rated current not exceeding 32 A. The exception that permits omission on the strength of a documented risk assessment is worded "other than for a dwelling", so it cannot be used in a house.',
    reg: '411.3.3',
  },
  {
    item: 'Consumer unit enclosure',
    detail:
      'In domestic premises, consumer units and similar switchgear assemblies must comply with BS EN 61439-3 and either have a non-combustible enclosure, or sit inside a non-combustible cabinet complying with Regulation 132.12.',
    reg: '421.1.201',
  },
  {
    item: 'Surge protection (SPD)',
    detail:
      'Required where a transient overvoltage could cause serious injury or loss of life, or significant financial or data loss. In all other cases an SPD must still be provided unless the owner declares it is not required and accepts the risk of damage and consequential loss.',
    reg: '443.4.1',
  },
  {
    item: 'Arc fault detection (AFDD)',
    detail:
      'A requirement on single-phase socket-outlet final circuits up to 32 A in high rise residential buildings, houses in multiple occupation, purpose-built student accommodation and care homes. For an ordinary house AFDDs are recommended, not required.',
    reg: '421.1.7',
  },
  {
    item: 'Main protective bonding',
    detail:
      'Protective equipotential bonding to incoming metallic services such as gas and water. This is the single most common omission found in period properties.',
    reg: '411.3.1.2',
  },
];

const costRows = [
  {
    type: '3-bed Edwardian terrace',
    cost: '£4,500 – £7,500',
    note: 'Solid masonry walls and larger rooms add time. London typically 20–30% higher.',
  },
  {
    type: '4-bed Edwardian semi-detached',
    cost: '£6,000 – £9,500',
    note: 'Common configuration. Detached equivalents add 10–15% for external wall routes.',
  },
  {
    type: '5–6 bed Edwardian detached',
    cost: '£8,500 – £14,000+',
    note: 'Multiple reception rooms, original features and full-height basements at upper end.',
  },
  {
    type: 'Making good (plastering)',
    cost: '£800 – £2,500',
    note: 'In addition to electrical cost; depends on chasing extent and lime vs modern finish.',
  },
];

const eicrFindings = [
  {
    code: 'C2',
    colour: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
    title: 'Deteriorated insulation',
    body: 'Rubber or VIR cable insulation has degraded to the point where it poses a potential risk. The inspector notes specific locations where deterioration is observed.',
    reg: null,
  },
  {
    code: 'C2',
    colour: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
    title: 'Absence of RCD protection',
    body: 'No RCD protection on socket-outlet circuits rated up to 32 A, contrary to Regulation 411.3.3. Almost universal in Edwardian properties with original or early-replacement consumer units.',
    reg: '411.3.3',
  },
  {
    code: 'C2',
    colour: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
    title: 'No protective earth',
    body: 'Earth conductors absent from some or all circuits. Particularly common in original lighting circuits installed before protective earthing was standardised.',
    reg: null,
  },
  {
    code: 'C2',
    colour: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
    title: 'Inadequate main protective bonding',
    body: 'Bonding to incoming gas and water services absent or corroded, contrary to Regulation 411.3.1.2. Frequently found on Edwardian properties with original lead or early copper pipework.',
    reg: '411.3.1.2',
  },
  {
    code: 'C3',
    colour: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    title: 'Insufficient socket outlets',
    body: 'Accessible socket-outlets so few that extension leads and adaptors are clearly necessary. A C3 is advisory and does not affect the overall assessment, but inadequate sockets increase the risk of overloaded extension leads.',
    reg: null,
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'edwardian-overview',
    heading: 'Edwardian Properties and Domestic Electricity',
    content: (
      <>
        <p>
          The Edwardian era (1901–1910) coincided with the rapid expansion of domestic electricity
          supply across UK towns and cities. Many Edwardian properties were built with electricity
          from new, making them among the first generation of homes designed around electric
          lighting rather than gas. The wiring systems installed during this period were, however,
          primitive by modern standards — and those that survive unreplaced today are over 115 years
          old.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong className={leadCn}>Property characteristics</strong>
              Edwardian houses are typically larger than their Victorian counterparts, with more
              generous room proportions, higher ceilings (often 2.7m to 3.0m on the ground floor),
              bay windows, and larger gardens. Semi-detached and detached forms are more common than
              in the Victorian era, though terraced Edwardian housing is also widespread in urban
              areas.
            </li>
            <li>
              <strong className={leadCn}>Original electrical specification</strong>
              Most Edwardian properties were originally wired for lighting only, with power circuits
              added later. The lighting circuits used single-pole switches (no neutral at the switch)
              and round-pin lampholder fittings. Power circuits, if installed at all, used 5A or 15A
              round-pin sockets. Many properties had their power circuits added during the 1920s to
              1950s.
            </li>
            <li>
              <strong className={leadCn}>Renovation activity</strong>
              Edwardian properties are popular renovation targets due to their size and period
              character. Many have therefore had partial electrical work carried out at various
              points, creating a mixture of old and new wiring within a single installation.
              Mixed-age installations can be more difficult to assess than entirely original ones.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-hazards',
    heading: 'Edwardian-Era Wiring Hazards',
    content: (
      <>
        <p>
          The wiring hazards present in Edwardian properties are broadly similar to those in
          Victorian properties, but with some specific characteristics reflecting the slightly later
          construction date and the rapid development of electrical technology during the early 20th
          century.
        </p>
        <div className="-mx-4 my-4 rounded-none border-y border-red-500/25 bg-red-500/[0.07] p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <ul className={listCn}>
            <li>
              <strong className={leadCn}>Vulcanised India Rubber (VIR) insulation</strong>
              The most common cable type in Edwardian properties. VIR insulation becomes brittle and
              cracks with age, particularly where cables pass over hot water pipes, are exposed to
              direct sunlight in roof spaces, or have been subjected to vibration. Cracked insulation
              allows conductors to contact each other or earthed metalwork, creating a risk of shock,
              fire, or both.
            </li>
            <li>
              <strong className={leadCn}>Absence of earthing</strong>
              Edwardian wiring systems often have no protective earth conductor, or earthing that is
              provided via the metal conduit rather than a dedicated conductor. Conduit earthing is
              only reliable if all conduit joints are mechanically sound and electrically continuous
              — after a century of use, this cannot be assumed. A missing or inadequate protective
              conductor is typically recorded as a C1 or C2 observation on an EICR.
            </li>
            <li>
              <strong className={leadCn}>DIY additions</strong>
              Decades of DIY electrical work by successive owners are a common hazard in Edwardian
              properties. Additions made without professional oversight may include incorrect cable
              types, inadequate connections, missing earth conductors, and circuits connected to an
              already overloaded installation. These additions are often only found during an EICR
              when fittings are opened and inspected.
            </li>
            <li>
              <strong className={leadCn}>Inadequate bonding</strong>
              Edwardian properties with original pipework (lead or early copper water pipes)
              frequently lack the main protective bonding required by BS 7671 Regulation 411.3.1.2.
              Bonding clamps on gas and water services are often absent or corroded. This is a common
              C2 finding on Edwardian property EICRs.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'early-consumer-units',
    heading: 'Early Consumer Units in Edwardian Properties',
    content: (
      <>
        <p>
          Edwardian properties that have had some electrical updating typically have a consumer unit
          installed between the 1940s and 1970s. Earlier properties may still have original
          switchboards with rewirable fuses in wooden or Bakelite enclosures. Neither is acceptable
          under modern standards.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong className={leadCn}>Wooden switchboards</strong>
              The very earliest Edwardian consumer units were wooden boards with ceramic fuse holders
              and knife switches. Wood is combustible and offers no protection against arcing. These
              installations are immediately dangerous if still in use and should be replaced without
              delay.
            </li>
            <li>
              <strong className={leadCn}>Bakelite consumer units</strong>
              Bakelite (an early thermosetting plastic) was used for consumer unit enclosures from
              the 1920s through to the 1960s. Bakelite is brittle and combustible under sustained
              arcing conditions. Within domestic premises, BS 7671 Regulation 421.1.201 requires
              consumer units and similar switchgear assemblies to comply with BS EN 61439-3 and
              either have an enclosure manufactured from non-combustible material, or be enclosed in
              a non-combustible cabinet complying with Regulation 132.12. A steel consumer unit is
              the usual way of meeting this.
            </li>
            <li>
              <strong className={leadCn}>Rewirable fuses</strong>
              Fuse boards with rewirable fuse wire provide no RCD protection and are prone to
              incorrect reinstatement after operation. If the fuse wire has been replaced with a
              thicker wire or another conductor, the circuit is left without effective overcurrent
              protection. On an EICR the coding follows what is actually found: the absence of RCD
              protection on socket-outlet circuits is normally a C2, and an incorrectly sized or
              substituted fuse element is a defect in its own right.
            </li>
          </ul>
        </div>
        <p>
          Replacing a consumer unit in an Edwardian property typically costs £450 to £950 including
          materials and labour. This provides modern RCD protection and MCB-based overcurrent
          protection but does not address the condition of the existing wiring. Where the wiring is
          original or of unknown age, the electrician must confirm it is fit to be reconnected before
          it is put on a new board.
        </p>
      </>
    ),
  },
  {
    id: 'rewire-standard',
    heading: 'What a 2026 Rewire Must Include',
    content: (
      <>
        <p>
          A rewire is new work, so it is designed to the current standard —{' '}
          <strong>BS 7671:2018+A4:2026</strong>. These are the requirements that most often surprise
          owners of period properties, because none of them existed when the house was wired.
        </p>
        <div className="-mx-4 my-4 overflow-x-auto border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white">
                  Requirement
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white">
                  What BS 7671 says
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white">
                  Reg
                </th>
              </tr>
            </thead>
            <tbody>
              {rewireRequirements.map((r, i) => (
                <tr
                  key={r.reg}
                  className={`border-t border-white/10 align-top ${i % 2 ? 'bg-white/[0.02]' : ''}`}
                >
                  <td className="px-4 py-3 text-sm font-semibold text-white">{r.item}</td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-white">{r.detail}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-elec-yellow">
                    {r.reg}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white">
          Rewiring does not oblige you to bring unaltered parts of the property up to the new
          standard, but every circuit that forms part of the new installation is certified against
          it. Ask for an Electrical Installation Certificate on completion, not a Minor Works
          Certificate.
        </p>
      </>
    ),
  },
  {
    id: 'renovation-considerations',
    heading: 'Renovation Considerations for Edwardian Properties',
    content: (
      <>
        <p>
          Edwardian properties are frequently purchased for renovation. A full renovation —
          including new kitchen, bathrooms, and redecoration — provides the ideal opportunity to
          rewire the property at minimum additional disruption, since walls and floors will be open
          and decorated surfaces will be replaced regardless.
        </p>
        <div className="-mx-4 my-4 rounded-none border-y border-blue-500/25 bg-blue-500/[0.08] p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <ul className={listCn}>
            <li>
              <strong className={leadCn}>First fix before plastering</strong>
              In a full renovation, the electrical first fix (consumer unit position, cable routes,
              back boxes) is completed before plastering. This is the most cost-effective time to
              upgrade the electrical installation, as no existing decoration or plasterwork needs to
              be disturbed.
            </li>
            <li>
              <strong className={leadCn}>Plan the socket layout</strong>
              Edwardian properties were designed when appliances were few. A modern renovation should
              include sufficient double sockets in every room (a common specification is 6 to 8 in a
              kitchen, 4 to 6 in a living room, 4 in each bedroom), plus dedicated circuits for the
              oven, hob, shower, and any EV charger. Planning the layout at first fix avoids
              expensive additions later.
            </li>
            <li>
              <strong className={leadCn}>Data and AV infrastructure</strong>
              Edwardian properties being renovated for modern living increasingly include Cat 6 data
              cabling, CCTV, and home automation. These are most economically installed during a
              rewire when floors and walls are already open. Make sure the electrician&apos;s scope
              includes data infrastructure if you need it.
            </li>
            <li>
              <strong className={leadCn}>EV charging and renewables</strong>
              The consumer unit specified for an Edwardian renovation should include spare ways for
              future EV charging circuits, a solar PV feed, and battery storage. A larger board
              (24-way rather than 18-way) costs marginally more and saves a second board or a
              rework later.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'larger-rooms',
    heading: 'Larger Rooms and Circuit Requirements',
    content: (
      <>
        <p>
          Edwardian properties tend to have larger room dimensions than Victorian equivalents. A
          typical Edwardian reception room may be 4.5m × 5m or larger, compared to 3.5m × 4m in a
          Victorian terrace. This has practical implications for the number of sockets and lighting
          points required on each circuit.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong className={leadCn}>Lighting circuits</strong>
              Larger rooms with high ceilings need more lighting points. Edwardian properties often
              have an elaborate ceiling rose at the centre of each room plus supplementary wall
              lighting positions. A ground-floor reception room commonly ends up with 4 to 6
              separately switched lighting groups, all fed from the floor&apos;s lighting circuit
              rather than from circuits of their own.
            </li>
            <li>
              <strong className={leadCn}>Ring final circuits</strong>
              Appendix 15 of BS 7671, which illustrates Regulation 433.1.204, advises taking account
              of the total floor area served by a ring final circuit and notes that{' '}
              <em>historically a limit of 100 m² has been adopted</em>. It is guidance, not a
              numerical limit in the regulation itself. Large Edwardian houses can approach or exceed
              that area on a single floor, so a second ring per floor is often added to share the
              load.
            </li>
            <li>
              <strong className={leadCn}>Kitchen circuits</strong>
              The same appendix advises connecting cookers, ovens and hobs with a rated power
              exceeding 2 kW on their own dedicated radial circuit rather than the ring, and not
              supplying immersion heaters or comprehensive electric space heating from a ring. A
              large Edwardian kitchen therefore typically needs a dedicated oven circuit, a dedicated
              hob circuit, separate supplies for the dishwasher and washing machine or dryer, and a
              ring final circuit for the worktop sockets.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rewire-costs',
    heading: 'Rewire Costs for Edwardian Houses (2026)',
    content: (
      <>
        <p>
          Edwardian house rewire costs are typically 10 to 20 per cent higher than equivalent
          Victorian properties, reflecting the larger room sizes and greater cable lengths involved.
          The following are typical costs for a full rewire including consumer unit, all circuits,
          sockets, switches, and lighting points.
        </p>
        <div className="-mx-4 my-4 overflow-x-auto border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white">
                  Property type
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white">
                  Typical cost
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {costRows.map((row, i) => (
                <tr
                  key={row.type}
                  className={`border-t border-white/10 align-top ${i % 2 ? 'bg-white/[0.02]' : ''}`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-white">{row.type}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-elec-yellow">
                    {row.cost}
                  </td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-white">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white">
          Figures are indicative 2026 market guidance, not a quote. Always obtain a written, itemised
          quote specifying the number of circuits, sockets, lighting points, and the consumer unit
          specification. Vague quotes make it difficult to compare between electricians and lead to
          disputes over scope during the job.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-findings',
    heading: 'Typical EICR Findings in Edwardian Properties',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICR</SEOInternalLink>{' '}
          on an Edwardian property will typically produce a range of observations. The following are
          the most commonly encountered findings in unmodernised or partially modernised Edwardian
          installations.
        </p>
        <div className="my-4 space-y-3">
          {eicrFindings.map((f, i) => (
            <div
              key={i}
              className="-mx-4 flex items-start gap-4 rounded-none border-y border-white/10 bg-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5"
            >
              <span
                className={`shrink-0 rounded-lg border px-2.5 py-1 text-sm font-bold ${f.colour}`}
              >
                {f.code}
              </span>
              <div>
                <h4 className="font-bold text-white">
                  {f.title}
                  {f.reg && (
                    <span className="ml-2 rounded border border-white/20 px-1.5 py-0.5 text-[11px] font-medium text-white">
                      Reg {f.reg}
                    </span>
                  )}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-white">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-white">
          The codes come from the model Electrical Installation Condition Report in Appendix 6 of BS
          7671: C1 (danger present, immediate remedial action necessary), C2 (potentially dangerous,
          urgent remedial action necessary), C3 (improvement recommended) and FI (further
          investigation advised). C1 and C2 affect the overall assessment of the report; C3 and FI do
          not. See our{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR observation codes guide
          </SEOInternalLink>{' '}
          for a full breakdown.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Edwardian House Rewire Work',
    content: (
      <>
        <p>
          Edwardian house rewires are high-value, multi-day jobs that require careful planning and
          good client communication. The combination of aged wiring, period features, and often
          partially modernised installations means that thorough pre-work assessment is essential to
          avoid mid-job scope changes.
        </p>
        <div className="my-4 space-y-4">
          <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
            <h4 className="mb-1 font-bold text-white">Document everything before you start</h4>
            <p className="text-sm leading-relaxed text-white">
              Carry out a full inspection before the rewire begins. Photographing original
              switchboards, cable conditions, and earth arrangements protects you and gives the
              client a clear record of the original state of the installation.
            </p>
            <Link to="/tools/eicr-certificate" className={`${btnCn} mt-4`}>
              Open the EICR app
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
            <h4 className="mb-1 font-bold text-white">Quote at the survey, not a week later</h4>
            <p className="text-sm leading-relaxed text-white">
              A quote that specifies circuit numbers, socket counts, and consumer unit specification
              demonstrates expertise and wins trust with renovation clients — and it settles the
              scope before the first floorboard comes up.
            </p>
            <Link to="/electrical-quoting-app" className={`${btnCn} mt-4`}>
              Open the quoting app
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <SEOAppBridge
          title="Manage Edwardian house rewires with Elec-Mate"
          description="Join 1,600+ UK electricians using Elec-Mate for pre-rewire EICRs, professional quoting, and job management."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EdwardianHouseElectricalPage() {
  return (
    <GuideTemplate
      title="Rewiring an Edwardian House: Electrical Guide"
      description="Electrical guide for Edwardian houses built 1901–1910: VIR cable hazards, early consumer units, and rewire costs of £4,500 to £9,500."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Property Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Edwardian House Electrical Guide:{' '}
          <span className="text-elec-yellow">Rewiring 1901–1910 Properties</span>
        </>
      }
      heroSubtitle="Edwardian houses built between 1901 and 1910 contain some of the UK's oldest surviving electrical installations. This guide covers the specific wiring hazards, early consumer units, what BS 7671:2018+A4:2026 requires of a rewire, and what to expect at renovation — including rewire costs of £4,500 to £9,500."
      readingTime={12}
      answerBox={answerBox}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Edwardian House Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Edwardian Property EICRs on Your Phone"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
