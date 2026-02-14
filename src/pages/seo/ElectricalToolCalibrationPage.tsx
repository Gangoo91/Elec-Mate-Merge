import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Gauge,
  ShieldCheck,
  Clock,
  AlertTriangle,
  PoundSterling,
  Award,
  FileCheck2,
  ClipboardCheck,
  Wrench,
  CalendarDays,
  Search,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides' },
  { label: 'Tool Calibration', href: '/guides/electrical-tool-calibration' },
];

const tocItems = [
  { id: 'why-calibrate', label: 'Why Calibration Matters' },
  { id: 'calibration-cycle', label: '12-Month Calibration Cycle' },
  { id: 'what-needs-calibrating', label: 'What Needs Calibrating' },
  { id: 'ukas-accredited-labs', label: 'UKAS Accredited Labs' },
  { id: 'what-happens', label: 'What Happens During Calibration' },
  { id: 'calibration-costs', label: 'Calibration Costs' },
  { id: 'between-calibrations', label: 'Between Calibrations' },
  { id: 'scheme-requirements', label: 'Competent Person Scheme Requirements' },
  { id: 'elec-mate-calibration', label: 'Elec-Mate for Calibration Tracking' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Test instrument calibration every 12 months is an industry requirement enforced by competent person schemes (NICEIC, NAPIT, ELECSA) -- using uncalibrated instruments invalidates your test results and certificates.',
  'Calibration must be carried out by a UKAS accredited laboratory or a manufacturer-approved service centre -- a calibration sticker from a non-accredited source is not acceptable to scheme assessors.',
  'During calibration, the laboratory checks every measurement range against traceable reference standards, adjusts the instrument if necessary, and issues a calibration certificate documenting the results.',
  'The typical cost of calibrating a multifunction tester is 60 to 120 pounds including a calibration certificate -- a modest investment considering the cost of invalid test results and potential scheme sanctions.',
  'Elec-Mate tracks calibration dates for all your test instruments, sends automatic reminders before expiry, and stores calibration certificates digitally so they are always available for scheme assessments.',
];

const faqs = [
  {
    question: 'How often should electrical test instruments be calibrated?',
    answer:
      'The standard calibration interval for electrical test instruments used in the UK electrical industry is 12 months. This interval is specified by the competent person schemes (NICEIC, NAPIT, ELECSA) and is the industry-accepted standard. Some instrument manufacturers recommend specific intervals (which may differ from 12 months), and in high-use or harsh environments, more frequent calibration may be appropriate. The 12-month interval applies from the date of the last calibration, not from the date of purchase. If you buy a new instrument, it will typically come with a manufacturer calibration certificate -- the 12-month cycle starts from the date on that certificate.',
  },
  {
    question: 'What happens if I use an uncalibrated instrument?',
    answer:
      'Using an uncalibrated instrument has several consequences. First, the test results may be inaccurate -- an instrument that has drifted out of tolerance could give readings that are too high or too low, leading to incorrect pass or fail decisions. An installation that actually has dangerously high earth fault loop impedance might pass if the instrument reads low, or a perfectly safe installation might fail if the instrument reads high. Second, any certificates issued using uncalibrated instruments are technically invalid. If a competent person scheme assessor discovers that certificates were issued with instruments whose calibration had expired, this is a serious compliance failure that can result in corrective actions, additional inspections, or sanctions. Third, you have no defence if a fault occurs on an installation you tested with uncalibrated instruments -- the test results cannot be relied upon as evidence that the installation was safe at the time of testing.',
  },
  {
    question: 'What is UKAS accreditation and why does it matter?',
    answer:
      'UKAS (United Kingdom Accreditation Service) is the national accreditation body recognised by the government to assess organisations that provide calibration, testing, and certification services. A UKAS accredited calibration laboratory has been independently assessed and verified to operate in accordance with ISO/IEC 17025 (the international standard for the competence of testing and calibration laboratories). The laboratory must demonstrate that its reference standards are traceable to national measurement standards, its staff are competent, its procedures are documented and followed, and its measurement uncertainty is quantified and acceptable. Calibration from a UKAS accredited laboratory provides confidence that the results are accurate, traceable, and internationally recognised. Competent person schemes require calibration from UKAS accredited labs or manufacturer-approved service centres. A calibration sticker from a non-accredited source (a colleague with a reference instrument, a local repair shop) is not acceptable.',
  },
  {
    question: 'Can I calibrate instruments myself?',
    answer:
      'No. Self-calibration is not recognised by competent person schemes and is not acceptable for instruments used to issue electrical certificates. Calibration requires traceable reference standards (which are themselves calibrated to national standards), controlled environmental conditions, documented procedures, and trained metrologists. Even if you own a reference standard, you cannot issue a calibration certificate for your own instruments -- there is no independent verification. The only exceptions are basic checks that you perform between calibrations to verify that the instrument is functioning correctly (sometimes called "performance verification" or "functional checks"). These checks -- for example, verifying that a loop impedance tester gives a sensible reading on a known circuit, or checking that an insulation resistance tester reads correctly on open circuit and short circuit -- are important and should be done regularly, but they are not a substitute for formal calibration.',
  },
  {
    question: 'What instruments need calibrating?',
    answer:
      'Every instrument that you use to take measurements that are recorded on an electrical certificate needs to be calibrated. This includes: multifunction testers (which typically measure insulation resistance, continuity, loop impedance, RCD trip times, and sometimes earth electrode resistance), dedicated loop impedance testers, dedicated insulation resistance testers, dedicated RCD testers, earth electrode resistance testers, voltage indicators (which should comply with GS 38 and be regularly checked, though formal calibration is not always required), proving units for voltage indicators, power quality analysers, and any other measuring instruments used for certification. Non-measuring equipment (such as cable detectors, thermal imaging cameras, and socket testers) does not require formal calibration to the same standard, but should be maintained and checked in accordance with the manufacturer instructions.',
  },
  {
    question: 'How long does calibration take?',
    answer:
      'Turnaround time depends on the calibration laboratory and the time of year. Typical turnaround is 5 to 10 working days from receipt of the instrument to return. Some laboratories offer express services (2 to 3 working days) at a premium. The busiest periods are January and February (when many electricians send instruments for calibration at the start of the year) and September (when competent person scheme assessment season begins). If your instruments all have the same calibration date, consider staggering them so that you always have a calibrated set available while others are being calibrated. Alternatively, some calibration laboratories offer a while-you-wait service at their premises, where you can drop off the instrument in the morning and collect it the same day. This avoids the downtime of being without your instruments.',
  },
  {
    question: 'What if my instrument fails calibration?',
    answer:
      'If the calibration laboratory finds that your instrument is reading outside its specified tolerance, they will normally offer to adjust it (at an additional cost) and then re-test to confirm it is within tolerance. If the instrument cannot be adjusted to bring it within tolerance (due to component failure, wear, or damage), they will report it as a calibration failure. At that point, you need to decide whether to have the instrument repaired (if economically viable) or replace it. If your instrument fails calibration, any test results taken since the last satisfactory calibration are technically unreliable. In practice, if the drift is small and within a reasonable margin, the risk to previous test results is low. However, if the instrument was significantly out of tolerance, you should review any certificates issued since the last calibration and consider whether re-testing is necessary.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-inspection-checklist',
    title: 'Inspection Checklist',
    description:
      'Complete electrical inspection checklist covering visual inspection, consumer unit, bonding, and labelling.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-explained',
    title: 'EICR Explained',
    description:
      'Complete guide to the EICR -- what it covers, the testing process, and when it is needed.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, C3, and FI codes explained with real examples and classification guidance.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-handover-documentation',
    title: 'Handover Documentation',
    description:
      'What documents to provide at handover -- EIC, test results, O&M manual, and drawings.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change-guide',
    title: 'Consumer Unit Change Guide',
    description:
      'Consumer unit replacement -- specification, installation, testing, and certification.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/schedule-manager-electrician',
    title: 'Schedule Manager',
    description: 'Manage your calibration dates alongside job scheduling and PPM reminders.',
    icon: CalendarDays,
    category: 'Business Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-calibrate',
    heading: 'Why Calibration Matters',
    content: (
      <>
        <p>
          Every measurement your test instruments take is the basis for a safety decision. When you
          measure earth fault loop impedance on a circuit and record the result on an{' '}
          <SEOInternalLink href="/guides/eicr-explained">EICR</SEOInternalLink>, you are certifying
          that the circuit will disconnect safely under fault conditions. When you measure
          insulation resistance, you are confirming that the cables are not leaking current that
          could cause electric shock or fire. These measurements must be accurate.
        </p>
        <p>
          Test instruments drift over time. Electronic components age, contacts wear, batteries
          affect readings, and physical knocks can shift calibration. A multifunction tester that
          was perfectly accurate twelve months ago may now be reading 5 percent high or low. For
          most electrical measurements, a 5 percent error is within the tolerance of the instrument
          and causes no practical problem. But if the instrument has developed a larger error, or if
          the measurement is close to the pass or fail threshold, even a small drift can lead to an
          incorrect decision.
        </p>
        <p>
          Calibration verifies that your instruments are still reading within their specified
          accuracy. It provides documented evidence that your test results are reliable, protects
          the validity of every certificate you issue, and satisfies the requirements of your
          competent person scheme. Without current calibration, your instruments are unverified,
          your test results are unreliable, and your certificates are technically invalid.
        </p>
      </>
    ),
  },
  {
    id: 'calibration-cycle',
    heading: 'The 12-Month Calibration Cycle',
    content: (
      <>
        <p>
          The 12-month calibration interval is the industry standard in the UK electrical sector. It
          is not a legal requirement in statute, but it is required by all the major competent
          person schemes (NICEIC, NAPIT, ELECSA) and is referenced in the IET Guidance Note 3
          (Inspection and Testing). Failure to maintain calibration is a compliance failure that can
          trigger scheme sanctions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to send instruments for calibration</strong> -- book calibration before
                the current certificate expires, allowing for turnaround time (typically 5 to 10
                working days). If your calibration expires on 15 March, send the instrument by 1
                March at the latest.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stagger your instruments</strong> -- if you have multiple instruments,
                stagger their calibration dates so that you always have a calibrated set available.
                Send one instrument at a time rather than all of them together.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New instruments</strong> -- a new instrument comes with a manufacturer
                calibration certificate. The 12-month cycle starts from the date on that
                certificate, not from the date you purchased or first used the instrument.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Backup instruments</strong> -- consider having a backup multifunction tester
                that you use when your primary instrument is being calibrated. The backup must also
                be within its calibration period.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The calibration certificate should state the date of calibration, the instrument
          identification (serial number), the tests performed, the results, the measurement
          uncertainty, the reference standards used (with their traceability), and the laboratory
          accreditation number. Keep this certificate and have it available for scheme assessments.
        </p>
      </>
    ),
  },
  {
    id: 'what-needs-calibrating',
    heading: 'What Instruments Need Calibrating',
    content: (
      <>
        <p>
          Any instrument that produces a measurement recorded on an electrical certificate requires
          formal calibration. Here are the instruments that most electricians use and their
          calibration requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multifunction tester (MFT)</strong> -- the primary instrument for most
                electricians. Measures continuity, insulation resistance, earth fault loop
                impedance, RCD trip times, and sometimes earth electrode resistance. Must be
                calibrated every 12 months. The most common instruments in the UK market are from
                Megger, Metrel, Fluke, and Kewtech.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated loop impedance tester</strong> -- if you use a standalone loop
                tester in addition to your MFT, it needs its own calibration. Common if you use a
                2-wire no-trip tester for testing circuits with AFDDs or sensitive RCDs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAT tester</strong> -- portable appliance testers that measure insulation
                resistance, earth bond resistance, and leakage current need calibration if the
                results are recorded on PAT test certificates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode resistance tester</strong> -- required for TT installations
                and earth electrode testing. Needs calibration if used for certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage indicator</strong> -- GS 38 compliant voltage indicators should be
                checked regularly using a proving unit. Formal calibration is recommended but not
                always required by schemes, provided the proving unit confirms correct operation
                before and after each use.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Non-measuring equipment such as cable detectors, thermal imaging cameras, and socket
          testers do not require formal UKAS calibration but should be maintained and checked
          according to the manufacturer instructions.
        </p>
      </>
    ),
  },
  {
    id: 'ukas-accredited-labs',
    heading: 'UKAS Accredited Calibration Laboratories',
    content: (
      <>
        <p>
          Calibration must be carried out by a UKAS accredited laboratory or a manufacturer-approved
          service centre. The key players in the UK electrical instrument calibration market
          include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Instrument manufacturer service centres</strong> -- Megger, Metrel, Fluke,
                and Kewtech all operate calibration service centres (or approved service partners)
                in the UK. Using the manufacturer service centre ensures that any adjustments are
                carried out by trained technicians using the correct procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Independent UKAS accredited laboratories</strong> -- several independent
                laboratories offer electrical instrument calibration services. Check the UKAS
                website for a list of accredited laboratories and verify that their scope of
                accreditation covers the specific measurements your instruments make.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical wholesaler calibration services</strong> -- some electrical
                wholesalers offer calibration services through partnerships with accredited
                laboratories. This can be convenient (drop off when collecting materials) but verify
                that the laboratory doing the actual calibration is UKAS accredited.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When choosing a calibration laboratory, check: UKAS accreditation number and scope (verify
          on the UKAS website), turnaround time, price (including collection and delivery if
          applicable), whether they offer a loan instrument while yours is being calibrated, and
          whether they repair and adjust instruments or only calibrate (report as found). A good
          calibration laboratory will contact you before making any adjustments and will report the
          "as found" readings before and "as returned" readings after adjustment.
        </p>
      </>
    ),
  },
  {
    id: 'what-happens',
    heading: 'What Happens During Calibration',
    content: (
      <>
        <p>
          Understanding the calibration process helps you appreciate what you are paying for and why
          it matters. Here is what a calibration laboratory does when they receive your instrument:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                1
              </span>
              <span>
                <strong>Incoming inspection</strong> -- the instrument is visually inspected for
                physical damage, the battery condition is checked, and the serial number is verified
                against the booking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                2
              </span>
              <span>
                <strong>As-found testing</strong> -- every measurement range is tested against
                traceable reference standards and the readings are recorded. This shows how the
                instrument was performing before any adjustments. These readings are compared
                against the manufacturer specified accuracy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                3
              </span>
              <span>
                <strong>Adjustment (if needed)</strong> -- if any readings are outside the
                manufacturer specified tolerance, the instrument is adjusted to bring it back within
                specification. Some laboratories contact you before adjusting; others adjust as a
                matter of course.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                4
              </span>
              <span>
                <strong>As-returned testing</strong> -- after any adjustments, all ranges are tested
                again to confirm the instrument is now within specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                5
              </span>
              <span>
                <strong>Certificate issue</strong> -- a calibration certificate is issued
                documenting all test results, the reference standards used, the measurement
                uncertainty, and the laboratory accreditation details. A calibration label is
                applied to the instrument showing the calibration date and next due date.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The entire process takes 1 to 3 hours of laboratory time per instrument, depending on the
          number of measurement ranges. The turnaround time you experience (5 to 10 working days)
          includes queuing time, as laboratories process instruments in order of receipt.
        </p>
      </>
    ),
  },
  {
    id: 'calibration-costs',
    heading: 'Calibration Costs',
    content: (
      <>
        <p>
          Calibration is a modest cost relative to the value of the test results it validates. Here
          are typical costs for UK electrical instrument calibration in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multifunction tester</strong> -- 60 to 120 pounds depending on the
                laboratory and whether adjustment is included. Some manufacturers offer annual
                calibration plans at a fixed price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated loop tester or RCD tester</strong> -- 40 to 80 pounds. Simpler
                instruments with fewer measurement ranges cost less to calibrate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAT tester</strong> -- 50 to 90 pounds depending on the model and the number
                of test functions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode resistance tester</strong> -- 50 to 80 pounds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bundle discounts</strong> -- most laboratories offer discounts when you send
                multiple instruments together. A typical bundle of MFT plus loop tester plus PAT
                tester might save 10 to 20 percent compared to individual pricing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Calibration costs are a legitimate business expense and should be included in your{' '}
          <SEOInternalLink href="/tools/electrical-project-cost-estimator">
            overhead calculations
          </SEOInternalLink>{' '}
          when pricing jobs. For a sole trader with a multifunction tester and a PAT tester, annual
          calibration costs are approximately 150 to 200 pounds. That is roughly 15 pence per
          chargeable hour -- negligible compared to the cost of invalid certificates or scheme
          sanctions.
        </p>
      </>
    ),
  },
  {
    id: 'between-calibrations',
    heading: 'Between Calibrations: Functional Checks',
    content: (
      <>
        <p>
          Formal calibration every 12 months does not mean you can ignore your instruments for the
          rest of the year. Regular functional checks between calibrations help you identify
          problems early and maintain confidence in your readings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before every use</strong> -- check the battery condition indicator, verify
                the test leads are in good condition (no damage to insulation, probes, or
                connectors), and perform a basic function check (for example, short the leads and
                verify continuity reads near zero).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage indicator checks</strong> -- always prove the voltage indicator
                against a known source (proving unit) before and after each use, as required by HSE
                guidance GS 38. This is a critical safety procedure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance check</strong> -- with the leads open circuit, the
                instrument should read greater than 999 megohms (or infinity). With the leads
                shorted, it should read near zero. These basic checks confirm the instrument is
                functioning correctly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After a drop or impact</strong> -- if the instrument is dropped or subjected
                to a significant impact, treat it with caution. Perform functional checks and
                consider sending it for calibration early if you have any doubt about its accuracy.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Document your functional checks. A simple log noting the date, the check performed, and
          the result provides evidence that you maintain your instruments between calibrations. This
          demonstrates good practice to scheme assessors and provides a record if questions arise
          about the accuracy of specific test results.
        </p>
      </>
    ),
  },
  {
    id: 'scheme-requirements',
    heading: 'Competent Person Scheme Requirements',
    content: (
      <>
        <p>
          All the major competent person schemes in the UK require their members to use calibrated
          test instruments. The specific requirements vary slightly between schemes, but the
          fundamentals are consistent:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> -- requires all test instruments to be calibrated at least
                every 12 months by a UKAS accredited laboratory. Calibration certificates must be
                available for inspection during scheme assessments. Using uncalibrated instruments
                is a Category A non-compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> -- requires calibration at intervals not exceeding 12 months.
                Calibration must be traceable to national standards. Certificates must be retained
                and available for audit. Non-compliance can result in conditions on membership.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> -- requires calibration every 12 months from a UKAS
                accredited laboratory or manufacturer-approved service centre. Calibration records
                are checked during annual assessment visits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          During a scheme assessment, the assessor will typically ask to see your calibration
          certificates and check the calibration dates against the dates of certificates you have
          issued. If any certificates were issued after the calibration had expired, this is a
          serious finding that can result in corrective action requests, additional inspections, or
          in persistent cases, conditions on or removal from the scheme.
        </p>
        <p>
          The simplest way to avoid calibration compliance issues is to set up reminders that alert
          you 90, 60, and 30 days before each instrument calibration expires. Elec-Mate does this
          automatically for all instruments registered in the system.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-calibration',
    heading: 'Elec-Mate for Calibration Tracking',
    content: (
      <>
        <p>
          Elec-Mate tracks calibration dates for all your test instruments and ensures you never
          issue a certificate with an expired calibration:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <CalendarDays className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automatic Calibration Reminders</h4>
                <p className="text-white text-sm leading-relaxed">
                  Register your instruments with their calibration dates. Elec-Mate sends automatic
                  reminders at 90, 60, 30, and 14 days before each calibration expires. Never be
                  caught out by an expired calibration again.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Digital Calibration Certificate Storage
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Upload calibration certificates to Elec-Mate and they are stored securely in the
                  cloud. When a scheme assessor asks to see your calibration certificates, pull them
                  up on your phone in seconds.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate Validation</h4>
                <p className="text-white text-sm leading-relaxed">
                  When you issue a certificate in Elec-Mate, the system checks that the test
                  instrument used has a valid calibration. If the calibration has expired, you are
                  alerted before issuing the certificate -- preventing invalid certifications.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Track Every Calibration Date"
          description="Register your test instruments, set calibration reminders, store certificates digitally, and get alerts if you try to certify with an expired calibration. Part of the complete Elec-Mate platform."
          icon={Gauge}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalToolCalibrationPage() {
  return (
    <GuideTemplate
      title="Electrical Tool Calibration | When & Why UK Guide"
      description="Complete guide to electrical test instrument calibration. 12-month calibration cycle, UKAS accredited labs, what happens during calibration, costs, scheme requirements, and calibration tracking with Elec-Mate."
      datePublished="2026-01-25"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Electrical Tool Calibration:{' '}
          <span className="text-yellow-400">When and Why UK Guide</span>
        </>
      }
      heroSubtitle="Test instrument calibration every 12 months is an industry requirement. This guide covers the calibration cycle, UKAS accredited labs, what happens during calibration, costs, competent person scheme requirements, and how Elec-Mate tracks calibration dates to keep you compliant."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Tool Calibration"
      relatedPages={relatedPages}
      ctaHeading="Never Miss a Calibration Date"
      ctaSubheading="Automatic calibration reminders, digital certificate storage, and certificate validation. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
