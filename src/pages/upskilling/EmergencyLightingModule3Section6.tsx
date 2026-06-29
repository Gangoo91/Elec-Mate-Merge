import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm3-s6-software',
    question: 'The major lighting design software packages used for emergency lighting design are...?',
    options: [
      'Dialux, Relux and AGi32, plus manufacturer-specific tools (Helvar, Tridonic, Designplan).',
      'Word and Excel, with no dedicated photometric engine.',
      'Photoshop and Illustrator, used for rendering only.',
      'General CAD packages alone, with no photometric calculation.',
    ],
    correctIndex: 0,
    explanation:
      'Dialux (DIAL GmbH, free), Relux (Relux Informatik, free) and AGi32 (Lighting Analysts, paid) are the dominant general-purpose photometric design tools. Manufacturer-specific tools (Helvar, Tridonic, Designplan) provide product-tied workflows. All read LDT/IES files and produce point-by-point grids. Choice between them is typically driven by familiarity, language support and integration with manufacturer ecosystems.',
  },
  {
    id: 'elm3-s6-formats',
    question: 'LDT and IES photometric file formats differ how?',
    options: [
      'They are identical files with the same structure.',
      'LDT is for indoor luminaires, IES for outdoor only.',
      'LDT (Eulumdat) is the European format, IES (LM-63) the North American — different structures, same data.',
      'IES is obsolete and no longer published by manufacturers.',
    ],
    correctIndex: 2,
    explanation:
      'LDT (Eulumdat) and IES (LM-63) describe the same physical thing — luminaire candela distribution — through different file structures, header conventions and angular reference systems. European designers default to LDT, North American to IES. Modern lighting design software reads both transparently, and manufacturers serving both markets publish both formats for the same luminaire.',
  },
  {
    id: 'elm3-s6-pitfall',
    question: 'A common pitfall in software-based emergency lighting design is...?',
    options: [
      'The software renders the model too slowly to be useful.',
      'The calculation grid spacing defaults too coarse to resolve dark spots.',
      'The luminaire library lacks UK-market emergency products.',
      'Leaving surface reflectance at the software default (typically 70/50/20) instead of forcing 0% per BS EN 1838:2024.',
    ],
    correctIndex: 3,
    explanation:
      'The reflectance default trap is the dominant software pitfall. Most lighting design software uses normal-lighting reflectance defaults (70/50/20 ceiling/wall/floor); the emergency calculation requires 0%. The default produces lux inflated by reflected-light contribution that the standard does not count, so designs can pass on default reflectance yet fail on commissioning. Designers must explicitly set 0% on every surface or use the emergency-lighting calculation mode that forces it.',
  },
  {
    id: 'elm3-s6-fiveyear',
    question: 'BS 5266-1:2025 NEW 5-year photometric verification requirement is...?',
    options: [
      'Mandatory re-verification of the photometric design at 5-year intervals or after major change.',
      'Optional re-verification, carried out only when the dutyholder requests it.',
      'Daily re-running of the photometric calculation as part of routine testing.',
      'A one-off verification at install, never repeated over the system life.',
    ],
    correctIndex: 0,
    explanation:
      'BS 5266-1:2025 §8.2 introduces 5-year photometric verification. The original design calculation is re-run with current luminaire condition (output reduced by lumen depreciation) and current decoration changes, then compared with the standard minima. Lumen depreciation, dirt and decoration drift accumulate over years, so the original design lux is no longer guaranteed; the 5-year re-calculation confirms current compliance and triggers maintenance, replacement or redesign before the system fails periodic test.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which software packages are commonly used for emergency lighting photometric design?',
    options: [
      'Word and Excel, with manual photometric tables typed in by hand.',
      'Dialux, Relux and AGi32, plus manufacturer-specific tools such as Helvar Designer.',
      'Photoshop and other image editors, used to mark up a CAD background.',
      'No dedicated software — average-lux rules of thumb are applied instead.',
    ],
    correctAnswer: 1,
    explanation:
      'Dialux (free, German-origin) and Relux (free, Swiss-origin) are the dominant free tools; AGi32 (paid, US-origin) is the leading paid tool. Manufacturer-specific tools (Helvar Designer, Tridonic LumKit, Designplan) sit alongside for product workflows. All read LDT/IES.',
  },
  {
    id: 2,
    question: 'LDT and IES photometric file formats are...?',
    options: [
      'Identical files with the same internal structure.',
      'Compressed image formats of the luminaire photo.',
      'Formats reserved for different lamp technologies.',
      'Different structures expressing the same data — LDT (Eulumdat, European), IES (LM-63, North American).',
    ],
    correctAnswer: 3,
    explanation:
      'Different file formats, same physical content — luminaire intensity (candela) distribution. LDT is European (Eulumdat), IES is North American (LM-63). Most software reads both.',
  },
  {
    id: 3,
    question: 'What is the most common software pitfall in emergency lighting design?',
    options: [
      'Slow rendering of the false-colour image on large models.',
      'Choosing the wrong false-colour palette for the isolux plot.',
      'Leaving surface reflectance at the software default (70/50/20) instead of forcing 0% per BS EN 1838:2024 §5.2.',
      'Using an outdated software version with a dated interface.',
    ],
    correctAnswer: 2,
    explanation:
      'Forgetting to set 0% reflectance is the dominant emergency-lighting design error in software. The standard requires 0%; the software defaults to typical reflectances (70/50/20), inflating calculated lux with reflected-light contribution the standard does not count. Designers must explicitly override.',
  },
  {
    id: 4,
    question: 'BS 5266-1:2025 5-year photometric verification requires the designer / dutyholder to...?',
    options: [
      'Re-run the original calculation at ~5-year intervals with luminaires at depreciated output and current geometry.',
      'Carry out one functional test at install and rely on it for the system life.',
      'Replace every luminaire on a fixed 5-year cycle regardless of condition.',
      'Switch the design over to a different lighting standard at the 5-year point.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1:2025 §8.2 introduces 5-year photometric verification (or after major changes). The original design assumed a maintenance factor; re-running the calculation with luminaires at their current depreciated output and accounting for decoration changes confirms the actual condition still meets the standard minima. Software supports the re-verification workflow.',
  },
  {
    id: 5,
    question: 'Verification at commissioning compares...?',
    options: [
      'Manufacturer marketing claims against the installed product.',
      'Battery autonomy against the rated luminaire weight.',
      'Lamp colour temperature against the specified colour rendering.',
      'Software-calculated point-by-point lux against physically measured lux at the same test points.',
    ],
    correctAnswer: 3,
    explanation:
      'Commissioning verification = software prediction vs measured reality at the same points, using a calibrated lux meter. Both must agree within tolerance; significant discrepancies trigger investigation (installation error, photometric data error, calibration error, or environmental factor) before sign-off.',
  },
  {
    id: 6,
    question: 'Manufacturer-specific tools (e.g. Helvar Designer, Tridonic LumKit) are useful because...?',
    options: [
      'They are always free to download, unlike general-purpose tools.',
      'They integrate the manufacturer\'s photometric data and feed its commissioning / DALI tools directly.',
      'They produce larger, higher-resolution output files than Dialux or Relux.',
      'They render more decorative false-colour images for client presentations.',
    ],
    correctAnswer: 1,
    explanation:
      'Manufacturer tools integrate the manufacturer\'s photometric data, often include validated typical layouts, output in a manufacturer-recognised format, and feed commissioning / DALI gateway tools directly. They tie design to product, simplifying a single-manufacturer ecosystem (DALI control, monitoring) but limiting flexibility. General-purpose tools (Dialux, Relux) suit multi-manufacturer designs.',
  },
  {
    id: 7,
    question: 'A photometric calculation report should include which evidence components?',
    options: [
      'Only the average lux figure for the whole space.',
      'A single photograph of the installed luminaires.',
      'Point-by-point grid lux, min/max/uniformity, reflectance (0%), maintenance factor, schedule, date and software version.',
      'A summary of the manufacturer\'s sales literature for the chosen luminaire.',
    ],
    correctAnswer: 2,
    explanation:
      'A complete report evidences every parameter that affects the result: point-by-point grid on the target plane, min/max/uniformity ratio, grid spacing, reflectance (must show 0% for emergency), maintenance factor, luminaire schedule with photometric file references, calculation date and software version. Each lets a future reviewer reproduce or audit the calculation.',
  },
  {
    id: 8,
    question: 'The software design must be VERIFIABLE means...?',
    options: [
      'A third party can re-run the calculation with the same inputs and arrive at the same outputs.',
      'A senior engineer has formally approved the design intent.',
      'The customer has signed off the design at handover.',
      'The layout drawing is presented in clear, colour-coded form.',
    ],
    correctAnswer: 0,
    explanation:
      'Verifiable = reproducible. Anyone (commissioning engineer, periodic-test inspector, future modifier) with the same inputs can re-run and get the same outputs. This requires the software project files (Dialux/Relux), the LDT/IES files, the luminaire schedule and the output report to be retained and accessible in the documentation pack.',
  },
  {
    id: 9,
    question: '5-year photometric verification per BS 5266-1:2025 typically identifies which issues?',
    options: [
      'No issues are ever found at the 5-year point in practice.',
      'Lumen depreciation, decoration drift, undocumented luminaire changes and relocated safety equipment.',
      'Only luminaire colour-temperature faults, with no effect on lux.',
      'Only software bugs in the calculation engine, not the installation.',
    ],
    correctAnswer: 1,
    explanation:
      'The 5-year check catches the slow-burn issues that monthly/annual functional tests do not — lumen depreciation reducing lux below minima at end of life, decoration changes (darker walls, soft furnishings), luminaires removed or relocated without redesign, and safety equipment relocated without re-checking vertical lux. Each is a maintenance or redesign trigger before the system fails periodic test.',
  },
  {
    id: 10,
    question: 'The verification chain from design to compliance evidence is...?',
    options: [
      'A verbal handover between designer and dutyholder, recorded informally.',
      'A purchase order for the luminaires followed by a delivery note.',
      'A sales receipt and the manufacturer warranty card filed together.',
      'Software design → output report → installation → commissioning measurement → comparison → certificate → 5-year re-verification.',
    ],
    correctAnswer: 3,
    explanation:
      'The chain runs: photometric calculation in software (Dialux/Relux/AGi32 or manufacturer tool) → output report → installation per layout → commissioning measurement at scheduled test points → comparison with calculation → certificate of compliance → 5-year re-verification → updated documentation pack. Each link is documented and must agree; a break anywhere is non-evidenced.',
  },
];

