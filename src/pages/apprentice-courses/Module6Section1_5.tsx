import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section1_5 = () => {
  useSEO(
    "What Level 2 Learners Are Expected to Know and Do | Level 2 Electrical",
    "Understanding the scope, responsibilities and limitations of Level 2 learners in electrical inspection and testing activities"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main role of a Level 2 learner in inspection and testing?",
      options: [
        "To carry out testing independently",
        "To understand procedures and assist under supervision",
        "To sign certificates",
        "To diagnose complex faults"
      ],
      correctAnswer: 1,
      explanation: "Level 2 learners should understand procedures and assist qualified electricians under supervision, building foundational knowledge and skills."
    },
    {
      id: 2,
      question: "True or False: Level 2 learners are allowed to sign Electrical Installation Certificates.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Only qualified, competent persons can sign electrical certificates. Level 2 learners assist but do not have certification authority."
    },
    {
      id: 3,
      question: "Name two tests that Level 2 learners are expected to be aware of.",
      options: [
        "Only visual inspection",
        "Continuity and insulation resistance testing",
        "Complex fault diagnosis only",
        "Live testing procedures only"
      ],
      correctAnswer: 1,
      explanation: "Level 2 learners should understand basic tests including continuity, insulation resistance, polarity, earth fault loop impedance, and RCD testing."
    },
    {
      id: 4,
      question: "What is the difference between inspection and testing?",
      options: [
        "No difference - they are the same",
        "Inspection = visual check, Testing = measurement using instruments",
        "Inspection uses instruments, testing is visual",
        "Both require the same qualifications"
      ],
      correctAnswer: 1,
      explanation: "Inspection involves visual checks of construction and compliance, while testing uses instruments to measure electrical characteristics."
    },
    {
      id: 5,
      question: "What is the first rule before carrying out any electrical testing?",
      options: [
        "Check the weather",
        "Safe isolation",
        "Call the supervisor",
        "Read the manual"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation is the fundamental first step before any electrical testing to ensure the safety of all personnel involved."
    },
    {
      id: 6,
      question: "What type of responsibility do Level 2 learners NOT have?",
      options: [
        "Learning procedures",
        "Certification and unsupervised live testing",
        "Assisting supervisors",
        "Following safety procedures"
      ],
      correctAnswer: 1,
      explanation: "Level 2 learners cannot sign certificates or carry out unsupervised testing on live systems - these require higher qualifications."
    },
    {
      id: 7,
      question: "What should a Level 2 learner do if they don't understand a testing instruction?",
      options: [
        "Guess what to do",
        "Ask for clarification before proceeding",
        "Skip that step",
        "Look it up later"
      ],
      correctAnswer: 1,
      explanation: "Always ask for clarification before proceeding. Safety and accuracy depend on fully understanding all instructions."
    },
    {
      id: 8,
      question: "What is recorded to show testing has been carried out safely and correctly?",
      options: [
        "Nothing needs recording",
        "Certificates (EIC, Minor Works, EICR)",
        "Just verbal confirmation",
        "Personal notes only"
      ],
      correctAnswer: 1,
      explanation: "Formal certificates (EIC, Minor Works, EICR) provide legal documentation that testing has been completed correctly."
    },
    {
      id: 9,
      question: "What is the next stage of training after Level 2?",
      options: [
        "Start working independently immediately",
        "Level 3 – carrying out full inspection and testing independently",
        "No further training needed",
        "Only practical experience required"
      ],
      correctAnswer: 1,
      explanation: "Level 3 training builds on Level 2 foundations to develop competence in carrying out full inspection and testing independently."
    },
    {
      id: 10,
      question: "In the real-world example, what role did the Level 2 apprentice play in testing?",
      options: [
        "They signed the certificate",
        "They set up the instrument and read out results under supervision",
        "They worked completely alone",
        "They diagnosed the fault independently"
      ],
      correctAnswer: 1,
      explanation: "The apprentice assisted by setting up equipment and reading results under supervision, gaining hands-on experience safely."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 6.1
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.1.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              What Level 2 Learners Are Expected to Know and Do
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding the scope, responsibilities and limitations of Level 2 learners in electrical inspection and testing
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-sm space-y-1 list-disc pl-5">
              <li>Level 2 = Learn + Assist under supervision, NOT certify or work independently.</li>
              <li>Know WHY tests are done (safety, compliance) and WHAT tests exist (continuity, insulation, etc.).</li>
              <li>Assist with preparation, readings, and documentation - but qualified person signs certificates.</li>
              <li>Foundation for Level 3 competence - builds essential knowledge and safe working habits.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-2 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Describe what Level 2 learners should know about inspection and testing.</li>
                <li>Identify the tests and inspections you are expected to recognise at Level 2.</li>
                <li>Understand your role in assisting with inspection and testing activities.</li>
                <li>Recognise the limits of your responsibility as a learner.</li>
                <li>Appreciate how Level 2 knowledge builds towards further qualifications.</li>
                <li>Apply safe working practices when assisting with electrical verification.</li>
              </ul>
            </div>
          </section>

          {/* Knowledge Expected */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Knowledge Expected at Level 2
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Level 2 learners must develop a solid understanding of why inspection and testing are essential, what processes are involved, and how they contribute to electrical safety and compliance. This theoretical foundation is crucial for safe practical assistance.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Core Understanding Areas:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Purpose:</strong> Understand why inspection and testing are carried out (safety, compliance, fault detection)</li>
                  <li><strong>Legal framework:</strong> Awareness of EAWR 1989 and BS 7671 requirements</li>
                  <li><strong>Process distinction:</strong> Know the difference between inspection (visual) and testing (instrumental)</li>
                  <li><strong>Safety implications:</strong> Understand consequences of poor or missing verification</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Tests Level 2 Must Understand:</p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Continuity of protective conductors</strong></li>
                    <li>• <strong>Insulation resistance</strong></li>
                    <li>• <strong>Polarity</strong></li>
                    <li>• <strong>Earth fault loop impedance</strong></li>
                    <li>• <strong>RCD operation</strong></li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">What You Need to Know:</p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Purpose:</strong> Why the test is carried out</li>
                    <li>• <strong>Basic method:</strong> How the test is performed</li>
                    <li>• <strong>Safety aspects:</strong> Risks and precautions</li>
                    <li>• <strong>Results interpretation:</strong> Pass/fail basics</li>
                    <li>• <strong>Documentation:</strong> How results are recorded</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
                <p className="font-medium text-blue-400 mb-2">Learning Expectation</p>
                <p className="text-sm">
                  At Level 2, you're expected to understand the 'why' behind each procedure, not just memorise steps. This conceptual understanding enables you to assist effectively and builds the foundation for independent competence at Level 3.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="level2-knowledge-check"
            question="What should a Level 2 learner understand about electrical testing procedures?"
            options={["Only how to use the equipment", "The purpose, safety aspects, and basic methods", "Just the pass/fail criteria", "Only theoretical concepts"]}
            correctIndex={1}
            explanation="Level 2 learners should understand the purpose of each test, safety aspects, basic methods, and how results are interpreted - building comprehensive foundational knowledge."
          />

          {/* Practical Skills */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Practical Skills Expected
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                While Level 2 learners cannot work independently, they are expected to develop practical skills that allow them to safely assist qualified electricians. These skills form the foundation for future independent practice at higher levels.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Equipment Preparation and Setup:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Tool preparation:</strong> Safely prepare tools and instruments for testing under supervision</li>
                  <li><strong>Lead selection:</strong> Choose appropriate test leads for different measurements</li>
                  <li><strong>Instrument checks:</strong> Basic functional checks of test equipment before use</li>
                  <li><strong>Safety preparation:</strong> Set up barriers, warning notices, and safety equipment</li>
                  <li><strong>Documentation setup:</strong> Prepare certificates and record sheets</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Safe Isolation Assistance:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Switching procedures:</strong> Correct sequence for isolating circuits</li>
                  <li><strong>Lock-off procedures:</strong> Applying locks and warning labels</li>
                  <li><strong>Proving unit testing:</strong> Checking voltage indicators are working</li>
                  <li><strong>Dead testing:</strong> Confirming circuits are de-energised</li>
                  <li><strong>Documentation:</strong> Recording isolation procedures</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Basic Test Assistance:</p>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <p className="p-2 rounded bg-green-500/10"><strong>Continuity Testing:</strong> Connect leads, take readings, record under guidance</p>
                  <p className="p-2 rounded bg-blue-500/10"><strong>Insulation Resistance:</strong> Assist with lead connection and reading recording</p>
                  <p className="p-2 rounded bg-purple-500/10"><strong>Visual Inspection:</strong> Systematically check cable routes and accessories</p>
                  <p className="p-2 rounded bg-orange-500/10"><strong>Result Recording:</strong> Accurately document measurements</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Supervision Requirements</p>
                <p className="text-sm">
                  All practical activities must be carried out under the direct supervision of a qualified electrician. The supervisor retains full responsibility for safety, accuracy, and compliance - your role is to assist and learn under their guidance.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="practical-skills-check"
            question="What is the extent of practical testing a Level 2 learner can perform?"
            options={["Complete testing independently", "Assist with testing under direct supervision", "Sign certificates for simple tests", "Work unsupervised on low-voltage circuits"]}
            correctIndex={1}
            explanation="Level 2 learners can only assist with testing activities under direct supervision. They cannot work independently or sign certificates."
          />

          {/* Limitations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Limitations of Level 2 Learners
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding your limitations is as important as knowing your capabilities. Clear boundaries protect both you and your employers, ensuring safety and legal compliance while building towards future competence.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Certification Limitations:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>No certificate signing:</strong> You are not qualified to sign any electrical certificates</li>
                  <li><strong>No design responsibility:</strong> Cannot take responsibility for electrical design decisions</li>
                  <li><strong>No compliance assessment:</strong> Cannot determine if installations meet BS 7671 requirements</li>
                  <li><strong>No final verification:</strong> Cannot make final decisions on installation safety</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Cannot Do Unsupervised:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Live testing on energised systems</li>
                    <li>• Complex fault diagnosis</li>
                    <li>• Testing in hazardous environments</li>
                    <li>• High-voltage testing procedures</li>
                    <li>• Making final safety decisions</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Scope Limitations:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Advanced measurement interpretation</li>
                    <li>• Remedial work specification</li>
                    <li>• Risk assessment completion</li>
                    <li>• Client technical discussions</li>
                    <li>• Installation condition evaluation</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">When to Escalate Decisions:</p>
                <div className="space-y-2 text-sm">
                  <p className="p-2 rounded bg-red-500/10"><strong>Unusual readings:</strong> Any test result that seems abnormal should be referred to your supervisor.</p>
                  <p className="p-2 rounded bg-orange-500/10"><strong>Safety concerns:</strong> Any situation where you're unsure about safety requires immediate escalation.</p>
                  <p className="p-2 rounded bg-yellow-500/10"><strong>Technical questions:</strong> Client queries or technical decisions should always be referred to qualified staff.</p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="limitations-check"
            question="What should a Level 2 learner do if they encounter an unusual test reading?"
            options={["Make their own interpretation", "Ignore it and continue", "Refer it to their supervisor immediately", "Record it without comment"]}
            correctIndex={2}
            explanation="Level 2 learners should always refer unusual readings or unexpected results to their supervisor, as they don't have the experience to interpret complex results independently."
          />

          {/* Progression */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Progression of Knowledge
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Level 2 is the foundation of a structured learning pathway. Understanding how your current knowledge fits into the broader qualification framework helps you prepare for future advancement and career development.
              </p>
              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Level 2 Foundation Stage:</p>
                <ul className="text-sm space-y-1">
                  <li><strong>Focus:</strong> Understanding + Assisted Practice</li>
                  <li><strong>Knowledge:</strong> Fundamental concepts, procedures, and safety requirements</li>
                  <li><strong>Skills:</strong> Basic tool use, measurement taking, result recording under supervision</li>
                  <li><strong>Responsibility:</strong> Learning and assisting only - no independent decision making</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Level 3 Competence Development:</p>
                <ul className="text-sm space-y-1">
                  <li><strong>Focus:</strong> Independent Practice Under Guidance</li>
                  <li><strong>Knowledge:</strong> Detailed understanding of testing procedures, fault diagnosis, design principles</li>
                  <li><strong>Skills:</strong> Complete testing sequences, result interpretation, basic fault finding</li>
                  <li><strong>Responsibility:</strong> Carrying out testing independently but with oversight</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">AM2 and Industry Competence:</p>
                <ul className="text-sm space-y-1">
                  <li><strong>Focus:</strong> Full Professional Competence</li>
                  <li><strong>Knowledge:</strong> Complete mastery of inspection, testing, design, and compliance</li>
                  <li><strong>Skills:</strong> Advanced fault diagnosis, design verification, complex installation assessment</li>
                  <li><strong>Responsibility:</strong> Full certification authority and professional accountability</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Building on Level 2 Foundation:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Theoretical knowledge</strong> from Level 2 becomes practical competence at Level 3</li>
                  <li><strong>Assisted activities</strong> develop into independent capabilities</li>
                  <li><strong>Understanding procedures</strong> evolves into making professional judgements</li>
                  <li><strong>Safety awareness</strong> becomes responsibility for others' safety</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
              <h3 className="font-medium text-white mb-2">The Learning Experience</h3>
              <p className="text-sm text-white/80">
                A Level 2 apprentice was asked to help set up a continuity test. Under supervision, they prepared the test instrument, selected the correct test leads, clipped onto the conductors at both ends of the circuit, and read out the result while the supervisor confirmed compliance with acceptable limits. This allowed the apprentice to gain hands-on experience safely, understand the complete process, and contribute meaningfully to the work, while the responsibility for interpretation and certification remained with the qualified electrician.
              </p>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Pocket Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Level 2 Role Summary:</p>
                <ul className="text-sm space-y-1 text-white/80">
                  <li><strong>Level 2</strong> = Learn + Assist, not certify</li>
                  <li><strong>Know why</strong> tests are done, not just how</li>
                  <li><strong>Inspection</strong> = visual, <strong>Testing</strong> = instruments</li>
                  <li><strong>Support</strong> supervisors with safe, accurate preparation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Key Reminders:</p>
                <ul className="text-sm space-y-1 text-white/80">
                  <li>• Always work under supervision</li>
                  <li>• Ask questions when unsure</li>
                  <li>• Record experiences for learning</li>
                  <li>• Build skills towards Level 3 independence</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                In this subsection, you learned what Level 2 learners are expected to know and do in inspection and testing. You explored the essential knowledge areas, practical skills you can develop under supervision, and the important limitations of your role.
              </p>
              <p className="text-sm text-elec-yellow/80">
                Remember: your role is to learn, assist safely, and build towards independent practice - always within the bounds of your current competence and under appropriate supervision.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Knowledge Check: Level 2 Expectations" />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Inspection vs Testing
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Return to Section 6.1
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section1_5;
