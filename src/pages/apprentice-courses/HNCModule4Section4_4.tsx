import { ArrowLeft, Sliders, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Lighting Controls - HNC Module 4 Section 4.4";
const DESCRIPTION = "Master lighting control systems for building services: DALI protocol, presence and absence detection, daylight linking, time scheduling, and scene setting for energy efficiency and user comfort.";

const quickCheckQuestions = [
  {
    id: "dali-voltage",
    question: "What voltage does the DALI protocol use for communication?",
    options: ["5V DC", "12V DC", "16V DC nominal", "24V DC"],
    correctIndex: 2,
    explanation: "DALI (Digital Addressable Lighting Interface) uses a nominal 16V DC signal on the control bus. This is a two-wire system that can be wired alongside the mains supply without special segregation requirements."
  },
  {
    id: "presence-vs-absence",
    question: "What is the key difference between presence detection and absence detection?",
    options: [
      "Presence detection is more sensitive",
      "Absence detection requires user to manually switch ON",
      "Presence detection only works with DALI",
      "Absence detection uses different sensor types"
    ],
    correctIndex: 1,
    explanation: "Absence detection requires occupants to manually switch on the lights (encouraging awareness), but automatically switches off when the space is vacant. Presence detection switches on and off automatically, which can lead to unnecessary operation."
  },
  {
    id: "daylight-linking",
    question: "What is the purpose of daylight-linked dimming?",
    options: [
      "To increase artificial light near windows",
      "To maintain constant illuminance by dimming when daylight is available",
      "To change colour temperature throughout the day",
      "To prevent glare from windows"
    ],
    correctIndex: 1,
    explanation: "Daylight-linked dimming maintains constant illuminance on the working plane by reducing artificial lighting when natural daylight is available. Photocells measure light levels and adjust luminaire output accordingly, saving energy."
  },
  {
    id: "dali-devices",
    question: "How many individually addressable devices can a single DALI bus support?",
    options: ["16", "32", "64", "128"],
    correctIndex: 2,
    explanation: "A DALI bus can support up to 64 individually addressable devices (luminaires or control gear). These can be assigned to up to 16 groups and 16 scenes for flexible control without re-wiring."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does DALI stand for?",
    options: [
      "Digital Addressable Lighting Interface",
      "Direct Address Lighting Integration",
      "Digital Automatic Lighting Interface",
      "Dynamic Addressable Luminaire Interface"
    ],
    correctAnswer: 0,
    explanation: "DALI stands for Digital Addressable Lighting Interface. It is an international standard (IEC 62386) for digital control of lighting equipment, enabling individual addressing and grouping of luminaires."
  },
  {
    id: 2,
    question: "What is the maximum cable length for a DALI bus?",
    options: ["100m", "200m", "300m", "500m"],
    correctAnswer: 2,
    explanation: "The maximum DALI bus cable length is 300m. This is determined by the voltage drop on the control line. For longer distances, DALI routers or repeaters can extend the system."
  },
  {
    id: 3,
    question: "What type of sensor is most commonly used for occupancy detection in offices?",
    options: [
      "Ultrasonic only",
      "Passive infrared (PIR) only",
      "Dual technology (PIR + ultrasonic)",
      "Microwave only"
    ],
    correctAnswer: 2,
    explanation: "Dual technology sensors combine PIR (detects heat movement) with ultrasonic (detects any movement). This reduces false triggers while maintaining reliable detection of occupancy, even for stationary tasks like desk work."
  },
  {
    id: 4,
    question: "What is a 'scene' in lighting control terminology?",
    options: [
      "A single luminaire setting",
      "A pre-programmed combination of light levels for multiple luminaires",
      "The area covered by one sensor",
      "A time-based schedule"
    ],
    correctAnswer: 1,
    explanation: "A scene is a pre-programmed combination of dimming levels and on/off states for multiple luminaires, recalled by a single command. Examples include 'presentation mode', 'cleaning', or 'video conference'."
  },
  {
    id: 5,
    question: "Where should a daylight sensor be positioned?",
    options: [
      "Near the window",
      "On the ceiling looking at the task area",
      "On the exterior of the building",
      "At working plane height"
    ],
    correctAnswer: 1,
    explanation: "Daylight sensors for dimming control are typically mounted on the ceiling, angled to 'see' the task area. This measures the actual illuminance reaching the working plane, combining daylight and artificial light."
  },
  {
    id: 6,
    question: "What is 'corridor hold' in occupancy sensor programming?",
    options: [
      "Keeping corridor lights on during emergencies",
      "Preventing lights switching off while someone walks through",
      "A sensor mounting position",
      "Maximum dimming level in corridors"
    ],
    correctAnswer: 1,
    explanation: "Corridor hold (or walk-through function) keeps lights on long enough for someone to pass through the detection zone, typically 15-30 seconds. This prevents lights switching off as occupants transit an area."
  },
  {
    id: 7,
    question: "What is the typical time delay for absence detection before lights switch off?",
    options: [
      "1-5 minutes",
      "10-20 minutes",
      "30-60 minutes",
      "2 hours"
    ],
    correctAnswer: 1,
    explanation: "Absence detection typically uses a 10-20 minute delay before switching off. This accounts for brief periods of stillness (reading, thinking). Longer delays waste energy; shorter delays cause nuisance switching."
  },
  {
    id: 8,
    question: "What advantage does DALI have over traditional 1-10V dimming?",
    options: [
      "Lower cost",
      "Simpler wiring",
      "Two-way communication and individual addressing",
      "Higher dimming range"
    ],
    correctAnswer: 2,
    explanation: "DALI provides two-way communication (luminaires report status back) and individual addressing of up to 64 devices. 1-10V is analogue, one-way, and controls all connected luminaires together without individual addressing."
  },
  {
    id: 9,
    question: "In an open plan office, what control strategy is recommended for energy efficiency?",
    options: [
      "Manual switching only",
      "Time scheduling only",
      "Combined daylight linking, presence detection and local override",
      "Central BMS control only"
    ],
    correctAnswer: 2,
    explanation: "Best practice combines daylight-linked dimming (responds to natural light), presence detection (responds to occupancy), and local override (user control for comfort). This balances energy efficiency with occupant satisfaction."
  },
  {
    id: 10,
    question: "What is 'constant light output' (CLO) control?",
    options: [
      "Maintaining light level as lamps depreciate",
      "Keeping colour temperature constant",
      "Preventing flickering",
      "Emergency lighting standby mode"
    ],
    correctAnswer: 0,
    explanation: "Constant Light Output (CLO) compensates for LED lumen depreciation over time. New luminaires run at reduced power; output increases as the LEDs age to maintain consistent illuminance throughout the service life, saving energy."
  }
];

const faqs = [
  {
    question: "What is the difference between DALI and DALI-2?",
    answer: "DALI-2 is the updated standard (IEC 62386 parts 102-104) that ensures interoperability between manufacturers. It adds new control device types (sensors, switches), standardised colour control, and improved testing requirements. DALI-2 is backward compatible with original DALI devices."
  },
  {
    question: "When should I use absence detection instead of presence detection?",
    answer: "Absence detection is preferred for energy efficiency in most applications. It requires users to consciously switch on lights (raising awareness of energy use), but automatically switches off when vacant. Use presence detection where hands-free operation is essential (toilets, corridors) or where switches are inaccessible."
  },
  {
    question: "How do I prevent false triggering of occupancy sensors?",
    answer: "Choose appropriate sensor technology (PIR for heat sources, ultrasonic for fine motion, dual-technology for both). Position sensors away from heating/cooling vents, moving objects (curtains, plants), and reflective surfaces. Adjust sensitivity settings and time delays. Consider masking areas where false triggers occur."
  },
  {
    question: "Can DALI control be integrated with building management systems (BMS)?",
    answer: "Yes, DALI gateways convert between DALI and BMS protocols (BACnet, Modbus, KNX). This enables central monitoring of lighting status, energy consumption, and lamp failures. The BMS can also send commands for time scheduling, load shedding, or emergency override."
  },
  {
    question: "What is tuneable white lighting and when is it used?",
    answer: "Tuneable white luminaires can adjust colour temperature (typically 2700K-6500K) as well as intensity. This supports circadian lighting design, matching warm tones in morning/evening and cool tones midday. It's used in healthcare, education, and wellness applications where light colour affects wellbeing and alertness."
  },
  {
    question: "How much energy can lighting controls save?",
    answer: "Typical savings: daylight linking 20-40% (perimeter zones), occupancy/absence detection 30-50% (intermittently occupied spaces), combined strategies 50-70% compared to uncontrolled lighting. Actual savings depend on space use patterns, daylight availability, and existing efficiency. Controls also help demonstrate Part L compliance."
  }
];

const HNCModule4Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Sliders className="h-4 w-4" />
            <span>Module 4.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Lighting Controls
          </h1>
          <p className="text-white/80">
            Digital control systems for energy efficiency, comfort and flexibility in modern building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DALI:</strong> 64 devices, 16 groups, two-way comms</li>
              <li className="pl-1"><strong>Presence:</strong> Auto on/off based on occupancy</li>
              <li className="pl-1"><strong>Absence:</strong> Manual on, auto off (preferred)</li>
              <li className="pl-1"><strong>Daylight:</strong> Dim artificial when natural available</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Energy Savings Potential</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Daylight linking:</strong> 20-40% (perimeter zones)</li>
              <li className="pl-1"><strong>Occupancy detection:</strong> 30-50%</li>
              <li className="pl-1"><strong>Combined strategies:</strong> 50-70%</li>
              <li className="pl-1"><strong>Constant light output:</strong> 10-15%</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand DALI protocol architecture and capabilities",
              "Design presence and absence detection strategies",
              "Apply daylight-linked dimming for energy efficiency",
              "Implement time scheduling for building management",
              "Create scene settings for different activities",
              "Integrate lighting controls with BMS systems"
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

        {/* Section 1: DALI Protocol */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DALI Protocol - Digital Addressable Lighting Interface
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DALI is the international standard (IEC 62386) for digital lighting control. It enables
              individual addressing of luminaires, flexible grouping, scene setting and two-way
              communication for status monitoring - all on a simple two-wire bus.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DALI system characteristics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bus voltage:</strong> 16V DC nominal (11.5V-22.5V)</li>
                <li className="pl-1"><strong>Maximum devices:</strong> 64 per bus (can be expanded)</li>
                <li className="pl-1"><strong>Groups:</strong> Up to 16 simultaneous groups</li>
                <li className="pl-1"><strong>Scenes:</strong> Up to 16 pre-programmed scenes</li>
                <li className="pl-1"><strong>Cable length:</strong> Maximum 300m</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI System Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI driver</td>
                      <td className="border border-white/10 px-3 py-2">LED driver with DALI dimming control input</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI controller</td>
                      <td className="border border-white/10 px-3 py-2">Master device that sends commands to bus</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI power supply</td>
                      <td className="border border-white/10 px-3 py-2">Provides 16V DC to the control bus</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI sensor</td>
                      <td className="border border-white/10 px-3 py-2">Occupancy or light level sensor on bus</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI switch/button</td>
                      <td className="border border-white/10 px-3 py-2">User input device for manual control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI gateway</td>
                      <td className="border border-white/10 px-3 py-2">Interface to BMS (BACnet, KNX, Modbus)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI vs 1-10V Dimming</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70 mb-1">DALI advantages:</p>
                  <ul className="text-white space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">Individual addressing</li>
                    <li className="pl-1">Two-way communication</li>
                    <li className="pl-1">Soft dimming curves</li>
                    <li className="pl-1">Remote commissioning</li>
                    <li className="pl-1">Fault reporting</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/70 mb-1">1-10V limitations:</p>
                  <ul className="text-white space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">No addressing (all together)</li>
                    <li className="pl-1">One-way only</li>
                    <li className="pl-1">Separate control cable per zone</li>
                    <li className="pl-1">No status feedback</li>
                    <li className="pl-1">Manual commissioning</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>DALI-2:</strong> The updated standard adds standardised control devices, colour control (Tc, RGBW) and improved interoperability. Specify DALI-2 for new installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Occupancy Detection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Presence and Absence Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Occupancy-based control automatically adjusts lighting based on whether spaces are in use.
              The choice between presence detection (auto on/off) and absence detection (manual on, auto off)
              significantly affects both energy savings and user satisfaction.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Presence Detection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lights switch ON automatically when occupied</li>
                  <li className="pl-1">Lights switch OFF automatically when vacant</li>
                  <li className="pl-1">Hands-free operation</li>
                  <li className="pl-1">Can waste energy (switching on unnecessarily)</li>
                  <li className="pl-1">Suitable for: toilets, corridors, stores</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Absence Detection (Preferred)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">User must switch ON manually</li>
                  <li className="pl-1">Lights switch OFF automatically when vacant</li>
                  <li className="pl-1">Encourages energy awareness</li>
                  <li className="pl-1">Greater energy savings</li>
                  <li className="pl-1">Suitable for: offices, meeting rooms</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Technologies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detection Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PIR (Passive Infrared)</td>
                      <td className="border border-white/10 px-3 py-2">Body heat movement</td>
                      <td className="border border-white/10 px-3 py-2">General use, cost-effective</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ultrasonic</td>
                      <td className="border border-white/10 px-3 py-2">Sound wave reflection</td>
                      <td className="border border-white/10 px-3 py-2">Fine movement, partitioned spaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Microwave</td>
                      <td className="border border-white/10 px-3 py-2">Radio wave reflection</td>
                      <td className="border border-white/10 px-3 py-2">Through materials, outdoor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dual technology</td>
                      <td className="border border-white/10 px-3 py-2">PIR + ultrasonic combined</td>
                      <td className="border border-white/10 px-3 py-2">Reduced false triggers, offices</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Placement Guidelines</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">PIR: Position facing direction of movement (not parallel)</li>
                <li className="pl-1">Avoid HVAC outlets, direct sunlight, heat sources</li>
                <li className="pl-1">Consider furniture obstructions and partitions</li>
                <li className="pl-1">Check coverage patterns in manufacturer data</li>
                <li className="pl-1">Typical coverage: 6-8m diameter for ceiling mount</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Time delay:</strong> Set hold-on time (10-20 minutes for offices) to avoid nuisance switching during brief periods of stillness.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Daylight Linking */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Daylight Linking and Photocell Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Daylight-linked dimming maintains constant illuminance on the task area by reducing
              artificial lighting when natural daylight is available. Photocells measure light levels
              and adjust luminaire output, providing significant energy savings in perimeter zones.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Daylight linking approaches:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Closed-loop:</strong> Sensor measures actual task illuminance, adjusts to maintain setpoint</li>
                <li className="pl-1"><strong>Open-loop:</strong> Sensor measures daylight only, assumes proportional contribution</li>
                <li className="pl-1"><strong>Switching:</strong> Rows of luminaires switch off near windows</li>
                <li className="pl-1"><strong>Dimming:</strong> Smooth adjustment of light level (preferred)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Photocell Positioning</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ceiling-mounted, angled toward task area</li>
                  <li className="pl-1">Away from direct sunlight patches</li>
                  <li className="pl-1">Not obscured by shelving or partitions</li>
                  <li className="pl-1">Consider blinds position effect</li>
                  <li className="pl-1">One sensor per control zone</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Zone Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Separate zones by window proximity</li>
                  <li className="pl-1">Zone depth typically 4-6m from window</li>
                  <li className="pl-1">Consider blinds/shading interaction</li>
                  <li className="pl-1">Multiple zones for deep plan spaces</li>
                  <li className="pl-1">Core areas may not need daylight linking</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Set target illuminance level (e.g., 500 lux for office)</li>
                <li className="pl-1">Commission during overcast daytime conditions</li>
                <li className="pl-1">Verify smooth dimming without visible steps</li>
                <li className="pl-1">Set minimum dimming level (typically 10-20%)</li>
                <li className="pl-1">Adjust dead-band to prevent hunting</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy savings:</strong> Daylight linking typically saves 20-40% in perimeter zones. Savings depend on window area, orientation, shading and occupancy patterns.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Scheduling and Scenes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Time Scheduling and Scene Setting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Time scheduling automatically adjusts lighting based on building occupation patterns,
              while scene setting provides pre-programmed lighting configurations for different
              activities. Together they enhance both energy efficiency and user experience.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Time Scheduling Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Time Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Before core hours (e.g., 06:00)</td>
                      <td className="border border-white/10 px-3 py-2">Reduced level or off, sensor-only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Core hours (e.g., 08:00-18:00)</td>
                      <td className="border border-white/10 px-3 py-2">Normal operation with daylight/occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">After hours (e.g., 20:00)</td>
                      <td className="border border-white/10 px-3 py-2">Sweep-off, sensor-only operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Night (e.g., 23:00-06:00)</td>
                      <td className="border border-white/10 px-3 py-2">Off except emergency/security</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weekends/holidays</td>
                      <td className="border border-white/10 px-3 py-2">Minimal operation, sensor-controlled only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Scene Settings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Scene</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Light Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Full</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">General work, cleaning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Presentation</td>
                      <td className="border border-white/10 px-3 py-2">30-50% (front), off (screen area)</td>
                      <td className="border border-white/10 px-3 py-2">Meeting rooms, lecture theatres</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Video conference</td>
                      <td className="border border-white/10 px-3 py-2">70% (face lighting important)</td>
                      <td className="border border-white/10 px-3 py-2">Meeting rooms with cameras</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dimmed</td>
                      <td className="border border-white/10 px-3 py-2">20-30%</td>
                      <td className="border border-white/10 px-3 py-2">Evening events, relaxation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">All off</td>
                      <td className="border border-white/10 px-3 py-2">0% (except emergency)</td>
                      <td className="border border-white/10 px-3 py-2">End of day, secure areas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration with BMS</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Central monitoring of all lighting status</li>
                <li className="pl-1">Energy consumption logging per zone</li>
                <li className="pl-1">Lamp failure alerts for maintenance</li>
                <li className="pl-1">Demand response for load shedding</li>
                <li className="pl-1">Fire alarm integration (full on, escape routes)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>User override:</strong> Always provide local override capability for occupant comfort. Log overrides to identify spaces where automatic settings need adjustment.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: DALI System Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> An open plan office has 48 luminaires to be controlled with DALI. How many buses are required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>DALI maximum: 64 devices per bus</p>
                <p className="mt-2">Luminaires: 48</p>
                <p>Additional devices required:</p>
                <p>- 4 occupancy sensors</p>
                <p>- 4 daylight sensors</p>
                <p>- 2 switch modules</p>
                <p className="mt-2">Total devices: 48 + 4 + 4 + 2 = <strong>58 devices</strong></p>
                <p className="mt-2">58 &lt; 64 limit</p>
                <p className="text-green-400">✓ Single DALI bus sufficient</p>
                <p className="mt-2 text-white/60">Note: Allow headroom for future expansion</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Control Zone Layout</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office is 15m deep with windows on one side. How many daylight control zones are appropriate?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Daylight penetration typically 4-6m effective depth</p>
                <p className="mt-2">Room depth: 15m from window</p>
                <p className="mt-2"><strong>Recommended zones:</strong></p>
                <p>Zone 1: 0-5m (perimeter) - daylight-linked dimming</p>
                <p>Zone 2: 5-10m (intermediate) - daylight-linked dimming</p>
                <p>Zone 3: 10-15m (core) - occupancy control only</p>
                <p className="mt-2"><strong>3 control zones recommended</strong></p>
                <p className="mt-2 text-white/60">Each zone: separate photocell + DALI group</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Energy Savings Estimate</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Estimate annual energy savings for lighting controls in a 500m² office operating 2500 hours/year.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Base case (no controls): 10 W/m² × 500m² × 2500h = 12,500 kWh/year</p>
                <p className="mt-2">Control savings estimates:</p>
                <p>- Daylight linking (40% area): 30% saving = 1500 kWh</p>
                <p>- Absence detection (100% area): 35% saving = 4375 kWh</p>
                <p>- Combined (with overlap factor 0.7):</p>
                <p className="mt-2">Total saving: (1500 + 4375) × 0.7 = <strong>4113 kWh/year</strong></p>
                <p className="mt-2">Percentage saving: 4113/12500 = <strong>33%</strong></p>
                <p className="mt-2 text-white/60">At £0.30/kWh = £1234/year cost saving</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">DALI Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Count total devices (luminaires + sensors + switches)</li>
                <li className="pl-1">Check cable length does not exceed 300m</li>
                <li className="pl-1">Include DALI power supply (2W typical per bus)</li>
                <li className="pl-1">Plan groups and scenes during design</li>
                <li className="pl-1">Specify DALI-2 for new installations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Compliance</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Presence/absence detection in spaces &gt;30m²</li>
                <li className="pl-1">Daylight dimming within 3m of windows</li>
                <li className="pl-1">Local switching for rooms &lt;4 luminaires</li>
                <li className="pl-1">Addressable control for larger installations</li>
                <li className="pl-1">Controls contribute to LENI calculation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sensor blind spots:</strong> Check coverage patterns carefully</li>
                <li className="pl-1"><strong>Too few zones:</strong> Large zones reduce savings potential</li>
                <li className="pl-1"><strong>No local override:</strong> Occupants will bypass controls</li>
                <li className="pl-1"><strong>Poor commissioning:</strong> Controls only effective when properly set up</li>
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
                <p className="font-medium text-white mb-1">DALI Specifications</p>
                <ul className="space-y-0.5">
                  <li>Bus voltage: 16V DC nominal</li>
                  <li>Max devices: 64 per bus</li>
                  <li>Groups: 16 max</li>
                  <li>Scenes: 16 max</li>
                  <li>Cable length: 300m max</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Control Strategies</p>
                <ul className="space-y-0.5">
                  <li>Absence detection preferred</li>
                  <li>Daylight zone depth: 4-6m</li>
                  <li>Hold-on time: 10-20 min</li>
                  <li>Local override essential</li>
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
            <Link to="../h-n-c-module4-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Emergency Lighting
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4-5">
              Next: External Lighting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section4_4;
