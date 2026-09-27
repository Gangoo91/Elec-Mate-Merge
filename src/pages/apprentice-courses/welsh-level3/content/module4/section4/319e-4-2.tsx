/**
 * Unit 319E · Criterion 4.2 — The operating principles, types, limitations and
 * applications of luminaires.
 *
 * Approach: the criterion asks for operating principles first, so the page opens
 * with how a source actually makes light — the forward-biased semiconductor
 * junction — before moving to the families of luminaire, how they are classified
 * by light distribution, what limits each one in service, and where each is
 * applied. Emergency luminaires are treated as their own application.
 *
 * Every technical fact, figure and standard reference on this page is taken from
 * the existing published teaching in this course on lighting principles and on
 * electronic components and semiconductors (level3/module3/section6/Sub4.tsx and
 * level3/module3/section6/Sub3.tsx).
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

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
  VideoCard,
} from '@/components/study-centre/learning';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { videos } from '@/data/study-centre/video-library';

const quizQuestions = [
  {
    id: 1,
    question: 'An LED produces light when it is:',
    options: [
      'Forward biased — anode positive, cathode negative — so the junction conducts',
      'Reverse biased above its breakdown voltage',
      'Connected across an AC supply with no polarity',
      'Heated by the current passing through a filament',
    ],
    correctAnswer: 0,
    explanation:
      'An LED is a diode. Forward bias (anode +, cathode −) makes the junction conduct past its forward voltage drop and emit light. Reverse biased it simply blocks.',
  },
  {
    id: 2,
    question: 'Typical forward voltage of an LED:',
    options: ['1.8–3.4 V depending on colour', '0.3 V for every colour', '12 V', '230 V'],
    correctAnswer: 0,
    explanation:
      'Red is around 1.8 V, green around 2.2 V, blue and white around 3.0–3.4 V. Shorter wavelengths need a higher forward voltage.',
  },
  {
    id: 3,
    question: 'Why does every mains LED luminaire contain a driver?',
    options: [
      'Because an LED is a current-driven device — a few hundred millivolts above its forward voltage sends current up exponentially and kills it',
      'Because the LED needs to be fed with 230 V AC directly',
      'Because the driver raises the colour rendering index of the light source',
      'Because BS EN 12464-1 sets a maximum luminaire mass',
    ],
    correctAnswer: 0,
    explanation:
      'LEDs are driven by current, not voltage. The driver takes 230 V AC and delivers a precisely controlled DC current to the LED string. It does more work than the LED and is usually what fails first.',
  },
  {
    id: 4,
    question: 'A constant-current driver is normally specified for:',
    options: [
      'High-power LED arrays in commercial luminaires and street lighting',
      'LED tape and ribbon strip sharing one supply',
      'Filament lamps on a rewireable fuse',
      'Any luminaire fed from a leading-edge dimmer',
    ],
    correctAnswer: 0,
    explanation:
      'Constant-current drivers regulate output current (350 mA, 700 mA typical) regardless of string forward voltage or supply variation. Constant-voltage (12 V or 24 V DC) is the tape and ribbon option.',
  },
  {
    id: 5,
    question: 'A luminaire polar intensity diagram tells you:',
    options: [
      'Intensity in candela against angle from vertical — where the light actually goes',
      'The total lumen package of the fitting only',
      'The colour temperature of the source in kelvin',
      'The energy consumed by the driver in watts',
    ],
    correctAnswer: 0,
    explanation:
      'The polar plot puts intensity (cd) on the radial axis against angle from vertical (0° straight down). A narrow downlighter peaks at 0° and falls to nearly nothing by 30°; a diffuse cosine fitting plots as a circle.',
  },
  {
    id: 6,
    question: 'Colour rendering index (CRI, R_a) below 80 is generally unacceptable in:',
    options: [
      'Retail, art galleries, dental surgeries and food preparation',
      'Plant rooms and riser cupboards',
      'External car parks',
      'Loft spaces and crawlways',
    ],
    correctAnswer: 0,
    explanation:
      'Sunlight is 100. Cheap LED sits at 70–80, premium LED 90+, good fluorescent 80–90. Anywhere colour judgement matters, specify CRI explicitly on the fit-out.',
  },
  {
    id: 7,
    question: 'Spacing-to-height ratio (SHR) is exceeded on a grid layout. The result is:',
    options: [
      'Visible dark patches between luminaires',
      'Excessive colour temperature drift',
      'A higher maintenance factor than designed',
      'Reduced driver life on every fitting',
    ],
    correctAnswer: 0,
    explanation:
      'SHR is derived from the polar plot. Narrow beam = lower SHR (around 0.5); wide beam = higher SHR (around 1.5). Exceed it and the gaps between fittings go dark; sit well under it and you have over-specified.',
  },
  {
    id: 8,
    question: 'Under BS 5266-1, emergency lighting must operate within:',
    options: [
      '5 seconds of mains failure',
      '5 minutes of mains failure',
      '30 seconds of mains failure',
      '1 hour of mains failure',
    ],
    correctAnswer: 0,
    explanation:
      'Within 5 seconds, and it must run for at least 1 hour on escape routes or 3 hours in open areas. Either self-contained luminaires with sealed batteries or a central battery system.',
  },
];

const faqs = [
  {
    question: 'Why are LED luminaires replacing fluorescent in commercial fit-outs?',
    answer:
      'Efficacy. LED is now over 150 lm/W against roughly 85 lm/W for T5 fluorescent. Add instant on, dimmable, no flicker, longer life and no mercury, and commercial cost of ownership over ten years comes out 50–70% lower with LED. There are almost no new fluorescent installs in 2026.',
  },
  {
    question: 'What does a driver failure look like on site?',
    answer:
      'The LED array is usually fine and the driver is dead. The driver takes 230 V AC and produces a controlled DC current, and it carries the electrolytic capacitors, the switching devices and the thermal load — so it is the part that ages out first. On a commercial luminaire you replace the gear tray, not the whole fitting, where the manufacturer supports it.',
  },
  {
    question: 'What is circadian-friendly lighting and where is it specified?',
    answer:
      'Lighting that varies colour temperature through the day — cool and blueish at 5000–6500 K around midday, warm at 2700–3000 K in the evening. It mimics the natural daylight cycle and is increasingly specified for offices, schools and healthcare.',
  },
  {
    question: 'Does it matter that the emergency fittings are in the same luminaire as the mains?',
    answer:
      'What matters is that the emergency supply is independent. A self-contained luminaire carries its own sealed battery, charger and inverter, so the mains failing does not take the light with it. The alternative is a central battery bank in a plant room feeding all the emergency fittings over dedicated wiring at 24, 110 or 230 V DC.',
  },
];

export default function Lesson319e_4_2() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        How a luminaire actually makes light, the families you will meet, what limits each one in
        service, and where each belongs on a real job.
      </p>

      <TLDR
        points={[
          'A modern luminaire makes light at a semiconductor junction — forward bias an LED past its forward voltage and the junction emits. Nothing glows, nothing burns.',
          'LED forward voltage runs 1.8–3.4 V depending on colour, so every mains luminaire carries a driver that turns 230 V AC into a controlled DC current.',
          'Luminaires are classified by where the light goes, not just how much of it there is. The polar intensity diagram and the spacing-to-height ratio decide the layout.',
          'The limitations are efficacy, colour rendering, glare, lumen depreciation and dimmer compatibility — and the driver is usually the part that fails.',
          'Emergency luminaires are a separate application with their own operating principle: an independent source that lights within 5 seconds of mains failure.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain how an LED produces light and why the forward voltage varies with colour.',
          'Describe the function of a constant-current and a constant-voltage LED driver and say which suits which luminaire.',
          'Classify luminaires by their intensity distribution using the polar diagram and the spacing-to-height ratio.',
          'State the practical limitations of a luminaire in service — efficacy, CRI, glare, lumen depreciation and dimmer compatibility.',
          'Select an appropriate luminaire type for a given application, including emergency lighting to BS 5266-1.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>How a source makes light</ContentEyebrow>

      <ConceptBlock
        title="The operating principle — a forward-biased junction, not a glowing wire"
        plainEnglish="An LED is a diode. Put the positive on the anode and the negative on the cathode, push the voltage past the junction&rsquo;s forward drop, and the junction conducts — and emits light while it does. Reverse the polarity and it blocks and stays dark."
        onSite="This is why an LED module has a polarity marking and a filament lamp does not. Get the polarity wrong on a DC module and you get nothing at all, not a dim glow."
      >
        <p>
          A diode is a one-way valve for current. Forward biased it conducts after a small forward
          voltage drop; reverse biased it blocks until reverse breakdown. An LED is that same
          junction, built so that the energy released as carriers cross it leaves as visible light
          rather than heat.
        </p>
        <p>
          The forward voltage is set by the material, and the material sets the colour. That gives
          the numbers you see on every LED data sheet:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Red.</strong> Forward voltage around 1.8 V.
          </li>
          <li>
            <strong>Green.</strong> Around 2.2 V.
          </li>
          <li>
            <strong>Blue and white.</strong> Around 3.0–3.4 V.
          </li>
          <li>
            <strong>The pattern.</strong> Shorter wavelengths need a higher forward voltage. Always
            size the circuit for the actual forward voltage of the device in front of you, not a
            remembered figure.
          </li>
        </ul>
        <p>
          The semiconductor underneath makes the whole thing possible. A pure semiconductor at room
          temperature has very low conductivity; doping it with phosphorus gives n-type material and
          doping it with boron gives p-type, and that gives controllable carrier concentrations that
          vary by orders of magnitude. Every diode, LED, transistor and MOSFET exploits that same
          control.
        </p>
      </ConceptBlock>

      <VideoCard {...videos.leds} />

      <InlineCheck
        id="319e-4-2-check-1"
        question="A white LED module is wired with the supply polarity reversed. What happens?"
        options={[
          'It emits at reduced brightness because only half the junction conducts',
          'The junction is reverse biased and blocks, so the module stays dark',
          'It emits at a different colour because the forward voltage has changed',
          'It draws a large current and overheats within seconds',
        ]}
        correctIndex={1}
        explanation="An LED is a diode. Reverse biased it blocks current until reverse breakdown, so it produces no light at all. Forward bias — anode positive, cathode negative — is what makes the junction conduct and emit."
      />

      <SectionRule />

      <ContentEyebrow>Efficacy and the families you will meet</ContentEyebrow>

      <ConceptBlock
        title="Efficacy is the number that decides which family you specify"
        plainEnglish="Efficacy is lumens per watt — how much light you get for the electricity you pay for. It is the single figure that has pushed one technology out and another in."
        onSite="Read lm/W off the spec sheet before you read anything else. A 100 W LED panel at 130 lm/W puts out 100 × 130 = 13 000 lm. That one multiplication tells you how many fittings the room needs."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>LED.</strong> 100–200 lm/W, and now over 150 lm/W on good commercial product.
            Life 25 000–50 000 hours. Instant on, dimmable, no flicker, no mercury, flexible
            packaging and colour control.
          </li>
          <li>
            <strong>T5 fluorescent.</strong> Around 85 lm/W, and it contains mercury. Still present
            in existing buildings, but there are almost no new fluorescent installs in 2026.
          </li>
          <li>
            <strong>Incandescent.</strong> 10–20 lm/W. An order of magnitude behind LED on the same
            electricity bill.
          </li>
          <li>
            <strong>The commercial consequence.</strong> Cost of ownership over ten years comes out
            50–70% lower with LED, which is why lighting installs in 2026 are around 95% LED.
          </li>
        </ul>
        <p>
          That is what &ldquo;operating principle&rdquo; buys you in practice. The junction is a far
          more efficient way of turning electricity into visible light than heating something until
          it glows, and every downstream design decision — fitting count, circuit rating, power
          density — follows from it.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The driver — the half of the luminaire that does the hard work"
        plainEnglish="An LED is driven by current, not voltage. Go a few hundred millivolts above its forward voltage and the current climbs exponentially and the LED dies. So every mains-powered LED luminaire contains a driver that takes 230 V AC and hands the LED string a precisely controlled DC current."
        onSite="The driver is doing more work than the LED and it is usually what fails first. When a two-year-old panel goes dark, suspect the gear before you condemn the array."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Constant-current driver.</strong> Regulates the output current — 350 mA, 700 mA
            are the common ratings — regardless of the string&rsquo;s forward voltage or supply
            variation. Standard for high-power LED arrays in commercial luminaires and street
            lighting. More efficient and longer-lived than constant-voltage.
          </li>
          <li>
            <strong>Constant-voltage driver.</strong> Outputs a fixed 12 V or 24 V DC and relies on
            series resistors built into each LED module to set the current. Used for LED tape,
            ribbon strip and decorative lighting where many small modules share one driver. Less
            efficient but simpler to install and reconfigure.
          </li>
          <li>
            <strong>The bare-LED rule.</strong> Connect an LED to a supply with nothing limiting the
            current and it burns out instantly. On a low-voltage circuit the limiter is a series
            resistor, R = (V_supply − V_F) / I_LED. On a 5 V supply with a 3.0 V white LED at 20 mA
            that is (5 − 3) / 0.02 = 100 Ω. On a mains luminaire the limiter is the driver.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connections)"
        clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
        meaning="Lighting circuits live with frequent switching, thermal cycling and, on DALI installations, constant low-current bus traffic. Regulation 526.1 demands that every luminaire termination is durable in service — accounting for conductor class, mechanical stress and terminal temperature. A loose loop-in terminal at a ceiling rose is the classic source of fire-risk arcing on a long-running lighting circuit."
        cite="Source: BS 7671:2018+A4:2026, Regulation 526.1."
      />

      <SectionRule />

      <ContentEyebrow>Types — classified by where the light goes</ContentEyebrow>

      <ConceptBlock
        title="Two 4000 lm luminaires are not the same luminaire"
        plainEnglish="A data sheet quoting 4000 lm tells you the total light produced. It tells you nothing about where that light lands. Two fittings with the same lumen package and different reflector or diffuser designs distribute it completely differently."
        onSite="Manufacturers publish a polar intensity diagram for every product. Get into the habit of opening it — it is the difference between an even room and a room with dark patches down the middle."
      >
        <p>
          <strong>Reading the polar plot.</strong> Imagine standing under the luminaire and rotating
          around it. The diagram plots intensity in candela on the radial axis against angle from
          vertical, with 0° straight down and 90° horizontal. A narrow downlighter has a high
          candela value at 0° and drops to nearly zero by 30°. A diffuse cosine luminaire plots as a
          circle, because intensity varies as cos θ — a Lambertian distribution.
        </p>
        <p>The families you will actually specify, described by their distribution:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Narrow downlighter.</strong> Light concentrated close to vertical. Delivers most
            of its output to the floor, so it gives a high utilisation factor for the task plane in
            a high-ceiling room.
          </li>
          <li>
            <strong>Wide flood and diffuser.</strong> Light spread broadly. In the same high room it
            loses much of its output to walls and ceiling, so the utilisation factor is lower.
          </li>
          <li>
            <strong>Batwing.</strong> The office task-lighting distribution — output pushed out to
            the sides rather than straight down.
          </li>
          <li>
            <strong>Asymmetric.</strong> Output thrown to one side, for wall washing.
          </li>
        </ul>
        <p>
          <strong>Spacing-to-height ratio.</strong> SHR is the rule of thumb derived from the polar
          plot for grid layouts. Narrow beam gives a lower SHR — around 0.5, so the luminaires sit
          close together to avoid dark spots between them. Wide beam gives a higher SHR — around
          1.5, so you get the same uniformity from fewer fittings. Manufacturers publish SHR for
          every product. Exceed it and you get visible dark patches; sit well under it and you have
          over-specified the job.
        </p>
        <p>
          <strong>Why this feeds the design.</strong> The utilisation factor used to size an
          installation is calculated from the luminaire&rsquo;s intensity distribution and the room
          geometry. Manufacturers publish utilisation factor tables for each luminaire indexed
          against the room index, a single number combining room length, width, height and surface
          reflectances.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="319e-4-2-check-2"
        question="You are laying out recessed fittings on a grid in a high-ceilinged store. Which statement about spacing-to-height ratio is correct?"
        options={[
          'SHR is set by the lumen output of the fitting, not its distribution',
          'A narrow-beam fitting has the higher SHR, so it can be spaced further apart',
          'SHR applies only to emergency luminaires',
          'A narrow-beam fitting has the lower SHR — around 0.5 — so the fittings sit closer together',
        ]}
        correctIndex={3}
        explanation="SHR comes from the polar plot. Narrow beam means a lower SHR, around 0.5, and fittings close together to avoid dark spots. Wide beam gives a higher SHR, around 1.5, and the same uniformity from fewer fittings."
      />

      <SectionRule />

      <ContentEyebrow>Colour, comfort and the limits of the light</ContentEyebrow>

      <ConceptBlock
        title="Colour rendering and colour temperature — the two numbers customers actually notice"
        plainEnglish="Efficacy tells you how much light. CRI tells you how honest the colours look under it. Colour temperature tells you whether the room feels cool and alert or warm and settled."
        onSite="Spec CRI explicitly on any commercial fit-out. It is the number that gets left off a quote and then gets you called back to a shop where the stock looks grey."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Colour rendering index (CRI, R_a).</strong> How accurately a source reveals
            colours. Sunlight is 100. Cheap LED sits at 70–80, premium LED at 90 and above, good
            fluorescent at 80–90.
          </li>
          <li>
            <strong>Below 80 is unacceptable.</strong> Retail, art galleries, dental surgeries and
            food preparation all need better than that. Those are the applications where the
            customer sees the fault immediately.
          </li>
          <li>
            <strong>Colour temperature.</strong> Cool and blueish at 5000–6500 K reads as midday;
            warm at 2700–3000 K reads as evening.
          </li>
          <li>
            <strong>Circadian-friendly lighting.</strong> Varying colour temperature through the day
            to mimic the natural daylight cycle. Increasingly specified for offices, schools and
            healthcare.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Limitations in service — glare, lumen depreciation and dirt"
        plainEnglish="A luminaire on day one and the same luminaire five years later are not the same luminaire. Output drops, the body gets dirty, some modules fail, and a fitting that was comfortable can still be a glare problem from the start."
        onSite="If you design to the target level with brand-new clean fittings, the customer is ringing you about a dim room inside five years. Build the losses in at design stage."
      >
        <p>
          <strong>Glare.</strong> Glare is a luminance in your field of view that is too bright
          relative to the background. Direct glare from a bare LED chip is uncomfortable even when
          the room is otherwise correctly lit. The Unified Glare Rating framework quantifies it from
          the luminaire luminance distribution and the viewing geometry — typical limits are 19 for
          office and classroom, 16 for fine drawing and 22 for circulation.
        </p>
        <p>
          <strong>Depreciation.</strong> Four separate losses multiply together into the maintenance
          factor: lamp lumen maintenance factor (LLMF), lamp survival factor (LSF), luminaire
          maintenance factor (LMF) and room surface maintenance factor (RSMF). For LED in a clean
          office on a three-year cleaning cycle: LLMF 0.85 (LED at 50 000 hours is at 85% of new),
          LSF 0.95 (5% module failures), LMF 0.92 and RSMF 0.95, giving a maintenance factor of
          around 0.71.
        </p>
        <p>
          <strong>Environment changes the answer.</strong> Industrial environments need a more
          aggressive figure — dust, oil mist and humidity can drop the luminaire maintenance factor
          to 0.6 or worse. Outdoor luminaires on coastal sites can fall to a maintenance factor of
          0.5 over five years. Never borrow the clean-office figure for a workshop or a seafront
          car park.
        </p>
        <p>
          <strong>Why you design the loss in.</strong> Specify the installation as though the
          fittings were brand new and clean and it will hit the target on day one and drift down to
          around 350 lx within five years. By that point the customer is complaining about a dim
          room and you are back doing remedial work for nothing. Design with a maintenance factor
          of around 0.7 and the same room delivers roughly 700 lx on handover, drifting down to the
          designed 500 lx by the end of the maintenance cycle. The user never notices a problem.
        </p>
        <p>
          <strong>Surface reflectance.</strong> White walls and ceilings recycle light around the
          room and improve the utilisation factor; dark walls absorb it and force you to fit more
          luminaires for the same task level. Recommended reflectances are ceiling 0.7–0.9, walls
          0.5–0.8, floor 0.2–0.4 and work surface 0.2–0.6.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS EN 12464-1:2021 — Light and lighting — Lighting of work places"
        clause="Maintained illuminance at the task area shall not be less than the values given in Table 5 for the relevant indoor work activity. Examples: general office work 500 lx; technical drawing 750 lx; classroom 300 lx; corridor/circulation 100 lx; supermarket 500 lx."
        meaning="The luminaire you select has to hit the task illuminance for the space it serves. Below it is bad lighting and potentially a health and safety issue; well above it is wasted energy and often glare. The standard also carries the UGR limits that govern whether the chosen fitting is comfortable as well as bright enough."
        cite="Source: BS EN 12464-1:2021 Table 5."
      />

      <SectionRule />

      <ContentEyebrow>Control and application</ContentEyebrow>

      <ConceptBlock
        title="Controls are part of the luminaire specification, not an afterthought"
        plainEnglish="A modern commercial install spends as much engineering on switching the lights off as on switching them on. The control method you choose constrains which luminaires you can buy."
        onSite="Decide the control strategy before you pick the fitting. Daylight harvesting means every fitting in the affected rows has to be dimmable on the chosen protocol — retrofitting that later means changing luminaires."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>DALI (Digital Addressable Lighting Interface, IEC 62386).</strong> The dominant
            control bus. Every luminaire has a unique address; the controller sends individual
            dimming commands and receives status feedback — lamp failure, run hours, energy
            consumption. Two unpolarised conductors carry power and data. Supports scene presets,
            timetabling and integration with occupancy and daylight sensors. It has replaced the old
            0–10 V analogue standard for most applications and is used almost exclusively in premium
            offices, retail and hospitality.
          </li>
          <li>
            <strong>Occupancy sensing.</strong> Passive infrared, microwave or ultrasonic detection.
            Presence detection switches lights on automatically when someone enters and off after a
            timeout; absence detection leaves them off until switched on manually and then off after
            a timeout. Absence detection saves more in offices, because people often do not bother
            switching on when there is some daylight.
          </li>
          <li>
            <strong>Daylight harvesting.</strong> A ceiling-mounted lux sensor measures ambient
            illuminance and dims the artificial lighting to suit. On a sunny day the row nearest the
            window may dim to 20% while interior rows stay at 100%. Fading must be smooth, over 30
            seconds or more — abrupt changes are visually distracting. Requires DALI, 0–10 V or
            wireless dimming on every fitting.
          </li>
          <li>
            <strong>What it is worth.</strong> CIBSE LG7 quantifies typical savings at 20–40% from
            occupancy sensing alone and 30–50% from occupancy plus daylight harvesting. Building
            Regulations Part L sets lighting power density limits in W/m² — 8 W/m² for offices — and
            controls are what bring actual energy use below the connected load.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 525.1 (Voltage at terminals)"
        clause="In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment."
        meaning="An LED driver&rsquo;s output regulation depends on its input mains voltage staying inside product-standard tolerance. Sustained low voltage at the luminaire row furthest from the board makes the driver work harder, run hotter and fail sooner — even where the lighting calculation still says the room hits its target level. Regulation 525.1 is what ties luminaire selection back to cable sizing for volt drop."
        cite="Source: BS 7671:2018+A4:2026, Regulation 525.1."
      />

      <InlineCheck
        id="319e-4-2-check-3"
        question="A client wants daylight harvesting on the window row of an open-plan office. What does that require of the luminaires themselves?"
        options={[
          'Every fitting in the controlled zone must be dimmable on DALI, 0–10 V or a wireless protocol',
          'Only the sensor needs specifying — any mains luminaire will dim from a lux sensor',
          'The luminaires must be rewired as a separate radial with no other loads',
          'The luminaires must be switched, not dimmed, to avoid distracting the occupants',
        ]}
        correctIndex={0}
        explanation="Daylight harvesting dims fittings against measured ambient illuminance, so every luminaire in the controlled zone needs a dimming interface — DALI, 0–10 V or wireless. The fade also has to be smooth, over 30 seconds or more, because abrupt changes are distracting."
      />

      <ConceptBlock
        title="Emergency luminaires — a different operating principle for a different job"
        plainEnglish="An emergency luminaire runs from a source that does not depend on the mains. It exists so people can find their way out in the dark, and so emergency services can find the people who did not get out."
        onSite="Every commercial premises has them, and every one of them has to be tested and logged. The responsible person is personally liable under the fire safety order — that is why the log book matters as much as the install."
      >
        <p>
          <strong>Performance requirement.</strong> Emergency lighting must come on within 5 seconds
          of mains failure and run for at least 1 hour on escape routes or 3 hours in open areas.
        </p>
        <p>
          <strong>Illuminance levels under BS 5266-1.</strong> Escape route: 1 lux minimum at floor
          level across the full width. Open areas (anti-panic): 0.5 lux minimum across the floor.
          High-risk task areas, where a process has to be stopped safely: 10% of normal task
          illuminance or 15 lux, whichever is greater. Uniformity ratio max:min no worse than 40:1.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Self-contained.</strong> Each emergency luminaire carries its own sealed
            nickel-metal-hydride battery, charger and inverter. Maintained or non-maintained
            operation. Easy to retrofit, low capital cost, distributed failure mode. The standard
            arrangement on most UK installs.
          </li>
          <li>
            <strong>Central battery.</strong> One large VRLA battery bank in a plant room feeds
            24 V, 110 V or 230 V DC to all emergency luminaires over dedicated wiring. Higher
            capital cost but simpler maintenance and longer life, which suits large, complex sites.
          </li>
          <li>
            <strong>Testing under BS 5266-8.</strong> Short functional test monthly — operate the
            test switch and check every luminaire lights. Annual full-duration discharge — a 3-hour
            run from battery, verifying each luminaire still meets minimum lux at the end. Records
            go in the building log book, and any test failure means immediate remedial action.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Picking the luminaire on lumen package alone"
        whatHappens={
          <>
            Two fittings both say 4000 lm, one is half the price, so that is the one on the order.
            It turns out to be a wide diffuser going into a high-ceilinged unit. Much of its output
            lands on the walls and ceiling instead of the floor, the utilisation factor collapses,
            and its spacing-to-height ratio does not match the grid that was set out for a narrow
            beam. The room reads gloomy at working level and there are visible dark bands between
            the rows.
          </>
        }
        doInstead={
          <>
            Open the polar intensity diagram and the spacing-to-height ratio before you compare
            price. Match the distribution to the room — narrow beam for high ceilings where the
            light has to reach the floor, wide or diffuse where the ceiling is low. Then check the
            utilisation factor table against the room index for that specific luminaire, not a
            generic figure.
          </>
        }
      />

      <CommonMistake
        title="Hanging LED retrofits on the existing leading-edge dimmer"
        whatHappens={
          <>
            The old halogen downlights came off a leading-edge phase-control (TRIAC) dimmer designed
            for filament loads. It chops the AC waveform partway through each half-cycle. The driver
            inside each LED lamp needs a minimum hold-up current to keep its internal capacitor
            charged, and at low dim levels there is not enough current to maintain regulation. The
            lamps flicker, worst at the bottom of the dim range. Three 5 W lamps is only 15 W, and
            many dimmers need a minimum load of 5–10 W to behave at all.
          </>
        }
        doInstead={
          <>
            Change the control to suit the driver. Fit a trailing-edge dimmer, which chops the end
            of each half-cycle and is gentler on the driver, or move to 0–10 V or DALI dimming on
            commercial luminaires so there is a separate signal and no waveform chopping. If the
            dimmer has to stay, specify dimmable retrofits whose drivers are explicitly designed for
            phase control. Always check the dimmer-to-lamp compatibility list before ordering.
          </>
        }
      />

      <Scenario
        title="A retail unit relamp in Aberystwyth"
        situation={
          <>
            A clothing shop on the seafront wants its ageing fluorescent troffers replaced with LED.
            The owner has found panels online at 4000 lm and 36 W and wants those. The shop floor is
            lit to a task level of 500 lx, there is a fitting room and a till point, and the front
            of the unit takes salt air off the promenade. The existing dimmer on the display track
            is leading-edge.
          </>
        }
        whatToDo={
          <>
            Check three things the online listing does not tell you. One, colour rendering — this is
            retail, so anything below CRI 80 makes the stock look wrong; specify 90 or above at the
            display and fitting-room positions. Two, distribution — pull the polar diagram and the
            spacing-to-height ratio and confirm they suit the existing grid rather than assuming the
            new panels drop into the old centres. Three, the maintenance factor — the clean-office
            figure of around 0.8 does not apply to a seafront unit, where coastal exposure can take
            a luminaire down towards a maintenance factor of 0.5 over five years, so the internal
            fittings and any external signage need separate treatment. Replace the leading-edge
            dimmer on the display track with a trailing-edge or DALI solution rather than hoping the
            new drivers cope.
          </>
        }
        whyItMatters={
          <>
            The customer judges the job on how the stock looks and whether the light still looks
            right in three years. Efficacy alone gets you neither. Reading CRI, distribution and
            depreciation off the data sheet is what separates a specification from a shopping list.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'An LED makes light at a forward-biased semiconductor junction. Forward voltage is 1.8–3.4 V and varies with colour — red around 1.8 V, green around 2.2 V, blue and white around 3.0–3.4 V.',
          'LEDs are current-driven, so every mains luminaire carries a driver. Constant-current (350 mA, 700 mA) for commercial arrays and street lighting; constant-voltage (12 V or 24 V DC) for tape and ribbon.',
          'The driver is usually what fails first — it does more work than the LED itself.',
          'Efficacy decides the family: LED 100–200 lm/W, T5 fluorescent around 85 lm/W, incandescent 10–20 lm/W. Ten-year cost of ownership is 50–70% lower with LED.',
          'Classify luminaires by distribution, not lumens. The polar diagram gives intensity against angle; the spacing-to-height ratio gives the layout — around 0.5 narrow beam, around 1.5 wide beam.',
          'Colour quality is an application decision: CRI below 80 is unacceptable in retail, galleries, dental surgeries and food preparation. Colour temperature runs 2700–3000 K warm to 5000–6500 K cool.',
          'Limitations in service are glare (UGR 19 office and classroom, 16 fine drawing, 22 circulation) and depreciation — around 0.71 maintenance factor for LED in a clean office, 0.5 on a coastal site.',
          'Emergency luminaires operate within 5 seconds of mains failure for 1 hour on escape routes or 3 hours in open areas, with 1 lux on escape routes and 0.5 lux in open areas, tested monthly and annually.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Luminaires — knowledge check" />
    </div>
  );
}
