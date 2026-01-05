
import { ArrowLeft, Flag, CheckCircle, AlertTriangle, FileText, Shield, BookOpen, Target, Briefcase, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

const Module1Section7 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the primary role of BS 7671 in electrical inspection and testing?",
      options: [
        "It's legally binding legislation that must be followed",
        "It provides technical standards and guidance for compliance",
        "It's optional guidance that can be ignored",
        "It only applies to commercial installations"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 is the British Standard for electrical installations, commonly known as the 'Wiring Regulations'. While not legally binding itself, it provides the technical standards that are referenced in the Electricity at Work Regulations 1989, making compliance essential for legal compliance and safety.",
      topic: "Legal Framework"
    },
    {
      id: 2,
      question: "What must always be completed before any electrical testing begins?",
      options: [
        "Functional testing of all circuits",
        "A comprehensive visual inspection",
        "Insulation resistance testing",
        "Earth fault loop impedance testing"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection must always precede any electrical testing. This allows you to identify obvious defects, dangerous conditions, or installation faults before energising circuits. It's safer and more efficient to spot problems visually before applying test voltages.",
      topic: "Testing Sequence"
    },
    {
      id: 3,
      question: "Who can legally sign an electrical installation certificate?",
      options: [
        "Any qualified electrician",
        "The site manager or supervisor",
        "Only the person who carried out or verified the work and testing",
        "Anyone employed by the electrical contractor"
      ],
      correctAnswer: 2,
      explanation: "Only the competent person who has either personally carried out the work and testing, or has thoroughly verified another person's work, can sign the certificate. This person takes full legal responsibility for the accuracy of the certificate and the safety of the installation.",
      topic: "Responsibility & Competency"
    },
    {
      id: 4,
      question: "Which document is NOT a valid electrical test certificate?",
      options: [
        "Electrical Installation Certificate (EIC)",
        "Electrical Installation Condition Report (EICR)",
        "Minor Electrical Installation Works Certificate (MEIWC)",
        "Electrical Equipment Purchase Receipt"
      ],
      correctAnswer: 3,
      explanation: "A purchase receipt is a commercial document showing that equipment was bought, but it has no legal standing as proof of electrical safety testing or compliance. Only properly completed EIC, EICR, and MEIWC certificates serve as legal documentation of electrical inspection and testing.",
      topic: "Test Documentation"
    },
    {
      id: 5,
      question: "What should you focus on after completing Module 1?",
      options: [
        "Immediately start conducting electrical tests",
        "Learn about safety procedures, tools, and site preparation",
        "Skip ahead to advanced testing techniques",
        "Begin completing electrical certificates"
      ],
      correctAnswer: 1,
      explanation: "Module 1 provides the foundation knowledge, but before conducting any tests, you must understand safety procedures, learn to use testing equipment properly, and know how to prepare sites safely. Rushing into testing without proper preparation is dangerous and unprofessional.",
      topic: "Learning Progression"
    },
    {
      id: 6,
      question: "Which regulation requires that only competent persons work on electrical systems?",
      options: [
        "Regulation 4 of EAWR 1989",
        "Regulation 16 of EAWR 1989",
        "Section 2 of HASWA 1974",
        "Building Regulations Part P"
      ],
      correctAnswer: 1,
      explanation: "Regulation 16 of the Electricity at Work Regulations 1989 specifically requires that work requiring technical knowledge or experience should only be done by competent persons or under appropriate supervision.",
      topic: "Legal Framework"
    },
    {
      id: 7,
      question: "What is the maximum recommended interval for periodic inspection of domestic installations?",
      options: [
        "5 years",
        "10 years",
        "15 years",
        "When problems are noticed"
      ],
      correctAnswer: 1,
      explanation: "The maximum recommended interval for periodic inspection of domestic installations is 10 years under normal conditions, though this may be reduced based on environmental factors or installation conditions.",
      topic: "Inspection Requirements"
    },
    {
      id: 8,
      question: "Which test measures the total impedance from source to fault and back through the earth path?",
      options: [
        "Continuity test",
        "Insulation resistance test",
        "Earth fault loop impedance (Zs)",
        "Polarity test"
      ],
      correctAnswer: 2,
      explanation: "Earth fault loop impedance (Zs) measures the total impedance from the source, through the fault path, and back through the earth connection. This ensures protective devices will operate quickly enough in fault conditions.",
      topic: "Testing Types"
    },
    {
      id: 9,
      question: "What observation code in an EICR indicates immediate danger?",
      options: [
        "C3 - Improvement recommended",
        "C2 - Potentially dangerous",
        "C1 - Danger present",
        "FI - Further investigation"
      ],
      correctAnswer: 2,
      explanation: "C1 indicates 'Danger Present' - immediate action is required as there is a risk of injury. The installation should not remain in service until the danger is removed.",
      topic: "Test Documentation"
    },
    {
      id: 10,
      question: "What are the four essential elements of competency?",
      options: [
        "Experience, qualifications, insurance, tools",
        "Skills, knowledge, experience, understanding",
        "Training, certification, supervision, testing",
        "Qualifications, membership, experience, references"
      ],
      correctAnswer: 1,
      explanation: "Competency requires four essential elements working together: Skills (practical ability), Knowledge (understanding of principles), Experience (real-world application), and Understanding (ability to interpret and make decisions).",
      topic: "Responsibility & Competency"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizComplete) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
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
    setQuizComplete(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "Excellent! You have a strong understanding of inspection and testing fundamentals.";
    if (percentage >= 60) return "Good work! You have a solid grasp of the basics with room for improvement.";
    if (percentage >= 40) return "Fair effort. Consider reviewing the material to strengthen your understanding.";
    return "You may need to review the content more thoroughly before proceeding.";
  };

  const currentQ = quizQuestions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const score = calculateScore();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-1">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Flag className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 1 - Section 7
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Summary & Key Takeaways
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Consolidation of essential knowledge and fundamental principles for inspection and testing
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Quick Intro Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Quick Intro
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                This section ties together everything covered so far in Module 1. It's your go-to recap before moving into hands-on test procedures in later modules. We'll consolidate the essential knowledge, review real-world applications, and prepare you for the next phase of your learning journey.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed mb-4">
                By the end of this section, you'll be able to:
              </p>
              <ul className="space-y-2 text-base">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Summarise the core principles of inspection and testing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Recall when, why, and how testing must be carried out
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Understand your responsibilities as a competent person
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Main Content Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Main Content
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              {/* What You've Covered */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">What You've Covered in Module 1:</h4>
                <ul className="space-y-2 text-base">
                  <li>• What inspection and testing is and why it's crucial for safety and compliance</li>
                  <li>• The legal framework, including EAWR 1989 and BS7671</li>
                  <li>• When testing is required, including initial, periodic, and after alterations</li>
                  <li>• The types of tests you'll perform (visual, continuity, insulation, etc.)</li>
                  <li>• Who is responsible and what competency means</li>
                  <li>• The main documents used to record inspection and testing results</li>
                  <li>• Essential terminology and industry standards</li>
                  <li>• Professional responsibilities and legal obligations</li>
                </ul>
              </div>

              {/* Core Principles */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Core Principles to Remember:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/20">
                    <h5 className="text-blue-300 font-medium mb-2">Testing Methodology</h5>
                    <p className="text-sm text-white">Testing must be planned, methodical, and properly sequenced</p>
                  </div>
                  <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/20">
                    <h5 className="text-green-300 font-medium mb-2">Competency</h5>
                    <p className="text-sm text-white">Only competent persons should carry out or sign off inspection and testing</p>
                  </div>
                  <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/20">
                    <h5 className="text-orange-300 font-medium mb-2">Documentation</h5>
                    <p className="text-sm text-white">If it's not documented, it didn't happen</p>
                  </div>
                  <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/20">
                    <h5 className="text-red-300 font-medium mb-2">Safety First</h5>
                    <p className="text-sm text-white">Safety always comes before speed</p>
                  </div>
                </div>
              </div>

              {/* Detailed Section Review */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Detailed Section Review:</h4>
                <div className="space-y-4">
                  <div className="bg-card/50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <h5 className="text-yellow-400 font-semibold mb-2">Section 1: Introduction to Inspection & Testing</h5>
                    <p className="text-sm text-white mb-2">Foundation concepts including why we test, legal obligations, and the role of standards.</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Safety protection for people and property</li>
                      <li>• Legal compliance with EAWR 1989</li>
                      <li>• BS 7671 as the technical standard</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <h5 className="text-yellow-400 font-semibold mb-2">Section 2: When Testing is Required</h5>
                    <p className="text-sm text-white mb-2">Specific circumstances requiring inspection and testing.</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Initial verification of new installations</li>
                      <li>• Periodic inspection intervals</li>
                      <li>• After alterations or additions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/50 p-4 rounded-lg border-l-4 border-green-400">
                    <h5 className="text-green-400 font-semibold mb-2">Sections 3-4: Testing Methods & Types</h5>
                    <p className="text-sm text-white mb-2">Overview of inspection techniques and electrical tests.</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Visual inspection always comes first</li>
                      <li>• Dead tests before live tests</li>
                      <li>• Functional testing confirms operation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/50 p-4 rounded-lg border-l-4 border-purple-400">
                    <h5 className="text-purple-400 font-semibold mb-2">Section 5: Competency & Responsibility</h5>
                    <p className="text-sm text-white mb-2">Professional requirements and legal responsibilities.</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Skills, knowledge, experience, and understanding</li>
                      <li>• Personal liability when signing certificates</li>
                      <li>• Ongoing professional development</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/50 p-4 rounded-lg border-l-4 border-orange-400">
                    <h5 className="text-orange-400 font-semibold mb-2">Section 6: Documentation</h5>
                    <p className="text-sm text-white mb-2">Essential certificates and record-keeping requirements.</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• EIC for new installations</li>
                      <li>• MEIWC for minor works</li>
                      <li>• EICR for periodic inspection</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Industry Context */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Real-World Industry Context:</h4>
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-lg border border-yellow-400/30">
                  <h5 className="text-blue-300 font-semibold mb-3">Common Industry Scenarios</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h6 className="text-white font-medium">Domestic Installations</h6>
                      <p className="text-sm text-gray-300">House rewires, consumer unit changes, additional circuits for extensions or outbuildings.</p>
                    </div>
                    <div className="space-y-2">
                      <h6 className="text-white font-medium">Commercial Properties</h6>
                      <p className="text-sm text-gray-300">Office fit-outs, shop refurbishments, factory installations with three-phase supplies.</p>
                    </div>
                    <div className="space-y-2">
                      <h6 className="text-white font-medium">Periodic Inspections</h6>
                      <p className="text-sm text-gray-300">Landlord safety checks, insurance requirements, corporate compliance programmes.</p>
                    </div>
                    <div className="space-y-2">
                      <h6 className="text-white font-medium">Emergency Situations</h6>
                      <p className="text-sm text-gray-300">Post-fault investigations, safety assessments after incidents, urgent compliance checks.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Development Path */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Professional Development Pathway:</h4>
                <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-lg border border-green-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-green-300 font-bold">1</span>
                      </div>
                      <h6 className="text-green-300 font-semibold">Foundation Knowledge</h6>
                      <p className="text-xs text-gray-300">Module 1 - Theory and legal framework</p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-blue-300 font-bold">2</span>
                      </div>
                      <h6 className="text-blue-300 font-semibold">Practical Skills</h6>
                      <p className="text-xs text-gray-300">Modules 2-4 - Hands-on testing</p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-purple-300 font-bold">3</span>
                      </div>
                      <h6 className="text-purple-300 font-semibold">Professional Practice</h6>
                      <p className="text-xs text-gray-300">Real-world application and CPD</p>
                    </div>
                  </div>
                </div>
              </div>

               {/* Looking Ahead */}
               <div className="space-y-4">
                 <h4 className="text-white font-semibold text-lg">Preparation for Module 2:</h4>
                 <div className="bg-card/50 p-4 rounded-lg">
                   <p className="text-base text-white mb-3">
                     Next, we move from theory to practice. Module 2 covers essential safety procedures, test equipment familiarisation, and site preparation techniques.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <h6 className="text-yellow-400 font-medium">You'll Need to Understand:</h6>
                       <ul className="text-sm text-gray-300 space-y-1">
                         <li>• Safe isolation procedures</li>
                         <li>• Test equipment operation</li>
                         <li>• Site risk assessment</li>
                         <li>• Personal protective equipment</li>
                       </ul>
                     </div>
                     <div className="space-y-2">
                       <h6 className="text-yellow-400 font-medium">Skills You'll Develop:</h6>
                       <ul className="text-sm text-gray-300 space-y-1">
                         <li>• Equipment calibration checks</li>
                         <li>• Isolation verification</li>
                         <li>• Test sequence planning</li>
                         <li>• Safety protocol implementation</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>

            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Quick Knowledge Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 1: Testing Priority</h4>
                  <p className="text-sm">What must always come first in any electrical testing?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Visual inspection - to identify obvious hazards before electrical testing</p>
                  </details>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 2: Certificate Responsibility</h4>
                  <p className="text-sm">Who takes legal responsibility when signing a certificate?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">The person signing the certificate - they take full legal responsibility</p>
                  </details>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 3: Module 1 Focus</h4>
                  <p className="text-sm">What does Module 1 primarily cover?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Foundation knowledge: what, why, when, who, and documentation basics</p>
                  </details>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 4: Core Principle</h4>
                  <p className="text-sm">Complete: "If it's not documented..."</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">"...it didn't happen" - proper documentation is essential</p>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Can I start testing if I understand Module 1?</h4>
                  <p className="text-sm text-white">A: No. Module 1 provides foundation knowledge only. You must complete training on safety procedures, testing equipment, and practical skills before conducting any electrical testing. Rushing into testing is dangerous.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What's the most important takeaway from Module 1?</h4>
                  <p className="text-sm text-white">A: That electrical inspection and testing is a serious professional responsibility with legal implications. Competency, proper procedures, and accurate documentation are not optional - they're essential for safety and legal compliance.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: How often should I refer back to this material?</h4>
                  <p className="text-sm text-white">A: Regularly. The principles covered in Module 1 underpin everything you'll do in inspection and testing. Revisit this content whenever you're unsure about responsibilities, legal requirements, or documentation procedures.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What happens if I skip parts of the testing sequence?</h4>
                  <p className="text-sm text-white">A: This creates serious safety and legal risks. Each test builds on the previous one, and skipping tests could miss dangerous conditions. Follow the BS 7671 prescribed sequence - visual inspection first, then dead testing, then live testing.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Can I use shortened forms of certificates to save time?</h4>
                  <p className="text-sm text-white">A: Only if they're legitimate abbreviated versions like MEIWC for minor work. You cannot create your own shortened certificates or omit required information. Proper documentation is a legal requirement, not a suggestion.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Q: What should I focus on next after Module 1?</h4>
                  <p className="text-sm text-white">A: Safety procedures, understanding testing equipment, and learning proper site preparation. Module 1 gives you the 'why' and 'what' - subsequent modules teach you the 'how' safely and effectively.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Development Notes */}
          <Card className="bg-yellow-400/10 border-blue-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Professional Development Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-400/20 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Building on Module 1</h4>
                <p className="text-sm mb-3">
                  Module 1 establishes the foundation, but your professional development journey is just beginning. The principles you've learned here will guide every inspection and test you perform throughout your career.
                </p>
                <h5 className="text-white font-semibold mb-2">Next Steps in Your Development:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Master safety procedures and risk assessment</li>
                  <li>• Learn to use testing equipment correctly and safely</li>
                  <li>• Practice interpreting test results and identifying defects</li>
                  <li>• Understand different installation types and their specific requirements</li>
                  <li>• Stay current with BS 7671 amendments and industry best practices</li>
                </ul>
                <div className="mt-3 p-3 bg-yellow-600/20 rounded">
                  <p className="text-xs"><strong>Remember:</strong> Competency is built through continuous learning, practice, and experience. Module 1 is your foundation - build on it responsibly.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced On-the-Job Scenarios Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-yellow-400" />
                Real-World Professional Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              {/* Scenario 1 */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-6 rounded-lg border border-red-500/30">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-300 font-bold text-lg mb-2">Scenario 1: Pressure to Skip Tests</h4>
                    <p className="text-white mb-3">
                      <strong>Situation:</strong> You're working on a commercial installation. The client is pressuring you to energise circuits immediately because they need to open for business tomorrow. They say "just skip the testing this once - we trust your work."
                    </p>
                  </div>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400">
                  <h5 className="text-red-200 font-semibold mb-2">Professional Response:</h5>
                  <ul className="text-white space-y-2 text-sm">
                    <li>• <strong>Never compromise:</strong> "I understand the urgency, but testing isn't optional - it's a legal requirement for safety and my professional obligations."</li>
                    <li>• <strong>Explain consequences:</strong> "Without proper testing, I cannot certify the installation is safe. This affects your insurance and liability."</li>
                    <li>• <strong>Offer solutions:</strong> "I can prioritise essential circuits first and work through the night if needed, but every circuit must be tested before energising."</li>
                    <li>• <strong>Document everything:</strong> Keep records of any pressure to skip procedures - this protects you legally.</li>
                  </ul>
                </div>
                <div className="mt-3 p-3 bg-gray-800/50 rounded">
                  <p className="text-xs text-gray-300"><strong>Key Learning:</strong> Client pressure is common, but your professional integrity and legal obligations cannot be compromised. Clear communication about why testing is essential builds client understanding and protects everyone involved.</p>
                </div>
              </div>

              {/* Scenario 2 */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-lg border border-yellow-400/30">
                <div className="flex items-start gap-3 mb-4">
                  <FileText className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-300 font-bold text-lg mb-2">Scenario 2: Certificate Signing Dilemma</h4>
                    <p className="text-white mb-3">
                      <strong>Situation:</strong> Your supervisor asks you to sign an Electrical Installation Certificate for work that another electrician completed while you were off sick. You weren't present for the installation or testing, but your supervisor says "it's fine, we need the cert signed today."
                    </p>
                  </div>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h5 className="text-blue-200 font-semibold mb-2">Professional Response:</h5>
                  <ul className="text-white space-y-2 text-sm">
                    <li>• <strong>Refuse to sign:</strong> "I cannot sign a certificate for work I haven't personally carried out or thoroughly verified."</li>
                    <li>• <strong>Explain legal implications:</strong> "By signing, I take full legal responsibility for the safety and compliance of this installation."</li>
                    <li>• <strong>Offer alternatives:</strong> "I can inspect and test the installation now, or the person who did the work should sign the certificate."</li>
                    <li>• <strong>Stand firm:</strong> Even under pressure, never sign certificates for unverified work - this is professional misconduct and potentially criminal.</li>
                  </ul>
                </div>
                <div className="mt-3 p-3 bg-gray-800/50 rounded">
                  <p className="text-xs text-gray-300"><strong>Key Learning:</strong> Your signature on a certificate is your professional guarantee that the work is safe and compliant. Never sign for work you haven't personally verified - the legal and professional consequences can be severe.</p>
                </div>
              </div>

              {/* Scenario 3 */}
              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-lg border border-green-500/30">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-300 font-bold text-lg mb-2">Scenario 3: Discovering Previous Poor Work</h4>
                    <p className="text-white mb-3">
                      <strong>Situation:</strong> During a periodic inspection, you discover that previous electrical work has dangerous defects - incorrect cable sizes, missing RCD protection, and poor earthing. The homeowner says "the last electrician certified it was fine, can you just pass it this time?"
                    </p>
                  </div>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400">
                  <h5 className="text-green-200 font-semibold mb-2">Professional Response:</h5>
                  <ul className="text-white space-y-2 text-sm">
                    <li>• <strong>Document everything:</strong> Photograph defects and record full details on the EICR with appropriate codes (C1, C2, or C3).</li>
                    <li>• <strong>Explain clearly:</strong> "These defects present safety risks that I must report. I cannot ignore dangerous conditions."</li>
                    <li>• <strong>Provide guidance:</strong> Explain what needs fixing, rough costs, and timeframes for different code classifications.</li>
                    <li>• <strong>Follow up professionally:</strong> Ensure the client understands their responsibilities and provide written recommendations.</li>
                  </ul>
                </div>
                <div className="mt-3 p-3 bg-gray-800/50 rounded">
                  <p className="text-xs text-gray-300"><strong>Key Learning:</strong> You must report what you find, not what people want to hear. Your professional duty is to electrical safety, not to make clients happy by overlooking problems.</p>
                </div>
              </div>

              {/* Scenario 4 */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-500/30">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-purple-300 font-bold text-lg mb-2">Scenario 4: Equipment Failure During Testing</h4>
                    <p className="text-white mb-3">
                      <strong>Situation:</strong> Your insulation resistance tester gives inconsistent readings on a new installation. Your colleague suggests "the readings are probably fine - the cables are new, just put down 999MΩ and move on."
                    </p>
                  </div>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-400">
                  <h5 className="text-purple-200 font-semibold mb-2">Professional Response:</h5>
                  <ul className="text-white space-y-2 text-sm">
                    <li>• <strong>Stop testing immediately:</strong> "I cannot continue with unreliable equipment - this compromises the integrity of all test results."</li>
                    <li>• <strong>Check equipment:</strong> Verify calibration dates, test leads, and try a different tester if available.</li>
                    <li>• <strong>Never falsify results:</strong> "I cannot record test values I haven't actually measured - this is fraudulent and dangerous."</li>
                    <li>• <strong>Investigate properly:</strong> Find the cause of inconsistent readings - it might indicate a real problem with the installation.</li>
                  </ul>
                </div>
                <div className="mt-3 p-3 bg-gray-800/50 rounded">
                  <p className="text-xs text-gray-300"><strong>Key Learning:</strong> Test results must be genuine and accurate. Equipment problems don't justify falsifying data - they require proper investigation and resolution before testing can continue.</p>
                </div>
              </div>

              {/* Professional Reflection */}
              <div className="bg-yellow-400/10 p-6 rounded-lg border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold text-lg mb-3">Professional Reflection Questions</h4>
                <p className="text-white mb-3">After reviewing these scenarios, ask yourself:</p>
                <ul className="text-white space-y-2 text-sm">
                  <li>• How would I handle pressure to compromise professional standards?</li>
                  <li>• What are the potential consequences of taking shortcuts?</li>
                  <li>• How can I communicate the importance of proper procedures to clients?</li>
                  <li>• What support systems do I have when facing difficult professional decisions?</li>
                  <li>• How do I maintain competency and stay updated with industry changes?</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          {/* Comprehensive Key Takeaways Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Essential Module 1 Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              {/* Legal & Professional Responsibilities */}
              <div className="space-y-4">
                <h4 className="text-yellow-400 font-semibold text-lg border-b border-yellow-400/30 pb-2">Legal & Professional Responsibilities</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="text-red-300 font-semibold mb-1">Personal Legal Liability</h5>
                        <p className="text-sm text-white">When you sign any electrical certificate, YOU become personally liable for the safety and compliance of that installation. This responsibility cannot be transferred or shared.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-yellow-400">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="text-blue-300 font-semibold mb-1">EAWR 1989 Compliance</h5>
                        <p className="text-sm text-white">Regulation 16 requires competent persons for electrical work. Incompetence can result in prosecution, unlimited fines, and imprisonment.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-400">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="text-purple-300 font-semibold mb-1">Professional Standards</h5>
                        <p className="text-sm text-white">BS 7671 provides the technical standards for compliance. Deviation without justification is professional negligence.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="text-green-300 font-semibold mb-1">Duty of Care</h5>
                        <p className="text-sm text-white">You owe a duty of care to all who may be affected by your work - building occupants, future electricians, and the general public.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testing & Inspection Fundamentals */}
              <div className="space-y-4">
                <h4 className="text-blue-300 font-semibold text-lg border-b border-blue-300/30 pb-2">Testing & Inspection Fundamentals</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-yellow-400 font-bold text-lg">1</span>
                      </div>
                      <h5 className="text-yellow-400 font-semibold">Visual First</h5>
                    </div>
                    <p className="text-sm text-white text-center">Visual inspection must ALWAYS precede any electrical testing. Identify obvious dangers before applying test voltages.</p>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/20">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-300 font-bold text-lg">2</span>
                      </div>
                      <h5 className="text-blue-300 font-semibold">Dead Testing</h5>
                    </div>
                    <p className="text-sm text-white text-center">Continuity, insulation resistance, and polarity tests must be completed before any circuit is energised.</p>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg border border-green-400/20">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-300 font-bold text-lg">3</span>
                      </div>
                      <h5 className="text-green-300 font-semibold">Live Testing</h5>
                    </div>
                    <p className="text-sm text-white text-center">Earth fault loop impedance, RCD testing, and functional checks verify the installation operates safely when energised.</p>
                  </div>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-white text-center"><strong className="text-yellow-300">Critical Rule:</strong> Never skip or reorder the prescribed testing sequence. Each test builds on the previous one to ensure comprehensive safety verification.</p>
                </div>
              </div>

              {/* Competency & Professional Development */}
              <div className="space-y-4">
                <h4 className="text-green-300 font-semibold text-lg border-b border-green-300/30 pb-2">Competency & Professional Development</h4>
                <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-lg border border-green-500/30">
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Briefcase className="h-8 w-8 text-green-400" />
                      </div>
                      <h5 className="text-green-300 font-semibold mb-1">Skills</h5>
                      <p className="text-xs text-white">Practical ability to perform tasks safely and correctly</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="h-8 w-8 text-yellow-400" />
                      </div>
                      <h5 className="text-blue-300 font-semibold mb-1">Knowledge</h5>
                      <p className="text-xs text-white">Understanding of principles, regulations, and procedures</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Target className="h-8 w-8 text-purple-400" />
                      </div>
                      <h5 className="text-purple-300 font-semibold mb-1">Experience</h5>
                      <p className="text-xs text-white">Real-world application across different scenarios</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Lightbulb className="h-8 w-8 text-yellow-400" />
                      </div>
                      <h5 className="text-yellow-300 font-semibold mb-1">Understanding</h5>
                      <p className="text-xs text-white">Ability to interpret, adapt, and make sound decisions</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-white text-sm"><strong>Remember:</strong> Competency is not a qualification you achieve once - it requires ongoing development through training, experience, and reflection throughout your career.</p>
                  </div>
                </div>
              </div>

              {/* Documentation Excellence */}
              <div className="space-y-4">
                <h4 className="text-orange-300 font-semibold text-lg border-b border-orange-300/30 pb-2">Documentation Excellence</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-400/30">
                    <h5 className="text-orange-300 font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Certificate Selection
                    </h5>
                    <ul className="text-sm text-white space-y-1">
                      <li>• <strong>EIC:</strong> New installations & major alterations</li>
                      <li>• <strong>MEIWC:</strong> Minor additions & changes</li>
                      <li>• <strong>EICR:</strong> Periodic inspection reports</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-400/30">
                    <h5 className="text-red-300 font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Critical Requirements
                    </h5>
                    <ul className="text-sm text-white space-y-1">
                      <li>• All test results must be genuine</li>
                      <li>• Complete all sections accurately</li>
                      <li>• Only sign work you've verified</li>
                      <li>• Keep copies for minimum periods</li>
                    </ul>
                  </div>
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                    <h5 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Legal Protection
                    </h5>
                    <ul className="text-sm text-white space-y-1">
                      <li>• Proper documentation protects you legally</li>
                      <li>• Accurate records support insurance claims</li>
                      <li>• Complete certificates demonstrate competence</li>
                      <li>• Good records facilitate future work</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Final Professional Reminder */}
              <div className="bg-gradient-to-r from-yellow-400/10 to-orange-600/20 p-6 rounded-lg border-2 border-yellow-400/30">
                <h4 className="text-yellow-400 font-bold text-xl mb-3 text-center">The Bottom Line</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Never Compromise On:</h5>
                    <ul className="text-sm text-gray-200 space-y-1">
                      <li>• Safety procedures and testing sequences</li>
                      <li>• Accurate documentation and honest reporting</li>
                      <li>• Personal competency limits and training needs</li>
                      <li>• Professional standards and legal requirements</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">Always Remember:</h5>
                    <ul className="text-sm text-gray-200 space-y-1">
                      <li>• Your signature = your professional reputation</li>
                      <li>• Electrical safety protects lives and property</li>
                      <li>• Competency requires lifelong learning</li>
                      <li>• Professional integrity is non-negotiable</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-card/50 rounded-lg text-center">
                  <p className="text-yellow-400 font-semibold">Module 1 provides your foundation - build your career on these principles with pride and professionalism.</p>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Interactive Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz - 10 Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white mb-4">
                Test your comprehensive understanding of all Module 1 topics with this 10-question quiz covering legal framework, testing procedures, competency, and documentation.
              </p>
              {showResults ? (
                // Quiz Results
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h3>
                    <div className="text-4xl font-bold text-yellow-400 mb-2">
                      {score}/{quizQuestions.length}
                    </div>
                    <p className="text-white">
                      {getScoreMessage(score)}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {quizQuestions.map((question, index) => {
                      const userAnswer = selectedAnswers[index];
                      const isCorrect = userAnswer === question.correctAnswer;
                      
                      return (
                        <Card key={question.id} className="bg-card border-gray-600">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-2">
                                <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 text-xs">
                                  {question.topic}
                                </Badge>
                                <CardTitle className="text-lg text-white leading-relaxed">
                                  {question.question}
                                </CardTitle>
                              </div>
                              {isCorrect ? (
                                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                              ) : (
                                <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => {
                                const isUserAnswer = userAnswer === optionIndex;
                                const isCorrectAnswer = optionIndex === question.correctAnswer;
                                
                                return (
                                  <div
                                    key={optionIndex}
                                    className={`p-3 rounded border-2 ${
                                      isCorrectAnswer 
                                        ? 'border-green-500 bg-card text-green-200'
                                        : isUserAnswer 
                                          ? 'border-red-500 bg-card text-red-200'
                                          : 'border-gray-600 text-gray-300'
                                    }`}
                                  >
                                    {option}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="bg-blue-900/20 border border-yellow-400/30 p-3 rounded">
                              <p className="text-blue-200 text-sm leading-relaxed">
                                <strong>Explanation:</strong> {question.explanation}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleRestart}
                      className="bg-yellow-400 text-black hover:bg-yellow-400"
                    >
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              ) : (
                // Current Question
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="flex items-center justify-between text-sm text-white">
                    <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                    <span>{selectedAnswers.filter(a => a !== undefined).length}/{quizQuestions.length} answered</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question */}
                  <Card className="bg-card border-gray-600">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400">
                          {currentQ.topic}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white leading-relaxed">
                        {currentQ.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentQ.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                              selectedAnswers[currentQuestion] === index
                                ? 'border-yellow-400 bg-yellow-400/10 text-white'
                                : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
                            }`}
                          >
                            <span className="font-medium mr-3">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            {option}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
                    >
                      Previous
                    </Button>

                    <div className="flex gap-2">
                      {quizQuestions.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentQuestion
                              ? 'bg-yellow-400'
                              : selectedAnswers[index] !== undefined
                                ? 'bg-green-500'
                                : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={handleNext}
                      disabled={!isAnswered}
                      className="bg-yellow-400 text-black hover:bg-yellow-400 disabled:opacity-50"
                    >
                      {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module1Section7;
