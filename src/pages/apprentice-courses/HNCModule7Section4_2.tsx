import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Occupancy Sensing - HNC Module 7 Section 4.2";
const DESCRIPTION = "Master occupancy sensing technologies for building services: PIR, microwave and ultrasonic sensors, detection patterns, placement guidelines, sensitivity adjustment, hold-off times, and absence vs presence detection strategies.";

const quickCheckQuestions = [
  {
    id: "pir-detection",
    question: "What does a PIR (Passive Infrared) sensor detect?",
    options: ["Movement through air pressure changes", "Changes in infrared radiation from moving warm bodies", "Sound waves from occupant movement", "Electromagnetic field disturbances"],
    correctIndex: 1,
    explanation: "PIR sensors detect changes in infrared radiation caused by warm bodies moving across their field of view. They are passive because they do not emit any signal - they only receive infrared energy from their surroundings."
  },
  {
    id: "microwave-vs-pir",
    question: "What is the main advantage of microwave sensors over PIR sensors?",
    options: ["Lower cost and simpler installation", "Detection through lightweight partitions and glass", "Better performance in high-temperature environments", "Longer detection range outdoors"],
    correctIndex: 1,
    explanation: "Microwave sensors emit high-frequency radio waves that can penetrate lightweight materials such as glass, thin partitions, and some building materials, enabling detection through obstacles where PIR would fail."
  },
  {
    id: "hold-off-time",
    question: "What is the purpose of hold-off (delay) time in occupancy sensors?",
    options: ["To allow the sensor to warm up before operation", "To keep lights on for a set period after last detected movement", "To prevent false triggering during sensor calibration", "To synchronise multiple sensors on a circuit"],
    correctIndex: 1,
    explanation: "Hold-off or delay time keeps the lighting on for a predetermined period after the last detected movement. This prevents lights cycling off when occupants are stationary and ensures comfortable operation without frequent switching."
  },
  {
    id: "absence-detection",
    question: "What distinguishes absence detection from presence detection?",
    options: ["Absence detection uses ultrasonic technology only", "Absence detection requires manual switch-on but automatic switch-off", "Absence detection has longer hold-off times", "Absence detection works only in corridors"],
    correctIndex: 1,
    explanation: "Absence detection (also called vacancy sensing) requires the occupant to manually switch lights on, but automatically switches them off when the space becomes unoccupied. This is more energy-efficient than full presence detection which switches on automatically."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "PIR sensors are most effective when occupants move:",
    options: [
      "Directly towards or away from the sensor",
      "Across the sensor's field of view (perpendicular movement)",
      "In circular patterns around the sensor",
      "Very slowly within the detection zone"
    ],
    correctAnswer: 1,
    explanation: "PIR sensors detect changes in infrared radiation across their segmented detection zones. Movement perpendicular to the sensor (across the field of view) creates the strongest signal as the body moves between detection segments."
  },
  {
    id: 2,
    question: "The typical detection range for a ceiling-mounted PIR sensor at 2.8m height is:",
    options: ["2-3 metres diameter", "4-6 metres diameter", "8-12 metres diameter", "15-20 metres diameter"],
    correctAnswer: 1,
    explanation: "Ceiling-mounted PIR sensors typically provide 4-6 metre diameter coverage at standard ceiling heights (2.4-3m). The detection pattern is generally conical, widening with distance from the sensor."
  },
  {
    id: 3,
    question: "Which sensor technology is most suitable for a toilet cubicle where the occupant may be stationary for extended periods?",
    options: ["Standard PIR", "Microwave", "Ultrasonic", "Photocell"],
    correctAnswer: 2,
    explanation: "Ultrasonic sensors detect very minor movements including breathing by measuring Doppler shift in reflected sound waves. This makes them ideal for spaces where occupants are stationary, such as toilet cubicles."
  },
  {
    id: 4,
    question: "What is the recommended hold-off time for corridor lighting with occupancy sensing?",
    options: ["5-10 seconds", "30-60 seconds", "5-10 minutes", "15-20 minutes"],
    correctAnswer: 1,
    explanation: "Corridors typically use 30-60 second hold-off times. This allows time for people to pass through while minimising energy waste. Shorter times risk lights switching off while people are still present; longer times waste energy."
  },
  {
    id: 5,
    question: "Which installation location would cause false triggering of a PIR sensor?",
    options: [
      "Centre of an open-plan office ceiling",
      "Facing a window with direct sunlight",
      "Above the entry door to a meeting room",
      "At the end of a corridor"
    ],
    correctAnswer: 1,
    explanation: "PIR sensors can false trigger from rapid temperature changes caused by direct sunlight, HVAC airflow, or heat sources. Sensors should be positioned away from windows with direct sunlight, radiators, and air conditioning vents."
  },
  {
    id: 6,
    question: "A dual-technology sensor combines PIR with microwave detection. What is the primary benefit?",
    options: [
      "Increased detection range",
      "Reduced false triggering - both technologies must detect movement",
      "Lower installation cost",
      "Simplified commissioning process"
    ],
    correctAnswer: 1,
    explanation: "Dual-technology sensors require both PIR AND microwave to detect movement before triggering, significantly reducing false activations. This is valuable in challenging environments where single-technology sensors may false trigger."
  },
  {
    id: 7,
    question: "For open-plan offices greater than 100m², which sensor arrangement is most appropriate?",
    options: [
      "Single high-sensitivity PIR sensor centrally located",
      "Multiple sensors with overlapping detection zones",
      "One microwave sensor per 50m²",
      "Ultrasonic sensors only"
    ],
    correctAnswer: 1,
    explanation: "Large open-plan areas require multiple sensors with overlapping detection zones to ensure complete coverage. Single sensors cannot adequately cover large areas, and gaps in detection lead to lights switching off while spaces are occupied."
  },
  {
    id: 8,
    question: "What is the typical operating frequency range for ultrasonic occupancy sensors?",
    options: ["500 Hz - 2 kHz", "25 kHz - 40 kHz", "100 kHz - 200 kHz", "2.4 GHz - 5.8 GHz"],
    correctAnswer: 1,
    explanation: "Ultrasonic sensors typically operate at 25-40 kHz, above the human hearing range (typically up to 20 kHz). This frequency provides good detection sensitivity without causing audible noise for occupants."
  },
  {
    id: 9,
    question: "According to Building Regulations Part L, absence detection is preferred over presence detection because:",
    options: [
      "It uses cheaper sensor technology",
      "It provides higher energy savings by requiring manual switch-on",
      "It is easier to install and commission",
      "It works better in daylight conditions"
    ],
    correctAnswer: 1,
    explanation: "Absence detection (manual on, automatic off) typically achieves 30-40% higher energy savings compared to presence detection because occupants often don't need lights when entering a space with adequate daylight, but would trigger automatic-on systems."
  },
  {
    id: 10,
    question: "When commissioning occupancy sensors, the walk test should verify:",
    options: [
      "The sensor responds to movement throughout the intended coverage area",
      "The sensor maximum range exceeds 20 metres",
      "The sensor triggers from adjacent rooms",
      "The hold-off time is set to minimum"
    ],
    correctAnswer: 0,
    explanation: "Walk testing verifies that the sensor detects movement throughout the entire intended coverage area and does not have blind spots. The tester walks the space boundaries while observing sensor response to ensure complete coverage."
  },
  {
    id: 11,
    question: "Microwave sensors operating at 5.8 GHz should not be installed:",
    options: [
      "In rooms with suspended ceilings",
      "Near thin partition walls where detection could extend beyond the room",
      "In areas with fluorescent lighting",
      "Above 3 metres height"
    ],
    correctAnswer: 1,
    explanation: "Microwave signals penetrate lightweight materials including plasterboard partitions, meaning sensors can detect movement in adjacent spaces causing unwanted triggering. Position microwave sensors away from thin partitions or use PIR in such locations."
  },
  {
    id: 12,
    question: "What sensitivity adjustment should be made if a PIR sensor false triggers from HVAC airflow?",
    options: [
      "Increase sensitivity to override the interference",
      "Decrease sensitivity and consider relocating the sensor",
      "Change to a microwave sensor",
      "Increase hold-off time"
    ],
    correctAnswer: 1,
    explanation: "Reducing sensitivity can help filter out minor temperature fluctuations from HVAC airflow. However, relocation away from air vents is often the better solution. Increasing hold-off time masks the problem but does not solve the false triggering issue."
  }
];

