/**
 * Module 6 · Section 4 · Subsection 3 — Correction factors Ca, Cg, Ci deep
 * Maps to C&G 2365-03 / Unit 305 / LO4 / AC 4.3
 *   AC 4.3 — "Apply the correction factors for ambient temperature, grouping and thermal insulation when determining cable size for given installation conditions"
 * Layered: 2366-03 Unit 304 / AC 4.3; 5393-03 Unit 104 / AC 4.3
 *
 * Each correction factor in detail \u2014 where it comes from, what physical
 * effect it accounts for, when it stacks and when it does not, and a worked
 * stack-up calculation that takes a real circuit through the lot.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Correction factors Ca, Cg, Ci (4.3) | Level 3 Module 6.4.3 | Elec-Mate';
const DESCRIPTION =
  'Each derate factor in detail. Ca for ambient temperature (Table 4B1), Cg for grouping (Tables 4C1\u20134C5), Ci for thermal insulation (built into Methods 100\u2013103). What stacks, what does not, and a worked stack-up calculation.';

const checks = [
  {
    id: 'ca-pick',
    question:
      "A 70 \u00b0C T&E cable runs through a plant room where the survey shows ambient air at 45 \u00b0C. From BS 7671 Appendix 4 Table 4B1, what is Ca?",
    options: ['1.00', '0.94', '0.79', '0.71'],
    correctIndex: 2,
    explanation:
      "Table 4B1, 70 \u00b0C cable, 45 \u00b0C ambient: Ca = 0.79. The same temperature against a 90 \u00b0C thermosetting cable would give Ca \u2248 0.87 (the higher operating ceiling provides more thermal headroom). Always read the column matching your cable type.",
  },
  {
    id: 'cg-stack',
    question:
      "Six final-circuit cables are bunched touching in a single layer along a 12 m route in a sub-floor void. From BS 7671 Appendix 4 Table 4C1, what Cg applies, and does it apply to the whole 12 m or only the bunched section?",
    options: [
      'Cg = 0.80, applies only at the entry point.',
      "Cg = 0.57, applies to the entire 12 m of bunched run because the cables are touching for that length.",
      'Cg = 1.00, no derate needed.',
      'Cg = 0.65, applies to half the run.',
    ],
    correctIndex: 1,
    explanation:
      "Table 4C1 for six multi-core cables touching, single layer, gives Cg = 0.57 (different sources rounded slightly). The grouping derate applies wherever the cables are touching for a meaningful length \u2014 12 m is well above the trivial-grouping threshold from Note 14 of Appendix 4 \u00a75.1. The whole bunched section sees the derate, and because that is the worst section, the entire cable is sized on Cg = 0.57.",
  },
  {
    id: 'ci-double',
    question:
      'You have selected Method 103 (cable totally enclosed in thermal insulation) for the worst section of a run. Should you also apply Ci = 0.5 from any separate table on top of the Method 103 column?',
    options: [
      'Yes \u2014 always apply Ci to be safe.',
      "No \u2014 the in-insulation derate is already built into Method 103 tabulated values; applying Ci on top is double-counting and over-engineers the cable.",
      'Only if ambient is also above 30 \u00b0C.',
      'Yes, but only on lighting circuits.',
    ],
    correctIndex: 1,
    explanation:
      "Methods 100\u2013103 already include the Ci correction \u2014 the tabulated It in those columns is what the cable can carry under the in-insulation conditions. Applying Ci again is double-counting. The standard explicitly states this in Appendix 4 \u00a75.4. Apply only Ca and Cg on top of a Method 100\u2013103 column.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Where in BS 7671 do you find the Ca correction factor for ambient temperature, and which column do you use for a 70 \u00b0C thermoplastic cable?",
    options: [
      'Table 41.3, the column marked PVC.',
      'Table 4B1, the column for 70 \u00b0C general purpose thermoplastic insulation.',
      'Table 4D5, anywhere in the table.',
      'Appendix 11.',
    ],
    correctAnswer: 1,
    explanation:
      "Table 4B1 publishes the Ca values for ambient air temperature, with separate columns for 70 \u00b0C thermoplastic and 90 \u00b0C thermosetting cables. The two columns differ because the higher operating temperature of thermosetting cable provides more thermal headroom, so the same ambient temperature gives a less aggressive derate.",
  },
  {
    id: 2,
    question:
      "Six 70 \u00b0C T&E cables are clipped direct, single layer, touching, on a wall. From Table 4C1 the grouping factor Cg \u2248 0.57. If each cable carries Ib = 20 A, what is the minimum tabulated It each cable must clear (Ca = 1.0, Ci = 1.0)?",
    options: ['20 A', '\u224835.1 A', '120 A', '11.4 A'],
    correctAnswer: 1,
    explanation:
      "Required It \u2265 Ib / (Ca \u00d7 Cg \u00d7 Ci) = 20 / (1.0 \u00d7 0.57 \u00d7 1.0) = 20 / 0.57 = 35.09 A. You then look up Table 4D5 in the matching method column and pick the smallest CSA whose tabulated It is at least 35.1 A.",
  },
  {
    id: 3,
    question:
      "What does Ca actually represent physically?",
    options: [
      'A safety margin for unforeseen conditions.',
      "The ratio between the thermal headroom available at the actual ambient temperature and the thermal headroom available at the 30 \u00b0C reference \u2014 a hotter ambient leaves less room for the cable to dissipate heat, so the cable can carry less current.",
      'A correction for the cable\u2019s age.',
      'A discount for short cables.',
    ],
    correctAnswer: 1,
    explanation:
      "Ca is a thermal-headroom ratio. At the 30 \u00b0C reference baseline a 70 \u00b0C cable has 40 \u00b0C of headroom; at 40 \u00b0C ambient it has only 30 \u00b0C of headroom. The ratio of those headrooms (allowing for the underlying heat-balance maths) gives Ca = 0.87 for that case. It is physics, not a margin.",
  },
  {
    id: 4,
    question:
      "Cg = 0.5 is given for ten cables grouped together touching in a single layer. What does that 0.5 mean in practical terms?",
    options: [
      "Each cable can carry 50 percent more current.",
      "Each cable can carry half the current it would if it were on its own \u2014 the heat each cable produces warms its neighbours, so collectively they all run hotter than a single cable would.",
      "Five out of ten cables are unsafe.",
      "The cable group needs RCD protection.",
    ],
    correctAnswer: 1,
    explanation:
      "Grouping derates because grouped cables share heat. Each cable produces I\u00b2R waste heat; if surrounded by other current-carrying cables, that heat is harder to shed because the surrounding air is already warm with everyone else\u2019s heat. The result: every cable in the group runs hotter for the same current, so each must carry less current to stay below the temperature limit.",
  },
  {
    id: 5,
    question:
      "Ci is the in-thermal-insulation correction. For Methods 100\u2013103 you should:",
    options: [
      'Always apply Ci on top of the tabulated value.',
      'Apply Ci only at the entry point.',
      "Not apply Ci at all \u2014 it is already built into the Method 100\u2013103 tabulated It values.",
      'Apply Ci = 0.5 every time.',
    ],
    correctAnswer: 2,
    explanation:
      "The in-insulation derate for Methods 100\u2013103 is folded into the tabulated value by the standard. Applying a separate Ci on top is the single most common error in apprentice work. Read the Method 100/101/102/103 column and apply only Ca and Cg from there.",
  },
  {
    id: 6,
    question:
      "Stacking factors: Ca = 0.91, Cg = 0.80, Ci = 1.0 (no insulation). The combined derate is:",
    options: ['0.91 + 0.80 + 1.0 = 2.71', '0.91 \u00d7 0.80 \u00d7 1.0 = 0.728', '0.91 \u2212 0.20 = 0.71', 'Just 0.80 (only the worst factor counts).'],
    correctAnswer: 1,
    explanation:
      "Correction factors stack multiplicatively. Combined derate = product of all applicable factors = 0.91 \u00d7 0.80 \u00d7 1.0 = 0.728. The cable\u2019s effective Iz = It \u00d7 0.728. You then test Iz against In to verify Reg 433.1.1.",
  },
  {
    id: 7,
    question:
      "Two cables grouped touching for 0.6 m at the consumer-unit entry zone, then running on their own for the rest of a 30 m route. Note 14 of BS 7671 Appendix 4 \u00a75.1 tells you:",
    options: [
      "Apply the full Cg for the entire 30 m.",
      "Apply no Cg \u2014 grouping under about 1 m of run is treated as trivial because the cables cool quickly past the brief touching zone.",
      'Apply Cg only on weekends.',
      'You cannot install grouped cables briefly.',
    ],
    correctAnswer: 1,
    explanation:
      "Note 14 in Appendix 4 \u00a75.1 lets you ignore very brief grouping (typically under about 1 m) on the basis that the cable cools quickly once it leaves the bunched section. Many designers still apply Cg as a conservative margin in this case \u2014 it is good practice but not mandatory. Ask the local inspector for their preference if you are unsure.",
  },
  {
    id: 8,
    question:
      "A cable carries Ib = 32 A. The install gives Ca = 0.94, Cg = 0.65, Ci = 1.0. The required tabulated It from BS 7671 Appendix 4 must be at least:",
    options: ['32 A', '\u224820.96 A', '\u224852.39 A', '\u224849.23 A'],
    correctAnswer: 2,
    explanation:
      "Required It \u2265 Ib / (Ca \u00d7 Cg \u00d7 Ci) = 32 / (0.94 \u00d7 0.65 \u00d7 1.0) = 32 / 0.611 = 52.39 A. The cable\u2019s tabulated CCC in the relevant Reference Method column must be at least 52.39 A. For 70 \u00b0C T&E in Method C, that means stepping up to 10 mm\u00b2 (Method C It \u2248 64 A, so Iz = 64 \u00d7 0.611 = 39.1 A \u2014 passes for In = 32 A).",
  },
];

const faqs = [
  {
    question: "Why are correction factors multiplied rather than added?",
    answer:
      "Each factor represents a fractional reduction in the cable\u2019s effective heat-dissipation capacity. Stacking them multiplicatively reflects how each effect compounds the next \u2014 a 6 percent reduction from ambient (Ca = 0.94) followed by a 20 percent reduction from grouping (Cg = 0.80) is not a 26 percent total reduction (0.94 + 0.80 minus 1.0 \u2248 0.74 in the additive model), it is a 24.8 percent total reduction (0.94 \u00d7 0.80 = 0.752, so the combined factor is 0.752, meaning a 1 \u2212 0.752 = 24.8 percent reduction). The maths matters: get the stacking wrong and you will under-size the cable.",
  },
  {
    question: "Does Ca apply to every cable in every install, or only to hot environments?",
    answer:
      "Strictly, Ca applies whenever the ambient differs from the 30 \u00b0C reference baseline. For typical UK habitable spaces at 20\u201325 \u00b0C, Ca is technically above 1.0 (a small uplift), but most designers leave it at 1.0 because the saving is tiny and the thermal margin is welcome. For ambient above 30 \u00b0C \u2014 lofts in summer, plant rooms, ceiling voids over heating equipment \u2014 you must apply Ca below 1.0 to derate.",
  },
  {
    question: "If two circuits are grouped but only one is loaded heavily, do I still apply full Cg?",
    answer:
      "BS 7671 Appendix 4 Note 13 to \u00a75.1 lets you reduce the grouping derate when the actual current in the grouped cables is materially below the tabulated CCC \u2014 the heat each cable contributes scales with the square of its actual current. The standard publishes a formula. In practice most designers apply the full table Cg unless the diversity is very pronounced and documented. Erring on the conservative side is cheap; erring on the generous side is what gets you written up.",
  },
  {
    question: "Are there other correction factors beyond Ca, Cg and Ci?",
    answer:
      "Yes, several. The harmonic correction Ch (Appendix 11) for multi-core cables carrying significant third-harmonic neutral current; the soil-thermal-resistivity correction (Table 4B3) for buried cables; depth-of-burial correction for non-standard depth; multi-conductor correction for parallel runs. For everyday domestic and small commercial work, Ca / Cg / Ci cover almost everything. For commercial sub-mains feeding LED arrays, UPS systems or large variable-speed drives, you must add Ch.",
  },
  {
    question: "Can a correction factor ever be above 1.0?",
    answer:
      "Yes, Ca can exceed 1.0 when the ambient is below the 30 \u00b0C reference \u2014 a 25 \u00b0C ambient gives Ca \u2248 1.03 for 70 \u00b0C cable. Soil thermal resistivity below 2.5 K\u00b7m/W can also give a correction above 1.0. In practice most designers do not credit factors above 1.0 because the gain is marginal and the thermal headroom is welcome insurance. Compliance does not require it; it is a design choice.",
  },
  {
    question: "How do I find the right Cg for a complex group with mixed cable sizes?",
    answer:
      "BS 7671 Appendix 4 Tables 4C1\u20134C5 cover the standard cases (single-layer touching, multi-layer, in trunking, in conduit, on perforated tray). For mixed sizes, the standard\u2019s simplification is to use the worst-case Cg from the table that matches your geometry. For genuinely complex groups (large industrial trunking, multi-circuit consumer units with mixed loads), specialist software (Amtech, ProDesign, Hager Sizer) handles the maths properly. For everyday small-installation work, the worst-case Cg is what an inspector expects.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 6 · Section 4 · Subsection 3"
            title="Correction factors Ca, Cg, Ci \u2014 the derate stack"
            description="Each correction factor in detail. Ca for ambient temperature (Table 4B1), Cg for grouping (Tables 4C1\u20134C5), Ci for thermal insulation (built into Methods 100\u2013103). What each one represents physically, when it applies, when it stacks and when it does not, plus a worked stack-up calculation that takes a real circuit through the entire derate machinery."
            tone="orange"
          />

          <TLDR
            points={[
              'Three derate factors do most of the work in everyday cable sizing: Ca for ambient temperature (Table 4B1), Cg for grouping (Tables 4C1\u20134C5), and Ci for thermal insulation. They stack multiplicatively \u2014 combined derate = Ca \u00d7 Cg \u00d7 Ci.',
              'Ci is built into Reference Methods 100, 101, 102 and 103 \u2014 do NOT apply Ci on top of those columns. For Methods A\u2013G with cables not in insulation, Ci = 1.0. The double-counting trap is the single most common cable-sizing mistake.',
              "Required tabulated It \u2265 Ib / (Ca \u00d7 Cg \u00d7 Ci). That is the floor your cable\u2019s as-published CCC must clear in the matching Reference Method column. Then verify Iz \u2265 In to satisfy Reg 433.1.1.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify which BS 7671 Appendix 4 table publishes each correction factor (4B1 for Ca, 4C1\u20134C5 for Cg, methods themselves for Ci).',
              'Apply Ca correctly for ambient temperatures above and below the 30 \u00b0C reference baseline, distinguishing the columns for 70 \u00b0C and 90 \u00b0C cables.',
              'Apply Cg correctly for grouped cables, including the geometric variations (single-layer touching, multi-layer, in trunking, on tray).',
              'Recognise that Ci is built into Methods 100\u2013103 and never apply it as a separate multiplier on those columns.',
              'Stack correction factors multiplicatively to derive the required tabulated It from the design current Ib.',
              'Recognise the trivial-grouping relaxation (Note 14 of Appendix 4 \u00a75.1) and apply it where appropriate \u2014 with the inspector\u2019s preference in mind.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Why correction factors exist at all \u2014 the heat-balance picture"
            plainEnglish="Tabulated It values in Appendix 4 are computed at the standard reference conditions: 30 \u00b0C ambient, single circuit, no insulation. Real installs rarely match those conditions. The correction factors are the multipliers that translate the table value into the real on-site CCC \u2014 from It (catalogue) to Iz (job)."
            onSite="Picture each derate as a tax. Ca is the ambient tax; Cg is the grouping tax; Ci is the insulation tax. Add them all up multiplicatively and you get the cable\u2019s real-world capacity. Skip a tax and the install is non-compliant the day it is energised."
          >
            <p>
              The IEC heat-balance maths that produces the Appendix 4 tabulated It values assumes the cable sits in 30 \u00b0C ambient air, on its own (no other current-carrying cables nearby), and not enclosed in any thermal insulation. Those are the reference conditions. Any deviation reduces the cable\u2019s ability to shed heat and therefore the current it can carry without exceeding the conductor\u2019s temperature limit.
            </p>
            <p>
              Three deviations dominate everyday installs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hotter ambient.</strong> The reference is 30 \u00b0C; UK lofts in summer hit 40\u201345 \u00b0C, plant rooms 50\u201355 \u00b0C. Ca compensates.
              </li>
              <li>
                <strong>Multiple cables together.</strong> Each grouped cable contributes I\u00b2R heat to the local environment, warming its neighbours. Cg compensates.
              </li>
              <li>
                <strong>Cable in thermal insulation.</strong> Mineral wool, foam, expanded polystyrene \u2014 anything that reduces convective and conductive heat loss. Ci compensates (or is built into Methods 100\u2013103).
              </li>
            </ul>
            <p>
              Stacking them multiplicatively reflects the physics: each effect compounds the next. A cable in 40 \u00b0C ambient, grouped with three others, embedded in insulation, has all three derates applied at once \u2014 and the combined Iz can be a third or less of the as-tabulated It.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 \u2014 Appendix 4, Section 5 (Application of correction factors)"
            clause="The current-carrying capacity of a cable installed in conditions other than those specified for the reference rating shall be obtained by multiplying the tabulated current-carrying capacity by the appropriate correction factor or factors. Where more than one factor applies, the factors shall be combined by multiplication."
            meaning={
              <>
                The standard mandates the multiplicative stacking. Several apprentices invent
                additive shortcuts (Ca + Cg or just-the-worst-factor); both are non-compliant
                and either over- or under-derate. The correct method is always
                Iz = It \u00d7 Ca \u00d7 Cg \u00d7 Ci \u00d7 any other applicable factor, as a product.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Appendix 4 Section 5; correction-factor tables in 4B and 4C series."
          />

          <SectionRule />

          <ContentEyebrow>Ca \u2014 the ambient temperature factor</ContentEyebrow>

          <ConceptBlock
            title="Ca in detail \u2014 Table 4B1, two columns, two cable families"
            plainEnglish="A hotter ambient gives the cable less thermal headroom to dissipate heat, so the cable can carry less current. Ca is the ratio. BS 7671 Appendix 4 Table 4B1 publishes the values for every common ambient and for both 70 \u00b0C thermoplastic and 90 \u00b0C thermosetting cable."
            onSite="Always survey the actual ambient before sizing. Lofts in July are not 30 \u00b0C. Plant rooms with running boilers are not 30 \u00b0C. External walls in direct sun are not 30 \u00b0C. The Ca derate is real and the install will pay for it if you guess."
          >
            <p>
              Indicative values from Table 4B1 for 70 \u00b0C thermoplastic cable:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>25 \u00b0C ambient \u2192 Ca \u2248 1.03 (uplift)</li>
              <li>30 \u00b0C ambient \u2192 Ca = 1.00 (the reference)</li>
              <li>35 \u00b0C ambient \u2192 Ca \u2248 0.94</li>
              <li>40 \u00b0C ambient \u2192 Ca \u2248 0.87</li>
              <li>45 \u00b0C ambient \u2192 Ca \u2248 0.79</li>
              <li>50 \u00b0C ambient \u2192 Ca \u2248 0.71</li>
              <li>55 \u00b0C ambient \u2192 Ca \u2248 0.61</li>
              <li>60 \u00b0C ambient \u2192 Ca \u2248 0.50</li>
            </ul>
            <p>
              For 90 \u00b0C thermosetting cable in the same ambients, Ca is more generous because the cable\u2019s higher operating ceiling provides more thermal headroom. At 45 \u00b0C, thermosetting Ca \u2248 0.87 (versus 0.79 for thermoplastic). That is one of the routine reasons designers pick thermosetting for plant rooms, even if the run is short.
            </p>
            <p>
              Important: the Ca you apply must match the cable\u2019s own operating-temperature rating, not the temperature you would like it to operate at. A 70 \u00b0C thermoplastic cable used in a 45 \u00b0C plant room must be derated to Ca = 0.79 even if the cable could in principle handle higher temperatures \u2014 the standard ties Ca to the cable\u2019s rated insulation limit.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cg \u2014 the grouping factor</ContentEyebrow>

          <ConceptBlock
            title="Cg in detail \u2014 several flavours of grouping geometry"
            plainEnglish="Multiple cables sharing space share heat. Each cable\u2019s I\u00b2R waste heats the local environment, and that warmer environment slows down every cable\u2019s ability to shed its own heat. Cg derates each grouped cable so the whole bunch stays below the temperature limit."
            onSite="Cg is the derate that catches people out at consumer-unit entry zones. Five or six final circuits leave the CU together, touching, single layer, and the apprentice forgets to apply Cg because the rest of each cable runs alone. The bunched section is the worst section \u2014 it governs."
          >
            <p>
              BS 7671 Appendix 4 publishes Cg in five tables, one for each common geometric arrangement:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Table 4C1</strong> \u2014 multi-core cables, single layer, touching (clipped direct, on the floor of a tray, on a wall). The headline domestic / small commercial table.
              </li>
              <li>
                <strong>Table 4C2</strong> \u2014 multi-core cables, multi-layer (stacked tray work, bundled cables). More aggressive Cg because cables in the middle of the bundle cannot convect.
              </li>
              <li>
                <strong>Table 4C3</strong> \u2014 multi-core cables in trunking. The trunking adds a thermal layer on top of the grouping effect.
              </li>
              <li>
                <strong>Table 4C4</strong> \u2014 single-core cables in trefoil or flat formation. Used for large industrial single-cores carrying balanced three-phase currents.
              </li>
              <li>
                <strong>Table 4C5</strong> \u2014 multi-core cables on a perforated tray, single layer with spacing. Effectively the Method E geometry; Cg here is closer to 1.0 because the spacing allows convection between cables.
              </li>
            </ul>
            <p>
              Indicative Cg values from Table 4C1 (multi-core, single layer, touching):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2 cables \u2192 Cg \u2248 0.80</li>
              <li>3 cables \u2192 Cg \u2248 0.70</li>
              <li>4 cables \u2192 Cg \u2248 0.65</li>
              <li>5 cables \u2192 Cg \u2248 0.60</li>
              <li>6 cables \u2192 Cg \u2248 0.57</li>
              <li>8 cables \u2192 Cg \u2248 0.52</li>
              <li>10 cables \u2192 Cg \u2248 0.48</li>
            </ul>
            <p>
              The pattern: each additional cable past the first reduces Cg, but the marginal effect tails off. Going from one cable to two takes Cg from 1.0 to 0.80 (a 20 percent reduction); going from nine to ten cables takes it from 0.50 to 0.48 (a 4 percent reduction). On large groups the per-cable effect is small.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The trivial-grouping relaxation"
            plainEnglish="Cables that touch only briefly, e.g. for less than a metre at a CU entry zone, do not need to be derated for grouping in strict compliance \u2014 the cable cools quickly past the brief touching section. Many designers still apply Cg as a conservative margin."
            onSite="Read the inspector\u2019s preference. Some take the strict letter of Note 14 (no Cg if touching distance is small); others want Cg applied regardless because it is cheap insurance and removes a documentation argument later."
          >
            <p>
              Note 14 of BS 7671 Appendix 4 \u00a75.1 carries the trivial-grouping relaxation: where the grouping persists for less than approximately one metre of run, the standard accepts that the local heating effect is negligible and Cg need not be applied for that brief section.
            </p>
            <p>
              The mechanism: a cable carries heat away by axial conduction along its own length. If the touching section is short, the cable\u2019s axial conduction draws heat out of the bunched zone before the temperature rises significantly. Past a metre or so, axial conduction is no longer enough and the bunched cables warm up to a steady-state temperature that demands the full Cg derate.
            </p>
            <p>
              In practice, the relaxation is most often invoked at consumer-unit entry zones and at cable-management transitions. The conservative move is to apply Cg anyway \u2014 the cost of the next CSA bracket is usually small compared to the cost of a future inspection writing up the install. The strict-compliance move is to invoke Note 14 and document the touching length on the design sheet. Both are valid; pick the inspector-friendly option for your area.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Ci \u2014 the in-insulation factor (and the double-count trap)</ContentEyebrow>

          <ConceptBlock
            title="Ci in detail \u2014 already in Methods 100\u2013103, applied separately elsewhere"
            plainEnglish="Cable in thermal insulation cannot dissipate heat the same way. BS 7671 handles this two ways: for cables that match the four standard insulation arrangements (Methods 100, 101, 102, 103), the Ci derate is built into the tabulated It and you do not apply Ci on top. For cables that do not match those four cases, you derive Ci from first principles."
            onSite="The biggest trap in cable selection. Apprentices read the Method 103 column AND apply a separate Ci = 0.5 from a memorised value, and the cable ends up oversized by a CSA bracket. Read the standard\u2019s wording: Methods 100\u2013103 already include Ci."
          >
            <p>
              For everyday installs, you almost always pick one of Methods 100\u2013103 if any thermal insulation is involved:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Method 100 \u2014 totally surrounded, length under 0.5 m \u2192 modest derate built in.</li>
              <li>Method 101 \u2014 in contact with insulation on one face \u2192 small derate built in.</li>
              <li>Method 102 \u2014 embedded in insulation on more than one face but not totally enclosed \u2192 significant derate built in.</li>
              <li>Method 103 \u2014 totally enclosed, length 0.5 m or longer \u2192 maximum derate built in (typically 35\u201350 percent reduction versus Method C).</li>
            </ul>
            <p>
              For cables that touch insulation in a way that does not match those four cases (e.g. a cable that runs in clear air for most of its length but briefly passes through a small zone of insulation that is not Method 100, 101 or 102), the standard lets you derive a custom Ci using the principles in Appendix 4 Section 5. In practice this is rare; the four standard methods cover virtually everything in domestic and small commercial work.
            </p>
            <p>
              The Ci = 0.5 figure that appears in older training materials and OSG editions specifically refers to the maximum derate for the Method 103 totally-enclosed case. It is the right number if you are computing CCC from Method C tabulated values and adjusting for total enclosure \u2014 but in modern BS 7671 you simply read Method 103 directly and the correction is already there. Either route gives the same answer; mixing the two double-counts.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 \u2014 Regulation 523.5 (Single-core cables and cables in groups)"
            clause="The current-carrying capacity of cables installed in groups shall be reduced from the value applicable to a single circuit by an appropriate group reduction factor (Cg) given in the relevant tables of Appendix 4. The factor depends on the number of circuits, the geometric arrangement of the group and the method of installation."
            meaning={
              <>
                Reg 523.5 makes Cg mandatory wherever cables are grouped. The table you read
                (4C1\u20134C5) depends on the geometric arrangement \u2014 single-layer touching,
                multi-layer, in trunking, single-core trefoil, on perforated tray with spacing.
                You must verify the geometry on site matches the table you read; an apprentice
                who reads Table 4C5 (spaced on tray) for cables that are actually touching is
                under-derating and the install fails.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 523.5; Cg tables 4C1\u20134C5."
          />

          <ConceptBlock
            title="The site survey is where the derates are actually decided"
            plainEnglish="A spec sheet handed to you by an architect says nothing about Ca, Cg or Ci. The site survey is where you read the ambient temperature, count the cables that will share the entry zone, identify which sections of the route hit insulation. Skip the survey and the derates are guesses."
            onSite="Carry an infra-red thermometer and a tape measure on every survey. Photograph the proposed cable route. Note how many other circuits are coming out of the existing CU. The five minutes you spend reading the actual conditions saves the hour you would otherwise spend on site discovering that your sized cable does not fit, does not pull, or is undersized."
          >
            <p>
              The Ca / Cg / Ci numbers do not come from the standard \u2014 they come from the site. The standard publishes the lookup tables; the survey supplies the inputs to those lookups. Without an honest survey:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Ca is a guess. You may assume 30 \u00b0C ambient because the building feels cool when you visit in March; the same loft hits 42 \u00b0C in July and your design under-derates.
              </li>
              <li>
                Cg is a guess. You may not know the existing CU has six circuits sharing one entry zone until you arrive on installation day, by which point your spec\u2019d 4 mm\u00b2 should have been 6 mm\u00b2.
              </li>
              <li>
                Ci is a guess. You may not realise the loft has been recently insulated to 300 mm depth until the Method 103 calc kicks in on site and your CSA selection needs to grow.
              </li>
            </ul>
            <p>
              Good survey practice for cable selection: take the ambient temperature in the worst part of the route on a hot day (or model it by adding 10\u201312 \u00b0C to a winter survey reading). Count the existing circuits at every shared entry zone. Photograph and measure every section where the cable would touch or pass through insulation. The whole survey takes 15 minutes and removes 90 percent of the design risk.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The worked stack-up</ContentEyebrow>

          <ConceptBlock
            title="A real circuit through the full derate stack"
            plainEnglish="Take a 40 A circuit serving a small commercial kitchen extractor in a converted loft. Walk every gate of the derate maths and watch the required tabulated It grow as each factor takes its bite."
            onSite="The numbers below are verified arithmetic. Run the same calc yourself with a calculator before reading the answer \u2014 the muscle memory of doing the multiplication is what makes it stick."
          >
            <p>
              <strong>The brief:</strong> a 40 A radial feeding a kitchen extractor unit in a converted loft. Single-phase 230 V, TN-C-S supply. Cable is 70 \u00b0C thermoplastic two-core T&E. Route is 18 m long: out of the consumer unit grouped touching with three other final-circuit cables for 0.7 m at the entry zone, then in clear air across the rest of the loft floor (joists, no insulation immediate contact), with summer ambient up to 40 \u00b0C in the loft.
            </p>
            <p>
              <strong>Step 1 \u2014 design current Ib:</strong> 40 A (worst-case nameplate of the extractor and its associated controls, no diversity for a single dedicated load).
            </p>
            <p>
              <strong>Step 2 \u2014 protective device In:</strong> 40 A BS EN 60898 Type C MCB (the extractor has a small inrush from the motor, so Type C rather than Type B). In = 40 A satisfies In \u2265 Ib.
            </p>
            <p>
              <strong>Step 3 \u2014 Reference Method:</strong> Method C (clipped direct, multi-core, non-metallic surface, still air) for the 17.3 m running across the joists. The first 0.7 m of grouping is the worst section for Cg, but it is still mechanically Method C \u2014 the cables are bunched together but they are clipped to the same joist with air around them.
            </p>
            <p>
              <strong>Step 4 \u2014 derate factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ca</strong> at 40 \u00b0C ambient (Table 4B1, 70 \u00b0C cable) = <strong>0.87</strong>.</li>
              <li><strong>Cg</strong> for four cables touching, single layer (Table 4C1) = <strong>0.65</strong>. The 0.7 m touching distance is borderline for Note 14; we apply Cg conservatively.</li>
              <li><strong>Ci</strong> = <strong>1.0</strong>. Cable is not in thermal insulation anywhere on the route.</li>
            </ul>
            <p>
              Combined derate = Ca \u00d7 Cg \u00d7 Ci = 0.87 \u00d7 0.65 \u00d7 1.0 = <strong>0.5655</strong>.
            </p>
            <p>
              <strong>Step 5 \u2014 required tabulated It:</strong> It \u2265 Ib / (Ca \u00d7 Cg \u00d7 Ci) = 40 / 0.5655 = <strong>70.73 A</strong>.
            </p>
            <p>
              <strong>Step 6 \u2014 pick CSA from Table 4D5 Method C column:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>10 mm\u00b2 \u2192 It \u2248 64 A \u2014 fails (need 70.73 A).</li>
              <li>16 mm\u00b2 \u2192 It \u2248 85 A \u2014 <strong>passes.</strong></li>
            </ul>
            <p>
              <strong>Step 7 \u2014 verify Iz:</strong> Iz = 85 \u00d7 0.5655 = <strong>48.07 A</strong>. Test inequality: Ib (40 A) \u2264 In (40 A) \u2264 Iz (48.07 A) \u2192 <strong>passes.</strong>
            </p>
            <p>
              The combined derate of 0.5655 means the cable is operating at only 56.55 percent of its as-tabulated capacity in this install. Without the derates, a 6 mm\u00b2 cable would have done the job (Method C It \u2248 47 A). With the derates, we needed to step all the way up to 16 mm\u00b2. That is what the derate machinery looks like in real numbers.
            </p>
            <p>
              <strong>Engineering choice:</strong> if we could relax the grouping (re-route so the four cables are not touching for that 0.7 m at the CU \u2014 perhaps stagger them through separate cable entries), Cg becomes 1.0 and the combined derate jumps to 0.87. Required It becomes 40 / 0.87 = 45.98 A. 6 mm\u00b2 (It = 47 A) just clears. That single mechanical change saves two CSA brackets and a meaningful copper cost.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 \u2014 Regulation 523.9 (Cables installed in proximity to thermal insulation)"
            clause="A cable installed in a thermally insulating wall, ceiling, floor or other building element shall have its current-carrying capacity reduced. Where the installation matches one of the standard methods given in Appendix 4 (Methods 100, 101, 102 or 103), the reduction is incorporated in the tabulated value and no separate Ci shall be applied. For other arrangements, an equivalent Ci shall be derived in accordance with Section 5 of Appendix 4."
            meaning={
              <>
                Reg 523.9 spells out the in-insulation derate. The standard\u2019s preference is
                that you pick one of the four standard insulation methods (100\u2013103) and use
                the tabulated value as-is, without applying a separate Ci. For unusual cases
                (cable in clear air for most of its length, briefly touching insulation in a way
                that does not match the standard methods), the standard lets you derive a custom
                Ci using the heat-balance principles in \u00a75. In practice, most everyday installs
                fall cleanly into Methods 100\u2013103 and the standard\u2019s preferred route applies.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 523.9; Methods 100\u2013103 in Appendix 4."
          />

          <ConceptBlock
            title="Other correction factors you may need to know about"
            plainEnglish="Ca, Cg, Ci handle 95 percent of everyday cable sizing. The remaining 5 percent uses one of the specialist factors \u2014 harmonics on multi-core cables, soil thermal resistivity for buried cables, depth-of-burial corrections, or parallel-conductor splits."
            onSite="Most domestic and small commercial work never touches these specialist factors. Once you start designing for offices with large LED arrays, plant rooms with VFDs, or sub-mains buried in unusual soil, the specialist factors come out and you reach for either the full BS 7671 Appendix 4 / 11 tables or specialist software."
          >
            <p>
              Other correction factors that the L3 designer should at least recognise:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ch \u2014 harmonic correction (BS 7671 Appendix 11).</strong> Three-phase circuits with significant third-harmonic content (LED drivers, switched-mode power supplies, UPS, large variable-speed drives) push extra current through the neutral conductor. The neutral can end up carrying as much as the line conductors, and Ch derates the multi-core cable\u2019s overall CCC accordingly. For typical domestic loads Ch = 1.0 (third-harmonic content is small); for commercial loads with more than 15 percent third-harmonic content, Ch can drop below 0.85.
              </li>
              <li>
                <strong>Soil thermal resistivity correction (Table 4B3).</strong> Buried cables under Method D assume soil thermal resistivity of 2.5 K\u00b7m/W. Damp clay (around 1.0 K\u00b7m/W) gives a correction above 1.0; dry sand (around 3.0 K\u00b7m/W) gives a correction below 1.0. Significant on long buried sub-mains.
              </li>
              <li>
                <strong>Depth-of-burial correction.</strong> Reference depth for direct-buried cables is 0.7 m. Cables buried deeper run cooler (more soil mass acts as a heat sink) and earn a small uplift; cables buried shallower run hotter and need a derate. The standard publishes the values in Appendix 4.
              </li>
              <li>
                <strong>Parallel-conductor splits.</strong> When the design current exceeds the largest available CSA in your cable family, you parallel two or more conductors per phase. Each parallel conductor must satisfy CCC for its share of the current, and grouping factors apply between the parallel conductors themselves. Specialist territory \u2014 normally only on industrial sub-mains and supply-side cables.
              </li>
            </ul>
            <p>
              You will not be expected to apply Ch or the soil correction in everyday Level 3 design exercises, but you must know they exist and recognise the install conditions that trigger them. On site, the prompt to dig deeper into Appendix 11 or 4B3 is usually a brief on a commercial fit-out with mixed loads, or a sub-main spec sheet that calls out the local soil type.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Adding correction factors instead of multiplying them"
            whatHappens={
              <>
                The apprentice has Ca = 0.94, Cg = 0.80, Ci = 0.85. They write the combined
                derate as 0.94 + 0.80 + 0.85 \u2212 2 = 0.59 (or some variant of additive maths)
                and end up either over-derating (combining is too aggressive) or under-derating
                (combining is too generous). The correct multiplicative answer is
                0.94 \u00d7 0.80 \u00d7 0.85 = 0.6392. The cable comes out the wrong size and the
                inequality test gives the wrong answer.
              </>
            }
            doInstead={
              <>
                Always multiply, never add. Combined derate = Ca \u00d7 Cg \u00d7 Ci \u00d7 any other
                applicable factor. Each factor is a fractional reduction; multiplying compounds them
                in the way the underlying physics actually compounds. BS 7671 Appendix 4 \u00a75
                states this explicitly. Check yourself by punching the multiplication into a
                calculator before writing the answer on the design sheet \u2014 it is the single
                cheapest sanity check in cable sizing.
              </>
            }
          />

          <Scenario
            title="The customer sees the cable schedule and says 'why is everything in 16 mm\u00b2 \u2014 the old cable was 6'?"
            situation={
              <>
                You have just spec\u2019d 16 mm\u00b2 T&E for a circuit that the previous installer ran
                in 6 mm\u00b2. The customer is annoyed at the cost and the install difficulty. The
                difference is real: you have applied Ca = 0.87 (40 \u00b0C loft), Cg = 0.65 (four
                grouped at the CU), and the previous installer either ignored both or applied
                neither. The previous install is non-compliant and has been quietly ageing since
                it was put in.
              </>
            }
            whatToDo={
              <>
                Walk the customer through the calc on paper. Show the survey ambient (40 \u00b0C),
                the grouping count (four cables), the Ca and Cg from the tables, the multiplied
                combined derate, the required tabulated It, and the CSA selection. Make the case
                that the previous install would fail a periodic inspection on Reg 433.1.1 and that
                you are correcting a long-standing shortcut. Document the conversation. If the
                customer demands you size to match the previous install, decline politely and
                walk away rather than certify a non-compliant new install.
              </>
            }
            whyItMatters={
              <>
                Cable selection is one of the easiest design areas to short-cut and one of the
                hardest shortcuts to undo once the cable is in the wall. The derate stack is the
                difference between an install that passes a periodic inspection in twenty years
                and one that fails on day one of testing. Hold the line.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 publishes three primary correction factors: Ca for ambient temperature (Table 4B1), Cg for grouping (Tables 4C1\u20134C5), and Ci for thermal insulation (built into Methods 100\u2013103, applied separately for non-standard cases).',
              'Stack correction factors multiplicatively: combined derate = Ca \u00d7 Cg \u00d7 Ci. Adding factors or taking only the worst factor is non-compliant and will give the wrong CCC.',
              "Required tabulated It \u2265 Ib / (Ca \u00d7 Cg \u00d7 Ci). That is the floor your cable\u2019s as-published CCC must clear in the matching Reference Method column.",
              'Ca distinguishes between 70 \u00b0C and 90 \u00b0C cables \u2014 the higher operating ceiling of thermosetting gives more thermal headroom and a less aggressive Ca for the same ambient.',
              "Cg geometry matters \u2014 single-layer touching (Table 4C1) is the headline domestic case; multi-layer (4C2), in trunking (4C3), single-core (4C4) and spaced on tray (4C5) each have their own table.",
              'Ci is built into Methods 100\u2013103. Never apply Ci as a separate multiplier on those columns \u2014 that is the most common cable-sizing error in apprentice work and over-engineers the cable by a CSA bracket.',
              "The trivial-grouping relaxation (Note 14 of Appendix 4 \u00a75.1) lets you ignore Cg for very brief touching sections (under about a metre). Apply with the local inspector\u2019s preference in mind \u2014 conservative practice still applies the full Cg.",
              'Re-engineering the install to remove a derate cause (split a group, lower the ambient, ventilate around insulation contact) is often cheaper than sizing up the cable to satisfy the derate.',
            ]}
          />

          <Quiz title="Correction factors \u2014 knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.2 Reference Methods
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Voltage drop design
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
