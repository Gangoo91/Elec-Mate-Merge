/**
 * Functional Skills · Module 1 · Section 3 — Algebra and formulae
 *
 * CONVERTED (13 Sep) to the StudyPage reading kit and rewritten around worked
 * examples, following Sections 1 and 2.
 *
 * Two quiz explanations were corrected rather than carried over:
 *
 *   - One said "the recommended maximum voltage drop for a 230 V circuit (5%) is
 *     11.5 V, so 9 V is compliant." BS 7671 Appendix 4 Table 4Ab gives 3% for
 *     lighting and 5% for other uses on a public LV supply, and both are
 *     *recommended* maxima. Calling 5% a permitted limit and a result
 *     "compliant" renders guidance as law, and the 3% lighting case was missing.
 *   - One concluded from a 13.04 A load that "a 16 A MCB is the minimum
 *     required protection." That is a design decision involving the cable, the
 *     installation method and the characteristics of the device — not something
 *     that follows from the arithmetic. The maths is the point on this page.
 *
 * The adiabatic question was kept: √(800² × 0.4) ÷ 115 = 4.4 mm² is correct, and
 * rounding up to 6 mm² is right. It is a good question because the rounding
 * direction matters, which is the theme running through this module.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Algebra and Formulae - Functional Skills Module 1.3';
const DESCRIPTION =
  'Functional Skills maths for electricians: symbols and substitution, Ohm’s law, the power formulae, transposing an equation for any subject, and the formulae you will meet on site — every one worked through.';

const quizQuestions = [
  {
    id: 1,
    question: 'A 12 Ω heating element carries 5 A. What voltage is across it?',
    options: ['2.4 V', '60 V', '17 V', '7 V'],
    correctAnswer: 1,
    explanation:
      'V = I × R = 5 × 12 = 60 V. When you know two of the three quantities in Ohm’s law, the third follows.',
  },
  {
    id: 2,
    question:
      'Rearrange the power formula P = IV to find the current drawn by a 3 kW immersion heater on a 230 V supply.',
    options: ['0.077 A', '12.50 A', '13.04 A', '1.30 A'],
    correctAnswer: 2,
    explanation:
      'Convert first: 3 kW = 3,000 W. Then I = P ÷ V = 3,000 ÷ 230 = 13.04 A. Which protective device suits it is a design question involving the cable and the installation method — the arithmetic only gives you the load current.',
  },
  {
    id: 3,
    question: 'Using P = I²R, what power is dissipated in a 6 Ω element carrying 10 A?',
    options: ['360 W', '60 W', '160 W', '600 W'],
    correctAnswer: 3,
    explanation:
      'P = I² × R = 10² × 6 = 100 × 6 = 600 W. Square the current first — BIDMAS puts indices before multiplication. Doing 10 × 6 then squaring gives 3,600 W, which is one of the ways this goes wrong.',
  },
  {
    id: 4,
    question:
      'Voltage drop is Vd = (mV/A/m × Ib × L) ÷ 1,000. If mV/A/m = 18, Ib = 20 A and L = 25 m, what is the voltage drop?',
    options: ['9,000 V', '0.9 V', '90 V', '9 V'],
    correctAnswer: 3,
    explanation:
      'Vd = (18 × 20 × 25) ÷ 1,000 = 9,000 ÷ 1,000 = 9 V. For context: BS 7671 Appendix 4 Table 4Ab recommends a maximum of 3% for lighting and 5% for other uses on a public LV supply — on 230 V that is 6.9 V and 11.5 V. So 9 V sits inside the recommendation for a power circuit but outside it for lighting.',
  },
  {
    id: 5,
    question: 'Rearrange V = IR to find R when V = 230 V and I = 10 A.',
    options: ['2,300 Ω', '23 Ω', '24 Ω', '0.043 Ω'],
    correctAnswer: 1,
    explanation:
      'R = V ÷ I = 230 ÷ 10 = 23 Ω. Dividing the other way round gives 0.043, which is one of the options precisely because inverting the fraction is the standard slip.',
  },
  {
    id: 6,
    question:
      'Two resistors, 10 Ω and 15 Ω, are connected in parallel. What is the combined resistance?',
    options: ['25 Ω', '12.5 Ω', '6 Ω', '5 Ω'],
    correctAnswer: 2,
    explanation:
      'For two in parallel: R = (R1 × R2) ÷ (R1 + R2) = (10 × 15) ÷ (10 + 15) = 150 ÷ 25 = 6 Ω. A useful sense-check: the combined resistance of a parallel pair is always smaller than the smaller of the two.',
  },
  {
    id: 7,
    question:
      'Using the adiabatic equation S = √(I²t) ÷ k, what minimum cross-sectional area is needed for a fault current of 800 A, a disconnection time of 0.4 s and k = 115?',
    options: ['4.0 mm²', '6.0 mm²', '2.5 mm²', '4.4 mm²'],
    correctAnswer: 3,
    explanation:
      'S = √(800² × 0.4) ÷ 115 = √256,000 ÷ 115 = 505.96 ÷ 115 = 4.4 mm². That is the minimum the calculation demands — in practice you would then select the next standard size up, 6 mm², because 4 mm² is below what the equation requires.',
  },
  {
    id: 8,
    question: 'Rearrange E = P × t to find how long a 2 kW heater takes to use 5 kWh of energy.',
    options: ['2.5 hours', '0.4 hours', '10 hours', '10,000 hours'],
    correctAnswer: 0,
    explanation:
      't = E ÷ P = 5 ÷ 2 = 2.5 hours. Because the energy is in kWh and the power in kW, the units cancel and the answer comes out in hours without any conversion.',
  },
];

const FunctionalSkillsModule1Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 3"
        title="Algebra and formulae"
        backTo="/study-centre/apprentice/functional-skills/module1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default. These pages are carrying worked
            calculations in a mono face, and a column sized for prose squeezes
            the working onto two lines where it should sit on one. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Algebra has a reputation it does not deserve. A letter in a formula is just a box
            waiting for a number — and every formula you will meet in this trade is published with
            one subject while the job asks for a different one. Rearranging is the skill that closes
            that gap, and it comes down to a single rule.
          </p>

          <LearningOutcomes
            outcomes={[
              'Read a formula and say what each symbol stands for.',
              'Substitute numbers into a formula and evaluate it in the right order.',
              'State the balance rule and use it to rearrange a formula for any subject.',
              'Use Ohm’s law in all three arrangements.',
              'Use the three power formulae and pick the right one for the quantities you have.',
              'Handle a formula containing a square or a square root without losing the order.',
              'Check an answer by substituting it back into the original formula.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'BIDMAS',
                gist: 'Indices before multiplication, and brackets before anything. Substitution goes wrong without it.',
                where: '1.1',
              },
              {
                term: 'SI prefixes',
                gist: 'Almost every formula question starts with a kW or a mA that has to become W or A first.',
                where: '1.2',
              },
            ]}
          />

          <TLDR
            points={[
              'A symbol is a box waiting for a number. Substitution is filling the boxes, then doing the arithmetic in BIDMAS order.',
              'One rule governs every rearrangement: whatever you do to one side, do to the other.',
              'Ohm’s law has three forms — V = IR, I = V ÷ R, R = V ÷ I — and they are all the same equation.',
              'Power has three forms too: P = VI, P = I²R and P = V² ÷ R. Pick the one matching the quantities you already have.',
              'Convert prefixes before you substitute, not after. 3 kW becomes 3,000 W first.',
              'Check your answer by putting it back into the original formula. It takes ten seconds and catches inverted fractions.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Symbols and substitution</ContentEyebrow>

          <ConceptBlock title="A letter is a box waiting for a number">
            <p>
              When you see <strong>V = I × R</strong>, the letters are not algebra for its own sake
              — they are shorthand for quantities. V is voltage in volts, I is current in amps, R is
              resistance in ohms. Put the numbers in place of the letters and you have an ordinary
              sum.
            </p>
            <p>
              Two habits make substitution reliable. Write down what each symbol equals before you
              start, so you cannot mix them up. And convert every prefix first — a formula does not
              know that you meant kilowatts.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="A 12 Ω heating element carries 5 A. What voltage is across it?"
            steps={[
              { calc: 'V = I × R', note: 'Write the formula down first.' },
              { calc: 'I = 5, R = 12', note: 'List what you have.' },
              { calc: 'V = 5 × 12 = 60' },
            ]}
            answer="60 V"
            watchOut="Always finish with the unit. A bare 60 could be volts, watts or ohms — and in an exam an answer without its unit can lose a mark even when the number is right."
          />

          <TryIt
            nonCalculator
            question="A 4 Ω element carries 6 A. What voltage is across it?"
            steps={[{ calc: 'V = I × R' }, { calc: 'V = 6 × 4 = 24' }]}
            answer="24 V"
          />

          <SectionRule />

          <WorkedExample
            nonCalculator
            question="Substitute into P = I²R where I = 6 A and R = 12 Ω. Then do the same where I = 12 A and R = 6 Ω, and say why the answers differ."
            steps={[
              {
                calc: 'First: I² = 6 × 6 = 36',
                note: 'Square the current BEFORE multiplying by R. The index binds tighter than the multiplication.',
              },
              { calc: 'P = 36 × 12 = 432 W' },
              { calc: 'Second: I² = 12 × 12 = 144' },
              { calc: 'P = 144 × 6 = 864 W' },
            ]}
            answer="432 W and 864 W"
            watchOut="Swapping the two numbers does not swap the answer — it doubles it. Current is squared and resistance is not, so current has far more influence on heating than resistance does. That is not a maths curiosity; it is why a loose connection carrying a big current gets hot."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · The balance rule</ContentEyebrow>

          <ConceptBlock title="Whatever you do to one side, do to the other">
            <p>
              An equation is a pair of scales. The equals sign says the two sides balance. You can
              do anything you like to it — add, subtract, multiply, divide — provided you do the
              same thing to both sides, because that keeps it balanced.
            </p>
            <p>
              Every shortcut you were ever taught comes from this. &ldquo;Move it across and change
              the sign&rdquo; is what it looks like when you subtract the same thing from both sides
              and tidy up. Learn the rule and you never have to remember the shortcuts.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="Rearrange V = IR to make R the subject."
            steps={[
              { calc: 'V = I × R', note: 'R is currently multiplied by I.' },
              { calc: 'V ÷ I = (I × R) ÷ I', note: 'Divide BOTH sides by I.' },
              { calc: 'V ÷ I = R', note: 'On the right, I ÷ I = 1 and cancels.' },
              { calc: 'R = V ÷ I', note: 'Write it with the subject on the left.' },
            ]}
            answer="R = V ÷ I"
            watchOut="To undo a multiplication you divide, and to undo a division you multiply. If the rearranged formula still has the subject tangled up with something else, you have undone the wrong operation."
          />

          <WorkedExample
            question="Using that rearrangement: V = 230 V and I = 10 A. What is R?"
            steps={[
              { calc: 'R = V ÷ I' },
              { calc: 'R = 230 ÷ 10 = 23' },
              { calc: 'Check: 10 × 23 = 230 ✓', note: 'Substitute back into the original.' },
            ]}
            answer="23 Ω"
            watchOut="Dividing the wrong way round gives 0.043 Ω. The check catches it instantly: 10 × 0.043 = 0.43, nothing like 230."
          />

          <TryIt
            nonCalculator
            question="Rearrange P = I × V to make V the subject."
            steps={[
              { calc: 'P = I × V' },
              { calc: 'P ÷ I = V', note: 'Divide both sides by I.' },
              { calc: 'V = P ÷ I' },
            ]}
            answer="V = P ÷ I"
          />

          <CommonMistake
            title="Moving a term without undoing what it does"
            whatHappens={
              <p>
                You have <code>V = I × R</code> and want R, so you write <code>R = V − I</code> —
                subtracting because moving things across feels like subtraction. But I was
                multiplying R, not adding to it, so subtracting undoes nothing.
              </p>
            }
            doInstead={
              <p>
                Ask what is being done to the subject, then do the opposite to both sides.
                Multiplied? Divide. Divided? Multiply. Added? Subtract. Squared? Take the root.
              </p>
            }
          />

          <SectionRule />

          <WorkedExample
            nonCalculator
            question="Rearrange P = V × I to make I the subject, then use it: a 3kW immersion heater on 230V. Then rearrange R = V ÷ I to make V the subject and check your answer a different way."
            steps={[
              {
                calc: 'P = V × I. Divide BOTH sides by V.',
                note: 'Whatever you do to one side you do to the other. That is the whole rule.',
              },
              { calc: 'P ÷ V = I, so I = P ÷ V' },
              {
                calc: 'I = 3000 ÷ 230 = 13.04 A',
                note: 'Watts, not kilowatts — convert before you substitute, not after.',
              },
              { calc: 'R = V ÷ I. Multiply both sides by I → R × I = V, so V = I × R' },
              {
                calc: 'Check: if R = 17.64Ω, then V = 13.04 × 17.64 = 230 V',
                note: 'Back where you started, which means the rearrangement was sound.',
              },
            ]}
            answer="I = P ÷ V = 13.04 A; V = I × R, and substituting back returns 230 V."
            watchOut="The commonest transposition error is moving a term across and forgetting to change what it does — taking V from a multiplication and adding it on the other side instead of dividing. Substituting your answer back into the ORIGINAL formula catches that every time, and it takes ten seconds."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="Rearrange Vd = (mV/A/m × Ib × L) ÷ 1000 to make L the subject. Then find the longest run of 2.5mm² (18 mV/A/m) carrying 20 A that stays within a 6.9 V drop."
            steps={[
              { calc: 'Multiply both sides by 1000: Vd × 1000 = mV/A/m × Ib × L' },
              { calc: 'Divide both sides by (mV/A/m × Ib): L = (Vd × 1000) ÷ (mV/A/m × Ib)' },
              { calc: 'L = (6.9 × 1000) ÷ (18 × 20) = 6900 ÷ 360' },
              { calc: 'L = 19.17 m' },
            ]}
            answer="About 19 m. Note you round DOWN here, not up — 19.17 m is the point at which it stops complying, so 20 m would exceed it."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Ohm’s law</ContentEyebrow>

          <ConceptBlock title="One equation, three arrangements">
            <p>
              <strong>V = I × R</strong>, <strong>I = V ÷ R</strong> and <strong>R = V ÷ I</strong>{' '}
              are not three facts to memorise. They are the same statement rearranged three ways,
              and if you can do the rearranging you only ever need to remember the first one.
            </p>
            <p>
              Volts, amps and ohms. Know any two and the third follows — which is what makes this
              the single most used formula in the trade.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 230 V supply feeds a load of 19.17 Ω. What current flows?"
            steps={[
              { calc: 'I = V ÷ R', note: 'We want current, so use that arrangement.' },
              { calc: 'I = 230 ÷ 19.17' },
              { calc: 'I = 12.0 A', note: 'To one decimal place.' },
            ]}
            answer="12.0 A"
          />

          <InlineCheck
            question="A circuit draws 8 A from a 230 V supply. What is its resistance, to the nearest ohm?"
            options={['1,840 Ω', '29 Ω', '0.03 Ω', '238 Ω']}
            correctIndex={1}
            explanation="R = V ÷ I = 230 ÷ 8 = 28.75, which is 29 Ω to the nearest ohm. 1,840 comes from multiplying instead of dividing."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A 230V circuit supplies a load of 11.5Ω. What current flows? Then: if the same load were fed at 115V, what current would flow?"
            steps={[
              { calc: 'I = V ÷ R = 230 ÷ 11.5 = 20 A' },
              {
                calc: 'At 115 V: I = 115 ÷ 11.5 = 10 A',
                note: 'Half the voltage across the same resistance gives half the current — the two are directly proportional.',
              },
            ]}
            answer="20 A at 230 V, 10 A at 115 V"
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · The power formulae</ContentEyebrow>

          <ConceptBlock title="Three versions, and how to choose">
            <p>
              Power in watts can be found three ways: <strong>P = V × I</strong> when you have volts
              and amps, <strong>P = I² × R</strong> when you have amps and ohms, and{' '}
              <strong>P = V² ÷ R</strong> when you have volts and ohms.
            </p>
            <p>
              They are all consequences of Ohm&rsquo;s law — substitute V = IR into P = VI and you
              get P = I²R. So you are never choosing between different facts, only picking the form
              that matches the numbers in front of you.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 3 kW immersion heater runs on 230 V. What current does it draw?"
            steps={[
              { calc: '3 kW = 3,000 W', note: 'Convert the prefix BEFORE substituting.' },
              { calc: 'I = P ÷ V', note: 'Rearranged from P = VI.' },
              { calc: 'I = 3,000 ÷ 230 = 13.04 A' },
            ]}
            answer="13.04 A"
            watchOut="Substituting 3 instead of 3,000 gives 0.013 A — a heater drawing thirteen milliamps. Convert the prefix first, every time."
          />

          <WorkedExample
            nonCalculator
            question="What power is dissipated in a 6 Ω element carrying 10 A?"
            steps={[
              { calc: 'P = I² × R', note: 'We have current and resistance.' },
              { calc: '10² = 100', note: 'Indices before multiplication — BIDMAS.' },
              { calc: '100 × 6 = 600' },
            ]}
            answer="600 W"
            watchOut="Multiplying first and squaring after — (10 × 6)² = 3,600 — is the classic error here, and it is BIDMAS that prevents it."
          />

          <TryIt
            question="A 2.3 kW element runs on 230 V. What current does it draw?"
            steps={[
              { calc: '2.3 kW = 2,300 W' },
              { calc: 'I = P ÷ V = 2,300 ÷ 230' },
              { calc: 'I = 10 A' },
            ]}
            answer="10 A"
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A 2.3kW load on 230V. Find the current, then the resistance, using two different power formulae and check they agree."
            steps={[
              { calc: 'I = P ÷ V = 2300 ÷ 230 = 10 A' },
              { calc: 'Route one: R = V ÷ I = 230 ÷ 10 = 23 Ω' },
              {
                calc: 'Route two: R = V² ÷ P = 52900 ÷ 2300 = 23 Ω',
                note: 'Different formula, same answer — which is the check.',
              },
            ]}
            answer="10 A and 23 Ω. Two independent routes landing on the same figure is far stronger evidence than doing the same sum twice."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Formulae with several terms</ContentEyebrow>

          <ConceptBlock title="Work inwards, then outwards">
            <p>
              Longer formulae look harder and mostly are not. Substitute everything, then evaluate
              in BIDMAS order: brackets first, then indices, then multiplication and division, then
              addition and subtraction.
            </p>
            <p>
              The voltage drop formula is a good example:{' '}
              <strong>
                Vd = (mV/A/m × I<sub>b</sub> × L) ÷ 1,000
              </strong>
              . The bracket is doing the work, and the division by a thousand at the end is a unit
              conversion — millivolts to volts — not part of the physics.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A cable has mV/A/m = 18, carries Ib = 20 A over L = 25 m. What is the voltage drop?"
            steps={[
              { calc: 'Vd = (18 × 20 × 25) ÷ 1,000' },
              { calc: '18 × 20 = 360', note: 'Inside the bracket, left to right.' },
              { calc: '360 × 25 = 9,000' },
              { calc: '9,000 ÷ 1,000 = 9 V', note: 'The division converts mV to V.' },
            ]}
            answer="9 V"
            watchOut="Forgetting the ÷ 1,000 gives 9,000 V. The clue is in the unit of the first term — millivolts per amp per metre — so the answer starts life in millivolts."
          />

          <InlineCheck
            question="Same formula, with mV/A/m = 44, Ib = 6 A and L = 12 m. What is the voltage drop?"
            options={['3.17 V', '31.7 V', '0.32 V', '3,168 V']}
            correctIndex={0}
            explanation="44 × 6 = 264, 264 × 12 = 3,168, then ÷ 1,000 = 3.168 V, which is 3.17 V to two decimal places."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="Zs = Ze + (R1 + R2). A TN-S supply measures Ze = 0.35Ω. The circuit has R1 = 0.22Ω and R2 = 0.41Ω. Find Zs. Then find what Ze would have to be for Zs to reach 1.37Ω, the limit for a 32A Type B device."
            steps={[
              {
                calc: 'R1 + R2 = 0.22 + 0.41 = 0.63Ω',
                note: 'Brackets first — that is BIDMAS doing real work, not being tidy.',
              },
              { calc: 'Zs = 0.35 + 0.63 = 0.98Ω' },
              { calc: 'Rearranged: Ze = Zs − (R1 + R2) = 1.37 − 0.63 = 0.74Ω' },
            ]}
            answer="Zs = 0.98Ω. Ze would have to rise to 0.74Ω before this circuit reached the 1.37Ω limit — so there is room, but the second calculation is the one that tells you how much."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Squares and roots</ContentEyebrow>

          <ConceptBlock title="A root is the undo button for a square">
            <p>
              Squaring a number multiplies it by itself: 10² = 100. A square root asks the reverse
              question — what number, multiplied by itself, gives this? √100 = 10.
            </p>
            <p>
              In a rearrangement they cancel each other out, which is how you get a subject out from
              under a square root or out of a squared term. And in BIDMAS they come immediately
              after brackets, before any multiplying.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="The adiabatic equation is S = √(I²t) ÷ k. With I = 800 A, t = 0.4 s and k = 115, find S."
            steps={[
              { calc: '800² = 640,000', note: 'Square the current first.' },
              { calc: '640,000 × 0.4 = 256,000', note: 'Finish inside the bracket.' },
              { calc: '√256,000 = 505.96', note: 'Now the root.' },
              { calc: '505.96 ÷ 115 = 4.4', note: 'Finally the division.' },
            ]}
            answer="4.4 mm²"
            watchOut="That is the minimum the calculation demands, not a cable you can buy. 4 mm² is below it, so the next standard size up is 6 mm² — rounding down here would leave the conductor undersized for the fault."
          />

          <TryIt
            question="Find √(400 × 0.25)."
            steps={[
              { calc: '400 × 0.25 = 100', note: 'Inside the bracket first.' },
              { calc: '√100 = 10' },
            ]}
            answer="10"
          />

          <SectionRule />

          <WorkedExample
            nonCalculator
            question="A cable run goes 8m along a wall and then 6m up to a board. Find the straight-line length, then say how much cable the right-angled route costs you over the diagonal."
            steps={[
              { calc: 'c² = a² + b² = 8² + 6² = 64 + 36 = 100' },
              {
                calc: 'c = √100 = 10 m',
                note: 'A 3-4-5 triangle scaled up by two — worth recognising, it saves working it out.',
              },
              { calc: 'The routed length is 8 + 6 = 14 m' },
              { calc: '14 − 10 = 4 m extra' },
            ]}
            answer="Diagonal 10 m; the right-angled route uses 14 m, so 4 m more."
            watchOut="You almost always have to run the right-angled route — cables follow the building, not the shortest line. The point of the diagonal is not to route along it, it is to know what the run SHOULD be near, so a measured 22 m tells you something has gone wrong."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A tray rises 5m over a horizontal run of 12m. What length of tray do you need, and what do you order if it comes in 3m lengths?"
            steps={[
              { calc: 'c² = 5² + 12² = 25 + 144 = 169' },
              { calc: 'c = √169 = 13 m', note: 'The 5-12-13 triple.' },
              { calc: '13 ÷ 3 = 4.33 lengths → round up to 5' },
            ]}
            answer="13 m of tray, so 5 × 3m lengths."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Checking your answer</ContentEyebrow>

          <ConceptBlock title="Put it back in">
            <p>
              Every rearrangement can be checked in one step: substitute your answer into the
              original formula and see whether it balances. If it does, the rearrangement and the
              arithmetic are both right. If it does not, one of them is wrong and you know to look.
            </p>
            <p>
              This is the single most valuable habit on this page. It catches inverted fractions,
              which are the commonest algebra error and the hardest to spot by staring.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="You calculate R = 23 Ω from V = 230 V and I = 10 A. Check it."
            steps={[
              { calc: 'Original: V = I × R' },
              { calc: '10 × 23 = 230', note: 'Substitute the answer back in.' },
              { calc: '230 = 230 ✓', note: 'It balances, so the answer is right.' },
            ]}
            answer="Confirmed: 23 Ω"
          />

          <TryIt
            question="Someone calculates that a 2 kW heater on 230 V draws 460 A. Check it without redoing their working."
            steps={[
              { calc: 'Original: P = V × I' },
              { calc: '230 × 460 = 105,800 W', note: 'That is 105.8 kW, not 2 kW.' },
              { calc: 'So the answer is wrong', note: 'They multiplied instead of dividing.' },
            ]}
            answer="Wrong — it should be 2,000 ÷ 230 = 8.7 A"
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A colleague works out that a 10.5kW shower at 230V draws 4.57 A. Without redoing their sum, give two reasons you know it is wrong."
            steps={[
              {
                calc: 'Size check: 10.5 kW is a big load',
                note: 'A shower is one of the largest single loads in a house. A few amps cannot be right — a kettle draws more than that.',
              },
              {
                calc: 'Direction check: they have divided the wrong way round',
                note: '230 ÷ 10500 = 0.0219; 10500 ÷ 230 = 45.65. The 4.57 looks like 10500 ÷ 2300 — a decimal slip in the voltage.',
              },
              { calc: 'Correct: I = P ÷ V = 10500 ÷ 230 = 45.65 A' },
            ]}
            answer="It fails a size check (far too small for a shower) and the error is a factor of ten, which points at a decimal place rather than a wrong method. The real answer is 45.65 A — which also tells you this shower needs a 50 A device, not a 45 A one, because no 45 A rung exists."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Putting it together</ContentEyebrow>

          <Scenario
            title="Sizing up an immersion heater circuit"
            situation={
              <p>
                A customer wants a 3 kW immersion heater on a 230 V supply. You need the load
                current, and then the voltage drop over a 22 m run of cable whose tabulated figure
                is 18 mV/A/m.
              </p>
            }
            whatToDo={
              <div className="space-y-2">
                <p>
                  Convert first: 3 kW = 3,000 W. Then the current — P = VI rearranges to I = P ÷ V,
                  giving 3,000 ÷ 230 = 13.04 A.
                </p>
                <p>
                  Now the voltage drop, using that current: Vd = (18 × 13.04 × 22) ÷ 1,000. Inside
                  the bracket, 18 × 13.04 = 234.72, and 234.72 × 22 = 5,163.8. Divide by 1,000 and
                  you get 5.16 V.
                </p>
                <p>
                  For context on that figure: Table 4Ab recommends a maximum of 5% for other uses on
                  a public LV supply, which on 230 V is 11.5 V. 5.16 V sits comfortably inside it.
                </p>
              </div>
            }
            whyItMatters={
              <p>
                Prefix conversion, rearrangement, substitution and a multi-term formula — one job,
                four techniques, and the output of the first calculation is the input to the second.
                That chaining is what the exam is really testing.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Transposition is one rule: whatever you do to one side, do to the other. Substitute your answer back into the original to check it.',
              'In P = I²R the current is squared and the resistance is not — current has far more influence on heating.',
              'Recognise 3-4-5 and 5-12-13 triangles; they turn a square-root problem into something you can do in your head.',
              'When rearranging for a maximum length, round DOWN — rounding up takes you past the limit.',
              'A symbol is a box waiting for a number. Write down what each one equals before you substitute.',
              'Convert every prefix before substituting, not after. 3 kW becomes 3,000 W first.',
              'One rule rearranges everything: do the same thing to both sides.',
              'To undo a multiplication, divide. To undo a square, take the root.',
              'Ohm’s law is one equation in three arrangements, and so are the power formulae.',
              'BIDMAS decides the order: brackets, then indices, then multiply and divide, then add and subtract.',
              'Check by substituting the answer back into the original — it catches inverted fractions in seconds.',
              'A calculated minimum is not a size you can buy. Round up to the next standard size.',
            ]}
          />

          <SectionRule />

          <FAQ
            items={[
              {
                question: 'Will formulae be given to me in the exam?',
                answer: (
                  <p>
                    For Functional Skills maths, formulae you need are normally provided or built
                    into the question — you are being assessed on using them, not on recall. The
                    electrical qualifications are different, and Ohm&rsquo;s law and the power
                    formulae are worth knowing cold regardless.
                  </p>
                ),
              },
              {
                question: 'Why do I keep getting the fraction upside down?',
                answer: (
                  <p>
                    Because both versions look plausible on the page. The cure is the check: put
                    your answer back into the original formula. An inverted fraction fails that test
                    immediately and by a wide margin, which is exactly what you want from a check.
                  </p>
                ),
              },
              {
                question: 'Do I need to memorise all three power formulae?',
                answer: (
                  <p>
                    You need P = V × I. The other two follow from substituting Ohm&rsquo;s law into
                    it, so if you can rearrange you can derive them. Recognising which one fits the
                    quantities you have saves time, though.
                  </p>
                ),
              },
              {
                question: 'What is mV/A/m actually saying?',
                answer: (
                  <p>
                    Millivolts dropped, per amp of current, per metre of cable. Multiply it by your
                    current and your length and you get the total drop in millivolts — which is why
                    the formula finishes by dividing by 1,000 to give volts.
                  </p>
                ),
              },
            ]}
          />

          <WorkedExample
            question="A 7.36kW shower on a 230V supply, 16m of 10.0mm² T&E clipped direct (mV/A/m = 4.4), Ze = 0.25Ω on a TN-C-S supply, R1+R2 for 10.0/4.0mm² = 6.44 mΩ/m. Work the whole chain: design current, device, voltage drop, and Zs."
            steps={[
              {
                calc: 'Ib = P ÷ V = 7360 ÷ 230 = 32 A',
                note: 'Start with the load. Everything downstream depends on it.',
              },
              {
                calc: 'In = 32 A',
                note: 'The design current lands exactly on a standard rung, so the device is 32 A.',
              },
              {
                calc: 'Vd = 4.4 × 32 × 16 ÷ 1000 = 2.25 V',
                note: 'mV/A/m × current × length, then ÷1000 because the table is in millivolts.',
              },
              {
                calc: '5% of 230 = 11.5 V → 2.25 V is well inside it',
                note: 'And 5% is the recommended maximum for a non-lighting circuit, not a hard legal limit.',
              },
              { calc: 'R1+R2 = 6.44 × 16 ÷ 1000 = 0.103Ω' },
              { calc: 'Zs = Ze + (R1+R2) = 0.25 + 0.103 = 0.353Ω' },
              { calc: 'Max Zs for a 32 A Type B = 1.37Ω → 0.353 passes comfortably' },
            ]}
            answer="Ib = 32 A, In = 32 A, Vd = 2.25 V (limit 11.5 V), Zs = 0.353Ω (limit 1.37Ω). The circuit passes on both counts."
            watchOut="Notice the order is fixed and each step feeds the next: you cannot size the device before you know the current, and you cannot check Zs before you know the cable length. Working these out of sequence is how people end up redoing the whole thing. One simplification here: Zs is shown as Ze + (R1+R2) straight, without the temperature correction factor you will meet in the electrical modules. That factor matters on a real design — it is left out here so the chain of steps stays visible."
          />

          <SectionRule />

          <TryIt
            question="Same method, different job: a 9.2kW shower at 230V, 12m of 10.0mm² (mV/A/m = 4.4), Ze = 0.30Ω, R1+R2 = 6.44 mΩ/m. Find Ib, the device rating, the voltage drop and Zs."
            steps={[
              { calc: 'Ib = 9200 ÷ 230 = 40 A' },
              { calc: 'In = 40 A', note: 'Again it lands exactly on a rung.' },
              { calc: 'Vd = 4.4 × 40 × 12 ÷ 1000 = 2.11 V', note: 'Against a recommended 11.5 V.' },
              { calc: 'R1+R2 = 6.44 × 12 ÷ 1000 = 0.077Ω' },
              { calc: 'Zs = 0.30 + 0.077 = 0.377Ω', note: 'Max Zs for a 40 A Type B is 1.09Ω.' },
            ]}
            answer="Ib = 40 A, In = 40 A, Vd = 2.11 V, Zs = 0.377Ω — passes on both. Note the shorter run has a lower volt drop despite the higher current, because length matters as much as current in that formula."
          />

          <SectionRule />

          <ContentEyebrow>Check yourself</ContentEyebrow>
          <p className="text-[13px] leading-relaxed text-white">
            Eight questions on substitution, rearrangement and the formulae above. Several of the
            wrong options are inverted fractions — do the check and they will not catch you.
          </p>
          <Quiz questions={quizQuestions} />

          <SectionRule />

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module1/section2')
              }
              className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 truncate text-[14px] font-semibold text-white">
                Units and measurement
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module1/section4')
              }
              className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
            >
              <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 truncate text-right text-[14px] font-semibold text-white">
                Data and statistics
              </div>
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule1Section3;
