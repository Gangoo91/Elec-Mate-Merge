import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ClipboardList,
  FileCheck2,
  Zap,
  Calculator,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const PAGE_PATH = '/guides/schedule-of-test-results';

const breadcrumbs = [
  { label: 'Certificates', href: '/tools/eicr-certificate' },
  { label: 'Schedule of Test Results', href: PAGE_PATH },
];

const tocItems = [
  { id: 'what-is-schedule', label: 'What Is the Schedule of Test Results?' },
  { id: 'what-goes-on-it', label: 'What Goes on the Schedule?' },
  { id: 'how-to-complete', label: 'How to Complete It Properly' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'digital-workflow', label: 'Digital Workflow' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The schedule of test results is the part of an EIC, EICR, or similar certificate that records the measured values for each circuit and proves testing was actually carried out.',
  'BS 7671:2018+A4:2026 (Reg 722.826.3.201) redrafted the single-page generic schedule into two separate documents: a Schedule of Circuit Details and a Schedule of Test Results. Practitioners must use the updated forms for EIC and EICR documentation.',
  'The model forms for both schedules are defined in Appendix 6 of BS 7671, as required by Reg 644.3. Always base your schedules on those models.',
  'Good schedules are clear, circuit-specific, and consistent with the protective device, earthing arrangement, and certificate type.',
  'The most common problems are guessed values, incomplete circuits, mixed-up circuit references, and readings that do not match the observations or design information.',
  'Digital completion is faster and more reliable because the software can validate ranges, carry forward data, and link readings directly to the certificate.',
  'For Elec-Mate, the schedule of test results is not just paperwork; it is the foundation for compliant certificates, cleaner PDFs, and faster remedial quoting.',
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
          polarity, loop impedance, RCD performance, and related values are tied back to a specific
          circuit reference and protective device.
        </p>
        <p>
          In other words, it is the evidence layer of the certificate. Without a clear schedule of
          test results, the certificate becomes difficult to trust because there is no structured
          record of what was actually tested and what values were obtained.
        </p>
        <p>
          On an EICR, the schedule works alongside the{' '}
          <SEOInternalLink href="/guides/eicr-schedule-of-inspections">
            schedule of inspections
          </SEOInternalLink>{' '}
          to show both what was observed visually and what was measured by test.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-5 my-4">
          <p className="text-yellow-300 font-semibold mb-2">
            A4:2026 Change — Two Separate Schedules
          </p>
          <p className="text-white text-sm">
            BS 7671:2018+A4:2026 (Reg 722.826.3.201) has redrafted the single-page generic schedule
            used for EIC and EICR documentation. The single form has been split into two separate
            documents: a <strong>Schedule of Circuit Details</strong> and a{' '}
            <strong>Schedule of Test Results</strong>. Both are based on the model forms in Appendix
            6 of BS 7671 (Reg 644.3). Practitioners must use the updated separate forms — a combined
            single-page schedule no longer meets the standard.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'what-goes-on-it',
    heading: 'What Goes on the Schedule of Test Results?',
    content: (
      <>
        <p>
          The exact layout varies by certificate type, but the schedule normally includes the
          circuit reference, description, conductor details, protective device details, and the key
          measured test values for that circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit identification</strong> such as "ring final sockets", "upstairs
                lights", or "EV charger radial".
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective device details</strong> including device type, rating, and where
                relevant the maximum Zs value it must comply with.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead test results</strong> such as continuity (R1+R2 and Rz — the measured
                resistance of the circuit protective conductor), insulation resistance, and
                polarity. GN3 Reg 2.15 requires Rz to be recorded as its own field on the schedule.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live test results</strong> such as Zs, Ze where relevant, PFC/PSCC, and RCD
                trip times. For RCDs, BS 7671 requires a test at <strong>1&times;I&Delta;n</strong>{' '}
                (with the instrument set to Type AC where available) and the result must be recorded
                in the schedule (GN3 Reg 4.7). The 0.5&times; and 5&times;I&Delta;n tests are
                additional; do not record only a single generic &ldquo;trip time&rdquo; without
                noting the test current applied.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Those values need to make sense together. A schedule filled with numbers that do not fit
          the circuit, earthing arrangement, or device type is one of the quickest ways to make a
          certificate look careless.
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
          A good schedule is built from methodical testing, not from filling boxes afterwards. The
          best workflow is to identify the circuit clearly, take the reading, and enter it directly
          against the correct circuit while you are still on site.
        </p>
        <p>
          The model forms for the schedule are defined in <strong>Appendix 6 of BS 7671</strong>{' '}
          (required by Reg 644.3). Your schedule should follow those column headings and structure —
          they are the format scheme assessors and clients recognise and expect. Using the Appendix
          6 layout also ensures you do not omit a required field such as Rz or the insulation
          resistance test voltage.
        </p>
        <p>
          For example, if you record R1+R2 on a lighting radial, that value should later support the
          Zs result and the overall assessment of the circuit. If an RCD trip time is slow, that
          should align with any observation or remedial recommendation. The schedule is not an
          isolated spreadsheet; it has to agree with the rest of the certificate.
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
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Copying previous readings forward without re-testing the actual circuit.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Mixing up circuit references or leaving vague labels like "sockets" only.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Entering values that do not match the protective device or earthing system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Leaving blanks with no limitation or explanatory note.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Recording readings on paper, then re-keying them later and introducing transcription
                errors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Omitting the test voltage when a reduced insulation resistance test (250 V DC) was
                used for sensitive equipment. GN3 Reg 2.24 requires the actual test voltage to be
                recorded on the schedule; without it, the result has no traceability.
              </span>
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
          In Elec-Mate, the schedule sits inside the certificate flow, so you can move from circuit
          entry to observations, signatures, PDF export, and even remedial quoting without losing
          context. That is particularly useful on larger EICRs where speed and consistency matter.
        </p>
        <p>
          If you regularly complete certificates on site, the goal is simple: one set of accurate
          readings, one clean record, one professional output.
        </p>
      </>
    ),
  },
];

