import { ArrowLeft, Shield, BookOpen, Target, Info, AlertTriangle, CheckCircle, Wrench, Layers, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary safety mechanism in Class II equipment?",
    options: [
      "Protective earthing",
      "Double or reinforced insulation",
      "Extra low voltage",
      "Current limiting circuits"
    ],
    correctAnswer: 1,
    explanation: "Class II equipment relies on double or reinforced insulation as its primary safety mechanism, eliminating the need for protective earthing."
  },
  {
    id: 2,
    question: "How many conductors does a Class II appliance cable typically have?",
    options: [
      "One conductor",
      "Two conductors (L, N)",
      "Three conductors (L, N, E)",
      "Four conductors"
    ],
    correctAnswer: 1,
    explanation: "Class II appliances typically use two-core cables with only live (L) and neutral (N) conductors, as they don't require an earth connection."
  },
  {
    id: 3,
    question: "What does 'basic insulation' protect against in Class II equipment?",
    options: [
      "Overcurrent",
      "Direct contact with live parts",
      "Electromagnetic interference",
      "Moisture ingress"
    ],
    correctAnswer: 1,
    explanation: "Basic insulation in Class II equipment protects against direct contact with live parts during normal operation."
  },
  {
    id: 4,
    question: "What is the purpose of 'supplementary insulation' in Class II equipment?",
    options: [
      "To improve energy efficiency",
      "To reduce electromagnetic emissions",
      "To provide independent protection if basic insulation fails",
      "To meet colour coding requirements"
    ],
    correctAnswer: 2,
    explanation: "Supplementary insulation provides independent protection against electric shock if the basic insulation fails, creating a double barrier."
  },
  {
    id: 5,
    question: "Which test is NOT typically required for Class II equipment?",
    options: [
      "Insulation resistance test",
      "Earth continuity test",
      "Functional test",
      "Visual inspection"
    ],
    correctAnswer: 1,
    explanation: "Earth continuity tests are not required for Class II equipment as they have no accessible earthed parts and don't rely on protective earthing."
  }
];

