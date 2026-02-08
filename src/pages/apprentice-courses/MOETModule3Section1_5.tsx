import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Isolation and Switching Devices - MOET Module 3 Section 1.5";
const DESCRIPTION = "Functional switching, isolation, emergency switching, fireman's switch, isolator types, interlocking and safe isolation procedures for maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "contactor-isolation",
    question: "Why are contactors NOT suitable as isolating devices?",
    options: [
      "They are too expensive for the application",
      "They cannot handle high fault currents",
      "Their contacts may weld or the coil may be re-energised unexpectedly",
      "They do not break the neutral conductor"
    ],
    correctIndex: 2,
    explanation: "Contactors are not suitable for isolation because their contacts may weld closed under fault conditions, or the coil may be re-energised by control circuits, causing the contactor to close unexpectedly while work is in progress."
  },
  {
    id: "firemans-switch",
    question: "Where must a fireman's switch be located?",
    options: [
      "In the main switchroom",
      "At the main entrance to the building",
      "On the roof next to the sign",
      "Inside the fire alarm control panel"
    ],
    correctIndex: 1,
    explanation: "A fireman's switch must be located at the main entrance to the building, or as close as practicable, so that firefighters can access it easily before entering the premises. It must be coloured red with the OFF position at the top."
  },
  {
    id: "isolator-feature",
    question: "What additional feature must an isolator have beyond simply opening the contacts?",
    options: [
      "Overcurrent protection",
      "Time delay mechanism",
      "Locking facility and visible gap or positive indication",
      "Remote control capability"
    ],
    correctIndex: 2,
    explanation: "An isolating device must be capable of being locked in the open position and must provide either a visible gap or a positive indication that the contacts are fully open. This ensures the device cannot be accidentally closed during work."
  },
  {
    id: "prove-dead-retest",
    question: "Why must the voltage indicator be tested on a known live source BOTH before and after proving dead?",
    options: [
      "To calibrate the instrument for accuracy",
      "To confirm the instrument was working before and after, eliminating false dead readings",
      "To check the battery charge level",
      "To comply with manufacturer's instructions only"
    ],
    correctIndex: 1,
    explanation: "Testing before and after eliminates the possibility that a faulty instrument gave a false dead reading. If the tester worked before proving dead but not after, it may have failed during the test, meaning the circuit could still be live."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What section of BS 7671 covers isolation and switching requirements?",
    options: [
      "Section 411",
      "Section 514",
      "Section 537",
      "Section 612"
    ],
    correctAnswer: 2,
    explanation: "Section 537 of BS 7671 covers the requirements for isolation, switching, control and monitoring of electrical installations."
  },
  {
    id: 2,
    question: "What is the key difference between functional switching and isolation?",
    options: [
      "They are the same thing with different names",
      "Functional switching controls normal operation; isolation disconnects for safety during work",
      "Isolation controls normal operation; functional switching is for emergencies",
      "Functional switching requires a visible gap"
    ],
    correctAnswer: 1,
    explanation: "Functional switching is normal on/off control during everyday use. Isolation disconnects equipment from all sources of energy to make it safe for work, requiring a visible gap and locking facility."
  },
  {
    id: 3,
    question: "What colour and position must a fireman's switch have?",
    options: [
      "Blue, any position",
      "Red, OFF position at the top",
      "Yellow, OFF position at the bottom",
      "Green, OFF position at the top"
    ],
    correctAnswer: 1,
    explanation: "A fireman's switch must be coloured red with the OFF position at the top. It must be clearly labelled 'FIREMAN'S SWITCH' and located at the main entrance to the building."
  },
  {
    id: 4,
    question: "Which of the following devices is NOT suitable for isolation?",
    options: [
      "Switch-disconnector",
      "Contactor",
      "MCCB with locking facility",
      "Fuse-switch with fuses removed"
    ],
    correctAnswer: 1,
    explanation: "Contactors are not suitable for isolation because their contacts may have welded under fault conditions, or the coil may be re-energised by control circuits, causing unexpected closure during work."
  },
  {
    id: 5,
    question: "In the safe isolation procedure, what must you do immediately AFTER proving dead?",
    options: [
      "Start work immediately",
      "Remove the padlock",
      "Re-test the voltage indicator on a known live source",
      "Replace the fuse"
    ],
    correctAnswer: 2,
    explanation: "After proving dead, you must re-test the voltage indicator on a known live source to confirm it is still working. This eliminates the risk of a false dead reading from a faulty instrument."
  },
  {
    id: 6,
    question: "What HSE guidance note covers voltage indicator requirements for proving dead?",
    options: [
      "GS6",
      "GS38",
      "GS50",
      "PM29"
    ],
    correctAnswer: 1,
    explanation: "HSE Guidance Note GS38 covers the selection and use of test probes, leads, lamps, voltage-indicating devices and measuring instruments for use by electricians."
  },
  {
    id: 7,
    question: "What type of interlocking uses a series of locks and keys to enforce switching sequences?",
    options: [
      "Electrical interlocking",
      "Mechanical interlocking",
      "Trapped key interlocking",
      "Time-delay interlocking"
    ],
    correctAnswer: 2,
    explanation: "Trapped key interlocking uses a series of locks and keys where each key is physically trapped until the correct preceding operation is completed, enforcing a safe switching sequence."
  },
  {
    id: 8,
    question: "What must be attached to an isolator after locking off?",
    options: [
      "A voltage indicator",
      "A caution notice with name, date and contact details",
      "An MCB lockout device only",
      "Nothing else is required"
    ],
    correctAnswer: 1,
    explanation: "A caution notice (danger tag) must be attached to the locked-off isolator showing the name of the person who locked off, the date, and their contact details."
  },
  {
    id: 9,
    question: "Which installations require a fireman's switch?",
    options: [
      "All domestic installations",
      "Exterior signs above 2.8 m at over 230 V, HV discharge lighting, PV installations",
      "Only HV installations above 11 kV",
      "Any installation with emergency lighting"
    ],
    correctAnswer: 1,
    explanation: "Fireman's switches are required for exterior electrical installations above 2.8 m at over 230 V, high-voltage discharge lighting (neon signs), and photovoltaic installations."
  },
  {
    id: 10,
    question: "In a generator changeover system, what prevents both incomers closing simultaneously?",
    options: [
      "Time delay relay",
      "Electrical interlocking",
      "Key switch",
      "Current transformer"
    ],
    correctAnswer: 1,
    explanation: "Electrical interlocking uses auxiliary contacts and control circuits to ensure the mains and generator incomers cannot be closed simultaneously, preventing uncontrolled paralleling."
  },
  {
    id: 11,
    question: "Why is a multimeter not suitable for proving dead?",
    options: [
      "It is too accurate for the purpose",
      "It cannot measure AC voltage",
      "A blown fuse or flat battery could give a false zero reading",
      "It is too heavy to carry safely"
    ],
    correctAnswer: 2,
    explanation: "A multimeter with a blown fuse or flat battery may display zero voltage on a live circuit, giving a dangerously false dead reading. Approved voltage indicators have fail-safe designs that prevent this."
  },
  {
    id: 12,
    question: "What is mechanical maintenance switching used for?",
    options: [
      "Normal on/off control of lighting",
      "Emergency disconnection of the supply",
      "Isolation for electrical work on conductors",
      "Switching off supply for mechanical maintenance of non-electrical parts"
    ],
    correctAnswer: 3,
    explanation: "Mechanical maintenance switching (Regulation 537.3) allows the electrical supply to be switched off for mechanical work on electrically driven equipment, such as changing belts or cleaning impellers."
  }
];

