import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Core Components - Smart Home Technology Module 1 Section 3";
const DESCRIPTION = "Learn about smart home core components: sensors, actuators, and controllers. Understand how these devices work together to create intelligent automation systems.";

const quickCheckQuestions = [
  {
    id: "sensor-function",
    question: "What is the primary function of sensors in a smart home system?",
    options: [
      "To physically control devices",
      "To detect environmental conditions and changes",
      "To store data locally",
      "To provide user interfaces"
    ],
    correctIndex: 1,
    explanation: "Sensors detect environmental conditions such as motion, temperature, light levels, and door/window status, providing the data that smart home systems use to make decisions."
  },
  {
    id: "actuator-role",
    question: "What role do actuators play in smart home automation?",
    options: [
      "They only measure temperature",
      "They provide the physical action based on control signals",
      "They store user preferences",
      "They only communicate with smartphones"
    ],
    correctIndex: 1,
    explanation: "Actuators are devices that perform physical actions in response to control signals, such as switching relays, motor-driven blinds, or valve controllers for heating systems."
  },
  {
    id: "controller-purpose",
    question: "What is the purpose of a smart home controller or hub?",
    options: [
      "To replace all sensors",
      "To provide centralised processing and coordination of devices",
      "To increase power consumption",
      "To eliminate the need for internet"
    ],
    correctIndex: 1,
    explanation: "Smart home controllers or hubs provide centralised processing, coordinate communication between devices using different protocols, and execute automation rules."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which sensor type detects movement using infrared radiation?",
    options: [
      "Light sensor",
      "PIR (Passive Infrared) sensor",
      "Humidity sensor",
      "Pressure sensor"
    ],
    correctAnswer: 1,
    explanation: "PIR (Passive Infrared) sensors detect movement by sensing changes in infrared radiation emitted by warm bodies like humans and animals."
  },
  {
    id: 2,
    question: "What is the difference between a sensor and an actuator?",
    options: [
      "They are the same thing",
      "Sensors detect conditions; actuators perform physical actions",
      "Actuators detect conditions; sensors perform actions",
      "Neither involves physical devices"
    ],
    correctAnswer: 1,
    explanation: "Sensors detect environmental conditions and convert them to signals, while actuators receive control signals and perform physical actions like switching, moving, or adjusting."
  },
  {
    id: 3,
    question: "Which component would control a motorised blind based on sunlight levels?",
    options: [
      "A humidity sensor",
      "A light sensor combined with a motor actuator",
      "A smoke detector",
      "A water leak sensor"
    ],
    correctAnswer: 1,
    explanation: "A light sensor detects sunlight levels, and this information is used to control a motor actuator that opens or closes the motorised blind."
  },
  {
    id: 4,
    question: "What is the main function of a smart home hub?",
    options: [
      "To replace Wi-Fi routers",
      "To coordinate devices using different protocols",
      "To generate electricity",
      "To replace all sensors"
    ],
    correctAnswer: 1,
    explanation: "A smart home hub coordinates communication between devices that may use different protocols (Zigbee, Z-Wave, Wi-Fi) and provides centralised automation processing."
  },
  {
    id: 5,
    question: "Which sensor would be most appropriate for detecting an open window?",
    options: [
      "PIR motion sensor",
      "Magnetic reed switch contact sensor",
      "Light sensor",
      "Humidity sensor"
    ],
    correctAnswer: 1,
    explanation: "Magnetic reed switch contact sensors detect when doors or windows are opened by sensing when the magnetic contact is broken."
  },
  {
    id: 6,
    question: "What type of actuator would be used in a smart heating zone valve?",
    options: [
      "Light dimmer",
      "Motorised valve actuator",
      "Audio speaker",
      "Display screen"
    ],
    correctAnswer: 1,
    explanation: "A motorised valve actuator controls the opening and closing of heating zone valves to regulate water flow and room temperature."
  },
  {
    id: 7,
    question: "Which component provides the automation logic in a smart home?",
    options: [
      "Sensors alone",
      "Actuators alone",
      "Controller or hub",
      "Power supply"
    ],
    correctAnswer: 2,
    explanation: "The controller or hub processes sensor data and executes automation logic to determine when and how actuators should respond."
  },
  {
    id: 8,
    question: "What advantage does a multi-protocol hub provide?",
    options: [
      "Lower cost",
      "Ability to integrate devices from different manufacturers",
      "Faster internet speeds",
      "Reduced power consumption"
    ],
    correctAnswer: 1,
    explanation: "A multi-protocol hub can communicate with devices using Zigbee, Z-Wave, Wi-Fi, and other protocols, allowing integration of devices from different manufacturers."
  },
  {
    id: 9,
    question: "Which sensor type measures air quality parameters like CO2 levels?",
    options: [
      "PIR sensor",
      "Environmental air quality sensor",
      "Contact sensor",
      "Light sensor"
    ],
    correctAnswer: 1,
    explanation: "Environmental air quality sensors can measure CO2, VOCs (volatile organic compounds), and particulate matter to monitor indoor air quality."
  },
  {
    id: 10,
    question: "What is edge processing in smart home systems?",
    options: [
      "Processing at the edge of a room",
      "Local processing at the device or hub level",
      "Cloud-only processing",
      "Manual processing"
    ],
    correctAnswer: 1,
    explanation: "Edge processing refers to local processing at the device or hub level, reducing latency and dependence on internet connectivity for automation responses."
  }
];

