import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "LED Technology - HNC Module 7 Section 5.1";
const DESCRIPTION = "Master LED technology for building services: LED fundamentals, driver types, thermal management, lifetime prediction, efficacy, lumen depreciation, and specification considerations.";

const quickCheckQuestions = [
  {
    id: "led-operation",
    question: "How does an LED produce light?",
    options: ["By heating a filament", "By electroluminescence when current flows through a semiconductor junction", "By exciting gas molecules", "By phosphorescent coating alone"],
    correctIndex: 1,
    explanation: "LEDs produce light through electroluminescence - when current flows through the p-n junction of a semiconductor, electrons recombine with holes and release energy as photons (light)."
  },
  {
    id: "driver-type",
    question: "Why do most LED luminaires use constant current drivers rather than constant voltage?",
    options: ["Constant current drivers are cheaper", "LED forward voltage varies with temperature, making current control essential for consistent output", "Constant voltage drivers are too large", "Building regulations require constant current"],
    correctIndex: 1,
    explanation: "LED forward voltage changes with temperature and manufacturing variations. Constant current drivers maintain consistent light output regardless of these voltage variations, ensuring stable illumination and preventing thermal runaway."
  },
  {
    id: "thermal-management",
    question: "What is the primary reason thermal management is critical for LED performance?",
    options: ["To prevent electrical shock", "Because heat reduces LED lifetime, efficacy, and causes colour shift", "To comply with IP ratings", "To reduce flicker"],
    correctIndex: 1,
    explanation: "Excessive junction temperature accelerates LED degradation, reduces luminous efficacy, and causes colour temperature shift. Every 10°C increase above optimal operating temperature can halve LED lifetime."
  },
  {
    id: "l70-definition",
    question: "What does L70 lifetime mean for an LED luminaire?",
    options: ["70% of luminaires will fail by this time", "The time until light output depreciates to 70% of initial lumens", "70 hours of continuous operation", "70,000 hours minimum rated life"],
    correctIndex: 1,
    explanation: "L70 indicates the time (usually in hours) until the LED light output has depreciated to 70% of its initial lumen value. This is the industry standard metric for LED useful lifetime."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical forward voltage of a single white LED chip?",
    options: [
      "0.7V (like a standard diode)",
      "2.8V to 3.5V",
      "12V DC",
      "230V AC"
    ],
    correctAnswer: 1,
    explanation: "White LEDs typically have a forward voltage of 2.8V to 3.5V depending on the specific chip technology and drive current. This is why multiple LEDs are wired in series strings."
  },
  {
    id: 2,
    question: "Which driver type would be most appropriate for a 48V LED tape installation?",
    options: ["Constant current driver", "Constant voltage driver", "DALI driver only", "No driver required"],
    correctAnswer: 1,
    explanation: "LED tape typically uses constant voltage drivers (commonly 12V or 24V DC, with 48V for longer runs). The tape has built-in current limiting resistors, so the driver maintains stable voltage."
  },
  {
    id: 3,
    question: "A 50W LED downlight has an efficacy of 130 lm/W. What is its light output?",
    options: ["50 lumens", "130 lumens", "6,500 lumens", "2.6 lumens"],
    correctAnswer: 2,
    explanation: "Luminous efficacy (lm/W) × Power (W) = Light output (lumens). Therefore 130 lm/W × 50W = 6,500 lumens."
  },
  {
    id: 4,
    question: "What component in a white LED converts blue light to white light?",
    options: ["The semiconductor die", "Phosphor coating", "The heat sink", "The lens optic"],
    correctAnswer: 1,
    explanation: "White LEDs typically use a blue LED chip coated with yellow phosphor. The phosphor absorbs some blue light and re-emits it as yellow/green wavelengths, which combines with the remaining blue to produce white light."
  },
  {
    id: 5,
    question: "An LED luminaire is rated L80B10. What does B10 indicate?",
    options: [
      "10% of luminaires will have failed completely by L80 hours",
      "Brightness reduces by 10%",
      "10 year warranty",
      "10% power factor"
    ],
    correctAnswer: 0,
    explanation: "B10 means that by the stated L80 hours, 10% of a large sample of luminaires will have failed catastrophically (not just depreciated). It is a reliability metric alongside the lumen maintenance figure."
  },
  {
    id: 6,
    question: "What is thermal runaway in LED systems?",
    options: [
      "When the heat sink becomes too large",
      "A self-reinforcing cycle where heat increases current, causing more heat, leading to failure",
      "When the driver overheats",
      "Normal operating behaviour"
    ],
    correctAnswer: 1,
    explanation: "Thermal runaway occurs because LED forward voltage decreases as temperature rises. With constant voltage drive, this causes increased current, generating more heat, further reducing voltage - a destructive cycle that can destroy the LED."
  },
  {
    id: 7,
    question: "Which colour temperature would be most appropriate for an office environment under UK lighting guidance?",
    options: ["2700K warm white", "4000K neutral white", "6500K daylight", "Any temperature is acceptable"],
    correctAnswer: 1,
    explanation: "For office environments, 4000K neutral white is typically recommended as it provides good colour rendering for tasks while maintaining a comfortable atmosphere. 2700K is often too warm, and 6500K can appear harsh for extended periods."
  },
  {
    id: 8,
    question: "What is the purpose of a constant current reduction (CCR) dimmer with LED drivers?",
    options: [
      "To increase power factor",
      "To reduce the drive current to dim the LED output",
      "To convert AC to DC",
      "To provide emergency lighting"
    ],
    correctAnswer: 1,
    explanation: "CCR dimmers work by reducing the current supplied to the LED driver, which in turn reduces the drive current to the LEDs, dimming the light output. This is commonly used with 1-10V dimming systems."
  },
  {
    id: 9,
    question: "A luminaire specification states TM-30-18 Rf=90. What does this indicate?",
    options: [
      "90% efficient",
      "90mm diameter reflector",
      "Fidelity Index of 90, indicating good colour rendering accuracy",
      "90 degree beam angle"
    ],
    correctAnswer: 2,
    explanation: "TM-30-18 is the IES method for evaluating colour rendition. Rf (Fidelity Index) measures how accurately colours are rendered compared to a reference illuminant. Rf=90 indicates excellent colour accuracy (scale 0-100)."
  },
  {
    id: 10,
    question: "What is the main advantage of a chip-on-board (COB) LED compared to surface mount device (SMD) LEDs?",
    options: [
      "Lower cost",
      "Higher power density and more uniform light output from a single point source",
      "Better colour options",
      "No driver required"
    ],
    correctAnswer: 1,
    explanation: "COB LEDs have multiple LED dies mounted directly onto a substrate without individual packaging, creating a dense, high-power single light source. This produces uniform light ideal for spotlights and reduces optical complexity."
  },
  {
    id: 11,
    question: "Why is in-rush current a consideration when specifying LED lighting circuits?",
    options: [
      "It affects light output",
      "LED drivers can draw high in-rush current at switch-on, potentially tripping MCBs or causing contact welding in switches",
      "It increases energy consumption",
      "It only affects emergency lighting"
    ],
    correctAnswer: 1,
    explanation: "LED driver capacitors cause high in-rush currents at switch-on (often 20-50× steady state). This can trip MCBs rated too close to running current, weld switch contacts, or cause nuisance tripping. Circuit design must account for aggregate in-rush."
  },
  {
    id: 12,
    question: "An LED driver is marked as 'non-dimmable'. What happens if connected to a dimmer switch?",
    options: [
      "It will dim normally",
      "May cause flickering, audible buzzing, reduced lifetime, or driver failure",
      "Nothing - it simply will not dim",
      "It will work but at reduced efficiency"
    ],
    correctAnswer: 1,
    explanation: "Non-dimmable drivers are not designed to handle the chopped waveform from dimmers. This can cause visible flicker, audible noise from the driver, overheating, and premature failure. Always match driver type to control method."
  }
];

