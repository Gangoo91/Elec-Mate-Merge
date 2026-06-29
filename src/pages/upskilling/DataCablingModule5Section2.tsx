import { ArrowLeft, ChevronRight } from 'lucide-react';
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
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m5s2-link-vs-channel',
    question:
      'You are running an end-of-job test on a Cat6A horizontal run. Should you use the permanent-link adapter or the channel adapter, and why?',
    options: [
      'Permanent-link adapter — the contractor warrants the installed (semi-permanent) cabling from the work-area outlet to the patch panel; the cords are not part of the contractor scope. The channel adapter is for end-user verification of a fully-patched run including the cords. Both are valid in TIA-1152-A; the choice depends on what is being warranted.',
      'Channel adapter — it tests the longer signal path so it must be more thorough.',
      'Either, they are interchangeable.',
      'Always channel — the standards require it.',
    ],
    correctIndex: 0,
    explanation:
      'Permanent-link testing certifies the contractor scope: the solid-conductor cable from the work-area outlet to the patch panel, terminated at both ends. Channel testing additionally includes the patch cord at each end, so it certifies the end-user scope. Both are TIA-1152-A / BS EN 50346 valid, and good contractors do both — permanent-link at install for the warranty record, channel at user request for end-to-end verification before equipment connection. The adapters are different physical objects: the permanent-link adapter terminates at the patch panel and the keystone, including their connectors, in the test result; the channel adapter starts and ends at the patch-cord plug, so the patch cords are included.',
  },
  {
    id: 'datacabling-m5s2-certifier-level',
    question:
      'A specification calls for "Cat6A certified to TIA-1152-A". The contractor offers a Level III certifier. The manufacturer warranty paperwork requires Level V. Which prevails?',
    options: [
      'Level III — TIA-1152-A only requires Level III for Cat6A.',
      'Whichever the contractor prefers.',
      'Level V — manufacturer warranty terms are part of the contract once the contractor selected the warranty path. Level V provides the accuracy headroom required at 500 MHz to deliver a clean Class EA pass and is what the warranty manufacturer uses to sign off the cabling. If the contractor cannot produce Level V output, the warranty does not apply, regardless of the spec wording.',
      'Level III on copper, Level V on fibre.',
    ],
    correctIndex: 2,
    explanation:
      'TIA-1152-A defines field-test instrument accuracy levels: III, IIIe, IV and V — V being the most accurate (current top tier). For Cat6A / Class EA, Level III is the minimum mandated for the certification report itself, but most major manufacturers (Panduit, CommScope, Leviton, Belden) require Level V instrument output to honour their 25-year warranty programmes. The reason is headroom: at 500 MHz, the difference between a Level III pass and a Level V pass on identical cable can be enough to flip a marginal result. The contractor who specified the warranty path is contractually bound to the warranty terms — including the Level V requirement.',
  },
  {
    id: 'datacabling-m5s2-dc-resistance-unbalance',
    question:
      'On a Cat6A test certificate you see "DC resistance unbalance" listed as a measured parameter. What does it mean, and why does it matter for PoE?',
    options: [
      'A general electrical-safety check that has nothing to do with PoE.',
      'A test only used on shielded cables.',
      'Something only required on Cat8 installations.',
      'The difference in DC resistance between the two conductors of a pair (or pair-to-pair). For PoE — which uses balanced cabling to deliver DC current — significant unbalance causes uneven current sharing across the conductors, which produces uneven heating, accelerated insulation ageing, and ultimately degraded data performance under continuous load. Modern certifiers measure it; manufacturer warranties and BS 7671 §716 (via BS EN 50173-1 / TIA TSB-184-A) treat it as critical.',
    ],
    correctIndex: 3,
    explanation:
      'DC resistance unbalance is the parameter that links pure data-cabling testing to PoE power delivery. PoE works because the two conductors of each pair share the supply current symmetrically; if one conductor has higher DC resistance than the other (poor termination, kinked cable, partial conductor break), the lower-resistance conductor carries more current, heats more, ages faster — and the imbalance compounds. TIA TSB-184-A (2017) — referenced indirectly via BS 7671 §716.523.1.101 NOTE 2 (which cites PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, and ISO/IEC TS 29125 for bundle thermal management) — treats DC resistance unbalance as a pass/fail PoE parameter. Every modern certifier measures it. The maximum tolerance is typically 3 % within a pair and 7 % between pairs for Class EA, but follow the manufacturer warranty figures.',
  },
  {
    id: 'datacabling-m5s2-margins',
    question:
      'A Cat6A link passes Class EA with a 0.4 dB NEXT margin and a 0.2 dB return-loss margin. Is this acceptable handover quality?',
    options: [
      'Yes — a pass is a pass.',
      'No — sub-1 dB margins are marginal passes that drift under thermal cycling and PoE load. Best practice: re-terminate (the most common cause is over-stripped jacket or excess pair untwist) before handover. Manufacturer warranty audits typically require 3-5 dB margins for full warranty cover. Marginal passes are six-month links, not 15-year links.',
      'Yes for offices, no for data centres.',
      'Only if the cable is shielded.',
    ],
    correctIndex: 1,
    explanation:
      'Class EA at handover with comfortable margins (typically 3-5 dB or better on NEXT, return loss, ACR-F) is a 15-year channel. Marginal pass — sub-1 dB margins — drifts under PoE thermal load and seasonal humidity, often degrading to Class E or fail within months. Major manufacturer warranty programmes treat sub-3 dB margins as failing for warranty purposes even if the channel passes per the standard. The fix is to re-terminate at handover — the dominant cause of marginal passes is over-stripped jacket and excess pair untwist; both are correctable in 5-10 minutes per termination. Refusing marginal passes at handover is the cheapest insurance the contractor can buy.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which TIA standard governs the field-test instrument accuracy levels (III, IIIe, IV, V) used to certify balanced twisted-pair cabling installations?',
    options: [
      'ANSI/TIA-1152-A, the field-test-instrument standard defining accuracy levels III to V.',
      'ANSI/TIA-568.0-E, the generic telecommunications cabling for customer premises standard.',
      'ANSI/TIA-606-D, the administration standard for labelling and identifier records.',
      'ANSI/TIA-942-C, the data-centre infrastructure standard with redundancy classes 1-4.',
    ],
    correctAnswer: 0,
    explanation:
      'TIA-1152-A (2016, current) is the field-test-instrument standard. It bounds the accuracy of the certifier itself across the parameter set — insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew, DC resistance, DC resistance unbalance — and defines the instrument-accuracy levels III, IIIe, IV and V. BS EN 50346 is the EN-aligned equivalent and governs UK-side test methodology. Level V instruments (Fluke DSX-8000, ideal LanXPLORER, Softing WireXpert top tier) are the modern Cat6A and Cat8 default; manufacturer 25-year warranties usually require Level V output.',
  },
  {
    id: 2,
    question:
      'What is the difference between a permanent-link test and a channel test on a balanced twisted-pair installation?',
    options: [
      'They are the same test with different names, used interchangeably at handover.',
      'Channel testing applies to fibre links, while permanent-link testing applies to copper.',
      'Permanent-link tests the installed cabling and connectors; channel adds the patch cords too.',
      'Permanent-link is used for new installs, while channel is used only for later retests.',
    ],
    correctAnswer: 2,
    explanation:
      'The two test models are formally defined in TIA-1152-A and BS EN 50346. Permanent-link adapters at each end of the certifier mimic the cross-connect / outlet connections, so the test result includes both connectors and the solid-conductor cable in between, but excludes the cords. Channel adapters mimic the active-equipment-side plug, so the test result includes everything the active equipment sees — including the cords. Contractors typically certify to permanent-link at handover (the cords are end-user kit) and offer channel testing as an additional service when the user wants end-to-end confidence with their specific cords in place.',
  },
  {
    id: 3,
    question:
      'Which of the following is NOT one of the parameters typically reported by a TIA-1152-A field certifier on a Cat6A test?',
    options: [
      'Insertion loss.',
      'NEXT (near-end crosstalk).',
      'DC resistance unbalance.',
      'Mechanical bend radius.',
    ],
    correctAnswer: 3,
    explanation:
      'Field certifiers measure electrical parameters on the cable channel: insertion loss, NEXT (pair-to-pair near-end crosstalk), PSNEXT (power sum NEXT), ACR-F (attenuation-to-crosstalk ratio, far-end), return loss, propagation delay, delay skew, DC resistance, and DC resistance unbalance. They also report wire map (continuity / pinout), length and effective electrical length. Mechanical bend radius is an install-time discipline (BS EN 50174-2) that you check by eye and by measurement during the install — the certifier does not measure it directly. A bend that has gone too tight will show up as a return-loss bump or inflated effective length, but not as a "bend radius" parameter.',
  },
  {
    id: 4,
    question:
      'For a Cat6A horizontal run with two patch cords (one at the FD, one at the work area), which test result does the contractor typically deliver as part of handover, and which does the end user request?',
    options: [
      'Both deliverables are channel tests; the contractor and the user want the same result.',
      'Permanent-link is the contractor handover; channel is the user check with their own cords.',
      'Only channel testing is used at handover, since the permanent-link model is now obsolete.',
      'Only permanent-link testing is used, since the channel model has been withdrawn entirely.',
    ],
    correctAnswer: 1,
    explanation:
      'The contractor scope is the permanent link — the bit installed inside the wall, terminated at both ends, that the contractor warrants for 15-25 years (depending on warranty programme). The cords are end-user kit and can change weekly. Permanent-link tests are the contractor handover. Channel tests include the cords and are typically offered as an additional service: when the end user has selected the cords they will use, the contractor (or the end user with their own certifier) tests the channel as it will actually run. Good contracts pre-agree which test will be delivered at handover; many specify both.',
  },
  {
    id: 5,
    question:
      'What is "DC resistance unbalance" and why is it the PoE-specific parameter every modern Cat6A certifier supports?',
    options: [
      'The DC resistance difference within a pair or between pairs, which causes uneven PoE heating.',
      'A general electrical-safety check confirming the link is safe to connect to active equipment.',
      'A test parameter only relevant to optical-fibre links, not to balanced twisted-pair cabling.',
      'A wire-map shortcut that confirms pin continuity without a full transmission-parameter sweep.',
    ],
    correctAnswer: 0,
    explanation:
      'DC resistance unbalance is the bridge between data-cabling testing and PoE power testing. The data-channel parameters (insertion loss, NEXT, return loss) describe how the cabling carries a balanced AC signal. DC resistance unbalance describes how the cabling shares balanced DC power. For PoE — which delivers up to 750 mA per conductor under BS 7671 §716.523.2.101 — the conductors of a pair must share current evenly, or the heavier-loaded conductor heats faster, ages faster, and may eventually fail. Tolerances are typically 3 % intra-pair, 7 % inter-pair for Class EA; follow the manufacturer warranty figures. TIA TSB-184-A (2017) is the supporting guidance.',
  },
  {
    id: 6,
    question:
      'Which BS EN standard is the EN-aligned equivalent of TIA-1152-A for testing installed cabling?',
    options: [
      'BS EN 50173-1, the generic cabling performance and Class-definition standard.',
      'BS EN 50310, the bonding and earthing network standard for ICT installations.',
      'BS EN 50346, the testing-of-installed-cabling methodology standard.',
      'BS EN 60825-2, the optical-fibre communication-system laser-safety standard.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 50346 is the EN-aligned testing standard. BS EN 50173-1 is the performance / Class definition; BS EN 50174 is the install practice; BS EN 50346 is the testing methodology. TIA-1152-A is the ANSI/TIA equivalent of BS EN 50346. UK installations may be tested to either or both — many international manufacturer warranty programmes accept either. The certifier output reports against the chosen standard; the parameter set and pass/fail mechanics are aligned.',
  },
  {
    id: 7,
    question:
      'A Cat6A certified link shows a 1.8 dB NEXT margin and a 4.2 dB return-loss margin. Best practice for handover: accept, retest, or re-terminate?',
    options: [
      'Accept — both margins are positive, so the link passes Class EA and needs no further work.',
      'Retest with a different certifier, since a second instrument may report a wider NEXT margin.',
      'Accept the result on Cat6A, but re-terminate the same link if it were specified as Cat6.',
      'Re-terminate — 1.8 dB NEXT is a marginal pass below the warranty zone; re-terminating lifts it.',
    ],
    correctAnswer: 3,
    explanation:
      'A 1.8 dB margin is a marginal pass. The link technically passes Class EA per the standard, but it sits inside the warranty-rejection zone for most major manufacturers (Panduit, CommScope, Leviton, Belden typically require 3-5 dB on NEXT for full 25-year warranty cover). It also drifts under thermal cycling — PoE current heats the conductors, the cable warms during the day and cools overnight, the IDC contacts move microscopically — and a 1.8 dB margin can degrade to a fail in months. Re-terminate at handover. The dominant cause is excess pair untwist; the fix is 5-10 minutes per termination.',
  },
  {
    id: 8,
    question:
      'What is the practical purpose of recording propagation delay and delay skew on a certified Cat6A link?',
    options: [
      'Delay is end-to-end travel time; skew is the pair-to-pair difference 10GBASE-T must keep small.',
      'They confirm the cable jacket colour and print legend match the project bill of materials.',
      'They are a regulatory disclosure recorded for building control rather than a performance check.',
      'They are only meaningful for optical-fibre links, not for balanced twisted-pair channels.',
    ],
    correctAnswer: 0,
    explanation:
      '10GBASE-T (and 25GBASE-T, 40GBASE-T on Cat8) parallelises the data stream across all four pairs. The receiver re-aligns and recombines the four streams — but only if they arrive within a tight delay window. Delay skew is the worst-case pair-to-pair delay difference. For Class EA the cap is typically 50 ns; for Class I/II (Cat8) it is tighter. Excessive skew most commonly indicates a mixed-cable run (two reels of slightly different cable joined together), a damaged pair, or a manufacturing fault. The certifier flags it; the fix is usually re-pulling the affected segment.',
  },
  {
    id: 9,
    question:
      'Why does a competent contract specify "TIA-1152-A Level V" certifier output rather than just "TIA-1152-A"?',
    options: [
      'Because Level V instruments are explicitly mandated for data cabling by BS 7671.',
      'Because Level III instruments are no longer manufactured and cannot be hired anywhere.',
      'Because the standard defines several accuracy levels, and Cat6A warranties need Level V.',
      'Because a specification must always name the most expensive certifier option available.',
    ],
    correctAnswer: 2,
    explanation:
      'TIA-1152-A is a layered standard: it defines the test parameters AND the instrument accuracy levels. A specification that says "TIA-1152-A" without a level is incomplete — different levels produce different effective margins on the same cable. Level V instruments have the lowest residual measurement noise and the tightest calibration tolerances, which is why manufacturer warranty programmes for Cat6A and Cat8 typically require Level V. The competent specification is "TIA-1152-A Level V certifier output, archived per link, supplied as part of handover documentation". That binds the contractor to the same accuracy regime the warranty manufacturer will audit against.',
  },
  {
    id: 10,
    question:
      'Why is "documented certification" — the archived certifier file from every link — listed as part of handover, not as a nicety?',
    options: [
      'It looks professional on the as-built records handed to the client at completion.',
      'It is required only for government and other public-sector cabling contracts.',
      'It is a tax-record requirement retained for the contractor accounts, not for the client.',
      'It is the objective record that proves Class EA, secures warranty and baselines faults.',
    ],
    correctAnswer: 3,
    explanation:
      'Certifier output is the evidence record. TIA-606-D (2021) and BS EN 50174-1 require it for administration. Manufacturer warranty programmes require it for warranty cover. The end user requires it for handover acceptance. The archived per-link certifier file (typically Fluke .lncx, ideal Sample.flw, Softing .test) is human-readable and machine-readable, with every measured parameter, margin, instrument calibration record, and link identification stamped against the date. Two years later when a fault appears, you compare the original certification against a re-test and instantly see what changed. Without the archive, every fault is forensic; with it, fault-finding is targeted.',
  },
];

