import { ArrowLeft, FileText, Shield, AlertTriangle, CheckCircle, Users, Clipboard, Download, Eye, Zap, HardHat, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

const Module2Section2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [showResults, setShowResults] = useState(false);

  const quizQuestions: QuizQuestionType[] = [
    {
      id: 1,
      question: "What is the main purpose of a risk assessment?",
      options: [
        "To avoid delays",
        "To identify and control hazards",
        "To meet NICEIC membership rules",
        "To test equipment quickly"
      ],
      correctAnswer: 1,
      explanation: "A risk assessment's primary purpose is to identify potential hazards and evaluate how to control them effectively."
    },
    {
      id: 2,
      question: "True or False: A method statement explains how to safely carry out the job.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 0,
      explanation: "True. A method statement provides step-by-step procedures on how to carry out work safely."
    },
    {
      id: 3,
      question: "Which law makes RAMS a legal requirement?",
      options: [
        "Electricity at Work Regulations",
        "Building Control Act",
        "Health & Safety at Work Act",
        "IET Wiring Guide"
      ],
      correctAnswer: 2,
      explanation: "The Health & Safety at Work Act makes risk assessments a legal requirement for employers and workers."
    },
    {
      id: 4,
      question: "Which of the following would you NOT normally include in RAMS?",
      options: [
        "Step-by-step test procedure",
        "Emergency contact numbers",
        "Test certificate template",
        "Required PPE"
      ],
      correctAnswer: 2,
      explanation: "Test certificate templates are documentation tools, not safety planning elements that belong in RAMS."
    },
    {
      id: 5,
      question: "Why do RAMS matter on small jobs?",
      options: [
        "They're only for office jobs",
        "You need to slow down the work",
        "Hazards still exist, no matter the job size",
        "They aren't required for electricians"
      ],
      correctAnswer: 2,
      explanation: "Hazards exist regardless of job size. RAMS help identify and control these hazards on any scale of work."
    },
    {
      id: 6,
      question: "What does the hierarchy of control prioritise for managing risks?",
      options: [
        "PPE as the first choice",
        "Elimination of hazards where possible",
        "Administrative controls only",
        "Engineering controls as last resort"
      ],
      correctAnswer: 1,
      explanation: "The hierarchy of control prioritises elimination of hazards first, followed by substitution, engineering controls, administrative controls, and PPE as the last option."
    },
    {
      id: 7,
      question: "How often should RAMS be reviewed and updated?",
      options: [
        "Only when accidents occur",
        "Annually regardless of changes",
        "When conditions change or incidents occur",
        "They never need updating once written"
      ],
      correctAnswer: 2,
      explanation: "RAMS should be reviewed and updated whenever working conditions change, after incidents, or when new hazards are identified."
    },
    {
      id: 8,
      question: "Who is responsible for ensuring RAMS are followed on site?",
      options: [
        "Only the site supervisor",
        "Only the person who wrote the RAMS",
        "Everyone involved in the work",
        "Only the client"
      ],
      correctAnswer: 2,
      explanation: "Everyone involved in the work has a responsibility to follow the RAMS and ensure safe working practices."
    },
    {
      id: 9,
      question: "What should you do if you identify a new hazard not covered in your RAMS?",
      options: [
        "Continue working but be extra careful",
        "Stop work and update the RAMS",
        "Report it at the end of the day",
        "Only worry about it if someone gets hurt"
      ],
      correctAnswer: 1,
      explanation: "Work should stop immediately when new hazards are identified, and the RAMS must be updated before continuing."
    },
    {
      id: 10,
      question: "Which of these is the most effective control measure for electrical testing hazards?",
      options: [
        "Warning signs around the work area",
        "Safe isolation of electrical supplies",
        "High-visibility clothing",
        "Training courses only"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation removes the hazard at source and is the most effective control measure for electrical testing work."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== undefined) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswers(newAnswers);
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1]);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(selectedAnswers[currentQuestion - 1]);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setSelectedAnswer(undefined);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold px-3 py-1 border-0"
            >
              Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Risk Assessments & Method Statements (RAMS)
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Before any testing or electrical work, you must assess the risks and plan how to work safely. This is where RAMS comes in—your safety plan on paper.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white leading-relaxed mb-4">
                Risk Assessment and Method Statement (RAMS) documents are the cornerstone of safe electrical work. 
                Whether you're testing a simple domestic installation or a complex industrial system, RAMS ensure 
                you've identified potential hazards and planned how to control them safely.
              </p>
              <p className="text-white leading-relaxed">
                This section will teach you how to create effective RAMS documents that protect workers, demonstrate 
                professional competence, and meet legal requirements. You'll learn the step-by-step process for 
                identifying hazards, evaluating risks, and documenting safe working procedures.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-2">
              <p>By the end of this section, you'll be able to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Define what a Risk Assessment and Method Statement are</li>
                <li>Understand when and why RAMS are needed</li>
                <li>Identify common hazards during inspection and testing</li>
                <li>Know what should be included in a RAMS document</li>
                <li>Create a practical RAMS for electrical testing work</li>
                <li>Understand legal requirements and best practices</li>
                <li>Apply the 5-step risk assessment process effectively</li>
                <li>Use the hierarchy of controls to manage identified risks</li>
              </ul>
            </CardContent>
          </Card>

          {/* What Is a Risk Assessment */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                1. What Is a Risk Assessment?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>A risk assessment is a systematic process to identify potential hazards and evaluate the risk of harm occurring.</p>
              
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Key Components:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>The task being undertaken</li>
                  <li>The hazards present</li>
                  <li>Who might be harmed and how</li>
                  <li>Existing control measures</li>
                  <li>Risk rating before and after controls</li>
                  <li>Additional controls needed</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-600/20 p-4 rounded-lg">
                <p className="text-blue-300 font-semibold">Remember:</p>
                <p className="text-blue-200">Risk = Likelihood × Severity. Both factors must be considered when assessing hazards.</p>
              </div>
            </CardContent>
          </Card>

          {/* What Is a Method Statement */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-elec-yellow" />
                2. What Is a Method Statement?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>A method statement outlines how the job will be carried out safely, step by step.</p>
              
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Key Components:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Step-by-step procedures</li>
                  <li>Tools and equipment required</li>
                  <li>PPE requirements</li>
                  <li>Safety measures and isolation procedures</li>
                  <li>Emergency actions and contact details</li>
                  <li>Personnel responsibilities</li>
                  <li>Sequence of operations</li>
                  <li>Quality checks and testing procedures</li>
                </ul>
              </div>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-elec-yellow font-semibold">Together, these are called RAMS.</p>
                <p className="text-white text-sm mt-1">Risk Assessment + Method Statement = Your complete safety planning document</p>
              </div>
            </CardContent>
          </Card>

          {/* Legal Framework */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                3. Legal Framework & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Key Legislation:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Health & Safety at Work Act 1974</strong> - Makes risk assessments a legal duty for all workers</li>
                  <li><strong>Management of Health & Safety at Work Regulations 1999</strong> - Requires written assessments for 5+ employees</li>
                  <li><strong>Electricity at Work Regulations 1989</strong> - Specific electrical safety requirements</li>
                  <li><strong>Construction (Design & Management) Regulations 2015</strong> - Additional requirements for construction sites</li>
                </ul>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Who Needs RAMS?</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All employers (legal requirement)</li>
                  <li>Self-employed persons working with others</li>
                  <li>Contractors working on client sites</li>
                  <li>Anyone undertaking high-risk electrical work</li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-600/20 p-4 rounded-lg">
                <p className="text-red-300 font-semibold">Legal Consequences:</p>
                <p className="text-red-200">Failure to conduct proper risk assessments can result in prosecution, unlimited fines, and imprisonment.</p>
              </div>
            </CardContent>
          </Card>

          {/* Why RAMS Are Essential */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                4. Why RAMS Are Essential
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Legal Protection:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Required under the Health & Safety at Work Act</li>
                  <li>Demonstrates due diligence in health and safety</li>
                  <li>Provides legal defence if incidents occur</li>
                </ul>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Business Benefits:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Required by many clients, contractors, and insurance firms</li>
                  <li>Demonstrates professional competence</li>
                  <li>Reduces liability and insurance premiums</li>
                  <li>Helps win contracts and tenders</li>
                  <li>Prevents accidents and associated costs</li>
                </ul>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Safety Benefits:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Protects your staff, others on site, and the public</li>
                  <li>Forces you to think through potential problems</li>
                  <li>Ensures everyone knows the safe procedures</li>
                  <li>Provides clear emergency procedures</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-600/20 p-4 rounded-lg">
                <p className="text-green-300 font-semibold">Professional Impact:</p>
                <p className="text-green-200">Proper RAMS documentation demonstrates professionalism and can be a competitive advantage when tendering for work.</p>
              </div>
            </CardContent>
          </Card>

          {/* Common Electrical Hazards */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                5. Common Electrical Hazards to Assess
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Primary Electrical Hazards:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Contact with live conductors</li>
                    <li>Electric shock and electrocution</li>
                    <li>Arc flash and arc blast</li>
                    <li>Electrical fires and explosions</li>
                    <li>Burns from hot equipment or cables</li>
                    <li>Equipment failure and malfunction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Secondary Hazards:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Falls from height (ladders, platforms)</li>
                    <li>Manual handling injuries</li>
                    <li>Cuts from sharp edges and tools</li>
                    <li>Eye injuries from arc flash</li>
                    <li>Noise exposure from equipment</li>
                    <li>Asbestos in older buildings</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-elec-yellow font-semibold mb-3">Environmental Hazards:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Wet or damp environments</li>
                    <li>Dusty or dirty conditions</li>
                    <li>Poor lighting or restricted access</li>
                    <li>Confined spaces</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Extreme temperatures</li>
                    <li>Presence of flammable materials</li>
                    <li>Overhead hazards</li>
                    <li>Unstable structures or surfaces</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment Process */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-elec-yellow" />
                6. The 5-Step Risk Assessment Process
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Identify the hazards</p>
                    <p className="text-sm">Look for anything that could cause harm during electrical testing. Walk around the site, check drawings, and consider all activities.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Decide who might be harmed</p>
                    <p className="text-sm">Consider workers, clients, visitors, members of the public, and anyone else who might be affected by your work.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Evaluate the risks</p>
                    <p className="text-sm">Rate likelihood and severity using a risk matrix. Consider existing precautions and whether they can be improved.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Record significant findings</p>
                    <p className="text-sm">Document hazards, people at risk, control measures, and residual risk ratings. Keep records for legal protection.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Review and update</p>
                    <p className="text-sm">Regularly review assessments, especially when conditions change, after incidents, or when new information becomes available.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Rating Matrix */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Risk Rating Matrix (5×5)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">Use this matrix to rate the likelihood and severity of identified hazards:</p>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-600">
                      <TableHead className="text-white">Likelihood →<br/>Severity ↓</TableHead>
                      <TableHead className="text-white text-center">1<br/>Very Unlikely</TableHead>
                      <TableHead className="text-white text-center">2<br/>Unlikely</TableHead>
                      <TableHead className="text-white text-center">3<br/>Possible</TableHead>
                      <TableHead className="text-white text-center">4<br/>Likely</TableHead>
                      <TableHead className="text-white text-center">5<br/>Very Likely</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-gray-600">
                      <TableCell className="text-white font-semibold">5 - Catastrophic</TableCell>
                      <TableCell className="bg-elec-yellow/30 text-center">5</TableCell>
                      <TableCell className="bg-orange-600/30 text-center">10</TableCell>
                      <TableCell className="bg-red-600/30 text-center">15</TableCell>
                      <TableCell className="bg-red-600/50 text-center">20</TableCell>
                      <TableCell className="bg-red-600/70 text-center">25</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-600">
                      <TableCell className="text-white font-semibold">4 - Major</TableCell>
                      <TableCell className="bg-green-600/30 text-center">4</TableCell>
                      <TableCell className="bg-elec-yellow/30 text-center">8</TableCell>
                      <TableCell className="bg-orange-600/30 text-center">12</TableCell>
                      <TableCell className="bg-red-600/30 text-center">16</TableCell>
                      <TableCell className="bg-red-600/50 text-center">20</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-600">
                      <TableCell className="text-white font-semibold">3 - Moderate</TableCell>
                      <TableCell className="bg-green-600/30 text-center">3</TableCell>
                      <TableCell className="bg-green-600/30 text-center">6</TableCell>
                      <TableCell className="bg-elec-yellow/30 text-center">9</TableCell>
                      <TableCell className="bg-orange-600/30 text-center">12</TableCell>
                      <TableCell className="bg-red-600/30 text-center">15</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-600">
                      <TableCell className="text-white font-semibold">2 - Minor</TableCell>
                      <TableCell className="bg-green-600/30 text-center">2</TableCell>
                      <TableCell className="bg-green-600/30 text-center">4</TableCell>
                      <TableCell className="bg-green-600/30 text-center">6</TableCell>
                      <TableCell className="bg-elec-yellow/30 text-center">8</TableCell>
                      <TableCell className="bg-orange-600/30 text-center">10</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-600">
                      <TableCell className="text-white font-semibold">1 - Negligible</TableCell>
                      <TableCell className="bg-green-600/30 text-center">1</TableCell>
                      <TableCell className="bg-green-600/30 text-center">2</TableCell>
                      <TableCell className="bg-green-600/30 text-center">3</TableCell>
                      <TableCell className="bg-green-600/30 text-center">4</TableCell>
                      <TableCell className="bg-elec-yellow/30 text-center">5</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-900/20 border border-green-600/20 p-3 rounded-lg">
                  <p className="text-green-400 font-semibold">Low Risk (1-6)</p>
                  <p className="text-green-200">Generally acceptable with existing controls</p>
                </div>
                <div className="bg-yellow-900/20 border border-elec-yellow/20 p-3 rounded-lg">
                  <p className="text-elec-yellow font-semibold">Medium Risk (8-12)</p>
                  <p className="text-yellow-200">Additional controls may be needed</p>
                </div>
                <div className="bg-red-900/20 border border-red-600/20 p-3 rounded-lg">
                  <p className="text-red-400 font-semibold">High Risk (15-25)</p>
                  <p className="text-red-200">Immediate action required</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hierarchy of Controls */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Hierarchy of Controls</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>When controlling risks, use this hierarchy from most to least effective:</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-600/20 rounded-lg">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <p className="text-green-400 font-semibold">Elimination</p>
                    <p className="text-sm">Remove the hazard completely (e.g., work on de-energised systems)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-900/20 border border-blue-600/20 rounded-lg">
                  <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <p className="text-elec-yellow font-semibold">Substitution</p>
                    <p className="text-sm">Replace with something less dangerous (e.g., lower voltage systems)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-900/20 border border-purple-600/20 rounded-lg">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <p className="text-purple-400 font-semibold">Engineering Controls</p>
                    <p className="text-sm">Physical safeguards (e.g., barriers, safety switches, RCDs)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-orange-900/20 border border-orange-600/20 rounded-lg">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <p className="text-orange-400 font-semibold">Administrative Controls</p>
                    <p className="text-sm">Procedures, training, warning signs, permits to work</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-600/20 rounded-lg">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                  <div>
                    <p className="text-red-400 font-semibold">Personal Protective Equipment (PPE)</p>
                    <p className="text-sm">Last resort - safety boots, hard hats, protective clothing</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Should Be Included in RAMS */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">What Should Be Included in RAMS</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Risk Assessment Section:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Project/task description</li>
                    <li>Location and site conditions</li>
                    <li>Personnel involved</li>
                    <li>Identified hazards</li>
                    <li>People at risk</li>
                    <li>Existing control measures</li>
                    <li>Risk ratings (before/after controls)</li>
                    <li>Additional controls needed</li>
                    <li>Residual risk assessment</li>
                    <li>Review date</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Method Statement Section:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Step-by-step procedures</li>
                    <li>Safe isolation procedures</li>
                    <li>Testing sequences</li>
                    <li>Equipment and tools required</li>
                    <li>PPE requirements</li>
                    <li>Personnel responsibilities</li>
                    <li>Communication procedures</li>
                    <li>Emergency contact details</li>
                    <li>First aid arrangements</li>
                    <li>Waste disposal procedures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-elec-yellow font-semibold mb-2">Essential Documentation:</p>
                <p className="text-white text-sm">
                  RAMS must be signed by competent persons, shared with all workers, and kept readily available on site. 
                  Include relevant drawings, permits, and emergency procedures.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Quick Knowledge Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What are the 5 steps of the risk assessment process?
                    </summary>
                    <div className="mt-3 text-white text-sm space-y-2">
                      <p>1. <strong>Identify</strong> the hazards</p>
                      <p>2. <strong>Decide</strong> who might be harmed</p>
                      <p>3. <strong>Evaluate</strong> the risks and existing controls</p>
                      <p>4. <strong>Record</strong> significant findings</p>
                      <p>5. <strong>Review</strong> and update regularly</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What does the hierarchy of control prioritise?
                    </summary>
                    <div className="mt-3 text-white text-sm space-y-2">
                      <p>1. <strong>Elimination</strong> (remove the hazard)</p>
                      <p>2. <strong>Substitution</strong> (replace with safer option)</p>
                      <p>3. <strong>Engineering controls</strong> (physical barriers)</p>
                      <p>4. <strong>Administrative controls</strong> (procedures, training)</p>
                      <p>5. <strong>PPE</strong> (personal protective equipment - last resort)</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Who needs RAMS?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>All employers (legal requirement), self-employed working with others, contractors on client sites, and anyone doing high-risk electrical work.</p>
                    </div>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HardHat className="h-6 w-6 text-green-400" />
                <CardTitle className="text-white text-xl">Real-World Scenario</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-green-400 font-semibold mb-3">Scenario: School Kitchen Testing</h4>
                  <p className="text-white">
                    You've been contracted to carry out periodic inspection and testing of the electrical installation 
                    in a primary school kitchen during the summer holidays. The kitchen contains commercial cooking 
                    equipment, dishwashers, refrigeration units, and standard power circuits.
                  </p>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Hazards Identified:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside space-y-1 text-sm text-white">
                      <li>Live electrical circuits (high voltage cooking equipment)</li>
                      <li>Wet conditions from cleaning</li>
                      <li>Grease and food debris</li>
                      <li>Heavy equipment to move</li>
                      <li>Poor lighting in some areas</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm text-white">
                      <li>Confined spaces behind equipment</li>
                      <li>Hot surfaces from recent use</li>
                      <li>Sharp edges on equipment</li>
                      <li>Potential asbestos in older building</li>
                      <li>Fire risk from electrical faults</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Control Measures Applied:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-white">
                    <li><strong>Elimination:</strong> Complete isolation of all circuits being tested</li>
                    <li><strong>Engineering:</strong> Use of RCD protection and proper earthing</li>
                    <li><strong>Administrative:</strong> Coordination with school, clear signage, permit to work</li>
                    <li><strong>PPE:</strong> Safety boots, hard hat, protective clothing, eye protection</li>
                    <li><strong>Procedures:</strong> 7-step safe isolation, two-person team, emergency contacts</li>
                  </ul>
                </div>

                <div className="bg-green-900/20 border border-green-600/20 p-4 rounded-lg">
                  <p className="text-green-300 font-semibold">Outcome:</p>
                  <p className="text-green-200 text-sm">
                    Work completed safely with no incidents. Client impressed with professional RAMS documentation, 
                    leading to additional contracts for other school buildings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Do I need RAMS for every small domestic job?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>Legally:</strong> You must consider risks for all work, but formal documentation may not be required for routine domestic tasks.</p>
                      <p><strong>Best Practice:</strong> Use RAMS for complex, unusual, or high-risk domestic work. Many insurance policies require it.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Who should write the RAMS - me or the client?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>Your responsibility:</strong> As the person doing the work, you must write RAMS for your activities.</p>
                      <p><strong>Site-specific:</strong> The client may provide site rules and constraints, but your RAMS covers your specific work methods.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What if I discover new hazards while working?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>Stop work immediately.</strong> Assess the new hazard, update your RAMS if necessary, and only continue once proper controls are in place.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      How detailed should my method statement be?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Detailed enough that a competent person could follow it safely. Include all safety-critical steps, but avoid unnecessary detail that makes it difficult to follow.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Can I reuse RAMS from previous jobs?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>Yes, but adapt them.</strong> Generic templates are fine as starting points, but each RAMS must be specific to the actual site conditions and work being undertaken.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What happens if someone doesn't follow the RAMS?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>The RAMS becomes ineffective and you lose legal protection. Ensure all workers understand and follow the procedures, and stop work if they don't comply.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Do apprentices need to write their own RAMS?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Apprentices should work under their supervisor's RAMS but should be trained to understand and contribute to the process as part of their development.</p>
                    </div>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Exercises */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clipboard className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Practical Exercises</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 1: Hazard Identification</h4>
                  <p className="text-white mb-3">
                    You're testing a distribution board in a school kitchen during half-term.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Your task:</p>
                    <ol className="text-white text-sm space-y-1 list-decimal list-inside">
                      <li>List at least 8 potential hazards</li>
                      <li>Identify who might be harmed by each hazard</li>
                      <li>Rate each hazard using the 5×5 risk matrix</li>
                      <li>Suggest appropriate control measures</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 2: Method Statement Development</h4>
                  <p className="text-white mb-3">
                    Create a step-by-step method statement for testing RCD protection on a ring final circuit.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Include:</p>
                    <ul className="text-white text-sm space-y-1 list-disc list-inside">
                      <li>Pre-work checks and equipment needed</li>
                      <li>Safe isolation procedure</li>
                      <li>Testing sequence</li>
                      <li>PPE requirements</li>
                      <li>Emergency procedures</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 3: Risk Rating Practice</h4>
                  <p className="text-white mb-3">
                    Rate these scenarios using the 5×5 matrix:
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg space-y-3">
                    <div>
                      <p className="text-elec-yellow font-semibold">Scenario A:</p>
                      <p className="text-white text-sm">Working on a domestic consumer unit during the day with proper isolation</p>
                    </div>
                    <div>
                      <p className="text-elec-yellow font-semibold">Scenario B:</p>
                      <p className="text-white text-sm">Testing a 400V motor circuit in a wet industrial environment</p>
                    </div>
                    <div>
                      <p className="text-elec-yellow font-semibold">Scenario C:</p>
                      <p className="text-white text-sm">Tracing cables in a cluttered loft space with poor lighting</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-green-900/20 border-green-600/20">
            <CardHeader>
              <CardTitle className="text-green-400">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="list-disc list-inside space-y-2">
                <li>RAMS = Risk Assessment + Method Statement - both are essential for safe electrical work</li>
                <li>Required by law under the Health & Safety at Work Act and demonstrates professional competence</li>
                <li>Use the 5-step process to systematically identify, evaluate, and control hazards</li>
                <li>Apply the hierarchy of controls: eliminate, substitute, engineer, administrate, protect</li>
                <li>Document everything clearly and keep RAMS updated as conditions change</li>
                <li>Include emergency procedures and ensure all workers understand their responsibilities</li>
                <li>Professional RAMS documentation protects workers, wins contracts, and demonstrates competence</li>
                <li>Review and update regularly, especially after incidents or when new hazards are identified</li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Knowledge Check (10 Questions)</CardTitle>
            </CardHeader>
            <CardContent>
              {showResults ? (
                <QuizResults 
                  questions={quizQuestions} 
                  selectedAnswers={selectedAnswers} 
                  onRestart={restartQuiz}
                />
              ) : (
                <div className="space-y-6">
                  <QuizProgress 
                    currentQuestion={currentQuestion} 
                    totalQuestions={quizQuestions.length} 
                  />
                  
                  <QuizQuestion
                    question={quizQuestions[currentQuestion]}
                    selectedAnswer={selectedAnswer}
                    onAnswerSelect={handleAnswerSelect}
                  />

                  {selectedAnswer !== undefined && quizQuestions[currentQuestion].explanation && (
                    <Card className="bg-green-900/20 border-green-600/20">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-green-400 font-semibold text-sm mb-1">Explanation:</p>
                            <p className="text-green-200 text-sm">{quizQuestions[currentQuestion].explanation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <QuizNavigation
                    currentQuestion={currentQuestion}
                    totalQuestions={quizQuestions.length}
                    selectedAnswer={selectedAnswer}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isLastQuestion={currentQuestion === quizQuestions.length - 1}
                  />
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module2Section2;