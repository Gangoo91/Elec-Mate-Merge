import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "stable-power",
    question: "Why must controllers be powered and stable before software upload?",
    options: [
      "To reduce upload time",
      "To prevent memory corruption and upload failures",
      "To improve network communication speed",
      "To save battery power on laptops"
    ],
    correctIndex: 1,
    explanation: "Stable power is essential to maintain controller memory during upload and prevent program corruption. Unstable power can corrupt the upload, damage controller memory, or cause programming failures that require complete reprogramming."
  },
  {
    id: "time-sync",
    question: "Why is time synchronisation important across BMS controllers?",
    options: [
      "To save energy consumption",
      "To improve communication speed",
      "To ensure accurate logging and coordinated scheduling",
      "To reduce maintenance costs"
    ],
    correctIndex: 2,
    explanation: "Time synchronisation ensures accurate data logging timestamps, coordinated equipment scheduling, and proper alarm sequencing across the system. Without it, trend data becomes unreliable and troubleshooting becomes difficult."
  },
  {
    id: "miswired-controller",
    question: "What can happen if a controller is miswired or not labelled correctly before programming?",
    options: [
      "Slightly slower upload speeds",
      "Upload failures, program corruption, or incorrect equipment operation",
      "Minor delays in scheduling",
      "Increased power consumption"
    ],
    correctIndex: 1,
    explanation: "Miswired controllers can cause upload failures, program corruption, or worse - incorrect equipment operation that could damage plant or create safety hazards. Poor labelling leads to programming the wrong controller, causing delays and rework."
  }
];

const faqs = [
  {
    question: "What is the purpose of software upload in a BMS?",
    answer: "Software upload loads the control logic, device mappings, setpoints, and operational parameters into BMS controllers, enabling them to operate connected equipment according to the designed control sequences."
  },
  {
    question: "Why must controllers be powered and stable before upload?",
    answer: "Controllers need stable power to maintain memory during upload, process incoming software packages, and validate program integrity. Unstable power can corrupt uploads, damage controller memory, or cause programming failures."
  },
  {
    question: "What should be tested after software upload?",
    answer: "Test all I/O point responses, verify safety function operation, check network communication, confirm parameter settings, and validate that physical equipment responds correctly to BMS commands."
  },
  {
    question: "What common methods are used for uploading software to controllers?",
    answer: "Common methods include USB connection (direct laptop to controller), Ethernet/IP (network connection for multiple controllers), and Serial/RS-485 (for older or simpler controllers)."
  }
];

const quizQuestion = {
  question: "In a data centre BMS project, why did software uploads repeatedly fail on VAV controllers?",
  options: [
    "The programming software version was incompatible",
    "Network switches were overloaded with traffic",
    "RS-485 communication wiring had reversed polarity",
    "Controllers had insufficient memory for the program"
  ],
  correctAnswer: 2,
  explanation: "The RS-485 communication wiring had reversed polarity due to incorrect colour coding interpretation. Basic communication worked due to RS-485 fault tolerance, but complex uploads failed due to data integrity issues. The project experienced a two-week delay while polarity was corrected."
};

