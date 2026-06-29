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
} from '@/components/study-centre/learning';
import { RcdArchitectures } from '@/components/study-centre/diagrams/renewableM6';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm6s3-rcd-architecture',
    question:
      'Reg 722.531.2 / 722.531.3.101 sets the RCD architecture for EV circuits. Which two architectures satisfy the regulation?',
    options: [
      'A single Type AC 30 mA RCD on the final circuit, sufficient for any EV charging arrangement',
      'A Type B RCD, or a Type A RCD combined with a 6 mA RDC-DD per BS EN IEC 62955 in the wallbox',
      'A Type F RCD alone, since Type F covers the mixed-frequency current an EV charger produces',
      'Two Type AC RCDs in series, providing redundancy that together cover the DC fault profile',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.531.2 (and 722.531.3.101 for the exception) sets two acceptable architectures. (1) Type B RCD: the RCD on the EV circuit detects AC + pulsating DC + smooth DC fault currents directly. Per BS EN 62423 or BS EN 60947-2. (2) Type A + RDC-DD: a Type A RCD (detects AC + pulsating DC) combined with an RDC-DD (6 mA DC residual current detector per BS EN IEC 62955) integrated into the wallbox. The RDC-DD detects smooth DC fault current that Type A would miss, and signals the wallbox to disconnect. Both architectures cover the same fault profile; choice is typically cost-driven — Type A + RDC-DD often cheaper because the RDC-DD is built into the wallbox.',
  },
  {
    id: 'm6s3-rdc-dd-threshold',
    question:
      'What is the trigger threshold of an RDC-DD per BS EN IEC 62955?',
    options: [
      '30 mA DC — matching the additional-protection threshold used on the AC side',
      '6 mA DC — detecting smooth DC residual current to complement an upstream Type A RCD',
      '100 mA DC — a delayed threshold chosen to avoid nuisance tripping on charging transients',
      '300 mA DC — the same value as a fire-protection RCD on the supply',
    ],
    correctIndex: 1,
    explanation:
      'BS EN IEC 62955 defines the RDC-DD with a 6 mA DC residual current threshold. The 6 mA threshold is set low enough to detect smooth DC faults before they desensitise the upstream Type A RCD. When the RDC-DD trips, it operates the contactor inside the wallbox to disconnect the EV from the supply. Combined with a Type A RCD upstream (handling AC + pulsating DC at 30 mA), the Type A + RDC-DD architecture covers the same fault profile as a single Type B RCD at lower kit cost. UK 2025-26 install reality: many wallboxes (PodPoint, Wallbox Pulsar Plus, EO Mini Pro 3) ship with integrated 6 mA RDC-DD as standard.',
  },
  {
    id: 'm6s3-type-b-cost',
    question:
      'Why is Type A + RDC-DD often preferred over standalone Type B RCD in UK 2025-26 domestic EV installs?',
    options: [
      'Because a standalone Type B RCD cannot be used on a domestic supply, being restricted to three-phase',
      'Type B is ~3-5× the cost of Type A, and a wallbox-integrated RDC-DD lets a cheaper Type A give the same coverage',
      'Because Type B RCDs nuisance-trip on EV charging current and so are avoided wherever possible',
      'Because the Type A + RDC-DD combination gives a faster disconnection time than Type B on the same fault',
    ],
    correctIndex: 1,
    explanation:
      'Type B RCD is significantly more expensive than Type A (~3-5×). The Type A + RDC-DD architecture costs less because: (1) the RDC-DD is integrated into the wallbox and adds modest cost to the wallbox SKU; (2) the upstream RCD/RCBO can be a standard Type A device, which is cheap and widely stocked. Both architectures cover the same fault profile (AC + pulsating DC handled by Type A; smooth DC handled by RDC-DD). The choice is essentially economic. Many UK 2025-26 wallboxes (PodPoint Solo, EO Mini Pro 3, Wallbox Pulsar) ship with integrated RDC-DD. Cert evidence bundle records the architecture chosen and the manufacturer DoC for the RDC-DD.',
  },
  {
    id: 'm6s3-afdd-exception',
    question:
      'Reg 722.421.1.7.201 — AFDD requirement and exception. What does it say?',
    options: [
      'AFDD is mandatory on every EV circuit with no exception, as for a care-home socket-outlet circuit',
      'The AFDD requirement is waived where the equipment conforms to both BS EN 61851 series and BS EN IEC 62196-2',
      'AFDD is never required on an EV circuit because the wallbox electronics inherently suppress arc faults',
      'AFDD is required only on three-phase EV circuits; single-phase domestic wallboxes are always exempt',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.421.1.7.201 — AFDD requirement exception for EV circuits. Standard rule: AFDD per Section 421 / Reg 421.1.7. EV exception: where the charging equipment conforms to BS EN 61851 series AND has socket-outlets / vehicle connectors per BS EN IEC 62196-2, AFDD is not required. The exception recognises that the protective electronics integrated into BS EN 61851-compliant wallboxes already address the arc-fault profile. Both conformities needed simultaneously (conjunctive exception); manufacturer DoC must declare both. Cert evidence bundle records the exception with the manufacturer DoC reference.',
  },
];

