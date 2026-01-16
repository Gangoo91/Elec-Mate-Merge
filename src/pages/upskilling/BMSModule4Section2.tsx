import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule4Section2QuizData } from "@/data/upskilling/bmsModule4Section2QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "daylight-zoning",
    question: "Why does daylight harvesting often dim only some lights instead of all lights in a space?",
    options: [
      "To save money on dimming equipment",
      "Natural light distribution varies across the space",
      "The BMS can only control a few fittings",
      "Occupants prefer varied lighting"
    ],
    correctIndex: 1,
    explanation: "Natural light penetration decreases with distance from windows. Areas near windows receive abundant daylight and can have artificial lighting dimmed significantly, whilst interior areas still require full artificial illumination to maintain consistent lighting levels."
  },
  {
    id: "pir-delay",
    question: "Why do PIR-controlled lights have a delay before switching off?",
    options: [
      "To save energy during the delay period",
      "To prevent nuisance switching when occupants are still but not moving",
      "To comply with building regulations",
      "To extend lamp life"
    ],
    correctIndex: 1,
    explanation: "PIR sensors detect movement and heat changes. When people are stationary (reading, typing, thinking), they may not trigger the sensor. A time delay prevents lights from switching off during these still periods, avoiding disruption and annoyance."
  },
  {
    id: "combined-strategy",
    question: "What is one advantage of combining daylight harvesting with PIR logic?",
    options: [
      "Reduced sensor costs",
      "Maximum energy savings without sacrificing user comfort",
      "Simpler wiring requirements",
      "Less commissioning time"
    ],
    correctIndex: 1,
    explanation: "Combined systems address both when lights are needed (occupancy) and how much light is needed (daylight response). This comprehensive approach can achieve 40-60% energy savings whilst maintaining optimal lighting conditions for all scenarios."
  },
  {
    id: "sensor-placement",
    question: "Where should a daylight sensor NOT be positioned?",
    options: [
      "In the centre of the controlled zone",
      "Directly facing a window receiving direct sunlight",
      "Away from heat sources",
      "At desk height in open plan offices"
    ],
    correctIndex: 1,
    explanation: "Positioning a daylight sensor directly facing a window receiving direct sunlight will cause it to read excessively high lux levels, resulting in inappropriate dimming of artificial lights even when the rest of the space is too dark."
  }
];

const faqs = [
  {
    question: "What lux level should be targeted for typical office spaces?",
    answer: "Office spaces typically require 300-500 lux at desk level. Task areas may need 500-750 lux. The target should be set based on the specific activities performed and BS EN 12464-1 requirements for workplace lighting."
  },
  {
    question: "How long should the PIR time delay be set for different applications?",
    answer: "Meeting rooms: 15-30 minutes (to cover quiet periods), corridors: 5-10 minutes, toilets: 5-10 minutes, private offices: 10-15 minutes. Longer delays prevent nuisance switching but reduce energy savings."
  },
  {
    question: "Can daylight sensors work effectively in spaces without windows?",
    answer: "Daylight harvesting provides minimal benefit in spaces without natural light. However, sensors can still be used to maintain consistent light levels and compensate for lamp depreciation over time."
  },
  {
    question: "What causes false PIR triggers?",
    answer: "Common causes include HVAC air movement (papers, blinds), direct sunlight on the sensor lens, heat sources near the sensor (radiators, equipment), pets or insects, and vibration from machinery or building movement."
  }
];

