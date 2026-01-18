import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Benefits and Applications - Smart Home Technology Module 1 Section 2";
const DESCRIPTION = "Explore smart home benefits and applications across lighting, HVAC, security, and accessibility. Learn about energy efficiency, automation, and system integration.";

const quickCheckQuestions = [
  {
    id: "smart-lighting-benefit",
    question: "What is a primary benefit of smart lighting systems?",
    options: [
      "Increased electricity consumption",
      "Manual control only",
      "Automated energy savings through occupancy sensing and scheduling",
      "Fixed brightness levels"
    ],
    correctIndex: 2,
    explanation: "Smart lighting systems can significantly reduce energy consumption through occupancy sensing, daylight harvesting, and automated scheduling that turns lights off when not needed."
  },
  {
    id: "hvac-efficiency",
    question: "How do smart HVAC systems improve energy efficiency?",
    options: [
      "By running continuously at maximum power",
      "Through zone control and learning user patterns",
      "By disabling all automation features",
      "Through manual-only temperature adjustments"
    ],
    correctIndex: 1,
    explanation: "Smart HVAC systems improve efficiency through zone control, learning user patterns, and adjusting temperatures based on occupancy and external conditions."
  },
  {
    id: "accessibility-features",
    question: "Which feature makes smart homes particularly beneficial for users with mobility limitations?",
    options: [
      "Complex touch screen controls",
      "Voice control and automated assistance",
      "Manual switches throughout the property",
      "Reduced device functionality"
    ],
    correctIndex: 1,
    explanation: "Voice control and automated assistance allow users with mobility limitations to control their home environment without physical interaction with switches or controls."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What percentage of energy savings can smart lighting systems typically achieve?",
    options: [
      "5-10%",
      "15-25%",
      "30-60%",
      "80-90%"
    ],
    correctAnswer: 2,
    explanation: "Smart lighting systems can typically achieve 30-60% energy savings through occupancy sensing, daylight harvesting, and automated scheduling."
  },
  {
    id: 2,
    question: "Which smart lighting feature adjusts artificial light based on natural daylight levels?",
    options: [
      "Colour temperature control",
      "Daylight harvesting",
      "Motion sensing",
      "Scene programming"
    ],
    correctAnswer: 1,
    explanation: "Daylight harvesting automatically adjusts artificial lighting levels based on the amount of natural daylight entering a space, reducing unnecessary energy consumption."
  },
  {
    id: 3,
    question: "What is zone control in smart HVAC systems?",
    options: [
      "Heating the entire building uniformly",
      "Independent temperature control for different areas",
      "Manual thermostat adjustment",
      "Single-point temperature sensing"
    ],
    correctAnswer: 1,
    explanation: "Zone control allows different areas of a building to be heated or cooled independently, optimising comfort and reducing energy waste in unoccupied zones."
  },
  {
    id: 4,
    question: "Which security feature provides both visual monitoring and communication with visitors?",
    options: [
      "Motion sensors",
      "Smart locks",
      "Video doorbells",
      "Window sensors"
    ],
    correctAnswer: 2,
    explanation: "Video doorbells combine visual monitoring with two-way communication, allowing homeowners to see and speak with visitors remotely."
  },
  {
    id: 5,
    question: "What type of smart home feature can detect water leaks and prevent flooding?",
    options: [
      "Smart lighting",
      "Environmental sensors",
      "Voice assistants",
      "Entertainment systems"
    ],
    correctAnswer: 1,
    explanation: "Environmental sensors can detect water leaks, humidity changes, and other conditions that might indicate flooding risk, allowing for early intervention."
  },
  {
    id: 6,
    question: "How do smart security systems provide enhanced protection compared to traditional systems?",
    options: [
      "Through manual monitoring only",
      "By using louder alarms",
      "Through integration, remote access, and intelligent alerts",
      "By requiring physical key access"
    ],
    correctAnswer: 2,
    explanation: "Smart security systems enhance protection through integration of multiple sensors, remote monitoring access, intelligent alerts, and automated responses to detected threats."
  },
  {
    id: 7,
    question: "What accessibility benefit do voice-controlled smart home systems provide?",
    options: [
      "Louder audio feedback",
      "Hands-free control of home functions",
      "More physical switches",
      "Complex menu navigation"
    ],
    correctAnswer: 1,
    explanation: "Voice control enables hands-free operation of lighting, climate, entertainment, and security systems, particularly beneficial for users with mobility or dexterity limitations."
  },
  {
    id: 8,
    question: "Which smart home application helps manage energy costs during peak demand periods?",
    options: [
      "Entertainment systems",
      "Demand response and load shifting",
      "Decorative lighting",
      "Background music"
    ],
    correctAnswer: 1,
    explanation: "Demand response and load shifting capabilities allow smart homes to reduce consumption during peak pricing periods, lowering energy costs while maintaining comfort."
  },
  {
    id: 9,
    question: "What type of sensor is commonly used to optimise HVAC operation based on room usage?",
    options: [
      "Light sensors",
      "Occupancy and presence sensors",
      "Smoke detectors",
      "Water sensors"
    ],
    correctAnswer: 1,
    explanation: "Occupancy and presence sensors detect whether rooms are in use, allowing HVAC systems to reduce heating or cooling in unoccupied spaces."
  },
  {
    id: 10,
    question: "How do smart window blinds contribute to energy efficiency?",
    options: [
      "By staying permanently closed",
      "Through automated adjustment based on sun position and temperature",
      "By requiring manual operation",
      "Through decorative effects only"
    ],
    correctAnswer: 1,
    explanation: "Smart blinds automatically adjust based on sun position, outdoor temperature, and time of day to optimise natural light and reduce heating or cooling loads."
  }
];

