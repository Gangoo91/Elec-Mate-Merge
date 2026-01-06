import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule4Section4QuizData } from "@/data/upskilling/bmsModule4Section4QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "shading-purpose",
    question: "What is the primary purpose of automated shading in a BMS?",
    options: [
      "To replace manual window blinds",
      "To balance solar heat gain, glare control, and daylight optimisation",
      "To reduce installation costs",
      "To eliminate the need for HVAC"
    ],
    correctIndex: 1,
    explanation: "Automated shading systems balance multiple factors - reducing solar heat gain to lower cooling loads, controlling glare for occupant comfort, whilst still maximising useful daylight to reduce artificial lighting needs."
  },
  {
    id: "sun-tracking",
    question: "Why might a façade automation system use sun position tracking?",
    options: [
      "To reduce wear on blind motors",
      "To adjust shading position based on where sunlight is actually coming from",
      "To synchronise with other buildings",
      "To comply with planning regulations"
    ],
    correctIndex: 1,
    explanation: "Sun position tracking allows the system to anticipate and respond to actual solar conditions. As the sun moves across the sky, blinds automatically adjust to block direct sunlight while maintaining views and daylight where possible."
  },
  {
    id: "wind-protection",
    question: "Why do external shading systems need wind sensors?",
    options: [
      "To measure air quality",
      "To retract blinds in high winds preventing damage",
      "To calculate energy savings",
      "To adjust HVAC settings"
    ],
    correctIndex: 1,
    explanation: "External blinds, awnings, and louvres are vulnerable to wind damage. Wind sensors trigger automatic retraction when speeds exceed safe limits (typically 10-15 m/s), protecting the equipment and ensuring safety."
  },
  {
    id: "integration-benefit",
    question: "How does integrating shading with lighting control maximise energy savings?",
    options: [
      "By reducing maintenance requirements",
      "By automatically adjusting artificial lighting based on shading position and daylight",
      "By eliminating the need for manual overrides",
      "By simplifying the wiring installation"
    ],
    correctIndex: 1,
    explanation: "When shading adjusts to optimise daylight, the lighting system responds by dimming artificial lights accordingly. This coordinated approach can achieve 30-40% lighting energy savings while maintaining optimal visual comfort."
  }
];

const faqs = [
  {
    question: "What motors are used for automated blinds?",
    answer: "Most automated blinds use 230V AC tubular motors (built into roller tube) or 24V DC motors for smaller blinds. DC motors are quieter and allow finer position control but require transformers. Both types include limit switches for end positions."
  },
  {
    question: "How are external louvres controlled differently from internal blinds?",
    answer: "External louvres typically need weather protection logic (wind/rain sensors), higher torque motors for outdoor conditions, and more robust construction. They're controlled by the BMS but often have local safety overrides that can't be bypassed."
  },
  {
    question: "What happens to blinds during a fire alarm?",
    answer: "In most systems, blinds are programmed to open fully during fire alarms to aid evacuation visibility and allow firefighter access. This must be coordinated with fire strategy requirements and tested during commissioning."
  },
  {
    question: "Can occupants override automated blind positions?",
    answer: "Most systems allow local override via wall switches or apps, typically with a time limit (2-4 hours) before returning to automatic control. Some premium systems learn user preferences and adapt automatic positions accordingly."
  }
];

