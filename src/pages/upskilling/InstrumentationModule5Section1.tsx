import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, RotateCcw, Play, Brain, XCircle, Lightbulb, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const InstrumentationModule5Section1 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What's a major limitation of an open loop system?",
      options: [
        "It's too expensive to operate",
        "It cannot adjust to changes or disturbances",
        "It uses too much power",
        "It's too complex to maintain"
      ],
      correctAnswer: 1,
      explanation: "Open loop systems cannot adjust to changes or disturbances because they lack feedback mechanisms to detect when conditions have changed."
    },
    {
      id: 2,
      question: "Give one example of a closed loop system.",
      options: [
        "A basic timer switch",
        "A manual valve",
        "A thermostat controlling temperature",
        "A fixed speed motor"
      ],
      correctAnswer: 2,
      explanation: "A thermostat is a classic closed loop system - it measures temperature (feedback) and adjusts heating/cooling to maintain the setpoint."
    },
    {
      id: 3,
      question: "What role does feedback play in control?",
      options: [
        "It increases system cost",
        "It provides information about actual system performance",
        "It makes systems more complex",
        "It reduces system reliability"
      ],
      correctAnswer: 1,
      explanation: "Feedback provides information about actual system performance, allowing the controller to compare actual conditions with desired conditions and make adjustments."
    },
    {
      id: 4,
      question: "Which system is typically more accurate?",
      options: [
        "Open loop systems",
        "Both are equally accurate",
        "Closed loop systems",
        "It depends on the application"
      ],
      correctAnswer: 2,
      explanation: "Closed loop systems are typically more accurate because they continuously monitor and adjust based on actual performance, compensating for disturbances and variations."
    },
    {
      id: 5,
      question: "Can open loop systems adjust to change?",
      options: [
        "Yes, they adjust automatically",
        "No, they cannot adjust to changes",
        "Only with manual intervention",
        "They adjust slowly over time"
      ],
      correctAnswer: 1,
      explanation: "Open loop systems cannot adjust to changes because they lack feedback mechanisms. They operate according to predetermined patterns regardless of actual conditions."
    },
    {
      id: 6,
      question: "What is the main advantage of open loop systems in high-speed applications?",
      options: [
        "Better accuracy",
        "No feedback delay, faster response",
        "Lower maintenance costs",
        "Higher reliability"
      ],
      correctAnswer: 1,
      explanation: "Open loop systems have no feedback delay, making them faster in response time, which is advantageous in high-speed applications where immediate action is required."
    },
    {
      id: 7,
      question: "In a washing machine, which component represents a closed loop system?",
      options: [
        "The timer that runs the wash cycle",
        "The water level sensor and fill valve",
        "The drain pump motor",
        "The door latch mechanism"
      ],
      correctAnswer: 1,
      explanation: "The water level sensor and fill valve form a closed loop - the sensor provides feedback about actual water level, and the valve adjusts flow to maintain the desired level."
    },
    {
      id: 8,
      question: "What happens to system stability when you add feedback to an open loop system?",
      options: [
        "Stability always improves",
        "Stability always decreases",
        "Stability can improve or decrease depending on design",
        "Stability remains unchanged"
      ],
      correctAnswer: 2,
      explanation: "Adding feedback can improve or decrease stability depending on the system design and tuning. Properly designed feedback improves stability, but poor design can cause oscillations."
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
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="/study-centre/upskilling/instrumentation-module-5">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Open Loop vs Closed Loop Systems
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understand the difference between open and closed loop systems and how each functions in control environments
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Identify the characteristics of open and closed loop systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Recognize applications of each type in real-world scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Understand limitations and advantages of each system type</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Open Loop Systems */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Play className="h-5 w-5 text-elec-yellow" />
                Open Loop Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Characteristics</h4>
                  <p className="text-gray-300 mb-3">
                    Open loop systems operate without feedback. They execute predetermined actions based on input commands, regardless of the actual output or system conditions.
                  </p>
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Key Features</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• No feedback mechanism</li>
                      <li>• Simple control structure</li>
                      <li>• Lower cost and complexity</li>
                      <li>• Cannot self-correct for disturbances</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Common Examples</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                      <h5 className="text-purple-200 font-medium mb-2">Basic Timer Switch</h5>
                      <p className="text-gray-300 text-sm mb-2">Runs for a set time period regardless of conditions</p>
                      <p className="text-gray-400 text-xs">Example: Garden sprinkler system</p>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">Manual Control Valve</h5>
                      <p className="text-gray-300 text-sm mb-2">Fixed position until manually adjusted</p>
                      <p className="text-gray-400 text-xs">Example: Gas cooker control</p>
                    </div>
                    <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">Washing Machine Timer</h5>
                      <p className="text-gray-300 text-sm mb-2">Follows predetermined cycle</p>
                      <p className="text-gray-400 text-xs">Example: Traditional wash cycles</p>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                      <h5 className="text-orange-200 font-medium mb-2">Traffic Light System</h5>
                      <p className="text-gray-300 text-sm mb-2">Fixed timing sequence</p>
                      <p className="text-gray-400 text-xs">Example: Basic intersection control</p>
                    </div>
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                      <h5 className="text-red-200 font-medium mb-2">Electric Heater</h5>
                      <p className="text-gray-300 text-sm mb-2">Fixed power output when on</p>
                      <p className="text-gray-400 text-xs">Example: Basic space heater</p>
                    </div>
                    <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                      <h5 className="text-cyan-200 font-medium mb-2">Stepper Motor Drive</h5>
                      <p className="text-gray-300 text-sm mb-2">Moves precise steps without feedback</p>
                      <p className="text-gray-400 text-xs">Example: 3D printer positioning</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Advantages & Limitations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">Advantages</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Simple and inexpensive</li>
                        <li>• Easy to understand and maintain</li>
                        <li>• Fast response (no feedback delay)</li>
                        <li>• Stable operation</li>
                      </ul>
                    </div>
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                      <h5 className="text-red-200 font-medium mb-2">Limitations</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Cannot adjust to disturbances</li>
                        <li>• No error correction</li>
                        <li>• Less accurate control</li>
                        <li>• Poor performance with varying conditions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Closed Loop Systems */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <RotateCcw className="h-5 w-5 text-elec-yellow" />
                Closed Loop Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Characteristics</h4>
                  <p className="text-gray-300 mb-3">
                    Closed loop systems use feedback to continuously monitor output and adjust control actions. They compare actual performance with desired performance and make corrections.
                  </p>
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Key Features</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Feedback mechanism present</li>
                      <li>• Self-correcting capability</li>
                      <li>• Higher accuracy and precision</li>
                      <li>• Can compensate for disturbances</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Common Examples</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                      <h5 className="text-purple-200 font-medium mb-2">Thermostat Control</h5>
                      <p className="text-gray-300 text-sm mb-2">Measures temperature and adjusts heating/cooling</p>
                      <p className="text-gray-400 text-xs">Maintains ±1°C accuracy</p>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">Motor Speed Control</h5>
                      <p className="text-gray-300 text-sm mb-2">Monitors speed and adjusts power</p>
                      <p className="text-gray-400 text-xs">Maintains ±0.1% speed accuracy</p>
                    </div>
                    <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">Pressure Regulation</h5>
                      <p className="text-gray-300 text-sm mb-2">Controls valve based on pressure feedback</p>
                      <p className="text-gray-400 text-xs">Maintains ±2% pressure accuracy</p>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                      <h5 className="text-orange-200 font-medium mb-2">Level Control</h5>
                      <p className="text-gray-300 text-sm mb-2">Adjusts flow based on tank level</p>
                      <p className="text-gray-400 text-xs">Prevents overflow and emptying</p>
                    </div>
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                      <h5 className="text-red-200 font-medium mb-2">pH Control</h5>
                      <p className="text-gray-300 text-sm mb-2">Adds chemicals based on pH measurement</p>
                      <p className="text-gray-400 text-xs">Maintains ±0.1 pH unit accuracy</p>
                    </div>
                    <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                      <h5 className="text-cyan-200 font-medium mb-2">Flow Control</h5>
                      <p className="text-gray-300 text-sm mb-2">Adjusts valve position for desired flow</p>
                      <p className="text-gray-400 text-xs">Maintains ±1% flow accuracy</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Performance Comparison</h4>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <h5 className="text-white font-medium mb-2">Accuracy</h5>
                        <p className="text-green-300">Higher</p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">Reliability</h5>
                        <p className="text-green-300">Better</p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">Disturbance Rejection</h5>
                        <p className="text-green-300">Excellent</p>
                      </div>
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
                    <h4 className="font-medium text-white mb-2">Home Heating System Comparison</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-blue-200 font-medium">Open Loop (Timer-Based)</h5>
                        <p className="text-sm">A heating system with no thermostat runs for predetermined periods regardless of actual room temperature. It cannot respond to changes in weather, occupancy, or heat losses.</p>
                      </div>
                      <div>
                        <h5 className="text-green-200 font-medium">Closed Loop (Thermostat)</h5>
                        <p className="text-sm">With feedback from a temperature sensor, the system self-regulates based on actual room temperature, automatically adjusting to maintain comfort despite changing conditions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-white">Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Closed loop systems offer more accuracy and control due to feedback, making them preferable in most automated processes. While open loop systems are simpler and cheaper, closed loop systems provide the self-correction and adaptability essential for maintaining precise control in varying conditions.
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
                    Test your understanding of open loop vs closed loop systems.
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
                      <p className="text-green-400">Excellent! You understand control loop fundamentals well.</p>
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

export default InstrumentationModule5Section1;