const BMSModule4Section2 = () => {
  useSEO({
    title: "Daylight Harvesting and PIR Logic | BMS Module 4.2",
    description: "Master daylight harvesting and PIR occupancy sensing in BMS applications. Learn sensor placement, commissioning techniques, and energy-saving strategies for intelligent lighting control."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Daylight Harvesting and PIR Logic
          </h1>
          <p className="text-white/80">
            Intelligent lighting control through natural light and occupancy sensing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Daylight:</strong> Auto-dim based on natural light</li>
              <li><strong>PIR:</strong> Occupancy-based switching</li>
              <li><strong>Combined:</strong> 40-60% energy savings achievable</li>
              <li><strong>Critical:</strong> Sensor placement is everything</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Ceiling lux sensors, PIR detectors, motion sensors</li>
              <li><strong>Use:</strong> Reducing lighting bills, automatic control</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Daylight harvesting principles and benefits",
              "PIR occupancy sensing technology",
              "Combined control strategies",
              "Sensor installation best practices",
              "Wiring techniques for sensor systems",
              "Commissioning and calibration procedures",
              "Troubleshooting common issues",
              "Energy savings optimisation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Daylight Harvesting Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Daylight harvesting systems utilise light sensors (photocells/lux sensors) to continuously monitor natural
              illumination and automatically adjust artificial lighting to maintain consistent target illumination. This
              creates optimal visual conditions whilst minimising energy consumption.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Components and Functions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lux Sensors:</strong> 0-2000 lux range, ±5% accuracy</li>
                <li><strong>Control Algorithms:</strong> Proportional dimming with time delays</li>
                <li><strong>Dimming Interface:</strong> DALI, 1-10V, or wireless</li>
                <li><strong>Zone Configuration:</strong> 3-6m depth from windows typical</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ceiling-Mounted Sensors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Measure horizontal illumination</li>
                  <li>Ideal for general office use</li>
                  <li>6-10m coverage radius</li>
                  <li>Cost-effective installation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wall-Mounted Sensors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Measure vertical illumination</li>
                  <li>Better task-specific control</li>
                  <li>More occupant-representative</li>
                  <li>Higher accuracy but more costly</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Installation Parameters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Target illumination: Office 300-500 lux, Retail 500-1000 lux</li>
                <li>Sensor placement: Representative location, away from direct sunlight</li>
                <li>Response speed: Gradual dimming (2-5 minutes) to avoid distraction</li>
                <li>Override capability: Manual override for special requirements</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PIR Logic and Occupancy Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PIR (Passive Infrared) sensors detect thermal radiation changes caused by human movement and body heat,
              enabling automatic lighting control based on actual space occupancy. This technology eliminates energy
              waste in unoccupied areas.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PIR Technology Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Standard PIR:</strong> Heat + movement, 5-15m diameter</li>
                <li><strong>Ultrasonic:</strong> Motion via sound, 360° coverage</li>
                <li><strong>Dual Technology:</strong> PIR + Ultrasonic, high reliability</li>
                <li><strong>Microwave:</strong> Radio frequency, through partitions</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Private Offices</p>
                <p className="text-white/90 text-xs">30-50% energy savings</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Meeting Rooms</p>
                <p className="text-white/90 text-xs">40-70% energy savings</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Corridors</p>
                <p className="text-white/90 text-xs">50-80% energy savings</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common PIR Issues to Avoid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>False triggers:</strong> HVAC air movement, direct sunlight, heat sources</li>
                <li><strong>Poor detection:</strong> Obstructed view, wrong mounting, low sensitivity</li>
                <li><strong>Nuisance switching:</strong> Time delays too short</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Combined Control Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most effective lighting control systems integrate both daylight harvesting and PIR occupancy sensing.
              This combination addresses both temporal (when lights are needed) and spatial (how much light is needed)
              efficiency, maximising savings whilst maintaining comfort.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Logic Matrix:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Occupied + Bright:</strong> Dimmed to 20-30% (maximum savings)</li>
                <li><strong>Occupied + Overcast:</strong> Dimmed to 60-80% (moderate savings)</li>
                <li><strong>Occupied + Dark:</strong> Full brightness 100% (comfort maintained)</li>
                <li><strong>Vacant + Any:</strong> Switched OFF (complete savings)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Priority Hierarchy</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Safety override (always first)</li>
                  <li>2. Occupancy primary control</li>
                  <li>3. Daylight secondary adjustment</li>
                  <li>4. Manual user override</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zone Coordination</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Perimeter: PIR + Daylight active</li>
                  <li>Interior: PIR primary only</li>
                  <li>Circulation: PIR + time schedules</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Implementation and Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful implementation requires systematic approach to site survey, sensor selection, installation,
              and commissioning. Poor sensor placement can negate all potential benefits.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Daylight Commissioning</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Map daylight gradients with lux meter</li>
                  <li>Position away from direct sunlight</li>
                  <li>Set target levels per room function</li>
                  <li>Configure gradual response (2-5 min)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PIR Commissioning</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use manufacturer detection patterns</li>
                  <li>Avoid HVAC vents, windows, heat</li>
                  <li>Set time delay per application</li>
                  <li>Walk-test with client present</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: Secondary School Lighting</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Challenge:</strong> Large secondary school with 40 classrooms needed lighting control to reduce
                energy costs whilst maintaining educational lighting standards. Initial installation had poor sensor placement.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="font-medium text-red-400/80 mb-2">Initial Problems</p>
                <ul className="space-y-1">
                  <li>Sensors too close to windows</li>
                  <li>Back of rooms too dark (&lt;300 lux)</li>
                  <li>Teacher complaints about lighting</li>
                  <li>Energy savings not achieved</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Corrective Actions</p>
                <ul className="space-y-1">
                  <li>Sensors repositioned 2m from windows</li>
                  <li>PIR delays set to 15 minutes</li>
                  <li>Dual-tech sensors for quiet periods</li>
                  <li>Individual zone calibration</li>
                </ul>
              </div>
            </div>
            <div className="p-3 rounded bg-transparent border border-white/10 text-sm">
              <p className="text-white"><strong>Result:</strong> 35% annual energy reduction, consistent 400-500 lux
              throughout classrooms, improved learning environment, reduced maintenance.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Target Lux Levels</p>
              <ul className="space-y-0.5">
                <li>Offices: 300-500 lux</li>
                <li>Retail: 500-1000 lux</li>
                <li>Corridors: 100-150 lux</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">PIR Time Delays</p>
              <ul className="space-y-0.5">
                <li>Meeting rooms: 15-30 min</li>
                <li>Offices: 10-15 min</li>
                <li>Toilets/corridors: 5-10 min</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={bmsModule4Section2QuizData}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule4Section2;
