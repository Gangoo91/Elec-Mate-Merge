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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm4s4-rcd-types',
    question:
      'Which RCD type is appropriate for a domestic circuit feeding a modern induction hob, mixed LED lighting and conventional sockets?',
    options: [
      'Type AC — sinusoidal AC residual only, the cheapest legacy default',
      'Type A — sinusoidal AC plus pulsating DC residual, suiting modern mixed electronics',
      'Type B — smooth DC residual, for three-phase VSDs and EV without internal DC detection',
      'Type F — composite high-frequency residual, for single-phase VSD applications',
    ],
    correctIndex: 1,
    explanation:
      'Type A is the modern domestic default. It detects sinusoidal AC plus pulsating DC residual currents — exactly what LED drivers, induction hobs and modern electronics produce on fault. Reg 531.3.3 makes Type AC unsuitable for any circuit with DC components, which means most modern domestic circuits. Type F adds high-frequency residual sensitivity (single-phase VSD-driven appliances). Type B adds smooth DC sensitivity (three-phase VSDs, EV without internal detection).',
  },
  {
    id: 'm4s4-30ma-additional',
    question:
      'Reg 411.3.3(a) mandates 30 mA RCD additional protection on socket-outlets ≤ 32 A in locations used by ordinary persons or children. What if the location is a non-domestic workspace where only skilled persons access the sockets?',
    options: [
      'No RCD needed — only ordinary-person / BA1 / BA2 locations trigger the rule at all',
      'RCD required by default, but Reg 411.3.3(b) allows a documented risk-assessment exception',
      'A 100 mA RCD is sufficient here in place of the usual 30 mA additional-protection device',
      'Reg 411.3.3 does not apply to non-domestic commercial premises in any circumstances',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.3.3 has three categories: (a) sockets ≤ 32 A used by ordinary persons / children — RCD mandatory, no exception; (b) sockets ≤ 32 A in OTHER locations — RCD mandatory by default but a documented risk assessment by a skilled person (electrically) MAY permit omission, with the assessment attached to the EIC; (c) mobile equipment ≤ 32 A used outdoors — mandatory, no exception.',
  },
  {
    id: 'm4s4-411-3-4',
    question:
      'Reg 411.3.4 (new in BS 7671:2018+A4:2026) adds 30 mA RCD additional protection for AC final circuits supplying luminaires within domestic (household) premises. Where does it NOT apply?',
    options: [
      'Bathroom luminaires within a dwelling — already covered by Section 701',
      'Commercial premises lighting circuits — outside the domestic (household) scope',
      'Outdoor luminaires within a dwelling — covered by the outdoor mobile rule',
      'Emergency-lighting circuits within a dwelling — exempt as safety circuits',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.3.4 is scoped explicitly to "domestic (household) premises" — i.e. dwellings. Commercial and industrial luminaire circuits remain governed by Reg 411.3.3 (sockets and outdoor mobile equipment) and the wider 30 mA additional-protection rules for specific environments (Section 701 bath/shower, 702 swimming pool, 705 agricultural, 753 floor/ceiling heating).',
  },
  {
    id: 'm4s4-test-buttons',
    question:
      "The customer presses the test button on their RCD monthly and it always trips. Are they confirming the RCD's residual-current sensitivity?",
    options: [
      'Yes — the test button injects a real 30 mA residual current to prove sensitivity',
      'No — the button exercises the trip mechanism but does not verify sensitivity at IΔn',
      'Yes — and a passing button test removes the need for any instrument RCD test',
      'No — the button only proves its own contacts work, nothing about the RCD',
    ],
    correctIndex: 1,
    explanation:
      "The test button is a mechanical proof — it confirms the trip mechanism still functions but does not verify sensitivity at IΔn. The RCD might have drifted (typical drift is upward — required residual current increases with age) and the user-button test wouldn't catch it. Reg 643.8 / GN3 require RCD operation timing tests at IΔn (≤ 300 ms general / ≤ 200 ms BS EN 61008) AND 5×IΔn (≤ 40 ms) using a calibrated tester.",
  },
  {
    id: 'm4s4-selectivity',
    question:
      'You want an upstream main-switch RCD that will NOT operate when a downstream RCBO trips on a final-circuit fault. What does Reg 536.4.1.4 require?',
    options: [
      'Both devices must be the same waveform type, e.g. both Type B',
      'Upstream must be Type S (time-delayed) AND the IΔn ratio at least 3:1',
      'Both devices must share the same IΔn rating, e.g. 30 mA over 30 mA',
      'No specific requirement — RCD-to-RCD selectivity cannot be achieved',
    ],
    correctIndex: 1,
    explanation:
      'Reg 536.4.1.4: (i) upstream is Type S (time-delayed), and (ii) the IΔn ratio of upstream to downstream is at least 3:1. Standard cascade: 100 mA Type S upstream / 30 mA Type AC/A downstream gives 100/30 = 3.33 — satisfied. Without both conditions met, the upstream RCD will trip in parallel with the downstream device on any fault.',
  },
  {
    id: 'm4s4-tt-rcd',
    question:
      'On a TT installation, can a single 100 mA Type S RCD at the consumer-unit incoming serve as the SOLE RCD for the whole installation?',
    options: [
      'Yes — this is the standard single-RCD whole-installation configuration',
      'No — its 100 mA IΔn cannot give the 30 mA additional protection finals still need',
      'Yes — provided the earth-electrode resistance Ra stays below 100 Ω',
      'No — TT systems are required to use Type B RCDs throughout',
    ],
    correctIndex: 1,
    explanation:
      "A single upstream RCD can satisfy fault protection (Reg 411.5.3) but doesn't provide ADDITIONAL protection (Reg 411.3.3 / 411.3.4) on the final circuits because its IΔn is too high. Standard TT design: 100 mA Type S as the main switch + 30 mA RCBOs on each final circuit. Selectivity: 100/30 = 3.33 ✓.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A new build domestic install: which set of RCD-related regulatory requirements must the design simultaneously satisfy?',
    options: [
      'Reg 411.3.3 sockets, Reg 411.3.4 luminaires, and product compliance (Reg 531.3.4.1).',
      'Only Reg 411.3.4, covering the AC final circuits that supply luminaires in the dwelling.',
      'Only the local building-control rules currently in force for that particular area.',
      'No RCD requirement applies to a new domestic installation at all under the standard.',
    ],
    correctAnswer: 0,
    explanation:
      'New domestic build under BS 7671:2018+A4:2026 must satisfy: (i) Reg 411.3.3 — 30 mA RCD on every socket ≤ 32 A AND on outdoor mobile equipment; (ii) Reg 411.3.4 — 30 mA RCD on every AC final circuit supplying luminaires; (iii) device product compliance per Reg 531.3.4.1; (iv) RCD type appropriate for load per Reg 531.3.3.',
  },
  {
    id: 2,
    question: 'Reg 531.3.3 — when may a Type AC RCD still be used?',
    options: [
      'On any domestic socket circuit, wherever it is convenient and cheaper to fit.',
      'On any general lighting circuit, regardless of the load type connected to it.',
      'Only on fixed equipment whose load current is known to contain no DC components.',
      'Type AC is no longer permitted in any installation under any circumstances whatever.',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 531.3.3: Type AC RCD shall only be used to serve fixed equipment where it is known that the load current contains no DC components. This restricts Type AC to a narrow set of legacy / pure-resistive applications.',
  },
  {
    id: 3,
    question:
      "An RCD trips at IΔn (30 mA) in 280 ms and at 5×IΔn (150 mA) in 38 ms. What's the verdict against BS EN 61008 / 61009 limits?",
    options: [
      'Both tests fail the limits.',
      'IΔn passes but 5×IΔn fails.',
      'IΔn fails but 5×IΔn passes.',
      'Both pass — IΔn ≤ 300 ms and 5×IΔn ≤ 40 ms.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 61008 / 61009 for ordinary-person operation: IΔn maximum operating time 300 ms general, 5×IΔn maximum 40 ms. Type S devices have longer permitted times at IΔn (up to 500 ms) but the same 40 ms at 5×IΔn. At 280 ms / 38 ms the device passes both with margin.',
  },
  {
    id: 4,
    question:
      'A circuit feeds a single-phase EV charger that has its own internal 6 mA DC fault detection. Which RCD type is required UPSTREAM at the consumer unit?',
    options: [
      'Type AC — adequate since the load is a simple AC supply',
      'Type A — sufficient because the charger handles the smooth DC residual itself',
      'Type B — always required upstream of any EV charge point',
      'No RCD needed — the charger handles all fault detection internally',
    ],
    correctAnswer: 1,
    explanation:
      "Where the EV charger has internal 6 mA DC fault detection and provides simple separation between AC and DC sides, Type A upstream is sufficient. Type B is required only where the charger does not provide that separation. Always check the manufacturer's installation manual — it states explicitly which upstream RCD type is required.",
  },
  {
    id: 5,
    question:
      'You measure RCD operating time at IΔn but the device fails to trip within 300 ms. What does Reg 643 require you to do?',
    options: [
      'Record the result and continue the EICR as a routine non-coded observation.',
      'Press the integral test button repeatedly to free up the tripping mechanism.',
      'Code C2 and recommend replacement, as the protection cannot be demonstrated.',
      'Lower the injected test current and repeat the operating-time test until it passes.',
    ],
    correctAnswer: 2,
    explanation:
      "An RCD failing its operating-time test means the protection it was supposed to provide cannot be demonstrated. On EICR, that's C2 — potentially dangerous. On initial verification, the failed RCD must be replaced before the EIC can be issued. NEVER 'work the mechanism' — the device has either drifted, has internal damage, or has welded contacts; the only safe answer is replacement.",
  },
  {
    id: 6,
    question:
      'What additional protection requirement applies to mobile equipment used OUTDOORS, regardless of where the supply socket sits?',
    options: [
      'Reg 411.3.3(c): 30 mA RCD additional protection, with no risk-assessment exception.',
      'No specific additional-protection requirement applies to outdoor mobile equipment.',
      'Only a weatherproof IP-rated housing on the equipment itself is required outdoors.',
      'Only fixed sockets sited in BA1/BA2 locations are actually covered by the rule.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 411.3.3(c): mobile equipment ≤ 32 A used outdoors must have 30 mA RCD additional protection. Unlike (b), there is no risk-assessment exception. Practical implication: garage / outbuilding sockets used for hedge-trimmers, mowers, pressure washers must have 30 mA RCD protection.',
  },
  {
    id: 7,
    question:
      'You are designing a small commercial unit with mixed fixed equipment, sockets, and a single 22 kW three-phase EV charger (no internal DC detection). What RCD strategy is correct?',
    options: [
      'A single 100 mA Type AC RCD at the main switch covering every circuit on the whole board',
      'Type B 30 mA on the EV circuit, Type A 30 mA RCBOs on sockets, 100 mA Type S upstream',
      'All circuits grouped together behind one shared 30 mA Type B RCD on a common busbar',
      'No RCD at all — three-phase circuits are exempt from the Reg 411.3.3 requirements here',
    ],
    correctAnswer: 1,
    explanation:
      'A 22 kW three-phase EV charger without internal DC detection produces smooth DC residual on fault — this requires Type B (Reg 722). Sockets need 30 mA additional protection (Reg 411.3.3) — Type A is sufficient for normal commercial socket use. The upstream main switch is 100 mA Type S for selectivity with the 30 mA downstream devices. Selectivity ratio 100/30 = 3.33 ✓.',
  },
  {
    id: 8,
    question: 'Reg 531.3.1.202 forbids one specific practice when installing RCDs. What is it?',
    options: [
      'Installing an RCD with a rated residual operating current below 30 mA on a circuit.',
      'Installing a single shared RCD to protect a three-phase final circuit on the board.',
      'Using an RCD to protect an inductive motor-starter circuit prone to inrush current.',
      'Adding an external connection to deliberately create a residual current that trips it.',
    ],
    correctAnswer: 3,
    explanation:
      "Reg 531.3.1.202: 'It is not permissible to introduce an external connection for the purpose of intentionally creating a residual current to trip an RCD.' This rules out the (sometimes-suggested) trick of tying load-side neutral to earth downstream of an RCD to force imbalance. The RCD must trip in response to genuine residual currents only.",
  },
];

const faqItems = [
  {
    question: "What's the difference between fault protection and additional protection?",
    answer:
      'Fault protection (Reg 411.3) is the primary protective measure against electric shock when basic protection fails — it limits the touch voltage and disconnects the supply within Table 41.1 times. Additional protection (Reg 411.3.3 / 411.3.4 / 415) is a backstop layer on top of fault protection — a 30 mA RCD that operates on the touch-current itself (the imbalance caused by current flowing through a person) within ~40 ms. Additional protection does not replace fault protection; it works alongside it.',
  },
  {
    question: 'Why is Type AC effectively obsolete in modern domestic installs?',
    answer:
      'Modern domestic loads contain electronic switching power supplies (LED drivers, phone chargers, induction hobs, heat pumps, hi-fi). These produce pulsating DC residual currents on fault. Type AC is blind to pulsating DC — it would fail to trip on a fault that should otherwise activate it. Reg 531.3.3 restricts Type AC to fixed equipment with no DC components. Type A is the modern default.',
  },
  {
    question: 'Should I install RCBOs or shared RCDs across multiple final circuits?',
    answer:
      "RCBOs (one device per circuit) are the contemporary best practice and increasingly the spec. Shared RCDs (multiple final circuits behind one 30 mA RCD on a busbar) cause whole-busbar tripping when a single circuit faults — disrupting circuits that are functionally fine. Reg 314.1 requires that the loss of one circuit doesn't cause unwanted operation of others, and Reg 531.3.2 specifically encourages RCBOs in residential premises to minimise unwanted tripping.",
  },
  {
    question: 'How do I test an RCD without disconnecting the consumer unit?',
    answer:
      "Use the RCD-test mode on a multifunction tester. Connect line, neutral and CPC at any socket on the protected circuit. The instrument injects controlled imbalance currents at IΔn and 5×IΔn and measures operating time. The RCD trips during the test — that's expected — and you reset it afterwards. Some testers offer a 'no-trip' mode using very short pulses below the trip threshold.",
  },
  {
    question: 'Are there environments where 30 mA is not enough?',
    answer:
      'Yes — Reg 415.1 mentions 10 mA RCDs for special situations (some medical group 1/2 locations, some construction-site portable equipment). 6 mA DC detection is required inside EV charging equipment per BS EN 61851. Pool / fountain zones (Section 702) sometimes require SELV at 12 V AC rather than RCD-led protection. The 30 mA figure is the BS 7671 threshold for protection of "ordinary persons" against electric shock; specialised environments tighten it further.',
  },
  {
    question: "What's the right strategy when an RCD is nuisance-tripping but no fault is found?",
    answer:
      "First confirm: are you sure it's nuisance-tripping (no fault) and not real residual current (intermittent)? Use a leakage clamp meter on the protected circuit during normal operation — most standing leakage is under 5 mA across all loads. If real leakage approaches 10-15 mA you're at the threshold of the RCD's actual trip range (typically 50-100% of IΔn). Solutions: split the circuit, upgrade to Type F or B if harmonic / DC residual is the cause, or accept the load mix is the problem.",
  },
  {
    question: "What's the lifespan of an RCD?",
    answer:
      "BS 7671 doesn't set a fixed replacement interval. Manufacturers typically guarantee 10 years for domestic RCDs and 20+ years for high-quality commercial RCBOs. Operating-time drift is the most common ageing failure — the device still trips, but slower than the BS EN 61008 / 61009 limit. Annual user-button test plus periodic-inspection RCD timing test (Reg 643.8) catch drift early. On EICR, an RCD failing its 5×IΔn timing is C2 and should be replaced.",
  },
  {
    question: 'Where does Reg 411.3.4 fit alongside Reg 411.3.3?',
    answer:
      'They run in parallel, not in sequence. Reg 411.3.3 covers (a) socket-outlets ≤ 32 A used by ordinary persons / children, (b) sockets ≤ 32 A in other locations (with risk-assessment exception), (c) mobile equipment ≤ 32 A used outdoors. Reg 411.3.4 (NEW in A4:2026) covers AC final circuits supplying luminaires within domestic premises — completely separate scope, no exception. A new dwelling consumer unit typically has 30 mA RCD / RCBO on every way as a result.',
  },
  {
    question: "What's the right RCD for a heat pump installation?",
    answer:
      "Most modern heat pumps use single-phase or three-phase variable-speed drives — they produce composite high-frequency residual currents on fault. Type F or Type B is required, NOT Type A. Many heat pumps have built-in 6 mA DC fault detection; in that case Type A upstream may be sufficient — but ONLY if the manufacturer's installation manual explicitly states this. When in doubt, default to Type B for heat-pump circuits. Cost premium is real but the safety consequence of getting it wrong is real-er.",
  },
  {
    question: 'Should every domestic install be RCBOs throughout?',
    answer:
      "Best practice now, yes. Reg 314.1 requires that one fault doesn't disable other circuits — a shared 30 mA RCD covering 6 final circuits violates this in spirit if not letter. Reg 531.3.2 specifically encourages RCBOs in residential premises. Cost premium for fully-RCBO over MCB-on-busbar-RCD is roughly 2× per way — usually £100-200 for a typical 10-way domestic CU. Customer experience is significantly better (single circuit faults don't kill the whole house). Diagnostic clarity is significantly better (which device tripped tells you which circuit). For new installs and significant rewires, fully-RCBO is the modern default.",
  },
  {
    question: 'What about RCDs in TT systems versus TN systems?',
    answer:
      'Different roles. In TN, RCDs are usually ADDITIONAL protection (Reg 411.3.3 / 411.3.4) on top of OPD-led fault protection. In TT, RCDs typically provide the FAULT PROTECTION itself (Reg 411.5.3) because the high earth-electrode resistance prevents OPDs from clearing in time. Standard TT setup: 100 mA Type S RCD as main switch + 30 mA RCBOs on each final circuit. Selectivity ratio 100/30 = 3.33 ✓.',
  },
];

const BS7671Module4Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Residual Current Devices (RCDs) | BS 7671:2018+A4:2026 | Module 4.4',
    description:
      'RCD types (AC / A / F / B) under Reg 531.3.3, additional protection requirements per Reg 411.3.3 and the new A4 Reg 411.3.4 (domestic luminaire circuits), product standards BS EN 61008 / 61009, RCD selectivity per Reg 536.4.1.4, and how RCDs are tested under Reg 643.8.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Updated for A4:2026"
            title="Residual current devices (RCDs)"
            description="RCD types and what they detect, where 30 mA additional protection is mandatory (Reg 411.3.3, 411.3.4), how RCDs are tested at IΔn and 5×IΔn, and how to verify selectivity between upstream Type S and downstream final-circuit RCDs (Reg 536.4.1.4)."
            actions={
              <>
                <RegBadge>411.3.3</RegBadge>
                <RegBadge>411.3.4</RegBadge>
                <RegBadge>531.3.3</RegBadge>
                <AmendmentBadge regs={['411.3.4']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'RCD type covers WAVEFORM. Type AC sees only sinusoidal AC residual (now restricted by Reg 531.3.3). Type A adds pulsating DC. Type F adds composite high-frequency. Type B adds smooth DC.',
              '30 mA additional protection is mandatory on (a) sockets ≤ 32 A used by ordinary persons / children, (b) mobile equipment outdoors, and (c) — new in A4 — domestic luminaire circuits (Reg 411.3.4). Only category (b) — non-domestic sockets — admits a documented risk-assessment exception.',
              'RCD operating times: IΔn ≤ 300 ms (general) / 200 ms (BS EN 61008), 5×IΔn ≤ 40 ms. Selectivity (Reg 536.4.1.4) requires upstream Type S AND a 3:1 IΔn ratio.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish RCD types AC / A / F / B by waveform sensitivity and choose the correct type for a given load.',
              'Apply Reg 411.3.3 (sockets and mobile equipment) and the new Reg 411.3.4 (domestic luminaires) and identify which categories admit the risk-assessment exception.',
              'Specify product compliance per Reg 531.3.4.1 (BS EN 61008 RCCBs / BS EN 61009 RCBOs) and compare RCBO vs shared-RCD design.',
              'Verify RCD operating time per Reg 643.8 — IΔn and 5×IΔn — against BS EN 61008 / 61009 limits.',
              'Configure RCD selectivity per Reg 536.4.1.4 (upstream Type S, 3:1 IΔn ratio) for cascaded TT or large TN installations.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>RCD types — what each one detects</ContentEyebrow>

          <ConceptBlock
            title="The four types in plain English"
            plainEnglish="Type AC sees only sinusoidal AC residual. Type A adds pulsating DC residual (rectified loads, electronics with switching power supplies). Type F adds composite high-frequency residual (single-phase variable-speed drives). Type B adds smooth DC residual (three-phase VSDs, EV charging without internal DC detection)."
            onSite="The hierarchy is cumulative — Type B does everything Type F does; Type F does everything Type A does; Type A does everything Type AC does. Spec the LOWEST type that handles your load mix; over-specifying (Type B everywhere) costs 4-5× and gains nothing for circuits without smooth DC residual."
          >
            <p>
              Reg 531.3.3 restricts Type AC to fixed equipment with no DC components — meaning most
              modern domestic and commercial circuits effectively need Type A or higher. Type A
              handles the pulsating DC residual produced by switching power supplies, LED drivers,
              and rectifier-fed loads. Type F (BS EN 62423) extends this to high-frequency residual
              currents typical of single-phase VSD-driven appliances. Type B (BS EN 62423 / BS EN
              60947-2) extends further to smooth DC residual — what a three-phase rectifier or an EV
              charger without internal DC detection can produce on fault.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Additional protection — where 30 mA is mandatory</ContentEyebrow>

          <ConceptBlock
            title="Reg 411.3.3 — sockets and mobile equipment"
            plainEnglish="30 mA RCD additional protection is required on socket-outlets ≤ 32 A in three categories: where ordinary persons or children may use them, where any other socket sits (unless a documented risk assessment by a skilled person allows omission), and on mobile equipment used outdoors (no exception)."
            onSite="The risk-assessment exception under (b) is real but the burden of proof is on the designer — the assessment must be documented, signed by a skilled person (electrically), and accompany the EIC. Most commercial / industrial sockets where ordinary persons cannot reasonably be excluded fall under (a) and have no exception path."
          >
            <p>
              Categories: (a) sockets ≤ 32 A in locations where they are liable to be used by
              ordinary persons (BA1) or children (BA2) — RCD mandatory, no exception; (b) sockets ≤
              32 A in other locations (e.g. controlled-access plant rooms, dedicated industrial
              workstations) — RCD mandatory by default but exceptable with documented risk
              assessment; (c) mobile equipment ≤ 32 A used outdoors — RCD mandatory, no exception.
              Reg 411.3.3 expressly does not apply to FELV (Reg 411.7) or RLV (Reg 411.8) systems —
              they have their own protective regimes.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.4 — Additional requirements for circuits with luminaires (NEW IN A4)"
            clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning="Mandatory ('shall'), unconditional within scope, no risk-assessment exception. Applies to every AC final circuit feeding luminaires inside a private dwelling — kitchen, bathroom, hallway, stairwell, every room. From 15 April 2026 a new dwelling lighting circuit on an MCB without RCD is non-compliant; coding under GN3 EICR rules is typically C2 for a current-edition install."
            cite="BS 7671:2018+A4:2026, Reg 411.3.4 (in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[1]} />
          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>How an RCD actually works inside</ContentEyebrow>

          <ConceptBlock
            title="The toroidal core and the imbalance principle"
            plainEnglish="An RCD's core is a ring (toroid) of magnetic material. Line and neutral conductors pass through it. In normal operation, line current = neutral current — the magnetic fields cancel, the toroid is neutral. On an earth fault, some current returns via earth instead of neutral — the line current exceeds the neutral current — the toroid sees a net magnetic field, induces a current in a sensing winding, triggers the trip."
            onSite="The CPC must NOT pass through the toroid (Reg 531.3.1.201). If it did, an earth-fault current would flow back through the CPC inside the toroid, balancing out the imbalance the RCD is trying to detect. The result: an RCD that sees zero net imbalance even on a real fault, completely defeating its protective function. This is why the modern RCBO has line and neutral on the device terminals but the CPC routes externally to the earth bar."
          >
            <p>
              The sensitivity of the toroid to imbalance is the rated residual operating current IΔn
              — typically 30 mA for additional protection, 100 mA / 300 mA / 500 mA for fault
              protection on TT systems. The actual operating current is somewhere between 50% and
              100% of IΔn — a 30 mA Type AC may trip anywhere from 15-30 mA in practice. This
              tolerance band is what the 3:1 selectivity ratio (Reg 536.4.1.4) exists to manage. The
              trip mechanism itself is electromechanical — current in the sensing winding energises
              a solenoid that releases a latched contact carrier, opening the line and neutral
              contacts within ~10 ms typically.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why DC saturates the toroid (and why Type B exists)"
            plainEnglish="Toroids are made of high-permeability magnetic material. In normal operation they're not magnetised — they respond to small AC fluctuations from imbalance. A smooth DC residual current creates a permanent magnetic offset that drives the toroid into saturation — its relative permeability collapses from thousands to ~1, and small AC fluctuations no longer produce detectable signals."
            onSite="That's why a Type AC / A RCD on a circuit with smooth DC residual is functionally blind. The toroid is saturated by the DC; the AC residual the RCD is supposed to detect produces no signal in the sensing winding; the device doesn't trip. Type B RCDs use a separate Hall-effect or fluxgate sensor parallel to the toroid that maintains sensitivity even under DC saturation. The technology costs more (Type B is 4-5× a Type A) but is the only way to detect smooth DC residuals reliably."
          >
            <p>
              Type F RCDs sit between Type A and Type B — they extend Type A's pulsating-DC
              detection to include composite high-frequency residuals (the kind produced by
              single-phase variable-speed drives, where the inverter chops the AC at high
              frequency). Type F can typically detect smooth DC up to about 10 mA before the toroid
              saturates — enough for some applications but not for three-phase VSDs or
              transformerless EV chargers. The waveform-sensitivity hierarchy is cumulative: every
              type detects everything the lower types detect, plus its own additional waveform
              sensitivity. Spec the lowest type that handles the load.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RCD product standards and selection</ContentEyebrow>

          <ConceptBlock
            title="What an RCBO is and why it's the modern default"
            plainEnglish="An RCBO is a single device that combines overcurrent protection (like an MCB) with residual-current protection (like an RCD). One device per final circuit means a fault on one circuit doesn't cause whole-board disconnection."
            onSite="Reg 531.3.2 specifically encourages RCBOs in residential premises to minimise unwanted tripping. New domestic CUs typically come pre-populated with RCBOs as standard. Cost is roughly 2× per way vs MCB-on-RCD-busbar — worth it for the customer experience and the diagnostic clarity (a single tripped RCBO points at one circuit; a tripped 6-circuit RCD bus tells you nothing)."
          >
            <p>
              Reg 531.3.4.1 mandates compliance with BS EN 61008 series for Type AC and Type A
              RCCBs, and BS EN 61009 series for RCBOs intended to be operated by ordinary persons.
              Reg 531.3.4.201 adds that RCDs operable by ordinary persons must be designed or
              installed so that the residual operating current and time delay cannot be modified by
              the user — sealed against tampering. Type F and Type B RCBOs / RCCBs comply with BS EN
              62423 (which extends 61008 / 61009).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 531.3.1.201 / 531.3.1.202 — wiring rules for RCDs"
            plainEnglish="The RCD must switch ALL live conductors of the protected circuit. The protective conductor (CPC) must NOT pass through the sensor (toroid) — that defeats the imbalance detection. And you cannot create deliberate residual currents to keep the device 'exercised'."
            onSite="Most installer errors here come from running line and neutral through one core of a multicore (which puts both through the toroid as needed) but then accidentally routing the CPC through the toroid as well — typically when a multicore SWA's earth is mistakenly run with the line + neutral inside the same set of internal conductors. The cleanest test: shine a torch through the toroid and confirm only line + neutral are inside it."
          >
            <p>
              Reg 531.3.1.201: the RCD shall disconnect all live conductors of the circuit
              protected. The protective conductor shall not pass through the sensor of the RCD
              except where this is unavoidable (very rare — usually only specific bonded-CPC
              architectures). Reg 531.3.1.202: it is not permissible to introduce an external
              connection for the purpose of intentionally creating a residual current to trip an
              RCD. The fix for nuisance tripping caused by genuine leakage is to address the
              leakage, not to defeat the device.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RCD testing — Reg 643.8 and how to do it right</ContentEyebrow>

          <ConceptBlock
            title="Two test currents, two pass criteria"
            plainEnglish="Test at IΔn (rated residual operating current — typically 30 mA) and at 5×IΔn (typically 150 mA). Each has a maximum permitted operating time set by the device's product standard."
            onSite="Standard maximum operating times: at IΔn ≤ 300 ms (BS EN 61008/9 general — Type AC/A), or ≤ 200 ms for some BS EN 61008 variants. At 5×IΔn ≤ 40 ms (general), ≤ 150 ms (Type S — selective). Use a calibrated RCD tester. Pre-test continuity, IR and polarity to make sure the test path is sound (Reg 643.2 → 643.5 → 643.6 → 643.7 → 643.8 sequence)."
          >
            <p>
              The 5×IΔn test exists because real residual faults are often well above the rated IΔn
              — a person making contact across line and earth can produce currents of 100-200 mA —
              and the device must clear quickly enough to limit physiological effects. The 40 ms
              ceiling at 5×IΔn aligns with the IEC 60479 body-current / shock-energy curves that BS
              7671 implicitly relies on. Type S RCDs are explicitly slower at IΔn (up to 500 ms) for
              selectivity — they will still meet the 40 ms criterion at 5×IΔn but accept a longer
              operating time at IΔn so downstream 30 mA devices can clear first.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Standing leakage and the design budget</ContentEyebrow>

          <ConceptBlock
            title="What's actually leaking under your floors"
            plainEnglish="Every modern appliance produces some standing leakage current — typically 0.5-2 mA for a desktop computer, 0.5-3 mA for a microwave, up to 5 mA for some commercial-kitchen appliances. Multiply across every load on a circuit and you have a standing leakage of 5-15 mA on a typical busy domestic ring. A 30 mA RCD with a 50% trip threshold sees that and may be at 30-50% of its trip range during normal operation."
            onSite="This is the source of most 'random nuisance trips' that customers complain about. Use a leakage clamp meter on the protected circuit during normal operation to measure actual standing leakage — most are under 5 mA but some are surprisingly high. If standing leakage approaches 15 mA, even a perfectly-functioning 30 mA RCD will be marginal. Either split the circuit (move some loads to a separate way), upgrade to Type F or B if harmonic / DC content is a factor, or accept the load mix is the underlying problem."
          >
            <p>
              The 30 mA figure is itself a compromise — historically chosen as the threshold below
              which sustained electric shock is unlikely to cause ventricular fibrillation (per IEC
              60479's body-current curves). 30 mA was set high enough to allow reasonable load
              mixing without nuisance-tripping the RCDs available in the 1980s, but tight enough to
              provide meaningful additional protection against shock. With modern electronics
              raising standing leakage, the design budget is increasingly constrained — which is why
              RCBOs (one device per circuit) outperform shared RCDs (multiple circuits behind one 30
              mA device): each RCBO sees only its own circuit's leakage, not the cumulative leakage
              from the whole busbar.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase RCD selection"
            plainEnglish="Three-phase RCDs are four-pole devices (3 lines + neutral) sensing the same imbalance principle across all four conductors. The selection rules are identical to single-phase: pick the type by load (AC / A / F / B), pick the rating by application (30 mA additional / higher for fault protection)."
            onSite="Three-phase loads with VSD inverters typically need Type B because the rectifier-front-end produces smooth DC residual that Type A can't see. Industrial PV inverters — same. Three-phase EV charging without internal DC detection — same. Compliance is straightforward but the cost of a Type B four-pole device is significant (£500-800+ for a high-rating commercial product). Verify against each load's installation manual; spec down where the manual permits."
          >
            <p>
              Reg 411.3.3 and 411.3.4 still apply on three-phase final circuits feeding sockets and
              luminaires — where the consequences (BA1/BA2/BA1 children, outdoor mobile, domestic
              luminaires) trigger 30 mA additional protection. Three-phase RCBOs at 30 mA are widely
              available from all major manufacturers; the four-pole footprint is wider on the
              DIN-rail than single-phase but the wiring effort is similar.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Selectivity between RCDs — Reg 536.4.1.4</ContentEyebrow>

          <ConceptBlock
            title="Two conditions must hold"
            plainEnglish="Upstream RCD must be a Type S (selective / time-delayed). And the rated residual operating current ratio (upstream / downstream) must be at least 3:1."
            onSite="Standard cascaded design: 100 mA Type S upstream as main switch / fault protection; 30 mA Type AC / A / F / B RCBOs on each final circuit as additional protection. Ratio 100/30 = 3.33 — passes 3:1. Type S delay (typically 100 ms or 250 ms) is enough to let the 30 mA downstream device clear first on a final-circuit fault — only when the downstream fails or the fault is on the upstream side does the 100 mA Type S operate."
          >
            <p>
              Without both conditions, RCD selectivity fails — both devices trip together on a
              downstream fault, taking out the whole installation rather than the affected circuit.
              The 3:1 ratio comes from the BS EN 61008 product standard's tolerance on actual
              operating current — a 30 mA Type AC may actually trip anywhere between 15 and 30 mA in
              practice; a 100 mA Type AC may trip from 50-100 mA. Adequate separation between
              operating bands prevents accidental simultaneous operation.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />
          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Wiring two RCDs in series without coordinating selectivity"
            whatHappens="Designer adds a 100 mA RCD upstream of an existing 30 mA RCBO at the customer's request 'for extra safety'. Both are Type AC (or Type A, instantaneous). On a real residual fault, BOTH trip simultaneously — the 30 mA close to the fault, AND the 100 mA upstream because the surge of imbalance current passes through it before the downstream RCD has time to clear. Result: whole-house disconnection on a single circuit fault, defeating the design intent."
            doInstead="Reg 536.4.1.4: for two RCDs to operate selectively, the upstream MUST be Type S (selective / time-delayed) AND the IΔn ratio must be ≥ 3:1. Use a 100 mA Type S upstream (100/30 = 3.33 ratio satisfied). The Type S delays operation by typically 100-250 ms — long enough to allow the 30 mA downstream device to clear first on a final-circuit fault, but still well within the 5 s disconnection-time requirement for distribution circuits."
          />

          <CommonMistake
            title="Specifying Type AC by habit on a modern domestic install"
            whatHappens="Designer follows old-school 'Type AC for general use' rule of thumb on a 2026 new-build. Customer's induction hob, LED downlights, heat pump and EV charger all produce some pulsating DC residual on fault. The Type AC RCDs are present but blind — on a real fault, they may not trip. EICR a few years later: 'Type AC unsuitable for the load mix per Reg 531.3.3' coded C2."
            doInstead="Default to Type A on every domestic / commercial RCBO. Step up to Type F where single-phase VSDs are present (some heat pumps, washing-machine inverters). Type B only where smooth DC is expected — three-phase VSDs, EVs without internal DC detection, large solar / battery inverters. Spec from the load DOWN, not from price UP."
          />

          <CommonMistake
            title="Routing the CPC through the RCD toroid"
            whatHappens="On a multicore SWA installation, the installer runs all conductors (L, N, PE) through the same gland and inadvertently passes the PE through the RCD's sensor. The RCD now sees zero net imbalance even when there's a real residual current — the imbalance through line/neutral is matched by the return current via the CPC inside the toroid. The RCD is functionally defeated."
            doInstead="Reg 531.3.1.201: CPC shall not pass through the sensor. Run the CPC outside the toroid — most modern RCD/RCBO products are designed with the CPC routed externally. On older units / busbar arrangements, double-check by inspection. Classic test: shine a torch through the toroid and confirm only line + neutral conductors run inside it."
          />

          <CommonMistake
            title="Not testing both IΔn and 5×IΔn on the EICR"
            whatHappens="Inspector tests RCD operation at IΔn only — gets 280 ms, records as pass. The 5×IΔn test is omitted. The RCD is actually drifted: at 5×IΔn it operates at 65 ms — over the 40 ms limit. Real-fault response is slower than required, and the EICR has missed it."
            doInstead="Reg 643.8 / GN3: test at BOTH IΔn AND 5×IΔn. Both must pass. The 5×IΔn test is the more sensitive indicator of drift in many cases — record both values on the schedule of test results. Most multifunction testers run both tests in sequence with one connection."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="EICR finds an RCD with drifted operating time"
            situation="EICR on a 12-year-old domestic install. Tester runs the RCD operation tests on the consumer unit's 30 mA Type AC main RCD. Result at IΔn (30 mA): 320 ms. At 5×IΔn (150 mA): 48 ms. Both above the BS EN 61008 limits (300 ms / 40 ms)."
            whatToDo="The RCD has drifted with age. Code as C2 — additional protection cannot be demonstrated to BS EN 61008 limits, which is potentially dangerous because the protection the original install relied on is no longer in place. Recommend immediate replacement. Take the opportunity to also assess: (a) the RCD type — Type AC is now restricted by Reg 531.3.3, so replacement should be Type A or higher per the load mix; (b) the RCD topology — a single-RCD setup is less compliant with Reg 314.1 (one fault should not disable other circuits) than a fully-RCBO consumer unit. The replacement conversation may be 'replace one RCD' or 'upgrade the whole CU to RCBOs' depending on the customer's appetite."
            whyItMatters="An RCD that fails its BS EN 61008 timing test is an EICR safety failure that has nothing to do with the cabling or anything else — the protective device itself has degraded. C2 coding is correct because additional protection (the level of safety the design relied on) is no longer demonstrable. The cost to the customer is small (£20-40 for a replacement RCD plus labour); the cost of not catching it during the EICR could be life-changing if a real fault then occurred."
          />

          <Scenario
            title="Domestic CU upgrade — A4 in force, mixed loads"
            situation="2-bed flat needs a CU upgrade. Existing 17th edition split-load board with main switch + 30 mA RCD on the upper bus only. Loads: standard sockets, induction hob (single phase), LED lighting throughout, a 7 kW EV charger with internal 6 mA DC detection in the carpark."
            whatToDo="Replace with a fully-RCBO consumer unit. Spec: Type A 30 mA RCBOs on every final circuit (sockets, lighting, hob, EV). The EV charger has its own internal 6 mA DC detection so Type A upstream is sufficient — confirmed by the charger's installation manual. Reg 411.3.4 requires 30 mA on lighting circuits — RCBO format satisfies. Selectivity between consumer-unit RCBOs and any DNO-side fuse upstream is not a 3:1 RCD-RCD problem; PSCC and OPD coordination handle that."
            whyItMatters="The EV charger spec sheet is the binding document for upstream RCD type. Don't over-spec to Type B 'just to be safe' — it's 4-5× the cost and provides no additional safety on a charger that already handles smooth DC residual itself. Don't under-spec to Type AC — the lighting LED drivers alone trigger Reg 531.3.3."
          />

          <Scenario
            title="Commercial unit — TT supply, three-phase 22 kW EV charger"
            situation="Light commercial ground-floor retail unit. Supply is TT (own earth electrode, no DNO earth). Loads: lighting, sockets, three-phase VSD-driven HVAC plant, plus a single 22 kW three-phase EV charger added later (no internal DC fault detection — older model)."
            whatToDo="Layered protection. (1) Main switch / fault protection: 100 mA Type S RCD covering whole installation — this satisfies Reg 411.5.3 limb (b) provided Ra × 0.1 ≤ 50 V (i.e. earth electrode resistance ≤ 500 Ω). Test on commissioning. (2) Final-circuit additional protection: Type A 30 mA RCBOs on lighting and sockets; Type F 30 mA RCBOs on HVAC VSD circuits (high-frequency residual); Type B 30 mA RCBO on the 22 kW EV charger (smooth DC from the rectifier). Selectivity: 100 mA Type S upstream / 30 mA downstream = 3.33 ratio ✓."
            whyItMatters="Mixed-load commercial / industrial spaces routinely need at least three different RCD types — getting it wrong means either Type-AC-blind to the load mix OR Type B everywhere costing 4-5× per way. Read each load's installation manual for the binding RCD spec, and let that drive selection — never guess from a price-list."
          />

          <SectionRule />

          <ContentEyebrow>RCD test instruments — what's actually happening</ContentEyebrow>

          <ConceptBlock
            title="Inside an RCD tester"
            plainEnglish="A multifunction RCD tester injects a controlled imbalance current between line and CPC of the protected circuit, ramping or stepping at IΔn and 5×IΔn, while precisely measuring the time from current onset to RCD operation. The result is recorded against the BS EN 61008 / 61009 limits."
            onSite="Connect the tester at any socket on the protected circuit. Set IΔn and waveform type (AC / A / F / B mode). Press TEST. The tester injects current; the RCD trips; the operating time is logged. Reset the RCD and run the 5×IΔn test. Both must pass for the device to be compliant. Modern testers automate the sequence — single button-press runs both tests and stores the results."
          >
            <p>
              The 'no-trip' mode some testers offer uses very short (sub-cycle) test pulses below
              the trip threshold to estimate operating time without actually tripping the RCD.
              Useful for periodic inspections where uninterrupted supply is critical (data centres,
              hospitals); slightly less precise than the trip-the-device method but acceptable for
              verification purposes per Reg 643.8 / GN3. For Type B RCDs, the tester must support
              DC-residual injection — older non-Type-B testers may give erroneously fast readings on
              Type B devices because they inject only AC.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RCDs and emergency / safety circuits</ContentEyebrow>

          <ConceptBlock
            title="When NOT to install an RCD"
            plainEnglish="Some circuits explicitly should NOT have RCD additional protection — circuits whose loss of supply could itself cause danger. Fire-alarm circuits (a tripped RCD silences the alarm during a fire), emergency-lighting circuits (lights out during evacuation), some safety-critical control circuits."
            onSite="The exclusion is specified per-circuit by the relevant Part 7 section or the equipment standard. Fire alarm: BS 5839-1 specifies non-RCD-protected; cable type and routing instead provide the protection. Emergency lighting: BS 5266-1 follows similar logic for the emergency-supply circuit. Where these rules conflict with the general Reg 411.3.3 / 411.3.4 rules, the specialist standard takes precedence — but the design must be documented to show the conflict was considered."
          >
            <p>
              The general principle is the same as the Reg 710.421.1.7 medical-AFDD prohibition:
              loss of supply on a safety-critical circuit could be more dangerous than the
              shock-protection benefit the RCD provides. Designers must understand the hierarchy —
              the general regulations (Reg 411.3.3 / 411.3.4) provide a default; specialist
              standards (Part 7, BS 5839, BS 5266) override the default for specific circuits where
              supply continuity is paramount. Document the design choice on the EIC under Reg 120.3
              (departures) so the rationale is captured.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="The four-question RCD specification"
            plainEnglish="(1) Is RCD additional protection required? (2) What type by waveform? (3) What rating by role? (4) Where in the topology?"
            onSite="Print and bench-tape: (1) Reg 411.3.3 (sockets ≤ 32 A, BA1/BA2 / mobile outdoor) AND Reg 411.3.4 (domestic luminaires, A4) trigger 30 mA. Reg 411.5.3 limit (Ra × IΔn ≤ 50 V) drives TT main-switch sizing. (2) Type AC restricted (Reg 531.3.3) — default Type A; Type F for VSD circuits; Type B for PCEs without simple separation, three-phase VSDs, EV without internal DC detection. (3) 30 mA for additional, 100 mA Type S for TT main switch, higher for industrial selectivity. (4) Reg 551.7.1(d) — sources upstream of RCD; CPC outside the toroid (Reg 531.3.1.201)."
          >
            <p>
              For typical domestic new-build: Type A 30 mA RCBO on every final circuit. For standard
              commercial: Type A 30 mA RCBO on socket / general circuits, Type F or B where the load
              demands it (per the equipment manual). For TT systems: 100 mA Type S as main switch +
              30 mA RCBOs on final circuits with the 3:1 ratio maintaining selectivity. For
              mixed-load three-phase commercial / industrial: detailed RCD-type plan per circuit,
              documented on the design sheet.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'RCD type covers waveform sensitivity. Type AC is now restricted by Reg 531.3.3. Type A is the modern domestic default. Type F adds high-frequency. Type B adds smooth DC.',
              '30 mA additional protection mandatory: Reg 411.3.3 (sockets ≤ 32 A and outdoor mobile equipment) PLUS the new A4 Reg 411.3.4 (domestic luminaire circuits). Only non-domestic socket category (b) admits a documented risk-assessment exception.',
              'Reg 531.3.4.1 product standards: BS EN 61008 (Type AC/A RCCBs), BS EN 61009 (RCBOs), BS EN 62423 (Type F/B). Reg 531.3.4.201 requires devices operable by ordinary persons to be sealed against setting changes.',
              'Test RCDs at IΔn (≤ 300 ms general / ≤ 200 ms BS EN 61008 / ≤ 500 ms Type S) AND at 5×IΔn (≤ 40 ms general / ≤ 150 ms Type S). Both must pass — Reg 643.8.',
              'RCD selectivity (Reg 536.4.1.4): upstream Type S AND IΔn ratio ≥ 3:1. Standard cascade is 100 mA Type S over 30 mA Type A/F/B downstream.',
              "Standing leakage matters — measure with a clamp meter on the protected circuit. Cumulative leakage > 15 mA on a 30 mA RCD circuit causes nuisance trips that look random but aren't.",
              'Three-phase circuits with VSDs / inverter-rectifier loads typically need Type B four-pole RCDs. Verify against the equipment manual; spec down only where the manual permits.',
              "On EICR: an RCD failing its IΔn or 5×IΔn timing test is C2 — replacement required. Don't 'work the mechanism'; replace the device.",
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
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.5 Surge protection devices
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module4Section4;
