import { ArrowLeft, Battery, BookOpen, Target, Zap, Shield, AlertTriangle, CheckCircle, Settings, Cpu } from 'lucide-react';
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
    question: "What is the maximum voltage for SELV systems under normal conditions?",
    options: [
      "25V AC or 60V DC",
      "50V AC or 120V DC",
      "12V AC or 30V DC",
      "100V AC or 150V DC"
    ],
    correctAnswer: 1,
    explanation: "SELV systems are limited to 50V AC or 120V DC under normal conditions to ensure safety through low voltage."
  },
  {
    id: 2,
    question: "What does 'SELV' stand for?",
    options: [
      "Special Extra-Low Voltage",
      "Standard Electronic Low Voltage",
      "Safety Extra-Low Voltage",
      "Secure Equipment Low Voltage"
    ],
    correctAnswer: 2,
    explanation: "SELV stands for Safety Extra-Low Voltage, indicating a system designed for safety through voltage limitation."
  },
  {
    id: 3,
    question: "What is the key requirement for Class III equipment power supplies?",
    options: [
      "They must be earthed",
      "They must be double insulated",
      "They must provide electrical separation from mains",
      "They must have RCD protection"
    ],
    correctAnswer: 2,
    explanation: "Class III equipment must be supplied from sources with electrical separation from mains, typically through safety transformers."
  },
  {
    id: 4,
    question: "Which symbol indicates Class III equipment?",
    options: [
      "Earth symbol",
      "Square within square",
      "Roman numeral III",
      "Lightning bolt in triangle"
    ],
    correctAnswer: 2,
    explanation: "Class III equipment is marked with the Roman numeral III symbol to indicate extra-low voltage operation."
  },
  {
    id: 5,
    question: "Why do Class III appliances require minimal PAT testing?",
    options: [
      "They are too small to test",
      "The low voltage makes them inherently safe",
      "They have built-in protection",
      "They are only used occasionally"
    ],
    correctAnswer: 1,
    explanation: "The extra-low voltage in Class III equipment makes electric shock unlikely under normal conditions, reducing testing requirements."
  }
];