const faqs = [
  {
    question: "What is the difference between wired and wireless sensors?",
    answer: "Wired sensors connect via cables, offering reliable power and communication but requiring installation runs. Wireless sensors use batteries and radio protocols (Zigbee, Z-Wave), offering flexible placement but requiring battery maintenance. Many systems use a mix of both."
  },
  {
    question: "How often do wireless sensor batteries need replacing?",
    answer: "Battery life varies significantly: door/window sensors typically last 2-5 years, motion sensors 1-3 years, and environmental sensors 1-2 years depending on reporting frequency. Smart home apps usually alert when batteries are low."
  },
  {
    question: "Can I use sensors from different manufacturers together?",
    answer: "If sensors use the same protocol (e.g., Zigbee or Z-Wave) and are compatible with your hub, they can generally work together. Multi-protocol hubs like Hubitat or Home Assistant can integrate devices from many manufacturers."
  },
  {
    question: "What happens if my smart home hub fails?",
    answer: "If your hub fails, automation and device coordination will stop, but many individual devices can still be controlled manually or through their own apps. Having a backup hub or using cloud-based systems provides redundancy."
  },
  {
    question: "Do I need a hub for all smart home devices?",
    answer: "Not all devices require a hub. Wi-Fi devices often connect directly to your router and cloud services. However, Zigbee and Z-Wave devices require a compatible hub. A hub provides better integration, automation, and often improved reliability."
  },
  {
    question: "What is the advantage of local processing versus cloud processing?",
    answer: "Local processing (at the hub) provides faster response times, works during internet outages, and keeps data private. Cloud processing offers easier remote access and often more sophisticated AI features but depends on internet connectivity."
  }
];

