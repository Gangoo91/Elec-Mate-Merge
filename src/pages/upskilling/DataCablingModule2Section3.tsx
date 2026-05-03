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
  AmendmentBadge,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m2s3-insertion-loss',
    question:
      'A field tester reports a Cat6A channel with 22 dB insertion loss at 250 MHz against a 26 dB limit. Pass or fail, and what does the result mean physically?',
    options: [
      'Fail — 22 dB is too high.',
      'Pass — at 250 MHz the channel must lose less than the 26 dB Class EA limit. The 22 dB result means the channel attenuates the wanted signal by a factor of about 12.6 (22 dB) — well within the budget. Lower insertion loss = more signal arrives at the far end = bigger margin against the receiver\u2019s decoding threshold.',
      'Fail — insertion loss should be 0 dB.',
      'Cannot tell from the data.',
    ],
    correctIndex: 1,
    explanation:
      'Insertion loss is the attenuation (in dB) introduced by the channel at a given frequency. The Class limit at 250 MHz for Class EA is around 26 dB; a 22 dB result is a comfortable PASS — the channel loses less signal than the budget allows. Insertion loss rises with frequency (higher-frequency components attenuate more in a given length of cable), with cable length, and with cable temperature. Sustained PoE current heats the cable and raises insertion loss — \u00a7716.523.1.101 NOTE 1 says exactly this.',
  },
  {
    id: 'datacabling-m2s3-next-explained',
    question:
      'A channel report shows NEXT margin of +4 dB at 100 MHz, but PSNEXT margin of -1 dB at the same frequency. The link fails. Why does PSNEXT fail when NEXT passes?',
    options: [
      'NEXT and PSNEXT are unrelated.',
      'PSNEXT (power-sum NEXT) sums the contributions of every OTHER pair into the pair under test, while NEXT is the worst pair-to-pair coupling. With four pairs all active simultaneously (1000BASE-T / 10GBASE-T), each pair receives combined disturbance from its three neighbours. PSNEXT can fail even when individual NEXT passes — and 1000BASE-T / 10GBASE-T need PSNEXT margin, not just NEXT margin.',
      'PSNEXT is fibre-only.',
      'NEXT is for short channels, PSNEXT for long channels.',
    ],
    correctIndex: 1,
    explanation:
      'NEXT (near-end crosstalk) is measured pair-to-pair, worst case. PSNEXT (power-sum NEXT) is the SUMMED disturbance from ALL OTHER pairs into the pair under test. Older Ethernet (10BASE-T, 100BASE-TX) used two pairs and care about NEXT only. Modern Ethernet from 1000BASE-T onwards uses ALL FOUR pairs simultaneously and care about PSNEXT — every pair sees combined disturbance from all three of its neighbours. A channel can pass NEXT (worst pair-to-pair OK) but fail PSNEXT (combined disturbance breaches the limit). Class EA / Cat6A specifications include PSNEXT and PSANEXT (alien power-sum) limits explicitly.',
  },
  {
    id: 'datacabling-m2s3-poe-temperature',
    question:
      'BS 7671 §716.523.1.101 NOTE 1 warns about the link between PoE current, cable temperature, and channel performance. What is the physical chain?',
    options: [
      'PoE damages the cable jacket directly.',
      'Sustained DC current heats the conductors (I\u00b2R losses); in dense bundles the heat compounds because every loaded cable warms its neighbours; cable temperature rise increases conductor resistivity (copper is 0.4 % per \u00b0C) which raises insertion loss; raised insertion loss erodes channel margin and degrades transmission performance — the precise wording of NOTE 1.',
      'PoE causes magnetic saturation of the steel containment.',
      'Higher current produces higher-frequency noise.',
    ],
    correctIndex: 1,
    explanation:
      '\u00a7716.523.1.101 NOTE 1 (verbatim): "Any temperature rise of the data cables due to the load current they carry, or other causes, will increase the attenuation/insertion loss of the cables. Thus the performance of information transmission channels can be degraded." The chain is: PoE current \u2192 I\u00b2R conductor heating \u2192 bundle thermal compounding \u2192 cable temperature rise \u2192 insertion loss rises (copper resistivity rises with temperature, dielectric losses rise too) \u2192 channel margin shrinks. NOTE 2 then references PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2 and ISO/IEC TS 29125 for bundle planning and design — and the \u00a7716.523.2.101 hard cap of 750 mA per conductor is the regulatory ceiling that bounds it.',
  },
  {
    id: 'datacabling-m2s3-class-limits-source',
    question:
      'Where in the standards do you find the actual numerical limits for Class EA channel parameters (insertion loss, NEXT, PSNEXT, ACR-F, return loss, etc.) at every test frequency?',
    options: [
      'BS 7671:2018+A4:2026 \u00a7716.',
      'BS EN 50173-1 (and ISO/IEC 11801-1, and ANSI/TIA-568.2-E) — these are the documents that set the per-frequency parameter limits for each Class. The field tester loads the appropriate Class profile and PASS / FAIL is computed against those limits. BS 7671 \u00a7716 references back to BS EN 50173-1 (\u00a7716.523.1.101 — design current limit "as specified in BS EN 50173-1") but does not republish the per-frequency Class tables.',
      'TIA TSB-184-A.',
      'BS EN 60825-2.',
    ],
    correctIndex: 1,
    explanation:
      'The numerical Class limits live in BS EN 50173-1 (and the parallel ISO/IEC 11801-1 and ANSI/TIA-568.2-E). BS 7671 \u00a7716 references back to BS EN 50173-1 — for example, \u00a7716.523.1.101 says "The design current in any conductor shall not exceed the limit specified in BS EN 50173-1." The wiring regulations do not republish the per-frequency Class tables; they sit in the cabling-performance standards. The field tester loads the appropriate Class profile (D, E, EA, F, FA, I, II) and tests against the BS EN 50173-1 / TIA-568.2-E limits at every specified frequency point.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is "insertion loss" in a balanced cabling channel, and what physically causes it to rise with frequency?',
    options: [
      'It is the loss caused by faulty connectors only.',
      'Insertion loss is the attenuation (in dB) introduced by the channel at a given test frequency. It rises with frequency because higher-frequency components attenuate more in a given length of conductor (skin effect, dielectric losses), with channel length, and with cable temperature. Class limits scale with frequency — the higher the Category bandwidth, the steeper the insertion loss can be allowed to rise without breaching the limit.',
      'It is the loss of the receiver chip.',
      'It is the difference between channel and permanent-link length.',
    ],
    correctAnswer: 1,
    explanation:
      'Insertion loss = how much signal energy the channel absorbs / scatters, in dB, at each test frequency. Three drivers raise it: frequency (skin effect concentrates current near the conductor surface; dielectric losses increase), length (each metre adds attenuation), and temperature (copper resistivity rises ~0.4 %/°C; dielectric losses rise too). The Class profile specifies the maximum allowable insertion loss at every test frequency; the field tester reports actual against limit and computes margin.',
  },
  {
    id: 2,
    question:
      'How do NEXT, PSNEXT and PSANEXT differ, and which one matters most for 10GBASE-T over Cat6A?',
    options: [
      'They are identical measurements.',
      'NEXT (near-end crosstalk) = worst pair-to-pair coupling at the near end. PSNEXT (power-sum NEXT) = total summed disturbance from all OTHER pairs into the pair under test. PSANEXT (power-sum alien NEXT) = total summed disturbance from adjacent CABLES into the pair under test. 10GBASE-T uses all four pairs and is the first Ethernet to be alien-crosstalk-sensitive, so PSANEXT margin matters as much as PSNEXT — and both more than worst-case NEXT.',
      'PSNEXT is fibre, NEXT is copper.',
      'NEXT is for short cables only.',
    ],
    correctAnswer: 1,
    explanation:
      'NEXT (worst pair-pair, single-cable). PSNEXT (sum of other pairs into target pair, single-cable). PSANEXT (sum of adjacent CABLES into target pair, between cables in a bundle — alien crosstalk). 10GBASE-T uses 4 pairs simultaneously, full-duplex on each, with PAM-16 line coding — exquisitely sensitive to inter-pair AND inter-cable crosstalk. Cat6A is the first Category to specify alien-crosstalk parameters (PSANEXT, PSAACR-F) precisely because of 10GBASE-T. In hot loaded bundles, PSANEXT margin shrinks first; that is one of the reasons F/UTP / U/FTP shielded variants restore margin.',
  },
  {
    id: 3,
    question: 'What is "return loss" and why does it matter for high-speed transmission?',
    options: [
      'The loss of cable that needs to be returned to the supplier.',
      'Return loss is the dB ratio of forward to reflected signal — high return loss = little reflection, good. It measures impedance match along the channel. Reflections from impedance discontinuities (rough terminations, bend kinks, length mismatches, cheap patch leads) cause echoes that distort the receiver\u2019s view; modern Ethernet PHYs include echo cancellers, but they have a limit and high reflections eat margin.',
      'It is identical to insertion loss.',
      'It only applies to fibre.',
    ],
    correctAnswer: 1,
    explanation:
      'Return loss is the impedance-match metric: how much of the forward signal reflects back from impedance discontinuities along the channel. Specified in dB; HIGHER return loss is BETTER (more dB = less reflected energy). Sources of poor return loss: rough terminations (untwisted-pair length too long inside the connector, asymmetric crimp), tight bends that distort cable geometry, length mismatches between pairs, badly-made patch leads. Modern Ethernet uses echo cancellation but has a limit — a marginal return-loss channel will cause intermittent linking and packet loss before it visibly fails.',
  },
  {
    id: 4,
    question: 'What does "delay skew" measure, and why does 1000BASE-T / 10GBASE-T care about it?',
    options: [
      'The angle of the cable as it leaves the panel.',
      'Delay skew = the difference in propagation delay between the four pairs of the cable, measured in nanoseconds across the channel length. 1000BASE-T and 10GBASE-T transmit on all four pairs simultaneously and the receiver re-aligns the four streams; if one pair propagates significantly faster than another, the receiver\u2019s alignment window is exceeded and bit errors result. The Class limit is around 50 ns max delay skew across a 100 m channel.',
      'It is identical to NEXT.',
      'It only matters for fibre.',
    ],
    correctAnswer: 1,
    explanation:
      'Different pairs have slightly different physical lengths (because of the different twist rates) and different propagation velocities (because the dielectric varies slightly). Delay skew is the time difference between the fastest and slowest pair across the channel. The Class limit is around 50 ns / 100 m. 1000BASE-T and 10GBASE-T transmit on all four pairs simultaneously and re-align them at the receiver; if delay skew is excessive, the receiver alignment window is exceeded and bit errors result. The fix is the cable design itself — manufacturers tune dielectric and twist rates to keep delay skew within limit.',
  },
  {
    id: 5,
    question: 'Why does 1 Gbps Ethernet (1000BASE-T) need 100 MHz cable bandwidth? Why not 1 GHz?',
    options: [
      '1000BASE-T uses 1 GHz baud rate.',
      'Spectral efficiency. 1000BASE-T uses 4 pairs simultaneously, full duplex on each, with PAM-5 line coding at 125 Mbaud per pair — total = 4 \u00d7 125 \u00d7 2 (full duplex) = 1000 Mbps useful, and the spectrum needed to carry 125 Mbaud PAM-5 fits within ~100 MHz cable bandwidth. The clever bit is in the encoding and the use of all four pairs, not in raw baud rate.',
      '1 GHz cable does not exist.',
      '100 MHz is the FCC limit.',
    ],
    correctAnswer: 1,
    explanation:
      '1000BASE-T (1999) achieves 1 Gbps useful throughput inside a 100 MHz Cat5e channel by using 4 pairs simultaneously, full-duplex on each, with PAM-5 line coding at 125 Mbaud per pair: 4 \u00d7 125 Mbaud \u00d7 2 (full duplex) \u00d7 ~2 bits/baud (PAM-5 with overhead) \u2248 1 Gbps. 10GBASE-T (2006) does the same trick at 500 MHz with PAM-16 line coding for Cat6A. The cable bandwidth (100 MHz, 250 MHz, 500 MHz) is the analogue spectrum the cable carries; the digital throughput is far higher because of clever encoding and parallel pairs.',
  },
  {
    id: 6,
    question:
      'What is the BS 7671 §716.523.1.101 design-current rule and what does its NOTE 1 warn about for transmission performance?',
    options: [
      '\u00a7716.523.1.101 caps current at 100 mA per pair.',
      '\u00a7716.523.1.101 (verbatim): "The design current in any conductor shall not exceed the limit specified in BS EN 50173-1." NOTE 1: "Any temperature rise of the data cables due to the load current they carry, or other causes, will increase the attenuation/insertion loss of the cables. Thus the performance of information transmission channels can be degraded." NOTE 2 references PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2 and ISO/IEC TS 29125 for bundle planning.',
      '\u00a7716.523.1.101 mandates fibre.',
      '\u00a7716.523.1.101 only applies above 250 V.',
    ],
    correctAnswer: 1,
    explanation:
      'The clause text and notes are verbatim. \u00a7716.523.1.101 sets the design-current rule by REFERENCE to BS EN 50173-1; \u00a7716.523.2.101 then sets the absolute hard cap (\u2264 750 mA per conductor). NOTE 1 is the explicit link from PoE current \u2192 temperature rise \u2192 insertion loss \u2192 channel performance degradation. NOTE 2 points the designer at the bundle planning standards: PD CLC/TR 50174-99-1 (multi-cable bundle thermal model), BS ISO/IEC 14763-2 (planning and installation), ISO/IEC TS 29125 (remote powering). This is why Module 2 Section 5 spends so much time on bundle management.',
  },
  {
    id: 7,
    question: 'Where do the per-frequency numerical limits for each Class come from?',
    options: [
      'BS 7671:2018+A4:2026.',
      'BS EN 50173-1 (and the parallel ISO/IEC 11801-1 and ANSI/TIA-568.2-E). These standards specify the per-frequency parameter limits — insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew, DC resistance, alien crosstalk — at every test frequency for each Class. The field tester loads the appropriate Class profile and tests against those limits.',
      'TIA TSB-184-A.',
      'IEEE 802.3bt.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50173-1 / ISO/IEC 11801-1 / ANSI/TIA-568.2-E specify the Class limits at every test frequency. BS 7671 §716.523.1.101 references back to BS EN 50173-1 for the design-current limit but does NOT republish the per-frequency Class tables. The field tester (Fluke DSX, Viavi, etc.) loads the relevant Class profile and computes PASS / FAIL against those limits, with margin. TIA TSB-184-A covers PoE bundle de-rating; IEEE 802.3bt is the PoE protocol standard — neither defines the cabling Class limits.',
  },
  {
    id: 8,
    question:
      'Why is "DC resistance unbalance" a critical PoE-era parameter that pre-PoE Cat5e installations rarely measured?',
    options: [
      'It only matters in fibre.',
      'PoE delivers DC power across one or more pairs, with the centre-tap of each pair carrying the supply / return. If the two conductors of a pair have different DC resistance (for example because the manufacturer used slightly different copper purity in the strands, or because the termination has different contact resistances), unequal current flows in the two halves and the imbalance shows up as common-mode voltage at the receiver — eroding CMRR. TIA-568.2-E and TSB-184-A added DC resistance unbalance as a tested parameter precisely because of PoE.',
      'It is the same as insertion loss.',
      'It is irrelevant in modern cable.',
    ],
    correctAnswer: 1,
    explanation:
      'PoE relies on the centre-tap of each pair being DC-balanced — supply and return current divide equally between the two conductors of each pair. If the two halves have unequal DC resistance, current divides unequally; the imbalance creates a common-mode voltage at the receiver and erodes the receiver\u2019s common-mode rejection. TIA-568.2-E and TIA TSB-184-A added DC resistance and DC resistance unbalance as tested channel parameters because of PoE. Pre-PoE Cat5e installs rarely measured these — they came from voice / data testing where DC was negligible. Modern field testers measure both as standard.',
  },
  {
    id: 9,
    question:
      'A 90 m Cat6A permanent link tests with 1.2 dB return loss margin and 0.8 dB ACR-F margin at 500 MHz. Both pass. Should you be comfortable handing it over?',
    options: [
      'Yes — anything that passes is fine.',
      'Concerned. Marginal pass at the upper bandwidth limit usually indicates a workmanship issue — over-stripped jacket exposing too much untwisted pair at the IDC, sharp bend close to the connector, an inconsistent crimp. Margins of < 2 dB at the highest test frequency tend to drift toward fail with temperature, age, or load. The professional move is to pull the worst connector, re-terminate, and retest before handover; long-term reliability requires margin, not bare pass.',
      'No — it should be re-pulled with new cable.',
      'Yes — return the patch lead.',
    ],
    correctAnswer: 1,
    explanation:
      'Channel certification is binary at handover (PASS / FAIL) but margin is the predictor of long-term reliability. A 1-2 dB margin at 500 MHz is technically a pass but is uncomfortable: cable temperature rise (PoE-driven or seasonal), connector aging, slight workmanship variability all eat margin. A re-termination of the marginal end takes 5 minutes and typically restores 4-6 dB. Hand over a cable with 1 dB margin and you will be back in 18 months when the link starts dropping intermittently under load. Margin is the unspoken third deliverable, behind PASS and the test report.',
  },
  {
    id: 10,
    question:
      'How does sustained Type 4 PoE++ in a 96-cable bundle affect the rated channel performance, and what does the standards framework say?',
    options: [
      'No effect — PoE is too small.',
      'Sustained DC current dissipates I\u00b2R as heat per conductor; in a 96-cable bundle the heat compounds because each loaded cable warms its neighbours; cable temperature rise increases insertion loss (\u00a7716.523.1.101 NOTE 1) and erodes alien-crosstalk margin (PSANEXT). The framework: BS 7671 \u00a7716.523.2.101 hard caps current at 750 mA per conductor; \u00a7716.523.1.101 NOTE 2 references PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2 and ISO/IEC TS 29125 for bundle planning; TIA TSB-184-A gives the practical bundle de-rating curves.',
      'It improves performance because warm copper conducts better.',
      'PoE only flows in fibre.',
    ],
    correctAnswer: 1,
    explanation:
      'Bundle thermal effects compound with bundle size. Cable temperature rise raises insertion loss (NOTE 1) and erodes PSANEXT margin (the inter-cable alien-crosstalk parameter that 10GBASE-T cares about). The standards framework: \u00a7716.523.2.101 = 750 mA per conductor hard cap; \u00a7716.523.1.101 NOTE 2 = bundle-planning references (PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125). TIA TSB-184-A gives the practical de-rating curves used by designers. Practical responses: limit bundle size (typically 24-48 cables for Type 4 PoE), use 23 AWG / LP-rated cable, separate hot bundles from cold bundles, and consider screened constructions to restore alien-crosstalk margin.',
  },
];

