import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Barriers, Isolators, and Intrinsically Safe Loops - Instrumentation Course";
const DESCRIPTION = "Learn about Zener barriers, galvanic isolators, intrinsic safety principles, energy limitation, ATEX/IECEx certification requirements, and installation best practices for hazardous areas.";

const quickCheckQuestions = [
  {
    id: "m7s5-qc1",
    question: "What is the primary function of a Zener barrier in an IS system?",
    options: ["Amplify signals", "Limit voltage and current to prevent ignition", "Convert signal types", "Provide power to instruments"],
    correctIndex: 1,
    explanation: "Zener barriers limit voltage using Zener diodes and current using series resistors, ensuring energy levels remain below ignition thresholds in hazardous areas."
  },
  {
    id: "m7s5-qc2",
    question: "Which hazardous area zone has the strictest equipment requirements?",
    options: ["Zone 2", "Zone 1", "Zone 0", "Safe area"],
    correctIndex: 2,
    explanation: "Zone 0 has the strictest requirements as explosive atmosphere is continuously present, requiring 'ia' rated equipment only with two-fault tolerance."
  },
  {
    id: "m7s5-qc3",
    question: "Why must Zener barriers have a dedicated earth connection?",
    options: ["To improve signal quality", "For proper voltage clamping operation and safety", "To reduce cable costs", "For colour code compliance"],
    correctIndex: 1,
    explanation: "Zener barriers require a dedicated earth connection (maximum 1 ohm resistance) for proper voltage clamping operation. Without proper earthing, the barrier cannot safely shunt fault energy."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a Zener barrier do in an intrinsically safe system?",
    options: ["Amplifies the signal strength", "Limits voltage and current entering hazardous zones to prevent ignition of explosive atmospheres", "Converts analog to digital signals", "Provides power to field devices"],
    correctAnswer: 1,
    explanation: "A Zener barrier limits both voltage and current entering hazardous zones using Zener diodes for voltage clamping and series resistors for current limiting, ensuring energy remains below ignition thresholds."
  },
  {
    id: 2,
    question: "When are intrinsically safe loops required?",
    options: ["Only in outdoor installations", "In hazardous areas where explosive atmospheres may be present (Zones 0, 1, 2)", "When using digital communication", "For high-accuracy measurements only"],
    correctAnswer: 1,
    explanation: "Intrinsically safe loops are required in hazardous areas classified as Zone 0, 1, or 2 where explosive gas/vapour atmospheres may be present, ensuring electrical energy cannot cause ignition."
  },
  {
    id: 3,
    question: "What's the key benefit of a galvanic isolator?",
    options: ["Increases signal strength", "Electrically separates control systems from field wiring, eliminating ground loops and providing protection", "Reduces cable costs", "Improves signal accuracy only"],
    correctAnswer: 1,
    explanation: "Galvanic isolators electrically separate control systems from field wiring, eliminating ground loops, reducing noise, and protecting equipment from voltage spikes and transients."
  },
  {
    id: 4,
    question: "What's one common certification standard for IS systems?",
    options: ["ISO 9001", "ATEX (European) or IECEx (International) certification for explosive atmosphere equipment", "IEEE 802.11", "NEMA 4X"],
    correctAnswer: 1,
    explanation: "ATEX (European Union) and IECEx (International) are the primary certification schemes for equipment used in explosive atmospheres, ensuring Ex-rated equipment meets safety requirements."
  },
  {
    id: 5,
    question: "Why must IS circuits be properly earthed?",
    options: ["To improve signal quality only", "For proper barrier operation and safety - barriers require a dedicated earth connection to function correctly", "To reduce cable resistance", "To comply with colour coding standards"],
    correctAnswer: 1,
    explanation: "IS circuits must be properly earthed because Zener barriers require a dedicated earth connection to operate correctly and safely clamp voltages. Poor earthing can compromise barrier protection."
  },
  {
    id: 6,
    question: "What minimum ignition energy does hydrogen have?",
    options: ["280 microjoules", "250 microjoules", "20 microjoules", "100 microjoules"],
    correctAnswer: 2,
    explanation: "Hydrogen has a minimum ignition energy of approximately 20 microjoules, making it one of the most sensitive gases and classified as Group IIC."
  },
  {
    id: 7,
    question: "Which equipment protection level is suitable for Zone 1?",
    options: ["Only 'ic'", "'ia' or 'ib'", "Only 'ia'", "Any protection level"],
    correctAnswer: 1,
    explanation: "Zone 1 requires 'ia' (two-fault tolerant) or 'ib' (one-fault tolerant) equipment. 'ic' is only suitable for Zone 2 where explosive atmosphere is unlikely."
  },
  {
    id: 8,
    question: "What is the minimum cable separation distance from non-IS circuits?",
    options: ["10mm", "25mm", "50mm", "100mm"],
    correctAnswer: 2,
    explanation: "A minimum of 50mm separation is required between IS circuits and non-IS circuits to prevent energy transfer that could compromise intrinsic safety."
  },
  {
    id: 9,
    question: "What type of isolation uses light-based coupling?",
    options: ["Transformer isolation", "Capacitive isolation", "Optical isolation", "Resistive isolation"],
    correctAnswer: 2,
    explanation: "Optical isolation uses light-emitting diodes and phototransistors for signal transfer, providing excellent electrical isolation and immunity to electromagnetic interference."
  },
  {
    id: 10,
    question: "What maximum earth resistance is typically specified for IS barrier installations?",
    options: ["10 ohms", "5 ohms", "1 ohm", "0.1 ohm"],
    correctAnswer: 2,
    explanation: "A maximum earth resistance of 1 ohm is typically required for IS barrier installations to ensure proper voltage clamping operation during fault conditions."
  }
];

