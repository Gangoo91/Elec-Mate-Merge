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
    id: 'm2s4-a4-dates',
    question:
      'A customer rings on 12 May 2026 asking whether their new-build EIC must be issued against A3:2024 or A4:2026. What is the correct answer?',
    options: [
      'A3:2024 — A4 only takes effect when A3 is withdrawn on 15 October 2026',
      'A4:2026 — published 15 April 2026 and in force from that date for new design; A3 is withdrawn 15 October 2026',
      "Either is acceptable — the installer's choice for the whole transition window",
      'Neither — there is a six-month consultation period before A4 is enforceable',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671:2018+A4:2026 was published 15 April 2026 and is the current edition for new design from that date. Installations whose design started before 15 April 2026 may continue under A3:2024 up to 15 October 2026, after which A3 is withdrawn entirely. From 16 October 2026 every new design and every cert must reference A4 — there is no parallel acceptance after that date.',
  },
  {
    id: 'm2s4-411-3-4-scope',
    question:
      'Which of the following AC final circuits MUST have 30 mA RCD additional protection under the new Reg 411.3.4 (A4)?',
    options: [
      'A 6 A lighting circuit in a private dwelling kitchen',
      'A 16 A lighting circuit in a commercial office',
      'A 10 A emergency-luminaire circuit in a hospital ward',
      'A 6 A external floodlight circuit in a private car park',
    ],
    correctIndex: 0,
    explanation:
      'Reg 411.3.4 (NEW in A4) is scoped explicitly to "domestic (household) premises". Every AC final circuit supplying luminaires inside a private dwelling — kitchen, hallway, bedroom, bathroom, garage, anywhere — must be on a 30 mA RCD or RCBO. Commercial offices, healthcare settings, and external non-domestic locations remain governed by Reg 411.3.3 / Section 559 / Part 7 special-location rules instead.',
  },
  {
    id: 'm2s4-afdd-mandates',
    question:
      'Reg 421.1.7 (A4) — for which premises is AFDD protection MANDATED rather than recommended?',
    options: [
      'All single-family dwellings over £500,000 in value',
      'HMOs, purpose-built student accommodation, care homes and high-rise residential buildings (HRRBs ≥ 18 m or ≥ 7 storeys)',
      'Only premises with timber-frame construction',
      'All commercial offices fitted out after 15 April 2026',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 elevates AFDD from a "recommendation" (per A2:2022) to a mandatory ("shall") requirement on AC final circuits up to 32 A in higher-risk sleeping accommodation: HMOs (Houses in Multiple Occupation), purpose-built student accommodation, care/nursing homes, and HRRBs (high-rise residential buildings — typically ≥ 18 m or ≥ 7 storeys per Building Regulations). Single-family dwellings remain a "recommendation" under Reg 421.1.7 — strong CPD case for fitting them anyway.',
  },
  {
    id: 'm2s4-section-443-deletion',
    question:
      'Section 443 (overvoltage protection) — what was the most significant A4 change to its application route?',
    options: [
      'Section 443 has been deleted entirely',
      'The risk-assessment method (formerly Reg 443.5) AND Annex A443 have been DELETED — designers must now use the consequence-based Reg 443.4.1 route to decide whether SPDs are required',
      'SPDs are now banned in domestic premises',
      'Surge protection now only applies to TT installations',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 deletes the old quantitative risk-assessment formula (the calculated CRL value, formerly Reg 443.5 and Annex A443). Designers can no longer "calculate their way out" of providing SPDs. Instead, Reg 443.4.1 lists the consequence limbs — (a) serious injury to, or loss of, human life; (c) significant financial or data loss (limb (b) was deleted by the A2:2022 May-2023 corrigendum) — and where either applies, SPDs SHALL be installed. For all other cases, protection shall be provided unless the owner declares it is not required because any loss or damage is tolerable. The default for typical UK installations is now: fit SPDs at the origin unless there is a documented reason not to.',
  },
  {
    id: 'm2s4-ev-pen-ban',
    question:
      'You are installing an EV charger on a TN-C-S (PME) supply. Reg 722.312.2.1 (A4) directly affects the EV circuit — what does it require?',
    options: [
      'A separate 30 mA Type B RCD for every EV connector',
      'The EV-charging circuit shall NOT include a PEN conductor — split N and PE before the circuit, or apply one of the listed alternative measures',
      'The EV charger must be fed through an isolating transformer',
      'A maximum cable run of 10 m to the charge point',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.312.2.1 (carried into A4) is unambiguous: a circuit supplying charging equipment for electric vehicles in a TN system shall NOT include a PEN conductor. The reason is the open-PEN failure mode — an open PEN with load on the supply elevates every Class I exposed metal part, including a metal-bodied EV connected via a Class I charger, to near-line voltage. The fix is to bring only PE (not PEN) to the charger, OR apply an alternative measure listed in Section 722 (open-PEN protection device, separate earth electrode with documented impedance, etc.).',
  },
  {
    id: 'm2s4-bidirectional-protection',
    question:
      'A new domestic dwelling has a 6 kWp PV array with battery storage feeding back through the consumer unit. Reg 530.3.201 (A4) requires consideration of which device characteristic?',
    options: [
      'The protective device must be Type B RCD',
      'The protective device must be suitable for bidirectional current flow — confirm via the manufacturer that the OCPD/RCD/RCBO is rated for current flow in either direction',
      'A 100 kA fault rating',
      'Only mechanical interlocking is required — no electrical changes',
    ],
    correctIndex: 1,
    explanation:
      'Reg 530.3.201 (A4) requires the designer to consider whether protective devices are suitable for bidirectional current flow when the circuit can carry current in either direction (PV/battery export, V2G/V2H, micro-CHP). Most legacy MCBs and many RCBOs are tested for unidirectional flow only. Manufacturer documentation must confirm the device is rated for bidirectional service — and the cert form now has a field for it.',
  },
  {
    id: 'm2s4-551-7-1-d',
    question:
      'Reg 551.7.1(d) (A4) — what specific arrangement does it PROHIBIT for a parallel-operating generation source?',
    options: [
      'Connecting any generator with rated output above 10 kW',
      'Connecting the parallel source on the LOAD side of an upstream RCD',
      'Using single-phase generators on three-phase supplies',
      'Bonding the generator chassis to the consumer unit MET',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.7.1(d) (A4) explicitly prohibits a parallel-source connection on the load side of an upstream RCD. The reason is that injected current from the source can mask a residual fault current the RCD is meant to detect, or unbalance the RCD core and prevent it from operating. The compliant arrangement is to connect the parallel source on the SUPPLY side of any upstream RCD (typically at the main distribution busbar before the RCDs/RCBOs), with each downstream way RCD-protected on its own.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A4:2026 was published 15 April 2026. What is the latest date on which a new design may still be issued under A3:2024?',
    options: [
      '14 April 2026 — the day before A4 publication',
      '15 October 2026 — A3 is withdrawn on this date and from 16 October every new design must reference A4',
      '31 December 2026 — full calendar-year transition',
      '15 April 2027 — one year after A4 publication',
    ],
    correctAnswer: 1,
    explanation:
      'The transition arrangement: A4:2026 is in force from publication on 15 April 2026 for any new design. Designs whose work started before that date may continue and certify under A3:2024 up to 15 October 2026. From 16 October 2026 A3 is withdrawn — every new design and every cert form must reference A4. Old A3 certs already issued remain valid evidence of compliance at the time they were issued; they are not retrospectively invalidated.',
  },
  {
    id: 2,
    question:
      'Reg 411.3.4 (NEW in A4) — which statement is correct about its scope and exceptions?',
    options: [
      'Applies to all premises; risk assessment exception available per Reg 411.3.3(b)',
      'Applies to domestic (household) premises only; no exception — every AC final circuit supplying luminaires must have 30 mA RCD additional protection',
      'Applies only to bathroom and kitchen lighting circuits',
      'Applies only to luminaires fitted with LED drivers',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.3.4 reads: "Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires." It is a "shall", scoped to dwellings, with NO exception — unlike Reg 411.3.3(b) which permits a documented risk-assessment exception for non-domestic socket circuits. From 15 April 2026 every new dwelling lighting circuit is on an RCD or RCBO.',
  },
  {
    id: 3,
    question:
      'Reg 421.1.7 (A4) — which combination of premises has the AFDD requirement upgraded from "recommendation" to MANDATORY?',
    options: [
      'All commercial offices and all retail premises',
      'HMOs, purpose-built student accommodation, care homes, and HRRBs (high-rise residential buildings)',
      'Only listed buildings and heritage assets',
      'All premises with PV installations regardless of occupancy type',
    ],
    correctAnswer: 1,
    explanation:
      'A4 elevates AFDD requirements for higher-risk sleeping accommodation. Mandatory ("shall") on AC final circuits up to 32 A in: HMOs, purpose-built student accommodation, care/nursing homes, and HRRBs (typically ≥ 18 m or ≥ 7 storeys). For single-family dwellings, holiday accommodation, hotels and most commercial premises, AFDDs remain a "strongly recommended" — meaning a documented departure under Reg 120.3 is needed if not fitted. The cert form schedule of inspection has a new item 4.23 to record AFDD presence/absence and column 30 in the schedule of test results captures the AFDD test result.',
  },
  {
    id: 4,
    question: 'Section 419 — what is its purpose and when does it apply?',
    options: [
      'It is a deleted section with no current application',
      'It is a group of regulations covering ALTERNATIVE protective measures where automatic disconnection of supply (ADS) is not feasible — e.g. Class II zones, electrical separation, equipotential local zones',
      'It defines the maximum cable lengths for TN-C-S installations',
      'It applies only to industrial 110 V CTE supplies',
    ],
    correctAnswer: 1,
    explanation:
      'Section 419 collects the alternative protective measures used where ADS cannot be guaranteed — typically because Zs cannot be brought low enough, the supply earthing is unavailable, or the load profile makes RCDs nuisance-trip prone. Reg 419.1 lists the measures: protection by use of Class II equipment or equivalent (per Section 412), protection by electrical separation (Section 413), protection by non-conducting location, and protection by earth-free local equipotential bonding. The designer must state which measure applies and document why ADS was not feasible — the cert has a free-text field for this.',
  },
  {
    id: 5,
    question:
      'On a parallel-source installation (PV with battery export), Reg 551.7.1(d) (A4) PROHIBITS connecting the source where?',
    options: [
      'On the supply side of the main switch',
      'On the LOAD side of an upstream RCD — because injected source current can mask residual currents the RCD is meant to detect',
      'On a circuit shorter than 5 metres',
      'On any 3-phase supply',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 551.7.1(d) is a direct response to nuisance-trip and missed-fault scenarios documented in real PV/battery installations. Connecting the parallel source on the load side of an upstream RCD means the RCD sees the difference between line-side and load-side currents distorted by the injected source — fault currents can be masked, or the device can trip without a real fault. The compliant arrangement: parallel source connects on the supply side of any RCD, with each downstream final circuit having its own RCD/RCBO providing additional protection.',
  },
  {
    id: 6,
    question:
      'Section 443 (overvoltage / surge protection) — A4 has DELETED two things and made the application route consequence-based. Which two items were deleted?',
    options: [
      'Reg 443.4.1 and Reg 443.5',
      'Reg 443.5 (the calculated CRL risk-assessment method) and Annex A443 — designers can no longer compute their way to "no SPDs required"',
      'All of Section 443',
      'Reg 443.4.1 and the consequence categories',
    ],
    correctAnswer: 1,
    explanation:
      'A4 removed the quantitative risk-assessment route. Reg 443.5 used to allow a calculation (CRL = AL × NL) which, if below a threshold, justified omitting SPDs. Both that regulation and the supporting Annex A443 are deleted in A4. The replacement route is the consequence-based Reg 443.4.1: if either active limb applies — (a) serious injury to, or loss of, human life; (c) significant financial or data loss (limb (b) was deleted by the A2:2022 May-2023 corrigendum) — SPDs SHALL be fitted. The practical effect: most UK installations now fit SPDs at the origin by default, with the owner declaration documented if they are omitted.',
  },
  {
    id: 7,
    question:
      'On the new A4 cert form, what change applies to the system-earthing-arrangement field?',
    options: [
      'Removed entirely — the inspector now writes a free description',
      'TN-C-S is now subdivided in the drop-down: TN-C-S (PME) and TN-C-S (PNB) are distinct selections, because the open-PEN failure-mode analysis differs',
      'TN-C-S has been replaced by IT for all UK supplies',
      'Only TT and TN remain — TN-C-S is no longer recognised',
    ],
    correctAnswer: 1,
    explanation:
      'A4 makes the cert form distinguish between TN-C-S (PME — Protective Multiple Earthing, the dominant DNO arrangement) and TN-C-S (PNB — Protective Neutral Bonding, where there is only one connection point to true earth — typically a private substation feeding one customer). The fault-current paths and the open-PEN consequence analysis differ between the two — the schedule of inspection items now reflect this. Inspectors and designers must select the right sub-type rather than ticking a generic "TN-C-S".',
  },
  {
    id: 8,
    question:
      'A new EV charge point is being installed at a private dwelling on a TN-C-S (PME) supply. Reg 722.312.2.1 forbids a PEN in the EV circuit. Which two routes are compliant?',
    options: [
      'Use a single 100 mA Type AC RCD; reduce the cable size to 6 mm²',
      '(a) Bring only PE (not the PEN) to the EV circuit by splitting N and PE before the EV way; OR (b) apply one of the alternative measures listed in Section 722 — e.g. an open-PEN protection device, or a separate earth electrode with documented Ra',
      'Switch the supply to TT for the whole property',
      'Install a Type B RCBO and ignore the PEN rule',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 722.312.2.1 doesn't require TT conversion of the whole property — it requires that the EV-charging circuit specifically does not contain a PEN. Two routes meet that. Route (a): inside the consumer unit, split N and PE at the MET as normal, then run separate N and PE conductors to the EV way — no PEN reaches the charger. Route (b): apply an open-PEN protection device that disconnects the EV circuit on detecting an open PEN (typically integrated into modern domestic EV chargers), or provide a dedicated earth electrode to the EV circuit with documented Ra meeting Reg 411.5.3 (Ra × IΔn ≤ 50 V). Most domestic installs use (a) plus a charger with built-in open-PEN detection — belt and braces.",
  },
];

const faqItems = [
  {
    question: 'When exactly is A4:2026 in force, and when is A3 withdrawn?',
    answer:
      'BS 7671:2018+A4:2026 was published on 15 April 2026 and is the current edition from that date. New designs starting on or after 15 April 2026 must reference A4. Designs that started before 15 April 2026 may continue and be certified under A3:2024 up to 15 October 2026 — A3 is withdrawn entirely on that date. From 16 October 2026 every new cert must reference A4. Existing certs already issued under A3 remain valid evidence of compliance at the time of issue and are not retrospectively invalidated.',
  },
  {
    question:
      'Is Reg 411.3.4 retrospective? Do existing dwellings need their lighting circuits upgraded?',
    answer:
      'No — A4 is not retrospective. Existing installations remain compliant with the edition they were certified under. However, on an EICR of an older dwelling, the absence of 30 mA RCD additional protection on lighting circuits is reported as a deviation from the current edition and coded per GN3 — typically C3 (improvement recommended) where the install is sound, escalating to C2 (potentially dangerous) where there is additional risk such as damaged accessories, exposed metal-bodied luminaires, or evidence of moisture ingress. Any new lighting circuit added to an existing dwelling from 15 April 2026 onwards must be on an RCD or RCBO regardless of how the rest of the board is configured.',
  },
  {
    question: 'Reg 421.1.7 — does the AFDD requirement apply to single-family homes?',
    answer:
      'In single-family dwellings, AFDD remains "strongly recommended" rather than mandated. The mandatory premises under A4 are HMOs, purpose-built student accommodation, care/nursing homes, and HRRBs (high-rise residential, typically ≥ 18 m or ≥ 7 storeys). Reg 120.3 still applies — if you choose not to fit AFDDs in a single-family home, the designer should record the decision as a documented departure with a justification (e.g. cost-benefit, occupant risk profile). The case for fitting AFDDs anyway in any sleeping accommodation is strong: roughly 25% of UK domestic fires of electrical origin are arc-fault events that conventional MCBs and RCDs cannot detect.',
  },
  {
    question: 'What does Section 419 actually cover, and when does it apply?',
    answer:
      'Section 419 is the group of regulations for ALTERNATIVE protective measures used where automatic disconnection of supply (ADS) is not feasible. Reg 419.1 enumerates them: Class II equipment / equivalent insulation (Section 412), electrical separation (Section 413), non-conducting location, and earth-free local equipotential bonding. ADS is the UK default, so Section 419 applies in narrow scenarios — equipment supplied where the source earthing is unsuitable, plant rooms with a high earth-fault-clearing time risk, repair or test areas where the user must work on live equipment, or installations with very high Zs that cannot be reduced economically. The designer must state on the cert which Section 419 measure is applied and document why ADS was not feasible.',
  },
  {
    question:
      'Reg 530.3.201 — what does "consideration" of bidirectional protection actually require in practice?',
    answer:
      "Reg 530.3.201 requires the designer to identify circuits that may carry current in either direction (PV export, battery storage discharge, V2G/V2H, micro-CHP) and to confirm — typically from the manufacturer's data sheet — that any OCPD, RCD or RCBO in that circuit is rated for bidirectional service. Most legacy MCBs are tested under IEC 60898 for unidirectional flow only; some manufacturers now publish bidirectional test data for their newer ranges. The cert form has a field to record the bidirectional rating where applicable. If the existing protective device is not bidirectionally rated, replace it — do not assume an MCB tested at, say, 6 kA forward will perform identically in reverse.",
  },
  {
    question: 'Reg 551.7.1(d) on parallel sources — why is "load side of upstream RCD" prohibited?',
    answer:
      "Two failure modes drive the prohibition. (1) When the parallel source injects current downstream of the RCD, the RCD measures the imbalance between line and neutral including the injected current — a real residual fault current in another part of the circuit can be masked by the export current, and the RCD fails to operate. (2) The injected source current can saturate the RCD's differential core, causing nuisance trips or, worse, blinding the device to genuine faults. The compliant arrangement: parallel source connects on the SUPPLY side of any upstream RCD (typically at the main distribution busbar before the RCDs/RCBOs), with each downstream final circuit having its own RCD/RCBO providing additional protection in the conventional manner.",
  },
  {
    question:
      'Section 443 — what is the consequence-based route in Reg 443.4.1, and does it really mean "fit SPDs by default"?',
    answer:
      'Reg 443.4.1 lists the consequence limbs that, if any apply, require SPDs to be fitted: (a) serious injury to, or loss of, human life; (c) significant financial or data loss. Limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023), so only (a) and (c) remain. For all other cases, protection shall still be provided unless the owner declares it is not required due to any loss or damage being tolerable and they accept the risk. For typical UK installations — most commercial premises, HMOs, healthcare, and any premises with significant electronic loads or critical services — limb (c) readily applies. The practical guidance from BSI and IET commentary is to fit Type 2 SPDs at the origin of every new domestic and commercial installation by default, with the owner declaration documented if they are omitted. The deletion of the old quantitative CRL calculation (formerly Reg 443.5 + Annex A443) means designers can no longer compute their way out.',
  },
  {
    question: 'Reg 722.312.2.1 — why is the EV-circuit PEN ban specific to TN supplies?',
    answer:
      'The hazard is the open-PEN failure mode, which is unique to TN-C and TN-C-S. If the PEN conductor breaks above the property — between the substation transformer star point and the consumer cut-out — the local "earth" reference rises with load on the system. Every Class I exposed metal part bonded to the MET sits at that elevated potential. With an EV connected, the conductive vehicle body becomes a Class I exposed-conductive-part on wheels — and the user touching the vehicle while standing on the driveway becomes the fault path. The risk is amplified because EVs are touched routinely, the fault is invisible to a basic insulation test, and the fault path is much larger than a typical kettle handle. TT supplies use an installation earth electrode and are not exposed to this failure mode in the same way — the ban is therefore TN-specific.',
  },
  {
    question: 'A4 cert form — what new fields must I be aware of when issuing an EIC or EICR?',
    answer:
      'Schedule of inspection — new item 4.23 records AFDD presence/absence per circuit; the inspector ticks compliance with Reg 421.1.7 where mandated. Schedule of test results — column 30 records the AFDD trip test result. System earthing arrangement field is now subdivided: TN-C-S (PME) and TN-C-S (PNB) are distinct drop-down options. The bidirectional protection consideration (Reg 530.3.201) has its own field where applicable. Several free-text fields capture Section 419 alternative measures and Section 443 consequence-route justification. A4 cert templates were issued by the IET / NICEIC / NAPIT in mid-2026 to coincide with the publication date — using a pre-A4 template after 15 October 2026 is itself a non-compliance.',
  },
];

const BS7671Module2Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'A4:2026 highlights & current requirements | BS 7671:2018+A4:2026 | Module 2.4',
    description:
      'BS 7671:2018+A4:2026 in force 15 April 2026, A3 withdrawn 15 October 2026. Reg 411.3.4 luminaire RCD, Reg 421.1.7 AFDDs, Reg 419 alternatives, Reg 530.3.201 bidirectional, Reg 551.7.1 parallel sources, Reg 722.312.2.1 EV PEN ban, Section 443 consequence route, cert-form changes.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Updated for A4:2026"
            title="Amendment 4 (2026) highlights and current requirements"
            description="What A4:2026 actually changes — publication 15 April 2026, A3 withdrawn 15 October 2026, the new Reg 411.3.4 luminaire RCD, Reg 421.1.7 AFDD mandates, Section 419 alternatives, Section 443 consequence route, parallel-source rules, EV PEN ban, and the cert-form fields you must now complete."
            actions={
              <>
                <RegBadge>411.3.4</RegBadge>
                <RegBadge>421.1.7</RegBadge>
                <RegBadge>419.1</RegBadge>
                <RegBadge>722.312.2.1</RegBadge>
                <AmendmentBadge regs={['411.3.4', '421.1.7', '419.1', '722.312.2.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671:2018+A4:2026 published 15 April 2026 — in force from that date for new design. A3:2024 withdrawn 15 October 2026; from 16 October every new cert must reference A4.',
              'Reg 411.3.4 (NEW) — within domestic premises, every AC final circuit supplying luminaires must have 30 mA RCD additional protection. No exception.',
              'Reg 421.1.7 — AFDDs MANDATED on AC final circuits up to 32 A in HMOs, purpose-built student accommodation, care homes and HRRBs; strongly recommended elsewhere.',
              'Section 443 — old risk-assessment CRL calculation (Reg 443.5 + Annex A443) DELETED. Replaced with consequence-based Reg 443.4.1 — most installations fit SPDs at origin by default.',
              'Reg 722.312.2.1 — EV-charging circuits on TN supplies SHALL NOT include a PEN conductor. Reg 551.7.1(d) bans parallel sources on the load side of an upstream RCD. Reg 530.3.201 requires bidirectional rating consideration.',
              'Cert form changes — TN-C-S now sub-divided (PME vs PNB), schedule of inspection item 4.23 (AFDD), schedule of test results column 30 (AFDD test), bidirectional / source-side fields, Section 419 alternative measures and Section 443 consequence-route free-text.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the A4:2026 publication date (15 April 2026) and the A3:2024 withdrawal date (15 October 2026), and explain the parallel-acceptance window between them.',
              'Apply Reg 411.3.4 correctly to domestic installations — recognise the unconditional 30 mA RCD requirement on AC final circuits supplying luminaires and explain why no risk-assessment exception is available.',
              'Identify the premises in which AFDDs are MANDATED under Reg 421.1.7 (A4) versus those where they remain a "strong recommendation", and complete the new schedule-of-inspection item 4.23 and column 30 of the test schedule.',
              'Use the Section 419 alternative protective measures (Reg 419.1) where ADS cannot be guaranteed — Class II / equivalent insulation, electrical separation, non-conducting location, earth-free local equipotential bonding — and document the choice on the cert.',
              'Apply Reg 530.3.201 (bidirectional protection consideration) and Reg 551.7.1 parallel-source rules — including the (d) prohibition on connecting a parallel source on the load side of an upstream RCD — to PV / battery / V2G installations.',
              'Apply Reg 722.312.2.1 (EV-circuit PEN ban on TN supplies) using the two compliant routes — pre-circuit N/PE split, or alternative measures listed in Section 722.',
              'Use the new A4 cert-form fields — TN-C-S (PME) vs (PNB) drop-down, AFDD inspection / test fields, bidirectional / source-side fields, and the consequence-based Reg 443.4.1 route — instead of the deleted Reg 443.5 calculation and Annex A443.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Publication and transition timeline</ContentEyebrow>

          <ConceptBlock
            title="A4:2026 — when it published, when it bites, when A3 dies"
            plainEnglish="A4 was published on 15 April 2026. From that date every new design must reference A4. Designs already in progress on 15 April 2026 may complete and certify under A3:2024 up to 15 October 2026 — the A3 withdrawal date. From 16 October 2026 onwards, A3 is withdrawn entirely and every cert must reference A4."
            onSite="Practical CPD-week reading: any new design you start after 15 April 2026 is A4. Any design started before but completing within the next six months can finish under A3 — but be prepared to defend that choice. From 16 October 2026 there is no parallel acceptance — using an A3 cert template after that date is itself a documented departure under Reg 120.3, and most certification bodies will simply reject the cert."
          >
            <p>
              The transition window exists to protect projects that were designed and partially
              installed before A4 publication. It is not a "use whichever you prefer" period.
              Certifying bodies (NICEIC, NAPIT, ELECSA, Stroma, BPGs) issued updated cert templates
              and assessor guidance in Q1 2026 ahead of the publication date. The schedule of
              inspection items, schedule of test results columns, and several free-text fields
              changed — pre-A4 templates do not capture A4 information correctly, so even if you are
              entitled to certify under A3 during the window, using the right template is
              non-negotiable.
            </p>
            <p>
              Existing installations are not retrospectively invalidated. An EICR of a 2014 install
              records that the install complied with BS 7671:2008+A1:2011 at the time and lists
              deviations from the current edition (A4:2026) per GN3. The classification (C1, C2, C3,
              FI) is at the inspector&apos;s judgement based on real-world risk — not a mechanical
              &quot;every deviation = C3&quot;.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The headline domestic change — Reg 411.3.4</ContentEyebrow>

          <ConceptBlock
            title="Reg 411.3.4 (NEW) — 30 mA RCD on every domestic luminaire circuit"
            plainEnglish="A4 introduces a brand-new regulation requiring every AC final circuit supplying luminaires within domestic (household) premises to have 30 mA RCD additional protection. There is no exception within scope."
            onSite="On a new domestic CU, the practical effect is: every lighting way is an RCBO (or sits on an RCD bus). Two-pole RCBOs are the cleanest implementation. A new dwelling fit-out specifying MCBs without RCD protection on lighting from 15 April 2026 onwards is non-compliant — the install must be reworked or a documented Reg 120.3 departure must be issued (and almost no real situation justifies one)."
          >
            <p>
              Reg 411.3.4 sits alongside, not within, Reg 411.3.3. Reg 411.3.3 covers socket outlets
              up to 32 A and mobile equipment outdoors and offers a documented risk-assessment
              exception for category (b) — non-domestic socket-outlets in other locations. Reg
              411.3.4 is a separate, parallel rule for luminaire circuits in dwellings — and offers
              no exception. It applies whether the lighting points are inside a special location
              (bath/shower zone, kitchen) or in general areas (hallway, bedroom, garage). It applies
              whether the luminaires are LED or filament, ceiling-rose or downlight, surface or
              recessed. The trigger is &quot;AC final circuit supplying luminaires within domestic
              (household) premises&quot; — that&apos;s it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.4 — Additional requirements for circuits with luminaires (NEW IN A4)"
            clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning="Mandatory ('shall'), unconditional within scope, no risk-assessment exception. Applies to every AC final circuit feeding luminaires inside a private dwelling — kitchen, bathroom, bedroom, hallway, garage, the entire property. From 15 April 2026 every new domestic lighting circuit is on an RCD or RCBO."
            cite="BS 7671:2018+A4:2026, Reg 411.3.4 (in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>AFDDs — Reg 421.1.7 (A4)</ContentEyebrow>

          <ConceptBlock
            title="What changed for AFDDs in A4"
            plainEnglish="A2:2022 introduced AFDDs as a 'recommendation' for high-risk premises. A4:2026 elevates that to a MANDATORY requirement on AC final circuits up to 32 A in: HMOs, purpose-built student accommodation, care homes, and HRRBs (high-rise residential buildings). Single-family dwellings remain a 'recommendation' — strong CPD case for fitting them anyway."
            onSite="On any HMO refurb, student-accommodation install, care-home rewire or HRRB design from 15 April 2026, the cert ticks the AFDD box on every AC final circuit up to 32 A — sockets and lighting. Combined RCBO+AFDD devices are now widely available and increasingly cost-comparable to standalone RCBOs for these property types."
          >
            <p>
              AFDDs detect arc-fault current signatures — the high-frequency, irregular current
              waveform produced by a series arc (loose terminal in a junction box) or a parallel arc
              (damaged cable insulation conducting between line and neutral, or line and earth).
              Conventional MCBs only see overcurrent, and conventional RCDs only see residual
              current — neither detects an arc fault that hasn&apos;t yet developed into an
              overcurrent or earth fault. UK fire-statistics analysis attributes roughly 25% of
              domestic fires of electrical origin to arc-fault events. The economic case for AFDDs
              in sleeping accommodation is now strong even where they remain a recommendation rather
              than mandate.
            </p>
            <p>
              Definitions to know: HMO — House in Multiple Occupation, three or more unrelated
              tenants sharing facilities. PBSA — Purpose-built student accommodation. HRRB —
              High-rise residential building, typically ≥ 18 m or ≥ 7 storeys per Building
              Regulations (post-Grenfell definition; check the local building-control AHJ).
              Care/nursing homes — Care Quality Commission-registered or equivalent
              sleeping-accommodation premises with vulnerable occupants. The cert form schedule of
              inspection item 4.23 records AFDD presence/absence per circuit; column 30 of the
              schedule of test results captures the AFDD test result.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Section 419 — alternatives to ADS</ContentEyebrow>

          <ConceptBlock
            title="Reg 419.1 — when ADS isn't feasible, what is?"
            plainEnglish="ADS is the UK default protective measure but it isn't always achievable — high Zs, unsuitable supply earthing, nuisance-trip-prone loads, repair/test environments. Section 419 (Reg 419.1 in particular) collects the alternatives: Class II / equivalent insulation, electrical separation, non-conducting location, earth-free local equipotential bonding."
            onSite="Where you reach for Section 419, document why ADS was not feasible. The cert has a free-text field for it. Don't choose Section 419 measures because they're cheaper or quicker — choose them where ADS genuinely cannot be demonstrated (extreme Zs, IT system limitations, test-bench scenarios). Most domestic and commercial installs default to ADS."
          >
            <p>
              <strong>Class II / equivalent insulation (Section 412).</strong> Double or reinforced
              insulation, recognised by the double-square symbol. Caveat under Reg 412.1.2: cannot
              be the sole protective measure on circuits with sockets, LSCs, DCLs or cable couplers
              — anywhere the user can change equipment.
            </p>
            <p>
              <strong>Electrical separation (Section 413).</strong> A safety isolating transformer
              with a single isolated load circuit. The classic example is a barber&apos;s shaver
              socket — one socket, one isolated secondary, no earth reference. Reg 413.3.6 sets the
              rules for multiple loads on one separated circuit (rare, demanding).
            </p>
            <p>
              <strong>Non-conducting location.</strong> A room with insulating walls and floor and
              no extraneous-conductive-parts. Used in specialist test/research environments. Reg
              418.1 sets the requirements: floor and walls must have insulation resistance ≥ 50 kΩ
              at 500 V or 100 kΩ above 500 V; no protective conductor in the location; no
              simultaneous-touch fault path.
            </p>
            <p>
              <strong>Earth-free local equipotential bonding.</strong> All exposed and extraneous
              conductive parts in the local zone bonded together but not to earth. Touch potential
              between any two surfaces in the zone is zero. Reg 418.2 covers it. Used in some repair
              / test environments.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Section 443 — surge protection consequence route</ContentEyebrow>

          <ConceptBlock
            title="What A4 deletes and what replaces it"
            plainEnglish="A4 DELETES the old quantitative risk-assessment formula (Reg 443.5 and Annex A443). Designers can no longer compute a CRL value and use it to justify omitting SPDs. The replacement route is Reg 443.4.1 — a consequence-based decision: if any of the listed consequences apply, SPDs SHALL be installed."
            onSite="For most UK installations — commercial, healthcare, HMOs, anywhere with significant electronic loads or critical services — at least one consequence applies. Practical CPD guidance from BSI / IET / NICEIC: fit Type 2 SPDs at the origin of every new domestic and commercial install by default, and document a Reg 120.3 departure if you choose to omit them."
          >
            <p>
              Reg 443.4.1 enumerates the consequence categories. Protection against transient
              overvoltages SHALL be provided where the consequence caused by the overvoltage could
              result in: <strong>(a)</strong> serious injury to, or loss of, human life;{' '}
              <strong>(c)</strong> significant financial or data loss. Limb <strong>(b)</strong> was
              deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023), so only limbs (a) and (c)
              remain active. For all other cases, protection SHALL still be provided unless the owner
              of the installation declares it is not required due to any loss or damage being
              tolerable and they accept the risk of damage to equipment and any consequential loss.
              For a typical UK dwelling with significant electronic loads (smart-home kit, AV
              equipment, computers, EV charger, PV/battery), limb (c) readily applies — the default
              position is therefore &quot;fit SPDs&quot;, with the owner declaration documented if
              they are omitted. The cert form has a free-text field capturing the consequence-route
              reasoning.
            </p>
            <p>
              The deletion of Reg 443.5 + Annex A443 is significant because the old CRL calculation
              was being widely abused — values were being computed conservatively to justify
              omitting SPDs even where the risk profile clearly warranted them. A4 removes that
              escape hatch entirely. The route is now: read Reg 443.4.1 consequences, decide if any
              apply, fit SPDs if they do, document the decision either way.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Bidirectional and parallel-source rules</ContentEyebrow>

          <ConceptBlock
            title="Reg 530.3.201 — bidirectional protection device consideration"
            plainEnglish="Where a circuit can carry current in either direction (PV export, battery discharge, V2G/V2H, micro-CHP), the protective devices must be rated for bidirectional flow. Reg 530.3.201 (A4) requires this to be CONSIDERED — typically by reference to the manufacturer's data sheet."
            onSite="Most legacy MCBs are tested under IEC 60898 for unidirectional flow only; some manufacturers now publish bidirectional ratings for newer ranges. Check the data sheet — don't assume. The cert form has a field to record the bidirectional rating where applicable. If the existing protective device isn't rated for both directions, replace it."
          >
            <p>
              The hazard is straightforward. A 6 kA breaking-capacity rating in the forward
              direction does not guarantee a 6 kA rating in the reverse direction — the contact
              geometry, the magnetic blow-out arrangement, and the arc-extinction mechanism may all
              behave differently. Where current can flow either way (PV array exporting onto the
              busbar, battery discharging back through the consumer unit, EV in V2H mode), a fault
              on the export side draws current through the device in reverse — and a device not
              rated for it can fail to interrupt cleanly.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 551.7.1 — parallel-source rules including the (d) prohibition"
            plainEnglish="When a generation source (PV, battery, micro-CHP, generator) operates in parallel with the public supply, Reg 551.7.1 sets the connection and protection rules. Item (d) explicitly prohibits connecting the parallel source on the LOAD side of an upstream RCD."
            onSite="Inspect any PV / battery cert against (a)–(d): (a) the parallel source must be capable of being isolated from the supply; (b) the source must be inhibited from energising a de-energised supply (anti-islanding); (c) means must be provided for measuring power flow direction; (d) the source SHALL NOT be connected on the load side of an upstream RCD."
          >
            <p>
              The (d) prohibition matters because of two failure modes.{' '}
              <strong>Failure mode 1: masked residual fault.</strong> An upstream RCD measures the
              imbalance between line and neutral (or three lines for a three-phase RCD). When a
              parallel source injects current downstream of the RCD, the RCD&apos;s differential
              measurement becomes distorted — a real residual fault current somewhere else in the
              circuit can be cancelled out by the injected source current, and the RCD fails to
              operate.
              <strong> Failure mode 2: nuisance trips and blinding.</strong> The injected source
              current can saturate the RCD&apos;s differential core, causing nuisance trips
              (annoying) or, worse, blinding the device to genuine faults thereafter (dangerous).
              Connecting the source on the SUPPLY side of any upstream RCD avoids both modes — each
              downstream final circuit then has its own RCD/RCBO providing additional protection in
              the conventional manner.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />
          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>EV charging — Reg 722.312.2.1</ContentEyebrow>

          <ConceptBlock
            title="Why TN supplies cannot include a PEN in the EV-charging circuit"
            plainEnglish="Reg 722.312.2.1 forbids a PEN conductor in any EV-charging circuit supplied from a TN system. The hazard is the open-PEN failure mode — a broken PEN above the property elevates the local earth potential, and an EV is a Class I exposed-conductive-part on wheels."
            onSite="Two compliant routes. (a) Inside the consumer unit, split N and PE at the MET as normal, then run separate N and PE conductors to the EV way — no PEN reaches the charger. (b) Apply one of the alternative measures listed in Section 722 — typically an open-PEN protection device built into a modern domestic EV charger, or a separate earth electrode with documented Ra meeting Reg 411.5.3 (Ra × IΔn ≤ 50 V)."
          >
            <p>
              The open-PEN failure mode is the most-tested point in the EV-charging assessment. In
              TN-C-S (PME), the PEN conductor brings combined protective-earth-and-neutral up to the
              property cut-out. Inside the installation it is split at the MET into separate N and
              PE. If the PEN breaks above the cut-out — typically a corroded joint in a service head
              or a damaged service cable — the local &quot;earth&quot; reference floats with load on
              the system. Every Class I exposed metal part on the property rises in potential. A
              user touching the EV chassis while standing on the driveway, or holding the charging
              cable while standing on damp ground, becomes the fault path. The fault is invisible to
              a basic insulation-resistance test and only manifests under load with the PEN broken.
            </p>
            <p>
              The Reg 722.312.2.1 fix is to ensure no PEN can reach the EV circuit. Option (a) is
              the cleanest and is the dominant UK approach for new domestic EV installs — the CU is
              wired with the PEN split before the EV way, only PE reaches the charger, and even if
              the PEN fails upstream the EV PE is still tied to the rest of the installation MET
              (which itself rises with the PEN failure, but the ELV-circuit alternative measure or
              an open-PEN protection device in the charger then disconnects). Option (b) is mainly
              relevant where the consumer unit cannot easily be modified — typically older boards or
              shared-supply situations. Where the charger&apos;s own integrated open-PEN detection
              is relied upon, the manufacturer&apos;s installation manual is binding — fit a
              separate device only if the charger does not have one.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.312.2.1 — PEN conductor in EV charging circuit"
            clause="A circuit supplying charging equipment for an electric vehicle in a TN system shall not include a PEN conductor. Where an EV charging point is installed in an installation forming part of a TN-C-S system, the installation of an open-PEN protection device, or another suitable method as listed, shall be employed at or upstream of the EV charging point."
            meaning="No PEN in the EV circuit on TN supplies — full stop. Either bring only PE to the EV way (split N and PE pre-circuit) or apply an alternative measure: open-PEN protection device, separate earth electrode with documented Ra, or supply the EV via TT with its own electrode. The vehicle's conductive body and the user's typical touch contact with it amplifies the open-PEN risk beyond the general Reg 461.2 case."
            cite="BS 7671:2018+A4:2026, Reg 722.312.2.1"
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Section 514 — identification changes in A4</ContentEyebrow>

          <ConceptBlock
            title="Identification, marking and labelling under A4"
            plainEnglish="Section 514 covers the labelling and identification of conductors, devices, switches and warning notices. A4 brings several updates — most notably around AFDD-protected circuits, parallel-source warnings, and EV-charging circuit identification."
            onSite="Practical changes you'll see on a new install: AFDD-protected circuits identified at the consumer unit; parallel-source warning notice (typically 'WARNING: this installation contains an electricity-generating source — isolate at both points before working') visible at the origin; EV-charging circuit clearly identified as 'EV CHARGING — DEDICATED CIRCUIT' with no PEN; bidirectional protective devices marked accordingly where relevant."
          >
            <p>
              The traditional Section 514 notices remain — periodic-inspection notice, RCD-test
              notice, earthing-and-bonding-conductor identification at the MET, and so on — and A4
              adds layered notices for the new technology. Where a parallel source is present, the
              warning notice must be at the origin (consumer cut-out) and at the source isolator.
              Where AFDDs are fitted, the cert and the CU label clearly identify AFDD-protected
              circuits. Where the EV-charging circuit uses an alternative measure under Reg
              722.312.2.1, the notice identifies the alternative employed (open-PEN protection
              device, separate electrode, etc.).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Issuing an A3 cert for a new domestic install in May 2026 because 'A4 is too new'"
            whatHappens="Designer claims A4 hasn't bedded in yet and writes the EIC against A3:2024. The new dwelling's lighting circuits are on MCBs without RCD protection — A3-compliant, A4-non-compliant. Six months later the homeowner sells; the conveyancer's surveyor flags the EIC as referencing a withdrawn edition. Under Reg 120.3 the original designer must justify the departure — and 'A4 is too new' is not a documented technical reason."
            doInstead="Use A4:2026 for any new design from 15 April 2026. The transition window (15 April → 15 October 2026) only protects designs already in progress on 15 April. New design work from publication onwards is A4. Update your cert templates to the A4 version published by your certifying body (NICEIC / NAPIT / etc.) — using a pre-A4 template after 15 October 2026 is itself a non-compliance."
          />

          <CommonMistake
            title="Connecting a 6 kWp PV inverter on the load side of an upstream 100 mA RCD"
            whatHappens="Installer wires the PV inverter into a spare way on a domestic CU's RCD-protected bus. Reg 551.7.1(d) (A4) prohibits this — the PV-injected current can mask residual fault currents the upstream RCD is meant to detect, or saturate its differential core. The install passes a basic insulation test but the upstream RCD is unreliable. The cert is issued without documenting the breach."
            doInstead="Connect the parallel source on the SUPPLY side of any upstream RCD — typically at the main distribution busbar before the RCDs/RCBOs, with a dedicated isolator and an anti-islanding device. Each downstream final circuit then has its own RCD/RCBO providing additional protection in the conventional manner. Reg 551.7.1 items (a)–(d) all apply — isolation capability, anti-islanding, power-flow direction measurement, and the (d) load-side prohibition."
          />

          <CommonMistake
            title="Fitting an EV charger with a PEN brought all the way to the charger on a TN-C-S supply"
            whatHappens="Domestic install on PME. Installer runs a 3-core cable (line, PEN, additional CPC) out to the EV charger, connecting the PEN at the charger terminal block. Reg 722.312.2.1 explicitly prohibits this. Open-PEN failure upstream of the property would elevate the EV chassis to near-line voltage; the user touching the vehicle while standing on the driveway becomes the fault path."
            doInstead="Two compliant options. (a) Inside the consumer unit, split N and PE at the MET as normal, then run separate N and PE conductors out to the EV way — no PEN in the EV circuit. (b) If the existing CU layout doesn't permit option (a), apply an alternative measure listed in Section 722 — an open-PEN protection device (typically integrated into a modern domestic EV charger), or a separate earth electrode with documented Ra meeting Reg 411.5.3. Document the choice on the cert."
          />

          <SectionRule />

          <ContentEyebrow>Cert form changes — practical fields</ContentEyebrow>

          <ConceptBlock
            title="What's new on the EIC / EICR / Minor Works under A4"
            plainEnglish="A4:2026 changes several cert-form fields. The system-earthing-arrangement drop-down is now subdivided (TN-C-S split into PME and PNB). The schedule of inspection has a new item 4.23 for AFDD presence/absence. The schedule of test results has a new column 30 for AFDD test result. There are new fields for bidirectional protection devices and parallel-source connection-side."
            onSite="Update your cert templates immediately — NICEIC, NAPIT, ELECSA and Stroma all issued A4-compliant templates by Q1 2026 to coincide with the publication date. Using a pre-A4 template AFTER 15 October 2026 is itself a non-compliance, even if the technical install meets A4. Some app-based cert tools auto-update; paper templates do not."
          >
            <p>
              <strong>System-earthing-arrangement field.</strong> The drop-down now distinguishes
              TN-C-S (PME — Protective Multiple Earthing, the dominant DNO arrangement, multiple
              connections to earth via the substation neutral) from TN-C-S (PNB — Protective Neutral
              Bonding, only one connection to true earth, typically a private substation feeding one
              customer). The fault-current paths and the open-PEN consequence analysis differ —
              designers and inspectors must select the correct sub-type.
            </p>
            <p>
              <strong>Schedule of inspection.</strong> Item 4.23 captures whether AFDD additional
              protection is provided per circuit, with reference to Reg 421.1.7. The inspector ticks
              compliance, non-compliance, or limitation/not-applicable. Where AFDDs are mandated
              (HMOs, PBSA, care homes, HRRBs) and absent, the EICR observation is typically C2.
            </p>
            <p>
              <strong>Schedule of test results.</strong> Column 30 records the AFDD trip test
              result. Modern AFDDs include a test button and many provide a self-test indicator; the
              inspector confirms the test has been carried out and records the result.
            </p>
            <p>
              <strong>Bidirectional / parallel-source fields.</strong> Where Reg 530.3.201 applies,
              a field captures whether the protective device is rated for bidirectional flow
              (typically referencing manufacturer documentation). Where Reg 551.7.1 applies, a field
              captures whether the parallel source is connected on the supply side of any upstream
              RCD.
            </p>
            <p>
              <strong>Section 419 free-text.</strong> Where an alternative protective measure to ADS
              is applied, a free-text field captures the measure (Class II, electrical separation,
              non-conducting location, earth-free local equipotential bonding) and the reason ADS
              was not feasible.
            </p>
            <p>
              <strong>Section 443 consequence-route field.</strong> Replaces the old Reg 443.5 CRL
              calculation and Annex A443 calculation (both DELETED). The designer records which Reg
              443.4.1 consequence applies, and either that SPDs are fitted or that a Reg 120.3
              departure has been documented for omission.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying A4 on the day</ContentEyebrow>

          <Scenario
            title="EICR on a 2018 dwelling — 12 lighting circuits on MCBs, no RCD protection"
            situation="Domestic EICR on a 2018 build. The property has a 12-way RCBO board on socket circuits, but the original designer used Type B MCBs (no RCD) on lighting circuits — A2:2022-compliant at the time. You are inspecting in June 2026, post-A4 publication. The lighting circuits are sound, no damaged accessories, no moisture issues."
            whatToDo="Record the lighting MCBs as a deviation from the current edition — Reg 411.3.4 (A4) now requires 30 mA RCD additional protection on every domestic luminaire AC final circuit. Per GN3, give each lighting circuit observation a single classification. Where the install is sound and there are no aggravating factors, code C3 (improvement recommended) — the install is non-compliant with the current edition but does not present immediate danger. Recommend RCBO replacement on every lighting way at the next consumer-unit upgrade or partial rewire."
            whyItMatters="A4 is not retrospective — existing installations remain compliant with the edition they were certified under. But on an EICR, every observation must be classified per GN3 (C1, C2, C3, FI). The classification depends on real-world risk, not a mechanical 'every deviation = C3'. C2 (potentially dangerous) would apply where there is additional risk (damaged accessories, exposed metal-bodied luminaires, moisture). C3 fits a sound 2018 install where the only issue is the missing 30 mA RCD."
          />

          <Scenario
            title="New EV charger on a 2014 TN-C-S consumer unit"
            situation="Customer wants a 7 kW tethered charger on a TN-C-S (PME) supply. The existing CU is a 2014 split-load board: main switch + 100 mA Type AC RCD + 30 mA Type AC RCDs on each bus. The customer asks you to wire the new EV way 'into a spare slot on the existing 30 mA RCD bus' to save cost."
            whatToDo="Refuse the spare-slot route — it breaches Reg 722.312.2.1 (PEN issue if the existing CU runs PEN through any switching device or if the EV cable picks up the PEN before the consumer's MET split point) AND Reg 551.7.1(d) (if the customer also has PV planned, which on EV-customer demographics is common). The compliant install: dedicated EV way fed from a Type A 32 A RCBO (the charger's own 6 mA DC fault detection covers the smooth DC route inside it). Run the EV circuit as TN-S — split N and PE at the CU and bring only PE to the charger; do NOT include a PEN in the EV circuit. Add an open-PEN protection device (PEN-fault relay) at the charger position to cover the open-PEN failure mode upstream."
            whyItMatters="Type B RCDs cost 4-5× a Type A and the manufacturer's instructions are the binding spec. If the charger handles DC residual itself, Type A is correct and over-engineering with Type B isn't free. If it doesn't, Type B is mandatory. The EV-circuit PEN prohibition (Reg 722.312.2.1, A4) is non-negotiable on TN — it's the single most-tested point in the EV-charging sections of the assessment. Documenting the alternative measure (open-PEN protection device) on the cert is also non-negotiable: the new A4 cert form has a field for it."
          />

          <SectionRule />

          <ContentEyebrow>Designer&apos;s A4 quick reference</ContentEyebrow>

          <ConceptBlock
            title="A4 changes — one-line summary"
            plainEnglish="If you remember nothing else: every domestic luminaire circuit has a 30 mA RCD; HMOs / PBSA / care homes / HRRBs have AFDDs on AC final circuits up to 32 A; SPDs are fitted by default unless a Reg 120.3 departure is documented; the EV circuit on TN supplies has no PEN; parallel sources connect on the supply side of upstream RCDs; the cert template is the A4 version, not A3."
            onSite="The seven-point A4 designer checklist for new domestic installs: (1) RCBOs on every lighting way (Reg 411.3.4). (2) AFDDs on every AC final circuit up to 32 A in HMOs / PBSA / care homes / HRRBs (Reg 421.1.7). (3) Type 2 SPDs at the origin by default (Reg 443.4.1). (4) Bidirectional-rated devices where current may flow either way (Reg 530.3.201). (5) Parallel sources on the supply side of upstream RCDs (Reg 551.7.1(d)). (6) No PEN in the EV circuit on TN supplies (Reg 722.312.2.1). (7) A4 cert template — TN-C-S sub-divided, item 4.23 AFDD, column 30 AFDD test, bidirectional / source-side fields completed."
          >
            <p>
              The pattern A4 establishes is consistent: the regulations push designers towards
              defaulting to the safer choice (RCD on lighting, AFDD in sleeping accommodation, SPDs
              at origin), with the documented Reg 120.3 departure available where the choice is
              genuinely justified. The deletion of the old Reg 443.5 / Annex A443 quantitative
              calculation is a particular signal — the BSI committee is moving away from
              calculation-based escapes and towards consequence-based defaults. Designers who
              embrace that pattern will find A4 straightforward; those who try to compute their way
              out of compliance will find A4 unforgiving.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'BS 7671:2018+A4:2026 published 15 April 2026 — in force from that date for new design. A3:2024 withdrawn 15 October 2026; from 16 October every new cert must reference A4.',
              'Reg 411.3.4 (NEW) — within domestic premises, every AC final circuit supplying luminaires must have 30 mA RCD additional protection. No exception within scope.',
              'Reg 421.1.7 (A4) — AFDDs MANDATED on AC final circuits up to 32 A in HMOs, PBSA, care homes and HRRBs. Strongly recommended elsewhere.',
              'Reg 419.1 — alternatives to ADS where ADS is not feasible: Class II / equivalent insulation, electrical separation, non-conducting location, earth-free local equipotential bonding.',
              'Reg 530.3.201 (bidirectional consideration), Reg 551.7.1 parallel sources including (d) prohibition on load-side connection, Reg 722.312.2.1 EV-circuit PEN ban on TN supplies.',
              'Section 443 — Reg 443.5 quantitative risk-assessment + Annex A443 DELETED. Replaced with Reg 443.4.1 consequence-based route; default is fit SPDs at origin unless Reg 120.3 departure documented.',
              'Cert form changes — TN-C-S now subdivided (PME / PNB), item 4.23 (AFDD inspection), column 30 (AFDD test), bidirectional / source-side fields, Section 419 alternative-measure free-text, Section 443 consequence-route free-text.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 3 — General Characteristics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module2Section4;
