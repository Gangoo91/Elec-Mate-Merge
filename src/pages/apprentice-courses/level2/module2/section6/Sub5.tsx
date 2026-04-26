/**
 * Module 2 · Section 6 · Subsection 5
 * Unit 202 LO6 — AC 6.1
 * Sensors — LDR, thermistor, NTC/PTC, on-site uses.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
import { LDRSymbol, ThermistorSymbol } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Sensors — LDR, thermistor, NTC/PTC (6.1) | Level 2 Module 2.6.5 | Elec-Mate';
const DESCRIPTION =
  'LDRs sense light. Thermistors sense temperature. Both are special resistors that change value with their environment — and they sit inside almost every smart device on a modern install.';

const checks = [
  {
    id: 'ldr-behaviour',
    question: 'What happens to an LDR’s resistance as the light hitting it gets brighter?',
    options: [
      'Resistance rises sharply.',
      'Resistance falls sharply.',
      'Resistance stays the same.',
      'Resistance becomes infinite.',
    ],
    correctIndex: 1,
    explanation:
      'A typical LDR is around 1 MΩ in pitch dark and a few hundred Ω in bright sunlight. More light = more free electrons in the cadmium sulphide film = lower resistance. That’s the whole basis of a dusk-till-dawn switch.',
  },
  {
    id: 'ntc-vs-ptc',
    question: 'What’s the difference between an NTC and a PTC thermistor?',
    options: [
      'NTC is for AC, PTC is for DC.',
      'NTC resistance falls as temperature rises; PTC resistance rises as temperature rises.',
      'They’re identical — different brand names.',
      'NTC is mechanical, PTC is electronic.',
    ],
    correctIndex: 1,
    explanation:
      'NTC = Negative Temperature Coefficient (gets less resistive when hot). PTC = Positive Temperature Coefficient (gets more resistive when hot). Same component family, opposite behaviours, used for different jobs.',
  },
  {
    id: 'ntc-application',
    question: 'A 10 kΩ NTC thermistor is sat against the heatsink of a power MOSFET in a switch-mode PSU. What’s its job?',
    options: [
      'Generate heat.',
      'Sense the heatsink temperature so the chip can throttle back or shut down before the MOSFET cooks.',
      'Limit the inrush current.',
      'Regulate the output voltage.',
    ],
    correctIndex: 1,
    explanation:
      'Over-temperature protection. As the heatsink gets hot, the NTC resistance drops, the chip reads a lower voltage at its temperature input, and either reduces the duty cycle or shuts the supply down. Same principle inside laptop chargers, EV chargers and LED drivers.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is an LDR?',
    options: [
      'A "Low Drop Regulator" used in power supplies.',
      'A "Light-Dependent Resistor" — a resistor whose value changes with the amount of light falling on it.',
      'A type of relay.',
      'A laser diode.',
    ],
    correctAnswer: 1,
    explanation:
      'Light-Dependent Resistor. The active material (usually cadmium sulphide) becomes more conductive when light hits it, so resistance falls as illumination rises.',
  },
  {
    id: 2,
    question: 'A typical LDR varies between roughly which two resistance values, dark to bright?',
    options: [
      '1 Ω in the dark, 1 kΩ in bright light.',
      '1 MΩ in pitch dark, a few hundred Ω in bright sunlight.',
      'No change with light — it’s fixed.',
      '0 Ω in the dark, infinite in light.',
    ],
    correctAnswer: 1,
    explanation:
      'Typical CdS LDR: ~1 MΩ dark, ~10 kΩ in office light, ~200 Ω in direct sunlight. Massive range — that’s why a simple voltage divider feeding a comparator is enough to make a dusk-till-dawn switch.',
  },
  {
    id: 3,
    question: 'A thermistor is a resistor whose value depends on what?',
    options: ['Light', 'Temperature', 'Voltage', 'Magnetic field'],
    correctAnswer: 1,
    explanation:
      'Thermistor = thermal + resistor. Resistance changes predictably with temperature. Made from oxide ceramics with carefully chosen properties.',
  },
  {
    id: 4,
    question: 'A 10 kΩ NTC thermistor at 25 °C might read what at 100 °C?',
    options: ['100 kΩ', '10 kΩ', 'Roughly 1 kΩ', '0 Ω'],
    correctAnswer: 2,
    explanation:
      'Order of magnitude — for typical NTC characteristics, a 10 kΩ part at room temperature drops to around 1 kΩ at 100 °C. The exact curve is in the datasheet, but the rule of thumb is "hot = much lower resistance".',
  },
  {
    id: 5,
    question: 'Where is a PTC thermistor commonly used as a self-resetting protective device?',
    options: [
      'As a smoothing capacitor.',
      'In series with a load — when the current rises and heats the PTC, its resistance shoots up and limits the current. Cools down, resets.',
      'In light fittings.',
      'In speaker cables.',
    ],
    correctAnswer: 1,
    explanation:
      'A "polyswitch" or PPTC is a polymer PTC. Normal current = low resistance, normal operation. Fault current heats it, the resistance rises sharply, current is choked off. When the fault clears and it cools, it resets. You\'ll find them in USB ports, alarm panels, motor windings.',
  },
  {
    id: 6,
    question: 'A dusk-till-dawn outdoor lamp uses an LDR and a small relay. Roughly how does it work?',
    options: [
      'The LDR generates voltage in daylight.',
      'A voltage divider with the LDR feeds a comparator chip. When light falls below a set level, the comparator switches the relay coil and the lamp comes on.',
      'The LDR heats up at night.',
      'The LDR vibrates at sunset.',
    ],
    correctAnswer: 1,
    explanation:
      'Standard architecture. The LDR sits in series with a fixed resistor across the supply; the midpoint voltage rises as it gets darker. A comparator with built-in hysteresis triggers the relay when that voltage crosses a threshold. Cheap, reliable, no microprocessor needed.',
  },
  {
    id: 7,
    question: 'A customer’s outdoor PIR lamp keeps switching on by itself in hot weather. What might be involved?',
    options: [
      'Nothing — PIRs aren’t affected by heat.',
      'PIRs detect changes in infrared (heat). On hot days, sun-warmed surfaces moving relative to the sensor (clouds passing, breeze through trees) can trigger it. Look at the unit\'s adjustment dials.',
      'The LDR is failing.',
      'The mains supply has gone DC.',
    ],
    correctAnswer: 1,
    explanation:
      'PIRs (passive infrared) work by detecting changes in IR. On hot days, moving warm/cool patches in the sensor’s field of view can mimic a person walking past. Turn down sensitivity, increase the threshold, or reposition. Not usually a fault — just over-sensitive setup.',
  },
  {
    id: 8,
    question: 'You\'re fitting underfloor heating with a digital thermostat. The thermostat uses a small probe with two wires. What\'s most likely inside the probe tip?',
    options: [
      'A miniature thermometer.',
      'An NTC thermistor — its changing resistance lets the thermostat work out floor temperature accurately.',
      'A capacitor.',
      'A diode.',
    ],
    correctAnswer: 1,
    explanation:
      'Almost every UFH floor probe is an NTC thermistor. The thermostat measures the resistance, looks up the temperature on a calibration curve, and decides when to switch the heating relay. If the probe goes open-circuit (cable cut) the thermostat usually fails safe and refuses to heat.',
  },
];

const faqs = [
  {
    question: 'Where do I actually meet sensors on site?',
    answer:
      'Almost every "smart" anything. Dusk-till-dawn lamps (LDR), PIR security lights (pyroelectric IR sensor + thermistor), underfloor heating thermostats (NTC probe), motor protection relays (PTC thermistors embedded in the motor windings), EV charge points (NTC on the cable plug to detect overheating), boiler controls, fridge thermostats, occupancy sensors. The list is huge and growing.',
  },
  {
    question: 'Are LDRs being replaced by anything newer?',
    answer:
      'Yes — modern smart lights more often use a small phototransistor or photodiode + tiny IC instead of an LDR. The behaviour is similar but the response is faster and more linear. The classic LDR is still common in cheap dusk-till-dawn modules because it\'s a single passive component that sells for pennies.',
  },
  {
    question: 'How do I test a thermistor on site?',
    answer:
      'With a multimeter on resistance. Compare the reading at room temperature to the value printed on the part or the spec sheet — for a 10 kΩ NTC at 25 °C you should see close to 10 kΩ. Warm it gently in your hand and watch the value drop (NTC) or rise (PTC). Open-circuit or way out of spec = replace.',
  },
  {
    question: 'What\'s a "PTC thermistor" inside a single-phase motor for?',
    answer:
      'Modern motors often have one or three PTC thermistors embedded in the stator windings. They feed a small relay (a "thermistor protection relay") which opens the motor contactor coil if any winding gets too hot. Far more accurate than a thermal overload, because it senses the actual winding temperature rather than estimating it from current.',
  },
  {
    question: 'Why does a PIR security light have both an LDR and a PIR sensor?',
    answer:
      'The LDR stops it triggering in daylight (no point lighting up at noon). The PIR detects movement (warm body crossing the field of view). Both have to agree before the lamp turns on. That\'s why a PIR will sometimes go off in the dark just as a fox walks past, but never at midday no matter what.',
  },
  {
    question: 'Are sensors covered specifically in BS 7671?',
    answer:
      'BS 7671 doesn\'t mandate specific sensor types but it requires that any control device used for switching and isolation complies with Chapter 53. So a thermistor protection relay protecting a motor is fine — the thermistor is the input, the relay is the switching device, and the relay needs to comply. Same for occupancy sensors switching lighting circuits — the sensor module itself usually contains a small relay or triac that\'s rated and approved for the load.',
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 5"
            title="Sensors — LDR, thermistor, NTC/PTC"
            description="Sensors are special resistors. Their value changes with light or temperature, and that’s how every dusk-till-dawn lamp, every UFH thermostat, every motor protection relay does its job."
            tone="emerald"
          />

          <TLDR
            points={[
              'An LDR (Light-Dependent Resistor) drops in resistance as light increases. Used in dusk-till-dawn lamps, automatic outdoor lighting, simple presence sensors.',
              'A thermistor is a resistor whose value changes with temperature. NTC = falls when hot. PTC = rises when hot.',
              'NTCs are the standard temperature probe in UFH, fridge thermostats, EV charger sockets and chip thermal protection. PTCs are used as self-resetting fuses and motor winding protection.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe how an LDR (Light-Dependent Resistor) operates and state typical resistance ranges.',
              'Distinguish NTC and PTC thermistors and describe how their resistance changes with temperature.',
              'Recognise the IEC symbols for LDRs and thermistors on schematics.',
              'Identify common on-site applications: dusk-till-dawn lighting, UFH thermostats, motor winding protection, chip thermal protection, EV charger plug temperature monitoring.',
              'Explain how a sensor combined with a comparator/microcontroller and a relay creates an automated switching circuit.',
              'Test a thermistor or LDR on site with a multimeter and judge whether it’s in spec.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Light sensing — the LDR</ContentEyebrow>

          <ConceptBlock
            title="A resistor that hates the dark"
            plainEnglish="Bright light = electrons get freed up = resistance falls. Dark = electrons stay put = resistance rises."
            onSite="The little orange disc with squiggly lines on a dusk-till-dawn module IS the LDR. Pop the cover, point a torch at it, and watch the lamp think it’s morning."
          >
            <p>
              An LDR (Light-Dependent Resistor) is a thin film of cadmium sulphide (CdS)
              sandwiched between two contacts. In darkness, the CdS holds onto its electrons and
              has very high resistance — typically around 1 MΩ. When light hits the surface,
              photons knock electrons free, the material becomes much more conductive, and the
              resistance drops dramatically. In direct sunlight you might see a few hundred ohms.
            </p>
            <p>
              The change isn’t instant — there’s a few milliseconds of lag — but it’s more than
              fast enough for any lighting application. Because the range is so wide (5–6 orders of
              magnitude), a simple voltage divider with a fixed resistor and a comparator chip is
              all you need to make a working dusk-till-dawn switch.
            </p>
            <div className="flex justify-center pt-2">
              <LDRSymbol label="LDR — Light-Dependent Resistor" />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="How a dusk-till-dawn lamp actually works"
            onSite="Cheap modules are still LDR-based. Smart bulbs use phototransistors and microcontrollers — same idea, more flexible, more expensive."
          >
            <p>
              The classic circuit: LDR in series with a fixed resistor across the supply, midpoint
              feeding a comparator IC with built-in hysteresis. As light fades, the LDR resistance
              rises and the midpoint voltage shifts. When it crosses the comparator’s threshold,
              the output switches and energises a small relay coil. The relay’s contacts close,
              the lamp comes on. At dawn, the reverse happens.
            </p>
            <p>
              The hysteresis is important — without it, the lamp would chatter on and off at the
              transition point as a cloud passed or a moth flew past the sensor. The chip’s built
              with a deliberate gap between "switch on" and "switch off" thresholds.
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

          <ContentEyebrow>Temperature sensing — the thermistor</ContentEyebrow>

          <ConceptBlock
            title="A resistor that responds to heat"
            plainEnglish="Two flavours: NTC drops resistance when heated. PTC rises in resistance when heated. Same component family, opposite behaviour."
          >
            <p>
              A thermistor is a small bead, disc or chip of carefully blended metal-oxide ceramic.
              Its resistance changes predictably with temperature, and the manufacturer prints a
              full curve (or a "B" parameter) on the datasheet so you can convert resistance back
              to temperature.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NTC — Negative Temperature Coefficient</strong>. Resistance falls as
                temperature rises. The standard temperature-measurement thermistor. A 10 kΩ NTC
                at 25 °C might read ~3 kΩ at 50 °C and ~1 kΩ at 100 °C.
              </li>
              <li>
                <strong>PTC — Positive Temperature Coefficient</strong>. Resistance rises as
                temperature rises — and at a "switch" temperature, it can rise dramatically (orders
                of magnitude). That’s the basis of self-resetting fuses and motor winding
                protectors.
              </li>
            </ul>
            <div className="flex justify-center pt-2 gap-3">
              <ThermistorSymbol type="NTC" label="NTC thermistor" />
              <ThermistorSymbol type="PTC" label="PTC thermistor" />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Where you meet NTCs"
            onSite="Every digital UFH thermostat. Every smart fridge. Every modern EV charger. Every laptop charger. The list is enormous — NTCs are the cheapest accurate temperature sensor money can buy."
          >
            <p>
              On a typical install you’ll meet NTCs in:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underfloor heating thermostats</strong> — floor probe is an NTC, often a
                10 kΩ type at 25 °C. The thermostat reads its resistance, looks up temperature on
                a calibration curve, and switches the heating relay.
              </li>
              <li>
                <strong>EV charger plugs</strong> — Type 2 plugs include NTCs in the contact
                housing. If a contact gets hot (poor connection, dirty pin), the charger ramps
                back the current or trips out before the plug melts.
              </li>
              <li>
                <strong>LED drivers and switch-mode PSUs</strong> — NTC against the heatsink for
                thermal foldback. Hot heatsink → lower resistance → chip reduces duty cycle →
                output power drops → heatsink cools.
              </li>
              <li>
                <strong>Smart heating controls</strong> — room sensors, hot water tank sensors,
                outdoor compensation sensors. All NTCs.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Where you meet PTCs"
            plainEnglish="PTCs are the self-resetting fuse and the motor protector. They go open when something gets too hot and reset when it cools."
          >
            <p>
              The PTC story is mostly about protection:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Polymer PTC ("polyswitch", PPTC)</strong> — self-resetting fuses in USB
                ports, alarm panel outputs, low-voltage signalling circuits. Pull too much current,
                the device heats up, the resistance shoots up, current is choked off. Take the
                fault away and it resets.
              </li>
              <li>
                <strong>Motor winding PTCs</strong> — sensor beads embedded in the stator windings
                of three-phase motors. Connected to a small thermistor protection relay (e.g. a
                "TPR-1" type) that opens the motor contactor coil if any winding overheats. More
                accurate than a thermal overload.
              </li>
              <li>
                <strong>Inrush current limiters</strong> — a special PTC variant in series with
                rectifier inputs. Cold (powering on) → high resistance → limits the inrush.
                Warmed up by normal current → low resistance → doesn’t waste power in normal
                running.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Chapter 53 (Protection, isolation and switching)"
            clause="Every device provided for isolation or switching shall comply with the relevant requirements of Chapter 53."
            meaning={
              <>
                A sensor on its own isn’t a switching device — it’s an input. The thing it
                drives (a relay, a contactor, a triac inside an occupancy sensor) is what has to
                comply with Chapter 53 for the load it’s switching. So when you fit a smart
                occupancy sensor, the sensing element doesn’t need a rating, but the built-in
                relay/triac must be rated for the lighting load and approved for that use.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Fault-finding the sensor side</ContentEyebrow>

          <ConceptBlock
            title="Common failure modes"
            onSite="With a meter on resistance you can prove an NTC or LDR is in spec in about thirty seconds. Most “the thermostat is broken” calls turn out to be a probe out of spec."
          >
            <p>
              Sensors fail in three main ways:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Open-circuit</strong> — cable cut, dry joint, or the device itself gone
                open. Most controllers fail safe (refuse to heat, refuse to switch) when they see
                infinite resistance.
              </li>
              <li>
                <strong>Short-circuit</strong> — two cores chafed together, or device internally
                shorted. Controller usually reads "0 ohms" → thinks the temperature is sky-high →
                shuts down or trips.
              </li>
              <li>
                <strong>Drift</strong> — the sensor still reads, but the value is wrong (e.g. an
                old NTC in a hot environment slowly losing accuracy). The kit appears to work but
                runs at the wrong temperature. Hardest to spot — you have to compare the reading
                against a known good thermometer.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Replacing the whole controller when the probe is the fault"
            whatHappens={
              <>
                Customer’s UFH thermostat shows "Probe Error" or refuses to heat. You order a
                whole new thermostat at £80, fit it, same error. Now you’re out of pocket and
                the customer is annoyed.
              </>
            }
            doInstead={
              <>
                Probe and thermostat are nearly always sold separately. With your meter on
                resistance, check the probe at the controller terminals. If it reads infinity it’s
                cable damage; if it reads zero it’s shorted; if it reads way off the spec value
                for room temperature it’s drifted. A replacement probe is usually £5–10 and
                takes ten minutes.
              </>
            }
          />

          <Scenario
            title="Customer’s outdoor PIR keeps triggering on hot days"
            situation={
              <>
                A PIR security light works fine all winter. Come the first proper hot weather, it
                starts triggering throughout the afternoon — sometimes when nothing is moving in
                the garden at all.
              </>
            }
            whatToDo={
              <>
                A PIR detects changes in infrared radiation — anything with a different
                temperature crossing its field of view. On hot days, gusts of wind moving warm and
                cool air through the sensor zone, sun-warmed leaves swaying, or even rapid cloud
                shadow can register as a "change". Most units have a sensitivity dial and a
                lux/dawn dial — turn the sensitivity down a notch and check the LDR threshold
                isn’t so high that hot afternoons appear "dark enough" to it. Reposition if
                possible to point away from heat sources.
              </>
            }
            whyItMatters={
              <>
                Knowing what each sensor inside the unit does (PIR for movement, LDR for
                light/dark) lets you give the customer a real diagnosis instead of replacing kit
                hopefully.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 422.3.7 (Protection of motors against excessive temperature)"
            clause="A motor which is automatically or remotely controlled or which is not continuously supervised shall be protected against excessive temperature by a protective device with manual reset. A motor shall be protected against overtemperature in all operational modes. NOTE: Attention is drawn to danger which may arise from the loss of one phase."
            meaning={
              <>
                The PTC thermistors embedded in modern motor windings exist precisely to satisfy
                this reg — feeding a thermistor protection relay that opens the contactor coil
                if any winding overheats. Reg 422.3.7 sits in Chapter 42 (protection against
                fire) because an overheating motor is a fire risk. The reg specifically demands
                MANUAL reset, so the motor can’t cycle automatically after a thermal trip and
                hide the fault. If you’re fitting a motor with thermistor leads dangling out of
                the terminal box, they need terminating into a TPR, not insulated and ignored.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 422.3.7."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'An LDR’s resistance falls as light intensity rises — about 1 MΩ dark, a few hundred Ω in sunlight. Used in dusk-till-dawn lamps and simple presence sensors.',
              'A thermistor changes resistance with temperature. NTC = falls with heat (the standard temperature sensor). PTC = rises with heat (used for protection and self-reset fuses).',
              'A 10 kΩ NTC at 25 °C drops to roughly 1 kΩ at 100 °C — datasheet curve gives the exact relationship.',
              'NTCs are everywhere on modern installs: UFH probes, EV charger plug temperature, switch-mode PSU thermal foldback, smart heating controls.',
              'PTCs protect motors (winding sensors + thermistor relay) and act as self-resetting fuses on USB and signalling circuits.',
              'Test a sensor with a meter on resistance — in spec at room temperature, response when warmed, no opens or shorts.',
            ]}
          />

          <Quiz title="Sensors — LDR, thermistor, NTC/PTC — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.4 Transistors and switching
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.6 On-site electronics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