const quizQuestions = [
  {
    question:
      'A UK domestic 7 kW Mode 3 wallbox install. The wallbox includes integrated 6 mA RDC-DD per BS EN IEC 62955. Which upstream RCD is correct?',
    options: [
      'Type AC — sufficient because the wallbox RDC-DD covers DC, leaving only AC for the upstream device',
      'Type A RCD (or RCBO) on the dedicated final circuit, the wallbox RDC-DD handling the smooth DC',
      'A Type B RCD upstream as well, so the circuit has both a Type B and the RDC-DD for redundancy',
      'A 100 mA time-delayed RCD, to provide discrimination with the household 30 mA devices',
    ],
    correctAnswer: 1,
    explanation:
      'Wallbox with integrated RDC-DD → Type A upstream RCD is sufficient. The Type A + RDC-DD architecture per Reg 722.531 covers AC + pulsating DC (Type A) and smooth DC (RDC-DD). Many UK 2025-26 wallboxes (PodPoint Solo, EO Mini Pro 3, Wallbox Pulsar Plus) include RDC-DD as standard. Cost saving vs Type B is significant (~£100-200 on the kit). Cert evidence bundle records the wallbox DoC citing RDC-DD per BS EN IEC 62955 + the upstream Type A RCD selection.',
  },
  {
    question:
      'A customer’s preferred wallbox does NOT include an integrated RDC-DD. The installer needs to provide equivalent fault coverage. What is the upstream protection?',
    options: [
      'Type AC RCD on the circuit, since a 30 mA Type AC covers shock protection for any final circuit',
      'Type A RCD alone, accepting that smooth DC faults are too rare to design for on a domestic wallbox',
      'Type B RCD (BS EN 62423 or 60947-2), covering AC, pulsating DC and smooth DC fault currents directly',
      'A 6 mA standalone RDC-DD wired into the consumer unit, in place of any RCD on the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Wallbox without integrated RDC-DD → Type B RCD upstream provides the complete fault profile. Type B per BS EN 62423 (RCD with integral overcurrent protection — RCBO equivalent) or BS EN 60947-2 (circuit-breaker integrating Type B residual current). Type B costs more than Type A (~3-5×) but provides the smooth-DC detection that the RDC-DD-less wallbox lacks. Cert evidence bundle records Type B selection and the rationale (wallbox doesn’t include RDC-DD).',
  },
  {
    question:
      'An installer fits a Type AC RCD on a Mode 3 EV charging circuit (transformerless wallbox, no RDC-DD). EICR three years later — what code applies?',
    options: [
      'Satisfactory — a 30 mA Type AC RCD provides additional protection, so the circuit passes',
      'C2 — potential danger, the Type AC being blind to the smooth DC fault a transformerless wallbox can produce',
      'C3 — improvement recommended only, since the Type AC RCD still operates for ordinary AC faults',
      'FI — further investigation, since the fault profile cannot be assessed without dismantling the wallbox',
    ],
    correctAnswer: 1,
    explanation:
      'Type AC RCD on a transformerless EV wallbox = Code C2 (potential danger). The Type AC RCD only detects AC residual current; it cannot detect smooth DC fault current that a transformerless wallbox could produce in fault conditions. ADS would fail for that fault profile. Reg 712.411.3.2.1.2 and Reg 722.531 both require Type B OR Type A + RDC-DD. Coding: C2 (urgent remediation, not immediate danger — the fault profile is real but the probability of an actual smooth DC fault in any given install year is low). EICR is unsatisfactory; remediation = replace Type AC with Type B, or upgrade wallbox to one with integrated RDC-DD + retain Type A.',
  },
  {
    question:
      'Reg 722.421.1.7.201 AFDD exception — what conformities must the EV charging equipment satisfy for the exception to apply?',
    options: [
      'BS EN 61851 series alone — the connector standard is not part of the AFDD exception',
      'BS EN IEC 62196-2 alone — the Type 2 connector conformity is what waives the AFDD requirement',
      'Both BS EN 61851 series and BS EN IEC 62196-2, declared together — the exception is conjunctive',
      'No exception exists — AFDD is mandatory on every EV charging circuit without qualification',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 722.421.1.7.201 is a conjunctive exception — BOTH BS EN 61851 series AND BS EN IEC 62196-2 conformities required simultaneously. The regulation’s wording links them with AND: "where the EV charging equipment conforms to BS EN 61851 series and incorporates socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2". UK 2025-26 reality: every reputable wallbox brand declares both (they use Type 2 connectors per 62196-2 and conform to 61851-1 + -22). The exception is the standard route; AFDD is rarely fitted on UK domestic EV circuits. Cert evidence bundle records both DoC references.',
  },
  {
    question:
      'The Control Pilot (CP) wire in a Mode 3 install — what does it actually do?',
    options: [
      'Carries the charging current to the vehicle — it is the live conductor of the Type 2 connector',
      'Acts as the protective earth path for the vehicle chassis during charging',
      'Carries a low-voltage PWM signal coordinating plug-in, current-limit and contactor closure between wallbox and vehicle',
      'Carries the neutral return for the single-phase charging circuit',
    ],
    correctAnswer: 2,
    explanation:
      'CP = Control Pilot. ±12 V PWM signal between wallbox and vehicle per BS EN 61851-1 / IEC 61851-1. Function: (1) vehicle plug detection (CP-PE voltage changes from 12 V open-circuit to 9 V when vehicle plugged in); (2) PWM duty cycle announces max available current from wallbox (e.g. 53% duty = 32 A available); (3) vehicle confirms ready-to-charge by transitioning to lower CP voltage; (4) wallbox closes the contactor; (5) charging progresses, CP continues to monitor; (6) any fault or unplug triggers contactor open. Section 6.6 covers CP/PP signalling in depth.',
  },
  {
    question:
      'Why does the Type B + RDC-DD requirement specifically apply to TRANSFORMERLESS EV wallboxes?',
    options: [
      'Because transformerless wallboxes draw more current, so a more sensitive RCD is needed for the higher load',
      'Lacking galvanic isolation, they can feed smooth DC back into the AC supply that only Type B or RDC-DD detects',
      'Because transformerless wallboxes are cheaper, and the regulations require costlier protection to offset that',
      'Because a transformerless design has no neutral connection, so a standard RCD cannot sense the return current',
    ],
    correctAnswer: 1,
    explanation:
      'Transformerless EV chargers lack the AC/DC galvanic isolation that an internal isolating transformer provides. In a fault on the DC side (e.g. insulation failure between DC bus and a touchable part), smooth DC current can flow back into the AC supply through the absence of the transformer barrier. Type AC and Type A RCDs cannot detect smooth DC residual current. Type B (or Type A + RDC-DD per BS EN IEC 62955) covers the smooth-DC profile. The exception in Reg 712.411.3.2.1.2: manufacturer can declare in writing that the wallbox is designed not to feed DC fault currents into the AC supply; with that declaration, Type AC / A is acceptable. UK 2025-26: most modern wallboxes ARE transformerless; the Type B or Type A + RDC-DD architecture is the standard.',
  },
];

const faqs = [
  {
    question: 'Is Type F RCD acceptable for an EV circuit?',
    answer:
      'Type F covers AC + pulsating DC + high-frequency residual current (relevant for frequency converters / VFDs). EV wallboxes don\'t typically produce the high-frequency residual that Type F is designed for. Type F is NOT a substitute for Type B or Type A + RDC-DD on an EV circuit — the smooth-DC profile is what matters. UK 2025-26 install: stick with Type A + RDC-DD or Type B per Reg 722.531. Cert evidence bundle records the specific RCD type and BS EN reference.',
  },
  {
    question: 'How does the RDC-DD inside the wallbox actually trigger disconnection?',
    answer:
      'The RDC-DD is a 6 mA DC residual current detector integrated into the wallbox electronics. On detecting 6 mA DC residual, it operates the wallbox’s internal contactor (the same contactor that switches the EV circuit on and off during normal charging). The wallbox enters a fault state and displays an error code. Some wallboxes auto-recover after the fault clears; others require manual reset. Manufacturer-specific behaviour. The upstream Type A RCD does NOT operate (the fault was DC; Type A can\'t see it); the disconnection is purely from the wallbox’s internal contactor opening.',
  },
  {
    question: 'What\'s the actual cost difference: Type B RCBO vs Type A RCBO + RDC-DD-equipped wallbox?',
    answer:
      'Typical UK 2025-26 prices: Type A RCBO ~£25-40; Type B RCBO ~£100-200 (~3-5× more). Wallboxes WITH integrated RDC-DD cost roughly £30-80 more than the same wallbox WITHOUT RDC-DD. So Type A + integrated RDC-DD path costs ~£25 + £50 (incremental wallbox cost) = ~£75. Type B path costs ~£150 (Type B RCBO) + £0 (wallbox without RDC-DD). Type A + RDC-DD path saves ~£50-75 per install. At install volume, this adds up. Cert evidence bundle records the architecture; either is compliant.',
  },
  {
    question: 'Are there any scenarios where AFDD IS required on an EV circuit?',
    answer:
      'Reg 722.421.1.7.201 conditional exception: BOTH BS EN 61851 conformity AND BS EN IEC 62196-2 conformity must be declared. If either is missing or the wallbox doesn\'t use a Type 2 connector (rare but possible for some industrial / legacy connectors), AFDD per Section 421 / Reg 421.1.7 may still apply. Also for general circuits feeding the wallbox where the wallbox itself isn\'t the load-end device — e.g. a sub-circuit feeding multiple wallboxes via a distribution board. Cert evidence bundle records the AFDD decision.',
  },
  {
    question: 'How is RDC-DD verified at commissioning?',
    answer:
      'Manufacturer-defined test sequence. Most wallboxes have a built-in self-test mode that simulates a 6 mA DC fault to verify the RDC-DD operates and the contactor opens. Some wallboxes include this in the commissioning workflow alongside the OPDD test. The installer triggers the test, observes the wallbox enters fault state, verifies the contactor opened, resets. Cert evidence bundle records the test result. For third-party verification (EICR or audit), the same self-test mode can be re-run periodically.',
  },
];

export default function RenewableEnergyModule6Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'RCD architecture & RDC-DD | Renewable Energy 6.3 | Elec-Mate',
    description:
      'EV circuit RCD architecture per Reg 722.531.2: Type B (BS EN 62423 / 60947-2) OR Type A + RDC-DD (BS EN IEC 62955 6 mA DC). AFDD exception per Reg 722.421.1.7.201 for BS EN 61851 + 62196-2 conforming kit.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · BS 7671:2018+A4:2026 · Reg 722.531 + 722.421"
            title="RCD architecture & RDC-DD — Reg 722.531"
            description="Two acceptable RCD architectures per Reg 722.531: Type B (BS EN 62423 / 60947-2) OR Type A combined with RDC-DD (BS EN IEC 62955 6 mA DC). Why transformerless wallboxes need smooth-DC detection. AFDD conjunctive exception per Reg 722.421.1.7.201."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 722.531 sets the RCD architecture for an EV circuit. Two acceptable paths: (1) Type B RCD per BS EN 62423 or BS EN 60947-2, or (2) Type A RCD + RDC-DD per BS EN IEC 62955.',
              'Type B RCD: detects AC + pulsating DC + smooth DC fault currents directly. Costs ~3-5× more than Type A. Used where the wallbox lacks integrated RDC-DD.',
              'Type A + RDC-DD architecture: Type A (cheap, widely stocked) detects AC and pulsating DC at 30 mA; RDC-DD (built into the wallbox) detects smooth DC at 6 mA. Combined, the same fault profile as Type B at lower kit cost.',
              'BS EN IEC 62955 defines the RDC-DD with a 6 mA DC threshold. The RDC-DD operates the wallbox’s internal contactor on detection — upstream Type A RCD does NOT operate; disconnection is from within the wallbox.',
              'Why this architecture matters: transformerless EV wallboxes can feed smooth DC fault current back into the AC supply. Type AC and Type A RCDs cannot detect smooth DC. Type B or Type A + RDC-DD covers the gap.',
              'Reg 722.421.1.7.201 AFDD conjunctive exception — where the EV charging equipment conforms to BOTH BS EN 61851 series AND BS EN IEC 62196-2 (Type 2 connector), AFDD per Section 421 is NOT required. Both conformities needed simultaneously.',
              'UK 2025-26 reality: many wallboxes (PodPoint Solo, EO Mini Pro 3, Wallbox Pulsar Plus, MyEnergi Zappi) ship with integrated RDC-DD as standard. Type A + integrated RDC-DD is the dominant economic architecture.',
              'Cost comparison: Type B RCBO ~£150 vs Type A RCBO + RDC-DD-equipped wallbox ~£75 incremental. Saving ~£50-75 per install on the Type A + RDC-DD path; cert evidence bundle records the architecture chosen.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 722.531 to select the correct RCD architecture for an EV circuit: Type B OR Type A + RDC-DD.',
              'Verify Type B RCD conformity to BS EN 62423 or BS EN 60947-2 via manufacturer markings + DoC.',
              'Verify RDC-DD conformity to BS EN IEC 62955 + 6 mA DC threshold via wallbox manufacturer DoC.',
              'Explain why transformerless EV wallboxes require Type B or Type A + RDC-DD architecture (smooth DC fault profile).',
              'Apply the manufacturer-declaration exception (Reg 712.411.3.2.1.2) — Type AC / A acceptable where the wallbox is declared not to feed DC fault currents.',
              'Apply Reg 722.421.1.7.201 conjunctive AFDD exception — BS EN 61851 series AND BS EN IEC 62196-2 conformities both required.',
              'Code EICR findings: Type AC RCD on transformerless wallbox = C2; missing RDC-DD or Type B where transformerless wallbox demands one = C2; missing AFDD where exception conditions not met = C3 / FI.',
              'Document architecture choice in cert evidence bundle — RCD type, manufacturer DoC, BS EN reference, AFDD position, RDC-DD presence and test result.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Type B is one device. Type A + RDC-DD is two devices that do the same job. Same fault coverage, different cost.
          </Pullquote>

          <ContentEyebrow>Why EV circuits need smooth-DC detection</ContentEyebrow>

          <ConceptBlock
            title="The smooth-DC fault profile on transformerless wallboxes"
            plainEnglish="Modern UK 2025-26 EV wallboxes are overwhelmingly TRANSFORMERLESS — no internal isolating transformer between the AC supply input and the DC charging-side electronics. The transformerless design is more efficient and smaller, but it lacks the galvanic isolation that a transformer-isolated design provides. In fault conditions, smooth DC fault current can flow from the DC side back into the AC supply."
            onSite="Standard Type AC RCD only detects AC residual current. Type A detects AC + pulsating DC. Neither sees smooth DC. The lost protection on a smooth-DC fault means ADS can fail — Reg 722.531 requires the upgraded architecture to cover the gap."
          >
            <p>The smooth-DC fault scenario:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Wallbox is transformerless</strong> — no
                galvanic isolation between AC input and DC electronics. UK 2025-26
                default
              </li>
              <li>
                <strong className="text-white">Internal DC fault</strong> — insulation
                failure between the wallbox’s DC bus and a touchable conductive
                part; or between vehicle-side DC and chassis
              </li>
              <li>
                <strong className="text-white">Smooth DC current flows</strong> — the
                fault current pattern is smooth DC (steady-state DC, not pulsating).
                Visible to a smooth-DC-sensitive detector
              </li>
              <li>
                <strong className="text-white">Type AC RCD blind</strong> — Type AC
                operates only on sinusoidal AC residual current. Smooth DC: zero
                response
              </li>
              <li>
                <strong className="text-white">Type A RCD blind</strong> — Type A
                handles AC + pulsating DC. Smooth DC: zero response
              </li>
              <li>
                <strong className="text-white">Type B detects directly</strong> — Type
                B is specifically designed to handle the full waveform set: AC,
                pulsating DC, smooth DC. Single device covers all cases
              </li>
              <li>
                <strong className="text-white">RDC-DD detects directly</strong> — a
                separate 6 mA DC residual detector inside the wallbox; on
                detection, opens the wallbox contactor. Combined with upstream Type
                A: same coverage as Type B
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.531 — RCD architecture for EV circuits"
            clause="Where a PCE does not provide at least simple separation between AC and DC sides, and no transformer winding separation exists and the manufacturer does not state Type B is unnecessary, the RCD shall be Type B in accordance with BS EN 62423 or BS EN 60947-2. Alternative: Type A RCD combined with RDC-DD per BS EN IEC 62955 integrated within the EV charging equipment."
            meaning="Reg 722.531 lays out the two acceptable RCD architectures for EV circuits. Type B alone covers the full fault profile (AC + pulsating DC + smooth DC). Type A + RDC-DD combines a cheap Type A upstream RCD with an integrated 6 mA DC detector inside the wallbox — same coverage at lower kit cost. The exception (manufacturer declares no DC fault current possible) is rare in UK 2025-26 since most wallboxes are transformerless. Cert evidence bundle records the architecture choice + BS EN references + manufacturer DoC."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The two architectures in practice</ContentEyebrow>

          <Pullquote>
            Type B = one expensive device. Type A + RDC-DD = two cheaper devices. UK 2025-26 default = Type A + integrated RDC-DD.
          </Pullquote>

          <ConceptBlock
            title="Architecture 1 — Type B RCD upstream"
            plainEnglish="A single Type B RCD (typically as a Type B RCBO on the dedicated EV final circuit in the consumer unit) provides the complete fault profile coverage. Type B detects AC, pulsating DC, and smooth DC fault currents at the configured threshold (typically 30 mA for ADS additional protection)."
            onSite="Single device, single test, single failure mode. Slightly more expensive in kit terms but simpler to commission and maintain. Used where the wallbox doesn’t include integrated RDC-DD, or where the installer prefers a single-device architecture for clarity."
          >
            <p>Type B details:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Standards</strong> — BS EN 62423
                (RCD with integral overcurrent — i.e. RCBO equivalent) or BS EN
                60947-2 (general circuit-breaker with integrated Type B residual
                current detection)
              </li>
              <li>
                <strong className="text-white">Detection</strong> — AC sinusoidal
                + pulsating DC + smooth DC residual currents. Sensitive to 6 mA
                DC component within the overall threshold
              </li>
              <li>
                <strong className="text-white">Threshold</strong> — typically 30 mA
                for the ADS additional protection on a Mode 3 EV circuit. Some
                three-phase commercial installs use 100 mA / 300 mA upstream
                with 30 mA at the wallbox-side
              </li>
              <li>
                <strong className="text-white">Cost</strong> — ~3-5× a Type A RCBO
                of equivalent current rating. UK 2025-26 Type B RCBO ~£150-200
              </li>
              <li>
                <strong className="text-white">Testing</strong> — requires Type
                B-capable RCD test instrument (Megger MFT1731, Fluke 1664 FC,
                Kewtech KT64DL or equivalent). Older Type AC / A-only testers
                cannot correctly verify Type B
              </li>
              <li>
                <strong className="text-white">When to choose</strong> — wallbox
                model doesn’t include integrated RDC-DD; commercial sites with
                high-volume EV charging; installer preference for single-device
                architecture; specific manufacturer recommendation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Architecture 2 — Type A + RDC-DD (UK 2025-26 dominant)"
            plainEnglish="Type A RCD (or Type A RCBO) on the upstream EV final circuit; the wallbox includes a 6 mA DC RDC-DD per BS EN IEC 62955. Type A handles AC + pulsating DC; RDC-DD handles smooth DC. Combined coverage matches Type B at lower kit cost."
            onSite="The dominant UK 2025-26 architecture because most wallboxes (PodPoint, Wallbox Pulsar, EO Mini Pro, MyEnergi Zappi etc.) include integrated RDC-DD as standard. Cost saving of ~£50-75 per install vs Type B. Cert evidence bundle records both the upstream Type A and the wallbox’s RDC-DD DoC."
          >
            <p>Type A + RDC-DD details:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Type A standards</strong> — BS EN
                61008 (RCD without overcurrent) or BS EN 61009 (RCBO with
                integral overcurrent). Both detect AC + pulsating DC residual
                currents
              </li>
              <li>
                <strong className="text-white">RDC-DD standard</strong> — BS EN IEC
                62955 — specifically defines the 6 mA DC threshold device
                integrated into EV charging equipment
              </li>
              <li>
                <strong className="text-white">Mechanism</strong> — Type A
                operates on AC + pulsating DC at 30 mA (separately from the
                RDC-DD). RDC-DD operates on smooth DC at 6 mA inside the
                wallbox. RDC-DD operation opens the wallbox’s internal
                contactor — upstream Type A doesn’t need to operate (the
                fault was smooth DC, invisible to Type A)
              </li>
              <li>
                <strong className="text-white">Test sequence</strong> — Type A
                tested via standard RCD tester at install. RDC-DD tested via
                the wallbox’s built-in self-test mode (manufacturer-defined;
                simulates 6 mA DC fault). Cert evidence bundle records both
                tests
              </li>
              <li>
                <strong className="text-white">Cost</strong> — Type A RCBO ~£25-40;
                incremental wallbox cost for integrated RDC-DD ~£30-80. Total
                architecture cost ~£75 vs Type B at ~£150
              </li>
              <li>
                <strong className="text-white">Common brands with integrated
                  RDC-DD (UK 2025-26)</strong> — PodPoint Solo, EO Mini Pro 3,
                Wallbox Pulsar Plus, MyEnergi Zappi, Hypervolt, Andersen,
                Ohme. Verify via DoC on the specific model
              </li>
            </ul>
          </ConceptBlock>

          <RcdArchitectures caption="The two compliant EV RCD architectures — a Type B RCD, or a Type A RCD plus a residual-DC detecting device (RDC-DD) for the smooth-DC requirement." />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>RCD selectivity, three-phase architecture & the Type B internals</ContentEyebrow>

          <Pullquote>
            Type B inside the device is a sum-of-current toroid plus a smooth-DC sensitive Hall-effect coil. Two detection mechanisms on one core.
          </Pullquote>

          <ConceptBlock
            title="How a Type B RCD actually detects smooth DC"
            plainEnglish="Inside a Type B RCD: a sum-of-current toroid (the conventional method, sums L and N currents to spot residual AC + pulsating DC) PLUS a Hall-effect coil oriented in the toroid (sensitive to smooth DC magnetic flux). The two detection methods feed a comparator; either triggering above threshold opens the contacts."
            onSite="The installer doesn’t see this internal complexity — the device is just a packaged BS EN 62423 / 60947-2 product. But understanding the dual mechanism explains why Type B costs more (extra electronic detection coil + comparator) and why some test instruments can’t correctly verify it (they only generate AC waveforms; the smooth-DC path isn’t exercised). Manufacturer DoC declares conformity to BS EN 62423 or BS EN 60947-2 — keep the DoC in the cert evidence bundle."
          >
            <p>Type B internal detection:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sum-of-current toroid</strong> — conventional method;
                sums L and N currents through a toroidal core; net flux drives a secondary winding whose voltage is the residual current signal. Sensitive to AC + pulsating DC
              </li>
              <li>
                <strong className="text-white">Hall-effect coil</strong> — additional sensor oriented in the same toroid; detects smooth DC magnetic flux directly. Sensitive to smooth DC fault current (the gap that Type AC and Type A miss)
              </li>
              <li>
                <strong className="text-white">Comparator electronics</strong> — combines the two
                detection signals; either triggering above threshold (30 mA on the primary; smaller smooth-DC threshold typically in the 6 mA region) opens the device contacts
              </li>
              <li>
                <strong className="text-white">Threshold split</strong> — BS EN 62423 sets the
                30 mA primary residual threshold; smooth-DC threshold separately specified to coordinate with the RDC-DD-DD coverage profile
              </li>
              <li>
                <strong className="text-white">Test instrument
                  requirement</strong> — Reg 643.1 instruments per BS EN 61557; specifically Type B-capable testers generate the smooth-DC test waveform. Megger MFT1731, Fluke 1664 FC, Kewtech KT64DL etc. Older AC / A-only testers cannot exercise the Hall-effect path
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase EV install RCD architecture"
            plainEnglish="Three-phase 22 kW Mode 3 wallbox = 32 A per phase + neutral + PE. RCD architecture extends from single-phase: 4-pole Type B RCBO OR 4-pole Type A RCBO + RDC-DD in the (three-phase) wallbox. Same logic as single-phase; physical device count increases."
            onSite="Three-phase wallbox brands (Easee Home 22 kW, EO Charging Genius, MyEnergi Zappi 22 kW, Tesla Wall Connector Gen 3) declare RCD architecture in their DoC. Choose the matching upstream device. Site verification of Zs becomes per-phase (each phase’s loop impedance independently); Reg 411 ADS verified against Table 41.3 for the device characteristic."
          >
            <p>Three-phase specifics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">4-pole device</strong> — L1 + L2 + L3 + N
                switched together. Both Type B RCBOs and Type A RCBOs available in 4-pole form
              </li>
              <li>
                <strong className="text-white">Per-phase Zs measurement</strong> — Reg 411
                disconnection time verified against each phase’s measured Zs vs Table 41.3
              </li>
              <li>
                <strong className="text-white">Phase imbalance</strong> — three-phase wallboxes
                deliver balanced load when charging (32 A on each phase simultaneously); the supply doesn’t experience large imbalance from the EV alone
              </li>
              <li>
                <strong className="text-white">DNO notification</strong> — three-phase installs
                often above G98 notification thresholds; require G98 / G99 notification + DNO approval before commissioning. Cert evidence bundle records the DNO correspondence
              </li>
              <li>
                <strong className="text-white">Cost</strong> — 4-pole Type B RCBO typically
                3-5× the cost of single-pole Type B; multiply through for 4 poles + the higher Type B premium = ~£400-£700 for a 4-pole Type B RCBO vs ~£150 for single-phase
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="RCD selectivity / discrimination on the EV circuit"
            plainEnglish="Selectivity = the upstream device only operates if a downstream device fails to clear the fault first. On an EV install, the 30 mA dedicated RCBO should operate before any 100 mA / 300 mA main-incomer RCD upstream. Discrimination prevents nuisance whole-installation trips from EV-side faults."
            onSite="Verify selectivity at commissioning: the 30 mA EV RCBO trips on a small earth fault; the 100 mA upstream stays closed. Where the customer has a 100 mA main-incomer RCD (common UK 2025-26 pattern on older / Hager-style consumer units), the EV install’s 30 mA RCBO should be properly selective. Modern type-S (selective / time-delayed) 100 mA devices upstream make this reliable."
          >
            <p>Selectivity considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Threshold ratio</strong> — upstream device threshold
                ≥ 3× downstream. 30 mA EV RCBO + 100 mA main-incomer = 3.3× ratio — usually adequate
              </li>
              <li>
                <strong className="text-white">Time delay</strong> — upstream type-S (Selective)
                device adds a short trip delay (~30-300 ms) that lets the downstream device clear first
              </li>
              <li>
                <strong className="text-white">Type compatibility</strong> — if downstream is Type B
                (smooth-DC capable), upstream should also be at least Type A — otherwise smooth-DC fault current passes through both and trips the upstream first
              </li>
              <li>
                <strong className="text-white">No upstream RCD scenario</strong> — modern consumer
                units with all-RCBO arrangement (each circuit on its own RCBO, no main-incomer RCD) avoid the selectivity question entirely
              </li>
              <li>
                <strong className="text-white">Commissioning verification</strong> — operate the
                30 mA EV test button; confirm only the EV RCBO trips, not the upstream device. Record in cert evidence bundle
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>AFDD and the Reg 722.421.1.7.201 exception</ContentEyebrow>

          <ConceptBlock
            title="AFDD — Arc Fault Detection Device — and the EV exception"
            plainEnglish="Section 421 / Reg 421.1.7 generally requires AFDD (Arc Fault Detection Device) on AC final circuits in dwellings to detect series and parallel arc faults. EV circuits in 2025-26 frequently invoke the Reg 722.421.1.7.201 exception that waives the AFDD requirement under specific conditions."
            onSite="Most UK 2025-26 EV installs invoke the exception — the wallbox’s BS EN 61851 conformity + the Type 2 connector’s BS EN IEC 62196-2 conformity collectively satisfy the regulatory carve-out. Cert evidence bundle records the exception with both DoC references."
          >
            <p>How the exception works:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">General rule</strong> — Section
                421 / Reg 421.1.7 requires AFDD on AC final circuits in
                dwellings (with various carve-outs and conditions). EV
                circuits in dwellings would fall under this general
                requirement
              </li>
              <li>
                <strong className="text-white">Reg 722.421.1.7.201
                  exception</strong> — where the EV charging equipment
                conforms to BS EN 61851 series AND incorporates
                socket-outlets or vehicle connectors conforming to BS EN IEC
                62196-2, AFDD is NOT required on the EV circuit
              </li>
              <li>
                <strong className="text-white">Conjunctive
                  exception</strong> — BOTH conformities required
                simultaneously. Manufacturer DoC must declare both. If only
                BS EN 61851 declared, or only BS EN IEC 62196-2 declared,
                exception doesn’t apply and AFDD is needed
              </li>
              <li>
                <strong className="text-white">Why the exception
                  exists</strong> — BS EN 61851-compliant wallboxes
                integrate electronic protection that addresses the same
                arc-fault profile that AFDD detects. The exception
                recognises this without forcing a duplicate device
              </li>
              <li>
                <strong className="text-white">UK 2025-26 reality</strong> —
                virtually all reputable wallbox brands declare both
                conformities. The exception is the standard route; AFDD
                rarely fitted on UK domestic EV circuits. Where the
                installer is uncertain about the wallbox’s declarations,
                fitting AFDD is the conservative choice
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — records the AFDD decision: exception
                invoked with both DoC references, OR AFDD fitted with
                Section 421 compliance
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.421.1.7.201 — AFDD exception for EV circuits"
            clause="Where the EV charging equipment conforms to BS EN 61851 series and incorporates socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2, the requirement to provide AFDD per Section 421 / Reg 421.1.7 is waived."
            meaning="Conjunctive exception — both BS EN 61851 series conformity AND BS EN IEC 62196-2 conformity required simultaneously. Most UK 2025-26 wallboxes declare both (61851-1 + -22 for AC; 62196-2 for the Type 2 connector). The exception applies; AFDD not required. Where either conformity is missing, AFDD per Section 421 still required. Cert evidence bundle records both DoC references and the AFDD decision."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="UK suburban customer — PodPoint Solo install"
            situation="Customer wants a 7 kW Mode 3 wallbox. Chose PodPoint Solo — UK 2025-26 popular budget wallbox. PodPoint Solo DoC declares: BS EN 61851-1 + BS EN 61851-22 conformity (AC charging station); BS EN IEC 62196-2 conformity (Type 2 connector); BS EN IEC 62955 integrated 6 mA RDC-DD; BS EN IEC 62752 ICCPD (the in-cable detection device standard); OPDD per Reg 722.411.4(d)."
            whatToDo="Architecture decision: Type A + RDC-DD (PodPoint Solo includes integrated RDC-DD per BS EN IEC 62955). Upstream: Type A RCBO 32 A on dedicated CU way. AFDD: exception invoked per Reg 722.421.1.7.201 (both BS EN 61851 and BS EN IEC 62196-2 conformities declared on the DoC). Earthing-tree: route (d) OPDD (PodPoint Solo includes OPDD). Cert evidence bundle entries: PodPoint Solo DoC (citing 61851 + 62196-2 + 62955 + OPDD); Type A RCBO selection; AFDD exception rationale; commissioning RDC-DD self-test result; commissioning OPDD self-test result. Total install cost on the protection layer: ~£75 (Type A RCBO + incremental PodPoint cost vs Type B alternative)."
            whyItMatters="Bread-and-butter UK 2025-26 install. The PodPoint Solo (and similar wallboxes from EO, Wallbox, MyEnergi etc.) ship with the full protection stack integrated — RDC-DD, OPDD, BS EN 61851 conformity, BS EN IEC 62196-2 connector. The installer’s job is to verify the DoC, select the matching upstream Type A RCBO, and document the architecture in the cert evidence bundle. This is the dominant UK 2025-26 path; Sections 6.2 (earthing), 6.3 (RCD architecture), 6.6 (connector/signalling) all converge on the wallbox DoC as the verification source."
          />

          <Scenario
            title="Customer-supplied legacy wallbox without RDC-DD"
            situation="Customer bought a wallbox second-hand from a friend — older model (2018 vintage) that doesn’t include integrated RDC-DD. Customer wants the installer to fit it."
            whatToDo="Architecture decision: Type B RCBO on the upstream EV circuit (older wallbox without RDC-DD requires the single-device Type B path). Verify Type B RCBO conformity to BS EN 62423 (or BS EN 60947-2 if integrated breaker). Cost: ~£150 for the Type B RCBO vs ~£25 for a Type A — customer pays the £125 difference because of the older wallbox choice. AFDD: check the older wallbox’s DoC — if it declares BS EN 61851 + BS EN IEC 62196-2, exception still applies; if not, AFDD per Section 421 required. Earthing-tree: check the older wallbox for OPDD — if present, route (d); if not, route (c) TT electrode required. Customer education: explain that the older wallbox shifts the install to a more expensive protection architecture; offer to swap to a current model with integrated RDC-DD + OPDD if the customer prefers. Cert evidence bundle: Type B RCBO selection rationale + older wallbox limitations + customer-informed-decision sign-off."
            whyItMatters="Customer-supplied or legacy wallbox installs are real edge cases. The installer’s job is to identify what protective architecture the wallbox supports natively and add the upstream protection that completes the picture. Older wallboxes without integrated RDC-DD shift the cost to Type B upstream; older wallboxes without OPDD shift the cost to TT electrode. Customer must understand the trade-off — they’re saving wallbox cost but paying it back in install cost. Cert evidence bundle records the decisions."
          />

          <CommonMistake
            title="Fitting a Type AC RCD on a transformerless EV wallbox install"
            whatHappens="Installer reuses a Type AC RCD from existing stock (or doesn’t check the wallbox’s transformerless / RDC-DD status). The customer’s EV install runs fine in normal operation. Two years later, an internal insulation failure in the wallbox’s DC electronics creates a smooth DC fault. The Type AC RCD doesn’t see it. ADS fails; the touchable parts of the wallbox cabinet are now at hazardous potential. EICR at year 5 catches the Type AC error — C2 (potential danger) coding; customer pays for the remediation."
            doInstead="Check the wallbox’s transformerless status and RDC-DD inclusion BEFORE quoting. Transformerless without RDC-DD = Type B upstream. Transformerless with integrated RDC-DD = Type A upstream is fine. The £100 cost of the wrong RCD now is much cheaper than the £400+ remediation cost two years later. Cert evidence bundle records the wallbox DoC + the matching upstream RCD selection. Reg 722.531 + Reg 712.411.3.2.1.2 both apply."
          />

          <CommonMistake
            title="Forgetting the AFDD conjunctive exception requires BOTH conformities"
            whatHappens="Installer assumes the Reg 722.421.1.7.201 AFDD exception applies because the wallbox declares BS EN 61851 conformity — skips the AFDD. Doesn’t check the BS EN IEC 62196-2 declaration. Wallbox in question uses a proprietary connector (rare but possible on some specialist commercial / fleet installs); BS EN IEC 62196-2 NOT declared. Exception doesn’t apply; AFDD required per Section 421 / Reg 421.1.7 and is missing."
            doInstead="Verify BOTH conformities on the wallbox DoC before invoking the exception. Manufacturer DoC must explicitly cite BS EN 61851 series AND BS EN IEC 62196-2. If either is missing or unclear, ask the manufacturer for clarification OR fit the AFDD as the conservative path. Cert evidence bundle records both DoC references with page / paragraph references. Section 421 AFDD costs ~£50-100 — modest relative to the exception’s documentation burden."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 722.531 sets the RCD architecture for EV circuits — two acceptable paths: Type B RCD per BS EN 62423 / 60947-2, or Type A + RDC-DD per BS EN IEC 62955.',
              'Type B RCD detects AC + pulsating DC + smooth DC at 30 mA threshold. Single device; covers the full transformerless wallbox fault profile.',
              'Type A + RDC-DD architecture: Type A upstream (AC + pulsating DC at 30 mA) + RDC-DD integrated in wallbox (smooth DC at 6 mA per BS EN IEC 62955). Combined coverage matches Type B at lower kit cost.',
              'Why this matters: transformerless wallboxes can feed smooth DC fault current back into the AC supply. Type AC and Type A RCDs are BLIND to smooth DC. Type B or RDC-DD covers the gap.',
              'Cost comparison: Type B RCBO ~£150; Type A RCBO + RDC-DD-equipped wallbox incremental ~£75. UK 2025-26 default is Type A + integrated RDC-DD because most wallboxes (PodPoint, Wallbox, EO, MyEnergi etc.) include RDC-DD as standard.',
              'RDC-DD operates the wallbox’s internal contactor on detection; upstream Type A RCD does NOT operate (the fault was smooth DC, invisible to Type A). Cert evidence bundle records both layers.',
              'Reg 712.411.3.2.1.2 manufacturer-declaration exception — Type AC / A acceptable where the wallbox is declared not to feed DC fault currents into the AC supply. Rare in UK 2025-26 (most wallboxes ARE transformerless).',
              'Reg 722.421.1.7.201 AFDD conjunctive exception — BOTH BS EN 61851 series AND BS EN IEC 62196-2 conformities required simultaneously. Most UK 2025-26 wallboxes meet both; AFDD rarely fitted on EV circuits.',
              'Code EICR findings: Type AC on transformerless wallbox = C2 (potential danger, urgent remediation). Missing RDC-DD where wallbox doesn’t support it AND Type A upstream = C2. Missing AFDD where exception doesn’t apply = C3 / FI.',
              'Cert evidence bundle: wallbox DoC (citing all standards including 61851 + 62196-2 + 62955 if integrated RDC-DD), upstream RCD type and BS EN reference, AFDD decision (exception invoked or device fitted), commissioning test results for both Type A and integrated RDC-DD.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-6-section-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Earthing tree — PME-on-EV, TN-S, TT, OPDD
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-6-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 Cable, RCBO & dedicated final circuit
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
