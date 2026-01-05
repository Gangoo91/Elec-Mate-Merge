import { ArrowLeft, BookOpen, Target, FileText, AlertTriangle, CheckCircle, Clock, BarChart3, Settings, Calendar, Shield } from 'lucide-react';
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
    question: "What factors influence PAT frequency?",
    options: [
      "Only the equipment age",
      "Usage, environment, equipment class, and previous fault history",
      "Just the manufacturer's recommendations",
      "Only legal requirements"
    ],
    correctAnswer: 1,
    explanation: "PAT frequency depends on multiple factors including how often equipment is used, the environment it's used in, the equipment class, and any history of faults."
  },
  {
    id: 2,
    question: "Would a drill used daily need more or less frequent testing than a PC?",
    options: [
      "Less frequent - it's more robust",
      "Same frequency - they're both electrical",
      "More frequent - higher usage and risk",
      "No testing needed for tools"
    ],
    correctAnswer: 2,
    explanation: "A drill used daily would need more frequent testing than a PC due to higher usage, more physical stress, and typically harsher working environments."
  },
  {
    id: 3,
    question: "Who provides testing frequency guidance in the UK?",
    options: [
      "Only equipment manufacturers",
      "HSE and IET Code of Practice",
      "Local councils",
      "Insurance companies only"
    ],
    correctAnswer: 1,
    explanation: "The HSE (Health and Safety Executive) and IET (Institution of Engineering and Technology) Code of Practice provide official guidance on PAT testing frequencies."
  },
  {
    id: 4,
    question: "Why should records be reviewed annually?",
    options: [
      "It's a legal requirement",
      "To adjust testing intervals based on performance and fault trends",
      "To satisfy insurance companies",
      "Only for audit purposes"
    ],
    correctAnswer: 1,
    explanation: "Annual review of PAT records allows you to adjust testing intervals based on actual performance, fault trends, and changing usage patterns to optimise your testing programme."
  },
  {
    id: 5,
    question: "Can testing intervals be reduced over time?",
    options: [
      "No, they must always increase",
      "Only with manufacturer approval",
      "Yes, if equipment proves reliable and usage decreases",
      "Never, intervals are fixed"
    ],
    correctAnswer: 2,
    explanation: "Testing intervals can be adjusted based on performance data. If equipment proves reliable and usage patterns change, intervals may be extended (though this should be done carefully with proper risk assessment)."
  }
];

