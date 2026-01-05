import { ArrowLeft, Zap, BookOpen, Target, Shield, AlertTriangle, CheckCircle, Wrench, Settings, Home } from 'lucide-react';
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
    question: "What is the primary safety mechanism in Class I equipment?",
    options: [
      "Double insulation",
      "Basic insulation plus protective earthing",
      "Extra low voltage",
      "Reinforced insulation"
    ],
    correctAnswer: 1,
    explanation: "Class I equipment relies on basic insulation for normal protection, with protective earthing providing safety in case the basic insulation fails."
  },
  {
    id: 2,
    question: "What is the maximum acceptable earth continuity resistance for most Class I appliances?",
    options: [
      "0.1Ω",
      "0.5Ω", 
      "1.0Ω",
      "2.0Ω"
    ],
    correctAnswer: 0,
    explanation: "The maximum earth continuity resistance is typically 0.1Ω for Class I appliances, ensuring effective fault current flow for rapid disconnection."
  },
  {
    id: 3,
    question: "Why must Class I equipment have a three-core cable?",
    options: [
      "For higher power rating",
      "To provide live, neutral, and earth conductors",
      "For better insulation",
      "To meet manufacturing standards"
    ],
    correctAnswer: 1,
    explanation: "Class I equipment requires three-core cables to provide live (L), neutral (N), and earth (E) conductors, with the earth conductor being essential for safety."
  },
  {
    id: 4,
    question: "What happens if the earth connection fails in Class I equipment?",
    options: [
      "The equipment stops working immediately",
      "The equipment continues working but becomes potentially dangerous",
      "The fuse blows automatically",
      "The insulation resistance increases"
    ],
    correctAnswer: 1,
    explanation: "If the earth connection fails, Class I equipment may continue to operate normally, but if a fault develops, the metal casing could become live and dangerous."
  },
  {
    id: 5,
    question: "Which test is most critical for Class I equipment safety?",
    options: [
      "Insulation resistance test only",
      "Earth continuity test only",
      "Both earth continuity and insulation resistance tests",
      "Functional test only"
    ],
    correctAnswer: 2,
    explanation: "Both tests are critical: earth continuity ensures the safety path works, while insulation resistance confirms the basic insulation is intact."
  }
];

