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
    id: 'm7s2-part-722-scope',
    question:
      'A homeowner plugs a Mode 1 cable from a portable EV into a standard 13 A BS 1363 socket in their garage. Does Part 722 apply to this socket-outlet?',
    options: [
      'Yes — any socket-outlet used to charge an EV falls under Part 722',
      'No — Part 722 covers dedicated EV equipment; a general 13 A socket does not',
      'Only if the socket-outlet is mounted in an outdoor location',
      'Only if the supply to the property is a TN-C-S arrangement',
    ],
    correctIndex: 1,
    explanation:
      'Part 722 applies to circuits intended to supply electric vehicles for charging purposes via dedicated charging equipment — Mode 2 (in-cable control box), Mode 3 (dedicated EVSE) and Mode 4 (DC off-board chargers). A standard 13 A socket installed for general use does not fall under Part 722 just because someone plugs a Mode 1 cable into it. However, the moment a socket is dedicated to or marked for EV charging, Part 722 applies in full — including the PEN prohibition on TN supplies and the RCD requirements.',
  },
  {
    id: 'm7s2-pen-prohibition',
    question:
      'You are wiring a 7 kW Mode 3 charger from a TN-C-S consumer unit. Reg 722.312.2.1 (new in A4) states what about the EV charging circuit?',
    options: [
      'It must be on a 30 mA Type AC RCD',
      'It shall not include a PEN conductor in a TN system',
      'It must use a minimum 10 mm² cable',
      'It must be located outdoors only',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.312.2.1 (A4): "A circuit supplying charging equipment for electric vehicles in a TN system shall not include a PEN conductor." The combined PEN must be split into separate N and PE before the EV final circuit, so that only TN-S configuration is presented to the EV. The combined PEN brings the open-PEN risk that elevates the conductive vehicle body to near-line voltage.',
  },
  {
    id: 'm7s2-rcd-type-internal-detection',
    question:
      'The manufacturer\'s installation manual for a modern 7 kW domestic charger states "integrated 6 mA DC fault detection per BS EN 61851-1". What RCD type is needed UPSTREAM at the consumer unit?',
    options: [
      'Type AC, since the charger handles all DC fault current internally',
      'Type A — the charger handles the smooth DC residual itself',
      'Type B — always required for any EV install regardless of detection',
      "No RCD at all — the charger's internal device replaces the upstream one",
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.531.3.101: where the EV charging equipment provides protection against DC fault current of 6 mA or greater (per BS EN 61851-1), a Type A RCD upstream is sufficient. Type B is required where the charger does NOT provide that internal DC detection. Type AC is blind to pulsating DC and is not appropriate. The 30 mA additional protection (Reg 411.3.3) still applies in either case.',
  },
  {
    id: 'm7s2-additional-protection',
    question:
      'A dedicated 32 A EV final circuit is being designed on TN-C-S. Which BS 7671 regulation requires 30 mA additional protection on the circuit?',
    options: [
      'Reg 411.3.4 — the luminaire RCD rule for domestic premises',
      'Reg 411.3.3 — 30 mA additional protection covering the EV circuit',
      'Reg 461.2 — the prohibition on switching the PEN conductor',
      'Reg 415.2.1 — supplementary equipotential bonding requirements',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.3.3 mandates 30 mA RCD additional protection on socket-outlets up to 32 A and on mobile equipment used outdoors. Part 722 (Reg 722.531) confirms the EV charging final circuit falls within this regime — every EV charging circuit therefore has 30 mA additional protection in addition to the type selection (Type A vs Type B per Reg 722.531.3.101).',
  },
  {
    id: 'm7s2-open-pen-detection',
    question:
      'On a TN-C-S supply, you cannot reasonably split N and PE upstream of the EV charger to give a TN-S configuration. What alternative compliance route does Section 722 permit?',
    options: [
      'Ignore the requirement and rely solely on the upstream 30 mA RCD',
      'Use a charger or device with open-PEN detection that disconnects all poles',
      'Substitute a Type AC RCD in place of the specified Type B device',
      'Bond the vehicle chassis directly to the incoming gas pipe',
    ],
    correctIndex: 1,
    explanation:
      'Where TN-S configuration to the EV cannot be guaranteed, the recognised alternatives are (1) a separate earth electrode forming a TT island for the EV (with its own RCD per Reg 411.5.3), or (2) an open-PEN detection device that monitors L-N voltage and disconnects all live conductors AND the PE on a PEN fault — most modern domestic chargers integrate this. The bare TN-C-S route without mitigation is non-compliant under Reg 722.312.2.1.',
  },
  {
    id: 'm7s2-mounting-location',
    question:
      'Reg 722.55 covers the mounting and positioning of EV charging equipment. Which of the following is most relevant when fixing a charger to an exterior wall in a UK domestic install?',
    options: [
      'Mount the charger no higher than 0.5 m above ground level',
      'Mount so impact, water ingress and collision risk are addressed (IP44 min)',
      'Mount only on an east-facing wall to limit weather exposure',
      'Mount at a minimum height of 2.5 m above the ground',
    ],
    correctIndex: 1,
    explanation:
      "Reg 722.55 deals with the practical positioning of charging equipment: outdoor IP rating (IP44 minimum, IP54+ for fully exposed locations), mechanical impact protection (consider AG codes — typically AG2 or higher near vehicle manoeuvres), and accessibility for the user. Manufacturer's mounting height (typically ~1.0-1.2 m from ground) and clearance from combustible materials must also be respected.",
  },
  {
    id: 'm7s2-bs-en-61851-ref',
    question:
      'BS EN 61851 is the international product standard family that BS 7671 Section 722 references for EV charging equipment. What does BS EN 61851-1 cover?',
    options: [
      'The colour of the EV charging cable insulation only',
      'General requirements for conductive EV charging — modes, control pilot, 6 mA detection',
      'The roof and canopy structure of public charging stations',
      'Battery chemistry, cell balancing and cell-level safety',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61851-1 is the general-requirements part of the EV conductive-charging product standard family. It defines the four charging modes, the control pilot signalling protocol (the PWM-on-CP-line conversation between charger and vehicle), the protective function requirements (including the 6 mA DC fault detection that Reg 722.531.3.101 references), connector requirements, and lockout/safety behaviour. Other parts of the family (61851-21, 61851-22, 61851-23, 61851-24) cover vehicle-side, AC-EVSE, DC-EVSE and digital-communication-specific requirements respectively.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 7671 part is the dedicated section for electric vehicle charging installations?',
    options: ['Part 701', 'Part 705', 'Part 722', 'Part 753'],
    correctAnswer: 2,
    explanation:
      'Part 722 (Section 722 of Part 7) is the dedicated special-installation section for "Electric vehicle charging installations" in BS 7671:2018+A4:2026. Part 701 covers locations containing a bath/shower, Part 705 agricultural/horticultural, Part 753 floor and ceiling heating systems.',
  },
  {
    id: 2,
    question:
      'Reg 722.312.2.1 (new in A4:2026) introduces an explicit prohibition. What does it forbid in an EV charging circuit on a TN supply?',
    options: [
      'Inclusion of a PEN conductor in the EV charging circuit',
      'Use of any RCD with a rating smaller than 100 mA',
      'Use of single-phase chargers rated above 7 kW',
      'Outdoor installation of the EV charging equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 722.312.2.1 (verbatim): "A circuit supplying charging equipment for electric vehicles in a TN system shall not include a PEN conductor." This is one of the headline A4 changes for EV charging — the combined PEN must be split into separate N and PE before the EV circuit, or one of the alternative protective measures (open-PEN detection device, separate earth electrode TT island) must be used.',
  },
  {
    id: 3,
    question:
      'Which RCD type is required for an EV charging circuit where the charging equipment does NOT provide internal 6 mA DC fault detection?',
    options: [
      'Type AC, sensing alternating residual current only',
      'Type A, sensing pulsating DC residual current',
      'Type F, intended for single-phase frequency drives',
      'Type B, or Type A combined with a 6 mA RDC-DD',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 722.531.3.101: where the charging equipment does not provide protection against DC fault current ≥ 6 mA, the protective measure shall be either a Type B RCD, or a Type A RCD combined with a residual direct-current detecting device (RDC-DD) of 6 mA. Type AC is not acceptable for any modern EV install (smooth or pulsating DC components). Type F is for high-frequency single-phase VSDs and is not what Section 722 calls for.',
  },
  {
    id: 4,
    question:
      'A Mode 3 EV charger on a TN-C-S supply — which compliance route SATISFIES Reg 722.312.2.1?',
    options: [
      'Run a single PEN to the charger and rely on the upstream 100 A main switch',
      'Provide TN-S to the EV, OR an open-PEN detection device, OR a TT island',
      'Increase the cable to 10 mm² and accept the bare TN-C-S supply as it is',
      'Fit a Type AC 30 mA RCD on the circuit without any further measures',
    ],
    correctAnswer: 1,
    explanation:
      "Section 722 sets out the recognised compliance routes: (a) TN-S configuration to the EV — split N and PE upstream so no PEN exists in the EV circuit; (b) open-PEN detection device that monitors L-N voltage and disconnects all live conductors plus PE on PEN fault (most modern domestic chargers integrate this — verify the manufacturer's declaration); (c) TT island — separate earth electrode for the EV charger, with appropriate RCD protection per Reg 411.5.3. Cable size and RCD type do not address the PEN prohibition.",
  },
  {
    id: 5,
    question:
      'What is the maximum disconnection time for a 32 A single-phase EV charging final circuit on TN, under Reg 411.3.2 / Table 41.1?',
    options: ['0.2 s', '0.4 s', '1 s', '5 s'],
    correctAnswer: 1,
    explanation:
      'A 32 A EV final circuit on a TN system follows the general Reg 411.3.2 / Table 41.1 rule: 0.4 s maximum disconnection time for final circuits up to 63 A on TN. The 30 mA RCD demonstrates this comfortably (operating times at IΔn and 5 IΔn are typically well under 0.4 s — verified at testing). 5 s applies to TN distribution circuits, not to the final circuit feeding the charger.',
  },
  {
    id: 6,
    question:
      'A commercial site is installing a 22 kW three-phase Mode 3 charger. The site has a TN-S supply and the chosen charger has integrated 6 mA DC detection. What RCD configuration is correct?',
    options: [
      'A single 100 mA Type AC RCD at the origin covering the whole EV circuit',
      'Type B 300 mA, because a 30 mA Type A device is unsafe on a 22 kW charger',
      'No RCD at all — three-phase chargers are exempt from Reg 411.3.3',
      'Type A 30 mA four-pole RCD or per-phase RCBOs, with the charger handling DC',
    ],
    correctAnswer: 3,
    explanation:
      'Three-phase EV chargers with internal 6 mA DC detection per BS EN 61851-1 can be protected upstream by a Type A 30 mA device (Reg 722.531.3.101). The 30 mA additional protection requirement still applies (Reg 411.3.3 — sockets and equipment used by ordinary persons). A four-pole Type A 30 mA RCD or four Type A 30 mA RCBOs (one per pole) are both common arrangements. Type AC is obsolete; 100 mA / 300 mA do not satisfy the 30 mA additional protection requirement.',
  },
  {
    id: 7,
    question:
      'Reg 461.2 has long prohibited switching the PEN in TN-C / TN-C-S installations. How does Reg 722.312.2.1 (A4) extend that thinking specifically for EV charging?',
    options: [
      'It permits switching the PEN provided a Type B RCD is fitted on the circuit',
      'It requires a second PEN conductor run in parallel for added redundancy',
      'It bans the PEN conductor entirely from the EV circuit on a TN supply',
      'It applies only to EV chargers rated above 22 kW on three-phase supplies',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 461.2 (general): you may not isolate or switch the PEN in a TN-C / TN-C-S system. Reg 722.312.2.1 (EV-specific, new in A4) goes much further — the EV circuit itself shall not include a PEN conductor at all. The combined PEN must be split into separate N and PE before the EV circuit. The reason: the conductive vehicle chassis provides a high-area touch contact during charging, and an open PEN with load on the rest of the property would push the vehicle body to dangerous touch voltage.',
  },
  {
    id: 8,
    question:
      'On an EICR of an existing Mode 3 EV charger installation, what observation classification typically applies if the installation predates A4 but includes a PEN in the EV circuit with no open-PEN detection device fitted?',
    options: [
      'No code — it complied with the edition in force at the time of install',
      'C3 only — purely advisory, because A4 is not applied retrospectively',
      'C2 — the open-PEN failure mode presents a real shock risk via the vehicle body',
      'C1 — danger present, requiring immediate isolation in every case',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 amendments are not strictly retrospective, but EICR coding (per GN3) considers the real-world risk. An EV install on a bare TN-C-S supply with no open-PEN protection presents a recognised severe hazard — the vehicle chassis is a conductive enclosure the user routinely contacts. C2 is the typical call: document the deviation, recommend retrofit of an open-PEN detection device (most domestic chargers can be replaced with a device that integrates this) or a TN-S configuration. C1 is reserved for cases where danger is imminent (e.g. measured PE-N voltage already elevated). C3 understates the hazard.',
  },
];

const faqItems = [
  {
    question:
      'Does Part 722 apply to every socket used to charge an EV, including a domestic 13 A socket and a Mode 1 cable?',
    answer:
      'No. Part 722 is scoped to dedicated EV charging equipment (Mode 2 in-cable control box, Mode 3 dedicated EVSE, Mode 4 DC off-board chargers). A general-purpose 13 A socket that someone happens to plug a Mode 1 cable into remains a general socket under the rest of BS 7671 — Reg 411.3.3 (30 mA additional protection on a socket up to 32 A) still applies. The moment a socket is dedicated to or labelled for EV charging, however, Part 722 applies in full — including Reg 722.312.2.1 (no PEN on TN) and Reg 722.531.3.101 (RCD type).',
  },
  {
    question:
      'Why does Reg 722.312.2.1 ban the PEN conductor in the EV charging circuit specifically — Reg 461.2 already bans switching it?',
    answer:
      'Reg 461.2 prohibits ISOLATING or SWITCHING the PEN, but historically allowed the PEN itself to run through the installation up to the consumer unit, where N and PE are split. Reg 722.312.2.1 (new in A4:2026) bans the PEN conductor IN THE EV CIRCUIT entirely — N and PE must be split before the EV charger. The reason: an open PEN upstream causes the local PE potential to rise to near-line voltage. On a normal 230 V kettle that risk is bad enough; on an EV the charging cable couples that voltage onto the conductive vehicle body, which the user has a large-area touch contact with, including standing barefoot on a wet driveway. The shock risk is materially worse than for general appliances, hence the dedicated EV-circuit prohibition.',
  },
  {
    question: 'How do I know whether my chosen EV charger has internal 6 mA DC fault detection?',
    answer:
      'Check the manufacturer\'s installation manual or product datasheet for a declaration of compliance with BS EN 61851-1 including DC residual fault detection of 6 mA. Most modern UK domestic chargers (Ohme, Hypervolt, EO, Wallbox Pulsar, Andersen, Pod Point Solo 3, etc.) integrate this and explicitly state "Type A RCD upstream sufficient". Older chargers and some commercial three-phase units do not — those require Type B upstream (Reg 722.531.3.101). Never assume — the manufacturer\'s spec is the binding source, and the inspector will ask for it.',
  },
  {
    question: 'Can I install an EV charger on a TT supply without any of the open-PEN measures?',
    answer:
      'Yes — TT supplies have no PEN to begin with, so Reg 722.312.2.1 is automatically satisfied (there is no shared protective-and-neutral conductor). The TT installation still needs full ADS via RCD (Reg 411.5.3), 30 mA additional protection on the EV circuit (Reg 411.3.3), and the correct RCD type (Type A or B per Reg 722.531.3.101). Earth electrode resistance must be verified — Ra × IΔn ≤ 50 V. For TT installations, EV charging is in many ways simpler than TN-C-S.',
  },
  {
    question: 'What IP rating does an outdoor EV charger need?',
    answer:
      'Reg 722.55 covers mounting and positioning. The general external influence codes (Section 522) drive the IP rating: AD3 (water) and AG (mechanical impact). IP44 is the minimum for an outdoor wall-mounted charger under typical eaves; IP54 or higher is appropriate for fully exposed locations and is what most domestic chargers achieve. The charging cable connector itself must meet IP44 minimum when engaged and IP24 when stowed (BS EN 62196-2 for Type 2). Vehicle-collision risk should also be addressed — bollards or kerb-set installs where the charger could be impacted by reversing vehicles.',
  },
  {
    question: 'What cable size is right for a 7 kW single-phase home charger?',
    answer:
      '7 kW @ 230 V = ~30 A continuous (32 A protective device). Reference Method (typically C — clipped direct, or B — within trunking) sets the tabulated current capacity. For a typical run up to ~20 m clipped direct in 6 mm² T&E, volt drop is around 2-3% — well under the 5% limit. Longer runs push to 10 mm². Always perform the actual volt-drop calculation: mV/A/m × Ib × length / 1000, plus any grouping/ambient correction factors per App 4. Don\'t default to "6 mm² always" — at >25 m it may be borderline.',
  },
  {
    question: 'Do I need a separate earth electrode for an EV install on TN-C-S?',
    answer:
      'Only if you are using the "TT island" compliance route (Reg 411.5.3 + alternative to TN-S configuration). Most modern domestic installs use the integrated open-PEN detection device built into the charger itself instead — much simpler than driving a rod and managing it on EICRs. Either is acceptable under Section 722, provided the charger/device manufacturer\'s instructions are followed. If you DO add a TT island electrode, isolate the EV CPC from the consumer\'s MET to avoid coupling the elevated potential back into the building.',
  },
  {
    question: 'Is load management (smart charging / OZEV) a BS 7671 issue or a separate spec?',
    answer:
      "BS 7671 is concerned with safety — adequacy of cable, protective device, RCD type, earthing arrangement. Smart charging and load management are required by The Electric Vehicle (Smart Charge Points) Regulations 2021 (separate UK statute) and OZEV grant rules — these mandate features such as off-peak default scheduling, randomised delay, demand-side response and security. The two regimes overlap where load-management capability lets you stay within DNO supply capacity (avoiding a service upgrade) — that's relevant to your design current Ib in BS 7671 terms (Reg 311 / 433). Always document what the load-management envelope is so the design current isn't exceeded.",
  },
  {
    question: 'Does the new A4:2026 EV requirement apply retrospectively to existing installs?',
    answer:
      'No — like all BS 7671 amendments, A4 is not strictly retrospective. New installs from 15 April 2026 must comply with A4. Existing installs are assessed against the edition in force at the time of installation. However — and this is the important nuance — EICR observations are coded against real-world risk per GN3. An existing EV install on TN-C-S with a bare PEN and no open-PEN detection device presents a documented severe hazard regardless of the install date, and the typical EICR call is C2 (potentially dangerous) with a recommendation to retrofit a compliant charger or add an open-PEN device. C3 understates the actual shock risk to the user.',
  },
];

const BS7671Module7Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Electric Vehicle Charging (Part 722) | BS 7671:2018+A4:2026 | Module 7.2',
    description:
      'Part 722 of BS 7671:2018+A4:2026 — EV charging modes, the new Reg 722.312.2.1 PEN prohibition on TN, RCD type selection (722.531.3.101), open-PEN detection, and the practical compliance routes for domestic and commercial installations.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2 · Updated for A4:2026"
            title="Electric vehicle charging installations (Part 722)"
            description="The dedicated BS 7671 section for EV charging — Mode 2/3/4 equipment, the new A4 PEN prohibition (Reg 722.312.2.1), the RCD-type rule (Reg 722.531.3.101), open-PEN detection devices, and how to specify a compliant domestic or commercial install on TN-C-S, TN-S or TT."
            actions={
              <>
                <RegBadge>722.312.2.1</RegBadge>
                <RegBadge>722.531.3.101</RegBadge>
                <RegBadge>722.55</RegBadge>
                <AmendmentBadge regs={['722.312.2.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Part 722 is the dedicated BS 7671 special-installation section for EV charging — covers Mode 2 (in-cable control box), Mode 3 (dedicated EVSE) and Mode 4 (DC off-board) equipment.',
              'New in A4:2026 — Reg 722.312.2.1 bans the PEN conductor from any EV charging circuit on a TN supply. The combined PEN must be split before the EV circuit, OR an open-PEN detection device used, OR a TT island installed.',
              'Reg 722.531.3.101 sets the RCD type: Type A is sufficient where the charger has integrated 6 mA DC fault detection (BS EN 61851-1); Type B (or Type A + RDC-DD) is required where it does not. 30 mA additional protection (Reg 411.3.3) always applies.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define the scope of Part 722 — what counts as EV charging equipment under BS 7671 and what does not (e.g. a Mode 1 cable into a general 13 A socket).',
              'Distinguish the four charging modes (Mode 1, Mode 2, Mode 3, Mode 4) and identify which BS EN 61851 publication applies to each.',
              'State Reg 722.312.2.1 verbatim and apply it to a TN-C-S domestic install — choosing between TN-S split, open-PEN detection device, or TT island.',
              'Apply Reg 722.531.3.101 — pick Type A or Type B RCD based on whether the charger has integrated 6 mA DC fault detection per BS EN 61851-1.',
              'Apply 30 mA additional protection (Reg 411.3.3) and the standard TN disconnection times (Reg 411.3.2 / Table 41.1) to an EV final circuit.',
              'Specify the practical install: cable size, IP rating (Reg 722.55), mounting height, mechanical impact protection, and load-management integration with smart-charging regulations.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Scope — what Part 722 covers</ContentEyebrow>

          <ConceptBlock
            title="What is and isn't an EV charging installation under BS 7671"
            plainEnglish="Part 722 covers dedicated EV charging equipment — fixed wall boxes, posts, and the supply circuits feeding them. A general 13 A socket that someone happens to plug a Mode 1 cable into is not an EV charging installation under Part 722."
            onSite="The trigger for Part 722 is dedication, not use. A 13 A general socket = general BS 7671. A 13 A socket labelled or installed specifically for EV charging = Part 722 (and most installers would not specify a 13 A socket for that role anyway). Mode 2, Mode 3 and Mode 4 dedicated equipment is always Part 722."
          >
            <p>
              Section 722 introduces specific requirements for circuits intended to supply charging
              equipment for electric vehicles. It sits alongside the general parts of BS 7671 — Reg
              411 (ADS), Reg 415 (additional protection), Reg 461 (PEN switching) — and TIGHTENS
              them in EV-specific ways. Part 722 does not override the general parts; it adds to
              them. So the EV circuit gets ALL the general protective measures PLUS the Section 722
              overlays.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The four charging modes</ContentEyebrow>

          <ConceptBlock
            title="Mode 1, Mode 2, Mode 3 and Mode 4 — picking the right one"
            plainEnglish="Modes describe the physical and control architecture of how the vehicle gets electricity. Mode 1 = direct from a standard socket, no control. Mode 2 = standard socket with an in-cable control box. Mode 3 = dedicated EVSE wall box / post with control pilot signalling. Mode 4 = DC off-board charger (the vehicle's onboard charger is bypassed entirely)."
            onSite="UK domestic = Mode 3 in nearly every case (a fixed Type 2 EVSE on the wall). UK public rapid charging = Mode 4 (50 kW upwards, CCS or CHAdeMO connector). Mode 2 = the granny cable supplied with the car for emergency use. Mode 1 = practically obsolete in the UK, because BS 7671 doesn't recognise it as a routine method."
          >
            <p>
              <strong>Mode 1:</strong> Direct connection to a standard socket-outlet. No
              communication with the vehicle. BS EN 61851-1 permits this only at low currents and
              with full circuit protection — most UK manufacturers do not recommend it.{' '}
              <strong>Mode 2:</strong> Standard socket with an in-cable control box (ICCB) that
              provides control pilot signalling and may include protective functions. The familiar
              "granny cable" supplied with a new EV. <strong>Mode 3:</strong> Dedicated EVSE
              (Electric Vehicle Supply Equipment) — a fixed wall box or post with a Type 2 socket or
              tethered cable, full control pilot signalling, and integrated protection. The UK
              domestic standard. <strong>Mode 4:</strong> DC off-board charger — the AC-to-DC
              conversion happens in the charger, not in the vehicle. CCS and CHAdeMO connectors. 50
              kW to 350 kW+. Public rapid-charging sites.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The headline A4 change — no PEN in the EV circuit</ContentEyebrow>

          <ConceptBlock
            title="Reg 722.312.2.1 — why the PEN is banned from the EV circuit on TN"
            plainEnglish="On a TN-C-S (PME) supply the protective conductor and neutral are combined as a PEN up to the cut-out. If that PEN goes open-circuit (a damaged underground joint, a broken service head, a corroded clamp), every CPC-connected exposed metal part inside the property rises towards line voltage. With an EV plugged in, the conductive vehicle body sits at that elevated potential — and the user routinely contacts large areas of the vehicle while standing on a driveway."
            onSite="A4:2026 is unambiguous: no PEN at all in the EV charging circuit on TN. You either split N and PE before the EV final circuit (TN-S configuration to the charger), or you fit an open-PEN detection device that disconnects all live conductors AND PE on a PEN fault, or you create a TT island with its own earth electrode. Bare TN-C-S into the charger is non-compliant from 15 April 2026."
          >
            <p>
              The reason this regulation is EV-specific (rather than a blanket extension of Reg
              461.2) is risk magnification. On a normal kettle, an open-PEN puts ~230 V on the
              kettle case but the user contacts a small handle area. On an EV, the conductive body
              of the vehicle is the touch surface — large area, frequent contact, often outdoors in
              wet conditions, often standing on a driveway in direct earth contact. The same fault
              that gives a survivable shock on a kettle gives a fatal shock on a car. A4 addresses
              this by removing the PEN from the EV circuit entirely.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.312.2.1 — Earthing in TN systems (NEW IN A4)"
            clause="A circuit supplying charging equipment for electric vehicles in a TN system shall not include a PEN conductor."
            meaning="Mandatory ('shall'). The combined PEN of TN-C-S must be split into separate N and PE before the EV final circuit. Acceptable compliance routes are: (a) TN-S configuration to the EV (split N and PE upstream of the EV circuit), (b) an open-PEN detection device that monitors L-N voltage and disconnects all live conductors plus PE on a PEN fault (most modern domestic chargers integrate this), or (c) a separate earth electrode forming a TT island for the EV. Bare TN-C-S routed through to the charger is non-compliant."
            cite="BS 7671:2018+A4:2026, Reg 722.312.2.1 (in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Compliance routes — how to actually satisfy 722.312.2.1</ContentEyebrow>

          <ConceptBlock
            title="Three recognised routes to compliance on TN-C-S"
            plainEnglish="Route 1: split N and PE inside the consumer unit and run dedicated N and PE conductors to the EV — the EV sees TN-S. Route 2: install (or use a charger with) an open-PEN detection device that disconnects all live conductors and PE on a PEN fault. Route 3: drive a separate earth electrode for the EV charger and isolate its CPC from the rest of the property — the EV sits on a TT island."
            onSite="Route 2 is by far the most common in modern UK domestic installs because nearly every approved Mode 3 wall box incorporates open-PEN detection by default — verify the manufacturer's declaration. Route 1 is straightforward in principle but in a TN-C-S consumer unit the N and PE are tied at the MET, so 'split before the EV' often means routing through a separate enclosure with its own neutral and earth bar. Route 3 is rare domestically because the EICR/maintenance overhead of a separate electrode is a long-term cost."
          >
            <p>
              The choice of route is a design decision documented on the EIC. For Route 2 (open-PEN
              detection device), the EIC schedule should record the device manufacturer, model and
              the BS EN reference (typically BS EN 61851-1 Annex covering open-PEN detection, plus
              the device's own product standard such as BS 7671 referenced or a UK manufacturer
              declaration). For Route 3 (TT island), record the earth-electrode resistance Ra and
              confirm Ra × IΔn ≤ 50 V (Reg 411.5.3). For Route 1 (TN-S configuration), confirm that
              N and PE are split upstream of the EV circuit and that no PEN exists anywhere in that
              final circuit.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RCD type — the Reg 722.531.3.101 rule</ContentEyebrow>

          <ConceptBlock
            title="Type A vs Type B — and the 6 mA DC detection question"
            plainEnglish="EV chargers can produce smooth DC residual fault currents because they contain switched-mode power electronics. A Type A RCD is blind to that smooth DC. The fix is either a Type B RCD upstream (sees smooth DC), or a Type A RCD with the charger handling the DC detection itself (a 6 mA DC fault detector built into the charger per BS EN 61851-1)."
            onSite="Read the manufacturer's installation manual every time. Modern UK domestic chargers (Ohme, Hypervolt, EO, Wallbox Pulsar, Andersen, Pod Point Solo 3 and similar) almost universally include 6 mA DC detection — Type A upstream is then sufficient. Older domestic chargers and many three-phase commercial units do not — Type B upstream is then mandatory. Type AC is never appropriate. Type F is not what 722.531.3.101 calls for."
          >
            <p>
              The cost difference matters: Type B RCDs are typically 4-5 times the price of Type A
              RCDs, so over-engineering with Type B unnecessarily is a real waste of project budget.
              The reverse mistake — fitting Type A where Type B is required — is a serious safety
              defect. The regulator's text is unambiguous: where the charger does not provide
              protection against DC fault current of 6 mA or greater, the upstream device must
              handle it. Manufacturer's spec is the binding evidence.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.531.3.101 — RCD type for EV charging"
            clause="Where the charging equipment does not provide protection against DC fault current of 6 mA or greater (in accordance with the relevant equipment standard, e.g. BS EN 61851-1), the protection against DC fault current shall be provided by either: (i) an RCD of Type B; or (ii) an RCD of Type A in conjunction with a residual direct-current detecting device (RDC-DD) of 6 mA."
            meaning="Two recognised routes when the charger doesn't handle DC residual itself: a Type B RCD upstream (sees smooth DC), or a Type A RCD plus a separate RDC-DD device. Type AC is not acceptable. Where the charger DOES include 6 mA DC detection (the manufacturer's declaration of BS EN 61851-1 compliance), Type A upstream is sufficient on its own. The 30 mA additional protection requirement (Reg 411.3.3) applies in either case."
            cite="BS 7671:2018+A4:2026, Reg 722.531.3.101"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Additional protection and disconnection times</ContentEyebrow>

          <ConceptBlock
            title="30 mA RCD additional protection — Reg 411.3.3 always applies"
            plainEnglish="Every EV charging final circuit needs 30 mA additional protection — that's not an EV-specific rule, it's the general Reg 411.3.3 rule for sockets and outdoor mobile equipment."
            onSite="Reg 411.3.3 covers (a) sockets ≤ 32 A used by ordinary persons or children, (b) sockets ≤ 32 A in other locations (the only category that can be excepted via a documented risk assessment), and (c) mobile equipment ≤ 32 A used outdoors. An EV charger is in scope: a Mode 3 EVSE socket is a socket-outlet used by ordinary persons (the homeowner). 30 mA is the maximum residual operating current — never higher."
          />

          <ConceptBlock
            title="Disconnection time and Zs target"
            plainEnglish="Standard final-circuit times under Reg 411.3.2 / Table 41.1: 0.4 s for circuits up to 63 A on TN. The 30 mA RCD demonstrates this comfortably (typical operating times are tens of milliseconds at IΔn). Zs verification still required."
            onSite="EIC schedule of test results: measure Ze at origin, calculate Zs = Ze + R1+R2 (or measure Zs directly at the charger position), confirm against the maximum value for the protective device (Type B 32 A on TN: Zs(max) ~1.37 Ω corrected). RCD operating time tested at IΔn (30 mA) and 5 IΔn (150 mA) — both must clear inside Table 41.1."
          />

          <SectionRule />

          <ContentEyebrow>Mounting, location, IP rating — Reg 722.55</ContentEyebrow>

          <ConceptBlock
            title="Outdoor IP rating, mechanical impact, vehicle collision risk"
            plainEnglish="An EV charger lives outdoors in UK weather, gets brushed past by people carrying things, and sits in the path of vehicles being parked. The install location and equipment specification must address all three."
            onSite="IP44 minimum for typical outdoor wall-mount under cover; IP54 or higher for fully exposed locations. Mechanical impact rating IK08 or higher is common. Mounting height per the manufacturer (usually 1.0-1.2 m to the bottom of the unit, accessible without bending). Where vehicle collision risk is significant — narrow drive, reversing onto the charger, post-mounted in a car park — fit bollards or use a kerb-set installation that protects the body of the unit."
          >
            <p>
              Reg 722.55 deals with the practical positioning. The general external influence codes
              from Section 522 (the AD water codes, AG mechanical impact codes, AE foreign body
              codes) drive the IP/IK rating numbers. Don't skip the cable too: the charging cable
              connector itself must meet IP44 minimum when engaged and IP24 when stowed (BS EN
              62196-2 for Type 2 connectors). For tethered chargers, the cable holster integrated
              into the unit usually handles this — but check it on commissioning.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Smart charging and load management</ContentEyebrow>

          <ConceptBlock
            title="OZEV / Smart Charge Point Regulations 2021 — adjacent to BS 7671"
            plainEnglish="UK-installed home and workplace EV chargers must comply with The Electric Vehicle (Smart Charge Points) Regulations 2021. That's a separate statute with its own requirements: off-peak default scheduling, randomised delay (to prevent grid surges when timers all start at midnight), demand-side response capability, and security."
            onSite="Smart charging is also how you stay within DNO supply capacity without paying for a service upgrade. A typical UK domestic 100 A supply can run an oven, a heat pump, an EV charger and a dishwasher comfortably IF the EV is on a load-management envelope that throttles back when other loads peak. That's a BS 7671 design decision — your design current Ib is the load-managed envelope, not the unconstrained 32 A."
          >
            <p>
              The two regimes don't conflict but they do overlap. BS 7671 Reg 311 / 433 sets the
              cable and protective device based on Ib — if load management caps Ib at 20 A peak,
              that's what you design to. The Smart Charge Point Regulations require the
              load-management capability be present and functional. Document the load-management
              envelope on the EIC so any future inspector can see why a 6 mm² cable was specified
              against a 32 A protective device.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Fitting an EV charger on bare TN-C-S without addressing 722.312.2.1"
            whatHappens="Installer wires a 7 kW Mode 3 charger from the consumer unit on a TN-C-S supply, runs L-N-CPC out to the unit with the CPC tied to the MET. No open-PEN detection device, no TT island, no TN-S split. From 15 April 2026 this is non-compliant — the EV circuit contains a PEN-routed protective conductor with the open-PEN failure mode unaddressed."
            doInstead="Pick one of the three recognised routes BEFORE the install: (1) TN-S configuration to the EV — split N and PE upstream so the EV final circuit has no shared PEN reference; (2) Use a charger with integrated open-PEN detection — verify on the manufacturer's datasheet that the device monitors L-N voltage and disconnects all live conductors plus PE on a PEN fault; (3) Drive a separate earth electrode and isolate the EV CPC from the rest of the property (TT island). Document the chosen route on the EIC."
          />

          <CommonMistake
            title="Defaulting to Type B without checking the charger spec"
            whatHappens="Installer assumes 'EV charger = Type B RCD always' and fits a Type B 30 mA RCBO upstream of every charger — sometimes 4-5x the cost of Type A. Equally wrong in the other direction: installer fits a Type A on a charger that does NOT have integrated 6 mA DC detection, blind to the smooth DC residual fault path."
            doInstead="Read the manufacturer's installation manual every time. Look for an explicit statement of compliance with BS EN 61851-1 including 6 mA DC fault detection — if present, Type A upstream is sufficient (Reg 722.531.3.101). If absent, Type B upstream is mandatory (or Type A + RDC-DD). Never assume; the manufacturer's declaration is the binding spec, and it's the document the inspector will ask for."
          />

          <CommonMistake
            title="Missing the 30 mA additional protection or using Type AC"
            whatHappens="On the rationale that 'the EV charger has its own RCD inside', the upstream device is omitted entirely or set at 100 mA. Or — even worse — a legacy Type AC RCD is reused. Reg 411.3.3 still applies regardless of internal protection: 30 mA additional protection on the final circuit feeding the charger is mandatory."
            doInstead="Treat the 30 mA additional protection (Reg 411.3.3) as a separate, always-on requirement. Whatever the charger does internally, the upstream RCD is 30 mA and is Type A or Type B per Reg 722.531.3.101 — never Type AC for an EV install. RCBO at the consumer unit is the cleanest way to deliver this."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Domestic 7 kW retrofit on TN-C-S"
            situation="Customer has a 4-year-old 100 A TN-C-S supply, a 17th edition split-load consumer unit (main switch + two 30 mA Type AC RCDs covering all final circuits). They have ordered a 7 kW Mode 3 wall box (Ohme ePod). The manufacturer's manual states 'BS EN 61851-1 compliant, integrated 6 mA DC fault detection, integrated open-PEN detection device per Section 722'."
            whatToDo="Don't add the EV way to either existing Type AC bus — Type AC is not acceptable for EV. Fit a dedicated way: a Type A 32 A RCBO directly upstream of the EV final circuit (the charger's 6 mA DC detection covers the smooth-DC route, satisfying Reg 722.531.3.101 with Type A; the 30 mA satisfies Reg 411.3.3). Cable run is 12 m clipped direct to the garage external wall — 6 mm² T&E. Because the charger has integrated open-PEN detection, the existing TN-C-S supply can be used as-is for routing through; verify and document the open-PEN device declaration on the EIC. Confirm IP rating (Ohme ePod is IP54, IK10 — adequate). Test: Zs at the charger position, RCBO operating time at IΔn and 5 IΔn, RCD trip time."
            whyItMatters="This is the most common A4-era domestic EV install: TN-C-S supply, modern compliant charger, single-phase 7 kW. Get the routing right (no extra electrode needed; charger handles the open-PEN), the RCD type right (Type A is correct given the charger's 6 mA DC detection — Type B would over-engineer at 4x the cost), and the 30 mA additional protection in place via the upstream RCBO. Document the manufacturer declaration and you have a clean, defensible cert."
          />

          <Scenario
            title="Commercial 22 kW three-phase install in a small business car park"
            situation="A small business has a TN-S three-phase supply (separate dedicated PE conductor from the substation, no PEN). They want two 22 kW Mode 3 chargers in their staff car park for employee use. The chosen unit is a commercial-grade Wallbox Commander 2T — manufacturer's manual states '22 kW Type 2 socket, three-phase, BS EN 61851-1 compliant, integrated 6 mA DC fault detection. Open-PEN detection NOT applicable (intended for TN-S or TT supplies)'."
            whatToDo="TN-S supply means Reg 722.312.2.1 is automatically satisfied — there's no PEN to remove. The compliance focus shifts to: cable size for 32 A three-phase (typically 10 mm² SWA buried direct, depending on run length and grouping), Type A 30 mA four-pole RCBO per charger or Type A 30 mA RCD plus three-pole MCB combo (the charger's 6 mA DC detection covers the smooth DC route — Type A is sufficient under 722.531.3.101). 30 mA additional protection per circuit (Reg 411.3.3). Mounting on a steel post with bollards (vehicle impact protection — Reg 722.55). External SWA cabling with appropriate IP rating at terminations. Test all three lines for Zs and operating times. Document the manufacturer's declaration of TN-S compatibility and 6 mA DC detection on the EIC."
            whyItMatters="Three-phase commercial installs are typically simpler from a PEN-prohibition point of view because TN-S supplies are common in commercial settings. The complexity moves to mechanical impact protection (car park = real collision risk), cable sizing (longer SWA runs need careful volt-drop work), and three-pole RCD selection. The same Section 722 rules apply — 30 mA additional protection, Type A or Type B per the manufacturer declaration, IP rating per Reg 722.55. Document everything because commercial premises get periodic insurance / DNO inspections that are stricter than domestic EICRs."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="A six-step checklist for any Part 722 install"
            plainEnglish="Walk this on every job. (1) What's the supply? (2) What's the charger spec say? (3) Which Reg 722.312.2.1 route? (4) Which RCD type? (5) Cable size, IP rating, mounting? (6) Cert entries?"
            onSite="(1) Supply: TN-C-S, TN-S, TT, IT — record from the cut-out. (2) Charger: read the manufacturer's manual — does it have integrated 6 mA DC fault detection? Does it have integrated open-PEN detection? Get the declaration in writing. (3) PEN prohibition route on TN: TN-S split, integrated open-PEN, or TT island — pick one and document. (4) RCD type per 722.531.3.101: Type A if charger has 6 mA DC; Type B (or Type A + RDC-DD) if not. Always 30 mA per Reg 411.3.3. (5) Design: cable for Ib (allow for load management), IP44 minimum (IP54+ exposed), IK08+, mounting per manufacturer, vehicle collision considered. (6) EIC: schedule of inspection ticks Section 722 items; schedule of test results records Zs, Ze, R1+R2, RCD operating times at IΔn and 5 IΔn, manufacturer declarations attached."
          >
            <p>
              The checklist makes a Part 722 install repeatable and inspector-defensible. The two
              specifications that drive most of the decisions are the supply earthing arrangement
              (everything from PEN routing to RCD type cascades from this) and the charger's own
              capability declaration (BS EN 61851-1, 6 mA DC, open-PEN). Get those two documented at
              the design stage and the rest of the install follows mechanically.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>EICR observations on existing EV installs</ContentEyebrow>

          <ConceptBlock
            title="What to look for, and how to code it"
            plainEnglish="A growing share of domestic EICRs now include an existing EV charger. The recurring observations: wrong RCD type (Type AC), missing open-PEN protection on TN-C-S, no 30 mA additional protection upstream, inadequate IP rating for the location, and load management that can exceed DNO supply capacity."
            onSite="C1 (danger present) — measured PE-N voltage already elevated on TN-C-S, or accessible live parts on damaged equipment. C2 (potentially dangerous) — typical for bare TN-C-S without open-PEN detection, missing 30 mA additional protection, Type AC RCD in service. C3 (improvement recommended) — historical Mode 1 cable in routine use without dedication, slightly under-rated cable that still passes current carrying capacity but has limited future-proofing. FI (further investigation) — manufacturer declaration unavailable, can't confirm the 6 mA DC detection claim."
          >
            <p>
              An EICR is assessed against current-edition risk per GN3 Section K, not just against
              the edition in force at install. An older EV install that predates A4 is not
              automatically C3 just because A4 is new — the C2 call hinges on the real-world
              shock-risk severity. Bare TN-C-S into an EV is a documented, well-understood severe
              hazard regardless of when it was installed; that warrants C2 in nearly every case with
              a clear remediation path (retrofit a charger with integrated open-PEN detection, or
              add an in-line open-PEN device, or split N/PE upstream).
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Mounting and positioning — Reg 722.55 in detail</ContentEyebrow>

          <ConceptBlock
            title="Heights, clearances, and the practical install"
            plainEnglish="Reg 722.55 doesn't prescribe a specific height — it requires the equipment be located so as to minimise risk of damage and to allow safe operation. In practice, manufacturer's instructions converge around 0.9-1.2 m to the bottom of the unit, with cable management fitted to keep the lead off the ground when stowed."
            onSite="Avoid: directly behind a parking bay where the bumper hits it, low-lying installs that get spray from vehicle wash-off, locations where children can reach the connector, anywhere the cable would have to cross a public footpath when in use. Prefer: above the bonnet line, near the driver's-side rear corner of the parking position, with bollards or kerbs if there's any vehicle-collision risk, and with a cable holster (built into most modern units) to keep the connector off wet ground."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Putting it together</ContentEyebrow>

          <ConceptBlock
            title="The minimum-compliance design for a UK domestic 7 kW retrofit on TN-C-S"
            plainEnglish="A defensible spec for the most common install: TN-C-S supply, modern Mode 3 charger with integrated 6 mA DC and open-PEN detection, 30 mA Type A RCBO upstream, 6 mm² cable, IP54 outdoor location."
            onSite="Spec sheet template: 32 A Type A 30 mA RCBO at the consumer unit; 6 mm² T&E (or 4 mm² SWA where buried) sized for actual run length and verified for volt-drop ≤ 5%; charger declared compliant with BS EN 61851-1 including 6 mA DC fault detection AND integrated open-PEN detection device per Section 722; mounting at manufacturer's specified height, IP54, IK08+, bollard-protected if collision risk; load-management envelope documented and design current Ib calculated against managed peak. EIC: tick Section 722 inspection items; record manufacturer declaration; full test results including RCBO operating times at IΔn and 5 IΔn."
          >
            <p>
              This template handles 80%+ of UK domestic EV retrofits in the A4 era. The two
              variations are: (a) a charger that does NOT have integrated 6 mA DC detection — fit
              Type B 30 mA RCBO instead (cost increase, otherwise identical); (b) a charger that
              does NOT have integrated open-PEN detection — install a separate in-line open-PEN
              device, or split N/PE upstream of the EV circuit, or drive a separate electrode for a
              TT island. Both variations are uncommon with current-generation domestic chargers but
              still appear on commercial three-phase units and older retrofit orders.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>BS EN 61851 — the product-standard backdrop</ContentEyebrow>

          <ConceptBlock
            title="Why Section 722 keeps pointing to BS EN 61851"
            plainEnglish="BS 7671 is an installation standard — it tells you how to wire the supply circuit. BS EN 61851 is the product standard for the charging equipment itself — it tells the manufacturer how to build the charger. The two interlock: many of Section 722's requirements (the 6 mA DC detection threshold, the control-pilot behaviour, the connector locking) come from values defined in BS EN 61851."
            onSite="If a charger's manual claims compliance with BS EN 61851-1, that's the document that backs the 6 mA DC detection claim Reg 722.531.3.101 relies on. If a charger's datasheet doesn't mention BS EN 61851 at all, treat that as a red flag — it's the binding product spec for the UK market and any reputable manufacturer cites it explicitly."
          >
            <p>
              The BS EN 61851 family breaks down as follows. <strong>BS EN 61851-1</strong> sets the
              general requirements — modes, control pilot, protective functions, the 6 mA DC fault
              detection threshold. <strong>BS EN 61851-21-1 / -21-2</strong> cover the vehicle-side
              (on-board) and EVSE-side EMC requirements. <strong>BS EN 61851-22</strong> covers AC
              EVSE specifically (Mode 3). <strong>BS EN 61851-23</strong> covers DC EVSE (Mode 4).
              <strong>BS EN 61851-24</strong> covers the digital communication between EVSE and
              vehicle for DC charging. The connector standard is BS EN 62196 (Type 1, Type 2 for AC;
              CCS Combo and CHAdeMO for DC). When you write the EIC, the BS EN reference is evidence
              that the manufacturer's declaration is anchored in a recognised standard rather than
              marketing language.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Part 722 is the dedicated BS 7671 special-installation section for EV charging — covers Mode 2/3/4 dedicated equipment. Mode 1 with a general 13 A socket is not in scope unless the socket is dedicated to EV charging.',
              'Reg 722.312.2.1 (NEW IN A4): no PEN conductor in any EV charging circuit on a TN supply. Compliance routes are TN-S configuration to the EV, integrated open-PEN detection device, or TT island with separate earth electrode.',
              'Reg 722.531.3.101: Type A RCD upstream is sufficient where the charger has integrated 6 mA DC fault detection per BS EN 61851-1. Otherwise Type B (or Type A + RDC-DD) is mandatory. Type AC is never acceptable.',
              'Reg 411.3.3 still applies — 30 mA additional protection on every EV charging final circuit, in addition to the type selection above. The two requirements are independent.',
              "Reg 722.55 sets the practical install — IP44 minimum (IP54+ for fully exposed locations), mechanical impact protection, vehicle-collision considerations, and adherence to the manufacturer's mounting instructions. Always document the manufacturer declarations on the EIC.",
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-7-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.3 Outdoor and agricultural
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module7Section2;
