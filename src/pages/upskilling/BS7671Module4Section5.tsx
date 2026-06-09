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
    id: 'm4s5-when-required',
    question:
      'Reg 443.4.1 requires SPD protection where the consequence of a transient overvoltage could result in which of these? (Pick the most complete answer.)',
    options: [
      'Loss of human life only',
      'Serious injury to, or loss of, human life; or significant financial or data loss',
      'Only damage to electronic equipment',
      'Only loss of internet connectivity',
    ],
    correctIndex: 1,
    explanation:
      "Reg 443.4.1 lists the consequences that mandate SPDs: (a) serious injury to, or loss of, human life; and (c) significant financial or data loss. Limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023). For all other cases, protection shall still be provided unless the owner of the installation declares it is not required because any loss or damage is tolerable and they accept the risk. In practice this means SPDs are the default position for most modern installations rather than the exception.",
  },
  {
    id: 'm4s5-spd-type-origin',
    question:
      'Reg 534.4.1.1 says SPDs installed at the origin of the installation shall be of which type(s)?',
    options: [
      'Type 3 only',
      'Type 1 or Type 2',
      'Type 1 only — always',
      'Any type the manufacturer permits',
    ],
    correctIndex: 1,
    explanation:
      'Reg 534.4.1.1: SPDs installed at the origin of the electrical installation shall be Type 1 or Type 2. Type 1 is required where the structure has an external lightning protection system (LPS) or where there is direct-strike risk; Type 2 is the default elsewhere. Type 3 SPDs (close protection) are installed close to sensitive equipment and may not stand alone at the origin.',
  },
  {
    id: 'm4s5-cable-length',
    question:
      'When installing an SPD at the consumer unit, what is the most important wiring rule for the connecting conductors between the SPD and the busbars / earthing terminal?',
    options: [
      'Use the largest cable available',
      "Keep all conductors and interconnections as short and as straight as possible — avoid unnecessary cable loops — because cable inductance adds to the SPD's let-through voltage",
      'Wrap them around a core to act as a noise filter',
      'Run them through a separate conduit',
    ],
    correctIndex: 1,
    explanation:
      "Reg 534 / GN3 mandate: SPD connecting conductors shall be kept as short and straight as possible. The reason is physics — every metre of conductor adds ~1 µH of inductance, and at the rate-of-rise of a lightning surge (typically dV/dt of 10 kV/µs) that inductance generates a voltage drop ACROSS the SPD's connecting leads. The ideal install has the SPD as close as possible to the busbars with leads under 0.5 m total. Long loops can effectively defeat the SPD by adding hundreds of volts to the protection level the equipment sees.",
  },
  {
    id: 'm4s5-uc-rating',
    question: "An SPD's continuous operating voltage Uc must be selected against what?",
    options: [
      'The fault current at origin',
      'The nominal phase-to-earth voltage of the supply system, with margin per BS 7671 Table 534.2 for the system earthing arrangement',
      'The maximum lightning peak voltage',
      'The cable length',
    ],
    correctIndex: 1,
    explanation:
      'Reg 534 / Table 534.2: Uc — the maximum continuous operating voltage — shall be equal to or higher than the value required for the system earthing arrangement. For a 230/400 V TN-S or TN-C-S system, Uc ≥ 1.1 × U₀ ≈ 253 V is typical for line-to-PE SPDs. TT systems and IT systems require higher Uc because the line-to-PE voltage during faults can be higher. Pick Uc too low and the SPD operates continuously under normal supply, ageing prematurely or failing.',
  },
  {
    id: 'm4s5-up-protection-level',
    question:
      "BS 7671 sets a ceiling on the SPD assembly's effective voltage protection level for a 230/400 V installation. What is it?",
    options: [
      '1.5 kV',
      '2.5 kV — the assembly Uc/Up combination must keep the protected voltage below this for typical equipment per Table 443.2',
      '6 kV',
      '10 kV',
    ],
    correctIndex: 1,
    explanation:
      "For a 230/400 V installation, the effective voltage protection level of the SPD assembly shall not exceed 2.5 kV (BS 7671 Reg 534 / Table 443.2). The 'effective' level is the SPD's Up plus the inductive voltage drop along the connecting leads — which is why short / straight wiring is non-negotiable. Equipment in BS 7671 categories I-IV has a minimum impulse withstand voltage Uw of 1.5 / 2.5 / 4 / 6 kV; the SPD must protect down to the lower end of this.",
  },
  {
    id: 'm4s5-ocpd-coordination',
    question:
      "Reg 534 requires the SPD to be protected by an upstream OCPD. The SPD manufacturer's installation manual states a maximum OCPD rating of 100 A gG. What does BS 7671 expect you to do?",
    options: [
      'Always use a 32 A MCB regardless',
      "Follow the manufacturer's installation instructions — choose the highest permissible OCPD rating up to 100 A gG to give the SPD assembly the largest surge-current capability",
      'Use a smaller OCPD to be safe',
      'Omit the OCPD if the SPD has internal protection',
    ],
    correctIndex: 1,
    explanation:
      "Reg 534: external OCPDs protecting an SPD assembly shall be the HIGHEST permissible rating consistent with the manufacturer's instructions. Higher OCPD rating = higher surge-current capability of the assembly. Reading the manufacturer's manual is mandatory — it specifies the maximum permitted OCPD type and rating. Using a smaller OCPD reduces the SPD's surge-handling and may cause nuisance OCPD trips during real events.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Section 443 had a significant A4 update. Which of the following is correct?',
    options: [
      'Section 443 was deleted entirely',
      'Reg 443.5 (the risk-assessment / CRL method) and Annex A443 were removed; the simplified Reg 443.4 / 443.4.1 consequence-based assessment is now the route to determine where SPDs are required',
      'A4 added a new requirement to install SPDs in every installation regardless of risk',
      'A4 deleted Reg 443.4',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 deleted the Reg 443.5 risk-assessment / CRL (Calculated Risk Level) method and the supporting Annex A443. The consequence-based assessment in Reg 443.4 / 443.4.1 remains — and is now the primary route to determine SPD requirement. Practical effect: simpler decision tree, but in practice most domestic / commercial installs now meet at least one of the consequence triggers.',
  },
  {
    id: 2,
    question:
      'A new dwelling has no external lightning protection system. What SPD type is the appropriate default at the consumer unit origin?',
    options: [
      'Type 1',
      'Type 2 — Reg 534.4.1.1; Type 1 is only required where there is an external LPS or direct-strike risk',
      'Type 3',
      'No SPD needed',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 534.4.1.1: SPDs at the origin shall be Type 1 OR Type 2. Type 1 is required where the structure has an external LPS or where direct-strike risk has been identified per BS EN 62305-3 / BS EN 62305-2. Type 2 is the default for domestic / commercial installations without LPS. Some manufacturers offer combined "Type 1+2" devices that satisfy both circumstances.',
  },
  {
    id: 3,
    question: 'Which of the following is NOT a recognised SPD type in BS 7671?',
    options: [
      'Type 1 — high surge-current devices for direct-strike protection',
      'Type 2 — installations without direct-strike risk',
      'Type 3 — close-coupled protection for sensitive equipment, downstream of Type 1 / 2',
      'Type 4 — universal for any application',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 / BS EN 61643-11 recognise Type 1, Type 2 and Type 3 SPDs. Type 4 is not a category. Type 1 handles direct lightning strike currents (10/350 µs waveform). Type 2 handles induced surges (8/20 µs). Type 3 provides close protection at terminal equipment. A typical install uses Type 1+2 at origin and Type 3 close to sensitive equipment.',
  },
  {
    id: 4,
    question:
      'You are installing a Type 2 SPD at the consumer unit. The SPD is mounted in the spare way; the line / neutral / earth tails to the busbars are 1.2 m long because the SPD has been positioned at the far end of the board. What is the issue?',
    options: [
      'No issue — the SPD will work as specified',
      '1.2 m of connecting conductor is far too long. At the typical lightning dV/dt, ~1 µH/m of cable inductance contributes ~1.0-1.5 kV of additional drop across the leads — likely pushing the protected-voltage above the 2.5 kV BS 7671 limit and defeating the SPD',
      'The cable should be larger to compensate',
      'The cable colours need changing',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 534: SPD connecting conductors shall be kept as short and as straight as possible, with no unnecessary loops. 1.2 m is far too long — typical guidance is "under 0.5 m total". Long leads add inductive drop ACROSS the SPD during a real surge, raising the protection level the downstream equipment sees and potentially exceeding the BS 7671 / Table 443.2 limits. Always mount the SPD in the busbar way nearest the main switch / earthing terminal.',
  },
  {
    id: 5,
    question:
      "Where the consequence of overvoltage 'could result in serious injury to or loss of human life' (Reg 443.4.1(a)), is SPD provision required by BS 7671?",
    options: [
      'No — risk assessment may waive it',
      'Yes — Reg 443.4.1 mandates SPD provision unconditionally where any of its listed consequences apply',
      'Only if the building has an LPS',
      'Only on commercial premises',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 443.4.1: protection against transient overvoltages SHALL be provided where the consequence could result in (a) serious injury to, or loss of, human life; or (c) significant financial or data loss (limb (b) was deleted by the A2:2022 Corrigendum, May 2023). 'Serious injury to, or loss of, human life' is item (a) — and triggers the mandatory protection requirement. For all other cases protection shall still be provided unless the owner declares it is not required because any loss or damage is tolerable and they accept the risk.",
  },
  {
    id: 6,
    question:
      'A small commercial unit installation has the structure protected by an external lightning protection system (LPS). What does this change about the SPD specification?',
    options: [
      'No change',
      'Reg 534 / 712.534.102.1: where an external LPS exists and direct-strike protection is required, Type 1 SPDs shall be installed as close as possible to the origin of the electrical installation — typically combined with Type 2 SPDs downstream',
      'Type 2 only is now sufficient',
      'No SPDs are required at all',
    ],
    correctAnswer: 1,
    explanation:
      'Type 1 SPDs handle direct-strike currents (10/350 µs waveform — significantly higher peak energy than the induced-surge 8/20 µs handled by Type 2). Where the structure has an external LPS, Type 1 is required at the origin per Reg 712.534.102.1 / Reg 534 for direct-strike protection. Practical implementations combine Type 1 + Type 2 at origin (often as combined T1+T2 devices) plus Type 3 close to sensitive equipment.',
  },
  {
    id: 7,
    question:
      "An SPD's nameplate shows Up = 1.4 kV, Uc = 275 V, Iimp = 12.5 kA, In = 20 kA. Connecting leads will be 0.4 m total. Will this satisfy BS 7671 for a 230/400 V TN-S install?",
    options: [
      "Need more information — but on the face of it, Uc 275 V > 1.1 × 230 = 253 V ✓, Iimp / In are reasonable for Type 1+2 origin protection, and 0.4 m leads should keep the effective Up well within the 2.5 kV ceiling. Verify against the manufacturer's installation manual and Table 534.2 for the exact Uc requirement",
      'Fail — Uc is too low',
      'Fail — In is too low',
      'Always pass without checking',
    ],
    correctAnswer: 0,
    explanation:
      "Quick sanity check: Uc 275 V exceeds 1.1 × 230 = 253 V (Table 534.2 typical TN-S requirement). Up = 1.4 kV plus the inductive drop on 0.4 m leads (~0.4-0.6 kV at typical dV/dt) gives effective ~2.0 kV — under the 2.5 kV BS 7671 ceiling for 230/400 V. Iimp 12.5 kA is in normal Type 1 range. The numerical check should always be paired with the manufacturer's manual confirming the system earthing match and OCPD selection.",
  },
  {
    id: 8,
    question:
      "You are inspecting an existing installation and notice the SPD's status indicator is showing 'replace' (red flag visible through the inspection window). What's the right call on the EICR?",
    options: [
      'No code — SPDs are advisory',
      'C2 — potentially dangerous; SPD has reached end of life or has been hit by a surge above its capability and is no longer providing protection. Recommend replacement; record on EICR observations',
      'C3 — improvement only; SPD failure is a reliability issue not a safety issue',
      'C1 — danger present',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 / GN3 inspection: an end-of-life SPD indicator means the device has reached the end of its surge-handling capability or has been damaged. The installation is no longer protected against transient overvoltages — Reg 443 / 534 conditions are no longer met. C2 reflects 'potentially dangerous' because the surge protection that was specified at install (and is required by Reg 443.4.1) is no longer in place. Replacement is the standard remedy.",
  },
];

const faqItems = [
  {
    question: "Type 1 vs Type 2 vs Type 3 — what's the practical difference?",
    answer:
      "Type 1 SPDs are designed to handle DIRECT lightning currents (10/350 µs waveform — higher peak energy, longer duration). Required where there's an external LPS or direct-strike risk. Type 2 handles INDUCED surges (8/20 µs — what most installations actually see from indirect lightning or switching transients). Type 3 provides close protection at sensitive terminals, downstream of Type 1/2. Practical: a typical UK domestic install with no LPS uses Type 2 at the origin and may add Type 3 close to expensive electronics (home-cinema rack, IT equipment).",
  },
  {
    question: 'How do I know if a building needs Type 1 SPDs?',
    answer:
      'Type 1 is mandated by Reg 712.534.102.1 / Reg 534 where the structure has an EXTERNAL lightning protection system (BS EN 62305-3) OR where the BS EN 62305-2 risk assessment has identified direct-strike risk. For most UK domestic and small commercial installations without an LPS, Type 2 is the appropriate origin SPD. Industrial buildings, telecoms sites, hospitals, fuel storage, exposed rural sites — these typically have an LPS and therefore need Type 1.',
  },
  {
    question: 'Does the OCPD protecting the SPD also protect the cable downstream?',
    answer:
      "No — the OCPD protecting the SPD has TWO purposes: it disconnects the SPD safely if it short-circuit-fails (end of life), and it limits fault current to a value the SPD can survive. It is sized per the manufacturer's instructions (typically the highest permitted rating to maximise surge-handling). The downstream cables and protective devices are sized SEPARATELY per Section 433 / 434. Don't conflate them.",
  },
  {
    question: 'What happens if the SPD is not properly earthed?',
    answer:
      'An SPD operates by clamping the surge voltage to earth — without a low-impedance path to the main earthing terminal it cannot work. Reg 534 requires the SPD earthing conductor to be connected to the main earthing terminal of the installation, sized to handle the surge current (typically 16 mm² or 25 mm² for Type 1, 6 mm² for Type 2 — check manufacturer). A long, looped or undersized earth connection significantly degrades the protection. Always run the earth connection as short and straight as possible alongside the line/neutral leads.',
  },
  {
    question: "What's the lead-length budget in real numbers?",
    answer:
      'Total lead length = line conductor + neutral conductor + earth conductor between the busbar / earth bar and the SPD terminals. Aim for under 0.5 m total. At dV/dt of 10 kV/µs and ~1 µH per metre of cable, every 0.5 m of total lead adds approximately 5 kV inductive drop across the SPD assembly during a peak-of-surge event. With Up of 1.5 kV plus 5 kV of inductive drop, effective protection is around 6.5 kV — Category I/II equipment is unprotected. Cut leads to the minimum the installation allows; mount SPDs immediately adjacent to the main switch and earthing terminal.',
  },
  {
    question: 'Are SPDs required on EICR / periodic inspection?',
    answer:
      "Where the installation already has SPDs, the inspector verifies their status (indicator window, replace-if-red), correct location at origin, lead lengths, and OCPD coordination. Where SPDs are absent on an existing installation, the inspector applies the consequence-based test of Reg 443.4.1: if the test is met, absence is a deviation from the current edition — typically C3 (improvement recommended) for an older install where there's no other risk factor, or C2 if the absence creates a clear risk. New installs and significant alterations from 15 April 2026 onward must comply with A4:2026 — absence is non-compliance with the in-force standard, typically C2.",
  },
  {
    question: 'How often should I replace an SPD?',
    answer:
      "BS 7671 doesn't set a fixed interval. Replacement is driven by the device's status indicator going red, or by reaching the manufacturer's stated end-of-life. Lifespan depends heavily on the local surge environment — a rural exposed location may see end-of-life in 3-5 years; an urban low-storm location may continue 15+. Inspect on every EICR (typically 5 / 10 years for domestic / commercial), and consider a more frequent visual check by the customer at every annual fire-alarm test. Plug-in cartridge designs make replacement a 30-second job — quote it as routine maintenance rather than a fault.",
  },
  {
    question: "Are there environments where SPDs aren't required?",
    answer:
      "Reg 443.4.1 is consequence-based — protection is required where the consequence could be (a) serious injury to, or loss of, human life; or (c) significant financial or data loss. For all other cases SPDs are still required unless the owner of the installation declares it is not required because any loss or damage is tolerable and they accept the risk. In practice the genuine omission set is narrow — an isolated detached garage with no electronic equipment, a cattle shed with only lighting and a single socket — and even then it rests on a documented owner declaration. For most domestic dwellings the consequence test is met, so interpretation tends toward 'install SPDs by default'.",
  },
  {
    question: 'How does an SPD fail and how do I know?',
    answer:
      'SPDs fail in two modes. (1) Gradual end-of-life — repeated surges erode the metal-oxide varistor, raising leakage current until the device fails open or short. (2) Catastrophic — a single surge above the device\'s rated handling capacity (e.g. nearby direct lightning strike). Modern SPDs include a status flag — green/red window or an internal microswitch driving an indicator. Inspect at every EICR; "replace" status is C2 because the protection required by Reg 443 / 534 is no longer in place.',
  },
  {
    question: 'Do I need an SPD on every distribution board?',
    answer:
      "Reg 534 covers the principle of cascaded protection. Origin Type 1 / Type 2 protects the whole installation against incoming surges. Distribution boards on long sub-mains (over ~10 m) MAY benefit from a downstream SPD if the cable run is exposed or the loads are sensitive — this depends on the manufacturer's coordination tables and the BS EN 61643-12 application guidance. For a typical domestic CU + immediate sub-board, one origin SPD is usually sufficient. For long sub-mains feeding sensitive equipment, Type 2 at the sub-board plus Type 3 close to the equipment is the layered approach.",
  },
  {
    question: 'What about three-phase installations?',
    answer:
      'Same principle, more poles. A three-phase 230/400 V SPD assembly has Uc ratings appropriate to line-line and line-earth voltages. CT2 (3+1) configuration on TT/IT systems uses three line-PE SPDs plus one neutral-PE SPD. CT1 (4+0) on TN-S / TN-C-S uses four line/N-PE SPDs. The specification work is the same — Uc against system earthing, Up + lead inductance below the equipment Uw, OCPD per manufacturer.',
  },
  {
    question: 'Is the SPD an alternative to RCD additional protection?',
    answer:
      'No. Different physics, different protective measures. RCDs detect imbalance currents (fault leakage to earth) and protect against electric shock — Reg 411.3.3 / 411.3.4. SPDs clamp transient overvoltages and protect equipment / installations from damage — Reg 443 / 534. Both are required where the regulations call for them; one cannot substitute for the other.',
  },
];

const BS7671Module4Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Surge Protection Devices (SPDs) | BS 7671:2018+A4:2026 | Module 4.5',
    description:
      "When SPDs are required (Reg 443.4 / 443.4.1 — A4 deleted the risk-assessment route), Type 1 / 2 / 3 selection (Reg 534.4.1.1), Uc and Up coordination against equipment Uw, the cable-length rule for SPD wiring, and OCPD coordination per the manufacturer's instructions.",
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
            eyebrow="Module 4 · Section 5 · Updated for A4:2026"
            title="Surge protection devices (SPDs)"
            description="When BS 7671 requires SPDs (Reg 443.4 — A4 deleted the old CRL risk-assessment method), how Types 1, 2 and 3 differ and where each goes (Reg 534.4.1.1), the Uc / Up / Uw coordination chain, and why connecting-conductor length is the difference between a working SPD and a defeated one."
            actions={
              <>
                <RegBadge>443.4.1</RegBadge>
                <RegBadge>534.4.1.1</RegBadge>
                <RegBadge>534.4.4.1</RegBadge>
                <AmendmentBadge regs={['443.4.1', '443.5']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'A4:2026 simplified Section 443. Reg 443.5 (risk-assessment / CRL method) and Annex A443 are deleted. Reg 443.4.1 — consequence-based — is now the route: if any listed consequence applies, SPDs are required.',
              'Three SPD types: Type 1 (direct-strike, 10/350 µs), Type 2 (induced surge, 8/20 µs — the typical UK origin default), Type 3 (close protection, downstream of T1/T2 at sensitive equipment).',
              "Connecting-lead length is critical. Cable inductance (~1 µH/m) at lightning dV/dt rates adds hundreds of volts to the SPD's effective protection level. Keep leads under 0.5 m, short and straight, no loops.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 443.4.1 to determine whether an installation requires SPDs and explain why A4 deleted the Reg 443.5 / Annex A443 risk-assessment method.',
              'Distinguish Type 1, Type 2 and Type 3 SPDs by waveform, surge rating, and installation location per Reg 534.4.1.1.',
              'Coordinate SPD parameters (Uc, Up, Iimp, In) against system voltage and equipment Uw to keep effective protection within the 2.5 kV BS 7671 ceiling for 230/400 V.',
              "Specify SPD installation correctly — connecting-lead length, OCPD per the manufacturer's instructions, earthing route — so the protection is real not nominal.",
              'Identify end-of-life SPD indicators and code them appropriately on EICRs (typically C2 — protection no longer in place).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>When are SPDs required — Reg 443</ContentEyebrow>

          <ConceptBlock
            title="A4 simplified the decision — and most installs now need SPDs"
            plainEnglish="Old A3 had a complex risk-assessment / CRL calculation. A4 deleted that. The current rule is consequence-based: if a transient overvoltage could result in serious injury to or loss of human life, or significant financial or data loss, SPDs are required. For all other cases SPDs are still required unless the owner declares the risk tolerable and accepts it. In practice, most modern installations need SPDs."
            onSite="Read Reg 443.4.1 once and bookmark it. The two consequence triggers — serious injury to or loss of human life, and significant financial or data loss — cover most domestic, commercial and industrial installations, and for all other cases SPDs are the default unless the owner formally declines and accepts the risk. Industry consensus has moved to 'fit SPDs by default' for new work, with omission requiring a documented owner declaration."
          >
            <p>
              Reg 443.4.1: protection against transient overvoltages shall be provided where the
              consequence caused by the overvoltage could result in (a) serious injury to, or loss
              of, human life; or (c) significant financial or data loss. Limb (b) was deleted by the
              BS 7671:2018+A2:2022 Corrigendum (May 2023). For all other cases, protection shall
              still be provided unless the owner of the installation declares it is not required
              because any loss or damage is tolerable and they accept the risk of damage to equipment
              and any consequential loss. Reg 443.4.2 separately requires consideration of
              overvoltages from equipment likely to produce switching surges (e.g. large inductive
              loads, capacitor banks). The previous Reg 443.5 risk-assessment route — and its
              supporting Annex A443 — were both deleted in A4:2026.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 443.4.1 — Where transient overvoltage protection is required"
            clause="Protection against transient overvoltages shall be provided where the consequence caused by the overvoltage could result in: (a) serious injury to, or loss of, human life; (b) [Deleted by BS 7671:2018+A2:2022, Corrigendum (May 2023)]; (c) significant financial or data loss. For all other cases, protection against transient overvoltages shall be provided unless the owner of the installation declares it is not required due to any loss or damage being tolerable and they accept the risk of damage to equipment and any consequential loss."
            meaning="Two active consequence triggers — limb (b) was deleted by the A2:2022 Corrigendum (May 2023). If (a) or (c) applies, SPD provision is mandatory ('shall'). For all other cases SPDs are still required unless the owner declares the loss or damage tolerable and accepts the risk. A4:2026 removed the older risk-assessment method; the decision is now consequence-based with an owner-declaration exception."
            cite="BS 7671:2018+A4:2026, Reg 443.4.1"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>How a transient overvoltage actually develops</ContentEyebrow>

          <ConceptBlock
            title="Lightning, switching, and the 1 µs reality"
            plainEnglish="A transient overvoltage is a short-lived spike — typically microseconds long — that exceeds the system nominal voltage by orders of magnitude. Two main sources: lightning (direct strike or induced surge from a strike nearby) and switching (large inductive loads opening, capacitor banks energising, motor starting)."
            onSite="The numbers people quote — 6 kV, 10 kV, 100 kA — sound dramatic but the duration is what matters. A typical induced lightning surge is the 8/20 µs waveform: peak in 8 µs, decay to half-peak by 20 µs. Total energy is small, but the rate of voltage rise (dV/dt) and the current peak combine to destroy unprotected equipment in microseconds. The SPD's job is to clamp the voltage during that brief window."
          >
            <p>
              The 8/20 µs current waveform (induced lightning) and 10/350 µs (direct strike) are the
              two test waveforms the IEC standards use. The 10/350 carries roughly 25× the energy of
              an 8/20 of the same peak amplitude, because of the much longer tail — which is why
              Type 1 SPDs (rated for 10/350) are physically larger and use different internal
              technology (typically spark gaps) than Type 2 (rated for 8/20, typically metal-oxide
              varistors / MOVs). The selection between Types is a question of the expected waveform,
              which depends on whether the structure has direct-strike risk.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What 'protected' equipment actually means"
            plainEnglish="Equipment is rated for an impulse withstand voltage Uw — the peak transient voltage the equipment can survive without insulation breakdown. BS 7671 Categories I/II/III/IV correspond to Uw of 1.5/2.5/4/6 kV. The SPD assembly's job is to clamp the actual transient seen by the equipment to BELOW its Uw."
            onSite="Domestic / small commercial equipment is typically Category II — Uw = 2.5 kV. The SPD assembly's effective protection level (Up plus inductive lead drop) must be below 2.5 kV. Industrial equipment with hardened input stages may be Category III (Uw = 4 kV) or Category IV (Uw = 6 kV) — same SPD specification, more headroom on the protection level. Sensitive electronics with weaker insulation may be Category I (Uw = 1.5 kV) — a Type 3 close-protection SPD is needed to clamp below that lower limit."
          >
            <p>
              The category system is in BS 7671 Table 443.2 and traces back to IEC 60664-1's
              insulation coordination model. Equipment manufacturers declare the category on the
              data sheet. For an installation feeding a mix of equipment categories, the SPD design
              targets the LOWEST Uw on the supply — typically Category II for ordinary fixed
              equipment. Where Category I sensitive electronics are present (audio, telecoms, IT),
              additional Type 3 close-protection at the equipment terminals brings the local
              protection level below 1.5 kV.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Type 1, Type 2, Type 3 — and where each goes</ContentEyebrow>

          <ConceptBlock
            title="The three types and their characteristic waveforms"
            plainEnglish="Type 1 handles direct lightning strikes (10/350 µs waveform — high peak, long duration). Type 2 handles induced surges (8/20 µs waveform — typical of indirect lightning and switching transients). Type 3 provides close protection at sensitive equipment terminals, downstream of Type 1 / 2."
            onSite="UK domestic without LPS: Type 2 at the origin (consumer unit). UK domestic with LPS or rural / exposed: Type 1+2 at origin (combined device or separate pair). Critical equipment downstream: Type 3 within ~10 m of the equipment for surge clamp at the terminals. Industrial: Type 1+2 at incomer + Type 2 at sub-boards + Type 3 at sensitive panels — cascaded protection."
          >
            <p>
              Reg 534.4.1.1: SPDs at the origin shall be Type 1 or Type 2; SPDs close to sensitive
              equipment for further protection shall be Type 2 or Type 3. The waveform difference is
              fundamental — the 10/350 µs (Type 1) carries roughly 25× the energy of an 8/20 µs
              (Type 2) surge of the same peak current, because of the much longer tail. A Type 2
              device exposed to a Type 1 event will fail; a Type 1 device handles both. Cost is
              roughly 3-5× for Type 1 vs Type 2, which is why Type 2 is the economic choice
              everywhere LPS / direct-strike risk doesn't apply.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Selecting parameters — Uc, Up, Iimp, In"
            plainEnglish="Uc is the maximum continuous voltage the SPD sits at without operating. Up is the maximum voltage the SPD lets through during a surge. Iimp is the Type 1 direct-strike current rating (10/350 µs). In is the Type 2 nominal discharge current (8/20 µs)."
            onSite="The selection chain: (1) Uc ≥ 1.1 × U₀ for the system earthing arrangement (Table 534.2). (2) Iimp ≥ expected direct-strike current per BS EN 62305-2 (Type 1 only). (3) In ≥ 5 kA minimum for Type 2 (typically 20 kA in practice). (4) Up plus inductive lead drop ≤ equipment Uw — for 230/400 V, this is 2.5 kV total. Most manufacturers state the worst-case Up + lead inductance assumption directly on the data sheet."
          >
            <p>
              The Uc rating differs by system earthing arrangement. For TN-S / TN-C-S: Uc ≥ 1.1 × U₀
              ≈ 253 V. For TT and IT systems: higher (typically 1.55 × U₀ ≈ 358 V) because
              line-to-PE voltage during faults can be elevated. Pick Uc too low and the SPD clamps
              continuously on normal supply variations, ageing rapidly. Pick Uc too high and Up
              rises with it, reducing effective protection. Table 534.2 of BS 7671 tabulates the
              requirements.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />
          <InlineCheck {...inlineChecks[3]} />
          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>The connecting-lead length problem</ContentEyebrow>

          <ConceptBlock
            title="Cable inductance is the silent SPD killer"
            plainEnglish="Every metre of conductor adds about 1 microhenry of inductance. At the rate of voltage rise in a surge (typically 10 kV/µs), that inductance produces a voltage drop ACROSS the SPD's connecting leads. Long leads add hundreds or thousands of volts to the protected level."
            onSite="The rule is: connecting conductors as short and straight as possible, no unnecessary loops. Total lead length (line + earth combined) under 0.5 m where possible. The SPD goes in the busbar way nearest the main switch / earthing terminal — never at the far end of the board with a long run back."
          >
            <p>
              The mathematics: V_lead = L × dI/dt. For a 1 µH lead and a typical lightning di/dt of
              1 kA/µs, V_lead = 1 µH × 1 kA/µs = 1 kV. On a 0.5 m lead that's already 500 V added to
              the SPD's nameplate Up. On a 1.5 m lead it's 1.5 kV — pushing the effective protection
              level above the BS 7671 ceiling of 2.5 kV for 230/400 V systems and defeating the
              device. Reg 534 / GN3 are explicit: keep leads short and straight, no loops. Some
              manufacturers provide pre-formed busbar adapters that guarantee 0 mm of lead length —
              these are the gold standard for retrofits.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 534 / GN3 — SPD installation rule"
            clause="All conductors and interconnections to the relevant line to be protected, together with the connections between the SPD and any external OCPD, shall be kept as short and as straight as possible and any unnecessary cable loops shall be avoided."
            meaning="The wiring rule for SPDs is physics, not regulatory preference. Long leads add inductive voltage drop in series with the SPD's clamping action. The mandatory short / straight installation isn't aesthetic — it's the only way the protection level the equipment actually sees stays below the equipment's impulse withstand voltage."
            cite="BS 7671:2018+A4:2026, Reg 534"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>The SPD's own end-of-life — how MOVs degrade</ContentEyebrow>

          <ConceptBlock
            title="Each surge takes a small bite out of the SPD"
            plainEnglish="Type 2 SPDs use metal-oxide varistors (MOVs) as the clamping element. Each surge erodes the MOV slightly — the resistance characteristic shifts, the leakage current at normal operating voltage rises, and eventually the MOV fails open or short. SPDs are consumable safety items, not 'fit and forget' for life."
            onSite="The status indicator on the front of every modern SPD shows the device's health. Green window = OK. Red flag = at end of life. SOME devices include a microswitch driving a remote indicator — useful in commercial / industrial cabinets where the SPD isn't visible. Inspect on every EICR. Replacement is straightforward (often plug-in cartridges in modern devices) and should be quoted to the customer as routine maintenance, not as a fault."
          >
            <p>
              Lifespan depends on the surge environment. A rural site with frequent thunderstorms
              may see SPD end-of-life in 3-5 years; an urban site in a low-storm area may continue
              for 15+. Manufacturers publish energy-handling specifications (kJ for Type 2 8/20 µs)
              that allow rough-life estimation if the local storm-day count is known. In practice
              the status indicator is the easier route — inspect and replace when red. Type 1 SPDs
              typically have longer lives because they're sized for direct-strike events that are
              rarer than induced surges.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Plug-in cartridges vs fixed devices"
            plainEnglish="Modern Type 1+2 SPDs at consumer-unit / DB scale increasingly use plug-in cartridges — the active element (MOV / spark gap stack) is a removable plug-in module, with the base / wiring fixed. End-of-life: pull and replace cartridge in 30 seconds, no rewiring."
            onSite="The cartridge approach significantly reduces the cost of SPD replacement — particularly on industrial assemblies where the wiring labour to replace a fixed device can exceed the device cost itself. Hager, Schneider, ABB, Eaton and Mersen all offer plug-in product lines. For new installs, the cartridge format is usually a small premium worth paying for the future replacement-cost saving."
          >
            <p>
              The cartridge approach also enables remote monitoring — many cartridge-based SPDs
              include status contacts that can be wired to a building-management system or a simple
              status panel. For commercial / industrial sites where SPD failure could go unnoticed
              for years, the remote indicator pays for itself the first time a degraded SPD is
              caught before the next major surge takes out the equipment it was supposed to protect.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cascaded protection — origin + sub-board + close</ContentEyebrow>

          <ConceptBlock
            title="Three layers, three jobs"
            plainEnglish="Origin SPD (Type 1 / Type 1+2) catches direct-strike and high-energy events at the building entry point. Distribution-board SPD (Type 2) catches let-through from the origin SPD plus locally-induced surges in the sub-main run. Close-protection SPD (Type 3) catches residual surges at the sensitive equipment terminals."
            onSite="Cascaded protection coordinates per BS EN 61643-12 application guidance. The origin SPD does the heavy lifting; downstream SPDs handle smaller residuals. For domestic use, a single origin Type 2 is usually sufficient. For commercial / industrial with sensitive electronics, the three-layer cascade is the gold standard. Manufacturers publish coordination tables for matched cascade products in their range."
          >
            <p>
              The reason cascading works is that an SPD doesn't reduce the surge to zero — it clamps
              to its Up. A 1.5 kV Up at the origin still puts a 1.5 kV transient onto the busbar
              feeding downstream. A Type 2 SPD at the sub-board sees that 1.5 kV transient and
              clamps it to a lower Up (say 1.2 kV). A Type 3 close-protection SPD at the equipment
              sees the 1.2 kV and clamps to 0.9 kV — well below the Category I Uw of 1.5 kV. Each
              layer reduces the residual; cumulative protection beats single-layer for sensitive
              loads.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>OCPD coordination — protecting the SPD itself</ContentEyebrow>

          <ConceptBlock
            title="The OCPD upstream of the SPD has two jobs"
            plainEnglish="(1) Disconnect the SPD safely if it short-circuit-fails at end of life. (2) Limit fault current to what the SPD can handle. The OCPD does NOT protect the downstream cables — that's a separate Section 433 / 434 calculation."
            onSite="Read the manufacturer's installation manual. It specifies the maximum permitted OCPD type and rating (typically gG fuse or MCB up to a stated kA rating). Use the HIGHEST permissible rating — Reg 534 specifically says so. Higher OCPD rating = more let-through energy permitted to the SPD = larger surge events the assembly can handle."
          >
            <p>
              Reg 534: external OCPDs protecting the SPD assembly shall be the highest permissible
              rating to provide a high surge current capability. Some SPDs have integrated OCPDs
              (typically a thermal fuse plus an indicator) — others rely on external upstream fuses
              or MCBs sized per the data sheet. The OCPD rating is bounded above by what the SPD can
              survive (manufacturer's max) and below by the surge current the installation actually
              needs to handle (BS EN 62305-2 / BS EN 61643-12 application guidance). Most domestic
              Type 2 SPDs are sized against a 32 A or 40 A MCB upstream; Type 1 origin units
              typically need 100 A gG fuses.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Putting an SPD on the load-side of an RCD without a strategy"
            whatHappens="Installer adds a Type 2 SPD on a sub-board that's fed from a 30 mA RCD upstream. During a real surge, the SPD operates and dumps the surge current to earth — the RCD detects this as a 30 mA imbalance and trips. Equipment downstream loses supply at the moment of the surge; the surge protection itself caused the disconnection."
            doInstead="Place SPDs UPSTREAM of any RCD wherever possible. Where an SPD must sit downstream of an RCD (e.g. existing CU constraints), use a Type S 100 mA selective RCD upstream that doesn't trip on the SPD's surge current. Some SPD products are explicitly RCD-coordinated with let-through limits below 30 mA — check the manufacturer's specification for compatibility."
          />

          <CommonMistake
            title="Mounting the SPD at the far end of the consumer unit"
            whatHappens="On a 12-way DIN-rail CU, the spare way is at the right-hand end. SPD goes there with 1.0 m of cable looping back to the main switch and earth bar. Effective Up during a real surge is 1.4 kV (nameplate) + ~1.0 kV (lead inductance) = 2.4 kV — borderline. A slightly larger surge pushes the effective protection above 2.5 kV and the protected equipment sees 3+ kV — beyond Category I/II Uw."
            doInstead="Always mount the SPD in the busbar way IMMEDIATELY adjacent to the main switch and earthing terminal. Total lead length (L + N + earth) under 0.5 m. Where the spare way is wrong-end, replace one of the existing devices to free up a near-end way, OR use a manufacturer-provided busbar adapter that mounts the SPD with zero lead length on the busbar itself."
          />

          <CommonMistake
            title="Missing the A4 update — still using the old risk-assessment route"
            whatHappens="Designer follows pre-A4 practice: applies the Reg 443.5 CRL calculation, decides 'low risk', omits SPDs from a new 4-bed dwelling. EICR a year later flags the omission — Reg 443.5 was DELETED in A4:2026, the current rule is consequence-based, and a 4-bed dwelling meets the Reg 443.4.1 consequence test (and even where it does not, SPDs are still required unless the owner formally declares the risk tolerable and accepts it). Customer wants the cost back."
            doInstead="A4:2026 is in force from 15 April 2026. Use the consequence-based Reg 443.4.1 directly. For most domestic / commercial installations, at least one consequence trigger applies and SPDs are mandatory. The simplification is in the designer's favour — the decision tree is now binary, not a multi-page risk calculation."
          />

          <CommonMistake
            title="Forgetting the SPD's earthing conductor sizing"
            whatHappens="Designer specs a Type 1+2 SPD with Iimp = 12.5 kA. Connects the SPD to the MET via a 6 mm² PE conductor (matching the Type 2 minimum). On a real direct-strike event, the 12.5 kA surge current overwhelms the 6 mm² conductor — significant inductive voltage drop pushes the effective protection level above 2.5 kV; the conductor itself may be damaged. Equipment downstream sees a much higher transient than intended."
            doInstead="The SPD's earthing conductor must be sized for the surge current it will conduct. For Type 1 / Type 1+2: typically 16 mm² minimum, 25 mm² preferred per the manufacturer's data sheet. For Type 2-only: 6 mm² is usually adequate but check the manual. The conductor must be SHORT and STRAIGHT — same wiring rule as the line/neutral leads. Connect directly to the MET, not through a daisy-chain via other earth bars. The SPD's surge-handling capability is meaningless without the earth path that conducts that surge into the ground."
          />

          <CommonMistake
            title="Type 2 SPD on a building with an external LPS"
            whatHappens="A barn conversion has an existing external lightning protection system (legacy from when it was a working farm). New consumer unit installed with a Type 2 SPD at the origin. First serious thunderstorm: the SPD takes a direct-strike current it wasn't rated for and fails catastrophically — open circuit, no protection, possible fire risk."
            doInstead="Reg 712.534.102.1: where the structure has an external LPS (or where BS EN 62305-2 risk assessment identifies direct-strike risk), Type 1 SPDs shall be installed as close as possible to the origin, typically combined with Type 2 SPDs. Use a combined Type 1+2 device or a Type 1 / Type 2 pair. The Iimp rating must match the LPS Class (per BS EN 62305-1) — typically 12.5 kA per pole for Class III, higher for Class I/II structures."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Rural farmhouse — exposed location, no existing LPS, frequent thunderstorms"
            situation="Rural detached property on a hilltop, 200 m from nearest neighbour. Standard TN-C-S domestic supply. Customer reports having lost three TVs and a microwave to lightning over the past 8 years. No external lightning protection system fitted to the building. Designer is asked to specify SPDs for the upgraded consumer unit."
            whatToDo="Two-stage assessment. (1) Should the building have an external LPS? BS EN 62305-2 risk assessment based on the building's exposed location and lightning history strongly suggests yes — but that's a separate piece of work (typically a roofer / lightning specialist). (2) Within BS 7671, Reg 443.4.1 consequence test is met — the customer's repeated equipment losses point to significant financial or data loss, and a hilltop dwelling at direct-strike risk also engages the life-safety limb. Spec: Type 1+2 combined SPD at the consumer unit origin (Iimp ≥ 12.5 kA per pole, Uc ≥ 275 V, Up ≤ 1.5 kV) — treated as if LPS exists because of the direct-strike risk. Add a Type 3 close-protection SPD for the customer's hi-fi / IT rack as a value-add. Document the design under Reg 120.3 explaining the Type 1+2 specification despite no LPS being fitted."
            whyItMatters="Rural / exposed locations are exactly where the BS 7671 SPD requirements bite hardest. The customer's lost equipment history is direct evidence the consequence test of Reg 443.4.1 is met. Specifying Type 2-only because 'there's no LPS' would be technically defensible to the letter of Reg 534.4.1.1 but practically inadequate — the building is at direct-strike risk regardless of formal LPS status. Senior designers will spec Type 1+2 here; the cert documents the rationale."
          />

          <Scenario
            title="New 3-bed semi — A4 design from scratch"
            situation="Designer is specifying a new consumer unit for a 3-bed semi-detached. No external LPS, suburban location, standard DNO TN-C-S supply. Customer has questioned why an SPD is included on the quote when neighbours' boards don't have one."
            whatToDo="Reg 443.4.1 consequence test. Item (c) 'significant financial or data loss' applies where surge-damaged appliances, home-office IT or stored data are at stake — common in any modern dwelling, more so if anyone works from home. Item (a) 'serious injury to, or loss of, human life' is interpreted broadly — a surge-damaged appliance creating fire risk meets the criterion. And for all other cases SPDs are still required unless the owner formally declares the risk tolerable and accepts it. Specify a Type 2 SPD at origin (no LPS, so Type 1 not required), Uc 275 V (above the 1.1 × 230 V TN-C-S minimum), In 20 kA, Up under 1.5 kV, mounted in the way nearest the main switch with leads under 0.5 m. Quote stands."
            whyItMatters="The A4 simplification has shifted the conversation from 'why are we fitting SPDs?' to 'what justification do we have for omission?'. For most domestic dwellings the consequence-based test is satisfied, and where it is not, omission requires a documented owner declaration accepting the risk. Documenting the design decision (one line on the design sheet referencing Reg 443.4.1 (a) and (c)) makes it audit-defensible if the customer questions later."
          />

          <Scenario
            title="Industrial unit upgrade — existing LPS, mixed equipment"
            situation="Light industrial unit with an existing external LPS Class III. New 400 A TP&N consumer unit being installed. Loads include three CNC machines (sensitive electronics), VSDs on extraction fans, lighting, sockets. The unit's IT room (servers + comms) is on a sub-board 25 m away."
            whatToDo="Layered protection. (1) Origin: Type 1+2 combined SPD assembly, Iimp ≥ 12.5 kA per pole (matched to Class III LPS), with 100 A gG fuse upstream per the manufacturer's data sheet. Mount in busbar way adjacent to the main switch, leads under 0.3 m. (2) Sub-board (IT room): Type 2 SPD at the sub-board to handle let-through from the origin and any locally-induced surges in the 25 m feeder. (3) Inside the IT cabinet: Type 3 SPDs on the sensitive equipment power inlets for close protection. Reg 534.4.1.1 hierarchy is satisfied; cascaded protection coordinates per BS EN 61643-12 application guidance."
            whyItMatters="Industrial spaces with sensitive electronics and external LPS are exactly the case where layered SPD protection earns its keep. Single Type 1+2 at origin reduces the surge magnitude reaching the sub-board; Type 2 at the sub-board further clamps it; Type 3 at the equipment terminals ensures the final voltage seen by sensitive electronics is well below their Uw. Skip any layer and the chain becomes the weakest link — typically the equipment-level Type 3 absent means the IT kit takes the residual surge."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="The SPD specification checklist"
            plainEnglish="Six questions, in order. Answer each from the consequence test (Reg 443.4.1), the structure (LPS or no LPS), the system earthing arrangement, the equipment categories, the manufacturer's data sheet, and the install location. Document each answer on the design sheet — that's your audit trail."
            onSite="Print and tape to the bench: (1) Is SPD required? Reg 443.4.1 consequence test. (2) Type 1 or Type 2? LPS / direct-strike risk per BS EN 62305-2. (3) Uc? Table 534.2 for the system earthing. (4) In / Iimp? Type 2 minimum 5 kA, Type 1 per BS EN 62305-1 LPS class. (5) Up + lead drop ≤ Uw? Categorise the equipment. (6) Cable lengths? Under 0.5 m total, short and straight."
          >
            <p>
              For every standard install (consumer unit at origin, no LPS), the answers typically
              line up: (1) Yes — Reg 443.4.1 consequence test usually triggered. (2) Type 2. (3) Uc
              ≥ 275 V for TN-S / TN-C-S; ≥ 358 V for TT. (4) In ≥ 20 kA (typical commercial
              product). (5) Up ≤ 1.5 kV with 0.5 m leads keeps effective well under 2.5 kV ceiling.
              (6) Mount adjacent to main switch, leads under 0.5 m. Most domestic installs reduce to
              picking a Type 2 SPD from the manufacturer's catalogue with In ≥ 20 kA / Up ≤ 1.5 kV /
              appropriate Uc, and following the wiring rules.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <SectionRule />

          <ConceptBlock
            title="The customer conversation about SPDs"
            plainEnglish="Customers often question SPDs because the cost is visible (£100-300 to the device cost on the quote) and the benefit is invisible until something happens. The conversation needs to make the consequence concrete — fried boiler PCB, failed TV / fridge / IT kit, a hot-water tank that won't heat — and quantify the protection."
            onSite="Compare the SPD cost (£200) against the replacement cost of the customer's electronics on a single bad surge (£1,500-3,000 for a typical domestic kit list). The SPD pays for itself the first time it operates. Don't oversell — most installations may never see a clamping event — but the customer's home insurance often specifies SPD presence as a condition of cover for surge-related claims, which is the closing argument for most homeowners."
          >
            <p>
              For commercial installs, the conversation is often about business continuity: what's
              the cost of a server / EPOS / refrigeration system being out of action for two days
              while replacement parts are sourced? £200 of SPD against a £20,000
              business-interruption claim is an easy economic argument. Insurers increasingly
              recognise SPDs in their underwriting — some policies discount the premium for
              installations with documented SPD coverage, others exclude surge claims unless SPDs
              are present.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'A4:2026 deleted Reg 443.5 (risk-assessment / CRL) and Annex A443. Reg 443.4.1 — consequence-based — is the route. Most modern installations meet at least one trigger.',
              'Type 1 (direct strike, 10/350 µs) — required where external LPS / direct-strike risk. Type 2 (induced surge, 8/20 µs) — UK origin default without LPS. Type 3 — close protection downstream of T1/T2.',
              'Selection chain: Uc ≥ 1.1 × U₀ per Table 534.2; Iimp / In per Type and BS EN 62305-2; Up + lead inductance ≤ equipment Uw (2.5 kV ceiling for 230/400 V).',
              'Connecting-lead length is the single most-common SPD mistake. Cable inductance ~1 µH/m at lightning dV/dt adds hundreds of volts. Total leads under 0.5 m, short and straight, no loops.',
              "OCPD per the manufacturer's instructions — use the highest permitted rating to maximise surge-handling. End-of-life SPD indicator on EICR = C2.",
              "SPDs are consumable safety items, not 'fit and forget'. Each surge erodes the MOV; status indicator goes red when device reaches end of life. Inspect on every EICR; replacement is straightforward (often plug-in cartridges).",
              "Earthing conductor sizing: Type 1 / Type 1+2 typically 16 mm² minimum (25 mm² preferred). Type 2 typically 6 mm². Short, straight, direct to MET. The SPD's surge-handling is meaningless without an adequate earth path.",
              "Designer's quick reference: 6 questions — Reg 443.4.1 (required?), LPS (Type 1 or 2?), Table 534.2 (Uc?), BS EN 62305 (Iimp?), Table 443.2 (Up vs Uw?), wiring (lead length?).",
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
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4-section-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.6 Arc fault detection devices
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module4Section5;