const faqs = [
  {
    question: 'Permanent-link or channel — which test do I deliver at handover?',
    answer: (
      <>
        Permanent-link is the contractor-scope test — it certifies the installed (semi-permanent)
        cabling from the work-area outlet to the patch panel that the contractor warrants. Channel
        includes the patch cords at each end and certifies the end-to-end signal path the active
        equipment will see. Most contracts specify permanent-link at handover for the warranty
        record, and offer channel testing as an additional deliverable when the end user wants
        verification with their specific cords in place. Both are valid TIA-1152-A / BS EN 50346
        measurements; pick which to deliver at contract stage.
      </>
    ),
  },
  {
    question: 'Do I need a Level V certifier for Cat6A?',
    answer: (
      <>
        Per TIA-1152-A, Level III is the minimum mandated for Class EA / Cat6A. Per most
        manufacturer warranty programmes (Panduit, CommScope, Leviton, Belden — 25-year warranties),
        Level V is required. The reason is headroom: at 500 MHz, Level V instruments have the lowest
        measurement noise and tightest calibration tolerances, which is what the warranty
        manufacturer audits against. If the spec invokes a manufacturer warranty path, Level V is
        effectively binding. Specify the level explicitly in the contract: "TIA-1152-A Level V
        certifier output, archived per link".
      </>
    ),
  },
  {
    question: 'What is a "marginal pass" and why should I refuse it at handover?',
    answer: (
      <>
        A marginal pass is a Class EA result with sub-1 to sub-3 dB margins on critical parameters
        (NEXT, return loss, ACR-F). It technically passes per the standard, but it drifts under
        thermal cycling and PoE load — sub-1 dB margins commonly degrade to fail within months. Most
        major manufacturer warranty programmes treat sub-3 dB margins as failing for warranty
        purposes. Best practice: re-terminate marginal passes at handover. The dominant cause is
        over-stripped jacket and excess pair untwist; the fix is 5-10 minutes per termination. Class
        EA at handover with comfortable 3-5 dB margins is a 15-year channel; marginal-pass Class EA
        is a six-month channel.
      </>
    ),
  },
  {
    question: 'Why does the certifier measure "DC resistance unbalance"?',
    answer: (
      <>
        Because PoE delivers DC current through the same balanced pairs as the data signal. Both
        conductors of a pair must carry equal current; if one has higher resistance, the other
        carries more current, heats more, and ages faster — and the imbalance compounds under
        continuous PoE load. DC resistance unbalance is the parameter that catches this before it
        becomes a thermal failure. Tolerances are typically 3 % intra-pair and 7 % inter-pair for
        Class EA; manufacturer warranties may set tighter figures. Every modern certifier measures
        it; under BS 7671 §716, treating it as critical is no longer optional.
      </>
    ),
  },
  {
    question: 'What test parameters does a Cat6A certifier actually measure?',
    answer: (
      <>
        The TIA-1152-A / BS EN 50346 parameter set: <strong>insertion loss</strong> (signal
        attenuation), <strong>NEXT</strong> (near-end crosstalk, pair-to-pair),{' '}
        <strong>PSNEXT</strong> (power-sum NEXT), <strong>ACR-F</strong> (attenuation-to-crosstalk
        ratio, far-end), <strong>return loss</strong> (signal reflections),{' '}
        <strong>propagation delay</strong> (signal travel time), <strong>delay skew</strong>{' '}
        (pair-to-pair delay difference), <strong>DC resistance</strong>, and{' '}
        <strong>DC resistance unbalance</strong> (PoE-critical). Plus <strong>wire map</strong>{' '}
        (continuity and pinout) and <strong>length</strong> / effective electrical length. The
        certifier reports each parameter against the Class EA pass criteria, with margins expressed
        in dB.
      </>
    ),
  },
  {
    question: 'How do I store and present certification records at handover?',
    answer: (
      <>
        Per BS EN 50174-1 / TIA-606-D administration requirements: every link individually
        identified with the site labelling scheme; certifier file (Fluke .lncx, ideal .flw, Softing
        .test) archived per link; PDF summary per link AND a roll-up summary across all links;
        instrument calibration record for the certifier on the test date; any re-terminated links
        flagged with re-test results. Hand the archive over with the as-built drawings and the
        labelling record. Many manufacturer warranty programmes require electronic submission of the
        certifier files (raw, not PDF) to register the warranty.
      </>
    ),
  },
];

