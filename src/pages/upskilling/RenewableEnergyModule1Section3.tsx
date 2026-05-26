import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm1s3-osg-role',
    question:
      'What is the most accurate description of the On-Site Guide\'s role in the BS 7671 documentation stack?',
    options: [
      'A legally binding extension of BS 7671',
      'A mass-market practical reference for the general electrician, distilling the most common-use parts of BS 7671 into operational form — non-statutory but accepted as competent-practice evidence',
      'An academic textbook for apprentices',
      'A consumer-facing safety pamphlet',
    ],
    correctIndex: 1,
    explanation:
      'The On-Site Guide is the IET\'s operational distillation of BS 7671 for the everyday installer — not a replacement for the standard but a working reference that takes the most-used parts and presents them in a more navigable form. PI insurers, MCS auditors and courts treat consultation of the OSG as evidence of competent practice.',
  },
  {
    id: 'm1s3-gn3-role',
    question:
      'Guidance Note 3 (GN3) sits in the BS 7671 documentation stack as:',
    options: [
      'A legal interpretation of BS 7671 by HSE',
      'The practical companion to BS 7671 Part 6 (Inspection and Testing), containing test procedures, instrument guidance and example completed model forms',
      'A consumer-facing safety document',
      'A draft of the 19th Edition',
    ],
    correctIndex: 1,
    explanation:
      'GN3 is explicitly framed as the practical companion to BS 7671 Part 6. It contains the detailed test procedures (in Section 2.6), instrument selection and calibration guidance (Chapter 4), example certificate completion forms (Section 5), and the inspector-judgement framework that BS 7671 itself stays general on.',
  },
  {
    id: 'm1s3-relevant-criteria',
    question:
      'GN3 defines "relevant criteria" for inspection and testing as:',
    options: [
      'Whatever the inspector judges acceptable on the day',
      'The requirements of BS 7671 that apply to the particular inspection or test — unless the designer has specified particular requirements for that installation, in which case the designer-specified requirements are the relevant criteria',
      'British Standards only',
      'The manufacturer instructions alone',
    ],
    correctIndex: 1,
    explanation:
      'The "relevant criteria" doctrine in GN3 is fundamental. The default is BS 7671\'s requirements. But where the designer has specified particular requirements for the installation, those become the relevant criteria. On LCT installs with custom DC isolation, BESS fire detection or commissioning protocols, this rule is the difference between under- and over-inspection.',
  },
  {
    id: 'm1s3-inspect-then-test',
    question:
      'GN3 sets a clear sequence: inspect first, then test. What is the rule on defects identified during inspection?',
    options: [
      'Defer correction until after testing',
      'Tests shall not be conducted if safety might be impaired by defects — defects shall be corrected prior to testing',
      'Test the defective circuit at lower voltage',
      'Continue testing regardless',
    ],
    correctIndex: 1,
    explanation:
      'GN3 is explicit on the inspection-test sequence. Tests shall not be conducted where safety might be impaired by defects. Defects observed during inspection must be corrected before the test methodology is applied. Testing is not a substitute for inspection.',
  },
  {
    id: 'm1s3-pv-warning-notice',
    question:
      'The On-Site Guide signposts the requirement for warning notices on PV systems. Where should the warning notices appear?',
    options: [
      'Only inside the inverter enclosure',
      'At appropriate locations — typically at the incomer / consumer unit and on the roof — to inform of live PV conductors',
      'Only in the customer handover pack',
      'Only on equipment rated above 230 V',
    ],
    correctIndex: 1,
    explanation:
      'The OSG indicates that PV arrays require durable warning notices at appropriate locations. The standard practical placement is at the incomer / consumer unit (anyone working on the AC supply is alerted to the parallel DC source) and on the roof / array location (anyone working at module level is alerted that DC conductors remain live during daylight).',
  },
  {
    id: 'm1s3-instrument-calibration',
    question:
      'GN3 sets the rule on test instruments. What is the basic obligation?',
    options: [
      'Instruments shall be calibrated only when they appear inaccurate',
      'Instruments shall be periodically calibrated — and may be supplemented between formal calibrations by use of a proprietary "check box" with clearly defined characteristics',
      'Calibration is only required for instruments above 1 kV',
      'Instruments are accepted as accurate from new',
    ],
    correctIndex: 1,
    explanation:
      'GN3 requires periodic instrument calibration. Between formal calibrations, a proprietary "check box" provides known values or simulated conditions to verify the instrument\'s output. For LCT installs where DC string insulation readings sit at borderline acceptance, mid-cycle verification matters disproportionately.',
  },
  {
    id: 'm1s3-pi-evidence',
    question:
      'A PI insurer is reviewing your renewal evidence on LCT contracting work. Which set of documents would they most expect to see consulted on each cert?',
    options: [
      'BS 7671 only',
      'BS 7671 + OSG + GN3 + the relevant IET Code of Practice + manufacturer instructions',
      'OSG only — the simplified version is sufficient',
      'GN3 only — that covers everything',
    ],
    correctIndex: 1,
    explanation:
      'The competent-practice evidence bundle PI insurers, MCS auditors and EICR inspectors look for: BS 7671 (the regulatory framework), OSG (the practical operational reference), GN3 (the inspection-and-testing procedure), the relevant IET Code of Practice (PV / EESS / EV), and the manufacturer\'s installation instructions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'On a domestic PV install, the On-Site Guide signposts a specific physical requirement that BS 7671 sets but doesn\'t fully visualise. Which?',
    options: [
      'Warning notices for PV systems — durable notices at appropriate locations to inform of live PV conductors',
      'Cable colour-coding for AC and DC',
      'Inverter ambient temperature range',
      'Roof-tile compatibility checks',
    ],
    correctAnswer: 0,
    explanation:
      'The OSG provides the practical signposting on where and how to fit warning notices on PV systems — at the incomer / consumer unit and on the roof / array location. BS 7671 Section 712 sets the underlying requirement; the OSG operationalises it.',
  },
  {
    id: 2,
    question:
      'An inspector arrives on site to test a 6 kWp PV install. The DC isolator label has fallen off, a PV module is loose at one corner, and the inverter\'s warning notice has weathered to illegible. What does GN3 say about proceeding with testing?',
    options: [
      'Test first, log the defects in the report',
      'Defects shall be corrected prior to testing — tests shall not be conducted where safety might be impaired',
      'Test the AC side only',
      'Re-test in six months',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 is explicit on the sequence. Inspection comes first, defects are corrected before testing, then testing validates the corrected installation. The loose module is a mechanical safety defect; the missing label is an operational-safety defect; the illegible warning notice is a regulatory-compliance defect. All three should be corrected before testing.',
  },
  {
    id: 3,
    question:
      'On a hybrid PV+BESS install, the designer has specified custom DC isolation and a particular BMS commissioning protocol that exceed the BS 7671 minimum. The inspector arrives, finds the test methodology in GN3, applies it strictly to BS 7671 — and ignores the designer\'s specification. What did the inspector get wrong?',
    options: [
      'Nothing — BS 7671 is the only relevant criterion',
      'The "relevant criteria" doctrine in GN3 — where the designer has specified particular requirements, those are the relevant criteria for inspection and test',
      'The inspector should have used a different instrument',
      'The inspector should have tested the BESS only',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 defines "relevant criteria" as the BS 7671 requirements applicable to the particular inspection or test, unless the designer has specified particular requirements — in which case the designer-specified requirements are the relevant criteria. On LCT installs with custom DC isolation, BESS fire detection or commissioning protocols, the designer\'s spec is non-optional input to the inspection.',
  },
  {
    id: 4,
    question:
      'GN3 Section 2.6 is the reference for what?',
    options: [
      'Descriptions of the tests required by BS 7671 Part 6',
      'Building Regulations notification procedures',
      'MCS-specific commissioning steps',
      'Stripe pricing for inspection services',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 Section 2.6 contains the detailed descriptions of the tests referenced in Guidance Note 3 — sequence, methodology, acceptance criteria.',
  },
  {
    id: 5,
    question:
      'An installer issuing an EIC for a PV install treats the certificate as the sole evidence of work done. A PI insurer asks for the full evidence bundle on renewal. Which framing best captures what the insurer expects to see?',
    options: [
      'The EIC alone is the full record',
      'EIC + the BS 7671 reg references applied + OSG signposts followed + GN3 test methodology applied + the IET CoP for the technology + manufacturer instructions followed',
      'EIC + the customer\'s feedback',
      'EIC + photos of the install',
    ],
    correctAnswer: 1,
    explanation:
      'PI insurers, MCS auditors and EICR inspectors look for the layered evidence bundle. The EIC is the cert; the BS 7671 references demonstrate the regulatory floor; the OSG signposts demonstrate practical compliance; the GN3 methodology demonstrates competent inspection-and-test; the IET CoP demonstrates technology-specific competence.',
  },
  {
    id: 6,
    question:
      'GN3 includes a rule on test instruments: they shall be periodically calibrated, with proprietary "check boxes" used between calibrations. What is a proprietary check box?',
    options: [
      'A waterproof storage box for test instruments',
      'A device having clearly defined characteristics used to check instrument readings — providing known values or simulated conditions so that an instrument\'s output can be verified between formal calibrations',
      'A software application',
      'A box ticked on the EIC form',
    ],
    correctAnswer: 1,
    explanation:
      'A proprietary check box is a verification device with clearly defined electrical characteristics — known resistance values, known capacitance, known loop impedance — that an instrument can be tested against between formal calibrations.',
  },
  {
    id: 7,
    question:
      'GN3 distinguishes between "should" and "shall" in its own wording. What is the distinction?',
    options: [
      'They are synonymous',
      '"Shall" indicates mandatory regulation; "should" indicates recommended practice — GN3 uses "should" for guidance recommendations within the Note, distinguishing from the mandatory "shall" used in the BS 7671 regulations themselves',
      '"Shall" applies to apprentices only',
      '"Should" is for residential, "shall" for commercial',
    ],
    correctAnswer: 1,
    explanation:
      '"Shall" in BS 7671 is mandatory regulatory language. "Should" in GN3 is recommended practice — strong guidance but not a regulatory requirement in itself. Departing from a "should" in GN3 is not a regulatory breach; departing from a "shall" in BS 7671 is.',
  },
  {
    id: 8,
    question:
      'The On-Site Guide and GN3 are non-statutory. What gives them weight in practice?',
    options: [
      'A government order',
      'Their status as the accepted IET-published reference for competent installer and inspector practice — used by courts, PI insurers, MCS auditors and EICR inspectors as evidence of how a competent installer / inspector would have approached the work',
      'They are mandatory for all electrical work',
      'They are mandatory only for MCS-funded work',
    ],
    correctAnswer: 1,
    explanation:
      'The OSG and GN3 are non-statutory IET publications. Their weight comes from being the accepted reference for competent practice. The same status applies to BS 7671 itself: non-statutory, but treated by courts, HSE, PI insurers, MCS auditors and EICR inspectors as the standard evidence of competent practice.',
  },
];

const faqs = [
  {
    question:
      'Is the On-Site Guide a replacement for BS 7671 on simple jobs?',
    answer:
      'No — the OSG is a distillation of the most-used parts of BS 7671 for the general electrician, not a replacement. The OSG simplifies and operationalises; BS 7671 remains the authoritative document. On edge cases, on LCT work that touches multiple chapters, or on any departure from standard practice, the OSG signposts back to BS 7671 or to the relevant IET Code of Practice.',
  },
  {
    question:
      'Are OSG and GN3 revised in step with each BS 7671 amendment?',
    answer:
      'In practice, yes — though usually with a publication lag. Each BS 7671 amendment is followed by aligned editions of the OSG and GN3 within typically six to twelve months. The lag matters in the transition window — an installer using OSG / GN3 referencing the previous amendment after the new amendment takes effect may miss specific changes (e.g. the Reg 722.411.4.1 PME exception deletion under A4).',
  },
  {
    question:
      'Does GN3 give me the test procedure for a hybrid PV+BESS+EV install — or do I need separate references?',
    answer:
      'Separate references. GN3 covers the general inspection-and-testing methodology — the test sequence, the instrument selection, the model-form completion. For LCT-specific procedures GN3 directs the inspector to the relevant IET Code of Practice: PV (Grid-Connected Solar PV Installations), BESS (Electrical Energy Storage Systems), EV (Electric Vehicle Charging Equipment Installation).',
  },
  {
    question:
      'How long does the OSG / GN3 last in the field — when does my copy become out of date?',
    answer:
      'A working OSG / GN3 should be aligned to the dated edition of BS 7671 being cited on certificates. With A4:2026 in force from 15 April 2026, the operational expectation is the A4-aligned OSG and GN3 editions during the same window. PI insurers and MCS auditors look at the dated edition on the installer\'s shelf — outdated references are an audit finding.',
  },
  {
    question:
      'The OSG signposts a "warning notice" for PV — what wording is acceptable, and what is the durable-material requirement?',
    answer:
      'Industry-practice wording for the incomer notice: "WARNING — DUAL SUPPLY: This installation includes a solar PV generator. Isolate at both the AC and DC sides before working on the installation." For the roof / array notice: "WARNING — LIVE PV CONDUCTORS: DC conductors remain live during daylight even when the inverter is switched off." Durable material means weather-resistant for outdoor locations, fixed labels for indoor. Specific wording is sometimes set by the inverter manufacturer.',
  },
  {
    question:
      'If the OSG and GN3 are non-statutory, can I simply not follow them?',
    answer:
      'You can install lawfully without them — the EIC will not be void because you didn\'t open the OSG. But practical defensibility changes. Courts, PI insurers, MCS auditors, EICR inspectors all read consultation of OSG / GN3 as the baseline of competent practice. An installer working solely from BS 7671 may produce technically compliant work — but in dispute the absence of the supporting evidence bundle is treated as a competence gap.',
  },
  {
    question:
      'On an EICR, the inspector finds an undocumented departure from the designer\'s spec on an LCT install. How does the "relevant criteria" doctrine apply?',
    answer:
      'The relevant criteria for the LCT install include the designer-specified requirements (per GN3\'s definition). A departure from the designer\'s spec without justification is a departure from the relevant criteria. The EICR coding follows: where the departure would constitute a contravention with potential danger, C2 is the appropriate code. Where the departure is undocumented but the result remains safe, C3 may apply.',
  },
  {
    question:
      'Are the IET Codes of Practice for PV, EV and EESS revised in the same cycle as OSG / GN3?',
    answer:
      'No — the IET Codes have their own revision cycles, typically faster than the BS 7671 amendment cycle. The IET CoP for Grid-Connected Solar PV is currently in its 5th edition; the IET CoP for EESS is in its 5th edition; the IET CoP for EV Charging is in its 5th edition. The faster cadence reflects the pace of change in those technology areas.',
  },
  {
    question:
      'How will the 19th Edition affect the OSG and GN3?',
    answer:
      'The expected pattern matches previous edition changes. The 19th Edition (expected 2028–2029) will be followed by aligned editions of OSG and GN3 typically six to twelve months later. The OSG / GN3 content will reorganise to match the consolidated 19th Edition chapter structure. The underlying inspection-and-test methodology is unlikely to change wholesale; the references to specific BS 7671 regulations will update to match the new numbering.',
  },
];

export default function RenewableEnergyModule1Section3() {
  const navigate = useNavigate();

  useSEO({
    title:
      'On-Site Guide & Guidance Note 3 for LCT | Renewable Energy 1.3 | Elec-Mate',
    description:
      'How the IET On-Site Guide and Guidance Note 3 (Inspection & Testing) operationalise BS 7671 for low-carbon technology work — including the "relevant criteria" doctrine, the inspect-then-test sequence and the PV warning-notice requirement.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3 · BS 7671:2018+A4:2026"
            title="On-Site Guide & Guidance Note 3 — how they apply to LCT"
            description="The IET On-Site Guide and Guidance Note 3 (Inspection & Testing) operationalise BS 7671 for the everyday installer and the inspector — including the &lsquo;relevant criteria&rsquo; doctrine, the inspect-then-test sequence and the LCT-specific signposts."
            tone="yellow"
          />

          <TLDR
            points={[
              'The On-Site Guide is the IET\'s mass-market practical distillation of BS 7671 — the navigation layer for the everyday installer.',
              'Guidance Note 3 is the practical companion to BS 7671 Part 6 — Section 2.6 contains the test procedures, Section 5 contains example completed forms, Chapter 4 contains instrument calibration guidance.',
              'GN3\'s "relevant criteria" doctrine is fundamental — designer-specified requirements override the BS 7671 baseline. On LCT installs with custom commissioning, this is non-optional.',
              'GN3 sets the sequence: inspect first, correct defects, then test. Tests shall not be conducted if safety might be impaired.',
              'The OSG, GN3 and the relevant IET Code of Practice together form the operational reference set. The cert is the artefact; consultation of all four documents is the competent-practice evidence.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish the operational roles of BS 7671, OSG, GN3 and the IET Codes of Practice.',
              'Apply the "relevant criteria" doctrine on LCT inspection — recognising when designer-specified requirements override the BS 7671 baseline.',
              'Follow the GN3 inspect-then-test sequence rigorously.',
              'Identify the LCT-specific OSG signposts — PV warning notices, isolation labelling, outbuildings, periodic inspection.',
              'Maintain a defensible instrument calibration / verification regime per GN3 Chapter 4.',
              'Assemble the competent-practice evidence bundle that PI insurers, MCS auditors and EICR inspectors expect.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>The OSG is the navigation layer, not the destination.</Pullquote>

          <ContentEyebrow>The OSG and GN3 in the BS 7671 documentation stack</ContentEyebrow>

          <ConceptBlock
            title="What the OSG and GN3 are — and what they aren\'t"
            plainEnglish="The OSG is the everyday installer\'s practical reference. GN3 is the inspector\'s operational manual. Neither replaces BS 7671. Both are non-statutory but accepted by courts, insurers and auditors as the baseline of competent practice."
            onSite="On the workbench: BS 7671, OSG, GN3, the relevant IET CoP, manufacturer instructions. Five documents, one reference set."
          >
            <p>
              The On-Site Guide is the IET\'s mass-market distillation of BS 7671 for the
              general electrician. It takes the most commonly used parts and presents them
              in a more navigable form.
            </p>
            <p>
              The OSG is not a complete substitute for BS 7671. On edge cases, on LCT work
              that touches multiple chapters, or on departures from standard practice, the
              OSG points back to the standard or to the relevant IET Code of Practice.
            </p>
            <p>
              Guidance Note 3 is the practical companion to BS 7671 Part 6 (Inspection and
              Testing). GN3 provides:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Section 2.6</strong> — detailed test procedures</li>
              <li><strong className="text-white">Section 5</strong> — example completed model forms</li>
              <li><strong className="text-white">Chapter 4</strong> — instrument selection and calibration guidance</li>
              <li><strong className="text-white">Throughout</strong> — the inspector-judgement framework BS 7671 stays general on</li>
            </ul>
            <p>
              Both are non-statutory — like BS 7671 itself. Their weight comes from being
              the accepted reference for competent practice. Courts, PI insurers, MCS
              auditors and EICR inspectors treat consultation as the baseline evidence of
              how a competent installer or inspector would have approached the work.
            </p>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="The BS 7671 documentation stack — BS 7671 (regulatory framework), OSG (mass-market navigation), GN3 (Part 6 inspection-and-test companion), IET Codes of Practice (PV, EESS, EV — technology-specific operational manuals), manufacturer instructions (equipment-specific). Each layer addresses a distinct competence question."
            filename="renewable/m1s3-documentation-stack.png"
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The "relevant criteria" doctrine in GN3</ContentEyebrow>

          <Pullquote>GN3&apos;s relevant criteria doctrine is non-optional on LCT.</Pullquote>

          <ConceptBlock
            title="GN3\'s definition of &lsquo;relevant criteria&rsquo; — and why it matters on LCT"
            plainEnglish="GN3 says: the criteria for inspection and testing are the BS 7671 requirements applicable to that inspection or test, unless the designer has specified particular requirements — in which case the designer\'s spec is the criteria."
            onSite="Ask for the designer\'s spec at the start of any LCT inspection or test, not after. If a hybrid PV+BESS install has custom DC isolation, BMS commissioning protocols or fire-detection criteria specified by the designer, those become the relevant criteria."
          >
            <p>
              GN3\'s "relevant criteria" definition is one of the most important rules in
              the BS 7671 documentation stack, and one of the least understood by
              installers coming to LCT from general electrical contracting.
            </p>
            <p>The rule:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Default: the requirements of the Regulations (BS 7671) applicable to the particular inspection or test</li>
              <li>Override: where the designer has specified particular requirements, those are the relevant criteria</li>
            </ul>
            <p>
              On routine domestic work the rule rarely bites. On LCT work it frequently
              does. Hybrid installs commonly have designer-specified items that exceed (or
              differ from) the BS 7671 minimum:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>DC isolation arrangements</li>
              <li>BMS commissioning protocols</li>
              <li>Fire detection arrangements (BESS)</li>
              <li>Remote monitoring criteria</li>
              <li>Workplace EV load-management protocols</li>
              <li>PEN-fault arrangements specific to the chargepoint hardware</li>
            </ul>
            <p>
              For the inspector: ask for the designer\'s spec at the start. The inspector
              who applies BS 7671 alone and ignores the designer\'s particular requirements
              has not applied the relevant criteria as GN3 defines them — even where the
              BS 7671 work is technically compliant.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 — &lsquo;relevant criteria&rsquo; definition"
            clause="For the purposes of inspection and testing, &lsquo;relevant criteria&rsquo; means the requirements of the Regulations (BS 7671) applicable to the particular inspection or test, unless the designer has specified particular requirements for that installation, in which case those designer-specified requirements are &lsquo;relevant criteria&rsquo;."
            meaning="The doctrine that turns inspection from a standard-checklist exercise into an installation-specific assessment. On LCT installs with custom design — most non-trivial LCT installs have at least some — the designer\'s spec is non-optional input."
          />

          <ConceptBlock
            title="When designer-specified criteria don\'t reach the inspector — GN3\'s rule"
            plainEnglish="GN3 anticipates the case where the criteria exist but the inspector doesn\'t have them. The rule: forward the test results to the designer for verification rather than apply default acceptance."
            onSite="On an EICR for a job the installer didn\'t design, the inspector who finds inconsistency between BS 7671 baseline and the apparent install specifics should forward results to the designer rather than default-accept."
          >
            <p>
              On a periodic inspection of a five-year-old hybrid install where the original
              design pack is no longer accessible, GN3 directs the inspector to forward test
              results to the designer (or a competent designer assessor) rather than
              unilaterally applying default acceptance.
            </p>
            <p>
              For the LCT installer doing initial verification of their own work, the
              equivalent discipline is to ensure the cert carries enough detail of the
              design-time decisions that a future inspector can read the design intent. A4\'s
              Reg 133.1.3 change (equipment-usage recording) moves the cert deliberately in
              this direction.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>The inspect-then-test sequence in GN3</ContentEyebrow>

          <Pullquote>Inspect first, test second.</Pullquote>

          <ConceptBlock
            title="GN3\'s sequence rule — inspect, correct defects, then test"
            plainEnglish="GN3 is explicit: tests shall not be conducted where defects may impair safety. Inspection comes first; testing validates a properly inspected installation."
            onSite="The most common installer error in LCT commissioning is treating insulation resistance testing as a first-pass safety check. The sequence is: visual and mechanical inspection → identify defects → correct → test → record."
          >
            <p>The rule is technical and procedural at once:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Technical</strong> — testing a defective
                installation may injure personnel or damage equipment
              </li>
              <li>
                <strong className="text-white">Procedural</strong> — testing cannot make a
                defective installation safe; only correction can
              </li>
            </ul>
            <p>
              On LCT work the rule frequently meets commercial pressure pushing the other
              direction. The installer arrives with a tight handover deadline. The visual
              inspection shows a loose PV module clamp, an inverter warning notice
              weathered to illegible, or a DC isolator label that has fallen off. The
              temptation is to test first, log the defects, treat them as
              commissioning-stage rectifications.
            </p>
            <p>
              GN3 says this is wrong. All three defects should be corrected before any
              testing instrument is connected.
            </p>
            <p>
              The corollary is also worth absorbing: testing is not a search for defects.
              Insulation resistance testing on a PV string is not a way to discover whether
              the string is properly isolated; it is a confirmation that the string is
              properly isolated after the visual and mechanical inspection has confirmed
              the same thing.
            </p>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="The GN3 inspect-then-test sequence — flowchart showing the procedural gate: Inspection → identify defects → correct defects → test methodology → record. The 'safety might be impaired' gate blocks testing until defects are corrected."
            filename="renewable/m1s3-inspect-then-test-flowchart.png"
          />

          <RegsCallout
            source="GN3 — sequence of inspection and testing"
            clause="Tests shall not be conducted if safety might be impaired by defects. Correcting defects prior to testing ensures that testing does not create or encounter hazardous conditions. Testing shall not be relied upon as a substitute for correcting defects found on inspection — defects observed during inspection shall be corrected prior to testing."
            meaning="The deviation from the inspect-then-test sequence is read as competence gap by auditors and insurers. Applying test methodology to a defective installation may energise an unsafe circuit, damage instruments, or injure personnel. Both reasons converge on the same operational rule."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>OSG signposts that matter for LCT</ContentEyebrow>

          <ConceptBlock
            title="What the OSG signposts that BS 7671 leaves general for LCT"
            plainEnglish="The OSG flags the practical items that BS 7671 sets in general terms — PV warning notices, isolation labelling on multiple-device installs, outbuilding considerations, periodic inspection scope."
            onSite="Walk the OSG index for the LCT terms when scoping a job. The signposts are where the practical detail lives, in a form fast enough to use on site."
          >
            <p>OSG signposts relevant to LCT installs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Photovoltaic systems warning notice</strong>
                {' '}— PV arrays require durable warning notices at the incomer / consumer
                unit and on the roof / array location
              </li>
              <li>
                <strong className="text-white">Isolation identification multiple devices</strong>
                {' '}— where multiple devices provide isolation (AC isolator at CU, DC
                isolator at inverter, BESS isolator), each must be labelled
              </li>
              <li>
                <strong className="text-white">Outbuildings</strong> — separate buildings
                on the same premises (garages, sheds, garden offices) — common siting for
                domestic BESS and some PV inverter installations
              </li>
              <li>
                <strong className="text-white">Periodic inspection</strong> — EICR scope in
                dwellings now routinely includes LCT installations
              </li>
            </ul>
            <p>
              The OSG is not the detailed reference for any of these. The detailed
              reference lives in BS 7671 itself, GN3 and the relevant IET CoP. The OSG is
              the navigation layer that puts the everyday installer in the right place in
              the documentation stack.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="On-Site Guide — Photovoltaic systems warning notice"
            clause="PV arrays require durable warning notices at appropriate locations (e.g. at the incomer / consumer unit and on the roof) to inform of live PV conductors. The On-Site Guide indicates guidance on the content and placement of PV warning notices in accordance with BS 7671."
            meaning="The OSG translates the BS 7671 Section 712 PV scope into a practical fitting requirement. The two warning notices address the two distinct safety scenarios — anyone working on the AC supply needs to know about the parallel DC source; anyone working at module level needs to know DC conductors remain live during daylight."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Instrument calibration and the GN3 discipline</ContentEyebrow>

          <ConceptBlock
            title="The instrument discipline — calibration, check boxes, and what the audit trail looks like"
            plainEnglish="GN3 requires periodic instrument calibration. Between formal calibrations, a proprietary check box verifies readings. The discipline is what stands up to PI audit when a borderline reading goes to dispute."
            onSite="Maintain three records: calibration certificates with traceable dates; the check-box verification log; the cert\'s reference to which instrument was used for each test."
          >
            <p>The discipline is two-layered:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Annual formal calibration</strong> by a
                UKAS-accredited or manufacturer-authorised lab. Evidenced by a calibration
                certificate with instrument serial number, date and validity period.
              </li>
              <li>
                <strong className="text-white">Mid-cycle check-box verification</strong>
                {' '}— a device with clearly defined electrical characteristics (known
                resistance, known loop impedance, known continuity) used to verify the
                instrument hasn\'t drifted between formal calibrations.
              </li>
            </ul>
            <p>
              For LCT work the discipline matters disproportionately. DC string insulation
              resistance, BESS isolation impedance and PV continuity testing all involve
              borderline-acceptance judgements. An out-of-calibration tester producing a
              borderline reading is worse than no test at all — the false confidence is the
              failure mode.
            </p>
            <p>
              On a borderline reading that later goes to dispute, the audit trail —
              instrument was in calibration, check-box verification was within tolerance,
              the reading was correctly recorded — is what defends the acceptance call.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 — instrument calibration and check-box verification"
            clause="Instruments shall be periodically calibrated. Periodic calibration is required to control loss of calibration or accuracy and ensure the instrument&apos;s measurements remain reliable. A proprietary &lsquo;check box&rsquo; is a device having clearly defined characteristics used to check instrument readings — providing known values or simulated conditions so that an instrument&apos;s output can be verified between formal calibrations."
            meaning="Maintain the calibration paperwork as part of the cert evidence bundle — not in a drawer separately. The discipline is small; the cost of a borderline-reading dispute without it is large."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Pullquote>The competent-practice evidence bundle is what defends the work.</Pullquote>

          <Scenario
            title="Periodic inspection of a five-year-old hybrid PV + BESS install"
            situation="An EICR is requested on a 2021 hybrid PV + AC-coupled BESS install. The original installer is no longer trading, the design pack is not accessible, and the BS 7671 edition at the time of design was A2:2022. The current edition is A4:2026. The inspector\'s initial DC insulation resistance reading on the PV string is borderline against the BS 7671 baseline threshold."
            whatToDo="Apply GN3\'s &lsquo;relevant criteria&rsquo; doctrine. The relevant criteria are assessed against the edition in force at design (A2:2022), with current safety assessed against the current edition (A4:2026). The borderline reading needs designer verification — the original designer-specified threshold may have been more stringent than the BS 7671 baseline. Where the designer is unreachable, GN3 directs forwarding the results to a competent designer for verification. The EICR report records: instrument used, calibration date, check-box verification, reading observed, threshold applied, basis of acceptance / coding."
            whyItMatters="The default-acceptance route under-inspects the installation against the criteria the design was built to. The escalation route produces a cert that defends the inspection if the install subsequently fails. On LCT periodic inspection — where the install often includes designer-specific commissioning protocols — the default route is the wrong default."
          />

          <CommonMistake
            title="Treating the OSG as a complete reference on LCT work"
            whatHappens="An installer with general 18th Edition competence takes on PV / BESS work and works from the OSG alone. The OSG signposts are followed. But the OSG does not contain the detailed test methodology for PV commissioning, the chemistry-aware BESS siting considerations, or the EV chargepoint PEN-fault decision tree. The MCS auditor flags the design pack."
            doInstead="Treat the OSG as the navigation layer, not the destination. For LCT work, the OSG signposts and points back to BS 7671, GN3 and the relevant IET Code of Practice. The four documents together are the competent-practice reference set; OSG alone is the partial picture."
          />

          <CommonMistake
            title="Using insulation resistance testing as a first-pass defect discovery tool"
            whatHappens="On a hybrid PV+BESS commissioning, the installer connects the insulation resistance tester before completing visual and mechanical inspection — using the tester to &lsquo;discover&rsquo; whether the DC string is properly isolated. The tester flags a borderline reading; the installer assumes a marginal install. In fact a loose terminal at the combiner box is the actual defect — visible on inspection but masked by the test methodology being applied first."
            doInstead="Follow GN3\'s inspect-then-test sequence. Complete the visual and mechanical inspection first — DC isolator labelling, module clamps, cable routing, terminal torque, warning notices, earthing continuity. Correct defects. Then apply the test methodology to the corrected installation."
          />

          <CommonMistake
            title="Issuing the EIC without a designer-specification departure register"
            whatHappens="An LCT install completes with some departures from the original designer\'s spec — a different cable route to avoid a structural obstacle, a different RCD type to match available stock. The departures are technically safe; the EIC is issued without a departure register. Five years later a periodic inspection notices the departures, the designer is unavailable, and the inspector applies the &lsquo;relevant criteria&rsquo; doctrine to flag the discrepancy."
            doInstead="Every departure from the designer\'s spec — however small, however safe — should be recorded on the cert in the departure register. The record describes the departure, the alternative measure adopted, the reasoning for equivalent safety, and the sign-off. A4\'s Reg 133.1.3 equipment-usage recording change makes this discipline easier to operationalise."
          />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>The 19th Edition — what changes for OSG and GN3</ContentEyebrow>

          <ConceptBlock
            title="The OSG and GN3 will track the 19th Edition consolidation"
            plainEnglish="When the 19th Edition publishes (expected 2028–2029), the OSG and GN3 will issue aligned editions within six to twelve months. The underlying methodology is unlikely to change; the references to BS 7671 regulations will update."
            onSite="The transition discipline is the same as every previous edition change. Don\'t mix dated editions on a single cert. Update operational copies as soon as the aligned editions publish."
          >
            <p>The pattern matches previous edition changes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>A1, A2, A3 amendments each followed by aligned OSG / GN3 editions within 6–12 months</li>
              <li>A4:2026-aligned editions of OSG and GN3 expected in the same window</li>
              <li>19th Edition publication (expected 2028–2029) will follow the same pattern</li>
            </ul>
            <p>The substantive content of OSG and GN3 is unlikely to change wholesale:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Inspect-then-test sequence — expected to persist</li>
              <li>Relevant-criteria doctrine — expected to persist</li>
              <li>Instrument calibration discipline — expected to persist</li>
              <li>LCT signposts — expected to persist, with updated reference apparatus</li>
            </ul>
            <p>
              What will change is the reference apparatus — the consolidated 19th Edition
              Part 7 LCT framework will replace the scattered chapter references currently
              used in the OSG and GN3.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'The On-Site Guide is the IET\'s mass-market practical distillation of BS 7671 — the navigation layer for the everyday installer.',
              'Guidance Note 3 is the practical companion to BS 7671 Part 6 — Section 2.6 (test procedures), Section 5 (model forms), Chapter 4 (instrument calibration).',
              'GN3\'s "relevant criteria" doctrine is non-optional on LCT work — designer-specified requirements override the BS 7671 baseline.',
              'GN3\'s inspect-then-test sequence is technical and procedural — tests shall not be conducted where defects may impair safety.',
              'OSG signposts that matter for LCT: PV warning notices, isolation labelling on multiple-device installs, outbuildings, periodic inspection.',
              'GN3 Chapter 4 sets the instrument discipline — periodic formal calibration, supplemented by proprietary check-box verification between calibrations.',
              'The competent-practice evidence bundle: BS 7671 + OSG + GN3 + IET Code of Practice + manufacturer instructions. Treating the EIC as standalone evidence is the most common documentation gap at renewal.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1.2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                The LCT chapter map
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 MCS, MIS &amp; competent person
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
