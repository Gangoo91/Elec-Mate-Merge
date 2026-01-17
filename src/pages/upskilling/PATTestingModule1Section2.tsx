import { ArrowLeft, Scale, Target, FileText, AlertTriangle, CheckCircle, Book, Gavel, ShieldCheck, FileSearch, PoundSterling, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';

interface QuizQuestionType {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestionType[] = [
  {
    id: 1,
    question: "What does EAWR stand for in UK electrical safety legislation?",
    options: [
      "Electrical Appliance Work Regulations",
      "Electricity at Work Regulations",
      "Electronic Apparatus Work Rules",
      "Electrical Application Work Requirements"
    ],
    correctAnswer: 1,
    explanation: "EAWR stands for Electricity at Work Regulations 1989, which place duties on employers to ensure electrical equipment is maintained and operated safely."
  },
  {
    id: 2,
    question: "Which law places the primary general duties on employers for workplace safety?",
    options: [
      "EAWR 1989",
      "PUWER 1998",
      "Health and Safety at Work Act 1974",
      "Management of Health and Safety Regulations 1999"
    ],
    correctAnswer: 2,
    explanation: "The Health and Safety at Work Act 1974 places general duties on employers to ensure the health, safety and welfare of employees and others affected by work activities."
  },
  {
    id: 3,
    question: "Is PAT testing specifically named as a legal requirement in UK legislation?",
    options: [
      "Yes, it's explicitly required by EAWR",
      "Yes, it's specifically named in PUWER",
      "No, but it supports compliance with EAWR and PUWER",
      "Only for certain high-risk industries"
    ],
    correctAnswer: 2,
    explanation: "PAT testing isn't specifically named in legislation, but it's widely recognised as an effective way to comply with EAWR and PUWER requirements for equipment safety."
  },
  {
    id: 4,
    question: "What can happen if faulty equipment causes injury and there's no evidence of proper maintenance?",
    options: [
      "Nothing, if it was genuinely accidental",
      "HSE investigation, prosecution, fines, and insurance claims may be denied",
      "Only a small administrative fine",
      "Just equipment replacement costs"
    ],
    correctAnswer: 1,
    explanation: "Serious consequences can include HSE investigation, prosecution with unlimited fines, insurance claim refusal, and personal liability for directors and managers."
  },
  {
    id: 5,
    question: "Which EAWR regulation specifically requires equipment to be maintained to prevent danger?",
    options: [
      "Regulation 3",
      "Regulation 4",
      "Regulation 5",
      "Regulation 16"
    ],
    correctAnswer: 2,
    explanation: "Regulation 5 of EAWR requires that electrical equipment is maintained in a condition to prevent danger, which PAT testing directly supports."
  },
  {
    id: 6,
    question: "What is a key benefit of maintaining detailed PAT testing records?",
    options: [
      "It reduces the frequency of future testing requirements",
      "Demonstrates due diligence and supports legal compliance",
      "It's only needed for insurance claim purposes",
      "Records aren't necessary if equipment passes all tests"
    ],
    correctAnswer: 1,
    explanation: "Detailed PAT testing records demonstrate due diligence, prove legal compliance, and provide essential evidence for regulatory inspections and potential legal proceedings."
  },
  {
    id: 7,
    question: "Under PUWER 1998, what is required regarding work equipment maintenance?",
    options: [
      "Equipment must be maintained only when it breaks down",
      "Equipment must be maintained in efficient working order and good repair",
      "Maintenance is only required for mechanical equipment",
      "PUWER doesn't cover electrical equipment"
    ],
    correctAnswer: 1,
    explanation: "PUWER Regulation 5 requires that work equipment is maintained in an efficient state, in efficient working order and in good repair - which electrical PAT testing supports."
  },
  {
    id: 8,
    question: "What enforcement powers does the HSE have under EAWR?",
    options: [
      "Only advisory notices and guidance",
      "Improvement notices, prohibition notices, and prosecution",
      "Just financial penalties up to £5,000",
      "Only powers to close businesses temporarily"
    ],
    correctAnswer: 1,
    explanation: "HSE has extensive powers including improvement notices, prohibition notices, prosecution in magistrates' or crown courts with unlimited fines, and potential imprisonment."
  },
  {
    id: 9,
    question: "How can PAT testing help with insurance requirements?",
    options: [
      "Insurance companies don't consider electrical safety",
      "It may reduce premiums and supports claim validity",
      "PAT testing automatically voids all insurance requirements",
      "Only affects building insurance, not liability coverage"
    ],
    correctAnswer: 1,
    explanation: "Many insurers offer premium discounts for proper PAT testing programmes and may refuse claims where negligent maintenance contributed to incidents."
  },
  {
    id: 10,
    question: "Who can be held personally liable for electrical safety breaches?",
    options: [
      "Only the company as a legal entity",
      "Directors, managers, and safety officers with responsibility",
      "Just the person who was using the faulty equipment",
      "Only if they personally caused the equipment damage"
    ],
    correctAnswer: 1,
    explanation: "Directors, managers, and those with safety responsibilities can face personal liability, prosecution, and potential imprisonment for safety breaches under their control."
  }
];

const PATTestingModule1Section2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(true); // Start quiz immediately

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(true); // Reset to show first question immediately
  };

  const renderQuiz = () => {
    if (!quizStarted) {
      return (
        <Card className="bg-card/80 border-transparent">
          <CardHeader>
            <CardTitle className="text-white">🧠 Knowledge Check Quiz - 10 Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white">
              Test your understanding of PAT testing legal requirements and compliance obligations with this comprehensive 10-question quiz.
            </p>
            <Button 
              onClick={() => setQuizStarted(true)}
              className="bg-yellow-400 text-black hover:bg-yellow-400"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (showResults) {
      return <QuizResults questions={quizData} selectedAnswers={selectedAnswers} onRestart={handleRestart} />;
    }

    const question = quizData[currentQuestion];

    return (
      <div className="space-y-6">
        <QuizProgress currentQuestion={currentQuestion} totalQuestions={quizData.length} />
        <QuizQuestion
          question={question}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={quizData.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === quizData.length - 1}
        />
      </div>
    );
  };

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a] space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/pat-testing-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Scale className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Legal Duties (EAWR, PUWER, H&S at Work Act)
                </h1>
                <p className="text-xl text-white">
                  Module 1, Section 2
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                35 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Introduction - The Legal Landscape
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="text-lg leading-relaxed">
                PAT testing isn't just good practice — it's underpinned by robust UK legislation designed to protect workers and the public from electrical hazards. 
                This comprehensive section examines the complex web of legal duties that businesses and individuals have regarding electrical equipment safety, 
                and demonstrates how PAT testing helps organisations demonstrate compliance with these critical obligations. Understanding this legal framework is 
                essential for anyone responsible for electrical safety in the workplace. We'll explore how different laws interact 
                to create comprehensive safety duties, examine the real consequences of non-compliance through case studies, and understand why courts 
                and regulators view PAT testing as evidence of due diligence. The legal landscape has evolved significantly since the 1989 EAWR, 
                with increasing emphasis on proactive risk management and systematic safety approaches.
              </p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <p className="mb-4">By the end of this section, you will be able to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Identify key legislation relevant to PAT testing obligations and understand their specific requirements and scope</li>
                <li>Understand comprehensive employer and employee duties under current health and safety law framework</li>
                <li>Recognise enforcement mechanisms, penalties, and real-world consequences of non-compliance with examples</li>
                <li>Learn why PAT testing supports legal compliance and demonstrates due diligence in court proceedings</li>
                <li>Explain the critical role of risk assessment in meeting legal compliance obligations effectively</li>
                <li>Understand the vital importance of documentation and comprehensive record keeping for legal protection</li>
                <li>Analyse detailed case studies showing legal consequences of electrical safety failures and negligence</li>
                <li>Evaluate insurance implications and liability protection through proper PAT testing programmes</li>
                <li>Understand personal liability exposure for directors, managers, and safety professionals</li>
                <li>Assess the interaction between criminal law, civil liability, and regulatory enforcement in electrical safety</li>
              </ul>
            </CardContent>
          </Card>

          {/* Key Legislation Overview */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Book className="h-5 w-5" />
                Key Legislation Overview - The Regulatory Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-lg">
                <h4 className="text-yellow-400 font-bold text-lg mb-2">The Integrated Legal Foundation</h4>
                <p>
                  While PAT testing isn't explicitly named in UK legislation, it's widely recognised by courts, regulators, and legal experts as an effective method 
                  of complying with several key pieces of health and safety law. These laws create interlocking duties 
                  that PAT testing helps fulfil comprehensively. The legislation creates a framework of overlapping responsibilities that 
                  collectively require systematic equipment safety management, making PAT testing not just advisable but practically essential 
                  for legal compliance in most workplace environments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel className="h-5 w-5 text-red-400" />
                    <h5 className="text-white font-semibold text-sm">Primary Legislation</h5>
                  </div>
                  <p className="text-red-400 font-medium">EAWR 1989</p>
                  <p className="text-xs text-white">Specific electrical equipment safety duties, maintenance requirements, and competency standards</p>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Supporting Regulation</h5>
                  </div>
                  <p className="text-yellow-400 font-medium">PUWER 1998</p>
                  <p className="text-xs text-white">Work equipment maintenance, inspection, and systematic management requirements</p>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel className="h-5 w-5 text-green-400" />
                    <h5 className="text-white font-semibold text-sm">Foundation Act</h5>
                  </div>
                  <p className="text-green-400 font-medium">HASAWA 1974</p>
                  <p className="text-xs text-white">General safety duties, risk management, and overall workplace safety responsibilities</p>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="text-purple-400 font-semibold mb-2">Additional Supporting Legislation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-white font-medium">Management of Health & Safety at Work Regulations 1999</p>
                    <p className="text-sm text-white">Risk assessment methodology, management systems, and competent person requirements</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Workplace (Health, Safety & Welfare) Regulations 1992</p>
                    <p className="text-sm text-white">General workplace safety standards and equipment maintenance</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Construction (Design and Management) Regulations 2015</p>
                    <p className="text-sm text-white">Construction-specific equipment safety and maintenance requirements</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Personal Protective Equipment at Work Regulations 1992</p>
                    <p className="text-sm text-white">Maintenance and inspection of electrical safety equipment</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/40 border border-gray-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Legal Hierarchy and Interaction:</h4>
                <p className="text-white text-sm">
                  The Health and Safety at Work Act 1974 provides the overarching framework of general duties, while EAWR 1989 and PUWER 1998 
                  provide specific technical requirements. This creates a comprehensive legal obligation that requires both general risk management 
                  approaches and specific technical compliance measures - exactly what a well-designed PAT testing programme delivers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* EAWR Detailed */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Electricity at Work Regulations 1989 (EAWR) - Detailed Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h5 className="text-red-400 font-semibold mb-3">Key EAWR Requirements and PAT Testing Links:</h5>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <strong className="text-white">Regulation 4 - Systems, Work Activities and Protective Equipment:</strong> All electrical systems must be constructed, maintained, and operated to prevent danger.
                      This includes regular inspection and testing to ensure continued safety throughout the equipment lifecycle.
                      <p className="text-gray-300 text-sm mt-1">
                        <em>PAT Connection:</em> Regular PAT testing directly fulfils this maintenance requirement by systematically checking equipment condition.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <strong className="text-white">Regulation 5 - Strength and Capability of Electrical Equipment:</strong> Equipment must be of such construction and maintained in such condition as to prevent danger.
                      This specifically requires ongoing maintenance and safety verification through appropriate testing methods.
                      <p className="text-gray-300 text-sm mt-1">
                        <em>PAT Connection:</em> PAT testing verifies both construction integrity and maintenance condition through visual and electrical testing.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">16</span>
                    </div>
                    <div>
                      <strong className="text-white">Regulation 16 - Persons to be Competent:</strong> No person shall be engaged in work activity where technical knowledge or experience is necessary to prevent danger unless they possess such knowledge.
                      This includes those conducting PAT testing and equipment maintenance.
                      <p className="text-gray-300 text-sm mt-1">
                        <em>PAT Connection:</em> Requires competent persons to conduct PAT testing, emphasising proper training and certification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">How PAT Testing Supports EAWR Compliance - Practical Application:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <h5 className="text-green-400 font-medium mb-2">Systematic Maintenance Approach</h5>
                    <p className="text-white text-sm">
                      PAT provides a structured, documented method to ensure all portable equipment is regularly inspected and maintained,
                      directly addressing Regulation 4 and 5 requirements for ongoing safety assurance. The systematic nature demonstrates 
                      proactive compliance rather than reactive maintenance.
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <h5 className="text-green-400 font-medium mb-2">Auditable Documentation</h5>
                    <p className="text-white text-sm">
                      Detailed PAT records provide legally robust evidence of compliance efforts, demonstrating to HSE inspectors, courts, and insurers
                      that due diligence has been exercised in equipment safety management. Records show both compliance intent and execution.
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <h5 className="text-green-400 font-medium mb-2">Competency Demonstration</h5>
                    <p className="text-white text-sm">
                      PAT testing by trained, competent persons satisfies Regulation 16 requirements. Certification records and ongoing training 
                      demonstrate that technical knowledge and experience requirements are being met systematically.
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <h5 className="text-green-400 font-medium mb-2">Preventive Risk Management</h5>
                    <p className="text-white text-sm">
                      Regular PAT testing identifies deteriorating equipment before failure, supporting the EAWR principle of preventing danger 
                      rather than responding to incidents. This proactive approach aligns with legal expectations of good practice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-lg">
                <h4 className="text-amber-400 font-semibold mb-2">EAWR Enforcement Powers and Consequences:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-medium mb-2">Immediate Actions:</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Improvement notices requiring specific action within set timeframes</li>
                      <li>• Prohibition notices stopping dangerous activities immediately</li>
                      <li>• Seizure and disposal of dangerous equipment</li>
                      <li>• Immediate closure of dangerous operations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Legal Proceedings:</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Prosecution in magistrates' or crown courts</li>
                      <li>• Unlimited fines in crown court proceedings</li>
                      <li>• Up to 2 years imprisonment for serious breaches</li>
                      <li>• Director disqualification for corporate failures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PUWER Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <FileSearch className="h-5 w-5" />
                Provision and Use of Work Equipment Regulations 1998 (PUWER) - Comprehensive Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-3">Key PUWER Requirements for Electrical Equipment:</h5>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-400 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <strong className="text-white">Regulation 5 - Maintenance:</strong> Equipment must be maintained in an efficient state, efficient working order, and good repair.
                      Regular PAT testing ensures equipment remains in good working order throughout its operational life.
                      <p className="text-gray-300 text-sm mt-1">
                        <em>Application:</em> Covers all work equipment including portable electrical appliances used in any work activity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-400 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <strong className="text-white">Regulation 6 - Inspection:</strong> Where maintenance logs are required, they must be kept up to date.
                      PAT records provide comprehensive maintenance documentation that satisfies this requirement.
                      <p className="text-gray-300 text-sm mt-1">
                        <em>Application:</em> Particularly important for equipment subject to deteriorating conditions or exceptional circumstances.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-yellow-400 font-medium mb-2">Equipment Coverage Scope</h5>
                  <p className="text-white text-sm">
                    PUWER applies comprehensively to all work equipment, including portable electrical appliances used in any work context. 
                    PAT testing directly supports compliance by ensuring equipment remains safe, functional, and properly maintained 
                    according to manufacturer specifications and safety standards.
                  </p>
                </div>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-yellow-400 font-medium mb-2">Maintenance Documentation</h5>
                  <p className="text-white text-sm">
                    The detailed documentation from PAT testing satisfies PUWER requirements for maintenance logs 
                    and provides legally robust evidence of systematic equipment management. Records demonstrate both maintenance 
                    activity and ongoing equipment suitability for use.
                  </p>
                </div>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-yellow-400 font-medium mb-2">Risk-Based Inspection</h5>
                  <p className="text-white text-sm">
                    PUWER emphasises risk-based inspection frequencies, which PAT testing programmes support through 
                    tailored testing intervals based on equipment type, usage patterns, and environmental conditions. 
                    This demonstrates intelligent compliance rather than arbitrary testing schedules.
                  </p>
                </div>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-yellow-400 font-medium mb-2">Competent Person Requirements</h5>
                  <p className="text-white text-sm">
                    PUWER requires competent persons to conduct inspections and maintenance. PAT testing by properly trained 
                    and certified technicians demonstrates compliance with this competency requirement and ensures 
                    technically sound maintenance decisions.
                  </p>
                </div>
              </div>

              <div className="bg-teal-900/20 border border-teal-500/30 p-4 rounded-lg">
                <h4 className="text-teal-400 font-semibold mb-2">PUWER and Equipment Life-Cycle Management:</h4>
                <p className="text-white text-sm">
                  PUWER takes a holistic view of equipment management from selection through disposal. PAT testing supports this by:
                  monitoring equipment condition throughout its life, informing replacement decisions based on deterioration patterns,
                  ensuring continued suitability for intended use, and providing evidence for insurance and warranty claims.
                  This life-cycle approach demonstrates sophisticated compliance with regulatory expectations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Health and Safety at Work Act */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Health and Safety at Work Act 1974 - Foundation Principles
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                <h5 className="text-green-400 font-semibold mb-2">Employer Duties Under Section 2:</h5>
                <p className="text-white text-sm mb-3">
                  "It shall be the duty of every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all his employees."
                </p>
                <div className="space-y-2">
                  <p className="text-white text-sm">• Provision and maintenance of safe systems of work</p>
                  <p className="text-white text-sm">• Safe use, handling, storage and transport of articles and substances</p>
                  <p className="text-white text-sm">• Provision of information, instruction, training and supervision</p>
                  <p className="text-white text-sm">• Maintenance of safe workplace and safe access/egress</p>
                  <p className="text-white text-sm">• Provision of safe working environment with adequate welfare facilities</p>
                </div>
              </div>

              <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
                <h5 className="text-orange-400 font-semibold mb-2">Section 3 - Duties to Non-Employees:</h5>
                <p className="text-white text-sm">
                  Employers must ensure that persons not in their employment who may be affected by work activities 
                  are not exposed to health and safety risks. This extends PAT testing obligations to contractors, 
                  visitors, and members of the public who might be affected by faulty electrical equipment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-purple-400 font-medium mb-2">"So Far As Is Reasonably Practicable"</h5>
                  <p className="text-white text-sm">
                    This key legal test balances risk against the cost, time, and effort of control measures. 
                    Given the relatively low cost and high effectiveness of PAT testing, courts generally consider 
                    it "reasonably practicable" for most organisations using portable electrical equipment.
                  </p>
                </div>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-purple-400 font-medium mb-2">Due Diligence Defence</h5>
                  <p className="text-white text-sm">
                    Comprehensive PAT testing programmes provide strong evidence of due diligence, demonstrating 
                    that reasonable steps were taken to prevent incidents. This can be crucial in defending 
                    against both criminal prosecution and civil liability claims.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consequences Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <PoundSterling className="h-5 w-5" />
                Consequences of Non-Compliance - Real-World Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                  <h5 className="text-red-400 font-semibold mb-2">Criminal Law Penalties:</h5>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Unlimited fines in Crown Court proceedings</li>
                    <li>• Up to £20,000 fine per offence in Magistrates' Court</li>
                    <li>• Imprisonment up to 2 years for serious breaches</li>
                    <li>• Director disqualification under Company Directors Act</li>
                    <li>• Personal liability for safety officers and managers</li>
                    <li>• Corporate manslaughter charges in fatal cases</li>
                  </ul>
                </div>
                
                <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
                  <h5 className="text-orange-400 font-semibold mb-2">Civil and Business Impact:</h5>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Insurance claims refused or reduced</li>
                    <li>• Business closure and prohibition orders</li>
                    <li>• Reputational damage and media exposure</li>
                    <li>• Civil compensation claims from victims</li>
                    <li>• Increased insurance premiums and excesses</li>
                    <li>• Loss of contracts and commercial opportunities</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/40 border border-gray-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-3">Detailed Case Study Examples:</h4>
                
                <div className="space-y-3">
                  <div className="bg-red-900/10 p-3 rounded border border-red-500/20">
                    <p className="text-red-400 font-medium text-sm">Case 1: Manufacturing Company (2019)</p>
                    <p className="text-white text-sm mb-2">
                      A manufacturing company was fined £120,000 after an employee was electrocuted by a faulty portable drill. 
                      HSE investigation revealed no PAT testing programme existed, and the equipment had not been inspected for over 4 years.
                    </p>
                    <p className="text-yellow-400 text-sm font-medium">
                      Court Outcome: The judge specifically noted that a proper PAT testing programme costing £2,000 annually would have identified the fault and prevented the fatality.
                    </p>
                  </div>

                  <div className="bg-orange-900/10 p-3 rounded border border-orange-500/20">
                    <p className="text-orange-400 font-medium text-sm">Case 2: Educational Institution (2020)</p>
                    <p className="text-white text-sm mb-2">
                      A college was prosecuted and fined £45,000 after a student received electric shock from a defective power tool in a workshop. 
                      The tool had been visually inspected but not electrically tested, missing an earth continuity fault.
                    </p>
                    <p className="text-yellow-400 text-sm font-medium">
                      Court Outcome: The court emphasised that visual inspection alone was insufficient, and proper PAT testing would have identified the electrical fault.
                    </p>
                  </div>

                  <div className="bg-blue-900/10 p-3 rounded border border-yellow-400/30">
                    <p className="text-yellow-400 font-medium text-sm">Case 3: Facilities Management (2021)</p>
                    <p className="text-white text-sm mb-2">
                      A cleaning company faced both HSE prosecution (£35,000 fine) and a civil claim (£200,000 settlement) after an employee 
                      was injured by a faulty vacuum cleaner that caused an electrical fire.
                    </p>
                    <p className="text-yellow-400 text-sm font-medium">
                      Insurance Impact: The insurer initially refused the claim, arguing that lack of PAT testing constituted negligence, leading to costly legal disputes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="text-purple-400 font-semibold mb-2">Personal Liability and Director Responsibilities:</h4>
                <div className="space-y-2">
                  <p className="text-white text-sm">• Directors can face personal prosecution under Section 37 of HASAWA for safety failures</p>
                  <p className="text-white text-sm">• "Consent, connivance, or neglect" test applies to personal liability determinations</p>
                  <p className="text-white text-sm">• Safety managers and competent persons can face individual prosecution</p>
                  <p className="text-white text-sm">• Personal assets at risk in serious cases, not protected by corporate structures</p>
                  <p className="text-white text-sm">• Director disqualification can prevent future business involvement</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance and Commercial Impact */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Insurance and Commercial Implications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                  <h5 className="text-green-400 font-semibold mb-2">Insurance Benefits of PAT Testing:</h5>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Premium discounts up to 15% for comprehensive programmes</li>
                    <li>• Improved claims handling and faster settlements</li>
                    <li>• Enhanced coverage terms and higher limits available</li>
                    <li>• Reduced policy excesses for electrical claims</li>
                    <li>• Better renewal terms and competitive pricing</li>
                  </ul>
                </div>
                
                <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                  <h5 className="text-red-400 font-semibold mb-2">Risks of Non-Compliance:</h5>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Claims rejection for negligent maintenance</li>
                    <li>• Increased premiums and restricted coverage</li>
                    <li>• Higher policy excesses and deductibles</li>
                    <li>• Exclusions for electrical equipment failures</li>
                    <li>• Difficulty obtaining comprehensive coverage</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Commercial and Contractual Requirements:</h4>
                <p className="text-white text-sm mb-3">
                  Many commercial contracts now require evidence of PAT testing compliance:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-white font-medium mb-1">Client Requirements:</p>
                    <ul className="space-y-1 text-xs text-white">
                      <li>• Government contracts mandate PAT compliance</li>
                      <li>• Major corporations require contractor PAT certification</li>
                      <li>• Healthcare facilities have strict electrical safety requirements</li>
                      <li>• Educational institutions require evidence of testing programmes</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Supply Chain Impact:</p>
                    <ul className="space-y-1 text-xs text-white">
                      <li>• Tender submissions require PAT testing evidence</li>
                      <li>• Insurance certificates must reference electrical safety</li>
                      <li>• Audit requirements include PAT documentation</li>
                      <li>• Quality accreditation schemes include electrical safety</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400">
                Test Your Knowledge - 10 Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-6">
                Complete this comprehensive quiz to test your understanding of the legal and regulatory framework for PAT testing. The quiz covers EAWR, PUWER, HASAWA, enforcement mechanisms, and real-world compliance implications.
              </p>
              {renderQuiz()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/pat-testing-module-1-section-1">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: What is PAT Testing
              </Button>
            </Link>
            
            <Link to="/study-centre/upskilling/pat-testing-module-1-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next: Equipment Classification
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule1Section2;