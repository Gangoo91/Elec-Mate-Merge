import { ArrowLeft, ArrowRight, StopCircle, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Knowing when to escalate or stop work - Module 7.4.6 | Level 2 Electrical Course";
const DESCRIPTION = "Learn when to escalate issues or stop work for safety and professional reasons in electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "When should you stop work immediately?",
    options: ["When you're tired", "When you identify a safety hazard", "When materials run out", "When it's lunchtime"],
    correctIndex: 1,
    explanation: "Work must stop immediately when safety hazards are identified to prevent injury or further danger."
  },
  {
    id: 2,
    question: "Who should you escalate technical problems to?",
    options: ["Other apprentices", "Your supervisor or qualified electrician", "The client", "Nobody"],
    correctIndex: 1,
    explanation: "Technical problems should be escalated to your supervisor or a qualified electrician for proper guidance."
  },
  {
    id: 3,
    question: "What should you do if asked to work beyond your competence?",
    options: ["Try your best", "Refuse and explain your limitations", "Ask a colleague to help", "Do it anyway"],
    correctIndex: 1,
    explanation: "You should refuse work beyond your competence and explain your limitations - this is professional and safe practice."
  },
  {
    id: 4,
    question: "What is the first step when discovering a safety hazard?",
    options: ["Call your supervisor", "Secure the area", "Take photos", "Continue working"],
    correctIndex: 1,
    explanation: "The first priority is always to secure the area and prevent further danger before contacting supervisors."
  },
  {
    id: 5,
    question: "When is it acceptable to work beyond your competence level?",
    options: ["Never", "Only under direct supervision by qualified personnel", "When the customer requests it", "In emergencies only"],
    correctIndex: 1,
    explanation: "Working beyond competence is only acceptable when under direct supervision by qualified personnel as part of learning."
  }
];

