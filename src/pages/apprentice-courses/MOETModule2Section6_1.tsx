/**
 * MOET · Module 2 · Section 2.6 · Subsection 1 — Transposition and Algebraic Methods
 *
 * NEW PAGE (12 Sep) — written to close the one ST1426 KSB gap found in a
 * coverage audit of all 88 in-scope KSBs. K17 requires "Algebraic methods.
 * Trigonometric methods and standard formulae to determine areas and volumes.
 * Statistical methods to display data (mean, mode, median). Elementary calculus
 * techniques: coefficient, gradient of a curve, rate of change." The course had
 * no trigonometry, no mean/mode/median and only incidental algebra. Section 2.6
 * covers it across four pages; this is the first.
 *
 * The Module 2 landing already described itself as "electrical theory and maths
 * a maintenance engineer needs" — that promise was previously unkept.
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Algebraic methods. Trigonometric methods and standard
 *                 formulae to determine areas and volumes. Statistical methods
 *                 to display data (mean, mode, median). Elementary calculus
 *                 techniques: coefficient, gradient of a curve, rate of change."
 *              · "Electrical. Electrical engineering principles, terminology,
 *                 and calculations."
 *   Skills     · "Apply problem solving and critical reasoning techniques."
 *   Behaviours · "Take ownership for the delivery and quality of own work."
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Transposition and Algebraic Methods - MOET Module 2.6.1';
const DESCRIPTION =
  'Transposing engineering formulae for maintenance technicians: the balance rule, rearranging for any subject, indices and powers of ten, engineering notation, and simultaneous equations applied to real electrical work.';

const quickCheckQuestions = [
  {
    id: 'transpose-balance-rule',
    question: 'What is the single rule that governs every transposition?',
    options: [
      'Always move the smallest term first',
      'Whatever you do to one side of the equation, you must do to the other',
      'Letters move left, numbers move right',
      'Always divide before you multiply',
    ],
    correctIndex: 1,
    explanation:
      'An equation is a statement that two things are equal. The only way to keep it true is to treat both sides identically. Every trick you have ever been taught — "change the side, change the sign", "cross-multiply" — is a shortcut for doing the same operation to both sides. If you forget the shortcut you can always fall back on the rule, and the rule never fails you.',
  },
  {
    id: 'transpose-vdrop',
    question:
      'Volt drop is V = I × R. You know the volt drop and the current, and need the resistance. What do you do?',
    options: [
      'Subtract I from both sides',
      'Divide both sides by I',
      'Multiply both sides by I',
      'Divide both sides by R',
    ],
    correctIndex: 1,
    explanation:
      'R is currently multiplied by I. The opposite of multiplying by I is dividing by I, so divide both sides: V ÷ I = (I × R) ÷ I, and the I on the right cancels, leaving R = V ÷ I. Notice you undo an operation by applying its opposite — and you do it to the whole of both sides, not to one term.',
  },
  {
    id: 'transpose-engineering-notation',
    question: 'An insulation resistance tester reads 0.47 GΩ. What is that in megohms?',
    options: ['0.47 MΩ', '47 MΩ', '470 MΩ', '4700 MΩ'],
    correctIndex: 2,
    explanation:
      'Giga is 10⁹ and mega is 10⁶, so one gigohm is a thousand megohms. 0.47 × 1000 = 470 MΩ. Getting this wrong by a factor of a thousand is the classic insulation-resistance error — and it matters, because 0.47 MΩ would be a fail on a 500 V test where 470 MΩ is a very healthy circuit.',
  },
  {
    id: 'transpose-square-root',
    question: 'Power in a resistor is P = I²R. You know P and R and need I. What is the last step?',
    options: ['Divide by R', 'Take the square root', 'Square both sides', 'Multiply by R'],
    correctIndex: 1,
    explanation:
      'First divide both sides by R to get P ÷ R = I². That leaves I squared, so the final step is to undo the squaring by taking the square root of both sides: I = √(P ÷ R). Work outwards from the subject: strip away the things attached to it one at a time, and the power or root is normally the last thing to go.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Transpose P = V × I to make V the subject.',
    options: ['V = P × I', 'V = P ÷ I', 'V = I ÷ P', 'V = P − I'],
    correctAnswer: 1,
    explanation:
      'V is multiplied by I, so divide both sides by I: P ÷ I = (V × I) ÷ I. The I cancels on the right, leaving V = P ÷ I. Sanity check it with numbers you know: a 2.3 kW load on 230 V draws 10 A, and 2300 ÷ 10 = 230. The formula gives back the voltage you started with, so the transposition is right.',
  },
  {
    id: 2,
    question:
      'The volt drop formula is often written Vd = (mV/A/m × I × L) ÷ 1000. You need the maximum length L for a given volt drop. Which rearrangement is correct?',
    options: [
      'L = (Vd × 1000) ÷ (mV/A/m × I)',
      'L = (Vd × mV/A/m) ÷ (I × 1000)',
      'L = (mV/A/m × I) ÷ (Vd × 1000)',
      'L = Vd ÷ (mV/A/m × I × 1000)',
    ],
    correctAnswer: 0,
    explanation:
      'Multiply both sides by 1000 to clear the division: Vd × 1000 = mV/A/m × I × L. Then divide both sides by everything still attached to L, which is (mV/A/m × I). That gives L = (Vd × 1000) ÷ (mV/A/m × I). This is one of the most useful transpositions on site — it answers "how far can I run this cable before volt drop bites?"',
  },
  {
    id: 3,
    question: 'Which of these is 0.0035 A expressed in engineering notation?',
    options: ['3.5 × 10⁻³ A', '35 × 10⁻⁴ A', '0.35 × 10⁻² A', '3.5 × 10³ A'],
    correctAnswer: 0,
    explanation:
      'Engineering notation keeps the exponent as a multiple of three so it maps directly onto the prefixes you actually use — milli, micro, kilo, mega. 0.0035 becomes 3.5 × 10⁻³, which is 3.5 mA. The other options are either arithmetically equivalent but not in engineering form, or simply wrong. Reading 3.5 mA as 3.5 A is the kind of slip that makes an earth leakage reading look catastrophic.',
  },
  {
    id: 4,
    question: 'Transpose Z = √(R² + X²) to make X the subject.',
    options: ['X = √(Z² − R²)', 'X = Z − R', 'X = √(Z² + R²)', 'X = (Z − R)²'],
    correctAnswer: 0,
    explanation:
      'Square both sides first to remove the root: Z² = R² + X². Then subtract R² from both sides: Z² − R² = X². Finally take the square root: X = √(Z² − R²). You undo operations in reverse order — the root came off first because it was the outermost thing wrapped around the right-hand side.',
  },
  {
    id: 5,
    question:
      'A transformer has a turns ratio Np/Ns = Vp/Vs. A 400 V primary, 110 V secondary transformer has 1200 primary turns. How many secondary turns?',
    options: ['330', '440', '240', '4364'],
    correctAnswer: 0,
    explanation:
      'Rearrange for Ns: Ns = (Np × Vs) ÷ Vp = (1200 × 110) ÷ 400 = 132000 ÷ 400 = 330 turns. Check it for sense — the secondary voltage is roughly a quarter of the primary, so the secondary turns should be roughly a quarter of 1200. 330 is about right; 4364 would mean stepping up, which contradicts the voltages.',
  },
  {
    id: 6,
    question: 'Why does engineering notation use exponents in steps of three?',
    options: [
      'Because calculators cannot display other exponents',
      'Because the SI prefixes technicians use — milli, kilo, mega, micro — are spaced a thousand apart',
      'Because three is the number of phases in an industrial supply',
      'Because BS 7671 requires it',
    ],
    correctAnswer: 1,
    explanation:
      'Each standard prefix is a factor of one thousand from its neighbours: micro (10⁻⁶), milli (10⁻³), unit (10⁰), kilo (10³), mega (10⁶), giga (10⁹). Keeping the exponent to a multiple of three means the number you write maps straight onto a prefix you can say out loud and a range you can select on an instrument. Scientific notation (one digit before the point) is fine for maths but does not line up with the kit.',
  },
  {
    id: 7,
    question:
      'Two resistors in parallel: 1/RT = 1/R1 + 1/R2. Which is the correct expression for RT?',
    options: [
      'RT = R1 + R2',
      'RT = (R1 × R2) ÷ (R1 + R2)',
      'RT = (R1 + R2) ÷ (R1 × R2)',
      'RT = 1 ÷ (R1 + R2)',
    ],
    correctAnswer: 1,
    explanation:
      'Add the fractions on the right over a common denominator: 1/RT = (R2 + R1) ÷ (R1 × R2). Now invert both sides — and inverting is legitimate because if two things are equal, their reciprocals are equal too. That gives RT = (R1 × R2) ÷ (R1 + R2), the "product over sum" rule. It only works for exactly two resistors; for three or more, go back to the reciprocal form.',
  },
  {
    id: 8,
    question:
      'A common slip is to transpose P = I²R for I by writing I = √P ÷ R. Why is that wrong?',
    options: [
      'The square root should be a cube root',
      'The root must be taken of the whole quantity P ÷ R, not of P alone',
      'R should have been squared as well',
      'It is not wrong — it is an alternative correct form',
    ],
    correctAnswer: 1,
    explanation:
      'Dividing both sides by R gives I² = P ÷ R, so I = √(P ÷ R). Writing √P ÷ R takes the root of P only and then divides by R, which is a different number entirely. With P = 100 W and R = 4 Ω the correct answer is √25 = 5 A; the wrong form gives 10 ÷ 4 = 2.5 A. Brackets are not decoration — they say what the root applies to.',
  },
  {
    id: 9,
    question:
      'You need to find two unknown currents in a circuit and you have written two equations containing both. What technique applies?',
    options: [
      'Transposition of a single formula',
      'Simultaneous equations — eliminate one unknown, solve for the other, then substitute back',
      'Engineering notation',
      'Taking the mean of the two equations',
    ],
    correctAnswer: 1,
    explanation:
      'Two unknowns need two independent equations. You eliminate one unknown — usually by adding or subtracting multiples of the equations so that one variable cancels — solve for the survivor, then substitute that value back into either original equation to get the other. This is exactly what Kirchhoff analysis of a two-loop network comes down to once the physics is written down.',
  },
  {
    id: 10,
    question: 'What is the most reliable way to check a transposition you are unsure of?',
    options: [
      'Ask a colleague whether it looks right',
      'Substitute numbers you already know the answer to, and see whether the formula returns them',
      'Rearrange it a second time and hope you get the same result',
      'Check the units are alphabetical',
    ],
    correctAnswer: 1,
    explanation:
      "Put in a case you can verify independently. If you rearrange Ohm's law and then feed in 230 V and 10 A, you should get 23 Ω — a figure you can confirm from first principles. A transposition that survives a known case is almost certainly right; one that fails it is definitely wrong. This takes about fifteen seconds and catches the overwhelming majority of algebra errors.",
  },
];

const faqs = [
  {
    question: 'Why does an electrician need algebra at all? I have a calculator and an app.',
    answer:
      'Because the calculator answers the question you type in, not the question you meant. Almost every formula you meet is published with one particular subject — volt drop formulae are written for volt drop, the resistance formula is written for resistance — and real jobs constantly ask for a different one. How long can this run be? What size conductor do I need to keep Zs inside the limit? What current will flow if this winding has gone to 4 Ω? All of those need the formula turned round before a calculator is any use. Transposition is not academic maths; it is the skill that lets you use the data you have to answer the question you have actually been asked.',
  },
  {
    question: 'I was taught "change the side, change the sign". Is that wrong?',
    answer:
      'It is not wrong, but it is a shortcut that only covers addition and subtraction, and people over-extend it. Moving a term that is added across the equals sign does flip it to a subtraction. But a term that is multiplied does not become a subtraction when it moves — it becomes a division. The underlying rule is the one worth holding onto: do the same thing to both sides, and choose the operation that undoes what is currently attached to your subject. Addition is undone by subtraction, multiplication by division, squaring by a square root. If you remember that, you never need to recall which shortcut applies.',
  },
  {
    question: 'How do I know which operation to undo first?',
    answer:
      'Work from the outside in, the reverse of the order you would use to evaluate the expression. Ask what is happening to your subject last, and undo that first. In Z = √(R² + X²) the outermost operation on the right is the square root, so that goes first. Then R² is added to X², so subtract it. Then X is squared, so take the root. It is the same logic as unwrapping a parcel: you take off the outer layer before you get to what is inside.',
  },
  {
    question: 'What is the difference between scientific and engineering notation?',
    answer:
      'Scientific notation always puts exactly one non-zero digit before the decimal point, so 47 000 becomes 4.7 × 10⁴. Engineering notation instead forces the exponent to be a multiple of three, so the same number becomes 47 × 10³ — which you read straight off as 47 kilo-something. Engineering notation exists because the prefixes technicians actually use are spaced a thousand apart. When you are switching an instrument between microamps, milliamps and amps, or reading megohms off an insulation tester, engineering notation matches the kit in your hand and scientific notation does not.',
  },
  {
    question: 'Do I need to be able to do this without a calculator in the end-point assessment?',
    answer:
      'Check your own assessment plan and with your training provider, because the rules vary and they change. What is consistent is that the professional discussion and the practical observation will expect you to explain and sanity-check your figures, not just read them off a screen. An assessor is far more interested in whether you noticed that a result was a thousand times too big than in whether you can do long division. Build the habit of estimating the answer before you calculate it, and you will be safe whichever way the assessment is structured.',
  },
  {
    question: 'My answer came out negative and I expected a positive number. What went wrong?',
    answer:
      'Usually one of three things. You subtracted in the wrong order somewhere — a − b is not b − a. You lost a minus sign when moving a term across the equals sign. Or the negative is real and meaningful, which happens legitimately in circuit analysis: a negative current simply means the current flows opposite to the direction you assumed when you drew the arrow. Before you hunt for an arithmetic error, ask whether a negative result could be telling you something physical. In a Kirchhoff problem it very often is.',
  },
];

const MOETModule2Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.6 · Subsection 1"
        title="Transposition and Algebraic Methods"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Every formula in this course is published with one subject, and the job almost always
            asks for a different one. Transposition is the skill that closes that gap — plus the
            notation that stops you being wrong by a factor of a thousand.
          </p>

          <TLDR
            points={[
              'One rule governs everything: do the same thing to both sides. Every shortcut you were taught is a special case of it.',
              'Undo operations from the outside in — the reverse of the order you would use to work the expression out.',
              'Engineering notation keeps exponents in steps of three so they map onto the prefixes on your instruments.',
              'Check every transposition by substituting a case whose answer you already know. Fifteen seconds, catches nearly everything.',
              'Two unknowns need two equations — that is all simultaneous equations are, and it is what Kirchhoff analysis reduces to.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: "Ohm's law and power",
                gist: 'V = I × R and P = V × I are the formulae you will transpose most often. You need to be comfortable with what each symbol means before rearranging them is meaningful.',
                where: '2.1',
              },
              {
                term: 'SI units and prefixes',
                gist: 'Milli, micro, kilo, mega and giga — and the fact that each is a thousand times its neighbour. Notation work depends on knowing these cold.',
                where: '2.1',
              },
              {
                term: 'Volt drop',
                gist: 'The mV/A/m method for calculating volt drop in a run of cable. Used here as the worked example for a multi-step transposition.',
                where: '2.5',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the balance rule and explain why every transposition shortcut derives from it.',
              'Transpose a formula for any of its symbols, including formulae containing squares, roots and fractions.',
              'Work outwards from the subject, undoing operations in the correct order.',
              'Convert between decimal, scientific and engineering notation, and use SI prefixes without slipping a factor of a thousand.',
              'Solve a pair of simultaneous equations and recognise where that arises in circuit analysis.',
              'Verify any result by substitution and by estimating the expected order of magnitude first.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The one rule</ContentEyebrow>

          <ConceptBlock
            title="An equation is a balance, and you must keep it balanced"
            plainEnglish="The equals sign means the two sides are the same size. If you change one side and not the other, you have broken that — and everything after it is wrong."
            onSite="When you are not sure, do the operation explicitly to both sides and write it down. It is slower than the shortcut and it is never wrong."
          >
            <p>
              An equation says that what is on the left and what is on the right are the same
              quantity, written two different ways. Transposition — rearranging a formula so a
              different symbol stands alone — works by changing both sides in exactly the same way,
              so that the statement stays true while the shape of it changes.
            </p>
            <p>
              That single idea is the whole of it. Every rule you have been given is a shortcut for
              applying it. &quot;Change the side, change the sign&quot; is what happens when you
              subtract the same term from both sides. &quot;Cross-multiply&quot; is what happens
              when you multiply both sides by both denominators. The shortcuts are worth knowing
              because they are quick, but the rule is worth knowing because it covers cases the
              shortcuts do not, and because you can rebuild any forgotten shortcut from it in a few
              seconds.
            </p>
            <p>
              The practical consequence is this: when a transposition goes wrong, it is almost never
              because the algebra is hard. It is because someone applied an operation to one term
              instead of to the whole side. Dividing by R means dividing everything on both sides by
              R, not just the bit that looked convenient.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Undo from the outside in"
            plainEnglish="Ask what is being done to your subject last, and undo that first. Then work your way inwards."
            onSite="Write each step on its own line. Trying to do three steps in your head is where the errors come from, not the maths."
          >
            <p>
              To evaluate an expression you work from the inside out: brackets first, then powers,
              then multiplication and division, then addition and subtraction. To transpose, you run
              that in reverse. Whatever is applied to your subject last is what you strip away
              first.
            </p>
            <p>
              Take impedance in a series R–L circuit, Z = √(R² + X²), and suppose you need X. The
              outermost operation on the right is the square root, so square both sides and it is
              gone: Z² = R² + X². Now R² is added to X², so subtract R² from both sides: Z² − R² =
              X². Finally X is squared, so take the root of both sides: X = √(Z² − R²). Three steps,
              each one a single reversal, each applied to both sides.
            </p>
            <p>
              Notice how the brackets carry meaning in that final line. X = √(Z² − R²) takes the
              root of the whole difference. Writing X = √Z² − R² would take the root of Z² only,
              giving a completely different — and wrong — number. When you write a root or a power,
              the brackets are telling the reader what it applies to, and getting them wrong is one
              of the most common ways a correct method produces a wrong answer.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <CommonMistake
            title="Taking a root or power of one term instead of the whole side"
            whatHappens={
              <>
                <p>
                  P = I²R gets rearranged as I = √P ÷ R. With P = 100 W and R = 4 Ω that gives √100
                  ÷ 4 = 10 ÷ 4 = 2.5 A. It looks like a reasonable current, which is exactly why it
                  survives.
                </p>
                <p>
                  The root has only been applied to P. Everything after it has been left outside, so
                  the formula is now describing a different quantity altogether.
                </p>
              </>
            }
            doInstead={
              <>
                <p>
                  Divide first, then take the root of whatever is left, keeping it inside brackets:
                  I² = P ÷ R, so I = √(P ÷ R) = √(100 ÷ 4) = √25 = 5 A. The correct answer is double
                  the incorrect one.
                </p>
                <p>
                  If you find yourself writing a root sign with nothing but a single letter under
                  it, stop and check whether the root should be reaching further.
                </p>
              </>
            }
          />

          <ContentEyebrow>Working transpositions</ContentEyebrow>

          <ConceptBlock
            title="Formulae with the subject on the bottom"
            plainEnglish="If the letter you want is underneath a division line, get it up to the top first. Everything is easier once it is."
            onSite="Resistance, cross-sectional area and time all commonly sit on the bottom of a formula. This pattern comes up constantly."
          >
            <p>
              Consider resistance of a conductor, R = (ρ × L) ÷ A, where ρ is resistivity, L is
              length and A is cross-sectional area. Suppose you need A. It is currently on the
              bottom, so the first move is to multiply both sides by A, which lifts it clear:
            </p>
            <p>R × A = ρ × L</p>
            <p>
              Now A is multiplied by R, so divide both sides by R, giving A = (ρ × L) ÷ R. Two
              steps, and the awkward part — the division — was dealt with immediately rather than
              carried through the working.
            </p>
            <p>
              The general pattern is worth internalising, because it recurs everywhere. Whenever
              your subject is a denominator, multiply it up first. Whenever your subject is trapped
              inside a bracket, deal with whatever is outside the bracket before you open it. Deal
              with the structure before you deal with the detail.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="A multi-step example: how far can I run this cable?"
            plainEnglish="Volt drop is published as a formula for volt drop. On site you usually know the volt drop you are allowed and want to know the length you can get away with."
            onSite="This is the transposition that answers the most frequently asked cable question on any job."
          >
            <p>
              The tabulated method gives volt drop as Vd = (mV/A/m × I × L) ÷ 1000, where mV/A/m is
              the tabulated figure for the cable, I is the design current in amperes and L is the
              run length in metres. The division by 1000 converts millivolts to volts.
            </p>
            <p>
              You know the volt drop you are permitted, you know the design current, and you know
              the cable you intend to use. What you want is L. Start by clearing the division —
              multiply both sides by 1000:
            </p>
            <p>Vd × 1000 = mV/A/m × I × L</p>
            <p>
              Now L is multiplied by two things, mV/A/m and I. Divide both sides by both of them
              together:
            </p>
            <p>L = (Vd × 1000) ÷ (mV/A/m × I)</p>
            <p>
              Put numbers in. Suppose you are allowed 6.9 V of drop, the design current is 20 A, and
              the cable is tabulated at 18 mV/A/m. Then L = (6.9 × 1000) ÷ (18 × 20) = 6900 ÷ 360 =
              19.2 m. That is the longest run that will stay inside the limit at that current with
              that cable — and the moment you know it, you know whether to accept the route or go up
              a size.
            </p>
            <p>
              Sanity-check it the other way round before you trust it. Feed 19.2 m back into the
              original: (18 × 20 × 19.2) ÷ 1000 = 6912 ÷ 1000 = 6.9 V. It returns the volt drop you
              started with, so the rearrangement is sound.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <ConceptBlock
            title="Formulae with the subject in more than one place"
            plainEnglish="Sometimes the letter you want appears twice. You have to gather it into one place before you can isolate it."
            onSite="Parallel resistance is the example you will meet most often."
          >
            <p>
              Two resistors in parallel give 1/RT = 1/R1 + 1/R2. Making RT the subject looks awkward
              because it is stuck underneath a 1. The move is to combine the right-hand side over a
              common denominator first:
            </p>
            <p>1/RT = (R2 + R1) ÷ (R1 × R2)</p>
            <p>
              Both sides are now a single fraction, so you can invert both — if two quantities are
              equal, their reciprocals are equal too:
            </p>
            <p>RT = (R1 × R2) ÷ (R1 + R2)</p>
            <p>
              That is the familiar &quot;product over sum&quot; rule, and it is worth knowing where
              it comes from rather than just memorising it, because it tells you its limits. It
              works for exactly two resistors. With three or more you must go back to the reciprocal
              form, add all the reciprocals, and invert at the end. Applying product-over-sum to
              three resistors is a common and confident error.
            </p>
          </ConceptBlock>

          <ContentEyebrow>Indices and notation</ContentEyebrow>

          <ConceptBlock
            title="The rules of indices you actually use"
            plainEnglish="Powers tell you how many times something is multiplied by itself. The rules for combining them are short and they save a lot of arithmetic."
            onSite="Every time you multiply or divide numbers in standard form, you are using these whether you name them or not."
          >
            <p>
              There are only a handful worth committing to memory. When you multiply powers of the
              same base you add the indices: 10³ × 10⁴ = 10⁷. When you divide you subtract them: 10⁶
              ÷ 10² = 10⁴. A power raised to a power multiplies the indices: (10²)³ = 10⁶. Anything
              raised to the power zero is 1. And a negative index means a reciprocal: 10⁻³ is 1 ÷
              10³, which is one thousandth.
            </p>
            <p>
              That last one is the one to be careful with. A negative index does not mean a negative
              number. 10⁻³ is 0.001, which is small and positive. Reading a negative exponent as a
              minus sign is a fast route to an answer that is wrong in a way that looks deliberate.
            </p>
            <p>
              Fractional indices are roots: x^(1/2) is the square root of x, and x^(1/3) is the cube
              root. You will not meet these often in day-to-day maintenance work, but they appear in
              the formulae behind cable ratings and in some machine calculations, and it helps to
              recognise them rather than be stopped by them.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Engineering notation — and why it is not the same as scientific notation"
            plainEnglish="Engineering notation keeps the exponent in steps of three, so it lines up with the prefixes on your meter."
            onSite="Micro, milli, kilo, mega, giga — each one a thousand from the next. That is why the exponent moves in threes."
          >
            <p>
              Scientific notation writes a number with exactly one non-zero digit before the decimal
              point: 47 000 becomes 4.7 × 10⁴. That is tidy for mathematics but it does not match
              the equipment. Engineering notation instead requires the exponent to be a multiple of
              three, so the same number becomes 47 × 10³, which you read directly as 47 kilo.
            </p>
            <p>
              The prefixes and their powers are worth knowing without hesitation: giga is 10⁹, mega
              is 10⁶, kilo is 10³, the unit itself is 10⁰, milli is 10⁻³, micro is 10⁻⁶, and nano is
              10⁻⁹. Each step is a factor of a thousand. An insulation resistance of 0.47 GΩ is
              therefore 470 MΩ, and a leakage current of 0.0035 A is 3.5 mA.
            </p>
            <p>
              The reason this matters more in maintenance than in most trades is the sheer spread of
              magnitudes you work across in a single shift. Insulation resistance is in megohms and
              gigohms. Earth fault loop impedance is in ohms and fractions of an ohm. Leakage
              current is in milliamps and microamps. Motor power is in kilowatts. Moving between
              those without dropping or gaining a factor of a thousand is a genuine skill, and the
              notation is the tool that makes it reliable.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <CommonMistake
            title="Slipping a factor of a thousand between prefixes"
            whatHappens={
              <>
                <p>
                  An insulation test reads 0.8 GΩ and gets written down as 0.8 MΩ. A circuit in
                  excellent condition is now recorded as sitting just below the 1.0 MΩ minimum, and
                  a defect is raised against it.
                </p>
                <p>
                  The error runs the other way too, and that direction is worse: a genuinely poor
                  0.8 MΩ result read as gigohms passes a circuit whose insulation is breaking down.
                </p>
              </>
            }
            doInstead={
              <>
                <p>
                  0.8 GΩ is 800 MΩ — an excellent result. Say the unit and its prefix out loud as
                  you record it, and know the shape of a normal result for the test you are doing. A
                  sound low-voltage circuit tested at 500 V typically reads in the hundreds of
                  megohms or better.
                </p>
                <p>
                  Treat proximity to the limit as a prompt to check the range and prefix before it
                  becomes a prompt to raise a defect. A reading that lands suspiciously close to the
                  minimum acceptable figure deserves a second look at the instrument, not just at
                  the circuit.
                </p>
              </>
            }
          />

          <ContentEyebrow>Two unknowns</ContentEyebrow>

          <ConceptBlock
            title="Simultaneous equations: what they are and where they come from"
            plainEnglish="If you have two things you do not know, you need two separate facts about them. Then you can pin both down."
            onSite="Any circuit with two loops and two unknown currents produces exactly this situation."
          >
            <p>
              One equation with one unknown can be solved by transposition. One equation with two
              unknowns cannot be solved at all — there are infinitely many pairs of values that
              satisfy it. To pin down two unknowns you need two independent equations, meaning two
              that genuinely tell you different things rather than the same fact written twice.
            </p>
            <p>
              The method is elimination. Arrange the two equations so that one unknown has the same
              coefficient in both, then add or subtract the equations so that unknown cancels. You
              are left with one equation in one unknown, which you solve by transposition. Then you
              substitute that value back into either original equation to find the second unknown.
            </p>
            <p>
              Take a worked case. Suppose analysis of a two-loop network gives you 2I₁ + 3I₂ = 13
              and 4I₁ − I₂ = 5. Multiply the second equation through by 3 so that the I₂ terms match
              in size: 12I₁ − 3I₂ = 15. Now add the two equations, and the I₂ terms cancel: 14I₁ =
              28, so I₁ = 2 A. Substitute back into the first equation: (2 × 2) + 3I₂ = 13, so 3I₂ =
              9 and I₂ = 3 A.
            </p>
            <p>
              Always check both values in the equation you did not use for the substitution. Here, 4
              × 2 − 3 = 5, which matches. If a pair satisfies both original equations, it is right.
            </p>
          </ConceptBlock>

          <Scenario
            title="A motor that draws the wrong current"
            situation={
              <>
                <p>
                  A 400 V three-phase motor on a conveyor has been rewound by a contractor.
                  Commissioning readings do not match the nameplate and the plant manager wants to
                  know whether to accept the machine back.
                </p>
                <p>
                  The nameplate gives 7.5 kW at 400 V with a power factor of 0.86 and an efficiency
                  of 89 per cent. On test the machine draws 14.8 A at full load.
                </p>
              </>
            }
            whatToDo={
              <>
                <p>
                  Work out what it should draw. Input power is output power divided by efficiency:
                  7500 ÷ 0.89 = 8427 W. For a three-phase load, P = √3 × V × I × cos φ. You need I,
                  so transpose: I = P ÷ (√3 × V × cos φ).
                </p>
                <p>
                  That gives I = 8427 ÷ (1.732 × 400 × 0.86) = 8427 ÷ 595.8 = 14.1 A. The measured
                  14.8 A is about five per cent above the calculated figure — within the range you
                  would expect from supply voltage variation, instrument tolerance and a nameplate
                  power factor quoted to two decimal places.
                </p>
                <p>
                  On this evidence alone there is nothing to reject. Move on to winding resistance
                  balance and no-load current before deciding.
                </p>
              </>
            }
            whyItMatters={
              <p>
                The calculation converts an argument into a number. Without it, &quot;14.8 A feels
                high&quot; is an opinion and the conversation goes nowhere. With it, you can say the
                expected figure is 14.1 A, the measurement is five per cent above that, and the
                difference sits inside normal tolerance — and then make the accept-or-reject
                decision on evidence rather than instinct.
              </p>
            }
          />

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          <ContentEyebrow>Making it reliable</ContentEyebrow>

          <ConceptBlock
            title="Estimate first, calculate second"
            plainEnglish="Decide roughly what the answer should be before you work it out. Then you will notice if the calculator disagrees."
            onSite="This is the habit that catches the errors nothing else catches — the ones where the method is right and the keypress was wrong."
          >
            <p>
              Before you calculate, round everything hard and get an approximate answer in your
              head. For the volt drop example above: roughly 7 V allowed, 18 mV/A/m is about 20, 20
              A is 20, so 20 × 20 = 400 mV per metre, and 7000 mV ÷ 400 is somewhere around 17 or 18
              metres. When the calculator says 19.2 m you know you are in the right territory. If it
              had said 192 m or 1.92 m you would catch it immediately.
            </p>
            <p>
              This matters because the errors that survive are rarely errors of method. They are
              mis-keyed digits, a missing bracket, a prefix slipped by a thousand. None of those
              produce a slightly wrong answer; they produce an answer that is wildly wrong but sits
              there looking authoritative. An estimate is the only cheap defence against them.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Check by substitution, every time"
            plainEnglish="Put your answer back into the original formula. If it gives you back what you started with, the rearrangement was right."
            onSite="Fifteen seconds. It has saved more callbacks than any other habit in this section."
          >
            <p>
              Substitution is the closest thing to proof available to you in the field. Having
              transposed and calculated, take the answer and feed it back through the original
              formula in its published form. If it reproduces the quantity you began with, both the
              rearrangement and the arithmetic are almost certainly sound.
            </p>
            <p>
              It is worth being disciplined about which formula you substitute into. Put the answer
              back into the original published version, not into your own rearranged one. If you
              rearranged it wrongly, checking against your own rearrangement will cheerfully confirm
              the error.
            </p>
            <ul className="space-y-1.5">
              <li>Round everything and estimate the answer before calculating.</li>
              <li>Write each transposition step on its own line rather than in your head.</li>
              <li>Keep brackets around anything a root or power applies to.</li>
              <li>Say the unit and prefix out loud as you record a reading.</li>
              <li>Substitute the result back into the original published formula.</li>
              <li>Ask whether the answer is physically sensible for the plant in front of you.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Building the evidence for your portfolio">
            <p>
              Calculations are some of the easiest evidence to capture well, and some of the most
              commonly captured badly. A photograph of a calculator screen proves nothing. What an
              assessor wants to see is the reasoning.
            </p>
            <ul className="space-y-1.5">
              <li>
                Record the question you were actually answering — &quot;can this run reach the pump
                house at 20 A without exceeding volt drop?&quot; — not just the sum.
              </li>
              <li>
                Show the formula in its published form, then your transposition, then the
                substitution, then the result with its unit.
              </li>
              <li>
                Note where each input came from: the tabulated mV/A/m figure, the nameplate, the
                design current from the schedule.
              </li>
              <li>
                State the decision the number led to, and what you would have done had it come out
                the other way.
              </li>
              <li>
                Keep the sanity check visible. Showing that you verified the answer is itself
                evidence of competence.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'The balance rule is the whole of transposition: do the same operation to the whole of both sides.',
              'Undo operations from the outside in — the reverse of the order you would evaluate them.',
              'Brackets define what a root or power applies to. √(P ÷ R) and √P ÷ R are different numbers.',
              'Lift a denominator subject up first; combine over a common denominator when the subject appears twice.',
              'Engineering notation moves the exponent in threes to match the SI prefixes on your instruments.',
              'A negative index means a reciprocal, not a negative number: 10⁻³ is 0.001.',
              'Two unknowns require two independent equations — eliminate, solve, substitute back, then check in the unused equation.',
              'Estimate before calculating, and substitute the result back into the original published formula.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Transposition and algebra knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section6')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Engineering mathematics
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section6-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Trigonometry, Areas and Volumes
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section6_1;
