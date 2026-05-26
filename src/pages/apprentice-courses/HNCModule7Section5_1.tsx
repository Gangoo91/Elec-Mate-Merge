/**
 * Module 7 · Section 5 · Subsection 1 — LED Technology
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   LED fundamentals, driver types, thermal management, lifetime prediction, and specification considerations
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'LED Technology - HNC Module 7 Section 5.1';
const DESCRIPTION =
  'Master LED technology for building services: LED fundamentals, driver types, thermal management, lifetime prediction, efficacy, lumen depreciation, and specification considerations.';

const quickCheckQuestions = [
  {
    id: 'led-operation',
    question: 'How does an LED produce light?',
    options: [
      'A blue circular sign (e.g., \\\\\\\\\\\\\\\'Hard hats must be worn\\\\\\\\\\\\\\\')',
      'They must be isolated, locked out, tagged out, and proved dead',
      'By electroluminescence when current flows through a semiconductor junction',
      'The first option might seem correct but a later option may be more complete or accurate',
    ],
    correctIndex: 2,
    explanation:
      'LEDs produce light through electroluminescence - when current flows through the p-n junction of a semiconductor, electrons recombine with holes and release energy as photons (light).',
  },
  {
    id: 'driver-type',
    question:
      'Why do most LED luminaires use constant current drivers rather than constant voltage?',
    options: [
      'When the general public holds negative attitudes, beliefs, and stereotypes about people with mental health problems',
      '"Can they do it but won\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2019t, or do they want to but can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2019t?"',
      'LED forward voltage varies with temperature, making current control essential for consistent output',
      'Because Level 1 is quick, easy, and cheap to measure, while higher levels require more time, effort, and planning',
    ],
    correctIndex: 2,
    explanation:
      'LED forward voltage changes with temperature and manufacturing variations. Constant current drivers maintain consistent light output regardless of these voltage variations, ensuring stable illumination and preventing thermal runaway.',
  },
  {
    id: 'thermal-management',
    question: 'What is the primary reason thermal management is critical for LED performance?',
    options: [
      'Because heat reduces LED lifetime, efficacy, and causes colour shift',
      'Temporary manual control mode for system setup and testing',
      'A relatively high level of arousal, as the task requires less cognitive effort',
      'Ordering materials before you need them on site, based on the job plan',
    ],
    correctIndex: 0,
    explanation:
      'Excessive junction temperature accelerates LED degradation, reduces luminous efficacy, and causes colour temperature shift. Every 10°C increase above optimal operating temperature can halve LED lifetime.',
  },
  {
    id: 'l70-definition',
    question: 'What does L70 lifetime mean for an LED luminaire?',
    options: [
      'Review all explanations and identify knowledge gaps',
      'That they are fitted at the correct height (950mm minimum), secured and undamaged',
      'The time until light output depreciates to 70% of initial lumens',
      'An unlimited fine and/or up to two years\\\\\\\' imprisonment',
    ],
    correctIndex: 2,
    explanation:
      'L70 indicates the time (usually in hours) until the LED light output has depreciated to 70% of its initial lumen value. This is the industry standard metric for LED useful lifetime.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the typical forward voltage of a single white LED chip?',
    options: [
      '0.7V (like a standard diode)',
      '2.8V to 3.5V',
      '12V DC',
      '230V AC',
    ],
    correctAnswer: 1,
    explanation:
      'White LEDs typically have a forward voltage of 2.8V to 3.5V depending on the specific chip technology and drive current. This is why multiple LEDs are wired in series strings.',
  },
  {
    id: 2,
    question: 'Which driver type would be most appropriate for a 48V LED tape installation?',
    options: [
      'DALI driver only',
      'Constant current driver',
      'Constant voltage driver',
      'No driver required',
    ],
    correctAnswer: 2,
    explanation:
      'LED tape typically uses constant voltage drivers (commonly 12V or 24V DC, with 48V for longer runs). The tape has built-in current limiting resistors, so the driver maintains stable voltage.',
  },
  {
    id: 3,
    question: 'A 50W LED downlight has an efficacy of 130 lm/W. What is its light output?',
    options: [
      '130 lumens',
      '50 lumens',
      '2.6 lumens',
      '6,500 lumens',
    ],
    correctAnswer: 3,
    explanation:
      'Luminous efficacy (lm/W) × Power (W) = Light output (lumens). Therefore 130 lm/W × 50W = 6,500 lumens.',
  },
  {
    id: 4,
    question: 'What component in a white LED converts blue light to white light?',
    options: [
      'Phosphor coating',
      'The semiconductor die',
      'The heat sink',
      'The lens optic',
    ],
    correctAnswer: 0,
    explanation:
      'White LEDs typically use a blue LED chip coated with yellow phosphor. The phosphor absorbs some blue light and re-emits it as yellow/green wavelengths, which combines with the remaining blue to produce white light.',
  },
  {
    id: 5,
    question: 'An LED luminaire is rated L80B10. What does B10 indicate?',
    options: [
      'To reduce the drive current to dim the LED output',
      '10% of luminaires will have failed completely by L80 hours',
      'May cause flickering, audible buzzing, reduced lifetime, or driver failure',
      'Fidelity Index of 90, indicating good colour rendering accuracy',
    ],
    correctAnswer: 1,
    explanation:
      'B10 means that by the stated L80 hours, 10% of a large sample of luminaires will have failed catastrophically (not just depreciated). It is a reliability metric alongside the lumen maintenance figure.',
  },
  {
    id: 6,
    question: 'What is thermal runaway in LED systems?',
    options: [
      'To ensure protection against both overloads and electric shock without nuisance tripping',
      'System design drawings, emergency lighting logbook, and commissioning certificate',
      'A self-reinforcing cycle where heat increases current, causing more heat, leading to failure',
      'A full inspection by a competent person must be carried out before the tower is used',
    ],
    correctAnswer: 2,
    explanation:
      'Thermal runaway occurs because LED forward voltage decreases as temperature rises. With constant voltage drive, this causes increased current, generating more heat, further reducing voltage - a destructive cycle that can destroy the LED.',
  },
  {
    id: 7,
    question:
      'Which colour temperature would be most appropriate for an office environment under UK lighting guidance?',
    options: [
      '2700K warm white',
      'Any temperature is acceptable',
      '6500K daylight',
      '4000K neutral white',
    ],
    correctAnswer: 3,
    explanation:
      'For office environments, 4000K neutral white is typically recommended as it provides good colour rendering for tasks while maintaining a comfortable atmosphere. 2700K is often too warm, and 6500K can appear harsh for extended periods.',
  },
  {
    id: 8,
    question: 'What is the purpose of a constant current reduction (CCR) dimmer with LED drivers?',
    options: [
      'To reduce the drive current to dim the LED output',
      'HSG264 — Asbestos: The Survey Guide',
      'The purpose used, conditions of use, and any foreseeable risk',
      'Cable types, sizes, routes, and protective device coordination',
    ],
    correctAnswer: 0,
    explanation:
      'CCR dimmers work by reducing the current supplied to the LED driver, which in turn reduces the drive current to the LEDs, dimming the light output. This is commonly used with 1-10V dimming systems.',
  },
  {
    id: 9,
    question: 'A luminaire specification states TM-30-18 Rf=90. What does this indicate?',
    options: [
      '10% of luminaires will have failed completely by L80 hours',
      'Fidelity Index of 90, indicating good colour rendering accuracy',
      'Higher power density and more uniform light output from a single point source',
      'To reduce the drive current to dim the LED output',
    ],
    correctAnswer: 1,
    explanation:
      'TM-30-18 is the IES method for evaluating colour rendition. Rf (Fidelity Index) measures how accurately colours are rendered compared to a reference illuminant. Rf=90 indicates excellent colour accuracy (scale 0-100).',
  },
  {
    id: 10,
    question:
      'What is the main advantage of a chip-on-board (COB) LED compared to surface mount device (SMD) LEDs?',
    options: [
      '10% of luminaires will have failed completely by L80 hours',
      'A self-reinforcing cycle where heat increases current, causing more heat, leading to failure',
      'Higher power density and more uniform light output from a single point source',
      'May cause flickering, audible buzzing, reduced lifetime, or driver failure',
    ],
    correctAnswer: 2,
    explanation:
      'COB LEDs have multiple LED dies mounted directly onto a substrate without individual packaging, creating a dense, high-power single light source. This produces uniform light ideal for spotlights and reduces optical complexity.',
  },
  {
    id: 11,
    question: 'Why is in-rush current a consideration when specifying LED lighting circuits?',
    options: [
      'A preliminary roost assessment followed by dusk emergence and/or dawn re-entry surveys if potential is identified',
      'Personal relationship bias \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2014 the mentor may unconsciously assess the apprentice more favourably',
      'Engulfment by free-flowing grain, oxygen depletion from grain respiration, and dust explosion risk',
      'LED drivers can draw high in-rush current at switch-on, potentially tripping MCBs or causing contact welding in switches',
    ],
    correctAnswer: 3,
    explanation:
      'LED driver capacitors cause high in-rush currents at switch-on (often 20-50× steady state). This can trip MCBs rated too close to running current, weld switch contacts, or cause nuisance tripping. Circuit design must account for aggregate in-rush.',
  },
  {
    id: 12,
    question:
      "An LED driver is marked as 'non-dimmable'. What happens if connected to a dimmer switch?",
    options: [
      'May cause flickering, audible buzzing, reduced lifetime, or driver failure',
      'A self-reinforcing cycle where heat increases current, causing more heat, leading to failure',
      'Fidelity Index of 90, indicating good colour rendering accuracy',
      '10% of luminaires will have failed completely by L80 hours',
    ],
    correctAnswer: 0,
    explanation:
      'Non-dimmable drivers are not designed to handle the chopped waveform from dimmers. This can cause visible flicker, audible noise from the driver, overheating, and premature failure. Always match driver type to control method.',
  },
];

const faqs = [
  {
    question: 'What is the difference between CRI and TM-30?',
    answer:
      'CRI (Colour Rendering Index) uses only 8 test colours (R1-R8) and a mathematical average that can be misleading - two sources with identical CRI can render colours very differently. TM-30-18 uses 99 colour evaluation samples and provides both Rf (Fidelity - accuracy) and Rg (Gamut - saturation). TM-30 gives a more complete picture of how a light source will render colours in real applications.',
  },
  {
    question: 'How do I calculate the number of LED drivers for a circuit?',
    answer:
      "Sum the VA rating of all drivers (not just watts - account for power factor), then apply manufacturer's recommended MCB loading (typically 80% of rating for C-curve, considering in-rush). Also check total in-rush current against MCB instantaneous trip threshold. A 32A Type C MCB might only support 10-15 typical LED drivers despite running current suggesting more.",
  },
  {
    question: 'What causes LED flicker and how is it measured?',
    answer:
      'LED flicker results from variations in light output, often from driver design or dimming compatibility issues. It is measured as Percent Flicker (amplitude) and Flicker Index (waveform shape). IEEE 1789 recommends keeping flicker below 3% at frequencies under 90Hz. Specify drivers with less than 3% flicker and verify dimmer compatibility.',
  },
  {
    question: 'Why do some LED luminaires have different L-values stated (L70, L80, L90)?',
    answer:
      'Different applications have different acceptable depreciation levels. L70 (30% depreciation) is standard for general lighting. L80 (20% depreciation) suits applications where maintained illuminance is critical. L90 (10% depreciation) is used for demanding applications like healthcare or retail where colour and output consistency is paramount. Higher L-values mean shorter stated lifetimes for the same product.',
  },
];

const HNCModule7Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Subsection 1"
            title="LED Technology"
            description="LED fundamentals, driver types, thermal management, lifetime prediction, and specification considerations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain LED operating principles and light generation",
              "Compare constant current and constant voltage driver types",
              "Analyse thermal management requirements for LED systems",
              "Interpret L70/L80/L90 lifetime ratings and B-values",
              "Calculate luminous efficacy and energy performance",
              "Specify LED luminaires considering all relevant parameters",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="LED Fundamentals">
            <p>Light Emitting Diodes (LEDs) are semiconductor devices that produce light through electroluminescence. When forward-biased, electrons cross the p-n junction and recombine with holes, releasing energy as photons. The wavelength (colour) depends on the semiconductor bandgap energy.</p>
            <p><strong>LED chip technologies:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Blue LED + phosphor:</strong> Most common white LED technology - blue chip with yellow phosphor coating</li>
              <li><strong>RGB mixing:</strong> Separate red, green, blue chips - tuneable colour but complex control</li>
              <li><strong>Phosphor-converted:</strong> Various phosphor blends for warm white, high CRI applications</li>
              <li><strong>Violet pump:</strong> Uses violet/UV LED with RGB phosphors - emerging high-CRI technology</li>
            </ul>
            <p><strong>LED Package Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>SMD (Surface Mount):</strong> Individual LEDs in small packages (e.g., 2835, 5050) — LED tape, panels, linear luminaires</li>
              <li><strong>COB (Chip on Board):</strong> Multiple dies on single substrate under one phosphor — Downlights, spotlights, high-bay</li>
              <li><strong>CSP (Chip Scale Package):</strong> Minimal packaging - die is the package — Compact high-density arrays</li>
              <li><strong>Mid-power:</strong> 0.2-0.5W per LED, good efficacy — Troffers, general area lighting</li>
              <li><strong>High-power:</strong> 1-5W+ per LED, requires heat management — Outdoor, industrial, spotlights</li>
            </ul>
            <p><strong>LED Electrical Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Forward voltage (Vf):</strong> 2.8V - 3.5V typical for white LED</li>
              <li><strong>Drive current:</strong> 350mA (1W), 700mA (3W), 1050mA (5W) typical</li>
              <li><strong>Vf temperature coefficient:</strong> -2mV/°C (decreases with temperature)</li>
              <li><strong>Junction temperature max:</strong> 125°C typical, optimal &lt;85°C</li>
            </ul>
            <p><strong>Key principle:</strong> LED light output is proportional to current, but forward voltage changes with temperature - this is why current control is essential.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="LED Driver Types">
            <p>LED drivers convert mains AC to the DC required by LEDs. The driver type significantly affects performance, efficiency, dimming capability, and compatibility with control systems. Correct driver selection is critical for reliable LED installations.</p>
            <p><strong>Constant Current (CC) Drivers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Output: Fixed mA (e.g., 350mA, 700mA)</li>
              <li>Voltage adjusts to LED string length</li>
              <li>Prevents thermal runaway</li>
              <li>Used for: Most luminaires, downlights</li>
              <li>Typical spec: 350mA, 20-42V output range</li>
            </ul>
            <p><strong>Constant Voltage (CV) Drivers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Output: Fixed V (e.g., 12V, 24V, 48V DC)</li>
              <li>Current depends on connected load</li>
              <li>LEDs need integral current limiting</li>
              <li>Used for: LED tape, signage, flexible strips</li>
              <li>Typical spec: 24V DC, 100W max load</li>
            </ul>
            <p><strong>Driver Dimming Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DALI / DALI-2:</strong> Digital signal on dedicated pair, addressable — Commercial buildings, scene control, monitoring</li>
              <li><strong>1-10V:</strong> Analogue DC voltage controls output level — Warehouse, industrial, simple zone dimming</li>
              <li><strong>Phase-cut (leading edge):</strong> Triac chops AC waveform - traditional dimmer — Domestic retrofit where existing dimmers</li>
              <li><strong>Phase-cut (trailing edge):</strong> MOSFET dims from end of cycle - smoother — Better LED compatibility, less flicker</li>
              <li><strong>PWM (Pulse Width):</strong> High-frequency on/off switching — RGB control, theatrical, architectural</li>
              <li><strong>Wireless (Bluetooth/Zigbee):</strong> Smart protocol in driver, no control wiring — Retrofit, smart buildings, IoT integration</li>
            </ul>
            <p><strong>In-Rush Current Considerations</strong></p>
            <p>LED drivers contain capacitors that cause high in-rush current at switch-on:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>In-rush can be 20-100× steady-state current for &lt;1ms</li>
              <li>Multiple drivers on one circuit = cumulative in-rush</li>
              <li>Use Type C MCBs (5-10× trip) or Type D (10-20×) for LED circuits</li>
              <li>Check manufacturer's data: in-rush current and duration (I²t)</li>
              <li>Consider in-rush limiting devices for large LED installations</li>
            </ul>
            <p><strong>Specification tip:</strong> Always verify driver-luminaire compatibility, especially for dimming. A driver rated for DALI may not perform well with phase-cut dimmers, and vice versa.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Thermal Management">
            <p>Unlike incandescent lamps that radiate heat forward with light, LEDs generate heat at the junction which must be conducted away through the rear. Proper thermal design is essential - excessive junction temperature reduces output, shifts colour, accelerates degradation, and can cause catastrophic failure.</p>
            <p><strong>Thermal pathway components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Junction (Tj):</strong> Where heat is generated - target &lt;85°C for long life</li>
              <li><strong>Solder point (Tsp):</strong> Where LED attaches to PCB/substrate</li>
              <li><strong>PCB/MCPCB:</strong> Metal-core PCB spreads heat laterally</li>
              <li><strong>Thermal interface:</strong> TIM (paste/pad) between PCB and heatsink</li>
              <li><strong>Heatsink:</strong> Dissipates heat to ambient via convection/radiation</li>
            </ul>
            <p><strong>Temperature Effects on LED Performance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Light output:</strong> Decreases (reversible if within limits) — -0.3% to -0.5% per °C rise</li>
              <li><strong>Forward voltage:</strong> Decreases — -2mV per °C rise</li>
              <li><strong>Colour temperature:</strong> Shifts warmer (lower CCT) — -2K to -5K per °C rise</li>
              <li><strong>Lifetime:</strong> Exponentially reduces — Halves for every 10°C above optimal</li>
              <li><strong>Phosphor efficiency:</strong> Decreases, colour shifts — Accelerated degradation above 100°C</li>
            </ul>
            <p><strong>Thermal Calculation Example</strong></p>
            <p><span>Given:</span></p>
            <p>LED power: 10W (30% converted to light, 70% = 7W heat)</p>
            <p>Thermal resistance junction-to-case (Rjc): 2°C/W</p>
            <p>Thermal resistance case-to-heatsink: 0.5°C/W</p>
            <p>Thermal resistance heatsink-to-ambient: 5°C/W</p>
            <p>Ambient temperature: 25°C</p>
            <p><span>Junction temperature calculation:</span></p>
            <p>Total Rth = 2 + 0.5 + 5 = 7.5°C/W</p>
            <p>Temperature rise = 7W × 7.5°C/W = 52.5°C</p>
            <p>Tj = 25°C + 52.5°C = 77.5°C (acceptable)</p>
            <p><strong>Installation Derating Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Recessed mounting:</strong> Reduced airflow - verify IC (Insulation Contact) rating and Ta rating</li>
              <li><strong>Insulated ceilings:</strong> Additional derating may be needed if insulation contacts luminaire</li>
              <li><strong>High ambient:</strong> Derate or specify higher Ta-rated luminaires for plant rooms, atriums</li>
              <li><strong>Ganged mounting:</strong> Multiple luminaires in proximity reduce cooling effectiveness</li>
            </ul>
            <p><strong>Specification note:</strong> Always check the luminaire's rated ambient temperature (Ta). A luminaire rated at Ta 25°C will have reduced life in a ceiling void at 35°C.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Lifetime and Specification Considerations">
            <p>LED lifetime is characterised by gradual lumen depreciation rather than sudden failure. Understanding the metrics - Lx, By, and Cy values - is essential for specifying luminaires that will meet maintained illuminance requirements throughout their service life.</p>
            <p><strong>LED Lifetime Metrics Explained</strong></p>
            <p><strong>Lx (Lumen Maintenance):</strong> Percentage of initial lumens remaining</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L70 = 70% of initial lumens (30% depreciation)</li>
              <li>L80 = 80% of initial lumens (20% depreciation)</li>
              <li>L90 = 90% of initial lumens (10% depreciation)</li>
            </ul>
            <p><strong>By (Failure Rate):</strong> Percentage of complete failures by stated hours</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>B10 = 10% of sample failed</li>
              <li>B50 = 50% of sample failed (median life)</li>
            </ul>
            <p><strong>Cy (Catastrophic + Gradual):</strong> Combined failure metric</p>
            <p>Example: L70B10 at 60,000 hours means after 60,000 hours, the surviving luminaires (90%) will still produce at least 70% of initial lumens.</p>
            <p><strong>Key Specification Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Luminous flux:</strong> Total light output in lumens — Varies - state initial lumens</li>
              <li><strong>Luminous efficacy:</strong> Light output per watt (lm/W) — 100-200 lm/W (higher = better)</li>
              <li><strong>CCT (Colour temp):</strong> Warmth/coolness in Kelvin — 2700K warm to 6500K daylight</li>
              <li><strong>CRI / Ra:</strong> Colour Rendering Index (0-100) — &gt;80 general, &gt;90 retail/healthcare</li>
              <li><strong>TM-30 Rf:</strong> Fidelity Index (0-100) — &gt;85 good, &gt;90 excellent</li>
              <li><strong>UGR:</strong> Unified Glare Rating — &lt;19 office, &lt;22 industrial</li>
              <li><strong>MacAdam ellipse:</strong> Colour consistency (SDCM) — ≤3 step (imperceptible variation)</li>
              <li><strong>Flicker / SVM:</strong> Temporal light artefacts — &lt;3% flicker, SVM &lt;0.4</li>
            </ul>
            <p><strong>Maintenance Factor Calculation</strong></p>
            <p>MF = LLMF × LSF × LMF × RMF</p>
            <p>Where:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LLMF: Lamp lumen maintenance (from L-value)</li>
              <li>LSF: Lamp survival factor (from B-value)</li>
              <li>LMF: Luminaire maintenance factor</li>
              <li>RMF: Room surface maintenance factor</li>
            </ul>
            <p><strong>Typical Efficacy Ranges (2024)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Linear LED (troffers): 130-160 lm/W</li>
              <li>Downlights: 100-140 lm/W</li>
              <li>High-bay: 140-180 lm/W</li>
              <li>Streetlighting: 150-200 lm/W</li>
              <li>LED tape: 80-120 lm/W</li>
            </ul>
            <p><strong>Common Specification Pitfalls</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Comparing luminaires at different test conditions (Ta 25°C vs Ta 35°C)</li>
              <li>Using initial lumens without applying maintenance factor</li>
              <li>Ignoring dimmer compatibility - test before full procurement</li>
              <li>Specifying CRI alone - TM-30 Rf and Rg give fuller picture</li>
              <li>Not verifying in-rush current against circuit protection</li>
            </ul>
            <p><strong>Industry guidance:</strong> SLL LG14 (Control of Electric Lighting) and CIBSE LG7 (Offices) provide detailed guidance on LED specification for UK building services applications.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Driver Selection for LED Panel</strong>
            </p>
            <p><strong>Scenario:</strong> Specify driver for a 36W LED panel requiring DALI dimming in an office.</p>
            <p>Requirements:</p>
            <p>Panel power: 36W</p>
            <p>LED string: 60V nominal, 600mA</p>
            <p>Control: DALI-2 addressable</p>
            <p>Dimming range: 1-100%</p>
            <p>Driver specification:</p>
            <p>Output: Constant current 600mA</p>
            <p>Output voltage range: 45-75V DC</p>
            <p>Input: 220-240V AC 50Hz</p>
            <p>DALI-2 certified, Part 209 (energy reporting)</p>
            <p>Efficiency: &gt;90%</p>
            <p>Flicker: &lt;3% at all dim levels</p>
            <p>Driver power = 36W ÷ 0.90 = 40VA (for circuit sizing)</p>
            <p>
              <strong>Example 2: Circuit Design for LED Lighting</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate MCB rating for a circuit supplying 20 LED downlights.</p>
            <p>Given data:</p>
            <p>Each downlight: 12W, PF 0.9</p>
            <p>Driver in-rush: 25A for 0.5ms, I²t = 0.3A²s</p>
            <p>Supply: 230V single phase</p>
            <p>Running current calculation:</p>
            <p>Per luminaire: 12W ÷ (230V × 0.9) = 0.058A</p>
            <p>Total running: 20 × 0.058A = 1.16A</p>
            <p>In-rush consideration:</p>
            <p>Total I²t = 20 × 0.3 = 6A²s</p>
            <p>Peak in-rush ≈ 20 × 25A × (diversity factor 0.8) = 400A</p>
            <p>MCB selection:</p>
            <p>Running current: 1.16A → 6A MCB would suffice</p>
            <p>But in-rush: 400A ÷ 6A = 67× rating</p>
            <p>Type B (3-5×) would trip - unsuitable</p>
            <p>Type C (5-10×) would trip - unsuitable</p>
            <p>Type C 16A: 400A ÷ 16A = 25× → marginal</p>
            <p>Type D 10A: 400A ÷ 10A = 40× → Type D trips at 10-20×</p>
            <p>Specify: 16A Type C or 10A Type D MCB</p>
            <p>
              <strong>Example 3: Maintenance Factor Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate maintenance factor for LED luminaires in an office with 3-year cleaning cycle.</p>
            <p>Given data:</p>
            <p>Luminaire: L80B10 at 50,000 hours</p>
            <p>Operating hours: 2,500 hrs/year × 3 years = 7,500 hours</p>
            <p>Room: Clean office environment</p>
            <p>Factor calculations:</p>
            <p>LLMF: At 7,500hrs, interpolate from L80 curve</p>
            <p>At L80 (50,000 hrs), depreciation is 20%</p>
            <p>At 7,500 hrs ≈ 15% of rated life → LLMF ≈ 0.97</p>
            <p>LSF (survival): B10 at end life, at 15% life → 0.99</p>
            <p>LMF (luminaire): Recessed, sealed optic → 0.95</p>
            <p>RMF (room): Clean office, 3-year cycle → 0.95</p>
            <p>Overall maintenance factor:</p>
            <p>MF = 0.97 × 0.99 × 0.95 × 0.95 = 0.87</p>
            <p>Design illuminance = Maintained lux ÷ MF</p>
            <p>For 500 lux maintained: 500 ÷ 0.87 = 575 lux initial</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>LED Specification Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify luminous flux meets lighting design requirements (with MF applied)</li>
              <li>Check efficacy meets project energy targets (typically &gt;100 lm/W)</li>
              <li>Confirm CCT and CRI/TM-30 suit application</li>
              <li>Ensure driver type matches control system (DALI, 1-10V, etc.)</li>
              <li>Verify Ta rating suits installation environment</li>
              <li>Check in-rush current against circuit protection</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LED forward voltage: <strong>2.8-3.5V</strong> per white LED</li>
              <li>Modern efficacy: <strong>130-200 lm/W</strong></li>
              <li>L70 typical rated life: <strong>50,000+ hours</strong></li>
              <li>Optimal junction temperature: <strong>&lt;85°C</strong></li>
              <li>Office CCT: <strong>4000K</strong> neutral white</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using constant voltage drivers for discrete LED luminaires</strong> - causes thermal runaway</li>
                <li><strong>Ignoring in-rush current</strong> - leads to nuisance tripping or contact welding</li>
                <li><strong>Installing non-IC rated luminaires in insulated ceilings</strong> - fire risk and accelerated failure</li>
                <li><strong>Mixing incompatible dimmers and drivers</strong> - causes flicker, buzz, and failure</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Energy efficient solutions
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Power factor correction
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section5_1;
