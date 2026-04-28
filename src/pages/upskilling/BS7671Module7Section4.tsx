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
    id: 'm7s4-group-classification',
    question:
      'A consultant is refurbishing a private GP examination room. The room contains a treatment couch where the doctor takes blood, performs ECGs and applies dermatology probes. No life-supporting equipment, no intra-cardiac procedures. Under Section 710, which medical location group applies?',
    options: [
      'Group 0 — there are no patients in the room',
      'Group 1 — applied parts contact patients during routine medical procedures, but the procedure is NOT life-critical',
      'Group 2 — any room with a treatment couch is automatically Group 2',
      'Outside the scope of Section 710 — private clinics are domestic',
    ],
    correctIndex: 1,
    explanation:
      'Section 710 defines three groups based on PROCEDURE not room type. Group 0: no applied parts; ordinary BS 7671 applies (e.g. a waiting room, an admin office, a corridor). Group 1: applied parts come into contact with the patient during normal medical procedures — examination rooms, dental surgeries, dermatology, routine ECG, ultrasound. Group 2: applied parts are essential for life support OR the procedure is intra-cardiac (theatres, ICU, cath labs, recovery for life-supported patients). A GP examination room with applied parts is Group 1 by definition — escalating it to Group 2 imposes IT-system, IMD and supplementary-bonding costs that are not justified.',
  },
  {
    id: 'm7s4-afdd-prohibition',
    question:
      'You are designing a circuit feeding a Group 2 operating theatre. The contractor wants to fit AFDDs on every final circuit "for safety". Under Reg 710.421.1.7, what is the correct response?',
    options: [
      'Fit AFDDs — the new A4 default applies everywhere',
      'AFDDs are PROHIBITED in Group 0 and Group 2 medical locations — fitting one risks nuisance disconnection of life-critical loads',
      'AFDDs are mandatory in Group 2 — the theatre lighting circuit needs one',
      'AFDDs are optional but recommended in all Part 7 locations',
    ],
    correctIndex: 1,
    explanation:
      'Reg 710.421.1.7 (new in A4) explicitly PROHIBITS the use of AFDDs in Group 0 and Group 2 medical locations. The rationale is exactly the opposite of the AFDD safety case in dwellings: in a theatre, an AFDD nuisance trip during a heart-lung-bypass procedure would put a patient at greater risk than the arc-fault the AFDD might detect. The IT system + IMD + supplementary bonding architecture in Group 2 is designed to TOLERATE a first earth fault without disconnection — adding an AFDD that would disconnect on any anomaly defeats that architecture. Group 1 is permitted (not prohibited), but Group 0 and Group 2 are barred outright.',
  },
  {
    id: 'm7s4-it-system',
    question:
      'A Group 2 operating theatre has 12 socket-outlets used for life-supporting medical equipment. Section 710 requires those sockets to be supplied by an IT system. What is the headline characteristic of an IT system that makes it the right choice in Group 2?',
    options: [
      'Lower voltage at the patient — typically 50 V SELV',
      'Higher fault current to ensure rapid OPD operation',
      'No intentional connection of any live conductor to earth — a first earth fault does not interrupt supply, allowing life-critical equipment to keep running while the IMD signals the fault',
      'PEN conductor brought into the theatre to reduce CPC count',
    ],
    correctIndex: 2,
    explanation:
      'IT (Isolated Terra) systems isolate the supply from earth — typically through a medical IT isolating transformer per BS EN 61558-2-15. Because no live conductor is referenced to earth, a SINGLE earth fault does not produce a fault loop and does not cause disconnection: the patient remains supported. An Insulation Monitoring Device (IMD) per BS EN 61557-8 watches the insulation resistance live and alarms the moment a first fault appears, so engineering staff can isolate and rectify before a SECOND fault makes the system dangerous. This is exactly the opposite of TN ADS, where the design philosophy is rapid disconnection on a first fault — fine for offices, fatal for a patient on bypass.',
  },
  {
    id: 'm7s4-supplementary-bonding',
    question:
      'In a Group 2 medical location, supplementary equipotential bonding (Reg 710.415.2) is required between specific items. Which combination correctly describes the resistance limit and what must be bonded?',
    options: [
      'Resistance ≤ 0.5 Ω — only between the medical luminaire and MET',
      'Resistance ≤ 0.2 Ω between the bonding bus (LPS) and any exposed-conductive-part / extraneous-conductive-part / metallic shield / metallic floor in the patient environment',
      'Resistance ≤ 1.0 Ω — only between socket-outlets and the consumer unit',
      'No specific limit — same as a domestic bathroom',
    ],
    correctIndex: 1,
    explanation:
      'Reg 710.415.2 requires a low-impedance supplementary equipotential bonding bus (often labelled LPS — local potential equalisation system) within each Group 2 location. EVERY exposed-conductive-part, every extraneous-conductive-part, every metallic shield of medical equipment, any conductive floor and the IT-system reference points are bonded to this bus. The resistance from any bonded item back to the LPS bus must not exceed 0.2 Ω — significantly tighter than a domestic bathroom — because the patient body, cannulated, may be a direct conductive path. Test this with a calibrated micro-ohmmeter; a standard continuity test at 200 mA may not have the resolution.',
  },
  {
    id: 'm7s4-selv-group2',
    question:
      'Reg 710.413.1.5 requires SELV in Group 2 to limit voltage at applied parts to 25 V AC / 60 V DC ripple-free. How does this differ from the general SELV upper limit in Section 414?',
    options: [
      'It does not differ — Section 414 already limits SELV to 25 V AC',
      'Section 414 allows SELV up to 50 V AC / 120 V DC ripple-free; Reg 710.413.1.5 tightens this to 25 V AC / 60 V DC ripple-free in Group 2 because the patient may be cannulated and skin-resistance bypassed',
      'Reg 710.413.1.5 raises the SELV limit to 120 V AC',
      'There is no SELV requirement in Group 2',
    ],
    correctIndex: 1,
    explanation:
      'Section 414 (general) sets SELV at the upper limit of voltage band I — 50 V AC RMS / 120 V DC ripple-free. Reg 710.413.1.5 tightens this to 25 V AC / 60 V DC ripple-free for Group 2 medical locations because the assumption that human skin provides a meaningful series resistance fails when the patient is cannulated, has a probe in a body cavity, or has electrodes placed for ECG / EEG / pacing. With skin resistance bypassed, the touch-current limit is set by body internal resistance alone — and 50 V can drive a fibrillation-threshold current straight to the heart through a saline-filled catheter. The 25 V / 60 V limit is the medical-electrical safety floor under IEC 60601 and Section 710 imports it.',
  },
  {
    id: 'm7s4-section-729',
    question:
      'Section 729 covers operating gangways and workspaces around switchgear. What is the minimum clear gangway width Section 729 requires for a service / restricted gangway?',
    options: [
      '0.4 m',
      '0.7 m for a restricted gangway, 1.0 m for a normal operating gangway',
      '2.0 m unconditionally',
      'No specific dimension — the IET wiring regs do not cover gangways',
    ],
    correctIndex: 1,
    explanation:
      'Section 729 (Operating or maintenance gangways) sets specific clear-width and headroom requirements: 0.7 m minimum for a restricted gangway (used only by skilled persons under controlled access), 1.0 m minimum for a general operating gangway, with 2.0 m headroom. The standard also requires that doors open OUTWARDS from the room and that emergency egress is maintained — a switchroom designer who packs a row of MCCBs against an existing wall and leaves only 0.6 m clearance has produced a non-compliant install. The dimensions matter for arc-flash retreat distances, manual handling of breakers, and inspector access.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Section 710 medical locations are classified into three groups. What is the DEFINING distinction between Group 1 and Group 2?',
    options: [
      'Group 1 is for adults, Group 2 is for children',
      'Group 1 has applied parts that contact the patient during normal medical procedures; Group 2 either supports life with applied parts OR involves intra-cardiac procedures — the failure of supply may put the patient at risk',
      'Group 1 is single-phase, Group 2 is three-phase',
      'Group 1 is private, Group 2 is NHS',
    ],
    correctAnswer: 1,
    explanation:
      'Section 710 classifies by procedure risk, not by occupancy type. Group 0: no applied parts in use (waiting rooms, offices). Group 1: applied parts contact the patient (examination rooms, dental, dermatology, routine ECG / ultrasound). Group 2: applied parts essential for life support OR intra-cardiac procedures (theatres, ICU, cath labs, anaesthesia recovery). The Group 2 distinction triggers the IT-system, IMD, supplementary-bonding (LPS) and SELV-25 V requirements — costly architecture that is appropriate where life depends on the supply, and inappropriate (over-engineered) where it does not.',
  },
  {
    id: 2,
    question: 'Reg 710.421.1.7 (new in A4) addresses AFDDs in medical locations. What does it say?',
    options: [
      'AFDDs are mandatory throughout Section 710',
      'AFDDs are PROHIBITED in Group 0 and Group 2 medical locations; permitted but not required in Group 1',
      'AFDDs are mandatory in Group 1 only',
      'AFDDs are not mentioned in Section 710',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 710.421.1.7 prohibits AFDDs in Group 0 and Group 2. The reasoning differs by group. Group 0: there are no applied parts, no patient at fault-current risk, and the AFDD nuisance-trip risk on shared corridor / admin circuits would interrupt life-safety lighting or fire-alarm spurs without commensurate benefit. Group 2: the IT-system architecture is specifically designed to TOLERATE a first earth fault without disconnection — fitting an AFDD that interrupts on any waveform anomaly fights that design philosophy and risks disconnecting life-supporting equipment. Group 1 sits between: not prohibited, but not specifically required either; install only where the manufacturer of the medical equipment confirms compatibility.',
  },
  {
    id: 3,
    question:
      'A medical IT system in a Group 2 theatre uses an isolating transformer per BS EN 61558-2-15. What is the maximum permitted output rating of a single-phase medical IT transformer?',
    options: [
      '3 kVA',
      '8 kVA',
      '10 kVA — the standard limits a single-phase medical IT transformer to 10 kVA so that fault energy and capacitive earth-leakage stay within IMD detection range',
      '50 kVA',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 61558-2-15 limits a single-phase medical IT isolating transformer to 10 kVA output. The reason is that earth-leakage capacitance scales with cable length and equipment connected — and at higher kVA the natural capacitance of the IT bus pushes the IMD into a chronic alarm state where genuine first-fault detection becomes impossible. Larger theatres with higher loads use multiple 10 kVA transformers serving zones, or add a separately-monitored larger three-phase IT system for non-life-safety loads (e.g. theatre HVAC, scrub-room water heaters). The IMD must alarm before insulation falls below 50 kΩ.',
  },
  {
    id: 4,
    question:
      'In a Group 2 medical location the resistance from any bonded item to the LPS (local potential equalisation system) bus must not exceed which value?',
    options: ['0.05 Ω', '0.2 Ω', '0.5 Ω', '1.0 Ω'],
    correctAnswer: 1,
    explanation:
      'Reg 710.415.2 sets the limit at 0.2 Ω from any exposed-conductive-part, extraneous-conductive-part, metallic shield, metallic floor or IT-reference point back to the LPS bus. This is significantly tighter than the implicit limit in a domestic bathroom (where Reg 415.2.2 simply requires "low impedance"). The reason: a cannulated patient may form a direct conductive path through a saline catheter to the heart, bypassing skin resistance entirely. A bonding-conductor resistance of even 0.5 Ω allows a touch voltage that, applied directly to cardiac muscle, can fibrillate. Verify with a calibrated micro-ohmmeter — a standard continuity test at 200 mA may not have the resolution.',
  },
  {
    id: 5,
    question: 'Reg 710.413.1.5 sets the SELV upper limit in Group 2 at:',
    options: [
      '12 V AC / 30 V DC',
      '25 V AC / 60 V DC ripple-free — half of the general Section 414 limit, because skin resistance cannot be relied on with cannulated patients',
      '50 V AC / 120 V DC ripple-free — same as Section 414',
      '110 V AC',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 710.413.1.5 tightens the general SELV upper limit (50 V AC / 120 V DC ripple-free in Section 414) to 25 V AC / 60 V DC ripple-free in Group 2 medical locations. The clinical rationale: when a patient is cannulated, intubated, or carrying ECG / EEG electrodes, skin resistance is bypassed. A 50 V touch potential applied directly through a saline-filled catheter can drive cardiac fibrillation. The 25 V / 60 V floor mirrors the IEC 60601 medical electrical safety standard for type CF (cardiac floating) applied parts and aligns BS 7671 fixed-installation design with the medical-equipment standard.',
  },
  {
    id: 6,
    question:
      'A Group 2 theatre has its IT system fed from a medical IT isolating transformer. The Insulation Monitoring Device (IMD) alarms during a procedure. What is the correct clinical / engineering response?',
    options: [
      'Disconnect the IT system immediately and switch to TN — patient safety is paramount',
      'The IT system is designed to TOLERATE a first earth fault without disconnection; allow the procedure to complete safely while the engineering team locate and rectify the fault before a SECOND fault occurs',
      'Reset the IMD and ignore the alarm',
      'Increase the IMD threshold to silence the alarm',
    ],
    correctAnswer: 1,
    explanation:
      'The IT-system design philosophy is exactly the opposite of TN ADS. In TN, a first earth fault produces a fault loop and rapid OPD/RCD disconnection — appropriate for offices, fatal for a patient on bypass. In a medical IT system, no live conductor is intentionally earthed, so a first earth fault produces no significant fault current and supply continues. The IMD (BS EN 61557-8) alarms when insulation falls below 50 kΩ, signalling staff to isolate and rectify the affected circuit before a SECOND earth fault, which would create a phase-to-phase fault and cause real disconnection. The clinical workflow is: complete the procedure, isolate the IT bus (or the affected outlet) only after the patient is stable, fault-find with the system de-energised. Disconnecting on the first IMD alarm defeats the entire architecture.',
  },
  {
    id: 7,
    question:
      'Section 729 (Operating and maintenance gangways) requires what minimum headroom in a switchroom?',
    options: ['1.5 m', '1.8 m', '2.0 m', '2.5 m'],
    correctAnswer: 2,
    explanation:
      'Section 729 sets a minimum headroom of 2.0 m in operating / maintenance gangways. Combined with the gangway width requirements (0.7 m restricted, 1.0 m general operating), this defines the minimum operator envelope around switchgear. The dimensions exist for arc-flash retreat distance, manual handling of MCCBs and ACBs, ladder access for cable terminations and emergency egress. Doors must open OUTWARDS so that an injured operator falling against a door does not block their own escape. A switchroom retrofit that places a row of MCCBs 0.6 m from a wall and 1.7 m below a soffit fails Section 729 — and the inspector should refuse to energise until corrected.',
  },
  {
    id: 8,
    question:
      'Section 740 covers temporary installations — fairgrounds, amusement parks, circuses. Which of the following is a defining requirement for socket-outlets in a Section 740 environment?',
    options: [
      'No RCD required because the installation is temporary',
      '30 mA RCD additional protection on every socket-outlet, IP rating appropriate to the outdoor environment (typically IP44 minimum) and TT system with separate earth electrode where DNO earth is not provided',
      '300 mA RCD only — 30 mA causes nuisance trips on stage equipment',
      'Type B RCD required on every circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Section 740 (temporary installations — fairgrounds, amusement parks, booths, stalls, circuses) requires 30 mA RCD additional protection on socket-outlets, IP44 minimum (often IP55 or IP65 in practice), and where the supply is TT — which is common because portable generators or temporary feeds rarely include a DNO earth — a separate earth electrode with verified Ra such that Ra × IΔn ≤ 50 V (Reg 411.5.3). Wandering leads, public access by ordinary persons including children (BA1/BA2), and outdoor weather exposure all combine to make Section 740 one of the highest-risk environments in BS 7671 — the temporary nature of the install is not a justification for relaxed protection, it is the reason the protection is mandatory.',
  },
];

const faqItems = [
  {
    question:
      'Where do I find the actual Group 0 / 1 / 2 classification in BS 7671 for a specific room type?',
    answer:
      'Section 710 itself defines the three groups but does NOT publish a room-by-room lookup table. The Health Technical Memorandum HTM 06-01 (NHS Estates) and the IET Guidance Note 7 (Special Locations) provide worked examples — typical Group 1: examination rooms, dental surgeries, ECG, ultrasound, X-ray rooms, dermatology, physiotherapy with applied parts. Typical Group 2: operating theatres, ICU, recovery for life-supported patients, cath labs, intensive treatment rooms, premature baby units, anaesthesia rooms. The classification is the responsibility of the medical / engineering team jointly — and is documented per location on the medical-electrical risk register before the design starts.',
  },
  {
    question:
      'Does Reg 710.421.1.7 (AFDD prohibition) apply retrospectively to existing medical installations?',
    answer:
      'No. Reg 710.421.1.7 is new in A4 (in force 15 April 2026) and applies to NEW design. For existing installations: (a) if AFDDs were never fitted, no action is required; (b) if AFDDs were fitted before A4 to a Group 0 or Group 2 location and the medical-equipment manufacturer expresses no compatibility concern, the installation can continue but should be flagged as a deviation from the current edition on the next EICR (typically C3); (c) if there have been actual nuisance trips affecting clinical care, the AFDDs should be removed and the deviation closed out as a C2 because patient safety is materially affected.',
  },
  {
    question:
      'Why is the SELV limit in Group 2 (25 V AC) lower than the general Section 414 limit (50 V AC)?',
    answer:
      'Skin resistance is the primary defence against shock at low voltages — typical dry intact skin presents 1-100 kΩ in series with the body. A cannulated patient, an intubated patient, a patient with ECG electrodes or a probe in a body cavity has bypassed skin resistance. The current path is through saline (effectively 0 Ω) directly to internal organs including the heart. Cardiac fibrillation threshold for direct cardiac current is around 50 µA — orders of magnitude below the macro-shock threshold. The 25 V AC / 60 V DC ripple-free limit in Reg 710.413.1.5 is the engineering floor below which a body-resistance-only path cannot drive a fibrillation current. It mirrors the IEC 60601 type CF (cardiac floating) applied-part limit.',
  },
  {
    question: 'What is the difference between an IMD and an RCD?',
    answer:
      'An RCD measures imbalance between line and neutral (or summation across a multi-phase system) and DISCONNECTS when residual current exceeds its threshold (e.g. 30 mA in 40 ms). An IMD (Insulation Monitoring Device per BS EN 61557-8) measures insulation resistance from the IT bus to earth continuously and ALARMS when insulation falls below threshold (typically 50 kΩ). The IMD does NOT disconnect — it signals. The architecture is appropriate to medical IT specifically because supply continuity is critical and a first earth fault, by itself, is not dangerous in an IT system. The IMD lets engineering staff fault-find before the second fault makes the system genuinely hazardous.',
  },
  {
    question:
      'Can a hospital corridor use the same protective measures as the rest of the building?',
    answer:
      'Yes. A corridor with no applied parts is Group 0 — ordinary BS 7671 applies (ADS via OPD or RCD, 30 mA RCD additional protection on socket circuits per Reg 411.3.3, A4 luminaire RCD per Reg 411.3.4). The Section 710 architecture (IT system, IMD, LPS) only applies to Group 2 locations, and supplementary bonding to a tighter LPS only applies inside the patient environment. The expensive medical-grade fit-out is scoped tightly — a typical hospital may have hundreds of Group 0 rooms, dozens of Group 1 rooms and only a handful of Group 2 rooms.',
  },
  {
    question:
      'How does Section 729 interact with the Construction (Design and Management) Regulations 2015?',
    answer:
      'Section 729 sets the BS 7671 dimensional and access requirements for operating gangways. CDM 2015 sits above as the statutory health-and-safety duty on designers, principal designers, contractors and clients to ensure the building can be constructed, operated and maintained safely. A switchroom design that meets Section 729 demonstrates the BS 7671 evidence point under CDM. A switchroom that fails Section 729 is, by extension, a CDM design risk — the principal designer cannot sign off the F10 / pre-construction information without resolving the gangway non-compliance.',
  },
  {
    question: 'Is a private dental surgery covered by Section 710?',
    answer:
      'Yes, almost always Group 1. A dental surgery has applied parts (handpieces, suction, X-ray sensors, intraoral cameras, ultrasonic scalers) that contact the patient during normal dental procedures. The defining test is the procedure, not the building: a dental practice in a converted Victorian terrace is Group 1; an NHS dental ward is Group 1. The implication for design: the cost of compliance is moderate (no IT system, no IMD required for Group 1), but the supplementary bonding requirement applies, and the AFDD considerations of Reg 710.421.1.7 (prohibition in Group 0 and 2) do NOT prohibit AFDDs in Group 1 — though manufacturer compatibility with dental equipment must be confirmed.',
  },
  {
    question:
      'What IP rating is required for socket-outlets in a Section 740 fairground installation?',
    answer:
      'Section 740 imports the general external-influence requirements from Chapter 51 / Section 522 and the BA / AD / AE / AG codes apply: AD3 (water — splashes), AE3 (foreign bodies — small objects), AG2/AG3 (mechanical impact). The minimum practical rating is IP44; for an outdoor stall exposed to driving rain or wash-down, IP55 is more appropriate; for a wet-effects ride, IP65 or IP66. The socket-outlet itself must be a BS EN 60309-2 industrial type with the appropriate colour-coded voltage band — the standard 13 A BS 1363 socket is not appropriate for Section 740 outdoor use except in protected enclosures.',
  },
  {
    question:
      'How is the LPS (local potential equalisation system) bonding bus physically constructed?',
    answer:
      'A typical LPS in a Group 2 theatre is an insulated copper bus-bar (often 25 × 4 mm or larger) mounted at low level around the perimeter of the patient environment, with screwed terminations for each bonded item. Cable cross-section to the bus is typically 4 mm² minimum (Reg 544.2 floor) for single-item bonds, 16 mm² for the main bond from the bus back to the MET. The bus is INSULATED from the chassis it is mounted on so it remains at a single defined potential; the LPS bus is then connected once to the MET via the main supplementary bonding conductor. Test points are provided at each end so the inspector can verify ≤ 0.2 Ω from any item to the bus during periodic verification.',
  },
];

const BS7671Module7Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Medical, commercial and industrial locations | BS 7671:2018+A4:2026 | Module 7.4',
    description:
      'Section 710 medical locations (Groups 0, 1, 2 — IT system, IMD, supplementary bonding, AFDD prohibition), Section 729 operating gangways and Section 740 temporary installations under BS 7671:2018+A4:2026.',
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
            eyebrow="Module 7 · Section 4"
            title="Medical, commercial and industrial locations"
            description="Section 710 medical locations (Group 0, 1, 2 classifications, IT systems, IMDs, supplementary bonding, AFDD prohibition), Section 729 operating gangways, and Section 740 temporary installations — the parts of BS 7671 where ordinary ADS architecture is replaced or supplemented to match the clinical, mechanical and access risks."
            actions={
              <>
                <RegBadge>710.413.1.5</RegBadge>
                <RegBadge>710.421.1.7</RegBadge>
                <RegBadge>710.415</RegBadge>
                <AmendmentBadge regs={['710.421.1.7']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Section 710 classifies medical locations into Group 0 (no applied parts — ordinary BS 7671), Group 1 (applied parts in normal procedures — supplementary bonding, SELV preferred for applied parts), and Group 2 (life-supporting / intra-cardiac — IT system mandatory, IMD continuous monitoring, LPS supplementary bonding ≤ 0.2 Ω, SELV 25 V).',
              'Reg 710.421.1.7 (new in A4) PROHIBITS AFDDs in Group 0 and Group 2 medical locations — preserving supply continuity for life-supporting equipment is more important than arc-fault detection.',
              'Section 729 sets minimum operating-gangway widths (0.7 m restricted, 1.0 m general) and headroom (2.0 m). Section 740 applies to temporary fairground / show installations: 30 mA RCD on sockets, IP44+ enclosures, TT with verified Ra × IΔn ≤ 50 V where DNO earth is not provided.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Classify a medical location as Group 0, 1 or 2 using the procedure-based test in Section 710 and explain the design implication of each.',
              'Apply Reg 710.421.1.7 (AFDD prohibition in Group 0 and Group 2) and explain why AFDDs are inappropriate in life-supporting medical environments.',
              'Specify a Group 2 medical IT system: medical isolating transformer to BS EN 61558-2-15 (max 10 kVA single-phase), Insulation Monitoring Device to BS EN 61557-8, and the design philosophy of tolerating a first earth fault without disconnection.',
              'Apply Reg 710.415.2 supplementary equipotential bonding to construct an LPS (local potential equalisation system) with ≤ 0.2 Ω resistance from any bonded item to the bus.',
              'Apply Reg 710.413.1.5 — SELV upper limit of 25 V AC / 60 V DC ripple-free in Group 2, and explain the clinical rationale (cannulated patient, bypassed skin resistance).',
              'Apply Section 729 dimensional rules (0.7 m / 1.0 m gangway widths, 2.0 m headroom, outward-opening doors) to a switchroom design.',
              'Apply Section 740 temporary-installation rules (30 mA RCD, IP44+, TT verification) to a fairground or show installation.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Section 710 — the three groups</ContentEyebrow>

          <ConceptBlock
            title="Group 0, Group 1, Group 2 — what actually changes"
            plainEnglish="Section 710 classifies medical locations by what HAPPENS in the room, not by what the room is called. Group 0: no applied parts contact the patient (waiting rooms, corridors, admin offices). Group 1: applied parts contact the patient during normal procedures (examination rooms, dental, ECG, ultrasound). Group 2: applied parts are essential for life support OR the procedure is intra-cardiac (theatres, ICU, cath labs)."
            onSite="The design implication scales steeply with group. Group 0 is ordinary BS 7671 — same regs as a domestic property or office. Group 1 adds supplementary equipotential bonding inside the patient environment and SELV preference for applied-part circuits. Group 2 adds an IT system, an IMD, the LPS bonding bus at ≤ 0.2 Ω, and the SELV-25 V limit. Cost per square metre rises 5-10× from Group 0 to Group 2 — getting the classification right at design stage is a major commercial decision, not a technicality."
          >
            <p>
              Section 710 imports the classification framework from IEC 60364-7-710 and the Health
              Technical Memorandum HTM 06-01. The defining test is the PROCEDURE the room hosts, not
              the building or the occupancy: a private GP examination room in a converted Victorian
              terrace is Group 1; an NHS theatre in a teaching hospital is Group 2; a hospital
              corridor with no applied parts is Group 0. The Group 1 / Group 2 boundary is the most
              consequential — it is where the IT system, the IMD and the LPS bus become mandatory
              rather than optional. The classification is a joint engineering / clinical decision
              and must be documented per location on the medical-electrical risk register BEFORE the
              design proceeds.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Group 2 — the medical IT system</ContentEyebrow>

          <ConceptBlock
            title="Why Group 2 uses IT, not TN"
            plainEnglish="A TN system disconnects on a first earth fault — exactly what you want in an office, exactly what you do NOT want in a theatre with a patient on heart-lung bypass. An IT system has no intentional earth reference; a first earth fault produces no fault loop, no disconnection, and supply continues. The IMD alarms; staff fault-find before a second fault."
            onSite="A Group 2 medical IT system is built around a medical IT isolating transformer (BS EN 61558-2-15, single-phase max 10 kVA), feeding an IT bus that supplies the life-critical sockets in the patient environment. The IMD (BS EN 61557-8) sits across the bus and monitors insulation resistance to earth continuously — alarming below 50 kΩ. Larger theatres use multiple zone-isolated 10 kVA transformers; HVAC, scrub-room water heating and other non-life-critical loads stay on conventional TN."
          >
            <p>
              The IT-system architecture is a design philosophy, not a single component. Reg 411.6.1
              (general) and Reg 710.413.1.5 (medical specific) require: (a) no live conductor of the
              IT system intentionally connected to earth; (b) exposed-conductive-parts connected to
              the LPS bonding bus — not to the source earth — so that a first earth fault produces a
              touch voltage limited by the bonding architecture, not by the source impedance; (c)
              continuous insulation monitoring by an IMD, with audible AND visible alarm signals at
              the medical staff position; (d) clear fault-management procedures so that a
              first-fault alarm triggers planned isolation, not panic disconnection. Disconnect on
              the first IMD alarm and you have defeated the entire architecture — it is the SECOND
              fault, simultaneous with the first, that drives a phase-to-phase fault and a real
              disconnection.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 710.413.1.5 — SELV in Group 2 medical locations"
            clause="Where SELV or PELV is used in Group 2 medical locations, the nominal voltage applied to applied parts of medical electrical equipment shall not exceed 25 V AC RMS or 60 V ripple-free DC. Basic protection shall be provided by basic insulation in accordance with Section 416 or by barriers or enclosures in accordance with Regulation 416.2 in all cases, regardless of nominal voltage."
            meaning="The Section 414 general SELV limit (50 V AC / 120 V DC ripple-free) is HALVED for Group 2 because skin resistance — the dominant series resistance at low voltages — cannot be relied on with cannulated patients. Basic protection (insulation, barriers, enclosures) is required at ALL voltages, not just above 25 V — a tightening of the general Reg 414.4.4 rule which only requires basic protection above 25 V AC."
            cite="BS 7671:2018+A4:2026, Reg 710.413.1.5"
          />

          <ConceptBlock
            title="The Insulation Monitoring Device (IMD)"
            plainEnglish="Sits across the IT bus, measures insulation resistance to earth continuously, and alarms when it drops below 50 kΩ. Does NOT disconnect — it signals. The signalling is audible AND visible at the medical staff position so the clinical team know an engineering response is needed."
            onSite="The IMD must comply with BS EN 61557-8. Modern devices include a remote indicator panel showing current insulation resistance, alarm threshold, transformer load (a separate alarm if transformer is approaching its 10 kVA limit) and a test button. The IMD self-tests its own circuitry continuously — if the IMD fails, it must alarm. Verification at periodic inspection: trigger the test button to confirm alarm activation; inject a calibrated test fault to confirm threshold; confirm log of historic alarms."
          >
            <p>
              Reg 710.413.1.5 and Section 710 by reference to BS EN 61557-8 require the IMD to: (a)
              alarm before insulation drops below 50 kΩ; (b) provide a visible AND audible signal at
              the staff position; (c) be itself supplied so that loss of supply to the IMD also
              alarms (a failed IMD on a healthy IT bus is functionally identical to a healthy IMD on
              a failing IT bus — both must alarm); (d) include a test function for routine
              verification. The IMD is not an RCD — it does not disconnect, it does not measure
              residual current, and it does not provide fault protection by itself. Fault protection
              in the IT system comes from the combination of IMD (signalling first fault),
              supplementary equipotential bonding (limiting touch voltage), SELV at applied parts
              (limiting voltage at the patient interface) and OPD or RCD operation on the second
              fault.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Supplementary equipotential bonding — the LPS bus</ContentEyebrow>

          <ConceptBlock
            title="Reg 710.415.2 — the local potential equalisation system"
            plainEnglish="Inside every Group 2 location, an insulated copper bonding bus runs around the perimeter of the patient environment. Every exposed-conductive-part, extraneous-conductive-part, metallic shield, conductive floor and IT-reference point bonds back to that bus. Resistance from any bonded item to the bus must not exceed 0.2 Ω."
            onSite="Plan the LPS bus at design stage — retrofitting one into an existing theatre is a major capital project. Typical construction: 25 × 4 mm (or larger) insulated copper bus mounted on insulating standoffs around the perimeter at low level, with screwed terminations for each bonded item. Single-bond cables 4 mm² minimum (Reg 544.2 floor); main bond from LPS to MET 16 mm² minimum. Test the resistance with a calibrated micro-ohmmeter — a 200 mA continuity tester does not have the resolution at 0.2 Ω. Document each bond on the patient-environment layout drawing."
          >
            <p>
              Reg 710.415.2 sets a tighter limit than the general Reg 415.2.2 (which requires only
              "low impedance"). The 0.2 Ω limit reflects the clinical reality of a cannulated
              patient: skin resistance is bypassed, and the body forms a direct conductive path from
              the saline catheter through internal organs including the heart. Cardiac fibrillation
              threshold for direct cardiac current is around 50 µA — orders of magnitude below the
              macro-shock threshold for skin-contact pathways. Limiting touch voltage between any
              two simultaneously-touchable items to a few millivolts requires the bonding-conductor
              resistance to be tens of milliohms — and 0.2 Ω is the engineering ceiling.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 710.415.2 — Supplementary equipotential bonding in Group 2"
            clause="In each Group 2 medical location, supplementary equipotential bonding conductors shall be installed and connected to the equipotential bonding bus for the purpose of equalising potential differences between the following parts which are located in the patient environment: (a) exposed-conductive-parts; (b) extraneous-conductive-parts; (c) screening against electrical interfering fields, if installed; (d) connection to the conductive floor grids, if installed; (e) metal screen of the medical IT isolating transformer, if any. The resistance of the conductors, including their connections, between terminals for protective conductors of socket-outlets and for fixed equipment or any extraneous-conductive-parts, and the equipotential bonding bus, shall not exceed 0.2 Ω."
            meaning="Five categories of part must connect to the LPS bus. The 0.2 Ω limit applies between EVERY bonded item and the bus. Verify with a calibrated micro-ohmmeter, document each test point on the patient-environment layout drawing, and re-verify at every periodic inspection — corrosion, vibration and accidental disconnection are common failure modes."
            cite="BS 7671:2018+A4:2026, Reg 710.415.2"
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The A4 AFDD prohibition — Reg 710.421.1.7</ContentEyebrow>

          <ConceptBlock
            title="Why AFDDs are PROHIBITED in Group 0 and Group 2"
            plainEnglish="The AFDD safety case in dwellings is that an arc-fault is more dangerous than a nuisance trip. In Group 0 medical (corridors, fire-alarm spurs, life-safety lighting), a nuisance trip can disconnect critical safety circuits with no commensurate benefit. In Group 2 (theatres, ICU), the IT-system architecture is designed to TOLERATE a first earth fault without disconnection — fitting an AFDD that interrupts on any waveform anomaly fights the entire design philosophy."
            onSite="Reg 710.421.1.7 (new in A4) is unambiguous: AFDDs SHALL NOT be installed in Group 0 or Group 2 medical locations. Group 1 is permitted but not required — confirm compatibility with the medical-equipment manufacturer before installing. The prohibition applies to NEW design under A4; existing AFDDs in Group 0 / Group 2 should be assessed for removal at the next EICR (typically C2 if there have been actual nuisance trips affecting clinical care, C3 otherwise)."
          >
            <p>
              The AFDD safety case rests on a probabilistic trade-off: an arc-fault produces a
              localised ignition risk; a nuisance trip produces an inconvenience. In a domestic
              installation, the trade-off favours the AFDD. In a Group 2 medical location, the
              trade-off inverts: an arc-fault on a non-life-critical socket can be managed; a
              nuisance trip on a life-critical socket during a procedure cannot. In a Group 0
              location, the trade-off is also inverted but for a different reason: there are no
              applied parts at risk, but corridor and life-safety lighting circuits MUST stay
              energised — a nuisance trip in a hospital corridor at 3 am during a code blue is a
              patient-safety event regardless of how the corridor itself is classified. Section 422
              (escape routes) and the Building Regulations Part B (fire safety) reinforce this from
              the fire-engineering side.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 710.421.1.7 — AFDDs in medical locations (NEW IN A4)"
            clause="In Group 0 and Group 2 medical locations, arc fault detection devices (AFDDs) according to BS EN 62606 shall not be installed. In Group 1 medical locations, the use of AFDDs is permitted where compatibility with the medical electrical equipment is confirmed by the equipment manufacturer."
            meaning="Outright prohibition for Group 0 and Group 2. Permitted for Group 1 ONLY with manufacturer compatibility confirmation. The prohibition is new in A4 — pre-A4 designs may have AFDDs in Group 0 or Group 2 locations and these should be assessed for removal under the current edition."
            cite="BS 7671:2018+A4:2026, Reg 710.421.1.7 (in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Section 729 — operating gangways and switchroom access</ContentEyebrow>

          <ConceptBlock
            title="Reg 729 dimensional rules — width, height, doors"
            plainEnglish="Section 729 sets the operator envelope around switchgear: 0.7 m clear width for a restricted gangway (skilled persons only, controlled access), 1.0 m for a general operating gangway, 2.0 m headroom throughout, doors opening OUTWARDS from the room."
            onSite="Apply Section 729 at the building-services design stage — it is much cheaper to size the switchroom correctly than to discover at commissioning that the inspector cannot stand in front of an MCCB to test it. Common failures: (a) packing a row of MCCBs against a wall and leaving 0.6 m clearance — fails 729; (b) sloping soffit dropping below 2.0 m at the back of the room — fails 729; (c) inward-opening doors that an injured operator falling against could block — fails 729; (d) cable trays at head height blocking the gangway envelope — fails 729."
          >
            <p>
              Section 729 reflects three engineering risks: arc-flash retreat distance (an operator
              must be able to step back from a closing breaker without colliding with a wall),
              manual handling (MCCBs and ACBs are heavy and require room to position withdrawable
              elements), and emergency egress (an injured operator must be able to exit the room
              without obstruction). The dimensions interact with CDM 2015 statutory duties on
              designers, principal designers and clients — a switchroom that fails Section 729 is
              not just a BS 7671 deviation, it is a CDM design risk that the principal designer must
              resolve before sign-off. The 2.0 m headroom is also relevant for ladder-based
              cable-termination work at the top of motor control centres.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Skilled person, instructed person, ordinary person — Section 729 access control"
            plainEnglish="Section 729 distinguishes between operating gangways (used by skilled persons under controlled access) and locations accessible to ordinary persons (must follow the general access rules). A restricted 0.7 m gangway is only acceptable where access is genuinely restricted — locked door, key card, signage."
            onSite="The access-control regime has to match the design assumption. A switchroom designed for 'skilled persons only' but with a door that anyone in the building can walk through does NOT qualify for the restricted-gangway dimensions; it must be redesigned to the wider general-operating-gangway dimensions or the access control must be tightened. The lockable door, key-card reader and 'Authorised Persons Only' signage are part of the BS 7671 design, not just a building-management afterthought."
          >
            <p>
              The terms skilled person (electrically), instructed person (electrically) and ordinary
              person are defined in Part 2 (Definitions) and used throughout Part 4. A skilled
              person has the technical knowledge or experience to enable them to avoid dangers
              electricity may create. An instructed person has been adequately advised or supervised
              by a skilled person. An ordinary person is neither. Section 729 dimensional
              relaxations (0.7 m restricted gangway) only apply to areas accessed exclusively by
              skilled persons — and the access control must be appropriate to enforce that
              exclusivity. Ordinary-person-accessible spaces revert to the wider 1.0 m general
              operating gangway minimum.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>
            Section 740 — temporary installations (fairgrounds, shows, circuses)
          </ContentEyebrow>

          <ConceptBlock
            title="Why Section 740 is one of the highest-risk environments in BS 7671"
            plainEnglish="Wandering leads, public access including children (BA1/BA2 ordinary persons), outdoor weather exposure (AD3 splashes, AD4 sprays, AD5 jets in wash-down), mechanical impact from members of the public AND from forklifts moving rides (AG2/AG3), portable generators with no DNO earth (forcing TT). Every external influence is at the high end of the scale and the population accessing the install is the least controlled."
            onSite="Section 740 mandatory protections: 30 mA RCD on every socket-outlet (no exceptions, even for a 16 A site supply); IP44 minimum, IP55 typical, IP65 for wet-effect rides; BS EN 60309-2 industrial connectors with colour-coded voltage band; TT system with verified Ra such that Ra × IΔn ≤ 50 V (Reg 411.5.3); separate earth electrode where the supply does not include a DNO earth; equipotential bonding of every metal ride structure to the local earth; daily inspection by a competent person before public opening."
          >
            <p>
              Section 740 covers temporary installations for amusement, fair, circus, show, kiosk
              and similar uses. The fundamental design assumption is that the installation will be
              erected, used by ordinary persons including children for a short period, then
              dismantled and re-erected at the next venue — and the wear, mechanical damage and
              moisture ingress accumulated across multiple cycles dominate the risk profile. The 30
              mA RCD is non-negotiable; the IP rating is dictated by the local external influences
              not the lowest the budget will allow; the TT verification (Ra × IΔn ≤ 50 V) must be
              done at every re-erection because the local soil moisture changes the earth-electrode
              resistance. The competent-person daily inspection is a Section 740 specific
              requirement and is documented on a daily inspection log alongside the ride-engineering
              safety log.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section 711 (exhibitions, shows, stands), Section 717 (mobile or transportable units), Section 730 (marina caravan/mobile units)"
            plainEnglish="The Part 7 sections covering transient and mobile installations share a common DNA: ordinary persons present, mechanical damage, moisture ingress, often TT or IT supplies because the host site cannot provide a verified DNO earth. Each section adds specific regs on top of Section 740's general framework."
            onSite="Section 711 (exhibitions): 30 mA RCD on sockets, careful CPC design where multiple stand contractors share a hall feed, fire-stopping at penetrations through stand walls. Section 717 (mobile or transportable units — e.g. mobile film studios, broadcast trucks): 30 mA RCD, robust BS EN 60309-2 connectors, the unit's onboard earth must coordinate with the site supply (often a TN-S derived from the venue, sometimes TT with a unit-mounted electrode). Section 730 (marina shore supplies and caravan park pitches for mobile units): each pitch has its own RCD-protected socket, a separate distribution circuit, and the supply system at the pitch is TT or PME-restricted — PME is generally not used at caravan pitches because of the open-PEN risk on a touring caravan with extensive bonded metal."
          >
            <p>
              The unifying theme across Sections 711, 717, 730 and 740 is that the installation is
              transient and the population using it is ordinary. The protective measures default to:
              ADS via OPD coordinated with 30 mA RCD additional protection, robust IP-rated
              enclosures, BS EN 60309-2 industrial connectors, TT where a verified DNO earth is not
              available, and frequent inspection. The cost of this protection is materially higher
              per kVA than a domestic install — but the population at risk is also materially less
              controlled, and the damage tolerance of the installation materially lower.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Specifying AFDDs on a Group 2 theatre circuit"
            whatHappens="Designer applies the A4 'AFDD on every domestic circuit' default thinking to a Group 2 theatre, fits AFDDs on the IT-system feeders. During a heart-lung-bypass procedure the AFDD trips on a transient produced by an electrosurgical generator — disconnecting life-supporting equipment mid-procedure. Reg 710.421.1.7 explicitly prohibits this."
            doInstead="Read Reg 710.421.1.7 before specifying any device in a medical location. AFDDs are PROHIBITED in Group 0 and Group 2; permitted in Group 1 only with manufacturer compatibility confirmation. The IT-system architecture (transformer + IMD + LPS + SELV) is the protective measure in Group 2 — adding an AFDD does not enhance safety, it actively defeats the architecture."
          />

          <CommonMistake
            title="Missing or high-resistance LPS bonding in an operating theatre"
            whatHappens="Refurbishment contractor replaces a stainless-steel theatre table but disconnects (and forgets to reconnect) the supplementary bonding cable to the LPS bus. The next periodic inspection measures 4.7 Ω from table to bus — well above the 0.2 Ω limit. The defect is a C2 — a cannulated patient on that table is at fibrillation risk."
            doInstead="Treat the LPS bus and every bonded item as a documented inspection point. At periodic verification, test with a calibrated micro-ohmmeter (a 200 mA continuity tester does not have the resolution at 0.2 Ω). Document each bond on the patient-environment layout drawing. Any contractor working in the patient environment must understand that disturbing a bonding cable requires immediate re-connection and re-test before the room returns to clinical use."
          />

          <CommonMistake
            title="Classifying a GP examination room as Group 2"
            whatHappens="Risk-averse designer over-classifies a private GP examination room as Group 2, specifies a medical IT system, IMD and LPS bus. Project cost balloons; the practice cannot afford the fit-out and the project stalls. The correct classification (Group 1) was achievable for a fraction of the cost."
            doInstead="Follow the Section 710 procedure-based test rigorously. Group 2 is for life-supporting applied parts OR intra-cardiac procedures. A GP examination room with applied parts (ECG electrodes, ultrasound probes, dermatology lights) is Group 1 by definition — no IT system required, no IMD required, but supplementary bonding inside the patient environment IS required. Document the classification on the medical-electrical risk register at design stage with the clinical lead's signature, so the cost-benefit of any later upgrade to Group 2 can be discussed openly."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Refurbishment of a small private clinic — 6 examination rooms, 1 minor-procedures room"
            situation="Private GP and minor-procedures clinic. Six rooms host routine examinations (ECG, ultrasound, dermatology). The seventh room hosts minor procedures under local anaesthetic — skin-lesion excisions, mole removals, IUD fittings. No life-supporting equipment, no intra-cardiac procedures, no general anaesthetic."
            whatToDo="Classify all seven rooms as Group 1. Specify supplementary equipotential bonding inside the patient environment of each room (Reg 710.415.1) — all exposed-conductive-parts and extraneous-conductive-parts bonded with conductors meeting Reg 544.2 sizing. SELV preferred for applied-part circuits. AFDDs are PERMITTED in Group 1 (Reg 710.421.1.7) — confirm compatibility with the dental / medical equipment manufacturers before fitting. 30 mA RCD additional protection on all socket-outlets per Reg 411.3.3, and on luminaire circuits if the practice trades as 'domestic-equivalent' premises (typically not — a clinic is not a household, so Reg 411.3.4 does not strictly apply; check the local building-control interpretation). Document the Group-1 classification on the medical-electrical risk register signed by the clinical lead."
            whyItMatters="The cost difference between Group 1 and Group 2 is roughly 5-10× per square metre. Over-classifying as Group 2 risks killing a viable project; under-classifying as Group 0 omits the supplementary bonding and SELV preferences that protect the cannulated patient during a routine ECG. The procedure-based classification test — applied rigorously, documented at design stage — is the right answer and the defensible answer if a later incident leads to investigation."
          />

          <Scenario
            title="New-build hospital theatre suite — three theatres + ICU"
            situation="NHS new-build acute hospital. Three operating theatres (Group 2), one ICU bay (Group 2), recovery (Group 2 for life-supported patients, Group 1 for routine recovery), scrub-room (Group 1), corridor (Group 0), staff base (Group 0). Total IT-system load across the four Group 2 spaces estimated at 22 kVA single-phase per theatre at peak."
            whatToDo="Specify a separate medical IT isolating transformer for each Group 2 location — three theatre transformers + one ICU transformer = four medical IT systems. Single-phase BS EN 61558-2-15 transformers limited to 10 kVA each, so each theatre needs either two 10 kVA transformers serving zones (e.g. one for life-critical sockets, one for life-supporting equipment) OR a larger custom three-phase IT system designed under BS 7671 and BS EN 61558-2-15. IMDs (BS EN 61557-8) on every IT bus, with audible AND visible alarms at the staff position in each theatre. LPS bonding bus around each Group 2 patient environment, ≤ 0.2 Ω verified by calibrated micro-ohmmeter. SELV (≤ 25 V AC / 60 V DC) at applied parts per Reg 710.413.1.5. NO AFDDs in any Group 2 space (Reg 710.421.1.7) — also no AFDDs in the corridor (Group 0). Switchroom designed to Section 729 (1.0 m operating gangway, 2.0 m headroom, outward-opening doors). UPS and clinical-grade standby generator coordinated with the IT-system architecture so that loss of mains does not produce a sudden potential change at the LPS bus."
            whyItMatters="A new-build theatre suite is the highest-risk, highest-cost Section 710 project in BS 7671. Every regulation in Section 710 was written in response to a real clinical incident or near-miss, and the design has to be defensible to the medical-electrical safety review, the CDM principal designer, the trust's clinical-engineering team, the inspector at initial verification and the ongoing periodic-inspection regime. The IT-system architecture, the IMD signalling, the LPS bus at 0.2 Ω, the AFDD prohibition and the SELV-25 V limit are not five independent design choices — they are a single integrated safety system, and getting any one of them wrong compromises the whole."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="A walk-through for any Section 710 project"
            plainEnglish="Six steps from clinical brief to compliant design. (1) Classify each room as Group 0/1/2 using the procedure-based test. (2) Specify the protective architecture per group. (3) Coordinate with the medical-equipment manufacturer for compatibility. (4) Document the medical-electrical risk register. (5) Verify at initial inspection. (6) Schedule periodic re-verification."
            onSite="(1) Classification: walk every room with the clinical lead, document procedure type, decide group. (2) Architecture: Group 0 = ordinary BS 7671; Group 1 = ordinary + supplementary bonding + SELV preference for applied parts + AFDD permitted with manufacturer confirm; Group 2 = IT system + IMD + LPS at 0.2 Ω + SELV 25 V + AFDD PROHIBITED. (3) Manufacturer compatibility — every applied-part device, every life-supporting device, every theatre information system must be confirmed compatible with the IT-system + IMD architecture. (4) Risk register — signed by clinical lead, principal designer, electrical designer; held with the building-information model. (5) Initial verification — full Section 6 testing PLUS Section 710 specific verifications (LPS resistance ≤ 0.2 Ω, IMD alarm activation, SELV voltage at applied parts ≤ 25 V AC / 60 V DC). (6) Periodic — typically annual for Group 2, three-yearly for Group 1, five-yearly for Group 0 (aligned with the EICR cycle for the host occupancy)."
          >
            <p>
              Section 710 projects fail when the clinical, design and verification phases drift out
              of sync. The classification decided in design must hold throughout construction; the
              architecture specified in design must be tested at initial verification; the
              verification must be recorded on a Section 710-specific schedule and the periodic
              re-verification must check the same points. A Group 2 theatre that passes initial
              verification with LPS resistance at 0.18 Ω, then drifts to 0.45 Ω at year three
              because of corrosion at a connector, is a defect that only periodic re-verification
              with a calibrated micro-ohmmeter will catch — and only if the periodic-inspection
              schedule explicitly requires that test. Build the periodic-inspection schedule into
              the handover documentation at initial verification.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Designer&apos;s quick reference</ContentEyebrow>

          <ConceptBlock
            title="Confirming the medical group classification"
            plainEnglish="(1) Is patient contact possible during normal procedures? (2) Is medical equipment with applied parts in use? (3) Could disconnection of supply cause patient harm?"
            onSite="(1) No to all → Group 0; standard BS 7671 applies. (2) Yes to patient contact + applied parts but disconnection acceptable → Group 1; SELV / PELV preferred where possible, AFDDs permitted with manufacturer guidance. (3) Yes including life-supporting equipment where disconnection is unacceptable → Group 2; IT system mandatory for life-critical sockets, Reg 710.421.1.7 prohibits AFDDs, Reg 710.413.1.5 requires SELV for applied parts."
          >
            <p>
              The classification is determined at the design stage by the medical / clinical
              authority responsible for the location, not by the electrical designer alone.
              Mis-classifying a Group 2 location as Group 1 (or vice versa) cascades into
              significant compliance failures — IT-system isolation transformer needed for Group 2,
              AFDD prohibition needed for Group 0 / 2, supplementary bonding bus needed for Group 2.
              Get the classification confirmed in writing and lock the design template to it.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Industrial control panels and BS EN 60204-1"
            plainEnglish="Machinery panels — control panels supplying motors, conveyors, automated equipment — sit at the BS 7671 / BS EN 60204-1 (machinery electrical equipment) boundary. The supply circuit to the panel is BS 7671; everything inside the panel and downstream of the machinery isolator is BS EN 60204-1."
            onSite="Read the boundary carefully on every cert. The Schedule of Inspection covers up to and including the machinery isolator (often the panel's main switch). Beyond that, the panel manufacturer's BS EN 60204-1 documentation takes over. Don't try to inspect or test the internals against BS 7671 — wrong standard, wrong test methods, wrong cert. Equipment certificates from the panel builder accompany the EIC for the supply install."
          >
            <p>
              Reg 110.1.3 governs the boundary handling — Part 7 / equipment standards override BS
              7671 within their scope, but the supply circuit upstream of the boundary remains BS
              7671. The cert wording typically reads &quot;Inspection extends to the machinery
              isolator at panel terminals; equipment beyond is covered by BS EN 60204-1
              documentation supplied by the manufacturer.&quot; Document the boundary clearly;
              future inspectors thank you.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Section 710 classifies medical locations into three groups by PROCEDURE, not by room type. Group 0: no applied parts (ordinary BS 7671). Group 1: applied parts in normal procedures (supplementary bonding, SELV preference). Group 2: life-supporting / intra-cardiac (IT system, IMD, LPS at 0.2 Ω, SELV 25 V).',
              'Reg 710.421.1.7 (new in A4) PROHIBITS AFDDs in Group 0 and Group 2 medical locations. Permitted in Group 1 only with manufacturer compatibility confirmation. The prohibition reflects the design philosophy that supply continuity for life-supporting equipment is more important than arc-fault detection.',
              'Reg 710.413.1.5 tightens the SELV upper limit to 25 V AC / 60 V DC ripple-free in Group 2 (vs 50 V / 120 V in general Section 414) because cannulated patients have bypassed skin resistance.',
              'Reg 710.415.2 requires supplementary equipotential bonding to a low-impedance LPS bus in every Group 2 location, with resistance from any bonded item to the bus ≤ 0.2 Ω. Verify with a calibrated micro-ohmmeter.',
              'Section 729 (operating gangways): 0.7 m restricted, 1.0 m general, 2.0 m headroom, outward-opening doors. Section 740 (temporary installations — fairgrounds): 30 mA RCD on sockets, IP44+ enclosures, TT verification (Ra × IΔn ≤ 50 V), BS EN 60309-2 industrial connectors.',
              'BS EN 60204-1 boundary in industrial installations: BS 7671 covers the supply circuit up to the machinery isolator; the panel manufacturer&apos;s BS EN 60204-1 documentation covers the internals. Document the boundary on the cert.',
              'Medical-group classification is determined by the clinical authority, not the electrical designer alone. Get it confirmed in writing; lock the design template to it.',
              'Reg 110.1.3 lets Part 7 special-location sections override the general regulations within their scope — read the Part 7 sub-section first before applying generic Reg 411 / 433 rules.',
              'IT systems in Group 2 use an isolation transformer + IMD; first earth fault alarms but does not disconnect; second earth fault triggers normal ADS per Reg 411.6.5.',
              'Insurance and regulatory consequences of medical mis-classification are severe — get sign-off from the clinical engineering team before energising.',
              'Industrial / commercial socket circuits ≤ 32 A still need 30 mA RCD additional protection per Reg 411.3.3 unless the (b) risk-assessment exception is documented and signed by a skilled person (electrically).',
              'Operating-theatre design typically combines IT system + supplementary equipotential bonding + SELV applied parts + emergency power changeover — four separate protective measures layered.',
              'Outpatient clinics and dental surgeries are typically Group 1 — supplementary bonding required, AFDDs permitted on non-clinical socket circuits.',
              'Industrial three-phase commercial work routinely uses BS EN 60309-2 industrial connectors (blue 32 A 230 V single-phase, red 16 A / 32 A 400 V three-phase) for portable equipment and temporary installations.',
              'Section 740 (fairground / temporary) installations typically require TT verification (Ra × IΔn ≤ 50 V) and 30 mA RCD additional protection on all sockets accessible to ordinary persons.',
              'For ALL Part 7 special locations: read the Part 7 sub-section first, apply Reg 110.1.3 to identify which general regulations are overridden, then apply only the overridden specifics to the design.',
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
              onClick={() => navigate('/electrician/upskilling/bs7671-module-7-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.5 Prosumer installations (Part 8)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module7Section4;
