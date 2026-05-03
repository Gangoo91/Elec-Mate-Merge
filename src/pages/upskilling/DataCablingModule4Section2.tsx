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
    id: 'datacabling-m4s2-separation-hierarchy',
    question:
      'You are running a 4-cable Cat6A bundle alongside a 240 V single-phase final circuit on a 50-cable basket tray. Annex A444 of BS 7671 sets the minimum separation. What is the headline 200 / 150 / 0 mm hierarchy and what determines which one applies?',
    options: [
      'A single 50 mm rule applies regardless of containment.',
      'Annex A444 Table A444.1: 200 mm in free air with no containment or open metallic containment type A; 150 mm with perforated open metallic containment type B (e.g. steel tray with up to 20 percent perforation, 1.0 mm wall); 0 mm physical separation with solid metallic containment type C (fully enclosed steel containment, 1.5 mm minimum wall) — Note 4 says no physical separation other than the containment itself is required.',
      'Always 1 metre regardless of containment.',
      'No separation required for ELV vs LV.',
    ],
    correctIndex: 1,
    explanation:
      'Annex A444 Table A444.1 sets the headline 200 / 150 / 0 mm hierarchy. The principle: more containment = less air-gap separation needed. Welded mesh basket has notes equivalent to mesh size 50 mm by 100 mm; perforated tray Type B is up to 20 percent perforation with 1.0 mm wall; Type C is fully enclosed 1.5 mm steel. Note 4 explicitly says Type C requires no physical separation other than the containment itself. Table A444.2 then layers a voltage / current scaling on top — at 240 V, separation rises from the Table 1 baseline towards 0.45 m of free-air separation.',
  },
  {
    id: 'datacabling-m4s2-bend-radius',
    question:
      'A Cat6A solid horizontal cable has an outer diameter of 7.5 mm. What is the minimum bend radius during installation, and what is the more demanding rule at terminations?',
    options: [
      'No bend radius rule applies — Cat6A is flexible.',
      'BS EN 50174-2 / TIA-568.0-E rule of thumb: 4× cable outer diameter during installation (~30 mm radius for a 7.5 mm cable), 8× outer diameter at terminations and behind faceplates (~60 mm radius). Tighter bends compromise the twisted-pair geometry permanently — insertion loss and NEXT degrade and the cable does not recover even after the bend is straightened.',
      '2× outer diameter at all times.',
      '20× outer diameter — same as fibre.',
    ],
    correctIndex: 1,
    explanation:
      'Bend radius for balanced twisted pair is 4× cable OD during installation, 8× OD at terminations / behind faceplates / inside patch panels. The rule reflects the fact that the cable performance depends on the precise twist geometry of the pairs — a tight bend deforms the pair lay permanently, raising insertion loss, degrading return loss, and increasing NEXT. Once damaged, the channel does not heal when the bend is relaxed. The minimum bend radius is therefore a lifelong cable performance requirement, not just an installation precaution.',
  },
  {
    id: 'datacabling-m4s2-528-1-gap',
    question:
      'You are checking the segregation rules for Band I (ELV / data) and Band II (LV power) cables sharing a single cable management system. BS 7671 §444.6.1 references which clause for the detailed segregation rule, and what is the practical position?',
    options: [
      '§444.6.1 references §528.1, §528.2 and §528.3. The verbatim text of §528.1 (the headline shared-containment rule) is not reproduced here — refer to the printed copy of BS 7671:2018+A4:2026 for the verbatim Band I / Band II segregation rule. The summary position is: cables must either be insulated for the highest voltage present, or be installed in separate compartments / partitioned trays / equivalent.',
      '§444.6.1 references §700 — special locations only.',
      'No segregation is required between Band I and Band II.',
      '§444.6.1 stands alone — no other clauses apply.',
    ],
    correctIndex: 0,
    explanation:
      '§444.6.1 verbatim: "Cables that are used at voltage Band II (low voltage) and cables that are used at voltage Band I (extra-low voltage) which share the same cable management system or the same route, shall be installed according to the requirements of Regulations [528.1, 528.2, 528.3]." The verbatim text of §528.1 is referenced rather than reproduced in this section — see the printed copy of BS 7671:2018+A4:2026 for the verbatim Band I / Band II segregation rule. The summary: insulate for the highest voltage present, OR partition / separate compartments. §528.2 (verbatim available) confirms circuits of the same voltage band might also require segregation — same band, different EMC sensitivity.',
  },
  {
    id: 'datacabling-m4s2-128-mm-hid',
    question:
      'A run of Cat6A horizontal cable passes within 80 mm of a recessed CFL ceiling lamp. What does BS 7671 §444.6.2 require?',
    options: [
      'No issue — CFL is not regulated as a discharge lamp.',
      '§444.6.2 verbatim: "The minimum distance between information and communications technology cables and discharge, neon and mercury vapour (or other high-intensity discharge) lamps shall be 130 mm. In this regard, low energy lamps (CFL) are to be considered as gas discharge sources. Data wiring racks and electrical equipment shall always be separated." 80 mm fails this rule — the cable route must move to clear 130 mm or the lamp position must change.',
      '§444.6.2 only applies to fluorescent tubes, not CFL.',
      'A 50 mm separation is sufficient.',
    ],
    correctIndex: 1,
    explanation:
      '§444.6.2 verbatim. CFL lamps are explicitly named as gas discharge sources for the purpose of this clause. The 130 mm separation is independent of the §444.6.1 / Annex A444 Band I / Band II separation — HID lamps emit electromagnetic interference at frequencies that affect ICT cabling regardless of voltage band. Plan routes around lamp positions; the cleanest fix is to move the cable, not the luminaire. The clause also requires data wiring racks and electrical equipment to be separated — relevant to comms-room layout (see Module 4 Section 5).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the BS 7671 Annex A444 Table A444.1 minimum separation between Band I (ELV / data) and Band II (LV power) cables for the "no containment" or "open metallic containment A" case?',
    options: [
      '50 mm.',
      '200 mm in free air. The clause: "Where the specification and/or intended application of the information technology cable is not available, then the cable separation distance between the power and information technology cables should be a minimum of 200 mm in free air. This distance can be reduced if a screened power cable, a metallic barrier, or containment system is used as described in Table A444.1."',
      '500 mm.',
      'No separation required.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Annex A444.4 verbatim: 200 mm minimum in free air where no containment is provided. The same clause says this can be reduced if a screened power cable, metallic barrier, or containment system is used per Table A444.1 — 150 mm with perforated open metallic containment type B, 0 mm with solid metallic containment type C.',
  },
  {
    id: 2,
    question:
      'BS 7671 Annex A444 Table A444.2 gives a voltage / current scaling on top of the containment hierarchy. At 240 V supply, what is the minimum separation between power and signal cables given by Table A444.2?',
    options: [
      '0.20 m.',
      '0.45 m at 240 V (per Table A444.2: 115 V → 0.25 m, 240 V → 0.45 m, 415 V → 0.58 m, 3.3 kV → 1 m, 6.6 kV → 1.25 m, 11 kV → 1.4 m). The table is read alongside Table A444.1 (containment type) and the higher of the two figures — voltage band scaling and containment scaling — applies.',
      '0.10 m.',
      '1.00 m.',
    ],
    correctAnswer: 1,
    explanation:
      'Table A444.2 sets a voltage / current scaling on the segregation distance — 0.45 m at 240 V, rising to 1.4 m at 11 kV. It is read alongside Table A444.1 (containment hierarchy). The standards practice is to apply the higher of the two figures as the binding minimum. For most commercial work at 240 / 415 V, Table A444.2 dominates open-air separation; Table A444.1 dominates inside containment.',
  },
  {
    id: 3,
    question:
      'What is the BS 7671 §444.6.2 minimum separation between information and communications technology cables and discharge / neon / mercury vapour / HID / CFL lamps?',
    options: [
      '50 mm.',
      '130 mm — verbatim per §444.6.2. CFL is explicitly called out as a gas discharge source. Data wiring racks and electrical equipment must always be separated.',
      '200 mm.',
      '500 mm.',
    ],
    correctAnswer: 1,
    explanation:
      '§444.6.2 fixes a 130 mm minimum from ICT cables to discharge / neon / mercury vapour / HID lamps, including CFL. Plan basket / tray routes around recessed lamp positions; flag any encroachment in the as-built record.',
  },
  {
    id: 4,
    question:
      'Cat6A solid horizontal cable: what is the minimum bend radius during installation, and what is the rule at terminations?',
    options: [
      '2× cable OD throughout.',
      '4× cable outer diameter during installation; 8× cable outer diameter at terminations, behind faceplates, and at any final dressed bend. Tighter bends permanently deform the pair-twist geometry, raising insertion loss, degrading return loss, and increasing NEXT. The cable does NOT recover when the bend is straightened.',
      '20× cable OD — same as multimode fibre.',
      'No bend radius rule applies to Cat6A.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50174-2 / TIA-568.0-E install practice: 4× OD during installation, 8× OD at terminations. The rule exists because Cat6A performance depends on the precise twist lay of each pair — a tight bend deforms the pairs permanently. Insertion loss, return loss and NEXT all degrade and stay degraded. The minimum bend radius is therefore a lifelong cable performance requirement.',
  },
  {
    id: 5,
    question:
      'BS 7671 §444.6.1 covers shared cable management between Band I and Band II. Which clauses does it reference for the detailed segregation rule, and which one is NOT reproduced verbatim in our RAG?',
    options: [
      '§444.6.1 references §411 — protective earthing.',
      '§444.6.1 references §528.1, §528.2 and §528.3. §528.1 is referenced by number — the verbatim text is not reproduced here. Refer to the printed copy of BS 7671:2018+A4:2026 for the verbatim Band I / Band II segregation rule. §528.2 and §528.3.x are reproduced verbatim and apply alongside.',
      '§444.6.1 references §716 only.',
      '§444.6.1 references §444.5.3.1.',
    ],
    correctAnswer: 1,
    explanation:
      '§444.6.1 verbatim: "Cables that are used at voltage Band II (low voltage) and cables that are used at voltage Band I (extra-low voltage) which share the same cable management system or the same route, shall be installed according to the requirements of Regulations [528.1, 528.2, 528.3]." §528.1 is referenced by number in this course material. See the printed copy of BS 7671:2018+A4:2026 for the verbatim §528.1 text. The summary position: insulate for the highest voltage present, or partition / separate compartments. §528.2 (verbatim available) adds that same-band circuits might still need segregation.',
  },
  {
    id: 6,
    question: 'BS 7671 §528.2 — what does it add to the segregation rules?',
    options: [
      '§528.2 prohibits all shared containment.',
      'Verbatim: "Circuits of the same voltage band might also require segregation or separation. Electrical safety and electromagnetic compatibility might produce different segregation or separation requirements. The design shall meet both requirements." Same-band circuits — for example two ELV circuits with different EMC characteristics — might still need segregation.',
      '§528.2 only applies to special locations.',
      '§528.2 covers only fire-rated cables.',
    ],
    correctAnswer: 1,
    explanation:
      '§528.2 verbatim. Practical reading: same-voltage-band circuits can still need segregation if their EMC characteristics differ — e.g. PoE++ data cables alongside fire-alarm signal cables (both ELV, different EMC sensitivity profiles). The clause requires the design to meet BOTH electrical-safety AND EMC segregation needs — whichever is more onerous wins.',
  },
  {
    id: 7,
    question:
      'What is the WHY of the 4× / 8× bend radius rule for Cat6A — what physically happens when you exceed it?',
    options: [
      'The cable jacket cracks.',
      'The precise twist-lay geometry of each balanced pair deforms permanently. That deformation raises insertion loss, degrades return loss (more reflections at the bend), and increases NEXT (near-end crosstalk between pairs). The damage is cumulative and persistent — the cable does not recover when the bend is straightened. A Class EA channel can fail certification on a single tight bend.',
      'Nothing happens — the rule is a guideline.',
      'The conductor breaks immediately.',
    ],
    correctAnswer: 1,
    explanation:
      'Balanced twisted-pair performance is defined by the twist lay. The conductors have to maintain the precise pitch they were extruded with — the EMC rejection (NEXT, ELFEXT) and impedance match depend on it. A tight bend deforms the pairs faster than the jacket; the cable looks fine externally but tests poorly. This is why the 4× / 8× rule is non-negotiable on Cat6A and above.',
  },
  {
    id: 8,
    question:
      'BS 7671 §528.3.1 covers proximity to services that produce heat / smoke / fumes. What does it require for a wiring system installed near such services?',
    options: [
      'No requirements — as long as cables are insulated.',
      'Verbatim: "A wiring system shall not be installed in the vicinity of services which produce heat, smoke or fumes likely to be detrimental to the wiring, unless it is protected from harmful effects by shielding arranged so as not to affect the dissipation of heat from the wiring." In service shafts and cavities, cables shall be laid so they are not exposed to harmful influence by adjacent installations (gas, water, steam).',
      'Cables must be re-routed at least 5 m away.',
      'Only fire-rated cables are permitted.',
    ],
    correctAnswer: 1,
    explanation:
      '§528.3.1 verbatim. Practical reading: route data cables clear of hot pipework, exhaust ducts, condensate-prone surfaces. Where proximity is unavoidable, provide shielding that does not impede heat dissipation from the cabling itself (i.e. do not insulate the cable bundle to "protect" it — that traps cable heat instead).',
  },
  {
    id: 9,
    question:
      'A specifier asks "if my power cables are inside fully enclosed steel trunking and my data cables are on a basket tray running parallel above, do I still need 200 mm separation?"',
    options: [
      'Yes, always 200 mm.',
      'No. Per Annex A444 Table A444.1, fully enclosed solid metallic containment type C provides "no physical separation other than that provided by the containment" (Note 4) for the power cabling. The data cabling is in containment type A (basket / no enclosure), so the rule is read on the side of the more screened of the two — the 0 mm (Note 4) applies. Table A444.2 still applies for the voltage / current scaling.',
      'Yes — 1 m always for parallel runs.',
      'Only if the trunking is bonded.',
    ],
    correctAnswer: 1,
    explanation:
      'Annex A444 Table A444.1 hierarchy: more containment of EITHER side reduces the required separation. Solid steel trunking around the power cables is type C — Note 4 says no physical separation other than the containment is required. The basket-tray data is then free-air-equivalent on the data side, but the power containment dominates. Table A444.2 still constrains the voltage / current dimension. Always read both tables together.',
  },
  {
    id: 10,
    question:
      'During termination, you have a 90 m Cat6A horizontal run. The installer pulls the cable through with a kink at one ceiling crossover that exceeded 4× OD bend radius for about 2 minutes during the pull. Should this concern you?',
    options: [
      'No — temporary bends are fine.',
      'Yes. Bend-radius damage to the pair-twist geometry is cumulative — even a temporary tight bend during the pull can deform the pairs. The BS EN 50174-2 / TIA-568.0-E install practice rule is 4× OD during installation, NOT just at the final dressed position. Channel-test the link to TIA-1152-A / BS EN 50346 at end-of-job; if it fails, replace the cable. There is no "fix" once the geometry is deformed.',
      'Only if the bend is permanent.',
      'Only if the cable is screened.',
    ],
    correctAnswer: 1,
    explanation:
      'The 4× OD installation rule applies during the pull, not just at the final dressed bend. Pair-twist geometry damage is cumulative and persistent. The mitigation is end-of-job channel testing — Class EA pass / fail to TIA-1152-A / BS EN 50346 — and replacement of any link that does not meet the test. Document the test result for the link; if it passes, the cable is fine. If it fails, replace.',
  },
];

const faqs = [
  {
    question:
      'Where can I find the verbatim text of BS 7671 §528.1 — the headline Band I / Band II shared-containment rule?',
    answer: (
      <>
        §528.1 is referenced by §444.6.1 but its verbatim text is not reproduced in this course
        material — it lives only in the printed copy of BS 7671:2018+A4:2026. The summary position
        the clause sets out is that cables of different voltage bands sharing a cable management
        system or route must either be insulated for the highest voltage present, or be installed in
        separate compartments / partitioned trays / equivalent. For the verbatim wording, refer to
        your printed copy of BS 7671:2018+A4:2026 — Section 528. §528.2 (which IS reproduced
        verbatim above) confirms that even same-band circuits might still need segregation on EMC
        grounds.
      </>
    ),
  },
  {
    question: 'How do I read Table A444.1 and Table A444.2 together — which one wins?',
    answer: (
      <>
        Both apply. Table A444.1 sets the containment hierarchy (200 / 150 / 0 mm based on whether
        each cable is in no containment, perforated open metallic, or fully enclosed solid
        metallic). Table A444.2 sets the voltage / current scaling (240 V → 0.45 m free-air, scaling
        up to 1.4 m at 11 kV). The competent design takes the more onerous of the two figures as the
        binding minimum. For most commercial 240 / 415 V work, Table A444.2 dominates open-air
        separation; Table A444.1 dominates inside containment.
      </>
    ),
  },
  {
    question: 'Does the 4× / 8× bend radius apply to all twisted-pair categories, or only Cat6A?',
    answer: (
      <>
        The 4× / 8× rule is industry practice across BS EN 50174-2 / TIA-568.0-E for solid balanced
        twisted pair (Cat5e, 6, 6A, 7, 7A, 8). Higher categories with tighter spec margins (Cat6A
        and above) are less tolerant of bend-radius violation than older categories — their
        performance depends more critically on the precise pair-twist geometry. Always check the
        specific cable manufacturer datasheet for the absolute minimum; the 4× / 8× rule is a safe
        default. Stranded cord cables are more flexible and have separate, looser bend-radius rules
        typically built into the cord assembly.
      </>
    ),
  },
  {
    question:
      'How does BS 7671 §444.6.2 (130 mm from HID / CFL) interact with Annex A444 separation distances?',
    answer: (
      <>
        They are independent rules — both apply. §444.6.2 fixes a 130 mm minimum from ICT cables to
        discharge / HID / CFL lamps regardless of containment. Annex A444 + §444.6.1 + §528.x set
        the Band I / Band II separation regardless of lamps. On a real install, the cable route must
        clear BOTH — 130 mm from any HID / CFL position AND the Annex A444 separation from any LV
        power on the same route. The route that satisfies both is the compliant route.
      </>
    ),
  },
  {
    question: 'What about fibre — does the bend radius rule for Cat6A apply to optical fibre too?',
    answer: (
      <>
        No — fibre has its own bend-radius rules, typically larger than copper. Conventional
        single-mode fibre wants 10× cable OD minimum (long-term) and 20× OD (during installation).
        Bend-insensitive single-mode (G.657) tolerates tighter bends — sometimes as low as 7.5 mm
        radius — but always check the manufacturer datasheet. Multimode fibre is typically 10-20×
        OD. The physical mechanism is different from copper: tight bends on fibre cause optical loss
        (macrobend / microbend attenuation), which is recoverable when the bend is relaxed — unlike
        copper, where the pair-twist deformation is permanent.
      </>
    ),
  },
  {
    question:
      'The minimum bend radius is described as a "lifelong cable performance" rule — what does that mean in practice?',
    answer: (
      <>
        It means the bend-radius requirement is not just an installation precaution to avoid
        immediate damage. The pair-twist geometry of balanced twisted pair determines the
        cable\u2019s electrical performance — insertion loss, return loss, NEXT, ELFEXT — for the
        entire 15-20 year life of the cable. A tight bend that deforms the pairs is a permanent
        change. The cable does not heal when the bend is straightened. So a "bad pull" in 2026 still
        affects channel test results in 2040. Treat bend radius as a design constraint and a
        permanent-condition requirement, not a momentary install concern.
      </>
    ),
  },
];

const DataCablingModule4Section2 = () => {
  const navigate = useNavigate();

  useSEO(
    'Cable Separation and Bend Radius | Data Cabling Module 4.2 | Elec-Mate',
    'Cable separation and bend radius for data cabling — BS 7671 Annex A444 Tables A444.1 and A444.2; the 200 / 150 / 0 mm separation hierarchy; §444.6.1 and §528.2 segregation; §444.6.2 130 mm from HID and CFL lamps; 4× and 8× cable outer diameter bend radius rules; minimum bend radius as lifelong cable performance.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2"
            title="Cable Separation and Bend Radius"
            description="BS 7671 Annex A444 Tables A444.1 and A444.2 — the 200 / 150 / 0 mm separation hierarchy by containment type, layered with the voltage / current scaling. §444.6.1 referencing §528, §528.2 same-band segregation, §444.6.2 130 mm from HID / CFL. Plus the 4× / 8× cable OD bend-radius rule that determines lifelong Cat6A performance."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 Annex A444 Table A444.1 sets the headline separation hierarchy: 200 mm in free air with no containment / open metallic containment A; 150 mm with perforated open metallic containment B; 0 mm with solid metallic containment C (Note 4 — no physical separation other than the containment itself).',
              'Annex A444 Table A444.2 layers a voltage / current scaling: 0.25 m at 115 V, 0.45 m at 240 V, 0.58 m at 415 V, rising to 1.4 m at 11 kV. Read Tables A444.1 and A444.2 together; the more onerous figure binds.',
              '§444.6.1 references §528.1, §528.2 and §528.3 for the detailed Band I / Band II shared-containment rule. §528.1 verbatim text is in the printed copy of BS 7671 only — the summary position is "insulate for the highest voltage present OR partition". §444.6.2 fixes 130 mm from HID / neon / mercury vapour / CFL lamps.',
              'Bend radius for balanced twisted pair is 4× cable OD during installation, 8× OD at terminations and behind faceplates. The rule reflects pair-twist geometry damage that is permanent — the cable does not recover when the bend is straightened. Minimum bend radius is a lifelong performance requirement, not just an install precaution.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Cite BS 7671 Annex A444 Table A444.1 verbatim and apply the 200 / 150 / 0 mm separation hierarchy by containment type on a real cable route',
              'Cite Annex A444 Table A444.2 and apply the voltage / current scaling alongside the containment hierarchy — taking the higher of the two as binding',
              'Quote §444.6.1 verbatim and explain why §528.1 is referenced rather than reproduced in course material',
              'Quote §528.2 verbatim and apply the same-band segregation rule on EMC grounds (e.g. PoE++ data cables vs fire-alarm signal cables)',
              'Quote §444.6.2 verbatim — 130 mm minimum from ICT cables to discharge / HID / CFL lamps; data wiring racks and electrical equipment always separated',
              'Quote §528.3.1 / .3.2 / .3.3 / .3.4 / .3.5 and apply proximity-to-non-electrical-services rules (heat / smoke / fumes / condensation / lift wells)',
              'Apply the 4× / 8× cable OD bend-radius rule during installation and at terminations, and explain why the rule reflects lifelong pair-twist geometry damage',
              'Document the as-built containment / separation / bend-radius detail so the next contractor can plan moves and adds inside the same compliance envelope',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The Annex A444 separation hierarchy</ContentEyebrow>

          <ConceptBlock
            title="200 / 150 / 0 mm — by containment type"
            plainEnglish="BS 7671 Annex A444 Table A444.1 is the heart of the cable-separation rules for data cabling. It sets a three-tier hierarchy by containment type: 200 mm separation in free air with no containment, reducing to 150 mm with perforated open metallic containment B, reducing to 0 mm physical separation with fully enclosed solid metallic containment C. The principle is simple — more containment between Band II power and Band I data means less air-gap separation needed. A second table (A444.2) layers a voltage / current scaling on top."
            onSite="Walk every shared cable route with the table in mind. If you are running data on basket alongside power on basket, you need 200 mm clear air. Move power into perforated tray and you can drop to 150 mm. Move power into fully enclosed steel trunking and you can drop to 0 mm — the trunking IS the separation. Most real installs end up with mixed containment; read the more separated side of each segment as binding."
          >
            <p>The Annex A444 Table A444.1 categories, in order:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>No containment / open metallic containment A — 200 mm.</strong> Welded mesh
                basket (e.g. 50 mm × 100 mm grid) qualifies as type A — open metallic containment
                with screening performance equivalent to Note 1's reference (DC to 100 MHz). Default
                separation 200 mm in free air.
              </li>
              <li>
                <strong>Perforated open metallic containment B — 150 mm.</strong> Steel cable tray
                with perforation up to 20 percent of surface area, 1.0 mm wall minimum (per Note 2).
                Provides more EMC screening than open mesh, allowing separation to drop to 150 mm.
              </li>
              <li>
                <strong>Solid metallic containment C — 0 mm physical separation.</strong> Fully
                enclosed steel containment (1.5 mm minimum wall, per Note 3). No physical separation
                other than the containment itself is required (Note 4). This is the "use trunking
                and the trunking is the separation" rule.
              </li>
            </ul>
            <p>
              The rule is read symmetrically — it considers both the data side and the power side.
              If the data is on basket (type A) and the power is in solid steel trunking (type C),
              the more screened side dominates and separation drops to 0 mm. If both sides are on
              basket, you are at the 200 mm baseline. Mixed containment is normal; read the
              better-screened side as the binding factor.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="BS 7671 Annex A444 Table A444.1 — minimum separation by containment type"
            source="BS 7671:2018+A4:2026, Annex A444 (informative)"
            headers={['Containment type', 'Description', 'Minimum separation', 'Notes']}
            rows={[
              [
                'A — No containment / open metallic',
                'Welded mesh basket (e.g. 50 mm × 100 mm), open ladder',
                '200 mm in free air',
                'Note 1 — screening equivalent to welded mesh basket',
              ],
              [
                'B — Perforated open metallic',
                'Perforated steel tray, ≤ 20 % perforation, 1.0 mm wall',
                '150 mm',
                'Note 2 — duct without cover',
              ],
              [
                'C — Solid metallic (fully enclosed)',
                'Fully enclosed steel containment, 1.5 mm minimum wall',
                '0 mm physical separation',
                'Note 3 + Note 4 — no physical separation other than the containment',
              ],
            ]}
            notes="Apply alongside Table A444.2 (voltage / current scaling). The more onerous figure of the two binds. Read symmetrically — improving the screening on either side of the run reduces the required separation."
          />

          <AppendixTable
            caption="BS 7671 Annex A444 Table A444.2 — minimum separation by voltage / current"
            source="BS 7671:2018+A4:2026, Annex A444 (informative)"
            headers={['Supply', 'Minimum separation', 'Supply', 'Minimum separation']}
            rows={[
              ['115 V', '0.25 m', '5 A', '0.24 m'],
              ['240 V', '0.45 m', '15 A', '0.35 m'],
              ['415 V', '0.58 m', '50 A', '0.5 m'],
              ['3.3 kV', '1.0 m', '100 A', '0.6 m'],
              ['6.6 kV', '1.25 m', '300 A', '0.85 m'],
              ['11 kV', '1.4 m', '600 A', '1.05 m'],
            ]}
            notes="Voltage / current scaling for power vs signal cable separation. Apply alongside Table A444.1 (containment type). The higher of the two figures is the binding minimum. For typical 240 / 415 V commercial work, Table A444.2 dominates open-air separation; Table A444.1 dominates inside containment."
          />

          {/* Separation hierarchy diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Annex A444 Table A444.1 — separation hierarchy by containment type
            </h4>
            <svg
              viewBox="0 0 900 600"
              className="w-full h-auto"
              role="img"
              aria-label="Three-row diagram showing the BS 7671 Annex A444 Table A444.1 separation hierarchy. Row one: no containment or open metallic containment type A, power and data cables separated by 200 millimetres in free air. Row two: perforated open metallic containment type B, separation 150 millimetres. Row three: fully enclosed solid metallic containment type C, zero millimetres physical separation. Each row has a containment label above and the separation distance label above the gap, with no overlapping text. A footer summarises the principle that more containment equals less air-gap separation."
            >
              {/* Header */}
              <text
                x="450"
                y="28"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                SEPARATION HIERARCHY — POWER (BAND II) vs DATA (BAND I)
              </text>

              {/* ===== Row 1: Type A — 200 mm ===== */}
              <text
                x="60"
                y="62"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.04em"
              >
                A · NO CONTAINMENT / OPEN METALLIC TYPE A
              </text>
              <text
                x="450"
                y="84"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                200 mm free air
              </text>
              <rect
                x="60"
                y="100"
                width="200"
                height="30"
                rx="4"
                fill="rgba(239,68,68,0.20)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="160"
                y="119"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                POWER 240 V
              </text>
              <line
                x1="270"
                y1="115"
                x2="630"
                y2="115"
                stroke="#FCD34D"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <polygon points="270,115 280,110 280,120" fill="#FCD34D" />
              <polygon points="630,115 620,110 620,120" fill="#FCD34D" />
              <rect
                x="640"
                y="100"
                width="200"
                height="30"
                rx="4"
                fill="rgba(250,204,21,0.20)"
                stroke="#FACC15"
                strokeWidth="1.6"
              />
              <text
                x="740"
                y="119"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                DATA Cat6A
              </text>
              <text
                x="160"
                y="148"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                on welded mesh basket
              </text>
              <text
                x="740"
                y="148"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                on welded mesh basket
              </text>

              {/* ===== Row 2: Type B — 150 mm ===== */}
              <text
                x="60"
                y="200"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.04em"
              >
                B · PERFORATED OPEN METALLIC TYPE B
              </text>
              <text
                x="450"
                y="222"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                150 mm
              </text>
              <path
                d="M 56 270 L 56 240 L 264 240 L 264 270"
                fill="none"
                stroke="#22D3EE"
                strokeWidth="2"
              />
              {[80, 100, 120, 140, 160, 180, 200, 220, 240].map((cx) => (
                <circle key={'pf-' + cx} cx={cx} cy="262" r="1.6" fill="#22D3EE" />
              ))}
              <rect
                x="60"
                y="244"
                width="200"
                height="22"
                rx="3"
                fill="rgba(239,68,68,0.20)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="259"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                POWER 240 V
              </text>
              <line
                x1="270"
                y1="255"
                x2="630"
                y2="255"
                stroke="#FCD34D"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <polygon points="270,255 280,250 280,260" fill="#FCD34D" />
              <polygon points="630,255 620,250 620,260" fill="#FCD34D" />
              <rect
                x="640"
                y="244"
                width="200"
                height="22"
                rx="3"
                fill="rgba(250,204,21,0.20)"
                stroke="#FACC15"
                strokeWidth="1.6"
              />
              <text
                x="740"
                y="259"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                DATA Cat6A
              </text>
              <text
                x="160"
                y="290"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                tray ≤ 20 % perf · 1.0 mm wall
              </text>
              <text
                x="740"
                y="290"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                on basket (open type A)
              </text>

              {/* ===== Row 3: Type C — 0 mm ===== */}
              <text
                x="60"
                y="342"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.04em"
              >
                C · SOLID METALLIC FULLY ENCLOSED TYPE C
              </text>
              <text
                x="450"
                y="364"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                0 mm — Note 4
              </text>
              <rect
                x="56"
                y="380"
                width="208"
                height="34"
                rx="3"
                fill="none"
                stroke="#22D3EE"
                strokeWidth="2.4"
              />
              <rect
                x="64"
                y="386"
                width="192"
                height="22"
                rx="2"
                fill="rgba(239,68,68,0.20)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="401"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                POWER 240 V
              </text>
              <line
                x1="270"
                y1="397"
                x2="630"
                y2="397"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              <rect
                x="640"
                y="386"
                width="200"
                height="22"
                rx="3"
                fill="rgba(250,204,21,0.20)"
                stroke="#FACC15"
                strokeWidth="1.6"
              />
              <text
                x="740"
                y="401"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                DATA Cat6A
              </text>
              <text
                x="160"
                y="432"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                solid steel trunking ≥ 1.5 mm
              </text>
              <text
                x="740"
                y="432"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                free air or basket
              </text>

              {/* ===== Footer / legend panel ===== */}
              <rect
                x="40"
                y="464"
                width="820"
                height="124"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="488"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                PRINCIPLE
              </text>
              <text x="60" y="508" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                More containment between Band II and Band I = less air-gap separation needed.
              </text>
              <text x="60" y="526" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Read symmetrically — better screening on EITHER side of the run reduces the required
                gap.
              </text>
              <text
                x="60"
                y="552"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                PLUS
              </text>
              <text x="60" y="572" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Apply Table A444.2 voltage / current scaling: 240 V → 0.45 m, 415 V → 0.58 m. Higher
                of the two binds.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.6.1 (Segregation general — verbatim)"
            clause={
              <>
                Cables that are used at voltage Band II (low voltage) and cables that are used at
                voltage Band I (extra-low voltage) which share the same cable management system or
                the same route, shall be installed according to the requirements of Regulations
                [528.1, 528.2, 528.3].
              </>
            }
            meaning="§444.6.1 is the gateway from the EMC chapter (§444) into the proximity / segregation chapter (§528). It refers Band I / Band II shared-containment compliance back to §528.1, §528.2 and §528.3. The verbatim text of §528.1 is not reproduced here — refer to the printed copy of BS 7671:2018+A4:2026 for §528.1 verbatim. The summary: insulate for the highest voltage present, OR partition / separate compartments. §528.2 (verbatim available) confirms same-band circuits might still need segregation."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §528.2 (Same-band segregation — verbatim)"
            clause={
              <>
                Circuits of the same voltage band might also require segregation or separation.
                <br />
                Electrical safety and electromagnetic compatibility might produce different
                segregation or separation requirements.
                <br />
                The design shall meet both requirements.
              </>
            }
            meaning="§528.2 verbatim. Practical reading: same-voltage-band circuits — for example two ELV circuits like data and fire-alarm, or data and BMS sensors — can still need segregation if their EMC characteristics differ. The clause requires the design to meet BOTH electrical-safety AND electromagnetic-compatibility segregation needs. Whichever is more onerous binds. On data jobs, this is the cite for keeping PoE++ data cables separated from fire-alarm / nurse-call / similar low-emission ELV circuits."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.6.2 (ICT vs HID lamps — verbatim)"
            clause={
              <>
                The minimum distance between information and communications technology cables and
                discharge, neon and mercury vapour (or other high-intensity discharge) lamps shall
                be 130 mm. In this regard, low energy lamps (CFL) are to be considered as gas
                discharge sources. Data wiring racks and electrical equipment shall always be
                separated.
              </>
            }
            meaning="§444.6.2 verbatim. The 130 mm separation is independent of the §444.6.1 / Annex A444 power-vs-data segregation — HID lamps and CFL emit electromagnetic interference at frequencies that affect ICT cabling regardless of voltage band. Plan basket / tray routes around recessed lamp positions. The clause also requires data wiring racks and electrical equipment to be separated — relevant to comms-room layout (Module 4 Section 5)."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Bend radius — the lifelong cable performance rule</ContentEyebrow>

          <ConceptBlock
            title="4× cable OD during install · 8× OD at terminations · permanent damage if violated"
            plainEnglish="Balanced twisted-pair cable performance — Cat5e through Cat8 — depends on the precise twist-lay geometry of each pair. The cable is manufactured with a specific number of twists per metre per pair, with the four pairs in the bundle each twisted at a different rate to maximise crosstalk rejection. Bend the cable too tightly and the pair-twist deforms permanently. The damage is cumulative and persistent. The cable does not heal when the bend is straightened. Insertion loss rises, return loss degrades, NEXT increases — all of them stay degraded for the cable's life."
            onSite="The 4× / 8× rule is the install-practice number to remember. For a typical Cat6A solid cable at 7.5 mm OD: 30 mm minimum bend radius during installation, 60 mm at terminations and behind faceplates. Practically, that means generous drop-spaces from basket to outlet, generous patch-panel termination radii, and no sharp bends on any pull. If the installer kinks a cable during the pull, it does not matter that the kink was 'temporary' — the geometry damage is done."
          >
            <p>The two bend-radius rules and what they apply to:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>4× cable outer diameter — during installation.</strong> The looser of the
                two rules. Applies during the pull, including any temporary deflection around
                obstacles. For a 7.5 mm OD Cat6A, that is 30 mm minimum bend radius. BS EN 50174-2 /
                TIA-568.0-E install-practice rule.
              </li>
              <li>
                <strong>
                  8× cable outer diameter — at terminations and dressed final positions.
                </strong>{' '}
                The tighter of the two rules. Applies at every termination point, behind faceplates,
                inside patch panels, at consolidation points, and at any other final-state bend. For
                a 7.5 mm OD Cat6A, 60 mm minimum bend radius.
              </li>
              <li>
                <strong>Stranded cord cable.</strong> Patch / equipment / work-area cords have
                separate, looser bend-radius rules — typically built into the cord assembly itself
                by the manufacturer. Cords are designed for flex; solid horizontal cable is not.
              </li>
            </ul>
            <p>
              The deeper reason is the physics of balanced twisted pair. The four pairs are twisted
              at different rates so adjacent pairs reject each other's electromagnetic fields by
              phase cancellation — that is what gives Cat6A its NEXT performance. Deform the twist
              lay and the cancellation breaks down. The break-down is local to the bend, but the
              channel sees its insertion-loss penalty over the full link length. Cat6A and Cat8 are
              more sensitive to this than Cat5e because their performance margin is tighter.
            </p>
          </ConceptBlock>

          {/* Bend radius diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Bend radius rules — 4× during install, 8× at terminations
            </h4>
            <svg
              viewBox="0 0 900 480"
              className="w-full h-auto"
              role="img"
              aria-label="Side-by-side diagram showing the two bend-radius rules. Left: a circle representing 4× cable outer diameter, with a yellow cable shown bending around its edge — applies during installation, with worked example for a 7.5 millimetre cable giving a 30 millimetre minimum radius. Right: a smaller circle representing 8× cable outer diameter at terminations, giving 60 millimetres minimum radius. Each circle has its title above and worked-example labels in a dedicated row below. A footer panel explains the permanent-damage rule for the pair-twist geometry."
            >
              {/* Header */}
              <text
                x="450"
                y="28"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BEND RADIUS — Cat5e through Cat8 BALANCED TWISTED PAIR
              </text>

              {/* ===== LEFT panel — 4× OD ===== */}
              <rect
                x="40"
                y="56"
                width="400"
                height="320"
                rx="10"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />

              {/* Title row (above circle) */}
              <text
                x="240"
                y="84"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                4× CABLE OD — DURING INSTALLATION
              </text>
              <text
                x="240"
                y="102"
                textAnchor="middle"
                fill="#DCFCE7"
                fontSize="10"
                fontFamily="system-ui"
              >
                looser rule · applies during the pull
              </text>

              {/* Circle: 4× OD = 30 mm radius — drawn at scale 60 px radius (so 120 dia) centred at (240, 200) */}
              <circle
                cx="240"
                cy="200"
                r="60"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
              {/* Cable bending around circle (yellow arc tracing top of circle) */}
              <path
                d="M 160 200 A 80 80 0 0 1 320 200"
                fill="none"
                stroke="#FACC15"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Radius arrow (clear of all text rows) */}
              <line x1="240" y1="200" x2="299" y2="200" stroke="#22D3EE" strokeWidth="1.4" />
              <polygon points="299,200 290,196 290,204" fill="#22D3EE" />
              {/* R label sits inside the dashed circle — circle is the labelled container, R is its label */}
              <text
                x="270"
                y="218"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                R
              </text>

              {/* Worked example row — well below circle */}
              <text
                x="60"
                y="296"
                fill="#FEF3C7"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.04em"
              >
                EXAMPLE — Cat6A solid · OD 7.5 mm
              </text>
              <text x="60" y="316" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Minimum radius during install = 30 mm
              </text>
              <text x="60" y="334" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                (4 × 7.5 = 30 mm)
              </text>
              <text x="60" y="358" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                BS EN 50174-2 / TIA-568.0-E install practice
              </text>

              {/* ===== RIGHT panel — 8× OD ===== */}
              <rect
                x="460"
                y="56"
                width="400"
                height="320"
                rx="10"
                fill="rgba(239,68,68,0.08)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />

              <text
                x="660"
                y="84"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                8× CABLE OD — AT TERMINATIONS
              </text>
              <text
                x="660"
                y="102"
                textAnchor="middle"
                fill="#FEE2E2"
                fontSize="10"
                fontFamily="system-ui"
              >
                tighter rule · faceplates · patch panels · dressed bends
              </text>

              {/* Larger circle representing 8× OD relative to the 4× one — 90 px radius — same centre y */}
              <circle
                cx="660"
                cy="210"
                r="90"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
              <path
                d="M 540 210 A 120 120 0 0 1 780 210"
                fill="none"
                stroke="#FACC15"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <line x1="660" y1="210" x2="749" y2="210" stroke="#22D3EE" strokeWidth="1.4" />
              <polygon points="749,210 740,206 740,214" fill="#22D3EE" />
              <text
                x="700"
                y="228"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                R
              </text>

              {/* Worked example row */}
              <text
                x="480"
                y="316"
                fill="#FEF3C7"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.04em"
              >
                EXAMPLE — Cat6A solid · OD 7.5 mm
              </text>
              <text x="480" y="336" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Minimum radius at termination = 60 mm
              </text>
              <text x="480" y="354" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                (8 × 7.5 = 60 mm)
              </text>

              {/* ===== Footer panel ===== */}
              <rect
                x="40"
                y="396"
                width="820"
                height="76"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="420"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                WHY THE RULE IS PERMANENT
              </text>
              <text x="60" y="440" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Pair-twist geometry deforms when bent too tight. Damage is CUMULATIVE and
                PERSISTENT.
              </text>
              <text x="60" y="458" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Insertion loss rises, return loss degrades, NEXT increases — and stays degraded.
                Test to TIA-1152-A / BS EN 50346.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Proximity to non-electrical services</ContentEyebrow>

          <ConceptBlock
            title="§528.3 — heat, condensation, mechanical risk, lift wells"
            plainEnglish="BS 7671 §528.3.1 through §528.3.5 covers proximity to non-electrical services — heat / smoke / fume sources, condensation-prone services, and lift / hoist wells. The clauses apply to all wiring systems, not just data, but they directly shape data cabling routes through plant rooms, service shafts and risers."
            onSite="On every survey, walk the proposed cable routes against the building services drawings. Hot pipework? Plan around it. Steam line? Plan around it. Condensate-prone service? Route the cabling above it (so condensation cannot drip on it) or use protective shielding. Lift well? Cables only inside the lift installation per BS EN 81 — no exceptions. The rules are simple but rigorous."
          >
            <p>The §528.3.x rules, with the verbatim hooks they hang on:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§528.3.1 — heat / smoke / fumes.</strong> Wiring shall not be installed near
                services producing heat / smoke / fumes likely to be detrimental, unless shielded so
                as not to affect the dissipation of heat from the wiring. In service shafts and
                cavities, cables shall be laid so as not to be exposed to harmful influence by
                adjacent installations (gas, water, steam).
              </li>
              <li>
                <strong>§528.3.2 — below condensation services.</strong> Where wiring is routed
                below services liable to cause condensation (water, steam, gas), precautions shall
                be taken to protect the wiring system from deleterious effects.
              </li>
              <li>
                <strong>§528.3.3 — proximity to non-electrical services.</strong> Where an
                electrical service is in proximity to non-electrical services, it shall be arranged
                so foreseeable operation on the other services will not damage the electrical
                service or vice versa.
              </li>
              <li>
                <strong>§528.3.4 — close proximity.</strong> Both: the wiring system shall be
                suitably protected against hazards arising from the other services in normal use;
                AND fault protection per Section 411.
              </li>
              <li>
                <strong>§528.3.5 — lift / hoist wells.</strong> No cable shall be run in a lift or
                hoist well unless it forms part of the lift installation as defined in BS EN 81
                series. This is the cleanest cite — never route data cabling through a lift shaft.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Pulling Cat6A through a kinked spot during a difficult ceiling-void run"
            whatHappens={
              <>
                Tight ceiling void with structural steel obstruction. Installer pulls a Cat6A
                horizontal through with a forced 15 mm radius bend at one beam — about 2× cable OD
                instead of the 4× minimum. The bend lasts about 90 seconds during the pull. Cable
                looks fine at termination. Channel test fails — Class EA marginal pass on NEXT, fail
                on insertion loss. The far end of the link is 80 m away; the failure is at the bend,
                but the test sees it everywhere.
              </>
            }
            doInstead={
              <>
                Stop the pull, re-route around the obstruction, or use an additional support to give
                the cable a wider sweep. The 4× OD install rule applies during the pull — any forced
                bend below it deforms the pair-twist geometry permanently. There is no fix for a
                deformed cable — replace the link end-to-end. Plan ahead: walk the ceiling void in
                advance, mark obstructions, place basket / saddles to give the cable a continuous
                gentle path. The 5 minutes you save by forcing a tight bend cost a full link
                replacement.
              </>
            }
          />

          <Scenario
            title="A power circuit and a Cat6A bundle have to share a cable basket for 3 m of corridor — how do you make it compliant?"
            situation={
              <>
                A retrofit fit-out. Existing 240 V single-phase final circuit on basket; new Cat6A
                horizontal run needs to share the same basket for a 3 m stretch of corridor before
                splitting off. Annex A444 Table A444.1 + Table A444.2 are in play. The basket is
                welded mesh (open metallic containment type A).
              </>
            }
            whatToDo={
              <>
                Three options, in order of preference: (1) install a steel divider (partition)
                inside the basket to create two compartments — the divider screens the two cable
                bundles, qualifying the data side as effectively type B (perforated metallic
                containment) and dropping the separation requirement; (2) install solid steel
                trunking around the power circuit for the shared 3 m, converting the power side to
                type C and removing the physical separation requirement entirely (Note 4); (3)
                physically separate the two by 200 mm in free air for the shared stretch with no
                shared basket. Option (1) is usually cheapest and cleanest. Whichever option, also
                check Table A444.2 — at 240 V, the voltage scaling is 0.45 m in free air, so the
                containment-based options dominate.
              </>
            }
            whyItMatters={
              <>
                Annex A444 is read as a hierarchy — better screening on EITHER side of a shared run
                reduces the air-gap separation. The competent contractor reads both tables together,
                picks the lowest-cost option that satisfies the more onerous of the two figures, and
                documents the rationale in the as-built record.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Annex A444 Table A444.1 — separation hierarchy by containment: 200 mm (no containment / open type A), 150 mm (perforated open type B), 0 mm (solid metallic type C, Note 4). More containment = less air-gap separation.',
              'Annex A444 Table A444.2 — voltage / current scaling: 240 V → 0.45 m, 415 V → 0.58 m, 11 kV → 1.4 m. Read alongside Table A444.1; the more onerous figure binds.',
              '§444.6.1 references §528.1, §528.2, §528.3. §528.1 verbatim is in the printed copy of BS 7671 only — the summary is "insulate for the highest voltage OR partition". §528.2 applies same-band segregation. §444.6.2 fixes 130 mm from HID / CFL.',
              'Bend radius: 4× cable OD during installation, 8× OD at terminations / behind faceplates. The rule is a lifelong cable performance requirement — pair-twist geometry damage is permanent.',
              '§528.3.x covers proximity to non-electrical services: heat / smoke / fumes (.1), condensation (.2), foreseeable operations (.3), close proximity with fault protection (.4), lift wells prohibited unless part of the lift installation per BS EN 81 (.5).',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4-section-1')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Containment Systems
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Fire-Stopping and Penetration Sealing
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule4Section2;
