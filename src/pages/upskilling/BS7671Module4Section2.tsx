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
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm4s2-433-conditions',
    question:
      'Reg 433.1.1 sets three coordination conditions between an overload protective device and the cable it protects. Which option lists them correctly?',
    options: [
      'In ≥ Ib, In ≤ Iz, I₂ ≤ 1.45 Iz',
      'In ≥ Iz, Ib ≤ Iz, I₂ ≤ In',
      'Ib ≥ In, Iz ≤ In, I₂ ≥ 1.45 Iz',
      'Ib ≤ Iz, In ≥ 1.45 Iz, I₂ ≤ Ib',
    ],
    correctIndex: 0,
    explanation:
      'Reg 433.1.1: (a) In ≥ Ib — the protective device rating must not be less than the design current of the circuit; (b) In ≤ Iz — the device rating must not exceed the lowest current-carrying capacity of any conductor in the circuit; (c) I₂ ≤ 1.45 Iz — the current causing effective operation of the device must not exceed 1.45× the lowest CCC. I₂ is taken from the product standard or manufacturer.',
  },
  {
    id: 'm4s2-432-4-standards',
    question:
      'Section 432 names the product standards an overcurrent protective device must comply with. Which is NOT in the list?',
    options: [
      'BS 88 series (HRC fuses)',
      'BS EN 60898 (domestic MCBs)',
      'BS EN 61009-1 (RCBOs)',
      'BS EN 62606 (AFDDs)',
    ],
    correctIndex: 3,
    explanation:
      'Section 432 lists BS 88 series, BS 3036, BS EN 60898, BS EN 60947-2 and BS EN 61009-1. AFDDs (BS EN 62606) sit under Reg 421.1.7, not the overcurrent device list — they detect arc-fault energy patterns, not overcurrent magnitudes. Use of another device is permitted only where its time/current characteristics give protection at least equivalent to those listed.',
  },
  {
    id: 'm4s2-breaking-capacity',
    question:
      'A consumer unit position has a measured prospective fault current of 8 kA. The protective device chosen has Icn = 6 kA. What does BS 7671 require?',
    options: [
      'Use the device anyway — Icn is advisory',
      'Reject the device. Either choose one with Icn ≥ 8 kA, or apply Reg 536.5 (back-up) back-up coordination so the upstream device limits the let-through energy',
      'Derate the cable to suit the smaller device',
      'Use two devices of Icn = 6 kA in parallel',
    ],
    correctIndex: 1,
    explanation:
      'Reg 432 / 434.5.1 require the device to be capable of breaking the maximum prospective fault current at its installation point. Where the device Icn is below the prospective fault current, Reg 536.5 (back-up) permits back-up: an upstream device with sufficient breaking capacity that limits the energy the downstream device must interrupt. Documented manufacturer back-up tables / declaration is needed.',
  },
  {
    id: 'm4s2-conventional-time',
    question:
      "Appendix 3 figures 3A4 / 3A5 / 3A6 show MCB time-current curves with a horizontal band labelled 'conventional time'. What does that band actually mean?",
    options: [
      'The time the device takes to detect a short-circuit',
      'The standardised observation period (1 hour for In ≤ 63 A, 2 hours above) within which an overload device must operate at I₂ — used for type-testing per BS EN 60898',
      'The factory ageing time before delivery',
      'The minimum disconnection time for ADS',
    ],
    correctIndex: 1,
    explanation:
      "The 'conventional time' is the type-test observation period defined by the product standard (BS EN 60898 for MCBs, BS HD 60269 series for fuses). I₂ is the current that causes effective device operation WITHIN that conventional time. For MCBs ≤ 63 A it's 1 hour; > 63 A it's 2 hours. This is what Reg 433.1.1(c) latches onto — the device must operate within the cable's thermal endurance window.",
  },
  {
    id: 'm4s2-pscc-measurement',
    question:
      'Where do you get the PSCC value to compare against device Icn for a domestic property?',
    options: [
      'It is always 16 kA at every UK consumer unit',
      'Read it from the MCB type label',
      'Either request the maximum prospective short-circuit current from the DNO, or measure PSCC at the cut-out using a dedicated PSCC tester (most loop-tester instruments measure this)',
      'Calculate from the cable length only',
    ],
    correctIndex: 2,
    explanation:
      'Two standard routes — the DNO will quote a maximum value (typically 16 kA at the cut-out for an LV public network), and a PSCC measurement at the cut-out using a calibrated tester gives the actual prospective value at that property. Use the higher of the two as your design value for the protective device Icn comparison (Reg 434.5.1).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 10 mm² T&E cable is installed Reference Method C with Iz = 47 A. You want to protect it on a 32 A Type B MCB. Which Reg 433.1.1 condition is the binding constraint?',
    options: [
      '(a) In ≥ Ib — rated current must cover the design current',
      '(b) In ≤ Iz — rated current must not exceed cable CCC',
      '(c) I₂ ≤ 1.45 Iz — operating current must stay within cable thermal limit',
      'None — Reg 433.1.1 is satisfied by all three conditions in this scenario',
    ],
    correctAnswer: 3,
    explanation:
      'Iz = 47 A. In = 32 A. With Type B MCB, I₂ at the BS EN 60898 conventional operating current is 1.45 × In = 46.4 A. Therefore: In ≥ Ib (provided design current ≤ 32 A), In (32) ≤ Iz (47) ✓, I₂ (46.4) ≤ 1.45 Iz (68.15) ✓. All three satisfied.',
  },
  {
    id: 2,
    question:
      'Which BS EN standard governs the time/current characteristic of a domestic Type B circuit-breaker?',
    options: ['BS 88-3', 'BS EN 60898', 'BS EN 60947-2', 'BS 3036'],
    correctAnswer: 1,
    explanation:
      'BS EN 60898 covers circuit-breakers for household and similar fixed installations (Type B / C / D characteristics, Figures 3A4, 3A5, 3A6 in App 3 of BS 7671). BS 88-3 covers domestic / commercial cartridge fuses; BS EN 60947-2 covers industrial circuit-breakers (e.g. MCCBs, ACBs); BS 3036 covers semi-enclosed (rewireable) fuses.',
  },
  {
    id: 3,
    question:
      'Where BS 3036 semi-enclosed fuses provide overload protection, BS 7671 imposes a stricter relationship between In and Iz. What is it (App 4 / Note 1 to Reg 433.1.1)?',
    options: ['In ≤ 0.725 Iz', 'In ≤ Iz (no derate)', 'In ≤ 0.5 Iz', 'In ≤ 1.45 Iz'],
    correctAnswer: 0,
    explanation:
      'BS 3036 fuses have a fusing factor of about 2 (operate at twice rated within conventional time), versus ~1.45 for BS EN 60898 MCBs. To keep I₂ ≤ 1.45 Iz, the In must be derated to ≤ 0.725 Iz (i.e. cable CCC × 0.725). This is in NOTE 1 to Reg 433.1.1 and the rating-factor tables in Appendix 4.',
  },
  {
    id: 4,
    question:
      'A 50 kW three-phase induction motor is being installed. Standard practice is to fit a Type C or Type D MCB rather than Type B. Why?',
    options: [
      'Type B is not certified for three-phase use',
      'Direct-on-line motor starting current can be 6–8× FLC; a Type B MCB (3–5× In magnetic threshold) would nuisance-trip on every start',
      'Three-phase motors must use BS 3036 fuses',
      'Type D has lower breaking capacity, which is required for motors',
    ],
    correctAnswer: 1,
    explanation:
      'Per BS EN 60898 / App 3 figures 3A4–3A6, Type B trips on magnetic curve at 3–5× In, Type C at 5–10× In, Type D at 10–20× In. A DOL motor inrush of 6–8× FLC sits between Types B and C — Type B will nuisance-trip; Type C handles it cleanly. Very high-inrush loads (transformers, welders) call for Type D.',
  },
  {
    id: 5,
    question:
      'Reg 435.2 covers protection where overload and fault current protection are provided by SEPARATE devices. What does it require?',
    options: [
      'Only one of the two devices needs to be installed',
      'The overload device must satisfy Section 433 AND the fault-current device must satisfy Section 434 — independently',
      'Both devices must be the same type and rating',
      'The two devices must be from the same manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 435.2: where overload and fault-current protection are split, each device is judged against its own Section. The overload device only has to meet Section 433 (coordination with cable thermal limits); the fault-current device only has to meet Section 434 (fault-current capability and adiabatic). A combined device (Section 435 / RCBO / MCB) must satisfy both Sections together.',
  },
  {
    id: 6,
    question:
      'Reg 536.4.1.3.1 lists the four ways selectivity between OCPDs may be verified. Which is NOT one of them?',
    options: [
      'Desk study using manufacturer literature and product-standard data',
      'Software tools where information is provided by the manufacturer for the specific use',
      'Live on-site short-circuit tests carried out by the installer at the consumer unit',
      "Manufacturer's declaration of selectivity",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 536.4.1.3.1 permits: (a) desk study using product standard + manufacturer literature; (b) appropriate software tools where the manufacturer provides data for that specific use; (c) tests in accordance with the applicable product standard (NOT live tests at the installation — these are factory / type-test); (d) manufacturer's declaration. Live consumer-unit short-circuit testing by the installer is not a recognised verification route and is unsafe.",
  },
  {
    id: 7,
    question:
      'Which device may be used ONLY for short-circuit protection per Section 432, and never for overload?',
    options: [
      'Type B MCB to BS EN 60898',
      'RCBO to BS EN 61009-1',
      'Instantaneous-trip circuit-breaker (ICB) to Annex O of BS EN 60947-2 / aM and aR fuses',
      'BS 88-3 cartridge fuse',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 432: instantaneous-trip circuit-breakers (ICBs to Annex O of BS EN 60947-2) and aM / aR type fuses (BS HD 60269-2 / -3) may be used only for short-circuit protection — they have no overload thermal element. They must always be paired with a separate overload device (e.g. a thermal overload relay on a motor starter) to satisfy Reg 435.2.',
  },
  {
    id: 8,
    question:
      'Reg 533.2.2 adds a layer to Reg 433.1 selection where harmonic currents are present. What does it require?',
    options: [
      'Use BS 3036 fuses instead of MCBs',
      'When selecting an overload protective device, take account of harmonic currents — the RMS current including harmonic content must inform the device rating',
      'Halve the cable CCC to allow for harmonics',
      'Disable additional protection where harmonics are present',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 533.2.2 says when selecting an overload device per Reg 433.1, account shall be taken of harmonic currents. In high-harmonic loads (LED drivers, VSDs, large IT installations) the neutral can carry triplen-harmonic currents above the line-conductor RMS — the device must not nuisance-trip on harmonic content but must still keep the cable within thermal limits. App 4 has the derating factors.',
  },
];

const faqItems = [
  {
    question: "What's the difference between In, Ib, Iz and I₂?",
    answer:
      'Ib — design current of the circuit (the load you intend to draw). Iz — current-carrying capacity of the cable (App 4, after grouping/temperature/installation factors). In — rated current of the protective device (the value stamped on it). I₂ — the current that causes effective operation of the device within its conventional time, taken from the product standard. Reg 433.1.1 ties them together: In ≥ Ib, In ≤ Iz, I₂ ≤ 1.45 Iz.',
  },
  {
    question: 'Why is a BS 3036 rewireable fuse derated to In ≤ 0.725 Iz?',
    answer:
      'Because its fusing factor is ~2 (it only operates at twice rated within conventional time). To keep the conductor within the I₂ ≤ 1.45 Iz envelope of Reg 433.1.1(c), In has to be derated. App 4 gives a rating factor of 0.725 for BS 3036 fuses — applied to the cable CCC before sizing the fuse.',
  },
  {
    question: 'When can overload devices be omitted? (Reg 433.3.1)',
    answer:
      'Reg 433.3.1 permits omission where the conductor is reliably protected by an upstream device, where overload is unlikely (e.g. a permanently connected fixed load incapable of overload such as a heating element drawing rated current), and at certain points where breaking the supply could itself cause danger (Reg 433.3.3 — e.g. fire-fighting circuits). The reasoning must be recorded as a designer departure under Reg 120.3 if non-obvious.',
  },
  {
    question: "What's the difference between Icn and Icu?",
    answer:
      'Icn is the rated breaking capacity for circuit-breakers tested per BS EN 60898 (domestic / similar fixed installations) — typical values 6 kA, 10 kA. Icu is the rated ultimate short-circuit breaking capacity for industrial circuit-breakers per BS EN 60947-2 — typical values 25 kA, 36 kA, 50 kA, 65 kA. Icu is generally larger and includes a service-rating Ics (typically 50-100% of Icu) that defines the short-circuit current the device can handle and remain serviceable. Use Icn for domestic / small-commercial; use Icu for industrial / large-commercial.',
  },
  {
    question: "Why is the cable's I²t rating sometimes the binding constraint?",
    answer:
      "On a fault, the cable conducts the prospective fault current for the time the OPD takes to clear. The energy dissipated in the cable insulation is I²t — measured in A²s. Each cable size has a rated I²t withstand (App 4); if the OPD's let-through I²t exceeds the cable withstand, the insulation is damaged before the fault clears. For Reg 434.5.1, the protective device's let-through I²t must be less than the cable's withstand I²t — most modern MCBs and HRC fuses have this published in the data sheet. On long radials with high prospective fault currents, the I²t check is sometimes binding (and is what Reg 434.5 covers in detail).",
  },
  {
    question: 'How do I choose breaking capacity (Icn) for a consumer unit?',
    answer:
      'Get the prospective fault current (PSCC / PEFC) from the DNO or by calculation/measurement at origin (Ze + transformer impedance). The protective device Icn must be ≥ the prospective fault current at its point of installation (Reg 434.5.1). UK domestic CUs typically need Icn = 6 kA minimum; properties near substations or with three-phase mains may need 10 kA or back-up coordination per Reg 536.6.',
  },
  {
    question: 'What does Type AC / A / F / B mean for an RCD?',
    answer:
      'RCD type covers WAVEFORM, not OCPD characteristic. Type AC: only sinusoidal AC residual currents (now obsolete for most new installs). Type A: AC + pulsating DC (most modern domestic use). Type F: A + composite high-frequency (single-phase VSDs). Type B: A + F + smooth DC (three-phase VSDs, EV chargers without PCE separation). Confirm against load — getting this wrong defeats RCD function.',
  },
  {
    question: 'Where does selectivity (discrimination) live in BS 7671?',
    answer:
      'Reg 536.4.1 covers coordination of protective devices for OCPDs. Reg 536.4.1.3.1 — verification methods (desk study / software / product-standard tests / manufacturer declaration) and selectivity between RCDs (upstream type S, 3:1 ratio of IΔn). Reg 536.6 — back-up protection. The point: only the device closest to the fault should clear it, leaving everything upstream intact.',
  },
  {
    question: 'How do I read an Appendix 3 time-current curve in practice?',
    answer:
      "Pick the figure that matches the device (3A4 Type B, 3A5 Type C, 3A6 Type D). Find the In on the horizontal (it's plotted as multiples of In, not absolute amps). Trace up the curve to the operating-time band you're checking — 0.4 s for a TN final, 5 s for distribution, 1 hour conventional. Read across to the multiple of In needed to clip in that time. Multiply by In and divide by U₀ to get the Zs target. OSG App I tabulates the answer for every common In so you don't have to do the graph in the field.",
  },
  {
    question: 'When does Reg 536.6 back-up protection actually save you money?',
    answer:
      'When the prospective fault current at the position exceeds the downstream device Icn but stays below the upstream device Icu. The upstream device limits the I²t let-through to a value the downstream device can withstand. Manufacturer back-up coordination tables (every major brand publishes them) are the legal evidence — without the table, you cannot claim back-up coordination. Useful in commercial / industrial where uprating every outgoing MCCB to match the busbar PSCC would be uneconomic.',
  },
  {
    question: 'Do I need RCD protection on this circuit even if the MCB satisfies Reg 433.1.1?',
    answer:
      "Reg 433.1.1 is overload coordination — it doesn't cover additional protection. Reg 411.3.3 (sockets ≤ 32 A and outdoor mobile equipment) and the new A4 Reg 411.3.4 (domestic luminaire circuits) drive 30 mA RCD additional protection independently of the overload sizing. Many domestic circuits therefore need both: an MCB sized per Section 433 AND an RCD or RCBO sized per Section 411. RCBOs collapse the two into one device and are the default new-build domestic answer.",
  },
];

const BS7671Module4Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Overcurrent Protection & Device Selection | BS 7671:2018+A4:2026 | Module 4.2',
    description:
      'How BS 7671:2018+A4:2026 splits overcurrent into overload (Section 433) and fault current (Section 434), the Reg 433.1.1 coordination conditions (In ≥ Ib, In ≤ Iz, I₂ ≤ 1.45 Iz), and how MCB / RCBO / fuse types are chosen and selectivity-verified.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2"
            title="Overcurrent protection and device selection"
            description="Overload (Section 433) versus fault current (Section 434), the three Reg 433.1.1 coordination conditions, MCB Type B/C/D characteristics from Appendix 3, breaking capacity vs prospective fault current, and how selectivity is actually verified per Reg 536.4.1."
            actions={
              <>
                <RegBadge>433.1.1</RegBadge>
                <RegBadge>434.5.1</RegBadge>
                <RegBadge>536.4.1.3.1</RegBadge>
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Overcurrent splits into TWO problems: overload (Section 433 — slow, thermal, 1.1–10× In) and fault current (Section 434 — fast, magnetic, 10–1000× In). Different regs, different device responses.',
              'Reg 433.1.1 ties device to cable: In ≥ Ib, In ≤ Iz, I₂ ≤ 1.45 Iz. All three must hold. BS 3036 fuses force In ≤ 0.725 Iz (App 4) because their fusing factor is ~2.',
              'A device must always have breaking capacity (Icn) ≥ the prospective fault current at its installation point (Reg 434.5.1). If not, apply Reg 536.6 back-up coordination.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish overload from fault current and pick the correct Section (433 vs 434) for a given protection problem.',
              'Apply Reg 433.1.1 to size a protective device against a cable — including the BS 3036 derate and the harmonic-current consideration of Reg 533.2.2.',
              'Choose Type B / C / D MCB by load profile (Appendix 3 characteristics, BS EN 60898) and confirm breaking capacity against PSCC.',
              'Read an Appendix 3 time-current curve — interpret thermal element, magnetic threshold and conventional time — and use it to set Zs(max) for a circuit.',
              'Determine PSCC at origin (DNO data or measurement) and decide between a higher-Icn device or back-up coordination per Reg 536.5 / 536.6.',
              'State the four Reg 536.4.1.3.1 selectivity-verification routes and explain why on-site live testing is not one of them.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Two faces of overcurrent</ContentEyebrow>

          <ConceptBlock
            title="Overload vs fault current — different problems, different regs"
            plainEnglish="Overload is a slow build-up of current above what the cable was sized for. Fault current is a sudden short-circuit or earth fault — a low-impedance path producing a current many times the rating, almost instantly."
            onSite="The same 32 A Type B MCB handles both, but via different parts of its characteristic curve: thermal element for overload, magnetic element for fault. Knowing which element you are relying on dictates whether you size by Reg 433 or by Reg 434."
          >
            <p>
              Section 433 governs overload protection (gradual current rise — typically 1.1–10×
              rated). Section 434 governs fault current protection (short-circuit and earth fault —
              up to 1000×+ rated). Section 435 covers a single device handling both; Reg 435.2
              covers the case where two separate devices split the duties (e.g. an instantaneous
              circuit-breaker plus a thermal overload relay on a motor starter).
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Section 433 — overload protection</ContentEyebrow>

          <ConceptBlock
            title="The three Reg 433.1.1 conditions"
            plainEnglish="An overload device passes if (a) its rating is at least the design current, (b) its rating is at most the cable's CCC, and (c) the current that actually trips it doesn't push the cable past 1.45× CCC."
            onSite="Memorise: In ≥ Ib, In ≤ Iz, I₂ ≤ 1.45 Iz. (a) and (b) are obvious. (c) is the silent killer — BS 3036 fuses fail (c) on equal-sized cable, which is why App 4 forces In ≤ 0.725 Iz for them."
          >
            <p>
              Reg 433.1.1 ties the protective device to the cable it protects. I₂ — the current that
              causes effective operation within the conventional time — is taken from the product
              standard or the manufacturer. For BS EN 60898 MCBs and BS EN 61009-1 RCBOs, I₂ ≈ 1.45
              × In, so condition (c) is automatic when (b) is met. For BS 3036 semi-enclosed fuses,
              I₂ ≈ 2 × In, so In must be reduced to keep I₂ within 1.45 × Iz.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 433.1.1 — Coordination between conductor and overload protective device"
            clause="The operating characteristics of a device protecting a conductor against overload shall satisfy the following conditions: (a) the rated current or current setting of the protective device (Iₙ) is not less than the design current (I_b) of the circuit; and (b) the rated current or current setting of the protective device (Iₙ) does not exceed the lowest of the current-carrying capacities (I_z) of any of the conductors of the circuit; and (c) the current (I₂) causing effective operation of the protective device does not exceed 1.45 times the lowest of the current-carrying capacities (I_z) of any of the conductors of the circuit."
            meaning="Three checks per circuit. Get any one wrong and the cable is unprotected from prolonged overload. App 4 of BS 7671 gives the rating factors (grouping, ambient, installation) that bring nominal cable CCC down to the I_z you actually use."
            cite="BS 7671:2018+A4:2026, Reg 433.1.1"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Section 434 — fault current protection</ContentEyebrow>

          <ConceptBlock
            title="Breaking capacity vs prospective fault current"
            plainEnglish="The device has to interrupt whatever current the fault throws at it. If the prospective fault current at the position is higher than the device's stated breaking capacity, it can fail to clear the fault — best case a melted device, worst case a fire or arc-flash."
            onSite="Pull the PSCC at origin (Ze plus transformer impedance) and check it stays below Icn at every device. Domestic 6 kA is borderline near substations — check the DNO max Ze or measure live at the cut-out."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 432 / 434.5.1 — Characteristics of a fault current protective device"
            clause="A device providing protection against both overload and fault current shall be capable of breaking, and for a circuit-breaker making, any overcurrent up to and including the maximum prospective fault current at the point where the device is installed."
            meaning="Icn (or Icu for industrial devices) must equal or exceed the PSCC. If it can't — and the fault energy isn't otherwise limited by an upstream device — the device is non-compliant. Reg 536.6 / 536.5 permits documented back-up coordination as the alternative to a higher-Icn device."
            cite="BS 7671:2018+A4:2026, Reg 434.5.1 / 432"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>MCB types and selectivity</ContentEyebrow>

          <ConceptBlock
            title="Type B / C / D — the magnetic threshold (Appendix 3)"
            plainEnglish="Type B trips magnetically at 3–5× In. Type C at 5–10× In. Type D at 10–20× In. The thermal element is the same; only the instantaneous magnetic threshold differs."
            onSite="Final ring or radial circuits = Type B. DOL motors / fluorescent banks / transformers = Type C. Welders / X-ray sets / very high inrush = Type D. Get the type wrong on a motor and you'll be standing under a tripped board on every cold start."
          >
            <p>
              Section 432 names the standards (BS EN 60898 for domestic / similar fixed installs; BS
              EN 60947-2 for industrial). Appendix 3 of BS 7671 carries the time/current
              characteristic figures (3A4 — Type B, 3A5 — Type C, 3A6 — Type D) used to look up
              maximum Zs values at 0.4 s and 5 s for every In rating. RCBOs to BS EN 61009-1 follow
              the same characteristic.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Selectivity — only the closest device clears"
            plainEnglish="When a fault happens, you want the device closest to the fault to operate, leaving the rest of the installation energised. That's selectivity (or discrimination)."
            onSite="Selectivity is verified BEFORE install, not at the consumer unit on the day. Reg 536.4.1.3.1 lists the four routes — desk study with manufacturer data, software, product-standard tests, manufacturer's declaration. Live on-site short-circuit tests are not on that list."
          >
            <p>
              For RCDs, Reg 536.4.1.3.1 sets a 3:1 ratio of IΔn between upstream and downstream,
              with the upstream being a type S (selective / time-delayed) RCD. Energy-let-through
              selectivity (Reg 536.7) covers cases where current grading alone isn't enough — the
              upstream device's I²t let-through stays below the downstream device's withstand.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reading App 4 — turning cable spec into Iz</ContentEyebrow>

          <ConceptBlock
            title="Nominal CCC vs corrected Iz"
            plainEnglish="App 4 of BS 7671 lists nominal current-carrying capacity (CCC) for every cable type, size and reference method (clipped direct, in trunking, buried, etc.). The nominal value assumes ideal conditions — single circuit, ambient 30 °C, no thermal insulation. Real installations are rarely ideal, so nominal CCC must be reduced by rating factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci) and BS 3036 fuse use (Cf)."
            onSite="Iz = nominal CCC × Ca × Cg × Ci × Cf. Get the rating factors from App 4 / OSG App F. Standard 70 °C PVC at 30 °C ambient: Ca = 1.0 (no derate). Grouped with two other circuits in same trunking: Cg ≈ 0.7. Total Iz = nominal × 0.7 — significantly less than the catalogue figure. Reg 433.1.1(b) is checked AGAINST the corrected Iz, not the catalogue value."
          >
            <p>
              The mistake to avoid: looking up cable CCC in App 4, ticking In ≤ Iz against the
              nominal value, and signing off without applying rating factors. The pattern shows up
              most often in commercial work where multiple circuits are routed together — grouping
              factors of 0.5-0.7 are common in 3-4-circuit cable trays. A 32 A circuit on 4 mm² T&E
              with nominal Iz of 36 A passes In ≤ Iz comfortably; in a 4-circuit grouping with Cg =
              0.6 the corrected Iz drops to 21.6 A and the circuit fails. Always apply the factors.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reference methods — picking the right column"
            plainEnglish="App 4 lists multiple installation methods (Reference Method A through G+, depending on the table). Each method has its own CCC. Picking the wrong column is one of the most common cable-sizing mistakes — values can differ by 30-50% between methods for the same cable."
            onSite="Common methods: A (single layer in conduit / trunking against a thermally-insulating surface), B (single layer in conduit / trunking on a wall), C (clipped direct to a non-thermally-insulating surface), D (buried direct in soil), E (multicore on a perforated cable tray), F (multicore on a non-perforated tray), G (in air with adequate ventilation). Match the method on site to the column in App 4. Don't default to clipped-direct (Method C) — many installs aren't clipped direct, particularly in commercial / industrial cable trays."
          >
            <p>
              The OSG simplifies this for typical UK domestic work by providing a 'select your
              installation' decision aid. App 4 of BS 7671 is the full reference for everything
              else. The reference-method choice cascades into the CCC value; the CCC value cascades
              into the rating-factor calculation; the corrected Iz determines the maximum permitted
              In. Get the method wrong and the whole chain is wrong, often in a way that doesn't
              show up until a fault stresses the under-rated cable.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Time-current curves — what Appendix 3 actually says</ContentEyebrow>

          <ConceptBlock
            title="The shape of the curve — three regions, three behaviours"
            plainEnglish="Every overcurrent device has a time-current characteristic with three distinct regions. At low overload, it sits on a slow inverse-time curve (thermal). At higher current, it drops onto a near-vertical line (magnetic). And there's a horizontal 'conventional time' band that defines the type-test observation window."
            onSite="When you look up Zs(max) for a Type B 32 A in OSG App I, the value you read is the curve's instantaneous-trip threshold expressed as a Zs — i.e. how low the loop impedance has to be for the magnetic element to clip the fault inside 0.4 s. Get below that and ADS works on the magnetic element, no thermal involvement, no integration over time."
          >
            <p>
              Appendix 3 of BS 7671 carries the figures: 3A4 (Type B), 3A5 (Type C), 3A6 (Type D)
              for MCBs to BS EN 60898, plus equivalent figures for RCBOs to BS EN 61009-1, and the
              BS 88 / BS 1361 / BS 3036 fuse families. Each plots time on the vertical (logarithmic,
              from 0.01 s to multiple hours) against current as a multiple of In on the horizontal
              (also log). The thermal section is the inverse-square portion in the bottom-left; the
              magnetic section is the near-vertical drop where I/In hits 3 (Type B), 5 (Type C) or
              10 (Type D); the conventional time is the horizontal band at 1 hour (≤ 63 A) or 2
              hours (&gt; 63 A).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Calculating PSCC — getting the kA right</ContentEyebrow>

          <ConceptBlock
            title="PSCC, PEFC, PFC — three numbers, one comparison"
            plainEnglish="Prospective Short-Circuit Current (PSCC) is line-to-line. Prospective Earth Fault Current (PEFC) is line-to-earth. Prospective Fault Current (PFC) is the higher of the two — that's the number the device Icn must beat."
            onSite="Loop testers measure PEFC directly (Ze + cable). Many also have a PSCC mode that estimates line-to-line. The DNO will publish a max PSCC for the network (typically 16 kA at LV cut-out for public networks; can be higher for properties direct off a substation, or much lower for long rural service runs). Use the higher of measurement and DNO max."
          >
            <p>
              For a UK domestic install, the typical answer is: 6 kA Icn on standard CUs is
              acceptable IF measured PFC at the cut-out is comfortably below 6 kA AND the DNO quote
              agrees. For properties near a substation (less than ~100 m of LV main) you are likely
              above 6 kA and need either a 10 kA-Icn product range or back-up coordination behind a
              100 A BS 88 cut-out fuse (which the DNO usually provides) — see Reg 536.5 / 536.6 for
              the coordination route. Three-phase commercial supplies routinely run 16 kA+ —
              industrial MCCBs to BS EN 60947-2 with Icu of 36 / 50 / 65 kA are the standard answer.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Worked example — a 32 A radial in a small commercial unit</ContentEyebrow>

          <ConceptBlock
            title="From load to compliant design in seven steps"
            plainEnglish="A small workshop gets a new 32 A radial for a wall-mounted bench-grinder, drill press and dust extractor. Walk it through every Reg 433.1.1 condition with concrete numbers."
            onSite="This is the design log every cert needs to be defensible. Future inspector asks 'how did you arrive at the protective device?' — the answer is the seven-step record below, written before install, not reconstructed afterwards."
          >
            <p>
              <strong>1. Load assessment (Ib).</strong> Bench grinder 1.5 kW (~7 A FLC), drill press
              0.75 kW (~3.5 A), dust extractor 1.1 kW (~5 A). Diversified design current Ib ≈ 14 A;
              assume 20 A peak with all three running with motor inrush.{' '}
              <strong>2. Cable selection.</strong> 4 mm² T&E clipped direct, Reference Method C —
              App 4 gives Iz nominal 36 A; with grouping Cg = 0.8 the corrected Iz = 28.8 A.{' '}
              <strong>3. MCB rating + type.</strong> 25 A rather than 32 A: gives In ≥ Ib (25 ≥ 20),
              In ≤ Iz (25 ≤ 28.8). Type C 25 A handles motor inrush (Type B would nuisance-trip on
              cold-start under load). <strong>4. Confirm Reg 433.1.1(c).</strong> I₂ ≈ 1.45 × 25 =
              36.25 A; 1.45 × Iz = 1.45 × 28.8 = 41.76 A. 36.25 ≤ 41.76 ✓.{' '}
              <strong>5. Disconnection.</strong> 0.4 s for a final circuit ≤ 32 A supplying fixed
              equipment. Look up Zs(max) for Type C 25 A from Appendix 3 / OSG: 0.55 Ω at 230 V (one
              of the verified facets in the bs7671_facets dataset).{' '}
              <strong>6. Breaking capacity.</strong> Measured PSCC at cut-out = 4.2 kA; standard 6
              kA Icn MCB clears with margin. <strong>7. Cert entries.</strong> EIC schedule of test
              results: measured Zs ≤ 0.55, Ze, R1+R2, MCB type C 25 A 6 kA Icn. Schedule of
              inspection ticks the protective device coordination boxes.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>
            Voltage drop — the design constraint that catches long runs
          </ContentEyebrow>

          <ConceptBlock
            title="When voltage drop, not CCC, is the binding constraint"
            plainEnglish="Reg 525.1 sets BS 7671's voltage drop limits: 3% on a final circuit, 5% on lighting (origin to final), 8% on other circuits (origin to far point). Long runs hit these limits before CCC becomes a problem — voltage drop is often the design constraint that forces a larger cable than the load alone would suggest."
            onSite="Quick estimate: mV/A·m from App 4 × Ib × length (m) / 1000 = volts dropped. For 2.5 mm² T&E (mV/A·m ≈ 18) at 25 A over 30 m: 18 × 25 × 30 / 1000 = 13.5 V — about 5.9% of 230 V, well over the 3% final-circuit limit. Either upgrade to 4 mm² (mV/A·m ≈ 11), shorten the run, or accept the voltage drop as a documented departure under Reg 120.3."
          >
            <p>
              The exact calculation in App 4 also accounts for power factor and conductor
              temperature, and the OSG provides simplified tables for typical UK installations. For
              most working engineers the rough mV/A·m estimate is enough to spot circuits that need
              attention; the precise calculation is reserved for design verification before
              sign-off. Note that voltage drop is checked at NORMAL LOAD (Ib), not fault current —
              different test, different number, different design implication.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Calculating Zs from first principles</ContentEyebrow>

          <ConceptBlock
            title="Zs = Ze + (R1 + R2) — and why temperature correction matters"
            plainEnglish="Total earth-fault loop impedance is the supply contribution (Ze) plus the circuit's own resistance (R1 line + R2 CPC). Both rise with conductor temperature; tested values must be corrected to the operating-temperature value before comparing to the Appendix 3 limit."
            onSite="Test instruments measure Zs at ambient (typically 20 °C). Cables operate up to 70 °C (PVC) or 90 °C (thermoplastic / thermosetting). Conductor resistance rises by ~0.4% per °C — meaning measured Zs at 20 °C is roughly 80% of the value the circuit will hit under full sustained load. Either correct manually using the formula in OSG App I, or use the rule-of-thumb 'measured Zs ≤ 80% of Appendix 3 maximum' to leave temperature headroom."
          >
            <p>
              The formula: Zs(operating) ≈ Zs(measured) × [1 + α (T_op − T_test)] where α ≈ 0.004
              for copper, T_op is the operating temperature of the conductor (read from the cable
              spec — typically 70 °C or 90 °C), and T_test is the measurement temperature (typically
              20 °C). For a 70 °C PVC cable measured at 20 °C, the multiplier is 1 + 0.004 × 50 =
              1.2 — i.e. the operating Zs is 20% higher than measured. That's the source of the '80%
              rule' you'll see in the OSG: measured Zs ≤ 0.80 × Zs(max from Appendix 3) gives a 20%
              safety margin and accommodates the temperature rise.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Type B vs Type C vs Type D — a 30-second decision tree"
            plainEnglish="If the load has no inrush worth worrying about: Type B. If the load has motor/transformer/discharge-lighting inrush in the 5–10× FLC range: Type C. If the load is a welder, large motor or industrial transformer with inrush 10×+ FLC: Type D."
            onSite="Default to Type B for every domestic and small commercial circuit. Drop to Type C only when nuisance trips on cold start are reported or the design clearly calls for it (commercial kitchens, lighting banks, small motors). Type D is rare in fixed installations — reach for it only when manufacturer's data demands it."
          >
            <p>
              The trade-off is between false trips and Zs(max). Higher trip threshold (D vs C vs B)
              means easier inrush handling but a LOWER Zs(max) for the same In rating, so tighter
              loop-impedance is required to maintain ADS within 0.4 s. Type D 32 A on TN has Zs(max)
              of about 0.37 Ω at 230 V, versus Type B 32 A at 1.37 Ω — a 4× tighter
              circuit-impedance budget. Choosing Type D when Type C would do means harder Zs targets
              and shorter circuit lengths for no safety benefit.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="The five-step overcurrent design"
            plainEnglish="(1) Calculate Ib (design current). (2) Pick cable, apply App 4 rating factors to get Iz. (3) Pick OPD type by load (Type B default, Type C for inrush, Type D for very high inrush). (4) Pick OPD rating: In ≥ Ib AND In ≤ Iz AND I₂ ≤ 1.45 Iz. (5) Verify breaking capacity Icn ≥ PSCC at the position."
            onSite="Tape the steps to the bench. Most overcurrent design failures come from steps 2 (forgot the rating factors) or 5 (didn't check PSCC). Step 4's three sub-conditions are simultaneous — all must hold. For BS 3036 fuses, step 4 tightens to In ≤ 0.725 Iz. For harmonic-rich loads, step 4 tightens further per Reg 533.2.2 with App 4 harmonic factors."
          >
            <p>
              For typical UK domestic: step 2 yields Iz ≈ 27 A on 2.5 mm² T&E clipped direct with no
              grouping; step 4 gives 32 A Type B as the standard ring final answer. For commercial:
              more variables, more rating factors, more time spent on App 4 — the design effort
              scales with the complexity of the installation. Senior designers walk every step
              explicitly on every circuit; the discipline catches errors that intuition misses.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Sizing the MCB by load — and forgetting Reg 433.1.1(b)"
            whatHappens="Designer picks a 40 A MCB to leave headroom on a 32 A radial running on 4 mm² T&E with Iz = 36 A (after grouping). Cable CCC is exceeded under sustained load — insulation degrades, fault risk increases, and Reg 433.1.1(b) is breached even though the load itself never exceeds rated."
            doInstead="Always check In ≤ Iz AFTER applying App 4 rating factors. The MCB rating must protect the cable, not the load — the load looks after itself. If 32 A fits the load and 36 A is the corrected Iz, fit a 32 A MCB and leave the headroom in the cable."
          />

          <CommonMistake
            title="Specifying an MCB by Icn from the catalogue — without checking PSCC at the position"
            whatHappens="A 6 kA MCB is fitted in a CU on a property 80 m from a 11 kV substation. PSCC at origin is 9.5 kA. On a fault at the consumer unit terminals, the MCB cannot interrupt — best case it welds shut, worst case it ruptures."
            doInstead="Measure PSCC (PSCC = max(PSCEFC, PEFC)) at origin. If it exceeds device Icn, either spec a 10 kA Icn device (Hager / MK / Schneider all do them), or use Reg 536.6 back-up: a properly sized upstream HRC fuse limits the let-through energy and is documented in the manufacturer's coordination tables."
          />

          <CommonMistake
            title="Using a BS 3036 rewireable fuse without applying the App 4 derate"
            whatHappens="Replacement consumer unit on a 1960s install retains the original 30 A rewireable fuse on the cooker circuit, 6 mm² T&E, Iz = 41 A. Designer ticks 'In ≤ Iz' (30 ≤ 41) and signs off the cert. The cert is non-compliant: BS 3036 fusing factor is ~2, so I₂ ≈ 60 A — well above 1.45 × 41 = 59.5 A. A sustained 50 A overload sits inside the fuse's conventional time but cooks the cable insulation."
            doInstead="App 4 footnote and NOTE 1 to Reg 433.1.1: for BS 3036 protection, In ≤ 0.725 Iz. Here that means In ≤ 0.725 × 41 = 29.7 A — a 30 A BS 3036 is borderline acceptable, but on a 16 A circuit running 1 mm² (Iz ≈ 14 A) you'd need a 10 A BS 3036 not a 16 A. Check the rating factor every time, or just don't fit BS 3036 — most installers refit MCBs / RCBOs as part of a CU upgrade for exactly this reason."
          />

          <CommonMistake
            title="Forgetting voltage drop on long sub-mains"
            whatHappens="A 100 m sub-main feeds a workshop sub-board on 16 mm² SWA. Designer sizes the cable on CCC against the load (say 80 A) — passes Reg 433.1.1 cleanly. But voltage drop at 80 A over 100 m of 16 mm² is approximately 5% — at the boundary of BS 7671 Reg 525.1's 5% lighting / 8% other-circuits limits. Equipment at the sub-board sees 218 V instead of 230 V; some loads malfunction or run inefficiently."
            doInstead="Voltage drop is a separate check from CCC. Reg 525.1 / Table 4Ab in OSG: 3% from origin to far point of any final circuit, 5% from origin to lighting (final + sub-main combined), 8% from origin to non-lighting equipment. Calculate using App 4's voltage-drop tables or simply mV/A·m × Ib × length / 1000 (approximate) or the more precise OSG tables. Often the voltage-drop check forces a larger cable than CCC alone would dictate — particularly on long runs, motor circuits, or sensitive loads."
          />

          <CommonMistake
            title="Ignoring harmonic currents in IT-heavy commercial circuits"
            whatHappens="An office floor with 80 LED panels and a server rack reports neutral conductor running hotter than the line conductors and intermittent 30 mA RCD nuisance trips. Designer sized line conductors per balanced load, neutral per the line — but triplen harmonics from the LED drivers add in the neutral rather than cancelling."
            doInstead="Reg 533.2.2: when selecting an overload device, take account of harmonic currents. App 4 gives derating factors for high-harmonic loads — a typical reduction factor of 0.86 to 0.66 depending on harmonic content. Practically: oversize the neutral (or use a separate neutral per phase), apply the App 4 harmonic factor to Iz when sizing the device, and consider a 100 mA Type S RCD upstream so triplen leakage doesn't trip a 30 mA additional-protection device."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="A radial circuit grouped in a busy commercial cable tray"
            situation="A 32 A radial supplies a 25 A fixed kitchen cooker outlet on 6 mm² T&E. The cable runs on a perforated cable tray with five other circuits between the consumer unit and the cooker outlet, ambient temperature 35 °C. App 4 nominal Iz for 6 mm² Reference Method E (multicore on perforated tray) = 49 A. Designer ticks In ≤ Iz (32 ≤ 49) and signs off."
            whatToDo="Apply rating factors. Six grouped circuits: Cg ≈ 0.6 (App 4 Table 4C1). Ambient 35 °C: Ca ≈ 0.94 (App 4 Table 4B1). Corrected Iz = 49 × 0.6 × 0.94 = 27.6 A. The 32 A MCB now FAILS Reg 433.1.1(b): In (32) > Iz (27.6). Either upgrade cable to 10 mm² (nominal 67 A → corrected ~38 A, comfortably above 32 A), reduce In to 25 A (32 → 25, possibly inadequate for the cooker), or split the cable runs to reduce grouping. Document the grouping calculation on the design sheet."
            whyItMatters="The grouping factor is the most-frequently-overlooked element of overcurrent design. App 4 nominal CCCs assume single-circuit, ideal conditions; real installations are rarely either. A circuit that passes Reg 433.1.1(b) on the catalogue value but fails on the corrected value is technically non-compliant. The cable will run hotter than designed, ageing faster, and any future thermal incident may trace back to the original undersize."
          />

          <Scenario
            title="Workshop ring with a sliding-saw — nuisance trips"
            situation="A small joinery workshop reports daily nuisance trips on its 32 A ring final circuit when the operator starts a 3 kW sliding compound saw. The ring runs from a Type B 32 A MCB, 2.5 mm² T&E, Iz corrected = 27 A clipped direct."
            whatToDo="Saw inrush ≈ 6–7× FLC ≈ 78 A — sits on the Type B magnetic curve (3–5× In = 96–160 A). Fix is two-fold. (1) Replace MCB with Type C 32 A — magnetic threshold 5–10× In = 160–320 A — handles the inrush. (2) The 2.5 mm² Iz of 27 A still violates Reg 433.1.1(b) on a 32 A device, so either redesign as a 20 A radial or upgrade to 4 mm² T&E with Iz ≥ 32 A."
            whyItMatters="Type C alone fixes the symptom but leaves the cable underprotected. Both fixes are needed for a compliant solution. This is the classic A/B-school answer to motor-circuit nuisance tripping — solve the magnetic problem AND the thermal-coordination problem."
          />

          <Scenario
            title="Three-phase distribution board too close to a substation"
            situation="New retail unit fed by a 400 A three-phase TP&N supply via 70 mm² SWA from a transformer 30 m away. PSCC measured at the DB main switch = 18 kA. The contractor has installed a 250 A MCCB feeding the DB with Icu = 25 kA, then 16 kA Icn MCBs on every outgoing circuit."
            whatToDo="The 250 A MCCB at the head is fine (25 ≥ 18). The 16 kA Icn outgoing MCBs are NOT — at the busbar they see the full 18 kA PSCC. Two options: (1) replace every outgoing MCB with a 25 kA Icn product (£££), or (2) verify Reg 536.5 / 536.6 back-up: the upstream MCCB's let-through energy at 18 kA prospective must be within the downstream MCBs' I²t withstand. Check the manufacturer's back-up coordination tables — typically Schneider, Hager, ABB and Eaton all publish them. Document the back-up combination on the design and the cert."
            whyItMatters="Picking the wrong outgoing-MCB Icn rating is one of the costliest design errors in commercial work — caught late, it forces a full board strip-out. Caught early via PSCC measurement and the manufacturer's coordination table, it's a £20 product upgrade. The technical answer is in Reg 536; the commercial cost of getting it wrong is in five-figure remedial work."
          />

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Two regs, two failure modes: Section 433 protects against overload (slow), Section 434 against fault current (fast). Reg 435 coordinates them — 435.1 (one device) or 435.2 (separate).',
              'Reg 433.1.1 → In ≥ Ib, In ≤ Iz, I₂ ≤ 1.45 Iz. BS 3036 forces In ≤ 0.725 Iz (App 4) because its fusing factor is ~2.',
              'Reg 434.5.1 → device Icn ≥ PSCC at its point of installation. If not, apply Reg 536.6 back-up coordination with documented manufacturer tables.',
              'Reg 536.4.1.3.1 → selectivity verified by desk study, software, product-standard tests or manufacturer declaration. NOT by live on-site testing. RCD selectivity adds a 3:1 IΔn ratio with upstream type S (Reg 536.4.1.3.1).',
              'App 4 reference methods determine cable Iz — picking the wrong method (e.g. defaulting to clipped-direct when cable is in trunking) gives the wrong CCC and the wrong device sizing.',
              'Rating factors Ca / Cg / Ci / Cf must always be applied — corrected Iz is what Reg 433.1.1(b) is checked against, not the App 4 nominal value.',
              "Don't sign a cert where PSCC at any position exceeds the protective device's Icn. Fix is higher-Icn device or Reg 536.6 back-up coordination.",
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 Disconnection times
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module4Section2;