const faqs = [
  {
    question: "What is the difference between presence and absence detection?",
    answer: "Presence detection (automatic on/off) switches lights on when movement is detected and off after the hold-off period. Absence detection (manual on, automatic off) requires the occupant to manually switch lights on but automatically switches them off when the space is vacated. Absence detection achieves higher energy savings (typically 30-40% more than presence detection) because it avoids switching lights on unnecessarily when daylight is adequate. Building Regulations Part L and BREEAM assessments favour absence detection for this reason."
  },
  {
    question: "How do I choose between PIR, microwave, and ultrasonic sensors?",
    answer: "PIR sensors are cost-effective and suitable for most applications with normal movement patterns (corridors, entrances, general offices). Microwave sensors detect through obstacles and are better for spaces with partitions or where PIR has blind spots. Ultrasonic sensors detect minor movements including breathing and are ideal for toilet cubicles and spaces where occupants are stationary. Dual-technology sensors (PIR + microwave) reduce false triggering in challenging environments. Consider the space geometry, expected occupant behaviour, and potential interference sources when selecting technology."
  },
  {
    question: "What hold-off times should I specify for different space types?",
    answer: "Hold-off times vary by application: corridors and circulation spaces typically use 30-60 seconds; toilets and washrooms use 5-10 minutes; offices and meeting rooms use 10-20 minutes; storage and plant rooms use 5-10 minutes. Longer times improve occupant comfort but increase energy consumption. Some controls allow adaptive hold-off that adjusts based on usage patterns, starting short and extending if false-offs occur."
  },
  {
    question: "Why do my occupancy sensors keep false triggering?",
    answer: "Common causes include: PIR sensors facing windows with direct sunlight or positioned near HVAC vents (temperature fluctuations); microwave sensors detecting through partitions into adjacent spaces; sensors set to excessive sensitivity; electrical interference from nearby equipment. Solutions include relocating sensors, reducing sensitivity, using dual-technology sensors, or installing sensor guards/masks to limit the detection field."
  },
  {
    question: "How many sensors do I need for a large open-plan office?",
    answer: "Calculate coverage by dividing the floor area by the sensor's coverage area (typically 30-40m² for ceiling-mounted PIR at 2.8m height). Ensure overlap between adjacent sensors (typically 10-20% overlap) to eliminate blind spots. For a 200m² office with 40m² sensors, you would need minimum 5-6 sensors with overlapping coverage. Consider furniture and partition layouts that may create shadows in the detection pattern."
  },
  {
    question: "Can occupancy sensors work with DALI lighting control systems?",
    answer: "Yes, occupancy sensors integrate well with DALI systems. Sensors can be DALI-addressable devices that communicate presence information to the DALI controller, which then manages appropriate luminaires. This enables sophisticated control strategies including gradual dimming before switch-off, different scenes for different occupancy levels, and coordination with daylight harvesting. DALI integration also enables remote monitoring and adjustment of sensor parameters."
  }
];

