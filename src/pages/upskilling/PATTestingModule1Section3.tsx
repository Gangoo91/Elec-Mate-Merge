import { ArrowLeft, BookOpen, Target, FileText, AlertTriangle, CheckCircle, Zap, Shield, Monitor, Wrench, Home } from 'lucide-react';
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
    question: "What's the difference between Class I and Class II equipment?",
    options: [
      "Class I is newer, Class II is older equipment",
      "Class I relies on earthing for protection, Class II uses double insulation",
      "Class I is portable, Class II is fixed",
      "Class I is low voltage, Class II is high voltage"
    ],
    correctAnswer: 1,
    explanation: "Class I equipment relies on earthing for protection and must be tested. Class II equipment uses double insulation and typically only needs visual inspection."
  },
  {
    id: 2,
    question: "Does a kettle need PAT testing?",
    options: [
      "No, it's a kitchen appliance",
      "Only if it's portable",
      "Yes, it's Class I portable equipment",
      "Only in commercial kitchens"
    ],
    correctAnswer: 2,
    explanation: "A kettle is Class I portable equipment that requires both visual inspection and electrical testing as part of PAT."
  },
  {
    id: 3,
    question: "Is a wall-mounted air conditioning unit 'portable'?",
    options: [
      "Yes, because it plugs in",
      "No, it's fixed equipment and not covered by PAT",
      "Only if it can be easily removed",
      "Yes, if it's under 18kg"
    ],
    correctAnswer: 1,
    explanation: "Wall-mounted air conditioning units are considered fixed equipment and fall outside the scope of PAT testing, even if they have plugs."
  },
  {
    id: 4,
    question: "Should laptop chargers be tested?",
    options: [
      "No, they're too small",
      "Only the laptop itself",
      "Yes, chargers are portable equipment",
      "Only if they're damaged"
    ],
    correctAnswer: 2,
    explanation: "Laptop chargers are portable equipment and should be included in PAT testing as they can pose electrical safety risks."
  },
  {
    id: 5,
    question: "Name one item that might be excluded from PAT.",
    options: [
      "Desktop computers",
      "Hand-held battery tools with no mains connection",
      "Extension leads",
      "Portable heaters"
    ],
    correctAnswer: 1,
    explanation: "Hand-held battery tools with no mains connection (purely battery operated) are excluded from PAT testing as they don't connect to the mains electrical supply."
  }
];