const PATTestingModule2Section4 = () => {
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
              Test your understanding of Class III equipment and SELV systems with this 5-question quiz.
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
                {score >= 4 ? 'Excellent understanding of Class III equipment!' : score >= 3 ? 'Good knowledge!' : 'Review the material and try again!'}
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
              <Battery className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Class III: Extra-Low Voltage and SELV
                </h1>
                <p className="text-xl text-gray-400">
                  Module 2, Section 4
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                25 minutes
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
                Class III equipment represents the safest category of electrical appliances, using extra-low voltage 
                to minimise the risk of electric shock. These devices operate at voltages so low that under normal 
                conditions, contact with live parts is not dangerous. Understanding SELV (Safety Extra-Low Voltage) 
                principles and Class III requirements is important for comprehensive electrical safety knowledge.
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
                <li>Define Class III equipment and SELV system principles</li>
                <li>Understand voltage limits and safety requirements for extra-low voltage</li>
                <li>Identify common applications of Class III equipment</li>
                <li>Recognise the role of safety transformers and isolation</li>
                <li>Understand why Class III equipment requires minimal PAT testing</li>
                <li>Apply appropriate safety considerations for SELV installations</li>
              </ul>
            </CardContent>
          </Card>

          {/* What is Class III Equipment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                What is Class III Equipment?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-green-900/20 border border-green-500/30 p-5 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-3">Definition</h4>
                <p className="mb-3">
                  Class III equipment is designed to operate from Safety Extra-Low Voltage (SELV) sources 
                  and has no internal voltages higher than the SELV limits. Protection against electric shock 
                  relies on the supply voltage being limited to extra-low voltage and on no voltage higher 
                  than SELV being generated within the equipment.
                </p>
                <div className="bg-green-800/30 p-3 rounded text-sm">
                  <strong>Key Point:</strong> Safety is achieved through voltage limitation rather than 
                  insulation or earthing methods.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Essential Characteristics</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Extra-low voltage operation (≤50V AC)</li>
                    <li>• SELV power supply required</li>
                    <li>• No internal voltage generation above SELV</li>
                    <li>• Marked with Roman numeral III</li>
                    <li>• Often battery-powered or transformer-fed</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Safety Principle</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Low voltage prevents dangerous shock</li>
                    <li>• Inherently safe through design</li>
                    <li>• No reliance on user behaviour</li>
                    <li>• Minimal protective measures needed</li>
                    <li>• Suitable for wet or conductive environments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SELV Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Safety Extra-Low Voltage (SELV) Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">
                SELV systems provide the power source for Class III equipment and must meet specific 
                requirements to maintain safety through voltage limitation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-2">Voltage Limits</h5>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-800/30 p-2 rounded">
                      <p><strong>AC:</strong> ≤50V RMS</p>
                    </div>
                    <div className="bg-blue-800/30 p-2 rounded">
                      <p><strong>DC:</strong> ≤120V ripple-free</p>
                    </div>
                    <div className="bg-blue-800/30 p-2 rounded">
                      <p><strong>Pulsating DC:</strong> ≤140V peak</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                  <h5 className="text-purple-400 font-semibold mb-2">Source Requirements</h5>
                  <ul className="text-xs space-y-1">
                    <li>• Safety transformer (BS EN 61558)</li>
                    <li>• Motor generator with equivalent isolation</li>
                    <li>• Battery systems</li>
                    <li>• Electronic power supply with isolation</li>
                    <li>• Independent source from earth</li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
                  <h5 className="text-orange-400 font-semibold mb-2">Isolation Requirements</h5>
                  <ul className="text-xs space-y-1">
                    <li>• No connection to earth</li>
                    <li>• No connection to other circuits</li>
                    <li>• Electrical separation from mains</li>
                    <li>• Independent of protective conductors</li>
                    <li>• Double insulation from higher voltages</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Applications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Common Class III Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Portable Devices</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Mobile phones</li>
                    <li>• Tablets</li>
                    <li>• Cordless tools</li>
                    <li>• Torches</li>
                    <li>• Portable radios</li>
                    <li>• Digital cameras</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Control Systems</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Door entry systems</li>
                    <li>• Security keypads</li>
                    <li>• Thermostat controls</li>
                    <li>• Remote controls</li>
                    <li>• Sensor networks</li>
                    <li>• Building automation</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Safety Applications</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Bathroom equipment</li>
                    <li>• Pool/spa equipment</li>
                    <li>• Medical devices</li>
                    <li>• Emergency lighting</li>
                    <li>• Safety systems</li>
                    <li>• Toys and games</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Specialised Equipment</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Laboratory instruments</li>
                    <li>• Educational equipment</li>
                    <li>• Communication devices</li>
                    <li>• Automotive electronics</li>
                    <li>• Marine equipment</li>
                    <li>• Agricultural sensors</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Transformers */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Safety Transformers and Power Supplies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">
                The power supply for Class III equipment is critical to maintaining SELV conditions 
                and ensuring continued safety through voltage limitation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Safety Transformer Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Double Insulation</h5>
                      <p className="text-xs">Primary and secondary windings separated by double insulation equivalent to Class II</p>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">No Earth Connection</h5>
                      <p className="text-xs">Secondary circuit must have no connection to earth or other circuits</p>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Voltage Limitation</h5>
                      <p className="text-xs">Output voltage limited by design, not just by loading</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Installation Considerations</h4>
                  <div className="space-y-2">
                    <div className="bg-yellow-900/20 border border-yellow-400/30 p-3 rounded">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Cable Separation</h5>
                      <p className="text-xs">SELV circuits must be physically separated from higher voltage circuits</p>
                    </div>
                    <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                      <h5 className="text-green-400 font-semibold text-sm mb-1">Marking and Identification</h5>
                      <p className="text-xs">SELV circuits should be clearly identified and marked appropriately</p>
                    </div>
                    <div className="bg-blue-900/20 border border-yellow-400/30 p-3 rounded">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-1">Access and Maintenance</h5>
                      <p className="text-xs">Design should prevent accidental connection to higher voltage circuits</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PAT Testing Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                PAT Testing for Class III Equipment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-green-900/20 border border-green-500/30 p-5 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-3">Minimal Testing Requirements</h4>
                <p className="mb-3">
                  Class III equipment requires the least PAT testing of all classes because the low voltage 
                  makes electric shock unlikely under normal conditions.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Visual inspection (primary requirement)</li>
                  <li>• Functional testing where appropriate</li>
                  <li>• Verification of SELV supply (if applicable)</li>
                  <li>• No electrical safety tests typically required</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Visual Inspection Focus</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Physical damage to equipment</li>
                    <li>• Power supply/charger condition</li>
                    <li>• Cable and connector integrity</li>
                    <li>• Appropriate voltage markings</li>
                    <li>• Evidence of overheating</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Documentation Requirements</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Record equipment identification</li>
                    <li>• Note SELV supply details</li>
                    <li>• Document any damage found</li>
                    <li>• Functional test results</li>
                    <li>• Next test due date</li>
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
                <h4 className="text-yellow-400 font-semibold mb-3">Case Study: Bathroom Mirror Light SELV System</h4>
                <div className="space-y-3">
                  <p>
                    <strong>Situation:</strong> A hotel bathroom features LED mirror lighting supplied from a 12V transformer. During refurbishment, an electrician discovers the transformer is installed within the bathroom zone rather than outside.
                  </p>
                  <p>
                    <strong>Investigation:</strong> Although the LED lights are Class III and operate safely at 12V, the transformer supplying them is not suitable for bathroom installation and could create a safety risk.
                  </p>
                  <p>
                    <strong>The Issue:</strong> The SELV source (transformer) must be located outside bathroom zones to maintain the safety integrity of the system.
                  </p>
                  <p>
                    <strong>The Solution:</strong> The transformer was relocated outside the bathroom with appropriate cable routing to maintain separation between SELV and mains circuits.
                  </p>
                  <p>
                    <strong>The Lesson:</strong> Class III equipment safety depends not just on the equipment itself, but on the entire SELV system including the source and installation methods.
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
                  Class III equipment achieves safety through extra-low voltage operation rather than protective measures. 
                  Whilst the equipment itself requires minimal PAT testing, the integrity of the SELV supply system is 
                  crucial to maintaining safety. Understanding SELV principles helps identify appropriate applications 
                  and ensures proper installation and maintenance of these inherently safe systems.
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

export default PATTestingModule2Section4;