import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { ClipboardList, FileCheck2, Zap, Calculator, CheckCircle2 } from 'lucide-react';

const PAGE_PATH = '/guides/schedule-of-test-results';

// -------------------------------------------------------------------
// Shared presentation classes — edge-to-edge on mobile, inset from sm:
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableWrapCn =
  '-mx-4 my-5 overflow-x-auto rounded-none border-y border-white/[0.14] ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x';

const tableCn = 'w-full min-w-[520px] border-collapse text-left text-[13.5px] text-white';
const thCn = 'px-4 py-3 font-semibold text-white align-bottom';
const tdCn = 'px-4 py-3 text-white align-top';
const trCn = 'border-t border-white/[0.1]';

const subHeadCn = 'mt-6 mb-2 text-[15px] font-semibold tracking-tight text-white';

const breadcrumbs = [
  { label: 'Certificates', href: '/tools/eicr-certificate' },
  { label: 'Schedule of Test Results', href: PAGE_PATH },
];

const tocItems = [
  { id: 'what-is-schedule', label: 'What Is the Schedule of Test Results?' },
  { id: 'what-goes-on-it', label: 'What Goes on Each Schedule?' },
  { id: 'tests-recorded', label: 'Which Tests Are Recorded, and in What Order' },
  { id: 'how-to-complete', label: 'How to Complete It Properly' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'digital-workflow', label: 'Digital Workflow' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The schedule of test results is the part of an EIC or EICR that records the measured value for every circuit, and it is what proves the testing was actually carried out.',
  'Regulation 644.3 requires an Electrical Installation Certificate to include Schedule(s) of Inspection and Schedule(s) of Circuit Details and Schedule(s) of Test Results, based on the models in Appendix 6. Regulation 653.2 imposes the same requirement on a Condition Report, at item (f).',
  'BS 7671:2018+A4:2026 redrafted the old single-page generic schedule into two pages: a Schedule of Circuit Details and a Schedule of Test Results. The Appendix 6 model forms also gained fields for recording SPD and AFDD details.',
  'A4:2026 was issued on 15 April 2026 and may be implemented immediately. A2:2022 + Corrigendum (May 2023) + A3:2024 remains current but is withdrawn on 15 October 2026.',
  'Regulation 643.1 fixes the order: the tests of Regulations 643.2 to 643.6 are carried out in that order before the installation is energised, along with the earth electrode test of 643.7.2 where an electrode is part of the installation.',
  'For RCDs, Regulation 643.8 requires verification with an alternating current test at rated residual operating current (IΔn). Regardless of RCD Type, effectiveness is deemed verified at 300 ms maximum for a general non-delay type, and between 130 ms and 500 ms for a delay "S" type.',
  'The single most common failing is inconsistency: copied values, vague circuit labels, or readings that do not line up with the protective device, the earthing arrangement, or the observations raised elsewhere on the certificate.',
];

const sections = [
  {
    id: 'what-is-schedule',
    heading: 'What Is the Schedule of Test Results?',
    content: (
      <>
        <p>
          The schedule of test results is the section of an electrical certificate that records the
          actual measured results for each circuit. It is where continuity, insulation resistance,
          polarity, earth fault loop impedance, prospective fault current and RCD disconnection time
          are tied back to a specific circuit reference and protective device.
        </p>
        <p>
          It is the evidence layer of the certificate. Regulation 644.3 makes it a condition of an
          Electrical Installation Certificate: the Certificate shall include details of the extent of
          the work covered, plus Schedule(s) of Inspection and Schedule(s) of Circuit Details and
          Schedule(s) of Test Results. Regulation 653.2 does the same for an Electrical Installation
          Condition Report, listing the schedules at item (f). In both cases the schedules shall be
          based on the models in Appendix 6.
        </p>
        <p>
          On an EICR, the schedule works alongside the{' '}
          <SEOInternalLink href="/guides/eicr-schedule-of-inspections">
            schedule of inspections
          </SEOInternalLink>{' '}
          to show both what was observed visually and what was measured by test.
        </p>

        <h3 className={subHeadCn}>What A4:2026 changed</h3>
        <div className={cardCn}>
          <p className="mb-3 font-semibold text-elec-yellow">One schedule became two</p>
          <p className="text-white">
            BS 7671:2018+A4:2026 redrafted the single-page generic schedule of test results used for
            the EIC and EICR. There is now a separate page for the <strong>schedule of circuit
            details</strong> and a separate page for the <strong>schedule of test results</strong>.
            The Appendix 6 model forms also gained fields for recording the details of SPDs and
            AFDDs, and the schedule of inspections was simplified for initial verification.
          </p>
          <p className="mt-3 text-white">
            A4:2026 was issued on 15 April 2026 and may be implemented immediately. BS
            7671:2018+A2:2022 + Corrigendum (May 2023) + A3:2024 remains current but will be
            withdrawn on <strong>15 October 2026</strong> — so the two-page format is the one to
            move onto now.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'what-goes-on-it',
    heading: 'What Goes on Each Schedule?',
    content: (
      <>
        <p>
          The split is a clean one. Circuit details describe how the circuit was designed and
          protected; test results record what the instrument actually read. Between them they let a
          reader check every measured value against the thing it has to comply with.
        </p>

        <h3 className={subHeadCn}>Schedule of circuit details</h3>
        <p>
          Taken from the Appendix 6 model forms, the circuit-details side covers the distribution
          board and the circuit as designed:
        </p>
        <div className={cardCn}>
          <ul className="list-disc space-y-2 pl-5 text-white marker:text-elec-yellow">
            <li>Distribution board reference, location and type.</li>
            <li>Circuit number and circuit description.</li>
            <li>Reference method (see Table 4A2 of Appendix 4).</li>
            <li>
              Cross-sectional area of the live conductors and of the circuit protective conductor.
            </li>
            <li>
              Overcurrent protective device: BS (EN) number, type, rating and breaking capacity.
            </li>
            <li>
              RCD: BS (EN) number, type, rated residual operating current (IΔn) and rated time delay.
            </li>
            <li>SPD and AFDD details — fields added to the model forms at A4:2026.</li>
          </ul>
        </div>
        <p>
          &ldquo;Ring final sockets&rdquo;, &ldquo;upstairs lights&rdquo; or &ldquo;EV charger
          radial&rdquo; is a usable circuit description. &ldquo;Sockets&rdquo; on its own is not,
          because nobody re-testing the board in five years can tell which one you meant.
        </p>

        <h3 className={subHeadCn}>Schedule of test results</h3>
        <p>
          The test-results side records the measurements. The Appendix 6 forms use the standard
          symbols — <strong>R1 + R2</strong> or <strong>R2</strong> for protective conductor
          continuity, <strong>r1</strong>, <strong>rn</strong> and <strong>r2</strong> for the three
          ring final circuit readings, <strong>Zs</strong> for earth fault loop impedance and{' '}
          <strong>Ipf</strong> for prospective fault current.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Recorded value</th>
                <th className={thCn}>Regulation</th>
                <th className={thCn}>What it has to satisfy</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>Continuity — R1 + R2 or R2, and r1 / rn / r2 on ring finals</td>
                <td className={tdCn}>643.2</td>
                <td className={tdCn}>
                  Continuity of protective conductors, including protective bonding conductors, and
                  of live conductors on ring final circuits.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Insulation resistance, plus the test voltage used</td>
                <td className={tdCn}>643.3</td>
                <td className={tdCn}>
                  The minimum values in Table 64. The model form has its own &ldquo;test
                  voltage&rdquo; field — fill it in.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Polarity</td>
                <td className={tdCn}>643.6</td>
                <td className={tdCn}>
                  Verified at the origin before energising, then throughout the installation.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Zs — earth fault loop impedance</td>
                <td className={tdCn}>643.7.3</td>
                <td className={tdCn}>
                  The measured value shall comply with Chapter 41. A continuity test to 643.2 comes
                  first.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Ipf — prospective fault current</td>
                <td className={tdCn}>643.7.3.201</td>
                <td className={tdCn}>
                  Record the greater of the prospective short-circuit current or the prospective
                  earth fault current.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>RCD disconnection time at IΔn</td>
                <td className={tdCn}>643.8</td>
                <td className={tdCn}>
                  Alternating current test at rated residual operating current — see the limits
                  below.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={subHeadCn}>Insulation resistance — Table 64</h3>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Circuit nominal voltage</th>
                <th className={thCn}>Test voltage DC</th>
                <th className={thCn}>Minimum insulation resistance</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>SELV and PELV</td>
                <td className={tdCn}>250 V</td>
                <td className={tdCn}>0.5 MΩ</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Up to and including 500 V, other than the above</td>
                <td className={tdCn}>500 V</td>
                <td className={tdCn}>1.0 MΩ</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Above 500 V</td>
                <td className={tdCn}>1000 V</td>
                <td className={tdCn}>1.0 MΩ</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Regulation 643.3.3 adds a two-stage route where connected equipment is likely to influence
          the measurement or be damaged: test to Table 64 <em>before</em> the equipment is connected,
          then, once it is connected, apply a <strong>250 V DC</strong> test between live conductors
          and the protective conductor connected to the earthing arrangement. That reading shall be
          at least <strong>1 MΩ</strong>. Record which voltage you used — a bare
          &ldquo;&gt;299 MΩ&rdquo; with no test voltage against it is not traceable.
        </p>

        <h3 className={subHeadCn}>RCD disconnection times</h3>
        <p>
          Regulation 643.8 requires the effectiveness of automatic disconnection of supply by RCDs to
          be verified with suitable test equipment to BS EN 61557-6. Its NOTE gives the acceptance
          criteria, and they apply regardless of RCD Type, using an alternating current test at rated
          residual operating current (IΔn):
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>RCD</th>
                <th className={thCn}>Disconnection time at IΔn</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>General, non-delay type</td>
                <td className={tdCn}>300 ms maximum</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Delay &ldquo;S&rdquo; type</td>
                <td className={tdCn}>Between 130 ms minimum and 500 ms maximum</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cardCn}>
          <p className="mb-2 font-semibold text-elec-yellow">
            No half-times and five-times columns
          </p>
          <p className="text-white">
            A4:2026 deleted Appendix 3 Table 3A, which covered the tripping times of RCDs. BS 7671
            sets no ½&times;IΔn or 5&times;IΔn installation test. Those are product-standard tests
            for the device manufacturer. Record the disconnection time at IΔn, note the test current
            you applied, and do not leave a bare &ldquo;trip time&rdquo; with nothing to interpret it
            against.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'tests-recorded',
    heading: 'Which Tests Are Recorded, and in What Order',
    content: (
      <>
        <p>
          Regulation 643.1 does not leave the sequence to preference. The tests of Regulations 643.2
          to 643.6 shall be carried out <strong>in that order, before the installation is
          energised</strong>. Where the installation incorporates an earth electrode, the test of
          Regulation 643.7.2 is also carried out before energising. If a test shows a failure to
          comply, that test and any preceding test whose result may have been influenced shall be
          repeated once the fault is rectified.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Test</th>
                <th className={thCn}>Reg</th>
                <th className={thCn}>Stage</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>Continuity of conductors</td>
                <td className={tdCn}>643.2</td>
                <td className={tdCn}>Before energising</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Insulation resistance</td>
                <td className={tdCn}>643.3</td>
                <td className={tdCn}>Before energising</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Protection by SELV, PELV or electrical separation</td>
                <td className={tdCn}>643.4</td>
                <td className={tdCn}>Before energising</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Insulation resistance / impedance of floors and walls</td>
                <td className={tdCn}>643.5</td>
                <td className={tdCn}>Before energising</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Polarity</td>
                <td className={tdCn}>643.6</td>
                <td className={tdCn}>Before energising</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Earth electrode resistance, where an electrode is fitted</td>
                <td className={tdCn}>643.7.2</td>
                <td className={tdCn}>Before energising</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Earth fault loop impedance</td>
                <td className={tdCn}>643.7.3</td>
                <td className={tdCn}>Live</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Prospective fault current</td>
                <td className={tdCn}>643.7.3.201</td>
                <td className={tdCn}>Live</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Additional protection — RCD verification</td>
                <td className={tdCn}>643.8</td>
                <td className={tdCn}>Live</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Check of phase sequence, on polyphase circuits</td>
                <td className={tdCn}>643.9</td>
                <td className={tdCn}>Live</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Functional testing</td>
                <td className={tdCn}>643.10</td>
                <td className={tdCn}>Live</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Verification of voltage drop</td>
                <td className={tdCn}>643.11</td>
                <td className={tdCn}>
                  Where required by Chapter 52. Not normally required at initial verification.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Filling the schedule in this order is not just compliance housekeeping — it is the order
          that stops you energising a board you have not proved dead-safe first, and it means each
          row is completed while the circuit is still in front of you.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-complete',
    heading: 'How to Complete It Properly',
    content: (
      <>
        <p>
          A good schedule is built from methodical testing, not from filling boxes afterwards.
          Identify the circuit clearly, take the reading, and enter it directly against the correct
          circuit while you are still on site.
        </p>
        <p>
          Follow the Appendix 6 column headings and structure. They are the format scheme assessors
          and clients recognise, and using them stops you omitting a required field such as the
          insulation resistance test voltage or the rated time delay of an &ldquo;S&rdquo; type RCD.
        </p>
        <p>
          The values also have to agree with one another. An R1 + R2 recorded on a lighting radial
          should support the Zs you measured on the same circuit. A slow RCD disconnection time
          should be reflected in an observation or a remedial recommendation. The schedule is not an
          isolated spreadsheet; it has to hold up against the rest of the certificate.
        </p>
        <p>
          One detail that catches people out on an EIC: the maximum prospective fault current
          recorded should be the <strong>greater</strong> of the prospective short-circuit current
          or the prospective earth fault current, not whichever you happened to measure first.
        </p>
        <p>
          If you are working on an EIC or EICR in Elec-Mate, use the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            digital certificate workflow
          </SEOInternalLink>{' '}
          so readings, observations, and exported PDFs all stay linked to the same job.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes That Undermine the Certificate',
    content: (
      <>
        <p>
          The schedule of test results is one of the easiest places for bad habits to show up. Small
          errors here can make an otherwise decent certificate look weak.
        </p>
        <div className={cardCn}>
          <ul className="list-disc space-y-3 pl-5 text-white marker:text-elec-yellow">
            <li>Copying previous readings forward without re-testing the actual circuit.</li>
            <li>
              Mixing up circuit references, or leaving vague labels like &ldquo;sockets&rdquo; with
              nothing to distinguish one circuit from the next.
            </li>
            <li>Entering values that do not match the protective device or the earthing system.</li>
            <li>Leaving blanks with no limitation or explanatory note.</li>
            <li>
              Recording readings on paper, then re-keying them later and introducing transcription
              errors.
            </li>
            <li>
              Omitting the insulation resistance test voltage. The model form has a dedicated field
              for it, and where Regulation 643.3.3 has been used the reading was taken at 250 V DC
              against a 1 MΩ minimum, not at 500 V DC against Table 64 — without the voltage, nobody
              can tell which.
            </li>
            <li>
              Recording an RCD trip time without stating the test current applied, or still using an
              old form with ½&times; and 5&times; columns that A4:2026 removed from BS 7671.
            </li>
            <li>
              Still issuing a combined single-page generic schedule after A4:2026 split it into a
              schedule of circuit details and a schedule of test results.
            </li>
          </ul>
        </div>
        <p>
          The easiest way to tighten this up is to capture results once, in the right place, and let
          the software validate and format them consistently.
        </p>
      </>
    ),
  },
  {
    id: 'digital-workflow',
    heading: 'Why a Digital Schedule of Test Results Is Better',
    content: (
      <>
        <p>
          A digital schedule of test results reduces friction at every stage: less duplicate data
          entry, fewer missed circuits, cleaner exports, and more confidence when the client or
          scheme assessor reviews the certificate.
        </p>
        <p>
          Regulation 644.4.202 already allows certificates to be produced in any written or
          electronic form, provided their authenticity and integrity can be verified by a reliable
          process — so a properly built digital workflow is not a compromise on compliance.
        </p>
        <p>
          In Elec-Mate, the schedule sits inside the certificate flow, so you can move from circuit
          entry to observations, signatures, PDF export, and even remedial quoting without losing
          context. That is particularly useful on larger EICRs where speed and consistency matter.
        </p>
      </>
    ),
  },
];

const howToSteps = [
  {
    name: 'Fill in the circuit details first',
    text: 'Complete the schedule of circuit details — board reference, circuit number and description, reference method, conductor sizes, and the protective device, RCD, SPD and AFDD data — before any reading is taken.',
  },
  {
    name: 'Work through the dead tests in order',
    text: 'Regulation 643.1 requires the tests of 643.2 to 643.6 in that order before energising: continuity, insulation resistance, SELV/PELV/separation, floors and walls, then polarity. Add the earth electrode test of 643.7.2 where an electrode is fitted.',
  },
  {
    name: 'Record the insulation resistance test voltage',
    text: 'Enter the DC test voltage alongside the result — 500 V against a 1.0 MΩ minimum for most low voltage circuits, or 250 V against a 1 MΩ minimum where Regulation 643.3.3 applies after connecting sensitive equipment.',
  },
  {
    name: 'Enter the live results against the same circuit',
    text: 'Add Zs, prospective fault current and the RCD disconnection time at IΔn directly to the correct circuit row. On an EIC, record the greater of the prospective short-circuit and prospective earth fault current.',
  },
  {
    name: 'Check the values agree with the rest of the certificate',
    text: 'Confirm each reading is consistent with the protective device, the earthing arrangement, and any observation or remedial recommendation you have raised, then export the schedules attached to the certificate.',
  },
];

const faqs = [
  {
    question: 'What is the schedule of test results used for?',
    answer:
      'It records the measured test values for each circuit and forms the evidence base of an EIC or EICR. Regulation 644.3 requires an Electrical Installation Certificate to include Schedule(s) of Circuit Details and Schedule(s) of Test Results based on the models in Appendix 6, and Regulation 653.2(f) requires the same on a Condition Report.',
  },
  {
    question: 'Has the schedule of test results changed in BS 7671:2018+A4:2026?',
    answer:
      'Yes. A4:2026 redrafted the single-page generic schedule of test results used for the EIC and EICR into two pages: a separate schedule of circuit details and a separate schedule of test results. The Appendix 6 model forms also gained fields for recording SPD and AFDD details. A4:2026 was issued on 15 April 2026 and may be implemented immediately; A2:2022 with its corrigendum and A3:2024 remains current but is withdrawn on 15 October 2026.',
  },
  {
    question: 'What is the difference between the schedule of circuit details and the schedule of test results?',
    answer:
      'The schedule of circuit details records how the circuit was designed and protected: distribution board reference, circuit number and description, reference method, conductor sizes, and the overcurrent device, RCD, SPD and AFDD data. The schedule of test results records what the instruments measured: continuity, insulation resistance and its test voltage, polarity, Zs, prospective fault current and the RCD disconnection time.',
  },
  {
    question: 'What RCD disconnection time should I record on the schedule?',
    answer:
      'Regulation 643.8 requires verification with an alternating current test at the rated residual operating current, IΔn. Regardless of RCD Type, effectiveness is deemed to have been verified where a general non-delay type disconnects within 300 ms maximum, or a delay "S" type disconnects between 130 ms minimum and 500 ms maximum. Appendix 3 Table 3A, which covered RCD tripping times, was deleted at A4:2026.',
  },
  {
    question: 'In what order should the tests be carried out?',
    answer:
      'Regulation 643.1 requires the tests of Regulations 643.2 to 643.6 to be carried out in that order before the installation is energised: continuity of conductors, insulation resistance, protection by SELV/PELV or electrical separation, insulation resistance of floors and walls, then polarity. Where the installation incorporates an earth electrode, the electrode resistance test of 643.7.2 is also carried out before energising.',
  },
  {
    question: 'Is the schedule of test results the same as the schedule of inspections?',
    answer:
      'No. The schedule of inspections records visual and compliance checks; the schedule of test results records measured electrical test values. Regulation 644.3 requires both to accompany an Electrical Installation Certificate. A4:2026 simplified the schedule of inspections for initial verification and added an example checklist to Appendix 6, which is guidance and is not required to be provided with the certificate.',
  },
  {
    question: 'Do I need to fill every box in the schedule?',
    answer:
      'Complete the schedule appropriately for the certificate type and work scope. If something is genuinely not applicable or limited, say so — on an EICR, Regulation 653.2(b) requires any limitations of the inspection and testing to be recorded, so a blank with no context is the wrong answer.',
  },
  {
    question: 'Can I issue the schedule electronically?',
    answer:
      'Yes. Regulation 644.4.202 allows Electrical Installation Certificates and Minor Electrical Installation Works Certificates to be produced in any written or electronic form, provided their authenticity and integrity are verified by a reliable process or method that also confirms any copy is a true copy of the original.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete EICRs on your phone with digital schedules, observations, and instant PDF export.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate Guide',
    description:
      'Understand when to use an EIC and how the test-results schedule supports the certificate.',
    icon: CheckCircle2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-schedule-of-inspections',
    title: 'EICR Schedule of Inspections',
    description: 'The visual-inspection counterpart to the test-results schedule on an EICR.',
    icon: ClipboardList,
    category: 'Guide',
  },
  {
    href: '/earth-fault-loop-impedance',
    title: 'Earth Fault Loop Impedance',
    description: 'What Zs means, how to test it, and how it fits into certificate test results.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description:
      'Step-by-step guide to completing the full EICR, including schedules and observations.',
    icon: Calculator,
    category: 'Guide',
  },
];

export default function ScheduleOfTestResultsPage() {
  return (
    <GuideTemplate
      title="Schedule of Test Results Guide for Electricians"
      description="What the schedule of test results records: Appendix 6 fields, Regulation 643 test order, RCD and insulation limits, and the A4:2026 two-schedule split."
      datePublished="2026-04-12"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificate Guide"
      badgeIcon={ClipboardList}
      heroTitle={
        <>
          Schedule of Test Results
          <span className="mt-1 block text-elec-yellow">Explained for Electricians</span>
        </>
      }
      heroSubtitle="The page of the certificate that records what you actually measured. Here is what belongs on it, the order Regulation 643.1 requires, and what changed when A4:2026 split it into two schedules."
      readingTime={9}
      answerBox={{
        question: 'What is the schedule of test results on an electrical certificate?',
        answer:
          'It is the page of an EIC or EICR that records the measured value for every circuit — continuity, insulation resistance, polarity, earth fault loop impedance, prospective fault current and RCD disconnection time. Regulation 644.3 requires it on a Certificate and Regulation 653.2(f) on a Condition Report, based on the model forms in Appendix 6.',
        detail:
          'BS 7671:2018+A4:2026 split the old single-page generic schedule in two: a Schedule of Circuit Details for the design and device data, and a Schedule of Test Results for the measured values.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Complete a Better Schedule of Test Results"
      howToDescription="A five-step workflow that follows the Regulation 643.1 test order."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Complete Test Results Properly on Site"
      ctaSubheading="Use Elec-Mate to record circuit results once, validate them as you go, and export professional certificates without duplicate data entry."
    />
  );
}
