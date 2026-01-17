import { ArrowLeft, Layers, BookOpen, Target, Shield, Zap, Info, AlertTriangle, CheckCircle } from 'lucide-react';
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
    question: "What does the IEC classification system primarily categorise?",
    options: [
      "Equipment voltage ratings",
      "Equipment protection methods against electric shock",
      "Equipment power consumption",
      "Equipment manufacturing standards"
    ],
    correctAnswer: 1,
    explanation: "The IEC classification system categorises electrical equipment based on the method of protection against electric shock, with Class I, II, and III representing different safety approaches."
  },
  {
    id: 2,
    question: "Which symbol indicates Class II equipment?",
    options: [
      "Earth symbol",
      "Square within a square",
      "Three horizontal lines",
      "Lightning bolt"
    ],
    correctAnswer: 1,
    explanation: "Class II equipment is marked with a square within a square symbol, indicating double insulation protection."
  },
  {
    id: 3,
    question: "What is the maximum voltage for Class III equipment?",
    options: [
      "12V",
      "24V", 
      "50V",
      "110V"
    ],
    correctAnswer: 2,
    explanation: "Class III equipment operates at Safety Extra Low Voltage (SELV), which is typically below 50V AC or 120V DC under normal conditions."
  },
  {
    id: 4,
    question: "Why is equipment classification important for PAT testing?",
    options: [
      "It determines the colour of test labels",
      "It determines which tests are required and test parameters",
      "It determines how often equipment needs testing",
      "It determines who can perform the testing"
    ],
    correctAnswer: 1,
    explanation: "Equipment classification determines the specific tests required, test parameters, and acceptance criteria for PAT testing, as each class has different safety mechanisms."
  },
  {
    id: 5,
    question: "What does 'basic insulation' provide?",
    options: [
      "Protection against direct contact only",
      "Protection against both direct and indirect contact",
      "Protection against overcurrent",
      "Protection against overvoltage"
    ],
    correctAnswer: 0,
    explanation: "Basic insulation provides protection against direct contact with live parts under normal operating conditions, but requires additional protection (like earthing) for complete safety."
  }
];

