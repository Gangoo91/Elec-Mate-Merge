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
    id: 'datacabling-m3s4-il-vs-otdr',
    question:
      'A client asks: "the OTDR shows 0.92 dB on this link — does that mean the channel insertion loss is 0.92 dB?" What is the correct technical answer?',
    options: [
      'Yes — OTDR measures end-to-end insertion loss directly.',
      'No — OTDR measures backscatter return at every point along the fibre, allowing it to MAP the link\u2019s loss profile (per-splice, per-connector, fibre attenuation slope, end reflection). It produces an estimate of overall loss but is NOT the certified end-to-end insertion-loss measurement. The certified end-to-end loss number comes from a Tier 1 light-source-and-power-meter (LSPM / OLTS) test in both directions, at the relevant wavelengths. OTDR (Tier 2) is the diagnostic / characterisation test; OLTS (Tier 1) is the certification test.',
      'Yes — OTDR is the only valid loss measurement.',
      'OTDR cannot measure loss at all.',
    ],
    correctIndex: 1,
    explanation:
      'OTDR is a TIME-DOMAIN backscatter instrument — it sends pulses down the fibre and measures the Rayleigh backscatter and Fresnel reflections that come back, producing a trace of relative power vs distance. From this it can ESTIMATE per-event loss and overall link loss by interpolation, but it is not a calibrated end-to-end loss test. The end-to-end test is OLTS / LSPM (light-source plus power meter): inject a calibrated optical power at one end, measure at the other end, the difference is the channel loss. Tier 1 (OLTS) certifies; Tier 2 (OTDR) characterises.',
  },
  {
    id: 'datacabling-m3s4-launch-cord',
    question:
      'Why are launch and tail (receive) cords mandatory for an OTDR test on a short fibre link?',
    options: [
      'They make the link physically longer.',
      'They displace the OTDR\u2019s "dead zone" — the initial section of fibre where the launch pulse saturates the receiver and back-reflection from the front-panel connector dominates the trace — outside the link being tested. Without a launch cord, the first connector and first 50-100 m of fibre are masked. A tail cord similarly lets the OTDR characterise the far-end connector. Length: typically 100-1000 m, fibre type matched to the link.',
      'They reduce the backscatter coefficient.',
      'They are decorative.',
    ],
    correctIndex: 1,
    explanation:
      'OTDRs have a finite dead zone — an initial section of trace masked by the launch pulse. Pulse-width and instrument design determine the dead-zone length (typically 5-50 m of "event" dead zone, longer for wider pulses). A launch cord (sometimes called a launch box) — typically 100-500 m for in-building, longer for OS2 long-haul — relocates the dead zone so it falls in the launch cord, not the link. A tail cord at the far end allows the OTDR to characterise the far-end connector with backscatter on both sides of it.',
  },
  {
    id: 'datacabling-m3s4-bidirectional',
    question:
      'Why are fibre splice losses tested BIDIRECTIONALLY (from each end) and the results averaged?',
    options: [
      'To save time.',
      'A unidirectional OTDR splice-loss measurement can be misleading: differences in backscatter coefficient between the two sides of the splice (e.g. one fibre with slightly higher backscatter than the other) introduce a "ghost" loss or apparent gain that is not real loss. Measuring from each direction and averaging cancels the backscatter-coefficient asymmetry and gives the true splice loss. Standard practice for splice characterisation is bidirectional, dual-wavelength.',
      'Single-direction measurements are illegal.',
      'The splicer requires bidirectional input.',
    ],
    correctIndex: 1,
    explanation:
      'OTDR splice-loss measurements are derived from the change in backscatter level either side of the splice. If the two fibres have slightly different backscatter coefficients (manufacturing variation), a unidirectional reading can show APPARENT gain (negative loss) or exaggerated loss — neither of which is real. Averaging the bidirectional readings cancels this artefact. Industry practice for splice characterisation: bidirectional, dual-wavelength (1310 + 1550 nm for SM, 850 + 1300 nm for MM). Documented in TIA-568 / ISO 14763 commissioning guidance.',
  },
  {
    id: 'datacabling-m3s4-ghost-reflection',
    question:
      'An OTDR trace shows a small reflection peak with no associated loss step at a position that does not correspond to any known cable feature. What is the most likely cause?',
    options: [
      'A break in the fibre.',
      'A "ghost reflection" — an artefact caused by the OTDR pulse partially reflecting from a strong reflective event (typically the far-end connector or a high-return-loss connector pair), travelling back along the fibre, partially re-reflecting at the launch end, and travelling forward again. The double-reflection appears at twice the distance to the strong reflector. It is not a real fibre event. Confirm by measuring the position; ghost = 2 × strong-reflector distance.',
      'A polish-grade mismatch.',
      'A cable-jacket fault.',
    ],
    correctIndex: 1,
    explanation:
      'Ghost reflections are common OTDR-trace artefacts — particularly with strong reflectors (poorly-cleaned UPC connectors, mechanical splices, mid-span PC connectors). The signature: a small reflection PEAK with no associated loss STEP, located at a distance that is exactly twice (or another multiple) of a known strong reflective event. Differentiating real events from ghosts is part of trace-reading skill. Modern OTDRs flag suspected ghost events automatically. Use APC connectors at the launch/tail to suppress launch reflections that drive ghosts.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What does an OTDR (Optical Time Domain Reflectometer) actually measure, and why is it called a "time-domain" instrument?',
    options: [
      'Direct end-to-end optical power loss.',
      'It launches a short optical pulse into the fibre and measures the backscattered light vs time. Distance is calculated from time using the speed of light in the fibre (≈ 200 000 km/s, ~5 µs per km round-trip). The trace shows relative power vs distance, capturing fibre attenuation slope, splice loss steps, connector reflection peaks, and the end-of-fibre reflection. From this, per-event loss, total link loss and event locations can be derived.',
      'Refractive index.',
      'Polarisation-mode dispersion only.',
    ],
    correctAnswer: 1,
    explanation:
      'OTDR is fundamentally a time-of-flight + backscatter instrument. It transmits a short pulse and measures the returned light over time. Two physical phenomena produce the return: Rayleigh backscatter (uniform, low-level, exists everywhere) and Fresnel reflection (large, localised, occurs at refractive-index discontinuities — connector endfaces, mechanical splices, fibre breaks, end-of-fibre). The trace is a logarithmic plot of returned power vs round-trip distance, calibrated through the group index of refraction.',
  },
  {
    id: 2,
    question: 'What is the difference between Tier 1 and Tier 2 fibre testing?',
    options: [
      'Tier 1 is harder than Tier 2.',
      'Tier 1 (basic certification) is light-source plus power meter (LSPM / OLTS) — calibrated injection at one end, calibrated measurement at the other, the difference is the channel insertion loss. Required for warranty and certification. Tier 2 (extended certification) is OTDR — characterises the link\u2019s loss profile event by event, finds and locates faults, baselines the link for future maintenance. Both are typically performed at commissioning of a fibre system; Tier 1 is the formal pass / fail; Tier 2 is the diagnostic and as-built characterisation.',
      'Tier 1 is for multimode and Tier 2 is for single-mode.',
      'They are the same test.',
    ],
    correctAnswer: 1,
    explanation:
      'Tier 1 / Tier 2 terminology comes from TIA-568 / ISO 14763 commissioning guidance. Tier 1 OLTS measures total channel insertion loss with a calibrated source and meter — this is the certified pass / fail number against the channel budget. Tier 2 OTDR maps the link, locating splices, connectors and any anomalous events. Most projects specify both at commissioning; some specifications use Tier 1 only for in-building MM, Tier 1 + Tier 2 for SM and longer links.',
  },
  {
    id: 3,
    question: 'What does "pulse width" do on an OTDR setting, and why is there a trade-off?',
    options: [
      'A longer pulse is always better.',
      'Pulse width controls the energy per pulse and therefore the dynamic range (how far down the fibre the OTDR can see) AND the resolution (how close two events can be and still be resolved separately). Wider pulses (e.g. 1 µs, 10 µs) give greater dynamic range — useful for long links and high-loss links — but worse resolution: events within the pulse-width worth of distance are merged. Narrower pulses (e.g. 5 ns, 30 ns) give better resolution — useful for in-building links with closely-spaced splices and connectors — but less dynamic range. The trade-off is fundamental.',
      'Pulse width changes the wavelength.',
      'Pulse width is a calibration setting.',
    ],
    correctAnswer: 1,
    explanation:
      'OTDR pulse width is the physical duration of the optical pulse launched into the fibre. Wider pulse = more energy = more backscatter signal = greater dynamic range — but the pulse also occupies more distance in the fibre (1 µs ≈ 200 m round-trip). Two events within that 200 m round-trip will appear as one merged event. Narrower pulse = less energy = less dynamic range, but tighter event resolution. Field practice is to use the narrowest pulse that gives adequate signal-to-noise for the link length — typically a few short-pulse traces near the launch end and a wider-pulse trace for the far end on long links.',
  },
  {
    id: 4,
    question:
      'On an OTDR trace, what does each of the following features represent: (a) a sloping line, (b) a small step down with no peak, (c) a step down with a peak above the trend, (d) a large peak at the end of the trace?',
    options: [
      'They all represent fibre faults.',
      '(a) The fibre attenuation slope (gradual loss with distance, in dB/km). (b) A fusion splice — a small loss step but no reflection because fusion produces a continuous glass joint. (c) A connector pair or mechanical splice — a loss step PLUS a reflection from the refractive-index discontinuity at the mating face. (d) The end-of-fibre reflection — typically the last connector, or an open fibre end (which gives a strong Fresnel reflection from the glass-air interface).',
      'They are all noise.',
      'Only the end peak is a real event.',
    ],
    correctAnswer: 1,
    explanation:
      'Reading an OTDR trace is a learned skill that comes down to interpreting four basic features. Slope = fibre attenuation. Loss step without peak = fusion splice. Loss step with peak = connector pair or mechanical splice (mating faces are refractive-index discontinuities). Strong peak at end = end of fibre. A loss step WITH NO peak in the middle of the trace and elevated apparent loss could be a microbend, a stressed cable, or a poor splice; further investigation needed.',
  },
  {
    id: 5,
    question:
      'Why are launch and tail cords always specified for an OTDR test, and what length is appropriate?',
    options: [
      'They serve no real purpose.',
      'The launch cord moves the OTDR\u2019s near-end "dead zone" (where the launch pulse saturates the receiver and front-panel connector reflection dominates) outside the link under test, so the first connector of the link is properly characterised. The tail cord similarly allows the far-end connector to be characterised by providing backscatter on both sides of it. Length: typically 100-500 m for in-building MM; 500-2000 m for OS2 SM long-haul. Match the fibre type and connector polish to the link.',
      'They are only used on damaged fibres.',
      'They are required only for single-mode.',
    ],
    correctAnswer: 1,
    explanation:
      'Launch / tail cords are essential to an OTDR test, not optional. The launch cord pushes the dead zone into the cord (so the first link connector is on the trace cleanly); the tail cord puts backscatter on the receive side of the far-end connector (so the far-end connector loss can be measured). Cord length depends on the OTDR\u2019s pulse width and the link being tested — too short and the dead zone is not displaced; too long is wasted weight. Standard launch boxes (100, 250, 500, 1000 m) are common. Match the polish (UPC / APC) and fibre type to the link.',
  },
  {
    id: 6,
    question: 'Why is OTDR splice-loss measurement done bidirectionally and the results averaged?',
    options: [
      'To save time.',
      'A unidirectional OTDR splice-loss reading is influenced by the backscatter-coefficient difference between the two fibres on either side of the splice — manufacturing variation in fibre backscatter can produce APPARENT gain (negative loss) in one direction and exaggerated loss in the other. Averaging readings from both ends cancels the artefact and gives the true splice loss. Industry practice: bidirectional + dual-wavelength (1310 + 1550 for SM, 850 + 1300 for MM).',
      'It is required by BS 7671.',
      'Bidirectional measurement increases dynamic range.',
    ],
    correctAnswer: 1,
    explanation:
      'OTDR splice-loss is derived from the height difference between the backscatter levels on either side of the splice — a measurement that can be skewed if the two fibres have slightly different backscatter coefficients. Bidirectional averaging cancels the asymmetry. This is industry-standard splice-characterisation practice and is built into modern OTDR analysis software. Dual-wavelength testing (1310 + 1550 for SM, 850 + 1300 for MM) catches wavelength-dependent issues like macrobends, which appear on long-wavelength but not short-wavelength.',
  },
  {
    id: 7,
    question: 'What is a "ghost reflection" on an OTDR trace, and how do you identify one?',
    options: [
      'A real fibre fault.',
      'An artefact caused by the launched pulse partially reflecting off a strong reflective event (typically the far-end connector or a high-return-loss mid-span connector), travelling back to the launch, partially re-reflecting again at the launch end (or off the front-panel connector), and travelling forward to be received again. The result is a small reflection PEAK with NO associated loss STEP, located at exactly 2 × (or 3 ×, etc.) the distance to the strong reflector. Confirm by measurement; suppress by using lower-reflection connectors (APC) or by reducing pulse energy.',
      'A polish-grade mismatch event.',
      'Cable manufacturing variation.',
    ],
    correctAnswer: 1,
    explanation:
      'Ghosts are common, particularly with high-return-loss reflectors. Their signature is unmistakable once you know it: a small peak, no associated loss, at twice the distance to a strong reflective event. Modern OTDR analysis software flags them automatically. Suppression strategies: use APC connectors (lower return loss), reduce pulse energy, use coarser averaging settings to reduce single-shot ghost amplitude. They are not real events — do not raise a fault report against a ghost.',
  },
  {
    id: 8,
    question:
      'A 200 m OS2 link tests at 1.7 dB total OLTS insertion loss at 1310 nm. The calculated budget was 1.3 dB. What is the most likely cause of the 0.4 dB excess, and how do you find it?',
    options: [
      'The fibre is faulty.',
      'A contaminated connector or a marginal splice. Most likely a connector pair with degraded cleanliness adding ~0.4 dB. Find it: run an OTDR (Tier 2) trace at 1310 nm with appropriate launch / tail cords, identify the per-event loss values, look for the connector or splice that is 0.4 dB above its expected typical loss. Inspect the suspect connector with a fibre microscope per IEC 61300-3-35, clean if not pass, re-test.',
      'Pulse width was wrong.',
      'The transceiver budget has changed.',
    ],
    correctAnswer: 1,
    explanation:
      'Excess insertion loss vs the calculated budget is almost always a contaminated connector or marginal splice. The OTDR (Tier 2) is the diagnostic tool: it identifies WHICH event is excessive and WHERE on the link. Then visual inspection per IEC 61300-3-35 confirms contamination, cleaning recovers the link, and re-test confirms the recovery. The investigation flow — calculate budget → OLTS test → if excess, run OTDR → identify excess event → inspect and clean — is standard fibre commissioning / troubleshooting practice.',
  },
  {
    id: 9,
    question: 'Which IEC standard governs fibre cabling test methods?',
    options: [
      'BS 7671 §716.',
      'IEC 61280 series — test procedures for fibre-optic communication subsystems. Defines OLTS / OPM measurement methods (61280-4-1 for MM, 61280-4-2 for SM), OTDR measurement methods, return-loss measurement, and so on. The TIA equivalent in North America is ANSI/TIA-526 series; the EU adoption is BS EN 61280. Most field test instruments are calibrated and traceable against these standards.',
      'ISO 9001.',
      'BS EN 50173-1.',
    ],
    correctAnswer: 1,
    explanation:
      'IEC 61280 is the international fibre-cabling test-method series. Subparts cover OLTS (61280-4-1 MM, 61280-4-2 SM), OTDR (61280-4-3, -4-4), return loss (61280-4-4 and others), and specialty measurements. BS EN 61280 is the EU-adopted version used in UK practice. Field test instruments report against these methods (e.g. "61280-4-1 method 1 reference"), allowing two test sets in different parts of the world to produce comparable, traceable results. Always specify the test method in the certification deliverables.',
  },
  {
    id: 10,
    question:
      'The fibre standards prescribe testing in BOTH directions and at TWO wavelengths. Why both?',
    options: [
      'Excessive caution.',
      'Bidirectional testing (testing from each end and averaging) cancels backscatter-coefficient asymmetry artefacts that distort unidirectional OTDR splice-loss readings. Dual-wavelength testing (1310 + 1550 nm SM, 850 + 1300 nm MM) detects wavelength-dependent issues — primarily macrobends and microbends, which attenuate long wavelengths much more than short wavelengths. A bend that costs 0.3 dB at 1310 nm may cost 1.5 dB or more at 1550 nm; one-wavelength testing would miss it. Both disciplines together give a confident, repeatable, defensible certification.',
      'It doubles the test fee.',
      'Different standards require different methods.',
    ],
    correctAnswer: 1,
    explanation:
      'Bidirectional + dual-wavelength is the certification gold standard. Bidirectional cancels the splice-loss artefact; dual-wavelength catches bend-induced loss because long wavelengths are far more sensitive to macro/microbends than short ones. A link that passes at 1310 nm but fails at 1550 nm has a bend somewhere — find it by comparing the two OTDR traces. Modern field test sets perform bi-directional, dual-wavelength tests automatically and report the worst-case result.',
  },
];