const faqs = [
  {
    question:
      'Why does the Class limit on insertion loss rise with frequency? Surely we want LESS loss?',
    answer: (
      <>
        We do — but the LIMIT rises with frequency because the underlying physics makes attenuation
        rise with frequency too. Skin effect concentrates current near the conductor surface as
        frequency rises, raising effective resistance. Dielectric losses in the insulation also rise
        with frequency. So the Class limit (the maximum permissible insertion loss) increases with
        frequency, tracking what the cable physics can deliver. Class EA might allow 10 dB at 100
        MHz but 26 dB at 250 MHz and 35 dB at 500 MHz. The field tester checks the actual loss
        against the Class limit at every frequency point — a cable can pass at 100 MHz and fail at
        500 MHz on a marginal install.
      </>
    ),
  },
  {
    question: 'What is ACR-F and how does it differ from ACR-N?',
    answer: (
      <>
        <strong>ACR</strong> = Attenuation-to-Crosstalk Ratio — the difference between the signal
        you wanted (after attenuation) and the crosstalk you didn&apos;t (after coupling). Higher
        ACR = better. <strong>ACR-N</strong> (or NEXT-loss) is the near-end version — wanted signal
        vs near-end crosstalk. <strong>ACR-F</strong> (or ELFEXT, "equal-level FEXT") is the far-end
        version — wanted signal vs far-end crosstalk, normalised for attenuation. Both are derived
        parameters: the field tester measures insertion loss and crosstalk separately, then computes
        ACR. They appear in modern standards as the headline crosstalk margins because they capture
        the full signal-vs-noise picture.
      </>
    ),
  },
  {
    question: 'How does sustained PoE current actually affect the channel performance?',
    answer: (
      <>
        BS 7671:2018+A4:2026 §716.523.1.101 NOTE 1 states it directly:{' '}
        <em>
          &quot;Any temperature rise of the data cables due to the load current they carry, or other
          causes, will increase the attenuation/insertion loss of the cables. Thus the performance
          of information transmission channels can be degraded.&quot;
        </em>{' '}
        The chain is: PoE current → I²R conductor heating → bundle thermal compounding (every loaded
        cable warms its neighbours) → cable temperature rise → insertion loss rises (copper
        resistivity rises ~0.4 %/°C; dielectric losses rise too) → channel margin shrinks. NOTE 2
        then references PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2 and ISO/IEC TS 29125 for bundle
        planning. The hard regulatory ceiling is §716.523.2.101 = 750 mA per conductor.
      </>
    ),
  },
  {
    question: 'Where do the per-frequency Class limits actually come from?',
    answer: (
      <>
        BS EN 50173-1 (and the parallel ISO/IEC 11801-1 and ANSI/TIA-568.2-E) specify the
        per-frequency parameter limits for each Class — insertion loss, NEXT, PSNEXT, ACR-F, return
        loss, propagation delay, delay skew, DC resistance, alien crosstalk. The field tester (Fluke
        DSX, Viavi, AEM, etc.) loads the Class profile and computes PASS / FAIL with margin against
        those limits at every frequency point. BS 7671 §716.523.1.101 references back to BS EN
        50173-1 for the design-current limit but does NOT republish the per-frequency Class tables —
        they live in the cabling-performance standards.
      </>
    ),
  },
  {
    question: 'Why does 1000BASE-T need only 100 MHz cable when it carries 1 Gbps?',
    answer: (
      <>
        Because of clever encoding and parallel transmission. 1000BASE-T uses 4 pairs
        simultaneously, full-duplex on each (signals travel in both directions on every pair at the
        same time), with PAM-5 line coding at 125 Mbaud per pair. The maths: 4 pairs × 125 Mbaud × 2
        (full duplex) × ~2 bits-per-baud effective → ~1 Gbps useful throughput. The spectrum needed
        to carry 125 Mbaud PAM-5 fits within ~100 MHz of cable bandwidth. 10GBASE-T (2006) does the
        same trick at 500 MHz with PAM-16. The cable bandwidth (100 / 250 / 500 / 600 / 1000 / 2000
        MHz) is the analogue spectrum the cable carries; the digital throughput is far higher
        because of encoding and parallel pairs.
      </>
    ),
  },
  {
    question: 'What is "delay skew" and why does it appear in the test report?',
    answer: (
      <>
        Delay skew is the difference in propagation delay between the four pairs of the cable,
        measured in nanoseconds across the channel length. Different pairs have slightly different
        physical lengths (because of the different twist rates) and different propagation velocities
        (because the dielectric varies slightly). The Class limit is around 50 ns per 100 m.
        1000BASE-T and 10GBASE-T transmit on all four pairs simultaneously and re-align them at the
        receiver; if delay skew is excessive, the receiver alignment window is exceeded and bit
        errors result. The fix is the cable design itself — quality manufacturers tune dielectric
        and twist rates to keep delay skew well within limit.
      </>
    ),
  },
];