const faqs = [
  {
    question: "Can an MCB be used as an isolator?",
    answer: "An MCB can be used for isolation if it can be locked in the open position (using a lockout device) and is rated for isolation duty. Many modern MCBs are designed to be suitable for isolation, but you should check the manufacturer's data sheet for confirmation. The device must provide either a visible gap or positive indication that the contacts are open."
  },
  {
    question: "What colour is an emergency stop button?",
    answer: "Emergency stop buttons must be red (mushroom-head push-button) on a yellow background. This colour combination is internationally recognised for emergency switching and is specified in BS EN 60204-1. The button must be operable by a single action (one hand operation) and must not require complex operations to activate."
  },
  {
    question: "Why can I not use a multimeter to prove dead?",
    answer: "A multimeter has a blown fuse or flat battery risk that could give a false dead reading (zero voltage display even though the circuit is live). Approved voltage indicators complying with GS38 have fused test leads, finger guards on the probes, current-limited circuits and clear go/no-go indication specifically designed for proving dead safely."
  },
  {
    question: "What is a trapped key interlock?",
    answer: "A trapped key system uses mechanical locks and keys to enforce a specific switching sequence. A key is physically trapped in one lock until the correct preceding action has been completed, releasing the key for the next step. These systems are widely used in HV/LV substations to ensure safe switching sequences are followed without relying on human memory."
  },
  {
    question: "Do I need to prove dead on every circuit before working?",
    answer: "Yes. You must prove dead at the point of work on every occasion, even if you isolated the circuit yourself moments earlier. There may be back-feeds from other sources, stored energy in capacitors, or parallel supplies that you are not aware of. The prove dead procedure is your final confirmation that the circuit is genuinely safe to work on."
  }
];

