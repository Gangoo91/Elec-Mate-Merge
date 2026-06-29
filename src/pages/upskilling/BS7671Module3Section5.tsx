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
    id: 'm3s5-met-purpose',
    question:
      'A customer asks why their consumer-unit installer fitted a separate brass strip with several green-and-yellow conductors landed on it, mounted next to the main switch. What is it and what is its job?',
    options: [
      'A neutral bar — every neutral terminates there before the main switch',
      'The Main Earthing Terminal (MET) — the single equipotential reference point',
      'A spare DIN-rail accessory left over from the installation, purely cosmetic',
      'A bonding conductor splice block, optional under BS 7671 rules',
    ],
    correctIndex: 1,
    explanation:
      'Reg 542.4.1 requires a Main Earthing Terminal at every installation. The MET is the single, accessible junction where the earthing conductor, every CPC, every main protective bonding conductor and any functional earth all terminate. It is the equipotential reference for the whole installation — without it the bonding scheme is fragmented and Reg 411.3.1.2 cannot be demonstrated.',
  },
  {
    id: 'm3s5-cpc-sizing-table',
    question:
      'You are wiring a 32 A radial in 6 mm² T&E (twin and earth). Without using the adiabatic equation, what minimum CPC cross-sectional area does Table 54.7 give you?',
    options: [
      '1.5 mm² — half the line conductor for sizes up to 16 mm²',
      '2.5 mm² — Table 54.7 gives a 6 mm² line a 2.5 mm² CPC',
      '6 mm² — the CPC must always equal the line conductor',
      '4 mm² — the adiabatic equation minimum for this circuit',
    ],
    correctIndex: 1,
    explanation:
      'Reg 543.1.1 lets you size a CPC either by calculation (the adiabatic equation, Reg 543.1.3) or by selection from Table 54.7. Table 54.7 gives: line up to and including 16 mm² → CPC equal to the line, EXCEPT a 6 mm² line gets a 2.5 mm² CPC where the same material is used and the CPC is incorporated in the cable sheath. Standard 6 mm² T&E is supplied with a 2.5 mm² CPC for exactly this reason.',
  },
  {
    id: 'm3s5-main-bonding-pme',
    question:
      'You are upgrading the main protective bonding on a domestic property fed from a TN-C-S (PME) supply. The line conductor at the cut-out is 25 mm². What is the minimum cross-sectional area for the bonding to gas and water?',
    options: [
      '6 mm² — the general domestic bonding minimum',
      '10 mm² — Table 54.8 PME minimum where the neutral is up to 35 mm²',
      '16 mm² — always 16 mm² for PME, regardless of line size',
      '4 mm² — only the earthing conductor is upsized for PME',
    ],
    correctIndex: 1,
    explanation:
      'Reg 544.1.2 (formerly the PME annex of 544.1.1) gives the PME minimum bonding sizes in Table 54.8. The bonding conductor must be sized against the supply neutral conductor (because in TN-C-S the PEN carries fault current), with a floor of 10 mm² where the supply neutral is up to 35 mm², 16 mm² where 35–50 mm², and so on up to 50 mm². Standard TN-S has a different sizing rule under Reg 544.1.1 where 6 mm² may suffice — never assume domestic = 10 mm² without checking the system earthing.',
  },
  {
    id: 'm3s5-tt-electrode',
    question:
      'A new agricultural building is on a TT supply. The DNO has confirmed no PE is provided. Which earth electrode arrangement is most appropriate for a low and stable Ra?',
    options: [
      'A single 1.2 m driven copper-clad steel rod inside the building',
      'A network of two or more rods spaced their length apart, with seasonal retest',
      'A buried solid copper plate of at least 0.5 m² inside the building',
      'A connection to the rebar of the concrete floor slab only',
    ],
    correctIndex: 1,
    explanation:
      'Reg 542.2.1 lists permitted electrode types — driven rods (most common), pipes, buried tape/wire, plates, foundation earth electrodes (Ufer) and structural steel reinforcement of buildings. For TT, getting Ra low enough to satisfy Ra × IΔn ≤ 50 V (Reg 411.5.3) usually means a multi-rod network spaced at least their depth apart so the resistance areas do not overlap. Soil is also seasonal — Reg 542.2.4 requires Ra to be reassessed for soil dryout / freezing where the design is marginal.',
  },
  {
    id: 'm3s5-supplementary-bonding',
    question:
      'You are inspecting a domestic bathroom. Every circuit in the location has 30 mA RCD protection, all circuits meet their disconnection time, and the main protective bonding to the gas and water at the MET is sound. What does Reg 701.415.2 / Reg 415.2 tell you about supplementary bonding inside the bathroom?',
    options: [
      'Always required — a bathroom always needs supplementary bonding, no exceptions',
      'May be omitted where all three Reg 701.415.2 conditions are met',
      'Required only on the metallic bath taps within the location',
      'Optional in every case — supplementary bonding is now obsolete',
    ],
    correctIndex: 1,
    explanation:
      'Reg 701.415.2 lets you omit supplementary equipotential bonding inside a location containing a bath or shower ONLY if all three conditions hold: (a) every circuit in the location meets its disconnection time per Reg 411.3.2, (b) every circuit has 30 mA RCD additional protection (Reg 415.1.1), AND (c) all extraneous-conductive-parts of the location are effectively connected to the MET by main protective bonding. Miss any one — supplementary bonding goes back in, sized per Reg 415.2.1.',
  },
  {
    id: 'm3s5-extraneous-test',
    question:
      'How do you decide whether a metal pipe inside a property is an extraneous-conductive-part that needs main bonding under Reg 411.3.1.2 / 544.1.1?',
    options: [
      'Bond every metal pipe in the building — better safe than sorry',
      'Measure resistance to true earth: ≥ 22 kΩ means not extraneous, no bond',
      'Visually inspect — if it looks like steel pipe, bond it anyway',
      'Test only for continuity back to the consumer unit earth bar',
    ],
    correctIndex: 1,
    explanation:
      'GN8 (Earthing & Bonding) gives the long-standing test: measure resistance to the MET (or true earth). If ≥ 22 kΩ on a 500 V insulation test, the part cannot introduce a dangerous potential and is NOT extraneous — no main bonding required. Below 22 kΩ, the part can introduce earth potential and IS extraneous — Reg 411.3.1.2 + 544.1.1 require main protective bonding to the MET. Plastic incomers (MDPE gas, blue MDPE water) usually mean the internal copper pipework is no longer extraneous, but only after the test confirms it.',
  },
  {
    id: 'm3s5-earthing-conductor',
    question:
      'What is the minimum cross-sectional area for the earthing conductor on a TN-C-S (PME) installation with an 80 A 25 mm² supply neutral, where the conductor IS protected against mechanical damage but NOT against corrosion?',
    options: [
      '4 mm² — the copper minimum where unprotected against corrosion only',
      '16 mm² — the PME floor where the supply neutral is 35–50 mm²',
      '10 mm² — the PME floor where the supply neutral is up to 35 mm²',
      '25 mm² — the earthing conductor always equals the line conductor',
    ],
    correctIndex: 2,
    explanation:
      'Reg 542.3.1 sizes the earthing conductor by either calculation (Reg 543.1.1 + adiabatic) or selection from Table 54.1 — minimum 6 mm² copper where buried and protected against corrosion but not mechanical damage, 16 mm² where unprotected against both. The PME overlay (Reg 544.1.2) lifts the floor: 10 mm² where supply neutral ≤ 35 mm², 16 mm² where 35–50 mm², 25 mm² where above 50 mm². 25 mm² supply neutral → 10 mm² is the answer.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 411.3.1.2 says "where protective equipotential bonding is required, main protective bonding conductors complying with Chapter 54 shall connect…" — which of these does it NOT include in the list of parts to bond?',
    options: [
      'Water installation pipes',
      'Gas installation pipes',
      'Other installation pipework and ducting',
      'Plastic-bodied luminaires with no exposed-conductive-part',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 411.3.1.2 lists the parts requiring main protective bonding to the MET: water installation pipes, gas installation pipes, other installation pipework and ducting, central heating and air-conditioning systems, exposed metallic structural parts of the building, and lightning protection systems where required by BS EN 62305. Plastic-bodied luminaires with no exposed-conductive-part are NOT extraneous-conductive-parts (no path to introduce earth potential) and are NOT bonded — Reg 411.3.1.1 second sentence (lampholder exception) covers the equivalent CPC point.',
  },
  {
    id: 2,
    question:
      'A circuit is wired in 4 mm² line / 4 mm² CPC singles. Fault current at the fault point = 2.3 kA. Pre-arc let-through (k²t) of the upstream BS EN 60898 Type B 32 A MCB = 13 000 A²s. The cable k value (XLPE/copper) is 143. By the adiabatic equation S ≥ √(I²t)/k, is the 4 mm² CPC adequate?',
    options: [
      'Yes — calculated minimum √13000 / 143 ≈ 0.80 mm², well below 4 mm²',
      'Yes — by inspection, 4 mm² is always adequate on any circuit up to 32 A',
      'No — the calculation shows 4 mm² is undersized; uplift to 6 mm²',
      'Cannot be determined without first knowing the circuit Zs',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 543.1.3 / Reg 543.1.4 gives the adiabatic equation S = √(I²t) / k, where I²t is the let-through energy of the protective device for the prospective fault current and k is the conductor material constant from Table 54.2 / 54.3 / 54.4. Plug in: √13000 / 143 = 113.6 / 143 ≈ 0.79 mm². The selected 4 mm² is a long way clear of the calculated minimum. The adiabatic test is mandatory whenever you are NOT using Table 54.7 selection.',
  },
  {
    id: 3,
    question:
      'You are designing a TN-S installation with a 100 A main fuse and 25 mm² line conductor. The earthing conductor will be tin-coated copper, run inside conduit (mechanical protection), buried in the ground. By Reg 542.3.1 / Table 54.1, what minimum cross-sectional area is required?',
    options: [
      '6 mm² — protected against corrosion but not mechanical damage',
      '16 mm² — protected against neither',
      '2.5 mm² — protected against both, with mechanical protection',
      '25 mm² — always equal to the line conductor on TN-S',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 542.3.1 directs you to Table 54.1 for buried earthing conductor minimums. Where the conductor is protected against corrosion (tin-coated, lead-sheathed, in PVC conduit) AND mechanical damage (in conduit, ducted, or armoured), the minimum copper CSA is 2.5 mm². Where protected against corrosion only, 6 mm² copper. Where protected against neither, 16 mm² copper / 25 mm² coated steel (or 50 mm² uncoated). The PME overlay in Reg 544.1.2 separately sets a higher floor on TN-C-S — but on TN-S the table values stand. Note: Table 54.1 minimums always apply; Reg 543.1.1 by adiabatic may demand more.',
  },
  {
    id: 4,
    question:
      'An installer fits a separate 100 A consumer-unit MET on a domestic property fed from a TN-C-S (PME) supply with a 25 mm² supply neutral. They run a 6 mm² main bonding conductor to gas and a 6 mm² main bonding conductor to water. What is the BS 7671 issue?',
    options: [
      'No issue — 6 mm² is the accepted domestic bonding minimum',
      'Reg 544.1.2 (PME): 10 mm² minimum here — 6 mm² is undersized, typically C2',
      '6 mm² is fine to the gas but 10 mm² is required to the water only',
      'Bonding is not required at all where main switching is provided',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 544.1.2 sets PME bonding minimums in Table 54.8: supply neutral up to 35 mm² → 10 mm² bonding minimum; 35 < neutral ≤ 50 → 16 mm²; above 50 → 25 mm². The reason is that on TN-C-S the PEN can carry fault current; under-sizing bonding leaves bonded extraneous parts at elevated potential during a PEN fault. EICR coding: C2 because the under-sized bonding represents a potentially dangerous condition under fault, particularly given the PME open-PEN failure mode.',
  },
  {
    id: 5,
    question:
      'Which of these test results would tell you to install main protective bonding to a steel structural pillar inside a workshop?',
    options: [
      'Insulation resistance from pillar to MET = 50 kΩ at 500 V (above threshold)',
      'Continuity from pillar to the nearest socket-outlet earth = 0.05 Ω',
      'A visible weld to a CPC, with no measurement taken at all',
      'Insulation resistance from pillar to MET = 8 kΩ at 500 V (below 22 kΩ)',
    ],
    correctAnswer: 3,
    explanation:
      'GN8 (Guidance Note 8 — Earthing & Bonding, IET) makes this objective: a metal part is extraneous if its resistance to true earth (or to the MET) is below approximately 22 kΩ at 500 V. Above that threshold the part cannot introduce a dangerous potential; below it, it can — and Reg 411.3.1.2 + Reg 544.1.1 require main protective bonding sized per Table 54.8 (PME) or 6 mm² minimum on TN-S. Continuity to a socket earth tells you nothing about whether the part is extraneous.',
  },
  {
    id: 6,
    question:
      'A 32 A TT final circuit feeds a metal-enclosed pump motor. The earth-electrode resistance is measured Ra = 80 Ω. Which device choice satisfies Reg 411.5.3 (Ra × IΔn ≤ 50 V) for ADS within 0.4 s?',
    options: [
      'A 100 mA general-type RCD: 80 × 0.1 = 8 V ≤ 50 V — passes the formula',
      'A 30 mA RCD: 80 × 0.03 = 2.4 V ≤ 50 V — passes and meets 0.4 s',
      'A 300 mA RCD only: 80 × 0.3 = 24 V ≤ 50 V — passes the formula',
      'A 32 A Type B MCB alone: at Ra = 80 Ω cannot clear within 0.4 s',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.5.3 formula gives a TOUCH-VOLTAGE limit (Ra × IΔn ≤ 50 V): every option in the list satisfies this. But Reg 411.5.3 also requires the disconnection time per Reg 411.3.2 — which on a final circuit ≤ 32 A is 0.4 s. A 30 mA RCD on a TT final circuit will operate at IΔn within 300 ms and at 5 IΔn within 40 ms — comfortably under 0.4 s. A 100 mA general-type may be marginal. A Type B MCB on its own at Ra = 80 Ω cannot deliver ADS — the formula gives Ia ≈ 230 / 80 = 2.9 A, well below the 32 A MCB instantaneous trip range. Reg 411.5.4 (TT with OPD only) is reserved for very low Ra.',
  },
  {
    id: 7,
    question:
      'For supplementary equipotential bonding (Reg 415.2.1) connecting two exposed-conductive-parts together, what is the minimum cross-sectional area where the conductor is NOT mechanically protected and is sheathed copper?',
    options: [
      '4 mm² where unprotected (2.5 mm² where protected) — Reg 544.2',
      '1.5 mm² — the general domestic minimum for bonding',
      '6 mm² — always equal to the main bonding conductor',
      '10 mm² — always equal to the PME main bonding size',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 415.2.1 directs you to Reg 544.2 for the supplementary bonding cross-sectional area. The floor is 2.5 mm² copper where mechanical protection is provided, 4 mm² copper where it is not. The conductor must connect either two exposed-conductive-parts, two extraneous-conductive-parts, or an exposed-conductive-part to an extraneous-conductive-part. Continuity to the MET is verified post-install: R must be such that R ≤ 50 V / Ia.',
  },
  {
    id: 8,
    question:
      'An EICR identifies that the existing earthing conductor on a 1980s domestic TN-C-S property is 6 mm² copper, the supply neutral is 25 mm². Reg 544.1.2 requires 10 mm² minimum for bonding on PME, and Reg 542.3.1 + Reg 544.1.2 likewise size the earthing conductor. What is the correct EICR observation?',
    options: [
      'No code — historical compliance at time of install is fine',
      'C3 (improvement recommended) — a deviation, recommend uplift to 10 mm²',
      'C2 (potentially dangerous) — may not survive a PEN fault current',
      'C1 (danger present) — disconnect the installation immediately',
    ],
    correctAnswer: 2,
    explanation:
      'EICR coding (GN3 / Best Practice Guide BPG4) takes a risk-based view. An under-sized earthing conductor on TN-C-S is potentially dangerous under fault: a PEN failure can drive substantial current into the earthing conductor, and an under-sized conductor may fail before the OPD clears, leaving the MET disconnected mid-fault. Common practice is C2. C3 would suggest the install is "safe enough but suboptimal" — that mis-states the risk on PME. The remedial is straightforward: replace with 10 mm² (or larger if the supply neutral exceeds 35 mm²).',
  },
];

const faqItems = [
  {
    question:
      "Why does Table 54.7 give a 2.5 mm² CPC for a 6 mm² line conductor — isn't that smaller than the line?",
    answer:
      'Table 54.7 is one of two routes for sizing a CPC under Reg 543.1.1; the other is the adiabatic equation in Reg 543.1.3. The 6 mm² → 2.5 mm² entry recognises that 6 mm² T&E is supplied with a 2.5 mm² CPC integrated in the sheath, AND that the adiabatic equation will pass for the typical UK 32 A MCB / 40 A MCB protective device upstream of a 6 mm² circuit. If the protective device let-through is unusually high, or the cable construction differs, you must run the adiabatic — never assume Table 54.7 covers every case.',
  },
  {
    question: 'What is the difference between a CPC and an earthing conductor?',
    answer:
      'A circuit protective conductor (CPC) connects exposed-conductive-parts of equipment back to the MET — typically the green/yellow core in T&E. The earthing conductor connects the MET to the means of earthing (DNO PE on TN-S or TN-C-S, the earth electrode on TT). Reg 543 covers CPCs; Reg 542 covers earthing arrangements as a whole. They are sized differently: CPCs by Reg 543.1 (Table 54.7 or adiabatic), earthing conductors by Reg 542.3.1 (Table 54.1) plus the PME overlay in Reg 544.1.2.',
  },
  {
    question: 'When is bonding to structural steel actually required?',
    answer:
      'Reg 411.3.1.2 lists exposed metallic structural parts of the building as a class of extraneous-conductive-part to be main bonded — but only where they can introduce a dangerous earth potential. A short steel beam fully embedded in concrete with no continuous metallic path to true earth is NOT extraneous and need not be bonded. A steel-frame building with continuous metal-to-ground paths (steel piles, steel columns to foundations) IS extraneous and must be main bonded. The 22 kΩ-to-MET test from GN8 settles ambiguous cases.',
  },
  {
    question: 'How do I size the main protective bonding conductor on a 200 A three-phase supply?',
    answer:
      'On TN-S (Reg 544.1.1) the bonding conductor is sized at half the cross-sectional area of the earthing conductor of the installation, with 6 mm² floor and 25 mm² ceiling. On TN-C-S/PME (Reg 544.1.2 / Table 54.8) it is sized against the supply neutral: neutral ≤ 35 mm² → 10 mm²; 35–50 → 16 mm²; 50–95 → 25 mm²; 95–150 → 35 mm²; above 150 → 50 mm². For your 200 A three-phase: check the DNO neutral CSA at the cut-out (typically 95 mm² or 120 mm²) and apply the table — 25 mm² or 35 mm² typically.',
  },
  {
    question: 'Can I use the structural steel of a building as the earthing conductor?',
    answer:
      'Reg 542.2.1 lists structural metalwork of buildings (Ufer / foundation electrodes) as a permitted earth electrode where reliably and continuously connected. But the EARTHING CONDUCTOR — the dedicated conductor from MET to means of earthing — must still be a separate, identifiable green/yellow conductor sized per Table 54.1. Using the steel as both the electrode AND the earthing conductor breaks the verifiability requirement: future maintenance cannot test the earthing conductor in isolation if it IS the building.',
  },
  {
    question: 'How often does a TT earth electrode resistance (Ra) need re-testing?',
    answer:
      'Reg 542.2.4 requires Ra to be sufficiently low and stable to maintain ADS over the seasonal range — soil dries out in summer and freezes in winter, and Ra rises in both. There is no fixed re-test interval in BS 7671, but EICR practice (BPG4) recommends Ra be re-measured at every periodic inspection, with annual checks where the design margin is small (Ra near the 1666 Ω 30 mA limit, agricultural sites, sites with seasonal dryout). RCD operation must also be verified at IΔn and 5 IΔn at every test.',
  },
  {
    question: 'What is the difference between functional earthing and protective earthing?',
    answer:
      'Protective earthing is the safety connection — exposed-conductive-parts to the MET via a CPC, providing the fault path for ADS (Reg 411.3.1.1). Functional earthing is for equipment operation — EMC shielding, control-system reference, transformer screens — and has nothing to do with shock protection. Reg 542.4.2 allows functional earth conductors at the MET but they MUST be identified separately and must not compromise the protective earthing function. A control-system FE that is also load-bearing for safety is a design fault.',
  },
  {
    question:
      'Is the supplementary bonding test still required where Reg 701.415.2 lets you omit supplementary bonding?',
    answer:
      'No — if you have legitimately omitted supplementary bonding under Reg 701.415.2, there is nothing to test for resistance R ≤ 50 V / Ia within the location, because there are no supplementary bonding conductors to test. What you DO still test in the bathroom: continuity of the CPC to every accessory (Reg 643.2.1), insulation resistance, polarity, RCD operating times for every circuit serving the location at IΔn and 5 IΔn, and main protective bonding continuity to the MET from gas and water entry points. The cert schedule of inspection should record "supplementary bonding omitted under 701.415.2" against the relevant location.',
  },
  {
    question: 'Why does Reg 411.3.1.1 single out the lampholder exception?',
    answer:
      'The original BS 7671 default is "a CPC at every point in wiring and at every accessory". The lampholder carve-out exists because a pendant lampholder with no exposed-conductive-part (a Bakelite or all-plastic body) presents no surface that could become live in a fault — there is literally nothing to bond. The carve-out is narrow: replace the pendant with a metal-bodied luminaire, a downlight, a metal-track system or a Class I light fitting, and the CPC requirement bites again. Modern installs nearly always have metal-bodied luminaires somewhere on the circuit, so the practical default is run a CPC to every point regardless.',
  },
];

const BS7671Module3Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Earthing Arrangements & Protective Conductors | BS 7671:2018+A4:2026 | Module 3.5',
    description:
      'Chapter 54 in practice — Main Earthing Terminal, CPC sizing (Table 54.7 + adiabatic), main protective bonding (Reg 544.1.1, Table 54.8), earthing conductors (Reg 542, Table 54.1), TT electrodes and supplementary bonding (Reg 415.2.1).',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Updated for A4:2026"
            title="Earthing arrangements and protective measures selection"
            description="Chapter 54 in practice. Main Earthing Terminal, CPC sizing by Table 54.7 vs adiabatic, main protective bonding under Reg 544.1.1 + the PME overlay in 544.1.2, earthing-conductor minimums per Table 54.1, electrode design for TT, and how supplementary equipotential bonding (Reg 415.2.1) ties it all together when ADS alone cannot deliver."
            actions={
              <>
                <RegBadge>411.3.1.1</RegBadge>
                <RegBadge>542.1.1</RegBadge>
                <RegBadge>543.1.1</RegBadge>
                <RegBadge>544.1.1</RegBadge>
                <AmendmentBadge regs={['544.1.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'The Main Earthing Terminal (Reg 542.4.1) is the single equipotential reference for the installation — every CPC, the earthing conductor, every main protective bonding conductor and any functional earth land here.',
              'CPCs are sized either by selection (Table 54.7) or by calculation (Reg 543.1.3 adiabatic). Main bonding follows Reg 544.1.1 on TN-S; on TN-C-S the higher PME minimums in Reg 544.1.2 / Table 54.8 apply.',
              'Earthing-conductor minimums come from Reg 542.3.1 / Table 54.1, then lifted by the PME overlay (Reg 544.1.2) where the system is TN-C-S. TT installations need an electrode — usually multi-rod — sized for Ra × IΔn ≤ 50 V (Reg 411.5.3).',
              'Supplementary equipotential bonding (Reg 415.2.1 / 544.2) is the fall-back where ADS cannot be guaranteed to deliver disconnection time alone, or where Reg 701.415.2 conditions for omission are not all met.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the Main Earthing Terminal and list every conductor that should land on it (Reg 542.4.1, 411.3.1.2).',
              'Size a CPC two ways — Table 54.7 selection and the adiabatic equation in Reg 543.1.3 — and explain when each is mandatory.',
              'Apply Table 54.8 (Reg 544.1.2) PME bonding minimums against the supply-neutral cross-sectional area and contrast with the TN-S rule in Reg 544.1.1.',
              'Size an earthing conductor by Reg 542.3.1 / Table 54.1 and lift the value where the system is TN-C-S per the PME overlay.',
              'Choose an earth electrode arrangement for a TT installation that satisfies Reg 411.5.3 (Ra × IΔn ≤ 50 V) and Reg 542.2.4 seasonal stability.',
              'Apply Reg 415.2.1 supplementary equipotential bonding and recognise the three-condition omission test for bathrooms in Reg 701.415.2.',
              'Use the GN8 22 kΩ test to decide whether a metal part is an extraneous-conductive-part requiring main protective bonding.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The Main Earthing Terminal — the spine of Chapter 54</ContentEyebrow>

          <ConceptBlock
            title="What the MET actually is, and why it sits where it sits"
            plainEnglish="The MET is a single accessible bar — usually brass — where every conductor that has any earth function in the whole installation lands. It is the equipotential reference point: every CPC, the earthing conductor, every main protective bonding conductor and any functional earth all meet here."
            onSite="On a domestic install you will see the MET as the brass bar inside or beside the consumer unit, with the green/yellow earthing conductor going one way (to the cut-out tail or the earth electrode), the main bonding going to the gas / water meter, and the consumer-unit earth bar bridge taking every CPC. If those lands are scattered across multiple terminals you do not have an MET — you have a fault."
          >
            <p>
              Reg 542.4.1 requires every installation to have an MET. The MET completes the
              equipotential bonding scheme of Reg 411.3.1.2: with every earth function on a single
              point, a fault that drives the MET potential up drives every CPC-connected exposed
              metal part and every bonded extraneous-conductive-part up TOGETHER — the touch voltage
              between them stays low. Take the MET away (or split the lands across isolated bars)
              and the assumption fails — you can be standing on one earth and touching another, with
              the fault voltage between them.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.1.1 — Protective earthing"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point."
            meaning="A CPC at every point and every accessory is the legal default. The lampholder exception is narrow — a pendant with no exposed metal. Replace the pendant with a metal-bodied luminaire or downlight and the CPC must be present and connected. 'Simultaneously accessible' parts must share an earthing system: never bond Class I exposed metal to two different earths within touch reach."
            cite="BS 7671:2018+A4:2026, Reg 411.3.1.1"
          />

          <SectionRule />

          <ContentEyebrow>Sizing the CPC — Table 54.7 vs the adiabatic equation</ContentEyebrow>

          <ConceptBlock
            title="Two routes — which is mandatory when?"
            plainEnglish="Reg 543.1.1 lets you size a CPC two ways: pick a value from Table 54.7 (a quick lookup based on the line conductor CSA) OR run the adiabatic equation S = √(I²t) / k from Reg 543.1.3. The adiabatic gives a more efficient answer; the table gives a safe upper bound for typical UK protection."
            onSite="Use Table 54.7 by default for ordinary T&E circuits — it is what cable manufacturers design 6 mm² (with 2.5 mm² CPC) and 10 mm² (with 4 mm² CPC) sheath compositions around. Run the adiabatic when the upstream protective device let-through is unusually high (e.g. fault current > 10 kA, big fuses, motor starters), when the cable construction is unusual (singles in conduit with separate bare CPC), or when you need to justify a smaller CPC on cost or thermal grounds."
          >
            <p>
              Table 54.7 abstract: line up to and including 16 mm² → CPC equal to the line, EXCEPT a
              6 mm² line takes a 2.5 mm² CPC and a 10 mm² line takes a 4 mm² CPC where the same
              material is used and the CPC is incorporated in the cable sheath. Above 16 mm² and up
              to 35 mm² → CPC is 16 mm². Above 35 mm² → CPC is half the line CSA. The adiabatic
              equation, by contrast, computes the smallest CPC that survives the fault thermally:
              S(min) = √(I²t) / k, where I²t is the let-through energy of the upstream device for
              the prospective fault current at the fault point, and k comes from Tables 54.2 / 54.3
              / 54.4 (k = 143 for XLPE/copper with 90 °C insulation, k = 115 for PVC/copper at 70 °C
              in T&E, k = 76 for copper conductor in steel conduit).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 543.1.1 — Cross-sectional area"
            clause="The cross-sectional area of every protective conductor, other than a protective bonding conductor, shall be either calculated in accordance with Regulation 543.1.3 or selected in accordance with Regulation 543.1.4 [Table 54.7]. In both cases, the requirements of Regulation 543.1.2 [minimum size for mechanical and corrosion-protection considerations] shall be taken into account. The cross-sectional area, where calculated, shall be not less than the value determined by the formula or, where applicable, by reference to BS EN 60909-0."
            meaning="Either route is permitted; Reg 543.1.2 imposes a floor regardless. For typical UK domestic and small-commercial installs, Table 54.7 (Reg 543.1.4) is the default. The adiabatic (Reg 543.1.3) is required where the table answer is implausible — high prospective fault current, unusual cable construction, separately-run CPC."
            cite="BS 7671:2018+A4:2026, Reg 543.1.1"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Main protective bonding — Reg 544.1.1 and the PME overlay</ContentEyebrow>

          <ConceptBlock
            title="TN-S vs TN-C-S — completely different bonding minimums"
            plainEnglish="On TN-S the supply provides a separate PE conductor and the bonding is sized against the earthing conductor (Reg 544.1.1, half its CSA, 6 mm² floor, 25 mm² ceiling). On TN-C-S (PME) the supply provides a combined PEN that can carry fault current; the bonding is sized against the supply NEUTRAL (Reg 544.1.2 / Table 54.8) with a 10 mm² floor."
            onSite="Domestic UK supplies are overwhelmingly TN-C-S (PME) in 2026. The supply neutral at the cut-out is typically 25 mm² for a 100 A single-phase service — bonding to gas and water = 10 mm² minimum. A modern 200 A three-phase service might have a 95 mm² neutral — bonding minimum jumps to 25 mm². Always check the tail size at the cut-out and apply Table 54.8."
          >
            <p>
              Reg 544.1.1 (general TN-S rule): the main protective bonding conductor cross-sectional
              area is at least half the cross-sectional area required for the earthing conductor of
              the installation, subject to a minimum of 6 mm² (or 16 mm² aluminium). The maximum
              required by this regulation is 25 mm² copper (or 35 mm² aluminium) — beyond that, no
              further increase is required even for very large supplies. Reg 544.1.2 then overlays
              Table 54.8 on TN-C-S, lifting the minimum to 10 mm² where the supply neutral is up to
              35 mm², 16 mm² where 35–50 mm², 25 mm² where 50–95 mm², 35 mm² where 95–150 mm² and 50
              mm² where above 150 mm².
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 544.1.1 — Main protective bonding conductors"
            clause="A main protective bonding conductor shall comply with Section 543, except that its cross-sectional area shall be not less than half that required for the earthing conductor of the installation, subject to a minimum of 6 mm² (or 16 mm² for aluminium). The cross-sectional area need not exceed 25 mm² for copper, or its equivalent in conductance for other metals."
            meaning="On TN-S the rule is half-the-earthing-conductor with 6 mm² floor and 25 mm² ceiling. On TN-C-S add the Reg 544.1.2 / Table 54.8 minimums, which are higher because the PEN can carry fault current. Always apply both rules and use the larger value."
            cite="BS 7671:2018+A4:2026, Reg 544.1.1"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>
            Earthing conductor — sizing, materials, mechanical protection
          </ContentEyebrow>

          <ConceptBlock
            title="Reg 542.3.1, Table 54.1 and the PME lift"
            plainEnglish="The earthing conductor connects the MET to the means of earthing. Reg 542.3.1 sizes it via Reg 543.1.1 (so either Table 54.7 selection or the adiabatic), plus a Table 54.1 minimum where the conductor is buried, plus the PME overlay where the system is TN-C-S."
            onSite="Above ground and inside the consumer-unit cupboard, an earthing conductor on a 100 A domestic TN-C-S supply is typically 16 mm² copper green/yellow (PME-overlay applies). Where buried, Table 54.1 imposes mechanical / corrosion protection minimums: 2.5 mm² protected against both, 6 mm² protected against corrosion only, 16 mm² unprotected against either. Almost always you bury the conductor inside conduit or duct — that gives you mechanical protection — and Table 54.1 then drops to the lower numbers."
          >
            <p>
              The full sizing process: (1) Compute the adiabatic minimum for the upstream protective
              device let-through (Reg 543.1.3). (2) Look up Table 54.1 minimum based on whether the
              conductor is buried, mechanically protected and corrosion protected. (3) Where the
              system is TN-C-S, lift the value to the Table 54.8 floor sized against the supply
              neutral CSA (Reg 544.1.2). The earthing conductor must equal or exceed all three. In
              practice the PME overlay almost always wins on UK domestic, giving you a clean rule of
              thumb: 100 A single-phase TN-C-S → 16 mm² copper earthing conductor; 200 A three-phase
              TN-C-S with 95 mm² neutral → 25 mm² copper; check the cut-out.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Material and termination — copper vs aluminium vs hot-dip galvanised steel"
            plainEnglish="Copper is the default for UK earthing conductors and bonding. Aluminium is permitted at larger sizes — 16 mm² aluminium minimum for main bonding (Reg 544.1.1) — but is rare domestically. Hot-dip galvanised steel structural members are permitted as natural earth electrodes (Reg 542.2.1) but not as the dedicated earthing conductor."
            onSite="Termination matters as much as size. Reg 526.3 requires every joint to be accessible for inspection and testing — the earthing-conductor connection at the MET, at the means of earthing, and any in-line splice all have to be inspectable, mechanically sound, electrically continuous and corrosion-protected. A buried earth-rod connection is usually finished with a labelled inspection chamber so future testers can lift the lid, measure Ra, and check the conductor."
          >
            <p>
              Where dissimilar metals must be joined (copper bonding to a galvanised steel
              structural member, or copper to an aluminium tail), use a bimetallic connector or a
              lug system designed for the pair — direct copper-to-aluminium contact corrodes
              galvanically and the joint resistance climbs over time. Reg 526.2 requires every
              connection to be electrically continuous and mechanically sound for the life of the
              installation; a corroded earth-rod clamp inside an unsealed inspection chamber is the
              single most common cause of TT-supply Ra drift in EICRs.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>
            Earth electrodes for TT — types, layout, seasonal stability
          </ContentEyebrow>

          <ConceptBlock
            title="Permitted electrode types — Reg 542.2.1"
            plainEnglish="A TT installation has no PE from the supply, so you must build your own earth. Reg 542.2.1 lists what counts: driven rods, pipes, buried tape or wire, plates, foundation-earth electrodes (Ufer / rebar), structural metalwork of buildings, lead sheaths of cables, welded metal reinforcement of concrete embedded in the ground."
            onSite="UK practice for TT is overwhelmingly multiple driven copper-clad steel rods. A single 1.2 m rod typically gives 80–200 Ω in average UK soil, often too high to satisfy Reg 411.5.3 once you do Ra × IΔn ≤ 50 V with a 100 mA RCD upstream. Two or more rods spaced at least their length apart and connected with insulated bonding cable can drop Ra to 30–60 Ω in the same soil. Soil that dries out in summer can double Ra — Reg 542.2.4 wants you to design for the worst-case season."
          >
            <p>
              Earth electrode resistance Ra is the sum of (a) the contact resistance between the
              electrode and the soil, (b) the resistance of the soil itself, and (c) the resistance
              of the soil shell extending out to the point where adjacent equipotential surfaces no
              longer matter (the "resistance area"). Driving a single rod into clay gives a
              relatively low Ra; dry sand or chalk can be 10× higher. Multi-rod arrays work because
              their resistance areas don't overlap — provided the spacing is ≥ rod depth. In awkward
              soils (rocky ground, made-up land, urban sites without soft earth) buried tape,
              plates, or foundation-earth electrodes (Ufer) using the rebar of a freshly-cast
              concrete pad are the practical answers.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Verifying TT — Ra × IΔn ≤ 50 V and seasonal re-test"
            plainEnglish="On TT the protective measure of ADS depends on an upstream RCD and a low-enough Ra to keep the touch voltage during a fault below 50 V. The formula is Reg 411.5.3: Ra × IΔn ≤ 50 V. With a 30 mA RCD that means Ra ≤ 1666 Ω; with a 100 mA RCD, Ra ≤ 500 Ω; with a 300 mA RCD, Ra ≤ 166 Ω."
            onSite="Measure Ra with a dedicated earth-electrode tester (3-point fall-of-potential or stakeless / clamp-on for verification). Record Ra on the EIC. Reg 542.2.4 requires Ra to be sufficiently low and stable — re-measure annually where the design margin is small (Ra near the limit, agricultural or seasonal sites). RCD operation must also be verified at IΔn (operating time ≤ 300 ms general, ≤ 200 ms in Section 411.3.2) and 5 IΔn (≤ 40 ms) at every test."
          >
            <p>
              Reg 411.5.4 (TT with OPD only) is the low-Ra alternative: where the earth-loop
              impedance is low enough that a fuse or MCB clears the fault within the disconnection
              time without an RCD. In practice this requires Ra well under 1 Ω, which a small array
              of rods rarely achieves. Almost every UK TT install uses Reg 411.5.3 (RCD-led ADS).
              Reg 411.6.3 (IT) is the rare third route, for continuity-critical sites.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>
            Identifying extraneous-conductive-parts — the GN8 22 kΩ test
          </ContentEyebrow>

          <ConceptBlock
            title="What counts as extraneous, and the test that decides"
            plainEnglish="An extraneous-conductive-part is a metal item, NOT part of the electrical installation, that can introduce a potential — usually earth potential — into the equipotential zone. Water pipes, gas pipes, central heating and structural steel are the obvious candidates."
            onSite="The GN8 (IET Guidance Note 8 — Earthing & Bonding) test: with the part disconnected from any existing bond, measure its insulation resistance to the MET (or true earth) at 500 V. ≥ 22 kΩ means the part cannot introduce a dangerous potential — it is NOT extraneous, no main bonding needed. Below 22 kΩ — bond it to the MET per Reg 411.3.1.2 + Reg 544.1.1. The threshold is derived from a 50 V touch limit and a 2.27 mA body-current limit: 50 / 0.00227 ≈ 22 kΩ."
          >
            <p>
              The classic case is the post-2002 plastic incomer: many UK properties had their gas
              and water mains replaced with MDPE (yellow gas / blue water plastic). Internal copper
              pipework downstream of the meter is often no longer extraneous because the path to
              true earth is now insulated. ALWAYS run the 22 kΩ test before deciding to omit bonding
              — visual inspection alone is unreliable, and other parallel paths (heating system to
              outdoor radiators, copper waste pipes to outside) can re-establish the earth path even
              where the main is plastic.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Supplementary equipotential bonding — Reg 415.2.1</ContentEyebrow>

          <ConceptBlock
            title="When ADS isn't enough — supplementary bonding fills the gap"
            plainEnglish="Where ADS via OPD or RCD cannot be guaranteed to deliver disconnection within the required time AT EVERY POINT in a location — typically because Zs is high, or the location is high-risk (bath, shower, swimming pool, agricultural) — supplementary equipotential bonding ties together the exposed-conductive-parts and extraneous-conductive-parts within reach of each other so the touch voltage during a fault stays below 50 V."
            onSite="Sized per Reg 544.2: 2.5 mm² copper protected against mechanical damage, 4 mm² unprotected. Where it connects two exposed-conductive-parts, its CSA must be at least that of the smaller CPC of the two circuits. Where it connects an exposed to an extraneous, its CSA must be at least half that of the CPC of the circuit. Verify R ≤ 50 V / Ia (Reg 415.2.2) — measure resistance between the bonded parts; the limit drops as the upstream OPD/RCD operating current rises."
          >
            <p>
              Reg 415.2.1 requires supplementary bonding to connect together simultaneously
              accessible exposed-conductive-parts and extraneous-conductive-parts so that the
              effectiveness of ADS is supplemented. The conductor must be electrically continuous
              and protected against damage. Reg 415.2.2 sets the verification: R between bonded
              parts must satisfy R ≤ 50 V / Ia, where Ia is the OPD operating current at the
              relevant disconnection time (or the rated residual operating current of the RCD). In
              practice on a domestic 30 mA RCD: 50 / 0.03 = 1666 Ω, which any properly bonded joint
              is comfortably below.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 415.2.1 — Supplementary equipotential bonding"
            clause="Where the conditions for automatic disconnection cannot be met, locally additional supplementary equipotential bonding shall be provided. Where doubt exists regarding the effectiveness of supplementary equipotential bonding, it shall be confirmed that the resistance R between simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts fulfils the following condition: R ≤ 50 V / Ia in AC systems, R ≤ 120 V / Ia in DC systems, where Ia is the operating current in amperes (A) of the protective device."
            meaning="Supplementary bonding is the explicit fall-back when ADS via OPD/RCD cannot guarantee disconnection. The verification formula gives you a measurable test: lower upstream Ia (faster RCD) means a more permissive R limit. Always verify by measurement, not by assumption."
            cite="BS 7671:2018+A4:2026, Reg 415.2.1"
          />

          <ConceptBlock
            title="The bathroom rule — Reg 701.415.2 omission test"
            plainEnglish="A modern UK bathroom CAN omit supplementary bonding under Reg 701.415.2, but ONLY if all three conditions are met: every circuit in the location meets its disconnection time, every circuit has 30 mA RCD additional protection, AND all extraneous-conductive-parts of the location are effectively connected to the MET by main protective bonding. Miss any one — supplementary bonding goes back in."
            onSite="The cert (EIC schedule of inspection) should record explicitly which route has been taken: 'supplementary bonding installed within location' OR 'supplementary bonding omitted under Reg 701.415.2 — three conditions verified'. An EICR finding 'no supplementary bonding observed' on a bathroom is only a code-able observation if the three conditions are NOT met. Test plumbing continuity, confirm RCD operation, confirm main bonding to gas / water at the MET — then the cert decision is defensible."
          >
            <p>
              Other Section 7 special locations have their own supplementary-bonding regimes that do
              NOT carry the same omission test. Swimming pools (Reg 702), saunas (Reg 703),
              agricultural premises (Reg 705) and medical locations (Reg 710) each impose
              location-specific bonding requirements that override the bathroom-style omission —
              always read the relevant Section 7 clause first before deciding to omit.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Choosing OPD-led ADS vs RCD-led ADS</ContentEyebrow>

          <ConceptBlock
            title="The two routes to ADS, and which one applies on which system"
            plainEnglish="ADS = automatic disconnection of supply. The disconnection can be delivered by an overcurrent protective device (OPD — fuse or MCB) reading the fault current, OR by an RCD reading the residual current. Each route has a different verification rule."
            onSite="On TN-S and TN-C-S, OPD-led ADS is straightforward where Zs is low: Reg 411.4.4 wants Zs ≤ U₀ × Cmin / Ia, verified by Zs measurement at the furthest point. On TT, OPD-led ADS (Reg 411.5.4) requires very low Ra and is rare; RCD-led ADS (Reg 411.5.3) is the norm — Ra × IΔn ≤ 50 V plus disconnection time per Reg 411.3.2. On final circuits ≤ 32 A in domestic premises, A4:2026 mandates 30 mA RCD additional protection on sockets (Reg 411.3.3), luminaires (Reg 411.3.4) and the special locations of Section 7 — so the 'RCD layer' is universal regardless of which ADS route you nominate."
          >
            <p>
              The decision is rarely binary in 2026 — most modern UK boards use 30 mA RCBOs (RCD +
              MCB combined) on every circuit, giving you OPD-led AND RCD-led ADS in parallel. The Zs
              value still has to be verified for the OPD route to be defensible (in case a future
              RCD failure removes the residual-current route), but the RCD provides the primary
              disconnection in practice. The exception is a TT supply with a single upstream 100 mA
              time-delayed RCD on the consumer side and 30 mA RCBOs downstream — there the upstream
              RCD provides discrimination, and verification has to address both layers.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Under-sizing main bonding on a PME supply"
            whatHappens="Installer fits 6 mm² main bonding to gas and water on a domestic TN-C-S property with a 25 mm² supply neutral. The cert records 'main bonding installed' — sounds compliant. EICR a few years later codes C2 (potentially dangerous) under-sized PME bonding."
            doInstead="On TN-C-S always apply Reg 544.1.2 / Table 54.8: 25 mm² supply neutral → 10 mm² minimum bonding. Check the supply-neutral CSA at the cut-out before specifying bonding. If you cannot see the cut-out tail, ask the DNO or use 16 mm² as a conservative default for an unknown PME service — over-sizing bonding does no harm, under-sizing it leaves the property dangerous under a PEN fault."
          />

          <CommonMistake
            title="Confusing the CPC with the earthing conductor — wrong sizing rule applied"
            whatHappens="Designer sizes the conductor from the consumer-unit MET to the cut-out earthing terminal using Table 54.7 (CPC sizing) — gets 16 mm² for a 25 mm² line. The result is an earthing conductor that meets the CPC rule but fails the Reg 544.1.2 PME overlay (which requires 10 mm² minimum, or more depending on supply neutral)."
            doInstead="Use the right rule. CPC = circuit conductor inside the installation, sized by Reg 543.1.1 (Table 54.7 OR adiabatic). Earthing conductor = MET to means of earthing, sized by Reg 542.3.1 (Table 54.1) PLUS the PME overlay (Reg 544.1.2). The two regulations can give different answers — apply the rule that matches the conductor's job."
          />

          <CommonMistake
            title="Bonding everything in sight — over-bonding plastic incomers"
            whatHappens="Installer treats every metal pipe in a property as extraneous and runs main bonding to internal copper pipework downstream of an MDPE incomer. The bond is unnecessary AND harms diagnostics — a future fault on the bonded pipe may now have a non-trivial earth path that the test regime didn't anticipate."
            doInstead="Run the GN8 22 kΩ test before bonding. ≥ 22 kΩ to the MET → not extraneous, no bond. Below 22 kΩ → bond per Reg 544.1.1 / 544.1.2. Document the test result on the cert. The point of bonding is to handle parts that DO introduce earth potential — bonding parts that don't introduces complexity for no safety gain, and on long copper runs can create circulating currents."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Consumer-unit retrofit on a 1990s TT property"
            situation="Customer wants their 17th edition split-load CU replaced with a modern 18th edition + A4 metal-bodied unit. The property is on a TT supply (no DNO PE) with a single 1.2 m driven rod giving Ra = 145 Ω. Existing CU has a 100 mA general-type RCD on the main switch and Type AC 30 mA RCDs on socket banks. Earthing conductor is 6 mm² copper from MET to a chamber outside."
            whatToDo="Step 1 — verify Ra and the formula. 100 mA RCD: Ra × IΔn ≤ 50 V → 145 × 0.1 = 14.5 V (passes). 30 mA RCBO on each circuit: 145 × 0.03 = 4.35 V (passes). Step 2 — check earthing conductor size. Reg 542.3.1 / Table 54.1 with the conductor protected (in conduit, accessible chamber): 6 mm² is acceptable for TT (the PME overlay does not apply on TT). Step 3 — design the new CU with 30 mA Type A RCBOs on every circuit (Type A handles pulsating DC from modern LED drivers and electronics — Type AC is no longer fit for purpose). Step 4 — re-measure Ra after the works to confirm seasonal stability and record on the EIC. Step 5 — confirm main bonding to gas and water (if metallic, run the GN8 test) at 6 mm² minimum (TT does not require PME overlay, but 10 mm² is good practice on any modern install)."
            whyItMatters="On TT, Ra is the linchpin of ADS. A retrofit that fits Type A RCBOs everywhere AND verifies Ra at completion gives you a defensible cert against current edition. Skipping the Ra re-measure leaves the cert exposed: if soil dries out in summer and Ra rises above the formula limit, ADS is no longer demonstrable and the property is non-compliant the moment the season changes. Reg 542.2.4 wants you to design for stability — record the Ra at install, advise the customer of the annual re-test schedule, and put it on the EICR retest interval."
          />

          <Scenario
            title="Supplementary bonding decision in a 1980s domestic bathroom"
            situation="EICR on a 1980s TN-C-S domestic property. The bathroom has a metal heated towel rail (CPC connected, exposed-conductive-part), an electric shower (CPC connected), copper pipework to a shower mixer and to the bath taps. No supplementary bonding visible — installer is being asked whether it is required under A4:2026. Existing supply: 100 A TN-C-S, 25 mm² neutral, 16 mm² earthing conductor, 10 mm² bonding to gas and water at the MET (sound). Bathroom circuits: lighting on a 6 A Type B MCB (NO RCD), shower on a 32 A Type B RCBO 30 mA, towel rail on a 16 A Type B RCBO 30 mA."
            whatToDo="Apply Reg 701.415.2 three-condition test. Condition (a): every circuit in the location meets its disconnection time? Verify Zs at the furthest point of the lighting circuit, shower, towel rail and confirm ≤ Zs(max) for each device. Condition (b): every circuit has 30 mA RCD additional protection? FAILS — the lighting circuit is on an MCB without RCD. Under A4 Reg 411.3.4 the lighting circuit must have 30 mA RCD anyway (domestic luminaire rule); add an RCBO. Condition (c): all extraneous-conductive-parts effectively connected to the MET? Run the GN8 22 kΩ test on the bathroom copper pipework. If ≥ 22 kΩ (likely on a property with plastic incomers), the pipework is NOT extraneous and condition (c) is satisfied by default. If < 22 kΩ, confirm main bonding at the MET is sound. Outcome: once the lighting RCBO is added (Reg 411.3.4 fix) and the GN8 test passes, all three conditions are met and supplementary bonding can be omitted under Reg 701.415.2 — record explicitly on the EIC."
            whyItMatters="A4:2026 makes Reg 411.3.4 unconditional within domestic premises — every lighting circuit in a dwelling needs 30 mA RCD or RCBO. Once that's done, the supplementary-bonding decision in the bathroom often resolves itself because condition (b) is satisfied for free. Recording the omission decision on the cert (with the three conditions ticked off) is the defensible approach — silent omission leaves the next inspector second-guessing the design."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference — Chapter 54 in one screen</ContentEyebrow>

          <ConceptBlock
            title="Five rules to size every earth-related conductor on a UK domestic install"
            plainEnglish="Walk it from the cut-out inwards. (1) Earthing conductor: Reg 542.3.1 / Table 54.1 + PME overlay. (2) MET: Reg 542.4.1, single bar, every earth conductor lands here. (3) Main bonding: Reg 544.1.1 (TN-S) or 544.1.2 / Table 54.8 (PME). (4) CPCs: Reg 543.1.1, Table 54.7 default, adiabatic where unusual. (5) Supplementary bonding: Reg 415.2.1 / 544.2 — 2.5 mm² protected, 4 mm² unprotected, R ≤ 50 V / Ia."
            onSite="Default rule of thumb for a 100 A single-phase TN-C-S domestic UK property in 2026: earthing conductor 16 mm² Cu; main bonding to gas + water 10 mm² Cu; CPCs by Table 54.7 (so 1.0 mm² T&E line → 1.0 mm² CPC, 6 mm² T&E line → 2.5 mm² CPC, etc.); supplementary bonding only where Reg 701.415.2 conditions are NOT all met. Larger services (200 A three-phase) lift the bonding and earthing-conductor minimums per the supply-neutral CSA — always check the cut-out tail."
          >
            <p>
              The five rules cover every earth-related conductor. The thing that catches new
              designers out is treating bonding and CPCs as a single rule — they are not. The
              earthing conductor on TN-C-S is dominated by the PME overlay (which the table-route
              CPC sizing does not see). Main bonding is similarly PME-driven. CPCs ride on the line
              conductor of their circuit. Supplementary bonding fills the gap where ADS cannot be
              demonstrated alone — and is mostly omitted in modern UK domestic where the three Reg
              701.415.2 conditions are met.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'The MET (Reg 542.4.1) is the single equipotential reference — every CPC, the earthing conductor, every main protective bonding conductor and any functional earth lands here.',
              'CPCs are sized by Reg 543.1.1 — Table 54.7 selection by default, the adiabatic equation (Reg 543.1.3) where the table answer is implausible. Standard 6 mm² T&E carries a 2.5 mm² CPC; 10 mm² T&E carries a 4 mm² CPC.',
              'Main protective bonding under Reg 544.1.1 is half-the-earthing-conductor-CSA on TN-S. On TN-C-S the higher minimums of Reg 544.1.2 / Table 54.8 apply — 10 mm² floor where supply neutral ≤ 35 mm², 16 mm² where 35–50, 25 mm² where 50–95.',
              'Earthing conductors come from Reg 542.3.1 / Table 54.1 — 2.5 mm² protected against both, 6 mm² protected against corrosion only, 16 mm² unprotected against either — then lifted by the PME overlay (Reg 544.1.2) on TN-C-S.',
              'TT installations need an electrode (usually multi-rod) that satisfies Ra × IΔn ≤ 50 V (Reg 411.5.3) plus Reg 542.2.4 seasonal stability. RCD-led ADS is the practical norm; OPD-led ADS (Reg 411.5.4) is rare.',
              'Supplementary equipotential bonding (Reg 415.2.1 / 544.2) fills the gap where ADS cannot be demonstrated alone. In domestic bathrooms it can be omitted under Reg 701.415.2 ONLY if all three conditions hold — record the decision on the cert.',
              'Use the GN8 22 kΩ test to decide whether a metal part is extraneous-conductive — measurement, not visual inspection, settles the bonding decision.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 4 — Protection for Safety
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module3Section5;