const faqs = [
  {
    question: "How much can I save on energy bills with smart lighting?",
    answer: "Smart lighting systems typically achieve 30-60% energy savings compared to traditional lighting. Savings come from occupancy sensing, daylight harvesting, scheduling, and the ability to easily turn off lights in unoccupied areas. LED bulbs combined with smart controls maximise efficiency."
  },
  {
    question: "Are smart security systems reliable during power outages?",
    answer: "Quality smart security systems include battery backup for critical components like door sensors, cameras, and control hubs. Many can continue monitoring and alerting during outages. However, features requiring internet connectivity will be limited until power and connectivity are restored."
  },
  {
    question: "Can smart HVAC systems work with my existing heating system?",
    answer: "Most smart thermostats are designed to work with common heating systems including combi boilers, system boilers, and heat pumps. However, compatibility varies, so always check specifications. Some older or unusual systems may require additional components or professional installation."
  },
  {
    question: "How do smart homes help elderly or disabled residents?",
    answer: "Smart homes offer voice control for hands-free operation, automated routines reducing physical tasks, remote monitoring for caregivers, fall detection sensors, medication reminders, and simplified interfaces. These features promote independence while maintaining safety."
  },
  {
    question: "What happens if my smart home system loses internet connection?",
    answer: "Local processing in hubs means basic automation often continues working. Smart locks, lighting schedules, and sensor-triggered actions typically function offline. However, remote access, voice assistants, and cloud-dependent features will be unavailable until connectivity returns."
  },
  {
    question: "Are smart home security cameras secure from hackers?",
    answer: "Security depends on proper setup: use strong unique passwords, enable two-factor authentication, keep firmware updated, use encrypted connections, and consider cameras with local storage. Reputable brands prioritise security, but users must follow best practices."
  }
];

