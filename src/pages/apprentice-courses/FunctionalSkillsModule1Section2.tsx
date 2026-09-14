/**
 * Functional Skills · Module 1 · Section 2 — Units and measurement
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit and
 * rewritten around worked examples, same as Section 1.
 *
 * The old page's quiz was kept — its questions were already well chosen. Two
 * explanations were softened: one claimed a floor-area calculation mattered for
 * "adequate working clearance under BS 7671", and another attributed cable
 * tolerance to "BS EN standards" generically. BS 7671 Regulation 132.12 does
 * require adequate access and working space, but the RAG has nothing tying a
 * switchgear clearance figure to it, and no specific BS EN was named for the
 * tolerance — so neither is asserted here. On a Functional Skills page the
 * maths is the point; a half-remembered regulation attached to it is a liability
 * an apprentice carries onto site.
 *
 * Scale drawings appear briefly in Section 1 under ratio. This page is the
 * fuller treatment — take-offs, converting paper measurements to orderable
 * lengths — and says so rather than repeating it.
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

const TITLE = 'Units and Measurement - Functional Skills Module 1.2';
const DESCRIPTION =
  'Functional Skills maths for electricians: SI prefixes, electrical units, imperial conversion, area and volume, perimeter, scale drawings and tolerances — worked through on real site measurements.';

const quizQuestions = [
  {
    id: 1,
    question: 'How many milliamps (mA) are in 2.5 amperes?',
    options: ['25 mA', '2,500 mA', '250 mA', '25,000 mA'],
    correctAnswer: 1,
    explanation:
      'Milli means one thousandth, so there are 1,000 mA in 1 A. 2.5 × 1,000 = 2,500 mA. This is the conversion behind every RCD rating you will ever read — a 30 mA device trips at 0.03 A.',
  },
  {
    id: 2,
    question: 'A run measures 15 feet on an old drawing. What is that in metres?',
    options: ['5.00 m', '3.05 m', '4.57 m', '4.50 m'],
    correctAnswer: 2,
    explanation:
      '1 foot = 0.3048 m, so 15 × 0.3048 = 4.572 m, which rounds to 4.57 m. Older buildings and older drawings still carry imperial dimensions, so the conversion is worth knowing.',
  },
  {
    id: 3,
    question:
      'A distribution board cupboard measures 1.2 m wide and 0.6 m deep. What is its floor area?',
    options: ['0.72 m²', '1.80 m²', '0.18 m²', '3.60 m²'],
    correctAnswer: 0,
    explanation:
      'Area = length × width = 1.2 × 0.6 = 0.72 m². Note the unit changes to m² — two lengths multiplied always give a squared unit.',
  },
  {
    id: 4,
    question:
      'A cable tray runs around the perimeter of a plant room measuring 8 m × 5 m. What total length of tray is needed?',
    options: ['26 m', '13 m', '40 m', '20 m'],
    correctAnswer: 0,
    explanation:
      'Perimeter = 2 × (length + width) = 2 × (8 + 5) = 26 m. 13 m is the answer you get if you forget to double. Order extra for bends and fixings.',
  },
  {
    id: 5,
    question:
      'On a 1:50 scale drawing, a cable route measures 14 cm on paper. What is the actual run in metres?',
    options: ['70 m', '7 m', '700 m', '0.7 m'],
    correctAnswer: 1,
    explanation:
      '14 cm × 50 = 700 cm, and 700 ÷ 100 = 7 m. The commonest slip is stopping at 700 and reading it as metres — always finish the unit conversion.',
  },
  {
    id: 6,
    question:
      'A 2.5 mm² cable is manufactured to a tolerance of ±5%. What is the minimum acceptable cross-sectional area?',
    options: ['2.450 mm²', '2.250 mm²', '2.375 mm²', '2.350 mm²'],
    correctAnswer: 2,
    explanation:
      '5% of 2.5 = 0.125, so the minimum is 2.5 − 0.125 = 2.375 mm². A tolerance band is always the nominal value plus and minus the percentage.',
  },
  {
    id: 7,
    question:
      'An enclosure measures 0.4 m × 0.3 m × 0.25 m internally. What is its volume in litres?',
    options: ['3 litres', '300 litres', '0.03 litres', '30 litres'],
    correctAnswer: 3,
    explanation:
      'Volume = 0.4 × 0.3 × 0.25 = 0.03 m³. There are 1,000 litres in a cubic metre, so 0.03 × 1,000 = 30 litres.',
  },
  {
    id: 8,
    question:
      'A meter reads 231.4 V with a stated accuracy of ±0.5%. What is the range the true voltage could lie in?',
    options: [
      '230.0 V to 232.8 V',
      '230.3 V to 232.6 V',
      '229.7 V to 233.1 V',
      '230.2 V to 232.6 V',
    ],
    correctAnswer: 3,
    explanation:
      '0.5% of 231.4 = 1.157, which is 1.2 to one decimal place. So the range is 231.4 − 1.2 to 231.4 + 1.2, giving 230.2 V to 232.6 V.',
  },
];

const FunctionalSkillsModule1Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 2"
        title="Units and measurement"
        backTo="/study-centre/apprentice/functional-skills/module1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default. These pages are carrying worked
            calculations in a mono face, and a column sized for prose squeezes
            the working onto two lines where it should sit on one. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Getting a unit wrong is the most expensive mistake in this whole course, because the
            arithmetic still works. 2.5 and 2,500 are both plausible numbers — it is the prefix that
            decides whether you have an RCD rating or a main breaker. This section is about never
            being out by a factor of a thousand.
          </p>

          <LearningOutcomes
            outcomes={[
              'Use the SI prefixes milli, kilo, mega and micro, and convert between them in either direction.',
              'Name the units for voltage, current, resistance and power, and say what each one measures.',
              'Convert between imperial and metric lengths on older drawings.',
              'Calculate area and volume, and know why the unit gains a square or a cube.',
              'Work out a perimeter for a cable tray or trunking run, and add a sensible allowance.',
              'Read a scale drawing and turn a paper measurement into an orderable length.',
              'Apply a plus-or-minus tolerance to a nominal value and state the resulting range.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Decimals and place value',
                gist: 'Multiplying and dividing by 1,000 moves the decimal point three places. Everything here rests on it.',
                where: '1.1',
              },
              {
                term: 'Percentages',
                gist: 'Tolerance is just a percentage either side of a nominal figure.',
                where: '1.1',
              },
            ]}
          />

          <TLDR
            points={[
              'The prefixes go in steps of a thousand: micro, milli, unit, kilo, mega. Moving one step is three decimal places.',
              'Milli means a thousandth. 30 mA is 0.03 A — that is the RCD figure you will meet most often.',
              'Kilo means a thousand. 6 kW is 6,000 W.',
              'Two lengths multiplied give a squared unit; three give a cubed one. 1 m³ = 1,000 litres.',
              'Perimeter is 2 × (length + width) — the doubling is what people forget.',
              'A scale of 1:50 means multiply the paper measurement by 50, then convert to metres.',
              'Tolerance of ±5% means the value can sit anywhere in a band 5% either side of nominal.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · SI prefixes</ContentEyebrow>

          <ConceptBlock title="Everything moves in thousands">
            <p>
              The metric system is built so that each prefix is a thousand times the one below it.
              Learn the ladder once and you never have to memorise an individual conversion again:
            </p>
            <p>
              <strong>micro (µ)</strong> → <strong>milli (m)</strong> → <strong>unit</strong> →{' '}
              <strong>kilo (k)</strong> → <strong>mega (M)</strong>
            </p>
            <p>
              Each arrow is × 1,000 going right to left, or ÷ 1,000 going left to right. In decimal
              terms it is three places — which is exactly why a slip here is a factor of a thousand
              rather than a rounding error you might spot.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="How many milliamps are there in 2.5 A?"
            steps={[
              { calc: 'milli = one thousandth', note: 'So there are 1,000 mA in one amp.' },
              {
                calc: '2.5 × 1,000 = 2,500 mA',
                note: 'Going from a bigger unit to a smaller one, multiply.',
              },
            ]}
            answer="2,500 mA"
            watchOut="Ask yourself whether the number should get bigger or smaller. Going to a smaller unit means more of them, so the number goes up. If it went down, you divided when you should have multiplied."
          />

          <WorkedExample
            nonCalculator
            question="An RCD is rated 30 mA. What is that in amps?"
            steps={[
              { calc: '30 ÷ 1,000 = 0.03 A', note: 'Smaller unit to bigger unit, so divide.' },
            ]}
            answer="0.03 A"
            watchOut="Thirty thousandths of an amp is the current that will trip the device. Being out by a thousand here — reading 30 mA as 30 A — is the difference between a life-saving device and a main switch."
          />

          <TryIt
            nonCalculator
            question="A heater is rated 6 kW. What is that in watts?"
            steps={[{ calc: 'kilo = one thousand' }, { calc: '6 × 1,000 = 6,000 W' }]}
            answer="6,000 W"
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Electrical units</ContentEyebrow>

          <ConceptBlock title="Four units, and what each one is counting">
            <p>
              <strong>Volts (V)</strong> measure the push — the difference in electrical pressure
              between two points. <strong>Amperes (A)</strong> measure the flow — how much charge is
              moving past a point each second. <strong>Ohms (Ω)</strong> measure opposition to that
              flow. <strong>Watts (W)</strong> measure the rate of doing work.
            </p>
            <p>
              You will meet the relationships between them properly in the electrical course. For
              Functional Skills the important part is the units themselves and their prefixes,
              because that is what the questions test.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Which prefix goes with which unit">
            <p>
              In practice each unit has prefixes it is usually seen with, and recognising them saves
              you thinking:
            </p>
            <p>
              Current is usually plain amps or milliamps — 30 mA, 6 A, 32 A. Power is usually watts
              or kilowatts — 60 W, 3 kW, 9.5 kW. Resistance ranges widely, from a fraction of an ohm
              on a continuity test to megohms on an insulation test. Voltage is nearly always plain
              volts, occasionally kilovolts on distribution.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="A test sheet records four readings: an RCD tripping at 27 mA, a continuity reading of 0.42 Ω, an insulation resistance of 199 MΩ, and a load of 9.5 kW. Put all four into plain base units — amps, ohms and watts — with no prefixes."
            steps={[
              {
                calc: '27 mA → milli means a thousandth → 27 ÷ 1,000 = 0.027 A',
                note: 'Milli makes the number smaller, so you divide.',
              },
              {
                calc: '0.42 Ω is already in base units',
                note: 'No prefix, nothing to do. Worth saying out loud — people convert things that need no converting.',
              },
              {
                calc: '199 MΩ → mega means a million → 199 × 1,000,000 = 199,000,000 Ω',
                note: 'Mega makes it bigger, so you multiply.',
              },
              { calc: '9.5 kW → kilo means a thousand → 9.5 × 1,000 = 9,500 W' },
            ]}
            answer="0.027 A · 0.42 Ω · 199,000,000 Ω · 9,500 W"
            watchOut="The direction is the whole battle. Milli and micro make a number smaller so you divide; kilo and mega make it bigger so you multiply. If you ever get 27 mA coming out as 27,000 A, you have gone the wrong way — and a sanity check catches it instantly, because no RCD trips at twenty-seven thousand amps."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="Convert each to base units: a 100 mA residual current, a 2.5 kV test voltage, a 0.8 MΩ reading, and a 750 mW standby load."
            steps={[
              { calc: '100 mA = 100 ÷ 1,000 = 0.1 A' },
              { calc: '2.5 kV = 2.5 × 1,000 = 2,500 V' },
              { calc: '0.8 MΩ = 0.8 × 1,000,000 = 800,000 Ω' },
              { calc: '750 mW = 750 ÷ 1,000 = 0.75 W' },
            ]}
            answer="0.1 A · 2,500 V · 800,000 Ω · 0.75 W"
          />

          <InlineCheck
            question="An insulation resistance test reads 250 MΩ. How many ohms is that?"
            options={['250,000 Ω', '250,000,000 Ω', '2,500 Ω', '0.25 Ω']}
            correctIndex={1}
            explanation="Mega means a million, so 250 MΩ = 250 × 1,000,000 = 250,000,000 Ω. Insulation resistance is one of the few places you will routinely meet megohms."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A continuity test reads 0.42 Ω. Express that in milliohms."
            steps={[
              { calc: 'milli = one thousandth', note: 'Bigger unit to smaller, so multiply.' },
              { calc: '0.42 × 1,000 = 420 mΩ' },
            ]}
            answer="420 mΩ"
          />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Imperial and metric</ContentEyebrow>

          <ConceptBlock title="Older buildings still speak imperial">
            <p>
              Drawings for anything built before the 1970s, and plenty after, carry feet and inches.
              You only need a handful of conversions:
            </p>
            <p>
              1 inch = 25.4 mm. 1 foot = 0.3048 m. 1 yard = 0.9144 m. For a quick mental estimate, a
              foot is roughly 0.3 m and a metre is roughly three and a quarter feet.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A run measures 15 feet on an old drawing. How long is it in metres?"
            steps={[
              { calc: 'Estimate: 15 × 0.3 = 4.5 m', note: 'Rough check first.' },
              { calc: '15 × 0.3048 = 4.572 m' },
              { calc: 'Round to 4.57 m', note: 'Two decimal places is plenty for a cable run.' },
            ]}
            answer="4.57 m"
            watchOut="The estimate and the answer agree, which is the point of doing the estimate. If you had multiplied by 3.048 you would have got 45.7 m and the estimate would have caught it."
          />

          <SectionRule />

          <TryIt
            question="A conduit drop is marked 3 ft 6 in. How long is it in millimetres?"
            steps={[
              { calc: '3 ft = 3 × 304.8 = 914.4 mm', note: '1 ft = 304.8 mm.' },
              { calc: '6 in = 6 × 25.4 = 152.4 mm' },
              {
                calc: '914.4 + 152.4 = 1,066.8 mm',
                note: 'Just over a metre — worth sense-checking.',
              },
            ]}
            answer="1,066.8 mm"
          />

          <TryIt
            nonCalculator
            question="An older drawing gives a room as 12 ft by 9 ft, and a ceiling height of 8 ft. You need the floor area in square metres to work out the lighting. Use 1 ft = 0.305 m."
            steps={[
              { calc: '12 ft × 0.305 = 3.66 m' },
              { calc: '9 ft × 0.305 = 2.745 m, call it 2.75 m' },
              { calc: '3.66 × 2.75 = 10.065 m²' },
            ]}
            answer="About 10.1 m². Convert each length FIRST, then multiply. Converting the area directly needs the conversion squared, and that is where people go wrong."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Area and volume</ContentEyebrow>

          <ConceptBlock title="The unit tells you how many lengths you multiplied">
            <p>
              Multiply two lengths and you get an area, measured in square units — m², mm². Multiply
              three and you get a volume, in cubic units — m³. The little number is not decoration;
              it is a count of how many dimensions went into it.
            </p>
            <p>
              This is why a cable is described in <strong>mm²</strong>: it is the cross-sectional
              area of the conductor, an area you would see if you cut it through. And it is why a
              volume in m³ converts to litres by multiplying by 1,000 — there are a thousand litres
              in a cubic metre.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A distribution board cupboard is 1.2 m wide and 0.6 m deep. What floor area does it take up?"
            steps={[
              { calc: 'Area = length × width' },
              { calc: '1.2 × 0.6 = 0.72', note: 'Two lengths multiplied.' },
              { calc: 'Unit becomes m²' },
            ]}
            answer="0.72 m²"
          />

          <WorkedExample
            question="An enclosure measures 0.4 m × 0.3 m × 0.25 m inside. What is its volume in litres?"
            steps={[
              { calc: '0.4 × 0.3 = 0.12 m²', note: 'Two dimensions first.' },
              { calc: '0.12 × 0.25 = 0.03 m³', note: 'Third dimension gives volume.' },
              { calc: '0.03 × 1,000 = 30 litres', note: '1 m³ = 1,000 litres.' },
            ]}
            answer="30 litres"
            watchOut="Dividing by 1,000 instead of multiplying gives 0.00003 litres — a number so absurd it is easy to catch. The dangerous errors are the plausible ones, which is why estimating matters more than checking."
          />

          <TryIt
            question="A trunking lid measures 3 m by 100 mm. What is its area in m²?"
            steps={[
              { calc: '100 mm = 0.1 m', note: 'Get both measurements into the same unit first.' },
              { calc: '3 × 0.1 = 0.3 m²' },
            ]}
            answer="0.3 m²"
          />

          <CommonMistake
            title="Multiplying measurements in different units"
            whatHappens={
              <p>
                You have 3 m and 100 mm and multiply them straight: 3 × 100 = 300. Three hundred of
                what? The answer is meaningless, and it is out by a factor of a thousand from the
                real figure.
              </p>
            }
            doInstead={
              <p>
                Convert everything to one unit before you multiply anything. Metres are usually the
                right choice for building dimensions; millimetres for anything inside an enclosure.
                Pick one and put every measurement into it first.
              </p>
            }
          />

          <SectionRule />

          <TryIt
            question="A plant room floor is 7.5 m by 4.2 m. What is its area, to one decimal place?"
            steps={[
              { calc: 'Estimate: 7 × 4 = 28 m²', note: 'Rough check first.' },
              { calc: '7.5 × 4.2 = 31.5 m²', note: 'Close to the estimate, so it holds.' },
            ]}
            answer="31.5 m²"
          />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Perimeter and cable runs</ContentEyebrow>

          <ConceptBlock title="Round the outside, and do not forget the doubling">
            <p>
              A perimeter is the distance all the way round. For a rectangle it is{' '}
              <strong>2 × (length + width)</strong> — and the doubling is the step people miss,
              because adding the length and the width feels like it should be the answer.
            </p>
            <p>
              On site a perimeter is what you order tray, trunking or dado by. Always add an
              allowance on top: bends eat length, and a run that measures exactly on the drawing
              never measures exactly on the wall.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="Cable tray runs around the perimeter of a plant room 8 m × 5 m. How much tray do you need?"
            steps={[
              { calc: '8 + 5 = 13 m', note: 'One length and one width.' },
              { calc: '2 × 13 = 26 m', note: 'There are two of each.' },
            ]}
            answer="26 m"
            watchOut="13 m is always one of the options, because stopping after the addition is the standard error. Picture walking round the room — you cover four walls, not two."
          />

          <TryIt
            nonCalculator
            question="Dado trunking runs round an office 6 m × 4 m, but a 2 m doorway needs no trunking. How much do you order?"
            steps={[
              { calc: '6 + 4 = 10' },
              { calc: '2 × 10 = 20 m', note: 'Full perimeter.' },
              { calc: '20 − 2 = 18 m', note: 'Take out the doorway.' },
            ]}
            answer="18 m"
          />

          <SectionRule />

          <WorkedExample
            nonCalculator
            question="Trunking runs around three walls of a room 5.2m × 3.8m, skipping the wall with the door. Add 10% for cutting waste, then work out how many 3m lengths to order."
            steps={[
              {
                calc: '5.2 + 3.8 + 5.2 = 14.2 m',
                note: 'Three walls: two long-and-short pairs share a corner, so it is long + short + long.',
              },
              {
                calc: '14.2 × 1.10 = 15.62 m',
                note: 'The 10% allowance. Adding 10% means multiplying by 1.10.',
              },
              { calc: '15.62 ÷ 3 = 5.21 lengths' },
              { calc: 'Round UP to 6', note: 'You cannot buy 0.21 of a length.' },
            ]}
            answer="6 × 3m lengths"
            watchOut="Two traps here and both cost money. Rounding 5.21 down to 5 leaves you 0.6m short on the last wall. And taking the full perimeter — all four walls, 18m — orders a length you do not need, because the door wall carries no trunking."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="Cable tray runs the full perimeter of a plant room 7.5m × 4.2m. Allow 8% for waste and offcuts. Tray comes in 2.4m lengths. How many do you order?"
            steps={[
              { calc: 'Perimeter = 2 × (7.5 + 4.2) = 2 × 11.7 = 23.4 m' },
              { calc: '23.4 × 1.08 = 25.272 m' },
              { calc: '25.272 ÷ 2.4 = 10.53 lengths' },
              { calc: 'Round up to 11' },
            ]}
            answer="11 × 2.4m lengths"
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Scale drawings</ContentEyebrow>

          <ConceptBlock title="From paper to an order, in two steps">
            <p>
              Section 1 introduced scale under ratio. This is the working version: taking a
              measurement off a drawing and turning it into a length you can order.
            </p>
            <p>
              A scale of <strong>1:50</strong> means one unit on paper is fifty of the same unit in
              the building. Measure in centimetres, multiply by the scale, and you have centimetres
              in real life — then divide by 100 for metres. The second step is the one that gets
              skipped.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="On a 1:50 drawing a cable route measures 14 cm. How long is the run?"
            steps={[
              { calc: '14 × 50 = 700 cm', note: 'Paper measurement × scale.' },
              { calc: '700 ÷ 100 = 7 m', note: 'Centimetres to metres.' },
            ]}
            answer="7 m"
            watchOut="700 m is the trap answer — it comes from doing the multiplication and reading the result as metres. A 700 m run inside a building should feel wrong before you check the maths."
          />

          <InlineCheck
            question="On a 1:100 drawing, a corridor measures 9.5 cm. How long is it?"
            options={['9.5 m', '95 m', '0.95 m', '950 m']}
            correctIndex={0}
            explanation="9.5 × 100 = 950 cm, and 950 ÷ 100 = 9.5 m. At 1:100 the centimetres on paper happen to read straight off as metres — a useful shortcut, but only at that one scale."
          />

          <SectionRule />

          <TryIt
            question="On a 1:20 detail drawing, an enclosure measures 45 mm wide. How wide is it in reality?"
            steps={[
              { calc: '45 × 20 = 900 mm', note: 'Paper measurement × scale.' },
              {
                calc: '900 ÷ 1,000 = 0.9 m',
                note: 'Millimetres to metres this time — the drawing was in mm.',
              },
            ]}
            answer="900 mm (0.9 m)"
          />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Tolerance and accuracy</ContentEyebrow>

          <ConceptBlock title="Nothing is exactly what it says on the label">
            <p>
              A manufactured item is made to a nominal value with a stated tolerance either side of
              it. A tolerance of <strong>±5%</strong> on a 2.5 mm² cable means the actual conductor
              can be anywhere from 5% below to 5% above 2.5 mm² and still be within spec.
            </p>
            <p>
              The same idea applies to your test instruments. A meter quoting ±0.5% is telling you
              that the true value lies in a band around whatever it displays — which is why two
              meters on the same circuit can disagree slightly and both be right.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 2.5 mm² cable has a tolerance of ±5%. What is the smallest cross-sectional area it could legitimately have?"
            steps={[
              { calc: '5% = 0.05' },
              { calc: '0.05 × 2.5 = 0.125 mm²', note: 'The size of the tolerance band, one side.' },
              { calc: '2.5 − 0.125 = 2.375 mm²', note: 'Minimum. The maximum would be 2.625.' },
            ]}
            answer="2.375 mm²"
          />

          <WorkedExample
            question="A meter reads 231.4 V and quotes ±0.5% accuracy. What range could the true voltage be in?"
            steps={[
              { calc: '0.5% = 0.005' },
              { calc: '0.005 × 231.4 = 1.157', note: 'Round to 1.2 V.' },
              { calc: '231.4 − 1.2 = 230.2 V', note: 'Bottom of the range.' },
              { calc: '231.4 + 1.2 = 232.6 V', note: 'Top of the range.' },
            ]}
            answer="230.2 V to 232.6 V"
            watchOut="A tolerance is applied both ways from the reading, not just downwards. Halving it because it is written with a plus-or-minus sign is a common error."
          />

          <SectionRule />

          <CommonMistake
            title="Treating a tolerance as a one-way allowance"
            whatHappens={
              <p>
                A question gives ±2% and you work out the 2% but only subtract it, quoting a single
                figure as &ldquo;the answer&rdquo;. Half the range is missing, and if the question
                asked for a range you have answered a different question.
              </p>
            }
            doInstead={
              <p>
                Work out the size of the band once, then apply it both ways and quote both ends.
                Read the question carefully too — some ask only for the minimum, some for the
                maximum, some for the full range.
              </p>
            }
          />

          <WorkedExample
            nonCalculator
            question="A cable is specified as 2.5mm² with a manufacturing tolerance of ±5% on cross-sectional area. What is the acceptable range, and would a measured 2.30mm² pass?"
            steps={[
              {
                calc: '5% of 2.5 = 2.5 × 0.05 = 0.125 mm²',
                note: 'Find the tolerance band as an actual quantity before you do anything with it.',
              },
              { calc: 'Upper limit = 2.5 + 0.125 = 2.625 mm²' },
              { calc: 'Lower limit = 2.5 − 0.125 = 2.375 mm²' },
              {
                calc: '2.30 is below 2.375',
                note: 'Outside the band, and on the dangerous side — less copper than specified.',
              },
            ]}
            answer="Acceptable range 2.375 to 2.625 mm². A measured 2.30mm² fails."
            watchOut="A tolerance is always two limits, not one. Working out only the upper figure and comparing against it tells you nothing about the far more important question of whether the cable is undersized."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A 230V supply has a statutory tolerance of +10% / −6%. What are the highest and lowest voltages you should expect to measure?"
            steps={[
              { calc: 'Upper: 10% of 230 = 23, so 230 + 23 = 253 V' },
              { calc: 'Lower: 6% of 230 = 13.8, so 230 − 13.8 = 216.2 V' },
            ]}
            answer="216.2 V to 253 V. Note the band is not symmetrical — the allowance upwards is larger than the allowance downwards, so you cannot just take one percentage and apply it both ways."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Putting it together</ContentEyebrow>

          <Scenario
            title="Taking off a plant room from a drawing"
            situation={
              <p>
                You are given a 1:50 plan of a plant room. It measures 16 cm by 10 cm on paper. You
                need tray around the full perimeter, less a 1.5 m doorway, plus 10% for bends and
                waste. Tray comes in 3 m lengths.
              </p>
            }
            whatToDo={
              <div className="space-y-2">
                <p>
                  Get the real dimensions first. 16 × 50 = 800 cm = 8 m, and 10 × 50 = 500 cm = 5 m.
                  So the room is 8 m by 5 m.
                </p>
                <p>
                  Perimeter: 2 × (8 + 5) = 26 m. Take off the doorway: 26 − 1.5 = 24.5 m. Add 10%:
                  0.1 × 24.5 = 2.45, so 24.5 + 2.45 = 26.95 m.
                </p>
                <p>
                  Now into orderable lengths: 26.95 ÷ 3 = 8.98, so you need 9 lengths. Round up —
                  eight lengths gives you 24 m and leaves you short.
                </p>
              </div>
            }
            whyItMatters={
              <p>
                Scale, perimeter, percentage and rounding direction, all in one take-off. And the
                last step is the one that decides whether you make a second trip to the wholesaler:
                the maths says 8.98, the job says 9.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Convert each length to metres BEFORE multiplying for an area — converting an area directly needs the conversion squared.',
              'A tolerance is two limits, not one. The lower limit is usually the one that matters.',
              'The 230 V supply tolerance is not symmetrical: +10% / −6%, so 216.2 V to 253 V.',
              'The prefix ladder goes micro, milli, unit, kilo, mega — each step is a factor of a thousand, or three decimal places.',
              'Going to a smaller unit means a bigger number. Check the direction before you multiply or divide.',
              '30 mA is 0.03 A. That single conversion turns up more than any other in electrical work.',
              'Two lengths multiplied give a squared unit, three give a cubed one. 1 m³ = 1,000 litres.',
              'Convert every measurement to the same unit before multiplying anything.',
              'Perimeter is 2 × (length + width). The doubling is what gets forgotten.',
              'Scale: multiply the paper measurement by the scale, then convert the unit. Both steps, every time.',
              'A ±tolerance applies in both directions from the nominal value.',
            ]}
          />

          <SectionRule />

          <FAQ
            items={[
              {
                question: 'Do I have to remember the imperial conversions exactly?',
                answer: (
                  <p>
                    Conversion factors are normally given to you in the question or on a formula
                    sheet. What you need is to know which way round to apply them — and a rough
                    mental version (a foot is about 0.3 m) so you can sense-check the answer.
                  </p>
                ),
              },
              {
                question: 'Why is cable sized in mm² and not in diameter?',
                answer: (
                  <p>
                    Because what matters electrically is how much conductor there is for the current
                    to flow through, and that is the cross-sectional area. Two conductors of the
                    same diameter can differ in area if one is stranded and the other solid — the
                    area is the honest figure.
                  </p>
                ),
              },
              {
                question: 'How much should I add for waste on a take-off?',
                answer: (
                  <p>
                    It depends on the job and on how many bends and obstructions there are — 10% is
                    a common working allowance for a straightforward run, more for anything
                    complicated. The exam will tell you what percentage to use; site experience
                    tells you the rest.
                  </p>
                ),
              },
              {
                question: 'My meter and the tutor’s disagree slightly. Is one of them broken?',
                answer: (
                  <p>
                    Probably not. Both instruments have a stated accuracy, so each is reporting a
                    band rather than a point. If the two bands overlap, the readings are consistent
                    with each other and there is nothing to fix.
                  </p>
                ),
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Check yourself</ContentEyebrow>
          <p className="text-[13px] leading-relaxed text-white">
            Eight questions across prefixes, conversion, area, perimeter, scale and tolerance. Watch
            for the options that are out by a factor of ten or a thousand — they are there
            deliberately.
          </p>
          <Quiz questions={quizQuestions} />

          <SectionRule />

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module1/section1')
              }
              className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 truncate text-[14px] font-semibold text-white">
                Number and arithmetic
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module1/section3')
              }
              className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
            >
              <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 truncate text-right text-[14px] font-semibold text-white">
                Algebra and formulae
              </div>
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule1Section2;
