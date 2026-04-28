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
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';
import { videos } from '@/data/study-centre/video-library';

const inlineChecks = [
  {
    id: 'm5s1-511-1-standard-edition',
    question:
      'You are specifying a consumer unit for a domestic rewire. The wholesaler offers two visually identical units: one declared to BS EN 61439-3 (current edition with the latest BSI-declared amendment), the other to a superseded edition of the same standard at clearance pricing. Which does Reg 511.1 actually allow you to install?',
    options: [
      'Either — both still carry the BS EN number',
      'Only the current edition with BSI-declared amendments — Reg 511.1 binds you to "the edition of the standard ... the current edition, with those amendments declared by BSI to be applicable"',
      'Only the cheaper one if the customer agrees in writing',
      'Either, provided the unit carries a CE or UKCA mark',
    ],
    correctIndex: 1,
    explanation:
      'Reg 511.1 is unambiguous on the point: equipment shall comply with the relevant British or Harmonized Standard, and the edition shall be the current edition with the amendments BSI declares applicable. A superseded edition is no longer the relevant standard. CE / UKCA marking is a market-access declaration, not a route around 511.1 — they are independent requirements.',
  },
  {
    id: 'm5s1-512-1-1-voltage',
    question:
      'A site has a measured nominal supply voltage of 230 V with documented over-voltage events to 253 V (the +10 % limit) during light-load periods. You are selecting a contactor rated 230 V AC. Reg 512.1.1 requires you to do what?',
    options: [
      'Nothing — the 230 V rating matches the nominal voltage',
      'Confirm the contactor coil and main contact ratings cover the highest steady-state voltage that may occur, including the documented +10 % excursion (253 V), not just the nominal',
      'Apply a derating factor of 0.85',
      'Specify a 110 V contactor with a step-down transformer',
    ],
    correctIndex: 1,
    explanation:
      'Reg 512.1.1 requires equipment to be suitable for the nominal voltage AND for the over-voltages and under-voltages likely to occur in normal operation. UK LV is nominal 230 V with a permitted ±10 % envelope (207 V to 253 V). The contactor must cope with the highest documented steady-state voltage, otherwise insulation stress, contact welding under inrush at high voltage, and coil pull-in failure at low voltage become real failure modes.',
  },
  {
    id: 'm5s1-512-1-6-uw-cat-ii',
    question:
      'You are selecting an SPD (surge protective device) for a category II load — a domestic socket-outlet circuit fed from a TN-C-S supply. Per BS 7671 Table 443.2, what minimum impulse withstand voltage (Uw) must equipment in this circuit be capable of withstanding?',
    options: ['1.5 kV', '2.5 kV', '4 kV', '6 kV'],
    correctIndex: 1,
    explanation:
      'BS 7671 Table 443.2 sets the minimum impulse withstand voltage (Uw) by overvoltage category: I = 1.5 kV (sensitive electronic equipment fed from a protected supply), II = 2.5 kV (current-using equipment supplied from the fixed installation — typical sockets / appliances), III = 4 kV (the fixed installation itself — distribution boards, switchgear, fixed accessories), IV = 6 kV (origin of the installation — meter, main switch, service-cut-out side equipment). Reg 512.1.6 mandates that selected equipment meets at least the Uw for its category.',
  },
  {
    id: 'm5s1-511-2-bespoke',
    question:
      'A customer wants to install a one-off, hand-built control panel imported from outside the UK. There is no British or Harmonized Standard the panel can claim conformity to. Under Reg 511.2 you may install it provided what?',
    options: [
      'You attach a CE mark from a printer roll',
      'The designer confirms in writing that the equipment provides a degree of safety not less than that afforded by compliance with the relevant standard, and the justification is recorded on the EIC',
      'The customer signs a disclaimer absolving you of responsibility',
      'You de-rate every protective device by 50 %',
    ],
    correctIndex: 1,
    explanation:
      "Reg 511.2 is the bespoke / out-of-standard route: where equipment cannot comply with a recognised standard, the designer (Reg 132.1) must confirm the equivalent-safety position, and the departure must be recorded as a Reg 120.3 designed departure on the EIC. CE / UKCA marking does not satisfy 511.2 — it is a separate market-access regime, not a substitute for product-standard conformity. A customer disclaimer cannot override the designer's statutory duty.",
  },
  {
    id: 'm5s1-512-2-external-influences',
    question:
      'You are installing socket-outlets in an outdoor garden room with a damp concrete floor and no heating. Reg 512.2 requires equipment selection for external influences. Which Reg 522 codes are most directly relevant?',
    options: [
      'AA1 (ambient temperature -60 to +5 °C) and AB1',
      'AD3 / AD4 (presence of water — splashes / sprays) and BB2 / BB3 (low / very low body resistance from damp conditions)',
      'AG1 (no mechanical impact) only',
      'AN1 (no solar radiation) only',
    ],
    correctIndex: 1,
    explanation:
      'Reg 512.2.1 hands you off to the Reg 522 external-influences taxonomy. An outdoor garden room with damp concrete is dominated by AD codes (water — at minimum AD3 sprays, often AD4 splashes), and the damp underfoot brings BB into play (body resistance reduced by moisture / wet skin). Equipment must be IP-rated and material-selected to suit the worst-case combination. A standard IP2X indoor socket is non-compliant with 512.2 in this environment.',
  },
  {
    id: 'm5s1-513-1-accessibility',
    question:
      'A contractor proposes building a luminaire and its driver permanently behind a sealed plasterboard ceiling, accessed only by destructive removal of the ceiling. Reg 513.1 says what?',
    options: [
      'Acceptable — once installed, equipment does not need to be reached again',
      'Equipment shall be installed so as to be accessible for operation, inspection, testing, fault-finding, maintenance and repair — sealed-in inaccessible mounting fails 513.1 unless the equipment is specifically designed to be maintenance-free for its installed life and a suitable means of replacement is provided',
      'Acceptable, but only if the plasterboard is fire-rated',
      'Acceptable, provided the customer signs a waiver',
    ],
    correctIndex: 1,
    explanation:
      'Reg 513.1 makes accessibility for operation, inspection, testing, fault-finding, maintenance and repair a positive design requirement — not a nice-to-have. Sealed-in equipment that cannot be reached without destructive intervention fails 513.1 unless (a) the equipment is genuinely maintenance-free for its installed life AND (b) a defined replacement strategy is documented. In practice this means access panels, hatches, removable ceiling tiles, or driver-in-accessible-location wiring.',
  },
  {
    id: 'm5s1-mi-binding',
    question:
      "A manufacturer's installation manual for an EV charger specifies a maximum 25 mm² supply CPC, 30 mA Type A RCD upstream, and a minimum bend radius of 8× cable OD. The installer fits 16 mm² CPC (oversized to the manual's view, undersized to the installer's preference for cost), a Type AC RCD, and folds the cable tighter than 8× OD. What is the regulatory position?",
    options: [
      'Manufacturer instructions are advisory — BS 7671 prevails',
      "Manufacturer instructions are a binding regulatory document under Reg 510.3 / 134.1.1: the installation must comply with both BS 7671 AND the manufacturer's instructions; departing from any of the three points listed creates EICR observations and may void warranty / conformity",
      'Only the BS 7671 points matter',
      'Only the bend radius matters because it is a physical risk',
    ],
    correctIndex: 1,
    explanation:
      "Reg 510.3 and Reg 134.1.1 require installation in accordance with the manufacturer's instructions. Where the manufacturer's instruction is more restrictive than BS 7671 the manufacturer's instruction governs — the equipment's declared conformity (and CE / UKCA marking, and warranty) are conditional on that instruction being followed. Type AC where Type A is specified is wrong-type RCD; under-bend-radius mechanically damages the cable; oversized CPC is a manufacturer-instruction violation that may break terminal-clamp design assumptions.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which combination correctly describes the headline scope of Section 511 (Compliance with Standards) and Section 512 (Operational conditions and external influences)?',
    options: [
      'Section 511 covers only voltage; Section 512 covers only IP ratings',
      'Section 511 binds equipment to the relevant British / Harmonized Standard at its current edition with BSI-declared amendments (511.1) and provides a designed-departure route for out-of-standard equipment (511.2); Section 512 then governs selection for voltage (512.1.1), current (512.1.2), frequency (512.1.3), power (512.1.4), compatibility (512.1.5), impulse withstand voltage (512.1.6) and external influences (512.2)',
      'Section 511 is advisory; Section 512 is mandatory',
      'Both sections only apply to switchgear',
    ],
    correctAnswer: 1,
    explanation:
      "The two sections work as a pair. 511 is the conformity gate (does the equipment have a relevant standard, and is the version current?). 512 is the suitability gate (is the conformant equipment suitable for THIS installation's voltage, current, frequency, power, compatibility, impulse withstand and external influences?). Both gates must be cleared before equipment may be used (Reg 132.1 / 132.5 — designer's duty).",
  },
  {
    id: 2,
    question:
      'Reg 512.1.6 invokes Table 443.2 to set minimum impulse withstand voltage (Uw) by overvoltage category. Which row is correct?',
    options: [
      'CAT I = 6 kV; CAT II = 4 kV; CAT III = 2.5 kV; CAT IV = 1.5 kV',
      'CAT I = 1.5 kV; CAT II = 2.5 kV; CAT III = 4 kV; CAT IV = 6 kV',
      'CAT I = 4 kV; CAT II = 6 kV; CAT III = 1.5 kV; CAT IV = 2.5 kV',
      'All categories require Uw = 6 kV',
    ],
    correctAnswer: 1,
    explanation:
      'Table 443.2: CAT I = 1.5 kV (sensitive electronic equipment behind a protected supply), CAT II = 2.5 kV (current-using equipment fed from the fixed installation — sockets, appliances), CAT III = 4 kV (the fixed installation itself — DBs, switchgear, fixed accessories), CAT IV = 6 kV (origin — meter, service head, supply-side equipment). The categories rise toward the supply because impulse stress is highest at the origin and is progressively attenuated downstream by impedance and SPDs.',
  },
  {
    id: 3,
    question:
      'A designer claims that because a piece of equipment carries the UKCA mark, Reg 511.1 is satisfied. Why is the designer wrong?',
    options: [
      'UKCA is exactly equivalent to Reg 511.1 — the designer is correct',
      'UKCA / CE marking is a market-access declaration of conformity to applicable UK / EU regulations (LVD, EMC, RoHS, etc.) made by the manufacturer; Reg 511.1 separately requires conformity to the relevant British or Harmonized installation standard at its current BSI-declared edition. The two requirements are independent and both must be met',
      'UKCA only applies to imports from outside the UK',
      'UKCA expired in 2024',
    ],
    correctAnswer: 1,
    explanation:
      "Common confusion. UKCA / CE = product market-access (the manufacturer's declaration that the product complies with applicable supply-side regulations such as the Electrical Equipment (Safety) Regulations 2016 and the EMC Regulations 2016). Reg 511.1 = installation-side requirement that the equipment also conforms to the relevant British / Harmonized Standard for its intended use, in its current edition. A UKCA-marked accessory built to a superseded edition of its product standard is conformant for market access but non-compliant for installation under 511.1.",
  },
  {
    id: 4,
    question:
      'You are selecting a 32 A MCB to protect a final circuit. Which Reg 512.1.x requirements must the device satisfy beyond simply "32 A nominal"?',
    options: [
      'Only 512.1.1 (voltage)',
      '512.1.1 (voltage rating ≥ system voltage incl. excursions), 512.1.2 (current rating coordinated with cable Iz and load Ib per Reg 433.1.1), 512.1.3 (rated frequency 50 Hz for UK LV), 512.1.4 (power / breaking capacity ≥ prospective fault current at point of installation per Reg 434.5.1), 512.1.5 (compatibility — RCD selectivity, AFDD compatibility, busbar / DIN-rail mounting)',
      'Only 512.1.4 (power)',
      'Only 512.1.6 (impulse withstand)',
    ],
    correctAnswer: 1,
    explanation:
      "Picking a 32 A MCB on rated current alone misses five of the six clauses in 512.1. Voltage: must withstand the system voltage including transient excursions. Current: cable Iz, load Ib, In coordination per 433.1.1. Frequency: UK LV is 50 Hz; some imported devices are 60 Hz only and the trip curve shifts. Power / breaking capacity (Icn / Icu): must equal or exceed measured / calculated PSCC at that point per 434.5.1. Compatibility: RCD selectivity, AFDD compatibility, manufacturer's busbar system, mounting orientation. Real specs cover all six.",
  },
  {
    id: 5,
    question:
      'A bespoke piece of equipment has no relevant British or Harmonized Standard it can claim conformity to. Which BS 7671 mechanism allows the equipment to still be installed, and what evidence must accompany it?',
    options: [
      'Reg 511.1 — a CE mark is enough',
      'Reg 511.2 — provided the designer (per Reg 132.1) confirms the equipment provides a degree of safety not less than that obtained by compliance with the relevant standard, and the matter is recorded as a designed departure under Reg 120.3 on the EIC',
      'Reg 411.3.4 — automatic 30 mA RCD makes any equipment compliant',
      'No mechanism exists; the equipment cannot be installed',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 511.2 is the explicit out-of-standard route. The designer must satisfy themselves that equivalent safety is achieved (often by reference to similar standards, type-test reports, manufacturer technical files, third-party assessment), and the departure must be declared on the EIC under Reg 120.3 with the justification attached. The burden of proof sits with the designer — the customer cannot waive it, the contractor cannot inherit it via instruction.',
  },
  {
    id: 6,
    question:
      'Reg 513.1 (Accessibility) requires equipment to be installed for operation, inspection, testing, fault-finding, maintenance and repair. Which scenario most clearly fails 513.1?',
    options: [
      'A consumer unit at 1.4 m above floor level with a hinged door',
      'A junction box concealed inside a sealed plasterboard ceiling void with no access hatch and no documented maintenance-free strategy',
      'A switch beside a doorway',
      'A socket-outlet at 450 mm above floor level',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 526.3 specifically prohibits inaccessible joints — every connection must be accessible for inspection, testing and maintenance, except where (a) the joint is in equipment complying with Reg 526.3(i) (compound-filled / encapsulated), (b) brazed / welded / soldered joints in equipment listed in 526.3(ii)–(iv), or (c) maintenance-free joints listed in 526.3 (e.g. crimped joints in compliant accessories). A standard junction box behind sealed plasterboard fails on both 526.3 and 513.1.',
  },
  {
    id: 7,
    question:
      'A manufacturer\'s installation manual specifies "30 mA Type A RCD upstream — Type AC not permitted". The installer fits a Type AC. Which BS 7671 regulation does this most directly breach, and what is the regulatory consequence?',
    options: [
      'No breach — RCDs are interchangeable',
      "Breach of Reg 510.3 / 134.1.1 (installation per manufacturer's instructions); the equipment's declared conformity is conditional on the instruction being followed, so the install is non-compliant, the EIC must record a departure, the manufacturer's warranty is voidable, and the install attracts EICR observation typically C2",
      'Breach of Reg 411.3.4 only',
      'Breach of Reg 511.1 only',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 510.3 binds equipment selection / installation to the manufacturer's instructions. Reg 134.1.1 binds initial verification to the same. Where the manufacturer is more restrictive than BS 7671, the manufacturer's instruction governs. Wrong-type RCD (Type AC where Type A is required) is a documented EICR fail mode and a documented warranty exclusion. The cert must record the departure under Reg 120.3 — but a designed departure must justify equivalent safety, which is impossible to argue when the manufacturer's own document says \"not permitted\".",
  },
  {
    id: 8,
    question:
      'You are designing equipment selection for an installation with the supply origin equipment at 230/400 V from a public LV network. Which overvoltage category applies to that origin equipment, and therefore what minimum Uw is required?',
    options: [
      'CAT I — Uw 1.5 kV',
      'CAT II — Uw 2.5 kV',
      'CAT III — Uw 4 kV',
      'CAT IV — Uw 6 kV (origin equipment — meter, service head, supply-side switchgear — sees the highest impulse stress and Table 443.2 mandates the highest Uw)',
    ],
    correctAnswer: 3,
    explanation:
      'Origin equipment — service cut-out, meter, main switch on the supply side — sits closest to the public network and is exposed to the largest impulse stress (atmospheric overvoltages, switching transients propagating from the network). Table 443.2 sets CAT IV here, with minimum Uw 6 kV. Equipment further into the installation can be progressively lower category as impedance and SPDs attenuate the impulse — but the origin device is non-negotiable at 6 kV.',
  },
];

const faqItems = [
  {
    question: 'What is the difference between CE / UKCA marking and Reg 511.1 conformity?',
    answer:
      "CE / UKCA marking is a manufacturer's declaration of conformity to applicable supply-side regulations (Electrical Equipment (Safety) Regulations 2016, EMC Regulations 2016, RoHS, etc.) — it permits the product to be placed on the GB or EU market. Reg 511.1 is a separate installation-side requirement that the equipment also conforms to the relevant British or Harmonized installation standard at its current BSI-declared edition. A product can be UKCA-marked AND fail Reg 511.1 (e.g. built to a superseded edition of its installation standard). Both gates must be passed.",
  },
  {
    question: "Are manufacturer's installation instructions actually a regulatory document?",
    answer:
      "Yes. Reg 510.3 (selection in accordance with manufacturer's instructions) and Reg 134.1.1 (initial verification per manufacturer's instructions) make them binding. The equipment's declared conformity, its CE / UKCA basis and its warranty are all conditional on the instructions being followed. Where the manufacturer is more restrictive than BS 7671 (e.g. specifying Type A RCD upstream where BS 7671 alone would accept Type AC), the manufacturer's document governs. Failure to follow manufacturer instructions is grounds for EICR observation and may void liability cover.",
  },
  {
    question: 'What does Reg 511.2 actually allow me to do with bespoke equipment?',
    answer:
      "Reg 511.2 lets you install equipment for which there is no relevant British or Harmonized Standard, provided the designer (Reg 132.1) confirms in writing that the equipment provides a degree of safety not less than that obtained by compliance with the relevant standard. The departure must be declared on the EIC under Reg 120.3, with the supporting evidence (third-party assessment, type-test reports, manufacturer's technical file, equivalent-standard cross-reference) retained as part of the project record. A customer disclaimer cannot transfer or waive the designer's duty.",
  },
  {
    question: 'How do I work out which overvoltage category applies to my equipment selection?',
    answer:
      "Walk back from the equipment to the supply origin. CAT I = sensitive electronic equipment fed from a protected supply (e.g. inside an SPD-protected zone). CAT II = current-using equipment supplied from the fixed installation — typical sockets and appliances. CAT III = the fixed installation itself — distribution boards, switchgear, fixed accessories carrying installation current. CAT IV = the origin — service cut-out, meter, main switch, anything supply-side. Table 443.2 then sets minimum impulse withstand: 1.5 / 2.5 / 4 / 6 kV respectively. Reg 512.1.6 mandates the equipment's declared Uw equals or exceeds the category minimum.",
  },
  {
    question:
      'My DB is rated 6 kA breaking capacity but the calculated PSCC is 9 kA. Can I still use it?',
    answer:
      'No — that is a direct breach of Reg 512.1.4 (rated power / breaking capacity) and Reg 434.5.1 (every protective device shall have a breaking capacity not less than the prospective fault current at the point at which it is installed). The fix is design: either select a higher Icn / Icu device (and verify upstream coordination with cascading per manufacturer documentation), reduce the prospective fault current by adding upstream impedance (rare in practice), or replace the DB with one rated above PSCC. Cascading (energy-let-through coordination upstream) can sometimes salvage the situation but only with explicit manufacturer cascade tables — not as an assumption.',
  },
  {
    question: 'Reg 513.1 says equipment must be accessible. Does that ban driver-in-ceiling LEDs?',
    answer:
      "Not by itself. Driver-in-ceiling LED installations comply with Reg 513.1 where (a) the driver is mounted at a location accessible via a hatch, removable ceiling tile, or by reasonable disturbance, OR (b) the driver is genuinely maintenance-free for the installed life of the system AND a defined replacement strategy is documented (e.g. integral driver luminaire, driver replaced as a unit by removing the luminaire from below). Sealed-in drivers behind permanent plasterboard with no access route fail 513.1. Reg 526.3 also bars inaccessible joints — the driver's primary connection counts.",
  },
  {
    question: 'How does Section 512.2 (external influences) interact with Reg 522 in practice?',
    answer:
      'Reg 512.2.1 is the trigger — equipment shall be selected for the external influences to which it is or may be exposed. Reg 522 (Selection and erection in relation to external influences) and Appendix 5 then provide the taxonomy: AA (ambient temperature), AB (humidity), AD (water), AE (foreign solid bodies), AF (corrosion), AG (impact), AH (vibration), AK / AL (flora / fauna), AN (solar), BA (capability of persons), BB (body resistance), BC (contact with earth), BD (escape conditions), BE (nature of materials). On site this maps to IP rating, IK rating, material selection (UV-stable, salt-resistant, vermin-resistant), enclosure orientation and mounting. A garden room is dominated by AD and BB; a kitchen is AD3 + AA / AB; an industrial workshop is AG3 + AF. Get the codes right and the equipment selection follows.',
  },
  {
    question: "What if the manufacturer's instruction conflicts with BS 7671 — which wins?",
    answer:
      "You take the more onerous of the two. Reg 510.3 / 134.1.1 require compliance with manufacturer's instructions. Reg 132 / 134 require compliance with BS 7671. Where the manufacturer is more restrictive (e.g. a specific RCD type, a tighter terminal torque, a smaller maximum CPC size), follow the manufacturer. Where BS 7671 is more restrictive (e.g. a special-location regulation in Part 7 the manufacturer's instruction does not consider), follow BS 7671. A genuine direct conflict — manufacturer says X, BS 7671 says NOT X — is rare and is treated as a designed-departure question under Reg 120.3 with documented justification, often resolved by selecting different equipment.",
  },
  {
    question: 'Does Reg 513.1 apply to sealed enclosures inside switchgear assemblies?',
    answer:
      'No. Reg 513.1 governs the equipment as installed in the building. Internally sealed sub-assemblies inside type-tested switchgear (a sealed contactor module, a moulded-case circuit-breaker mechanism) are part of the assembly\'s declared design, type-tested per BS EN 61439 series, and are not "equipment" in the 513.1 sense. The duty under 513.1 is to install the assembly so that the assembly itself — not its internal mechanisms — is accessible for operation, inspection and maintenance per the manufacturer\'s instructions.',
  },
];

const BS7671Module5Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Equipment Ratings and Suitability for Purpose | BS 7671:2018+A4:2026 | Module 5.1',
    description:
      "How BS 7671:2018+A4:2026 governs equipment selection — Reg 511 (compliance with standards), Reg 512 (operational conditions, impulse withstand, external influences) and Reg 513 (accessibility). Includes Table 443.2 overvoltage categories and the binding role of manufacturer's instructions.",
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
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1"
            title="Equipment ratings and suitability for purpose"
            description="The two-gate test every piece of installed equipment must pass — Section 511 (does it conform to the right standard at the right edition?) and Section 512 (is it suitable for THIS installation\u2019s voltage, current, frequency, power, compatibility, impulse withstand and external influences?). Plus Reg 513 accessibility and the binding regulatory role of the manufacturer\u2019s installation instructions."
            actions={
              <>
                <RegBadge>511.1</RegBadge>
                <RegBadge>512.1.1</RegBadge>
                <RegBadge>513.1</RegBadge>
                <AmendmentBadge regs={['512.1.6']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Two gates, both compulsory: Section 511 binds equipment to the relevant British / Harmonized Standard at its current BSI-declared edition (Reg 511.1) — out-of-standard equipment is a designed-departure under Reg 511.2.',
              'Section 512 then tests fitness for the actual installation: voltage (512.1.1), current (512.1.2), frequency (512.1.3), power / breaking capacity (512.1.4), compatibility (512.1.5), impulse withstand voltage Uw (512.1.6) and external influences (512.2).',
              'Manufacturer\u2019s installation instructions are a binding regulatory document under Reg 510.3 / 134.1.1 — where they are more restrictive than BS 7671 they govern; departing from them creates EICR observations and voids declared conformity.',
              'Reg 513.1 makes equipment accessibility for operation, inspection, testing, fault-finding, maintenance and repair a positive design requirement, not an afterthought.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the conformity requirement of Reg 511.1 (relevant British / Harmonized Standard, current edition with BSI-declared amendments) and apply it to real product selection.',
              'Apply Reg 511.2 correctly when no relevant standard exists \u2014 designer\u2019s equivalent-safety confirmation, Reg 120.3 designed-departure record, and what evidence must accompany the EIC.',
              'List the six clauses of Reg 512.1 (voltage, current, frequency, power, compatibility, impulse withstand) and pick the right specification across all six for a typical protective device.',
              'Use Table 443.2 to select equipment by overvoltage category I / II / III / IV with minimum impulse withstand voltage 1.5 / 2.5 / 4 / 6 kV.',
              'Apply Reg 512.2 (external influences) by mapping the installation environment to Reg 522 / Appendix 5 codes and translating to IP / IK ratings and material selection.',
              'Distinguish CE / UKCA market-access marking from Reg 511.1 installation-standard conformity \u2014 they are independent regulatory regimes, both required.',
              'Apply Reg 513.1 (accessibility) and Reg 526.3 (accessibility of joints) to design and EICR situations where equipment is concealed or enclosed.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Section 511 \u2014 compliance with standards</ContentEyebrow>

          <ConceptBlock
            title="Reg 511.1 \u2014 the standards-conformity gate"
            plainEnglish="Every piece of equipment you install must comply with the relevant British or Harmonized Standard for its intended use, and you must use the current edition with the amendments BSI has declared applicable \u2014 not a superseded edition."
            onSite="On the wholesaler\u2019s shelf, two visually identical CUs may be declared to two different editions of BS EN 61439-3. The newer edition is the one Reg 511.1 will accept. The clearance-priced older edition is non-compliant the moment a new EIC is signed against it."
          >
            <p>
              Reg 511.1 is the conformity gate that opens every equipment-selection decision in the
              regulations. It is not a vague reference to "good products" \u2014 it is a hard
              requirement that the equipment claims conformity to the <strong>relevant</strong>{' '}
              British or Harmonized Standard, and that the edition declared on the equipment is the
              <strong> current</strong> edition with all BSI-declared amendments. Out-of-date
              editions are non-compliant. Equipment to a non-relevant standard (e.g. a continental
              DIN-only accessory with no British or Harmonized equivalent) is non-compliant. The
              duty sits with the designer (Reg 132.1) and the installer (Reg 134.1.1) jointly.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 \u00b7 Reg 511.1 \u2014 Compliance with standards"
            clause="Every item of equipment shall comply with the relevant requirements of the applicable British or Harmonized Standard(s), appropriate to the intended use of the equipment. The edition of the standard shall be the current edition, with those amendments declared by BSI to be applicable."
            meaning="Two tests in one regulation. (1) The relevant British or Harmonized Standard \u2014 not a tangentially related one, not a continental-only DIN, not a manufacturer\u2019s in-house spec. (2) The current edition of that standard, with BSI-declared amendments \u2014 not a superseded edition, even where the equipment carries the same headline product number."
            cite="BS 7671:2018+A4:2026, Reg 511.1"
          />

          <InlineCheck {...inlineChecks[0]} />

          <ConceptBlock
            title="Reg 511.2 \u2014 the bespoke / out-of-standard route"
            plainEnglish="Where there is no relevant British or Harmonized Standard for a piece of equipment, you can still install it \u2014 but only if the designer confirms it provides equivalent safety, and only if the departure is declared on the EIC under Reg 120.3."
            onSite="Imported one-off control panels, custom test rigs, niche industrial assemblies. The designer has to gather evidence (third-party assessment, type-test reports, equivalent-standard cross-reference, manufacturer\u2019s technical file) and document the equivalent-safety position. The customer cannot waive this. The contractor cannot inherit it via instruction."
          >
            <p>
              Reg 511.2 is narrow on purpose. The default expectation is that equipment is built to
              a recognised standard. The bespoke route exists for genuine one-offs and for equipment
              where the standards system has not yet caught up with the product. The designer\u2019s
              duty under Reg 132.1 is to confirm the equipment provides a degree of safety not less
              than that obtained by compliance with the relevant standard, and the departure must be
              recorded under Reg 120.3 on the EIC with the supporting evidence retained as part of
              the project record. The burden of proof sits with the designer \u2014 it cannot be
              transferred to the manufacturer, the customer, or the contractor downstream.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <ConceptBlock
            title="Why \u2018the relevant standard\u2019 is the operative phrase"
            plainEnglish="A product can carry a recognised BS EN number on its packaging and still fail Reg 511.1 if that BS EN is not the relevant standard for how the product is being used."
            onSite="A wall-mounted weatherproof enclosure declared to BS EN 60529 (the IP rating standard) is not declared to BS EN 60670-1 (the standard for installation boxes for accessories). 60529 governs the IP test method; 60670 governs the box itself. A box claiming \u2018IP65 to BS EN 60529\u2019 has not declared conformity to the installation-box standard \u2014 and on a fixed-wiring accessory enclosure 60670 is the relevant standard. Read the data sheet, not the marketing leaflet."
          >
            <p>
              The phrase &lsquo;relevant requirements of the applicable British or Harmonized
              Standard&rsquo; in Reg 511.1 carries the regulatory weight. Equipment manufacturers
              sometimes cite test-method standards (BS EN 60529 IP testing, BS EN 62262 IK testing,
              BS EN 60068 environmental testing) as if they were product-conformity standards \u2014
              they are not. A product declared only to test-method standards has not declared
              conformity to its own product standard, and Reg 511.1 is not satisfied. The
              corresponding product standards \u2014 BS EN 60670 (installation boxes), BS EN 60898
              (MCBs), BS EN 61008 / 61009 (RCDs / RCBOs), BS EN 61439 (LV switchgear and controlgear
              assemblies), BS EN 60669 (switches), BS EN 60898-2 (DC MCBs), BS EN 62196 (EV
              connectors), BS EN 50525 (cables), BS EN 50550 (PEN-fault relays) \u2014 are the ones
              that have to appear on the declaration of conformity. The test-method standards are
              referenced inside the product standard and are not a substitute for it.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>CE and UKCA \u2014 a different regulatory regime</ContentEyebrow>

          <ConceptBlock
            title="What CE / UKCA marking actually declares"
            plainEnglish="CE / UKCA = the manufacturer\u2019s declaration that the product meets the supply-side regulations needed to place it on the market (Electrical Equipment (Safety) Regulations 2016, EMC Regulations 2016, RoHS, etc.). It is NOT a declaration of conformity to a BS 7671 installation standard."
            onSite="UKCA / CE markings are about market access. Reg 511.1 is about installation conformity. A UKCA-marked device built to a superseded edition of its product standard is conformant for market access AND non-compliant under Reg 511.1. Both gates are required \u2014 they are not interchangeable."
          >
            <p>
              The Electrical Equipment (Safety) Regulations 2016 and the EMC Regulations 2016 are
              the UK statutory instruments that require UKCA (and accept CE during transitional
              periods) marking on most LV electrical equipment placed on the GB market. Compliance
              with these regulations is established via conformity-assessment procedures referenced
              by harmonised standards. Reg 511.1 then layers a second, independent installation-side
              requirement on top: the equipment must also conform to the <em>relevant</em> British
              or Harmonized installation standard at its <em>current edition</em>. The two regimes
              overlap but neither subsumes the other. Treat them as two separate locks both needing
              the right key.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url={videos.transformers.url}
            title={videos.transformers.title}
            channel={videos.transformers.channel}
            duration={videos.transformers.duration}
            topic="Watch · Transformer behaviour for the impulse-withstand check"
            caption="The Engineering Mindset walks the transformer at the level you need to apply Reg 512.1.6. The impulse withstand voltage Uw the regulation invokes via Table 443.2 (1.5 / 2.5 / 4 / 6 kV by overvoltage category) is the equipment's ability to survive the transient surges produced by transformer switching, lightning-induced surges and other supply-side disturbances. Once you see why a transformer produces those transients, the category-by-position decision (CAT IV at the origin, CAT II at the socket) becomes obvious physics rather than table look-up."
          />

          <SectionRule />

          <ContentEyebrow>Section 512 \u2014 operational conditions</ContentEyebrow>

          <ConceptBlock
            title="The six clauses of Reg 512.1 \u2014 voltage, current, frequency, power, compatibility, impulse withstand"
            plainEnglish="Reg 511.1 makes sure the equipment is the right product. Reg 512.1 makes sure the right product is suitable for THIS installation. Six tests \u2014 voltage, current, frequency, power, compatibility, impulse withstand. Skip any one and the install is non-compliant."
            onSite="Picking a 32 A MCB on rated current alone misses five of the six clauses. The full spec covers system voltage including \u00b110 % excursions (512.1.1), current rating coordinated with cable Iz and load Ib (512.1.2), 50 Hz UK LV (512.1.3), breaking capacity \u2265 PSCC (512.1.4), RCD / AFDD / busbar compatibility (512.1.5), and Uw against the overvoltage category (512.1.6)."
          >
            <p>
              <strong>512.1.1 Voltage.</strong> Equipment shall be suitable for the nominal voltage
              and for the over- and under-voltages likely to occur in normal operation. UK LV is
              nominal 230 V with a permitted \u00b110 % envelope (207\u2013253 V). A 230 V-rated
              accessory must cope with sustained 253 V; a sustained 253 V across an undersized coil
              or insulation is a measurable degradation rate, not just a notional possibility.
              <strong> 512.1.2 Current.</strong> Equipment shall be suitable for the design current
              (load) and any abnormal currents likely (motor inrush, transformer inrush, fault
              currents until the OPD operates). Coordinated with cable Iz and protective device In
              under Reg 433.1.1. <strong>512.1.3 Frequency.</strong> UK LV is 50 Hz; some imported
              devices are 60 Hz only and the trip / pull-in characteristics shift measurably.{' '}
              <strong>512.1.4 Power.</strong> Includes both rated power output and breaking capacity
              \u2014 every protective device must have a breaking capacity \u2265 prospective fault
              current at its point of installation per Reg 434.5.1.
              <strong> 512.1.5 Compatibility.</strong> The equipment must operate alongside other
              equipment without harmful interaction \u2014 RCD selectivity, AFDD compatibility,
              VFD-induced harmonics, busbar / DIN-rail mounting, manufacturer\u2019s assemblies.
              <strong> 512.1.6 Impulse withstand voltage (Uw).</strong> See Table 443.2 below.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <ConceptBlock
            title="Reg 512.1.6 and Table 443.2 \u2014 overvoltage categories I / II / III / IV"
            plainEnglish="Atmospheric and switching transients can drive thousands of volts onto an installation for microseconds. BS 7671 splits equipment into four overvoltage categories and sets a minimum impulse withstand voltage (Uw) for each."
            onSite="Sensitive electronic loads behind an SPD = CAT I, Uw 1.5 kV minimum. Sockets and appliances = CAT II, Uw 2.5 kV. The fixed installation itself \u2014 distribution boards, switchgear, fixed accessories = CAT III, Uw 4 kV. Origin equipment \u2014 service head, meter, main switch = CAT IV, Uw 6 kV. The categories rise toward the supply because impulse stress is highest at the origin and is progressively attenuated downstream."
          >
            <p>
              Reg 512.1.6 invokes Table 443.2 to set the minimum impulse withstand voltage Uw an
              equipment item must declare. The four categories map cleanly onto installation
              hierarchy: CAT IV is supply-origin equipment (closest to the network, exposed to the
              full atmospheric / switching transient envelope, minimum Uw 6 kV); CAT III is the
              installation distribution layer (DBs, switchgear, fixed accessories, minimum Uw 4 kV);
              CAT II is current-using equipment supplied from the fixed installation (sockets,
              appliances, minimum Uw 2.5 kV); CAT I is sensitive electronic equipment supplied from
              within an already-protected zone (typically behind an SPD, minimum Uw 1.5 kV). The
              hierarchy is non-arbitrary \u2014 it reflects how impulse energy attenuates through
              cable impedance and SPDs as it propagates from the supply into the installation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 \u00b7 Reg 512.1.6 / Table 443.2 \u2014 Overvoltage categories and minimum impulse withstand voltage Uw"
            clause="Equipment selected for installation shall have an impulse withstand voltage (Uw) not less than that specified in Table 443.2 for its overvoltage category. CAT I = 1.5 kV (sensitive electronic equipment fed from a protected supply), CAT II = 2.5 kV (current-using equipment supplied from the fixed installation), CAT III = 4 kV (the fixed installation itself \u2014 distribution boards, switchgear, fixed accessories), CAT IV = 6 kV (origin of the installation \u2014 service-cut-out side equipment)."
            meaning="A CAT II socket-outlet (Uw 2.5 kV) cannot be substituted for a CAT III distribution-board accessory (Uw 4 kV). A CAT III DB cannot be substituted for the CAT IV main-switch / meter assembly. The hierarchy is a one-way ratchet \u2014 you may use a higher-rated device where a lower one is required, never the reverse."
            cite="BS 7671:2018+A4:2026, Reg 512.1.6 / Table 443.2"
          />

          <InlineCheck {...inlineChecks[2]} />

          <ConceptBlock
            title="Reg 512.1.5 \u2014 compatibility, the clause that catches modern installs"
            plainEnglish="Compatibility means the equipment can operate alongside everything else in the installation without harmful interaction. Modern installs \u2014 LED drivers, EV chargers, heat-pump VFDs, PV inverters, AFDDs \u2014 stretch this clause harder than Reg 512.1.5 was originally written for."
            onSite="A 100 mA Type AC RCD upstream of an installation feeding LED drivers, an air-source heat pump and an EV charger may already be defeated by the smooth and pulsating DC residuals each load produces. Each piece of equipment is individually compliant; together they breach Reg 512.1.5 because the upstream device is blind to the residual-current shapes the downstream loads produce. Selectivity, RCD-type cascading, AFDD compatibility, harmonic distortion and busbar mechanical compatibility are all 512.1.5 territory."
          >
            <p>
              Reg 512.1.5 sits quietly behind the more eye-catching clauses but it is the one that
              catches modern installations most often. It requires that selected equipment shall not
              cause harmful effects on other equipment, nor impair the proper functioning of the
              supply, when properly connected and operated. In practice this maps to: RCD
              selectivity (a 30 mA downstream RCBO discriminating from a 100 mA upstream Type S RCD
              per manufacturer time-current curves, not just by sensitivity), RCD-type compatibility
              (Type AC blind to pulsating DC; Type A blind to smooth DC; Type B sees the lot but
              costs 4\u20135\u00d7), AFDD compatibility with the protected circuit\u2019s arc
              signature, VFD-induced harmonics within the limits of upstream switchgear and
              metering, busbar / DIN-rail mechanical compatibility within manufacturer\u2019s
              assemblies, and the EMC environment Reg 444 / Section 444 governs separately.
              \u2018All the parts work individually\u2019 is not the test \u2014 the test is whether
              they work together without harmful interaction.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Section 512.2 \u2014 external influences</ContentEyebrow>

          <ConceptBlock
            title="Reg 512.2.1 \u2014 selection per Reg 522 / Appendix 5 codes"
            plainEnglish="Equipment shall be suitable for the external influences \u2014 ambient temperature, humidity, water, dust, corrosion, impact, vibration, solar radiation, capability of persons \u2014 to which it is or may be exposed. The Reg 522 / Appendix 5 taxonomy is how you specify it."
            onSite="An outdoor garden room with damp concrete is dominated by AD codes (water \u2014 AD3 sprays / AD4 splashes), AB / AA (humidity / temperature), and BB (body resistance reduced by moisture). A standard IP2X indoor socket is non-compliant in this environment under 512.2.1. The right answer is IP44 minimum (often IP65), corrosion-resistant materials, and a careful look at heating to keep AB in range during winter."
          >
            <p>
              The Reg 522 / Appendix 5 taxonomy gives you a structured language for environment. AA
              is ambient temperature (AA1 = -60 to +5 \u00b0C through AA8 = +50 to +60 \u00b0C). AB
              is humidity. AD is water (AD1 negligible through AD8 immersion). AE is foreign solid
              bodies (dust). AF is corrosion. AG is mechanical impact (AG1 low, AG3 high \u2014 site
              / industrial). AH is vibration. AK / AL are flora / fauna. AN is solar radiation. BA
              is the capability of persons (BA1 ordinary through BA5 skilled, with BA2 children and
              BA3 disabled triggering specific requirements in special locations). BB is body
              resistance (reduced by moisture / wet skin). BC is contact with earth potential. BD is
              escape conditions. BE is nature of materials handled. On site, you typically have two
              or three dominant codes \u2014 a kitchen is AA / AB / AD3, a workshop is AG3 / AF /
              AE, a garden room is AD3 / BB / AB. Equipment IP / IK rating, material and orientation
              follow from the dominant codes.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>
            Manufacturer\u2019s installation instructions \u2014 a binding regulatory document
          </ContentEyebrow>

          <ConceptBlock
            title="Reg 510.3 / 134.1.1 \u2014 manufacturer\u2019s instructions are not optional"
            plainEnglish="The manufacturer\u2019s installation manual is a binding regulatory document. Reg 510.3 requires equipment selection in accordance with the manufacturer\u2019s instructions; Reg 134.1.1 requires initial verification per the same. Where the manufacturer is more restrictive than BS 7671, the manufacturer\u2019s document governs."
            onSite="An EV-charger manual specifying \u201830 mA Type A RCD upstream \u2014 Type AC not permitted\u2019 binds you to a Type A. Fitting a Type AC is a documented EICR fail mode AND voids the manufacturer\u2019s warranty AND breaks the equipment\u2019s declared conformity. The manual is not advisory \u2014 it is part of the regulatory chain."
          >
            <p>
              The interaction between BS 7671 and the manufacturer\u2019s instruction is asymmetric.
              Where the manufacturer is more restrictive (specific RCD type, tighter terminal
              torque, smaller maximum CPC size, mandatory bend radius, specific upstream device
              characteristics), the manufacturer\u2019s document governs \u2014 the equipment\u2019s
              declared conformity, its CE / UKCA basis and its warranty are all conditional on those
              instructions being followed. Where BS 7671 is more restrictive (e.g. a Part 7
              special-location requirement the manufacturer\u2019s instruction does not consider),
              BS 7671 governs. A genuine direct conflict is rare and is resolved as a designed
              departure under Reg 120.3 with documented justification, often by selecting different
              equipment. The phrase "the manual\u2019s only a guide" has no regulatory standing.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Section 513 \u2014 accessibility</ContentEyebrow>

          <ConceptBlock
            title="Reg 513.1 \u2014 operation, inspection, testing, fault-finding, maintenance and repair"
            plainEnglish="Equipment shall be installed so as to allow operation, inspection, testing, fault-finding, maintenance and repair. Sealed-in equipment that cannot be reached without destructive intervention fails Reg 513.1 \u2014 unless the equipment is genuinely maintenance-free for its installed life AND a defined replacement strategy is documented."
            onSite="Driver-in-ceiling LEDs comply where the driver is reachable through a hatch / removable tile, OR where the luminaire-plus-driver is replaced as a unit from below (integral driver, sealed luminaire). Driver buried behind permanent plasterboard with no access route fails 513.1 \u2014 and the connection inside the driver fails Reg 526.3 (inaccessible joint)."
          >
            <p>
              Reg 513.1 is a positive design requirement, not a default. Every piece of installed
              equipment must be reachable for the activities listed: operation (e.g. a switch you
              can actually reach), inspection (e.g. terminals you can see), testing (e.g. a place to
              apply test instrument leads), fault-finding (e.g. a way to locate a problem),
              maintenance (e.g. cleaning, lubrication, terminal re-tightening) and repair (e.g.
              replacement of a failed component). The clause is read together with Reg 526.3, which
              separately requires every connection / joint to be accessible for inspection, testing
              and maintenance \u2014 with a narrow set of exceptions for compound-filled, brazed /
              welded / soldered, or maintenance-free crimped joints in compliant accessories. A
              junction box behind sealed plasterboard fails both regulations.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating CE / UKCA as a substitute for Reg 511.1"
            whatHappens="Designer specifies a wholesaler-shelf accessory carrying a UKCA mark, assumes Reg 511.1 is therefore satisfied, and signs off the EIC. Six months later an EICR finds the accessory was built to a superseded edition of its installation standard \u2014 conformant for market access (UKCA) but non-compliant under Reg 511.1. Observation written, accessory replaced at the contractor\u2019s cost."
            doInstead="Treat UKCA / CE and Reg 511.1 as two independent gates. UKCA / CE answers \u2018may this product be placed on the market?\u2019. Reg 511.1 answers \u2018may this product be installed under BS 7671?\u2019. Both must be passed. Cross-check the declared standard edition against the BSI catalogue \u2014 supersedes are public information."
          />

          <CommonMistake
            title="Specifying a 32 A MCB on rated current alone"
            whatHappens="Designer picks a 32 A MCB because the load is 25 A and the cable is 4 mm\u00b2 \u2014 but doesn\u2019t check Icn / Icu against the calculated PSCC of 9 kA. Installed device is rated 6 kA breaking capacity. On a fault at the device\u2019s point of installation, the device cannot interrupt the prospective fault current \u2014 contact welding, arc-flash, possible enclosure rupture."
            doInstead="Reg 512.1 has SIX clauses, not one. Specify against all six: voltage (512.1.1), current (512.1.2), frequency (512.1.3), power / breaking capacity (512.1.4 \u2014 Icn or Icu \u2265 PSCC per Reg 434.5.1), compatibility (512.1.5), impulse withstand (512.1.6). \u2018Rated 32 A\u2019 is the start, not the end."
          />

          <CommonMistake
            title="Ignoring the manufacturer\u2019s installation manual"
            whatHappens="Installer fits an EV charger using \u2018standard practice\u2019 \u2014 Type AC RCD upstream, oversized CPC, tight cable bend behind the unit. The manual specified Type A, a 25 mm\u00b2 CPC maximum, and an 8\u00d7 OD bend radius. Each departure independently breaks Reg 510.3 / 134.1.1. The charger trips intermittently in service (smooth DC residual blinds the Type AC), the warranty is voided, and the EICR records a C2."
            doInstead="Read the manual before designing the install. Where the manufacturer is more restrictive than BS 7671, the manual governs. Bind the manual into the project record as installation-spec evidence \u2014 it is referenced on the EIC under Reg 134 and is part of what the next inspector reads on the EICR."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios \u2014 applying it on the day</ContentEyebrow>

          <Scenario
            title="Industrial DB replacement \u2014 PSCC and Uw under A4"
            situation="An industrial unit has a 100 kVA TN-S supply with a calculated PSCC at the main switchboard of 14 kA. The existing distribution board is rated 10 kA breaking capacity, declared to a superseded edition of BS EN 61439-3, with no declared Uw. A new DB is being specified for a refurbishment and is the origin equipment for the unit\u2019s sub-distribution."
            whatToDo="Apply both gates. (1) Reg 511.1: specify a DB declared to the current edition of BS EN 61439-3 with all BSI-declared amendments. (2) Reg 512.1.4 / 434.5.1: rated breaking capacity \u2265 PSCC \u2014 specify Icu \u2265 16 kA (one step above measured PSCC for margin). (3) Reg 512.1.6 / Table 443.2: as the unit\u2019s origin distribution equipment, CAT IV applies \u2014 minimum Uw 6 kV. The existing DB fails on all three counts and is being replaced under refurbishment scope, so the new equipment must be A4-compliant from day one."
            whyItMatters="Each of the three failures \u2014 superseded standard edition, undersized breaking capacity, missing Uw declaration \u2014 is independently grounds for an EICR observation. Together they make the DB indefensible against an enforcement-level inspection (HSE, insurer, post-incident investigator). The refurbishment is the compliant moment to fix all three; deferring any of them costs more later AND increases incident liability in the interim."
          />

          <Scenario
            title="Outdoor garden-room socket-outlet selection"
            situation="Customer wants two double socket-outlets fitted in a converted timber garden room. The room has a damp concrete floor (no DPM), single-glazed windows, no continuous heating, and the customer routinely uses an electric pressure washer outside the room. Walls are uninsulated; condensation is documented in winter."
            whatToDo="Map the environment to Reg 522 / Appendix 5 codes. Dominant codes: AD3\u2013AD4 (water sprays / splashes from the pressure washer drift), AB (humidity, condensation), AA (wide ambient temperature range \u2014 unheated), BB2\u2013BB3 (body resistance reduced by moisture and damp footwear), AF (corrosion potential from condensation on metal faceplates). Equipment selection: IP44 absolute minimum for the indoor sockets, IP65 if any external position; corrosion-resistant materials (avoid bare-steel mounting boxes); 30 mA RCD additional protection per Reg 411.3.3; consider supplementary heating to bring AB into range or relocate sockets to the dry warm wall. Reg 511.1 confirms each accessory is current-edition compliant."
            whyItMatters="Reg 512.2.1 makes equipment-environment matching a positive duty, not advisory. A standard IP2X indoor socket in this environment is non-compliant from day one and creates an EICR observation that is both easy to spot and easy to evidence. The Reg 522 / Appendix 5 mapping is the language the cert-form schedule of inspection expects \u2014 documenting it on the design upfront makes the cert defensible."
          />

          <SectionRule />

          <ContentEyebrow>Designer\u2019s quick reference</ContentEyebrow>

          <ConceptBlock
            title="Equipment selection \u2014 the eight-step checklist"
            plainEnglish="A defensible equipment-selection record covers eight points. (1) Standard. (2) Edition. (3) Voltage. (4) Current. (5) Frequency. (6) Power / breaking capacity. (7) Impulse withstand / overvoltage category. (8) External influences. Plus accessibility and the manufacturer\u2019s instruction reference."
            onSite="Write it before you order. Future inspectors, insurers and post-incident investigators read the record cold \u2014 it is the design log that demonstrates the duty under Reg 132.1 was discharged. \u2018Looked good in the catalogue\u2019 is not a record."
          >
            <p>
              <strong>1. Standard.</strong> Confirm the relevant British or Harmonized Standard for
              the equipment\u2019s intended use (Reg 511.1). <strong>2. Edition.</strong> Confirm
              the declared edition is current per BSI \u2014 supersedes are public.
              <strong> 3. Voltage.</strong> Rated voltage \u2265 system voltage including \u00b110 %
              excursions (Reg 512.1.1). <strong>4. Current.</strong> Rated current coordinated with
              cable Iz and load Ib per Reg 433.1.1; abnormal currents (inrush, fault) considered
              (Reg 512.1.2). <strong>5. Frequency.</strong> 50 Hz UK LV (Reg 512.1.3).{' '}
              <strong>6. Power / breaking capacity.</strong> Icn / Icu \u2265 PSCC at point of
              installation (Reg 512.1.4 / 434.5.1).{' '}
              <strong>7. Impulse withstand / overvoltage category.</strong> CAT I 1.5 kV / CAT II
              2.5 kV / CAT III 4 kV / CAT IV 6 kV per Table 443.2 (Reg 512.1.6).{' '}
              <strong>8. External influences.</strong>
              Reg 522 / Appendix 5 codes mapped to IP / IK / material selection (Reg 512.2.1). Plus:
              accessibility for operation, inspection, testing, maintenance, repair (Reg 513.1 /
              526.3); manufacturer\u2019s instruction referenced and bound into the project record
              (Reg 510.3 / 134.1.1).
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Two compulsory gates: Reg 511.1 (relevant British / Harmonized Standard at current BSI-declared edition) AND Reg 512.1 (suitability for THIS installation\u2019s voltage, current, frequency, power, compatibility, impulse withstand). Both must be passed.',
              'Reg 511.2 is the bespoke / out-of-standard route \u2014 designer\u2019s equivalent-safety confirmation, Reg 120.3 designed-departure on the EIC, evidence retained as project record.',
              'CE / UKCA \u2260 Reg 511.1. CE / UKCA = market-access declaration (supply-side regulations). Reg 511.1 = installation-side standard conformity. Independent regimes, both required.',
              'Table 443.2 sets minimum impulse withstand voltage Uw by overvoltage category: CAT I 1.5 kV / CAT II 2.5 kV / CAT III 4 kV / CAT IV 6 kV. The hierarchy mirrors installation depth from the supply origin.',
              'Manufacturer\u2019s installation instructions are binding under Reg 510.3 / 134.1.1. Where they are more restrictive than BS 7671 they govern. Departing from them voids declared conformity and creates EICR observations.',
              'Reg 513.1 / 526.3 \u2014 accessibility for operation, inspection, testing, maintenance, repair (including connections / joints) is a positive design requirement, not an afterthought.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Cable types, sizing, grouping and routing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module5Section1;