const howToSteps = [
  {
    name: 'Identify the circuit correctly',
    text: 'Use a clear circuit reference and description before entering any readings so later values can be trusted and traced.',
  },
  {
    name: 'Record dead test results first',
    text: 'Enter continuity, insulation resistance, and polarity in a consistent order while the circuit details are still in front of you.',
  },
  {
    name: 'Enter live test results against the same circuit',
    text: 'Add Zs, PFC/PSCC, and RCD values directly to the correct circuit row rather than keeping them on loose notes.',
  },
  {
    name: 'Check the values make sense',
    text: 'Review whether the readings align with the protective device, earthing arrangement, and any observations you have raised.',
  },
  {
    name: 'Export as part of the full certificate',
    text: 'Keep the schedule attached to the certificate so the client receives one coherent record rather than disconnected test notes.',
  },
];

const faqs = [
  {
    question: 'What is the schedule of test results used for?',
    answer:
      'It records the measured test values for each circuit and forms the evidence base of an EIC, EICR, or similar certificate. It shows what was tested and what results were obtained.',
  },
  {
    question: 'Has the schedule of test results changed in BS 7671:2018+A4:2026?',
    answer:
      'Yes. BS 7671:2018+A4:2026 (Reg 722.826.3.201) redrafted the single-page generic schedule into two separate documents: a Schedule of Circuit Details and a Schedule of Test Results. Both must be based on the model forms in Appendix 6 of BS 7671 (Reg 644.3). Using an old combined single-page schedule no longer meets the standard.',
  },
  {
    question: 'Is the schedule of test results the same as the schedule of inspections?',
    answer:
      'No. The schedule of inspections records visual and compliance checks. The schedule of test results records measured electrical test values. On an EICR, both are important and work together.',
  },
  {
    question: 'Do I need to fill every box in the schedule?',
    answer:
      'You need to complete the schedule appropriately for the certificate type and work scope. If something is genuinely not applicable or limited, that should be explained clearly rather than just left blank with no context.',
  },
  {
    question: 'What is the most common mistake on the schedule of test results?',
    answer:
      'Usually it is inconsistency: copied values, vague circuit labels, or readings that do not line up with the protective device, observations, or certificate type.',
  },
  {
    question: 'Can I complete the schedule on my phone?',
    answer:
      'Yes. Many electricians now enter test results directly into a mobile certificate app so values are tied to the correct circuit, validated in real time, and exported straight into the final PDF.',
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
    href: '/guides/how-to-fill-in-eicr',
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
      description="Learn what the schedule of test results records, what values belong on it, common mistakes to avoid, and how to complete cleaner electrical certificates."
      datePublished="2026-04-12"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificate Guide"
      badgeIcon={ClipboardList}
      heroTitle={
        <>
          Schedule of Test Results
          <span className="block text-yellow-400 mt-1">Explained for Electricians</span>
        </>
      }
      heroSubtitle="The schedule of test results is where the certificate earns its credibility. Get the circuit details, test values, and workflow right, and your certificates become cleaner, faster, and much easier to trust."
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Complete a Better Schedule of Test Results"
      howToDescription="A practical five-step workflow for recording cleaner, more reliable test data."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Complete Test Results Properly on Site"
      ctaSubheading="Use Elec-Mate to record circuit results once, validate them as you go, and export professional certificates without duplicate data entry."
    />
  );
}
