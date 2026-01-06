import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, StopCircle, Shield, FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-2 sm:p-0 min-h-[44px] sm:min-h-auto" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <StopCircle className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 7.4.6
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Knowing when to escalate or stop work
          </h1>
          <p className="text-white text-sm sm:text-base">
            Learn when to escalate issues or stop work for safety and professional reasons in electrical installations.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Introduction</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-sm sm:text-base">Spot it in 30 Seconds</p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm">
                <li>Immediate safety hazards requiring work stoppage</li>
                <li>Tasks beyond your competence level</li>
                <li>Technical problems needing expert guidance</li>
                <li>Equipment failures or unexpected results</li>
                <li>Regulatory compliance issues</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Safety risks, competence limits, technical issues</li>
                <li><strong>Use:</strong> Clear escalation procedures, proper documentation</li>
                <li><strong>Check:</strong> Supervisor guidance before proceeding with work</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Knowing when to escalate problems or stop work is essential for maintaining safety, quality, and professionalism in electrical work. This critical skill protects lives, prevents damage, and maintains industry standards whilst demonstrating professional competence.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-elec-yellow dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Critical Safety Principle</p>
                <p className="text-xs sm:text-sm text-white">
                  Proper escalation and work stoppage decisions prevent 90% of serious electrical accidents and maintain professional standards throughout the industry.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-white">
              <strong>Industry Impact:</strong> Research shows that knowing when to stop work and seek guidance reduces workplace accidents by 75% and builds strong professional reputation through responsible practice.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs sm:text-sm text-white">
                <strong>Regulatory Requirement:</strong> CDM Regulations 2015 and BS7671 require workers to stop work immediately when safety risks are identified and escalate appropriately to qualified personnel.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Recognise situations requiring immediate escalation or work stoppage</li>
            <li>Understand the legal and professional importance of working within competence limits</li>
            <li>Apply systematic escalation procedures and comprehensive documentation</li>
            <li>Maintain safety and secure work areas while awaiting qualified assistance</li>
            <li>Communicate effectively with supervisors, qualified personnel, and customers</li>
            <li>Demonstrate professional responsibility in challenging situations</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Recognising Limits */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Understanding Competence and Professional Limits</h3>
            <p className="text-base text-white mb-4">
              Understanding your competence boundaries is fundamental to safe and professional electrical work. Competence is not just about technical ability—it encompasses knowledge, skills, and experience combined with professional judgement.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">The Competence Framework</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                        <div className="p-3 bg-emerald-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                          <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Knowledge</p>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Understanding electrical theory</li>
                            <li>BS7671 regulations knowledge</li>
                            <li>Safety requirements and procedures</li>
                            <li>Industry best practices</li>
                            <li>Risk awareness and management</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                          <p className="font-medium text-green-700 dark:text-green-400 mb-2">Skills</p>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Practical technical abilities</li>
                            <li>Safe tool and equipment use</li>
                            <li>Testing and measurement techniques</li>
                            <li>Installation and fault-finding</li>
                            <li>Problem-solving capabilities</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                          <p className="font-medium text-purple-700 dark:text-elec-yellow mb-2">Experience</p>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Hands-on practical application</li>
                            <li>Learning from real situations</li>
                            <li>Building professional confidence</li>
                            <li>Developing sound judgement</li>
                            <li>Understanding consequences</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                        <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Beyond Competence Indicators</p>
                        <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                          <li>Feeling uncertain about procedures or safety implications</li>
                          <li>Lacking specific training for the task at hand</li>
                          <li>Working with unfamiliar equipment or complex systems</li>
                          <li>Encountering non-standard or unusual installations</li>
                          <li>Being asked to make design decisions or circuit modifications</li>
                          <li>Dealing with situations not covered in your training</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* When to Stop Work */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Immediate Work Stoppage Situations</h3>
            <p className="text-base text-white mb-4">
              Certain situations require immediate work stoppage to prevent injury, death, or significant damage. Recognising these situations and acting decisively is crucial for electrical safety.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Critical Stop Situations</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-white mb-2"><strong>Electrical Safety Hazards:</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Live conductors exposed or damaged</li>
                            <li>Unexpected live circuits during testing</li>
                            <li>Inadequate or missing earthing connections</li>
                            <li>Equipment showing signs of overheating or burning</li>
                            <li>Insulation failure or breakdown</li>
                            <li>Arc flash or electrical fire risk</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-base text-white mb-2"><strong>Environmental Hazards:</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Suspected gas leaks in vicinity</li>
                            <li>Structural damage affecting safety</li>
                            <li>Water ingress creating electrocution risk</li>
                            <li>Presence of hazardous materials (asbestos)</li>
                            <li>Unstable working platforms or access</li>
                            <li>Extreme weather affecting safety</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Emergency Action Sequence</p>
                        <ol className="text-xs sm:text-sm text-white list-decimal ml-4 space-y-1">
                          <li>Stop all work immediately - do not complete current task</li>
                          <li>Secure the area and isolate the hazard if safely possible</li>
                          <li>Evacuate unnecessary personnel from the danger zone</li>
                          <li>Call emergency services (999) if immediate danger exists</li>
                          <li>Contact supervisor while maintaining area security</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Escalation Triggers */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Comprehensive Escalation Triggers</h3>
            <p className="text-base text-white mb-4">
              Beyond immediate safety issues, many situations require escalation to qualified personnel for guidance, technical expertise, or regulatory compliance.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">When to Escalate</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
                          <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Technical Issues</p>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Unexpected test results requiring interpretation</li>
                            <li>Circuit modifications or design changes needed</li>
                            <li>Non-standard installations requiring specialist knowledge</li>
                            <li>Complex fault diagnosis beyond training level</li>
                            <li>Equipment selection requiring technical calculations</li>
                            <li>Installation methods not covered in training</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-emerald-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                          <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Regulatory Compliance</p>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Work requiring specialist certifications</li>
                            <li>Building Control notification requirements</li>
                            <li>DNO (Distribution Network Operator) liaison needed</li>
                            <li>Special locations requiring additional expertise</li>
                            <li>Non-compliance with BS7671 discovered</li>
                            <li>Planning permission or consent issues</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                          <p className="font-medium text-green-700 dark:text-green-400 mb-2">Customer Relations</p>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Customer requesting work beyond your authority</li>
                            <li>Disputes about work scope or methods</li>
                            <li>Additional costs or time requirements</li>
                            <li>Access issues or scheduling conflicts</li>
                            <li>Customer safety concerns or complaints</li>
                            <li>Changes to original work specification</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                          <p className="font-medium text-purple-700 dark:text-elec-yellow mb-2">Professional Uncertainty</p>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Feeling unsure about safety implications</li>
                            <li>Lacking confidence in procedure execution</li>
                            <li>Encountering unfamiliar equipment or systems</li>
                            <li>Working in challenging or unusual environments</li>
                            <li>Time pressures affecting quality or safety</li>
                            <li>Any situation where you feel out of your depth</li>
                          </ul>
                        </div>
                      </div>
                    </div>
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
          <Separator className="my-6" />

          {/* Proper Escalation Procedures */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Systematic Escalation Procedures</h3>
            <p className="text-base text-white mb-4">
              Following proper escalation procedures ensures effective communication, maintains safety, and demonstrates professionalism. Each step builds upon the previous to provide comprehensive information and support.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3">Step-by-Step Escalation Process</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-card rounded border border-purple-200 dark:border-purple-700">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            <p className="font-medium text-white">Immediate Safety Actions</p>
                          </div>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Stop work and assess immediate dangers</li>
                            <li>Secure the work area and isolate hazards</li>
                            <li>Prevent access by unauthorised personnel</li>
                            <li>Use appropriate warning signs or barriers</li>
                            <li>Ensure personal and public safety first</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-card rounded border border-blue-200 dark:border-blue-700">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                            <p className="font-medium text-white">Document Everything</p>
                          </div>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Record exact location and time</li>
                            <li>Note what was discovered or occurred</li>
                            <li>Document immediate actions taken</li>
                            <li>Take photographs if safe to do so</li>
                            <li>Preserve evidence for investigation</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-card rounded border border-green-200 dark:border-green-700">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                            <p className="font-medium text-white">Contact Supervisor</p>
                          </div>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Contact direct supervisor first</li>
                            <li>Provide clear, factual information</li>
                            <li>Explain situation without speculation</li>
                            <li>Confirm they understand the issue</li>
                            <li>Request specific guidance needed</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-card rounded border border-amber-200 dark:border-amber-700">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                            <p className="font-medium text-white">Await Instructions</p>
                          </div>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Do not proceed without clear approval</li>
                            <li>Maintain security of work area</li>
                            <li>Be available for additional questions</li>
                            <li>Assist qualified personnel as directed</li>
                            <li>Follow up if response is delayed</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Emergency Escalation Priority</p>
                        <p className="text-xs sm:text-sm text-white mb-2">
                          For immediate life-threatening dangers (electrocution risk, fire, explosion, structural collapse):
                        </p>
                        <ol className="text-xs sm:text-sm text-white list-decimal ml-4 space-y-1">
                          <li>Call 999 emergency services immediately</li>
                          <li>Evacuate the danger area</li>
                          <li>Then contact your supervisor</li>
                          <li>Provide full support to emergency responders</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Effective Communication */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Professional Communication During Escalation</h3>
            <p className="text-base text-white mb-4">
              Clear, accurate communication is essential for effective escalation. How you communicate can significantly impact the response time and quality of assistance received.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-cyan-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-cyan-600 dark:text-cyan-400 mb-3">Communication Framework</p>
                    
                    <div className="space-y-4">
                      <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded border border-cyan-200 dark:border-cyan-800">
                        <p className="font-medium text-cyan-700 dark:text-cyan-400 mb-2">SBAR Communication Method</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-white mb-1"><strong>S</strong>ituation:</p>
                            <p className="text-xs sm:text-sm text-white mb-2">"I am working on [location/task] and have discovered [issue]"</p>
                            
                            <p className="text-sm font-medium text-white mb-1"><strong>B</strong>ackground:</p>
                            <p className="text-xs sm:text-sm text-white">"The work involves [description]. The problem occurred when [circumstances]"</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white mb-1"><strong>A</strong>ssessment:</p>
                            <p className="text-xs sm:text-sm text-white mb-2">"I believe this is [safety/technical/regulatory] issue because [reasons]"</p>
                            
                            <p className="text-sm font-medium text-white mb-1"><strong>R</strong>ecommendation:</p>
                            <p className="text-xs sm:text-sm text-white">"I recommend [immediate actions] and need guidance on [specific questions]"</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                          <p className="font-medium text-green-700 dark:text-green-400 mb-2">Effective Communication</p>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Be clear, concise, and factual</li>
                            <li>Use proper technical terminology</li>
                            <li>Avoid speculation or assumptions</li>
                            <li>Provide specific measurements or observations</li>
                            <li>Confirm understanding before ending call</li>
                            <li>Ask for estimated response time</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                          <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Communication Mistakes</p>
                          <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Being vague about location or problem</li>
                            <li>Minimising or exaggerating the issue</li>
                            <li>Offering unprofessional opinions</li>
                            <li>Failing to mention safety implications</li>
                            <li>Not confirming next steps clearly</li>
                            <li>Hanging up without clear resolution</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Clipboard className="w-5 h-5 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Practical Guidance</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white mb-3">For Apprentices and Developing Electricians:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                  <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Professional Development</p>
                  <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                    <li>Know your competence limits and respect them</li>
                    <li>Build relationships with supervisors for effective communication</li>
                    <li>Learn from each escalation situation</li>
                    <li>Ask questions to expand your knowledge</li>
                    <li>Document lessons learned for future reference</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                  <p className="font-medium text-green-700 dark:text-green-400 mb-2">Building Confidence</p>
                  <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                    <li>Never feel pressured to work beyond your qualifications</li>
                    <li>Remember that escalation shows professional maturity</li>
                    <li>Use each situation as a learning opportunity</li>
                    <li>Seek feedback on your escalation decisions</li>
                    <li>Gradually build expertise through supervised practice</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-medium text-amber-700 dark:text-amber-400">Essential Documentation Checklist</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Situation Details:</p>
                  <ul className="text-xs text-white list-disc ml-4 space-y-1">
                    <li>Exact location and time</li>
                    <li>Work being performed</li>
                    <li>What was discovered</li>
                    <li>Environmental conditions</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Safety Actions:</p>
                  <ul className="text-xs text-white list-disc ml-4 space-y-1">
                    <li>Area secured how</li>
                    <li>People evacuated/warned</li>
                    <li>Equipment isolated</li>
                    <li>Barriers or signs used</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Technical Information:</p>
                  <ul className="text-xs text-white list-disc ml-4 space-y-1">
                    <li>Test results if applicable</li>
                    <li>Equipment involved</li>
                    <li>Symptoms observed</li>
                    <li>Photographs taken</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-5 h-5 text-red-600 dark:text-elec-yellow" />
                <h3 className="font-medium text-red-700 dark:text-elec-yellow">Emergency Contact Hierarchy</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Normal Escalation Order:</p>
                  <ol className="text-xs sm:text-sm text-white list-decimal ml-4 space-y-1">
                    <li>Direct supervisor or site manager</li>
                    <li>Qualified electrician or engineer</li>
                    <li>Site safety officer (for safety issues)</li>
                    <li>Customer representative (as appropriate)</li>
                    <li>Company management (for serious issues)</li>
                  </ol>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Emergency Situations:</p>
                  <ol className="text-xs sm:text-sm text-white list-decimal ml-4 space-y-1">
                    <li><strong>999 Emergency Services</strong> (immediate danger)</li>
                    <li>Site safety officer or first aider</li>
                    <li>Your supervisor (while emergency response continues)</li>
                    <li>Customer (to inform of situation)</li>
                    <li>Company emergency contact</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Frequently Asked Questions */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Reference Pocket Guide</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
              <h3 className="font-medium text-red-700 dark:text-elec-yellow mb-3">STOP WORK IMMEDIATELY if you see:</h3>
              <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                <li>⚡ Live conductors exposed</li>
                <li>🔥 Burning smell or smoke</li>
                <li>💨 Gas smell</li>
                <li>💧 Water near electrical equipment</li>
                <li>⚠️ Structural damage</li>
                <li>🏗️ Unsafe working conditions</li>
              </ul>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-amber-700 dark:text-amber-400 mb-3">ESCALATE if you encounter:</h3>
              <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                <li>🤔 Uncertainty about safety</li>
                <li>📋 Work beyond your training</li>
                <li>🔧 Unfamiliar equipment</li>
                <li>📊 Unexpected test results</li>
                <li>👥 Customer requests outside scope</li>
                <li>📜 Regulatory compliance issues</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
            <h3 className="font-medium text-blue-700 dark:text-elec-yellow mb-3">Emergency Contact Template:</h3>
            <div className="text-xs sm:text-sm text-white">
              <p className="mb-2"><strong>"This is [Your Name] calling about [Location]. I have discovered [Issue] and have [Actions Taken]. I need [Specific Help] urgently."</strong></p>
              <p className="text-xs">Remember: Be calm, clear, and factual. Safety first, everything else second.</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Recap</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-white mb-3">Essential Professional Responsibilities:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                  <p className="font-medium text-green-700 dark:text-green-400 mb-2">Safety Obligations</p>
                  <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                    <li>Stop work immediately when safety is at risk</li>
                    <li>Secure areas and prevent further danger</li>
                    <li>Call emergency services for immediate threats</li>
                    <li>Never compromise safety for time or cost pressures</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-emerald-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                  <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Professional Practice</p>
                  <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                    <li>Recognise and work within your competence limits</li>
                    <li>Follow systematic escalation procedures</li>
                    <li>Document and communicate issues clearly</li>
                    <li>Seek guidance when uncertain about any aspect</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="font-medium text-white mb-2">Core Safety and Professional Principle:</p>
              <p className="text-white text-base">
                It's always better to stop work and ask for guidance than to continue when unsure. Professional electricians take full responsibility for their decisions, prioritise safety above all else, and demonstrate competence through appropriate escalation when needed.
              </p>
              <p className="text-sm text-white mt-2">
                This approach protects lives, maintains quality standards, and builds lasting professional reputation in the electrical industry.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-8">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../4-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Previous: Interpreting Test Readings</span>
              <span className="sm:hidden">Previous: Test Readings</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="..">
              <span className="hidden sm:inline">Next: Section 5</span>
              <span className="sm:hidden">Next Section</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section4_6;