const BMSModule7Section4 = () => {
  useSEO({
    title: "Software Upload and Controller Setup | BMS Module 7.4",
    description: "Learn about uploading software to BMS controllers and configuring them for operation including communication methods and best practices."
  });

  const outcomes = [
    "Explain the purpose of uploading software into BMS controllers",
    "Describe the steps involved in setting up controllers for operation",
    "Identify common controller communication methods (USB, Ethernet, RS-485)",
    "Apply best practices for supporting software upload and controller commissioning"
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Software Upload and Controller Setup
          </h1>
          <p className="text-white">
            System configuration and deployment for BMS controllers
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Upload:</strong> Loads control logic, mappings, and setpoints into controllers</li>
              <li><strong>Setup:</strong> Addressing, network config, clock sync, parameter verification</li>
              <li><strong>Methods:</strong> USB, Ethernet/IP, or RS-485 serial connections</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> USB ports, Ethernet jacks, RS-485 terminals on controllers</li>
              <li><strong>Use:</strong> Verify power, test communication, support upload process</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Software Upload?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once design documentation is complete, devices are wired, and addresses assigned, the next step is to upload software to BMS controllers and configure them for operation. This stage translates the control logic (function blocks, Boolean sequences, PID loops) into the hardware that actually runs the system.
            </p>
            <p>
              For electricians, the focus is on ensuring controllers are powered, connected, and communicating correctly so software uploads and configuration go smoothly. A controller that is miswired, incorrectly addressed, or unstable will fail during programming, wasting hours on site.
            </p>
          </div>
        </section>

        {/* Section 02: Upload Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Upload Communication Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">USB Connection</p>
                <p className="text-white text-xs">Direct laptop to controller. Fast and reliable for individual controllers.</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Ethernet/IP</p>
                <p className="text-white text-xs">Network connection via switch. Can upload to multiple controllers remotely.</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Serial/RS-485</p>
                <p className="text-white text-xs">Multi-drop bus for older controllers. Requires correct termination.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Gets Uploaded:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Control Logic:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>AHU supply and extract fan sequences</li>
                    <li>Pump changeover and duty cycling logic</li>
                    <li>Chiller/boiler startup and shutdown procedures</li>
                    <li>Safety interlock and alarm logic</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Configuration Data:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Device mappings from IO lists</li>
                    <li>Default setpoints and operating ranges</li>
                    <li>Time schedules and calendar exceptions</li>
                    <li>Alarm limits and notification settings</li>
                  </ul>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 03: Controller Setup */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Controller Setup and Configuration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After software upload, controllers must be configured to operate correctly within the BMS network. This involves setting unique identifiers, network parameters, timing references, and validating operational parameters.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Address and ID Assignment:</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">BACnet Device IDs</p>
                  <p className="text-white text-xs">Unique 6-digit identifier (e.g., 100001). Must be unique across entire network.</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Modbus Addresses</p>
                  <p className="text-white text-xs">Range 1-247 per segment. Sequential numbering recommended.</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">KNX Addresses</p>
                  <p className="text-white text-xs">Area.Line.Device format (e.g., 2.3.15). Physical topology based.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Clock Synchronisation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>NTP Server:</strong> Network Time Protocol for automatic synchronisation</li>
                <li><strong>BMS Master:</strong> Central time reference for all controllers</li>
                <li><strong>Importance:</strong> Accurate logging, coordinated scheduling, alarm sequencing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Network Configuration (for Ethernet controllers):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IP Address:</strong> Unique on subnet (e.g., 192.168.1.100)</li>
                <li><strong>Subnet Mask:</strong> Network boundary (e.g., 255.255.255.0)</li>
                <li><strong>Default Gateway:</strong> Router IP for remote access</li>
                <li><strong>Coordination:</strong> Always coordinate with IT for address allocation</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 04: Electrician's Role */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrician's Role in Upload and Setup
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricians play a crucial role in ensuring successful software uploads by providing the proper electrical infrastructure, access, and support needed for engineers to complete programming efficiently and safely.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Upload Responsibilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Power verification:</strong> Stable 24VDC supplies within ±5%</li>
                  <li><strong>Wiring continuity:</strong> Test all communication cables</li>
                  <li><strong>Polarity check:</strong> Verify RS-485 A/B connections</li>
                  <li><strong>Termination:</strong> Install 120Ω resistors at bus ends</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">During Upload Support</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Monitor status:</strong> Watch controller LEDs during upload</li>
                  <li><strong>Check stability:</strong> Monitor power supply under load</li>
                  <li><strong>Field testing:</strong> Operate switches and sensors for verification</li>
                  <li><strong>Document issues:</strong> Record any hardware problems</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Upload Verification:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Input Testing:</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Temperature sensors reading correctly</li>
                    <li>Pressure switches operating at setpoints</li>
                    <li>Status contacts proving back accurately</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Output Testing:</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Contactors energising on command</li>
                    <li>Variable outputs scaling correctly (0-10V)</li>
                    <li>Valve actuators responding properly</li>
                  </ul>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 05: Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices for Supporting Upload</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm stable power before engineers connect - test under load</li>
                <li>Verify termination resistors are fitted where RS-485 buses end</li>
                <li>Label each controller with device ID and panel location</li>
                <li>Keep laptop connection points accessible in every panel</li>
                <li>Ensure panels are protected from moisture, dust, and extreme temperatures</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices for Controller Setup</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record IP addresses and device IDs in commissioning logs</li>
                <li>Ensure all controllers are time-synchronised with the BMS server</li>
                <li>Verify each I/O point responds correctly after upload</li>
                <li>Test safety functions including fire alarm triggers and emergency stops</li>
                <li>Confirm default setpoints match design specifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Unstable power:</strong> Don't assume power is stable - always test under load</li>
                <li><strong>Wrong polarity:</strong> Don't assume RS-485 polarity is correct - verify A/B</li>
                <li><strong>Missing termination:</strong> Don't skip termination resistor verification</li>
                <li><strong>Duplicate addresses:</strong> Never leave controllers with the same address</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-red-400/80 mb-2">Data Centre BMS Project - Upload Failures</h3>
            <p className="text-sm text-white leading-relaxed mb-3">
              On a data centre BMS project, engineers repeatedly failed to upload programs to several VAV controllers. The upload process would start normally but then timeout or fail with communication errors partway through.
            </p>
            <p className="text-sm text-white leading-relaxed mb-3">
              After two days of delays, electricians discovered that RS-485 communication wiring had been installed with reversed polarity. Cable manufacturers used different colour coding than expected, and installers followed colours rather than checking polarity. Basic communication worked due to RS-485 fault tolerance, but complex uploads failed due to data integrity issues.
            </p>
            <div className="mt-4 p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-1">Lesson Learned</p>
              <p className="text-xs text-white">
                Always verify communication wiring polarity before software deployment. Simple connectivity tests aren't always sufficient - full communication integrity must be verified under the load conditions that occur during programming.
              </p>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Upload Methods</p>
              <ul className="space-y-0.5">
                <li>USB: Direct, single controller</li>
                <li>Ethernet: Network, multiple controllers</li>
                <li>RS-485: Serial, legacy systems</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Pre-Upload Checklist</p>
              <ul className="space-y-0.5">
                <li>Stable power (±5%)</li>
                <li>Communication wiring tested</li>
                <li>Addressing completed</li>
                <li>Access prepared</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="my-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-7-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Addressing and Mapping
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-7-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule7Section4;
