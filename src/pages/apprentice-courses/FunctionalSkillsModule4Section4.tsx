/**
 * Functional Skills · Module 4 · Section 4 — Geometry and spatial skills
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit. This
 * is the last section in Module 4, so the forward navigation button below
 * goes back to the module overview rather than to a Module 5 that this
 * module's structure does not define — labelled "Module 4", not "Continue".
 *
 * DENSITY PASS: the old page ran eight cards, each with one worked example
 * bolted on near the end and no try-it anywhere. This pass rebuilt it as
 * eight ContentEyebrow sections, each with one substantial ConceptBlock
 * followed immediately by the worked examples that apply it and a TryIt that
 * makes the learner do it themselves — the ordering the course now requires
 * throughout. It is a pure-maths page, so the "worked examples" are genuinely
 * worked calculations rather than a process with prose steps; the technique
 * being taught is what changes column to column.
 *
 * 🔴 CORRECTED DATA CARRIED FORWARD FROM THE PRIOR AUDIT — DO NOT REVERT:
 *  - Trunking internal CSA is NOT width × height. A "75 × 75" trunking has an
 *    internal area of 4,400mm², not 5,625; "100 × 100" is 7,900mm², not
 *    10,000; "100 × 50" is 3,900mm², not 5,000. The walls cost roughly a
 *    quarter of the space. Source: src/lib/calculators/bs7671-data/
 *    trunkingData.ts. This is the single most important correction on the
 *    page and it is taught explicitly, not just used quietly in the sums.
 *  - Cable overall CSA (the space a cable physically occupies, not its
 *    conductor size): 1.5mm² T&E = 56.7mm², 2.5 = 80.3mm², 4.0 = 106.3mm²,
 *    6.0 = 137.8mm², 10.0 = 201.3mm². Source: trunkingData.ts twinAndEarth.
 *    These were previously around 3.4× too small on this page and are now
 *    correct throughout.
 *  - The 45% space factor is IET On-Site Guide guidance, not a BS 7671
 *    requirement — BS 7671 publishes no trunking dimensions and no space
 *    factor at all. Quiz Q5 asks precisely this and the CommonMistake in
 *    Section 02 addresses the regulation number (522.8.1) that gets wrongly
 *    cited for it: that regulation concerns avoiding damage to cable sheath
 *    and insulation, and says nothing about fill capacity.
 *  - Conduit is not sized with a percentage at all — the On-Site Guide uses a
 *    cable-factor / conduit-factor method instead. This is taught as a
 *    concept only; no specific factor-table values are given, because none
 *    were supplied to check against and inventing them is not acceptable.
 *  - Quiz Q2, InlineCheck geom-check-1, and the 75×75 worked example in
 *    Section 02 all carry the corrected figures unchanged, including the
 *    22%-of-trunking vs 50%-of-allowance distinction and the 36.6%-vs-16.5%
 *    distinction. Quiz bank and all three InlineChecks (ids unchanged) are
 *    otherwise verbatim from the prior version.
 *
 * Two further accuracy corrections made in this pass:
 *  - The lux table previously carried a "Domestic living rooms" row under a
 *    "BS EN 12464-1" heading. BS EN 12464-1 is scoped to indoor workplaces;
 *    a domestic living room is not a workplace and is outside that standard.
 *    The row has been removed from the cited table rather than left there
 *    under a citation it does not belong to.
 *  - The "air changes per hour" table previously cited "Building Regs" (and
 *    the file header called it "Approved Document F") across all five rows.
 *    Only the three domestic, l/s figures — bathroom, kitchen, WC — are
 *    genuinely Approved Document F, Volume 1 (dwellings) extract rates. The
 *    office and server-room air-changes-per-hour figures are common design
 *    allowances used across the industry, not drawn from that document, and
 *    are now presented separately and labelled as such rather than under the
 *    same citation.
 *
 * No new BS 7671 regulation or table number has been added anywhere on this
 * page. <RegsCallout> is not used: this page paraphrases throughout, and
 * promoting a paraphrase into a clause field is exactly how a fabricated
 * BS 7671 quote shipped once before.
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

const TITLE = 'Geometry & Spatial Skills - Functional Skills Module 4.4';
const DESCRIPTION =
  'Functional Skills maths for electricians: conduit bending arc length and gain, real trunking internal CSA and the 45% space factor, containment quantity takeoffs, trigonometry for conduit offsets, Pythagoras for cable routes, the lumen method for lighting, and room volume for ventilation sizing.';

const quizQuestions = [
  {
    id: 1,
    question:
      'You need to bend a 90° set in 20mm conduit. The bending radius is 100mm. What is the arc length of the bend?',
    options: ['157mm', '100mm', '200mm', '314mm'],
    correctAnswer: 0,
    explanation:
      'Arc length = 2πr × (θ/360) = 2 × 3.14159 × 100 × (90/360) = 628.3 × 0.25 = 157mm. This is the length of conduit that forms the curved section of the bend.',
  },
  {
    id: 2,
    question:
      'A 100mm × 100mm PVC trunking has an internal cross-sectional area of 7,900mm². Working to the usual 45% space factor, how many 2.5mm² flat twin and earth cables (80.3mm² each) will it take?',
    options: ['44', '56', '98', '150'],
    correctAnswer: 0,
    explanation:
      'Usable space = 7,900 × 0.45 = 3,555mm². Number of cables = 3,555 / 80.3 = 44 cables. Every wrong answer here is a real mistake someone makes: 56 comes from using 100 × 100 = 10,000mm² as the area, but that is the OUTSIDE of the trunking — the walls take up around a quarter of it, and the figure you need is the internal area from the manufacturer. 98 is what you get if you use the right area but forget the space factor. 150 uses both errors at once.',
  },
  {
    id: 3,
    question:
      'A cable needs to run from one corner of a room to the diagonally opposite corner. The room is 4m × 3m. What is the diagonal distance?',
    options: ['3.5m', '7m', '12m', '5m'],
    correctAnswer: 3,
    explanation:
      'Using Pythagoras: c = √(a² + b²) = √(4² + 3²) = √(16 + 9) = √25 = 5m. This is the classic 3-4-5 right triangle.',
  },
  {
    id: 4,
    question:
      'A room is 6m × 4m and requires 300 lux of illumination. Each LED panel provides 3,000 lumens. The utilisation factor is 0.6 and maintenance factor is 0.8. How many panels are needed?',
    options: ['3', '5', '8', '15'],
    correctAnswer: 1,
    explanation:
      'Total lumens needed = (E × A) / (UF × MF) = (300 × 24) / (0.6 × 0.8) = 7,200 / 0.48 = 15,000 lumens. Number of panels = 15,000 / 3,000 = 5 panels.',
  },
  {
    id: 5,
    question:
      'You are told to work to a 45% space factor when filling trunking. Where does that figure actually come from?',
    options: [
      'It is a requirement of BS 7671, given in Chapter 52',
      'It is IET guidance — the On-Site Guide — not a requirement of BS 7671',
      'It is set by the Health and Safety at Work Act',
      'It is a manufacturer preference with no published basis',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 publishes no trunking dimensions and no space factor at all. The 45% convention comes from IET guidance in the On-Site Guide. That distinction matters: it is well-established good practice you should follow, but it is not a regulation you can be found in breach of, and knowing which of the two you are quoting is part of being able to defend your work. Be wary of anyone who cites a regulation number for it.',
  },
  {
    id: 6,
    question:
      'You need to calculate the offset for a conduit bend to clear an obstacle 150mm deep. Using a 45° bend set, what is the travel (distance between bends)?',
    options: ['106mm', '212mm', '150mm', '300mm'],
    correctAnswer: 1,
    explanation:
      'For a 45° offset, travel = offset / sin(45°) = 150 / 0.707 = 212mm. Alternatively, travel = offset × √2 = 150 × 1.414 = 212mm. The conduit bends 45°, runs 212mm, then bends back 45°.',
  },
  {
    id: 7,
    question:
      'A server room is 5m × 4m × 3m high. Building regulations require 10 air changes per hour. What is the required ventilation rate in m³/hr?',
    options: ['120 m³/hr', '200 m³/hr', '6,000 m³/hr', '600 m³/hr'],
    correctAnswer: 3,
    explanation:
      'Volume = 5 × 4 × 3 = 60m³. Ventilation rate = volume × air changes = 60 × 10 = 600 m³/hr. This determines the size of extraction fan required.',
  },
  {
    id: 8,
    question:
      'A cable tray rises from 2m height to 4m height over a horizontal distance of 6m. What is the actual length of cable tray needed?',
    options: ['6.32m', '7.21m', '6m', '8m'],
    correctAnswer: 0,
    explanation:
      'Using Pythagoras: rise = 4 – 2 = 2m, run = 6m. Length = √(2² + 6²) = √(4 + 36) = √40 = 6.32m. Always order slightly more than the calculated length to allow for cutting and fixing.',
  },
];

const FunctionalSkillsModule4Section4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4"
        title="Geometry and spatial skills"
        backTo="/study-centre/apprentice/functional-skills/module4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — this
            section carries formulae, tables and multi-line workings that read
            badly when they wrap. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Every trade has a point where the maths stops being an exercise and starts being the
            thing standing between you and a job that fits. A bend cut to the wrong arc length is
            conduit you throw away. A trunking sized off the number printed on the box instead of
            its real internal area is a run you cannot legally fill the way you planned. A
            ventilation rate calculated from the wrong figure is a fan that never clears the room it
            was fitted for. None of this is academic geometry — it is the arithmetic that turns a
            drawing into a materials list and a materials list into a job that works first time.
          </p>

          <LearningOutcomes
            outcomes={[
              'Calculate the arc length and the gain of a conduit bend, and explain why gain matters when you mark and cut the conduit.',
              "Find a trunking size's true internal cross-sectional area from manufacturer data rather than its printed name, and check a cable fill against the 45% guideline correctly.",
              'State where the 45% trunking space factor actually comes from, and explain why conduit is sized by a different method entirely.',
              "Read a drawing scale accurately and turn a room's dimensions into a containment quantity takeoff, waste allowance included.",
              'Use sine, cosine and tangent to calculate the travel of a conduit offset around an obstacle.',
              "Use Pythagoras' theorem to find the true length of a diagonal cable, tray or conduit run, and to check whether a corner is genuinely square.",
              'Apply the lumen method to calculate how many luminaires a room needs for a target lux level.',
              "Calculate a room's volume and the extraction rate needed to meet a stated number of air changes per hour, and convert between m³/hr and l/s.",
              'Combine two of these techniques on a single containment run, the way they actually turn up together on a real job.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Module 1 — percentages and ratios',
                gist: 'Space factors, waste allowances and unit conversions are all percentages or ratios of something. The arithmetic itself should not be new, only the electrical context it sits in.',
              },
              {
                term: 'A calculator with √ and sin/cos/tan keys',
                gist: 'Several worked examples on this page use square roots and trigonometric functions directly. You do not need to be fast with them, but you need to know where the keys are and what mode (degrees) they are set to.',
              },
            ]}
          />

          <TLDR
            points={[
              'Arc length = 2πr × (θ/360). The "gain" of a bend (2r − arc length) is the amount shorter the conduit ends up than two straight pieces plus a right-angle joint — ignore it and your conduit runs long.',
              "A trunking's internal cross-sectional area is NOT its printed width × height: 75 × 75 is 4,400mm² inside, not 5,625; 100 × 100 is 7,900mm², not 10,000; 100 × 50 is 3,900mm², not 5,000. The walls cost roughly a quarter of the space.",
              'The usual working rule is to fill trunking to no more than 45% of its real internal CSA. That 45% is IET guidance from the On-Site Guide — BS 7671 sets no trunking dimensions and no space factor at all.',
              'Conduit is not sized with a percentage. The On-Site Guide gives it a cable-factor / conduit-factor method instead — a different calculation, not the same rule at a different number.',
              'Cable overall CSA — the space it physically takes up, not its conductor size — is 56.7mm² for 1.5mm² T&E, 80.3mm² for 2.5mm², 106.3mm² for 4.0mm², 137.8mm² for 6.0mm², and 201.3mm² for 10.0mm².',
              'A scale drawing turns a small measured line into a real distance: multiply by the scale factor (a line measured at 1:50 is 50 times longer in reality). Always check the scale against one known dimension before trusting anything else on the drawing.',
              'For a conduit offset, travel = offset ÷ sin(θ). A shallower bend angle gives a neater, longer offset; a steeper one is shorter but harder to pull cable through.',
              'Pythagoras — c = √(a² + b²) — gives the true length of any diagonal run, and run in reverse (comparing the measured diagonal to the expected one) it tells you whether a corner is actually square.',
              'The lumen method — N = (E × A) / (F × UF × MF) — turns a target lux level and a room area into a luminaire count. UF and MF both depend on the actual room and fitting, not a number remembered from another job.',
              'Fan capacity = volume × air changes per hour. Only the domestic bathroom, kitchen and WC l/s figures on this page come from Approved Document F; the office and server-room air-change figures are common design practice, not that document.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Conduit Bending Angles</ContentEyebrow>

          <ConceptBlock
            title="Arc length and gain: what a bend actually costs you in metal"
            onSite="Mark your bend points carefully before you touch the bending spring or machine. A bend placed wrong cannot be nudged back into position — you start again with a new piece of conduit."
          >
            <p>
              Every bend you put in conduit has a radius, an angle, and an arc length, and the three
              are related by one formula:
            </p>
            <p className="text-center font-mono text-[15px] text-white">
              Arc length = 2πr × (θ / 360)
            </p>
            <p>
              where r is the bending radius and θ is the bend angle in degrees. The arc length is
              the amount of straight conduit that gets "used up" forming the curve — it is not the
              same as the radius, and it is not the same as the straight-line distance between the
              two ends of the bend.
            </p>
            <p>
              Trade practice sizes the bending radius to the conduit, roughly: 20mm conduit takes a
              75–100mm radius, 25mm takes 100–125mm, and 32mm takes 125–150mm. Bend too tightly for
              the conduit's diameter and you risk kinking it, which makes drawing cables through
              afterwards close to impossible.
            </p>
            <p>
              The second thing the formula gives you is <strong className="text-white">gain</strong>{' '}
              (sometimes called shrinkage): the difference between two straight lengths of conduit
              joined by a right-angle elbow, and the same run formed as one continuous bend. Because
              the bend cuts the corner rather than going round it, the bent conduit is always
              shorter than the two straight pieces would have been. Gain = 2r − arc length. Ignore
              it, and every bent run you cut comes out longer than the space you are fitting it
              into.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Bend 20mm conduit through 90° using a bending radius of 100mm. What is the arc length?"
            steps={[
              { calc: 'Arc = 2πr × (θ/360)', note: 'r = 100mm, θ = 90°.' },
              { calc: 'Arc = 2 × 3.14159 × 100 × (90/360)', note: 'θ/360 = 90/360 = 0.25.' },
              { calc: 'Arc = 628.3 × 0.25', note: '2 × 3.14159 × 100 = 628.3.' },
              {
                calc: 'Arc = 157mm',
                note: 'This is the length of conduit "used up" forming the curved section.',
              },
            ]}
            answer="157mm."
            watchOut="This is exactly Quiz Q1 — memorise the shape of the formula, not the answer, because the next job will hand you a different radius and angle."
          />

          <WorkedExample
            question="For the same 90° bend (r = 100mm, arc = 157mm), what is the gain, and what does it mean for how long you cut the conduit?"
            steps={[
              {
                calc: 'Gain = 2r − arc',
                note: '2r is the length of two straight pieces meeting at a sharp right angle.',
              },
              {
                calc: 'Gain = 2(100) − 157 = 200 − 157',
                note: 'Subtract the actual bent length from the two straight lengths it replaces.',
              },
              {
                calc: 'Gain = 43mm',
                note: 'The bent conduit is 43mm shorter than the sum of the two straight runs either side of it.',
              },
            ]}
            answer="43mm. If you measured your two straight runs first and simply added a 90° bend between them without accounting for gain, the finished conduit would be 43mm too long."
            watchOut="Gain grows with the bending radius. A gentler bend on wider conduit costs you more gain, not less — check the gain for the actual radius you are using rather than assuming a figure from a smaller size."
          />

          <TryIt
            question="Bend 25mm conduit through 90° using a bending radius of 125mm. What is the arc length, and what is the gain?"
            steps={[
              {
                calc: 'Arc = 2 × 3.14159 × 125 × (90/360)',
                note: 'θ/360 = 0.25 again, since the angle is still 90°.',
              },
              {
                calc: 'Arc = 785.4 × 0.25 = 196.3mm',
                note: 'A wider radius on the same 90° angle gives a longer arc.',
              },
              {
                calc: 'Gain = 2(125) − 196.3 = 250 − 196.3',
                note: 'Two straight 125mm lengths minus the actual bent length.',
              },
            ]}
            answer="Arc length ≈ 196mm, gain ≈ 54mm. Both figures are larger than the 100mm-radius bend, because a wider radius uses more conduit to form the same 90° turn — and shortens the finished run by more, not less."
          />

          <CommonMistake
            title="Cutting to the sum of two straight measurements and adding the bend afterwards"
            whatHappens="You measure the two straight legs of a run on the drawing, add them together, cut the conduit to that total length, and then bend it. The finished conduit is too long by the gain — 43mm on a typical 90° bend, more on a wider radius — and either fouls the next fitting or has to be trimmed and re-terminated."
            doInstead="Subtract the gain from the sum of the two straight legs before you cut, or mark your bend points using the bending machine's own gain markings if it has them. The bend does not add length to a straight run — it removes some."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Trunking Fill Calculations</ContentEyebrow>

          <ConceptBlock
            title="Trunking is not width × height: real internal CSA and the 45% guideline"
            plainEnglish="A trunking is named by its outside dimensions. What you fill is its inside — and the walls take a bigger bite out of that than most people assume."
          >
            <p>
              The trap on this page starts here. A trunking sold as "75 × 75" sounds like it should
              have an internal cross-sectional area (CSA) of 75 × 75 = 5,625mm². It does not.
              Manufacturers publish the true internal area, and it is consistently smaller than the
              external multiplication because the trunking's own walls take up real space:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">75 × 75mm trunking</strong> — internal CSA{' '}
                <strong className="text-white">4,400mm²</strong>, not 5,625mm².
              </li>
              <li>
                <strong className="text-white">100 × 100mm trunking</strong> — internal CSA{' '}
                <strong className="text-white">7,900mm²</strong>, not 10,000mm².
              </li>
              <li>
                <strong className="text-white">100 × 50mm trunking</strong> — internal CSA{' '}
                <strong className="text-white">3,900mm²</strong>, not 5,000mm².
              </li>
            </ul>
            <p className="mt-3">
              In every case the internal area is around three-quarters of the external
              multiplication. Never calculate a fill off the name printed on the box — always work
              from the internal CSA the manufacturer publishes for that specific product.
            </p>
            <p>
              Once you have the real internal area, the usual working rule is to fill trunking to no
              more than 45% of it:
            </p>
            <p className="text-center font-mono text-[15px] text-white">
              Maximum cable area = Internal CSA × 0.45
            </p>
            <p>
              This is not a BS 7671 requirement. BS 7671 publishes no trunking dimensions and no
              space factor at all — the 45% figure is IET guidance from the On-Site Guide, there to
              leave room for cables to be drawn in without damage and for air to circulate and carry
              heat away. Follow it, but quote it for what it is: guidance, not a regulation you can
              be found in breach of.
            </p>
            <p>
              To use the 45% figure you also need the space each cable actually occupies — its
              overall CSA, not its conductor size. For flat twin and earth:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">1.5mm² T&amp;E</strong> — 56.7mm² overall.
              </li>
              <li>
                <strong className="text-white">2.5mm² T&amp;E</strong> — 80.3mm² overall.
              </li>
              <li>
                <strong className="text-white">4.0mm² T&amp;E</strong> — 106.3mm² overall.
              </li>
              <li>
                <strong className="text-white">6.0mm² T&amp;E</strong> — 137.8mm² overall.
              </li>
              <li>
                <strong className="text-white">10.0mm² T&amp;E</strong> — 201.3mm² overall.
              </li>
            </ul>
            <p className="mt-3">
              Conduit is sized differently again, and it is not a percentage rule at all. The
              On-Site Guide gives conduit a cable-factor / conduit-factor method: each cable you
              plan to draw in is assigned a factor from a published table, you total the factors for
              every cable in the run, then you select a conduit size whose own factor — which
              depends on the conduit's length and how many bends it contains — equals or exceeds
              that total. Applying trunking's flat 45% to a conduit will get you the wrong size; the
              two containment types are sized by two genuinely different methods, not the same rule
              at two different percentages.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 75mm × 75mm trunking run needs to carry: 6 × 2.5mm² T&E, 4 × 1.5mm² T&E, and 2 × 6.0mm² T&E. Does it comply with the 45% guideline?"
            steps={[
              {
                calc: 'Internal CSA = 4,400mm²',
                note: 'From the manufacturer, NOT 75 × 75 = 5,625mm² — that figure is the outside of the trunking.',
              },
              {
                calc: '45% allowance = 4,400 × 0.45 = 1,980mm²',
                note: 'The maximum cable area the guideline allows.',
              },
              {
                calc: 'Cable area = (6 × 80.3) + (4 × 56.7) + (2 × 137.8)',
                note: 'Each cable count multiplied by its overall CSA.',
              },
              {
                calc: '= 481.8 + 226.8 + 275.6 = 984.2mm²',
                note: 'Total space the cables actually occupy.',
              },
              { calc: '984.2mm² < 1,980mm²', note: 'Well within the 45% allowance.' },
            ]}
            answer="Yes — 984.2mm² of a 1,980mm² allowance, which is just under 50% of what the guideline allows, or 22% of the trunking itself. Those two percentages sound very different and people mix them up constantly — be precise about which one you are quoting."
            watchOut="Work this off 75 × 75 = 5,625mm² instead of the real 4,400mm² and you would have called it 39% full instead of 22%, and happily added more cable to a run that is actually closer to its limit than that number suggests."
          />

          <WorkedExample
            question="A 100mm × 100mm PVC trunking has an internal CSA of 7,900mm². Working to the 45% space factor, how many 2.5mm² T&E cables (80.3mm² each) will it take?"
            steps={[
              {
                calc: 'Usable space = 7,900 × 0.45',
                note: '45% of the real internal area, not the external 10,000mm².',
              },
              { calc: '= 3,555mm²', note: 'The maximum total cable area allowed.' },
              {
                calc: 'Number of cables = 3,555 / 80.3',
                note: "Divide the allowance by one cable's overall CSA.",
              },
              {
                calc: '= 44.3 → 44 cables',
                note: 'Round down — you cannot fit part of a cable, and rounding up would exceed the allowance.',
              },
            ]}
            answer="44 cables. This is exactly Quiz Q2: 56 comes from using the external 10,000mm² instead of the internal 7,900mm²; 98 comes from using 7,900mm² but forgetting the 45% factor entirely; 150 stacks both mistakes together."
            watchOut="Every wrong answer on this calculation is a real, specific error someone makes on site — not a random guess. Knowing which mistake produces which wrong number is as useful as knowing the right method."
          />

          <TryIt
            question="The same 100mm × 100mm trunking (internal CSA 7,900mm²) instead needs to carry a mix: 20 × 2.5mm² T&E and 10 × 1.5mm² T&E. Does it comply with the 45% guideline, and by how much room to spare?"
            steps={[
              {
                calc: 'Cable area = (20 × 80.3) + (10 × 56.7)',
                note: 'Each cable type multiplied by its own overall CSA.',
              },
              {
                calc: '= 1,606 + 567 = 2,173mm²',
                note: 'Total space the mixed cable run occupies.',
              },
              {
                calc: 'Allowance = 7,900 × 0.45 = 3,555mm²',
                note: 'Unchanged from the previous worked example — same trunking.',
              },
            ]}
            answer="Compliant: 2,173mm² is well under the 3,555mm² allowance — about 61% of the allowance used, or 27.5% of the trunking itself. As before, note that those are two different numbers describing the same fill, and only one of them is the figure you quote as 'percentage of the space factor'."
          />

          <CommonMistake
            title="Citing a regulation number for the 45% figure"
            whatHappens="Someone states, with total confidence, that 45% trunking fill is a BS 7671 requirement — sometimes quoting Regulation 522.8.1 as the source. BS 7671 sets no trunking dimensions and no space factor at all, and 522.8.1 is actually about erecting a wiring system so its cable sheath and insulation are not damaged — it says nothing about fill capacity."
            doInstead="Say where the figure actually comes from: IET guidance in the On-Site Guide. It remains excellent, well-established practice to follow — but it is not something you can be found in breach of the way a genuine BS 7671 requirement is, and knowing which of the two you are quoting is part of being able to defend your work under questioning."
          />

          <InlineCheck
            id="geom-check-1"
            question="A 100mm × 50mm PVC trunking has an internal CSA of 3,900mm². It is to carry 8 × 2.5mm² flat twin and earth, each occupying 80.3mm². How much of the 45% space factor does that use?"
            options={['16.5%', '36.6%', '80.3%', '45%']}
            correctIndex={1}
            explanation="Cable area = 8 × 80.3 = 642.4mm². The space factor allows 3,900 × 0.45 = 1,755mm². So 642.4 / 1,755 = 36.6% of the allowance is used. Read the question carefully: 642.4 / 3,900 = 16.5% is the share of the whole trunking, which is a different and much smaller-sounding number. Both get quoted on site and they are not interchangeable — say which one you mean. Note also that 3,900mm² is the internal area of a trunking sold as '100 × 50'; the walls cost you about a quarter of the space, so never calculate off the name on the box."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Containment Layouts</ContentEyebrow>

          <ConceptBlock title="Reading a drawing scale, and turning a room into a materials list">
            <p>
              A containment layout starts with a drawing, and a drawing is a scaled-down version of
              a real room. On a 1:50 drawing, 1mm on the paper represents 50mm — 5cm — in reality;
              on a 1:100 drawing, 1mm represents 100mm. To convert a measured distance on the
              drawing into a real distance, multiply the measured length by the scale factor.
            </p>
            <p>
              Before you trust anything else on the drawing, verify the scale against one known
              dimension — a door width of 900mm is a reliable check, because doors do not vary much
              and are easy to spot. Photocopies and scaled reprints drift from their stated scale
              more often than people expect, and a wrong scale multiplies every measurement you take
              from it by the same wrong factor.
            </p>
            <p>
              Once you can measure real distances, a quantity takeoff turns them into an order.
              Calculate the perimeter (or run length), deduct any gaps such as doorways, divide by
              the length the containment is sold in and round up, then count the fittings: internal
              and external corners, end caps, and couplers at every joint between straight lengths.
              Add a waste allowance — around 10% for trunking and conduit is a typical starting
              point — before you place the order, because cutting waste and the odd re-pull are real
              and unavoidable, not padding.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A line measured on a 1:50 drawing is 240mm long. What is the real distance it represents?"
            steps={[
              {
                calc: 'Real distance = measured length × scale factor',
                note: 'On a 1:50 drawing, every 1mm measured represents 50mm in reality.',
              },
              { calc: '240mm × 50 = 12,000mm', note: 'Multiply the measured length by 50.' },
              { calc: '12,000mm = 12m', note: 'Convert to metres for a sensible working unit.' },
            ]}
            answer="12m."
            watchOut="Always check which scale the drawing is actually printed at before doing this — a photocopy resized to fit a different paper size changes the effective scale even though the printed scale bar does not."
          />

          <WorkedExample
            question="An office has trunking running around the perimeter at desk height. The room is 12m × 8m with one 2m wide doorway, and trunking is supplied in 3m lengths. Work out how much to order, corners and couplers included, with a 10% waste allowance."
            steps={[
              {
                calc: 'Perimeter = 2 × (12 + 8) = 40m',
                note: 'The full perimeter before any gap is deducted.',
              },
              {
                calc: 'Less doorway: 40 − 2 = 38m of trunking',
                note: 'No trunking is needed across the open doorway.',
              },
              {
                calc: 'Lengths needed = 38 / 3 = 12.67 → 13 lengths',
                note: 'Trunking comes in 3m lengths — always round up.',
              },
              {
                calc: 'Internal corners: 4, minus 1 with a doorway gap = 3 internal bends',
                note: 'One corner falls where the doorway breaks the run.',
              },
              {
                calc: 'End caps: 2',
                note: 'One at each side of the doorway, where the run terminates.',
              },
              {
                calc: 'Couplers: 13 − 1 = 12',
                note: 'One per joint between lengths, plus the corners already counted separately.',
              },
              {
                calc: 'Waste allowance: 38 × 1.10 = 41.8m ≈ 42m',
                note: 'Order to roughly 42m of run, not the bare 38m calculated.',
              },
            ]}
            answer="13 lengths of trunking (order to approximately 42m of run with the allowance), 3 internal bends, 2 end caps, 12 couplers."
            watchOut="It is far cheaper to have a spare length on the van than to stop a job and wait for a delivery. The 10% allowance is what makes that the normal outcome instead of the exception."
          />

          <TryIt
            question="A different room is 10m × 6m with a single 900mm doorway, and trunking is again supplied in 3m lengths. Work out the run length after the doorway, how many lengths to order with a 10% waste allowance, and how many couplers that implies."
            steps={[
              { calc: 'Perimeter = 2 × (10 + 6) = 32m', note: 'Full perimeter before any gap.' },
              { calc: 'Less doorway: 32 − 0.9 = 31.1m', note: 'A 900mm gap, not a whole metre.' },
              {
                calc: 'Waste allowance: 31.1 × 1.10 = 34.2m',
                note: 'The order quantity, not the bare run length.',
              },
              {
                calc: 'Lengths: 34.2 / 3 = 11.4 → 12 lengths (36m)',
                note: 'Round up to whole 3m lengths.',
              },
            ]}
            answer="34.2m to order once waste is allowed for, which rounds up to 12 lengths of 3m trunking (36m total) — with 11 couplers, one per joint between the 12 lengths."
          />

          <CommonMistake
            title="Measuring straight off a drawing without checking its scale"
            whatHappens="You take every measurement on a printed or reprinted drawing at face value, trusting the scale bar or the stated ratio. The print has been resized to fit a photocopier tray or emailed as a scaled PDF, and every dimension you take from it is now wrong by the same factor — a mistake you will not notice until the material does not fit."
            doInstead="Check the scale against one dimension you already know for certain — a standard door width of 900mm, or a dimension given in text elsewhere on the drawing — before you measure anything else from it."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Basic Trigonometry</ContentEyebrow>

          <ConceptBlock title="SOH CAH TOA and the conduit offset it produces">
            <p>
              Three ratios cover almost everything an electrician needs from trigonometry: sine,
              cosine and tangent, remembered as SOH CAH TOA — Sin = Opposite/Hypotenuse, Cos =
              Adjacent/Hypotenuse, Tan = Opposite/Adjacent. The values you meet most on site are
              worth knowing without a calculator: sin 30° = 0.500, sin 45° = 0.707, sin 60° = 0.866,
              and cosine mirrors sine across the two angles either side of 45°.
            </p>
            <p>
              The practical use is the conduit offset — bending conduit to clear an obstacle while
              keeping the run running in the same overall direction. If the offset (the depth you
              need to clear) is known and you have picked a bend angle, the travel — the length of
              conduit between the two bends — is:
            </p>
            <p className="text-center font-mono text-[15px] text-white">Travel = offset ÷ sin(θ)</p>
            <p>
              A shallower angle (30°) gives a longer, gentler travel that is easier to pull cable
              through; a steeper angle (45°) gives a shorter offset but a sharper change of
              direction. The horizontal distance the offset costs you along the original line of the
              run is offset ÷ tan(θ) — a separate figure from the travel, and one worth checking
              when the offset has to fit in a confined space.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A conduit offset needs to clear a 200mm deep obstacle using 45° bends. What is the travel, and what horizontal distance does the offset cost along the run?"
            steps={[
              { calc: 'Travel = offset / sin(45°) = 200 / 0.707', note: 'sin 45° = 0.707.' },
              {
                calc: 'Travel = 283mm',
                note: 'The length of diagonal conduit run between the two 45° bends.',
              },
              {
                calc: 'Horizontal distance = offset / tan(45°) = 200 / 1.0',
                note: 'tan 45° = 1.0 exactly.',
              },
              {
                calc: 'Horizontal distance = 200mm',
                note: "The offset costs exactly 200mm of the run's original horizontal length.",
              },
            ]}
            answer="Travel = 283mm; horizontal distance lost = 200mm."
            watchOut="Travel and horizontal distance are two different figures answering two different questions — do not use one where the other is needed, especially when checking whether an offset fits in a confined space."
          />

          <WorkedExample
            question="A conduit offset needs to clear an obstacle 150mm deep, using a 45° bend set. What is the travel?"
            steps={[
              {
                calc: 'Travel = offset / sin(45°) = 150 / 0.707',
                note: 'Same formula, a shallower obstacle than the previous example.',
              },
              {
                calc: 'Travel = 212mm',
                note: 'Alternatively, travel = offset × √2 = 150 × 1.414 = 212mm — the same answer by a different route.',
              },
            ]}
            answer="212mm. This is exactly Quiz Q6."
            watchOut="At 45° the two methods — dividing by sin(45°), or multiplying by √2 — always agree, because sin(45°) and 1/√2 are the same value. Use whichever you find easier to remember under pressure."
          />

          <TryIt
            question="An offset needs to clear a shallower 100mm obstacle using a 30° bend set. What is the travel?"
            steps={[
              { calc: 'Travel = offset / sin(30°) = 100 / 0.5', note: 'sin 30° = 0.5 exactly.' },
              {
                calc: 'Travel = 200mm',
                note: 'A shallower bend angle on a smaller offset than the two worked examples above.',
              },
            ]}
            answer="200mm. Mark the first bend point, measure 200mm of conduit, mark the second, and bend both points 30° in opposite directions — the conduit will offset exactly 100mm from its original line."
          />

          <InlineCheck
            id="geom-check-2"
            question="A conduit offset needs to clear a 300mm obstacle using 30° bends. Sin 30° = 0.5. What is the travel distance between the bends?"
            options={['150mm', '300mm', '424mm', '600mm']}
            correctIndex={3}
            explanation="Travel = offset / sin(30°) = 300 / 0.5 = 600mm. With shallower bend angles (30° vs 45°), the travel distance increases but the offset looks neater and is easier to pull cables through."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Pythagoras for Cable Routes</ContentEyebrow>

          <ConceptBlock title="Pythagoras: the true length of a diagonal, and checking whether a corner is square">
            <p>
              Pythagoras' theorem is the most-used geometry tool on site. Whenever a cable, tray or
              conduit route needs to travel diagonally — up and along at the same time, or across
              the corner of a room — the true length is the hypotenuse of a right-angled triangle:
            </p>
            <p className="text-center font-mono text-[15px] text-white">c = √(a² + b²)</p>
            <p>
              where c is the diagonal (hypotenuse) and a and b are the other two sides — typically a
              rise and a run, or the two straight sides of a room. Certain whole-number combinations
              come up constantly and are worth recognising on sight: 3–4–5 (and its multiples,
              6-8-10 and 9-12-15), 5–12–13, and 8–15–17.
            </p>
            <p>
              Run the same theorem in reverse and it becomes a squareness check. Measure 3m along
              one wall and 4m along the perpendicular wall from the same corner; if the diagonal
              between those two points is exactly 5m, the corner is a true 90°. If it is not, the
              corner is out of square by an amount you can now put a number on, which matters before
              you build a containment run that assumes it is not.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A cable tray rises vertically 3m while running horizontally 4m. What length of tray is needed?"
            steps={[
              { calc: 'c = √(a² + b²) = √(3² + 4²)', note: 'a = 3m rise, b = 4m run.' },
              { calc: '= √(9 + 16) = √25', note: 'Add the two squares before taking the root.' },
              {
                calc: '= 5m',
                note: 'The classic 3-4-5 right triangle — worth memorising on sight.',
              },
            ]}
            answer="5m."
          />

          <WorkedExample
            question="A cable tray rises from 2m height to 4m height over a horizontal distance of 6m. What is the actual length of cable tray needed?"
            steps={[
              {
                calc: 'Rise = 4 − 2 = 2m',
                note: 'The vertical side of the triangle — the CHANGE in height, not the final height.',
              },
              { calc: 'Run = 6m', note: 'The horizontal side, given directly.' },
              {
                calc: 'c = √(2² + 6²) = √(4 + 36) = √40',
                note: 'Add the two squares before taking the root.',
              },
              { calc: '= 6.32m', note: 'Rounded to two decimal places.' },
            ]}
            answer="6.32m. This is exactly Quiz Q8, and always order slightly more than the calculated length to allow for cutting and fixing."
            watchOut="The rise is 4 − 2, not 4. Using the final height instead of the change in height is the single most common way people get this calculation wrong."
          />

          <WorkedExample
            question="A cable needs to pass diagonally through a 300mm thick wall, dropping 200mm in height as it does. What length of cable is inside the wall, and how much extra should you allow?"
            steps={[
              {
                calc: 'c = √(300² + 200²) = √(90,000 + 40,000)',
                note: 'a = 300mm wall thickness, b = 200mm drop.',
              },
              { calc: '= √130,000', note: 'Add the two squares before taking the root.' },
              { calc: '= 360.6mm', note: 'The exact calculated diagonal.' },
            ]}
            answer="360.6mm calculated, but allow approximately 400mm in practice — the extra covers slack and the bends either side of the wall, which the straight-line calculation does not include."
            watchOut="A calculated length is a minimum, not an order quantity. Ordering to the bare calculated figure leaves no slack for termination and no allowance for the run not being perfectly straight in practice."
          />

          <TryIt
            question="You check a room corner for squareness using the 3-4-5 method: 3m along one wall, 4m along the other, and you measure the diagonal between the two points at 5.2m. What does that tell you, and what should you do before running containment into that corner?"
            steps={[
              {
                calc: 'Expected diagonal if the corner is a true 90° = √(3² + 4²) = 5m',
                note: 'The theoretical value for a genuinely square corner.',
              },
              { calc: 'Measured diagonal = 5.2m', note: '0.2m more than expected.' },
              {
                calc: 'The corner is not square',
                note: 'A true right angle would have produced exactly 5m — 5.2m means the actual angle is wider than 90°.',
              },
            ]}
            answer="The corner is out of square by a measurable amount. Before running trunking or setting out a containment layout that assumes a true 90°, either remeasure to confirm, or plan the layout to the actual angle rather than the assumed one — mitred joints and end caps cut for 90° will not sit flush against a corner that is not."
          />

          <CommonMistake
            title="Ordering material to the exact calculated diagonal length"
            whatHappens="A Pythagoras calculation gives a precise figure — 360.6mm, 6.32m — and the material is ordered or cut to exactly that length. On installation there is no slack for terminations, and any deviation from a perfectly straight route (which is most routes) leaves the run short."
            doInstead="Treat the calculated diagonal as a minimum and add a sensible allowance for slack, bends and terminations before cutting or ordering — a few hundred millimetres on a short run, proportionally more on a long one."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Area Calculations for Lighting</ContentEyebrow>

          <ConceptBlock title="The lumen method: from lux and area to a luminaire count">
            <p>
              Designing a lighting installation means turning a target illuminance and a room area
              into a number of luminaires, using the lumen method:
            </p>
            <p className="text-center font-mono text-[15px] text-white">
              N = (E × A) / (F × UF × MF)
            </p>
            <p>
              where N is the number of luminaires, E is the required lux, A is the room area in m²,
              F is the lumen output per fitting, UF is the utilisation factor and MF is the
              maintenance factor. Recommended illuminance levels for indoor workplaces, from BS EN
              12464-1, include: corridors and stairs around 100 lux, general offices 300–500 lux,
              workshops and kitchens around 500 lux, and detailed work such as electronics assembly
              750–1,000 lux. That standard covers indoor workplaces specifically — it has nothing to
              say about a domestic living room, which is not a workplace.
            </p>
            <p>
              UF and MF are not fixed figures — they depend on the actual room and fitting. UF
              depends on the room's shape and its reflectances (ceiling, wall and floor colours) and
              the luminaire type; a light-coloured room reflects more light and has a higher UF than
              an identical dark-coloured one. MF accounts for dirt build-up on the fitting and lamp
              output falling as it ages, and depends on the cleaning and replacement regime the
              installation will actually get. Read both from the fitting's photometric data and the
              room in front of you, not from memory of a different job.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="An office is 8m × 6m. It needs 400 lux. Each LED panel provides 4,000 lumens. UF = 0.55, MF = 0.8. How many panels are needed?"
            steps={[
              { calc: 'Area = 8 × 6 = 48m²', note: 'Room floor area.' },
              {
                calc: 'Total lumens needed = (400 × 48) / (0.55 × 0.8)',
                note: 'E × A divided by UF × MF.',
              },
              {
                calc: '= 19,200 / 0.44 = 43,636 lumens',
                note: 'The total light output the installation must deliver.',
              },
              {
                calc: 'Panels = 43,636 / 4,000 = 10.9 → 11 panels',
                note: 'Always round up — a fractional panel does not exist.',
              },
            ]}
            answer="11 panels, arranged as a 4 × 3 grid (12 panels) for even distribution across the room."
          />

          <WorkedExample
            question="A room is 6m × 4m and requires 300 lux. Each LED panel provides 3,000 lumens. UF = 0.6, MF = 0.8. How many panels are needed?"
            steps={[
              { calc: 'Area = 6 × 4 = 24m²', note: 'Room floor area.' },
              {
                calc: 'Total lumens = (300 × 24) / (0.6 × 0.8)',
                note: 'E × A divided by UF × MF.',
              },
              { calc: '= 7,200 / 0.48 = 15,000 lumens', note: 'The required total light output.' },
              {
                calc: 'Panels = 15,000 / 3,000 = 5',
                note: 'Divides exactly this time — no rounding needed.',
              },
            ]}
            answer="5 panels. This is exactly Quiz Q4."
          />

          <TryIt
            question="A workshop is 10m × 5m and requires 500 lux. Each panel provides 5,000 lumens. UF = 0.5, MF = 0.75. How many panels are needed?"
            steps={[
              { calc: 'Area = 10 × 5 = 50m²', note: 'Room floor area.' },
              {
                calc: 'Total lumens = (500 × 50) / (0.5 × 0.75) = 25,000 / 0.375',
                note: 'E × A divided by UF × MF.',
              },
              { calc: '= 66,667 lumens', note: 'The required total light output.' },
              { calc: 'Panels = 66,667 / 5,000 = 13.3 → 14 panels', note: 'Round up.' },
            ]}
            answer="14 panels."
          />

          <CommonMistake
            title="Using a remembered UF and MF instead of the ones for this room"
            whatHappens="A designer carries forward a UF and MF that worked on a previous job — a light-coloured office, say — and applies them to a workshop with dark walls and an oily, dusty atmosphere. The lumen method still runs, produces an answer, and the answer is wrong: too few panels are specified, and the finished installation falls short of the required lux."
            doInstead="Read UF from the fitting's own photometric data for the room's actual reflectances, and choose an MF that reflects the real cleaning and lamp-replacement regime the space will get. A darker, dirtier environment needs a lower UF and MF and therefore more luminaires, not the same count as a cleaner room of the same size."
          />

          <InlineCheck
            id="geom-check-3"
            question="A corridor is 20m long and 2m wide. It requires 100 lux. Each LED fitting provides 2,000 lumens. UF = 0.45, MF = 0.8. How many fittings are needed?"
            options={['3 fittings', '6 fittings', '12 fittings', '14 fittings']}
            correctIndex={1}
            explanation="Area = 20 × 2 = 40m². Total lumens = (100 × 40) / (0.45 × 0.8) = 4,000 / 0.36 = 11,111 lumens. Fittings = 11,111 / 2,000 = 5.6, so 6 fittings are needed (always round up to meet the minimum lux level)."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Volume &amp; Ventilation</ContentEyebrow>

          <ConceptBlock title="Room volume, air changes, and knowing which figures come from where">
            <p>
              Sizing an extraction fan starts with the room's volume, and the required capacity is
              the volume multiplied by the number of air changes the space needs per hour:
            </p>
            <p className="text-center font-mono text-[15px] text-white">
              Fan capacity = Volume × Air changes per hour
            </p>
            <p>
              with volume in m³ and the result in m³/hr — convertible to l/s (litres per second),
              the unit most domestic fans are actually specified in, using 1 m³/hr = 0.278 l/s, or
              equivalently 1 l/s = 3.6 m³/hr.
            </p>
            <p>
              For dwellings, Approved Document F, Volume 1 sets extract rates directly rather than
              as air changes per hour: a domestic bathroom needs 15 l/s intermittent or 8 l/s
              continuous; a domestic kitchen needs 60 l/s intermittent (elsewhere in the kitchen) or
              13 l/s continuous; a WC with no window needs 6 l/s intermittent. Those three figures
              are genuinely from that document, for dwellings specifically.
            </p>
            <p>
              Non-domestic spaces are commonly sized by air changes per hour instead — an office at
              around 6–10 air changes/hr, a server room at around 10–15 air changes/hr — but those
              figures are common design practice across the industry, not Approved Document F, which
              covers dwellings. Check the actual design brief or specification for the room in front
              of you rather than treating either set of figures as a universal default.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A server room is 5m × 4m × 3m high. The design brief calls for 12 air changes per hour. What fan capacity is required, in l/s?"
            steps={[
              { calc: 'Volume = 5 × 4 × 3 = 60m³', note: 'Room length × width × height.' },
              { calc: 'Capacity = 60 × 12 = 720 m³/hr', note: 'Volume × air changes per hour.' },
              { calc: 'Convert to l/s: 720 / 3.6 = 200 l/s', note: '1 l/s = 3.6 m³/hr.' },
              {
                calc: 'Add a 10% margin: 200 × 1.10 = 220 l/s',
                note: 'A sensible allowance for ducting resistance and future load.',
              },
            ]}
            answer="A fan rated at minimum 200 l/s, specified at 220 l/s to allow a margin."
          />

          <WorkedExample
            question="The same server room — 5m × 4m × 3m — instead has a design brief calling for 10 air changes per hour. What is the required capacity in m³/hr?"
            steps={[
              {
                calc: 'Volume = 5 × 4 × 3 = 60m³',
                note: 'Unchanged from the previous example — same room.',
              },
              {
                calc: 'Capacity = 60 × 10 = 600 m³/hr',
                note: 'A lower air-change figure than the previous example gives a lower required capacity.',
              },
            ]}
            answer="600 m³/hr. This is exactly Quiz Q7 — and note that changing the air-change figure from 12 to 10 changes the answer by 120 m³/hr on an identical room. Always take the air-change figure from the actual specification for the job, not from memory of a similar one."
          />

          <TryIt
            question="A domestic bathroom fan is specified by its manufacturer at 30 m³/hr continuous. Approved Document F's continuous extract rate for a domestic bathroom is 8 l/s. Convert the two figures to the same unit and check whether the fan meets the requirement."
            steps={[
              {
                calc: '8 l/s × 3.6 = 28.8 m³/hr',
                note: "Convert the Approved Document F figure into the same unit as the fan's rating.",
              },
              {
                calc: 'Compare: 30 m³/hr vs 28.8 m³/hr required',
                note: "The fan's rating exceeds the required figure.",
              },
            ]}
            answer="Yes, it meets the requirement, with a small margin of 1.2 m³/hr (about 4%). Converting both figures to the same unit before comparing them is the step that actually answers the question — comparing 30 against 8 directly, without converting, would look like a huge margin and would be meaningless."
          />

          <CommonMistake
            title="Specifying a fan by its free-air rating alone"
            whatHappens="A fan rated at 200 l/s in free air is selected and fitted, then connected to a run of ducting with several bends. Once installed, it delivers only around 150 l/s because the ducting adds resistance the free-air figure does not account for."
            doInstead="Check the fan's performance curve against the actual system resistance — duct length, diameter and number of bends — not just its headline free-air rating, and build in a margin for it as standard."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Practical Geometry Applications</ContentEyebrow>

          <ConceptBlock title="Combining the techniques on one containment run">
            <p>
              A real containment run rarely uses just one of these techniques in isolation. A tray
              or conduit route through a building typically rises, runs horizontally, and has to
              clear at least one obstacle along the way — which means Pythagoras for the
              rise-and-run and trigonometry for the offset are frequently needed on the same piece
              of work, one after the other.
            </p>
            <p>
              Take a cable tray routing around a 600mm square column, where the tray approaches from
              one side and continues on the adjacent side — a 90° change of direction achieved with
              either one 90° flat bend or two 45° flat bends. If the tray needs to offset 600mm from
              the column face to clear it, that 600mm is added to the run as a straight section
              between the two bends, in addition to the bend pieces themselves.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Cable tray needs to route around a 600mm square column, offsetting 600mm from the column face using two 45° flat bends. What does the tray order need to include?"
            steps={[
              {
                calc: 'Two 45° flat bends (or one 90° flat bend)',
                note: 'Either achieves the 90° change of direction; two 45° bends give a wider, gentler turn.',
              },
              {
                calc: 'Straight section between the bends = 600mm',
                note: 'The offset distance needed to clear the column.',
              },
              {
                calc: 'Tray order: straight → 90° bend → 600mm straight → 90° bend → straight',
                note: 'The sequence the tray actually follows around the obstacle.',
              },
            ]}
            answer="The order needs the two bend pieces plus 600mm of additional straight tray, on top of whatever straight tray the rest of the run requires."
          />

          <WorkedExample
            question="A conduit route rises 1.2m over a horizontal run of 2.5m, and partway along needs a 45° offset of 150mm to clear a beam. What total length of conduit does the run need, roughly?"
            steps={[
              {
                calc: 'Main diagonal: c = √(1.2² + 2.5²) = √(1.44 + 6.25)',
                note: 'Pythagoras for the rise-and-run part of the route.',
              },
              {
                calc: '= √7.69 ≈ 2.77m',
                note: 'The diagonal length covering the rise and the horizontal run.',
              },
              {
                calc: 'Offset travel = 150 / sin(45°) = 212mm',
                note: 'The trigonometry from Section 04, applied to the beam clearance.',
              },
              {
                calc: 'Total ≈ 2.77m + 0.212m = 2.98m',
                note: 'Diagonal run plus the offset detour, added together.',
              },
            ]}
            answer="Approximately 2.98m of conduit for the calculated route, before adding a cutting and fixing allowance — order to around 3.2m."
            watchOut="Two techniques taught separately in this section — Pythagoras for a diagonal, trigonometry for an offset — are simply added together when a real run needs both. Calculate each part with its own formula, then combine the results; do not try to force one formula to do both jobs at once."
          />

          <TryIt
            question="A conduit route needs a 200mm offset at 45° to clear a duct, then continues 4m horizontally while rising 1.5m to reach a ceiling void. What total conduit length does the run need, roughly, and how much would you order once a 10% cutting allowance is added?"
            steps={[
              {
                calc: 'Offset travel = 200 / sin(45°) = 282.9mm',
                note: 'The 45° offset around the duct.',
              },
              {
                calc: 'Diagonal for the rise-and-run: √(4² + 1.5²) = √(16 + 2.25)',
                note: 'Pythagoras for the remaining part of the route.',
              },
              {
                calc: '= √18.25 ≈ 4.27m',
                note: 'The diagonal length for the horizontal run and the rise.',
              },
              {
                calc: 'Total ≈ 282.9mm + 4.27m = 4.56m',
                note: 'Offset travel plus the diagonal run, added together.',
              },
              {
                calc: 'With 10% allowance: 4.56 × 1.10 ≈ 5.0m',
                note: 'The quantity to actually order.',
              },
            ]}
            answer="Approximately 4.56m of calculated conduit length, order to roughly 5.0m once the cutting allowance is added."
          />

          <Scenario
            title="The run measured as if it were flat"
            situation="An apprentice takes a containment quantity straight off the plan view of a drawing — the horizontal distance only — for a run that actually rises 1.5m through a riser cupboard and offsets 45° around a duct partway along. Trunking is ordered to that flat, plan-view figure."
            whatToDo="Recalculate using Pythagoras for the vertical rise and the offset-travel formula for the duct clearance, and add both to the horizontal distance before ordering — the plan view alone never accounts for anything that is not perfectly horizontal."
            whyItMatters="A run with any rise or any offset is always longer than its plan-view distance suggests, because the plan view only ever shows the horizontal projection of the route. By the time the shortfall is discovered, the job is already under way and the second delivery costs time as well as money."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Arc length = 2πr × (θ/360). Gain (2r − arc) is why a bent run comes out shorter than two straight pieces joined by an elbow — account for it before you cut.',
              "A trunking's internal CSA is not its printed name multiplied out: 75 × 75 is 4,400mm² inside, 100 × 100 is 7,900mm², 100 × 50 is 3,900mm² — the walls cost roughly a quarter of the space every time.",
              'The 45% trunking fill guideline is IET On-Site Guide guidance, not a BS 7671 requirement — BS 7671 sets no trunking dimensions or space factor at all.',
              'Conduit is sized by a completely different cable-factor / conduit-factor method, not by any percentage.',
              'Cable overall CSA for flat T&E: 56.7mm² (1.5mm²), 80.3mm² (2.5mm²), 106.3mm² (4.0mm²), 137.8mm² (6.0mm²), 201.3mm² (10.0mm²).',
              'A scale drawing converts to real distance by multiplying by the scale factor — always check the scale against a known dimension first.',
              'Conduit offset travel = offset ÷ sin(θ). Pythagoras — c = √(a² + b²) — finds any diagonal cable, tray or conduit length, and checks whether a corner is genuinely square.',
              'The lumen method — N = (E × A) / (F × UF × MF) — sizes a lighting installation, but UF and MF have to come from the actual room and fitting, not a remembered figure.',
              'Fan capacity = volume × air changes per hour. Only the dwelling l/s figures on this page — bathroom, kitchen, WC — are genuinely from Approved Document F; office and server-room air-change figures are industry design practice, a different kind of source.',
              'Real containment runs stack these techniques — a rise, a run and an offset on the same route are added together, each calculated with its own formula. Practise each technique on its own before combining them.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  "Why is a trunking's internal area so much less than its outside dimensions?",
                answer:
                  'The figures quoted for a trunking — "75 × 75", "100 × 100" — describe its external size. The material forming the trunking\'s own walls sits inside that external footprint and takes up real cross-sectional area, consistently leaving an internal area of around three-quarters of the external multiplication. Always use the manufacturer\'s published internal CSA for the specific product, never the external dimensions.',
              },
              {
                question: 'Is the 45% trunking fill figure something I can be found in breach of?',
                answer:
                  'No — it is IET guidance from the On-Site Guide, not a BS 7671 requirement, and BS 7671 sets no trunking dimensions or space factor of its own. It is excellent, well-established practice to follow, but it does not carry the same legal weight as a genuine BS 7671 requirement, and knowing which one you are quoting matters if your work is ever questioned.',
              },
              {
                question: 'Why does conduit not use the same 45% rule as trunking?',
                answer:
                  "Because it is sized by a different method entirely — the On-Site Guide's cable-factor and conduit-factor system, which accounts for the number of bends in the run as well as the cables drawn through it. Applying trunking's percentage rule to conduit produces the wrong size.",
              },
              {
                question:
                  'Which air-change or ventilation figures on this page actually come from Approved Document F?',
                answer:
                  'Only the three domestic figures given in l/s — a bathroom, a kitchen and a WC. The office and server-room figures given in air changes per hour are common industry design practice, not that document, and the correct figure for any real job should always come from its own design brief.',
              },
              {
                question: 'Do I need to memorise every formula on this page?',
                answer:
                  "You need to recognise which formula answers which question, and be able to look up the exact figure — a bending radius, a trunking's internal CSA — rather than guess it. The maths itself is simple arithmetic once you have the right formula and the right figures in front of you.",
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Geometry & Spatial Skills Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module4/section3')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Costing &amp; Quoting
            </button>
            <button
              type="button"
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module4')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Module 4
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule4Section4;