const faqs = [
  {
    question: 'Is an OTDR enough for fibre certification, or do I need OLTS / power meter as well?',
    answer: (
      <>
        Both. Tier 1 (OLTS / power meter) is the certified end-to-end insertion-loss test against
        the channel budget — this is the formal pass / fail and the manufacturer warranty document.
        Tier 2 (OTDR) is the diagnostic / characterisation test that maps the link\u2019s loss
        profile event-by-event. Industry practice for new fibre systems: Tier 1 + Tier 2 at
        commissioning, both in both directions, both at dual wavelengths. The OTDR alone is
        defensible characterisation but not formally a certified loss test.
      </>
    ),
  },
  {
    question: 'How long should my launch / tail cords be?',
    answer: (
      <>
        Long enough to push the OTDR\u2019s dead zone outside the link being tested. For typical
        in-building MM with narrow pulse widths, 100-250 m is usually sufficient. For OS2
        single-mode with wider pulses for dynamic range, 500-1000 m is common; for very long-haul SM
        (several km) launch cords of 1-2 km may be needed. Always match the cord fibre type (MM-MM
        or SM-SM) and polish (UPC-UPC or APC-APC) to the link under test. The cord connectors must
        themselves be clean and inspected per IEC 61300-3-35.
      </>
    ),
  },
  {
    question: 'What is the difference between "permanent link" and "channel" testing for fibre?',
    answer: (
      <>
        For copper, the permanent link / channel distinction is well-defined (permanent link = the
        installed cable from outlet to FD, ≤ 90 m; channel = link plus cords, ≤ 100 m). For fibre,
        the equivalent concepts exist but with different terminology: the link includes the field
        cable plus its terminating connectors but excludes patch cords; the channel includes
        everything from active equipment to active equipment. Both are tested; the warranty is
        usually against the link, the user-experience is against the channel. Always confirm the
        test definition with the project specification.
      </>
    ),
  },
  {
    question: 'How do I know if my OTDR is set up correctly for a given link?',
    answer: (
      <>
        Modern OTDRs have auto-set modes that pick wavelength, pulse width, range and averaging
        based on the link length and fibre type. For manual setup: pulse width = narrow for
        in-building, wider for long links; range = 1.5-2 × link length; averaging = longer for
        better SNR but slower; wavelength = both 1310 + 1550 (SM) or 850 + 1300 (MM). Run a test
        trace, check that the end-of-fibre reflection is clearly visible and not lost in noise,
        check that the per-event analysis is reporting sensible numbers. If anything is unusual,
        consult the OTDR manual.
      </>
    ),
  },
  {
    question: 'What is "macrobend" and why does dual-wavelength OTDR find it?',
    answer: (
      <>
        A macrobend is a physical bend in the fibre tighter than the manufacturer\u2019s minimum
        bend radius — typically caused by over-tight cable ties, sharp containment edges, or kinking
        during install. At a macrobend, light leaks out of the core into the cladding and is lost.
        The leakage is wavelength-dependent: a tighter bend at 1310 nm may lose 0.2 dB but at 1550
        nm the same bend can lose 1-3 dB. Comparing the two-wavelength OTDR traces immediately
        localises macrobends — the long-wavelength trace shows a loss step where the
        short-wavelength trace shows almost nothing. Standard remedy: re-route the cable to respect
        bend radius, re-test.
      </>
    ),
  },
  {
    question: 'How often should fibre be re-tested after commissioning?',
    answer: (
      <>
        Permanent fibre infrastructure does not require routine re-testing — the links are stable.
        Re-test triggers are: any patching change at the panel; any building works in the cable
        route; any reported intermittent error rate or loss; any planned upgrade (e.g. moving from
        10G to 25G transceivers — re-verify the link budget against the new transceiver spec). Every
        re-test should compare against the day-one baseline OTDR trace — the baseline is the
        as-built record, kept in the cabling administration system per BS EN 50174-1 / TIA-606-D.
      </>
    ),
  },
];