const faqs = [
  {
    question: "What is the difference between CRI and TM-30?",
    answer: "CRI (Colour Rendering Index) uses only 8 test colours (R1-R8) and a mathematical average that can be misleading - two sources with identical CRI can render colours very differently. TM-30-18 uses 99 colour evaluation samples and provides both Rf (Fidelity - accuracy) and Rg (Gamut - saturation). TM-30 gives a more complete picture of how a light source will render colours in real applications."
  },
  {
    question: "How do I calculate the number of LED drivers for a circuit?",
    answer: "Sum the VA rating of all drivers (not just watts - account for power factor), then apply manufacturer's recommended MCB loading (typically 80% of rating for C-curve, considering in-rush). Also check total in-rush current against MCB instantaneous trip threshold. A 32A Type C MCB might only support 10-15 typical LED drivers despite running current suggesting more."
  },
  {
    question: "What causes LED flicker and how is it measured?",
    answer: "LED flicker results from variations in light output, often from driver design or dimming compatibility issues. It is measured as Percent Flicker (amplitude) and Flicker Index (waveform shape). IEEE 1789 recommends keeping flicker below 3% at frequencies under 90Hz. Specify drivers with less than 3% flicker and verify dimmer compatibility."
  },
  {
    question: "Why do some LED luminaires have different L-values stated (L70, L80, L90)?",
    answer: "Different applications have different acceptable depreciation levels. L70 (30% depreciation) is standard for general lighting. L80 (20% depreciation) suits applications where maintained illuminance is critical. L90 (10% depreciation) is used for demanding applications like healthcare or retail where colour and output consistency is paramount. Higher L-values mean shorter stated lifetimes for the same product."
  }
];