const faqs = [
  {
    question: "Can I use the same cable tray for IS and non-IS circuits?",
    answer: "No. IS circuits must be segregated from non-IS circuits with dedicated cable trays or minimum 50mm separation. This prevents energy transfer that could compromise intrinsic safety."
  },
  {
    question: "How do I verify my IS loop calculation is correct?",
    answer: "Calculate total cable capacitance and inductance, add transmitter parameters, and verify the combination doesn't exceed barrier output limits. Many barrier manufacturers provide online calculation tools."
  },
  {
    question: "What happens if the IS earth connection fails?",
    answer: "The barrier cannot properly shunt fault energy, potentially allowing dangerous voltage levels to reach the hazardous area. Some modern systems include earth monitoring with alarms."
  },
  {
    question: "Can I use a galvanic isolator instead of a Zener barrier?",
    answer: "Yes, galvanic isolators can provide intrinsic safety and offer advantages like no earth requirement. However, they're more complex and expensive. Choice depends on application requirements."
  },
  {
    question: "What documents do I need for an IS installation audit?",
    answer: "Equipment certificates, system calculations, cable schedules, installation drawings, inspection records, competent person declarations, and maintenance procedures."
  },
  {
    question: "How often should IS systems be inspected?",
    answer: "Typically annually for general inspection and every 3 years for detailed inspection. Critical systems may require more frequent inspection based on risk assessment."
  }
];