const HNCModule7Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4">
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
            <span>Module 7.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Occupancy Sensing
          </h1>
          <p className="text-white/80">
            PIR, microwave and ultrasonic sensors, placement guidelines, sensitivity adjustment, and hold-off times
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>PIR:</strong> Passive infrared - detects body heat movement</li>
              <li className="pl-1"><strong>Microwave:</strong> Active radar - penetrates partitions</li>
              <li className="pl-1"><strong>Ultrasonic:</strong> Sound waves - detects minor movement</li>
              <li className="pl-1"><strong>Hold-off:</strong> Time delay before switching off</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L:</strong> Absence detection preferred for energy saving</li>
              <li className="pl-1"><strong>Coverage:</strong> 4-6m diameter typical for PIR</li>
              <li className="pl-1"><strong>Integration:</strong> DALI, KNX, BMS compatible</li>
              <li className="pl-1"><strong>Commissioning:</strong> Walk test essential for coverage</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain PIR, microwave and ultrasonic sensor operating principles",
              "Select appropriate sensor technology for different space types",
              "Apply correct sensor placement for complete coverage",
              "Configure sensitivity settings to minimise false triggering",
              "Specify hold-off times for different applications",
              "Distinguish between absence and presence detection strategies"
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

        {/* Section 1: Sensor Technologies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Sensor Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Occupancy sensors detect human presence to control lighting and HVAC systems automatically,
              reducing energy consumption by ensuring services operate only when spaces are occupied.
              Three primary technologies are used, each with distinct operating principles and applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PIR (Passive Infrared) Sensors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Principle:</strong> Detects changes in infrared radiation from warm bodies moving across segmented detection zones</li>
                <li className="pl-1"><strong>Passive operation:</strong> Does not emit any signal - only receives infrared energy</li>
                <li className="pl-1"><strong>Best detection:</strong> Movement perpendicular to the sensor (across the field of view)</li>
                <li className="pl-1"><strong>Limitations:</strong> Cannot detect stationary occupants; affected by heat sources and sunlight</li>
                <li className="pl-1"><strong>Typical coverage:</strong> 4-6m diameter at 2.8m ceiling height</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Microwave (Radar) Sensors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Principle:</strong> Emits high-frequency radio waves (typically 5.8 GHz or 10.525 GHz) and detects Doppler shift from moving objects</li>
                <li className="pl-1"><strong>Active operation:</strong> Transmits and receives signals continuously</li>
                <li className="pl-1"><strong>Penetration:</strong> Can detect through glass, thin partitions, and some building materials</li>
                <li className="pl-1"><strong>Best detection:</strong> Movement towards or away from the sensor</li>
                <li className="pl-1"><strong>Limitations:</strong> May detect through walls causing unwanted triggering; higher power consumption</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ultrasonic Sensors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Principle:</strong> Emits high-frequency sound waves (25-40 kHz) and detects Doppler shift from movement</li>
                <li className="pl-1"><strong>High sensitivity:</strong> Can detect very minor movements including breathing</li>
                <li className="pl-1"><strong>Contained coverage:</strong> Sound waves do not penetrate solid walls</li>
                <li className="pl-1"><strong>Ideal applications:</strong> Toilet cubicles, spaces with stationary occupants</li>
                <li className="pl-1"><strong>Limitations:</strong> Air turbulence and certain materials can cause false triggers</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technology Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PIR</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Microwave</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ultrasonic</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Detection method</td>
                      <td className="border border-white/10 px-3 py-2">Heat differential</td>
                      <td className="border border-white/10 px-3 py-2">Radio wave reflection</td>
                      <td className="border border-white/10 px-3 py-2">Sound wave reflection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stationary detection</td>
                      <td className="border border-white/10 px-3 py-2">Poor</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Through-wall detection</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                      <td className="border border-white/10 px-3 py-2">Yes (thin walls)</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Medium-High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power consumption</td>
                      <td className="border border-white/10 px-3 py-2">Very low</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Dual-technology sensors combine PIR and microwave, requiring both to detect movement before triggering - significantly reducing false activations in challenging environments.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Detection Patterns and Placement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Detection Patterns and Placement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective occupancy sensing requires understanding detection patterns and strategic
              sensor placement to achieve complete coverage without blind spots or unwanted
              detection in adjacent areas.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PIR Detection Pattern</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Conical pattern from sensor</li>
                  <li className="pl-1">Segmented zones (fingers)</li>
                  <li className="pl-1">Best across field of view</li>
                  <li className="pl-1">Weaker towards/away motion</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Microwave Pattern</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Elliptical/spherical coverage</li>
                  <li className="pl-1">Penetrates lightweight walls</li>
                  <li className="pl-1">Best towards/away motion</li>
                  <li className="pl-1">Adjustable range/sensitivity</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ultrasonic Pattern</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Hemispherical coverage</li>
                  <li className="pl-1">Fills entire room volume</li>
                  <li className="pl-1">Reflects off hard surfaces</li>
                  <li className="pl-1">Absorbed by soft materials</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Placement Guidelines</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Sensor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Placement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridor</td>
                      <td className="border border-white/10 px-3 py-2">PIR (ceiling mount)</td>
                      <td className="border border-white/10 px-3 py-2">Central, 6-8m spacing, covering entry points</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open-plan office</td>
                      <td className="border border-white/10 px-3 py-2">PIR or dual-tech</td>
                      <td className="border border-white/10 px-3 py-2">Grid pattern, 5-6m centres, overlapping zones</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Private office</td>
                      <td className="border border-white/10 px-3 py-2">PIR or ultrasonic</td>
                      <td className="border border-white/10 px-3 py-2">Central ceiling, or wall-mount facing desk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Toilet cubicle</td>
                      <td className="border border-white/10 px-3 py-2">Ultrasonic</td>
                      <td className="border border-white/10 px-3 py-2">Ceiling mount, one per cubicle</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Meeting room</td>
                      <td className="border border-white/10 px-3 py-2">Ultrasonic or dual-tech</td>
                      <td className="border border-white/10 px-3 py-2">Central ceiling, covering all seating positions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse</td>
                      <td className="border border-white/10 px-3 py-2">High-bay PIR or microwave</td>
                      <td className="border border-white/10 px-3 py-2">At aisles, entry points, high-traffic routes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Placement Pitfalls to Avoid</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">PIR sensors facing windows with direct sunlight (false triggers)</li>
                <li className="pl-1">PIR sensors near HVAC vents or radiators (temperature interference)</li>
                <li className="pl-1">Microwave sensors near thin partitions (detection through walls)</li>
                <li className="pl-1">Sensors behind obstacles blocking line of sight</li>
                <li className="pl-1">Single sensors in L-shaped rooms (blind spots in corners)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Coverage rule:</strong> For large spaces, ensure 10-20% overlap between adjacent sensor detection zones to eliminate blind spots and provide redundancy.
            </p>
          </div>
        </section>

        {/* Section 3: Sensitivity and Hold-Off Times */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sensitivity and Hold-Off Times
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct configuration of sensitivity and hold-off (delay) times is critical for
              reliable operation. Settings must balance responsive detection against false
              triggering while optimising energy savings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Sensitivity Adjustment</p>
              <div className="text-sm space-y-2">
                <p><strong>High sensitivity:</strong> Detects minor movements, greater range, but increased false trigger risk</p>
                <p><strong>Low sensitivity:</strong> Requires significant movement, reduced range, fewer false triggers</p>
                <p><strong>Adjustment method:</strong> Start at medium, walk test the space, adjust based on coverage gaps or false triggers</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensitivity Setting Guidance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Increase sensitivity:</strong> When detection gaps exist, when occupants report lights turning off while present</li>
                <li className="pl-1"><strong>Decrease sensitivity:</strong> When false triggers occur, near HVAC vents, in high-ceiling applications</li>
                <li className="pl-1"><strong>Microwave range:</strong> Reduce range setting if detecting through partitions into adjacent spaces</li>
                <li className="pl-1"><strong>Walk test:</strong> Essential after any adjustment - verify coverage at all boundaries</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hold-Off Time Recommendations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Hold-Off</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridors</td>
                      <td className="border border-white/10 px-3 py-2">30-60 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Transit spaces with brief occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Toilets/washrooms</td>
                      <td className="border border-white/10 px-3 py-2">5-10 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Stationary occupants, privacy concerns</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Private offices</td>
                      <td className="border border-white/10 px-3 py-2">15-20 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Extended stationary work at desks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Meeting rooms</td>
                      <td className="border border-white/10 px-3 py-2">15-20 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Seated meetings with limited movement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open-plan offices</td>
                      <td className="border border-white/10 px-3 py-2">10-15 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Multiple occupants provide movement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Storage/plant rooms</td>
                      <td className="border border-white/10 px-3 py-2">5-10 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Brief access, high energy saving potential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advanced Hold-Off Features</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Adaptive hold-off:</strong> Automatically adjusts based on occupancy patterns - shorter during day, longer initially</li>
                <li className="pl-1"><strong>Grace period:</strong> Brief re-detection window that resets timer without full restart</li>
                <li className="pl-1"><strong>Dimming before off:</strong> Reduces to minimum level for 30s before switching off as warning</li>
                <li className="pl-1"><strong>Daylight linking:</strong> Reduces hold-off when daylight is adequate (lights not needed anyway)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy vs comfort:</strong> Shorter hold-off times save more energy but risk lights turning off while spaces are occupied. Balance based on space type and user expectations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Absence vs Presence Detection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Absence vs Presence Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between presence detection (automatic on/off) and absence detection
              (manual on, automatic off) significantly impacts energy savings and user experience.
              Building Regulations and sustainability assessments increasingly favour absence detection.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Presence Detection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Operation:</strong> Auto-on when movement detected, auto-off after hold-off</li>
                  <li className="pl-1"><strong>User experience:</strong> Convenient - no manual switching required</li>
                  <li className="pl-1"><strong>Energy impact:</strong> May switch lights on unnecessarily (adequate daylight)</li>
                  <li className="pl-1"><strong>Best for:</strong> Circulation areas, stairwells, toilets, storage</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Absence Detection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Operation:</strong> Manual switch-on required, auto-off after hold-off</li>
                  <li className="pl-1"><strong>User experience:</strong> Requires user action but avoids unwanted light</li>
                  <li className="pl-1"><strong>Energy impact:</strong> 30-40% more savings than presence detection</li>
                  <li className="pl-1"><strong>Best for:</strong> Offices, meeting rooms, areas with good daylight</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Building Regulations Part L Guidance</p>
              <p className="text-sm text-white">
                Part L2A (new non-domestic buildings) requires lighting controls that prevent energy waste.
                Absence detection is recognised as achieving higher compliance scores and is preferred
                in BREEAM assessments. Where presence detection is used, hold-off times should not
                exceed manufacturer recommendations for the space type.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Strategy Selection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (good daylight)</td>
                      <td className="border border-white/10 px-3 py-2">Absence detection</td>
                      <td className="border border-white/10 px-3 py-2">User decides if light needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (no daylight)</td>
                      <td className="border border-white/10 px-3 py-2">Presence detection</td>
                      <td className="border border-white/10 px-3 py-2">Light always needed when occupied</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridors</td>
                      <td className="border border-white/10 px-3 py-2">Presence detection</td>
                      <td className="border border-white/10 px-3 py-2">Safety - instant light for transit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stairwells</td>
                      <td className="border border-white/10 px-3 py-2">Presence detection</td>
                      <td className="border border-white/10 px-3 py-2">Safety - prevent trips/falls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Meeting rooms</td>
                      <td className="border border-white/10 px-3 py-2">Absence detection</td>
                      <td className="border border-white/10 px-3 py-2">Often adequate daylight available</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Toilets/washrooms</td>
                      <td className="border border-white/10 px-3 py-2">Presence detection</td>
                      <td className="border border-white/10 px-3 py-2">Convenience and hygiene (no touch)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration with Lighting Control Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DALI integration:</strong> Sensors communicate occupancy to controller for coordinated response</li>
                <li className="pl-1"><strong>Daylight harvesting:</strong> Combine with photocells to dim when daylight adequate</li>
                <li className="pl-1"><strong>Scene control:</strong> Occupancy can trigger pre-set lighting scenes</li>
                <li className="pl-1"><strong>BMS interface:</strong> Report occupancy data for HVAC control and space utilisation analytics</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Specification tip:</strong> For Part L compliance documentation, specify both the detection type (absence/presence) and hold-off times for each space type to demonstrate appropriate control strategy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Open-Plan Office Sensor Layout</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design occupancy sensing for a 150m² open-plan office, 2.7m ceiling height, good daylight from south-facing windows.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate sensor quantity</p>
                <p>Ceiling PIR coverage at 2.7m = approx. 36m² per sensor</p>
                <p>150m² ÷ 36m² = 4.2 sensors minimum</p>
                <p>Add 20% overlap = 5 sensors required</p>
                <p className="mt-2 text-white/60">Step 2: Select detection strategy</p>
                <p>Good daylight available → Absence detection (manual on, auto off)</p>
                <p>Part L compliant, BREEAM credits available</p>
                <p className="mt-2 text-white/60">Step 3: Configure settings</p>
                <p>Hold-off time: 15 minutes (seated desk work)</p>
                <p>Sensitivity: Medium (adjust after walk test)</p>
                <p>Integration: DALI sensors linked to daylight dimming</p>
                <p className="mt-2 text-green-400">Result: 5× DALI PIR sensors, absence mode, 15-min hold-off</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Toilet and Washroom Installation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify sensors for a 6-cubicle male toilet with common washbasin area.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Cubicles:</p>
                <p>Technology: Ultrasonic (detects stationary occupants)</p>
                <p>Quantity: 1 sensor per cubicle = 6 sensors</p>
                <p>Hold-off: 10 minutes (extended stationary occupancy)</p>
                <p>Mode: Presence detection (auto on/off)</p>
                <p className="mt-2 text-white/60">Washbasin area:</p>
                <p>Technology: PIR (adequate for hand-washing activity)</p>
                <p>Quantity: 1 ceiling-mounted sensor</p>
                <p>Hold-off: 5 minutes</p>
                <p>Mode: Presence detection</p>
                <p className="mt-2 text-white/60">Control integration:</p>
                <p>Link washbasin sensor to extract fan start</p>
                <p>30-minute overrun on extract after last detection</p>
                <p className="mt-2 text-green-400">Total: 6× ultrasonic (cubicles) + 1× PIR (washbasins)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: False Trigger Troubleshooting</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> PIR sensor in meeting room triggers lights when room is empty, especially in afternoon.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Investigation:</p>
                <p>Afternoon timing → suspect sunlight involvement</p>
                <p>Check: Sensor faces west window (direct afternoon sun)</p>
                <p>Cause: Rapid temperature change from sun movement</p>
                <p className="mt-2 text-white/60">Solutions (in order of preference):</p>
                <p>1. Relocate sensor away from window view</p>
                <p>2. Install sensor hood/mask to block window direction</p>
                <p>3. Reduce sensitivity (may reduce detection range)</p>
                <p>4. Replace with dual-tech sensor (PIR + microwave)</p>
                <p className="mt-2 text-white/60">Implementation:</p>
                <p>Relocated sensor to ceiling centre, facing door entry</p>
                <p>Walk test confirmed full coverage maintained</p>
                <p className="mt-2 text-green-400">Result: False triggering eliminated</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify expected occupant movement patterns (walking, seated, stationary)</li>
                <li className="pl-1">Consider presence of partitions or obstacles that block line of sight</li>
                <li className="pl-1">Check for potential interference sources (HVAC, sunlight, heat sources)</li>
                <li className="pl-1">Determine if detection through walls is problematic (microwave consideration)</li>
                <li className="pl-1">Match technology to space: PIR for general, ultrasonic for stationary, dual-tech for difficult environments</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Parameters to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">PIR coverage: <strong>4-6m diameter</strong> at 2.8m ceiling height</li>
                <li className="pl-1">Ultrasonic frequency: <strong>25-40 kHz</strong> (above human hearing)</li>
                <li className="pl-1">Microwave frequency: <strong>5.8 GHz or 10.525 GHz</strong> typical</li>
                <li className="pl-1">Sensor overlap: <strong>10-20%</strong> for complete coverage</li>
                <li className="pl-1">Absence vs presence savings: <strong>30-40% additional</strong> with absence detection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Commissioning Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>No walk test:</strong> Detection gaps only discovered after handover complaints</li>
                <li className="pl-1"><strong>Default settings:</strong> Factory hold-off times rarely suit actual space requirements</li>
                <li className="pl-1"><strong>Maximum sensitivity:</strong> Causes false triggers - start medium and adjust</li>
                <li className="pl-1"><strong>Ignoring furniture:</strong> Desks and partitions create shadows not on drawings</li>
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
                <p className="font-medium text-white mb-1">Sensor Technologies</p>
                <ul className="space-y-0.5">
                  <li>PIR: Passive, heat differential, 4-6m range</li>
                  <li>Microwave: Active, penetrates walls, 5.8 GHz</li>
                  <li>Ultrasonic: Active, 25-40 kHz, detects breathing</li>
                  <li>Dual-tech: PIR + microwave, reduces false triggers</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Hold-Off Times</p>
                <ul className="space-y-0.5">
                  <li>Corridors: 30-60 seconds</li>
                  <li>Toilets: 5-10 minutes</li>
                  <li>Offices: 15-20 minutes</li>
                  <li>Storage: 5-10 minutes</li>
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
            <Link to="../h-n-c-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4-3">
              Next: Daylight Harvesting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section4_2;