const DataCablingModule5Section2 = () => {
  const navigate = useNavigate();

  useSEO(
    'Link Testing vs Channel Testing | Data Cabling Module 5.2 | Elec-Mate',
    'TIA-1152-A and BS EN 50346 field certification — permanent-link vs channel adapters, instrument accuracy levels (III, IIIe, IV, V), the parameter set (insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew, DC resistance, DC resistance unbalance for PoE), pass / fail margins, and the documented certification regime that delivers a 15-year channel.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2"
            title="Link Testing vs Channel Testing"
            description="TIA-1152-A and BS EN 50346 field certification — permanent-link vs channel adapters, instrument accuracy levels III to V, the parameter set the certifier reports, the DC resistance unbalance test that links data cabling to PoE delivery, the pass / fail margins that separate a 15-year channel from a six-month channel, and the documented certification regime that converts components into evidence."
            tone="yellow"
          />

          <TLDR
            points={[
              'Two test models. Permanent-link certifies the contractor scope — the solid-conductor cable from the work-area outlet to the patch panel, including both connectors. Channel additionally includes the patch cords. Both are TIA-1152-A / BS EN 50346 valid; permanent-link is the typical handover deliverable.',
              'Instrument accuracy is graded — TIA-1152-A defines Levels III, IIIe, IV and V, with V the current top tier. Cat6A passes per the standard at Level III but most manufacturer warranties require Level V output. Specify the level explicitly in the contract.',
              'The certifier measures the full parameter set: insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew, DC resistance, and — critically for PoE — DC resistance unbalance. Each parameter has a Class-EA pass criterion and a margin in dB.',
              'Class EA at handover with comfortable 3-5 dB margins is a 15-year channel. Marginal pass with sub-1 dB margins drifts under thermal cycling and PoE load — it is a six-month channel. Re-terminate marginal passes at handover. Archive every certifier file per link as the objective record.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish a permanent-link test from a channel test, name the adapters used for each, and pick the right one for contractor handover vs end-user verification',
              'State the four TIA-1152-A instrument accuracy levels (III, IIIe, IV, V) and explain why Cat6A warranties typically require Level V',
              'List the parameter set a modern certifier measures — insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew, DC resistance, DC resistance unbalance — and explain what each describes',
              'Explain why DC resistance unbalance is the PoE-specific parameter every modern Cat6A certifier supports, and link it to BS 7671 §716.523.2.101',
              'Identify a marginal pass from certifier output (sub-1 to sub-3 dB margins) and apply the no-marginal-pass handover discipline',
              'Read a typical certifier output (Fluke DSX, ideal SignalTEK, Softing WireXpert) and recognise the symptoms of common termination defects',
              'Specify a competent test regime in a cabling contract — including the standard, the level, the adapter type, the parameter margins, and the archive format',
              'Apply the BS EN 50174-1 / TIA-606-D administration discipline so every link is uniquely identified and every certifier file is archived for the cabling life',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Permanent-link vs channel — two test models</ContentEyebrow>

          <ConceptBlock
            title="What the contractor warrants vs what the user actually sees"
            plainEnglish="A horizontal cabling run has two distinct sub-systems: the permanent link (the solid-conductor cable from the work-area outlet to the patch panel, including both connectors) and the cords (the stranded-conductor patch cord at the FD and the work-area cord at the desk). The permanent link is the contractor's installed product, warrantable for 15-25 years. The cords are end-user kit, replaceable in seconds. The two test models — permanent-link and channel — measure these two sub-systems separately or together."
            onSite="On site, a Cat6A install is typically certified to permanent-link at handover. The contractor lays down a Level V certifier, fits a permanent-link adapter at each end (one at the patch panel, one at the work-area outlet), tests every link, archives the result. Channel testing is offered as an additional deliverable — the user supplies the cords they will actually use, the contractor (or the user with their own certifier) runs a channel test through the cords, and the result documents the end-to-end signal path."
          >
            <p>The two test models in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Permanent-link test.</strong> Adapters at each end of the certifier
                terminate at the patch panel and the work-area outlet — i.e. INSIDE the connector at
                each end, so the connectors are part of the result. The permanent-link adapter is a
                calibrated reference termination that mimics what a perfect outlet / patch-panel
                mating would look like. The result certifies the solid-conductor cable PLUS both
                connectors. Maximum length: 90 m. Used at handover.
              </li>
              <li>
                <strong>Channel test.</strong> Adapters at each end mimic the active-equipment
                connection — i.e. the test ends at the PLUG of the patch cord, so the cords are
                INCLUDED in the result. The channel adapter looks electrically like the switch port
                and the user device port. The result certifies the full signal path the active
                equipment will see. Maximum length: 100 m (90 m permanent link + ≤ 10 m cord
                allowance). Used for end-user verification.
              </li>
            </ul>
            <p>
              Both are valid measurements. Both are defined in TIA-1152-A and BS EN 50346. The
              choice at handover depends on what is being warranted:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Contractor handover</strong> — permanent-link is the natural choice. The
                cords are end-user kit and may change. The contractor warrants the permanent link,
                which is what the manufacturer warranty programme registers against.
              </li>
              <li>
                <strong>End-user pre-deployment verification</strong> — channel is the natural
                choice. The user has selected the cords and wants confidence that the full signal
                path delivers Class EA before active equipment goes in.
              </li>
              <li>
                <strong>Both</strong> — many high-spec contracts deliver both tests, so the
                contractor warrants the permanent link AND the user has a baseline channel record
                for the cord set in use at deployment.
              </li>
            </ul>
          </ConceptBlock>

          {/* Permanent-link vs channel diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Permanent-link vs channel — what each test covers
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="A horizontal cabling run is shown twice. In the upper half, a permanent-link test: the certifier adapters terminate at the patch panel on the left and the work-area outlet on the right, with the solid-conductor cable in between. The cords are not part of the test. In the lower half, a channel test: the adapters terminate at the patch-cord plugs at each end, so both patch cords plus the solid-conductor cable plus both connectors are all part of the test."
            >
              {/* ============================================== */}
              {/* TOP: PERMANENT-LINK TEST                       */}
              {/* ============================================== */}

              {/* Section title (above) */}
              <text
                x="60"
                y="32"
                fill="#BBF7D0"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                PERMANENT-LINK TEST · contractor scope · what is warranted at handover
              </text>

              {/* Element-name row (above shapes) */}
              <text
                x="80"
                y="62"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                PL adapter
              </text>
              <text
                x="160"
                y="62"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Patch panel
              </text>
              <text
                x="440"
                y="62"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Solid-conductor cable
              </text>
              <text
                x="720"
                y="62"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Outlet (TO)
              </text>
              <text
                x="800"
                y="62"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                PL adapter
              </text>

              {/* Element row (y=80 to y=120) */}
              {/* PL adapter left */}
              <rect
                x="50"
                y="80"
                width="60"
                height="40"
                rx="6"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              {/* Patch panel */}
              <rect
                x="130"
                y="84"
                width="60"
                height="32"
                rx="4"
                fill="rgba(252,211,77,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              {/* Solid cable */}
              <rect
                x="210"
                y="88"
                width="460"
                height="24"
                rx="3"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              {/* Outlet */}
              <rect
                x="690"
                y="84"
                width="60"
                height="32"
                rx="4"
                fill="rgba(252,211,77,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              {/* PL adapter right */}
              <rect
                x="770"
                y="80"
                width="60"
                height="40"
                rx="6"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />

              {/* Element-detail row (below shapes) */}
              <text
                x="440"
                y="138"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                ≤ 90 m · solid conductor
              </text>

              {/* Test-scope bracket (clear of all shapes) */}
              <line x1="50" y1="158" x2="830" y2="158" stroke="#22C55E" strokeWidth="1.6" />
              <line x1="50" y1="154" x2="50" y2="162" stroke="#22C55E" strokeWidth="1.6" />
              <line x1="830" y1="154" x2="830" y2="162" stroke="#22C55E" strokeWidth="1.6" />
              <text
                x="440"
                y="180"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PERMANENT LINK — solid cable + both fixed connectors (NO cords)
              </text>

              {/* ============================================== */}
              {/* BOTTOM: CHANNEL TEST                           */}
              {/* ============================================== */}

              {/* Section title */}
              <text
                x="60"
                y="234"
                fill="#A5F3FC"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                CHANNEL TEST · end-user scope · whole signal path the active port sees
              </text>

              {/* Element-name row (above shapes) */}
              <text
                x="80"
                y="264"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Ch adapter
              </text>
              <text
                x="160"
                y="264"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Patch cord
              </text>
              <text
                x="240"
                y="264"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Panel
              </text>
              <text
                x="440"
                y="264"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Solid-conductor cable
              </text>
              <text
                x="640"
                y="264"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Outlet
              </text>
              <text
                x="720"
                y="264"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                WA cord
              </text>
              <text
                x="800"
                y="264"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Ch adapter
              </text>

              {/* Element row (y=282 to y=322) */}
              {/* Ch adapter left */}
              <rect
                x="50"
                y="282"
                width="60"
                height="40"
                rx="6"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              {/* Patch cord */}
              <rect
                x="130"
                y="290"
                width="60"
                height="24"
                rx="3"
                fill="rgba(34,211,238,0.14)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              {/* Patch panel */}
              <rect
                x="210"
                y="286"
                width="60"
                height="32"
                rx="4"
                fill="rgba(252,211,77,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              {/* Solid cable */}
              <rect
                x="290"
                y="290"
                width="320"
                height="24"
                rx="3"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              {/* Outlet */}
              <rect
                x="630"
                y="286"
                width="60"
                height="32"
                rx="4"
                fill="rgba(252,211,77,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              {/* WA cord */}
              <rect
                x="710"
                y="290"
                width="60"
                height="24"
                rx="3"
                fill="rgba(34,211,238,0.14)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              {/* Ch adapter right */}
              <rect
                x="790"
                y="282"
                width="60"
                height="40"
                rx="6"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />

              {/* Element-detail row (below shapes) */}
              <text
                x="160"
                y="340"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="10"
                fontFamily="system-ui"
              >
                stranded
              </text>
              <text
                x="440"
                y="340"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                ≤ 90 m · solid conductor
              </text>
              <text
                x="740"
                y="340"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="10"
                fontFamily="system-ui"
              >
                stranded
              </text>

              {/* Channel-scope bracket */}
              <line x1="50" y1="358" x2="850" y2="358" stroke="#22D3EE" strokeWidth="1.6" />
              <line x1="50" y1="354" x2="50" y2="362" stroke="#22D3EE" strokeWidth="1.6" />
              <line x1="850" y1="354" x2="850" y2="362" stroke="#22D3EE" strokeWidth="1.6" />
              <text
                x="440"
                y="380"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                CHANNEL — permanent link + BOTH cords · ≤ 100 m total · port to port
              </text>

              {/* ============================================== */}
              {/* LEGEND                                         */}
              {/* ============================================== */}
              <rect
                x="40"
                y="408"
                width="800"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="432"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              <rect
                x="60"
                y="446"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="84" y="458" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Permanent-link adapter — terminates at fixed connectors
              </text>

              <rect
                x="60"
                y="468"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="84" y="480" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Channel adapter — terminates at the cord plug
              </text>

              <rect
                x="460"
                y="446"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text x="484" y="458" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Solid-conductor permanent cable — installed in wall / ceiling
              </text>

              <rect
                x="460"
                y="468"
                width="14"
                height="14"
                rx="3"
                fill="rgba(252,211,77,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              <text x="484" y="480" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Patch panel / outlet — fixed IDC termination point
              </text>

              <line
                x1="60"
                y1="498"
                x2="820"
                y2="498"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="440"
                y="518"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                TIA-1152-A · BS EN 50346 — both models valid; permanent-link is the typical handover
                deliverable
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The TIA-1152-A parameter set</ContentEyebrow>

          <ConceptBlock
            title="What the certifier actually measures — and why each parameter matters"
            plainEnglish="A modern field certifier (Fluke DSX-8000, ideal LanXPLORER, Softing WireXpert) measures a defined parameter set. Each parameter answers a specific question about the channel: does the signal arrive intact (insertion loss), do pairs interfere with each other (NEXT / PSNEXT / ACR-F), do reflections distort the waveform (return loss), do signals arrive in step across the four pairs (propagation delay, delay skew), and — for PoE — do the conductors share DC current evenly (DC resistance, DC resistance unbalance). Each parameter has a Class-EA pass criterion; the certifier reports the measured value and the margin in dB."
            onSite="The discipline at handover is to inspect the per-link certifier output, not just the headline pass / fail. Look at the margins on NEXT, return loss and ACR-F. A 5 dB margin is comfortable; a 1 dB margin is marginal; a 0.2 dB margin is a re-terminate. Look at DC resistance unbalance — it is the PoE-readiness indicator. Look at delay skew — anything close to the cap suggests a mixed-cable run. The certifier report is a diagnostic tool, not just a pass/fail badge."
          >
            <p>The TIA-1152-A parameter set in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Insertion loss.</strong> The signal attenuation end-to-end at each tested
                frequency. For Cat6A at 500 MHz, the maximum is roughly 35.9 dB across 100 m of
                channel. Higher-than-expected insertion loss usually means an over-strip, a kinked
                cable, or a bad connector.
              </li>
              <li>
                <strong>NEXT (near-end crosstalk).</strong> The amount of signal energy that couples
                between pairs at the near end of the cable. The driver of Cat6A performance. Pair
                untwist at the termination is the dominant cause of poor NEXT.
              </li>
              <li>
                <strong>PSNEXT (power-sum NEXT).</strong> The total NEXT energy from all three other
                pairs into the pair under test. Reflects how a real Ethernet signal — driving four
                pairs simultaneously — sees crosstalk.
              </li>
              <li>
                <strong>ACR-F (attenuation-to-crosstalk ratio, far-end).</strong> The difference
                between the wanted signal at the far end and the crosstalk at the far end.
                Essentially a signal-to-noise margin at the receiver.
              </li>
              <li>
                <strong>Return loss.</strong> How much signal energy is reflected back from
                impedance discontinuities (terminations, kinks, crushed cable). Over-stripped
                jackets and excess pair untwist are the dominant causes of poor return loss.
              </li>
              <li>
                <strong>Propagation delay.</strong> Signal travel time end-to-end. Related to length
                and cable construction. Used to compute effective electrical length.
              </li>
              <li>
                <strong>Delay skew.</strong> Maximum pair-to-pair delay difference. Critical for
                10GBASE-T which parallelises across all four pairs. Class EA cap typically 50 ns.
              </li>
              <li>
                <strong>DC resistance.</strong> End-to-end loop resistance per conductor pair. Used
                as a continuity check and to compute power loss for PoE.
              </li>
              <li>
                <strong>DC resistance unbalance.</strong> The PoE-critical parameter. Intra-pair
                (between the two conductors of a pair) and inter-pair (between pairs). Tight
                tolerances because PoE delivers DC current through the same balanced cabling —
                uneven sharing causes uneven heating.
              </li>
              <li>
                <strong>Wire map.</strong> Continuity and pinout. Catches reversed pairs, split
                pairs, opens, shorts. The first thing the certifier checks.
              </li>
              <li>
                <strong>Length.</strong> Physical and effective electrical. Inflated effective
                length indicates impedance discontinuities — usually a termination defect.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.523.1.101 (Conductor design current — verbatim)"
            clause={
              <>
                The design current in any conductor shall not exceed the limit specified in BS EN
                50173-1.
                <br />
                NOTE 1: Any temperature rise of the data cables due to the load current they carry,
                or other causes, will increase the attenuation/insertion loss of the cables. Thus
                the performance of information transmission channels can be degraded.
                <br />
                NOTE 2: Guidance on the effect of the number of loaded conductors, in a multi-cable
                bundle, on the temperature rise of the cables is given in PD CLC/TR 50174-99-1:2015
                and requirements and recommendations in relation to planning and installation of
                such cable bundles are provided in BS ISO/IEC 14763-2 and ISO/IEC TS 29125.
              </>
            }
            meaning="§716.523.1.101 establishes the formal link between data-cabling testing and PoE thermal management. The conductor design current is bounded by BS EN 50173-1 (which feeds the ≤ 750 mA per conductor cap of §716.523.2.101). NOTE 1 makes the test parameter set directly relevant to PoE: temperature rise from PoE current degrades insertion loss — so a Cat6A channel that passes Class EA cold may not pass it under continuous PoE load. NOTE 2 brings the bundle-thermal references — including TIA TSB-184-A and PD CLC/TR 50174-99-1 — into the regulatory scope. DC resistance unbalance is the certifier parameter that catches imbalance before it becomes a thermal failure."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Instrument accuracy levels and warranty alignment</ContentEyebrow>

          <ConceptBlock
            title="Levels III, IIIe, IV, V — and why the spec must name one"
            plainEnglish="TIA-1152-A defines four field-test instrument accuracy levels: III, IIIe, IV and V (V is the current top tier). The level describes the instrument's residual measurement noise and calibration tolerances — i.e. how accurately it measures the parameters listed above. Higher levels are more accurate; the same cable tested with a Level III certifier and a Level V certifier may produce different headline margins on the same parameters. For Cat6A, Level III is the minimum mandated by the standard; Level V is what most manufacturer warranty programmes require."
            onSite="The competent contract specifies the level explicitly. Specifying just 'TIA-1152-A' without a level is incomplete — it allows a contractor to use a lower-tier instrument that produces more generous margins, which the warranty manufacturer may then reject. The contract wording is: 'Cat6A horizontal cabling shall be certified to TIA-1152-A Level V (or BS EN 50346 equivalent), permanent-link adapter, every link individually tested, certifier file archived per link, summary report supplied at handover.'"
          >
            <p>The four levels and where each is used:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Level III.</strong> Older accuracy level, sufficient for Cat5e / Cat6 /
                Cat6A per the TIA-1152-A pass criteria. Older field certifiers (Fluke DTX, ideal
                LANTEK) operate at this level.
              </li>
              <li>
                <strong>Level IIIe.</strong> Enhanced Level III, with tighter tolerances on some
                parameters. A transitional level; mostly superseded by Level IV / V.
              </li>
              <li>
                <strong>Level IV.</strong> Higher accuracy than III, with tighter calibration
                tolerances. Used on some Cat6A and many Cat7 / Cat7A applications.
              </li>
              <li>
                <strong>Level V.</strong> Modern top tier. Required by most major manufacturer
                warranty programmes for Cat6A and mandatory for Cat8 / Class I/II. Modern certifiers
                — Fluke DSX-8000, ideal LanXPLORER, Softing WireXpert (top SKU) — operate at Level
                V.
              </li>
            </ul>
            <p>
              The practical implication is that two contractors quoting "TIA-1152-A certified Cat6A"
              can deliver materially different evidence: one with a 25-year warranty-aligned Level V
              record, one with a Level III record that the warranty manufacturer may not register.
              The cost differential at instrument level is real (a Level V certifier costs roughly
              twice a Level III), but the cost differential per link tested is negligible. Specify
              Level V for any Cat6A or above install where warranty cover matters — which is most
              jobs.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="TIA-1152-A instrument accuracy levels and typical use"
            source="TIA-1152-A (2016, current) · BS EN 50346"
            headers={[
              'Level',
              'Typical era / instruments',
              'Typical use',
              'Manufacturer warranty alignment',
            ]}
            rows={[
              [
                'III',
                'Older Fluke DTX, ideal LANTEK',
                'Cat5e / Cat6 minimum',
                'Some Cat5e warranties; many Cat6A warranties reject',
              ],
              ['IIIe', 'Transitional', 'Cat6 enhanced', 'Few warranties name it explicitly'],
              [
                'IV',
                'Mid-tier modern certifiers',
                'Cat6A, Cat7 / 7A',
                'Some Cat6A warranties accept',
              ],
              [
                'V',
                'Fluke DSX-8000, ideal LanXPLORER, Softing WireXpert (top)',
                'Cat6A · Cat8 / Class I, II',
                'Required by most major Cat6A / Cat8 warranty programmes',
              ],
            ]}
            notes="The standard specifies the minimum level for each Class. Manufacturer warranty programmes typically require a higher level than the minimum. The competent contract names the level explicitly: 'TIA-1152-A Level V certifier output, permanent-link adapter, every link archived'. That binds the contractor to the same accuracy regime the warranty manufacturer audits against."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Pass / fail margins and the no-marginal-pass rule</ContentEyebrow>

          <ConceptBlock
            title="The difference between a 15-year channel and a six-month channel — at handover"
            plainEnglish="Class EA pass per the standard is a single binary — pass or fail. Class EA at handover with comfortable margins is a 15-year channel; Class EA marginal pass is a six-month channel. The certifier reports the measured parameter value AND the margin in dB against the Class EA pass criterion. A 5 dB NEXT margin is comfortable; a 1 dB NEXT margin is marginal; a 0.2 dB margin is a re-terminate. The discipline at handover is not 'all links pass' — it is 'all links pass with adequate margin'."
            onSite="Most major manufacturer warranty programmes (Panduit, CommScope, Leviton, Belden — 25-year warranties) define an internal margin threshold typically 3-5 dB above the standard pass criterion. Below that, the warranty audit rejects the link even though it 'passed' per the standard. Best practice on every Cat6A handover is: read every per-link certifier output, identify any link with sub-3 dB margin on any critical parameter, re-terminate before the contractor leaves site, re-test, archive the new result. The dominant cause of marginal passes is excess pair untwist; the fix is 5-10 minutes per termination."
          >
            <p>What 'marginal pass' actually means in practice:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Comfortable pass — 3-5 dB or better margin on critical parameters.</strong>{' '}
                15-year channel; survives thermal cycling, PoE load, cable movement, seasonal
                humidity. Manufacturer warranty audit accepts. End-user can deploy any service up to
                Class EA spec confidently.
              </li>
              <li>
                <strong>Marginal pass — 1-3 dB margin on one or more critical parameters.</strong>{' '}
                Technically passes Class EA per the standard. Drifts under thermal cycling and PoE
                load — most commonly degrades to fail within 6-18 months. Warranty audit may reject.
                Should be re-terminated at handover.
              </li>
              <li>
                <strong>Edge pass — sub-1 dB margin.</strong> Time-bomb. Passes the certifier today,
                fails as soon as the cable warms or moves. Re-terminate immediately. Do not accept
                at handover.
              </li>
              <li>
                <strong>Fail.</strong> Re-terminate, re-pull, or re-design.
              </li>
            </ul>
            <p>
              The economics of the no-marginal-pass discipline are straightforward. A re-termination
              at handover costs 5-10 minutes per link in labour. A re-call to site six months later
              — diagnose the failing link, remove the patch panel, re-terminate, re-test,
              re-document, leave site — costs an hour minimum, plus the reputational damage of
              returning to site to fix work that was signed off as complete. Refuse marginal passes
              at handover. It is the cheapest insurance the contractor can buy.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Reading only the headline 'PASS' on the certifier and ignoring the margins"
            whatHappens={
              <>
                Contractor finishes the install on a Friday afternoon. Lays down the certifier, runs
                every link, sees green PASS on each, packs up and leaves site. The handover archive
                contains 96 PASS results. Six months later, eight links have failed under PoE
                thermal load — each had been a sub-1 dB NEXT margin pass on day one, the result of
                excess pair untwist that nobody inspected because the headline read PASS. Contractor
                is back on site re-terminating eight links plus answering hard questions about why
                the handover signed off non-deliverable quality.
              </>
            }
            doInstead={
              <>
                Read every per-link certifier output, not just the summary. Sort by margin ascending
                on each critical parameter (NEXT, return loss, ACR-F). Anything with sub-3 dB margin
                is a re-terminate before handover. The fix is 5-10 minutes per link; the cost of
                skipping it is a six-month re-call. Specify the discipline in the contract: 'all
                links shall pass Class EA with not less than 3 dB margin on NEXT, return loss and
                ACR-F; marginal passes shall be re-terminated and re-tested before handover'. Then
                enforce it.
              </>
            }
          />

          <Scenario
            title="Manufacturer warranty audit fails — what does the contractor do?"
            situation={
              <>
                A Cat6A office fit-out, certified to TIA-1152-A and signed off six months ago. The
                end user submits the certifier files to the manufacturer for the 25-year warranty
                registration. The audit returns 14 of 96 links rejected: "DC resistance unbalance
                exceeds programme tolerance" and "NEXT margin below programme threshold". The
                contractor is asked to remediate.
              </>
            }
            whatToDo={
              <>
                Three steps. (1) Pull the original archive and identify the failing links — most
                likely common termination defects (over-stripped jacket, excess pair untwist) on the
                same crew or the same patch panel. (2) Re-terminate every rejected link to the
                manufacturer{"'"}s strip-length and untwist instructions, using the same Cat6A
                keystone family certified to the same warranty programme. Re-test with a Level V
                certifier (the audit was Level V; the original may have been Level IV — match the
                audit instrument). (3) Submit the new per-link files to the manufacturer for
                re-audit. Update the site BS EN 50174-1 / TIA-606-D administration record to reflect
                the re-terminated links and the date.
              </>
            }
            whyItMatters={
              <>
                Manufacturer warranty audit is the moment the certifier evidence is read by someone
                who is paid to find faults. If the original handover skipped the margin-discipline
                check — accepted PASS without inspecting margins — the audit will catch it months
                later, when re-termination is more expensive. Build the no-marginal-pass discipline
                into the handover, archive Level V certifier output, and the audit becomes a
                registration exercise rather than a remediation contract. Skip it, and the audit
                becomes a re-call to site at contractor expense.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Two test models. Permanent-link certifies the contractor scope (solid cable + both connectors); channel additionally includes the cords. Permanent-link is the typical handover deliverable.',
              'TIA-1152-A defines instrument accuracy Levels III, IIIe, IV, V — V is the modern top tier and is required by most Cat6A / Cat8 manufacturer warranty programmes. Specify the level explicitly in the contract.',
              'The certifier measures a defined parameter set: insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew, DC resistance, and DC resistance unbalance (the PoE-critical parameter). Each has a Class-EA pass criterion and a margin in dB.',
              'BS 7671 §716.523.1.101 NOTE 1 makes the test parameter set directly relevant to PoE — temperature rise from PoE current degrades insertion loss. DC resistance unbalance is the certifier parameter that catches uneven current sharing before it becomes a thermal failure.',
              'No-marginal-pass at handover. Sub-3 dB margins on critical parameters drift under thermal cycling and PoE load; re-terminate before the contractor leaves site. Class EA at handover with comfortable 3-5 dB margins is a 15-year channel.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5-section-1')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Termination tools
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Patch cord performance
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule5Section2;