const HNCModule7Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            LED Technology
          </h1>
          <p className="text-white/80">
            LED fundamentals, driver types, thermal management, lifetime prediction, and specification considerations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>LED:</strong> Semiconductor emitting light via electroluminescence</li>
              <li className="pl-1"><strong>Drivers:</strong> Constant current (most luminaires) or constant voltage (tape)</li>
              <li className="pl-1"><strong>Lifetime:</strong> L70 = 70% lumen maintenance, typically 50,000+ hours</li>
              <li className="pl-1"><strong>Efficacy:</strong> Modern LEDs achieve 130-200 lm/W</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Energy:</strong> 80%+ reduction vs incandescent</li>
              <li className="pl-1"><strong>Thermal:</strong> Critical for performance and longevity</li>
              <li className="pl-1"><strong>Controls:</strong> DALI, 1-10V, phase dimming, Bluetooth</li>
              <li className="pl-1"><strong>Standards:</strong> BS EN 62031, IEC 62384, TM-30-18</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain LED operating principles and light generation",
              "Compare constant current and constant voltage driver types",
              "Analyse thermal management requirements for LED systems",
              "Interpret L70/L80/L90 lifetime ratings and B-values",
              "Calculate luminous efficacy and energy performance",
              "Specify LED luminaires considering all relevant parameters"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: LED Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            LED Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Light Emitting Diodes (LEDs) are semiconductor devices that produce light through electroluminescence.
              When forward-biased, electrons cross the p-n junction and recombine with holes, releasing energy
              as photons. The wavelength (colour) depends on the semiconductor bandgap energy.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">LED chip technologies:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Blue LED + phosphor:</strong> Most common white LED technology - blue chip with yellow phosphor coating</li>
                <li className="pl-1"><strong>RGB mixing:</strong> Separate red, green, blue chips - tuneable colour but complex control</li>
                <li className="pl-1"><strong>Phosphor-converted:</strong> Various phosphor blends for warm white, high CRI applications</li>
                <li className="pl-1"><strong>Violet pump:</strong> Uses violet/UV LED with RGB phosphors - emerging high-CRI technology</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Package Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SMD (Surface Mount)</td>
                      <td className="border border-white/10 px-3 py-2">Individual LEDs in small packages (e.g., 2835, 5050)</td>
                      <td className="border border-white/10 px-3 py-2">LED tape, panels, linear luminaires</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">COB (Chip on Board)</td>
                      <td className="border border-white/10 px-3 py-2">Multiple dies on single substrate under one phosphor</td>
                      <td className="border border-white/10 px-3 py-2">Downlights, spotlights, high-bay</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CSP (Chip Scale Package)</td>
                      <td className="border border-white/10 px-3 py-2">Minimal packaging - die is the package</td>
                      <td className="border border-white/10 px-3 py-2">Compact high-density arrays</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mid-power</td>
                      <td className="border border-white/10 px-3 py-2">0.2-0.5W per LED, good efficacy</td>
                      <td className="border border-white/10 px-3 py-2">Troffers, general area lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-power</td>
                      <td className="border border-white/10 px-3 py-2">1-5W+ per LED, requires heat management</td>
                      <td className="border border-white/10 px-3 py-2">Outdoor, industrial, spotlights</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">LED Electrical Characteristics</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Forward voltage (Vf):</span> <span className="text-white">2.8V - 3.5V typical for white LED</span></p>
                <p><span className="text-white/60">Drive current:</span> <span className="text-white">350mA (1W), 700mA (3W), 1050mA (5W) typical</span></p>
                <p><span className="text-white/60">Vf temperature coefficient:</span> <span className="text-white">-2mV/°C (decreases with temperature)</span></p>
                <p><span className="text-white/60">Junction temperature max:</span> <span className="text-white">125°C typical, optimal &lt;85°C</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> LED light output is proportional to current, but forward voltage changes with temperature - this is why current control is essential.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Driver Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            LED Driver Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LED drivers convert mains AC to the DC required by LEDs. The driver type significantly
              affects performance, efficiency, dimming capability, and compatibility with control
              systems. Correct driver selection is critical for reliable LED installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Constant Current (CC) Drivers</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Output: Fixed mA (e.g., 350mA, 700mA)</li>
                  <li className="pl-1">Voltage adjusts to LED string length</li>
                  <li className="pl-1">Prevents thermal runaway</li>
                  <li className="pl-1">Used for: Most luminaires, downlights</li>
                  <li className="pl-1">Typical spec: 350mA, 20-42V output range</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Constant Voltage (CV) Drivers</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Output: Fixed V (e.g., 12V, 24V, 48V DC)</li>
                  <li className="pl-1">Current depends on connected load</li>
                  <li className="pl-1">LEDs need integral current limiting</li>
                  <li className="pl-1">Used for: LED tape, signage, flexible strips</li>
                  <li className="pl-1">Typical spec: 24V DC, 100W max load</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Driver Dimming Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Dimming Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How It Works</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI / DALI-2</td>
                      <td className="border border-white/10 px-3 py-2">Digital signal on dedicated pair, addressable</td>
                      <td className="border border-white/10 px-3 py-2">Commercial buildings, scene control, monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-10V</td>
                      <td className="border border-white/10 px-3 py-2">Analogue DC voltage controls output level</td>
                      <td className="border border-white/10 px-3 py-2">Warehouse, industrial, simple zone dimming</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase-cut (leading edge)</td>
                      <td className="border border-white/10 px-3 py-2">Triac chops AC waveform - traditional dimmer</td>
                      <td className="border border-white/10 px-3 py-2">Domestic retrofit where existing dimmers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase-cut (trailing edge)</td>
                      <td className="border border-white/10 px-3 py-2">MOSFET dims from end of cycle - smoother</td>
                      <td className="border border-white/10 px-3 py-2">Better LED compatibility, less flicker</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PWM (Pulse Width)</td>
                      <td className="border border-white/10 px-3 py-2">High-frequency on/off switching</td>
                      <td className="border border-white/10 px-3 py-2">RGB control, theatrical, architectural</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wireless (Bluetooth/Zigbee)</td>
                      <td className="border border-white/10 px-3 py-2">Smart protocol in driver, no control wiring</td>
                      <td className="border border-white/10 px-3 py-2">Retrofit, smart buildings, IoT integration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">In-Rush Current Considerations</p>
              <div className="text-sm text-white space-y-1">
                <p>LED drivers contain capacitors that cause high in-rush current at switch-on:</p>
                <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                  <li className="pl-1">In-rush can be 20-100× steady-state current for &lt;1ms</li>
                  <li className="pl-1">Multiple drivers on one circuit = cumulative in-rush</li>
                  <li className="pl-1">Use Type C MCBs (5-10× trip) or Type D (10-20×) for LED circuits</li>
                  <li className="pl-1">Check manufacturer's data: in-rush current and duration (I²t)</li>
                  <li className="pl-1">Consider in-rush limiting devices for large LED installations</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> Always verify driver-luminaire compatibility, especially for dimming. A driver rated for DALI may not perform well with phase-cut dimmers, and vice versa.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Thermal Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermal Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Unlike incandescent lamps that radiate heat forward with light, LEDs generate heat at the
              junction which must be conducted away through the rear. Proper thermal design is essential
              - excessive junction temperature reduces output, shifts colour, accelerates degradation, and
              can cause catastrophic failure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Thermal pathway components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Junction (Tj):</strong> Where heat is generated - target &lt;85°C for long life</li>
                <li className="pl-1"><strong>Solder point (Tsp):</strong> Where LED attaches to PCB/substrate</li>
                <li className="pl-1"><strong>PCB/MCPCB:</strong> Metal-core PCB spreads heat laterally</li>
                <li className="pl-1"><strong>Thermal interface:</strong> TIM (paste/pad) between PCB and heatsink</li>
                <li className="pl-1"><strong>Heatsink:</strong> Dissipates heat to ambient via convection/radiation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Effects on LED Performance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect of Increased Temperature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Light output</td>
                      <td className="border border-white/10 px-3 py-2">Decreases (reversible if within limits)</td>
                      <td className="border border-white/10 px-3 py-2">-0.3% to -0.5% per °C rise</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Forward voltage</td>
                      <td className="border border-white/10 px-3 py-2">Decreases</td>
                      <td className="border border-white/10 px-3 py-2">-2mV per °C rise</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Colour temperature</td>
                      <td className="border border-white/10 px-3 py-2">Shifts warmer (lower CCT)</td>
                      <td className="border border-white/10 px-3 py-2">-2K to -5K per °C rise</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifetime</td>
                      <td className="border border-white/10 px-3 py-2">Exponentially reduces</td>
                      <td className="border border-white/10 px-3 py-2">Halves for every 10°C above optimal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phosphor efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Decreases, colour shifts</td>
                      <td className="border border-white/10 px-3 py-2">Accelerated degradation above 100°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Thermal Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Given:</span></p>
                <p className="ml-4">LED power: 10W (30% converted to light, 70% = 7W heat)</p>
                <p className="ml-4">Thermal resistance junction-to-case (Rjc): 2°C/W</p>
                <p className="ml-4">Thermal resistance case-to-heatsink: 0.5°C/W</p>
                <p className="ml-4">Thermal resistance heatsink-to-ambient: 5°C/W</p>
                <p className="ml-4">Ambient temperature: 25°C</p>
                <p className="mt-2"><span className="text-white/60">Junction temperature calculation:</span></p>
                <p className="ml-4">Total Rth = 2 + 0.5 + 5 = 7.5°C/W</p>
                <p className="ml-4">Temperature rise = 7W × 7.5°C/W = 52.5°C</p>
                <p className="ml-4 text-green-400">Tj = 25°C + 52.5°C = 77.5°C (acceptable)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Derating Factors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Recessed mounting:</strong> Reduced airflow - verify IC (Insulation Contact) rating and Ta rating</li>
                <li className="pl-1"><strong>Insulated ceilings:</strong> Additional derating may be needed if insulation contacts luminaire</li>
                <li className="pl-1"><strong>High ambient:</strong> Derate or specify higher Ta-rated luminaires for plant rooms, atriums</li>
                <li className="pl-1"><strong>Ganged mounting:</strong> Multiple luminaires in proximity reduce cooling effectiveness</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification note:</strong> Always check the luminaire's rated ambient temperature (Ta). A luminaire rated at Ta 25°C will have reduced life in a ceiling void at 35°C.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Lifetime and Specification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Lifetime and Specification Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LED lifetime is characterised by gradual lumen depreciation rather than sudden failure.
              Understanding the metrics - Lx, By, and Cy values - is essential for specifying luminaires
              that will meet maintained illuminance requirements throughout their service life.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Lifetime Metrics Explained</p>
              <div className="text-sm space-y-2">
                <p><strong>Lx (Lumen Maintenance):</strong> Percentage of initial lumens remaining</p>
                <ul className="list-disc list-outside ml-5 space-y-1 mt-1">
                  <li className="pl-1">L70 = 70% of initial lumens (30% depreciation)</li>
                  <li className="pl-1">L80 = 80% of initial lumens (20% depreciation)</li>
                  <li className="pl-1">L90 = 90% of initial lumens (10% depreciation)</li>
                </ul>
                <p className="mt-2"><strong>By (Failure Rate):</strong> Percentage of complete failures by stated hours</p>
                <ul className="list-disc list-outside ml-5 space-y-1 mt-1">
                  <li className="pl-1">B10 = 10% of sample failed</li>
                  <li className="pl-1">B50 = 50% of sample failed (median life)</li>
                </ul>
                <p className="mt-2"><strong>Cy (Catastrophic + Gradual):</strong> Combined failure metric</p>
                <p className="mt-2 text-white/70">Example: L70B10 at 60,000 hours means after 60,000 hours, the surviving luminaires (90%) will still produce at least 70% of initial lumens.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Specification Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Luminous flux</td>
                      <td className="border border-white/10 px-3 py-2">Total light output in lumens</td>
                      <td className="border border-white/10 px-3 py-2">Varies - state initial lumens</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Luminous efficacy</td>
                      <td className="border border-white/10 px-3 py-2">Light output per watt (lm/W)</td>
                      <td className="border border-white/10 px-3 py-2">100-200 lm/W (higher = better)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CCT (Colour temp)</td>
                      <td className="border border-white/10 px-3 py-2">Warmth/coolness in Kelvin</td>
                      <td className="border border-white/10 px-3 py-2">2700K warm to 6500K daylight</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CRI / Ra</td>
                      <td className="border border-white/10 px-3 py-2">Colour Rendering Index (0-100)</td>
                      <td className="border border-white/10 px-3 py-2">&gt;80 general, &gt;90 retail/healthcare</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TM-30 Rf</td>
                      <td className="border border-white/10 px-3 py-2">Fidelity Index (0-100)</td>
                      <td className="border border-white/10 px-3 py-2">&gt;85 good, &gt;90 excellent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UGR</td>
                      <td className="border border-white/10 px-3 py-2">Unified Glare Rating</td>
                      <td className="border border-white/10 px-3 py-2">&lt;19 office, &lt;22 industrial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MacAdam ellipse</td>
                      <td className="border border-white/10 px-3 py-2">Colour consistency (SDCM)</td>
                      <td className="border border-white/10 px-3 py-2">≤3 step (imperceptible variation)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flicker / SVM</td>
                      <td className="border border-white/10 px-3 py-2">Temporal light artefacts</td>
                      <td className="border border-white/10 px-3 py-2">&lt;3% flicker, SVM &lt;0.4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Factor Calculation</p>
                <div className="text-sm space-y-1">
                  <p>MF = LLMF × LSF × LMF × RMF</p>
                  <p className="text-white/70 mt-2">Where:</p>
                  <ul className="list-disc list-outside ml-5 space-y-1">
                    <li className="pl-1">LLMF: Lamp lumen maintenance (from L-value)</li>
                    <li className="pl-1">LSF: Lamp survival factor (from B-value)</li>
                    <li className="pl-1">LMF: Luminaire maintenance factor</li>
                    <li className="pl-1">RMF: Room surface maintenance factor</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Efficacy Ranges (2024)</p>
                <div className="text-sm space-y-1">
                  <ul className="list-disc list-outside ml-5 space-y-1">
                    <li className="pl-1">Linear LED (troffers): 130-160 lm/W</li>
                    <li className="pl-1">Downlights: 100-140 lm/W</li>
                    <li className="pl-1">High-bay: 140-180 lm/W</li>
                    <li className="pl-1">Streetlighting: 150-200 lm/W</li>
                    <li className="pl-1">LED tape: 80-120 lm/W</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Specification Pitfalls</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Comparing luminaires at different test conditions (Ta 25°C vs Ta 35°C)</li>
                <li className="pl-1">Using initial lumens without applying maintenance factor</li>
                <li className="pl-1">Ignoring dimmer compatibility - test before full procurement</li>
                <li className="pl-1">Specifying CRI alone - TM-30 Rf and Rg give fuller picture</li>
                <li className="pl-1">Not verifying in-rush current against circuit protection</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Industry guidance:</strong> SLL LG14 (Control of Electric Lighting) and CIBSE LG7 (Offices) provide detailed guidance on LED specification for UK building services applications.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Driver Selection for LED Panel</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify driver for a 36W LED panel requiring DALI dimming in an office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Requirements:</p>
                <p className="ml-4">Panel power: 36W</p>
                <p className="ml-4">LED string: 60V nominal, 600mA</p>
                <p className="ml-4">Control: DALI-2 addressable</p>
                <p className="ml-4">Dimming range: 1-100%</p>
                <p className="mt-2">Driver specification:</p>
                <p className="ml-4">Output: Constant current 600mA</p>
                <p className="ml-4">Output voltage range: 45-75V DC</p>
                <p className="ml-4">Input: 220-240V AC 50Hz</p>
                <p className="ml-4">DALI-2 certified, Part 209 (energy reporting)</p>
                <p className="ml-4">Efficiency: &gt;90%</p>
                <p className="ml-4">Flicker: &lt;3% at all dim levels</p>
                <p className="mt-2 text-green-400">Driver power = 36W ÷ 0.90 = 40VA (for circuit sizing)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Circuit Design for LED Lighting</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate MCB rating for a circuit supplying 20 LED downlights.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Each downlight: 12W, PF 0.9</p>
                <p className="ml-4">Driver in-rush: 25A for 0.5ms, I²t = 0.3A²s</p>
                <p className="ml-4">Supply: 230V single phase</p>
                <p className="mt-2">Running current calculation:</p>
                <p className="ml-4">Per luminaire: 12W ÷ (230V × 0.9) = 0.058A</p>
                <p className="ml-4">Total running: 20 × 0.058A = 1.16A</p>
                <p className="mt-2">In-rush consideration:</p>
                <p className="ml-4">Total I²t = 20 × 0.3 = 6A²s</p>
                <p className="ml-4">Peak in-rush ≈ 20 × 25A × (diversity factor 0.8) = 400A</p>
                <p className="mt-2">MCB selection:</p>
                <p className="ml-4">Running current: 1.16A → 6A MCB would suffice</p>
                <p className="ml-4">But in-rush: 400A ÷ 6A = 67× rating</p>
                <p className="ml-4 text-red-400">Type B (3-5×) would trip - unsuitable</p>
                <p className="ml-4 text-red-400">Type C (5-10×) would trip - unsuitable</p>
                <p className="ml-4 text-green-400">Type C 16A: 400A ÷ 16A = 25× → marginal</p>
                <p className="ml-4 text-green-400">Type D 10A: 400A ÷ 10A = 40× → Type D trips at 10-20×</p>
                <p className="mt-2 text-green-400">Specify: 16A Type C or 10A Type D MCB</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Maintenance Factor Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate maintenance factor for LED luminaires in an office with 3-year cleaning cycle.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Luminaire: L80B10 at 50,000 hours</p>
                <p className="ml-4">Operating hours: 2,500 hrs/year × 3 years = 7,500 hours</p>
                <p className="ml-4">Room: Clean office environment</p>
                <p className="mt-2">Factor calculations:</p>
                <p className="ml-4">LLMF: At 7,500hrs, interpolate from L80 curve</p>
                <p className="ml-4">At L80 (50,000 hrs), depreciation is 20%</p>
                <p className="ml-4">At 7,500 hrs ≈ 15% of rated life → LLMF ≈ 0.97</p>
                <p className="ml-4">LSF (survival): B10 at end life, at 15% life → 0.99</p>
                <p className="ml-4">LMF (luminaire): Recessed, sealed optic → 0.95</p>
                <p className="ml-4">RMF (room): Clean office, 3-year cycle → 0.95</p>
                <p className="mt-2">Overall maintenance factor:</p>
                <p className="ml-4 text-green-400">MF = 0.97 × 0.99 × 0.95 × 0.95 = 0.87</p>
                <p className="mt-2 text-white/60">Design illuminance = Maintained lux ÷ MF</p>
                <p className="ml-4">For 500 lux maintained: 500 ÷ 0.87 = 575 lux initial</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">LED Specification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify luminous flux meets lighting design requirements (with MF applied)</li>
                <li className="pl-1">Check efficacy meets project energy targets (typically &gt;100 lm/W)</li>
                <li className="pl-1">Confirm CCT and CRI/TM-30 suit application</li>
                <li className="pl-1">Ensure driver type matches control system (DALI, 1-10V, etc.)</li>
                <li className="pl-1">Verify Ta rating suits installation environment</li>
                <li className="pl-1">Check in-rush current against circuit protection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">LED forward voltage: <strong>2.8-3.5V</strong> per white LED</li>
                <li className="pl-1">Modern efficacy: <strong>130-200 lm/W</strong></li>
                <li className="pl-1">L70 typical rated life: <strong>50,000+ hours</strong></li>
                <li className="pl-1">Optimal junction temperature: <strong>&lt;85°C</strong></li>
                <li className="pl-1">Office CCT: <strong>4000K</strong> neutral white</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using constant voltage drivers for discrete LED luminaires</strong> - causes thermal runaway</li>
                <li className="pl-1"><strong>Ignoring in-rush current</strong> - leads to nuisance tripping or contact welding</li>
                <li className="pl-1"><strong>Installing non-IC rated luminaires in insulated ceilings</strong> - fire risk and accelerated failure</li>
                <li className="pl-1"><strong>Mixing incompatible dimmers and drivers</strong> - causes flicker, buzz, and failure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">LED Specifications</p>
                <ul className="space-y-0.5">
                  <li>Forward voltage: 2.8-3.5V (white)</li>
                  <li>Drive current: 350mA, 700mA, 1050mA typical</li>
                  <li>Efficacy: 130-200 lm/W (modern LEDs)</li>
                  <li>Junction temp max: 125°C, optimal &lt;85°C</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Lifetime Metrics</p>
                <ul className="space-y-0.5">
                  <li>L70 = 70% lumen maintenance</li>
                  <li>L80 = 80% lumen maintenance</li>
                  <li>B10 = 10% catastrophic failure rate</li>
                  <li>Typical rated life: 50,000-100,000 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5-2">
              Next: Lighting Controls
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section5_1;
