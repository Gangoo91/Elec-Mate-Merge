import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Gauge,
  ShieldCheck,
  Wrench,
  Calculator,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared classes
// -------------------------------------------------------------------

/** Card: full-bleed on phones (shell pads px-5), inset and rounded from sm: up. */
const cardCn =
  '-mx-5 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 sm:p-6';

/** Table wrapper: the table scrolls, never the page body. */
const tableWrapCn =
  '-mx-5 my-5 overflow-x-auto border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x';

const tableCn = 'w-full min-w-[34rem] border-collapse text-left text-sm text-white';
const thCn =
  'bg-white/[0.07] px-4 py-3 text-[12px] font-semibold uppercase tracking-wide text-white whitespace-nowrap';
const tdCn = 'border-t border-white/[0.1] px-4 py-3 align-top text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Multifunction Tester Buying Guide', href: '/guides/multifunction-tester-buying-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Minimum Specification' },
  { id: 'what-mft-measures', label: 'What an MFT Measures' },
  { id: 'cat-rating', label: 'CAT IV 300 V Minimum' },
  { id: 'key-features', label: 'Key Features to Look For' },
  { id: 'best-mfts', label: 'Best MFTs for Electricians 2026' },
  { id: 'certification', label: 'Calibration and Traceability' },
  { id: 'for-electricians', label: 'Recording MFT Results with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A multifunction tester (MFT) is a single instrument covering the tests needed to complete an Electrical Installation Certificate (EIC) or Electrical Installation Condition Report (EICR) to BS 7671:2018+A4:2026. Regulation 643.1 requires measuring instruments to be chosen in accordance with the relevant parts of BS EN 61557.',
  'Buy for six functions, not five: continuity, insulation resistance, polarity, earth electrode resistance, earth fault loop impedance with prospective fault current, and RCD testing.',
  'A4:2026 changed RCD testing. Appendix 3 Table 3A was deleted — there is no ½× or 5× requirement in BS 7671. Regulation 643.8 verifies an RCD with an alternating current test at rated residual operating current (IΔn): 300 ms maximum for a general non-delay type, and between 130 ms and 500 ms for a delay "S" type.',
  'A4:2026 also added Regulation 643.3.3 — where connected equipment could influence or be damaged by the test, test to Table 64 before connection, then apply a 250 V DC test after connection with a minimum of 1 MΩ. A 250 V DC range is now a must-have, not a nice-to-have.',
  'For measurements at the origin of the installation, CAT IV 300 V is the minimum rating — and the test leads and probes must carry the same rating as the instrument.',
];