const InstrumentationModule7Section5 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Barriers, Isolators, and Intrinsically Safe Loops
          </h1>
          <p className="text-white/80">
            Hazardous area protection and energy limitation principles
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Intrinsic Safety:</strong> Limits energy below ignition thresholds</li>
              <li><strong>Zener Barriers:</strong> Clamp voltage, limit current</li>
              <li><strong>Galvanic Isolators:</strong> Electrical separation via transformer/optical</li>
              <li><strong>Zone Classification:</strong> Zone 0 (continuous), Zone 1 (likely), Zone 2 (unlikely)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Blue-sheathed cables often indicate IS circuits</li>
              <li><strong>Use:</strong> Always verify earth connection before energising IS barriers</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand barrier and isolator protection principles",
              "Apply energy limitation theory to loop design",
              "Select appropriate equipment for hazardous zones",
              "Meet ATEX/IECEx certification requirements",
              "Implement proper installation and earthing practices",
              "Maintain IS system integrity through inspection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Zener Barriers and Voltage/Current Limitation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Zener barriers are passive safety devices that limit electrical energy entering hazardous areas.
              They use Zener diodes to clamp voltage and series resistors to limit current, ensuring that
              even under fault conditions, the energy cannot ignite an explosive atmosphere.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Operating Principle:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Voltage Limitation:</strong> Zener diodes clamp maximum voltage (typically 28V)</li>
                <li><strong>Current Limitation:</strong> Series resistors limit fault current (typically 93mA)</li>
                <li><strong>Energy Limitation:</strong> Combination keeps power below 0.65W</li>
                <li><strong>Response Time:</strong> Less than 1 microsecond clamping speed</li>
                <li><strong>Ground Reference:</strong> Requires dedicated earth connection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mounting Location:</strong> Must be in safe area on DIN rail</li>
                <li><strong>Earthing:</strong> Dedicated earth bar with maximum 1 ohm resistance</li>
                <li><strong>Cable Separation:</strong> Minimum 50mm from non-IS circuits</li>
                <li><strong>Cable Types:</strong> IS-approved cable throughout hazardous zone</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Galvanic Isolators and Signal Isolation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Galvanic isolators provide electrical separation between circuits using transformer,
              optical, or capacitive coupling. Unlike Zener barriers, they don't require an earth
              connection and offer additional benefits like ground loop elimination.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Isolation Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Transformer Isolation:</strong> Magnetic coupling for AC signals, high isolation voltage</li>
                <li><strong>Optical Isolation:</strong> Light-based coupling, immune to EMI, fast response</li>
                <li><strong>Capacitive Isolation:</strong> Capacitive coupling, compact design, low power</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ground Loop Elimination:</strong> Breaks earth paths between systems</li>
                <li><strong>Voltage Spike Protection:</strong> Isolates transients from control systems</li>
                <li><strong>No Earth Required:</strong> Useful where dedicated earth is impractical</li>
                <li><strong>Signal Integrity:</strong> Reduces noise pickup in long cable runs</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Intrinsic Safety Principles and Energy Limitation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Intrinsic safety ensures that electrical energy in a circuit is insufficient to ignite
              a specific explosive atmosphere under both normal and fault conditions. This requires
              understanding ignition energy thresholds and equipment protection levels.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ignition Energy Thresholds:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Hydrogen (Group IIC):</strong> 20 microjoules - most sensitive</li>
                <li><strong>Acetylene:</strong> 19 microjoules - very sensitive</li>
                <li><strong>Methane:</strong> 280 microjoules - typical process gas</li>
                <li><strong>Propane (Group IIA):</strong> 250 microjoules - common hydrocarbon</li>
                <li><strong>IS Design:</strong> Must be below 50% of minimum ignition energy</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Equipment Protection Levels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>'ia' (Zone 0):</strong> Safe with two faults - highest protection</li>
                <li><strong>'ib' (Zone 1):</strong> Safe with one fault - standard protection</li>
                <li><strong>'ic' (Zone 2):</strong> Safe under normal conditions only</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Calculations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Capacitive Energy:</strong> E = half of CV squared (joules)</li>
                <li><strong>Inductive Energy:</strong> E = half of LI squared (joules)</li>
                <li><strong>Safety Factor:</strong> Design to 50% of minimum ignition energy</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            ATEX/IECEx Certification and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Equipment used in explosive atmospheres must be certified to ATEX (European) or IECEx
              (International) standards. Proper installation, documentation, and maintenance are
              essential to maintain safety integrity throughout the system lifecycle.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hazardous Area Zones (Gas):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zone 0:</strong> Explosive atmosphere continuously present - 'ia' only</li>
                <li><strong>Zone 1:</strong> Explosive atmosphere likely during operation - 'ia' or 'ib'</li>
                <li><strong>Zone 2:</strong> Explosive atmosphere unlikely - 'ia', 'ib', or 'ic'</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required Documentation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Equipment Certificates:</strong> Ex d, Ex e, Ex ia certification</li>
                <li><strong>System Calculations:</strong> Loop energy analysis and verification</li>
                <li><strong>Installation Drawings:</strong> Cable schedules and as-built documentation</li>
                <li><strong>Inspection Records:</strong> Maintenance procedures and competent person declarations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Best Practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Dedicated IS Earth Bar:</strong> Maximum 1 ohm resistance, no shared earths</li>
                <li><strong>Cable Segregation:</strong> Separate trays, 50mm minimum spacing</li>
                <li><strong>Clear Identification:</strong> Labelling of IS and non-IS circuits</li>
                <li><strong>System Verification:</strong> End-to-end testing before commissioning</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-card/50 border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow mb-2">Oil Refinery Tank Level Monitoring - Zone 1</h3>
            <p className="text-sm text-white mb-3">
              A tank farm uses intrinsically safe loops for level monitoring in a Zone 1 hazardous area.
              The system prevents spark risk whilst providing reliable measurement for overflow prevention.
            </p>
            <div className="text-sm text-white space-y-2">
              <p><strong>Setup:</strong> 12 radar level transmitters (Ex ia IIA T4) connected via Zener barriers (24V, 93mA) to DCS in control room. 300m cable runs using IS-approved multicore cable.</p>
              <p><strong>Verification:</strong> Total stored energy calculated at 60 microjoules capacitive and 40 microjoules inductive, well below 280 microjoules ignition threshold for propane.</p>
              <p><strong>Result:</strong> Zero incidents since commissioning in 2018. Annual inspections confirm system integrity. Reliable level data prevents overflow incidents whilst maintaining full ATEX compliance.</p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing IS Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate total cable capacitance and inductance for the run length</li>
                <li>Verify barrier output limits exceed system requirements</li>
                <li>Select equipment certified for the gas group present</li>
                <li>Document all parameters for certification audit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Installation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify earth resistance before energising barriers</li>
                <li>Maintain cable segregation throughout installation</li>
                <li>Use IS-approved cable glands and junction boxes</li>
                <li>Label all IS circuits clearly at both ends</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor earthing</strong> - compromises barrier operation and safety</li>
                <li><strong>Cable mixing</strong> - IS and non-IS in same tray defeats protection</li>
                <li><strong>Wrong gas group</strong> - IIA equipment in IIC area is dangerous</li>
                <li><strong>Missing calculations</strong> - audit failure and potential unsafe condition</li>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default InstrumentationModule7Section5;
