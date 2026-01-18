import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule1Section5QuizData } from "@/data/upskilling/bmsModule1Section5QuizData";
import useSEO from "@/hooks/useSEO";

const TITLE = "Overview of Relevant Standards - BMS Module 1 Section 5";
const DESCRIPTION = "Learn about ISO 16484 and EN 15232 standards for Building Management Systems. Understand compliance requirements and how to apply standards in practice.";

const quickCheckQuestions = [
  {
    id: "iso-interop",
    question: "What does ISO 16484 ensure between different manufacturers' BMS systems?",
    options: [
      "Cost reduction and faster installation",
      "Interoperability and compatibility",
      "Energy efficiency improvements",
      "Reduced maintenance requirements"
    ],
    correctIndex: 1,
    explanation: "ISO 16484 ensures interoperability and compatibility between different manufacturers' systems, allowing them to work together seamlessly."
  },
  {
    id: "en-measure",
    question: "What does EN 15232 measure in relation to BMS?",
    options: [
      "Installation time and labour costs",
      "Energy performance and efficiency classification",
      "System reliability and uptime",
      "User satisfaction and comfort levels"
    ],
    correctIndex: 1,
    explanation: "EN 15232 measures and classifies building energy performance through automation systems, using classes A through D."
  },
  {
    id: "compliance-importance",
    question: "Why is compliance with BMS standards important for electricians?",
    options: [
      "To increase project costs and complexity",
      "To ensure legal protection, professional credibility, and client confidence",
      "To limit competition from other electricians",
      "To reduce the need for ongoing training"
    ],
    correctIndex: 1,
    explanation: "Standards compliance provides legal protection, builds professional credibility, and ensures client confidence in your work."
  },
  {
    id: "client-benefit",
    question: "How can electricians use standards as a benefit when talking to clients?",
    options: [
      "To justify higher project costs without explanation",
      "To demonstrate professionalism, ensure compliance, and quantify energy savings",
      "To avoid detailed project discussions",
      "To limit client involvement in technical decisions"
    ],
    correctIndex: 1,
    explanation: "Standards demonstrate professionalism, ensure regulatory compliance, and help quantify measurable energy savings for clients."
  }
];

const faqs = [
  {
    question: "What is the main purpose of ISO 16484?",
    answer: "ISO 16484 provides comprehensive guidance for Building Automation and Control Systems (BACS), covering project specification, hardware requirements, control functionality, and communication protocols like BACnet."
  },
  {
    question: "What do the EN 15232 energy classes (A-D) mean?",
    answer: "Class A represents high-performance systems with advanced automation, Class B is advanced, Class C is standard, and Class D represents non-automated buildings. Moving from D to A can achieve 20-30% energy savings."
  },
  {
    question: "Are BMS standards legally required?",
    answer: "While not always legally mandated, many public sector and commercial projects require ISO 16484 and EN 15232 compliance as contract conditions. BREEAM certifications often require demonstrable compliance."
  }
];