const PATTestingModule1Section4 = () => {
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
              Test your understanding of PAT testing frequency and risk assessment with this 5-question quiz.
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
                {score >= 4 ? 'Excellent understanding of PAT frequency planning!' : score >= 3 ? 'Good knowledge!' : 'Review the material and try again!'}
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
        <Link to="../pat-testing-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Clock className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Frequency of Inspection and Testing
                </h1>
                <p className="text-xl text-gray-400">
                  Module 1, Section 4
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.4
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
                Not every appliance needs testing yearly — it depends on risk. This section explains how to determine 
                inspection intervals based on usage, environment, and equipment type. Getting the frequency right ensures 
                safety while avoiding unnecessary testing that wastes time and resources.
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
                <li>Understand risk-based testing frequency</li>
                <li>Learn typical intervals for different environments</li>
                <li>Know how to classify high, medium, low risk</li>
                <li>Explore record-keeping and review cycles</li>
              </ul>
            </CardContent>
          </Card>

          {/* Environment-Based Frequencies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Environment-Based Testing Frequencies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                  <h5 className="text-green-400 font-semibold mb-2">Office Environment</h5>
                  <p className="text-sm mb-2">Low risk, controlled conditions</p>
                  <ul className="text-xs space-y-1">
                    <li>• Handheld: 2 years</li>
                    <li>• Portable: 2 years</li>
                    <li>• IT Equipment: 4 years</li>
                    <li>• Stationary: 5 years</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-400/30 p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-2">Schools</h5>
                  <p className="text-sm mb-2">Medium risk, heavy usage</p>
                  <ul className="text-xs space-y-1">
                    <li>• Handheld: 12 months</li>
                    <li>• Portable: 12 months</li>
                    <li>• IT Equipment: 2 years</li>
                    <li>• Kitchen: 6 months</li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
                  <h5 className="text-orange-400 font-semibold mb-2">Kitchens</h5>
                  <p className="text-sm mb-2">High risk, harsh conditions</p>
                  <ul className="text-xs space-y-1">
                    <li>• Handheld: 6 months</li>
                    <li>• Portable: 6 months</li>
                    <li>• Fixed heating: 12 months</li>
                    <li>• Refrigeration: 12 months</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                  <h5 className="text-red-400 font-semibold mb-2">Construction Sites</h5>
                  <p className="text-sm mb-2">Very high risk, extreme conditions</p>
                  <ul className="text-xs space-y-1">
                    <li>• Handheld: 3 months</li>
                    <li>• Portable: 3 months</li>
                    <li>• Extension leads: 3 months</li>
                    <li>• Site lighting: 3 months</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Frequency Guidelines */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Detailed Frequency Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-600">
                  <thead>
                    <tr className="bg-card">
                      <th className="border border-gray-600 p-3 text-left text-yellow-400">Equipment Type</th>
                      <th className="border border-gray-600 p-3 text-left text-yellow-400">Office</th>
                      <th className="border border-gray-600 p-3 text-left text-yellow-400">School/Hotel</th>
                      <th className="border border-gray-600 p-3 text-left text-yellow-400">Commercial Kitchen</th>
                      <th className="border border-gray-600 p-3 text-left text-yellow-400">Construction Site</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold">Handheld Equipment</td>
                      <td className="border border-gray-600 p-3">2 years</td>
                      <td className="border border-gray-600 p-3">12 months</td>
                      <td className="border border-gray-600 p-3">6 months</td>
                      <td className="border border-gray-600 p-3">3 months</td>
                    </tr>
                    <tr className="bg-card/50">
                      <td className="border border-gray-600 p-3 font-semibold">Portable Equipment</td>
                      <td className="border border-gray-600 p-3">2 years</td>
                      <td className="border border-gray-600 p-3">12 months</td>
                      <td className="border border-gray-600 p-3">6 months</td>
                      <td className="border border-gray-600 p-3">3 months</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold">IT Equipment</td>
                      <td className="border border-gray-600 p-3">4 years</td>
                      <td className="border border-gray-600 p-3">2 years</td>
                      <td className="border border-gray-600 p-3">12 months</td>
                      <td className="border border-gray-600 p-3">6 months</td>
                    </tr>
                    <tr className="bg-card/50">
                      <td className="border border-gray-600 p-3 font-semibold">Extension Leads</td>
                      <td className="border border-gray-600 p-3">2 years</td>
                      <td className="border border-gray-600 p-3">12 months</td>
                      <td className="border border-gray-600 p-3">6 months</td>
                      <td className="border border-gray-600 p-3">3 months</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold">Stationary Equipment</td>
                      <td className="border border-gray-600 p-3">5 years</td>
                      <td className="border border-gray-600 p-3">2 years</td>
                      <td className="border border-gray-600 p-3">12 months</td>
                      <td className="border border-gray-600 p-3">6 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors Affecting Frequency */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Risk Factors Affecting Frequency
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Factors that INCREASE frequency:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Harsh environments (dust, moisture, heat)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Heavy usage or frequent movement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Previous fault history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">High-risk equipment types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Equipment age and condition</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Factors that may DECREASE frequency:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Controlled, clean environments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Infrequent use or fixed positioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Excellent maintenance records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Double insulated equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Comprehensive user training</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Record Keeping and Review Process */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Record Keeping and Review Process
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-3">Essential Records to Maintain</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Equipment register with unique identifiers</li>
                    <li>• Test dates and results for each item</li>
                    <li>• Fault history and repair records</li>
                    <li>• User feedback and incident reports</li>
                    <li>• Environmental condition changes</li>
                    <li>• Tester qualifications and calibration</li>
                  </ul>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                  <h5 className="text-purple-400 font-semibold mb-3">Annual Review Process</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Analyse failure rates by equipment type</li>
                    <li>• Review environmental risk assessments</li>
                    <li>• Assess usage pattern changes</li>
                    <li>• Compare costs vs. safety benefits</li>
                    <li>• Update testing frequencies as needed</li>
                    <li>• Document decisions and rationale</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-lg mt-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Best Practice Tip:</h5>
                <p className="text-sm">
                  Start with conservative frequencies and gradually extend intervals for equipment that consistently passes tests. 
                  Always document your reasoning and ensure changes are based on solid evidence, not just cost reduction.
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
              <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-3">Case Study: Warehouse Testing Optimisation</h4>
                <div className="space-y-3">
                  <p>
                    <strong>Situation:</strong> A warehouse reduced PAT frequency for fixed printers but increased checks on handheld power tools used daily.
                  </p>
                  <p>
                    <strong>Results:</strong> This reduced overall testing costs by 30% while improving safety focus on high-risk equipment.
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
                  Tailoring PAT frequency to usage and risk keeps systems safe and efficient. There's no universal frequency - it depends on equipment type, usage, environment, and performance history.
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

export default PATTestingModule1Section4;