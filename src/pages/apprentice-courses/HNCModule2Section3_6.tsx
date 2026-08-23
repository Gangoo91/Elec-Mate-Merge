/**
 * Module 2 · Section 3 · Subsection 6 — Applications to Air-Conditioning and HVAC Load Calcs
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Capstone for the psychrometrics section: walking a complete air handling unit
 *   as a chain of chart processes — intake, mixing box, filter, preheat, cooling
 *   coil, reheat and fan — plus mixed-air calculations, sensible/latent splits,
 *   economiser and free-cooling changeover logic, winter humidification, and
 *   reading a real AHU schematic against the chart.
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
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'HVAC Load Calculations - HNC Module 2 Section 3.6';
const DESCRIPTION =
  'Apply psychrometrics to a whole air handling unit: mixed-air calculations, cooling coil sensible and latent loads, economiser free-cooling changeover and winter humidification.';

const quickCheckQuestions = [
  {
    id: 'mixed-air-drybulb',
    question:
      'A mixing box takes 25% outside air at 32 °C and 75% return air at 24 °C (by mass). What is the approximate mixed dry-bulb temperature?',
    options: ['28.0 °C', '26.0 °C', '30.0 °C', '24.8 °C'],
    correctIndex: 1,
    explanation:
      'Mixing is a mass-weighted average: t = (0.25 × 32) + (0.75 × 24) = 8 + 18 = 26.0 °C. The mixed state always sits between the two, nearer the larger mass flow — here nearer the return air.',
  },
  {
    id: 'why-coils-dehumidify',
    question: 'Why does a chilled water cooling coil remove moisture as well as heat?',
    options: [
      'Because the fan downstream compresses the air and squeezes moisture out',
      'Because the filter upstream traps water droplets carried in the airstream',
      'Because the effective coil surface temperature is below the entering-air dew point, so vapour condenses on the fins',
      'Because chilled water absorbs water vapour directly through the tube wall',
    ],
    correctIndex: 2,
    explanation:
      'Air touching a surface colder than its own dew point is cooled past saturation, so vapour condenses onto the fins and drains away. If the surface stays above the entering dew point the coil is dry and the process is sensible only — a horizontal move on the chart.',
  },
  {
    id: 'enthalpy-changeover',
    question:
      'Outside air is 21 °C at 14 g/kg (about 57 kJ/kg); return air is 24 °C at 9.3 g/kg (about 48 kJ/kg). What should the economiser do?',
    options: [
      'Open to 100% outside air, because outside dry-bulb is lower than return dry-bulb',
      'Stay at minimum fresh air, because outside air carries more total heat per kilogram than return air',
      'Open to 100% outside air, because the outside moisture content is higher',
      'Switch the cooling coil off, because free cooling is available',
    ],
    correctIndex: 1,
    explanation:
      'This is the classic muggy-day trap. A dry-bulb changeover sees 21 < 24 and opens the dampers, but on an enthalpy basis outside air holds roughly 9 kJ/kg more total heat, so every kilogram admitted adds coil load. Enthalpy changeover keeps the dampers closed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An AHU mixes 30% outside air at 30 °C with 70% return air at 24 °C by mass. The mixed dry-bulb temperature is approximately:',
    options: ['26.4 °C', '25.8 °C', '27.0 °C', '24.9 °C'],
    correctAnswer: 1,
    explanation:
      't = (0.30 × 30) + (0.70 × 24) = 9.0 + 16.8 = 25.8 °C. Moisture content mixes the same way, so both coordinates of the mixed point come from the same mass-weighted average.',
  },
  {
    id: 2,
    question: 'On the psychrometric chart, the state of two mixed airstreams lies:',
    options: [
      'On the saturation curve, midway between the two dew points',
      'Vertically below the warmer of the two state points',
      'On the straight line joining the two state points, nearer the larger mass flow',
      'On the straight line joining the two state points, nearer the smaller mass flow',
    ],
    correctAnswer: 2,
    explanation:
      'Mixing is a lever rule. The mixed point divides the joining line so the segment lengths are in inverse proportion to the mass flows — which places the mixed state nearest the stream contributing the most air.',
  },
  {
    id: 3,
    question: 'A cooling coil dehumidifies only when:',
    options: [
      'The face velocity exceeds 3 m/s',
      'The effective coil surface temperature is below the entering-air dew point',
      'The chilled water return temperature is above the air dry-bulb temperature',
      'The coil has fewer than four rows',
    ],
    correctAnswer: 1,
    explanation:
      'Condensation needs a surface colder than the dew point of the air passing over it. Above that, the coil runs dry and the chart process is a horizontal, sensible-only move to the left.',
  },
  {
    id: 4,
    question:
      'Sensible heating with no moisture added or removed appears on the psychrometric chart as:',
    options: [
      'A vertical move upward at constant dry-bulb',
      'A move along a line of constant wet-bulb temperature',
      'A horizontal move to the right at constant moisture content, with relative humidity falling',
      'A move along the saturation curve',
    ],
    correctAnswer: 2,
    explanation:
      'Moisture content is the vertical axis, so heating without humidification is horizontal. Warmer air can hold more vapour, so the same moisture content now represents a lower percentage of saturation — relative humidity falls.',
  },
  {
    id: 5,
    question:
      'A coil takes 6 kg/s of air and does 81 kW of sensible work and 24 kW of latent work. The sensible heat ratio is approximately:',
    options: ['0.30', '0.77', '3.4', '1.30'],
    correctAnswer: 1,
    explanation:
      'SHR = sensible / total = 81 / (81 + 24) = 81 / 105 = 0.77. The ratio sets the slope of the coil process line and is what tells you whether the coil is mainly cooling or mainly drying.',
  },
  {
    id: 6,
    question:
      'Why does a dehumidifying AHU often need a reheat coil downstream of the cooling coil?',
    options: [
      'To protect the cooling coil from freezing on cold mornings',
      'To raise the moisture content of the supply air back to the room target',
      'Because the air had to be over-cooled to reach a low enough moisture content, and would otherwise be supplied too cold',
      'To increase the air volume flow rate before it enters the ductwork',
    ],
    correctAnswer: 2,
    explanation:
      'Dehumidification is achieved by driving the air down near saturation. That leaves it colder than the required supply temperature, so reheat warms it back up at constant moisture content — a horizontal chart move that costs energy and is worth designing out where possible.',
  },
  {
    id: 7,
    question:
      'A dry-bulb economiser changeover can waste energy on humid days because:',
    options: [
      'Outside air can be cooler yet carry more total heat per kilogram than return air',
      'Dry-bulb sensors drift more than humidity sensors',
      'Outside air always contains more dust on humid days',
      'The dampers cannot modulate below 20% outside air',
    ],
    correctAnswer: 0,
    explanation:
      'Total heat is enthalpy, not temperature. Cool, damp outside air can sit at a higher enthalpy than warmer, drier return air, so admitting it increases the latent load the coil must remove.',
  },
  {
    id: 8,
    question:
      'An adiabatic (evaporative) humidifier moves the air state on the chart approximately:',
    options: [
      'Horizontally to the right at constant moisture content',
      'Vertically upward at constant dry-bulb temperature',
      'Along a line of constant wet-bulb temperature — dry-bulb falls as moisture content rises',
      'Along the saturation curve toward a higher dry-bulb',
    ],
    correctAnswer: 2,
    explanation:
      'The latent heat needed to evaporate the water is drawn from the air itself, so the air cools as it wets. The process follows a line of essentially constant wet-bulb temperature, which is why evaporative humidification is also a cooling technique.',
  },
  {
    id: 9,
    question:
      'A commissioning engineer measures 5 °C outside, 22 °C return and 15 °C in the mixing box, on a unit set to 20% minimum fresh air. The most likely cause is:',
    options: [
      'The supply fan is running too fast',
      'The outside air damper is passing far more air than its setpoint — around 40%',
      'The cooling coil valve has failed open',
      'The return air sensor is reading 5 K high',
    ],
    correctAnswer: 1,
    explanation:
      'Solve the mixing equation for the outside fraction: 15 = 5x + 22(1 − x) → 17x = 7 → x ≈ 0.41. Roughly 41% outside air against a 20% setpoint points to a stuck, disconnected or wrongly linked damper.',
  },
  {
    id: 10,
    question:
      'Winter heating of outside air without humidification typically causes complaints because:',
    options: [
      'The moisture content rises, causing condensation on windows',
      'The moisture content is unchanged but relative humidity falls, giving dry air symptoms',
      'The air becomes denser and harder for the fan to move',
      'The dew point of the supply air rises above room temperature',
    ],
    correctAnswer: 1,
    explanation:
      'Cold outside air holds very little vapour. Heating it is a horizontal chart move: the moisture content stays put while relative humidity drops sharply, producing dry throats, static shocks and shrinking timber unless humidification is added.',
  },
];

const faqs = [
  {
    question: 'In what order should I plot an AHU on the chart?',
    answer:
      'Follow the air. Plot the outside condition and the return condition first, then the mixed state on the line between them. From the mixed point, work left through the cooling coil (or right through the preheat in winter), add any humidification move, then a small horizontal step to the right for supply fan heat gain. The last point you plot is the supply condition — and it has to be capable of absorbing the room load and landing back on the return state.',
  },
  {
    question: 'Does the filter change the air condition?',
    answer:
      'Not measurably in psychrometric terms. A filter removes particulate, not heat or moisture, so the state point does not move. It does add pressure drop, which the fan must overcome — and that fan work reappears downstream as a small temperature rise. Practically the filter is a plant item, not a chart process.',
  },
  {
    question: 'How much does supply fan heat gain move the state point?',
    answer:
      'It is a sensible-only, horizontal move to the right, and for a typical AHU it is a fraction of a degree to around a degree depending on fan pressure and efficiency. It matters most on close-control applications and on systems with a small design supply-to-room temperature difference, where losing a degree of useful cooling to fan heat is a significant proportion of the available capacity.',
  },
  {
    question: 'When is a temperature changeover economiser acceptable?',
    answer:
      'In a dry climate, or on a system where humidity is not controlled and latent load is low, a dry-bulb changeover is simple and robust. Where outside air is frequently cool and damp — much of the UK maritime climate — an enthalpy comparison between outside and return air makes the better decision, at the cost of two humidity sensors that must be kept calibrated. Some systems compromise with a dry-bulb changeover plus a high-humidity lockout.',
  },
  {
    question: 'Why is my supply air near saturation coming off the coil?',
    answer:
      'That is normal for a wet coil. The air is driven toward the effective coil surface condition, which sits on the saturation curve, so off-coil air commonly reads in the region of 90-95% relative humidity. It is not a fault — but it does mean the duct downstream carries air very close to its dew point, so any cold bridge or poorly lagged flange can produce condensation.',
  },
  {
    question: 'Can I use free cooling and mechanical cooling at the same time?',
    answer:
      'Yes, and a well set up sequence does exactly that. When outside air is favourable but not cold enough to hold the supply setpoint on its own, the dampers modulate to 100% outside air and the cooling coil trims the remainder. The failure mode to avoid is the coil and the dampers fighting each other — for example, dampers admitting warm outside air while the coil is at full duty, which is what a badly tuned or mis-sequenced changeover produces.',
  },
];

const HNCModule2Section3_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 6"
            title="Applications to Air-Conditioning and HVAC Load Calcs"
            description="Putting the whole psychrometric toolkit to work on a real air handling unit — mixing, coils, economisers and loads."
            tone="purple"
          />

          <TLDR
            points={[
              'You can walk an AHU from intake to supply grille as a chain of psychrometric processes, and draw the whole sequence as one path across the chart.',
              'You calculate the mixed-air state from outside and return conditions by mass-weighted average, and reverse the calculation to prove a damper position on site.',
              'You split a coil duty into sensible and latent components, and explain why the split — not the total — drives coil selection.',
              'You explain economiser and free-cooling changeover, and why an enthalpy comparison beats a dry-bulb comparison in a damp maritime climate.',
              'You diagnose real complaints — dripping ductwork, a stuck economiser, a coil that cannot hold humidity — by reading the plant against the chart.',
            ]}
          />

          <RegsCallout
            source="CIBSE design guidance for air-conditioning and air handling"
            clause="General UK building services practice for air handling unit configuration, coil duties, free cooling and the internal design conditions against which those duties are calculated."
            meaning={
              <>
                CIBSE publishes the design guidance the UK industry works to for AHU
                configuration, coil selection and control strategy, and it is the body of
                guidance a design is normally judged against at review. Always work from the
                current edition in front of you rather than a remembered figure, and record
                in the design file which edition and which internal design conditions your
                load calculation assumed — that record is what makes the calculation
                auditable when the plant is challenged in year one.
              </>
            }
            cite="Source: CIBSE design guidance for air-conditioning, air handling and building control systems — consult the current edition."
          />

          <LearningOutcomes
            outcomes={[
              'Map each AHU component onto its psychrometric process',
              'Calculate mixed-air conditions from mass flow proportions',
              'Explain why cooling coils dehumidify, using the coil surface condition',
              'Separate sensible and latent coil loads and calculate sensible heat ratio',
              'Evaluate economiser and free-cooling changeover decisions',
              'Size winter preheat and humidification duties',
              'Diagnose plant faults by comparing measured states with the chart',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="The AHU as a chain of chart processes"
            plainEnglish="An air handling unit is not one mysterious box. It is four or five simple chart moves in a row, and if you can draw each one you can size the whole unit."
          >
            <p>
              Everything in the previous five subsections was a single process in isolation.
              A real air handling unit strings those processes together in a fixed order, and
              the state of the air leaving one component is the state entering the next. Draw
              them end to end and the AHU becomes one continuous path across the chart, from
              the outside condition to the supply grille.
            </p>
            <p>
              <strong>The standard mixing AHU, in order:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Outside air intake:</strong> the starting state. It is a design
                assumption in the calculation and a moving target in operation, which is why
                summer and winter cases are calculated separately.
              </li>
              <li>
                <strong>Mixing box:</strong> outside air meets return air. The mixed state
                lands on the straight line between the two state points. This is the one place
                in the unit where two paths become one.
              </li>
              <li>
                <strong>Filter:</strong> no move on the chart. It removes particulate, not heat
                or moisture. It does add resistance, which the fan pays for and which returns
                downstream as heat.
              </li>
              <li>
                <strong>Preheat coil:</strong> a horizontal move to the right. Sensible only,
                no moisture change, relative humidity falls. Its job in winter is frost
                protection for the plant behind it as much as comfort.
              </li>
              <li>
                <strong>Cooling coil:</strong> a move down and to the left, angling toward the
                saturation curve whenever the coil surface is below the entering dew point.
                Both temperature and moisture content fall.
              </li>
              <li>
                <strong>Humidifier:</strong> a move upward. Steam injection is near vertical
                with a slight temperature rise; an evaporative or adiabatic humidifier tracks a
                line of constant wet-bulb, so the air cools as it wets.
              </li>
              <li>
                <strong>Reheat coil:</strong> a horizontal move to the right again, correcting
                air that was deliberately over-cooled to strip moisture out of it.
              </li>
              <li>
                <strong>Supply fan:</strong> a small horizontal move to the right. Fan work
                becomes heat in the airstream, typically a fraction of a degree to about a
                degree.
              </li>
            </ul>
            <p>
              <strong>The closing check:</strong> the supply state must be able to absorb the
              room sensible and latent gains and arrive back at the return state. If the path
              you have drawn does not close, either the supply condition or the air volume is
              wrong — and the chart will show you which.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="The mixing box and the lever rule"
            plainEnglish="Two airstreams meet and the answer sits on the line between them. Work out the mass fractions and you have both the temperature and the moisture content of the mixture in one step."
            onSite={
              <>
                Mixing-box temperature is one of the few numbers you can take on site with a
                single probe and turn straight into a damper position. It is the fastest
                honesty check there is on an economiser.
              </>
            }
          >
            <p>
              When two airstreams of the same total pressure combine, mass and energy are both
              conserved. Because moisture content and specific enthalpy are both defined per
              kilogram of dry air, both mix as a straight mass-weighted average:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ṁ_mix = ṁ₁ + ṁ₂</li>
              <li>g_mix = (ṁ₁g₁ + ṁ₂g₂) / ṁ_mix</li>
              <li>h_mix = (ṁ₁h₁ + ṁ₂h₂) / ṁ_mix</li>
              <li>t_mix ≈ (ṁ₁t₁ + ṁ₂t₂) / ṁ_mix — very nearly exact for HVAC conditions</li>
            </ul>
            <p>
              <strong>On the chart:</strong> join the two state points with a straight line. The
              mixed state lies on that line, dividing it so that the two segment lengths are in
              inverse proportion to the mass flows. In plain terms, the mixture sits nearest the
              stream that contributes the most air. Twenty per cent outside air on a winter
              morning barely drags the mixed point away from the return condition; a hundred per
              cent outside air puts the mixed point exactly on the intake state.
            </p>
            <p>
              <strong>Why temperature mixing is only almost linear:</strong> enthalpy and
              moisture content mix exactly linearly, and dry-bulb temperature is recovered from
              those two. The small cross-term in the enthalpy relationship means the temperature
              average is a very close approximation rather than an identity — for the ranges seen
              in comfort HVAC the difference is a few hundredths of a degree, well inside chart
              reading accuracy. Use the linear form with confidence; just do not present it as
              exact in an exam answer that asks you to justify it.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Why a cooling coil dehumidifies"
            plainEnglish="If the fins are colder than the air's dew point, water condenses on them. That is the whole mechanism — and it is why the coil process line bends down toward saturation instead of running flat."
          >
            <p>
              A cooling coil does not choose to dehumidify. Whether it does or not falls out of
              one comparison: the effective surface temperature of the coil against the dew
              point of the air entering it.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Surface above the entering dew point — a dry coil.</strong> Air is cooled
                but no vapour condenses. Moisture content is unchanged, so the chart move is
                horizontal to the left and relative humidity rises. All the duty is sensible.
              </li>
              <li>
                <strong>Surface below the entering dew point — a wet coil.</strong> Air in contact
                with the fins is cooled past saturation, vapour condenses, and the condensate runs
                to the drain pan. Moisture content falls, so the move is down and to the left.
                Duty is now part sensible and part latent.
              </li>
            </ul>
            <p>
              <strong>The effective surface condition:</strong> the coil surface is not one
              uniform temperature, so we characterise it with a single equivalent point on the
              saturation curve — the apparatus dew point covered in the previous subsection. It
              is the state the air would reach if every particle of it touched the coil. Real air
              does not: some passes through the fin gaps barely altered, so the off-coil state
              sits on the line between entering air and that surface condition, short of
              saturation.
            </p>
            <p>
              <strong>What this means in practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Off-coil air from a wet coil typically reads high on the humidity sensor, often in
                the region of 90-95% relative humidity. That is expected, not a fault.
              </li>
              <li>
                Raising the chilled water temperature to save energy raises the surface condition
                — and can push a wet coil dry, at which point the unit stops controlling humidity
                altogether.
              </li>
              <li>
                Dehumidification is only reliable while the surface stays below the entering dew
                point. At part load, with a modulating valve, that condition can quietly stop
                being true.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Sensible and latent load — and why the split matters"
            plainEnglish="Total duty tells you how big the chiller is. The sensible-to-latent split tells you whether the coil you picked can actually hold the room condition."
          >
            <p>
              Two coils can carry identical total duty and behave completely differently, because
              duty divides into two parts that the chart keeps strictly separate:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensible load</strong> — the horizontal component. Temperature change at
                constant moisture: Q̇ₛ = ṁ × cp × Δt, with cp taken as about 1.02 kJ/kg·K for
                moist air.
              </li>
              <li>
                <strong>Latent load</strong> — the vertical component. Moisture change at constant
                temperature: Q̇ₗ = ṁ × Δg × h_fg, with the latent heat of vaporisation around
                2450 kJ/kg at comfort conditions.
              </li>
              <li>
                <strong>Total load</strong> — the whole diagonal, read straight off the chart as
                an enthalpy difference: Q̇ₜ = ṁ × Δh. This is the reliable one, because it needs
                no assumption about cp or h_fg.
              </li>
              <li>
                <strong>Sensible heat ratio</strong> — SHR = Q̇ₛ / Q̇ₜ. It is the slope of the
                process line, and it is the number that has to match between the room and the
                coil.
              </li>
            </ul>
            <p>
              <strong>Where the two loads come from:</strong> sensible gains are solar, fabric,
              lighting, equipment and the sensible part of occupancy. Latent gains are almost
              entirely people, infiltration of humid outside air, and any wet process — kitchens,
              pools, showers, laboratory washing. A dense meeting room is a latent problem; a
              south-facing glazed office at midday is a sensible one.
            </p>
            <p>
              <strong>The selection consequence:</strong> if the room needs an SHR of 0.75 and the
              coil you selected delivers 0.90, the coil is not removing enough moisture. Room
              temperature will hold and humidity will drift upward until occupants complain of
              stuffiness while the thermostat insists everything is fine. Fixing it means a colder
              surface condition — lower chilled water temperature, or a deeper coil — not a bigger
              total duty.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Economisers and free cooling"
            plainEnglish="When outside air is better than the air you already have, use more of it. The whole design problem is defining 'better' — and dry-bulb alone is not good enough in Britain."
          >
            <p>
              An economiser is nothing more than a modulating damper set: outside air, return air
              and exhaust, driven together so that the fresh-air proportion varies between a
              ventilation minimum and a hundred per cent. When conditions are right, moving the
              dampers open substitutes free outside air for mechanical cooling, and the coil
              valve closes down or shuts.
            </p>
            <p>
              <strong>The changeover decision:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dry-bulb changeover:</strong> compare outside dry-bulb with return
                dry-bulb, or with a fixed high limit. Cheap, robust, only needs temperature
                sensors. Its weakness is that it is blind to moisture.
              </li>
              <li>
                <strong>Enthalpy changeover:</strong> compare outside specific enthalpy with
                return specific enthalpy. This is the correct comparison, because enthalpy is
                total heat — sensible and latent together — and total heat is exactly what the
                coil has to remove. It needs a humidity sensor on both airstreams and those
                sensors must stay calibrated to be worth having.
              </li>
              <li>
                <strong>Dry-bulb with humidity lockout:</strong> the common compromise. Use the
                temperature comparison, but inhibit free cooling above an outside humidity or
                dew-point threshold.
              </li>
            </ul>
            <p>
              <strong>Why enthalpy wins in the UK:</strong> a maritime climate produces long
              spells of cool, damp air. Outside air at 21 °C and high moisture content can be
              three degrees cooler than the return air and still carry more total heat per
              kilogram. Open the dampers on the dry-bulb reading and the coil load goes up, not
              down — the unit works harder to remove the moisture you just invited in. The
              enthalpy comparison sees it and keeps the dampers at minimum.
            </p>
            <p>
              <strong>Three conditions worth separating in the sequence:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Full free cooling:</strong> outside air is favourable and cold enough to
                hold the supply setpoint on its own. Dampers modulate to hold supply temperature;
                the coil is off.
              </li>
              <li>
                <strong>Integrated free cooling:</strong> outside air is favourable but not cold
                enough alone. Dampers go fully open and the coil trims the remainder. This is the
                mode most often missing from a poorly written sequence.
              </li>
              <li>
                <strong>Minimum fresh air:</strong> outside air is unfavourable on the chosen
                comparison. Dampers return to the ventilation minimum and the coil does the work.
              </li>
            </ul>
            <p>
              <strong>Never below the ventilation minimum:</strong> whatever the energy logic
              says, the fresh-air rate required for occupants is a floor, not a variable. An
              economiser sequence may open above it freely; it may never close below it while the
              space is occupied.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Winter operation — preheat, frost and humidification"
            plainEnglish="Cold air is dry air. Heat it and it gets drier still, because heating moves you sideways on the chart and never upward."
          >
            <p>
              Winter is a different chart problem from summer, and it is the one most often
              underestimated. Outside air near freezing holds very little vapour. Warming it is a
              purely horizontal move: the moisture content does not change, but the saturation
              capacity of the air roughly doubles for every ten degrees or so of heating, so
              relative humidity collapses.
            </p>
            <p>
              <strong>Preheat coil duties:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Lift the intake to a safe temperature before it reaches anything that can freeze
                — a wet cooling coil left full of water, a humidifier, a wet filter, a heat
                recovery device.
              </li>
              <li>
                Give the downstream humidifier warm enough air to absorb the moisture it is asked
                to add. Cold air simply cannot take it.
              </li>
              <li>
                Carry frost protection independent of the temperature control loop — a frost
                thermostat that shuts the unit down and drives the valve open regardless of what
                the sequence wants.
              </li>
            </ul>
            <p>
              <strong>Humidification methods on the chart:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Steam injection:</strong> near-vertical move upward, with a very small
                temperature rise from the superheat in the steam. Fast, controllable, hygienically
                straightforward, energy-hungry.
              </li>
              <li>
                <strong>Evaporative or adiabatic:</strong> the air supplies the latent heat itself,
                so it cools as it wets. The move follows a line of essentially constant wet-bulb
                temperature, up and to the left. Cheap to run, needs more preheat upstream, and
                needs disciplined water hygiene.
              </li>
            </ul>
            <p>
              <strong>Sizing the moisture:</strong> the humidifier duty is a mass flow of water,
              not a temperature. ṁ_water = ṁ_air × Δg, with Δg in kilograms of moisture per
              kilogram of dry air. Multiply by 3600 to quote it in kg/h, which is how humidifiers
              are scheduled and sold.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Reading an AHU schematic against the chart"
            plainEnglish="Get the schematic, walk it left to right, and write the state at every arrow. If two adjacent states disagree with the component between them, you have found something."
          >
            <p>
              A schematic tells you what the plant contains. The chart tells you what it can do.
              Reading one against the other is the core professional skill this whole section has
              been building toward, and the method does not change from job to job.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Identify the fixed points.</strong> Outside design condition and room
                or return condition. Everything else is derived.
              </li>
              <li>
                <strong>2. Note the fresh-air proportion.</strong> From the schedule at design, or
                from the damper position on site. Plot the mixed state.
              </li>
              <li>
                <strong>3. Walk the components left to right.</strong> Each one is one chart move
                of a known shape — horizontal, diagonal toward saturation, vertical, or along a
                wet-bulb line.
              </li>
              <li>
                <strong>4. Mark every sensor on the schematic onto the chart.</strong> Off-coil
                temperature, supply temperature, return humidity. Those are the points you can
                actually measure, and therefore the points where the design can be tested.
              </li>
              <li>
                <strong>5. Close the loop.</strong> Supply state plus room gains should equal the
                return state. If it does not close, list the possible reasons before touching
                anything — wrong air volume, wrong fresh-air proportion, a coil not achieving its
                schedule, or a sensor lying to you.
              </li>
            </ul>
            <p>
              <strong>What a schematic will not tell you:</strong> whether the coil surface is
              actually below the entering dew point at part load, whether the economiser damper
              linkage is intact, and whether the sensors are calibrated. All three are chart
              questions answered with a probe, not drawing-office questions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Six calculations in sequence, all on the same unit: mix it, cool it, split the load, reheat it, decide the economiser, then do the winter case."
          >
            <p>
              <strong>Note on precision:</strong> chart values below are read to about 0.5 °C and
              0.2 g/kg, which is realistic for hand plotting. Where a figure is a chart reading it
              is quoted as approximate. Small closure errors between the total duty and the sum of
              sensible plus latent are a consequence of that reading accuracy, not an error in the
              method.
            </p>
            <p>
              <strong>Example 1: Summer mixed-air state.</strong> An AHU handles 6 kg/s total, of
              which 30% is outside air. Outside is 30 °C at approximately 12 g/kg (about 61
              kJ/kg); return is 24 °C at approximately 9.3 g/kg (about 48 kJ/kg). Find the mixed
              state.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mass flows: outside 0.30 × 6 = 1.8 kg/s; return 0.70 × 6 = 4.2 kg/s</li>
              <li>Temperature: t = (0.30 × 30) + (0.70 × 24) = 9.0 + 16.8 = <strong>25.8 °C</strong></li>
              <li>
                Moisture: g = (0.30 × 12) + (0.70 × 9.3) = 3.6 + 6.51 ={' '}
                <strong>10.1 g/kg</strong>
              </li>
              <li>
                Enthalpy: h = (0.30 × 61) + (0.70 × 48) = 18.3 + 33.6 ={' '}
                <strong>51.9 kJ/kg</strong> (approximately 52 kJ/kg)
              </li>
              <li>
                Chart check: the point 25.8 °C, 10.1 g/kg does read at approximately 52 kJ/kg, so
                the three answers are consistent — always worth the ten seconds it takes.
              </li>
            </ul>
            <p>
              <strong>Example 2: Cooling coil duty and the sensible/latent split.</strong> The
              mixed air from Example 1 (6 kg/s at 25.8 °C, 10.1 g/kg, about 52 kJ/kg) leaves the
              coil at approximately 12.5 °C and 8.5 g/kg, which reads at about 34 kJ/kg.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Total duty: Q̇ₜ = ṁ × Δh = 6 × (52 − 34) = 6 × 18 = <strong>108 kW</strong>
              </li>
              <li>
                Sensible: Q̇ₛ = ṁ × cp × Δt = 6 × 1.02 × (25.8 − 12.5) = 6 × 1.02 × 13.3 ={' '}
                <strong>81.4 kW</strong>
              </li>
              <li>
                Latent: Q̇ₗ = ṁ × Δg × h_fg = 6 × 0.0016 × 2450 = 6 × 3.92 ={' '}
                <strong>23.5 kW</strong>
              </li>
              <li>
                Closure check: 81.4 + 23.5 = 104.9 kW against 108 kW total — about 3% apart, which
                is chart reading tolerance on the two enthalpy values.
              </li>
              <li>
                SHR = Q̇ₛ / Q̇ₜ = 81.4 / 108 ≈ <strong>0.75</strong>, or 0.78 if taken against the
                summed total of 104.9 kW. The spread between those two answers is the chart
                tolerance made visible — roughly three-quarters of the coil duty is sensible and
                about one quarter is drying the air.
              </li>
              <li>
                Note the off-coil state: 8.5 g/kg at 12.5 °C sits very close to the saturation
                curve, around 94% relative humidity. That is a wet coil doing its job.
              </li>
            </ul>
            <p>
              <strong>Example 3: Reheat penalty.</strong> The 12.5 °C off-coil air is too cold to
              supply directly; the design supply temperature is 16 °C. Find the reheat duty.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q̇ = ṁ × cp × Δt = 6 × 1.02 × (16 − 12.5) = 6 × 1.02 × 3.5</li>
              <li>
                Q̇ = <strong>21.4 kW</strong>
              </li>
              <li>
                Moisture content is unchanged at 8.5 g/kg — reheat is a purely horizontal move.
                Relative humidity falls from about 94% to roughly three-quarters.
              </li>
              <li>
                <strong>The lesson:</strong> that 21.4 kW of heating is spent undoing cooling you
                already paid for. Simultaneous heating and cooling is the single most common
                energy waste in air conditioning, which is why supply air reset, dual-path units
                and desiccant options are all worth examining before accepting a reheat-heavy
                design.
              </li>
            </ul>
            <p>
              <strong>Example 4: Economiser changeover — the muggy-day trap.</strong> Return air
              is 24 °C at 9.3 g/kg (about 48 kJ/kg). Compare two outside conditions on the same 6
              kg/s unit.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Case A — outside 21 °C at 14 g/kg, about 57 kJ/kg.</strong> Dry-bulb says
                open: 21 &lt; 24. Enthalpy says do not: 57 &gt; 48.
              </li>
              <li>
                Penalty if the dampers open to 100%: 6 × (57 − 48) = 6 × 9 ={' '}
                <strong>54 kW of additional coil load</strong>, most of it latent.
              </li>
              <li>
                <strong>Case B — outside 14 °C at 7 g/kg, about 32 kJ/kg.</strong> Dry-bulb says
                open and enthalpy agrees: 32 &lt; 48. Both comparisons point the same way.
              </li>
              <li>
                Saving at 100% outside air: 6 × (48 − 32) = 6 × 16 ={' '}
                <strong>96 kW of coil load avoided</strong>.
              </li>
              <li>
                <strong>Conclusion:</strong> the two strategies agree in Case B and disagree in
                Case A. The disagreement costs 54 kW every hour the sequence gets it wrong, which
                is the whole business case for enthalpy changeover or a humidity lockout.
              </li>
            </ul>
            <p>
              <strong>Example 5: Winter mixed state and the humidity problem.</strong> The same
              unit runs at 15% fresh air on a winter morning. Outside is −2 °C at approximately
              3.3 g/kg; return is 22 °C at approximately 7.5 g/kg.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Temperature: t = (0.15 × −2) + (0.85 × 22) = −0.3 + 18.7 ={' '}
                <strong>18.4 °C</strong>
              </li>
              <li>
                Moisture: g = (0.15 × 3.3) + (0.85 × 7.5) = 0.495 + 6.375 ={' '}
                <strong>6.9 g/kg</strong>
              </li>
              <li>
                Now heat that mixed air to a 30 °C supply for a heating-mode unit. The move is
                horizontal, so g stays at 6.9 g/kg while the saturation capacity at 30 °C is
                roughly 27 g/kg.
              </li>
              <li>
                Resulting relative humidity ≈ 6.9 / 27 ≈ <strong>25%</strong> — dry enough to
                generate complaints about throats, static and shrinking joinery.
              </li>
              <li>
                Humidification duty to lift the supply from 6.9 g/kg to a 9.0 g/kg target:
                ṁ_water = 6 × (0.0090 − 0.0069) = 6 × 0.0021 = 0.0126 kg/s
              </li>
              <li>
                In scheduling units: 0.0126 × 3600 = <strong>approximately 45 kg/h</strong> of
                moisture. That is the number that goes on the humidifier schedule.
              </li>
            </ul>
            <p>
              <strong>Example 6: Proving a damper position on site.</strong> A commissioning
              engineer measures 5 °C outside, 22 °C in the return and 15 °C in the mixing box, on
              a unit whose minimum fresh air is set to 20%. What is the actual outside-air
              fraction?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Let x be the outside-air mass fraction: 15 = 5x + 22(1 − x)</li>
              <li>15 = 5x + 22 − 22x → 15 − 22 = −17x → −7 = −17x</li>
              <li>
                x = 7 / 17 = <strong>0.41, i.e. about 41% outside air</strong>
              </li>
              <li>
                Verify: (0.41 × 5) + (0.59 × 22) = 2.05 + 12.98 = 15.03 °C ✓
              </li>
              <li>
                <strong>Interpretation:</strong> the unit is drawing roughly twice its minimum
                fresh air. Look for a stuck or disconnected damper linkage, a reversed actuator, a
                damper commanded from the wrong output, or a return damper that is not closing.
                The heating bill is paying for the difference.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The handful of relationships and sanity checks that cover almost every AHU question you will be asked."
          >
            <p>
              <strong>Equations that do the work:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>t_mix = (ṁ₁t₁ + ṁ₂t₂) / ṁ_total</strong> — mixed state, same form for g
                and h
              </li>
              <li>
                <strong>Q̇ₜ = ṁ × Δh</strong> — total duty, the reading to trust
              </li>
              <li>
                <strong>Q̇ₛ = ṁ × cp × Δt</strong> — sensible component, cp ≈ 1.02 kJ/kg·K moist
                air
              </li>
              <li>
                <strong>Q̇ₗ = ṁ × Δg × h_fg</strong> — latent component, h_fg ≈ 2450 kJ/kg
              </li>
              <li>
                <strong>SHR = Q̇ₛ / Q̇ₜ</strong> — the slope that must match room to coil
              </li>
              <li>
                <strong>ṁ_water = ṁ_air × Δg</strong> — humidifier duty, × 3600 for kg/h
              </li>
            </ul>
            <p>
              <strong>Chart shapes to recognise instantly:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Horizontal right — sensible heating, preheat, reheat, fan gain</li>
              <li>Horizontal left — sensible cooling on a dry coil</li>
              <li>Down and left toward saturation — cooling with dehumidification</li>
              <li>Near vertical up — steam humidification</li>
              <li>Up and left along a wet-bulb line — evaporative or adiabatic humidification</li>
              <li>Straight line between two points — mixing</li>
            </ul>
            <p>
              <strong>Sanity checks before you sign anything:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Does sensible plus latent add back to total within chart reading tolerance? If it
                is out by more than a few per cent, one of the state points is misread.
              </li>
              <li>
                Is the off-coil state below the saturation curve and not on top of it? A point
                plotted above saturation is physically impossible and means an arithmetic slip.
              </li>
              <li>
                Does the mixed point lie between the two source states? If it does not, the mass
                fractions are the wrong way round.
              </li>
              <li>
                Does the supply state, plus the room gains, land back on the return state? If not,
                the design does not close.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Mixing by volume flow instead of mass flow:</strong> at very different
                  temperatures the densities differ enough to shift the mixed point
                </li>
                <li>
                  <strong>Sizing a coil on total duty alone:</strong> ignores the SHR, and the
                  space ends up warm-and-dry or cool-and-clammy
                </li>
                <li>
                  <strong>Dry-bulb economiser changeover on a humid site:</strong> imports latent
                  load and increases coil duty
                </li>
                <li>
                  <strong>Heating outside air in winter with no humidification:</strong> relative
                  humidity collapses because the chart move is horizontal
                </li>
                <li>
                  <strong>Forgetting fan heat gain:</strong> small, but it eats into a small
                  supply-to-room temperature difference
                </li>
                <li>
                  <strong>Quoting chart readings to two decimal places:</strong> a hand-plotted
                  point is not that precise, and false precision hides real error
                </li>
              </ul>
            }
            doInstead="Work in mass flow throughout, size coils on the sensible/latent split rather than total duty alone, use an enthalpy comparison or a humidity lockout for economiser changeover, check winter relative humidity after every heating move, include fan gain in the supply state, and quote chart-derived answers to a sensible number of figures with the reading tolerance stated."
          />

          <SectionRule />

          <Scenario
            title="The coil that trades sensible for latent on a humid day"
            situation={
              <>
                A city-centre open-plan office holds temperature perfectly in July but occupants
                report the air feeling heavy and clammy by mid-afternoon. The BMS shows the supply
                temperature on setpoint and the cooling valve modulating around 60% — nothing is
                alarming. Return humidity, when you finally plot it, has drifted well above the
                design intent.
              </>
            }
            whatToDo={
              <>
                Measure and plot four states: outside, return, mixed and off-coil. Check whether
                the off-coil state is near the saturation curve. If it is well clear of it, the
                coil surface is no longer below the entering dew point and the coil has gone dry —
                it is delivering sensible cooling only. Check the chilled water flow temperature
                against design, and check whether a valve authority or part-load control issue is
                letting the surface warm up. Compare the delivered SHR with the SHR the room
                actually needs.
              </>
            }
            whyItMatters={
              <>
                A thermostat cannot see this fault, because temperature is being held. Only the
                chart shows it. Raising chilled water temperature is a popular energy-saving
                measure and it can silently disable humidity control, converting a compliant
                design into a comfort complaint with no alarm anywhere in the system.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="The economiser that never moved"
            situation={
              <>
                A school AHU is running heating well into mild spring weather, and the site
                manager is querying the gas bill. Outside is 12 °C, return is 21 °C, and the
                mixing box reads 20 °C. The BMS graphic shows the economiser commanded to 100%
                outside air.
              </>
            }
            whatToDo={
              <>
                Reverse the mixing calculation. With outside at 12 °C and return at 21 °C, a true
                100% outside-air position would put the mixing box at 12 °C, and even minimum
                fresh air of 20% would give about 19.2 °C. A reading of 20 °C corresponds to
                roughly 11% outside air — the damper is barely open, whatever the graphic claims.
                Go and look at the linkage, the actuator, and whether the sensor sits in a
                stratified pocket rather than in the mixed stream.
              </>
            }
            whyItMatters={
              <>
                Free cooling is one of the highest-value control strategies in a building, and it
                fails silently. Nothing alarms, nothing overheats, and the only symptom is a bill.
                The mixing calculation turns a three-probe measurement into proof, and proof is
                what gets a defective actuator replaced under warranty.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Condensation complaints on a new ductwork run"
            situation={
              <>
                Occupants report drips from a ceiling grille and staining on the plasterboard
                beneath a duct run crossing an unconditioned ceiling void. The AHU is a
                dehumidifying unit with off-coil air at about 12 °C, close to saturation. The void
                is warm and humid.
              </>
            }
            whatToDo={
              <>
                Plot the void air condition and read its dew point. Compare that dew point with
                the surface temperature of the duct, which will sit close to the air temperature
                inside it. If the duct skin is below the void dew point, moisture condenses on the
                outside of the duct — the fault is insulation and vapour control, not the AHU.
                Check the specification of the lagging, its continuity at hangers and flanges, and
                the integrity of the vapour barrier, then check whether the void itself is being
                ventilated with unconditioned humid air.
              </>
            }
            whyItMatters={
              <>
                Off-coil air near saturation is the intended output of a dehumidifying coil, so
                the AHU is behaving correctly. Chasing the plant wastes weeks. The chart identifies
                in minutes that the problem is a surface below a dew point, which reframes it as a
                fabric and insulation defect with a completely different remedy and a completely
                different party responsible.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'An AHU is a chain of chart processes — mix, filter (no move), preheat, cool, humidify, reheat, fan gain — drawn as one continuous path.',
              'Mixed air lands on the straight line between the two state points, positioned by mass flow: t, g and h all mix as mass-weighted averages.',
              'Reversing the mixing calculation from three temperature readings proves the real damper position on site.',
              'A cooling coil dehumidifies only while its effective surface condition is below the entering-air dew point; above it, the coil runs dry and humidity control stops.',
              'Total duty Q̇ = ṁ × Δh is the reliable figure; the sensible/latent split and SHR are what determine whether the coil can hold the room condition.',
              'Reheat after over-cooling is a horizontal move that undoes cooling already paid for — design it out where the application allows.',
              'Economiser changeover on dry-bulb alone imports latent load on cool, damp days; enthalpy comparison or a humidity lockout makes the correct decision.',
              'Heating cold outside air is horizontal on the chart, so winter relative humidity collapses unless moisture is deliberately added.',
              'Humidifier duty is a water mass flow: ṁ_water = ṁ_air × Δg, quoted in kg/h for scheduling.',
              'Quote chart-derived answers with their reading tolerance — a small closure error between total and sensible-plus-latent is expected, not a mistake.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cooling and Heating Coils
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Psychrometrics and air properties
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section3_6;