const BMSModule4Section4 = () => {
  useSEO({
    title: "Shading, Blinds, and Facade Automation | BMS Module 4.4",
    description: "Master automated shading and facade control in BMS. Learn blind motor wiring, sun tracking, weather sensors, and integration with lighting and HVAC for optimal energy efficiency."
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

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Shading, Blinds, and Façade Automation
          </h1>
          <p className="text-white/80">
            Solar control and daylight management in intelligent building systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Balance solar gain, glare, and daylight</li>
              <li><strong>Control:</strong> Sun position, weather, occupancy</li>
              <li><strong>Motors:</strong> 230V AC tubular or 24V DC</li>
              <li><strong>Savings:</strong> 20-30% cooling, 30-40% lighting</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Motorised blinds, external louvres, facade panels</li>
              <li><strong>Use:</strong> Reducing cooling loads, managing glare, daylight optimisation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Automated shading system types",
              "Motor technologies and control methods",
              "Sun position tracking algorithms",
              "Weather sensor integration",
              "Lighting system coordination",
              "HVAC integration strategies",
              "Wiring and commissioning procedures",
              "User override and preferences"
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
            Shading System Types and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automated shading systems range from simple internal roller blinds to complex external façade systems.
              Each type offers different levels of solar control, energy savings, and aesthetic integration.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Shading System Categories:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Internal Blinds:</strong> Roller, venetian, vertical - glare control</li>
                <li><strong>External Blinds:</strong> External venetian, awnings - solar blocking</li>
                <li><strong>Louvres:</strong> Fixed or adjustable - architectural integration</li>
                <li><strong>Electrochromic Glass:</strong> Tintable glass - premium solution</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Internal Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lower cost installation</li>
                  <li>Easier maintenance access</li>
                  <li>Good glare control</li>
                  <li>Limited solar heat blocking</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">External Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Superior solar blocking (80%+)</li>
                  <li>Significant cooling load reduction</li>
                  <li>Weather protection required</li>
                  <li>Higher installation complexity</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Motor Technologies and Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Blind motors convert electrical energy into mechanical movement for raising, lowering, and tilting
              shading elements. Motor selection depends on blind size, control requirements, and installation context.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">230V AC Tubular Motors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Built into roller tube</li>
                  <li>Simple 3-wire control (L, N, reverse)</li>
                  <li>Mechanical limit switches</li>
                  <li>Cost-effective for large installations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">24V DC Motors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Quieter operation</li>
                  <li>Fine position control</li>
                  <li>Electronic limits (adjustable)</li>
                  <li>Battery backup capable</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Protocols:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Simple Switching:</strong> Up/down/stop via relays</li>
                <li><strong>SMI (Standard Motor Interface):</strong> Bidirectional communication</li>
                <li><strong>RS-485/Modbus:</strong> Integration with BMS</li>
                <li><strong>KNX/BACnet:</strong> Full building automation integration</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Weather Sensors and Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              External shading systems require weather monitoring to protect equipment and ensure safe operation.
              Weather stations provide inputs that override normal control logic when conditions require.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Wind Sensor</p>
                <p className="text-white/90 text-xs">Retract at 10-15 m/s</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Rain Sensor</p>
                <p className="text-white/90 text-xs">Protect fabric blinds</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Sun Sensor</p>
                <p className="text-white/90 text-xs">Light level + direction</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Weather Override Priorities:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. High wind - Immediate full retraction</li>
                <li>2. Storm warning - Preventive retraction</li>
                <li>3. Heavy rain - External fabric protection</li>
                <li>4. Frost/ice - Prevent mechanism damage</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Integration with Lighting and HVAC
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum energy benefits come from coordinating shading with lighting and HVAC systems. This requires
              communication between systems and careful sequencing of control actions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Coordination</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Blinds open → Dim artificial lights</li>
                  <li>Glare detected → Partial close + maintain lux</li>
                  <li>30-40% lighting energy savings</li>
                  <li>Consistent illumination maintained</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Coordination</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Summer: Close to block solar gain</li>
                  <li>Winter: Open for passive solar heating</li>
                  <li>20-30% cooling load reduction</li>
                  <li>Zone setpoint coordination</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: Glass Office Tower</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Challenge:</strong> 20-storey glass office building with severe solar gain and glare issues.
                Cooling costs were 40% above design targets. Staff complaints about hot spots and screen glare.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Solution Implemented</p>
                <ul className="space-y-1">
                  <li>External motorised venetian blinds</li>
                  <li>Sun tracking algorithm per façade</li>
                  <li>Wind/rain sensor integration</li>
                  <li>DALI lighting coordination</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Results Achieved</p>
                <ul className="space-y-1">
                  <li>35% reduction in cooling costs</li>
                  <li>28% reduction in lighting energy</li>
                  <li>85% reduction in glare complaints</li>
                  <li>Improved tenant satisfaction</li>
                </ul>
              </div>
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
              <p className="font-medium text-white mb-1">Motor Types</p>
              <ul className="space-y-0.5">
                <li>230V AC: Large installations</li>
                <li>24V DC: Quiet, fine control</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Weather Limits</p>
              <ul className="space-y-0.5">
                <li>Wind: Retract at 10-15 m/s</li>
                <li>Rain: Protect fabric systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={bmsModule4Section4QuizData}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule4Section4;