const SmartHomeModule1Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Benefits and Applications
          </h1>
          <p className="text-white/80">
            Smart home applications across lighting, HVAC, security, and accessibility
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Lighting:</strong> 30-60% energy savings potential</li>
              <li><strong>HVAC:</strong> Zone control, learning thermostats</li>
              <li><strong>Security:</strong> Integrated monitoring, remote access</li>
              <li><strong>Accessibility:</strong> Voice control, automated assistance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Occupancy sensors, smart thermostats, video doorbells</li>
              <li><strong>Use:</strong> Energy audits, system design, client consultations</li>
              <li><strong>Apply:</strong> Cost-benefit analysis, system recommendations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand smart lighting benefits including energy savings and automation",
              "Explain smart HVAC systems and zone control advantages",
              "Evaluate smart security system features and integration options",
              "Assess accessibility benefits for elderly and disabled users",
              "Calculate potential energy savings from smart home installations",
              "Recommend appropriate smart home solutions for different client needs"
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

        {/* Section 1: Smart Lighting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Smart Lighting Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart lighting represents one of the most impactful and accessible entry points into home automation.
              These systems combine LED technology with intelligent controls to deliver significant energy savings,
              enhanced convenience, and improved quality of life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Occupancy Sensing:</strong> Lights automatically turn on when rooms are occupied and off when empty</li>
                <li><strong>Daylight Harvesting:</strong> Adjusts artificial light based on natural daylight levels</li>
                <li><strong>Scheduling:</strong> Automated on/off times based on daily routines</li>
                <li><strong>Colour Temperature:</strong> Adjustable warm to cool white, supporting circadian rhythms</li>
                <li><strong>Scene Control:</strong> Pre-programmed lighting scenes for different activities</li>
                <li><strong>Dimming:</strong> Variable brightness levels for energy savings and ambience</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Savings Potential:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>LED bulbs alone: 75-80% less energy than incandescent</li>
                <li>Smart controls add: 20-30% additional savings</li>
                <li>Combined total: 30-60% overall lighting energy reduction</li>
                <li>Typical payback period: 2-4 years</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Smart HVAC */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Smart HVAC Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart heating, ventilation, and air conditioning systems optimise comfort while minimising energy
              consumption. These systems learn user preferences and adapt to changing conditions automatically.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Thermostat Features</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Learning algorithms for user preferences</li>
                  <li>Geofencing for away/home detection</li>
                  <li>Weather-responsive adjustments</li>
                  <li>Remote control via smartphone</li>
                  <li>Energy usage reporting and insights</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zone Control Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Independent room temperature control</li>
                  <li>Reduced heating of unoccupied areas</li>
                  <li>Personalised comfort settings</li>
                  <li>Significant energy savings (15-30%)</li>
                  <li>Integration with occupancy sensors</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Integration Opportunities:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Window Sensors:</strong> Automatically pause heating when windows are open</li>
                <li><strong>Smart Blinds:</strong> Coordinate with HVAC to optimise solar gain</li>
                <li><strong>Weather Data:</strong> Pre-heat or cool based on forecast conditions</li>
                <li><strong>Occupancy:</strong> Reduce output in unoccupied rooms</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Smart Security */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Smart Security Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart security systems provide comprehensive protection through integration of multiple sensors,
              cameras, and access control devices. These systems offer real-time monitoring and intelligent
              alerts that traditional systems cannot match.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Core Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Video Doorbells:</strong> Visual identification and two-way communication</li>
                <li><strong>Smart Locks:</strong> Keyless entry, temporary access codes, activity logging</li>
                <li><strong>CCTV Cameras:</strong> Indoor and outdoor monitoring with cloud storage</li>
                <li><strong>Motion Sensors:</strong> PIR detection with pet immunity options</li>
                <li><strong>Door/Window Sensors:</strong> Entry point monitoring and alerts</li>
                <li><strong>Smart Alarms:</strong> Professional monitoring integration options</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Advanced Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Facial recognition for known family members</li>
                <li>Package detection alerts</li>
                <li>Geofencing for automatic arm/disarm</li>
                <li>Integration with lighting for presence simulation</li>
                <li>Emergency services notification</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Accessibility Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Accessibility Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart home technology offers significant benefits for elderly residents and those with disabilities,
              enabling greater independence while maintaining safety and comfort.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voice Control Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Hands-free control of all smart devices</li>
                  <li>No need to reach switches or controls</li>
                  <li>Simple verbal commands for complex actions</li>
                  <li>Emergency calling capabilities</li>
                  <li>Reminders and medication alerts</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automation Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Automated lighting reduces trip hazards</li>
                  <li>Temperature maintained without manual adjustment</li>
                  <li>Automated door locks for security</li>
                  <li>Simplified routines (goodnight, morning)</li>
                  <li>Remote family monitoring capabilities</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Specific Accessibility Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fall Detection:</strong> Sensors that detect falls and alert emergency contacts</li>
                <li><strong>Activity Monitoring:</strong> Patterns that alert caregivers to unusual activity</li>
                <li><strong>Medication Reminders:</strong> Voice or visual reminders for medication schedules</li>
                <li><strong>Video Communication:</strong> Easy video calls with family and healthcare providers</li>
                <li><strong>Simplified Interfaces:</strong> Large buttons, voice control, minimal complexity</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Environmental and Energy Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Environmental and Energy Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart environmental sensors and energy monitoring systems provide valuable insights into home
              conditions and consumption patterns, enabling informed decisions about efficiency improvements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Sensors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Air Quality:</strong> CO2, VOC, particulate matter monitoring</li>
                <li><strong>Humidity:</strong> Prevention of mould and condensation issues</li>
                <li><strong>Temperature:</strong> Multi-point monitoring throughout the home</li>
                <li><strong>Water Leak:</strong> Early detection of leaks and flooding</li>
                <li><strong>Smoke/CO:</strong> Interconnected smart detectors with alerts</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Monitoring Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Real-time consumption visibility</li>
                <li>Identification of energy-wasting devices</li>
                <li>Historical usage analysis and trends</li>
                <li>Integration with smart tariffs and demand response</li>
                <li>Solar generation monitoring and optimisation</li>
              </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Recommending Smart Lighting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess current lighting energy consumption and usage patterns</li>
                <li>Consider daylight availability and room orientation</li>
                <li>Recommend occupancy sensors for intermittently used spaces</li>
                <li>Include dimming controls for maximum flexibility</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Security Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Conduct thorough site survey for camera and sensor placement</li>
                <li>Consider privacy requirements and data storage options</li>
                <li>Plan for reliable power and network connectivity</li>
                <li>Include user training on system operation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Overestimating savings</strong> - use realistic calculations based on actual usage</li>
                <li><strong>Ignoring user capability</strong> - match system complexity to user technical ability</li>
                <li><strong>Poor sensor placement</strong> - test positions before permanent installation</li>
                <li><strong>Inadequate network planning</strong> - ensure reliable connectivity throughout</li>
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

        {/* Reference Card */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Typical Energy Savings</p>
                <ul className="space-y-0.5">
                  <li>Smart Lighting: 30-60%</li>
                  <li>Smart Heating: 15-30%</li>
                  <li>Smart Appliances: 10-20%</li>
                  <li>Overall Home: 20-40%</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Applications</p>
                <ul className="space-y-0.5">
                  <li>Lighting: Occupancy, daylight, scenes</li>
                  <li>HVAC: Zone control, scheduling</li>
                  <li>Security: Cameras, locks, sensors</li>
                  <li>Accessibility: Voice, automation</li>
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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default SmartHomeModule1Section2;
