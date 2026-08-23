import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Car,
  Shield,
  Cable,
  FileCheck2,
  Calculator,
  GraduationCap,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared surface classes — edge-to-edge on mobile, inset from sm: up
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 my-5';

const alertCn =
  '-mx-4 rounded-none border-y border-orange-500/30 sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-orange-500/10 p-4 sm:p-5 my-5';

const tableWrapCn = '-mx-4 overflow-x-auto sm:mx-0';
const tableCn = 'w-full min-w-[520px] border-collapse text-left text-sm text-white';
const thCn =
  'border-b border-white/[0.18] px-3 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-white';
const tdCn = 'border-b border-white/[0.08] px-3 py-2.5 align-top text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'IET Code of Practice EV Charging', href: '/guides/iet-code-of-practice-ev' },
];

const tocItems = [
  { id: 'what-is-cop', label: 'What Is the IET CoP?' },
  { id: 'load-assessment', label: 'Load Assessment' },
  { id: 'earthing-arrangements', label: 'Earthing: PME, TT and O-PEN' },
  { id: 'cable-sizing-ev', label: 'Cable Sizing for EV Chargers' },
  { id: 'smart-charging', label: 'Smart Charging and OCPP' },
  { id: 'protection-devices', label: 'Protection Devices' },
  { id: 'documentation', label: 'Documentation and Certification' },
  { id: 'elec-mate-ev', label: 'EV Installations with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition, 2023) is the primary technical reference for EV charger installations in the UK. It supplements BS 7671 — it does not replace Section 722.',
  'Reg 722.312.2.1: a circuit supplying EV charging equipment shall not include a PEN conductor. Reg 722.411.4.1: a PME earthing facility shall not be used for the protective conductor contact of a charging point outdoors unless one of methods (b) to (e) is applied. Method (a) was deleted at A2:2022.',
  'The normative open-PEN disconnection requirement is 5 s once the voltage between the CPC and Earth exceeds 70 V RMS — not milliseconds. Table A722 is informative guidance on shorter, enhanced times.',
  'Reg 722.311.201 permits load curtailment — automatic or manual load reduction or disconnection — to be taken into account when determining maximum demand, which is what lets a load-managed charger avoid a DNO supply upgrade.',
  'Smart functionality is a legal requirement for private chargepoints sold or installed in Great Britain from 30 June 2022. Default charging hours must sit outside 08:00–11:00 and 16:00–22:00 on weekdays.',
  'Elec-Mate generates compliant EV charger certificates, calculates cable sizing with voltage drop verification, and includes the specific EV installation checklist from the IET CoP.',
];

const faqs = [
  {
    question: 'What is the IET Code of Practice for EV Charging?',
    answer:
      'The IET Code of Practice for Electric Vehicle Charging Equipment Installation is a technical guidance document published by the Institution of Engineering and Technology. It supplements BS 7671 (the IET Wiring Regulations) by providing specific guidance on the design, installation, and verification of EV charging equipment. The current edition is the 5th Edition, published in 2023. It covers domestic, commercial, and public EV charging installations and addresses topics not fully covered by BS 7671 alone, including earthing requirements specific to outdoor charging, load management, open-PEN protection, and OCPP communication protocols. While the CoP is not a British Standard and not legally mandatory in itself, it is widely regarded as the industry standard and is referenced by competent person schemes and building control.',
  },
  {
    question: 'Is there a free PDF of the IET Code of Practice 5th Edition?',
    answer:
      'No. The Code of Practice for Electric Vehicle Charging Equipment Installation, 5th Edition is a copyrighted IET publication sold through the IET Shop and trade distributors such as NAPIT. There is no free or official download, and copies offered as free PDFs elsewhere are unauthorised. What you can rely on without buying the CoP is BS 7671 itself: Section 722 (Electric vehicle charging installations) and the informative Annex A722 carry the normative requirements for PME earthing, open-PEN protection, RCD selection and load curtailment. The CoP explains and expands on those requirements but does not override them — where the two appear to differ, BS 7671 is the standard you are certifying against.',
  },
  {
    question: 'Can I use PME earthing for an EV charger?',
    answer:
      'Regulation 722.411.4.1 of BS 7671:2018+A4:2026 states that a PME earthing facility shall not be used as the means of earthing for the protective conductor contact of a charging point located outdoors, or that might reasonably be expected to be used to charge a vehicle located outdoors, unless one of the listed methods is used. The reason is that in a PME system the earth and neutral are combined in the supply cable as a PEN conductor. If that PEN conductor is lost, exposed metalwork connected to the PME earth — including the vehicle body — can rise to a dangerous potential relative to true Earth while the user is standing outdoors on damp ground. The permitted methods are (b) an installation earth electrode sized so that the main earthing terminal cannot exceed 70 V RMS relative to Earth during an open-PEN fault, (c) a device that disconnects the vehicle from the live conductors and from protective earth within 5 s of the CPC-to-Earth voltage exceeding 70 V RMS, (d) a device that disconnects within 5 s if the utilisation voltage goes above 253 V or below 207 V RMS, or (e) an alternative device giving no lesser degree of safety. Method (a) was deleted by BS 7671:2018+A2:2022.',
  },
  {
    question: 'How fast must an open-PEN protection device disconnect?',
    answer:
      'Under Regulation 722.411.4.1(c) the device must disconnect the vehicle from the live conductors of the supply and from protective earth within 5 s of the voltage between the circuit protective conductor and Earth exceeding 70 V RMS. It need not operate if the voltage exceeds 70 V RMS for less than 4 s, which prevents nuisance tripping on transients. The device must provide isolation, be selected in accordance with Table 537.4, and must only be capable of being closed or reset once the CPC-to-Earth voltage is back below 70 V RMS. Table A722 in the informative Annex A722 sets out an optional enhanced provision with shorter times that scale with the detected voltage: 1 s at 70 V, 0.7 s at 100 V, 0.2 s at 200 V and 0.04 s at 400 V. Those figures are examples of enhanced safety provision based on IEC TR 60479-5, not the baseline requirement — the 5 s figure is the one you must meet.',
  },
  {
    question: 'What cable size do I need for a 7 kW EV charger?',
    answer:
      'A 7 kW single-phase EV charger draws approximately 32 A at 230 V. The minimum cable size depends on the installation method, cable type, cable run length, and any correction factors (grouping, ambient temperature, thermal insulation). For a typical domestic installation using armoured cable clipped direct or buried in the ground, 6 mm² copper is commonly used for runs up to approximately 30 metres, with 10 mm² for longer runs where voltage drop becomes the limiting factor. Take the tabulated current-carrying capacity from the Appendix 4 table that matches your actual cable: the 4D series is 70 °C thermoplastic, the 4E series is 90 °C thermosetting, and within each series the "4A" table is the multicore armoured one. Always perform a full cable sizing calculation including current-carrying capacity with all applicable correction factors, voltage drop check, and earth fault loop impedance verification.',
  },
  {
    question: 'What are the smart charging requirements for EV chargepoints?',
    answer:
      'The Electric Vehicles (Smart Charge Points) Regulations 2021 came into force on 30 June 2022 and require private EV chargepoints sold or installed in Great Britain to have smart functionality. Chargepoints must be capable of sending and receiving information over a communications network, respond to signals to increase or decrease the rate of charging, and have pre-set default charging hours that fall outside peak hours — defined in regulation 10(4)(b) as 08:00 to 11:00 and 16:00 to 22:00 on weekdays. The user must be able to accept, remove or change those hours. Regulation 11 requires a randomised delay: the chargepoint must be capable of a random delay of up to 1800 seconds, and by default operates with a random delay of up to 600 seconds, so that thousands of units do not all start together. Security requirements are set out in Schedule 1. Under regulation 3 the regulations do not apply to non-smart cables, public charge points, or rapid charge points rated at not less than 50 kW. OCPP (Open Charge Point Protocol) is the industry-standard protocol most smart chargers use to talk to a back-end management system.',
  },
  {
    question: 'Do I need a separate circuit for an EV charger?',
    answer:
      'Yes. The IET CoP recommends that each EV charger is supplied by a dedicated circuit from the distribution board, and that circuit should not supply any other loads. The circuit must be protected by an appropriate MCB or RCBO and suitable RCD protection. Regulation 722.531.3.101 is the regulation governing RCD selection for EV charging installations. Its indents reference BS IEC 62955, the standard for the residual direct current detecting device (RDC-DD) used for mode 3 charging. BS 7671 Part 2 defines an RDC-DD as a detection device having at least the functionality of detection and evaluation of 6 mA DC residual currents and switching of the monitored circuit. In practice this means DC fault current must be dealt with either by a Type B RCD or by combining a Type A RCD with an RDC-DD, which most modern chargers provide internally. Check the manufacturer installation instructions for the specific arrangement your unit requires.',
  },
  {
    question: 'Are AFDDs required on an EV charging circuit?',
    answer:
      'Not for compliant EV charging equipment. Regulation 722.421.1.7.201 of BS 7671:2018+A4:2026 states that AFDDs are not required for circuits supplying EV charging equipment conforming to the BS EN 61851 series that incorporate socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2. This matters because A4:2026 redrafted the general AFDD regulation, Regulation 421.1.7, to make AFDD protection a requirement for socket-outlet final circuits rated up to 32 A in Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes, and a recommendation elsewhere. The Section 722 exemption sits on top of that, so a dedicated EV charging circuit feeding compliant equipment does not pull in the AFDD requirement.',
  },
  {
    question: 'What certification is needed after installing an EV charger?',
    answer:
      'After installing a domestic EV charger, the electrician must issue an Electrical Installation Certificate (EIC) for the new circuit. This is notifiable work under Part P of the Building Regulations (Approved Document P) because it involves adding a new circuit. If the electrician is registered with a competent person scheme such as NICEIC or NAPIT, they can self-certify the work and notify building control electronically. (The ELECSA brand was retired from 2021 and its registrations were transferred to NICEIC.) If not registered, the work must be notified to building control separately and may require inspection. The IET CoP also recommends completing the specific EV installation checklist, which covers items unique to EV charging such as open-PEN protection verification, load management settings, and charger commissioning. Elec-Mate includes a dedicated EV charger certificate template with the IET CoP checklist built in.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rams-for-ev-charger-installation',
    title: 'RAMS for EV Charger Installation',
    description: 'Project RAMS for OZEV-grade EV charge point install.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/guides/section-722-ev-charging-a4-2026-changes',
    title: 'Section 722 EV Charging A4:2026 Changes',
    description: 'RDC-DD, PME, V2G — what changed in Section 722 under A4:2026.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/ev-charger-certificate',
    title: 'EV Charger Certificate',
    description:
      'Digital EV charger installation certificate with IET CoP checklist, open-PEN verification, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for EV charger circuits with automatic correction factors and voltage drop verification to BS 7671.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Practical step-by-step guide to installing domestic and commercial EV chargers in the UK.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-systems-tns-tncs-tt-explained',
    title: 'Earthing Arrangements Guide',
    description:
      'TN-C-S, TN-S, and TT earthing systems explained with diagrams and practical guidance for UK electricians.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/building-regulations-electrical',
    title: 'Building Regulations Electrical',
    description:
      'Approved Document P requirements, notifiable work types, and competent person scheme certification.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/eighteenth-edition-course',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with structured training modules covering all aspects of BS 7671.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-cop',
    heading: 'What Is the IET Code of Practice for EV Charging?',
    content: (
      <>
        <div className={cardCn}>
          <h4 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
            The Code of Practice at a glance
          </h4>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <tbody>
                <tr>
                  <th scope="row" className={`${tdCn} w-[40%] font-semibold`}>
                    Current edition
                  </th>
                  <td className={tdCn}>5th Edition, published 2023</td>
                </tr>
                <tr>
                  <th scope="row" className={`${tdCn} font-semibold`}>
                    Publisher
                  </th>
                  <td className={tdCn}>Institution of Engineering and Technology (IET)</td>
                </tr>
                <tr>
                  <th scope="row" className={`${tdCn} font-semibold`}>
                    Free PDF?
                  </th>
                  <td className={tdCn}>
                    No — it is a copyrighted publication sold by the IET Shop and trade
                    distributors. Copies circulating as free downloads are unauthorised.
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={`${tdCn} font-semibold`}>
                    Legal status
                  </th>
                  <td className={tdCn}>
                    Guidance, not a British Standard. Not mandatory in itself.
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={`${tdCn} font-semibold`}>
                    What is mandatory
                  </th>
                  <td className={tdCn}>
                    BS 7671:2018+A4:2026 Section 722 — the regulations you certify against.
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={`${tdCn} border-b-0 font-semibold`}>
                    Covers
                  </th>
                  <td className={`${tdCn} border-b-0`}>
                    Domestic, workplace, public and fleet depot charging; Mode 3 (AC) and Mode 4
                    (DC rapid)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          The IET Code of Practice for Electric Vehicle Charging Equipment Installation is a
          technical guidance document that supplements{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          with specific guidance on the design, installation, verification, and maintenance of EV
          charging equipment. The current edition is the 5th Edition, published in 2023.
        </p>
        <p>
          The Code of Practice (CoP) exists because EV charging installations present technical
          challenges that Section 722 states as requirements but does not explain: outdoor earthing
          risks on PME supplies, load management on multiple charger installations, DC fault current
          protection, communication protocols, and the interaction between the vehicle, charger, and
          electrical installation.
        </p>
        <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-white">
          Why it matters if it is not legally binding
        </h3>
        <p>
          The CoP is not a British Standard and compliance is not a strict legal requirement, but it
          is the accepted industry standard. Competent person schemes expect EV charger
          installations to follow it. Building control bodies and OZEV (the Office for Zero Emission
          Vehicles, formerly OLEV) grant funding applications reference the CoP as the baseline
          technical standard. An electrician who installs an EV charger without following it is
          exposed on liability if something goes wrong.
        </p>
        <p>
          What the CoP cannot do is override BS 7671. Where the two appear to differ, the regulation
          is what an inspector will hold you to — so every figure on this page is quoted against
          Section 722 and Annex A722, with the CoP cited only where it adds guidance the standard
          does not.
        </p>
      </>
    ),
  },
  {
    id: 'load-assessment',
    heading: 'Load Assessment for EV Charging Installations',
    content: (
      <>
        <p>
          Before installing any EV charger, assess the load on the existing installation. The
          purpose is to determine whether the existing supply has sufficient capacity to support the
          additional load without exceeding the main fuse or supply capacity.
        </p>
        <p>
          A domestic 7 kW charger draws 32 A — a significant addition to a typical domestic supply
          protected by a 60 A or 80 A main fuse. If the existing maximum demand (cooker, shower,
          heating, and other large loads) is already close to the main fuse rating, adding a 32 A EV
          charger could blow the main fuse during periods of high demand.
        </p>
        <div className={cardCn}>
          <h4 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
            Load assessment checklist
          </h4>
          <ol className="list-decimal space-y-3 pl-5 text-white marker:font-semibold marker:text-elec-yellow">
            <li>
              <strong>Check the main fuse or service cut-out rating</strong> — typically 60 A, 80 A,
              or 100 A for domestic supplies. If the main fuse is 60 A and the existing maximum
              demand is 40 A, there is only 20 A of headroom — not enough for a 32 A charger at full
              power.
            </li>
            <li>
              <strong>Calculate the existing maximum demand</strong> — use the{' '}
              <SEOInternalLink href="/tools/max-demand-calculator">
                maximum demand calculator
              </SEOInternalLink>{' '}
              with diversity applied.
            </li>
            <li>
              <strong>Consider load curtailment</strong> — BS 7671:2018+A4:2026 Regulation
              722.311.201 states that load curtailment, including load reduction or disconnection,
              either automatically or manually, may be taken into account when determining maximum
              demand of the installation or part thereof. A dynamic load management system that
              reduces charger output when other loads are running can therefore be used to justify a
              smaller supply or avoid a DNO upgrade. Many smart chargers support this via a CT clamp
              on the incoming supply.
            </li>
            <li>
              <strong>Apply diversity for multiple chargers</strong> — the IET CoP gives diversity
              factors for installations with more than one charger, on the basis that not all
              chargers will draw full power at once. Take the factors from the CoP for the specific
              installation type rather than assuming a figure.
            </li>
          </ol>
        </div>
        <p>
          If the existing supply cannot support the EV charger even with load curtailment, the
          options are: request a supply upgrade from the DNO (which can take weeks and cost
          thousands), install a lower-power charger (for example, 3.6 kW at 16 A instead of 7 kW at
          32 A), or install a dedicated three-phase supply if one is available.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-arrangements',
    heading: 'Earthing Arrangements: PME, TT, and Open-PEN Protection',
    content: (
      <>
        <p>
          Earthing is the most technically critical aspect of EV charger installation, and it is
          governed by two separate regulations that are often run together. They are not the same
          rule.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  Regulation
                </th>
                <th scope="col" className={thCn}>
                  What it says
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  722.312.2.1
                </th>
                <td className={tdCn}>
                  A circuit supplying charging equipment for electric vehicles shall not include a
                  PEN conductor. On a TN-C-S supply the EV circuit must therefore originate
                  downstream of the point at which the PEN is split into separate protective earth
                  and neutral conductors.
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} border-b-0 whitespace-nowrap font-semibold`}>
                  722.411.4.1
                </th>
                <td className={`${tdCn} border-b-0`}>
                  A PME earthing facility shall not be used as the means of earthing for the
                  protective conductor contact of a charging point located outdoors, or that might
                  reasonably be expected to be used to charge a vehicle located outdoors, unless one
                  of methods (b) to (e) below is used.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The underlying problem: in a PME system the earth and neutral are combined in the supply
          cable as the PEN conductor. If that conductor breaks between the DNO transformer and the
          property, all metalwork connected to the PME earth can rise towards mains potential
          relative to true Earth. A person standing outdoors on damp ground while touching the
          vehicle or charger is directly in that path.
        </p>
        <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-white">
          The permitted methods under 722.411.4.1
        </h3>
        <p>
          Method (a) was deleted by BS 7671:2018+A2:2022. Four methods remain, and an open-PEN
          device is only one of them:
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  Method
                </th>
                <th scope="col" className={thCn}>
                  Requirement
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  (b) Earth electrode
                </th>
                <td className={tdCn}>
                  The main earthing terminal is connected to an installation earth electrode by a
                  protective conductor complying with Regulation 544.1.1. The electrode resistance
                  to Earth must be low enough that the voltage between the main earthing terminal
                  and Earth cannot exceed 70 V RMS during an open-PEN fault. Where buried, that
                  protective conductor must be no smaller than Table 54.1 requires.
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  (c) Open-PEN device
                </th>
                <td className={tdCn}>
                  A device that disconnects the vehicle from the live conductors and from protective
                  earth within <strong>5 s</strong> of the CPC-to-Earth voltage exceeding 70 V RMS.
                  It need not operate if the voltage exceeds 70 V for less than 4 s. It must provide
                  isolation, be selected per Table 537.4, and only be resettable once the voltage is
                  back below 70 V RMS.
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  (d) Voltage window
                </th>
                <td className={tdCn}>
                  A device that disconnects within 5 s if the utilisation voltage at the charging
                  point, line to neutral, goes above 253 V or below 207 V RMS. Resettable only once
                  the voltage is back inside 207–253 V RMS.
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} border-b-0 whitespace-nowrap font-semibold`}>
                  (e) Equivalent device
                </th>
                <td className={`${tdCn} border-b-0`}>
                  An alternative device to (c) or (d) that does not result in a lesser degree of
                  safety. Equivalent functionality may be built into the charging equipment itself.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Downstream of a device provided for (c), (d) or (e), the protective conductors and
          exposed-conductive-parts must have no connection to the protective conductors or
          exposed-conductive-parts of any circuit not protected by the same device, and no
          connection to any extraneous-conductive-part.
        </p>
        <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-white">
          Table A722 — enhanced disconnection times
        </h3>
        <p>
          Annex A722 is informative. It describes an optional enhanced safety provision in which the
          device disconnects faster the higher the detected CPC-to-Earth voltage, based on IEC TR
          60479-5. These are <strong>not</strong> the baseline requirement — 722.411.4.1(c) still
          sets 5 s at 70 V RMS.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <caption className="px-3 py-2 text-left text-sm text-white">
              Table A722 — maximum disconnection times against the voltage between the circuit
              protective conductor and Earth
            </caption>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  CPC-to-Earth voltage
                </th>
                <th scope="col" className={thCn}>
                  70 V
                </th>
                <th scope="col" className={thCn}>
                  100 V
                </th>
                <th scope="col" className={thCn}>
                  200 V
                </th>
                <th scope="col" className={thCn}>
                  400 V
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={`${tdCn} border-b-0 whitespace-nowrap font-semibold`}>
                  Max disconnection time
                </th>
                <td className={`${tdCn} border-b-0`}>1 s</td>
                <td className={`${tdCn} border-b-0`}>0.7 s</td>
                <td className={`${tdCn} border-b-0`}>0.2 s</td>
                <td className={`${tdCn} border-b-0`}>0.04 s</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={alertCn}>
          <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
            A TT island is not the easy answer
          </h4>
          <p className="text-sm leading-relaxed text-white">
            NOTE 3 to Regulation 722.411.4.1 warns that creating a TT earthing system for the
            charging equipment, or for the whole installation, as an alternative to using a PME
            earthing facility with one of methods (b) to (e) may not be an appropriate solution —
            because of the difficulty of providing sufficient separation from buried metalwork
            connected to the supply PEN conductor. Where you do go down this route, the separation
            distance has to be justified, not assumed.
          </p>
        </div>
        <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-white">
          Electrical separation — Regulation 722.413.1.2
        </h3>
        <p>
          BS 7671:2018+A4:2026 Regulation 722.413.1.2 limits the protective measure of electrical
          separation to the supply of one electric vehicle from one unearthed source, supplied
          through a fixed isolating transformer complying with BS EN 61558-2-4. An example
          arrangement for supplying a Class I charging point from a separated source is shown in
          Annex A722, Item A722.5 (Figure A722). Note that isolating transformers can draw high
          inrush currents, so the primary-side overcurrent device needs selecting accordingly.
        </p>
        <p>
          For TN-S earthing systems, where the earth and neutral are separate throughout, the
          open-PEN risk does not arise and the{' '}
          <SEOInternalLink href="/guides/earthing-systems-tns-tncs-tt-explained">earthing arrangement</SEOInternalLink> can
          be used directly for EV charging without these additional measures. TN-S supplies are far
          less common in the UK — most domestic supplies are TN-C-S (PME).
        </p>
        <SEOAppBridge
          title="EV charger certificates with open-PEN verification"
          description="Elec-Mate's EV charger certificate template includes the open-PEN verification checklist from the IET CoP."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'cable-sizing-ev',
    heading: 'Cable Sizing for EV Charger Circuits',
    content: (
      <>
        <p>
          Cable sizing for EV charger circuits follows the standard BS 7671 procedure, with
          particular attention to run length (usually longer than a typical domestic circuit) and to
          the fact that EV charging is a continuous duty rather than an intermittent load.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  Charger
                </th>
                <th scope="col" className={thCn}>
                  Design current
                </th>
                <th scope="col" className={thCn}>
                  Typical cable
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  7 kW single-phase
                </th>
                <td className={tdCn}>≈32 A</td>
                <td className={tdCn}>
                  6 mm² 3-core armoured for runs up to roughly 30 m; 10 mm² beyond that, where
                  voltage drop becomes the limit
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  22 kW three-phase
                </th>
                <td className={tdCn}>≈32 A per phase</td>
                <td className={tdCn}>
                  6 mm² 5-core armoured for moderate runs; 10 mm² for longer runs — check with the{' '}
                  <SEOInternalLink href="/tools/cable-volt-drop-three-phase">
                    three-phase voltage drop calculator
                  </SEOInternalLink>
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} border-b-0 whitespace-nowrap font-semibold`}>
                  3.6 kW single-phase
                </th>
                <td className={`${tdCn} border-b-0`}>≈16 A</td>
                <td className={`${tdCn} border-b-0`}>
                  2.5 mm² may be acceptable on short runs where the reduced charging speed is
                  acceptable to the customer
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white">
          Indicative starting points only. Every one of these still needs the full calculation
          against the correct Appendix 4 table for the cable actually installed.
        </p>
        <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-white">
          Use the right Appendix 4 table
        </h3>
        <p>
          Quoting a current-carrying capacity from the wrong table is the most common cable-sizing
          error on EV jobs, because armoured cable and flat twin-and-earth sit in completely
          different places in Appendix 4. Each reference method has its own tabulated column — BS
          7671 publishes no installation-method multiplier, so applying one on top of a Method C
          rating applies the method twice.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  Table
                </th>
                <th scope="col" className={thCn}>
                  Cable it actually covers
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  4D1A
                </th>
                <td className={tdCn}>
                  Single-core 70 °C thermoplastic, non-armoured, with or without sheath — not flat
                  twin-and-earth
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  4D2A
                </th>
                <td className={tdCn}>
                  Multicore 70 °C thermoplastic insulated and sheathed, non-armoured
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  4D4A
                </th>
                <td className={tdCn}>Multicore armoured 70 °C thermoplastic insulated</td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  4D5
                </th>
                <td className={tdCn}>
                  70 °C thermoplastic insulated and sheathed flat cable with protective conductor —
                  this is twin-and-earth
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} border-b-0 whitespace-nowrap font-semibold`}>
                  4E series
                </th>
                <td className={`${tdCn} border-b-0`}>
                  The 90 °C thermosetting (XLPE) equivalents — 4E1A single-core non-armoured, 4E2A
                  multicore non-armoured, 4E4A multicore armoured
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Most UK armoured cable sold for EV work is XLPE insulated, which puts it in the 4E series,
          not the 4D series. Read the tabulated capacity for your actual cable, reference method and
          core count straight out of the table, then apply the rating factors from Tables 4B1
          (ambient), 4C1 (grouping) and Appendix 4 Section 2.6 (thermal insulation) before comparing
          against the design current.
        </p>
        <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-white">
          Voltage drop is usually the binding constraint
        </h3>
        <p>
          The charger is often on the side of a garage or at the end of a driveway, 20 to 40 metres
          from the consumer unit, so voltage drop tends to force the cable size before
          current-carrying capacity does. Table 4Ab of BS 7671 gives 3% for lighting and 5% for
          other uses on a low voltage installation supplied directly from a public LV distribution
          system — so 5% applies to an EV circuit, which is 11.5 V on a 230 V single-phase supply.
          Where the wiring system exceeds 100 m, that figure may be increased by 0.005% per metre
          beyond 100 m, capped at a 0.5% increase.
        </p>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/voltage-drop-calculator">
            voltage drop calculator
          </SEOInternalLink>{' '}
          to check the run before you order the drum.
        </p>
      </>
    ),
  },
  {
    id: 'smart-charging',
    heading: 'Smart Charging and OCPP',
    content: (
      <>
        <p>
          The Electric Vehicles (Smart Charge Points) Regulations 2021 came into force on 30 June
          2022 and make smart functionality a legal requirement for private EV chargepoints sold or
          installed in Great Britain. This is separate legislation from BS 7671 — meeting Section
          722 does not discharge it.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th scope="col" className={thCn}>
                  Requirement
                </th>
                <th scope="col" className={thCn}>
                  What the regulations say
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  Off-peak default
                </th>
                <td className={tdCn}>
                  Pre-set default charging hours must fall outside peak hours, defined in regulation
                  10(4)(b) as <strong>08:00 to 11:00 and 16:00 to 22:00 on weekdays</strong>. Both
                  windows — quoting only the morning one is a common mistake.
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  User override
                </th>
                <td className={tdCn}>
                  The owner must be able to accept, remove or change the default charging hours on
                  first use and afterwards.
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  Randomised delay
                </th>
                <td className={tdCn}>
                  Under regulation 11 the chargepoint must be capable of a random delay of up to
                  1800 seconds, and by default operates with a random delay of up to 600 seconds, so
                  that units do not all start together on the same tariff boundary.
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} whitespace-nowrap font-semibold`}>
                  Measuring system
                </th>
                <td className={tdCn}>
                  The chargepoint must measure or calculate imported and exported electricity in
                  watt-hours or kilowatt-hours, accurate to within 10%.
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${tdCn} border-b-0 whitespace-nowrap font-semibold`}>
                  Security
                </th>
                <td className={`${tdCn} border-b-0`}>
                  Schedule 1 sets security requirements covering password configuration, secure boot
                  and software updates, encryption, tamper protection and security logging.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cardCn}>
          <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
            What is out of scope
          </h4>
          <p className="text-sm leading-relaxed text-white">
            Regulation 3 excludes three separate things, and they are often run together
            incorrectly: non-smart cables; <strong>public charge points</strong>, at any power
            rating, including those in public car parks; and <strong>rapid charge points</strong>,
            meaning those allowing a transfer of not less than 50 kW. A 50 kW unit is therefore
            outside the regulations, not inside them.
          </p>
        </div>
        <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-white">
          OCPP in practice
        </h3>
        <p>
          OCPP (Open Charge Point Protocol) is the industry-standard communication protocol for EV
          chargers. It lets chargers from different manufacturers talk to a central management
          system for monitoring, billing, load management, and remote diagnostics. OCPP 1.6 is the
          most widely deployed version; OCPP 2.0.1 adds device management, improved security, and
          support for ISO 15118 (vehicle-to-charger communication for plug-and-charge).
        </p>
        <p>
          For commercial installations with multiple chargers, OCPP connectivity is what makes load
          management and billing possible at all. Confirm the charger has network connectivity
          (Wi-Fi, Ethernet, or 4G) and that the OCPP back-end is configured and tested during
          commissioning — not left for the customer to sort out afterwards.
        </p>
      </>
    ),
  },
  {
    id: 'protection-devices',
    heading: 'Protection Devices for EV Circuits',
    content: (
      <>
        <p>
          EV charger circuits need specific protection devices that differ from a standard domestic
          circuit in two ways: the RCD has to cope with DC fault current, and Section 722 carries an
          explicit AFDD exemption.
        </p>
        <div className={cardCn}>
          <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
            Overcurrent protection
          </h4>
          <p className="mb-4 text-sm leading-relaxed text-white">
            Typically a 32 A Type B or Type C MCB for a 7 kW charger, sized so that Ib ≤ In ≤ Iz per
            Regulation 433.1.1. Type C may be needed where the charger has significant inrush on
            start-up. An RCBO gives overcurrent and residual current protection in one device.
          </p>
          <div className="border-t border-white/[0.1] pt-4">
            <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
              RCD selection and DC fault current
            </h4>
            <p className="text-sm leading-relaxed text-white">
              Regulation 722.531.3.101 governs RCD selection for EV charging installations. Its
              indents reference BS IEC 62955, the standard for the residual direct current detecting
              device (RDC-DD) used for mode 3 charging. BS 7671 Part 2 defines an RDC-DD as a
              detection device having at least the functionality of detection and evaluation of 6 mA
              DC residual currents and switching of the monitored circuit. In practice DC fault
              current is handled either by a Type B RCD or by a Type A RCD combined with an RDC-DD —
              which most modern chargers provide internally, which is why their instructions call
              for only a Type A upstream. Confirm it in the manufacturer literature rather than
              assuming; a Type B device is several times the cost, and fitting the wrong one is not
              a defect you can test your way out of.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white">
              Watch the discrimination note in Chapter 53 too: a Type AC RCD should not be fitted
              upstream of a Type A, Type F or Type B device, and a Type A should not be fitted
              upstream of a Type F or B, because the load characteristics the downstream device was
              chosen for can impair the upstream one — commonly called RCD blinding.
            </p>
          </div>
          <div className="border-t border-white/[0.1] pt-4 mt-4">
            <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
              AFDDs — the Section 722 exemption
            </h4>
            <p className="text-sm leading-relaxed text-white">
              Regulation 722.421.1.7.201 states that AFDDs are not required for circuits supplying EV
              charging equipment conforming to the BS EN 61851 series that incorporate socket-outlets
              or vehicle connectors conforming to BS EN IEC 62196-2. This matters because A4:2026
              redrafted Regulation 421.1.7 to make AFDDs a requirement on socket-outlet final
              circuits up to 32 A in Higher Risk Residential Buildings, Houses in Multiple
              Occupation, purpose-built student accommodation and care homes, and a recommendation
              elsewhere. A dedicated EV circuit feeding compliant equipment does not pull that
              requirement in.
            </p>
          </div>
          <div className="border-t border-white/[0.1] pt-4 mt-4">
            <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
              Surge protection
            </h4>
            <p className="text-sm leading-relaxed text-white">
              Regulation 443.4.1 was redrafted at A4:2026. Protection against transient overvoltages
              must be provided where the consequence could result in (a) serious injury to, or loss
              of, human life; (b) failure of a safety service as defined in Part 2; or (c)
              significant financial or data loss. For all other cases, protection must be provided
              unless the owner of the installation declares it is not required because any loss or
              damage is tolerable and they accept the risk. A4:2026 also deleted Regulation 443.5
              (the risk assessment method) and Annex A443 — you can no longer calculate your way out
              of an SPD, so an SPD is the default position and the omission is the thing that needs
              justifying. EV chargers carry electronic control circuitry that is susceptible to
              surge damage.
            </p>
          </div>
          <div className="border-t border-white/[0.1] pt-4 mt-4">
            <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">Isolation</h4>
            <p className="text-sm leading-relaxed text-white">
              A means of isolation must be provided so the EV circuit can be safely isolated for
              maintenance. This can be the MCB or RCBO in the consumer unit where that is
              accessible.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation and Certification',
    content: (
      <>
        <p>
          Installing an EV charger is notifiable work under Part P of the Building Regulations
          (Approved Document P) because it involves adding a new circuit. Four things need to exist
          when you leave site:
        </p>
        <div className={cardCn}>
          <ol className="list-decimal space-y-3 pl-5 text-white marker:font-semibold marker:text-elec-yellow">
            <li>
              <strong>Electrical Installation Certificate (EIC)</strong> — issued for the new EV
              charging circuit, with full test results: continuity, insulation resistance, polarity,
              earth fault loop impedance, prospective fault current, and RCD verification.
            </li>
            <li>
              <strong>Building Regulations notification</strong> — if registered with a competent
              person scheme, self-certify and notify building control electronically. If not
              registered, building control must be notified separately.
            </li>
            <li>
              <strong>IET CoP installation checklist</strong> — covering earthing arrangement
              verification, open-PEN protection confirmation, load management settings, and charger
              commissioning checks.
            </li>
            <li>
              <strong>OZEV grant documentation</strong> — where the installation is funded or
              part-funded through an OZEV grant such as the Workplace Charging Scheme or EV
              Infrastructure Grant, the grant claim may need additional paperwork.
            </li>
          </ol>
        </div>
        <div className={cardCn}>
          <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
            Part S is a separate obligation from Part P
          </h4>
          <p className="text-sm leading-relaxed text-white">
            On new dwellings and major renovations, Approved Document S (Infrastructure for the
            Charging of Electric Vehicles) applies alongside Part P. Part S requires EV charging
            infrastructure — cable containment and, in some cases, charge points themselves — to be
            installed as part of the building work. It covers new residential buildings with
            associated parking and existing residential buildings undergoing major renovation where
            parking is provided. Satisfying Part P does not satisfy Part S; they are notified and
            assessed independently.
          </p>
        </div>
        <SEOInternalLink href="/guides/building-regulations-electrical">
          See also: Building Regulations Electrical — Approved Document P
        </SEOInternalLink>
      </>
    ),
  },
  {
    id: 'elec-mate-ev',
    heading: 'EV Charger Installations with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate covers the EV charger workflow from load assessment through to certificate
          delivery and invoicing.
        </p>
        <div className={cardCn}>
          <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
            Cable sizing and voltage drop
          </h4>
          <p className="mb-4 text-sm leading-relaxed text-white">
            Enter the charger power, cable type, and run length. Elec-Mate returns the minimum cable
            size with correction factors applied and verifies voltage drop against the Table 4Ab
            limit. Works for single-phase (7 kW) and three-phase (22 kW) chargers.
          </p>
          <div className="border-t border-white/[0.1] pt-4">
            <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
              EV charger certificate
            </h4>
            <p className="text-sm leading-relaxed text-white">
              Dedicated EV installation certificate template with the IET CoP checklist built in:
              earthing verification, open-PEN protection details, load management settings, and full
              test results. Exports as a professional PDF.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Size an EV charger circuit in under a minute"
          description="Cable sizing with Appendix 4 correction factors, voltage drop to Table 4Ab, and an EV charger certificate with the IET CoP checklist built in."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function IETCodeOfPracticeEVPage() {
  return (
    <GuideTemplate
      title="IET Code of Practice EV Charging 5th Edition PDF"
      description="No free official PDF — the 5th Edition (2023) is a copyrighted IET publication. What you certify against is BS 7671 Section 722: PME, open-PEN 5 s at 70 V."
      datePublished="2025-04-20"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Guide"
      badgeIcon={Car}
      heroTitle={
        <>
          IET Code of Practice for EV Charging:{' '}
          <span className="text-elec-yellow">The Complete Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="The 5th Edition Code of Practice explained against BS 7671:2018+A4:2026 Section 722 — load curtailment, PME and open-PEN protection, cable sizing, RCD and AFDD selection, smart charging law, and the paperwork you leave behind."
      readingTime={14}
      answerBox={{
        question: 'What is the IET Code of Practice for EV charging?',
        answer:
          'The IET Code of Practice for Electric Vehicle Charging Equipment Installation, 5th Edition (2023) is the UK industry-standard guidance for installing EV charge points. It sits alongside BS 7671 Section 722 and covers supply arrangements, earthing — especially the PME broken-PEN risk — load and demand management, RCD selection with DC fault detection, and installation, testing and handover.',
        detail:
          'It is guidance, not law, and there is no free official PDF. The requirements you actually certify against are in BS 7671:2018+A4:2026 Section 722 and Annex A722: Reg 722.312.2.1 (no PEN conductor in an EV circuit), Reg 722.411.4.1 (PME not permitted for outdoor charging unless method (b) to (e) is applied, with 5 s disconnection at 70 V RMS under (c)), and Reg 722.311.201 (load curtailment may be counted in maximum demand).',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the IET EV Code of Practice"
      relatedPages={relatedPages}
      ctaHeading="Install EV Chargers with Confidence"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for EV charger installations. Cable sizing, IET CoP checklist, open-PEN verification, and instant certificates. 7-day free trial, cancel anytime."
    />
  );
}