const PATTestingModule2Section2 = () => {
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
              Test your understanding of Class I equipment and protective earthing with this 5-question quiz.
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
                {score >= 4 ? 'Excellent understanding of Class I equipment!' : score >= 3 ? 'Good knowledge!' : 'Review the material and try again!'}
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
              <Zap className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Class I: Protective Earthing Explained
                </h1>
                <p className="text-xl text-gray-400">
                  Module 2, Section 2
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                35 minutes
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
                Class I equipment represents the most common type of electrical appliance found in workplaces 
                and homes. These appliances rely on a dual protection system: basic insulation for normal 
                operation and protective earthing as a safety backup. Understanding how this system works 
                is crucial for effective PAT testing and ensuring user safety.
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
                <li>Define Class I equipment and its safety characteristics</li>
                <li>Explain how protective earthing works to prevent electric shock</li>
                <li>Understand earth continuity requirements and testing procedures</li>
                <li>Identify common Class I appliances and their features</li>
                <li>Recognise the limitations and potential failures of earthing systems</li>
                <li>Apply appropriate PAT testing procedures for Class I equipment</li>
              </ul>
            </CardContent>
          </Card>

          {/* What is Class I Equipment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                What is Class I Equipment?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 p-5 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-3">Definition</h4>
                <p className="mb-3">
                  Class I equipment has basic insulation and accessible conductive parts are connected 
                  to a protective earthing conductor as a means of protection against electric shock 
                  in case of failure of the basic insulation.
                </p>
                <div className="bg-red-800/30 p-3 rounded text-sm">
                  <strong>Key Point:</strong> Class I equipment requires connection to the supply earthing 
                  system for safe operation.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Essential Characteristics</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Basic insulation around live parts</li>
                    <li>• Exposed metalwork earthed</li>
                    <li>• Three-core supply cable (L, N, E)</li>
                    <li>• Earth continuity path essential</li>
                    <li>• Marked with earth symbol ⏚</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Protection Principle</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Normal operation: basic insulation protects</li>
                    <li>• Fault condition: earth path carries fault current</li>
                    <li>• High fault current trips protective device</li>
                    <li>• Rapid disconnection prevents shock</li>
                    <li>• Two levels of protection working together</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How Protective Earthing Works */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                How Protective Earthing Works
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">
                Protective earthing creates a deliberately low-impedance path for fault current, 
                ensuring automatic disconnection occurs quickly enough to prevent dangerous shock.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-2">Normal Operation</h5>
                  <p className="text-sm mb-2">No fault present:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Basic insulation prevents contact</li>
                    <li>• No current flows in earth conductor</li>
                    <li>• Metal case remains at earth potential</li>
                    <li>• Equipment operates safely</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-400/30 p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-2">Fault Condition</h5>
                  <p className="text-sm mb-2">Insulation failure occurs:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Live conductor contacts metal case</li>
                    <li>• Current flows through earth path</li>
                    <li>• Fault current creates potential rise</li>
                    <li>• Protective device operation imminent</li>
                  </ul>
                </div>

                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                  <h5 className="text-green-400 font-semibold mb-2">Safety Action</h5>
                  <p className="text-sm mb-2">Automatic disconnection:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Fuse blows or circuit breaker trips</li>
                    <li>• Supply disconnected rapidly</li>
                    <li>• Dangerous condition eliminated</li>
                    <li>• User protected from shock</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earth Continuity Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Earth Continuity Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">
                The earth continuity path must have sufficiently low resistance to ensure effective fault 
                current flow. PAT testing verifies this critical safety parameter.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Resistance Limits</h4>
                  <div className="space-y-3">
                    <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                      <p className="text-green-400 font-semibold text-sm">Standard Equipment</p>
                      <p className="text-xs">Maximum: <strong>0.1Ω</strong></p>
                      <p className="text-xs">Covers most Class I appliances</p>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-400/30 p-3 rounded">
                      <p className="text-yellow-400 font-semibold text-sm">Heating Appliances</p>
                      <p className="text-xs">Maximum: <strong>0.1Ω + 0.02Ω per metre of cable</strong></p>
                      <p className="text-xs">Allows for longer cable lengths</p>
                    </div>
                    <div className="bg-orange-900/20 border border-orange-500/30 p-3 rounded">
                      <p className="text-orange-400 font-semibold text-sm">IT Equipment</p>
                      <p className="text-xs">Maximum: <strong>0.1Ω</strong></p>
                      <p className="text-xs">Same as standard equipment</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Testing Process</h4>
                  <div className="space-y-2">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <p className="text-yellow-400 font-semibold text-sm mb-1">1. Equipment Preparation</p>
                      <p className="text-xs">Disconnect from supply, remove any removable parts that could affect earth path</p>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <p className="text-yellow-400 font-semibold text-sm mb-1">2. Test Connection</p>
                      <p className="text-xs">Connect test leads between earth pin and accessible earthed metalwork</p>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <p className="text-yellow-400 font-semibold text-sm mb-1">3. Measurement</p>
                      <p className="text-xs">Apply test current (typically 10A or 25A) and measure resistance</p>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <p className="text-yellow-400 font-semibold text-sm mb-1">4. Evaluation</p>
                      <p className="text-xs">Compare result against appropriate limit for equipment type</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Class I Equipment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Common Class I Equipment Types
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Power Tools</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Electric drills</li>
                    <li>• Angle grinders</li>
                    <li>• Circular saws</li>
                    <li>• Sanders</li>
                    <li>• Welding equipment</li>
                    <li>• Compressors</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Kitchen Equipment</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Electric kettles</li>
                    <li>• Microwave ovens</li>
                    <li>• Food processors</li>
                    <li>• Electric ovens</li>
                    <li>• Dishwashers</li>
                    <li>• Refrigerators</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Office Equipment</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Desktop computers</li>
                    <li>• Laser printers</li>
                    <li>• Photocopiers</li>
                    <li>• Projectors</li>
                    <li>• Laminating machines</li>
                    <li>• Shredders</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Industrial Equipment</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Motor drives</li>
                    <li>• Machine tools</li>
                    <li>• Heating equipment</li>
                    <li>• Pumps</li>
                    <li>• Ventilation fans</li>
                    <li>• Control panels</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Potential Failures and Limitations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Potential Failures and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">
                Understanding how earthing protection can fail helps PAT testers identify potential problems 
                and emphasise the importance of regular testing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-900/20 border border-red-500/30 p-5 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-3">Common Earth Path Failures</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Broken earth conductor in cable</li>
                    <li>• Loose earth connections in plug</li>
                    <li>• Corrosion at earth connections</li>
                    <li>• Missing earth conductor (incorrect wiring)</li>
                    <li>• High resistance joints</li>
                    <li>• Damage during maintenance or repair</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-400/30 p-5 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">System Limitations</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Depends on supply earthing system quality</li>
                    <li>• Earth path resistance affects disconnection time</li>
                    <li>• May not protect against all shock scenarios</li>
                    <li>• Requires proper installation and maintenance</li>
                    <li>• Can be compromised by building modifications</li>
                    <li>• Environmental factors affect performance</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-3">Why Regular Testing Matters</h4>
                <p className="text-sm">
                  Earth continuity can deteriorate over time due to mechanical stress, corrosion, and 
                  general wear. Regular PAT testing identifies these degradations before they compromise safety, 
                  ensuring the protective earthing system remains effective throughout the equipment's life.
                </p>
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
                <h4 className="text-yellow-400 font-semibold mb-3">Case Study: Workshop Drill Earth Failure</h4>
                <div className="space-y-3">
                  <p>
                    <strong>Situation:</strong> During routine PAT testing, a workshop drill shows earth continuity of 2.5Ω, well above the 0.1Ω limit. The drill appears to function normally and shows no visible damage.
                  </p>
                  <p>
                    <strong>Investigation:</strong> Further inspection reveals the earth conductor has broken inside the cable near the plug due to repeated flexing, but the other conductors remain intact.
                  </p>
                  <p>
                    <strong>The Risk:</strong> If an insulation fault developed, the metal drill case could become live at mains voltage with no protective disconnection occurring.
                  </p>
                  <p>
                    <strong>The Action:</strong> The drill was immediately removed from service and the cable replaced, restoring earth continuity to 0.05Ω.
                  </p>
                  <p>
                    <strong>The Lesson:</strong> Equipment can appear and function normally whilst having dangerous earth path failures — only PAT testing reveals these hidden hazards.
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
                  Class I equipment relies on protective earthing as its primary safety mechanism in fault conditions. 
                  The earth continuity path must be verified as intact and low resistance to ensure effective protection. 
                  This makes earth continuity testing the most critical test for Class I equipment safety.
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

export default PATTestingModule2Section2;