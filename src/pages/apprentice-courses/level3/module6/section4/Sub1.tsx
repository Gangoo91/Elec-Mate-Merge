/**
 * Module 6 · Section 4 · Subsection 1 — Current-carrying capacity (CCC) and the Appendix 4 method
 * Maps to C&G 2365-03 / Unit 305 / LO4 / AC 4.1
 *   AC 4.1 — "Determine the current-carrying capacity of cables for given installation conditions using BS 7671 Appendix 4 and the IET On-Site Guide"
 * Layered: 2366-03 Unit 304 / AC 4.1; 5393-03 Unit 104 / AC 4.1
 *
 * Walks the apprentice through the Appendix 4 method end to end — what
 * tabulated current-carrying capacity (It) actually means, why It is not the
 * same as Iz, and how the method machinery (reference temperature, install
 * method, derate stack) sits behind every table column. Heavy OSG support
 * because the OSG is what most electricians actually carry.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import VoltageDropCalculator from '@/components/apprentice-courses/VoltageDropCalculator';
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
  'Current-carrying capacity — Appendix 4 method (4.1) | Level 3 Module 6.4.1 | Elec-Mate';
const DESCRIPTION =
  'How BS 7671 Appendix 4 (and the IET On-Site Guide) actually work. Tabulated It, derated Iz, the 30 °C reference baseline, and why the inequality Ib ≤ In ≤ Iz is the structural line every cable selection has to satisfy.';

const checks = [
  {
    id: 'it-vs-iz',
    question:
      "A 4 mm\u00b2 70 \u00b0C T&E cable has a tabulated It of 36 A in Reference Method C. With Ca = 0.94 and Cg = 0.80 applied to a 32 A radial, what is Iz, and does the cable comply with Reg 433.1.1?",
    options: [
      'Iz = 36 A, complies — the table figure is what counts.',
      'Iz = 36 \u00d7 0.94 \u00d7 0.80 \u2248 27.07 A, does NOT comply — Iz is below In = 32 A.',
      'Iz = 36 / (0.94 \u00d7 0.80) \u2248 47.87 A, complies.',
      'Iz = 36 + (0.94 + 0.80) = 37.74 A, complies.',
    ],
    correctIndex: 1,
    explanation:
      "Iz = It \u00d7 (product of all derate factors) = 36 \u00d7 0.94 \u00d7 0.80 \u2248 27.07 A. The required compliance line is Ib \u2264 In \u2264 Iz, so 32 A \u2264 27.07 A is false \u2014 the cable does not satisfy Reg 433.1.1 in those install conditions. You either step up to 6 mm\u00b2, change the install method to one with a higher It, or remove the derate cause (split the group, reduce ambient).",
  },
  {
    id: 'reference-30',
    question:
      'BS 7671 Appendix 4 quotes tabulated It values at a reference ambient air temperature of 30 \u00b0C. A loft cable will see 40 \u00b0C in summer. Which factor compensates for that, and from which Appendix 4 table?',
    options: [
      'No factor needed \u2014 the table figure already covers UK climates.',
      'Cg from Table 4C1.',
      'Ca from Table 4B1 (correction factor for ambient air temperature, 70 \u00b0C cable).',
      'Ci from Table 4D5 directly.',
    ],
    correctIndex: 2,
    explanation:
      "The ambient correction Ca lives in Table 4B1 (or the OSG equivalent, Table 6A). For a 70 \u00b0C thermoplastic cable in 40 \u00b0C ambient air, Ca \u2248 0.87. The base table figures assume 30 \u00b0C; whenever the actual ambient is hotter, you derate by Ca to keep the conductor below its operating temperature limit.",
  },
  {
    id: 'osg-tables',
    question:
      "Which IET On-Site Guide table is the everyday equivalent of BS 7671 Appendix 4 Table 4D5 for 70 \u00b0C thermoplastic two-core T&E flat cable?",
    options: [
      'Table 1A.',
      'Table F6 (current-carrying capacity, two-core 70 \u00b0C thermoplastic flat cable).',
      'Table 41.3.',
      'Table 7C (voltage drop only).',
    ],
    correctIndex: 1,
    explanation:
      "OSG Table F6 is the working tradesperson's everyday companion to Appendix 4 Table 4D5 \u2014 same data, condensed layout, mV/A/m alongside CCC. Inspectors accept either source. Most electricians use the OSG on the van and the full BS 7671 in the design office, but they have to agree.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does the term 'current-carrying capacity' (CCC, symbol Iz) of a cable actually mean?",
    options: [
      'The current at which the cable insulation melts.',
      'The maximum continuous current the cable can carry without exceeding its specified operating temperature limit (e.g. 70 \u00b0C for thermoplastic).',
      'The current at which the protective device trips.',
      'The current the cable can carry for one minute before failure.',
    ],
    correctAnswer: 1,
    explanation:
      "Iz is the maximum continuous current the cable can carry indefinitely without the conductor exceeding the temperature its insulation is rated for \u2014 70 \u00b0C for standard thermoplastic, 90 \u00b0C for thermosetting. At Iz, the cable runs hot but stable; above Iz, insulation degrades, the cable ages prematurely, and eventually fails.",
  },
  {
    id: 2,
    question:
      "Tabulated current-carrying capacity (It) in BS 7671 Appendix 4 is the value before or after correction factors are applied?",
    options: [
      'After \u2014 the table already includes derates.',
      'Before \u2014 the table assumes ideal conditions (30 \u00b0C ambient, no grouping, no insulation), and you apply Ca, Cg, Ci on top.',
      'It is the same as Iz under any conditions.',
      'It only matters for armoured cables.',
    ],
    correctAnswer: 1,
    explanation:
      "It is the as-tabulated baseline, taken from the relevant Appendix 4 table at the standard reference conditions: 30 \u00b0C ambient air, single circuit (no grouping), not in thermal insulation. Iz is the derated capacity actually available in your specific install: Iz = It \u00d7 Ca \u00d7 Cg \u00d7 Ci \u00d7 any other applicable factor.",
  },
  {
    id: 3,
    question:
      "Reg 433.1.1 of BS 7671 expresses the structural compliance line for cable selection as which inequality?",
    options: [
      'Ib \u2264 Iz \u2264 In',
      'In \u2264 Ib \u2264 Iz',
      'Ib \u2264 In \u2264 Iz',
      'Ib = In = Iz',
    ],
    correctAnswer: 2,
    explanation:
      "Reg 433.1.1: Ib \u2264 In \u2264 Iz. The protective device must let the design current through (In \u2265 Ib), and the cable must be able to carry whatever the device passes, including overload, until the device operates (Iz \u2265 In). The order is structural \u2014 load, then device, then cable.",
  },
  {
    id: 4,
    question:
      "A 6 mm\u00b2 70 \u00b0C T&E cable has tabulated It = 47 A (Method C). It is buried in 100 mm of loft insulation along most of its run. Which Reference Method's tabulated It column should you actually be reading?",
    options: [
      'Method C still \u2014 the cable is the same.',
      'Method 100, 101 or 103 (in thermal insulation) \u2014 these columns build the Ci derate into the tabulated value, so you do not double-apply.',
      'Method A or B \u2014 those are the highest figures.',
      'Whichever gives the largest value.',
    ],
    correctAnswer: 1,
    explanation:
      "Methods 100/101/102/103 cover cables in thermal insulation (loft, ceiling void, partial enclosure). The Ci derate is baked into those columns; you do not apply Ci separately. Reading Method C and then applying Ci on top would either over- or under-derate. Pick the column that matches the actual install.",
  },
  {
    id: 5,
    question:
      "If a tabulated It is 27 A and the install conditions give Ca = 0.91, Cg = 0.85 and Ci = 1.0, what is Iz?",
    options: ['27 A', '\u224820.88 A', '\u224834.91 A', '\u224825.43 A'],
    correctAnswer: 1,
    explanation:
      "Iz = It \u00d7 Ca \u00d7 Cg \u00d7 Ci = 27 \u00d7 0.91 \u00d7 0.85 \u00d7 1.0 = 27 \u00d7 0.7735 = 20.88 A. That is the actual capacity available in the install. If your design current is above 20.88 A you must size up.",
  },
  {
    id: 6,
    question:
      "Why does BS 7671 quote 70 \u00b0C and 90 \u00b0C operating limits rather than a single safe temperature?",
    options: [
      'Two suppliers historically used different specs.',
      "The insulation chemistry differs \u2014 standard thermoplastic (PVC) softens above ~70 \u00b0C, modern thermosetting (LSF, XLPE) cross-links and tolerates 90 \u00b0C continuously. The cable's tabulated CCC depends on which insulation it has.",
      'Different countries have different ambient temperatures.',
      "It is a typographical error in older editions.",
    ],
    correctAnswer: 1,
    explanation:
      "Insulation type sets the temperature ceiling. Thermoplastic (PVC, BS 6004 T&E, BS 7211 LSF) is rated to 70 \u00b0C continuous. Thermosetting (XLPE, EPR) is rated to 90 \u00b0C continuous. Higher operating temperature means higher tabulated CCC for the same CSA \u2014 a 4 mm\u00b2 thermosetting carries more current than a 4 mm\u00b2 thermoplastic in the same install method.",
  },
  {
    id: 7,
    question:
      "The IET On-Site Guide and BS 7671 Appendix 4 should give matching CCC numbers for the same cable in the same install method. If they disagree, what should you do?",
    options: [
      'Average the two.',
      'Use the larger value to give yourself headroom.',
      'Use BS 7671 \u2014 it is the underlying standard, the OSG is a derivative work; check whether the OSG edition is older than the BS 7671 amendment you are designing to.',
      'Use the OSG \u2014 it is friendlier to read.',
    ],
    correctAnswer: 2,
    explanation:
      "BS 7671 is the standard; the OSG is a derivative published by the IET to make the same data quicker to use on site. They should agree. When they disagree, it usually means one is from an older edition. Check the publication dates and use the version aligned with the current amendment (BS 7671:2018+A4:2026 at the time of writing).",
  },
  {
    id: 8,
    question:
      "On a typical job sheet the design pencils Ib = 26 A and the contractor fits a 32 A Type B MCB. The chosen cable, after derates, has Iz = 30 A. Does this comply with Reg 433.1.1?",
    options: [
      'Yes \u2014 Iz \u2265 Ib so the cable carries the load.',
      "No — the test is Ib ≤ In ≤ Iz, so In = 32 A and Iz = 30 A means the cable cannot safely carry the device rating; either size up the cable to give Iz ≥ 32 A or drop In to 25 A (assuming Ib = 26 A still leaves you a fit — it does not, so the cable size must increase).",
      'Maybe \u2014 depends on Vd.',
      'Yes \u2014 the device protects the cable so any Iz works.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 433.1.1 wants In \u2264 Iz. With In = 32 A and Iz = 30 A, that fails: on overload, the device permits 1.45 \u00d7 In = 46.4 A for a defined time before tripping, and the cable cannot survive that. The fix is either to size up the cable (more CSA, larger Iz) or pick a smaller device \u2014 but In must still be \u2265 Ib, so if Ib = 26 A then In must be at least 32 A and the cable has to grow.",
  },
];

const faqs = [
  {
    question: "What is the difference between It and Iz in plain language?",
    answer:
      "It is what the BS 7671 table tells you the cable can carry under the standard reference conditions \u2014 30 \u00b0C ambient air, on its own, in free air, no insulation. Iz is what that same cable can actually carry in your specific install once you have multiplied It by every applicable correction factor for ambient, grouping, thermal insulation, harmonics and so on. It is the catalogue figure; Iz is the on-the-job figure. Reg 433.1.1 only ever cares about Iz.",
  },
  {
    question: "Why does Appendix 4 split into so many tables (4D1, 4D2, 4D5, 4E1\u2026)?",
    answer:
      "Each table covers a different cable construction. 4D1 is single-core 70 \u00b0C thermoplastic non-armoured; 4D2 is multi-core 70 \u00b0C thermoplastic non-armoured; 4D4 / 4D5 is 70 \u00b0C thermoplastic flat T&E; 4E1 / 4E4 is the 90 \u00b0C thermosetting equivalents; 4F is mineral-insulated; 4H is paper-insulated. You pick the table that matches the cable family you are using, then read down the column for the install method.",
  },
  {
    question: "Where do the BS 7671 tabulated values actually come from?",
    answer:
      "Heat-balance equations done by the IEC. Each It value is the steady-state current that brings the conductor exactly to its insulation temperature limit when the cable is installed in the reference method, in still 30 \u00b0C air. The IEC publishes them in IEC 60364 series; BS 7671 Appendix 4 is the UK adaptation. The maths is real \u2014 the values are not arbitrary safety margins, they are physics.",
  },
  {
    question: "Can I use the manufacturer's data sheet instead of Appendix 4?",
    answer:
      "Yes, for non-standard cables (mineral, fire-resistant, special temperature, large industrial single-cores), the manufacturer's data sheet is the right source and BS 7671 expects you to use it. For standard 70 \u00b0C T&E, 90 \u00b0C thermosetting and SWA in the everyday CSAs, Appendix 4 / OSG is what you reach for and what an inspector will check against. Always document which source you used.",
  },
  {
    question: "Does the cable temperature limit ever come into play directly, not just through CCC?",
    answer:
      "Yes \u2014 in two places. First, the thermal-constraint check (Sub 5) uses the same temperature limit to verify the cable can survive a fault for the disconnection time without the conductor exceeding the short-circuit temperature ceiling. Second, the resistance of the conductor at full load is calculated at the operating temperature (typically using the 1.20 multiplier for copper at 70 \u00b0C above 20 \u00b0C ambient), which feeds into the Vd and Zs gates.",
  },
  {
    question: "Is the 'design current Ib' the same as the load nameplate?",
    answer:
      "Sometimes, sometimes not. For a fixed appliance with a continuous nameplate (a 7 kW shower draws 30.4 A continuously, full stop), Ib equals the nameplate divided by voltage. For a sockets circuit serving variable loads, BS 7671 Appendix A diversity rules let you treat Ib as a fraction of the connected load \u2014 a domestic ring final has Ib of 32 A by convention even though the connected sockets could potentially draw more if everything were used at once. Diversity is the bridge between connected load and design current; get it wrong and your sizing is wrong from the first gate.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 6 · Section 4 · Subsection 1"
            title="Current-carrying capacity (CCC) and the Appendix 4 method"
            description="What the BS 7671 tables actually tell you, what they do not, and how the IET On-Site Guide collapses the same data into something you can use on the van. Tabulated It, derated Iz, the 30 \u00b0C reference baseline and the inequality Ib \u2264 In \u2264 Iz."
            tone="yellow"
          />

          <TLDR
            points={[
              'Iz is the actual, derated current-carrying capacity of a cable in its real install. It is the as-tabulated value from BS 7671 Appendix 4 at the 30 \u00b0C reference baseline, with no grouping and no insulation. Iz = It \u00d7 Ca \u00d7 Cg \u00d7 Ci \u00d7 any other applicable factor.',
              'Reg 433.1.1 sets the structural inequality for cable selection: Ib \u2264 In \u2264 Iz. Get any of the three out of order and the install is non-compliant on day one \u2014 either the device nuisance-trips on load, or the cable cooks on overload before the device responds.',
              'The IET On-Site Guide tables (F6, F7, F8, F9) are the working equivalent of Appendix 4 for everyday domestic and small commercial work \u2014 same data, condensed. For special cables, large CSAs or unusual install methods you go back to Appendix 4 in full.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define current-carrying capacity (CCC, Iz) and explain why it is set by the cable insulation temperature limit, not by an arbitrary safety figure.',
              'Read BS 7671 Appendix 4 Tables 4D2, 4D5, 4E2 and 4E5 confidently \u2014 selecting the correct cable construction and the column that matches the install Reference Method.',
              'Apply the inequality Ib \u2264 In \u2264 Iz from Reg 433.1.1 to verify a chosen cable / device combination.',
              "Use the IET On-Site Guide tables (F6, F7, F8, F9) as the everyday companion to Appendix 4, and recognise when the OSG's condensed layout is inadequate and you must return to the full standard.",
              "Distinguish tabulated It (as-published, reference conditions) from derated Iz (the on-site value), and never confuse the two when answering an inspector or documenting a design.",
              'Recognise the 30 \u00b0C ambient air reference baseline that sits behind every Appendix 4 column, and understand why a hotter or cooler ambient triggers the Ca correction.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="What current-carrying capacity actually is"
            plainEnglish="Cables get hot when current flows through them. Push too much current through and the insulation melts, the conductor anneals, and eventually the whole thing fails as a fire risk. CCC is the maximum continuous current that keeps the cable running below the temperature its insulation is built for."
            onSite="Treat CCC as a thermal limit, not a magic safety number. Every other gate in the cable-selection process exists to make sure the cable never breaches that thermal ceiling under any normal or overload condition."
          >
            <p>
              When current flows through a conductor, electrical resistance turns a fraction of that energy into heat. That heat has to escape \u2014 either by conduction into the surrounding wall, by convection into the air around the cable, or by radiation. If the heat in equals the heat out, the conductor sits at a stable temperature. If the heat in exceeds the heat out, the temperature climbs until something gives way.
            </p>
            <p>
              The temperature limit is set by the insulation. Standard 70 \u00b0C thermoplastic (PVC) insulation softens and degrades above 70 \u00b0C; modern 90 \u00b0C thermosetting (XLPE, EPR) is cross-linked and tolerates 90 \u00b0C continuously. BS 7671 Appendix 4 publishes a tabulated current-carrying capacity (symbol It) for every standard cable construction at every standard install method \u2014 that figure is the steady-state current that brings the conductor to exactly its insulation temperature limit when the cable is installed in the reference conditions.
            </p>
            <p>
              The reference conditions are tight: 30 \u00b0C ambient air, the cable on its own (no grouping with other circuits), not enclosed in thermal insulation. Any deviation from those conditions means the cable cannot carry the tabulated It \u2014 you must derate. The derated figure is called Iz. <strong>Iz is the value Reg 433.1.1 cares about.</strong>
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 \u2014 Regulation 433.1.1 (Coordination between conductor and overload protective device)"
            clause="The nominal current or current setting (In) of the protective device shall be not less than the design current (Ib) of the circuit, and shall not exceed the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit. Expressed as the inequality: Ib \u2264 In \u2264 Iz."
            meaning={
              <>
                Reg 433.1.1 is the headline compliance line for everything in this section. The
                designer picks Ib (the load), picks In (the device that protects the load) and
                picks Iz (the cable that carries the load). All three must satisfy the
                inequality. If they do not, the install is non-compliant on day one. The
                derate machinery in Appendix 4 exists to get from tabulated It to derated Iz
                so the inequality can be tested honestly.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 433.1.1."
          />

          <SectionRule />

          <ContentEyebrow>The Appendix 4 method, end to end</ContentEyebrow>

          <ConceptBlock
            title="The five steps the standard wants you to walk"
            plainEnglish="Appendix 4 is structured. You pick a cable family, pick an install method, read the tabulated It, multiply by every applicable correction factor to get Iz, then test against Ib \u2264 In \u2264 Iz. Five steps, in order, every time."
          >
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pick the cable family.</strong> 70 \u00b0C thermoplastic (Tables 4D1\u20134D5), 90 \u00b0C thermosetting (Tables 4E1\u20134E5), MICC (Table 4F), SWA (4D4 / 4E4 with armour columns) \u2014 each has its own dedicated table set.
              </li>
              <li>
                <strong>Pick the Reference Method.</strong> Methods A through G for everyday wiring, Methods 100\u2013103 for cables in thermal insulation. The Reference Method describes how the cable is physically installed (clipped, in conduit, in trunking, in insulation) and that drives the column you read.
              </li>
              <li>
                <strong>Read tabulated It.</strong> Down the column at your chosen CSA, the table gives you It \u2014 the current the cable can carry at the reference conditions (30 \u00b0C ambient, single circuit, free air or as the method describes).
              </li>
              <li>
                <strong>Apply the correction factors.</strong> Ca for ambient temperature (Table 4B1), Cg for grouping (Tables 4C1\u20134C5), Ci for thermal insulation (built into Methods 100\u2013103 \u2014 do not double-apply), and any others that apply (e.g. Ch for harmonic content on multi-core cables with significant third-harmonic load). Multiply them all together with It to get Iz.
              </li>
              <li>
                <strong>Test the inequality.</strong> Verify Ib \u2264 In \u2264 Iz. If it fails, either size up the CSA (revisit step 3 with the next bigger conductor) or change the install conditions to reduce the derate (split the group, lower the ambient, get the cable out of the insulation).
              </li>
            </ol>
            <p>
              That is the entire method. Every other gate \u2014 voltage drop, thermal constraint, Zs \u2014 is a separate downstream check. The Appendix 4 method itself is just these five steps and the inequality at the end.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <VoltageDropCalculator />
          </div>

          <ConceptBlock
            title="Why heat is the real enemy \u2014 insulation ageing in plain English"
            plainEnglish="Insulation does not fail catastrophically the first time it gets too hot. It ages. Each excursion above the temperature limit accelerates the chemistry of degradation. Five years later the cable looks fine but the insulation crumbles when you bend it."
            onSite="An old loft cable that crumbles at the back of a luminaire is almost always a cable that lived its life one CSA bracket too small. The Iz number you calculate today determines whether that loft cable survives twenty years or fifteen."
          >
            <p>
              The Arrhenius rule of thumb in electrical-insulation engineering: every 10 \u00b0C above the design temperature roughly halves the cable\u2019s service life. A 70 \u00b0C cable run continuously at 80 \u00b0C does not fail \u2014 it just ages twice as fast. Run at 90 \u00b0C and it ages four times as fast. That is why CCC compliance is non-negotiable: the consequences are spread over years, not weeks, and they show up as periodic-inspection downgrades and rewires rather than dramatic failures.
            </p>
            <p>
              The corollary: a cable that comfortably clears Iz with margin will outlast a cable that just scrapes Iz. The 30 percent thermal margin between &quot;passes by 1 A&quot; and &quot;passes by 10 A&quot; can mean the difference between a 25-year service life and a 40-year service life. On long buried runs, sub-mains and any concealed cable, that margin is real money saved on the next rewire.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Worked example \u2014 a 32 A radial socket circuit"
            plainEnglish="Walk a real circuit through the five steps. We will use BS 7671 Appendix 4 Table 4D5 because the cable is 70 \u00b0C T&E flat (the bread-and-butter domestic option)."
            onSite="Two-thirds of the cable selections you will ever do are this exact pattern. Memorise the shape of the calc and the rest is just changing the input numbers."
          >
            <p>
              <strong>The brief:</strong> a 32 A radial socket circuit, single-phase 230 V, T&E flat cable clipped direct to the joists in a small loft, ambient air up to 35 \u00b0C in summer, four other final-circuit cables touching at the consumer-unit entry zone for the first 0.5 m of the run.
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable family:</strong> 70 \u00b0C thermoplastic flat T&E \u2192 BS 7671 Table 4D5.
              </li>
              <li>
                <strong>Reference Method:</strong> clipped direct to a non-metallic surface \u2192 Method C.
              </li>
              <li>
                <strong>Tabulated It (Method C, 4 mm\u00b2):</strong> from Table 4D5 column for Method C, 4 mm\u00b2 \u2192 It \u2248 36 A. (Indicative; check the live edition for exact figures.)
              </li>
              <li>
                <strong>Correction factors:</strong> Ca = 0.94 at 35 \u00b0C ambient (Table 4B1, 70 \u00b0C cable). Cg = 0.80 for five circuits grouped together touching, single layer (Table 4C1). Ci = 1.0 (no insulation enclosure). Combined = 0.94 \u00d7 0.80 \u00d7 1.0 = 0.752.
              </li>
              <li>
                <strong>Iz:</strong> 36 \u00d7 0.752 = <strong>27.07 A</strong>. Test the inequality: Ib (32 A) \u2264 In (32 A) \u2264 Iz (27.07 A) \u2192 <em>fails</em>. The cable does not have enough capacity once the derates are applied. Solution: step up to 6 mm\u00b2.
              </li>
            </ol>
            <p>
              Re-running step 3 with 6 mm\u00b2 in Method C: It \u2248 47 A. Iz = 47 \u00d7 0.752 = 35.34 A. Test: 32 \u2264 32 \u2264 35.34 \u2192 <strong>passes.</strong> 6 mm\u00b2 T&E is the minimum CSA for this exact install. If we could remove the grouping (route the entry zone differently so the five cables are not touching for that 0.5 m), Cg becomes 1.0, the combined derate becomes 0.94, and 4 mm\u00b2 might just clear (36 \u00d7 0.94 = 33.84 A \u2265 32 A \u2014 passes by a whisker). That kind of mechanical fix sometimes saves a CSA bracket.
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

          <ContentEyebrow>The 30 \u00b0C reference baseline</ContentEyebrow>

          <ConceptBlock
            title="Why every Appendix 4 table assumes 30 \u00b0C ambient air"
            plainEnglish="The IEC test rig that produces the tabulated values runs at 30 \u00b0C. Every It in BS 7671 is calibrated to that condition. Hotter ambient means the cable has less thermal headroom \u2014 less heat can leave \u2014 so it carries less current safely. Ca is the multiplier that compensates."
            onSite="UK lofts in July hit 40\u201345 \u00b0C. Plant rooms can reach 50\u201355 \u00b0C. External walls in direct sun can pass 40 \u00b0C. None of those are the reference baseline. Always ask what the actual ambient is and apply Ca."
          >
            <p>
              The 30 \u00b0C figure is not a UK climate average \u2014 it is the standard test condition used by the IEC for the underlying heat-balance maths. The cable is suspended in still air at 30 \u00b0C and the current is wound up until the conductor sits at exactly its insulation temperature limit (70 \u00b0C for thermoplastic, giving a 40 \u00b0C temperature rise at full It). That current becomes the tabulated value.
            </p>
            <p>
              The implication: any installation hotter than 30 \u00b0C ambient has less than the full 40 \u00b0C of thermal headroom. The cable cannot safely carry the tabulated It under those conditions \u2014 you must derate to keep the conductor below 70 \u00b0C. Appendix 4 Table 4B1 publishes the Ca values for 70 \u00b0C cable at every common ambient: 35 \u00b0C \u2192 Ca = 0.94; 40 \u00b0C \u2192 Ca = 0.87; 45 \u00b0C \u2192 Ca = 0.79; 50 \u00b0C \u2192 Ca = 0.71. The same table publishes a different (more generous) Ca column for 90 \u00b0C thermosetting cable because the higher temperature ceiling gives more thermal headroom to start with.
            </p>
            <p>
              Conversely, ambient cooler than 30 \u00b0C means more headroom and Ca above 1.0 \u2014 a 25 \u00b0C ambient gives Ca = 1.03 for 70 \u00b0C cable. In practice most UK designers do not apply Ca above 1.0 because the saving is tiny and the thermal margin is welcome insurance. Compliance does not require it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 \u2014 Regulation 522.1.1 (Ambient temperature)"
            clause="A wiring system shall be selected and erected so as to be suitable for the highest and lowest local ambient temperatures and so that the limiting temperature in normal operation (see Table 52.2) and the limiting temperature in case of a fault (see Table 43.1) will not be exceeded."
            meaning={
              <>
                Reg 522.1.1 is the regulation behind the Ca derate. It tells the designer to
                select the cable and the install method so that the operating-temperature limit
                in Table 52.2 (the normal-operation ceiling, e.g. 70 \u00b0C for thermoplastic)
                and the short-circuit limit in Table 43.1 (e.g. 160 \u00b0C for thermoplastic
                conductors during a fault) are never exceeded. Ca is the maths that ties an
                ambient temperature to a cable temperature, so the regulation can be satisfied
                in design rather than rediscovered after the cable has cooked.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 522.1.1; Ca correction values in Appendix 4 Table 4B1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Insulation type sets the ceiling</ContentEyebrow>

          <ConceptBlock
            title="70 \u00b0C thermoplastic vs 90 \u00b0C thermosetting \u2014 same conductor, different ceiling"
            plainEnglish="A 4 mm\u00b2 thermosetting cable carries more current than a 4 mm\u00b2 thermoplastic cable in the same install method. Not because the copper is different \u2014 it is identical \u2014 but because the insulation can sit hotter without degrading. More thermal headroom means more current."
            onSite="On commercial fit-outs you will increasingly see XLPE / LSF singles in trunking instead of T&E. The thermosetting jacket gives you a CSA bracket back compared to the thermoplastic equivalent \u2014 sometimes the difference between 6 mm\u00b2 and 4 mm\u00b2 on a marginal calc."
          >
            <p>
              The same 6 mm\u00b2 copper conductor carries different tabulated currents depending on which insulation surrounds it. Indicative figures from Appendix 4 (Method C, two-core, single-phase):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>6 mm\u00b2 70 \u00b0C thermoplastic T&E</strong> (Table 4D5 Method C) \u2014 It \u2248 47 A.
              </li>
              <li>
                <strong>6 mm\u00b2 90 \u00b0C thermosetting two-core</strong> (Table 4E5 Method C) \u2014 It \u2248 56 A.
              </li>
            </ul>
            <p>
              That is roughly a 19 percent uplift, achieved purely by changing the insulation chemistry. The cost: thermosetting cable is more expensive per metre, and the higher operating temperature can cause issues if the cable terminates into equipment rated only to 70 \u00b0C \u2014 some older accessories cap their terminal block to 70 \u00b0C, so the cable ages prematurely at the gland even if the run is fine. Always check the terminal compatibility before sizing on a thermosetting basis.
            </p>
            <p>
              In design office practice, thermosetting is the routine choice for any sub-main, any commercial sockets / lighting on conduit / trunking, and any installation where the cable runs through hot environments (plant rooms, roof voids). T&E remains the dominant choice for domestic final circuits because the cost difference is meaningful at small CSAs and the install method usually leaves enough headroom on thermoplastic anyway.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The OSG as everyday companion</ContentEyebrow>

          <ConceptBlock
            title="What the IET On-Site Guide actually replaces"
            plainEnglish="The OSG condenses Appendix 4 down to the four or five tables an electrician actually opens on a domestic or small commercial job. Same physics, faster lookup, smaller book."
            onSite="Carry the OSG in the van, keep BS 7671 in the office. The OSG is enough for 90 percent of cable selections you will ever do; the other 10 percent (large CSAs, special cables, complex grouping, harmonics) drive you back to the full standard."
          >
            <p>
              The OSG (currently Edition 9, aligned with BS 7671:2018+A4:2026) reproduces the bread-and-butter Appendix 4 data in a stripped-down format:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>OSG Table F6</strong> \u2014 70 \u00b0C thermoplastic flat T&E (BS 6004 / 7211): current-carrying capacity by Reference Method, mV/A/m alongside, for the everyday CSAs (1.0 \u2192 16 mm\u00b2). The single most-used table in the book.
              </li>
              <li>
                <strong>OSG Table F7</strong> \u2014 70 \u00b0C thermoplastic singles in conduit / trunking, Method B / E. Used for commercial fit-outs and steel-conduit work.
              </li>
              <li>
                <strong>OSG Table F8</strong> \u2014 90 \u00b0C thermosetting equivalents.
              </li>
              <li>
                <strong>OSG Table F9</strong> \u2014 SWA (BS 5467 / 6724) for sub-mains, outbuildings, garden EV chargers and the like.
              </li>
              <li>
                <strong>OSG Tables 6A / 6B</strong> \u2014 Ca and Cg correction factors in compact form.
              </li>
            </ul>
            <p>
              For a 32 A radial in domestic loft / wall cavity, you can do the entire CCC calc using only OSG Table F6 and Tables 6A / 6B. For a 200 A sub-main on SWA from a panel to an outbuilding, OSG F9 + 6A / 6B gives you the answer. Anything outside those everyday cases \u2014 paper-insulated cable in a high-voltage transformer feed, mineral-insulated fire-survival circuit, multi-core flex with harmonic content \u2014 sends you to the full Appendix 4.
            </p>
            <p>
              The OSG is published by the IET (the same body that publishes BS 7671 itself), so the data is authoritative and inspectors accept it without quibble. What inspectors will not accept is a calc done against an out-of-date OSG (e.g. Edition 8 numbers used on an A4:2026 install) \u2014 always check the front cover.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Where the OSG falls short \u2014 and you reach for the full Appendix 4"
            plainEnglish="The OSG covers the everyday cases. Anything unusual sends you back to the full standard. Knowing when to switch is a competence in its own right."
          >
            <p>
              The OSG drops out (or simplifies past the point of usefulness) for several common L3 scenarios:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Large CSAs (above 35 mm\u00b2 or so).</strong> OSG tables stop or get sparse at the larger CSAs; sub-mains and supply-side cables need the full BS 7671 4D / 4E / 4F tables.
              </li>
              <li>
                <strong>Three-phase grouping with mixed circuits.</strong> Cg for mixed single-phase / three-phase groups is properly handled in Appendix 4 Tables 4C1\u20134C5 with the full method; the OSG gives a simplified version that can over-derate.
              </li>
              <li>
                <strong>Harmonic content above 15 percent.</strong> The harmonic correction for multi-core cables carrying significant third-harmonic neutral current (typical of switched-mode loads, UPS, large LED arrays) lives in BS 7671 Appendix 11 \u2014 not the OSG at all.
              </li>
              <li>
                <strong>Underground cables in soil.</strong> Appendix 4 Tables 4D4 / 4E4 publish CCC values for direct-buried and ducted cables with thermal-resistivity correction factors (Table 4B3); the OSG only summarises the most common case.
              </li>
              <li>
                <strong>MICC (mineral-insulated copper-clad).</strong> BS 7671 Table 4F is dedicated to MICC; the OSG hardly touches it. Used in fire-survival circuits, you go to the standard or the manufacturer.
              </li>
            </ul>
            <p>
              The general principle: the OSG is a working subset, not a substitute. Anyone designing professionally needs the full BS 7671 to hand for the cases the OSG was never written to cover.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Reading the It column and calling that the answer"
            whatHappens={
              <>
                The apprentice opens Table 4D5, finds 4 mm\u00b2 in the Method C column at 36 A, and writes
                'cable rated 36 A, comfortably above the 32 A device, complies'. The actual install
                has Ca = 0.94, Cg = 0.80, so Iz is 27 A, not 36 A. The cable is undersized; the
                inspector codes it C2 at the next periodic; the customer pays for rework.
              </>
            }
            doInstead={
              <>
                Always write the calc as <strong>It \u2192 multiply derates \u2192 Iz \u2192 test inequality</strong>.
                Never quote the table figure as if it were Iz. On the design sheet, show It,
                show every Ca / Cg / Ci you applied, show the product, show Iz, then write the
                Reg 433.1.1 line with all three numbers. That paper trail is what defends the
                design at periodic inspection.
              </>
            }
          />

          <Scenario
            title="The site survey says 35 \u00b0C ambient. The customer says 'it's never that hot up there'."
            situation={
              <>
                You are designing a new 40 A circuit for a heat pump that lives in a converted
                loft. Your survey reads 34 \u00b0C ambient on a warm September day, and you size
                with Ca = 0.94 (35 \u00b0C, 70 \u00b0C cable). The customer says they have lived in
                the house twenty years and the loft never gets hotter than &quot;normal room&quot; \u2014
                they want you to use Ca = 1.0 to save them the cost of stepping up a CSA.
            </>
            }
            whatToDo={
              <>
                Politely refuse to back the design off. Your survey reading is the evidence;
                the customer's recollection is not. Ca is a thermal safety derate \u2014 the
                consequence of getting it wrong is accelerated insulation ageing and eventual
                fault. Document the survey temperature on the design sheet, document the
                customer's preference, and proceed with Ca = 0.94. If they insist, walk away
                from the job rather than certify a non-compliant design \u2014 you carry the
                liability for years after they have forgotten the conversation.
            </>
            }
            whyItMatters={
              <>
                Ca is one of the easiest derates to argue away on a site visit and one of the
                most expensive to undo if you get it wrong. A loft converted to a habitable space
                with a heat pump in it will see hotter peak temperatures than the same loft used
                for storage \u2014 and the cable runs through a cavity where convection is poor.
                Stick to the survey number; that is what it is for.
            </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Appendix 4 (current-carrying capacity)"
            clause={
              <>
                Tabulated current-carrying capacity of a cable is the tabulated current-carrying
                capacity (in amperes) of a cable as given in relevant tables. This is the
                reference value used before applying installation correction factors. The
                current-carrying capacity of a cable for continuous service under the particular
                installation conditions concerned is the current-carrying capacity (in amperes)
                of a cable when installed in the specific conditions of the installation. This
                accounts for grouping, temperature, and other correction factors.
              </>
            }
            meaning={
              <>
                Cable sizing pulls a tabulated value from Appendix 4 then applies correction
                factors for grouping, ambient temperature and any thermal insulation. The
                designer documents the tabulated value, the corrections applied, and the final
                installed-condition current-carrying capacity. Sizing is not a single look-up —
                it is a documented derivation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Appendix 4 — definitions, verbatim from published facets."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Iz is the cable\u2019s actual derated current-carrying capacity in your specific install. It is the BS 7671 Appendix 4 tabulated baseline at 30 \u00b0C ambient with no grouping and no insulation. Iz = It \u00d7 Ca \u00d7 Cg \u00d7 Ci \u00d7 any other applicable factor.',
              'Reg 433.1.1 expresses the structural compliance line as Ib \u2264 In \u2264 Iz. The protective device must let the load through; the cable must carry whatever the device passes until the device operates. That order is non-negotiable.',
              'The 30 \u00b0C ambient air reference baseline drives every Appendix 4 column. Hotter ambient means less thermal headroom; Ca compensates via Table 4B1.',
              'BS 7671 publishes separate tables for each cable family (4D for 70 \u00b0C thermoplastic, 4E for 90 \u00b0C thermosetting, 4F for MICC, 4H for paper) \u2014 pick the table that matches your cable.',
              'Methods 100\u2013103 already build the Ci insulation derate into their tabulated values; do not apply Ci on top, that is double-counting.',
              'The IET OSG (Tables F6, F7, F8, F9 plus 6A / 6B) is the working tradesperson\u2019s companion to Appendix 4 \u2014 same data, faster lookup. Inspectors accept either source as long as it is the current edition.',
              'Always document the calc as It \u2192 derates \u2192 Iz, with every correction factor itemised. Quoting the as-tabulated It as if it were Iz is the single most common cable-sizing error in apprentice work.',
            ]}
          />

          <Quiz title="Current-carrying capacity \u2014 knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section landing
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 4 \u2014 Cable selection
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 Reference Methods A\u2013G and 100\u2013103
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