const Module7Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the most important factor in deciding whether to escalate?",
      options: ["Time pressure", "Your competence level", "Customer preferences", "Cost considerations"],
      correctAnswer: 1,
      explanation: "Your competence level is the primary factor - never work beyond your qualifications or experience."
    },
    {
      id: 2,
      question: "When should you stop work immediately?",
      options: ["When unsure about procedures", "When discovering dangerous conditions", "When lacking proper tools", "All of the above"],
      correctAnswer: 3,
      explanation: "All these situations require you to stop work immediately to ensure safety and compliance."
    },
    {
      id: 3,
      question: "What should you document when escalating an issue?",
      options: ["Nothing", "Just the problem", "The problem, circumstances, and actions taken", "Only your contact details"],
      correctAnswer: 2,
      explanation: "Comprehensive documentation helps the qualified person understand the situation and take appropriate action."
    },
    {
      id: 4,
      question: "Who has the authority to design circuit modifications?",
      options: ["Any apprentice", "Qualified electricians only", "The customer", "Anyone with tools"],
      correctAnswer: 1,
      explanation: "Only qualified electricians have the authority and competence to design circuit modifications."
    },
    {
      id: 5,
      question: "True or False: Customer pressure can override safety requirements.",
      options: ["False", "True"],
      correctAnswer: 0,
      explanation: "False. Customer pressure never overrides safety requirements or professional standards."
    },
    {
      id: 6,
      question: "What should you do if you discover live conductors in a supposedly dead circuit?",
      options: ["Continue working carefully", "Stop work immediately and secure the area", "Test with your hands", "Ignore it if not your area"],
      correctAnswer: 1,
      explanation: "Stop work immediately, secure the area, and escalate to prevent potential electrocution."
    },
    {
      id: 7,
      question: "When escalating, who should you contact first?",
      options: ["Emergency services", "Your direct supervisor", "The customer", "Another apprentice"],
      correctAnswer: 1,
      explanation: "Your direct supervisor should be the first contact for most escalations unless it's an immediate emergency."
    },
    {
      id: 8,
      question: "What information should you include when reporting a safety hazard?",
      options: ["Location, nature of hazard, immediate actions taken", "Just the location", "Only what you think caused it", "Your opinion on how to fix it"],
      correctAnswer: 0,
      explanation: "Complete information including location, hazard description, and actions taken helps qualified personnel respond appropriately."
    },
    {
      id: 9,
      question: "Is it acceptable to work beyond your competence if supervised?",
      options: ["Only if directly supervised by a qualified person", "Never acceptable", "Only in emergencies", "Yes, always"],
      correctAnswer: 0,
      explanation: "Working beyond competence is only acceptable under direct supervision by a qualified person as part of training."
    },
    {
      id: 10,
      question: "What should you do after escalating an issue?",
      options: ["Continue working", "Wait for instructions before proceeding", "Start a different task", "Go home"],
      correctAnswer: 1,
      explanation: "After escalating, you must wait for instructions from qualified personnel before proceeding with any work."
    },
    {
      id: 11,
      question: "Which of these requires immediate escalation to emergency services?",
      options: ["Unexpected test results", "Equipment malfunction", "Risk of electrocution or fire", "Customer complaints"],
      correctAnswer: 2,
      explanation: "Immediate dangers like electrocution risk or fire require emergency services before contacting supervisors."
    },
    {
      id: 12,
      question: "What makes an electrician 'competent' for a specific task?",
      options: ["Years of experience only", "Relevant qualifications only", "Knowledge, skills, and experience combined", "Being supervised"],
      correctAnswer: 2,
      explanation: "Competence requires the combination of relevant knowledge, practical skills, and sufficient experience."
    }
  ];

  const faqs = [
    {
      question: "Will I get in trouble for escalating too often?",
      answer: "No - responsible escalation is a sign of professionalism and safety awareness. It's better to escalate unnecessarily than to work unsafely or beyond your competence. Good supervisors encourage proper escalation."
    },
    {
      question: "What if the customer pressures me to continue working when I've identified a problem?",
      answer: "Customer pressure never overrides safety requirements or professional standards. Politely explain that you must follow proper procedures and escalate if necessary for everyone's safety. Document any pressure applied."
    },
    {
      question: "How do I know if something is definitely beyond my competence?",
      answer: "If you haven't been specifically trained in the procedure, lack the required qualifications, feel uncertain about safety implications, or are dealing with unfamiliar equipment, it's beyond your competence and should be escalated."
    },
    {
      question: "What if I can't reach my supervisor immediately?",
      answer: "If it's a safety issue, secure the area and try alternative contacts (site manager, qualified electrician). For immediate dangers, call emergency services first. Never proceed with unsafe work while waiting for contact."
    },
    {
      question: "Should I escalate if I'm just unsure about a procedure?",
      answer: "Absolutely. Uncertainty about procedures, especially safety-critical ones, should always be escalated. It's professional practice to seek clarification rather than guess."
    },
    {
      question: "What if escalating delays the project significantly?",
      answer: "Project delays are preferable to safety incidents or poor-quality work. Proper escalation often prevents bigger problems later. Quality and safety must never be compromised for time pressures."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 4</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <StopCircle className="w-4 h-4" />
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 4.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Knowing When to Escalate or Stop Work
            </h1>
            <p className="text-white/70 text-lg">
              Professional safety and competence boundaries
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Stop work immediately when safety hazards are identified</li>
              <li>• Escalate tasks beyond your competence level</li>
              <li>• Document and report technical problems properly</li>
              <li>• Never let customer pressure override safety requirements</li>
            </ul>
          </div>

          {/* Critical Safety Principle */}
          <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50 mb-10">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-400 mb-2">Critical Safety Principle</p>
                <p className="text-white/80 text-sm">
                  Proper escalation and work stoppage decisions prevent 90% of serious electrical accidents and maintain professional standards throughout the industry. CDM Regulations 2015 and BS7671 require workers to stop work immediately when safety risks are identified.
                </p>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2">
              <li>• Recognise situations requiring immediate escalation or work stoppage</li>
              <li>• Understand the legal and professional importance of working within competence limits</li>
              <li>• Apply systematic escalation procedures and comprehensive documentation</li>
              <li>• Maintain safety and secure work areas while awaiting qualified assistance</li>
              <li>• Communicate effectively with supervisors, qualified personnel, and customers</li>
              <li>• Demonstrate professional responsibility in challenging situations</li>
            </ul>
          </section>

          {/* Block 1: Understanding Competence */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Understanding Competence and Professional Limits
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding your competence boundaries is fundamental to safe and professional electrical work. Competence is not just about technical ability—it encompasses knowledge, skills, and experience combined with professional judgement.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">The Competence Framework</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                    <p className="font-medium text-blue-400 mb-2">Knowledge</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Understanding electrical theory</li>
                      <li>• BS7671 regulations knowledge</li>
                      <li>• Safety requirements and procedures</li>
                      <li>• Industry best practices</li>
                      <li>• Risk awareness and management</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                    <p className="font-medium text-green-400 mb-2">Skills</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Practical technical abilities</li>
                      <li>• Safe tool and equipment use</li>
                      <li>• Testing and measurement techniques</li>
                      <li>• Installation and fault-finding</li>
                      <li>• Problem-solving capabilities</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                    <p className="font-medium text-purple-400 mb-2">Experience</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Hands-on practical application</li>
                      <li>• Learning from real situations</li>
                      <li>• Building professional confidence</li>
                      <li>• Developing sound judgement</li>
                      <li>• Understanding consequences</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-2">Beyond Competence Indicators</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Feeling uncertain about procedures or safety implications</li>
                  <li>• Lacking specific training for the task at hand</li>
                  <li>• Working with unfamiliar equipment or complex systems</li>
                  <li>• Encountering non-standard or unusual installations</li>
                  <li>• Being asked to make design decisions or circuit modifications</li>
                  <li>• Dealing with situations not covered in your training</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="escalate-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Block 2: When to Stop Work */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Immediate Work Stoppage Situations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Certain situations require immediate work stoppage to prevent injury, death, or significant damage. Recognising these situations and acting decisively is crucial for electrical safety.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Critical Stop Situations</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Electrical Safety Hazards:</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Live conductors exposed or damaged</li>
                      <li>• Unexpected live circuits during testing</li>
                      <li>• Inadequate or missing earthing connections</li>
                      <li>• Equipment showing signs of overheating or burning</li>
                      <li>• Insulation failure or breakdown</li>
                      <li>• Arc flash or electrical fire risk</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Environmental Hazards:</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Suspected gas leaks in vicinity</li>
                      <li>• Structural damage affecting safety</li>
                      <li>• Water ingress creating electrocution risk</li>
                      <li>• Presence of hazardous materials (asbestos)</li>
                      <li>• Unstable working platforms or access</li>
                      <li>• Extreme weather affecting safety</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-2">Emergency Action Sequence</p>
                <ol className="text-sm text-white/70 space-y-1 list-decimal pl-4">
                  <li>Stop all work immediately - do not complete current task</li>
                  <li>Secure the area and isolate the hazard if safely possible</li>
                  <li>Evacuate unnecessary personnel from the danger zone</li>
                  <li>Call emergency services (999) if immediate danger exists</li>
                  <li>Contact supervisor while maintaining area security</li>
                </ol>
              </div>
            </div>
          </section>

          <InlineCheck
            id="escalate-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Block 3: Escalation Triggers */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Comprehensive Escalation Triggers
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Beyond immediate safety issues, many situations require escalation to qualified personnel for guidance, technical expertise, or regulatory compliance.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">When to Escalate</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20">
                    <p className="font-medium text-orange-400 mb-2">Technical Issues</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Unexpected test results requiring interpretation</li>
                      <li>• Circuit modifications or design changes needed</li>
                      <li>• Non-standard installations requiring specialist knowledge</li>
                      <li>• Complex fault diagnosis beyond training level</li>
                      <li>• Equipment selection requiring technical calculations</li>
                      <li>• Installation methods not covered in training</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                    <p className="font-medium text-blue-400 mb-2">Regulatory Compliance</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Work requiring specialist certifications</li>
                      <li>• Building Control notification requirements</li>
                      <li>• DNO (Distribution Network Operator) liaison needed</li>
                      <li>• Special locations requiring additional expertise</li>
                      <li>• Non-compliance with BS7671 discovered</li>
                      <li>• Planning permission or consent issues</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                    <p className="font-medium text-green-400 mb-2">Customer Relations</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Customer requesting work beyond your authority</li>
                      <li>• Disputes about work scope or methods</li>
                      <li>• Additional costs or time requirements</li>
                      <li>• Access issues or scheduling conflicts</li>
                      <li>• Customer safety concerns or complaints</li>
                      <li>• Changes to original work specification</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                    <p className="font-medium text-purple-400 mb-2">Professional Uncertainty</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Feeling unsure about safety implications</li>
                      <li>• Lacking confidence in procedure execution</li>
                      <li>• Encountering unfamiliar equipment or systems</li>
                      <li>• Working in challenging or unusual environments</li>
                      <li>• Time pressures affecting quality or safety</li>
                      <li>• Any situation where you feel out of your depth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="escalate-check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Block 4: Proper Escalation Procedures */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Systematic Escalation Procedures
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Following proper escalation procedures ensures effective communication, maintains safety, and demonstrates professionalism. Each step builds upon the previous to provide comprehensive information and support.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Step-by-Step Escalation Process</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <p className="font-medium text-purple-400">Immediate Safety Actions</p>
                    </div>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Stop work and assess immediate dangers</li>
                      <li>• Secure the work area and isolate hazards</li>
                      <li>• Prevent access by unauthorised personnel</li>
                      <li>• Use appropriate warning signs or barriers</li>
                      <li>• Ensure personal and public safety first</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <p className="font-medium text-blue-400">Document Everything</p>
                    </div>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Record exact location and time</li>
                      <li>• Note what was discovered or occurred</li>
                      <li>• Document immediate actions taken</li>
                      <li>• Take photographs if safe to do so</li>
                      <li>• Preserve evidence for investigation</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <p className="font-medium text-green-400">Contact Supervisor</p>
                    </div>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Contact direct supervisor first</li>
                      <li>• Provide clear, factual information</li>
                      <li>• Explain situation without speculation</li>
                      <li>• Confirm they understand the issue</li>
                      <li>• Request specific guidance needed</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <p className="font-medium text-orange-400">Await Instructions</p>
                    </div>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Do not proceed without clear approval</li>
                      <li>• Maintain security of work area</li>
                      <li>• Be available for additional questions</li>
                      <li>• Assist qualified personnel as directed</li>
                      <li>• Follow up if response is delayed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-2">Emergency Escalation Priority</p>
                <p className="text-sm text-white/70 mb-2">
                  For immediate life-threatening dangers (electrocution risk, fire, explosion, structural collapse):
                </p>
                <ol className="text-sm text-white/70 space-y-1 list-decimal pl-4">
                  <li>Call 999 emergency services immediately</li>
                  <li>Evacuate the danger area</li>
                  <li>Then contact your supervisor</li>
                  <li>Provide full support to emergency responders</li>
                </ol>
              </div>
            </div>
          </section>

          <InlineCheck
            id="escalate-check-4"
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Block 5: Professional Communication */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Professional Communication During Escalation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Clear, accurate communication is essential for effective escalation. How you communicate can significantly impact the response time and quality of assistance received.
              </p>

              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <p className="font-medium text-cyan-400 mb-3">SBAR Communication Method</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-1"><strong>S</strong>ituation:</p>
                    <p className="text-sm text-white/70 mb-2">"I am working on [location/task] and have discovered [issue]"</p>

                    <p className="text-sm font-medium text-white/90 mb-1"><strong>B</strong>ackground:</p>
                    <p className="text-sm text-white/70">"The work involves [description]. The problem occurred when [circumstances]"</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-1"><strong>A</strong>ssessment:</p>
                    <p className="text-sm text-white/70 mb-2">"I believe this is [safety/technical/regulatory] issue because [reasons]"</p>

                    <p className="text-sm font-medium text-white/90 mb-1"><strong>R</strong>ecommendation:</p>
                    <p className="text-sm text-white/70">"I recommend [immediate actions] and need guidance on [specific questions]"</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">Effective Communication</p>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Be clear, concise, and factual</li>
                    <li>• Use proper technical terminology</li>
                    <li>• Avoid speculation or assumptions</li>
                    <li>• Provide specific measurements or observations</li>
                    <li>• Confirm understanding before ending call</li>
                    <li>• Ask for estimated response time</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Communication Mistakes</p>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Being vague about location or problem</li>
                    <li>• Minimising or exaggerating the issue</li>
                    <li>• Offering unprofessional opinions</li>
                    <li>• Failing to mention safety implications</li>
                    <li>• Not confirming next steps clearly</li>
                    <li>• Hanging up without clear resolution</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="escalate-check-5"
            question={quickCheckQuestions[4].question}
            options={quickCheckQuestions[4].options}
            correctIndex={quickCheckQuestions[4].correctIndex}
            explanation={quickCheckQuestions[4].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Quick Reference Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Quick Reference Pocket Guide
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-3">STOP WORK IMMEDIATELY if you see:</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Live conductors exposed</li>
                  <li>• Burning smell or smoke</li>
                  <li>• Gas smell</li>
                  <li>• Water near electrical equipment</li>
                  <li>• Structural damage</li>
                  <li>• Unsafe working conditions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-3">ESCALATE if you encounter:</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Uncertainty about safety</li>
                  <li>• Work beyond your training</li>
                  <li>• Unfamiliar equipment</li>
                  <li>• Unexpected test results</li>
                  <li>• Customer requests outside scope</li>
                  <li>• Regulatory compliance issues</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <p className="font-medium text-blue-400">Emergency Contact Template</p>
              </div>
              <p className="text-sm text-white/70">
                <strong className="text-white">"This is [Your Name] calling about [Location]. I have discovered [Issue] and have [Actions Taken]. I need [Specific Help] urgently."</strong>
              </p>
              <p className="text-xs text-white/60 mt-2">Remember: Be calm, clear, and factual. Safety first, everything else second.</p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-medium text-white mb-3">Essential Professional Responsibilities:</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-green-400 mb-2">Safety Obligations</p>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Stop work immediately when safety is at risk</li>
                    <li>• Secure areas and prevent further danger</li>
                    <li>• Call emergency services for immediate threats</li>
                    <li>• Never compromise safety for time or cost pressures</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-400 mb-2">Professional Practice</p>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Recognise and work within your competence limits</li>
                    <li>• Follow systematic escalation procedures</li>
                    <li>• Document and communicate issues clearly</li>
                    <li>• Seek guidance when uncertain about any aspect</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/70">
                  <strong className="text-white">Core Safety and Professional Principle:</strong> It's always better to stop work and ask for guidance than to continue when unsure. Professional electricians take full responsibility for their decisions, prioritise safety above all else, and demonstrate competence through appropriate escalation when needed.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Escalation and Work Stoppage" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Previous: Interpreting Test Readings</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <span className="hidden sm:inline">Back to Section 4</span>
                <span className="sm:hidden">Complete</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section4_6;
