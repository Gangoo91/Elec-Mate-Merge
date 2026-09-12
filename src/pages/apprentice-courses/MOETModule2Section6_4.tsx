/**
 * MOET · Module 2 · Section 2.6 · Subsection 4 — Rates of Change and Elementary Calculus
 *
 * NEW PAGE (12 Sep) — the last of four in Section 2.6, written to close the
 * ST1426 KSB gap found in a coverage audit of all 88 in-scope KSBs. K17 requires
 * "Elementary calculus techniques: coefficient, gradient of a curve, rate of
 * change."
 *
 * Deliberately framed around three things the course already teaches elsewhere —
 * the temperature coefficient of resistance (2.1/2.5), RC time constants (2.2),
 * and the P-F interval from RCM (4.7) — so the maths arrives attached to
 * something the learner has already met rather than as abstract calculus.
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

const TITLE = 'Rates of Change and Elementary Calculus - MOET Module 2.6.4';
const DESCRIPTION =
  'Gradient, rate of change and coefficients for maintenance technicians: reading a trend slope, the temperature coefficient of resistance, RC time constants, exponential behaviour and using the P-F curve to decide how long you have.';

const quickCheckQuestions = [
  {
    id: 'roc-gradient-meaning',
    question: 'On a chart of vibration against time, what does the gradient represent?',
    options: [
      'The total vibration measured',
      'How fast the vibration is changing, in mm/s per month',
      'The average vibration level',
      'The maximum permitted vibration',
    ],
    correctIndex: 1,
    explanation:
      'Gradient is change in the vertical quantity divided by change in the horizontal one, so on a vibration-against-time chart it is mm/s per unit of time — a rate. The level tells you where the machine is now; the gradient tells you how quickly it is getting there, and in condition monitoring that is usually the more actionable number.',
  },
  {
    id: 'roc-temp-coefficient',
    question:
      'Copper has a temperature coefficient of resistance of about 0.004 per °C. What does that mean?',
    options: [
      'Resistance falls by 0.4 per cent for every degree of temperature rise',
      'Resistance rises by about 0.4 per cent for every degree of temperature rise',
      'Resistance is 0.004 Ω at 0 °C',
      'Temperature rises 0.004 °C per ohm',
    ],
    correctIndex: 1,
    explanation:
      'A coefficient is a rate of change expressed per unit of something else. Here it is the fractional change in resistance per degree Celsius: 0.004 means 0.4 per cent per °C. A copper conductor 50 °C hotter than when you tested it has roughly 20 per cent more resistance, which is precisely why measured values have to be corrected before they are compared against limits.',
  },
  {
    id: 'roc-curve-gradient',
    question: 'How does the gradient of a curve differ from the gradient of a straight line?',
    options: [
      'A curve has no gradient',
      'A curve has a different gradient at every point, so you must state where you measured it',
      'A curve always has a steeper gradient',
      'They are calculated the same way with the same result',
    ],
    correctIndex: 1,
    explanation:
      "A straight line has one gradient everywhere. A curve is constantly changing direction, so its gradient depends entirely on which point you look at — you find it by drawing a tangent at that point and measuring the tangent's slope. This is the whole idea behind differential calculus, and it matters because deterioration curves are steeper near the end than at the start.",
  },
  {
    id: 'roc-time-constant',
    question:
      'In an RC circuit, what proportion of the final voltage is reached after one time constant?',
    options: ['50 per cent', 'about 63 per cent', '90 per cent', '100 per cent'],
    correctIndex: 1,
    explanation:
      'After one time constant, τ = R × C, the capacitor reaches about 63.2 per cent of its final voltage. The charging is exponential, so the rate of change is steepest at the start and flattens as it approaches the final value. By convention the circuit is treated as fully charged after five time constants, at which point it is above 99 per cent.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Bearing temperature rose from 45 °C to 63 °C over six weeks. What is the average rate of change?',
    options: ['18 °C per week', '3 °C per week', '10.5 °C per week', '0.33 °C per week'],
    correctAnswer: 1,
    explanation:
      'Rate of change is the change in the quantity divided by the change in time: (63 − 45) ÷ 6 = 18 ÷ 6 = 3 °C per week. Note the word average — this is the mean gradient across the whole period, and it does not tell you whether the rise was steady or accelerating. Plotting the individual readings would settle that.',
  },
  {
    id: 2,
    question: 'What is the gradient of a horizontal line on a trend chart, and what does it mean?',
    options: [
      'Undefined — the machine is failing',
      'Zero — the quantity is not changing over time',
      'One — the quantity is changing steadily',
      'Infinite — the quantity is changing instantly',
    ],
    correctAnswer: 1,
    explanation:
      'A horizontal line has no vertical change, so its gradient is zero: the quantity is stable. In condition monitoring this is exactly what you want to see. A vertical line, by contrast, has an undefined gradient because you would be dividing by zero — it would mean the quantity changed instantly, which in practice signals a step change or a measurement error rather than gradual deterioration.',
  },
  {
    id: 3,
    question:
      'A conductor measures 0.8 Ω at 20 °C. Using a temperature coefficient of 0.004 per °C, what is its approximate resistance at 70 °C?',
    options: ['0.96 Ω', '0.80 Ω', '1.60 Ω', '0.84 Ω'],
    correctAnswer: 0,
    explanation:
      'The temperature rise is 50 °C. The fractional increase is 0.004 × 50 = 0.2, or 20 per cent. So R = 0.8 × 1.2 = 0.96 Ω. This is the physical reason behind correcting measured loop impedance values — the conductor you tested cold will be substantially more resistive when carrying fault current hot.',
  },
  {
    id: 4,
    question: 'What does "coefficient" mean in an engineering context?',
    options: [
      'A number with no units',
      'A multiplier expressing how much one quantity changes per unit change in another',
      'The gradient of a straight line only',
      'The total change in a quantity',
    ],
    correctAnswer: 1,
    explanation:
      'A coefficient is a rate expressed per unit of something else — resistance change per degree, expansion per degree, friction force per unit of normal force. It is a rate of change that has been packaged as a constant you can look up and multiply by. Recognising that a coefficient IS a rate of change is what connects a table of material properties to the idea of a gradient.',
  },
  {
    id: 5,
    question: 'On a P-F curve, what does the steepness of the curve after point P tell you?',
    options: [
      'How much the repair will cost',
      'How quickly the failure will progress, and therefore how much time you have to act',
      'The age of the equipment',
      'The mean time between failures',
    ],
    correctAnswer: 1,
    explanation:
      'Point P is where a failure first becomes detectable and point F is functional failure. The gradient between them is the rate at which the condition is deteriorating, which determines the P-F interval — the window you have to intervene. A steep curve means a short window and demands frequent monitoring; a shallow one allows a longer inspection interval.',
  },
  {
    id: 6,
    question: 'Why does exponential growth matter in condition monitoring?',
    options: [
      'Because it means the fault will never get worse',
      'Because the rate of deterioration itself increases, so a small recent change can signal a short remaining window',
      'Because it only applies to electrical faults',
      'Because it makes the trend line horizontal',
    ],
    correctAnswer: 1,
    explanation:
      'In exponential deterioration the gradient grows as the value grows, so what looked like a slow drift can accelerate sharply. A vibration trend that took a year to move from 2 to 4 mm/s may take only weeks to reach 8. This is why the direction and the acceleration of a trend matter more than the absolute level — waiting for a threshold can leave no time to act.',
  },
  {
    id: 7,
    question:
      'A capacitor charges through a resistor with R = 10 kΩ and C = 100 µF. What is the time constant?',
    options: ['1 second', '0.1 seconds', '10 seconds', '1000 seconds'],
    correctAnswer: 0,
    explanation:
      'The time constant τ = R × C. Converting to base units, 10 kΩ is 10 000 Ω and 100 µF is 0.0001 F, so τ = 10 000 × 0.0001 = 1 second. This is a direct application of engineering notation from the first page of this section — mishandling the prefixes here gives an answer out by a factor of a thousand or more.',
  },
  {
    id: 8,
    question:
      'Two machines both show vibration at 5 mm/s today. Machine A has been at 5 for a year; machine B has climbed from 2 to 5 in two months. What should you conclude?',
    options: [
      'They need identical treatment because the levels match',
      'Machine B is deteriorating rapidly and needs urgent attention despite the identical reading',
      'Machine A is worse because it has been elevated longer',
      'Neither needs attention until they exceed a threshold',
    ],
    correctAnswer: 1,
    explanation:
      'The level is the same; the gradient is completely different. Machine A is stable — whatever caused its 5 mm/s is not progressing. Machine B is changing at 1.5 mm/s per month and, if that continues, will reach a serious level within weeks. Acting on level alone treats these two identically, which is precisely the error that trend analysis exists to prevent.',
  },
  {
    id: 9,
    question: 'How do you find the gradient of a curve at a particular point?',
    options: [
      'Take the total rise divided by the total run',
      "Draw a tangent to the curve at that point and measure the tangent's gradient",
      'Measure the gradient at the start of the curve',
      'Curves do not have gradients at individual points',
    ],
    correctAnswer: 1,
    explanation:
      'A tangent is a straight line touching the curve at exactly that point and matching its direction there. Its gradient is the instantaneous rate of change at that point. Taking the total rise over the total run instead gives the average gradient across the whole curve, which can be very different from the rate right now — especially on a deterioration curve that is accelerating.',
  },
  {
    id: 10,
    question: 'Why must the units of a gradient always be stated?',
    options: [
      'Because gradients are dimensionless',
      'Because a gradient is a ratio of two quantities and the number alone is meaningless without them',
      'Because the units determine whether it is positive',
      'It is optional — the number is sufficient',
    ],
    correctAnswer: 1,
    explanation:
      'A gradient of 3 means nothing on its own. Three degrees per week, three millimetres per second per month and three ohms per degree are entirely different statements. The units carry the physical meaning, and stating them is also the quickest check that you divided the right quantity by the right one — if the units come out wrong, the calculation was wrong.',
  },
];

const faqs = [
  {
    question: 'Is this really calculus? It looks like arithmetic.',
    answer:
      'The standard asks for elementary calculus techniques — coefficient, gradient of a curve, rate of change — and that is deliberately the conceptual end of the subject rather than the algebraic one. You are not being asked to differentiate functions. You are being asked to understand that a gradient is a rate of change, that a curve has a different gradient at every point, and that the rate at which something is changing is often more useful than its present value. Those ideas are the foundation of calculus, and in maintenance they are used by reading them off charts rather than by manipulating equations.',
  },
  {
    question: 'Why does the gradient matter more than the actual reading?',
    answer:
      'Because the reading tells you where you are and the gradient tells you where you are going. Two machines sitting at the same vibration level can be in completely different situations: one stable for a year, one that has trebled in two months. Acting on level alone treats them the same. The whole logic of condition-based maintenance is that a change detected early gives you time to plan an intervention, and detecting change means looking at the slope. That said, level still matters when it is close to a limit — the two are read together, not one instead of the other.',
  },
  {
    question: 'What exactly is a coefficient?',
    answer:
      'It is a rate of change that has been measured once and packaged as a constant you can look up. The temperature coefficient of resistance says how much resistance changes per degree. A coefficient of linear expansion says how much a material lengthens per degree. A coefficient of friction says how much friction force you get per unit of normal force. In every case the word "per" is doing the work, and that "per" is what makes it a rate. Recognising this is what links a table of material properties to the gradient of a graph — they are the same idea in two different presentations.',
  },
  {
    question: 'Why is so much in electrical engineering exponential rather than linear?',
    answer:
      'Because a great many physical processes have a rate of change proportional to how much is left to change. A capacitor charges quickly at first because there is a large voltage difference driving the current; as it approaches the supply voltage the difference shrinks, the current falls, and the charging slows. The same shape appears in inductor current, in the discharge of a capacitor, in thermal heating and cooling, and in insulation absorption current during a long insulation-resistance test. Once you recognise the shape, the behaviour of a lot of apparently unrelated equipment becomes predictable.',
  },
  {
    question: 'How does this connect to the P-F interval from reliability-centred maintenance?',
    answer:
      'Directly. The P-F curve plots equipment condition against time, with point P where a potential failure first becomes detectable and point F where functional failure occurs. The gradient of the curve between those points is the rate of deterioration, and the horizontal distance between them is the P-F interval — your window to act. A steep gradient means a short interval, so monitoring has to be frequent enough to catch the fault inside it. Setting an inspection interval is therefore a judgement about gradient, and monitoring less often than the P-F interval means you will sometimes miss the warning entirely.',
  },
  {
    question: 'My trend line has a negative gradient. Is that good or bad?',
    answer:
      'It depends entirely on what is being plotted, which is why the units and the direction both need stating. A negative gradient on a vibration trend is good — vibration is falling, perhaps after a repair. A negative gradient on an insulation resistance trend is bad, because falling insulation resistance means deteriorating insulation. The sign tells you the direction of change and nothing about whether that direction is desirable; you have to know which way is better for the quantity you are measuring.',
  },
];

const MOETModule2Section6_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.6 · Subsection 4"
        title="Rates of Change and Elementary Calculus"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            A reading tells you where a machine is. A gradient tells you where it is going, and how
            fast. This page is about the second of those — and about why two identical readings can
            demand completely different responses.
          </p>

          <TLDR
            points={[
              'Gradient is change in one quantity divided by change in another — rise over run. It is always a rate, and it always needs units.',
              'A straight line has one gradient. A curve has a different gradient at every point, found by drawing a tangent there.',
              'A coefficient is a rate of change packaged as a constant: resistance change per °C, expansion per °C, friction per unit force.',
              'Copper resistance rises about 0.4 per cent per °C — which is why measured values get corrected before comparison.',
              'Exponential change means the rate itself grows. Slow drift can accelerate sharply.',
              'On a P-F curve the gradient sets your window to act. Steep curve, short window, frequent monitoring.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Transposition and notation',
                gist: 'Time constants and coefficient calculations both depend on handling prefixes without slipping a factor of a thousand.',
                where: '2.6.1',
              },
              {
                term: 'Statistics and trending',
                gist: 'Reading a run chart and distinguishing a real trend from ordinary scatter. Gradient only means something once you know the trend is real.',
                where: '2.6.3',
              },
              {
                term: 'Capacitance and inductance',
                gist: 'Why a capacitor takes time to charge. This page puts a number on that behaviour through the time constant.',
                where: '2.2',
              },
              {
                term: 'Condition monitoring',
                gist: 'Vibration and temperature trending in practice. The gradient is what those trends are collected to reveal.',
                where: '4.2',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate the gradient of a straight line and state its units correctly.',
              'Explain why a curve has a different gradient at every point, and find one using a tangent.',
              'Define a coefficient as a rate of change, and apply the temperature coefficient of resistance.',
              'Calculate an RC time constant and describe exponential charging behaviour.',
              'Distinguish between the level of a reading and its rate of change, and explain why both matter.',
              'Relate gradient to the P-F interval and to the setting of monitoring intervals.',
              'Interpret the sign of a gradient correctly for the quantity being measured.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Gradient</ContentEyebrow>

          <ConceptBlock
            title="Rise over run — and why the units carry the meaning"
            plainEnglish="How much the line goes up, divided by how far it goes across. That ratio is the rate."
            onSite="A gradient of 3 means nothing. Three degrees per week means something you can act on."
          >
            <p>
              The gradient of a straight line is the change in the vertical quantity divided by the
              change in the horizontal one. On a graph of temperature against time, that is degrees
              divided by weeks; on resistance against temperature, ohms divided by degrees.
            </p>
            <p>
              What makes a gradient useful is that it is a rate. A bearing that rose from 45 °C to
              63 °C over six weeks has a gradient of (63 − 45) ÷ 6 = 3 °C per week. That single
              number answers a question the individual readings do not: how fast is this getting
              worse?
            </p>
            <p>
              The units are not decoration. They carry the entire physical meaning, and stating them
              is also the fastest check that you divided the right thing by the right thing. If you
              set out to find degrees per week and your units come out as weeks per degree, you
              inverted the calculation — and you will have caught it before the answer went
              anywhere.
            </p>
            <p>
              Two special cases are worth recognising. A horizontal line has zero gradient: nothing
              is changing, which on a condition-monitoring trend is exactly what you want. A
              vertical line has an undefined gradient, because you would be dividing by zero. In
              practice a near-vertical section of a trend means a step change or a bad measurement
              rather than genuine gradual deterioration, and it is worth investigating as such.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Curves: a different gradient at every point"
            plainEnglish="A curve keeps changing direction, so its steepness depends on where you look. You measure it with a tangent."
            onSite="Deterioration curves are shallow early and steep late. The average gradient across the whole thing understates where you are now."
          >
            <p>
              A straight line has one gradient and it is the same everywhere. A curve does not. Its
              direction changes continuously, so asking for &quot;the gradient of the curve&quot;
              without saying where is an incomplete question.
            </p>
            <p>
              To find the gradient at a particular point, draw a tangent — a straight line touching
              the curve at that point and running in the same direction as the curve does there. The
              gradient of that tangent is the instantaneous rate of change at that point. In
              practice you draw it by eye on a printed trend, pick two convenient points along the
              tangent, and take rise over run between them.
            </p>
            <p>
              This distinction matters a great deal in maintenance, because deterioration is rarely
              linear. A bearing degrading over two years might change very slowly for eighteen
              months and then rapidly in the final weeks. The average gradient across the whole
              period is mild and reassuring; the gradient right now, at the point you are standing,
              may be steep and urgent. Reporting the average would understate the situation badly.
            </p>
            <p>
              That idea — the gradient at a point rather than across a span — is the central concept
              of differential calculus. You are not being asked to do the algebra of it. You are
              being asked to read it off a chart and understand what it is telling you.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ContentEyebrow>Coefficients</ContentEyebrow>

          <ConceptBlock
            title="A coefficient is a rate of change you can look up"
            plainEnglish="Somebody measured the gradient once, and wrote it down as a constant so you do not have to."
            onSite="Whenever you see the word 'per' in a material property, you are looking at a rate of change."
          >
            <p>
              The temperature coefficient of resistance for copper is about 0.004 per degree
              Celsius. That is a gradient: the fractional change in resistance per unit change in
              temperature. It has been measured once and tabulated so that you can apply it rather
              than rediscover it.
            </p>
            <p>
              The same pattern appears throughout engineering. The coefficient of linear expansion
              gives length change per degree. The coefficient of friction gives friction force per
              unit of normal force. Each is a rate of change presented as a constant, and each is
              used the same way: multiply it by the change in the driving quantity.
            </p>
            <p>
              Applying the copper figure: a conductor measuring 0.8 Ω at 20 °C, raised to 70 °C, has
              undergone a 50 °C rise. The fractional increase is 0.004 × 50 = 0.2, which is 20 per
              cent. So the hot resistance is 0.8 × 1.2 = 0.96 Ω.
            </p>
            <p>
              This is not an academic exercise. It is the physical reason why measured values have
              to be corrected before being compared against limits. A conductor tested cold in the
              morning will be substantially more resistive when it is carrying fault current and
              running hot — and the protective device has to operate under the hot condition, not
              the cold one.
            </p>
            <p>
              That correction is covered properly in the earth fault loop impedance work in Module
              4. What belongs here is the recognition that the correction factor exists because a
              coefficient is a gradient, and the resistance of copper genuinely does change with
              temperature at a known rate.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <ContentEyebrow>Exponential change</ContentEyebrow>

          <ConceptBlock
            title="When the rate depends on how much is left to change"
            plainEnglish="Fast at first, then slower and slower — or slow at first, then faster and faster. Either way the gradient is not constant."
            onSite="Recognise the shape and a lot of apparently unrelated equipment behaviour becomes predictable."
          >
            <p>
              Many physical processes change at a rate proportional to how much is left to change.
              That produces a characteristic curve, and once you recognise it you see it everywhere.
            </p>
            <p>
              A capacitor charging through a resistor is the standard example. At the instant the
              supply is applied the voltage difference across the resistor is at its largest, so
              current is at its highest and the capacitor charges quickly. As the capacitor voltage
              rises, the difference driving the current shrinks, the current falls, and charging
              slows. The gradient is steepest at the start and flattens towards the end.
            </p>
            <p>
              The time constant τ = R × C puts a number on it. After one time constant the capacitor
              has reached about 63.2 per cent of its final voltage; after two, about 86 per cent;
              after five it is above 99 per cent and is conventionally treated as fully charged.
            </p>
            <p>
              For a 10 kΩ resistor and a 100 µF capacitor, τ = 10 000 × 0.0001 = 1 second. Note how
              much that calculation depends on handling the prefixes correctly — kilo and micro have
              to be converted to base units before multiplying, and getting that wrong throws the
              answer out by orders of magnitude.
            </p>
            <p>
              The same exponential shape governs inductor current, capacitor discharge, thermal
              heating and cooling, and the absorption current that makes a long
              insulation-resistance test reading drift upward for the first minute. Different
              physics, same mathematics.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Exponential deterioration, and why waiting for a threshold is dangerous"
            plainEnglish="Some faults get worse faster the worse they get. A slow drift can turn into a rapid collapse."
            onSite="This is why the shape of a trend matters more than the number it is currently sitting at."
          >
            <p>
              Deterioration often accelerates. A small bearing defect creates a slight roughness,
              which creates additional dynamic loading, which accelerates the damage, which
              increases the roughness. The gradient grows as the damage grows.
            </p>
            <p>
              The practical consequence is stark. A vibration trend that took twelve months to climb
              from 2 to 4 mm/s may take only six weeks to go from 4 to 8. Anyone watching the level
              alone, waiting for it to cross a threshold, gets very little warning — because by the
              time it approaches the threshold it is moving fast.
            </p>
            <p>
              Watching the gradient instead gives a much earlier signal. The point at which the
              trend stops being flat and starts to rise is detectable long before any limit is
              approached, and that is the moment when planning an intervention is still cheap and
              convenient.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          <CommonMistake
            title="Judging condition on level alone and ignoring the gradient"
            whatHappens={
              <>
                <p>
                  Two motors both read 5 mm/s. Both sit below the action limit, so both are left
                  alone until the next scheduled survey. One of them fails three weeks later.
                </p>
                <p>
                  Machine A had been steady at 5 mm/s for a year. Machine B had climbed from 2 to 5
                  in two months — a gradient of 1.5 mm/s per month that nobody looked at, because
                  the number itself was inside limits.
                </p>
              </>
            }
            doInstead={
              <>
                <p>
                  Read level and gradient together. A stable reading below the limit is genuinely
                  reassuring; the same reading on a steep upward trend is a warning that the limit
                  will be crossed soon and possibly faster than linear projection suggests.
                </p>
                <p>
                  Where a trend has turned upward, shorten the monitoring interval rather than
                  waiting for the next scheduled survey. The whole value of condition monitoring is
                  the warning time it buys, and that warning is in the slope, not the level.
                </p>
              </>
            }
          />

          <ContentEyebrow>Gradient and the P-F interval</ContentEyebrow>

          <ConceptBlock
            title="The curve that decides your inspection interval"
            plainEnglish="P is where a fault first becomes detectable. F is where the equipment stops doing its job. The gap between them is your window."
            onSite="If you inspect less often than the P-F interval, you will sometimes miss the warning entirely."
          >
            <p>
              Reliability-centred maintenance describes deterioration with the P-F curve: equipment
              condition plotted against time, falling away as the item degrades. Point P is where a
              potential failure first becomes detectable by whatever technique you are using. Point
              F is functional failure — the item no longer does its job.
            </p>
            <p>
              The horizontal distance between them is the P-F interval, and it is the window within
              which you can detect the developing failure and act on it. The gradient of the curve
              between P and F is what determines how long that window is: a steep curve means rapid
              progression and a short interval, a shallow one means slow progression and a longer
              interval.
            </p>
            <p>
              This gives a direct rule for setting monitoring frequency. Inspections have to be more
              frequent than the P-F interval, or you will occasionally inspect just before P and
              again just after F, and see nothing wrong on either visit. Common practice is to
              monitor at somewhere around half the P-F interval so that at least one inspection
              falls inside the window.
            </p>
            <p>
              Notice that the detection technique changes the interval as well as the curve. A
              method that detects a fault earlier moves P further to the left, which lengthens the
              P-F interval and buys planning time. That is much of the argument for vibration
              analysis and thermography over waiting for audible or visible symptoms — not that they
              detect different faults, but that they detect the same faults sooner.
            </p>
          </ConceptBlock>

          <Scenario
            title="Two gearboxes, one budget, one shutdown window"
            situation={
              <>
                <p>
                  A plant has a single four-hour shutdown window next month and budget to change one
                  gearbox. Two are under watch, and both currently read 6.2 mm/s — just under the
                  7.1 mm/s action limit for that machine class.
                </p>
                <p>
                  Gearbox A: monthly readings over the last six months of 6.0, 6.1, 6.0, 6.2, 6.1,
                  6.2. Gearbox B: 3.1, 3.6, 4.2, 4.9, 5.5, 6.2.
                </p>
              </>
            }
            whatToDo={
              <>
                <p>
                  Take the gradient of each. Gearbox A has changed by 0.2 mm/s across six months — a
                  gradient of about 0.03 mm/s per month, which against normal scatter is
                  indistinguishable from flat. It is stable at an elevated but acceptable level.
                </p>
                <p>
                  Gearbox B has gone from 3.1 to 6.2, a change of 3.1 mm/s over five intervals — a
                  gradient of roughly 0.62 mm/s per month. Projecting that forward linearly, it
                  reaches the 7.1 mm/s action limit in about six weeks.
                </p>
                <p>
                  And linear projection is the optimistic case. The gaps between successive readings
                  are widening — 0.5, 0.6, 0.7, 0.6, 0.7 — which suggests the deterioration is at
                  least steady and possibly accelerating. Treat six weeks as the longest you have,
                  not the expected time.
                </p>
                <p>
                  Change gearbox B in the shutdown window. Keep A on monitoring, and shorten B-style
                  intervals on it if the trend ever moves.
                </p>
              </>
            }
            whyItMatters={
              <p>
                On level alone these two machines are identical and the choice between them would
                come down to guesswork or whichever engineer argued hardest. The gradient makes the
                decision obvious and defensible in one line: one machine is stable, the other will
                cross the action limit inside six weeks. That is the difference between a
                maintenance plan driven by data and one driven by opinion — and it is the single
                clearest argument for why this maths sits in an electrical maintenance qualification
                at all.
              </p>
            }
          />

          <ConceptBlock title="Building the evidence for your portfolio">
            <p>
              Rate-of-change work is some of the most persuasive evidence you can gather, because it
              shows you acting on analysis rather than on a threshold alarm.
            </p>
            <ul className="space-y-1.5">
              <li>
                Keep a trend chart you contributed readings to, with the gradient you calculated and
                the units stated.
              </li>
              <li>
                Record any occasion where you recommended shortening a monitoring interval because a
                trend had turned, and what happened next.
              </li>
              <li>
                Where you applied a temperature correction to a measured value, show the coefficient
                you used and the temperature difference it was applied over.
              </li>
              <li>
                Note any case where two items had similar readings but different trends, and how
                that changed the priority between them.
              </li>
              <li>
                Say explicitly what decision the gradient supported — monitor, plan, or intervene.
                The number is evidence; the decision is competence.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Gradient is rise over run, it is always a rate, and it always needs its units stated.',
              'Zero gradient means stable. An undefined (vertical) gradient usually means a step change or a bad reading.',
              'A curve has a different gradient at every point — measure it with a tangent, not across the whole span.',
              'A coefficient is a rate of change packaged as a constant. Look for the word "per".',
              'Copper resistance rises roughly 0.4 per cent per °C, which is why measured values need correcting before comparison.',
              'Time constant τ = R × C. One τ reaches about 63 per cent; five τ is treated as complete.',
              'Exponential deterioration accelerates, so waiting for a threshold gives very little warning.',
              'Level says where you are; gradient says where you are going. Identical readings can need opposite responses.',
              'The P-F gradient sets your window — monitor more often than the P-F interval or you will miss it.',
              'The sign of a gradient means nothing until you know which direction is good for that quantity.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Rates of change and elementary calculus knowledge check"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section6-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Statistics for Maintenance Data
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next module <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Electrical plant and equipment
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section6_4;
