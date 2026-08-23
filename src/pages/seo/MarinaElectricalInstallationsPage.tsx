import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Anchor,
  Zap,
  ShieldCheck,
  Search,
  Calculator,
  GraduationCap,
  FileCheck2,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared layout classes — edge-to-edge on phones, inset from sm: up
// -------------------------------------------------------------------

// The article column is px-5 on phones (SEOPageShell), so -mx-5 is a true full
// bleed on mobile; from sm: up the cards inset and round as normal.
const tableWrap =
  '-mx-5 my-5 overflow-x-auto rounded-none border-y border-white/10 bg-white/[0.04] ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x';

const cardWrap =
  '-mx-5 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const th = 'px-4 py-3 font-semibold whitespace-nowrap';
const td = 'px-4 py-3 align-top';
const tdReg = 'px-4 py-3 align-top font-mono text-elec-yellow whitespace-nowrap';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Marina Installations', href: '/guides/marina-electrical-installations' },
];

const tocItems = [
  { id: 'overview', label: 'Scope and Headline Figures' },
  { id: 'bs7671-section-709', label: 'BS 7671 Section 709 Requirements' },
  { id: 'earthing-arrangements', label: 'Earthing Arrangements for Marinas' },
  { id: 'shore-supply', label: 'Shore Supply and Distribution' },
  { id: 'ip-ratings', label: 'IP Ratings and Environmental Protection' },
  { id: 'rcd-requirements', label: 'RCD Requirements' },
  { id: 'cable-management', label: 'Cable Management and Routing' },
  { id: 'inspection-testing', label: 'Inspection and Testing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 does apply to marinas — Section 709 covers circuits supplying pleasure craft and houseboats. It does not apply to electrical equipment on board ships (Reg 110.2(d)) or to the internal installation of a pleasure craft (Reg 709.1).',
  'The ESQCR prohibit connecting a PME earthing facility to any metalwork in a boat, and Reg 709.553.1.14 forbids connecting socket-outlet protective conductors to a PME earth. In practice the berth supply is TT with a local electrode, a DNO TN-S supply, or an isolating transformer.',
  'Every socket-outlet must be protected individually by an RCD to Reg 415.1.1 (rated residual operating current not exceeding 30 mA), and the device must disconnect all live conductors including the neutral (Reg 709.531.2).',
  'Every socket-outlet must meet at least IP44, rising to IPX5 (AD5, water jets) or IPX6 (AD6, water waves) — Reg 709.553.1.8. Other equipment on or above a jetty, wharf, pier or pontoon needs at least IP3X (Reg 709.512.2.1.2), plus AF2 corrosion resistance (AF3 where hydrocarbons are present) and protection against AG2 impact.',
  'Elec-Mate helps electricians complete certificates for special installations, with AI assistance for the specific BS 7671 Section 709 requirements.',
];

const faqs = [
  {
    question: 'Does BS 7671 apply to marinas?',
    answer:
      'Yes. Marinas and similar locations are covered by Section 709 of BS 7671:2018+A4:2026, which sits in Part 7 (special installations and locations). What BS 7671 does not apply to is electrical equipment on board ships — that exclusion is Regulation 110.2(d), and offshore installations are excluded by Regulation 110.2(e). Section 709 itself is also limited: Regulation 709.1 states that the particular requirements apply only to circuits intended to supply pleasure craft or houseboats in marinas and similar locations. They do not apply to the internal electrical installation of a pleasure craft (for those, see BS EN 60092-507), and they do not apply to houseboats supplied directly from the public network. So a quiz answer of "marinas" for what BS 7671 excludes is wrong; the correct exclusion is electrical equipment on board ships.',
  },
  {
    question: 'What section of BS 7671 covers marina installations?',
    answer:
      'Section 709 of BS 7671:2018+A4:2026 covers marinas and similar locations. It applies to circuits intended to supply pleasure craft or houseboats. Under Section 700, the particular requirements of each Part 7 section supplement or modify the general requirements contained in the other parts of BS 7671 — they do not replace them, and where a part, chapter, section or regulation is not expressly excluded, the corresponding general regulation still applies. Key socket-outlet rules are in Regulation 709.553.1.8 (BS EN IEC 60309-2 for sockets up to 63 A; BS EN IEC 60309-1 above 63 A — industrial CEE sockets, not domestic 13 A sockets) and Regulation 709.553.1.11 (one socket-outlet shall supply only one pleasure craft or houseboat). Section 709 is based on the harmonisation document HD 60364-7-709:2009 (2019).',
  },
  {
    question: 'Why can you not use PME earthing at a marina?',
    answer:
      'Regulation 709.411.4 records that the Electricity Safety, Quality and Continuity Regulations (ESQCR) prohibit the connection of a PME earthing facility to any metalwork in a boat, and Regulation 709.553.1.14 requires that socket-outlet protective conductors shall not be connected to a PME earthing facility. The reason is safety: in a PME system the combined neutral and earth (PEN) conductor carries the neutral return current and provides the earth reference. If the PEN conductor develops a high-resistance fault or breaks (a "lost neutral"), bonded metalwork — including the hull of a metal-hulled boat — can rise towards supply voltage. In a water environment that creates an extreme electric shock and drowning risk. Note what 709.411.4 does not say: it does not preclude the use of a PME earthing facility as the means of earthing for other purposes, such as the installations of permanent buildings. So the marina office, workshop and chandlery may stay on PME; the berth supply must not. In practice the berth supply is derived from a TT arrangement with a local earth electrode, from a DNO TN-S supply where one is available, or through an on-shore isolating transformer.',
  },
  {
    question: 'What type of socket outlets are required at a marina?',
    answer:
      'Regulation 709.553.1.8 sets the socket-outlet type. Socket-outlets rated up to 63 A must comply with BS EN IEC 60309-2 — the industrial CEE-type sockets, typically 16 A for smaller craft or 32 A for larger vessels. Socket-outlets rated above 63 A must comply with BS EN IEC 60309-1. Standard 13 A BS 1363 domestic sockets are not suitable for boat supplies. Regulation 709.553.1.12 adds that, in general, single-phase socket-outlets with a rated voltage of 200 V to 250 V and a rated current of 16 A shall be provided, with higher current ratings where greater demands are envisaged. Regulation 709.553.1.11 requires that one socket-outlet shall supply only one pleasure craft or houseboat, and Regulation 709.553.1.10 limits an enclosure to a maximum of four socket-outlets grouped together. Every socket-outlet must be protected individually by an RCD to Regulation 415.1.1 (Reg 709.531.2) and by an individual overcurrent protective device to Chapter 43 (Reg 709.533). Every socket-outlet must also meet at least IP44, provided by the socket itself or by an enclosure; where the codes AD5 or AD6 apply the degree of protection rises to at least IPX5 or IPX6 respectively.',
  },
  {
    question: 'How high must marina socket outlets be mounted?',
    answer:
      'Regulation 709.553.1.13 requires socket-outlets to be placed at a height of not less than 1 m above the highest water level. In the case of floating pontoons or walkways only, that height may be reduced to 300 mm above the highest water level, provided appropriate additional measures are taken to protect against the effects of splashing. Regulation 709.553.1.9 adds that every socket-outlet shall be located as close as practicable to the berth it supplies, and shall be installed in the distribution board or in separate enclosures — the point being to keep connection cords short. Where distribution cables run underground, Regulation 709.521.1.7 requires sufficient burial depth to avoid damage, and its note gives 0.5 m as the depth generally considered a minimum. Overhead conductors must all be insulated and, under Regulation 709.521.1.8, be at least 6 m above ground in any area subject to vehicle movement and 3.5 m elsewhere.',
  },
  {
    question: 'How often should a marina electrical installation be inspected?',
    answer:
      'BS 7671 does not set a fixed interval. Regulation 652.1 requires the frequency of periodic inspection and testing to be determined having regard to the type of installation and equipment, its use and operation, the frequency and quality of maintenance, and the external influences to which it may be subjected, taking account of the results and recommendations of previous certificates and condition reports. Industry practice for marinas, reflecting salt water, moisture, UV and mechanical wear, is a maximum period of one year between periodic inspections — far shorter than the typical domestic interval. Most operators combine an annual EICR of the fixed installation (supply pillars, distribution boards, cabling) with more frequent visual checks of supply cables and connections during the busy season. The inspection should be carried out by an electrician competent in Section 709 work, with observations on the EICR referencing Section 709 regulations where applicable.',
  },
  {
    question: 'What cable types are suitable for marina installations?',
    answer:
      'Regulation 709.521.1.4 lists the wiring systems suitable for distribution circuits of marinas: underground cables; overhead cables or overhead insulated conductors; cables with copper conductors and thermoplastic or elastomeric insulation and sheath installed within an appropriate cable management system that takes account of movement, impact, corrosion and ambient temperature; mineral insulated cables having an outer covering to BS EN 60702-1; cables with armouring and serving of thermoplastic or elastomeric material (which covers SWA); and other cables no less suitable than those listed. Regulation 709.521.1.5 then bans four wiring systems on or above a jetty, wharf, pier or pontoon: cables in free air suspended from or incorporating a support wire (for example installation methods 35 and 36 in Table 4A2); non-sheathed cables in cable management systems; cables with aluminium conductors; and mineral insulated cables. Note the trap — mineral insulated cable is permitted for marina distribution circuits but not on or above the pontoon itself. For the flexible tail from the pillar to the boat, H07RN-F heavy-duty rubber-sheathed flexible cable is the usual choice. Regulation 709.521.1.6 requires cables to be selected and installed so that mechanical damage from tidal and other movement of floating structures is prevented, and cable management systems to be installed to allow water to drain, by drainage holes and/or by installing the equipment on an incline.',
  },
  {
    question: 'What is electric shock drowning and how is it prevented?',
    answer:
      'Electric shock drowning (ESD) occurs when a person in the water experiences electric shock from stray electrical current in the water. Even a small current can cause muscle paralysis in a swimmer, preventing them from staying afloat and leading to drowning. ESD has been documented in marinas and in freshwater as well as salt water. Prevention relies on several measures working together: keeping a PME earth away from the boat supply, individual 30 mA RCD protection on every socket-outlet, regular inspection and testing of the marina installation, shore power cables kept in good condition, galvanic isolators or isolation transformers where dissimilar-metal corrosion is a concern, and clear signage discouraging swimming near boats connected to shore power. Regulation 709.553.1.10 refers to Figure 709.3, an example instruction notice to be placed adjacent to each group of socket-outlets, and the standard recommends that the marina operator gives every craft operator an up-to-date copy. If someone in the water appears to be in distress near a boat or pontoon with electrical connections, do not enter the water — disconnect the electrical supply first, then use a throw line or flotation device.',
  },
  {
    question:
      'When are isolation transformers used and what does Regulation 709.313.1.101 require?',
    answer:
      'A fixed on-shore isolation transformer may be installed to prevent galvanic currents circulating between the hull of the vessel and metallic parts on the shore side. This is particularly relevant for metal-hulled boats where dissimilar metal corrosion is a concern. Regulation 709.313.1.101 sets out two requirements. First, equipment conforming to BS EN 61558-2-4 shall be used. Second, the protective conductor (PE) of the supply to the isolating transformer shall not be connected to the earth terminal in the socket-outlet supplying the vessel. Connecting the supply PE to the vessel socket earth would defeat the isolation by creating a path through the earth conductor. At commissioning, a continuity check between the supply PE and the vessel socket earth terminal should therefore confirm an open circuit; any low-resistance reading indicates an incorrect connection that must be rectified before the installation is energised. BS 7671 illustrates the arrangements in Figures A709.2.2, A709.3.2 and A709.4.',
  },
  {
    question: 'Do I need special qualifications to work on marina installations?',
    answer:
      'There is no separate qualification for marina electrical work, but the electrician must be competent to work on Section 709 installations. In practice that means holding the standard qualifications — the BS 7671 wiring regulations qualification (C&G 2382) and inspection and testing (C&G 2391) — being registered with a competent person scheme such as NICEIC or NAPIT, having specific knowledge of the Section 709 requirements, and ideally having experience of marine electrical environments. Some training providers offer short courses on marina and boat electrical installations, and the IET publishes guidance on special installations. Because marina work is a special installation, the electrician must understand the earthing restrictions, the external-influence classifications, the IP requirements and the individual RCD rules — getting these wrong can have fatal consequences.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/earthing-systems-tns-tncs-tt-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-S, TN-C-S and TT earthing — and why a PME earth must not reach a boat.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'RCD protection is critical in marinas — understand why RCDs trip and how to diagnose faults.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-fault-diagnosis',
    title: 'Earthing Fault Diagnosis',
    description:
      'How to find earth faults using insulation resistance testing and the half-split method.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 Wiring Regulations Guide',
    description:
      'Complete guide to BS 7671:2018+A4:2026, including Part 7 special installations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates with AI board scanning — including special installation sections.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/inspection-testing-course',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training covering special installations.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const headlineFigures = [
  {
    figure: '30 mA',
    label: 'Individual RCD on every socket-outlet, disconnecting the neutral',
    reg: '709.531.2',
  },
  { figure: 'IP44', label: 'Minimum for every socket-outlet', reg: '709.553.1.8' },
  {
    figure: '1 m',
    label: 'Socket height above highest water level (300 mm on floating pontoons)',
    reg: '709.553.1.13',
  },
  { figure: '1 boat', label: 'Per socket-outlet — no splitting', reg: '709.553.1.11' },
  { figure: '4 max', label: 'Socket-outlets grouped in one enclosure', reg: '709.553.1.10' },
  {
    figure: '230 / 400 V',
    label: 'Nominal supply voltage, single-phase / three-phase',
    reg: '709.313.1.2',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Does BS 7671 Apply to Marinas?',
    content: (
      <>
        <p>
          Yes. Marinas and similar locations are covered by <strong>Section 709</strong>, in Part 7
          of BS 7671. The exclusion people confuse it with is{' '}
          <strong>electrical equipment on board ships</strong>, which BS 7671 does not cover
          (Regulation 110.2(d)); offshore installations are excluded by Regulation 110.2(e).
        </p>
        <p>
          Section 709 is itself narrow. Regulation 709.1 states that its particular requirements
          apply only to circuits intended to supply pleasure craft or houseboats. They do not apply
          to the internal electrical installation of a pleasure craft — for those, see BS EN
          60092-507 — and they do not apply to houseboats supplied directly from the public network.
          Everything else on the site is ordinary BS 7671 work.
        </p>

        <h3 className="mt-8 mb-1 text-lg font-semibold tracking-tight text-white">
          The figures you came for
        </h3>
        <p className="text-white">
          The six numbers that decide most marina design and inspection questions.
        </p>
        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {headlineFigures.map((f) => (
            <div
              key={f.reg}
              className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4"
            >
              <div className="text-2xl font-bold text-elec-yellow">{f.figure}</div>
              <p className="mt-1 text-sm leading-relaxed text-white">{f.label}</p>
              <p className="mt-2 font-mono text-xs text-white">Reg {f.reg}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-8 mb-1 text-lg font-semibold tracking-tight text-white">
          Why marinas get their own section
        </h3>
        <p>
          Regulation 709.512.2 spells out what Section 709 is guarding against: corrosive elements,
          movement of structures, mechanical damage, the presence of flammable fuel, and an
          increased risk of electric shock caused by the presence of water, reduction in body
          resistance, and contact of the body with Earth potential. Three practical consequences
          follow.
        </p>
        <div className={cardWrap}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Water conducts, and a person in it is the better path.</strong> A fault that
              puts even a few volts into the water near a pontoon can incapacitate a swimmer. The
              risk is well documented in freshwater as well as salt water, and it is the reason the
              earthing restrictions in 709.411.4 and 709.553.1.14 exist.
            </li>
            <li>
              <strong>The environment attacks the equipment.</strong> Salt spray corrodes terminals
              and enclosures, UV degrades sheaths, pontoon movement stresses connections, and
              condensation forms inside enclosures as temperatures swing. Section 709 answers this
              with explicit external-influence classifications rather than leaving it to judgement.
            </li>
            <li>
              <strong>Everything moves.</strong> Regulation 709.521.1.6 requires cables to be
              selected and installed so that mechanical damage due to tidal and other movement of
              floating structures is prevented, and cable management systems to be installed so
              water can drain — by drainage holes and/or by mounting the equipment on an incline.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671-section-709',
    heading: 'BS 7671 Section 709: Reg-by-Reg',
    content: (
      <>
        <p>
          Section 709 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          applies to installations in marinas and similar locations for the supply to pleasure craft
          and houseboats. Use this as your on-site checklist.
        </p>
        <div className={tableWrap}>
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white">
                <th className={th}>Regulation</th>
                <th className={th}>Requirement</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.313.1.2</td>
                <td className={td}>
                  Nominal supply voltage for the supply to pleasure craft or houseboats shall be
                  230&nbsp;V AC single-phase or 400&nbsp;V AC three-phase.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.313.1.101</td>
                <td className={td}>
                  Where a fixed on-shore isolation transformer is used, equipment conforming to BS
                  EN 61558-2-4 shall be used, and the PE of the supply to the transformer shall not
                  be connected to the earth terminal in the socket-outlet supplying the vessel.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.410.3.5</td>
                <td className={td}>
                  Obstacles and placing out of reach (Section 417) shall not be used as protective
                  measures.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.410.3.6</td>
                <td className={td}>
                  Non-conducting location (Reg 418.1) and earth-free local equipotential bonding
                  (Reg 418.2) shall not be used.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.411.4</td>
                <td className={td}>
                  The ESQCR prohibit connection of a PME earthing facility to any metalwork in a
                  boat. This does not preclude PME as the means of earthing for other purposes, such
                  as permanent buildings on the site.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.512.2.1.1</td>
                <td className={td}>
                  Equipment on or above a jetty, wharf, pier or pontoon: IPX4 for water splashes
                  (AD4), IPX5 for water jets (AD5), IPX6 for water waves (AD6).
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.512.2.1.2</td>
                <td className={td}>
                  At least IP3X against the ingress of small objects (AE2).
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.512.2.1.3</td>
                <td className={td}>
                  Suitable for atmospheric corrosive or polluting substances (AF2); AF3 applies if
                  hydrocarbons are present.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.512.2.1.4</td>
                <td className={td}>
                  Protected against medium-severity impact (AG2), by position, by local or general
                  mechanical protection, or by equipment rated at least IK08 to BS EN 62262.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.521.1.7</td>
                <td className={td}>
                  Underground distribution cables buried deep enough to avoid damage unless given
                  additional mechanical protection; the note gives 0.5&nbsp;m as the depth generally
                  considered a minimum.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.521.1.8</td>
                <td className={td}>
                  All overhead conductors insulated; at least 6&nbsp;m above ground where vehicles
                  move and 3.5&nbsp;m elsewhere. Poles and supports located or protected against
                  foreseeable vehicle movement.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.531.2</td>
                <td className={td}>
                  Socket-outlets protected individually by an RCD to Reg 415.1.1, disconnecting all
                  live conductors including the neutral. The same applies to final circuits for
                  fixed connection to houseboats.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.533</td>
                <td className={td}>
                  Each socket-outlet protected by an individual overcurrent protective device to
                  Chapter 43; likewise each fixed connection supplying a houseboat.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.537.2.1.1</td>
                <td className={td}>
                  At least one means of isolation in each distribution cabinet, disconnecting all
                  live conductors including the neutral; one isolating switching device for a
                  maximum of four socket-outlets.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.553.1.8</td>
                <td className={td}>
                  Socket-outlets to BS EN IEC 60309-2 up to 63&nbsp;A and BS EN IEC 60309-1 above
                  63&nbsp;A; at least IP44, or IPX5/IPX6 where AD5/AD6 apply.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.553.1.9</td>
                <td className={td}>
                  Every socket-outlet located as close as practicable to the berth supplied, and
                  installed in the distribution board or in separate enclosures.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.553.1.10</td>
                <td className={td}>
                  A maximum of four socket-outlets grouped together in one enclosure, to avoid the
                  hazard of long connection cords.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.553.1.11</td>
                <td className={td}>
                  One socket-outlet shall supply only one pleasure craft or houseboat.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.553.1.12</td>
                <td className={td}>
                  In general, single-phase socket-outlets rated 200–250&nbsp;V, 16&nbsp;A shall be
                  provided; higher ratings where greater demands are envisaged.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.553.1.13</td>
                <td className={td}>
                  Socket-outlets at least 1&nbsp;m above the highest water level; on floating
                  pontoons or walkways only, this may reduce to 300&nbsp;mm with appropriate
                  additional splash protection.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdReg}>709.553.1.14</td>
                <td className={td}>
                  Socket-outlet protective conductors shall not be connected to a PME earthing
                  facility.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These requirements sit on top of the rest of BS 7671. Section 700 puts it plainly: the
          particular requirements of each Part 7 section supplement or modify the general
          requirements, and the absence of any reference excluding a part, chapter, section or
          regulation means the corresponding general regulation still applies.
        </p>
        <p>
          One A4:2026 housekeeping point worth knowing if you are working from an older copy:
          Figures 709.1 and 709.2 were deleted, and the connection arrangements are now shown in
          Figures A709.1 to A709.4.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-arrangements',
    heading: 'Earthing: Keeping a PME Earth Away From the Boat',
    content: (
      <>
        <p>
          The earthing arrangement is the most consequential decision in a marina design, and the
          rule is narrower than it is often described. BS 7671 does not say "TT is mandatory". It
          says, at Regulation 709.411.4, that the ESQCR prohibit the connection of a PME earthing
          facility to any metalwork in a boat — and at Regulation 709.553.1.14, that socket-outlet
          protective conductors shall not be connected to a PME earthing facility.
        </p>
        <p>
          The hazard behind those two regulations is the broken PEN conductor. In a PME (TN-C-S)
          system the DNO&apos;s combined neutral and earth conductor provides the earth reference. If
          it breaks, neutral current finds another route to earth — and at a marina that route runs
          through the water. That is what puts voltage into the water around the berths.
        </p>

        <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-white">
          Three compliant ways to supply a berth
        </h3>
        <div className={tableWrap}>
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white">
                <th className={th}>Arrangement</th>
                <th className={th}>How it satisfies 709.411.4 / 709.553.1.14</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-white/10">
                <td className={`${td} font-semibold whitespace-nowrap`}>
                  TT with a local electrode
                </td>
                <td className={td}>
                  The berth supply takes its earth reference from an electrode on site rather than
                  from the DNO PEN conductor. The most common solution, and the reason RCDs do the
                  fault-protection work.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${td} font-semibold whitespace-nowrap`}>DNO TN-S supply</td>
                <td className={td}>
                  Where the distributor provides a genuine TN-S supply with a separate protective
                  conductor, there is no PME earthing facility to connect to the boat.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${td} font-semibold whitespace-nowrap`}>Isolating transformer</td>
                <td className={td}>
                  A fixed on-shore transformer to BS EN 61558-2-4 (Reg 709.313.1.101). Its supply PE
                  must not be connected to the earth terminal in the socket-outlet supplying the
                  vessel.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The on-shore parts of the site — office, workshop, chandlery — may stay on the PME supply.
          Regulation 709.411.4 expressly says the prohibition does not preclude the use of a PME
          earthing facility as the means of earthing for other purposes, such as the installations
          of permanent buildings.
        </p>

        <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-white">
          Sizing the electrode on a TT berth supply
        </h3>
        <p>
          The earth electrode resistance must be measured and recorded. Regulation 411.5.3(b) gives
          the criterion for an RCD used for fault protection: R<sub>A</sub> × I<sub>Δn</sub> must
          not exceed 50&nbsp;V, where R<sub>A</sub> is the sum of the resistances of the earth
          electrode and the protective conductor connecting it to the exposed-conductive-parts. With
          a 30&nbsp;mA RCD that puts the arithmetic limit at about 1667&nbsp;Ω — a number no one
          should design to. Aim far lower so the reading stays stable through dry summers and
          corroding connections; Regulation 411.5.3 is also met where the earth fault loop impedance
          satisfies the maximum values in Table 41.5.
        </p>
      </>
    ),
  },
  {
    id: 'shore-supply',
    heading: 'Shore Supply and Distribution',
    content: (
      <>
        <p>
          The shore power system takes the incoming supply and distributes it to individual berths
          via supply pillars (also called feeder pillars or service pedestals) on the pontoons or
          jetty.
        </p>

        <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-white">
          Socket ratings and connector standards
        </h3>
        <p>
          Regulation 709.553.1.12 sets 16&nbsp;A single-phase at 200–250&nbsp;V as the general
          default, with higher ratings where greater demands are envisaged. Regulation 709.553.1.8
          fixes the connector standard by rating.
        </p>
        <div className={tableWrap}>
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white">
                <th className={th}>Rating</th>
                <th className={th}>Supply</th>
                <th className={th}>Connector standard</th>
                <th className={th}>Typical craft</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-white/10">
                <td className={`${td} font-mono whitespace-nowrap`}>16&nbsp;A</td>
                <td className={`${td} whitespace-nowrap`}>Single-phase</td>
                <td className={td}>BS EN IEC 60309-2</td>
                <td className={td}>
                  The default provision under 709.553.1.12; smaller yachts and motor cruisers
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${td} font-mono whitespace-nowrap`}>32&nbsp;A</td>
                <td className={`${td} whitespace-nowrap`}>Single-phase</td>
                <td className={td}>BS EN IEC 60309-2</td>
                <td className={td}>Larger vessels with higher demand</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${td} font-mono whitespace-nowrap`}>63&nbsp;A</td>
                <td className={`${td} whitespace-nowrap`}>Three-phase</td>
                <td className={td}>BS EN IEC 60309-2 (up to and including 63&nbsp;A)</td>
                <td className={td}>Large craft and superyachts</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${td} font-mono whitespace-nowrap`}>&gt;&nbsp;63&nbsp;A</td>
                <td className={`${td} whitespace-nowrap`}>Three-phase</td>
                <td className={td}>BS EN IEC 60309-1</td>
                <td className={td}>Superyachts and commercial vessels</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-white">
          Pillars and sub-mains
        </h3>
        <div className={cardWrap}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Supply pillars.</strong> A pillar carries CEE socket-outlets, an individual
              overcurrent device and RCD per socket, isolation, and a meter where required.
              Regulation 709.553.1.10 caps an enclosure at four socket-outlets, and 709.537.2.1.1
              allows one isolating switching device per four socket-outlets — so a four-way pillar
              is the natural unit. The pillar itself must satisfy the external-influence
              classifications in 709.512.2, which in practice means a corrosion-resistant body such
              as GRP or marine-grade stainless steel.
            </li>
            <li>
              <strong>Distribution boards and sub-mains.</strong> Each sub-main to a pillar needs
              overcurrent protection and isolation at the main board, and must be sized for the
              maximum demand of that pillar, allowing for{' '}
              <SEOInternalLink href="/tools/voltage-drop-calculator">voltage drop</SEOInternalLink>{' '}
              on what can be very long runs to the end of a pontoon.
            </li>
            <li>
              <strong>Positioning.</strong> Regulation 709.553.1.9 requires every socket-outlet to
              be as close as practicable to the berth it supplies. Long connection cords are exactly
              the hazard the section is trying to design out.
            </li>
          </ul>
        </div>
        <p>
          The flexible cable from pillar to boat is normally the owner&apos;s. H07RN-F with matching
          CEE plug and connector is the standard choice. Marina operators should inspect these
          visually and refuse damaged cables — a cracked sheath on a trailing lead undoes every
          other measure on this page.
        </p>
        <SEOAppBridge
          title="Design marina distribution with Elec-Mate calculators"
          description="Cable sizing, voltage drop, maximum demand, and prospective fault current — all the calculations you need for marina distribution design, on your phone."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings and External Influences',
    content: (
      <>
        <p>
          Regulation 709.512.2 classifies equipment installed on or above a jetty, wharf, pier or
          pontoon against four external-influence codes — water (AD), solid foreign bodies (AE),
          corrosive or polluting substances (AF) and impact (AG). Socket-outlets then carry a
          separate, higher minimum of their own under 709.553.1.8.
        </p>
        <div className={tableWrap}>
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white">
                <th className={th}>Influence</th>
                <th className={th}>Condition</th>
                <th className={th}>Minimum protection</th>
                <th className={th}>Regulation</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-white/10">
                <td className={`${td} font-semibold`}>Water (AD)</td>
                <td className={td}>Splashes (AD4) / jets (AD5) / waves (AD6)</td>
                <td className={`${td} font-mono whitespace-nowrap`}>IPX4 / IPX5 / IPX6</td>
                <td className={`${td} font-mono whitespace-nowrap`}>709.512.2.1.1</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${td} font-semibold`}>Solid bodies (AE)</td>
                <td className={td}>Small objects (AE2)</td>
                <td className={`${td} font-mono whitespace-nowrap`}>IP3X</td>
                <td className={`${td} font-mono whitespace-nowrap`}>709.512.2.1.2</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${td} font-semibold`}>Corrosion (AF)</td>
                <td className={td}>
                  Atmospheric corrosive or polluting substances (AF2); hydrocarbons present (AF3)
                </td>
                <td className={`${td} whitespace-nowrap`}>AF2 / AF3</td>
                <td className={`${td} font-mono whitespace-nowrap`}>709.512.2.1.3</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${td} font-semibold`}>Impact (AG)</td>
                <td className={td}>Medium-severity mechanical impact (AG2)</td>
                <td className={`${td} whitespace-nowrap`}>AG2, or IK08 equipment</td>
                <td className={`${td} font-mono whitespace-nowrap`}>709.512.2.1.4</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${td} font-semibold`}>Socket-outlets</td>
                <td className={td}>All positions; AD5 or AD6 where applicable</td>
                <td className={`${td} font-mono whitespace-nowrap`}>IP44, or IPX5 / IPX6</td>
                <td className={`${td} font-mono whitespace-nowrap`}>709.553.1.8</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Read those two rows together and the practical floor for a pontoon becomes clear: IP3X for
          solid bodies plus at least IPX4 for water on general equipment, and IP44 on every
          socket-outlet however sheltered it looks. Specifiers commonly select a single combined
          rating such as IP66 to satisfy both digits at the exposed end of a pontoon.
        </p>

        <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-white">
          What the classifications mean on site
        </h3>
        <div className={cardWrap}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>AF2 and AF3 (Reg 709.512.2.1.3).</strong> Equipment on or above a jetty,
              wharf, pier or pontoon must be suitable for atmospheric corrosive or polluting
              substances. Where hydrocarbons are present — a fuel pontoon, for instance — the
              requirement steps up to AF3. Material choice, coatings and gasket integrity all have
              to satisfy the applicable class.
            </li>
            <li>
              <strong>AG2 impact (Reg 709.512.2.1.4).</strong> Boat hooks, mooring lines, fenders
              and vessel movement are all foreseeable. The regulation gives three routes: choose a
              position that avoids reasonably foreseeable impact, provide local or general
              mechanical protection, or install equipment rated at least IK08 to BS EN 62262.
            </li>
            <li>
              <strong>Corrosion-resistant materials.</strong> Enclosures, fixings and cable
              management should be marine-grade — Grade 316 stainless, GRP, or equivalent. Standard
              galvanised steel will not last in salt spray.
            </li>
            <li>
              <strong>The rating is only as good as the last gland.</strong> An IP66 enclosure is
              worth nothing once a gasket has perished or a gland is loose. Unused knockouts must be
              sealed with IP-rated blanking plugs, not tape or silicone, which degrade under UV and
              salt.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-requirements',
    heading: 'RCD Requirements: Individual Protection Is Mandatory',
    content: (
      <>
        <p>
          Regulation 709.531.2 requires that socket-outlets be protected{' '}
          <strong>individually</strong> by an RCD having the characteristics specified in Regulation
          415.1.1 — a rated residual operating current not exceeding 30&nbsp;mA. The device selected
          must disconnect <strong>all live conductors, including the neutral</strong>. The same
          requirement applies to final circuits intended for fixed connection to houseboats.
        </p>
        <p>
          Two parts of that sentence are routinely missed on site. The first is
          &ldquo;individually&rdquo;: unlike a domestic board, RCDs may not be shared between
          socket-outlets. The second is the neutral — an ordinary single-pole-switched RCBO does not
          satisfy 709.531.2.
        </p>
        <div className={cardWrap}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Why individual devices.</strong> An earth fault on one boat trips only that
              berth. Everything else keeps its shore power, including refrigeration, battery
              chargers and bilge pumps on vessels that have nothing wrong with them.
            </li>
            <li>
              <strong>RCD type.</strong> Regulation 531.3.3 restricts Type AC to serving fixed
              equipment where it is known that the load current contains no DC components — which a
              socket-outlet supplying a boat is not. Type A is therefore the working minimum, and
              Type B or Type F may be appropriate where inverters or variable-speed equipment on
              board can produce smooth DC or mixed-frequency residual currents.
            </li>
            <li>
              <strong>RCBOs.</strong> Combining the individual overcurrent device required by
              709.533 and the individual RCD required by 709.531.2 in one four-module-wide space
              suits a pillar well — provided the device switches the neutral.
            </li>
            <li>
              <strong>Verification.</strong> Regulation 643.8 requires the effectiveness of
              automatic disconnection by RCDs to be verified with test equipment to BS EN 61557-6.
              Its note deems effectiveness verified where the RCD disconnects within the stated time
              on an alternating current test at rated residual operating current (I<sub>Δn</sub>) —
              300&nbsp;ms maximum for a general, non-delay type.
            </li>
          </ul>
        </div>
        <p>
          Keeping a PME earth away from the boat and putting an individual 30&nbsp;mA RCD on every
          socket-outlet are the two halves of the same defence. One without the other leaves a real
          gap.
        </p>
      </>
    ),
  },
  {
    id: 'cable-management',
    heading: 'Cable Management and Routing',
    content: (
      <>
        <p>
          Section 709 is unusually specific about wiring systems. Regulation 709.521.1.4 lists what
          is suitable for marina distribution circuits; Regulation 709.521.1.5 then bans four of
          them from the pontoon itself. Getting the second list wrong is a common EICR observation.
        </p>
        <div className={tableWrap}>
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white">
                <th className={th}>Suitable for distribution circuits (709.521.1.4)</th>
                <th className={th}>
                  Shall not be used on or above a jetty, wharf, pier or pontoon (709.521.1.5)
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-white/10">
                <td className={td}>Underground cables</td>
                <td className={td}>
                  Cables in free air suspended from or incorporating a support wire — for example
                  installation methods 35 and 36 in Table 4A2
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={td}>Overhead cables or overhead insulated conductors</td>
                <td className={td}>Non-sheathed cables in cable management systems</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={td}>
                  Copper conductors with thermoplastic or elastomeric insulation and sheath, in an
                  appropriate cable management system chosen for movement, impact, corrosion and
                  ambient temperature
                </td>
                <td className={td}>Cables with aluminium conductors</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={td}>
                  Mineral insulated cables with an outer covering to BS EN 60702-1
                </td>
                <td className={td}>Mineral insulated cables</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={td}>
                  Cables with armouring and serving of thermoplastic or elastomeric material — the
                  SWA family
                </td>
                <td className={td}>—</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={td}>Other cables and materials no less suitable than the above</td>
                <td className={td}>—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Note the trap in row four: mineral insulated cable with an outer covering is expressly
          suitable for a marina distribution circuit, and expressly prohibited on or above the
          pontoon. Aluminium conductors are out on the pontoon regardless of termination method.
        </p>

        <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-white">
          Routing, movement and drainage
        </h3>
        <div className={cardWrap}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Movement (Reg 709.521.1.6).</strong> Cables must be selected and installed so
              that mechanical damage due to tidal and other movement of floating structures is
              prevented. Where pontoon sections are joined, the crossing needs enough slack and
              flexibility to take the movement; a rigid route will work-harden and fracture.
            </li>
            <li>
              <strong>Drainage (Reg 709.521.1.6).</strong> Cable management systems must be
              installed to allow water to drain, by drainage holes and/or by installing the
              equipment on an incline. A trunking run that holds water is a defect, not a detail.
            </li>
            <li>
              <strong>Underground (Reg 709.521.1.7).</strong> Bury deep enough to avoid damage from,
              for example, heavy vehicle movement, unless additional mechanical protection is
              provided. The note gives 0.5&nbsp;m as the depth generally considered a minimum.
            </li>
            <li>
              <strong>Overhead (Reg 709.521.1.8).</strong> All overhead conductors must be
              insulated, at least 6&nbsp;m above ground in any area subject to vehicle movement and
              3.5&nbsp;m elsewhere, with poles and supports sited or protected against foreseeable
              vehicle movement.
            </li>
            <li>
              <strong>The boat tail.</strong> The flexible lead from pillar to craft is H07RN-F with
              CEE plug and connector. It must not trail in the water; hooks or guides on the pontoon
              edge keep it above the waterline. Cracked sheaths, exposed conductors and corroded
              pins take a cable out of service.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inspection-testing',
    heading: 'Inspection and Testing of Marina Installations',
    content: (
      <>
        <p>
          BS 7671 sets no fixed interval. Regulation 652.1 requires the frequency of periodic
          inspection and testing to be determined having regard to the type of installation and
          equipment, its use and operation, the frequency and quality of maintenance, and the
          external influences to which it may be subjected — taking account of the results and
          recommendations of previous certificates and condition reports. Applied to a marina, every
          one of those factors points the same way, and industry practice settles on a maximum of{' '}
          <strong>one year</strong>.
        </p>
        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
            <div className="text-xl font-bold text-elec-yellow">Annual</div>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Full EICR of the fixed installation, with RCD, earth electrode and insulation
              resistance testing.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
            <div className="text-xl font-bold text-white">Monthly</div>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Visual checks of pillars, cables and connections; RCD test-button operation.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
            <div className="text-xl font-bold text-white">After storms</div>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Inspection after any flooding, extreme tide or severe weather event.
            </p>
          </div>
        </div>
        <div className={cardWrap}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Annual EICR.</strong> Periodic inspection and testing under Chapter 65, with
              specific attention to Section 709: insulation resistance, RCD verification to
              Regulation 643.8, earth electrode resistance,{' '}
              <SEOInternalLink href="/guides/earthing-fault-diagnosis">
                earth fault loop impedance
              </SEOInternalLink>
              , and visual inspection of every enclosure, cable route and connection. Regulation
              653.1 requires an Electrical Installation Condition Report based on the model in
              Appendix 6.
            </li>
            <li>
              <strong>Monthly visual inspection.</strong> Supply pillars for physical damage, water
              ingress, corrosion and loose connections; supply cables for damage; RCD test buttons;
              earth electrode connections for corrosion.
            </li>
            <li>
              <strong>After severe weather.</strong> Storms, flooding and extreme tides move
              pontoons and stress everything crossing a joint. A visual inspection afterwards is not
              optional in practice.
            </li>
          </ul>
        </div>
        <p>
          Observations should cite Section 709 by regulation. The recurring ones on marina EICRs are
          shared rather than individual RCDs (709.531.2), a socket-outlet protective conductor
          connected to a PME earthing facility (709.553.1.14), IP integrity lost through damaged
          enclosures or missing glands (709.553.1.8 and 709.512.2.1.1), prohibited wiring systems on
          the pontoon (709.521.1.5), and corroded earth electrode connections.
        </p>
        <p>
          Elec-Mate simplifies marina EICR documentation — record all test results on site using
          voice entry, let the AI flag Section 709 non-compliance, and send the completed EICR to
          the marina operator before you leave.
        </p>
        <SEOAppBridge
          title="Complete marina EICRs on your phone"
          description="Elec-Mate handles special installations including Section 709 marinas. AI board scanner, voice test entry, automatic observation code classification…"
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MarinaElectricalInstallationsPage() {
  return (
    <GuideTemplate
      title="Marina Electrical: Section 709, IP44, 30 mA, 1 m"
      description="BS 7671 Section 709 covers marinas — it excludes equipment on board ships. Sockets: IP44 minimum, individual 30 mA RCD, 1 m above highest water level."
      datePublished="2025-07-15"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Special Installation"
      badgeIcon={Anchor}
      heroTitle={
        <>
          Marina Electrical Installations:{' '}
          <span className="text-yellow-400">BS 7671 Section 709 Guide</span>
        </>
      }
      heroSubtitle="BS 7671 does cover marinas — Section 709. A PME earth must not reach the boat, every socket-outlet needs its own 30 mA RCD switching the neutral, sockets are IP44 minimum and at least 1 m above the highest water level. This guide sets out every Section 709 requirement, reg by reg."
      readingTime={12}
      answerBox={{
        question: 'What are the BS 7671 rules for marina electrical installations?',
        answer:
          'Marinas and similar locations are covered by BS 7671 Section 709. Because the ESQCR prohibit connecting a PME earthing facility to any metalwork in a boat (Reg 709.411.4), and socket-outlet protective conductors must not be connected to a PME earth (Reg 709.553.1.14), the berth supply is derived from a TT arrangement with a local electrode, a DNO TN-S supply, or an on-shore isolating transformer to BS EN 61558-2-4. Every socket-outlet must be protected individually by an RCD to Reg 415.1.1 (30 mA) that disconnects the neutral, must supply only one pleasure craft or houseboat, must be at least IP44 (IPX5 or IPX6 where AD5 or AD6 apply), and must sit at least 1 m above the highest water level — 300 mm on floating pontoons with additional splash protection. Equipment on or above a jetty or pontoon must also satisfy AE2, AF2 (AF3 with hydrocarbons) and AG2.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Marina Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Certify Special Installations on Your Phone"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for digital certificates, AI fault diagnosis, and BS 7671 calculators. Handles special installations including marinas. 7-day free trial."
    />
  );
}
