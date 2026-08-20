import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Scale, ShieldCheck, PoundSterling, Building2, Zap, FileCheck2 } from 'lucide-react';

// -------------------------------------------------------------------
// Shared surfaces — edge-to-edge on phones, inset and rounded from sm: up
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const tableWrapCn = `${cardCn} overflow-x-auto`;
const tableCn = 'w-full min-w-[34rem] text-left text-sm text-white';
const thCn = 'py-3 pr-4 align-bottom font-semibold text-white';
const tdCn = 'py-3 pr-4 align-top text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charging Guides', href: '/ev-charger-grants' },
  { label: 'EV Charging Legislation UK', href: '/ev-charging-legislation' },
];

const tocItems = [
  { id: 'which-rules-apply', label: 'Which Rules Apply' },
  { id: 'smart-charge-points-regs', label: 'Smart Charge Points Regulations 2021' },
  { id: 'building-regs-part-s', label: 'Building Regulations Part S' },
  { id: 'bs7671-section-722', label: 'BS 7671 Section 722' },
  { id: 'iet-code-of-practice', label: 'IET Code of Practice' },
  { id: 'public-charge-point-regs', label: 'Public Charge Point Regulations 2023' },
  { id: 'enforcement', label: 'Enforcement & Penalties' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) make smart functionality mandatory for all new AC charge points up to 22kW sold or installed in Great Britain from 30 June 2022.',
  'Building Regulations Part S (England) requires new non-residential buildings with more than 10 parking spaces to have at least one active charge point per 5 spaces, and cable ducting for all remaining spaces, from 15 June 2022.',
  'BS 7671:2018+A4:2026 Section 722 sets out the electrical installation requirements for EV charging installations, including earthing, protective devices, cable sizing, and testing requirements. A4:2026 was issued 15 April 2026 (may be implemented immediately) and replaces A2:2022+Corrigendum (May 2023)+A3:2024 from 15 October 2026.',
  'On a PME (TN-C-S) supply, Regulation 722.411.4.1 bans direct use of the PME earthing facility for an outdoor charge point. One of methods (b) to (e) must be used — indent (a) was deleted at A2:2022 — and every one of them is built around a 70 V RMS limit under an open-circuit PEN fault.',
  'The IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition, 2023) is the authoritative installation guidance document referenced by OZEV, NICEIC, and NAPIT for EV installer certification.',
  'The Public Charge Point Regulations 2023 require publicly accessible charge points above 8kW to support contactless payment; rapid charging networks must also meet a 99% annual availability standard. Enforcement sits with the Office for Zero Emission Vehicles.',
];