const PATTestingModule2Section3 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

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
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-400';
    if (score >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const renderQuiz = () => {
    if (!quizStarted) {
      return (
        <Card className="bg-gradient-to-r from-yellow-400/10 to-elec-gray border-yellow-400/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">🧠 Knowledge Check Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Test your understanding of Class II equipment and double insulation with this 5-question quiz.
            </p>
            <Button 
              onClick={() => setQuizStarted(true)}
              className="bg-yellow-400 text-black hover:bg-yellow-600"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (showResults) {
      const score = calculateScore();
      return (
        <Card className="bg-gradient-to-r from-yellow-400/10 to-elec-gray border-yellow-400/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}/{quizData.length}
              </div>
              <p className="text-gray-300 mt-2">
                {score >= 4 ? 'Excellent understanding of Class II equipment!' : score >= 3 ? 'Good knowledge!' : 'Review the material and try again!'}
              </p>
            </div>
            
            <div className="space-y-3">
              {quizData.map((question, index) => (
                <div key={question.id} className="bg-card p-3 rounded-md border border-gray-600">
                  <div className="flex items-start gap-2">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">
                        {question.id}. {question.question}
                      </p>
                      <p className="text-xs text-gray-400">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handleRestart}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-600"
            >
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      );
    }

    const question = quizData[currentQuestion];
    const progress = ((currentQuestion + 1) / quizData.length) * 100;

    return (
      <Card className="bg-gradient-to-r from-yellow-400/10 to-elec-gray border-yellow-400/30">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-yellow-400">Knowledge Check Quiz</CardTitle>
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Question {currentQuestion + 1} of {quizData.length}
            </Badge>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-card p-4 rounded-md border border-gray-600">
            <p className="text-white font-semibold mb-4">
              {question.id}. {question.question}
            </p>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-yellow-400 bg-yellow-400/10 text-white'
                      : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-semibold min-w-[24px]">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-card disabled:opacity-50"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-yellow-400 text-black hover:bg-yellow-600 disabled:opacity-50"
            >
              {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../pat-testing-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Class II: Double Insulation Principles
                </h1>
                <p className="text-xl text-gray-400">
                  Module 2, Section 3
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                30 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="text-lg leading-relaxed">
                Class II equipment offers an alternative approach to electrical safety through double or 
                reinforced insulation rather than protective earthing. This design philosophy eliminates 
                the need for earth connections whilst maintaining equivalent safety levels. Understanding 
                Class II construction principles is essential for proper identification and testing of 
                this equipment category.
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
            <CardContent className="text-gray-300 space-y-3">
              <p className="mb-4">By the end of this section, you will be able to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Define Class II equipment and its double insulation safety principles</li>
                <li>Distinguish between basic, supplementary, and reinforced insulation</li>
                <li>Identify Class II markings and symbols on equipment</li>
                <li>Understand the construction requirements for double-insulated equipment</li>
                <li>Recognise common types of Class II appliances and their characteristics</li>
                <li>Apply appropriate PAT testing procedures for Class II equipment</li>
              </ul>
            </CardContent>
          </Card>

          {/* What is Class II Equipment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                What is Class II Equipment?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-blue-900/20 border border-yellow-400/30 p-5 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Definition</h4>
                <p className="mb-3">
                  Class II equipment has double insulation or reinforced insulation and no provision 
                  for protective earthing. Protection against electric shock does not rely upon basic 
                  insulation only, but upon an additional safety precaution such as double insulation 
                  or reinforced insulation.
                </p>
                <div className="bg-blue-800/30 p-3 rounded text-sm">
                  <strong>Key Point:</strong> Class II equipment achieves safety through insulation design, 
                  not through earthing connections.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Essential Characteristics</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Double or reinforced insulation system</li>
                    <li>• Two-core supply cable (L, N only)</li>
                    <li>• No accessible earthed metalwork</li>
                    <li>• Square-within-square symbol ⧈</li>
                    <li>• Independent protection layers</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Safety Principle</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Basic insulation provides primary protection</li>
                    <li>• Supplementary insulation acts as backup</li>
                    <li>• Two independent barriers prevent shock</li>
                    <li>• Failure of one barrier still maintains safety</li>
                    <li>• No reliance on external earthing system</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Double Insulation Construction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Double Insulation Construction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">
                Double insulation consists of two independent insulation systems that work together 
                to provide comprehensive protection against electric shock.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                  <h5 className="text-green-400 font-semibold mb-2">Basic Insulation</h5>
                  <p className="text-sm mb-2">Primary protection layer:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Directly applied to live parts</li>
                    <li>• Prevents direct contact during normal use</li>
                    <li>• Wire insulation and component housings</li>
                    <li>• Must withstand working voltage</li>
                  </ul>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                  <h5 className="text-purple-400 font-semibold mb-2">Supplementary Insulation</h5>
                  <p className="text-sm mb-2">Secondary protection layer:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Independent of basic insulation</li>
                    <li>• Provides protection if basic fails</li>
                    <li>• Additional barriers and spacing</li>
                    <li>• Must meet separate requirements</li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
                  <h5 className="text-orange-400 font-semibold mb-2">Reinforced Insulation</h5>
                  <p className="text-sm mb-2">Alternative single system:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Single insulation system</li>
                    <li>• Equivalent to double insulation</li>
                    <li>• Enhanced materials and construction</li>
                    <li>• Same safety level as double</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Construction Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Construction Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Material Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Insulation Materials</h5>
                      <p className="text-xs">Must resist electrical, thermal, and mechanical stress throughout equipment life</p>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Clearances and Creepage</h5>
                      <p className="text-xs">Minimum distances through air and over surfaces between live parts and accessible surfaces</p>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Barrier Integrity</h5>
                      <p className="text-xs">Physical barriers must prevent direct access to live parts even with tool assistance</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Design Constraints</h4>
                  <div className="space-y-2">
                    <div className="bg-yellow-900/20 border border-yellow-400/30 p-3 rounded">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">No Earthed Metal Parts</h5>
                      <p className="text-xs">Accessible metalwork must not be connected to earth or be capable of becoming live</p>
                    </div>
                    <div className="bg-red-900/20 border border-red-500/30 p-3 rounded">
                      <h5 className="text-red-400 font-semibold text-sm mb-1">Metal Enclosures</h5>
                      <p className="text-xs">If metal cases are used, they must be completely enclosed by insulating material</p>
                    </div>
                    <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                      <h5 className="text-green-400 font-semibold text-sm mb-1">Cable Entry</h5>
                      <p className="text-xs">Two-core cables only, with proper strain relief and insulation coordination</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Class II Equipment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Home className="h-5 w-5" />
                Common Class II Equipment Types
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Portable Tools</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Hair dryers</li>
                    <li>• Electric shavers</li>
                    <li>• Small drills</li>
                    <li>• Soldering irons</li>
                    <li>• Hot air guns</li>
                    <li>• Jigsaws</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Household Items</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Table lamps</li>
                    <li>• Electric blankets</li>
                    <li>• Radios</li>
                    <li>• CD/DVD players</li>
                    <li>• Small TVs</li>
                    <li>• Phone chargers</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">IT Equipment</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Laptop computers</li>
                    <li>• Tablet chargers</li>
                    <li>• Portable speakers</li>
                    <li>• External hard drives</li>
                    <li>• Wi-Fi routers</li>
                    <li>• LED monitors</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Specialist Equipment</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Medical devices</li>
                    <li>• Audio equipment</li>
                    <li>• Laboratory instruments</li>
                    <li>• Educational equipment</li>
                    <li>• Measurement tools</li>
                    <li>• Control equipment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                PAT Testing Requirements for Class II Equipment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">
                Class II equipment has specific testing requirements that differ from Class I equipment 
                due to the absence of earthed parts and reliance on insulation for protection.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-900/20 border border-green-500/30 p-5 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-3">Required Tests</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Visual inspection (critical for insulation assessment)</li>
                    <li>• Insulation resistance test (between live parts and accessible surfaces)</li>
                    <li>• Functional test (where appropriate)</li>
                    <li>• Protective conductor current test (if any earthed parts present)</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-500/30 p-5 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-3">Tests NOT Required</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Earth continuity test (no earth connection)</li>
                    <li>• Earth leakage current test (typically)</li>
                    <li>• Polarity test (no earth reference)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Insulation Resistance Test Parameters</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Test Voltage:</strong> 500V DC</p>
                    <p><strong>Minimum Resistance:</strong> 2MΩ (BS 7671)</p>
                  </div>
                  <div>
                    <p><strong>Test Duration:</strong> Typically 1 minute</p>
                    <p><strong>Between:</strong> Live parts and accessible surfaces</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-yellow-900/20 border border-yellow-400/30 p-6 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Case Study: Office Desk Lamp Insulation Failure</h4>
                <div className="space-y-3">
                  <p>
                    <strong>Situation:</strong> During routine PAT testing, a Class II desk lamp shows an insulation resistance of 0.8MΩ, below the required 2MΩ minimum. The lamp appears undamaged and functions normally.
                  </p>
                  <p>
                    <strong>Investigation:</strong> Visual inspection reveals the plastic housing has a small crack near the base where the cable enters, potentially compromising the supplementary insulation barrier.
                  </p>
                  <p>
                    <strong>The Risk:</strong> With compromised double insulation, the lamp no longer meets Class II safety requirements and could present a shock hazard if the basic insulation also fails.
                  </p>
                  <p>
                    <strong>The Action:</strong> The lamp was immediately removed from service and replaced. The failed unit was examined further, revealing moisture ingress through the crack had affected insulation properties.
                  </p>
                  <p>
                    <strong>The Lesson:</strong> Class II equipment safety depends entirely on insulation integrity. Small physical damage can compromise the double insulation system, making thorough visual inspection and insulation testing crucial.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold">Key Takeaway:</p>
                <p className="mt-2">
                  Class II equipment achieves electrical safety through double or reinforced insulation rather than earthing. 
                  The integrity of this insulation system is critical to safety, making visual inspection and insulation 
                  resistance testing the most important PAT procedures for this equipment class. Understanding the construction 
                  principles helps identify potential failure modes and appropriate testing strategies.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          {renderQuiz()}
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule2Section3;