const PATTestingModule2Section1 = () => {
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
              Test your understanding of appliance classification with this 5-question quiz.
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
                {score >= 4 ? 'Excellent understanding of appliance classification!' : score >= 3 ? 'Good knowledge!' : 'Review the material and try again!'}
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
    <div className="overflow-x-hidden bg-[#1a1a1a] space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/pat-testing-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Layers className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Overview of Appliance Classes
                </h1>
                <p className="text-xl text-gray-400">
                  Module 2, Section 1
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2.1
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
                Understanding how electrical equipment is classified is fundamental to effective PAT testing. 
                The International Electrotechnical Commission (IEC) classification system categorises equipment 
                based on the method of protection against electric shock. This classification determines which 
                tests are required, what parameters to measure, and what constitutes a pass or fail result.
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
                <li>Understand the IEC classification system for electrical equipment</li>
                <li>Identify the three main appliance classes and their safety principles</li>
                <li>Recognise classification symbols and markings on equipment</li>
                <li>Understand how classification affects PAT testing requirements</li>
                <li>Apply classification knowledge to determine appropriate test procedures</li>
              </ul>
            </CardContent>
          </Card>

          {/* The IEC Classification System */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Info className="h-5 w-5" />
                The IEC Classification System
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">
                The International Electrotechnical Commission (IEC) has developed a standardised way to classify 
                electrical equipment based on how it protects users from electric shock. This system is used 
                worldwide and forms the basis for testing requirements in PAT procedures.
              </p>
              
              <div className="bg-blue-900/20 border border-yellow-400/30 p-5 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Why Classification Matters</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Determines which electrical tests are required</li>
                  <li>• Sets the pass/fail criteria for each test</li>
                  <li>• Influences testing frequency recommendations</li>
                  <li>• Helps identify potential safety risks</li>
                  <li>• Ensures appropriate test equipment is used</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* The Three Classes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                The Three Equipment Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-900/20 border border-red-500/30 p-5 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-6 w-6 text-red-400" />
                    <h5 className="text-red-400 font-semibold text-lg">Class I</h5>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Earthed Equipment</p>
                    <ul className="text-sm space-y-1">
                      <li>• Basic insulation plus earthing</li>
                      <li>• Three-core cable (L, N, E)</li>
                      <li>• Metal case connected to earth</li>
                      <li>• Requires earth continuity testing</li>
                    </ul>
                    <div className="bg-red-800/30 p-2 rounded text-xs">
                      <strong>Symbol:</strong> Earth symbol ⏚
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-yellow-400/30 p-5 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-6 w-6 text-yellow-400" />
                    <h5 className="text-yellow-400 font-semibold text-lg">Class II</h5>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Double Insulated</p>
                    <ul className="text-sm space-y-1">
                      <li>• Double or reinforced insulation</li>
                      <li>• Two-core cable (L, N only)</li>
                      <li>• No earthed metal parts</li>
                      <li>• Insulation resistance testing</li>
                    </ul>
                    <div className="bg-blue-800/30 p-2 rounded text-xs">
                      <strong>Symbol:</strong> Square within square ⧈
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 border border-green-500/30 p-5 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-6 w-6 text-green-400" />
                    <h5 className="text-green-400 font-semibold text-lg">Class III</h5>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Extra Low Voltage</p>
                    <ul className="text-sm space-y-1">
                      <li>• Safety Extra Low Voltage (SELV)</li>
                      <li>• Voltage below 50V AC</li>
                      <li>• Isolated supply required</li>
                      <li>• Limited testing required</li>
                    </ul>
                    <div className="bg-green-800/30 p-2 rounded text-xs">
                      <strong>Symbol:</strong> Roman numeral III
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protection Principles */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Protection Principles Explained
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Basic Insulation</h4>
                  <p className="text-sm mb-3">
                    Provides protection against direct contact with live parts under normal operating conditions. 
                    This is the fundamental level of protection present in all electrical equipment.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Prevents touching live conductors</li>
                    <li>• Materials like plastic, rubber, enamel</li>
                    <li>• Must withstand normal operating stress</li>
                    <li>• Can fail due to damage or deterioration</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Additional Protection Methods</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Protective Earthing</h5>
                      <p className="text-xs">Creates a low-impedance path for fault current, enabling automatic disconnection.</p>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Double Insulation</h5>
                      <p className="text-xs">Two independent layers of insulation provide backup if one fails.</p>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Extra Low Voltage</h5>
                      <p className="text-xs">Voltage so low that contact is inherently safe under normal conditions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Identification and Markings */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Equipment Identification and Markings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">
                Proper identification of equipment class is crucial for determining the correct testing procedure. 
                Manufacturers are required to mark equipment with appropriate symbols and information.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-900/20 border border-purple-500/30 p-5 rounded-lg">
                  <h4 className="text-purple-400 font-semibold mb-3">Where to Look for Markings</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Equipment nameplate or rating label</li>
                    <li>• Underside or rear of equipment</li>
                    <li>• Plug or cable markings</li>
                    <li>• User manual or documentation</li>
                    <li>• Equipment case moulding</li>
                    <li>• Power supply unit labels</li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 border border-orange-500/30 p-5 rounded-lg">
                  <h4 className="text-orange-400 font-semibold mb-3">When Markings Are Missing</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Examine cable configuration (2 or 3 core)</li>
                    <li>• Check for exposed earthed metal parts</li>
                    <li>• Consider typical class for equipment type</li>
                    <li>• Consult manufacturer specifications</li>
                    <li>• Apply worst-case testing requirements</li>
                    <li>• Document assumptions made</li>
                  </ul>
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
                <h4 className="text-yellow-400 font-semibold mb-3">Case Study: Mixed Equipment in Office Environment</h4>
                <div className="space-y-3">
                  <p>
                    <strong>Situation:</strong> A PAT tester arrives at an office to test various equipment but notices the computer monitor has no visible class marking, whilst the desktop PC clearly shows a Class I symbol.
                  </p>
                  <p>
                    <strong>Investigation:</strong> Examining the monitor reveals a 3-core cable with earth conductor, metal case, and typical characteristics of Class I equipment, despite the missing symbol.
                  </p>
                  <p>
                    <strong>Decision:</strong> The tester correctly classifies the monitor as Class I and performs full earth continuity and insulation resistance testing.
                  </p>
                  <p>
                    <strong>The Lesson:</strong> Don't rely solely on markings — understand the physical characteristics and safety principles of each class to make informed decisions.
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
                  Equipment classification is the foundation of effective PAT testing. Understanding the three classes 
                  and their protection principles enables you to select appropriate tests, set correct parameters, 
                  and interpret results accurately. Always verify classification before testing begins.
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

export default PATTestingModule2Section1;