const faqs = [
  {
    question: 'Do I need a separate insulation resistance tester (megger) if I have an MFT?',
    answer:
      'Not for standard domestic and commercial installation testing. A modern MFT includes an insulation resistance function with selectable test voltages of 250 V, 500 V and 1000 V DC, which covers every value in BS 7671 Table 64 (Regulation 643.3.2) and the 250 V DC after-connection test introduced by Regulation 643.3.3 at A4:2026. The term "megger" refers generically to an insulation resistance tester, after the brand that pioneered the instrument. A dedicated tester may still be preferred for specialist work — large motors, high-voltage cables or transformer windings — where a wider test voltage range or higher resolution at very high resistance values is needed. For fixed wiring verification, the MFT function is entirely adequate.',
  },
  {
    question: 'What CAT rating do I need for testing at the consumer unit?',
    answer:
      'CAT IV 300 V minimum. The consumer unit — and anything at the origin of the installation, including the meter tails and service head — sits in a CAT IV environment because it is directly connected to the incoming supply, where the most severe transient overvoltages occur. CAT III is intended for measurements within the building at fixed wiring level: distribution boards, circuits and motor terminals. Older instruments rated CAT III only should not be used for Ze measurements at the meter tails. Check the rating printed on the instrument, and check the leads and probes as well — a CAT IV instrument used with CAT II leads gives you CAT II protection.',
  },
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      'Ze (external earth fault loop impedance) is the impedance of the loop external to the installation — from the supply, through the earth return path of the distribution network, back to the source. It is measured at the origin of the installation, with the installation isolated. Zs is the total earth fault loop impedance at a point in the installation: Ze plus the resistance of the line and protective conductors back to that point (R1 + R2). Zs is what determines whether the protective device will disconnect in the required time. Maximum values are tabulated by device type: Table 41.2 for fuses at 0.4 s, Table 41.3 for circuit-breakers at 0.4 s and 5 s, Table 41.4 for fuses at 5 s, and Table 41.5 for RCDs. Regulation 643.7.3.1 also requires the continuity test of Regulation 643.2 to be carried out before the loop impedance measurement.',
  },
  {
    question: 'What is the no-trip loop test and when do I use it?',
    answer:
      'A conventional earth fault loop impedance test draws a high test current for a few cycles, which will trip a 30 mA RCD. A no-trip (low-current) loop test uses a much smaller test current so the loop impedance of an RCD-protected circuit can be measured without dropping the circuit. Since A4:2026 requires 30 mA RCD protection for socket-outlet circuits up to 32 A (Regulation 411.3.3) and for AC final circuits supplying luminaires in domestic premises (Regulation 411.3.4), almost every final circuit you test in a dwelling will be RCD-protected — so a no-trip loop mode is now essential rather than optional. The trade-off is a longer test time and slightly lower resolution, so use the high-current test where the circuit is not RCD-protected.',
  },
  {
    question: 'Can I use an MFT to test RCBOs?',
    answer:
      'Yes. An RCBO combines the functions of a circuit-breaker and an RCD in one device. It has a rated residual operating current (IΔn) like a standalone RCD, and the MFT RCD test function applies the test current and measures the disconnection time in exactly the same way. Under BS 7671:2018+A4:2026 Regulation 643.8, effectiveness is verified with an alternating current test at IΔn regardless of RCD Type: 300 ms maximum for a general non-delay type. Appendix 3 Table 3A, which previously gave the ½×, 1× and 5× performance criteria, was deleted at A4:2026.',
  },
  {
    question: 'What insulation resistance values are acceptable for fixed wiring?',
    answer:
      'BS 7671 Table 64, applied by Regulation 643.3.2, gives three rows. SELV and PELV circuits: test at 250 V DC, minimum 0.5 MΩ. Circuits up to and including 500 V with the exception of those systems: test at 500 V DC, minimum 1.0 MΩ. Circuits above 500 V: test at 1000 V DC, minimum 1.0 MΩ. Standard domestic and commercial mains circuits therefore fall in the middle row — 500 V DC, 1.0 MΩ. In practice, sound new wiring reads in the hundreds of megohms or higher, so a result close to the 1 MΩ floor is a reason to investigate rather than a pass to be recorded and forgotten. Separately, Regulation 643.3.3 requires that where connected equipment could influence the result or be damaged, the Table 64 test is applied before connection and a 250 V DC test of at least 1 MΩ is applied after connection.',
  },
  {
    question: 'Do domestic lighting circuits now need RCD protection?',
    answer:
      'Yes. BS 7671:2018+A4:2026 introduced Regulation 411.3.4: within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires. It is a new requirement at A4:2026, so on an existing installation the classification of an unprotected lighting circuit on an EICR is a matter for the inspector\'s judgement of the actual risk, recorded with reasons — not an automatic code. For buying purposes the practical consequence is simple: expect to RCD-test far more circuits per job, and expect most lighting circuits to need a no-trip loop test.',
  },
  {
    question: 'How often does an MFT need to be calibrated?',
    answer:
      'Guidance Note 3 requires instruments to be calibrated periodically, following the manufacturer\'s procedures and recommended interval, with the calibration traceable to National Standards. In UK practice that interval is normally 12 months. GN3 also allows intermediate checks between calibrations — comparing readings against another instrument, or against a proprietary check box with clearly defined characteristics — to catch gross errors, but it is explicit that these are not a substitute for formal periodic calibration. If an instrument is dropped, submerged or otherwise subjected to physical shock, take it out of service and have it calibrated before further use; a shift in a precision measurement circuit leaves no visible sign.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/multimeter-guide-electricians',
    title: 'Multimeter Guide for Electricians',
    description: 'CAT ratings, True RMS, and the best digital multimeters for professional use.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'How to Test Insulation Resistance',
    description: 'Step-by-step insulation resistance testing procedure for fixed wiring.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on site from your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Condition reports with AI board scanning and schedule of test results.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Verify maximum Zs compliance using measured Ze and R1+R2 values.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/inspection-testing-course',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured modules covering all MFT functions.',
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
    heading: 'The Minimum Specification for UK Installation Testing',
    content: (
      <>
        <p>
          Every MFT on sale claims to be "18th Edition" or "A4 ready". That tells you nothing. What
          matters is whether the instrument can perform each test BS 7671 actually calls for, to the
          performance the standard and Guidance Note 3 expect. Regulation 643.1 puts it plainly:
          measuring instruments shall be chosen in accordance with the relevant parts of BS EN 61557,
          and if other equipment is used it shall provide no lesser degree of performance and safety.
        </p>
        <p>
          Check a shortlisted instrument against this specification before you look at the price.
        </p>

        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn} scope="col">
                  Capability
                </th>
                <th className={thCn} scope="col">
                  Minimum to look for
                </th>
                <th className={thCn} scope="col">
                  Why
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdCn}>Safety rating</td>
                <td className={tdCn}>CAT IV 300 V — instrument, leads and probes</td>
                <td className={tdCn}>Ze and PFC are measured at the origin of the installation</td>
              </tr>
              <tr>
                <td className={tdCn}>Continuity</td>
                <td className={tdCn}>
                  No-load 4–24 V, short-circuit current ≥200 mA, range 0.2–2 Ω, resolution 0.01 Ω
                </td>
                <td className={tdCn}>GN3 4.8 recommendation; met by BS EN IEC 61557-4 instruments</td>
              </tr>
              <tr>
                <td className={tdCn}>Insulation resistance</td>
                <td className={tdCn}>250 V, 500 V and 1000 V DC ranges</td>
                <td className={tdCn}>
                  Table 64 (Reg 643.3.2), plus the 250 V DC after-connection test of Reg 643.3.3
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Loop impedance</td>
                <td className={tdCn}>High-current and low-current (no-trip) modes</td>
                <td className={tdCn}>
                  Zs on RCD-protected circuits, compared with Tables 41.2 to 41.5
                </td>
              </tr>
              <tr>
                <td className={tdCn}>RCD testing</td>
                <td className={tdCn}>
                  AC test at IΔn, with timing for general non-delay and delay "S" types
                </td>
                <td className={tdCn}>Reg 643.8, verified with equipment to BS EN 61557-6</td>
              </tr>
              <tr>
                <td className={tdCn}>Prospective fault current</td>
                <td className={tdCn}>Both PSCC and PEFC, single- and three-phase</td>
                <td className={tdCn}>Reg 643.7.3.201</td>
              </tr>
              <tr>
                <td className={tdCn}>Earth electrode resistance</td>
                <td className={tdCn}>
                  Built-in RA test, or budget for a separate earth tester if you work on TT
                </td>
                <td className={tdCn}>Reg 643.7.2, wherever the installation has its own electrode</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Without an MFT covering these functions, completing an Electrical Installation Certificate
          (EIC) or Electrical Installation Condition Report (EICR) to the required standard is not
          possible. Before MFTs became common, electricians carried separate instruments for each
          test — a dedicated insulation resistance tester, a loop impedance tester and a continuity
          tester. Consolidating them cuts what you carry and keeps every test on one calibration
          record.
        </p>
      </>
    ),
  },
  {
    id: 'what-mft-measures',
    heading: 'What an MFT Measures, and the Regulation Behind Each Test',
    content: (
      <>
        <p>
          Regulation 643.1 sets the order: the tests of Regulations 643.2 to 643.6 are carried out in
          that order before the installation is energised, and the earth electrode test of Regulation
          643.7.2 is also carried out before energising. Everything from 643.7 onwards is a live
          test.
        </p>

        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn} scope="col">
                  Test
                </th>
                <th className={thCn} scope="col">
                  Reg
                </th>
                <th className={thCn} scope="col">
                  What the MFT does
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdCn}>Continuity of conductors</td>
                <td className={tdCn}>643.2</td>
                <td className={tdCn}>
                  Low-resistance measurement of protective and bonding conductors, and of live
                  conductors on ring final circuits (R1, Rn, R2). Null the leads first. GN3 4.8
                  recommends a source able to deliver at least 200 mA short-circuit current, so the
                  reading reflects the conductor rather than an oxide layer on a connection.
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Insulation resistance</td>
                <td className={tdCn}>643.3</td>
                <td className={tdCn}>
                  DC test between live conductors, and between live conductors and the protective
                  conductor, on an isolated circuit. Test voltage and minimum value come from Table
                  64. New at A4:2026, Regulation 643.3.3 adds a 250 V DC test of at least 1 MΩ after
                  connecting equipment that could be damaged by the full test.
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Polarity</td>
                <td className={tdCn}>643.6</td>
                <td className={tdCn}>
                  Verified before energising, and confirmed again on the live tests. Single-pole
                  devices must be in the line conductor only.
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Earth electrode resistance</td>
                <td className={tdCn}>643.7.2</td>
                <td className={tdCn}>
                  Where the earthing system includes an electrode, its resistance to Earth is
                  measured. Where that is not practicable, the measured external loop impedance may
                  be used instead.
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Earth fault loop impedance</td>
                <td className={tdCn}>643.7.3.1</td>
                <td className={tdCn}>
                  Ze at the origin, Zs at each point. A live test: the MFT injects a current and
                  measures the resulting voltage change. The continuity test of 643.2 must be done
                  first. Measured Zs must comply with Chapter 41 — Table 41.2 (fuses, 0.4 s), 41.3
                  (circuit-breakers, 0.4 s and 5 s), 41.4 (fuses, 5 s) and 41.5 (RCDs).
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Prospective fault current</td>
                <td className={tdCn}>643.7.3.201</td>
                <td className={tdCn}>
                  Prospective short-circuit current and prospective earth fault current, measured or
                  determined at the origin and other relevant points. Devices must be able to break
                  the prospective fault current at their point of installation (Reg 432.1), unless
                  back-up protection to Regulation 434.5.1 applies.
                </td>
              </tr>
              <tr>
                <td className={tdCn}>RCD operation</td>
                <td className={tdCn}>643.8</td>
                <td className={tdCn}>
                  Verified using test equipment to BS EN 61557-6. Regardless of RCD Type,
                  effectiveness is deemed verified where the device disconnects within the stated
                  time under an alternating current test at IΔn.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 mb-3 text-[15px] font-semibold tracking-tight text-white">
          RCD testing changed at A4:2026 — check what the instrument prompts for
        </h3>
        <p>
          Appendix 3 Table 3A, which gave time/current performance criteria for RCDs, was deleted at
          A4:2026. There is no longer a ½× non-operating test or a 5× trip test in BS 7671. A single
          alternating current test at the rated residual operating current is what verifies the
          device:
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn} scope="col">
                  RCD type
                </th>
                <th className={thCn} scope="col">
                  Test
                </th>
                <th className={thCn} scope="col">
                  Disconnection time
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdCn}>General, non-delay</td>
                <td className={tdCn}>AC test at IΔn</td>
                <td className={tdCn}>300 ms maximum</td>
              </tr>
              <tr>
                <td className={tdCn}>Delay "S" type</td>
                <td className={tdCn}>AC test at IΔn</td>
                <td className={tdCn}>Between 130 ms minimum and 500 ms maximum</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The 5×IΔn test still exists in GN3 as an optional test for fault-finding on RCDs rated 30
          mA or less, and 40 ms remains a product-standard figure — but it is not an installation
          verification requirement, and GN3 notes that where a manufacturer declares a different test
          current, a failure to trip within 40 ms at 5×IΔn does not by itself make the device faulty.
          An instrument that still walks you through a mandatory ½× / 1× / 5× sequence is working to
          the superseded criteria; make sure you can select and record the 1×IΔn AC result on its
          own.
        </p>
      </>
    ),
  },
  {
    id: 'cat-rating',
    heading: 'CAT IV 300 V Minimum: Why It Matters at the Origin',
    content: (
      <>
        <p>
          The measurement category (CAT) system in BS EN IEC 61010-1 describes the transient
          overvoltage environment an instrument is built to survive. The rating has two halves and
          both matter: the category tells you where in the installation it may be used, and the
          voltage tells you the working voltage to earth it is rated for. A CAT IV instrument is
          designed for the origin of the installation, where transients arrive from the supply
          network with very little impedance to limit them.
        </p>
        <div className={cardCn}>
          <ul className="space-y-5 text-white">
            <li>
              <strong className="block text-white">
                CAT IV is the origin of the installation
              </strong>
              <span className="text-white">
                Meter tails, service head, the supply cable from the street — this is where Ze and
                prospective fault current are measured, and it is the most severe transient
                environment in the building. CAT III covers measurements downstream at fixed wiring
                level: distribution boards, final circuits, motor terminals. A CAT III instrument
                used at the service head can fail internally under a severe transient, and an
                instrument failure at that point is a fault at the incoming supply with the operator
                holding it.
              </span>
            </li>
            <li>
              <strong className="block text-white">Check the number as well as the category</strong>
              <span className="text-white">
                A category alone is not a rating — CAT IV 300 V and CAT IV 600 V are tested to
                different impulse withstand levels. Read the instrument's own specification for the
                impulse figure it is certified to, rather than assuming one category always beats
                another. For UK single-phase and 400 V three-phase installation work, CAT IV 300 V is
                the minimum you should accept.
              </span>
            </li>
            <li>
              <strong className="block text-white">
                The leads and probes are part of the rating
              </strong>
              <span className="text-white">
                Test leads, probes, crocodile clips and adapters all carry their own CAT rating, and
                the assembly is only as good as its weakest part. A CAT IV instrument used with CAT
                II leads gives CAT II protection. Use manufacturer-supplied leads or rated
                equivalents, replace them when the insulation is damaged, and check the fuse rating
                in fused probes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Modern professional MFTs from Megger, Kewtech, Metrel and Fluke are rated at CAT IV 300 V
          or better as standard. Older instruments are the risk — if you have inherited or bought
          second-hand, read the label before you take it near a service head, and confirm the current
          rating against the manufacturer's published specification.
        </p>
      </>
    ),
  },
  {
    id: 'key-features',
    heading: 'Key Features to Look for When Buying an MFT',
    content: (
      <>
        <p>
          Beyond the core measurement functions and the CAT rating, these are the features that
          separate a good professional instrument from a basic one — roughly in the order they will
          affect your working day.
        </p>
        <div className={cardCn}>
          <ul className="space-y-5 text-white">
            <li>
              <strong className="block text-white">No-trip (low-current) loop test</strong>
              <span className="text-white">
                The single most useful feature on a modern MFT. A conventional high-current loop test
                will trip a 30 mA RCD, and since A4:2026 almost every final circuit in a dwelling is
                RCD-protected. A low-current loop mode measures Zs without dropping the circuit. It
                is slower and slightly less precise, so keep the high-current test for circuits that
                are not RCD-protected.
              </span>
            </li>
            <li>
              <strong className="block text-white">Memory and data logging</strong>
              <span className="text-white">
                Store results in the instrument and download by USB or Bluetooth rather than
                transcribing readings from a notepad. Fewer transcription errors, and a faster route
                from the board to a finished schedule of test results.
              </span>
            </li>
            <li>
              <strong className="block text-white">Continuity test current</strong>
              <span className="text-white">
                GN3 4.8 recommends a source with a no-load voltage of 4–24 V and a short-circuit
                current of not less than 200 mA, with a measuring range of 0.2–2 Ω and a resolution
                of 0.01 Ω on digital instruments. Instruments conforming to BS EN IEC 61557-4 meet
                this. Budget instruments that drive less current can read optimistically through a
                poor joint — check the specification, not the marketing.
              </span>
            </li>
            <li>
              <strong className="block text-white">Temperature correction for Zs</strong>
              <span className="text-white">
                The maximum permissible measured Zs values in the On-Site Guide Tables B1–B6 assume a
                10 °C ambient; the note to OSG 1.08 requires the Table B8 ambient correction factor
                to be applied when circuit loop impedances are measured at any other temperature. GN3
                does the same through its Table A8 for the Appendix A values. An instrument that
                accepts a conductor or ambient temperature saves doing that by hand on every circuit.
              </span>
            </li>
            <li>
              <strong className="block text-white">RCD Type coverage</strong>
              <span className="text-white">
                Type AC is no longer enough on its own. EV charging equipment, inverters and variable
                speed drives commonly call for Type A, Type F or Type B devices, and Regulation 643.8
                applies regardless of RCD Type. Check the instrument tests the Types you actually
                meet, and that it handles delay "S" devices with their 130–500 ms window.
              </span>
            </li>
            <li>
              <strong className="block text-white">Battery life and charging</strong>
              <span className="text-white">
                A rechargeable pack with USB or mains charging avoids the flat-battery afternoon.
                Loop and RCD tests are the heaviest drain, so judge battery claims on the number of
                loop tests per charge rather than standby hours.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'best-mfts',
    heading: 'Best Multifunction Testers for Electricians 2026',
    content: (
      <>
        <p>
          Four instruments dominate the UK market, and they separate on data handling and RCD Type
          coverage rather than on basic accuracy. Prices below are indicative street prices and move
          with retailer promotions and kit bundles — confirm the current price and the current
          published specification with the manufacturer or supplier before ordering.
        </p>

        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn} scope="col">
                  Model
                </th>
                <th className={thCn} scope="col">
                  Best for
                </th>
                <th className={thCn} scope="col">
                  Indicative price
                </th>
                <th className={thCn} scope="col">
                  Stands out for
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdCn}>Megger MFT1741</td>
                <td className={tdCn}>All-round professional use</td>
                <td className={tdCn}>~£450</td>
                <td className={tdCn}>On-board memory and PC download; the UK benchmark</td>
              </tr>
              <tr>
                <td className={tdCn}>Fluke 1664 FC</td>
                <td className={tdCn}>Wireless logging to the office</td>
                <td className={tdCn}>~£600</td>
                <td className={tdCn}>Fluke Connect app, large colour display</td>
              </tr>
              <tr>
                <td className={tdCn}>Kewtech KT64 DL</td>
                <td className={tdCn}>Value with data logging</td>
                <td className={tdCn}>~£320</td>
                <td className={tdCn}>Memory and USB download at a sole-trader price</td>
              </tr>
              <tr>
                <td className={tdCn}>Metrel MI3102H</td>
                <td className={tdCn}>Specialist and inspection work</td>
                <td className={tdCn}>~£550</td>
                <td className={tdCn}>Broad RCD Type coverage including Type B</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-5 space-y-4">
          <div className={cardCn}>
            <h3 className="mb-2 text-base font-semibold tracking-tight text-white">
              Megger MFT1741 — best overall
            </h3>
            <p className="text-sm leading-relaxed text-white">
              All the core functions plus insulation autosequence, prospective fault current, and
              voltage and frequency measurement. Rechargeable battery, on-board memory and PC
              download software, with a Bluetooth variant available. Megger is the original name in
              UK electrical testing and the MFT1741 is the instrument most 2391 candidates and most
              contractors end up on. UKAS-accredited calibration is offered by the manufacturer.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-2 text-base font-semibold tracking-tight text-white">
              Fluke 1664 FC — best for wireless logging
            </h3>
            <p className="text-sm leading-relaxed text-white">
              All the standard functions plus Fluke Connect wireless logging over Bluetooth to the
              Fluke Connect app, so results can reach the office while you are still on site. Worth
              the premium if someone else types your certificates; less compelling if you write them
              up yourself on the phone. Large colour display and a straightforward interface.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-2 text-base font-semibold tracking-tight text-white">
              Kewtech KT64 DL — best value with data logging
            </h3>
            <p className="text-sm leading-relaxed text-white">
              All the standard functions with on-board memory and USB download, from a well-regarded
              UK brand, at a noticeably lower price than the Megger or Fluke equivalents. Compatible
              with Kewtech's PC reporting software. The sensible choice for a sole trader who wants
              logging without paying for wireless.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-2 text-base font-semibold tracking-tight text-white">
              Metrel MI3102H — best for advanced users
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Full MFT functionality plus wider RCD Type coverage — Type A, B, F and delay "S" — and
              Bluetooth. That matters where EV charging equipment and drives put Type B devices on
              the board. Metrel's PC software handles report generation. Favoured by testing
              specialists and inspection firms rather than general installers.
            </p>
          </div>
        </div>

        <SEOAppBridge
          title="Enter MFT test results straight into your EIC or EICR"
          description="Elec-Mate's schedule of test results accepts Ze, Zs, RCD disconnection times, insulation resistance and continuity readings."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'Calibration and Traceability',
    content: (
      <>
        <p>
          Guidance Note 3 (section 4.8) is the reference here. Instruments used for inspection and
          testing shall be calibrated periodically — or, as appropriate, checked against reference
          parameters under known conditions — following the manufacturer's procedures and recommended
          interval, and the calibration shall be traceable to National Standards. The type and
          frequency of recalibration or checking is to be recorded and applied. In UK practice that
          interval is normally 12 months.
        </p>
        <div className={cardCn}>
          <ul className="space-y-5 text-white">
            <li>
              <strong className="block text-white">Traceability to National Standards</strong>
              <span className="text-white">
                The point of a calibration certificate is the unbroken chain of comparisons back to a
                national measurement standard. UKAS accredits calibration laboratories to ISO/IEC
                17025, and a UKAS certificate is the strongest evidence that the instrument was
                calibrated by a competent laboratory. Megger, Fluke and Kewtech all offer UKAS
                calibration.
              </span>
            </li>
            <li>
              <strong className="block text-white">Intermediate checks between calibrations</strong>
              <span className="text-white">
                GN3 allows checks between formal calibrations — comparing readings against another
                instrument known to be accurate, or against a proprietary check box with clearly
                defined characteristics. These catch gross errors early. GN3 is explicit that they
                are not a substitute for periodic calibration traceable to National Standards.
              </span>
            </li>
            <li>
              <strong className="block text-white">After a drop, recalibrate</strong>
              <span className="text-white">
                If an instrument is dropped from height, submerged, or otherwise physically shocked,
                take it out of service and have it calibrated before further use. Precision
                measurement circuits can shift without a mark on the case, and every certificate
                issued on the readings afterwards inherits the error.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Keep the certificate with the instrument or in your test records, and check the calibration
          due date before each job. Where your results are relied on as evidence of compliance — for
          building control, insurance or a dispute — the certificate is what makes the numbers
          defensible.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Recording MFT Results with Elec-Mate',
    content: (
      <>
        <p>
          The MFT produces the measurements. Elec-Mate is the certification workflow that records,
          checks and issues them.
        </p>
        <div className="my-5 space-y-4">
          <div className={cardCn}>
            <h3 className="mb-2 text-base font-semibold tracking-tight text-white">
              EIC schedule of test results
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Enter Ze, Zs, RCD disconnection times, insulation resistance and continuity values into
              the{' '}
              <SEOInternalLink href="/eic-certificate">EIC schedule of test results</SEOInternalLink>{' '}
              on your phone. Voice entry lets you record readings hands-free while you are still
              holding the instrument.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-2 text-base font-semibold tracking-tight text-white">
              Automatic Zs compliance check
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Measured Zs is compared against the maximum for the protective device and rating —
              Table 41.2 for fuses at 0.4 s, Table 41.3 for circuit-breakers, Table 41.4 for fuses at
              5 s and Table 41.5 for RCDs. Out-of-compliance circuits are flagged before the
              certificate is issued, not after.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-2 text-base font-semibold tracking-tight text-white">
              Board scanner with AI recognition
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Photograph the distribution board and let the AI populate the circuit schedule — device
              ratings, types and descriptions — then add your MFT readings to each row. It removes
              most of the typing from a full board.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EIC and EICR certificates with your MFT results on site"
          description="Join 1,000+ UK electricians using Elec-Mate for MFT result entry, automatic Zs compliance checking, and professional EIC and EICR certification."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MFTBuyingGuidePage() {
  return (
    <GuideTemplate
      title="Multifunction Tester (MFT) Buying Guide 2026"
      description="How to choose a multifunction tester (MFT): the BS 7671 A4:2026 tests it must cover, CAT IV 300 V rating, calibration, and the best MFTs in 2026."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tools & Equipment Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Multifunction Tester Buying Guide:{' '}
          <span className="text-yellow-400">Best MFTs for UK Electricians 2026</span>
        </>
      }
      heroSubtitle="What an MFT must be able to do under BS 7671:2018+A4:2026, why CAT IV 300 V is the minimum safety rating, what changed for RCD and insulation resistance testing at A4, and the four instruments worth shortlisting."
      answerBox={{
        question: 'What should I look for when buying a multifunction tester?',
        answer:
          'Buy an MFT rated CAT IV 300 V with instruments and leads to match, covering continuity (≥200 mA), insulation resistance at 250, 500 and 1000 V DC, high-current and no-trip loop impedance, RCD testing at IΔn, prospective fault current and earth electrode resistance.',
        detail:
          'BS 7671:2018+A4:2026 Regulation 643.1 requires measuring instruments to be chosen in accordance with the relevant parts of BS EN 61557. A4:2026 deleted Appendix 3 Table 3A, so RCDs are verified by an alternating current test at IΔn — 300 ms maximum for a general non-delay type — and Regulation 643.3.3 added a 250 V DC insulation resistance test after equipment is connected, with a minimum of 1 MΩ.',
      }}
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Multifunction Testers"
      relatedPages={relatedPages}
      ctaHeading="Record MFT Test Results and Issue EIC Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to enter MFT readings into EIC and EICR schedules, auto-check Zs compliance, and generate professional certificates on site. 7-day free trial."
    />
  );
}
