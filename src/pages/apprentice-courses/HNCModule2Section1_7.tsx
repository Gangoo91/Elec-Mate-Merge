/**
 * Module 2 · Section 1 · Subsection 7 — Comfort Conditions
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Human thermal comfort — air temperature, mean radiant temperature, humidity,
 *   air movement, clothing (clo) and activity (met). Covers operative temperature,
 *   the PMV/PPD model and its limits, adaptive comfort, local discomfort mechanisms
 *   and how comfort criteria drive HVAC design decisions.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  SectionRule,
  FAQ,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Comfort Conditions - HNC Module 2 Section 1.7';
const DESCRIPTION =
  'Human thermal comfort for building services: the six comfort factors, mean radiant temperature, operative temperature, the PMV/PPD model, adaptive comfort and local discomfort.';

const quickCheckQuestions = [
  {
    id: 'six-factors',
    question: 'Which of the following is a personal factor rather than an environmental factor?',
    options: ['Relative humidity', 'Mean radiant temperature', 'Clothing insulation', 'Air velocity'],
    correctIndex: 2,
    explanation:
      'The four environmental factors are air temperature, mean radiant temperature, relative humidity and air velocity. The two personal factors are clothing insulation (clo) and metabolic rate (met). Clothing belongs to the occupant, not to the room.',
  },
  {
    id: 'operative-temp',
    question:
      'A room has an air temperature of 24 °C and a mean radiant temperature of 20 °C, with still air. What is the approximate operative temperature?',
    options: ['20 °C', '22 °C', '24 °C', '28 °C'],
    correctIndex: 1,
    explanation:
      'At low air velocity operative temperature is approximately the average of air and mean radiant temperature: (24 + 20) / 2 = 22 °C. The cold surfaces pull the felt temperature two degrees below the thermostat reading.',
  },
  {
    id: 'ppd-floor',
    question: 'At PMV = 0 (thermally neutral), what does the PPD index predict?',
    options: [
      'Nobody is dissatisfied - PPD is zero',
      'About 5% of occupants remain dissatisfied',
      'About 20% of occupants remain dissatisfied',
      'PPD is undefined at PMV = 0',
    ],
    correctIndex: 1,
    explanation:
      'PPD never falls below about 5%, even at the optimum PMV of zero. People differ, so a proportion is always dissatisfied. Designing for zero complaints is not achievable; keeping the dissatisfied minority small is.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many factors does the classic thermal comfort model use, and how do they split?',
    options: [
      'Four factors - all environmental',
      'Six factors - four environmental and two personal',
      'Six factors - three environmental and three personal',
      'Two factors - air temperature and humidity',
    ],
    correctAnswer: 1,
    explanation:
      'Six factors: four environmental (air temperature, mean radiant temperature, relative humidity, air velocity) and two personal (clothing insulation in clo, metabolic rate in met). Omit any one and the assessment is incomplete.',
  },
  {
    id: 2,
    question: 'What does mean radiant temperature describe?',
    options: [
      'The average air temperature within the occupied zone',
      'The temperature of the heat emitter surface only',
      'The dry-bulb temperature measured in the shade',
      'A single equivalent temperature representing radiant exchange with all surrounding surfaces',
    ],
    correctAnswer: 3,
    explanation:
      'Mean radiant temperature is the temperature of a uniform imaginary enclosure that would exchange the same net radiant heat with the occupant as the real, non-uniform room. It is driven by surface temperatures, not by the air.',
  },
  {
    id: 3,
    question:
      'A perimeter office holds 21 °C air but has large single glazing, and occupants complain of feeling cold. What is the most likely explanation?',
    options: [
      'Relative humidity is too high',
      'Cold glazing depresses mean radiant temperature, so operative temperature is below air temperature',
      'The metabolic rate of the occupants is unusually high',
      'The thermostat is reading too low',
    ],
    correctAnswer: 1,
    explanation:
      'Cold internal glass is a radiant heat sink. The occupant loses radiant heat to it, mean radiant temperature drops, and operative temperature falls below air temperature even though the thermostat is satisfied.',
  },
  {
    id: 4,
    question:
      'A space has 20 °C air and a mean radiant temperature of 26 °C from a warm radiant ceiling, with still air. What is the approximate operative temperature?',
    options: ['20 °C', '23 °C', '26 °C', '46 °C'],
    correctAnswer: 1,
    explanation:
      'At low air speeds operative temperature is the average of air and mean radiant temperature: (20 + 26) / 2 = 23 °C. This is why radiant heating can run cooler air - the radiant surface lifts mean radiant temperature, so the same operative temperature is reached at a lower air temperature, which also cuts ventilation heat loss.',
  },
  {
    id: 5,
    question: 'Approximately what does a clothing insulation value of 1 clo represent?',
    options: [
      'Shorts and a T-shirt',
      'A typical business suit',
      'Full outdoor winter clothing with an overcoat',
      'No clothing at all',
    ],
    correctAnswer: 1,
    explanation:
      '1 clo is approximately the insulation of a typical business suit. Light summer clothing sits well below it and heavy winter outdoor clothing well above. Because clothing is a model input, a relaxed summer dress code genuinely widens the acceptable temperature band.',
  },
  {
    id: 6,
    question: 'What does 1 met represent?',
    options: [
      'A person walking briskly',
      'A person carrying out heavy manual work',
      'A person seated at rest',
      'A person asleep',
    ],
    correctAnswer: 2,
    explanation:
      '1 met is approximately the metabolic heat production of a person seated at rest. Standing, walking and manual work all raise the met value, which raises internal heat generation and lowers the temperature at which that person feels comfortable.',
  },
  {
    id: 7,
    question: 'What does the PMV scale run from and to?',
    options: [
      '0 (comfortable) to 10 (uncomfortable)',
      '-3 (cold) through 0 (neutral) to +3 (hot)',
      '0% to 100% dissatisfied',
      '-1 (cool) through 0 (neutral) to +1 (warm) only',
    ],
    correctAnswer: 1,
    explanation:
      'PMV (Predicted Mean Vote) runs on a seven-point thermal sensation scale from -3 cold, through -2 cool, -1 slightly cool, 0 neutral, +1 slightly warm, +2 warm, to +3 hot. It predicts the average vote of a large group.',
  },
  {
    id: 8,
    question: 'Which statement best describes a limitation of the PMV/PPD model?',
    options: [
      'It cannot be used in offices',
      'It ignores clothing entirely',
      'It assumes a steady-state, uniform environment and does not capture occupant adaptation',
      'It applies only to spaces cooled below 18 °C',
    ],
    correctAnswer: 2,
    explanation:
      'PMV is a steady-state heat-balance model for a broadly uniform environment. It does not account for behavioural or physiological adaptation - opening a window, changing clothing, or acclimatising over a warm spell. Adaptive comfort addresses that gap.',
  },
  {
    id: 9,
    question:
      'A meeting room is thermally neutral overall, but occupants beside the window say one side of them is cold. Which local discomfort mechanism is this?',
    options: [
      'Vertical air temperature gradient',
      'Radiant asymmetry',
      'Floor surface temperature',
      'Elevated metabolic rate',
    ],
    correctAnswer: 1,
    explanation:
      'Radiant asymmetry: one side of the body faces a cold surface and the other a warmer one, so net radiant exchange differs across the body. Cold vertical surfaces and warm ceilings are the two cases designers most often have to control.',
  },
];

const faqs = [
  {
    question: 'If the thermostat says 22 °C, why are people still complaining that it is cold?',
    answer:
      'Because a wall thermostat measures air temperature and people respond to operative temperature. If the surrounding surfaces are cold - large glazed areas, an uninsulated external wall, an exposed soffit - the mean radiant temperature is below air temperature and the occupant feels the average of the two. Measure mean radiant temperature with a globe thermometer before you touch the setpoint. Raising air temperature to mask a radiant problem is expensive and usually produces a stuffy, stratified space instead.',
  },
  {
    question: 'Why can radiant heating run at a lower air temperature than convective heating?',
    answer:
      'Radiant systems - underfloor heating, radiant panels, high-level radiant strips - warm the surfaces and the occupants directly rather than the air. That lifts mean radiant temperature, so the same operative temperature is reached at a lower air temperature. A lower air temperature reduces the temperature difference driving ventilation and infiltration losses, which is why radiant heating is favoured in tall, leaky spaces such as warehouses and workshops.',
  },
  {
    question: 'Is a PPD of 5% a failure? It sounds like a lot of unhappy people.',
    answer:
      'No. PPD cannot go below about 5% because individuals differ in physiology, clothing and preference even in an identical environment. A design that reaches close to that practical minimum is doing as well as a uniform environment allows. The engineering objective is to keep PPD low and, just as importantly, to control the local discomfort mechanisms the whole-body index does not capture.',
  },
  {
    question: 'When should I use an adaptive comfort approach instead of PMV?',
    answer:
      'Adaptive approaches suit naturally ventilated or mixed-mode buildings where occupants have real control - openable windows, blinds, fans, a relaxed dress code. In those buildings the acceptable indoor temperature tracks the recent outdoor running mean and people accept a wider range than a steady-state model predicts. PMV remains the right tool for closely controlled mechanically conditioned spaces where occupants have little control.',
  },
  {
    question: 'Does increasing air movement always improve comfort?',
    answer:
      'No - it depends which side of neutral you are on. When a space is warm, increased air movement raises convective and evaporative loss and is welcome; that is the basis of ceiling and desk fans. When a space is already neutral or cool, the same movement is perceived as draught and is one of the commonest complaints. Draught risk rises with velocity, with turbulence, and as air temperature falls, and it bites hardest at the exposed neck and ankles.',
  },
];

const HNCModule2Section1_7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 7"
            title="Comfort Conditions"
            description="Human thermal comfort - the six factors, operative temperature, PMV/PPD and the local effects that drive complaints."
            tone="purple"
          />

          <TLDR
            points={[
              'Comfort depends on six factors: four environmental (air temperature, mean radiant temperature, relative humidity, air velocity) and two personal (clothing in clo, activity in met).',
              'People feel operative temperature, not air temperature. At low air speeds it is roughly the average of air and mean radiant temperature - which is why a warm room with cold glazing still feels cold.',
              'PMV predicts the average thermal sensation of a large group from -3 (cold) to +3 (hot); PPD converts it to a predicted percentage dissatisfied, and PPD never drops below about 5%.',
              'Whole-body neutrality is not enough: draught, radiant asymmetry, vertical temperature gradient and floor temperature each generate complaints in a space the headline index says is fine.',
            ]}
          />

          <RegsCallout
            source="BS EN ISO 7730 · CIBSE Guide A"
            clause="In outline, and paraphrased rather than quoted: thermal sensation is treated as a function of the human heat balance. The method takes six inputs - air temperature, mean radiant temperature, relative humidity, air velocity, clothing insulation and metabolic rate - and returns a predicted mean vote on a seven-point thermal sensation scale together with a predicted percentage of dissatisfied occupants. Separate criteria then address local thermal discomfort from draught, radiant asymmetry, vertical air temperature difference and floor surface temperature."
            meaning={
              <>
                BS EN ISO 7730 supplies the analytical method; CIBSE Guide A supplies the UK design
                criteria and recommended conditions you actually put on a drawing. You are expected
                to know the six inputs, what PMV and PPD mean, and why an environment can satisfy
                the whole-body index and still generate complaints. Look the specific numeric
                criteria up in the current editions rather than working from memory.
              </>
            }
            cite="Sources: BS EN ISO 7730 - Ergonomics of the thermal environment; CIBSE Guide A - Environmental design"
          />

          <LearningOutcomes
            outcomes={[
              'Identify the four environmental and two personal comfort factors',
              'Distinguish air from mean radiant temperature and explain the cold-window effect',
              'Calculate operative temperature from air and mean radiant temperature',
              'Explain the PMV and PPD indices, their inputs, outputs and limitations',
              'Contrast steady-state comfort modelling with the adaptive comfort approach',
              'Identify the four local thermal discomfort mechanisms and their design remedies',
              'Apply comfort criteria to HVAC design and to diagnosing comfort complaints',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Why Comfort Matters to a Building Services Engineer"
            plainEnglish="Comfort is the whole point of the heating and cooling system. It sets the design targets, it generates the complaints when you get it wrong, and every degree of it costs energy."
          >
            <p>
              Heating, cooling and ventilation systems exist to keep people comfortable and healthy.
              Comfort is therefore not a soft topic bolted on at the end - it is the design brief.
              Every calculation earlier in this section, from conduction through to whole-building
              heat loss, is driven by the internal condition you have promised to hold.
            </p>
            <p>
              <strong>It sets the design targets:</strong> the design internal temperature for each
              space is a comfort decision, and moving it a degree moves the heat load, emitter
              sizes, air volumes and plant duty with it. <strong>It is what gets reported as a
              fault:</strong> most post-handover complaints about building services are comfort
              complaints - too hot, too cold, draughty, stuffy - and they are rarely plant failures,
              usually distribution, control or radiant problems. <strong>And it is an energy
              trade-off:</strong> every degree of winter overheating and summer overcooling costs
              fuel for the life of the building, and tight comfort bands, overlapping setpoints and
              oversized plant all land on the energy bill.
            </p>
            <p>
              Uncomfortable occupants also defeat the design intent: they open windows mid-heating
              season, bring in personal heaters that load final circuits, and tape over diffusers.
              You cannot make everyone comfortable, and the models say so explicitly - you design
              for the majority, eliminate the local effects that create the loudest complaints, and
              give occupants real control at the margins.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="The Six Comfort Factors"
            plainEnglish="Four things about the room and two things about the person. Miss any one and your assessment of the space is wrong."
          >
            <p>
              Thermal comfort is the condition of mind that expresses satisfaction with the thermal
              environment. It arises when the body can hold its heat balance without significant
              effort from its thermoregulatory system. Six factors govern that balance.
            </p>
            <p>
              <strong>The four environmental factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air temperature (dry-bulb, °C)</strong> - drives convective exchange between
                skin, clothing and air. It is what every thermostat measures and what every occupant
                names, but it is a quarter of the environmental picture.
              </li>
              <li>
                <strong>Mean radiant temperature (°C)</strong> - drives radiant exchange with
                surrounding surfaces. Cold glazing, warm ceilings, radiant panels and direct
                sunlight all move it, and none of them move the air temperature much.
              </li>
              <li>
                <strong>Relative humidity (%)</strong> - governs how readily sweat evaporates. In
                the normal indoor band its effect on sensation is modest; at the extremes it
                dominates.
              </li>
              <li>
                <strong>Air velocity (m/s)</strong> - increases convective and evaporative loss.
                Helpful when the space is warm, a draught complaint when it is not.
              </li>
            </ul>
            <p>
              <strong>The two personal factors:</strong> clothing insulation (clo), the thermal
              resistance of what the occupant is wearing, where 1 clo corresponds approximately to a
              typical business suit; and metabolic rate (met), the heat the occupant generates
              internally, where 1 met corresponds approximately to a person seated at rest.
            </p>
            <p>
              <strong>The factors interacting in practice:</strong> a call centre and a warehouse
              picking area cannot share a design temperature, because the seated operator is near
              1 met and the picker walking with loads is well above it. A church with cold masonry
              is uncomfortable at an air temperature that would be fine in a well-insulated office,
              because radiant conditions differ. A relaxed summer dress code lowers clo, which
              raises the comfortable temperature - a free reduction in cooling energy.
            </p>
            <p>
              <strong>Design consequence:</strong> when a comfort complaint arrives, ask which of
              the six has changed. Very often air temperature is exactly as designed and one of the
              other five has moved.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Mean Radiant Temperature versus Air Temperature"
            plainEnglish="Your skin swaps heat with every surface it can see, not just with the air. Cold windows steal radiant heat even when the air is warm - that is the cold-window complaint in one line."
          >
            <p>
              Air temperature and mean radiant temperature are independent quantities that can
              differ substantially in the same room at the same moment. The body exchanges heat with
              the air by convection and with surrounding surfaces by radiation, and it does not
              distinguish between the two when it reports whether it is comfortable.
            </p>
            <p>
              <strong>What it is:</strong> the uniform temperature of an imaginary enclosure that
              would give the occupant the same net radiant exchange as the real, non-uniform room.
              It represents every surface the occupant can see, weighted by how much of their field
              of view each surface occupies and by surface emissivity.{' '}
              <strong>How it is measured:</strong> with a globe thermometer - a matt black sphere
              with a sensor at its centre. It equilibrates under combined radiant and convective
              exchange, and mean radiant temperature is derived from the globe reading, the air
              temperature and the air velocity. A plain wall thermometer cannot see it.
            </p>
            <p>
              <strong>The cold-window effect:</strong> on a cold day the internal surface of glazing
              sits well below room air temperature - dramatically so for single glazing. An occupant
              near that glass loses net radiant heat to it, and the larger the glazed area and the
              closer the occupant, the stronger the effect. Mean radiant temperature falls,
              operative temperature falls with it, and the occupant feels cold although the
              thermostat is satisfied. The same glass chills the air touching it, adding a cold
              downdraught, so the occupant gets a radiant penalty and a draught together.
            </p>
            <p>
              <strong>The summer mirror image:</strong> direct solar radiation through glazing, and
              internal surfaces that have absorbed solar gain during the day, push mean radiant
              temperature above air temperature. Occupants in a sunlit perimeter zone overheat while
              the internal zone of the same floor plate is comfortable.
            </p>
            <p>
              <strong>Design responses:</strong> improve the glazing so the internal surface runs
              warmer; place emitters under windows so the rising plume offsets the downdraught and
              warms the glass; use radiant systems where the fabric is poor and the volume large;
              and control solar gain at the facade so the summer penalty never enters the space.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Operative Temperature"
            plainEnglish="One number combining what the air is doing and what the surfaces are doing. At normal indoor air speeds it is simply the average of the two."
          >
            <p>
              Operative temperature combines air temperature and mean radiant temperature into the
              temperature the occupant effectively experiences. It is the figure comfort criteria
              are properly expressed against, and the figure you should be designing to.
            </p>
            <p>
              <strong>General form:</strong> a weighted combination of the two, with the weighting
              set by the relative strength of convective and radiant transfer at the body surface.
              As air velocity rises, convection strengthens and the weighting shifts towards air
              temperature.
            </p>
            <p>
              <strong>Practical form:</strong> at the low air velocities typical of occupied indoor
              spaces the two mechanisms are broadly balanced, so{' '}
              <strong>t_op &asymp; (t_air + t_r) / 2</strong>, both in °C. That is accurate enough
              for HNC design work and for diagnosis on site; where air velocity is elevated, weight
              air temperature more heavily.
            </p>
            <p>
              <strong>Worked example 1 - cold perimeter office:</strong> air 22 °C, mean radiant
              18 °C because of large cold glazing, still air.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                t_op = (22 + 18) / 2 = <strong>20 °C</strong>
              </li>
              <li>
                The occupant experiences 20 °C while the thermostat reports 22 °C - that two-degree
                gap is the entire complaint
              </li>
            </ul>
            <p>
              <strong>Worked example 2 - the radiant heating trade:</strong> a workshop with radiant
              panels reaches a mean radiant temperature of 26 °C at an air temperature of 20 °C,
              still air.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                t_op = (20 + 26) / 2 = <strong>23 °C</strong>
              </li>
              <li>
                A convective system would need roughly 23 °C of air for the same result, and
                ventilation and infiltration losses scale with the air-to-outside difference - so
                that 3 K is a permanent saving in a tall, leaky building
              </li>
            </ul>
            <p>
              <strong>Worked example 3 - reading it backwards:</strong> you need 21 °C operative and
              a survey shows mean radiant stuck at 17 °C. Then 21 = (t_air + 17) / 2, so t_air =
              (21 &times; 2) - 17 = <strong>25 °C</strong>. Holding 25 °C of air to compensate for
              cold surfaces is expensive, stratifies badly and feels stuffy - the quantified
              argument for fixing the fabric instead.
            </p>
            <p>
              <strong>Typical UK criteria, qualitatively:</strong> winter operative temperatures for
              sedentary office work sit in the low twenties °C, lower where occupants are active or
              more heavily dressed and higher where they are inactive or lightly dressed. Take the
              specific design figures from CIBSE Guide A for the space type in front of you.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Humidity and Air Movement"
            plainEnglish="Humidity matters less than people think in the middle of the range and a lot at the ends. Air movement is welcome when you are warm and a complaint when you are not."
          >
            <p>
              <strong>Relative humidity</strong> is the moisture in the air as a percentage of what
              the air could hold at that temperature. It governs the evaporative component of the
              body&rsquo;s heat loss - the drier the air, the more readily moisture evaporates from
              skin and respiratory tract.
            </p>
            <p>
              In the mid-range, convection and radiation dominate the heat balance for sedentary
              occupants, so moderate humidity changes barely shift sensation. Too humid and
              evaporation is suppressed: warmth becomes oppressive, and condensation, mould and dust
              mite risk all rise. Too dry and you get eye, skin and throat irritation, static
              discharges, and shrinkage of timber and paper - common in winter when cold outdoor air
              is heated without humidification. Separately, archives, printing, textiles, electronics
              assembly, operating theatres and pool halls have humidity requirements set by the
              contents rather than by the people.
            </p>
            <p>
              <strong>Air velocity</strong> increases convective and evaporative loss. Whether that
              reads as pleasant or unpleasant depends entirely on which side of neutral the occupant
              is.
            </p>
            <p>
              When the space is warm, air movement extends the acceptable range upwards, and ceiling
              and desk fans exploit that at a fraction of the energy of mechanical cooling. When it
              is neutral or cool, the same velocity is perceived as draught - among the most
              frequent complaints in air-conditioned buildings. Turbulence matters as well as mean
              speed, because fluctuating airflow reads as draught far more readily than steady flow
              at the same average velocity, and so does temperature: the cooler the moving air, the
              greater the draught risk at any given velocity.
            </p>
            <p>
              <strong>Design consequence:</strong> occupied-zone velocity is an output you check,
              not an accident of the terminal you happened to specify. Diffuser selection, throw,
              supply air temperature difference and occupied-zone position go together.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Clothing (clo) and Activity (met)"
            plainEnglish="Two numbers describing the person rather than the room. Change either and the comfortable temperature moves, without touching the plant."
          >
            <p>
              <strong>Clothing insulation (clo)</strong> quantifies the thermal resistance between
              skin and environment. The higher the clo value, the less heat escapes for a given
              temperature difference, and the lower the ambient temperature at which the occupant
              stays comfortable.
            </p>
            <p>
              1 clo corresponds approximately to a typical business suit. Light summer indoor
              clothing sits appreciably below that and heavy outdoor winter clothing with an
              overcoat appreciably above it. Clothing is controlled by the occupant and responds to
              season, dress code and the weather that morning - not to your design assumptions.
            </p>
            <p>
              <strong>Metabolic rate (met)</strong> quantifies the heat the occupant generates
              internally, normalised to body surface area. The higher the met, the more heat has to
              be rejected and the cooler the environment needs to be. 1 met corresponds
              approximately to a person seated at rest, and sedentary office work sits close to it.
              Standing, light activity, walking and manual handling progressively raise it, and
              sustained heavy work raises it several-fold - which is why workshops, kitchens, gyms
              and warehouses are designed cooler than offices.
            </p>
            <p>
              <strong>Why this matters commercially:</strong> the personal factors are the cheapest
              levers available. A summer dress code that drops clo lets the cooling setpoint rise
              with no loss of satisfaction and no capital spend. Conversely, specifying a
              temperature suited to seated work and then letting the space be used for active work
              guarantees complaints however good the plant is.
            </p>
            <p>
              <strong>Mixed use is the hard case:</strong> a retail unit contains seated cashiers,
              walking customers in outdoor coats and staff handling stock - three clo and met
              combinations in one volume. No single temperature satisfies all three, so the design
              must zone or manage the compromise deliberately.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="PMV and PPD - The Predicted Comfort Model"
            plainEnglish="Feed the six factors in, get two numbers out: how warm the average person will say the room is, and what percentage will be unhappy. The unhappy percentage never gets below about five."
          >
            <p>
              The PMV/PPD method, set out in BS EN ISO 7730, is the standard analytical approach to
              predicting whole-body thermal comfort. It works from the human heat balance: it
              evaluates the thermal load on the body - the difference between heat produced
              internally and heat actually lost to the environment - and maps that onto a subjective
              sensation scale calibrated against large panels of test subjects.
            </p>
            <p>
              <strong>Inputs - the six factors, no more and no less:</strong> air temperature, mean
              radiant temperature, relative humidity, air velocity, clothing insulation (clo) and
              metabolic rate (met).
            </p>
            <p>
              <strong>Output 1 - PMV, the Predicted Mean Vote,</strong> on a seven-point thermal
              sensation scale:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>-3 cold, -2 cool, -1 slightly cool</li>
              <li>0 neutral - the design optimum</li>
              <li>+1 slightly warm, +2 warm, +3 hot</li>
            </ul>
            <p>
              PMV is the <em>mean</em> vote of a large group in that environment. It is not a
              prediction of what any individual will say, and it is not a measurement - it is a
              calculated index.
            </p>
            <p>
              <strong>Output 2 - PPD, the Predicted Percentage of Dissatisfied,</strong> derived
              directly from PMV:
            </p>
            <p>
              PPD estimates the percentage of a large group who would be dissatisfied with the
              thermal environment. The relationship is symmetrical about neutral - equally too warm
              and equally too cool give the same PPD - and{' '}
              <strong>PPD never falls below about 5%</strong>, even at PMV = 0, because individuals
              differ in physiology, clothing and preference. It rises steeply as PMV moves away from
              zero, so small departures from the design condition produce disproportionate increases
              in complaints.
            </p>
            <p>
              <strong>How it is used:</strong> to set and to verify design internal conditions. Given
              a target PMV band you can work backwards to the combination of operative temperature,
              humidity and air velocity that achieves it for a stated clothing and activity
              assumption - and you record those assumptions, because the answer is meaningless
              without them.
            </p>
            <p>
              <strong>The most common misuse:</strong> quoting a PMV result without stating the clo
              and met values assumed. The same room is comfortable at markedly different
              temperatures for a suited seated occupant and a lightly dressed active one.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Limits of the Model, and Adaptive Comfort"
            plainEnglish="PMV assumes a steady, uniform room and a passive occupant. Real people open windows, take jackets off and get used to the weather - which is what the adaptive approach is for."
          >
            <p>
              PMV/PPD is a powerful design tool resting on assumptions that are not always true.
              Knowing where it stops being valid matters as much as knowing how to use it.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Steady state</strong> - it assumes thermal equilibrium with a stable
                environment, so it does not describe someone who has just come in from outside, or
                a space with rapidly swinging conditions
              </li>
              <li>
                <strong>Uniform environment</strong> - it treats the body as a whole in a uniform
                surround, so asymmetric and local effects are handled separately
              </li>
              <li>
                <strong>Passive occupant</strong> - it assumes fixed clothing and activity, whereas
                real occupants adjust clothing, open windows, close blinds and move position
              </li>
              <li>
                <strong>No adaptation over time</strong> - it does not capture acclimatisation or
                the shift in expectations over a warm or cold spell
              </li>
              <li>
                <strong>Population basis</strong> - it predicts a group mean, so it is least
                reliable for small groups and individuals
              </li>
            </ul>
            <p>
              <strong>The adaptive comfort approach</strong> came from field studies in real
              buildings, which repeatedly found that occupants of naturally ventilated buildings
              accepted a considerably wider range of indoor temperatures than a steady-state model
              predicted, and that the temperature they found comfortable tracked recent outdoor
              conditions.
            </p>
            <p>
              The mechanism is adaptation - behavioural (clothing, windows, blinds, fans, position),
              physiological (acclimatisation) and psychological (expectation, and the sense of
              having control). Control is central: occupants who can act on their environment
              tolerate a far wider range than those who cannot, so a sealed building with no local
              control must be held much closer to the calculated optimum. And the band moves with
              the weather - adaptive criteria express acceptable indoor temperature as a function of
              a running mean of recent outdoor temperature rather than as a fixed number.
            </p>
            <p>
              <strong>Choosing the right tool:</strong> PMV/PPD for closely controlled, mechanically
              conditioned spaces where occupants have little control; an adaptive approach for
              naturally ventilated and mixed-mode buildings where they do. Applying the steady-state
              model to a naturally ventilated building tends to condemn as &ldquo;failing&rdquo; a
              space its occupants are perfectly content with, and can be used to justify
              unnecessary mechanical cooling.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Local Thermal Discomfort"
            plainEnglish="The room can be perfectly neutral overall and still be unbearable at one desk. Four mechanisms cause almost all of it: draught, radiant asymmetry, head-to-ankle gradient, and the floor."
          >
            <p>
              Whole-body indices assess the occupant as a single thermal unit. In practice a large
              share of complaints come from spaces that satisfy the whole-body criterion but subject
              one part of the body to unwanted cooling or heating. These are handled as separate
              criteria in their own right.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Draught - unwanted local cooling by air movement.</strong> Risk rises with
                velocity, turbulence and falling air temperature, and the least clothed neck and
                ankles feel it first. Causes: cold downdraught off glazing, badly selected or
                located diffusers, excessive supply air temperature difference, leaky facades.
                Remedies: cut occupied-zone velocity, raise supply air temperature and increase
                volume, select throw and induction so mixing happens above the occupied zone, put
                emitters under glazing, seal the fabric.
              </li>
              <li>
                <strong>Radiant asymmetry - unequal radiant exchange across the body.</strong> One
                side faces a markedly hotter or colder surface than the other.{' '}
                <strong>A warm ceiling is the least tolerated case</strong>, becoming uncomfortable
                at a smaller asymmetry than any other configuration, which constrains radiant panel
                temperature and mounting height. A cold vertical surface - large glazing, an
                uninsulated wall - is the second common case. Remedies: limit panel temperature and
                raise it higher, improve glazing, add perimeter emitters, avoid seating hard against
                large cold surfaces.
              </li>
              <li>
                <strong>Vertical air temperature difference - warm head, cold feet.</strong> Warm
                air rises, so temperature stratifies with height, and a large head-to-ankle
                difference causes discomfort even when the average is correct. Causes: high-level
                warm air heating, tall spaces, poor mixing, purely convective heating over a cold
                floor. Remedies: underfloor or low-level emitters, destratification fans, floor
                insulation, and displacement ventilation with the gradient explicitly checked.
              </li>
              <li>
                <strong>Floor surface temperature.</strong> Occupants contact the floor through
                footwear, so a floor that is too cold or too warm is a discomfort source in its own
                right. Too cold: uninsulated slabs, unheated screeds over voids, and conductive
                finishes such as stone and tile, which feel colder than carpet at the same
                temperature because they draw heat away faster. Too warm: underfloor heating run
                above its surface temperature limit. Remedies: insulate the slab, respect the
                limit, and account for the finish where people stand still for long periods.
              </li>
            </ul>
            <p>
              <strong>Why this list matters:</strong> when someone reports a problem in a space
              whose average conditions are correct, the answer is almost always one of these four.
              Work through them before you touch a setpoint.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="How Comfort Criteria Drive HVAC Design"
            plainEnglish="Comfort criteria are the top of the chain. They set the internal design conditions, which set the loads, which set the plant, the terminals and the controls."
          >
            <p>
              Comfort is not checked at the end of a design - it is the input at the start. The
              chain runs from criteria to conditions to loads to equipment, and a mistake at the top
              propagates all the way down.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Internal design conditions.</strong> Pick the design operative
                temperature and humidity band per space type from CIBSE Guide A, based on expected
                activity and clothing, and record the clo and met assumptions alongside them -
                without those the numbers cannot be defended. Those figures become the internal
                temperatures in the heat loss and cooling load calculations covered earlier.
              </li>
              <li>
                <strong>2. Emitter type.</strong> Poor fabric, tall volume, intermittent occupancy -
                radiant wins, because it lifts mean radiant temperature without heating the whole
                air volume. Well insulated, normal ceiling height, continuous occupancy - convective
                emitters or air systems are simpler and cheaper. Cold-glazing perimeters need
                perimeter emitters regardless of total load, because the problem is radiant and
                local rather than a shortfall in kilowatts.
              </li>
              <li>
                <strong>3. Terminals and air distribution.</strong> Supply air temperature
                difference and diffuser throw must land the air outside the occupied zone - draught
                complaints are usually a terminal selection failure, not a plant failure.
                Displacement ventilation must be checked against the vertical gradient criterion,
                and radiant panel temperature and mounting height against the warm ceiling asymmetry
                criterion.
              </li>
              <li>
                <strong>4. Zoning and control.</strong> Zone by exposure and use - perimeter and
                internal zones behave completely differently, and so do north and south facades.
                Site the sensor where it represents the occupied zone, not above a photocopier or in
                direct sun. Set a genuine deadband between heating and cooling, because overlapping
                setpoints produce simultaneous heating and cooling that is invisible to occupants
                and enormously expensive. Give occupants local control where you can.
              </li>
            </ul>
            <p>
              <strong>5. The energy trade-off:</strong> every degree of winter and summer setpoint
              carries a lifetime energy cost. Widening the acceptable band - adaptive operation, air
              movement, dress code, occupant control - is usually far cheaper than the plant
              capacity needed to hold a narrow one, and fixing a radiant problem at the fabric beats
              compensating for it with air temperature on both energy and comfort.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The relationships and reference points worth carrying in your head for the exam and for site."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>t_op &asymp; (t_air + t_r) / 2</strong> - operative temperature at low air
                velocity
              </li>
              <li>
                <strong>Six factors</strong> - four environmental plus two personal; all six are PMV
                inputs
              </li>
              <li>
                <strong>PMV scale</strong> - -3 cold to +3 hot, 0 neutral; <strong>PPD</strong> -
                percentage dissatisfied, minimum about 5% at PMV = 0
              </li>
              <li>
                <strong>Four local mechanisms</strong> - draught, radiant asymmetry, vertical
                gradient, floor temperature; a warm ceiling is the least tolerated asymmetry
              </li>
              <li>
                <strong>1 clo</strong> &asymp; a typical business suit; <strong>1 met</strong>{' '}
                &asymp; a person seated at rest
              </li>
              <li>
                <strong>Globe thermometer</strong> - the instrument that gets you mean radiant
                temperature
              </li>
              <li>
                UK winter offices sit in the low twenties °C operative for sedentary work - take the
                exact design figures from CIBSE Guide A
              </li>
            </ul>
            <p>
              <strong>Diagnostic order for a comfort complaint:</strong> measure air and mean radiant
              temperature separately; calculate operative temperature; check occupied-zone velocity;
              check humidity; establish the actual clothing and activity of the occupants; then work
              through the four local mechanisms. Adjust the setpoint last, not first.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Designing to air temperature</strong> - the occupant feels operative
                  temperature; the thermostat does not
                </li>
                <li>
                  <strong>Quoting PMV without the assumptions</strong> - meaningless without the clo
                  and met values behind it
                </li>
                <li>
                  <strong>Stopping at whole-body neutrality</strong> - draught and asymmetry
                  complaints come from spaces the index says are fine
                </li>
                <li>
                  <strong>Raising the setpoint to mask a radiant problem</strong> - expensive,
                  stuffy, stratified, and it never fully works
                </li>
                <li>
                  <strong>Applying steady-state criteria to a naturally ventilated building</strong>{' '}
                  - it condemns spaces occupants are content with and invites unnecessary cooling
                </li>
              </ul>
            }
            doInstead="Design and verify against operative temperature, always record the clo and met assumptions with any comfort figure, accept that PPD has a floor of about 5%, check the four local discomfort mechanisms separately from the whole-body index, fix radiant problems at the fabric or with radiant emitters rather than with hotter air, and choose an adaptive approach for naturally ventilated buildings."
          />

          <SectionRule />

          <Scenario
            title="Diagnosing a comfort complaint in a perimeter office"
            situation={
              <>
                A south-east facing open-plan office generates persistent complaints. Staff along
                the fully glazed perimeter say they are cold all winter morning and overheat on
                sunny afternoons. Staff in the internal zone are content. The BMS trend shows the
                perimeter zone air temperature holding steady at its 22 °C setpoint throughout, and
                the facilities manager has raised the setpoint twice - which made the internal zone
                too warm without silencing the perimeter complaints.
              </>
            }
            whatToDo={
              <>
                Stop adjusting the setpoint: air temperature is doing exactly what it was asked to
                do, so the problem lies in one of the other five factors. Take a globe thermometer
                survey at seated head height along the perimeter and in the internal zone. Expect
                perimeter mean radiant temperature several degrees below air temperature on a cold
                morning - at 22 °C air and 18 °C mean radiant the operative temperature is
                (22 + 18) / 2 = 20 °C, while the internal zone with surfaces near air temperature is
                genuinely at 22 °C. That one calculation explains the split. Then measure velocity
                at ankle level near the glass to confirm cold downdraught, and check whether the
                perimeter emitters are still under the glazing or were relocated during a churn.
                Survey again in sun for the afternoon complaint: mean radiant temperature will now
                sit above air temperature. Remedies in order of effectiveness: control solar gain at
                the facade; improve the glazing; restore perimeter emitters under the glass; and
                split perimeter and internal zones onto separate control with a sensor in each.
                Revisit setpoints last, and against operative temperature.
              </>
            }
            whyItMatters={
              <>
                Every setpoint increase raised consumption across the whole floor and made the
                internal zone uncomfortable while doing almost nothing for the people actually
                complaining, because it addressed the one factor that was not at fault. Diagnosing
                against the six factors, and against operative rather than air temperature,
                identifies the real cause in a single site visit and points at remedies that cost
                less to run, not more.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Six factors govern thermal comfort: four environmental (air temperature, mean radiant temperature, relative humidity, air velocity) and two personal (clothing in clo, metabolic rate in met).',
              'Mean radiant temperature represents radiant exchange with all surrounding surfaces and is independent of air temperature - cold glazing lowers it, solar gain and radiant panels raise it.',
              'Operative temperature combines air and mean radiant temperature; at low air velocity it is approximately their average, and it is what occupants actually experience.',
              'PMV predicts the mean thermal sensation vote of a large group on a seven-point scale from -3 (cold) through 0 (neutral) to +3 (hot).',
              'PPD converts PMV into a predicted percentage dissatisfied and never falls below about 5% - a minority is always dissatisfied.',
              'PMV assumes a steady-state, uniform environment and a passive occupant; the adaptive approach suits naturally ventilated and mixed-mode buildings where occupants have real control.',
              'Local discomfort has four mechanisms: draught, radiant asymmetry (a warm ceiling is the least tolerated), vertical temperature gradient, and floor surface temperature.',
              'Comfort criteria set the internal design conditions, which set the loads, the emitter type, the terminal selection, the zoning and the controls - and every degree carries a lifetime energy cost.',
              'BS EN ISO 7730 provides the analytical method and CIBSE Guide A the UK design criteria - look the specific figures up in the current editions rather than working from memory.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heat loss calculations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Back to section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Heat transfer principles
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section1_7;