const BMSModule1Section5 = () => {
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
            <span>Module 1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overview of Relevant Standards
          </h1>
          <p className="text-white/80">
            ISO 16484, EN 15232, and Industry Compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>ISO 16484:</strong> BMS design, operation, interoperability</li>
              <li><strong>EN 15232:</strong> Energy performance classification (A-D)</li>
              <li><strong>Compliance:</strong> Legal protection, credibility, savings</li>
              <li><strong>Application:</strong> Project specs, documentation, verification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Contract requirements, compliance clauses</li>
              <li><strong>Use:</strong> Client discussions, project justification</li>
              <li><strong>Apply:</strong> Equipment verification, documentation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the purpose of ISO 16484 and EN 15232",
              "Explain how these standards impact BMS design and operation",
              "Recognise compliance responsibilities of electricians",
              "Understand how standards help achieve energy efficiency and safety"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: ISO 16484 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ISO 16484 – Building Automation and Control Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>ISO 16484</strong> is the comprehensive international standard that provides
              detailed guidance for Building Automation and Control Systems (BACS). This multi-part
              standard establishes the technical framework for professional BMS design, installation, and operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standard Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Part 1:</strong> Project specification and implementation</li>
                <li><strong>Part 2:</strong> Hardware requirements and installation</li>
                <li><strong>Part 3:</strong> Control functionality and applications</li>
                <li><strong>Part 4:</strong> Communication protocols (BACnet, LON, etc.)</li>
                <li><strong>Part 5:</strong> Data communication and management</li>
                <li><strong>Part 6:</strong> Data exchange with other building services</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">What It Covers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>System architecture and structure</li>
                  <li>Data exchange between components</li>
                  <li>Interoperability between manufacturers</li>
                  <li>Quality and performance consistency</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Multi-vendor system compatibility</li>
                  <li>Standardised communication protocols</li>
                  <li>Professional installation practices</li>
                  <li>Future-proof designs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: EN 15232 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            EN 15232 – Energy Performance of Buildings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>EN 15232</strong> is the European standard that addresses the impact of building
              automation on energy performance. It provides calculation methods and classification
              systems to quantify energy savings achieved through intelligent building controls.
            </p>

            <div className="grid grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-green-500/20 border border-green-500/30">
                <p className="font-bold text-green-400 text-lg mb-1">A</p>
                <p className="text-white text-xs">High Performance</p>
              </div>
              <div className="p-3 rounded bg-elec-yellow/20 border border-elec-yellow/30">
                <p className="font-bold text-elec-yellow text-lg mb-1">B</p>
                <p className="text-white text-xs">Advanced</p>
              </div>
              <div className="p-3 rounded bg-orange-500/20 border border-orange-500/30">
                <p className="font-bold text-orange-400 text-lg mb-1">C</p>
                <p className="text-white text-xs">Standard</p>
              </div>
              <div className="p-3 rounded bg-red-500/20 border border-red-500/30">
                <p className="font-bold text-red-400 text-lg mb-1">D</p>
                <p className="text-white text-xs">Non-Automated</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Control Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Zone temperature control accuracy</li>
                  <li>Occupancy-based scheduling</li>
                  <li>Demand-controlled ventilation</li>
                  <li>Heat recovery optimisation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Control Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Daylight harvesting systems</li>
                  <li>Occupancy detection control</li>
                  <li>Time-based scheduling</li>
                  <li>Dimming and load reduction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Why Standards Matter */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Why Standards Matter for Electricians
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding and applying BMS standards is crucial for professional electricians.
              Standards compliance is increasingly becoming a contractual requirement, and clients
              expect electrical contractors to demonstrate knowledge of relevant industry standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Enhanced credibility and reputation</li>
                  <li>Compliance with contract requirements</li>
                  <li>Future-proof installation practices</li>
                  <li>Competitive advantage in the marketplace</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Risk Mitigation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Avoid legal and financial penalties</li>
                  <li>Prevent safety hazards and liability</li>
                  <li>Ensure insurance compliance</li>
                  <li>Protect against system failures</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Contractual Requirements:</strong> Government and NHS projects typically mandate
                ISO 16484 and EN 15232 compliance. BREEAM certifications often require demonstrable
                compliance with energy efficiency standards.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Applying Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Applying Standards in Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Practical application of ISO 16484 and EN 15232 requires a systematic approach throughout
              the entire project lifecycle - from design through installation, commissioning, and maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Implementation Steps:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Project Specification Review:</strong> Check whether project specs require compliance before beginning work</li>
                <li><strong>2. Documentation and Recording:</strong> Maintain detailed compliance measures and test results</li>
                <li><strong>3. Team Collaboration:</strong> Work with BMS engineers to ensure devices meet classifications</li>
                <li><strong>4. Client Communication:</strong> Use standards as selling points to demonstrate value</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Review</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Contract specifications</li>
                  <li>System architecture</li>
                  <li>Communication protocol requirements</li>
                  <li>Energy efficiency targets</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Verification</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Device compliance certificates</li>
                  <li>Protocol compatibility testing</li>
                  <li>Energy rating documentation</li>
                  <li>Configuration manuals</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Knowledge Development</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Familiarise yourself with key parts of ISO 16484 and EN 15232</li>
                <li>Stay updated on latest revisions and industry best practices</li>
                <li>Understand energy efficiency targets and classifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Verification</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm devices and systems meet compliance requirements</li>
                <li>Test and verify performance against standards</li>
                <li>Document all compliance measures</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping spec review</strong> — always check compliance requirements first</li>
                <li><strong>Poor documentation</strong> — maintain comprehensive records for audits</li>
                <li><strong>Ignoring interoperability</strong> — verify protocol compatibility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <p className="text-sm font-medium text-elec-yellow mb-2">Case Study: London Commercial Office</p>
          <p className="text-sm text-white mb-3">
            A commercial office upgraded its BMS to comply with EN 15232 standards:
          </p>
          <ul className="text-sm text-white space-y-1">
            <li><strong>Before:</strong> Class C (Standard) rating</li>
            <li><strong>After:</strong> Class A (High Performance) rating</li>
            <li><strong>Result:</strong> 22% reduction in annual energy bills</li>
            <li><strong>Benefits:</strong> Met sustainability targets, increased tenant appeal</li>
          </ul>
        </div>

        {/* FAQs */}
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>ISO 16484 - BMS design & interoperability</li>
                  <li>EN 15232 - Energy performance (A-D)</li>
                  <li>BS 7671 - Electrical installation safety</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Energy Classes</p>
                <ul className="space-y-0.5">
                  <li>Class A - High performance automation</li>
                  <li>Class B - Advanced automation</li>
                  <li>Class C - Standard automation</li>
                  <li>Class D - Non-automated</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-sm text-white/80 mb-6">
            Test your understanding of BMS standards and compliance requirements.
          </p>
          <SingleQuestionQuiz
            questions={bmsModule1Section5QuizData}
            title="BMS Standards Assessment"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-1-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-1-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default BMSModule1Section5;
