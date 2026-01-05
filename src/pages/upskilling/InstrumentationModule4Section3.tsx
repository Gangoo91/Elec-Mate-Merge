import { ArrowLeft, Target, BookOpen, Users, Lightbulb, Brain, CheckCircle2, AlertTriangle, Eye, TrendingUp, Calculator, XCircle } from 'lucide-react';
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

const InstrumentationModule4Section3 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What's the difference between precision and accuracy?",
      options: [
        "They are the same thing",
        "Precision is hitting the target, accuracy is consistent results",
        "Accuracy is hitting the target, precision is consistent results",
        "Precision is for digital meters, accuracy is for analogue"
      ],
      correctAnswer: 2,
      explanation: "Accuracy refers to how close measurements are to the true value (hitting the target), while precision refers to how consistent repeated measurements are (consistent results)."
    },
    {
      id: 2,
      question: "What does \"±1% + 2 digits\" mean?",
      options: [
        "The reading is within 1% plus 2 extra digits of uncertainty",
        "The meter has 2 decimal places",
        "1% error plus uncertainty in the last 2 displayed digits",
        "The meter costs 1% more with 2 digits"
      ],
      correctAnswer: 2,
      explanation: "This specification means the measurement error is 1% of the reading plus uncertainty in the last 2 digits of the display."
    },
    {
      id: 3,
      question: "Why is resolution important in low-voltage circuits?",
      options: [
        "Low voltages don't matter",
        "Small changes need to be detected accurately",
        "It prevents electrical shock",
        "Resolution only matters for high voltages"
      ],
      correctAnswer: 1,
      explanation: "In low-voltage circuits, small voltage changes can be significant. Good resolution allows detection of these small but important variations."
    },
    {
      id: 4,
      question: "What type of error does a noisy environment cause?",
      options: [
        "Systematic error",
        "Calibration error",
        "Random error from interference",
        "Operator error"
      ],
      correctAnswer: 2,
      explanation: "Electrical noise causes random errors that vary unpredictably, making measurements less precise and potentially less accurate."
    },
    {
      id: 5,
      question: "How can calibration help reduce measurement errors?",
      options: [
        "It makes instruments faster",
        "It corrects for systematic errors and drift",
        "It increases resolution",
        "It prevents electrical noise"
      ],
      correctAnswer: 1,
      explanation: "Calibration corrects systematic errors and compensates for instrument drift over time, improving measurement accuracy."
    }
  ];

  // ... quiz handling functions (same as previous sections)
  function handleAnswerSelect(answerIndex: number) {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  }

  function handleNext() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  }

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }

  function calculateScore() {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  }

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  }

  function startQuiz() {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../instrumentation-module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Instrument Accuracy, Resolution, and Error
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Knowing how precise a reading is — and what limitations exist — is critical in measurement
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Quick Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white text-xl">Quick Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Knowing how precise a reading is — and what limitations exist — is critical in measurement. This section demystifies accuracy and resolution, helping you understand measurement uncertainty and choose the right instrument for each application.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Define accuracy, precision, resolution and their practical significance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Identify and understand different sources of measurement error</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Interpret instrument specifications and tolerance ratings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Choose appropriate instruments based on accuracy requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Calculate and manage measurement uncertainty in critical applications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Accuracy vs Precision */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Target className="h-5 w-5 text-yellow-400" />
                Accuracy vs Precision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Understanding the Difference</h4>
                  <p className="text-gray-300 mb-3">
                    These fundamental concepts are often confused but represent different aspects of measurement quality:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">Accuracy</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• How close to the true value</li>
                        <li>• "Hitting the target"</li>
                        <li>• Affected by calibration</li>
                        <li>• Can be corrected systematically</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">Precision</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Consistency of repeated readings</li>
                        <li>• "Grouping of shots"</li>
                        <li>• Related to instrument stability</li>
                        <li>• Shows measurement repeatability</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Target Analogy</h4>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                      <div className="space-y-2">
                        <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                        </div>
                        <p className="text-sm text-green-300">Accurate & Precise</p>
                        <p className="text-xs text-gray-400">Close to target, tight grouping</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-16 h-16 mx-auto bg-yellow-400/10 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full ml-4"></div>
                        </div>
                        <p className="text-sm text-yellow-300">Precise but Inaccurate</p>
                        <p className="text-xs text-gray-400">Consistent but off-target</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resolution */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Resolution and Sensitivity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">What is Resolution?</h4>
                  <p className="text-gray-300 mb-3">
                    Resolution is the smallest detectable change an instrument can measure:
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                      Digital meters: Limited by least significant digit
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                      Analogue meters: Limited by scale divisions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                      Higher resolution allows detection of smaller changes
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                      Critical for low-level signal measurements
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Resolution Examples</h4>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">3½ digit DMM (1999 counts)</span>
                        <span className="text-gray-300">0.1V resolution on 200V range</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">4½ digit DMM (19999 counts)</span>
                        <span className="text-gray-300">0.01V resolution on 200V range</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">6½ digit DMM (1999999 counts)</span>
                        <span className="text-gray-300">0.0001V resolution on 200V range</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Why Resolution Matters</h4>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <p className="text-gray-300 text-sm mb-3">
                      In low-voltage circuits, small changes can indicate:
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Battery degradation (mV changes)</li>
                      <li>• Connection resistance increases</li>
                      <li>• Temperature coefficient effects</li>
                      <li>• Load variations in sensitive circuits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Sources */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Sources of Measurement Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Systematic Errors</h4>
                  <p className="text-gray-300 mb-3">
                    Predictable, consistent errors that can often be corrected:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                      <h5 className="text-red-200 font-medium mb-2">Calibration Drift</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Component aging</li>
                        <li>• Temperature effects</li>
                        <li>• Reference voltage changes</li>
                        <li>• Regular calibration needed</li>
                      </ul>
                    </div>
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                      <h5 className="text-red-200 font-medium mb-2">Loading Effects</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Instrument input impedance</li>
                        <li>• Probe capacitance</li>
                        <li>• Current measurement burden</li>
                        <li>• Circuit interaction</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Random Errors</h4>
                  <p className="text-gray-300 mb-3">
                    Unpredictable variations that affect precision:
                  </p>
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-yellow-200 font-medium mb-2">Environmental</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Electrical noise</li>
                          <li>• Temperature variations</li>
                          <li>• Vibration</li>
                          <li>• Humidity changes</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-yellow-200 font-medium mb-2">Operational</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Probe contact variations</li>
                          <li>• Reading timing</li>
                          <li>• Operator technique</li>
                          <li>• Connection quality</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interpreting Specifications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Calculator className="h-5 w-5 text-yellow-400" />
                Interpreting Tolerance Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Understanding ±1.5% + 2 digits</h4>
                  <p className="text-gray-300 mb-3">
                    Common accuracy specification format explained:
                  </p>
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-blue-200 font-medium">Example: Reading 100.0V on 200V range</p>
                        <p className="text-gray-300 text-sm">±1.5% of reading = ±1.5V</p>
                        <p className="text-gray-300 text-sm">±2 digits = ±0.2V (last digit = 0.1V)</p>
                        <p className="text-yellow-400 text-sm font-medium">Total uncertainty = ±1.7V</p>
                        <p className="text-gray-300 text-sm">True value lies between 98.3V and 101.7V</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Range Selection Impact</h4>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <p className="text-green-200 font-medium mb-2">Same 10V measurement on different ranges:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">20V range (±1% + 1 digit):</span>
                        <span className="text-yellow-400">±0.11V</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">200V range (±1% + 1 digit):</span>
                        <span className="text-red-300">±0.2V</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        Lower ranges generally provide better accuracy for small measurements
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Stacking and Management */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Error Stacking and Uncertainty Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Error Propagation</h4>
                <p className="text-gray-300 mb-3">
                  In multistep measurements, errors can accumulate:
                </p>
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h5 className="text-red-200 font-medium mb-2">Example: Power Calculation</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>Voltage: 230V ±1% = ±2.3V</div>
                    <div>Current: 10A ±2% = ±0.2A</div>
                    <div>Power = V × I = 2300W</div>
                    <div className="text-yellow-400">Combined uncertainty ≈ ±3% = ±69W</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Real-World Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Lab System Requirements</h4>
                    <p className="text-gray-300 leading-relaxed">
                      A pharmaceutical lab system requires readings within ±0.1% for critical quality control measurements. A cheaper handheld DMM with ±0.5% accuracy fails to meet specifications, prompting the purchase of a bench-grade precision instrument with ±0.025% accuracy and 6½ digit resolution. The investment in better instrumentation prevents costly batch rejections and regulatory compliance issues.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Precision matters in quality control and high-reliability systems. Knowing your instrument's limits prevents costly misinterpretation and ensures measurements meet application requirements. Understanding accuracy, precision, and resolution enables proper instrument selection and confident decision-making based on measurement results.
              </p>
            </CardContent>
          </Card>

          {/* Interactive Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Brain className="h-5 w-5 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizStarted ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-300">
                    Test your understanding of instrument accuracy, resolution, and error principles.
                  </p>
                  <Button 
                    onClick={startQuiz}
                    className="bg-yellow-400 text-black hover:bg-yellow-600 font-semibold px-8 py-2"
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
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
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
                              ? 'border-yellow-400 bg-yellow-600/20 text-yellow-400'
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
                      className="border-gray-600 text-gray-300 hover:bg-card disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswers[currentQuestionIndex] === undefined}
                      className="bg-yellow-400 text-black hover:bg-yellow-600 disabled:opacity-50"
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
                      <p className="text-green-400">Excellent work! You understand measurement accuracy concepts well.</p>
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
                      className="bg-yellow-400 text-black hover:bg-yellow-600 font-semibold px-8 py-2"
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

export default InstrumentationModule4Section3;