const MOETModule3Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Isolation and Switching Devices
          </h1>
          <p className="text-white/80">
            Functional switching, isolation, emergency switching, fireman's switch and interlocking
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Four categories:</strong> Functional, isolation, emergency, mechanical maintenance</li>
              <li className="pl-1"><strong>Section 537:</strong> BS 7671 switching and isolation requirements</li>
              <li className="pl-1"><strong>Safe isolation:</strong> Test-isolate-prove dead-re-test (GS38)</li>
              <li className="pl-1"><strong>Interlocking:</strong> Mechanical, electrical and trapped key systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Isolators:</strong> Rotary, switch-disconnector, fuse-switch types</li>
              <li className="pl-1"><strong>Emergency stops:</strong> Red on yellow, single-action operation</li>
              <li className="pl-1"><strong>Fireman's switch:</strong> Red, OFF at top, main entrance</li>
              <li className="pl-1"><strong>ST1426:</strong> Safe working practices and isolation KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between functional switching, isolation and emergency switching",
              "Explain BS 7671 Section 537 requirements for isolation and switching",
              "Describe isolator types and their applications in maintenance",
              "Outline fireman's switch and emergency stop device requirements",
              "Explain interlocking methods in electrical systems",
              "Carry out safe isolation procedures using the test-isolate-test method"
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

        {/* Section 01: Categories of Switching */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Categories of Switching
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Section 537 defines four categories of switching, each serving a distinct purpose within an
              electrical installation. Understanding these categories is essential for selecting the correct devices
              and following proper procedures during maintenance work.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Functional Switching (Regulation 537.5)</h3>
                <p className="text-sm text-white mb-2">
                  Normal on/off control of electrical equipment or circuits during everyday use. Functional switches do
                  not need to provide isolation -- they simply control whether equipment operates. Examples include light
                  switches, motor control push-buttons, heating thermostats and socket outlet switches.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Do not need to break all live conductors</li>
                  <li className="pl-1">Do not need a visible gap or locking facility</li>
                  <li className="pl-1">Rated for the normal load current of the controlled circuit</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Isolation (Regulation 537.2)</h3>
                <p className="text-sm text-white mb-2">
                  Disconnection of an installation, circuit or item of equipment from every source of electrical energy
                  to make it safe for work. This is the most critical switching category for maintenance technicians.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Must break all live conductors (including neutral where it may become live)</li>
                  <li className="pl-1">Must provide a visible gap or positive indication contacts are open</li>
                  <li className="pl-1">Must be capable of being locked in the open (off) position</li>
                  <li className="pl-1">Must be clearly labelled to identify the circuit or equipment</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Switching (Regulation 537.4)</h3>
                <p className="text-sm text-white mb-2">
                  Rapid disconnection of the supply in the event of danger. Emergency switches must be immediately
                  accessible, clearly identifiable (red on yellow background), and operable by a single action.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Emergency stop buttons (mushroom-head) on machinery</li>
                  <li className="pl-1">Fire alarm trip switches on main distribution boards</li>
                  <li className="pl-1">Must disconnect all live conductors</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Maintenance Switching (Regulation 537.3)</h3>
                <p className="text-sm text-white">
                  Switching off the supply to non-electrical parts of equipment for mechanical maintenance. Distinct
                  from isolation (which is for electrical work). Used when mechanical work is needed on electrically
                  driven equipment, such as changing belts on a motor-driven fan or cleaning pump impellers.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Suitable Devices for Isolation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Switch-disconnectors:</strong> Purpose-designed for isolation with visible break</li>
                <li className="pl-1"><strong>Fuse-switches:</strong> With fuse links removed for additional safety</li>
                <li className="pl-1"><strong>MCBs:</strong> Only if they can be locked off and are rated for isolation duty</li>
                <li className="pl-1"><strong>MCCBs and ACBs:</strong> With locking facilities</li>
                <li className="pl-1"><strong>Plug-and-socket:</strong> Where the socket is fixed and cannot be re-inserted during work</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Devices NOT Suitable for Isolation</p>
              <p className="text-sm text-white">
                Contactors are NOT suitable for isolation because their contacts may weld closed under fault conditions,
                or the coil may be re-energised by control circuits, causing the contactor to close unexpectedly while
                work is in progress. Similarly, semiconductor switching devices (solid-state relays) cannot provide
                isolation because they do not provide a physical break in the circuit.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Fireman's Switch and Emergency Devices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fireman's Switch and Emergency Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 537.6 requires a fireman's switch for certain installations to allow firefighters to disconnect
              the supply before entering a building or area. The installations requiring a fireman's switch include
              exterior electrical installations at a height exceeding 2.8 metres operating above 230 V, high-voltage
              discharge lighting (neon signs), and photovoltaic (PV) installations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fireman's Switch Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Colour:</strong> Red</li>
                <li className="pl-1"><strong>Location:</strong> At the main entrance to the building or as close as practicable</li>
                <li className="pl-1"><strong>Labelling:</strong> Clearly marked "FIREMAN'S SWITCH"</li>
                <li className="pl-1"><strong>Operation:</strong> OFF position at the top; operable by hand without key or tool</li>
                <li className="pl-1"><strong>Function:</strong> Must disconnect all live conductors of the installation it controls</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Stop Devices</p>
              <p className="text-sm text-white mb-3">
                Emergency stop buttons are required on all motor-driven machinery where there is a risk of danger from
                the driven equipment. They must comply with BS EN 60204-1 and have specific characteristics:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Red mushroom-head push-button on a yellow background</li>
                <li className="pl-1">Single-action operation (one hand, one movement)</li>
                <li className="pl-1">Latching -- must remain in the stop position until manually reset</li>
                <li className="pl-1">Direct opening contacts (positive break) for reliability</li>
                <li className="pl-1">Located within easy reach of the operator and any other person at risk</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>PV installations:</strong> Solar panels remain live in daylight even when the inverter is
              disconnected from the grid. The fireman's switch for a PV installation isolates the AC side, but
              the DC side from the panels to the inverter remains energised during daylight hours. Firefighters
              must be made aware of this residual hazard through clear labelling.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Isolator Types and Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Isolator Types and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Several types of device can fulfil the isolation function. The choice depends on the current rating,
              the application, the required IP rating for the environment and the specific features needed for
              the installation.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Rotary Isolators</h3>
                <p className="text-sm text-white">
                  Commonly used for motor circuits and local equipment isolation. A rotary handle is turned to
                  the OFF position and can be padlocked in place. Available in IP65 enclosures for outdoor or
                  harsh industrial environments. Typically rated from 16 A to 125 A. Many incorporate auxiliary
                  contacts for remote indication of the switch position.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Switch-Disconnectors</h3>
                <p className="text-sm text-white">
                  Combine load switching with isolation in a single device. Commonly used as the main incomer
                  to distribution boards, providing a visible break and padlocking facility. Available in
                  three-pole and four-pole (including switched neutral) configurations. Rated from 63 A to
                  several thousand amperes for main switchboard applications.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fuse-Switches and Fused Isolators</h3>
                <p className="text-sm text-white">
                  Combine the isolation function with fuse protection. When the switch is opened, the fuse
                  links are physically withdrawn from the busbar connections, providing a clear visible break.
                  Common in older industrial installations. The fuse links provide short-circuit protection
                  while the switch mechanism handles load switching and isolation.
                </p>
              </div>
            </div>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Isolator Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rotary isolator</td>
                      <td className="border border-white/10 px-3 py-2">16 A - 125 A</td>
                      <td className="border border-white/10 px-3 py-2">Local motor and equipment isolation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Switch-disconnector</td>
                      <td className="border border-white/10 px-3 py-2">63 A - 3200 A</td>
                      <td className="border border-white/10 px-3 py-2">DB main incomer, sub-main isolation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fuse-switch</td>
                      <td className="border border-white/10 px-3 py-2">32 A - 800 A</td>
                      <td className="border border-white/10 px-3 py-2">Industrial switchboards (legacy)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB with lockout</td>
                      <td className="border border-white/10 px-3 py-2">6 A - 125 A</td>
                      <td className="border border-white/10 px-3 py-2">Final circuit isolation in DBs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Interlocking */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interlocking Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Interlocking is a safety mechanism that prevents hazardous operations by linking the operation of one
              device to the state of another. In electrical systems, interlocking prevents access to live equipment,
              enforces safe switching sequences and prevents parallel operation of incompatible supplies.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Interlocking</h3>
                <p className="text-sm text-white mb-2">
                  Uses physical linkages to prevent certain operations. Common examples include:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Door interlocks on switchgear preventing door opening while energised</li>
                  <li className="pl-1">Defeatable interlocks overridable with a special tool for authorised testing</li>
                  <li className="pl-1">Mechanical linkages between two contactors preventing both closing simultaneously</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Interlocking</h3>
                <p className="text-sm text-white">
                  Uses auxiliary contacts and control circuits to prevent unsafe operations. In a generator changeover
                  system, the mains incomer and generator incomer are electrically interlocked so that both cannot be
                  closed simultaneously, which would parallel the generator with the mains supply. Auxiliary contacts
                  from each contactor are wired into the control circuit of the other, creating a cross-lock arrangement.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Trapped Key Interlocking</h3>
                <p className="text-sm text-white">
                  Uses a series of locks and keys to enforce a specific sequence of operations. A key is trapped in
                  one lock until the correct preceding operation has been completed. Widely used in HV/LV transformer
                  substations to ensure that the HV supply is isolated and earthed before the LV switchroom door can
                  be opened, and that the LV main switch is open before the transformer can be accessed. The physical
                  key transfer makes the sequence impossible to bypass without deliberate defeat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Safe Isolation Procedure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Safe Isolation Procedure for Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation is the single most critical procedure in electrical maintenance. Failure to follow the
              correct procedure is the primary cause of electrical accidents. The procedure is based on HSE Guidance
              Note GS38 and ensures that the circuit is genuinely dead before work commences.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Five-Step Safe Isolation Procedure</p>
              <ol className="text-sm text-white space-y-3 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Identify:</strong> Identify the circuit or equipment using circuit schedules, drawings or tracing. Confirm identification with the client or site representative.</li>
                <li className="pl-1"><strong>Test the voltage indicator:</strong> Test your approved voltage indicator on a known live source (proving unit or known live circuit) to confirm it is working correctly.</li>
                <li className="pl-1"><strong>Isolate:</strong> Open the isolating device and verify it is in the open position. Lock off with a personal padlock and attach a caution notice with your name, date and contact details.</li>
                <li className="pl-1"><strong>Prove dead:</strong> Test between all live conductors and between all live conductors and earth at the point of work using the proved voltage indicator.</li>
                <li className="pl-1"><strong>Re-test the voltage indicator:</strong> Test the voltage indicator again on the known live source to confirm it is still functioning correctly after proving dead.</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Why the Re-Test is Essential</p>
              <p className="text-sm text-white">
                The re-test after proving dead eliminates the possibility that a faulty instrument gave a false dead
                reading. If the voltage indicator worked before proving dead but fails the re-test, it may have
                developed a fault during the dead test, meaning the circuit could still be live. In this case, you
                must obtain a new instrument, prove it on a known live source, and repeat the dead test.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Approved Voltage Indicators (GS38)</p>
              <p className="text-sm text-white">
                Only approved voltage indicators complying with GS38 should be used for proving dead. These have
                fused test leads with a maximum of 20 mm exposed metal tip, finger guards on the probes, current-limited
                circuits, and clear go/no-go indication. Multimeters in the voltage range are NOT suitable because a
                blown fuse or flat battery could give a dangerous false dead reading.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">Four Categories of Switching</p>
                <ul className="space-y-0.5">
                  <li>1. Functional switching (Reg 537.5)</li>
                  <li>2. Isolation (Reg 537.2)</li>
                  <li>3. Mechanical maintenance (Reg 537.3)</li>
                  <li>4. Emergency switching (Reg 537.4)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safe Isolation Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Identify the circuit</li>
                  <li>2. Test voltage indicator on known live</li>
                  <li>3. Isolate, lock off, tag</li>
                  <li>4. Prove dead at point of work</li>
                  <li>5. Re-test voltage indicator on known live</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: 3.1.4
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-6">
              Next: 3.1.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section1_5;
