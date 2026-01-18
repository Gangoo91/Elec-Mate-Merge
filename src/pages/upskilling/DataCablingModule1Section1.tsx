import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "What is Structured Cabling? | Data Cabling Module 1.1";
const DESCRIPTION = "Introduction to structured cabling systems, standards, and fundamental principles for data communications infrastructure.";

const quickCheckQuestions = [
  {
    id: "datacabling-m1s1-check1",
    question: "What is the primary benefit of structured cabling over unstructured cabling?",
    options: [
      "Lower initial cost",
      "Standardised design enabling easier management and expansion",
      "Faster installation time",
      "No need for documentation"
    ],
    correctIndex: 1,
    explanation: "Structured cabling follows standardised design principles with organised cable runs, proper labelling, and standardised components, making it easier to manage, troubleshoot, and expand."
  },
  {
    id: "datacabling-m1s1-check2",
    question: "What is the typical lifespan of a well-designed structured cabling system?",
    options: ["5-10 years", "10-15 years", "15-20 years or more", "25-30 years"],
    correctIndex: 2,
    explanation: "A well-designed structured cabling system typically lasts 15-20 years or more, often outlasting multiple generations of active network equipment."
  },
  {
    id: "datacabling-m1s1-check3",
    question: "Which of the following is NOT a subsystem in a structured cabling system?",
    options: [
      "Horizontal cabling",
      "Backbone cabling",
      "Power distribution",
      "Work area components"
    ],
    correctIndex: 2,
    explanation: "Power distribution is not part of structured cabling. The six subsystems are: entrance facilities, equipment room, backbone cabling, telecommunications room, horizontal cabling, and work area."
  }
];

const faqs = [
  {
    question: "What's the difference between structured and unstructured cabling?",
    answer: "Structured cabling follows standardised design principles with organised cable runs, proper labelling, and standardised components. Unstructured cabling is typically point-to-point connections without standardisation, making it harder to manage and expand."
  },
  {
    question: "How long does structured cabling typically last?",
    answer: "A well-designed structured cabling system typically lasts 15-20 years or more. The infrastructure often outlasts multiple generations of active equipment, making it a cost-effective long-term investment."
  },
  {
    question: "What are the main standards for structured cabling?",
    answer: "The primary standards are TIA/EIA-568 (North America), ISO/IEC 11801 (International), and EN 50173 (Europe). These standards define cable types, performance requirements, installation practices, and testing procedures."
  },
  {
    question: "Can structured cabling support different types of services?",
    answer: "Yes, structured cabling is designed to be service-independent. The same infrastructure can support voice, data, video, building automation, security systems, and emerging technologies without requiring rewiring."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A client asks why they should invest in structured cabling instead of simple point-to-point connections. What is the best response?",
  options: [
    "Point-to-point is always cheaper",
    "Structured cabling provides standardised infrastructure that's easier to manage, troubleshoot, and expand",
    "There is no difference between the two approaches",
    "Structured cabling only works for large buildings"
  ],
  correctAnswer: 1,
  explanation: "Structured cabling provides a standardised infrastructure that offers better organisation, easier troubleshooting, simplified expansion, and service independence - making it more cost-effective over the system's 15-20 year lifespan."
  }
];

const DataCablingModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What is Structured Cabling?
          </h1>
          <p className="text-white/80">
            Introduction to standardised communications infrastructure
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Definition:</strong> Standardised building-wide cabling system</li>
              <li><strong>Purpose:</strong> Support multiple services on one infrastructure</li>
              <li><strong>Lifespan:</strong> 15-20+ years when properly designed</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Organised patch panels, labelled cables, comms rooms</li>
              <li><strong>Use:</strong> Commercial buildings, data centres, campuses</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define structured cabling and its purpose",
              "Identify the six subsystems",
              "Understand key industry standards",
              "Recognise benefits over unstructured approaches",
              "Apply structured cabling principles",
              "Plan for future expansion"
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
            Definition and Purpose
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Structured cabling is a standardised approach to designing and installing a
              building's telecommunications infrastructure. Unlike ad-hoc point-to-point
              connections, structured cabling provides an organised, scalable foundation
              that supports multiple services.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Standardised:</strong> Follows industry standards</li>
                  <li><strong>Organised:</strong> Logical layout and labelling</li>
                  <li><strong>Flexible:</strong> Supports multiple services</li>
                  <li><strong>Scalable:</strong> Easy to expand</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Services Supported</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Data networking (Ethernet)</li>
                  <li>Voice communications (VoIP)</li>
                  <li>Video and multimedia</li>
                  <li>Building automation (BMS)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">15-20 years</p>
                <p className="text-white/90 text-xs">Typical lifespan</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">6 subsystems</p>
                <p className="text-white/90 text-xs">Standard structure</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Multiple services</p>
                <p className="text-white/90 text-xs">On one infrastructure</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Six Subsystems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A structured cabling system consists of six interconnected subsystems,
              each serving a specific function in the overall infrastructure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Subsystem Overview:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Entrance Facilities:</strong> Where external services enter the building</li>
                <li><strong>2. Equipment Room:</strong> Houses main distribution and active equipment</li>
                <li><strong>3. Backbone Cabling:</strong> Connects equipment rooms to telecom rooms</li>
                <li><strong>4. Telecommunications Room:</strong> Floor-level distribution points</li>
                <li><strong>5. Horizontal Cabling:</strong> Connects telecom room to work areas</li>
                <li><strong>6. Work Area:</strong> End-user connection points</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Distances:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Horizontal:</strong> Maximum 90m permanent link</li>
                <li><strong>Work area + patch:</strong> 10m combined allowance</li>
                <li><strong>Total channel:</strong> 100m maximum</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Industry Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Structured cabling systems are governed by international standards that
              ensure consistency, interoperability, and performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Major Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>TIA/EIA-568:</strong> North American standard</li>
                  <li><strong>ISO/IEC 11801:</strong> International standard</li>
                  <li><strong>EN 50173:</strong> European standard</li>
                  <li><strong>BS 6701:</strong> UK-specific guidance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Standards Define</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cable categories and performance</li>
                  <li>Installation best practices</li>
                  <li>Testing requirements</li>
                  <li>Documentation standards</li>
                </ul>
              </div>
            </div>

            <p>
              Compliance with standards ensures the cabling system will support current
              and future applications, and simplifies maintenance and troubleshooting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Planning Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Survey existing infrastructure and services</li>
                <li>Identify current and future bandwidth needs</li>
                <li>Plan telecom room locations for cable distance limits</li>
                <li>Allow 20-30% spare capacity for growth</li>
                <li>Document everything from day one</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersizing:</strong> — Not allowing for growth</li>
                <li><strong>Poor labelling:</strong> — Creates management nightmares</li>
                <li><strong>Mixing standards:</strong> — Inconsistent components</li>
                <li><strong>Exceeding distances:</strong> — Performance degradation</li>
              </ul>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Key Standards</p>
              <ul className="space-y-0.5">
                <li>TIA/EIA-568 (North America)</li>
                <li>ISO/IEC 11801 (International)</li>
                <li>EN 50173 (Europe)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Limits</p>
              <ul className="space-y-0.5">
                <li>Horizontal: 90m permanent link</li>
                <li>Channel: 100m total</li>
                <li>Patch/work area: 10m combined</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule1Section1;