const EmergencyLightingModule3Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Software and calculation tools | EL Module 3.6 | Elec-Mate',
    description:
      'Dialux, Relux, AGi32 and manufacturer-specific tools (Helvar, Tridonic, Designplan) for BS 5266-1:2025 emergency lighting design — LDT / IES file formats, the 0% reflectance trap, the verification chain, and the NEW 2025 5-year photometric re-verification requirement.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6"
            title="Software and calculation tools"
            description="Modern emergency lighting design lives in lighting calculation software. Dialux, Relux and AGi32 are the dominant general-purpose tools; manufacturer-specific tools sit alongside for product workflows. All read LDT / IES photometric data and produce point-by-point grid calculations. The 2025 revision adds 5-year photometric re-verification — design software must support the workflow not just at install but throughout the life of the installation."
            tone="yellow"
          />

          <TLDR
            points={[
              'Major design software: Dialux (free, DE), Relux (free, CH), AGi32 (paid, US). Manufacturer tools: Helvar Designer, Tridonic LumKit, Designplan emergency-lighting-design.',
              'All read LDT (European, Eulumdat) and IES (North American, LM-63) photometric data files describing luminaire candela distribution.',
              'Point-by-point grid calculation is the verification — output min / max / uniformity at every grid intersection, on the target plane.',
              'CRITICAL pitfall: reflectance defaults. BS EN 1838:2024 requires 0% reflectance; software defaults to 70/50/20 typical. Designers must explicitly set 0% or use emergency-lighting calculation mode.',
              'Maintenance factor (typically 0.7 to 0.8) is applied to manufacturer initial values to derive end-of-life design lux.',
              'NEW BS 5266-1:2025 §8.2 — 5-year photometric re-verification. Original calculation re-run with current luminaire / decoration condition to confirm continued compliance.',
              'Verification chain: software design → photometric output → installation → commissioning measurement → certificate → 5-year re-verification → updated pack.',
              'Software files (Dialux/Relux project) must be retained with the documentation pack so re-verification is possible.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the major lighting design software packages (Dialux, Relux, AGi32) and manufacturer-specific tools, and select the appropriate tool for the design context',
              'Read and apply LDT (Eulumdat) and IES (LM-63) photometric data files in the chosen software',
              'Set surface reflectance to 0% per BS EN 1838:2024 §5.2 and apply the appropriate maintenance factor',
              'Run point-by-point photometric calculation, output min / max / uniformity, and document the report',
              'Apply the verification chain from software design through commissioning measurement to certificate of compliance',
              'Apply the NEW BS 5266-1:2025 §8.2 5-year photometric re-verification, identifying lumen depreciation and decoration drift',
              'Diagnose and avoid the common software pitfalls: reflectance defaults, wrong photometric file, missing maintenance factor, missing 0% override',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The major software tools</ContentEyebrow>

          <ConceptBlock
            title="Dialux, Relux, AGi32 and the manufacturer tools"
            plainEnglish="Three general-purpose lighting design packages dominate professional practice — Dialux, Relux, AGi32 — supplemented by manufacturer-specific tools that integrate a single manufacturer's product range. All read industry-standard photometric data (LDT, IES) and produce point-by-point grid calculations against the BS EN 1838:2024 / BS 5266-1:2025 duties. Choice between them is typically driven by familiarity, language support, manufacturer integration and project scale."
            onSite="Dialux is the most common in UK and European practice — free, well-supported, large user community, frequent updates. Relux is similar in scope; some designers prefer its interface. AGi32 has stronger US adoption; some specialists in roadway and exterior lighting use it. Manufacturer tools work best when the project is committed to a single manufacturer ecosystem."
          >
            <p>The general-purpose tools:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Dialux Evo (DIAL GmbH, Germany).</strong> Free download. Strong UK / European
                user base. Reads LDT and IES. Dedicated emergency-lighting calculation mode that
                forces 0% reflectance. Outputs PDF report with point-by-point grids, photometric
                false-colour images, isolux contour maps. Supports DXF / DWG import for
                architectural backgrounds. Frequent updates.
              </li>
              <li>
                <strong>Relux (Relux Informatik, Switzerland).</strong> Free download. Similar
                feature set to Dialux. Stronger Swiss / German user base. Reads LDT and IES. Has a
                Relux Mobile app for measurements on site. Outputs PDF reports.
              </li>
              <li>
                <strong>AGi32 (Lighting Analysts, US).</strong> Paid licence. Strong US user base
                and roadway / exterior lighting specialism. Reads IES (and LDT via converter).
                Photometric calculations include detailed glare analysis (UGR, BUG ratings). Used
                by larger UK consultancies for complex / specialist projects.
              </li>
              <li>
                <strong>Calculux (Philips Signify).</strong> Manufacturer-tied general tool from
                Philips. Free. Specialised toward Philips luminaires but reads any LDT / IES.
              </li>
            </ul>
            <p>The manufacturer-specific tools:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Helvar Designer.</strong> Tied to Helvar luminaires + Helvar control
                systems. Strong workflow for projects committed to Helvar ecosystem (luminaires +
                DALI controls + emergency monitoring). Includes pre-validated typical layouts for
                common building types.
              </li>
              <li>
                <strong>Tridonic LumKit.</strong> Tridonic luminaires + Tridonic drivers + Tridonic
                emergency components. Workflow optimised for product configuration, particularly
                where Tridonic emergency conversion modules retrofit non-emergency luminaires.
              </li>
              <li>
                <strong>Designplan emergency-lighting-design.</strong> Specialist tool for
                Designplan emergency luminaires (a UK manufacturer focused on emergency / exit
                signs / refuge systems). Excellent product knowledge integration; less general
                applicability.
              </li>
              <li>
                <strong>Eaton CEAG suite.</strong> Eaton emergency lighting design tools, often
                integrated with Eaton central battery systems and self-test luminaires. Strong
                workflow for central-battery designs.
              </li>
            </ul>
            <p>
              Designers commonly use Dialux or Relux for the photometric design and a manufacturer
              tool (or vice versa) for the product configuration / control commissioning. The
              tools complement rather than replace each other.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §5.3 (Photometric calculation method)"
            clause={
              <>
                Photometric calculations shall be performed using approved lighting calculation
                software accepting standard photometric data (LDT or IES). The software shall
                produce point-by-point illuminance values on the target plane with the calculation
                grid spacing, surface reflectance assumptions, maintenance factor and luminaire
                photometric data clearly identified in the output.
              </>
            }
            meaning="Approved software + standard data + point-by-point grid + identified parameters. The calculation method is prescribed; designers cannot use ad-hoc or hand methods on non-trivial designs."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>LDT and IES — the photometric data formats</ContentEyebrow>

          <ConceptBlock
            title="The standardised data containers"
            plainEnglish="A photometric data file describes the luminaire's light output as a three-dimensional intensity distribution — candela values at every combination of vertical angle (typically 0 to 180 degrees in 5-degree increments) and horizontal azimuth (0 to 360 degrees in 22.5- or 15-degree increments). Lighting design software reads the file and uses it to compute illuminance at any target point given the luminaire's position and orientation. Two standard formats dominate: LDT (Eulumdat, European) and IES (LM-63, North American)."
          >
            <p>The two formats:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>LDT (Eulumdat).</strong> European format, originally developed in Germany
                in the 1990s for fluorescent luminaires. Plain-text file with a fixed structure —
                header lines for manufacturer, luminaire identifier, light source type, total flux,
                power, and a structured table of intensity values at angle increments. Used as
                default in Dialux and Relux. Recognised throughout European lighting practice.
              </li>
              <li>
                <strong>IES (LM-63).</strong> North American format from Illuminating Engineering
                Society standard LM-63. Plain-text file with a different fixed structure —
                similar physical content but different angle conventions, header keywords
                (TILT=NONE, [TEST], [MANUFAC], etc.), and slightly different photometric reference
                planes. Used as default in AGi32 and many US-origin tools.
              </li>
              <li>
                <strong>Mutual convertibility.</strong> Both formats describe the same physical
                content. Conversion between them is loss-less (apart from rounding) and most
                modern software reads both transparently. Manufacturers serving global markets
                publish BOTH for the same luminaire.
              </li>
              <li>
                <strong>Versioning.</strong> Both formats have evolved — IES has versions LM-63-86,
                -91, -95, -02, -19; LDT has its own version progression. Older software may not
                read the latest version; designers occasionally encounter compatibility issues
                requiring software updates or file conversion.
              </li>
              <li>
                <strong>What goes in the file.</strong> Manufacturer name, luminaire model,
                photometric reference (laboratory + test method + date), total luminous flux,
                input power, intensity distribution table, dimensions, photometric centre offsets.
                Some files include manufacturer notes, marketing copy, or non-photometric data —
                ignored by the calculation engine but visible to the designer.
              </li>
            </ul>
            <p>
              Designers download the LDT or IES file from the manufacturer website, place it in a
              project folder, and reference it from the lighting design software's luminaire
              library. The file represents the certified output of the named luminaire variant;
              calculations using it produce the predicted illuminance for that exact luminaire.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The reflectance trap — and how to avoid it</ContentEyebrow>

          <ConceptBlock
            title="The dominant emergency-lighting design pitfall"
            plainEnglish="Lighting design software is built for normal lighting. The default surface reflectances in Dialux, Relux, AGi32 are typical interior values — 70% ceiling, 50% wall, 20% floor — chosen because most projects are normal-lighting design. For emergency lighting, BS EN 1838:2024 §5.2 requires the calculation to use 0% reflectance on every surface. Designers who run their emergency calculation with the software defaults left in place produce inflated lux values that count reflected-light contribution — contribution that the standard does not allow toward the duty. The error is subtle, common and has caused many projects to fail at commissioning."
          >
            <p>How to avoid it:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Use the emergency-lighting calculation mode where available.</strong>
                Dialux Evo has a dedicated emergency lighting calculation that forces 0%
                reflectance and applies the BS EN 1838 / BS 5266 rules automatically. Use this
                mode for emergency designs; the software handles the standard requirements
                without the designer needing to remember each one.
              </li>
              <li>
                <strong>Where no emergency mode exists, set 0% explicitly on every surface.</strong>
                Each room, each wall, each ceiling, each floor must be set to 0% reflectance. Some
                software requires the values to be set per surface; ensure no defaults remain.
              </li>
              <li>
                <strong>Check the report explicitly.</strong> The photometric output report MUST
                state the reflectance values used. If the report shows 70/50/20 (or anything
                other than 0/0/0), the calculation is non-evidenced for emergency duty. Re-run
                with 0%.
              </li>
              <li>
                <strong>Do not rely on a 'sense check'.</strong> A scheme that gives 1.5 lx with
                70/50/20 reflectance might give 0.9 lx with 0% reflectance — looks similar but
                fails the duty. The reflectance contribution is significant (typically 20 to 40
                percent of total) and the difference between pass and fail can sit entirely in
                that contribution.
              </li>
              <li>
                <strong>Verify on commissioning.</strong> Physical lux meter measurement at
                commissioning is at the actual reflectance of the building (which is non-zero in
                reality — the standard's 0% is a calculation rule, not a physical claim). The
                measured value is typically slightly higher than the software prediction at 0%;
                if the measured value is significantly LOWER than the prediction, investigate.
              </li>
            </ul>
            <p>
              Reflectance is the dominant pitfall. Other common issues — wrong photometric file,
              missing maintenance factor, geometry errors — are typically caught by routine
              checks. Reflectance is missed because the default produces results that look
              plausible. Make 0% the first thing you set on any emergency calculation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §5.2 (recap — Calculation method, reflectance)"
            clause={
              <>
                Calculations of escape-route, anti-panic and high-risk task area illumination
                shall be performed assuming surface reflectances of zero. The contribution of
                indirect (reflected) illumination shall not be counted toward the minimum
                illuminance values specified in this standard.
              </>
            }
            meaning="0% reflectance, every surface, every emergency calculation. The standard is unambiguous; software defaults are the trap. Force the value or use emergency-lighting calculation mode."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The verification chain</ContentEyebrow>

          <ConceptBlock
            title="From software design to commissioning to compliance"
            plainEnglish="The verification chain is the sequence of evidence linking the design intent to compliance certification. Each link must produce documented output that the next link consumes. A break anywhere — a missing photometric file, an untested grid point, a missing 0% reflectance statement — breaks the chain and the design is non-evidenced."
          >
            <p>The chain in order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Design intent.</strong> The fire risk assessment and the BS 5266-1:2025
                minima drive the target lux values. Documented in the design brief.
              </li>
              <li>
                <strong>Software design.</strong> Dialux / Relux / AGi32 / manufacturer tool with
                LDT / IES files, geometry, luminaire positions, photometric distribution,
                maintenance factor, 0% reflectance. Outputs point-by-point grid lux on the
                target plane.
              </li>
              <li>
                <strong>Photometric output report.</strong> PDF / printable report with grid
                values, min / max / uniformity, identified parameters (reflectance, MF, LDT
                files, software version, date). Filed in the documentation pack.
              </li>
              <li>
                <strong>Layout drawing.</strong> Floor plan with luminaire positions matching the
                software model, schedule references, photometric grid annotations.
              </li>
              <li>
                <strong>Schedule of luminaires.</strong> Per-fitting specification matching the
                software model.
              </li>
              <li>
                <strong>Installation.</strong> Installer fits the luminaires per the layout
                drawing and schedule. Each luminaire at its specified position, orientation,
                circuit, mounting height.
              </li>
              <li>
                <strong>Commissioning measurement.</strong> Calibrated lux meter measures the
                actual lux at the schedule of test points (typically the worst-case grid points
                from the calculation, plus every safety-equipment vertical-lux point). Recorded
                in the commissioning log.
              </li>
              <li>
                <strong>Comparison.</strong> Measured values compared against software
                predictions. Tolerance typically ±20% (allows for measurement uncertainty,
                production tolerance, environmental factors). Outside tolerance triggers
                investigation.
              </li>
              <li>
                <strong>Certificate of compliance.</strong> Issued when measurements agree with
                predictions and minima are met. The certificate references the design pack,
                the commissioning log, and the standard against which the system is verified
                (BS 5266-1:2025 / BS EN 1838:2024 / BS EN 50172:2024).
              </li>
              <li>
                <strong>Periodic test (BS EN 50172:2024).</strong> Monthly functional test,
                annual rated-duration test, and 5-year photometric re-verification (NEW 2025).
                Each updates the documentation pack.
              </li>
            </ul>
            <p>
              Designers, installers, commissioning engineers and dutyholders share the chain.
              Each is responsible for their link; the building owner is responsible for the
              chain as a whole. A documented break (e.g. measurements outside tolerance) is fixed
              before the certificate issues; a discovered break (e.g. missing photometric file
              found at periodic test) is remediated as soon as identified.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>NEW 2025 — 5-year photometric verification</ContentEyebrow>

          <ConceptBlock
            title="Confirming continued compliance over the installation life"
            plainEnglish="Emergency lighting designs are verified at install. Lumen depreciation, decoration changes, undocumented modifications and ageing of components erode the design over time. The original 0.7 to 0.8 maintenance factor is typically calibrated to a 5-year interval; beyond 5 years the assumption no longer holds. BS 5266-1:2025 §8.2 introduces a NEW requirement for 5-year photometric re-verification: the original calculation is re-run with current condition (depreciated luminaire output, current decoration reflectance — still calculated at 0% per the standard but the actual building geometry may have changed), and the result is compared against the standard minima. Continued compliance is confirmed; non-compliance triggers maintenance / replacement / redesign."
          >
            <p>What the 5-year verification involves:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Re-open the original software project file.</strong> Dialux / Relux / AGi32
                project from the original design, retrieved from the documentation pack. Without
                the project file, re-verification means re-creating the model — which is possible
                but slow and prone to introducing differences.
              </li>
              <li>
                <strong>Update luminaire light output for depreciation.</strong> LED luminaires
                typically depreciate 10 to 15% over 5 years (variant dependent). Reduce the
                luminaire flux in the model accordingly. Some software supports a 'time advance'
                feature; manual adjustment otherwise.
              </li>
              <li>
                <strong>Update geometry for any changes.</strong> Walls moved, partitions added,
                fittings repositioned, safety equipment relocated. The current building geometry
                must match the model geometry.
              </li>
              <li>
                <strong>Re-run the calculation.</strong> Same 0% reflectance, same calculation grid.
                Compare to standard minima.
              </li>
              <li>
                <strong>Document the result.</strong> Re-verification report — predicted lux at
                test points, comparison with standard minima, any non-compliances and proposed
                remediation. Filed in the documentation pack with the original design.
              </li>
              <li>
                <strong>Take action.</strong> Where the re-verification predicts compliance:
                continue. Where it predicts non-compliance: clean luminaires, replace luminaires
                that have depreciated, modify the design (additional luminaires, repositioning),
                or re-design as required.
              </li>
            </ul>
            <p>
              The 5-year cycle aligns with typical refurbishment intervals — many buildings are
              redecorated, refitted or expanded around the 5-year mark. The verification ties
              into the refurbishment programme; emergency lighting becomes part of the change
              control. Doing the re-verification AFTER non-compliance is identified at periodic
              test is too late; the verification is preventive, not reactive.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §8.2 (Periodic photometric verification — NEW)"
            clause={
              <>
                The photometric calculation underlying the design shall be re-verified at
                intervals not exceeding 5 years, or following any major change to the building
                fabric, decoration, occupancy or use that could affect the emergency-lighting
                duty. The re-verification shall use the original software project file, updated
                for current luminaire condition (lumen depreciation), current building geometry,
                and current safety-equipment layout. Where the re-verification predicts
                non-compliance with the requirements of this standard, remedial action shall be
                taken.
              </>
            }
            meaning="5 years OR any major change. Use the original project file. Update for depreciation and geometry. Re-run. Take action on non-compliance. The verification is preventive — it catches issues before they fail the periodic functional test."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          {/* Diagram — software workflow + verification chain */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Software workflow + verification chain (BS 5266-1:2025 + BS EN 1838:2024)
            </h4>
            <svg
              viewBox="0 0 880 600"
              className="w-full h-auto"
              role="img"
              aria-label="Workflow diagram showing software design (Dialux / Relux) reading LDT/IES photometric files, producing photometric output, feeding layout drawing and schedule, then through installation and commissioning measurement to certificate of compliance, with a 5-year photometric re-verification loop returning to the software design."
            >
              <rect x="0" y="0" width="880" height="40" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="440" y="26" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                Software design → installation → commissioning → certificate → 5-year re-verify
              </text>

              {/* Stage 1 — Inputs */}
              <rect x="20" y="60" width="180" height="100" rx="8" fill="rgba(34,211,238,0.08)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="110" y="84" textAnchor="middle" fill="#22D3EE" fontSize="11" fontWeight="bold">Inputs</text>
              <text x="110" y="104" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">· LDT / IES files</text>
              <text x="110" y="118" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">· Building geometry</text>
              <text x="110" y="132" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">· Risk assessment</text>
              <text x="110" y="146" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">· BS 5266 minima</text>

              {/* Stage 2 — Software design */}
              <rect x="240" y="60" width="200" height="100" rx="8" fill="rgba(168,85,247,0.10)" stroke="#A855F7" strokeWidth="1.6" />
              <text x="340" y="84" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">Software design</text>
              <text x="340" y="104" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">Dialux / Relux / AGi32</text>
              <text x="340" y="118" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">+ manufacturer tools</text>
              <text x="340" y="132" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">⚠ 0% reflectance MUST be set</text>
              <text x="340" y="146" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">MF 0.7 to 0.8</text>

              {/* Stage 3 — Output report */}
              <rect x="480" y="60" width="180" height="100" rx="8" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="570" y="84" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Photometric output</text>
              <text x="570" y="104" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">· Point-by-point grid</text>
              <text x="570" y="118" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">· Min / max / uniformity</text>
              <text x="570" y="132" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">· Schedule of test points</text>
              <text x="570" y="146" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">· Reflectance + MF stated</text>

              {/* Stage 4 — Drawings + schedules */}
              <rect x="700" y="60" width="160" height="100" rx="8" fill="rgba(34,197,94,0.08)" stroke="#22C55E" strokeWidth="1.4" />
              <text x="780" y="84" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Drawings + schedules</text>
              <text x="780" y="104" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">Layout (1:100 / 1:50)</text>
              <text x="780" y="118" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">Schedule of luminaires</text>
              <text x="780" y="132" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">Safety-equip schedule</text>
              <text x="780" y="146" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">§7 documentation pack</text>

              {/* Arrows */}
              <line x1="200" y1="110" x2="240" y2="110" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
              <polygon points="240,110 232,106 232,114" fill="rgba(255,255,255,0.6)" />
              <line x1="440" y1="110" x2="480" y2="110" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
              <polygon points="480,110 472,106 472,114" fill="rgba(255,255,255,0.6)" />
              <line x1="660" y1="110" x2="700" y2="110" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
              <polygon points="700,110 692,106 692,114" fill="rgba(255,255,255,0.6)" />

              {/* Stage 5 — Installation */}
              <rect x="20" y="220" width="200" height="80" rx="8" fill="rgba(34,211,238,0.08)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="120" y="244" textAnchor="middle" fill="#22D3EE" fontSize="11" fontWeight="bold">Installation</text>
              <text x="120" y="264" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">per drawings + schedule</text>
              <text x="120" y="278" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">circuits + orientation</text>
              <text x="120" y="292" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">verified pre-commissioning</text>

              {/* Stage 6 — Commissioning */}
              <rect x="260" y="220" width="200" height="80" rx="8" fill="rgba(168,85,247,0.10)" stroke="#A855F7" strokeWidth="1.6" />
              <text x="360" y="244" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">Commissioning measurement</text>
              <text x="360" y="264" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">calibrated lux meter</text>
              <text x="360" y="278" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">at scheduled test points</text>
              <text x="360" y="292" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">incl. safety-equip vertical</text>

              {/* Stage 7 — Compare */}
              <rect x="500" y="220" width="160" height="80" rx="8" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="580" y="244" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Compare</text>
              <text x="580" y="264" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">measured vs predicted</text>
              <text x="580" y="278" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">tolerance ±20%</text>
              <text x="580" y="292" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">investigate differences</text>

              {/* Stage 8 — Certificate */}
              <rect x="700" y="220" width="160" height="80" rx="8" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.6" />
              <text x="780" y="244" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Certificate</text>
              <text x="780" y="264" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">BS 5266 compliance</text>
              <text x="780" y="278" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">handed to dutyholder</text>
              <text x="780" y="292" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">→ documentation pack</text>

              <line x1="220" y1="260" x2="260" y2="260" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
              <polygon points="260,260 252,256 252,264" fill="rgba(255,255,255,0.6)" />
              <line x1="460" y1="260" x2="500" y2="260" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
              <polygon points="500,260 492,256 492,264" fill="rgba(255,255,255,0.6)" />
              <line x1="660" y1="260" x2="700" y2="260" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
              <polygon points="700,260 692,256 692,264" fill="rgba(255,255,255,0.6)" />

              <path d="M 780 160 Q 780 190 450 190 Q 120 190 120 220" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
              <polygon points="120,220 116,212 124,212" fill="rgba(255,255,255,0.6)" />

              {/* Stage 9 — 5-year re-verification (loop back) */}
              <rect x="200" y="360" width="480" height="100" rx="8" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.6" />
              <text x="440" y="384" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">NEW 2025 · 5-year photometric re-verification (BS 5266-1:2025 §8.2)</text>
              <text x="440" y="406" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">Re-open original software project — update for lumen depreciation + geometry changes</text>
              <text x="440" y="422" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">Re-run calculation at 0% reflectance — compare to standard minima</text>
              <text x="440" y="438" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">Action: maintain / replace / redesign as needed → updated documentation pack</text>

              {/* Loop arrows */}
              <path d="M 700 360 Q 750 330 750 220" fill="none" stroke="rgba(239,68,68,0.7)" strokeWidth="1.6" strokeDasharray="6,3" />
              <polygon points="750,220 746,228 754,228" fill="rgba(239,68,68,0.85)" />
              <path d="M 200 410 Q 100 410 100 160" fill="none" stroke="rgba(239,68,68,0.7)" strokeWidth="1.6" strokeDasharray="6,3" />
              <polygon points="100,160 96,168 104,168" fill="rgba(239,68,68,0.85)" />

              {/* Footer */}
              <rect x="20" y="488" width="840" height="100" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <text x="440" y="510" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Documentation pack carries the chain</text>
              <text x="440" y="528" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">Software project files (Dialux / Relux) + LDT / IES files + photometric output report</text>
              <text x="440" y="544" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">+ layout drawings + schedules + commissioning log + certificate + revision history</text>
              <text x="440" y="562" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">Each link evidenced; chain auditable end-to-end; verifiable by third party</text>
              <text x="440" y="578" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">A break anywhere = non-evidenced design</text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Mistakes the software exposes</ContentEyebrow>

          <CommonMistake
            title="Running the calculation with default reflectance values"
            whatHappens="Designer opens Dialux, imports the architectural CAD background, places luminaires per the layout, runs the calculation. Software defaults to 70/50/20 reflectance. Output report shows 1.4 lx route lux on the centre line — design passes. At commissioning, third-party verification re-runs the same model with 0% reflectance and reads 0.85 lx — non-compliant. Project requires additional luminaires; 5 weeks delay; budget overrun."
            doInstead="Use Dialux Evo's emergency-lighting calculation mode (or equivalent in other software) which forces 0% reflectance automatically. Where no emergency mode exists, set 0% explicitly on every surface BEFORE running the calculation. Always check the photometric output report explicitly states 0% reflectance; if it does not, re-run."
          />

          <CommonMistake
            title="Losing the original Dialux project file"
            whatHappens="An installation is designed in 2026, commissioned, certificate issued. The Dialux project file lives on the original designer's laptop, not in the documentation pack. The designer leaves the company in 2028. In 2031, the dutyholder needs the 5-year photometric re-verification per BS 5266-1:2025 §8.2 but cannot find the project file. Re-creating the model from scratch costs ten times the original design effort and may not capture all the nuances."
            doInstead="Save the Dialux / Relux / AGi32 project file in the documentation pack, alongside the LDT / IES files used. The pack accompanies the building, not the designer. Future re-verifications, modifications and audits can re-open the original model. The pack is the building's, not the consultant's."
          />

          <CommonMistake
            title="Using wrong photometric file for value-engineered substitution"
            whatHappens="Original design specified a Helvar luminaire with a specific photometric file. Contractor substitutes a similar-looking Tridonic at procurement; design pack is updated to name Tridonic but the photometric calculation is not re-run with the Tridonic LDT file. Installed luminaires have different actual photometric distribution; commissioning measurement reads below predicted lux at multiple points; cause is the photometric file mismatch."
            doInstead="Any luminaire substitution requires re-running the photometric calculation with the substituted luminaire's LDT file. The design pack is updated to reflect the actual installed product. Substitutions on procurement decision alone, without photometric verification, break the design intent. Either substitute and re-verify, or refuse the substitution; never substitute and just update the schedule label."
          />

          <SectionRule />

          <Scenario
            title="A 5-year re-verification of a hotel emergency lighting system"
            situation="Hotel commissioned in 2026. 200 bedrooms, 8 floors, 3 h emergency lighting throughout. Original design pack includes Dialux project file, LDT files for all luminaires (Eaton emergency-rated LED), photometric output, layout drawings, schedules. In 2031 the hotel reaches 5-year mark and the dutyholder commissions the BS 5266-1:2025 §8.2 re-verification."
            whatToDo="(1) Retrieve the original Dialux project file from the documentation pack. Open in current Dialux version. (2) Download current Eaton LDT files for the same luminaire models — flux values may have been updated by the manufacturer based on long-term test data. (3) Update each luminaire's flux in the model to reflect 5-year lumen depreciation (typically 8 to 12% reduction for the LED technology used). (4) Walk the building. Note any geometric changes — refurbished public areas, repositioned safety equipment, new partitions in the conference floor. Update the model geometry. (5) Re-run the calculation at 0% reflectance with the same calculation grid. (6) Compare current predicted lux to BS 5266 minima. Identify any non-compliance — typically a few specific points where the depreciated luminaire and geometric change combine to drop below 1 lx. (7) Recommend remedial action — clean luminaires, replace any showing accelerated depreciation, add or reposition luminaires where geometry has changed. (8) Update the documentation pack with the re-verification report. (9) Issue to the dutyholder for action."
            whyItMatters="The 5-year verification catches the slow drift that monthly / annual functional tests do not. A luminaire passing functional test (lights up on simulated mains failure) may have depreciated to half its rated output and still 'pass' the basic test; the photometric re-verification shows the floor lux is now 0.6 lx instead of 1.2 lx and triggers preventive action. The verification is preventive, not diagnostic."
          />

          <Scenario
            title="Specifying a manufacturer-tied design — Helvar Designer workflow"
            situation="A new flagship retail store committed to Helvar throughout — luminaires, DALI controls, emergency monitoring system. The brief specifies the Helvar emergency monitoring system for centralised reporting. The lighting designer is asked to use Helvar Designer for the emergency lighting design instead of Dialux."
            whatToDo="Open Helvar Designer with the architectural background. Use the integrated Helvar luminaire library — every Helvar emergency luminaire pre-loaded with its photometric data and certified for BS 5266 emergency duty. Place luminaires per §5.5 mandatory positions and BS EN 1838 photometric duty; Helvar Designer outputs match Helvar's emergency monitoring system DALI addressing scheme so commissioning can directly load the design into the monitor. The output documentation includes the standard photometric report PLUS a Helvar-specific commissioning file. Use Dialux as a parallel verification — same geometry, same photometric data exported to LDT, same calculation — to confirm that the Helvar Designer output is consistent with the general-purpose calculation. The dual workflow gives the manufacturer-integration benefits AND the general-tool verification."
            whyItMatters="Manufacturer-tied tools are powerful when committed to a manufacturer ecosystem. They simplify design-to-commissioning workflow, integrate with manufacturer monitoring, and reduce errors at hand-over. Their limitation is product range — they cannot be used for multi-manufacturer designs. Best practice on a manufacturer-committed project is to use the manufacturer tool for the workflow and a general-purpose tool (Dialux / Relux) as a verification cross-check."
          />

          <SectionRule />

          <KeyTakeaways
            title="Software and verification — what to commit to memory"
            points={[
              'Major tools: Dialux (free, DE), Relux (free, CH), AGi32 (paid, US). Manufacturer tools: Helvar Designer, Tridonic LumKit, Designplan, Eaton CEAG.',
              'All read LDT (Eulumdat, European) and IES (LM-63, North American) photometric data files.',
              'CRITICAL: 0% reflectance per BS EN 1838:2024 §5.2. Software defaults to 70/50/20; designers must override or use emergency-lighting calculation mode.',
              'Photometric output report must state grid, reflectance (0%), maintenance factor, luminaire LDT/IES references, software version, date.',
              'Verification chain: software design → output report → installation → commissioning measurement → comparison → certificate → 5-year re-verification.',
              'NEW 2025: 5-year photometric re-verification per BS 5266-1:2025 §8.2 — re-run original calculation with depreciated luminaires + current geometry.',
              'Software project files (Dialux / Relux project) saved with the documentation pack — without them, re-verification is starting from scratch.',
              'Manufacturer tools suit single-manufacturer ecosystems; general-purpose tools suit multi-manufacturer designs; using both as cross-check is best practice.',
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <FAQ
            items={[
              {
                question: 'Is Dialux really free?',
                answer:
                  'Yes — Dialux Evo is free download from the DIAL GmbH website. The software is funded by manufacturer contributions (manufacturers pay to have their LDT files in the integrated Dialux luminaire database). Designers can also use independent LDT files. There is no licence cost, no per-project fee, no maintenance subscription. Updates are regular and also free.',
              },
              {
                question: 'Can I use a hand calculation for a small project?',
                answer:
                  'BS EN 1838:2024 §5.3 effectively requires software calculation for non-trivial designs because the point-by-point grid output is the verification. A very small space (a single small toilet, a domestic flat hallway) might be manageable by hand, but the point-by-point grid documentation is hard to produce manually. In practice, even small commercial projects use software because the tools are free and the workflow is faster than manual.',
              },
              {
                question: 'What happens if the manufacturer of my chosen luminaire goes out of business?',
                answer:
                  'The original photometric data is what was used in the design and remains valid for that design. New luminaires for replacement may need to source equivalent product; if the original is unavailable, substitute with a different manufacturer + re-run the calculation with the new LDT file + update the documentation pack. The 5-year re-verification often surfaces this issue when reordering luminaires for refurbishment.',
              },
              {
                question: 'Does the 5-year re-verification need a designer with the same Dialux licence as the original designer?',
                answer:
                  "No. Dialux is free; anyone can install it. Relux is similarly free. The 5-year re-verification needs the same software tool family (Dialux project file opens in Dialux; Relux in Relux), but not the same individual designer or licence. Companies retaining the work over years often have multiple designers using the same software; succession is straightforward provided the project file is preserved.",
              },
              {
                question: 'Can I do the 5-year re-verification myself if I am the building maintenance manager, or do I need a qualified designer?',
                answer:
                  'BS 5266-1:2025 §8.2 does not specify the qualification of the verifier; the verifier must be competent. In practice, the photometric re-verification is typically carried out by a lighting designer, electrical consultant, or specialist commissioning engineer who has the software skills and the BS 5266 / BS EN 1838 knowledge. A maintenance manager with appropriate training can perform the verification; without training, the work should be commissioned to a competent practitioner.',
              },
              {
                question: 'What if the building has been renovated and the original Dialux project no longer matches the current building?',
                answer:
                  'Update the Dialux model to match current building geometry as part of the re-verification. Move walls, change room dimensions, reposition luminaires per actual layout, reposition safety equipment per current locations. Re-run with current photometric data. The re-verification is then against the current building, not the original. Document the geometry changes in the re-verification report so the audit trail captures the renovation.',
              },
              {
                question: 'Should the photometric data files be in the documentation pack as well as the manufacturer schedules?',
                answer:
                  'Yes. The LDT / IES files are part of the design evidence — without them the calculation cannot be re-run. Include the actual LDT / IES files, not just references to them. Manufacturer websites change over time; a referenced URL may not work in 5 years. The actual file in the pack is durable.',
              },
              {
                question: 'Does AGi32 (paid software) give better results than Dialux (free)?',
                answer:
                  'Not for the photometric calculation itself — both produce the same point-by-point lux given the same input data and parameters. AGi32 has stronger features for some specialist applications (roadway lighting, very large-scale glare analysis, BUG ratings) but for typical building emergency lighting the free Dialux gives identical engineering output. Choice between them is workflow / familiarity / specialist features rather than calculation accuracy.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Software and calculation tools — Module 3.6" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 4
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule3Section6;
