/**
 * Level 3 · Module 8 · Section 2 · Sub 2 — Question analysis techniques
 *
 * Mirrors L2 Module 8 Section 2 Sub 2 in voice and design but tailored to L3:
 *   - L3 distractors are deeper — built from BS 7671 mis-references, near-miss
 *     calculations, and the C2/C3 EICR coding boundary.
 *   - Multi-step calculations require formula recognition, not memorisation.
 *   - Three-phase questions need line/phase discipline.
 *   - Closed-book — you must hold the structure of BS 7671 in your head.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Question analysis techniques for the L3 paper | Level 3 Module 8.2.2 | Elec-Mate';
const DESCRIPTION =
  'How to read L3 closed-book MC questions properly — command words, distractor patterns built from BS 7671 mis-references, multi-step calculation discipline and the EICR coding C2-vs-C3 boundary.';

const checks = [
  {
    id: 'l3-m8-s2-sub2-command',
    question:
      "A Unit 305 question asks: 'What is the MOST suitable cable for a 32A radial circuit run 28m through a domestic loft, surrounded by 100mm of mineral wool insulation, with no other cables grouped alongside?'. What is the command word doing the work here?",
    options: [
      "'Most suitable' means the largest cable on the list, since a bigger conductor is always the safest choice regardless of cost or method.",
      "'Most suitable' means the cable that satisfies CCC, voltage drop and the installation method while staying reasonably economic.",
      "'Most suitable' means the cheapest cable available, since cost is the only deciding factor once the circuit functions correctly.",
      "'Most suitable' means whichever cable the manufacturer recommends, ignoring the installation method and voltage-drop calculation.",
    ],
    correctIndex: 1,
    explanation:
      "L3 questions use command words deliberately. 'Most suitable' is the BS 7671 economic-design language — the answer must comply (CCC after derating, voltage drop within limits, correct installation method) AND be reasonably economic (not over-engineered). Other L3 command words to know: 'minimum' (smallest compliant value), 'maximum' (largest compliant value), 'in accordance with' (read the regs literally), 'recommended' (best practice, may exceed minimum compliance).",
  },
  {
    id: 'l3-m8-s2-sub2-coding',
    question:
      "On a periodic inspection (EICR) you find a 30A BS 3036 rewireable fuse protecting a 2.5mm&sup2; ring final supplying socket-outlets in a domestic kitchen. The installation was completed in 1987 to BS 7671:1981 (15th edition). The fuse and circuit otherwise function correctly. What classification code applies and why?",
    options: [
      "C3 — improvement recommended. Compliant when installed under the 15th edition, now dated but not dangerous in normal service.",
      "C1 — danger present. The rewireable fuse exposes live parts and presents an immediate risk of injury, so make safe at once.",
      "C2 — potentially dangerous. A BS 3036 fuse on a ring final is always a credible harm pathway and must be urgently upgraded.",
      "FI — further investigation. The fuse's age means its condition cannot be judged on visual inspection, so the circuit must be opened up.",
    ],
    correctIndex: 0,
    explanation:
      "C3 is the 'improvement recommended' code for installations that complied at the time of installation but no longer reflect current standards. C2 is reserved for 'potentially dangerous' — for example, no RCD protection on a circuit where one is now required for additional protection, AND there is a foreseeable mechanism for harm. C1 is 'immediately dangerous' — for example, exposed live conductors or no earth where one is required. The C2 vs C3 line is the single most-tested EICR judgement in Unit 304, and the question turns on whether there is a credible harm pathway in normal service, not whether the installation is dated.",
  },
  {
    id: 'l3-m8-s2-sub2-3phase',
    question:
      "A Unit 302 question gives you a balanced star-connected three-phase load with a phase voltage of 230V and asks for the line voltage. Three of the options are 230V, 398V and 690V. Which is the right answer and what is the trap?",
    options: [
      "230V — in a star system the line voltage equals the phase voltage, so root-3 does not apply and the two values are identical.",
      "690V — the line voltage equals the phase voltage multiplied by 3, giving three times the 230V phase value in a balanced star load.",
      "133V — the line voltage equals the phase voltage divided by root-3, because the star point reduces the voltage seen between lines.",
      "398V — in a star (Y) system the line voltage equals phase voltage &times; root-3 (~1.732), so 230 &times; 1.732 gives the line value.",
    ],
    correctIndex: 3,
    explanation:
      "Star: line voltage = phase voltage &times; root-3, line current = phase current. Delta: line voltage = phase voltage, line current = phase current &times; root-3. The trap distractor 230V works on candidates who haven't internalised the star/delta relationship — it is exactly the kind of 'looks plausible' answer that exam-setters use to catch unprepared candidates. The 690V trap (phase &times; 3) catches candidates who half-remember 'multiply by something around 3'. Memorise root-3 = 1.732 and which side of the equation it lives.",
  },
];

const faqs = [
  {
    question:
      "What command words do L3 papers use most often, and what do they each demand?",
    answer:
      "The L3 papers use 'most suitable' (compliant + economic), 'minimum' (smallest compliant value), 'maximum' (largest compliant value), 'in accordance with' (literal regs reading), 'recommended' (best practice, often exceeds minimum compliance), 'identify' (single correct option), 'state' (recall a fact), and 'calculate' (apply a formula). Each one points to a different answering strategy — 'most suitable' rewards balancing trade-offs, 'minimum' rewards squeezing to the smallest compliant value, 'in accordance with' punishes any creative interpretation.",
  },
  {
    question:
      "How do L3 distractors differ from L2 distractors?",
    answer:
      "L2 distractors are mostly 'right answer + obviously wrong' options. L3 distractors are 'right answer + three plausible-but-wrong options' — typically a near-miss calculation result (one derating factor missed), a mis-applied BS 7671 clause (the right number for the wrong condition), and a clause-confusion answer (Part 4 vs Part 5). Walking the four codes in EICR questions, and the elimination ladder on calculations, is how you avoid them.",
  },
  {
    question:
      "When a question references BS 7671 by clause number, do I need to know the actual number or just the principle?",
    answer:
      "Both, but priorities differ. You should know the structure (Part 1 = scope, Part 2 = definitions, Part 4 = protection, Part 5 = selection and erection, Part 6 = inspection and testing, Part 7 = special installations, Appendices for tables) and the headline clause numbers (411 = automatic disconnection, 433 = overload, 522 = external influences, 543 = protective conductors). The exam will not test obscure four-digit clause numbers from memory but will absolutely test that you know which Part contains protection-by-disconnection vs which contains cable selection.",
  },
  {
    question:
      "On EICR coding questions, how do I decide between C2 and C3 reliably?",
    answer:
      "The test is: 'Is there a credible mechanism for harm to a person under normal use, given the actual conditions on this installation?'. If yes, C2 (potentially dangerous). If the installation was compliant when built and just doesn't reflect current best practice, with no credible harm pathway, C3 (improvement recommended). Examples — no RCD on socket outlets used by ordinary persons in a TT system: C2 (no fault disconnection without RCD = harm pathway). BS 3036 fuse on a ring final installed in 1987, otherwise sound: C3 (dated, not dangerous).",
  },
  {
    question:
      "How should I approach a multi-step calculation question (cable size, Zs, voltage drop)?",
    answer:
      "Write the formula on rough paper FIRST, before plugging in numbers. Identify what is given and what is asked. Apply derating factors in the right order (Ca for ambient, Cg for grouping, Ci for thermal insulation — apply them as multipliers to the cable's tabulated It). Round sensibly — MC distractors are usually 5-10% apart, so two significant figures is normally enough. Cross-check against the answer options before committing — if your calculated result is 4.7A and the closest option is 5.0A with another at 50A, pick 5.0A.",
  },
  {
    question:
      "What about questions that ask 'which TWO statements are correct' or 'select all that apply'?",
    answer:
      "L3 unit papers occasionally use multi-select formats. Read the stem twice. Treat each statement independently — for each, ask 'is this true in the conditions given?'. Don't get drawn into ranking — multi-select means each true statement is a tick, each false statement is no tick. The trap is treating them as 'pick the best one' — you'll lose marks for missing the second correct option.",
  },
];

export default function Level3Module8Section2Section2() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> How to Pass Exams
          </button>

          <PageHero
            eyebrow="Module 8 · Section 2 · Subsection 2"
            title="Question analysis techniques for the L3 paper"
            description="How to read L3 closed-book MC questions properly — command words that change the answering strategy, distractor patterns built from BS 7671 mis-references, multi-step calculation discipline and the EICR coding C2-vs-C3 boundary that wins or loses Unit 304."
            tone="emerald"
          />

          <TLDR
            points={[
              "Read the question twice. Identify the command word ('most suitable', 'minimum', 'maximum', 'in accordance with') — it dictates your answering strategy. L3 questions reward command-word literacy more than L2 ones.",
              "L3 distractors are crafted to look plausible — near-miss calculations with one missed derating factor, mis-applied BS 7671 clauses, and the C2/C3 EICR borderline. Build the elimination ladder before you commit.",
              "Calculations: write the formula on rough paper before plugging in numbers. Apply derating factors in the right order. Round to two significant figures — the MC distractors are usually 5-10% apart.",
              "EICR coding: walk the four codes (C1, C2, C3, FI) for every coding question. The C2-vs-C3 line turns on whether there is a credible harm pathway in normal use, not whether the install is dated.",
            ]}
          />

          <ContentEyebrow>Read the question — and then read it again</ContentEyebrow>

          <ConceptBlock
            title="The two-read rule"
            plainEnglish="L3 question stems are denser than L2 ones. They typically combine a scenario (cable type, install method, length, environment), a constraint (current rating, ambient temperature, grouping), and a command (calculate, identify, select). Reading once is rarely enough to extract all three. The two-read rule — first read for context, second read for specifics — is the single most reliable technique for not falling into a setter's trap."
            onSite="Most candidates who fail an L3 question they actually knew the answer to failed because they answered the wrong question. They missed a 'NOT' in the stem, missed a unit conversion, or missed a constraint that ruled out two options. Two reads costs ~10 seconds and saves a mark — the maths always favours it."
          >
            <p>What to look for on each read:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Read 1 — context</strong>: what kind of installation, what kind of
                circuit, what kind of question (recall, calculation, judgement)?
              </li>
              <li>
                <strong>Read 2 — specifics</strong>: the numbers (current, length,
                temperature, voltage), the negatives (NOT, EXCEPT, OTHER THAN), the
                command word, and any constraints that rule answers in or out.
              </li>
              <li>
                <strong>Both reads should take ~20 seconds combined.</strong> More than
                30 seconds reading and you are over-thinking — pick the most likely command
                interpretation and start working.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The L3 command-word dictionary</ContentEyebrow>

          <ConceptBlock
            title="Command words and the answering strategy each demands"
            plainEnglish="L3 questions use command words deliberately. The same scenario can have a different right answer depending on whether the question asks for the 'most suitable', the 'minimum', the 'maximum' or 'in accordance with' an exact regulation. Treating them all as 'pick the right one' is how candidates lose marks they should have banked."
            onSite="The strongest L3 candidates pause for half a second on every question to identify the command word out loud (in their head). It is a discipline that has to be drilled into the mocks until it is automatic."
          >
            <p>The L3 command-word dictionary, with strategy:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Most suitable</strong> — balance compliance with economy. The
                answer is the cable, device, or method that satisfies all BS 7671
                constraints AND is reasonably economic. Not the cheapest, not the
                largest — the smallest compliant option that also handles the foreseeable
                installation conditions.
              </li>
              <li>
                <strong>Minimum</strong> — squeeze to the smallest compliant value. Used in
                cable-sizing questions (smallest CSA that satisfies CCC + voltage drop) and
                in disconnection-time questions (smallest device rating that disconnects
                within Table 41.1 limits).
              </li>
              <li>
                <strong>Maximum</strong> — largest permitted value. Used in Zs questions
                (largest measured Zs that satisfies the disconnection requirement at the
                given device rating), insulation-resistance questions, and grouping
                derating questions.
              </li>
              <li>
                <strong>In accordance with</strong> — read the regs literally. The answer
                is whichever option matches the actual BS 7671 wording or table value
                exactly. Creative interpretation is punished.
              </li>
              <li>
                <strong>Recommended</strong> — best practice, may exceed minimum
                compliance. Used in design questions and inspection-frequency questions.
              </li>
              <li>
                <strong>Identify / State</strong> — recall a fact or a definition. No
                calculation required. Most common in Unit 308 and on the Part 1/Part 2
                BS 7671 questions in Units 304 and 305.
              </li>
              <li>
                <strong>Calculate</strong> — apply a formula to the values given. Use
                rough paper. Round sensibly. Match against answer options.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four-distractor anatomy of an L3 question</ContentEyebrow>

          <ConceptBlock
            title="One right answer, three plausible wrong ones"
            plainEnglish="L3 MC questions give you four options. One is right. The other three are crafted to look right at a glance. Understanding the typical distractor patterns lets you recognise and eliminate them under time pressure."
            onSite="The strongest move on every L3 question is to scan the four options FIRST, before working the answer. It tells you what shape the right answer takes (a number? a code? a regulation reference?), and it lets you start eliminating the obviously implausible options before you commit to a calculation."
          >
            <p>The five common distractor patterns on L3 MC papers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Near-miss numerical</strong> — the answer one missing derating
                factor away from correct. Cable CCC questions love this — the option that
                would be right if you forgot Cg (grouping) or Ci (thermal insulation) is
                often present.
              </li>
              <li>
                <strong>Wrong-condition right-number</strong> — a real BS 7671 value, but
                for the wrong installation type. For example, the 80A Zs limit for a 32A
                Type B MCB at 230V (wrong device, right table).
              </li>
              <li>
                <strong>Clause confusion</strong> — Part 4 vs Part 5 vs Part 6 mis-
                allocation. The option that names the wrong Part of BS 7671 for the
                question's subject.
              </li>
              <li>
                <strong>Unit error</strong> — same number, wrong units. mA where it should
                be A; mV where it should be V; mm where it should be mm&sup2;.
              </li>
              <li>
                <strong>Plausible-but-wrong word</strong> — for definition questions,
                the option that contains a related-but-incorrect term (e.g., calling a
                supplementary equipotential bonding conductor a 'main equipotential bonding
                conductor').
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The elimination ladder"
            plainEnglish="On any L3 question where the answer doesn't immediately jump out, work the elimination ladder before guessing. Each rung you can climb improves your odds — from 25% (random) to 33% (one eliminated) to 50% (two eliminated) to 100% (three eliminated)."
            onSite="The elimination ladder is what separates a 65% candidate from a 75% candidate. It costs ~30 seconds extra per question, but on the 15-20 questions where you don't know the answer cold, it adds up to 4-6 marks across the paper."
          >
            <p>The four rungs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rung 1 — safety filter</strong>: rule out anything that would
                violate BS 7671 or HASAWA in obvious ways. Options that lower disconnection
                times below the required value, or that omit required protective measures,
                go first.
              </li>
              <li>
                <strong>Rung 2 — physical-plausibility filter</strong>: rule out impossible
                values (a 1.5mm&sup2; cable carrying 100A; a Zs of 0.0001&Omega; in a TT
                system; a voltage drop of 50% on a 32A radial).
              </li>
              <li>
                <strong>Rung 3 — clause-fit filter</strong>: of the remaining options,
                which actually answers the question the setter asked? An option about
                bonding when the question is about earthing goes here.
              </li>
              <li>
                <strong>Rung 4 — instinct + best fit</strong>: of the surviving options,
                which feels closest to your training? Trust the trained instinct — it is
                usually right.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Multi-step calculations — the formula-first habit</ContentEyebrow>

          <ConceptBlock
            title="Write the formula before you write the numbers"
            plainEnglish="Multi-step calculations on L3 (voltage drop, Zs, cable CCC after derating, RCD operating values, three-phase line/phase) are where most candidates lose calculation marks — not because they don't know the formulas, but because they plug numbers in mid-thought and lose track."
            onSite="The discipline is one line: write the formula in symbol form on rough paper, then write the numbers underneath, then calculate. Three lines, ~30 seconds extra, but it makes errors visible BEFORE you commit to an answer."
          >
            <p>The formula library every L3 candidate needs at fingertips:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage drop</strong>: Vd = (mV/A/m &times; Ib &times; L) / 1000.
                Limit: 3% lighting, 5% other (typical) — but check the table.
              </li>
              <li>
                <strong>Earth fault loop impedance</strong>: Zs = Ze + (R1 + R2). Compare
                to Table 41.1 for the given device rating and disconnection time.
              </li>
              <li>
                <strong>Cable CCC after derating</strong>: It (effective) = It (tabulated)
                &times; Ca &times; Cg &times; Ci. Then check Iz &gt;= Ib (and In &gt;= Ib,
                and Iz &gt;= In).
              </li>
              <li>
                <strong>Power (single phase)</strong>: P = V &times; I &times; cos&phi;.
                Apparent power: S = V &times; I.
              </li>
              <li>
                <strong>Three-phase star (Y)</strong>: V_line = V_phase &times; root-3
                (1.732); I_line = I_phase. Power: P = root-3 &times; V_line &times;
                I_line &times; cos&phi;.
              </li>
              <li>
                <strong>Three-phase delta</strong>: V_line = V_phase; I_line = I_phase
                &times; root-3.
              </li>
              <li>
                <strong>Transformer ratio</strong>: V_p / V_s = N_p / N_s = I_s / I_p.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Plugging numbers straight into the calculator without writing the formula"
            whatHappens={
              <>
                Candidate reads a voltage-drop question, immediately starts typing into the
                on-screen calculator (28 &times; 18 &times; 1.5 &divide; 1000 = 0.756). They
                pick the closest option (0.8V) and move on. The right answer was 0.756V
                (3.3% of 230V) — but the question asked for the percentage drop, not the
                volt drop. The 0.8V option was a deliberate trap. The right option was 3.3%.
              </>
            }
            doInstead={
              <>
                Write &quot;Vd = (mV/A/m &times; Ib &times; L) / 1000&quot; on rough paper.
                Then write &quot;Vd as percentage = (Vd / 230) &times; 100&quot;. Then
                plug numbers. The two lines force you to ask &quot;is the question asking
                for volts or percent?&quot; before committing — and that single check
                catches the trap nine times out of ten.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>EICR coding — the C2-vs-C3 line</ContentEyebrow>

          <ConceptBlock
            title="The four codes in plain English"
            plainEnglish="Every Unit 304 EICR coding question can be answered with the same four-step walk: C1 — immediately dangerous (action now); C2 — potentially dangerous (urgent action); C3 — improvement recommended (no immediate harm but doesn't reflect current standards); FI — further investigation required (you can't tell from what's visible). The C2/C3 line is the single most-tested judgement on the L3 papers."
            onSite="The setter will give you a scenario that sits exactly on the C2/C3 boundary. The discriminator is always: 'is there a credible mechanism for harm under normal use given the actual conditions described?'. If yes, C2. If the install is just dated and otherwise sound, C3."
          >
            <p>The four codes with examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C1 — Danger present, risk of injury</strong>: exposed live
                conductors, broken accessories with live parts accessible, no earth where
                one is required and a fault path exists.
              </li>
              <li>
                <strong>C2 — Potentially dangerous</strong>: no RCD on circuits supplying
                socket outlets used by ordinary persons (post-17th edition), missing main
                bonding to extraneous-conductive-parts on a TN system, accessory damage
                that exposes terminals to touch.
              </li>
              <li>
                <strong>C3 — Improvement recommended</strong>: BS 3036 fuses on
                installations compliant when built, no AFDD on circuits where now
                recommended (per A4:2026), wiring colours pre-2006 (red/black) that are
                otherwise sound, single-pole switching of neutrals in pre-15th edition
                installs.
              </li>
              <li>
                <strong>FI — Further investigation required</strong>: signs of overheating
                that can't be diagnosed without dismantling, suspected hidden damage
                behind a permanent fixture, intermittent fault behaviour that wasn't
                captured during the inspection.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <Scenario
            title="Walking a Unit 305 design question end-to-end"
            situation={
              <>
                Question: &quot;A consumer is planning a new 32A radial circuit to supply a
                heat pump in a detached garage 35m from the consumer unit. The cable will
                run buried in the ground in conduit, then surface-mounted along an outside
                wall, then through 200mm of mineral wool loft insulation. Ambient
                temperature is taken as 25&deg;C. No grouping. The installation is TN-C-S
                (PNB) with a measured Ze of 0.32&Omega;. State the MOST SUITABLE cable size
                in mm&sup2;.&quot;
              </>
            }
            whatToDo={
              <>
                Read 1 — context: 32A radial, 35m run, mixed install methods, TN-C-S, no
                grouping, command word &quot;most suitable&quot;. Read 2 — specifics: 25&deg;C
                ambient, 200mm thermal insulation, Ze = 0.32&Omega;. Scan the options —
                they will be a list of mm&sup2; values (likely 4, 6, 10, 16). Now work the
                ladder: (a) CCC after derating — pick the install method giving lowest CCC
                (loft insulation), apply Ci, then check the cable carries 32A; (b) voltage
                drop — Vd = (mV/A/m &times; 32 &times; 35) / 1000, must be &lt;5% of 230V
                (11.5V); (c) Zs check — Zs = 0.32 + (R1+R2 for 35m of selected cable),
                must satisfy Table 41.1 for 32A Type B MCB and 0.4s disconnection. The
                MOST SUITABLE answer is the smallest cable that passes ALL three checks.
                Don&apos;t over-spec.
              </>
            }
            whyItMatters={
              <>
                Unit 305 design questions are the tightest pacing test on the L3 papers
                because they require three independent compliance checks. The
                command-word literacy (&quot;most suitable&quot; means smallest compliant,
                not largest safe) and the formula-first discipline are what get you
                through them inside 3 minutes.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading negatives, NOTs and EXCEPTs</ContentEyebrow>

          <ConceptBlock
            title="The single biggest L3 question-misread trap"
            plainEnglish="L3 questions occasionally use 'NOT' or 'EXCEPT' or 'which of the following is FALSE'. Missing the negation reverses your answer entirely. The fix is the two-read rule and the habit of underlining (mentally or on rough paper) any negation word."
            onSite="On any question containing NOT, EXCEPT, INCORRECT or FALSE, do NOT answer in under 90 seconds. The risk of a misread is too high. Take the extra time, read both ways ('which IS true' and 'which is NOT true'), and pick the option that fits the negative version of the question."
          >
            <p>The negation traps that catch L3 candidates:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                &quot;Which of the following is NOT a TN system?&quot; — three options will
                be valid TN-system descriptions (TN-S, TN-C, TN-C-S) and one will be a TT
                or IT description. Easy to miss the NOT and pick the first TN you see.
              </li>
              <li>
                &quot;All of the following are required EXCEPT...&quot; — three required
                items, one not required. Easy to pick a required item if you skim.
              </li>
              <li>
                &quot;Which statement is FALSE?&quot; — three true statements, one false.
                Easy to pick a true statement if you read for true-ness.
              </li>
              <li>
                The fix: write a small dot or underline mentally against the negation
                word, and re-confirm before committing.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Read every L3 question twice — first for context, second for specifics. Catches negations, units and command words.",
              "L3 command words change the answering strategy: 'most suitable' = compliant + economic; 'minimum' = smallest compliant; 'maximum' = largest compliant; 'in accordance with' = literal regs.",
              "L3 distractors are crafted to look plausible. Five common patterns: near-miss numerical, wrong-condition right-number, clause confusion, unit error, plausible-but-wrong word.",
              "Use the elimination ladder: safety filter, physical-plausibility filter, clause-fit filter, instinct + best fit. Each rung climbed improves your odds.",
              "Multi-step calculations: write the formula before you write the numbers. Apply derating in the right order (Ca, Cg, Ci). Round to two significant figures.",
              "EICR coding C2 vs C3: C2 = credible harm pathway in normal use; C3 = dated but otherwise sound, no credible harm pathway. Walk all four codes (C1, C2, C3, FI) on every coding question.",
            ]}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../level3-module8-section2-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.1 Time management
              </div>
            </button>
            <button
              onClick={() => navigate('../level3-module8-section2-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Exam day preparation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
