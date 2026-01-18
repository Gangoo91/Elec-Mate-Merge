import { ArrowLeft, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wiring & Terminations - Fire Alarm Course";
const DESCRIPTION = "Learn about fire alarm cable installation, termination techniques, testing and compliance with BS 5839-1 and BS 7671.";

const quickCheckQuestions = [
  {
    id: "wiring-1",
    question: "Fire alarm cables need to run through common trunking with mains power cables. What segregation is required?",
    options: [
      "No segregation needed if the cables are different colours",
      "A physical barrier (earthed metal partition) must separate fire alarm (Band I) from mains cables (Band II)",
      "Just run them on opposite sides",
      "Only separate them at junction boxes"
    ],
    correctIndex: 1,
    explanation: "A physical barrier (earthed metal partition) must separate the fire alarm cables (Band I) from mains cables (Band II), or they must be in separate compartments. Simply running them on opposite sides without a barrier is not compliant."
  },
  {
    id: "wiring-2",
    question: "An addressable loop uses 800m of 1.5mm square cable. What is the approximate loop resistance and is this likely to be acceptable?",
    options: [
      "4.8 ohms - definitely acceptable",
      "Approximately 19.2 ohms total loop resistance - typically within acceptable limits",
      "100 ohms - too high",
      "Cannot be calculated without more information"
    ],
    correctIndex: 1,
    explanation: "800m of 1.5mm square cable = approximately 0.8 x 12 = 9.6 ohms outgoing + 9.6 ohms return = 19.2 ohms total loop resistance. This is typically within acceptable limits (most panels allow 20-50 ohms) but check specific manufacturer documentation."
  },
  {
    id: "wiring-3",
    question: "Why is it important to test cables before connecting them to the fire alarm panel?",
    options: [
      "To check the cable colour is correct",
      "Testing before connection identifies faults while cables are accessible and before potential damage to equipment",
      "It is not important - just connect and test later",
      "Only required for new installations"
    ],
    correctIndex: 1,
    explanation: "Testing before connection identifies faults while cables are accessible and before potential damage to equipment. A short circuit could damage the panel. Insulation faults may not show immediately but cause intermittent problems later."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What type of cable is typically required for fire alarm circuits that need to continue operating during a fire?",
    options: [
      "Standard PVC insulated cable",
      "Fire-resistant cable complying with BS 7629 or BS 8434",
      "Armoured cable only",
      "Any red-coloured cable"
    ],
    correctAnswer: 1,
    explanation: "Fire-resistant cables meeting BS 7629 or BS 8434 are required for circuits that must maintain operation during a fire, such as certain sounder and mains supply circuits."
  },
  {
    id: 2,
    question: "What is the maximum permitted loop resistance for most addressable fire alarm systems?",
    options: [
      "10 ohms",
      "As specified by the panel manufacturer, typically 20-50 ohms",
      "100 ohms",
      "No limit"
    ],
    correctAnswer: 1,
    explanation: "Maximum loop resistance varies by manufacturer but is typically between 20-50 ohms. Always check the specific panel documentation for exact limits."
  },
  {
    id: 3,
    question: "When installing fire alarm cables in trunking, what segregation is required from mains cables?",
    options: [
      "No segregation needed",
      "Segregation as per BS 7671, typically a barrier or separate compartment",
      "Different colour trunking only",
      "At least 2m separation"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires segregation between fire alarm (Band I) and mains cables (Band II). This can be achieved with barriers, separate compartments, or spacing as specified."
  },
  {
    id: 4,
    question: "What purpose does the screen (foil) on fire alarm cable serve?",
    options: [
      "Colour coding only",
      "Electromagnetic interference (EMI) protection",
      "Fire resistance",
      "Additional conductor"
    ],
    correctAnswer: 1,
    explanation: "The screen provides protection against electromagnetic interference which could cause false alarms or communication failures on addressable loops."
  },
  {
    id: 5,
    question: "How should the cable screen be terminated at addressable devices?",
    options: [
      "Cut off and discard",
      "Per manufacturer instructions - typically connected at panel end only",
      "Connected to both ends always",
      "Wrapped around the cable"
    ],
    correctAnswer: 1,
    explanation: "Screen termination varies by manufacturer. Typically, the screen is only earthed at the panel end to avoid earth loops, but always follow manufacturer guidance."
  },
  {
    id: 6,
    question: "What insulation resistance is typically required for fire alarm circuits?",
    options: [
      "0.5 M ohms",
      "2 M ohms minimum between conductors and earth",
      "100 ohms",
      "No testing required"
    ],
    correctAnswer: 1,
    explanation: "A minimum insulation resistance of 2 M ohms is typically required between conductors and earth, tested at 500V DC."
  },
  {
    id: 7,
    question: "What is the typical minimum cable size for fire alarm detection circuits?",
    options: [
      "0.5mm square",
      "1.0mm square or 1.5mm square depending on circuit length",
      "2.5mm square",
      "4.0mm square"
    ],
    correctAnswer: 1,
    explanation: "Detection circuits typically use 1.0mm square or 1.5mm square cable, with larger sizes for longer runs to keep resistance within limits and ensure adequate current capacity."
  },
  {
    id: 8,
    question: "When terminating stranded conductors, what should be used?",
    options: [
      "Bare wire twisted tightly",
      "Ferrules (bootlace crimps) appropriate to conductor size",
      "Solder only",
      "Tape wrapped ends"
    ],
    correctAnswer: 1,
    explanation: "Ferrules prevent strand separation, ensure consistent contact area, and prevent damage from terminal tightening. They should match the conductor size."
  },
  {
    id: 9,
    question: "What continuity test should be performed on newly installed fire alarm cables?",
    options: [
      "Just check for shorts",
      "End-to-end resistance of each conductor plus insulation between conductors",
      "Visual inspection only",
      "No testing until commissioning"
    ],
    correctAnswer: 1,
    explanation: "Cable testing should include continuity of each conductor, insulation resistance between conductors and to earth, plus checks for short circuits."
  },
  {
    id: 10,
    question: "What labelling is required for fire alarm cables at the panel?",
    options: [
      "No labelling required",
      "Clear identification of circuit purpose, zones served and destination",
      "Manufacturer name only",
      "Date of installation only"
    ],
    correctAnswer: 1,
    explanation: "Cables must be clearly labelled at the panel with circuit purpose, zones served and destinations to aid maintenance and fault finding."
  }
];

const faqs = [
  {
    question: "Can I use junction boxes on fire alarm circuits?",
    answer: "Yes, but they must be accessible for maintenance, fire-rated where required, and clearly labelled. Minimise joints where possible as they are potential fault points."
  },
  {
    question: "What if insulation resistance is below 2 M ohms?",
    answer: "Investigate and rectify. Common causes include moisture ingress, damaged insulation, or contamination at terminations. Do not connect faulty cables to equipment."
  },
  {
    question: "Can fire alarm cables share containment with data cables?",
    answer: "Generally yes - data cables are also Band I. However, check for EMC requirements especially with network cables. Some panel manufacturers have specific guidance."
  },
  {
    question: "Why do some cables have 4 cores?",
    answer: "Some addressable systems use 4-core cable for outgoing and return paths, or for combined detection and sounder circuits. Check system design and panel requirements."
  },
  {
    question: "How do I know if fire-resistant cable is required?",
    answer: "Check the system design. Generally required for any circuit that must operate during evacuation - sounders, voice alarm, emergency lighting interfaces and certain supply cables."
  },
  {
    question: "What about cables in ceiling voids?",
    answer: "Must be properly supported, protected from damage, and routed to allow access for maintenance. Fire stopping required at compartment boundaries."
  }
];

const FireAlarmModule5Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wiring & Terminations
          </h1>
          <p className="text-white/80">
            Cable installation, termination techniques and testing requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Fire-resistant cables:</strong> BS 7629/8434 required for circuits operating during fire conditions</li>
              <li><strong>Segregation:</strong> Required from mains cables per BS 7671 to prevent interference</li>
              <li><strong>Testing:</strong> All cables tested for continuity and insulation before connecting to equipment</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Ferrules:</strong> Use bootlace crimps on all stranded conductors</li>
              <li><strong>Screens:</strong> Earth at panel end only per manufacturer guidance</li>
              <li><strong>Labelling:</strong> Both ends with circuit purpose and destination</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate cable types for different circuit functions",
              "Install cables with correct segregation and support",
              "Terminate conductors using proper techniques and ferrules",
              "Test installed cables before equipment connection",
              "Document cable test results for handover",
              "Identify and resolve common wiring faults"
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
            Cable Types & Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Correct cable selection ensures system reliability and compliance. Different circuits have different requirements based on their function during a fire.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard Fire Alarm Cable:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Red sheathed, screened cable for detection circuits</li>
                <li>1.0mm square or 1.5mm square typical for addressable loops</li>
                <li>2-core for conventional, 2 or 4-core for addressable</li>
                <li>Foil screen with drain wire for EMI protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire-Resistant Cable (BS 7629/8434):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Required for circuits operating during fire</li>
                <li>Sounder circuits in phased evacuation systems</li>
                <li>Mains supply to panel (if crossing fire zones)</li>
                <li>Voice alarm and emergency lighting interfaces</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Installation Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Cables must be installed with appropriate support and protection to ensure long-term reliability and maintainability.</p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Support Methods</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Cable tray at 300mm maximum centres</li>
                  <li>Conduit for mechanical protection</li>
                  <li>Trunking with appropriate segregation</li>
                  <li>Cable clips for surface runs</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protection Requirements</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Mechanical protection where exposed</li>
                  <li>Fire stopping at compartment boundaries</li>
                  <li>IP rating maintained through enclosures</li>
                  <li>Bend radius not less than 6x diameter</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm text-white"><strong>Warning:</strong> Fire-resistant cables lose their rating if damaged during installation. Handle with care and use appropriate bend radii.</p>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Segregation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>BS 7671 requires segregation between fire alarm and mains cables to prevent electromagnetic interference and ensure circuit integrity.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Band I (Fire Alarm) vs Band II (Mains) Segregation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Physical barrier within common trunking</li>
                <li>Separate compartments with earthed dividers</li>
                <li>Minimum spacing if no barrier (typically 50mm)</li>
                <li>Separate containment systems preferred</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">Document segregation methods on as-built drawings. Non-compliant segregation can cause false alarms and communication failures.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Termination Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Proper termination ensures reliable connections that will not deteriorate over the system's lifespan.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ferrule Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use ferrules (bootlace crimps) on all stranded conductors</li>
                <li>Match ferrule size to conductor cross-section</li>
                <li>Crimp with correct tool - not pliers</li>
                <li>Insulated ferrules preferred in terminals</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Screen Termination:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow manufacturer's guidance precisely</li>
                <li>Typically earthed at panel end only</li>
                <li>Cut back and insulate at device end</li>
                <li>Avoid earth loops that cause interference</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cable Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>All cables must be tested before connection to panel and devices to identify faults early.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required Tests:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Continuity:</strong> End-to-end resistance of each conductor</li>
                <li><strong>Insulation:</strong> Minimum 2 M ohms at 500V DC between conductors and earth</li>
                <li><strong>Short circuit:</strong> No shorts between conductors</li>
                <li><strong>Screen continuity:</strong> If screened cable used</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Loop Resistance Calculation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate expected resistance based on cable length</li>
                <li>1.0mm square copper = approximately 18 ohms/km</li>
                <li>1.5mm square copper = approximately 12 ohms/km</li>
                <li>Verify within panel manufacturer's limits</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation & Labelling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Proper documentation and labelling is essential for maintenance and fault finding throughout the system's operational life.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Labelling Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Label both ends of every cable</li>
                <li>Include circuit reference and destination</li>
                <li>Use durable labels resistant to fading</li>
                <li>Match labelling to drawing references</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test Records:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record all test results during installation</li>
                <li>Include date, tester name and instrument used</li>
                <li>Note any faults found and corrective action</li>
                <li>Include in handover documentation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pro Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Label cables as you install them - much easier than trying to trace later</li>
                <li>Leave service loops at both ends - allows for repositioning and re-termination</li>
                <li>Test each cable as you install it rather than all at the end</li>
                <li>Keep a stock of the correct size ferrules - saves multiple trips</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using standard cable where fire-resistant is required</strong> — non-compliant and unsafe</li>
                <li><strong>Not using ferrules on stranded conductors</strong> — leads to poor connections</li>
                <li><strong>Earthing cable screens at both ends</strong> — creates earth loops causing interference</li>
                <li><strong>Exceeding bend radius on fire-resistant cables</strong> — damages insulation</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FireAlarmModule5Section4;
