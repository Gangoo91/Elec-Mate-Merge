import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, Eye, BarChart, Database, TrendingUp, Brain, XCircle, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const InstrumentationModule4Section5 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What does a steady increase in current often indicate?",
      options: [
        "System is operating normally",
        "Equipment degradation or failing component",
        "Voltage is too high",
        "Measurement error only"
      ],
      correctAnswer: 1,
      explanation: "A steady increase in current often indicates equipment degradation, increased friction in motors, or other developing problems that increase load."
    },
    {
      id: 2,
      question: "Why is timestamping measurements important?",
      options: [
        "It's required by law",
        "To track trends and correlate events over time",
        "To calculate costs",
        "It makes reports look professional"
      ],
      correctAnswer: 1,
      explanation: "Timestamping allows correlation of measurements with events, tracking of trends over time, and proper sequence analysis for troubleshooting."
    },
    {
      id: 3,
      question: "What's the benefit of trending data over time?",
      options: [
        "Reduces measurement accuracy",
        "Enables predictive maintenance and early fault detection",
        "Makes equipment last longer automatically",
        "Eliminates the need for manual testing"
      ],
      correctAnswer: 1,
      explanation: "Trending reveals gradual changes that indicate developing problems, enabling predictive maintenance before failures occur."
    },
    {
      id: 4,
      question: "How can logging prevent unplanned downtime?",
      options: [
        "By making equipment more reliable",
        "By identifying developing issues before they cause failures",
        "By reducing power consumption",
        "By eliminating operator errors"
      ],
      correctAnswer: 1,
      explanation: "Systematic logging and analysis can identify developing problems early, allowing planned maintenance before unexpected failures occur."
    },
    {
      id: 5,
      question: "What tools assist with digital logging?",
      options: [
        "Only expensive industrial systems",
        "Data loggers, SCADA systems, and mobile apps",
        "Traditional paper logbooks only",
        "Manual calculation methods"
      ],
      correctAnswer: 1,
      explanation: "Modern digital logging uses various tools from simple data loggers to sophisticated SCADA systems and mobile applications for field data collection."
  }
  ];

  function handleAnswerSelect(answerIndex: number) {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
};

  function handleNext() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
  };
};

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
  };
};

  function calculateScore() {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
    };
    });
    return correct;
};

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
};

  function startQuiz() {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
};

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="/study-centre/upskilling/instrumentation-module-4">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Interpreting and Logging Readings in Real-World Systems
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Measurements mean little without interpretation. This section shows how to apply data to real scenarios and document effectively
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Quick Introduction */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Quick Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Measurements mean little without interpretation. This section shows how to apply data to real scenarios and document effectively. Understanding how to analyse readings, identify trends, and maintain proper documentation is essential for effective maintenance and system optimization.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Analyse readings for system status and performance indicators</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Identify patterns, trends, and anomalies in measurement data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Implement proper logging and reporting procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Use measurement data for predictive maintenance strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Build comprehensive diagnoses from multiple measurement sources</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Analysis Fundamentals */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <BarChart className="h-5 w-5 text-elec-yellow" />
                Comparing Readings to Baselines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Establishing Baselines</h4>
                  <p className="text-gray-300 mb-3">
                    Baseline measurements provide reference points for comparison:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">Initial Commissioning Data</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Motor current at rated load</li>
                        <li>• System operating temperatures</li>
                        <li>• Voltage levels under normal conditions</li>
                        <li>• Vibration and noise signatures</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">Performance Standards</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Manufacturer specifications</li>
                        <li>• Industry standard values</li>
                        <li>• Historical performance data</li>
                        <li>• Regulatory compliance limits</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Variance Analysis</h4>
                  <p className="text-gray-300 mb-3">
                    Understanding when deviations are significant:
                  </p>
                  <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-200">±5% variation</span>
                        <span className="text-green-300">Normal operating range</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-200">±10% variation</span>
                        <span className="text-yellow-300">Investigation recommended</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-200">&gt;±15% variation</span>
                        <span className="text-red-300">Action required</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recognizing Anomalies */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                Recognizing Anomalies and Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Common Anomaly Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                      <h5 className="text-red-200 font-medium mb-2">Voltage Dips</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Starting of large motors</li>
                        <li>• Transformer overloading</li>
                        <li>• Poor connections developing</li>
                        <li>• Supply system problems</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                      <h5 className="text-orange-200 font-medium mb-2">Current Surges</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Motor bearing deterioration</li>
                        <li>• Pump cavitation or blockage</li>
                        <li>• Insulation breakdown starting</li>
                        <li>• Mechanical binding or friction</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Trend Patterns</h4>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-purple-200 font-medium mb-2">Gradual Increase</h5>
                        <p className="text-gray-300 text-sm">Often indicates wear, dirt accumulation, or developing mechanical problems</p>
                      </div>
                      <div>
                        <h5 className="text-purple-200 font-medium mb-2">Cyclic Variations</h5>
                        <p className="text-gray-300 text-sm">May indicate temperature effects, load cycling, or seasonal influences</p>
                      </div>
                      <div>
                        <h5 className="text-purple-200 font-medium mb-2">Sudden Changes</h5>
                        <p className="text-gray-300 text-sm">Usually indicate specific events: repairs, adjustments, or component failures</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation and Logging */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Database className="h-5 w-5 text-elec-yellow" />
                Documentation and Logging Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Essential Documentation Elements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Timestamp</span>
                          <p className="text-gray-300 text-sm">Date, time, and duration of measurement</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Equipment ID</span>
                          <p className="text-gray-300 text-sm">Clear identification and location</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Operating Conditions</span>
                          <p className="text-gray-300 text-sm">Load, temperature, environmental factors</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Measurement Values</span>
                          <p className="text-gray-300 text-sm">Actual readings with units and accuracy</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Technician Details</span>
                          <p className="text-gray-300 text-sm">Who performed the measurement</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Observations</span>
                          <p className="text-gray-300 text-sm">Unusual conditions or concerns noted</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Digital Logging Tools</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">Data Loggers</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Automatic data collection</li>
                        <li>• Long-term monitoring</li>
                        <li>• Battery powered operation</li>
                        <li>• Multiple sensor inputs</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">SCADA Systems</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Real-time monitoring</li>
                        <li>• Centralized data collection</li>
                        <li>• Alarm and notification systems</li>
                        <li>• Historical data analysis</li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                      <h5 className="text-purple-200 font-medium mb-2">Mobile Apps</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Field data entry</li>
                        <li>• Photo documentation</li>
                        <li>• Instant report generation</li>
                        <li>• Cloud synchronization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Analysis and Trending */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Building Comprehensive Diagnoses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Multi-Parameter Analysis</h4>
                <p className="text-gray-300 mb-3">
                  Effective diagnosis requires correlation of multiple measurements:
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Motor Current ↑</span>
                      <span className="text-gray-300">+</span>
                      <span className="text-white font-medium">Vibration ↑</span>
                      <span className="text-gray-300">=</span>
                      <span className="text-red-300">Bearing Problem</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Voltage ↓</span>
                      <span className="text-gray-300">+</span>
                      <span className="text-white font-medium">Current ↑</span>
                      <span className="text-gray-300">=</span>
                      <span className="text-yellow-300">Supply Problem</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Temperature ↑</span>
                      <span className="text-gray-300">+</span>
                      <span className="text-white font-medium">Resistance ↓</span>
                      <span className="text-gray-300">=</span>
                      <span className="text-orange-300">Insulation Issue</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-white">Real-World Scenario</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-blue-900/20 border border-elec-yellow/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Power Substation Monitoring</h4>
                    <p>
                      In a power substation, engineers track current draw hourly. A gradual rise over three days signals a failing pump motor.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-white">Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Correct interpretation transforms raw numbers into action. Good logging supports predictive maintenance and regulatory compliance.
              </p>
            </CardContent>
          </Card>

          {/* Interactive Quiz */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Brain className="h-5 w-5 text-elec-yellow" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizStarted ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-300">
                    Test your understanding of data interpretation and logging principles.
                  </p>
                  <Button 
                    onClick={startQuiz}
                    className="bg-elec-yellow text-black hover:bg-elec-yellow font-semibold px-8 py-2"
                  >
                    Start Quiz
                  </Button>
                </div>
              ) : !showResults ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-4">{currentQuestion.question}</h3>
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full text-left p-3 rounded border transition-colors ${
                            selectedAnswers[currentQuestionIndex] === index
                              ? 'border-elec-yellow bg-elec-yellow/20 text-elec-yellow'
                              : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-transparent disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswers[currentQuestionIndex] === undefined}
                      className="bg-elec-yellow text-black hover:bg-elec-yellow disabled:opacity-50"
                    >
                      {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      percentage >= 70 ? 'bg-green-600/20' : 'bg-red-600/20'
                    }`}>
                      {percentage >= 70 ? (
                        <CheckCircle2 className="h-8 w-8 text-green-400" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-400" />
                      )}
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">Quiz Complete!</h3>
                    <p className="text-gray-300 mb-4">
                      You scored {score} out of {quizQuestions.length} ({percentage}%)
                    </p>
                    {percentage >= 70 ? (
                      <p className="text-green-400">Excellent! You understand data interpretation and logging well.</p>
                    ) : (
                      <p className="text-red-400">Consider reviewing the material and trying again.</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Review Your Answers:</h4>
                    {quizQuestions.map((question, index) => (
                      <div key={question.id} className="border border-gray-600 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          {selectedAnswers[index] === question.correctAnswer ? (
                            <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-white font-medium mb-2">{question.question}</p>
                            <p className="text-gray-300 text-sm mb-2">
                              <span className="font-medium">Your answer:</span> {question.options[selectedAnswers[index]]}
                            </p>
                            {selectedAnswers[index] !== question.correctAnswer && (
                              <p className="text-gray-300 text-sm mb-2">
                                <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="text-gray-400 text-sm">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button 
                      onClick={resetQuiz}
                      className="bg-elec-yellow text-black hover:bg-elec-yellow font-semibold px-8 py-2"
                    >
                      Retake Quiz
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

export default InstrumentationModule4Section5;