import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Faults and How to Correct Them - Module 4.5.8 | Level 2 Electrical Course";
const DESCRIPTION = "Master systematic fault-finding and correction techniques for electrical installations. Learn to identify, diagnose, and safely rectify common electrical faults while preventing recurrence.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main danger of a loose connection?",
    options: ["Reduced voltage", "Overheating and potential fire risk", "Increased current", "Faster wear"],
    correctIndex: 1,
    explanation: "Loose connections create high resistance, leading to overheating, arcing, and potential fire hazards. They can also cause intermittent faults and equipment damage."
  },
  {
    id: 2,
    question: "Name one piece of test equipment used to locate open circuits.",
    options: ["Voltage indicator", "Continuity tester", "Current clamp", "Power analyser"],
    correctIndex: 1,
    explanation: "Continuity testers (including low resistance ohmmeters and multimeters) are used to verify complete electrical paths and identify open circuits."
  },
  {
    id: 3,
    question: "Why should you record all fault rectification work?",
    options: ["For billing purposes", "For site documentation and quality assurance", "To impress clients", "For tool inventory"],
    correctIndex: 1,
    explanation: "Recording fault rectification provides quality assurance, helps identify recurring problems, supports certification, and assists with future maintenance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is a dangerous fault caused by swapping live and neutral conductors?",
    options: [
      "Open circuit",
      "Short circuit",
      "Reversed polarity",
      "Earth fault"
    ],
    correctAnswer: 2,
    explanation: "Reversed polarity occurs when live and neutral conductors are incorrectly connected, creating serious safety hazards."
  },
  {
    id: 2,
    question: "True or False: You should re-test the installation after correcting a fault.",
    options: [
      "True",
      "False",
      "Only for major faults",
      "Only if required by regulations"
    ],
    correctAnswer: 0,
    explanation: "True - Re-testing after fault correction verifies the repair and ensures no new faults were introduced."
  },
  {
    id: 3,
    question: "Name two causes of short circuits.",
    options: [
      "Insulation damage and conductor contact",
      "High voltage and low current",
      "Poor earthing and loose connections",
      "Wrong cable size and overloading"
    ],
    correctAnswer: 0,
    explanation: "Short circuits are typically caused by insulation damage allowing direct contact between live conductors."
  },
  {
    id: 4,
    question: "What is the first step before attempting to repair a fault?",
    options: [
      "Gather tools",
      "Isolate and prove dead",
      "Order replacement parts",
      "Call supervisor"
    ],
    correctAnswer: 1,
    explanation: "Safety requires complete isolation and verification that circuits are dead before any repair work begins."
  },
  {
    id: 5,
    question: "Which test instrument is used to check insulation condition?",
    options: [
      "Multimeter",
      "Insulation resistance tester",
      "Clamp meter",
      "Voltage stick"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testers apply high voltage to detect insulation breakdown and deterioration."
  },
  {
    id: 6,
    question: "Why is it important to tighten terminals to the manufacturer's torque settings?",
    options: [
      "To prevent loose connections and ensure optimal contact",
      "To speed up installation",
      "To reduce material costs",
      "To comply with colour coding"
    ],
    correctAnswer: 0,
    explanation: "Correct torque prevents loose connections while avoiding over-tightening damage, ensuring safe and reliable connections."
  },
  {
    id: 7,
    question: "Give one reason to test at both first fix and second fix stages.",
    options: [
      "To identify faults early before they become expensive",
      "To use test equipment regularly",
      "To satisfy insurance requirements",
      "To train apprentices"
    ],
    correctAnswer: 0,
    explanation: "Early testing identifies faults when they are easier and less expensive to correct, before final installation is complete."
  },
  {
    id: 8,
    question: "Why should you address only one fault at a time?",
    options: [
      "To save time",
      "To avoid confusion and ensure each repair is verified",
      "To use fewer tools",
      "To reduce paperwork"
    ],
    correctAnswer: 1,
    explanation: "Addressing one fault at a time prevents confusion, allows proper verification of each repair, and avoids introducing new problems."
  }
];

