/**
 * Module 2 · Section 1 · Sub 1 — Maths principles for electricians
 * Maps to City & Guilds 2365-02 / Unit 202 / LO1 / AC 1.1
 *   "identify and apply appropriate mathematical principles which are relevant
 *    to electrical work tasks"
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import UnitPrefixConverter from '@/components/apprentice-courses/UnitPrefixConverter';
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
import { OhmsLawTriangle, PowerTriangle } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Maths principles for electricians | Level 2 Module 2.1.1 | Elec-Mate';
const DESCRIPTION =
  'Fractions, percentages, ratios, transposition, indices and scientific notation — the maths an apprentice electrician actually uses on site.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'maths-transposition-check',
    question:
      'You know power (P = 2300 W) and voltage (V = 230 V). Which form of the power formula gives you the current?',
    options: ['I = P × V', 'I = V ÷ P', 'I = P ÷ V', 'I = V × P'],
    correctIndex: 2,
    explanation:
      "Transposing P = V × I gives I = P ÷ V. Same triangle as Ohm's law — top divided by either bottom letter gives the other. 2300 ÷ 230 = 10 A.",
  },
  {
    id: 'maths-percentage-check',
    question:
      'ESQCR allows the supply at the cut-out to sit between −6% and +10% of 230 V. What is the lowest voltage that still counts as compliant?',
    options: ['200 V', '207 V', '216 V', '220 V'],
    correctIndex: 2,
    explanation:
      '6% of 230 is 13.8. 230 − 13.8 = 216.2 V — round down to 216 V. The ±10% figure that gets quoted casually on site is wrong: ESQCR is asymmetric (−6% / +10%), so the legal floor is 216 V, not 207 V.',
  },
  {
    id: 'maths-prefix-check',
    question: 'Your insulation tester reads 250 MΩ. What is that in ohms?',
    options: ['250,000 Ω', '2,500,000 Ω', '250,000,000 Ω', '0.25 Ω'],
    correctIndex: 2,
    explanation:
      'Mega means × 1,000,000. 250 × 1,000,000 = 250,000,000 Ω. Massive — which is exactly what you want from insulation between live and earth.',
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "A 100 m cable run is split into four equal sub-sections to land junction boxes. What fraction of the run is each sub-section, and how many metres is that?",
    options: ['1/2 = 50 m', '1/3 ≈ 33 m', '1/4 = 25 m', '1/5 = 20 m'],
    correctAnswer: 2,
    explanation:
      'Four equal splits = quarters. 1/4 = 0.25 = 25%. 100 ÷ 4 = 25 m per sub-section. Same fraction maths shows up on cable sets, conduit drops and trunking divisions every week.',
  },
  {
    id: 2,
    question:
      'A 32 A ring final is loaded to 24 A. What percentage of its rated capacity is being used?',
    options: ['60%', '67%', '75%', '80%'],
    correctAnswer: 2,
    explanation:
      '24 ÷ 32 = 0.75 = 75%. Diversity calcs and load checks are this exact sum, just with bigger numbers.',
  },
  {
    id: 3,
    question:
      'Transpose V = I × R to make R the subject.',
    options: ['R = V × I', 'R = V ÷ I', 'R = I ÷ V', 'R = V + I'],
    correctAnswer: 1,
    explanation:
      "R = V ÷ I. Cover R on the Ohm's law triangle — V is on top, I is at the bottom, so it's V over I.",
  },
  {
    id: 4,
    question:
      'A two-gang light wired in parallel splits the current 1:1 between two identical lamps drawing 5 A total. What does each lamp draw?',
    options: ['1 A', '2.5 A', '5 A', '10 A'],
    correctAnswer: 1,
    explanation:
      "Identical loads in parallel split current evenly. 5 A ÷ 2 = 2.5 A per lamp. Same logic for any 1:1 ratio split.",
  },
  {
    id: 5,
    question: 'What is 4² (4 squared)?',
    options: ['8', '12', '16', '24'],
    correctAnswer: 2,
    explanation:
      '4 × 4 = 16. Indices appear in P = I²R and in cable cross-section areas (mm²) — get this wrong and you size the wrong cable.',
  },
  {
    id: 6,
    question: 'Convert 0.0035 A into milliamps.',
    options: ['0.35 mA', '3.5 mA', '35 mA', '350 mA'],
    correctAnswer: 1,
    explanation:
      'Milli means ÷ 1000, so to go FROM amps TO milliamps you × 1000. 0.0035 × 1000 = 3.5 mA.',
  },
  {
    id: 7,
    question: 'What is 4.7 × 10³ written as a normal number?',
    options: ['47', '470', '4,700', '47,000'],
    correctAnswer: 2,
    explanation:
      "Scientific notation: × 10³ moves the decimal three places right. 4.7 → 4700. You'll see it on capacitor markings and resistor tolerances.",
  },
  {
    id: 8,
    question:
      "A circuit pulls 2.4 kW at 230 V. Using P = V × I transposed, roughly what current does it draw?",
    options: ['5 A', '10 A', '13 A', '32 A'],
    correctAnswer: 1,
    explanation:
      'I = P ÷ V = 2400 ÷ 230 ≈ 10.4 A. Sits comfortably under a 13 A plug fuse — which is why most kettles and irons land in this bracket.',
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "I'm rubbish at maths. Will that hold me back as an electrician?",
    answer:
      "No, but you can't dodge it forever. The maths in this section is the same handful of moves repeated everywhere — fractions, percentages, transposing one formula, scientific notation, and the prefix system. Get those down and you'll cope with cable sizing, voltage drop, load calcs and your AM2 calc paper.",
  },
  {
    question: "Do I have to do it in my head, or can I use a calculator?",
    answer:
      'Calculator is fine — every working electrician uses one. But you need a sense of whether the answer looks right. If you key in 230 ÷ 10 and get 23,000, you know straight away you fat-fingered the decimal. The mental check stops you sizing a 95 mm² cable for a doorbell.',
  },
  {
    question: 'Why does it matter whether I write 0.5 or 1/2 or 50%?',
    answer:
      "They all mean the same value but they show up in different places. Decimals on instruments. Fractions on splits and ratios. Percentages on tolerances (±10%) and diversity. Knowing they're interchangeable means you don't freeze up when a label uses a form you weren't expecting.",
  },
  {
    question: 'Transposition keeps tripping me up. Any trick?',
    answer:
      "Use the triangle. Cover the letter you want; what's left tells you what to do. V on top, I and R underneath. Cover V → I × R. Cover I → V over R. Cover R → V over I. Same triangle works for P = V × I.",
  },
  {
    question: "What's the difference between mm and mm²?",
    answer:
      "mm is a length. mm² is an area — a length squared. Cable sizes (1.0, 1.5, 2.5, 4, 6, 10 mm²) refer to the cross-sectional area of the conductor, not its diameter. Mix them up and you'll undersize cables and trip MCBs all day.",
  },
  {
    question: 'Why do we use scientific notation at all?',
    answer:
      "Some electrical numbers are huge (insulation resistance in MΩ — millions) and some are tiny (RCD trip currents in mA — thousandths). Writing 0.000030 A on a test sheet is asking for a typo. Writing 30 mA, or 3 × 10⁻⁵ A, is cleaner and harder to misread.",
  },
];

export default function Sub1() {
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 1"
            title="Maths principles for electricians"
            description="Fractions, percentages, ratios, transposition, indices and scientific notation — the maths you actually use on site, not GCSE algebra for its own sake."
            tone="emerald"
          />

          <TLDR
            points={[
              'Five moves cover most electrician maths: fractions/decimals/percentages, ratios, transposition, indices, and scientific notation.',
              "Transposition is the big one — V = I × R, P = V × I, voltage drop, cable sizing all come back to rearranging one formula.",
              'Get a feel for the size of the answer before you trust the calculator. A wrong decimal place is the difference between safe and on fire.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Convert between fractions, decimals and percentages without a calculator for the obvious ones (½, ¼, 10%, 25%).',
              'Apply percentages to volt drop, diversity and supply tolerance (−6% / +10% on 230 V under ESQCR).',
              "Transpose V = I × R and P = V × I to find any unknown given the other two.",
              'Use indices (squared / cubed) in P = I²R and in cable cross-section (mm²).',
              'Read and write scientific notation for very large and very small electrical values.',
              'Convert between SI prefixes (k, m, M, μ) cleanly — no 1000× errors.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters</ContentEyebrow>

          <ConceptBlock
            title="The maths an electrician uses is narrow, not deep"
            plainEnglish="Same handful of sums, all day. Cable sizing, volt drop, load checks, prefix conversions — they're all five or six moves recycled."
            onSite="The supervisor doesn't care if you can do calculus. He cares that when the customer asks 'will my new oven trip the board?' you can do P ÷ V in your head and give a straight answer."
          >
            <p>
              You don't need university maths to wire a house. You need to handle fractions and
              percentages, transpose one or two formulas, and move cleanly between the SI prefixes
              (milliamps to amps, kilowatts to watts). That's most of the calc paper at Level 2 and
              most of what the tools day-to-day demand.
            </p>
            <p>
              The trap isn't the maths itself — it's getting careless with decimal places or units.
              A 30 mA RCD that gets recorded as 30 A on a test sheet is the kind of typo that fails
              an EICR. So is a 2.5 mm² cable mis-spec'd as 25 mm². Slow down for the units.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fractions, decimals and percentages</ContentEyebrow>

          <ConceptBlock
            title="Three ways of writing the same value"
            plainEnglish="½ = 0.5 = 50%. Same number, three outfits. Switch between them as the situation needs."
          >
            <p>
              On site you'll see all three forms. Decimals on instrument readouts (0.05 Ω
              continuity, 1.27 Ω earth loop). Fractions when something is split (a two-way switch
              splitting a circuit, a cable run halved between two boxes). Percentages on tolerances
              (±10% on 230 V) and on diversity factors when you size a board.
            </p>
            <p>
              Memorise the obvious ones and the rest fall out. ½ = 0.5 = 50%. ¼ = 0.25 = 25%. 1/3 ≈
              0.33 = 33%. Anything else is a calculator job — divide the top by the bottom for the
              decimal, multiply the decimal by 100 for the percentage.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Percentages where it actually counts"
            onSite="ESQCR allows the supply at the cut-out to sit between −6% and +10% of 230 V. So compliant range is roughly 216 V to 253 V. If you're reading 200 V at the head, that's a DNO problem, not a wiring problem."
          >
            <p>
              Percentages turn up in three big places at Level 2:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply tolerance:</strong> ESQCR sets the supply at 230 V with an
                asymmetric tolerance of −6% / +10%. That means anywhere from roughly 216 V to 253 V
                is still compliant at the cut-out.
              </li>
              <li>
                <strong>Volt drop limits:</strong> BS 7671 caps volt drop at 3% for lighting and 5%
                for other circuits (LV public supply). On a 230 V supply that's 6.9 V and 11.5 V
                respectively. Exceed it and the cable's too small.
              </li>
              <li>
                <strong>Diversity:</strong> Not every load runs flat-out at the same time. The OSG
                diversity tables let you reduce the assumed load by a percentage (often 40-66%) for
                things like sockets and cookers when sizing the board.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Appendix 12 (voltage drop)"
            clause="The voltage drop between the origin of the installation and any point in the installation should not exceed the values given in Appendix 12 — typically 3% for lighting circuits and 5% for other uses, expressed as a percentage of the nominal voltage of the supply."
            meaning={
              <>
                That's where percentages stop being a school exercise. On a 230 V supply, 3% = 6.9 V
                drop allowed for lighting; 5% = 11.5 V for everything else. Exceed it, your cable
                size is wrong and your installation fails the design check.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Appendix 12 for full text"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Ratios</ContentEyebrow>

          <ConceptBlock
            title="Ratios — the way splits get described"
            plainEnglish="A ratio is just a comparison. 1:1 means equal. 2:1 means one is twice the other. Same idea as a recipe."
          >
            <p>
              You'll meet ratios most often in transformer turns ratios (a 230:12 V transformer
              steps voltage down by about 19:1, since 230 ÷ 12 ≈ 19.2) and in current splits across
              parallel circuits.
              Two identical lamps wired in parallel split the current 1:1. Three resistors in
              parallel where one is half the resistance of the other two carry current in a 2:1:1
              split.
            </p>
            <p>
              Quick check: if a 240 V primary winding has 1000 turns and a secondary has 50 turns,
              the ratio is 1000:50, which simplifies to 20:1. Secondary voltage = 240 ÷ 20 = 12 V.
              You don't need the formula — just understand the proportional drop.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Transposition — the move you'll do every shift</ContentEyebrow>

          <ConceptBlock
            title="Rearranging a formula to find what you need"
            plainEnglish="One formula, three forms. V = I × R can be turned around to find I or R. The triangle does it for you."
            onSite="When a fault-finder asks 'what should the prospective fault current be?' you transpose Ohm's law: I = U ÷ Zs. That's it. Same move, every time, just with different letters depending on the test."
          >
            <p>
              The two formulas that come up constantly at Level 2:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V = I × R</strong> (Ohm's law) — relates voltage, current and resistance.
              </li>
              <li>
                <strong>P = V × I</strong> (power formula) — relates power, voltage and current.
              </li>
            </ul>
            <p>
              The triangle trick. Draw the triangle with the top letter on top and the other two
              underneath. Cover the letter you want and what's left tells you the operation.
            </p>
          </ConceptBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OhmsLawTriangle
              variant="V"
              caption="V = I × R · cover V to see why."
            />
            <PowerTriangle
              variant="dc"
              caption="P = V × I · same triangle trick, different letters."
            />
          </div>

          <ConceptBlock title="Worked example — transposing for current">
            <p>
              A 9 kW shower runs from a 230 V supply. What current does it pull?
            </p>
            <p>
              Start with P = V × I. Transpose for I: <strong>I = P ÷ V</strong>. Convert kW to W
              first (9 kW = 9000 W). Then 9000 ÷ 230 = 39.1 A. So the shower needs at least a 40 A
              MCB and a cable rated for 40 A in its install method — typically 10 mm² T&E.
            </p>
            <p>
              Notice three things you did automatically: transposed the formula, converted units
              (kW → W), and sanity-checked the answer (a 9 kW shower wanting roughly 40 A is in the
              right ballpark — domestic showers are notorious current pigs).
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

          <ContentEyebrow>Indices — squared and cubed</ContentEyebrow>

          <ConceptBlock
            title="Why squared numbers turn up everywhere"
            onSite="A 2.5 mm² cable means the conductor's cross-section area is 2.5 square millimetres — not its diameter. Get the symbol wrong and you'll spec the wrong cable."
          >
            <p>
              Indices are shorthand for repeated multiplication. 4² = 4 × 4 = 16. 4³ = 4 × 4 × 4 =
              64. They're not optional decoration on Level 2 — they sit inside two formulas you'll
              use weekly:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P = I² × R</strong> — power dissipated in a resistor (e.g. heat in a
                conductor). Double the current and you quadruple the heat. Why undersized cables
                cook so quickly.
              </li>
              <li>
                <strong>Cable area in mm²</strong> — 1.0, 1.5, 2.5, 4, 6, 10, 16 mm²… those numbers
                are square millimetres of copper, not millimetres of diameter.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Scientific notation and SI prefixes</ContentEyebrow>

          <ConceptBlock
            title="Big and tiny numbers, written tidily"
            plainEnglish="Scientific notation is just '× 10 to the something'. 4700 = 4.7 × 10³. 0.0001 = 1 × 10⁻⁴."
          >
            <p>
              Insulation resistance is in megohms (MΩ — millions of ohms). RCD trip currents are in
              milliamps (mA — thousandths of an amp). Capacitance is in microfarads (μF —
              millionths of a farad). Writing those out as "0.00003 A" is asking for a typo. Writing
              them as 30 mA, or 3 × 10⁻⁵ A in scientific notation, is cleaner and harder to misread.
            </p>
            <p>
              The prefix table you actually need:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>G (giga)</strong> = × 1,000,000,000 — rare, mostly insulation tester top of
                scale.
              </li>
              <li>
                <strong>M (mega)</strong> = × 1,000,000 — insulation resistance, supply
                impedances.
              </li>
              <li>
                <strong>k (kilo)</strong> = × 1,000 — kW, kVA, kΩ. Bread and butter.
              </li>
              <li>
                <strong>m (milli)</strong> = ÷ 1,000 — mA (RCD trip currents), mΩ (continuity).
              </li>
              <li>
                <strong>μ (micro)</strong> = ÷ 1,000,000 — μF (capacitors), μA (very low leakage).
              </li>
            </ul>
          </ConceptBlock>

          <UnitPrefixConverter />

          <RegsCallout
            source="BS 7671 — Table 64 (insulation resistance values)"
            clause="Acceptance criterion from Table 64: SELV and PELV circuits tested at 250 V DC shall have a minimum insulation resistance of 0.5 MΩ; circuits up to and including 500 V (other than SELV/PELV) tested at 500 V DC shall have a minimum of 1.0 MΩ; circuits above 500 V tested at 1000 V DC shall have a minimum of 1.0 MΩ."
            meaning={
              <>
                Note the units: <strong>MΩ</strong>, not Ω. A pass on a 230 V circuit needs the
                insulation resistance to be at least <strong>1,000,000 Ω</strong>. Misread as 1.0 Ω
                and you'd write up a dangerous installation as compliant. Get the prefix right
                before you sign anything.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 6 — Inspection and Testing, Table 64"
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="The decimal-place slip — the single biggest unforced error in electrician maths"
            whatHappens={
              <>
                You're sizing a circuit. You key 9000 ÷ 230 into the calculator. Phone vibrates, you
                misread the screen, write 391 A on the design sheet, spec a 400 A MCCB and 240 mm²
                cable for a domestic shower. Or worse — you write 3.91 A, spec a 6 A MCB, and the
                shower trips it the moment it kicks in.
              </>
            }
            doInstead={
              <>
                Do a mental sanity check before trusting the screen. A 9 kW shower at 230 V should
                be in the tens of amps — not three or four hundred, not less than ten. Build the
                habit of asking "does this look about right?" before you write anything down.
              </>
            }
          />

          <Scenario
            title="A 30 mA RCD that someone wrote up as 30 A"
            situation={
              <>
                You're shadowing on an EICR. The previous electrician filled out the test sheet by hand —
                under the RCD section, where the trip current should be 30 mA, he's written "30 A".
                Just an A instead of mA. The certificate has been issued and is sitting on the
                customer's records.
              </>
            }
            whatToDo={
              <>
                Flag it to your supervisor, retest the RCD, and reissue the certificate with the
                correct units. A 30 A trip current would be a 1000× error and would mean the RCD
                offered effectively no protection against shock — a fatal misread on paper, even if
                the physical RCD is fine.
              </>
            }
            whyItMatters={
              <>
                The unit is part of the value. A number on its own means nothing in electrical work.
                On every test sheet, every quote and every certificate, the prefix and unit get the
                same attention as the digits.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Five core moves: fractions/decimals/percentages, ratios, transposition, indices, scientific notation. That covers most Level 2 electrician maths.',
              "Transposing V = I × R and P = V × I is the highest-mileage skill. Use the triangle if rearranging in your head still feels shaky.",
              'P = I²R explains why undersized cables cook — the heat goes up with the square of the current.',
              'mm² is an area, not a diameter. Cables are sized by cross-sectional area of copper.',
              'SI prefixes (k, m, M, μ) shift the decimal in or out by three places at a time. Always read the prefix before the number.',
              'Sanity-check every calculator answer for ballpark size. A wrong decimal place is the most common — and most dangerous — maths error in electrician work.',
            ]}
          />

          <Quiz title="Electrician maths knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous module
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module 1 — Health and safety
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section1/1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                SI base and derived units
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