const DataCablingModule3Section4 = () => {
  const navigate = useNavigate();

  useSEO(
    'Loss Budgets and OTDR Basics | Data Cabling Module 3.4 | Elec-Mate',
    'Fibre testing fundamentals — link power budget, component loss values, OTDR pulse width and dynamic range, bidirectional and dual-wavelength measurement, launch and receive cords, trace interpretation, ghost reflections, and the difference between Tier 1 OLTS insertion-loss certification and Tier 2 OTDR characterisation.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4"
            title="Loss Budgets and OTDR Basics"
            description="Fibre testing fundamentals — link power budget, component loss values, OTDR pulse width and dynamic range, bidirectional dual-wavelength measurement, launch and tail cords, trace interpretation including ghost reflections, and the relationship between Tier 1 OLTS insertion-loss certification and Tier 2 OTDR characterisation."
            tone="yellow"
          />

          <TLDR
            points={[
              'Link insertion-loss budget = (fibre length × dB/km) + (splice count × splice loss) + (connector-pair count × pair loss) + ~1 dB headroom. Calculate before commissioning, test against the budget, document the as-built loss.',
              'Tier 1 testing (OLTS / LSPM) is the CERTIFIED end-to-end insertion-loss measurement — the formal pass / fail. Tier 2 testing (OTDR) is the DIAGNOSTIC / CHARACTERISATION measurement — maps per-event loss along the link. Both at commissioning, both bidirectional, both dual-wavelength.',
              'OTDR settings trade off dynamic range vs resolution. Wider pulse = greater range, worse resolution. Narrower pulse = better resolution, less range. Use the narrowest pulse that gives adequate signal-to-noise; multiple traces at different pulse widths characterise long links.',
              'Launch and tail cords are mandatory — they push the OTDR\u2019s dead zone outside the link being tested, so the first / last connectors are properly characterised. Match fibre type and polish to the link. Bidirectional + dual-wavelength testing is the gold standard — it cancels backscatter-coefficient artefacts and catches wavelength-dependent macrobends.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate a link insertion-loss budget from fibre attenuation, splice count and connector-pair count, and choose appropriate headroom',
              'Distinguish Tier 1 (OLTS / LSPM) certification from Tier 2 (OTDR) characterisation, and explain why both are typically performed at commissioning',
              'Explain how an OTDR works — pulsed time-domain backscatter measurement — and read pulse-width / range / dynamic range / averaging settings',
              'Read an OTDR trace and identify the four canonical features: fibre attenuation slope, fusion splice loss step, connector-pair / mechanical-splice loss + reflection, end-of-fibre reflection',
              'Apply the discipline of bidirectional + dual-wavelength testing and explain why each cancels a specific class of artefact (backscatter asymmetry, wavelength-dependent bend loss)',
              'Identify launch and tail cord requirements (length, fibre type, polish), and explain why they are mandatory rather than optional',
              'Diagnose excess link loss using a calculated-budget vs measured-loss comparison, then locate the offending event with OTDR + IEC 61300-3-35 endface inspection',
              'Identify ghost reflections and other OTDR artefacts (negative-loss splices, end-of-fibre echoes), and apply suppression strategies (APC connectors, pulse width, averaging)',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The link insertion-loss budget</ContentEyebrow>

          <ConceptBlock
            title="Calculating the budget — three components plus headroom"
            plainEnglish="The link insertion-loss budget is the maximum allowed end-to-end optical loss for the channel. It is calculated by summing the contributions of (1) the fibre itself (length × attenuation in dB/km), (2) every splice (fusion or mechanical) along the link, and (3) every mated connector pair. Add headroom (typically 1 dB) for ageing, future patching, and minor contamination. Test against this number on commissioning."
            onSite="Before any test instrument is plugged in, you draw out the link on paper, count the splices and connector pairs, take the fibre length from the design or the as-built, and calculate the budget. Then you run the test and see if the measurement is below the budget. If it is below: pass. If it is above: there is excess loss somewhere — usually a contaminated connector — and the OTDR finds where."
          >
            <p>The three components, with typical values:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fibre attenuation.</strong> Length (km) × dB/km. OS2 SM at 1310 nm: ≤ 0.4
                dB/km specified, ~0.32-0.38 typical. OS2 at 1550 nm: ~0.25 dB/km. OS1 / OS1a indoor
                at 1310 nm: ~1.0 dB/km. OM4 MM at 850 nm: ~3.5 dB/km; at 1300 nm: ~1.5 dB/km.
              </li>
              <li>
                <strong>Splice loss.</strong> Per fusion splice: 0.05-0.1 dB (SM), 0.1-0.2 dB (MM).
                Per mechanical splice: 0.1-0.2 dB. Multiply by splice count.
              </li>
              <li>
                <strong>Connector-pair loss.</strong> Per mated pair (clean, inspected per IEC
                61300-3-35): 0.2-0.5 dB. Multiply by the number of mated connector pairs in the
                channel — typically 4 (one at each end of the field cable, plus patch leads at each
                end).
              </li>
              <li>
                <strong>Headroom.</strong> Add ~1 dB for ageing, future patching, minor
                contamination drift over time. Some specifications use 0.5 dB, others 1.5 dB — check
                the project specification.
              </li>
            </ul>
            <p>
              Worked example: 200 m OS2 SM at 1310 nm, 6 fusion splices, 4 connector pairs. Fibre
              loss: 0.2 km × 0.4 = 0.08 dB. Splice: 6 × 0.1 = 0.6 dB. Connector: 4 × 0.3 = 1.2 dB.
              Total: 1.88 dB. Add 1 dB headroom: budget ~ 2.9 dB. Test the link with OLTS at 1310
              nm; if measurement &lt; 2.9 dB, pass. Compare against the transceiver budget for the
              target service (10GBASE-LR ~ 6.2 dB, 25GBASE-LR varies) for service compatibility
              headroom.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ISO/IEC 14763-3 / BS EN 50346 (Fibre-cabling testing — paraphrased)"
            clause={
              <>
                Fibre channels shall be tested at commissioning against a calculated insertion- loss
                budget for each tested wavelength. Tier 1 testing (light-source plus power meter,
                OLTS) shall be performed in both directions and at the appropriate wavelengths for
                the cabling type. Tier 2 testing (OTDR) where specified shall similarly be performed
                in both directions and at dual wavelengths. The reference method (one-cord,
                three-cord) shall be specified, and the launch conditions (encircled flux for MM)
                shall comply with the relevant test method. Test results shall be documented and
                retained as part of the as-built record.
              </>
            }
            meaning="Fibre testing is process-driven and standards-driven. The standards do not pick individual numbers but specify the test method, the directionality, the wavelength count and the documentation discipline. The numerical pass / fail comes from the link budget you calculate from manufacturer data, the channel length and the component count. Bidirectional + dual-wavelength + documented launch conditions is the certification baseline."
            cite="Paraphrased from ISO/IEC 14763-3 (international) and BS EN 50346 (UK / EU adoption) — refer to the printed standard for verbatim clause text"
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>OTDR — what it does and how it works</ContentEyebrow>

          <ConceptBlock
            title="Pulsed backscatter, time-of-flight, and the trace"
            plainEnglish="An Optical Time Domain Reflectometer launches a short optical pulse into the fibre and measures the light returned by Rayleigh backscatter (uniform, low-level, exists at every point along the fibre) and Fresnel reflection (large, localised, occurs at refractive-index discontinuities — connectors, mechanical splices, fibre breaks, end-of-fibre). The returned signal is plotted on a log scale of relative power vs round-trip distance. From this trace, the OTDR derives per-event loss, fibre attenuation slope, total link loss, and event location."
            onSite="An OTDR is a diagnostic instrument. You set the pulse width, range and averaging; you connect via a launch cord; you run the trace; you read off events. The skill is interpreting the trace — distinguishing real events from artefacts (ghosts, gainers, end-of-fibre echoes), choosing the right pulse width for the link, and using bidirectional / dual-wavelength testing to cancel measurement asymmetries."
          >
            <p>The four canonical OTDR-trace features:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Sloping line.</strong> The fibre attenuation slope. Slope (dB/km) = fibre
                attenuation. Constant slope means uniform fibre; a change in slope is a
                long-distance loss change (rare).
              </li>
              <li>
                <strong>Step down with no peak.</strong> A fusion splice. The continuous-glass joint
                produces no Fresnel reflection — only a small loss step.
              </li>
              <li>
                <strong>Step down with a peak above the trend.</strong> A connector pair or
                mechanical splice. The mating-face refractive-index discontinuity reflects light
                (the peak), and the small geometric / contamination losses give a step (the loss).
                UPC connectors give a small peak; APC connectors give a much smaller peak because
                the angled face reflects light into the cladding.
              </li>
              <li>
                <strong>Large peak at the end of the trace.</strong> The end-of-fibre reflection —
                typically the last connector face, or an open fibre end (which gives a stronger peak
                from the glass-air interface). Beyond this peak, the trace falls into noise.
              </li>
            </ul>
            <p>
              Pulse width is the trade-off knob. Wider pulse = more energy = greater dynamic range
              (sees further down the fibre) but worse resolution (events within the pulse width
              worth of distance merge into one event). Narrower pulse = better resolution but less
              dynamic range. Standard OTDR practice on a long link is to run multiple traces at
              different pulse widths — short pulse for the near-end events, wider pulse for the far
              end — and combine.
            </p>
          </ConceptBlock>

          {/* OTDR trace diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Annotated OTDR trace — relative power vs distance, with feature legend
            </h4>
            <svg
              viewBox="0 0 900 600"
              className="w-full h-auto"
              role="img"
              aria-label="An idealised OTDR trace plotted on a clean axis: distance on the horizontal axis, relative returned power in dB on the vertical axis. The trace falls along a uniform attenuation slope from launch, drops at a fusion-splice event (step, no peak), drops with a small upward spike at a connector-pair event, then drops sharply at a fault, before rising in a large reflection peak at end-of-fibre. A small ghost peak appears between the connector and fault. All event-position labels sit in a dedicated row directly below the plot, never on the trace. A legend at the bottom maps each feature signature to its meaning."
            >
              {/* ===== Plot area ===== */}
              <rect
                x="70"
                y="50"
                width="800"
                height="220"
                rx="6"
                fill="rgba(255,255,255,0.02)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              {/* Y-axis */}
              <line x1="70" y1="50" x2="70" y2="270" stroke="#9CA3AF" strokeWidth="1.2" />
              <text
                x="32"
                y="58"
                fill="#CBD5E1"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                dB
              </text>
              <text x="44" y="76" fill="#9CA3AF" fontSize="9" fontFamily="system-ui">
                high
              </text>
              <text x="44" y="262" fill="#9CA3AF" fontSize="9" fontFamily="system-ui">
                low
              </text>

              {/* X-axis */}
              <line x1="70" y1="270" x2="870" y2="270" stroke="#9CA3AF" strokeWidth="1.2" />

              {/* X-axis tick markers (under the plot, not crossing trace) */}
              {[
                { x: 200, label: 'launch' },
                { x: 360, label: 'splice 1' },
                { x: 500, label: 'connector' },
                { x: 600, label: 'ghost' },
                { x: 700, label: 'fault' },
                { x: 820, label: 'end' },
              ].map((t, i) => (
                <g key={'tick-' + i}>
                  <line x1={t.x} y1="270" x2={t.x} y2="278" stroke="#9CA3AF" strokeWidth="1" />
                  <text
                    x={t.x}
                    y="294"
                    textAnchor="middle"
                    fill="#CBD5E1"
                    fontSize="9.5"
                    fontFamily="system-ui"
                  >
                    {t.label}
                  </text>
                </g>
              ))}

              <text
                x="470"
                y="316"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                distance (m) →
              </text>

              {/* ===== TRACE — single yellow polyline (no labels on top) ===== */}
              {/* Slope to splice 1 */}
              <polyline
                points="70,72 200,82 360,116 360,128 500,168 500,156 500,182 600,206 700,206 700,236 820,250 820,76 820,254 870,256"
                fill="none"
                stroke="#FACC15"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />

              {/* Ghost reflection — small isolated peak ABOVE current trace level */}
              <line x1="600" y1="206" x2="600" y2="194" stroke="#A855F7" strokeWidth="2" />
              <line x1="600" y1="194" x2="600" y2="206" stroke="#A855F7" strokeWidth="2" />

              {/* Noise floor (dashed grey) after end */}
              <line
                x1="820"
                y1="256"
                x2="870"
                y2="258"
                stroke="#9CA3AF"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* ===== Legend panel — features mapped, BELOW the plot ===== */}
              <rect
                x="40"
                y="340"
                width="820"
                height="240"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="60"
                y="364"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                FEATURE LEGEND
              </text>

              {/* Two columns of features */}
              {/* Left column */}
              <line x1="60" y1="384" x2="80" y2="380" stroke="#FACC15" strokeWidth="2" />
              <line x1="80" y1="380" x2="100" y2="378" stroke="#FACC15" strokeWidth="2" />
              <text
                x="120"
                y="384"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Slope
              </text>
              <text x="180" y="384" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                fibre attenuation per km — uniform downward slope
              </text>

              <line x1="60" y1="412" x2="80" y2="412" stroke="#FACC15" strokeWidth="2" />
              <line x1="80" y1="412" x2="80" y2="420" stroke="#22C55E" strokeWidth="2" />
              <line x1="80" y1="420" x2="100" y2="420" stroke="#FACC15" strokeWidth="2" />
              <text
                x="120"
                y="416"
                fill="#BBF7D0"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Splice
              </text>
              <text x="180" y="416" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                small downward step, no peak — fusion splice (~0.05–0.1 dB SM)
              </text>

              <line x1="60" y1="442" x2="80" y2="442" stroke="#FACC15" strokeWidth="2" />
              <line x1="80" y1="442" x2="80" y2="432" stroke="#22D3EE" strokeWidth="2" />
              <line x1="80" y1="432" x2="80" y2="450" stroke="#22D3EE" strokeWidth="2" />
              <line x1="80" y1="450" x2="100" y2="450" stroke="#FACC15" strokeWidth="2" />
              <text
                x="120"
                y="446"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Connector
              </text>
              <text x="180" y="446" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                small upward peak + step — mated connector pair (~0.3 dB)
              </text>

              <line x1="60" y1="478" x2="80" y2="478" stroke="#FACC15" strokeWidth="2" />
              <line x1="80" y1="478" x2="80" y2="468" stroke="#A855F7" strokeWidth="2" />
              <line x1="80" y1="468" x2="80" y2="478" stroke="#A855F7" strokeWidth="2" />
              <line x1="80" y1="478" x2="100" y2="478" stroke="#FACC15" strokeWidth="2" />
              <text
                x="120"
                y="482"
                fill="#E9D5FF"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Ghost
              </text>
              <text x="180" y="482" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                small peak without an associated step — instrument artefact
              </text>

              {/* Right column */}
              <line x1="460" y1="384" x2="480" y2="384" stroke="#FACC15" strokeWidth="2" />
              <line x1="480" y1="384" x2="480" y2="404" stroke="#EF4444" strokeWidth="2" />
              <line x1="480" y1="404" x2="500" y2="404" stroke="#FACC15" strokeWidth="2" />
              <text
                x="520"
                y="392"
                fill="#FCA5A5"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Fault
              </text>
              <text x="580" y="392" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                large downward step — break, crush, contamination
              </text>

              <line x1="460" y1="430" x2="475" y2="430" stroke="#FACC15" strokeWidth="2" />
              <line x1="475" y1="430" x2="475" y2="402" stroke="#F59E0B" strokeWidth="2" />
              <line x1="475" y1="402" x2="475" y2="442" stroke="#F59E0B" strokeWidth="2" />
              <text
                x="520"
                y="430"
                fill="#FED7AA"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                End-of-fibre
              </text>
              <text x="580" y="430" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                large reflection peak at far-end · check vs link length
              </text>

              <line
                x1="460"
                y1="466"
                x2="500"
                y2="468"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              <text
                x="520"
                y="470"
                fill="#CBD5E1"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Noise floor
              </text>
              <text x="580" y="470" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                beyond end — no useful information
              </text>

              {/* Footer rule */}
              <line
                x1="60"
                y1="500"
                x2="840"
                y2="500"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="450"
                y="524"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Bidirectional + dual-wavelength averaging cancels measurement artefacts
              </text>
              <text
                x="450"
                y="544"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Tier 2 OTDR — characterisation tool, not the certification pass / fail (that is Tier
                1 OLTS)
              </text>
              <text
                x="450"
                y="562"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                IEC 61280-4-1 (MM) · IEC 61280-4-2 (SM) · ISO/IEC 14763-3
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Bidirectional, dual-wavelength, and ghost reflections</ContentEyebrow>

          <ConceptBlock
            title="The disciplines that turn an OTDR trace into a defensible measurement"
            plainEnglish="A single-direction, single-wavelength OTDR trace is a useful diagnostic but not a defensible characterisation. Two disciplines fix this. Bidirectional testing measures the link from each end and averages — this cancels backscatter-coefficient asymmetry between adjacent fibres and gives a true splice loss. Dual-wavelength testing measures at two wavelengths (1310 + 1550 nm SM, 850 + 1300 nm MM) — this catches wavelength-dependent issues, primarily macrobends, that show up at long wavelengths but not at short ones. Together, bidirectional + dual-wavelength is the certification gold standard."
            onSite="Modern field-test OTDRs perform bi-directional + dual-wavelength testing automatically. The user connects launch and tail cords, identifies the link ends, and runs a single test sequence; the instrument runs the four traces, applies the averaging, generates a report. The output is the defensible characterisation that goes into the as-built record."
          >
            <p>The two disciplines, briefly:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Bidirectional measurement.</strong> Run the OTDR from each end of the link
                and average the per-event loss results. This cancels the artefact caused by
                backscatter-coefficient differences between adjacent fibres at a splice — a small
                manufacturing variation that can produce an apparent gain (negative loss) in one
                direction and exaggerated loss in the other. Industry-standard for splice
                characterisation.
              </li>
              <li>
                <strong>Dual-wavelength measurement.</strong> Run at both 1310 + 1550 nm (SM) or 850
                + 1300 nm (MM). Macrobends and microbends attenuate long wavelengths much more
                strongly than short — a 0.3 dB step at 1310 nm may be 1.5 dB at 1550 nm. Comparing
                the two traces immediately identifies bend-induced losses for re- routing.
              </li>
              <li>
                <strong>Ghost reflections.</strong> Artefacts of the OTDR\u2019s pulsed nature. The
                launched pulse partially reflects off a strong reflective event (typically the
                far-end connector), travels back, partially re-reflects at the launch end, travels
                forward, and is received again. Signature: a small peak with no associated loss
                step, located at exactly 2 × the distance to the strong reflector. Suppression: APC
                connectors (lower return loss), reduce pulse energy, longer averaging.
              </li>
              <li>
                <strong>End-of-fibre echo.</strong> Very strong reflection from the glass-air
                interface at an open fibre end, or from the last connector. Beyond this peak the
                trace is noise. Always check that this peak corresponds to the expected link length.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="OTDR setting trade-offs"
            source="ISO/IEC 14763-3 / IEC 61280 series"
            headers={['Setting', 'Effect at narrow value', 'Effect at wide value', 'Typical use']}
            rows={[
              [
                'Pulse width',
                'Better resolution, lower SNR / range',
                'Worse resolution, higher SNR / range',
                'Narrow for in-building, wider for long-haul; multi-pulse traces on long links',
              ],
              [
                'Range',
                'Less of fibre visible',
                'More of fibre visible',
                '1.5-2 × link length is typical',
              ],
              [
                'Averaging time',
                'Faster trace, noisier',
                'Slower trace, cleaner',
                'Long for low-SNR / long links, short for in-building MM',
              ],
              [
                'Wavelength',
                'Catches short-wavelength events',
                'Catches long-wavelength events (macrobend)',
                'Always test both — 1310 + 1550 SM, 850 + 1300 MM',
              ],
              [
                'Direction',
                'Single-shot',
                'Bidirectional cancels asymmetry',
                'Always bidirectional for splice / certification',
              ],
              [
                'Launch cord length',
                'Dead zone in link',
                'Dead zone outside link',
                '100-1000 m typical, match fibre + polish',
              ],
            ]}
            notes="The four-quadrant gold standard: narrow + wide pulse on a long link, both wavelengths, both directions, with appropriate launch / tail cords. Modern field test sets automate this."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Reporting an OTDR loss number as the certified channel insertion loss"
            whatHappens={
              <>
                Engineer runs an OTDR trace, reads off the cumulative loss number (e.g. 1.4 dB), and
                writes it into the certification document as the channel insertion loss. The client
                warranty fails the certification because the warranty manufacturer requires a Tier 1
                OLTS measurement against the channel budget — not an OTDR estimate. The project has
                to be re-tested with a power meter / light source set to obtain the Tier 1 number,
                costing a return visit and contractor rework time.
              </>
            }
            doInstead={
              <>
                Always perform Tier 1 OLTS measurement for certified end-to-end loss — this is the
                pass / fail number against the budget. Tier 2 OTDR is the diagnostic /
                characterisation measurement, used to LOCATE excess loss and to baseline the link
                for future maintenance. Most projects specify both at commissioning. Document each
                separately in the as-built record. Never substitute one for the other.
              </>
            }
          />

          <Scenario
            title="A 320 m OS2 link tests at 2.4 dB at 1310 nm but 4.1 dB at 1550 nm"
            situation={
              <>
                Recently-installed OS2 single-mode link between a basement equipment room and a
                roof-top antenna head-end. OLTS commissioning shows 2.4 dB at 1310 nm — well within
                the calculated 3.0 dB budget. But at 1550 nm the same link tests at 4.1 dB — 1.7 dB
                more than the 1310 reading and outside the 1550 nm budget. The 1310 pass alone would
                let the project sign off. What is the issue, and how do you find it?
              </>
            }
            whatToDo={
              <>
                The wavelength-dependent loss differential (1.7 dB more at 1550 vs 1310) is the
                fingerprint of a macrobend or microbend somewhere along the link. Long wavelengths
                leak more easily out of a tight bend. Run a Tier 2 OTDR test at BOTH wavelengths in
                BOTH directions with appropriate launch / tail cords. Compare the two-wavelength
                traces — the macrobend will show as a loss step at 1550 nm that is much smaller or
                absent at 1310 nm. Identify the position. Walk the cable route to that position;
                look for sharp corners, over-tight cable ties, or a kink in the cable. Re-route to
                respect the manufacturer\u2019s minimum bend radius (typically 10× outer diameter
                unloaded, 20× loaded). Re-test bidirectionally at both wavelengths. Document the
                finding and the remediation in the as-built record.
              </>
            }
            whyItMatters={
              <>
                Single-wavelength testing would have signed off the link as a 1310 nm pass and then
                the 1550 nm transceivers (often used for higher-speed services or DWDM) would have
                failed in service — an unsupported, intermittent failure that is much more expensive
                to chase down than a commissioning-time identification. Dual-wavelength testing is
                mandatory because it catches exactly this class of fault. The macrobend remediation
                is cheap; finding it after the building hands over is not.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Link insertion-loss budget = (fibre length × dB/km) + (splice count × splice loss) + (connector-pair count × pair loss) + ~1 dB headroom. Calculate before commissioning, test against the budget.',
              'Tier 1 (OLTS / LSPM) is the certified end-to-end insertion-loss test — pass / fail. Tier 2 (OTDR) is the diagnostic / characterisation test — maps per-event loss along the link. Both at commissioning, both bidirectional, both dual-wavelength.',
              'OTDR measures backscatter return vs time and converts time to distance. The trace shows fibre attenuation slope, splice steps, connector-pair steps + peaks, and the end-of-fibre reflection. Pulse width trades dynamic range against resolution.',
              'Launch and tail cords (100-1000 m typical) push the OTDR\u2019s dead zone outside the link being tested. Match fibre type and polish to the link.',
              'Bidirectional + dual-wavelength testing is the certification gold standard. Bidirectional cancels backscatter-coefficient artefacts; dual-wavelength catches wavelength-dependent macrobends. Modern field test sets automate this.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Cleaving and splicing
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-5')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Fibre testing and certification
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule3Section4;