const Module4Section5_8 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.8</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Common Faults and How to Correct Them
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master systematic fault-finding and correction techniques to ensure safe, compliant, and reliable electrical installations.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Faults can occur during or after installation despite careful work</li>
                  <li>Common causes include poor workmanship, damaged materials, and inadequate testing</li>
                  <li>Systematic fault-finding and correction ensures safety and prevents recurrence</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Fault symptoms, potential causes, safety hazards</li>
                  <li><strong>Use:</strong> Systematic methods, proper test equipment, safe procedures</li>
                  <li><strong>Check:</strong> Complete repairs, verify function, prevent recurrence</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 leading-relaxed list-disc pl-6">
              <li>Recognise common electrical installation faults and understand their potential consequences</li>
              <li>Understand the likely causes of faults and how to prevent them through good practice</li>
              <li>Apply safe and systematic fault-finding techniques using appropriate test equipment</li>
              <li>Correct faults safely and effectively to restore proper operation and compliance</li>
              <li>Prevent fault recurrence through improved working methods and quality control procedures</li>
            </ul>
          </section>

          {/* Common Fault Categories */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Identification of Common Electrical Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Understanding common fault types enables rapid identification and appropriate corrective action:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Loose Connections</p>
                <p className="text-sm mb-2">High resistance faults causing overheating and intermittent operation:</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Symptoms: Flickering lights, intermittent power loss, burning smells, hot terminals</li>
                  <li>Locations: Terminal blocks, junction boxes, accessory connections, distribution boards</li>
                  <li>Detection: Visual inspection for burn marks, thermal imaging, resistance testing</li>
                  <li>Consequences: Fire risk, equipment damage, protection device operation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Reversed Polarity</p>
                <p className="text-sm mb-2">Dangerous condition with live and neutral conductors incorrectly connected:</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Symptoms: Incorrect operation of equipment, failed polarity tests, safety hazards</li>
                  <li>Common locations: Junction boxes, switch connections, distribution board terminations</li>
                  <li>Detection: Polarity testing with multimeter or dedicated test instruments</li>
                  <li>Consequences: Shock risk, equipment damage, regulatory non-compliance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Open Circuits</p>
                <p className="text-sm mb-2">Complete loss of electrical continuity through broken conductors or failed connections:</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Symptoms: Complete loss of power, failed continuity tests, non-functioning circuits</li>
                  <li>Causes: Broken conductors, failed terminations, damaged cables, loose connections</li>
                  <li>Detection: Continuity testing, visual inspection, voltage measurements</li>
                  <li>Impact: Circuit malfunction, inability to energise, failed commissioning</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Short Circuits and Earth Faults</p>
                <p className="text-sm mb-2">Direct connections between conductors or to earth:</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Short circuits: Direct contact between live conductors causing protection device operation</li>
                  <li>Earth faults: Live conductor contact with earthed metalwork creating shock risk</li>
                  <li>Detection: Insulation resistance testing, visual inspection for cable damage</li>
                  <li>Immediate action: Isolation, identification of fault location, safe repair procedures</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm"><strong>Safety priority:</strong> All faults present potential safety hazards requiring immediate assessment and appropriate action.</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="fault-danger-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Root Causes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Root Causes and Contributing Factors
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Understanding fault causes enables prevention strategies and improved working practices:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Poor Workmanship Factors</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Insufficient terminal tightening leading to high resistance connections</li>
                  <li>Incorrect cable stripping causing damaged conductors or inadequate insertion</li>
                  <li>Poor cable routing creating stress points and potential damage</li>
                  <li>Inadequate support allowing movement and connection stress</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Material and Component Issues</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Damaged cables with compromised insulation or conductor integrity</li>
                  <li>Incorrect cable specifications for application requirements</li>
                  <li>Defective accessories with manufacturing faults or damage</li>
                  <li>Incompatible materials causing galvanic corrosion or connection problems</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Process and Procedural Failures</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Insufficient testing during installation stages missing early fault detection</li>
                  <li>Lack of systematic inspection procedures allowing errors to progress</li>
                  <li>Poor documentation leading to confusion and incorrect connections</li>
                  <li>Inadequate supervision and quality assurance processes</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong>Prevention focus:</strong> Most faults are preventable through proper procedures, quality control, and protection measures.</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="test-equipment-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Fault-Finding Methods */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Systematic Fault-Finding Methodologies
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Structured approaches to fault-finding ensure safety, efficiency, and complete problem resolution:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Visual Inspection Methodology</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Look for burn marks, discolouration, or heat damage around connections</li>
                  <li>Check for loose, damaged, or incorrectly connected conductors</li>
                  <li>Inspect cable routing for damage, stress points, or inadequate support</li>
                  <li>Examine accessories for cracks, damage, or incorrect installation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Test Equipment Applications</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Continuity testers: Low resistance ohmmeters for open circuit detection</li>
                  <li>Insulation resistance testers: High voltage testing for insulation breakdown</li>
                  <li>Polarity testers: Multimeters and dedicated instruments for connection verification</li>
                  <li>Thermal imaging: Advanced detection of overheating connections</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Safety Procedures During Testing</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Complete circuit isolation using lock-off procedures before investigation</li>
                  <li>Prove dead using approved voltage indicators and proving units</li>
                  <li>Apply appropriate personal protective equipment for all activities</li>
                  <li>Use barriers and warning signs to protect others from investigation areas</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Logical Fault Location Process</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Start with distribution board and work towards load end</li>
                  <li>Use sectional testing to isolate fault location progressively</li>
                  <li>Test each junction point and connection systematically</li>
                  <li>Document findings and test results for analysis and future reference</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="recording-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Correction Techniques */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Professional Fault Correction Techniques
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Effective fault correction requires proper techniques, quality materials, and verification procedures:</p>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-2">Terminal and Connection Repairs</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Re-make loose terminations to manufacturer specified torque values</li>
                  <li>Strip and re-prepare damaged conductors using appropriate techniques</li>
                  <li>Clean oxidised or corroded connections before remaking</li>
                  <li>Apply appropriate jointing compounds where specified</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Component Replacement Procedures</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Replace damaged cables with equivalent or superior specifications</li>
                  <li>Install new accessories ensuring correct ratings and compatibility</li>
                  <li>Use appropriate containment and protection for replacement installations</li>
                  <li>Maintain original installation methods unless improvement is required</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Polarity and Connection Correction</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Identify all affected connection points requiring correction</li>
                  <li>Swap conductors to correct terminals using proper identification</li>
                  <li>Verify corrections at both ends of affected circuits</li>
                  <li>Re-test polarity throughout entire affected circuit</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong>Quality standard:</strong> All repairs must meet or exceed original installation standards and current regulations.</p>
              </div>
            </div>
          </section>

          {/* Prevention Strategies */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Comprehensive Fault Prevention Strategies
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Proactive prevention reduces faults, improves reliability, and maintains professional standards:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Quality Control Procedures</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Double-check all connections before progressing to next installation stage</li>
                  <li>Implement systematic testing at first fix, second fix, and final stages</li>
                  <li>Use quality checklists and inspection procedures throughout installation</li>
                  <li>Apply peer review processes for critical or complex installations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Protection During Construction</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Keep cables protected using appropriate covers and barriers during building work</li>
                  <li>Coordinate with other trades to prevent damage from their activities</li>
                  <li>Monitor installation areas for potential damage and take preventive action</li>
                  <li>Maintain clean working conditions to prevent contamination of electrical components</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Continuous Improvement Processes</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Analyse fault patterns to identify recurring issues and root causes</li>
                  <li>Update procedures and training based on lessons learned from faults</li>
                  <li>Share knowledge and experience within teams and across projects</li>
                  <li>Invest in better tools, training, and procedures to improve quality</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quality Assurance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Quality Assurance and Verification Procedures
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Electrical Verification</p>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>Continuity test confirms complete electrical path</li>
                    <li>Polarity test verifies correct conductor connections</li>
                    <li>Insulation resistance meets required standards</li>
                    <li>Earth continuity verified where applicable</li>
                    <li>Functional testing confirms proper operation</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Physical and Safety Checks</p>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>All connections mechanically secure</li>
                    <li>No exposed conductors or damaged insulation</li>
                    <li>Proper cable support and protection maintained</li>
                    <li>Access for future maintenance preserved</li>
                    <li>Documentation updated to reflect changes</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong>Professional standard:</strong> All repairs must meet current standards even if original installation was to earlier requirements.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2">Summary</h2>
              <p className="text-white/80 leading-relaxed">
                Faults in electrical installations can cause serious safety hazards, equipment damage, and costly delays. A systematic approach to fault-finding, correction, and prevention ensures installations are safe, compliant, and reliable. Professional electricians develop expertise in rapid fault diagnosis and effective correction techniques, while implementing quality control procedures that prevent most faults from occurring. This combination of diagnostic skills and prevention strategies ensures high-quality installations and enhances professional reputation.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Quiz (8 Questions)</h2>
            <p className="text-white/70 mb-6">Test your understanding of fault identification, diagnosis, and correction techniques.</p>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-7">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Making Final Fixes to Accessories
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Section 5
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section5_8;
