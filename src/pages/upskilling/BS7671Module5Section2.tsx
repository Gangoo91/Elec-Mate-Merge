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
    id: 'm5s2-cable-types',
    question:
      'You are wiring the supply to a new garden office in surface-clipped trunking, then transitioning to direct burial in the customer&apos;s lawn. Which cable family is the correct primary choice for the buried section?',
    options: [
      '6242Y twin and earth (T&E)',
      '6491X singles inside flexible conduit',
      'SWA (steel wire armoured) — typically 6943X / BS 5467',
      'FP200 fire-rated cable',
    ],
    correctIndex: 2,
    explanation:
      'Reg 521.5 plus Reg 522.8 require the cable to withstand the mechanical stresses of the route. T&E (6242Y) is not designed for direct burial and has no integral mechanical protection. SWA provides the steel-wire armour layer that meets Reg 522.8.10 for buried cables, and the armour acts as a CPC (subject to Reg 543.2 sizing). FP200 is fire-rated for life-safety circuits, not buried supplies. 6491X singles in flex conduit fail the burial mechanical test on their own.',
  },
  {
    id: 'm5s2-reference-method-c',
    question:
      'A 2.5 mm&sup2; T&E lighting circuit is clipped direct to the underside of joists in a loft, with no thermal insulation in contact. Which Reference Method from BS 7671 Appendix 4 applies?',
    options: [
      'Reference Method A — enclosed in conduit in a thermally insulating wall',
      'Reference Method C — clipped direct',
      'Reference Method 100 — above a plasterboard ceiling covered by thermal insulation',
      'Reference Method D — direct in ground',
    ],
    correctIndex: 1,
    explanation:
      'Reference Method C (clipped direct to a non-metallic surface, in free air) is the App 4 method for cables clipped to joists with no contact to thermal insulation. Method A applies when the cable is enclosed in conduit inside a thermally insulating wall. Methods 100&ndash;103 apply where the cable is above or surrounded by thermal insulation. Method D is reserved for direct-buried cables. The selected method drives the column read in Tables 4D2A, 4D5, etc.',
  },
  {
    id: 'm5s2-grouping-factor',
    question:
      'You have six 2.5 mm&sup2; T&E circuits bunched together and clipped to a single timber batten in a roof void. What Cg (grouping) correction factor would you typically apply?',
    options: [
      '1.00 — no correction needed',
      '0.80 — two circuits bunched',
      '0.57 — six circuits bunched (Table 4C1)',
      '0.30 — derate by half regardless',
    ],
    correctIndex: 2,
    explanation:
      'Table 4C1 in App 4 gives the grouping correction (Cg) for cables bunched and clipped direct or on a perforated tray. For 6 bunched circuits, Cg ~ 0.57. The corrected current-carrying capacity is Iz = It &times; Ca &times; Cg &times; Ci &times; Cf, so a 27 A nominal becomes ~15.4 A &mdash; usually below the design current of a typical socket ring. Grouping is the single most under-applied derating factor on apprentice paperwork.',
  },
  {
    id: 'm5s2-thermal-insulation',
    question:
      'A cable runs above a plasterboard ceiling that has 270 mm of loft insulation laid over it, with the cable in contact with the insulation on one side. Which Reference Method applies and what Ci factor (broadly) is in play?',
    options: [
      'Method C, Ci = 1.00',
      'Method 101 (above plasterboard, in contact with insulation on one side), Ci ~ 0.75 to 0.78 depending on size',
      'Method D, Ci = 0.50',
      'Method A, no Ci needed',
    ],
    correctIndex: 1,
    explanation:
      'Methods 100&ndash;103 cover cables above a plasterboard ceiling with thermal insulation. Method 101 is the case where the cable is in contact with the ceiling and surrounded by insulation on one side. The Ci factor varies with conductor size but typically sits in the 0.72&ndash;0.78 range. App 4 Table 4A2 lists the methods; Section 523.7 / 523.8 of BS 7671 is the regulation hook. Always check whether the cable is fully enveloped (worst case) versus partially in contact (better).',
  },
  {
    id: 'm5s2-voltage-drop-domestic',
    question:
      'Reg 525.201 sets a default voltage-drop limit for low-voltage final circuits in installations supplied directly from a public LV distribution system. What is it for lighting?',
    options: [
      '8% &mdash; same as everything else',
      '5% for both lighting and other uses',
      '3% lighting / 5% other uses',
      '6% lighting / 8% other uses',
    ],
    correctIndex: 2,
    explanation:
      'Reg 525.201 (in conjunction with Table 4Ab in App 4) gives the public-supply baseline: 3% for lighting, 5% for other uses. Reg 525.202 covers private-supply systems with longer runs, raising the cap to 6% lighting / 8% other uses. The percentages are of nominal voltage (230 V), so 3% = 6.9 V on a lighting final circuit. The mV/A&middot;m method in Tables 4D2B/4D5B converts this directly into a length limit per cable size and load.',
  },
  {
    id: 'm5s2-522-6-cables-walls',
    question:
      'You are running 2.5 mm&sup2; T&E vertically inside a stud wall behind plasterboard at 30 mm depth. Reg 522.6.202 (cables concealed in walls) applies. Which protective measure is acceptable on its own?',
    options: [
      'Run the cable horizontally only &mdash; no protection needed',
      'Run within a permitted zone, protected by a 30 mA RCD (Reg 522.6.202 (iv))',
      'Protect with steel capping only &mdash; no RCD required',
      'Mark the route with a label &mdash; sufficient under Reg 522.6.203',
    ],
    correctIndex: 1,
    explanation:
      'Reg 522.6.202 lists four routes for cables concealed in walls at depths less than 50 mm. The most commonly used is option (iv): the cable is run in a prescribed safe zone AND the circuit is protected by a 30 mA RCD that operates within 40 ms at 5&middot;I&Delta;n. The other options are: 50 mm+ depth (i), earthed metallic covering (ii), mechanical protection sufficient against nails/screws (iii), or use of cables with earthed metallic screen / armour (v). A label alone is never sufficient.',
  },
  {
    id: 'm5s2-iz-formula',
    question:
      'A 6 mm&sup2; T&E cable has a nominal It of 47 A in Reference Method C from Table 4D5. The route passes through a roof void at Ca = 0.94, bunched with 3 other circuits at Cg = 0.65, and is partly in thermal insulation at Ci = 0.78. What is the corrected Iz?',
    options: [
      '47 A &mdash; the nominal rating is what counts',
      '~22.4 A',
      '~30 A &mdash; only the worst factor applies',
      '~47 &times; 0.78 = 36.7 A &mdash; only the smallest factor matters',
    ],
    correctIndex: 1,
    explanation:
      'Iz = It &times; Ca &times; Cg &times; Ci &times; Cf. Multiply ALL applicable correction factors together &mdash; do not just pick the worst. 47 &times; 0.94 &times; 0.65 &times; 0.78 = ~22.4 A. (Cf would also apply if a BS 3036 rewireable fuse were used, adding a 0.725 derate.) The protective device In must be &le; Iz, and Ib &le; In &le; Iz must hold throughout. Mis-selecting cable on the basis of the nominal It only is one of the most common assessment failures.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 7671 regulation is the headline rule that the cable type must be suitable for the installation conditions and the external influences it will encounter?',
    options: [
      'Reg 411.3.1 &mdash; protective earthing',
      'Reg 521.5 &mdash; types of wiring system in relation to types of installation',
      'Reg 314.1 &mdash; division of installation',
      'Reg 433.1.1 &mdash; coordination of conductor and protective device',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 521.5 is the umbrella requirement that the type of wiring system selected shall be suitable for the type of installation, mode of installation, and the external influences encountered. It is the legal hook for everything that follows in 521 and 522 &mdash; cable type selection, mechanical impact (522.6), thermal effects (522.2), water/moisture (522.3), corrosive substances (522.5), and so on. Always cite 521.5 alongside the more specific regulation when justifying a cable choice.',
  },
  {
    id: 2,
    question:
      'A surface-mounted cable runs 12 m vertically up a brick wall in a commercial workshop, then through a metallic conduit. Which TWO regulations are most directly engaged with respect to mechanical damage?',
    options: [
      'Reg 411.3.4 (luminaire RCD) and Reg 525.201 (voltage drop)',
      'Reg 522.6 (mechanical impact) and Reg 522.8 (mechanical stress)',
      'Reg 314.2 (parallel cables) and Reg 525.202 (private supplies)',
      'Reg 543.1.1 (CPC sizing) and Reg 411.3.3 (socket RCD)',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 522.6 covers external influence AG (mechanical impact) &mdash; impact from tools, traffic, falling objects. Reg 522.8 covers AJ (mechanical stress) &mdash; tension, compression, bending radii, vibration. The two regulations are routinely confused but are distinct: 522.6 is about something hitting the cable, 522.8 is about the cable being stressed by the route or fixings. A workshop install needs both addressed in the design notes on the EIC.',
  },
  {
    id: 3,
    question:
      'When using mV/A&middot;m values from App 4 Table 4D5B for a 230 V single-phase circuit, how do you compute the voltage drop along a run?',
    options: [
      'mV/A&middot;m &times; current &times; length / 1000',
      'mV/A&middot;m &times; voltage / current',
      'mV/A&middot;m / cable length only',
      'mV/A&middot;m &times; resistance per metre',
    ],
    correctAnswer: 0,
    explanation:
      'Voltage drop = (mV/A&middot;m table value) &times; design current (A) &times; route length (m) / 1000. The /1000 converts mV to V. For 3-phase circuits, use the relevant 4D4B / 4E4B columns and divide by &radic;3 where appropriate. Always use the design current Ib (not the device rating In) and the actual route length, not the straight-line distance.',
  },
  {
    id: 4,
    question:
      'Reg 525.201 sets a default voltage-drop limit for low-voltage installations supplied directly from a public LV system. What does Reg 525.202 add?',
    options: [
      'It removes the voltage-drop limit entirely for industrial systems',
      'It increases the limit to 6% lighting / 8% other uses for private-supply systems where the run from origin is long',
      'It mandates a 1% margin for inrush',
      'It applies only to fire-alarm systems',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 525.202 covers installations not supplied from the public LV network &mdash; private generators, large industrial sites with own transformer, off-grid solar/battery systems. The cap rises to 6% lighting / 8% other uses, recognising that the run from the source is typically much longer. The same mV/A&middot;m calculation is used, just against the higher percentage of nominal voltage.',
  },
  {
    id: 5,
    question:
      'A circuit is protected by a BS 3036 rewireable fuse. Which correction factor must be applied to the cable&apos;s nominal current-carrying capacity, and at what value?',
    options: [
      'No factor &mdash; BS 3036 fuses are no longer recognised',
      'Cf = 0.725 &mdash; multiplied into the Iz equation alongside Ca, Cg, Ci',
      'Cf = 1.5 &mdash; the cable is uprated, not derated',
      'Cf = 0.50 &mdash; applied only when grouped',
    ],
    correctAnswer: 1,
    explanation:
      'BS 3036 rewireable (semi-enclosed) fuses have a notably higher fusing factor than HBC fuses or MCBs &mdash; they may carry up to ~2&times; rated current for extended periods before clearing. App 4 of BS 7671 prescribes Cf = 0.725 to be applied within Iz = It &times; Ca &times; Cg &times; Ci &times; Cf when a BS 3036 fuse protects the circuit. Modern installations rarely use BS 3036, but they are still encountered on EICRs of older properties &mdash; spotting it is part of the inspection.',
  },
  {
    id: 6,
    question:
      'You have an underfloor lighting feed running for 8 m through 100 mm of mineral-wool loft insulation, fully surrounded. Which Reference Method from BS 7671 / IET App 4 is the closest match?',
    options: [
      'Method 100 &mdash; above plasterboard, no insulation contact',
      'Method 101 &mdash; in contact with insulation on one side only',
      'Method 102 &mdash; surrounded by insulation on more than one side but not enclosed',
      'Method 103 &mdash; cable entirely enclosed within thermal insulation (worst case)',
    ],
    correctAnswer: 3,
    explanation:
      'Methods 100&ndash;103 describe progressively worse thermal-insulation conditions. Method 100: cable above the plasterboard ceiling but no insulation contact. Method 101: in contact with insulation on one side. Method 102: surrounded but not enclosed. Method 103: fully enclosed within thermal insulation &mdash; the worst case, with the largest Ci derate. The Ci factors are listed in App 4 against conductor size and method.',
  },
  {
    id: 7,
    question:
      'BS 7671 Reg 522.6.203 introduces an additional concealed-cable rule for installations where unskilled (ordinary) persons may be expected to use the premises. What does the regulation actually require?',
    options: [
      'Cables in walls must always be SWA',
      'Concealed cables in walls/partitions of dwellings must be protected by a 30 mA RCD AND run in safe zones (or have steel capping/screens)',
      'All cables in dwellings must be FP200 fire-rated',
      'Only horizontal runs are permitted; vertical runs are forbidden',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 522.6.202 + 522.6.203 together require, for cables concealed in walls/partitions at depth &lt; 50 mm in domestic premises (and other locations used by ordinary persons), one of: depth &ge; 50 mm, earthed metallic covering, mechanical protection (capping/conduit) sufficient against the expected impact, or run in a permitted safe zone PLUS 30 mA RCD additional protection. Most rewires use the safe-zone + 30 mA RCD route because A4:2026 already mandates 30 mA RCD on luminaire circuits anyway (Reg 411.3.4).',
  },
  {
    id: 8,
    question:
      'Reg 522.8.10 (cables in or against the ground) refers you to Reference Method D. What is the typical minimum burial depth recommended for direct-buried cables, and what additional protection is normally specified?',
    options: [
      '50 mm depth, no extra protection',
      '500 mm depth (deeper under driveways), with marker tape and/or cable tiles above the cable',
      '2 m depth, encased in concrete',
      '100 mm depth, ducted in PVC only',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 itself does not give a hard minimum depth (this is in the IET On-Site Guide and DNO/HSE guidance); the practical default is 500 mm under footpaths/lawns and 600&ndash;750 mm under vehicular access. Reg 522.8.10 requires the cable to be at sufficient depth to avoid damage from reasonably foreseeable disturbance, with marker tape (typically yellow or warning-printed) above the cable and cable tiles where the depth is below the typical recommendation. Reference Method D (Tables 4D4A / 4E4A) is the App 4 column to read for buried-cable CCC.',
  },
];

const faqItems = [
  {
    question: 'Why does Cg apply even when the cables are in different circuits?',
    answer:
      'Heat dissipation is what drives Cg, not electrical interaction. Two cables touching each other &mdash; whether the same circuit or different circuits &mdash; both put heat into each other, raising conductor temperature and reducing the safe current rating. App 4 Table 4C1 gives Cg values for cables bunched and clipped direct or on a perforated tray based purely on count, not function. Mentally separate electrical grouping (bonding considerations) from thermal grouping (Cg) &mdash; only the second drives the App 4 derate.',
  },
  {
    question: 'Do I always have to apply ALL of Ca, Cg, Ci and Cf?',
    answer:
      'Apply each factor only where the condition exists. Ca (ambient temperature) defaults to 1.00 at 30&deg;C and only changes if the actual ambient differs. Cg (grouping) only applies when more than one circuit is bunched in a way the table covers. Ci (thermal insulation) only applies when the cable is in or surrounded by thermal insulation per Methods 100&ndash;103. Cf (BS 3036 rewireable fuse) only applies when that fuse is the protective device. If a factor does not apply, leave it as 1.00 in the formula. Never default everything to 1.00 to make the maths easier &mdash; that is how cables get under-rated.',
  },
  {
    question: 'When can I use T&E (6242Y) and when must I move to SWA?',
    answer:
      'T&E is fine for general fixed wiring where it is clipped, in conduit, in trunking, or run in safe zones in walls and ceilings &mdash; the ordinary domestic and commercial fixed-wiring scenario. Move to SWA whenever Reg 522.6 (mechanical impact) or 522.8 (mechanical stress) cannot be satisfied by T&E alone: direct burial, exposed external runs, plant rooms with tools or vehicles passing, cable trays where impact is foreseeable, or where the route requires the steel armour to act as a CPC. Specialist scenarios (fire-survival, mineral, chemical) bring in FP200/FP400, MICC, Hi-Tuf and the BS 5839 fire-alarm cable family.',
  },
  {
    question: 'What is the difference between LSF and LSZH cable?',
    answer:
      'LSF (Low Smoke and Fume) cables emit reduced smoke and reduced halogen gas in a fire compared to standard PVC, but typically still contain some halogenated material. LSZH (Low Smoke Zero Halogen) is the stricter standard &mdash; the cable sheath releases essentially no halogen gas when burned, reducing toxic fume risk and acid-corrosion damage to nearby equipment. LSZH is mandatory in many public buildings, escape routes, plant rooms with sensitive electronics, and increasingly specified for HMOs and student accommodation. Reg 521.5 plus the building&apos;s fire strategy determines which to specify.',
  },
  {
    question: 'How does Reg 522.6.202 interact with the new Reg 411.3.4 luminaire RCD rule?',
    answer:
      'They reinforce each other on domestic installations. Reg 522.6.202 (iv) lets you run cables in safe zones at depths &lt; 50 mm provided the circuit has 30 mA RCD additional protection. Reg 411.3.4 (new in A4:2026) makes 30 mA RCD additional protection mandatory on every domestic luminaire circuit. So for a typical rewire with cables clipped to studs behind plasterboard, the same 30 mA RCD/RCBO satisfies both regulations simultaneously. Pre-A4 installations may have lighting circuits without RCD and still meet 522.6.202 via depth or capping &mdash; A4 closes that gap going forward.',
  },
  {
    question: 'Are A4:2026 changes to App 4 buried-cable methods significant?',
    answer:
      'A4 introduces refinements to Reference Method D (cables in or against the ground), particularly around burial conditions, soil thermal resistivity assumptions, and the interaction with thermal insulation around buried cables. The headline values for typical UK soils have not radically changed but the App 4 tables have been republished &mdash; always work from the in-force edition (BS 7671:2018+A4:2026) when sizing buried cables, not the A2 or A3 versions. Where soil conditions are unusual (rocky, very dry, peat) the designer still has to depart from the table values with documented justification under Reg 120.3.',
  },
  {
    question: 'What is the right way to size a CPC when using SWA armour as the CPC?',
    answer:
      'The armour must satisfy Reg 543.1.1 (the adiabatic equation S &ge; &radic;(I&sup2; &middot; t) / k) using the correct k value from Table 54.4 for steel armour and the cable insulation in use. For most modern thermosetting (XLPE) SWA, the armour CSA easily meets the CPC requirement for cable sizes commonly used &mdash; the manufacturer&apos;s armour-CSA tables (Prysmian, Doncaster, etc.) typically confirm this. Where the armour is borderline (very large cables or short adiabatic time), you add a separate CPC inside the SWA or upsize the armour. The selection appears on the EIC schedule of inspection and is verified by R2 measurement on test.',
  },
  {
    question: 'Do I need to consider mutual heating from cables in adjacent enclosures?',
    answer:
      'Reg 523.5 / 523.6 cover mutual heating &mdash; cables in adjacent ducts, conduits or trunking still affect each other thermally. App 4 distinguishes between bunched (touching, in one enclosure) and in adjacent enclosures. The Cg factor for adjacent runs is gentler than for bunching, but it is not 1.00. Where a building has multiple parallel runs (e.g. busbar trunking flanked by SWA), the design should reference the manufacturer&apos;s curve or BS EN IEC 60364-5-52 Annex B. On EICRs, mutual heating is one of the things that gets missed because the inspector only sees the destination cable, not the parallel run upstream.',
  },
  {
    question: 'Does voltage drop ever drive cable size more than current-carrying capacity?',
    answer:
      'Yes &mdash; routinely, on long runs. A 16 A radial 30 m long fed at 230 V is comfortably within the CCC of 2.5 mm&sup2; T&E (Reference Method C, Iz ~ 27 A nominal). But mV/A&middot;m at 16 A &times; 30 m gives ~7.5 V drop &mdash; over 3% &mdash; which fails Reg 525.201 if it is a lighting circuit. The fix is to upsize to 4 mm&sup2; on voltage-drop grounds even though 2.5 mm&sup2; passes the thermal test. EV chargers, garden offices, outbuilding sub-mains and farmyard supplies are the classic voltage-drop-limited circuits.',
  },
];

const BS7671Module5Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Cable types, sizing, grouping and routing | BS 7671:2018+A4:2026 | Module 5.2',
    description:
      'How BS 7671:2018+A4:2026 governs cable selection, current-carrying capacity calculations, grouping factors, voltage drop and installation routing — including A4 changes to App 4 buried-cable methods.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2"
            title="Cable types, sizing, grouping and routing"
            description="Selecting the right cable for the route, deriving Iz from It through Ca, Cg, Ci and Cf, applying mV/A·m for voltage drop, and meeting Reg 522.6 for cables concealed in walls. Includes the A4:2026 refinements to App 4 buried-cable methods."
            actions={
              <>
                <RegBadge>521.5</RegBadge>
                <RegBadge>522.6</RegBadge>
                <RegBadge>525.1</RegBadge>
                <AmendmentBadge regs={['App 4']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Cable selection (Reg 521.5) is suitability-driven: type, mode of installation and external influences (AD water, AG mechanical impact, AJ mechanical stress, AF corrosive) all feed the choice.',
              'Current-carrying capacity follows Iz = It × Ca × Cg × Ci × Cf — apply every factor that genuinely exists, never default the inconvenient ones to 1.00.',
              'Routing rules separate into three pillars: 522.6 (mechanical impact, including the 50 mm rule for cables in walls), 522.8 (mechanical stress, including buried cables), and 525 (voltage drop limits 3%/5%/8%).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the major UK cable types — T&E (6242Y), 6491X singles, SWA, FP200/FP400, MICC, Hi-Tuf, LSF/LSZH variants — and pick the right family for a given route.',
              'Read the correct Reference Method (A through G+, plus 100–103 for thermal insulation, plus D for buried) from App 4 and locate the right CCC column.',
              'Apply Ca (ambient), Cg (grouping), Ci (thermal insulation) and Cf (BS 3036 fuse) as multiplicative factors to derive Iz from the nominal It.',
              'Calculate voltage drop using mV/A·m × Ib × L / 1000 and compare to Reg 525.201 (3%/5%) or 525.202 (6%/8%) limits.',
              'Apply Reg 522.6.202 / 522.6.203 to cables concealed in walls — the 50 mm rule, safe zones and the 30 mA RCD route.',
              'Apply Reg 522.8.10 to buried cables — Reference Method D, depth, marker tape, cable tiles — including A4:2026 refinements.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Cable type families — what to specify</ContentEyebrow>

          <ConceptBlock
            title="The UK cable family tree (Reg 521.5)"
            plainEnglish="Cables are not interchangeable. Each family is engineered for a specific set of installation conditions and external influences. Pick the wrong family and the install fails Reg 521.5 the moment external influences exceed the cable's design envelope."
            onSite="Walk into a wholesaler and the cable wall is organised by family. Knowing the family before you buy saves money and rework: the BS code on the drum (BS 6004, BS 5467, BS 5839, BS 7846 etc.) tells you the design envelope at a glance."
          >
            <p>
              <strong>6242Y twin and earth (T&amp;E)</strong> &mdash; the everyday domestic cable.
              Single-core PVC-insulated, two cores plus uninsulated CPC, PVC sheath. BS 6004. Used
              clipped, in conduit, in trunking and in safe zones in walls. Not for direct burial,
              not for fire-survival, and the CPC is uninsulated so requires sleeving where exposed.
            </p>
            <p>
              <strong>6491X / 6491B singles</strong> &mdash; PVC-insulated single-core conductors
              for installation inside conduit or trunking. BS 6004. Used wherever segregation,
              identification or future-proofing argues for separate cores rather than a multi-core
              cable.
            </p>
            <p>
              <strong>SWA (steel wire armoured)</strong> &mdash; thermosetting (XLPE) or
              thermoplastic (PVC) cores with a galvanised steel-wire armour layer. BS 5467 (XLPE,
              90&deg;C) or BS 6346 (PVC, 70&deg;C). Used for sub-mains, external runs, direct
              burial, cable trays, plant rooms. The armour acts as a CPC subject to Reg 543.2.
            </p>
            <p>
              <strong>FP200 / FP200 Gold / FP400</strong> &mdash; fire-resistant cables for
              life-safety circuits (fire alarms, emergency lighting, smoke ventilation). BS 7629 and
              BS 5839 references. FP400 offers extended fire-survival ratings (up to 2 hours) for
              high-rise and complex evacuation buildings.
            </p>
            <p>
              <strong>MICC (mineral insulated copper clad)</strong> &mdash; copper conductors in
              compressed magnesium-oxide insulation, copper outer sheath. Effectively indestructible
              by fire, mechanical impact or chemical attack. Used for critical fire-survival
              circuits where even FP400 may not suffice.
            </p>
            <p>
              <strong>Hi-Tuf</strong> &mdash; ruggedised PVC cable with enhanced sheath construction
              for rough installation conditions (caravan parks, building sites, external runs short
              of full SWA).
            </p>
            <p>
              <strong>LSF and LSZH variants</strong> &mdash; Low Smoke and Fume (reduced halogen,
              reduced smoke) and Low Smoke Zero Halogen (essentially no halogen evolution) variants
              of the above families. Specified where fire-evacuation toxicity or equipment-corrosion
              risk drives a stricter sheath compound. Reg 521.5 plus the building&apos;s fire
              strategy determines which.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 521.5 — Types of wiring system in relation to types of installation"
            clause="The type of wiring system (cable, conductor and method of installation) shall be selected so as to be suitable for the type of installation and to withstand the external influences and electromagnetic conditions to which it will be subjected during normal use."
            meaning="Cable type is not a free choice — the selection has to evidence suitability against the actual external influences (Section 522 list: AD water, AG impact, AJ stress, AF corrosion, AN solar, etc.). On the EIC the designer has implicitly justified this every time a cable is ticked off the schedule."
            cite="BS 7671:2018+A4:2026, Reg 521.5"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Reference Methods — App 4&apos;s rosetta stone</ContentEyebrow>

          <ConceptBlock
            title="Reading the right column"
            plainEnglish="App 4 publishes nominal current-carrying capacity (It) values. Each column corresponds to a Reference Method — the way the cable is installed. Pick the wrong column and the rest of the calculation is built on sand."
            onSite="Method A (in conduit in a thermally insulating wall) and Method C (clipped direct) typically differ by 30%+ at the same conductor size. The single biggest mistake apprentices make is reading Method C numbers for a cable that is actually inside a stud wall in conduit (Method A)."
          >
            <p>
              <strong>Method A</strong> &mdash; cable in conduit in a thermally insulating wall.
              Worst-case for thermal dissipation. Used for cables run inside a stud wall where
              insulation surrounds the conduit.
            </p>
            <p>
              <strong>Method B</strong> &mdash; cable in conduit on a wall (surface-mounted
              conduit). Better than A because the conduit is in free air.
            </p>
            <p>
              <strong>Method C</strong> &mdash; clipped direct to a non-metallic surface, in free
              air. The default for surface-clipped runs across joists, walls and ceilings without
              insulation contact.
            </p>
            <p>
              <strong>Method D</strong> &mdash; in or against the ground (direct buried, or in a
              duct buried in the ground). Specific to underground supplies. App 4 Table 4D4A or
              4E4A.
            </p>
            <p>
              <strong>Method E</strong> &mdash; multi-core cable in free air (e.g. SWA on a tray
              well-separated from other cables).
            </p>
            <p>
              <strong>Method F</strong> &mdash; single-core cables in free air, touching, in trefoil
              or flat formation.
            </p>
            <p>
              <strong>Method G</strong> &mdash; single-core cables in free air, spaced.
            </p>
            <p>
              <strong>Methods 100&ndash;103</strong> &mdash; cables above plasterboard ceilings in
              progressively worse thermal-insulation conditions. 100 = no insulation contact. 101 =
              in contact with insulation on one side. 102 = surrounded but not enclosed. 103 = fully
              enclosed within thermal insulation. Driven by Reg 523.7 / 523.8.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The Iz formula — every factor that matters</ContentEyebrow>

          <ConceptBlock
            title="Iz = It × Ca × Cg × Ci × Cf"
            plainEnglish="It is the nominal table value. Ca corrects for ambient temperature different from 30°C. Cg corrects for grouping with other circuits. Ci corrects for contact with thermal insulation. Cf corrects for the protective device being a BS 3036 rewireable fuse."
            onSite="Treat each factor as a checklist on the design sheet. If the factor doesn't apply — leave it 1.00 explicitly. If it does — write the source (Table 4B1 for Ca, 4C1 for Cg, etc.). When the inspector queries cable size on the EICR in five years, the sheet shows your reasoning."
          >
            <p>
              <strong>Ca &mdash; Ambient temperature.</strong> Default 1.00 at 30&deg;C. App 4 Table
              4B1 gives the values for both PVC (70&deg;C conductor) and thermosetting (90&deg;C
              conductor) insulations across ambients 25&deg;C to 80&deg;C. A loft in a UK summer can
              hit 50&deg;C; a boiler-room ceiling void can hit 60&deg;C. Both materially derate the
              cable.
            </p>
            <p>
              <strong>Cg &mdash; Grouping.</strong> App 4 Table 4C1 gives derates for cables bunched
              together. Two circuits = ~0.80, three = ~0.70, four = ~0.65, six = ~0.57, nine =
              ~0.50. The factor depends on how the cables are grouped (clipped direct, perforated
              tray, conduit, etc.) &mdash; tables 4C1 to 4C5 cover the variants.
            </p>
            <p>
              <strong>Ci &mdash; Thermal insulation.</strong> Applies wherever the cable is in
              contact with or surrounded by thermal insulation. Reference Methods 100&ndash;103 are
              the formal mechanism for cables above plasterboard with loft insulation; Reg 523.7
              gives the underlying principle. Typical Ci values range from 0.50 (fully enclosed,
              long runs, small conductor) to 0.78 (one-side contact). For runs &gt; 0.5 m fully
              enclosed, BS 7671 publishes specific derates &mdash; do not guess.
            </p>
            <p>
              <strong>Cf &mdash; Protective device (BS 3036).</strong> Where the protective device
              is a BS 3036 rewireable (semi-enclosed) fuse, apply Cf = 0.725. The factor reflects
              the higher fusing factor of rewireable fuses compared to HBC fuses (BS 88) and MCBs.
              For modern installations this is rarely engaged but appears on EICRs of pre-1980s
              dwellings.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 523.1 — Operating temperature"
            clause="The current-carrying capacity of a conductor shall be such that the limiting temperature is not exceeded under all conditions of normal use. The values of current-carrying capacity may be determined by methods given in Appendix 4 or by calculation, taking account of the design current, the type of insulation, the method of installation, and the ambient temperature."
            meaning="Iz is not a number — it's a verified design statement that the conductor will not exceed its rated limiting temperature (70°C for PVC, 90°C for thermosetting/XLPE) under the design current with all correction factors applied. App 4 is the prescribed method; bespoke calculation is permitted but rare in routine UK installs."
            cite="BS 7671:2018+A4:2026, Reg 523.1 / Appendix 4"
          />

          <SectionRule />

          <ContentEyebrow>Voltage drop — Reg 525</ContentEyebrow>

          <ConceptBlock
            title="The mV/A·m method"
            plainEnglish="App 4 publishes a tabulated voltage-drop figure (mV/A·m) for every cable size and Reference Method. Multiply by the design current (Ib) and the route length (m), divide by 1000, and you get volts dropped. Compare to the regulation's percentage limit."
            onSite="On a 230 V single-phase circuit, 3% = 6.9 V (lighting on public supply) and 5% = 11.5 V (other uses on public supply). For private supply (525.202) the caps rise to 6%/8%. Mark each circuit's permitted drop on the design sheet before you calculate; it stops marginal cases sliding through."
          >
            <p>
              <strong>Reg 525.201</strong> &mdash; default for installations supplied directly from
              a public LV distribution system: 3% lighting, 5% other uses, of nominal voltage. The
              percentages account for the voltage drop already happening between the substation and
              the cut-out before the installation starts.
            </p>
            <p>
              <strong>Reg 525.202</strong> &mdash; private-supply systems (own transformer, off-grid
              solar, large industrial): cap rises to 6% lighting / 8% other uses, recognising the
              long internal run. The full drop budget shifts inside the installation.
            </p>
            <p>
              For three-phase circuits, the table value is given line-to-line and the calculation
              divides by &radic;3 where appropriate. App 4 explicitly gives the formula in its
              preamble &mdash; the apprentice mistake is using the single-phase value on a 400 V
              circuit and over-rating the cable. Always confirm the column header matches the
              circuit topology.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="When voltage drop drives cable size"
            plainEnglish="Long runs at moderate current routinely fail voltage drop while comfortably passing thermal CCC. Garden offices, EV chargers, outbuilding sub-mains and farm supplies are the classic cases."
            onSite="A 6 m kitchen radial at 16 A is voltage-drop trivial. A 35 m EV charger feed at 32 A on the same 6 mm² cable will fail 5% on a public supply. Either upsize the cable or move the protective device closer to the load. The cable goes up before the calculation comes back acceptable — there is no shortcut."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Cable grouping — when Cg bites</ContentEyebrow>

          <ConceptBlock
            title="Why grouping matters more than apprentices think"
            plainEnglish="When cables are bunched together, each one's heat dissipates into the next. The current rating of every cable in the bunch drops simultaneously."
            onSite="Walk a typical consumer-unit-to-loft riser: 8 to 12 T&E cables zip-tied together as they leave the CU. Bunching factor at 8+ circuits sits around 0.52. Every one of those cables loses nearly half its nominal CCC in the bunched section. The fix is either to fan the cables out as soon as possible above the CU, or to upsize the cables to compensate."
          >
            <p>
              Table 4C1 covers cables clipped direct or on a perforated tray, bunched. Table 4C2
              covers cables in conduit or trunking. Table 4C3 covers cables on a non-perforated
              tray. Read the right table for the installation method &mdash; a 6-circuit bunched
              clip-direct value is different from a 6-circuit in-trunking value.
            </p>
            <p>
              The factor applies only to the bunched section. If the cables fan out 0.5 m above the
              CU and run individually to their loads, you size the cable for the bunched
              section&apos;s Cg, and the rest of the run is at Cg = 1.00. This gets recorded on the
              design as &quot;Cg = 0.57 over first 0.5 m, Cg = 1.00 thereafter&quot; and the
              worst-case is the design driver.
            </p>
            <p>
              Different-load circuits do not get a discount. Two cables touching produce thermal
              interference regardless of whether one is a lighting circuit at 0.5 A and the other an
              immersion at 13 A &mdash; the heat from the 13 A still raises the lighting
              cable&apos;s temperature and vice versa. The Cg tables assume worst-case simultaneous
              loading.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Cables in thermal insulation</ContentEyebrow>

          <ConceptBlock
            title="Methods 100–103 and Reg 523.7"
            plainEnglish="Modern lofts contain 270 mm+ of mineral wool. Cables routed through that insulation cannot dissipate heat sideways into air — they sit in a thermal jacket. App 4 publishes specific derates for this scenario."
            onSite="On a typical rewire, the lighting circuits run above the ceiling plasterboard, often draped on the ceiling under the loft insulation. That is Method 101 or 102 and the Ci factor — typically 0.72 to 0.78 — is non-trivial. Cables fully enclosed within insulation (running through the middle of the insulation depth, fully buried in mineral wool) are Method 103 and can derate by 50% or more."
          >
            <p>
              The mitigations are limited: lift the cable above the insulation on plastic battens
              (returning it to Method C), upsize the cable to compensate, or route the cable in
              conduit through the insulation (still Method 100&ndash;103 territory but slightly
              improved heat dissipation depending on conduit material). Burying T&amp;E in 270 mm of
              wool with no compensation is an under-rated cable waiting to be flagged on the next
              EICR.
            </p>
            <p>
              Reg 523.7 / 523.8 are the regulatory hooks. They cross-reference App 4 Tables 4A2 for
              the methods and Table 4D5 (single-phase T&amp;E) or 4E5 (three-phase) for the capacity
              columns. Always read the table, not the legend &mdash; the values are tabulated for a
              reason.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Cable routing — Reg 522.6 and 522.8</ContentEyebrow>

          <ConceptBlock
            title="Reg 522.6 — Mechanical impact (external influence AG)"
            plainEnglish="The cable has to survive what its environment can do to it. AG1 (low impact) covers normal domestic and office. AG2 (medium) covers light commercial and workshops. AG3 (high) covers heavy industrial and construction sites."
            onSite="Most of the EICR observations on cable routing live in this regulation. Cable too close to the surface in a stud wall? 522.6.202. Surface-clipped run through a workshop where forklifts pass? 522.6.1 (the cable needs additional mechanical protection). Cable above a suspended ceiling where maintenance staff climb? 522.6.1 plus 522.8."
          >
            <p>
              The text of Reg 522.6 is broad: cables shall be protected against mechanical damage
              appropriate to the external influences. The specific sub-clauses (522.6.1 to
              522.6.204) make this concrete.
            </p>
            <p>
              <strong>Reg 522.6.202</strong> &mdash; cables concealed in walls or partitions at a
              depth less than 50 mm. Permitted by one of: (i) depth &ge; 50 mm, (ii) earthed
              metallic covering, (iii) mechanical protection sufficient against expected impact,
              (iv) run in safe zones AND protected by 30 mA RCD, or (v) cable with earthed metallic
              screen / armour. Modern domestic rewires almost universally use (iv).
            </p>
            <p>
              <strong>Reg 522.6.203</strong> &mdash; locations used by ordinary persons (BA1) /
              dwellings: where 522.6.202 is satisfied by safe-zone routing without 50 mm depth or
              metallic protection, the 30 mA RCD requirement is a hard &quot;shall.&quot; The
              regulation does not allow a risk-assessment exception within domestic premises.
            </p>
            <p>
              <strong>Reg 522.6.204</strong> &mdash; metal-framed (steel-stud) walls. The risk of
              fixings penetrating the cable is much higher than in timber-stud walls. The mitigation
              menu narrows: typically (ii) earthed metallic covering or (iii) full mechanical
              protection.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <ConceptBlock
            title="Reg 522.8 — Mechanical stress (external influence AJ)"
            plainEnglish="Cables under tension, compression, repeated bending or vibration must be selected and supported to handle those stresses. Bending radii, fixing intervals and support spacings are all under 522.8."
            onSite="The 522.8 corollaries appear in the OSG and IET manufacturer guides as bending-radius tables (typically 6× to 8× outside diameter for fixed installations) and fixing intervals (typically 250–400 mm for surface-clipped horizontal T&E). Get either wrong and the cable insulation work-hardens at the bend or the fixing point and fails over time."
          >
            <p>
              <strong>Reg 522.8.4</strong> &mdash; cables shall be supported in such a way that they
              are not subjected to undue mechanical strain, especially at conductor or cable
              terminations. This is the rule that makes you provide cable glands at SWA terminations
              and tails-clamps at consumer units.
            </p>
            <p>
              <strong>Reg 522.8.10</strong> &mdash; cables in or against the ground. Refers
              installer to Reference Method D, requires sufficient burial depth to avoid foreseeable
              disturbance, and typically (per OSG) marker tape and cable tiles. A4:2026 has refined
              some of the App 4 buried-cable methods to account for soil thermal resistivity and
              burial conditions.
            </p>
            <p>
              <strong>Reg 522.10</strong> &mdash; corrosive substances (external influence AF).
              Where cables are routed near substances that attack the sheath (acids, alkalis,
              certain paints, some insulation foams), the cable selection must account for it. PVC
              is incompatible with extruded polystyrene insulation in some formulations &mdash; a
              common surprise where polystyrene panels touch PVC sheath.
            </p>
            <p>
              <strong>Reg 521.10</strong> &mdash; cable enclosures. Where cables run in a
              non-metallic enclosure (PVC conduit, plastic trunking) the enclosure must be suitable
              for the environment and the cables inside it. Reg 521.10.1 (in particular) prohibits
              the use of single-core cables of an a.c. circuit being installed in an enclosure of
              magnetic material with the conductors not in contact &mdash; the ferromagnetic loop
              heats from induced eddy currents. Run all line/neutral conductors of a single circuit
              through the same enclosure to keep the magnetic flux balanced.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Buried cables and A4:2026 changes</ContentEyebrow>

          <ConceptBlock
            title="Direct burial — Reg 522.8.10 and Reference Method D"
            plainEnglish="Buried cables sit in soil, which has different thermal properties from air. Reference Method D in App 4 provides the dedicated CCC tables, with assumed soil thermal resistivity and depth conditions baked in."
            onSite="Typical UK practice: SWA cable, buried at 500 mm under footpath/lawn or 600–750 mm under vehicular access, with yellow warning tape laid 150 mm above the cable, and cable tiles where local hazards or shallow depth dictate. The DNO supply trench and the customer's sub-main trench follow similar standards but the customer's cable is BS 7671's responsibility, not the DNO's."
          >
            <p>
              Reference Method D distinguishes between cables direct in the ground and cables in
              ducts in the ground. The latter has slightly higher CCC because the air gap inside the
              duct improves heat dissipation, but the duct itself adds thermal resistance. Tables
              4D4A and 4E4A list the values.
            </p>
            <p>
              <strong>A4:2026 changes</strong> &mdash; A4 has refined the App 4 buried-cable
              tabulation, including soil thermal resistivity assumptions and the interaction with
              thermal insulation surrounding buried cables (e.g. a buried cable rising into a
              foundation void with insulation above). Always work from the in-force edition. Where
              soil is unusually rocky, dry, peaty or high-organic, the designer departs from the
              tabulated values with documented justification under Reg 120.3 and references BS EN
              IEC 60287 for the bespoke calculation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Reading Method C numbers for a Method A install"
            whatHappens="Apprentice sizes a 32 A ring final at 4 mm² T&E reading the Method C column (Iz nominal ~36 A). The cable is actually run inside studwork in conduit through insulated walls — Method A (Iz nominal ~25 A). The cable is under-rated by ~30% and the design fails Reg 433.1.1 (In ≤ Iz)."
            doInstead="Confirm the Reference Method on the design sheet before reading App 4. Walk the route visually: where will the cable physically sit? Then map it to the Method A–G or 100–103 list. The single biggest source of cable-sizing errors in apprentice paperwork is mis-reading the Method column."
          />

          <CommonMistake
            title="Forgetting to multiply correction factors"
            whatHappens="Designer applies Ca = 0.94 alone, ignoring Cg = 0.65 because the grouping is only 4 circuits and they will spread out further along the run. The first 0.5 m of bunched cable runs at 0.94 × 0.65 = 0.61 corrected, not 0.94. The cable is under-rated for that section and the worst-case section is what drives the design."
            doInstead="Apply every factor that exists, multiply them all, and use the result as Iz. If a factor varies along the route (e.g. grouped at the CU, fanned out at the loads), use the worst-case value of the product. The protective device must satisfy In ≤ Iz throughout the entire length, not just where it is convenient."
          />

          <CommonMistake
            title="Treating mV/A·m as resistance"
            whatHappens="Designer pulls the mV/A·m value from App 4 Table 4D5B, then multiplies by current squared and length, getting a power figure. Wrong calculation. Voltage drop is mV/A·m × I × L / 1000 — linear in current, not quadratic."
            doInstead="The mV/A·m value already includes the cable's resistance per metre (loop, both legs of a single-phase circuit). Multiply by Ib (design current, not In), by route length L in metres, then divide by 1000 to convert mV to V. Compare to the percentage limit of nominal voltage (e.g. 6.9 V on a 230 V lighting circuit). Three-phase calculations have an additional &radic;3 step depending on the table column."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Loft lighting circuit buried under thermal insulation"
            situation="Customer wants 9 LED downlights in a bedroom ceiling, plus 3 spots in the en-suite. Existing loft has 270 mm of mineral wool laid on top of the plasterboard. The new cable will run from the consumer unit, up the wall, over the bedroom ceiling joists, and down to each downlight. The installer plans to drape the cable under the loft insulation to keep it concealed."
            whatToDo="Identify the Reference Method for the loft section: cable above plasterboard, surrounded by 270 mm of insulation = Method 102 or 103 depending on whether it sits on top of, within, or fully enclosed by the wool. Worst-case Method 103 with Ci ~ 0.50 means 1.5 mm² T&E nominal Iz of ~16 A drops to ~8 A — barely enough for the 6 A MCB, no margin. The fix is one of: (a) lift the cable on plastic battens above the insulation (returning to Method C), (b) upsize the cable to 2.5 mm², or (c) re-route through the joists below the insulation (also Method C). Apply the new Reg 411.3.4 (A4) — the lighting circuit must be on a 30 mA RCD/RCBO regardless."
            whyItMatters="Under-rated lighting cables in lofts cause sustained warm-running that ages the insulation and creates the long-term fire risk. The A4 Reg 411.3.4 RCD does not protect against thermal under-rating — it protects against shock. Both rules have to be satisfied independently. On the EICR the missed Method 103 derate is C2 (potentially dangerous) where the cable is materially under-rated; C3 where the under-rate is marginal but verifiable."
          />

          <Scenario
            title="Kitchen socket ring with multi-circuit grouping at the consumer unit"
            situation="A new kitchen has 12 sockets on a 32 A ring final (Type B MCB, Reference Method C, 2.5 mm² T&E). The CU is in the under-stair cupboard. The first 0.8 m of the ring leaves the CU bunched with 7 other cables in a 50 mm trunking riser — kitchen ring, kitchen lighting, hallway lighting, upstairs lighting, upstairs sockets, immersion, EV charger feed, garden office sub-main."
            whatToDo="Identify the bunched section: 8 circuits in trunking, Cg from Table 4C2 ≈ 0.52. The kitchen ring's 2.5 mm² nominal It (Method C, 27 A) becomes 27 × 0.52 = ~14 A in the bunched section. The 32 A MCB no longer satisfies In ≤ Iz (32 vs 14). The fix options: (a) fan the cables out earlier and reduce the bunched count, (b) upsize the bunched section to 4 mm² (Iz nominal ~37 A, corrected to ~19 A — still tight), (c) split the bunched section across two trunking runs to reduce Cg. The realistic fix on a new install is (a) — design the riser so cables fan out 0.3 m above the CU into separate routes."
            whyItMatters="Bunching is the silent killer of cable ratings. Inspectors checking Iz at the load end of a circuit see a clip-direct cable comfortably at Method C and miss the bunched bit at the CU. The cable that overheats is the one in the trunking, not the one at the load. EICR coding for bunched-but-under-rated runs is typically C2 (potentially dangerous, sustained over-temperature accelerates insulation ageing) where the bunching is severe; C3 where marginal. The fix is design — once installed, splitting a riser is a re-rewire."
          />

          <SectionRule />

          <ContentEyebrow>Designer&apos;s quick reference</ContentEyebrow>

          <ConceptBlock
            title="Six-step cable selection checklist"
            plainEnglish="Walk every cable through six steps before specifying. Most assessment failures come from skipping one of them."
            onSite="(1) What family fits the external influences (Reg 521.5)? (2) What Reference Method is the install path (App 4 column)? (3) What is the design current Ib? (4) Apply Ca, Cg, Ci, Cf — derive Iz. Verify In ≤ Iz. (5) Calculate voltage drop with mV/A·m × Ib × L / 1000. Verify against Reg 525.201 (3%/5%) or 525.202 (6%/8%). (6) Check Reg 522.6 routing rules — concealment, mechanical impact, RCD requirement (411.3.4 for domestic lighting from A4)."
          >
            <p>
              The six-step sheet is the audit trail when an inspector queries cable choice in three
              years. Without it, the answer becomes &quot;I have always used 2.5 mm&sup2; on ring
              finals&quot; &mdash; which may be right but cannot be evidenced. With it, the answer
              is &quot;Reg 521.5: T&amp;E suitable; Method C clipped direct in joist void; Ib = 25
              A; Ca = 1.00, Cg = 1.00 (single circuit beyond CU), Ci = 1.00 (above insulation on
              plastic batten), Cf = 1.00; Iz = 27 A; In = 32 A — verified using the ring-final
              exception per BS 7671 Section 433; voltage drop 4.2% over 18 m route at 25 A — within
              5%; routing per 522.6.202 (iv) safe-zone + 30 mA RCBO.&quot; That is a defensible
              record.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg cite map — what to quote on the EIC"
            plainEnglish="Each design decision has a regulation. Citing the regulation on the schedule turns a judgement call into an evidenced one."
            onSite="Cable type → Reg 521.5 plus any specific environmental reg (522.3 water, 522.6 impact, 522.8 stress, 522.10 corrosion). Cable size → App 4 plus Reg 523.1 (operating temperature) and Reg 433.1.1 (coordination with protective device). Voltage drop → Reg 525.201 (public supply) or 525.202 (private supply). Cables in walls → Reg 522.6.202 / 522.6.203 / 522.6.204. Buried cables → Reg 522.8.10 plus App 4 Method D. Cable enclosures → Reg 521.10."
          >
            <p>
              The Reg-cite map appears as a one-line annotation against each circuit on the design
              record. It is not required by BS 7671 to appear on the EIC itself, but every cert
              auditor and EICR inspector working from a defensible design will look for it. The
              electrical designer who routinely cites regulations is several orders of magnitude
              more defensible than one who relies on convention alone.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Cable type selection is governed by Reg 521.5 — match the family (T&E, SWA, FP200, MICC, Hi-Tuf, LSF/LSZH) to the external influences and installation method.',
              'Read the right Reference Method from App 4 — A through G+ for general, 100–103 for thermal insulation, D for buried — before pulling any It value.',
              'Apply every correction factor that exists: Iz = It × Ca × Cg × Ci × Cf. Never default the inconvenient ones to 1.00.',
              'Voltage drop limits per Reg 525.201 are 3% lighting / 5% other on public supply. Reg 525.202 raises this to 6%/8% for private-supply systems. mV/A·m × Ib × L / 1000 is the calculation.',
              'Cables concealed in walls/partitions at less than 50 mm depth must satisfy Reg 522.6.202 — typically by safe-zone routing plus 30 mA RCD additional protection (which A4 Reg 411.3.4 already mandates for domestic luminaires).',
              'Buried cables: Reg 522.8.10 plus Reference Method D. A4:2026 has refined some buried-cable tabulations — always read the in-force edition.',
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
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Containment systems and mechanical protection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module5Section2;
