/**
 * Module 3 · Section 3 · Subsection 7 — Cable sizing worked end-to-end
 * Maps to City & Guilds 2365-02 / Unit 203 / LO3 / AC 3.3 (lightly touches LO4 / AC 4.5)
 *   AC 3.3 — "Determine minimum current carrying capacity of live conductors for given installation conditions"
 *   AC 4.5 — "Identify component parts of an earth loop impedance path" (light cross-reference for the Zs check)
 *
 * Synthesis Sub. One real circuit, ten gates, top to bottom — the real-world
 * cable sizing process that pulls Subs 3.1 to 3.6 into a single end-to-end
 * worked design. Calculator is embedded for the Vd gate.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import SimpleCableSizer from '@/components/apprentice-courses/SimpleCableSizer';
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
  'Cable sizing worked end-to-end (3.3) | Level 2 Module 3.3.7 | Elec-Mate';
const DESCRIPTION =
  'One real circuit, ten gates, top to bottom. Take a 32 A radial through every cable-sizing step end-to-end — design current, Reference Method, derate stack, voltage drop, thermal check, Zs sanity check, mechanical install, final Iz vs In.';

const checks = [
  {
    id: 'method-pick',
    question:
      'A T&E cable runs 2 m through 100 mm of loft insulation, then is clipped direct to the joists for the remaining 23 m. Which Reference Method drives the sizing calculation?',
    options: [
      'Method C (clipped direct) — the longest section wins.',
      'Method 100 / 103 (in thermal insulation) — the worst section governs because the cable will overheat there first.',
      'Average the two methods.',
      'Pick whichever gives the larger CSA after Vd check.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Appendix 4 makes you size for the worst portion of the run. Two metres in thermal insulation will reach the limiting temperature long before the clipped-direct section does, so Method 100 / 103 (Ci ≈ 0.5 for total enclosure) sets the floor. You can never size a cable on its easiest stretch.',
  },
  {
    id: 'derate-stack',
    question:
      'A 32 A radial socket circuit needs Ca = 0.94, Cg = 0.70, Ci = 0.5 (worst section in insulation). What is the minimum tabulated It the cable must have?',
    options: [
      'It ≥ 32 A — derates only matter for the load, not the cable.',
      'It ≥ 32 / (0.94 × 0.70 × 0.5) = 32 / 0.329 ≈ 97.3 A.',
      'It ≥ 32 × (0.94 + 0.70 + 0.5) = 67.6 A.',
      'It ≥ 32 / 0.5 = 64 A — only the worst factor counts.',
    ],
    correctIndex: 1,
    explanation:
      'Derate factors stack multiplicatively. The required tabulated CCC equals the design current divided by the product of every applicable correction factor. 32 / (0.94 × 0.70 × 0.5) = 32 / 0.329 ≈ 97.3 A. That is the number you take into Table 4D5 to look up the cable.',
  },
  {
    id: 'vd-percent',
    question:
      'A 25 m radial socket circuit at full design current of 32 A on 6 mm² T&E (mV/A/m = 7.3) gives what voltage drop, and is it inside the 5 % limit?',
    options: [
      'Vd = 7.3 × 32 × 25 / 1000 = 5.84 V — that is 2.54 % of 230 V — comfortably under 5 %.',
      'Vd = 7.3 × 32 × 25 = 5840 V — fails.',
      'Vd = 5.84 V — that is 12.7 % of 230 V — fails.',
      'Vd = 7.3 V — pass.',
    ],
    correctIndex: 0,
    explanation:
      'The mV/A/m figure already includes the out-and-back loop. Vd in volts = (mV/A/m × Ib × L) / 1000 = (7.3 × 32 × 25) / 1000 = 5.84 V. As a percentage of 230 V, that is 5.84 / 230 = 2.54 %. The non-lighting BS 7671 limit is 5 %, so the circuit clears Vd with margin.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'You are sizing a 25 m radial that runs through three derate environments. Which length and which derate factors set the required tabulated CCC?',
    options: [
      'Average the conditions over the whole 25 m.',
      'Use the easiest section — that is what the cable will mostly be doing.',
      'Use the worst section — the cable can only be as good as its hottest point — and apply the dominant Ca, Cg and Ci together.',
      'Ignore derates if the route is mostly clipped direct.',
    ],
    correctAnswer: 2,
    explanation:
      'Cables fail at the hottest point first. BS 7671 Appendix 4 makes you derate for the worst conditions on the route. If 2 m of the run is in thermal insulation and the rest is clipped direct, you must size on the in-insulation portion. That is non-negotiable.',
  },
  {
    id: 2,
    question:
      'A circuit has Ib = 25 A, Ca = 0.91, Cg = 0.80, Ci = 1.0 (no insulation). Required tabulated It is:',
    options: ['25 A', '~34.3 A', '~58 A', '~22 A'],
    correctAnswer: 1,
    explanation:
      'It ≥ Ib / (Ca × Cg × Ci) = 25 / (0.91 × 0.80 × 1.0) = 25 / 0.728 = 34.3 A. You then look up Table 4D5 (or relevant Reference Method table) and pick the smallest CSA whose tabulated CCC is at least 34.3 A.',
  },
  {
    id: 3,
    question:
      'Why is the BS 7671 inequality Ib ≤ In ≤ Iz, and not Ib ≤ Iz ≤ In?',
    options: [
      'Iz is always larger than In on any installation.',
      'In must be at or above Ib so it does not nuisance-trip; Iz must be at or above In so the cable can carry the trip current long enough for the device to operate without cooking the cable.',
      'It does not matter which way round.',
      'Because BS 7671 says so — no underlying reason.',
    ],
    correctAnswer: 1,
    explanation:
      'The protective device must let the design load through (In ≥ Ib). The cable must be able to carry whatever current the device lets through, including overload, until the device operates (Iz ≥ In). The order is structural: load, then device, then cable.',
  },
  {
    id: 4,
    question:
      'A 4 mm² T&E circuit (mV/A/m ≈ 11) carries a 32 A oven over a 30 m route. Vd in volts is:',
    options: ['1.05 V', '~10.56 V', '~33 V', '~3.5 V'],
    correctAnswer: 1,
    explanation:
      'Vd = (mV/A/m × Ib × L) / 1000 = (11 × 32 × 30) / 1000 = 10.56 V. As a percentage of 230 V that is 4.59 % — under the 5 % non-lighting limit, but only just. A site supervisor would size up to 6 mm² to leave headroom for diversity changes.',
  },
  {
    id: 5,
    question:
      'You have sized a 6 mm² T&E to satisfy CCC and Vd, but on site the conduit drop is already full and the cable will not pull. The correct response is:',
    options: [
      'Lubricate the cable and force it.',
      'Change the conduit size or add a draw box, then re-check the spacing factor (Sub 3.6) — sizing is not just electrical, it is mechanical too.',
      'Drop to 4 mm² to make it fit.',
      'Run the new cable surface.',
    ],
    correctAnswer: 1,
    explanation:
      'A cable sized perfectly on paper that cannot be installed is not sized at all. Mechanical and install constraints are part of the ten-gate process. You either re-size the containment, add a draw point, or re-route — never reduce the conductor.',
  },
  {
    id: 6,
    question:
      'For a 32 A Type B MCB on a TN-C-S system, BS 7671 Table 41.3 gives Zs ≤ ~1.37 Ω. With Ze = 0.35 Ω, the maximum permitted (R1 + R2) for the circuit is approximately:',
    options: ['0.35 Ω', '~1.02 Ω', '1.72 Ω', '1.37 Ω'],
    correctAnswer: 1,
    explanation:
      'Zs = Ze + (R1 + R2). Maximum (R1 + R2) = 1.37 − 0.35 = 1.02 Ω. If your chosen cable on the 25 m route gives a measured (R1 + R2) above that, the disconnection time is not met and you must either size up the CPC or add 30 mA RCD additional protection.',
  },
  {
    id: 7,
    question:
      'I²R thermal sanity check — a 6 mm² T&E carries 32 A over 25 m. Loop resistance ≈ 2 × 25 × 0.00308 ≈ 0.154 Ω. Power dissipated as heat in the cable run is about:',
    options: ['~5 W', '~50 W', '~158 W', '~500 W'],
    correctAnswer: 2,
    explanation:
      'P = I²R = 32² × 0.154 = 1024 × 0.154 ≈ 158 W. That is 158 W of low-grade heat shedding into whatever surrounds the cable. In free air on cleats it is fine. In thermal insulation, with no air movement, it cooks. That is why Ci is so brutal.',
  },
  {
    id: 8,
    question:
      'You design a circuit and every gate passes — CCC, Vd, thermal, Zs, mechanical. The final inequality you write on the design sheet is:',
    options: [
      'Ib ≤ Iz only.',
      'Ib ≤ In ≤ Iz, with Vd, I²R and Zs all separately verified within their respective limits.',
      'In = Ib exactly.',
      'Iz ≥ Ib only.',
    ],
    correctAnswer: 1,
    explanation:
      'The final design line is Reg 433.1.1 — Ib ≤ In ≤ Iz — and you record alongside it: Vd at full load (V and %), I²R thermal (W), and Zs at the furthest point against the Table 41.3 limit. That is what an inspector reads and what your future self will thank you for.',
  },
];

const faqs = [
  {
    question: 'Do I need to do all ten gates on every circuit, every time?',
    answer:
      'Yes — although on a quick like-for-like swap many of them are near-instantaneous in your head. The discipline matters more than the time it takes. Skip the Vd gate on a 50 m run and you will install a circuit that meets CCC but burns 6 % at the socket. Skip the Zs gate on a long radial and the MCB will not disconnect inside the required time on a fault. Every gate exists because something used to fail when people skipped it.',
  },
  {
    question: 'Where do the derate factors actually come from?',
    answer:
      'BS 7671 Appendix 4 carries the tables. Ca (ambient temperature) is in Table 4B1, Cg (grouping) in Tables 4C1 to 4C5, and Ci (in thermal insulation) is built into Methods 100 / 101 / 102 / 103 — you select the method and the derate is implicit. The On-Site Guide reproduces the same data in a more compact form. Either is acceptable for design — most apprentices use the OSG on the van and the full BS 7671 for the design office.',
  },
  {
    question: 'When should I size up beyond what the calc demands?',
    answer:
      'Whenever the design margin is thin and the install is hard to revisit. A 6 mm² that clears Vd at 4.9 % is technically compliant — but a future tenant adds an EV charger on a spur, the diversity changes, and the 6 mm² is now non-compliant. Sizing up to 10 mm² costs fifty quid and bullet-proofs the install. Long buried runs, sub-mains and any cable concealed behind a finished wall are obvious size-up candidates.',
  },
  {
    question: 'What is the difference between mV/A/m for 2-core and 3-or-4-core cables?',
    answer:
      'For single-phase circuits BS 7671 Appendix 4 quotes a 2-core figure that already accounts for line and neutral together (out and back). For three-phase, the 3- or 4-core figure is between phases and applies for a balanced load. Using the wrong column will halve or double your Vd answer — read the column header on Table 4D5 / 4D2 carefully.',
  },
  {
    question: 'Does the Zs sanity check belong in cable sizing or in earthing?',
    answer:
      'Both — that is why the AC flags it as a light cross-reference. Cable CSA directly affects (R1 + R2), so a Zs check feeds back into the cable choice. The full theory of Ze, R1 + R2 and disconnection times lives in §4 (LO4). For sizing, you only need to verify that your chosen CSA at the route length still meets the Table 41.3 maximum for the protective device fitted.',
  },
  {
    question: 'Is the SimpleCableSizer on this page the design tool I would use on site?',
    answer:
      'It is a teaching aid — fine for a Vd sanity check on a small radial, useful for spotting that you have under-sized at a glance. For real design work you use the BS 7671 tables themselves, an industry calculator (Amtech, ProDesign, Hager Sizer) that handles full Reference Methods and three-phase, and a manufacturer datasheet for any non-standard cable. Trust the tables, use the tool to learn the shape of the answer.',
  },
];

export default function Sub7() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 7"
            title="Cable sizing worked end-to-end"
            description="One real circuit, ten gates, top to bottom — the real-world cable sizing process. Take a 32 A radial through every cable-sizing step end-to-end: design current, Reference Method, derate stack, minimum CSA, voltage drop, thermal check, Zs sanity check, mechanical install constraints, and the final Ib ≤ In ≤ Iz inequality."
            tone="emerald"
          />

          <TLDR
            points={[
              'Cable sizing is a ten-gate process — Ib → In → Reference Method → derates → CSA → Vd → I²R → Zs → mechanical → final Ib ≤ In ≤ Iz. Skip a gate and the install bites you somewhere down the line.',
              'The worst section of the route governs the calc — 2 m of T&E in loft insulation can force the entire 25 m run up a CSA bracket because the cable can only be as good as its hottest point.',
              'Derate factors stack multiplicatively. Required tabulated It = Ib / (Ca × Cg × Ci). Then look up the smallest CSA in Appendix 4 whose tabulated CCC clears that figure, and verify Vd, I²R and Zs separately.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Run a complete ten-gate cable-sizing calculation on a single specified final circuit, end-to-end and unaided.',
              'Select the correct BS 7671 Reference Method for a route that crosses multiple install environments, and explain why the worst section governs.',
              'Apply ambient (Ca), grouping (Cg) and in-insulation (Ci) derate factors correctly, including which combinations stack and which are mutually exclusive.',
              'Read BS 7671 Appendix 4 Table 4D5 (and the matching mV/A/m column) confidently to pick a CSA from a required tabulated It.',
              'Verify a chosen CSA against the voltage drop limit (Reg 525.202 / Appendix 4 §6.4), the I²R thermal sanity check, and the Zs maximum from Table 41.3.',
              'Recognise when mechanical or install constraints (containment fill, bend radius, draw-in route) force a redesign that the electrical calc alone would not have caught.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Why this Sub exists"
            plainEnglish="Subs 1 to 6 each gave you one piece of the cable-sizing puzzle. This Sub takes a real circuit and makes you put every piece together in the right order — so when you see a job spec, you know exactly what to do first, second and last."
            onSite="Every electrician you will work with does this calc the same way. The order is fixed because each gate depends on the one before. Get the order right and the rest is arithmetic."
          >
            <p>
              Cable sizing is the calculation that decides how big a conductor you put in the
              wall. Get it wrong and the cable either nuisance-trips, overheats, drops too much
              voltage at the load, or fails to disconnect on a fault. Get it right and the
              installation is invisible — it just works, for decades.
            </p>
            <p>
              The discipline is to walk the same ten gates every time, in the same order. You
              design at gate one, you verify at gates seven, eight and nine, and you commit at
              gate ten. The maths is mostly Year 9 algebra; the judgement is everything.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The ten gates</ContentEyebrow>

          <ConceptBlock
            title="The ten-gate process — overview"
            plainEnglish="A single workflow that takes you from the load on the drawing to the cable in the wall. Memorise the order; the maths follows."
          >
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li><strong>Design current Ib</strong> — the full load the circuit will actually carry, including any diversity adjustment.</li>
              <li><strong>Protective device In</strong> — pick a standard rating where In ≥ Ib (Reg 433.1.1 first half).</li>
              <li><strong>Reference Method</strong> — pick the Appendix 4 method that matches the worst section of the route (Method A, B, C, 100, 103 etc.).</li>
              <li><strong>Derate factors</strong> — Ca (ambient), Cg (grouping), Ci (in insulation). Factors stack multiplicatively.</li>
              <li><strong>Required tabulated It</strong> — It ≥ Ib / (Ca × Cg × Ci). This is the floor your cable&rsquo;s tabulated CCC must clear.</li>
              <li><strong>Pick CSA from the table</strong> — smallest CSA in Table 4D5 (or matching method table) whose column shows It at or above the required figure.</li>
              <li><strong>Voltage drop check</strong> — Vd = (mV/A/m &times; Ib &times; L) / 1000, must be ≤ 3 % (lighting) or ≤ 5 % (other) of nominal voltage.</li>
              <li><strong>I&sup2;R thermal sanity check</strong> — power dissipated per metre at full load, sense-check that it is not cooking the cable.</li>
              <li><strong>Zs sanity check</strong> — Ze + (R1 + R2) ≤ Table 41.3 maximum for the protective device fitted (light cross-ref to Section 4).</li>
              <li><strong>Mechanical and install constraints</strong> — does it pull through the conduit, meet bend radius, fit the gland, satisfy the spacing factor (Sub 3.6)?</li>
            </ol>
            <p>
              The final compliance line you write on the design sheet is the BS 7671 inequality
              from Reg 433.1.1: <strong>Ib ≤ In ≤ Iz</strong>. The other gates back it up.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.1 (Coordination between conductor and overload protective device)"
            clause="The nominal current or current setting (In) of the protective device shall be not less than the design current (Ib) of the circuit, and shall not exceed the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit. Expressed as the inequality: Ib ≤ In ≤ Iz."
            meaning={
              <>
                Reg 433.1.1 is the structural line your whole sizing process is trying to satisfy.
                Ib comes from the load, In comes from the device you fit, and Iz is the
                derated tabulated CCC of the cable you have chosen. Every gate in the ten-gate
                process feeds one of those three numbers. The other gates (Vd, I²R, Zs,
                mechanical) are separate checks that have to clear independently — but Reg 433.1.1
                is the headline inequality.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 433.1.1."
          />

          <SectionRule />

          <ContentEyebrow>The worked example</ContentEyebrow>

          <ConceptBlock
            title="The brief — one real radial circuit"
            plainEnglish="A 32 A radial socket circuit, 25 m route. The first 2 m is T&E buried in 100 mm of loft insulation, then it pops out and is clipped direct along the joists for the remaining 23 m. Ambient up there is 35 °C in summer. Four other final-circuit cables share the entry to the consumer unit at the loft hatch, so we have a brief grouping zone too."
            onSite="A textbook example only in that the numbers are clean. The pattern — concealed start, surface run, brief grouping at the panel — is exactly what you will meet in real lofts and ceiling voids on jobs every week."
          >
            <p>
              You have been asked to design a new 32 A radial for a first-floor extension that
              will feed four double sockets in a small studio. Supply is 230 V single-phase
              TN-C-S, declared Ze = 0.35 Ω. Protective device is a 32 A BS EN 60898 Type B MCB.
              Cable is 70 °C thermoplastic T&E (6242Y).
            </p>
            <p>
              The route, in order from the consumer unit out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0&ndash;0.5 m — out of the CU, into the loft, grouped with four other circuits at the entry zone.</li>
              <li>0.5&ndash;2.5 m — buried in 100 mm of loft insulation across the gable end.</li>
              <li>2.5&ndash;25 m — clipped direct to the joists, in still air, ambient up to 35 °C.</li>
            </ul>
            <p>
              We will walk the ten gates. Every number below is verified.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Gate 1 — Design current Ib"
            plainEnglish="What load is the circuit actually going to carry? For a general-purpose 32 A radial that feeds a small group of sockets, you take the protective device rating as the worst-case design current — diversity has already been baked into the choice of a 32 A device for a domestic radial."
          >
            <p>
              <strong>Ib = 32 A.</strong> For a domestic socket radial of this scale, full design
              current equals the device rating. If this were a dedicated load (an oven, a shower,
              an EV charger) you would derive Ib from the rated power instead — for example a
              7 kW EV charger gives Ib = 7000 / 230 = 30.43 A, sized to a 32 A device, but
              <em> Ib for the cable calc is still the actual 30.43 A, not 32 A</em>.
              For our case, the design current and the device rating coincide.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Gate 2 — Protective device In"
            plainEnglish="Pick a standard device rating where In ≥ Ib. For 32 A worth of radial sockets, that is a 32 A MCB. Half of Reg 433.1.1 is now satisfied — you still owe the second half (Iz ≥ In)."
          >
            <p>
              <strong>In = 32 A</strong>, BS EN 60898 Type B. Type B because we have no expected
              inrush (no large motors, no transformers); Type B has the tightest magnetic trip
              window and gives the easiest Zs target for ADS. This decision feeds the Zs gate
              later — a Type C or D would loosen the Zs target but raise the disconnection
              risk.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="Gate 3 — Reference Method (worst section governs)"
            plainEnglish="Two install conditions on one cable. The 23 m of clipped-direct is fine. The 2 m in thermal insulation is brutal. We must size on the worst section because that is where the cable will hit its limiting temperature first."
            onSite="If you ever forget this rule, picture the section in the insulation as the bottleneck on a motorway. The four lanes of clear road past it do not help."
          >
            <p>
              For the clipped-direct portion, BS 7671 Appendix 4 gives Reference Method C
              (Table 4D5 column 6). For the in-insulation portion, the relevant method is
              <strong> Method 103</strong> (cable totally enclosed in thermal insulation,
              for cable lengths greater than 0.5 m). Method 103 already builds the Ci
              insulation derate into its tabulated CCC values — you do <em>not</em>
              additionally apply Ci on top.
            </p>
            <p>
              <strong>Decision:</strong> we size the whole 25 m using <strong>Method 103</strong>{' '}
              column figures because that is the limiting section.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Gate 4 — Derate factors"
            plainEnglish="Ambient is 35 °C, not the table reference of 30 °C. Five circuits group briefly at the loft hatch. Ci is built into Method 103 already. Stack the rest multiplicatively."
          >
            <p>
              From BS 7671 Appendix 4 Table 4B1 (correction factor for ambient air temperature,
              70 °C cable):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ca = 0.94</strong> at 35 °C ambient.</li>
            </ul>
            <p>
              From Table 4C1 (grouping correction factor, multi-core cables clipped direct,
              touching, single layer): five circuits grouped gives:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cg = 0.75</strong> for five grouped circuits — but this only applies to the brief grouped section. Strictly, you can apply Cg only where the grouping persists for more than ~1 m, and use the worst grouping factor that occurs for any extended length. For a tight loft-hatch entry zone of under a metre, BS 7671 Note 14 to Appendix 4 §5.1 lets you ignore Cg. For this calc we will be conservative and apply <strong>Cg = 0.75</strong> anyway as a safety margin.</li>
            </ul>
            <p>
              <strong>Ci is already in Method 103</strong> — do not double-count.
            </p>
            <p>
              Combined derate = Ca &times; Cg = 0.94 &times; 0.75 = <strong>0.705</strong>.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Gate 5 — Required tabulated It"
            plainEnglish="The cable&rsquo;s untouched table figure must be Ib divided by the combined derate. That gives you the floor — the smallest CCC the cable can have on paper before any conditions kick in."
          >
            <p>
              Required <strong>It ≥ Ib / (Ca &times; Cg)</strong> where Ci is built into Method 103.
            </p>
            <p>
              It ≥ 32 / 0.705 = <strong>45.39 A</strong>.
            </p>
            <p>
              That is what we now take into the BS 7671 Appendix 4 Table 4D5 Method 103 column.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Gate 6 — Pick the CSA from Appendix 4 Table 4D5"
            plainEnglish="Open Table 4D5, find the Method 103 column, and pick the smallest CSA whose tabulated CCC is at least 45.39 A. That is your cable."
            onSite="The Method 103 figures are noticeably smaller than Method C for the same CSA — that is the cost of total insulation enclosure. Reading the right column matters."
          >
            <p>
              Indicative Method 103 figures from BS 7671 Appendix 4 Table 4D5 (70 °C T&E,
              two cables loaded in totally enclosed insulation, single phase):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2.5 mm² → ~17.5 A — fails (need 45.39).</li>
              <li>4 mm² → ~23 A — fails.</li>
              <li>6 mm² → ~29 A — fails.</li>
              <li>10 mm² → ~40 A — fails (just).</li>
              <li>16 mm² → ~54 A — <strong>passes</strong>.</li>
            </ul>
            <p>
              <strong>Chosen CSA: 16 mm² T&E.</strong> Iz = 54 &times; 0.705 = 38.07 A &ge; 32 A
              ✓. The Method 103 derate is what is forcing this huge step. If we could
              eliminate the in-insulation portion (mechanical fix — clear a channel, use a
              metal capping route through the insulation, or re-route entirely above the
              insulation line), the controlling method would revert to Method C and the
              calc would resolve at 6 mm² instead. <em>This is the size-up rationale in action
              — and the obvious place to push back on the design.</em>
            </p>
            <p>
              Most apprentices would take this finding back to the supervisor. A 2 m channel
              cleared through the insulation costs an hour; the 16 mm² versus 6 mm² cable
              uplift costs the better part of a hundred quid plus heavier gland and termination
              kit. Engineering judgement, not just sums.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Gate 7 — Voltage drop check"
            plainEnglish="At the chosen CSA, work out the loop voltage drop at full design current over the route length. Compare to 3 % for lighting or 5 % for everything else."
          >
            <p>
              For 16 mm² T&E, BS 7671 Appendix 4 Table 4D5 gives mV/A/m ≈
              <strong> 2.8 mV/A/m</strong>.
            </p>
            <p>
              Vd = (mV/A/m &times; Ib &times; L) / 1000 = (2.8 &times; 32 &times; 25) / 1000 ={' '}
              <strong>2.24 V</strong>.
            </p>
            <p>
              As a percentage of 230 V: 2.24 / 230 = <strong>0.97 %</strong>.
            </p>
            <p>
              The non-lighting limit (Reg 525.202 / Appendix 4 §6.4) is 5 %. We are well under.
              For comparison, if the calc had landed at 6 mm² (mV/A/m = 7.3) instead, the Vd
              would have been (7.3 &times; 32 &times; 25) / 1000 = 5.84 V = 2.54 % — also under
              5 %. So the size-up to 16 mm² was driven by CCC alone, not by Vd.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.202 (Voltage drop in consumers&rsquo; installations)"
            clause="The above requirements are deemed to be satisfied if the voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment does not exceed that stated in Appendix 4, Section 6.4."
            meaning={
              <>
                Reg 525.202 points you at Appendix 4 §6.4 for the actual numbers — 3 % for
                lighting and 5 % for other loads (single-phase 230 V, public supply). The
                regulation itself is short because the limits are tabulated. If you exceed
                those, the equipment at the end of the cable starts seeing voltages outside its
                operating range — LED drivers flicker, motors run hot, kettles take longer to
                boil. Compliance keeps the customer&rsquo;s equipment within its design envelope.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 525.202; voltage-drop limits set out in Appendix 4 §6.4."
          />

          <ConceptBlock
            title="Gate 8 — I&sup2;R thermal sanity check"
            plainEnglish="At full load, how much waste heat is the cable shedding into its surroundings? A few watts is fine. A hundred-plus watts buried in foam insulation is a fire."
          >
            <p>
              For 16 mm² copper, the resistance is approximately
              <strong> 1.15 mΩ/m at 20 °C</strong> (rises by ~30 % at the conductor&rsquo;s 70 °C
              limit). Loop length is 2 &times; 25 = 50 m (out and back). Loop resistance ≈
              50 &times; 0.00115 = <strong>0.0575 Ω</strong>.
            </p>
            <p>
              Power dissipated as heat across the loop at full design current:
            </p>
            <p>
              P = I² &times; R = 32² &times; 0.0575 = 1024 &times; 0.0575 ={' '}
              <strong>≈ 58.9 W</strong>.
            </p>
            <p>
              Spread over 50 m of conductor that is 1.18 W/m — comfortable. By contrast, had
              the calc landed on 6 mm² (Cu resistance ~3.08 mΩ/m, loop resistance
              50 &times; 0.00308 = 0.154 Ω), the dissipation would have been
              32² &times; 0.154 = <strong>≈ 158 W</strong> total, or 3.16 W/m — exactly the
              kind of heat density that, sat in 100 mm of loft insulation, will eventually
              cook the cable. The thermal check confirms what Method 103 already told us:
              you cannot run a 6 mm² loaded to 32 A through that environment safely.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 423.1 (Protection against burns)"
            clause="Excepting equipment for which a Harmonized Standard specifies a limiting temperature, an accessible part of fixed electrical equipment within arm&rsquo;s reach shall not attain a temperature in excess of the appropriate limit stated in Table 42.1."
            meaning={
              <>
                Reg 423.1 sets the burn-risk limits for accessible equipment surfaces. The I²R
                thermal check on a cable is the upstream version of the same idea — keep
                the heat dissipation low enough that the cable insulation does not degrade
                and adjacent equipment stays within its rated temperature. A 6 mm² cable
                pushing 158 W of heat into loft insulation is not just a cable problem; it
                is a Chapter 42 thermal effects problem too.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 423.1."
          />

          <ConceptBlock
            title="Gate 9 — Zs sanity check (cross-ref Section 4)"
            plainEnglish="The fault loop has to be low enough that the MCB trips inside the required disconnection time. Ze is given (declared by the supply); R1 + R2 depends on the cable you chose; the sum has to come in under Table 41.3."
            onSite="Full Zs theory — Ze, R1 + R2, Table 41.3, disconnection times — is in Section 4. For sizing, the only question here is: at the CSA we just picked, does the route length give us a Zs we can live with?"
          >
            <p>
              From BS 7671 Table 41.3, max Zs for a 32 A Type B BS EN 60898 device on
              a 0.4 s disconnection time, single-phase 230 V, is approximately
              <strong> 1.37 Ω</strong>.
            </p>
            <p>
              Maximum allowable (R1 + R2) = Zs(max) &minus; Ze = 1.37 &minus; 0.35 ={' '}
              <strong>1.02 Ω</strong>.
            </p>
            <p>
              For 16 mm² / 6 mm² T&E (the standard 16 mm² T&E carries a 6 mm² CPC),
              the combined R1 + R2 from BS 7671 Appendix I tables is ~3.36 mΩ/m at 20 °C,
              or ~4.36 mΩ/m at the operating temperature multiplier of 1.20.
            </p>
            <p>
              Over 25 m: (R1 + R2) ≈ 25 &times; 0.00436 = <strong>0.109 Ω</strong>.
            </p>
            <p>
              Comfortably inside the 1.02 Ω budget. <strong>Zs ≈ 0.35 + 0.109 = 0.46 Ω</strong>,
              well under the 1.37 Ω limit. ADS gate clears with massive margin — typical for
              a circuit that has been size-bumped to satisfy CCC. <em>Pre-size on CCC and
              you almost always pass Zs by accident.</em>
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Gate 10 — Mechanical and install constraints"
            plainEnglish="Can you actually fit the cable? Does it pull through the conduit? Will the gland accept it? Is the bend radius respected? Does the trunking spacing factor (Sub 3.6) still work after you bumped from 6 mm² to 16 mm²?"
            onSite="This is where calcs collide with reality. A 16 mm² T&E is roughly twice the diameter of a 6 mm². The 20 mm conduit you specced for the 6 mm² will not accept the 16 mm². This gate sometimes sends you all the way back to gate 3."
          >
            <p>
              Quick mechanical pass for our 16 mm² T&E:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Bend radius</strong> — 16 mm² T&E is ~12 mm overall diameter; minimum bend radius is 8&times;OD per IET guidance, so ~96 mm at any change of direction. Easy on a clipped run, tight inside a JB.</li>
              <li><strong>Containment fill</strong> — if any of the route is in trunking or conduit, redo the Sub 3.6 spacing-factor calc with the new larger CSA before committing.</li>
              <li><strong>Termination</strong> — 16 mm² T&E into a 32 A MCB needs proper boot lugs and a torqued terminal. Some compact RCBO cages cap at 10 mm² — check the device datasheet.</li>
              <li><strong>Pull route</strong> — 25 m of 16 mm² T&E weighs noticeably more than 25 m of 6 mm². Plan the install: rollers, lubrication, second person on the pulling end.</li>
            </ul>
            <p>
              All four pass for our route — the cable is clipped direct for the bulk of its
              length, terminations are at a standard CU and a JB at the studio, no containment
              fill issues. <strong>Ten-gate process complete.</strong>
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The calculator</ContentEyebrow>

          <ConceptBlock
            title="Try the Vd gate yourself"
            plainEnglish="Use the SimpleCableSizer below to play with the Vd gate. Try the worked example: 16 mm² T&E, clipped direct, 25 m, 32 A, non-lighting. Then drop the CSA to 6 mm² and watch the percentage climb. Then push the length out to 50 m. The shape of the answer will start feeling familiar."
            onSite="On a real job you would run the same Vd numbers in a real design tool — Hager Sizer, Amtech, ProDesign, or the BS 7671 tables themselves. This sizer is a teaching aid only — fine for sense-checking, not for design submission."
          >
            <SimpleCableSizer />
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Skipping the Vd gate because the CCC gate already passed"
            whatHappens={
              <>
                The cable comfortably carries the design current — CCC says 6 mm² is fine for a
                32 A radial. You do not bother with the Vd gate. The customer&rsquo;s 50 m radial
                in a converted barn comes in at 7.3 % drop at the furthest socket. LED drivers
                start cutting out, the kettle takes 30 % longer to boil, and an inspector
                writes you up at periodic.
              </>
            }
            doInstead={
              <>
                Always run the Vd gate, even when CCC is comfortable. The two checks measure
                different things — CCC is about the cable cooking, Vd is about the load
                seeing enough voltage. A cable that is fine on CCC can fail Vd badly on a
                long run, and the fix is always to size up. Reg 525.202 / Appendix 4 §6.4
                is non-negotiable, not a recommendation.
              </>
            }
          />

          <Scenario
            title="Cable sized perfectly on paper, will not pull through the conduit"
            situation={
              <>
                You have just finished the ten-gate calc on a 32 A oven circuit. 6 mm² T&E
                clears CCC, Vd, I²R and Zs. The cable run goes through 8 m of existing 20 mm
                galvanised conduit between the kitchen and the consumer unit. You start the
                pull and the cable jams two metres in — there is already a redundant 1.5 mm²
                pair in the conduit and the spacing factor is now 53 %, well over the 45 %
                limit from Sub 3.6.
              </>
            }
            whatToDo={
              <>
                Stop the pull. Three options: (1) remove the redundant 1.5 mm² pair if it is
                truly disused — quickest fix and gets the spacing factor down to ~28 %. (2)
                Add a draw box midway and split the pull into two shorter runs — does not fix
                the fill issue but sometimes lets you get past a tight bend. (3) Replace the
                20 mm conduit with 25 mm if the route allows — proper fix but higher cost.
                Whatever you choose, redo the spacing-factor calc before committing.
                <strong> Never reduce the conductor CSA to make a mechanical problem go away</strong>{' '}
                — that breaks the electrical calc you just spent an hour proving.
              </>
            }
            whyItMatters={
              <>
                Cable sizing is electrical and mechanical at the same time. The ten gates exist
                because each one catches a class of problem the others miss. Mechanical
                constraints are gate ten for a reason — they have a habit of unwinding all
                the gates above them, and the only safe response is to redesign upstream,
                not compromise downstream.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.1.1 (Ambient temperature)"
            clause="A wiring system shall be selected and erected so as to be suitable for the highest and lowest local ambient temperatures and so that the limiting temperature in normal operation (see Table 52.2) and the limiting temperature in case of a fault (see Table 43.1) will not be exceeded."
            meaning={
              <>
                Reg 522.1.1 is the regulation behind the Ca derate at gate 4. The cable&rsquo;s
                tabulated CCC is given at a 30 °C ambient air reference temperature; any
                installation hotter than that needs a Ca correction below 1.0. A 35 °C
                loft gives Ca = 0.94. A 50 °C plant room gives Ca = 0.71. Get the ambient
                wrong and the cable runs over its limiting temperature in normal operation,
                accelerating insulation ageing and increasing fault risk.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 522.1.1; correction values in Appendix 4 Table 4B1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Cable sizing is a ten-gate process, in fixed order: Ib → In → Reference Method → derates → required It → CSA from table → Vd → I²R → Zs → mechanical. Skip a gate and the install bites you somewhere.',
              'The worst section of the route governs the calc. 2 m of T&E in loft insulation can force the entire 25 m run up multiple CSA brackets — Method 103 is unforgiving for a reason.',
              'Derate factors stack multiplicatively. Required tabulated It = Ib / (Ca × Cg × Ci). Methods 100/101/102/103 already include Ci — do not double-count.',
              'Reg 433.1.1 — Ib ≤ In ≤ Iz — is the headline inequality. Vd (Reg 525.202 / Appendix 4 §6.4), I²R thermal, and Zs (Section 4 / Table 41.3) are separate gates that must each clear independently.',
              'Voltage drop limits are 3 % for lighting and 5 % for other loads. Long runs and small CSAs are the routine fail conditions — always run the Vd gate, even when CCC is comfortable.',
              'Mechanical and install constraints (containment fill, bend radius, termination capacity, pull route) are gate ten for a reason. They sometimes send you back to gate three. Never reduce CSA to fix a mechanical problem.',
            ]}
          />

          <Quiz title="Cable sizing end-to-end — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.6 Spacing factor of enclosures
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-8')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.8 Designing a small installation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