const faqs = [
  {
    question: 'What legislation governs EV charger installation in the UK?',
    answer:
      'EV charger installation in the UK is governed by multiple overlapping pieces of legislation and technical standards. The primary regulations are: the Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467), which mandate smart functionality; Building Regulations Part S (for new and renovated buildings in England); BS 7671:2018+A4:2026 Section 722, which covers the electrical installation requirements (A4:2026 issued 15 April 2026, replacing A2:2022+A3:2024 from 15 October 2026); and the IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition, 2023), which provides detailed installation guidance. Public charge points must also comply with the Public Charge Point Regulations 2023.',
  },
  {
    question: 'What does Building Regulations Part S cover?',
    answer:
      'Part S of the Building Regulations (England), introduced by the Building Regulations etc. (Amendment) (England) Regulations 2021 and in force from 15 June 2022, covers EV infrastructure in new and renovated buildings. For new residential dwellings with associated parking: each dwelling must have a charge point or cable route. For new non-residential buildings with more than 10 car parking spaces: at least one active charge point per 5 spaces (minimum 7kW) and cable routes for all remaining spaces. For major renovations of non-residential buildings where the car park has more than 10 spaces, the same ratio applies. Compliance must be demonstrated to building control.',
  },
  {
    question: 'What does BS 7671 Section 722 require for EV charging?',
    answer:
      'BS 7671:2018+A4:2026 Section 722 sets out the specific requirements for electrical installations supplying EV charging equipment. Key requirements include: earthing — on a TN-C-S (PME) supply the PME earthing facility shall not be used as the means of earthing for the protective conductor contact of an outdoor charging point, so one of the methods in Regulation 722.411.4.1(b) to (e) must be used (for example an installation earth electrode sized so the voltage between the main earthing terminal and Earth does not exceed 70 V RMS under an open-circuit PEN fault); system earthing — a circuit supplying EV charging equipment shall not include a PEN conductor (Regulation 722.312.2.1); RCD protection — a residual current device with a rated residual operating current not exceeding 30mA, plus protection against DC fault current under Regulation 722.531.3.101; overcurrent protection under Regulation 722.533.101; and testing — the installation must be inspected, tested and certificated in accordance with Part 6. The IET Code of Practice provides detailed guidance on meeting these requirements in practice.',
  },
  {
    question: 'Is the IET Code of Practice a legal requirement?',
    answer:
      'The IET Code of Practice for Electric Vehicle Charging Equipment Installation is not itself statutory legislation, but it is recognised by OZEV as the authoritative guidance for EV charger installation. OZEV-approved installer schemes (required for grant-funded installations) assess installers against the Code of Practice. In practice, following the Code of Practice is the standard method of demonstrating compliance with BS 7671:2018+A4:2026 Section 722 and the Smart Charge Points Regulations. The 5th Edition (2023) is the current version and covers smart charging, load management, and DC charging. GN3 (Guide to Inspection and Testing) also directs inspectors of EV charging installations to the IET Code of Practice to determine appropriate inspection items, tests, and acceptance criteria.',
  },
  {
    question: 'What are the earthing requirements for EV charge points under BS 7671?',
    answer:
      'Earthing is the most frequently misunderstood part of EV charger installation under BS 7671:2018+A4:2026 Section 722. For TN-C-S (PME) systems — the most common in the UK — Regulation 722.411.4.1 states that a PME earthing facility shall not be used as the means of earthing for the protective conductor contact of a charging point located outdoors, or one that might reasonably be expected to be used to charge a vehicle located outdoors, unless one of the listed methods is used. Indent (a) was deleted by BS 7671:2018+A2:2022, leaving four: (b) the main earthing terminal is connected to an installation earth electrode by a protective conductor complying with Regulation 544.1.1, with an electrode resistance low enough that the voltage between the main earthing terminal and Earth does not exceed 70 V RMS in the event of an open-circuit fault in the supply PEN conductor — Annex A722, Item A722.3 gives the calculation; (c) a device that disconnects the vehicle from the live conductors and from protective earth within 5 s if the voltage between the circuit protective conductor and Earth exceeds 70 V RMS; (d) a device that disconnects within 5 s if the utilisation voltage between line and neutral is greater than 253 V RMS or less than 207 V RMS; or (e) an alternative device to those in (c) or (d) that does not result in a lesser degree of safety. Devices used for (c), (d) or (e) shall provide isolation and be selected in accordance with Table 537.4. Note that 200 ohms is not the normative criterion — it is a stability cap in NOTE 1 to Annex A722, Item A722.3; the requirement itself is the 70 V RMS limit.',
  },
  {
    question: 'What are the Public Charge Point Regulations 2023?',
    answer:
      'The Public Charge Point Regulations 2023 (SI 2023/1168) apply to publicly accessible charge points above 8kW in Great Britain. Key requirements include: contactless payment — charge points must accept contactless debit and credit card payment without the need for a subscription, app, or membership; transparent pricing — price per kWh must be clearly displayed; roaming — charge points must support open roaming standards; availability — rapid charging networks must be available 99% of the time (measured annually); and reporting — operators must submit data to the National Charge Point Registry. These regulations are enforced by the Office for Zero Emission Vehicles.',
  },
  {
    question: 'Do the Smart Charge Points Regulations apply to rapid DC chargers?',
    answer:
      'No. The Electric Vehicles (Smart Charge Points) Regulations 2021 apply only to privately-owned AC charge points up to 22kW (Mode 3 charging). They do not apply to publicly accessible rapid DC charge points (50kW+), which are covered by the Public Charge Point Regulations 2023 instead. However, DC charge points installed at private premises (e.g., fleet depots) are not subject to the Smart Charge Points Regulations either, as these regulations target the residential and workplace AC charging market.',
  },
  {
    question: 'Does an EV charging circuit need an AFDD?',
    answer:
      'No. Regulation 722.421.1.7.201 of BS 7671:2018+A4:2026 states that arc fault detection devices are not required for circuits supplying EV charging equipment conforming to the BS EN 61851 series that incorporate socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2. This matters because A4:2026 redrafted Regulation 421.1.7 and made AFDD protection a requirement for socket-outlet final circuits up to 32 A in Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes. Section 722 carves EV charging circuits out of that requirement.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/smart-ev-charging',
    title: 'Smart EV Charging UK',
    description: 'Smart Charge Points Regulations explained — tariffs, solar, and demand response.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/workplace-ev-charging',
    title: 'Workplace EV Charging',
    description:
      'Workplace Charging Scheme grants, load balancing, and fleet charger installation.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/ev-charger-grants',
    title: 'EV Charger Grants UK',
    description: 'EVHS and WCS grant guide — eligibility, amounts, and application process.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tethered-vs-untethered-ev-charger',
    title: 'Tethered vs Untethered EV Charger',
    description: 'Which type of charger is right for different installations — pros and cons.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/ev-charger-certificate',
    title: 'EV Charging Certificate App',
    description: 'Complete BS 7671 Section 722 certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'which-rules-apply',
    heading: 'Which Rules Apply to Your Installation',
    content: (
      <>
        <p>
          Five separate rulebooks touch EV charging in the UK, and which of them bite depends
          entirely on what you are installing and where. BS 7671:2018+A4:2026 Section 722 applies to
          every charging circuit without exception; the rest are conditional. Find your job in the
          table below, then read the matching section.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="border-b border-white/20">
                <th className={thCn}>What you are installing</th>
                <th className={thCn}>What applies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  Home charge point, existing dwelling (AC, up to 22kW)
                </td>
                <td className={tdCn}>
                  BS 7671 Section 722 · Smart Charge Points Regulations 2021 · notifiable under
                  Building Regulations Part P · IET Code of Practice
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>New-build dwelling with parking</td>
                <td className={tdCn}>
                  All of the above, plus Building Regulations Part S — a charge point or a cable
                  route for every dwelling
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  Workplace or private car park, not publicly accessible
                </td>
                <td className={tdCn}>
                  BS 7671 Section 722 · Smart Charge Points Regulations 2021 (AC up to 22kW) · Part
                  S if it is a new building or major renovation with more than 10 spaces
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  Publicly accessible charge point above 8kW
                </td>
                <td className={tdCn}>
                  BS 7671 Section 722 · Public Charge Point Regulations 2023 — contactless payment,
                  transparent pricing, roaming, NCPR data
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>Public rapid DC charge point (50kW+)</td>
                <td className={tdCn}>
                  BS 7671 Section 722 · Public Charge Point Regulations 2023, including the 99%
                  annual network availability standard. The Smart Charge Points Regulations do{' '}
                  <strong>not</strong> apply
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Two exclusions are worth knowing. Regulation 722.1 states that Section 722 does not apply
          to charging points that employ inductive (wireless) charging, or that charge mobility
          scooters and similar vehicles of 10 A and less.
        </p>
      </>
    ),
  },
  {
    id: 'smart-charge-points-regs',
    heading: 'Electric Vehicles (Smart Charge Points) Regulations 2021',
    content: (
      <>
        <p>
          The Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) were made
          under powers in the Automated and Electric Vehicles Act 2018. They came into force on 30
          June 2022 and apply to all new privately-owned AC charge points up to 22kW sold or
          installed in Great Britain from that date.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Scope</strong> — applies to charge points at homes, workplaces, and private
              destinations (e.g., hotel car parks, supermarkets) that are not publicly accessible
              and are AC Mode 3 up to 22kW. Does not apply to public charge points (covered by the
              Public Charge Point Regulations 2023) or DC charge points.
            </li>
            <li>
              <strong>Mandatory smart functionality</strong> — all qualifying charge points must
              support: scheduled charging, randomised startup delay (up to 10 minutes), demand-side
              response capability, energy metering and monitoring, and minimum cybersecurity
              standards.
            </li>
            <li>
              <strong>Default off-peak setting</strong> — charge points must be pre-configured to
              charge during off-peak hours (midnight to 8am Monday to Friday, midnight to 11am
              Saturday and Sunday) unless the user actively changes this. This smart default aims to
              shift demand away from peak grid periods.
            </li>
            <li>
              <strong>Enforcement</strong> — OZEV can issue financial penalties to manufacturers and
              importers of non-compliant charge points. Electricians who install non-compliant
              charge points risk losing OZEV-approved installer status.
            </li>
          </ul>
        </div>
        <p>
          See our full guide to{' '}
          <SEOInternalLink href="/smart-ev-charging">smart EV charging</SEOInternalLink> for a
          detailed explanation of each smart functionality requirement and how it affects
          installation and commissioning.
        </p>
      </>
    ),
  },
  {
    id: 'building-regs-part-s',
    heading: 'Building Regulations Part S — EV Infrastructure',
    content: (
      <>
        <p>
          Part S of Schedule 1 to the Building Regulations 2010 (England) was introduced by the
          Building Regulations etc. (Amendment) (England) Regulations 2021 (SI 2021/1392) and came
          into force on 15 June 2022. It requires EV charging infrastructure in new and certain
          renovated buildings. Buildings completed before that date are not retrospectively required
          to comply.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="border-b border-white/20">
                <th className={thCn}>Building type</th>
                <th className={thCn}>Charge points required</th>
                <th className={thCn}>Cable routes required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  New residential dwelling with associated parking
                </td>
                <td className={tdCn}>
                  One per dwelling, minimum 7kW — or a cable route instead where a charge point is
                  not possible because of the electrical supply
                </td>
                <td className={tdCn}>Where a charge point cannot be provided</td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  New non-residential building, more than 10 spaces
                </td>
                <td className={tdCn}>
                  At least one active charge point per 5 spaces (rounded down), minimum 7kW, meeting
                  the Smart Charge Points Regulations
                </td>
                <td className={tdCn}>All remaining spaces</td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  Major renovation, non-residential, more than 10 spaces
                </td>
                <td className={tdCn}>
                  Same one-per-5-spaces ratio where the renovation includes the car park or its
                  electrical infrastructure
                </td>
                <td className={tdCn}>All remaining spaces</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Approved Document S</strong> is the technical guidance for demonstrating Part S
          compliance. It covers the minimum charge point specification, cable route requirements,
          metering, and the documentation building control will expect at sign-off.
        </p>
        <p>
          Wales and Scotland have separate building regulations with similar but not identical
          provisions. Northern Ireland follows the Building Regulations (Northern Ireland) 2012 (as
          amended), which currently has more limited EV infrastructure requirements.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-section-722',
    heading: 'BS 7671:2018+A4:2026 Section 722 — EV Charging Installations',
    content: (
      <>
        <p>
          Section 722 of BS 7671:2018+A4:2026 sets out the electrical installation requirements for
          EV charging equipment. A4:2026 was issued on 15 April 2026 and may be implemented
          immediately; BS 7671:2018+A2:2022+Corrigendum (May 2023)+A3:2024 remains current but will
          be withdrawn on 15 October 2026. A4:2026 makes significant changes to Regulation
          722.411.4.1 on the use of a PME supply — the exception concerning reasonable practicability
          has been deleted — and further changes to external influences, RCDs, socket-outlets and
          connectors. Review the revised regulation text before certifying new work.
        </p>

        <h3 className="mt-8 text-base font-semibold text-white">
          Regulation 722.411.4.1 — earthing on a PME (TN-C-S) supply
        </h3>
        <p>
          A PME earthing facility shall not be used as the means of earthing for the protective
          conductor contact of a charging point located outdoors, or one that might reasonably be
          expected to be used to charge a vehicle located outdoors, unless one of the methods below
          is used. Indent (a) was deleted by BS 7671:2018+A2:2022, which leaves four.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="border-b border-white/20">
                <th className={thCn}>Method</th>
                <th className={thCn}>What the regulation requires</th>
                <th className={thCn}>On site</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={`${tdCn} font-semibold`}>(b) Installation earth electrode</td>
                <td className={tdCn}>
                  The main earthing terminal is connected to an installation earth electrode by a
                  protective conductor complying with Regulation 544.1.1. The electrode resistance
                  to Earth shall be such that the maximum voltage between the main earthing terminal
                  and Earth in the event of an open-circuit fault in the supply PEN conductor does
                  not exceed <strong className="text-elec-yellow">70 V RMS</strong>.
                </td>
                <td className={tdCn}>
                  Earth rod plus the calculation in Annex A722, Item A722.3. Where the conductor is
                  buried, its cross-sectional area shall be not less than Table 54.1.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>(c) CPC-to-Earth voltage device</td>
                <td className={tdCn}>
                  Disconnects the vehicle from the live conductors and from protective earth, in
                  accordance with Regulation 543.3.3.101(b), within{' '}
                  <strong className="text-elec-yellow">5 s</strong> if the voltage between the
                  circuit protective conductor and Earth exceeds 70 V RMS due to an open-circuit PEN
                  fault. It need not operate if the voltage exceeds 70 V RMS for less than 4 s.
                  Reset must be possible only below 70 V RMS.
                </td>
                <td className={tdCn}>
                  Annex A722, Item A722.4 gives guidance, including why measuring CPC-to-neutral or
                  CPC-to-MET does not give equivalent safety.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>(d) Voltage-window device</td>
                <td className={tdCn}>
                  Disconnects the vehicle from the live conductors and protective earth within{' '}
                  <strong className="text-elec-yellow">5 s</strong> if the utilisation voltage at
                  the charging point, between line and neutral, is greater than 253 V RMS or less
                  than 207 V RMS. Reset must be possible only within 207–253 V RMS.
                </td>
                <td className={tdCn}>
                  The common built-in &quot;O-PEN device&quot; in domestic charge points — no earth
                  rod needed.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>(e) Alternative device</td>
                <td className={tdCn}>
                  An alternative device to those in (c) or (d) that does not result in a lesser
                  degree of safety, again disconnecting the vehicle from the live conductors and
                  from protective earth in accordance with Regulation 543.3.3.101(b).
                </td>
                <td className={tdCn}>
                  Equivalent functionality may be built into the charging equipment itself.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>200 Ω is not the criterion.</strong> The requirement is the 70 V RMS limit.
              The 200 Ω figure comes from NOTE 1 to Annex A722, Item A722.3: electrodes with a
              resistance above 200 Ω may be unstable, so where the three-phase formula gives a
              higher value the maximum should be taken as 200 Ω.
            </li>
            <li>
              <strong>Devices under (c), (d) and (e) shall provide isolation</strong> and be
              selected in accordance with Table 537.4.
            </li>
            <li>
              <strong>Keep the downstream earthing separate.</strong> Protective conductors and
              exposed-conductive-parts downstream of a device provided for (c), (d) or (e) shall
              have no connection to protective conductors or exposed-conductive-parts of any circuit
              not protected by the same device, or to any extraneous-conductive-part.
            </li>
            <li>
              <strong>A TT island is not an automatic answer.</strong> NOTE 3 warns that creating a
              TT earthing system for the charging equipment or the whole installation, as an
              alternative to methods (b) to (e), may not be appropriate because of the difficulty of
              achieving sufficient separation from buried metalwork connected to the supply PEN
              conductor.
            </li>
            <li>
              <strong>TN-S supplies</strong> do not require a separate electrode for outdoor
              charging, although many installers still provide one.
            </li>
          </ul>
        </div>

        <h3 className="mt-8 text-base font-semibold text-white">
          Enhanced safety — shorter disconnection times
        </h3>
        <p>
          Annex A722, Item A722.4 notes that a device offering shorter disconnection times at higher
          detected voltages gives an enhanced level of protection to someone touching the vehicle
          during a PEN failure. The example times below are informative, not a requirement, and are
          based on IEC TR 60479-5 and on comparable requirements already in Chapter 41.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="border-b border-white/20">
                <th className={thCn}>Voltage, CPC to Earth</th>
                <th className={thCn}>70 V</th>
                <th className={thCn}>100 V</th>
                <th className={thCn}>200 V</th>
                <th className={thCn}>400 V</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tdCn} font-semibold`}>Maximum disconnection time</td>
                <td className={tdCn}>1 s</td>
                <td className={tdCn}>0.7 s</td>
                <td className={tdCn}>0.2 s</td>
                <td className={tdCn}>0.04 s</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Table A722 of BS 7671:2018+A4:2026. The voltage is the total voltage drop across the
          sensing element of the device and the earth electrode, if any, in series.
        </p>

        <h3 className="mt-8 text-base font-semibold text-white">
          The rest of Section 722, regulation by regulation
        </h3>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>722.312.2.1 — no PEN conductor</strong> — a circuit supplying charging
              equipment for electric vehicles shall not include a PEN conductor. The split from PEN
              to separate line, neutral and protective conductors happens upstream of the charging
              circuit, never within it.
            </li>
            <li>
              <strong>722.410.3.5 and 722.410.3.6 — protective measures not permitted</strong> —
              obstacles and placing out of reach (Section 417), non-conducting location (Regulation
              418.1) and earth-free local equipotential bonding (Regulation 418.2) shall not be used
              for EV charging installations.
            </li>
            <li>
              <strong>722.531.3 and 722.531.3.101 — RCD and DC fault protection</strong> — an AC
              charging point requires RCD protection with a rated residual operating current not
              exceeding 30mA, together with protection against DC fault current. That is met either
              by an RCD of Type B, or by a Type A or Type F RCD combined with a residual direct
              current detecting device (RDC-DD) to BS IEC 62955. BS 7671 defines an RDC-DD as a
              device having at least the functionality of detection and evaluation of 6 mA DC
              residual currents and switching of the monitored circuit — which is why most dedicated
              chargers with built-in DC fault detection can sit behind a Type A RCD rather than a
              Type B. A4:2026 changed the RCD requirements in Section 722, so check the current
              regulation text against the charger manufacturer&apos;s instructions before
              specifying.
            </li>
            <li>
              <strong>722.533.101 — overcurrent protection</strong> — the circuit protective device
              must be rated for the maximum continuous operating current. A 32A charge point (about
              7.4kW at 230 V) is typically protected by a 32A Type B or Type C device; a 40A charge
              point (about 9.2kW at 230 V, uncommon in UK homes) needs a 40A device.
            </li>
            <li>
              <strong>722.421.1.7.201 — no AFDD required</strong> — arc fault detection devices are
              not required for circuits supplying EV charging equipment conforming to the BS EN
              61851 series that incorporate socket-outlets or vehicle connectors conforming to BS EN
              IEC 62196-2. Worth knowing, because A4:2026 redrafted Regulation 421.1.7 and made
              AFDDs a requirement on 32A socket-outlet final circuits in Higher Risk Residential
              Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care
              homes.
            </li>
            <li>
              <strong>722.311.201 — load curtailment</strong> — load curtailment, including load
              reduction or disconnection, either automatically or manually, may be taken into
              account when determining the maximum demand of the installation or part thereof. This
              is the regulatory basis for dynamic load management on multi-charger commercial and
              fleet sites: the supply can be sized for managed simultaneous demand rather than
              worst-case peak. Document the scheme — the demand calculation has to be defensible.
            </li>
            <li>
              <strong>722.413.1.2 — electrical separation</strong> — where electrical separation is
              used as the protective measure, it is limited to one electric vehicle supplied from
              one unearthed source, through a fixed isolating transformer complying with BS EN
              61558-2-4.
            </li>
            <li>
              <strong>722.511.101 — equipment standard</strong> — EV charging equipment shall comply
              with the appropriate parts of the BS EN 61851 series. Where a charging point is built
              into a low voltage switchgear or controlgear assembly, the relevant part of the BS EN
              IEC 61439 series applies.
            </li>
            <li>
              <strong>Certification</strong> — EV charging installations must be inspected, tested
              and certificated in accordance with Part 6 of BS 7671. Use the{' '}
              <SEOInternalLink href="/ev-charger-certificate">
                Elec-Mate EV charging certificate
              </SEOInternalLink>{' '}
              to complete the required documentation on site.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'iet-code-of-practice',
    heading: 'IET Code of Practice for EV Charging Equipment Installation',
    content: (
      <>
        <p>
          The IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th
          Edition, 2023) is the definitive installation guidance document for UK EV charger
          installers. It is published by the Institution of Engineering and Technology with industry
          input from bodies including BEAMA, the Electrical Contractors&apos; Association and the
          Energy Networks Association.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Status</strong> — not statutory law, but recognised by OZEV, NICEIC, NAPIT,
              and the EV installer certification bodies as the authoritative guidance. Following the
              Code of Practice is the standard method of demonstrating competence and compliance
              with BS 7671 Section 722.
            </li>
            <li>
              <strong>5th Edition coverage</strong> — the 2023 edition covers Mode 2 and Mode 3 AC
              charging, DC charging, smart charging requirements under the 2021 Regulations, load
              management, solar integration, energy storage, earthing arrangements for all system
              types, cable sizing, protective devices, and documentation requirements.
            </li>
            <li>
              <strong>OZEV installer assessment</strong> — the OZEV-approved installer qualification
              (required for grant-funded installations) tests knowledge of the Code of Practice.
              Installers must demonstrate understanding of earthing, protective device selection,
              load management, and certification requirements.
            </li>
            <li>
              <strong>GN3 inspection guidance</strong> — when inspecting EV charging installations,
              GN3 (IET Guidance Note 3: Inspection and Testing, 9th Edition) directs the inspector
              to the IET Code of Practice for the inspection items, tests and acceptance criteria
              specific to EV equipment. The standard Appendix 6 schedule on its own does not cover
              EV work.
            </li>
            <li>
              <strong>Chapter 82 — prosumer&apos;s low-voltage electrical installations</strong> —
              EV installations that incorporate solar PV generation, battery storage or
              bidirectional charging also engage Chapter 82 of BS 7671, introduced as an entirely
              new chapter at A2:2022 and covering low-voltage installations where local production
              or storage of energy is present. Section 722 itself picks this up at Regulation
              722.826.3.201.
            </li>
            <li>
              <strong>Purchasing the Code of Practice</strong> — the 5th Edition is available from
              the IET Shop (theiet.org) in print and digital formats. The digital edition includes
              hyperlinked cross-references and is updated between print editions when regulations
              change.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'public-charge-point-regs',
    heading: 'Public Charge Point Regulations 2023',
    content: (
      <>
        <p>
          The Public Charge Point Regulations 2023 (SI 2023/1168) set standards for publicly
          accessible EV charge points in Great Britain above 8kW. They apply to operators of charge
          points accessible to the general public, including retail car parks, motorway service
          areas, and on-street charging.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Contactless payment</strong> — publicly accessible charge points above 8kW
              must accept contactless payment (debit and credit card) without requiring a
              subscription, app download, or pre-registration. This ended the practice of
              network-only charging that locked out drivers without a specific RFID card.
            </li>
            <li>
              <strong>Transparent pricing</strong> — prices must be displayed clearly per kWh before
              the session starts. Session fees, connection fees, and time-based fees must be
              disclosed. Hidden fees or unclear pricing are prohibited.
            </li>
            <li>
              <strong>Availability</strong> — operators of rapid charging networks (50kW+) must
              maintain 99% annual availability and publish availability data. Failure to do so
              exposes operators to enforcement action.
            </li>
            <li>
              <strong>Data reporting</strong> — operators must submit data to the National Charge
              Point Registry (NCPR), including charge point location, power rating, connector type,
              status, and pricing. This data is publicly accessible and used by navigation apps.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'enforcement',
    heading: 'Enforcement & Penalties',
    content: (
      <>
        <p>
          Different bodies police different parts of the framework. Knowing which one is looking at
          which obligation is the difference between a fixable observation and a stalled handover.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>OZEV — Smart Charge Points Regulations</strong> — OZEV can issue civil
              penalties to manufacturers and importers of non-compliant charge points, up to £10,000
              per non-compliant unit. OZEV-approved installer status can be revoked for repeated
              installation of non-compliant equipment.
            </li>
            <li>
              <strong>OZEV — Public Charge Point Regulations</strong> — the Office for Zero Emission
              Vehicles enforces the 2023 Regulations, with powers to require compliance and to
              impose financial penalties on operators for continued non-compliance.
            </li>
            <li>
              <strong>Building control — Part S</strong> — failure to comply with Part S during new
              construction or renovation can result in building control refusing to issue a
              completion certificate, preventing the building being occupied. Retrospective
              regularisation is possible but costly.
            </li>
            <li>
              <strong>Local authorities — planning</strong> — installing an EV charger without
              required planning permission can result in enforcement notices requiring removal.
              Listed building consent violations can result in criminal prosecution.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Staying Compliant with EV Legislation',
    content: (
      <>
        <p>
          EV charging legislation is evolving rapidly, and A4:2026 has moved Section 722 again. The
          core obligations are still straightforward: install only OZEV-approved smart chargers,
          work to Section 722 and the IET Code of Practice, and certify every installation
          correctly.
        </p>
        <div className={cardCn}>
          <h4 className="text-base font-semibold text-white">
            Certificate every installation correctly
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-white">
            Use the{' '}
            <SEOInternalLink href="/ev-charger-certificate">
              Elec-Mate EV charging certificate app
            </SEOInternalLink>{' '}
            to complete a BS 7671-compliant electrical installation certificate for every EV charger
            you install. It covers supply details, earthing arrangement, protective device ratings,
            RCD type, insulation resistance, earth electrode resistance and all required test
            results, then exports a professional PDF for the client and for OZEV records.
          </p>
          <div className="mt-5 border-t border-white/[0.1] pt-5">
            <h4 className="text-base font-semibold text-white">Apply WCS grants for your clients</h4>
            <p className="mt-2 text-sm leading-relaxed text-white">
              As an OZEV-approved installer you can apply for{' '}
              <SEOInternalLink href="/ev-charger-grants">WCS grants</SEOInternalLink> on behalf of
              your business clients, deducting £350 per socket from your invoice. Use the Elec-Mate
              quoting app to show grant deductions clearly and increase your quote acceptance rate.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="EV Charger Installation Regulations UK (BS 7671 Section 722)"
          description="EV charge point rules explained: BS 7671 Section 722, PEN-fault protection, RCD type and DNO notification. What every installer must get right."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargingLegislationUKPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Regs UK: Part S + §722"
      description="UK rules for EV charge point installation: Building Regs Part S, Smart Charge Point Regulations 2021, BS 7671 Section 722 and PME / O-PEN earthing."
      datePublished="2025-01-01"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Legislation Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          EV Charging Regulations UK 2026:{' '}
          <span className="text-yellow-400">Laws & Standards for EV Chargers</span>
        </>
      }
      heroSubtitle="The complete legal framework for EV charging in the UK — the Electric Vehicles (Smart Charge Points) Regulations 2021, Building Regulations Part S, BS 7671 Section 722, the IET Code of Practice, and the Public Charge Point Regulations 2023 — explained clearly for electricians, businesses, and property developers."
      readingTime={14}
      answerBox={{
        question: 'Do I need to notify an EV charger installation?',
        answer:
          'Yes. Installing an EV charge point is notifiable electrical work — it normally adds a new dedicated circuit, so it must be notified under the Building Regulations (Part P in England) and certified to BS 7671. It must comply with Section 722, including RCD protection not exceeding 30mA with DC fault detection, and is registered either through a competent person scheme or via building control.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charging Regulations UK"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Charging Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EV charging certificates, quoting, and job management. Stay compliant and win more work. 7-day free trial, cancel anytime."
    />
  );
}