const PATTestingModule1Section3 = () => {
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
    // Debug log to check state
    console.log('Quiz state - started:', quizStarted, 'showResults:', showResults);
    
    if (!quizStarted) {
      return (
        <Card className="bg-gradient-to-r from-yellow-400/10 to-elec-gray border-yellow-400/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">🧠 Knowledge Check Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Test your understanding of equipment types covered by PAT testing with this 5-question quiz.
            </p>
            <Button 
              onClick={() => {
                console.log('Starting quiz...');
                setQuizStarted(true);
              }}
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
                {score >= 4 ? 'Excellent understanding of PAT equipment types!' : score >= 3 ? 'Good knowledge!' : 'Review the material and try again!'}
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
              <FileText className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Types of Equipment Covered by PAT
                </h1>
                <p className="text-xl text-gray-400">
                  Module 1, Section 3
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.3
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
                Not everything with a plug needs PAT testing — but many things do. This section breaks down what's in scope, 
                helping you understand which equipment requires testing and which doesn't. Getting this right is crucial 
                for effective PAT programmes that cover all necessary equipment without wasting time on items outside the scope.
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
                <li>Understand what "portable appliance" means</li>
                <li>Distinguish between Class I and Class II equipment</li>
                <li>Identify common equipment types that require PAT</li>
                <li>Clarify what doesn't need testing</li>
              </ul>
            </CardContent>
          </Card>

          {/* Equipment Classification */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Equipment Classification
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-red-400" />
                    <h5 className="text-red-400 font-semibold">Class I Equipment</h5>
                  </div>
                  <p className="text-sm mb-2">Earthed equipment — must be tested</p>
                  <ul className="text-sm space-y-1">
                    <li>• Relies on earthing for protection</li>
                    <li>• Has exposed metal parts</li>
                    <li>• Requires electrical testing</li>
                    <li>• Examples: kettles, toasters, drills</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-yellow-400 font-semibold">Class II Equipment</h5>
                  </div>
                  <p className="text-sm mb-2">Double insulated — visual inspection only</p>
                  <ul className="text-sm space-y-1">
                    <li>• Uses double insulation</li>
                    <li>• No exposed metal parts</li>
                    <li>• Usually visual inspection only</li>
                    <li>• Examples: phone chargers, radios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Equipment Types */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Common Equipment Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">IT Equipment</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Desktop computers</li>
                    <li>• Monitors</li>
                    <li>• Printers</li>
                    <li>• Laptop chargers</li>
                    <li>• Network equipment</li>
                    <li>• Servers</li>
                    <li>• Projectors</li>
                    <li>• Tablets (charging stations)</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Tools</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Power drills</li>
                    <li>• Angle grinders</li>
                    <li>• Sanders</li>
                    <li>• Vacuum cleaners</li>
                    <li>• Floor cleaners</li>
                    <li>• Pressure washers</li>
                    <li>• Welding equipment</li>
                    <li>• Compressors</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Kitchen Appliances</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Kettles</li>
                    <li>• Microwaves</li>
                    <li>• Fridges</li>
                    <li>• Coffee machines</li>
                    <li>• Toasters</li>
                    <li>• Food processors</li>
                    <li>• Dishwashers</li>
                    <li>• Water coolers</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Extension Equipment</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Extension leads</li>
                    <li>• Adapters</li>
                    <li>• RCD units</li>
                    <li>• Distribution boards</li>
                    <li>• Cable reels</li>
                    <li>• Power strips</li>
                    <li>• Surge protectors</li>
                    <li>• Outdoor cables</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's NOT Covered */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                What's NOT Covered by PAT
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                  <h5 className="text-red-400 font-semibold mb-3">Excluded Equipment</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Fixed electrical installations (part of building wiring)</li>
                    <li>• Battery-only equipment (no mains connection)</li>
                    <li>• Gas appliances</li>
                    <li>• Medical equipment (under different regulations)</li>
                    <li>• Equipment under 50V (except in specific environments)</li>
                    <li>• Vehicle electrical systems</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-400/30 p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-3">Common Misconceptions</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Hand dryers (usually fixed installation)</li>
                    <li>• Ceiling fans (permanent installation)</li>
                    <li>• Emergency lighting (building systems)</li>
                    <li>• Pure battery tools (no mains charger)</li>
                    <li>• Decorative lighting (if hardwired)</li>
                    <li>• CCTV cameras (if part of fixed system)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment Framework */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Equipment Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="mb-4">Not all equipment carries the same risk. Understanding risk levels helps prioritise testing resources:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                  <h5 className="text-red-400 font-semibold mb-3">High Risk Equipment</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Hand-held power tools</li>
                    <li>• Extension leads (especially outdoor)</li>
                    <li>• Heating appliances</li>
                    <li>• Equipment in wet environments</li>
                    <li>• Portable machinery</li>
                  </ul>
                  <p className="text-xs mt-3 text-red-300">Requires frequent testing and careful attention</p>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-400/30 p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-3">Medium Risk Equipment</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Kitchen appliances</li>
                    <li>• IT equipment in offices</li>
                    <li>• Moveable lighting</li>
                    <li>• Audio-visual equipment</li>
                    <li>• Small household appliances</li>
                  </ul>
                  <p className="text-xs mt-3 text-yellow-300">Standard testing intervals apply</p>
                </div>

                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                  <h5 className="text-green-400 font-semibold mb-3">Lower Risk Equipment</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Double insulated items</li>
                    <li>• Fixed position IT equipment</li>
                    <li>• Equipment in controlled environments</li>
                    <li>• Infrequently used appliances</li>
                  </ul>
                  <p className="text-xs mt-3 text-green-300">May require less frequent testing</p>
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
                <h4 className="text-yellow-400 font-semibold mb-3">Case Study: Hair Salon Equipment Oversight</h4>
                <div className="space-y-3">
                  <p>
                    <strong>Situation:</strong> A hair salon tested dryers, clippers, and extension cords — but missed the washing machine, assuming it was out of scope.
                  </p>
                  <p>
                    <strong>The Reality:</strong> The washing machine was actually portable equipment with a standard plug that should have been included in PAT testing.
                  </p>
                  <p>
                    <strong>The Lesson:</strong> Equipment weight or movement frequency doesn't determine PAT scope — connection type and workplace use do.
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
                  Knowing what falls under PAT avoids both gaps in testing and wasted effort. Class I equipment needs electrical testing, Class II typically needs visual inspection only.
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

export default PATTestingModule1Section3;