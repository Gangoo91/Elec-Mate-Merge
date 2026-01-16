import { ArrowLeft, Zap, CheckCircle2, AlertTriangle, Eye, Settings, Gauge, Brain, XCircle } from 'lucide-react';
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

const InstrumentationModule4Section1 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What's the difference between AC and DC voltage readings?",
      options: [
        "AC readings fluctuate, DC readings are constant",
        "AC is higher voltage than DC",
        "DC requires special meters, AC doesn't",
        "There's no difference in measurement"
      ],
      correctAnswer: 0,
      explanation: "AC voltage varies sinusoidally over time, while DC voltage remains constant. This affects how meters measure and display values."
    },
    {
      id: 2,
      question: "How do you safely measure current?",
      options: [
        "Connect meter in parallel with the circuit",
        "Connect meter in series with the circuit",
        "Use highest range setting only",
        "Measure with circuit fully energised"
      ],
      correctAnswer: 1,
      explanation: "Current flows through components, so the meter must be placed in series with the circuit to measure the current flow."
    },
    {
      id: 3,
      question: "What's continuity testing used for?",
      options: [
        "Measuring voltage levels",
        "Finding broken connections or open circuits",
        "Testing insulation strength",
        "Measuring power consumption"
      ],
      correctAnswer: 1,
      explanation: "Continuity testing checks if there's a complete electrical path, helping identify breaks in connections or circuits."
    },
    {
      id: 4,
      question: "Why would you use a clamp meter over a multimeter?",
      options: [
        "More accurate readings",
        "Cheaper to purchase",
        "Measure current without breaking the circuit",
        "Better for DC measurements"
      ],
      correctAnswer: 2,
      explanation: "Clamp meters allow non-intrusive current measurement by clamping around a conductor without disconnecting anything."
    },
    {
      id: 5,
      question: "What does infinite resistance usually indicate?",
      options: [
        "Perfect conductor",
        "Open circuit or break in continuity",
        "Short circuit condition",
        "Normal resistance reading"
      ],
      correctAnswer: 1,
      explanation: "Infinite resistance means no current can flow, indicating an open circuit or complete break in the connection."
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
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../instrumentation-module-4">
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
            <Zap className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Measuring Voltage, Current, and Resistance
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Foundation of all electrical measurement work — understanding how to accurately measure voltage, current, and resistance
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
                This section covers the foundation of all electrical measurement work — understanding how to accurately measure voltage, current, and resistance. These three fundamental quantities form the basis of electrical troubleshooting and system analysis.
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
                  Understand the difference between voltage, current, and resistance measurements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Apply safe measurement practices and procedures
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Interpret how meters read and display electrical properties
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Select appropriate instruments for different measurement tasks
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Recognise common measurement errors and how to avoid them
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Voltage Measurement */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Voltage Measurement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">AC vs DC Voltage</h4>
                  <p className="text-gray-300 mb-3">
                    Understanding the fundamental differences between AC and DC measurements:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">AC Voltage</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Varies sinusoidally with time</li>
                        <li>• RMS values typically displayed</li>
                        <li>• 230V AC in UK domestic supplies</li>
                        <li>• Frequency matters (50Hz in UK)</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">DC Voltage</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Constant voltage level</li>
                        <li>• Direct reading of actual value</li>
                        <li>• Common in electronic circuits</li>
                        <li>• Polarity is significant</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Measurement Technique</h4>
                  <p className="text-gray-300 mb-3">
                    Voltage is measured across components or between two points:
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Connect meter in parallel with the component or circuit
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Use appropriate voltage range on meter
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Observe polarity for DC measurements
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Ensure circuit is energised for voltage reading
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Measurement */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Current Measurement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Series Connection Method</h4>
                  <p className="text-gray-300 mb-3">
                    Traditional current measurement requires breaking the circuit:
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                      Switch off power before connecting meter
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Break circuit and insert meter in series
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Select appropriate current range
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Re-energise circuit to take reading
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Clamp Meter Method</h4>
                  <p className="text-gray-300 mb-3">
                    Non-intrusive current measurement using magnetic induction:
                  </p>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Advantages</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• No need to break circuit connections</li>
                      <li>• Safe measurement on live circuits</li>
                      <li>• Quick and convenient readings</li>
                      <li>• Suitable for high current measurements</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Safety Considerations</h4>
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Never exceed meter's current rating</li>
                      <li>• Check fuse protection in meter</li>
                      <li>• Use appropriate PPE for live work</li>
                      <li>• Consider arc flash risks on high current circuits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resistance Testing */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Gauge className="h-5 w-5 text-elec-yellow" />
                Resistance Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Continuity Testing</h4>
                  <p className="text-gray-300 mb-3">
                    Verifying complete electrical paths and connections:
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Circuit must be de-energised and isolated
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Low resistance (typically &lt;1Ω) indicates good continuity
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Infinite resistance indicates open circuit
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Used for protective conductor verification
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Insulation Testing</h4>
                  <p className="text-gray-300 mb-3">
                    High resistance measurements to verify insulation integrity:
                  </p>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Key Points</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Uses high DC voltage (500V or 1000V)</li>
                      <li>• Measures resistance in MΩ (megohms)</li>
                      <li>• Equipment must be disconnected first</li>
                      <li>• Minimum values specified by BS 7671</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Common Applications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Cable and wiring verification</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Motor winding testing</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Transformer testing</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Fault finding and diagnosis</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Component testing</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Installation verification</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Instruments */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Common Measurement Instruments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-transparent/80 rounded-lg p-4 border-l-4 border-elec-yellow/30">
                  <h4 className="text-blue-200 font-medium mb-2">Digital Multimeters (DMMs)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Versatile - voltage, current, resistance</li>
                    <li>• High accuracy and resolution</li>
                    <li>• Auto-ranging capabilities</li>
                    <li>• Digital display easy to read</li>
                  </ul>
                </div>
                <div className="bg-transparent/80 rounded-lg p-4 border-l-4 border-green-500/50">
                  <h4 className="text-green-200 font-medium mb-2">Analogue Meters</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Moving needle display</li>
                    <li>• Good for trending measurements</li>
                    <li>• No power supply required</li>
                    <li>• Robust in harsh environments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Real-World Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-900/20 border border-elec-yellow/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Lighting Fault Diagnosis</h4>
                    <p className="text-gray-300 leading-relaxed">
                      A technician diagnosing a lighting fault in a panel measures 230V across the terminals, 0A current flow, and finds a break in continuity — pinpointing an open-circuit fault. This systematic approach using all three measurements quickly identifies the problem location and nature.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Mastering basic measurements builds confidence in diagnosing electrical issues and validating system performance. The combination of voltage, current, and resistance measurements provides a complete picture of circuit behaviour and helps identify problems quickly and safely.
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
                    Test your understanding of voltage, current, and resistance measurement principles.
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
                      <p className="text-green-400">Excellent work! You have a good understanding of the material.</p>
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

export default InstrumentationModule4Section1;