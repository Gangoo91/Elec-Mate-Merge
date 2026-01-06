import { ArrowLeft, GraduationCap, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section1_5 = () => {
  useSEO(
    "What Level 2 Learners Are Expected to Know and Do | Level 2 Electrical",
    "Understanding the scope, responsibilities and limitations of Level 2 learners in electrical inspection and testing activities"
  );

  // Quiz questions
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.1.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            What Level 2 Learners Are Expected to Know and Do
          </h1>
          <p className="text-white">
            Understanding the scope, responsibilities and limitations of Level 2 learners in electrical inspection and testing activities
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Level 2 = Learn + Assist under supervision, NOT certify or work independently.</li>
                <li>Know WHY tests are done (safety, compliance) and WHAT tests exist (continuity, insulation, etc.).</li>
                <li>Assist with preparation, readings, and documentation - but qualified person signs certificates.</li>
                <li>Foundation for Level 3 competence - builds essential knowledge and safe working habits.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Level 2 learners working unsupervised, signing certificates, or making decisions beyond their competence.</li>
                <li><strong>Use:</strong> Ask questions; assist safely; learn procedures; respect limits; build towards Level 3 competence.</li>
                <li><strong>Check:</strong> Supervisor oversight; safe isolation confirmed; clear instructions understood; results properly recorded.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            At Level 2, electrical learners are not expected to carry out advanced testing independently, but they must understand the purpose of inspection and testing, be familiar with the main procedures, and safely assist a qualified electrician. This foundation prepares learners for more advanced qualifications and ensures they develop safe working habits early in their careers.
          </p>
          <p className="text-base text-white">
            Understanding your role and limitations as a Level 2 learner is crucial for both safety and professional development. This module defines what you should know, what you can do under supervision, and how this knowledge builds towards higher-level competence and eventual professional certification.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Describe what Level 2 learners should know about inspection and testing.</li>
            <li>Identify the tests and inspections you are expected to recognise at Level 2.</li>
            <li>Understand your role in assisting with inspection and testing activities.</li>
            <li>Recognise the limits of your responsibility as a learner.</li>
            <li>Appreciate how Level 2 knowledge builds towards further qualifications.</li>
            <li>Apply safe working practices when assisting with electrical verification.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Knowledge Expected at Level 2 */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Knowledge Expected at Level 2</h3>
            <p className="text-base text-white mb-4">
              Level 2 learners must develop a solid understanding of why inspection and testing are essential, what processes are involved, and how they contribute to electrical safety and compliance. This theoretical foundation is crucial for safe practical assistance.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3">Fundamental Knowledge Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Core Understanding Areas:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Purpose:</strong> Understand why inspection and testing are carried out (safety, compliance, fault detection)</li>
                          <li><strong>Legal framework:</strong> Awareness of EAWR 1989 and BS 7671 requirements</li>
                          <li><strong>Process distinction:</strong> Know the difference between inspection (visual) and testing (instrumental)</li>
                          <li><strong>Safety implications:</strong> Understand consequences of poor or missing verification</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Essential Test Awareness:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Tests Level 2 Must Understand:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• <strong>Continuity of protective conductors</strong> - ensures earth protection</li>
                                <li>• <strong>Insulation resistance</strong> - confirms cable integrity</li>
                                <li>• <strong>Polarity</strong> - verifies correct connections</li>
                                <li>• <strong>Earth fault loop impedance</strong> - confirms protective device operation</li>
                                <li>• <strong>RCD operation</strong> - tests additional protection</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">What You Need to Know About Each:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• <strong>Purpose:</strong> Why the test is carried out</li>
                                <li>• <strong>Basic method:</strong> How the test is performed</li>
                                <li>• <strong>Safety aspects:</strong> Risks and precautions</li>
                                <li>• <strong>Results interpretation:</strong> Pass/fail criteria basics</li>
                                <li>• <strong>Documentation:</strong> How results are recorded</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Inspection Knowledge Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Visual inspection purpose:</strong> Identifying construction and compliance issues</li>
                          <li><strong>Key inspection points:</strong> Cable routes, fixing methods, accessibility, labelling</li>
                          <li><strong>Safe zones:</strong> Understanding cable routing requirements</li>
                          <li><strong>Equipment suitability:</strong> Recognising appropriate components for environments</li>
                          <li><strong>Documentation requirements:</strong> How inspection results are recorded</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                        <p className="font-medium text-yellow-700 text-elec-yellow mb-2">Learning Expectation</p>
                        <p className="text-xs sm:text-sm text-white">
                          At Level 2, you're expected to understand the 'why' behind each procedure, not just memorise steps. This conceptual understanding enables you to assist effectively and builds the foundation for independent competence at Level 3.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
              <p className="font-medium text-blue-700 text-elec-yellow mb-2">Knowledge Assessment Methods</p>
              <p className="text-xs sm:text-sm text-white">
                Level 2 knowledge is typically assessed through written examinations, practical observations, and portfolio evidence. You should be able to explain procedures, identify test equipment, and describe safety requirements even if you cannot yet perform all tasks independently.
              </p>
            </div>
          </section>

          <InlineCheck
            id="level2-knowledge-check"
            question="What should a Level 2 learner understand about electrical testing procedures?"
            options={["Only how to use the equipment", "The purpose, safety aspects, and basic methods", "Just the pass/fail criteria", "Only theoretical concepts"]}
            correctIndex={1}
            explanation="Level 2 learners should understand the purpose of each test, safety aspects, basic methods, and how results are interpreted - building comprehensive foundational knowledge."
          />
          <Separator className="my-6" />

          {/* 2. Practical Skills Expected */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Practical Skills Expected</h3>
            <p className="text-base text-white mb-4">
              While Level 2 learners cannot work independently, they are expected to develop practical skills that allow them to safely assist qualified electricians. These skills form the foundation for future independent practice at higher levels.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Supervised Practical Skills</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Equipment Preparation and Setup:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Tool preparation:</strong> Safely prepare tools and instruments for testing under supervision</li>
                          <li><strong>Lead selection:</strong> Choose appropriate test leads for different measurements</li>
                          <li><strong>Instrument checks:</strong> Basic functional checks of test equipment before use</li>
                          <li><strong>Safety preparation:</strong> Set up barriers, warning notices, and safety equipment</li>
                          <li><strong>Documentation setup:</strong> Prepare certificates and record sheets</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Safe Isolation Assistance:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <p className="text-xs sm:text-sm text-white mb-2">Level 2 learners should understand and assist with:</p>
                          <ul className="text-xs sm:text-sm text-white ml-2 list-disc space-y-1">
                            <li><strong>Switching procedures:</strong> Correct sequence for isolating circuits</li>
                            <li><strong>Lock-off procedures:</strong> Applying locks and warning labels</li>
                            <li><strong>Proving unit testing:</strong> Checking voltage indicators are working</li>
                            <li><strong>Dead testing:</strong> Confirming circuits are de-energised</li>
                            <li><strong>Documentation:</strong> Recording isolation procedures</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Basic Test Assistance:</strong></p>
                        <div className="space-y-2">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Continuity Testing:</strong> Connect test leads, take readings, and record results under guidance.</p>
                          </div>
                          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Insulation Resistance:</strong> Assist with lead connection and reading recording while supervisor ensures safety.</p>
                          </div>
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Visual Inspection:</strong> Systematically check cable routes, accessories, and installation quality.</p>
                          </div>
                          <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Result Recording:</strong> Accurately document measurements and observations on appropriate certificates.</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Quality Assurance Activities:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Cross-checking:</strong> Verify recorded results against actual measurements</li>
                          <li><strong>Equipment maintenance:</strong> Clean and store test equipment properly</li>
                          <li><strong>Documentation review:</strong> Check certificates are completed accurately</li>
                          <li><strong>Learning reflection:</strong> Record experiences and questions in learner logbook</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mt-4">
              <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Supervision Requirements</p>
              <p className="text-xs sm:text-sm text-white">
                All practical activities must be carried out under the direct supervision of a qualified electrician. The supervisor retains full responsibility for safety, accuracy, and compliance - your role is to assist and learn under their guidance.
              </p>
            </div>
          </section>

          <InlineCheck
            id="practical-skills-check"
            question="What is the extent of practical testing a Level 2 learner can perform?"
            options={["Complete testing independently", "Assist with testing under direct supervision", "Sign certificates for simple tests", "Work unsupervised on low-voltage circuits"]}
            correctIndex={1}
            explanation="Level 2 learners can only assist with testing activities under direct supervision. They cannot work independently or sign certificates."
          />
          <Separator className="my-6" />

          {/* 3. Limitations of Level 2 Learners */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Limitations of Level 2 Learners</h3>
            <p className="text-base text-white mb-4">
              Understanding your limitations is as important as knowing your capabilities. Clear boundaries protect both you and your employers, ensuring safety and legal compliance while building towards future competence.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Professional and Legal Boundaries</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Certification Limitations:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>No certificate signing:</strong> You are not qualified to sign any electrical certificates</li>
                          <li><strong>No design responsibility:</strong> Cannot take responsibility for electrical design decisions</li>
                          <li><strong>No compliance assessment:</strong> Cannot determine if installations meet BS 7671 requirements</li>
                          <li><strong>No final verification:</strong> Cannot make final decisions on installation safety</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Practical Work Restrictions:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Cannot Do Unsupervised:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Live testing on energised systems</li>
                                <li>• Complex fault diagnosis</li>
                                <li>• Testing in hazardous environments</li>
                                <li>• High-voltage testing procedures</li>
                                <li>• Making final safety decisions</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Scope Limitations:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Advanced measurement interpretation</li>
                                <li>• Remedial work specification</li>
                                <li>• Risk assessment completion</li>
                                <li>• Client technical discussions</li>
                                <li>• Installation condition evaluation</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Safety and Legal Implications:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Professional liability:</strong> Working beyond competence level creates legal risks</li>
                          <li><strong>Insurance implications:</strong> Employers' insurance may not cover unauthorised activities</li>
                          <li><strong>Safety consequences:</strong> Incorrect decisions can lead to injury or property damage</li>
                          <li><strong>Qualification progression:</strong> Working outside scope can delay advancement</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>When to Escalate Decisions:</strong></p>
                        <div className="space-y-2">
                          <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Unusual readings:</strong> Any test result that seems abnormal or unexpected should be referred to your supervisor.</p>
                          </div>
                          <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Safety concerns:</strong> Any situation where you're unsure about safety procedures requires immediate escalation.</p>
                          </div>
                          <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Technical questions:</strong> Client queries or technical decisions should always be referred to qualified staff.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* 4. Progression of Knowledge */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Progression of Knowledge</h3>
            <p className="text-base text-white mb-4">
              Level 2 is the foundation of a structured learning pathway. Understanding how your current knowledge fits into the broader qualification framework helps you prepare for future advancement and career development.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Qualification Progression Pathway</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Level 2 Foundation Stage:</strong></p>
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded border">
                          <ul className="text-xs sm:text-sm text-white space-y-1">
                            <li><strong>Focus:</strong> Understanding + Assisted Practice</li>
                            <li><strong>Knowledge:</strong> Fundamental concepts, procedures, and safety requirements</li>
                            <li><strong>Skills:</strong> Basic tool use, measurement taking, result recording under supervision</li>
                            <li><strong>Responsibility:</strong> Learning and assisting only - no independent decision making</li>
                            <li><strong>Outcome:</strong> Solid foundation for progression to Level 3 studies</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Level 3 Competence Development:</strong></p>
                        <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded border">
                          <ul className="text-xs sm:text-sm text-white space-y-1">
                            <li><strong>Focus:</strong> Independent Practice Under Guidance</li>
                            <li><strong>Knowledge:</strong> Detailed understanding of testing procedures, fault diagnosis, design principles</li>
                            <li><strong>Skills:</strong> Complete testing sequences, result interpretation, basic fault finding</li>
                            <li><strong>Responsibility:</strong> Carrying out testing independently but with oversight</li>
                            <li><strong>Outcome:</strong> Qualification for unsupervised testing activities</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>AM2 and Industry Competence:</strong></p>
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded border">
                          <ul className="text-xs sm:text-sm text-white space-y-1">
                            <li><strong>Focus:</strong> Full Professional Competence</li>
                            <li><strong>Knowledge:</strong> Complete mastery of inspection, testing, design, and compliance requirements</li>
                            <li><strong>Skills:</strong> Advanced fault diagnosis, design verification, complex installation assessment</li>
                            <li><strong>Responsibility:</strong> Full certification authority and professional accountability</li>
                            <li><strong>Outcome:</strong> Qualified electrician status with signing authority</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Continuous Professional Development:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Ongoing Learning Requirements:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• BS 7671 amendment updates</li>
                                <li>• New technology integration</li>
                                <li>• Advanced testing techniques</li>
                                <li>• Specialised system knowledge</li>
                                <li>• Management and supervision skills</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Career Pathways:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Installation electrician</li>
                                <li>• Maintenance electrician</li>
                                <li>• Testing and inspection specialist</li>
                                <li>• Electrical supervisor/manager</li>
                                <li>• Electrical design engineer</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Building on Level 2 Foundation:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Theoretical knowledge</strong> from Level 2 becomes practical competence at Level 3</li>
                          <li><strong>Assisted activities</strong> develop into independent capabilities</li>
                          <li><strong>Understanding procedures</strong> evolves into making professional judgements</li>
                          <li><strong>Safety awareness</strong> becomes responsibility for others' safety</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Real-World Example
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-base text-white mb-3">
              <strong>The Learning Experience</strong>
            </p>
            <p className="text-base text-white">
              A Level 2 apprentice was asked to help set up a continuity test. Under supervision, they prepared the test instrument, selected the correct test leads, clipped onto the conductors at both ends of the circuit, and read out the result while the supervisor confirmed compliance with acceptable limits. This allowed the apprentice to gain hands-on experience safely, understand the complete process, and contribute meaningfully to the work, while the responsibility for interpretation and certification remained with the qualified electrician.
            </p>
          </div>
        </Card>

        {/* Case Study */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Case Study: Level 2 Learner Development
          </h2>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 mb-4">
            <p className="text-base text-white mb-3">
              <strong>Background:</strong> Sarah is a Level 2 apprentice who has been assisting with testing for six months. Her supervisor notices she's becoming confident with basic procedures and starts giving her more responsibility.
            </p>
            <p className="text-base text-white mb-3">
              <strong>The Situation:</strong> During a domestic installation test, Sarah notices an insulation resistance reading that seems lower than usual. Instead of making her own judgment, she immediately informs her supervisor.
            </p>
            <p className="text-base text-white mb-3">
              <strong>The Learning:</strong> Investigation reveals a cable that was damaged during installation. Sarah's attention to detail and appropriate escalation prevented a potential safety issue.
            </p>
            <p className="text-base text-white">
              <strong>The Development:</strong> This experience reinforced the importance of knowing your limitations while building confidence in recognising when something needs attention. Sarah continued developing within her Level 2 scope while preparing for Level 3 progression.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
            <p className="font-medium text-green-700 dark:text-green-400 mb-2">Development Points</p>
            <ul className="text-xs sm:text-sm text-white space-y-1">
              <li>• Level 2 learners can make valuable contributions while working within their competence</li>
              <li>• Recognising when to escalate is as important as technical knowledge</li>
              <li>• Appropriate supervision allows safe skill development</li>
              <li>• Experience builds confidence for Level 3 progression</li>
            </ul>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-l-elec-yellow pl-4 bg-elec-yellow/5/50 dark:bg-elec-yellow/10 py-3">
              <p className="font-medium text-white mb-2">Q: Can I practice testing on my own time to improve my skills?</p>
              <p className="text-xs sm:text-sm text-white">A: Only with appropriate supervision and safety measures. Never practice on live circuits or without qualified oversight. Use training boards and de-energised systems only.</p>
            </div>
            <div className="border-l-4 border-l-green-500 pl-4 bg-green-50/50 dark:bg-green-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: How long does it typically take to progress from Level 2 to Level 3?</p>
              <p className="text-xs sm:text-sm text-white">A: This varies depending on the training route, but typically 1-2 years with a combination of workplace experience and formal education. Consistent practice and good supervision accelerate progress.</p>
            </div>
            <div className="border-l-4 border-l-purple-500 pl-4 bg-purple-50/50 dark:bg-purple-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: What should I do if my employer asks me to do work beyond my Level 2 competence?</p>
              <p className="text-xs sm:text-sm text-white">A: Politely decline and explain your qualification limitations. Suggest involving a qualified electrician. Working beyond competence puts everyone at risk and could affect your progression.</p>
            </div>
            <div className="border-l-4 border-l-amber-500 pl-4 bg-amber-50/50 dark:bg-amber-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: Can I assist with testing in different types of buildings?</p>
              <p className="text-xs sm:text-sm text-white">A: Yes, under appropriate supervision. Different environments (domestic, commercial, industrial) provide valuable learning experiences but require understanding of specific safety requirements.</p>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-elec-yellow" />
            Practical Guidance
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-700 text-elec-yellow mb-2">Learning Best Practice</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Always ask for clarification before carrying out testing tasks</li>
                  <li>• Focus on learning procedures and understanding why each test is carried out</li>
                  <li>• Keep detailed notes in your learner logbook</li>
                  <li>• Take every opportunity to observe and assist with different tests</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Safety Best Practice</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Treat all circuits as live until proven isolated</li>
                  <li>• Never work beyond your competence level</li>
                  <li>• Respect the limits of your responsibility - your role is to assist and learn</li>
                  <li>• Report any concerns or unusual findings immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-500" />
            Pocket Guide
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Level 2 Role Summary:</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li><strong>Level 2</strong> = Learn + Assist, not certify</li>
                  <li><strong>Know why</strong> tests are done, not just how</li>
                  <li><strong>Inspection</strong> = visual, <strong>Testing</strong> = instruments</li>
                  <li><strong>Support</strong> supervisors with safe, accurate preparation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Key Reminders:</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Always work under supervision</li>
                  <li>• Ask questions when unsure</li>
                  <li>• Record experiences for learning</li>
                  <li>• Build skills towards Level 3 independence</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white">
            In this subsection, you learned what Level 2 learners are expected to know and do in inspection and testing. You explored the essential knowledge areas, practical skills you can develop under supervision, and the important limitations of your role. You also discovered how Level 2 forms the foundation for progression to Level 3 competence and eventual professional certification. Remember: your role is to learn, assist safely, and build towards independent practice - always within the bounds of your current competence and under appropriate supervision.
          </p>
        </Card>

        {/* Quiz Section */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-4" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Return to Section 6.1
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section1_5;