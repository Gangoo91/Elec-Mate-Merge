/**
 * MOET · Module 2 · Section 2.6 · Subsection 2 — Trigonometry, Areas and Volumes
 *
 * NEW PAGE (12 Sep) — part of Section 2.6, written to close the ST1426 KSB gap
 * found in a coverage audit of all 88 in-scope KSBs. K17 requires "Trigonometric
 * methods and standard formulae to determine areas and volumes". The course had
 * no trigonometry at all before this section.
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

const TITLE = 'Trigonometry, Areas and Volumes - MOET Module 2.6.2';
const DESCRIPTION =
  'Right-angled triangle trigonometry, Pythagoras, and standard area and volume formulae for maintenance technicians — applied to conduit sets, cable tray, the impedance triangle, the power triangle and enclosure sizing.';

const quickCheckQuestions = [
  {
    id: 'trig-soh-cah-toa',
    question: 'In a right-angled triangle, which ratio gives the tangent of an angle?',
    options: [
      'Opposite divided by hypotenuse',
      'Adjacent divided by hypotenuse',
      'Opposite divided by adjacent',
      'Hypotenuse divided by opposite',
    ],
    correctIndex: 2,
    explanation:
      'Tangent is opposite over adjacent — the TOA in SOH CAH TOA. Sine is opposite over hypotenuse, cosine is adjacent over hypotenuse. The tangent is the one that never involves the hypotenuse at all, which makes it the ratio you reach for whenever you know or want the two shorter sides.',
  },
  {
    id: 'trig-pythagoras-impedance',
    question: 'A circuit has resistance 8 Ω and reactance 6 Ω. What is the impedance?',
    options: ['14 Ω', '10 Ω', '2 Ω', '48 Ω'],
    correctIndex: 1,
    explanation:
      'R and X are at right angles to each other, so they combine by Pythagoras rather than by simple addition: Z = √(R² + X²) = √(64 + 36) = √100 = 10 Ω. Adding them arithmetically to get 14 Ω is the classic error, and it always overstates the impedance.',
  },
  {
    id: 'trig-power-factor',
    question:
      'A load draws 5 kW of true power and 6.25 kVA of apparent power. What is the power factor?',
    options: ['0.80', '1.25', '0.64', '0.90'],
    correctIndex: 0,
    explanation:
      'Power factor is cos φ, which is the adjacent side over the hypotenuse of the power triangle — true power over apparent power. 5 ÷ 6.25 = 0.8. Power factor can never exceed 1, so an answer of 1.25 tells you the division went the wrong way round.',
  },
  {
    id: 'trig-area-circle',
    question:
      'A circular duct has a diameter of 150 mm. What is its cross-sectional area, to the nearest 100 mm²?',
    options: ['17 700 mm²', '70 700 mm²', '35 300 mm²', '23 600 mm²'],
    correctIndex: 0,
    explanation:
      'Area is πr², and the radius is half the diameter — 75 mm, not 150 mm. So A = π × 75² = π × 5625 = 17 671, which rounds to 17 700 mm². Using the diameter instead of the radius gives 70 700 mm², four times too big, and that factor of four is one of the most common slips in this whole topic.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'You need to set a conduit around an obstruction. The offset required is 120 mm and you intend to use a 30° set. What is the distance between the two bends, along the conduit?',
    options: ['240 mm', '104 mm', '138 mm', '60 mm'],
    correctAnswer: 0,
    explanation:
      'The offset is the side opposite the angle, and the distance between bends is the hypotenuse. So sin 30° = 120 ÷ d, which rearranges to d = 120 ÷ sin 30°. Since sin 30° = 0.5, d = 120 ÷ 0.5 = 240 mm. The useful shortcut falls straight out of this: at 30°, the distance between bends is always exactly twice the offset.',
  },
  {
    id: 2,
    question: 'Which statement about the impedance triangle is correct?',
    options: [
      'R and X add arithmetically to give Z',
      'R is the hypotenuse and Z is the adjacent side',
      'R and X are at right angles, so Z = √(R² + X²)',
      'The triangle only applies to DC circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Resistance and reactance are drawn at right angles because the voltage across a resistor is in phase with the current while the voltage across a pure reactance is 90° out of phase. Impedance is the hypotenuse, so it combines by Pythagoras. Adding them arithmetically always gives an answer that is too large, and the error grows as the two get closer in size.',
  },
  {
    id: 3,
    question:
      'A rectangular trunking is 100 mm × 50 mm. What is its internal cross-sectional area?',
    options: ['150 mm²', '5000 mm²', '500 mm²', '2500 mm²'],
    correctAnswer: 1,
    explanation:
      'Area of a rectangle is length × width: 100 × 50 = 5000 mm². Adding the two dimensions to get 150 is confusing perimeter-type thinking with area. This figure matters in practice because cable capacity in trunking is worked out as a proportion of the available cross-section.',
  },
  {
    id: 4,
    question: 'In the power triangle, what does the vertical side represent?',
    options: [
      'True power in watts',
      'Apparent power in volt-amperes',
      'Reactive power in reactive volt-amperes',
      'Power factor',
    ],
    correctAnswer: 2,
    explanation:
      'The horizontal side is true power in watts, the hypotenuse is apparent power in volt-amperes, and the vertical side is reactive power in VAr. Power factor is not a side at all — it is the cosine of the angle between true power and apparent power, so it is a ratio rather than a quantity with its own units.',
  },
  {
    id: 5,
    question:
      'A cylindrical tank is 1.2 m in diameter and 2 m tall. What is its volume, to the nearest 0.1 m³?',
    options: ['2.3 m³', '9.0 m³', '7.2 m³', '1.1 m³'],
    correctAnswer: 0,
    explanation:
      'Volume of a cylinder is πr²h. The radius is 0.6 m, so V = π × 0.6² × 2 = π × 0.36 × 2 = 2.26 m³, which rounds to 2.3 m³. Using the diameter rather than the radius would give 9.0 m³ — four times too large, the same factor-of-four trap as the circular area.',
  },
  {
    id: 6,
    question:
      'A ladder 6 m long is placed against a wall at the recommended angle of 75° to the horizontal. How far is the foot of the ladder from the wall?',
    options: ['1.55 m', '5.80 m', '1.61 m', '4.24 m'],
    correctAnswer: 0,
    explanation:
      'The distance from the wall is the side adjacent to the 75° angle, and the ladder is the hypotenuse. So cos 75° = d ÷ 6, giving d = 6 × cos 75° = 6 × 0.2588 = 1.55 m. This is where the familiar "one out, four up" rule of thumb comes from — 1.55 m out for 5.8 m up is very close to a ratio of 1 to 4.',
  },
  {
    id: 7,
    question: 'Why does a power factor of 0.8 mean a cable must carry more current than at unity?',
    options: [
      'Because the voltage rises when power factor falls',
      'Because apparent power is true power divided by power factor, and current follows apparent power',
      'Because the resistance of the cable increases',
      'It does not — current depends only on true power',
    ],
    correctAnswer: 1,
    explanation:
      'Apparent power S = P ÷ cos φ. At a power factor of 0.8, delivering 5 kW of true power requires 6.25 kVA of apparent power. The cable and the switchgear have to carry the current corresponding to that 6.25 kVA, not the 5 kW. This is exactly why poor power factor costs money in cable size, transformer capacity and, on many industrial tariffs, in charges.',
  },
  {
    id: 8,
    question:
      'A three-phase motor draws 22 A. The cable run needs an area calculation for a duct. The duct is 300 mm × 200 mm and must not be more than 45 per cent filled. What is the maximum cable cross-sectional area permitted?',
    options: ['27 000 mm²', '60 000 mm²', '13 500 mm²', '2250 mm²'],
    correctAnswer: 0,
    explanation:
      'The duct area is 300 × 200 = 60 000 mm². Forty-five per cent of that is 0.45 × 60 000 = 27 000 mm². The motor current is a distractor — it plays no part in this particular calculation. Reading a question carefully enough to spot which given values are irrelevant is part of the skill.',
  },
  {
    id: 9,
    question: 'What is the relationship between degrees and radians?',
    options: [
      'They are the same thing measured on different instruments',
      'π radians equals 180 degrees',
      '1 radian equals 1 degree divided by π',
      '360 radians equals 1 degree',
    ],
    correctAnswer: 1,
    explanation:
      'A full circle is 2π radians or 360 degrees, so π radians is 180 degrees and one radian is roughly 57.3 degrees. It matters because calculators and spreadsheets can work in either mode, and a trigonometric result that is wildly wrong is very often a calculator sitting in the wrong one. Check the mode before you doubt the maths.',
  },
  {
    id: 10,
    question: 'Which is the most reliable first check on any area or volume answer?',
    options: [
      'Confirm the answer is a whole number',
      'Confirm the units are consistent and the answer is the right order of magnitude',
      'Confirm the answer is larger than the largest dimension',
      'Confirm π was rounded to 3.14',
    ],
    correctAnswer: 1,
    explanation:
      'Mixed units are the single biggest source of error in this topic — millimetres multiplied by metres produces a number that means nothing. Convert everything to one unit before you start, and then ask whether the magnitude is sensible. A duct cross-section of 27 000 mm² is about a fifteenth of a square metre, which is believable; an answer of 27 m² would not be.',
  },
];

const faqs = [
  {
    question: 'Why is trigonometry in an electrical course at all?',
    answer:
      'Two reasons, and the second is the one people underestimate. The first is physical: conduit sets, cable tray offsets, ladder angles and duct routing are all right-angled triangle problems, and doing them by trial and error wastes material and time. The second is that alternating current itself is described by triangles. Resistance and reactance combine at right angles to give impedance; true power and reactive power combine at right angles to give apparent power. Power factor is literally the cosine of an angle. If you are ever going to understand why a poor power factor makes a cable run hotter, you need the triangle.',
  },
  {
    question: 'Do I need to memorise SOH CAH TOA, or can I look it up?',
    answer:
      'Memorise it. It takes five minutes and you will use it for the rest of your career. Sine is Opposite over Hypotenuse, Cosine is Adjacent over Hypotenuse, Tangent is Opposite over Adjacent. The part that genuinely needs care is not the mnemonic but correctly identifying which side is which, and that depends entirely on which angle you are working from. The hypotenuse is always the longest side and always opposite the right angle, so start by labelling that; then the opposite and adjacent follow from the angle you have chosen.',
  },
  {
    question: 'My calculator gives a strange answer for sin or cos. What is wrong?',
    answer:
      'Almost always the angle mode. Calculators can work in degrees, radians or gradians, and if you type 30 expecting degrees while it is set to radians you get 0.988 instead of 0.5. Look for a small DEG, RAD or GRAD indicator on the display and set it to DEG for ordinary site work. The giveaway is that sin 30° should be exactly 0.5 — if your calculator does not give you that, fix the mode before you go any further.',
  },
  {
    question: 'What is the practical difference between apparent, true and reactive power?',
    answer:
      'True power, measured in watts, is the part that does useful work — turning a shaft, producing heat, lighting a lamp. Reactive power, measured in reactive volt-amperes, is the part that flows back and forth building up and collapsing magnetic fields in motors and transformers; it does no net work but it still has to be carried. Apparent power, in volt-amperes, is the total the supply actually has to deliver, and it is the hypotenuse of the two. Cables, switchgear and transformers are sized on apparent power, which is why reactive power that does no useful work still costs real money.',
  },
  {
    question:
      'Why does using the diameter instead of the radius make the answer four times too big?',
    answer:
      'Because the radius is squared in the formula. If you double the radius by mistakenly using the diameter, you double a quantity that then gets squared, and two squared is four. The consequence is that the error is never small or subtle — you are out by 300 per cent, not by a few per cent. The defence is a habit: whenever you see a diameter given in a question, write the radius down as your first line of working, before you touch the formula at all.',
  },
  {
    question: 'How accurate do these calculations need to be on site?',
    answer:
      'It depends entirely on what the number is for. A conduit set marked out to the nearest millimetre is fine, and rounding π to 3.142 makes no practical difference. But where a figure feeds a compliance decision — a fill percentage, a cable size, a volt drop — carry the full precision through the working and only round at the very end. Rounding at every intermediate step accumulates error, and it is depressingly easy to round your way across a limit you were actually inside.',
  },
];

const MOETModule2Section6_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.6 · Subsection 2"
        title="Trigonometry, Areas and Volumes"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Triangles do two jobs in this trade. They set out conduit and tray in the physical
            world, and they describe what alternating current is doing in the electrical one. Power
            factor is an angle — this is the page where that stops being a slogan.
          </p>

          <TLDR
            points={[
              'SOH CAH TOA covers every right-angled triangle you will meet. Label the hypotenuse first, then the other two follow from your chosen angle.',
              'Pythagoras combines quantities at right angles: Z = √(R² + X²), and S = √(P² + Q²).',
              'Power factor is cos φ — true power over apparent power. It cannot exceed 1.',
              'Area of a circle is πr². Halve the diameter first, every time, or be wrong by a factor of four.',
              'Convert everything to one unit before calculating. Mixed units are the biggest single source of error here.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Transposition',
                gist: 'Every trigonometric ratio has to be rearranged to find a side rather than an angle, so the balance rule from the previous page is assumed throughout.',
                where: '2.6.1',
              },
              {
                term: 'AC fundamentals',
                gist: 'Reactance, phase difference and the idea that current and voltage need not peak at the same instant. The triangles here are a way of drawing that.',
                where: '2.2',
              },
              {
                term: 'Power in AC circuits',
                gist: 'Watts, volt-amperes and reactive volt-amperes as three different measures of power. This page explains how they relate geometrically.',
                where: '2.2',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the hypotenuse, opposite and adjacent sides of a right-angled triangle relative to a chosen angle.',
              'Apply sine, cosine and tangent to find an unknown side or angle.',
              'Use Pythagoras to combine quantities that act at right angles.',
              'Explain the impedance triangle and the power triangle, and calculate power factor from either.',
              'Calculate areas and volumes using standard formulae for rectangles, circles, cylinders and boxes.',
              'Apply those calculations to conduit sets, trunking and duct fill, and enclosure sizing.',
              'Avoid the two dominant errors: mixed units, and using diameter where radius is required.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The right-angled triangle</ContentEyebrow>

          <ConceptBlock
            title="Three ratios, and which side is which"
            plainEnglish="Pick your angle. The longest side is the hypotenuse. The side facing your angle is the opposite. The remaining one is the adjacent."
            onSite="Label the triangle before you pick a formula. Most trigonometry errors are labelling errors, not maths errors."
          >
            <p>
              A right-angled triangle has one angle of exactly 90 degrees. The side opposite that
              right angle is the hypotenuse, and it is always the longest of the three. The other
              two sides are named relative to whichever of the remaining angles you have decided to
              work from: the one facing that angle is the opposite, and the one running alongside it
              is the adjacent.
            </p>
            <p>
              That last point is the one that trips people. Opposite and adjacent are not fixed
              properties of a triangle — they swap depending on which angle you choose. The
              hypotenuse never moves, so label it first and use it as your anchor.
            </p>
            <p>
              The three ratios are then: sine of the angle equals opposite over hypotenuse; cosine
              equals adjacent over hypotenuse; tangent equals opposite over adjacent. SOH CAH TOA is
              the standard mnemonic and it is worth committing to memory, because you will reach for
              it for the rest of your working life.
            </p>
            <p>
              Which one you use is decided entirely by which two sides you are dealing with. If the
              hypotenuse is involved and the opposite is involved, it is sine. Hypotenuse and
              adjacent, cosine. The two short sides with no hypotenuse anywhere, tangent.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Pythagoras: combining things that act at right angles"
            plainEnglish="If two quantities are at ninety degrees to each other, you cannot just add them. You square them, add the squares, and take the root."
            onSite="This is the single most useful piece of geometry in electrical work, and it is not really about triangles at all."
          >
            <p>
              Pythagoras states that in a right-angled triangle, the square of the hypotenuse equals
              the sum of the squares of the other two sides: c² = a² + b². Rearranged for the
              hypotenuse itself, c = √(a² + b²).
            </p>
            <p>
              The reason this matters far beyond geometry is that it is the rule for combining any
              two quantities that act at right angles to one another. In electrical work that
              situation is everywhere, because voltage across a resistance and voltage across a
              reactance are ninety degrees out of phase. They are, in a real sense, at right angles
              — and so they combine by Pythagoras and not by ordinary addition.
            </p>
            <p>
              The practical consequence is worth stating plainly. An 8 Ω resistance in series with a
              6 Ω reactance does not give 14 Ω. It gives √(64 + 36) = 10 Ω. Arithmetic addition
              always overstates the result, and the overstatement is largest when the two quantities
              are similar in size.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <ContentEyebrow>Triangles on site</ContentEyebrow>

          <ConceptBlock
            title="Conduit sets and cable tray offsets"
            plainEnglish="An offset is a triangle. The offset height is the opposite side, the distance between bends is the hypotenuse."
            onSite="At 30 degrees the distance between bends is exactly twice the offset. That one fact covers a great deal of conduit work."
          >
            <p>
              When you set a conduit around an obstruction you are creating a triangle whose
              opposite side is the offset you need and whose hypotenuse is the length of conduit
              between the two bends. Since you know the offset and the angle, and you want the
              hypotenuse, sine is the ratio that applies: sin θ = offset ÷ distance between bends.
            </p>
            <p>
              Transposed for the distance, that becomes distance = offset ÷ sin θ. Suppose you need
              a 120 mm offset using a 30 degree set. Sine of 30 degrees is exactly 0.5, so the
              distance between bends is 120 ÷ 0.5 = 240 mm.
            </p>
            <p>
              The fact that sin 30° is exactly one half is why 30 degree sets are so popular. The
              distance between bends is always precisely double the offset, which you can do in your
              head on a ladder. At 45 degrees the multiplier is about 1.41, and at 60 degrees about
              1.15 — both useful, neither as quick.
            </p>
            <p>
              The same triangle covers the shortening allowance, the gain you have to account for
              because the conduit no longer travels in a straight line, and the reason a shallower
              angle needs more room but produces an easier pull for the cable.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Ladder angles and where the rule of thumb comes from"
            plainEnglish="A ladder at the recommended angle is a triangle with the ladder as the hypotenuse."
            onSite="The familiar one-out-four-up guidance is simply the 75 degree angle expressed as a ratio you can eyeball."
          >
            <p>
              Access equipment guidance settles on roughly 75 degrees to the horizontal for a
              leaning ladder. If the ladder itself is the hypotenuse and the distance from the wall
              is the adjacent side, then cosine is the ratio: cos 75° = distance ÷ ladder length.
            </p>
            <p>
              For a 6 m ladder that gives distance = 6 × cos 75° = 6 × 0.2588 = 1.55 m from the
              wall. The height reached up the wall is the opposite side: 6 × sin 75° = 5.80 m.
            </p>
            <p>
              Compare those two numbers — 1.55 m out for 5.80 m up — and the ratio is very nearly
              one to four. That is exactly where the familiar rule of thumb comes from. Knowing the
              trigonometry behind it means you can adapt it when the situation is not standard,
              which a memorised ratio alone does not let you do.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Confusing the opposite and adjacent sides"
            whatHappens={
              <>
                <p>
                  A conduit offset is calculated with cosine instead of sine because the sides were
                  labelled from the wrong angle. A 120 mm offset at 30 degrees comes out as 138 mm
                  between bends instead of 240 mm.
                </p>
                <p>
                  The number looks plausible — it is the right order of magnitude and it is larger
                  than the offset, which feels correct — so it gets marked out and cut.
                </p>
              </>
            }
            doInstead={
              <>
                <p>
                  Label the hypotenuse first: it is always the longest side, always opposite the
                  right angle, and it never changes. Then pick your angle and ask which of the
                  remaining two sides faces it. That one is the opposite.
                </p>
                <p>
                  Sanity-check the result. The hypotenuse must be the largest of the three sides. If
                  your calculated hypotenuse comes out smaller than a side you already know, the
                  ratio was wrong.
                </p>
              </>
            }
          />

          <ContentEyebrow>The two triangles that describe AC</ContentEyebrow>

          <ConceptBlock
            title="The impedance triangle"
            plainEnglish="Resistance along the bottom, reactance up the side, impedance across the diagonal."
            onSite="This is why a circuit with reactance always has a higher impedance than its resistance alone suggests."
          >
            <p>
              In an AC circuit the opposition to current has two distinct parts. Resistance
              dissipates energy as heat and the voltage across it is in phase with the current.
              Reactance — whether inductive from a motor winding or capacitive from a correction
              bank — stores and returns energy, and the voltage across it leads or lags the current
              by ninety degrees.
            </p>
            <p>
              Because of that ninety degree relationship, resistance and reactance are drawn at
              right angles: resistance horizontally, reactance vertically. The hypotenuse is the
              total opposition, the impedance Z, and it follows from Pythagoras: Z = √(R² + X²).
            </p>
            <p>
              The angle of that triangle, usually written φ, is the phase angle between the supply
              voltage and the current. It can be found from any pair of sides — tan φ = X ÷ R is
              often the most direct, since resistance and reactance are frequently what you know.
            </p>
            <p>
              Transposing the triangle gives you whichever quantity you are missing. Needing the
              reactance when you know impedance and resistance, for instance, gives X = √(Z² − R²),
              which is the transposition worked through on the previous page.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The power triangle, and what power factor actually is"
            plainEnglish="True power along the bottom, reactive power up the side, apparent power across the diagonal. Power factor is the cosine of the angle between the bottom and the diagonal."
            onSite="Power factor is not a quantity with units. It is a ratio — and it can never be greater than one."
          >
            <p>
              The power triangle has the same shape as the impedance triangle and the same angle,
              which is not a coincidence — it is the same phase relationship viewed in terms of
              power rather than opposition.
            </p>
            <p>
              True power P, measured in watts, sits along the horizontal. It is the part of the
              supply that does useful work: turning a shaft, producing heat, lighting a lamp.
              Reactive power Q, measured in reactive volt-amperes, sits vertically. It flows back
              and forth building and collapsing magnetic fields, doing no net work over a cycle but
              still occupying the cable. Apparent power S, in volt-amperes, is the hypotenuse — the
              total the supply must actually deliver.
            </p>
            <p>
              They combine by Pythagoras: S = √(P² + Q²). And power factor is cos φ, the adjacent
              over the hypotenuse — which is to say true power divided by apparent power.
            </p>
            <p>
              That definition has an immediate practical consequence. A load drawing 5 kW at a power
              factor of 0.8 requires apparent power of 5 ÷ 0.8 = 6.25 kVA. The cable, the protective
              device, the switchgear and the transformer all have to carry the current corresponding
              to 6.25 kVA, even though only 5 kW is doing anything useful. Poor power factor is
              expensive precisely because it consumes capacity without producing output.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ContentEyebrow>Areas and volumes</ContentEyebrow>

          <ConceptBlock
            title="The standard formulae worth knowing without looking up"
            plainEnglish="Rectangle: length times width. Circle: pi times radius squared. Cylinder: circle area times height. Box: length times width times height."
            onSite="Every one of these appears in fill calculations, enclosure sizing or tank capacity at some point."
          >
            <p>
              For areas, the ones you need are: rectangle, A = l × w; triangle, A = ½ × base ×
              height; circle, A = πr². For volumes: rectangular box, V = l × w × h; cylinder, V =
              πr²h. That short list covers the overwhelming majority of practical maintenance
              calculations.
            </p>
            <p>
              The circle formulae deserve particular attention, because they are the ones that go
              wrong. Area is π multiplied by the radius squared — the radius, not the diameter.
              Circular components are almost always specified by diameter, so a conversion step is
              nearly always required, and it is nearly always the step that gets skipped.
            </p>
            <p>
              A 150 mm diameter duct has a radius of 75 mm and therefore an area of π × 75² = 17 671
              mm². Using 150 in the formula gives 70 686 mm², four times too large. That factor of
              four appears because the mistake doubles a quantity that is then squared.
            </p>
            <p>
              Make it a habit: when a question gives you a diameter, the first line of your working
              is the radius. Write it down before you write anything else.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Where these calculations actually get used"
            plainEnglish="Fill percentages, enclosure heat, tank capacity, duct sizing. All routine, all area or volume underneath."
            onSite="The arithmetic is easy. Keeping the units consistent is the part that needs discipline."
          >
            <p>
              Containment fill is the most frequent. Trunking and duct capacity is expressed as a
              percentage of the available cross-sectional area, so you need the area of the
              containment and the total area of the cables going into it. A 300 mm × 200 mm duct has
              60 000 mm² available; at a 45 per cent fill limit that permits 27 000 mm² of cable.
            </p>
            <p>
              Enclosure sizing for heat dissipation depends on surface area, since heat leaves
              through the surfaces. Volume matters for the air inside, but it is the external area
              that governs how fast heat escapes, which is why a tall thin enclosure and a cube of
              the same volume behave differently.
            </p>
            <p>
              Tank and vessel capacity comes up in plant work constantly — coolant, lubricant,
              process fluid — and cylindrical tanks are the common case. A tank 1.2 m in diameter
              and 2 m tall holds π × 0.6² × 2 = 2.26 m³, which is 2260 litres since a cubic metre is
              a thousand litres.
            </p>
            <p>
              That conversion is worth holding onto, because litres are how tanks are actually
              labelled and cubic metres are what the formula gives you.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          <CommonMistake
            title="Mixing units inside a single calculation"
            whatHappens={
              <>
                <p>
                  A duct is measured in millimetres and a cable run in metres, and both go into the
                  same sum without conversion. The answer is out by a factor of a thousand — or a
                  million, where an area is involved — and carries no unit that means anything.
                </p>
                <p>
                  Because the working looks methodical, the result tends to be trusted. This is the
                  most common error in the whole topic, ahead even of the diameter-for-radius slip.
                </p>
              </>
            }
            doInstead={
              <>
                <p>
                  Convert everything to a single unit before you start calculating, and write the
                  unit beside every figure as you go. Decide at the outset whether this is a
                  millimetre problem or a metre problem, and commit to it.
                </p>
                <p>
                  Remember that squaring magnifies the conversion. There are a thousand millimetres
                  in a metre but a million square millimetres in a square metre, and a thousand
                  million cubic millimetres in a cubic metre. Getting the linear conversion right
                  and the squared one wrong is a common half-error.
                </p>
              </>
            }
          />

          <Scenario
            title="Sizing a duct for a pump house rewire"
            situation={
              <>
                <p>
                  A pump house is being rewired and six SWA cables must run through an existing
                  concrete duct from the switchroom. The duct measures 250 mm × 150 mm internally.
                  Site standard limits duct fill to 45 per cent of cross-sectional area.
                </p>
                <p>
                  Four of the cables have an overall diameter of 21 mm and two have an overall
                  diameter of 29 mm. The project manager wants to know whether they will fit before
                  ordering.
                </p>
              </>
            }
            whatToDo={
              <>
                <p>
                  Start with the duct. Cross-sectional area is 250 × 150 = 37 500 mm². At 45 per
                  cent fill, the permitted cable area is 0.45 × 37 500 = 16 875 mm².
                </p>
                <p>
                  Now the cables, and this is where the radius habit pays. The 21 mm cables have a
                  radius of 10.5 mm, so each occupies π × 10.5² = 346 mm². Four of them come to 1385
                  mm². The 29 mm cables have a radius of 14.5 mm, so each occupies π × 14.5² = 661
                  mm². Two come to 1321 mm².
                </p>
                <p>
                  Total cable area is 1385 + 1321 = 2706 mm², against a permitted 16 875 mm². That
                  is a fill of about 7 per cent — comfortably inside the limit, with a great deal of
                  room to spare.
                </p>
              </>
            }
            whyItMatters={
              <p>
                The answer is not close to the limit, and that itself is useful information. It
                tells the project manager there is capacity for future circuits, which changes what
                gets specified now. Had the calculation been done with diameters instead of radii,
                the cable area would have come out at 10 824 mm² — a fill of 29 per cent, still
                passing, but presenting a duct with plenty of spare capacity as one that was filling
                up. A wrong answer that still passes is not harmless; it leads to the wrong decision
                about what to do next.
              </p>
            }
          />

          <ContentEyebrow>Getting it right</ContentEyebrow>

          <ConceptBlock
            title="Degrees, radians and the calculator mode trap"
            plainEnglish="Calculators can measure angles two ways. If yours is in the wrong mode, every trigonometric answer will be wrong."
            onSite="Test it: sin 30 should give exactly 0.5. If it does not, you are in radians."
          >
            <p>
              An angle can be measured in degrees, where a full circle is 360, or in radians, where
              a full circle is 2π — approximately 6.283. One radian is therefore about 57.3 degrees,
              and π radians is exactly 180 degrees.
            </p>
            <p>
              Site work is done in degrees almost universally. Radians appear in the mathematics
              behind AC waveform theory and in spreadsheet functions, which default to radians in
              most software. That mismatch is where the trouble starts: a spreadsheet formula
              written with degrees in mind will silently produce nonsense.
            </p>
            <p>
              Two defences. On a calculator, look for the DEG or RAD indicator and check it before
              you start. In a spreadsheet, wrap the angle in a conversion function so the intent is
              explicit in the formula rather than dependent on a setting. And whichever you are
              using, the quick test never fails: sine of 30 degrees is exactly 0.5.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building the evidence for your portfolio">
            <p>
              Geometry and area calculations produce some of the most persuasive portfolio evidence
              available, because the result is usually visible in the finished work.
            </p>
            <ul className="space-y-1.5">
              <li>
                Photograph a conduit set or tray offset you marked out, alongside the calculation
                you used to mark it.
              </li>
              <li>
                Record the containment fill calculation for a run you installed — duct or trunking
                area, cable areas, resulting percentage, and the limit you were working to.
              </li>
              <li>
                Where you calculated a power factor or an impedance from measured values, keep the
                instrument readings next to the working so the inputs are traceable.
              </li>
              <li>
                Show the unit conversions explicitly rather than doing them in your head. An
                assessor reading your working should never have to guess whether a figure is
                millimetres or metres.
              </li>
              <li>
                Note what the calculation let you decide — accept the route, go up a cable size, ask
                for a larger duct. The decision is the point; the arithmetic is how you got there.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'SOH CAH TOA: sine is opposite over hypotenuse, cosine adjacent over hypotenuse, tangent opposite over adjacent.',
              'Label the hypotenuse first — it is always the longest side and never moves. Opposite and adjacent depend on your chosen angle.',
              'Quantities at right angles combine by Pythagoras, never by arithmetic addition.',
              'Impedance triangle: Z = √(R² + X²), with tan φ = X ÷ R.',
              'Power triangle: S = √(P² + Q²), and power factor is cos φ = P ÷ S. It can never exceed 1.',
              'A 5 kW load at 0.8 power factor needs 6.25 kVA of supply capacity — that is why poor power factor costs money.',
              'Area of a circle is πr². Write the radius down as your first line whenever a diameter is given.',
              'Convert to a single unit before calculating. Squaring magnifies the conversion: 1 m² is a million mm².',
              'Check the calculator angle mode. Sin 30° must give exactly 0.5.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Trigonometry, areas and volumes knowledge check"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section6-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Transposition and Algebraic Methods
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section6-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Statistics for Maintenance Data
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section6_2;
