/**
 * Module 3 · Section 6 · Subsection 3 — Electronic components and semiconductors (AC 4.1)
 * Maps to C&G 2365-03 / Unit 302 / LO4 / AC 4.1
 *   Layered depth: 2357 Unit 609 ELTK08 / AC 12.1, 12.2
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule, VideoCard } from '@/components/study-centre/learning';
import { DiodeSymbol, ZenerDiodeSymbol, LEDSymbol, TransistorSymbol, ThermistorSymbol, LDRSymbol, BridgeRectifier, HalfWaveRectified, FullWaveRectified } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Electronic components and semiconductors | Level 3 Module 3.6.3 | Elec-Mate';
const DESCRIPTION = 'Diodes, LEDs, transistors, thyristors, MOSFETs, op-amps, thermistors. The components inside every modern LED driver, VFD and EV charger.';

const checks = [
  { id: 'l3-m3-6-3-diode', question: 'A silicon diode\'s typical forward voltage drop:', options: [
    '3 V',
    '12 V',
    '0.7 V',
    '0.1 V',
  ], correctIndex: 2, explanation: 'Si diode V_F ≈ 0.6-0.7 V at rated current. Schottky ~ 0.3 V; LED 1.8-3.4 V depending on colour.' },
  { id: 'l3-m3-6-3-bridge', question: 'A bridge rectifier converts:', options: [
    'Continuity, insulation, polarity (dead), then Zs, RCD (live)',
    'To establish the true extent of work executed',
    'AC to DC using both half-cycles via four diodes',
    'To verify quantities, quality and condition against the order',
  ], correctIndex: 2, explanation: 'Bridge rectifier (4 diodes) inverts the negative half-cycle so output is always positive — full-wave DC, double the average voltage of half-wave.' },
  { id: 'l3-m3-6-3-zener', question: 'A Zener diode is used:', options: [
    'EIC is for new installations, EICR is for existing installations',
    'First fault does not cause disconnection - monitoring required',
    'To distribute circuits and provide overcurrent and RCD protection',
    'Reverse biased to provide a stable reference voltage at the Zener voltage',
  ], correctIndex: 3, explanation: 'Zener breaks down at a precise reverse voltage (e.g. 5.1 V) and clamps to that. Used for voltage references, simple regulators, over-voltage protection.' },
];

const quizQuestions = [
  { id: 1, question: 'Diode forward bias means:', options: [
    'Anode −, cathode +',
    'Anode +, cathode −',
    'No bias',
    'AC excitation',
  ], correctAnswer: 1, explanation: 'Forward bias: + on anode, − on cathode. Diode conducts after the small forward voltage drop. Reverse: blocks until breakdown.' },
  { id: 2, question: 'A NPN transistor base-emitter junction acts like:', options: [
    'Coupling different simulation tools to model interacting systems',
    'Emergency Lighting Completion Certificate',
    'A diode (must be forward biased to turn the transistor on)',
    'Approximately mid-height of the ventilated space',
  ], correctAnswer: 2, explanation: 'Base-emitter is a forward-biased PN junction. Apply ~0.7 V B-E and the transistor turns on; collector current flows, controlled by base current × β.' },
  { id: 3, question: 'A MOSFET is controlled by:', options: [
    'Current at the drain',
    'Current at the gate',
    'Voltage at the source',
    'Voltage at the gate',
  ], correctAnswer: 3, explanation: 'MOSFET = field-effect device. Gate VOLTAGE creates the channel; essentially zero gate current. Hence very efficient driver circuits.' },
  { id: 4, question: 'An LED forward voltage:', options: [
    '1.8-3.4 V depending on colour',
    'Polarity test at outlets/switches',
    'To calculate Zs when added to Ze',
    'Within 600mm of meter, consumer side',
  ], correctAnswer: 0, explanation: 'Red LED ~1.8 V, green ~2.2, blue/white ~3.0-3.4. Higher V_F for shorter wavelengths. Always size series resistor for the actual V_F.' },
  { id: 5, question: 'A thermistor (NTC) resistance:', options: [
    'Rises with temperature',
    'Falls with temperature',
    'Variable randomly',
    'Constant',
  ], correctAnswer: 1, explanation: 'NTC = Negative Temperature Coefficient. Resistance falls with rising temperature. Used as inrush limiters, temperature sensors.' },
  { id: 6, question: 'An LDR resistance:', options: [
    'Constant',
    'Rises with light',
    'Falls with light',
    'Depends on temperature only',
  ], correctAnswer: 2, explanation: 'LDR = Light Dependent Resistor (cadmium sulphide). Light frees more carriers → resistance falls. Used in dusk-till-dawn switches.' },
  { id: 7, question: 'A thyristor (SCR) conducts when:', options: [
    'Purchase, energy, maintenance, lamp replacement, and disposal costs',
    'Multi-core cables clipped direct to a non-metallic surface in still air.',
    'The amount of time an activity can be delayed without affecting the critical path',
    'Triggered at the gate, then continues until current falls below holding current',
  ], correctAnswer: 3, explanation: 'Thyristor: gate pulse triggers conduction; latches on. Stops only when current drops below holding current (e.g. AC zero crossing). Used in soft starters, dimmer triacs.' },
  { id: 8, question: 'An op-amp\'s open-loop gain is:', options: [
    'Very high — 100 000 to 1 000 000',
    'Legal protection and supports maintenance',
    'Distance, humidity, pressure, pollution',
    'Setting productivity targets',
  ], correctAnswer: 0, explanation: 'Op-amp open-loop gain is enormous (10⁵-10⁶). With negative feedback, you tame it to a precise, predictable circuit gain set by external resistors.' },
];

const faqs = [
  { question: 'Why are LEDs replacing every other lamp type?', answer: 'Hugely efficient (100-200 lumens/watt vs 10-20 for incandescent), 25 000-50 000 hour life, instant on, dimmable, no mercury. Plus flexible packaging and colour control. Lighting installs in 2026 are 95% LED.' },
  { question: 'What does the gate of a thyristor actually do?', answer: 'A pulse on the gate triggers the SCR into conduction. Once on, the gate has no further control — current must drop to zero to turn it off. Used in phase-controlled dimmers, motor soft-starters, where you trigger early or late in each half-cycle to control average power.' },
  { question: 'How is a transistor different from a thyristor?', answer: 'Transistor (BJT, MOSFET, IGBT) controls continuously — gate voltage/current sets collector current. Thyristor latches — once on, stays on until current drops. Transistors used for amplifiers, switching converters; thyristors for phase-controlled dimming and SSRs.' },
  { question: 'What\'s an "op-amp"?', answer: 'Operational amplifier — a differential amplifier with very high gain. With external feedback resistors, configures into precision amplifiers, comparators, integrators, filters. Inside every modern instrument and many sensor circuits.' },
  { question: 'Why do RCD test buttons inject a known current?', answer: 'A small known imbalance is generated across an internal resistor. If the RCD\'s electronics are healthy, it senses the imbalance and trips. The test verifies the magnetic core, electronics, and trip mechanism — not just continuity.' },
  { question: 'Are semiconductors really "neither conductor nor insulator"?', answer: 'Yes — pure semiconductor at room temperature has very low conductivity. Doping with phosphorus (n-type) or boron (p-type) provides controllable carrier concentrations that vary by orders of magnitude. That control is what every diode, transistor, MOSFET and IGBT exploits.' },
];

export default function Sub3() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section6')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>
          <PageHero eyebrow="Module 3 · Section 6 · Subsection 3" title="Electronic components and semiconductors"
            description="Diodes, LEDs, transistors, thyristors, MOSFETs, op-amps, thermistors. The building blocks of every modern driver and inverter." tone="yellow" />
          <TLDR points={[
            'Diode: one-way valve. V_F ≈ 0.7 V Si, 0.3 V Schottky. LED V_F = 1.8-3.4 V by colour.',
            'Bridge rectifier: 4 diodes give full-wave DC from AC.',
            'Zener: clamps to a precise reverse voltage. Used for references and over-voltage protection.',
            'Transistor (BJT, MOSFET, IGBT): continuous control. Thyristor (SCR, TRIAC): latched switching.',
            'Sensors: NTC/PTC thermistors (temperature), LDR (light), Hall-effect (current/position).',
          ]} />
          <LearningOutcomes outcomes={[
            'Identify diode, LED, Zener, transistor, MOSFET, IGBT, thyristor, op-amp symbols.',
            'Explain the operation of a half-wave and full-wave bridge rectifier.',
            'Describe how a transistor and a MOSFET turn on and off.',
            'Distinguish thermistor (PTC, NTC), LDR and other sensor components.',
            'Explain why semiconductors enable all modern power-electronic devices.',
          ]} initialVisibleCount={3} />
          <ContentEyebrow>Diodes</ContentEyebrow>
          <ConceptBlock title="One-way valve for current" plainEnglish="A diode conducts when forward biased (anode +) and blocks when reverse biased (until reverse breakdown).">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard Si diode</strong> — V_F ~0.7 V. Used in rectifiers, freewheel diodes, flyback suppression.</li>
              <li><strong>Schottky</strong> — V_F ~0.3 V, fast recovery. Used in switching power supplies for low loss.</li>
              <li><strong>Zener</strong> — designed to break down at precise reverse voltage. Voltage references, OVP.</li>
              <li><strong>LED</strong> — emits light when forward biased. V_F 1.8-3.4 V by colour. Always needs a current-limiting resistor.</li>
            </ul>
          </ConceptBlock>
          <DiodeSymbol />
          <ZenerDiodeSymbol />
          <LEDSymbol />
          <BridgeRectifier />
          <HalfWaveRectified />
          <FullWaveRectified />

          <VideoCard
            url={videos.diodes.url}
            title={videos.diodes.title}
            channel={videos.diodes.channel}
            duration={videos.diodes.duration}
            topic={videos.diodes.topic}
          />

          <ConceptBlock title="Smoothing, ripple and the DC bus capacitor — turning rectified AC into useful DC" plainEnglish="A bridge rectifier on its own delivers a 'full-wave' DC output that still pulses up and down at 100 Hz (twice supply frequency on UK 50 Hz). For most loads (motors, electronics) you need a steadier DC. Add a large capacitor across the rectifier output and it charges to the peak voltage at each pulse, then discharges into the load between pulses — flattening the ripple.">
            <p>For a 230 V AC input, peak DC bus voltage = 230 × √2 = 325 V. With load drawn between pulses, voltage sags by an amount called <strong>ripple</strong> — typically aim for less than 5% of bus voltage. Required capacitance for a given ripple: C ≈ I_load / (f × V_ripple), where f is twice supply frequency. A 1 A load with 5% (16 V) ripple at 100 Hz needs about 625 µF.</p>
            <p>This is why VFDs, switching power supplies and EV chargers all carry a bank of large electrolytic capacitors visible inside the case — they're the DC bus smoothing. The 'DC bus' in any modern power-electronic device is just the smoothed output of an internal bridge rectifier on the mains input.</p>
            <p><strong>Stored energy hazard.</strong> A 1000 µF cap charged to 325 V stores E = ½CV² = ½ × 0.001 × 325² = 53 J. Hand-touching the bus terminals will deliver that energy through your skin, easily lethal. Always wait the manufacturer's specified bleed time (often 5+ minutes) AND verify with a meter before working inside any drive or PSU. Some industrial drives have bleed resistors visibly mounted across the bus caps to discharge them on power-down — verify they're working.</p>
          </ConceptBlock>
          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />
          <SectionRule />
          <ContentEyebrow>Transistors and switching devices</ContentEyebrow>
          <ConceptBlock title="The active element — controlled current valve" plainEnglish="A transistor lets a small input control a much bigger output current. Three terminals: input (base or gate), output (collector or drain), common (emitter or source).">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BJT (bipolar)</strong> — base current controls collector current via gain β (typically 100). Older technology.</li>
              <li><strong>MOSFET</strong> — gate voltage controls drain current via channel field. Almost no gate current. Standard for low-V switching.</li>
              <li><strong>IGBT</strong> — combines MOSFET-style gate with BJT-style high-current output. Standard for VFDs, inverters, EV chargers.</li>
              <li><strong>Thyristor (SCR)</strong> — gate pulse latches conduction; stops only when current drops to zero. Soft-starters, phase-controlled dimmers.</li>
              <li><strong>TRIAC</strong> — bidirectional thyristor, conducts both half-cycles of AC. Light dimmers.</li>
            </ul>
          </ConceptBlock>
          <TransistorSymbol />
          <ConceptBlock title="The IGBT — the device that powers nearly every kW-scale converter built since 1990" plainEnglish="Combine the easy gate drive of a MOSFET with the high-current low-voltage-drop of a BJT and you get the IGBT — Insulated Gate Bipolar Transistor. Almost every modern VFD, EV charger, solar inverter, induction hob and traction inverter uses IGBTs as the main switching element. They're the reason power electronics works at multi-kW scale.">
            <p>Construction: an n-channel MOSFET drives the base of a PNP power transistor monolithically integrated on the same die. Gate voltage (low power) controls collector-emitter current (high power) — typically rated 600 V, 1200 V or 1700 V at hundreds to thousands of amps per device.</p>
            <p><strong>Switching characteristics:</strong> on at gate voltage &gt; ~10 V, off at gate voltage &lt; ~5 V. Conduction loss is roughly constant (~2 V drop) regardless of current — better than a MOSFET above ~50 A but worse below. Switching loss dominates at &gt; 10 kHz, so VFDs typically run at 2–8 kHz IGBT switching, settling between motor noise (high f better) and switching loss (low f better).</p>
            <p><strong>SiC and GaN</strong> are the new wide-bandgap semiconductor materials replacing silicon IGBTs in premium applications since around 2020. Silicon Carbide MOSFETs handle 1200 V at switching frequencies up to 100 kHz with much lower loss. Used in 800 V EV chargers, server power supplies, premium VFDs. More expensive but enable smaller, lighter, more efficient converters. Gallium Nitride sits below ~600 V but switches even faster — found in laptop chargers and 5G base stations.</p>
          </ConceptBlock>
          <ConceptBlock title="Op-amps in real circuits — comparator, integrator, and the RCD test button" plainEnglish="An op-amp is a differential amplifier with massive open-loop gain (10⁵–10⁶). With external feedback it becomes the universal analogue signal-conditioning building block. Three configurations cover 90% of practical use: non-inverting amplifier (gain = 1 + R_f / R_in), inverting amplifier (gain = −R_f / R_in), and comparator (no feedback at all — output saturates positive or negative depending on which input is higher).">
            <p><strong>Comparators</strong> drive most threshold-detection circuits — temperature alarms, light-level switches, RCD trip detection. The op-amp output flips to either the positive or negative supply rail when the input voltage crosses the reference. With a small amount of positive feedback ('hysteresis') it doesn't oscillate around the threshold.</p>
            <p><strong>Integrators</strong> (capacitor in feedback path) accumulate input voltage over time. Used inside switched-mode power supplies and motor controllers as the heart of PI/PID feedback loops. Modern equivalents are usually digital (microcontroller code), but the analogue op-amp version still appears in cheap, fast control loops.</p>
            <p><strong>The RCD test button trick.</strong> Pushing 'test' on an RCD doesn't actually create a real earth fault — it injects a precise resistor between the line conductor and the line side of the toroid (bypassing the toroid for that current). The toroid sees an imbalance equal to V/R, the sensing op-amp sees the fault, and the trip mechanism fires. Test button verifies the entire detection chain (toroid, op-amp, trip mechanism) without needing a real fault. Press monthly per manufacturer guidance; press at every install commissioning before energising loads.</p>
          </ConceptBlock>
          <SectionRule />
          <ContentEyebrow>Sensors</ContentEyebrow>
          <ConceptBlock title="Resistance that responds to physical conditions" plainEnglish="Sensors translate temperature, light or magnetic field into electrical signals. The rest of the circuit reads the change.">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>NTC thermistor</strong> — R falls as T rises. Inrush limiters, temperature sensors.</li>
              <li><strong>PTC thermistor</strong> — R rises as T rises. Self-resetting overload protection in motor windings.</li>
              <li><strong>LDR</strong> — R falls with light. Dusk-till-dawn outdoor light sensors.</li>
              <li><strong>Hall-effect</strong> — voltage proportional to magnetic field. DC current sensing in BLDC motor controllers and EV chargers.</li>
              <li><strong>Strain gauge</strong> — R changes with mechanical strain. Load cells, force sensors.</li>
            </ul>
          </ConceptBlock>
          <ThermistorSymbol type="NTC" />
          <LDRSymbol />
          <ConceptBlock title="Sensor signal conditioning — why a thermistor isn't a 'temperature sensor' on its own" plainEnglish="A thermistor is just a resistor that varies with temperature. To turn it into useful temperature data, you wire it into a divider with a known reference resistor, feed the midpoint voltage to an analogue input on a microcontroller, and apply the manufacturer's R-T curve in software (typically a Steinhart-Hart equation). Without the divider, the reference, the ADC and the lookup table, the thermistor is electrically meaningless.">
            <p>This is true for almost every analogue sensor on site: pressure transducers, light sensors, current transformers, RTDs, strain gauges. The 'sensor' is one part of a complete signal chain — sensor → conditioning circuit → ADC → processor → output. When a 'sensor faulty' fault gets called, the actual problem is often in the conditioning circuit (corroded reference resistor, drifting op-amp, broken ADC channel) — not the sensor itself.</p>
            <p><strong>4–20 mA loops</strong> are the industrial answer to wiring noise on long sensor runs. Instead of transmitting a voltage that's susceptible to volt-drop and EMI, the sensor draws a current proportional to its measurement (4 mA = zero scale, 20 mA = full scale). Current is constant along the entire wire regardless of resistance, so a single twisted pair carries the signal accurately for hundreds of metres. 4 mA at zero (rather than 0 mA) lets you detect a broken wire as a separate condition.</p>
            <p><strong>Hall-effect current sensors</strong> deserve a special mention. They put a Hall device into the gap of a small magnetic core that the load conductor passes through. The Hall device generates a voltage proportional to the magnetic field, which is proportional to the current. Galvanically isolated from the load (no direct electrical connection — important for safety on mains-side measurements). Used in EV chargers, premium energy meters, and inside every solar inverter for input current monitoring.</p>
          </ConceptBlock>
          <RegsCallout
            source="BS EN 60664-1:2007 — Insulation coordination for equipment within low-voltage supply systems"
            clause="The clearance and creepage distances of electronic components and PCB layouts shall be designed to withstand the rated impulse voltage and pollution degree applicable to the equipment's installation category."
            meaning={<>Modern power-electronic devices (LED drivers, VFDs, EV chargers) must comply with insulation coordination rules — line voltage to safety extra-low-voltage outputs requires reinforced insulation, double creepage. Hence the precise board layout in modern UK-rated devices.</>}
            cite="Source: BS EN 60664-1:2007."
          />
          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc fault detection devices, A4:2026)"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents."
            meaning={<>Modern semiconductor-driven loads are arc-prone at the connections feeding them — degraded LED driver leads, loose VFD terminals, ageing inverter glands. A4:2026 introduced 421.1.7 to recommend AFDDs in AC final circuits, with mandatory deployment in High-Risk Residential Buildings via the Building Safety Act 2022. AFDD detects the broadband HF arc signature that precedes ignition.</>}
            cite="Source: BS 7671:2018+A4:2026, Regulation 421.1.7 (introduced by Amendment 4:2026)."
          />
          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connections)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
            meaning={<>The lethal stored energy in an LED-driver or VFD DC bus capacitor is real, but the most common installation defect feeding them is a poor terminal. Reg 526.1 demands that every connection accounts for conductor material, class, terminal temperature in service, and mechanical stress. A loose terminal under repeated thermal cycling is what makes AFDD recommendations bite.</>}
            cite="Source: BS 7671:2018+A4:2026, Regulation 526.1."
          />
          <SectionRule />
          <CommonMistake title="Connecting an LED without a current-limiting resistor" whatHappens={<>LED has a low forward voltage (~3 V) but very low resistance once conducting. Connect direct to 5 V supply: current = (5 − 3) / R_LED ≈ 5 V / very-small. LED instantly burns out from huge current.</>}
            doInstead={<>Always include a current-limiting resistor in series. R = (V_supply − V_F) / I_LED. For 5 V supply, white LED V_F=3.0V, target current 20mA: R = (5−3)/0.02 = 100 Ω. Or use a constant-current driver, which adjusts itself.</>} />
          <ConceptBlock title="LED drivers — constant-current vs constant-voltage, and why dimming is hard" plainEnglish="An LED is a current-driven device, not a voltage-driven one. Apply a few hundred millivolts above its V_F and current rises exponentially — and the LED dies. So every mains-powered LED lamp contains a 'driver' circuit that takes 230 V AC and delivers a precisely-controlled DC current to the LED string. The driver is doing more work than the LED itself, and is usually what fails first.">
            <p><strong>Constant-current driver</strong> regulates the output current (e.g. 350 mA, 700 mA) regardless of the LED string's V_F or supply voltage variation. Standard for high-power LED arrays in commercial luminaires and street lighting. More efficient and longer-lived than constant-voltage.</p>
            <p><strong>Constant-voltage driver</strong> outputs a fixed voltage (typically 12 V or 24 V DC) and relies on series resistors built into each LED module to set current. Used for LED tape, ribbon strip and decorative lighting where many small modules share one driver. Less efficient but simpler to install and reconfigure.</p>
            <p><strong>Why dimming is hard.</strong> Old leading-edge TRIAC dimmers (designed for incandescent loads) chop the AC waveform partway through each half-cycle. The driver electronics inside an LED lamp need a minimum hold-up current to keep their internal capacitor charged — at low dim levels there isn't enough current to maintain regulation, and the lamp flickers. Solutions: (a) trailing-edge dimmers that chop the END of each half-cycle (gentler on the driver), (b) 0–10 V or DALI dimming on commercial luminaires (separate signal wire, no waveform chopping), (c) dimmable retrofit lamps with drivers explicitly designed to work with phase-control. Always check the dimmer-lamp compatibility list before specifying.</p>
          </ConceptBlock>
          <Scenario title="Diagnosing a flickering LED retrofit downlight" situation={<>Customer fitted GU10 LED retrofits in old halogen circuit. Lamps flicker, especially when dimmed. Existing dimmer is leading-edge phase control (TRIAC).</>}
            whatToDo={<>Most LED drivers don't work with leading-edge phase dimmers — too little current at low dim levels for the driver to maintain regulation; trailing-edge or 0-10V dimming required.<br/>Solution: replace dimmer with trailing-edge LED-compatible model (e.g. Varilight V-Pro) or fit dimmable LED retrofits matched to the existing dimmer. Some "universal" dimmers handle both.<br/>Also check minimum load — many dimmers need a minimum 5-10 W load. With three 5W LEDs that\'s only 15 W; flicker possible at the bottom of the dim range.</>}
            whyItMatters={<>The semiconductor power electronics in LED drivers and dimmers don\'t magically work with all combinations. Understanding the underlying components (TRIAC vs MOSFET dimmers, switching vs linear drivers) tells you why and what to do.</>} />
          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            'Diode: one-way valve, V_F ≈ 0.7 V Si. Bridge rectifier converts AC to full-wave DC.',
            'Zener: precise reverse breakdown. Voltage references and OVP.',
            'BJT/MOSFET/IGBT: continuous active control. Thyristor/TRIAC: latched, used in phase control.',
            'Sensors: NTC (T), PTC (motor protection), LDR (light), Hall (B-field).',
            'LEDs need current-limiting resistor or constant-current driver.',
            'BS EN 60664 mandates clearance/creepage for power-electronic insulation.',
          ]} />
          <Quiz title="Electronic components knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section6-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.2 Protective devices</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section6-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.4 Lighting principles</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