const DataCablingModule2Section3 = () => {
  const navigate = useNavigate();

  useSEO(
    'Performance Ratings and Bandwidth Limits | Data Cabling Module 2.3 | Elec-Mate',
    'How balanced cabling channels are tested — frequency response, insertion loss, NEXT / PSNEXT / PSANEXT, ACR-F, return loss, propagation delay and delay skew — and how PoE current affects channel performance under BS 7671:2018+A4:2026 §716.523.1.101.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3"
            title="Performance Ratings and Bandwidth Limits"
            description="The actual numbers behind a Class certification — frequency response, insertion loss, NEXT / PSNEXT / PSANEXT, ACR-F, return loss, propagation delay and delay skew — and how sustained PoE current affects rated channel performance under BS 7671:2018+A4:2026 §716.523.1.101."
            tone="yellow"
          />

          <TLDR
            points={[
              'A channel test isn\u2019t one number — it\u2019s a per-frequency battery of measurements: insertion loss (signal attenuation), NEXT / PSNEXT (intra-cable crosstalk), PSANEXT (alien crosstalk between cables), ACR-F (far-end signal-to-noise), return loss (impedance match), propagation delay, delay skew, and DC resistance. The Class profile (D / E / EA / F / FA / I / II) sets the limit at every frequency.',
              'Bandwidth (100 / 250 / 500 / 600 / 1000 / 2000 MHz) is the analogue spectrum the cable carries. Digital throughput is far higher — 1000BASE-T fits 1 Gbps inside 100 MHz Cat5e using 4 pairs + PAM-5 + full duplex; 10GBASE-T fits 10 Gbps inside 500 MHz Cat6A using PAM-16; 25/40GBASE-T fits 25/40 Gbps inside 2000 MHz Cat8 at 30 m.',
              'BS 7671:2018+A4:2026 §716.523.1.101 NOTE 1 is the explicit link from PoE current to channel performance: temperature rise from sustained DC current raises insertion loss and degrades the channel. The hard regulatory ceiling is §716.523.2.101 = 750 mA per conductor.',
              'The numerical Class limits live in BS EN 50173-1 / ISO/IEC 11801-1 / ANSI/TIA-568.2-E — not in BS 7671. BS 7671 §716.523.1.101 references back to BS EN 50173-1 for the design-current limit. Field testers (TIA-1152-A / BS EN 50346) load the Class profile and compute PASS / FAIL with margin against those limits.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define insertion loss, NEXT, PSNEXT, PSANEXT, ACR-F, return loss, propagation delay, delay skew and DC resistance — and explain the physical phenomenon each one captures',
              'Distinguish between per-pair NEXT and power-sum PSNEXT, and explain why 1000BASE-T / 10GBASE-T need PSNEXT margin (not just NEXT margin) because they use all four pairs simultaneously',
              "Recognise PSANEXT (alien crosstalk between adjacent cables) as the Cat6A-and-above parameter that's eroded by hot PoE bundles, and link it to the case for shielded constructions in dense PoE deployments",
              'State the relationship between cable bandwidth and Ethernet throughput — and explain how clever line coding (PAM-5 in 1000BASE-T, PAM-16 in 10GBASE-T) plus parallel pair use plus full duplex deliver high digital rates over modest analogue spectrum',
              'Quote BS 7671:2018+A4:2026 §716.523.1.101 NOTE 1 verbatim — temperature rise from PoE current raises insertion loss and degrades channel performance — and link it to the §716.523.2.101 hard 750 mA per-conductor cap',
              'Recall that the per-frequency numerical Class limits live in BS EN 50173-1 / ISO/IEC 11801-1 / ANSI/TIA-568.2-E, not in BS 7671 — and identify TIA-1152-A / BS EN 50346 as the field-test methodology',
              'Read a Class EA channel certification report fluently — recognise PASS / FAIL margin at each frequency, identify marginal-pass workmanship issues, and judge whether a link is suitable for handover',
              'Apply the bundle-thermal framework (TIA TSB-184-A, PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125) to a sustained PoE deployment and estimate the impact on rated channel performance',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The parameters a field tester actually measures</ContentEyebrow>

          <ConceptBlock
            title="Insertion loss, NEXT, PSNEXT, PSANEXT, ACR-F, return loss, delay, delay skew, DC resistance — at every test frequency"
            plainEnglish={`A Class certification test isn\u2019t one number. It\u2019s a per-frequency battery of measurements that paint the full picture of channel performance. The field tester sweeps through every test frequency from 1 MHz up to the Class\u2019s upper limit (100 MHz for Class D, 500 MHz for Class EA, 2000 MHz for Class I/II), measuring each parameter, and computes PASS / FAIL with margin against the BS EN 50173-1 / ISO/IEC 11801-1 / TIA-568.2-E Class limits.`}
            onSite={`Modern field testers (Fluke DSX, Viavi T-BERD, AEM TestPro, etc.) are TIA-1152-A Level III, IIIe, IV or V instruments. The handover deliverable is a digital file (typically .flw or .lin) that contains every parameter at every frequency for every link. The headline result is PASS or FAIL; underneath it is the margin chart that tells you how comfortable the result is. A "marginal pass" with 1\u20132 dB headroom at the top frequency is a workmanship hint, not a celebration.`}
          >
            <p>The parameters in the order a field tester typically reports them:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Wire-map.</strong> Are all 8 conductors connected end-to-end correctly, in
                the right pin-pair groupings? A failed wire-map terminates testing — fix first.
              </li>
              <li>
                <strong>Length.</strong> Time-domain measurement of cable length per pair
                (separately, because pairs have slightly different physical lengths). Used to check
                the 90 m permanent link / 100 m channel rule.
              </li>
              <li>
                <strong>Insertion loss (attenuation).</strong> dB loss of the wanted signal at each
                test frequency. Rises with frequency, length, temperature. Class limit is a sloped
                curve up to the bandwidth ceiling.
              </li>
              <li>
                <strong>NEXT (near-end crosstalk).</strong> Worst pair-to-pair coupling at the near
                end. Reported in dB; HIGHER dB = LESS coupling = better.
              </li>
              <li>
                <strong>PSNEXT (power-sum NEXT).</strong> Total summed disturbance from all OTHER
                pairs into the pair under test. The parameter that 1000BASE-T / 10GBASE-T actually
                care about, because they use all four pairs simultaneously.
              </li>
              <li>
                <strong>PSANEXT (power-sum alien NEXT).</strong> Coupling from ADJACENT cables in
                the bundle. Cat6A-and-above only. Erodes in hot PoE bundles — the case for shielded
                variants in dense deployments.
              </li>
              <li>
                <strong>ACR-F (attenuation-to-crosstalk ratio, far end).</strong> Wanted signal vs
                far-end crosstalk, normalised for attenuation. Headline far-end SNR margin.
              </li>
              <li>
                <strong>Return loss.</strong> Impedance match. dB ratio of forward-to-reflected.
                HIGHER = better. Marginal return loss = workmanship issue.
              </li>
              <li>
                <strong>Propagation delay.</strong> Time for the signal to traverse the channel, ns
                per pair. Class limit is around 555 ns at 100 MHz over 100 m.
              </li>
              <li>
                <strong>Delay skew.</strong> Time difference between fastest and slowest pair. Class
                limit ~50 ns / 100 m. Critical for 1000BASE-T / 10GBASE-T which align all four pairs
                at the receiver.
              </li>
              <li>
                <strong>DC resistance + DC resistance unbalance.</strong> Ohms per conductor and
                difference between the two halves of each pair. Critical for PoE — added to
                TIA-568.2-E specifically because of PoE current sharing.
              </li>
            </ul>
          </ConceptBlock>

          {/* Test parameters diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Insertion loss vs frequency — Class limits and where Categories actually live
            </h4>
            <svg
              viewBox="0 0 940 600"
              className="w-full h-auto"
              role="img"
              aria-label="A line graph of insertion loss in decibels against frequency in megahertz on a logarithmic axis. Four upward-sloping curves are shown for Class D (Cat5e) ending at 100 megahertz, Class E (Cat6) ending at 250 megahertz, Class EA (Cat6A) ending at 500 megahertz, and Class I (Cat8.1) ending at 2000 megahertz. Each curve marks the Class insertion-loss limit. A legend at the bottom maps the curve colours to Class names."
            >
              {/* ===== Y-axis title (above the axis, dedicated row) ===== */}
              <text
                x="80"
                y="32"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Insertion loss (dB) — higher = more attenuation
              </text>

              {/* Axes — plot area: x 100→880, y 60→360 */}
              <line x1="100" y1="60" x2="100" y2="360" stroke="#9CA3AF" strokeWidth="1.4" />
              <line x1="100" y1="360" x2="880" y2="360" stroke="#9CA3AF" strokeWidth="1.4" />

              {/* Y-axis tick labels — placed in dedicated column LEFT of axis */}
              <text
                x="92"
                y="84"
                textAnchor="end"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                40
              </text>
              <text
                x="92"
                y="144"
                textAnchor="end"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                30
              </text>
              <text
                x="92"
                y="204"
                textAnchor="end"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                20
              </text>
              <text
                x="92"
                y="264"
                textAnchor="end"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                10
              </text>
              <text
                x="92"
                y="364"
                textAnchor="end"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                0
              </text>

              {/* Faint horizontal gridlines */}
              <line
                x1="100"
                y1="80"
                x2="880"
                y2="80"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
              <line
                x1="100"
                y1="140"
                x2="880"
                y2="140"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
              <line
                x1="100"
                y1="200"
                x2="880"
                y2="200"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
              <line
                x1="100"
                y1="260"
                x2="880"
                y2="260"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />

              {/* X-axis tick marks (small) */}
              <line x1="160" y1="360" x2="160" y2="366" stroke="#6B7280" strokeWidth="1" />
              <line x1="320" y1="360" x2="320" y2="366" stroke="#6B7280" strokeWidth="1" />
              <line x1="480" y1="360" x2="480" y2="366" stroke="#6B7280" strokeWidth="1" />
              <line x1="640" y1="360" x2="640" y2="366" stroke="#6B7280" strokeWidth="1" />
              <line x1="840" y1="360" x2="840" y2="366" stroke="#6B7280" strokeWidth="1" />

              {/* X-axis tick labels — dedicated row BELOW the axis */}
              <text
                x="160"
                y="380"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                1
              </text>
              <text
                x="320"
                y="380"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                100
              </text>
              <text
                x="480"
                y="380"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                250
              </text>
              <text
                x="640"
                y="380"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                500
              </text>
              <text
                x="840"
                y="380"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                2000
              </text>

              {/* X-axis title — separate row below ticks */}
              <text
                x="490"
                y="406"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Frequency (MHz, log scale)
              </text>

              {/* ===== Class curves — each starts at (160, 350) and rises to its top frequency ===== */}
              {/* Class D ends at 100 MHz (x=320), ~24 dB at 100 MHz (y~216) */}
              <path
                d="M 160 352 Q 240 320, 320 216"
                fill="none"
                stroke="#A855F7"
                strokeWidth="2.2"
              />
              <circle cx="320" cy="216" r="5" fill="#A855F7" />

              {/* Class E ends at 250 MHz (x=480), ~36 dB at 250 MHz (y~144) */}
              <path
                d="M 160 352 Q 280 304, 480 144"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.2"
              />
              <circle cx="480" cy="144" r="5" fill="#3B82F6" />

              {/* Class EA ends at 500 MHz (x=640), ~36 dB at 500 MHz (y~144) — emphasised */}
              <path
                d="M 160 352 Q 320 296, 640 144"
                fill="none"
                stroke="#EAB308"
                strokeWidth="2.8"
              />
              <circle cx="640" cy="144" r="6" fill="#EAB308" />

              {/* Class I/II ends at 2000 MHz (x=840), ~24 dB at 2000 MHz (30 m only — y~216) */}
              <path
                d="M 160 352 Q 400 280, 840 216"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2.2"
              />
              <circle cx="840" cy="216" r="5" fill="#22C55E" />

              {/* ===== Curve end-point labels — dedicated row to the RIGHT of plot, aligned at x=880-900 */}
              {/* Each label sits in a clear column outside the plot area and is connected by a tiny dash */}
              <line
                x1="320"
                y1="216"
                x2="380"
                y2="446"
                stroke="#A855F7"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <line
                x1="480"
                y1="144"
                x2="560"
                y2="446"
                stroke="#3B82F6"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <line
                x1="640"
                y1="144"
                x2="700"
                y2="446"
                stroke="#EAB308"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <line
                x1="840"
                y1="216"
                x2="840"
                y2="446"
                stroke="#22C55E"
                strokeWidth="1"
                strokeDasharray="2 3"
              />

              {/* Endpoint badges (BELOW plot, dedicated label row at y=446) */}
              <rect
                x="334"
                y="436"
                width="92"
                height="22"
                rx="4"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="380"
                y="451"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class D · 100 MHz
              </text>

              <rect
                x="514"
                y="436"
                width="92"
                height="22"
                rx="4"
                fill="rgba(59,130,246,0.18)"
                stroke="#3B82F6"
                strokeWidth="1.4"
              />
              <text
                x="560"
                y="451"
                textAnchor="middle"
                fill="#BFDBFE"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class E · 250 MHz
              </text>

              <rect
                x="650"
                y="436"
                width="100"
                height="22"
                rx="4"
                fill="rgba(234,179,8,0.22)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="700"
                y="451"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class EA · 500 MHz
              </text>

              <rect
                x="790"
                y="436"
                width="100"
                height="22"
                rx="4"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="840"
                y="451"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class I/II · 2000 MHz
              </text>

              {/* ===== Legend panel — dedicated rect at bottom ===== */}
              <rect
                x="100"
                y="490"
                width="780"
                height="100"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="120"
                y="514"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Two-row legend, two columns */}
              <line x1="120" y1="540" x2="148" y2="540" stroke="#A855F7" strokeWidth="2.2" />
              <text x="158" y="544" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Class D (Cat5e)
              </text>

              <line x1="320" y1="540" x2="348" y2="540" stroke="#3B82F6" strokeWidth="2.2" />
              <text x="358" y="544" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Class E (Cat6)
              </text>

              <line x1="520" y1="540" x2="548" y2="540" stroke="#EAB308" strokeWidth="2.8" />
              <text
                x="558"
                y="544"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class EA (Cat6A) — 2026 default
              </text>

              <line x1="120" y1="568" x2="148" y2="568" stroke="#22C55E" strokeWidth="2.2" />
              <text x="158" y="572" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Class I / II (Cat8.1 / 8.2 — 30 m max)
              </text>

              <text x="358" y="572" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Curves indicate Class insertion-loss limits — actual cable performance must stay
                below the line.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="ANSI/TIA-568.2-E (2024) · Channel and permanent-link transmission performance — paraphrased"
            clause={
              <>
                Balanced twisted-pair cabling channel performance shall be verified by measurement
                of insertion loss, NEXT, PSNEXT, ACR-F, PSACR-F, return loss, propagation delay,
                delay skew, DC resistance and DC resistance unbalance, and (for Cat6A and above)
                PSANEXT and PSAACR-F, against the per-frequency limits specified for the relevant
                Category. Field test instruments shall comply with ANSI/TIA-1152-A Level III, IIIe,
                IV or V depending on the Category being verified.
              </>
            }
            meaning="The Class certification at handover is a per-parameter, per-frequency PASS / FAIL chart. The contractor's deliverable is the digital test file. A bare 'PASS' summary is not enough — the margin at the top test frequency is the predictor of long-term reliability. BS EN 50346 is the equivalent EN test methodology."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Crosstalk: NEXT, PSNEXT, ACR-F, PSANEXT</ContentEyebrow>

          <ConceptBlock
            title="The full crosstalk family — and why Cat6A added an alien-crosstalk parameter"
            plainEnglish="Crosstalk is unwanted coupling from one signal path into another. In balanced cabling there are two flavours that matter: INTRA-cable (between pairs of the same cable) and INTER-cable (between adjacent cables in a bundle, called alien crosstalk). The full set of parameters tracks worst-case, summed, near-end and far-end versions of each."
            onSite={`The order of operations when reading a fail report is: wire-map first (is the cable basically connected?). Insertion loss next (is the cable too long, too lossy, too hot?). Then crosstalk family: NEXT, PSNEXT, ACR-F, return loss. For Cat6A and above, also PSANEXT and PSAACR-F. The parameter that fails first tells you where the workmanship issue is. Untwisted-pair length too long at the IDC \u2192 NEXT and return loss fail. Cables tied tight in a bundle parallel to other 10G cables \u2192 PSANEXT margin shrinks.`}
          >
            <p>The crosstalk family in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>NEXT (near-end crosstalk).</strong> Worst pair-to-pair coupling measured AT
                THE SAME END as the disturbing transmitter. The classical crosstalk metric. Reported
                in dB; HIGHER = better (less coupling).
              </li>
              <li>
                <strong>PSNEXT (power-sum NEXT).</strong> Total summed coupling from all OTHER pairs
                into the pair under test. The parameter that 1000BASE-T / 10GBASE-T need because
                they use all four pairs simultaneously and each pair sees combined disturbance from
                all three of its neighbours.
              </li>
              <li>
                <strong>FEXT (far-end crosstalk) → ACR-F.</strong> Coupling at the OPPOSITE end from
                the disturbing transmitter. Modern standards report ACR-F (attenuation-to- crosstalk
                ratio, far end) which normalises FEXT for the channel attenuation — gives the
                headline far-end SNR margin.
              </li>
              <li>
                <strong>PSACR-F.</strong> Power-sum version of ACR-F.
              </li>
              <li>
                <strong>PSANEXT (power-sum alien NEXT).</strong> Coupling from ADJACENT CABLES in
                the bundle into the pair under test. Cat6A-and-above only — Cat6A is the first
                Category to specify alien crosstalk, because 10GBASE-T was the first Ethernet to be
                sensitive to it.
              </li>
              <li>
                <strong>PSAACR-F (power-sum alien ACR-F).</strong> Far-end alien crosstalk SNR. The
                alien-crosstalk twin of PSACR-F.
              </li>
            </ul>
            <p>
              Why does Cat6A care about alien crosstalk and earlier Categories don&apos;t? At
              10GBASE-T speeds and Cat6A bandwidth, the receiver&apos;s margin against inter-cable
              coupling is small enough that adjacent cables in a bundle can measurably erode the
              channel. The Cat6A specification adds PSANEXT and PSAACR-F as tested parameters; the
              cable construction (separators, conductor geometry, possible foils) is engineered
              around them. Hot PoE bundles compound the problem — temperature rise erodes
              alien-crosstalk margin first.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            How PoE current actually affects rated channel performance
          </ContentEyebrow>

          <ConceptBlock
            title="The §716.523.1.101 NOTE is the explicit link from PoE current to insertion loss"
            plainEnglish={`BS 7671:2018+A4:2026 \u00a7716.523.1.101 sets the design-current rule by reference to BS EN 50173-1, and its NOTE 1 spells out exactly why: sustained current heats the cable, raised cable temperature increases insertion loss, raised insertion loss erodes channel margin. The hard regulatory ceiling is \u00a7716.523.2.101 = 750 mA per conductor. The bundle planning references in NOTE 2 (PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125) give the practical de-rating model.`}
            onSite={`On a sustained Type 4 PoE++ deployment in a dense bundle, the chain of reasoning is: per-conductor current under load \u2192 I\u00b2R conductor heating per cable \u2192 bundle thermal compounding (every loaded cable warms its neighbours) \u2192 cable temperature rise (often 10\u201320 \u00b0C above ambient in tight bundles) \u2192 copper resistivity rises ~0.4 % per \u00b0C, dielectric losses rise too \u2192 insertion loss climbs at every frequency \u2192 channel margin shrinks. PSANEXT margin shrinks too. The practical responses: limit bundle size (typically 24\u201348 cables for sustained Type 4), use 23 AWG / LP-rated cable, separate hot bundles from cold ones, consider screened constructions to restore alien-crosstalk margin, never exceed the \u00a7716.523.2.101 750 mA hard cap.`}
          >
            <p>The full PoE-vs-channel-performance picture:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Per-conductor current.</strong> IEEE 802.3bt Type 4 PSE = 90 W max, PD =
                71.3 W max, delivered over 4 pairs. Worst-case per-conductor steady-state current is
                around 300-650 mA depending on cable loop resistance and PSE / PD voltage — always
                &lt; the 750 mA BS 7671 §716.523.2.101 hard cap.
              </li>
              <li>
                <strong>I²R heating.</strong> Each conductor dissipates I²R as heat. For a Cat6A 23
                AWG conductor at 500 mA, that&apos;s a small but continuous heat input per metre of
                cable.
              </li>
              <li>
                <strong>Bundle thermal compounding.</strong> In a tight bundle, each loaded cable
                warms its neighbours. The centre of a 96-cable bundle can sit 15-25 °C above ambient
                under sustained Type 4 load if the bundle is tight, in still air, and away from cool
                airflow.
              </li>
              <li>
                <strong>Resistance and dielectric loss rise.</strong> Copper resistivity rises ~0.4
                %/°C. Dielectric losses in the insulation rise non-linearly with temperature too.
                Both raise insertion loss.
              </li>
              <li>
                <strong>Channel parameters degrade.</strong> Insertion loss climbs at every
                frequency. ACR-F margin shrinks. PSANEXT margin shrinks (alien-crosstalk limits move
                closer to the measured value). Marginal channels can drop link under thermal load.
              </li>
              <li>
                <strong>Standards-based responses.</strong> §716.523.2.101 caps current at 750 mA
                per conductor; §716.523.1.101 NOTE 2 references PD CLC/TR 50174-99-1 + BS ISO/IEC
                14763-2 + ISO/IEC TS 29125 for bundle planning; TIA TSB-184-A gives the practical
                bundle de-rating curves; LP-rated (limited-power) cables address the thermal spec;
                23 AWG cable carries less heat per amp than 24 AWG; screened constructions restore
                alien-crosstalk margin.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.523.1.101 (Conductor design current — verbatim)"
            clause={
              <>
                The design current in any conductor shall not exceed the limit specified in BS EN
                50173-1. NOTE 1: Any temperature rise of the data cables due to the load current
                they carry, or other causes, will increase the attenuation/insertion loss of the
                cables. Thus the performance of information transmission channels can be degraded.
                NOTE 2: Guidance on the effect of the number of loaded conductors, in a multi-cable
                bundle, on the temperature rise of the cables is given in PD CLC/TR 50174-99-1:2015
                and requirements and recommendations in relation to planning and installation of
                such cable bundles are provided in BS ISO/IEC 14763-2 and ISO/IEC TS 29125.
              </>
            }
            meaning="The clause is the explicit regulatory link from PoE current to channel performance. It confirms the physics — current causes heating, heating raises insertion loss, raised insertion loss degrades the channel — and points the designer at the bundle-planning standards. Read alongside §716.523.2.101 (= 750 mA per conductor hard cap) it defines the regulatory envelope for any sustained-PoE deployment from 15 April 2026."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading a Class EA test report</ContentEyebrow>

          <ConceptBlock
            title="PASS / FAIL is binary — but margin is the predictor of long-term reliability"
            plainEnglish={`A Class certification test reports PASS or FAIL at handover, but the same test reports the MARGIN against the limit at every frequency for every parameter. Margin is the difference between the measured value and the Class limit; positive = pass, negative = fail. Comfortable margin (typically \u2265 4 dB at the top test frequency) means the channel will survive temperature rise, ageing, and minor workmanship variation. Marginal margin (1\u20132 dB) is technically a pass but is a workmanship hint \u2014 typically over-stripped jacket, untwisted-pair length too long inside the connector, an asymmetric crimp, or a sharp bend close to the termination.`}
            onSite={`Practical handover discipline: run the channel test for every link with the appropriate Class profile loaded; export the digital test file (.flw / .lin / .ldf depending on tester); review every link for margin at the top test frequency before signing off. If the worst link is < 2 dB margin at 500 MHz on a Class EA channel, pull the worst connector, re-terminate, retest. The 5\u201310 minutes of re-termination per link is much cheaper than the 18-month support call.`}
          >
            <p>What to look for in a Class EA channel report:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Wire-map.</strong> Pass = all 8 conductors in correct pin-pair groupings.
                Fail = re-terminate, retest.
              </li>
              <li>
                <strong>Length.</strong> Permanent link ≤ 90 m, channel ≤ 100 m. Class limits are
                stated for these lengths; testing a 110 m link with Class EA limits is guaranteed to
                fail on insertion loss.
              </li>
              <li>
                <strong>Insertion loss.</strong> Margin should be comfortably positive across the
                whole frequency range. A drop in margin at the top frequency relative to lower
                frequencies indicates the cable is at its bandwidth limit — likely a length or
                temperature issue.
              </li>
              <li>
                <strong>NEXT and PSNEXT.</strong> Worst-case pair and summed disturbance. A fail on
                NEXT but pass on PSNEXT is rare; the more common pattern is a marginal pass on both
                indicating workmanship (over-untwist at IDC).
              </li>
              <li>
                <strong>ACR-F / PSACR-F.</strong> Far-end SNR margin. Sensitive to cable
                construction quality and to bundle coupling.
              </li>
              <li>
                <strong>PSANEXT / PSAACR-F.</strong> Cat6A-and-above only. Sensitive to bundle
                density and to PoE thermal load. Marginal results here often indicate bundles are
                too tight for the PoE load.
              </li>
              <li>
                <strong>Return loss.</strong> Impedance match. Marginal results here are almost
                always workmanship — sharp bend, rough crimp, mismatched patch lead.
              </li>
              <li>
                <strong>Propagation delay + delay skew.</strong> Delay should match length; delay
                skew should be well under 50 ns / 100 m. Delay-skew issues are usually cable-quality
                issues, not workmanship.
              </li>
              <li>
                <strong>DC resistance + DC resistance unbalance.</strong> Critical for PoE. High DC
                resistance unbalance is a workmanship issue — different contact pressure between the
                two halves of the same pair at the IDC.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Class EA / Cat6A channel parameters — what each measures and where it matters most"
            source="BS EN 50173-1 · ISO/IEC 11801-1 · ANSI/TIA-568.2-E"
            headers={['Parameter', 'What it measures', 'Sensitive to', 'Why it matters']}
            rows={[
              [
                'Insertion loss',
                'Signal attenuation per frequency',
                'Length, temperature, frequency',
                'Receiver decoding margin',
              ],
              [
                'NEXT',
                'Worst pair-to-pair coupling at near end',
                'Untwisted-pair length at IDC, twist quality',
                'Crosstalk margin (older Ethernet)',
              ],
              [
                'PSNEXT',
                'Sum of all-pair coupling into target pair',
                'Pair geometry, balance',
                '1000BASE-T / 10GBASE-T crosstalk margin',
              ],
              [
                'ACR-F',
                'Far-end signal-to-crosstalk ratio',
                'Channel construction quality',
                'Headline far-end SNR',
              ],
              [
                'PSANEXT (Cat6A+)',
                'Alien crosstalk between adjacent cables',
                'Bundle density, PoE temperature, separators',
                '10GBASE-T inter-cable margin',
              ],
              [
                'Return loss',
                'Impedance match (forward / reflected ratio)',
                'Termination quality, bend radii, patch leads',
                'Echo / signal integrity',
              ],
              [
                'Propagation delay',
                'Time for signal to traverse channel',
                'Length, dielectric',
                '4-pair alignment at receiver',
              ],
              [
                'Delay skew',
                'Time difference between fastest and slowest pair',
                'Cable design (twist + dielectric)',
                '1000BASE-T / 10GBASE-T pair alignment',
              ],
              [
                'DC resistance unbalance',
                'Difference in DC R between two halves of pair',
                'Termination contact pressure',
                'PoE current sharing',
              ],
            ]}
            notes="Per-frequency numerical limits live in BS EN 50173-1 / ISO/IEC 11801-1 / TIA-568.2-E. BS 7671 §716.523.1.101 references back to BS EN 50173-1 for the design-current limit. Field testers (TIA-1152-A / BS EN 50346) load the Class profile and compute PASS / FAIL with margin against those limits."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <ConceptBlock
            title="What's new in BS 7671 A4:2026 for channel performance"
            plainEnglish="Amendment 4 (2026) does not republish the per-frequency Class limits — those live in BS EN 50173-1 — but \u00a7716 introduces the regulatory framework that ties cable performance to PoE current. \u00a7716.523.1.101 references BS EN 50173-1 for the design-current limit and its NOTE 1 spells out the temperature-vs-insertion-loss link. \u00a7716.523.2.101 sets the absolute hard cap of 750 mA per conductor. \u00a7716.526.101 sets the matching 750 mA per contact at the connecting hardware."
            onSite="On a UK PoE design from 15 April 2026, the channel-performance conversation is dual-layer: BS EN 50173-1 / TIA-568.2-E (does the channel meet the Class limits at every test frequency?) AND BS 7671 \u00a7716 (is the cable Category permitted? Is the design current within the per-conductor limit? Is the connecting hardware rated for 750 mA per contact?). Both layers must be answered."
          >
            <p>The three §716 clauses that bound channel performance under PoE:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§716.523.1.101 — design current limit.</strong>{' '}
                <AmendmentBadge regs={['716.523.1.101']} edition="A4:2026" /> Design current shall
                not exceed the BS EN 50173-1 limit. NOTE 1 = the explicit
                temperature-vs-insertion-loss link. NOTE 2 = bundle planning references (PD CLC/TR
                50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125).
              </li>
              <li>
                <strong>§716.523.2.101 — 750 mA per conductor hard cap.</strong>{' '}
                <AmendmentBadge regs={['716.523.2.101']} edition="A4:2026" /> The absolute
                regulatory ceiling. Per CONDUCTOR — not per pair, not per cable. The bundle thermal
                model in §716.523.1.101 NOTE 2 has to deliver compliance with this number under all
                foreseeable bundle / load conditions.
              </li>
              <li>
                <strong>§716.526.101 — 750 mA per contact at the connecting hardware.</strong>{' '}
                <AmendmentBadge regs={['716.526.101']} edition="A4:2026" /> The matching cap at the
                connector. Connectors must support 750 mA per contact continuously and (where
                disconnection under load is foreseen) meet BS EN 60512-9-3 endurance testing.
                Covered fully in M2S4.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Reporting 'PASS' on every link without checking margin at the top test frequency"
            whatHappens={
              <>
                The contractor runs a TIA-1152-A channel test on every link, exports the file,
                presents a one-page summary that says &quot;220/220 PASS&quot;. The client signs
                off. Fifteen months later, after the building loads up Type 4 PoE++ for ceiling APs
                and PoE lighting, intermittent link drops start happening on a handful of links.
                Investigation shows those links had &lt; 1 dB margin at 500 MHz from day one — a
                workmanship issue in termination that survived the static test but degrades under
                thermal load.
              </>
            }
            doInstead={
              <>
                At handover, review every link&apos;s margin at the top test frequency for the
                Class. For Class EA, that&apos;s 500 MHz. For Class I/II, 2000 MHz. Any link with
                &lt; 4 dB margin on insertion loss / NEXT / PSNEXT / ACR-F / return loss at the top
                frequency is a re-termination candidate. Pull the worst-end connector, re-terminate
                to BS EN 50174-2 / TIA-568.2-E practice (untwisted-pair length ≤ 13 mm at the IDC),
                retest. Hand over not just PASS but COMFORTABLE PASS — the file shows the margin and
                the auditor can see it.
              </>
            }
          />

          <Scenario
            title="A 96-cable PoE++ ceiling-AP bundle — how do you size the channel performance budget?"
            situation={
              <>
                An office refurb. 96 ceiling APs, each pulling Type 4 PoE++ continuously. 96 Cat6A
                cables in a single perforated tray bundle from the IDF to the ceiling grid, run in
                still air at typical office ambient. The build standard wants 10GBASE-T to every AP
                at handover and confirmed 5-year reliability.
              </>
            }
            whatToDo={
              <>
                Bundle thermal calc per TIA TSB-184-A: 96 cables × ~500 mA per conductor average
                load × bundle geometry → centre-of-bundle temperature rise estimated. Compare to BS
                7671 §716.523.2.101 hard cap of 750 mA per conductor — comfortable. Compare to cable
                manufacturer&apos;s LP rating and to PD CLC/TR 50174-99-1 thermal model — check
                insulation rating headroom. Decide on cable construction: U/UTP Cat6A will pass at
                handover but PSANEXT margin will erode under sustained thermal load; F/UTP Cat6A is
                more defensible. Decide on bundle subdivision: 96 cables in one bundle is at the
                limit; subdividing into 4 × 24 with separators between sub-bundles drops the
                centre-of-bundle temperature meaningfully. Channel certification at handover with
                margin review against the §716.523.1.101 NOTE 1 physics — every link reviewed for
                &gt; 4 dB margin at 500 MHz. Periodic spot re-tests at 6 / 12 months under live PoE
                load to confirm no margin drift.
              </>
            }
            whyItMatters={
              <>
                Class certification at handover is a static test. PoE thermal load is dynamic and
                ramps up after handover. The contractor who only certifies the cold cable hands over
                a project that may degrade after the building loads up. The professional discipline
                combines TIA TSB-184-A bundle thermal modelling, BS 7671 §716.523.1.101 / .2.101 /
                .526.101 regulatory compliance, comfortable margin at the top test frequency, and
                post-load spot retests. That is a 5-year reliability deliverable — not just a
                day-one PASS.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'A Class certification is a per-frequency, per-parameter PASS / FAIL — insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew, DC resistance + unbalance, and (Cat6A+) PSANEXT / PSAACR-F. Margin at the top test frequency is the predictor of long-term reliability.',
              'Bandwidth (100 / 250 / 500 / 600 / 1000 / 2000 MHz) is the analogue spectrum the cable carries. Ethernet throughput is far higher — 1 Gbps in 100 MHz, 10 Gbps in 500 MHz, 25/40 Gbps in 2000 MHz — via clever line coding (PAM-5 / PAM-16) plus parallel pairs plus full duplex.',
              'PSANEXT is the Cat6A-and-above alien-crosstalk parameter. It erodes in dense PoE bundles because temperature rises (§716.523.1.101 NOTE 1). Hot bundles + 10GBASE-T sensitivity = case for screened (F/UTP / U/FTP) construction.',
              'BS 7671:2018+A4:2026 §716.523.1.101 is the explicit link from PoE current → temperature rise → insertion loss → channel degradation. §716.523.2.101 caps current at 750 mA per conductor. §716.526.101 caps connecting hardware at 750 mA per contact.',
              'The numerical Class limits live in BS EN 50173-1 / ISO/IEC 11801-1 / ANSI/TIA-568.2-E. Field testers (TIA-1152-A / BS EN 50346) load the Class profile and compute PASS / FAIL with margin. Comfortable pass = margin ≥ 4 dB at the top test frequency.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-2-section-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Connectors and Patch Panels
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule2Section3;