const SmartHomeModule1Section3 = () => {
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
            <span>Module 1 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Core Components
          </h1>
          <p className="text-white/80">
            Sensors, actuators, and controllers in smart home systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Sensors:</strong> Detect conditions (motion, temp, light)</li>
              <li><strong>Actuators:</strong> Perform actions (switch, move, adjust)</li>
              <li><strong>Controllers:</strong> Process data and execute logic</li>
              <li><strong>Integration:</strong> Components work together as a system</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> PIR sensors, contact sensors, smart hubs</li>
              <li><strong>Use:</strong> Component selection, system design</li>
              <li><strong>Apply:</strong> Matching sensors to applications</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify different types of sensors and their applications",
              "Understand actuator functions and selection criteria",
              "Explain the role of controllers and hubs in smart homes",
              "Describe how sensors, actuators, and controllers work together",
              "Evaluate component compatibility and integration requirements",
              "Select appropriate components for different smart home applications"
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

        {/* Section 1: Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Sensors in Smart Homes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sensors are the eyes and ears of a smart home system. They detect environmental conditions
              and convert them into electrical signals that can be processed by controllers to trigger
              automated responses.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motion and Presence Sensors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>PIR (Passive Infrared):</strong> Detects body heat movement, common for lighting control</li>
                <li><strong>Microwave:</strong> Detects movement through Doppler effect, works through thin walls</li>
                <li><strong>Ultrasonic:</strong> Uses sound waves, detects fine movements</li>
                <li><strong>Dual-technology:</strong> Combines PIR and microwave for reduced false triggers</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Sensors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature:</strong> Monitors room and outdoor temperatures for HVAC control</li>
                <li><strong>Humidity:</strong> Detects moisture levels for ventilation and mould prevention</li>
                <li><strong>Light:</strong> Measures ambient light for daylight harvesting</li>
                <li><strong>Air Quality:</strong> Monitors CO2, VOCs, and particulates</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Security Sensors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Contact Sensors:</strong> Magnetic reed switches for doors and windows</li>
                <li><strong>Glass Break:</strong> Acoustic sensors detecting breaking glass</li>
                <li><strong>Smoke/CO:</strong> Life safety sensors with smart connectivity</li>
                <li><strong>Water Leak:</strong> Conductivity sensors for flood detection</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Actuators */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Actuators and Output Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Actuators are devices that convert control signals into physical actions. They are the
              muscles of a smart home system, performing the actual work of controlling lights,
              motors, valves, and other equipment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Switching Actuators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Smart switches and relays</li>
                  <li>Contactor controls</li>
                  <li>Smart plugs and sockets</li>
                  <li>Lighting circuits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dimming Actuators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>LED dimmers (trailing edge)</li>
                  <li>0-10V dimming controllers</li>
                  <li>DALI lighting controllers</li>
                  <li>Colour temperature adjustment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Actuators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Blind and curtain motors</li>
                  <li>Ventilation damper actuators</li>
                  <li>Garage door controllers</li>
                  <li>Gate and lock motors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Actuators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Zone valve actuators</li>
                  <li>Thermostatic radiator valves</li>
                  <li>Boiler relay controls</li>
                  <li>Fan speed controllers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Controllers and Hubs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Controllers and Hubs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Controllers and hubs form the brain of a smart home system. They process sensor data,
              execute automation rules, coordinate device communication, and provide the interface
              between the user and the system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hub Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Protocol-specific hubs:</strong> Support one protocol (Philips Hue for Zigbee lights)</li>
                <li><strong>Multi-protocol hubs:</strong> Support multiple protocols (SmartThings, Hubitat)</li>
                <li><strong>DIY platforms:</strong> Flexible systems like Home Assistant, OpenHAB</li>
                <li><strong>Professional systems:</strong> Proprietary systems like Control4, Crestron</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hub Functions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Protocol translation between different device types</li>
                <li>Automation rule processing and execution</li>
                <li>Scene and routine management</li>
                <li>Remote access and cloud connectivity</li>
                <li>Integration with voice assistants</li>
                <li>Device status monitoring and alerts</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Component Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Component Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective smart home systems require careful integration of sensors, actuators, and
              controllers. Understanding how these components communicate and work together is
              essential for designing reliable automation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Flow:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Detection:</strong> Sensor detects a condition change (motion detected)</li>
                <li><strong>2. Transmission:</strong> Sensor sends signal to controller via protocol</li>
                <li><strong>3. Processing:</strong> Controller evaluates against automation rules</li>
                <li><strong>4. Decision:</strong> Controller determines required action</li>
                <li><strong>5. Command:</strong> Controller sends command to actuator</li>
                <li><strong>6. Action:</strong> Actuator performs the physical action (light turns on)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example: Motion-Activated Lighting</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>PIR sensor detects movement in hallway</li>
                <li>Sensor sends Zigbee message to hub</li>
                <li>Hub checks: is it after sunset? Is lighting automation enabled?</li>
                <li>Hub sends command to smart dimmer</li>
                <li>Dimmer turns light on to 70% brightness</li>
                <li>After 5 minutes without motion, light dims off</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Component Selection Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Component Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Selection Criteria:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Detection range:</strong> Match to room size and layout</li>
                <li><strong>Power source:</strong> Battery vs mains powered</li>
                <li><strong>Protocol compatibility:</strong> Must work with your hub</li>
                <li><strong>Environmental rating:</strong> Indoor vs outdoor use</li>
                <li><strong>Response time:</strong> How quickly does it react?</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Actuator Selection Criteria:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Load capacity:</strong> Must handle the connected load</li>
                <li><strong>Load type:</strong> LED, incandescent, motor, resistive</li>
                <li><strong>Wiring requirements:</strong> Neutral wire, two-wire, etc.</li>
                <li><strong>Physical size:</strong> Must fit in available space</li>
                <li><strong>Manual override:</strong> Can it be operated manually?</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Sensors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Survey the installation location for coverage requirements</li>
                <li>Consider battery access for wireless sensors</li>
                <li>Check protocol compatibility with existing hub</li>
                <li>Plan sensor density for reliable detection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Actuators</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify load capacity meets circuit requirements</li>
                <li>Check for neutral wire availability at switch locations</li>
                <li>Ensure adequate ventilation for heat dissipation</li>
                <li>Test manual override functionality</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mismatched protocols</strong> - sensors and hub must be compatible</li>
                <li><strong>Undersized actuators</strong> - always allow headroom for load capacity</li>
                <li><strong>Poor sensor placement</strong> - results in unreliable detection</li>
                <li><strong>Ignoring battery life</strong> - plan for maintenance access</li>
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
                <p className="font-medium text-white mb-1">Common Sensors</p>
                <ul className="space-y-0.5">
                  <li>PIR: Motion detection</li>
                  <li>Contact: Door/window status</li>
                  <li>Temperature: Climate control</li>
                  <li>Light: Daylight harvesting</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Common Actuators</p>
                <ul className="space-y-0.5">
                  <li>Relays: On/off switching</li>
                  <li>Dimmers: Variable lighting</li>
                  <li>Motors: Blinds/doors</li>
                  <li>Valves: HVAC control</li>
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
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default SmartHomeModule1Section3;
